<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserDataController;

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
    return view('welcome');
});



Route::post('/userdata', [UserDataController::class, 'store']);
Route::get('/userdata/{id}', [UserDataController::class, 'show']);

