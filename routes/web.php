<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;

Route::get('/', [BookController::class, 'index'])->name('home');
Route::get('/borrow', [BookController::class, 'borrow'])->name('borrow');

// API routes for loans
Route::post('/api/loans', [BookController::class, 'storeLoan']);
Route::delete('/api/loans/{id}', [BookController::class, 'returnBook']);
Route::delete('/api/loans', [BookController::class, 'clearLoans']);