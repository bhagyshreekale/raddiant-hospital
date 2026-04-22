<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $file = $request->file('image');
        $filename = Str::slug($request->input('filename', 'image')).'-'.time().'.'.$file->getClientOriginalExtension();

        $path = $file->store('uploads', ['disk' => 'public']);

        return response()->json([
            'url' => asset('storage/'.$path),
            'path' => $path,
        ]);
    }

    public function delete(Request $request)
    {
        $path = $request->input('path');

        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);

            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false], 404);
    }
}
