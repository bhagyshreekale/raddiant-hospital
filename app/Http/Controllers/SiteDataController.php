<?php

namespace App\Http\Controllers;

use App\Models\Specialization;
use App\Models\WebsiteSettings;
use Illuminate\Http\Request;

class SiteDataController extends Controller
{
    public function __invoke(Request $request)
    {
        // 1. Fetch & Parse the Master Navigation (Syncs Navbar and Footer Column 2)
        $navMenuRaw = WebsiteSettings::getSetting('nav_menu');
        $masterNav = [];

        if ($navMenuRaw) {
            $masterNav = json_decode($navMenuRaw, true) ?? [];
        }

        // Fallback navigation if database is empty
        if (empty($masterNav)) {
            $masterNav = [
                ['label' => 'Home', 'href' => '/'],
                ['label' => 'About Us', 'href' => '/about'],
                ['label' => 'Services', 'href' => '/services'],
                ['label' => 'Doctors', 'href' => '/doctors'],
                ['label' => 'Facilities', 'href' => '/facilities'],
                ['label' => 'Gallery', 'href' => '/gallery'],
                ['label' => 'Contact', 'href' => '/contact'],
            ];
        }

        // 2. Fetch Specialties for Footer Column 3
        $specializations = Specialization::pluck('name')->toArray();
        $footerSpecialties = WebsiteSettings::getSetting('footer_specialties');

        // Parse JSON links for Column 3
        $column3Raw = WebsiteSettings::getSetting('footer_column3_links');
        $column3Links = [];

        if ($column3Raw) {
            $decoded = json_decode($column3Raw, true);
            if (is_array($decoded)) {
                $column3Links = $decoded;
            }
        }

        // Fallback for Column 3 if empty
        if (empty($column3Links)) {
            $specialtiesList = $footerSpecialties ? explode(',', $footerSpecialties) : ($specializations ?: ['Cardiology', 'Orthopedics', 'Neurology']);
            $column3Links = array_map(function ($s) {
                return ['label' => trim($s), 'href' => '/services?specialty='.urlencode(trim($s))];
            }, $specialtiesList);
        }

        // 3. Assemble and return the data payload
        $data = [
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

            // Shared Master Navigation passed to the frontend Header
            'nav' => $masterNav,

            'footer' => [
                'tagline' => WebsiteSettings::getSetting('footer_tagline', 'Touching Lives, Healing Souls'),
                'description' => WebsiteSettings::getSetting('footer_description', 'Delivering comprehensive multispecialty hospital and diagnostic care.'),

                // Shared Master Navigation automatically synced to Footer Column 2
                'quickLinks' => $masterNav,

                'column3Title' => WebsiteSettings::getSetting('footer_specialties_title', 'Specialties'),
                'column3Links' => $column3Links,

                'contactTitle' => WebsiteSettings::getSetting('footer_contact_title', 'Contact Information'),
                'address' => WebsiteSettings::getSetting('footer_address', 'Nashik, Maharashtra'),
                'phone' => WebsiteSettings::getSetting('footer_phone', '+91 93565 10704'),
                'email' => WebsiteSettings::getSetting('footer_email', 'care@raddiantplus.com'),
            ],
            'timing' => WebsiteSettings::getSetting('footer_timing', '24x7 Emergency | OPD: Mon-Sat 9:00 AM - 6:00 PM'),
        ];

        return response()->json($data);
    }
}
