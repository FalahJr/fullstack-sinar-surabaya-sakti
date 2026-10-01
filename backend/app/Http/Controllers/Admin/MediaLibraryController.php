<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MediaLibrary;
use Illuminate\Http\Request;

class MediaLibraryController extends Controller
{
    public function index()
    {
        $medias = MediaLibrary::orderBy('id', 'desc')->get();
        return view('admin.media-library.index', compact('medias'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'files' => 'required',
            'files.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:3072'
        ], [
            'files.required' => 'Pilih setidaknya satu berkas gambar.',
            'files.*.image' => 'Semua berkas wajib berupa tipe gambar.',
            'files.*.max' => 'Ukuran setiap gambar maksimal adalah 3MB.'
        ]);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $filename = 'media_' . uniqid() . '.' . $file->extension();
                $file->move(public_path('img/uploads'), $filename);
                $filePath = 'img/uploads/' . $filename;

                MediaLibrary::create([
                    'filename' => $file->getClientOriginalName(),
                    'file_path' => $filePath,
                    'file_type' => 'image',
                    'file_size' => $file->getSize() ?? 0,
                ]);
            }
        }

        return redirect()->route('media-library.index')->with('success', 'Gambar sukses diunggah ke Media Library!');
    }

    public function destroy(MediaLibrary $media)
    {
        $media->delete();
        return redirect()->route('media-library.index')->with('success', 'Media berhasil dihapus dari galeri library!');
    }
}
