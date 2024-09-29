<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;

// Routes that authentication

Route::group(['prefix' => 'auth'], function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('logout', [AuthController::class, 'logout']);
});

// Routes that require admin middleware

Route::middleware(['auth:api', 'admin'])->group(function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('products', ProductController::class);
});

// Routes that require authentication

Route::middleware('auth:api')->group(function () {
    Route::get('categories', [CategoryController::class, 'index']);
    Route::get('products', [ProductController::class, 'index']);

    // Review routes
    Route::prefix('products/{product}')->group(function () {
        Route::apiResource('reviews', ReviewController::class)->only(['index', 'store', 'show', 'update', 'destroy']);
    });
});