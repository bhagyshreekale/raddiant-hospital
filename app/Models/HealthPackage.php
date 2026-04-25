<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HealthPackage extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'features',
        'is_featured',
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'is_featured' => 'boolean',
        ];
    }
}
