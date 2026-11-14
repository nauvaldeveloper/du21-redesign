/**
 * DATA — Es Teler DU21 (konsep redesign oleh Nauval Dev, bukan situs resmi).
 * Menu, harga, outlet, dan kontak diambil dari du21group.com & menu resmi DU21 (Nov 2026).
 */
window.DU21 = {
  name: 'Es Teler DU21',
  tagline: 'Pelopor es teler premium di Kabupaten Bandung, sejak 2021.',
  WA_NUMBER: '6287788848744',
  WA_DISPLAY: '0877-8884-8744',
  EMAIL: 'admin@du21group.com',
  IG: 'https://www.instagram.com/du21group/',
  IG_MENU: 'https://www.instagram.com/estelerdu21_/',
  TIKTOK: 'https://www.tiktok.com/@dapurumi21',
  DEMO: true,                                   // konsep: pesan WA hanya ditampilkan, tidak dikirim
  DEV_CONTACT_URL: 'https://nauvaldev.my.id/',

  // tags: klasik | durian | buah | porsi
  MENU: [
    { id: 'original', name: 'Es Teler Original', price: 15000, tags: ['klasik'], note: 'Resep pertama yang bikin DU21 dikenal.', first: true },
    { id: 'small', name: 'Es Teler Small', price: 10000, tags: ['klasik'], note: 'Rasa original dalam ukuran lebih kecil.' },
    { id: 'kelapa-alpukat-nangka', name: 'Kelapa Alpukat Nangka', price: 20000, tags: ['klasik', 'buah'], note: 'Kelapa muda, alpukat, dan nangka.' },
    { id: 'sanako', name: 'Sanako', price: 18000, tags: ['buah'], note: 'Varian khas DU21.' },
    { id: 'strawberry-lychee', name: 'Strawberry Lychee Ice', price: 18000, tags: ['buah'], note: 'Rasa stroberi dan leci.' },
    { id: 'durian', name: 'Es Teler Durian', price: 18000, tags: ['durian'], note: 'Es teler dengan durian.' },
    { id: 'durian-cendol-nangka', name: 'Durian Cendol Nangka', price: 18000, tags: ['durian'], note: 'Durian, cendol, dan nangka.' },
    { id: 'durian-kelapa-alpukat-nangka', name: 'Durian Kelapa Alpukat Nangka', price: 27000, tags: ['durian', 'buah'], note: 'Durian, kelapa muda, alpukat, dan nangka.' },
    { id: 'cocolava', name: 'Cocolava', price: 25000, tags: ['buah'], note: 'Disajikan di batok kelapa.' },
    { id: 'ember', name: 'Es Teler Ember', price: 150000, tags: ['porsi'], note: 'Satu ember untuk rame-rame: arisan, kantor, acara keluarga.' },
  ],

  AREAS: [
    { id: 'Kab', label: 'Kab. Bandung' },
    { id: 'Kota', label: 'Kota Bandung' },
    { id: 'Barat', label: 'Cimahi & Bandung Barat' },
    { id: 'Luar', label: 'Luar Bandung' },
  ],

  OUTLETS: [
    {"name": "Baleendah", "area": "Kab", "addr": "Jl. Dayeuh Kolot Ciparay No.4, Baleendah, Kec. Baleendah, Kab Bandung, Jawa Barat 40375", "lat": -7.008368, "lng": 107.62619, "gofood": "https://gofood.link/a/yM9eZ51", "shopee": "https://shopee.co.id/universal-link/now-food/shop/20362866"},
    {"name": "Banjaran", "area": "Kab", "addr": "Jl. Raya Pangalengan, Kamasan, Kec. Banjaran, Kabupaten Bandung, Jawa Barat 40377", "lat": -7.050954, "lng": 107.576291, "gofood": "https://gofood.link/a/DM5af9h", "shopee": "https://shopee.co.id/universal-link/now-food/shop/21011653"},
    {"name": "Majalaya", "area": "Kab", "addr": "Jl. Pamagersari, Majalaya, Kec. Majalaya, Kabupaten Bandung, Jawa Barat", "lat": -7.050805, "lng": 107.760066, "gofood": "https://gofood.link/a/FWYE8X7", "shopee": "https://shopee.co.id/universal-link/now-food/shop/21081741"},
    {"name": "Ujungberung", "area": "Kota", "addr": "Jl. AH. Nasution No.94, Pakemitan, Kec. Cinambo, Kota Bandung, Jawa Barat 45474", "lat": -6.91419, "lng": 107.698398, "gofood": "https://gofood.link/a/H2gRVxj", "shopee": "https://shopee.co.id/universal-link/now-food/shop/21158777"},
    {"name": "Cijerah", "area": "Barat", "addr": "Jl. Melong Raya No.40, Melong, Kec. Cimahi Sel., Kota Cimahi, Jawa Barat 40534", "lat": -6.920054, "lng": 107.562833, "gofood": "https://gofood.link/a/GY5WT5Y", "shopee": "https://shopee.co.id/universal-link/now-food/shop/21158779"},
    {"name": "Soreang", "area": "Kab", "addr": "Jl. Raya Soreang – Banjaran, Soreang, Kec. Soreang, Kabupaten Bandung, Jawa Barat 40911", "lat": null, "lng": null, "gofood": null, "shopee": null},
    {"name": "Garut", "area": "Luar", "addr": "Jl. Pembangunan, Jayawaras, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat 44151", "lat": -7.210172, "lng": 107.888478, "gofood": null, "shopee": "https://shopee.co.id/universal-link/now-food/shop/21718559"},
    {"name": "Kopo", "area": "Kab", "addr": "Jl Sukamenak, Kabupaten Bandung, Jawa Barat", "lat": -6.971793, "lng": 107.579378, "gofood": "https://gofood.link/a/GshEecE", "shopee": "https://shopee.co.id/universal-link/now-food/shop/21703239"},
    {"name": "Cimahi", "area": "Barat", "addr": "Jl. Daeng Moh. Ardiwinata No.34, Cibabat, Kec. Cimahi Utara, Kota Cimahi, Jawa Barat 40513", "lat": -6.876265, "lng": 107.550413, "gofood": null, "shopee": "https://shopee.co.id/universal-link/now-food/shop/21719679"},
    {"name": "Kiaracondong", "area": "Kota", "addr": "Jl. Garu Raya, RT.07/RW.10, Babakan Sari, Kec. Kiaracondong, Kota Bandung, Jawa Barat 40283", "lat": -6.922225, "lng": 107.650096, "gofood": null, "shopee": null},
    {"name": "Sayang Jatinangor", "area": "Luar", "addr": "Jl. Kolonel Ahmad Syam No.271, Sayang, Kec. Jatinangor, Kabupaten Sumedang, Jawa Barat 45363", "lat": -6.951732, "lng": 107.771826, "gofood": null, "shopee": "https://shopee.co.id/universal-link/now-food/shop/21777508"},
    {"name": "Kencana", "area": "Kab", "addr": "Jl. Teratai Raya, Rancaekek Wetan, Kec. Rancaekek, Kabupaten Bandung, Jawa Barat 40394", "lat": -6.968082, "lng": 107.7567, "gofood": null, "shopee": "https://shopee.co.id/universal-link/now-food/shop/21777486"},
    {"name": "Permata Biru", "area": "Kab", "addr": "Jl. Permata Biru No.6, Cinunuk, Kec. Cileunyi, Kab. Bandung, Jawa Barat 40624", "lat": -6.938779, "lng": 107.73187, "gofood": null, "shopee": "https://shopee.co.id/universal-link/now-food/shop/21694362"},
    {"name": "Cicalengka", "area": "Kab", "addr": "Jl. H. Darham No. 15 Cikopo, Tenjolaya, Kec. Cicalengka, Kab Bandung, Jawa Barat 40359", "lat": -6.986507, "lng": 107.839206, "gofood": null, "shopee": null},
    {"name": "Pajajaran", "area": "Kota", "addr": "Jl. Semar Kios No.3, Arjuna, Kec. Cicendo, Kota Bandung, Jawa Barat 40172", "lat": -6.909514, "lng": 107.594022, "gofood": null, "shopee": null},
    {"name": "Bojongsoang", "area": "Kab", "addr": "Ruko GBA, Jl. Terusan Bojongsoang No. 1J, Bojosoang, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat", "lat": -6.985222, "lng": 107.632957, "gofood": null, "shopee": null},
    {"name": "Cimareme", "area": "Barat", "addr": "Jl. Batujajar No.11, Cimareme (Dekat Terminal Cimareme) Kab. Bandung Barat", "lat": -6.863634, "lng": 107.50276, "gofood": null, "shopee": null},
    {"name": "Tasikmalaya", "area": "Luar", "addr": "Jl. Mitra Batik No.06, Cipedes, Kec. Cipedes, Kab. Tasikmalaya, Jawa Barat 46133", "lat": -7.31591, "lng": 108.215383, "gofood": null, "shopee": null},
    {"name": "Leles", "area": "Luar", "addr": "Haruman, Kabupaten Garut, Jawa Barat", "lat": -7.115372, "lng": 107.894141, "gofood": null, "shopee": null},
    {"name": "Padalarang", "area": "Barat", "addr": "Jl. Letkol G. A. Manulang, Padalarang, Kab. Bandung Barat", "lat": -6.844071, "lng": 107.480086, "gofood": null, "shopee": null},
    {"name": "Majalengka", "area": "Luar", "addr": "Jl. Raya K H Abdul Halim No.185, Majalengka Kulon, Kec. Majalengka, Kabupaten Majalengka, Jawa Barat 45418 (samping Alfamart)", "lat": -6.834134, "lng": 108.222786, "gofood": null, "shopee": null},
    {"name": "Cirebon", "area": "Luar", "addr": "Jl Gunung Merbabu Asih, Larangan, Kota Cirebon, Jawa Barat", "lat": -6.752528, "lng": 108.559803, "gofood": null, "shopee": null},
    {"name": "Ciwidey", "area": "Kab", "addr": "Margamulya, Kec. Pasirjambu, Kabupaten Bandung, Jawa Barat", "lat": -7.104104, "lng": 107.467047, "gofood": null, "shopee": null}
  ],

  // Video diputar langsung dari server du21group.com (file asli mereka)
  GALLERY: [
    { kind: 'tv', type: 'video', shape: 'wide', title: 'Si Unyil', sub: 'Liputan televisi', poster: 'si-unyil', src: 'https://du21group.com/wp-content/uploads/2024/09/1-1.mp4' },
    { kind: 'tv', type: 'video', shape: 'wide', title: 'Disbudpar Kab. Bandung', sub: 'Bersama Utari, owner Es Teler 21', poster: 'disbudpar', src: 'https://du21group.com/wp-content/uploads/2024/10/Disbudpar.mp4' },
    { kind: 'tv', type: 'video', shape: 'wide', title: 'Makan Receh', sub: 'Liputan televisi', poster: 'makan-receh', src: 'https://du21group.com/wp-content/uploads/2024/09/3.mp4' },
    { kind: 'tv', type: 'photo', shape: 'wide', title: 'Trans 7', sub: 'Kru liputan bersama tim DU21', poster: 'trans7' },
    { kind: 'pf', type: 'photo', shape: 'wide', title: 'Syahrul Gunawan', sub: 'Mencicipi Es Teler DU21', poster: 'syahrul-gunawan' },
    { kind: 'pf', type: 'video', shape: 'tall', title: 'Si Tukang Dahar', sub: 'Bagi-bagi es teler satu ember', poster: 'si-tukang-dahar', src: 'https://du21group.com/wp-content/uploads/2024/09/7.mp4' },
    { kind: 'pf', type: 'video', shape: 'tall', title: 'Konten kreator', sub: 'Review di outlet DU21', poster: 'kreator-1', src: 'https://du21group.com/wp-content/uploads/2024/10/VID-20241002-WA0022.mp4' },
    { kind: 'pf', type: 'video', shape: 'tall', title: 'Konten kreator', sub: 'Es teler se-ember, outlet Cijerah', poster: 'kreator-2', src: 'https://du21group.com/wp-content/uploads/2024/10/VID-20241002-WA0019.mp4' },
    { kind: 'pf', type: 'video', shape: 'tall', title: 'Pengunjung', sub: 'Nongkrong bareng di outlet', poster: 'pengunjung', src: 'https://du21group.com/wp-content/uploads/2024/10/VID-20241002-WA0012.mp4' },
  ],

  PRESS: ['Si Unyil', 'Trans 7', 'Makan Receh', 'Disbudpar'],

  FAQ: [
    ['Apakah Es Teler DU21 halal?', 'Ya. Es Teler DU21 sudah bersertifikat halal.'],
    ['Apakah DU21 punya merek lain?', 'Tidak. DU21 tidak punya second brand dengan nama apa pun. Nikmati rasa aslinya hanya di outlet yang terdaftar di website dan media sosial resmi kami.'],
    ['Apakah harga di aplikasi sama dengan di outlet?', 'Harga di GoFood dan ShopeeFood bisa sedikit berbeda karena biaya layanan aplikasi.'],
  ],
};
