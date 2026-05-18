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
