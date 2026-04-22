<?php

namespace App\Http\Controllers;

use App\Models\Career;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CareerController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/careers/index', [
            'careers' => Career::latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/careers/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'specialization' => 'nullable|string|max:100',
            'title' => 'required|string|max:255',
            'salary' => 'nullable|string|max:100',
            'location' => 'required|string|max:255',
            'job_type' => 'required|in:Full-time,Part-time,Contract',
            'experience' => 'nullable|string|max:100',
            'description' => 'required|string',
        ]);

        Career::create($validated);

        return redirect()->route('careers.index')
            ->with('message', 'Career created successfully.');
    }

    public function edit(Career $career): Response
    {
        return Inertia::render('admin/careers/edit', [
            'career' => $career,
        ]);
    }

    public function update(Request $request, Career $career)
    {
        $validated = $request->validate([
            'specialization' => 'nullable|string|max:100',
            'title' => 'required|string|max:255',
            'salary' => 'nullable|string|max:100',
            'location' => 'required|string|max:255',
            'job_type' => 'required|in:Full-time,Part-time,Contract',
            'experience' => 'nullable|string|max:100',
            'description' => 'required|string',
        ]);

        $career->update($validated);

        return redirect()->route('careers.index')
            ->with('message', 'Career updated successfully.');
    }

    public function destroy(Career $career)
    {
        $career->delete();

        return redirect()->route('careers.index')
            ->with('message', 'Career deleted successfully.');
    }
}
