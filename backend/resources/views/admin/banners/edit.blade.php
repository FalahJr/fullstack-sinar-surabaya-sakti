@extends('layouts.app')

@section('title', 'Edit Banner')

@section('content')
    <section class="section">
        <div class="section-header">
            <h1>Edit Banner Beranda</h1>
            <div class="section-header-breadcrumb">
                <div class="breadcrumb-item"><a href="{{ url('home') }}">Dashboard</a></div>
                <div class="breadcrumb-item"><a href="{{ route('banners.index') }}">Banner Beranda</a></div>
                <div class="breadcrumb-item active">Edit</div>
            </div>
        </div>

        <div class="section-body">
            <div class="row">
                <div class="col-12">
                    <form action="{{ route('banners.update', $banner->id) }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="card">
                            <div class="card-header border-bottom">
                                <h4>Form Edit Banner</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="form-group col-12">
                                        <label>Judul Banner <span class="text-danger">*</span></label>
                                        <input type="text" name="title"
                                            class="form-control @error('title') is-invalid @enderror"
                                            value="{{ old('title', $banner->title) }}" required>
                                        @error('title')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <div class="form-group col-12">
                                        <label>Subjudul Banner</label>
                                        <input type="text" name="subtitle"
                                            class="form-control @error('subtitle') is-invalid @enderror"
                                            value="{{ old('subtitle', $banner->subtitle) }}">
                                        @error('subtitle')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <div class="form-group col-md-6">
                                        <label>Urutan Tampil <span class="text-danger">*</span></label>
                                        <input type="number" name="order"
                                            class="form-control @error('order') is-invalid @enderror"
                                            value="{{ old('order', $banner->order) }}" required>
                                        @error('order')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <div class="form-group col-md-6 align-self-end py-2">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" name="is_active" class="custom-control-input"
                                                id="isActive" {{ $banner->is_active ? 'checked' : '' }}>
                                            <label class="custom-control-label font-weight-bold" for="isActive">Set Aktif
                                                (Langsung tampil di website)</label>
                                        </div>
                                    </div>

                                    <div class="form-group col-12">
                                        <label>Ganti Gambar Banner (Biarkan kosong jika tidak ingin mengubah)</label>
                                        <input type="file" name="image"
                                            class="form-control @error('image') is-invalid @enderror">
                                        @error('image')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        @if ($banner->image_path)
                                            <div class="mt-2">
                                                <span class="text-muted d-block small">Gambar aktif saat ini:</span>
                                                <img src="{{ asset($banner->image_path) }}" alt="Banner Aktif"
                                                    class="img-thumbnail" style="max-height: 150px;">
                                            </div>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-whitesmoke text-right">
                                <a href="{{ route('banners.index') }}" class="btn btn-secondary mr-2">Kembali</a>
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
