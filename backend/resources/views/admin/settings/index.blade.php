@extends('layouts.app')

@section('title', 'Pengaturan Website')

@section('content')
    <section class="section">
        <div class="section-header">
            <h1>Pengaturan Website</h1>
            <div class="section-header-breadcrumb">
                <div class="breadcrumb-item active"><a href="{{ url('home') }}">Dashboard</a></div>
                <div class="breadcrumb-item">Pengaturan Website</div>
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
                    <form action="{{ url('admin/settings') }}" method="POST">
                        @csrf
                        @method('PUT')
                        <div class="card">
                            <div class="card-header border-bottom">
                                <h4>Pengaturan Umum & SEO PT. Sinar Surabayasakti</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <!-- SEO Title -->
                                    <div class="form-group col-12">
                                        <label>SEO Title (Judul Tab browser web publik) <span
                                                class="text-danger">*</span></label>
                                        <input type="text" name="seo_title" class="form-control"
                                            value="{{ old('seo_title', $settings['seo_title'] ?? '') }}" required>
                                    </div>

                                    <!-- SEO Description -->
                                    <div class="form-group col-12">
                                        <label>SEO Description (Deskripsi Meta pencarian Google)</label>
                                        <textarea name="seo_description" class="form-control" style="height: 80px;">{{ old('seo_description', $settings['seo_description'] ?? '') }}</textarea>
                                    </div>

                                    <!-- SEO Keywords -->
                                    <div class="form-group col-12">
                                        <label>SEO Keywords (Kata Kunci dipisah koma untuk Google)</label>
                                        <input type="text" name="seo_keywords" class="form-control"
                                            value="{{ old('seo_keywords', $settings['seo_keywords'] ?? '') }}"
                                            placeholder="Contoh: beton ready mix, precast, u-ditch gresik">
                                    </div>

                                    <!-- WhatsApp Float Text -->
                                    <div class="form-group col-12 border-top pt-3">
                                        <label class="font-weight-bold">Pesan Otomatis WhatsApp (Greeting Text ketika user
                                            mengklik tombol melayang WA di web publik)</label>
                                        <textarea name="whatsapp_float_text" class="form-control" style="height: 80px;">{{ old('whatsapp_float_text', $settings['whatsapp_float_text'] ?? '') }}</textarea>
                                    </div>

                                    <!-- Web Footer Copyright Text -->
                                    <div class="form-group col-12 border-top pt-3">
                                        <label>Copyright Text (Footer Website)</label>
                                        <input type="text" name="web_footer_text" class="form-control"
                                            value="{{ old('web_footer_text', $settings['web_footer_text'] ?? '') }}"
                                            placeholder="Contoh: © 2026 PT. Sinar Surabayasakti.">
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-whitesmoke text-right">
                                <button type="submit" class="btn btn-primary btn-lg"><i class="fas fa-save mr-1"></i>
                                    Simpan Setelan Website</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection
