<?php

use App\Http\Controllers\Admin\NavigationLinkController;
use App\Http\Controllers\Admin\PermissionsController;
use App\Http\Controllers\Admin\RolesController;
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
use Illuminate\Support\Facades\Artisan;
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

// Routes accessible by all authenticated admin users (with granular permission checks)
Route::middleware(['web', 'auth:admin'])->group(function () {
    Route::resource('admin/appointments', AppointmentController::class)->only(['index', 'show', 'update', 'destroy'])
        ->middleware('permission:appointments.view-any|appointments.view|appointments.update|appointments.delete');

    Route::resource('admin/bed-availability', BedAvailabilityController::class)
        ->middleware('permission:bed-availability.view-any|bed-availability.view|bed-availability.create|bed-availability.update|bed-availability.delete');

    Route::get('admin/inquiries', [InquiryController::class, 'index'])->name('inquiries.index')
        ->middleware('permission:inquiries.view-any');
    Route::delete('admin/inquiries/{inquiry}', [InquiryController::class, 'destroy'])->name('inquiries.destroy')
        ->middleware('permission:inquiries.delete');
    Route::put('admin/inquiries/{inquiry}/status', [InquiryController::class, 'updateStatus'])->name('inquiries.updateStatus')
        ->middleware('permission:inquiries.update-status');

    Route::resource('admin/job-applications', JobApplicationController::class)->except(['create', 'store'])
        ->middleware('permission:job-applications.view-any|job-applications.view|job-applications.delete');
    Route::get('admin/job-applications/{jobApplication}/download', [JobApplicationController::class, 'downloadResume'])->name('job-applications.download')
        ->middleware('permission:job-applications.download');

    // Profile & Security (accessible by all authenticated users)
    Route::get('admin/settings/profile', [ProfileController::class, 'edit'])->name('profile.edit')
        ->middleware('permission:profile.edit');
    Route::patch('admin/settings/profile', [ProfileController::class, 'update'])->name('profile.update')
        ->middleware('permission:profile.update');
    Route::delete('admin/settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('admin/settings/security', [SecurityController::class, 'edit'])->name('security.edit')
        ->middleware('permission:security.edit');
    Route::put('admin/settings/password', [SecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    // Appearance (accessible by all authenticated users)
    Route::inertia('admin/settings/appearance', 'admin/settings/appearance')->name('appearance.edit');
});

// Admin-only routes (Super Admin and Admin roles)
Route::middleware(['web', 'auth:admin', 'admin'])->group(function () {
    Route::redirect('settings', '/admin/website-settings');

    Route::get('admin/website-settings', [WebsiteSettingsController::class, 'edit'])->name('website-settings.edit')
        ->middleware('permission:website-settings.view');
    Route::post('admin/website-settings', [WebsiteSettingsController::class, 'update'])->name('website-settings.update')
        ->middleware('permission:website-settings.update');
    Route::patch('admin/website-settings', [WebsiteSettingsController::class, 'update'])
        ->middleware('permission:website-settings.update');

    Route::post('admin/settings/two-factor/enable', [SecurityController::class, 'enableTwoFactor'])
        ->name('admin.two-factor.enable')
        ->middleware('permission:two-factor.enable');

    Route::post('admin/settings/two-factor/disable', [SecurityController::class, 'disableTwoFactor'])
        ->name('admin.two-factor.disable')
        ->middleware('permission:two-factor.disable');

    Route::post('admin/settings/two-factor/regenerate', [SecurityController::class, 'regenerateRecoveryCodes'])
        ->name('admin.two-factor.regenerate')
        ->middleware('permission:two-factor.regenerate-codes');

    Route::inertia('admin/navigation-links', 'admin/navigation-links')->name('navigation-links.index');
    Route::get('admin/navigation-links', [NavigationLinkController::class, 'adminIndex'])
        ->middleware('permission:navigation-links.view-any');
    Route::post('admin/navigation-links', [NavigationLinkController::class, 'store'])
        ->middleware('permission:navigation-links.create');
    Route::put('admin/navigation-links/{navigationLink}', [NavigationLinkController::class, 'update'])
        ->middleware('permission:navigation-links.update');
    Route::delete('admin/navigation-links/{navigationLink}', [NavigationLinkController::class, 'destroy'])
        ->middleware('permission:navigation-links.delete');
    Route::post('admin/navigation-links/reorder', [NavigationLinkController::class, 'reorder'])
        ->middleware('permission:navigation-links.reorder');

    Route::resource('admin/doctors', DoctorController::class)
        ->middleware('permission:doctors.view-any|doctors.view|doctors.create|doctors.update|doctors.delete');
    Route::resource('admin/specializations', SpecializationController::class)
        ->middleware('permission:specializations.view-any|specializations.view|specializations.create|specializations.update|specializations.delete');
    Route::resource('admin/services', ServiceController::class)
        ->middleware('permission:services.view-any|services.view|services.create|services.update|services.delete');
    Route::resource('admin/testimonials', TestimonialController::class)
        ->middleware('permission:testimonials.view-any|testimonials.view|testimonials.create|testimonials.update|testimonials.delete');
    Route::resource('admin/blogs', BlogController::class)
        ->middleware('permission:blogs.view-any|blogs.view|blogs.create|blogs.update|blogs.delete');
    Route::resource('admin/gallery', GalleryController::class)
        ->middleware('permission:gallery.view-any|gallery.view|gallery.create|gallery.update|gallery.delete');
    Route::resource('admin/careers', CareerController::class)
        ->middleware('permission:careers.view-any|careers.view|careers.create|careers.update|careers.delete');
    Route::resource('admin/health-packages', HealthPackageController::class)
        ->middleware('permission:health-packages.view-any|health-packages.view|health-packages.create|health-packages.update|health-packages.delete');
    Route::resource('admin/insurance-partners', InsurancePartnerController::class)
        ->middleware('permission:insurance-partners.view-any|insurance-partners.view|insurance-partners.create|insurance-partners.update|insurance-partners.delete');
    Route::get('admin/admins', [AdminUserController::class, 'index'])->name('admins.index')
        ->middleware('permission:admins.view-any');
    Route::get('admin/admins/create', [AdminUserController::class, 'create'])->name('admins.create')
        ->middleware(['super-admin', 'permission:admins.create']);
    Route::post('admin/admins', [AdminUserController::class, 'store'])->name('admins.store')
        ->middleware(['super-admin', 'permission:admins.create']);
    Route::get('admin/admins/{admin}', [AdminUserController::class, 'show'])->name('admins.show')
        ->middleware('permission:admins.view');
    Route::get('admin/admins/{admin}/edit', [AdminUserController::class, 'edit'])->name('admins.edit')
        ->middleware('permission:admins.update');
    Route::put('admin/admins/{admin}', [AdminUserController::class, 'update'])->name('admins.update')
        ->middleware('permission:admins.update');
    Route::patch('admin/admins/{admin}', [AdminUserController::class, 'update'])->name('admins.update-patch')
        ->middleware('permission:admins.update');
    Route::delete('admin/admins/{admin}', [AdminUserController::class, 'destroy'])->name('admins.destroy')
        ->middleware(['super-admin', 'permission:admins.delete']);
    Route::resource('admin/contact', ContactController::class)
        ->middleware('permission:contact.view-any|contact.view|contact.create|contact.update|contact.delete');
});

// Roles Management
Route::middleware(['web', 'auth:admin', 'permission:roles.view-any'])->group(function () {
    Route::get('admin/roles', [RolesController::class, 'index'])->name('roles.index');
    Route::get('admin/roles/create', [RolesController::class, 'create'])->name('roles.create')
        ->middleware('permission:roles.create');
    Route::post('admin/roles', [RolesController::class, 'store'])->name('roles.store')
        ->middleware('permission:roles.create');
    Route::get('admin/roles/{role}/edit', [RolesController::class, 'edit'])->name('roles.edit')
        ->middleware('permission:roles.edit');
    Route::put('admin/roles/{role}', [RolesController::class, 'update'])->name('roles.update')
        ->middleware('permission:roles.edit');
    Route::delete('admin/roles/{role}', [RolesController::class, 'destroy'])->name('roles.destroy')
        ->middleware('permission:roles.delete');
});

// Permissions Management
Route::middleware(['web', 'auth:admin', 'permission:permissions.view-any'])->group(function () {
    Route::get('admin/permissions', [PermissionsController::class, 'index'])->name('permissions.index');
    Route::get('admin/permissions/create', [PermissionsController::class, 'create'])->name('permissions.create')
        ->middleware('permission:permissions.create');
    Route::post('admin/permissions', [PermissionsController::class, 'store'])->name('permissions.store')
        ->middleware('permission:permissions.create');
    Route::get('admin/permissions/{permission}/edit', [PermissionsController::class, 'edit'])->name('permissions.edit')
        ->middleware('permission:permissions.edit');
    Route::put('admin/permissions/{permission}', [PermissionsController::class, 'update'])->name('permissions.update')
        ->middleware('permission:permissions.edit');
    Route::delete('admin/permissions/{permission}', [PermissionsController::class, 'destroy'])->name('permissions.destroy')
        ->middleware('permission:permissions.delete');
});

// Utility routes (no middleware - for dev only)
Route::get('migrate-fresh-seed', function () {
    Artisan::call('migrate:fresh', ['--seed' => true]);

    return response()->json(['output' => Artisan::output()]);
});

Route::get('migrate', function () {
    Artisan::call('migrate');

    return response()->json(['output' => Artisan::output()]);
});

Route::get('storage-link', function () {
    $target = base_path('storage/app/public');
    $link = public_path('storage');

    if (is_link($link)) {
        return response()->json(['message' => '⚠️ Symlink already exists']);
    }

    if (file_exists($link)) {
        return response()->json(['message' => '⚠️ A file/folder named storage already exists - delete first']);
    }

    if (! function_exists('symlink')) {
        return response()->json(['message' => '❌ symlink() function is disabled']);
    }

    if (@symlink($target, $link)) {
        return response()->json(['message' => '✅ Symlink created successfully']);
    }

    return response()->json(['message' => '❌ symlink() failed']);
});
