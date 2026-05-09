<?php

namespace Database\Seeders;

use App\Models\WebsiteSettings;
use Illuminate\Database\Seeder;

class WebsiteSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['key' => 'hospital_name', 'value' => 'Raddiant Plus Hospital'],
            ['key' => 'logo', 'value' => '/images/logo.png'],
            ['key' => 'tagline', 'value' => 'Multispecialty & Diagnostic Centre'],
            ['key' => 'phone', 'value' => '+91 93565 10704'],
            ['key' => 'whatsapp', 'value' => '919356510704'],
            ['key' => 'email', 'value' => 'care@raddiantplus.com'],
            ['key' => 'address', 'value' => 'Nashik, Maharashtra'],
            ['key' => 'facebook', 'value' => '#'],
            ['key' => 'instagram', 'value' => '#'],
            ['key' => 'youtube', 'value' => '#'],
            ['key' => 'emergency_number', 'value' => '108'],
            ['key' => 'footer_tagline', 'value' => 'Touching Lives, Healing Souls'],
            ['key' => 'footer_description', 'value' => 'Delivering comprehensive multispecialty hospital and diagnostic care.'],
            ['key' => 'footer_specialties_title', 'value' => 'Specialties'],
            ['key' => 'footer_specialties', 'value' => 'Cardiology,Orthopedics,Neurology,Pediatrics,Gynecology'],
            ['key' => 'footer_contact_title', 'value' => 'Contact Information'],
            ['key' => 'footer_address', 'value' => 'Nashik, Maharashtra'],
            ['key' => 'footer_phone', 'value' => '+91 93565 10704'],
            ['key' => 'footer_email', 'value' => 'care@raddiantplus.com'],
            ['key' => 'footer_timing', 'value' => '24x7 Emergency | OPD: Mon-Sat 9:00 AM - 6:00 PM'],
            ['key' => 'nav_home', 'value' => '1'],
            ['key' => 'nav_about', 'value' => '1'],
            ['key' => 'nav_services', 'value' => '1'],
            ['key' => 'nav_facilities', 'value' => '1'],
            ['key' => 'nav_blog', 'value' => '1'],
            ['key' => 'nav_gallery', 'value' => '1'],
            ['key' => 'nav_contact', 'value' => '1'],
            ['key' => 'nav_careers', 'value' => '1'],
            ['key' => 'nav_appointment', 'value' => '1'],
        ];

        foreach ($settings as $setting) {
            WebsiteSettings::firstOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
