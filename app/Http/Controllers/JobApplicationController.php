<?php

namespace App\Http\Controllers;

use App\Models\Career;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JobApplicationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/job-applications/index', [
            'applications' => JobApplication::with('career')->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/job-applications/create', [
            'jobs' => Career::all()->map(fn ($j) => ['id' => $j->id, 'title' => $j->title]),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_id' => 'required|exists:careers,id',
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|email',
            'phone' => 'required|string|max:50',
            'experience' => 'nullable|string|max:100',
            'resume_url' => 'required|string',
        ]);

        JobApplication::create($validated);

        return redirect()->route('job-applications.index')
            ->with('message', 'Job application created successfully.');
    }

    public function edit(JobApplication $jobApplication): Response
    {
        return Inertia::render('admin/job-applications/edit', [
            'jobApplication' => $jobApplication,
            'jobs' => Career::all()->map(fn ($j) => ['id' => $j->id, 'title' => $j->title]),
        ]);
    }

    public function update(Request $request, JobApplication $jobApplication)
    {
        $validated = $request->validate([
            'job_id' => 'required|exists:careers,id',
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|email',
            'phone' => 'required|string|max:50',
            'experience' => 'nullable|string|max:100',
            'resume_url' => 'required|string',
        ]);

        $jobApplication->update($validated);

        return redirect()->route('job-applications.index')
            ->with('message', 'Job application updated successfully.');
    }

    public function destroy(JobApplication $jobApplication)
    {
        $jobApplication->delete();

        return redirect()->route('job-applications.index')
            ->with('message', 'Job application deleted successfully.');
    }
}
