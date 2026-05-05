<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Career;
use App\Models\Doctor;
use App\Models\Gallery;
use App\Models\NavigationLink;
use App\Models\Service;
use App\Models\Specialization;
use App\Models\Testimonial;
use App\Models\WebsiteSettings;
use Inertia\Inertia;

class SiteController extends Controller
{
    private function getSiteData()
    {
        $footerSpecialties = WebsiteSettings::getSetting('footer_specialties');
        $specializations = Specialization::pluck('name')->toArray();
        $specialtiesList = $footerSpecialties ? explode(',', $footerSpecialties) : ($specializations ?: ['Cardiology', 'Orthopedics', 'Neurology']);

        $navKeys = ['nav_home', 'nav_about', 'nav_services', 'nav_facilities', 'nav_blog', 'nav_gallery', 'nav_contact', 'nav_careers', 'nav_appointment'];
        $nav = [];
        foreach ($navKeys as $key) {
            $navKey = str_replace('nav_', '', $key);
            $nav[$navKey] = WebsiteSettings::getSetting($key, '1') === '1';
        }

        return [
            'name' => WebsiteSettings::getSetting('hospital_name', 'Raddiant Plus Hospital'),
            'logo' => WebsiteSettings::getSetting('logo', '/images/logo.png'),
            'tagline' => WebsiteSettings::getSetting('tagline', 'Multispecialty & Diagnostic Centre'),
            'phone' => WebsiteSettings::getSetting('phone', '+91 93565 10704'),
            'whatsapp' => WebsiteSettings::getSetting('whatsapp', '919356510704'),
            'email' => WebsiteSettings::getSetting('email', 'care@raddiantplus.com'),
            'address' => WebsiteSettings::getSetting('address', 'Nashik, Maharashtra'),
            'social' => [
                'facebook' => WebsiteSettings::getSetting('facebook', '#'),
                'instagram' => WebsiteSettings::getSetting('instagram', '#'),
                'youtube' => WebsiteSettings::getSetting('youtube', '#'),
            ],
            'emergency' => WebsiteSettings::getSetting('emergency_number', '108'),
            'nav' => $nav,
            'headerLinks' => NavigationLink::forType('header')->visible()->ordered()->get(),
            'footerLinks' => NavigationLink::forType('footer')->visible()->ordered()->get(),
            'footer' => [
                'tagline' => WebsiteSettings::getSetting('footer_tagline', 'Touching Lives, Healing Souls'),
                'description' => WebsiteSettings::getSetting('footer_description', 'Delivering comprehensive multispecialty hospital and diagnostic care.'),
                'specialtiesTitle' => WebsiteSettings::getSetting('footer_specialties_title', 'Specialties'),
                'specialties' => $specialtiesList,
                'contactTitle' => WebsiteSettings::getSetting('footer_contact_title', 'Contact Information'),
                'address' => WebsiteSettings::getSetting('footer_address', 'Nashik, Maharashtra'),
                'phone' => WebsiteSettings::getSetting('footer_phone', '+91 93565 10704'),
                'email' => WebsiteSettings::getSetting('footer_email', 'care@raddiantplus.com'),
            ],
            'timing' => WebsiteSettings::getSetting('footer_timing', '24x7 Emergency | OPD: Mon-Sat 9:00 AM - 6:00 PM'),
        ];
    }

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

    public function home()
    {
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
            'siteData' => $this->getSiteData(),
            'homeDoctors' => $doctors,
            'homeTestimonials' => $testimonials,
        ]);
    }

    public function services()
    {
        $services = Service::all()->map(function ($service) {
            $imagePath = $service->image;

            if ($imagePath) {
                if (str_starts_with($imagePath, '/images/')) {
                    // Already in public folder
                } elseif (str_starts_with($imagePath, 'http')) {
                    // External URL
                } else {
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

        return Inertia::render('services', [
            'siteData' => $this->getSiteData(),
            'services' => $services,
        ]);
    }

    public function gallery()
    {
        $galleries = Gallery::latest()->get()->map(function ($gallery) {
            $imagePath = $gallery->image;

            if ($imagePath) {
                if (str_starts_with($imagePath, '/images/')) {
                    // Already in public folder
                } elseif (str_starts_with($imagePath, 'http')) {
                    // External URL
                } else {
                    $imagePath = '/storage/'.ltrim($imagePath, '/');
                }
            }

            return [
                'id' => $gallery->id,
                'title' => $gallery->title ?? 'Gallery Image',
                'category' => $gallery->category ?? 'Facilities',
                'image' => $imagePath,
            ];
        });

        return Inertia::render('gallery', [
            'siteData' => $this->getSiteData(),
            'gallery' => $galleries,
        ]);
    }

    public function about()
    {
        return Inertia::render('about', ['siteData' => $this->getSiteData()]);
    }

    public function contact()
    {
        return Inertia::render('contact', [
            'siteData' => $this->getSiteData(),
            'reference_id' => session('reference_id'),
        ]);
    }

    public function careers()
    {
        $careers = Career::latest()->get()->map(function ($career) {
            return [
                'id' => $career->id,
                'title' => $career->title,
                'specialization' => $career->specialization,
                'salary' => $career->salary,
                'location' => $career->location,
                'job_type' => $career->job_type,
                'experience' => $career->experience,
                'description' => $career->description,
            ];
        });

        return Inertia::render('careers', [
            'siteData' => $this->getSiteData(),
            'jobs' => $careers,
        ]);
    }

    public function blog()
    {
        $blogs = Blog::latest()->get()->map(function ($blog) {
            $imagePath = $blog->image;

            if ($imagePath) {
                if (str_starts_with($imagePath, '/images/')) {
                    // Already in public folder
                } elseif (str_starts_with($imagePath, 'http')) {
                    // External URL
                } else {
                    $imagePath = '/storage/'.ltrim($imagePath, '/');
                }
            }

            return [
                'id' => $blog->id,
                'title' => $blog->title,
                'category' => $blog->category,
                'description' => $blog->description,
                'read_time' => $blog->read_time ?? '5 min read',
                'image' => $imagePath,
            ];
        });

        return Inertia::render('blog', [
            'siteData' => $this->getSiteData(),
            'blogs' => $blogs,
        ]);
    }

    public function appointment()
    {
        return Inertia::render('appoinment', ['siteData' => $this->getSiteData()]);
    }

    public function appoinment()
    {
        return Inertia::render('appoinment', ['siteData' => $this->getSiteData()]);
    }

    public function doctors()
    {
        return Inertia::render('doctors', ['siteData' => $this->getSiteData()]);
    }

    public function facilities()
    {
        return Inertia::render('facilities', ['siteData' => $this->getSiteData()]);
    }

    public function faq()
    {
        return Inertia::render('faq', ['siteData' => $this->getSiteData()]);
    }
}
