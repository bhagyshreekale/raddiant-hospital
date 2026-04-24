<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BedAvailability extends Model
{
    protected $table = 'bed_availability';

    protected $fillable = [
        'total_beds',
        'available_beds',
        'status',
    ];
}
