<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UsuarioController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('usuario')->group(function () {
    Route::get('/',[ UsuarioController::class, 'getAll']);
    Route::post('/',[ UsuarioController::class, 'create']);
    Route::delete('/{id}',[ UsuarioController::class, 'delete']);
    Route::get('/{id}',[ UsuarioController::class, 'get']);
    Route::put('/{id}',[ UsuarioController::class, 'update']);
});
