# Buku Saku — Pencatat Keuangan Harian

Website pencatat keuangan pribadi, dibuat berdasarkan struktur spreadsheet
**Money Manager** (Transaction History, Balance, Pivot, Graph). 100% statis
(HTML/CSS/JS biasa) sehingga bisa langsung dijalankan di **GitHub Pages** —
tidak perlu server atau database eksternal.

## Cara kerja data

- Semua data (akun, kategori, transaksi, pengaturan) disimpan sebagai **JSON**
  di `localStorage` browser kamu. Tidak ada data yang dikirim ke server mana pun.
- Saat pertama kali dibuka di sebuah browser, aplikasi memuat data awal dari
  `js/seed-data.js` (hasil konversi dari `Money_Manager.xlsx`, 527 transaksi).
- **Ekspor** (tab Pengaturan) menyimpan seluruh data sebagai file `.json` yang
  bisa kamu simpan sebagai cadangan atau pindahkan ke perangkat/browser lain.
- **Impor** membaca file `.json` tersebut dan menggantikan data yang sedang
  aktif. Berguna untuk sinkronisasi manual antar perangkat: ekspor dari HP,
  impor di laptop, dst.
- Semua pengeditan (tambah/ubah/hapus transaksi, akun, kategori) dilakukan
  langsung lewat website ini — tidak perlu buka spreadsheet lagi.

## Struktur JSON (untuk ekspor/impor)

```json
{
  "accounts": [ { "name": "BNI", "base": 2359114 }, ... ],
  "categories": [
    { "name": "Food & Beverages", "subcategories": ["🍽️Main Meal", "🥛Drink", ...] },
    ...
  ],
  "transactions": [
    {
      "id": 1,
      "date": "2026-03-02",
      "account": "BNI",
      "category": "Food & Beverages",
      "subcategory": "🍽️Main Meal",
      "note": "Nasi Ayam - TO",
      "expense": 13000,
      "income": 0,
      "transferTo": null
    },
    ...
  ],
  "settings": { "dailyBudgetLimit": 50000 }
}
```

- `base` pada akun = saldo awal **sebelum** transaksi pertama.
- Transfer antar akun disimpan sebagai satu baris `expense` di akun asal,
  dengan `transferTo` diisi nama akun tujuan (persis seperti kolom
  "Transfer to" di spreadsheet asli).
- Saldo per akun, saldo total, ringkasan bulanan, dan pivot **selalu dihitung
  ulang dari transaksi** (tidak disimpan sebagai angka statis), jadi kamu
  bebas mengedit transaksi lama tanpa merusak konsistensi data.

## Menjalankan di GitHub Pages

1. Buat repository baru di GitHub, misal `buku-saku`.
2. Upload isi folder ini (`index.html`, `css/`, `js/`) ke repo tersebut
   (lewat GitHub Desktop, `git push`, atau upload manual di web GitHub).
3. Buka **Settings → Pages** di repo tersebut.
4. Pada **Source**, pilih branch `main` dan folder `/root`, lalu **Save**.
5. Tunggu 1-2 menit, GitHub akan memberi URL seperti
   `https://<username>.github.io/buku-saku/`.

## Menjalankan di komputer sendiri (opsional, untuk coba-coba dulu)

Karena tidak ada proses build, cukup buka `index.html` langsung di browser,
atau jalankan server statis sederhana lalu buka `http://localhost:8000`:

```bash
python3 -m http.server 8000
```

## Fitur

- **Transaksi** — daftar semua transaksi (cari, filter akun/kategori/bulan),
  tambah/edit/hapus lewat form modal, tiga jenis transaksi: Pengeluaran,
  Pemasukan, Transfer antar akun.
- **Saldo** — kartu saldo tiap akun saat ini, plus tabel ringkasan bulanan
  per akun (setara sheet "Balance": Pemasukan, Pengeluaran, Arus Kas Bersih,
  Saldo Akhir Bulan).
- **Rincian** — pivot pengeluaran per kategori/subkategori atau per akun,
  bisa difilter per bulan, dengan bar perbandingan.
- **Grafik** — pemasukan vs pengeluaran per bulan, komposisi pengeluaran per
  kategori, dan tren saldo total dari waktu ke waktu.
- **Pengaturan** — ekspor/impor JSON, atur batas anggaran harian (dipakai
  untuk menghitung variansi anggaran di tab Transaksi), kelola akun dan
  kategori/subkategori, reset ke data awal.

## Catatan teknis

- Chart dibuat dengan [Chart.js](https://www.chartjs.org/) via CDN
  (cdnjs.cloudflare.com) — butuh koneksi internet saat memuat halaman.
- Font: IBM Plex Serif/Sans/Mono via Google Fonts.
- Tidak ada dependency build (Webpack/Vite/dll) — murni HTML/CSS/JS supaya
  gampang di-hosting di GitHub Pages tanpa langkah tambahan.
