<?php

namespace Database\Seeders;

use App\Models\HealthPackage;
use Illuminate\Database\Seeder;

class HealthPackageSeeder extends Seeder
{
    public function run(): void
    {
        $packages = [
            [
                'name' => 'Basic Health Check',
                'description' => 'Essential health check-up including basic tests and consultations.',
                'price' => 1500,
                'features' => ['Complete Blood Picture', 'Urinalysis', 'Blood Sugar', 'ECG', 'Physician Consultation'],
                'is_featured' => false,
            ],
            [
                'name' => 'Executive Health Check',
                'description' => 'Comprehensive health check for working professionals.',
                'price' => 5000,
                'features' => ['All Basic tests', 'Lipid Profile', 'Liver Function Tests', 'Kidney Function Tests', 'Thyroid Profile', 'Chest X-Ray', 'Ultrasound', 'Specialist Consultation'],
                'is_featured' => true,
            ],
            [
                'name' => 'Cardiac Assessment',
                'description' => 'Detailed cardiac evaluation package.',
                'price' => 8000,
                'features' => ['ECG', 'Echo cardiography', 'Stress Test', 'Lipid Profile', 'Cardiologist Consultation'],
                'is_featured' => false,
            ],
            [
                'name' => 'Diabetes Management',
                'description' => 'Complete diabetes screening and management package.',
                'price' => 2500,
                'features' => ['Fasting Blood Sugar', 'Post Prandial Sugar', 'HbA1c', 'Lipid Profile', 'Eye Examination', 'Diabetic Diet Consultation'],
                'is_featured' => false,
            ],
            [
                'name' => 'Womens Health',
                'description' => 'Complete health check for women.',
                'price' => 4000,
                'features' => ['Pap Smear', 'Mammography', 'Thyroid Profile', 'Bone Density', 'Gynecologist Consultation'],
                'is_featured' => false,
            ],
        ];

        foreach ($packages as $package) {
            HealthPackage::firstOrCreate(['name' => $package['name']], $package);
        }
    }
}
