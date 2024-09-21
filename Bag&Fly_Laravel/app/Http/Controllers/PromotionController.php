<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class PromotionController extends Controller
{
    public function index()
    {
        $promotions = Promotion::all();

        return response()->json($promotions);
    }

    public function store(Request $request)
    {
        $promotion = new Promotion([
            'dateDebut' => $request->input('dateDebut'),
            'dateFin' => $request->input('dateFin'),
            'pourcentage' => $request->input('pourcentage'),
            'hotel_id' => $request->input('hotel_id'),
        ]);

        $promotion->save();

        return response()->json($promotion, 200);
    }

    public function show($id)
    {
        $promotion = Promotion::find($id);

        return response()->json($promotion);
    }

    public function update($id, Request $request)
    {
        $promotion = Promotion::find($id);
        $promotion->update($request->all());

        return response()->json($promotion, 201);
    }

    public function destroy($id)
    {
        $promotion = Promotion::find($id);
        $promotion->delete();

        return response()->json('Promotion deleted successfully!');
    }
}