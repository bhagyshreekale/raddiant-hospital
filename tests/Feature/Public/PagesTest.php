<?php

test('home page loads', function () {
    $response = $this->get('/');

    $response->assertSuccessful();
});

test('home page loads with inertia', function () {
    $response = $this->get('/');

    $response->assertInertia();
});

test('services page loads', function () {
    $response = $this->get(route('services'));

    $response->assertSuccessful();
});

test('doctors page loads', function () {
    $response = $this->get(route('doctors'));

    $response->assertSuccessful();
});

test('gallery page loads', function () {
    $response = $this->get(route('gallery'));

    $response->assertSuccessful();
});

test('contact page loads', function () {
    $response = $this->get(route('contact'));

    $response->assertSuccessful();
});

test('careers page loads', function () {
    $response = $this->get(route('careers'));

    $response->assertSuccessful();
});

test('blogs page loads', function () {
    $response = $this->get(route('blogs'));

    $response->assertSuccessful();
});
