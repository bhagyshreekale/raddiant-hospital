<?php

use App\Models\Admin;
use App\Models\InsurancePartner;

test('admin can view insurance partners list', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->get(route('insurance-partners.index'));

    $response->assertSuccessful();
});

test('admin can view create insurance partner page', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->get(route('insurance-partners.create'));

    $response->assertSuccessful();
});

test('admin can create insurance partner', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->post(route('insurance-partners.store'), [
        'name' => 'Test Insurance',
    ]);

    $response->assertRedirect(route('insurance-partners.index'));
    $this->assertDatabaseHas('insurance_partners', ['name' => 'Test Insurance']);
});

test('admin can view insurance partner', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $partner = InsurancePartner::factory()->create();

    $response = $this->get(route('insurance-partners.show', $partner));

    $response->assertSuccessful();
});

test('admin can view edit insurance partner page', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $partner = InsurancePartner::factory()->create();

    $response = $this->get(route('insurance-partners.edit', $partner));

    $response->assertSuccessful();
});

test('admin can update insurance partner', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $partner = InsurancePartner::factory()->create();

    $response = $this->put(route('insurance-partners.update', $partner), [
        'name' => 'Updated Insurance',
    ]);

    $response->assertRedirect(route('insurance-partners.index'));
    $this->assertDatabaseHas('insurance_partners', ['name' => 'Updated Insurance']);
});

test('admin can delete insurance partner', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $partner = InsurancePartner::factory()->create();

    $response = $this->delete(route('insurance-partners.destroy', $partner));

    $response->assertRedirect(route('insurance-partners.index'));
    $this->assertModelMissing($partner);
});

test('validation requires name when creating insurance partner', function () {
    $admin = Admin::factory()->create();
    $this->actingAs($admin, 'admin');

    $response = $this->post(route('insurance-partners.store'), []);

    $response->assertSessionHasErrors('name');
});
