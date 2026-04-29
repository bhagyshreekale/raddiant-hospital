<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    /**
     * ✅ ADMIN: List all blogs
     */
    public function index(): Response
    {
        return Inertia::render('admin/blogs/index', [
            'blogs' => Blog::latest()->get()->map(function ($blog) {
                return [
                    'id' => $blog->id,
                    'title' => $blog->title,
                    'category' => $blog->category,
                    'description' => $blog->description,
                    'read_time' => $blog->read_time,
                    'image' => $blog->image
                        ? asset('storage/'.$blog->image)
                        : null,
                ];
            }),
        ]);
    }

    /**
     * ✅ PUBLIC: Blog page
     */
    public function public(): Response
    {
        $blogs = Blog::latest()->get()->map(function ($blog) {
            return [
                'id' => $blog->id,
                'title' => $blog->title,
                'category' => $blog->category,
                'description' => $blog->description,
                'read_time' => $blog->read_time,
                'image' => $blog->image ? asset('storage/'.$blog->image) : null,
            ];
        });

        // This renders 'BlogPage.tsx' and passes the $blogs data as a prop
        return Inertia::render('blog', ['blogs' => $blogs]);
    }

    /**
     * ✅ PUBLIC: Single blog page
     */
    public function show(Blog $blog): Response
    {
        return Inertia::render('blog/show', [
            'blog' => [
                'id' => $blog->id,
                'title' => $blog->title,
                'category' => $blog->category,
                'description' => $blog->description,
                'read_time' => $blog->read_time,
                'image' => $blog->image ? asset('storage/'.$blog->image) : null,
                'created_at' => $blog->created_at,
            ],
            'recentBlogs' => Blog::where('id', '!=', $blog->id)->latest()->take(3)->get()->map(fn ($b) => [
                'id' => $b->id,
                'title' => $b->title,
                'category' => $b->category,
                'image' => $b->image ? asset('storage/'.$b->image) : null,
                'read_time' => $b->read_time,
            ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/blogs/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'read_time' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('blogs', 'public');
        } else {
            unset($validated['image']);
        }

        Blog::create($validated);

        return redirect()->route('blogs.index')
            ->with('message', 'Blog created successfully.');
    }

    /**
     * ✅ FIXED: This now returns the SINGLE blog to your edit page
     */
    public function edit(Blog $blog): Response
    {
        return Inertia::render('admin/blogs/edit', [
            'blog' => [
                'id' => $blog->id,
                'title' => $blog->title,
                'category' => $blog->category,
                'description' => $blog->description,
                'read_time' => $blog->read_time,
                'image' => $blog->image ? asset('storage/'.$blog->image) : null,
            ],
        ]);
    }

    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'read_time' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($blog->image) {
                Storage::disk('public')->delete($blog->image);
            }
            $validated['image'] = $request->file('image')->store('blogs', 'public');
        } else {
            unset($validated['image']);
        }

        $blog->update($validated);

        return redirect()->route('blogs.index')
            ->with('message', 'Blog updated successfully.');
    }

    public function destroy(Blog $blog)
    {
        if ($blog->image) {
            Storage::disk('public')->delete($blog->image);
        }

        $blog->delete();

        return redirect()->route('blogs.index')
            ->with('message', 'Blog deleted successfully.');
    }
}
