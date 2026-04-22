<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/gallery/index', [
            'images' => Gallery::latest()->get(),
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
        ]);

        Gallery::create($validated);

        return redirect()->route('gallery.index')
            ->with('message', 'Gallery image created successfully.');
    }

    public function edit(Gallery $gallery): Response
    {
        return Inertia::render('admin/gallery/edit', [
            'gallery' => $gallery,
        ]);
    }

    public function update(Request $request, Gallery $gallery)
    {
        $validated = $request->validate([
            'image' => 'required|string',
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
