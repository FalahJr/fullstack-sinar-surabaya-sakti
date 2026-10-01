<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return redirect()->route('login');
});

Auth::routes();

Route::middleware(['auth'])->group(function () {
    // Override Dashboard Home Default Stisla
    Route::get('/home', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('home');

    // Profil Perusahaan PT Sinar Surabayasakti
    Route::get('/admin/company-profile', [App\Http\Controllers\Admin\CompanyProfileController::class, 'index']);
    Route::put('/admin/company-profile', [App\Http\Controllers\Admin\CompanyProfileController::class, 'update']);

    // Banner Beranda Slideshow
    Route::resource('/admin/banners', App\Http\Controllers\Admin\BannerController::class);

    // Kategori & Produk Katalog
    Route::resource('/admin/categories', App\Http\Controllers\Admin\ProductCategoryController::class)->except(['create', 'show', 'edit']);
    Route::resource('/admin/products', App\Http\Controllers\Admin\ProductController::class);

    // Download Center Modul
    Route::resource('/admin/downloads', App\Http\Controllers\Admin\DownloadCenterController::class)->except(['show']);

    // Media Library
    Route::get('/admin/media-library', [App\Http\Controllers\Admin\MediaLibraryController::class, 'index'])->name('media-library.index');
    Route::post('/admin/media-library', [App\Http\Controllers\Admin\MediaLibraryController::class, 'store'])->name('media-library.store');
    Route::delete('/admin/media-library/{media}', [App\Http\Controllers\Admin\MediaLibraryController::class, 'destroy'])->name('media-library.destroy');

    // Pengaturan Sistem
    Route::get('/admin/settings', [App\Http\Controllers\Admin\SystemSettingController::class, 'index']);
    Route::put('/admin/settings', [App\Http\Controllers\Admin\SystemSettingController::class, 'update']);

    // Default Stisla routes...
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    Route::get('/profile/change-password', [ProfileController::class, 'changepassword'])->name('profile.change-password');
    Route::put('/profile/password', [ProfileController::class, 'password'])->name('profile.password');
    Route::get('/blank-page', [App\Http\Controllers\HomeController::class, 'blank'])->name('blank');

    Route::get('/hakakses', [App\Http\Controllers\HakaksesController::class, 'index'])->name('hakakses.index')->middleware('superadmin');
    Route::get('/hakakses/edit/{id}', [App\Http\Controllers\HakaksesController::class, 'edit'])->name('hakakses.edit')->middleware('superadmin');
    Route::put('/hakakses/update/{id}', [App\Http\Controllers\HakaksesController::class, 'update'])->name('hakakses.update')->middleware('superadmin');
    Route::delete('/hakakses/delete/{id}', [App\Http\Controllers\HakaksesController::class, 'destroy'])->name('hakakses.delete')->middleware('superadmin');

    Route::get('/table-example', [App\Http\Controllers\ExampleController::class, 'table'])->name('table.example');
    Route::get('/clock-example', [App\Http\Controllers\ExampleController::class, 'clock'])->name('clock.example');
    Route::get('/chart-example', [App\Http\Controllers\ExampleController::class, 'chart'])->name('chart.example');
    Route::get('/form-example', [App\Http\Controllers\ExampleController::class, 'form'])->name('form.example');
    Route::get('/map-example', [App\Http\Controllers\ExampleController::class, 'map'])->name('map.example');
    Route::get('/calendar-example', [App\Http\Controllers\ExampleController::class, 'calendar'])->name('calendar.example');
    Route::get('/gallery-example', [App\Http\Controllers\ExampleController::class, 'gallery'])->name('gallery.example');
    Route::get('/todo-example', [App\Http\Controllers\ExampleController::class, 'todo'])->name('todo.example');
    Route::get('/contact-example', [App\Http\Controllers\ExampleController::class, 'contact'])->name('contact.example');
    Route::get('/faq-example', [App\Http\Controllers\ExampleController::class, 'faq'])->name('faq.example');
    Route::get('/news-example', [App\Http\Controllers\ExampleController::class, 'news'])->name('news.example');
    Route::get('/about-example', [App\Http\Controllers\ExampleController::class, 'about'])->name('about.example');
});

// -------------------------------------------------------------
// REST API Publik untuk konsumsi frontend Next.js (Tanpa Autentikasi)
// -------------------------------------------------------------
Route::prefix('api')->group(function () {
    Route::get('/company-profile', [App\Http\Controllers\Api\PublicApiController::class, 'getCompanyProfile']);
    Route::get('/banners', [App\Http\Controllers\Api\PublicApiController::class, 'getBanners']);
    Route::get('/categories', [App\Http\Controllers\Api\PublicApiController::class, 'getCategories']);
    Route::get('/products', [App\Http\Controllers\Api\PublicApiController::class, 'getProducts']);
    Route::get('/products/{slug}', [App\Http\Controllers\Api\PublicApiController::class, 'getProductDetail']);
    Route::get('/downloads', [App\Http\Controllers\Api\PublicApiController::class, 'getDownloads']);
    Route::post('/downloads/{id}/increment', [App\Http\Controllers\Api\PublicApiController::class, 'incrementDownloadCount']);
    Route::get('/settings', [App\Http\Controllers\Api\PublicApiController::class, 'getSettings']);
});
