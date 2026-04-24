<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Service;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    private function getGradientColors(string $specialization): array
    {
        $colors = [
            'Cardiology' => ['from' => '#8b5cf6', 'to' => '#a78bfa', 'avFrom' => '#3C3489', 'avTo' => '#7F77DD'],
            'Orthopaedics' => ['from' => '#0ea5e9', 'to' => '#38bdf8', 'avFrom' => '#0C447C', 'avTo' => '#378ADD'],
            'Neurology' => ['from' => '#8b5cf6', 'to' => '#c084fc', 'avFrom' => '#26215C', 'avTo' => '#534AB7'],
            'Obstetrics' => ['from' => '#ec4899', 'to' => '#f472b6', 'avFrom' => '#72243E', 'avTo' => '#D4537E'],
            'Oncology' => ['from' => '#10b981', 'to' => '#34d399', 'avFrom' => '#085041', 'avTo' => '#1D9E75'],
            'Endocrinology' => ['from' => '#f59e0b', 'to' => '#fbbf24', 'avFrom' => '#633806', 'avTo' => '#BA7517'],
            'Emergency' => ['from' => '#ef4444', 'to' => '#f87171', 'avFrom' => '#791F1F', 'avTo' => '#E24B4A'],
            'Paediatrics' => ['from' => '#06b6d4', 'to' => '#22d3ee', 'avFrom' => '#0C447C', 'avTo' => '#185FA5'],
        ];

        return $colors[$specialization] ?? ['from' => '#0ea5e9', 'to' => '#38bdf8', 'avFrom' => '#0C447C', 'avTo' => '#378ADD'];
    }

    public function publicShow(): Response
    {
        // Get services (4 for homepage)
        $services = Service::limit(4)->get()->map(function ($service) {
            $imagePath = $service->image;

            if ($imagePath) {
                if (str_starts_with($imagePath, '/images/')) {
                    // Already in public folder - use as-is
                } elseif (str_starts_with($imagePath, 'http')) {
                    // External URL - use as-is
                } else {
                    // Storage path
                    $imagePath = '/storage/'.ltrim($imagePath, '/');
                }
            }

            return [
                'id' => $service->id,
                'title' => $service->title,
                'image' => $imagePath,
                'desc' => $service->description,
                'color' => '#0a4d8c',
            ];
        });

        // Get doctors (3 for homepage)
        $doctors = Doctor::with('specialization')->limit(3)->get()->map(function ($doctor) {
            $imagePath = $doctor->image;

            if ($imagePath) {
                if (str_starts_with($imagePath, '/images/')) {
                    // Already in public folder
                } elseif (str_starts_with($imagePath, 'http')) {
                    // External URL
                } else {
                    $imagePath = '/storage/'.ltrim($imagePath, '/');
                }
            } else {
                $imagePath = 'https://randomuser.me/api/portraits/doctor.jpg';
            }

            return [
                'id' => $doctor->id,
                'name' => $doctor->name,
                'specialty' => $doctor->specialization?->name ?? 'General',
                'qual' => $doctor->education ?? '',
                'experience' => '10+ Years',
                'img' => $imagePath,
                'available' => $doctor->availability ?? 'Mon-Sat',
            ];
        });

        // Get testimonials (homepage - show up to 8)
        $testimonials = Testimonial::with('specialization')->limit(8)->get()->map(function ($testimonial) {
            $specName = $testimonial->specialization?->name ?? 'General';
            $colors = $this->getGradientColors($specName);
            $initials = collect(explode(' ', $testimonial->patient_name))
                ->map(fn ($w) => strtoupper($w[0] ?? ''))
                ->take(2)
                ->join('');

            return [
                'id' => $testimonial->id,
                'name' => $testimonial->patient_name,
                'initials' => $initials ?: 'PT',
                'role' => $testimonial->patient_type,
                'dept' => $specName,
                'text' => $testimonial->description,
                'stars' => 5,
                ...$colors,
            ];
        });

        return Inertia::render('home', [
            'homeServices' => $services,
            'homeDoctors' => $doctors,
            'homeTestimonials' => $testimonials,
        ]);
    }
}
