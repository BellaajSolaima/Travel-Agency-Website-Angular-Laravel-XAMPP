<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{

    protected $fillable = [
        'nomClient',
        'cin',
        'numTel'
    ];
    public function reservations()
    {
        return $this->hasMany(Reservation::class, "client_id");
    }
    public function compte()
    {
        return $this->hasOne(Compte::class);
    }
}