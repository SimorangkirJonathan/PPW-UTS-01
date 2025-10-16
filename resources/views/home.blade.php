@extends('layout')

@section('content')
<h2>Daftar Buku</h2>

<form method="GET" action="{{ route('home') }}" class="search-form">
    <input type="text" name="search" placeholder="Cari buku (judul atau penulis)..." value="{{ $query ?? '' }}">
    <button type="submit">Search</button>
</form>

<table class="books-table">
    <thead>
        <tr>
            <th>Judul</th>
            <th>Penulis</th>
            <th>Tahun</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
    @forelse($books as $book)
        <tr>
            <td>{{ $book['judul'] }}</td>
            <td>{{ $book['penulis'] }}</td>
            <td>{{ $book['tahun'] }}</td>
            <td>{{ $book['status'] }}</td>
        </tr>
    @empty
        <tr>
            <td colspan="4">Tidak ada buku ditemukan.</td>
        </tr>
    @endforelse
    </tbody>
</table>
@endsection
