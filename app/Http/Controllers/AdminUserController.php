<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class AdminUserController extends Controller
{
    public function index(): Response
    {
        $admins = Admin::with('roles')->latest()->get();

        return Inertia::render('admin/admins/index', [
            'admins' => $admins,
            'isSuperAdmin' => auth()->guard('admin')->user()->isSuperAdmin(),
        ]);
    }

    public function create(): Response
    {
        if (! auth()->guard('admin')->user()->isSuperAdmin()) {
            abort(403, 'Only Super Admin can create new admins.');
        }

        return Inertia::render('admin/admins/create', [
            'roles' => Role::where('guard_name', 'admin')->pluck('name'),
        ]);
    }

    public function store(Request $request)
    {
        if (! auth()->guard('admin')->user()->isSuperAdmin()) {
            abort(403, 'Only Super Admin can create new admins.');
        }

        $validated = $request->validate([
            'username' => 'required|string|max:100|unique:admins,username',
            'password' => 'required|string|min:8',
            'role' => 'required|string|exists:roles,name',
        ]);

        $validated['password'] = bcrypt($validated['password']);

        $admin = Admin::create(Arr::except($validated, ['role']));
        $admin->assignRole($validated['role']);

        return redirect()->route('admins.index')
            ->with('message', 'Admin created successfully.');
    }

    public function edit(Admin $admin): Response
    {
        $admin->load('roles');

        return Inertia::render('admin/admins/edit', [
            'admin' => $admin,
            'roles' => Role::where('guard_name', 'admin')->pluck('name'),
        ]);
    }

    public function update(Request $request, Admin $admin)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:100|unique:admins,username,'.$admin->id,
            'password' => 'nullable|string|min:8',
            'role' => 'required|string|exists:roles,name',
        ]);

        if (! empty($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        } else {
            unset($validated['password']);
        }

        $admin->update(Arr::except($validated, ['role']));
        $admin->syncRoles([$validated['role']]);

        return redirect()->route('admins.index')
            ->with('message', 'Admin updated successfully.');
    }

    public function destroy(Admin $admin)
    {
        if (! auth()->guard('admin')->user()->isSuperAdmin()) {
            abort(403, 'Only Super Admin can delete admins.');
        }

        if ($admin->isSuperAdmin()) {
            return redirect()->route('admins.index')
                ->with('error', 'Cannot delete a Super Admin.');
        }

        $admin->delete();

        return redirect()->route('admins.index')
            ->with('message', 'Admin deleted successfully.');
    }
}
