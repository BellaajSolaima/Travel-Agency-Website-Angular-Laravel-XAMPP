<?php

namespace App\Http\Controllers;

use App\Models\Administrator;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class AdministratorController extends Controller
{
    public function index()
    {
        $administrators = Administrator::all();

        return response()->json($administrators);
    }

    public function store(Request $request)
    {
        $administrator = new Administrator([
            'nomAdmin' => $request->input('nomAdmin'),
        ]);

        $administrator->save();

        return response()->json($administrator, 200);
    }

    public function show($id)
    {
        $administrator = Administrator::find($id);

        return response()->json($administrator);
    }

    public function update($id, Request $request)
    {
        $administrator = Administrator::find($id);
        $administrator->update($request->all());

        return response()->json($administrator, 201);
    }

    public function destroy($id)
    {
        $administrator = Administrator::find($id);
        $administrator->delete();

        return response()->json('Administrator deleted successfully!');
    }
}