<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Specialization extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'description',
    ];

    public function doctors()
    {
        return $this->hasMany(Doctor::class);
    }

    public function testimonials()
    {
        return $this->hasMany(Testimonial::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}
