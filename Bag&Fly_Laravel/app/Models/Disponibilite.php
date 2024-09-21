<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Disponibilite extends Model
{

    protected $fillable = [
        'dateDebut',
        'dateFin',
        'nbChambre2',
        'nbChambreRestantes2',
        'prixChambre2',
        'nbChambre3',
        'nbChambreRestantes3',
        'prixChambre3',
        'nbChambre4',
        'nbChambreRestantes4',
        'prixChambre4',
        'hotel_id',
    ];
    public function hotels()
    {
        return $this->belongsTo(Hotel::class, "hotel_id");
    }
}