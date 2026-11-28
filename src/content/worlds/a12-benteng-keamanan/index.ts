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
import type { Lesson, World } from '@/content/schema';

export const world: World = {
  id: 'a12',
  track: 'A',
  order: 12,
  title: 'Benteng Keamanan',
  tagline: t(
    'Jaga halaman tetap aman. Jangan simpan rahasia di ruang tamu.',
    'Kamu bisa mengenali dan menutup celah umum seperti XSS di sisi frontend.',
  ),
  color: '#D23B2A',
  illustration: 'a12-benteng-keamanan',
  sourceChapters: ['J1-17'],
  requires: ['a11'],
  lessons: ['a12-l01', 'a12-l02', 'a12-l03', 'a12-l04'],
  sideQuests: [],
  boss: {
    title: 'Tantangan Penjaga Benteng',
    greeting: t(
      'Selamat datang di Benteng Keamanan! Ayo uji caramu menjaga situs dan rahasia tetap aman.',
      'Uji kemampuanmu menjaga frontend tetap aman. Soalnya diambil dari seluruh pelajaran di Benteng Keamanan.',
    ),
    guardianName: 'Penjaga Benteng',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'a12-anc-j1',
        prompt: t('Situs seperti bank. Di mana brankas uangnya disimpan?'),
        choices: [
          { id: 'be', label: t('Di ruang dalam yang terkunci') },
          {
            id: 'fe',
            label: t('Di meja depan yang terbuka'),
            explainWrong: t('Meja depan terlihat semua pengunjung. Brankas tidak ditaruh di sana.'),
          },
          {
            id: 'url',
            label: t('Di alamat situs di atas layar'),
            explainWrong: t('Alamat situs tercatat di riwayat. Rahasia tidak disimpan di sana.'),
          },
        ],
        answer: 'be',
        explainCorrect: t('Rahasia disimpan di ruang dalam. Meja depan terlihat semua orang.'),
        tags: ['sanitasi', 'rahasia-frontend'],
      }),
      makeAnchorMcq({
        id: 'a12-anc-j2',
        prompt: t('Bagaimana cara aman menampilkan komentar tamu di halaman?'),
        choices: [
          { id: 'tc', label: t('Tampilkan sebagai tulisan biasa') },
          {
            id: 'ih',
            label: t('Tampilkan sebagai perintah yang bekerja'),
            explainWrong: t('Tulisan yang dianggap perintah bisa ikut bekerja. Itu berbahaya.'),
          },
          {
            id: 'ev',
            label: t('Biarkan isinya bekerja dulu sebelum tampil'),
            explainWrong: t('Isi komentar jadi bekerja seperti perintah. Itu membuka pintu orang jahat.'),
          },
        ],
        answer: 'tc',
        explainCorrect: t('Tulisan biasa hanya dibaca. Tulisan itu tidak ikut bekerja.'),
        tags: ['xss', 'sanitasi'],
      }),
      makeAnchorMcq({
        id: 'a12-anc-j3',
        prompt: t('Bolehkah kata sandi rahasia ditulis di halaman yang terbuka?'),
        choices: [
          { id: 'no', label: t('Tidak boleh, semua orang bisa membukanya') },
          {
            id: 'yes',
            label: t('Boleh kalau warnanya sama dengan latar'),
            explainWrong: t('Siapa pun bisa membuka isi halaman. Warna tidak menyembunyikan apa-apa.'),
          },
          {
            id: 'hide',
            label: t('Boleh kalau tombolnya disembunyikan'),
            explainWrong: t('Tombol yang disembunyikan tetap ada di halaman. Isinya masih bisa dibaca.'),
          },
        ],
        answer: 'no',
        explainCorrect: t('Semua kode halaman terbuka untuk pengunjung. Rahasia disimpan di ruang dalam.'),
        tags: ['rahasia-frontend'],
      }),
      makeAnchorMcq({
        id: 'a12-anc-j4',
        prompt: t('Seseorang salah mengetik kata sandi. Pesan mana yang paling aman?'),
        choices: [
          { id: 'gen', label: t('"Email atau kata sandi salah"') },
          {
            id: 'det',
            label: t('"Email benar, kata sandi kurang satu angka"'),
            explainWrong: t('Pesan yang terlalu rinci membantu orang jahat menebak.'),
          },
          {
            id: 'show',
            label: t('"Email ini belum terdaftar"'),
            explainWrong: t('Pesan ini memberi tahu email mana yang terdaftar. Orang jahat jadi tahu.'),
          },
        ],
        answer: 'gen',
        explainCorrect: t('Pesan umum tidak membocorkan apakah email itu terdaftar.'),
        tags: ['sanitasi'],
      }),
      makeAnchorMcq({
        id: 'a12-anc-j5',
        prompt: t('Apa beda kertas jahat di papan sekolah dan di halaman web?'),
        type: 'limit',
        analogy: t('Papan pengumuman yang ditempeli kertas tanpa diperiksa'),
        choices: [
          { id: 'run', label: t('Tulisan di web bisa bekerja seperti perintah') },
          {
            id: 'trust',
            label: t('Orang percaya karena tampil di tempat resmi'),
            explainWrong: t('Ini mirip di keduanya. Orang percaya pada papan resmi.'),
          },
          {
            id: 'filter',
            label: t('Kiriman orang asing tidak diperiksa dulu'),
            explainWrong: t('Ini juga sama di keduanya. Kertas dan kiriman sama-sama perlu diperiksa.'),
          },
        ],
        answer: 'run',
        explainCorrect: t('Kertas hanya dibaca. Tulisan jahat di web bisa bekerja seperti perintah.'),
        tags: ['xss'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a12-anc-p1',
        prompt: t('Mengapa form yang sudah divalidasi di frontend tetap harus diperiksa di backend?'),
        choices: [
          { id: 'dev', label: t('Karena server harus memeriksa sendiri data yang diterima') },
          {
            id: 'css',
            label: t('Karena CSS menghapus nilai isian sebelum form dikirim ke server'),
            explainWrong: t('CSS hanya mengatur tampilan. Masalahnya, kode frontend berjalan di perangkat pengunjung dan bisa diubah.'),
          },
          {
            id: 'font',
            label: t('Karena browser lama tidak mendukung validasi bawaan HTML di form'),
            explainWrong: t('Browser lama memang bisa berbeda. Pemeriksaan ulang tetap perlu karena request bisa dikirim tanpa melewati frontend.'),
          },
        ],
        answer: 'dev',
        explainCorrect: t('Validasi frontend memberi kenyamanan karena cepat. Validasi backend adalah pengaman sesungguhnya.'),
        tags: ['sanitasi'],
      }),
      makeAnchorMcq({
        id: 'a12-anc-p2',
        prompt: t('Skrip jahat tersimpan di database, misalnya di kolom komentar, lalu menyerang semua pembaca. Apa nama serangannya?'),
        choices: [
          { id: 'stored', label: t('Stored XSS') },
          {
            id: 'ref',
            label: t('Reflected XSS'),
            explainWrong: t('Reflected XSS berasal dari tautan atau parameter pencarian yang langsung dipantulkan server, tanpa disimpan.'),
          },
          {
            id: 'click',
            label: t('Clickjacking'),
            explainWrong: t('Clickjacking menipu klik lewat iframe transparan, bukan lewat komentar yang tersimpan.'),
          },
        ],
        answer: 'stored',
        explainCorrect: t('Stored XSS tersimpan di database, jadi berjalan di browser setiap pembaca halaman itu.'),
        tags: ['xss'],
      }),
      makeAnchorMcq({
        id: 'a12-anc-p3',
        prompt: t('Bagaimana cara paling tepat mencegah clickjacking di situsmu?'),
        choices: [
          { id: 'csp', label: t("Server mengirim header frame-ancestors 'self' atau X-Frame-Options: DENY") },
          {
            id: 'ls',
            label: t('Menyimpan token di localStorage'),
            explainWrong: t('localStorage rawan dicuri saat ada XSS, dan tidak menahan clickjacking.'),
          },
          {
            id: 'get',
            label: t('Mengubah semua form hapus menjadi method GET'),
            explainWrong: t('Aksi yang mengubah data justru memakai POST, PUT, atau DELETE. GET tidak mencegah clickjacking.'),
          },
        ],
        answer: 'csp',
        explainCorrect: t('Header frame-ancestors atau X-Frame-Options melarang situs lain menanam halamanmu di iframe tersembunyi.'),
        tags: ['csrf'],
      }),
      makeAnchorMcq({
        id: 'a12-anc-p4',
        prompt: t('Mengapa token login lebih aman di cookie HttpOnly daripada di localStorage?'),
        choices: [
          { id: 'httponly', label: t('Karena JavaScript tidak bisa membaca cookie HttpOnly') },
          {
            id: 'size',
            label: t('Karena localStorage hanya bisa menampung angka'),
            explainWrong: t('localStorage menyimpan string, tetapi skrip apa pun di halaman bisa membacanya.'),
          },
          {
            id: 'offline',
            label: t('Karena cookie berjalan tanpa bantuan server'),
            explainWrong: t('Server memasang HttpOnly untuk menutup akses dari skrip halaman. Atribut Secure membatasi pengiriman cookie ke koneksi aman.'),
          },
        ],
        answer: 'httponly',
        explainCorrect: t('HttpOnly menutup akses JavaScript, Secure mewajibkan HTTPS, dan SameSite menahan kiriman otomatis dari situs jebakan.'),
        tags: ['rahasia-frontend', 'csrf'],
      }),
      makeAnchorMcq({
        id: 'a12-anc-p5',
        prompt: t('Mengapa kunci rahasia dengan awalan VITE_ atau NEXT_PUBLIC_ di file .env tetap berbahaya?'),
        choices: [
          { id: 'pub', label: t('Awalan itu membuat nilainya ikut terkirim ke browser') },
          {
            id: 'git',
            label: t('File .env otomatis diunggah ke GitHub'),
            explainWrong: t('Unggahan ke Git hanya terjadi kalau kamu mendorong filenya. Bahaya di sini datang dari awalan publik.'),
          },
          {
            id: 'err',
            label: t('Node.js tidak bisa membaca file .env'),
            explainWrong: t('Node.js bisa membacanya. Tetapi awalan publik membuat nilainya masuk ke kode browser.'),
          },
        ],
        answer: 'pub',
        explainCorrect: t('Variabel berawalan publik ikut masuk ke kode frontend dan terlihat lewat DevTools.'),
        tags: ['rahasia-frontend'],
      }),
      makeAnchorMcq({
        id: 'a12-anc-p6',
        type: 'limit',
        analogy: t('CSRF seperti menyerahkan kertas palsu saat memakai gelang akses gedung'),
        choices: [
          { id: 'auto', label: t('Browser mengirim cookie otomatis, tanpa bertanya apakah kamu setuju') },
          {
            id: 'badge',
            label: t('Server mengenali kamu dari tanda akses yang sudah terpasang'),
            explainWrong: t('Ini kesamaan: cookie sesi dan gelang akses sama-sama menandai identitasmu.'),
          },
          {
            id: 'trick',
            label: t('Perintah datang dari pihak ketiga, bukan dari niatmu sendiri'),
            explainWrong: t('Ini juga kesamaan: perintah palsu itu bukan niatmu sendiri.'),
          },
        ],
        prompt: t('Apa batas analogi gelang akses gedung untuk menjelaskan CSRF?'),
        answer: 'auto',
        explainCorrect: t('Resepsionis bisa ragu melihat surat aneh, tetapi browser mengirim cookie begitu saja. Karena itu situs perlu CSRF token dan SameSite.'),
        tags: ['csrf'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'a12-l01',
    worldId: 'a12',
    title: 'Aturan emas: jangan percaya masukan',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menyebutkan alasan semua ketikan tamu harus diperiksa.',
      'Kamu bisa mengamankan form dengan escaping dan validasi dua sisi.',
    ),
    atWork: 'Saat meninjau form pendaftaran, kamu akan memastikan server memeriksa ulang setiap isian.',
    estMinutes: 6,
    introducesTerms: ['sanitasi'],
    usesTerms: ['frontend', 'backend', 'https', 'url', 'browser'],
    stickerId: 'brankas-bank',
    warmupFrom: 'a11-l07',
    steps: [
      storyStep('a12/brankas-bank.svg', [
        rText(
          'Bank punya meja depan yang ramah. Uang disimpan di brankas di dalam. Mengapa uang tidak ditaruh di meja depan?',
          'Form pendaftaran Toko Rani menolak email kosong di layar, tetapi penyerang bisa mengirim data langsung ke server. Bayangkan bank: frontend adalah meja depan, backend adalah brankas dan petugas pemeriksa.',
        ),
      ]),
      conceptStep({
        title: t('Tiga Aturan Emas', 'Tiga Aturan Emas Frontend'),
        visualName: 'RestoranDiagram',
        visualProps: { worldId: 'a12', topic: 'aturan-emas-keamanan' },
        alt: t(
          'Meja depan bank terbuka untuk semua. Brankas ada di ruang dalam.',
          'Meja depan frontend terbuka untuk siapa saja. Pengaman sesungguhnya ada di backend.',
        ),
        body: [
          rText(
            'Aturan 1: jangan percaya tulisan dari tamu. Aturan 2: isi halaman bisa diintip. Aturan 3: pengaman utama ada di ruang dalam, yaitu ',
            '1) Jangan percaya masukan (ketikan, tempelan, atau URL). 2) Semua kode di browser bisa dilihat lewat DevTools. 3) Pengaman sesungguhnya ada di ',
          ),
          rTerm('backend', 'backend', 'backend'),
          rText('.', '.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a12-l01-q1',
          type: 'analogy',
          prompt: t(
            'Meja depan sudah memeriksa formulir. Mengapa petugas di dalam memeriksanya lagi?',
            'Dalam analogi bank, mengapa petugas di dalam tetap memeriksa ulang formulir yang sudah dicek di meja depan?',
          ),
          choices: [
            {
              id: 'both',
              label: t('Karena aturan meja depan bisa dilewati', 'Karena aturan frontend bisa dilewati lewat DevTools'),
            },
            {
              id: 'slow',
              label: t('Karena meja depan sering salah memeriksa', 'Karena frontend sering salah memeriksa format isian'),
              explainWrong: t(
                'Meja depan biasanya memeriksa dengan benar. Masalahnya, orang bisa melewati meja itu.',
                'Kesalahan format bisa terjadi di mana saja. Alasan utamanya, kode frontend ada di perangkat pengunjung dan bisa diubah.',
              ),
            },
            {
              id: 'css',
              label: t('Karena meja depan tidak boleh memeriksa', 'Karena frontend tidak bisa memeriksa isian sama sekali'),
              explainWrong: t(
                'Meja depan boleh memeriksa supaya pengunjung nyaman. Tetapi pemeriksaan akhir tetap di dalam.',
                'Frontend boleh memeriksa isian, misalnya kolom kosong. Tetapi hasilnya bisa dilewati, jadi backend memeriksa ulang.',
              ),
            },
          ],
          answer: 'both',
          explainCorrect: t(
            'Aturan meja depan bisa dilewati. Karena itu petugas di dalam memeriksa sekali lagi.',
            'Frontend hanya memberi kenyamanan karena kodenya ada di perangkat pengunjung. Backend memeriksa ulang sebagai pengaman sesungguhnya.',
          ),
          hints: [t('Ingat siapa yang menjaga brankas di dalam.', 'Pikirkan siapa yang bisa mengubah kode di browser.')],
          tags: ['sanitasi', 'backend'],
        }),
      ),
      conceptStep({
        title: t('Periksa di Dua Tempat', 'Validasi Dua Sisi & Escaping'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'validasi-escaping' },
        alt: t(
          'Tanda aneh diubah menjadi tulisan biasa supaya tidak dijalankan.',
          'Karakter < diubah menjadi &lt; lewat escaping agar tidak dianggap tag.',
        ),
        code: {
          lang: 'html',
          code: 'Masukan:  <script>\nEscaped:  &lt;script&gt;',
        },
        body: [
          rTerm('sanitasi', 'Escaping', 'Escaping'),
          rText(' adalah cara mengubah tanda aneh seperti ', ' adalah cara mengubah karakter khusus seperti '),
          rCode('<'),
          rText(
            ' menjadi tulisan biasa. Tulisan tamu diperiksa di meja depan dan di ruang dalam.',
            ' menjadi &lt; agar tidak dianggap tag. Validasi dilakukan di dua sisi: di layar untuk kenyamanan, di server untuk keamanan.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a12-l01-q2',
          prompt: t(
            'Apa tugas escaping pada tulisan dari tamu?',
            'Apa tujuan escaping pada teks yang diketik pengunjung?',
          ),
          choices: [
            {
              id: 'esc',
              label: t('Mengubah tanda berbahaya menjadi tulisan biasa', 'Mengubah karakter khusus seperti < menjadi teks biasa'),
            },
            {
              id: 'del',
              label: t('Menghapus tulisan tamu yang tampak mencurigakan', 'Menghapus komentar berisi karakter khusus secara otomatis'),
              explainWrong: t(
                'Tulisan tamu tetap tampil. Hanya tanda berbahayanya yang diganti.',
                'Komentar tetap tampil. Hanya karakter HTML-nya yang dinetralkan.',
              ),
            },
            {
              id: 'run',
              label: t('Membuat tulisan tamu tampil lebih rapi', 'Merapikan format komentar sebelum disimpan'),
              explainWrong: t(
                'Escaping tidak merapikan tampilan. Tugasnya membuat tanda berbahaya tidak ikut bekerja.',
                'Escaping tidak merapikan format. Ia mencegah teks dari pengunjung dijalankan sebagai kode.',
              ),
            },
          ],
          answer: 'esc',
          explainCorrect: t(
            'Tanda berbahaya diubah menjadi tulisan biasa. Tulisan tamu aman dibaca dan tidak dijalankan.',
            'Escaping mengubah < menjadi &lt;. Browser lalu menampilkannya sebagai teks, bukan tag.',
          ),
          hints: [t('Ingat tamu yang menulis tanda aneh di formulir.', 'Pikirkan apa yang terjadi pada tanda < di komentar.')],
          tags: ['sanitasi'],
        }),
      ),
      conceptStep({
        title: t('Pakai Amplop Terkunci', 'Wajib HTTPS & Pesan Error Aman'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'https-error-aman' },
        alt: t('Koneksi HTTPS terenkripsi dibanding HTTP biasa, serta pesan login umum yang aman.'),
        modes: ['pro'],
        body: [
          rText('Selalu pakai '),
          rTerm('https', 'HTTPS', 'HTTPS'),
          rText(
            ', versi HTTP yang terenkripsi, agar data tidak disadap. Jangan memuat berkas lewat http://toko-rani.example tanpa enkripsi. Saat login gagal, tampilkan pesan umum "Email atau kata sandi salah" agar akun yang terdaftar tidak bocor.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a12-l01-q5',
          type: 'scenario',
          modes: ['pro'],
          story: t('Bito membuat toko online di https://toko-rani.example, tetapi memuat gambar dan skrip dari http://situs-lain.example tanpa gembok HTTPS.'),
          prompt: t('Mengapa memuat file lewat HTTP biasa berbahaya?'),
          difficulty: 2,
          choices: [
            { id: 'sniff', label: t('Data lewat HTTP tidak terenkripsi, jadi bisa disadap') },
            {
              id: 'color',
              label: t('Browser tidak bisa menampilkan gambar lewat HTTP'),
              explainWrong: t('Browser modern memblokir skrip HTTP di halaman HTTPS. Untuk gambar, browser dapat mencoba HTTPS atau memblokir pemuatan.'),
            },
            {
              id: 'size',
              label: t('File lewat HTTP berukuran lebih besar dan lambat dimuat'),
              explainWrong: t('Ukuran file tidak berubah karena HTTP. Masalahnya ada di jalur yang tidak terenkripsi.'),
            },
          ],
          answer: 'sniff',
          explainCorrect: t('HTTP tidak mengenkripsi data, jadi orang di jalur jaringan bisa membaca atau mengubah file. Semua file halaman perlu HTTPS.'),
          hints: [t('Pikirkan siapa yang bisa melihat data di tengah jalan.')],
          tags: ['https', 'sanitasi'],
        }),
      ),
      limitStep({
        analogy: t('Meja depan bank dan brankas', 'Frontend sebagai meja depan bank dan backend sebagai brankas'),
        same: [
          t(
            'Meja depan hanya membantu. Keputusan akhir ada di dalam.',
            'Frontend membantu mengisi form dengan nyaman. Keputusan akhir dan rahasia ada di backend.',
          ),
        ],
        different: [
          t(
            'Di web, pengunjung bisa mengubah aturan meja depan lewat HP-nya.',
            'Di bank, pengunjung tidak bisa mengubah aturan di meja. Di browser, ia bisa mengubah aturan lewat DevTools.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'benteng-xss',
        t(
          'Ketik tulisan aneh di Benteng Uji, lalu coba mode aman.',
          'Ketik <script> di simulator Benteng Uji XSS dan bandingkan mode biasa dengan mode aman.',
        ),
      ),
      qStep(
        makeTf({
          id: 'a12-l01-q6',
          prompt: t(
            'Tulisan tamu yang pendek juga harus diperiksa dulu.',
            'Apa pun yang diketik, ditempel, atau datang dari URL tidak boleh dipercaya sebelum diperiksa.',
          ),
          answer: true,
          explainCorrect: t(
            'Tulisan pendek pun bisa berisi tanda berbahaya. Periksa semua, seperti petugas bank memeriksa formulir.',
            'Masukan dari luar bisa berisi kode berbahaya. Karena itu semua masukan harus diperiksa.',
          ),
          explainWrong: t(
            'Pendek tidak berarti aman. Petugas bank memeriksa setiap formulir.',
            'Ketikan, tempelan, dan parameter URL bisa berisi kode berbahaya, jadi harus diperiksa.',
          ),
          hints: [t('Ingat petugas bank dan formulir tamu.', 'Pikirkan siapa yang mengontrol isi masukan itu.')],
          tags: ['sanitasi', 'url'],
        }),
      ),
      qStep({
        id: 'a12-l01-q3',
        type: 'sort',
        prompt: t(
          'Kelompokkan tugas ini: meja depan atau ruang dalam.',
          'Kelompokkan tugas ini ke Frontend (kenyamanan) atau Backend (pengaman utama):',
        ),
        difficulty: 2,
        items: [
          {
            id: 'f1',
            label: t('Mengingatkan cepat kalau kotak email kosong', 'Menampilkan pesan cepat saat kotak email masih kosong'),
          },
          {
            id: 'b1',
            label: t('Memeriksa harga asli dan izin sebelum bayar', 'Memeriksa ulang harga asli dan hak akses sebelum bayar'),
          },
          {
            id: 'f2',
            label: t('Memberi tanda centang hijau kalau isian pas', 'Memberi ikon centang hijau bila format nomor sudah pas'),
          },
          {
            id: 'b2',
            label: t('Menyimpan kata sandi dan kunci rahasia', 'Menyimpan kata sandi dan kunci rahasia di server'),
          },
        ],
        bins: [
          { id: 'fe', label: t('Meja depan', 'Frontend (kenyamanan)'), icon: 'store' },
          { id: 'be', label: t('Ruang dalam', 'Backend (pengaman utama)'), icon: 'lock' },
        ],
        answer: { f1: 'fe', b1: 'be', f2: 'fe', b2: 'be' },
        explainCorrect: t(
          'Meja depan membantu mengisi dengan nyaman. Ruang dalam memegang keputusan dan rahasia.',
          'Frontend hanya memberi kenyamanan. Backend memegang keputusan akhir dan rahasia.',
        ),
        hints: [t('Ingat siapa yang menjaga brankas.', 'Tanyakan: bagian mana yang bisa diubah pengunjung?'), undefined],
        tags: ['sanitasi', 'frontend', 'backend'],
      }),
      qStep(
        makeMcq({
          id: 'a12-l01-q4',
          type: 'limit',
          analogy: t('Meja depan bank dan brankas'),
          prompt: t(
            'Di web, apa yang bisa dilakukan pengunjung pada aturan meja depan?',
            'Risiko apa yang hanya ada di browser, bukan di formulir kertas meja bank?',
          ),
          choices: [
            {
              id: 'mod',
              label: t('Mengubah aturan itu di layarnya sendiri', 'Pengunjung bisa mengubah validasi di DevTools'),
            },
            {
              id: 'ask',
              label: t('Hanya membaca aturan, tanpa bisa mengubah', 'Form tampil rapi dan nyaman diisi pengunjung'),
              explainWrong: t(
                'Di bank memang begitu. Di web, pengunjung bisa mengubah aturan di layarnya.',
                'Kenyamanan mengisi form juga ada di bank. Itu bukan perbedaannya.',
              ),
            },
            {
              id: 'check',
              label: t('Meminta ruang dalam mengubah aturan itu', 'Petugas di dalam memeriksa ulang data yang masuk'),
              explainWrong: t(
                'Ruang dalam tidak mengikuti permintaan pengunjung. Yang berubah hanya layar pengunjung itu.',
                'Pemeriksaan ulang di dalam juga ada di keduanya. Itu bukan perbedaannya.',
              ),
            },
          ],
          answer: 'mod',
          explainCorrect: t(
            'Meja depan web ada di HP pengunjung. Karena itu aturannya bisa diubah.',
            'Kode frontend berjalan di perangkat pengunjung, jadi aturan validasinya mudah dilewati.',
          ),
          hints: [t('Bayangkan HP milik pengunjung.', 'Tanyakan: kode itu berjalan di perangkat siapa?')],
          tags: ['sanitasi', 'browser'],
        }),
      ),
      qStep({
        id: 'a12-l01-q7',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi hasil escaping agar < dan > aman tampil sebagai teks:'),
        template: 'Tanda < diubah menjadi ___, dan tanda > diubah menjadi ___.',
        bank: ['&lt;', '&gt;', '&amp;', 'innerHTML'],
        answer: ['&lt;', '&gt;'],
        explainCorrect: t('Escaping mengganti < dengan &lt; dan > dengan &gt;. Browser lalu menampilkannya sebagai tulisan biasa.'),
        hints: [t('Huruf l dan g di sini berarti "lebih kecil" dan "lebih besar".'), undefined],
        tags: ['sanitasi'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a12-l01-r1',
        prompt: t(
          'Siapa yang bisa membuka dan membaca kode halaman?',
          'Siapa yang bisa membuka kode frontend yang dikirim ke browser?',
        ),
        choices: [
          { id: 'any', label: t('Siapa saja yang membukanya', 'Siapa saja lewat DevTools') },
          {
            id: 'only',
            label: t('Hanya orang yang membuatnya', 'Hanya pembuat situs'),
            explainWrong: t(
              'Kode itu dikirim ke HP setiap pengunjung. Jadi bukan hanya pembuatnya yang bisa melihat.',
              'Kode frontend dikirim ke komputer pengunjung dan terbuka di DevTools.',
            ),
          },
          {
            id: 'key',
            label: t('Hanya orang yang punya kunci', 'Hanya orang yang sudah login'),
            explainWrong: t(
              'Tidak perlu kunci untuk membuka kode halaman. Siapa saja bisa membacanya.',
              'Login tidak diperlukan untuk membaca kode frontend. Kodenya sudah ada di browser pengunjung.',
            ),
          },
        ],
        answer: 'any',
        explainCorrect: t(
          'Kode halaman dikirim ke HP pengunjung. Jadi siapa saja bisa membacanya.',
          'Kode frontend dikirim ke browser pengunjung. Karena itu rahasia tidak boleh ada di sana.',
        ),
        hints: [t('Ingat meja depan yang terbuka untuk tamu.', 'Pikirkan ke mana kode frontend dikirim.')],
        tags: ['sanitasi', 'browser'],
      }),
      makeTf({
        id: 'a12-l01-r2',
        prompt: t(
          'Cukup memeriksa di meja depan. Ruang dalam tidak perlu memeriksa lagi.',
          'Frontend sudah cukup memeriksa form. Backend tidak perlu memeriksa ulang.',
        ),
        answer: false,
        explainCorrect: t(
          'Meja depan bisa dilewati. Ruang dalam tetap harus memeriksa.',
          'Validasi di layar bisa dimatikan lewat DevTools. Karena itu backend wajib memeriksa ulang.',
        ),
        explainWrong: t(
          'Meja depan hanya membantu pengunjung. Pemeriksaan akhir ada di ruang dalam.',
          'Backend tetap memeriksa karena frontend mudah dilewati. Frontend hanya memberi kenyamanan.',
        ),
        hints: [t('Ingat siapa yang bisa melewati meja depan.', 'Pikirkan siapa yang mengendalikan kode frontend.')],
        tags: ['sanitasi', 'backend'],
      }),
    ],
    recap: t(
      'Tulisan tamu diperiksa dulu, pengaman utama ada di ruang dalam.',
      'Terapkan validasi dua sisi dan escaping. Frontend memberi kenyamanan, backend memegang keputusan akhir.',
    ),
    companion: {
      talkPrompts: ['Mengapa brankas bank disimpan di ruang dalam?'],
      offlineActivity:
        'Main "Pemeriksa Formulir": kakak menulis formulir dengan kata-kata aneh di kertas, adik memeriksa apakah isiannya masuk akal sebelum masuk ke "brankas".',
    },
  }),

  makeLesson({
    id: 'a12-l02',
    worldId: 'a12',
    title: 'XSS: papan pengumuman tanpa disaring',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menyebutkan cara aman menampilkan tulisan tamu di halaman.',
      'Kamu bisa menjelaskan tiga jenis XSS dan cara mencegahnya dengan textContent, escaping, DOMPurify, dan CSP.',
    ),
    atWork: 'Kamu akan menemukan celah ini saat meninjau kode yang menampilkan komentar atau ulasan pembeli.',
    estMinutes: 7,
    introducesTerms: ['xss'],
    usesTerms: ['sanitasi', 'javascript', 'html', 'dom', 'browser'],
    stickerId: 'papan-pengumuman',
    warmupFrom: 'a12-l01',
    steps: [
      storyStep('a12/papan-pengumuman.svg', [
        rText(
          'Papan pengumuman sekolah boleh ditempeli kertas oleh siapa saja. Tidak ada yang memeriksa. Apa yang terjadi kalau ada kertas jebakan?',
          'Kolom komentar Toko Rani menampilkan tulisan pembeli apa adanya, termasuk kode JavaScript yang diselipkan penyerang. Apa akibatnya bagi pembaca komentar itu?',
        ),
      ]),
      conceptStep({
        title: t('Apa Itu XSS?', 'Cara Kerja & Tiga Jenis XSS'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'alur-xss' },
        alt: t(
          'Orang jahat menyelipkan perintah di komentar. Perintah itu bekerja di layar pembaca.',
          'Penyerang mengirim komentar berisi skrip, situs menampilkannya tanpa saring, lalu berjalan di browser pembaca.',
        ),
        body: [
          rTerm('xss', 'XSS', 'XSS (Cross-Site Scripting)'),
          rText(
            ' adalah celah saat tulisan nakal tamu ikut bekerja di halaman. Seperti kertas jebakan di papan sekolah. Orang yang membacanya ikut terkena.',
            ' terjadi ketika skrip berbahaya ikut berjalan di browser korban. Ada tiga jenisnya: Stored lewat database, Reflected lewat tautan, dan DOM-based lewat skrip halaman.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a12-l02-q1',
          type: 'analogy',
          prompt: t(
            'Mengapa XSS seperti papan pengumuman tanpa penjaga?',
            'Mengapa XSS diumpamakan seperti papan pengumuman sekolah yang boleh ditempeli tanpa diperiksa?',
          ),
          choices: [
            {
              id: 'trust',
              label: t(
                'Karena tulisan orang asing tampil tanpa diperiksa',
                'Kiriman orang asing tampil tanpa disaring lalu dijalankan browser',
              ),
            },
            {
              id: 'paper',
              label: t(
                'Karena hanya orang dalam yang boleh menempel di papan itu',
                'Hanya admin yang boleh mengirim tulisan ke halaman itu, jadi aman',
              ),
              explainWrong: t(
                'Di papan tanpa penjaga, siapa saja boleh menempel. Justru itu masalahnya.',
                'XSS justru terjadi saat kiriman orang asing diterima tanpa disaring, bukan saat hanya admin yang menulis.',
              ),
            },
            {
              id: 'bell',
              label: t(
                'Karena papan itu dikunci dan sulit dibuka',
                'Halaman terkunci, jadi tulisan baru tidak bisa masuk',
              ),
              explainWrong: t(
                'Papan yang dikunci justru aman. Masalahnya papan yang terbuka untuk semua kertas.',
                'Halaman yang terkunci tidak bisa diserang lewat kiriman baru. XSS terjadi saat kiriman diterima tanpa disaring.',
              ),
            },
          ],
          answer: 'trust',
          explainCorrect: t(
            'Papan tanpa penjaga menampilkan kertas siapa saja. Halaman web juga begitu kalau tulisan tamu tidak disaring.',
            'Browser tidak bisa membedakan skrip asli situs dari skrip selipan yang tidak disaring.',
          ),
          hints: [t('Ingat siapa yang boleh menempel di papan itu.', 'Pikirkan apa yang terjadi pada kiriman yang tidak disaring.')],
          tags: ['xss', 'sanitasi'],
        }),
      ),
      conceptStep({
        title: t('Tampilkan Sebagai Tulisan Biasa', 'textContent dan Escaping Otomatis'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'textcontent-vs-innerhtml' },
        alt: t(
          'Tulisan tamu ditampilkan apa adanya, bukan dijalankan.',
          'innerHTML menjalankan tag HTML; textContent menampilkannya sebagai teks.',
        ),
        code: {
          lang: 'js',
          code: '// BERBAHAYA:\nkotak.innerHTML = komentar;\n// AMAN:\nkotak.textContent = komentar;',
          highlight: [4],
        },
        body: [
          rJunior('Tampilkan komentar tamu sebagai tulisan biasa, bukan perintah. Pembuat situs memakai '),
          rCode('textContent', ['junior']),
          rJunior(' agar komentar tampil sebagai tulisan biasa.'),
          rPro('Tampilkan komentar sebagai teks biasa, bukan kode HTML. Caranya: pakai '),
          rCode('textContent', ['pro']),
          rPro(' dan hindari '),
          rCode('innerHTML', ['pro']),
          rPro('. React dan Vue sudah melakukan escaping otomatis, jadi hindari dangerouslySetInnerHTML dan v-html.'),
        ],
      }),
      qStep({
        id: 'a12-l02-q2j',
        type: 'scenario',
        modes: ['junior'],
        story: t('Siapa saja boleh menempel di papan kelas. Pak Udin menjaganya.', 'Papan pengumuman kelas boleh ditempeli siapa saja, dan Pak Udin yang menjaganya.'),
        prompt: t('Apa tugas Pak Udin?'),
        difficulty: 1,
        choices: [
          { id: 'cek', label: t('Memeriksa setiap kertas dulu') },
          { id: 'tempel', label: t('Merapikan kertas agar tetap lurus') },
          { id: 'copot', label: t('Menaruh kertas berwarna di depan') },
        ],
        answer: 'cek',
        explainCorrect: t('Kertas diperiksa agar tidak ada tulisan jahat. Komentar web juga begitu.', 'Kertas diperiksa supaya tidak ada tulisan jahat, begitu juga komentar di halaman web.'),
        explainIncorrect: {
          tempel: t('Kertas yang rapi belum tentu aman. Isinya perlu diperiksa dulu.'),
          copot: t('Warna kertas tidak penting. Yang perlu dijaga adalah isinya.'),
        },
        hints: [t('Ingat papan pengumuman yang tidak disaring.'), undefined],
        tags: ['xss'],
      }),
      qStep({
        id: 'a12-l02-q2',
        type: 'spotbug',
        modes: ['pro'],
        prompt: t('Ketuk baris yang membuka celah XSS saat menampilkan komentar ke halaman:'),
        difficulty: 2,
        lines: [
          'function tampilkanKomentar(teks) {',
          '  const kotak = document.querySelector("#komentar");',
          '  kotak.innerHTML = teks;',
          '  return kotak;',
          '}',
        ],
        answer: [3],
        explainCorrect: t('Baris 3 memakai innerHTML untuk teks dari pengunjung. Ganti dengan kotak.textContent = teks;.'),
        hints: [t('Cari baris yang memasukkan teks sebagai HTML.'), undefined],
        tags: ['xss', 'dom'],
      }),
      conceptStep({
        title: t('DOMPurify, eval, dan CSP'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'dompurify-csp' },
        alt: t('Pustaka DOMPurify dan header CSP membatasi skrip yang boleh berjalan.'),
        modes: ['pro'],
        body: [
          rText(
            'Kalau terpaksa menampilkan HTML dari editor teks, bersihkan dulu dengan DOMPurify (pustaka pembersih HTML). Hindari eval() dan onclick yang berisi input pengunjung. Pasang Content Security Policy (CSP), aturan di server yang membatasi sumber skrip.',
          ),
        ],
      }),
      qStep({
        id: 'a12-l02-q3',
        type: 'match',
        modes: ['pro'],
        prompt: t('Pasangkan jenis atau alat keamanan XSS dengan penjelasannya:'),
        difficulty: 2,
        left: [
          { id: 'st', label: t('Stored XSS') },
          { id: 'rf', label: t('Reflected XSS') },
          { id: 'dp', label: t('DOMPurify') },
          { id: 'csp', label: t('Content Security Policy (CSP)') },
        ],
        right: [
          { id: 'r1', label: t('Kode jahat ada di tautan, lalu dipantulkan server') },
          { id: 'r2', label: t('Aturan server tentang sumber skrip yang boleh jalan') },
          { id: 'r3', label: t('Kode jahat tersimpan di database, misalnya di komentar') },
          { id: 'r4', label: t('Pustaka pembersih HTML, dipakai kalau HTML memang harus tampil') },
        ],
        answer: { st: 'r3', rf: 'r1', dp: 'r4', csp: 'r2' },
        explainCorrect: t('Stored XSS tinggal di database, Reflected XSS datang lewat tautan. DOMPurify dan CSP adalah lapis pertahanannya.'),
        hints: [t('Pasangkan dulu dua jenis XSS, lalu dua alat pertahanan.'), undefined],
        tags: ['xss', 'sanitasi'],
      }),
      limitStep({
        analogy: t('Papan pengumuman sekolah tanpa disaring'),
        same: [
          t(
            'Orang percaya karena tulisan ada di papan resmi.',
            'Pengunjung memercayai isi yang tampil karena berada di tempat resmi pemilik situs.',
          ),
        ],
        different: [
          t(
            'Kertas hanya dibaca. Tulisan jahat di web bisa bekerja.',
            'Kertas di papan hanya dibaca. Pada XSS, selipan berupa skrip aktif yang bisa mencuri data sesi.',
          ),
          t(
            'Browser tidak bisa membedakan skrip asli developer dari skrip selipan penyerang.',
            'Browser tidak bisa membedakan skrip asli developer dari skrip selipan penyerang.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'benteng-xss',
        t(
          'Ubah tombol ke mode aman. Lihat tulisan berbahaya tampil biasa.',
          'Ubah tombol dari innerHTML ke textContent, lalu bandingkan hasilnya di Benteng Uji XSS.',
        ),
      ),
      qStep({
        id: 'a12-l02-q3j',
        type: 'sort',
        modes: ['junior'],
        prompt: t('Kelompokkan cara ini: aman atau berbahaya.'),
        difficulty: 2,
        items: [
          { id: 's1', label: t('Kertas diperiksa dulu, lalu ditempel') },
          { id: 's2', label: t('Kertas ditempel tanpa ada yang memeriksa') },
          { id: 's3', label: t('Tulisan tamu tampil apa adanya untuk dibaca') },
          { id: 's4', label: t('Tulisan tamu ikut menyuruh halaman bekerja') },
        ],
        bins: [
          { id: 'ok', label: t('Aman'), icon: 'file-text' },
          { id: 'bad', label: t('Berbahaya'), icon: 'bug' },
        ],
        answer: { s1: 'ok', s2: 'bad', s3: 'ok', s4: 'bad' },
        explainCorrect: t('Periksa kertas sebelum ditempel. Tampilkan komentar sebagai tulisan biasa.'),
        hints: [t('Ingat Pak Udin yang memeriksa setiap kertas.'), undefined],
        tags: ['xss', 'sanitasi'],
      }),
      qStep(
        makeMcq({
          id: 'a12-l02-q4',
          type: 'limit',
          analogy: t('Papan pengumuman sekolah'),
          prompt: t(
            'Apa yang hanya terjadi pada tulisan jahat di halaman web?',
            'Apa yang hanya terjadi pada XSS di browser, bukan pada kertas di papan tempel?',
          ),
          choices: [
            {
              id: 'exec',
              label: t('Tulisan itu bisa bekerja seperti perintah', 'Browser menjalankan skrip selipan yang mencuri sesi'),
            },
            {
              id: 'read',
              label: t('Banyak orang di sekolah membaca tulisan itu', 'Banyak pengunjung membaca pesan yang ditempel di situs'),
              explainWrong: t(
                'Itu juga terjadi di papan sekolah. Kita mencari hal yang berbeda.',
                'Keduanya sama-sama bisa dibaca pengunjung, jadi itu bukan perbedaannya.',
              ),
            },
            {
              id: 'open',
              label: t('Siapa saja boleh menempel tulisan itu', 'Siapa saja boleh mengirim pesan ke halaman itu'),
              explainWrong: t(
                'Papan sekolah juga bisa ditempeli siapa saja. Itu bukan bedanya.',
                'Papan tempel juga bisa diisi siapa saja. Perbedaannya ada pada apa yang terjadi setelah pesan dibaca.',
              ),
            },
          ],
          answer: 'exec',
          explainCorrect: t(
            'Kertas di papan hanya dibaca mata. Tulisan jahat di web bisa langsung bekerja.',
            'Skrip aktif di browser bisa membaca tampilan dan mengirim data diam-diam. Kertas biasa tidak punya kemampuan itu.',
          ),
          hints: [t('Ingat: kertas di papan hanya dibaca.', 'Cari hal yang tidak mungkin dilakukan kertas.')],
          tags: ['xss', 'browser'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a12-l02-q5',
          type: 'scenario',
          modes: ['pro'],
          story: t('Raka memakai React untuk menampilkan ulasan pembeli dari database. Ia ragu antara menulis <p>{ulasan}</p> atau memakai dangerouslySetInnerHTML.'),
          prompt: t('Pilihan mana yang aman untuk teks ulasan biasa?'),
          difficulty: 2,
          choices: [
            { id: 'safe', label: t('Menulis <p>{ulasan}</p>, karena React meng-escape teks') },
            {
              id: 'dang',
              label: t('Memakai dangerouslySetInnerHTML agar halaman tampil lebih cepat'),
              explainWrong: t('Namanya mengingatkan: ia mematikan perlindungan escaping otomatis React.'),
            },
            {
              id: 'eval',
              label: t('Menjalankan eval(ulasan) sebelum menampilkannya'),
              explainWrong: t('eval() menjalankan string sebagai kode JavaScript, jadi berbahaya untuk teks pengunjung.'),
            },
          ],
          answer: 'safe',
          explainCorrect: t('React meng-escape teks di dalam kurung kurawal secara otomatis. Vue melakukan hal yang sama pada {{ ulasan }}.'),
          hints: [t('Cari cara yang membiarkan React melindungi teksnya.')],
          tags: ['xss', 'sanitasi'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a12-l02-q6j',
          modes: ['junior'],
          prompt: t('Kertas dari tamu pasti aman kalau tulisannya rapi.'),
          answer: false,
          explainCorrect: t('Pernyataan itu keliru. Tulisan rapi pun bisa berisi perintah jahat.'),
          explainWrong: t('Rapi tidak berarti aman. Perintah jahat bisa ditulis dengan rapi.'),
          hints: [t('Ingat Pak Udin memeriksa setiap kertas.')],
          tags: ['xss'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a12-l02-q6',
          modes: ['pro'],
          prompt: t('Memasukkan ketikan pengunjung ke atribut onclick="..." atau href="javascript:..." aman selama tidak memakai <script>.'),
          answer: false,
          explainCorrect: t('Pernyataan itu keliru: onclick dan href="javascript:..." tetap bisa menjalankan JavaScript berbahaya.'),
          explainWrong: t('Kode JavaScript juga bisa berjalan lewat event handler seperti onclick atau tautan javascript:.'),
          hints: [t('Pikirkan cara lain menjalankan JavaScript selain tag script.')],
          tags: ['xss'],
        }),
      ),
      qStep({
        id: 'a12-l02-q7',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi kode agar nama dari location.hash tampil aman:'),
        template: 'const nama = decodeURIComponent(location.hash.slice(1));\njudul.___ = nama;',
        bank: ['textContent', 'innerHTML', 'eval', 'v-html'],
        answer: ['textContent'],
        explainCorrect: t('Isi tautan berasal dari luar halaman. textContent menampilkannya sebagai tulisan biasa tanpa menafsirkan tag HTML.'),
        hints: [t('Pilih properti yang menampilkan isi sebagai teks.'), undefined],
        tags: ['xss', 'dom'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a12-l02-r1',
        prompt: t(
          'Cara mana yang aman menampilkan tulisan komentar tamu?',
          'Properti DOM mana yang aman untuk menampilkan komentar sebagai teks biasa?',
        ),
        choices: [
          { id: 'tc', label: t('Menampilkannya sebagai tulisan biasa', 'elemen.textContent') },
          {
            id: 'ih',
            label: t('Menampilkannya sebagai perintah yang bekerja', 'elemen.innerHTML'),
            explainWrong: t(
              'Tulisan yang dianggap perintah bisa ikut bekerja. Itu berbahaya.',
              'innerHTML membaca teks sebagai HTML, jadi membuka celah XSS.',
            ),
          },
          {
            id: 'ev',
            label: t('Membiarkan isinya bekerja dulu', 'elemen.outerHTML'),
            explainWrong: t(
              'Tulisan yang dibiarkan bekerja bisa membahayakan halaman. Tampilkan saja apa adanya.',
              'outerHTML juga membaca teks sebagai HTML, jadi sama berbahayanya.',
            ),
          },
        ],
        answer: 'tc',
        explainCorrect: t(
          'Tulisan biasa hanya dibaca, tidak ikut bekerja. Itu cara paling aman.',
          'textContent tidak pernah menjalankan tag atau skrip di dalam teks.',
        ),
        hints: [t('Ingat Pak Udin: kertas tampil sebagai tulisan biasa.', 'Cari properti yang menampilkan isi sebagai teks.')],
        tags: ['xss', 'dom'],
      }),
      makeTf({
        id: 'a12-l02-r2',
        prompt: t(
          'Tulisan tamu yang tampil sebagai tulisan biasa tidak ikut bekerja.',
          'v-html di Vue dan dangerouslySetInnerHTML di React harus dihindari, kecuali isinya sudah dibersihkan DOMPurify.',
        ),
        answer: true,
        explainCorrect: t(
          'Tulisan biasa hanya dibaca. Seperti kertas di papan yang tidak bisa menyuruh siapa pun.',
          'Dua fitur itu melewati escaping otomatis framework, jadi isinya harus dibersihkan dulu.',
        ),
        explainWrong: t(
          'Tulisan biasa tidak ikut bekerja. Yang berbahaya adalah tulisan yang dianggap perintah.',
          'Tanpa DOMPurify atau pembersih lain, v-html dan dangerouslySetInnerHTML membuka celah XSS.',
        ),
        hints: [t('Ingat kertas di papan: hanya dibaca.', 'Pikirkan apa yang dilewati kedua fitur itu.')],
        tags: ['xss', 'sanitasi'],
      }),
    ],
    recap: t(
      'Tampilkan tulisan tamu sebagai tulisan biasa agar tidak ikut bekerja.',
      'Cegah XSS dengan textContent, escaping otomatis, DOMPurify, dan CSP. Hindari eval dan onclick berisi input.',
    ),
    companion: {
      talkPrompts: ['Mengapa tulisan orang lain disaring sebelum ditempel di papan sekolah?'],
      offlineActivity:
        'Buat empat kartu bersama pendamping. Dua kartu berisi pengumuman. Dua kartu bergambar petir. Pisahkan kartu yang siap ditempel dan yang perlu diperiksa.',
    },
  }),

  makeLesson({
    id: 'a12-l03',
    worldId: 'a12',
    title: 'CSRF dan clickjacking',
    modes: ['pro'],
    objective: t(
      'Aku bisa membedakan CSRF dan clickjacking.',
      'Kamu bisa membedakan CSRF dan clickjacking, lalu memilih pertahanan yang tepat untuk masing-masing.',
    ),
    atWork: 'Kamu akan menambahkan token CSRF dan atribut SameSite saat membuat form yang mengubah data di toko.',
    estMinutes: 6,
    introducesTerms: ['csrf'],
    usesTerms: ['sanitasi', 'xss', 'request', 'https', 'server'],
    warmupFrom: 'a12-l02',
    steps: [
      storyStep('a12/gelang-akses.svg', [
        rText(
          'Gelang masuk gedung menunjukkan identitas tamu. Gelang itu tidak membuktikan tamu setuju dengan setiap pesanan. Saat mengubah email, situs juga perlu memeriksa permintaan pemilik akun.',
        ),
      ]),
      conceptStep({
        title: t('CSRF: Permintaan Palsu Lintas Situs'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'a12', topic: 'serangan-csrf' },
        alt: t('Situs jebakan diam-diam membuat browser mengirim permintaan ke situs lain tempat korban sedang login.'),
        body: [
          rTerm('csrf', 'CSRF'),
          rText(' adalah serangan yang membuat browser korban mengirim permintaan diam-diam ke situs tempat korban sedang login. Pencegahannya: pasang '),
          rBold('CSRF token'),
          rText(' acak di setiap form. Server memeriksa nilainya saat menerima perubahan. Beri atribut '),
          rCode('SameSite'),
          rText(' pada cookie, dan pakai POST, PUT, atau DELETE untuk aksi yang mengubah data, bukan GET.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a12-l03-q1',
          type: 'analogy',
          prompt: t('Mengapa situs jebakan bisa mengirim perintah "ubah email" ke situs lain tempat korban login?'),
          choices: [
            { id: 'auto', label: t('Browser otomatis menyertakan sesi login saat mengirim permintaan') },
            {
              id: 'pass',
              label: t('Penyerang sudah mengetahui kata sandi korban lewat situs jebakan itu'),
              explainWrong: t('Penyerang tidak perlu tahu kata sandi. Mereka menumpang cookie sesi yang ikut terkirim otomatis.'),
            },
            {
              id: 'css',
              label: t('Situs jebakan berhasil meretas server situs tujuan'),
              explainWrong: t('Situs jebakan tidak perlu meretas apa pun. Cukup memakai cookie sesi yang browser kirim otomatis.'),
            },
          ],
          answer: 'auto',
          explainCorrect: t('Browser otomatis ikut mengirim cookie sesi ke situs tujuan. Tanpa SameSite dan token CSRF, situs tujuan mengira permintaan itu datang dari form resmi.'),
          hints: [t('Ingat gelang akses: ikut terpakai tanpa kamu sadari.')],
          tags: ['csrf'],
        }),
      ),
      conceptStep({
        title: t('Clickjacking: Tombol Palsu di Atas Iframe'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'clickjacking-iframe' },
        alt: t('Situs asli ditanam transparan dalam iframe di bawah tombol palsu "Putar video".'),
        code: {
          lang: 'http',
          code: "Content-Security-Policy: frame-ancestors 'self'\nX-Frame-Options: DENY",
        },
        body: [
          rBold('Clickjacking'),
          rText(' adalah serangan yang menanam situsmu secara tak terlihat di bawah tombol palsu, jadi korban salah mengklik. Penyerang memakai '),
          rCode('<iframe>'),
          rText(' transparan untuk itu. Cegah dari '),
          rTerm('server', 'server'),
          rText(' dengan header '),
          rCode("frame-ancestors 'self'"),
          rText(' atau '),
          rCode('X-Frame-Options: DENY'),
          rText('.'),
        ],
      }),
      conceptStep({
        title: t('Tab Baru, Open Redirect, dan CORS'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'noopener-redirect-cors' },
        alt: t('rel="noopener noreferrer", batas tujuan redirect, dan aturan CORS di backend.'),
        body: [
          rText('Pasang '),
          rCode('rel="noopener noreferrer"'),
          rText(' pada tautan '),
          rCode('target="_blank"'),
          rText(' agar tab baru tidak mengendalikan tab asal. Pada parameter seperti '),
          rCode('?next='),
          rText(', hanya izinkan tujuan di situs sendiri untuk mencegah open redirect. '),
          rBold('CORS'),
          rText(' adalah aturan di backend tentang situs yang boleh meminta data. Jangan izinkan semua asal (*) untuk layanan berlogin.'),
        ],
      }),
      qStep({
        id: 'a12-l03-q3',
        type: 'spotbug',
        prompt: t('Ketuk baris tautan yang perlu rel="noopener" untuk browser lama.'),
        difficulty: 2,
        lines: [
          '<nav>',
          '  <a href="https://situs-lain.example" target="_blank">Partner</a>',
          '  <a href="/bantuan">Bantuan</a>',
          '</nav>',
        ],
        answer: [2],
        explainCorrect: t('Browser modern sudah memberi perlindungan noopener pada tautan target="_blank". Tulis rel="noopener" pada baris 2 agar browser lama yang mendukung atribut ini juga memakainya.'),
        hints: [t('Cari tautan yang membuka tab baru.'), undefined],
        tags: ['csrf'],
      }),
      limitStep({
        analogy: t('Gelang akses gedung dan amplop titipan (CSRF)'),
        same: [
          t('Pengirim asli tidak berniat memerintah aksi itu, tetapi tanda aksesnya tetap terpakai.'),
        ],
        different: [
          t('Resepsionis bisa bertanya apakah itu keinginanmu. Server tidak melihat wajahmu. Ia menerima cookie yang dikirim browser.'),
          t('Pada clickjacking, korban sendiri yang mengklik tombol situs asli, tetapi matanya tertipu tombol palsu di atas iframe.'),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'benteng-xss',
        t('Amati cara halaman menampilkan tulisan sebagai teks biasa. Bandingkan perlindungan itu dengan pemeriksaan token saat menyimpan perubahan.'),
      ),
      qStep({
        id: 'a12-l03-q2',
        type: 'match',
        prompt: t('Pasangkan ancaman web dengan langkah pencegahannya:'),
        difficulty: 2,
        left: [
          { id: 'csrf', label: t('CSRF (permintaan palsu)') },
          { id: 'cj', label: t('Clickjacking (iframe tersembunyi)') },
          { id: 'tab', label: t('Tautan target="_blank"') },
          { id: 'red', label: t('Open redirect (?next=...)') },
        ],
        right: [
          { id: 'r1', label: t("Header frame-ancestors 'self' atau X-Frame-Options: DENY") },
          { id: 'r2', label: t('Tambahkan rel="noopener noreferrer"') },
          { id: 'r3', label: t('Hanya izinkan URL tujuan di dalam situs sendiri') },
          { id: 'r4', label: t('CSRF token acak, SameSite, dan method POST') },
        ],
        answer: { csrf: 'r4', cj: 'r1', tab: 'r2', red: 'r3' },
        explainCorrect: t('Setiap serangan punya celah sendiri, jadi pertahanannya juga berbeda.'),
        hints: [t('Cari pasangan yang paling jelas dulu, misalnya iframe dan header.'), undefined],
        tags: ['csrf'],
      }),
      qStep(
        makeMcq({
          id: 'a12-l03-q4',
          type: 'limit',
          analogy: t('Gelang akses gedung yang menipu resepsionis'),
          prompt: t('Mengapa mengubah data lewat POST, bukan GET, membantu menahan CSRF sederhana?'),
          choices: [
            { id: 'get', label: t('Tag img dan tautan biasa hanya mengirim GET') },
            {
              id: 'stop',
              label: t('Metode POST tidak ikut membawa sesi login ke server'),
              explainWrong: t('POST saja tidak membuktikan persetujuan pemilik akun. Periksa token CSRF dan atur SameSite sesuai kebutuhan.'),
            },
            {
              id: 'https',
              label: t('Metode GET dilarang oleh browser untuk form biasa'),
              explainWrong: t('Browser tidak melarang GET untuk form. Masalahnya, GET tidak boleh mengubah data di server.'),
            },
          ],
          answer: 'get',
          explainCorrect: t('Tag img dan tautan biasa hanya bisa mengirim GET. Karena itu aksi penting memakai POST, PUT, atau DELETE plus token CSRF dan SameSite.'),
          hints: [t('Pikirkan apa yang bisa dikirim oleh tag img atau tautan biasa.')],
          tags: ['csrf', 'request'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a12-l03-q5',
          type: 'scenario',
          story: t('Di halaman toko-rani.example/login?next=situs-lain.example, pengunjung langsung dilempar ke situs tiruan setelah login.'),
          prompt: t('Apa yang perlu dilakukan untuk menutup celah pada tautan itu?'),
          difficulty: 2,
          choices: [
            { id: 'or', label: t('Batasi parameter ?next= hanya ke toko-rani.example') },
            {
              id: 'cj',
              label: t('Tambahkan X-Frame-Options ke halaman login dan daftar'),
              explainWrong: t('X-Frame-Options mencegah clickjacking, bukan pengalihan lewat parameter alamat.'),
            },
            {
              id: 'cors',
              label: t('Izinkan semua situs meminta data dari layanan'),
              explainWrong: t('Membuka akses ke semua situs menambah bahaya, tetapi tidak menutup pengalihan.'),
            },
          ],
          answer: 'or',
          explainCorrect: t('Ini open redirect: parameter ?next= dikirim begitu saja ke tujuan. Batasi tujuannya ke halaman di situs sendiri.'),
          hints: [t('Lihat bagian alamat yang berisi ?next=.')],
          tags: ['csrf', 'sanitasi'],
        }),
      ),
      qStep({
        id: 'a12-l03-q6',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi atribut pengaman tautan tab baru dan header pencegah clickjacking:'),
        template: '<a href="https://situs-lain.example" target="_blank" rel="___">Baca</a>\nX-Frame-Options: ___',
        bank: ['noopener noreferrer', 'DENY', 'SameSite', 'POST'],
        answer: ['noopener noreferrer', 'DENY'],
        explainCorrect: t('rel="noopener noreferrer" mengamankan tab baru, dan X-Frame-Options: DENY mencegah halaman ditanam di iframe.'),
        hints: [t('Jawabannya ada di kartu tentang tab baru dan clickjacking.'), undefined],
        tags: ['csrf'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a12-l03-r1',
        prompt: t('Atribut cookie mana yang mencegah cookie ikut terkirim otomatis dari situs lain?'),
        choices: [
          { id: 'ss', label: t('SameSite') },
          {
            id: 'alt',
            label: t('HttpOnly'),
            explainWrong: t('HttpOnly menutup akses JavaScript ke cookie, bukan pengiriman lintas situs.'),
          },
        ],
        answer: 'ss',
        explainCorrect: t('SameSite membatasi pengiriman cookie dari situs pihak ketiga.'),
        hints: [t('Namanya berkaitan dengan "situs yang sama".')],
        tags: ['csrf'],
      }),
      makeTf({
        id: 'a12-l03-r2',
        prompt: t('Untuk layanan yang memakai login, CORS wildcard (*) aman dipasang untuk semua situs.'),
        answer: false,
        explainCorrect: t('Pernyataan itu keliru: layanan berlogin harus menyebut asal yang diizinkan secara spesifik.'),
        explainWrong: t('Wildcard (*) membuka akses ke semua situs, jadi jangan dipakai pada layanan yang memakai login atau data sensitif.'),
        hints: [t('Pikirkan apa arti tanda bintang pada daftar asal.')],
        tags: ['csrf'],
      }),
    ],
    recap: t(
      'Aku tahu CSRF dan clickjacking.',
      'Tahan CSRF dengan token dan SameSite. Cegah clickjacking dengan frame-ancestors, dan batasi redirect serta CORS.',
    ),
  }),

  makeLesson({
    id: 'a12-l04',
    worldId: 'a12',
    title: 'Rahasia tidak boleh di frontend',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menyebutkan benda rahasia yang tidak boleh ada di halaman.',
      'Kamu bisa memilih tempat menyimpan token login yang aman dan menjaga file .env.',
    ),
    atWork: 'Kamu akan memeriksa bahwa file .env tidak ikut terunggah ke Git sebelum membagikan proyek ke tim.',
    estMinutes: 7,
    introducesTerms: ['rahasia-frontend'],
    usesTerms: ['frontend', 'backend', 'sanitasi', 'xss', 'csrf', 'https', 'git'],
    warmupFrom: 'a12-l03',
    steps: [
      storyStep('a12/rahasia-ruang-tamu.svg', [
        rText(
          'Kunci brankas tidak boleh ditaruh di bawah keset ruang tamu. Halaman web itu seperti ruang tamu yang terbuka. Rahasia disimpan di mana, ya?',
          'Kamu menemukan kunci pembayaran di file JavaScript sebuah toko online. Siapa saja bisa membacanya lewat DevTools, jadi rahasia harus tinggal di backend.',
        ),
      ]),
      conceptStep({
        title: t('Apa yang Tidak Boleh di Halaman?', 'Kunci Rahasia, .env, dan Tombol Tersembunyi'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'rahasia-env-devtools' },
        alt: t(
          'Kata sandi dan kunci rahasia tidak boleh ada di halaman yang terbuka.',
          'Kunci API rahasia, password database, NEXT_PUBLIC_ atau VITE_, dan .gitignore untuk .env.',
        ),
        body: [
          rTerm('rahasia-frontend', 'Rahasia', 'Kunci rahasia'),
          rJunior(' adalah benda yang tidak boleh dilihat tamu. Contohnya kata sandi dan kode rahasia untuk membayar. Simpan rahasia di ruang dalam.'),
          rPro(' adalah data yang tidak boleh ada di kode browser, seperti kata sandi database dan kunci pembayaran. Variabel berawalan VITE_ atau NEXT_PUBLIC_ di file '),
          rCode('.env', ['pro']),
          rPro(' ikut dikirim ke browser, jadi jangan dipakai untuk rahasia. Masukkan '),
          rCode('.env', ['pro']),
          rPro(' ke '),
          rCode('.gitignore', ['pro']),
          rPro(' agar tidak terunggah ke GitHub.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a12-l04-q1',
          prompt: t(
            'Tombol "Hapus Semua Akun" hanya disembunyikan. Apakah itu sudah aman?',
            'Tombol "Hapus Semua Akun" hanya disembunyikan dengan display: none di frontend. Apakah sistem sudah aman?',
          ),
          choices: [
            {
              id: 'no',
              label: t('Belum aman, tombol itu masih ada di halaman', 'Belum aman, tombol bisa dimunculkan lewat DevTools'),
            },
            {
              id: 'yes',
              label: t('Sudah aman, karena tombolnya tidak terlihat', 'Sudah aman, karena pengunjung tidak melihat tombolnya'),
              explainWrong: t(
                'Tidak terlihat tidak berarti tidak ada. Tombol itu tetap ada di halaman.',
                'Menyembunyikan tampilan di browser bukan pengaman hak akses.',
              ),
            },
            {
              id: 'css',
              label: t('Aman kalau warnanya sama dengan latar', 'Aman kalau warna tombol sama dengan latar putih'),
              explainWrong: t(
                'Warna tidak menghapus tombolnya. Orang tetap bisa menemukannya di halaman.',
                'Pengunjung tetap bisa membuka kodenya di DevTools.',
              ),
            },
          ],
          answer: 'no',
          explainCorrect: t(
            'Tombol itu masih ada di dalam halaman. Seperti kunci di bawah keset, tersembunyi tetapi bisa ditemukan.',
            'Hak akses harus diperiksa ulang di backend sebelum data dihapus. Menyembunyikan tombol hanya mengubah tampilan.',
          ),
          hints: [t('Ingat kunci di bawah keset: tersembunyi, tetapi ada.', 'Pikirkan siapa yang bisa memanggil backend tanpa lewat tombol.')],
          tags: ['rahasia-frontend', 'backend'],
        }),
      ),
      conceptStep({
        title: t('localStorage vs Cookie HttpOnly'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'simpan-token-login' },
        alt: t('localStorage bisa dibaca skrip saat ada XSS; cookie HttpOnly lebih aman.'),
        modes: ['pro'],
        body: [
          rText('Token yang disimpan di '),
          rCode('localStorage'),
          rText(' bisa dicuri skrip kalau ada celah '),
          rTerm('xss', 'XSS', 'XSS'),
          rText('. Pilihan paling aman adalah cookie bertanda '),
          rCode('HttpOnly'),
          rText(', '),
          rCode('Secure'),
          rText(', dan '),
          rCode('SameSite'),
          rText(' yang diatur oleh backend.'),
        ],
      }),
      qStep({
        id: 'a12-l04-q3',
        type: 'match',
        modes: ['pro'],
        prompt: t('Pasangkan tempat menyimpan data login di browser dengan sifatnya:'),
        difficulty: 2,
        left: [
          { id: 'ls', label: t('localStorage dan sessionStorage') },
          { id: 'ck', label: t('Cookie biasa') },
          { id: 'ho', label: t('Cookie HttpOnly + Secure + SameSite') },
        ],
        right: [
          { id: 'r1', label: t('Tidak terbaca JavaScript, hanya lewat HTTPS, paling dianjurkan') },
          { id: 'r2', label: t('Mudah dipakai, tetapi terbaca JavaScript kalau ada celah XSS') },
          { id: 'r3', label: t('Terkirim otomatis, tetapi masih bisa dibaca JavaScript') },
        ],
        answer: { ls: 'r2', ck: 'r3', ho: 'r1' },
        explainCorrect: t('HttpOnly melindungi token sesi dari pencurian lewat XSS. Secure dan SameSite menjaga pengirimannya.'),
        hints: [t('Cari sifat "tidak terbaca JavaScript" dulu.'), undefined],
        tags: ['rahasia-frontend', 'xss', 'csrf'],
      }),
      conceptStep({
        title: t('Daftar Periksa Keamanan', 'SRI, npm audit, URL, dan Anti-Phishing'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'checklist-keamanan-fe' },
        alt: t(
          'Jangan taruh kata sandi di alamat situs, dan waspada situs tiruan.',
          'SRI integrity untuk CDN, npm audit, jangan taruh token di URL, dan waspada phishing.',
        ),
        body: [
          rText(
            'Jangan taruh kata sandi di alamat situs. Situs tiruan bisa terlihat sangat mirip. Panggil orang dewasa sebelum mengisi kata sandi.',
            'Jangan taruh token atau kata sandi di URL, karena tercatat di log dan riwayat. Pasang atribut integrity (SRI) pada skrip CDN agar file yang diubah ditolak browser. Jalankan npm audit untuk memeriksa celah di paket proyek. Aktifkan verifikasi 2 langkah dan waspadai phishing, yaitu situs tiruan pencuri login.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a12-l04-q5',
          type: 'scenario',
          story: t(
            'Sari menerima pesan berisi tautan. Halamannya meminta kata sandi dan mirip situs sekolahnya. Tetapi alamat situsnya sedikit berbeda.',
            'Sari menerima tautan halaman login yang mirip situs sekolahnya, tetapi alamatnya berbeda sedikit: situs-lain.example.',
          ),
          prompt: t('Apa langkah yang aman bagi Sari?', 'Apa langkah aman yang tepat untuk Sari?'),
          difficulty: 2,
          choices: [
            {
              id: 'phish',
              label: t(
                'Tidak mengisi, lalu tunjukkan ke orang tua',
                'Jangan masukkan kata sandi, buka situs resmi lewat alamat aslinya',
              ),
            },
            {
              id: 'css',
              label: t(
                'Mengisi kata sandi karena tampilannya mirip',
                'Anggap halaman itu hanya bug tampilan, lalu masukkan kata sandi',
              ),
              explainWrong: t(
                'Tampilan yang mirip bisa ditiru dengan mudah. Alamat situslah yang perlu diperiksa.',
                'Itu bukan bug tampilan. Halaman itu tiruan untuk mencuri login.',
              ),
            },
            {
              id: 'url',
              label: t(
                'Mengisi kata sandi lalu menggantinya besok pagi',
                'Masukkan kata sandi, lalu ganti besok pagi kalau ada masalah',
              ),
              explainWrong: t(
                'Kata sandi yang sudah terkirim ke situs palsu bisa dicuri. Mengganti besok sudah terlambat.',
                'Kata sandi yang sudah terkirim ke situs tiruan bisa langsung disalahgunakan. Mengganti besok bisa terlambat.',
              ),
            },
          ],
          answer: 'phish',
          explainCorrect: t(
            'Situs tiruan sengaja dibuat mirip aslinya. Orang dewasa bisa membantu memeriksa alamatnya.',
            'Halaman itu phishing, yaitu situs tiruan pencuri login. Periksa alamat resmi di bilah alamat dan aktifkan verifikasi 2 langkah.',
          ),
          hints: [t('Bandingkan alamat situs di pesan dengan alamat resmi sekolah.')],
          tags: ['rahasia-frontend', 'sanitasi'],
        }),
      ),
      limitStep({
        analogy: t('Kunci rumah di ruang tamu terbuka'),
        same: [t('Barang di ruang tamu bisa dilihat semua tamu, begitu juga kode frontend.')],
        different: [t('Di rumah, kamu bisa mengunci laci. Kode yang dikirim ke browser dapat dibaca pengunjung.')],
        riskyAnalogy: false,
      }),
      simStep(
        'benteng-xss',
        t(
          'Coba lagi Benteng Uji. Lihat apa yang terbaca kalau halaman tidak aman.',
          'Di Benteng Uji, lihat bagaimana celah XSS membuat skrip bisa membaca token di localStorage.',
        ),
      ),
      qStep({
        id: 'a12-l04-q2',
        type: 'sort',
        prompt: t(
          'Kelompokkan benda ini: boleh terlihat atau harus rahasia.',
          'Kelompokkan benda ini ke Boleh di Frontend atau Harus di Backend:',
        ),
        difficulty: 2,
        items: [
          { id: 's1', label: t('Kata sandi lemari data toko', 'Kata sandi database utama') },
          { id: 'f1', label: t('Warna dan nama toko', 'Warna merek dan nama toko') },
          { id: 's2', label: t('Kunci rahasia pembayaran', 'API key rahasia pembayaran') },
          { id: 'f2', label: t('Teks tombol dan gambar produk', 'Teks tombol dan gambar produk umum') },
        ],
        bins: [
          { id: 'fe', label: t('Boleh terlihat', 'Boleh di Frontend'), icon: 'monitor' },
          { id: 'be', label: t('Harus rahasia', 'Harus di Backend'), icon: 'lock' },
        ],
        answer: { s1: 'be', f1: 'fe', s2: 'be', f2: 'fe' },
        explainCorrect: t(
          'Rahasia membuka akses, jadi disimpan di ruang dalam. Warna dan teks boleh dilihat tamu.',
          'Kunci pembayaran dan akses database hanya boleh ada di backend. Warna dan teks memang untuk dilihat pengunjung.',
        ),
        hints: [t('Tanya: bolehkah tamu melihat benda ini?', 'Tanya: apa yang terjadi kalau semua orang membaca nilai ini?'), undefined],
        tags: ['rahasia-frontend'],
      }),
      qStep(
        makeMcq({
          id: 'a12-l04-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Menaruh rahasia di ruang tamu'),
          prompt: t('Pernyataan mana yang benar tentang file .env?'),
          choices: [
            { id: 'srv', label: t('File .env aman di backend asal tanpa awalan VITE_ atau NEXT_PUBLIC_') },
            {
              id: 'all',
              label: t('Variabel berawalan NEXT_PUBLIC_ tetap rahasia karena ada di file .env'),
              explainWrong: t('Variabel berawalan NEXT_PUBLIC_ dan VITE_ ikut dikirim ke browser, jadi semua orang bisa melihatnya.'),
            },
            {
              id: 'push',
              label: t('File .env harus diunggah ke GitHub publik agar tim bisa membacanya'),
              explainWrong: t('File .env harus masuk .gitignore agar tidak bocor ke GitHub.'),
            },
          ],
          answer: 'srv',
          explainCorrect: t('Variabel rahasia murni tinggal di backend. Masukkan .env ke .gitignore agar tidak bocor ke GitHub.'),
          hints: [t('Ingat awalan yang berarti "boleh dilihat publik".')],
          tags: ['rahasia-frontend', 'git'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a12-l04-q3j',
          type: 'scenario',
          modes: ['junior'],
          story: t('Dimas menulis kata sandi di kode halaman. Tamu membuka kode itu.', 'Dimas menaruh kata sandi gudang di kode halaman. Lalu seorang tamu membuka kode halaman itu.'),
          prompt: t('Apa yang bisa terjadi?'),
          choices: [
            { id: 'read', label: t('Tamu bisa membaca kata sandi itu') },
            {
              id: 'auto',
              label: t('Kata sandi itu otomatis tersembunyi'),
              explainWrong: t('Halaman tidak menyembunyikan apa pun. Kode dikirim apa adanya ke tamu.', 'Halaman tidak menyembunyikan apa pun sendiri, karena kodenya dikirim apa adanya ke tamu.'),
            },
            {
              id: 'only',
              label: t('Hanya Dimas yang bisa membacanya'),
              explainWrong: t('Kode halaman dikirim ke HP setiap tamu. Jadi Dimas bukan satu-satunya pembaca.'),
            },
          ],
          answer: 'read',
          explainCorrect: t('Kode halaman bisa dibuka tamu. Rahasia di sana ikut terbaca.', 'Semua kode halaman bisa dibuka tamu, jadi rahasia yang ditulis di sana ikut terbaca.'),
          hints: [t('Ingat kunci di bawah keset ruang tamu.')],
          tags: ['rahasia-frontend'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a12-l04-q6',
          prompt: t(
            'Kata sandi di alamat situs aman karena alamatnya cepat hilang.',
            'Token atau kata sandi di URL, misalnya ?token=rahasia123, aman karena URL langsung hilang setelah halaman terbuka.',
          ),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru. Alamat situs tersimpan di riwayat dan mudah ikut tersalin.',
            'Pernyataan itu keliru: URL tersimpan di riwayat browser dan log, serta ikut terbawa saat tautan disalin.',
          ),
          explainWrong: t(
            'Alamat situs tersimpan di riwayat. Data rahasia tidak boleh ada di sana.',
            'URL tersimpan di riwayat dan log server, jadi tidak boleh berisi data sensitif.',
          ),
          hints: [t('Ingat: alamat situs bisa disalin dan dibagikan.', 'Pikirkan ke mana saja URL tercatat.')],
          tags: ['rahasia-frontend'],
        }),
      ),
      qStep({
        id: 'a12-l04-q7',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi perintah pemeriksa celah paket proyek dan atribut pengaman skrip CDN:'),
        template: 'Periksa celah paket proyek dengan perintah: npm ___\nSidik jari file CDN dipasang pada atribut: ___',
        bank: ['audit', 'integrity', 'innerHTML', 'push'],
        answer: ['audit', 'integrity'],
        explainCorrect: t('npm audit mencari celah pada paket pihak ketiga. Atribut integrity (SRI) membuat browser menolak file CDN yang sudah diubah.'),
        hints: [t('Satu kata berarti "memeriksa", satu lagi berarti "keutuhan".'), undefined],
        tags: ['rahasia-frontend'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a12-l04-r1',
        prompt: t(
          'Di mana kunci rahasia sebaiknya disimpan?',
          'File .env berisi kunci rahasia harus didaftarkan ke mana agar tidak terunggah saat git push?',
        ),
        choices: [
          { id: 'gi', label: t('Di ruang dalam yang tertutup', '.gitignore') },
          {
            id: 'html',
            label: t('Di kode halaman yang terbuka', 'index.html'),
            explainWrong: t(
              'Kode halaman terbuka untuk semua tamu. Rahasia tidak aman di sana.',
              'index.html dikirim ke browser, jadi menaruh rahasia di sana menampilkannya ke publik.',
            ),
          },
          {
            id: 'k3',
            label: t('Di catatan kecil di pojok halaman', 'README.md'),
            explainWrong: t(
              'Pojok halaman tetap bagian dari halaman. Semua tamu bisa membacanya.',
              'README.md ikut diunggah ke GitHub dan bisa dibaca publik.',
            ),
          },
        ],
        answer: 'gi',
        explainCorrect: t(
          'Rahasia aman di ruang dalam yang tertutup. Tamu tidak bisa masuk ke sana.',
          'Daftarkan .env ke .gitignore sejak awal proyek.',
        ),
        hints: [t('Ingat kunci brankas: di dalam atau di keset?', 'Cari file yang memberi tahu Git apa yang diabaikan.')],
        tags: ['rahasia-frontend', 'git'],
      }),
      makeTf({
        id: 'a12-l04-r2',
        prompt: t(
          'Rahasia yang disimpan di ruang dalam tidak bisa dibaca tamu halaman.',
          'Cookie HttpOnly tidak bisa dibaca oleh JavaScript.',
        ),
        answer: true,
        explainCorrect: t(
          'Ruang dalam tertutup untuk tamu. Karena itu rahasia aman di sana.',
          'HttpOnly melindungi token login saat terjadi serangan XSS.',
        ),
        explainWrong: t(
          'Tamu hanya melihat meja depan. Ruang dalam tidak bisa mereka masuki.',
          'HttpOnly dirancang agar JavaScript tidak bisa mengakses cookie lewat document.cookie.',
        ),
        hints: [t('Ingat siapa yang boleh masuk ruang dalam.', 'Pikirkan apa arti Http-Only untuk skrip.')],
        tags: ['rahasia-frontend', 'xss'],
      }),
    ],
    recap: t(
      'Simpan rahasia di ruang dalam, bukan di halaman atau alamat situs.',
      'Simpan rahasia hanya di backend dan masukkan .env ke .gitignore. Pakai cookie HttpOnly untuk token login.',
    ),
    companion: {
      talkPrompts: ['Mengapa halaman login tiruan meniru warna dan logo yang asli?'],
      offlineActivity:
        'Tulis alamat toko-rani.example di satu kartu. Buat tiga kartu lain dengan satu huruf berbeda. Cari perbedaannya bersama pendamping.',
    },
  }),
];
