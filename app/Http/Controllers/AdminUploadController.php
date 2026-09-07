<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminUploadController extends Controller
{
    /**
     * Upload gambar (misal: dari Rich Text Editor untuk konten berita)
     * dan kembalikan URL publiknya.
     */
    public function storeImage(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // Maks 5MB
        ]);

        $file = $request->file('image');
        $namaFile = time().'_'.$file->getClientOriginalName();
        $pathFile = $file->storeAs('berita_images', $namaFile, 'public');

        return response()->json([
            'status' => 'success',
            'url' => asset('storage/'.$pathFile),
        ], 200);
    }
}
