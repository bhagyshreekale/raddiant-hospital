<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        Admin::firstOrCreate(
            ['username' => 'admin'],
            ['username' => 'admin', 'password' => Hash::make('admin123'), 'role' => 'admin']
        );

        Admin::firstOrCreate(
            ['username' => 'receptionist'],
            ['username' => 'receptionist', 'password' => Hash::make('receptionist123'), 'role' => 'receptionist']
        );
    }
}
