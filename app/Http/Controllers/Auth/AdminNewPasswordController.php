<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Fortify\ResetAdminPassword;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\PasswordBroker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AdminNewPasswordController extends Controller
{
    public function create(Request $request)
    {
        return Inertia::render('admin/auth/reset-password', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'username' => 'required|string',
            'password' => 'required|string|confirmed',
        ]);

        $status = $this->broker()->reset(
            $request->only('username', 'password', 'password_confirmation', 'token'),
            function ($admin) use ($request) {
                app(ResetAdminPassword::class)->reset($admin, $request->all());
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return redirect()->route('admin.login')->with('status', __($status));
        }

        throw ValidationException::withMessages([
            'username' => [__($status)],
        ]);
    }

    protected function broker(): PasswordBroker
    {
        return Password::broker('admins');
    }
}
