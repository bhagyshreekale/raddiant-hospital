<?php

namespace App\Http\Controllers;

use App\Models\ContactInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Display a listing of the contacts.
     */
    public function index(): Response
    {
        return Inertia::render('admin/contact/index', [
            'contacts' => ContactInfo::latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new task.
     */
    public function create(): Response
    {
        return Inertia::render('admin/contact/create');
    }

    /**
     * Store a newly created task in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string|max:255',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'open_hours' => 'nullable|string',
            'map_link' => 'nullable|string',
        ]);

        ContactInfo::create($validated);

        return redirect()->route('contact.index')
            ->with('message', 'Contact created successfully.');
    }

    /**
     * Show the form for editing the specified task.
     */
    public function edit(ContactInfo $contact): Response
    {
        return Inertia::render('admin/contact/edit', [
            'contact' => $contact,
        ]);
    }

    /**
     * Update the specified task in storage.
     */
  public function update(Request $request)
{
    $validated = $request->validate([
        'email' => 'required|email',
        'phone' => 'required',
        'address' => 'required',
        'open_hours' => 'nullable',
        'map_link' => 'nullable|url',
    ]);

    // Assuming you have a Contact model or a Settings model
    ContactInfo::updateOrCreate(['id' => 1], $validated);

    return back()->with('success', 'Contact details updated!');
}

    /**
     * Remove the specified task from storage.
     */
    public function destroy(ContactInfo $contact)
    {
        $contact->delete();

        return redirect()->route('contact.index')
            ->with('message', 'Contact deleted successfully.');
    }
}
