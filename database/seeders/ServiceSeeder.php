<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'title' => 'Eye Care',
                'image' => '/images/services/eye-care.jpg',
                'description' => 'Comprehensive ophthalmology services including cataract surgery and vision correction.',
                'color' => '#f4a261',
            ],
            [
                'title' => 'Cardiology',
                'image' => '/images/services/cardiology.jpg',
                'description' => 'Advanced cardiac care with state-of-the-art catheterization labs and expert cardiologists.',
                'color' => '#e63946',
            ],
            [
                'title' => 'Pediatrics',
                'image' => '/images/services/pediatrics.jpg',
                'description' => 'Specialized care for children from newborns to adolescents in a child-friendly environment.',
                'color' => '#00b4d8',
            ],
            [
                'title' => 'Orthopedics',
                'image' => '/images/services/orthopedics.jpg',
                'description' => 'Comprehensive bone, joint, and muscle treatments including joint replacement surgeries.',
                'color' => '#0a4d8c',
            ],
            [
                'title' => 'Gynecology & Obstetrics',
                'image' => '/images/services/gynecology.jpg',
                'description' => 'Complete womens health care from prenatal to postnatal with experienced specialists.',
                'color' => '#e8a838',
            ],
            [
                'title' => 'Neurology',
                'image' => '/images/services/neurology.jpg',
                'description' => 'Expert diagnosis and treatment of neurological disorders with advanced imaging.',
                'color' => '#7b2d8b',
            ],
            [
                'title' => 'Diagnostics',
                'image' => '/images/services/diagnostics.jpg',
                'description' => 'NABL-accredited lab with advanced imaging: MRI, CT Scan, X-Ray, USG, and pathology.',
                'color' => '#2a9d8f',
            ],
            [
                'title' => '24x7 Emergency',
                'image' => '/images/services/emergency.jpg',
                'description' => 'Round-the-clock emergency services with a dedicated trauma centre and ICU.',
                'color' => '#e63946',
            ],
            [
                'title' => 'General Surgery',
                'image' => '/images/services/surgery.jpg',
                'description' => 'Minimally invasive laparoscopic and open surgery by experienced surgeons.',
                'color' => '#0a4d8c',
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
