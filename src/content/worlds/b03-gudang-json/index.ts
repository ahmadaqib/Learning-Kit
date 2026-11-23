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
  id: 'b03',
  track: 'B',
  order: 3,
  title: 'Gudang JSON',
  tagline: t(
    'Isi formulir data dengan aturan yang jelas. Lalu kemas barang agar siap dikirim.',
    'Kamu bisa menulis JSON yang valid, lalu mengubah data di program menjadi teks JSON dan sebaliknya.',
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
      'Selamat datang di Gudang JSON. Ayo buktikan kamu bisa mengisi formulir dan mengemas barang!',
      'Ayo uji kemampuanmu menulis JSON valid dan mengemasnya untuk dikirim.',
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
        prompt: t('Label dan teks di JSON memakai tanda kutip apa?'),
        choices: [
          { id: 'dq', label: t('Tanda kutip dua') },
          {
            id: 'sq',
            label: t('Tanda kutip satu'),
            explainWrong: t('JSON menolak kutip satu. Robot gudang hanya mau kutip dua.'),
          },
          {
            id: 'nq',
            label: t('Tanpa tanda kutip'),
            explainWrong: t('Label tanpa kutip membuat robot bingung. Label harus dibungkus kutip dua.'),
          },
        ],
        answer: 'dq',
        explainCorrect: t('JSON hanya menerima kutip dua. Robot gudang menolak yang lain.'),
        tags: ['json'],
      }),
      makeAnchorMcq({
        id: 'b03-anc-j2',
        prompt: t('Kurung siku dipakai untuk menulis apa?'),
        choices: [
          { id: 'arr', label: t('Daftar beberapa isian') },
          {
            id: 'bool',
            label: t('Jawaban ya atau tidak'),
            explainWrong: t('Ya atau tidak ditulis sebagai kata. Tidak butuh kurung siku.'),
          },
          {
            id: 'num',
            label: t('Satu angka saja'),
            explainWrong: t('Angka ditulis langsung. Satu angka tidak butuh kurung siku.'),
          },
        ],
        answer: 'arr',
        explainCorrect: t('Kurung siku membungkus daftar. Seperti daftar belanja yang ditulis berderet.'),
        tags: ['json'],
      }),
      makeAnchorMcq({
        id: 'b03-anc-j3',
        prompt: t('Mengapa koma di ujung isian terakhir itu salah?'),
        choices: [
          { id: 'tr', label: t('Koma menandakan masih ada isian berikutnya') },
          {
            id: 'del',
            label: t('Koma itu menghapus semua data'),
            explainWrong: t('Datanya tidak hilang. Robot hanya gagal membacanya.'),
          },
          {
            id: 'clr',
            label: t('Koma itu membuat isian terbaca dua kali'),
            explainWrong: t('Isian tidak terbaca dua kali. Robot hanya menunggu isian berikutnya.'),
          },
        ],
        answer: 'tr',
        explainCorrect: t('Koma berarti masih ada isian lagi. Robot menunggu, tetapi tidak ada.'),
        tags: ['json'],
      }),
      makeAnchorMcq({
        id: 'b03-anc-j4',
        prompt: t('Mengapa data dikemas menjadi teks sebelum dikirim?'),
        choices: [
          { id: 'ser', label: t('Teks mudah dikirim lewat internet') },
          {
            id: 'css',
            label: t('Teks membuat data menjadi rahasia'),
            explainWrong: t('Teks JSON bisa dibaca siapa saja. Mengemas bukan mengunci.'),
          },
          {
            id: 'del',
            label: t('Teks membuat ukuran data selalu kecil'),
            explainWrong: t('Ukurannya tidak selalu kecil. Teks hanya membuat data mudah diangkut.'),
          },
        ],
        answer: 'ser',
        explainCorrect: t('Data harus berbentuk teks agar muat di internet. Seperti lemari dibongkar dulu.'),
        tags: ['serialisasi', 'json'],
      }),
      makeAnchorMcq({
        id: 'b03-anc-j5',
        prompt: t('Teks JSON tiba di tujuan. Apa yang dilakukan penerima?'),
        choices: [
          { id: 'prs', label: t('Merakitnya kembali menjadi data') },
          {
            id: 'str',
            label: t('Mengemasnya menjadi teks lagi'),
            explainWrong: t('Teks itu sudah dikemas. Ia perlu dirakit, bukan dikemas lagi.'),
          },
          {
            id: 'img',
            label: t('Membacanya tanpa mengubah apa pun'),
            explainWrong: t('Teks belum bisa dipakai apa adanya. Ia harus dirakit dulu.'),
          },
        ],
        answer: 'prs',
        explainCorrect: t('Penerima merakit teks menjadi data. Seperti merakit lemari dari papan.'),
        tags: ['serialisasi', 'json'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'b03-anc-p1',
        prompt: t('Potongan JSON mana yang sah dan bebas kesalahan sintaks?'),
        choices: [
          { id: 'ok', label: t('{"id": 12, "tersedia": true, "diskon": null}') },
          {
            id: 'sq',
            label: t("{'id': 12, 'tersedia': true}"),
            explainWrong: t('Kutip satu tidak sah di JSON. Key dan string harus memakai kutip ganda.'),
          },
          {
            id: 'tc',
            label: t('{"id": 12, "tersedia": true, }'),
            explainWrong: t('JSON melarang koma setelah item terakhir. Hapus koma itu.'),
          },
        ],
        answer: 'ok',
        explainCorrect: t('Key memakai kutip ganda, tipe number, boolean, dan null sah, dan tidak ada koma di akhir.'),
        tags: ['json'],
      }),
      makeAnchorMcq({
        id: 'b03-anc-p2',
        prompt: t('Bagaimana JSON menulis tanggal, karena JSON tidak punya tipe tanggal?'),
        choices: [
          { id: 'iso', label: t('Teks berformat ISO, misalnya "2026-11-22"') },
          {
            id: 'fn',
            label: t('Pemanggilan new Date(2026, 10, 22)'),
            explainWrong: t('JSON hanya berisi data, jadi pemanggilan fungsi tidak sah.'),
          },
          {
            id: 'cmt',
            label: t('Tulisan bebas tanpa kutip, seperti 22 Nov 2026'),
            explainWrong: t('Teks tanpa kutip tidak sah di JSON. Tanggal harus berupa string.'),
          },
        ],
        answer: 'iso',
        explainCorrect: t('JSON tidak punya tipe tanggal. Karena itu tanggal ditulis sebagai string berformat ISO 8601.'),
        tags: ['json'],
      }),
      makeAnchorMcq({
        id: 'b03-anc-p3',
        prompt: t('Kamu mengirim JSON valid tanpa header Content-Type. Apa balasan yang biasa muncul?'),
        choices: [
          { id: 'err', label: t('400 Bad Request atau 415 Unsupported Media Type') },
          {
            id: 'ok',
            label: t('201 Created, karena kirimannya sudah valid'),
            explainWrong: t('Server sering menolak kiriman yang Content-Type-nya tidak sesuai, jadi 201 jarang muncul.'),
          },
          {
            id: 'red',
            label: t('304 Not Modified'),
            explainWrong: t('304 berarti isi di simpanan sementara masih sama. Kode itu bukan untuk kesalahan kiriman.'),
          },
        ],
        answer: 'err',
        explainCorrect: t('Header Content-Type memberi tahu server format isi kiriman. Tanpa itu server sering menolaknya.'),
        tags: ['json', 'header-body', 'status-code'],
      }),
      makeAnchorMcq({
        id: 'b03-anc-p4',
        prompt: t('Aplikasi web mengunggah foto KTP atau file PDF lewat HTTP POST. Format isi data apa yang tepat?'),
        choices: [
          { id: 'mp', label: t('multipart/form-data') },
          {
            id: 'xml',
            label: t('application/json'),
            explainWrong: t('JSON menyimpan teks. File foto atau PDF lebih cocok dikirim sebagai bagian biner terpisah.'),
          },
          {
            id: 'url',
            label: t('Parameter di URL'),
            explainWrong: t('URL punya batas panjang. File tidak dimasukkan ke URL.'),
          },
        ],
        answer: 'mp',
        explainCorrect: t('multipart/form-data mengirim file dalam bagian terpisah di dalam body HTTP.'),
        tags: ['protobuf', 'header-body'],
      }),
      makeAnchorMcq({
        id: 'b03-anc-p5',
        prompt: t('Apa kelebihan utama Protobuf dibanding JSON dan XML?'),
        choices: [
          { id: 'bin', label: t('Formatnya biner, jadi kecil dan cepat diproses') },
          {
            id: 'eye',
            label: t('Mata manusia bisa langsung membacanya'),
            explainWrong: t('Untuk membaca pesan Protobuf sebagai data terstruktur, gunakan skema .proto dan alat pembaca.'),
          },
          {
            id: 'html',
            label: t('Browser langsung menampilkannya sebagai halaman HTML'),
            explainWrong: t('Protobuf hanya format pertukaran data. Ia tidak mengatur tampilan.'),
          },
        ],
        answer: 'bin',
        explainCorrect: t('Format biner bisa memperkecil pesan. gRPC biasa memakai Protobuf untuk mengirim data antarlayanan.'),
        tags: ['protobuf'],
      }),
      makeAnchorMcq({
        id: 'b03-anc-p6',
        type: 'limit',
        analogy: t('Serialisasi seperti membongkar lemari saat pindahan rumah'),
        prompt: t('Apa beda membongkar lemari fisik dengan serialisasi lewat JSON.stringify()?'),
        choices: [
          { id: 'copy', label: t('Pengirim tetap menyimpan object aslinya') },
          {
            id: 'box',
            label: t('Data dikemas lebih dulu sebelum melewati jalur pengiriman'),
            explainWrong: t('Itu kesamaannya: lemari juga dibongkar dulu sebelum diangkut.'),
          },
          {
            id: 'build',
            label: t('Di tujuan, data disusun ulang menjadi bentuk yang siap dipakai'),
            explainWrong: t('Itu juga kesamaannya: lemari dirakit lagi di rumah baru.'),
          },
        ],
        answer: 'copy',
        explainCorrect: t('Serialisasi mengirim salinan, jadi object asli tetap utuh. Fungsi dan undefined juga tidak ikut masuk ke JSON.'),
        tags: ['serialisasi', 'json'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  // ---------------------------------------------------------------------------------------------
  // b03-l01
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'b03-l01',
    worldId: 'b03',
    title: 'JSON itu formulir isian',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membaca label dan isian di formulir JSON.',
      'Kamu bisa membaca struktur JSON dan menyebutkan 6 tipe nilainya.',
    ),
    estMinutes: 5,
    introducesTerms: ['json'],
    usesTerms: ['api', 'request', 'response'],
    stickerId: 'formulir-json',
    atWork: 'Kamu akan membaca JSON seperti ini di tab Network DevTools saat layar aplikasi tampil kosong.',
    warmupFrom: 'b02-l06',
    steps: [
      storyStep('b03/formulir-json.svg', [
        rText(
          'Tamu dan dapur perlu formulir yang sama supaya saling mengerti. Setiap baris punya label dan isian, seperti formulir sekolah. Seperti apa isinya?',
          'Aplikasi Toko Rani meminta daftar produk, tetapi layarnya kosong. Kamu perlu membaca JSON (format teks untuk menulis data) di balasan server.',
        ),
      ]),
      conceptStep({
        title: t('Apa itu JSON?', 'JSON sebagai bahasa data'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'formulir-json' },
        alt: t(
          'Contoh formulir JSON berisi nama barang, harga, dan warna.',
          'Contoh JSON berisi id, nama, tersedia, diskon, warna, dan object toko.',
        ),
        code: {
          lang: 'json',
          code: '{\n  "id": 12,\n  "nama": "Tas Ransel Kulit",\n  "tersedia": true,\n  "diskon": null,\n  "warna": ["hitam", "cokelat"],\n  "toko": {\n    "nama": "Toko Rani",\n    "kota": "Makassar"\n  }\n}',
          highlight: [2, 3, 6],
        },
        body: [
          rTerm('json', 'JSON', 'JSON'),
          rText(
            ' adalah cara menulis data seperti mengisi formulir. Label di kiri disebut key. Isian di kanan disebut value.',
            ' (JavaScript Object Notation) adalah teks ringan berisi pasangan key dan value. Manusia dan mesin sama-sama bisa membacanya.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b03-l01-q1',
          type: 'analogy',
          prompt: t(
            'Di formulir isian, "nama" ditulis di sebelah kiri. Itu bagian apa?',
            'Pada formulir isian, label di sebelah kiri seperti "nama" atau "harga" disebut apa?',
          ),
          choices: [
            { id: 'k', label: t('Label (key)', 'Key (kunci)') },
            {
              id: 'v',
              label: t('Isian (value)', 'Value (isian)'),
              explainWrong: t(
                'Isian ada di sisi kanan. Label ada di sisi kiri.',
                'Value adalah isian di sisi kanan titik dua. Key ada di sisi kirinya.',
              ),
            },
            {
              id: 'c',
              label: t('Judul formulir', 'Array (daftar)'),
              explainWrong: t(
                'Judul ada di atas formulir. Label ada di tiap baris.',
                'Array adalah daftar dalam kurung siku. Ia bukan nama kolom.',
              ),
            },
          ],
          answer: 'k',
          explainCorrect: t(
            'Label di kiri disebut key. Seperti kolom "Nama" di formulir sekolah.',
            'Setiap baris JSON adalah pasangan key (label) dan value (isian).',
          ),
          hints: [t('Lihat sisi kiri formulir isian.', 'Key ada di sisi kiri titik dua.')],
          tags: ['json'],
        }),
      ),
      conceptStep({
        title: t('Enam jenis isian', 'Tipe nilai di JSON'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'nilai-json' },
        alt: t(
          'Jenis isian: teks, angka, ya atau tidak, kosong, daftar, dan formulir kecil.',
          'Enam tipe nilai JSON: string, number, boolean, null, array, dan object.',
        ),
        body: [
          rJunior(
            'Isian bisa teks, angka, ya atau tidak, atau kosong. Daftar ditulis dalam kurung siku, formulir kecil dalam kurung kurawal. Formulir kecil boleh ada di dalam formulir besar.',
          ),
          rPro('JSON mendukung 6 tipe nilai: number ('),
          rCode('12', ['pro']),
          rPro('), string ('),
          rCode('"Tas"', ['pro']),
          rPro('), boolean ('),
          rCode('true', ['pro']),
          rPro(' atau '),
          rCode('false', ['pro']),
          rPro('), null (kosong), array ('),
          rCode('[...]', ['pro']),
          rPro('), dan object ('),
          rCode('{...}', ['pro']),
          rPro(').'),
        ],
      }),
      conceptStep({
        title: t('Array dan object bersarang'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'objek-bersarang' },
        alt: t('Array warna dalam kurung siku dan object toko dalam kurung kurawal di dalam JSON.'),
        modes: ['pro'],
        body: [
          rPro(
            'Sebuah key boleh berisi array atau object lain di dalamnya. Struktur ini disebut bersarang. Contohnya kolom "Data Toko" di dalam formulir besar.',
          ),
        ],
      }),
      simStep(
        'dokter-json',
        t(
          'Ketuk bagian formulir yang bermasalah di simulator Dokter JSON.',
          'Amati kurung kurawal dan pasangan key dan value di simulator Dokter JSON.',
        ),
      ),
      limitStep({
        analogy: t('JSON seperti formulir isian di kertas'),
        same: [t('Setiap baris punya label di kiri dan isian di kanan.')],
        different: [
          t(
            'Formulir kertas boleh dicoret bebas. JSON ketat soal kutip, kurung, dan koma.',
          ),
        ],
        riskyAnalogy: false,
      }),
      qStep({
        id: 'b03-l01-q2',
        type: 'match',
        prompt: t('Pasangkan isian dengan jenisnya.', 'Pasangkan contoh isi JSON dengan tipe nilainya.'),
        difficulty: 2,
        left: [
          { id: 's', label: t('Tas Ransel', '"Tas Ransel"') },
          { id: 'n', label: t('12', '12') },
          { id: 'b', label: t('Ya', 'true') },
          { id: 'a', label: t('Hitam dan cokelat', '["hitam", "cokelat"]') },
        ],
        right: [
          { id: 't_b', label: t('Dua kemungkinan', 'Boolean (benar atau salah)') },
          { id: 't_a', label: t('Daftar', 'Array (daftar)') },
          { id: 't_s', label: t('Teks', 'String (teks)') },
          { id: 't_n', label: t('Angka', 'Number (angka)') },
        ],
        answer: { s: 't_s', n: 't_n', b: 't_b', a: 't_a' },
        explainCorrect: t(
          'Isian bisa berupa kata, bilangan, atau daftar. Untuk jawaban dua kemungkinan, pilih ya atau tidak.',
          'Teks memakai kutip ganda, angka dan boolean tanpa kutip, dan array memakai kurung siku.',
        ),
        hints: [t('Bedakan nama barang dari jumlahnya.', 'Hanya string yang dibungkus kutip ganda.'), undefined],
        tags: ['json'],
      }),
      qStep(
        makeTf({
          id: 'b03-l01-q3',
          prompt: t(
            'Kolom toko bisa menyimpan nama toko dan kota sekaligus.',
            'Sebuah object JSON boleh berisi object lain di dalamnya.',
          ),
          answer: true,
          explainCorrect: t(
            'Isian boleh berupa formulir kecil. Contohnya kolom "toko" berisi nama dan kota.',
            'Isi key "toko" berupa object lain dengan key "nama" dan "kota".',
          ),
          explainWrong: t(
            'JSON justru sering memakai formulir kecil di dalam formulir besar. Itu cara mengelompokkan isian.',
            'JSON sering memakai object bersarang untuk mengelompokkan data yang berkaitan.',
          ),
          hints: [t('Ingat kolom toko di formulir tadi.', 'Lihat key "toko" di contoh JSON.')],
          tags: ['json'],
        }),
      ),
      qStep({
        id: 'b03-l01-q4',
        type: 'hotspot',
        modes: ['pro'],
        prompt: t('Ketuk baris JSON yang menyimpan daftar beberapa pilihan (tipe array).'),
        difficulty: 1,
        image: 'b03-hotspot',
        regions: [
          { id: 'r1', shape: 'rect', coords: [10, 10, 260, 45], label: '"id": 12' },
          { id: 'r2', shape: 'rect', coords: [10, 55, 260, 90], label: '"warna": ["hitam", "cokelat"]' },
          { id: 'r3', shape: 'rect', coords: [10, 100, 260, 135], label: '"tersedia": true' },
        ],
        answer: 'r2',
        explainCorrect: t('Kurung siku [...] menandai tipe array (daftar).'),
        explainIncorrect: {
          r1: t('12 tanpa kurung siku adalah tipe number (angka).'),
          r3: t('true adalah tipe boolean (benar atau salah).'),
        },
        hints: [t('Cari baris yang isinya berderet dalam kurung siku.'), undefined],
        tags: ['json'],
      }),
      qStep(
        makeMcq({
          id: 'b03-l01-q5',
          type: 'limit',
          modes: ['pro'],
          analogy: t('JSON seperti formulir pendaftaran kertas'),
          prompt: t('Satu tanda kutip hilang dari nama produk. Apa bedanya saat orang atau program membaca formulir itu?'),
          difficulty: 2,
          choices: [
            { id: 'strict', label: t('Orang masih bisa membaca isian, program gagal membaca JSON') },
            {
              id: 'pair',
              label: t('Orang dan program sama-sama bisa melengkapi tanda kutipnya'),
              explainWrong: t('Orang bisa menebak dari konteks. Pembaca JSON mengikuti tanda kutip yang ditulis.'),
            },
            {
              id: 'nest',
              label: t('Program melewati nama yang rusak dan membaca isian lainnya'),
              explainWrong: t('Satu tanda kutip yang hilang bisa membuat seluruh teks gagal dibaca.'),
            },
          ],
          answer: 'strict',
          explainCorrect: t(
            'Orang dapat menebak maksud isian. Program menolak JSON dengan tanda kutip yang hilang.',
          ),
          hints: [t('Bandingkan orang yang bisa menebak dengan program yang mengikuti aturan.')],
          tags: ['json'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b03-l01-q6',
          type: 'scenario',
          story: t(
            'Nadia mencatat buku yang ditulis 3 orang. Namanya Rani, Dimas, dan Sari.',
            'Nadia membuat JSON untuk buku dengan 3 penulis: "Rani", "Dimas", dan "Sari".',
          ),
          prompt: t('Isian penulis mana yang tepat?', 'Bagaimana cara menulis key "penulis" yang tepat?'),
          difficulty: 2,
          choices: [
            { id: 'arr', label: t('Satu daftar berisi 3 nama', '"penulis": ["Rani", "Dimas", "Sari"]') },
            {
              id: 'num',
              label: t('Satu angka, yaitu 3', '"penulis": 3'),
              explainWrong: t(
                'Angka 3 hanya memberi jumlah. Namanya tidak ikut tertulis.',
                'Angka 3 hanya menyimpan jumlah, bukan nama ketiga penulis.',
              ),
            },
            {
              id: 'nil',
              label: t('Satu isian yang kosong', '"penulis": null'),
              explainWrong: t(
                'Kosong berarti tidak ada penulis. Padahal ada 3 orang.',
                'null berarti kosong, padahal buku ini punya 3 penulis.',
              ),
            },
          ],
          answer: 'arr',
          explainCorrect: t(
            'Beberapa nama cocok ditulis dalam satu daftar. Seperti daftar nama di sampul buku.',
            'Beberapa nama cocok disimpan dalam array. Satu key menampung ketiganya.',
          ),
          hints: [t('Berapa nama yang harus tertulis?', 'Satu key perlu menampung 3 nama.')],
          tags: ['json'],
        }),
      ),
      qStep({
        id: 'b03-l01-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi JSON produk ini sesuai tipe nilainya.'),
        difficulty: 2,
        template: '{ "id": 12, "tersedia": ___, "diskon": ___, "warna": ___ }',
        bank: ['true', 'null', '["hitam"]', '// komentar'],
        answer: ['true', 'null', '["hitam"]'],
        explainCorrect: t('true adalah boolean, null berarti kosong, dan ["hitam"] adalah array.'),
        hints: [t('Cocokkan tipe: ya atau tidak, kosong, dan daftar.'), undefined],
        tags: ['json'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b03-l01-r1',
        modes: ['pro'],
        prompt: t('Nilai kosong yang resmi di JSON ditulis sebagai apa?'),
        choices: [
          { id: 'null', label: t('null') },
          {
            id: 'none',
            label: t('Dikosongkan tanpa nilai setelah titik dua'),
            explainWrong: t('JSON selalu butuh nilai setelah titik dua. Nilai kosongnya adalah null.'),
          },
          {
            id: 'zero',
            label: t('Angka 0'),
            explainWrong: t('Angka 0 adalah number, bukan kosong. Nilai kosong resmi di JSON adalah null.'),
          },
        ],
        answer: 'null',
        explainCorrect: t('null adalah nilai kosong yang sah di JSON.'),
        tags: ['json'],
      }),
      makeTf({
        id: 'b03-l01-r2',
        prompt: t(
          'Kurung kurawal membungkus satu formulir kecil berisi label dan isian.',
          'Tanda kurung kurawal { } di JSON membungkus sebuah object berisi pasangan key dan value.',
        ),
        answer: true,
        explainCorrect: t(
          'Kurung kurawal membungkus formulir kecil. Kurung siku membungkus daftar.',
          'Kurung kurawal menandai object, dan kurung siku [...] menandai array.',
        ),
        explainWrong: t(
          'Kurung kurawal memang membungkus formulir kecil berisi label dan isian.',
          'Kurung kurawal memang membungkus object di JSON.',
        ),
        hints: [t('Ingat formulir kecil di dalam formulir besar.', 'Bedakan kurung kurawal dan kurung siku.')],
        tags: ['json'],
      }),
      makeMcq({
        id: 'b03-l01-r3',
        modes: ['junior'],
        prompt: t('Rani menulis daftar belanja di JSON. Tanda apa yang membungkus daftar itu?'),
        choices: [
          { id: 'sq', label: t('Kurung siku') },
          {
            id: 'cu',
            label: t('Kurung kurawal'),
            explainWrong: t('Kurung kurawal membungkus formulir kecil, bukan daftar.'),
          },
          {
            id: 'qt',
            label: t('Tanda kutip'),
            explainWrong: t('Kutip membungkus teks. Daftar butuh kurung siku.'),
          },
        ],
        answer: 'sq',
        explainCorrect: t('Daftar dibungkus kurung siku. Seperti daftar belanja yang ditulis berderet.'),
        hints: [t('Ingat kartu tentang jenis isian.')],
        tags: ['json'],
      }),
    ],
    recap: t(
      'JSON adalah formulir teks berisi label dan isian.',
      'JSON menulis data sebagai pasangan key dan value. Ia punya 6 tipe nilai.',
    ),
    companion: {
      talkPrompts: ['Label apa yang kamu tulis di formulir tentang hewan favoritmu?'],
      offlineActivity:
        'Isi satu kertas kecil bergaya JSON tentang profil favoritmu: "nama", "umur", dan daftar "hobi" dalam tanda kurung siku [...].',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // b03-l02
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'b03-l02',
    worldId: 'b03',
    title: 'Aturan JSON yang sering salah',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menemukan kesalahan kutip, koma, dan catatan di JSON.',
      'Kamu bisa menyebutkan aturan ketat JSON dan fungsi header Content-Type.',
    ),
    estMinutes: 5,
    introducesTerms: [],
    usesTerms: ['json', 'header-body', 'status-code'],
    atWork: 'Saat form gagal terkirim, kamu akan mencari koma atau kutip yang salah di JSON-nya.',
    warmupFrom: 'b03-l01',
    steps: [
      storyStep('b03/aturan-json.svg', [
        rText(
          'Gudang JSON punya robot pemeriksa yang sangat teliti. Satu tanda salah membuat robot menolak seluruh kotak. Apa saja yang ia tolak?',
          'Form Toko Rani mengirim JSON, tetapi server menolaknya. Penyebabnya sering satu tanda baca yang salah.',
        ),
      ]),
      conceptStep({
        title: t('Tanpa koma akhir dan catatan', 'Tanpa trailing comma dan komentar'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'koma-akhir' },
        alt: t(
          'Koma setelah isian terakhir dan catatan kecil dilarang di JSON.',
          'Koma setelah item terakhir dan komentar // dilarang di JSON.',
        ),
        code: {
          lang: 'json',
          code: '{\n  "nama": "Tas",\n  "stok": 5,\n}',
          highlight: [3],
        },
        body: [
          rJunior('Robot menolak koma setelah isian terakhir. Robot juga menolak pesan tambahan seperti "ini tas baru".'),
          rPro('Koma setelah item terakhir (trailing comma) dilarang di JSON. Komentar seperti '),
          rCode('//', ['pro']),
          rPro(' dan '),
          rCode('/* ... */', ['pro']),
          rPro(' juga dilarang.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b03-l02-q2',
          prompt: t(
            'Baris isian terakhir di JSON ditulis dengan cara apa?',
            'Apa kesalahan utama dari { "nama": "Buku", "stok": 10, }?',
          ),
          choices: [
            {
              id: 'tc',
              label: t('Tanpa koma di ujungnya', 'Ada koma setelah item terakhir'),
            },
            {
              id: 'num',
              label: t('Dengan koma seperti baris lain', 'Angka 10 harus diberi kutip'),
              explainWrong: t(
                'Koma berarti masih ada isian berikutnya. Setelah baris terakhir tidak ada lagi.',
                'Angka memang ditulis tanpa kutip. Kesalahannya ada pada koma di ujung.',
              ),
            },
            {
              id: 'brace',
              label: t('Dengan titik di ujungnya', 'Object harus memakai kurung biasa'),
              explainWrong: t(
                'Titik dipakai di kalimat, bukan di JSON. Baris terakhir cukup berhenti saja.',
                'Object JSON memang memakai kurung kurawal. Kurung biasa bukan penyebabnya.',
              ),
            },
          ],
          answer: 'tc',
          explainCorrect: t(
            'Koma berarti masih ada isian lagi. Setelah isian terakhir, robot menunggu lalu menolak.',
            'Koma setelah item terakhir (trailing comma) membuat pembaca JSON gagal.',
          ),
          hints: [t('Ingat robot yang menunggu isian berikutnya.', 'Lihat ujung baris terakhir.')],
          tags: ['json'],
        }),
      ),
      conceptStep({
        title: t('Wajib kutip dua', 'Aturan tanda kutip'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'kutip-dua' },
        alt: t(
          'Label tanpa kutip dan kutip satu salah, kutip dua benar.',
          'Perbandingan key tanpa kutip dan kutip satu yang salah dengan kutip dua yang benar.',
        ),
        code: {
          lang: 'text',
          code: 'Salah: { nama: \'Tas\' }\nBenar: { "nama": "Tas" }',
          highlight: [2],
        },
        body: [
          rText(
            'Label dan teks di JSON wajib memakai kutip dua. Kutip satu ditolak robot.',
            'Key dan string di JSON wajib memakai kutip ganda ("). Key tanpa kutip atau string dengan kutip tunggal (\') langsung error.',
          ),
        ],
      }),
      qStep({
        id: 'b03-l02-q1',
        type: 'spotbug',
        modes: ['pro'],
        prompt: t('Ketuk DUA baris yang melanggar aturan JSON.'),
        difficulty: 2,
        lines: [
          '{',
          "  nama: 'Tas Kanvas',",
          '  "harga": 90000,',
          '  "stok": 5,',
          '}',
        ],
        answer: [2, 4],
        explainCorrect: t(
          'Baris 2 tidak memakai kutip ganda pada key dan string. Baris 4 punya koma setelah item terakhir.',
        ),
        hints: [
          t('Periksa tanda kutip di baris 2 dan koma setelah angka 5.'),
          t('Key dan string pakai kutip ganda, dan item terakhir tanpa koma.'),
        ],
        tags: ['json'],
      }),
      qStep(
        makeMcq({
          id: 'b03-l02-q1j',
          type: 'scenario',
          modes: ['junior'],
          story: t('Bito menulis label formulir dengan tanda kutip satu. Robot gudang menolaknya.'),
          prompt: t('Apa yang harus Bito ubah?'),
          choices: [
            { id: 'dq', label: t('Memakai tanda kutip dua') },
            {
              id: 'nq',
              label: t('Menghapus semua tanda kutip'),
              explainWrong: t('Label tanpa kutip juga ditolak. Robot hanya mau kutip dua.'),
            },
            {
              id: 'up',
              label: t('Menulis label dengan huruf besar'),
              explainWrong: t('Huruf besar atau kecil tidak jadi soal. Robot memeriksa tanda kutipnya.'),
            },
          ],
          answer: 'dq',
          explainCorrect: t('Robot hanya menerima kutip dua. Seperti pintu dengan satu kunci.'),
          hints: [t('Ingat jenis kutip yang robot terima.')],
          tags: ['json'],
        }),
      ),
      conceptStep({
        title: t('Tanggal ISO dan Content-Type'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'tanggal-header' },
        alt: t('Tanggal ditulis sebagai string ISO, dan JSON dikirim dengan Content-Type: application/json.'),
        modes: ['pro'],
        body: [
          rPro('JSON tidak punya tipe tanggal, jadi tanggal ditulis sebagai string ISO, misalnya '),
          rCode('"2026-11-22T19:48:00+08:00"', ['pro']),
          rPro('. Kirim JSON dengan header '),
          rCode('Content-Type: application/json', ['pro']),
          rPro('. Tanpa header itu, server sering membalas 400 atau 415.'),
        ],
      }),
      simStep(
        'dokter-json',
        t(
          'Ketuk dua baris formulir yang sakit untuk menyembuhkannya.',
          'Perbaiki kutip tunggal dan koma terakhir di simulator Dokter JSON.',
        ),
      ),
      limitStep({
        analogy: t('JSON mirip object JavaScript'),
        same: [t('Keduanya memakai kurung kurawal untuk object dan kurung siku untuk array.')],
        different: [
          t(
            'Di JavaScript, kutip satu, key tanpa kutip, koma akhir, dan komentar boleh. Di JSON semuanya dilarang.',
          ),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeTf({
          id: 'b03-l02-q3',
          prompt: t(
            'Kamu boleh menulis catatan kecil di tengah JSON.',
            'Komentar // harga diskon boleh ditulis di file JSON sebagai pengingat.',
          ),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru. Robot menolak catatan karena JSON hanya berisi data.',
            'Pernyataan itu keliru: standar JSON tidak mengizinkan komentar, baik // maupun /* */.',
          ),
          explainWrong: t(
            'JSON hanya menerima isian. Catatan kecil langsung membuat robot menolak.',
            'File JSON menganggap komentar sebagai error sintaks. Simpan catatan di dokumentasi.',
          ),
          hints: [t('Ingat robot yang sangat teliti.', 'Ingat apa saja isi sebuah file JSON.')],
          tags: ['json'],
        }),
      ),
      qStep({
        id: 'b03-l02-q4',
        type: 'sort',
        prompt: t(
          'Kelompokkan isian ini ke kotak Diterima atau Ditolak.',
          'Kelompokkan potongan ini ke JSON sah atau JSON salah.',
        ),
        difficulty: 2,
        items: [
          { id: 'ok1', label: t('Label memakai kutip dua', '{"kota": "Makassar"}') },
          { id: 'bad1', label: t('Label memakai kutip satu', "{'kota': 'Makassar'}") },
          { id: 'ok2', label: t('Isian terakhir tanpa koma', '{"tanggal": "2026-11-22"}') },
          { id: 'bad2', label: t('Catatan kecil di tengah', '{kota: "Makassar",}') },
        ],
        bins: [
          { id: 'sah', label: t('Diterima', 'JSON sah'), icon: 'package' },
          { id: 'salah', label: t('Ditolak', 'JSON salah'), icon: 'lock' },
        ],
        answer: { ok1: 'sah', bad1: 'salah', ok2: 'sah', bad2: 'salah' },
        explainCorrect: t(
          'Robot menerima kutip dua dan akhir tanpa koma. Kutip satu dan catatan kecil ditolak.',
          'JSON sah hanya memakai kutip ganda pada key dan string, dan tanpa koma akhir.',
        ),
        hints: [t('Ingat robot pemeriksa yang sangat teliti.', 'Cari kutip satu, key tanpa kutip, dan koma akhir.'), undefined],
        tags: ['json'],
      }),
      qStep(
        makeMcq({
          id: 'b03-l02-q5',
          type: 'limit',
          modes: ['pro'],
          analogy: t('JSON terlihat seperti object JavaScript'),
          prompt: t('Kesalahan apa yang paling sering muncul karena mengira JSON sama dengan object JavaScript?'),
          difficulty: 2,
          choices: [
            { id: 'js', label: t('Kutip satu, key tanpa kutip, atau koma akhir') },
            {
              id: 'arr',
              label: t('Memakai kurung siku untuk menulis sebuah daftar'),
              explainWrong: t('Itu kesamaannya: JavaScript juga memakai kurung siku untuk array.'),
            },
            {
              id: 'num',
              label: t('Menulis angka tanpa memberi tanda kutip'),
              explainWrong: t('Angka tanpa kutip sah di JavaScript dan di JSON.'),
            },
          ],
          answer: 'js',
          explainCorrect: t('JavaScript menerima kutip satu, key tanpa kutip, dan koma akhir. JSON menolak ketiganya.'),
          hints: [t('Cari yang diterima JavaScript tetapi ditolak JSON.')],
          tags: ['json'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b03-l02-q6',
          type: 'scenario',
          modes: ['pro'],
          story: t(
            'Bito menulis JSON yang rapi dan mengirimnya ke POST /produk tanpa header Content-Type: application/json. Server membalas error 400.',
          ),
          prompt: t('Mengapa server menolak JSON Bito?'),
          difficulty: 3,
          choices: [
            { id: 'hdr', label: t('Server tidak tahu bahwa body-nya berformat JSON') },
            {
              id: 'date',
              label: t('Metode POST tidak boleh membawa body berformat JSON'),
              explainWrong: t('POST justru biasa dipakai untuk mengirim isi berformat JSON.'),
            },
            {
              id: 'size',
              label: t('Body JSON harus dikirim lewat URL'),
              explainWrong: t('Isi kiriman ini masuk ke body. URL menunjukkan alamat tujuan.'),
            },
          ],
          answer: 'hdr',
          explainCorrect: t(
            'Tanpa Content-Type: application/json, server tidak tahu harus memakai pembaca JSON. Body yang valid pun sering ditolak.',
          ),
          hints: [t('Body-nya valid. Periksa keterangan yang menyertainya.')],
          tags: ['json', 'header-body', 'status-code'],
        }),
      ),
      qStep({
        id: 'b03-l02-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Ketik nilai header Content-Type untuk mengirim JSON.'),
        difficulty: 2,
        accept: ['application/json'],
        explainCorrect: t('Header lengkapnya adalah Content-Type: application/json.'),
        hints: [t('Formatnya jenis/subjenis, dan subjenisnya json.'), undefined],
        tags: ['json', 'header-body'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b03-l02-r1',
        prompt: t(
          'Seseorang menulis pesan "ini tas baru" di luar isian. Bagaimana reaksi robot?',
          'Bolehkah komentar // ada di dalam JSON?',
        ),
        choices: [
          { id: 'no', label: t('Robot menolak formulir itu', 'Tidak boleh, parser melaporkan error') },
          {
            id: 'yes',
            label: t('Robot membaca catatan itu', 'Boleh kapan saja, seperti di JavaScript'),
            explainWrong: t(
              'JSON tidak punya tempat untuk catatan. Robot menolak seluruh formulir.',
              'Standar JSON melarang komentar. JavaScript dan beberapa format lain mengizinkannya.',
            ),
          },
          {
            id: 'del',
            label: t('Robot menghapus catatannya saja', 'Boleh, parser akan mengabaikannya'),
            explainWrong: t(
              'Robot tidak membetulkan apa pun sendiri. Ia menolak seluruh formulir.',
              'Parser tidak mengabaikan komentar. Ia melaporkan error sintaks.',
            ),
          },
        ],
        answer: 'no',
        explainCorrect: t(
          'JSON hanya berisi data. Satu catatan kecil membuat robot menolak formulirnya.',
          'Standar JSON tidak mendukung komentar, supaya formatnya murni data.',
        ),
        hints: [t('Ingat robot yang sangat teliti.')],
        tags: ['json'],
      }),
      makeMcq({
        id: 'b03-l02-r2',
        modes: ['pro'],
        prompt: t('Bentuk apa yang dipakai JSON untuk menulis tanggal?'),
        choices: [
          { id: 'str', label: t('String, misalnya format ISO "2026-11-22"') },
          {
            id: 'raw',
            label: t('Teks tanpa kutip, seperti 2026-11-22'),
            explainWrong: t('Tanpa kutip, 2026-11-22 tidak sah di JSON.'),
          },
          {
            id: 'obj',
            label: t('Object Date, seperti new Date()'),
            explainWrong: t('JSON tidak mengenal object Date. Tulis tanggal sebagai string.'),
          },
        ],
        answer: 'str',
        explainCorrect: t('JSON tidak punya tipe tanggal, jadi tanggal ditulis sebagai teks.'),
        tags: ['json'],
      }),
      makeMcq({
        id: 'b03-l02-r3',
        modes: ['junior'],
        prompt: t('Robot gudang hanya mau menerima label dengan tanda apa?'),
        choices: [
          { id: 'dq', label: t('Tanda kutip dua') },
          {
            id: 'sq',
            label: t('Tanda kutip satu'),
            explainWrong: t('Kutip satu ditolak robot. Ia hanya mau kutip dua.'),
          },
          {
            id: 'cm',
            label: t('Tanda koma'),
            explainWrong: t('Koma memisahkan isian. Label tetap perlu kutip dua.'),
          },
        ],
        answer: 'dq',
        explainCorrect: t('Label wajib memakai kutip dua. Kutip satu dan tanpa kutip ditolak.'),
        hints: [t('Ingat pintu yang hanya terbuka untuk satu kunci.')],
        tags: ['json'],
      }),
    ],
    recap: t(
      'JSON hanya menerima kutip dua, tanpa koma akhir, dan tanpa catatan.',
      'JSON wajib berkutip ganda, tanpa koma akhir dan komentar. Kirim dengan Content-Type: application/json.',
    ),
    companion: {
      talkPrompts: ['Mengapa robot pembaca JSON sangat teliti soal satu koma?'],
      offlineActivity:
        'Tulis satu kartu JSON di kertas dengan 1 kesalahan sengaja (misal kutip satu atau koma terakhir), lalu minta partnermu jadi "Dokter JSON" untuk menemukannya.',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // b03-l03
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'b03-l03',
    worldId: 'b03',
    title: 'Serialisasi: pindahan rumah',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menjelaskan cara mengemas data menjadi teks, lalu merakitnya lagi.',
      'Kamu bisa menjelaskan serialisasi dengan JSON.stringify dan deserialisasi dengan JSON.parse.',
    ),
    estMinutes: 6,
    introducesTerms: ['serialisasi'],
    usesTerms: ['json', 'javascript', 'browser', 'server'],
    stickerId: 'pindahan-lemari',
    atWork: 'Kamu akan memanggil JSON.stringify sebelum mengirim form, dan JSON.parse saat membaca balasan API.',
    warmupFrom: 'b03-l02',
    steps: [
      storyStep('b03/pindahan-lemari.svg', [
        rText(
          'Lemari besar tidak muat lewat pintu rumah baru. Kamu membongkarnya menjadi papan, lalu merakitnya di sana. Bagaimana data dikirim ke tempat jauh?',
          'Form Toko Rani harus mengirim object produk ke server. Tetapi object di memori tidak bisa langsung lewat jaringan.',
        ),
      ]),
      conceptStep({
        title: t('Mengemas data untuk dikirim', 'Apa itu serialisasi?'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b03', topic: 'serialisasi-kirim' },
        alt: t(
          'Data pengirim dikemas jadi teks, lalu dirakit lagi di penerima.',
          'Object pengirim diubah jadi teks JSON di jaringan, lalu kembali jadi object penerima.',
        ),
        body: [
          rTerm('serialisasi', 'Serialisasi', 'Serialisasi'),
          rText(
            ' artinya mengemas data menjadi teks. Teks itu muat lewat kabel internet. Di tujuan, teks dirakit lagi.',
            ' adalah proses mengubah object di memori menjadi teks agar bisa dikirim atau disimpan. Proses kebalikannya disebut deserialisasi.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b03-l03-q1',
          type: 'analogy',
          prompt: t(
            'Lemari dibongkar menjadi papan sebelum naik truk. Di dunia data, itu namanya apa?',
            'Di cerita pindahan, membongkar lemari menjadi papan sebelum naik truk disebut apa?',
          ),
          choices: [
            { id: 'ser', label: t('Mengemas data menjadi teks', 'Serialisasi (JSON.stringify)') },
            {
              id: 'des',
              label: t('Merakit teks menjadi data lagi', 'Deserialisasi (JSON.parse)'),
              explainWrong: t(
                'Merakit lemari terjadi di rumah baru. Membongkar terjadi di rumah lama.',
                'Deserialisasi adalah merakit ulang di tujuan, bukan membongkar di asal.',
              ),
            },
            {
              id: 'del',
              label: t('Membuang data yang lama', 'Menghapus data (DELETE)'),
              explainWrong: t(
                'Lemari tidak dibuang. Ia dikemas untuk dikirim.',
                'Lemari tidak dibuang. Ia dikemas untuk dikirim, bukan dihapus.',
              ),
            },
          ],
          answer: 'ser',
          explainCorrect: t(
            'Mengemas data menjadi teks namanya serialisasi. Seperti membongkar lemari menjadi papan.',
            'Serialisasi mengubah struktur data menjadi teks yang siap dikirim.',
          ),
          hints: [t('Ingat papan datar di dalam kardus.', 'Cari proses yang terjadi di sisi pengirim.')],
          tags: ['serialisasi'],
        }),
      ),
      conceptStep({
        title: t('Kemas dan rakit', 'Mengemas: JSON.stringify()'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'stringify' },
        alt: t(
          'Pengirim mengemas data, penerima merakitnya lagi.',
          'JSON.stringify mengubah object produk menjadi string JSON.',
        ),
        code: {
          lang: 'js',
          code: 'const produk = { nama: "Tas", harga: 90000 };\nconst teks = JSON.stringify(produk);\n// Hasil: \'{"nama":"Tas","harga":90000}\'',
          highlight: [2],
        },
        body: [
          rJunior(
            'Pengirim mengemas data menjadi teks. Penerima membuka kemasannya agar bisa memakai data itu.',
          ),
          rPro('Perintah '),
          rCode('JSON.stringify()', ['pro']),
          rPro(' mengubah object JavaScript menjadi satu baris teks JSON. Teks itu siap dikirim sebagai isi request.'),
        ],
      }),
      conceptStep({
        title: t('Membongkar: JSON.parse()'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'parse' },
        alt: t('JSON.parse mengubah teks JSON menjadi object JavaScript yang siap dipakai.'),
        modes: ['pro'],
        code: {
          lang: 'js',
          code: 'const balik = JSON.parse(teks);\nconsole.log(balik.nama); // "Tas"',
          highlight: [1],
        },
        body: [
          rPro('Di sisi penerima, '),
          rCode('JSON.parse()', ['pro']),
          rPro(' mengubah teks JSON kembali menjadi object JavaScript. Karena itu properti seperti '),
          rCode('balik.nama', ['pro']),
          rPro(' bisa langsung dibaca.'),
        ],
      }),
      simStep(
        'dokter-json',
        t(
          'Sembuhkan formulir di simulator supaya robot bisa merakitnya.',
          'Sembuhkan JSON di simulator sampai JSON.parse() berhasil dijalankan.',
        ),
      ),
      limitStep({
        analogy: t('Serialisasi seperti membongkar lemari saat pindahan'),
        same: [
          t(
            'Data dibongkar menjadi paket, lalu dirakit lagi.',
            'Data besar dikemas menjadi paket rapi, lalu dirakit lagi menjadi bentuk semula.',
          ),
        ],
        different: [
          t(
            'Lemari asli ikut pindah. Data asli tetap di tempatnya.',
            'Lemari berpindah, tetapi serialisasi hanya mengirim salinan. Fungsi di dalam object tidak ikut terkirim.',
          ),
        ],
        riskyAnalogy: true,
      }),
      qStep({
        id: 'b03-l03-q2',
        type: 'order',
        prompt: t(
          'Urutkan perjalanan data dari pengirim sampai penerima.',
          'Urutkan perjalanan object produk dari komputer pengirim sampai bisa dibaca penerima.',
        ),
        difficulty: 2,
        items: [
          {
            id: 's3',
            label: t(
              'Penerima merakit teks menjadi data lagi',
              'Penerima menjalankan JSON.parse() untuk mengubahnya kembali menjadi object',
            ),
          },
          {
            id: 's1',
            label: t(
              'Pengirim mengemas data menjadi teks',
              'Program pengirim menjalankan JSON.stringify() menjadi teks JSON',
            ),
          },
          {
            id: 's4',
            label: t('Penerima membaca data di layar', 'Penerima membaca nilai produk.nama di layar'),
          },
          {
            id: 's2',
            label: t('Teks dikirim lewat internet', 'Teks JSON dikirim melewati jaringan internet'),
          },
        ],
        answer: ['s1', 's2', 's3', 's4'],
        explainCorrect: t(
          'Data dikemas, dikirim, dirakit, lalu dibaca. Seperti lemari yang dibongkar lalu dirakit lagi.',
          'Object diubah dengan stringify, dikirim lewat jaringan, diubah kembali dengan parse, lalu dibaca.',
        ),
        hints: [t('Ingat urutan bongkar, angkut, rakit.', 'Teks harus ada sebelum dikirim, dan object ada setelah parse.'), undefined],
        tags: ['serialisasi', 'json'],
      }),
      qStep(
        makeMcq({
          id: 'b03-l03-q3',
          prompt: t(
            'Teks dari pengirim tiba di tujuan. Apa yang penerima lakukan dulu?',
            'Fungsi JavaScript apa yang mengubah teks JSON kembali menjadi object?',
          ),
          choices: [
            { id: 'parse', label: t('Merakit teks menjadi data lagi', 'JSON.parse()') },
            {
              id: 'str',
              label: t('Mengemas teks sekali lagi', 'JSON.stringify()'),
              explainWrong: t(
                'Teks itu sudah dikemas. Ia perlu dirakit, bukan dikemas lagi.',
                'JSON.stringify() bekerja ke arah sebaliknya: object menjadi teks.',
              ),
            },
            {
              id: 'alert',
              label: t('Membaca teks langsung apa adanya', 'JSON.decode()'),
              explainWrong: t(
                'Teks belum bisa dipakai apa adanya. Ia harus dirakit dulu.',
                'JavaScript tidak punya JSON.decode(). Nama fungsinya parse.',
              ),
            },
          ],
          answer: 'parse',
          explainCorrect: t(
            'Penerima harus merakit teks menjadi data. Seperti merakit papan menjadi lemari.',
            'JSON.parse() melakukan deserialisasi, yaitu mengubah teks menjadi object.',
          ),
          hints: [t('Ingat apa yang kamu lakukan di rumah baru.')],
          tags: ['serialisasi', 'javascript'],
        }),
      ),
      qStep(
        makeTf({
          id: 'b03-l03-q4',
          modes: ['pro'],
          prompt: t('JSON.parse() pada teks yang berakhir dengan koma akan menimbulkan error.'),
          answer: true,
          explainCorrect: t('JSON.parse() ketat dan hanya menerima teks JSON yang sah.'),
          explainWrong: t('Satu koma akhir atau kutip satu langsung membuat JSON.parse() melempar error.'),
          hints: [t('Ingat aturan JSON tentang koma di item terakhir.')],
          tags: ['serialisasi', 'json'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b03-l03-q5j',
          type: 'limit',
          modes: ['junior'],
          analogy: t('Serialisasi seperti membongkar lemari'),
          prompt: t('Lemari ikut pindah rumah. Apa yang terjadi pada data asli saat dikirim?'),
          difficulty: 2,
          choices: [
            { id: 'copy', label: t('Data asli tetap ada di pengirim') },
            {
              id: 'gone',
              label: t('Data asli hilang dari pengirim'),
              explainWrong: t('Pengirim hanya mengirim salinan. Datanya tidak hilang.'),
            },
            {
              id: 'move',
              label: t('Data asli pindah ke penerima'),
              explainWrong: t('Yang tiba di penerima adalah salinan. Data asli tidak berpindah.'),
            },
          ],
          answer: 'copy',
          explainCorrect: t('Yang dikirim hanya salinan. Data asli tetap ada.'),
          hints: [t('Bandingkan lemari yang pindah dengan data yang dikirim.')],
          tags: ['serialisasi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b03-l03-q5',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Serialisasi dan deserialisasi seperti pindahan lemari'),
          prompt: t('Apa yang TIDAK ikut terbawa saat JSON.stringify() mengemas sebuah object JavaScript?'),
          difficulty: 2,
          choices: [
            { id: 'fn', label: t('Fungsi di dalam object dan nilai undefined') },
            {
              id: 'str',
              label: t('Teks nama dan harga angka'),
              explainWrong: t('Teks dan angka justru menjadi isi utama JSON.'),
            },
            {
              id: 'arr',
              label: t('Daftar array warna produk'),
              explainWrong: t('Array ikut dikemas dengan rapi ke JSON.'),
            },
          ],
          answer: 'fn',
          explainCorrect: t('JSON menerima teks, angka, dan tipe data lain. Saat memproses properti objek, stringify melewati fungsi dan undefined.'),
          hints: [t('Cari bagian object yang bukan data murni.')],
          tags: ['serialisasi', 'javascript'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b03-l03-q6',
          type: 'scenario',
          story: t(
            'Bito menerima papan-papan lemari dalam kardus. Ia langsung mencari pintu lemari, tetapi tidak ketemu.',
            'Bito menerima teks JSON \'{"nama":"Topi","harga":45000}\' dari server dan langsung menulis teks.nama. Hasilnya undefined.',
          ),
          prompt: t('Langkah apa yang Bito lewatkan?', 'Langkah apa yang terlewat oleh Bito?'),
          difficulty: 2,
          choices: [
            {
              id: 'prs',
              label: t('Merakit papan-papan itu lebih dulu', 'Menjalankan JSON.parse(teks) lebih dulu'),
            },
            {
              id: 'str',
              label: t('Mengemas papan sekali lagi', 'Menjalankan JSON.stringify(teks) lagi'),
              explainWrong: t(
                'Papan sudah terkemas. Yang belum dilakukan adalah merakitnya.',
                'JSON.stringify() mengubah object menjadi teks. Teks ini perlu di-parse, bukan di-stringify lagi.',
              ),
            },
            {
              id: 'css',
              label: t('Mengecat semua papan itu dengan rapi', 'Menulis teks["nama"] sebagai ganti teks.nama'),
              explainWrong: t(
                'Cat tidak membuat pintu muncul. Papan harus dirakit dulu.',
                'Itu hanya mengganti cara menulis. Teks tetap berupa string, jadi hasilnya tetap undefined.',
              ),
            },
          ],
          answer: 'prs',
          explainCorrect: t(
            'Papan harus dirakit dulu. Baru pintu lemari bisa dipakai.',
            'Teks JSON harus diproses JSON.parse() dulu. Setelah itu properti seperti .nama bisa dibaca.',
          ),
          hints: [t('Papan datar belum berbentuk lemari.', 'Teks.nama hanya bekerja pada object, bukan pada string.')],
          tags: ['serialisasi', 'javascript'],
        }),
      ),
      qStep({
        id: 'b03-l03-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi kode untuk mengemas dan merakit kembali data produk.'),
        difficulty: 2,
        template: 'const teks = ___(produk);\nconst balik = ___(teks);',
        bank: ['JSON.stringify', 'JSON.parse', 'console.log', 'Array.isArray'],
        answer: ['JSON.stringify', 'JSON.parse'],
        explainCorrect: t('JSON.stringify mengubah object menjadi teks. JSON.parse mengubah teks kembali menjadi object.'),
        hints: [t('Kemas dulu, lalu rakit.'), undefined],
        tags: ['serialisasi', 'javascript'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b03-l03-r1',
        prompt: t(
          'Mengemas data menjadi teks untuk dikirim. Apa namanya?',
          'Proses mengubah object di memori menjadi teks JSON siap kirim disebut apa?',
        ),
        choices: [
          { id: 'ser', label: t('Serialisasi') },
          {
            id: 'ren',
            label: t('Merakit teks menjadi data', 'Deserialisasi'),
            explainWrong: t(
              'Itu langkah di rumah baru. Mengemas terjadi di rumah lama.',
              'Deserialisasi merakit teks kembali menjadi object. Itu langkah di sisi penerima.',
            ),
          },
          {
            id: 'del',
            label: t('Menghapus data lama', 'Enkripsi'),
            explainWrong: t(
              'Data lama tidak dihapus. Data itu dikemas untuk dikirim.',
              'Enkripsi mengunci data. Serialisasi hanya mengubah bentuknya agar bisa dikirim.',
            ),
          },
        ],
        answer: 'ser',
        explainCorrect: t(
          'Mengemas data menjadi teks namanya serialisasi.',
          'Serialisasi mengubah struktur data menjadi teks agar bisa dikirim lewat internet.',
        ),
        hints: [t('Ingat membongkar lemari.')],
        tags: ['serialisasi'],
      }),
      makeMcq({
        id: 'b03-l03-r2',
        modes: ['pro'],
        prompt: t('Perintah apa yang mengubah object { nama: "Tas" } menjadi teks JSON?'),
        choices: [
          { id: 's', label: t('JSON.stringify()') },
          {
            id: 'p',
            label: t('JSON.parse()'),
            explainWrong: t('JSON.parse() bekerja ke arah sebaliknya: teks menjadi object.'),
          },
          {
            id: 'v',
            label: t('JSON.validate()'),
            explainWrong: t('JavaScript tidak punya JSON.validate(). Pengubah object menjadi teks adalah stringify.'),
          },
        ],
        answer: 's',
        explainCorrect: t('JSON.stringify() mengubah object menjadi string JSON.'),
        tags: ['serialisasi', 'json'],
      }),
      makeTf({
        id: 'b03-l03-r3',
        modes: ['junior'],
        prompt: t('Setelah dikirim, data asli di pengirim ikut hilang.'),
        answer: false,
        explainCorrect: t('Pernyataan itu keliru. Pengirim hanya mengirim salinan, jadi data asli tetap ada.'),
        explainWrong: t('Data asli tetap ada di pengirim. Yang dikirim hanya salinan teksnya.'),
        hints: [t('Pikirkan data di HP pengirim.')],
        tags: ['serialisasi'],
      }),
    ],
    recap: t(
      'Data dikemas menjadi teks, lalu dirakit lagi di tujuan.',
      'JSON.stringify mengubah object menjadi teks untuk dikirim. JSON.parse mengubah teks itu kembali menjadi object.',
    ),
    companion: {
      talkPrompts: ['Mengapa lemari rakitan dikirim dalam kardus berisi papan datar?'],
      offlineActivity:
        'Bongkar susunan mainan balok menjadi satuan balok di kantong plastik (serialisasi), pindahkan ke meja lain, lalu rakit lagi bentuk yang sama (deserialisasi).',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // b03-l04 (Pro)
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'b03-l04',
    worldId: 'b03',
    title: 'Format lain: XML, form-data, Protobuf',
    modes: ['pro'],
    objective: t('Kamu bisa membandingkan JSON dengan XML, form-data, dan Protobuf, lalu memilih yang cocok.'),
    estMinutes: 5,
    introducesTerms: ['protobuf'],
    usesTerms: ['json', 'serialisasi', 'header-body', 'browser', 'server'],
    atWork: 'Kamu akan memilih multipart/form-data saat membuat tombol unggah foto di form Toko Rani.',
    warmupFrom: 'b03-l03',
    steps: [
      storyStep('b03/format-lain.svg', [
        rText(
          'Toko Rani perlu mengunggah foto dan bertukar data dengan sistem bank lama. JSON bukan satu-satunya pilihan format.',
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
          rText(
            ' adalah format yang membungkus data dengan tag pembuka dan penutup. Tag adalah label seperti yang dipakai di HTML. Ukurannya lebih panjang, tetapi masih umum di bank dan sistem pemerintah. ',
          ),
          rBold('YAML'),
          rText(' memakai indentasi untuk konfigurasi, dan '),
          rBold('CSV'),
          rText(' adalah tabel yang dipisah koma.'),
        ],
      }),
      simStep(
        'dokter-json',
        t('Bandingkan keterbacaan teks JSON di simulator Dokter JSON dengan contoh XML tadi.'),
      ),
      conceptStep({
        title: t('Form data untuk unggah file'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'form-data' },
        alt: t('Perbedaan application/x-www-form-urlencoded dan multipart/form-data.'),
        body: [
          rText('Browser mengirim form dalam dua format. '),
          rCode('application/x-www-form-urlencoded'),
          rText(' cocok untuk teks pendek seperti '),
          rCode('nama=Tas&harga=90000'),
          rText('. Format '),
          rCode('multipart/form-data'),
          rText(' mengirim setiap file dan isian dalam bagian tersendiri.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b03-l04-q2',
          prompt: t('Pelanggan Toko Rani mengunggah foto bukti transfer dan PDF dari browser. Content-Type apa yang tepat?'),
          choices: [
            { id: 'mp', label: t('multipart/form-data') },
            {
              id: 'url',
              label: t('application/x-www-form-urlencoded'),
              explainWrong: t('x-www-form-urlencoded cocok untuk teks pendek, bukan file biner seperti foto atau PDF.'),
            },
            {
              id: 'csv',
              label: t('text/csv'),
              explainWrong: t('CSV untuk tabel teks. Pilih format yang mengirim foto atau PDF sebagai file.'),
            },
          ],
          answer: 'mp',
          explainCorrect: t('multipart/form-data memberi setiap file atau isian satu bagian di body.'),
          hints: [t('Cari format yang dirancang untuk file.')],
          tags: ['header-body', 'browser'],
        }),
      ),
      conceptStep({
        title: t('Protocol Buffers (Protobuf)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b03', topic: 'protobuf' },
        alt: t('Format biner Protobuf ringkas dan cepat, dipakai oleh gRPC.'),
        body: [
          rTerm('protobuf', 'Protocol Buffers (Protobuf)'),
          rText(' adalah format '),
          rBold('biner'),
          rText(' yang bisa membuat pesan lebih kecil. Membacanya perlu skema .proto dan alat pembaca. MessagePack juga memakai format biner. gRPC biasa memakai Protobuf untuk bertukar data antarlayanan.'),
        ],
      }),
      limitStep({
        analogy: t('JSON dan XML seperti surat tulisan tangan, Protobuf seperti sandi morse'),
        same: [t('JSON bisa dibaca seperti surat. Protobuf mengemas pesan seperti sandi morse.')],
        different: [
          t('Protobuf sulit dibaca langsung, tetapi kedua pihak tidak perlu menebak karena skema .proto menetapkan isinya.'),
        ],
        riskyAnalogy: false,
      }),
      qStep({
        id: 'b03-l04-q1',
        type: 'match',
        prompt: t('Pasangkan 4 format data dengan ciri atau kegunaannya.'),
        difficulty: 2,
        left: [
          { id: 'xml', label: t('XML') },
          { id: 'mp', label: t('multipart/form-data') },
          { id: 'pb', label: t('Protobuf') },
          { id: 'yml', label: t('YAML') },
        ],
        right: [
          { id: 'r_pb', label: t('Biner, kecil, dan cepat untuk gRPC') },
          { id: 'r_yml', label: t('Memakai indentasi, sering untuk konfigurasi') },
          { id: 'r_xml', label: t('Bertag seperti HTML, masih dipakai bank') },
          { id: 'r_mp', label: t('Mengunggah foto atau PDF per bagian') },
        ],
        answer: { xml: 'r_xml', mp: 'r_mp', pb: 'r_pb', yml: 'r_yml' },
        explainCorrect: t('XML bertag, multipart untuk file, Protobuf biner, dan YAML memakai indentasi. Setiap format punya tempat pakainya.'),
        hints: [t('Cocokkan ciri paling khas: tag, file, biner, indentasi.'), undefined],
        tags: ['protobuf', 'json'],
      }),
      qStep(
        makeTf({
          id: 'b03-l04-q3',
          prompt: t('Data Protobuf di jaringan bisa dibaca langsung oleh mata manusia tanpa skema .proto.'),
          answer: false,
          explainCorrect: t('Pernyataan itu keliru: Protobuf berformat biner, jadi pembacaannya butuh file skema .proto.'),
          explainWrong: t('Protobuf dikemas dalam biner ringkas, jadi manusia tidak bisa membacanya tanpa skema.'),
          tags: ['protobuf'],
        }),
      ),
      qStep({
        id: 'b03-l04-q4',
        type: 'sort',
        prompt: t('Kelompokkan format data ini ke format teks atau format biner.'),
        difficulty: 2,
        items: [
          { id: 'j', label: t('JSON') },
          { id: 'x', label: t('XML') },
          { id: 'p', label: t('Protobuf') },
          { id: 'm', label: t('MessagePack') },
        ],
        bins: [
          { id: 'txt', label: t('Format teks') },
          { id: 'bin', label: t('Format biner') },
        ],
        answer: { j: 'txt', x: 'txt', p: 'bin', m: 'bin' },
        explainCorrect: t('JSON dan XML berbasis teks yang bisa dibaca manusia. Protobuf dan MessagePack berbasis biner yang ringkas.'),
        hints: [t('Format biner tidak bisa dibuka dengan editor teks biasa.'), undefined],
        tags: ['protobuf', 'json'],
      }),
      qStep(
        makeMcq({
          id: 'b03-l04-q5',
          type: 'limit',
          analogy: t('Surat tulisan tangan melawan sandi morse ringkas'),
          prompt: t('Mengapa JSON praktis untuk API publik?'),
          difficulty: 3,
          choices: [
            { id: 'dbg', label: t('JSON bisa dibaca langsung dan didukung bawaan browser') },
            {
              id: 'slow',
              label: t('Protobuf hanya bisa dipakai oleh server Google'),
              explainWrong: t('Protobuf bersifat terbuka. Banyak organisasi memakainya sendiri atau melalui gRPC.'),
            },
            {
              id: 'sec',
              label: t('JSON lebih aman karena semua datanya terenkripsi otomatis'),
              explainWrong: t('JSON berupa teks polos. Keamanan pengiriman berasal dari HTTPS.'),
            },
          ],
          answer: 'dbg',
          explainCorrect: t('JSON dapat dibaca orang. Browser bisa mengolahnya tanpa pustaka tambahan.'),
          hints: [t('Pikirkan siapa yang membaca datanya: manusia atau mesin?')],
          tags: ['protobuf', 'json', 'browser'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b03-l04-q6',
          type: 'scenario',
          story: t('Dua server internal bertukar ratusan ribu pesan posisi kurir per menit dan butuh jeda sependek mungkin.'),
          prompt: t('Format apa yang paling menghemat ukuran pesan dan waktu proses?'),
          difficulty: 2,
          choices: [
            { id: 'pb', label: t('Protocol Buffers (Protobuf)') },
            {
              id: 'xml',
              label: t('XML dengan tag panjang'),
              explainWrong: t('XML berukuran paling besar dan lebih lambat diproses.'),
            },
            {
              id: 'url',
              label: t('application/x-www-form-urlencoded'),
              explainWrong: t('Format form tidak hemat untuk komunikasi antar server dalam jumlah besar.'),
            },
          ],
          answer: 'pb',
          explainCorrect: t('Protobuf berukuran kecil dan cepat diproses, jadi cocok untuk lalu lintas antar server.'),
          hints: [t('Cari format yang paling kecil dan cepat.')],
          tags: ['protobuf', 'server'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b03-l04-r1',
        prompt: t('Format apa yang bertag mirip HTML dan masih dipakai sistem bank lama?'),
        choices: [
          { id: 'xml', label: t('XML') },
          {
            id: 'pb',
            label: t('Protobuf'),
            explainWrong: t('Protobuf adalah format biner tanpa tag.'),
          },
          {
            id: 'yml',
            label: t('YAML'),
            explainWrong: t('YAML memakai indentasi, bukan tag pembuka dan penutup.'),
          },
        ],
        answer: 'xml',
        explainCorrect: t('XML membungkus data dengan tag pembuka dan penutup, seperti <nama>Tas</nama>.'),
        tags: ['protobuf'],
      }),
      makeTf({
        id: 'b03-l04-r2',
        prompt: t('Protobuf jauh lebih ringkas dan cepat daripada JSON, tetapi butuh skema untuk dibaca.'),
        answer: true,
        explainCorrect: t('Protobuf mengorbankan keterbacaan demi ukuran kecil dan kecepatan.'),
        explainWrong: t('Protobuf memang berformat biner, jadi manusia butuh file skema .proto untuk membacanya.'),
        tags: ['protobuf'],
      }),
    ],
    recap: t(
      'Selain JSON ada XML (bertag), multipart/form-data (unggah file), dan Protobuf (biner, cepat untuk layanan internal).',
    ),
  }),
];
