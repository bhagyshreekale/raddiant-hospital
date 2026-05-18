# RBAC UI Design Specification

## Overview

Add a complete Role-Based Access Control (RBAC) management UI to the Laravel admin panel, allowing users to manage roles, permissions, and assign them to admin users.

## Architecture

### Existing System
- Spatie Laravel Permission package already installed
- Admin model uses `HasRoles` trait
- Roles and permissions seeded in `RoleAndPermissionSeeder`
- Permission middleware protecting routes

### New Components
1. **RolesController** - Full CRUD for roles with permission management
2. **PermissionsController** - Full CRUD for permissions
3. **Frontend pages** - React/Inertia pages for both controllers

## Pages

### 1. Roles Index (`/admin/roles`)

**Route:** `Route::get('admin/roles', [RolesController::class, 'index'])->name('roles.index')`

**Features:**
- Table listing all roles with: name, description, permission count, user count
- Columns: Name, Description, Permissions, Users, Actions
- "Create Role" button (opens modal or navigates to create page)
- Edit/Delete actions per row

**Permissions Required:** `permission:roles.view-any`

### 2. Create Role (`/admin/roles/create`)

**Route:** `Route::get('admin/roles/create', [RolesController::class, 'create'])->name('roles.create')`

**Form Fields:**
- Name (text, required, unique)
- Description (textarea, optional)

**Permissions Required:** `permission:roles.create`

### 3. Edit Role (`/admin/roles/{role}/edit`)

**Route:** `Route::get('admin/roles/{role}/edit', [RolesController::class, 'edit'])->name('roles.edit')`

**Features:**
- Edit name and description
- Permission assignment grid grouped by resource
- Checkbox per permission with group headers

**Permissions Required:** `permission:roles.edit`

### 4. Permissions Index (`/admin/permissions`)

**Route:** `Route::get('admin/permissions', [PermissionsController::class, 'index'])->name('permissions.index')`

**Features:**
- Table listing all permissions grouped by resource
- Group headers with collapsible sections
- Columns: Name, Slug, Group, Roles Count, Actions
- "Create Permission" button
- Edit/Delete actions

**Permissions Required:** `permission:permissions.view-any`

### 5. Create/Edit Permission

**Routes:**
- `Route::get('admin/permissions/create', ...)->name('permissions.create')`
- `Route::get('admin/permissions/{permission}/edit', ...)`

**Form Fields:**
- Name (text, required)
- Slug (text, auto-generated from name, editable, unique)
- Group (text, auto-generated from slug prefix, editable)

**Permissions Required:** `permission:permissions.create`, `permission:permissions.edit`

## Database Changes

None required - using existing Spatie tables.

## Middleware

Update routes with permission middleware:
```php
Route::middleware('permission:roles.view-any')->group(function () {
    Route::get('admin/roles', ...);
    Route::get('admin/roles/create', ...)->middleware('permission:roles.create');
});

Route::middleware('permission:roles.edit')->group(function () {
    Route::get('admin/roles/{role}/edit', ...);
    Route::put('admin/roles/{role}', ...);
});

Route::middleware('permission:roles.delete')->group(function () {
    Route::delete('admin/roles/{role}', ...);
});
```

## Navigation

Add to sidebar in `app-sidebar.tsx`:
```typescript
{
    title: 'Roles',
    href: '/admin/roles',
    permission: 'roles.view-any',
},
{
    title: 'Permissions',
    href: '/admin/permissions',
    permission: 'permissions.view-any',
},
```

## Components

### Permission Grid (Edit Role Page)
- Grouped display by resource (e.g., "Doctors", "Appointments")
- Checkbox per permission
- "Select All" / "Deselect All" per group
- Visual indication of selected count per group

### Permission List (Index Page)
- Collapsible groups
- Badges showing role count per permission

## Acceptance Criteria

1. Super Admin can view, create, edit, delete roles
2. Super Admin can view, create, edit, delete permissions
3. Role editing allows assigning/removing permissions via checkbox grid
4. Permission CRUD works with validation (unique slug, valid group)
5. Cannot delete role with assigned users (show error)
6. Cannot delete permission assigned to roles (show error)
7. Sidebar shows Roles/Permissions based on user permissions
8. All forms have proper validation and error messages

## Test Scenarios

1. Create role with permissions, verify in list
2. Edit role, add/remove permissions, verify save
3. Delete role with users - should fail with error
4. Create permission with auto-generated slug
5. Delete permission assigned to role - should fail
6. Non-super-admin cannot see Roles/Permissions in nav