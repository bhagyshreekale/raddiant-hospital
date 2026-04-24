<?php

namespace Database\Seeders;

use App\Models\Specialization;
use Illuminate\Database\Seeder;

class SpecializationSeeder extends Seeder
{
    public function run(): void
    {
        $specializations = [
            ['name' => 'Cardiology', 'description' => 'Heart and cardiovascular care'],
            ['name' => 'Orthopedics', 'description' => 'Bone, joint and muscle treatments'],
            ['name' => 'Gynecology & Obstetrics', 'description' => 'Womens health care'],
            ['name' => 'Neurology', 'description' => 'Brain and nervous system'],
            ['name' => 'Pediatrics', 'description' => 'Child healthcare'],
            ['name' => 'General Surgery', 'description' => 'General surgical procedures'],
            ['name' => 'Eye Care', 'description' => 'Ophthalmology services'],
            ['name' => 'Diagnostics', 'description' => 'Laboratory and imaging services'],
        ];

        foreach ($specializations as $spec) {
            Specialization::create($spec);
        }
    }
}