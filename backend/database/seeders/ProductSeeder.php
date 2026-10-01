<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Buat Kategori
        $readymix = ProductCategory::create([
            'name' => 'Ready Mix & Beton Cair',
            'slug' => 'ready-mix'
        ]);

        $precast = ProductCategory::create([
            'name' => 'Beton Pracetak (Precast)',
            'slug' => 'precast'
        ]);

        $barrier = ProductCategory::create([
            'name' => 'Pagar Panel & Barrier',
            'slug' => 'pagar-panel-barrier'
        ]);

        // 2. Buat Produk untuk kategori Ready Mix
        Product::create([
            'category_id' => $readymix->id,
            'name' => 'Beton Ready Mix K-250',
            'slug' => 'beton-ready-mix-k-250',
            'sku' => 'RM-K250',
            'description' => 'Beton cair berkualitas K-250 (karakteristik 250 kg/cm2) yang ideal untuk pengecoran lantai non-struktural, jalan pemukiman, ruko, bangunan bertingkat rendah serta pelat lantai rumah tinggal.',
            'image_path' => 'img/products/rm-k250.jpg',
            'datasheet_path' => 'docs/datasheets/rm-k250.pdf',
            'is_featured' => true,
        ]);

        Product::create([
            'category_id' => $readymix->id,
            'name' => 'Beton Ready Mix K-350',
            'slug' => 'beton-ready-mix-k-350',
            'sku' => 'RM-K350',
            'description' => 'Beton cor mutu K-350 struktural tinggi, sangat cocok untuk konstruksi berat seperti pelat lantai jembatan, jalan raya utama (rigid pavement), gedung bertingkat tinggi, pondasi dalam, dan gelagar jembatan.',
            'image_path' => 'img/products/rm-k350.jpg',
            'datasheet_path' => 'docs/datasheets/rm-k350.pdf',
            'is_featured' => true,
        ]);

        // 3. Buat Produk untuk kategori Precast
        Product::create([
            'category_id' => $precast->id,
            'name' => 'U-Ditch (Saluran Air Beton)',
            'slug' => 'u-ditch-saluran-air-beton',
            'sku' => 'PC-UDITCH-01',
            'description' => 'Produk saluran air berbentuk huruf U berbahan beton pracetak bertulang. Dirancang khusus untuk efisiensi pengairan, drainase samping jalan, drainase pemukiman, dan area industri dengan ketahanan beban optimal.',
            'image_path' => 'img/products/u-ditch.jpg',
            'datasheet_path' => 'docs/datasheets/u-ditch.pdf',
            'is_featured' => true,
        ]);

        Product::create([
            'category_id' => $precast->id,
            'name' => 'Box Culvert Pracetak',
            'slug' => 'box-culvert-pracetak',
            'sku' => 'PC-BOXCULV-02',
            'description' => 'Saluran air beton persegi pracetak dengan sambungan spigot & socket yang kedap air. Digunakan untuk saluran bawah tanah, jembatan penyeberangan air, gorong-gorong perlintasan jalan raya dengan kapasitas daya dukung beban yang masif.',
            'image_path' => 'img/products/box-culvert.jpg',
            'datasheet_path' => null,
            'is_featured' => false,
        ]);

        // 4. Buat Produk untuk kategori Barrier & Pagar Panel
        Product::create([
            'category_id' => $barrier->id,
            'name' => 'Pagar Panel Beton Bertulang',
            'slug' => 'pagar-panel-beton-bertulang',
            'sku' => 'PC-PAGAR-03',
            'description' => 'Lembaran panel dinding beton pracetak berukuran standar dengan struktur kokoh dan kolom tiang jepit beton bertulang. Solusi praktis dan cepat untuk pagar pengaman batas lahan pabrik, perkebunan, perumahan, dan kantor.',
            'image_path' => 'img/products/pagar-panel.jpg',
            'datasheet_path' => 'docs/datasheets/pagar-panel.pdf',
            'is_featured' => false,
        ]);

        Product::create([
            'category_id' => $barrier->id,
            'name' => 'Road Barrier Beton (Pembatas Jalan)',
            'slug' => 'road-barrier-beton-pembatas-jalan',
            'sku' => 'PC-ROADBAR-04',
            'description' => 'Concrete pembatas jalan beton berbentuk kokoh dengan interlocking system tinggi guna memberikan keamanan lalu lintas di jalan arteri, tol, atau area konstruksi dari resiko kecelakaan tabrakan beruntun.',
            'image_path' => 'img/products/road-barrier.jpg',
            'datasheet_path' => null,
            'is_featured' => true,
        ]);
    }
}
