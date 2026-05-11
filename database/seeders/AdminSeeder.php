<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $admin = Admin::firstOrCreate(
            ['username' => 'admin'],
            ['username' => 'admin', 'password' => Hash::make('admin123'), 'role' => 'admin']
        );
        $admin->assignRole('Super Admin');

        $receptionist = Admin::firstOrCreate(
            ['username' => 'receptionist'],
            ['username' => 'receptionist', 'password' => Hash::make('receptionist123'), 'role' => 'receptionist']
        );
        $receptionist->assignRole('Receptionist');
    }
}
