<?php

use App\Models\Admin;
use App\Models\Blog;

test('admin can view blogs list', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->get(route('blogs.index'));

    $response->assertSuccessful();
});

test('admin can view create blog page', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->get(route('blogs.create'));

    $response->assertSuccessful();
});

test('admin can create blog', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->post(route('blogs.store'), [
        'title' => 'Test Blog',
        'content' => 'Test content',
    ]);

    $response->assertRedirect(route('blogs.index'));
    $this->assertDatabaseHas('blogs', ['title' => 'Test Blog']);
});

test('admin can view blog', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $blog = Blog::factory()->create();

    $response = $this->get(route('blogs.show', $blog));

    $response->assertSuccessful();
});

test('admin can view edit blog page', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $blog = Blog::factory()->create();

    $response = $this->get(route('blogs.edit', $blog));

    $response->assertSuccessful();
});

test('admin can update blog', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $blog = Blog::factory()->create();

    $response = $this->put(route('blogs.update', $blog), [
        'title' => 'Updated Blog',
        'content' => 'Updated content',
    ]);

    $response->assertRedirect(route('blogs.index'));
    $this->assertDatabaseHas('blogs', ['title' => 'Updated Blog']);
});

test('admin can delete blog', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $blog = Blog::factory()->create();

    $response = $this->delete(route('blogs.destroy', $blog));

    $response->assertRedirect(route('blogs.index'));
    $this->assertModelMissing($blog);
});

test('validation requires title when creating blog', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->post(route('blogs.store'), []);

    $response->assertSessionHasErrors('title');
});

test('validation requires content when creating blog', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->post(route('blogs.store'), [
        'title' => 'Test Blog',
    ]);

    $response->assertSessionHasErrors('content');
});
