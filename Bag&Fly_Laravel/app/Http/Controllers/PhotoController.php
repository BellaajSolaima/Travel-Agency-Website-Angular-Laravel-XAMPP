<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class PhotoController extends Controller
{
    public function index()
    {
        $photos = Photo::all();

        return response()->json($photos);
    }

    public function store(Request $request)
    {
        $photo = new Photo([
            'photo1' => $request->input('photo1'),
            'photo2' => $request->input('photo2'),
            'photo3' => $request->input('photo3'),
            'photo4' => $request->input('photo4'),
            'photo5' => $request->input('photo5'),
            'hotel_id' => $request->input('hotel_id'),
        ]);

        $photo->save();

        return response()->json($photo, 200);
    }

    public function show($id)
    {
        $photo = Photo::find($id);

        return response()->json($photo);
    }

    public function update($id, Request $request)
    {
        $photo = Photo::find($id);
        $photo->update($request->all());

        return response()->json($photo, 201);
    }

    public function destroy($id)
    {
        $photo = Photo::find($id);
        $photo->delete();

        return response()->json('Photo deleted successfully!');
    }
}