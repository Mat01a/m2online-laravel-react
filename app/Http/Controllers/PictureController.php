<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Picture;
use App\Models\User;

class PictureController extends Controller
{
    //

    public function index()
    {

        return Inertia::render('Home', [
            'pictures' => Picture::all()
        ]);
    }

    public function store(Request $request)
    {
        try {
            //code...

            $request->validate([
                'image' => ['required', 'image']
            ]);

            if($request->file('image'))
            {
                $fileName = time().'.'.$request->image->extension();
                $request->image->storeAs('public/images',$fileName);

                $new_image = new Picture();
                $new_image->user_id = $request->user()->id;

                // $path = $request->file('image')->getRealPath();
                // $image = file_get_contents($path);

                // //Encode
                // $base64 = base64_encode($image);

                //Extension

                $new_image->image = $fileName;

                $new_image->save();

                return Inertia::render('Profile', [
                    'data' => $request->user()->id
                ]);

            }

        } catch (\Throwable $th) {
            return response($th, 400);
            throw $th;
        }
    }

    public function show($id)
    {
        $details = Picture::find($id);
        $author = User::find($details->user_id);
        return Inertia::render('PictureDetails', [
            'details' => $details,
            'author'  => $author,
        ]);
    }
}
