<?php

namespace Database\Seeders;

use App\Models\Specialization;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $specs = Specialization::pluck('id', 'name');

        $testimonials = [
            [
                'patient_name' => 'Priya Sharma',
                'specialization_id' => $specs['Cardiology'] ?? null,
                'patient_type' => 'Cardiac Patient',
                'description' => 'The cardiology team at Raddiant Plus gave my life back. From diagnosis to surgery, everything was handled with incredible precision and warmth. I felt safe every step of the way.',
            ],
            [
                'patient_name' => 'Rajan Mehta',
                'specialization_id' => $specs['Orthopedics'] ?? null,
                'patient_type' => 'Orthopaedic Surgery',
                'description' => 'After my knee replacement, the physiotherapy team guided me through recovery so patiently. I was back to walking without pain in just six weeks. Truly world-class care.',
            ],
            [
                'patient_name' => 'Anita Kulkarni',
                'specialization_id' => $specs['Gynecology & Obstetrics'] ?? null,
                'patient_type' => 'Maternity Patient',
                'description' => 'Delivering my daughter at Raddiant Plus was a beautiful experience. The nursing staff were like family — attentive, kind, and always present.',
            ],
            [
                'patient_name' => 'Deepak Joshi',
                'specialization_id' => $specs['Neurology'] ?? null,
                'patient_type' => 'Neurology Patient',
                'description' => 'The neurology team was honest about my diagnosis, compassionate in treatment, and celebrated every milestone alongside me.',
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
