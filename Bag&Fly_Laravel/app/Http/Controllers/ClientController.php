<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::all();

        return response()->json($clients);
    }

    public function store(Request $request)
    {
        $client = new Client([
            'nomClient' => $request->input('nomClient'),
            'cin' => $request->input('cin'),
            'numTel' => $request->input('numTel'),
        ]);

        $client->save();

        return response()->json($client, 200);
    }

    public function show($id)
    {
        $client = Client::find($id);

        return response()->json($client);
    }

    public function update($id, Request $request)
    {
        $client = Client::find($id);
        $client->update($request->all());

        return response()->json($client, 201);
    }

    public function destroy($id)
    {
        $client = Client::find($id);
        $client->delete();

        return response()->json('Client deleted successfully!');
    }
}