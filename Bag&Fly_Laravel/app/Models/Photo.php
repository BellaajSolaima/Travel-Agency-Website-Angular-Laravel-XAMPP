<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{

    protected $fillable = [
        'photo1',
        'photo2',
        'photo3',
        'photo4',
        'photo5',
        'hotel_id',
    ];
    public function hotels()
    {
        return $this->belongsTo(Hotel::class, "hotel_id");
    }
}