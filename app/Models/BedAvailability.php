<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BedAvailability extends Model
{
    protected $fillable = [
        'total_beds',
        'available_beds',
        'status',
    ];
}
