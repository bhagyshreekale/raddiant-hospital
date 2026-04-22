<?php

namespace App\Http\Controllers;

use App\Models\BedAvailability;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BedAvailabilityController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/bed-availability/index', [
            'beds' => BedAvailability::latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/bed-availability/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'total_beds' => 'required|integer|min:0',
            'available_beds' => 'required|integer|min:0',
            'status' => 'required|in:Good,Limited,Full',
        ]);

        BedAvailability::create($validated);

        return redirect()->route('bed-availability.index')
            ->with('message', 'Bed availability created successfully.');
    }

    public function edit(BedAvailability $bedAvailability): Response
    {
        return Inertia::render('admin/bed-availability/edit', [
            'bedAvailability' => $bedAvailability,
        ]);
    }

    public function update(Request $request, BedAvailability $bedAvailability)
    {
        $validated = $request->validate([
            'total_beds' => 'required|integer|min:0',
            'available_beds' => 'required|integer|min:0',
            'status' => 'required|in:Good,Limited,Full',
        ]);

        $bedAvailability->update($validated);

        return redirect()->route('bed-availability.index')
            ->with('message', 'Bed availability updated successfully.');
    }

    public function destroy(BedAvailability $bedAvailability)
    {
        $bedAvailability->delete();

        return redirect()->route('bed-availability.index')
            ->with('message', 'Bed availability deleted successfully.');
    }
}
