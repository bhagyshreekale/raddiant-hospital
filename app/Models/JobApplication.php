<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    protected $fillable = [
        'job_id',
        'full_name',
        'email',
        'phone',
        'experience',
        'resume_url',
    ];

    public function career()
    {
        return $this->belongsTo(Career::class, 'job_id');
    }
}
