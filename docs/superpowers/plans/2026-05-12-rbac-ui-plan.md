# RBAC UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add full RBAC management UI for roles and permissions with React/Inertia frontend

**Architecture:** Laravel controllers with Inertia Response, React components following existing patterns (Card, Table, Form components), Spatie Permission for backend

**Tech Stack:** Laravel 13, Inertia.js v3, React 19, Spatie Laravel Permission

---

## Phase 1: Backend - Controllers & Form Requests

### Task 1: Create Form Requests

**Files:**
- Create: `app/Http/Requests/StoreRoleRequest.php`
- Create: `app/Http/Requests/UpdateRoleRequest.php`
- Create: `app/Http/Requests/StorePermissionRequest.php`
- Create: `app/Http/Requests/UpdatePermissionRequest.php`

- [ ] **Step 1: Create StoreRoleRequest**

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('roles.create') ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:roles,name'],
            'description' => ['nullable', 'string', 'max:500'],
        ];
    }
}
```

- [ ] **Step 2: Create UpdateRoleRequest**

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('roles.edit') ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', Rule::unique('roles', 'name')->ignore($this->route('role'))],
            'description' => ['nullable', 'string', 'max:500'],
        ];
    }
}
```

- [ ] **Step 3: Create StorePermissionRequest**

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePermissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('permissions.create') ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:permissions,name'],
            'group' => ['required', 'string', 'max:255'],
        ];
    }

    protected function prepareForValidation(): void
    {
        if (empty($this->slug) && $this->name) {
            $this->merge([
                'slug' => str($this->name)->lower()->replace(' ', '-')->toString(),
            ]);
        }

        if (empty($this->group) && $this->slug) {
            $parts = explode('.', $this->slug);
            $this->merge([
                'group' => $parts[0] ?? $this->slug,
            ]);
        }
    }
}
```

- [ ] **Step 4: Create UpdatePermissionRequest**

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePermissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('permissions.edit') ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('permissions', 'name')->ignore($this->route('permission'))],
            'group' => ['required', 'string', 'max:255'],
        ];
    }
}
```

---

### Task 2: Create RolesController

**Files:**
- Create: `app/Http/Controllers/Admin/RolesController.php`

- [ ] **Step 1: Write RolesController with index, create, store, edit, update, destroy**

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesController extends Controller
{
    public function index(): Response
    {
        $roles = Role::where('guard_name', 'admin')
            ->withCount(['permissions', 'users'])
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/roles/index', [
            'roles' => $roles,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/roles/create');
    }

    public function store(StoreRoleRequest $request)
    {
        $role = Role::create([
            'name' => $request->validated('name'),
            'guard_name' => 'admin',
            ...($request->validated('description') ? ['description' => $request->validated('description')] : []),
        ]);

        return redirect()->route('roles.index')
            ->with('message', 'Role created successfully.');
    }

    public function edit(Role $role): Response
    {
        $role->load('permissions');

        $allPermissions = Permission::where('guard_name', 'admin')
            ->orderBy('group')
            ->orderBy('name')
            ->get()
            ->groupBy('group');

        $groupedPermissions = $allPermissions->map(fn ($perms) => $perms->map(fn ($p) => [
            'id' => $p->id,
            'name' => $p->name,
            'slug' => $p->name,
        ]));

        return Inertia::render('admin/roles/edit', [
            'role' => $role,
            'groupedPermissions' => $groupedPermissions,
            'assignedPermissionIds' => $role->permissions->pluck('id')->toArray(),
        ]);
    }

    public function update(UpdateRoleRequest $request, Role $role)
    {
        $role->update($request->validated());

        if ($request->has('permission_ids')) {
            $role->syncPermissions($request->input('permission_ids', []));
        }

        return redirect()->route('roles.index')
            ->with('message', 'Role updated successfully.');
    }

    public function destroy(Role $role)
    {
        if ($role->users()->count() > 0) {
            return redirect()->route('roles.index')
                ->with('error', 'Cannot delete role with assigned users.');
        }

        if (in_array($role->name, ['Super Admin', 'Admin', 'Receptionist'])) {
            return redirect()->route('roles.index')
                ->with('error', 'Cannot delete system role.');
        }

        $role->delete();

        return redirect()->route('roles.index')
            ->with('message', 'Role deleted successfully.');
    }
}
```

---

### Task 3: Create PermissionsController

**Files:**
- Create: `app/Http/Controllers/Admin/PermissionsController.php`

- [ ] **Step 1: Write PermissionsController with CRUD**

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePermissionRequest;
use App\Http\Requests\UpdatePermissionRequest;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsController extends Controller
{
    public function index(): Response
    {
        $permissions = Permission::where('guard_name', 'admin')
            ->withCount('roles')
            ->orderBy('group')
            ->orderBy('name')
            ->get()
            ->groupBy('group');

        return Inertia::render('admin/permissions/index', [
            'groupedPermissions' => $permissions->map(fn ($perms) => $perms->map(fn ($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->name,
                'group' => $p->group,
                'roles_count' => $p->roles_count,
            ])),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/permissions/create');
    }

    public function store(StorePermissionRequest $request)
    {
        Permission::create([
            'name' => $request->validated('slug'),
            'guard_name' => 'admin',
        ]);

        return redirect()->route('permissions.index')
            ->with('message', 'Permission created successfully.');
    }

    public function edit(Permission $permission): Response
    {
        return Inertia::render('admin/permissions/edit', [
            'permission' => [
                'id' => $permission->id,
                'name' => $permission->name,
                'slug' => $permission->name,
                'group' => $permission->group ?? explode('.', $permission->name)[0],
            ],
        ]);
    }

    public function update(UpdatePermissionRequest $request, Permission $permission)
    {
        $permission->update(['name' => $request->validated('slug')]);

        return redirect()->route('permissions.index')
            ->with('message', 'Permission updated successfully.');
    }

    public function destroy(Permission $permission)
    {
        if ($permission->roles()->count() > 0) {
            return redirect()->route('permissions.index')
                ->with('error', 'Cannot delete permission assigned to roles.');
        }

        $permission->delete();

        return redirect()->route('permissions.index')
            ->with('message', 'Permission deleted successfully.');
    }
}
```

---

## Phase 2: Routes

### Task 4: Add Routes

**Files:**
- Modify: `routes/admin.php:1-20` (add imports)
- Modify: `routes/admin.php:160-165` (add route groups)

- [ ] **Step 1: Add controller imports to admin.php**

Add at top of file after existing imports:
```php
use App\Http\Controllers\Admin\RolesController;
use App\Http\Controllers\Admin\PermissionsController;
```

- [ ] **Step 2: Add RBAC routes**

Add before utility routes (line ~163):
```php
// Roles Management
Route::middleware(['web', 'auth:admin', 'permission:roles.view-any'])->group(function () {
    Route::get('admin/roles', [RolesController::class, 'index'])->name('roles.index');
    Route::get('admin/roles/create', [RolesController::class, 'create'])->name('roles.create')
        ->middleware('permission:roles.create');
    Route::post('admin/roles', [RolesController::class, 'store'])->name('roles.store')
        ->middleware('permission:roles.create');
    Route::get('admin/roles/{role}/edit', [RolesController::class, 'edit'])->name('roles.edit')
        ->middleware('permission:roles.edit');
    Route::put('admin/roles/{role}', [RolesController::class, 'update'])->name('roles.update')
        ->middleware('permission:roles.edit');
    Route::delete('admin/roles/{role}', [RolesController::class, 'destroy'])->name('roles.destroy')
        ->middleware('permission:roles.delete');
});

// Permissions Management
Route::middleware(['web', 'auth:admin', 'permission:permissions.view-any'])->group(function () {
    Route::get('admin/permissions', [PermissionsController::class, 'index'])->name('permissions.index');
    Route::get('admin/permissions/create', [PermissionsController::class, 'create'])->name('permissions.create')
        ->middleware('permission:permissions.create');
    Route::post('admin/permissions', [PermissionsController::class, 'store'])->name('permissions.store')
        ->middleware('permission:permissions.create');
    Route::get('admin/permissions/{permission}/edit', [PermissionsController::class, 'edit'])->name('permissions.edit')
        ->middleware('permission:permissions.edit');
    Route::put('admin/permissions/{permission}', [PermissionsController::class, 'update'])->name('permissions.update')
        ->middleware('permission:permissions.edit');
    Route::delete('admin/permissions/{permission}', [PermissionsController::class, 'destroy'])->name('permissions.destroy')
        ->middleware('permission:permissions.delete');
});
```

---

## Phase 3: Frontend Pages

### Task 5: Roles Index Page

**Files:**
- Create: `resources/js/pages/admin/roles/index.tsx`

- [ ] **Step 1: Create Roles index page**

```tsx
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Role {
    id: number;
    name: string;
    description: string | null;
    permissions_count: number;
    users_count: number;
    created_at: string;
}

interface Props {
    roles: Role[];
}

export default function Index({ roles }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (name === 'Super Admin' || name === 'Admin' || name === 'Receptionist') {
            alert('Cannot delete system role.');
            return;
        }
        if (confirm('Are you sure you want to delete this role?')) {
            destroy(`/admin/roles/${id}`);
        }
    };

    return (
        <div className="p-8">
            <Head title="Manage Roles" />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Roles</h1>
                <Button asChild>
                    <Link href="/admin/roles/create">
                        <Plus className="mr-2 h-4 w-4" /> Create Role
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Roles</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Permissions</TableHead>
                                <TableHead>Users</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles.length > 0 ? (
                                roles.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell className="font-medium">
                                            {role.name}
                                            {['Super Admin', 'Admin', 'Receptionist'].includes(role.name) && (
                                                <Badge variant="secondary" className="ml-2">
                                                    System
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {role.description || '-'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{role.permissions_count}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{role.users_count}</Badge>
                                        </TableCell>
                                        <TableCell className="space-x-2 text-right">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/admin/roles/${role.id}/edit`}>
                                                    <Pencil className="mr-1 h-4 w-4" /> Edit
                                                </Link>
                                            </Button>
                                            {!['Super Admin', 'Admin', 'Receptionist'].includes(role.name) && (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(role.id, role.name)}
                                                >
                                                    <Trash2 className="mr-1 h-4 w-4" /> Delete
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                        No roles found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
```

---

### Task 6: Roles Create Page

**Files:**
- Create: `resources/js/pages/admin/roles/create.tsx`

- [ ] **Step 1: Create Role create page**

```tsx
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/roles');
    };

    return (
        <div className="p-8">
            <Head title="Create Role" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Create Role</h1>
            </div>

            <div className="max-w-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Enter role name"
                            required
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Enter role description (optional)"
                            rows={3}
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Role'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <a href="/admin/roles">Cancel</a>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
```

---

### Task 7: Roles Edit Page with Permission Grid

**Files:**
- Create: `resources/js/pages/admin/roles/edit.tsx`

- [ ] **Step 1: Create Role edit page with permission grid**

```tsx
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';

interface Permission {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    role: {
        id: number;
        name: string;
        description: string | null;
    };
    groupedPermissions: Record<string, Permission[]>;
    assignedPermissionIds: number[];
}

export default function Edit({ role, groupedPermissions, assignedPermissionIds }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        description: role.description || '',
        permission_ids: assignedPermissionIds,
    });

    const handlePermissionToggle = (permissionId: number) => {
        const current = data.permission_ids || [];
        const updated = current.includes(permissionId)
            ? current.filter((id) => id !== permissionId)
            : [...current, permissionId];
        setData('permission_ids', updated);
    };

    const handleSelectAll = (group: string, select: boolean) => {
        const groupPerms = groupedPermissions[group] || [];
        const groupIds = groupPerms.map((p) => p.id);
        const current = data.permission_ids || [];

        if (select) {
            const merged = [...new Set([...current, ...groupIds])];
            setData('permission_ids', merged);
        } else {
            const filtered = current.filter((id) => !groupIds.includes(id));
            setData('permission_ids', filtered);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/roles/${role.id}`);
    };

    return (
        <div className="p-8">
            <Head title="Edit Role" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Edit Role</h1>
            </div>

            <div className="max-w-4xl space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Role Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <a href="/admin/roles">Cancel</a>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Permissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {Object.keys(groupedPermissions).length > 0 ? (
                            <div className="space-y-6">
                                {Object.entries(groupedPermissions).map(([group, permissions]) => {
                                    const groupIds = permissions.map((p) => p.id);
                                    const selectedCount = (data.permission_ids || []).filter((id) => groupIds.includes(id)).length;
                                    const allSelected = selectedCount === permissions.length;

                                    return (
                                        <div key={group} className="border-b pb-4 last:border-0">
                                            <div className="mb-3 flex items-center justify-between">
                                                <h3 className="font-medium capitalize">{group}</h3>
                                                <div className="space-x-2">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleSelectAll(group, true)}
                                                    >
                                                        Select All ({selectedCount}/{permissions.length})
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleSelectAll(group, false)}
                                                    >
                                                        Deselect All
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                                                {permissions.map((permission) => (
                                                    <label
                                                        key={permission.id}
                                                        className="flex items-center gap-2 rounded border p-2 hover:bg-muted cursor-pointer"
                                                    >
                                                        <Checkbox
                                                            checked={(data.permission_ids || []).includes(permission.id)}
                                                            onCheckedChange={() => handlePermissionToggle(permission.id)}
                                                        />
                                                        <span className="text-sm">{permission.slug}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No permissions available.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
```

---

### Task 8: Permissions Index Page

**Files:**
- Create: `resources/js/pages/admin/permissions/index.tsx`

- [ ] **Step 1: Create Permissions index page**

```tsx
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Permission {
    id: number;
    name: string;
    slug: string;
    group: string;
    roles_count: number;
}

interface Props {
    groupedPermissions: Record<string, Permission[]>;
}

export default function Index({ groupedPermissions }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this permission?')) {
            destroy(`/admin/permissions/${id}`);
        }
    };

    const groupNames = Object.keys(groupedPermissions).sort();

    return (
        <div className="p-8">
            <Head title="Manage Permissions" />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Permissions</h1>
                <Button asChild>
                    <Link href="/admin/permissions/create">
                        <Plus className="mr-2 h-4 w-4" /> Create Permission
                    </Link>
                </Button>
            </div>

            {groupNames.length > 0 ? (
                <div className="space-y-6">
                    {groupNames.map((group) => (
                        <Card key={group}>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span className="capitalize">{group}</span>
                                    <Badge variant="outline">
                                        {groupedPermissions[group]?.length || 0} permissions
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[300px]">Name</TableHead>
                                            <TableHead>Slug</TableHead>
                                            <TableHead>Roles</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {groupedPermissions[group]?.map((permission) => (
                                            <TableRow key={permission.id}>
                                                <TableCell className="font-medium">{permission.name}</TableCell>
                                                <TableCell className="font-mono text-sm text-muted-foreground">
                                                    {permission.slug}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{permission.roles_count}</Badge>
                                                </TableCell>
                                                <TableCell className="space-x-2 text-right">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/admin/permissions/${permission.id}/edit`}>
                                                            <Pencil className="mr-1 h-4 w-4" /> Edit
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleDelete(permission.id)}
                                                        disabled={permission.roles_count > 0}
                                                    >
                                                        <Trash2 className="mr-1 h-4 w-4" /> Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="py-10 text-center text-muted-foreground">
                        No permissions found.
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
```

---

### Task 9: Permissions Create Page

**Files:**
- Create: `resources/js/pages/admin/permissions/create.tsx`

- [ ] **Step 1: Create Permission create page**

```tsx
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        group: '',
    });

    useEffect(() => {
        if (data.name && !data.slug) {
            const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            setData('slug', slug);
        }
        if (data.slug && !data.group) {
            const parts = data.slug.split('.');
            setData('group', parts[0] || data.slug);
        }
    }, [data.name, data.slug]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/permissions');
    };

    return (
        <div className="p-8">
            <Head title="Create Permission" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Create Permission</h1>
            </div>

            <div className="max-w-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g., View Doctors"
                            required
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            placeholder="e.g., doctors.view"
                            required
                        />
                        <p className="text-sm text-muted-foreground">
                            Format: resource.action (e.g., doctors.view, doctors.create)
                        </p>
                        <InputError message={errors.slug} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="group">Group</Label>
                        <Input
                            id="group"
                            value={data.group}
                            onChange={(e) => setData('group', e.target.value)}
                            placeholder="e.g., doctors"
                            required
                        />
                        <InputError message={errors.group} />
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Permission'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <a href="/admin/permissions">Cancel</a>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
```

---

### Task 10: Permissions Edit Page

**Files:**
- Create: `resources/js/pages/admin/permissions/edit.tsx`

- [ ] **Step 1: Create Permission edit page**

```tsx
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface Props {
    permission: {
        id: number;
        name: string;
        slug: string;
        group: string;
    };
}

export default function Edit({ permission }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: permission.name,
        slug: permission.slug,
        group: permission.group,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/permissions/${permission.id}`);
    };

    return (
        <div className="p-8">
            <Head title="Edit Permission" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Edit Permission</h1>
            </div>

            <div className="max-w-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            required
                        />
                        <InputError message={errors.slug} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="group">Group</Label>
                        <Input
                            id="group"
                            value={data.group}
                            onChange={(e) => setData('group', e.target.value)}
                            required
                        />
                        <InputError message={errors.group} />
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <a href="/admin/permissions">Cancel</a>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
```

---

## Phase 4: Navigation & Permissions Seeding

### Task 11: Add Navigation Items

**Files:**
- Modify: `resources/js/components/app-sidebar.tsx` (find and add nav items)

- [ ] **Step 1: Find and add Roles and Permissions to sidebar**

Find the navigation items section and add:
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

---

### Task 12: Seed RBAC Management Permissions

**Files:**
- Modify: `database/seeders/RoleAndPermissionSeeder.php` (add new permissions)

- [ ] **Step 1: Add permissions for roles and permissions management**

Add to the `$adminPermissions` array before 'admins' entries:
```php
// RBAC Management
'roles.view-any',
'roles.create',
'roles.edit',
'roles.delete',
'permissions.view-any',
'permissions.create',
'permissions.edit',
'permissions.delete',
```

Then ensure Admin role gets these permissions (already gets all via `$adminPermissions`).

---

## Phase 5: Testing

### Task 13: Run Tests

- [ ] **Step 1: Run the application tests**

```bash
php artisan test --compact
```

- [ ] **Step 2: Verify the pages load**

Visit `/admin/roles` and `/admin/permissions` to confirm pages render correctly.

---

## Summary

| Task | Description |
|------|-------------|
| 1 | Create 4 Form Request classes for validation |
| 2 | Create RolesController with full CRUD |
| 3 | Create PermissionsController with full CRUD |
| 4 | Add routes for both controllers |
| 5 | Create roles index page |
| 6 | Create roles create page |
| 7 | Create roles edit page with permission grid |
| 8 | Create permissions index page |
| 9 | Create permissions create page |
| 10 | Create permissions edit page |
| 11 | Add sidebar navigation items |
| 12 | Seed RBAC management permissions |
| 13 | Run tests and verify |