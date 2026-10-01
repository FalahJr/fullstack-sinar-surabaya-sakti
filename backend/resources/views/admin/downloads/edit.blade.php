@extends('layouts.app')

@section('title', 'Edit Dokumen')

@section('content')
    <section class="section">
        <div class="section-header">
            <h1>Edit Berkas</h1>
            <div class="section-header-breadcrumb">
                <div class="breadcrumb-item"><a href="{{ url('home') }}">Dashboard</a></div>
                <div class="breadcrumb-item"><a href="{{ route('downloads.index') }}">Download Center</a></div>
                <div class="breadcrumb-item active">Edit</div>
            </div>
        </div>

        <div class="section-body">
            <div class="row">
                <div class="col-12">
                    <form action="{{ route('downloads.update', $download->id) }}" method="POST"
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="card">
                            <div class="card-header border-bottom">
                                <h4>Form Edit Berkas Pengunduhan</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="form-group col-md-6">
                                        <label>Nama Berkas / Judul Dokumen <span class="text-danger">*</span></label>
                                        <input type="text" name="title"
                                            class="form-control @error('title') is-invalid @enderror"
                                            value="{{ old('title', $download->title) }}" required>
                                        @error('title')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <div class="form-group col-md-6">
                                        <label>Tipe / Kategori Berkas <span class="text-danger">*</span></label>
                                        <select name="file_type"
                                            class="form-control @error('file_type') is-invalid @enderror" required>
                                            <option value="katalog"
                                                {{ old('file_type', $download->file_type) == 'katalog' ? 'selected' : '' }}>
                                                Katalog</option>
                                            <option value="brosur"
                                                {{ old('file_type', $download->file_type) == 'brosur' ? 'selected' : '' }}>
                                                Brosur</option>
                                            <option value="datasheet"
                                                {{ old('file_type', $download->file_type) == 'datasheet' ? 'selected' : '' }}>
                                                Datasheet</option>
                                            <option value="sertifikat"
                                                {{ old('file_type', $download->file_type) == 'sertifikat' ? 'selected' : '' }}>
                                                Sertifikat</option>
                                            <option value="dokumen"
                                                {{ old('file_type', $download->file_type) == 'dokumen' ? 'selected' : '' }}>
                                                Dokumen Lainnya</option>
                                        </select>
                                        @error('file_type')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <div class="form-group col-12">
                                        <label>Ganti Berkas Dokumen (Biarkan kosong jika tidak ingin mengubah
                                            berkas)</label>
                                        <input type="file" name="file"
                                            class="form-control @error('file') is-invalid @enderror">
                                        @error('file')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        @if ($download->file_path)
                                            <div class="mt-2 text-muted small">
                                                <span>Berkas aktif:</span> <code>{{ $download->file_path }}</code>
                                            </div>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-whitesmoke text-right">
                                <a href="{{ route('downloads.index') }}" class="btn btn-secondary mr-2">Kembali</a>
                                <button type="submit" class="btn btn-primary"><i class="fas fa-save mr-1"></i> Simpan
                                    Perubahan</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection
