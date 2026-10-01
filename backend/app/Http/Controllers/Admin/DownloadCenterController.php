<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DownloadCenter;
use Illuminate\Http\Request;

class DownloadCenterController extends Controller
{
    public function index()
    {
        $downloads = DownloadCenter::all();
        return view('admin.downloads.index', compact('downloads'));
    }

    public function create()
    {
        return view('admin.downloads.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'file_type' => 'required|in:katalog,brosur,datasheet,sertifikat,dokumen',
            'file' => 'required|mimes:pdf,docx,doc,zip,rar,xls,xlsx,png,jpg,jpeg|max:10240',
        ], [
            'title.required' => 'Judul dokumen wajib diisi.',
            'file_type.required' => 'Tipe berkas wajib dipilih.',
            'file.required' => 'Berkas dokumen wajib diunggah.',
            'file.max' => 'Ukuran berkas maksimal adalah 10MB.',
        ]);

        $filePath = '';
        if ($request->hasFile('file')) {
            $fileName = 'doc_' . time() . '.' . $request->file->extension();
            $request->file->move(public_path('docs/downloads'), $fileName);
            $filePath = 'docs/downloads/' . $fileName;
        }

        DownloadCenter::create([
            'title' => $request->title,
            'file_type' => $request->file_type,
            'file_path' => $filePath,
            'download_count' => 0,
        ]);

        return redirect()->route('downloads.index')->with('success', 'Dokumen pengunduhan berhasil ditambahkan!');
    }

    public function edit(DownloadCenter $download)
    {
        return view('admin.downloads.edit', compact('download'));
    }

    public function update(Request $request, DownloadCenter $download)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'file_type' => 'required|in:katalog,brosur,datasheet,sertifikat,dokumen',
            'file' => 'nullable|mimes:pdf,docx,doc,zip,rar,xls,xlsx,png,jpg,jpeg|max:10240',
        ], [
            'title.required' => 'Judul dokumen wajib diisi.',
            'file_type.required' => 'Tipe berkas wajib dipilih.',
            'file.max' => 'Ukuran berkas maksimal adalah 10MB.',
        ]);

        $data = [
            'title' => $request->title,
            'file_type' => $request->file_type,
        ];

        if ($request->hasFile('file')) {
            $fileName = 'doc_' . time() . '.' . $request->file->extension();
            $request->file->move(public_path('docs/downloads'), $fileName);
            $data['file_path'] = 'docs/downloads/' . $fileName;
        }

        $download->update($data);

        return redirect()->route('downloads.index')->with('success', 'Dokumen berhasil diperbarui!');
    }

    public function destroy(DownloadCenter $download)
    {
        $download->delete();
        return redirect()->route('downloads.index')->with('success', 'Dokumen berhasil dihapus dari pusat unduhan!');
    }
}
