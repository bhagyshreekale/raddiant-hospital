<?php

namespace App\Http\Controllers;

use App\Models\InsurancePartner;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class InsurancePartnerController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/insurance-partners/index', [
            'partners' => InsurancePartner::latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/insurance-partners/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            // CHANGED: Validate as an actual image file instead of a string
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048', 
        ]);

        // Handle the file upload and save the path
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('insurance-partners', 'public');
            $validated['logo'] = $path;
        }

        InsurancePartner::create($validated);

        return redirect()->route('insurance-partners.index')
            ->with('message', 'Insurance partner created successfully.');
    }

    public function edit(InsurancePartner $insurancePartner): Response
    {
        return Inertia::render('admin/insurance-partners/edit', [
            'insurancePartner' => $insurancePartner,
        ]);
    }

    public function update(Request $request, InsurancePartner $insurancePartner)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            // CHANGED: Validate as an actual image file
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            // Delete the old logo from storage if it exists
            if ($insurancePartner->logo) {
                Storage::disk('public')->delete($insurancePartner->logo);
            }
            
            // Store the new logo
            $path = $request->file('logo')->store('insurance-partners', 'public');
            $validated['logo'] = $path;
        } else {
            // If no new file was uploaded, remove 'logo' from the update array 
            // so we don't accidentally overwrite the existing path with null
            unset($validated['logo']);
        }

        $insurancePartner->update($validated);

        return redirect()->route('insurance-partners.index')
            ->with('message', 'Insurance partner updated successfully.');
    }

    public function destroy(InsurancePartner $insurancePartner)
    {
        // Clean up the image file when the partner is deleted
        if ($insurancePartner->logo) {
            Storage::disk('public')->delete($insurancePartner->logo);
        }

        $insurancePartner->delete();

        return redirect()->route('insurance-partners.index')
            ->with('message', 'Insurance partner deleted successfully.');
    }
}