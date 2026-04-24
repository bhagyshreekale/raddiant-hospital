<?php

use App\Models\Admin;
use App\Models\Service;

test('admin can view services list', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->get(route('services.index'));

    $response->assertSuccessful();
});

test('admin can view create service page', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->get(route('services.create'));

    $response->assertSuccessful();
});

test('admin can create service', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->post(route('services.store'), [
        'name' => 'Test Service',
        'description' => 'Test description',
    ]);

    $response->assertRedirect(route('services.index'));
    $this->assertDatabaseHas('services', ['name' => 'Test Service']);
});

test('admin can view service', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $service = Service::factory()->create();

    $response = $this->get(route('services.show', $service));

    $response->assertSuccessful();
});

test('admin can view edit service page', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $service = Service::factory()->create();

    $response = $this->get(route('services.edit', $service));

    $response->assertSuccessful();
});

test('admin can update service', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $service = Service::factory()->create();

    $response = $this->put(route('services.update', $service), [
        'name' => 'Updated Service',
        'description' => 'Updated description',
    ]);

    $response->assertRedirect(route('services.index'));
    $this->assertDatabaseHas('services', ['name' => 'Updated Service']);
});

test('admin can delete service', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $service = Service::factory()->create();

    $response = $this->delete(route('services.destroy', $service));

    $response->assertRedirect(route('services.index'));
    $this->assertModelMissing($service);
});

test('validation requires name when creating service', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->post(route('services.store'), []);

    $response->assertSessionHasErrors('name');
});
