<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    protected $fillable = [
        'specialization',
        'title',
        'salary',
        'location',
        'job_type',
        'experience',
        'description',
    ];

    public function jobApplications()
    {
        return $this->hasMany(JobApplication::class);
    }
}
