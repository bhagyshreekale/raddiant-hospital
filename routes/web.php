<?php

use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\BedAvailabilityController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HealthPackageController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\InsurancePartnerController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\SpecializationController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TestimonialController;
use App\Http\Middleware\EnsureUserIsAdmin;
use Illuminate\Support\Facades\Route;

Route::get('/login', fn () => abort(404))->name('login');
Route::post('/login', fn () => abort(404))->name('login.store');
Route::post('/logout', fn () => abort(404))->name('logout');
Route::get('/register', fn () => abort(404))->name('register');
Route::post('/register', fn () => abort(404))->name('register.store');
Route::get('/forgot-password', fn () => abort(404))->name('password.request');
Route::post('/forgot-password', fn () => abort(404))->name('password.email');
Route::get('/reset-password/{token}', fn () => abort(404))->name('password.reset');
Route::post('/reset-password', fn () => abort(404))->name('password.update');
Route::get('/email/verify', fn () => abort(404))->name('verification.notice');
Route::post('/email/verification-notification', fn () => abort(404))->name('verification.send');
Route::get('/user/confirm-password', fn () => abort(404))->name('password.confirm');
Route::post('/user/confirm-password', fn () => abort(404))->name('password.confirm.store');
Route::get('/user/confirmed-password-status', fn () => abort(404))->name('password.confirmation');
Route::get('/two-factor-challenge', fn () => abort(404))->name('two-factor.login');
Route::post('/two-factor-challenge', fn () => abort(404))->name('two-factor.store');
Route::post('/user/two-factor-authentication', fn () => abort(404))->name('two-factor.enable');
Route::post('/user/confirmed-two-factor-authentication', fn () => abort(404))->name('two-factor.confirm');
Route::get('/user/two-factor-qr-code', fn () => abort(404))->name('two-factor.qrcode');
Route::get('/user/two-factor-recovery-codes', fn () => abort(404))->name('two-factor.recovery-codes');
Route::post('/user/two-factor-recovery-codes', fn () => abort(404))->name('two-factor.regenerate');

Route::inertia('/', 'welcome', [
    'canRegister' => false,
])->name('home');

Route::inertia('/home', 'home', [
    'canRegister' => false,
])->name('home-one');

Route::inertia('/services', 'services', [
    'canRegister' => false,
])->name('services');

Route::inertia('/gallery', 'gallery', [
    'canRegister' => false,
])->name('gallery');

Route::get('/facilities', [HealthPackageController::class, 'public'])->name('facilities');

Route::inertia('/doctors', 'doctors', [
    'canRegister' => false,
])->name('doctors');

Route::inertia('/about', 'about', [
    'canRegister' => false,
])->name('about');

Route::inertia('/contact', 'contact', [
    'canRegister' => false,
])->name('contact');

Route::inertia('/careers', 'careers', [
    'canRegister' => false,
])->name('careers');

Route::inertia('/blog', 'blog', [
    'canRegister' => false,
])->name('blog');

Route::inertia('/appoinment', 'appoinment', [
    'canRegister' => false,
])->name('appoinment');

Route::post('/upload/image', [ImageController::class, 'upload'])->name('image.upload');
Route::delete('/upload/image', [ImageController::class, 'delete'])->name('image.delete');

Route::middleware(['web', 'auth:admin', EnsureUserIsAdmin::class])->group(function () {
    Route::resource('admin/tasks', TaskController::class);
    Route::resource('admin/specializations', SpecializationController::class);
    Route::resource('admin/doctors', DoctorController::class);
    Route::resource('admin/testimonials', TestimonialController::class);
    Route::resource('admin/health-packages', HealthPackageController::class);
    Route::resource('admin/insurance-partners', InsurancePartnerController::class);
    Route::resource('admin/gallery', GalleryController::class);
    Route::resource('admin/careers', CareerController::class);
    Route::resource('admin/job-applications', JobApplicationController::class);
    Route::resource('admin/admins', AdminUserController::class);
    Route::resource('admin/blogs', BlogController::class);
    Route::resource('admin/contact', ContactController::class);
});

Route::middleware(['web', 'auth:admin'])->group(function () {
    Route::resource('admin/appointments', AppointmentController::class);
    Route::resource('admin/bed-availability', BedAvailabilityController::class);
});

Route::middleware(['web', 'auth:admin'])->group(function () {
    Route::inertia('admin/dashboard', 'admin/dashboard')->name('dashboard');
});

Route::get('/settings', fn () => redirect('/admin/settings/profile'));

require __DIR__.'/admin.php';