@extends('layouts.app')

@section('title', 'Download Center')

@section('content')
    <section class="section">
        <div class="section-header">
            <h1>Download Center</h1>
            <div class="section-header-breadcrumb">
                <div class="breadcrumb-item active"><a href="{{ url('home') }}">Dashboard</a></div>
                <div class="breadcrumb-item">Download Center</div>
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
                        <div class="card-header border-bottom">
                            <h4>Daftar Berkas & Dokumen Publik</h4>
                            <div class="card-header-action col text-right">
                                <a href="{{ route('downloads.create') }}" class="btn btn-primary"><i
                                        class="fas fa-plus mr-1"></i> Tambah Dokumen</a>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nama Berkas / Judul Dokumen</th>
                                            <th>Tipe Dokumen</th>
                                            <th>Lokasi Berkas</th>
                                            <th class="text-center">Jumlah Diunduh</th>
                                            <th class="text-center" style="width: 150px;">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @forelse ($downloads as $index => $download)
                                            <tr>
                                                <td class="align-middle">{{ $index + 1 }}</td>
                                                <td class="align-middle"><strong>{{ $download->title }}</strong></td>
                                                <td class="align-middle">
                                                    <span
                                                        class="badge badge-info text-uppercase">{{ $download->file_type }}</span>
                                                </td>
                                                <td class="align-middle"><code
                                                        class="small text-muted">{{ $download->file_path }}</code></td>
                                                <td class="text-center align-middle font-weight-bold">
                                                    {{ $download->download_count }} x</td>
                                                <td class="text-center align-middle">
                                                    <div class="btn-group" role="group">
                                                        <a href="{{ route('downloads.edit', $download->id) }}"
                                                            class="btn btn-sm btn-warning mr-1"><i
                                                                class="fas fa-pencil-alt"></i></a>
                                                        <form action="{{ route('downloads.destroy', $download->id) }}"
                                                            method="POST"
                                                            onsubmit="return confirm('Apakah Anda yakin ingin menghapus berkas download ini?')">
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
                                                <td colspan="6" class="text-center text-muted py-4">Belum ada berkas
                                                    unduhan yang terdaftar.</td>
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
