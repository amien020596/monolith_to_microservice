<?php

use App\Http\Controllers\LinkController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\RankingController;
use App\Http\Controllers\StatsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// influencer route
Route::get('products', [ProductsController::class, 'index']);

Route::middleware(['scope:influencer'])->group(function () {
    Route::post('links', [LinkController::class, 'store']);
    Route::get('stats', [StatsController::class, 'index']);
    Route::get('ranking', [RankingController::class, 'index']);
});
