<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\Specialization;
use Illuminate\Database\Seeder;

class DoctorSeeder extends Seeder
{
    public function run(): void
    {
        $specs = Specialization::pluck('id', 'name');
        
        $doctors = [
            [
                'name' => 'Dr. Priya Sharma',
                'specialization_id' => $specs['Cardiology'] ?? null,
                'education' => 'MD, DM (Cardiology)',
                'image' => '/images/doctors/priya.jpg',
                'availability' => 'Mon-Sat',
            ],
            [
                'name' => 'Dr. Rahul Desai',
                'specialization_id' => $specs['Orthopedics'] ?? null,
                'education' => 'MS (Ortho), FICS',
                'image' => '/images/doctors/rahul.jpg',
                'availability' => 'Mon-Fri',
            ],
            [
                'name' => 'Dr. Anita Kulkarni',
                'specialization_id' => $specs['Gynecology & Obstetrics'] ?? null,
                'education' => 'MD, DNB (OBG)',
                'image' => '/images/doctors/anita.jpg',
                'availability' => 'Tue-Sun',
            ],
            [
                'name' => 'Dr. Suresh Patil',
                'specialization_id' => $specs['Neurology'] ?? null,
                'education' => 'DM (Neurology), MD',
                'image' => '/images/doctors/suresh.jpg',
                'availability' => 'Mon-Sat',
            ],
            [
                'name' => 'Dr. Kavita Joshi',
                'specialization_id' => $specs['Pediatrics'] ?? null,
                'education' => 'MD (Pediatrics), DCH',
                'image' => '/images/doctors/kavita.jpg',
                'availability' => 'Mon-Sat',
            ],
            [
                'name' => 'Dr. Vikram Nair',
                'specialization_id' => $specs['General Surgery'] ?? null,
                'education' => 'MS (Surgery), FIAGES',
                'image' => '/images/doctors/vikram.jpg',
                'availability' => 'Mon-Fri',
            ],
        ];

        foreach ($doctors as $doctor) {
            Doctor::create($doctor);
        }
    }
}