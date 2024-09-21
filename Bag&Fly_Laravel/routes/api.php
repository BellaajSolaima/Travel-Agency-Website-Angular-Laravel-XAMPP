<?php
use App\Http\Controllers\AdministratorController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CompteController;
use App\Http\Controllers\DisponibiliteController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware("api")->group(function () {
    Route::resource("clients", ClientController::class);
});
Route::middleware('api')->group(function () {
    Route::resource('hotels', HotelController::class);
});
Route::middleware("api")->group(function () {
    Route::resource("reservations", ReservationController::class);
});
Route::middleware("api")->group(function () {
    Route::resource("administrators", AdministratorController::class);
});

Route::middleware('api')->group(function () {
    Route::resource('comptes', CompteController::class);
});

Route::middleware("api")->group(function () {
    Route::resource("disponibilites", DisponibiliteController::class);
});

Route::middleware("api")->group(function () {
    Route::resource("photos", PhotoController::class);
});

Route::middleware("api")->group(function () {
    Route::resource("promotions", PromotionController::class);
});