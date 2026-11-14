# Es Teler DU21 — Konsep Redesign (Nauval Dev)

Konsep redesign untuk du21group.com, dibuat sebagai bahan penawaran. **Bukan situs resmi.**
Halaman diberi `noindex` dan banner "Konsep redesign oleh Nauval Dev".

HTML/CSS/JS biasa, tanpa build tool. Buka `index.html` langsung di browser.

## Fitur
- Menu 10 item dengan foto dan harga resmi, bisa disaring (klasik, durian, buah, untuk rame-rame)
- Pencari 23 outlet: cari nama atau kota, filter wilayah, peta (Leaflet + peta jalan Esri, tanpa API key)
- "Pakai lokasiku": outlet diurutkan dari yang terdekat, lengkap dengan jarak
- Tiap outlet: petunjuk arah Google Maps, GoFood dan ShopeeFood (kalau ada), atau tanya admin
- Liputan media, sertifikasi halal, peringatan "hanya di outlet resmi", FAQ, lowongan

## Sumber data
Menu, harga, outlet, koordinat, dan kontak diambil dari du21group.com dan gambar menu resmi DU21 (Nov 2026).
Foto produk dipotong dari gambar menu resmi mereka.

## Temuan di website lama (bahan pitch)
- Halaman menu hanya berupa satu gambar poster, jadi tidak bisa dicari dan tidak terbaca mesin pencari.
- Daftar outlet tidak bisa dicari atau diurutkan berdasarkan jarak.
- Beberapa outlet memakai link GoFood/ShopeeFood milik outlet lain, kemungkinan salah salin:
  Tasikmalaya dan Majalengka → toko Baleendah; Pajajaran, Leles, Cirebon, Ciwidey → toko Kencana;
  Cimareme dan Padalarang → toko Permata Biru; Kiaracondong, Cicalengka, Bojongsoang → toko Cimahi.
  Di konsep ini link ganda tersebut diganti tombol "Tanya pesan online" ke WA admin.
- Outlet Soreang tidak punya peta maupun link pesan online.

## Sebelum dipakai sungguhan
Minta DU21 mengonfirmasi link GoFood/ShopeeFood yang benar per outlet.
