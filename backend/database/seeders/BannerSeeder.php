<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Banner::create([
            'title' => 'Solusi Beton Konstruksi Terbaik & Terpercaya',
            'subtitle' => 'Menyediakan beton ready mix & pracetak berkualitas tinggi untuk proyek infrastruktur Anda.',
            'image_path' => 'img/banners/banner1.jpg',
            'order' => 1,
            'is_active' => true,
        ]);

        Banner::create([
            'title' => 'Teknologi Modern Beton Pracetak',
            'subtitle' => 'Produksi presisi tinggi dengan standardisasi ketat untuk daya tahan konstruksi masa depan.',
            'image_path' => 'img/banners/banner2.jpg',
            'order' => 2,
            'is_active' => true,
        ]);

        Banner::create([
            'title' => 'Mitra Utama Infrastruktur Indonesia',
            'subtitle' => 'Telah berkontribusi dalam pembangunan jalan tol, jembatan, industri, dan gedung bertingkat.',
            'image_path' => 'img/banners/banner3.jpg',
            'order' => 3,
            'is_active' => true,
        ]);
    }
}
