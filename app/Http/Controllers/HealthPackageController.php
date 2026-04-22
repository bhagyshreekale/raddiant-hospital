<?php

namespace App\Http\Controllers;

use App\Models\HealthPackage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HealthPackageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/health-packages/index', [
            'packages' => HealthPackage::latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/health-packages/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
        ]);

        HealthPackage::create($validated);

        return redirect()->route('health-packages.index')
            ->with('message', 'Health package created successfully.');
    }

    public function edit(HealthPackage $healthPackage): Response
    {
        return Inertia::render('admin/health-packages/edit', [
            'healthPackage' => $healthPackage,
        ]);
    }

    public function update(Request $request, HealthPackage $healthPackage)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
        ]);

        $healthPackage->update($validated);

        return redirect()->route('health-packages.index')
            ->with('message', 'Health package updated successfully.');
    }

    public function destroy(HealthPackage $healthPackage)
    {
        $healthPackage->delete();

        return redirect()->route('health-packages.index')
            ->with('message', 'Health package deleted successfully.');
    }
}
