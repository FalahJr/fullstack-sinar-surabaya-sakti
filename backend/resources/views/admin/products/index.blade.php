@extends('layouts.app')

@section('title', 'Katalog Produk')

@section('content')
    <section class="section">
        <div class="section-header">
            <h1>Katalog Produk</h1>
            <div class="section-header-breadcrumb">
                <div class="breadcrumb-item active"><a href="{{ url('home') }}">Dashboard</a></div>
                <div class="breadcrumb-item">Katalog Produk</div>
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
                            <h4>Daftar Katalog Produk</h4>
                            <div class="card-header-action col text-right">
                                <a href="{{ route('products.create') }}" class="btn btn-primary"><i
                                        class="fas fa-plus mr-1"></i> Tambah Produk</a>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Gambar</th>
                                            <th>Nama Produk</th>
                                            <th>Kategori</th>
                                            <th>SKU</th>
                                            <th>Featured</th>
                                            <th class="text-center" style="width: 150px;">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @forelse ($products as $index => $product)
                                            <tr>
                                                <td class="align-middle">{{ $index + 1 }}</td>
                                                <td class="align-middle">
                                                    <img src="{{ asset($product->image_path) }}" alt="{{ $product->name }}"
                                                        class="img-thumbnail" width="80"
                                                        onerror="this.src='https://placehold.co/150x150?text=No+Image'">
                                                </td>
                                                <td class="align-middle">
                                                    <strong>{{ $product->name }}</strong>
                                                    <div class="text-muted small">Slug: {{ $product->slug }}</div>
                                                </td>
                                                <td class="align-middle">
                                                    <span
                                                        class="badge badge-secondary">{{ $product->category->name ?? '-' }}</span>
                                                </td>
                                                <td class="align-middle"><code
                                                        class="font-weight-bold">{{ $product->sku ?? '-' }}</code></td>
                                                <td class="align-middle">
                                                    @if ($product->is_featured)
                                                        <span class="badge badge-success"><i class="fas fa-star mr-1"></i>
                                                            Unggulan</span>
                                                    @else
                                                        <span class="badge badge-light">Biasa</span>
                                                    @endif
                                                </td>
                                                <td class="text-center align-middle">
                                                    <div class="btn-group" role="group">
                                                        <a href="{{ route('products.edit', $product->id) }}"
                                                            class="btn btn-sm btn-warning mr-1"><i
                                                                class="fas fa-pencil-alt"></i></a>
                                                        <form action="{{ route('products.destroy', $product->id) }}"
                                                            method="POST"
                                                            onsubmit="return confirm('Apakah Anda yakin ingin menghapus produk ini dari katalog?')">
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
                                                <td colspan="7" class="text-center text-muted py-4">Belum ada produk
                                                    terdaftar di katalog.</td>
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
