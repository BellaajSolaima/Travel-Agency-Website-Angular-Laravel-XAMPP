<?php

namespace App\Http\Controllers;

use App\Models\Disponibilite;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class DisponibiliteController extends Controller
{
    public function index()
    {
        $disponibilites = Disponibilite::all();

        return response()->json($disponibilites);
    }

    public function store(Request $request)
    {
        $disponibilite = new Disponibilite([
            'dateDebut' => $request->input('dateDebut'),
            'dateFin' => $request->input('dateFin'),
            'nbChambre2' => $request->input('nbChambre2'),
            'nbChambreRestantes2' => $request->input('nbChambreRestantes2'),
            'prixChambre2' => $request->input('prixChambre2'),
            'nbChambre3' => $request->input('nbChambre3'),
            'nbChambreRestantes3' => $request->input('nbChambreRestantes3'),
            'prixChambre3' => $request->input('prixChambre3'),
            'nbChambre4' => $request->input('nbChambre4'),
            'nbChambreRestantes4' => $request->input('nbChambreRestantes4'),
            'prixChambre4' => $request->input('prixChambre4'),
            'hotel_id' => $request->input('hotel_id'),
        ]);

        $disponibilite->save();

        return response()->json($disponibilite, 200);
    }

    public function show($id)
    {
        $disponibilite = Disponibilite::find($id);

        return response()->json($disponibilite);
    }

    public function update($id, Request $request)
    {
        $disponibilite = Disponibilite::find($id);
        $disponibilite->update($request->all());

        return response()->json($disponibilite, 201);
    }

    public function destroy($id)
    {
        $disponibilite = Disponibilite::find($id);
        $disponibilite->delete();

        return response()->json('Disponibilite deleted successfully!');
    }
}