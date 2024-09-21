<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::all();

        return response()->json($reservations);
    }

    public function store(Request $request)
    {
        $reservation = new Reservation([
            'checkin' => $request->input('checkin'),
            'checkout' => $request->input('checkout'),
            'PrixTotal' => $request->input('PrixTotal'),
            'nbPerson' => $request->input('nbPerson'),
            'client_id' => $request->input('client_id'),
            'hotel_id' => $request->input('hotel_id'),
            'etat' => $request->input('etat'),
        ]);

        $reservation->save();

        return response()->json($reservation, 200);
    }

    public function show($id)
    {
        $reservation = Reservation::find($id);

        return response()->json($reservation);
    }

    public function update($id, Request $request)
    {
        $reservation = Reservation::find($id);
        $reservation->update($request->all());

        return response()->json($reservation, 201);
    }

    public function destroy($id)
    {
        $reservation = Reservation::find($id);
        $reservation->delete();

        return response()->json('Reservation deleted successfully!');
    }
}