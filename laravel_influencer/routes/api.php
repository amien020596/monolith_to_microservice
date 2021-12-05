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
// common Route
Route::post('login', 'AuthController@login');
Route::post('register', 'AuthController@register');

Route::group([
  'middleware' => 'auth:api',
], function () {
  Route::get('user', 'AuthController@user');
  Route::put('users/info', 'AuthController@updateInfo');
  Route::put('users/password', 'AuthController@updatePassword');
});

// admin Route
Route::group([
  'middleware' => ['auth:api', 'scope:admin'],
  'prefix' => 'admin',
  'namespace' => 'Admin'
], function () {

  Route::post('logout', 'AuthController@logout');
  Route::post('upload', 'ImageUploadController@upload');
  Route::get('export', 'OrderController@export');
  Route::get('chart', 'DashboardController@chartOrder');

  Route::apiResource('users', 'UserController');
  Route::apiResource('product', 'ProductController');
  Route::apiResource('orders', 'OrderController')->only('index', 'show');
  Route::apiResource('roles', 'RoleController');
  Route::apiResource('permissions', 'PermissionController')->only('index');
});

// Influencer Route
Route::group([
  'prefix' => 'influencer',
  'namespace' => 'Influencer'
], function () {
  Route::get('products', 'ProductsController@index');

  Route::group([
    'middleware' => ['auth:api', 'scope:influencer'],
  ], function () {
    Route::post('links', 'LinkController@store');
    Route::get('stats', 'StatsController@index');
  });
});

Route::group([
  'prefix' => 'checkout',
  'namespace' => 'Checkout'
], function () {
  Route::get('links/{code}', 'LinkController@show');
  Route::post('orders', 'OrderController@store');
  Route::post('orders/confirm', 'OrderController@confirm');
});
