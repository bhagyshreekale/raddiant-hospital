<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use PragmaRX\Google2FA\Google2FA;

class AdminAuthenticatedSessionController extends Controller
{
    public function create()
    {
        return Inertia::render('admin/auth/login', [
            'username' => 'username',
            'usernameLabel' => 'Username',
        ]);
    }

    public function store(Request $request)
    {
        $credentials = $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        /** @var Admin|null $admin */
        $admin = Admin::where('username', $credentials['username'])->first();

        if (! $admin || ! Hash::check($credentials['password'], $admin->password)) {
            throw ValidationException::withMessages([
                'username' => [trans('auth.failed')],
            ]);
        }

        if ($admin->two_factor_secret) {
            $request->session()->put('admin_2fa_user_id', $admin->id);
            $request->session()->put('admin_2fa_pending', true);
            $request->session()->put('admin_2fa_remember', $request->filled('remember'));

            return Inertia::render('admin/auth/two-factor', [
                'username' => $admin->username,
            ]);
        }

        Auth::guard('admin')->login($admin, $request->filled('remember'));
        $request->session()->regenerate();

        return redirect()->to('/admin/dashboard');
    }

    public function verifyTwoFactor(Request $request)
    {
        $request->validate([
            'two_factor_code' => 'required|digits:6',
        ]);

        $userId = $request->session()->get('admin_2fa_user_id');
        $pending = $request->session()->get('admin_2fa_pending');

        if (! $userId || ! $pending) {
            return redirect()->route('admin.login');
        }

        /** @var Admin $admin */
        $admin = Admin::findOrFail($userId);

        $google2fa = app(Google2FA::class);
        $secret = decrypt($admin->two_factor_secret);

        if (! $google2fa->verifyKey($secret, $request->input('two_factor_code'))) {
            $recoveryCodes = json_decode(decrypt($admin->two_factor_recovery_codes), true);
            $code = strtoupper($request->input('two_factor_code'));

            if (! in_array($code, $recoveryCodes)) {
                throw ValidationException::withMessages([
                    'two_factor_code' => ['Invalid verification code.'],
                ]);
            }

            $usedCodes = $request->session()->get('used_recovery_codes', []);
            $usedCodes[] = $code;
            $request->session()->put('used_recovery_codes', $usedCodes);
        }

        $request->session()->forget(['admin_2fa_user_id', 'admin_2fa_pending']);

        $remember = $request->session()->pull('admin_2fa_remember', false);
        Auth::guard('admin')->login($admin, $remember);
        $request->session()->regenerate();

        return redirect()->to('/admin/dashboard');
    }

    public function destroy(Request $request)
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }
}
