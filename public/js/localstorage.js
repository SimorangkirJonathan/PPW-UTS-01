document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("borrowForm");
    const loanList = document.getElementById("loanList");
    const clearBtn = document.getElementById("clearLoans");

    // Get CSRF token
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    // Handle return button clicks
    document.querySelectorAll('.return-btn').forEach(btn => {
        btn.addEventListener('click', async function () {
            const loanId = this.getAttribute('data-id');
            await returnBook(loanId);
        });
    });

    async function returnBook(loanId) {
        try {
            const response = await fetch(`/api/loans/${loanId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            });

            const result = await response.json();
            if (result.success) {
                // Refresh page to show updated loan list
                window.location.reload();
            } else {
                alert(result.error || 'Gagal mengembalikan buku');
            }
        } catch (error) {
        }
    }

    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();
            const nama = document.getElementById("nama").value.trim();
            const nim = document.getElementById("nim").value.trim();
            const judul = document.getElementById("judul").value.trim();
            
            if (!nama || !nim || !judul) {
                alert("Lengkapi semua informasi.");
                return;
            }

            try {
                const response = await fetch('/api/loans', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    body: JSON.stringify({ nama, nim, judul })
                });

                const result = await response.json();
                if (result.success) {
                    // Refresh page to show updated loan list
                    window.location.reload();
                } else {
                    alert(result.error || 'Gagal meminjam buku');
                }
            } catch (error) {
                console.error('Error borrowing book:', error);
                alert('Terjadi kesalahan saat meminjam buku');
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", async function () {
            if (!confirm("Hapus semua data peminjaman?")) return;
            
            try {
                const response = await fetch('/api/loans', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    }
                });

                const result = await response.json();
                if (result.success) {
                    // Refresh page to show updated loan list
                    window.location.reload();
                } else {
                    alert(result.error || 'Gagal menghapus semua peminjaman');
                }
            } catch (error) {
                console.error('Error clearing loans:', error);
                alert('Terjadi kesalahan saat menghapus peminjaman');
            }
        });
    }
});
