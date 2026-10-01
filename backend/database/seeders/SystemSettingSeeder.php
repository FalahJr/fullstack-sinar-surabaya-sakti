<?php

namespace Database\Seeders;

use App\Models\SystemSetting;
use Illuminate\Database\Seeder;

class SystemSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SystemSetting::create([
            'key' => 'seo_title',
            'value' => 'PT. Sinar Surabayasakti | Produsen Beton Ready Mix & Pracetak Surabaya',
        ]);

        SystemSetting::create([
            'key' => 'seo_description',
            'value' => 'PT. Sinar Surabayasakti memproduksi beton ready mix bermutu tinggi dan pracetak terlengkap seperti U-ditch, Box culvert, pagar panel beton kokoh di wilayah Surabaya, Gresik, Sidoarjo, dan Jawa Timur.',
        ]);

        SystemSetting::create([
            'key' => 'seo_keywords',
            'value' => 'beton ready mix, beton pracetak, u ditch surabaya, box culvert gresik, pagar panel beton, sinar surabayasakti, produsen beton jawa timur',
        ]);

        SystemSetting::create([
            'key' => 'whatsapp_float_text',
            'value' => 'Halo Admin, saya tertarik untuk berkonsultasi mengenai produk beton konstruksi!',
        ]);

        SystemSetting::create([
            'key' => 'web_footer_text',
            'value' => '© 2026 PT. Sinar Surabayasakti. Seluruh Hak Cipta Dilindungi.',
        ]);
    }
}
