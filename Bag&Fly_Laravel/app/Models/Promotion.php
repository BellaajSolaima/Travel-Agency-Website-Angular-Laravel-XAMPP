<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    protected $fillable = [
        'dateDebut',
        'dateFin',
        'pourcentage',
        'hotel_id',
    ];
    public function hotels()
    {
        return $this->belongsTo(Hotel::class, "hotel_id");
    }
}