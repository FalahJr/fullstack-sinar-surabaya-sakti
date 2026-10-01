<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanyProfile;
use App\Models\Banner;
use App\Models\ProductCategory;
use App\Models\Product;
use App\Models\DownloadCenter;
use App\Models\MediaLibrary;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $data = [
            'company' => CompanyProfile::first(),
            'banners_count' => Banner::count(),
            'categories_count' => ProductCategory::count(),
            'products_count' => Product::count(),
            'downloads_count' => DownloadCenter::count(),
            'media_count' => MediaLibrary::count(),
            'admins_count' => User::count(),
        ];

        return view('home', $data);
    }
}
