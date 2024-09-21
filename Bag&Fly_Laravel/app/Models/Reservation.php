<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{


    protected $fillable = [
        'checkin',
        'checkout',
        'PrixTotal',
        'nbPerson',
        'client_id',
        'hotel_id',

    ];
    public function clients()
    {
        return $this->belongsTo(Client::class, "client_id");
    }
    public function hotels()
    {
        return $this->belongsTo(Hotel::class, "hotel_id");
    }
}