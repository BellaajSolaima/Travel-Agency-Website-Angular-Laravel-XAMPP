<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{


    protected $fillable = [
        'nomHotel',
        'adress',
        'nbEtoile',
        'ville',
        'nbVisiteur'
    ];
    public function reservations()
    {
        return $this->hasMany(Reservation::class, "client_id");
    }
    public function disponibilites()
    {
        return $this->hasMany(Disponibilite::class, "disponibilite_id");
    }
    public function promotions()
    {
        return $this->hasMany(Promotion::class, "promotion_id");
    }
    public function photos()
    {
        return $this->hasMany(Photo::class, "photo_id");
    }

}