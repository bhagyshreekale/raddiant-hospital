<?php

use App\Models\Admin;
use App\Models\Testimonial;

test('admin can view testimonials list', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->get(route('testimonials.index'));

    $response->assertSuccessful();
});

test('admin can view create testimonial page', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->get(route('testimonials.create'));

    $response->assertSuccessful();
});

test('admin can create testimonial', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->post(route('testimonials.store'), [
        'patient_name' => 'John Doe',
        'description' => 'Great service!',
        'patient_type' => 'Patient',
    ]);

    $response->assertRedirect(route('testimonials.index'));
    $this->assertDatabaseHas('testimonials', ['patient_name' => 'John Doe']);
});

test('admin can view testimonial', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $testimonial = Testimonial::factory()->create();

    $response = $this->get(route('testimonials.show', $testimonial));

    $response->assertSuccessful();
});

test('admin can view edit testimonial page', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $testimonial = Testimonial::factory()->create();

    $response = $this->get(route('testimonials.edit', $testimonial));

    $response->assertSuccessful();
});

test('admin can update testimonial', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $testimonial = Testimonial::factory()->create();

    $response = $this->put(route('testimonials.update', $testimonial), [
        'patient_name' => 'Jane Doe',
        'description' => 'Updated testimonial',
        'patient_type' => 'Patient',
    ]);

    $response->assertRedirect(route('testimonials.index'));
    $this->assertDatabaseHas('testimonials', ['patient_name' => 'Jane Doe']);
});

test('admin can delete testimonial', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $testimonial = Testimonial::factory()->create();

    $response = $this->delete(route('testimonials.destroy', $testimonial));

    $response->assertRedirect(route('testimonials.index'));
    $this->assertModelMissing($testimonial);
});

test('validation requires patient name when creating testimonial', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->post(route('testimonials.store'), []);

    $response->assertSessionHasErrors('patient_name');
});

test('validation requires description when creating testimonial', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->post(route('testimonials.store'), [
        'patient_name' => 'John Doe',
    ]);

    $response->assertSessionHasErrors('description');
});
