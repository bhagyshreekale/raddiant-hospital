<?php

use App\Models\Admin;
use App\Models\Specialization;

test('admin can view specializations list', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->get(route('specializations.index'));

    $response->assertSuccessful();
});

test('admin can view create specialization page', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->get(route('specializations.create'));

    $response->assertSuccessful();
});

test('admin can create specialization', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->post(route('specializations.store'), [
        'name' => 'Cardiology',
    ]);

    $response->assertRedirect(route('specializations.index'));
    $this->assertDatabaseHas('specializations', ['name' => 'Cardiology']);
});

test('admin can view specialization', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $specialization = Specialization::factory()->create();

    $response = $this->get(route('specializations.show', $specialization));

    $response->assertSuccessful();
});

test('admin can view edit specialization page', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $specialization = Specialization::factory()->create();

    $response = $this->get(route('specializations.edit', $specialization));

    $response->assertSuccessful();
});

test('admin can update specialization', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $specialization = Specialization::factory()->create();

    $response = $this->put(route('specializations.update', $specialization), [
        'name' => 'Updated Specialization',
    ]);

    $response->assertRedirect(route('specializations.index'));
    $this->assertDatabaseHas('specializations', ['name' => 'Updated Specialization']);
});

test('admin can delete specialization', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $specialization = Specialization::factory()->create();

    $response = $this->delete(route('specializations.destroy', $specialization));

    $response->assertRedirect(route('specializations.index'));
    $this->assertModelMissing($specialization);
});

test('validation requires name when creating specialization', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->post(route('specializations.store'), []);

    $response->assertSessionHasErrors('name');
});
