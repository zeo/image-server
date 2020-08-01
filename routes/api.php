<?php

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

/* AUTH ROUTES */
Route::get('/login/discord', 'Auth\LoginController@discord');
Route::get('/login/github', 'Auth\LoginController@github');

Route::middleware('auth:sanctum')->post('/logout', 'Auth\LoginController@logout');
Route::middleware('auth:sanctum')->post('/settings/new-token', 'SettingsController@generateToken');

Route::middleware('auth:sanctum')->get('/user', function(\Illuminate\Http\Request $request) {
    return $request->user();
});

Route::resource('images', 'ImageController')
    ->except('create', 'edit', 'update');