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
import type { Lesson, Mode, Rich, World } from '@/content/schema';

/** Istilah yang hanya tampil di satu mode, supaya jalur Junior dan Pro tetap terpisah (copydeck 7.2). */
const rTermIn = (mode: Mode, termId: string, text: string): Rich => ({
  t: 'term',
  termId,
  v: t(text),
  modes: [mode],
});

export const world: World = {
  id: 'b07',
  track: 'B',
  order: 7,
  title: 'Gerbang Login',
  tagline: t(
    'Bedakan KTP, kartu kamar, dan gelang konser. Masing-masing punya tugas sendiri.',
    'Kamu bisa membedakan login dari izin akses, lalu menjelaskan cara kerja token dan OAuth.',
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
      'Halo! Ayo buktikan kamu tahu cara membuka gerbang login dengan aman.',
      'Jawab soal tentang autentikasi dan JWT. Lalu buktikan pahammu soal OAuth.',
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
        prompt: t('Petugas hotel memeriksa KTP-mu. Itu mirip cek apa?'),
        choices: [
          { id: 'authn', label: t('Cek siapa kamu') },
          {
            id: 'authz',
            label: t('Cek pintu yang boleh dibuka'),
            explainWrong: t('Itu tugas kartu kamar. Petugas memeriksa KTP untuk tahu siapa kamu.'),
          },
          {
            id: 'css',
            label: t('Cek kamar masih kosong'),
            explainWrong: t('Kamar kosong atau penuh itu urusan pemesanan. KTP menunjukkan siapa kamu.'),
          },
        ],
        answer: 'authn',
        explainCorrect: t('KTP membuktikan siapa kamu. Cek seperti itu bernama autentikasi.'),
        tags: ['autentikasi'],
      }),
      makeAnchorMcq({
        id: 'b07-anc-j2',
        prompt: t('Kartu kamar 305 tidak bisa membuka kamar 306. Itu cek apa?'),
        choices: [
          { id: 'authz', label: t('Cek pintu yang boleh dibuka') },
          {
            id: 'authn',
            label: t('Cek siapa kamu'),
            explainWrong: t('Itu cek KTP di awal. Kartu kamar bekerja sesudahnya.'),
          },
          {
            id: 'wh',
            label: t('Cek kartunya masih berlaku'),
            explainWrong: t('Kartu itu masih berlaku. Ia hanya cocok dengan satu pintu.'),
          },
        ],
        answer: 'authz',
        explainCorrect: t('Kartu kamar menentukan pintu mana yang boleh kamu buka. Itu namanya otorisasi.'),
        tags: ['autentikasi'],
      }),
      makeAnchorMcq({
        id: 'b07-anc-j3',
        prompt: t('Mengapa sandi tidak boleh ditulis di gelang konser?'),
        choices: [
          { id: 'read', label: t('Semua orang bisa membaca tulisannya') },
          {
            id: 'long',
            label: t('Tulisan di gelang cepat memudar'),
            explainWrong: t('Masalahnya bukan tulisan yang pudar. Masalahnya semua orang bisa membacanya.'),
          },
          {
            id: 'del',
            label: t('Gelang bisa hilang di jalan'),
            explainWrong: t('Gelang hilang itu lain soal. Rahasia di gelang bisa diintip siapa saja.'),
          },
        ],
        answer: 'read',
        explainCorrect: t('Siapa saja bisa membaca gelang. Jadi jangan tulis rahasia di sana.'),
        tags: ['jwt'],
      }),
      makeAnchorMcq({
        id: 'b07-anc-j4',
        prompt: t('Seseorang memalsukan tulisan di gelang konser. Bagian mana yang ketahuan tidak cocok?'),
        choices: [
          { id: 'sig', label: t('Cap hologram di gelang') },
          {
            id: 'color',
            label: t('Jenis gelang'),
            explainWrong: t('Jenis gelang mudah ditiru. Penjaga memeriksa cap hologramnya.'),
          },
          {
            id: 'url',
            label: t('Bentuk huruf tulisannya'),
            explainWrong: t('Bentuk huruf mudah ditiru. Cap hologram yang sulit dipalsukan.'),
          },
        ],
        answer: 'sig',
        explainCorrect: t('Cap hologram sulit ditiru. Kalau tulisan diubah, capnya tidak cocok lagi.'),
        tags: ['jwt'],
      }),
      makeAnchorMcq({
        id: 'b07-anc-j5',
        prompt: t('Kamu belum membuktikan siapa dirimu. Penjaga menjawab dengan angka apa?'),
        choices: [
          { id: 'c401', label: t('401, belum dikenali') },
          {
            id: 'c200',
            label: t('200, berhasil'),
            explainWrong: t('Angka 200 artinya berhasil. Kamu belum diterima.'),
          },
          {
            id: 'c404',
            label: t('404, tidak ketemu'),
            explainWrong: t('Angka 404 artinya barang tidak ketemu. Kamu hanya belum dikenali.'),
          },
        ],
        answer: 'c401',
        explainCorrect: t('Angka 401 artinya penjaga belum tahu siapa kamu.'),
        tags: ['autentikasi', 'status-code'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'b07-anc-p1',
        prompt: t('Pasangan status HTTP mana yang tepat untuk gagal login dan gagal izin?'),
        choices: [
          { id: 'ok', label: t('Belum login: 401. Sudah login, tetapi dilarang: 403') },
          {
            id: 'swap',
            label: t('Belum login: 403. Sudah login, tetapi dilarang: 401'),
            explainWrong: t('Angkanya tertukar. 401 untuk identitas yang belum terbukti, 403 untuk akses yang dilarang.'),
          },
          {
            id: 'both',
            label: t('Keduanya memakai 400 Bad Request'),
            explainWrong: t('Status 400 berarti permintaan salah bentuk. Gagal login dan gagal izin punya status sendiri.'),
          },
        ],
        answer: 'ok',
        explainCorrect: t('401 Unauthorized berarti identitas belum terbukti. 403 Forbidden berarti sudah login, tetapi dilarang mengakses.'),
        tags: ['autentikasi', 'status-code'],
      }),
      makeAnchorMcq({
        id: 'b07-anc-p2',
        prompt: t('Mengapa kunci rahasia tidak boleh ditaruh di kode frontend?'),
        choices: [
          { id: 'dev', label: t('Siapa saja bisa membuka kode frontend lewat DevTools') },
          {
            id: 'slow',
            label: t('JavaScript tidak bisa mengirim header x-api-key'),
            explainWrong: t('JavaScript bisa mengirim header apa pun. Masalahnya kunci itu terlihat oleh semua orang.'),
          },
          {
            id: 'cors',
            label: t('Kunci yang panjang membuat halaman lambat dimuat'),
            explainWrong: t('Panjang kunci tidak berpengaruh pada kecepatan. Masalahnya kunci itu mudah dicuri.'),
          },
        ],
        answer: 'dev',
        explainCorrect: t('Simpan kunci rahasia di server. Kode frontend terbuka untuk setiap pengunjung.'),
        tags: ['api-key', 'rahasia-frontend'],
      }),
      makeAnchorMcq({
        id: 'b07-anc-p3',
        prompt: t('Apa kerugian JWT dibanding session saat akun harus di-logout paksa sekarang juga?'),
        choices: [
          { id: 'rev', label: t('JWT sulit dibatalkan sebelum waktu exp habis') },
          {
            id: 'enc',
            label: t('JWT harus dicek ke database di setiap request'),
            explainWrong: t('Justru JWT bisa diperiksa tanpa database. Kelemahannya ada pada pembatalan token.'),
          },
          {
            id: 'size',
            label: t('JWT tidak bisa memuat peran pemakai'),
            explainWrong: t('JWT bisa memuat peran. Kelemahannya, token tetap berlaku sampai exp berakhir.'),
          },
        ],
        answer: 'rev',
        explainCorrect: t('Server tidak menyimpan daftar sesi JWT. Token tetap valid sampai exp berakhir, kecuali ada daftar blokir.'),
        tags: ['jwt'],
      }),
      makeAnchorMcq({
        id: 'b07-anc-p4',
        prompt: t('Di mana token berumur panjang bisa disimpan agar nilainya tidak dapat dibaca JavaScript?'),
        choices: [
          { id: 'http', label: t('Di cookie HttpOnly yang tidak bisa dibaca JavaScript') },
          {
            id: 'ls',
            label: t('Di localStorage agar mudah dibaca aplikasi'),
            explainWrong: t('localStorage bisa dibaca JavaScript. Skrip XSS ikut bisa mencurinya.'),
          },
          {
            id: 'html',
            label: t('Di variabel JavaScript global'),
            explainWrong: t('Variabel global bisa dibaca skrip apa pun di halaman, termasuk skrip XSS.'),
          },
        ],
        answer: 'http',
        explainCorrect: t('HttpOnly mencegah JavaScript membaca nilai cookie. Browser tetap bisa mengirim cookie pada permintaan yang sesuai.'),
        tags: ['refresh-token', 'cookie-cache'],
      }),
      makeAnchorMcq({
        id: 'b07-anc-p5',
        prompt: t('Apa peran PKCE dalam alur OAuth 2.0 Authorization Code?'),
        choices: [
          { id: 'pkce', label: t('Aplikasi membuat rahasia acak di awal, lalu menunjukkannya lagi saat menukar kode', 'Penukar kode harus membuktikan rahasia acak dari awal') },
          {
            id: 'pass',
            label: t('Mengirim kata sandi asli ke server aplikasi lain'),
            explainWrong: t('OAuth justru mencegah kata sandi sampai ke aplikasi lain. PKCE melindungi pertukaran kode.'),
          },
          {
            id: 'img',
            label: t('Mengganti access token dengan cookie sesi'),
            explainWrong: t('PKCE tidak mengganti token. Ia memastikan hanya peminta asli yang bisa menukar kode.'),
          },
        ],
        answer: 'pkce',
        explainCorrect: t('PKCE melindungi pertukaran kode dari penyadapan. Kode curian tidak bisa ditukar menjadi token.'),
        tags: ['oauth'],
      }),
      makeAnchorMcq({
        id: 'b07-anc-p6',
        type: 'limit',
        analogy: t('JWT seperti gelang konser berhologram'),
        prompt: t('Apa batas penting analogi gelang konser berhologram saat dipakai pada JWT sungguhan?'),
        choices: [
          { id: 'rev', label: t('Gelang bisa digunting petugas, JWT tetap berlaku sampai exp habis') },
          {
            id: 'dec',
            label: t('Tulisan di gelang bisa dibaca siapa saja'),
            explainWrong: t('Tulisan gelang dan isi JWT bertanda tangan pada contoh ini sama-sama dapat dibaca oleh pemegangnya.'),
          },
          {
            id: 'holo',
            label: t('Penjaga bisa memeriksa keaslian gelang dari cap hologramnya'),
            explainWrong: t('Itu kesamaan, bukan batas. Signature JWT juga membuktikan keaslian.'),
          },
        ],
        answer: 'rev',
        explainCorrect: t('Gelang fisik bisa digunting kapan saja. JWT sulit dibatalkan sebelum exp habis, kecuali ada daftar blokir.'),
        tags: ['jwt'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'b07-l01',
    worldId: 'b07',
    title: '“Kamu siapa?” dan “Kamu boleh apa?”',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan cek identitas dan cek izin.',
      'Kamu bisa membedakan autentikasi dari otorisasi, serta status 401 dari 403.',
    ),
    estMinutes: 6,
    introducesTerms: ['autentikasi'],
    usesTerms: ['api', 'server', 'status-code'],
    stickerId: 'kartu-hotel',
    warmupFrom: 'b06-l03',
    atWork: 'Kamu akan melihat status 401 dan 403 di tab Network DevTools saat halaman admin menolak akses.',
    steps: [
      storyStep('b07/kartu-hotel.svg', [
        rText(
          'Kamu menginap di hotel. Petugas melihat KTP-mu, lalu memberi kartu kamar. Mengapa ada dua langkah?',
          'Pembeli Toko Rani sudah login, tetapi masih bisa membuka halaman admin. Pemeriksaan apa yang terlewat?',
        ),
      ]),
      conceptStep({
        title: t('Kamu siapa?', 'Autentikasi (AuthN)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'autentikasi-ktp' },
        alt: t('Petugas hotel memeriksa KTP untuk memastikan identitas tamu.'),
        body: [
          rTerm('autentikasi', 'Autentikasi', 'Autentikasi (AuthN)'),
          rText(
            ' artinya membuktikan siapa kamu. Seperti petugas hotel yang memeriksa KTP-mu. Kata sandi juga begitu.',
            ' adalah cara membuktikan siapa kamu, misalnya dengan kata sandi, kode OTP (kode sekali pakai), atau sidik jari.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b07-l01-q1',
          type: 'analogy',
          prompt: t(
            'Kamu mengetik kata sandi untuk masuk ke akun. Itu mirip apa di hotel?',
            'Mengetik kata sandi dan kode OTP saat login sama dengan apa di hotel?',
          ),
          choices: [
            { id: 'ktp', label: t('Menunjukkan KTP ke petugas', 'Menunjukkan KTP di meja check-in') },
            {
              id: 'kamar',
              label: t('Membuka pintu dengan kartu kamar', 'Menempelkan kartu ke pintu kamar 305'),
              explainWrong: t(
                'Kartu kamar membuka pintu tertentu. Itu soal izin, bukan soal siapa kamu.',
                'Kartu ke pintu kamar memeriksa hak akses, yaitu otorisasi. Identitas sudah diperiksa sebelumnya.',
              ),
            },
            {
              id: 'bell',
              label: t('Mendapat kartu kamar baru', 'Menerima kartu kamar baru dari petugas'),
              explainWrong: t(
                'Kartu baru diberikan sesudah KTP diperiksa. Pemeriksaan KTP-nya yang membuktikan siapa kamu.',
                'Kartu baru diberikan sesudah identitas terbukti. Langkah membuktikan identitas itulah autentikasi.',
              ),
            },
          ],
          answer: 'ktp',
          explainCorrect: t(
            'Kata sandi membuktikan siapa kamu. Seperti KTP yang kamu tunjukkan di hotel.',
            'Kata sandi dan OTP membuktikan identitas, yaitu autentikasi. Kartu kamar dipakai sesudahnya, untuk membuka pintu.',
          ),
          hints: [t('Ingat apa yang diminta petugas saat kamu tiba.')],
          tags: ['autentikasi'],
        }),
      ),
      conceptStep({
        title: t('Boleh buka apa?', 'Otorisasi (AuthZ)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'otorisasi-kartu' },
        alt: t('Kartu hotel membuka kamar 305 dan kolam renang, tetapi menolak kamar lain.'),
        body: [
          rText('Otorisasi', 'Otorisasi (AuthZ)'),
          rText(
            ' artinya izin: kamu boleh membuka apa. Kartu kamar hotel hanya membuka kamar 305.',
            ' menentukan hak aksi: boleh baca, ubah, atau hapus. Contohnya kartu hotel yang hanya membuka kamar 305 dan kolam renang.',
          ),
        ],
      }),
      simStep(
        'pembaca-gelang-jwt',
        t(
          'Ganti jenis tamu, lalu lihat apa kata penjaga.',
          'Ubah peran di simulator, lalu amati apakah akses diizinkan atau ditolak.',
        ),
      ),
      qStep({
        id: 'b07-l01-q2',
        type: 'sort',
        prompt: t(
          'Kelompokkan contoh ini ke "Siapa kamu" atau "Boleh apa".',
          'Kelompokkan contoh ini ke autentikasi atau otorisasi:',
        ),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('Sidik jari untuk membuka akun', 'Memasukkan sidik jari untuk membuka akun') },
          { id: 'i2', label: t('Mengecek apakah boleh menghapus barang', 'Mengecek apakah akun boleh menghapus produk') },
          { id: 'i3', label: t('Mengetik kata sandi untuk masuk', 'Mengetik kode OTP saat masuk aplikasi') },
          { id: 'i4', label: t('Kartu kamar hanya untuk lantai 3', 'Membatasi kartu kamar hanya untuk lantai 3') },
        ],
        bins: [
          { id: 'authn', label: t('Siapa kamu', 'Autentikasi (siapa kamu)'), icon: 'user' },
          { id: 'authz', label: t('Boleh apa', 'Otorisasi (boleh apa)'), icon: 'key' },
        ],
        answer: { i1: 'authn', i2: 'authz', i3: 'authn', i4: 'authz' },
        explainCorrect: t(
          'Sidik jari dan kata sandi membuktikan siapa kamu. Izin hapus dan lantai 3 membatasi apa yang boleh dibuka.',
          'Sidik jari dan OTP memeriksa identitas. Izin hapus dan batas lantai memeriksa hak akses.',
        ),
        hints: [t('Tanya dulu: ini soal siapa, atau soal boleh apa?'), undefined],
        tags: ['autentikasi'],
      }),
      conceptStep({
        title: t('Angka 401 dan 403', 'Kode status 401 dan 403'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'status-401-403' },
        alt: t('Perbandingan angka 401 untuk belum dikenali dan 403 untuk dikenali tetapi dilarang.'),
        body: [
          rJunior(
            'Belum bisa membuktikan siapa kamu? Penjaga gerbang menjawab 401 (belum dikenali). Sudah masuk, tetapi kamar itu terlarang? Jawabannya 403 (dilarang).',
          ),
          rPro('Gagal autentikasi dibalas status '),
          rCode('401 Unauthorized', ['pro']),
          rPro('. Sudah login tetapi tidak punya izin dibalas '),
          rCode('403 Forbidden', ['pro']),
          rPro('.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b07-l01-q3',
          prompt: t(
            'Rani sudah masuk hotel, lalu mencoba membuka ruang petugas. Apa jawaban penjaga?',
            'Rani sudah login sebagai pembeli, lalu membuka halaman admin toko. Status HTTP apa yang tepat dari server?',
          ),
          choices: [
            { id: '403', label: t('Dilarang masuk', '403 Forbidden') },
            {
              id: '401',
              label: t('Belum dikenali', '401 Unauthorized'),
              explainWrong: t(
                'Penjaga sudah mengenal Rani. Jawaban itu untuk tamu yang belum dikenali.',
                'Rani sudah login, jadi identitasnya dikenal. Masalahnya ada pada hak akses.',
              ),
            },
            {
              id: '200',
              label: t('Pintu dibuka lebar', '200 OK'),
              explainWrong: t(
                'Tamu tidak punya izin ke ruang petugas. Kartunya tidak cocok dengan pintu itu.',
                'Status 200 berarti berhasil. Pembeli biasa tidak boleh membuka halaman admin.',
              ),
            },
          ],
          answer: '403',
          explainCorrect: t(
            'Rani sudah dikenal, tetapi tidak boleh membuka ruang petugas. Itu jawaban 403 (dilarang).',
            'Identitas Rani dikenal, tetapi perannya tidak berhak masuk. Server membalas 403.',
          ),
          hints: [t('Ingat kartu hotel yang hanya membuka kamarmu.')],
          tags: ['autentikasi', 'status-code'],
        }),
      ),
      limitStep({
        analogy: t('Resepsionis dan kartu kamar hotel'),
        same: [
          t('Kamu harus membuktikan identitas dulu, baru mendapat hak akses.'),
          t('Kartu hanya membuka pintu yang sesuai hak pemiliknya.'),
        ],
        different: [
          t('Server memeriksa izin pada setiap permintaan, bukan hanya sekali di lobi.'),
          t('Satu tamu bisa punya izin berbeda, misalnya tamu biasa atau petugas hotel.', 'Satu akun bisa punya peran berbeda, misalnya pembeli atau admin. Peran menentukan aksi yang diizinkan.'),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeTf({
          id: 'b07-l01-q4',
          prompt: t(
            'Sudah masuk hotel berarti boleh membuka semua kamar.',
            'Kalau seseorang sudah berhasil login, ia otomatis boleh melihat dan menghapus semua data milik orang lain.',
          ),
          answer: false,
          explainCorrect: t(
            'Kartu kamar hanya membuka kamarmu. Pintu lain tetap terkunci.',
            'Login hanya membuktikan identitas. Server tetap memeriksa hak akses pada setiap permintaan.',
          ),
          explainWrong: t(
            'Kartu hanya cocok dengan satu kamar. Kamar orang lain tidak bisa kamu buka.',
            'Login hanya menjawab "siapa kamu". Hak untuk membuka tiap data diperiksa terpisah.',
          ),
          hints: [t('Bayangkan kartu kamarmu di depan kamar tetangga.')],
          tags: ['autentikasi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l01-q5',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Resepsionis dan kartu hotel'),
          prompt: t('Apa perbedaan analogi hotel dengan sistem API yang sebenarnya?'),
          choices: [
            { id: 'each', label: t('Server cek izin di setiap request') },
            {
              id: 'card',
              label: t('Kartu hanya membuka kamar milik tamu'),
              explainWrong: t('Itu kesamaan antara kartu kamar dan otorisasi, bukan perbedaan.'),
            },
            {
              id: 'id',
              label: t('Tamu membuktikan identitas lebih dulu'),
              explainWrong: t('Itu kesamaan antara check-in hotel dan autentikasi, bukan perbedaan.'),
            },
          ],
          answer: 'each',
          explainCorrect: t('Server memeriksa identitas dan hak pada setiap permintaan. Pemeriksaannya tidak berhenti di lobi.'),
          hints: [t('Cari hal yang berbeda, bukan yang sama.')],
          tags: ['autentikasi', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l01-q6',
          type: 'scenario',
          story: t(
            'Bito lupa masuk. Ia langsung menekan tombol Edit Profil. Penjaga menolak.',
            'Bito lupa login, lalu langsung menekan tombol "Edit Profil" di Toko Rani. Server menolak permintaan itu.',
          ),
          prompt: t('Mengapa penjaga menjawab 401, bukan 403?', 'Mengapa server mengirim status 401, bukan 403?'),
          difficulty: 2,
          choices: [
            { id: 'who', label: t('Penjaga belum tahu siapa Bito', 'Server belum mengenal siapa Bito') },
            {
              id: 'del',
              label: t('Halaman profil sudah hilang', 'Halaman profil sudah dihapus'),
              explainWrong: t(
                'Kalau halaman hilang, jawabannya lain. Bito belum membuktikan siapa dirinya.',
                'Halaman yang hilang dijawab 404. Masalah Bito ada pada identitas.',
              ),
            },
            {
              id: 'full',
              label: t('Bito dikenal, tetapi dilarang masuk', 'Bito sudah login, tetapi tidak berhak'),
              explainWrong: t(
                'Bito belum dikenal penjaga. Jawaban 403 (dilarang) hanya untuk tamu yang sudah dikenal.',
                'Bito belum login, jadi server belum mengenalnya. Status 403 dipakai bila identitas sudah dikenal.',
              ),
            },
          ],
          answer: 'who',
          explainCorrect: t(
            'Bito belum membuktikan siapa dirinya. Penjaga belum mengenalnya, jadi menjawab 401 (belum dikenali).',
            'Tanpa login yang sah, server belum mengenal pengirim, jadi menjawab 401. Status 403 dipakai bila identitas sudah dikenal.',
          ),
          hints: [t('Ingat: Bito belum menunjukkan KTP-nya.')],
          tags: ['autentikasi', 'status-code'],
        }),
      ),
      qStep({
        id: 'b07-l01-q7',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi ringkasan dua pemeriksaan keamanan gerbang API ini:'),
        template: '___ membuktikan "kamu siapa?" (gagal = 401), tetapi ___ menentukan "kamu boleh apa?" (ditolak = 403).',
        bank: ['Autentikasi', 'Otorisasi', 'Enkripsi', 'Validasi'],
        answer: ['Autentikasi', 'Otorisasi'],
        explainCorrect: t('AuthN memeriksa identitas, dan AuthZ memeriksa hak akses.'),
        hints: [t('Yang pertama membuktikan identitas. Yang kedua menentukan izin.'), undefined],
        tags: ['autentikasi'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b07-l01-r1',
        prompt: t(
          'Autentikasi menjawab pertanyaan apa?',
          'Pertanyaan utama apa yang dijawab oleh autentikasi?',
        ),
        choices: [
          { id: 'who', label: t('"Kamu siapa?"') },
          {
            id: 'what',
            label: t('"Kamu boleh membuka apa?"'),
            explainWrong: t(
              'Itu pertanyaan untuk otorisasi. Kartu kamar yang menjawabnya.',
              'Itu pertanyaan untuk otorisasi. Hak akses yang menjawabnya.',
            ),
          },
          {
            id: 'where',
            label: t('"Kamu datang dari mana?"'),
            explainWrong: t(
              'Autentikasi tidak mengurus asalmu. Ia hanya membuktikan siapa kamu.',
              'Autentikasi tidak memeriksa asal pemakai. Ia hanya memverifikasi identitas.',
            ),
          },
        ],
        answer: 'who',
        explainCorrect: t(
          'Autentikasi membuktikan siapa kamu. Seperti KTP di meja hotel.',
          'Autentikasi memverifikasi identitas pemakai sebelum akses diberikan.',
        ),
        hints: [t('Ingat petugas hotel yang meminta KTP.')],
        tags: ['autentikasi'],
      }),
      makeMcq({
        id: 'b07-l01-r2',
        prompt: t(
          'Kamu sudah masuk hotel, lalu mencoba membuka ruang petugas. Apa jawaban penjaga?',
          'Status apa yang diterima akun yang sudah login, tetapi mencoba mengakses data admin?',
        ),
        choices: [
          { id: '403', label: t('Dilarang masuk', '403 Forbidden') },
          {
            id: '401',
            label: t('Belum dikenali', '401 Unauthorized'),
            explainWrong: t(
              'Kamu sudah dikenali penjaga. Masalahnya, pintu itu bukan untukmu.',
              '401 berarti identitas belum terbukti. Akun ini sudah login.',
            ),
          },
          {
            id: '200',
            label: t('Pintu dibuka lebar', '200 OK'),
            explainWrong: t(
              'Ruang petugas tetap terkunci untuk tamu biasa.',
              '200 berarti berhasil. Akun biasa tidak berhak membaca data admin.',
            ),
          },
        ],
        answer: '403',
        explainCorrect: t(
          'Kamu dikenal, tetapi tidak punya izin. Penjaga menjawab 403 (dilarang).',
          '403 berarti identitas dikenal, tetapi tidak punya hak akses.',
        ),
        hints: [t('Ingat: kartu kamar hanya membuka kamarmu.')],
        tags: ['autentikasi', 'status-code'],
      }),
    ],
    recap: t(
      'Autentikasi membuktikan siapa kamu, otorisasi menentukan pintu yang boleh dibuka.',
      'Autentikasi (AuthN, status 401) membuktikan identitas. Otorisasi (AuthZ, status 403) membatasi hak aksi.',
    ),
    companion: {
      talkPrompts: [
        'Satpam sekolah mengenali wajahmu (siapa kamu). Tetapi kamu tetap tidak boleh masuk ruang guru (boleh apa). Apa contoh lain di rumah?',
        'Kakak boleh masuk rumah, tetapi tidak boleh membuka laci kerja ayah. Mana yang cek izin?',
      ],
      offlineActivity:
        'Ambil kartu mainan atau kertas. Tulis nama anggota keluarga di satu kartu (siapa kamu). Tulis daftar ruangan yang boleh dibuka di kartu lain (boleh apa).',
    },
  }),

  makeLesson({
    id: 'b07-l02',
    worldId: 'b07',
    title: 'API key, session, token',
    modes: ['pro'],
    objective: t('Kamu bisa membandingkan empat cara membawa identitas dan risikonya masing-masing.'),
    estMinutes: 5,
    introducesTerms: ['api-key'],
    usesTerms: ['autentikasi', 'api', 'server', 'browser', 'header-body', 'cookie-cache', 'https', 'xss', 'csrf', 'rahasia-frontend'],
    warmupFrom: 'b07-l01',
    atWork: 'Kamu akan memilih cara login yang tepat saat web, aplikasi HP, dan layanan lain memakai satu API.',
    steps: [
      storyStep('b07/api-key.svg', [
        rText(
          'Toko Rani punya web, aplikasi HP, dan beberapa layanan di belakang. Setiap bagian perlu cara membuktikan identitasnya ke API.',
        ),
      ]),
      conceptStep({
        title: t('API key dan Basic Auth'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'apikey-basic' },
        alt: t('Header x-api-key untuk aplikasi dan Authorization Basic base64 yang wajib lewat HTTPS.'),
        code: {
          lang: 'http',
          code: 'x-api-key: sk_live_8f2a_rahasia\nAuthorization: Basic cmFuaTpyYWhhc2lh',
        },
        body: [
          rTerm('api-key', 'API key'),
          rText(
            ' adalah kode rahasia milik aplikasi, seperti kartu akses kantor. Jangan menaruhnya di kode frontend, karena DevTools menampilkannya. Basic Auth mengirim nama dan sandi dalam Base64, yang bukan enkripsi. Jadi wajib lewat ',
          ),
          rTerm('https', 'HTTPS'),
          rText('.'),
        ],
      }),
      qStep({
        id: 'b07-l02-q2',
        type: 'spotbug',
        difficulty: 2,
        prompt: t('Ketuk baris yang membocorkan API key rahasia:'),
        lines: [
          'async function cariCuaca(kota) {',
          '  const API_SECRET = "sk_live_rahasia_toko_rani";',
          '  return fetch(`https://api.toko-rani.example/cuaca?q=${kota}&key=${API_SECRET}`);',
          '}',
        ],
        answer: [2],
        explainCorrect: t('Baris 2 menaruh API_SECRET di kode frontend. Siapa pun bisa mengintipnya lewat DevTools.'),
        hints: [t('Cari baris yang menulis kunci rahasia langsung di dalam kode.'), undefined],
        tags: ['api-key', 'rahasia-frontend'],
      }),
      conceptStep({
        title: t('Session Cookie dan Bearer Token'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'session-vs-token' },
        alt: t('Session menyimpan catatan login di server. Bearer Token dibawa pemegangnya.'),
        code: {
          lang: 'http',
          code: 'Authorization: Bearer eyJhbGciOi...',
        },
        body: [
          rText('Pada '),
          rText('Session'),
          rText(', server menyimpan catatan login, seperti petugas penitipan jaket. Browser mengirim nomor sesi lewat '),
          rTerm('cookie-cache', 'cookie'),
          rText(' secara otomatis. Pada Bearer Token, siapa pun pembawa token di header dianggap pemiliknya, seperti tiket konser.'),
        ],
      }),
      simStep(
        'pembaca-gelang-jwt',
        t('Amati bentuk Bearer token yang dikirim di setiap permintaan.'),
      ),
      qStep({
        id: 'b07-l02-q1',
        type: 'match',
        prompt: t('Pasangkan keempat cara membawa identitas dengan perumpamaannya:'),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('API key') },
          { id: 'l2', label: t('Basic Auth') },
          { id: 'l3', label: t('Session + Cookie') },
          { id: 'l4', label: t('Bearer Token') },
        ],
        right: [
          { id: 'r1', label: t('Kartu akses aplikasi masuk gedung') },
          { id: 'r2', label: t('Menyebut nama dan sandi di setiap pintu') },
          { id: 'r3', label: t('Tiket penitipan jaket yang disimpan petugas') },
          { id: 'r4', label: t('Tiket konser: pembawa dianggap pemilik') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
        explainCorrect: t('API key milik aplikasi, dan Basic Auth mengirim nama dan sandi di setiap permintaan. Session menyimpan catatan di pihak layanan, tetapi pemegang token dianggap pemiliknya seperti tiket konser.'),
        hints: [t('Ingat: siapa yang menyimpan catatan login, dan siapa yang membawanya?'), undefined],
        tags: ['api-key', 'cookie-cache'],
      }),
      conceptStep({
        title: t('Risiko tiap cara'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'perbandingan-sesi-token' },
        alt: t('Session mudah logout paksa dan waspada CSRF. Token cocok untuk banyak layanan dan waspada XSS.'),
        body: [
          rText('Session mudah di-logout paksa, karena server tinggal menghapus catatannya. Risikonya '),
          rTerm('csrf', 'CSRF'),
          rText(', yaitu serangan yang memakai cookie-mu tanpa izin. Penangkalnya SameSite. Token cocok untuk HP dan banyak layanan, tetapi bisa dicuri lewat '),
          rTerm('xss', 'XSS'),
          rText(' (kode jahat di halaman) kalau disimpan di localStorage.'),
        ],
      }),
      qStep(
        makeTf({
          id: 'b07-l02-q4',
          prompt: t('Logout paksa lebih mudah dengan Session daripada dengan token yang tidak dicatat.'),
          answer: true,
          explainCorrect: t('Server cukup menghapus catatan sesi. Cookie lama langsung tidak berlaku.'),
          explainWrong: t('Session unggul untuk logout paksa karena datanya disimpan di server.'),
          hints: [t('Tanya dulu: siapa yang menyimpan catatan login?')],
          tags: ['cookie-cache', 'api-key'],
        }),
      ),
      limitStep({
        analogy: t('Kartu akses, tiket jaket, dan tiket konser'),
        same: [t('Semua cara itu membawa bukti hak masuk ke gerbang API.')],
        different: [
          t('Base64 pada Basic Auth bisa dibalik siapa saja dalam sedetik. Tanpa HTTPS, itu sama seperti meneriakkan sandi di ruangan ramai.'),
          t('API key publik, misalnya kunci layanan peta di website, tetap harus dibatasi ke situs milikmu.'),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeMcq({
          id: 'b07-l02-q3',
          type: 'why',
          base: 'Authorization: Basic cmFuaTpyYWhhc2lh wajib dikirim hanya melalui HTTPS.',
          prompt: t('Mengapa teks Basic Auth itu tidak boleh dianggap sudah terenkripsi?'),
          difficulty: 2,
          choices: [
            { id: 'b64', label: t('Base64 hanya menyamarkan teks, siapa saja bisa membacanya') },
            {
              id: 'len',
              label: t('Base64 memakai kunci rahasia yang terlalu pendek dan mudah ditebak'),
              explainWrong: t('Base64 tidak memakai kunci sama sekali. Ia hanya mengubah bentuk teks.'),
            },
            {
              id: 'get',
              label: t('Header Authorization tidak ikut terkirim ke server'),
              explainWrong: t('Header Authorization terkirim apa adanya. Masalahnya, isinya mudah dibaca.'),
            },
          ],
          answer: 'b64',
          explainCorrect: t('Base64 hanyalah pengodean teks, bukan enkripsi. Tanpa HTTPS, siapa pun di jaringan bisa membacanya.'),
          hints: [t('Tanya dulu: adakah kunci rahasia yang dipakai Base64?')],
          tags: ['api-key', 'https'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l02-q5',
          type: 'limit',
          analogy: t('Kartu akses dan tiket jaket'),
          prompt: t('Apa pengecualian dari aturan "jangan taruh kunci rahasia di kode frontend"?'),
          difficulty: 2,
          choices: [
            { id: 'pub', label: t('Kunci publik khusus frontend, asal dibatasi ke domainmu') },
            {
              id: 'all',
              label: t('Kunci yang ditulis dalam Base64 sudah aman dipasang di frontend'),
              explainWrong: t('Base64 bukan enkripsi. Kunci itu tetap bisa dibaca dan dipakai siapa saja.'),
            },
            {
              id: 'css',
              label: t('Kunci di localStorage tidak bisa dibaca orang lain'),
              explainWrong: t('localStorage bisa dibaca JavaScript di halaman. Kunci itu tetap terbuka.'),
            },
          ],
          answer: 'pub',
          explainCorrect: t('Kunci yang memang dibuat publik tetap aman bila domainnya dibatasi. Kunci rahasia wajib tinggal di server.'),
          hints: [t('Cari kunci yang memang dirancang untuk dilihat publik.')],
          tags: ['api-key', 'rahasia-frontend'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l02-q6',
          type: 'scenario',
          story: t('Sari membuat web toko, aplikasi Android, dan beberapa layanan di belakangnya.'),
          prompt: t('Cara membawa identitas mana yang paling fleksibel untuk semuanya?'),
          difficulty: 2,
          choices: [
            { id: 'tok', label: t('Bearer Token di header Authorization') },
            {
              id: 'basic',
              label: t('Basic Auth di setiap permintaan'),
              explainWrong: t('Basic Auth mengirim nama dan sandi di setiap permintaan. Aplikasi jadi harus menyimpan sandi mentah.'),
            },
            {
              id: 'none',
              label: t('Session Cookie yang disimpan di server web'),
              explainWrong: t('Session cocok untuk satu domain web. Aplikasi HP dan layanan lain sulit memakainya.'),
            },
          ],
          answer: 'tok',
          explainCorrect: t('Bearer Token mudah dibawa aplikasi HP maupun web ke banyak layanan API.'),
          hints: [t('Pilih yang bisa dibawa ke banyak tempat.')],
          tags: ['api-key', 'autentikasi'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b07-l02-r1',
        prompt: t('Apa arti kata "Bearer" pada header Authorization: Bearer <token>?'),
        choices: [
          { id: 'own', label: t('Pembawa: siapa pun yang membawa token dianggap pemilik sah') },
          {
            id: 'err',
            label: t('Penerima: hanya server tujuan yang boleh membaca token'),
            explainWrong: t('Bearer berarti pembawa token, bukan penerimanya.'),
          },
          {
            id: 'lock',
            label: t('Pemilik: token terkunci ke satu perangkat'),
            explainWrong: t('Bearer token tidak terkunci ke perangkat. Siapa pun pembawanya dianggap pemilik.'),
          },
        ],
        answer: 'own',
        explainCorrect: t('Siapa pun pembawanya dianggap pemilik, jadi Bearer token harus selalu lewat HTTPS.'),
        tags: ['api-key'],
      }),
      makeTf({
        id: 'b07-l02-r2',
        prompt: t('Token yang disimpan di localStorage bisa dicuri lewat celah XSS.'),
        answer: true,
        explainCorrect: t('Kode JavaScript jahat dari celah XSS bisa membaca localStorage.'),
        explainWrong: t('localStorage bisa diakses JavaScript, jadi rentan bila ada celah XSS.'),
        tags: ['xss', 'api-key'],
      }),
    ],
    recap: t('Pilih API key untuk aplikasi. Pilih session untuk satu situs, dan token untuk banyak platform.'),
  }),

  makeLesson({
    id: 'b07-l03',
    worldId: 'b07',
    title: 'Gelang konser berhologram',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menyebut 3 bagian gelang JWT.',
      'Kamu bisa mengenali struktur Header.Payload.Signature dan menjelaskan batas perlindungan tanda tangan JWT.',
    ),
    estMinutes: 6,
    introducesTerms: ['jwt'],
    usesTerms: ['autentikasi', 'api-key', 'json', 'server', 'browser', 'status-code'],
    stickerId: 'gelang-hologram',
    warmupFrom: 'b07-l02',
    atWork: 'Pakai token rekaan di simulator untuk memeriksa peran dan masa berlaku tanpa menyalin token akun sungguhan.',
    steps: [
      storyStep('b07/gelang-hologram.svg', [
        rText(
          'Rani memakai gelang konser. Tulisan di gelang bisa dibaca siapa saja. Mengapa penjaga tetap tahu gelang itu asli?',
          'Server menerima tanda masuk dari pembeli tanpa menelepon kantor pusat. Bagaimana server tahu tanda itu tidak diubah?',
        ),
      ]),
      conceptStep({
        title: t('Tiga bagian gelang', 'Tiga bagian JWT bertanda tangan'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'tiga-bagian-jwt' },
        alt: t('Contoh JWT bertanda tangan punya tiga bagian: Header, Payload, dan Signature.'),
        code: {
          lang: 'text',
          code: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1IiwibmFtYSI6IlJhbmkiLCJyb2xlIjoicGVtYmVsaSIsImV4cCI6MTc5OTk5OTk5OX0.7mK2xQ9vR_sig',
        },
        body: [
          rTerm('jwt', 'JWT', 'JWT'),
          rText(
            ' adalah gelang digital. Gelang itu punya tiga bagian: jenis gelang, tulisan, dan cap hologram.',
            ', dibaca "jot", adalah teks yang berisi data untuk diperiksa server. Contoh JWT bertanda tangan punya tiga bagian dipisah titik. Header berisi algoritma. ',
          ),
          rTermIn('pro', 'jwt', 'Payload'),
          rPro(' berisi data seperti siapa, role, dan exp. Pada contoh HS256, Signature dibuat memakai kunci rahasia bersama.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b07-l03-q1',
          type: 'analogy',
          prompt: t(
            'Cap hologram sulit ditiru orang iseng. Mana bagian gelang yang seperti itu?',
            'Cap hologram yang sulit ditiru pada gelang konser sama dengan bagian JWT yang mana?',
          ),
          choices: [
            { id: 'sig', label: t('Cap hologram', 'Signature') },
            {
              id: 'pay',
              label: t('Tulisan nama tamu', 'Payload'),
              explainWrong: t(
                'Tulisan bisa dibaca siapa saja. Yang sulit ditiru adalah cap hologramnya.',
                'Payload ibarat tulisan nama dan jenis tiket yang bisa dibaca siapa saja.',
              ),
            },
            {
              id: 'hdr',
              label: t('Jenis gelang', 'Header'),
              explainWrong: t(
                'Jenis gelang hanya memberi tahu macam gelangnya. Cap hologram yang menjaga keasliannya.',
                'Header berisi jenis algoritma. Cap keaslian ada di bagian ketiga, yaitu Signature.',
              ),
            },
          ],
          answer: 'sig',
          explainCorrect: t(
            'Cap hologram menjaga gelang tetap asli. Orang iseng sulit meniru capnya.',
            'Signature membantu server memastikan token berasal dari penerbit tepercaya dan isinya masih utuh.',
          ),
          hints: [t('Ingat tiga bagian gelang di kartu tadi.')],
          tags: ['jwt'],
        }),
      ),
      conceptStep({
        title: t('Cap hologram sulit dipalsukan', 'Verifikasi Signature'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'signature-hologram' },
        alt: t('Kalau tulisan role diubah dari pembeli menjadi admin, hologram Signature tidak cocok.'),
        body: [
          rText(
            'Tulisan di gelang bisa dibaca siapa saja. Cap hologram sulit dipalsukan. Jadi jangan tulis rahasia di gelang.',
            'Server memeriksa tanda tangan dan klaim, termasuk penerbit, tujuan, dan masa berlaku. Token yang isinya berubah gagal diperiksa.',
          ),
        ],
      }),
      simStep(
        'pembaca-gelang-jwt',
        t(
          'Ganti tulisan gelang, lalu lihat penjaga menolaknya.',
          'Ubah isi Payload di simulator JWT dan amati kegagalan verifikasi Signature.',
        ),
      ),
      conceptStep({
        title: t('Tanda tangan tidak menyembunyikan isi'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'jwt-bukan-enkripsi' },
        alt: t('Isi JWT bertanda tangan pada contoh ini dapat dibaca oleh siapa pun yang memegangnya.'),
        modes: ['pro'],
        body: [
          rPro(
            'JWT bertanda tangan seperti ini memakai Base64url. Pemegang token bisa membaca isinya. JWT juga bisa memakai format terenkripsi (JWE). Hindari memasukkan kata sandi atau nomor KTP ke token.',
          ),
        ],
      }),
      qStep(
        makeTf({
          id: 'b07-l03-q3',
          prompt: t(
            'Tulisan di gelang disembunyikan, jadi orang lain tidak bisa membacanya.',
            'Isi JWT bertanda tangan pada contoh tadi hanya bisa dibaca dengan kunci rahasia.',
          ),
          answer: false,
          explainCorrect: t(
            'Tulisan di gelang terbuka. Siapa saja bisa membacanya, seperti papan pengumuman.',
            'Payload pada contoh itu dikodekan dengan Base64url. Siapa pun yang memegang token bisa membacanya.',
          ),
          explainWrong: t(
            'Hanya cap hologram yang sulit ditiru. Tulisannya sendiri terbuka untuk dibaca.',
            'Base64url mengubah bentuk penulisan data. Pemegang token dapat membaca isi aslinya.',
          ),
          hints: [t('Bayangkan tulisan di gelang saat antre masuk.')],
          tags: ['jwt'],
        }),
      ),
      limitStep({
        analogy: t('Gelang konser bercap hologram'),
        same: [
          t(
            'Tulisan terbuka, tetapi cap hologram melindungi dari pemalsuan.',
            'Tulisan peran dan jam berlaku bisa dibaca, sementara hologram menjamin tidak ada coretan palsu.',
          ),
        ],
        different: [
          t(
            'Gelang kertas bisa digunting petugas. Gelang digital tidak bisa. Ia tetap berlaku sampai jamnya habis.',
            'Gelang fisik bisa digunting petugas kapan saja. JWT sulit ditarik kembali sebelum waktu kedaluwarsa (exp) habis.',
          ),
        ],
        riskyAnalogy: true,
      }),
      qStep({
        id: 'b07-l03-q2',
        type: 'hotspot',
        modes: ['pro'],
        difficulty: 1,
        prompt: t('Ketuk bagian JWT yang berisi data siapa pemakainya, perannya, dan waktu berakhirnya.'),
        image: 'b07-hotspot',
        regions: [
          { id: 'header', shape: 'rect', coords: [10, 10, 140, 50], label: '1. Header' },
          { id: 'payload', shape: 'rect', coords: [160, 10, 220, 50], label: '2. Payload' },
          { id: 'signature', shape: 'rect', coords: [390, 10, 160, 50], label: '3. Signature' },
          { id: 'dot', shape: 'rect', coords: [10, 70, 200, 40], label: '4. Titik pemisah' },
        ],
        answer: 'payload',
        explainCorrect: t('Bagian tengah, yaitu Payload, berisi data seperti sub, nama, role, dan exp.'),
        hints: [t('Cari bagian yang berisi data tentang pemakai.'), undefined],
        tags: ['jwt', 'json'],
      }),
      qStep(
        makeMcq({
          id: 'b07-l03-q4',
          modes: ['pro'],
          prompt: t('Bagaimana server memeriksa keaslian JWT bertanda tangan tanpa mencari sesi di database?'),
          choices: [
            { id: 'chk', label: t('Server memeriksa Signature dengan kunci yang sesuai') },
            {
              id: 'ask',
              label: t('Server menanyakan keaslian token ke browser milik pembeli lebih dulu'),
              explainWrong: t('Server memeriksa tanda tangan memakai kunci yang sesuai.'),
            },
            {
              id: 'skip',
              label: t('Server menerima token yang bentuknya benar'),
              explainWrong: t('Server tetap memeriksa Signature dan klaim yang diperlukan, termasuk exp.'),
            },
          ],
          answer: 'chk',
          explainCorrect: t('Kunci yang sesuai memeriksa Signature. Server juga memeriksa klaim sebelum menerima token.'),
          hints: [t('Ingat fungsi tanda tangan token.')],
          tags: ['jwt', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l03-q5',
          type: 'limit',
          analogy: t('Gelang konser berhologram'),
          prompt: t(
            'Gelang kertas bisa digunting petugas. Bagaimana dengan gelang digital?',
            'Gelang konser bisa digunting petugas. Apa yang terjadi pada JWT yang dicuri?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'revoke',
              label: t('Tetap berlaku sampai jamnya habis', 'JWT tetap berlaku sampai waktu exp habis'),
            },
            {
              id: 'read',
              label: t('Langsung hangus seperti gelang digunting', 'JWT langsung hangus begitu server tahu dicuri'),
              explainWrong: t(
                'Gelang digital tidak bisa digunting. Ia tetap berlaku sampai jamnya habis.',
                'Biasanya server tidak menyimpan daftar JWT. Token sulit dihanguskan sebelum exp, kecuali ada daftar blokir.',
              ),
            },
            {
              id: 'tamper',
              label: t('Hilang sendiri dari HP', 'JWT berganti baru setiap kali dipakai'),
              explainWrong: t(
                'Gelang digital tidak hilang sendiri. Ia tetap berlaku sampai jamnya habis.',
                'JWT tidak berganti sendiri. Token yang sama berlaku sampai exp berakhir.',
              ),
            },
          ],
          answer: 'revoke',
          explainCorrect: t(
            'Gelang digital tidak bisa digunting. Karena itu jam berlakunya dibuat singkat.',
            'Karena JWT sulit ditarik sebelum kedaluwarsa, masa berlakunya dibuat singkat.',
          ),
          hints: [t('Ingat beda gelang kertas dan gelang digital.', 'Bayangkan token yang sudah jatuh ke tangan orang lain.')],
          tags: ['jwt'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l03-q6',
          type: 'scenario',
          story: t(
            'Raka memakai gelang bertuliskan "pembeli". Ia mencoret tulisannya menjadi "admin". Lalu ia menunjukkannya ke penjaga.',
            'Raka menerima JWT dengan isi {"sub":"9","role":"pembeli"}. Ia mengubah isinya menjadi "admin", lalu mengirim token itu ke API.',
          ),
          prompt: t('Apa yang dilakukan penjaga?', 'Apa yang dilakukan server pada token hasil editan Raka?'),
          difficulty: 2,
          choices: [
            {
              id: '401',
              label: t('Menolak karena capnya tidak cocok', 'Menolak dengan 401 karena Signature tidak cocok'),
            },
            {
              id: 'adm',
              label: t('Menerima tulisan baru di gelang', 'Menerima isi baru karena token asli'),
              explainWrong: t(
                'Tulisan baru tidak dipercaya. Penjaga memeriksa cap hologram dulu.',
                'Server memeriksa Signature dulu sebelum mempercayai isi token.',
              ),
            },
            {
              id: '404',
              label: t('Memeriksa daftar tamu di kantor pusat', 'Memeriksa peran Raka di database sesi lebih dulu'),
              explainWrong: t(
                'Penjaga tidak perlu ke kantor pusat. Ia cukup melihat cap hologram.',
                'Masalahnya ada pada Signature yang rusak, jadi tidak perlu membuka database.',
              ),
            },
          ],
          answer: '401',
          explainCorrect: t(
            'Tulisan diubah, jadi cap hologram tidak cocok lagi. Penjaga menolak gelang itu.',
            'Mengubah satu huruf di Payload tanpa kunci rahasia membuat verifikasi Signature gagal. Server menolak token itu.',
          ),
          hints: [t('Ingat siapa yang memeriksa cap hologram.')],
          tags: ['jwt', 'status-code'],
        }),
      ),
      qStep({
        id: 'b07-l03-q7',
        type: 'type',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Tulis nama kolom standar di Payload JWT yang menentukan kapan token berakhir:'),
        accept: ['exp'],
        explainCorrect: t('Kolom exp (expiration time) menandai waktu token berakhir.'),
        hints: [t('Ingat bagian Payload yang mengatur masa berlaku.'), undefined],
        tags: ['jwt'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b07-l03-r1',
        prompt: t(
          'Gelang JWT punya berapa bagian?',
          'Berapa bagian pada contoh JWT bertanda tangan di pelajaran ini?',
        ),
        choices: [
          { id: '3', label: t('Tiga bagian', 'Tiga: Header, Payload, Signature') },
          {
            id: '2',
            label: t('Dua bagian', 'Dua: Header dan Signature'),
            explainWrong: t(
              'Gelang JWT punya jenis gelang, tulisan, dan cap hologram. Jumlahnya tiga.',
              'Payload ikut dihitung, jadi jumlahnya tiga. Header, Payload, dan Signature.',
            ),
          },
          {
            id: '4',
            label: t('Empat bagian', 'Empat: ditambah Secret'),
            explainWrong: t(
              'Gelang JWT tidak punya bagian keempat. Jumlahnya tiga.',
              'Kunci rahasia tidak ikut di dalam token. Bagiannya hanya tiga.',
            ),
          },
        ],
        answer: '3',
        explainCorrect: t(
          'Gelang JWT punya jenis gelang, tulisan, dan cap hologram. Semuanya tiga bagian.',
          'Tiga bagian dipisah dua titik: Header.Payload.Signature.',
        ),
        hints: [t('Hitung bagian gelang di kartu tadi.')],
        tags: ['jwt'],
      }),
      makeTf({
        id: 'b07-l03-r2',
        prompt: t(
          'Kata sandi aman ditulis di gelang JWT karena sudah terkunci.',
          'Payload JWT bertanda tangan pada contoh ini aman untuk menyimpan kata sandi.',
        ),
        answer: false,
        explainCorrect: t(
          'Tulisan gelang terbuka untuk semua orang. Rahasia tidak boleh ditulis di sana.',
          'Pemegang token bisa membaca Payload dalam contoh ini. Jangan masukkan kata sandi ke dalam token.',
        ),
        explainWrong: t(
          'Gelang JWT tidak mengunci tulisannya. Siapa saja bisa membacanya.',
          'Base64url mengodekan isi agar mudah dikirim. Pemegang token dapat membaca isinya.',
        ),
        hints: [t('Ingat tulisan gelang saat antre masuk.')],
        tags: ['jwt'],
      }),
    ],
    recap: t(
      'Gelang JWT punya tiga bagian: cap hologram menjaga keasliannya, tulisannya terbuka.',
      'Contoh JWT bertanda tangan berisi Header, Payload yang bisa dibaca, dan Signature untuk memeriksa keaslian.',
    ),
    companion: {
      talkPrompts: [
        'Apa yang tidak boleh ditulis di gelang konser?',
      ],
      offlineActivity:
        'Buat gelang kertas dari tiga potongan warna yang disambung: 1) jenis acara, 2) nama dan status tamu, 3) stiker hologram.',
    },
  }),

  makeLesson({
    id: 'b07-l04',
    worldId: 'b07',
    title: 'Access dan refresh token',
    modes: ['pro'],
    objective: t('Kamu bisa menjelaskan peran access token berumur pendek dan refresh token berumur panjang.'),
    estMinutes: 5,
    introducesTerms: ['refresh-token'],
    usesTerms: ['jwt', 'autentikasi', 'cookie-cache', 'status-code', 'server', 'browser', 'http-method'],
    warmupFrom: 'b07-l03',
    atWork: 'Kamu akan melihat POST /refresh di tab Network saat sesi login habis dan diperpanjang otomatis.',
    steps: [
      storyStep('b07/refresh-token.svg', [
        rText(
          'Aplikasi Toko Rani meminta pembeli login ulang setiap 15 menit. Bagaimana login tetap aman tanpa terus mengganggu pembeli?',
        ),
      ]),
      conceptStep({
        title: t('Access token: gelang harian'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'access-token-pendek' },
        alt: t('Access token berumur 15 menit ikut di setiap permintaan.'),
        body: [
          rText('Access token'),
          rText(
            ' adalah tiket yang ikut di setiap permintaan, seperti gelang masuk harian. Umurnya pendek, misalnya 15 menit. Kalau token ini dicuri, masa pakainya cepat habis dan kerusakannya terbatas.',
          ),
        ],
      }),
      simStep(
        'pembaca-gelang-jwt',
        t('Amati access token di simulator dan perhatikan mengapa umurnya sengaja pendek.'),
      ),
      conceptStep({
        title: t('Refresh token: kartu member'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b07', topic: 'refresh-request' },
        alt: t('Alur 401 token kedaluwarsa diikuti POST /refresh lalu mendapat access token baru.'),
        code: {
          lang: 'text',
          code: '1. GET /profil + access token → 401 kedaluwarsa\n2. POST /refresh + refresh token → access token baru\n3. GET /profil + access token baru → 200 OK',
        },
        body: [
          rTerm('refresh-token', 'Refresh token'),
          rText(' berumur panjang dan hanya dikirim ke satu alamat khusus, misalnya '),
          rCode('POST /refresh'),
          rText(', untuk meminta access token baru. Simpan di cookie '),
          rCode('HttpOnly'),
          rText(' agar JavaScript jahat tidak bisa membacanya.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b07-l04-q1',
          type: 'analogy',
          prompt: t('Kartu member ditunjukkan di loket untuk mendapat gelang harian baru. Apa yang digambarkan kartu itu?'),
          choices: [
            { id: 'ref', label: t('Refresh token') },
            {
              id: 'acc',
              label: t('Access token'),
              explainWrong: t('Access token adalah gelang harian yang dipakai di setiap permintaan.'),
            },
            {
              id: 'css',
              label: t('API key aplikasi'),
              explainWrong: t('API key milik aplikasi. Kartu member menukar gelang baru untuk pembeli.'),
            },
          ],
          answer: 'ref',
          explainCorrect: t('Refresh token jarang dikirim dan hanya dipakai untuk meminta access token baru.'),
          hints: [t('Ingat: kartu member hanya muncul di loket.')],
          tags: ['refresh-token'],
        }),
      ),
      qStep({
        id: 'b07-l04-q2',
        type: 'order',
        prompt: t('Urutkan kejadian saat access token kedaluwarsa dan pembeli membuka halaman profil:'),
        difficulty: 2,
        items: [
          { id: 's3', label: t('Aplikasi mengirim POST /refresh dengan refresh token') },
          { id: 's1', label: t('Aplikasi mengirim GET /profil dengan access token lama') },
          { id: 's4', label: t('Aplikasi mengulang GET /profil dengan token baru dan mendapat 200 OK') },
          { id: 's2', label: t('Server membalas 401 karena access token sudah kedaluwarsa') },
        ],
        answer: ['s1', 's2', 's3', 's4'],
        explainCorrect: t('Pembaruan token berjalan otomatis di latar belakang, jadi pembeli hampir tidak merasakan jeda.'),
        hints: [t('Mulai dari token lama yang ditolak server.'), undefined],
        tags: ['refresh-token', 'status-code'],
      }),
      conceptStep({
        title: t('Mengapa tidak satu token saja?'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'keseimbangan-token' },
        alt: t('Kombinasi umur pendek dan refresh token menyeimbangkan kenyamanan pembeli dan keamanan.'),
        body: [
          rText(
            'Kalau satu JWT berlaku 30 hari lalu bocor, penyerang bebas masuk sebulan penuh. Kalau umurnya hanya 15 menit tanpa ',
          ),
          rTerm('refresh-token', 'refresh token'),
          rText(', pembeli harus mengetik sandi setiap 15 menit.'),
        ],
      }),
      limitStep({
        analogy: t('Gelang masuk harian dan kartu member'),
        same: [
          t('Gelang dipakai di setiap pintu acara. Kartu member hanya dikeluarkan di loket saat butuh gelang baru.'),
        ],
        different: [
          t('Di web, aplikasi menukar refresh token otomatis di balik layar. Pembeli tidak perlu berjalan ke loket.'),
          t('Refresh token dicatat, jadi bisa dicabut saat akun diblokir atau pembeli logout dari semua perangkat.'),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeTf({
          id: 'b07-l04-q3',
          prompt: t('Access token dan refresh token sama-sama dikirim di setiap permintaan GET daftar produk.'),
          answer: false,
          explainCorrect: t('Hanya access token yang ikut di setiap permintaan. Refresh token hanya dikirim saat memperbarui token.'),
          explainWrong: t('Refresh token di setiap permintaan memperbesar risiko dicuri di jalan.'),
          hints: [t('Ingat siapa yang hanya muncul di loket.')],
          tags: ['refresh-token'],
        }),
      ),
      qStep({
        id: 'b07-l04-q4',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi cara menyimpan token berumur panjang agar JavaScript tidak bisa membacanya:'),
        template: 'Simpan ___ di dalam cookie bertanda ___ agar lebih aman dari skrip jahat.',
        bank: ['refresh token', 'HttpOnly', 'access token', 'SameSite'],
        answer: ['refresh token', 'HttpOnly'],
        explainCorrect: t('Cookie HttpOnly tidak bisa dibaca skrip. Karena itu refresh token lebih aman.'),
        hints: [t('Token berumur panjang butuh perlindungan yang lebih kuat.'), undefined],
        tags: ['refresh-token', 'cookie-cache'],
      }),
      qStep(
        makeMcq({
          id: 'b07-l04-q5',
          type: 'limit',
          analogy: t('Gelang harian dan kartu member'),
          prompt: t('Apa yang membedakan refresh token digital dari kartu member kertas?'),
          choices: [
            { id: 'auto', label: t('Aplikasi menukarnya otomatis dan server bisa mencabutnya') },
            {
              id: 'short',
              label: t('Gelang harian berumur lebih pendek daripada kartu member'),
              explainWrong: t('Itu kesamaan antara access token dan gelang harian, bukan perbedaan.'),
            },
            {
              id: 'once',
              label: t('Pembeli tidak perlu mendaftar ulang dari awal'),
              explainWrong: t('Itu kesamaan. Keduanya sama-sama menghindarkan pendaftaran ulang.'),
            },
          ],
          answer: 'auto',
          explainCorrect: t('Pembaruan berjalan senyap di latar belakang, dan server tetap bisa mencabutnya.'),
          hints: [t('Cari hal yang berbeda, bukan yang sama.')],
          tags: ['refresh-token', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l04-q6',
          type: 'scenario',
          story: t('Nadia membuat satu token berumur 1 tahun, tanpa token kedua. Pembeli tidak perlu login lagi.'),
          prompt: t('Apa risiko keamanan terbesar dari rancangan Nadia?'),
          difficulty: 2,
          choices: [
            { id: 'leak', label: t('Token yang dicuri bisa dipakai sampai 1 tahun') },
            {
              id: 'slow',
              label: t('Server harus menyimpan setiap token di database'),
              explainWrong: t('JWT tidak perlu disimpan. Masalahnya ada pada umur token yang terlalu panjang.'),
            },
            {
              id: 'json',
              label: t('Token berumur panjang ukurannya makin besar'),
              explainWrong: t('Umur token tidak mengubah ukurannya. Masalahnya ada pada keamanan.'),
            },
          ],
          answer: 'leak',
          explainCorrect: t('Pencuri bisa memakai token itu sampai umurnya habis. Karena itu access token dibuat pendek dan dipasangkan dengan refresh token.'),
          hints: [t('Bayangkan token itu jatuh ke tangan orang lain.')],
          tags: ['refresh-token', 'jwt'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b07-l04-r1',
        prompt: t('Token mana yang berumur pendek dan ikut di setiap permintaan?'),
        choices: [
          { id: 'acc', label: t('Access token') },
          {
            id: 'ref',
            label: t('Refresh token'),
            explainWrong: t('Refresh token berumur panjang dan hanya dipakai di alamat /refresh.'),
          },
          {
            id: 'key',
            label: t('API key aplikasi'),
            explainWrong: t('API key milik aplikasi dan umurnya tidak pendek.'),
          },
        ],
        answer: 'acc',
        explainCorrect: t('Access token berumur singkat, jadi dampaknya lebih kecil bila bocor.'),
        tags: ['refresh-token'],
      }),
      makeTf({
        id: 'b07-l04-r2',
        prompt: t('Token berumur panjang lebih aman disimpan di cookie HttpOnly daripada di localStorage.'),
        answer: true,
        explainCorrect: t('HttpOnly melindungi token dari skrip jahat, termasuk saat ada celah XSS.'),
        explainWrong: t('Cookie HttpOnly jauh lebih aman daripada localStorage untuk token berumur panjang.'),
        tags: ['refresh-token', 'cookie-cache'],
      }),
    ],
    recap: t('Pakai access token berumur pendek untuk tiap permintaan. Simpan token berumur panjang di cookie HttpOnly.'),
  }),

  makeLesson({
    id: 'b07-l05',
    worldId: 'b07',
    title: 'OAuth: kunci valet',
    modes: ['pro'],
    objective: t('Kamu bisa menyebut empat pemain OAuth 2.0, alur Authorization Code dengan PKCE, dan fungsi scope.'),
    estMinutes: 6,
    introducesTerms: ['oauth'],
    usesTerms: ['autentikasi', 'jwt', 'refresh-token', 'server', 'browser', 'api'],
    stickerId: 'kunci-valet',
    warmupFrom: 'b07-l04',
    atWork: 'Kamu akan memasang tombol "Masuk dengan akun lain" memakai library auth, bukan menulis alur OAuth sendiri.',
    steps: [
      storyStep('b07/kunci-valet.svg', [
        rText(
          'Kunci valet hanya bisa menyalakan mesin dan menyetir pelan, tidak bisa membuka bagasi. Bagaimana aplikasi bisa mendapat akses terbatas seperti itu ke akunmu?',
        ),
      ]),
      conceptStep({
        title: t('Empat pemain dan scope'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'pemain-oauth' },
        alt: t('Resource owner, Client, Authorization server, Resource server, dan Scope izin.'),
        body: [
          rTerm('oauth', 'OAuth 2.0'),
          rText(
            ' adalah cara memberi izin terbatas ke aplikasi lain, tanpa menyerahkan kata sandi. Ada empat pemain. Resource owner: kamu, pemilik akun. Client: aplikasi yang meminta izin. Authorization server: server pemberi izin. Resource server: server penyimpan datamu. ',
          ),
          rCode('Scope'),
          rText(' adalah daftar izin terbatas, seperti '),
          rCode('email'),
          rText(' atau '),
          rCode('profile'),
          rText(', bukan akses ke seluruh akun.'),
        ],
      }),
      qStep({
        id: 'b07-l05-q2',
        type: 'match',
        prompt: t('Pasangkan peran pemain OAuth 2.0 dengan contohnya saat kamu masuk ke aplikasi kuis memakai akun Toko Rani:'),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('Resource owner') },
          { id: 'l2', label: t('Client') },
          { id: 'l3', label: t('Authorization server') },
          { id: 'l4', label: t('Resource server') },
        ],
        right: [
          { id: 'r1', label: t('Kamu sebagai pemilik akun') },
          { id: 'r2', label: t('Aplikasi kuis yang meminta izin') },
          { id: 'r3', label: t('Layanan login yang memeriksa identitas dan meminta persetujuan') },
          { id: 'r4', label: t('Server yang menyimpan data akunmu') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
        explainCorrect: t('Resource owner adalah kamu, dan Client adalah aplikasi kuis. Authorization server memberi izin, dan Resource server menyimpan datamu.'),
        hints: [t('Cari siapa yang memiliki akun, dan siapa yang meminta izin.'), undefined],
        tags: ['oauth'],
      }),
      conceptStep({
        title: t('Authorization Code dan PKCE'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b07', topic: 'oauth-pkce' },
        alt: t('Diarahkan ke halaman resmi, login di penyedia, izinkan scope, dapat kode, lalu tukar dengan bukti PKCE.'),
        body: [
          rText(
            'Alur yang dianjurkan punya lima langkah. Kamu diarahkan ke halaman resmi penyedia, login di sana, lalu menyetujui scope. Penyedia mengembalikan kamu ke aplikasi dengan kode sekali pakai. Aplikasi menukar kode itu dengan token, disertai bukti acak ',
          ),
          rText('PKCE'),
          rText(' ("pixy") agar kode curian tidak bisa ditukar.'),
        ],
      }),
      qStep({
        id: 'b07-l05-q3',
        type: 'order',
        prompt: t('Urutkan 5 langkah alur Authorization Code dengan PKCE:'),
        difficulty: 3,
        items: [
          { id: 's4', label: t('Penyedia mengembalikan pembeli ke aplikasi dengan kode sekali pakai') },
          { id: 's2', label: t('Pembeli mengetik kata sandi di halaman resmi penyedia') },
          { id: 's5', label: t('Aplikasi menukar kode dan bukti PKCE dengan access token') },
          { id: 's1', label: t('Aplikasi mengarahkan browser ke halaman resmi penyedia') },
          { id: 's3', label: t('Pembeli melihat scope yang diminta lalu menekan Izinkan') },
        ],
        answer: ['s1', 's2', 's3', 's4', 's5'],
        explainCorrect: t('Kata sandi hanya diketik di halaman resmi penyedia, bukan di aplikasi kuis.'),
        hints: [t('Kata sandi diketik sebelum kamu menyetujui scope.'), undefined],
        tags: ['oauth', 'browser'],
      }),
      conceptStep({
        title: t('OpenID Connect dan library teruji'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b07', topic: 'oidc-login' },
        alt: t('OIDC menambah token identitas di atas OAuth 2.0 untuk tombol Masuk dengan akun lain.'),
        body: [
          rText('OAuth awalnya dibuat untuk izin akses data, bukan untuk login. '),
          rCode('OpenID Connect'),
          rText(' menambah '),
          rCode('ID token'),
          rText(
            ', yaitu JWT yang berisi siapa kamu, di atas OAuth untuk tombol "Masuk dengan akun lain". Jangan membangun OAuth dari nol. Pakai layanan atau library auth yang sudah teruji.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Kunci valet mobil mewah'),
        same: [
          t('Memberi hak pakai terbatas (scope) tanpa menyerahkan kunci utama (kata sandi).'),
        ],
        different: [
          t('Kunci valet diberikan langsung oleh pemilik mobil. Di OAuth, pemilik menyetujui izin di halaman penyedia, lalu aplikasi menukar kode dengan token.'),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'pembaca-gelang-jwt',
        t('Amati token identitas di simulator, yang diberikan setelah alur OAuth selesai.'),
      ),
      qStep(
        makeMcq({
          id: 'b07-l05-q1',
          type: 'analogy',
          prompt: t('Mengapa OAuth 2.0 disebut mirip kunci valet mobil?'),
          choices: [
            { id: 'lim', label: t('Aplikasi hanya mendapat akses terbatas tanpa tahu sandimu') },
            {
              id: 'all',
              label: t('Aplikasi mendapat kunci utama untuk mengedit seluruh akunmu'),
              explainWrong: t('OAuth justru mencegah pemberian akses penuh dan kata sandi.'),
            },
            {
              id: 'car',
              label: t('Izin aplikasi hangus setelah dipakai sekali saja'),
              explainWrong: t('Izin OAuth berlaku sesuai scope dan masa berlaku token. Ia tidak otomatis hangus sekali pakai.'),
            },
          ],
          answer: 'lim',
          explainCorrect: t('Scope membatasi apa yang boleh dilakukan aplikasi lain, persis seperti kunci valet.'),
          hints: [t('Ingat apa yang tidak bisa dibuka kunci valet.')],
          tags: ['oauth'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l05-q4',
          type: 'why',
          base: 'Tombol "Masuk dengan Akun Penyedia" memakai OpenID Connect (OIDC) di atas OAuth 2.0.',
          prompt: t('Mengapa OAuth 2.0 butuh tambahan OpenID Connect untuk login?'),
          difficulty: 2,
          choices: [
            { id: 'id', label: t('OAuth memberi izin, OIDC menambah ID token berisi identitas') },
            {
              id: 'css',
              label: t('OAuth hanya bisa bekerja di aplikasi HP'),
              explainWrong: t('OAuth dipakai di web dan aplikasi HP. Alasannya bukan soal jenis perangkat.'),
            },
            {
              id: 'db',
              label: t('OAuth hanya bisa memberi izin baca, tidak bisa mengubah data apa pun'),
              explainWrong: t('OAuth bisa memberi izin baca maupun ubah, sesuai scope. Yang belum ada adalah identitas pemakai.'),
            },
          ],
          answer: 'id',
          explainCorrect: t('OIDC melengkapi OAuth dengan token identitas berformat JWT, untuk membuktikan siapa pemakainya.'),
          hints: [t('OAuth menjawab "boleh apa", bukan "siapa kamu".')],
          tags: ['oauth', 'jwt', 'autentikasi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l05-q5',
          type: 'limit',
          analogy: t('Kunci valet mobil'),
          prompt: t('Mengapa pengembang sebaiknya memakai library auth teruji, bukan membuat OAuth sendiri?'),
          difficulty: 2,
          choices: [
            { id: 'sec', label: t('Detail keamanan seperti PKCE mudah salah kalau ditulis sendiri') },
            {
              id: 'ban',
              label: t('OAuth melarang pembuatan kode di server sendiri'),
              explainWrong: t('Kode sendiri boleh dibuat, tetapi risiko salah di bagian keamanan sangat besar.'),
            },
            {
              id: 'slow',
              label: t('Library selalu lebih cepat dan lebih ringan daripada kode buatan sendiri'),
              explainWrong: t('Alasan utamanya keamanan, bukan kecepatan.'),
            },
          ],
          answer: 'sec',
          explainCorrect: t('Pakai layanan atau library teruji, karena alur login yang salah satu langkah saja bisa membuka celah.'),
          hints: [t('Pikirkan risiko kalau satu langkah keamanan terlewat.')],
          tags: ['oauth', 'autentikasi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b07-l05-q6',
          type: 'scenario',
          story: t('Situs game kecil menampilkan formulir berlogo penyedia login. Formulir itu meminta kamu mengetik email dan kata sandi akun utamamu di situs game.'),
          prompt: t('Mengapa alur ini berbahaya dan bukan cara kerja OAuth yang benar?'),
          difficulty: 2,
          choices: [
            { id: 'phish', label: t('Di OAuth, sandi hanya diketik di halaman resmi penyedia') },
            {
              id: 'fast',
              label: t('Situs game tidak boleh memakai logo penyedia login dalam formulirnya'),
              explainWrong: t('Logo bukan masalah utamanya. Masalahnya situs game bisa mencuri kata sandimu.'),
            },
            {
              id: 'json',
              label: t('Bahayanya hanya muncul kalau situs game tidak memakai HTTPS'),
              explainWrong: t('HTTPS hanya melindungi jalur kirim. Sandi tetap jatuh ke tangan situs game.'),
            },
          ],
          answer: 'phish',
          explainCorrect: t('Pastikan halaman login ada di domain resmi penyedia, bukan formulir tiruan milik aplikasi.'),
          hints: [t('Tanya dulu: siapa yang seharusnya menerima kata sandimu?')],
          tags: ['oauth', 'autentikasi'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b07-l05-r1',
        prompt: t('Apa nama daftar izin terbatas yang diminta aplikasi dalam OAuth 2.0?'),
        choices: [
          { id: 'sc', label: t('Scope') },
          {
            id: 'pk',
            label: t('Signature'),
            explainWrong: t('Signature adalah cap pada JWT. Daftar izin di OAuth disebut scope.'),
          },
          {
            id: 'rt',
            label: t('Refresh token'),
            explainWrong: t('Refresh token dipakai untuk menukar access token baru. Daftar izin disebut scope.'),
          },
        ],
        answer: 'sc',
        explainCorrect: t('Scope membatasi hak apa saja yang diizinkan pemakai untuk diakses aplikasi.'),
        tags: ['oauth'],
      }),
      makeTf({
        id: 'b07-l05-r2',
        prompt: t('Pada alur Authorization Code dengan PKCE, aplikasi tidak pernah menerima kata sandi asli pemakai.'),
        answer: true,
        explainCorrect: t('Kamu login langsung di server penyedia. Aplikasi hanya menerima kode, lalu menukarnya dengan token.'),
        explainWrong: t('Kata sandi hanya diketik di halaman resmi penyedia. Aplikasi hanya menerima kode, lalu menukarnya dengan token.'),
        tags: ['oauth'],
      }),
    ],
    recap: t('OAuth 2.0 memberi akses sebatas scope lewat Authorization Code dan PKCE, tanpa membocorkan kata sandi.'),
  }),
];
