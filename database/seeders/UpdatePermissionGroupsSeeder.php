<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class UpdatePermissionGroupsSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = Permission::all();

        foreach ($permissions as $permission) {
            $parts = explode('.', $permission->name);
            $group = $parts[0] ?? $permission->name;
            $permission->update(['group' => $group]);
        }
    }
}
