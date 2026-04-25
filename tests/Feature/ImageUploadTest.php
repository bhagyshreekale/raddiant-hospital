<?php

use App\Models\Admin;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('admin can upload image', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    Storage::fake('public');

    $file = UploadedFile::fake()->image('test.jpg');

    $response = $this->post(route('image.upload'), [
        'image' => $file,
        'filename' => 'test-image',
    ]);

    $response->assertSuccessful();
    $response->assertJsonStructure(['url', 'path']);
});

test('upload validates image type', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    Storage::fake('public');

    $file = UploadedFile::fake()->create('test.txt', 1024);

    $response = $this->post(route('image.upload'), [
        'image' => $file,
        'filename' => 'test-image',
    ]);

    $response->assertStatus(422);
});

test('upload validates image size', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    Storage::fake('public');

    $file = UploadedFile::fake()->image('test.jpg', 2000, 2000);

    $response = $this->post(route('image.upload'), [
        'image' => $file,
        'filename' => 'test-image',
    ]);

    $response->assertStatus(422);
});

test('upload requires image file', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->post(route('image.upload'), []);

    $response->assertStatus(422);
});

test('admin can delete uploaded image', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    Storage::fake('public');

    $file = UploadedFile::fake()->image('test.jpg');
    $this->post(route('image.upload'), [
        'image' => $file,
        'filename' => 'test-image',
    ]);

    $response = $this->delete(route('image.delete'), [
        'path' => 'uploads/test-image.jpg',
    ]);

    $response->assertSuccessful();
});
