<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Compte extends Model
{

    protected $fillable = [
        'Email',
        'Password',
        'administrator_id',
        'client_id'
    ];
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
    public function administrator()
    {
        return $this->belongsTo(Administrator::class);
    }
}