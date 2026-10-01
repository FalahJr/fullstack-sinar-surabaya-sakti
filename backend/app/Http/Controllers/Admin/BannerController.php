<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    public function index()
    {
        $banners = Banner::orderBy('order', 'asc')->get();
        return view('admin.banners.index', compact('banners'));
    }

    public function create()
    {
        return view('admin.banners.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:3072',
            'order' => 'required|integer',
        ], [
            'title.required' => 'Judul banner wajib diisi.',
            'image.required' => 'Gambar banner harus diunggah.',
            'image.image' => 'Berkas harus berupa gambar.',
            'image.max' => 'Ukuran gambar maksimal adalah 3MB.',
            'order.integer' => 'Urutan banner harus berupa angka.',
        ]);

        $imagePath = '';
        if ($request->hasFile('image')) {
            $imageName = 'banner_' . time() . '.' . $request->image->extension();
            $request->image->move(public_path('img/banners'), $imageName);
            $imagePath = 'img/banners/' . $imageName;
        }

        Banner::create([
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'image_path' => $imagePath,
            'order' => $request->order,
            'is_active' => $request->has('is_active'),
        ]);

        return redirect()->route('banners.index')->with('success', 'Banner berhasil ditambahkan!');
    }

    public function edit(Banner $banner)
    {
        return view('admin.banners.edit', compact('banner'));
    }

    public function update(Request $request, Banner $banner)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:3072',
            'order' => 'required|integer',
        ], [
            'title.required' => 'Judul banner wajib diisi.',
            'image.image' => 'Berkas harus berupa gambar.',
            'image.max' => 'Ukuran gambar maksimal adalah 3MB.',
            'order.integer' => 'Urutan banner harus berupa angka.',
        ]);

        $data = [
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'order' => $request->order,
            'is_active' => $request->has('is_active'),
        ];

        if ($request->hasFile('image')) {
            $imageName = 'banner_' . time() . '.' . $request->image->extension();
            $request->image->move(public_path('img/banners'), $imageName);
            $data['image_path'] = 'img/banners/' . $imageName;
        }

        $banner->update($data);

        return redirect()->route('banners.index')->with('success', 'Banner berhasil diperbarui!');
    }

    public function destroy(Banner $banner)
    {
        $banner->delete();
        return redirect()->route('banners.index')->with('success', 'Banner berhasil dihapus!');
    }
}
