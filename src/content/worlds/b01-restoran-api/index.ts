import {
  conceptStep,
  limitStep,
  makeAnchorMcq,
  makeLesson,
  makeMcq,
  makeTf,
  qStep,
  rBold,
  rCode,
  rJunior,
  rPro,
  rTerm,
  rText,
  simStep,
  storyStep,
  t,
} from '@/content/lessonHelpers';
import type { Lesson, Mode, Rich, World } from '@/content/schema';

/** Kata istilah yang hanya tampil di satu mode, supaya jalur Junior dan Pro tetap terpisah (copydeck 7.2). */
const rTermIn = (mode: Mode, termId: string, text: string): Rich => ({
  t: 'term',
  termId,
  v: t(text),
  modes: [mode],
});

/** Teks tebal yang hanya tampil di satu mode. */
const rBoldIn = (mode: Mode, text: string): Rich => ({ t: 'bold', v: t(text), modes: [mode] });

export const world: World = {
  id: 'b01',
  track: 'B',
  order: 1,
  title: 'Restoran API',
  tagline: t(
    'Kenalan dengan pelayan dan buku menu. Mereka menghubungkan satu aplikasi dengan aplikasi lain.',
    'Kamu bisa menjelaskan API, yaitu kontrak yang mengatur cara dua aplikasi saling meminta dan mengirim data.',
  ),
  color: '#0E9AA7',
  illustration: 'b01-restoran-api',
  sourceChapters: ['J2-01'],
  requires: ['a01'],
  lessons: ['b01-l01', 'b01-l02', 'b01-l03', 'b01-l04'],
  sideQuests: [],
  boss: {
    title: 'Tantangan Penjaga Restoran',
    greeting: t(
      'Selamat datang di Restoran API! Ayo tunjukkan kamu paham tugas pelayan dan buku menunya.',
      'Jawab soal tentang API, client, dan server. Lalu buktikan pahammu soal jenis API, SDK, dan kontraknya.',
    ),
    guardianName: 'Penjaga Restoran',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'b01-anc-j1',
        prompt: t(
          'Siapa yang membawa pesanan tamu ke dapur?',
          'Dalam cerita restoran, siapa yang menghubungkan tamu dengan dapur?',
        ),
        choices: [
          { id: 'api', label: t('Pelayan dan buku menu') },
          {
            id: 'kompor',
            label: t('Kompor di dapur'),
            explainWrong: t(
              'Kompor ada di dalam dapur. Ia tidak berjalan ke meja tamu.',
              'Kompor ada di dalam dapur server. Ia tidak menghubungkan tamu dengan dapur.',
            ),
          },
          {
            id: 'kursi',
            label: t('Kursi ruang makan'),
            explainWrong: t(
              'Kursi hanya tempat duduk tamu. Ia tidak membawa pesanan.',
              'Kursi hanya tempat duduk tamu. Bagian itu tidak membawa pesanan ke dapur.',
            ),
          },
        ],
        answer: 'api',
        explainCorrect: t(
          'Pelayan dan buku menu menghubungkan tamu dengan dapur. Di web, itulah API.',
          'API dan buku menunya menghubungkan tamu dengan dapur. Tamu tidak perlu masuk dapur.',
        ),
        tags: ['api'],
      }),
      makeAnchorMcq({
        id: 'b01-anc-j2',
        prompt: t(
          'Untuk memakai API, kamu perlu tahu apa?',
          'Apa yang perlu diketahui pemakai agar bisa memakai API?',
        ),
        choices: [
          { id: 'no', label: t('Cara memesan lewat menu', 'Cara memesan lewat aturan API') },
          {
            id: 'yes',
            label: t('Cara masuk ke dapur', 'Cara masuk ke dapur server'),
            explainWrong: t(
              'Tamu tidak boleh masuk dapur. Ia memesan lewat pelayan.',
              'Pemakai tidak perlu masuk ke dapur server. API sudah menjadi pintunya.',
            ),
          },
          {
            id: 'cook',
            label: t('Cara memasak datanya sendiri', 'Cara menyiapkan datanya sendiri'),
            explainWrong: t(
              'Dapur yang memasak. Tamu hanya menerima hasilnya.',
              'Server yang menyiapkan data. Pemakai hanya menerima hasilnya.',
            ),
          },
        ],
        answer: 'no',
        explainCorrect: t(
          'Tamu cukup tahu cara memesan. Dapur menyiapkan isinya.',
          'API menyembunyikan kerumitan dapur dan hanya memberi cara meminta yang rapi.',
        ),
        tags: ['api'],
      }),
      makeAnchorMcq({
        id: 'b01-anc-j3',
        prompt: t(
          'Alamat khusus untuk satu jenis pesanan disebut apa?',
          'Alamat khusus di server untuk satu jenis permintaan disebut apa?',
        ),
        choices: [
          { id: 'ep', label: t('Endpoint') },
          {
            id: 'css',
            label: t('Browser'),
            explainWrong: t(
              'Browser adalah tamu yang meminta. Ia bukan alamat tujuan.',
              'Browser adalah pihak yang meminta. Ia bukan alamat tujuan.',
            ),
          },
          {
            id: 'plug',
            label: t('Response'),
            explainWrong: t(
              'Response adalah jawaban yang pulang. Ia bukan alamat tujuan.',
              'Response adalah balasan dari server. Ia bukan alamat tujuan.',
            ),
          },
        ],
        answer: 'ep',
        explainCorrect: t(
          'Endpoint adalah alamat untuk satu jenis pesanan. Seperti satu baris di buku menu.',
          'Endpoint adalah alamat tujuan untuk satu jenis permintaan, seperti /produk.',
        ),
        tags: ['endpoint'],
      }),
      makeAnchorMcq({
        id: 'b01-anc-j4',
        prompt: t(
          'Browser atau HP meminta isi dari dapur. Mereka berperan sebagai apa?',
          'Pihak yang meminta data, seperti browser atau aplikasi HP, disebut apa?',
        ),
        choices: [
          { id: 'cli', label: t('Tamu', 'Client') },
          {
            id: 'srv',
            label: t('Server'),
            explainWrong: t(
              'Server adalah dapur yang menjawab permintaan. Tamulah yang meminta.',
              'Server adalah pihak yang menjawab permintaan. Client yang meminta.',
            ),
          },
          {
            id: 'menu',
            label: t('Buku menu'),
            explainWrong: t(
              'Buku menu adalah daftar aturan memesan. Ia bukan pihak peminta.',
              'Buku menu adalah daftar aturan API. Ia bukan pihak peminta.',
            ),
          },
        ],
        answer: 'cli',
        explainCorrect: t(
          'Tamu adalah pihak yang meminta. Seperti anak yang memesan di kantin.',
          'Client adalah pihak yang mengirim permintaan ke server.',
        ),
        tags: ['browser', 'request'],
      }),
      makeAnchorMcq({
        id: 'b01-anc-j5',
        prompt: t(
          'Dapur mengganti tulisan "harga" jadi "biaya" tanpa memberi kabar. Apa akibatnya?',
          'Apa akibatnya jika backend diam-diam mengganti nama data dalam jawaban API?',
        ),
        choices: [
          { id: 'brk', label: t('Layar tamu menjadi kosong', 'Tampilan frontend bisa kosong atau error') },
          {
            id: 'clr',
            label: t('Layar menebak tulisan barunya sendiri', 'Frontend menebak nama baru dengan benar'),
            explainWrong: t(
              'Layar hanya mencari tulisan yang dijanjikan. Ia tidak bisa menebak.',
              'Frontend hanya membaca nama yang dijanjikan kontrak. Ia tidak bisa menebak nama baru.',
            ),
          },
          {
            id: 'pwr',
            label: t('Dapur bekerja lebih cepat', 'Backend menjawab lebih cepat'),
            explainWrong: t(
              'Mengganti tulisan tidak membuat dapur lebih cepat. Layar justru kehilangan isinya.',
              'Mengganti nama tidak mempercepat jawaban. Frontend justru kehilangan datanya.',
            ),
          },
        ],
        answer: 'brk',
        explainCorrect: t(
          'Layar mencari tulisan "harga" dan tidak menemukannya. Karena itu janji harus ditepati.',
          'Frontend mencari nama yang dijanjikan kontrak dan tidak menemukannya. Halaman bisa rusak.',
        ),
        tags: ['kontrak-api'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'b01-anc-p1',
        prompt: t('Apa keuntungan memakai satu API yang sama untuk web, Android, dan iOS?'),
        choices: [
          { id: 'reuse', label: t('Satu backend melayani banyak tampilan dengan aturan sama') },
          {
            id: 'nocss',
            label: t('Setiap platform memakai tampilan yang sama persis'),
            explainWrong: t('Setiap platform tetap punya tampilannya sendiri. API hanya menyamakan cara meminta data.'),
          },
          {
            id: 'nodns',
            label: t('Data tersimpan di tiap HP, jadi server tidak dibutuhkan'),
            explainWrong: t('Data tetap berada di server. Web API dipanggil lewat alamat URL.'),
          },
        ],
        answer: 'reuse',
        explainCorrect: t('Satu backend melayani banyak platform lewat API yang sama. Tim tidak perlu membuat layanan baru untuk tiap platform.'),
        tags: ['api', 'backend'],
      }),
      makeAnchorMcq({
        id: 'b01-anc-p2',
        prompt: t('Mana pasangan peran yang benar dalam komunikasi API?'),
        choices: [
          { id: 'pair', label: t('Client mengirim request ke endpoint, lalu server membalas dengan response') },
          {
            id: 'rev',
            label: t('Server mengirim request ke client, lalu client membalas dengan response'),
            explainWrong: t('Pada pola dasar, client yang memulai dengan request. Server hanya membalas.'),
          },
          {
            id: 'same',
            label: t('Endpoint adalah komputer yang menjawab, dan server adalah alamatnya'),
            explainWrong: t('Endpoint adalah alamat tujuan. Server adalah komputer yang menjawab.'),
          },
        ],
        answer: 'pair',
        explainCorrect: t('Client memanggil endpoint dengan request. Server membalas dengan response.'),
        tags: ['endpoint', 'request', 'response'],
      }),
      makeAnchorMcq({
        id: 'b01-anc-p3',
        prompt: t('Mana contoh Browser API, bukan Web API lewat internet?'),
        choices: [
          { id: 'bapi', label: t('navigator.geolocation dan localStorage') },
          {
            id: 'wapi',
            label: t('https://api.toko-rani.example/produk'),
            explainWrong: t('Itu Web API. Ia diakses lewat jaringan HTTP.'),
          },
          {
            id: 'os',
            label: t('Fungsi sistem file di server'),
            explainWrong: t('Itu berjalan di server atau sistem operasi. Browser tidak memakainya.'),
          },
        ],
        answer: 'bapi',
        explainCorrect: t('Browser API menyediakan fitur perangkat dan penyimpanan lokal. Ia tidak lewat internet.'),
        tags: ['api', 'browser'],
      }),
      makeAnchorMcq({
        id: 'b01-anc-p4',
        prompt: t('Perusahaan ekspedisi membuka API ongkos kirim hanya untuk toko online mitra resminya. Jenis API apa itu?'),
        choices: [
          { id: 'partner', label: t('Partner API') },
          {
            id: 'open',
            label: t('Public API'),
            explainWrong: t('Public API terbuka untuk umum. API ini khusus mitra.'),
          },
          {
            id: 'browser',
            label: t('Private API'),
            explainWrong: t('Private API hanya dipakai di dalam satu perusahaan. Mitra berada di luar perusahaan itu.'),
          },
        ],
        answer: 'partner',
        explainCorrect: t('Partner API dibagikan khusus kepada mitra bisnis yang sudah diverifikasi.'),
        tags: ['sdk', 'api'],
      }),
      makeAnchorMcq({
        id: 'b01-anc-p5',
        prompt: t('Apa hubungan API dan SDK?'),
        choices: [
          { id: 'wrap', label: t('SDK membungkus API agar mudah dipanggil') },
          {
            id: 'same',
            label: t('SDK adalah nama lain dari API itu sendiri'),
            explainWrong: t('API adalah aturan cara meminta. SDK adalah paket kode yang memakai aturan itu.'),
          },
          {
            id: 'css',
            label: t('API dibuat dari kumpulan banyak SDK kecil'),
            explainWrong: t('API ada lebih dulu. SDK dibuat untuk membungkusnya.'),
          },
        ],
        answer: 'wrap',
        explainCorrect: t('SDK berisi fungsi siap panggil. Developer menulis kode lebih singkat.'),
        tags: ['sdk'],
      }),
      makeAnchorMcq({
        id: 'b01-anc-p6',
        type: 'limit',
        analogy: t('API sebagai colokan listrik standar di dinding'),
        prompt: t('Hal apa yang TIDAK tergambar oleh analogi colokan listrik untuk API?'),
        choices: [
          { id: 'schema', label: t('API punya format data, pesan error, dan versi saat kontrak berubah') },
          {
            id: 'hide',
            label: t('Pemakai tidak perlu tahu isi kabel di dalam dinding'),
            explainWrong: t('Itu bagian yang mirip. Colokan dan API sama-sama menyembunyikan isi di baliknya.'),
          },
          {
            id: 'std',
            label: t('Dua pihak sepakat pada bentuk penghubung yang sama'),
            explainWrong: t('Itu juga kesamaan utamanya. Kedua pihak memegang bentuk yang sama.'),
          },
        ],
        answer: 'schema',
        explainCorrect: t('Kontrak API jauh lebih kaya. Ia mengatur nama data, kode status, autentikasi, dan versi.'),
        tags: ['kontrak-api'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'b01-l01',
    worldId: 'b01',
    title: 'API itu pelayan dan buku menu',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menyebut tugas API dengan contoh pelayan restoran.',
      'Kamu bisa menjelaskan apa itu API dan mengapa API berguna.',
    ),
    estMinutes: 6,
    introducesTerms: ['api'],
    usesTerms: ['frontend', 'backend', 'browser', 'server'],
    stickerId: 'pelayan-menu',
    warmupFrom: 'a12-l04',
    atWork: 'Kamu akan memakai API peta atau pembayaran saat membuat aplikasi toko, tanpa membuatnya dari nol.',
    steps: [
      storyStep('b01/pelayan-menu.svg', [
        rText(
          'Di restoran Pak Udin, tamu tidak boleh masuk dapur. Tamu memilih dari buku menu, lalu memanggil pelayan. Siapa yang membawa pesanan ke dapur?',
          'Di restoran Pak Udin, kamu memesan lewat pelayan dan buku menu, tanpa masuk dapur. Aplikasi bekerja dengan cara yang sama saat meminta data dari aplikasi lain.',
        ),
      ]),
      conceptStep({
        title: t('Apa itu API?', 'Definisi API'),
        visualName: 'RestoranDiagram',
        visualProps: { worldId: 'b01', topic: 'restoran-api' },
        alt: t(
          'Diagram ruang makan di kiri, pelayan di tengah, dan dapur di kanan.',
          'Diagram tiga bagian: tampilan di kiri, API di tengah, dapur server di kanan.',
        ),
        body: [
          rTerm('api', 'API', 'API'),
          rText(
            ' itu seperti pelayan dan buku menu. Satu program meminta layanan ke program lain lewat API. Program peminta tidak perlu masuk ke dapur.',
            ' adalah aturan resmi yang dipakai satu program untuk meminta layanan program lain. Program peminta tidak perlu tahu cara kerja di dalamnya.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b01-l01-q1',
          type: 'analogy',
          prompt: t(
            'API membawa pesanan dari satu program ke program lain. Di restoran, API itu seperti siapa?',
            'Dalam analogi restoran, pelayan dan buku menu adalah bagian apa dari sistem?',
          ),
          choices: [
            { id: 'api', label: t('Pelayan', 'API'), icon: 'user' },
            {
              id: 'db',
              label: t('Dapur', 'Backend'),
              icon: 'chef-hat',
              explainWrong: t(
                'Dapur memasak pesanan. Yang membawa pesanan adalah pelayan.',
                'Backend menghitung dan menyimpan data. Yang menghubungkan tampilan dengan backend adalah API.',
              ),
            },
            {
              id: 'ui',
              label: t('Ruang makan', 'Frontend'),
              icon: 'utensils',
              explainWrong: t(
                'Ruang makan adalah tempat duduk tamu. Pelayan berjalan dari sana ke dapur.',
                'Frontend adalah tampilan yang dilihat pemakai. API menghubungkannya ke backend.',
              ),
            },
          ],
          answer: 'api',
          explainCorrect: t(
            'API membawa pesanan dari tamu ke dapur. Seperti pelayan yang berjalan dari meja ke dapur.',
            'API menerima permintaan dari tampilan dan meneruskannya ke dapur. Buku menunya adalah daftar hal yang boleh diminta.',
          ),
          hints: [
            t('Ingat siapa yang berjalan dari meja ke dapur.'),
            t('Dapur tidak pernah mendatangi meja tamu.'),
          ],
          tags: ['api'],
        }),
      ),
      conceptStep({
        title: t('Arti kata API', 'Pecah kata per kata'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b01', topic: 'kepanjangan' },
        alt: t('Tiga kata penyusun API: Application, Programming, Interface.'),
        modes: ['pro'],
        body: [
          rBold('Application', 'Application'),
          rText(' artinya program. '),
          rBold('Programming', 'Programming'),
          rText(' artinya dipakai oleh kode program. '),
          rBold('Interface', 'Interface'),
          rText(' artinya titik temu antara dua pihak, yaitu pemesan dan pemberi layanan.'),
        ],
      }),
      conceptStep({
        title: t('Mengapa API penting?', 'Tiga manfaat utama API'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b01', topic: 'manfaat-layanan' },
        alt: t('Satu dapur melayani web, Android, dan iPhone sekaligus.'),
        body: [
          rJunior('Dengan API, ruang makan dan dapur bekerja sendiri-sendiri. Satu dapur bisa melayani web dan aplikasi HP sekaligus.'),
          rPro('Pertama, tampilan '),
          rTermIn('pro', 'frontend', 'frontend'),
          rPro(' dan dapur '),
          rTermIn('pro', 'backend', 'backend'),
          rPro(
            ' bisa dikerjakan terpisah. Kedua, satu server melayani web, Android, dan iPhone sekaligus. Ketiga, tim memakai API peta atau pembayaran yang sudah ada, tanpa membuatnya dari nol.',
          ),
        ],
      }),
      qStep(
        makeTf({
          id: 'b01-l01-q2',
          prompt: t(
            'Web dan aplikasi HP bisa memakai satu API yang sama.',
            'Web, aplikasi Android, dan aplikasi iPhone bisa mengambil data dari satu API yang sama.',
          ),
          answer: true,
          explainCorrect: t(
            'Satu dapur bisa melayani banyak meja, begitu juga satu API. Web dan HP memesan ke tempat yang sama.',
            'Satu backend bisa melayani web dan aplikasi HP lewat API yang sama. Tampilannya berbeda, tetapi aturan memesannya sama.',
          ),
          explainWrong: t(
            'Dapur yang sama melayani banyak meja. Jadi pernyataan itu benar.',
            'Satu backend memang bisa dipakai web dan aplikasi HP. Itu keunggulan utama API.',
          ),
          hints: [t('Ingat satu dapur dan banyak meja tamu.')],
          tags: ['api', 'backend'],
        }),
      ),
      limitStep({
        analogy: t('API seperti pelayan dan buku menu restoran'),
        same: [
          t(
            'Tamu tidak perlu masuk dapur.',
            'Pemesan tidak perlu masuk ke dapur atau tahu resep koki.',
          ),
        ],
        different: [
          t(
            'Satu pelayan melayani beberapa meja. Satu API melayani banyak aplikasi sekaligus.',
            'Satu API melayani banyak aplikasi sekaligus, jauh lebih banyak daripada satu pelayan.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'restoran-api',
        t(
          'Kirim pesanan dari meja tamu lewat pelayan ke dapur.',
          'Amati bagaimana API mengantar pesan dari tampilan ke dapur server.',
        ),
      ),
      qStep({
        id: 'b01-l01-q3',
        type: 'sort',
        prompt: t(
          'Kelompokkan tugas ini ke pelayan atau dapur.',
          'Kelompokkan tugas ini ke API (pelayan dan menu) atau backend (dapur).',
        ),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('Daftar menu yang boleh dipesan', 'Daftar layanan yang boleh diminta') },
          { id: 'i2', label: t('Menyimpan catatan stok di gudang', 'Menyimpan catatan stok barang di gudang') },
          { id: 'i3', label: t('Aturan cara memesan yang benar', 'Aturan cara mengirim permintaan yang benar') },
          { id: 'i4', label: t('Menghitung harga rahasia di dapur', 'Menghitung harga rahasia di server') },
        ],
        bins: [
          { id: 'api', label: t('Pelayan', 'API (pelayan dan menu)'), icon: 'user' },
          { id: 'be', label: t('Dapur', 'Backend (dapur)'), icon: 'chef-hat' },
        ],
        answer: { i1: 'api', i2: 'be', i3: 'api', i4: 'be' },
        explainCorrect: t(
          'Pelayan dan menu mengatur cara memesan. Dapur memasak dan menyimpan bahan.',
          'API mengatur daftar layanan dan cara meminta. Backend menghitung dan menyimpan data.',
        ),
        hints: [
          t(
            'Siapa memegang menu? Siapa yang memasak?',
            'Tugas mana yang berurusan dengan aturan meminta, dan mana dengan data?',
          ),
          undefined,
        ],
        tags: ['api', 'backend'],
      }),
      qStep(
        makeMcq({
          id: 'b01-l01-q4',
          type: 'limit',
          analogy: t('API seperti pelayan dan buku menu restoran'),
          prompt: t(
            'Apa yang bisa dilakukan API, tetapi tidak bisa dilakukan satu pelayan?',
            'Apa yang bisa dilakukan API tetapi tidak bisa dilakukan pelayan restoran?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'scale',
              label: t('Melayani banyak aplikasi sekaligus', 'Satu API melayani banyak aplikasi sekaligus'),
            },
            {
              id: 'hide',
              label: t('Membuat tamu tidak masuk dapur', 'Pemesan tidak perlu masuk ke bagian dalam dapur'),
              explainWrong: t(
                'Pelayan juga menjaga tamu di luar dapur. Itu bukan pembeda.',
                'Itu justru kesamaan keduanya. Pelayan juga menjaga pemesan di luar dapur.',
              ),
            },
            {
              id: 'menu',
              label: t('Menunjukkan daftar menu yang jelas', 'Ada daftar jelas tentang hal yang boleh diminta'),
              explainWrong: t(
                'Buku menu juga menunjukkan daftar pilihan. Itu bukan pembeda.',
                'Ini juga kesamaan antara menu dan API. Keduanya punya daftar hal yang boleh diminta.',
              ),
            },
          ],
          answer: 'scale',
          explainCorrect: t(
            'Satu pelayan hanya melayani beberapa meja. Satu API bisa melayani banyak aplikasi sekaligus.',
            'Pelayan manusia hanya bisa melayani beberapa meja, tetapi API digital menjawab banyak permintaan sekaligus.',
          ),
          hints: [t('Ingat berapa meja yang dilayani satu pelayan.')],
          tags: ['api'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b01-l01-q5',
          type: 'scenario',
          story: t(
            'Rani membuat aplikasi ojek. Ia ingin menampilkan peta di layar HP.',
            'Rani membuat aplikasi ojek online dan ingin menampilkan peta jalan di layar HP.',
          ),
          prompt: t(
            'Apa cara paling hemat waktu bagi Rani?',
            'Apa cara tercepat agar Rani tidak membangun peta dunia dari nol?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'map',
              label: t('Memakai peta yang sudah tersedia', 'Memakai API peta yang sudah tersedia'),
            },
            {
              id: 'draw',
              label: t('Menggambar semua jalan raya sendiri', 'Menggambar semua jalan raya di HTML satu per satu'),
              explainWrong: t(
                'Menggambar semua jalan butuh waktu bertahun-tahun. Lebih mudah memakai peta yang sudah ada.',
                'Itu butuh waktu bertahun-tahun dan sulit diperbarui. Data peta sudah tersedia lewat API.',
              ),
            },
            {
              id: 'css',
              label: t('Menyalin gambar peta dari buku', 'Menulis aturan CSS agar jalan muncul otomatis'),
              explainWrong: t(
                'Gambar peta tidak bisa berubah dan tidak bisa dicari. Rani butuh layanan peta.',
                'CSS hanya mengatur tampilan. Ia tidak punya data peta jalan dunia.',
              ),
            },
          ],
          answer: 'map',
          explainCorrect: t(
            'Peta sudah dibuat orang lain. Rani tinggal memesannya lewat API, jadi tidak perlu menggambar sendiri.',
            'Dengan API, aplikasi bisa memakai layanan peta, ongkos kirim, atau pembayaran tanpa membuatnya dari nol.',
          ),
          hints: [t('Ingat tamu restoran: memesan lebih cepat daripada memasak sendiri.')],
          tags: ['api'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b01-l01-q6',
          type: 'why',
          modes: ['pro'],
          base: 'Dalam sebuah tim, pengembang frontend dan backend sering bekerja pada waktu bersamaan.',
          prompt: t('Mengapa dua tim bisa bekerja bersamaan tanpa saling menunggu setelah API disepakati?'),
          difficulty: 3,
          choices: [
            { id: 'sep', label: t('Bentuk data dan cara meminta sudah disepakati') },
            {
              id: 'nojs',
              label: t('Tim tampilan tidak perlu lagi menulis JavaScript'),
              explainWrong: t('Tim tampilan tetap menulis kode layar dan memanggil API.'),
            },
            {
              id: 'nodata',
              label: t('Server berhenti memakai database untuk menyimpan data'),
              explainWrong: t('Server tetap menyimpan data di database. API hanya pintu masuknya.'),
            },
          ],
          answer: 'sep',
          explainCorrect: t(
            'Dengan kontrak yang disepakati, tim tampilan fokus ke layar dan tim backend fokus ke data. Keduanya bisa mulai bersamaan.',
          ),
          hints: [t('Pikirkan apa yang sudah disepakati sebelum kerja dimulai.')],
          tags: ['api', 'frontend', 'backend'],
        }),
      ),
      qStep({
        id: 'b01-l01-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Aplikasi cuaca meminta data suhu dari program lain lewat aturan resmi. Apa nama aturan itu?'),
        difficulty: 2,
        accept: ['api'],
        explainCorrect: t('API adalah aturan resmi antara dua program. Peminta tidak perlu masuk ke dapur program lain.'),
        hints: [t('Istilah ini ada di judul pelajaran.'), t('Di cerita restoran, perannya adalah pelayan dan buku menu.')],
        tags: ['api'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b01-l01-r1',
        prompt: t(
          'Satu program ingin meminta layanan dari program lain. Lewat apa ia memesan?',
          'Lewat apa satu program meminta layanan dari program lain secara resmi?',
        ),
        choices: [
          { id: 'api', label: t('API') },
          {
            id: 'html',
            label: t('Masuk langsung ke dapurnya', 'Membuka kode program lain'),
            explainWrong: t(
              'Tamu tidak boleh masuk dapur. Ia memesan lewat pelayan.',
              'Program lain tidak membuka kodenya. API adalah pintu resmi yang tersedia.',
            ),
          },
          {
            id: 'salin',
            label: t('Menyalin semua isi dapurnya', 'Menyalin seluruh kode program lain'),
            explainWrong: t(
              'Menyalin semua isi dapur tidak perlu. Tamu cukup memesan yang ia mau.',
              'Menyalin seluruh kode tidak diperlukan. API cukup mengirim data yang diminta.',
            ),
          },
        ],
        answer: 'api',
        explainCorrect: t(
          'API adalah pintu resmi untuk memesan. Seperti pelayan yang menerima pesanan.',
          'API adalah pintu resmi untuk meminta layanan, tanpa membuka isi program lain.',
        ),
        hints: [t('Ingat siapa yang menerima pesanan tamu.')],
        tags: ['api'],
      }),
      makeTf({
        id: 'b01-l01-r2',
        prompt: t(
          'Untuk memakai API cuaca, kamu harus tahu isi dapurnya.',
          'Untuk memakai API cuaca, kamu harus lebih dulu tahu isi kode server cuaca.',
        ),
        answer: false,
        explainCorrect: t(
          'Pernyataan itu keliru. Tamu cukup membaca menu dan memesan, tanpa melihat dapur.',
          'Pernyataan itu keliru. Kamu cukup mengikuti aturan meminta di API, tanpa melihat kode server.',
        ),
        explainWrong: t(
          'Tamu tidak perlu melihat dapur. Pelayan sudah mengurus semuanya.',
          'API justru menyembunyikan cara kerja server. Kamu hanya perlu tahu aturan meminta.',
        ),
        hints: [t('Ingat tamu restoran yang tidak masuk dapur.')],
        tags: ['api'],
      }),
    ],
    recap: t(
      'API adalah pelayan dan buku menu antara tamu dan dapur.',
      'API memisahkan tampilan dari dapur server dan membuat layanan bisa dipakai banyak aplikasi.',
    ),
    companion: {
      talkPrompts: [
        'Apa tugas API, kalau diceritakan seperti pelayan restoran?',
        'Mengapa lebih mudah punya pelayan daripada masak sendiri di dapur?',
      ],
      offlineActivity:
        'Ambil brosur atau daftar menu makanan di rumah. Tunjuk bagian yang menjadi "buku menu API". Apa yang terjadi kalau kamu memesan barang yang tidak ada di daftar?',
    },
  }),

  makeLesson({
    id: 'b01-l02',
    worldId: 'b01',
    title: 'Pesan pergi, jawaban pulang',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menunjuk peminta, penjawab, pesanan, jawaban, dan alamat menu.',
      'Kamu bisa menyebutkan peran setiap bagian dalam satu panggilan API.',
    ),
    estMinutes: 7,
    introducesTerms: ['endpoint'],
    usesTerms: ['api', 'browser', 'server', 'request', 'response', 'url'],
    warmupFrom: 'b01-l01',
    atWork: 'Kamu akan membuka tab Network DevTools untuk melihat permintaan dan jawaban saat form gagal terkirim.',
    steps: [
      storyStep('b01/endpoint-menu.svg', [
        rText(
          'Kamu menunjuk nasi goreng di buku menu. Pelayan membawa catatannya ke dapur. Siapa yang meminta, dan siapa yang menjawab?',
          'Saat aplikasi Toko Rani memuat daftar barang, ia memanggil sebuah API. Pihak peminta mengirim pesan ke satu alamat khusus, lalu pihak penyedia membalasnya.',
        ),
      ]),
      conceptStep({
        title: t('Peminta dan penjawab', 'Client dan server'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b01', topic: 'client-server-flow' },
        alt: t(
          'Diagram tamu berupa HP atau browser mengirim pesanan ke dapur.',
          'Diagram client berupa browser atau HP yang mengirim pesan ke server.',
        ),
        body: [
          rJunior('Tamu adalah pihak yang meminta, seperti '),
          rTermIn('junior', 'browser', 'browser'),
          rJunior(' atau HP. '),
          rTermIn('junior', 'server', 'Server'),
          rJunior(' adalah komputer yang menjawab, seperti dapur.'),
          rBoldIn('pro', 'Client'),
          rPro(' adalah pihak peminta, seperti '),
          rTermIn('pro', 'browser', 'browser'),
          rPro(' atau aplikasi HP. '),
          rTermIn('pro', 'server', 'Server'),
          rPro(' adalah komputer yang menjawab permintaan itu.'),
        ],
      }),
      qStep(
        makeTf({
          id: 'b01-l02-q4',
          prompt: t(
            'Hanya komputer yang bisa menjadi tamu. Aplikasi HP tidak bisa.',
            'Hanya browser di komputer yang bisa menjadi client API. Aplikasi HP tidak bisa.',
          ),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru. Siapa pun yang meminta adalah tamu, termasuk aplikasi HP.',
            'Pernyataan itu keliru. Aplikasi Android, iPhone, bahkan server lain juga bisa menjadi client API.',
          ),
          explainWrong: t(
            'Tamu tidak hanya satu jenis. HP dan komputer sama-sama bisa meminta.',
            'Client adalah siapa pun yang mengirim permintaan ke API, termasuk aplikasi HP.',
          ),
          hints: [t('Ingat tamu di restoran: siapa saja boleh memesan.')],
          tags: ['browser', 'api'],
        }),
      ),
      conceptStep({
        title: t('Pesan pergi dan pulang', 'Request dan response'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b01', topic: 'request-response-flow' },
        alt: t(
          'Tamu mengirim pesanan, dapur membalas dengan jawaban.',
          'Client mengirim pesan, server membalas dengan response.',
        ),
        body: [
          rTerm('request', 'Request', 'Request'),
          rText(
            ' adalah surat pesanan dari tamu. ',
            ' adalah pesan permintaan yang dikirim client. ',
          ),
          rTerm('response', 'Response', 'Response'),
          rText(
            ' adalah jawaban dari dapur, bisa berupa isi atau kabar gagal.',
            ' adalah balasan server, bisa berisi data atau kabar gagal.',
          ),
        ],
      }),
      qStep({
        id: 'b01-l02-q2',
        type: 'match',
        prompt: t('Pasangkan 4 kata ini dengan tugasnya.', 'Pasangkan empat istilah API dengan perannya.'),
        difficulty: 1,
        left: [
          { id: 'l1', label: t('Tamu', 'Client') },
          { id: 'l2', label: t('Server') },
          { id: 'l3', label: t('Request') },
          { id: 'l4', label: t('Response') },
        ],
        right: [
          { id: 'r2', label: t('Dapur yang menyiapkan jawaban', 'Komputer yang mencari data dan menjawab') },
          { id: 'r4', label: t('Jawaban yang dikirim balik', 'Jawaban yang dikirim balik ke peminta') },
          { id: 'r1', label: t('HP atau browser yang meminta', 'Browser atau aplikasi HP yang meminta') },
          { id: 'r3', label: t('Surat pesanan yang dikirim', 'Pesan permintaan yang dikirim') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
        explainCorrect: t(
          'Tamu meminta, dapur menjawab. Surat pesanan pergi, jawaban pulang.',
          'Client meminta dan server menjawab. Request adalah pesan yang pergi, response adalah balasan yang pulang.',
        ),
        hints: [t('Ingat tamu, dapur, surat pesanan, dan jawaban.'), undefined],
        tags: ['browser', 'server', 'request', 'response'],
      }),
      conceptStep({
        title: t('Satu baris menu: endpoint', 'Endpoint API'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b01', topic: 'endpoint-menu' },
        alt: t(
          'Contoh alamat khusus untuk satu jenis pesanan: daftar produk.',
          'Contoh endpoint: https://api.toko-rani.example/produk.',
        ),
        code: {
          lang: 'http',
          code: 'GET https://api.toko-rani.example/produk',
          highlight: [1],
        },
        body: [
          rTermIn('junior', 'endpoint', 'Endpoint'),
          rJunior(' adalah alamat khusus untuk satu jenis pesanan, misalnya alamat daftar barang. Bentuknya seperti satu baris di buku menu.'),
          rTermIn('pro', 'endpoint', 'Endpoint'),
          rPro(' adalah alamat khusus pada sebuah API untuk satu jenis permintaan, misalnya '),
          rCode('/produk', ['pro']),
          rPro('. Satu endpoint melayani satu hal, seperti daftar barang atau detail pesanan.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b01-l02-q1',
          modes: ['pro'],
          prompt: t('Apa nama alamat khusus seperti /produk atau /pesanan yang melayani satu jenis permintaan?'),
          choices: [
            { id: 'ep', label: t('Endpoint') },
            { id: 'cli', label: t('Client'), explainWrong: t('Client adalah pihak peminta, seperti browser. Ia bukan alamat tujuan.') },
            { id: 'res', label: t('Response'), explainWrong: t('Response adalah pesan balasan dari server. Alamat tujuan punya nama lain.') },
          ],
          answer: 'ep',
          explainCorrect: t('Endpoint adalah alamat tujuan spesifik pada sebuah API. Satu endpoint melayani satu jenis permintaan.'),
          tags: ['endpoint'],
        }),
      ),
      limitStep({
        analogy: t('Endpoint seperti satu baris pada buku menu'),
        same: [
          t(
            'Tiap baris menu punya nama yang jelas.',
            'Setiap baris menu punya nama jelas supaya dapur tidak salah menyiapkan.',
          ),
        ],
        different: [
          t(
            'Menu kertas tetap sama. Endpoint memberi isi terbaru.',
            'Endpoint bisa menerima ID tambahan, seperti /produk/12, untuk membalas satu barang tertentu.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'restoran-api',
        t(
          'Perhatikan siapa peminta, alamat tujuan, dan jawaban dari dapur.',
          'Amati permintaan dari client menuju endpoint, lalu balasan dari server.',
        ),
      ),
      qStep({
        id: 'b01-l02-q3',
        type: 'order',
        prompt: t(
          'Urutkan perjalanan satu pesanan dari awal sampai akhir.',
          'Urutkan satu panggilan API dari awal sampai akhir.',
        ),
        difficulty: 2,
        items: [
          { id: 's3', label: t('Dapur menyiapkan isi yang diminta', 'Server mencari data yang diminta di database') },
          { id: 's1', label: t('Tamu memilih dari menu dan memanggil pelayan', 'Client mengirim request ke endpoint /produk') },
          { id: 's4', label: t('Pelayan mengantar jawaban ke meja tamu', 'Client menerima response dan menampilkannya di layar') },
          { id: 's2', label: t('Pelayan membawa pesanan ke dapur', 'Server menerima request itu') },
        ],
        answer: ['s1', 's2', 's3', 's4'],
        explainCorrect: t(
          'Pesanan pergi dulu, lalu dapur bekerja. Jawaban pulang di urutan terakhir.',
          'Pesan pergi lebih dulu, server mencari data, lalu balasan kembali ke client.',
        ),
        hints: [
          t(
            'Mulai dari tamu yang memesan. Akhiri dengan jawaban.',
            'Mulai dari pihak yang meminta, akhiri dengan pihak yang menerima balasan.',
          ),
          undefined,
        ],
        tags: ['request', 'response', 'endpoint'],
      }),
      qStep(
        makeMcq({
          id: 'b01-l02-q5',
          type: 'limit',
          analogy: t('Endpoint seperti satu baris di buku menu'),
          prompt: t(
            'Apa yang bisa dilakukan endpoint, tetapi tidak bisa dilakukan baris kertas menu?',
            'Apa yang bisa dilakukan endpoint API, tetapi tidak bisa dilakukan baris kertas menu?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'dyn',
              label: t('Memberi stok terbaru saat ditanya', 'Memberi data stok terbaru setiap kali diminta'),
            },
            {
              id: 'list',
              label: t(
                'Menunjukkan nama pilihan yang tersedia',
                'Menunjukkan nama pilihan yang tersedia di dalam daftar',
              ),
              explainWrong: t(
                'Baris menu kertas juga menunjukkan pilihan. Itu bukan pembeda.',
                'Itu kesamaan antara menu dan endpoint. Keduanya menunjukkan pilihan yang tersedia.',
              ),
            },
            {
              id: 'order',
              label: t(
                'Membantu tamu meminta yang ia mau',
                'Membantu pemesan meminta hal yang diinginkan dengan jelas',
              ),
              explainWrong: t(
                'Baris menu juga membantu tamu memesan. Itu sama dengan endpoint.',
                'Itu juga kesamaan keduanya. Baris menu pun membantu pemesan meminta sesuatu.',
              ),
            },
          ],
          answer: 'dyn',
          explainCorrect: t(
            'Menu kertas tidak bisa berubah sendiri. Endpoint bisa memberi stok terbaru.',
            'Endpoint bisa memberi data terbaru sesuai nomor di alamatnya. Baris menu kertas tidak bisa.',
          ),
          hints: [t('Ingat apa yang tidak bisa berubah di menu kertas.')],
          tags: ['endpoint'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b01-l02-q6',
          type: 'scenario',
          story: t(
            'Dimas mengetuk tombol tas di aplikasi Toko Rani. Lalu layar menampilkan "Maaf, tas habis."',
            'Dimas mengetuk tombol tas di aplikasi Toko Rani. Aplikasi memanggil https://api.toko-rani.example/tas, lalu server membalas "Maaf, tas habis".',
          ),
          prompt: t(
            'Mana yang termasuk jawaban dari dapur?',
            'Dalam kejadian ini, mana yang termasuk response?',
          ),
          difficulty: 2,
          choices: [
            { id: 'msg', label: t('Kabar "Maaf, tas habis"', 'Jawaban server "Maaf, tas habis"') },
            {
              id: 'hp',
              label: t('Aplikasi HP milik Dimas'),
              explainWrong: t(
                'Aplikasi HP Dimas adalah tamu yang meminta. Ia bukan jawaban.',
                'Aplikasi HP Dimas adalah client. Client meminta, bukan menjawab.',
              ),
            },
            {
              id: 'req',
              label: t('Ketukan Dimas pada tombol', 'Perintah meminta ke /tas'),
              explainWrong: t(
                'Ketukan Dimas adalah awal pesanan. Pesanan itu pergi ke dapur.',
                'Perintah meminta itulah request. Response datang sesudahnya.',
              ),
            },
          ],
          answer: 'msg',
          explainCorrect: t(
            'Dapur menjawab pesanan Dimas dengan kabar tas habis. Jawaban itulah response.',
            'Response mencakup jawaban berhasil dan kabar kosong atau gagal. Di sini, "tas habis" adalah kabar dari server.',
          ),
          hints: [t('Mana yang muncul sesudah Dimas memesan?', 'Cari yang datang dari server, sesudah permintaan terkirim.')],
          tags: ['response'],
        }),
      ),
      qStep({
        id: 'b01-l02-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi kalimat tentang alur dasar panggilan API.'),
        difficulty: 2,
        template: '___ mengirim ___ ke alamat ___, lalu server membalas dengan ___.',
        bank: ['Client', 'request', 'endpoint', 'response', 'database'],
        answer: ['Client', 'request', 'endpoint', 'response'],
        explainCorrect: t('Client meminta, server membalas. Alamat tujuannya disebut endpoint.'),
        hints: [t('Mulai dari pihak yang meminta, lalu alamat tujuannya.'), undefined],
        tags: ['endpoint', 'request', 'response'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b01-l02-r1',
        prompt: t(
          'Tamu bertanya. Siapa yang melayani dan menjawab?',
          'Kalau client adalah pihak yang bertanya, siapa yang melayani dan menjawab?',
        ),
        choices: [
          { id: 'srv', label: t('Server') },
          {
            id: 'url',
            label: t('Endpoint'),
            explainWrong: t(
              'Endpoint adalah alamat tujuan. Ia bukan komputer yang menjawab.',
              'Endpoint adalah alamat tujuannya, bukan komputer penjawabnya.',
            ),
          },
          {
            id: 'brw',
            label: t('Browser'),
            explainWrong: t(
              'Browser adalah tamu yang meminta. Dapur yang menjawab.',
              'Browser adalah client yang meminta, bukan yang menjawab.',
            ),
          },
        ],
        answer: 'srv',
        explainCorrect: t(
          'Server adalah dapur yang melayani tamu. Ia menyiapkan jawaban.',
          'Server melayani permintaan dari client dan mengirim response.',
        ),
        hints: [t('Ingat siapa yang memasak pesanan.')],
        tags: ['server'],
      }),
      makeMcq({
        id: 'b01-l02-r2',
        prompt: t(
          'Jawaban dari dapur untuk tamu disebut apa?',
          'Pesan jawaban yang dikirim server kembali ke browser disebut apa?',
        ),
        choices: [
          { id: 'res', label: t('Response') },
          {
            id: 'req',
            label: t('Request'),
            explainWrong: t(
              'Request adalah surat pesanan dari tamu. Jawaban datang sesudahnya.',
              'Request adalah pesan permintaan dari client. Balasan punya nama lain.',
            ),
          },
          {
            id: 'ep',
            label: t('Endpoint'),
            explainWrong: t(
              'Endpoint adalah alamat tujuan pesanan. Ia bukan jawabannya.',
              'Endpoint adalah alamat tujuan request. Ia bukan balasannya.',
            ),
          },
        ],
        answer: 'res',
        explainCorrect: t(
          'Response adalah jawaban dari dapur. Ia pulang ke tamu.',
          'Response adalah jawaban atas request yang dikirim.',
        ),
        hints: [t('Ingat jawaban yang pulang ke meja tamu.')],
        tags: ['response'],
      }),
    ],
    recap: t(
      'Tamu mengirim pesanan ke alamat menu, lalu dapur mengirim jawaban.',
      'Client mengirim request ke satu endpoint. Server membalas dengan response.',
    ),
    companion: {
      talkPrompts: ['Saat kamu mengetuk tombol cari lagu, siapa yang meminta?'],
      offlineActivity:
        'Tulis Tamu, Dapur, Pesanan, Jawaban, dan Alamat Menu di 5 kartu kecil. Peragakan alurnya dari meja makan ke dapur.',
    },
  }),

  makeLesson({
    id: 'b01-l03',
    worldId: 'b01',
    title: 'Jenis-jenis API',
    modes: ['pro'],
    objective: t('Kamu bisa membedakan jenis API dan menjelaskan hubungan API dengan SDK.'),
    estMinutes: 6,
    introducesTerms: ['sdk'],
    usesTerms: ['api', 'endpoint', 'browser', 'server', 'https', 'fetch', 'javascript'],
    warmupFrom: 'b01-l02',
    atWork: 'Kamu akan memilih antara SDK dan Web API langsung saat menyambungkan aplikasi ke layanan pembayaran.',
    steps: [
      storyStep('b01/jenis-api.svg', [
        rText(
          'Kamu membaca dokumentasi sebuah layanan, dan istilah API muncul di mana-mana. Ada API toko lewat internet, API kamera di HP, dan SDK (paket alat siap pasang).',
        ),
      ]),
      conceptStep({
        title: t('API tidak hanya di internet'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b01', topic: 'tiga-kelompok' },
        alt: t('Perbedaan tiga jenis API: lewat HTTP, bawaan peramban, dan bawaan library atau sistem.'),
        code: {
          lang: 'js',
          code: 'fetch("https://api.toko-rani.example/produk"); // Web API\nnavigator.geolocation.getCurrentPosition(fn);  // Browser API',
          highlight: [1, 2],
        },
        body: [
          rBold('Web API'),
          rText(' diakses lewat internet memakai HTTP. '),
          rBold('Browser API'),
          rText(' adalah fitur bawaan peramban, seperti '),
          rCode('localStorage'),
          rText('. Fungsi '),
          rTerm('fetch', 'fetch'),
          rText(' juga bawaan peramban. '),
          rBold('Library/OS API'),
          rText(' adalah fungsi bawaan library atau sistem operasi.'),
        ],
      }),
      qStep({
        id: 'b01-l03-q1',
        type: 'sort',
        prompt: t('Kelompokkan contoh ini ke Web API atau Browser API.'),
        difficulty: 2,
        items: [
          { id: 'w1', label: t('https://api.toko-rani.example/produk') },
          { id: 'b1', label: t('navigator.geolocation (lokasi dari browser)') },
          { id: 'w2', label: t('https://api.toko-rani.example/ongkir') },
          { id: 'b2', label: t('localStorage.setItem("tema", "dark")') },
        ],
        bins: [
          { id: 'web', label: t('Web API (lewat internet)') },
          { id: 'brw', label: t('Browser API (fitur peramban)') },
        ],
        answer: { w1: 'web', b1: 'brw', w2: 'web', b2: 'brw' },
        explainCorrect: t('Web API dipanggil lewat jaringan HTTP. Browser API sudah tersedia di dalam browser.'),
        hints: [t('Alamat berawalan https lewat internet. Nama navigator dan localStorage bawaan browser.'), undefined],
        tags: ['api', 'browser'],
      }),
      conceptStep({
        title: t('Siapa yang boleh memakai?'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b01', topic: 'akses-pengguna' },
        alt: t('Tiga jenis akses: Public, Private, dan Partner API. Composite API adalah pola gabungan, bukan jenis akses.'),
        body: [
          rBold('Public API'),
          rText(' terbuka untuk umum, seperti API cuaca. '),
          rBold('Private API'),
          rText(' hanya untuk aplikasi internal perusahaan. '),
          rBold('Partner API'),
          rText(' khusus mitra bisnis, seperti ekspedisi. Ada juga pola '),
          rBold('Composite API'),
          rText(', yaitu satu panggilan yang menggabungkan beberapa permintaan. Pola ini bukan jenis akses.'),
        ],
      }),
      qStep({
        id: 'b01-l03-q2',
        type: 'match',
        prompt: t('Pasangkan jenis akses API dengan contoh penggunaannya.'),
        difficulty: 2,
        left: [
          { id: 'pub', label: t('Public / Open API') },
          { id: 'prv', label: t('Private / Internal API') },
          { id: 'prt', label: t('Partner API') },
        ],
        right: [
          { id: 'c_prv', label: t('Menghubungkan web toko dengan data internal sendiri') },
          { id: 'c_pub', label: t('API cuaca atau katalog film yang terbuka untuk umum') },
          { id: 'c_prt', label: t('API jasa ekspedisi khusus toko online yang bekerja sama') },
        ],
        answer: { pub: 'c_pub', prv: 'c_prv', prt: 'c_prt' },
        explainCorrect: t('Public API terbuka untuk umum, Private API untuk internal, Partner API untuk mitra.'),
        hints: [t('Tanyakan siapa yang boleh memakainya: semua orang, internal, atau mitra.'), undefined],
        tags: ['api'],
      }),
      conceptStep({
        title: t('API dan SDK'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b01', topic: 'perbedaan-sdk' },
        alt: t('Perbandingan buku menu API dengan paket alat siap pakai SDK.'),
        body: [
          rTerm('sdk', 'SDK'),
          rText(' (Software Development Kit) adalah paket kode siap panggil yang membungkus '),
          rTerm('api', 'API'),
          rText('. Developer cukup memanggil satu fungsi singkat, tanpa menulis panggilan HTTP sendiri.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b01-l03-q3',
          prompt: t('Mana pernyataan yang tepat tentang API dan SDK?'),
          choices: [
            { id: 'sdk', label: t('SDK membungkus API agar mudah dipanggil') },
            {
              id: 'same',
              label: t('SDK adalah nama lain dari API itu sendiri'),
              explainWrong: t('API adalah aturan cara meminta. SDK adalah paket kode yang memakai aturan itu.'),
            },
            {
              id: 'noapi',
              label: t('API dibuat dari kumpulan banyak SDK kecil'),
              explainWrong: t('API ada lebih dulu. Lalu SDK dibuat untuk membungkusnya.'),
            },
          ],
          answer: 'sdk',
          explainCorrect: t('SDK berisi fungsi siap panggil yang membungkus API. Developer cukup memanggil fungsinya, tanpa menulis request sendiri.'),
          tags: ['sdk', 'api'],
        }),
      ),
      limitStep({
        analogy: t('API seperti buku menu dan SDK seperti aplikasi pesan antar restoran'),
        same: [t('SDK membungkus panggilan ke API, jadi lebih ringkas dipakai.')],
        different: [
          t('Setiap SDK dibuat untuk satu bahasa atau platform, dan menambah ukuran aplikasi. Web API bisa dipanggil dari bahasa apa saja.'),
        ],
        riskyAnalogy: false,
      }),
      simStep(
        'restoran-api',
        t('Amati bagaimana aplikasi memanggil endpoint Web API di simulator.'),
      ),
      qStep(
        makeMcq({
          id: 'b01-l03-q4',
          type: 'limit',
          analogy: t('SDK seperti aplikasi pesan antar yang membungkus buku menu'),
          prompt: t('Apa yang perlu dipertimbangkan tim saat memilih SDK, bukan memanggil Web API langsung?'),
          difficulty: 2,
          choices: [
            { id: 'size', label: t('SDK menambah ukuran aplikasi dan hanya untuk bahasa tertentu') },
            {
              id: 'free',
              label: t('SDK membuat panggilan ke server berjalan jauh lebih cepat'),
              explainWrong: t('SDK hanya membungkus panggilan. Kecepatan jaringan tetap sama.'),
            },
            {
              id: 'menu',
              label: t('SDK menggantikan kebutuhan memilih endpoint di server'),
              explainWrong: t('Di balik layar, SDK tetap memanggil endpoint.'),
            },
          ],
          answer: 'size',
          explainCorrect: t('SDK menambah ukuran aplikasi, dan tiap SDK hanya untuk satu bahasa atau platform. Untuk kebutuhan ringan, fetch ke Web API lebih hemat.'),
          hints: [t('Pikirkan apa yang ikut terpasang bersama SDK.')],
          tags: ['sdk', 'fetch'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b01-l03-q5',
          type: 'scenario',
          story: t('Beranda aplikasi Toko Rani butuh profil, 3 pesanan terakhir, dan alamat utama dalam satu panggilan jaringan.'),
          prompt: t('Pola API mana yang menggabungkan data itu dalam satu request?'),
          difficulty: 2,
          choices: [
            { id: 'cmp', label: t('Composite API') },
            {
              id: 'brw',
              label: t('Browser API'),
              explainWrong: t('Browser API hanya mengelola fitur lokal, seperti kamera atau penyimpanan.'),
            },
            {
              id: 'os',
              label: t('Library/OS API'),
              explainWrong: t('Library/OS API adalah fungsi bawaan sistem atau library, bukan panggilan jaringan.'),
            },
          ],
          answer: 'cmp',
          explainCorrect: t('Composite API menggabungkan beberapa sumber data menjadi satu panggilan. Aplikasi tidak perlu mengirim banyak request.'),
          hints: [t('Cari pola yang menggabungkan beberapa permintaan.')],
          tags: ['api'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b01-l03-q6',
          type: 'scenario',
          story: t('Tim aplikasi HP ingin memakai API pembayaran, tetapi tidak mau menulis panggilan HTTP sendiri.'),
          prompt: t('Apa yang sebaiknya mereka pasang?'),
          difficulty: 1,
          choices: [
            { id: 'sdk', label: t('SDK dari penyedia pembayaran') },
            {
              id: 'docs',
              label: t('Dokumentasi API pembayaran'),
              explainWrong: t('Dokumentasi hanya menjelaskan cara memakai API. Tim tetap harus menulis panggilannya.'),
            },
            {
              id: 'ep',
              label: t('Endpoint baru di server sendiri'),
              explainWrong: t('Endpoint baru tidak membantu memanggil API pembayaran. Pembayaran ditangani penyedia.'),
            },
          ],
          answer: 'sdk',
          explainCorrect: t('SDK berisi fungsi siap panggil yang membungkus panggilan ke API. Tim cukup memanggil fungsinya.'),
          tags: ['sdk'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b01-l03-r1',
        prompt: t('Fungsi navigator.geolocation dan localStorage termasuk jenis API apa?'),
        choices: [
          { id: 'b', label: t('Browser API') },
          {
            id: 'p',
            label: t('Partner API'),
            explainWrong: t('Partner API adalah layanan server antar perusahaan.'),
          },
          {
            id: 'w',
            label: t('Web API'),
            explainWrong: t('Web API dipanggil lewat internet. Dua fungsi ini sudah ada di dalam browser.'),
          },
        ],
        answer: 'b',
        explainCorrect: t('Itu Browser API: fitur bawaan peramban yang dipanggil dari kode program.'),
        tags: ['browser', 'api'],
      }),
      makeTf({
        id: 'b01-l03-r2',
        prompt: t('Private API ditujukan khusus untuk menghubungkan aplikasi dan layanan internal perusahaan sendiri.'),
        answer: true,
        explainCorrect: t('Private API tidak dibuka untuk developer luar.'),
        explainWrong: t('Private API memang hanya dipakai sistem internal perusahaan.'),
        tags: ['api'],
      }),
    ],
    recap: t('Jenis API dibedakan oleh tempat dan akses. SDK membungkus API agar mudah dipanggil.'),
  }),

  makeLesson({
    id: 'b01-l04',
    worldId: 'b01',
    title: 'API adalah kontrak',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menjelaskan mengapa dua pihak harus menepati janji bentuk jawaban.',
      'Kamu bisa menjelaskan API sebagai kontrak dan dampak perubahan kontrak tanpa versi.',
    ),
    estMinutes: 6,
    introducesTerms: ['kontrak-api'],
    usesTerms: ['api', 'frontend', 'backend', 'request', 'response'],
    stickerId: 'colokan-listrik',
    warmupFrom: 'b01-l03',
    atWork:
      'Kamu akan membaca dokumentasi versi API sebelum mengubah nama kolom, supaya aplikasi yang sudah berjalan tidak rusak.',
    steps: [
      storyStep('b01/colokan-listrik.svg', [
        rText(
          'Colokan di dinding rumah Rani selalu berbentuk sama. Kabel di balik tembok boleh diganti, kipas tetap menyala. Mengapa bisa begitu?',
          'Tim backend Toko Rani ingin mengganti isi layanannya tanpa merusak aplikasi. Colokan listrik menunjukkan caranya: selama bentuk steker sama, isi tembok boleh diganti.',
        ),
      ]),
      conceptStep({
        title: t('Janji dua pihak', 'Kontrak antara dua pihak'),
        visualName: 'RestoranDiagram',
        visualProps: { worldId: 'b01', topic: 'janji-restoran-api' },
        alt: t('Frontend dan backend sepakat pada kontrak cara meminta dan bentuk jawaban.'),
        body: [
          rTerm('kontrak-api', 'Kontrak API', 'Kontrak API'),
          rText(
            ' adalah janji antara dua pihak. Kalau kamu pesan nasi goreng, dapur selalu memberi nasi goreng. Dapur boleh ganti kompor, asal pesanannya tetap sama.',
            ' adalah perjanjian resmi. Backend berjanji, "Kalau kamu meminta dengan cara A, aku membalas dalam bentuk B." Frontend merancang layar dari janji itu.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b01-l04-q1',
          type: 'analogy',
          prompt: t(
            'Di cerita colokan listrik, bagian mana yang seperti kontrak API?',
            'Pada analogi colokan listrik, bagian mana yang berperan sebagai kontrak API?',
          ),
          choices: [
            {
              id: 'plug',
              label: t('Bentuk lubang dan steker yang sama', 'Bentuk lubang dan steker yang sama-sama disepakati'),
            },
            {
              id: 'wire',
              label: t('Kabel yang tersembunyi di dalam tembok', 'Kabel tersembunyi di dalam tembok'),
              explainWrong: t(
                'Kabel di tembok boleh diganti. Itu seperti dapur, bukan janjinya.',
                'Kabel di balik tembok ibarat kode dapur backend. Isinya boleh berubah tanpa merusak kontrak.',
              ),
            },
            {
              id: 'fan',
              label: t('Baling-baling kipas yang sedang berputar', 'Baling-baling kipas angin'),
              explainWrong: t(
                'Kipas adalah alat yang memakai listrik. Ia seperti aplikasi tamu.',
                'Kipas angin ibarat aplikasi frontend yang memakai layanan. Ia mengikuti kontrak, tetapi bukan kontraknya.',
              ),
            },
          ],
          answer: 'plug',
          explainCorrect: t(
            'Bentuk colokan yang sama dipegang kedua pihak. Itulah janjinya.',
            'Bentuk colokan standar itulah kontraknya, karena kedua sisi sepakat memakainya.',
          ),
          hints: [t('Ingat bagian yang harus selalu sama.')],
          tags: ['kontrak-api'],
        }),
      ),
      conceptStep({
        title: t('Ubah dalamnya, jaga bentuk luarnya'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b01', topic: 'colokan-listrik' },
        alt: t('Backend mengganti cara kerja dalam tanpa merusak bentuk luar API.'),
        modes: ['pro'],
        body: [
          rText('Bentuk ', 'Bentuk '),
          rTerm('request', 'request', 'request'),
          rText(' dan ', ' dan '),
          rTerm('response', 'response', 'response'),
          rText(
            ' adalah janji yang dijaga. Selama janji itu tetap, backend bebas mengganti database atau bahasa pemrogramannya. Frontend tetap berjalan tanpa perubahan.',
          ),
        ],
      }),
      qStep(
        makeTf({
          id: 'b01-l04-q2',
          prompt: t(
            'Dapur boleh mengganti kompornya, asal bentuk jawaban tetap sama.',
            'Backend boleh mengganti cara menyimpan data, selama bentuk jawaban ke frontend tidak berubah.',
          ),
          answer: true,
          explainCorrect: t(
            'Yang dijaga hanya bentuk jawaban. Dapur boleh berubah, seperti kabel di balik tembok.',
            'Kontrak hanya menjaga bentuk jawaban. Cara backend menyimpan data boleh diganti tanpa merusak frontend.',
          ),
          explainWrong: t(
            'Dapur boleh berubah. Yang tidak boleh berubah hanya bentuk jawabannya.',
            'Kontrak hanya mengikat bentuk jawaban. Isi dalam backend bebas diperbaiki.',
          ),
          hints: [t('Ingat apa yang boleh berubah di balik tembok.')],
          tags: ['kontrak-api', 'backend'],
        }),
      ),
      conceptStep({
        title: t('Bahaya mengubah janji diam-diam', 'Dampak kontrak yang dilanggar'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b01', topic: 'kontrak-rusak' },
        alt: t(
          'Tulisan di jawaban berubah, jadi layar tampil kosong.',
          'Nama kolom berubah dari nama ke name, jadi layar kosong.',
        ),
        code: {
          lang: 'js',
          code: '// Janji awal: { "nama": "Tas Kanvas" }\n// Diubah diam-diam: { "name": "Tas Kanvas" } -> layar kosong!',
          highlight: [2],
        },
        body: [
          rJunior('Dapur mengganti tulisan di jawabannya tanpa memberi tahu. Layar tidak menemukan tulisan yang dicari, lalu kosong.'),
          rPro(
            'Kalau backend mengganti nama data tanpa kabar, frontend tidak menemukan data itu dan halaman rusak. Contohnya nama kolom ',
          ),
          rCode('nama', ['pro']),
          rPro(' diubah menjadi '),
          rCode('name', ['pro']),
          rPro('. Karena itu API butuh dokumentasi dan versi.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b01-l04-q5',
          type: 'scenario',
          story: t(
            'Layar keranjang Toko Rani mencari kata "harga" dari dapur. Tanpa kabar, dapur mengganti kata itu menjadi "biaya".',
            'Layar keranjang Toko Rani mengharapkan kolom "harga" dari server. Tanpa kabar, tim backend mengubahnya menjadi "price".',
          ),
          prompt: t(
            'Apa yang paling mungkin terjadi di layar?',
            'Apa akibat yang paling mungkin di layar pemakai?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'err',
              label: t('Harga di layar menjadi kosong', 'Harga di layar kosong atau error'),
            },
            {
              id: 'fast',
              label: t('Layar menebak kata baru dengan benar', 'Browser menebak kata baru dan menyesuaikan kodenya sendiri'),
              explainWrong: t(
                'Layar tidak bisa menebak kata baru. Ia hanya mencari kata yang dijanjikan.',
                'Kode frontend membaca persis nama kolom sesuai kontrak. Ia tidak bisa menebak nama baru.',
              ),
            },
            {
              id: 'auto',
              label: t('Harga lama tetap muncul di layar', 'Layar tetap normal karena kolom lama masih dibaca'),
              explainWrong: t(
                'Layar mengambil jawaban baru dari dapur. Kata "harga" sudah tidak ada di sana.',
                'Jawaban baru dari server tidak lagi memuat kolom "harga". Kolom lama tidak ikut terkirim.',
              ),
            },
          ],
          answer: 'err',
          explainCorrect: t(
            'Layar mencari kata "harga" dan tidak menemukannya. Jadi tempat harga tampil kosong.',
            'Frontend membaca nama kolom persis seperti yang dijanjikan kontrak. Nama baru tidak ditemukan, jadi harga kosong.',
          ),
          hints: [t('Layar hanya mencari kata yang dijanjikan.')],
          tags: ['kontrak-api', 'frontend'],
        }),
      ),
      limitStep({
        analogy: t('Kontrak API seperti colokan listrik di dinding'),
        same: [t('Selama bentuk penghubungnya sama, isi di baliknya bebas diganti.')],
        different: [
          t(
            'Janji API terus bertambah, jadi dicatat dan diberi nomor.',
            'Bentuk colokan hampir tidak berubah puluhan tahun, tetapi fitur aplikasi terus bertambah, jadi kontrak API perlu dokumentasi dan versi.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'restoran-api',
        t(
          'Kirim pesanan sesuai janji, lalu lihat jawaban dari dapur.',
          'Panggil endpoint sesuai kontrak, lalu amati bentuk balasannya.',
        ),
      ),
      qStep({
        id: 'b01-l04-q3',
        type: 'hotspot',
        prompt: t(
          'Ketuk bagian colokan yang menjadi janji kedua pihak.',
          'Ketuk bagian sistem colokan listrik yang berperan sebagai kontrak API.',
        ),
        difficulty: 2,
        image: 'b01-hotspot',
        regions: [
          { id: 'r1', shape: 'rect', coords: [10, 10, 100, 50], label: 'Kabel di dalam tembok' },
          { id: 'r2', shape: 'rect', coords: [120, 10, 220, 50], label: 'Lubang steker' },
          { id: 'r3', shape: 'rect', coords: [240, 10, 340, 50], label: 'Kipas angin' },
        ],
        answer: 'r2',
        explainCorrect: t(
          'Lubang steker standar dipegang kedua pihak. Semua alat cocok dengannya.',
          'Lubang steker standar adalah titik temu yang disepakati pemasok listrik dan alat.',
        ),
        explainIncorrect: {
          r1: t(
            'Kabel di dalam tembok tersembunyi. Ia seperti dapur yang boleh berubah.',
            'Kabel di dalam tembok ibarat backend yang tersembunyi.',
          ),
          r3: t(
            'Kipas memakai listrik. Ia seperti aplikasi tamu.',
            'Kipas angin ibarat aplikasi frontend yang memakai layanan.',
          ),
        },
        hints: [t('Cari bagian yang sama bentuknya di kedua sisi.'), undefined],
        tags: ['kontrak-api'],
      }),
      qStep(
        makeMcq({
          id: 'b01-l04-q4',
          type: 'limit',
          analogy: t('Kontrak API seperti colokan listrik'),
          prompt: t(
            'Aplikasi terus menambah fitur. Apa yang terjadi pada janji API?',
            'Apa yang membedakan kontrak API dari colokan listrik dalam hal perubahan?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'ver',
              label: t('Janji baru ditulis dan diberi nomor urut', 'Kontrak API sering bertambah, jadi perlu dokumentasi dan versi'),
            },
            {
              id: 'std',
              label: t('Janji dibuat sekali dan dibiarkan sama', 'Kontrak API butuh kesepakatan standar antara dua sisi'),
              explainWrong: t(
                'Fitur aplikasi terus bertambah. Jadi janjinya juga ikut bertambah.',
                'Itu justru kesamaan keduanya. Pembedanya ada pada fitur yang terus bertambah.',
              ),
            },
            {
              id: 'hide',
              label: t(
                'Janji diganti diam-diam tanpa kabar',
                'Kontrak API menyembunyikan cara kerja di balik server',
              ),
              explainWrong: t(
                'Janji tidak boleh diganti diam-diam. Tamu bisa bingung dan layar rusak.',
                'Itu juga kesamaan keduanya. Colokan dan API sama-sama menyembunyikan isi di baliknya.',
              ),
            },
          ],
          answer: 'ver',
          explainCorrect: t(
            'Janji baru ditulis dan diberi nomor urut, seperti 1, 2, 3. Aplikasi lama tetap memakai janji lama.',
            'Fitur API terus bertambah, jadi kontraknya perlu dokumentasi dan versi (v1, v2). Client lama tetap berjalan di versi lama.',
          ),
          hints: [t('Ingat: aplikasi terus bertambah fitur.')],
          tags: ['kontrak-api'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b01-l04-q6',
          type: 'why',
          modes: ['pro'],
          base: 'Kontrak API antara frontend dan backend harus dicatat dengan jelas.',
          prompt: t('Mengapa perubahan bentuk data API tidak boleh dilakukan diam-diam?'),
          difficulty: 2,
          choices: [
            { id: 'sync', label: t('Agar tim frontend tahu kapan harus menyesuaikan kode') },
            {
              id: 'font',
              label: t('Agar server tidak kewalahan menerima permintaan lama'),
              explainWrong: t('Jumlah permintaan tidak berubah karena nama kolom. Masalahnya ada di frontend yang kehilangan data.'),
            },
            {
              id: 'ip',
              label: t('Agar alamat server tetap sama setelah perubahan'),
              explainWrong: t('Kontrak mengatur bentuk pesan, bukan alamat server. Alamat bisa tetap sama saat bentuk data berubah.'),
            },
          ],
          answer: 'sync',
          explainCorrect: t('Dokumentasi dan versi memberi waktu bagi tim frontend. Aplikasi pemakai tidak rusak mendadak.'),
          hints: [t('Pikirkan siapa yang membaca nama data itu.')],
          tags: ['kontrak-api'],
        }),
      ),
      qStep({
        id: 'b01-l04-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi kalimat tentang prinsip kontrak API.'),
        difficulty: 2,
        template: 'Perubahan nama kolom dicatat di ___ dan dirilis sebagai ___ baru, supaya tampilan ___ tidak rusak.',
        bank: ['versi', 'dokumentasi', 'frontend', 'backend'],
        answer: ['dokumentasi', 'versi', 'frontend'],
        explainCorrect: t('Dokumentasi dan versi melindungi frontend saat API berkembang.'),
        hints: [t('Satu tempat mencatat, satu nomor rilis, lalu siapa yang terdampak.'), undefined],
        tags: ['kontrak-api', 'frontend'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b01-l04-r1',
        prompt: t('Mengapa API disebut kontrak?', 'Mengapa API disebut kontrak?'),
        choices: [
          {
            id: 'j',
            label: t('Karena ada janji bentuk pesan dan jawaban'),
          },
          {
            id: 'u',
            label: t('Karena harus ada tanda tangan dulu'),
            explainWrong: t(
              'Janji di sini bukan tanda tangan. Ini kesepakatan antara dua program.',
              'Kontrak di sini adalah kesepakatan aturan teknis antara dua program, bukan dokumen yang ditandatangani.',
            ),
          },
          {
            id: 'x',
            label: t('Karena dapur harus tetap sama persis'),
            explainWrong: t(
              'Dapur boleh berubah. Yang dijaga hanya bentuk pesanan dan jawabannya.',
              'Isi backend boleh berubah. Yang dijaga hanya bentuk request dan response.',
            ),
          },
        ],
        answer: 'j',
        explainCorrect: t(
          'Ada janji yang tetap tentang cara meminta dan bentuk jawaban.',
          'Kontrak API menjamin permintaan dengan cara A selalu dibalas dalam bentuk B.',
        ),
        hints: [t('Ingat janji antara dua pihak.')],
        tags: ['kontrak-api'],
      }),
      makeTf({
        id: 'b01-l04-r2',
        prompt: t(
          'Mengganti nama data API diam-diam bisa merusak layar aplikasi.',
          'Mengubah nama kolom data API tanpa memberi tahu frontend bisa merusak tampilan aplikasi.',
        ),
        answer: true,
        explainCorrect: t(
          'Layar mencari nama yang sudah dijanjikan. Kalau nama berubah, layar tidak menemukannya.',
          'Frontend bergantung pada bentuk jawaban yang sudah disepakati.',
        ),
        explainWrong: t(
          'Layar tidak bisa menebak nama baru. Ia hanya mencari nama yang dijanjikan.',
          'Kode frontend tidak bisa menebak nama kolom baru kalau berubah diam-diam.',
        ),
        hints: [t('Ingat layar yang mencari nama lama.')],
        tags: ['kontrak-api'],
      }),
    ],
    recap: t(
      'Selama janji bentuk pesan dijaga, dapur boleh berubah.',
      'Kontrak API dijaga lewat dokumentasi dan versi supaya aplikasi lama tidak rusak.',
    ),
    companion: {
      talkPrompts: ['Apa yang terjadi kalau steker tidak cocok dengan lubang dinding?'],
      offlineActivity:
        'Bersama orang dewasa, lihat colokan dan stopkontak di rumah. Lihat saja, jangan disentuh atau dicolok. Perhatikan bagaimana bentuk yang sama membuat semua alat cocok.',
    },
  }),
];
