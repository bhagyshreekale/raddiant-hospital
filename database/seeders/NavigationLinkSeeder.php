<?php

namespace Database\Seeders;

use App\Models\NavigationLink;
use Illuminate\Database\Seeder;

class NavigationLinkSeeder extends Seeder
{
    public function run(): void
    {
        $headerLinks = [
            ['label' => 'Home', 'url' => '/', 'is_visible' => true, 'sort_order' => 1],
            ['label' => 'About Us', 'url' => '/about', 'is_visible' => true, 'sort_order' => 2],
            ['label' => 'Services', 'url' => '/services', 'is_visible' => true, 'sort_order' => 3],
            ['label' => 'Facilities', 'url' => '/facilities', 'is_visible' => true, 'sort_order' => 4],
            ['label' => 'Gallery', 'url' => '/gallery', 'is_visible' => true, 'sort_order' => 5],
            ['label' => 'Contact', 'url' => '/contact', 'is_visible' => true, 'sort_order' => 6],
            ['label' => 'Book Appointment', 'url' => '/appointment', 'is_visible' => true, 'sort_order' => 7],
        ];

        foreach ($headerLinks as $link) {
            NavigationLink::create(['type' => 'header', ...$link]);
        }

        $footerLinks = [
            ['label' => 'Home', 'url' => '/', 'is_visible' => true, 'sort_order' => 1],
            ['label' => 'About Us', 'url' => '/about', 'is_visible' => true, 'sort_order' => 2],
            ['label' => 'Services', 'url' => '/services', 'is_visible' => true, 'sort_order' => 3],
            ['label' => 'Doctors', 'url' => '/doctors', 'is_visible' => true, 'sort_order' => 4],
            ['label' => 'Facilities', 'url' => '/facilities', 'is_visible' => true, 'sort_order' => 5],
            ['label' => 'Gallery', 'url' => '/gallery', 'is_visible' => true, 'sort_order' => 6],
            ['label' => 'Blog', 'url' => '/blog', 'is_visible' => true, 'sort_order' => 7],
        ];

        foreach ($footerLinks as $link) {
            NavigationLink::create(['type' => 'footer', ...$link]);
        }
    }
}
