<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PictureController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\SearchPictureController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/home/{search}', [SearchPictureController::class, 'show'])->name('search');


Route::middleware('auth')->group(function () {
    Route::get('/home', [PictureController::class, 'index'])->name('home');
});

Route::middleware('auth')->group(function () {
    Route::post('/profile', [PictureController::class, 'store'])->name('profile.store.picture');
    Route::get('/picture/{id}', [PictureController::class, 'show'])->name('picture.details');
    Route::post('/like', [LikeController::class, 'store'])->name('like.store');
    Route::delete('/like', [LikeController::class, 'destroy'])->name('like.destroy');
});



Route::middleware('auth')->group(function () {
    Route::get('/profile/{id}', [ProfileController::class, 'show'])->name('profile.id');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
