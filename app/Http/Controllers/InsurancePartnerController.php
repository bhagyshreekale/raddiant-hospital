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
            'partners' => InsurancePartner::latest()->get()->map(function ($partner) {
                return [
                    'id' => $partner->id,
                    'name' => $partner->name,
                    'category' => $partner->category,
                    'logo' => $this->formatLogoUrl($partner->logo),
                ];
            }),
        ]);
    }

    public function public(): Response
    {
        return Inertia::render('facilities', [
            'partners' => InsurancePartner::latest()->get()->map(function ($partner) {
                return [
                    'id' => $partner->id,
                    'name' => $partner->name,
                    'category' => $partner->category,
                    'logo' => $this->formatLogoUrl($partner->logo),
                ];
            }),
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
            'category' => 'required|in:public,private,tpa',
            'logo' => 'nullable|string',
        ]);

        // Handle the file upload and save the path
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('uploads', 'public');
            $validated['logo'] = $path;
        }
        // If logo is a string (URL from ImageUpload component), extract path
        elseif ($request->filled('logo') && is_string($request->input('logo'))) {
            $logoUrl = $request->input('logo');
            // Extract path from URL like http://localhost:8000/storage/uploads/xxx.jpg -> uploads/xxx.jpg
            if (str_contains($logoUrl, '/storage/')) {
                $path = explode('/storage/', $logoUrl);
                $validated['logo'] = end($path);
            } else {
                $validated['logo'] = $logoUrl;
            }
        }

        InsurancePartner::create($validated);

        return redirect()->route('insurance-partners.index')
            ->with('message', 'Insurance partner created successfully.');
    }

    private function formatLogoUrl(?string $logo): ?string
    {
        if (! $logo) {
            return null;
        }

        // If it's already a full URL, return as is
        if (str_starts_with($logo, 'http')) {
            return $logo;
        }

        // If it's already a storage path, use asset()
        if (str_starts_with($logo, 'storage/')) {
            return asset($logo);
        }

        // Otherwise, assume it's in the uploads folder
        return asset('storage/'.$logo);
    }

    public function edit(InsurancePartner $insurancePartner): Response
    {
        return Inertia::render('admin/insurance-partners/edit', [
            'insurancePartner' => [
                'id' => $insurancePartner->id,
                'name' => $insurancePartner->name,
                'category' => $insurancePartner->category,
                'logo' => $this->formatLogoUrl($insurancePartner->logo),
            ],
        ]);
    }

    public function update(Request $request, InsurancePartner $insurancePartner)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|in:public,private,tpa',
            'logo' => 'nullable|string',
        ]);

        if ($request->hasFile('logo')) {
            // Delete the old logo from storage if it exists
            if ($insurancePartner->logo) {
                Storage::disk('public')->delete($insurancePartner->logo);
            }

            // Store the new logo
            $path = $request->file('logo')->store('uploads', 'public');
            $validated['logo'] = $path;
        } elseif ($request->filled('logo') && is_string($request->input('logo'))) {
            $logoUrl = $request->input('logo');
            // Extract path from URL like http://localhost:8000/storage/uploads/xxx.jpg -> uploads/xxx.jpg
            if (str_contains($logoUrl, '/storage/')) {
                $path = explode('/storage/', $logoUrl);
                $newLogo = end($path);
            } else {
                $newLogo = $logoUrl;
            }
            // Only update if it's a different URL to avoid removing existing logo
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
