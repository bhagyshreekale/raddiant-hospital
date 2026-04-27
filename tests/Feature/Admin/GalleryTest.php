<?php

use App\Models\Admin;
use App\Models\Gallery;

test('admin can view gallery list', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->get(route('gallery.index'));

    $response->assertSuccessful();
});

test('admin can view create gallery page', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->get(route('gallery.create'));

    $response->assertSuccessful();
});

test('admin can create gallery image', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->post(route('gallery.store'), [
        'image' => '/storage/test.jpg',
        'title' => 'Test Image',
        'category' => 'Facilities',
    ]);

    $response->assertRedirect(route('gallery.index'));
    $this->assertDatabaseHas('galleries', ['title' => 'Test Image']);
});

test('admin can view gallery image', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $gallery = Gallery::factory()->create();

    $response = $this->get(route('gallery.show', $gallery));

    $response->assertSuccessful();
});

test('admin can view edit gallery page', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $gallery = Gallery::factory()->create();

    $response = $this->get(route('gallery.edit', $gallery));

    $response->assertSuccessful();
});

test('admin can update gallery', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $gallery = Gallery::factory()->create();

    $response = $this->put(route('gallery.update', $gallery), [
        'image' => '/storage/test.jpg',
        'title' => 'Updated Image',
        'category' => 'Facilities',
    ]);

    $response->assertRedirect(route('gallery.index'));
    $this->assertDatabaseHas('galleries', ['title' => 'Updated Image']);
});

test('admin can delete gallery', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $gallery = Gallery::factory()->create();

    $response = $this->delete(route('gallery.destroy', $gallery));

    $response->assertRedirect(route('gallery.index'));
    $this->assertModelMissing($gallery);
});

test('validation requires image when creating gallery', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->post(route('gallery.store'), []);

    $response->assertSessionHasErrors('image');
});
