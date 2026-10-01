<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DownloadCenter extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'file_type',
        'file_path',
        'download_count',
    ];

    protected $casts = [
        'download_count' => 'integer',
    ];
}
