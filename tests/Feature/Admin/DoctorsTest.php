<?php

use App\Models\Admin;
use App\Models\Doctor;
use App\Models\Specialization;

test('admin can view doctors list', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->get(route('doctors.index'));

    $response->assertSuccessful();
});

test('admin can view create doctor page', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->get(route('doctors.create'));

    $response->assertSuccessful();
});

test('admin can create doctor', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $specialization = Specialization::factory()->create();

    $response = $this->post(route('doctors.store'), [
        'name' => 'Dr. Test',
        'specialization_id' => $specialization->id,
        'education' => 'MD',
        'image' => 'https://example.com/image.jpg',
        'availability' => 'Mon-Fri',
    ]);

    $response->assertRedirect(route('doctors.index'));
    $this->assertDatabaseHas('doctors', ['name' => 'Dr. Test']);
});

test('admin can view doctor', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $doctor = Doctor::factory()->create();

    $response = $this->get(route('doctors.show', $doctor));

    $response->assertSuccessful();
});

test('admin can view edit doctor page', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $doctor = Doctor::factory()->create();

    $response = $this->get(route('doctors.edit', $doctor));

    $response->assertSuccessful();
});

test('admin can update doctor', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $doctor = Doctor::factory()->create();
    $specialization = Specialization::factory()->create();

    $response = $this->put(route('doctors.update', $doctor), [
        'name' => 'Dr. Updated',
        'specialization_id' => $specialization->id,
        'education' => 'MD',
        'image' => 'https://example.com/image.jpg',
        'availability' => 'Mon-Fri',
    ]);

    $response->assertRedirect(route('doctors.index'));
    $this->assertDatabaseHas('doctors', ['name' => 'Dr. Updated']);
});

test('admin can delete doctor', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $doctor = Doctor::factory()->create();

    $response = $this->delete(route('doctors.destroy', $doctor));

    $response->assertRedirect(route('doctors.index'));
    $this->assertModelMissing($doctor);
});

test('validation requires name when creating doctor', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->post(route('doctors.store'), []);

    $response->assertSessionHasErrors('name');
});

test('validation requires specialization when creating doctor', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->post(route('doctors.store'), [
        'name' => 'Dr. Test',
    ]);

    $response->assertSessionHasErrors('specialization_id');
});
