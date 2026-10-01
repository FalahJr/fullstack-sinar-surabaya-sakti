@auth
    <div class="main-sidebar sidebar-style-2">
        <aside id="sidebar-wrapper">
            <div class="sidebar-brand">
                <a href="{{ url('home') }}">SINAR SURABAYASAKTI</a>
            </div>
            <div class="sidebar-brand sidebar-brand-sm">
                <a href="{{ url('home') }}">SSS</a>
            </div>
            <ul class="sidebar-menu">
                <li class="menu-header">Dashboard</li>
                <li class="{{ Request::is('home') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ url('home') }}"><i class="fas fa-fire"></i><span>Dashboard
                            Ringkasan</span></a>
                </li>

                <li class="menu-header">Informasi Bisnis</li>
                <li class="{{ Request::is('admin/company-profile') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ url('admin/company-profile') }}"><i class="fas fa-building"></i>
                        <span>Profil Perusahaan</span></a>
                </li>
                <li class="{{ Request::is('admin/banners*') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ url('admin/banners') }}"><i class="fas fa-images"></i> <span>Banner
                            Beranda</span></a>
                </li>

                <li class="menu-header">Katalog Produk</li>
                <li class="{{ Request::is('admin/categories*') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ url('admin/categories') }}"><i class="fas fa-th-large"></i> <span>Kategori
                            Produk</span></a>
                </li>
                <li class="{{ Request::is('admin/products*') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ url('admin/products') }}"><i class="fas fa-boxes"></i> <span>Daftar
                            Produk</span></a>
                </li>

                <li class="menu-header">Berkas & Media</li>
                <li class="{{ Request::is('admin/downloads*') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ url('admin/downloads') }}"><i class="fas fa-download"></i> <span>Download
                            Center</span></a>
                </li>
                <li class="{{ Request::is('admin/media-library*') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ url('admin/media-library') }}"><i class="fas fa-folder-open"></i>
                        <span>Media Library</span></a>
                </li>

                <li class="menu-header">Manajemen User</li>
                @if (Auth::user()->role == 'superadmin' || Auth::user()->role == 'admin')
                    <li class="{{ Request::is('hakakses*') ? 'active' : '' }}">
                        <a class="nav-link" href="{{ url('hakakses') }}"><i class="fas fa-user-shield"></i> <span>Manajemen
                                Admin</span></a>
                    </li>
                @endif
                <li class="{{ Request::is('profile/edit') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ url('profile/edit') }}"><i class="far fa-user"></i> <span>Profil
                            Saya</span></a>
                </li>
                <li class="{{ Request::is('profile/change-password') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ url('profile/change-password') }}"><i class="fas fa-key"></i> <span>Ganti
                            Password</span></a>
                </li>

                <li class="menu-header">Pengaturan</li>
                <li class="{{ Request::is('admin/settings*') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ url('admin/settings') }}"><i class="fas fa-cog"></i> <span>Pengaturan
                            Web</span></a>
                </li>
            </ul>
        </aside>
    </div>
@endauth
