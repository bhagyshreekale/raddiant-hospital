<?php

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $galleries = [
            ['title' => 'Modern Operation Theatres', 'category' => 'Facilities', 'image' => '/images/gallery/operation-theatre-1.jpg'],
            ['title' => 'ICU Setup', 'category' => 'Facilities', 'image' => '/images/gallery/icu-1.jpg'],
            ['title' => 'Patient Rooms', 'category' => 'Facilities', 'image' => '/images/gallery/patient-room-1.jpg'],
            ['title' => 'Emergency Entrance', 'category' => 'Emergency', 'image' => '/images/gallery/emergency-1.jpg'],
            ['title' => 'Diagnostic Centre', 'category' => 'Diagnostics', 'image' => '/images/gallery/diagnostics-1.jpg'],
            ['title' => 'Laboratory', 'category' => 'Diagnostics', 'image' => '/images/gallery/lab-1.jpg'],
            ['title' => 'Reception Area', 'category' => 'General', 'image' => '/images/gallery/reception-1.jpg'],
            ['title' => 'Waiting Area', 'category' => 'General', 'image' => '/images/gallery/waiting-1.jpg'],
        ];

        foreach ($galleries as $gallery) {
            Gallery::firstOrCreate(['title' => $gallery['title']], $gallery);
        }
    }
}
