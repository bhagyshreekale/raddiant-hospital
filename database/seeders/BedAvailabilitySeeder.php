<?php

namespace Database\Seeders;

use App\Models\BedAvailability;
use Illuminate\Database\Seeder;

class BedAvailabilitySeeder extends Seeder
{
    public function run(): void
    {
        $beds = [
            ['available_beds' => 15, 'total_beds' => 30, 'status' => 'Good'],
            ['available_beds' => 5, 'total_beds' => 20, 'status' => 'Full'],
            ['available_beds' => 8, 'total_beds' => 15, 'status' => 'Limited'],
            ['available_beds' => 10, 'total_beds' => 12, 'status' => 'Good'],
        ];

        foreach ($beds as $bed) {
            BedAvailability::firstOrCreate(
                ['total_beds' => $bed['total_beds']],
                $bed
            );
        }
    }
}
