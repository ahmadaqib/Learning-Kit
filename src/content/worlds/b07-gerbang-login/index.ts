import {
  conceptStep,
  limitStep,
  makeAnchorMcq,
  makeLesson,
  makeMcq,
  makeTf,
  qStep,
  rCode,
  rTerm,
  rText,
  simStep,
  storyStep,
  t,
} from '@/content/lessonHelpers';
import type { Lesson, World } from '@/content/schema';

export const world: World = {
  id: 'b07',
  track: 'B',
  order: 7,
  title: 'Gerbang Login',
  tagline: t(
    'Membedakan tiket masuk, gelang hologram JWT, dan kunci parkir valet.',
    'Menguasai AuthN vs AuthZ, API key/Session/Bearer, anatomi & batas JWT, Refresh Token, dan OAuth 2.0 + PKCE.',
  ),
  color: '#6C5CE7',
  illustration: 'b07-gerbang-login',
  sourceChapters: ['J2-12'],
  requires: ['b06'],
  lessons: ['b07-l01', 'b07-l02', 'b07-l03', 'b07-l04', 'b07-l05'],
  sideQuests: [],
  boss: {
    title: 'Tantangan Penjaga Gerbang',
    greeting: t(
      'Halo! Tunjukkan apakah kamu tahu cara membuka gerbang login dengan aman!',
      'Buktikan penguasaanmu tentang autentikasi, otorisasi, JWT, refresh token, dan alur OAuth 2.0.',
    ),
    guardianName: 'Penjaga Gerbang',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'b07-anc-j1',
        prompt: t('Memeriksa KTP tamu saat check-in hotel itu ibarat proses…'),
        choices: [
          { id: 'authn', label: t('Autentikasi ("Kamu siapa?")'), explainWrong: t('Benar!') },
          {
            id: 'authz',
            label: t('Otorisasi ("Boleh buka pintu mana?")'),
            explainWrong: t('Otorisasi menentukan hak akses setelah identitas dikenali.'),
          },
          {
            id: 'css',
            label: t('Mewarnai lobi hotel'),
            explainWrong: t('Warna tampilan adalah urusan CSS.'),
          },
        ],
        answer: 'authn',
        explainCorrect: t('Autentikasi membuktikan siapa dirimu sebelum diberi hak akses.'),
        tags: ['autentikasi'],
      }),
      makeAnchorMcq({
        id: 'b07-anc-j2',
        prompt: t('Kartu kamar 305 yang tidak bisa membuka kamar 306 adalah contoh dari…'),
        choices: [
          { id: 'authz', label: t('Otorisasi (hak akses)'), explainWrong: t('Tepat!') },
          {
            id: 'authn',
            label: t('Autentikasi saja'),
            explainWrong: t('Autentikasi hanya mengecek siapa tamu itu saat awal.'),
          },
          {
            id: 'wh',
            label: t('Webhook bel pintu'),
            explainWrong: t('Webhook itu panggilan server saat kejadian terjadi.'),
          },
        ],
        answer: 'authz',
        explainCorrect: t('Otorisasi menentukan ruang atau data mana saja yang boleh kamu buka.'),
        tags: ['autentikasi'],
      }),
      makeAnchorMcq({
        id: 'b07-anc-j3',
        prompt: t('Mengapa kata sandi tidak aman ditaruh di tulisan gelang JWT?'),
        choices: [
          {
            id: 'read',
            label: t('Tulisan isi JWT bisa dibaca siapa saja'),
            explainWrong: t('Benar!'),
          },
          {
            id: 'long',
            label: t('Gelang jadi kepanjangan di tangan'),
            explainWrong: t('Masalah utamanya adalah isi JWT tidak terenkripsi sehingga mudah dibaca.'),
          },
          {
            id: 'del',
            label: t('Kata sandi langsung hilang dari server'),
            explainWrong: t('Isinya tidak hilang, malah bisa diintip orang lain.'),
          },
        ],
        answer: 'read',
        explainCorrect: t('Isi payload JWT hanya disandikan base64, bukan dikunci rahasia.'),
        tags: ['jwt'],
      }),
      makeAnchorMcq({
        id: 'b07-anc-j4',
        prompt: t('Jika seseorang mencoba memalsukan tulisan di gelang JWT, bagian mana yang langsung ketahuan tidak cocok?'),
        choices: [
          { id: 'sig', label: t('Hologram Signature (tanda tangan)'), explainWrong: t('Tepat!') },
          {
            id: 'color',
            label: t('Warna huruf di CSS'),
            explainWrong: t('Keamanan JWT diperiksa dari cap Signature, bukan warna.'),
          },
          {
            id: 'url',
            label: t('Nama domain website'),
            explainWrong: t('Domain hanya alamat situs.'),
          },
        ],
        answer: 'sig',
        explainCorrect: t('Signature dibuat dari kunci rahasia server sehingga perubahan satu huruf saja membuat capnya rusak.'),
        tags: ['jwt'],
      }),
      makeAnchorMcq({
        id: 'b07-anc-j5',
        prompt: t('Kode angka jawaban server kalau kamu belum login atau gelangmu palsu adalah…'),
        choices: [
          { id: 'c401', label: t('401 (Gagal autentikasi)'), explainWrong: t('Benar!') },
          {
            id: 'c200',
            label: t('200 (Berhasil)'),
            explainWrong: t('200 berarti berhasil, bukan ditolak.'),
          },
          {
            id: 'c404',
            label: t('404 (Halaman tidak ketemu)'),
            explainWrong: t('404 berarti alamat atau barang tidak ditemukan.'),
          },
        ],
        answer: 'c401',
        explainCorrect: t('401 menandakan gagal membuktikan identitas (autentikasi).'),
        tags: ['autentikasi', 'status-code'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'b07-anc-p1',
        prompt: t('Manakah pasangan kode status HTTP yang paling akurat untuk gagal AuthN dan gagal AuthZ?'),
        choices: [
          { id: 'ok', label: t('Gagal autentikasi → 401; lolos login tetapi tidak berhak → 403') },
          { id: 'swap', label: t('Gagal autentikasi → 403; tidak berhak → 401') },
          { id: 'both', label: t('Keduanya selalu memakai 404 agar hemat') },
        ],
        answer: 'ok',
        explainCorrect: t('401 Unauthorized (belum terautentikasi) dan 403 Forbidden (sudah login tetapi dilarang akses).'),
        tags: ['autentikasi', 'status-code'],
      }),
      makeAnchorMcq({
        id: 'b07-anc-p2',
        prompt: t('Mengapa API key rahasia untuk layanan berbayar tidak boleh ditaruh langsung di kode JavaScript frontend?'),
        choices: [
          { id: 'dev', label: t('Semua kode frontend bisa dibuka lewat DevTools sehingga kunci mudah dicuri') },
          { id: 'slow', label: t('Karena JavaScript browser tidak bisa mengirim header x-api-key') },
          { id: 'cors', label: t('Karena JSON tidak menerima huruf dan angka') },
        ],
        answer: 'dev',
        explainCorrect: t('Simpan API key rahasia di server/BFF, bukan di bundel frontend yang terbuka untuk setiap pengunjung.'),
        tags: ['api-key', 'rahasia-frontend'],
      }),
      makeAnchorMcq({
        id: 'b07-anc-p3',
        prompt: t('Apa kerugian utama memakai JWT stateless murni dibanding session di server ketika perlu logout paksa segera?'),
        choices: [
          { id: 'rev', label: t('JWT sulit ditarik kembali sebelum waktu kedaluwarsa (exp) habis') },
          { id: 'enc', label: t('JWT tidak bisa dikirim lewat HTTPS') },
          { id: 'size', label: t('JWT hanya bisa dipakai di aplikasi desktop') },
        ],
        answer: 'rev',
        explainCorrect: t('Karena server tidak menyimpan daftar sesi JWT, token tetap valid sampai exp berakhir kecuali ada mekanisme daftar blokir.'),
        tags: ['jwt'],
      }),
      makeAnchorMcq({
        id: 'b07-anc-p4',
        prompt: t('Di mana refresh token sebaiknya disimpan pada aplikasi web agar lebih aman dari pencurian skrip XSS?'),
        choices: [
          { id: 'http', label: t('Di dalam cookie HttpOnly yang tidak bisa dibaca JavaScript') },
          { id: 'ls', label: t('Di dalam query parameter URL halaman utama') },
          { id: 'html', label: t('Ditulis di komentar kode HTML agar mudah dicek') },
        ],
        answer: 'http',
        explainCorrect: t('Cookie HttpOnly mencegah JavaScript mengakses refresh token sehingga mengurangi risiko pencurian lewat XSS.'),
        tags: ['refresh-token', 'cookie-cache'],
      }),
      makeAnchorMcq({
        id: 'b07-anc-p5',
        prompt: t('Apa peran PKCE dalam alur OAuth 2.0 Authorization Code?'),
        choices: [
          { id: 'pkce', label: t('Mengharuskan penukar kode membuktikan rahasia acak awal agar kode curian tidak bisa ditukar token') },
          { id: 'pass', label: t('Mengirimkan kata sandi asli Google pengguna ke server aplikasi pihak ketiga') },
          { id: 'img', label: t('Mengompres gambar avatar pengguna menjadi PNG') },
        ],
        answer: 'pkce',
        explainCorrect: t('PKCE melindungi pertukaran authorization code dari penyadapan di tengah jalan.'),
        tags: ['oauth'],
      }),
      makeAnchorMcq({
        id: 'b07-anc-p6',
        type: 'limit',
        analogy: t('JWT seperti gelang konser berhologram'),
        prompt: t('Batas penting apa dari analogi gelang konser berhologram ketika diterapkan ke JWT asli?'),
        choices: [
          { id: 'dec', label: t('Siapa pun yang memegang JWT bisa langsung membaca isi payload Base64, sehingga data rahasia dilarang masuk ke dalamnya') },
          { id: 'holo', label: t('Penjaga gerbang bisa memverifikasi keaslian gelang cukup dari hologramnya') },
          { id: 'exp', label: t('Gelang memiliki batas waktu berlaku tertentu') },
        ],
        answer: 'dec',
        explainCorrect: t('JWT ditandatangani agar tidak diubah, tetapi isinya tidak dienkripsi sehingga tetap terbaca.'),
        tags: ['jwt'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'b07-l01',
    worldId: 'b07',
    title: '“Kamu siapa?” vs “Kamu boleh apa?”',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan cek identitas (autentikasi) dan cek izin ruang (otorisasi).',
      'Aku bisa membedakan autentikasi (AuthN) dan otorisasi (AuthZ) beserta kode status 401 dan 403.',
    ),
    estMinutes: 5,
    introducesTerms: ['autentikasi'],
    usesTerms: ['api', 'server', 'status-code'],
    stickerId: 'kartu-hotel',
    warmupFrom: 'b06-l03',
    steps: [
      storyStep('b07/kartu-hotel.svg', [
        rText(
          'Saat menginap di hotel, resepsionis mengecek KTP-mu dulu saat check-in. Setelah itu, kamu diberi kartu yang hanya bisa membuka kamarmu!',
          'Dua kata di gerbang keamanan sering tertukar: petugas check-in hotel memastikan siapa kamu lewat KTP, lalu kartu kamar menentukan pintu mana saja yang boleh kamu buka.',
        ),
      ]),
      conceptStep({
        title: t('Autentikasi: Kamu Siapa?', 'Autentikasi (AuthN)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'autentikasi-ktp' },
        alt: t('Petugas hotel memeriksa KTP untuk memastikan identitas tamu.'),
        body: [
          rTerm('autentikasi', 'Autentikasi', 'Autentikasi (AuthN)'),
          rText(
            ' menjawab "Kamu siapa?" memakai sandi atau sidik jari. Ini seperti petugas hotel memeriksa KTP tamu saat check-in.',
            ' menjawab pertanyaan "Kamu siapa?" dengan membuktikan identitas memakai kata sandi, kode OTP, atau sidik jari.',
          ),
        ],
      }),
      conceptStep({
        title: t('Otorisasi: Boleh Apa?', 'Otorisasi (AuthZ)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'otorisasi-kartu' },
        alt: t('Kartu hotel membuka kamar 305 dan kolam renang, tetapi menolak kamar lain.'),
        body: [
          rText(
            'Otorisasi menjawab "Kamu boleh apa?". Kartu hotel hanya membuka kamar 305, tidak bisa membuka kamar orang lain.',
            'Otorisasi (AuthZ) menjawab "Kamu boleh apa?": menentukan hak baca, ubah, atau hapus, seperti kartu hotel yang hanya membuka kamar 305 dan kolam renang.',
          ),
        ],
      }),
      conceptStep({
        title: t('Angka 401 vs 403', 'Kode Status 401 dan 403'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'status-401-403' },
        alt: t('Perbandingan status 401 gagal masuk dan 403 masuk tapi tidak berhak.'),
        body: [
          rText(
            'Jika gagal membuktikan diri, server memberi kode 401. Jika sudah masuk tetapi dilarang masuk kamar lain, kodenya 403.',
            'Gagal autentikasi dibalas status ',
          ),
          rCode('401 Unauthorized'),
          rText(', sedangkan lolos login tetapi tidak memiliki izin dibalas ', ', sedangkan lolos login tetapi tidak memiliki izin dibalas '),
          rCode('403 Forbidden'),
          rText('.', '.'),
        ],
      }),
      limitStep({
        analogy: t('Resepsionis dan kartu kamar hotel'),
        same: [
          t('Harus melewati pemeriksaan identitas dulu sebelum mendapat hak akses.'),
          t('Kartu hanya membuka pintu yang sesuai dengan hak milikmu.'),
        ],
        different: [
          t('Di sistem API, server memeriksa hak otorisasi pada setiap request, bukan hanya sekali di lobi depan.'),
          t('Satu pengguna bisa punya peran berbeda (pembeli, admin) yang menentukan aksi apa saja yang diizinkan.'),
        ],
      }),
      simStep(
        'pembaca-gelang-jwt',
        t(
          'Lihat gelang pengenal tamu di simulator: coba ubah perannya lalu amati reaksinya!',
          'Uji bagaimana pengenalan identitas dan peran memengaruhi akses yang diizinkan atau ditolak.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'b07-l01-q1',
          type: 'analogy',
          prompt: t('Memasukkan kata sandi dan kode OTP saat login diibaratkan seperti…'),
          choices: [
            { id: 'ktp', label: t('Menunjukkan KTP di meja check-in (Autentikasi)') },
            {
              id: 'kamar',
              label: t('Menempelkan kartu ke pintu kamar 305'),
              explainWrong: t('Membuka pintu tertentu itu memeriksa hak akses (otorisasi).'),
            },
            {
              id: 'bell',
              label: t('Memencet bel dapur restoran'),
              explainWrong: t('Bel pintu lebih mirip webhook.'),
            },
          ],
          answer: 'ktp',
          explainCorrect: t('Benar! Kata sandi dan OTP membuktikan siapa dirimu (autentikasi).'),
          tags: ['autentikasi'],
        }),
      ),
      qStep({
        id: 'b07-l01-q2',
        type: 'sort',
        prompt: t('Kelompokkan contoh berikut ke Autentikasi atau Otorisasi:'),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('Memasukkan sidik jari untuk membuka akun') },
          { id: 'i2', label: t('Mengecek apakah akun boleh menghapus produk') },
          { id: 'i3', label: t('Mengetik kode OTP saat masuk aplikasi') },
          { id: 'i4', label: t('Membatasi kartu kamar hanya untuk lantai 3') },
        ],
        bins: [
          { id: 'authn', label: t('Autentikasi (Siapa kamu)') },
          { id: 'authz', label: t('Otorisasi (Boleh apa)') },
        ],
        answer: { i1: 'authn', i2: 'authz', i3: 'authn', i4: 'authz' },
        explainCorrect: t('Mantap! Sidik jari dan OTP memeriksa identitas; izin hapus dan batas lantai memeriksa hak.'),
        tags: ['autentikasi'],
      }),
      qStep(
        makeMcq({
          id: 'b07-l01-q3',
          prompt: t('Rani sudah berhasil login sebagai pembeli, tetapi ia mencoba membuka halaman rahasia admin toko. Kode status apa yang tepat dari server?'),
          choices: [
            { id: '403', label: t('403 Forbidden') },
            {
              id: '401',
              label: t('401 Unauthorized'),
              explainWrong: t('Rani sudah login sehingga identitasnya sudah dikenal; masalahnya pada hak akses.'),
            },
            {
              id: '200',
              label: t('200 OK'),
              explainWrong: t('200 berarti berhasil; pembeli biasa tidak boleh membuka halaman admin.'),
            },
          ],
          answer: '403',
          explainCorrect: t('Tepat! Identitas Rani dikenal, namun perannya tidak berhak masuk sehingga dibalas 403.'),
          tags: ['autentikasi', 'status-code'],
        }),
      ),
      qStep(
        makeTf({
          id: 'b07-l01-q4',
          prompt: t('Kalau seseorang sudah berhasil login, ia otomatis boleh melihat dan menghapus semua data milik orang lain.'),
          answer: false,
          explainCorrect: t('Betul, itu salah! Setelah login (autentikasi), server tetap wajib memeriksa hak (otorisasi).'),
          explainWrong: t('Hampir! Login hanya menjawab "siapa kamu", belum tentu boleh membuka semua pintu.'),
          tags: ['autentikasi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l01-q5',
          type: 'limit',
          analogy: t('Resepsionis dan kartu hotel'),
          prompt: t('Apa perbedaan yang perlu diingat dari analogi hotel pada sistem API digital?'),
          choices: [
            {
              id: 'each',
              label: t('Server memeriksa izin pada SETIAP request yang datang, tidak hanya sekali di awal'),
            },
            {
              id: 'card',
              label: t('Kartu hanya membuka kamar milik tamu'),
              explainWrong: t('Ini kesamaan antara kartu kamar dan otorisasi.'),
            },
            {
              id: 'id',
              label: t('Tamu perlu membuktikan identitas lebih dulu'),
              explainWrong: t('Ini kesamaan antara check-in hotel dan autentikasi.'),
            },
          ],
          answer: 'each',
          explainCorrect: t('Benar! Di API, setiap request harus diperiksa identitas dan haknya oleh server.'),
          tags: ['autentikasi', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l01-q6',
          type: 'scenario',
          story: t('Bito lupa login lalu langsung menekan tombol "Edit Profil" di Toko Rani. Server menolak permintaan itu.'),
          prompt: t('Mengapa server mengirim status 401 dan bukan 403?'),
          difficulty: 2,
          choices: [
            { id: 'who', label: t('Karena server belum tahu Bito itu siapa (belum autentikasi)') },
            {
              id: 'del',
              label: t('Karena halaman profil sudah dihapus'),
              explainWrong: t('Jika halaman tidak ada, kodenya 404.'),
            },
            {
              id: 'full',
              label: t('Karena server sedang penuh pengunjung'),
              explainWrong: t('Jika terlalu banyak request, kodenya 429 atau 503.'),
            },
          ],
          answer: 'who',
          explainCorrect: t('Tepat! Tanpa login yang sah, server belum mengenal identitas pengirim sehingga menjawab 401.'),
          tags: ['autentikasi', 'status-code'],
        }),
      ),
      qStep({
        id: 'b07-l01-q7',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi ringkasan dua konsep keamanan gerbang API berikut:'),
        template: '___ membuktikan "kamu siapa?" (gagal = 401), sedangkan ___ menentukan "kamu boleh apa?" (ditolak = 403).',
        bank: ['Autentikasi', 'Otorisasi', 'Serialisasi', 'Polling'],
        answer: ['Autentikasi', 'Otorisasi'],
        explainCorrect: t('Tepat. AuthN memeriksa identitas; AuthZ memeriksa hak akses.'),
        tags: ['autentikasi'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b07-l01-r1',
        prompt: t('Pertanyaan utama yang dijawab oleh Autentikasi adalah…'),
        choices: [
          { id: 'who', label: t('"Kamu siapa?"') },
          { id: 'what', label: t('"Kamu boleh melakukan apa?"'), explainWrong: t('Itu pertanyaan untuk Otorisasi.') },
        ],
        answer: 'who',
        explainCorrect: t('Autentikasi memverifikasi identitas pengguna.'),
        tags: ['autentikasi'],
      }),
      makeMcq({
        id: 'b07-l01-r2',
        prompt: t('Sudah login tetapi mencoba mengakses data admin yang dilarang akan menerima status…'),
        choices: [
          { id: '403', label: t('403 Forbidden') },
          { id: '401', label: t('401 Unauthorized'), explainWrong: t('401 berarti belum berhasil membuktikan identitas.') },
        ],
        answer: '403',
        explainCorrect: t('403 menandakan identitas dikenal tetapi tidak punya hak akses.'),
        tags: ['autentikasi', 'status-code'],
      }),
    ],
    recap: t(
      'Autentikasi bertanya "Kamu siapa?" (401); otorisasi bertanya "Kamu boleh apa?" (403).',
      'Autentikasi (AuthN → 401) membuktikan identitas, sementara otorisasi (AuthZ → 403) membatasi hak aksi.',
    ),
    companion: {
      talkPrompts: [
        'Kenapa kunci pagar rumah (boleh masuk halaman) berbeda dengan kunci kamar tidur masing-masing?',
        'Kalau ada kakak masuk rumah tapi tidak boleh buka laci kerja ayah, mana autentikasi dan mana otorisasi?',
      ],
      offlineActivity:
        'Ambil kartu mainan atau kertas: tulis nama anggota keluarga di satu kartu (Autentikasi) dan daftar ruangan yang boleh dibuka di kartu lain (Otorisasi).',
    },
  }),

  makeLesson({
    id: 'b07-l02',
    worldId: 'b07',
    title: 'API key, session, token',
    modes: ['pro'],
    objective: t('Aku bisa membandingkan empat cara membawa identitas (API key, Basic Auth, Session Cookie, Bearer Token) beserta risikonya.'),
    estMinutes: 5,
    introducesTerms: ['api-key'],
    usesTerms: ['autentikasi', 'api', 'server', 'browser', 'header-body', 'cookie-cache', 'https', 'xss', 'csrf', 'rahasia-frontend'],
    warmupFrom: 'b07-l01',
    steps: [
      storyStep('b07/api-key.svg', [
        rText('Untuk melewati pintu gerbang API, ada empat macam tanda pengenal: kartu akses kantor (API key), menyebut sandi tiap pintu (Basic), tiket penitipan jaket (Session), dan tiket konser (Bearer Token).'),
      ]),
      conceptStep({
        title: t('API Key & Basic Auth'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'apikey-basic' },
        alt: t('Header x-api-key untuk aplikasi dan Authorization Basic base64 yang wajib lewat HTTPS.'),
        code: {
          lang: 'http',
          code: 'x-api-key: sk_live_8f2a_rahasia\nAuthorization: Basic cmFuaTpyYWhhc2lh',
        },
        body: [
          rTerm('api-key', 'API key'),
          rText(' adalah kode rahasia milik aplikasi (bukan orang). Jangan pernah menaruh kunci rahasia ini di kode frontend karena mudah terlihat di DevTools! Basic Auth hanya menyamarkan nama:sandi dengan base64 (bukan enkripsi), wajib lewat '),
          rTerm('https', 'HTTPS'),
          rText('.'),
        ],
      }),
      conceptStep({
        title: t('Session Cookie vs Bearer Token'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'session-vs-token' },
        alt: t('Session menyimpan data login di server lewat cookie; Bearer Token mengirim token di header.'),
        code: {
          lang: 'http',
          code: 'Authorization: Bearer eyJhbGciOi...',
        },
        body: [
          rText('Pada '),
          rTerm('cookie-cache', 'Session + Cookie'),
          rText(', server menyimpan data sesi ("penitipan jaket") dan browser mengirim nomor sesi otomatis. Pada Bearer Token, siapa pun pembawa token di header dianggap pemiliknya ("tiket konser").'),
        ],
      }),
      conceptStep({
        title: t('Membandingkan Risiko Keamanan'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'perbandingan-sesi-token' },
        alt: t('Session mudah logout paksa dan waspada CSRF; Token cocok multi-layanan dan waspada XSS.'),
        body: [
          rText('Session cookie mudah di-logout paksa (hapus di server) dan cocok untuk satu domain, tetapi rawan '),
          rTerm('csrf', 'CSRF'),
          rText(' (cegah dengan SameSite). Token cocok untuk HP dan banyak layanan, tetapi rawan dicuri '),
          rTerm('xss', 'XSS'),
          rText(' bila disimpan di localStorage.'),
        ],
      }),
      limitStep({
        analogy: t('Kartu akses, tiket jaket, dan tiket konser'),
        same: [
          t('Semua cara tersebut menunjukkan bukti hak masuk ke gerbang API.'),
        ],
        different: [
          t('Pada Basic Auth, tulisan base64 dapat dibalikkan siapa saja dalam sedetik sehingga tanpa HTTPS sama saja berteriak kata sandi di ruangan ramai.'),
          t('API key publik yang memang dirancang untuk browser (seperti kunci peta) tetap harus dibatasi hanya untuk domain milikmu.'),
        ],
      }),
      simStep(
        'pembaca-gelang-jwt',
        t('Amati bentuk token pembawa (Bearer) yang dibawa di header pada setiap permintaan.'),
      ),
      qStep({
        id: 'b07-l02-q1',
        type: 'match',
        prompt: t('Pasangkan keempat cara menunjukkan identitas API dengan perumpamaan yang tepat:'),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('API key') },
          { id: 'l2', label: t('Basic Auth') },
          { id: 'l3', label: t('Session + Cookie') },
          { id: 'l4', label: t('Bearer Token') },
        ],
        right: [
          { id: 'r1', label: t('Kartu akses aplikasi masuk gedung') },
          { id: 'r2', label: t('Menyebut nama & sandi tiap lewat pintu') },
          { id: 'r3', label: t('Tiket penitipan jaket disimpan petugas') },
          { id: 'r4', label: t('Tiket konser: pembawa dianggap pemilik') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
        explainCorrect: t('Tepat! Keempat mekanisme punya ciri khas cara penyimpanan dan pengiriman identitas.'),
        tags: ['api-key', 'cookie-cache'],
      }),
      qStep({
        id: 'b07-l02-q2',
        type: 'spotbug',
        difficulty: 2,
        prompt: t('Ketuk baris kode frontend React yang berbahaya karena membocorkan API key rahasia ke browser:'),
        lines: [
          'async function cariCuaca(kota) {',
          '  const API_SECRET = "sk_live_rahasia_toko_rani";',
          '  return fetch(`https://api.toko-rani.example/cuaca?q=${kota}&key=${API_SECRET}`);',
          '}',
        ],
        answer: [2],
        explainCorrect: t('Benar! Baris 2 menaruh API_SECRET di kode frontend sehingga siapa pun bisa mengintipnya via DevTools.'),
        tags: ['api-key', 'rahasia-frontend'],
      }),
      qStep(
        makeMcq({
          id: 'b07-l02-q3',
          type: 'why',
          base: 'Authorization: Basic cmFuaTpyYWhhc2lh wajib dikirim hanya melalui HTTPS.',
          prompt: t('Mengapa teks Basic Auth tersebut TIDAK boleh dianggap sudah terenkripsi aman?'),
          choices: [
            { id: 'b64', label: t('Karena Base64 hanya menyamarkan teks dan bisa di-decode siapa saja tanpa kunci rahasia') },
            {
              id: 'len',
              label: t('Karena huruf Base64 terlalu pendek untuk server'),
              explainWrong: t('Masalahnya bukan panjangnya, melainkan Base64 bukan enkripsi.'),
            },
            {
              id: 'get',
              label: t('Karena browser tidak mendukung header Authorization'),
              explainWrong: t('Browser mendukung header Authorization.'),
            },
          ],
          answer: 'b64',
          explainCorrect: t('Tepat. Base64 hanyalah pengodean teks, bukan enkripsi; tanpa HTTPS siapa pun di jaringan bisa langsung membacanya.'),
          tags: ['api-key', 'https'],
        }),
      ),
      qStep(
        makeTf({
          id: 'b07-l02-q4',
          prompt: t('Jika ingin bisa segera me-logout paksa akun yang mencurigakan di sisi server, Session + Cookie lebih mudah daripada JWT murni.'),
          answer: true,
          explainCorrect: t('Benar! Cukup hapus catatan sesi di server atau database maka cookie lama langsung tidak berlaku.'),
          explainWrong: t('Justru Session + Cookie unggul untuk logout paksa karena datanya disimpan langsung di server.'),
          tags: ['cookie-cache', 'api-key'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l02-q5',
          type: 'limit',
          analogy: t('Kartu akses & tiket jaket'),
          prompt: t('Apa pengecualian yang sering membingungkan soal "dilarang menaruh API key di kode frontend"?'),
          choices: [
            { id: 'pub', label: t('Kunci publik khusus frontend (misalnya kunci peta) memang boleh di browser asalkan dibatasi hanya untuk domain kita') },
            {
              id: 'all',
              label: t('Semua API key pembayaran boleh ditaruh di frontend asal memakai const'),
              explainWrong: t('const tetap terlihat utuh di bundel JavaScript browser.'),
            },
            {
              id: 'css',
              label: t('Menaruh API key di file CSS membuatnya terenkripsi'),
              explainWrong: t('File CSS juga terbuka untuk dibaca semua pengunjung.'),
            },
          ],
          answer: 'pub',
          explainCorrect: t('Tepat. Kunci yang memang dirancang publik tetap aman selama dibatasi referer domain-nya, sedangkan kunci rahasia wajib di server.'),
          tags: ['api-key', 'rahasia-frontend'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l02-q6',
          type: 'scenario',
          story: t('Sari membangun web toko yang juga punya aplikasi mobile Android dan beberapa layanan mikro di belakang.'),
          prompt: t('Mekanisme identitas manakah yang paling fleksibel melayani browser sekaligus aplikasi mobile dan banyak layanan API?'),
          choices: [
            { id: 'tok', label: t('Bearer Token di header Authorization') },
            {
              id: 'basic',
              label: t('Menyimpan kata sandi polos di localStorage lalu kirim Basic Auth'),
              explainWrong: t('Menyimpan kata sandi mentah di localStorage sangat berbahaya.'),
            },
            {
              id: 'none',
              label: t('Tidak usah login sama sekali'),
              explainWrong: t('Toko tetap perlu mengenali pengguna.'),
            },
          ],
          answer: 'tok',
          explainCorrect: t('Benar! Token Bearer mudah dibawa aplikasi HP maupun web ke berbagai layanan API.'),
          tags: ['api-key', 'autentikasi'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b07-l02-r1',
        prompt: t('Apa arti kata "Bearer" pada header Authorization: Bearer <token>?'),
        choices: [
          { id: 'own', label: t('Pembawa: siapa pun yang membawa token itu dianggap pemilik yang sah') },
          { id: 'err', label: t('Pesan sedang mengalami kesalahan'), explainWrong: t('Bearer berarti pembawa token.') },
        ],
        answer: 'own',
        explainCorrect: t('Karena siapa pun pembawanya dianggap pemilik, Bearer token harus selalu dikirim lewat HTTPS.'),
        tags: ['api-key'],
      }),
      makeTf({
        id: 'b07-l02-r2',
        prompt: t('Menyimpan token di localStorage memiliki risiko pencurian lewat serangan XSS.'),
        answer: true,
        explainCorrect: t('Betul! Kode JavaScript nakal akibat celah XSS dapat membaca localStorage.'),
        explainWrong: t('localStorage dapat diakses JavaScript sehingga rentan jika ada celah XSS.'),
        tags: ['xss', 'api-key'],
      }),
    ],
    recap: t('Pilih antara API key (aplikasi di server), Session Cookie (satu domain, mudah logout paksa), dan Bearer Token (multi-platform).'),
  }),

  makeLesson({
    id: 'b07-l03',
    worldId: 'b07',
    title: 'JWT: gelang konser berhologram',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku paham tiga bagian gelang JWT dan kenapa tidak boleh menaruh rahasia di dalamnya.',
      'Aku bisa membaca struktur Header.Payload.Signature pada JWT serta menjelaskan batas keamanannya.',
    ),
    estMinutes: 6,
    introducesTerms: ['jwt'],
    usesTerms: ['autentikasi', 'api-key', 'json', 'server', 'browser', 'status-code'],
    stickerId: 'gelang-hologram',
    warmupFrom: 'b07-l02',
    steps: [
      storyStep('b07/gelang-hologram.svg', [
        rText(
          'JWT itu seperti gelang konser bercap hologram. Tulisan di gelang ("VIP, Rani") bisa dibaca siapa saja, tetapi hologramnya tidak bisa dipalsukan!',
          'JWT (JSON Web Token, dibaca "jot") bekerja seperti gelang konser berhologram: isinya bisa dibaca langsung tanpa menelepon kantor panitia, tetapi segel tanda tangannya mencegah pemalsuan.',
        ),
      ]),
      conceptStep({
        title: t('Tiga Bagian JWT', 'Anatomi 3 Bagian JWT'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'tiga-bagian-jwt' },
        alt: t('Token JWT terbagi tiga bagian dipisah titik: Header, Payload, dan Signature.'),
        code: {
          lang: 'text',
          code: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1IiwibmFtYSI6IlJhbmkiLCJyb2xlIjoicGVtYmVsaSIsImV4cCI6MTc5OTk5OTk5OX0.7mK2xQ9vR_sig',
        },
        body: [
          rTerm('jwt', 'JWT', 'JWT'),
          rText(
            ' adalah tiket teks tiga bagian yang dipisah titik. Bentuknya berisi Header, isi data Payload, dan cap Signature.',
            ' terdiri atas tiga teks Base64 yang dipisah titik: Header (algoritma), Payload (siapa, role, kedaluwarsa exp), dan Signature (cap rahasia server).',
          ),
        ],
      }),
      conceptStep({
        title: t('Cap Hologram Tidak Bisa Dipalsukan', 'Verifikasi Signature'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'signature-hologram' },
        alt: t('Jika tulisan role diubah dari pembeli menjadi admin, hologram Signature langsung tidak cocok.'),
        body: [
          rText(
            'Tulisan di gelang konser bisa dibaca mata siapa saja. Tetapi cap hologram Signature tidak dapat dipalsukan orang iseng.',
            'Signature dibuat server dari Header + Payload + kunci rahasia. Jika seseorang mengubah "pembeli" menjadi "admin", cap hologram tidak cocok lagi dan ditolak 401.',
          ),
        ],
      }),
      conceptStep({
        title: t('Jangan Taruh Rahasia di Payload', 'JWT Bukan Enkripsi'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'jwt-bukan-enkripsi' },
        alt: t('Peringatan: payload JWT disandikan base64 biasa sehingga kata sandi dan KTP dilarang masuk.'),
        body: [
          rText(
            'Karena tulisan gelang terbuka, jangan taruh kata sandi di dalamnya. Penjaga langsung menolak gelang bila tulisannya dicoret.',
            'Salah paham terbesar: JWT tidak dienkripsi, hanya disandikan Base64! Siapa pun bisa membaca payload-nya, jadi jangan pernah menaruh kata sandi atau nomor KTP di dalam JWT.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Gelang konser bercap hologram'),
        same: [
          t('Tulisan peran dan jam berlaku mudah dibaca, sementara hologram menjamin tidak ada coretan palsu.'),
          t('Penjaga bisa langsung memeriksa tanpa harus mengecek daftar tamu di kantor pusat.'),
        ],
        different: [
          t('Gelang konser fisik bisa digunting petugas kalau penonton berulah; JWT sulit ditarik kembali sebelum waktu kedaluwarsa (exp) habis.'),
          t('Di JWT, orang luar tetap bisa membaca isi datanya dengan alat Base64 biasa jika berhasil memegang token.'),
        ],
      }),
      simStep(
        'pembaca-gelang-jwt',
        t(
          'Klik tombol ubah gelang menjadi admin dan lihat bagaimana penjaga langsung menolak hologramnya!',
          'Uji perubahan isi payload pada simulator JWT dan amati kegagalan verifikasi Signature.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'b07-l03-q1',
          type: 'analogy',
          prompt: t('Pada analogi gelang konser JWT, cap hologram yang tidak bisa ditiru orang iseng mewakili bagian…'),
          choices: [
            { id: 'sig', label: t('Signature') },
            {
              id: 'pay',
              label: t('Payload'),
              explainWrong: t('Payload ibarat tulisan nama dan jenis tiket yang bisa dibaca siapa saja.'),
            },
            {
              id: 'hdr',
              label: t('Warna tali gelang'),
              explainWrong: t('Bagian ketiga JWT bernama Signature.'),
            },
          ],
          answer: 'sig',
          explainCorrect: t('Benar! Signature adalah cap kriptografis rahasia dari server.'),
          tags: ['jwt'],
        }),
      ),
      qStep({
        id: 'b07-l03-q2',
        type: 'hotspot',
        difficulty: 1,
        prompt: t('Ketuk bagian JWT yang menyimpan informasi siapa pengguna, perannya, dan kapan token kedaluwarsa (exp)!'),
        image: 'b07-hotspot',
        regions: [
          { id: 'header', shape: 'rect', coords: [10, 10, 140, 50], label: '1. Header (alg: HS256)' },
          { id: 'payload', shape: 'rect', coords: [160, 10, 220, 50], label: '2. Payload (sub, nama, role, exp)' },
          { id: 'signature', shape: 'rect', coords: [390, 10, 160, 50], label: '3. Signature (Cap rahasia)' },
          { id: 'dot', shape: 'rect', coords: [10, 70, 200, 40], label: '4. Tanda titik pemisah' },
        ],
        answer: 'payload',
        explainCorrect: t('Tepat! Bagian tengah (Payload) berisi data klaim seperti sub, nama, role, dan exp.'),
        tags: ['jwt', 'json'],
      }),
      qStep(
        makeTf({
          id: 'b07-l03-q3',
          prompt: t('Karena bentuknya acak seperti eyJzdWIi..., isi payload JWT mustahil dibaca orang lain tanpa kunci rahasia server.'),
          answer: false,
          explainCorrect: t('Betul, pernyataan itu salah! Payload JWT hanya disandikan Base64 sehingga siapa pun bisa membacanya.'),
          explainWrong: t('Hampir! Bentuk acak itu bukan enkripsi, melainkan Base64 yang langsung terbaca kalau didekode.'),
          tags: ['jwt'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l03-q4',
          prompt: t('Mengapa penjaga API bisa memverifikasi keaslian JWT dengan cepat tanpa selalu bertanya ke database sesi?'),
          choices: [
            { id: 'chk', label: t('Server cukup memeriksa ulang Signature memakai kunci rahasianya sendiri') },
            {
              id: 'ask',
              label: t('Server menanya langsung ke browser pembeli'),
              explainWrong: t('Server tidak boleh mempercayai pengakuan browser.'),
            },
            {
              id: 'skip',
              label: t('Server tidak pernah mengecek token sama sekali'),
              explainWrong: t('Server selalu wajib memvalidasi signature dan kedaluwarsa exp.'),
            },
          ],
          answer: 'chk',
          explainCorrect: t('Tepat! Kunci rahasia server cukup untuk mengecek apakah Signature cocok dengan Header + Payload.'),
          tags: ['jwt', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l03-q5',
          type: 'limit',
          analogy: t('Gelang konser berhologram'),
          prompt: t('Mana batas penting dari gelang konser yang TIDAK sama dengan JWT di server?'),
          choices: [
            {
              id: 'revoke',
              label: t('Gelang fisik bisa digunting kapan saja, sedangkan JWT tetap berlaku sampai waktu exp habis'),
            },
            {
              id: 'read',
              label: t('Tulisan di gelang dapat dibaca penjaga'),
              explainWrong: t('Keduanya sama-sama bisa dibaca langsung.'),
            },
            {
              id: 'tamper',
              label: t('Jika tulisan dicoret, cap hologram jadi tidak cocok'),
              explainWrong: t('Ini persamaan utama Signature JWT dan hologram gelang.'),
            },
          ],
          answer: 'revoke',
          explainCorrect: t('Benar! Karena JWT sulit ditarik sebelum kedaluwarsa, masa berlakunya dibuat singkat.'),
          tags: ['jwt'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l03-q6',
          type: 'scenario',
          story: t('Raka menerima token JWT dengan payload {"sub":"9","role":"pembeli"}. Ia mengedit Base64 tengahnya menjadi {"sub":"9","role":"admin"} lalu mengirimkannya ke API.'),
          prompt: t('Apa yang akan dilakukan server saat menerima token editan Raka?'),
          difficulty: 2,
          choices: [
            { id: '401', label: t('Menolak dengan 401 karena Signature tidak lagi cocok dengan isi Payload baru') },
            {
              id: 'adm',
              label: t('Langsung menjadikan Raka admin'),
              explainWrong: t('Server memeriksa Signature dulu sebelum mempercayai isi Payload.'),
            },
            {
              id: '404',
              label: t('Mengirim halaman 404 tidak ditemukan'),
              explainWrong: t('Masalahnya pada tanda tangan token palsu, bukan halaman hilang.'),
            },
          ],
          answer: '401',
          explainCorrect: t('Tepat! Mengubah satu huruf saja di Payload tanpa kunci rahasia membuat verifikasi Signature gagal.'),
          tags: ['jwt', 'status-code'],
        }),
      ),
      qStep({
        id: 'b07-l03-q7',
        type: 'type',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Tulis nama kolom standar di payload JWT yang menentukan kapan token berakhir (kedaluwarsa):'),
        accept: ['exp'],
        explainCorrect: t('Tepat! "exp" (expiration time) menandai waktu kedaluwarsa token JWT.'),
        tags: ['jwt'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b07-l03-r1',
        prompt: t('Berapa jumlah bagian utama pada sebuah JWT yang dipisah tanda titik (.)?'),
        choices: [
          { id: '3', label: t('Tiga bagian (Header, Payload, Signature)') },
          { id: '2', label: t('Dua bagian saja'), explainWrong: t('JWT terdiri atas Header.Payload.Signature.') },
        ],
        answer: '3',
        explainCorrect: t('Tiga bagian dipisah dua titik: Header.Payload.Signature.'),
        tags: ['jwt'],
      }),
      makeTf({
        id: 'b07-l03-r2',
        prompt: t('Payload JWT aman dipakai untuk menyimpan kata sandi pengguna karena terenkripsi otomatis.'),
        answer: false,
        explainCorrect: t('Benar, itu keliru! Payload JWT hanya Base64 biasa dan tidak boleh menyimpan data rahasia.'),
        explainWrong: t('Jangan lupa: Base64 bukan enkripsi sehingga kata sandi dilarang masuk ke JWT.'),
        tags: ['jwt'],
      }),
    ],
    recap: t(
      'JWT terdiri atas Header, Payload, dan Signature yang tidak bisa dipalsukan, tetapi isinya bisa dibaca.',
      'JWT menyatukan Header, Payload (Base64 terbuka), dan Signature (verifikasi keaslian) dengan masa berlaku singkat.',
    ),
    companion: {
      talkPrompts: [
        'Kalau tiket gelang konser tulisannya bisa dibaca semua orang di antrean, informasi apa yang tidak boleh ditulis di gelang itu?',
      ],
      offlineActivity:
        'Buat gelang kertas dari tiga potongan warna yang disambung: 1) jenis acara (Header), 2) nama & status tamu (Payload), 3) stiker hologram (Signature).',
    },
  }),

  makeLesson({
    id: 'b07-l04',
    worldId: 'b07',
    title: 'Access dan refresh token',
    modes: ['pro'],
    objective: t('Aku bisa menjelaskan peran access token berumur pendek dan refresh token berumur panjang dalam menjaga keamanan login.'),
    estMinutes: 5,
    introducesTerms: ['refresh-token'],
    usesTerms: ['jwt', 'autentikasi', 'cookie-cache', 'status-code', 'server', 'browser', 'http-method'],
    warmupFrom: 'b07-l03',
    steps: [
      storyStep('b07/refresh-token.svg', [
        rText('Access token itu seperti gelang masuk harian yang hangus malam ini, sedangkan refresh token seperti kartu member di dompet yang hanya dikeluarkan di loket untuk menukar gelang baru besok tanpa daftar ulang.'),
      ]),
      conceptStep({
        title: t('Access Token: Gelang Harian Pendek'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'access-token-pendek' },
        alt: t('Access token berumur 15 menit dikirim bersama setiap request API.'),
        body: [
          rText('Access token (sering berbentuk '),
          rTerm('jwt', 'JWT'),
          rText(') dipakai untuk setiap request dengan umur pendek, misalnya 15 menit. Bila token ini dicuri orang, masa pakainya cepat habis sehingga kerusakan terbatas.'),
        ],
      }),
      conceptStep({
        title: t('Refresh Token: Kartu Member Loket'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b07', topic: 'refresh-request' },
        alt: t('Alur 401 token kedaluwarsa diikuti POST /refresh lalu mendapat access token baru.'),
        code: {
          lang: 'text',
          code: '1. GET /profil + access token → 401 kedaluwarsa\n2. POST /refresh + refresh token → access token baru\n3. GET /profil + access token baru → 200 OK',
        },
        body: [
          rTerm('refresh-token', 'Refresh token'),
          rText(' berumur panjang dan hanya dikirim ke endpoint khusus (misal '),
          rCode('POST /refresh'),
          rText(') untuk meminta access token baru. Simpan di cookie '),
          rCode('HttpOnly'),
          rText(' agar lebih aman dari JavaScript nakal.'),
        ],
      }),
      conceptStep({
        title: t('Kenapa Tidak Satu Token Saja?'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'keseimbangan-token' },
        alt: t('Kombinasi umur pendek dan refresh token menyeimbangkan kenyamanan pengguna dan keamanan.'),
        body: [
          rText('Jika satu JWT berlaku 30 hari dan bocor, penyerang bebas masuk sebulan penuh. Sebaliknya, jika hanya berumur 15 menit tanpa '),
          rTerm('refresh-token', 'refresh token'),
          rText(', pengguna harus mengetik sandi terus setiap 15 menit.'),
        ],
      }),
      limitStep({
        analogy: t('Gelang masuk harian dan kartu member'),
        same: [
          t('Gelang dipakai terus di area acara (setiap request); kartu member hanya dikeluarkan di loket saat gelang baru dibutuhkan.'),
        ],
        different: [
          t('Di web, proses menukar refresh token terjadi otomatis di balik layar aplikasi lewat interceptor tanpa pengguna berjalan ke loket.'),
          t('Refresh token dicatat oleh server sehingga masih bisa dicabut paksa kalau akun diblokir atau pengguna menekan Logout dari semua perangkat.'),
        ],
      }),
      simStep(
        'pembaca-gelang-jwt',
        t('Amati gelang access token pada simulator dan ingat mengapa gelang tersebut sengaja dibuat berumur pendek.'),
      ),
      qStep(
        makeMcq({
          id: 'b07-l04-q1',
          type: 'analogy',
          prompt: t('Dalam analogi acara, kartu member yang hanya ditunjukkan di loket khusus untuk mendapat gelang harian baru menggambarkan…'),
          choices: [
            { id: 'ref', label: t('Refresh token') },
            {
              id: 'acc',
              label: t('Access token'),
              explainWrong: t('Access token adalah gelang masuk harian yang selalu dipakai setiap request.'),
            },
            {
              id: 'css',
              label: t('Poster acara'),
              explainWrong: t('Kartu member khusus menukar akses baru itu refresh token.'),
            },
          ],
          answer: 'ref',
          explainCorrect: t('Benar! Refresh token jarang dikirim dan hanya dipakai meminta access token baru.'),
          tags: ['refresh-token'],
        }),
      ),
      qStep({
        id: 'b07-l04-q2',
        type: 'order',
        prompt: t('Urutkan kejadian saat access token kedaluwarsa ketika pengguna membuka halaman profil:'),
        difficulty: 2,
        items: [
          { id: 's3', label: t('Aplikasi mengirim POST /refresh membawa refresh token') },
          { id: 's1', label: t('Aplikasi mengirim GET /profil dengan access token lama') },
          { id: 's4', label: t('Aplikasi mengulang GET /profil dengan access token baru → 200 OK') },
          { id: 's2', label: t('Server membalas 401 karena access token sudah kedaluwarsa') },
        ],
        answer: ['s1', 's2', 's3', 's4'],
        explainCorrect: t('Tepat! Pengguna hampir tidak merasakan jeda karena pembaruan token berjalan otomatis di latar belakang.'),
        tags: ['refresh-token', 'status-code'],
      }),
      qStep(
        makeTf({
          id: 'b07-l04-q3',
          prompt: t('Agar praktis, access token dan refresh token sama-sama dikirim dalam setiap request GET daftar produk.'),
          answer: false,
          explainCorrect: t('Benar, itu keliru! Hanya access token yang ikut setiap request; refresh token hanya dikirim saat memperbarui token.'),
          explainWrong: t('Mengirim refresh token di setiap request justru memperbesar risiko pencurian di jalan.'),
          tags: ['refresh-token'],
        }),
      ),
      qStep({
        id: 'b07-l04-q4',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi praktik terbaik penyimpanan token jangka panjang di browser agar tidak terbaca JavaScript:'),
        template: 'Simpan ___ di dalam cookie bertanda ___ agar lebih aman dari skrip berbahaya.',
        bank: ['refresh token', 'HttpOnly', 'query URL', 'CSS'],
        answer: ['refresh token', 'HttpOnly'],
        explainCorrect: t('Mantap! Cookie HttpOnly mencegah JavaScript membaca refresh token langsung.'),
        tags: ['refresh-token', 'cookie-cache'],
      }),
      qStep(
        makeMcq({
          id: 'b07-l04-q5',
          type: 'limit',
          analogy: t('Gelang harian dan kartu member'),
          prompt: t('Hal apa yang membedakan refresh token digital dari kartu member kertas di loket?'),
          choices: [
            { id: 'auto', label: t('Penukaran token terjadi otomatis oleh kode aplikasi dan server bisa mencabut refresh token kapan saja') },
            {
              id: 'short',
              label: t('Gelang harian berumur lebih pendek daripada kartu member'),
              explainWrong: t('Ini kesamaan antara access token dan gelang harian.'),
            },
            {
              id: 'once',
              label: t('Pengguna tidak perlu mendaftar ulang dari awal'),
              explainWrong: t('Keduanya sama-sama menghindarkan pendaftaran ulang.'),
            },
          ],
          answer: 'auto',
          explainCorrect: t('Benar! Pembaruan berjalan senyap di latar belakang dan server tetap mengendalikan pencabutan refresh token.'),
          tags: ['refresh-token', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l04-q6',
          type: 'scenario',
          story: t('Nadia merancang API dengan satu JWT yang masa berlakunya 1 tahun penuh tanpa refresh token agar pengguna tidak perlu login lagi.'),
          prompt: t('Risiko keamanan terbesar dari desain Nadia adalah…'),
          choices: [
            { id: 'leak', label: t('Jika token dicuri sekali saja, pencuri bisa mengakses akun korban hingga 1 tahun tanpa mudah dicabut') },
            {
              id: 'slow',
              label: t('Browser akan melambat membuka gambar PNG'),
              explainWrong: t('Masalahnya pada keamanan masa berlaku token yang terlalu lama.'),
            },
            {
              id: 'json',
              label: t('JSON tidak menerima angka tahun'),
              explainWrong: t('JSON tentu menerima angka epoch.'),
            },
          ],
          answer: 'leak',
          explainCorrect: t('Tepat! Karena itu access token dibuat berumur pendek (mis. 15 menit) dan dipasangkan dengan refresh token.'),
          tags: ['refresh-token', 'jwt'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b07-l04-r1',
        prompt: t('Mana token yang dibuat berumur pendek (misal 15 menit) dan ikut dikirim di setiap request API?'),
        choices: [
          { id: 'acc', label: t('Access token') },
          { id: 'ref', label: t('Refresh token'), explainWrong: t('Refresh token berumur panjang dan hanya dipakai ke endpoint /refresh.') },
        ],
        answer: 'acc',
        explainCorrect: t('Access token berumur singkat sehingga dampak bila bocor lebih kecil.'),
        tags: ['refresh-token'],
      }),
      makeTf({
        id: 'b07-l04-r2',
        prompt: t('Refresh token sebaiknya disimpan di cookie HttpOnly bukan di localStorage.'),
        answer: true,
        explainCorrect: t('Betul! HttpOnly melindungi refresh token agar tidak bisa diambil kode JavaScript jika terjadi XSS.'),
        explainWrong: t('Cookie HttpOnly jauh lebih aman daripada localStorage untuk refresh token.'),
        tags: ['refresh-token', 'cookie-cache'],
      }),
    ],
    recap: t('Gabungkan access token berumur pendek untuk request harian dengan refresh token yang aman di cookie HttpOnly.'),
  }),

  makeLesson({
    id: 'b07-l05',
    worldId: 'b07',
    title: 'OAuth: kunci valet',
    modes: ['pro'],
    objective: t('Aku memahami peran pemain OAuth 2.0, alur Authorization Code + PKCE, scope terbatas, serta OpenID Connect.'),
    estMinutes: 6,
    introducesTerms: ['oauth'],
    usesTerms: ['autentikasi', 'jwt', 'refresh-token', 'server', 'browser', 'api'],
    stickerId: 'kunci-valet',
    warmupFrom: 'b07-l04',
    steps: [
      storyStep('b07/kunci-valet.svg', [
        rText('Beberapa mobil mewah punya kunci valet untuk petugas parkir: hanya bisa menyalakan mesin dan menyetir pelan, tidak bisa membuka bagasi atau laci. OAuth 2.0 memberi aplikasi "kunci valet" agar tidak pernah meminta kata sandimu!'),
      ]),
      conceptStep({
        title: t('Empat Pemain & Scope OAuth 2.0'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'pemain-oauth' },
        alt: t('Resource owner, Client, Authorization server, Resource server, dan Scope izin.'),
        body: [
          rTerm('oauth', 'OAuth 2.0'),
          rText(' melibatkan Resource owner (kamu), Client (aplikasi peminta), Authorization server (pemberi izin), dan Resource server (penyimpan data). '),
          rCode('Scope'),
          rText(' adalah daftar izin terbatas seperti '),
          rCode('email'),
          rText(' atau '),
          rCode('profile'),
          rText(', bukan akses seluruh akun.'),
        ],
      }),
      conceptStep({
        title: t('Authorization Code + PKCE'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b07', topic: 'oauth-pkce' },
        alt: t('Diarahkan ke halaman resmi, login di penyedia, izinkan scope, dapat kode, lalu tukar dengan bukti PKCE.'),
        body: [
          rText('Pada alur yang dianjurkan: 1) Diarahkan ke halaman resmi penyedia, 2) Login di penyedia resmi (bukan di aplikasi peminta), 3) Kamu setujui scope, 4) Kembali dengan kode sekali pakai, 5) Kode ditukar token disertai bukti acak '),
          rCode('PKCE'),
          rText(' ("pixy") agar kode curian tak bisa ditukar.'),
        ],
      }),
      conceptStep({
        title: t('OpenID Connect (OIDC) & Library Teruji'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'oidc-login' },
        alt: t('OIDC menambah ID Token JWT di atas OAuth 2.0 untuk tombol Masuk dengan penyedia resmi.'),
        body: [
          rText('OAuth aslinya untuk izin akses data, bukan login. '),
          rCode('OpenID Connect'),
          rText(' menambah '),
          rCode('ID token'),
          rText(' (JWT berisi siapa kamu) di atas OAuth untuk tombol "Masuk dengan Akun Lain". Jangan bangun OAuth dari nol; pakailah layanan atau library teruji seperti Auth.js atau Supabase Auth.'),
        ],
      }),
      limitStep({
        analogy: t('Kunci valet mobil mewah'),
        same: [
          t('Memberi hak pakai terbatas (scope) tanpa menyerahkan kunci utama (kata sandi).'),
        ],
        different: [
          t('Kunci valet fisik diberikan langsung oleh pemilik mobil; di OAuth, pemilik memberi persetujuan di Authorization server resmi lalu Client mendapat token setelah pertukaran kode + PKCE.'),
        ],
      }),
      simStep(
        'pembaca-gelang-jwt',
        t('Amati ID token JWT pada simulator yang diberikan setelah alur OAuth/OIDC selesai.'),
      ),
      qStep(
        makeMcq({
          id: 'b07-l05-q1',
          type: 'analogy',
          prompt: t('Mengapa OAuth 2.0 disebut mirip dengan kunci valet mobil?'),
          choices: [
            { id: 'lim', label: t('Aplikasi hanya mendapat akses terbatas (scope) tanpa pernah mengetahui kata sandi aslimu') },
            {
              id: 'all',
              label: t('Karena aplikasi mendapat kunci utama agar bisa mengedit seluruh isi akunmu'),
              explainWrong: t('Justru OAuth mencegah pemberian akses penuh dan kata sandi.'),
            },
            {
              id: 'car',
              label: t('Karena OAuth hanya berjalan di browser mobil'),
              explainWrong: t('OAuth dipakai di web dan aplikasi mobile secara umum.'),
            },
          ],
          answer: 'lim',
          explainCorrect: t('Tepat! Scope membatasi apa yang boleh dilakukan aplikasi pihak ketiga, persis seperti kunci valet.'),
          tags: ['oauth'],
        }),
      ),
      qStep({
        id: 'b07-l05-q2',
        type: 'match',
        prompt: t('Pasangkan peran pemain OAuth 2.0 dengan contoh nyatanya saat kamu masuk ke aplikasi kuis memakai akun Toko Rani:'),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('Resource owner') },
          { id: 'l2', label: t('Client') },
          { id: 'l3', label: t('Authorization server') },
          { id: 'l4', label: t('Scope') },
        ],
        right: [
          { id: 'r1', label: t('Kamu sebagai pemilik akun') },
          { id: 'r2', label: t('Aplikasi kuis yang meminta izin') },
          { id: 'r3', label: t('Layanan login yang memeriksa identitas dan minta persetujuan') },
          { id: 'r4', label: t('Daftar izin terbatas seperti email dan profile') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
        explainCorrect: t('Hebat! Memahami keempat pemain membuat alur OAuth selalu masuk akal.'),
        tags: ['oauth'],
      }),
      qStep({
        id: 'b07-l05-q3',
        type: 'order',
        prompt: t('Urutkan 5 langkah alur OAuth Authorization Code + PKCE yang benar:'),
        difficulty: 3,
        items: [
          { id: 's4', label: t('Penyedia mengembalikan pengguna ke aplikasi membawa kode sekali pakai') },
          { id: 's2', label: t('Pengguna mengetik kata sandi di halaman resmi penyedia') },
          { id: 's5', label: t('Aplikasi menukar kode + bukti PKCE dengan access token (+ ID token)') },
          { id: 's1', label: t('Aplikasi mengarahkan browser ke halaman resmi penyedia') },
          { id: 's3', label: t('Pengguna melihat scope yang diminta lalu menekan Izinkan') },
        ],
        answer: ['s1', 's2', 's3', 's4', 's5'],
        explainCorrect: t('Sempurna! Kata sandi hanya pernah diketik di halaman resmi penyedia, bukan di aplikasi kuis.'),
        tags: ['oauth', 'browser'],
      }),
      qStep(
        makeMcq({
          id: 'b07-l05-q4',
          type: 'why',
          base: 'Tombol "Masuk dengan Akun Penyedia" menggunakan OpenID Connect (OIDC) di atas OAuth 2.0.',
          prompt: t('Mengapa OAuth 2.0 saja perlu ditambah lapisan OpenID Connect untuk kebutuhan login?'),
          choices: [
            { id: 'id', label: t('Karena OAuth aslinya untuk izin akses data, sedangkan OIDC menambahkan ID token (JWT) yang menyatakan identitas siapa penggunanya') },
            {
              id: 'css',
              label: t('Karena OAuth tidak punya warna tombol resmi'),
              explainWrong: t('OIDC bukan soal warna tombol, melainkan standar ID token identitas.'),
            },
            {
              id: 'db',
              label: t('Karena OAuth tidak bekerja lewat HTTPS'),
              explainWrong: t('OAuth 2.0 selalu mensyaratkan HTTPS.'),
            },
          ],
          answer: 'id',
          explainCorrect: t('Benar! OIDC melengkapi OAuth dengan ID token berformat JWT untuk autentikasi pengguna.'),
          tags: ['oauth', 'jwt', 'autentikasi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l05-q5',
          type: 'limit',
          analogy: t('Kunci valet mobil'),
          prompt: t('Mengapa pengembang aplikasi dianjurkan memakai library atau layanan auth teruji daripada merakit OAuth sendiri dari nol?'),
          choices: [
            { id: 'sec', label: t('Keamanan login dan PKCE punya banyak detail halus yang sangat mudah salah bila ditulis manual') },
            {
              id: 'ban',
              label: t('Karena OAuth melarang pembuatan kode server'),
              explainWrong: t('Boleh dibuat, tetapi sangat berisiko salah implementasi keamanan.'),
            },
            {
              id: 'slow',
              label: t('Karena kunci valet tidak bekerja di malam hari'),
              explainWrong: t('Tentu bukan itu alasannya.'),
            },
          ],
          answer: 'sec',
          explainCorrect: t('Tepat! Gunakan layanan/library teruji seperti Auth.js, Clerk, Supabase Auth, atau Firebase Auth.'),
          tags: ['oauth', 'autentikasi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l05-q6',
          type: 'scenario',
          story: t('Sebuah situs game kecil menampilkan formulir berlogo penyedia login, lalu meminta kamu mengetik langsung email dan kata sandi akun utamamu di kolom situs game itu sendiri.'),
          prompt: t('Mengapa alur tersebut berbahaya dan BUKAN cara kerja OAuth yang benar?'),
          choices: [
            { id: 'phish', label: t('Di OAuth, pengguna selalu diarahkan login di domain resmi penyedia, bukan mengetik sandi di situs aplikasi') },
            {
              id: 'fast',
              label: t('Karena mengetik sandi di situs game terlalu cepat'),
              explainWrong: t('Masalahnya adalah situs game bisa mencuri kata sandi utamamu.'),
            },
            {
              id: 'json',
              label: t('Karena kata sandi seharusnya berformat XML'),
              explainWrong: t('Ini soal di mana kata sandi diketik dan dipercaya.'),
            },
          ],
          answer: 'phish',
          explainCorrect: t('Keren! Selalu pastikan halaman login berada di domain resmi penyedia identitas, bukan formulir tiruan aplikasi.'),
          tags: ['oauth', 'autentikasi'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b07-l05-r1',
        prompt: t('Dalam OAuth 2.0, daftar izin terbatas yang diminta aplikasi (misal hanya baca nama & email) disebut…'),
        choices: [
          { id: 'sc', label: t('Scope') },
          { id: 'pk', label: t('Body HTML'), explainWrong: t('Daftar izin di OAuth disebut scope.') },
        ],
        answer: 'sc',
        explainCorrect: t('Scope membatasi hak apa saja yang diizinkan pengguna untuk diakses aplikasi.'),
        tags: ['oauth'],
      }),
      makeTf({
        id: 'b07-l05-r2',
        prompt: t('Pada alur OAuth Authorization Code + PKCE yang benar, aplikasi peminta tidak pernah menerima kata sandi asli milik pengguna.'),
        answer: true,
        explainCorrect: t('Betul! Pengguna login langsung di server penyedia dan aplikasi hanya menerima kode lalu menukarnya menjadi token.'),
        explainWrong: t('Justru itulah alasan utama diciptakannya OAuth 2.0.'),
        tags: ['oauth'],
      }),
    ],
    recap: t('OAuth 2.0 memberi akses berbatas scope lewat Authorization Code + PKCE tanpa pernah membocorkan kata sandi pengguna.'),
  }),
];
