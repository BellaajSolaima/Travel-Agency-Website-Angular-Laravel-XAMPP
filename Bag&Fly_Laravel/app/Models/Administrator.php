<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Administrator extends Model
{

    protected $fillable = [
        'nomAdmin',
    ];
    public function compte()
    {
        return $this->hasOne(Compte::class);
    }
}