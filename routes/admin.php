<?php

use App\Http\Controllers\Admin\NavigationLinkController;
use App\Http\Controllers\Admin\Settings\SecurityController;
use App\Http\Controllers\Admin\WebsiteSettingsController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\Auth\AdminAuthenticatedSessionController;
use App\Http\Controllers\Auth\AdminNewPasswordController;
use App\Http\Controllers\Auth\AdminPasswordResetController;
use App\Http\Controllers\BedAvailabilityController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HealthPackageController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\InsurancePartnerController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\SpecializationController;
use App\Http\Controllers\TestimonialController;
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

// Routes accessible by both Admin and Receptionist
Route::middleware(['web', 'auth:admin'])->group(function () {
    // Receptionist-accessible routes
    Route::resource('admin/appointments', AppointmentController::class)->only(['index', 'show', 'update', 'destroy']);
    Route::resource('admin/bed-availability', BedAvailabilityController::class);
    Route::get('admin/inquiries', [InquiryController::class, 'index'])->name('inquiries.index');
    Route::delete('admin/inquiries/{inquiry}', [InquiryController::class, 'destroy'])->name('inquiries.destroy');
    Route::put('admin/inquiries/{inquiry}/status', [InquiryController::class, 'updateStatus'])->name('inquiries.updateStatus');
    Route::resource('admin/job-applications', JobApplicationController::class)->except(['create', 'store']);
    Route::get('admin/job-applications/{jobApplication}/download', [JobApplicationController::class, 'downloadResume'])->name('job-applications.download');

    // Profile & Security (accessible by all authenticated users)
    Route::get('admin/settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('admin/settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('admin/settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('admin/settings/security', [SecurityController::class, 'edit'])->name('security.edit');
    Route::put('admin/settings/password', [SecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    // Appearance (accessible by all authenticated users)
    Route::inertia('admin/settings/appearance', 'admin/settings/appearance')->name('appearance.edit');
});

// Admin-only routes (full access)
Route::middleware(['web', 'auth:admin', 'admin'])->group(function () {
    Route::redirect('settings', '/admin/website-settings');

    Route::get('admin/website-settings', [WebsiteSettingsController::class, 'edit'])->name('website-settings.edit');
    Route::post('admin/website-settings', [WebsiteSettingsController::class, 'update'])->name('website-settings.update');
    Route::patch('admin/website-settings', [WebsiteSettingsController::class, 'update']);

    Route::post('admin/settings/two-factor/enable', [SecurityController::class, 'enableTwoFactor'])
        ->name('admin.two-factor.enable');

    Route::post('admin/settings/two-factor/disable', [SecurityController::class, 'disableTwoFactor'])
        ->name('admin.two-factor.disable');

    Route::post('admin/settings/two-factor/regenerate', [SecurityController::class, 'regenerateRecoveryCodes'])
        ->name('admin.two-factor.regenerate');

    Route::inertia('admin/navigation-links', 'admin/navigation-links')->name('navigation-links.index');
    Route::get('admin/navigation-links', [NavigationLinkController::class, 'adminIndex']);
    Route::post('admin/navigation-links', [NavigationLinkController::class, 'store']);
    Route::put('admin/navigation-links/{navigationLink}', [NavigationLinkController::class, 'update']);
    Route::delete('admin/navigation-links/{navigationLink}', [NavigationLinkController::class, 'destroy']);
    Route::post('admin/navigation-links/reorder', [NavigationLinkController::class, 'reorder']);

    Route::resource('admin/doctors', DoctorController::class);
    Route::resource('admin/specializations', SpecializationController::class);
    Route::resource('admin/services', ServiceController::class);
    Route::resource('admin/testimonials', TestimonialController::class);
    Route::resource('admin/blogs', BlogController::class);
    Route::resource('admin/gallery', GalleryController::class);
    Route::resource('admin/careers', CareerController::class);
    Route::resource('admin/health-packages', HealthPackageController::class);
    Route::resource('admin/insurance-partners', InsurancePartnerController::class);
    Route::resource('admin/admins', AdminUserController::class);
    Route::resource('admin/contact', ContactController::class);
});
