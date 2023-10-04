<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Models\Picture;
use App\Models\User;
use App\Models\Like;

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

                $new_image->image = $fileName;
                $new_image->description = $request->description;

                $new_image->save();

                return back();

            }

        } catch (\Throwable $th) {
            return response($th, 400);
            throw $th;
        }
    }

    public function show(Request $request, $id)
    {
        $pictures = Picture::all();
        if(count($pictures) > 0)
        {
            $details = Picture::find($id);
            $author = User::find($details->user_id);
            $like = Like::where('user_id', $request->user()->id)
                        ->where('picture_id', $id)
                        ->get();
            $numberOfLikes = Like::where('picture_id', $id)->count();
            $is_liked = count($like) ? true : false;
            return Inertia::render('PictureDetails', [
                'details' => $details,
                'author'  => $author,
                'is_liked' => $is_liked,
                'number_of_likes' => $numberOfLikes
            ]);
        }
        return Redirect::route('home');
    }
}
