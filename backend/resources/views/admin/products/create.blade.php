@extends('layouts.app')

@section('title', 'Tambah Produk')

@section('content')
    <section class="section">
        <div class="section-header">
            <h1>Tambah Produk Baru</h1>
            <div class="section-header-breadcrumb">
                <div class="breadcrumb-item"><a href="{{ url('home') }}">Dashboard</a></div>
                <div class="breadcrumb-item"><a href="{{ route('products.index') }}">Katalog Produk</a></div>
                <div class="breadcrumb-item active">Tambah</div>
            </div>
        </div>

        <div class="section-body">
            <div class="row">
                <div class="col-12">
                    <form action="{{ route('products.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        <div class="card">
                            <div class="card-header border-bottom">
                                <h4>Form Tambah Produk</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <!-- Nama Produk -->
                                    <div class="form-group col-md-6">
                                        <label>Nama Produk <span class="text-danger">*</span></label>
                                        <input type="text" name="name"
                                            class="form-control @error('name') is-invalid @enderror"
                                            value="{{ old('name') }}" placeholder="Contoh: Saluran Air U-Ditch 40x40"
                                            required>
                                        @error('name')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <!-- Kategori -->
                                    <div class="form-group col-md-6">
                                        <label>Kategori Produk <span class="text-danger">*</span></label>
                                        <select name="category_id"
                                            class="form-control @error('category_id') is-invalid @enderror" required>
                                            <option value="" disabled selected>-- Pilih Kategori --</option>
                                            @foreach ($categories as $category)
                                                <option value="{{ $category->id }}"
                                                    {{ old('category_id') == $category->id ? 'selected' : '' }}>
                                                    {{ $category->name }}</option>
                                            @endforeach
                                        </select>
                                        @error('category_id')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <!-- SKU -->
                                    <div class="form-group col-md-6">
                                        <label>Kode SKU / Model Khusus</label>
                                        <input type="text" name="sku"
                                            class="form-control @error('sku') is-invalid @enderror"
                                            value="{{ old('sku') }}" placeholder="Contoh: SSS-UDITCH-40">
                                        @error('sku')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <!-- Is Featured -->
                                    <div class="form-group col-md-6 align-self-end py-2">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" name="is_featured" class="custom-control-input"
                                                id="isFeatured" {{ old('is_featured') ? 'checked' : '' }}>
                                            <label class="custom-control-label font-weight-bold" for="isFeatured">Set
                                                sebagai Produk Unggulan (Featured di Landing Page)</label>
                                        </div>
                                    </div>

                                    <!-- Gambar Produk -->
                                    <div class="form-group col-md-6">
                                        <label>Gambar Produk (Maksimal 2MB)</label>
                                        <input type="file" name="image"
                                            class="form-control @error('image') is-invalid @enderror">
                                        @error('image')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <!-- Datasheet -->
                                    <div class="form-group col-md-6">
                                        <label>Dokumen Datasheet / Brosur Eksklusif Produk (PDF/Word, Maksimal 5MB)</label>
                                        <input type="file" name="datasheet"
                                            class="form-control @error('datasheet') is-invalid @enderror">
                                        @error('datasheet')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <!-- Deskripsi -->
                                    <div class="form-group col-12">
                                        <label>Deskripsi Detail Produk</label>
                                        <textarea name="description" class="form-control" style="height: 150px;">{{ old('description') }}</textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-whitesmoke text-right">
                                <a href="{{ route('products.index') }}" class="btn btn-secondary mr-2">Kembali</a>
                                <button type="submit" class="btn btn-primary"><i class="fas fa-save mr-1"></i> Simpan
                                    Produk</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection
