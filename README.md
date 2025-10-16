# 📚 Online Library System<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>



Aplikasi sederhana untuk peminjaman buku online menggunakan HTML, CSS, dan JavaScript.<p align="center">

<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>

## 🎯 Fitur<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>

<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>

✅ **Halaman Home**: Menampilkan daftar buku (judul, penulis, tahun, status)<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>

✅ **Search Buku**: Pencarian dengan HTTP GET (menggunakan query string)</p>

✅ **Form Peminjaman**: Input nama, NIM, judul buku → disimpan ke localStorage

✅ **State Management**: Data tetap tersimpan meski browser di-refresh## About Laravel

✅ **Return Book**: Tombol untuk mengembalikan buku (bonus feature)

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

## 📁 Struktur File

- [Simple, fast routing engine](https://laravel.com/docs/routing).

```- [Powerful dependency injection container](https://laravel.com/docs/container).

PPW-UTS-01/- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.

├── index.html          # Halaman utama- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).

├── css/- Database agnostic [schema migrations](https://laravel.com/docs/migrations).

│   └── styles.css      # File styling- [Robust background job processing](https://laravel.com/docs/queues).

├── js/- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

│   └── app.js          # Logic aplikasi

└── README.md           # DokumentasiLaravel is accessible, powerful, and provides tools required for large, robust applications.

```

## Learning Laravel

## 🚀 Cara Menjalankan

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

1. **Download/Clone** repository ini

2. **Buka file** `index.html` di browserYou may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

3. **Atau gunakan Live Server** di VS Code untuk hasil terbaik

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## 💡 Teknologi yang Digunakan

## Laravel Sponsors

- **HTML5** - Struktur halaman

- **CSS3** - Styling sederhanaWe would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

- **JavaScript ES6** - Logic aplikasi

- **localStorage** - Penyimpanan data (sesuai requirement)### Premium Partners



## 🔧 Fitur Teknis- **[Vehikl](https://vehikl.com)**

- **[Tighten Co.](https://tighten.co)**

### Search dengan HTTP GET- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**

- URL berubah saat melakukan pencarian- **[64 Robots](https://64robots.com)**

- Contoh: `?search=javascript`- **[Curotec](https://www.curotec.com/services/technologies/laravel)**

- Browser back/forward button support- **[DevSquad](https://devsquad.com/hire-laravel-developers)**

- **[Redberry](https://redberry.international/laravel-development)**

### LocalStorage- **[Active Logic](https://activelogic.com)**

- Data pinjaman tersimpan otomatis

- Status buku terupdate real-time## Contributing

- Data tidak hilang saat refresh browser

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

### Validasi Form

- Nama dan NIM harus diisi## Code of Conduct

- NIM harus 10 digit angka

- Tidak bisa meminjam buku yang sama 2xIn order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).



## 📖 Cara Penggunaan## Security Vulnerabilities



1. **Lihat Daftar Buku** - Semua buku tampil otomatisIf you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

2. **Cari Buku** - Ketik di search box, tekan "Cari"

3. **Pinjam Buku** - Isi form, pilih buku, klik "Pinjam Buku"## License

4. **Lihat Pinjaman** - Daftar pinjaman tampil di bawah

5. **Kembalikan Buku** - Klik tombol "Kembalikan" (bonus feature)The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).


## 📝 Catatan untuk Mahasiswa

Code ini dibuat **mahasiswa-friendly** dengan:
- ✅ Komentar lengkap dalam bahasa Indonesia
- ✅ Nama fungsi yang mudah dipahami
- ✅ Struktur code yang rapi dan terorganisir
- ✅ Implementasi localStorage sesuai requirement soal
- ✅ Tidak menggunakan framework yang rumit

---
**Developed for PPW-UTS-01 Assignment**