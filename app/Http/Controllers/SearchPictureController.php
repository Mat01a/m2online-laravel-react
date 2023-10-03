<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SearchPictureController extends Controller
{
    //

    public function index(Request $request)
    {
        $users = DB::table('users')
            ->where('email', 'LIKE', "%{$request->input}%")
            ->limit(5)
            ->get();
        return Inertia::render('Home', [
            'users' => $users
        ]);
    }

}
