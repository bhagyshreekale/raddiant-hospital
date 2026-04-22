<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Specialization;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DoctorController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/doctors/index', [
            'doctors' => Doctor::with('specialization')->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/doctors/create', [
            'specializations' => Specialization::all()->map(fn ($s) => ['id' => $s->id, 'name' => $s->name]),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'specialization_id' => 'nullable|exists:specializations,id',
            'education' => 'nullable|string|max:100',
            'image' => 'nullable|string',
            'availability' => 'nullable|string',
        ]);

        Doctor::create($validated);

        return redirect()->route('doctors.index')
            ->with('message', 'Doctor created successfully.');
    }

    public function edit(Doctor $doctor): Response
    {
        return Inertia::render('admin/doctors/edit', [
            'doctor' => $doctor,
            'specializations' => Specialization::all()->map(fn ($s) => ['id' => $s->id, 'name' => $s->name]),
        ]);
    }

    public function update(Request $request, Doctor $doctor)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'specialization_id' => 'nullable|exists:specializations,id',
            'education' => 'nullable|string|max:100',
            'image' => 'nullable|string',
            'availability' => 'nullable|string',
        ]);

        $doctor->update($validated);

        return redirect()->route('doctors.index')
            ->with('message', 'Doctor updated successfully.');
    }

    public function destroy(Doctor $doctor)
    {
        $doctor->delete();

        return redirect()->route('doctors.index')
            ->with('message', 'Doctor deleted successfully.');
    }
}
