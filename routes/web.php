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
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\InsurancePartnerController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SpecializationController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TestimonialController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('/', [HomeController::class, 'publicShow'])->name('home');

Route::get('/services', [ServiceController::class, 'publicShow'])->name('services');

Route::get('/gallery', [GalleryController::class, 'publicShow'])->name('gallery');

Route::inertia('/facilities', 'facilities', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('facilities');

Route::get('/doctors', [DoctorController::class, 'publicShow'])->name('doctors');

Route::inertia('/about', 'about', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('about');

Route::inertia('/contact', 'contact', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('contact');

Route::inertia('/careers', 'careers', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('careers');

Route::get('/blog', [BlogController::class, 'public'])->name('blog');

Route::inertia('/appoinment', 'appoinment', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('appoinment');

Route::post('/upload/image', [ImageController::class, 'upload'])->name('image.upload');
Route::delete('/upload/image', [ImageController::class, 'delete'])->name('image.delete');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('admin/tasks', TaskController::class);
    Route::resource('admin/specializations', SpecializationController::class);
    Route::resource('admin/services', ServiceController::class);
    Route::resource('admin/doctors', DoctorController::class);
    Route::resource('admin/testimonials', TestimonialController::class);
    Route::resource('admin/appointments', AppointmentController::class);
    Route::resource('admin/bed-availability', BedAvailabilityController::class);
    Route::resource('admin/health-packages', HealthPackageController::class);
    Route::resource('admin/insurance-partners', InsurancePartnerController::class);
    Route::resource('admin/gallery', GalleryController::class);
    Route::resource('admin/careers', CareerController::class);
    Route::resource('admin/job-applications', JobApplicationController::class);
    Route::resource('admin/admins', AdminUserController::class);
    Route::resource('admin/blogs', BlogController::class);
    Route::inertia('admin/dashboard', 'admin/dashboard')->name('dashboard');
    Route::resource('admin/contact', ContactController::class);

});

require __DIR__.'/settings.php';
