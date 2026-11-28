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
import type { Lesson, Rich, World } from '@/content/schema';
import { reactComponentState } from './workshop-react';

/** Istilah glosarium yang hanya tampil di Junior (Petualang). */
const jTerm = (termId: string, text: string): Rich => ({
  t: 'term',
  termId,
  v: { junior: text, pro: text },
  modes: ['junior'],
});

/** Istilah glosarium yang hanya tampil di Pro. */
const pTerm = (termId: string, text: string): Rich => ({
  t: 'term',
  termId,
  v: { junior: text, pro: text },
  modes: ['pro'],
});

export const world: World = {
  id: 'b09',
  track: 'B',
  order: 9,
  title: 'Dapur Frontend',
  tagline: t(
    'Aplikasi menunggu jawaban dari dapur. Rancang empat wajah layar untuk saat itu.',
    'Kamu bisa mengambil data dengan aman dan merancang layar untuk keadaan memuat, kosong, gagal, dan berhasil.',
  ),
  color: '#2F6FED',
  illustration: 'b09-dapur-frontend',
  sourceChapters: ['J2-14', 'J2-15'],
  requires: ['b08'],
  lessons: ['b09-l01', 'b09-l02', 'b09-l03', 'b09-l04', 'b09-l05', 'b09-l06'],
  sideQuests: [reactComponentState.id],
  boss: {
    title: 'Tantangan Penjaga Dapur',
    greeting: t(
      'Halo! Tunjukkan 4 wajah layar yang ramah saat data datang.',
      'Buktikan kamu bisa membuat fetch yang tahan error dan layar yang ramah di semua keadaan.',
    ),
    guardianName: 'Penjaga Dapur',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'b09-anc-j1',
        prompt: t(
          'Aplikasi menunggu data datang. Apa yang sebaiknya tampil di layar?',
          'Aplikasi sedang menunggu data datang dari server. Apa yang sebaiknya tampil di layar?',
        ),
        choices: [
          {
            id: 'skel',
            label: t('Kotak bayangan abu-abu berkedip', 'Kerangka bayangan (loading skeleton)'),
          },
          {
            id: 'blank',
            label: t('Layar putih polos tanpa isi', 'Layar putih polos tanpa tanda apa pun'),
            explainWrong: t(
              'Layar putih terlihat seperti aplikasi yang macet. Orang bingung harus menunggu atau pergi.',
              'Layar polos membuat orang mengira aplikasi macet.',
            ),
          },
          {
            id: 'red',
            label: t('Tanda seru merah yang besar', 'Peringatan rusak berwarna merah besar'),
            explainWrong: t(
              'Merah artinya ada yang gagal. Data ini baru dijemput, belum gagal.',
              'Data baru sedang dimuat dan belum gagal.',
            ),
          },
        ],
        answer: 'skel',
        explainCorrect: t(
          'Kotak bayangan memberi tanda bahwa data sedang dijemput. Seperti meja yang sudah ditata sebelum makanan datang.',
          'Skeleton menandakan data sedang dijemput dan segera tampil.',
        ),
        tags: ['empat-keadaan'],
      }),
      makeAnchorMcq({
        id: 'b09-anc-j2',
        prompt: t(
          'Internet putus dan halaman gagal dimuat. Apa yang paling membantu di layar?',
          'Jaringan putus dan data gagal diambil. Apa yang paling membantu di layar error?',
        ),
        choices: [
          {
            id: 'retry',
            label: t('Pesan ramah dan tombol Coba lagi', 'Tombol "Coba lagi" dan penjelasan singkat'),
          },
          {
            id: 'none',
            label: t('Layar putih tanpa pesan apa pun', 'Layar putih tanpa tombol apa pun'),
            explainWrong: t(
              'Tanpa pesan, orang tidak tahu apa yang terjadi. Mereka juga tidak tahu harus berbuat apa.',
              'Tanpa tombol, orang bingung harus berbuat apa.',
            ),
          },
          {
            id: 'buy',
            label: t('Deretan huruf dan angka tanpa pesan', 'Kode error mentah dari server'),
            explainWrong: t(
              'Kode sulit dipahami. Jelaskan masalahnya dan beri cara mencoba lagi.',
              'Kode mentah sulit dipahami orang awam. Layar error perlu kalimat biasa dan tombol ulang.',
            ),
          },
        ],
        answer: 'retry',
        explainCorrect: t(
          'Pesan singkat menjelaskan masalahnya. Tombol Coba lagi mengulang pesanan.',
          'Layar error yang baik menjelaskan masalah dan memberi tombol "Coba lagi".',
        ),
        tags: ['empat-keadaan'],
      }),
      makeAnchorMcq({
        id: 'b09-anc-j3',
        prompt: t(
          'Keranjang belanjamu belum berisi barang. Wajah apa yang cocok untuk layar?',
          'Request ke server berhasil, tetapi daftar keranjang berisi 0 barang. Layar ada di keadaan apa?',
        ),
        choices: [
          { id: 'emp', label: t('Kosong, belum ada isinya', 'Kosong (empty state)') },
          {
            id: 'load',
            label: t('Sedang memuat, masih menunggu', 'Sedang memuat'),
            explainWrong: t(
              'Keranjangnya sudah terbuka. Kamu belum memasukkan barang.',
              'Request sudah selesai dengan berhasil. Hanya datanya yang belum ada.',
            ),
          },
          {
            id: 'crash',
            label: t('Gagal, ada yang rusak', 'Gagal karena server error'),
            explainWrong: t(
              'Tidak ada yang rusak. Keranjang memang belum berisi.',
              'Data kosong bukan berarti server error.',
            ),
          },
        ],
        answer: 'emp',
        explainCorrect: t(
          'Keadaan kosong bukan gagal. Layar mengajak orang mulai, misalnya "Mulai belanja".',
          'Keadaan kosong bukan error. Layar mengajak mengambil langkah pertama, misalnya "Mulai belanja".',
        ),
        tags: ['empat-keadaan'],
      }),
      makeAnchorMcq({
        id: 'b09-anc-j4',
        prompt: t(
          'Mengapa keadaan kosong perlu pesan ajakan?',
          'Mengapa keadaan kosong perlu pesan ajakan?',
        ),
        choices: [
          {
            id: 'guide',
            label: t('Supaya orang tahu langkah berikutnya', 'Supaya orang tahu langkah berikutnya dan tidak mengira halaman rusak'),
          },
          {
            id: 'hide',
            label: t('Supaya halaman terlihat lebih penuh', 'Supaya halaman terlihat lebih penuh dan ramai'),
            explainWrong: t(
              'Pesan ajakan bukan hiasan. Ia menunjukkan langkah pertama.',
              'Pesan ajakan bukan hiasan. Tujuannya menunjukkan langkah pertama.',
            ),
          },
          {
            id: 'size',
            label: t('Supaya halaman lebih cepat dimuat', 'Supaya data tiba lebih cepat dari server'),
            explainWrong: t(
              'Pesan itu tidak mengubah kecepatan. Ia hanya menuntun langkah orang.',
              'Pesan di layar tidak mengubah kecepatan server.',
            ),
          },
        ],
        answer: 'guide',
        explainCorrect: t(
          'Ajakan seperti "Mulai belanja" menuntun orang. Mereka tidak mengira halamannya rusak.',
          'Pesan seperti "Belum ada pesanan. Mulai belanja!" menuntun orang ke langkah berikutnya.',
        ),
        tags: ['empat-keadaan', 'ux'],
      }),
      makeAnchorMcq({
        id: 'b09-anc-j5',
        prompt: t(
          'Tampilan saat belanja berhasil sudah dibuat. Apa lagi yang perlu dirancang?',
          'Tampilan saat data tersedia sudah dirancang. Keadaan mana yang masih perlu dibuat?',
        ),
        choices: [
          {
            id: 'three',
            label: t('Memuat, gagal, dan kosong', 'Keadaan memuat, gagal, dan kosong'),
          },
          {
            id: 'ok',
            label: t('Memuat, kosong, dan berhasil', 'Keadaan memuat, kosong, dan berhasil'),
            explainWrong: t(
              'Wajah berhasil sudah ada. Tambahkan wajah untuk kegagalan.',
              'Keadaan berhasil sudah ada. Rancang juga tampilan ketika permintaan gagal.',
            ),
          },
          {
            id: 'logo',
            label: t('Gagal, kosong, dan berhasil', 'Keadaan gagal, kosong, dan berhasil'),
            explainWrong: t(
              'Wajah berhasil sudah ada. Tambahkan wajah saat orang menunggu.',
              'Keadaan berhasil sudah ada. Rancang juga tampilan selama permintaan berjalan.',
            ),
          },
        ],
        answer: 'three',
        explainCorrect: t(
          'Orang perlu tahu saat menunggu, saat gagal, atau saat keranjang kosong.',
          'Layar perlu empat keadaan: loading, error, kosong, dan berhasil.',
        ),
        tags: ['empat-keadaan'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'b09-anc-p1',
        prompt: t('Server membalas fetch() dengan status 404 atau 500. Apa jebakan paling umum?'),
        choices: [
          { id: 'ok', label: t('fetch() tidak melempar error, jadi res.ok harus dicek sendiri') },
          {
            id: 'json',
            label: t('fetch() mengubah status 404 menjadi 200 OK secara otomatis'),
            explainWrong: t('fetch() tidak mengubah status. Status 404 tetap 404 dan tetap masuk alur normal.'),
          },
          {
            id: 'cors',
            label: t('fetch() mengulang request sampai tiga kali sebelum menyerah'),
            explainWrong: t('fetch() tidak mengulang request sendiri. Percobaan ulang harus kamu tulis.'),
          },
        ],
        answer: 'ok',
        explainCorrect: t('fetch() hanya menolak promise saat jaringan gagal. Status 4xx dan 5xx tetap masuk alur normal, jadi cek if (!res.ok).'),
        tags: ['fetch', 'status-code'],
      }),
      makeAnchorMcq({
        id: 'b09-anc-p2',
        prompt: t('Mengapa pencarian instan memakai debounce bersama AbortController?'),
        choices: [
          { id: 'race', label: t('Debounce mengurangi request, AbortController membatalkan request yang sudah berangkat') },
          {
            id: 'auth',
            label: t('Debounce membatalkan request lama, AbortController menunda pengiriman'),
            explainWrong: t('Peran keduanya tertukar. Debounce menunda pengiriman, AbortController membatalkan request lama.'),
          },
          {
            id: 'form',
            label: t('Keduanya mempercepat server menjawab setiap request pencarian'),
            explainWrong: t('Keduanya bekerja di sisi frontend. Kecepatan server tidak berubah.'),
          },
        ],
        answer: 'race',
        explainCorrect: t('Keduanya mencegah request berlebih dan mencegah hasil lambat menimpa hasil terbaru (race condition).'),
        tags: ['debounce', 'fetch'],
      }),
      makeAnchorMcq({
        id: 'b09-anc-p3',
        prompt: t('Kapan optimistic update sebaiknya tidak dipakai?'),
        choices: [
          { id: 'pay', label: t('Aksi berisiko tinggi seperti konfirmasi pembayaran') },
          {
            id: 'like',
            label: t('Menekan ikon hati pada postingan'),
            explainWrong: t('Like berdampak ringan. Kalau gagal, tampilan cukup dikembalikan.'),
          },
          {
            id: 'save',
            label: t('Mencentang item daftar tugas sederhana'),
            explainWrong: t('Centang catatan berdampak ringan dan hampir selalu berhasil.'),
          },
        ],
        answer: 'pay',
        explainCorrect: t('Pembayaran tidak boleh menampilkan "Berhasil!" sebelum server mengonfirmasi. Uang yang salah catat sulit dikembalikan.'),
        tags: ['optimistic-ui'],
      }),
      makeAnchorMcq({
        id: 'b09-anc-p4',
        prompt: t('Nama variabel .env mana yang berbahaya untuk menyimpan kunci rahasia di Next.js atau Vite?'),
        choices: [
          { id: 'pub', label: t('NEXT_PUBLIC_API_KEY, karena awalan itu ikut terkirim ke browser') },
          {
            id: 'srv',
            label: t('RAJA_API_SECRET yang hanya dibaca di Route Handler'),
            explainWrong: t('Tanpa awalan publik, nilainya hanya terbaca di kode server.'),
          },
          {
            id: 'port',
            label: t('PORT yang dibaca server saat aplikasi dijalankan'),
            explainWrong: t('PORT hanya berisi nomor port dan bukan rahasia. Nilainya dibaca di server.'),
          },
        ],
        answer: 'pub',
        explainCorrect: t('Awalan NEXT_PUBLIC_ dan VITE_ sengaja menyalin nilai ke kode browser. Rahasia tidak boleh memakainya.'),
        tags: ['bff', 'rahasia-frontend'],
      }),
      makeAnchorMcq({
        id: 'b09-anc-p5',
        prompt: t('Apa gunanya Mock Service Worker (MSW) saat backend asli belum jadi?'),
        choices: [
          { id: 'msw', label: t('Mencegat request di browser dan membalas data tiruan sesuai kontrak') },
          {
            id: 'css',
            label: t('Menguji beban backend asli sebelum aplikasi dirilis'),
            explainWrong: t('MSW tidak menguji beban. Ia justru menggantikan backend untuk sementara.'),
          },
          {
            id: 'db',
            label: t('Mengubah kode fetch otomatis setelah backend asli siap'),
            explainWrong: t('Kode fetch tidak perlu diubah. Itu keuntungan utama MSW.'),
          },
        ],
        answer: 'msw',
        explainCorrect: t('Kode frontend tetap memanggil endpoint yang sama. Balasannya data tiruan sesuai kontrak.'),
        tags: ['openapi', 'kontrak-api'],
      }),
      makeAnchorMcq({
        id: 'b09-anc-p6',
        type: 'limit',
        analogy: t('Pelayan langsung menulis "Siap!" sebelum koki mengecek stok'),
        prompt: t('Apa batasan optimistic update dibanding pelayan di restoran?'),
        choices: [
          { id: 'roll', label: t('Kode harus menyiapkan rollback dan pemberitahuan kalau server menolak') },
          {
            id: 'fast',
            label: t('Orang langsung melihat perubahan tampilan tanpa menunggu jeda'),
            explainWrong: t('Itu keuntungan, sama seperti pelayan yang cepat. Itu bukan batasannya.'),
          },
          {
            id: 'wait',
            label: t('Pengecekan di server tetap berjalan di latar belakang'),
            explainWrong: t('Itu kesamaannya: pengecekan tetap berjalan di belakang.'),
          },
        ],
        answer: 'roll',
        explainCorrect: t('Tanpa rollback, layar menampilkan sukses palsu padahal data di server tidak berubah.'),
        tags: ['optimistic-ui'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'b09-l01',
    worldId: 'b09',
    title: 'Fetch yang benar',
    modes: ['pro'],
    objective: t('Kamu bisa menulis fetch yang aman: cek res.ok, kirim JSON, dan bungkus dalam apiFetch().'),
    estMinutes: 6,
    introducesTerms: [],
    usesTerms: ['fetch', 'api', 'json', 'status-code', 'header-body', 'http-method', 'cookie-cache', 'protobuf', 'refresh-token'],
    warmupFrom: 'b08-l05',
    atWork: 'Di tab Network, kamu akan melihat 404 dari fetch yang lolos tanpa error, lalu menambahkan pengecekan res.ok.',
    steps: [
      storyStep('b09/fetch-benar.svg', [
        rText('Form pesanan Toko Rani memanggil URL yang salah dan menerima 404, tetapi blok try/catch tetap tenang. Mengapa fetch() tidak melempar error?'),
      ]),
      conceptStep({
        title: t('Jebakan nomor satu: cek res.ok'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b09', topic: 'cek-res-ok' },
        alt: t('fetch tidak menganggap 404 atau 500 sebagai error, jadi res.ok harus dicek.'),
        code: {
          lang: 'js',
          code: 'const res = await fetch(`https://api.toko-rani.example/v1/produk/${id}`, {\n  headers: { Accept: "application/json" },\n});\nif (!res.ok) {\n  const info = await res.json().catch(() => ({}));\n  throw new Error(info?.error?.pesan || `Gagal (${res.status})`);\n}\nreturn res.json();',
        },
        body: [
          rTerm('fetch', 'fetch'),
          rText(' hanya melempar error kalau jaringan putus. Status 404 atau 500 tetap dianggap selesai, jadi kamu perlu memeriksa '),
          rCode('res.ok'),
          rText(' (bernilai true untuk status 200–299). Axios berbeda: library itu otomatis menganggap status 4xx dan 5xx sebagai error.'),
        ],
      }),
      qStep({
        id: 'b09-l01-q1',
        type: 'spotbug',
        difficulty: 2,
        prompt: t('Ketuk baris yang memanggil res.json() tanpa memeriksa res.ok.'),
        lines: [
          'async function ambilProduk(id) {',
          '  const res = await fetch(`https://api.toko-rani.example/v1/produk/${id}`);',
          '  return res.json();',
          '}',
        ],
        answer: [3],
        explainCorrect: t('Baris 3 membaca balasan tanpa memeriksa status. Tambahkan if (!res.ok) throw new Error(...) sebelum baris itu.'),
        hints: [t('Cari baris yang membaca isi balasan.'), undefined],
        tags: ['fetch', 'status-code'],
      }),
      conceptStep({
        title: t('Mengirim JSON, cookie, dan file'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b09', topic: 'kirim-json-formdata' },
        alt: t('POST JSON dengan Content-Type dan credentials include; FormData tanpa Content-Type manual.'),
        code: {
          lang: 'js',
          code: 'await fetch("/api/pesanan", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ produk_id: 12, jumlah: 2 }),\n  credentials: "include",\n});',
        },
        body: [
          rText('Untuk mengirim JSON, pasang '),
          rCode('Content-Type: application/json'),
          rText(' dan ubah objek dengan '),
          rCode('JSON.stringify()'),
          rText('. Tambahkan '),
          rCode('credentials: "include"'),
          rText(' kalau butuh cookie login. Untuk mengunggah file, pakai '),
          rCode('FormData'),
          rText('. Browser mengisi Content-Type dengan boundary, yaitu penanda pemisah bagian formulir.'),
        ],
      }),
      qStep({
        id: 'b09-l01-q3',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi kode POST ini agar mengirim JSON dan membawa cookie login.'),
        template: 'await fetch("/api/pesanan", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: ___(data),\n  credentials: "___",\n});',
        bank: ['JSON.stringify', 'include', 'JSON.parse', 'exclude'],
        answer: ['JSON.stringify', 'include'],
        explainCorrect: t('JSON.stringify mengubah objek menjadi teks JSON. credentials: "include" ikut mengirim cookie login.'),
        hints: [t('Ubah objek menjadi teks JSON. Pilih nilai yang ikut mengirim cookie.'), undefined],
        tags: ['fetch', 'json', 'cookie-cache'],
      }),
      conceptStep({
        title: t('Pembungkus apiFetch()'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b09', topic: 'pembungkus-apifetch' },
        alt: t('apiFetch() menambah header, menangani 401, dan memeriksa bentuk data.'),
        body: [
          rText('Jangan menulis ulang header dan pengecekan error di setiap halaman. Buat satu fungsi pembungkus '),
          rCode('apiFetch()'),
          rText(' yang menyisipkan token dan menangani 401 lewat '),
          rTerm('refresh-token', 'refresh token'),
          rText('. Fungsi yang sama juga memeriksa bentuk response saat aplikasi berjalan, memakai TypeScript dan Zod.'),
        ],
      }),
      limitStep({
        analogy: t('Kurir yang pulang membawa amplop berarti paket berhasil'),
        same: [
          t('Kurir memang kembali dan membawa amplop balasan dari server.'),
        ],
        different: [
          t('Amplop balasan bisa berisi penolakan 404 atau 500. Periksa res.ok sebelum membaca isinya sebagai data.'),
        ],
        riskyAnalogy: false,
      }),
      simStep(
        'empat-wajah-layar',
        t('Ubah hasil panggilan fetch di simulator, lalu lihat keadaan layar yang muncul.'),
      ),
      qStep(
        makeMcq({
          id: 'b09-l01-q2',
          type: 'why',
          base: 'await fetch("/api/unggah", { method: "POST", body: formData });',
          prompt: t('Mengapa header Content-Type tidak boleh ditulis manual saat mengunggah FormData?'),
          choices: [
            { id: 'bound', label: t('Browser mengisi Content-Type multipart dan kode boundary-nya sendiri') },
            {
              id: 'ban',
              label: t('Request POST yang membawa body tidak boleh memakai header kustom'),
              explainWrong: t('POST boleh membawa header kustom. Masalahnya, boundary multipart hanya diketahui browser.'),
            },
            {
              id: 'json',
              label: t('FormData sebenarnya dikirim sebagai JSON, jadi tipenya diatur otomatis'),
              explainWrong: t('FormData dikirim sebagai multipart, bukan JSON. Boundary-nya dibuat browser.'),
            },
          ],
          answer: 'bound',
          explainCorrect: t('Content-Type multipart butuh kode boundary yang dibuat browser. Kalau ditulis manual tanpa boundary, server gagal memisahkan file dan isian form.'),
          tags: ['fetch', 'header-body', 'protobuf'],
        }),
      ),
      qStep(
        makeTf({
          id: 'b09-l01-q4',
          prompt: t('Berbeda dari fetch, Axios otomatis menganggap status 4xx dan 5xx sebagai error yang masuk ke catch.'),
          answer: true,
          explainCorrect: t('Axios menolak promise untuk status 4xx dan 5xx. fetch tidak melakukannya.'),
          explainWrong: t('Axios memang menganggap 4xx dan 5xx sebagai error. Itu pembeda utamanya dari fetch.'),
          tags: ['fetch', 'status-code'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b09-l01-q5',
          type: 'limit',
          analogy: t('Kurir kembali membawa amplop'),
          prompt: t('Apa beda perilaku fetch() saat jaringan putus dan saat server membalas 500?'),
          choices: [
            { id: 'net', label: t('Jaringan putus masuk ke catch(), status 500 tetap dianggap berhasil') },
            {
              id: 'same',
              label: t('Keduanya sama-sama masuk ke catch(), jadi satu blok penanganan cukup'),
              explainWrong: t('Status 500 tetap diterima fetch() sebagai balasan yang sampai. Karena itu res.ok perlu dicek.'),
            },
            {
              id: 'skip',
              label: t('Status 500 membuat fetch() mencoba ulang request beberapa kali'),
              explainWrong: t('fetch() tidak mengulang request sendiri. Percobaan ulang harus kamu tulis.'),
            },
          ],
          answer: 'net',
          explainCorrect: t('Hanya kegagalan jaringan yang membuat fetch() menolak promise. Itu alasan if (!res.ok) wajib ada.'),
          tags: ['fetch', 'status-code'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b09-l01-q6',
          type: 'scenario',
          story: t('Backend Toko Rani mengganti nama properti "harga" menjadi "hargaSatuan". TypeScript tidak tahu perubahan itu saat kompilasi, karena data baru datang lewat jaringan.'),
          prompt: t('Apa yang membuat perubahan bentuk response langsung ketahuan saat aplikasi berjalan?'),
          choices: [
            { id: 'zod', label: t('Validasi response saat aplikasi berjalan, misalnya dengan schema Zod') },
            {
              id: 'css',
              label: t('Menulis tipe TypeScript untuk bentuk response di seluruh kode frontend'),
              explainWrong: t('Tipe TypeScript hilang saat aplikasi berjalan. Ia tidak memeriksa data dari jaringan.'),
            },
            {
              id: 'html',
              label: t('Memeriksa res.ok sebelum memanggil res.json() di setiap pemanggilan fetch'),
              explainWrong: t('res.ok hanya memeriksa status. Nama properti yang berubah tetap lolos.'),
            },
          ],
          answer: 'zod',
          explainCorrect: t('Schema Zod memeriksa data saat aplikasi berjalan. Properti yang hilang atau berganti nama langsung terdeteksi.'),
          tags: ['fetch', 'json'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b09-l01-r1',
        prompt: t('Properti apa pada objek Response yang bernilai true hanya untuk status 200–299?'),
        choices: [
          { id: 'ok', label: t('res.ok') },
          { id: 'err', label: t('res.status'), explainWrong: t('res.status berisi angka status, misalnya 404. Yang bernilai true atau false adalah res.ok.') },
        ],
        answer: 'ok',
        explainCorrect: t('Periksa if (!res.ok) sebelum membaca res.json().'),
        tags: ['fetch', 'status-code'],
      }),
      makeTf({
        id: 'b09-l01-r2',
        prompt: t('Satu pembungkus apiFetch() menyatukan penambahan header token, penanganan 401, dan pesan error.'),
        answer: true,
        explainCorrect: t('Kode frontend jadi lebih rapi dan konsisten di semua halaman.'),
        explainWrong: t('apiFetch() justru mencegah kode yang sama ditulis ulang di tiap komponen.'),
        tags: ['fetch', 'refresh-token'],
      }),
    ],
    recap: t('Cek res.ok setelah fetch(), dan biarkan FormData mengisi Content-Type sendiri. Pusatkan logika di apiFetch().'),
  }),

  makeLesson({
    id: 'b09-l02',
    worldId: 'b09',
    title: 'Empat keadaan layar',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menyebut 4 wajah layar saat data datang.',
      'Kamu bisa merancang layar untuk empat keadaan: memuat, gagal, kosong, dan berhasil.',
    ),
    estMinutes: 7,
    introducesTerms: ['empat-keadaan'],
    usesTerms: ['api', 'fetch', 'ui', 'ux', 'state-ui'],
    stickerId: 'empat-wajah',
    warmupFrom: 'b09-l01',
    atWork: 'Kamu akan merancang keempat keadaan ini di setiap halaman yang mengambil daftar produk atau pesanan dari API.',
    steps: [
      storyStep('b09/empat-wajah.svg', [
        rJunior('Kamu memesan makanan di restoran. Pelayan pergi ke dapur lalu kembali. Apa saja 4 kemungkinan jawabannya?'),
        rPro('Halaman "Pesanan Saya" Toko Rani hanya dirancang untuk data yang berhasil tampil. Saat API lambat, gagal, atau kosong, layarnya berantakan.'),
      ]),
      conceptStep({
        title: t('1. Sedang memuat', '1. Keadaan loading'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b09', topic: 'keadaan-loading' },
        alt: t(
          'Kotak abu-abu berkedip mengisi layar saat data masih dimuat.',
          'Skeleton berkedip di layar saat data masih dimuat.',
        ),
        body: [
          rJunior('Layar punya 4 wajah, namanya '),
          jTerm('empat-keadaan', 'empat wajah layar'),
          rJunior('. Wajah pertama muncul saat dapur masih memasak. Layar menampilkan kotak bayangan abu-abu sebagai tanda: sebentar lagi isinya datang.'),
          rPro('Selama data diambil, tampilkan kerangka kotak abu-abu yang disebut '),
          rCode('skeleton', ['pro']),
          rPro('. Layar putih kosong membuat orang mengira aplikasinya macet.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b09-l02-q5',
          prompt: t(
            'Layar sedang menunggu data. Mengapa kotak bayangan lebih baik daripada layar putih?',
            'Mengapa saat loading skeleton lebih baik daripada layar putih kosong?',
          ),
          choices: [
            {
              id: 'fb',
              label: t('Orang tahu aplikasi sedang bekerja', 'Orang tahu aplikasi bekerja dan melihat bentuk isinya'),
            },
            {
              id: 'fast',
              label: t('Kotak bayangan membuat data datang lebih cepat', 'Skeleton membuat server menjawab lebih cepat daripada layar kosong'),
              explainWrong: t(
                'Kotak bayangan tidak mempercepat dapur. Ia hanya menemani kamu menunggu.',
                'Skeleton tidak mengubah kecepatan server. Ia hanya mengisi waktu tunggu dengan tampilan yang berguna.',
              ),
            },
            {
              id: 'skip',
              label: t('Kotak bayangan menyimpan data lama', 'Skeleton menyimpan data lama agar bisa dipakai lagi'),
              explainWrong: t(
                'Kotak bayangan hanya gambar sementara. Isi aslinya tetap datang dari dapur.',
                'Skeleton hanya gambar sementara. Datanya tetap diambil dari server seperti biasa.',
              ),
            },
          ],
          answer: 'fb',
          explainCorrect: t(
            'Kotak bayangan memberi tanda bahwa aplikasi bekerja. Seperti meja yang sudah ditata sebelum makanan datang.',
            'Skeleton menunjukkan bentuk halaman sebelum datanya tiba. Waktu tunggu terasa lebih singkat.',
          ),
          hints: [t('Bayangkan meja yang sudah ditata, makanan belum datang.')],
          tags: ['empat-keadaan', 'ui'],
        }),
      ),
      conceptStep({
        title: t('2. Gagal', '2. Keadaan error'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b09', topic: 'keadaan-error' },
        alt: t(
          'Layar menampilkan pesan ramah dan tombol Coba lagi.',
          'Layar error menjelaskan masalahnya dan menyediakan tombol Coba lagi.',
        ),
        body: [
          rJunior('Pesanan gagal karena kuenya jatuh. Pelayan menawarkan kue baru. Layar menjelaskan masalah lalu memberi tombol "Coba lagi".'),
          rPro('Saat jaringan putus atau server gagal, jelaskan masalahnya dengan ramah. Beri tombol '),
          rCode('Coba lagi', ['pro']),
          rPro(' agar orang bisa mengulang sendiri.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b09-l02-q1',
          type: 'analogy',
          prompt: t(
            'Pelayan menjatuhkan kue dan menawarkan kue baru. Itu mirip keadaan apa?',
            'Pelayan menjatuhkan kue dan menawarkan kue baru. Itu mirip keadaan apa di aplikasi?',
          ),
          choices: [
            {
              id: 'err',
              label: t('Gagal, dengan tombol Coba lagi', 'Error dengan tombol Coba lagi'),
            },
            {
              id: 'ok',
              label: t('Berhasil, makanan penuh di meja', 'Berhasil, makanan penuh di meja'),
              explainWrong: t(
                'Kue jatuh sebelum sampai ke meja. Pesanan pertama gagal.',
                'Pesanan pertama gagal saat diantar. Tawaran mengulang memberi kesempatan memulihkan kegagalan itu.',
              ),
            },
            {
              id: 'skel',
              label: t('Memuat, dapur masih memasak', 'Loading, dapur masih memasak'),
              explainWrong: t(
                'Pelayan sudah tahu pesanan gagal. Ia menawarkan untuk mengulang.',
                'Kegagalan sudah diketahui, jadi layar perlu jalan pemulihan, bukan lagi loading.',
              ),
            },
          ],
          answer: 'err',
          explainCorrect: t(
            'Pesanan pertama gagal. Pelayan menawarkan untuk mengantar kue lagi.',
            'Keadaan error perlu penjelasan dan jalan keluar. Tombol Coba lagi memberi pilihan mengulang.',
          ),
          hints: [t('Perhatikan apa yang pelayan lakukan setelah kue jatuh.')],
          tags: ['empat-keadaan', 'ux'],
        }),
      ),
      conceptStep({
        title: t('3. Kosong dan berhasil', '3. Keadaan kosong dan berhasil'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b09', topic: 'keadaan-kosong-berhasil' },
        alt: t(
          'Layar kosong mengajak mulai belanja, layar berhasil menampilkan daftar produk.',
          'Empty state menampilkan ajakan Mulai belanja, success menampilkan daftar produk.',
        ),
        body: [
          rJunior('Daftar masih 0 itu keadaan kosong, bukan gagal. Layar mengajak kamu mulai. Kalau ada isinya, layar menampilkannya.'),
          rPro('Keempat keadaan ini disebut '),
          pTerm('empat-keadaan', 'empat keadaan layar'),
          rPro('. Keadaan kosong terjadi saat request berhasil tetapi datanya 0, jadi arahkan orang dengan ajakan seperti "Mulai belanja". Keadaan berhasil menampilkan data dengan rapi.'),
        ],
      }),
      limitStep({
        analogy: t('Empat wajah ruang makan'),
        same: [
          t(
            'Pelayan selalu memberi kabar dari dapur.',
            'Orang selalu tahu apakah pesanan sedang dimasak, gagal, belum ada, atau sudah terhidang.',
          ),
        ],
        different: [
          t(
            'Layar kosong bukan sepi, tetapi ajakan untuk mulai.',
            'Di aplikasi, keadaan kosong (0 item) bukan kesalahan dapur, tetapi kesempatan mengajak orang melakukan aksi pertama.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'empat-wajah-layar',
        t(
          'Ketuk keempat tombol wajah layar di simulator.',
          'Ketuk keempat tombol di simulator, lalu amati perpindahan antara loading, error, kosong, dan berhasil.',
        ),
      ),
      qStep({
        id: 'b09-l02-q4',
        type: 'hotspot',
        difficulty: 1,
        prompt: t(
          'Daftar riwayat belanja masih 0. Ketuk wajah layar yang cocok.',
          'Request berhasil (200 OK), tetapi riwayat belanja masih 0. Ketuk keadaan layar yang harus tampil.',
        ),
        image: 'b09-hotspot',
        regions: [
          { id: 'loading', shape: 'rect', coords: [10, 10, 150, 50], label: 'Kotak abu-abu tanpa tulisan' },
          { id: 'error', shape: 'rect', coords: [170, 10, 150, 50], label: 'Pesan gangguan dan tombol Coba lagi' },
          { id: 'empty', shape: 'rect', coords: [10, 75, 150, 50], label: 'Keranjang tanpa barang dan tombol Mulai belanja' },
          { id: 'success', shape: 'rect', coords: [170, 75, 150, 50], label: 'Deretan gambar dengan nama barang' },
        ],
        answer: 'empty',
        explainCorrect: t(
          'Dapur menjawab dengan baik, tetapi tidak ada isi. Itu keadaan kosong, bukan gagal.',
          'Request berhasil tetapi datanya 0, jadi keadaan kosong tampil dengan ajakan aksi seperti "Mulai belanja".',
        ),
        hints: [t('Dapur sudah menjawab, tetapi daftarnya masih 0.'), undefined],
        tags: ['empat-keadaan'],
      }),
      qStep({
        id: 'b09-l02-q2',
        type: 'match',
        prompt: t(
          'Pasangkan 4 wajah layar dengan tampilan yang cocok.',
          'Pasangkan keempat keadaan layar dengan tampilan terbaiknya.',
        ),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('Sedang memuat', '1. Loading') },
          { id: 'l2', label: t('Gagal', '2. Error') },
          { id: 'l3', label: t('Kosong', '3. Kosong (empty)') },
          { id: 'l4', label: t('Berhasil', '4. Berhasil (success)') },
        ],
        right: [
          { id: 'r1', label: t('Kotak bayangan abu-abu', 'Skeleton kartu bayangan') },
          { id: 'r2', label: t('Pesan ramah dan tombol Coba lagi', 'Penjelasan masalah dan tombol Coba lagi') },
          { id: 'r3', label: t('Ajakan "Mulai belanja"', 'Info "Belum ada pesanan" dan tombol Mulai belanja') },
          { id: 'r4', label: t('Daftar produk yang lengkap', 'Daftar produk atau data lengkap') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
        explainCorrect: t(
          'Setiap wajah layar punya tampilan sendiri. Dengan begitu orang selalu tahu apa yang terjadi.',
          'Setiap keadaan butuh tampilan sendiri agar orang tahu apa yang terjadi dan apa langkah berikutnya.',
        ),
        hints: [t('Ingat cerita pelayan dan dapur tadi.', 'Cocokkan dari keadaan yang paling mudah dikenali: loading.'), undefined],
        tags: ['empat-keadaan', 'ui', 'ux'],
      }),
      qStep(
        makeMcq({
          id: 'b09-l02-q8',
          type: 'scenario',
          story: t(
            'Nadia baru membuat akun di Toko Rani. Ia membuka halaman "Pesanan Saya". Ia belum pernah membeli apa pun.',
            'Nadia baru membuat akun di Toko Rani dan membuka halaman "Pesanan Saya". Ia belum pernah berbelanja.',
          ),
          prompt: t(
            'Layar mana yang paling ramah untuk Nadia?',
            'Tampilan mana yang paling ramah untuk Nadia di halaman itu?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'emp',
              label: t('Tulisan "Belum ada pesanan" dan tombol Belanja', 'Tulisan "Belum ada pesanan" dan tombol "Jelajahi Produk"'),
            },
            {
              id: 'err',
              label: t('Kotak merah bertuliskan "Gagal memuat!"', 'Kotak merah bertuliskan "Error: Data tidak ditemukan di server"'),
              explainWrong: t(
                'Tidak ada yang gagal. Nadia hanya belum pernah berbelanja.',
                'Tidak ada error. Nadia memang belum pernah berbelanja, jadi datanya 0.',
              ),
            },
            {
              id: 'spin',
              label: t('Lingkaran berputar terus yang tidak pernah berhenti', 'Lingkaran loading yang terus berputar tanpa henti'),
              explainWrong: t(
                'Dapur sudah menjawab. Lingkaran yang berputar membuat Nadia menunggu tanpa akhir.',
                'Data sudah selesai dimuat (array kosong). Loading yang terus berputar membuat orang menunggu tanpa alasan.',
              ),
            },
          ],
          answer: 'emp',
          explainCorrect: t(
            'Tulisan ramah dan tombol memberi Nadia langkah pertama. Seperti pelayan yang menawarkan menu.',
            'Empty state yang baik memberi langkah pertama. Orang baru langsung tahu harus berbuat apa.',
          ),
          hints: [t('Apa langkah pertama yang cocok untuk Nadia?', 'Bedakan data yang gagal diambil dari data yang memang 0.')],
          tags: ['empat-keadaan', 'ux'],
        }),
      ),
      qStep({
        id: 'b09-l02-q3',
        type: 'sort',
        modes: ['pro'],
        prompt: t('Kelompokkan tampilan ini ke Desain Bagus atau Kebiasaan Buruk.'),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('Layar putih polos selama fetch berjalan 3 detik') },
          { id: 'i2', label: t('Kotak skeleton selama menunggu data') },
          { id: 'i3', label: t('Tulisan "Error 500 undefined" tanpa tombol Coba lagi') },
          { id: 'i4', label: t('Tulisan "Keranjang masih kosong, yuk pilih kue!" saat 0 item') },
        ],
        bins: [
          { id: 'good', label: t('Desain Bagus') },
          { id: 'bad', label: t('Kebiasaan Buruk') },
        ],
        answer: { i1: 'bad', i2: 'good', i3: 'bad', i4: 'good' },
        explainCorrect: t('Layar putih dan error mentah membuat orang bingung. Skeleton dan ajakan membantu orang melangkah.'),
        hints: [t('Tanyakan: apakah orang tahu apa yang sedang terjadi?'), undefined],
        tags: ['empat-keadaan', 'ux'],
      }),
      qStep(
        makeTf({
          id: 'b09-l02-q6',
          modes: ['pro'],
          prompt: t('Keadaan kosong berarti server rusak dan gagal mengirim data.'),
          answer: false,
          explainCorrect: t('Pernyataan itu keliru: keadaan kosong berarti request berhasil, hanya datanya yang memang 0.'),
          explainWrong: t('Kosong bukan gagal. Akun baru, misalnya, memang belum punya pesanan.'),
          hints: [t('Bedakan request yang gagal dari data yang 0.')],
          tags: ['empat-keadaan'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b09-l02-q7',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Empat wajah ruang makan'),
          prompt: t('Apa beda keadaan kosong di ruang makan dan di aplikasi?'),
          choices: [
            { id: 'cta', label: t('Empty state mengarahkan orang ke aksi pertama, bukan hanya kosong') },
            {
              id: 'four',
              label: t('Ada beberapa kondisi yang bisa dialami pengunjung saat menunggu pesanan'),
              explainWrong: t('Itu kesamaan antara ruang makan dan aplikasi, bukan perbedaannya.'),
            },
            {
              id: 'wait',
              label: t('Menunggu masakan matang membutuhkan jeda waktu yang tidak bisa dihindari'),
              explainWrong: t('Itu kesamaan antara memasak dan loading.'),
            },
          ],
          answer: 'cta',
          explainCorrect: t('Empty state mengubah layar kosong menjadi pintu masuk. Orang langsung tahu aksi pertama yang bisa dilakukan.'),
          tags: ['empat-keadaan', 'ux'],
        }),
      ),
      qStep({
        id: 'b09-l02-q9',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi pola state React untuk mengambil data dari API.'),
        template: 'const [status, setStatus] = useState("___"); // loading | error | sukses\nambilProduk(12).catch(() => setStatus("___"));',
        bank: ['loading', 'error', 'kosong-selamanya', '404'],
        answer: ['loading', 'error'],
        explainCorrect: t('Status awal "loading", lalu setStatus("error") dipanggil saat request gagal.'),
        hints: [t('Isi pertama untuk saat data belum datang. Isi kedua untuk saat gagal.'), undefined],
        tags: ['empat-keadaan', 'state-ui'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b09-l02-r1',
        prompt: t(
          'Apa saja 4 wajah layar saat data datang?',
          'Apa saja keempat keadaan layar yang wajib dirancang saat memanggil API?',
        ),
        choices: [
          { id: 'all', label: t('Memuat, gagal, kosong, berhasil', 'Loading, error, kosong, dan berhasil') },
          {
            id: 'one',
            label: t('Berhasil saja sudah cukup', 'Berhasil saja sudah cukup'),
            explainWrong: t(
              'Orang juga perlu kabar saat menunggu, gagal, dan kosong.',
              'Orang butuh kejelasan juga saat menunggu, gagal, dan data kosong.',
            ),
          },
          {
            id: 'two',
            label: t('Memuat dan berhasil saja', 'Loading dan berhasil saja'),
            explainWrong: t(
              'Gagal dan kosong juga bisa terjadi. Keduanya perlu tampilan sendiri.',
              'Gagal dan kosong juga bisa terjadi di aplikasi sungguhan, jadi keduanya perlu tampilan sendiri.',
            ),
          },
        ],
        answer: 'all',
        explainCorrect: t(
          'Empat wajah ini membuat layar mudah dipahami. Itu berlaku untuk jawaban apa pun dari dapur.',
          'Merancang keempat keadaan membuat UX tetap ramah di kondisi apa pun.',
        ),
        hints: [t('Ingat 4 wajah di cerita pelayan tadi.')],
        tags: ['empat-keadaan'],
      }),
      makeTf({
        id: 'b09-l02-r2',
        prompt: t(
          'Saat gagal, layar memberi pesan ramah dan tombol Coba lagi.',
          'Pada keadaan error, tampilkan pesan yang jelas dan tombol "Coba lagi".',
        ),
        answer: true,
        explainCorrect: t(
          'Tombol Coba lagi mengulang permintaan saat masalahnya sudah berlalu.',
          'Orang perlu jalan keluar untuk mengulang request.',
        ),
        explainWrong: t(
          'Pesan menjelaskan masalahnya. Tombol Coba lagi membantu orang mengulang.',
          'Pesan yang mudah dipahami dan tombol Coba lagi mencegah orang kebingungan.',
        ),
        hints: [t('Bayangkan pelayan menawarkan kue baru setelah kuenya jatuh.')],
        tags: ['empat-keadaan', 'ux'],
      }),
    ],
    recap: t(
      'Layar punya 4 wajah: memuat, gagal, kosong, dan berhasil.',
      'Rancang empat keadaan async untuk setiap komponen yang memanggil API: loading, error, empty, dan success.',
    ),
    companion: {
      talkPrompts: [
        'Ingat saat internet mati. Apa yang muncul di layar?',
      ],
      offlineActivity:
        'Gambar 4 layar HP di kertas. Layar 1 berisi kotak bayangan. Layar 2 punya pesan gagal dan tombol Coba lagi. Layar 3 berisi keranjang kosong. Layar 4 menampilkan daftar barang.',
    },
  }),

  makeLesson({
    id: 'b09-l03',
    worldId: 'b09',
    title: 'Debounce dan membatalkan request',
    modes: ['pro'],
    objective: t('Kamu bisa mengurangi request saat mengetik dengan debounce dan membatalkan request lama dengan AbortController.'),
    estMinutes: 6,
    introducesTerms: ['debounce'],
    usesTerms: ['fetch', 'request', 'api', 'pagination'],
    warmupFrom: 'b09-l02',
    atWork: 'Saat tester mengetik cepat di kotak cari dan hasilnya tertukar, kamu akan memakai debounce dan AbortController.',
    steps: [
      storyStep('b09/debounce.svg', [
        rText('Kotak cari Toko Rani mengirim 10 request setiap kali orang mengetik "tas ransel". Seperti pintu lift yang ditahan: pintu baru menutup setelah tidak ada orang masuk beberapa saat.'),
      ]),
      conceptStep({
        title: t('Debounce: tunggu selesai mengetik'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b09', topic: 'debounce-pintu-lift' },
        alt: t('Debounce menunda pencarian 300 ms agar mengetik tas ransel hanya mengirim satu request.'),
        code: {
          lang: 'js',
          code: 'let jeda;\nkotakCari.addEventListener("input", (e) => {\n  clearTimeout(jeda);\n  jeda = setTimeout(() => cari(e.target.value), 300);\n});',
        },
        body: [
          rTerm('debounce', 'Debounce'),
          rText(' adalah jeda tunggu sebelum sebuah aksi berjalan. Mengetik "tas ransel" cukup mengirim 1 pencarian setelah jeda sunyi, misalnya 300 ms.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b09-l03-q1',
          type: 'analogy',
          prompt: t('Mengapa debounce disamakan dengan pintu lift yang ditahan?'),
          choices: [
            { id: 'wait', label: t('Timer diulang tiap ada input baru, aksi jalan setelah jeda') },
            {
              id: 'fast',
              label: t('Aksi langsung jalan pada input pertama, input berikutnya diabaikan'),
              explainWrong: t('Itu bukan debounce. Aksi baru berjalan setelah input berhenti, bukan pada input pertama.'),
            },
            {
              id: 'cancel',
              label: t('Request yang sudah berangkat dibatalkan saat ada input baru'),
              explainWrong: t('Membatalkan request yang sudah berangkat adalah tugas AbortController. Debounce hanya menunda pengiriman.'),
            },
          ],
          answer: 'wait',
          explainCorrect: t('clearTimeout lalu setTimeout mengulang timer setiap huruf baru. Seperti pintu yang ditahan sampai tidak ada orang lagi.'),
          tags: ['debounce'],
        }),
      ),
      conceptStep({
        title: t('AbortController: batalkan request lama'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b09', topic: 'abort-controller' },
        alt: t('AbortController membatalkan request pencarian lama agar jawaban lambat tidak menimpa hasil terbaru.'),
        code: {
          lang: 'js',
          code: 'let pengendali;\nasync function cari(kata) {\n  pengendali?.abort();\n  pengendali = new AbortController();\n  const res = await fetch(`/api/cari?q=${encodeURIComponent(kata)}`, {\n    signal: pengendali.signal,\n  });\n  return res.json();\n}',
        },
        body: [
          rText('Orang mencari "t", "ta", lalu "tas". Jawaban "t" yang lambat bisa tiba terakhir dan menimpa hasil "tas". Pakai '),
          rCode('AbortController'),
          rText(' untuk membatalkan request lama. Buat pengendali baru karena signal lama tetap batal. Pakai '),
          rCode('AbortSignal.timeout(10000)'),
          rText(' untuk membatasi waktu tunggu.'),
        ],
      }),
      qStep({
        id: 'b09-l03-q3',
        type: 'spotbug',
        difficulty: 2,
        prompt: t('Ketuk baris yang tidak meneruskan signal pembatalan ke fetch().'),
        lines: [
          'async function cari(kata, signal) {',
          '  const url = `/api/cari?q=${encodeURIComponent(kata)}`;',
          '  const res = await fetch(url);',
          '  return res.json();',
          '}',
        ],
        answer: [3],
        explainCorrect: t('Baris 3 perlu memanggil fetch(url, { signal }). Pemanggil mengirim signal dari pengendali baru untuk tiap pencarian.'),
        hints: [t('Cari pemanggilan fetch dan lihat opsinya.'), undefined],
        tags: ['debounce', 'fetch'],
      }),
      conceptStep({
        title: t('Infinite scroll dengan cursor'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b09', topic: 'infinite-scroll' },
        alt: t('IntersectionObserver mendeteksi guliran ke bawah lalu memanggil halaman cursor berikutnya.'),
        body: [
          rText('Daftar panjang seperti linimasa produk dimuat per bagian memakai '),
          rTerm('pagination', 'cursor pagination'),
          rText('. Pakai '),
          rCode('IntersectionObserver'),
          rText(' untuk mendeteksi saat orang menggulir mendekati bagian bawah, lalu muat bagian berikutnya.'),
        ],
      }),
      limitStep({
        analogy: t('Pintu lift yang menunggu jeda sebelum menutup'),
        same: [
          t('Setiap ketikan baru mengulang timer, jadi aksi berat menunggu sampai ada jeda tenang.'),
        ],
        different: [
          t('Debounce hanya mengurangi pengiriman. Request yang sudah berangkat tidak batal, untuk itu kamu tetap butuh AbortController.'),
        ],
        riskyAnalogy: false,
      }),
      simStep(
        'empat-wajah-layar',
        t('Perhatikan kotak pencarian berpindah ke Loading lalu Berhasil tanpa hasil lama yang menumpuk.'),
      ),
      qStep({
        id: 'b09-l03-q2',
        type: 'order',
        prompt: t('Pencarian "t" masih berjalan saat orang mengetik "tas". Bagaimana urutan pencarian barunya?'),
        difficulty: 2,
        items: [
          { id: 's3', label: t('Batalkan request lama dan buat pengendali baru') },
          { id: 's1', label: t('Orang mengetik, timer debounce 300 ms diulang dari awal') },
          { id: 's4', label: t('Kirim fetch untuk "tas" dengan signal dari pengendali baru') },
          { id: 's2', label: t('Setelah 300 ms tanpa ketikan baru, cari("tas") dipanggil') },
        ],
        answer: ['s1', 's2', 's3', 's4'],
        explainCorrect: t('Debounce menghemat request. Pengendali baru punya signal yang bisa dipakai setelah signal lama dibatalkan.'),
        hints: [t('Mulai dari ketikan. Pembatalan terjadi sebelum fetch baru berangkat.'), undefined],
        tags: ['debounce', 'fetch'],
      }),
      qStep({
        id: 'b09-l03-q4',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi kode pembatalan dan batas waktu fetch ini.'),
        template: 'pengendali?.___();\npengendali = new AbortController();\nawait fetch(url, { signal: AbortSignal.any([pengendali.signal, AbortSignal.___(10000)]) });',
        bank: ['abort', 'timeout', 'retry', 'parse'],
        answer: ['abort', 'timeout'],
        explainCorrect: t('.abort() membatalkan request sebelumnya. AbortSignal.any() memakai signal pengendali baru dan batas tunggu 10 detik.'),
        hints: [t('Satu kata membatalkan, satu kata membatasi waktu tunggu.'), undefined],
        tags: ['debounce', 'fetch'],
      }),
      qStep(
        makeMcq({
          id: 'b09-l03-q5',
          type: 'limit',
          analogy: t('Pintu lift (debounce)'),
          prompt: t('Apa yang TIDAK bisa diatasi debounce tanpa AbortController?'),
          choices: [
            { id: 'race', label: t('Request lama yang sudah berangkat tetap bisa menimpa hasil baru') },
            {
              id: 'count',
              label: t('Jumlah request tetap banyak saat orang mengetik dengan cepat'),
              explainWrong: t('Mengurangi request beruntun adalah keunggulan utama debounce.'),
            },
            {
              id: 'delay',
              label: t('Jeda tunggu sebelum request dikirim tidak bisa diatur sama sekali'),
              explainWrong: t('Jeda tunggu adalah inti debounce, dan angkanya bisa diatur.'),
            },
          ],
          answer: 'race',
          explainCorrect: t('Debounce menunda pengiriman. AbortController membatalkan request yang sudah di jalan.'),
          tags: ['debounce', 'fetch'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b09-l03-q6',
          type: 'scenario',
          story: t('Dimas mencari "baju", lalu 3 detik kemudian mencari "sepatu". Server mengirim hasil "sepatu" lebih dulu, lalu balasan lama "baju" menimpa layar.'),
          prompt: t('Cara mana yang memperbaiki masalah ini?'),
          choices: [
            { id: 'ac', label: t('Batalkan request lama dengan AbortController agar balasan "baju" tidak masuk') },
            {
              id: 'css',
              label: t('Perpanjang jeda debounce menjadi 2 detik agar request tidak tumpang tindih'),
              explainWrong: t('Kedua pencarian terpisah 3 detik, jadi timer 2 detik tetap mengirim keduanya. Batalkan request lama.'),
            },
            {
              id: 'cors',
              label: t('Tambahkan retry otomatis agar request "sepatu" dikirim ulang bila terlambat'),
              explainWrong: t('Request "sepatu" berhasil, hanya urutan baliknya tertukar. Mengulang request tidak memperbaikinya.'),
            },
          ],
          answer: 'ac',
          explainCorrect: t('Request "baju" dibatalkan saat "sepatu" berangkat, jadi hanya hasil terbaru yang tampil. Masalah ini disebut race condition.'),
          tags: ['debounce', 'fetch'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b09-l03-r1',
        prompt: t('Fitur apa yang membatalkan fetch() yang sudah tidak relevan?'),
        choices: [
          { id: 'ac', label: t('AbortController') },
          { id: 'ev', label: t('EventSource'), explainWrong: t('EventSource adalah client untuk SSE, bukan untuk membatalkan request.') },
        ],
        answer: 'ac',
        explainCorrect: t('AbortController mengirim signal ke fetch agar permintaan lama dibatalkan.'),
        tags: ['debounce', 'fetch'],
      }),
      makeTf({
        id: 'b09-l03-r2',
        prompt: t('Debounce membuat setiap huruf yang diketik langsung mengirim satu pencarian baru tanpa jeda.'),
        answer: false,
        explainCorrect: t('Pernyataan itu keliru: debounce menunda sampai orang berhenti mengetik selama jeda tertentu, misalnya 300 ms.'),
        explainWrong: t('Kebalikannya: debounce menggabungkan ketikan cepat menjadi satu panggilan setelah jeda tenang.'),
        tags: ['debounce'],
      }),
    ],
    recap: t('Debounce mengurangi request saat mengetik. AbortController membatalkan request lama agar balasan usang tidak menimpa layar.'),
  }),

  makeLesson({
    id: 'b09-l04',
    worldId: 'b09',
    title: 'Cache dan optimistic update',
    modes: ['pro'],
    objective: t('Kamu bisa memakai cache di sisi client dan memilih aksi yang cocok untuk optimistic update.'),
    estMinutes: 6,
    introducesTerms: ['optimistic-ui'],
    usesTerms: ['cookie-cache', 'api', 'fetch', 'ui', 'ux'],
    warmupFrom: 'b09-l03',
    atWork: 'Kamu akan memakai TanStack Query agar halaman produk tidak memanggil API berulang, dan tombol Suka terasa instan.',
    steps: [
      storyStep('b09/optimistic-ui.svg', [
        rText('Tombol Suka di Toko Rani terasa lambat karena menunggu server. Ada dua cara: pakai data simpanan seperti susu di kulkas, atau mencatat "Siap!" dulu seperti pelayan.'),
      ]),
      conceptStep({
        title: t('Cache client dan stale-while-revalidate'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b09', topic: 'cache-client-swr' },
        alt: t('TanStack Query atau SWR menyimpan data di memori dengan queryKey dan staleTime.'),
        code: {
          lang: 'js',
          code: 'const { data, isLoading, isError, refetch } = useQuery({\n  queryKey: ["produk", 12],\n  queryFn: () => ambilProduk(12),\n  staleTime: 60_000,\n});',
        },
        body: [
          rText('Cache client adalah simpanan data sementara di aplikasi. Di TanStack Query, '),
          rCode('queryKey'),
          rText(' adalah label yang membedakan isi cache. '),
          rCode('staleTime'),
          rText(' menentukan berapa lama data dianggap segar. Stale-while-revalidate menampilkan salinan yang sudah lewat masa segarnya sambil mengecek versi baru ke server.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b09-l04-q1',
          type: 'analogy',
          prompt: t('Susu di kulkas dituang sambil adik membeli stok baru. Itu mirip pola apa?'),
          choices: [
            { id: 'swr', label: t('Stale-while-revalidate pada cache client') },
            {
              id: 'abort',
              label: t('AbortController yang membatalkan request lama'),
              explainWrong: t('AbortController membatalkan request usang. Ia tidak menyajikan data simpanan.'),
            },
            {
              id: 'poll',
              label: t('Polling berulang yang selalu menunggu balasan server'),
              explainWrong: t('Polling terus bertanya ke server. Ia tidak menyimpan stok data seperti kulkas.'),
            },
          ],
          answer: 'swr',
          explainCorrect: t('Data simpanan ditampilkan lebih dulu agar cepat. Pembaruan berjalan diam-diam di belakang layar.'),
          tags: ['optimistic-ui', 'cookie-cache'],
        }),
      ),
      conceptStep({
        title: t('Optimistic update: ubah duluan'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b09', topic: 'optimistic-update-suka' },
        alt: t('Tombol Suka langsung merah saat diketuk, lalu kembali semula (rollback) bila server gagal.'),
        body: [
          rText('Optimistic update mengubah tampilan sebelum server menjawab, jadi aplikasi terasa instan. Tombol Suka langsung merah saat diketuk. Kalau request gagal, kembalikan ke keadaan semula (rollback) dan beri tahu orangnya.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b09-l04-q4',
          type: 'why',
          base: 'Dalam optimistic update, tombol Suka langsung berubah merah sebelum server menjawab.',
          prompt: t('Mengapa pengembang tetap perlu menulis penanganan onError untuk rollback?'),
          choices: [
            { id: 'rb', label: t('Aksi bisa ditolak server, jadi tampilan harus kembali ke semula') },
            {
              id: 'css',
              label: t('Browser tidak bisa mengubah tampilan sebelum balasan server tiba'),
              explainWrong: t('Browser bisa mengubah tampilan kapan saja. Optimistic update memang melakukannya sebelum server menjawab.'),
            },
            {
              id: 'key',
              label: t('Rollback otomatis membatalkan request yang sedang berjalan ke server'),
              explainWrong: t('Rollback hanya mengembalikan tampilan. Request yang sudah berjalan tidak ikut dibatalkan.'),
            },
          ],
          answer: 'rb',
          explainCorrect: t('Tanpa rollback, layar menampilkan "tersimpan" padahal gagal. Tampilan harus kembali dan orang perlu diberi tahu.'),
          tags: ['optimistic-ui', 'fetch'],
        }),
      ),
      conceptStep({
        title: t('Kapan boleh, kapan dilarang'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b09', topic: 'batas-optimistic' },
        alt: t('Cocok untuk tombol suka atau bookmark, dilarang untuk pembayaran uang.'),
        body: [
          rText('Pakai optimistic update hanya untuk aksi yang hampir selalu berhasil dan berdampak ringan, seperti like, bookmark, atau centang catatan. Jangan pakai untuk transaksi berisiko seperti pembayaran atau transfer uang.'),
        ],
      }),
      limitStep({
        analogy: t('Kulkas rumah dan pelayan yang langsung menjawab "Siap!"'),
        same: [
          t('Stok di kulkas menghemat perjalanan ke warung, dan melewati tunggu konfirmasi terasa instan.'),
        ],
        different: [
          t('Pelayan yang kehabisan stok cukup minta maaf. Di kode, kamu wajib menulis rollback: mengembalikan angka atau ikon lama kalau API gagal.'),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'empat-wajah-layar',
        t('Bandingkan menunggu skeleton dengan data yang langsung tampil dari cache atau optimistic update.'),
      ),
      qStep({
        id: 'b09-l04-q2',
        type: 'sort',
        prompt: t('Kelompokkan aksi ini: cocok untuk optimistic update atau harus menunggu server.'),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('Mengetuk ikon hati pada foto kue') },
          { id: 'i2', label: t('Membayar Rp250.000 lewat transfer bank') },
          { id: 'i3', label: t('Menambah produk ke daftar Favorit') },
          { id: 'i4', label: t('Menghapus permanen seluruh akun toko') },
        ],
        bins: [
          { id: 'opt', label: t('Cocok optimistic') },
          { id: 'wait', label: t('Tunggu server') },
        ],
        answer: { i1: 'opt', i2: 'wait', i3: 'opt', i4: 'wait' },
        explainCorrect: t('Like dan bookmark berdampak ringan. Pembayaran dan hapus akun berisiko, jadi menunggu konfirmasi server.'),
        hints: [t('Tanyakan: kalau gagal, seberapa besar kerugiannya?'), undefined],
        tags: ['optimistic-ui', 'ux'],
      }),
      qStep(
        makeTf({
          id: 'b09-l04-q3',
          prompt: t('Dengan staleTime: 60_000, data yang baru diambil dianggap segar selama 60 detik.'),
          answer: true,
          explainCorrect: t('Selama masa segar, komponen lain dengan queryKey yang sama mendapat data langsung dari memori.'),
          explainWrong: t('60_000 milidetik sama dengan 60 detik masa segar.'),
          tags: ['optimistic-ui', 'cookie-cache'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b09-l04-q5',
          type: 'limit',
          analogy: t('Pelayan langsung mencatat "Siap!" sebelum cek dapur'),
          prompt: t('Mengapa analogi pelayan yang langsung menjawab "Siap!" berbahaya untuk fitur pembayaran?'),
          choices: [
            { id: 'risk', label: t('Orang mengira pembayaran sudah lunas padahal belum') },
            {
              id: 'fast',
              label: t('Pelanggan terlalu senang kalau dilayani dengan sangat cepat'),
              explainWrong: t('Kecepatan memang tujuannya. Yang berbahaya adalah salah mencatat transaksi uang.'),
            },
            {
              id: 'menu',
              label: t('Pelayan hanya mencatat jenis pesanan, bukan jumlah uangnya'),
              explainWrong: t('Batasannya ada di risiko gagalnya transaksi, bukan di isi catatan.'),
            },
          ],
          answer: 'risk',
          explainCorrect: t('Pembayaran harus menampilkan "Memproses" dan menunggu konfirmasi server. Baru setelah itu tampilkan "Berhasil".'),
          tags: ['optimistic-ui', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b09-l04-q6',
          type: 'scenario',
          story: t('Halaman detail kue #12 di Toko Rani dibuka bergantian dari 3 komponen dalam 10 detik. Tanpa cache, aplikasi memanggil GET /produk/12 sebanyak 3 kali.'),
          prompt: t('Bagaimana TanStack Query mengurangi panggilan berulang ini?'),
          choices: [
            { id: 'qk', label: t('Menyimpan hasil GET di bawah queryKey dan membagikannya') },
            {
              id: 'post',
              label: t('Mengganti GET menjadi POST supaya server menjawab lebih cepat'),
              explainWrong: t('POST tidak untuk membaca data, dan hasilnya tidak disimpan.'),
            },
            {
              id: 'del',
              label: t('Memanggil API lebih sering agar datanya selalu terbaru'),
              explainWrong: t('Panggilan lebih sering justru menambah beban. Cache bertujuan menguranginya.'),
            },
          ],
          answer: 'qk',
          explainCorrect: t('Ketiga komponen bisa berbagi cache dengan queryKey ["produk", 12]. Dalam staleTime 60 detik, datanya masih dianggap segar.'),
          tags: ['optimistic-ui', 'cookie-cache'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b09-l04-r1',
        prompt: t('Apa arti optimistic update di sebuah aplikasi?'),
        choices: [
          { id: 'up', label: t('Mengubah tampilan dulu sebelum server menjawab, lalu rollback kalau gagal') },
          { id: 'wait', label: t('Mengubah tampilan setelah server memastikan perubahan sudah berhasil disimpan'), explainWrong: t('Optimistic update menampilkan perubahan sebelum server mengonfirmasi penyimpanan.') },
        ],
        answer: 'up',
        explainCorrect: t('Aksi ringan terasa seketika, dan tampilan tetap siap dikembalikan.'),
        tags: ['optimistic-ui'],
      }),
      makeTf({
        id: 'b09-l04-r2',
        prompt: t('Optimistic update dianjurkan untuk tombol "Transfer Uang Sekarang".'),
        answer: false,
        explainCorrect: t('Pernyataan itu keliru: transaksi uang berisiko tinggi dan harus menunggu kepastian server.'),
        explainWrong: t('Pembayaran dan transfer tidak boleh memakai optimistic update.'),
        tags: ['optimistic-ui'],
      }),
    ],
    recap: t('Cache client menghemat panggilan berulang. Optimistic update membuat aksi ringan terasa instan, tetapi tidak cocok untuk pembayaran.'),
  }),

  makeLesson({
    id: 'b09-l05',
    worldId: 'b09',
    title: 'BFF: menyembunyikan kunci',
    modes: ['pro'],
    objective: t('Kamu bisa memakai BFF untuk menyembunyikan kunci rahasia, dan memilih nama variabel .env yang aman.'),
    estMinutes: 6,
    introducesTerms: ['bff'],
    usesTerms: ['frontend', 'backend', 'server', 'browser', 'api-key', 'rahasia-frontend', 'api'],
    warmupFrom: 'b09-l04',
    atWork: 'Kamu akan membuat Route Handler di Next.js agar kunci API berbayar tidak pernah muncul di DevTools pengunjung.',
    steps: [
      storyStep('b09/bff.svg', [
        rText('Toko Rani memakai API cuaca berbayar, dan kuncinya tertulis di kode browser. Siapa pun bisa menyalinnya lewat DevTools, jadi kamu perlu asisten dapur yang memegang kunci itu.'),
      ]),
      conceptStep({
        title: t('Apa itu pola BFF?'),
        visualName: 'RestoranDiagram',
        visualProps: { worldId: 'b09', topic: 'bff-perantara' },
        alt: t('Browser memanggil BFF, lalu BFF memanggil pihak ketiga dengan kunci.'),
        code: {
          lang: 'text',
          code: 'Browser → GET /api/cuaca?kota=makassar (tanpa kunci)\nBFF (Server-mu) → GET api.cuaca.example + KUNCI_RAHASIA\nBFF → Browser: data cuaca aman tanpa kunci',
        },
        body: [
          rTerm('bff', 'BFF'),
          rText(' adalah server kecil milikmu untuk melayani halaman web. Browser memanggil BFF tanpa kunci. BFF menambahkan kunci, lalu memanggil API pihak ketiga. Origin terdiri dari protokol, host, dan port. Di browser, CORS mengatur akses ke origin lain.'),
        ],
      }),
      qStep({
        id: 'b09-l05-q1',
        type: 'order',
        prompt: t('Urutkan perjalanan permintaan cuaca lewat BFF agar kunci tetap aman.'),
        difficulty: 2,
        items: [
          { id: 's3', label: t('BFF mengambil kunci dari .env server dan memanggil API cuaca') },
          { id: 's1', label: t('Browser mengirim GET /api/cuaca?kota=makassar tanpa kunci') },
          { id: 's4', label: t('BFF mengembalikan data cuaca ke browser tanpa kunci') },
          { id: 's2', label: t('Route Handler BFF menerima permintaan dari browser') },
        ],
        answer: ['s1', 's2', 's3', 's4'],
        explainCorrect: t('Kunci hanya hidup di dalam BFF dan tidak pernah melewati jaringan browser.'),
        hints: [t('Mulai dari browser. Kunci baru dipakai setelah BFF menerima permintaan.'), undefined],
        tags: ['bff', 'api-key'],
      }),
      conceptStep({
        title: t('Membuat BFF di framework modern'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b09', topic: 'bff-route-handler' },
        alt: t('Next.js memakai Route Handler atau Server Action, Laravel memakai controller.'),
        body: [
          rText('Kamu tidak perlu membuat server terpisah yang rumit. Di Next.js, BFF cukup berupa Route Handler ('),
          rCode('/app/api/.../route.ts'),
          rText(') atau Server Action. Di Laravel, cukup controller biasa.'),
        ],
      }),
      conceptStep({
        title: t('Awas awalan variabel .env'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b09', topic: 'env-public-secret' },
        alt: t('NEXT_PUBLIC_ dan VITE_ ikut dikirim ke browser, jadi kunci rahasia tidak boleh memakainya.'),
        body: [
          rText('Variabel berawalan '),
          rCode('NEXT_PUBLIC_'),
          rText(' (Next.js) atau '),
          rCode('VITE_'),
          rText(' (Vite) ikut ditanam ke kode browser. Kunci rahasia harus memakai nama tanpa awalan itu, dan hanya dibaca di kode server.'),
        ],
      }),
      qStep({
        id: 'b09-l05-q2',
        type: 'spotbug',
        difficulty: 2,
        prompt: t('Ketuk baris .env yang membocorkan kunci pembayaran rahasia ke kode browser Vite.'),
        lines: [
          'PORT=3000',
          'VITE_JUDUL_APLIKASI="Toko Rani"',
          'VITE_KUNCI_RAHASIA_PEMBAYARAN="sk_live_998877"',
          'DATABASE_URL="postgres://localhost/toko"',
        ],
        answer: [3],
        explainCorrect: t('Baris 3 berawalan VITE_, jadi Vite menyalin kunci itu ke JavaScript publik di browser.'),
        hints: [t('Cari nama variabel yang berawalan publik dan berisi rahasia.'), undefined],
        tags: ['bff', 'rahasia-frontend'],
      }),
      limitStep({
        analogy: t('Asisten dapur BFF yang memegang kunci gudang'),
        same: [
          t('Tamu di browser tetap menerima hidangan data yang sama, tanpa pernah melihat kunci rahasia.'),
        ],
        different: [
          t('BFF menjadi gerbang baru, jadi lindungi dengan rate limit atau login supaya orang luar tidak menumpang kuota API berbayarmu.'),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'empat-wajah-layar',
        t('Ingat bahwa saat frontend memanggil BFF, layar tetap perlu empat keadaan: memuat, gagal, kosong, dan berhasil.'),
      ),
      qStep(
        makeTf({
          id: 'b09-l05-q3',
          prompt: t('BFF dengan protokol, host, dan port yang sama seperti halaman berbagi satu origin. Aturan lintas origin (CORS) tidak membatasi panggilan itu.'),
          answer: true,
          explainCorrect: t('Panggilan dari halaman ke BFF berasal dari origin yang sama. Panggilan antarserver tidak dibatasi CORS.'),
          explainWrong: t('Panggilan antarserver tidak dibatasi CORS. BFF jadi memecahkan dua masalah sekaligus.'),
          tags: ['bff', 'server', 'browser'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b09-l05-q4',
          prompt: t('Nama variabel .env mana yang hanya terbaca di server dan tidak ikut terkirim?'),
          choices: [
            { id: 'srv', label: t('CUACA_API_SECRET') },
            {
              id: 'pub',
              label: t('NEXT_PUBLIC_CUACA_API_SECRET'),
              explainWrong: t('Awalan NEXT_PUBLIC_ otomatis ditanam ke kode JavaScript di browser.'),
            },
            {
              id: 'vite',
              label: t('VITE_CUACA_API_SECRET'),
              explainWrong: t('Awalan VITE_ juga ikut terkirim ke browser, terutama di proyek Vite.'),
            },
          ],
          answer: 'srv',
          explainCorrect: t('Tanpa awalan NEXT_PUBLIC_ atau VITE_, nilainya hanya terbaca oleh kode server seperti Route Handler.'),
          tags: ['bff', 'rahasia-frontend'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b09-l05-q5',
          type: 'limit',
          analogy: t('Asisten dapur BFF penyimpan kunci'),
          prompt: t('Kelemahan baru apa muncul kalau endpoint /api/ai-chat dibiarkan terbuka tanpa rate limit atau cek login?'),
          choices: [
            { id: 'abuse', label: t('Orang iseng bisa memanggilnya berulang kali dan menghabiskan kuota berbayar') },
            {
              id: 'leak',
              label: t('Kunci API otomatis tertulis di HTML yang dikirim ke browser'),
              explainWrong: t('Kunci tetap tersembunyi di server. Yang bisa disalahgunakan adalah kuotanya.'),
            },
            {
              id: 'cors',
              label: t('Browser tidak bisa menampilkan halaman karena endpoint terbuka'),
              explainWrong: t('Endpoint terbuka tidak merusak tampilan halaman. Risikonya ada di biaya.'),
            },
          ],
          answer: 'abuse',
          explainCorrect: t('Kunci aman di BFF, tetapi endpoint BFF tetap perlu rate limit atau login supaya tagihan tidak membengkak.'),
          tags: ['bff', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b09-l05-q6',
          type: 'scenario',
          story: t('Raka ingin memakai API AI berbayar di aplikasi Next.js miliknya. Ia harus mengirim header Authorization: Bearer RAHASIA_BESAR.'),
          prompt: t('Arsitektur mana yang benar untuk Raka?'),
          choices: [
            { id: 'rh', label: t('Route Handler membaca kunci dari .env server, lalu browser memanggil /api/tanya-ai') },
            {
              id: 'cl',
              label: t('Kunci disimpan di NEXT_PUBLIC_RAHASIA agar komponen React langsung memanggil penyedia AI'),
              explainWrong: t('Siapa pun bisa membuka DevTools, menyalin kunci NEXT_PUBLIC_, lalu menghabiskan saldo Raka.'),
            },
            {
              id: 'html',
              label: t('Kunci ditaruh di atribut data-key pada tombol HTML supaya mudah diambil kode JavaScript'),
              explainWrong: t('Atribut HTML bisa dibaca siapa pun lewat Inspect Element.'),
            },
          ],
          answer: 'rh',
          explainCorrect: t('Route Handler berperan sebagai BFF yang menjaga RAHASIA_BESAR tetap terkunci di server.'),
          tags: ['bff', 'api-key', 'rahasia-frontend'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b09-l05-r1',
        prompt: t('Apa fungsi utama BFF dalam pengembangan frontend?'),
        choices: [
          { id: 'bff', label: t('Server milikmu yang menyimpan kunci rahasia dan merangkum balasan') },
          { id: 'css', label: t('Library browser untuk membuka kunci sebelum memanggil API'), explainWrong: t('Library browser membuka kunci di perangkat pembaca. BFF menyimpan dan memakai kunci di server.') },
        ],
        answer: 'bff',
        explainCorrect: t('BFF menjaga kunci tetap di server dan tidak pernah bocor.'),
        tags: ['bff'],
      }),
      makeTf({
        id: 'b09-l05-r2',
        prompt: t('Variabel berawalan VITE_ atau NEXT_PUBLIC_ aman untuk menyimpan kunci rahasia karena ada di file .env.'),
        answer: false,
        explainCorrect: t('Pernyataan itu keliru: awalan VITE_ dan NEXT_PUBLIC_ ikut dibundel ke kode browser yang bisa dilihat semua orang.'),
        explainWrong: t('Hanya variabel tanpa awalan publik yang tetap rahasia di server.'),
        tags: ['rahasia-frontend', 'bff'],
      }),
    ],
    recap: t('Pakai BFF dan variabel .env tanpa awalan publik untuk menjaga kunci tetap rahasia.'),
  }),

  makeLesson({
    id: 'b09-l06',
    worldId: 'b09',
    title: 'Dokumentasi dan alat uji',
    modes: ['pro'],
    objective: t('Kamu bisa membaca kontrak OpenAPI, memakai mock, dan mencari bug lewat DevTools.'),
    estMinutes: 7,
    introducesTerms: ['openapi'],
    usesTerms: ['api', 'kontrak-api', 'rest', 'graphql', 'grpc', 'http-method', 'status-code', 'header-body', 'json', 'cors', 'pagination'],
    warmupFrom: 'b09-l05',
    atWork: 'Kamu akan menyalin request yang gagal dari tab Network lewat Copy as cURL, lalu melaporkannya ke tim backend.',
    steps: [
      storyStep('b09/openapi.svg', [
        rText('Backend Toko Rani belum selesai, tetapi tim frontend harus mulai bekerja. Seperti restoran yang menyepakati buku menu dulu: koki memasak sesuai menu, pelayan berlatih dengan menu tiruan.'),
      ]),
      conceptStep({
        title: t('OpenAPI dan contract-first'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b09', topic: 'openapi-swagger' },
        alt: t('File YAML OpenAPI mendefinisikan endpoint, parameter, dan contoh balasan 200 serta 404.'),
        code: {
          lang: 'text',
          code: 'openapi: 3.1.0\ninfo: { title: API Toko Rani, version: 1.0.0 }\npaths:\n  /produk/{id}:\n    get:\n      parameters: [{ name: id, in: path, required: true }]\n      responses:\n        "200": { description: Produk ditemukan }\n        "404": { description: Produk tidak ada }',
        },
        body: [
          rTerm('openapi', 'OpenAPI'),
          rText(' (dulu Swagger) adalah kontrak yang ditulis dalam YAML atau JSON. File itu bisa menjadi halaman uji interaktif seperti Swagger UI. Dengan contract-first, backend dan frontend bekerja bersamaan.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b09-l06-q1',
          type: 'analogy',
          prompt: t('Menulis kontrak OpenAPI sebelum membuat kode itu mirip apa?'),
          choices: [
            { id: 'menu', label: t('Pemilik, koki, dan pelayan menyepakati buku menu dulu') },
            {
              id: 'eat',
              label: t('Memasak dulu, lalu menulis nama masakan di dalam buku menu'),
              explainWrong: t('Itu cara kebalikannya: kode dibuat dulu, kontrak menyusul. Contract-first menulis kontrak sebelum kode.'),
            },
            {
              id: 'bill',
              label: t('Pelayan menunggu masakan jadi baru menulis menunya'),
              explainWrong: t('Menunggu masakan jadi membuat pelayan tidak bisa berlatih. Dengan buku menu, semua bisa mulai bersamaan.'),
            },
          ],
          answer: 'menu',
          explainCorrect: t('Dengan kontrak yang disepakati, tim frontend bisa memakai mock sementara backend dibangun.'),
          tags: ['openapi', 'kontrak-api'],
        }),
      ),
      conceptStep({
        title: t('Mock API: dapur pura-pura'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b09', topic: 'mock-api-msw' },
        alt: t('JSONPlaceholder, DummyJSON, Prism dari OpenAPI, dan MSW yang mencegat request.'),
        body: [
          rText('Mock API adalah layanan tiruan untuk menguji tampilan. Prism bisa membuatnya dari file '),
          rTerm('openapi', 'OpenAPI'),
          rText('. DummyJSON menyediakan data latihan. '),
          rCode('MSW (Mock Service Worker)'),
          rText(' mencegat request langsung di browser. Kode fetch-mu tidak perlu diubah saat backend asli siap.'),
        ],
      }),
      conceptStep({
        title: t('Alat uji dan tab Network'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b09', topic: 'curl-postman-devtools' },
        alt: t('Postman, Bruno, Hoppscotch, perintah curl, dan DevTools Network dengan Copy as cURL.'),
        code: {
          lang: 'text',
          code: 'curl -X POST https://api.toko-rani.example/v1/pesanan \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer TOKEN_KAMU" \\\n  -d \'{"produk_id": 12, "jumlah": 2}\'',
        },
        body: [
          rText('Uji API dengan Postman, Bruno, Hoppscotch, atau '),
          rCode('curl'),
          rText('. Di DevTools → Network, '),
          rCode('Copy as cURL'),
          rText(' menyalin request yang bermasalah. Gejala menunjukkan penyebabnya: tidak muncul (Console), 400 atau 422 (isi request), 200 tetapi kosong (bentuk data), 500 (backend).'),
        ],
      }),
      qStep({
        id: 'b09-l06-q2',
        type: 'match',
        prompt: t('Pasangkan gejala di tab Network DevTools dengan langkah cek yang tepat.'),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('Request tidak muncul sama sekali') },
          { id: 'l2', label: t('Status 400 atau 422') },
          { id: 'l3', label: t('Status 200, tetapi layar kosong') },
          { id: 'l4', label: t('Status 500 dari server') },
        ],
        right: [
          { id: 'r1', label: t('Ada error JavaScript sebelum fetch; cek tab Console') },
          { id: 'r2', label: t('Isi request atau Content-Type salah; cek data yang dikirim') },
          { id: 'r3', label: t('Bentuk JSON berbeda dari dugaan; cek tab Response') },
          { id: 'r4', label: t('Bug di server; laporkan ke tim backend dengan Copy as cURL') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
        explainCorrect: t('Gejala di tab Network menunjuk ke bagian yang bermasalah. Membacanya menghemat banyak jam debugging.'),
        hints: [t('Mulai dari gejala yang paling jelas bedanya: request yang tidak muncul.'), undefined],
        tags: ['openapi', 'status-code', 'json'],
      }),
      limitStep({
        analogy: t('Buku menu restoran dan dapur pura-pura'),
        same: [
          t('Kontrak yang disepakati membuat koki dan pelayan bekerja bersamaan tanpa saling menunggu.'),
        ],
        different: [
          t('Mock API hanya meniru bentuk dan data contoh. Bug database, beban server, dan izin asli tidak ikut teruji.'),
          t('Kontrak yang baik juga mengatur detail kecil: tanggal ISO 8601 dan uang sebagai bilangan bulat, bukan desimal.'),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'empat-wajah-layar',
        t('Simulasikan pemanggilan API dan ingat bahwa tab Network selalu menampilkan status dan isi balasan aslinya.'),
      ),
      qStep({
        id: 'b09-l06-q3',
        type: 'sort',
        prompt: t('Kelompokkan dokumen kontrak dengan jenis API pasangannya.'),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('OpenAPI atau Swagger (YAML dan JSON)') },
          { id: 'i2', label: t('File .proto') },
          { id: 'i3', label: t('AsyncAPI') },
          { id: 'i4', label: t('GraphQL schema') },
        ],
        bins: [
          { id: 'rest_ev', label: t('REST dan event') },
          { id: 'g_rpc', label: t('GraphQL dan gRPC') },
        ],
        answer: { i1: 'rest_ev', i2: 'g_rpc', i3: 'rest_ev', i4: 'g_rpc' },
        explainCorrect: t('OpenAPI dan AsyncAPI mendokumentasikan REST dan event. File .proto dan schema melayani gRPC dan GraphQL.'),
        hints: [t('Cocokkan nama dokumen dengan jenis API yang memakainya.'), undefined],
        tags: ['openapi', 'rest', 'graphql', 'grpc'],
      }),
      qStep({
        id: 'b09-l06-q4',
        type: 'type',
        difficulty: 2,
        prompt: t('Pada perintah curl, flag apa yang menentukan HTTP method, dan flag apa yang menambah header? Tulis berurutan, dipisah spasi, misalnya: -A -B.'),
        accept: ['-X -H', '-x -h'],
        explainCorrect: t('-X menentukan method (-X POST), -H menambah header, dan -d mengisi body data.'),
        hints: [t('Lihat contoh curl di kartu. Cari flag sebelum POST dan sebelum Content-Type.'), undefined],
        tags: ['openapi', 'http-method', 'header-body'],
      }),
      qStep(
        makeMcq({
          id: 'b09-l06-q5',
          type: 'limit',
          analogy: t('Mock API sebagai dapur pura-pura'),
          prompt: t('Apa yang TIDAK teruji kalau kamu hanya memakai mock API seperti MSW?'),
          choices: [
            { id: 'real', label: t('Logika database, izin server asli, dan kecepatan produksi') },
            {
              id: 'ui',
              label: t('Tampilan keempat keadaan layar pada tiap komponen frontend'),
              explainWrong: t('Mock API justru sangat bagus untuk menguji keempat keadaan layar.'),
            },
            {
              id: 'shape',
              label: t('Kesesuaian nama kolom JSON dengan kontrak yang disepakati'),
              explainWrong: t('Data tiruan memang dibuat mengikuti kontrak, jadi bentuknya teruji.'),
            },
          ],
          answer: 'real',
          explainCorrect: t('Mock mempercepat kerja bersama, tetapi uji akhir ke backend asli tetap wajib.'),
          tags: ['openapi', 'kontrak-api'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b09-l06-q6',
          type: 'scenario',
          story: t('API Toko Rani menyimpan harga sebagai angka desimal 19.99, dan hasil diskon sering selisih 0.0000001. Selain itu, zona waktu jam pesanan tidak diketahui.'),
          prompt: t('Perbaikan kontrak API mana yang paling tepat?'),
          choices: [
            { id: 'int', label: t('Simpan uang sebagai bilangan bulat dan tanggal sebagai ISO 8601') },
            {
              id: 'str',
              label: t('Bulatkan semua harga di frontend sebelum menampilkannya ke layar'),
              explainWrong: t('Pembulatan di frontend tidak memperbaiki kontraknya. Server dan client tetap bisa berbeda hitungan.'),
            },
            {
              id: 'xml',
              label: t('Ganti format JSON menjadi XML supaya angkanya lebih tepat'),
              explainWrong: t('Masalahnya ada pada cara menyimpan uang dan waktu, bukan pada format pesannya.'),
            },
          ],
          answer: 'int',
          explainCorrect: t('Bilangan bulat menghindari selisih desimal pada uang, dan ISO 8601 menyeragamkan waktu di semua zona.'),
          tags: ['openapi', 'json'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b09-l06-r1',
        prompt: t('Fitur apa di tab Network DevTools yang menyalin request bermasalah supaya bisa diulang di terminal atau Postman?'),
        choices: [
          { id: 'curl', label: t('Copy as cURL') },
          { id: 'del', label: t('Clear Browser Cache'), explainWrong: t('Menghapus cache tidak menyalin rincian request ke terminal.') },
        ],
        answer: 'curl',
        explainCorrect: t('Copy as cURL memudahkan kamu mengulang bug 4xx atau 5xx dan melaporkannya ke tim backend.'),
        tags: ['openapi'],
      }),
      makeTf({
        id: 'b09-l06-r2',
        prompt: t('Dengan MSW, tim frontend bisa memakai data tiruan tanpa mengubah kode fetch.'),
        answer: true,
        explainCorrect: t('MSW mencegat request langsung di browser. Pindah ke backend asli berjalan mulus.'),
        explainWrong: t('Keunggulan utama MSW adalah memisahkan logika mock dari kode komponen frontend.'),
        tags: ['openapi', 'kontrak-api'],
      }),
    ],
    recap: t('Sepakati kontrak lewat OpenAPI dan kerja bersamaan dengan mock API. Cari penyebab bug dengan Postman, curl, dan tab Network.'),
  }),
  reactComponentState,
];
