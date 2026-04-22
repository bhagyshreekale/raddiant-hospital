<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = [
        'full_name',
        'phone',
        'email',
        'age',
        'gender',
        'visit_type',
        'specialization_id',
        'doctor_id',
        'preferred_date',
        'time_slot',
        'description',
    ];

    public function specialization()
    {
        return $this->belongsTo(Specialization::class);
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
}
