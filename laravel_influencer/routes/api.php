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

Route::post('login', 'AuthController@login');
Route::post('register', 'AuthController@register');

Route::group([
  'middleware' => 'auth:api',
  'prefix' => 'admin',
  'namespace' => 'Admin'
], function () {
  Route::get('user', 'UserController@user');
  Route::put('users/info', 'UserController@updateInfo');
  Route::put('users/password', 'UserController@updatePassword');

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

Route::group([
  'prefix' => 'influencer',
  'namespace' => 'Influencer'
], function () {
  Route::get('products', 'ProductsController@index');
});
