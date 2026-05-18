<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleAndPermissionSeeder::class,
            AdminSeeder::class,
            SpecializationSeeder::class,
            ServiceSeeder::class,
            DoctorSeeder::class,
            NavigationLinkSeeder::class,
            BlogSeeder::class,
            GallerySeeder::class,
            TestimonialSeeder::class,
            CareerSeeder::class,
            HealthPackageSeeder::class,
            InsurancePartnerSeeder::class,
            BedAvailabilitySeeder::class,
            WebsiteSettingsSeeder::class,
        ]);

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => 'password',
            ]
        );
    }
}
