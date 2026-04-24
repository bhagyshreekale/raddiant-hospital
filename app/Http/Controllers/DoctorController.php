<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Specialization;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DoctorController extends Controller
{
    public function publicShow(): Response
    {
        $doctors = Doctor::with('specialization')->get()->map(function ($doctor) {
            $imagePath = $doctor->image;
            
            if ($imagePath) {
                if (str_starts_with($imagePath, '/images/')) {
                    // Already in public folder - use as-is
                } elseif (str_starts_with($imagePath, 'http')) {
                    // External URL - use as-is
                } else {
                    // Storage path
                    $imagePath = '/storage/' . ltrim($imagePath, '/');
                }
            } else {
                // Default placeholder
                $imagePath = 'https://randomuser.me/api/portraits/doctor.jpg';
            }

            return [
                'id' => $doctor->id,
                'name' => $doctor->name,
                'specialty' => $doctor->specialization?->name ?? 'General',
                'qual' => $doctor->education ?? '',
                'experience' => '10+ Years',
                'img' => $imagePath,
                'available' => $doctor->availability ?? 'Mon-Sat',
            ];
        });

        return Inertia::render('doctors', [
            'doctors' => $doctors,
        ]);
    }

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
