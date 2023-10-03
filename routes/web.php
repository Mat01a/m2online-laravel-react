<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PictureController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::post('/home', [SearchPictureController::class, 'index'])->middleware(['auth', 'verified'])->name('getUsers');


Route::middleware('auth')->group(function () {
    Route::get('/home', [PictureController::class, 'index'])->name('home');
});

Route::middleware('auth')->group(function () {
    Route::post('/profile', [PictureController::class, 'store'])->name('profile.store.picture');
    Route::get('/profile/{id}/picture', function () {
        return response('Y', 400);
    })->name('profile.picture');
    Route::get('/picture/{id}', [PictureController::class, 'show'])->name('picture.details');
});

Route::get('/profile/{id}', [ProfileController::class, 'show'])->name('profile.id');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
