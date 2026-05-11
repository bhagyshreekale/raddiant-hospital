<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Receptionist permissions (accessible by both Admin and Receptionist)
        $receptionistPermissions = [
            'appointments.view-any',
            'appointments.view',
            'appointments.update',
            'appointments.delete',
            'bed-availability.view-any',
            'bed-availability.view',
            'bed-availability.create',
            'bed-availability.update',
            'bed-availability.delete',
            'inquiries.view-any',
            'inquiries.delete',
            'inquiries.update-status',
            'job-applications.view-any',
            'job-applications.view',
            'job-applications.delete',
            'job-applications.download',
            'profile.edit',
            'profile.update',
            'security.edit',
            'security.update-password',
            'appearance.edit',
        ];

        // Admin-only permissions (full access resources)
        $adminPermissions = [
            'website-settings.view',
            'website-settings.update',
            'navigation-links.view-any',
            'navigation-links.create',
            'navigation-links.update',
            'navigation-links.delete',
            'navigation-links.reorder',
            'doctors.view-any',
            'doctors.view',
            'doctors.create',
            'doctors.update',
            'doctors.delete',
            'specializations.view-any',
            'specializations.view',
            'specializations.create',
            'specializations.update',
            'specializations.delete',
            'services.view-any',
            'services.view',
            'services.create',
            'services.update',
            'services.delete',
            'testimonials.view-any',
            'testimonials.view',
            'testimonials.create',
            'testimonials.update',
            'testimonials.delete',
            'blogs.view-any',
            'blogs.view',
            'blogs.create',
            'blogs.update',
            'blogs.delete',
            'gallery.view-any',
            'gallery.view',
            'gallery.create',
            'gallery.update',
            'gallery.delete',
            'careers.view-any',
            'careers.view',
            'careers.create',
            'careers.update',
            'careers.delete',
            'health-packages.view-any',
            'health-packages.view',
            'health-packages.create',
            'health-packages.update',
            'health-packages.delete',
            'insurance-partners.view-any',
            'insurance-partners.view',
            'insurance-partners.create',
            'insurance-partners.update',
            'insurance-partners.delete',
            'admins.view-any',
            'admins.view',
            'admins.update',
            'contact.view-any',
            'contact.view',
            'contact.create',
            'contact.update',
            'contact.delete',
            'two-factor.enable',
            'two-factor.disable',
            'two-factor.regenerate-codes',
        ];

        // Create all permissions
        foreach (array_merge($receptionistPermissions, $adminPermissions) as $permission) {
            Permission::create(['guard_name' => 'admin', 'name' => $permission]);
        }

        // Create roles and assign permissions

        // Super Admin - gets all permissions via gate bypass (no direct permission assignment needed)
        Role::create(['guard_name' => 'admin', 'name' => 'Super Admin']);

        // Admin - gets all granular permissions
        $adminRole = Role::create(['guard_name' => 'admin', 'name' => 'Admin']);
        $adminRole->givePermissionTo(array_merge($receptionistPermissions, $adminPermissions));

        // Receptionist - gets only receptionist-accessible permissions
        $receptionistRole = Role::create(['guard_name' => 'admin', 'name' => 'Receptionist']);
        $receptionistRole->givePermissionTo($receptionistPermissions);
    }
}
