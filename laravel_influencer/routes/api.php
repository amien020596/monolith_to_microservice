<?php

use Illuminate\Http\Request;
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

Route::get('user', 'AuthController@user');

// admin route
Route::group(
  [
    'middleware' => 'scope.admin',
    'prefix' => 'admin',
    'namespace' => 'Admin'
  ],
  function () {
    Route::post('test', function () {
      return 'test yuhu';
    });
    Route::post('upload', 'ImageUploadController@upload');
    Route::get('export', 'OrderController@export');
    Route::get('chart', 'DashboardController@chartOrder');

    Route::apiResource('users', 'UserController');
    Route::apiResource('product', 'ProductController');
    Route::apiResource('orders', 'OrderController')->only('index', 'show');
    Route::apiResource('roles', 'RoleController');
    Route::apiResource('permissions', 'PermissionController')->only('index');
  }
);
