# Admin Users Management

## Overview

Manage admin user accounts. Create, edit, and delete admin users who can access the admin panel.

## Routes

```
GET  /admin/admins              → AdminUserController@index
GET  /admin/admins/create       → AdminUserController@create
POST /admin/admins              → AdminUserController@store
GET  /admin/admins/{admin}      → AdminUserController@edit
PUT  /admin/admins/{admin}      → AdminUserController@update
DELETE /admin/admins/{admin}    → AdminUserController@destroy
```

## Controller

**File:** `app/Http/Controllers/AdminUserController.php`

## Model

**File:** `app/Models/Admin.php`

### Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| username | string | Login username (unique) |
| password | string | Hashed password |
| two_factor_secret | text, nullable | Encrypted TOTP secret |
| two_factor_recovery_codes | text, nullable | JSON array of hashed codes |
| two_factor_confirmed_at | timestamp, nullable | When 2FA was confirmed |
| remember_token | string, nullable | Remember me token |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### Relationships (Spatie Permission)

| Relationship | Type | Description |
|-------------|------|-------------|
| `roles` | belongsToMany | User's roles |
| `permissions` | belongsToMany | User's direct permissions |

## RBAC Permissions

| Permission | Description |
|-----------|-------------|
| `view_admin_users` | View admin list |
| `create_admin_users` | Create new admins |
| `edit_admin_users` | Edit admin profiles |
| `delete_admin_users` | Delete admins |

## Frontend Pages

| Page | File | Purpose |
|------|------|---------|
| List | `resources/js/pages/admin/admins/index.tsx` | Admin user listing |
| Create | `resources/js/pages/admin/admins/create.tsx` | Create new admin |
| Edit | `resources/js/pages/admin/admins/edit.tsx` | Edit admin profile |

## Features

- Username-based authentication (not email)
- Role assignment (Super Admin, Admin, Receptionist)
- Password hashing (bcrypt)
- Optional 2FA setup
- Profile editing
- Account deletion

## Admin Seeder

**File:** `database/seeders/AdminSeeder.php`

Creates default admin user for initial access.

---

## Related Documentation

- [Authentication](./authentication.md) - Login, 2FA, password management
- [RBAC](./rbac.md) - Roles assigned to admin users
- [Dashboard](./dashboard.md) - Admin dashboard access
- [Database Schema](./database-schema.md) - Admin table structure
- [README](./README.md) - Application overview
