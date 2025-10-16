<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $books = [
            ['title' => 'Belajar JavaScript untuk Pemula', 'author' => 'Ahmad Sanusi', 'year' => 2023, 'status' => 'available'],
            ['title' => 'Pemrograman Web dengan HTML & CSS', 'author' => 'Siti Nurhaliza', 'year' => 2022, 'status' => 'available'],
            ['title' => 'Database Management System', 'author' => 'Budi Santoso', 'year' => 2023, 'status' => 'available'],
            ['title' => 'Algoritma dan Struktur Data', 'author' => 'Dewi Kartika', 'year' => 2021, 'status' => 'available'],
            ['title' => 'Rekayasa Perangkat Lunak', 'author' => 'Made Sudana', 'year' => 2022, 'status' => 'available'],
            ['title' => 'Sistem Operasi Komputer', 'author' => 'Rina Permatasari', 'year' => 2023, 'status' => 'available'],
            ['title' => 'Jaringan Komputer dan Internet', 'author' => 'Agus Setiawan', 'year' => 2022, 'status' => 'available'],
            ['title' => 'Machine Learning untuk Pemula', 'author' => 'Diana Sari', 'year' => 2023, 'status' => 'available'],
            ['title' => 'Keamanan Siber dan Etika Digital', 'author' => 'Rahman Hakim', 'year' => 2021, 'status' => 'available'],
            ['title' => 'Mobile App Development', 'author' => 'Lisa Andriani', 'year' => 2023, 'status' => 'available'],
        ];

        foreach ($books as $book) {
            \App\Models\Book::create($book);
        }
    }
}
