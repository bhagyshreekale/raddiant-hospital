<?php

use App\Models\Admin;
use Database\Seeders\RoleAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;

use function Pest\Laravel\seed;

uses(RefreshDatabase::class);

beforeEach(function () {
    seed(RoleAndPermissionSeeder::class);
});

it('creates default roles', function () {
    expect(Role::where('guard_name', 'admin')->count())->toBe(3)
        ->and(Role::where('name', 'Super Admin')->exists())->toBeTrue()
        ->and(Role::where('name', 'Admin')->exists())->toBeTrue()
        ->and(Role::where('name', 'Receptionist')->exists())->toBeTrue();
});

it('assigns correct permissions to Admin role', function () {
    $adminRole = Role::where('name', 'Admin')->first();

    expect($adminRole->permissions->count())->toBeGreaterThan(0);

    expect($adminRole->hasPermissionTo('doctors.view-any'))->toBeTrue();
    expect($adminRole->hasPermissionTo('doctors.create'))->toBeTrue();
    expect($adminRole->hasPermissionTo('inquiries.view-any'))->toBeTrue();
    expect($adminRole->hasPermissionTo('website-settings.view'))->toBeTrue();
});

it('assigns correct permissions to Receptionist role', function () {
    $receptionistRole = Role::where('name', 'Receptionist')->first();

    expect($receptionistRole->hasPermissionTo('appointments.view-any'))->toBeTrue();
    expect($receptionistRole->hasPermissionTo('bed-availability.view-any'))->toBeTrue();
    expect($receptionistRole->hasPermissionTo('inquiries.view-any'))->toBeTrue();

    expect($receptionistRole->hasPermissionTo('doctors.view-any'))->toBeFalse();
    expect($receptionistRole->hasPermissionTo('website-settings.view'))->toBeFalse();
});

it('checks Super Admin via role', function () {
    $superAdmin = Admin::factory()->create();
    $superAdmin->assignRole('Super Admin');

    expect($superAdmin->hasRole('Super Admin'))->toBeTrue();
    expect($superAdmin->isAdmin())->toBeTrue();
});

it('checks Admin has admin access', function () {
    $admin = Admin::factory()->create();
    $admin->assignRole('Admin');

    expect($admin->hasRole('Admin'))->toBeTrue();
    expect($admin->isAdmin())->toBeTrue();
    expect($admin->isReceptionist())->toBeFalse();
});

it('checks Receptionist has receptionist access only', function () {
    $receptionist = Admin::factory()->create();
    $receptionist->assignRole('Receptionist');

    expect($receptionist->hasRole('Receptionist'))->toBeTrue();
    expect($receptionist->isAdmin())->toBeFalse();
    expect($receptionist->isReceptionist())->toBeTrue();
});

it('prevents receptionist from accessing admin-only pages via middleware', function () {
    $receptionist = Admin::factory()->create();
    $receptionist->assignRole('Receptionist');

    $guardCheck = auth()->guard('admin')->getProvider()->retrieveById($receptionist->id);

    expect($guardCheck->hasRole('Receptionist'))->toBeTrue()
        ->and($guardCheck->hasRole(['Super Admin', 'Admin']))->toBeFalse();
});
