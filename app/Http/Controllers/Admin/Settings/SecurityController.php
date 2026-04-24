<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use PragmaRX\Google2FA\Google2FA;

class SecurityController extends Controller
{
    public function edit(Request $request): Response
    {
        /** @var Admin $admin */
        $admin = $request->user();

        $google2fa = app(Google2FA::class);
        $secret = $admin->two_factor_secret
            ? decrypt($admin->two_factor_secret)
            : $google2fa->generateSecretKey();

        $QRCodeUrl = $google2fa->getQRCodeUrl(
            config('app.name'),
            $admin->username,
            $secret
        );

        return Inertia::render('admin/settings/security', [
            'twoFactorEnabled' => ! empty($admin->two_factor_secret),
            'twoFactorQrCode' => $QRCodeUrl,
            'twoFactorSecret' => $secret,
            'recoveryCodes' => $admin->two_factor_recovery_codes
                ? json_decode(decrypt($admin->two_factor_recovery_codes), true)
                : null,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|confirmed|min:8',
        ]);

        /** @var Admin $admin */
        $admin = $request->user();

        if (! Hash::check($validated['current_password'], $admin->password)) {
            return back()->withErrors(['current_password' => 'The current password is incorrect.']);
        }

        $admin->update([
            'password' => bcrypt($validated['password']),
        ]);

        return back()->with('status', 'Password updated successfully.');
    }

    public function enableTwoFactor(Request $request): RedirectResponse
    {
        $request->validate([
            'two_factor_code' => 'required|digits:6',
        ]);

        /** @var Admin $admin */
        $admin = $request->user();
        $google2fa = app(Google2FA::class);

        $secret = $admin->two_factor_secret
            ? decrypt($admin->two_factor_secret)
            : $google2fa->generateSecretKey();

        $valid = $google2fa->verifyKey($secret, $request->input('two_factor_code'));

        if (! $valid) {
            return back()->withErrors(['two_factor_code' => 'Invalid verification code.']);
        }

        $recoveryCodes = json_encode(
            collect(range(1, 8))->map(fn () => strtoupper(
                Str::random(8)
            ))->toArray()
        );

        $admin->update([
            'two_factor_secret' => encrypt($secret),
            'two_factor_recovery_codes' => encrypt($recoveryCodes),
        ]);

        return back()->with('status', 'Two-factor authentication enabled.');
    }

    public function disableTwoFactor(Request $request): RedirectResponse
    {
        $request->validate([
            'current_password' => 'required|string',
        ]);

        /** @var Admin $admin */
        $admin = $request->user();

        if (! Hash::check($request->input('current_password'), $admin->password)) {
            return back()->withErrors(['current_password' => 'The current password is incorrect.']);
        }

        $admin->update([
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
        ]);

        return back()->with('status', 'Two-factor authentication disabled.');
    }

    public function regenerateRecoveryCodes(Request $request): RedirectResponse
    {
        $request->validate([
            'current_password' => 'required|string',
        ]);

        /** @var Admin $admin */
        $admin = $request->user();

        if (! Hash::check($request->input('current_password'), $admin->password)) {
            return back()->withErrors(['current_password' => 'The current password is incorrect.']);
        }

        $recoveryCodes = json_encode(
            collect(range(1, 8))->map(fn () => strtoupper(
                Str::random(8)
            ))->toArray()
        );

        $admin->update([
            'two_factor_recovery_codes' => encrypt($recoveryCodes),
        ]);

        return back()->with('recoveryCodes', json_decode($recoveryCodes));
    }
}
