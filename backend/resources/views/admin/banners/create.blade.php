@extends('layouts.app')

@section('title', 'Tambah Banner')

@section('content')
    <section class="section">
        <div class="section-header">
            <h1>Tambah Banner Beranda</h1>
            <div class="section-header-breadcrumb">
                <div class="breadcrumb-item"><a href="{{ url('home') }}">Dashboard</a></div>
                <div class="breadcrumb-item"><a href="{{ route('banners.index') }}">Banner Beranda</a></div>
                <div class="breadcrumb-item active">Tambah</div>
            </div>
        </div>

        <div class="section-body">
            <div class="row">
                <div class="col-12">
                    <form action="{{ route('banners.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        <div class="card">
                            <div class="card-header border-bottom">
                                <h4>Form Tambah Banner Baru</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="form-group col-12">
                                        <label>Judul Banner <span class="text-danger">*</span></label>
                                        <input type="text" name="title"
                                            class="form-control @error('title') is-invalid @enderror"
                                            value="{{ old('title') }}"
                                            placeholder="Contoh: Solusi Beton Konstruksi Terbaik" required>
                                        @error('title')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <div class="form-group col-12">
                                        <label>Subjudul Banner</label>
                                        <input type="text" name="subtitle"
                                            class="form-control @error('subtitle') is-invalid @enderror"
                                            value="{{ old('subtitle') }}"
                                            placeholder="Deskripsi singkat pendukung pesan banner">
                                        @error('subtitle')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <div class="form-group col-md-6">
                                        <label>Urutan Tampil <span class="text-danger">*</span></label>
                                        <input type="number" name="order"
                                            class="form-control @error('order') is-invalid @enderror"
                                            value="{{ old('order', 1) }}" required>
                                        @error('order')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <div class="form-group col-md-6 align-self-end py-2">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" name="is_active" class="custom-control-input"
                                                id="isActive" checked>
                                            <label class="custom-control-label font-weight-bold" for="isActive">Set Aktif
                                                (Langsung tampil di website)</label>
                                        </div>
                                    </div>

                                    <div class="form-group col-12">
                                        <label>Unggah Gambar Banner (Rasio Rekomendasi 16:9 / Lebar Minimal 1200px) <span
                                                class="text-danger">*</span></label>
                                        <input type="file" name="image"
                                            class="form-control @error('image') is-invalid @enderror" required>
                                        @error('image')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-whitesmoke text-right">
                                <a href="{{ route('banners.index') }}" class="btn btn-secondary mr-2">Kembali</a>
                                <button type="submit" class="btn btn-primary"><i class="fas fa-save mr-1"></i> Simpan
                                    Banner</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection
