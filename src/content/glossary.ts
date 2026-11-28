import type { GlossaryTerm } from './schema';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // A1 Kota Web
  {
    id: 'frontend',
    term: 'Frontend (FE)',
    pronunciation: 'fron-end',
    shortDef: {
      junior: 'Frontend adalah bagian web yang kamu lihat dan ketuk. Seperti ruang makan di restoran.',
      pro: 'Bagian aplikasi yang dilihat dan diketuk pemakai. Ia berjalan di browser, bukan di server.',
    },
    stickerId: 'restoran',
    introducedIn: 'a01-l01',
  },
  {
    id: 'backend',
    term: 'Backend (BE)',
    pronunciation: 'bek-end',
    shortDef: {
      junior: 'Backend adalah bagian di balik layar. Ia menyimpan dan memasak data, seperti dapur restoran.',
      pro: 'Bagian aplikasi di sisi server yang tidak terlihat orang. Ia menyimpan data, memeriksa siapa yang masuk, dan menjalankan aturan, misalnya hitungan harga.',
    },
    stickerId: 'restoran',
    introducedIn: 'a01-l01',
  },
  {
    id: 'ui',
    term: 'UI (User Interface)',
    pronunciation: 'yu-ai',
    shortDef: {
      junior: 'UI adalah tampilan yang dilihat mata. Isinya warna, huruf, gambar, dan tombol. Seperti sampul buku yang berwarna-warni.',
      pro: 'Tampilan yang dilihat pemakai: huruf, warna, ikon, jarak, dan tombol. Istilah teknisnya UI (User Interface).',
    },
    stickerId: 'botol-saus',
    introducedIn: 'a01-l02',
  },
  {
    id: 'ux',
    term: 'UX (User Experience)',
    pronunciation: 'yu-eks',
    shortDef: {
      junior: 'UX adalah perasaanmu saat memakai aplikasi. Apakah mudah, atau membingungkan? Seperti bermain permainan yang aturannya jelas.',
      pro: 'Kesan dan kemudahan yang dirasakan orang saat memakai sebuah produk. Istilah teknisnya UX (User Experience).',
    },
    stickerId: 'botol-saus',
    introducedIn: 'a01-l02',
  },
  {
    id: 'wireframe',
    term: 'Wireframe',
    pronunciation: 'way-er-frem',
    shortDef: {
      junior: 'Wireframe adalah sketsa kasar tata letak halaman. Seperti denah rumah sebelum dibangun.',
      pro: 'Sketsa kasar letak tombol, gambar, dan teks sebelum diberi warna. Fungsinya menguji susunan halaman lebih dulu.',
    },
    stickerId: 'denah-rumah',
    introducedIn: 'a01-l03',
  },
  {
    id: 'browser',
    term: 'Browser',
    pronunciation: 'brau-zer',
    shortDef: {
      junior: 'Browser adalah aplikasi untuk membuka halaman web. Ia seperti ojek yang mengambilkan halaman untukmu.',
      pro: 'Aplikasi yang meminta halaman dari server, lalu menampilkannya di layarmu.',
    },
    stickerId: 'ojek-paket',
    introducedIn: 'a01-l04',
  },
  {
    id: 'server',
    term: 'Server',
    pronunciation: 'sêr-ver',
    shortDef: {
      junior: 'Server adalah komputer yang menyimpan halaman web. Ia seperti toko tempat ojek mengambil pesananmu.',
      pro: 'Komputer yang menyimpan halaman atau data, lalu menjawab permintaan yang masuk. Jawabannya dikirim sebagai response.',
    },
    stickerId: 'ojek-paket',
    introducedIn: 'a01-l04',
  },
  {
    id: 'dns',
    term: 'DNS',
    pronunciation: 'de-en-es',
    shortDef: {
      junior: 'DNS adalah buku kontak internet. Ia mengubah nama situs menjadi nomor alamat. Seperti mencari nomor telepon teman di buku kontak.',
      pro: 'Sistem yang mengubah nama domain menjadi alamat angka server (alamat IP). Namanya DNS (Domain Name System).',
    },
    stickerId: 'kontak-telepon',
    introducedIn: 'a01-l04',
  },
  {
    id: 'request',
    term: 'Request',
    pronunciation: 'ri-kwest',
    shortDef: {
      junior: 'Request adalah pesan permintaan yang kamu kirim. Seperti pesanan yang kamu titipkan ke ojek.',
      pro: 'Pesan permintaan dari aplikasi pemakai (client) ke server. Isinya jenis permintaan dan alamat tujuan.',
    },
    stickerId: 'ojek-paket',
    introducedIn: 'a01-l04',
  },
  {
    id: 'response',
    term: 'Response',
    pronunciation: 'ri-spons',
    shortDef: {
      junior: 'Response adalah jawaban yang dikirim balik. Seperti paket yang dibawa pulang oleh ojek.',
      pro: 'Jawaban server atas sebuah request. Isinya kode status, keterangan tambahan, dan data yang diminta.',
    },
    stickerId: 'ojek-paket',
    introducedIn: 'a01-l04',
  },
  {
    id: 'url',
    term: 'URL',
    pronunciation: 'yu-ar-el',
    shortDef: {
      junior: 'URL adalah alamat lengkap sebuah halaman di internet. Seperti alamat rumah temanmu, lengkap dengan nama jalan.',
      pro: 'Alamat lengkap sebuah halaman atau data di internet. Isinya aturan kirim (https), nama domain, dan jalur ke halaman. Istilah teknisnya URL (Uniform Resource Locator).',
    },
    stickerId: 'alamat-rumah',
    introducedIn: 'a01-l05',
  },
  {
    id: 'domain',
    term: 'Domain',
    pronunciation: 'do-mein',
    shortDef: {
      junior: 'Domain adalah nama situs yang mudah diingat. Contohnya toko-rani.example, nama situs Toko Rani.',
      pro: 'Nama unik yang menunjuk ke server sebuah situs, misalnya toko-rani.example.',
    },
    stickerId: 'alamat-rumah',
    introducedIn: 'a01-l05',
  },
  {
    id: 'https',
    term: 'HTTPS',
    pronunciation: 'ha-te-te-pe-es',
    shortDef: {
      junior: 'HTTPS membuat pesan di internet terkunci, jadi tidak bisa diintip. Seperti surat dalam amplop bersegel.',
      pro: 'Versi HTTP yang mengacak data selama dikirim, jadi orang lain di jaringan tidak bisa membacanya. Pengacakan ini disebut enkripsi dan dijalankan oleh TLS (Transport Layer Security).',
    },
    stickerId: 'amplop-tersegel',
    introducedIn: 'a01-l05',
  },
  {
    id: 'html',
    term: 'HTML',
    pronunciation: 'ha-te-em-el',
    shortDef: {
      junior: 'HTML adalah kerangka halaman web: judul, tulisan, gambar, dan tombol. Seperti dinding dan tiang rumah.',
      pro: 'Bahasa yang menentukan isi dan susunan halaman web: judul, paragraf, gambar, dan tombol. Namanya HTML (HyperText Markup Language).',
    },
    stickerId: 'rumah-lapis',
    introducedIn: 'a01-l06',
  },
  {
    id: 'css',
    term: 'CSS',
    pronunciation: 'se-es-es',
    shortDef: {
      junior: 'CSS mendandani halaman: warna, ukuran huruf, dan jarak. Seperti cat dan hiasan sebuah rumah.',
      pro: 'Bahasa yang mengatur tampilan halaman: warna, ukuran huruf, jarak, dan posisi. Namanya CSS (Cascading Style Sheets).',
    },
    stickerId: 'rumah-lapis',
    introducedIn: 'a01-l06',
  },
  {
    id: 'javascript',
    term: 'JavaScript',
    pronunciation: 'ja-va-skrip',
    shortDef: {
      junior: 'JavaScript membuat halaman bergerak saat kamu mengetuk. Seperti listrik yang menyalakan lampu rumah.',
      pro: 'Bahasa pemrograman yang membuat halaman bereaksi: menjawab klik, mengubah isi, dan mengambil data. Ia berjalan di browser.',
    },
    stickerId: 'rumah-lapis',
    introducedIn: 'a01-l06',
  },
  // A2 Hutan HTML
  {
    id: 'tag',
    term: 'Tag',
    pronunciation: 'teg',
    shortDef: {
      junior: 'Tag adalah label kecil yang menandai jenis isi halaman. Seperti label di kardus: buku atau mainan.',
      pro: 'Label penanda jenis isi halaman, ditulis di antara < dan >. Contohnya <p> untuk paragraf.',
    },
    stickerId: 'label-kardus',
    introducedIn: 'a02-l01',
  },
  {
    id: 'atribut',
    term: 'Attribute',
    pronunciation: 'a-tri-but',
    shortDef: {
      junior: 'Atribut adalah catatan tambahan di dalam tag. Seperti alamat tujuan yang ditulis di label kardus.',
      pro: 'Keterangan tambahan di dalam tag pembuka, ditulis sebagai nama="nilai". Contohnya href menunjuk tujuan sebuah tautan.',
    },
    stickerId: 'label-kardus',
    introducedIn: 'a02-l01',
  },
  {
    id: 'elemen',
    term: 'Element',
    pronunciation: 'e-le-men',
    shortDef: {
      junior: 'Elemen adalah satu paket utuh: tag pembuka, isi, dan tag penutup. Seperti kardus berlabel yang sudah ditutup rapat.',
      pro: 'Satu bagian halaman yang lengkap: tag pembuka, isi, dan tag penutup. Contohnya <p>Halo</p> adalah satu elemen paragraf.',
    },
    stickerId: 'label-kardus',
    introducedIn: 'a02-l01',
  },
  {
    id: 'doctype',
    term: 'DOCTYPE & Head/Body',
    pronunciation: 'dok-taip',
    shortDef: {
      junior: 'Doctype adalah tulisan pembuka halaman. Head menyimpan catatan, body menyimpan isi yang terlihat. Seperti sampul, catatan, dan isi sebuah buku.',
      pro: 'Doctype adalah baris pembuka yang menandai dokumen HTML5. Setelahnya, head memuat keterangan halaman dan body memuat isi yang tampil.',
    },
    introducedIn: 'a02-l02',
  },
  {
    id: 'semantik',
    term: 'Semantic HTML',
    pronunciation: 'se-man-tik',
    shortDef: {
      junior: 'Tag semantik memberi nama pada tiap bagian halaman. Contohnya kepala dan kaki halaman. Seperti papan nama di pintu ruang sekolah.',
      pro: 'Memakai tag yang menyebut fungsi tiap bagian halaman, bukan hanya tampilannya. Contohnya <header>, <nav>, <main>, dan <footer>. Ini membantu pembaca layar (alat yang membacakan halaman) dan mesin pencari.',
    },
    stickerId: 'pohon-berlabel',
    introducedIn: 'a02-l04',
  },
  {
    id: 'alt-text',
    term: 'Alt Text',
    pronunciation: 'alt-teks',
    shortDef: {
      junior: 'Alt text adalah tulisan yang menceritakan isi gambar. Dibacakan untuk orang yang tidak bisa melihat gambar. Seperti menjelaskan fotomu lewat telepon.',
      pro: 'Tulisan yang menggambarkan isi gambar, ditaruh di atribut alt pada <img>. Pembaca layar membacakannya, dan mesin pencari ikut memakainya.',
    },
    introducedIn: 'a02-l05',
  },
  // A3 Bengkel CSS
  {
    id: 'selector',
    term: 'Selector',
    pronunciation: 'se-lek-tor',
    shortDef: {
      junior: 'Selector adalah penunjuk bagian halaman yang mau dihias. Seperti jari yang menunjuk satu bangku di kelas.',
      pro: 'Pola yang memilih bagian halaman mana yang diberi gaya. Bisa berupa nama tag, .class, atau #id.',
    },
    stickerId: 'kuas-cat',
    introducedIn: 'a03-l01',
  },
  {
    id: 'class-css',
    term: 'Class & ID',
    pronunciation: 'klas',
    shortDef: {
      junior: 'Class menghias banyak kotak sekaligus, seperti seragam satu kelas. ID menunjuk satu kotak saja.',
      pro: 'Dua cara memilih elemen lewat atribut. Class dipakai ulang di banyak elemen. Id hanya boleh satu per halaman.',
    },
    introducedIn: 'a03-l01',
  },
  {
    id: 'box-model',
    term: 'Box Model',
    pronunciation: 'boks-mo-del',
    shortDef: {
      junior: 'Setiap kotak punya 4 lapis: isi, ruang dalam, bingkai, dan jarak luar. Seperti lukisan yang dibingkai di dinding.',
      pro: 'Cara CSS memandang setiap elemen sebagai kotak berlapis. Dari dalam ke luar: content (isi), padding, border, lalu margin.',
    },
    stickerId: 'lukisan-berbingkai',
    introducedIn: 'a03-l02',
  },
  {
    id: 'padding',
    term: 'Padding',
    pronunciation: 'pa-ding',
    shortDef: {
      junior: 'Padding adalah ruang kosong antara isi dan bingkai. Seperti jarak foto dari tepi bingkainya.',
      pro: 'Jarak di dalam elemen, antara isi dan garis tepinya (border). Padding membuat isi tidak menempel ke tepi.',
    },
    stickerId: 'lukisan-berbingkai',
    introducedIn: 'a03-l02',
  },
  {
    id: 'margin',
    term: 'Margin',
    pronunciation: 'mar-jin',
    shortDef: {
      junior: 'Margin adalah jarak di luar bingkai. Ia memisahkan satu kotak dari kotak lain. Seperti jarak antar lukisan.',
      pro: 'Jarak di luar garis tepi (border) elemen yang memisahkan elemen dari tetangganya.',
    },
    stickerId: 'lukisan-berbingkai',
    introducedIn: 'a03-l02',
  },
  {
    id: 'rem-unit',
    term: 'rem & px',
    pronunciation: 'rem',
    shortDef: {
      junior: 'Rem adalah ukuran yang ikut membesar saat huruf dibesarkan. Px adalah ukuran yang tetap. Seperti balon yang bisa ditiup dan kelereng yang tetap.',
      pro: 'Dua satuan ukuran: px (piksel) bernilai tetap, rem mengikuti ukuran huruf dasar halaman. Rem membuat teks ikut membesar saat pembaca memperbesar huruf.',
    },
    introducedIn: 'a03-l03',
  },
  {
    id: 'flexbox',
    term: 'Flexbox',
    pronunciation: 'fleks-boks',
    shortDef: {
      junior: 'Flexbox menata kotak berjajar dalam satu baris atau satu kolom. Seperti anak berbaris menuju kantin.',
      pro: 'Flexbox adalah cara CSS menata item dalam satu baris atau satu kolom: arah, urutan, dan perataannya.',
    },
    stickerId: 'rak-buku',
    introducedIn: 'a03-l04',
  },
  {
    id: 'grid-css',
    term: 'CSS Grid',
    pronunciation: 'grid',
    shortDef: {
      junior: 'Grid menata kotak dalam baris dan kolom sekaligus. Seperti sekat di kotak bekal.',
      pro: 'Cara CSS menata item dalam baris dan kolom sekaligus, seperti tabel. Grid cocok untuk susunan satu halaman utuh.',
    },
    stickerId: 'kotak-bekal',
    introducedIn: 'a03-l05',
  },
  {
    id: 'z-index',
    term: 'Position & z-index',
    pronunciation: 'zet-in-deks',
    shortDef: {
      junior: 'Position mengatur letak kotak di halaman. Z-index mengatur kotak mana yang paling depan. Seperti tumpukan kertas di meja.',
      pro: 'Position mengatur cara elemen diletakkan di halaman. Z-index mengatur elemen mana yang tampil di atas saat dua elemen bertumpuk.',
    },
    introducedIn: 'a03-l06',
  },
  // A4 Pabrik JS
  {
    id: 'variabel',
    term: 'Variable',
    pronunciation: 'va-ri-a-bel',
    shortDef: {
      junior: 'Variabel adalah kotak berlabel untuk menyimpan satu isi. Seperti kotak pensil yang ditempeli nama.',
      pro: 'Wadah bernama untuk menyimpan sebuah nilai di program. Dibuat dengan let (nilai boleh diganti) atau const (nilai tetap).',
    },
    stickerId: 'kotak-berlabel',
    introducedIn: 'a04-l01',
  },
  {
    id: 'tipe-data',
    term: 'Tipe Data',
    pronunciation: 'ti-pe da-ta',
    shortDef: {
      junior: 'Tipe data adalah jenis isi sebuah kotak. Ada tulisan, angka, benar atau salah, dan daftar. Seperti kotak pensil untuk pensil, bukan buku.',
      pro: 'Jenis nilai yang disimpan program: teks, angka, benar atau salah, dan daftar. Di JavaScript, namanya String, Number, Boolean, dan Array.',
    },
    introducedIn: 'a04-l02',
  },
  {
    id: 'kondisi',
    term: 'Kondisi & Loop',
    pronunciation: 'kon-di-si',
    shortDef: {
      junior: 'Kondisi adalah aturan "kalau begini, lakukan itu", seperti "kalau hujan, pakai payung". Loop adalah pengulangan otomatis, seperti ketua kelas menghitung murid satu per satu.',
      pro: 'Kondisi memilih jalan kode: if menjalankan ini, else menjalankan itu. Loop mengulang kode untuk setiap isi sebuah daftar.',
    },
    introducedIn: 'a04-l03',
  },
  {
    id: 'fungsi',
    term: 'Function',
    pronunciation: 'fang-syen',
    shortDef: {
      junior: 'Fungsi adalah resep bernama. Kamu memberi bahan, lalu menerima hasil. Seperti blender yang mengubah buah menjadi jus.',
      pro: 'Blok kode bernama yang bisa dipanggil berulang kali. Ia menerima masukan (parameter) dan mengembalikan hasil.',
    },
    stickerId: 'blender',
    introducedIn: 'a04-l04',
  },
  {
    id: 'dom',
    term: 'DOM',
    pronunciation: 'dom',
    shortDef: {
      junior: 'DOM adalah peta halaman berbentuk pohon. JavaScript bisa mencari dan mengubah isinya. Seperti pohon keluarga yang punya banyak cabang.',
      pro: 'Pohon elemen halaman yang disimpan browser di memori. JavaScript membaca dan mengubah pohon ini. Namanya DOM (Document Object Model).',
    },
    stickerId: 'pohon-dom',
    introducedIn: 'a04-l05',
  },
  {
    id: 'event',
    term: 'Event',
    pronunciation: 'i-ven',
    shortDef: {
      junior: 'Event adalah kejadian saat kamu mengetuk, mengetik, atau menggeser. Halaman bisa menjawabnya. Seperti bel pintu yang berbunyi saat ditekan.',
      pro: 'Kejadian di halaman, seperti klik, ketikan, atau pengiriman form. Kode bisa "mendengarkan" sebuah event lewat addEventListener, lalu bereaksi.',
    },
    introducedIn: 'a04-l05',
  },
  {
    id: 'fetch',
    term: 'Fetch & Async',
    pronunciation: 'fet-sy',
    shortDef: {
      junior: 'Fetch meminta data dari komputer lain. Halaman tetap berjalan selagi menunggu jawaban. Seperti mengantre jajanan sambil mengobrol dengan teman.',
      pro: 'Perintah di browser untuk meminta data dari server tanpa membekukan halaman. Kode menunggu jawabannya dengan async/await.',
    },
    stickerId: 'antrean-kopi',
    introducedIn: 'a04-l06',
  },
  // A5 Pulau Responsif
  {
    id: 'responsif',
    term: 'Responsive Design',
    pronunciation: 're-spon-sif',
    shortDef: {
      junior: 'Responsif berarti tampilan menyesuaikan diri dengan ukuran layar. Seperti air yang mengikuti bentuk wadahnya.',
      pro: 'Tampilan yang menyesuaikan diri dengan lebar layar apa pun, dari HP sampai laptop. Caranya memakai CSS yang fleksibel.',
    },
    stickerId: 'air-wadah',
    introducedIn: 'a05-l01',
  },
  {
    id: 'viewport',
    term: 'Viewport',
    pronunciation: 'vyu-port',
    shortDef: {
      junior: 'Viewport adalah bagian layar yang kelihatan olehmu. Seperti jendela yang membatasi pemandangan.',
      pro: 'Area jendela browser tempat halaman tampil. Di HP, ukurannya diatur lewat tag meta viewport.',
    },
    introducedIn: 'a05-l02',
  },
  {
    id: 'breakpoint',
    term: 'Breakpoint',
    pronunciation: 'brek-poin',
    shortDef: {
      junior: 'Breakpoint adalah lebar layar tempat susunan kotak berubah. Misalnya dari 1 kolom menjadi 2 kolom. Seperti meja kantin yang digeser saat ruangan penuh.',
      pro: 'Lebar layar tertentu tempat tata letak berganti susunan, misalnya dari 1 kolom menjadi 2 kolom. Breakpoint ditulis di CSS.',
    },
    introducedIn: 'a05-l02',
  },
  {
    id: 'media-query',
    term: 'Media Query',
    pronunciation: 'me-di-a kwe-ri',
    shortDef: {
      junior: 'Media query adalah aturan CSS yang baru aktif pada ukuran layar tertentu. Seperti seragam olahraga yang hanya dipakai hari Jumat.',
      pro: 'Aturan CSS bersyarat yang ditulis dengan @media. Gayanya hanya berlaku kalau syarat terpenuhi, misalnya lebar layar minimal tertentu.',
    },
    introducedIn: 'a05-l03',
  },
  {
    id: 'mobile-first',
    term: 'Mobile-first',
    pronunciation: 'mo-bail-ferst',
    shortDef: {
      junior: 'Mobile-first berarti merancang tampilan untuk layar HP lebih dulu. Layar lebar menyusul kemudian. Seperti mengepak tas kecil dulu, lalu menambah barang.',
      pro: 'Strategi menulis CSS dari layar terkecil dulu. Aturan untuk layar lebar ditambahkan kemudian lewat min-width.',
    },
    introducedIn: 'a05-l03',
  },
  // A6 Desa UX
  {
    id: 'design-thinking',
    term: 'Design Thinking',
    pronunciation: 'di-zain ting-king',
    shortDef: {
      junior: 'Design thinking adalah 5 langkah mencari jalan keluar. Pahami orangnya, tentukan masalah, cari ide, buat contoh, lalu uji. Seperti dokter yang memeriksa dulu sebelum memberi obat.',
      pro: 'Proses 5 tahap untuk memecahkan masalah pemakai, dan bisa diulang. Empathize (pahami), Define (rumuskan), Ideate (cari ide), Prototype (buat contoh), Test (uji).',
    },
    stickerId: 'dokter-ux',
    introducedIn: 'a06-l02',
  },
  {
    id: 'persona',
    term: 'Persona',
    pronunciation: 'per-so-na',
    shortDef: {
      junior: 'Persona adalah tokoh karangan yang seperti calon pemakai aplikasimu. Ia punya nama, tujuan, dan kesulitan. Contohnya Rani, penjual yang sibuk.',
      pro: 'Tokoh rekaan yang disusun dari hasil riset untuk menggambarkan satu kelompok pemakai. Isinya kebutuhan, kebiasaan, dan kesulitan (pain point).',
    },
    introducedIn: 'a06-l03',
  },
  {
    id: 'user-flow',
    term: 'User Flow & Journey',
    pronunciation: 'yu-zer flo',
    shortDef: {
      junior: 'User flow adalah urutan langkah di layar sampai tugas selesai. Seperti jalan dari gerbang sekolah menuju kelasmu.',
      pro: 'User flow adalah diagram langkah pemakai di aplikasi sampai tugasnya selesai. User journey adalah peta pengalaman dan perasaannya sepanjang jalan itu.',
    },
    introducedIn: 'a06-l03',
  },
  {
    id: 'prototype',
    term: 'Mockup & Prototype',
    pronunciation: 'pro-to-taip',
    shortDef: {
      junior: 'Mockup adalah gambar rancangan berwarna. Prototype adalah versi yang sudah bisa diketuk. Seperti maket rumah yang pintunya bisa dibuka.',
      pro: 'Mockup adalah gambar rancangan akhir yang belum bisa diklik. Prototype adalah simulasi yang bisa diklik, dibuat sebelum menulis kode.',
    },
    stickerId: 'denah-rumah',
    introducedIn: 'a06-l04',
  },
  {
    id: 'usability-testing',
    term: 'Usability Testing',
    pronunciation: 'yu-za-bi-li-ti',
    shortDef: {
      junior: 'Usability testing adalah mengajak orang mencoba rancanganmu. Kamu melihat bagian mana yang membuat bingung. Seperti teman mencoba permainan buatanmu.',
      pro: 'Mengamati orang sungguhan mencoba rancangan kita untuk menemukan bagian yang menyulitkan. Dilakukan sejak awal, sebelum kode ditulis.',
    },
    introducedIn: 'a06-l05',
  },
  // A7 Galeri Desain
  {
    id: 'hierarki',
    term: 'Hierarki Visual',
    pronunciation: 'hi-e-rar-ki',
    shortDef: {
      junior: 'Hierarki visual mengatur ukuran dan ketebalan huruf. Mata jadi melihat hal terpenting lebih dulu. Seperti judul besar di papan tulis.',
      pro: 'Hierarki visual adalah pengaturan ukuran, kontras, warna, dan posisi supaya pembaca melihat hal terpenting lebih dulu.',
    },
    stickerId: 'sorotan-galeri',
    introducedIn: 'a07-l01',
  },
  {
    id: 'alignment',
    term: 'Alignment & Proximity',
    pronunciation: 'a-lain-men',
    shortDef: {
      junior: 'Alignment berarti kotak dibuat sejajar rapi. Proximity berarti barang sekelompok didekatkan. Seperti buku sejenis yang berdiri berdampingan di rak.',
      pro: 'Alignment: elemen diletakkan pada garis khayal yang sama. Proximity: elemen yang berhubungan diberi jarak dekat agar terbaca sebagai satu kelompok.',
    },
    introducedIn: 'a07-l02',
  },
  {
    id: 'whitespace',
    term: 'White Space',
    pronunciation: 'wait-spes',
    shortDef: {
      junior: 'White space adalah ruang kosong di sekitar gambar dan tulisan. Halaman jadi tidak terasa sesak. Seperti jarak antar murid saat berbaris.',
      pro: 'Ruang kosong di antara elemen. Ia memberi ruang bernapas, membuat teks lebih mudah dibaca, dan halaman tampak rapi.',
    },
    stickerId: 'etalase-lega',
    introducedIn: 'a07-l03',
  },
  {
    id: 'gestalt',
    term: 'Prinsip Gestalt',
    pronunciation: 'ges-talt',
    shortDef: {
      junior: 'Gestalt adalah cara mata mengelompokkan bentuk yang dekat atau mirip. Seperti melihat sekumpulan titik berdekatan sebagai satu bentuk.',
      pro: 'Prinsip psikologi tentang cara otak mengelompokkan elemen yang dekat, mirip, atau satu bingkai. Contohnya proximity (dekat), similarity (mirip), closure (otak melengkapi bentuk), dan common region (satu bingkai).',
    },
    introducedIn: 'a07-l04',
  },
  {
    id: 'hick-law',
    term: "Hick's & Jakob's Law",
    pronunciation: 'hiks lo',
    shortDef: {
      junior: 'Terlalu banyak pilihan membuatmu lama memutuskan. Tata letak yang sudah biasa lebih mudah dipakai. Seperti menu kantin yang hanya punya 5 makanan.',
      pro: 'Makin banyak pilihan, makin lama orang memutuskan (hukum Hick). Orang juga lebih nyaman dengan pola yang sudah dikenal dari aplikasi lain (hukum Jakob).',
    },
    stickerId: 'warung-menu',
    introducedIn: 'a07-l05',
  },
  {
    id: 'fitts-law',
    term: "Fitts's & Doherty",
    pronunciation: 'fits lo',
    shortDef: {
      junior: 'Tombol besar dan dekat jempol lebih mudah diketuk. Jawaban yang cepat terasa lancar. Seperti gawang lebar yang mudah dibobol.',
      pro: 'Target yang besar dan dekat lebih mudah diketuk (hukum Fitts). Respons di bawah 0,4 detik membuat orang tetap fokus (batas Doherty).',
    },
    introducedIn: 'a07-l06',
  },
  {
    id: 'miller-law',
    term: "Miller's & Von Restorff",
    pronunciation: 'mi-ler lo',
    shortDef: {
      junior: 'Ingatanmu terbatas, jadi info perlu dikelompokkan. Hal yang beda sendiri paling mudah diingat. Seperti nomor telepon yang ditulis per 4 angka.',
      pro: 'Memori kerja hanya menampung sekitar 7 potong info, jadi info dikelompokkan (hukum Miller). Elemen yang tampil beda paling diingat (efek Von Restorff).',
    },
    introducedIn: 'a07-l07',
  },
  {
    id: 'peak-end',
    term: 'Peak-End & Zeigarnik',
    pronunciation: 'pik-end',
    shortDef: {
      junior: 'Kamu mengingat momen terbaik dan bagian akhir sebuah pengalaman. Seperti film yang akhirnya seru. Tugas yang belum selesai juga terus teringat, seperti PR yang belum dikerjakan.',
      pro: 'Orang menilai pengalaman dari puncak dan akhirnya (Peak-End). Tugas yang belum selesai mendorong orang menyelesaikannya (efek Zeigarnik).',
    },
    introducedIn: 'a07-l08',
  },
  // A8 Studio Warna & Huruf
  {
    id: 'roda-warna',
    term: 'Roda Warna',
    pronunciation: 'ro-da war-na',
    shortDef: {
      junior: 'Roda warna adalah lingkaran warna untuk mencari pasangan yang cocok. Seperti kotak cat air milik kelas seni.',
      pro: 'Lingkaran yang menunjukkan hubungan antarwarna: primer, sekunder, dan tersier. Dari sini kamu menyusun warna yang serasi.',
    },
    introducedIn: 'a08-l01',
  },
  {
    id: 'hsl',
    term: 'Hue, Saturation, Lightness',
    pronunciation: 'ha-es-el',
    shortDef: {
      junior: 'Warna punya 3 sifat: jenis, kepekatan, dan terang-gelap. Seperti sirup yang bisa diganti rasa, kental, dan esnya.',
      pro: 'Cara menyebut warna lewat tiga angka: Hue (jenis warna di roda), Saturation (kepekatan), dan Lightness (terang-gelap). Dipakai di CSS sebagai hsl().',
    },
    stickerId: 'sirup-hsl',
    introducedIn: 'a08-l02',
  },
  {
    id: 'skema-warna',
    term: 'Skema Warna',
    pronunciation: 'ske-ma war-na',
    shortDef: {
      junior: 'Skema warna adalah resep memilih pasangan warna yang enak dipandang. Bisa bersebelahan atau berseberangan di roda warna. Seperti memilih spidol yang serasi untuk menggambar.',
      pro: 'Pola kombinasi warna yang menjaga keserasian dan kontras. Jenisnya monokromatik, analog, komplementer, dan triadik.',
    },
    introducedIn: 'a08-l03',
  },
  {
    id: 'aturan-60-30-10',
    term: 'Aturan 60-30-10',
    pronunciation: 'e-nam-pu-luh',
    shortDef: {
      junior: 'Aturan 60-30-10 adalah takaran warna yang seimbang. Latar 60 bagian, kartu dan tulisan 30, tombol utama 10. Seperti takaran bumbu di semangkuk mi.',
      pro: 'Pembagian warna: 60% netral dominan, 30% warna kedua, dan 10% warna aksen (penonjol).',
    },
    introducedIn: 'a08-l04',
  },
  {
    id: 'warna-semantik',
    term: 'Warna Semantik',
    pronunciation: 'se-man-tik',
    shortDef: {
      junior: 'Warna semantik adalah warna yang punya arti tetap. Hijau berarti berhasil, oranye berarti hati-hati. Seperti lampu lalu lintas.',
      pro: 'Warna yang selalu menandai status: sukses, peringatan, bahaya, atau info. Selalu dipasangkan dengan ikon atau teks, jangan warna saja.',
    },
    introducedIn: 'a08-l05',
  },
  {
    id: 'kontras',
    term: 'Contrast Ratio',
    pronunciation: 'kon-tras',
    shortDef: {
      junior: 'Kontras adalah beda terang dan gelap antara tulisan dan latarnya. Seperti spidol hitam di atas kertas kuning.',
      pro: 'Perbandingan terang-gelap antara teks dan latarnya. Standar aksesibilitas WCAG AA meminta rasio minimal 4,5 : 1 untuk teks biasa.',
    },
    introducedIn: 'a08-l06',
  },
  {
    id: 'hex-rgb',
    term: 'HEX & RGB',
    pronunciation: 'heks',
    shortDef: {
      junior: 'Setiap warna punya kode untuk komputer. Kode itu berisi huruf dan angka. Seperti nomor seragam yang unik untuk tiap pemain.',
      pro: 'Cara menulis warna sebagai kode di CSS. HEX memakai enam digit seperti #E4572E, RGB memakai tiga angka untuk merah, hijau, dan biru.',
    },
    introducedIn: 'a08-l07',
  },
  {
    id: 'tipografi',
    term: 'Tipografi',
    pronunciation: 'ti-po-gra-fi',
    shortDef: {
      junior: 'Tipografi adalah cara memilih jenis huruf dan jarak baris. Tujuannya supaya enak dibaca. Seperti tulisan rapi di buku tulis.',
      pro: 'Cara menata huruf agar nyaman dibaca: jenis huruf (serif, sans-serif, monospace), ukuran, jarak antarbaris, dan panjang baris.',
    },
    introducedIn: 'a08-l08',
  },
  {
    id: 'type-scale',
    term: 'Type Scale',
    pronunciation: 'taip-skel',
    shortDef: {
      junior: 'Type scale adalah tangga ukuran huruf yang tetap. Ada ukuran untuk judul, subjudul, dan teks biasa. Seperti anak tangga yang sama tingginya.',
      pro: 'Tangga ukuran huruf yang konsisten, dari teks kecil (caption) sampai judul besar (display). Dengan type scale, ukuran huruf tidak dipilih sembarangan.',
    },
    introducedIn: 'a08-l09',
  },
  // A9 Toko Komponen
  {
    id: 'grid-8pt',
    term: 'Grid 12 Kolom & 8pt',
    pronunciation: 'de-la-pan-poin',
    shortDef: {
      junior: 'Halaman dibagi menjadi 12 kolom. Jarak antar kotak memakai kelipatan 4 atau 8. Seperti ubin lantai yang ukurannya sama.',
      pro: 'Halaman dibagi 12 kolom, dan jarak memakai kelipatan 4 atau 8 px. Aturan ini menjaga tata letak tetap seragam.',
    },
    introducedIn: 'a09-l01',
  },
  {
    id: 'komponen-ui',
    term: 'Komponen UI',
    pronunciation: 'kom-po-nen',
    shortDef: {
      junior: 'Komponen adalah bagian tampilan yang bisa dipakai berkali-kali. Contohnya tombol, kartu, dan jendela kecil. Seperti balok lego.',
      pro: 'Bagian tampilan yang dibuat sekali lalu dipakai ulang, seperti Button, Input, Card, Modal, dan Toast.',
    },
    stickerId: 'lego-ds',
    introducedIn: 'a09-l02',
  },
  {
    id: 'state-ui',
    term: 'State Komponen',
    pronunciation: 'stet',
    shortDef: {
      junior: 'State adalah wajah tombol yang berubah. Ia berubah saat disentuh, ditekan, menunggu, atau mati. Seperti wajahmu saat senang atau lelah.',
      pro: 'Keadaan komponen pada saat tertentu: default, hover, focus, active, loading, disabled, atau error. Tiap state punya tampilan sendiri.',
    },
    introducedIn: 'a09-l03',
  },
  {
    id: 'gaya-ui',
    term: 'Gaya Visual UI',
    pronunciation: 'ga-ya yu-ai',
    shortDef: {
      junior: 'Gaya visual adalah pakaian tampilan aplikasi. Ada yang datar dan rapi, ada yang gembung seperti tanah liat.',
      pro: 'Pilihan gaya tampilan yang memberi kesan tertentu pada aplikasi. Contohnya Flat 2.0, Material, Glassmorphism, Neumorphism, Neo-brutalism, dan Bento Grid.',
    },
    introducedIn: 'a09-l04',
  },
  {
    id: 'design-token',
    term: 'Design System & Token',
    pronunciation: 'di-zain to-ken',
    shortDef: {
      junior: 'Design system adalah kumpulan aturan bersama agar semua layar seragam. Token adalah nama untuk warna atau jarak. Seperti nama cat di kaleng yang selalu sama.',
      pro: 'Design system adalah kumpulan aturan dan komponen yang dipakai bersama oleh seluruh tim. Design token adalah variabel bernama untuk warna, jarak, sudut, dan huruf.',
    },
    stickerId: 'lego-ds',
    introducedIn: 'a09-l05',
  },
  {
    id: 'atomic-design',
    term: 'Atomic Design',
    pronunciation: 'a-to-mik',
    shortDef: {
      junior: 'Atomic design menyusun tampilan dari bagian terkecil sampai satu halaman penuh. Seperti menyusun huruf menjadi kata, lalu kalimat, lalu cerita.',
      pro: 'Cara menyusun tampilan bertahap dari bagian terkecil sampai halaman utuh. Tahapnya: Atom, Molecule, Organism, Template, lalu Page.',
    },
    introducedIn: 'a09-l06',
  },
  // A10 Taman Ramah Semua
  {
    id: 'aksesibilitas',
    term: 'Aksesibilitas (a11y)',
    pronunciation: 'ak-se-si-bi-li-tas',
    shortDef: {
      junior: 'Aksesibilitas berarti web bisa dipakai semua orang. Termasuk orang yang memakai alat pembaca layar. Seperti jalan landai di sekolah untuk kursi roda.',
      pro: 'Merancang web agar semua orang bisa memakainya, termasuk penyandang disabilitas. Situasi terbatas, misalnya layar yang silau, juga dihitung.',
    },
    stickerId: 'bidang-miring',
    introducedIn: 'a10-l01',
  },
  {
    id: 'pour',
    term: 'Prinsip POUR & ARIA',
    pronunciation: 'po-ur',
    shortDef: {
      junior: 'POUR adalah 4 syarat web yang ramah. Bisa dilihat atau didengar, dikendalikan, dipahami, dan dibuka di alat apa pun. Seperti taman bermain untuk semua anak.',
      pro: 'POUR memuat 4 prinsip aksesibilitas: Perceivable (terlihat atau terdengar), Operable (bisa dikendalikan), Understandable (mudah dipahami), dan Robust (kokoh). Kokoh berarti tetap jalan di berbagai browser dan alat bantu. ARIA adalah atribut tambahan yang memberi arti pada elemen untuk alat bantu.',
    },
    introducedIn: 'a10-l02',
  },
  // A11 Menara Alat
  {
    id: 'library-framework',
    term: 'Library vs Framework',
    pronunciation: 'laib-re-ri',
    shortDef: {
      junior: 'Library itu seperti perabot yang kamu pilih sendiri. Framework itu seperti rumah lengkap dengan aturannya.',
      pro: 'Library adalah kumpulan kode yang kamu panggil sesuai kebutuhan. Framework menentukan struktur aplikasi, dan kodemu mengikuti aturannya.',
    },
    introducedIn: 'a11-l01',
  },
  {
    id: 'react-komponen',
    term: 'Props & State',
    pronunciation: 'props',
    shortDef: {
      junior: 'Props adalah kiriman isi dari komponen induk ke anaknya. State adalah ingatan di dalam komponen. Seperti titipan pesan dari ibu dan buku catatan di tasmu.',
      pro: 'Props adalah data yang dikirim dari komponen induk ke komponen anak, hanya untuk dibaca. State adalah data milik komponen itu sendiri, dan tampilan ikut berubah saat state berubah.',
    },
    introducedIn: 'a11-l02',
  },
  {
    id: 'tailwind-css',
    term: 'Utility vs Component CSS',
    pronunciation: 'teil-win',
    shortDef: {
      junior: 'Ada dua cara menata tampilan dengan cepat. Utility seperti menyusun lego satuan. Component seperti memakai set lego yang sudah jadi.',
      pro: 'Dua cara menata CSS: class kecil yang digabung (utility-first, contohnya Tailwind CSS) atau komponen jadi (component-first, contohnya Bootstrap).',
    },
    introducedIn: 'a11-l03',
  },
  {
    id: 'core-web-vitals',
    term: 'Core Web Vitals',
    pronunciation: 'kor web vai-tels',
    shortDef: {
      junior: 'Core Web Vitals adalah 3 nilai kesehatan halaman. Halaman harus cepat muncul, cepat menjawab ketukan, dan tidak berloncatan. Seperti rapor kecepatan halaman.',
      pro: 'Tiga ukuran kecepatan halaman dari Google. LCP (Largest Contentful Paint): elemen terbesar tampil dalam 2,5 detik. INP (Interaction to Next Paint): respons ketukan di bawah 200 ms. CLS (Cumulative Layout Shift): pergeseran tata letak di bawah 0,1.',
    },
    introducedIn: 'a11-l04',
  },
  {
    id: 'seo',
    term: 'SEO',
    pronunciation: 'es-e-o',
    shortDef: {
      junior: 'SEO adalah cara merapikan judul dan isi halaman. Dengan begitu halaman mudah ditemukan lewat mesin pencari. Seperti papan nama yang jelas di depan toko.',
      pro: 'Cara membuat halaman mudah ditemukan lewat mesin pencari. Caranya: judul jelas, deskripsi singkat (meta description), HTML semantik, dan URL yang rapi. Namanya SEO (Search Engine Optimization).',
    },
    introducedIn: 'a11-l05',
  },
  {
    id: 'git',
    term: 'Git & Branch',
    pronunciation: 'git',
    shortDef: {
      junior: 'Git adalah titik simpan untuk kode. Kalau salah langkah, kamu bisa kembali, seperti di permainan. Branch adalah jalur percobaan yang tidak mengganggu kode utama.',
      pro: 'Alat yang mencatat setiap perubahan kode (commit) agar bisa dibatalkan. Branch adalah jalur terpisah untuk mencoba perubahan, lalu digabung (merge) kalau sudah siap.',
    },
    stickerId: 'titik-simpan-git',
    introducedIn: 'a11-l06',
  },
  {
    id: 'deploy',
    term: 'Deploy & DevTools',
    pronunciation: 'di-ploi',
    shortDef: {
      junior: 'Deploy berarti memasang situsmu ke internet. Setelah itu semua orang bisa membukanya. DevTools adalah alat periksa halaman di browser. Seperti mengecek sepeda sebelum dipakai.',
      pro: 'Deploy adalah memasang aplikasi ke server produksi (server yang dipakai orang sungguhan). DevTools adalah alat bawaan browser untuk memeriksa halaman dan jaringan, misalnya saat mencari penyebab error.',
    },
    introducedIn: 'a11-l07',
  },
  // A12 Benteng Keamanan
  {
    id: 'sanitasi',
    term: 'Validasi & Escaping',
    pronunciation: 'sa-ni-ta-si',
    shortDef: {
      junior: 'Validasi adalah memeriksa ketikan pengunjung. Escaping adalah membuat huruf berbahaya menjadi aman. Seperti satpam yang memeriksa tas sebelum masuk.',
      pro: 'Validasi memeriksa apakah masukan pemakai sesuai aturan, di client dan di server. Escaping mengubah karakter khusus menjadi teks biasa agar tidak dijalankan sebagai kode.',
    },
    stickerId: 'brankas-bank',
    introducedIn: 'a12-l01',
  },
  {
    id: 'xss',
    term: 'XSS (Cross-Site Scripting)',
    pronunciation: 'eks-es-es',
    shortDef: {
      junior: 'XSS adalah celah saat halaman ikut menjalankan tulisan nakal dari pengunjung. Seperti kertas jahat yang ditempel di papan pengumuman.',
      pro: 'Serangan yang menyisipkan skrip berbahaya ke halaman web agar dijalankan di browser korban. Cegah dengan menampilkan masukan sebagai teks biasa (textContent atau auto-escaping). Pasang juga CSP, aturan tentang sumber skrip yang boleh jalan.',
    },
    stickerId: 'papan-pengumuman',
    introducedIn: 'a12-l02',
  },
  {
    id: 'csrf',
    term: 'CSRF & Clickjacking',
    pronunciation: 'ce-es-er-ef',
    shortDef: {
      junior: 'CSRF adalah trik yang mengirim perintah diam-diam atas namamu. Seperti ada yang menandatangani buku tugasmu tanpa izin. Clickjacking menyembunyikan tombol di bawah gambar, seperti stiker yang menutupi tombol asli.',
      pro: 'CSRF adalah serangan yang membuat browser korban mengirim request palsu ke situs yang sudah dimasukinya. Clickjacking menyembunyikan tombol di bawah halaman lain (iframe) supaya korban mengkliknya tanpa sadar.',
    },
    introducedIn: 'a12-l03',
  },
  {
    id: 'rahasia-frontend',
    term: 'Kunci Rahasia & .env',
    pronunciation: 'dot en-vi',
    shortDef: {
      junior: 'Kunci rahasia tidak boleh ditaruh di kode yang terlihat di browser. Semua orang bisa membukanya. Seperti kunci rumah yang digantung di pagar.',
      pro: 'Kunci dan kata sandi rahasia hanya boleh disimpan di server. Semua kode di browser bisa dilihat lewat DevTools, jadi tidak ada yang tersembunyi di sana. Di server, rahasia biasa ditaruh di file .env.',
    },
    stickerId: 'brankas-bank',
    introducedIn: 'a12-l04',
  },
  // Jalur B - B1 Restoran API
  {
    id: 'api',
    term: 'API',
    pronunciation: 'e-pi-ai',
    shortDef: {
      junior: 'API adalah pelayan dan buku menu di restoran web. Ia membawa pesananmu ke dapur, lalu membawa jawabannya kembali. Seperti pelayan kantin yang mencatat pesananmu.',
      pro: 'Jalur resmi yang membuat satu program bisa meminta sesuatu dari program lain. Namanya API (Application Programming Interface).',
    },
    stickerId: 'pelayan-menu',
    introducedIn: 'b01-l01',
  },
  {
    id: 'endpoint',
    term: 'Endpoint',
    pronunciation: 'end-poin',
    shortDef: {
      junior: 'Endpoint adalah loket khusus untuk satu jenis permintaan. Ada loket untuk daftar barang, ada loket untuk pesanan. Seperti loket di kantin.',
      pro: 'Alamat URL tertentu pada API yang melayani satu jenis permintaan, misalnya /produk untuk daftar barang.',
    },
    stickerId: 'pelayan-menu',
    introducedIn: 'b01-l02',
  },
  {
    id: 'sdk',
    term: 'SDK & Open/Private API',
    pronunciation: 'es-de-ka',
    shortDef: {
      junior: 'SDK adalah kotak alat siap pakai untuk memanggil API. Seperti kit perabot yang tinggal dirakit. API terbuka boleh dipakai siapa saja. API privat hanya untuk timnya sendiri.',
      pro: 'Paket kode siap pakai dari penyedia API, supaya kamu tidak menulis request HTTP sendiri. Namanya SDK (Software Development Kit). API juga dibagi sesuai siapa yang boleh memakainya: Open (Public), Private, Partner, dan Composite.',
    },
    introducedIn: 'b01-l03',
  },
  {
    id: 'kontrak-api',
    term: 'Kontrak API',
    pronunciation: 'kon-trak',
    shortDef: {
      junior: 'Kontrak API adalah janji antara frontend dan backend. Janji itu berisi bentuk pesanan dan bentuk jawabannya. Seperti colokan listrik: bentuknya harus cocok.',
      pro: 'Kesepakatan tentang bentuk request dan response sebuah API. Kesepakatan ini ditulis di dokumentasi dan diberi versi, supaya client yang ada tidak rusak saat API berubah.',
    },
    stickerId: 'colokan-listrik',
    introducedIn: 'b01-l04',
  },
  // B2 Kantor Pos HTTP
  {
    id: 'http-method',
    term: 'HTTP Method & CRUD',
    pronunciation: 'me-tod',
    shortDef: {
      junior: 'Method adalah kata kerja di surat pesanan: ambil, buat, ubah, atau hapus. Contohnya, GET berarti ambil. Seperti memilih kata kerja saat menulis pesanan di kantin.',
      pro: 'Kata kerja HTTP yang menyatakan apa yang diminta: GET membaca, POST membuat, PATCH atau PUT mengubah, DELETE menghapus. Keempat operasi ini disebut CRUD (Create, Read, Update, Delete).',
    },
    stickerId: 'surat-pesanan',
    introducedIn: 'b02-l02',
  },
  {
    id: 'idempotent',
    term: 'Safe & Idempotent',
    pronunciation: 'ai-dem-po-ten',
    shortDef: {
      junior: 'Idempotent berarti diulang berkali-kali, hasil akhirnya tetap sama. Seperti menekan tombol lift 3 kali. Lift tetap datang satu kali.',
      pro: 'Safe berarti permintaan tidak mengubah data, seperti GET. Idempotent berarti mengulang request memberi hasil akhir yang sama, seperti menekan tombol lift dua kali.',
    },
    stickerId: 'tombol-lift',
    introducedIn: 'b02-l03',
  },
  {
    id: 'status-code',
    term: 'Kode Status HTTP',
    pronunciation: 'sta-tus kod',
    shortDef: {
      junior: 'Kode status adalah angka jawaban singkat dari server. Angka berawalan 2 berarti berhasil. Berawalan 4 berarti kamu salah meminta. Berawalan 5 berarti dapur bermasalah.',
      pro: 'Angka tiga digit di awal response yang menyatakan hasil request. Awalan 2 berarti berhasil, 3 dialihkan, 4 salah di client, 5 salah di server. Contohnya 200, 404, dan 500.',
    },
    introducedIn: 'b02-l04',
  },
  {
    id: 'header-body',
    term: 'Path, Query, Header, Body',
    pronunciation: 'he-der',
    shortDef: {
      junior: 'Surat web punya 4 bagian: alamat, saringan, catatan amplop, dan isi paket. Saringan memilih hasil yang kamu mau. Catatan amplop berisi keterangan untuk tukang pos.',
      pro: 'Request membawa data lewat empat tempat. Path menunjuk target, query menyaring hasil, header memuat keterangan, dan body memuat isi data.',
    },
    stickerId: 'surat-pesanan',
    introducedIn: 'b02-l05',
  },
  {
    id: 'cookie-cache',
    term: 'Cookie & Cache (ETag)',
    pronunciation: 'ku-ki',
    shortDef: {
      junior: 'Cookie adalah cap tangan yang menandai pengunjung. Seperti cap di pintu wahana bermain. Cache adalah simpanan sementara agar tidak mengunduh ulang.',
      pro: 'Cookie adalah data kecil yang disimpan browser dan ikut terkirim otomatis di tiap request. Cache menyimpan salinan response supaya tidak diunduh ulang. Header ETag dan Cache-Control mengatur kapan salinan masih berlaku.',
    },
    stickerId: 'cap-tangan',
    introducedIn: 'b02-l06',
  },
  // B3 Gudang JSON
  {
    id: 'json',
    term: 'JSON',
    pronunciation: 'je-son',
    shortDef: {
      junior: 'JSON adalah format teks berlabel untuk bertukar data. Seperti formulir yang tiap kolomnya punya nama.',
      pro: 'Format teks ringan untuk menyimpan dan mengirim data sebagai pasangan nama dan isi (key-value). Namanya JSON (JavaScript Object Notation).',
    },
    stickerId: 'formulir-json',
    introducedIn: 'b03-l01',
  },
  {
    id: 'serialisasi',
    term: 'Serialisasi',
    pronunciation: 'se-ri-a-li-sa-si',
    shortDef: {
      junior: 'Serialisasi adalah mengemas data menjadi teks agar bisa dikirim. Di tujuan, teks itu dibongkar lagi. Seperti membongkar lemari saat pindahan, lalu merakitnya lagi.',
      pro: 'Mengubah data di memori menjadi teks atau biner (deretan 0 dan 1) yang bisa dikirim, dengan JSON.stringify. Proses sebaliknya, mengubah teks kembali menjadi data, memakai JSON.parse.',
    },
    stickerId: 'pindahan-lemari',
    introducedIn: 'b03-l03',
  },
  {
    id: 'protobuf',
    term: 'XML, FormData & Protobuf',
    pronunciation: 'pro-to-baf',
    shortDef: {
      junior: 'JSON bukan satu-satunya format data. XML dipakai sistem lama, FormData mengirim file. Protobuf membuat pesan kecil dan cepat. Seperti memilih surat, paket, atau pesan singkat.',
      pro: 'Tiga format data selain JSON. XML dipakai sistem lama, FormData mengirim file lewat form, dan Protobuf memakai format biner yang kecil dan cepat.',
    },
    introducedIn: 'b03-l04',
  },
  // B4 Peta Jenis API
  {
    id: 'rest',
    term: 'REST API',
    pronunciation: 'rest',
    shortDef: {
      junior: 'REST adalah cara memesan data dengan nama benda dan kata kerja. Seperti perpustakaan: sebut nama buku, lalu pinjam atau kembalikan.',
      pro: 'Gaya API yang memakai nama benda (resource) di URL dan method HTTP yang seragam. Tiap request berdiri sendiri, server tidak mengingat request sebelumnya (stateless).',
    },
    stickerId: 'perpustakaan-rest',
    introducedIn: 'b04-l02',
  },
  {
    id: 'pagination',
    term: 'Pagination & Versioning',
    pronunciation: 'pa-ji-ne-syen',
    shortDef: {
      junior: 'Pagination membagi daftar panjang menjadi beberapa halaman. Versioning memberi nomor edisi pada menu API. Seperti buku dengan bab dan nomor cetakan.',
      pro: 'Pagination membagi daftar panjang menjadi halaman-halaman kecil (offset atau cursor). Versioning memisahkan versi API lewat alamat seperti /v1 dan /v2, agar perubahan tidak merusak client lama.',
    },
    introducedIn: 'b04-l03',
  },
  {
    id: 'graphql',
    term: 'GraphQL',
    pronunciation: 'graf-kyu-el',
    shortDef: {
      junior: 'GraphQL adalah pelayan pribadi. Kamu menulis daftar isi yang kamu mau, dan ia membawa persis itu. Seperti memesan hanya nasi dan telur.',
      pro: 'Bahasa untuk meminta data API lewat satu pintu. Kamu menyebut kolom yang dibutuhkan, dan hanya itu yang dikirim. Ini mencegah over-fetching (data berlebih) dan under-fetching (data kurang).',
    },
    stickerId: 'pelayan-pribadi',
    introducedIn: 'b04-l04',
  },
  {
    id: 'grpc',
    term: 'gRPC',
    pronunciation: 'ji-ar-pi-si',
    shortDef: {
      junior: 'gRPC adalah interkom kilat antar komputer. Pesannya diubah menjadi kode angka agar kecil dan cepat. Seperti interkom sekolah yang langsung menyambung ke ruang guru.',
      pro: 'Cara satu server memanggil fungsi di server lain (RPC, Remote Procedure Call). Pesannya dikemas dalam format biner (Protobuf), jadi lebih kecil dan cepat daripada JSON. Bentuk pesannya ditetapkan di file .proto.',
    },
    stickerId: 'interkom-grpc',
    introducedIn: 'b04-l05',
  },
  {
    id: 'trpc-soap',
    term: 'SOAP, JSON-RPC, tRPC',
    pronunciation: 'ti-ar-pi-si',
    shortDef: {
      junior: 'SOAP, JSON-RPC, dan tRPC adalah tiga cara komputer saling bertanya. SOAP resmi dan panjang, seperti formulir. JSON-RPC singkat, seperti pesan pendek. tRPC dipakai di dalam satu proyek saja.',
      pro: 'Tiga varian API bergaya memanggil fungsi di server lain (RPC). SOAP memakai format XML dan umum di sistem perusahaan besar. JSON-RPC memakai pesan JSON yang ringan. tRPC menghubungkan frontend dan backend dalam satu proyek TypeScript.',
    },
    introducedIn: 'b04-sq1',
  },
  // B5 Menara Realtime
  {
    id: 'polling',
    term: 'Polling',
    pronunciation: 'po-ling',
    shortDef: {
      junior: 'Polling adalah bertanya berulang kali apakah ada kabar baru. Misalnya setiap beberapa detik. Seperti adik yang terus bertanya "sudah sampai belum?"',
      pro: 'Teknik mengirim request berkala dengan jeda tetap untuk memeriksa apakah ada data baru. Sederhana, tetapi banyak request yang dijawab kosong.',
    },
    stickerId: 'tanya-berulang',
    introducedIn: 'b05-l01',
  },
  {
    id: 'long-polling',
    term: 'Long Polling',
    pronunciation: 'long po-ling',
    shortDef: {
      junior: 'Long polling adalah meminta kabar lalu menunggu jawabannya. Seperti menunggu panggilan petugas loket saat paket tiba.',
      pro: 'Teknik ketika server menahan response sampai ada data baru atau waktu habis (timeout). Setelah itu client langsung bertanya lagi.',
    },
    introducedIn: 'b05-l02',
  },
  {
    id: 'sse',
    term: 'SSE (Server-Sent Events)',
    pronunciation: 'es-es-e',
    shortDef: {
      junior: 'SSE adalah siaran radio satu arah. Server terus mengirim kabar baru ke browser. Kamu hanya mendengarkan, seperti radio sekolah.',
      pro: 'Cara server mengalirkan kabar baru ke browser lewat satu sambungan HTTP, hanya satu arah. Browser menerimanya lewat EventSource.',
    },
    stickerId: 'radio',
    introducedIn: 'b05-l03',
  },
  {
    id: 'websocket',
    term: 'WebSocket',
    pronunciation: 'web-so-ket',
    shortDef: {
      junior: 'WebSocket adalah sambungan telepon dua arah yang tetap terbuka. Browser dan server bisa saling bicara kapan saja. Seperti telepon yang tidak ditutup.',
      pro: 'Sambungan dua arah yang tetap terbuka antara browser dan server. Ia dibuka dari request HTTP biasa, lalu server menjawab kode 101 (ganti protokol). Keduanya bisa mengirim pesan kapan saja.',
    },
    stickerId: 'telepon',
    introducedIn: 'b05-l04',
  },
  {
    id: 'webrtc',
    term: 'WebRTC',
    pronunciation: 'web-ar-ti-si',
    shortDef: {
      junior: 'WebRTC adalah walkie-talkie langsung antar browser. Ia dipakai untuk panggilan video. Server hanya memperkenalkan keduanya di awal, seperti guru yang mempertemukan dua teman.',
      pro: 'Teknologi yang menyambungkan dua browser langsung (peer-to-peer) untuk video, suara, atau data. Server signaling hanya mempertemukan keduanya di awal, dibantu STUN dan TURN.',
    },
    stickerId: 'walkie-talkie',
    introducedIn: 'b05-l05',
  },
  // B6 Lonceng Kejadian
  {
    id: 'webhook',
    term: 'Webhook',
    pronunciation: 'web-huk',
    shortDef: {
      junior: 'Webhook adalah kurir yang memencet bel servermu saat sesuatu selesai. Contohnya saat pembayaran sudah lunas. Kamu tidak perlu terus bertanya.',
      pro: 'Request POST otomatis dari layanan lain ke alamat di servermu saat ada kejadian, misalnya pembayaran lunas. Servermu tidak perlu terus bertanya (polling).',
    },
    stickerId: 'bel-pintu',
    introducedIn: 'b06-l01',
  },
  {
    id: 'signature-webhook',
    term: 'Webhook Signature',
    pronunciation: 'sig-na-tyur',
    shortDef: {
      junior: 'Signature adalah segel rahasia di surat. Server memeriksa segel itu agar yakin kurirnya asli. Seperti cap resmi di surat sekolah.',
      pro: 'Tanda tangan digital (HMAC) di header webhook membuktikan bahwa pesan benar-benar dari pengirim aslinya. Penerima juga harus idempotent, supaya webhook yang terkirim dua kali tidak diproses dua kali.',
    },
    introducedIn: 'b06-l02',
  },
  {
    id: 'queue-pubsub',
    term: 'Message Queue & Pub/Sub',
    pronunciation: 'kyu',
    shortDef: {
      junior: 'Antrean pesan seperti nomor antrean: satu pekerja mengambil satu pesan. Pub-Sub seperti papan pengumuman: banyak orang membaca pesan yang sama.',
      pro: 'Message queue menyimpan pesan dalam antrean, dan satu penerima mengambil tiap pesan. Pub/Sub menyiarkan pesan ke sebuah topik, dan semua pelanggan topik itu menerimanya.',
    },
    stickerId: 'antrean-bank',
    introducedIn: 'b06-l03',
  },
  // B7 Gerbang Login
  {
    id: 'autentikasi',
    term: 'Autentikasi & Otorisasi',
    pronunciation: 'au-ten-ti-ka-si',
    shortDef: {
      junior: 'Autentikasi adalah membuktikan siapa kamu. Otorisasi adalah izin tentang apa yang boleh kamu buka. Seperti satpam yang memeriksa kartumu, lalu menunjukkan ruangan yang boleh dimasuki.',
      pro: 'Autentikasi (AuthN) memeriksa siapa kamu, dan kegagalannya dijawab 401. Otorisasi (AuthZ) memeriksa apa yang boleh kamu buka, dan penolakannya dijawab 403.',
    },
    stickerId: 'kartu-hotel',
    introducedIn: 'b07-l01',
  },
  {
    id: 'api-key',
    term: 'API Key & Session',
    pronunciation: 'e-pi-ai ki',
    shortDef: {
      junior: 'API key adalah kode rahasia pengenal aplikasi. Session adalah nomor loker yang mencatat kamu sudah masuk. Seperti kartu anggota perpustakaan dan loker sekolah.',
      pro: 'Tiga cara membuktikan identitas. API key adalah kunci rahasia milik aplikasi. Session cookie adalah penanda yang mengarah ke catatan login di server. Bearer token adalah token yang dikirim di setiap request.',
    },
    introducedIn: 'b07-l02',
  },
  {
    id: 'jwt',
    term: 'JWT (JSON Web Token)',
    pronunciation: 'jot',
    shortDef: {
      junior: 'Contoh JWT ini seperti gelang wahana berhologram. Tulisannya bisa dibaca. Cap membantu penjaga memastikan gelangnya asli.',
      pro: 'JWT membawa klaim dalam format bertanda tangan atau terenkripsi. Contoh bertanda tangan memakai header, payload yang bisa dibaca, dan signature untuk memeriksa keaslian.',
    },
    stickerId: 'gelang-hologram',
    introducedIn: 'b07-l03',
  },
  {
    id: 'refresh-token',
    term: 'Access & Refresh Token',
    pronunciation: 'ri-fres to-ken',
    shortDef: {
      junior: 'Access token adalah gelang harian yang cepat habis masa berlakunya. Refresh token adalah kartu member untuk menukar gelang baru. Seperti tiket wahana harian dan kartu langganan.',
      pro: 'Access token berumur singkat dan dikirim di setiap request. Refresh token berumur panjang dan hanya dipakai untuk meminta access token baru. Ia disimpan di cookie HttpOnly agar tidak terbaca JavaScript.',
    },
    introducedIn: 'b07-l04',
  },
  {
    id: 'oauth',
    term: 'OAuth 2.0 & PKCE',
    pronunciation: 'o-oth',
    shortDef: {
      junior: 'OAuth adalah kunci valet untuk tukang parkir. Aplikasi lain mendapat izin terbatas, tanpa kata sandi utamamu. Kunci itu bisa menjalankan mobil, tetapi tidak membuka bagasi.',
      pro: 'Cara memberi aplikasi lain izin terbatas (scope) tanpa membagikan kata sandi. Alur yang aman memakai Authorization Code dengan PKCE, pengaman agar kode izin tidak bisa dicuri. OIDC (OpenID Connect) menambahkan fungsi login di atasnya.',
    },
    stickerId: 'kunci-valet',
    introducedIn: 'b07-l05',
  },
  // B8 Satpam API
  {
    id: 'cors',
    term: 'CORS',
    pronunciation: 'kors',
    shortDef: {
      junior: 'CORS adalah aturan satpam browser. Ia menentukan situs mana yang boleh membaca data alamat lain. Seperti satpam kompleks yang memeriksa tamu.',
      pro: 'Aturan keamanan browser yang membatasi situs mana yang boleh membaca data dari alamat (origin) lain. Server mengizinkannya lewat header khusus. Namanya CORS (Cross-Origin Resource Sharing).',
    },
    stickerId: 'satpam-apartemen',
    introducedIn: 'b08-l01',
  },
  {
    id: 'rate-limit',
    term: 'Rate Limiting',
    pronunciation: 'ret li-mit',
    shortDef: {
      junior: 'Rate limiting adalah batas jumlah permintaan per menit. Server tidak kebanjiran pesanan, dan semua orang kebagian giliran. Seperti antrean wahana bermain.',
      pro: 'Pembatasan jumlah request dari satu client dalam waktu tertentu. Kalau jatah habis, server menjawab 429 Too Many Requests dan header Retry-After memberi tahu kapan boleh mencoba lagi.',
    },
    stickerId: 'wahana-bermain',
    introducedIn: 'b08-l02',
  },
  {
    id: 'backoff',
    term: 'Retry & Exponential Backoff',
    pronunciation: 'bek-of',
    shortDef: {
      junior: 'Backoff adalah mencoba lagi dengan jeda yang makin lama. Seperti menelepon teman yang sibuk, lalu menunggu sedikit lebih lama tiap kali.',
      pro: 'Cara mengulang request yang gagal sementara (5xx atau 429) dengan jeda yang digandakan: 1, 2, 4 detik. Ditambah jitter (jeda acak kecil) agar semua client tidak mencoba bersamaan.',
    },
    stickerId: 'telepon-sopan',
    introducedIn: 'b08-l03',
  },
  {
    id: 'idempotency-key',
    term: 'Idempotency Key',
    pronunciation: 'ai-dem-po-ten-si',
    shortDef: {
      junior: 'Idempotency key adalah nomor nota unik. Kalau tombol bayar tertekan 2 kali, kamu tidak ditagih 2 kali. Seperti kasir yang mencatat nomor nota.',
      pro: 'Kunci unik di header request POST yang menjamin satu transaksi, misalnya pembayaran, hanya diproses satu kali. Server mengenali request ulang dari kunci yang sama.',
    },
    stickerId: 'nomor-nota',
    introducedIn: 'b08-l04',
  },
  {
    id: 'bola-idor',
    term: 'BOLA / IDOR & OWASP API',
    pronunciation: 'bo-la',
    shortDef: {
      junior: 'BOLA adalah celah yang membiarkan kamu mengintip milik orang lain. Caranya hanya dengan mengganti nomor di alamat. Seperti membuka loker teman yang tidak dikunci.',
      pro: 'BOLA (IDOR) adalah celah yang membuat pemakai bisa membuka data orang lain dengan mengganti ID di request. Server wajib memeriksa pemilik setiap data yang diminta. Daftar OWASP API menyebut risiko lain, misalnya mass assignment dan data berlebih di response.',
    },
    introducedIn: 'b08-l05',
  },
  // B9 Dapur Frontend
  {
    id: 'empat-keadaan',
    term: 'Empat Keadaan Layar',
    pronunciation: 'em-pat ke-a-da-an',
    shortDef: {
      junior: 'Halaman yang mengambil data punya 4 wajah. Wajahnya: sedang memuat, gagal, kosong, dan berhasil. Seperti tulisan di pintu kantin yang berganti-ganti.',
      pro: 'Tampilan yang mengambil data perlu empat keadaan. Loading memakai kerangka sementara (skeleton), error memberi tombol coba lagi, kosong menjelaskan alasannya, dan sukses menampilkan data.',
    },
    stickerId: 'empat-wajah',
    introducedIn: 'b09-l02',
  },
  {
    id: 'debounce',
    term: 'Debounce & AbortController',
    pronunciation: 'di-bauns',
    shortDef: {
      junior: 'Debounce adalah menunggu sebentar sampai kamu selesai mengetik. Pencarian lama juga dibatalkan. Seperti guru yang menunggu kamu selesai bicara sebelum menjawab.',
      pro: 'Debounce menunda pencarian sampai pemakai berhenti mengetik. AbortController membatalkan fetch lama yang jawabannya sudah tidak diperlukan.',
    },
    introducedIn: 'b09-l03',
  },
  {
    id: 'optimistic-ui',
    term: 'Cache Client & Optimistic UI',
    pronunciation: 'op-ti-mis-tik',
    shortDef: {
      junior: 'Optimistic UI mengubah tampilan langsung, sebelum jawaban datang. Cache menyimpan hasil lama agar cepat. Seperti menandai tugas selesai sebelum guru mengecek.',
      pro: 'Optimistic UI mengubah tampilan langsung, lalu mengembalikannya (rollback) kalau request gagal. Cache di client menyimpan hasil lama, dan pola stale-while-revalidate menampilkannya sambil mengambil data terbaru.',
    },
    introducedIn: 'b09-l04',
  },
  {
    id: 'bff',
    term: 'BFF (Backend for Frontend)',
    pronunciation: 'bi-ef-ef',
    shortDef: {
      junior: 'BFF adalah server kecil milikmu sendiri. Ia menyimpan kunci rahasia agar browser tidak memegangnya. Seperti ketua kelas yang menyimpan kunci lemari.',
      pro: 'Server kecil khusus untuk satu frontend (Backend for Frontend). Ia menyimpan API key rahasia dan meringkas response agar frontend menerima data secukupnya.',
    },
    introducedIn: 'b09-l05',
  },
  {
    id: 'openapi',
    term: 'OpenAPI & Mock API',
    pronunciation: 'o-pen e-pi-ai',
    shortDef: {
      junior: 'OpenAPI adalah buku menu resmi sebuah API. Mock API adalah dapur tiruan untuk berlatih. Frontend bisa berlatih sebelum dapur asli jadi. Seperti latihan drama sebelum panggung dibangun.',
      pro: 'OpenAPI (Swagger) adalah standar untuk menulis kontrak REST API. Mock API (misalnya MSW) adalah server tiruan, agar frontend bisa diuji sebelum server asli siap.',
    },
    introducedIn: 'b09-l06',
  },
];

export const GLOSSARY_BY_ID: Record<string, GlossaryTerm> = Object.fromEntries(
  GLOSSARY_TERMS.map((t) => [t.id, t]),
);

/** Topic chips on the glossary page: a hand-picked catalog across worlds, so a learner can browse one theme. */
export const GLOSSARY_TOPICS: { id: string; label: string; termIds: string[] }[] = [
  { id: 'web', label: 'Cara kerja web', termIds: ['frontend', 'backend', 'browser', 'server', 'dns', 'request', 'response', 'url', 'domain', 'https'] },
  { id: 'htmlcss', label: 'HTML & CSS', termIds: ['html', 'css', 'tag', 'atribut', 'elemen', 'doctype', 'semantik', 'alt-text', 'selector', 'class-css', 'box-model', 'padding', 'margin', 'rem-unit', 'flexbox', 'grid-css', 'z-index', 'responsif', 'viewport', 'breakpoint', 'media-query', 'mobile-first'] },
  { id: 'js', label: 'JavaScript', termIds: ['javascript', 'variabel', 'tipe-data', 'kondisi', 'fungsi', 'dom', 'event', 'fetch'] },
  { id: 'desain', label: 'Desain & UX', termIds: ['ui', 'ux', 'wireframe', 'design-thinking', 'persona', 'user-flow', 'prototype', 'usability-testing', 'hierarki', 'alignment', 'whitespace', 'gestalt', 'hick-law', 'fitts-law', 'miller-law', 'peak-end', 'roda-warna', 'hsl', 'skema-warna', 'aturan-60-30-10', 'warna-semantik', 'kontras', 'hex-rgb', 'tipografi', 'type-scale', 'grid-8pt', 'komponen-ui', 'state-ui', 'gaya-ui', 'design-token', 'atomic-design', 'aksesibilitas', 'pour'] },
  { id: 'api', label: 'API & HTTP', termIds: ['api', 'endpoint', 'sdk', 'http-method', 'idempotent', 'status-code', 'header-body', 'cookie-cache', 'json', 'serialisasi', 'protobuf', 'rest', 'pagination', 'graphql', 'grpc', 'trpc-soap'] },
  { id: 'kontrak', label: 'Kontrak API', termIds: ['kontrak-api', 'openapi', 'endpoint', 'json', 'status-code', 'pagination', 'rest', 'graphql', 'grpc', 'protobuf', 'trpc-soap'] },
  { id: 'realtime', label: 'Realtime & event', termIds: ['polling', 'long-polling', 'sse', 'websocket', 'webrtc', 'webhook', 'signature-webhook', 'queue-pubsub'] },
  { id: 'sec', label: 'Keamanan & login', termIds: ['https', 'sanitasi', 'xss', 'csrf', 'rahasia-frontend', 'autentikasi', 'api-key', 'jwt', 'refresh-token', 'oauth', 'cors', 'rate-limit', 'idempotency-key', 'bola-idor', 'signature-webhook', 'bff'] },
  { id: 'workflow', label: 'Alat & workflow', termIds: ['library-framework', 'react-komponen', 'tailwind-css', 'core-web-vitals', 'seo', 'git', 'deploy', 'openapi', 'empat-keadaan', 'debounce', 'optimistic-ui', 'backoff'] },
];
