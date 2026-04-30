<?php

namespace App\Http\Controllers;

use App\Models\Specialization;
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

    public function home()
    {
        return Inertia::render('home', ['siteData' => $this->getSiteData()]);
    }

    public function services()
    {
        return Inertia::render('services', ['siteData' => $this->getSiteData()]);
    }

    public function gallery()
    {
        return Inertia::render('gallery', ['siteData' => $this->getSiteData()]);
    }

    public function about()
    {
        return Inertia::render('about', ['siteData' => $this->getSiteData()]);
    }

    public function contact()
    {
        return Inertia::render('contact', ['siteData' => $this->getSiteData()]);
    }

    public function careers()
    {
        return Inertia::render('careers', ['siteData' => $this->getSiteData()]);
    }

    public function blog()
    {
        return Inertia::render('blog', ['siteData' => $this->getSiteData()]);
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
