<?php

namespace Database\Seeders;

use App\Models\CompanyProfile;
use Illuminate\Database\Seeder;

class CompanyProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CompanyProfile::create([
            'name' => 'PT. Sinar Surabayasakti',
            'address' => 'Jl. Raya Surabaya-Gresik No. 123, Surabaya, Jawa Timur, Indonesia',
            'phone' => '+62 31 1234567',
            'email' => 'info@sinarsurabayasakti.co.id',
            'whatsapp_number' => '6281234567890',
            'google_maps_iframe' => '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.942732953258!2d112.723456!3d-7.245678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd24bf123456789%3A0x1234567890abcdef!2sSurabaya!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
            'logo_path' => 'img/logo.png',
            'about_us' => 'PT. Sinar Surabayasakti adalah perusahaan manufaktur bahan konstruksi beton pracetak dan ready mix terkemuka di Jawa Timur yang didirikan sejak tahun 1995. Kami berkomitmen untuk menghasilkan produk beton berkualitas tinggi guna memenuhi standardisasi konstruksi nasional dan kebutuhan infrastruktur Indonesia.',
            'vision' => 'Menjadi produsen bahan konstruksi beton pracetak dan ready mix pilihan utama di tingkat nasional yang unggul dalam kualitas, inovasi teknologi, dan kepuasan pelanggan.',
            'mission' => "1. Menghasilkan produk beton konstruksi yang bersertifikasi dengan standardisasi kualitas tinggi.\n2. Mengembangkan kompetensi SDM dan menggunakan teknologi ramah lingkungan yang inovatif.\n3. Memberikan pelayanan yang responsif, andal, dan tepat waktu kepada setiap mitra kerja konstruksi.\n4. Membangun hubungan kemitraan jangka panjang yang saling menguntungkan.",
        ]);
    }
}
