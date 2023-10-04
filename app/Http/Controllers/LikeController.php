<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;

class LikeController extends Controller
{
    //

    public function store(Request $request)
    {
        $like = new Like();
        $like->picture_id = $request->picture_id;
        $like->user_id = $request->user()->id;
        $like->save();
        return back()->with('status', 200);
    }
    
    
    /*
    Remove like
    */
    public function destroy(Request $request)
    {
        $like = Like::where('picture_id', $request->picture_id)
                    ->where('user_id', $request->user()->id)
                    ->delete();
        return back()->with('status', 200);
    }
}
