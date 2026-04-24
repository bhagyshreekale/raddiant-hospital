<?php

namespace App\Http\Controllers;

use App\Models\HealthPackage;
use Inertia\Inertia;
use Inertia\Response;

class FacilitiesController extends Controller
{
    public function __invoke(): Response
    {
        $packages = HealthPackage::latest()->get()->map(function ($package) {
            return [
                'id' => $package->id,
                'name' => $package->name,
                'price' => '₹'.number_format((float) $package->price, 0),
                'description' => $package->description,
                'features' => $package->features ?? [],
                'is_featured' => $package->is_featured,
            ];
        });

        return Inertia::render('facilities', [
            'healthPackages' => $packages,
        ]);
    }
}
