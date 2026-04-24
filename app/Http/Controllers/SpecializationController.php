<?php

namespace App\Http\Controllers;

use App\Models\Specialization;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SpecializationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/specializations/index', [
            'specializations' => Specialization::latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/specializations/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        Specialization::create($validated);

        return redirect()->route('specializations.index')
            ->with('message', 'Specialization created successfully.');
    }

    public function edit(Specialization $specialization): Response
    {
        return Inertia::render('admin/specializations/edit', [
            'specialization' => $specialization,
        ]);
    }

    public function update(Request $request, Specialization $specialization)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $specialization->update($validated);

        return redirect()->route('specializations.index')
            ->with('message', 'Specialization updated successfully.');
    }

    public function destroy(Specialization $specialization)
    {
        $specialization->delete();

        return redirect()->route('specializations.index')
            ->with('message', 'Specialization deleted successfully.');
    }
}