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
  rTerm,
  rText,
  simStep,
  storyStep,
  t,
} from '@/content/lessonHelpers';
import type { Lesson, World } from '@/content/schema';

export const world: World = {
  id: 'b03',
  track: 'B',
  order: 3,
  title: 'Gudang JSON',
  tagline: t(
    'Menulis formulir data JSON dan membongkar barang untuk dikirim.',
    'Menguasai sintaks JSON, kesalahan umum JSON, serialisasi/deserialisasi, XML, FormData, dan Protobuf.',
  ),
  color: '#D99A00',
  illustration: 'b03-gudang-json',
  sourceChapters: ['J2-03'],
  requires: ['b02'],
  lessons: ['b03-l01', 'b03-l02', 'b03-l03', 'b03-l04'],
  sideQuests: [],
  boss: {
    title: 'Tantangan Penjaga Gudang',
    greeting: t(
      'Selamat datang di Gudang JSON! Periksa formulir datamu dan siap-siap mengemas barang!',
      'Uji ketelitianmu menulis JSON valid, memahami proses serialisasi/deserialisasi, serta membedakan XML, FormData, dan Protobuf.',
    ),
    guardianName: 'Penjaga Gudang',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'b03-anc-j1',
        prompt: t('Bentuk tanda kutip mana yang wajib dipakai untuk menulis label key dan teks di JSON?'),
        choices: [
          { id: 'dq', label: t('Tanda kutip dua ("nama")') },
          { id: 'sq', label: t("Tanda kutip satu ('nama')"), explainWrong: t('Kutip satu akan menyebabkan error pada JSON.') },
          { id: 'nq', label: t('Tanpa tanda kutip sama sekali'), explainWrong: t('Key JSON wajib dibungkus kutip dua.') },
        ],
        answer: 'dq',
        explainCorrect: t('Tepat! JSON hanya mengizinkan tanda kutip dua untuk key maupun nilai teks.'),
        tags: ['json'],
      }),
      makeAnchorMcq({
        id: 'b03-anc-j2',
        prompt: t('Di dalam JSON, tanda kurung siku [ ... ] dipakai untuk menuliskan…'),
        choices: [
          { id: 'arr', label: t('Daftar isi (array), misalnya ["merah", "biru"]') },
          { id: 'bool', label: t('Nilai benar atau salah'), explainWrong: t('Nilai benar/salah cukup ditulis true atau false tanpa kurung.') },
          { id: 'num', label: t('Angka biasa saja'), explainWrong: t('Angka langsung ditulis tanpa kurung siku.') },
        ],
        answer: 'arr',
        explainCorrect: t('Benar! Kurung siku menandai daftar (array) di dalam formulir JSON.'),
        tags: ['json'],
      }),
      makeAnchorMcq({
        id: 'b03-anc-j3',
        prompt: t('Mengapa menaruh tanda koma setelah baris data paling akhir di JSON itu salah?'),
        choices: [
          { id: 'tr', label: t('Aturan JSON melarang koma di akhir item terakhir') },
          { id: 'del', label: t('Koma di akhir akan menghapus semua data di server'), explainWrong: t('Bukan menghapus data, tetapi membuat mesin gagal membaca JSON.') },
          { id: 'clr', label: t('Koma mengubah warna latar halaman'), explainWrong: t('JSON hanya berisi data, bukan warna CSS.') },
        ],
        answer: 'tr',
        explainCorrect: t('Betul! Trailing comma (koma menggantung di item terakhir) selalu ditolak JSON.'),
        tags: ['json'],
      }),
      makeAnchorMcq({
        id: 'b03-anc-j4',
        prompt: t('Apa gunanya fungsi JSON.stringify() sebelum data dikirim ke server?'),
        choices: [
          { id: 'ser', label: t('Mengemas object data menjadi teks JSON agar bisa dikirim lewat internet') },
          { id: 'css', label: t('Mewarnai tombol di layar'), explainWrong: t('JSON.stringify mengubah struktur data menjadi teks.') },
          { id: 'del', label: t('Menghapus file di browser'), explainWrong: t('JSON.stringify mengemas data untuk dikirim atau disimpan.') },
        ],
        answer: 'ser',
        explainCorrect: t('Tepat! Serialisasi mengemas object program menjadi teks yang siap melintasi jaringan.'),
        tags: ['serialisasi', 'json'],
      }),
      makeAnchorMcq({
        id: 'b03-anc-j5',
        prompt: t('Saat teks JSON tiba di aplikasi penerima, perintah apa yang merakitnya kembali menjadi object?'),
        choices: [
          { id: 'prs', label: t('JSON.parse()') },
          { id: 'str', label: t('JSON.stringify()'), explainWrong: t('stringify justru mengubah object menjadi teks.') },
          { id: 'img', label: t('<img>'), explainWrong: t('<img> adalah tag gambar HTML.') },
        ],
        answer: 'prs',
        explainCorrect: t('Benar! JSON.parse() membongkar teks JSON menjadi object data yang siap dipakai program.'),
        tags: ['serialisasi', 'json'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'b03-anc-p1',
        prompt: t('Manakah potongan JSON yang 100% sah dan bebas kesalahan sintaks?'),
        choices: [
          { id: 'ok', label: t('{"id": 12, "tersedia": true, "diskon": null}') },
          { id: 'sq', label: t("{'id': 12, 'tersedia': true}"), explainWrong: t('Kutip satu tidak sah di JSON.') },
          { id: 'tc', label: t('{"id": 12, "tersedia": true, }'), explainWrong: t('Trailing comma setelah item terakhir dilarang di JSON.') },
        ],
        answer: 'ok',
        explainCorrect: t('Tepat. Kutip ganda pada key, tipe number/boolean/null sah, dan tanpa koma terakhir.'),
        tags: ['json'],
      }),
      makeAnchorMcq({
        id: 'b03-anc-p2',
        prompt: t('Bagaimana cara standar menuliskan nilai tanggal di dalam JSON karena JSON tidak punya tipe Date?'),
        choices: [
          { id: 'iso', label: t('Ditulis sebagai string teks berformat ISO, misalnya "2026-11-22T19:48:00+08:00"') },
          { id: 'fn', label: t('Menulis new Date(2026, 10, 22) langsung di JSON'), explainWrong: t('JSON tidak mendukung pemanggilan konstruktor JavaScript.') },
          { id: 'cmt', label: t('Menulis komentar // 22 Nov 2026'), explainWrong: t('Komentar dilarang di JSON.') },
        ],
        answer: 'iso',
        explainCorrect: t('Benar. Tanggal di JSON direpresentasikan sebagai string standar ISO 8601.'),
        tags: ['json'],
      }),
      makeAnchorMcq({
        id: 'b03-anc-p3',
        prompt: t('Jika klien mengirim body JSON yang valid tetapi lupa menyertakan header Content-Type: application/json, server biasanya menjawab…'),
        choices: [
          { id: 'err', label: t('400 Bad Request atau 415 Unsupported Media Type') },
          { id: 'ok', label: t('201 Created secara otomatis tanpa perlu header'), explainWrong: t('Banyak server tidak dapat mem-parse body bila Content-Type tidak sesuai.') },
          { id: 'red', label: t('304 Not Modified'), explainWrong: t('304 digunakan untuk cache yang masih sama.') },
        ],
        answer: 'err',
        explainCorrect: t('Tepat. Header Content-Type memberi tahu server cara membaca format body yang dikirim.'),
        tags: ['json', 'header-body', 'status-code'],
      }),
      makeAnchorMcq({
        id: 'b03-anc-p4',
        prompt: t('Ketika aplikasi web perlu mengunggah foto KTP atau file PDF lewat HTTP POST, format payload yang tepat adalah…'),
        choices: [
          { id: 'mp', label: t('multipart/form-data') },
          { id: 'xml', label: t('XML komentar panjang'), explainWrong: t('Untuk unggah berkas dari form browser digunakan multipart/form-data.') },
          { id: 'url', label: t('Parameter path URL'), explainWrong: t('Berkas biner tidak dimasukkan ke URL.') },
        ],
        answer: 'mp',
        explainCorrect: t('Benar. multipart/form-data mengirim berkas dalam potongan-potongan terpisah melalui HTTP body.'),
        tags: ['protobuf', 'header-body'],
      }),
      makeAnchorMcq({
        id: 'b03-anc-p5',
        prompt: t('Kelebihan utama Protocol Buffers (Protobuf) dibanding format teks seperti JSON dan XML adalah…'),
        choices: [
          { id: 'bin', label: t('Berformat biner sehingga ukuran paket jauh lebih kecil dan sangat cepat diproses') },
          { id: 'eye', label: t('Lebih mudah dibaca langsung dengan mata manusia tanpa alat bantu'), explainWrong: t('Format biner Protobuf tidak bisa dibaca manusia tanpa skema .proto.') },
          { id: 'html', label: t('Dapat langsung dirender menjadi halaman HTML oleh browser'), explainWrong: t('Protobuf adalah format pertukaran data, bukan markup tampilan.') },
        ],
        answer: 'bin',
        explainCorrect: t('Tepat. Efisiensi ukuran biner Protobuf menjadi alasan utama ia dipakai di gRPC antar server.'),
        tags: ['protobuf'],
      }),
      makeAnchorMcq({
        id: 'b03-anc-p6',
        type: 'limit',
        analogy: t('Serialisasi seperti membongkar lemari saat pindahan rumah lalu merakitnya kembali'),
        prompt: t('Apa perbedaan penting antara membongkar lemari fisik dan serialisasi data object JS lewat JSON.stringify()?'),
        choices: [
          { id: 'copy', label: t('Object asli di pengirim tidak ikut hilang, dan metode/fungsi JS tidak ikut terserialisasi ke JSON') },
          { id: 'box', label: t('Data dikemas sebelum melewati jalur pengiriman'), explainWrong: t('Itu adalah bagian yang mirip dengan analogi pindahan.') },
          { id: 'build', label: t('Di sisi tujuan data disusun ulang menjadi bentuk yang siap dipakai'), explainWrong: t('Itu juga kesamaan antara merakit lemari dan deserialisasi.') },
        ],
        answer: 'copy',
        explainCorrect: t('Benar! Serialisasi mengirim salinan data murni (tanpa function/undefined) dan menjaga data asli tetap utuh.'),
        tags: ['serialisasi', 'json'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'b03-l01',
    worldId: 'b03',
    title: 'JSON itu formulir isian',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membaca pasangan label dan isi di dalam sebuah data JSON.',
      'Aku bisa membaca struktur JSON dan mengenali seluruh tipe nilai yang didukungnya.',
    ),
    estMinutes: 5,
    introducesTerms: ['json'],
    usesTerms: ['api', 'request', 'response'],
    stickerId: 'formulir-json',
    warmupFrom: 'b02-l06',
    steps: [
      storyStep('b03/formulir-json.svg', [
        rText(
          'Supaya tamu dan dapur saling mengerti, mereka sepakat memakai formulir baku bernama JSON! Setiap baris punya label dan isian, mirip formulir pendaftaran sekolah.',
          'Agar client dan server saling memahami isi paket request dan response, keduanya sepakat menggunakan bahasa tulis bersama: JSON (JavaScript Object Notation).',
        ),
      ]),
      conceptStep({
        title: t('Apa itu JSON?', 'JSON sebagai Bahasa Data'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'formulir-json' },
        alt: t('Contoh formulir JSON berisi id, nama, tersedia, diskon, warna, dan object toko.'),
        code: {
          lang: 'json',
          code: '{\n  "id": 12,\n  "nama": "Tas Ransel Kulit",\n  "tersedia": true,\n  "diskon": null,\n  "warna": ["hitam", "cokelat"],\n  "toko": {\n    "nama": "Toko Rani",\n    "kota": "Makassar"\n  }\n}',
          highlight: [2, 3, 6],
        },
        body: [
          rTerm('json', 'JSON', 'JSON'),
          rText(
            ' adalah cara menulis data sebagai teks rapi. Manusia mudah membacanya, komputer mudah mengolahnya.',
            ' (JavaScript Object Notation) menulis data sebagai teks ringan berisi pasangan "key": value yang mudah dibaca manusia maupun diproses mesin.',
          ),
        ],
      }),
      conceptStep({
        title: t('Enam Jenis Isian JSON', 'Tipe Nilai dalam JSON'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'nilai-json' },
        alt: t('Enam tipe nilai JSON: string, number, boolean, null, array, dan object.'),
        body: [
          rText(
            'Isi JSON beragam. Ada teks, angka, true/false, null, daftar siku, dan kotak bertingkat.',
            'JSON mendukung enam nilai: number (12), string ("Tas"), boolean (true/false), null (kosong), array ([...]), dan object ({...}).',
          ),
        ],
      }),
      conceptStep({
        title: t('Formulir di Dalam Formulir', 'Array dan Object Bersarang'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'objek-bersarang' },
        alt: t('Array warna dalam kurung siku dan object toko dalam kurung kurawal di dalam JSON.'),
        body: [
          rText(
            'Di dalam JSON, kita boleh menaruh daftar [...] atau formulir kecil {...} di dalam formulir utama.',
            'Seperti kolom "Data Toko" di formulir besar, sebuah key JSON boleh berisi array [...] atau object bersarang {...} untuk data terstruktur.',
          ),
        ],
      }),
      limitStep({
        analogy: t('JSON seperti formulir isian kertas di sekolah'),
        same: [
          t('Setiap baris punya label di kiri (key) dan nilai isian di kanan (value).'),
          t('Bisa berisi daftar pilihan dan bagian sub-formulir di dalamnya.'),
        ],
        different: [
          t('Di formulir kertas kamu bisa menulis coretan bebas, sedangkan JSON sangat ketat soal tanda kutip, kurung, dan koma.'),
          t('Jika kosong pada formulir JSON, komputer menulis null atau array kosong [], bukan sekadar membiarkan baris tanpa nilai.'),
        ],
      }),
      simStep(
        'dokter-json',
        t(
          'Lihat contoh JSON sehat di simulator Dokter JSON dan coba ketuk bagian yang bermasalah!',
          'Amati struktur kurung kurawal dan pasangan key–value pada simulator Dokter JSON.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'b03-l01-q1',
          type: 'analogy',
          prompt: t('Pada cerita formulir isian, nama label di sebelah kiri seperti "nama" atau "harga" disebut…'),
          choices: [
            { id: 'k', label: t('Key (kunci)') },
            { id: 'v', label: t('Array (daftar)'), explainWrong: t('Array adalah bentuk isi daftar dalam kurung siku.') },
            { id: 'c', label: t('Kode status'), explainWrong: t('Kode status ada pada baris pertama response HTTP.') },
          ],
          answer: 'k',
          explainCorrect: t('Tepat! Setiap baris JSON adalah pasangan key (label) dan value (isian).'),
          tags: ['json'],
        }),
      ),
      qStep({
        id: 'b03-l01-q2',
        type: 'match',
        prompt: t('Pasangkan contoh isi JSON berikut dengan tipe nilainya:'),
        difficulty: 2,
        left: [
          { id: 's', label: t('"Tas Ransel"') },
          { id: 'n', label: t('12') },
          { id: 'b', label: t('true') },
          { id: 'a', label: t('["hitam", "cokelat"]') },
        ],
        right: [
          { id: 't_b', label: t('Boolean (benar/salah)') },
          { id: 't_a', label: t('Array (daftar)') },
          { id: 't_s', label: t('String (teks)') },
          { id: 't_n', label: t('Number (angka)') },
        ],
        answer: { s: 't_s', n: 't_n', b: 't_b', a: 't_a' },
        explainCorrect: t('Mantap! Kamu sudah mengenali tipe string, number, boolean, dan array pada JSON.'),
        tags: ['json'],
      }),
      qStep(
        makeTf({
          id: 'b03-l01-q3',
          prompt: t('Di dalam JSON, kita boleh menaruh sebuah object {...} lagi di dalam object utama.'),
          answer: true,
          explainCorrect: t('Betul! Contohnya kolom "toko": { "nama": "Toko Rani", "kota": "Makassar" }.'),
          explainWrong: t('Hampir! JSON justru sering menyusun object bersarang untuk mengelompokkan data terkait.'),
          tags: ['json'],
        }),
      ),
      qStep({
        id: 'b03-l01-q4',
        type: 'hotspot',
        prompt: t('Ketuk baris JSON yang menyimpan daftar beberapa pilihan (tipe array):'),
        difficulty: 1,
        image: 'b03-hotspot',
        regions: [
          { id: 'r1', shape: 'rect', coords: [10, 10, 260, 45], label: '"id": 12' },
          { id: 'r2', shape: 'rect', coords: [10, 55, 260, 90], label: '"warna": ["hitam", "cokelat"]' },
          { id: 'r3', shape: 'rect', coords: [10, 100, 260, 135], label: '"tersedia": true' },
        ],
        answer: 'r2',
        explainCorrect: t('Benar! Tanda kurung siku [...] menandakan tipe data array (daftar).'),
        explainIncorrect: {
          r1: t('12 tanpa kurung siku adalah tipe number (angka).'),
          r3: t('true adalah tipe boolean (benar/salah).'),
        },
        tags: ['json'],
      }),
      qStep(
        makeMcq({
          id: 'b03-l01-q5',
          type: 'limit',
          analogy: t('JSON seperti formulir pendaftaran kertas'),
          prompt: t('Hal apa yang membedakan formulir JSON di komputer dengan formulir kertas biasa?'),
          difficulty: 2,
          choices: [
            { id: 'strict', label: t('JSON tidak boleh dikosongkan tanpa nilai (pakai null) dan wajib memakai tanda kutip serta kurung persis') },
            { id: 'pair', label: t('Keduanya mempunyai nama kolom dan nilai isian'), explainWrong: t('Itu justru bagian yang sama.') },
            { id: 'nest', label: t('Keduanya bisa dibagi ke dalam sub-bagian khusus'), explainWrong: t('Itu juga kesamaan keduanya.') },
          ],
          answer: 'strict',
          explainCorrect: t('Tepat! Komputer tidak bisa menebak maksud tulisan jika aturan tanda kurung atau nilainya dilanggar.'),
          tags: ['json'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b03-l01-q6',
          type: 'scenario',
          story: t('Nadia ingin membuat JSON untuk data buku yang punya 3 penulis sekaligus: "Rani", "Dimas", dan "Sari".'),
          prompt: t('Bagaimana cara penulisan kolom "penulis" yang tepat di JSON?'),
          difficulty: 2,
          choices: [
            { id: 'arr', label: t('"penulis": ["Rani", "Dimas", "Sari"]') },
            { id: 'num', label: t('"penulis": 3'), explainWrong: t('Angka 3 hanya menyimpan jumlahnya, bukan nama ketiga penulisnya.') },
            { id: 'nil', label: t('"penulis": null'), explainWrong: t('null berarti kosong tanpa penulis.') },
          ],
          answer: 'arr',
          explainCorrect: t('Benar! Daftar beberapa nama penulis sangat pas disimpan dalam array [...].'),
          tags: ['json'],
        }),
      ),
      qStep({
        id: 'b03-l01-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi potongan JSON produk berikut sesuai tipe nilainya:'),
        difficulty: 2,
        template: '{ "id": 12, "tersedia": ___, "diskon": ___, "warna": ___ }',
        bank: ['true', 'null', '["hitam"]', '// komentar'],
        answer: ['true', 'null', '["hitam"]'],
        explainCorrect: t('Tepat! boolean (true), kosong (null), dan array (["hitam"]).'),
        tags: ['json'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b03-l01-r1',
        prompt: t('Nilai "kosong" yang resmi di dalam format JSON ditulis sebagai…'),
        choices: [
          { id: 'null', label: t('null') },
          { id: 'none', label: t('biarkan kosong tanpa nilai setelah titik dua'), explainWrong: t('JSON mengharuskan selalu ada nilai setelah titik dua, yaitu null.') },
        ],
        answer: 'null',
        explainCorrect: t('null melambangkan nilai kosong yang sah di dalam JSON.'),
        tags: ['json'],
      }),
      makeTf({
        id: 'b03-l01-r2',
        prompt: t('Tanda kurung kurawal { ... } di JSON membungkus sebuah object berisi pasangan key dan value.'),
        answer: true,
        explainCorrect: t('Betul! Kurung kurawal menandai object, sedangkan kurung siku [...] menandai array.'),
        explainWrong: t('Hampir! Kurung kurawal memang membungkus object di JSON.'),
        tags: ['json'],
      }),
    ],
    recap: t(
      'JSON adalah formulir teks rapi berisi pasangan label dan nilai seperti teks, angka, true/false, daftar, atau kotak kecil.',
      'JSON merepresentasikan data terstruktur lewat pasangan "key": value dengan 6 tipe nilai resmi.',
    ),
    companion: {
      talkPrompts: ['Kalau kita bikin formulir data kucing peliharaan memakai JSON, label apa saja yang perlu ada?'],
      offlineActivity: 'Isi satu kertas kecil bergaya JSON tentang profil favoritmu: "nama", "umur", dan daftar "hobi" dalam tanda kurung siku [...].',
    },
  }),

  makeLesson({
    id: 'b03-l02',
    worldId: 'b03',
    title: 'Aturan JSON yang sering salah',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menemukan dan memperbaiki kesalahan tanda kutip, koma akhir, dan komentar di JSON.',
      'Aku bisa mengidentifikasi seluruh aturan ketat sintaks JSON serta peran header Content-Type.',
    ),
    estMinutes: 5,
    introducesTerms: [],
    usesTerms: ['json', 'header-body', 'status-code'],
    warmupFrom: 'b03-l01',
    steps: [
      storyStep('b03/aturan-json.svg', [
        rText(
          'Gudang JSON punya robot pemeriksa super teliti. Satu tanda kutip tunggal atau satu koma berlebih di akhir langsung membuat robot menolak seluruh kotak kiriman!',
          'Meskipun bentuknya mirip object JavaScript, JSON memiliki aturan tata tulis yang jauh lebih ketat. Sedikit kesalahan tanda baca akan langsung memicu error parsing.',
        ),
      ]),
      conceptStep({
        title: t('Wajib Tanda Kutip Dua', 'Aturan Tanda Kutip'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'kutip-dua' },
        alt: t('Perbandingan key tanpa kutip dan kutip satu yang salah vs kutip dua yang benar.'),
        code: {
          lang: 'json',
          code: '// SALAH: { nama: \'Tas\' }\n// BENAR: { "nama": "Tas" }',
          highlight: [2],
        },
        body: [
          rText(
            'Nama label (key) dan isi teks wajib memakai tanda kutip dua. Jangan pakai tanda kutip satu di JSON.',
            'Baik key maupun nilai string di JSON wajib memakai tanda kutip ganda ("). Menulis key tanpa kutip atau teks dengan kutip tunggal (\') pasti error.',
          ),
        ],
      }),
      conceptStep({
        title: t('Tanpa Koma Akhir & Komentar', 'Tanpa Trailing Comma dan Komentar'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'koma-akhir' },
        alt: t('Koma setelah item terakhir dan komentar // dilarang keras di JSON.'),
        code: {
          lang: 'json',
          code: '{\n  "nama": "Tas",\n  "harga": 90000,\n  "stok": 5\n}',
          highlight: [4],
        },
        body: [
          rText(
            'Jangan taruh koma setelah baris terakhir di dalam JSON. Jangan menulis catatan komentar seperti // di JSON.',
            'Aturan ketat berikutnya: dilarang menaruh koma setelah item terakhir (trailing comma) dan dilarang keras menyisipkan komentar // maupun /* ... */.',
          ),
        ],
      }),
      conceptStep({
        title: t('Tanggal & Header Content-Type', 'Tanggal ISO dan Content-Type'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'tanggal-header' },
        alt: t('Tanggal ditulis sebagai string ISO dan pengiriman JSON butuh Content-Type: application/json.'),
        body: [
          rText(
            'Tanggal di JSON ditulis sebagai teks. Jangan lupa header Content-Type: application/json agar server bisa membaca kirimanmu.',
            'JSON tidak memiliki tipe tanggal khusus sehingga tanggal ditulis sebagai string ISO ("2026-11-22T19:48:00+08:00"). Sertakan Content-Type: application/json agar tidak ditolak 400/415.',
          ),
        ],
      }),
      limitStep({
        analogy: t('JSON mirip penulisan object JavaScript'),
        same: [
          t('Sama-sama memakai kurung kurawal {...} untuk object dan kurung siku [...] untuk array.'),
        ],
        different: [
          t('Di kode JavaScript kamu boleh menulis kutip satu, key tanpa kutip, trailing comma, dan komentar //, tetapi semua itu TERLARANG di JSON!'),
        ],
      }),
      simStep(
        'dokter-json',
        t(
          'Ketuk dua baris JSON yang sakit di simulator Dokter JSON untuk menyembuhkannya!',
          'Perbaiki kesalahan kutip tunggal dan koma terakhir pada simulator Dokter JSON.',
        ),
      ),
      qStep({
        id: 'b03-l02-q1',
        type: 'spotbug',
        prompt: t('Ketuk DUA baris yang melanggar aturan penulisan JSON yang benar:'),
        difficulty: 2,
        lines: [
          '{',
          "  nama: 'Tas Kanvas',",
          '  "harga": 90000,',
          '  "stok": 5,',
          '}',
        ],
        answer: [2, 4],
        explainCorrect: t('Hebat! Baris 2 kurang kutip dua pada key & teks, sedangkan baris 4 ada koma berlebih di item terakhir.'),
        hints: [
          t('Periksa tanda kutip di baris 2 dan koma setelah angka 5.'),
          t('Key dan string di JSON pakai kutip dua, tanpa koma di item terakhir.'),
        ],
        tags: ['json'],
      }),
      qStep(
        makeMcq({
          id: 'b03-l02-q2',
          prompt: t('Manakah kesalahan utama dari penulisan { "nama": "Buku", "stok": 10, } ?'),
          choices: [
            { id: 'tc', label: t('Ada tanda koma di akhir setelah item terakhir ("stok": 10,)') },
            { id: 'num', label: t('Angka 10 seharusnya diberi tanda kutip'), explainWrong: t('Angka number memang ditulis tanpa tanda kutip.') },
            { id: 'brace', label: t('Seharusnya memakai tanda kurung biasa ( )'), explainWrong: t('Object JSON memang memakai kurung kurawal { }.') },
          ],
          answer: 'tc',
          explainCorrect: t('Tepat! Koma setelah item terakhir (trailing comma) membuat pembaca JSON gagal.'),
          tags: ['json'],
        }),
      ),
      qStep(
        makeTf({
          id: 'b03-l02-q3',
          prompt: t('Kita boleh menulis catatan komentar // harga diskon di dalam file JSON supaya mudah diingat.'),
          answer: false,
          explainCorrect: t('Benar, itu keliru! Standar JSON sama sekali tidak mengizinkan komentar.'),
          explainWrong: t('Hampir! Di file JSON asli, komentar // maupun /* */ langsung dianggap error sintaks.'),
          tags: ['json'],
        }),
      ),
      qStep({
        id: 'b03-l02-q4',
        type: 'sort',
        prompt: t('Kelompokkan potongan berikut ke JSON yang Sah atau JSON yang Salah:'),
        difficulty: 2,
        items: [
          { id: 'ok1', label: t('{"kota": "Makassar"}') },
          { id: 'bad1', label: t("{'kota': 'Makassar'}") },
          { id: 'ok2', label: t('{"tanggal": "2026-11-22"}') },
          { id: 'bad2', label: t('{kota: "Makassar",}') },
        ],
        bins: [
          { id: 'sah', label: t('JSON Sah') },
          { id: 'salah', label: t('JSON Salah') },
        ],
        answer: { ok1: 'sah', bad1: 'salah', ok2: 'sah', bad2: 'salah' },
        explainCorrect: t('Mantap! Hanya kutip ganda pada key+teks dan tanpa koma akhirlah yang sah.'),
        tags: ['json'],
      }),
      qStep(
        makeMcq({
          id: 'b03-l02-q5',
          type: 'limit',
          analogy: t('JSON terlihat persis seperti object JavaScript'),
          prompt: t('Kesalahan apa yang paling sering terjadi karena mengira aturan JSON persis sama dengan kode object JavaScript?'),
          difficulty: 2,
          choices: [
            { id: 'js', label: t('Menulis key tanpa kutip, memakai kutip satu, atau menambahkan koma akhir seperti di JS') },
            { id: 'arr', label: t('Memakai kurung siku [ ] untuk daftar'), explainWrong: t('Kurung siku untuk daftar dipakai di JS maupun JSON.') },
            { id: 'num', label: t('Menulis angka tanpa tanda kutip'), explainWrong: t('Angka tanpa kutip sah di JS maupun JSON.') },
          ],
          answer: 'js',
          explainCorrect: t('Benar! Di JS kutip satu dan trailing comma diperbolehkan, tetapi di JSON semuanya tidak valid.'),
          tags: ['json'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b03-l02-q6',
          type: 'scenario',
          story: t('Bito sudah menulis JSON yang rapi dan bebas error, lalu mengirimkannya ke API POST /produk tanpa menulis header Content-Type: application/json. Server membalas error 400.'),
          prompt: t('Mengapa server gagal memahami kiriman JSON Bito?'),
          difficulty: 3,
          choices: [
            { id: 'hdr', label: t('Server tidak diberi tahu lewat header bahwa body kiriman berformat JSON') },
            { id: 'date', label: t('Karena JSON tidak boleh dikirim memakai POST'), explainWrong: t('POST sangat umum mengirimkan body JSON.') },
            { id: 'size', label: t('Karena semua JSON hanya boleh berisi 1 kata'), explainWrong: t('JSON bisa memuat ribuan baris data.') },
          ],
          answer: 'hdr',
          explainCorrect: t('Tepat! Tanpa header Content-Type: application/json, server tidak tahu harus memakai pembaca JSON.'),
          tags: ['json', 'header-body', 'status-code'],
        }),
      ),
      qStep({
        id: 'b03-l02-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Ketik nilai header Content-Type standar untuk mengirim data JSON ke server API:'),
        difficulty: 2,
        accept: ['application/json'],
        explainCorrect: t('Benar! Header lengkapnya adalah Content-Type: application/json.'),
        tags: ['json', 'header-body'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b03-l02-r1',
        prompt: t('Apakah komentar dengan tanda // diizinkan di dalam JSON?'),
        choices: [
          { id: 'no', label: t('Tidak boleh, akan menyebabkan error') },
          { id: 'yes', label: t('Boleh kapan saja seperti di JavaScript'), explainWrong: t('JSON murni melarang segala bentuk komentar.') },
        ],
        answer: 'no',
        explainCorrect: t('Standar JSON tidak mendukung komentar agar formatnya murni data.'),
        tags: ['json'],
      }),
      makeMcq({
        id: 'b03-l02-r2',
        prompt: t('Untuk mengirim nilai tanggal di dalam JSON, bentuk apa yang digunakan?'),
        choices: [
          { id: 'str', label: t('Teks (string), misalnya format ISO "2026-11-22"') },
          { id: 'raw', label: t('Tanpa tanda kutip seperti 2026-11-22'), explainWrong: t('Tanpa kutip, 2026-11-22 tidak sah di JSON.') },
        ],
        answer: 'str',
        explainCorrect: t('JSON tidak punya tipe tanggal khusus sehingga tanggal ditulis sebagai teks.'),
        tags: ['json'],
      }),
    ],
    recap: t(
      'Di JSON: wajib kutip dua untuk key dan teks, dilarang koma terakhir, dilarang komentar, dan pakai header Content-Type.',
      'Sintaks JSON mewajibkan kutip ganda, melarang trailing comma maupun komentar, menulis tanggal sebagai string, dan butuh Content-Type: application/json.',
    ),
    companion: {
      talkPrompts: ['Kenapa ya robot pembaca JSON jauh lebih cerewet daripada manusia kalau ada satu koma tertinggal?'],
      offlineActivity: 'Tulis satu kartu JSON di kertas dengan 1 kesalahan sengaja (misal kutip satu atau koma terakhir), lalu minta partnermu jadi "Dokter JSON" untuk menemukannya.',
    },
  }),

  makeLesson({
    id: 'b03-l03',
    worldId: 'b03',
    title: 'Serialisasi: pindahan rumah',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menjelaskan cara mengemas data menjadi teks (stringify) lalu merakitnya kembali (parse).',
      'Aku bisa menjelaskan proses serialisasi (JSON.stringify) dan deserialisasi (JSON.parse) beserta batasnya.',
    ),
    estMinutes: 5,
    introducesTerms: ['serialisasi'],
    usesTerms: ['json', 'javascript', 'browser', 'server'],
    stickerId: 'pindahan-lemari',
    warmupFrom: 'b03-l02',
    steps: [
      storyStep('b03/pindahan-lemari.svg', [
        rText(
          'Saat pindahan rumah, lemari besar tidak muat lewat pintu! Kamu membongkarnya jadi papan datar dalam kardus, mengangkut dengan truk, lalu merakit ulang lemarinya di rumah baru.',
          'Data berbentuk object hidup di memori program tidak dapat dikirim utuh melewati kabel jaringan. Ia harus dikemas dulu menjadi teks atau bit, lalu dibongkar ulang di tujuan.',
        ),
      ]),
      conceptStep({
        title: t('Mengemas Data untuk Dikirim', 'Apa itu Serialisasi?'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b03', topic: 'serialisasi-kirim' },
        alt: t('Object pengirim diubah jadi teks JSON di jaringan, lalu kembali jadi object penerima.'),
        body: [
          rTerm('serialisasi', 'Serialisasi', 'Serialisasi'),
          rText(
            ' mengemas data object menjadi teks. Data pun muat lewat kabel internet.',
            ' mengubah object di memori menjadi urutan teks/bit agar bisa dikirim atau disimpan, sedangkan deserialisasi merakitnya kembali.',
          ),
        ],
      }),
      conceptStep({
        title: t('Kemas dengan JSON.stringify()', 'Mengemas: JSON.stringify()'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'stringify' },
        alt: t('JSON.stringify mengubah object produk menjadi string JSON.'),
        code: {
          lang: 'js',
          code: 'const produk = { nama: "Tas", harga: 90000 };\nconst teks = JSON.stringify(produk);\n// Hasil: \'{"nama":"Tas","harga":90000}\'',
          highlight: [2],
        },
        body: [
          rText('Perintah '),
          rCode('JSON.stringify()'),
          rText(
            ' mengemas data object menjadi teks JSON supaya muat dikirim lewat internet.',
            ' menserialisasi object JavaScript menjadi teks JSON satu baris yang siap dimasukkan ke request body.',
          ),
        ],
      }),
      conceptStep({
        title: t('Rakit Lagi dengan JSON.parse()', 'Membongkar: JSON.parse()'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'parse' },
        alt: t('JSON.parse mengubah teks JSON menjadi object JavaScript hidup.'),
        code: {
          lang: 'js',
          code: 'const balik = JSON.parse(teks);\nconsole.log(balik.nama); // "Tas"',
          highlight: [1],
        },
        body: [
          rText('Di sisi penerima, perintah '),
          rCode('JSON.parse()'),
          rText(
            ' membongkar teks JSON menjadi data hidup seperti ',
            ' mendeserialisasi teks JSON menjadi object JavaScript sehingga properti seperti ',
          ),
          rCode('balik.nama'),
          rText(
            ' yang siap dipakai lagi.',
            ' dapat langsung dibaca.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Serialisasi seperti membongkar lemari saat pindahan rumah'),
        same: [
          t('Data besar dikemas ke paket rapi agar bisa melewati perjalanan, lalu dirakit ulang menjadi bentuk semula.'),
        ],
        different: [
          t('Lemari fisik ikut berpindah tempat, sedangkan data komputer hanya mengirim salinannya sehingga data asli tetap utuh.'),
          t('Jika object JavaScript punya fungsi atau nilai undefined, bagian itu tidak ikut masuk ke hasil JSON.stringify().'),
        ],
      }),
      simStep(
        'dokter-json',
        t(
          'Pastikan JSON sembuh di simulator agar JSON.parse() bisa membacanya tanpa error!',
          'Sembuhkan sintaks JSON di simulator sehingga JSON.parse() berhasil dijalankan.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'b03-l03-q1',
          type: 'analogy',
          prompt: t('Dalam cerita pindahan rumah, membongkar lemari menjadi papan-papan kardus sebelum dinaikkan ke truk adalah…'),
          choices: [
            { id: 'ser', label: t('Serialisasi (JSON.stringify)') },
            { id: 'des', label: t('Deserialisasi (JSON.parse)'), explainWrong: t('Merakit ulang di rumah barulah yang disebut deserialisasi.') },
            { id: 'del', label: t('Menghapus data (DELETE)'), explainWrong: t('Lemari bukan dibuang, melainkan dikemas untuk dikirim.') },
          ],
          answer: 'ser',
          explainCorrect: t('Tepat! Serialisasi mengemas struktur data menjadi teks siap kirim.'),
          tags: ['serialisasi'],
        }),
      ),
      qStep({
        id: 'b03-l03-q2',
        type: 'order',
        prompt: t('Urutkan perjalanan object produk dari komputer pengirim hingga bisa dibaca komputer penerima:'),
        difficulty: 2,
        items: [
          { id: 's3', label: t('Penerima menjalankan JSON.parse() untuk merakitnya kembali menjadi object') },
          { id: 's1', label: t('Program pengirim menjalankan JSON.stringify() menjadi teks JSON') },
          { id: 's4', label: t('Penerima membaca nilai produk.nama di layar') },
          { id: 's2', label: t('Teks JSON dikirim melewati jaringan internet') },
        ],
        answer: ['s1', 's2', 's3', 's4'],
        explainCorrect: t('Benar sekali! Object → stringify jadi teks → kirim jaringan → parse jadi object lagi!'),
        tags: ['serialisasi', 'json'],
      }),
      qStep(
        makeMcq({
          id: 'b03-l03-q3',
          prompt: t('Fungsi JavaScript mana yang bertugas mengubah teks JSON kembali menjadi object data?'),
          choices: [
            { id: 'parse', label: t('JSON.parse()') },
            { id: 'str', label: t('JSON.stringify()'), explainWrong: t('JSON.stringify() justru mengubah object menjadi teks.') },
            { id: 'alert', label: t('window.alert()'), explainWrong: t('alert hanya menampilkan kotak pesan.') },
          ],
          answer: 'parse',
          explainCorrect: t('Tepat! JSON.parse() melakukan deserialisasi dari teks menjadi object.'),
          tags: ['serialisasi', 'javascript'],
        }),
      ),
      qStep(
        makeTf({
          id: 'b03-l03-q4',
          prompt: t('Jika kita menjalankan JSON.parse() pada teks JSON yang memiliki koma berlebih di akhir, program akan mengalami error.'),
          answer: true,
          explainCorrect: t('Betul! JSON.parse() sangat ketat dan hanya menerima teks JSON yang sah.'),
          explainWrong: t('Hampir! Kesalahan sekecil koma berlebih atau kutip satu langsung membuat JSON.parse() melempar error.'),
          tags: ['serialisasi', 'json'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b03-l03-q5',
          type: 'limit',
          analogy: t('Serialisasi dan deserialisasi seperti pindahan lemari'),
          prompt: t('Apa hal yang TIDAK ikut terbawa ketika object JavaScript dikemas memakai JSON.stringify()?'),
          difficulty: 2,
          choices: [
            { id: 'fn', label: t('Fungsi (method) di dalam object dan nilai undefined tidak ikut masuk ke JSON') },
            { id: 'str', label: t('Teks nama dan harga angka'), explainWrong: t('Teks dan angka justru menjadi isi utama JSON.') },
            { id: 'arr', label: t('Daftar array warna produk'), explainWrong: t('Array ikut dikemas dengan rapi ke JSON.') },
          ],
          answer: 'fn',
          explainCorrect: t('Benar! JSON murni format data teks, bukan tempat menyimpan fungsi kode JavaScript.'),
          tags: ['serialisasi', 'javascript'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b03-l03-q6',
          type: 'scenario',
          story: t('Bito menerima teks JSON \'{"nama":"Topi","harga":45000}\' dari server, lalu langsung menulis teks.nama tanpa merakitnya dulu dan hasilnya undefined.'),
          prompt: t('Langkah apa yang terlewat oleh Bito?'),
          difficulty: 2,
          choices: [
            { id: 'prs', label: t('Melakukan deserialisasi terlebih dahulu menggunakan JSON.parse(teks)') },
            { id: 'str', label: t('Menjalankan JSON.stringify(teks) lagi'), explainWrong: t('Teks tidak perlu diubah jadi teks lagi; ia harus di-parse menjadi object.') },
            { id: 'css', label: t('Menambahkan warna CSS pada teks'), explainWrong: t('Masalahnya ada pada tipe data string yang belum diubah jadi object.') },
          ],
          answer: 'prs',
          explainCorrect: t('Tepat! Teks JSON harus di-parse lebih dulu supaya bisa diakses seperti object (.nama).'),
          tags: ['serialisasi', 'javascript'],
        }),
      ),
      qStep({
        id: 'b03-l03-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi kode JavaScript berikut untuk mengemas dan merakit kembali data produk:'),
        difficulty: 2,
        template: 'const teks = ___(produk);\nconst balik = ___(teks);',
        bank: ['JSON.stringify', 'JSON.parse', 'console.log', 'Array.isArray'],
        answer: ['JSON.stringify', 'JSON.parse'],
        explainCorrect: t('Sempurna! JSON.stringify untuk serialisasi ke teks, JSON.parse untuk deserialisasi ke object.'),
        tags: ['serialisasi', 'javascript'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b03-l03-r1',
        prompt: t('Proses mengubah object di memori menjadi teks JSON siap kirim disebut…'),
        choices: [
          { id: 'ser', label: t('Serialisasi') },
          { id: 'ren', label: t('Desain warna'), explainWrong: t('Proses pengemasan data menjadi teks adalah serialisasi.') },
        ],
        answer: 'ser',
        explainCorrect: t('Serialisasi mengemas struktur data program ke teks agar dapat dikirim lewat internet.'),
        tags: ['serialisasi'],
      }),
      makeMcq({
        id: 'b03-l03-r2',
        prompt: t('Perintah JavaScript untuk mengubah object { nama: "Tas" } menjadi teks JSON adalah…'),
        choices: [
          { id: 's', label: t('JSON.stringify()') },
          { id: 'p', label: t('JSON.parse()'), explainWrong: t('JSON.parse() bekerja ke arah sebaliknya (teks menjadi object).') },
        ],
        answer: 's',
        explainCorrect: t('JSON.stringify() mengubah object menjadi string JSON.'),
        tags: ['serialisasi', 'json'],
      }),
    ],
    recap: t(
      'Serialisasi (JSON.stringify) mengemas data jadi teks sebelum dikirim; deserialisasi (JSON.parse) merakitnya lagi di tujuan.',
      'JSON.stringify menserialisasi object ke teks untuk dikirim melalui HTTP, lalu JSON.parse mendeserialisasinya di pihak penerima.',
    ),
    companion: {
      talkPrompts: ['Kalau membeli meja rakitan dari toko furnitur, kenapa dikirimnya dalam kardus papan datar bukan sudah jadi meja?'],
      offlineActivity: 'Bongkar susunan mainan balok menjadi satuan balok di kantong plastik (serialisasi), pindahkan ke meja lain, lalu rakit lagi bentuk yang sama (deserialisasi).',
    },
  }),

  makeLesson({
    id: 'b03-l04',
    worldId: 'b03',
    title: 'Format lain: XML, form-data, Protobuf',
    modes: ['pro'],
    objective: t('Aku bisa membandingkan JSON dengan XML, form-data, serta format biner Protobuf dan memilihnya sesuai kasus.'),
    estMinutes: 5,
    introducesTerms: ['protobuf'],
    usesTerms: ['json', 'serialisasi', 'header-body', 'browser', 'server'],
    warmupFrom: 'b03-l03',
    steps: [
      storyStep('b03/format-lain.svg', [
        rText(
          'JSON adalah bahasa tulis paling populer di API web modern, tetapi bukan satu-satunya. Sistem bank lama sering memakai surat bertag XML, form unggah gambar memakai multipart/form-data, dan komunikasi antar server cepat memakai sandi biner Protobuf.',
        ),
      ]),
      conceptStep({
        title: t('XML, YAML, dan CSV'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'xml-yaml' },
        alt: t('Contoh tag XML produk serta ringkasan YAML dan CSV.'),
        code: {
          lang: 'html',
          code: '<produk>\n  <nama>Tas</nama>\n  <harga>90000</harga>\n</produk>',
          highlight: [1, 2],
        },
        body: [
          rBold('XML'),
          rText(' memakai tag pembuka-penutup mirip HTML; ukurannya lebih panjang, masih umum di perbankan, pemerintahan, dan SOAP. Selain itu ada '),
          rBold('YAML'),
          rText(' (berbasis indentasi untuk konfigurasi) dan '),
          rBold('CSV'),
          rText(' (tabel dipisah koma).'),
        ],
      }),
      conceptStep({
        title: t('Form Data untuk Formulir & Upload'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'form-data' },
        alt: t('Perbedaan application/x-www-form-urlencoded dan multipart/form-data.'),
        body: [
          rText('Browser mengenal dua format formulir: '),
          rCode('application/x-www-form-urlencoded'),
          rText(' untuk teks pendek seperti '),
          rCode('nama=Tas&harga=90000'),
          rText(', serta '),
          rCode('multipart/form-data'),
          rText(' yang memotong-motong file foto atau PDF saat diunggah ke server.'),
        ],
      }),
      conceptStep({
        title: t('Protocol Buffers (Protobuf)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'protobuf' },
        alt: t('Format biner Protobuf ringkas dan cepat, digunakan oleh gRPC.'),
        body: [
          rTerm('protobuf', 'Protocol Buffers (Protobuf)'),
          rText(' adalah format '),
          rBold('biner'),
          rText(' buatan Google yang sangat kecil dan cepat diproses. Namun isinya tidak terbaca oleh mata manusia tanpa skema "kamus"-nya, dan menjadi tulang punggung gRPC.'),
        ],
      }),
      limitStep({
        analogy: t('Format teks (JSON/XML) seperti surat tulisan tangan, sedangkan format biner (Protobuf) seperti sandi kode morse'),
        same: [
          t('Surat teks mudah dibaca langsung untuk mencari masalah, sedangkan sandi biner jauh lebih ringkas dan cepat.'),
        ],
        different: [
          t('Walau Protobuf sulit dibaca langsung di jaringan, kedua pihak komputer tidak perlu menerka-nerka karena sudah dijamin skema ketat .proto sejak awal.'),
        ],
      }),
      simStep(
        'dokter-json',
        t('Bandingkan keterbacaan format teks JSON di simulator Dokter JSON.'),
      ),
      qStep({
        id: 'b03-l04-q1',
        type: 'match',
        prompt: t('Pasangkan keempat format pertukaran data dengan karakteristik atau kegunaannya:'),
        difficulty: 2,
        left: [
          { id: 'xml', label: t('XML') },
          { id: 'mp', label: t('multipart/form-data') },
          { id: 'pb', label: t('Protobuf') },
          { id: 'yml', label: t('YAML') },
        ],
        right: [
          { id: 'r_pb', label: t('Format biner super cepat dan kecil untuk gRPC') },
          { id: 'r_yml', label: t('Berbasis indentasi, sering untuk konfigurasi & dokumentasi API') },
          { id: 'r_xml', label: t('Format tag mirip HTML yang masih dipakai bank dan SOAP') },
          { id: 'r_mp', label: t('Mengunggah berkas foto atau PDF dalam potongan terpisah') },
        ],
        answer: { xml: 'r_xml', mp: 'r_mp', pb: 'r_pb', yml: 'r_yml' },
        explainCorrect: t('Mantap! Setiap format punya keunggulan dan tempat pakainya masing-masing.'),
        tags: ['protobuf', 'json'],
      }),
      qStep(
        makeMcq({
          id: 'b03-l04-q2',
          prompt: t('Jika pengguna Toko Rani mengunggah foto bukti transfer dan file PDF dari browser, Content-Type mana yang tepat?'),
          choices: [
            { id: 'mp', label: t('multipart/form-data') },
            { id: 'url', label: t('application/x-www-form-urlencoded'), explainWrong: t('x-www-form-urlencoded cocok untuk teks pendek, bukan file biner foto/PDF.') },
            { id: 'csv', label: t('text/csv'), explainWrong: t('CSV adalah format tabel teks dipisah koma.') },
          ],
          answer: 'mp',
          explainCorrect: t('Tepat! multipart/form-data dirancang untuk mengirim file dalam potongan-potongan terpisah.'),
          tags: ['header-body', 'browser'],
        }),
      ),
      qStep(
        makeTf({
          id: 'b03-l04-q3',
          prompt: t('Data Protobuf yang sedang melintasi jaringan mudah dibaca langsung dengan mata telanjang tanpa skema definisi kamusnya.'),
          answer: false,
          explainCorrect: t('Benar, itu keliru! Protobuf adalah format biner yang memerlukan file definisi skema (.proto) untuk dibaca.'),
          explainWrong: t('Protobuf dikemas dalam bentuk biner ringkas sehingga tidak bisa dibaca manusia tanpa kamusnya.'),
          tags: ['protobuf'],
        }),
      ),
      qStep({
        id: 'b03-l04-q4',
        type: 'sort',
        prompt: t('Kelompokkan format data berikut ke kelompok Format Teks atau Format Biner:'),
        difficulty: 2,
        items: [
          { id: 'j', label: t('JSON') },
          { id: 'x', label: t('XML') },
          { id: 'p', label: t('Protobuf') },
          { id: 'm', label: t('MessagePack') },
        ],
        bins: [
          { id: 'txt', label: t('Format Teks (Mudah Dibaca)') },
          { id: 'bin', label: t('Format Biner (Ringkas Cepat)') },
        ],
        answer: { j: 'txt', x: 'txt', p: 'bin', m: 'bin' },
        explainCorrect: t('Benar! JSON dan XML berbasis teks terbaca manusia, sementara Protobuf dan MessagePack berbasis biner ringkas.'),
        tags: ['protobuf', 'json'],
      }),
      qStep(
        makeMcq({
          id: 'b03-l04-q5',
          type: 'limit',
          analogy: t('Teks seperti surat tulisan tangan vs Protobuf seperti sandi morse ringkas'),
          prompt: t('Mengapa mayoritas Web API publik untuk frontend tetap memilih JSON yang lebih besar daripada Protobuf yang super cepat?'),
          difficulty: 3,
          choices: [
            { id: 'dbg', label: t('Karena JSON mudah dibaca langsung di DevTools, didukung bawaan browser, dan tidak butuh kamus biner') },
            { id: 'slow', label: t('Karena Protobuf tidak dapat dikirim melalui internet sama sekali'), explainWrong: t('Protobuf justru sangat cepat dikirim lewat internet, terutama lewat gRPC.') },
            { id: 'sec', label: t('Karena JSON otomatis mengenkripsi data tanpa HTTPS'), explainWrong: t('JSON berupa teks polos; keamanan transportasi berasal dari HTTPS.') },
          ],
          answer: 'dbg',
          explainCorrect: t('Tepat! Kemudahan debugging dan dukungan bawaan browser membuat JSON ideal bagi sebagian besar Web API.'),
          tags: ['protobuf', 'json', 'browser'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b03-l04-q6',
          type: 'scenario',
          story: t('Tim backend menghubungkan dua server internal yang bertukar ratusan ribu pesan posisi kurir per menit dengan tuntutan latensi serendah mungkin.'),
          prompt: t('Format data manakah yang paling menghemat ukuran paket dan waktu olah antar server tersebut?'),
          difficulty: 2,
          choices: [
            { id: 'pb', label: t('Protocol Buffers (Protobuf)') },
            { id: 'xml', label: t('XML dengan tag panjang'), explainWrong: t('XML berukuran paling besar dan lebih lambat diproses.') },
            { id: 'url', label: t('application/x-www-form-urlencoded'), explainWrong: t('Format form URL tidak efisien untuk komunikasi antar server berskala tinggi.') },
          ],
          answer: 'pb',
          explainCorrect: t('Benar! Ukuran biner Protobuf yang kecil dan cepat diproses sangat unggul untuk komunikasi antar server.'),
          tags: ['protobuf', 'server'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b03-l04-r1',
        prompt: t('Format data berbasis tag mirip HTML yang masih sering dijumpai di sistem bank lama adalah…'),
        choices: [
          { id: 'xml', label: t('XML') },
          { id: 'pb', label: t('Protobuf'), explainWrong: t('Protobuf adalah format biner tanpa tag.') },
        ],
        answer: 'xml',
        explainCorrect: t('XML membungkus data memakai tag pembuka dan penutup seperti <nama>Tas</nama>.'),
        tags: ['protobuf'],
      }),
      makeTf({
        id: 'b03-l04-r2',
        prompt: t('Format Protobuf adalah format biner yang jauh lebih ringkas dan cepat daripada JSON, tetapi memerlukan kamus skema untuk dibaca.'),
        answer: true,
        explainCorrect: t('Betul! Protobuf mengorbankan keterbacaan manusia langsung demi kecepatan dan ukuran ringkas.'),
        explainWrong: t('Protobuf memang format biner sehingga tidak terbaca manusia tanpa file skema .proto.'),
        tags: ['protobuf'],
      }),
    ],
    recap: t('Selain JSON, ada XML (bertag), form-data (unggah berkas), YAML/CSV, serta Protobuf (biner super cepat untuk antar server).'),
  }),
];
