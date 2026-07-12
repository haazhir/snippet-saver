<?php

use App\Http\Controllers\SnippetController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware('throttle:5,1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::middleware('throttle:60,1')->group(function () {
        Route::get('/snippets', [SnippetController::class, 'index']);
        Route::post('/snippets', [SnippetController::class, 'store']);
        Route::delete('/snippets/{snippet}', [SnippetController::class, 'destroy']);
    });
});
