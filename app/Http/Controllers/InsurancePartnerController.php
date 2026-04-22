<?php

namespace App\Http\Controllers;

use App\Models\InsurancePartner;
use Illuminate\Http\Request;
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
            'logo' => 'nullable|string',
        ]);

        $insurancePartner->update($validated);

        return redirect()->route('insurance-partners.index')
            ->with('message', 'Insurance partner updated successfully.');
    }

    public function destroy(InsurancePartner $insurancePartner)
    {
        $insurancePartner->delete();

        return redirect()->route('insurance-partners.index')
            ->with('message', 'Insurance partner deleted successfully.');
    }
}
