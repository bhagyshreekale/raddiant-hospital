# Role-Based Access Control (RBAC)

## Overview

The application uses **Spatie Laravel Permission** for role-based access control. Permissions are organized into groups for better management.

## Roles

| Role | Description | Access Level |
|------|-------------|--------------|
| `Super Admin` | Full system access | Bypasses all permission checks via `Gate::before` |
| `Admin` | Standard admin access | All granular permissions |
| `Receptionist` | Limited admin access | Specific permissions only |

## Permission Groups

Permissions are organized into groups:

### 1. Doctors
- `view_doctors` - View doctor list
- `create_doctors` - Create new doctors
- `edit_doctors` - Edit doctor profiles
- `delete_doctors` - Delete doctors

### 2. Specializations
- `view_specializations` - View specialization list
- `create_specializations` - Create new specializations
- `edit_specializations` - Edit specializations
- `delete_specializations` - Delete specializations

### 3. Services
- `view_services` - View service list
- `create_services` - Create new services
- `edit_services` - Edit services
- `delete_services` - Delete services

### 4. Appointments
- `view_appointments` - View appointment list
- `create_appointments` - Create new appointments
- `edit_appointments` - Edit appointments
- `delete_appointments` - Delete appointments

### 5. Bed Availability
- `view_bed_availability` - View bed status
- `create_bed_availability` - Create bed records
- `edit_bed_availability` - Update bed status
- `delete_bed_availability` - Delete bed records

### 6. Inquiries
- `view_inquiries` - View inquiry list
- `create_inquiries` - Create inquiries
- `edit_inquiries` - Edit/update inquiries
- `delete_inquiries` - Delete inquiries

### 7. Blogs
- `view_blogs` - View blog list
- `create_blogs` - Create new blogs
- `edit_blogs` - Edit blogs
- `delete_blogs` - Delete blogs

### 8. Testimonials
- `view_testimonials` - View testimonial list
- `create_testimonials` - Create new testimonials
- `edit_testimonials` - Edit testimonials
- `delete_testimonials` - Delete testimonials

### 9. Gallery
- `view_gallery` - View gallery items
- `create_gallery` - Upload gallery items
- `edit_gallery` - Edit gallery items
- `delete_gallery` - Delete gallery items

### 10. Careers
- `view_careers` - View career listings
- `create_careers` - Create job postings
- `edit_careers` - Edit job postings
- `delete_careers` - Delete job postings

### 11. Health Packages
- `view_health_packages` - View health packages
- `create_health_packages` - Create packages
- `edit_health_packages` - Edit packages
- `delete_health_packages` - Delete packages

### 12. Insurance Partners
- `view_insurance_partners` - View insurance list
- `create_insurance_partners` - Add insurance partners
- `edit_insurance_partners` - Edit insurance partners
- `delete_insurance_partners` - Delete insurance partners

### 13. Website Settings
- `view_website_settings` - View site settings
- `edit_website_settings` - Edit site settings

### 14. Admin Users
- `view_admin_users` - View admin list
- `create_admin_users` - Create new admins
- `edit_admin_users` - Edit admin profiles
- `delete_admin_users` - Delete admins

### 15. Roles & Permissions
- `view_roles` - View role list
- `create_roles` - Create new roles
- `edit_roles` - Edit roles
- `delete_roles` - Delete roles
- `view_permissions` - View permission list
- `create_permissions` - Create new permissions
- `edit_permissions` - Edit permissions
- `delete_permissions` - Delete permissions

### 16. Backup
- `view_backups` - View backup list
- `create_backups` - Create backups
- `delete_backups` - Delete backups
- `restore_backups` - Restore backups

### 17. Contact Info
- `view_contact` - View contact info
- `edit_contact` - Edit contact info

### 18. Tasks
- `view_tasks` - View task list
- `create_tasks` - Create tasks
- `edit_tasks` - Edit tasks
- `delete_tasks` - Delete tasks

### 19. Navigation Links
- `view_navigation_links` - View navigation links
- `edit_navigation_links` - Edit navigation links

### 20. Security Settings
- `view_security_settings` - View security settings
- `edit_security_settings` - Edit security settings

## Implementation

### Gate Bypass (Super Admin)
```php
// app/Providers/AppServiceProvider.php
Gate::before(function ($user, $ability) {
    return $user->hasRole('Super Admin') ? true : null;
});
```

### Permission Checking
```php
// In controllers
if ($user->cannot('edit_doctors')) {
    abort(403);
}

// In Inertia shared data
'permissions' => $user->getAllPermissions()->pluck('name'),
'role' => $user->getFirstRole()->name,
```

### Frontend Permission Check
```tsx
// In React pages
const { permissions } = usePage().props;

if (!permissions.includes('edit_doctors')) {
    return <Redirect to="/admin/403" />;
}
```

## Receptionist Permissions

Receptionists have limited access:
- Appointments: view, create, edit
- Bed Availability: view, create, edit
- Inquiries: view, edit
- Job Applications: view, edit
- Profile: view, edit
- Security Settings: view, edit
- Appearance: edit

## Routes Protected by RBAC

All admin routes are protected by the `EnsureUserIsAdmin` middleware (except roles/permissions which require Super Admin).

### Middleware Usage
```php
Route::middleware(['auth', EnsureUserIsAdmin::class])->group(function () {
    // Admin routes
});

Route::middleware(['auth', EnsureUserIsSuperAdmin::class])->group(function () {
    // Super Admin only routes (roles, permissions)
});
```

## Database Tables

| Table | Purpose |
|-------|---------|
| `permissions` | Permission definitions |
| `roles` | Role definitions |
| `model_has_permissions` | User-permission assignments |
| `model_has_roles` | User-role assignments |
| `role_has_permissions` | Role-permission assignments |

## Seeders

| Seeder | File | Purpose |
|--------|------|---------|
| `RoleAndPermissionSeeder` | `database/seeders/RoleAndPermissionSeeder.php` | Creates 3 roles + ~100 permissions |
| `UpdatePermissionGroupsSeeder` | `database/seeders/UpdatePermissionGroupsSeeder.php` | Updates permission group assignments |

## Frontend Pages

| Page | File | Purpose |
|------|------|---------|
| Roles List | `resources/js/pages/admin/roles/index.tsx` | List all roles |
| Role Create | `resources/js/pages/admin/roles/create.tsx` | Create new role |
| Role Edit | `resources/js/pages/admin/roles/edit.tsx` | Edit role |
| Permissions List | `resources/js/pages/admin/permissions/index.tsx` | List all permissions |
| Permission Create | `resources/js/pages/admin/permissions/create.tsx` | Create new permission |
| Permission Edit | `resources/js/pages/admin/permissions/edit.tsx` | Edit permission |
| 403 Error | `resources/js/pages/admin/errors/403.tsx` | Access denied page |

---

## Related Documentation

- [Authentication](./authentication.md) - Login, 2FA, password management
- [Admin Users](./admin-users.md) - Managing admin accounts with roles
- [Dashboard](./dashboard.md) - Stats display based on role permissions
- [Database Schema](./database-schema.md) - Spatie Permission table structure
- [README](./README.md) - Application overview
