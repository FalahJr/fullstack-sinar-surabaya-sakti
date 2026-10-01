<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanyProfile;
use Illuminate\Http\Request;

class CompanyProfileController extends Controller
{
    public function index()
    {
        $profile = CompanyProfile::first() ?? new CompanyProfile();
        return view('admin.company-profile.index', compact('profile'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:100',
            'whatsapp_number' => 'nullable|string|max:30',
            'google_maps_iframe' => 'nullable|string',
            'about_us' => 'nullable|string',
            'vision' => 'nullable|string',
            'mission' => 'nullable|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ], [
            'name.required' => 'Nama perusahaan wajib diisi.',
            'address.required' => 'Alamat perusahaan wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'logo.image' => 'File logo harus berupa gambar.',
            'logo.max' => 'Ukuran logo maksimal adalah 2MB.',
        ]);

        $profile = CompanyProfile::first() ?? new CompanyProfile();
        $data = $request->except('logo');

        if ($request->hasFile('logo')) {
            $logoName = 'logo_' . time() . '.' . $request->logo->extension();
            $request->logo->move(public_path('img'), $logoName);
            $data['logo_path'] = 'img/' . $logoName;
        }

        $profile->fill($data);
        $profile->save();

        return redirect()->back()->with('success', 'Berhasil memperbarui profil perusahaan PT. Sinar Surabayasakti!');
    }
}
