<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageController extends Controller
{
    public function upload(Request $request)
    {
        Log::info('Image upload request started', [
            'has_file' => $request->hasFile('image'),
            'file_name' => $request->file('image')?->getClientOriginalName(),
            'filename_input' => $request->input('filename'),
        ]);

        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $file = $request->file('image');

        $extension = strtolower($file->getClientOriginalExtension());
        $filename = Str::slug($request->input('filename', 'image')).'-'.time().'.'.$extension;

        try {
            $path = $file->storeAs('uploads', $filename, ['disk' => 'public']);

            Log::info('Image stored', ['path' => $path, 'filename' => $filename]);

            return response()->json([
                'url' => asset('storage/'.$path),
                'path' => $path,
            ]);
        } catch (\Exception $e) {
            Log::error('Image upload failed', [
                'error' => $e->getMessage(),
                'filename' => $filename,
            ]);
            throw $e;
        }
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
