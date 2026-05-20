<?php

namespace Database\Factories;

use App\Models\Admin;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class AdminFactory extends Factory
{
    public function definition(): array
    {
        return [
            'username' => fake()->unique()->userName(),
            'password' => Hash::make('password'),
        ];
    }

    public function superAdmin(): static
    {
        return $this->afterCreating(function (Admin $admin) {
            $admin->assignRole('Super Admin');
        });
    }

    public function receptionist(): static
    {
        return $this->afterCreating(function (Admin $admin) {
            $admin->assignRole('Receptionist');
        });
    }

    public function admin(): static
    {
        return $this->afterCreating(function (Admin $admin) {
            $admin->assignRole('Admin');
        });
    }
}
