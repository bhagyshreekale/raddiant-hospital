<?php

use App\Http\Controllers\Admin\Settings\SecurityController;
use App\Http\Controllers\Auth\AdminAuthenticatedSessionController;
use App\Http\Controllers\Auth\AdminNewPasswordController;
use App\Http\Controllers\Auth\AdminPasswordResetController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('web')->group(function () {
    Route::get('admin/login', [AdminAuthenticatedSessionController::class, 'create'])
        ->name('admin.login')
        ->middleware('guest:admin');

    Route::post('admin/login', [AdminAuthenticatedSessionController::class, 'store'])
        ->middleware('throttle:5,1');

    Route::post('admin/2fa/verify', [AdminAuthenticatedSessionController::class, 'verifyTwoFactor'])
        ->middleware('throttle:5,1');

    Route::post('admin/logout', [AdminAuthenticatedSessionController::class, 'destroy'])
        ->name('admin.logout')
        ->middleware('auth:admin');

    Route::get('admin/forgot-password', [AdminPasswordResetController::class, 'create'])
        ->name('admin.password.request');

    Route::post('admin/forgot-password', [AdminPasswordResetController::class, 'store'])
        ->name('admin.password.email');

    Route::get('admin/reset-password/{token}', [AdminNewPasswordController::class, 'create'])
        ->name('admin.password.reset');

    Route::post('admin/reset-password', [AdminNewPasswordController::class, 'store'])
        ->name('admin.password.update');
});

Route::middleware(['web', 'auth:admin'])->group(function () {
    Route::redirect('settings', '/admin/settings/profile');

    Route::get('admin/settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('admin/settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('admin/settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('admin/settings/security', [SecurityController::class, 'edit'])->name('security.edit');

    Route::put('admin/settings/password', [SecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    Route::post('admin/settings/two-factor/enable', [SecurityController::class, 'enableTwoFactor'])
        ->name('admin.two-factor.enable');

    Route::post('admin/settings/two-factor/disable', [SecurityController::class, 'disableTwoFactor'])
        ->name('admin.two-factor.disable');

    Route::post('admin/settings/two-factor/regenerate', [SecurityController::class, 'regenerateRecoveryCodes'])
        ->name('admin.two-factor.regenerate');

    Route::inertia('admin/settings/appearance', 'admin/settings/appearance')->name('appearance.edit');
});
