<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePermissionRequest;
use App\Http\Requests\UpdatePermissionRequest;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;

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
