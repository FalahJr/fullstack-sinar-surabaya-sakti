@extends('layouts.app')

@section('title', 'Media Library')

@section('content')
    <section class="section">
        <div class="section-header">
            <h1>Media Library</h1>
            <div class="section-header-breadcrumb">
                <div class="breadcrumb-item active"><a href="{{ url('home') }}">Dashboard</a></div>
                <div class="breadcrumb-item">Media Library</div>
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
                <!-- Form Upload Media -->
                <div class="col-md-4">
                    <form action="{{ route('media-library.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        <div class="card">
                            <div class="card-header border-bottom">
                                <h4>Unggah Gambar</h4>
                            </div>
                            <div class="card-body">
                                <div class="form-group mb-0">
                                    <label>Pilih Gambar (Bisa pilih multi-gambar sekaligus, Maksimal 3MB/file)</label>
                                    <input type="file" name="files[]" class="form-control" multiple required
                                        accept="image/*">
                                </div>
                            </div>
                            <div class="card-footer bg-whitesmoke text-right">
                                <button type="submit" class="btn btn-primary"><i class="fas fa-upload mr-1"></i> Mulai
                                    Unggah</button>
                            </div>
                        </div>
                    </form>
                </div>

                <!-- Daftar Media -->
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header border-bottom">
                            <h4>Perpustakaan Media Gambar</h4>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                @forelse ($medias as $media)
                                    <div class="col-6 col-sm-4 col-md-3 mb-4">
                                        <div class="card mb-0 shadow-sm border"
                                            style="overflow: hidden; border-radius: 6px;">
                                            <div
                                                style="background-image: url('{{ asset($media->file_path) }}'); background-size: cover; background-position: center; height: 110px;">
                                            </div>
                                            <div class="p-2 bg-white text-center">
                                                <div class="text-truncate text-muted small" title="{{ $media->filename }}">
                                                    {{ $media->filename }}</div>
                                                <div class="mt-2 btn-group" role="group">
                                                    <button class="btn btn-xs btn-outline-primary mr-1"
                                                        onclick="navigator.clipboard.writeText('{{ asset($media->file_path) }}'); alert('Tautan gambar berhasil disalin ke clipboard!')"
                                                        title="Salin Tautan Gambar"><i class="fas fa-link"></i></button>
                                                    <form action="{{ route('media-library.destroy', $media->id) }}"
                                                        method="POST"
                                                        onsubmit="return confirm('Apakah Anda yakin ingin menghapus media gambar ini selamanya?')">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button type="submit" class="btn btn-xs btn-danger"
                                                            title="Hapus"><i class="fas fa-trash-alt"></i></button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @empty
                                    <div class="col-12 text-center text-muted py-5">
                                        <i class="far fa-images fa-3x d-block mb-3"></i>
                                        Belum ada gambar yang diunggah di galeri media.
                                    </div>
                                @endforelse
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
