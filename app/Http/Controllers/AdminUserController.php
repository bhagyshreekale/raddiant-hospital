<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/admins/index', [
            'admins' => Admin::latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/admins/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:100|unique:admins,username',
            'password' => 'required|string|min:8',
        ]);

        $validated['password'] = bcrypt($validated['password']);

        Admin::create($validated);

        return redirect()->route('admins.index')
            ->with('message', 'Admin created successfully.');
    }

    public function edit(Admin $admin): Response
    {
        return Inertia::render('admin/admins/edit', [
            'admin' => $admin,
        ]);
    }

    public function update(Request $request, Admin $admin)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:100|unique:admins,username,'.$admin->id,
            'password' => 'nullable|string|min:8',
        ]);

        if (! empty($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        } else {
            unset($validated['password']);
        }

        $admin->update($validated);

        return redirect()->route('admins.index')
            ->with('message', 'Admin updated successfully.');
    }

    public function destroy(Admin $admin)
    {
        $admin->delete();

        return redirect()->route('admins.index')
            ->with('message', 'Admin deleted successfully.');
    }
}
