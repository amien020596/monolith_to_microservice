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

Route::group(['middleware' => 'auth:api'], function () {
  Route::get('user', 'UserController@user');
  Route::put('users/info', 'UserController@updateInfo');
  Route::put('users/password', 'UserController@updatePassword');

  Route::get('product', 'ProductController@index');
  Route::get('product/{id}', 'ProductController@show');
  Route::post('product', 'ProductController@store');
  Route::put('product/{id}', 'ProductController@update');
  Route::delete('product/{id}', 'ProductController@destroy');

  Route::post('upload', 'ImageUploadController@upload');

  Route::apiResource('users', 'UserController');
  Route::apiResource('roles', 'RoleController');
});
