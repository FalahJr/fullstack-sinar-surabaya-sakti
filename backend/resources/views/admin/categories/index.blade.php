@extends('layouts.app')

@section('title', 'Kategori Produk')

@section('content')
    <section class="section">
        <div class="section-header">
            <h1>Kategori Produk</h1>
            <div class="section-header-breadcrumb">
                <div class="breadcrumb-item active"><a href="{{ url('home') }}">Dashboard</a></div>
                <div class="breadcrumb-item">Kategori Produk</div>
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

            @if (session('error'))
                <div class="alert alert-danger alert-dismissible show fade">
                    <div class="alert-body">
                        <button class="close" data-dismiss="alert">
                            <span>&times;</span>
                        </button>
                        {{ session('error') }}
                    </div>
                </div>
            @endif

            <div class="row">
                <!-- Tambah Kategori -->
                <div class="col-md-4">
                    <form action="{{ route('categories.store') }}" method="POST">
                        @csrf
                        <div class="card">
                            <div class="card-header border-bottom">
                                <h4>Tambah Kategori</h4>
                            </div>
                            <div class="card-body">
                                <div class="form-group mb-0">
                                    <label>Nama Kategori <span class="text-danger">*</span></label>
                                    <input type="text" name="name"
                                        class="form-control @error('name') is-invalid @enderror"
                                        placeholder="Contoh: Rigid Pavement" required>
                                    @error('name')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            <div class="card-footer bg-whitesmoke text-right">
                                <button type="submit" class="btn btn-primary"><i class="fas fa-save mr-1"></i>
                                    Simpan</button>
                            </div>
                        </div>
                    </form>
                </div>

                <!-- Daftar Kategori -->
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header border-bottom">
                            <h4>Daftar Kategori Terdaftar</h4>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nama Kategori</th>
                                            <th>Slug (URL)</th>
                                            <th class="text-center">Total Produk</th>
                                            <th class="text-center" style="width: 150px;">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @forelse ($categories as $index => $category)
                                            <tr>
                                                <td>{{ $index + 1 }}</td>
                                                <td><strong>{{ $category->name }}</strong></td>
                                                <td><code class="text-muted">{{ $category->slug }}</code></td>
                                                <td class="text-center align-middle">
                                                    <span class="badge badge-info">{{ $category->products_count }}</span>
                                                </td>
                                                <td class="text-center">
                                                    <div class="btn-group" role="group">
                                                        <button class="btn btn-sm btn-warning mr-1" data-toggle="modal"
                                                            data-target="#editModal{{ $category->id }}"><i
                                                                class="fas fa-pencil-alt"></i></button>
                                                        <form action="{{ route('categories.destroy', $category->id) }}"
                                                            method="POST"
                                                            onsubmit="return confirm('Apakah Anda yakin ingin menghapus kategori ini?')">
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
                                                <td colspan="5" class="text-center text-muted py-4">Belum ada
                                                    kategori
                                                    terdaftar.</td>
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

    @push('scripts')
        <!-- Script Modal Bootstrap ditempatkan di luar seksi body untuk menyuntikkan root modal ke body utama -->
        <script>
            $(document).ready(function() {
                // Memindahkan modal ke root <body> ketika dimuat untuk menghindari kegagalan visual akibat stacking context CSS
                $('.modal').appendTo('body');
            });
        </script>
    @endpush

    <!-- Modal Edit Kategori (Dipindahkan ke luar tag table/tbody bertaut) -->
    @foreach ($categories as $category)
        <div class="modal fade" id="editModal{{ $category->id }}" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
                <form action="{{ route('categories.update', $category->id) }}" method="POST">
                    @csrf
                    @method('PUT')
                    <div class="modal-content" style="width: 25vw;">
                        <div class="modal-header border-bottom">
                            <h5 class="modal-title font-weight-bold">Edit Kategori</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group mb-0">
                                <label>Nama Kategori <span class="text-danger">*</span></label>
                                <input type="text" name="name" class="form-control" value="{{ $category->name }}"
                                    required>
                            </div>
                        </div>
                        <div class="modal-footer bg-whitesmoke text-right">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
                            <button type="submit" class="btn btn-primary"><i class="fas fa-save mr-1"></i>
                                Perbarui</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    @endforeach
@endsection
