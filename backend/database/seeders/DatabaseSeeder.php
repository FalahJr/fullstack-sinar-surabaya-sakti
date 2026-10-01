<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Reset and Seed user admin utama
        User::updateOrCreate(
            ['email' => 'admin@sinarsurabayasakti.co.id'],
            [
                'name' => 'Administrator SSS',
                'password' => Hash::make('password123'),
                'role' => 'admin',
            ]
        );

        $this->call([
            CompanyProfileSeeder::class,
            BannerSeeder::class,
            ProductSeeder::class,
            DownloadCenterSeeder::class,
            SystemSettingSeeder::class,
        ]);
    }
}
