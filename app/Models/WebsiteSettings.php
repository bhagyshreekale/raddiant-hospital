<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WebsiteSettings extends Model
{
    protected $table = 'website_settings';

    protected $fillable = ['key', 'value'];

    public static function getSetting(string $key, ?string $default = null): ?string
    {
        $setting = static::where('key', $key)->first();

        return $setting?->value ?? $default;
    }

    public static function setSetting(string $key, ?string $value): void
    {
        static::updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
    }
}