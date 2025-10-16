<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LibraryController;

Route::get('/', [LibraryController::class, 'index'])->name('library.index');
Route::post('/borrow', [LibraryController::class, 'borrow'])->name('library.borrow');
Route::post('/return/{borrow}', [LibraryController::class, 'return'])->name('library.return');
