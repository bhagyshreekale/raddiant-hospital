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
            'contacts' => ContactInfo::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new task.
     */
    public function create(): Response
    {
        return Inertia::render('admin/tasks/create');
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

        Contact::create($validated);

        return redirect()->route('contact.index')
            ->with('message', 'Contact created successfully.');
    }

    /**
     * Show the form for editing the specified task.
     */
    public function edit(Contact $contact): Response
    {
        return Inertia::render('admin/contact/edit', [
            'contact' => $contact
        ]);
    }

    /**
     * Update the specified task in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        $validated = $request->validate([
            'email' => 'required|string|max:255',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'open_hours' => 'nullable|string',
            'map_link' => 'nullable|string',
        ]);

        $contact->update($validated);

        return redirect()->route('contact.index')
            ->with('message', 'Contact updated successfully.');
    }

    /**
     * Remove the specified task from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('contact.index')
            ->with('message', 'Contact deleted successfully.');
    }
}