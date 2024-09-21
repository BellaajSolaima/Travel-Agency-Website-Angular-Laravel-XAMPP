<?php

namespace App\Http\Controllers;

use App\Models\Compte;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class CompteController extends Controller
{
    public function index()
    {
        $comptes = Compte::all();

        return response()->json($comptes);
    }

    public function store(Request $request)
    {
        $compte = new Compte([
            'Email' => $request->input('Email'),
            'Password' => md5($request->input('Password')),
            'administrator_id' => $request->input('administrator_id'),
            'client_id' => $request->input('client_id'),
        ]);

        $compte->save();

        return response()->json($compte, 200);
    }

    public function show($id)
    {
        $compte = Compte::find($id);

        return response()->json($compte);
    }

    public function update($id, Request $request)
    {
        $compte = Compte::find($id);
        $compte->update($request->all());

        return response()->json($compte, 201);
    }

    public function destroy($id)
    {
        $compte = Compte::find($id);
        $compte->delete();

        return response()->json('Compte deleted successfully!');
    }
}