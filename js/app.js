/*
=== ONLINE LIBRARY SYSTEM ===
Aplikasi sederhana untuk peminjaman buku online
Menggunakan localStorage untuk menyimpan data

Fitur:
1. Menampilkan daftar buku
2. Mencari buku (GET dengan query string)  
3. Meminjam buku (simpan ke localStorage)
4. Mengembalikan buku (hapus dari localStorage)
5. Data tetap ada setelah refresh browser
*/

// ===== DATA BUKU =====
const bukuData = [
    { id: 1, title: "Belajar JavaScript untuk Pemula", author: "Ahmad Sanusi", year: 2023, status: "available" },
    { id: 2, title: "Pemrograman Web dengan HTML & CSS", author: "Siti Nurhaliza", year: 2022, status: "available" },
    { id: 3, title: "Database Management System", author: "Budi Santoso", year: 2023, status: "available" },
    { id: 4, title: "Algoritma dan Struktur Data", author: "Dewi Kartika", year: 2021, status: "available" },
    { id: 5, title: "Rekayasa Perangkat Lunak", author: "Made Sudana", year: 2022, status: "available" },
    { id: 6, title: "Sistem Operasi Komputer", author: "Rina Permatasari", year: 2023, status: "available" },
    { id: 7, title: "Jaringan Komputer dan Internet", author: "Agus Setiawan", year: 2022, status: "available" },
    { id: 8, title: "Machine Learning untuk Pemula", author: "Diana Sari", year: 2023, status: "available" },
    { id: 9, title: "Keamanan Siber dan Etika Digital", author: "Rahman Hakim", year: 2021, status: "available" },
    { id: 10, title: "Mobile App Development", author: "Lisa Andriani", year: 2023, status: "available" }
];

// ===== VARIABEL GLOBAL =====
let semuaBuku = [...bukuData];    // Copy data buku
let daftarPinjaman = [];          // Array untuk menyimpan data pinjaman

// ===== FUNGSI UTAMA =====

// 1. Inisialisasi aplikasi saat halaman dimuat
function initApp() {
    console.log("📚 Memulai aplikasi Library System...");
    
    loadDataPinjaman();      // Muat data dari localStorage
    tampilkanBuku(semuaBuku); // Tampilkan semua buku
    isiDropdownBuku();       // Isi dropdown form
    tampilkanPinjaman();     // Tampilkan daftar pinjaman
}

// 2. Tampilkan daftar buku
function tampilkanBuku(bukuArray) {
    const bookList = document.getElementById('bookList');
    
    // Jika tidak ada buku
    if (bukuArray.length === 0) {
        bookList.innerHTML = '<div class="empty-message">📚 Tidak ada buku ditemukan</div>';
        return;
    }
    
    // Buat HTML untuk setiap buku
    let htmlBuku = '';
    bukuArray.forEach(buku => {
        htmlBuku += `
            <div class="book-card">
                <div class="book-title">${buku.title}</div>
                <div class="book-info">👤 Penulis: ${buku.author}</div>
                <div class="book-info">📅 Tahun: ${buku.year}</div>
                <div class="book-info">
                    Status: <span class="status-${buku.status}">
                        ${buku.status === 'available' ? '✅ Tersedia' : '❌ Dipinjam'}
                    </span>
                </div>
            </div>
        `;
    });
    
    bookList.innerHTML = htmlBuku;
}

// 3. Fungsi pencarian buku (menggunakan HTTP GET dengan query string)
function searchBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    // Update URL dengan query string (simulasi HTTP GET)
    const url = new URL(window.location);
    if (searchTerm) {
        url.searchParams.set('search', searchTerm);
    } else {
        url.searchParams.delete('search');
    }
    window.history.replaceState({}, '', url);
    
    // Jika kosong, tampilkan semua buku
    if (!searchTerm) {
        tampilkanBuku(semuaBuku);
        return;
    }
    
    // Filter buku berdasarkan pencarian
    const hasilCari = semuaBuku.filter(buku => 
        buku.title.toLowerCase().includes(searchTerm) ||
        buku.author.toLowerCase().includes(searchTerm) ||
        buku.year.toString().includes(searchTerm)
    );
    
    tampilkanBuku(hasilCari);
    tampilkanAlert(`Ditemukan ${hasilCari.length} buku untuk "${searchTerm}"`, 'success');
}

// 4. Clear pencarian
function clearSearch() {
    document.getElementById('searchInput').value = '';
    // Hapus query string dari URL
    const url = new URL(window.location);
    url.searchParams.delete('search');
    window.history.replaceState({}, '', url);
    
    tampilkanBuku(semuaBuku);
    hideAlert();
}

// 5. Isi dropdown dengan buku yang tersedia
function isiDropdownBuku() {
    const bookSelect = document.getElementById('bookTitle');
    const bukuTersedia = semuaBuku.filter(buku => buku.status === 'available');
    
    bookSelect.innerHTML = '<option value="">-- Pilih Buku --</option>';
    
    bukuTersedia.forEach(buku => {
        bookSelect.innerHTML += `<option value="${buku.id}">${buku.title} - ${buku.author}</option>`;
    });
}

// 6. Proses peminjaman buku
function borrowBook(event) {
    event.preventDefault(); // Mencegah form reload halaman
    
    // Ambil data dari form
    const nama = document.getElementById('borrowerName').value.trim();
    const nim = document.getElementById('borrowerNIM').value.trim();
    const bookId = parseInt(document.getElementById('bookTitle').value);
    
    // Validasi input
    if (!nama || !nim || !bookId) {
        tampilkanAlert('❌ Mohon lengkapi semua data!', 'error');
        return;
    }
    
    // Validasi NIM (harus 10 digit angka)
    if (!/^\d{10}$/.test(nim)) {
        tampilkanAlert('❌ NIM harus berupa 10 digit angka!', 'error');
        return;
    }
    
    // Cari buku
    const buku = semuaBuku.find(b => b.id === bookId);
    if (!buku) {
        tampilkanAlert('❌ Buku tidak ditemukan!', 'error');
        return;
    }
    
    // Cek apakah buku masih tersedia
    if (buku.status === 'borrowed') {
        tampilkanAlert('❌ Buku sudah dipinjam!', 'error');
        return;
    }
    
    // Cek apakah user sudah meminjam buku ini
    const sudahPinjam = daftarPinjaman.some(p => p.nim === nim && p.bookId === bookId);
    if (sudahPinjam) {
        tampilkanAlert('❌ Anda sudah meminjam buku ini!', 'error');
        return;
    }
    
    // Buat record peminjaman
    const dataPinjaman = {
        id: Date.now(), // ID unik menggunakan timestamp
        nama: nama,
        nim: nim,
        bookId: bookId,
        judulBuku: buku.title,
        tanggalPinjam: new Date().toLocaleDateString('id-ID'),
        waktuPinjam: new Date().toLocaleTimeString('id-ID')
    };
    
    // Tambahkan ke array pinjaman
    daftarPinjaman.push(dataPinjaman);
    
    // Update status buku
    buku.status = 'borrowed';
    
    // Simpan ke localStorage
    saveDataPinjaman();
    
    // Update tampilan
    tampilkanBuku(semuaBuku);
    isiDropdownBuku();
    tampilkanPinjaman();
    
    // Reset form
    document.getElementById('borrowForm').reset();
    
    tampilkanAlert(`✅ Buku "${buku.title}" berhasil dipinjam atas nama ${nama}!`, 'success');
}

// 7. Tampilkan daftar pinjaman
function tampilkanPinjaman() {
    const borrowedList = document.getElementById('borrowedList');
    
    if (daftarPinjaman.length === 0) {
        borrowedList.innerHTML = '<div class="empty-message">📋 Belum ada peminjaman</div>';
        return;
    }
    
    let htmlPinjaman = '';
    daftarPinjaman.forEach(pinjaman => {
        htmlPinjaman += `
            <div class="borrow-item">
                <div class="borrow-info">
                    <h4>📚 ${pinjaman.judulBuku}</h4>
                    <p><strong>👤 Nama:</strong> ${pinjaman.nama}</p>
                    <p><strong>🎓 NIM:</strong> ${pinjaman.nim}</p>
                    <p><strong>📅 Tanggal:</strong> ${pinjaman.tanggalPinjam} ${pinjaman.waktuPinjam}</p>
                </div>
                <button class="return-btn" onclick="kembalikanBuku(${pinjaman.id})">
                    🔄 Kembalikan
                </button>
            </div>
        `;
    });
    
    borrowedList.innerHTML = htmlPinjaman;
}

// 8. Kembalikan buku (bonus feature)
function kembalikanBuku(pinjamanId) {
    if (!confirm('❓ Apakah Anda yakin ingin mengembalikan buku ini?')) {
        return;
    }
    
    // Cari data pinjaman
    const indexPinjaman = daftarPinjaman.findIndex(p => p.id === pinjamanId);
    if (indexPinjaman === -1) {
        tampilkanAlert('❌ Data peminjaman tidak ditemukan!', 'error');
        return;
    }
    
    const pinjaman = daftarPinjaman[indexPinjaman];
    
    // Update status buku kembali ke available
    const buku = semuaBuku.find(b => b.id === pinjaman.bookId);
    if (buku) {
        buku.status = 'available';
    }
    
    // Hapus dari array pinjaman
    daftarPinjaman.splice(indexPinjaman, 1);
    
    // Simpan ke localStorage
    saveDataPinjaman();
    
    // Update tampilan
    tampilkanBuku(semuaBuku);
    isiDropdownBuku();
    tampilkanPinjaman();
    
    tampilkanAlert(`✅ Buku "${pinjaman.judulBuku}" berhasil dikembalikan!`, 'success');
}

// ===== FUNGSI LOCALSTORAGE =====

// Simpan data ke localStorage
function saveDataPinjaman() {
    localStorage.setItem('daftarPinjaman', JSON.stringify(daftarPinjaman));
    localStorage.setItem('statusBuku', JSON.stringify(semuaBuku));
}

// Muat data dari localStorage
function loadDataPinjaman() {
    // Muat data pinjaman
    const savedPinjaman = localStorage.getItem('daftarPinjaman');
    if (savedPinjaman) {
        daftarPinjaman = JSON.parse(savedPinjaman);
    }
    
    // Muat status buku
    const savedBuku = localStorage.getItem('statusBuku');
    if (savedBuku) {
        const statusBuku = JSON.parse(savedBuku);
        // Update status buku berdasarkan data yang tersimpan
        semuaBuku.forEach(buku => {
            const savedBook = statusBuku.find(sb => sb.id === buku.id);
            if (savedBook) {
                buku.status = savedBook.status;
            }
        });
    }
}

// ===== FUNGSI HELPER =====

// Tampilkan pesan alert
function tampilkanAlert(message, type) {
    hideAlert(); // Hapus alert sebelumnya
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.id = 'alertMessage';
    alert.innerHTML = `
        <span>${message}</span>
        <button onclick="hideAlert()" style="float: right; background: none; border: none; font-size: 18px; cursor: pointer;">×</button>
    `;
    
    // Masukkan setelah header
    const header = document.querySelector('header');
    header.insertAdjacentElement('afterend', alert);
    
    // Auto hide setelah 5 detik
    setTimeout(hideAlert, 5000);
}

// Sembunyikan alert
function hideAlert() {
    const alert = document.getElementById('alertMessage');
    if (alert) {
        alert.remove();
    }
}

// ===== EVENT LISTENERS =====

// Jalankan saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    
    // Load pencarian dari URL jika ada
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    if (searchTerm) {
        document.getElementById('searchInput').value = searchTerm;
        searchBooks();
    }
});

// Handle browser back/forward
window.addEventListener('popstate', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    if (searchTerm) {
        document.getElementById('searchInput').value = searchTerm;
        searchBooks();
    } else {
        clearSearch();
    }
});

// Auto-save setiap 30 detik (keamanan ekstra)
setInterval(function() {
    if (daftarPinjaman.length > 0) {
        saveDataPinjaman();
        console.log("💾 Data otomatis tersimpan");
    }
}, 30000);