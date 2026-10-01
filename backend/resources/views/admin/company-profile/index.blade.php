@extends('layouts.app')

@section('title', 'Profil Perusahaan')

@section('content')
    <section class="section">
        <div class="section-header">
            <h1>Profil Perusahaan</h1>
            <div class="section-header-breadcrumb">
                <div class="breadcrumb-item active"><a href="{{ url('home') }}">Dashboard</a></div>
                <div class="breadcrumb-item">Profil Perusahaan</div>
            </div>
        </div>

        <div class="section-body">
            @if (session('success'))
                <div class="alert alert-success alert-dismissible show fade">
                    <div class="alert-body">
                        <button class="close" data-dismiss="alert">
                            <span>&times;</span>
                        </button>
                        {{ session('success') }}
                    </div>
                </div>
            @endif

            <div class="row">
                <div class="col-12">
                    <form action="{{ url('admin/company-profile') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="card">
                            <div class="card-header border-bottom">
                                <h4>Manajemen Profil PT. Sinar Surabayasakti</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <!-- Nama Perusahaan -->
                                    <div class="form-group col-md-6">
                                        <label>Nama Perusahaan <span class="text-danger">*</span></label>
                                        <input type="text" name="name"
                                            class="form-control @error('name') is-invalid @enderror"
                                            value="{{ old('name', $profile->name) }}" required>
                                        @error('name')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <!-- Email -->
                                    <div class="form-group col-md-6">
                                        <label>Email Perusahaan</label>
                                        <input type="email" name="email"
                                            class="form-control @error('email') is-invalid @enderror"
                                            value="{{ old('email', $profile->email) }}">
                                        @error('email')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <!-- Telepon -->
                                    <div class="form-group col-md-6">
                                        <label>Telepon Kantor</label>
                                        <input type="text" name="phone"
                                            class="form-control @error('phone') is-invalid @enderror"
                                            value="{{ old('phone', $profile->phone) }}">
                                        @error('phone')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <!-- WhatsApp -->
                                    <div class="form-group col-md-6">
                                        <label>Nomor WhatsApp (Format: 6281234xxx)</label>
                                        <input type="text" name="whatsapp_number"
                                            class="form-control @error('whatsapp_number') is-invalid @enderror"
                                            value="{{ old('whatsapp_number', $profile->whatsapp_number) }}">
                                        @error('whatsapp_number')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <!-- Alamat -->
                                    <div class="form-group col-12">
                                        <label>Alamat Lengkap Perusahaan <span class="text-danger">*</span></label>
                                        <textarea name="address" class="form-control @error('address') is-invalid @enderror" style="height: 80px;" required>{{ old('address', $profile->address) }}</textarea>
                                        @error('address')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <!-- Logo Perusahaan -->
                                    <div class="form-group col-md-12">
                                        <label>Logo Perusahaan (Upload baru jika ingin mengubah)</label>
                                        <input type="file" name="logo"
                                            class="form-control @error('logo') is-invalid @enderror">
                                        @error('logo')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                        @if ($profile->logo_path)
                                            <div class="mt-2">
                                                <span class="text-muted d-block small">Logo aktif saat ini:</span>
                                                <img src="{{ asset($profile->logo_path) }}" alt="Logo Perusahaan"
                                                    class="img-thumbnail" style="max-height: 80px;">
                                            </div>
                                        @endif
                                    </div>

                                    <!-- Tentang Kami -->
                                    <div class="form-group col-12">
                                        <label>Tentang Kami (Profil Singkat Perusahaan)</label>
                                        <textarea name="about_us" class="form-control" style="height: 120px;">{{ old('about_us', $profile->about_us) }}</textarea>
                                    </div>

                                    <!-- Visi -->
                                    <div class="form-group col-md-6">
                                        <label>Visi Perusahaan</label>
                                        <textarea name="vision" class="form-control" style="height: 120px;">{{ old('vision', $profile->vision) }}</textarea>
                                    </div>

                                    <!-- Misi -->
                                    <div class="form-group col-md-6">
                                        <label>Misi Perusahaan (Bisa pisah perbaris)</label>
                                        <textarea name="mission" class="form-control" style="height: 120px;">{{ old('mission', $profile->mission) }}</textarea>
                                    </div>

                                    <!-- Google Maps Embedded Iframe -->
                                    <div class="form-group col-12">
                                        <label>Embed Google Maps Iframe (Ambil dari Google Maps &rsaquo; Bagikan &rsaquo;
                                            Sematkan Peta)</label>
                                        <textarea name="google_maps_iframe" class="form-control font-monospace" style="height: 100px;">{{ old('google_maps_iframe', $profile->google_maps_iframe) }}</textarea>
                                        @if ($profile->google_maps_iframe)
                                            <div class="mt-2"
                                                style="max-width: 100%; border: 1px solid #ddd; padding: 5px; border-radius: 4px;">
                                                <span class="text-muted d-block small mb-1">Pratinjau Peta Lokasi Google
                                                    Maps:</span>
                                                {!! $profile->google_maps_iframe !!}
                                            </div>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-whitesmoke text-right">
                                <button type="submit" class="btn btn-primary btn-lg"><i class="fas fa-save mr-1"></i>
                                    Simpan Perubahan</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection
