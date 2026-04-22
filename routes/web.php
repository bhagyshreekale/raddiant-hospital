<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\TaskController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::inertia('/home', 'home', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home-one');

Route::inertia('/services', 'services', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('services');

Route::inertia('/gallery', 'gallery', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('gallery');


Route::inertia('/facilities', 'facilities', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('facilities');

Route::inertia('/doctors', 'doctors', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('doctors');


Route::inertia('/about', 'about', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('about');

Route::inertia('/contact', 'contact', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('contact');

Route::inertia('/careers', 'careers', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('careers');


Route::inertia('/blog', 'blog', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('blog');

Route::inertia('/appoinment', 'appoinment', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('appoinment');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('admin/tasks', TaskController::class);
    Route::inertia('admin/dashboard', 'admin/dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
