<?php

namespace Database\Seeders;

use App\Models\DownloadCenter;
use Illuminate\Database\Seeder;

class DownloadCenterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DownloadCenter::create([
            'title' => 'Katalog Umum Produk Beton 2026',
            'file_type' => 'katalog',
            'file_path' => 'docs/downloads/katalog_umum_2026.pdf',
            'download_count' => 125,
        ]);

        DownloadCenter::create([
            'title' => 'Brosur Beton Ready Mix Mutu Tinggi',
            'file_type' => 'brosur',
            'file_path' => 'docs/downloads/brosur_ready_mix.pdf',
            'download_count' => 84,
        ]);

        DownloadCenter::create([
            'title' => 'Datasheet Gorong-Gorong Box Culvert',
            'file_type' => 'datasheet',
            'file_path' => 'docs/downloads/datasheet_box_culvert.pdf',
            'download_count' => 45,
        ]);

        DownloadCenter::create([
            'title' => 'Sertifikat ISO 9001:2015 Mutu Manajemen PT. SSS',
            'file_type' => 'sertifikat',
            'file_path' => 'docs/downloads/sertifikat_iso_9001.pdf',
            'download_count' => 62,
        ]);

        DownloadCenter::create([
            'title' => 'Sertifikat SNI Mutu Beton Pracetak Nasional',
            'file_type' => 'sertifikat',
            'file_path' => 'docs/downloads/sertifikat_sni_beton.pdf',
            'download_count' => 77,
        ]);
    }
}
