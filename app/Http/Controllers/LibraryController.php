<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Borrow;
use Illuminate\Http\Request;
use Carbon\Carbon;

class LibraryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');
        
        $books = Book::when($search, function ($query, $search) {
            return $query->where('title', 'like', "%{$search}%")
                        ->orWhere('author', 'like', "%{$search}%")
                        ->orWhere('year', 'like', "%{$search}%");
        })->get();

        $borrows = Borrow::with('book')->whereNull('returned_at')->get();

        return view('library.index', compact('books', 'borrows', 'search'));
    }

    public function borrow(Request $request)
    {
        $request->validate([
            'borrower_name' => 'required|string|max:255',
            'borrower_nim' => 'required|string|size:10|regex:/^[0-9]+$/',
            'book_id' => 'required|exists:books,id'
        ]);

        $book = Book::findOrFail($request->book_id);

        if ($book->status === 'borrowed') {
            return back()->withErrors(['book_id' => 'Buku sudah dipinjam!']);
        }

        // Check if user already borrowed this book
        $existingBorrow = Borrow::where('borrower_nim', $request->borrower_nim)
            ->where('book_id', $request->book_id)
            ->whereNull('returned_at')
            ->first();

        if ($existingBorrow) {
            return back()->withErrors(['book_id' => 'Anda sudah meminjam buku ini!']);
        }

        // Create borrow record
        Borrow::create([
            'borrower_name' => $request->borrower_name,
            'borrower_nim' => $request->borrower_nim,
            'book_id' => $request->book_id,
            'borrowed_at' => Carbon::now(),
        ]);

        // Update book status
        $book->update(['status' => 'borrowed']);

        return back()->with('success', "Buku \"{$book->title}\" berhasil dipinjam!");
    }

    public function return(Request $request, $borrowId)
    {
        $borrow = Borrow::with('book')->findOrFail($borrowId);

        if ($borrow->returned_at) {
            return back()->withErrors(['error' => 'Buku sudah dikembalikan!']);
        }

        // Update borrow record
        $borrow->update(['returned_at' => Carbon::now()]);

        // Update book status
        $borrow->book->update(['status' => 'available']);

        return back()->with('success', "Buku \"{$borrow->book->title}\" berhasil dikembalikan!");
    }
}
