@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')
    {{-- <div class="main-content"> --}}
    <section class="section">
        <div class="section-header">
            <h1>Dashboard Ringkasan</h1>
        </div>

        <div class="row">
            <!-- Widget 1: Produk -->
            <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                <div class="card card-statistic-1">
                    <div class="card-icon bg-primary">
                        <i class="fas fa-boxes"></i>
                    </div>
                    <div class="card-wrap">
                        <div class="card-header">
                            <h4>Total Produk</h4>
                        </div>
                        <div class="card-body">
                            {{ $products_count }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Widget 2: Kategori -->
            <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                <div class="card card-statistic-1">
                    <div class="card-icon bg-warning">
                        <i class="fas fa-th-large"></i>
                    </div>
                    <div class="card-wrap">
                        <div class="card-header">
                            <h4>Kategori Produk</h4>
                        </div>
                        <div class="card-body">
                            {{ $categories_count }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Widget 3: Download Center -->
            <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                <div class="card card-statistic-1">
                    <div class="card-icon bg-success">
                        <i class="fas fa-download"></i>
                    </div>
                    <div class="card-wrap">
                        <div class="card-header">
                            <h4>Dokumen Download</h4>
                        </div>
                        <div class="card-body">
                            {{ $downloads_count }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Widget 4: Banner -->
            <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                <div class="card card-statistic-1">
                    <div class="card-icon bg-danger">
                        <i class="fas fa-images"></i>
                    </div>
                    <div class="card-wrap">
                        <div class="card-header">
                            <h4>Banner Aktif</h4>
                        </div>
                        <div class="card-body">
                            {{ $banners_count }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-lg-8 col-md-12 col-12 col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <h4>Profil Perusahaan Saat Ini</h4>
                    </div>
                    <div class="card-body">
                        <h5>{{ $company->name ?? 'PT. Sinar Surabayasakti' }}</h5>
                        <p class="text-muted">{{ Str::limit($company->about_us ?? 'Tentang kami belum diisi.', 200) }}
                        </p>
                        <hr>
                        <div class="row">
                            <div class="col-6">
                                <strong><i class="fas fa-phone mr-1"></i> Telepon:</strong>
                                <p>{{ $company->phone ?? '-' }}</p>
                            </div>
                            <div class="col-6">
                                <strong><i class="fab fa-whatsapp mr-1"></i> WhatsApp:</strong>
                                <p>{{ $company->whatsapp_number ?? '-' }}</p>
                            </div>
                        </div>
                        <a href="{{ url('admin/company-profile') }}" class="btn btn-primary mt-2">Sunting Profil
                            Perusahaan</a>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-12 col-12 col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <h4>Ringkasan Media & Admin</h4>
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Media Library (Gambar/Berkas)
                                <span class="badge bg-primary text-white pill">{{ $media_count }}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Total Akun Admin
                                <span class="badge bg-info text-white pill">{{ $admins_count }}</span>
                            </li>
                        </ul>
                        <div class="text-center mt-4">
                            <p class="text-muted small">PT. Sinar Surabayasakti CMS Admin Dashboard v1.0. Laravel 12 +
                                Stisla Mod.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {{-- </div> --}}
@endsection
