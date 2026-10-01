@extends('layouts.app')

@section('title', 'Edit Produk')

@section('content')
    <section class="section">
        <div class="section-header">
            <h1>Edit Produk</h1>
            <div class="section-header-breadcrumb">
                <div class="breadcrumb-item"><a href="{{ url('home') }}">Dashboard</a></div>
                <div class="breadcrumb-item"><a href="{{ route('products.index') }}">Katalog Produk</a></div>
                <div class="breadcrumb-item active">Edit</div>
            </div>
        </div>

        <div class="section-body">
            <div class="row">
                <div class="col-12">
                    <form action="{{ route('products.update', $product->id) }}" method="POST"
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="card">
                            <div class="card-header border-bottom">
                                <h4>Form Edit Produk</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <!-- Nama Produk -->
                                    <div class="form-group col-md-6">
                                        <label>Nama Produk <span class="text-danger">*</span></label>
                                        <input type="text" name="name"
                                            class="form-control @error('name') is-invalid @enderror"
                                            value="{{ old('name', $product->name) }}" required>
                                        @error('name')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <!-- Kategori -->
                                    <div class="form-group col-md-6">
                                        <label>Kategori Produk <span class="text-danger">*</span></label>
                                        <select name="category_id"
                                            class="form-control @error('category_id') is-invalid @enderror" required>
                                            @foreach ($categories as $category)
                                                <option value="{{ $category->id }}"
                                                    {{ old('category_id', $product->category_id) == $category->id ? 'selected' : '' }}>
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
                                            value="{{ old('sku', $product->sku) }}">
                                        @error('sku')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <!-- Is Featured -->
                                    <div class="form-group col-md-6 align-self-end py-2">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" name="is_featured" class="custom-control-input"
                                                id="isFeatured"
                                                {{ old('is_featured', $product->is_featured) ? 'checked' : '' }}>
                                            <label class="custom-control-label font-weight-bold" for="isFeatured">Set
                                                sebagai Produk Unggulan (Featured di Landing Page)</label>
                                        </div>
                                    </div>

                                    <!-- Gambar Produk -->
                                    <div class="form-group col-md-6">
                                        <label>Ganti Gambar Produk (Maksimal 2MB, Biarkan kosong jika tidak diubah)</label>
                                        <input type="file" name="image"
                                            class="form-control @error('image') is-invalid @enderror">
                                        @error('image')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        @if ($product->image_path)
                                            <div class="mt-2">
                                                <span class="text-muted d-block small">Gambar aktif:</span>
                                                <img src="{{ asset($product->image_path) }}" alt="Preview"
                                                    class="img-thumbnail" style="max-height: 100px;">
                                            </div>
                                        @endif
                                    </div>

                                    <!-- Datasheet -->
                                    <div class="form-group col-md-6">
                                        <label>Ganti Dokumen Datasheet (PDF/Word, Maksimal 5MB, Biarkan kosong jika tidak
                                            diubah)</label>
                                        <input type="file" name="datasheet"
                                            class="form-control @error('datasheet') is-invalid @enderror">
                                        @error('datasheet')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        @if ($product->datasheet_path)
                                            <div class="mt-2">
                                                <a href="{{ asset($product->datasheet_path) }}" target="_blank"
                                                    class="btn btn-sm btn-outline-info"><i class="fas fa-file-pdf mr-1"></i>
                                                    Lihat Dokumen Datasheet Aktif</a>
                                            </div>
                                        @endif
                                    </div>

                                    <!-- Deskripsi -->
                                    <div class="form-group col-12">
                                        <label>Deskripsi Detail Produk</label>
                                        <textarea name="description" class="form-control" style="height: 150px;">{{ old('description', $product->description) }}</textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-whitesmoke text-right">
                                <a href="{{ route('products.index') }}" class="btn btn-secondary mr-2">Kembali</a>
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
