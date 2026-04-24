<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function publicShow(): Response
    {
        $images = Gallery::all()->map(function ($image) {
            $imagePath = $image->image;
            // Handle storage paths - prepend /storage/ if not already a full URL
            if ($imagePath && !str_starts_with($imagePath, 'http')) {
                $imagePath = '/storage/' . ltrim($imagePath, '/');
            }

            return [
                'id' => $image->id,
                'title' => $image->title ?? 'Gallery Image',
                'image' => $imagePath,
                'category' => $image->category ?? 'Facilities',
                'span' => 'wide',
            ];
        });

        return Inertia::render('gallery', [
            'images' => $images,
        ]);
    }

    public function index(): Response
    {
        return Inertia::render('admin/gallery/index', [
            'images' => Gallery::latest()->get()->map(function ($image) {
                $imagePath = $image->image;
                if ($imagePath && !str_starts_with($imagePath, 'http')) {
                    $imagePath = '/storage/' . ltrim($imagePath, '/');
                }

                return [
                    'id' => $image->id,
                    'image' => $imagePath,
                    'title' => $image->title ?? '',
                    'category' => $image->category ?? 'Facilities',
                ];
            }),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/gallery/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'required|string',
            'title' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
        ]);

        Gallery::create($validated);

        return redirect()->route('gallery.index')
            ->with('message', 'Gallery image created successfully.');
    }

    public function edit(Gallery $gallery): Response
    {
        return Inertia::render('admin/gallery/edit', [
            'gallery' => [
                'id' => $gallery->id,
                'image' => $gallery->image,
                'title' => $gallery->title ?? '',
                'category' => $gallery->category ?? 'Facilities',
            ],
        ]);
    }

    public function update(Request $request, Gallery $gallery)
    {
        $validated = $request->validate([
            'image' => 'required|string',
            'title' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
        ]);

        $gallery->update($validated);

        return redirect()->route('gallery.index')
            ->with('message', 'Gallery image updated successfully.');
    }

    public function destroy(Gallery $gallery)
    {
        $gallery->delete();

        return redirect()->route('gallery.index')
            ->with('message', 'Gallery image deleted successfully.');
    }
}
