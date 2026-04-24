<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactInfo extends Model
{
    protected $table = 'contact_info';

    protected $fillable = ['email', 'phone', 'address', 'open_hours', 'map_link'];
}
