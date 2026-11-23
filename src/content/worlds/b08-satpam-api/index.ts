import {
  conceptStep,
  limitStep,
  makeAnchorMcq,
  makeLesson,
  makeMcq,
  makeTf,
  qStep,
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
  id: 'b08',
  track: 'B',
  order: 8,
  title: 'Satpam API',
  tagline: t(
    'Jaga antrean wahana bermain. Lalu belajar menelepon dengan sopan.',
    'Kamu bisa menangani CORS dan batas jumlah request, lalu mencoba ulang dengan sopan.',
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
      'Halo! Ayo tunjukkan kamu bisa antre dengan tertib dan menelepon dengan sopan.',
      'Tunjukkan kamu bisa menjaga API. Topiknya: CORS, batas jumlah, retry, Idempotency-Key, dan celah OWASP.',
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
        prompt: t('Kamu bertanya ke situs terlalu sering. Apa jawabannya?'),
        choices: [
          { id: 'c429', label: t('429, tunggu dulu') },
          {
            id: 'c200',
            label: t('200, silakan masuk'),
            explainWrong: t('Angka 200 artinya semua lancar. Petugas tidak menyuruhmu menunggu.'),
          },
          {
            id: 'c404',
            label: t('404, halaman hilang'),
            explainWrong: t('Angka 404 artinya alamat tidak ketemu. Kamu hanya terlalu sering bertanya.'),
          },
        ],
        answer: 'c429',
        explainCorrect: t('Angka 429 artinya tunggu dulu. Seperti petugas wahana yang menahan antrean.'),
        tags: ['rate-limit', 'status-code'],
      }),
      makeAnchorMcq({
        id: 'b08-anc-j2',
        prompt: t('Situs menyuruhmu menunggu. Bagaimana kamu tahu waktunya?'),
        choices: [
          { id: 'ra', label: t('Situs menulis lama tunggu di jawabannya') },
          {
            id: 'css',
            label: t('Kamu cukup menunggu 1 menit'),
            explainWrong: t('Lama tunggu tiap situs bisa berbeda. Situs menuliskannya di jawabannya.'),
          },
          {
            id: 'html',
            label: t('Tombolnya berubah warna saat boleh lagi'),
            explainWrong: t('Tombol tidak memberi tahu lama tunggu. Situs menuliskannya di jawabannya.'),
          },
        ],
        answer: 'ra',
        explainCorrect: t('Jawaban situs memuat catatan lama tunggu, seperti kertas di pintu wahana.'),
        tags: ['rate-limit', 'header-body'],
      }),
      makeAnchorMcq({
        id: 'b08-anc-j3',
        prompt: t('Temanmu sibuk dan tidak mengangkat telepon. Bagaimana cara menelepon lagi yang sopan?'),
        choices: [
          { id: 'wait', label: t('Menunggu makin lama, lalu menelepon lagi') },
          {
            id: 'spam',
            label: t('Menelepon lagi tanpa jeda'),
            explainWrong: t('Telepon terus-menerus membuat temanmu makin kewalahan. Beri jeda dulu.'),
          },
          {
            id: 'del',
            label: t('Menelepon dari banyak HP sekaligus'),
            explainWrong: t('Banyak HP membuat telepon makin ramai. Tunggu saja dengan jeda.'),
          },
        ],
        answer: 'wait',
        explainCorrect: t('Jeda makin lama memberi waktu temanmu selesai. Itu cara yang sopan.'),
        tags: ['backoff'],
      }),
      makeAnchorMcq({
        id: 'b08-anc-j4',
        prompt: t('Kiriman gagal. Mana yang percuma dicoba lagi?'),
        choices: [
          { id: 'c404', label: t('Alamat yang salah ketik') },
          {
            id: 'net',
            label: t('Sinyal putus sebentar'),
            explainWrong: t('Sinyal bisa kembali sebentar lagi. Boleh dicoba lagi.'),
          },
          {
            id: 'c503',
            label: t('Situs sibuk sebentar'),
            explainWrong: t('Situs yang sibuk biasanya pulih sebentar lagi. Coba lagi dengan jeda.'),
          },
        ],
        answer: 'c404',
        explainCorrect: t('Alamat salah tetap salah, sebanyak apa pun diulang. Seperti nomor salah.'),
        tags: ['backoff', 'status-code'],
      }),
      makeAnchorMcq({
        id: 'b08-anc-j5',
        prompt: t('Mengapa wahana dan situs web punya batas antrean?'),
        choices: [
          { id: 'fair', label: t('Supaya semua orang kebagian giliran') },
          {
            id: 'dark',
            label: t('Supaya orang yang nakal dihukum'),
            explainWrong: t('Batas bukan hukuman. Batas membuat semua orang kebagian.'),
          },
          {
            id: 'off',
            label: t('Supaya petugas bisa istirahat'),
            explainWrong: t('Itu bukan alasan utamanya. Batas dibuat agar semua orang kebagian giliran.'),
          },
        ],
        answer: 'fair',
        explainCorrect: t('Batas membuat antrean tertib. Setiap orang mendapat giliran yang adil.'),
        tags: ['rate-limit'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'b08-anc-p1',
        prompt: t('Permintaan ke API lain diblokir karena CORS. Di mana perbaikannya?'),
        choices: [
          { id: 'srv', label: t('Di server API, dengan mengirim header izin') },
          {
            id: 'fe',
            label: t('Di kode frontend, dengan menambahkan header izin ke fetch'),
            explainWrong: t('Izin hanya berlaku kalau datang dari server tujuan. Frontend tidak bisa memberi izin untuk dirinya.'),
          },
          {
            id: 'css',
            label: t('Di pengaturan domain, dengan mengganti alamat server'),
            explainWrong: t('Alamat domain tidak mengatur izin lintas origin. Izin itu berupa header dari server.'),
          },
        ],
        answer: 'srv',
        explainCorrect: t('Browser hanya menaati izin dari server tujuan. Kode frontend tidak bisa memaksanya.'),
        tags: ['cors'],
      }),
      makeAnchorMcq({
        id: 'b08-anc-p2',
        prompt: t('Method apa yang dikirim browser otomatis pada preflight sebelum DELETE atau PUT?'),
        choices: [
          { id: 'opt', label: t('OPTIONS') },
          {
            id: 'head',
            label: t('HEAD'),
            explainWrong: t('HEAD hanya meminta header jawaban. Ia tidak menanyakan izin lintas origin.'),
          },
          {
            id: 'patch',
            label: t('PATCH'),
            explainWrong: t('PATCH mengubah sebagian data. Ia tidak menanyakan izin.'),
          },
        ],
        answer: 'opt',
        explainCorrect: t('Preflight memakai method OPTIONS untuk menanyakan izin method dan header ke server.'),
        tags: ['cors', 'http-method'],
      }),
      makeAnchorMcq({
        id: 'b08-anc-p3',
        prompt: t('Apa tujuan jitter, yaitu waktu acak kecil, pada jadwal retry exponential backoff?'),
        choices: [
          { id: 'thund', label: t('Mencegah banyak klien mencoba ulang di detik yang sama') },
          {
            id: 'enc',
            label: t('Mempercepat percobaan ulang dengan jeda yang lebih pendek'),
            explainWrong: t('Jitter menambah jeda acak, bukan memperpendeknya.'),
          },
          {
            id: 'jwt',
            label: t('Menjamin setiap klien mendapat giliran berurutan'),
            explainWrong: t('Jitter tidak mengatur urutan klien. Ia hanya menyebar waktunya.'),
          },
        ],
        answer: 'thund',
        explainCorrect: t('Jitter menyebar waktu retry antar klien, jadi server yang baru pulih tidak dihantam bersamaan.'),
        tags: ['backoff'],
      }),
      makeAnchorMcq({
        id: 'b08-anc-p4',
        prompt: t('Masalah apa yang dicegah header Idempotency-Key pada POST pembayaran?'),
        choices: [
          { id: 'dup', label: t('Tagihan terproses dua kali saat request dikirim ulang') },
          {
            id: 'cors',
            label: t('Request pembayaran diblokir oleh aturan origin'),
            explainWrong: t('Aturan origin diatur CORS, bukan Idempotency-Key.'),
          },
          {
            id: 'ui',
            label: t('Saldo pembeli tidak cukup saat membayar'),
            explainWrong: t('Idempotency-Key tidak memeriksa saldo. Ia hanya mengenali transaksi yang sama.'),
          },
        ],
        answer: 'dup',
        explainCorrect: t('Server menyimpan kunci itu. Kalau kunci yang sama datang lagi, server mengembalikan hasil awal.'),
        tags: ['idempotency-key', 'idempotent'],
      }),
      makeAnchorMcq({
        id: 'b08-anc-p5',
        prompt: t('Orang mengganti URL /pesanan/88 menjadi /pesanan/89 dan melihat pesanan pembeli lain. Celah OWASP apa ini?'),
        choices: [
          { id: 'bola', label: t('BOLA atau IDOR') },
          {
            id: 'cors',
            label: t('Mass Assignment'),
            explainWrong: t('Mass Assignment menyelipkan kolom tambahan saat edit data, bukan mengganti nomor.'),
          },
          {
            id: 'sse',
            label: t('Kebocoran data berlebih'),
            explainWrong: t('Kebocoran data berlebih berarti jawaban memuat kolom yang tidak perlu.'),
          },
        ],
        answer: 'bola',
        explainCorrect: t('Pada BOLA, server lupa mengecek apakah objek itu milik akun yang login.'),
        tags: ['bola-idor'],
      }),
      makeAnchorMcq({
        id: 'b08-anc-p6',
        type: 'limit',
        analogy: t('Satpam apartemen untuk CORS'),
        prompt: t('Mengapa menganggap CORS sebagai pengaman utama API itu berbahaya?'),
        choices: [
          { id: 'post', label: t('CORS hanya menahan browser, bukan Postman atau curl') },
          {
            id: 'opt',
            label: t('Preflight OPTIONS membuat API jadi lebih lambat'),
            explainWrong: t('Preflight memang menambah satu permintaan. Itu bukan alasan CORS tidak cukup.'),
          },
          {
            id: 'hdr',
            label: t('Header izin bisa dipalsukan oleh pengunjung biasa'),
            explainWrong: t('Header izin dikirim server, bukan halaman. Masalahnya ada di alat non-browser.'),
          },
        ],
        answer: 'post',
        explainCorrect: t('CORS hanya melindungi lewat browser, bukan lewat alat lain. API tetap wajib memeriksa login dan izin sendiri.'),
        tags: ['cors', 'autentikasi'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  // ---------------------------------------------------------------------------------------------
  // b08-l01 (khusus Pro)
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'b08-l01',
    worldId: 'b08',
    title: 'CORS: satpam di browser',
    modes: ['pro'],
    objective: t('Kamu bisa membaca error CORS, menjelaskan preflight, dan memperbaikinya di server.'),
    estMinutes: 6,
    introducesTerms: ['cors'],
    usesTerms: ['browser', 'server', 'domain', 'header-body', 'http-method', 'api', 'autentikasi'],
    stickerId: 'satpam-apartemen',
    atWork: 'Kamu akan melihat error CORS merah di tab Console saat halaman memanggil API lain.',
    warmupFrom: 'b07-l05',
    steps: [
      storyStep('b08/satpam-apartemen.svg', [
        rText(
          'Halaman Toko Rani gagal memanggil API di domain lain, padahal di Postman berhasil. Bayangkan satpam apartemen A menahan paketmu, karena pengelola apartemen B belum memberi izin.',
        ),
      ]),
      conceptStep({
        title: t('Origin dan Same-Origin Policy'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'origin-policy' },
        alt: t('Origin adalah gabungan protokol, domain, dan port; Same-Origin Policy membatasi bacaan antar origin.'),
        code: {
          lang: 'text',
          code: 'Origin 1: https://toko-rani.example\nOrigin 2: https://api.toko-lain.example\n→ Origin berbeda! Browser cek izin CORS.',
        },
        body: [
          rText(
            'Origin adalah gabungan protokol, domain, dan port. Aturan Same-Origin Policy melarang JavaScript membaca jawaban dari origin lain. Pengecualiannya disebut ',
          ),
          rTerm('cors', 'CORS'),
          rText(', yaitu izin lewat header '),
          rCode('Access-Control-Allow-Origin'),
          rText('.'),
        ],
      }),
      simStep(
        'satpam-cors',
        t('Ubah origin peminta antara toko-rani.example dan situs-lain.example, lalu lihat aksi satpam browser.'),
      ),
      qStep(
        makeMcq({
          id: 'b08-l01-q1',
          type: 'analogy',
          prompt: t('Dalam analogi apartemen, siapa yang menahan permintaanmu kalau header izin tidak ada?'),
          choices: [
            { id: 'brw', label: t('Browser di sisimu sendiri (apartemen A)') },
            {
              id: 'css',
              label: t('Server API di apartemen B'),
              explainWrong: t('Server tujuan hanya memberi izin lewat header. Yang menahan adalah browser di sisimu.'),
            },
            {
              id: 'dns',
              label: t('Jaringan internet di antara kedua apartemen'),
              explainWrong: t('Jaringan hanya membawa data dan tidak menegakkan aturan origin. Penegaknya browser.'),
            },
          ],
          answer: 'brw',
          explainCorrect: t(
            'Browser menegakkan Same-Origin Policy, jadi situs lain tidak bisa membaca data origin lain sembarangan. Satpam apartemen A bekerja seperti itu.',
          ),
          hints: [t('Satpam mana yang berdiri di apartemenmu sendiri?')],
          tags: ['cors', 'browser'],
        }),
      ),
      conceptStep({
        title: t('Preflight: izin sebelum kirim'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b08', topic: 'cors-preflight' },
        alt: t('Browser mengirim OPTIONS preflight sebelum DELETE /produk/12 ke API di origin lain.'),
        code: {
          lang: 'text',
          code: '1. Browser → API: OPTIONS (boleh DELETE dari toko-rani.example?)\n2. API → Browser: Boleh! Allow-Origin & Allow-Methods\n3. Browser → API: DELETE /produk/12 → 204',
        },
        body: [
          rText('Untuk permintaan yang tidak sederhana, browser lebih dulu mengirim pertanyaan izin yang disebut preflight. Pertanyaan itu memakai method '),
          rCode('OPTIONS'),
          rText(' dan muncul sebelum '),
          rCode('PUT'),
          rText(', '),
          rCode('DELETE'),
          rText(', POST dengan '),
          rCode('Content-Type: application/json'),
          rText(', atau header '),
          rCode('Authorization'),
          rText('.'),
        ],
      }),
      qStep({
        id: 'b08-l01-q2',
        type: 'order',
        prompt: t('Urutkan langkah browser saat mengirim DELETE /produk/12 ke API di origin lain.'),
        difficulty: 2,
        items: [
          { id: 's3', label: t('Browser mengirim permintaan DELETE /produk/12 yang sebenarnya') },
          { id: 's1', label: t('Browser mengirim preflight OPTIONS untuk menanyakan izin') },
          { id: 's4', label: t('API membalas dengan status 204 dan header izin') },
          { id: 's2', label: t('API menjawab preflight dengan daftar origin dan method yang diizinkan') },
        ],
        answer: ['s1', 's2', 's3', 's4'],
        explainCorrect: t(
          'Preflight OPTIONS datang lebih dulu untuk permintaan tidak sederhana lintas origin. Permintaan aslinya baru dikirim setelah API mengizinkan.',
        ),
        hints: [t('Pertanyaan izin selalu mendahului permintaan yang sebenarnya.'), undefined],
        tags: ['cors', 'http-method'],
      }),
      conceptStep({
        title: t('Tiga fakta tentang CORS'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'tiga-fakta-cors' },
        alt: t('Tiga fakta: izin datang dari tujuan, berlaku hanya di browser, dan bukan pengaman.'),
        body: [
          rText('Perbaikan CORS ada di server, bukan di halaman web. CORS hanya berlaku di browser, jadi Postman tidak terkena. Untuk API ber-login, izinkan domain sendiri, bukan '),
          rCode('Access-Control-Allow-Origin: *'),
          rText('.'),
        ],
      }),
      limitStep({
        analogy: t('Satpam apartemen A menelepon pengelola B'),
        same: [
          t('Yang menahanmu adalah satpam di sisimu sendiri (browser), dan izin datang dari pihak tujuan.'),
        ],
        different: [
          t('CORS hanya ada di browser. Postman dan curl memanggil API tanpa melewati satpam itu.'),
          t('Jadi CORS tidak bisa menggantikan login dan pengecekan izin.'),
        ],
        riskyAnalogy: true,
      }),
      qStep({
        id: 'b08-l01-q3',
        type: 'spotbug',
        difficulty: 2,
        prompt: t('Ketuk baris yang membuat server API pembayaran ber-login terlalu longgar.'),
        lines: [
          'app.use((req, res, next) => {',
          '  res.setHeader("Access-Control-Allow-Origin", "*");',
          '  res.setHeader("Access-Control-Allow-Methods", "GET,POST");',
          '  next();',
          '});',
        ],
        answer: [2],
        explainCorrect: t(
          'Baris 2 mengizinkan semua origin dengan tanda *. Untuk API ber-login, izinkan origin tertentu saja, misalnya https://toko-rani.example sendiri.',
        ),
        hints: [t('Cari header yang menentukan siapa boleh masuk.'), undefined],
        tags: ['cors', 'server'],
      }),
      qStep(
        makeTf({
          id: 'b08-l01-q4',
          prompt: t('Postman berhasil memanggil API, tetapi halaman web gagal dengan error CORS. Berarti servernya mati.'),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru: servernya hidup, buktinya Postman berhasil. Yang kurang adalah header izin CORS untuk origin halamanmu.',
          ),
          explainWrong: t('CORS hanya berlaku di browser. Postman tidak dibatasi aturan itu.'),
          hints: [t('Bandingkan: siapa yang berhasil dan siapa yang gagal?')],
          tags: ['cors', 'browser'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l01-q5',
          type: 'limit',
          analogy: t('Satpam apartemen browser'),
          prompt: t('Apa batas penting dari satpam CORS?'),
          choices: [
            { id: 'notsec', label: t('CORS hanya menahan browser, bukan alat seperti curl') },
            {
              id: 'orig',
              label: t('CORS menahan semua alat yang memanggil API'),
              explainWrong: t('Alat seperti curl dan Postman tidak melewati satpam browser. CORS tidak menahannya.'),
            },
            {
              id: 'srv',
              label: t('CORS menggantikan login dan pengecekan izin di dalam API'),
              explainWrong: t('Login dan pengecekan izin tetap harus ada di API. CORS tidak menggantikannya.'),
            },
          ],
          answer: 'notsec',
          explainCorrect: t('Satpam CORS hanya berdiri di browser. API tetap harus memeriksa login dan izin sendiri.'),
          difficulty: 2,
          hints: [t('Pikirkan alat yang bukan browser.')],
          tags: ['cors', 'autentikasi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l01-q6',
          type: 'scenario',
          story: t('Tim Toko Rani memanggil api.toko-rani.example dari toko-rani.example, tetapi browser menolak dengan error CORS.'),
          prompt: t('Apa langkah perbaikan yang benar?'),
          difficulty: 2,
          choices: [
            { id: 'srv', label: t('Kirim header izin untuk toko-rani.example dari server API') },
            {
              id: 'fe',
              label: t('Bungkus fetch dengan try/catch supaya browser mengabaikan error CORS'),
              explainWrong: t('try/catch hanya menangkap error di kode JavaScript. Ia tidak mematikan aturan keamanan browser.'),
            },
            {
              id: 'css',
              label: t('Ganti method POST menjadi GET supaya tidak memakai aturan origin'),
              explainWrong: t('Mengganti method tidak menghapus aturan origin. Izin tetap harus datang dari server tujuan.'),
            },
          ],
          answer: 'srv',
          explainCorrect: t(
            'Subdomain api.toko-rani.example berbeda origin dengan toko-rani.example. Karena itu server tujuan harus mengirim header izin.',
          ),
          hints: [t('Siapa yang berhak memberi izin: pengirim atau tujuan?')],
          tags: ['cors', 'domain', 'server'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b08-l01-r1',
        prompt: t('Apa saja yang membentuk sebuah origin?'),
        choices: [
          { id: 'ok', label: t('Protokol, domain, dan port') },
          {
            id: 'path',
            label: t('Domain, path, dan port'),
            explainWrong: t('Path tidak termasuk origin. Origin berhenti di port.'),
          },
          {
            id: 'query',
            label: t('Protokol, domain, dan path'),
            explainWrong: t('Path tidak termasuk origin. Port justru ikut membentuknya.'),
          },
        ],
        answer: 'ok',
        explainCorrect: t('Kalau salah satunya berbeda, browser menganggapnya lintas origin. Contohnya http dan https berbeda protokol.'),
        tags: ['cors', 'domain'],
      }),
      makeTf({
        id: 'b08-l01-r2',
        prompt: t('Error CORS diperbaiki di server tujuan, bukan di kode halaman.'),
        answer: true,
        explainCorrect: t('Hanya server tujuan yang bisa menyatakan origin mana yang boleh masuk.'),
        explainWrong: t('Kode halaman tidak bisa memberi izin untuk dirinya sendiri. Izin selalu datang dari tujuan.'),
        tags: ['cors', 'server'],
      }),
    ],
    recap: t('Satpam browser menahan permintaan lintas origin sampai tujuan memberi izin. CORS bukan pengganti keamanan API.'),
  }),

  // ---------------------------------------------------------------------------------------------
  // b08-l02
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'b08-l02',
    worldId: 'b08',
    title: 'Jatah naik wahana',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menjelaskan mengapa situs punya jatah permintaan.',
      'Kamu bisa menjelaskan tujuan rate limiting dan membaca status 429.',
    ),
    estMinutes: 5,
    introducesTerms: ['rate-limit'],
    usesTerms: ['api', 'server', 'status-code', 'header-body'],
    stickerId: 'wahana-bermain',
    atWork: 'Kamu akan melihat status 429 di tab Network DevTools saat aplikasi memanggil API terlalu sering.',
    warmupFrom: 'b08-l01',
    steps: [
      storyStep('b08/wahana-bermain.svg', [
        rText(
          'Wahana hanya boleh dinaiki 3 kali per jam. Kamu mau naik ke-4 kali, tetapi petugas menyuruhmu menunggu. Apa web juga punya aturan itu?',
          'Seperti jatah naik wahana, rate limiting (batas jumlah request per periode) memberi tiap aplikasi jatah tertentu.',
        ),
      ]),
      conceptStep({
        title: t('Apa itu jatah?', 'Tujuan rate limiting'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'rate-limit-wahana' },
        alt: t(
          'Papan aturan wahana: setiap anak boleh naik 3 kali per jam.',
          'Batas maksimal request per menit menjaga server tetap lancar dan adil.',
        ),
        body: [
          rTerm('rate-limit', 'Jatah', 'Rate limiting'),
          rText(
            ' adalah batas jumlah permintaan dalam waktu tertentu. Kamu boleh naik wahana 3 kali per jam. Jadi semua anak kebagian giliran.',
            ' adalah batas jumlah request per periode, misalnya 100 per menit. Server memakai batas ini supaya tidak kewalahan dan jatah terbagi adil. Setelah jatah habis, server menolak request berikutnya dengan status 429.',
          ),
        ],
      }),
      qStep(
        makeTf({
          id: 'b08-l02-q8j',
          modes: ['junior'],
          prompt: t('Petugas menyuruhmu menunggu. Itu berarti kamu dihukum.'),
          answer: false,
          explainCorrect: t('Pernyataan itu keliru: menunggu bukan hukuman. Jatah membuat semua anak kebagian giliran.'),
          explainWrong: t('Petugas hanya mengatur antrean. Semua anak mendapat aturan yang sama.'),
          hints: [t('Ingat tujuan jatah naik wahana.')],
          tags: ['rate-limit'],
        }),
      ),
      simStep(
        'telepon-sopan',
        t(
          'Ketuk "Tanya Terus Tanpa Jeda" dan lihat apa jawabannya.',
          'Ketuk "Tanya Terus Tanpa Jeda" dan amati status yang muncul.',
        ),
      ),
      conceptStep({
        title: t('Jawaban "tunggu dulu"', 'Membaca 429 dan header kuota'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'kode-429-header' },
        alt: t(
          'Petugas wahana menahan antrean dan menyuruh menunggu.',
          'Status 429 Too Many Requests dengan header RateLimit-Limit, RateLimit-Remaining, dan Retry-After.',
        ),
        code: {
          lang: 'http',
          code: 'HTTP/1.1 429 Too Many Requests\nRateLimit-Limit: 100\nRateLimit-Remaining: 0\nRetry-After: 30',
        },
        body: [
          rJunior('Kamu meminta terlalu sering? Situs menjawab 429, seperti petugas wahana. Artinya: tunggu dulu, lalu coba lagi.'),
          rPro('Saat jatah habis, server membalas dengan status '),
          rCode('429 Too Many Requests', ['pro']),
          rPro('. Header '),
          rCode('RateLimit-Remaining', ['pro']),
          rPro(' menunjukkan sisa jatah, dan '),
          rCode('Retry-After', ['pro']),
          rPro(' menunjukkan berapa detik client harus menunggu.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b08-l02-q1',
          type: 'analogy',
          prompt: t(
            'Situs menjawab 429. Apa artinya di antrean wahana?',
            'Petugas wahana berkata, "Tunggu 20 menit lagi." Balasan server mana yang sama artinya?',
          ),
          choices: [
            { id: '429', label: t('Petugas menyuruhmu menunggu giliran', '429 Too Many Requests') },
            {
              id: '200',
              label: t('Petugas mempersilakanmu naik sekarang', '200 OK dengan header RateLimit-Remaining'),
              explainWrong: t(
                'Naik sekarang berarti jatahmu masih ada. Angka 429 muncul saat jatah habis.',
                '200 OK berarti permintaan berhasil. Ia tidak menandakan jatah habis.',
              ),
            },
            {
              id: '500',
              label: t('Petugas bilang wahananya sedang rusak', '503 Service Unavailable'),
              explainWrong: t(
                'Wahana rusak itu masalah mesin. Angka 429 hanya soal jatahmu.',
                'Status 503 berarti server sedang bermasalah. Ia tidak menandakan jatah habis.',
              ),
            },
          ],
          answer: '429',
          explainCorrect: t(
            'Angka 429 artinya tunggu dulu. Petugas wahana juga menahanmu saat jatah habis.',
            'Status 429 dengan Retry-After berarti jatah habis dan memberi tahu kapan boleh mencoba lagi.',
          ),
          hints: [t('Ingat kartu tentang jawaban 429.', 'Cari status yang berarti jatah habis.')],
          tags: ['rate-limit', 'status-code'],
        }),
      ),
      qStep({
        id: 'b08-l02-q3',
        type: 'hotspot',
        modes: ['pro'],
        difficulty: 1,
        prompt: t('Ketuk header yang memberi tahu berapa detik lagi aplikasi boleh mencoba ulang.'),
        image: 'b08-hotspot',
        regions: [
          { id: 'status', shape: 'rect', coords: [10, 10, 260, 40], label: 'HTTP/1.1 429 Too Many Requests' },
          { id: 'limit', shape: 'rect', coords: [10, 55, 260, 40], label: 'RateLimit-Limit: 100' },
          { id: 'rem', shape: 'rect', coords: [10, 100, 260, 40], label: 'RateLimit-Remaining: 0' },
          { id: 'retry', shape: 'rect', coords: [10, 145, 260, 40], label: 'Retry-After: 30' },
        ],
        answer: 'retry',
        explainCorrect: t('Retry-After: 30 berarti aplikasi menunggu 30 detik sebelum request berikutnya.'),
        hints: [t('Cari baris yang berisi angka detik.'), undefined],
        tags: ['rate-limit', 'header-body'],
      }),
      conceptStep({
        title: t('Melindungi login dan OTP'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'cegah-tebak-sandi' },
        alt: t('Rate limit menghentikan bot yang menebak kata sandi berkali-kali.'),
        modes: ['pro'],
        body: [
          rText(
            'Rate limiting menahan serangan brute force, yaitu menebak kata sandi berulang-ulang, di endpoint login. Batas ini juga mencegah tagihan SMS OTP membengkak.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Jatah naik wahana 3 kali per jam'),
        same: [
          t('Jatah habis berarti harus menunggu giliran berikutnya.'),
          t('Tujuannya mencegah antrean macet dan mesin rusak.'),
        ],
        different: [
          t('Wahana memakai satu batas untuk semua. API boleh memakai batas berbeda untuk tiap endpoint.'),
          t('Petunjuk tunggu di API diberikan dalam jumlah detik.'),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeMcq({
          id: 'b08-l02-q2',
          prompt: t(
            'Ada orang menebak kata sandimu berkali-kali. Apa yang dilakukan jatah?',
            'Apa manfaat rate limit yang ketat di endpoint login?',
          ),
          choices: [
            {
              id: 'sec',
              label: t('Menghentikan orang itu setelah beberapa kali', 'Menahan bot yang menebak kata sandi berulang-ulang'),
            },
            {
              id: 'col',
              label: t('Membuat halaman masuk terbuka jauh lebih cepat', 'Membuat halaman login memuat lebih cepat karena request berkurang'),
              explainWrong: t(
                'Jatah tidak membuat halaman lebih cepat. Jatah hanya membatasi jumlah percobaan.',
                'Rate limit mengatur jumlah request, bukan kecepatan halaman.',
              ),
            },
            {
              id: 'del',
              label: t('Menghapus akun yang sering salah', 'Mengunci akun pemilik yang lupa sandi untuk beberapa jam'),
              explainWrong: t(
                'Jatah hanya menunda sebentar. Akunmu tidak dihapus.',
                'Rate limit hanya menunda percobaan berikutnya. Akun pemilik tidak dikunci.',
              ),
            },
          ],
          answer: 'sec',
          explainCorrect: t(
            'Penebak kata sandi harus mencoba berkali-kali. Jatah menghentikannya, seperti petugas yang menutup antrean.',
            'Penyerang perlu banyak percobaan untuk menebak kata sandi. Rate limit menghentikan bot itu setelah beberapa percobaan.',
          ),
          hints: [t('Ingat jatah naik wahana yang dibatasi.', 'Pikirkan bot yang mencoba banyak kata sandi.')],
          tags: ['rate-limit'],
        }),
      ),
      qStep(
        makeTf({
          id: 'b08-l02-q4',
          modes: ['pro'],
          prompt: t('Semua API memakai nama header RateLimit-Limit yang persis sama.'),
          answer: false,
          explainCorrect: t('Pernyataan itu keliru: sebagian API memakai awalan X-RateLimit-, jadi cek dokumentasinya.'),
          explainWrong: t('Penamaan header kuota berbeda antar API. Contohnya X-RateLimit-Remaining.'),
          hints: [t('Bayangkan dua API buatan tim yang berbeda.')],
          tags: ['rate-limit', 'header-body'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l02-q5',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Wahana bermain 3 kali per jam'),
          prompt: t('Apa yang bisa dilakukan batas API, tetapi tidak bisa dilakukan batas wahana?'),
          choices: [
            { id: 'diff', label: t('Batas ketat di login, longgar di katalog') },
            {
              id: 'wait',
              label: t('Menahan peminta yang sudah melebihi jatah'),
              explainWrong: t('Wahana juga menyuruh pengunjung menunggu. Itu kesamaannya, bukan bedanya.'),
            },
            {
              id: 'fair',
              label: t('Membagi giliran secara adil ke semua peminta'),
              explainWrong: t('Wahana juga membagi giliran dengan adil. Itu kesamaan keduanya.'),
            },
          ],
          answer: 'diff',
          explainCorrect: t(
            'Setiap endpoint punya risiko dan biaya berbeda, jadi batasnya disesuaikan. Wahana memakai satu aturan untuk semua.',
          ),
          difficulty: 2,
          hints: [t('Cari hal yang tidak dilakukan wahana.')],
          tags: ['rate-limit', 'api'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l02-q6',
          type: 'scenario',
          story: t(
            'Dimas membuat tombol "Cek Cuaca". Ia menekannya 120 kali dalam semenit. Situs cuaca menjawab 429.',
            'Dimas membuat tombol "Cek Cuaca" yang dipencet 120 kali dalam semenit. API cuaca membalas 429 dengan Retry-After: 60.',
          ),
          prompt: t('Apa yang sebaiknya dilakukan aplikasi Dimas?', 'Apa reaksi aplikasi yang paling tepat?'),
          difficulty: 2,
          choices: [
            {
              id: 'wait',
              label: t('Menunggu sesuai jawaban situs, lalu bertanya lagi', 'Tampilkan pesan ramah, lalu tunggu 60 detik'),
            },
            {
              id: 'loop',
              label: t('Bertanya terus tanpa jeda sampai berhasil', 'Kirim ulang secepat mungkin sampai request berhasil'),
              explainWrong: t(
                'Bertanya terus membuat situs makin sibuk. Kamu bisa ditolak lebih lama.',
                'Mengirim ulang tanpa jeda memperpanjang penolakan dan bisa membuat akun diblokir.',
              ),
            },
            {
              id: 'del',
              label: t('Berganti akun supaya dapat jatah baru', 'Ganti akun supaya mendapat jatah baru'),
              explainWrong: t(
                'Situs bisa mengenali polanya. Tunggu saja sampai boleh lagi.',
                'Berganti akun melanggar aturan API dan bisa membuat semua akun diblokir.',
              ),
            },
          ],
          answer: 'wait',
          explainCorrect: t(
            'Angka 429 artinya tunggu dulu. Seperti antre lagi di wahana setelah jatah habis.',
            'Retry-After menyebut berapa lama aplikasi harus menunggu. Menaatinya menjaga aplikasi tetap berjalan tanpa diblokir.',
          ),
          hints: [t('Ingat apa yang dilakukan anak di antrean wahana.', 'Baca ulang nilai Retry-After di cerita.')],
          tags: ['rate-limit'],
        }),
      ),
      qStep({
        id: 'b08-l02-q7',
        type: 'type',
        modes: ['pro'],
        difficulty: 1,
        prompt: t('Tulis angka status HTTP untuk "Too Many Requests".'),
        accept: ['429'],
        explainCorrect: t('429 berarti client mengirim terlalu banyak request dalam satu periode.'),
        hints: [t('Ingat status yang muncul di simulator tadi.'), undefined],
        tags: ['rate-limit', 'status-code'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b08-l02-r1',
        prompt: t(
          'Angka 429 muncul di layar. Apa yang terjadi?',
          'Jatah rate limit tinggal nol. Status HTTP apa yang dikembalikan server?',
        ),
        choices: [
          { id: '429', label: t('Kamu meminta terlalu sering', '429 Too Many Requests') },
          {
            id: '201',
            label: t('Pesananmu berhasil dibuat', '201 Created'),
            explainWrong: t(
              'Pesanan yang jadi punya angka lain. Angka 429 muncul saat jatahmu habis.',
              '201 Created berarti data baru berhasil dibuat.',
            ),
          },
          {
            id: 'nf',
            label: t('Alamat situs tidak ketemu', '404 Not Found'),
            explainWrong: t(
              'Alamat yang hilang punya angka lain. Angka 429 berarti kamu terlalu sering meminta.',
              '404 berarti alamat tidak ditemukan, bukan jatah habis.',
            ),
          },
        ],
        answer: '429',
        explainCorrect: t(
          'Angka 429 artinya tunggu dulu. Jatahmu habis, jadi kamu antre lagi.',
          'Status 429 menandakan batas jumlah request sudah tercapai.',
        ),
        hints: [t('Ingat apa kata petugas saat jatah habis.', 'Cari status untuk "terlalu banyak".')],
        tags: ['rate-limit', 'status-code'],
      }),
      makeTf({
        id: 'b08-l02-r2',
        prompt: t(
          'Jatah membantu situs tetap lancar dan menghentikan penebak kata sandi.',
          'Rate limit membantu server tetap stabil dan menahan serangan tebak kata sandi.',
        ),
        answer: true,
        explainCorrect: t(
          'Jatah menjaga situs lancar dan melindungi akun. Dua manfaat itu berjalan bersama.',
          'Rate limit menjaga stabilitas dan melindungi endpoint sensitif seperti login.',
        ),
        explainWrong: t(
          'Jatah punya dua manfaat. Situs tetap lancar dan akun lebih aman.',
          'Rate limit punya dua manfaat: stabilitas server dan perlindungan login.',
        ),
        hints: [t('Ingat jatah wahana dan penebak kata sandi.')],
        tags: ['rate-limit'],
      }),
    ],
    recap: t(
      'Jatah membuat semua kebagian giliran, dan 429 berarti tunggu dulu.',
      'Rate limiting memberi tiap client jatah per periode. Jatah habis dibalas status 429 dan header Retry-After.',
    ),
    companion: {
      talkPrompts: ['Mengapa antrean wahana membatasi jumlah naik tiap anak?'],
      offlineActivity:
        'Mainkan "Kantin Antre". Setiap tamu boleh meminta paling banyak 2 kali dalam 1 menit. Kalau minta ketiga kalinya, penjaga mengangkat papan "429, tunggu 10 detik!".',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // b08-l03
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'b08-l03',
    worldId: 'b08',
    title: 'Menelepon dengan sopan',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa memilih kapan boleh mencoba lagi dan berapa jedanya.',
      'Kamu bisa memakai timeout, retry selektif, dan exponential backoff dengan jitter.',
    ),
    estMinutes: 6,
    introducesTerms: ['backoff'],
    usesTerms: ['rate-limit', 'status-code', 'server', 'request', 'api'],
    stickerId: 'telepon-sopan',
    atWork: 'Kamu akan menambahkan retry dengan backoff saat API mengembalikan error 503 di jam sibuk.',
    warmupFrom: 'b08-l02',
    steps: [
      storyStep('b08/telepon-sopan.svg', [
        rText(
          'Temanmu sibuk dan tidak mengangkat telepon. Kamu menunggu 1 detik, lalu 2 detik, lalu 4 detik. Mengapa tidak menelepon tanpa jeda?',
          'Aplikasi Toko Rani gagal memuat pesanan karena API sedang sibuk. Mengulang tiap detik justru memperparah keadaan.',
        ),
      ]),
      conceptStep({
        title: t('Jeda makin lama', 'Exponential backoff dan jitter'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'exponential-backoff' },
        alt: t('Jeda berlipat dua: 1 detik, 2 detik, 4 detik, lalu berhasil.'),
        body: [
          rTerm('backoff', 'Backoff', 'Exponential backoff'),
          rText(
            ' artinya menunggu makin lama: 1 detik, 2 detik, lalu 4 detik. Jeda memberi waktu bagi yang sibuk untuk pulih.',
            ' adalah jeda tunggu yang digandakan setiap kali gagal: 1, 2, 4, lalu 8 detik. Jitter, yaitu sedikit waktu acak, mencegah banyak aplikasi mencoba ulang di detik yang sama. Batasi percobaan, misalnya 3 kali, supaya server tidak terus dibebani.',
          ),
        ],
      }),
      simStep(
        'telepon-sopan',
        t(
          'Ketuk "Jeda Bertahap" dan bandingkan dengan "Tanya Terus Tanpa Jeda".',
          'Bandingkan retry tanpa jeda dengan exponential backoff, lalu lihat server pulih.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'b08-l03-q1',
          type: 'analogy',
          prompt: t(
            'Mengapa menelepon teman yang sibuk tanpa jeda bukan cara baik?',
            'Mengapa mengulang request tiap 0,5 detik saat server kelelahan bukan cara baik?',
          ),
          choices: [
            { id: 'over', label: t('Teman jadi makin kewalahan', 'Server makin kewalahan dan tidak sempat pulih') },
            {
              id: 'fast',
              label: t('Teleponnya lebih cepat tersambung', 'Server memprioritaskan aplikasi yang paling sering mencoba'),
              explainWrong: t(
                'Menelepon lebih sering tidak mempercepat apa pun. Teman malah makin sibuk.',
                'Server tidak memberi prioritas pada peminta tersering. Beban justru bertambah.',
              ),
            },
            {
              id: 'css',
              label: t('Pulsa temanmu cepat habis', 'Request gagal tidak dihitung dalam batas jatah'),
              explainWrong: t(
                'Pulsa bukan masalahnya. Masalahnya teman yang kewalahan.',
                'Request gagal biasanya tetap dihitung dan bisa menyebabkan 429.',
              ),
            },
          ],
          answer: 'over',
          explainCorrect: t(
            'Telepon terus-menerus membuat teman makin sibuk. Jeda yang makin lama memberi waktu untuk pulih.',
            'Setiap retry menambah beban saat server sedang pulih. Jeda yang makin panjang memberi ruang bernapas.',
          ),
          hints: [t('Bayangkan temanmu mendengar telepon berdering terus.', 'Apa yang terjadi pada server yang sudah kewalahan?')],
          tags: ['backoff'],
        }),
      ),
      conceptStep({
        title: t('Kapan boleh mencoba lagi?', 'Retry hanya untuk gangguan sementara'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'kapan-retry' },
        alt: t(
          'Boleh coba lagi saat sinyal putus. Jangan saat alamat salah.',
          'Retry untuk putus jaringan, 429, 502, 503, 504; jangan retry 400, 401, 403, 404.',
        ),
        body: [
          rText(
            'Coba lagi kalau sinyal putus atau situs sedang sibuk. Jangan coba lagi kalau alamatnya salah. Hasilnya tetap sama.',
            'Lakukan retry hanya untuk gangguan sementara: sinyal putus, 429, 502, 503, atau 504. Jangan ulangi 400, 401, 403, atau 404, karena hasilnya tetap gagal.',
          ),
        ],
      }),
      qStep({
        id: 'b08-l03-q2',
        type: 'sort',
        prompt: t(
          'Kelompokkan masalah ini ke "Coba lagi" atau "Jangan ulang".',
          'Kelompokkan kondisi ini menjadi "Boleh retry" atau "Jangan retry".',
        ),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('Situs sedang sibuk sebentar', '503 Server sibuk sementara') },
          { id: 'i2', label: t('Alamat salah ketik', '404 Alamat endpoint salah ketik') },
          { id: 'i3', label: t('Nomor telepon kurang 1 angka', '400 Format data kiriman salah') },
          { id: 'i4', label: t('Sinyal putus sesaat', 'Koneksi internet terputus sesaat') },
        ],
        bins: [
          { id: 'yes', label: t('Coba lagi', 'Boleh retry (sementara)'), icon: 'clock' },
          { id: 'no', label: t('Jangan ulang', 'Jangan retry (hasil tetap)'), icon: 'lock' },
        ],
        answer: { i1: 'yes', i2: 'no', i3: 'no', i4: 'yes' },
        explainCorrect: t(
          'Masalah sementara bisa hilang kalau ditunggu. Alamat atau nomor yang salah tetap salah.',
          '503 dan koneksi putus bersifat sementara. 400 dan 404 tetap gagal walau diulang seratus kali.',
        ),
        hints: [t('Tanya: apakah masalahnya akan hilang sendiri?'), undefined],
        tags: ['backoff', 'status-code'],
      }),
      conceptStep({
        title: t('Aturan timeout'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'batas-timeout' },
        alt: t('Batas tunggu 10 detik agar aplikasi tidak macet menunggu jawaban selamanya.'),
        modes: ['pro'],
        body: [
          rText(
            'Timeout adalah batas waktu tunggu jawaban. Pasang timeout, misalnya 10 detik, supaya layar tidak membeku saat jaringan macet.',
          ),
        ],
      }),
      qStep(
        makeTf({
          id: 'b08-l03-q4',
          modes: ['pro'],
          prompt: t('Aplikasi sebaiknya menunggu jawaban server tanpa timeout supaya suatu saat pasti tersambung.'),
          answer: false,
          explainCorrect: t('Pernyataan itu keliru: tanpa timeout, layar bisa berputar terus tanpa kejelasan.'),
          explainWrong: t('Pasang timeout, misalnya 10 detik, lalu tampilkan pesan dan tombol coba lagi.'),
          hints: [t('Bayangkan pembeli menatap layar yang berputar tanpa akhir.')],
          tags: ['backoff'],
        }),
      ),
      limitStep({
        analogy: t('Menelepon teman yang sedang sibuk'),
        same: [t('Menunggu makin lama memberi teman waktu untuk selesai.')],
        different: [
          t(
            'Kamu menelepon 1 teman. Situs ditanya banyak HP sekaligus.',
            'Banyak aplikasi bisa gagal bersamaan, jadi perlu jitter (jeda acak kecil) agar tidak mencoba serentak.',
          ),
        ],
        riskyAnalogy: true,
      }),
      qStep({
        id: 'b08-l03-q3',
        type: 'order',
        prompt: t(
          'Urutkan jeda menelepon dari yang pertama sampai ketiga.',
          'Urutkan jeda exponential backoff dari kegagalan pertama sampai ketiga.',
        ),
        difficulty: 1,
        items: [
          { id: 'd4', label: t('Tunggu 4 detik', 'Tunggu sekitar 4 detik') },
          { id: 'd1', label: t('Tunggu 1 detik', 'Tunggu sekitar 1 detik') },
          { id: 'd2', label: t('Tunggu 2 detik', 'Tunggu sekitar 2 detik') },
        ],
        answer: ['d1', 'd2', 'd4'],
        explainCorrect: t(
          'Jedanya berlipat dua setiap kali: 1, 2, lalu 4 detik. Teman sempat pulih sedikit demi sedikit.',
          'Jeda berlipat dua setiap kegagalan: 1, 2, 4, lalu 8 detik. Server mendapat waktu pulih bertahap.',
        ),
        hints: [t('Ingat: makin sering gagal, makin lama menunggu.', 'Setiap jeda dua kali lipat jeda sebelumnya.'), undefined],
        tags: ['backoff'],
      }),
      qStep(
        makeMcq({
          id: 'b08-l03-q5',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Menelepon teman dengan jeda sopan'),
          prompt: t(
            'Banyak HP gagal bersamaan. Apa tambahan yang membantu?',
            'Banyak aplikasi gagal bersamaan. Tambahan apa yang dibutuhkan backoff, tetapi tidak perlu saat menelepon 1 teman?',
          ),
          choices: [
            { id: 'jit', label: t('Jeda acak kecil di tiap HP', 'Jitter, yaitu jeda acak kecil di tiap klien') },
            {
              id: 'wait',
              label: t('Menunggu makin lama setelah gagal', 'Jeda yang makin lama setelah tiap kegagalan'),
              explainWrong: t(
                'Jeda makin lama sudah ada pada telepon biasa. Itu kesamaannya.',
                'Jeda yang makin panjang sudah menjadi inti backoff. Itu kesamaan, bukan tambahan.',
              ),
            },
            {
              id: 'stop',
              label: t('Berhenti kalau nomornya salah', 'Berhenti mencoba kalau alamatnya memang salah'),
              explainWrong: t(
                'Berhenti saat nomor salah juga ada pada telepon. Itu kesamaannya.',
                'Berhenti pada alamat salah berlaku juga untuk telepon. Itu kesamaan, bukan tambahan.',
              ),
            },
          ],
          answer: 'jit',
          explainCorrect: t(
            'Jeda acak membuat tiap HP menelepon di waktu berbeda. Jadi tidak ada antrean mendadak.',
            'Jitter menyebarkan waktu retry antar aplikasi. Lalu lintas pun pulih tanpa lonjakan.',
          ),
          difficulty: 2,
          hints: [t('Pikirkan banyak HP yang menelepon di detik yang sama.', 'Apa yang terjadi kalau semua klien menunggu tepat 4 detik?')],
          tags: ['backoff'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l03-q6',
          type: 'scenario',
          story: t(
            'Rani belum masuk akun. Situs menjawab bahwa Rani belum boleh masuk. Aplikasinya terus mencoba lagi sampai 5 kali.',
            'Aplikasi Toko Rani menerima 401 (belum login) saat memanggil GET /pesanan. Programmernya menulis retry otomatis 5 kali dengan exponential backoff.',
          ),
          prompt: t('Mengapa mencoba lagi 5 kali itu keliru?', 'Mengapa strategi itu keliru?'),
          difficulty: 2,
          choices: [
            {
              id: 'no',
              label: t('Situs tetap menolak sebelum Rani masuk akun', '401 tetap muncul sampai aplikasi login atau memperbarui token'),
            },
            {
              id: 'five',
              label: t('Aplikasi harus mencoba lebih dari 5 kali', 'Retry 5 kali terlalu banyak untuk request GET biasa'),
              explainWrong: t(
                'Menambah percobaan tidak membantu. Jawabannya tetap sama.',
                'Jumlah percobaan bukan masalahnya. Status 401 tidak selesai lewat retry.',
              ),
            },
            {
              id: 'get',
              label: t('Aplikasi tidak boleh mengulang pertanyaan yang sama', 'Request GET tidak boleh diulang karena tidak bersifat idempotent'),
              explainWrong: t(
                'Mengulang pertanyaan boleh. Tetapi jawabannya tetap menolak.',
                'GET aman diulang, tetapi 401 tetap ditolak sebelum ada token sah.',
              ),
            },
          ],
          answer: 'no',
          explainCorrect: t(
            'Jawaban "belum boleh masuk" tidak berubah dengan mengulang. Rani harus masuk akun dulu.',
            '401 berarti aplikasi perlu login atau memperbarui token dulu. Mengulang request tidak mengubah hasilnya.',
          ),
          hints: [t('Apakah jawaban situs berubah kalau Rani belum masuk?', 'Apa yang membuat 401 hilang?')],
          tags: ['backoff', 'status-code'],
        }),
      ),
      qStep({
        id: 'b08-l03-q7',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi pasangan strategi ketahanan request di frontend:'),
        template: 'Tetapkan batas tunggu ___ (misalnya 10 detik), lalu retry gangguan sementara dengan ___ + jitter.',
        bank: ['timeout', 'exponential backoff', 'CORS', 'Base64'],
        answer: ['timeout', 'exponential backoff'],
        explainCorrect: t('Timeout membatasi waktu tunggu, dan exponential backoff dengan jitter menjarakkan retry.'),
        hints: [t('Satu istilah untuk waktu tunggu, satu untuk jeda yang bertambah.'), undefined],
        tags: ['backoff'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b08-l03-r1',
        prompt: t('Mana yang percuma dicoba lagi?', 'Status mana yang tidak boleh di-retry otomatis?'),
        choices: [
          { id: '400', label: t('Nomor telepon yang salah', '404 Not Found') },
          {
            id: '503',
            label: t('Telepon yang sedang sibuk', '503 Service Unavailable'),
            explainWrong: t(
              'Telepon sibuk biasanya kosong lagi sebentar. Boleh dicoba lagi.',
              '503 bersifat sementara, jadi retry dengan backoff masih masuk akal.',
            ),
          },
          {
            id: 'net',
            label: t('Sinyal yang putus sebentar', '429 Too Many Requests'),
            explainWrong: t(
              'Sinyal bisa kembali. Boleh dicoba lagi.',
              '429 menyuruh menunggu, jadi retry setelah jeda yang diminta itu wajar.',
            ),
          },
        ],
        answer: '400',
        explainCorrect: t(
          'Nomor yang salah tetap salah, sebanyak apa pun diulang. Perbaiki nomornya dulu.',
          '400, 401, 403, dan 404 disebabkan isi atau izin yang salah. Retry biasa tidak mengubah hasilnya.',
        ),
        hints: [t('Tanya: apakah masalahnya akan hilang sendiri?', 'Pikirkan error yang disebabkan isi atau izin.')],
        tags: ['backoff', 'status-code'],
      }),
      makeTf({
        id: 'b08-l03-r2',
        prompt: t(
          'Backoff artinya menunggu makin lama: 1 detik, 2 detik, lalu 4 detik.',
          'Exponential backoff menggandakan jeda tunggu setiap gagal, misalnya 1, 2, lalu 4 detik.',
        ),
        answer: true,
        explainCorrect: t(
          'Jeda yang makin lama memberi waktu untuk pulih. Itu cara menelepon yang sopan.',
          'Jeda yang makin panjang memberi server waktu pulih.',
        ),
        explainWrong: t('Ingat: jedanya makin lama, bukan makin pendek.', 'Ingat pola berlipat dua pada exponential backoff.'),
        hints: [t('Ingat telepon teman yang sibuk.')],
        tags: ['backoff'],
      }),
    ],
    recap: t(
      'Coba lagi hanya untuk masalah sementara, dan beri jeda makin lama.',
      'Pasang timeout, retry hanya untuk error sementara (429, 5xx, jaringan), dan beri jeda exponential backoff dengan jitter.',
    ),
    companion: {
      talkPrompts: ['Mengapa menelepon teman sibuk lebih sopan dengan jeda makin lama?'],
      offlineActivity:
        'Berlatih jeda dengan tepuk tangan. Tunggu 1 detik, tepuk! Tunggu 2 detik, tepuk! Tunggu 4 detik, tepuk! Rasakan jedanya makin longgar.',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // b08-l04 (khusus Pro)
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'b08-l04',
    worldId: 'b08',
    title: 'Idempotency key: nomor nota',
    modes: ['pro'],
    objective: t('Kamu bisa menjelaskan mengapa POST bisa menagih ganda saat retry, dan bagaimana Idempotency-Key mencegahnya.'),
    estMinutes: 5,
    introducesTerms: ['idempotency-key'],
    usesTerms: ['idempotent', 'http-method', 'header-body', 'backoff', 'server', 'frontend'],
    stickerId: 'nomor-nota',
    atWork: 'Kamu akan menambahkan header Idempotency-Key ke request pembayaran saat tombol Bayar bisa terkirim dua kali.',
    warmupFrom: 'b08-l03',
    steps: [
      storyStep('b08/nomor-nota.svg', [
        rText(
          'Pembeli di Toko Rani menekan Bayar, tetapi sinyal putus dan aplikasi mengirim ulang pembayarannya. Kasir yang menerima nota bernomor 0451 dua kali tahu itu transaksi yang sama, jadi tidak menagih dua kali.',
        ),
      ]),
      conceptStep({
        title: t('Masalah retry pada POST'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'masalah-post-ganda' },
        alt: t('Request POST pertama sudah diproses server, tetapi balasannya putus, jadi aplikasi mengirim ulang.'),
        body: [
          rCode('POST'),
          rText(' tidak bersifat '),
          rTerm('idempotent', 'idempotent'),
          rText(
            ', yaitu mengulangnya bisa mengubah hasil. Misalnya request pembayaran sudah sampai di server, tetapi balasannya hilang karena sinyal putus. Kalau aplikasi mengirim ulang, pembeli bisa tertagih dua kali.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b08-l04-q2',
          type: 'why',
          base: 'Menonaktifkan tombol "Bayar" saja belum cukup untuk mencegah pembayaran ganda.',
          prompt: t('Tombol Bayar sudah dinonaktifkan setelah diketuk. Mengapa pembayaran ganda masih bisa terjadi?'),
          choices: [
            { id: 'net', label: t('Sinyal putus membuat request yang sama terkirim ulang') },
            {
              id: 'css',
              label: t('Browser menyimpan hasil pembayaran lama di cache'),
              explainWrong: t('Cache menyimpan jawaban GET, bukan efek pembayaran. Penyebabnya retry saat sinyal putus.'),
            },
            {
              id: 'get',
              label: t('Server selalu memproses setiap request POST dua kali secara otomatis'),
              explainWrong: t('POST hanya diproses satu kali per request. Masalah muncul kalau request itu terkirim ulang.'),
            },
          ],
          answer: 'net',
          explainCorrect: t(
            'Tombol nonaktif hanya mencegah klik ganda dari manusia. Retry otomatis akibat sinyal putus tetap bisa mengirim request kedua.',
          ),
          hints: [t('Pikirkan pengiriman ulang yang tidak dilakukan manusia.')],
          tags: ['idempotency-key', 'frontend', 'server'],
        }),
      ),
      conceptStep({
        title: t('Solusi: header Idempotency-Key'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'header-idempotency-key' },
        alt: t('Aplikasi membuat UUID unik di header Idempotency-Key untuk satu niat transaksi.'),
        code: {
          lang: 'http',
          code: 'POST /pembayaran\nIdempotency-Key: 6f1c2b9e-8d3a-4e7f-9b21-0c5d8a7e4f10\n{ "pesanan_id": 88, "jumlah": 150000 }',
        },
        body: [
          rText('Aplikasi membuat kode unik untuk satu niat transaksi, disebut '),
          rTerm('idempotency-key', 'Idempotency-Key'),
          rText(
            ', lalu menaruhnya di header. Server mencatat kode itu. Kalau kode yang sama datang lagi, server mengembalikan hasil awal tanpa memproses ulang.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b08-l04-q1',
          type: 'analogy',
          prompt: t('Dalam analogi kasir, apa fungsi utama Idempotency-Key di POST /pembayaran?'),
          choices: [
            { id: 'nota', label: t('Nomor nota agar transaksi tidak diproses ganda') },
            {
              id: 'pw',
              label: t('Tanda pengenal bahwa pembeli sudah login ke toko'),
              explainWrong: t('Idempotency-Key tidak membuktikan siapa pembelinya. Ia hanya mengenali satu transaksi.'),
            },
            {
              id: 'css',
              label: t('Nomor urut antrean pembayaran di sisi kasir'),
              explainWrong: t('Kunci ini tidak mengatur urutan antrean. Ia hanya mengenali transaksi yang sama.'),
            },
          ],
          answer: 'nota',
          explainCorrect: t('Kalau nota yang sama datang dua kali, server cukup mengembalikan hasil transaksi pertama.'),
          hints: [t('Ingat kasir yang menerima nota 0451 dua kali.')],
          tags: ['idempotency-key', 'idempotent'],
        }),
      ),
      conceptStep({
        title: t('Pasangan wajib di tampilan'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'disable-tombol-bayar' },
        alt: t('Nonaktifkan tombol Bayar saat proses berlangsung dan tampilkan Memproses.'),
        body: [
          rText('Selain '),
          rTerm('idempotency-key', 'Idempotency-Key'),
          rText(', cegah klik ganda di layar: nonaktifkan tombol Bayar segera setelah ditekan dan tampilkan status "Memproses".'),
        ],
      }),
      limitStep({
        analogy: t('Nomor nota kasir 0451'),
        same: [t('Satu nomor menandai satu transaksi, jadi struk yang datang dua kali tidak ditagih ulang.')],
        different: [
          t('Pembelian baru yang disengaja, misalnya 5 menit kemudian, wajib memakai Idempotency-Key baru.'),
        ],
        riskyAnalogy: false,
      }),
      qStep({
        id: 'b08-l04-q3',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi request pembayaran agar aman saat jaringan terputus lalu dikirim ulang.'),
        template: 'POST /pembayaran\n___: 6f1c2b9e-8d3a-4e7f-9b21-0c5d8a7e4f10\n{ "pesanan_id": ___, "jumlah": 150000 }',
        bank: ['Idempotency-Key', '88', 'Authorization', '0451'],
        answer: ['Idempotency-Key', '88'],
        explainCorrect: t('Header Idempotency-Key mengenali transaksi yang sama, dan body membawa nomor pesanan 88. Nomor 0451 hanya nota kasir di cerita.'),
        hints: [t('Header mana yang mengenali transaksi yang sama?'), undefined],
        tags: ['idempotency-key', 'header-body'],
      }),
      qStep(
        makeTf({
          id: 'b08-l04-q4',
          prompt: t('Pembeli memesan kopi kedua sebagai transaksi baru. Aplikasi harus memakai Idempotency-Key yang sama dengan kopi pertama.'),
          answer: false,
          explainCorrect: t('Pernyataan itu keliru: transaksi baru wajib memakai Idempotency-Key baru.'),
          explainWrong: t('Kunci lama membuat server mengira itu pengulangan, jadi kopi kedua tidak diproses.'),
          hints: [t('Apakah kopi kedua pengulangan atau pesanan baru?')],
          tags: ['idempotency-key'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l04-q5',
          type: 'limit',
          analogy: t('Nomor nota kasir 0451'),
          prompt: t('Kapan aturan "kunci sama mengembalikan hasil lama" menjadi masalah?'),
          choices: [
            { id: 'reuse', label: t('Frontend memakai satu kunci tetap untuk dua transaksi berbeda') },
            {
              id: 'retry',
              label: t('Retry jaringan mengirim ulang kunci yang sama untuk satu pembayaran'),
              explainWrong: t('Untuk satu pembayaran yang sama, kunci yang sama justru wajib dipakai.'),
            },
            {
              id: 'uniq',
              label: t('Setiap transaksi baru diberi UUID baru'),
              explainWrong: t('UUID baru untuk setiap transaksi baru adalah cara yang benar.'),
            },
          ],
          answer: 'reuse',
          explainCorrect: t('Satu kunci tetap membuat transaksi kedua dianggap pengulangan. Buat kunci baru untuk setiap niat transaksi.'),
          difficulty: 2,
          hints: [t('Kapan dua transaksi berbeda memakai nomor nota yang sama?')],
          tags: ['idempotency-key', 'frontend'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l04-q6',
          type: 'scenario',
          story: t(
            'Rani menekan Bayar di kereta malam. Request POST /pembayaran dengan kunci abc-123 sudah sampai, tetapi sinyal terowongan memutus balasan, jadi aplikasi mengirim ulang request yang sama.',
          ),
          prompt: t('Apa yang dilakukan server pembayaran yang benar?'),
          difficulty: 2,
          choices: [
            { id: 'same', label: t('Mengembalikan hasil pertama tanpa memotong saldo lagi') },
            {
              id: 'double',
              label: t('Memotong saldo lagi karena method-nya POST'),
              explainWrong: t('Itulah yang dicegah oleh pencatatan kunci di server. Method POST saja tidak cukup mengenali pengulangan.'),
            },
            {
              id: '404',
              label: t('Membatalkan transaksi pertama lalu memproses dari awal'),
              explainWrong: t('Transaksi pertama sudah sah dan tidak perlu dibatalkan. Server cukup mengembalikan hasilnya.'),
            },
          ],
          answer: 'same',
          explainCorrect: t('Saldo hanya terpotong sekali walaupun request masuk dua kali. Server mengenali kunci abc-123 dan mengembalikan jawaban lama.'),
          hints: [t('Kunci yang sama berarti transaksi yang sama.')],
          tags: ['idempotency-key', 'idempotent'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b08-l04-r1',
        prompt: t('Mengapa POST pembayaran membutuhkan Idempotency-Key?'),
        choices: [
          { id: 'safe', label: t('POST tidak idempotent, jadi retry bisa menagih ganda') },
          {
            id: 'cache',
            label: t('Agar hasil pembayaran tersimpan di cache browser'),
            explainWrong: t('Cache browser tidak terlibat. Server yang menyimpan hasil sesuai kunci itu.'),
          },
          {
            id: 'auth',
            label: t('Agar server tahu siapa pembeli yang sedang login'),
            explainWrong: t('Login dibuktikan lewat token, bukan Idempotency-Key.'),
          },
        ],
        answer: 'safe',
        explainCorrect: t('Kunci membuat POST aman saat dikirim ulang karena sinyal putus.'),
        hints: [t('Pikirkan apa yang terjadi kalau POST dikirim dua kali.')],
        tags: ['idempotency-key', 'http-method'],
      }),
      makeTf({
        id: 'b08-l04-r2',
        prompt: t('Menonaktifkan tombol setelah ditekan membantu mencegah klik ganda dari pembeli.'),
        answer: true,
        explainCorrect: t('Tombol nonaktif melengkapi Idempotency-Key di sisi tampilan.'),
        explainWrong: t('Tombol nonaktif dan header teknis saling melengkapi untuk mencegah transaksi ganda.'),
        tags: ['idempotency-key', 'frontend'],
      }),
    ],
    recap: t('POST pembayaran perlu Idempotency-Key unik per transaksi supaya aman saat dikirim ulang. Nonaktifkan juga tombol Bayar.'),
  }),

  // ---------------------------------------------------------------------------------------------
  // b08-l05 (khusus Pro)
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'b08-l05',
    worldId: 'b08',
    title: 'Celah API paling umum',
    modes: ['pro'],
    objective: t('Kamu bisa mengenali celah BOLA/IDOR, Mass Assignment, dan kebocoran data, lalu mencegahnya di server.'),
    estMinutes: 6,
    introducesTerms: ['bola-idor'],
    usesTerms: ['api', 'server', 'autentikasi', 'rate-limit', 'cors', 'https', 'rahasia-frontend', 'signature-webhook'],
    atWork: 'Kamu akan menguji API dengan Postman: ganti nomor di alamat dan lihat apakah data orang lain terbuka.',
    warmupFrom: 'b08-l04',
    steps: [
      storyStep('b08/bola-idor.svg', [
        rText('Rani membuka /pesanan/88 miliknya, lalu iseng mengganti angka menjadi /pesanan/89. Struk belanja orang lain terbuka.'),
      ]),
      conceptStep({
        title: t('BOLA/IDOR dan hak fungsi'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'bola-idor' },
        alt: t('Celah BOLA/IDOR membuat orang lain membuka objek milikmu karena server tidak mengecek pemilik.'),
        body: [
          rTerm('bola-idor', 'BOLA atau IDOR'),
          rText(' adalah celah saat server lupa mengecek apakah '),
          rCode('/pesanan/89'),
          rText(' milik akun yang login. Hak fungsi sensitif seperti '),
          rCode('DELETE /admin/akun/5'),
          rText(' juga harus dicek perannya di server, bukan hanya disembunyikan tombolnya. OWASP API Security Top 10 merangkum celah seperti ini.'),
        ],
      }),
      qStep({
        id: 'b08-l05-q3',
        type: 'spotbug',
        difficulty: 2,
        prompt: t('Ketuk baris yang membuat endpoint rentan BOLA/IDOR karena tidak mengecek pemilik pesanan.'),
        lines: [
          'app.get("/pesanan/:id", wajibLogin, async (req, res) => {',
          '  const data = await db.pesanan.findUnique({ where: { id: req.params.id } });',
          '  return res.json(data);',
          '});',
        ],
        answer: [2],
        explainCorrect: t(
          'Baris 2 mencari pesanan hanya dari id, tanpa memeriksa pemiliknya. Tambahkan pengecekan data.pemilikId === req.user.id.',
        ),
        hints: [t('Cari baris yang mengambil data tanpa bertanya milik siapa.'), undefined],
        tags: ['bola-idor', 'server'],
      }),
      conceptStep({
        title: t('Kebocoran data dan mass assignment'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'mass-assignment' },
        alt: t('Jangan kirim kolom rahasia seperti hash sandi di JSON, dan batasi kolom input dengan daftar putih.'),
        body: [
          rText(
            'Jangan kirim kolom sensitif seperti hash kata sandi di JSON. Menyembunyikannya di tampilan tidak cukup, karena kolomnya tetap terlihat di tab Network. Pada edit profil, mass assignment terjadi saat penyerang menyelipkan ',
          ),
          rCode('"role": "admin"'),
          rText(' di body. Cegah dengan daftar putih kolom yang boleh diubah.'),
        ],
      }),
      qStep({
        id: 'b08-l05-q1',
        type: 'match',
        prompt: t('Pasangkan celah OWASP API dengan contoh kejadiannya.'),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('BOLA / IDOR') },
          { id: 'l2', label: t('Mass Assignment') },
          { id: 'l3', label: t('Kebocoran data berlebih') },
          { id: 'l4', label: t('Hak fungsi tidak dicek') },
        ],
        right: [
          { id: 'r1', label: t('Mengganti /pesanan/88 ke /pesanan/89 membuka data orang lain') },
          { id: 'r2', label: t('Menyelipkan "role": "admin" di body edit profil') },
          { id: 'r3', label: t('API mengirim hash kata sandi walau tidak tampil di layar') },
          { id: 'r4', label: t('Akun biasa memanggil DELETE /admin/akun/5 lewat Postman') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
        explainCorrect: t('Setiap celah punya pola sendiri: ID diganti, kolom diselipkan, kolom sensitif ikut terkirim, dan peran tidak dicek. OWASP 2023 menggabungkan kebocoran data dan mass assignment dalam satu kelompok.'),
        hints: [t('Cocokkan kata kunci: ID, role, hash, admin.'), undefined],
        tags: ['bola-idor', 'api'],
      }),
      conceptStep({
        title: t('Daftar periksa keamanan API'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b08', topic: 'checklist-keamanan-api' },
        alt: t('Prinsip utama: jangan percaya client; semua pemeriksaan keamanan dilakukan di server.'),
        body: [
          rText('Prinsip utamanya: jangan percaya client, karena siapa pun bisa memanggil API lewat Postman. Di server, cek pemilik data, cek peran, dan terima hanya kolom dari daftar putih. Pasang juga '),
          rTerm('rate-limit', 'rate limit'),
          rText(' di endpoint mahal seperti login dan OTP.'),
        ],
      }),
      limitStep({
        analogy: t('Mengganti nomor pintu /pesanan/88 ke /pesanan/89'),
        same: [t('Cukup mengganti angka ID di URL bisa membuka data orang lain, kalau pemilik tidak dicek.')],
        different: [
          t('Penyerang memakai skrip atau Postman untuk mencoba banyak ID dalam hitungan detik, dan menyelipkan kolom tambahan di JSON.'),
        ],
        riskyAnalogy: false,
      }),
      qStep({
        id: 'b08-l05-q2',
        type: 'sort',
        prompt: t('Kelompokkan tindakan ini menjadi "Dikerjakan di server" atau "Hanya di tampilan".'),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('Menyembunyikan tombol Hapus Admin dengan CSS display: none') },
          { id: 'i2', label: t('Memeriksa userId pemilik pesanan di server sebelum mengirim data') },
          { id: 'i3', label: t('Server membuang kolom passwordHash sebelum mengirim JSON') },
          { id: 'i4', label: t('Menyaring kolom gaji di tampilan setelah seluruh objek diterima') },
        ],
        bins: [
          { id: 'safe', label: t('Dikerjakan di server') },
          { id: 'bad', label: t('Hanya di tampilan') },
        ],
        answer: { i1: 'bad', i2: 'safe', i3: 'safe', i4: 'bad' },
        explainCorrect: t(
          'Semua yang sampai ke browser terlihat di tab Network. Tombol yang disembunyikan tetap bisa dipanggil lewat Postman.',
        ),
        hints: [t('Tanya: apakah penyerang masih bisa melihat atau memanggilnya?'), undefined],
        tags: ['bola-idor', 'server'],
      }),
      qStep(
        makeTf({
          id: 'b08-l05-q4',
          prompt: t('Menu admin sudah disembunyikan dari tampilan, jadi DELETE /admin/akun/5 aman tanpa cek peran di server.'),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru: siapa pun bisa memanggil endpoint admin langsung lewat Postman atau curl. Cek peran di server tetap wajib.',
          ),
          explainWrong: t('Jangan percaya client. Menyembunyikan tombol tidak melindungi endpoint di server.'),
          hints: [t('Apakah penyerang harus memakai tombolnya?')],
          tags: ['bola-idor', 'autentikasi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l05-q5',
          type: 'limit',
          analogy: t('Mengganti nomor pintu /pesanan/88 ke /pesanan/89'),
          prompt: t('Mengapa menguji keamanan API hanya dengan mengklik tampilan browser tidak membuktikan API aman?'),
          choices: [
            { id: 'tool', label: t('Penyerang mengubah URL dan JSON langsung lewat Postman') },
            {
              id: 'num',
              label: t('Setiap pesanan punya nomor ID unik yang mudah ditebak urutannya'),
              explainWrong: t('ID unik itu wajar. Bahayanya muncul kalau pemilik ID tidak dicek.'),
            },
            {
              id: 'url',
              label: t('URL memakai path parameter yang terlihat jelas di browser'),
              explainWrong: t('Path parameter normal dipakai di REST. Yang wajib dicek adalah pemilik datanya.'),
            },
          ],
          answer: 'tool',
          explainCorrect: t('Penyerang tidak memakai tombol. Server wajib memeriksa input, pemilik data, dan peran di setiap request.'),
          difficulty: 2,
          hints: [t('Bayangkan penyerang yang tidak pernah membuka halaman webmu.')],
          tags: ['bola-idor', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b08-l05-q6',
          type: 'scenario',
          story: t(
            'Endpoint kirim OTP Toko Rani tidak punya batas jumlah. Sebuah skrip memanggil POST /kirim-otp 50.000 kali dalam satu jam, dan tagihan SMS melonjak.',
          ),
          prompt: t('Pencegahan apa yang tepat di sisi server?'),
          choices: [
            { id: 'rl', label: t('Pasang rate limit ketat per akun atau IP di endpoint OTP') },
            {
              id: 'hide',
              label: t('Ubah tombol Kirim OTP menjadi abu-abu lewat CSS'),
              explainWrong: t('Skrip memanggil endpoint langsung tanpa menekan tombol. Warna tombol tidak mengubah apa pun.'),
            },
            {
              id: 'err',
              label: t('Minta pembeli menunggu 5 detik di layar sebelum menekan lagi'),
              explainWrong: t('Penundaan di layar bisa dilewati skrip. Batas harus dipasang di server.'),
            },
          ],
          answer: 'rl',
          explainCorrect: t(
            'Rate limit membatasi panggilan per akun atau IP, bagaimanapun skripnya dijalankan. Endpoint mahal seperti OTP dan login wajib dipagari.',
          ),
          hints: [t('Di mana skrip bisa dihentikan tanpa menekan tombol?')],
          tags: ['rate-limit', 'server'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b08-l05-r1',
        prompt: t('Apa nama celah saat orang membuka data orang lain dengan mengganti angka ID di URL?'),
        choices: [
          { id: 'bola', label: t('BOLA atau IDOR') },
          {
            id: 'cors',
            label: t('Mass Assignment'),
            explainWrong: t('Mass Assignment menyelipkan kolom tambahan saat edit data, bukan mengganti nomor di alamat.'),
          },
          {
            id: 'leak',
            label: t('Kebocoran data berlebih'),
            explainWrong: t('Kebocoran data berlebih terjadi saat respons memuat kolom yang tidak perlu.'),
          },
        ],
        answer: 'bola',
        explainCorrect: t('Cegah BOLA dengan memeriksa pemilik objek di setiap request.'),
        tags: ['bola-idor'],
      }),
      makeMcq({
        id: 'b08-l05-r2',
        prompt: t('Bagaimana server mencegah Mass Assignment saat edit profil?'),
        choices: [
          { id: 'wl', label: t('Hanya menerima daftar kolom yang boleh diubah') },
          {
            id: 'ui',
            label: t('Menghapus kotak input role dari HTML'),
            explainWrong: t('Penyerang tetap bisa menambahkan role lewat Postman atau DevTools.'),
          },
          {
            id: 'enc',
            label: t('Mengenkripsi seluruh body sebelum dikirim'),
            explainWrong: t('Enkripsi tidak mengecek kolom mana yang boleh diubah.'),
          },
        ],
        answer: 'wl',
        explainCorrect: t('Daftar putih memastikan kolom sensitif seperti role atau saldo tidak ikut tersimpan.'),
        tags: ['bola-idor', 'server'],
      }),
    ],
    recap: t('Jangan percaya client. Server harus mengecek pemilik data, peran, dan kolom yang boleh diubah, serta memasang batas jumlah.'),
  }),
];
