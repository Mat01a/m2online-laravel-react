<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Models\Picture;
use App\Models\User;
use App\Models\Like;
use App\Models\PictureTag;

use Illuminate\Support\Facades\DB;


class PictureController extends Controller
{
    //

    public function index()
    {

        return Inertia::render('Home', [
            'pictures' => DB::table('pictures')
                            ->orderBy('id', 'desc')
                            ->get()
        ]);
    }

    public function store(Request $request)
    {
        try {
            //code...

            $request->validate([
                'image' => ['required', 'image'],
                'description' => ['required'],
                'tags' => ['required']
            ]);

            if($request->file('image'))
            {
                DB::beginTransaction();
                $fileName = time().'.'.$request->image->extension();
                $request->image->storeAs('public/images',$fileName);

                $new_image = new Picture();
                $new_image->user_id = $request->user()->id;

                $new_image->image = $fileName;
                $new_image->description = $request->description;

                $new_image->save();
                $new_image_id = $new_image->id;


                $tags = $request->tags;
                
                foreach ($tags as $tag) {
                    # code...
                    $current_tag = new PictureTag();
                    $current_tag->name = $tag;
                    $current_tag->picture_id = $new_image_id;
                    $current_tag->save();
                }

                DB::commit();                

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
            $tags = PictureTag::where('picture_id', $id)->get();

            return Inertia::render('PictureDetails', [
                'details' => $details,
                'author'  => $author,
                'is_liked' => $is_liked,
                'number_of_likes' => $numberOfLikes,
                'tags' => $tags
            ]);
        }
        return Redirect::route('home');
    }
}
