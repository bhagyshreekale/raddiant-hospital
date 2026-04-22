<?php

namespace App\Http\Controllers;

use App\Models\Specialization;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/testimonials/index', [
            'testimonials' => Testimonial::with('specialization')->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/testimonials/create', [
            'specializations' => Specialization::all()->map(fn ($s) => ['id' => $s->id, 'name' => $s->name]),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'specialization_id' => 'nullable|exists:specializations,id',
            'patient_name' => 'required|string|max:255',
            'patient_type' => 'nullable|string|max:100',
            'description' => 'required|string',
            'profile_image' => 'nullable|string',
        ]);

        Testimonial::create($validated);

        return redirect()->route('testimonials.index')
            ->with('message', 'Testimonial created successfully.');
    }

    public function edit(Testimonial $testimonial): Response
    {
        return Inertia::render('admin/testimonials/edit', [
            'testimonial' => $testimonial,
            'specializations' => Specialization::all()->map(fn ($s) => ['id' => $s->id, 'name' => $s->name]),
        ]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'specialization_id' => 'nullable|exists:specializations,id',
            'patient_name' => 'required|string|max:255',
            'patient_type' => 'nullable|string|max:100',
            'description' => 'required|string',
            'profile_image' => 'nullable|string',
        ]);

        $testimonial->update($validated);

        return redirect()->route('testimonials.index')
            ->with('message', 'Testimonial updated successfully.');
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return redirect()->route('testimonials.index')
            ->with('message', 'Testimonial deleted successfully.');
    }
}
