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
            'logo' => WebsiteSettings::getSetting('logo', '/images/logo.png'),
            'footer_tagline' => WebsiteSettings::getSetting('footer_tagline'),
            'footer_description' => WebsiteSettings::getSetting('footer_description'),
            'footer_specialties' => WebsiteSettings::getSetting('footer_specialties'),
            'footer_specialties_title' => WebsiteSettings::getSetting('footer_specialties_title', 'Specialties'),
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
            'logo' => 'nullable|string',
            'tagline' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email',
            'address' => 'nullable|string',
            'emergency_number' => 'nullable|string|max:50',
            'facebook' => 'nullable|url',
            'instagram' => 'nullable|url',
            'youtube' => 'nullable|url',
            'whatsapp' => 'nullable|string|max:50',
            'footer_tagline' => 'nullable|string',
            'footer_description' => 'nullable|string',
            'footer_specialties' => 'nullable|string',
            'footer_specialties_title' => 'nullable|string',
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
