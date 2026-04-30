<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WebsiteSettings;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WebsiteSettingsController extends Controller
{
    public function edit(): Response
    {
        $settings = [
            'hospital_name' => WebsiteSettings::getSetting('hospital_name'),
            'tagline' => WebsiteSettings::getSetting('tagline'),
            'phone' => WebsiteSettings::getSetting('phone'),
            'email' => WebsiteSettings::getSetting('email'),
            'address' => WebsiteSettings::getSetting('address'),
            'emergency_number' => WebsiteSettings::getSetting('emergency_number'),
            'facebook' => WebsiteSettings::getSetting('facebook'),
            'instagram' => WebsiteSettings::getSetting('instagram'),
            'youtube' => WebsiteSettings::getSetting('youtube'),
            'whatsapp' => WebsiteSettings::getSetting('whatsapp'),
            'nav_home' => WebsiteSettings::getSetting('nav_home', '1'),
            'nav_about' => WebsiteSettings::getSetting('nav_about', '1'),
            'nav_services' => WebsiteSettings::getSetting('nav_services', '1'),
            'nav_facilities' => WebsiteSettings::getSetting('nav_facilities', '1'),
            'nav_blog' => WebsiteSettings::getSetting('nav_blog', '1'),
            'nav_gallery' => WebsiteSettings::getSetting('nav_gallery', '1'),
            'nav_contact' => WebsiteSettings::getSetting('nav_contact', '1'),
            'nav_careers' => WebsiteSettings::getSetting('nav_careers', '1'),
            'nav_appointment' => WebsiteSettings::getSetting('nav_appointment', '1'),
            'footer_quick_links' => WebsiteSettings::getSetting('footer_quick_links', 'Home,/,About Us,/about,Services,/services,Doctors,/doctors,Facilities,/facilities,Gallery,/gallery,Blog,/blog'),
            'footer_tagline' => WebsiteSettings::getSetting('footer_tagline'),
            'footer_description' => WebsiteSettings::getSetting('footer_description'),
            'footer_specialties' => WebsiteSettings::getSetting('footer_specialties'),
            'footer_column3_links' => WebsiteSettings::getSetting('footer_column3_links'),
            'footer_specialties_title' => WebsiteSettings::getSetting('footer_specialties_title', 'Specialties'),
            'footer_specialties_links' => WebsiteSettings::getSetting('footer_specialties_links', '/services,/services,/services,/services,/services'),
            'footer_contact_title' => WebsiteSettings::getSetting('footer_contact_title', 'Contact Information'),
            'footer_address' => WebsiteSettings::getSetting('footer_address', 'Nashik, Maharashtra'),
            'footer_phone' => WebsiteSettings::getSetting('footer_phone', '+91 93565 10704'),
            'footer_email' => WebsiteSettings::getSetting('footer_email', 'care@raddiantplus.com'),
            'footer_timing' => WebsiteSettings::getSetting('footer_timing'),
        ];

        return Inertia::render('admin/website-settings', $settings);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'hospital_name' => 'nullable|string|max:255',
            'tagline' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email',
            'address' => 'nullable|string',
            'emergency_number' => 'nullable|string|max:50',
            'facebook' => 'nullable|url',
            'instagram' => 'nullable|url',
            'youtube' => 'nullable|url',
            'whatsapp' => 'nullable|string|max:50',
            'nav_home' => 'nullable|string',
            'nav_about' => 'nullable|string',
            'nav_services' => 'nullable|string',
            'nav_facilities' => 'nullable|string',
            'nav_blog' => 'nullable|string',
            'nav_gallery' => 'nullable|string',
            'nav_contact' => 'nullable|string',
            'nav_careers' => 'nullable|string',
            'nav_appointment' => 'nullable|string',
            'footer_quick_links' => 'nullable|string',
            'footer_column3_links' => 'nullable|string',
            'footer_tagline' => 'nullable|string',
            'footer_description' => 'nullable|string',
            'footer_specialties' => 'nullable|string',
            'footer_specialties_title' => 'nullable|string',
            'footer_specialties_links' => 'nullable|string',
            'footer_contact_title' => 'nullable|string',
            'footer_address' => 'nullable|string',
            'footer_phone' => 'nullable|string',
            'footer_email' => 'nullable|string',
            'footer_timing' => 'nullable|string',
        ]);

        foreach ($data as $key => $value) {
            WebsiteSettings::setSetting($key, $value);
        }

        return to_route('website-settings.edit')->with('status', 'Settings updated successfully');
    }
}
