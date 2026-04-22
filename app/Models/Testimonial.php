<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'specialization_id',
        'patient_name',
        'patient_type',
        'description',
        'profile_image',
    ];

    public function specialization()
    {
        return $this->belongsTo(Specialization::class);
    }
}
