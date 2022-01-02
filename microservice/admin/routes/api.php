<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ImageUploadController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
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

Route::get('user', [AuthController::class, 'user']);

// admin route
Route::middleware('scope.admin')->group(
    function () {

        Route::apiResource('users', UserController::class);
        Route::apiResource('product', ProductController::class);
        Route::apiResource('orders', OrderController::class)->only('index', 'show');
        Route::apiResources([
            'roles' => RoleController::class
        ]);
        Route::apiResource('permissions', PermissionController::class)->only('index');
        Route::post('upload', [ImageUploadController::class, 'upload']);
        Route::get('export', [OrderController::class, 'export']);
        Route::get('chart', [DashboardController::class, 'chartOrder']);
    }
);
