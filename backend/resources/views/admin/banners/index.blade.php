@extends('layouts.app')

@section('title', 'Manajemen Banner')

@section('content')
    <section class="section">
        <div class="section-header">
            <h1>Banner Beranda</h1>
            <div class="section-header-breadcrumb">
                <div class="breadcrumb-item active"><a href="{{ url('home') }}">Dashboard</a></div>
                <div class="breadcrumb-item">Banner Beranda</div>
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
                    <div class="card">
                        <div class="card-header">
                            <h4>Daftar Banner</h4>
                            <div class="card-header-action col text-right">
                                <a href="{{ route('banners.create') }}" class="btn btn-primary"><i
                                        class="fas fa-plus mr-1"></i> Tambah Banner</a>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-striped" id="table-banners">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Urutan</th>
                                            <th>Gambar</th>
                                            <th>Judul Banner</th>
                                            <th>Subjudul</th>
                                            <th>Status</th>
                                            <th class="text-center" style="width: 150px;">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @forelse ($banners as $banner)
                                            <tr>
                                                <td class="text-center align-middle font-weight-bold">{{ $banner->order }}
                                                </td>
                                                <td class="align-middle">
                                                    <img src="{{ asset($banner->image_path) }}" alt="Banner Image"
                                                        width="120" class="img-thumbnail"
                                                        onerror="this.src='https://placehold.co/600x300?text=No+Image'">
                                                </td>
                                                <td class="align-middle"><strong>{{ $banner->title }}</strong></td>
                                                <td class="align-middle text-muted">{{ Str::limit($banner->subtitle, 80) }}
                                                </td>
                                                <td class="align-middle">
                                                    @if ($banner->is_active)
                                                        <span class="badge badge-success">Aktif</span>
                                                    @else
                                                        <span class="badge badge-secondary">Tidak Aktif</span>
                                                    @endif
                                                </td>
                                                <td class="text-center align-middle">
                                                    <div class="btn-group" role="group">
                                                        <a href="{{ route('banners.edit', $banner->id) }}"
                                                            class="btn btn-sm btn-warning mr-1"><i
                                                                class="fas fa-pencil-alt"></i></a>
                                                        <form action="{{ route('banners.destroy', $banner->id) }}"
                                                            method="POST"
                                                            onsubmit="return confirm('Apakah Anda yakin ingin menghapus banner ini?')">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button type="submit" class="btn btn-sm btn-danger"><i
                                                                    class="fas fa-trash-alt"></i></button>
                                                        </form>
                                                    </div>
                                                </td>
                                            </tr>
                                        @empty
                                            <tr>
                                                <td colspan="6" class="text-center text-muted py-4">Belum ada slide
                                                    banner yang ditambahkan.</td>
                                            </tr>
                                        @endforelse
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
