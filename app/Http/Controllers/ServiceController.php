<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function publicShow(): Response
    {
        $services = Service::all()->map(function ($service) {
            $imagePath = $service->image;
            
            // Handle image paths - different locations
            if ($imagePath) {
                if (str_starts_with($imagePath, '/images/')) {
                    // Already in public folder - use as-is
                } elseif (str_starts_with($imagePath, 'http')) {
                    // External URL - use as-is
                } else {
                    // Storage path
                    $imagePath = '/storage/' . ltrim($imagePath, '/');
                }
            }

            return [
                'id' => $service->id,
                'title' => $service->title,
                'image' => $imagePath,
                'desc' => $service->description,
                'color' => $service->color ?? '#0a4d8c',
            ];
        });

        return Inertia::render('services', [
            'services' => $services,
        ]);
    }

    public function index(): Response
    {
        return Inertia::render('admin/services/index', [
            'services' => Service::latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/services/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:20',
        ]);

        Service::create($validated);

        return redirect()->route('services.index')
            ->with('message', 'Service created successfully.');
    }

    public function edit(Service $service): Response
    {
        return Inertia::render('admin/services/edit', [
            'service' => $service,
        ]);
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:20',
        ]);

        $service->update($validated);

        return redirect()->route('services.index')
            ->with('message', 'Service updated successfully.');
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()->route('services.index')
            ->with('message', 'Service deleted successfully.');
    }
}