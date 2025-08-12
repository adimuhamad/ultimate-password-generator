# Ultimate Password Generator 🔐🛡️

Aplikasi web ini adalah alat canggih untuk menghasilkan kata sandi yang kuat dan aman. Dibuat dengan HTML, CSS, dan JavaScript murni, generator ini tidak hanya mudah digunakan tetapi juga penuh dengan fitur-fitur yang bisa disesuaikan sesuai kebutuhanmu. Kamu bisa menghasilkan satu atau banyak kata sandi sekaligus dengan berbagai kriteria, memastikan keamanan digitalmu selalu terjaga. 🚀

## ✨ Fitur Unggulan

-   **Kontrol Penuh:** Atur panjang (minimal 8, maksimal 32) dan jumlah (minimal 1, maksimal 8) kata sandi yang ingin kamu hasilkan dengan mudah menggunakan tombol `+` dan `-`.
-   **Kustomisasi Karakter:** Pilih kombinasi karakter yang kamu suka, seperti **angka, huruf kecil, huruf besar, simbol**, dan bahkan karakter yang dipersonalisasi seperti `áíúéó`.
-   **Opsi Keamanan Ekstra:** Tingkatkan kekuatan kata sandi dengan opsi untuk:
    -   ❌ **Kecualikan Karakter Mirip:** Hindari karakter yang sering disalahartikan, seperti `1`, `I`, `l`, `L`, `o`, `O`, dan `0`.
    -   ❌ **Kecualikan Karakter Ambigu:** Hapus simbol yang bisa membingungkan, seperti `~`, `,`, `.`, `:`, `;`, `^`, `/`, `|`, `\`, `(`, `)`, `<`.
    -   ❌ **Kecualikan Duplikat:** Pastikan setiap karakter dalam kata sandi itu unik.
    -   ❌ **Kecualikan Karakter Berturut-turut:** Cegah penggunaan karakter yang sama secara berurutan.
-   **Teks Awal Kustom:** Tambahkan teks atau awalan khusus pada setiap kata sandi yang dihasilkan, cocok untuk membuat kata sandi dengan pola tertentu.
-   **Ukur Kekuatan Kata Sandi:** Setiap kata sandi yang dihasilkan dilengkapi dengan indikator kekuatan yang jelas, lengkap dengan skor (`zxcvbn`) dan perkiraan waktu untuk meretasnya. Ini membantumu memilih kata sandi yang benar-benar kuat.
-   **Mode Gelap & Terang:** Ganti tema tampilan dengan satu klik. 🌙✨
-   **Salin Mudah:** Salin satu kata sandi atau semua kata sandi yang dihasilkan hanya dengan satu tombol.
-   **Pengaturan Otomatis Tersimpan:** Pengaturan terakhirmu (panjang, jumlah, opsi karakter) akan disimpan secara otomatis di *local storage* browser, jadi kamu tidak perlu mengaturnya lagi setiap kali membuka halaman.

## 🛠️ Teknologi yang Digunakan

-   **HTML5:** Struktur dasar halaman web.
-   **CSS3:** Desain tampilan yang modern, responsif, dan dukungan untuk mode gelap.
-   **JavaScript (ES6+):** Logika utama untuk menghasilkan kata sandi yang acak dan aman.
-   **`zxcvbn.js`:** Library pihak ketiga yang digunakan untuk mengukur dan memberikan umpan balik tentang kekuatan kata sandi.
-   **`window.crypto.getRandomValues()`:** Menggunakan API kriptografi bawaan browser untuk menghasilkan angka acak yang lebih aman daripada `Math.random()`.

## 💻 Cara Menggunakan

1.  Buka file `index.html` di browser favoritmu.
2.  Sesuaikan panjang, jumlah, dan opsi karakter sesuai keinginan.
3.  Klik tombol **"GENERATE PASSWORD NOW!"** untuk melihat hasilnya.
4.  Gunakan tombol salin di samping setiap kata sandi atau tombol **"Copy All Passwords"** di bawah untuk menyalin semua kata sandi sekaligus.

## 📸 Screenshot
<img width="412" height="622" alt="image" src="https://github.com/user-attachments/assets/9a950c33-7533-412f-a7ac-d9a81c46d7c3" />
