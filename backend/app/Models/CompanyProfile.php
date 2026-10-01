<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'phone',
        'email',
        'whatsapp_number',
        'google_maps_iframe',
        'logo_path',
        'about_us',
        'vision',
        'mission',
    ];
}
