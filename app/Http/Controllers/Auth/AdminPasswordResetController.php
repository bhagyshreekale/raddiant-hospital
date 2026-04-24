<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;

class AdminPasswordResetController extends Controller
{
    public function create(Request $request)
    {
        return Inertia::render('admin/auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'username' => ['required', 'string'],
        ]);

        $admin = Admin::where('username', $request->username)->first();

        if (! $admin) {
            return back()->withInput()->withErrors([
                'username' => 'Username not found.',
            ]);
        }

        $status = Password::broker('admins')->sendResetLink([
            'username' => $request->username,
        ]);

        return $status === Password::RESET_LINK_SENT
            ? back()->with('status', __($status))
            : back()->withInput()->withErrors(['username' => __($status)]);
    }
}
