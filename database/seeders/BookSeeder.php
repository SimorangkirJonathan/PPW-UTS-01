<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $books = [
            ['judul' => 'Pemrograman Web', 'penulis' => 'Andi', 'tahun' => 2021, 'status' => 'Tersedia'],
            ['judul' => 'Jaringan Komputer', 'penulis' => 'Budi', 'tahun' => 2020, 'status' => 'Tersedia'],
            ['judul' => 'Basis Data', 'penulis' => 'Citra', 'tahun' => 2019, 'status' => 'Tersedia'],
            ['judul' => 'Algoritma dan Struktur Data', 'penulis' => 'Dewi', 'tahun' => 2018, 'status' => 'Tersedia'],
            ['judul' => 'Pabwe', 'penulis' => 'cina', 'tahun' => 2018, 'status' => 'Tersedia'],
        ];

        foreach ($books as $book) {
            Book::create($book);
        }
    }
}
