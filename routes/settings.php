<?php

use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('admin/settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('admin/settings/profile', [ProfileController::class, 'update'])->name('profile.update');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::delete('admin/settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('admin/settings/security', [SecurityController::class, 'edit'])->name('security.edit');

    Route::put('admin/settings/password', [SecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    Route::inertia('admin/settings/appearance', 'admin/settings/appearance')->name('appearance.edit');
});
