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
  id: 'b08',
  track: 'B',
  order: 8,
  title: 'Satpam API',
  tagline: t(
    'Menjaga antrean wahana bermain dan menelepon server dengan sopan.',
    'Memahami CORS & preflight, rate limiting (429), retry + exponential backoff, idempotency key, dan OWASP API Top 10.',
  ),
  color: '#D23B2A',
  illustration: 'b08-satpam-api',
  sourceChapters: ['J2-13'],
  requires: ['b07'],
  lessons: ['b08-l01', 'b08-l02', 'b08-l03', 'b08-l04', 'b08-l05'],
  sideQuests: [],
  boss: {
    title: 'Tantangan Penjaga Pos Satpam',
    greeting: t(
      'Halo! Mari cek apakah kamu bisa antre dengan tertib dan menelepon server dengan sopan!',
      'Tunjukkan penguasaanmu menjaga keamanan dan ketahanan API: CORS, rate limit, backoff, idempotency key, dan OWASP API.',
    ),
    guardianName: 'Penjaga Pos Satpam',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'b08-anc-j1',
        prompt: t('Jika kita mengetuk pintu API terlalu cepat melebihi jatah menit ini, jawaban server adalah…'),
        choices: [
          { id: 'c429', label: t('429 (Terlalu banyak permintaan)'), explainWrong: t('Benar!') },
          {
            id: 'c200',
            label: t('200 (Berhasil terus tanpa batas)'),
            explainWrong: t('Server punya batas jatah agar tetap adil dan aman.'),
          },
          {
            id: 'c404',
            label: t('404 (Halaman hilang)'),
            explainWrong: t('404 berarti alamat tidak ada, bukan antrean penuh.'),
          },
        ],
        answer: 'c429',
        explainCorrect: t('429 Too Many Requests memberi tahu bahwa jatah permintaan sementara sudah habis.'),
        tags: ['rate-limit', 'status-code'],
      }),
      makeAnchorMcq({
        id: 'b08-anc-j2',
        prompt: t('Petunjuk waktu kapan kamu boleh mencoba menelepon server lagi disebut header…'),
        choices: [
          { id: 'ra', label: t('Retry-After'), explainWrong: t('Tepat!') },
          {
            id: 'css',
            label: t('Margin-Top'),
            explainWrong: t('Margin mengatur jarak di CSS.'),
          },
          {
            id: 'html',
            label: t('Doctype'),
            explainWrong: t('Doctype adalah pembuka file HTML.'),
          },
        ],
        answer: 'ra',
        explainCorrect: t('Retry-After memberi tahu berapa detik lagi sebelum mencoba ulang.'),
        tags: ['rate-limit', 'header-body'],
      }),
      makeAnchorMcq({
        id: 'b08-anc-j3',
        prompt: t('Cara mencoba ulang yang sopan saat server sedang sibuk adalah…'),
        choices: [
          {
            id: 'wait',
            label: t('Menunggu jeda makin lama: 1 detik, 2 detik, lalu 4 detik'),
            explainWrong: t('Benar!'),
          },
          {
            id: 'spam',
            label: t('Menekan tombol kirim 100 kali per detik'),
            explainWrong: t('Mengirim tanpa jeda justru membuat server makin macet.'),
          },
          {
            id: 'del',
            label: t('Menghapus browser'),
            explainWrong: t('Cukup tunggu jeda lebih lama sebelum mencoba lagi.'),
          },
        ],
        answer: 'wait',
        explainCorrect: t('Exponential backoff memberi waktu bagi server untuk pulih sebelum menerima panggilan baru.'),
        tags: ['backoff'],
      }),
      makeAnchorMcq({
        id: 'b08-anc-j4',
        prompt: t('Kesalahan mana yang percuma diulang otomatis karena isinya memang salah alamat?'),
        choices: [
          { id: 'c404', label: t('404 Halaman tidak ditemukan'), explainWrong: t('Tepat!') },
          {
            id: 'net',
            label: t('Sinyal internet terputus sebentar'),
            explainWrong: t('Putus jaringan sementara masih wajar dicoba ulang.'),
          },
          {
            id: 'c503',
            label: t('503 Server sedang sibuk sementara'),
            explainWrong: t('503 bersifat sementara dan boleh di-retry dengan backoff.'),
          },
        ],
        answer: 'c404',
        explainCorrect: t('400, 401, 403, dan 404 akan memberi jawaban salah yang sama bila diulang begitu saja.'),
        tags: ['backoff', 'status-code'],
      }),
      makeAnchorMcq({
        id: 'b08-anc-j5',
        prompt: t('Mengapa aturan batas antrean dipasang di wahana bermain dan API server?'),
        choices: [
          {
            id: 'fair',
            label: t('Supaya mesin tidak kewalahan dan semua orang kebagian adil'),
            explainWrong: t('Benar!'),
          },
          {
            id: 'dark',
            label: t('Agar warna layar menjadi gelap'),
            explainWrong: t('Rate limit soal jumlah permintaan, bukan tema gelap.'),
          },
          {
            id: 'off',
            label: t('Supaya internet dimatikan selamanya'),
            explainWrong: t('Pembatasan hanya sementara sesuai jatah per periode.'),
          },
        ],
        answer: 'fair',
        explainCorrect: t('Rate limit melindungi server agar tetap cepat dan adil bagi seluruh pengguna.'),
        tags: ['rate-limit'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'b08-anc-p1',
        prompt: t('Ketika browser memblokir fetch karena kebijakan CORS, di mana perbaikan yang tepat harus dilakukan?'),
        choices: [
          { id: 'srv', label: t('Di server API tujuan dengan mengirim header Access-Control-Allow-Origin yang sesuai') },
          { id: 'fe', label: t('Di kode JavaScript frontend dengan menonaktifkan Same-Origin Policy') },
          { id: 'css', label: t('Dengan memindahkan request ke file CSS') },
        ],
        answer: 'srv',
        explainCorrect: t('Browser hanya mematuhi header izin dari server; CORS tidak bisa dipaksa lewat kode JavaScript frontend.'),
        tags: ['cors'],
      }),
      makeAnchorMcq({
        id: 'b08-anc-p2',
        prompt: t('Method apa yang dikirim browser secara otomatis pada tahap preflight CORS sebelum DELETE atau PUT?'),
        choices: [
          { id: 'opt', label: t('OPTIONS') },
          { id: 'head', label: t('HEAD') },
          { id: 'patch', label: t('PATCH') },
        ],
        answer: 'opt',
        explainCorrect: t('Preflight memakai request OPTIONS untuk menanyakan izin method dan header ke server.'),
        tags: ['cors', 'http-method'],
      }),
      makeAnchorMcq({
        id: 'b08-anc-p3',
        prompt: t('Apa tujuan menambahkan sedikit waktu acak (jitter) pada jadwal retry exponential backoff?'),
        choices: [
          { id: 'thund', label: t('Mencegah ribuan klien yang gagal bersamaan mengetuk ulang server pada detik yang sama persis') },
          { id: 'enc', label: t('Mengenkripsi payload JSON menjadi Protobuf') },
          { id: 'jwt', label: t('Memperpanjang umur JWT di localStorage') },
        ],
        answer: 'thund',
        explainCorrect: t('Jitter menyebar waktu retry antar klien agar server yang baru pulih tidak langsung dihantam serentak.'),
        tags: ['backoff'],
      }),
      makeAnchorMcq({
        id: 'b08-anc-p4',
        prompt: t('Masalah apa yang diselesaikan oleh header Idempotency-Key saat melakukan POST pembayaran?'),
        choices: [
          { id: 'dup', label: t('Mencegah tagihan terproses dua kali ketika jaringan putus dan klien mengirim ulang request yang sama') },
          { id: 'cors', label: t('Mengizinkan semua domain mengakses API tanpa preflight') },
          { id: 'ui', label: t('Membuat font halaman otomatis responsif') },
        ],
        answer: 'dup',
        explainCorrect: t('Server menyimpan kunci nota transaksi sehingga pengulangan dengan Idempotency-Key identik mengembalikan hasil awal.'),
        tags: ['idempotency-key', 'idempotent'],
      }),
      makeAnchorMcq({
        id: 'b08-anc-p5',
        prompt: t('Seorang pengguna mengganti URL /pesanan/88 menjadi /pesanan/89 dan berhasil melihat pesanan milik pembeli lain. Celah OWASP apakah ini?'),
        choices: [
          { id: 'bola', label: t('Broken Object Level Authorization (BOLA / IDOR)') },
          { id: 'cors', label: t('Preflight CORS') },
          { id: 'sse', label: t('Server-Sent Events') },
        ],
        answer: 'bola',
        explainCorrect: t('Pada BOLA/IDOR, server lupa memeriksa apakah objek dengan ID tersebut benar milik pengguna yang login.'),
        tags: ['bola-idor'],
      }),
      makeAnchorMcq({
        id: 'b08-anc-p6',
        type: 'limit',
        analogy: t('Satpam apartemen sendiri untuk CORS'),
        prompt: t('Mengapa mengira CORS adalah sistem keamanan utama API merupakan kesalahan berbahaya?'),
        choices: [
          { id: 'post', label: t('CORS hanya membatasi browser; penyerang tetap bisa memanggil API langsung lewat Postman, curl, atau server lain') },
          { id: 'opt', label: t('Browser mengirim preflight OPTIONS sebelum request berisiko') },
          { id: 'hdr', label: t('Server memakai Access-Control-Allow-Origin untuk memberi izin origin') },
        ],
        answer: 'post',
        explainCorrect: t('CORS melindungi pengguna di browser, bukan pengaman API. API tetap wajib memeriksa token login dan otorisasi di server.'),
        tags: ['cors', 'autentikasi'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'b08-l01',
    worldId: 'b08',
    title: 'CORS: satpam di browser',
    modes: ['pro'],
    objective: t('Aku bisa membaca error CORS, memahami origin & preflight OPTIONS, serta memperbaikinya dengan aman di server.'),
    estMinutes: 6,
    introducesTerms: ['cors'],
    usesTerms: ['browser', 'server', 'domain', 'header-body', 'http-method', 'api', 'autentikasi'],
    stickerId: 'satpam-apartemen',
    warmupFrom: 'b07-l05',
    steps: [
      storyStep('b08/satpam-apartemen.svg', [
        rText('Kamu tinggal di apartemen A dan ingin mengambil paket di apartemen B. Satpammu sendiri (browser) menelepon pengelola B: "Penghuni A boleh ambil paket?" Jika B tidak memberi izin, satpammu sendiri yang menahanmu!'),
      ]),
      conceptStep({
        title: t('Origin & Same-Origin Policy'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'origin-policy' },
        alt: t('Origin adalah gabungan protokol + domain + port; Same-Origin Policy membatasi bacaan antar origin.'),
        code: {
          lang: 'text',
          code: 'Origin 1: https://toko-rani.example\nOrigin 2: https://api.toko-lain.example\n→ Origin berbeda! Browser cek izin CORS.',
        },
        body: [
          rCode('Origin'),
          rText(' adalah gabungan protokol + domain + port. Berkat Same-Origin Policy, JavaScript dari satu origin dilarang membaca jawaban dari origin lain kecuali diizinkan lewat '),
          rTerm('cors', 'CORS'),
          rText(' (header '),
          rCode('Access-Control-Allow-Origin'),
          rText(').'),
        ],
      }),
      conceptStep({
        title: t('Preflight: Telepon Sebelum Datang'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b08', topic: 'cors-preflight' },
        alt: t('Browser mengirim OPTIONS preflight sebelum mengirim DELETE /produk/12 ke API origin lain.'),
        code: {
          lang: 'text',
          code: '1. Browser → API: OPTIONS (boleh DELETE dari toko-rani.example?)\n2. API → Browser: Boleh! Allow-Origin & Allow-Methods\n3. Browser → API: DELETE /produk/12 → 204',
        },
        body: [
          rText('Untuk request berisiko seperti '),
          rCode('PUT'),
          rText('/'),
          rCode('DELETE'),
          rText(' atau yang membawa header '),
          rCode('Authorization'),
          rText(' / JSON, browser mengirim request '),
          rCode('OPTIONS'),
          rText(' (preflight) lebih dulu sebelum permintaan asli.'),
        ],
      }),
      conceptStep({
        title: t('Tiga Fakta Wajib Tentang CORS'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'tiga-fakta-cors' },
        alt: t('CORS diperbaiki di server, hanya berlaku di browser, dan bukan pengaman API.'),
        body: [
          rText('Ingat: (1) CORS diperbaiki di server, bukan frontend; (2) CORS hanya berlaku di browser sehingga tetap jalan di Postman; (3) Jangan asal memasang '),
          rCode('Access-Control-Allow-Origin: *'),
          rText(' di API yang memakai login—izinkan domain sendiri saja atau pakai proxy Vite/Next.js saat dev.'),
        ],
      }),
      limitStep({
        analogy: t('Satpam apartemen A menelepon pengelola B'),
        same: [
          t('Yang mencegat adalah satpam di sisi kita sendiri (browser), dan izin tetap harus datang dari pihak tujuan (server API).'),
        ],
        different: [
          t('CORS hanya ada di dalam browser; orang yang memakai Postman atau server lain langsung mengetuk API B tanpa melewati satpam browser A.'),
          t('Karena itu CORS bukan pengganti autentikasi dan otorisasi di API.'),
        ],
      }),
      simStep(
        'satpam-cors',
        t('Ubah origin peminta pada simulator antara toko-rani.example dan situs-lain.example untuk melihat aksi satpam browser!'),
      ),
      qStep(
        makeMcq({
          id: 'b08-l01-q1',
          type: 'analogy',
          prompt: t('Dalam analogi apartemen, siapakah satpam yang benar-benar menahan request jika tidak ada header Access-Control-Allow-Origin?'),
          choices: [
            { id: 'brw', label: t('Browser milik pengguna sendiri (Apartemen A)') },
            {
              id: 'css',
              label: t('File CSS yang sedang dimuat'),
              explainWrong: t('CSS tidak mengatur kebijakan keamanan jaringan.'),
            },
            {
              id: 'dns',
              label: t('Buku kontak DNS'),
              explainWrong: t('DNS hanya mencocokkan nama domain ke alamat IP.'),
            },
          ],
          answer: 'brw',
          explainCorrect: t('Benar! Browser menegakkan Same-Origin Policy agar situs asing tidak sembarangan membaca data dari origin lain.'),
          tags: ['cors', 'browser'],
        }),
      ),
      qStep({
        id: 'b08-l01-q2',
        type: 'order',
        prompt: t('Urutkan proses yang dilakukan browser saat mengirim DELETE /produk/12 ke API berbeda origin:'),
        difficulty: 2,
        items: [
          { id: 's3', label: t('Browser mengirim request DELETE /produk/12 yang sebenarnya') },
          { id: 's1', label: t('Browser mengirim preflight OPTIONS menanyakan izin method & origin') },
          { id: 's4', label: t('API menjawab 204 disertai header Access-Control-Allow-Origin') },
          { id: 's2', label: t('API menjawab preflight dengan daftar origin dan method yang diizinkan') },
        ],
        answer: ['s1', 's2', 's3', 's4'],
        explainCorrect: t('Tepat! Preflight OPTIONS selalu mendahului request berisiko lintas origin.'),
        tags: ['cors', 'http-method'],
      }),
      qStep({
        id: 'b08-l01-q3',
        type: 'spotbug',
        difficulty: 2,
        prompt: t('Ketuk baris konfigurasi server API pembayaran ber-login yang terlalu longgar dan berbahaya:'),
        lines: [
          'app.use((req, res, next) => {',
          '  res.setHeader("Access-Control-Allow-Origin", "*");',
          '  res.setHeader("Access-Control-Allow-Methods", "GET,POST");',
          '  next();',
          '});',
        ],
        answer: [2],
        explainCorrect: t('Tepat! Baris 2 mengizinkan semua origin (*) pada API ber-login; seharusnya sebutkan origin spesifik seperti https://toko-rani.example saja.'),
        tags: ['cors', 'server'],
      }),
      qStep(
        makeTf({
          id: 'b08-l01-q4',
          prompt: t('Jika API berhasil dipanggil lewat Postman tetapi gagal di browser dengan error CORS, berarti server API-nya sedang mati.'),
          answer: false,
          explainCorrect: t('Benar, itu keliru! Server hidup (terbukti jalan di Postman), hanya belum mengirim header izin CORS untuk origin browsermu.'),
          explainWrong: t('CORS hanya berlaku di browser; Postman tidak dibatasi kebijakan Same-Origin Policy.'),
          tags: ['cors', 'browser'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l01-q5',
          type: 'limit',
          analogy: t('Satpam apartemen browser'),
          prompt: t('Apa batas keamanan penting dari CORS yang tidak boleh disalahpahami oleh developer?'),
          choices: [
            { id: 'notsec', label: t('CORS bukan pengaman API karena alat non-browser seperti curl dan Postman dapat memanggil API tanpa dicek satpam browser') },
            {
              id: 'orig',
              label: t('Origin terdiri dari protokol, domain, dan port'),
              explainWrong: t('Itu memang definisi origin yang benar.'),
            },
            {
              id: 'srv',
              label: t('Izin CORS dikirim melalui header HTTP dari server'),
              explainWrong: t('Itu memang cara kerja CORS.'),
            },
          ],
          answer: 'notsec',
          explainCorrect: t('Tepat! API tetap wajib memverifikasi token dan otorisasi di server, bukan mengandalkan CORS.'),
          tags: ['cors', 'autentikasi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l01-q6',
          type: 'scenario',
          story: t('Bito mendapati fetch dari https://toko-rani.example ke https://api.toko-rani.example gagal dengan pesan "No Access-Control-Allow-Origin header is present".'),
          prompt: t('Langkah perbaikan yang benar adalah…'),
          choices: [
            { id: 'srv', label: t('Konfigurasikan header Access-Control-Allow-Origin: https://toko-rani.example di server api.toko-rani.example') },
            {
              id: 'fe',
              label: t('Menambahkan kode try/catch di JavaScript frontend agar browser mengabaikan CORS'),
              explainWrong: t('try/catch tidak bisa menonaktifkan aturan keamanan browser.'),
            },
            {
              id: 'css',
              label: t('Mengubah method POST menjadi CSS'),
              explainWrong: t('Tidak ada method HTTP bernama CSS.'),
            },
          ],
          answer: 'srv',
          explainCorrect: t('Benar! Karena subdomain api.toko-rani.example berbeda origin dengan toko-rani.example, server API harus mengirim header izin.'),
          tags: ['cors', 'domain', 'server'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b08-l01-r1',
        prompt: t('Manakah gabungan komponen yang membentuk sebuah "origin"?'),
        choices: [
          { id: 'ok', label: t('Protokol + domain + port') },
          { id: 'path', label: t('Path + query parameter + warna tema'), explainWrong: t('Path dan query tidak termasuk origin.') },
        ],
        answer: 'ok',
        explainCorrect: t('Jika salah satu dari protokol, domain, atau port berbeda, browser menganggapnya lintas origin.'),
        tags: ['cors', 'domain'],
      }),
      makeTf({
        id: 'b08-l01-r2',
        prompt: t('Error CORS pada aplikasi web diperbaiki dengan mengubah kode di sisi server API, bukan di browser.'),
        answer: true,
        explainCorrect: t('Betul! Server yang harus menyatakan origin mana saja yang diizinkan.'),
        explainWrong: t('Browser hanya menaati header izin yang dikirim oleh server.'),
        tags: ['cors', 'server'],
      }),
    ],
    recap: t('CORS adalah aturan satpam browser lintas origin; perbaikannya di header server dan jangan pernah menganggapnya pengaman API.'),
  }),

  makeLesson({
    id: 'b08-l02',
    worldId: 'b08',
    title: 'Rate limit: wahana bermain',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku paham kenapa server membatasi jumlah permintaan dan arti kode 429.',
      'Aku bisa menjelaskan tujuan rate limiting, kode 429 Too Many Requests, serta membaca header kuotanya.',
    ),
    estMinutes: 5,
    introducesTerms: ['rate-limit'],
    usesTerms: ['api', 'server', 'status-code', 'header-body'],
    stickerId: 'wahana-bermain',
    warmupFrom: 'b08-l01',
    steps: [
      storyStep('b08/wahana-bermain.svg', [
        rText(
          'Wahana di taman bermain hanya boleh dinaiki 3 kali per jam per pengunjung. Datang keempat kalinya, petugas bilang: "Nanti lagi ya, 20 menit lagi!"',
          'Rate limiting bekerja persis seperti jatah naik wahana taman bermain: membatasi jumlah request per pengguna dalam satu rentang waktu supaya semua kebagian adil.',
        ),
      ]),
      conceptStep({
        title: t('Apa Itu Rate Limit?', 'Tujuan Rate Limiting'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'rate-limit-wahana' },
        alt: t('Batas maksimal permintaan per menit menjaga server tetap lancar dan adil.'),
        body: [
          rTerm('rate-limit', 'Rate limit', 'Rate limiting'),
          rText(
            ' membatasi jumlah permintaan dalam waktu tertentu. Tujuannya agar server tetap lancar dan adil untuk semua.',
            ' membatasi berapa request yang boleh masuk per periode (misal 100/menit) agar server tidak kewalahan dan jatah terbagi adil.',
          ),
        ],
      }),
      conceptStep({
        title: t('Kode 429 dan Header Sisa', 'Membaca 429 & Header Kuota'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'kode-429-header' },
        alt: t('Respons HTTP 429 Too Many Requests disertai RateLimit-Limit, RateLimit-Remaining, dan Retry-After.'),
        code: {
          lang: 'http',
          code: 'HTTP/1.1 429 Too Many Requests\nRateLimit-Limit: 100\nRateLimit-Remaining: 0\nRetry-After: 30',
        },
        body: [
          rText(
            'Jika melebihi batas, server menjawab dengan kode 429. Ada pesan kapan boleh mencoba lagi, seperti 20 menit lagi.',
            'Saat jatah habis, server mengirim status ',
          ),
          rCode('429 Too Many Requests'),
          rText(' bersama header ', ' disertai header '),
          rCode('RateLimit-Remaining: 0'),
          rText(' dan ', ' serta '),
          rCode('Retry-After'),
          rText('.', ' (detik tunggu).'),
        ],
      }),
      conceptStep({
        title: t('Menahan Penjahat Tebak Sandi', 'Melindungi Login & OTP'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'cegah-tebak-sandi' },
        alt: t('Rate limit menghentikan bot yang mencoba menebak kata sandi ribuan kali.'),
        body: [
          rText(
            'Batas kecepatan juga mencegah orang jahat menebak kata sandi ribuan kali secara cepat.',
            'Selain menjaga kestabilan server, rate limit menahan serangan tebak kata sandi (brute force) pada endpoint login dan mencegah pemborosan biaya SMS OTP.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Jatah naik wahana 3 kali per jam'),
        same: [
          t('Kalau jatah habis, petugas meminta menunggu hingga jatah berikutnya tersedia.'),
          t('Tujuannya mencegah antrean macet dan mesin rusak.'),
        ],
        different: [
          t('API dapat mengenakan batas berbeda per jenis pintu: pintu login lebih ketat, sedangkan pintu melihat katalog lebih longgar.'),
          t('Petunjuk tunggu di API diberikan dalam hitungan detik lewat header Retry-After.'),
        ],
      }),
      simStep(
        'telepon-sopan',
        t(
          'Coba tekan "Tanya Terus Tanpa Jeda" lalu bandingkan dengan jeda sopan di simulator!',
          'Amati bagaimana pengiriman tanpa jeda langsung memicu respons 429 Too Many Requests.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'b08-l02-q1',
          type: 'analogy',
          prompt: t('Ucapan petugas wahana "Nanti lagi ya, tunggu 20 menit!" sama artinya dengan respons server…'),
          choices: [
            { id: '429', label: t('429 Too Many Requests + Retry-After') },
            {
              id: '200',
              label: t('200 OK'),
              explainWrong: t('200 OK berarti diperbolehkan langsung masuk sekarang.'),
            },
            {
              id: '500',
              label: t('500 Mesin meledak'),
              explainWrong: t('500 menandakan bug internal server, bukan batas antrean yang sopan.'),
            },
          ],
          answer: '429',
          explainCorrect: t('Benar! Status 429 dan Retry-After memberi tahu batas habis dan kapan boleh mencoba lagi.'),
          tags: ['rate-limit', 'status-code'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l02-q2',
          prompt: t('Mana salah satu manfaat penting memasang rate limit pada pintu login?'),
          choices: [
            { id: 'sec', label: t('Mencegah penyerang menebak kata sandi ribuan kali per menit') },
            {
              id: 'col',
              label: t('Mengubah warna tombol login menjadi merah'),
              explainWrong: t('Rate limit mengontrol jumlah request, bukan warna UI.'),
            },
            {
              id: 'del',
              label: t('Menghapus akun pengguna yang lupa sandi'),
              explainWrong: t('Rate limit hanya menunda sementara, bukan menghapus akun.'),
            },
          ],
          answer: 'sec',
          explainCorrect: t('Tepat! Membatasi percobaan login menghentikan bot penebak sandi.'),
          tags: ['rate-limit'],
        }),
      ),
      qStep({
        id: 'b08-l02-q3',
        type: 'hotspot',
        difficulty: 1,
        prompt: t('Ketuk baris header respons 429 yang memberi tahu berapa detik lagi aplikasi boleh mencoba ulang!'),
        image: 'b08-hotspot',
        regions: [
          { id: 'status', shape: 'rect', coords: [10, 10, 260, 40], label: 'HTTP/1.1 429 Too Many Requests' },
          { id: 'limit', shape: 'rect', coords: [10, 55, 260, 40], label: 'RateLimit-Limit: 100' },
          { id: 'rem', shape: 'rect', coords: [10, 100, 260, 40], label: 'RateLimit-Remaining: 0' },
          { id: 'retry', shape: 'rect', coords: [10, 145, 260, 40], label: 'Retry-After: 30' },
        ],
        answer: 'retry',
        explainCorrect: t('Tepat! Retry-After: 30 menandakan aplikasi harus menunggu 30 detik sebelum request berikutnya.'),
        tags: ['rate-limit', 'header-body'],
      }),
      qStep(
        makeTf({
          id: 'b08-l02-q4',
          prompt: t('Semua API di dunia selalu memakai nama header RateLimit-Limit yang persis sama tanpa variasi apa pun.'),
          answer: false,
          explainCorrect: t('Betul, itu salah! Ada API yang memakai awalan X-RateLimit- sehingga kita wajib cek dokumentasinya.'),
          explainWrong: t('Hampir! Penamaan header rate limit bisa berbeda antar API (misal X-RateLimit-Remaining).'),
          tags: ['rate-limit', 'header-body'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l02-q5',
          type: 'limit',
          analogy: t('Wahana bermain 3 kali per jam'),
          prompt: t('Apa perbedaan aturan batas API dibanding wahana bermain di taman hiburan?'),
          choices: [
            { id: 'diff', label: t('API bisa memasang batas sangat ketat untuk login/OTP dan batas longgar untuk membaca katalog') },
            {
              id: 'wait',
              label: t('Pengunjung yang melebihi batas diminta menunggu sebentar'),
              explainWrong: t('Keduanya sama-sama meminta menunggu.'),
            },
            {
              id: 'fair',
              label: t('Membagi kesempatan secara adil untuk semua pengunjung'),
              explainWrong: t('Ini kesamaan utama kedua hal tersebut.'),
            },
          ],
          answer: 'diff',
          explainCorrect: t('Benar! Setiap endpoint API punya tingkat risiko dan biaya server yang berbeda sehingga batasnya disesuaikan.'),
          tags: ['rate-limit', 'api'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l02-q6',
          type: 'scenario',
          story: t('Dimas membuat tombol "Cek Cuaca" yang bisa diklik bertubi-tubi. Saat diklik 120 kali dalam semenit, API cuaca menjawab 429 dengan Retry-After: 60.'),
          prompt: t('Apa reaksi aplikasi yang paling tepat saat menerima jawaban itu?'),
          difficulty: 2,
          choices: [
            { id: 'wait', label: t('Hentikan pengiriman selama 60 detik dan beri pesan ramah "Terlalu cepat, coba lagi sebentar"') },
            {
              id: 'loop',
              label: t('Kirim ulang 500 request lagi tanpa jeda agar server menyerah'),
              explainWrong: t('Menyerang balik justru bisa membuat akun Dimas diblokir.'),
            },
            {
              id: 'del',
              label: t('Hapus seluruh halaman website'),
              explainWrong: t('Cukup tahan sebentar sesuai Retry-After.'),
            },
          ],
          answer: 'wait',
          explainCorrect: t('Tepat! Menghormati Retry-After menjaga aplikasi tetap bekerja lancar tanpa diblokir.'),
          tags: ['rate-limit'],
        }),
      ),
      qStep({
        id: 'b08-l02-q7',
        type: 'type',
        modes: ['pro'],
        difficulty: 1,
        prompt: t('Tulis angka kode status HTTP untuk pesan "Too Many Requests":'),
        accept: ['429'],
        explainCorrect: t('Tepat! 429 berarti klien mengirim terlalu banyak request dalam periode waktu tertentu.'),
        tags: ['rate-limit', 'status-code'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b08-l02-r1',
        prompt: t('Jika jatah rate limit tersisa nol, status HTTP yang dikembalikan server adalah…'),
        choices: [
          { id: '429', label: t('429 Too Many Requests') },
          { id: '201', label: t('201 Created'), explainWrong: t('201 menandakan data baru berhasil dibuat.') },
        ],
        answer: '429',
        explainCorrect: t('429 menandakan batas kecepatan permintaan tercapai.'),
        tags: ['rate-limit', 'status-code'],
      }),
      makeTf({
        id: 'b08-l02-r2',
        prompt: t('Rate limit membantu mencegah server kewalahan sekaligus menahan serangan menebak kata sandi.'),
        answer: true,
        explainCorrect: t('Benar! Kedua manfaat itu membuat rate limiting wajib di API produksi.'),
        explainWrong: t('Rate limit menjaga kestabilan sekaligus keamanan endpoint sensitif seperti login.'),
        tags: ['rate-limit'],
      }),
    ],
    recap: t(
      'Rate limit membatasi jumlah permintaan agar server tetap lancar dan adil; batas habis ditandai kode 429.',
      'Rate limiting melindungi API dengan kuota per periode, status 429 Too Many Requests, dan header Retry-After.',
    ),
    companion: {
      talkPrompts: [
        'Kenapa antrean wahana atau toko kue membatasi maksimal 2 kotak per pembeli saat ramai?',
      ],
      offlineActivity:
        'Mainkan "Kantin Antre": setiap tamu hanya boleh meminta maksimal 2 kali dalam 1 menit; kalau minta ketiga kalinya, penjaga angkat papan "429 - Tunggu 10 detik!".',
    },
  }),

  makeLesson({
    id: 'b08-l03',
    worldId: 'b08',
    title: 'Retry dan backoff: menelepon dengan sopan',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku tahu kapan boleh mencoba ulang dan cara memberi jeda yang makin lama dengan sopan.',
      'Aku bisa menerapkan timeout, selective retry, dan exponential backoff dengan jitter.',
    ),
    estMinutes: 5,
    introducesTerms: ['backoff'],
    usesTerms: ['rate-limit', 'status-code', 'server', 'request', 'api'],
    stickerId: 'telepon-sopan',
    warmupFrom: 'b08-l02',
    steps: [
      storyStep('b08/telepon-sopan.svg', [
        rText(
          'Saat menelepon teman yang sibuk, orang yang tidak sopan menelepon terus setiap detik. Orang yang sopan menunggu 1 menit, lalu 2 menit, lalu 4 menit!',
          'Jaringan internet tidak selalu mulus. Alih-alih menggedor server tiap detik saat gagal, aplikasi yang baik menggabungkan timeout, retry selektif, dan exponential backoff.',
        ),
      ]),
      conceptStep({
        title: t('Batas Waktu (Timeout)', 'Aturan Timeout'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'batas-timeout' },
        alt: t('Batas tunggu 10 detik agar aplikasi tidak macet menunggu jawaban selamanya.'),
        body: [
          rText(
            'Jangan menunggu jawaban selamanya. Pasang batas waktu tunggu, misalnya 10 detik, lalu tawarkan tombol coba lagi.',
            'Tetapkan timeout (misalnya 10 detik) pada setiap request agar layar tidak membeku selamanya ketika jaringan macet.',
          ),
        ],
      }),
      conceptStep({
        title: t('Kapan Boleh Coba Ulang?', 'Retry Hanya Kegagalan Sementara'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'kapan-retry' },
        alt: t('Retry untuk putus jaringan, 429, 502, 503, 504; jangan retry 400, 401, 403, 404.'),
        body: [
          rText(
            'Coba ulang hanya jika jaringan putus atau server sibuk. Jangan ulangi kesalahan alamat 404 karena hasilnya sama.',
            'Lakukan retry hanya untuk gangguan sementara (putus sinyal, 429, 502, 503, 504). Jangan ulangi 400, 401, 403, atau 404 karena hasilnya pasti tetap gagal.',
          ),
        ],
      }),
      conceptStep({
        title: t('Jeda Makin Lama (Backoff)', 'Exponential Backoff & Jitter'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'exponential-backoff' },
        alt: t('Jeda percobaan ulang berlipat dua: 1 detik, 2 detik, 4 detik, lalu berhasil.'),
        body: [
          rTerm('backoff', 'Exponential backoff', 'Exponential backoff'),
          rText(
            ' menunggu makin lama: 1 detik, 2 detik, lalu 4 detik. Jeda membuat server sempat pulih.',
            ' menggandakan jeda tunggu tiap gagal (1, 2, 4, 8 detik) ditambah sedikit waktu acak (jitter) agar ribuan klien tidak menelepon di detik yang sama.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Menelepon teman yang sedang sibuk'),
        same: [
          t('Menunggu makin lama memberi pihak seberang waktu untuk menyelesaikan urusan atau pulih.'),
          t('Kalau nomornya memang salah (404), menelepon ulang tetap tidak nyambung.'),
        ],
        different: [
          t('Di dunia aplikasi, ribuan HP bisa gagal bersamaan sehingga perlu jitter (jeda acak kecil) agar tidak mengetuk serentak.'),
          t('Aplikasi juga harus membatasi jumlah maksimal percobaan (misal 3 kali), bukan mengulang sampai baterai habis.'),
        ],
      }),
      simStep(
        'telepon-sopan',
        t(
          'Klik tombol jeda bertahap 1s → 2s → 4s dan bandingkan hasilnya dengan bertanya tanpa jeda!',
          'Bandingkan pola spam retry vs exponential backoff di simulator untuk melihat pemulihan server.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'b08-l03-q1',
          type: 'analogy',
          prompt: t('Mengapa mengetuk pintu server tiap 0,5 detik saat server sedang kelelahan bukan cara yang baik?'),
          choices: [
            { id: 'over', label: t('Server justru makin kewalahan dan tidak sempat pulih') },
            {
              id: 'fast',
              label: t('Membuat internet menjadi lebih cepat'),
              explainWrong: t('Mengirim banyak panggilan gagal justru memadatkan lalu lintas jaringan.'),
            },
            {
              id: 'css',
              label: t('Membuat font di halaman berubah kecil'),
              explainWrong: t('Retry jaringan tidak mengubah ukuran font.'),
            },
          ],
          answer: 'over',
          explainCorrect: t('Benar! Jeda yang makin panjang memberi napas bagi server untuk pulih.'),
          tags: ['backoff'],
        }),
      ),
      qStep({
        id: 'b08-l03-q2',
        type: 'sort',
        prompt: t('Kelompokkan kondisi berikut ke Boleh Retry Otomatis atau Jangan Retry Otomatis:'),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('503 Server sibuk sementara') },
          { id: 'i2', label: t('404 Alamat endpoint salah ketik') },
          { id: 'i3', label: t('400 Format data kiriman salah') },
          { id: 'i4', label: t('Koneksi internet terputus sesaat') },
        ],
        bins: [
          { id: 'yes', label: t('Boleh Retry (Sementara)') },
          { id: 'no', label: t('Jangan Retry (Hasil Tetap)') },
        ],
        answer: { i1: 'yes', i2: 'no', i3: 'no', i4: 'yes' },
        explainCorrect: t('Mantap! 400 dan 404 tidak akan berubah meski diulang seratus kali.'),
        tags: ['backoff', 'status-code'],
      }),
      qStep({
        id: 'b08-l03-q3',
        type: 'order',
        prompt: t('Urutkan jeda waktu exponential backoff standar dari kegagalan pertama sampai ketiga:'),
        difficulty: 1,
        items: [
          { id: 'd4', label: t('Tunggu sekitar 4 detik sebelum coba lagi') },
          { id: 'd1', label: t('Tunggu sekitar 1 detik setelah gagal pertama') },
          { id: 'd2', label: t('Tunggu sekitar 2 detik setelah gagal kedua') },
        ],
        answer: ['d1', 'd2', 'd4'],
        explainCorrect: t('Tepat! Pola lipat dua 1 → 2 → 4 → 8 detik memberi waktu pulih bertahap.'),
        tags: ['backoff'],
      }),
      qStep(
        makeTf({
          id: 'b08-l03-q4',
          prompt: t('Aplikasi sebaiknya menunggu jawaban server tanpa batas waktu (tanpa timeout) supaya suatu saat pasti tersambung.'),
          answer: false,
          explainCorrect: t('Betul, itu salah! Tanpa timeout, layar bisa macet berputar terus tanpa kejelasan bagi pengguna.'),
          explainWrong: t('Hampir! Pasang batas timeout (misal 10 detik) lalu tampilkan pesan dan tombol coba lagi.'),
          tags: ['backoff'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l03-q5',
          type: 'limit',
          analogy: t('Menelepon teman dengan jeda sopan'),
          prompt: t('Tambahan apa yang dibutuhkan exponential backoff di aplikasi internet berskala besar yang tidak terjadi saat menelepon 1 teman?'),
          choices: [
            { id: 'jit', label: t('Jitter (waktu acak kecil) agar ribuan aplikasi yang gagal bersamaan tidak mencoba ulang di detik yang sama persis') },
            {
              id: 'wait',
              label: t('Menunggu makin lama setelah setiap kegagalan'),
              explainWrong: t('Itu kesamaan antara backoff di HP dan di telepon.'),
            },
            {
              id: 'stop',
              label: t('Berhenti jika memang nomor salah'),
              explainWrong: t('Keduanya sama-sama berhenti untuk nomor/alamat yang salah.'),
            },
          ],
          answer: 'jit',
          explainCorrect: t('Tepat! Jitter menyebar waktu percobaan ulang ribuan pengguna sehingga lalu lintas kembali mulus.'),
          tags: ['backoff'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l03-q6',
          type: 'scenario',
          story: t('Aplikasi Toko Rani menerima kode 401 (belum login) saat memanggil GET /pesanan. Programmernya menulis kode retry otomatis 5 kali dengan exponential backoff.'),
          prompt: t('Mengapa strategi programmer itu keliru?'),
          difficulty: 2,
          choices: [
            { id: 'no', label: t('Kode 401 tidak akan berubah menjadi 200 hanya dengan mengulang request tanpa login atau refresh token') },
            {
              id: 'five',
              label: t('Karena angka 5 bukan kelipatan 2'),
              explainWrong: t('Masalahnya adalah status 401 tidak selesai lewat retry biasa.'),
            },
            {
              id: 'get',
              label: t('Karena GET tidak boleh diulang'),
              explainWrong: t('GET aman diulang, tetapi 401 tetap ditolak jika belum ada token sah.'),
            },
          ],
          answer: 'no',
          explainCorrect: t('Benar! 401 berarti perlu autentikasi atau refresh token dulu, bukan di-retry membabi buta.'),
          tags: ['backoff', 'status-code'],
        }),
      ),
      qStep({
        id: 'b08-l03-q7',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi pasangan strategi ketahanan request di frontend berikut:'),
        template: 'Tetapkan batas tunggu ___ (mis. 10 detik), lalu retry gangguan sementara dengan ___ + jitter.',
        bank: ['timeout', 'exponential backoff', 'CORS', 'Base64'],
        answer: ['timeout', 'exponential backoff'],
        explainCorrect: t('Sempurna! Timeout membatasi waktu tunggu dan exponential backoff + jitter menjarakkan retry.'),
        tags: ['backoff'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b08-l03-r1',
        prompt: t('Manakah status kode yang WAJIB dihindari dari retry otomatis biasa?'),
        choices: [
          { id: '400', label: t('400 Bad Request / 404 Not Found') },
          { id: '503', label: t('503 Service Unavailable'), explainWrong: t('503 bersifat sementara dan boleh di-retry dengan backoff.') },
        ],
        answer: '400',
        explainCorrect: t('Error 400, 401, 403, dan 404 disebabkan isi/izin yang salah sehingga retry biasa tidak berguna.'),
        tags: ['backoff', 'status-code'],
      }),
      makeTf({
        id: 'b08-l03-r2',
        prompt: t('Exponential backoff menggandakan jeda tunggu tiap gagal, misalnya 1 detik, 2 detik, lalu 4 detik.'),
        answer: true,
        explainCorrect: t('Benar! Jeda yang makin panjang memberi kesempatan server untuk pulih.'),
        explainWrong: t('Ingat pola berlipat dua pada exponential backoff.'),
        tags: ['backoff'],
      }),
    ],
    recap: t(
      'Pasang batas waktu tunggu, ulangi hanya error sementara, dan beri jeda makin lama (1, 2, 4 detik).',
      'Kombinasikan timeout, selective retry (hanya 429/5xx/jaringan), dan exponential backoff + jitter agar klien tetap sopan.',
    ),
    companion: {
      talkPrompts: [
        'Kalau telepon rumah sedang sibuk, lebih sopan langsung tekan ulang 10 kali atau tunggu 1 menit lalu 2 menit?',
      ],
      offlineActivity:
        'Hitung bersama memakai tepuk tangan jeda: 1 detik... tepuk! Tunggu 2 detik... tepuk! Tunggu 4 detik... tepuk! Rasakan betapa longgar jedanya untuk bernapas.',
    },
  }),

  makeLesson({
    id: 'b08-l04',
    worldId: 'b08',
    title: 'Idempotency key: nomor nota',
    modes: ['pro'],
    objective: t('Aku memahami mengapa POST berisiko ganda saat retry dan bagaimana Idempotency-Key mencegah pembayaran dobel.'),
    estMinutes: 5,
    introducesTerms: ['idempotency-key'],
    usesTerms: ['idempotent', 'http-method', 'header-body', 'backoff', 'server', 'frontend'],
    stickerId: 'nomor-nota',
    warmupFrom: 'b08-l03',
    steps: [
      storyStep('b08/nomor-nota.svg', [
        rText('Seperti nomor nota kasir: kalau kasir menerima nota bernomor 0451 dua kali karena kurir sempat terputus sinyal, ia langsung sadar itu transaksi yang sama dan tidak menagih dua kali!'),
      ]),
      conceptStep({
        title: t('Masalah Retry pada Method POST'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'masalah-post-ganda' },
        alt: t('Request POST pertama berhasil diproses server tetapi jawabannya putus di jalan sehingga klien mengirim ulang.'),
        body: [
          rText('Ingat: '),
          rCode('POST'),
          rText(' tidak bersifat '),
          rTerm('idempotent', 'idempotent'),
          rText('. Jika pembeli menekan "Bayar", request pertama sudah sampai ke server tetapi sinyal balasan putus, lalu aplikasi melakukan retry, bisa terjadi pembayaran ganda!'),
        ],
      }),
      conceptStep({
        title: t('Solusi: Header Idempotency-Key'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'header-idempotency-key' },
        alt: t('Client membuat UUID unik di header Idempotency-Key untuk satu niat transaksi.'),
        code: {
          lang: 'http',
          code: 'POST /pembayaran\nIdempotency-Key: 6f1c2b9e-8d3a-4e7f-9b21-0c5d8a7e4f10\n{ "pesanan_id": 88, "jumlah": 150000 }',
        },
        body: [
          rText('Client membuat kode unik ('),
          rTerm('idempotency-key', 'Idempotency-Key'),
          rText(') per satu niat transaksi dan menaruhnya di header. Server mencatat kode itu; bila kode sama datang lagi, server mengembalikan hasil awal tanpa memproses ulang.'),
        ],
      }),
      conceptStep({
        title: t('Pasangan Wajib di Tampilan Frontend'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'disable-tombol-bayar' },
        alt: t('Nonaktifkan tombol Bayar saat proses berlangsung dan tampilkan Memproses.'),
        body: [
          rText('Selain memasang '),
          rTerm('idempotency-key', 'Idempotency-Key'),
          rText(' di header request transaksi, cegah klik ganda di sisi UI dengan menonaktifkan tombol segera setelah ditekan dan menampilkan status "Memproses...".'),
        ],
      }),
      limitStep({
        analogy: t('Nomor nota kasir 0451'),
        same: [
          t('Satu nomor mewakili satu transaksi unik sehingga tidak ditagih ulang jika struknya datang dua kali.'),
        ],
        different: [
          t('Jika pembeli memang berniat membeli produk yang sama lagi untuk transaksi BARU 5 menit kemudian, aplikasi wajib membuat Idempotency-Key baru (nomor nota baru), bukan memakai kunci transaksi lama.'),
        ],
      }),
      simStep(
        'satpam-cors',
        t('Ingat kembali bagaimana header HTTP dikirim ke server; kali ini pastikan header Idempotency-Key hanya dipakai per niat transaksi.'),
      ),
      qStep(
        makeMcq({
          id: 'b08-l04-q1',
          type: 'analogy',
          prompt: t('Pada analogi kasir toko, apa fungsi utama Idempotency-Key di header POST /pembayaran?'),
          choices: [
            { id: 'nota', label: t('Nomor nota unik agar transaksi yang sama tidak diproses dan ditagih dua kali') },
            {
              id: 'pw',
              label: t('Kata sandi admin toko'),
              explainWrong: t('Idempotency-Key bukan kata sandi akun, melainkan pengenal unik satu transaksi.'),
            },
            {
              id: 'css',
              label: t('Ukuran kotak tombol Bayar'),
              explainWrong: t('Kunci ini bekerja pada logika transaksi server.'),
            },
          ],
          answer: 'nota',
          explainCorrect: t('Tepat! Bila nota sama tiba dua kali akibat retry jaringan, server cukup mengembalikan hasil transaksi pertama.'),
          tags: ['idempotency-key', 'idempotent'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l04-q2',
          type: 'why',
          base: 'Menonaktifkan tombol "Bayar" di frontend saja belum cukup untuk menjamin tidak ada pembayaran ganda.',
          prompt: t('Mengapa sisi server tetap membutuhkan Idempotency-Key meskipun tombol sudah di-disable di layar?'),
          choices: [
            { id: 'net', label: t('Karena saat sinyal terputus di tengah jalan, library atau browser bisa mengirim ulang request yang pertama sebenarnya sudah masuk server') },
            {
              id: 'css',
              label: t('Karena tombol HTML tidak bisa dinonaktifkan dengan JavaScript'),
              explainWrong: t('Tombol HTML bisa diberi disabled, tetapi itu tidak mencegah retry jaringan.'),
            },
            {
              id: 'get',
              label: t('Karena server tidak mengizinkan method POST'),
              explainWrong: t('POST diizinkan, hanya saja secara bawaan tidak idempotent.'),
            },
          ],
          answer: 'net',
          explainCorrect: t('Benar! UI mencegah klik ganda manusia, sedangkan Idempotency-Key mencegah proses ganda akibat retry jaringan.'),
          tags: ['idempotency-key', 'frontend', 'server'],
        }),
      ),
      qStep({
        id: 'b08-l04-q3',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi header request pembayaran agar aman apabila di-retry saat jaringan terputus:'),
        template: 'POST /pembayaran\n___: 6f1c2b9e-8d3a-4e7f\n{ "pesanan_id": ___ }',
        bank: ['Idempotency-Key', '88', 'Access-Control', 'GET'],
        answer: ['Idempotency-Key', '88'],
        explainCorrect: t('Tepat! Header Idempotency-Key dipadukan dengan data pesanan pada body POST.'),
        tags: ['idempotency-key', 'header-body'],
      }),
      qStep(
        makeTf({
          id: 'b08-l04-q4',
          prompt: t('Jika pengguna memesan ulang kopi kedua untuk transaksi baru yang terpisah, aplikasi harus memakai Idempotency-Key yang sama persis dengan kopi pertama.'),
          answer: false,
          explainCorrect: t('Benar, itu salah! Transaksi baru yang memang berbeda wajib memakai Idempotency-Key baru yang unik.'),
          explainWrong: t('Jika memakai kunci transaksi lama, server akan mengira itu pengulangan dan tidak membuat pesanan kopi kedua.'),
          tags: ['idempotency-key'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l04-q5',
          type: 'limit',
          analogy: t('Nomor nota kasir 0451'),
          prompt: t('Kapan aturan "kunci sama mengembalikan hasil lama" bisa menjadi masalah jika pembuat kode frontend salah menaruh pembuatan Idempotency-Key?'),
          choices: [
            { id: 'reuse', label: t('Jika kode frontend membuat satu kunci tetap saat halaman dibuka lalu memakainya untuk dua transaksi belanja berbeda') },
            {
              id: 'retry',
              label: t('Jika retry jaringan mengirim ulang kunci yang sama untuk satu pembayaran yang sempat putus'),
              explainWrong: t('Untuk retry dari satu niat bayar yang sama, memakai kunci yang sama justru wajib.'),
            },
            {
              id: 'uniq',
              label: t('Jika setiap transaksi baru diberi UUID baru'),
              explainWrong: t('Memberi UUID baru per transaksi adalah cara yang benar.'),
            },
          ],
          answer: 'reuse',
          explainCorrect: t('Tepat! Buat kunci unik tepat untuk satu niat aksi/checkout, dan ganti kunci baru setelah transaksi selesai atau keranjang berubah.'),
          tags: ['idempotency-key', 'frontend'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l04-q6',
          type: 'scenario',
          story: t('Rani menekan Bayar di kereta malam. Request POST /pembayaran membawa Idempotency-Key: abc-123 sudah sampai ke server, tetapi sinyal terowongan memutus jawabannya. Aplikasi mengirim ulang POST yang sama dengan Idempotency-Key: abc-123.'),
          prompt: t('Apa yang dilakukan server pembayaran yang benar?'),
          choices: [
            { id: 'same', label: t('Mengembalikan respons sukses transaksi pertama tanpa memotong saldo Rani kedua kali') },
            {
              id: 'double',
              label: t('Memotong saldo Rani dua kali karena method-nya POST'),
              explainWrong: t('Itulah yang dicegah oleh pencatatan Idempotency-Key di server.'),
            },
            {
              id: '404',
              label: t('Menghapus pesanan 88'),
              explainWrong: t('Server tidak menghapus pesanan yang sudah sah dibayar.'),
            },
          ],
          answer: 'same',
          explainCorrect: t('Sempurna! Saldo hanya terpotong satu kali meskipun request masuk dua kali.'),
          tags: ['idempotency-key', 'idempotent'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b08-l04-r1',
        prompt: t('Mengapa method POST pembayaran membutuhkan Idempotency-Key?'),
        choices: [
          { id: 'safe', label: t('Karena POST secara bawaan tidak idempotent dan berisiko menagih ganda jika di-retry') },
          { id: 'cache', label: t('Agar gambar produk tersimpan di cache browser'), explainWrong: t('Idempotency-Key untuk keamanan transaksi ganda.') },
        ],
        answer: 'safe',
        explainCorrect: t('Idempotency-Key membuat operasi POST menjadi aman terhadap pengulangan akibat putus sinyal.'),
        tags: ['idempotency-key', 'http-method'],
      }),
      makeTf({
        id: 'b08-l04-r2',
        prompt: t('Menonaktifkan tombol setelah ditekan dan menampilkan "Memproses..." membantu mencegah pengguna mengklik transaksi dua kali.'),
        answer: true,
        explainCorrect: t('Betul! Ini melengkapi perlindungan Idempotency-Key di level antarmuka.'),
        explainWrong: t('Pengalaman UX dan header teknis saling melengkapi untuk mencegah transaksi ganda.'),
        tags: ['idempotency-key', 'frontend'],
      }),
    ],
    recap: t('Buat operasi POST sensitif tetap aman terhadap retry jaringan dengan mengirim Idempotency-Key unik per niat transaksi.'),
  }),

  makeLesson({
    id: 'b08-l05',
    worldId: 'b08',
    title: 'Celah API paling umum',
    modes: ['pro'],
    objective: t('Aku mengenali celah keamanan OWASP API (BOLA/IDOR, Mass Assignment, kebocoran data, dll.) dan pencegahannya di server.'),
    estMinutes: 6,
    introducesTerms: ['bola-idor'],
    usesTerms: ['api', 'server', 'autentikasi', 'rate-limit', 'cors', 'https', 'rahasia-frontend', 'signature-webhook'],
    warmupFrom: 'b08-l04',
    steps: [
      storyStep('b08/bola-idor.svg', [
        rText('Bayangkan Rani membuka /pesanan/88 miliknya, lalu iseng mengganti angka di alamat menjadi /pesanan/89 dan ternyata struk belanja orang lain terbuka! Daftar celah seperti ini dirangkum oleh OWASP API Security Top 10.'),
      ]),
      conceptStep({
        title: t('BOLA / IDOR & Hak Fungsi'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'bola-idor' },
        alt: t('Celah BOLA/IDOR membiarkan pengguna melihat objek ID lain karena server tidak mengecek kepemilikan.'),
        body: [
          rTerm('bola-idor', 'BOLA / IDOR'),
          rText(' (Broken Object Level Authorization) terjadi saat server lupa mengecek apakah '),
          rCode('/pesanan/89'),
          rText(' benar milik akun yang login. Begitu juga hak fungsi sensitif seperti '),
          rCode('DELETE /admin/pengguna/5'),
          rText(' wajib dicek perannya di server, bukan sekadar menyembunyikan tombol di tampilan.'),
        ],
      }),
      conceptStep({
        title: t('Kebocoran Data & Mass Assignment'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'mass-assignment' },
        alt: t('Jangan kirim kolom rahasia seperti hash sandi di response, dan batasi kolom input dengan daftar putih.'),
        body: [
          rText('Jangan kirim kolom sensitif (seperti hash kata sandi) di JSON lalu hanya "disembunyikan" di UI karena tetap terlihat di tab Network. Pada edit profil, cegah Mass Assignment (penyerang menyelipkan '),
          rCode('"role": "admin"'),
          rText(' di body) dengan daftar putih kolom yang boleh diubah.'),
        ],
      }),
      conceptStep({
        title: t('Daftar Periksa Keamanan API'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'checklist-keamanan-api' },
        alt: t('Prinsip utama: jangan pernah percaya client; amankan HTTPS, login/hak, validasi, rate limit, dan pesan error di server.'),
        body: [
          rText('Prinsip emas: jangan pernah percaya client karena siapa pun dapat memanggil API lewat Postman. Pakai '),
          rTerm('https', 'HTTPS'),
          rText(', validasi input dan hak di server, pasang '),
          rTerm('rate-limit', 'rate limit'),
          rText(', kunci '),
          rTerm('cors', 'CORS'),
          rText(', verifikasi '),
          rTerm('signature-webhook', 'webhook'),
          rText(', dan sembunyikan detail error internal.'),
        ],
      }),
      limitStep({
        analogy: t('Mengganti nomor pintu /pesanan/88 ke /pesanan/89'),
        same: [
          t('Hanya mengganti nomor ID di URL atau body dapat menembus data orang lain bila tidak ada pemeriksaan kepemilikan.'),
        ],
        different: [
          t('Di dunia digital, penyerang tidak hanya mencoba di browser; mereka menulis skrip otomatis atau Postman untuk memindai ribuan nomor ID dalam hitungan detik dan menyisipkan field tambahan di JSON.'),
        ],
      }),
      simStep(
        'satpam-cors',
        t('Ingat prinsip keamanan berlapis: selain satpam browser CORS, server API wajib selalu mengecek kepemilikan data dan peran pengguna.'),
      ),
      qStep({
        id: 'b08-l05-q1',
        type: 'match',
        prompt: t('Pasangkan celah keamanan OWASP API dengan contoh kejadiannya:'),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('BOLA / IDOR') },
          { id: 'l2', label: t('Mass Assignment') },
          { id: 'l3', label: t('Kebocoran data berlebih') },
          { id: 'l4', label: t('Hak fungsi tidak dicek') },
        ],
        right: [
          { id: 'r1', label: t('Mengganti /pesanan/88 ke /pesanan/89 melihat data orang lain') },
          { id: 'r2', label: t('Menyelipkan "role": "admin" pada body edit profil') },
          { id: 'r3', label: t('API mengirim hash kata sandi meski tidak ditampilkan di layar') },
          { id: 'r4', label: t('Akun biasa memanggil DELETE /admin/pengguna/5 via Postman') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
        explainCorrect: t('Tepat sekali! Mengenali pola serangan ini membantumu meninjau API dengan mata kritis.'),
        tags: ['bola-idor', 'api'],
      }),
      qStep({
        id: 'b08-l05-q2',
        type: 'sort',
        prompt: t('Kelompokkan tindakan pengamanan berikut apakah Cukup Aman di Server atau Berbahaya jika Hanya di Frontend:'),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('Menyembunyikan tombol Hapus Admin dengan CSS display: none') },
          { id: 'i2', label: t('Memeriksa userId pemilik pesanan di server sebelum mengirim data') },
          { id: 'i3', label: t('Membuang kolom passwordHash sebelum mengirim JSON response') },
          { id: 'i4', label: t('Menyaring kolom gaji dari tampilan UI setelah seluruh objek diterima') },
        ],
        bins: [
          { id: 'safe', label: t('Aman di Server') },
          { id: 'bad', label: t('Berbahaya (Hanya di UI)') },
        ],
        answer: { i1: 'bad', i2: 'safe', i3: 'safe', i4: 'bad' },
        explainCorrect: t('Benar! Apa pun yang sampai ke browser terlihat di tab Network, dan tombol yang disembunyikan tetap bisa dipanggil lewat Postman.'),
        tags: ['bola-idor', 'server'],
      }),
      qStep({
        id: 'b08-l05-q3',
        type: 'spotbug',
        difficulty: 2,
        prompt: t('Ketuk baris kode server yang rentan terhadap celah BOLA/IDOR karena tidak mengecek pemilik pesanan:'),
        lines: [
          'app.get("/pesanan/:id", wajibLogin, async (req, res) => {',
          '  const data = await db.pesanan.findUnique({ where: { id: req.params.id } });',
          '  return res.json(data);',
          '});',
        ],
        answer: [2],
        explainCorrect: t('Tepat! Baris 2 hanya mencari berdasarkan id pesanan tanpa memeriksa apakah data.pemilikId === req.user.id.'),
        tags: ['bola-idor', 'server'],
      }),
      qStep(
        makeTf({
          id: 'b08-l05-q4',
          prompt: t('Jika sebuah API sudah menyembunyikan menu admin dari tampilan browser pengguna biasa, maka endpoint DELETE /admin/pengguna/5 sudah aman tanpa cek peran di server.'),
          answer: false,
          explainCorrect: t('Betul, itu keliru! Siapa pun bisa memanggil endpoint admin langsung lewat Postman atau curl sehingga pengecekan peran di server wajib ada.'),
          explainWrong: t('Jangan pernah percaya client! Menyembunyikan tombol di UI tidak melindungi endpoint API di server.'),
          tags: ['bola-idor', 'autentikasi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l05-q5',
          type: 'limit',
          analogy: t('Mengganti nomor pintu /pesanan/88 ke /pesanan/89'),
          prompt: t('Mengapa pengujian keamanan API dengan mengklik-klik tampilan browser saja tidak cukup untuk membuktikan tidak ada celah BOLA atau Mass Assignment?'),
          choices: [
            { id: 'tool', label: t('Karena penyerang langsung memodifikasi URL, method, dan field JSON lewat alat seperti Postman atau skrip otomatis') },
            {
              id: 'num',
              label: t('Karena setiap pesanan memiliki nomor ID unik'),
              explainWrong: t('Kepemilikan nomor ID unik itu hal wajar; bahayanya ada di pengujian luar browser.'),
            },
            {
              id: 'url',
              label: t('Karena URL memakai path parameter'),
              explainWrong: t('Path parameter normal dipakai di REST selama kepemilikannya dicek di server.'),
            },
          ],
          answer: 'tool',
          explainCorrect: t('Benar! Prinsip "jangan pernah percaya client" mengharuskan server memvalidasi input, kepemilikan, dan peran pada setiap request.'),
          tags: ['bola-idor', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l05-q6',
          type: 'scenario',
          story: t('Endpoint kirim OTP di Toko Rani tidak dipasangi batas kecepatan. Seseorang menjalankan skrip yang memanggil POST /kirim-otp 50.000 kali dalam satu jam sehingga tagihan SMS melonjak tajam.'),
          prompt: t('Kombinasi pencegahan yang tepat di sisi server adalah…'),
          choices: [
            { id: 'rl', label: t('Pasang rate limiting ketat per pengguna/IP dan batas ukuran/frekuensi pada endpoint OTP') },
            {
              id: 'hide',
              label: t('Ubah warna tombol Kirim OTP menjadi abu-abu di CSS'),
              explainWrong: t('Skrip otomatis menembak endpoint langsung tanpa mengklik tombol CSS.'),
            },
            {
              id: 'err',
              label: t('Tampilkan stack trace error database ke browser'),
              explainWrong: t('Membocorkan detail error internal justru berbahaya.'),
            },
          ],
          answer: 'rl',
          explainCorrect: t('Tepat! Endpoint berbiaya tinggi seperti kirim OTP, login, dan pencarian wajib dipagari rate limiting.'),
          tags: ['rate-limit', 'server'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b08-l05-r1',
        prompt: t('Celah ketika pengguna bisa mengintip data orang lain hanya dengan mengganti angka ID di URL disebut…'),
        choices: [
          { id: 'bola', label: t('BOLA / IDOR') },
          { id: 'cors', label: t('CORS Preflight'), explainWrong: t('CORS mengatur akses lintas origin di browser.') },
        ],
        answer: 'bola',
        explainCorrect: t('Cegah BOLA/IDOR dengan selalu memeriksa kepemilikan objek pada setiap request di server.'),
        tags: ['bola-idor'],
      }),
      makeMcq({
        id: 'b08-l05-r2',
        prompt: t('Cara mencegah celah Mass Assignment (misal penyelipan "role": "admin" saat edit profil) di server adalah…'),
        choices: [
          { id: 'wl', label: t('Hanya menerima daftar putih (whitelist) kolom yang memang boleh diubah pengguna') },
          { id: 'ui', label: t('Tidak menampilkan kotak input role di HTML'), explainWrong: t('Penyerang tetap bisa menambahkan "role": "admin" lewat Postman atau DevTools.') },
        ],
        answer: 'wl',
        explainCorrect: t('Daftar putih kolom memastikan field sensitif seperti role atau saldo tidak pernah ikut tersimpan dari input user.'),
        tags: ['bola-idor', 'server'],
      }),
    ],
    recap: t('Jangan pernah percaya client: periksa kepemilikan data (anti-BOLA), daftar putih kolom, rate limit, dan otorisasi di server.'),
  }),
];
