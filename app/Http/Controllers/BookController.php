<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Book;
use App\Models\Loan;

abstract class Controller
{
    //
}

class BookController extends Controller
{
    public function index(Request $request)
    {
        $booksQuery = Book::query();
        
        $query = $request->get('search');
        if ($query) {
            $booksQuery->where(function($q) use ($query) {
                $q->where('judul', 'like', '%' . $query . '%')
                  ->orWhere('penulis', 'like', '%' . $query . '%');
            });
        }

        $books = $booksQuery->get()->toArray();

        return view('home', ['books' => $books, 'query' => $query]);
    }

    public function borrow()
    {
        $loans = Loan::all();
        return view('borrow', ['loans' => $loans]);
    }

    public function storeLoan(Request $request)
    {
        $request->validate([
            'nama' => 'required|string',
            'nim' => 'required|string', 
            'judul' => 'required|string'
        ]);

        // Check if book exists and is available
        $book = Book::where('judul', $request->judul)->first();
        if (!$book) {
            return response()->json(['error' => 'Buku tidak ditemukan'], 404);
        }
        
        if ($book->status === 'Dipinjam') {
            return response()->json(['error' => 'Buku sudah dipinjam'], 400);
        }

        // Create loan record with book_id
        Loan::create([
            'book_id' => $book->id,
            'nama' => $request->nama,
            'nim' => $request->nim,
            'judul' => $request->judul
        ]);

        // Update book status to 'Dipinjam'
        $book->update(['status' => 'Dipinjam']);

        return response()->json(['success' => true, 'message' => 'Buku berhasil dipinjam']);
    }

    public function returnBook(Request $request)
    {
        $request->validate([
            'id' => 'required|integer'
        ]);

        $loan = Loan::with('book')->find($request->id);
        if (!$loan) {
            return response()->json(['error' => 'Peminjaman tidak ditemukan'], 404);
        }

        // Update book status back to 'Tersedia'
        if ($loan->book) {
            $loan->book->update(['status' => 'Tersedia']);
        }

        // Delete loan record
        $loan->delete();

        return response()->json(['success' => true, 'message' => 'Buku berhasil dikembalikan']);
    }

    public function clearLoans(Request $request)
    {
        // Get all loans with books
        $loans = Loan::with('book')->get();
        
        // Update all borrowed books to 'Tersedia'
        foreach ($loans as $loan) {
            if ($loan->book) {
                $loan->book->update(['status' => 'Tersedia']);
            }
        }

        // Delete all loans
        Loan::truncate();

        return response()->json(['success' => true, 'message' => 'Semua peminjaman berhasil dihapus']);
    }
}