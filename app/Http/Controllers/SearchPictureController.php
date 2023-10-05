<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SearchPictureController extends Controller
{
    //

    public function show(Request $request, $search)
    {
        return Inertia::render('Home', [
            'pictures' => DB::table('pictures')
                            ->join('users', 'users.id', '=', 'pictures.user_id')
                            ->join('picture_tags', 'picture_tags.picture_id', '=', 'pictures.id')
                            ->where('users.name', 'LIKE', "%{$search}%")
                            ->orWhere('picture_tags.name', 'LIKE', "%{$search}%")
                            ->orWhere('pictures.description', 'LIKE', "%{$search}%")
                            ->select("pictures.*")
                            ->orderBy('pictures.id', 'desc')
                            ->distinct()
                            ->get()
        ]);
    }

}
