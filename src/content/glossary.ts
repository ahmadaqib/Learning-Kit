import type { GlossaryTerm } from './schema';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // A1 Kota Web
  {
    id: 'frontend',
    term: 'Frontend',
    pronunciation: 'fron-end',
    shortDef: {
      junior: 'Bagian website yang terlihat dan bisa disentuh oleh pengunjung, seperti ruang makan restoran.',
      pro: 'Sisi aplikasi yang berjalan di browser dan berinteraksi langsung dengan pengguna menggunakan HTML, CSS, dan JavaScript.',
    },
    stickerId: 'restoran',
    introducedIn: 'a01-l01',
  },
  {
    id: 'backend',
    term: 'Backend',
    pronunciation: 'bek-end',
    shortDef: {
      junior: 'Bagian di balik layar yang mengolah dan menyimpan data, seperti dapur restoran.',
      pro: 'Sisi server yang mengolah logika bisnis, autentikasi, dan penyimpanan data di database.',
    },
    stickerId: 'restoran',
    introducedIn: 'a01-l01',
  },
  {
    id: 'ui',
    term: 'UI (User Interface)',
    pronunciation: 'yu-ai',
    shortDef: {
      junior: 'Tampilan layar yang dilihat mata: warna, huruf, gambar, dan tombol.',
      pro: 'Antarmuka visual yang dilihat pengguna: tipografi, palet warna, ikon, jarak, dan komponen layar.',
    },
    stickerId: 'botol-saus',
    introducedIn: 'a01-l02',
  },
  {
    id: 'ux',
    term: 'UX (User Experience)',
    pronunciation: 'yu-eks',
    shortDef: {
      junior: 'Perasaan pengguna saat memakai aplikasi: mudah, cepat, atau malah bingung.',
      pro: 'Keseluruhan pengalaman dan kemudahan yang dirasakan pengguna saat berinteraksi dengan produk.',
    },
    stickerId: 'botol-saus',
    introducedIn: 'a01-l02',
  },
  {
    id: 'wireframe',
    term: 'Wireframe',
    pronunciation: 'way-er-frem',
    shortDef: {
      junior: 'Sketsa kasar hitam-putih untuk merencanakan letak tombol dan gambar.',
      pro: 'Sketsa kasar tata letak antarmuka sebelum memberi warna atau tipografi rinci.',
    },
    stickerId: 'denah-rumah',
    introducedIn: 'a01-l03',
  },
  {
    id: 'browser',
    term: 'Browser',
    pronunciation: 'brau-zer',
    shortDef: {
      junior: 'Aplikasi seperti Chrome atau Safari untuk membuka halaman website.',
      pro: 'Perangkat lunak klien yang meminta, menguraikan, dan menampilkan halaman web ke layar pengguna.',
    },
    stickerId: 'ojek-paket',
    introducedIn: 'a01-l04',
  },
  {
    id: 'server',
    term: 'Server',
    pronunciation: 'sêr-ver',
    shortDef: {
      junior: 'Komputer khusus yang menyimpan file website dan melayani permintaan.',
      pro: 'Komputer atau layanan yang menerima request dan mengirimkan response berisi halaman atau data.',
    },
    stickerId: 'ojek-paket',
    introducedIn: 'a01-l04',
  },
  {
    id: 'dns',
    term: 'DNS',
    pronunciation: 'de-en-es',
    shortDef: {
      junior: 'Buku kontak internet yang menerjemahkan nama website menjadi nomor alamat server.',
      pro: 'Domain Name System; sistem penerjemah nama domain menjadi alamat IP server tujuan.',
    },
    stickerId: 'kontak-telepon',
    introducedIn: 'a01-l04',
  },
  {
    id: 'request',
    term: 'Request',
    pronunciation: 'ri-kwest',
    shortDef: {
      junior: 'Pesan permintaan dari browser ke server.',
      pro: 'Permintaan resmi yang dikirim client menuju server untuk meminta halaman atau data.',
    },
    stickerId: 'ojek-paket',
    introducedIn: 'a01-l04',
  },
  {
    id: 'response',
    term: 'Response',
    pronunciation: 'ri-spons',
    shortDef: {
      junior: 'Jawaban dari server yang berisi halaman atau data yang diminta.',
      pro: 'Balasan server atas request client berupa kode status, header, dan body.',
    },
    stickerId: 'ojek-paket',
    introducedIn: 'a01-l04',
  },
  {
    id: 'url',
    term: 'URL',
    pronunciation: 'yu-ar-el',
    shortDef: {
      junior: 'Alamat lengkap sebuah halaman di internet.',
      pro: 'Uniform Resource Locator; alamat lengkap yang terdiri atas protokol, domain, path, dan query.',
    },
    stickerId: 'alamat-rumah',
    introducedIn: 'a01-l05',
  },
  {
    id: 'domain',
    term: 'Domain',
    pronunciation: 'do-mein',
    shortDef: {
      junior: 'Nama website yang mudah diingat, seperti toko-rani.example.',
      pro: 'Nama unik yang menunjuk ke alamat server sebuah situs web.',
    },
    stickerId: 'alamat-rumah',
    introducedIn: 'a01-l05',
  },
  {
    id: 'https',
    term: 'HTTPS',
    pronunciation: 'ha-te-te-pe-es',
    shortDef: {
      junior: 'Cara bicara browser dan server yang terkunci aman agar tidak diintip.',
      pro: 'Versi terenkripsi dari protokol HTTP menggunakan TLS sehingga lalu lintas data terlindungi.',
    },
    stickerId: 'amplop-tersegel',
    introducedIn: 'a01-l05',
  },
  {
    id: 'html',
    term: 'HTML',
    pronunciation: 'ha-te-em-el',
    shortDef: {
      junior: 'Bahasa untuk menyusun kerangka halaman: judul, tulisan, gambar, dan tombol.',
      pro: 'HyperText Markup Language; bahasa penanda yang menentukan struktur dan isi halaman web.',
    },
    stickerId: 'rumah-lapis',
    introducedIn: 'a01-l06',
  },
  {
    id: 'css',
    term: 'CSS',
    pronunciation: 'se-es-es',
    shortDef: {
      junior: 'Bahasa untuk mendandani halaman: warna, ukuran huruf, jarak, dan posisi.',
      pro: 'Cascading Style Sheets; bahasa pengatur tampilan visual, tata letak, dan gaya elemen HTML.',
    },
    stickerId: 'rumah-lapis',
    introducedIn: 'a01-l06',
  },
  {
    id: 'javascript',
    term: 'JavaScript',
    pronunciation: 'ja-va-skrip',
    shortDef: {
      junior: 'Bahasa pemrograman yang membuat halaman bisa bergerak dan merespons klik.',
      pro: 'Bahasa pemrograman di browser untuk mengatur logika interaksi, manipulasi DOM, dan pengambilan data.',
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
      junior: 'Label bertanda kurung sudut untuk menandai jenis isi di halaman.',
      pro: 'Penanda elemen HTML yang ditulis di antara tanda < dan > untuk menamai jenis konten.',
    },
    stickerId: 'label-kardus',
    introducedIn: 'a02-l01',
  },
  {
    id: 'atribut',
    term: 'Attribute',
    pronunciation: 'a-tri-but',
    shortDef: {
      junior: 'Catatan tambahan di dalam tag pembuka, misalnya alamat tujuan tautan.',
      pro: 'Informasi tambahan berupa pasangan nama="nilai" di dalam tag pembuka elemen HTML.',
    },
    stickerId: 'label-kardus',
    introducedIn: 'a02-l01',
  },
  {
    id: 'elemen',
    term: 'Element',
    pronunciation: 'e-le-men',
    shortDef: {
      junior: 'Satu paket utuh berisi tag pembuka, isinya, dan tag penutup.',
      pro: 'Satu unit komponen HTML lengkap dari tag pembuka, konten, hingga tag penutup.',
    },
    stickerId: 'label-kardus',
    introducedIn: 'a02-l01',
  },
  {
    id: 'doctype',
    term: 'DOCTYPE & Head/Body',
    pronunciation: 'dok-taip',
    shortDef: {
      junior: 'Identitas dokumen HTML agar browser tahu cara membacanya.',
      pro: 'Deklarasi pembuka dokumen HTML5 beserta pembagian metadata <head> dan isi <body>.',
    },
    introducedIn: 'a02-l02',
  },
  {
    id: 'semantik',
    term: 'Semantic HTML',
    pronunciation: 'se-man-tik',
    shortDef: {
      junior: 'Tag khusus yang menjelaskan arti bagian halaman, seperti header atau footer.',
      pro: 'Penggunaan elemen HTML bermakna (<header>, <nav>, <main>, <footer>) demi aksesibilitas dan SEO.',
    },
    stickerId: 'pohon-berlabel',
    introducedIn: 'a02-l04',
  },
  {
    id: 'alt-text',
    term: 'Alt Text',
    pronunciation: 'alt-teks',
    shortDef: {
      junior: 'Teks deskripsi gambar untuk pembaca layar atau saat gambar gagal tampil.',
      pro: 'Atribut alt pada <img> yang mendeskripsikan isi gambar bagi alat bantu aksesibilitas dan mesin pencari.',
    },
    introducedIn: 'a02-l05',
  },
  // A3 Bengkel CSS
  {
    id: 'selector',
    term: 'Selector',
    pronunciation: 'se-lek-tor',
    shortDef: {
      junior: 'Penunjuk bagian mana yang mau dihias oleh CSS.',
      pro: 'Pola CSS (tag, .class, atau #id) yang memilih elemen HTML target untuk diberi gaya.',
    },
    stickerId: 'kuas-cat',
    introducedIn: 'a03-l01',
  },
  {
    id: 'class-css',
    term: 'Class & ID',
    pronunciation: 'klas',
    shortDef: {
      junior: 'Nama kelompok (class) untuk menghias banyak kotak sekaligus.',
      pro: 'Selector berbasis atribut class (dapat dipakai ulang banyak elemen) dan id (unik satu halaman).',
    },
    introducedIn: 'a03-l01',
  },
  {
    id: 'box-model',
    term: 'Box Model',
    pronunciation: 'boks-mo-del',
    shortDef: {
      junior: 'Empat lapis kotak pada elemen: isi, ruang dalam, bingkai, dan jarak luar.',
      pro: 'Model kotak CSS yang tersusun dari content, padding, border, dan margin.',
    },
    stickerId: 'lukisan-berbingkai',
    introducedIn: 'a03-l02',
  },
  {
    id: 'padding',
    term: 'Padding',
    pronunciation: 'pa-ding',
    shortDef: {
      junior: 'Ruang kosong di dalam bingkai kotak antara isi dan garis tepinya.',
      pro: 'Jarak bagian dalam antara konten elemen dengan garis tepi (border).',
    },
    stickerId: 'lukisan-berbingkai',
    introducedIn: 'a03-l02',
  },
  {
    id: 'margin',
    term: 'Margin',
    pronunciation: 'mar-jin',
    shortDef: {
      junior: 'Jarak di luar bingkai untuk memisahkan satu kotak dengan kotak lainnya.',
      pro: 'Ruang kosong di luar border elemen yang memberi jarak terhadap elemen tetangga.',
    },
    stickerId: 'lukisan-berbingkai',
    introducedIn: 'a03-l02',
  },
  {
    id: 'rem-unit',
    term: 'rem & px',
    pronunciation: 'rem',
    shortDef: {
      junior: 'Satuan ukuran di CSS agar teks dan jarak rapi di berbagai layar.',
      pro: 'Satuan absolut piksel (px) dan satuan relatif terhadap ukuran huruf dasar akar (rem).',
    },
    introducedIn: 'a03-l03',
  },
  {
    id: 'flexbox',
    term: 'Flexbox',
    pronunciation: 'fleks-boks',
    shortDef: {
      junior: 'Cara menata kotak berjajar ke samping atau ke bawah dalam satu baris.',
      pro: 'Sistem tata letak CSS satu dimensi untuk mengatur susunan, arah, dan perataan item dalam baris/kolom.',
    },
    stickerId: 'rak-buku',
    introducedIn: 'a03-l04',
  },
  {
    id: 'grid-css',
    term: 'CSS Grid',
    pronunciation: 'grid',
    shortDef: {
      junior: 'Cara menata kotak dalam baris dan kolom sekaligus seperti kotak bekal.',
      pro: 'Sistem tata letak CSS dua dimensi untuk menyusun baris dan kolom secara bersamaan.',
    },
    stickerId: 'kotak-bekal',
    introducedIn: 'a03-l05',
  },
  {
    id: 'z-index',
    term: 'Position & z-index',
    pronunciation: 'zet-in-deks',
    shortDef: {
      junior: 'Aturan posisi kotak dan urutan mana yang berada di paling depan.',
      pro: 'Properti CSS untuk mengatur cara penempatan elemen (position) dan urutan tumpukannya (z-index).',
    },
    introducedIn: 'a03-l06',
  },
  // A4 Pabrik JS
  {
    id: 'variabel',
    term: 'Variable',
    pronunciation: 'va-ri-a-bel',
    shortDef: {
      junior: 'Kotak berlabel di JavaScript untuk menyimpan sebuah nilai.',
      pro: 'Wadah bernama (let atau const) untuk menyimpan dan merujuk nilai data di dalam program.',
    },
    stickerId: 'kotak-berlabel',
    introducedIn: 'a04-l01',
  },
  {
    id: 'tipe-data',
    term: 'Tipe Data',
    pronunciation: 'ti-pe da-ta',
    shortDef: {
      junior: 'Jenis isi di dalam kotak: tulisan, angka, benar/salah, atau daftar.',
      pro: 'Kategori nilai dalam JavaScript seperti String, Number, Boolean, Array, dan Object.',
    },
    introducedIn: 'a04-l02',
  },
  {
    id: 'kondisi',
    term: 'Kondisi & Loop',
    pronunciation: 'kon-di-si',
    shortDef: {
      junior: 'Aturan percabangan "kalau begini lakukan itu" dan pengulangan otomatis.',
      pro: 'Struktur kendali if/else untuk keputusan dan perulangan (forEach/for) untuk memproses daftar.',
    },
    introducedIn: 'a04-l03',
  },
  {
    id: 'fungsi',
    term: 'Function',
    pronunciation: 'fang-syen',
    shortDef: {
      junior: 'Resep atau mesin blender bernama yang menerima bahan lalu memberi hasil.',
      pro: 'Blok kode bernama yang dapat dipanggil ulang, menerima parameter masukan, dan mengembalikan nilai.',
    },
    stickerId: 'blender',
    introducedIn: 'a04-l04',
  },
  {
    id: 'dom',
    term: 'DOM',
    pronunciation: 'dom',
    shortDef: {
      junior: 'Pohon susunan halaman yang bisa dicari dan diubah oleh JavaScript.',
      pro: 'Document Object Model; representasi pohon elemen HTML di memori yang dapat dimanipulasi JavaScript.',
    },
    stickerId: 'pohon-dom',
    introducedIn: 'a04-l05',
  },
  {
    id: 'event',
    term: 'Event',
    pronunciation: 'i-ven',
    shortDef: {
      junior: 'Kejadian dari pengguna seperti klik tombol atau mengetik.',
      pro: 'Peristiwa interaksi atau sistem (click, input, submit) yang dapat didengarkan lewat addEventListener.',
    },
    introducedIn: 'a04-l05',
  },
  {
    id: 'fetch',
    term: 'Fetch & Async',
    pronunciation: 'fet-sy',
    shortDef: {
      junior: 'Perintah meminta data dari server sambil tetap membiarkan halaman berjalan.',
      pro: 'API browser berbasis Promise (async/await) untuk melakukan permintaan HTTP asinkron ke server.',
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
      junior: 'Tampilan website yang otomatis menyesuaikan ukuran layar HP, tablet, atau laptop.',
      pro: 'Pendekatan desain dan CSS agar tata letak menyesuaikan lebar layar apa pun secara mulus.',
    },
    stickerId: 'air-wadah',
    introducedIn: 'a05-l01',
  },
  {
    id: 'viewport',
    term: 'Viewport',
    pronunciation: 'vyu-port',
    shortDef: {
      junior: 'Area layar yang terlihat oleh mata pengguna pada perangkatnya.',
      pro: 'Area jendela browser tempat halaman ditampilkan, diatur dengan tag meta viewport di HTML.',
    },
    introducedIn: 'a05-l02',
  },
  {
    id: 'breakpoint',
    term: 'Breakpoint',
    pronunciation: 'brek-poin',
    shortDef: {
      junior: 'Batas lebar layar tempat susunan kotak berubah, misalnya dari 1 kolom ke 2 kolom.',
      pro: 'Titik lebar layar tertentu tempat aturan tata letak berubah menyesuaikan ukuran perangkat.',
    },
    introducedIn: 'a05-l02',
  },
  {
    id: 'media-query',
    term: 'Media Query',
    pronunciation: 'me-di-a kwe-ri',
    shortDef: {
      junior: 'Aturan CSS khusus yang baru aktif saat ukuran layar memenuhi syarat.',
      pro: 'Aturan @media CSS untuk menerapkan gaya secara kondisional berdasarkan lebar viewport atau preferensi.',
    },
    introducedIn: 'a05-l03',
  },
  {
    id: 'mobile-first',
    term: 'Mobile-first',
    pronunciation: 'mo-bail-ferst',
    shortDef: {
      junior: 'Merancang tampilan untuk layar HP lebih dulu, lalu melebarkan untuk tablet dan laptop.',
      pro: 'Strategi CSS memulai dari gaya dasar layar kecil dan menambah penyesuaian lewat min-width.',
    },
    introducedIn: 'a05-l03',
  },
  // A6 Desa UX
  {
    id: 'design-thinking',
    term: 'Design Thinking',
    pronunciation: 'di-zain ting-king',
    shortDef: {
      junior: 'Lima langkah mencari solusi untuk pengguna: pahami, rumuskan, ide, contoh, uji.',
      pro: 'Proses iteratif lima tahap (Empathize, Define, Ideate, Prototype, Test) untuk memecahkan masalah pengguna.',
    },
    stickerId: 'dokter-ux',
    introducedIn: 'a06-l02',
  },
  {
    id: 'persona',
    term: 'Persona',
    pronunciation: 'per-so-na',
    shortDef: {
      junior: 'Tokoh rekaan yang mewakili ciri, tujuan, dan kesulitan pengguna asli.',
      pro: 'Profil tokoh fiktif berbasis riset yang merangkum kebutuhan, kebiasaan, dan pain point kelompok pengguna.',
    },
    introducedIn: 'a06-l03',
  },
  {
    id: 'user-flow',
    term: 'User Flow & Journey',
    pronunciation: 'yu-zer flo',
    shortDef: {
      junior: 'Urutan langkah pengguna di layar dari mulai sampai tugas selesai.',
      pro: 'Diagram alur langkah di aplikasi (user flow) dan peta pengalaman serta emosi menyeluruh (user journey).',
    },
    introducedIn: 'a06-l03',
  },
  {
    id: 'prototype',
    term: 'Mockup & Prototype',
    pronunciation: 'pro-to-taip',
    shortDef: {
      junior: 'Gambar rancangan berwarna (mockup) dan versi yang sudah bisa diklik (prototype).',
      pro: 'Rancangan visual akhir statis (mockup) dan simulasi interaktif sebelum penulisan kode (prototype).',
    },
    stickerId: 'denah-rumah',
    introducedIn: 'a06-l04',
  },
  {
    id: 'usability-testing',
    term: 'Usability Testing',
    pronunciation: 'yu-za-bi-li-ti',
    shortDef: {
      junior: 'Mengajak orang mencoba aplikasi rancangan kita sambil melihat bagian mana yang membingungkan.',
      pro: 'Pengujian langsung rancangan kepada pengguna nyata untuk menemukan hambatan pemakaian sejak dini.',
    },
    introducedIn: 'a06-l05',
  },
  // A7 Galeri Desain
  {
    id: 'hierarki',
    term: 'Hierarki Visual',
    pronunciation: 'hi-e-rar-ki',
    shortDef: {
      junior: 'Mengatur ukuran dan ketebalan agar mata melihat hal terpenting lebih dulu.',
      pro: 'Pengaturan skala, kontras, warna, dan posisi guna memandu urutan perhatian pembaca.',
    },
    stickerId: 'sorotan-galeri',
    introducedIn: 'a07-l01',
  },
  {
    id: 'alignment',
    term: 'Alignment & Proximity',
    pronunciation: 'a-lain-men',
    shortDef: {
      junior: 'Merapikan kotak agar sejajar rapi dan mendekatkan barang yang sekelompok.',
      pro: 'Prinsip kesejajaran pada garis khayal (alignment) dan kedekatan jarak penanda kelompok (proximity).',
    },
    introducedIn: 'a07-l02',
  },
  {
    id: 'whitespace',
    term: 'White Space',
    pronunciation: 'wait-spes',
    shortDef: {
      junior: 'Ruang kosong di sekitar gambar dan teks supaya halaman tidak terasa sesak.',
      pro: 'Ruang negatif di antara elemen yang memberi napas visual, keterbacaan, dan kesan rapi.',
    },
    stickerId: 'etalase-lega',
    introducedIn: 'a07-l03',
  },
  {
    id: 'gestalt',
    term: 'Prinsip Gestalt',
    pronunciation: 'ges-talt',
    shortDef: {
      junior: 'Cara mata manusia otomatis mengelompokkan bentuk yang dekat atau mirip.',
      pro: 'Hukum psikologi persepsi (Proximity, Similarity, Closure, Common Region) dalam mengelompokkan elemen UI.',
    },
    introducedIn: 'a07-l04',
  },
  {
    id: 'hick-law',
    term: "Hick's & Jakob's Law",
    pronunciation: 'hiks lo',
    shortDef: {
      junior: 'Terlalu banyak pilihan bikin lama memilih; ikuti tata letak yang sudah biasa.',
      pro: 'Waktu keputusan bertambah seiring jumlah pilihan (Hick) dan pengguna berharap pola UI familier (Jakob).',
    },
    stickerId: 'warung-menu',
    introducedIn: 'a07-l05',
  },
  {
    id: 'fitts-law',
    term: "Fitts's & Doherty",
    pronunciation: 'fits lo',
    shortDef: {
      junior: 'Tombol besar dan dekat jempol lebih mudah diketuk; tanggapan cepat terasa lancar.',
      pro: 'Kemudahan target bergantung ukuran dan jarak (Fitts), serta batas respons terasa instan di bawah 0,4 detik (Doherty).',
    },
    introducedIn: 'a07-l06',
  },
  {
    id: 'miller-law',
    term: "Miller's & Von Restorff",
    pronunciation: 'mi-ler lo',
    shortDef: {
      junior: 'Ingatan terbatas sehingga info perlu dikelompokkan; yang beda sendiri paling diingat.',
      pro: 'Batas memori kerja 7±2 potong (chunking Miller) dan penonjolan satu aksi pembeda (Von Restorff).',
    },
    introducedIn: 'a07-l07',
  },
  {
    id: 'peak-end',
    term: 'Peak-End & Zeigarnik',
    pronunciation: 'pik-end',
    shortDef: {
      junior: 'Kesan ditentukan momen terbaik dan akhir; tugas yang tanggung ingin cepat dituntaskan.',
      pro: 'Evaluasi pengalaman berdasar puncak dan akhir (Peak-End) serta dorongan menuntaskan progres terbuka (Zeigarnik).',
    },
    introducedIn: 'a07-l08',
  },
  // A8 Studio Warna & Huruf
  {
    id: 'roda-warna',
    term: 'Roda Warna',
    pronunciation: 'ro-da war-na',
    shortDef: {
      junior: 'Lingkaran warna primer, sekunder, dan tersier untuk mencari warna yang cocok.',
      pro: 'Lingkaran hubungan warna primer, sekunder, dan tersier sebagai dasar menyusun skema warna serasi.',
    },
    introducedIn: 'a08-l01',
  },
  {
    id: 'hsl',
    term: 'Hue, Saturation, Lightness',
    pronunciation: 'hyu',
    shortDef: {
      junior: 'Tiga sifat warna: jenis warna, kepekatan, dan terang-gelapnya seperti sirup.',
      pro: 'Model warna berbasis jenis sudut roda (Hue), kemurnian/kepekatan (Saturation), dan kecerahan (Lightness).',
    },
    stickerId: 'sirup-hsl',
    introducedIn: 'a08-l02',
  },
  {
    id: 'skema-warna',
    term: 'Skema Warna',
    pronunciation: 'ske-ma war-na',
    shortDef: {
      junior: 'Resep memilih pasangan warna agar enak dipandang, seperti bersebelahan atau berseberangan.',
      pro: 'Pola kombinasi warna (monokromatik, analog, komplementer, triadik) yang menjaga harmoni dan kontras.',
    },
    introducedIn: 'a08-l03',
  },
  {
    id: 'aturan-60-30-10',
    term: 'Aturan 60-30-10',
    pronunciation: 'e-nam-pu-luh',
    shortDef: {
      junior: 'Takaran warna seimbang: 60% latar, 30% kartu/teks, 10% tombol utama.',
      pro: 'Proporsi distribusi warna: 60% dominan netral, 30% sekunder, dan 10% warna aksen.',
    },
    introducedIn: 'a08-l04',
  },
  {
    id: 'warna-semantik',
    term: 'Warna Semantik',
    pronunciation: 'se-man-tik',
    shortDef: {
      junior: 'Warna pembawa arti khusus, seperti hijau berhasil dan oranye hati-hati, ditemani ikon.',
      pro: 'Warna dengan makna status tetap (success, warning, danger, info) yang wajib dipadukan ikon/teks.',
    },
    introducedIn: 'a08-l05',
  },
  {
    id: 'kontras',
    term: 'Contrast Ratio',
    pronunciation: 'kon-tras',
    shortDef: {
      junior: 'Perbedaan terang dan gelap antara tulisan dan latarnya agar mudah dibaca.',
      pro: 'Perbandingan luminansi teks terhadap latar dengan standar WCAG AA minimal 4.5:1 untuk teks normal.',
    },
    introducedIn: 'a08-l06',
  },
  {
    id: 'hex-rgb',
    term: 'HEX & RGB',
    pronunciation: 'heks',
    shortDef: {
      junior: 'Kode warna komputer berupa enam huruf/angka seperti #E4572E.',
      pro: 'Representasi kode warna digital berbasis heksadesimal (#RRGGBB), rgb(), dan hsl() di CSS.',
    },
    introducedIn: 'a08-l07',
  },
  {
    id: 'tipografi',
    term: 'Tipografi',
    pronunciation: 'ti-po-gra-fi',
    shortDef: {
      junior: 'Cara memilih jenis huruf dan mengatur jarak baris supaya enak dibaca.',
      pro: 'Seni dan teknik menata jenis huruf (serif, sans-serif, monospace), ukuran, line-height, dan panjang baris.',
    },
    introducedIn: 'a08-l08',
  },
  {
    id: 'type-scale',
    term: 'Type Scale',
    pronunciation: 'taip-skel',
    shortDef: {
      junior: 'Tangga ukuran huruf tetap untuk judul besar, subjudul, dan teks biasa.',
      pro: 'Sistem ukuran huruf bertingkat yang konsisten dari caption hingga display heading.',
    },
    introducedIn: 'a08-l09',
  },
  // A9 Toko Komponen
  {
    id: 'grid-8pt',
    term: 'Grid 12 Kolom & 8pt',
    pronunciation: 'de-la-pan-poin',
    shortDef: {
      junior: 'Aturan jarak kelipatan 4 atau 8 piksel supaya seluruh kotak selalu rapi.',
      pro: 'Sistem grid 12 kolom dan skala jarak kelipatan 4/8 px untuk konsistensi tata letak.',
    },
    introducedIn: 'a09-l01',
  },
  {
    id: 'komponen-ui',
    term: 'Komponen UI',
    pronunciation: 'kom-po-nen',
    shortDef: {
      junior: 'Bagian antarmuka yang bisa dipakai berkali-kali, seperti tombol, kartu, dan modal.',
      pro: 'Elemen antarmuka modular dan dapat digunakan ulang seperti Button, Input, Card, Modal, dan Toast.',
    },
    stickerId: 'lego-ds',
    introducedIn: 'a09-l02',
  },
  {
    id: 'state-ui',
    term: 'State Komponen',
    pronunciation: 'stet',
    shortDef: {
      junior: 'Wajah tombol yang berubah saat disentuh, ditekan, memuat, atau mati.',
      pro: 'Keadaan visual dan fungsional komponen: default, hover, focus, active, loading, disabled, dan error.',
    },
    introducedIn: 'a09-l03',
  },
  {
    id: 'gaya-ui',
    term: 'Gaya Visual UI',
    pronunciation: 'ga-ya yu-ai',
    shortDef: {
      junior: 'Pakaian tampilan aplikasi, misalnya datar rapi (Flat 2.0) atau gembung seperti tanah liat.',
      pro: 'Bahasa visual seperti Flat 2.0, Material, Glassmorphism, Neumorphism, Neo-brutalism, dan Bento Grid.',
    },
    introducedIn: 'a09-l04',
  },
  {
    id: 'design-token',
    term: 'Design System & Token',
    pronunciation: 'di-zain to-ken',
    shortDef: {
      junior: 'Kumpulan keping aturan dan nama warna bersama agar semua layar seragam.',
      pro: 'Sistem aturan bersama beserta variabel bernama (design tokens) untuk warna, jarak, radius, dan huruf.',
    },
    stickerId: 'lego-ds',
    introducedIn: 'a09-l05',
  },
  {
    id: 'atomic-design',
    term: 'Atomic Design',
    pronunciation: 'a-to-mik',
    shortDef: {
      junior: 'Menyusun antarmuka dari bagian terkecil (tombol) hingga menjadi satu halaman penuh.',
      pro: 'Metodologi menyusun UI bertahap dari Atom, Molecule, Organism, Template hingga Page.',
    },
    introducedIn: 'a09-l06',
  },
  // A10 Taman Ramah Semua
  {
    id: 'aksesibilitas',
    term: 'Aksesibilitas (a11y)',
    pronunciation: 'ak-se-si-bi-li-tas',
    shortDef: {
      junior: 'Membuat website ramah dipakai semua orang, termasuk yang memakai pembaca layar atau keyboard.',
      pro: 'Praktik merancang web agar dapat digunakan oleh semua orang termasuk penyandang disabilitas maupun situasi terbatas.',
    },
    stickerId: 'bidang-miring',
    introducedIn: 'a10-l01',
  },
  {
    id: 'pour',
    term: 'Prinsip POUR & ARIA',
    pronunciation: 'po-ur',
    shortDef: {
      junior: 'Empat syarat web ramah: terlihat/terdengar, bisa dikendalikan, mudah paham, dan kokoh.',
      pro: 'Empat prinsip WCAG (Perceivable, Operable, Understandable, Robust) beserta atribut bantu ARIA.',
    },
    introducedIn: 'a10-l02',
  },
  // A11 Menara Alat
  {
    id: 'library-framework',
    term: 'Library vs Framework',
    pronunciation: 'laib-re-ri',
    shortDef: {
      junior: 'Library itu perabot yang kita pilih sendiri; framework itu rumah lengkap dengan aturannya.',
      pro: 'Library adalah pustaka yang dipanggil oleh kodemu, sedangkan framework mengatur struktur kerja aplikasimu.',
    },
    introducedIn: 'a11-l01',
  },
  {
    id: 'react-komponen',
    term: 'Props & State',
    pronunciation: 'props',
    shortDef: {
      junior: 'Kiriman data dari induk ke anak komponen (props) dan ingatan di dalam komponen (state).',
      pro: 'Mekanisme data di React/Vue/Svelte: props untuk input baca-saja dan state untuk data reaktif internal.',
    },
    introducedIn: 'a11-l02',
  },
  {
    id: 'tailwind-css',
    term: 'Utility vs Component CSS',
    pronunciation: 'teil-win',
    shortDef: {
      junior: 'Cara cepat menata CSS memakai class kecil siap pakai atau komponen jadi.',
      pro: 'Pendekatan utility-first (Tailwind CSS) dibanding component-first (Bootstrap) beserta perbandingan CSR, SSR, dan SSG.',
    },
    introducedIn: 'a11-l03',
  },
  {
    id: 'core-web-vitals',
    term: 'Core Web Vitals',
    pronunciation: 'kor web vai-tels',
    shortDef: {
      junior: 'Tiga nilai kecepatan halaman: cepat muncul (LCP), cepat menanggapi (INP), dan tidak loncat (CLS).',
      pro: 'Metrik performa Google: Largest Contentful Paint (<2.5s), Interaction to Next Paint (<200ms), dan Cumulative Layout Shift (<0.1).',
    },
    introducedIn: 'a11-l04',
  },
  {
    id: 'seo',
    term: 'SEO',
    pronunciation: 'es-e-o',
    shortDef: {
      junior: 'Cara merapikan judul dan isi halaman agar mudah ditemukan di mesin pencari.',
      pro: 'Search Engine Optimization; optimasi judul, meta description, HTML semantik, dan URL agar mudah diindeks.',
    },
    introducedIn: 'a11-l05',
  },
  {
    id: 'git',
    term: 'Git & Branch',
    pronunciation: 'git',
    shortDef: {
      junior: 'Mesin titik simpan game untuk kode agar bisa kembali jika ada salah langkah.',
      pro: 'Sistem pengontrol versi terdistribusi untuk mencatat commit, membuat branch, dan menggabungkan perubahan.',
    },
    stickerId: 'titik-simpan-git',
    introducedIn: 'a11-l06',
  },
  {
    id: 'deploy',
    term: 'Deploy & DevTools',
    pronunciation: 'di-ploi',
    shortDef: {
      junior: 'Menayangkan website ke internet serta memakai alat periksa browser.',
      pro: 'Alur kerja handoff, slicing, uji lintas browser di DevTools, dan penayangan aplikasi (deploy) ke produksi.',
    },
    introducedIn: 'a11-l07',
  },
  // A12 Benteng Keamanan
  {
    id: 'sanitasi',
    term: 'Validasi & Escaping',
    pronunciation: 'sa-ni-ta-si',
    shortDef: {
      junior: 'Memeriksa dan menetralkan semua ketikan pengunjung sebelum ditampilkan atau disimpan.',
      pro: 'Mengubah karakter khusus menjadi teks aman (escaping) serta memvalidasi masukan di client dan server.',
    },
    stickerId: 'brankas-bank',
    introducedIn: 'a12-l01',
  },
  {
    id: 'xss',
    term: 'XSS (Cross-Site Scripting)',
    pronunciation: 'eks-es-es',
    shortDef: {
      junior: 'Celah saat tulisan pengunjung berisi kode nakal ikut dijalankan halaman.',
      pro: 'Serangan injeksi skrip berbahaya ke halaman web; dicegah dengan textContent/auto-escaping dan CSP.',
    },
    stickerId: 'papan-pengumuman',
    introducedIn: 'a12-l02',
  },
  {
    id: 'csrf',
    term: 'CSRF & Clickjacking',
    pronunciation: 'ce-es-er-ef',
    shortDef: {
      junior: 'Trik yang memaksa browser mengirim perintah diam-diam atau mengklik tombol tersembunyi.',
      pro: 'Serangan permintaan palsu lintas situs (CSRF) dan penyamaran tombol dalam iframe (clickjacking).',
    },
    introducedIn: 'a12-l03',
  },
  {
    id: 'rahasia-frontend',
    term: 'Kunci Rahasia & .env',
    pronunciation: 'dot en-vi',
    shortDef: {
      junior: 'Aturan melarang menaruh kata sandi atau kunci rahasia di kode yang terbuka di browser.',
      pro: 'Pemisahan variabel rahasia hanya di server karena seluruh kode dan variabel browser dapat dilihat lewat DevTools.',
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
      junior: 'Pelayan beserta buku menu yang menghubungkan permintaan halaman dengan dapur server.',
      pro: 'Application Programming Interface; antarmuka kontrak resmi agar satu program dapat berkomunikasi dengan program lain.',
    },
    stickerId: 'pelayan-menu',
    introducedIn: 'b01-l01',
  },
  {
    id: 'endpoint',
    term: 'Endpoint',
    pronunciation: 'end-poin',
    shortDef: {
      junior: 'Alamat menu khusus di server untuk satu jenis permintaan, seperti /produk.',
      pro: 'Titik alamat URL tertentu pada sebuah API yang melayani satu jenis operasi atau sumber daya.',
    },
    stickerId: 'pelayan-menu',
    introducedIn: 'b01-l02',
  },
  {
    id: 'sdk',
    term: 'SDK & Open/Private API',
    pronunciation: 'es-de-ka',
    shortDef: {
      junior: 'Paket alat siap pakai yang membungkus API agar lebih gampang dipanggil.',
      pro: 'Software Development Kit pembungkus API, serta kategori Public, Private, Partner, dan Composite API.',
    },
    introducedIn: 'b01-l03',
  },
  {
    id: 'kontrak-api',
    term: 'Kontrak API',
    pronunciation: 'kon-trak',
    shortDef: {
      junior: 'Janji antara frontend dan backend tentang bentuk pesanan dan bentuk jawabannya.',
      pro: 'Kesepakatan struktur request dan response yang dijaga lewat dokumentasi dan versi agar tidak merusak client.',
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
      junior: 'Kata kerja surat pesanan: ambil (GET), buat (POST), ubah (PATCH/PUT), hapus (DELETE).',
      pro: 'Kata kerja standar HTTP yang memetakan operasi Create, Read, Update, dan Delete.',
    },
    stickerId: 'surat-pesanan',
    introducedIn: 'b02-l02',
  },
  {
    id: 'idempotent',
    term: 'Safe & Idempotent',
    pronunciation: 'ai-dem-po-ten',
    shortDef: {
      junior: 'Permintaan yang ditekan berkali-kali hasilnya tetap sama, seperti tombol lift.',
      pro: 'Sifat operasi tidak mengubah data (safe) dan pengulangan request memberi hasil akhir identik (idempotent).',
    },
    stickerId: 'tombol-lift',
    introducedIn: 'b02-l03',
  },
  {
    id: 'status-code',
    term: 'Kode Status HTTP',
    pronunciation: 'sta-tus kod',
    shortDef: {
      junior: 'Angka 3 digit jawaban cepat dari server: 2xx berhasil, 4xx salah minta, 5xx dapur bermasalah.',
      pro: 'Kode respons tiga digit (200, 201, 304, 400, 401, 403, 404, 429, 500) yang merangkum hasil request.',
    },
    introducedIn: 'b02-l04',
  },
  {
    id: 'header-body',
    term: 'Path, Query, Header, Body',
    pronunciation: 'he-der',
    shortDef: {
      junior: 'Empat bagian surat HTTP untuk menaruh alamat, saringan, keterangan amplop, dan isi paket.',
      pro: 'Komponen pengiriman data HTTP: path param (target), query param (filter), header (metadata), dan body (payload).',
    },
    stickerId: 'surat-pesanan',
    introducedIn: 'b02-l05',
  },
  {
    id: 'cookie-cache',
    term: 'Cookie & Cache (ETag)',
    pronunciation: 'ku-ki',
    shortDef: {
      junior: 'Cap tangan penanda pengunjung dan simpanan sementara supaya tidak unduh ulang.',
      pro: 'Cookie untuk state sesi otomatis dan Cache-Control/ETag (304 Not Modified) untuk efisiensi jaringan.',
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
      junior: 'Format formulir teks berlabel yang paling sering dipakai untuk bertukar data API.',
      pro: 'JavaScript Object Notation; format pertukaran data berbasis teks ringan berisi pasangan key-value.',
    },
    stickerId: 'formulir-json',
    introducedIn: 'b03-l01',
  },
  {
    id: 'serialisasi',
    term: 'Serialisasi',
    pronunciation: 'se-ri-a-li-sa-si',
    shortDef: {
      junior: 'Membongkar dan mengemas data menjadi teks agar muat dikirim lewat internet.',
      pro: 'Proses mengubah struktur object di memori menjadi teks/biner (JSON.stringify) dan merakitnya kembali (JSON.parse).',
    },
    stickerId: 'pindahan-lemari',
    introducedIn: 'b03-l03',
  },
  {
    id: 'protobuf',
    term: 'XML, FormData & Protobuf',
    pronunciation: 'pro-to-baf',
    shortDef: {
      junior: 'Format data selain JSON: XML untuk sistem lama, FormData untuk unggah file, Protobuf untuk kilat.',
      pro: 'Alternatif format pertukaran data selain JSON sesuai kebutuhan kompatibilitas, unggah berkas, atau efisiensi biner.',
    },
    introducedIn: 'b03-l04',
  },
  // B4 Peta Jenis API
  {
    id: 'rest',
    term: 'REST API',
    pronunciation: 'rest',
    shortDef: {
      junior: 'Cara memesan data berdasarkan nama benda dan kata kerja HTTP seperti di perpustakaan.',
      pro: 'Arsitektur API stateless berbasis resource (kata benda pada URL) dan method HTTP seragam.',
    },
    stickerId: 'perpustakaan-rest',
    introducedIn: 'b04-l02',
  },
  {
    id: 'pagination',
    term: 'Pagination & Versioning',
    pronunciation: 'pa-ji-ne-syen',
    shortDef: {
      junior: 'Membagi daftar panjang per halaman dan memberi nomor versi menu API.',
      pro: 'Pembagian data halaman (offset/cursor), format error seragam, dan pemisahan versi /v1 /v2.',
    },
    introducedIn: 'b04-l03',
  },
  {
    id: 'graphql',
    term: 'GraphQL',
    pronunciation: 'graf-kyu-el',
    shortDef: {
      junior: 'Pelayan pribadi yang membawakan persis kolom data yang kamu tulis di daftar.',
      pro: 'Bahasa query API satu pintu (query, mutation, subscription) yang mencegah over-fetching dan under-fetching.',
    },
    stickerId: 'pelayan-pribadi',
    introducedIn: 'b04-l04',
  },
  {
    id: 'grpc',
    term: 'gRPC',
    pronunciation: 'ji-ar-pi-si',
    shortDef: {
      junior: 'Interkom kilat berkode angka untuk percakapan antar server.',
      pro: 'Kerangka RPC berkecepatan tinggi berbasis HTTP/2 dan Protobuf dengan kontrak .proto.',
    },
    stickerId: 'interkom-grpc',
    introducedIn: 'b04-l05',
  },
  {
    id: 'trpc-soap',
    term: 'SOAP, JSON-RPC, tRPC',
    pronunciation: 'ti-ar-pi-si',
    shortDef: {
      junior: 'Saudara API tanya-jawab: surat dinas bank (SOAP), SMS singkat (JSON-RPC), saudara TypeScript (tRPC).',
      pro: 'Varian protokol tanya-jawab untuk sistem enterprise XML, RPC ringan, dan full-stack TypeScript.',
    },
    introducedIn: 'b04-sq1',
  },
  // B5 Menara Realtime
  {
    id: 'polling',
    term: 'Polling',
    pronunciation: 'po-ling',
    shortDef: {
      junior: 'Menanya ke server berulang kali setiap beberapa detik apakah sudah ada kabar baru.',
      pro: 'Teknik mengirim permintaan HTTP berkala dengan interval tetap untuk memeriksa pembaruan data.',
    },
    stickerId: 'tanya-berulang',
    introducedIn: 'b05-l01',
  },
  {
    id: 'long-polling',
    term: 'Long Polling',
    pronunciation: 'long po-ling',
    shortDef: {
      junior: 'Bertanya ke server lalu menunggu di sambungan sampai benar-benar ada kabar.',
      pro: 'Teknik HTTP ketika server menahan respons hingga ada data baru atau timeout sebelum client bertanya ulang.',
    },
    introducedIn: 'b05-l02',
  },
  {
    id: 'sse',
    term: 'SSE (Server-Sent Events)',
    pronunciation: 'es-es-e',
    shortDef: {
      junior: 'Seperti siaran radio satu arah: server terus mengirim kabar baru ke browser.',
      pro: 'Standar HTTP satu arah (EventSource) bagi server untuk mengalirkan event teks secara berkelanjutan ke client.',
    },
    stickerId: 'radio',
    introducedIn: 'b05-l03',
  },
  {
    id: 'websocket',
    term: 'WebSocket',
    pronunciation: 'web-so-ket',
    shortDef: {
      junior: 'Sambungan telepon dua arah yang terus terbuka antara browser dan server.',
      pro: 'Protokol koneksi full-duplex persisten setelah handshake HTTP 101 untuk komunikasi dua arah realtime.',
    },
    stickerId: 'telepon',
    introducedIn: 'b05-l04',
  },
  {
    id: 'webrtc',
    term: 'WebRTC',
    pronunciation: 'web-ar-ti-si',
    shortDef: {
      junior: 'Walkie-talkie langsung antar browser untuk panggilan video setelah dikenalkan server.',
      pro: 'Teknologi komunikasi peer-to-peer langsung antar browser dengan bantuan server signaling, STUN, dan TURN.',
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
      junior: 'Kurir yang memencet bel servermu otomatis saat suatu kejadian selesai, seperti bayar lunas.',
      pro: 'Panggilan HTTP POST otomatis dari layanan penyedia menuju URL server terdaftar saat event terjadi.',
    },
    stickerId: 'bel-pintu',
    introducedIn: 'b06-l01',
  },
  {
    id: 'signature-webhook',
    term: 'Webhook Signature',
    pronunciation: 'sig-na-tyur',
    shortDef: {
      junior: 'Segel cap rahasia agar server yakin bel webhook datang dari kurir asli.',
      pro: 'Verifikasi tanda tangan kriptografis (HMAC) di header webhook ditambah sifat penerima idempotent.',
    },
    introducedIn: 'b06-l02',
  },
  {
    id: 'queue-pubsub',
    term: 'Message Queue & Pub/Sub',
    pronunciation: 'kyu',
    shortDef: {
      junior: 'Nomor antrean pekerja dan papan pengumuman grup untuk sistem besar.',
      pro: 'Arsitektur event-driven memakai antrean pesan satu penerima (queue) dan siaran topik banyak penerima (Pub/Sub).',
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
      junior: 'Membuktikan siapa kamu (autentikasi) dan apa saja yang boleh kamu buka (otorisasi).',
      pro: 'Verifikasi identitas pengguna (AuthN -> 401) serta pemeriksaan hak akses terhadap sumber daya (AuthZ -> 403).',
    },
    stickerId: 'kartu-hotel',
    introducedIn: 'b07-l01',
  },
  {
    id: 'api-key',
    term: 'API Key & Session',
    pronunciation: 'e-pi-ai ki',
    shortDef: {
      junior: 'Kode rahasia pengenal aplikasi atau nomor loker catatan login di server.',
      pro: 'Mekanisme identitas dengan kunci rahasia aplikasi (API Key), catatan server (Session Cookie), atau Bearer Token.',
    },
    introducedIn: 'b07-l02',
  },
  {
    id: 'jwt',
    term: 'JWT (JSON Web Token)',
    pronunciation: 'jot',
    shortDef: {
      junior: 'Gelang konser berhologram yang isinya bisa dibaca tetapi tidak bisa dipalsukan.',
      pro: 'Token tiga bagian (Header.Payload.Signature) bertanda tangan server yang mudah diverifikasi tanpa database.',
    },
    stickerId: 'gelang-hologram',
    introducedIn: 'b07-l03',
  },
  {
    id: 'refresh-token',
    term: 'Access & Refresh Token',
    pronunciation: 'ri-fres to-ken',
    shortDef: {
      junior: 'Gelang harian yang berumur pendek dan kartu member untuk menukar gelang baru.',
      pro: 'Pemisahan token akses berumur singkat dengan refresh token berumur panjang di cookie HttpOnly.',
    },
    introducedIn: 'b07-l04',
  },
  {
    id: 'oauth',
    term: 'OAuth 2.0 & PKCE',
    pronunciation: 'o-oth',
    shortDef: {
      junior: 'Kunci valet untuk memberi izin terbatas ke aplikasi lain tanpa memberi kata sandi utama.',
      pro: 'Protokol otorisasi akses berbatas scope dengan alur Authorization Code + PKCE serta OIDC untuk login.',
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
      junior: 'Aturan satpam browser tentang situs mana saja yang boleh membaca data dari alamat lain.',
      pro: 'Cross-Origin Resource Sharing; mekanisme header izin di server agar browser mengizinkan bacaan lintas origin.',
    },
    stickerId: 'satpam-apartemen',
    introducedIn: 'b08-l01',
  },
  {
    id: 'rate-limit',
    term: 'Rate Limiting',
    pronunciation: 'ret li-mit',
    shortDef: {
      junior: 'Batas jumlah pesanan per menit agar server tidak kewalahan dan adil untuk semua.',
      pro: 'Pembatasan frekuensi request per klien (menjawab 429 Too Many Requests dan Retry-After).',
    },
    stickerId: 'wahana-bermain',
    introducedIn: 'b08-l02',
  },
  {
    id: 'backoff',
    term: 'Retry & Exponential Backoff',
    pronunciation: 'bek-of',
    shortDef: {
      junior: 'Mencoba menelepon ulang dengan jeda makin lama dan sopan saat server sibuk.',
      pro: 'Strategi pengulangan kegagalan sementara (5xx/429) dengan penggandaan jeda (1, 2, 4s) plus jitter.',
    },
    stickerId: 'telepon-sopan',
    introducedIn: 'b08-l03',
  },
  {
    id: 'idempotency-key',
    term: 'Idempotency Key',
    pronunciation: 'ai-dem-po-ten-si',
    shortDef: {
      junior: 'Nomor nota unik supaya tombol bayar yang tertekan dua kali tidak menagih ganda.',
      pro: 'Kunci unik pada header POST untuk menjamin transaksi sensitif seperti pembayaran hanya diproses satu kali.',
    },
    stickerId: 'nomor-nota',
    introducedIn: 'b08-l04',
  },
  {
    id: 'bola-idor',
    term: 'BOLA / IDOR & OWASP API',
    pronunciation: 'bo-la',
    shortDef: {
      junior: 'Celah saat mengganti nomor ID di alamat bisa mengintip pesanan milik orang lain.',
      pro: 'Celah otorisasi level objek (BOLA), mass assignment, dan kebocoran data berlebih yang wajib dicegah server.',
    },
    introducedIn: 'b08-l05',
  },
  // B9 Dapur Frontend
  {
    id: 'empat-keadaan',
    term: 'Empat Keadaan Layar',
    pronunciation: 'em-pat ke-a-da-an',
    shortDef: {
      junior: 'Empat wajah halaman saat ambil data: sedang memuat, gagal, kosong, dan berhasil.',
      pro: 'Perancangan lengkap state UI asinkron: loading (skeleton), error (tombol ulang), empty state, dan success.',
    },
    stickerId: 'empat-wajah',
    introducedIn: 'b09-l02',
  },
  {
    id: 'debounce',
    term: 'Debounce & AbortController',
    pronunciation: 'di-bauns',
    shortDef: {
      junior: 'Menunggu sebentar sampai selesai mengetik dan membatalkan pencarian lama.',
      pro: 'Teknik menunda eksekusi input (debounce) dan membatalkan fetch yang sudah kedaluwarsa lewat AbortController.',
    },
    introducedIn: 'b09-l03',
  },
  {
    id: 'optimistic-ui',
    term: 'Cache Client & Optimistic UI',
    pronunciation: 'op-ti-mis-tik',
    shortDef: {
      junior: 'Mengubah tampilan langsung sambil menyimpan hasil agar cepat dan hemat request.',
      pro: 'Pola stale-while-revalidate untuk cache memori serta pembaruan antarmuka optimistik dengan rollback bila gagal.',
    },
    introducedIn: 'b09-l04',
  },
  {
    id: 'bff',
    term: 'BFF (Backend for Frontend)',
    pronunciation: 'bi-ef-ef',
    shortDef: {
      junior: 'Server kecil milikmu sendiri yang menyimpan kunci rahasia agar aman dari browser.',
      pro: 'Pola server perantara khusus frontend untuk menyembunyikan API key rahasia dan merangkum respons.',
    },
    introducedIn: 'b09-l05',
  },
  {
    id: 'openapi',
    term: 'OpenAPI & Mock API',
    pronunciation: 'o-pen e-pi-ai',
    shortDef: {
      junior: 'Buku menu resmi API dan dapur tiruan agar frontend bisa berlatih sebelum server asli jadi.',
      pro: 'Standar spesifikasi kontrak REST (OpenAPI/Swagger) serta penggunaan Mock API (MSW) untuk uji mandiri.',
    },
    introducedIn: 'b09-l06',
  },
];

export const GLOSSARY_BY_ID: Record<string, GlossaryTerm> = Object.fromEntries(
  GLOSSARY_TERMS.map((t) => [t.id, t]),
);
