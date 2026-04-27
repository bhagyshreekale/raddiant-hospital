<?php

namespace App\Http\Controllers;

use App\Models\InsurancePartner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class InsurancePartnerController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/insurance-partners/index', [
            'partners' => InsurancePartner::latest()->get(),
        ]);
    }

    public function public(): Response
    {
        return Inertia::render('facilities', [
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
            'logo' => 'nullable|string',
        ]);

        // Handle the file upload and save the path
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('insurance-partners', 'public');
            $validated['logo'] = $path;
        }
        // If logo is a string (URL from ImageUpload component), use it directly
        elseif ($request->filled('logo') && is_string($request->input('logo'))) {
            // Extract storage path from URL if it's from our storage
            $logoUrl = $request->input('logo');
            $validated['logo'] = $this->extractStoragePath($logoUrl) ?? $logoUrl;
        }

        InsurancePartner::create($validated);

        return redirect()->route('insurance-partners.index')
            ->with('message', 'Insurance partner created successfully.');
    }

    private function extractStoragePath(string $url): ?string
    {
        // If URL is from our storage, extract the path
        if (str_contains($url, '/storage/')) {
            return ltrim(str_replace(asset(''), '', $url), '/');
        }
        // If it's an external URL, return as-is
        if (str_starts_with($url, 'http')) {
            return null;
        }

        return $url;
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
            'logo' => 'nullable|string',
        ]);

        if ($request->hasFile('logo')) {
            // Delete the old logo from storage if it exists
            if ($insurancePartner->logo) {
                Storage::disk('public')->delete($insurancePartner->logo);
            }

            // Store the new logo
            $path = $request->file('logo')->store('insurance-partners', 'public');
            $validated['logo'] = $path;
        } elseif ($request->filled('logo') && is_string($request->input('logo'))) {
            // If logo is a string (URL from ImageUpload), use it
            // Only update if it's a different URL to avoid removing existing logo
            $newLogo = $this->extractStoragePath($request->input('logo')) ?? $request->input('logo');
            if ($newLogo !== $insurancePartner->logo) {
                $validated['logo'] = $newLogo;
            } else {
                unset($validated['logo']);
            }
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
