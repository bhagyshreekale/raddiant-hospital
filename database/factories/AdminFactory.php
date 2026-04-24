<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class AdminFactory extends Factory
{
    public function definition(): array
    {
        return [
            'username' => fake()->unique()->userName(),
            'password' => Hash::make('password'),
            'role' => 'admin',
        ];
    }

    public function receptionist(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'receptionist',
        ]);
    }
}
