<?php

namespace Database\Factories;

use App\Models\InsurancePartner;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<InsurancePartner>
 */
class InsurancePartnerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'category' => fake()->randomElement(['public', 'private', 'tpa']),
        ];
    }
}
