<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InquiryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/inquiries/index', [
            'inquiries' => Inquiry::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'nullable|email',
            'department' => 'nullable|string|max:255',
            'visit_type' => 'nullable|string|max:100',
            'preferred_date' => 'nullable|date',
            'preferred_time' => 'nullable|string|max:100',
            'message' => 'nullable|string',
        ]);

        $validated['reference_id'] = 'RPH-'.strtoupper(bin2hex(random_bytes(4)));

        Inquiry::create($validated);

        return back()->with('reference_id', $validated['reference_id']);
    }

    public function destroy(Inquiry $inquiry)
    {
        $inquiry->delete();

        return to_route('inquiries.index')->with('success', 'Inquiry deleted successfully.');
    }

    public function updateStatus(Request $request, Inquiry $inquiry)
    {
        $validated = $request->validate([
            'status' => 'required|in:new,contacted,completed,cancelled',
        ]);

        $inquiry->update($validated);

        return back()->with('success', 'Status updated successfully.');
    }
}
