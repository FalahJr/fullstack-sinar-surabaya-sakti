<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompanyProfile;
use App\Models\Banner;
use App\Models\ProductCategory;
use App\Models\Product;
use App\Models\DownloadCenter;
use App\Models\SystemSetting;
use Illuminate\Http\Request;

class PublicApiController extends Controller
{
    /**
     * Objek bantuan output standardisasi JSON
     */
    protected function apiResponse($success, $message, $data = null, $status = 200)
    {
        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $data
        ], $status);
    }

    /**
     * Profil Perusahaan Publik
     */
    public function getCompanyProfile()
    {
        $profile = CompanyProfile::first();
        if (!$profile) {
            return $this->apiResponse(false, 'Profil perusahaan belum lengkap diatur.', null, 404);
        }
        return $this->apiResponse(true, 'Berhasil memperoleh profil PT. Sinar Surabayasakti.', $profile);
    }

    /**
     * Slideshow Banners Teraktif Publik
     */
    public function getBanners()
    {
        $banners = Banner::where('is_active', true)->orderBy('order', 'asc')->get();
        return $this->apiResponse(true, 'Berhasil memperoleh daftar banner beranda.', $banners);
    }

    /**
     * Kategori Produk Publik
     */
    public function getCategories()
    {
        $categories = ProductCategory::orderBy('id', 'asc')->get();
        return $this->apiResponse(true, 'Berhasil memperoleh daftar kategori produk.', $categories);
    }

    /**
     * Katalog Produk Publik (Sorting, Search, and Category Filters)
     */
    public function getProducts(Request $request)
    {
        $query = Product::with('category');

        // Pencarian Nama
        if ($request->has('q') && !empty($request->q)) {
            $query->where('name', 'LIKE', '%' . $request->q . '%');
        }

        // Kategori Filter (ID atau Slug)
        if ($request->has('category') && !empty($request->category)) {
            $query->whereHas('category', function ($subQuery) use ($request) {
                if (is_numeric($request->category)) {
                    $subQuery->where('id', $request->category);
                } else {
                    $subQuery->where('slug', $request->category);
                }
            });
        }

        // Unggulan filter
        if ($request->has('featured') && $request->featured == '1') {
            $query->where('is_featured', true);
        }

        $products = $query->paginate($request->get('limit', 12));

        return $this->apiResponse(true, 'Berhasil memperoleh katalog produk.', $products);
    }

    /**
     * Detail Berdasarkan Slug
     */
    public function getProductDetail($slug)
    {
        $product = Product::with('category')->where('slug', $slug)->first();
        if (!$product) {
            return $this->apiResponse(false, 'Produk tidak ditemukan.', null, 404);
        }
        return $this->apiResponse(true, 'Berhasil mendapatkan detail produk.', $product);
    }

    /**
     * Download Center Berkas
     */
    public function getDownloads(Request $request)
    {
        $query = DownloadCenter::query();

        if ($request->has('type') && !empty($request->type)) {
            $query->where('file_type', $request->type);
        }

        $downloads = $query->orderBy('id', 'desc')->get();
        return $this->apiResponse(true, 'Berhasil memperoleh berkas download center.', $downloads);
    }

    /**
     * Tambah Hit Unduh
     */
    public function incrementDownloadCount($id)
    {
        $download = DownloadCenter::find($id);
        if (!$download) {
            return $this->apiResponse(false, 'Berkas tidak ditemukan.', null, 404);
        }

        $download->increment('download_count');

        return $this->apiResponse(true, 'Statistik unduh berkas berhasil ditambah!', [
            'id' => $download->id,
            'download_count' => $download->download_count
        ]);
    }

    /**
     * Ambil Setelan Globals SEO dll
     */
    public function getSettings()
    {
        $settings = SystemSetting::pluck('value', 'key')->all();
        return $this->apiResponse(true, 'Berhasil memperoleh setelan globals website.', $settings);
    }
}
