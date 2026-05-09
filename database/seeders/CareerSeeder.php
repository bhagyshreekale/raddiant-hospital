<?php

namespace Database\Seeders;

use App\Models\Career;
use Illuminate\Database\Seeder;

class CareerSeeder extends Seeder
{
    public function run(): void
    {
        $careers = [
            [
                'specialization' => 'Cardiology',
                'title' => 'Senior Cardiologist',
                'salary' => '₹2,00,000 - ₹3,50,000/month',
                'location' => 'Nashik, Maharashtra',
                'job_type' => 'Full-time',
                'experience' => '8+ years',
                'description' => 'We are looking for an experienced cardiologist to join our cardiology department. The ideal candidate should have excellent skills in interventional cardiology and patient care.',
            ],
            [
                'specialization' => 'Nursing',
                'title' => 'Staff Nurse',
                'salary' => '₹25,000 - ₹40,000/month',
                'location' => 'Nashik, Maharashtra',
                'job_type' => 'Full-time',
                'experience' => '2+ years',
                'description' => 'Join our nursing team as a staff nurse. Previous hospital experience preferred. Excellent communication skills required.',
            ],
            [
                'specialization' => 'Radiology',
                'title' => 'Radiologist',
                'salary' => '₹1,50,000 - ₹2,50,000/month',
                'location' => 'Nashik, Maharashtra',
                'job_type' => 'Full-time',
                'experience' => '5+ years',
                'description' => 'Seeking a qualified radiologist for our diagnostic department. Experience in CT, MRI, and X-Ray interpretation required.',
            ],
            [
                'specialization' => 'Administration',
                'title' => 'Receptionist',
                'salary' => '₹18,000 - ₹25,000/month',
                'location' => 'Nashik, Maharashtra',
                'job_type' => 'Full-time',
                'experience' => '1+ years',
                'description' => 'We need a friendly and efficient receptionist to manage our front desk. Good computer skills required.',
            ],
            [
                'specialization' => 'Orthopedics',
                'title' => 'Physiotherapist',
                'salary' => '₹30,000 - ₹50,000/month',
                'location' => 'Nashik, Maharashtra',
                'job_type' => 'Full-time',
                'experience' => '3+ years',
                'description' => 'Join our physiotherapy department. Responsible for patient rehabilitation and therapy sessions.',
            ],
        ];

        foreach ($careers as $career) {
            Career::firstOrCreate(['title' => $career['title']], $career);
        }
    }
}
