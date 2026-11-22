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
  id: 'a04',
  track: 'A',
  order: 4,
  title: 'Pabrik JavaScript',
  tagline: t(
    'Menyimpan nilai di kotak berlabel dan membuat tombol bereaksi.',
    'Memahami variabel, tipe data, percabangan/loop, fungsi, manipulasi DOM, event, dan fetch asinkron.',
  ),
  color: '#D99A00',
  illustration: 'a04-pabrik-js',
  sourceChapters: ['J1-05'],
  requires: ['a03'],
  lessons: ['a04-l01', 'a04-l02', 'a04-l03', 'a04-l04', 'a04-l05', 'a04-l06'],
  sideQuests: [],
  boss: {
    title: 'Tantangan Penjaga Pabrik JavaScript',
    greeting: t(
      'Selamat datang di Pabrik JavaScript! Ayo jalankan mesin logika dan tombol hidup!',
      'Uji kemampuanmu dalam dasar pemrograman JavaScript, DOM, event, dan operasi asinkron.',
    ),
    guardianName: 'Penjaga Pabrik JavaScript',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'a04-anc-j1',
        prompt: t('Kotak berlabel di JavaScript yang isinya TIDAK boleh diganti ulang memakai kata kunci…'),
        choices: [
          { id: 'const', label: t('const') },
          { id: 'let', label: t('let'), explainWrong: t('let dipakai untuk kotak yang nilainya boleh berubah.') },
          { id: 'div', label: t('div'), explainWrong: t('div adalah tag pembungkus HTML.') },
        ],
        answer: 'const',
        explainCorrect: t('const menjaga nilai variabel tetap dan aman dari perubahan tidak sengaja.'),
        tags: ['variabel'],
      }),
      makeAnchorMcq({
        id: 'a04-anc-j2',
        prompt: t('Tipe data untuk daftar berurutan seperti ["apel", "jeruk"] disebut…'),
        choices: [
          { id: 'arr', label: t('Array') },
          { id: 'num', label: t('Number'), explainWrong: t('Number adalah angka tunggal.') },
          { id: 'bool', label: t('Boolean'), explainWrong: t('Boolean hanya bernilai true atau false.') },
        ],
        answer: 'arr',
        explainCorrect: t('Array menyimpan daftar nilai dalam tanda kurung siku [ ].'),
        tags: ['tipe-data'],
      }),
      makeAnchorMcq({
        id: 'a04-anc-j3',
        prompt: t('Di mesin blender fungsi, buah yang kamu masukkan agar diolah menjadi jus adalah…'),
        choices: [
          { id: 'par', label: t('Parameter') },
          { id: 'margin', label: t('Margin'), explainWrong: t('Margin adalah jarak luar di CSS.') },
          { id: 'alt', label: t('Alt text'), explainWrong: t('alt deskripsi gambar di HTML.') },
        ],
        answer: 'par',
        explainCorrect: t('Parameter adalah bahan masukan untuk diproses fungsi.'),
        tags: ['fungsi'],
      }),
      makeAnchorMcq({
        id: 'a04-anc-j4',
        prompt: t('Tiga langkah yang dilakukan JavaScript agar tombol di halaman bereaksi saat diklik adalah…'),
        choices: [
          { id: 'dom', label: t('Cari elemen → dengarkan event → ubah tampilan') },
          { id: 'del', label: t('Hapus HTML → ubah DNS → matikan layar'), explainWrong: t('Urutan itu justru mematikan halaman.') },
          { id: 'css', label: t('Warnai latar → tulis alt → selesai'), explainWrong: t('Warna tanpa event listener tidak menanggapi klik.') },
        ],
        answer: 'dom',
        explainCorrect: t('querySelector mencari elemen, addEventListener mendengarkan klik, lalu konten diubah.'),
        tags: ['dom', 'event'],
      }),
      makeAnchorMcq({
        id: 'a04-anc-j5',
        prompt: t('Kalau kita ingin mengecek apakah stok lebih dari 0, kita memakai perintah…'),
        choices: [
          { id: 'if', label: t('Kondisi (if / else)') },
          { id: 'img', label: t('Gambar <img>'), explainWrong: t('<img> hanya menampilkan gambar.') },
          { id: 'flex', label: t('Flexbox'), explainWrong: t('Flexbox menata tata letak CSS.') },
        ],
        answer: 'if',
        explainCorrect: t('Percabangan if/else memutuskan jalan mana yang dijalankan berdasar syarat.'),
        tags: ['kondisi'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a04-anc-p1',
        prompt: t('Mana tipe data yang tepat untuk menyimpan satu profil lengkap berisi nama, harga, dan stok sekaligus?'),
        choices: [
          { id: 'obj', label: t('Object ({ nama: "Tas", harga: 90000 })') },
          { id: 'bool', label: t('Boolean') },
          { id: 'num', label: t('Number') },
        ],
        answer: 'obj',
        explainCorrect: t('Object mengelompokkan data berpasangan properti dan nilai dalam kurung kurawal.'),
        tags: ['tipe-data'],
      }),
      makeAnchorMcq({
        id: 'a04-anc-p2',
        prompt: t('Perbedaan utama fungsi yang memakai return dibanding yang hanya mencetak console.log adalah…'),
        choices: [
          { id: 'ret', label: t('return mengembalikan nilai hasil agar bisa disimpan dan diolah lagi oleh pemanggilnya') },
          { id: 'col', label: t('return mengubah warna layar jadi merah') },
          { id: 'loop', label: t('return menghentikan seluruh browser') },
        ],
        answer: 'ret',
        explainCorrect: t('Dengan return, hasil fungsi seperti hitungTotal(90000, 2) bisa dipakai untuk perhitungan berikutnya.'),
        tags: ['fungsi'],
      }),
      makeAnchorMcq({
        id: 'a04-anc-p3',
        prompt: t('Untuk menampilkan tulisan dari pengguna ke DOM secara aman tanpa risiko HTML/script dijalankan, gunakan…'),
        choices: [
          { id: 'tc', label: t('elemen.textContent = teks') },
          { id: 'ih', label: t('elemen.innerHTML = teks') },
          { id: 'ev', label: t('eval(teks)') },
        ],
        answer: 'tc',
        explainCorrect: t('textContent selalu memperlakukan masukan sebagai teks biasa, mencegah celah XSS.'),
        tags: ['dom'],
      }),
      makeAnchorMcq({
        id: 'a04-anc-p4',
        prompt: t('Mengapa mengambil data dari server memakai fetch selalu dikombinasikan dengan async/await?'),
        choices: [
          { id: 'as', label: t('Agar halaman tidak membeku sambil menunggu jawaban server tiba') },
          { id: 'css', label: t('Karena server hanya menerima file CSS') },
          { id: 'var', label: t('Karena let tidak mendukung fetch') },
        ],
        answer: 'as',
        explainCorrect: t('Operasi asinkron menjaga UI tetap merespons interaksi pengguna selama menunggu jaringan.'),
        tags: ['fetch'],
      }),
      makeAnchorMcq({
        id: 'a04-anc-p5',
        prompt: t('Metode array mana yang paling ringkas untuk menjalankan tugas bagi setiap item di dalam daftar?'),
        choices: [
          { id: 'fe', label: t('daftar.forEach(...)') },
          { id: 'qs', label: t('document.querySelector(...)') },
          { id: 'ret', label: t('return ...') },
        ],
        answer: 'fe',
        explainCorrect: t('forEach mengulang fungsi callback pada setiap elemen array secara berurutan.'),
        tags: ['kondisi'],
      }),
      makeAnchorMcq({
        id: 'a04-anc-p6',
        type: 'limit',
        analogy: t('const sebagai kotak yang tidak bisa diganti isinya'),
        prompt: t('Hal penting apa yang sering mengejutkan pemula tentang const pada Object/Array JavaScript?'),
        choices: [
          { id: 'mut', label: t('Label const tidak bisa diarahkan ke object baru, tetapi properti di dalam object-nya masih bisa diubah') },
          { id: 'num', label: t('Angka di dalam const otomatis bertambah sendiri') },
          { id: 'str', label: t('const hanya bisa menyimpan angka') },
        ],
        answer: 'mut',
        explainCorrect: t('const mengunci ikatan variabelnya; isi properti object atau item array masih dapat dimodifikasi.'),
        tags: ['variabel'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'a04-l01',
    worldId: 'a04',
    title: 'Variabel: kotak berlabel',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan kotak variabel let yang bisa diisi ulang dan const yang tetap.',
      'Aku bisa mendeklarasikan variabel menggunakan let dan const serta menjelaskan aturan batas const.',
    ),
    estMinutes: 5,
    introducesTerms: ['variabel'],
    usesTerms: ['javascript'],
    stickerId: 'kotak-berlabel',
    warmupFrom: 'a03-l05',
    steps: [
      storyStep('a04/kotak-berlabel.svg', [
        rText(
          'Di pabrik JavaScript, data disimpan dalam kotak berlabel nama supaya mudah dipanggil kapan saja.',
          'Variabel adalah kotak penyimpan nilai di memori yang diberi label nama agar program mudah membacanya dan mengolahnya.',
        ),
      ]),
      conceptStep({
        title: t('let vs const', 'Dua Cara Membuat Variabel'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'variabel-let-const' },
        alt: t('Kotak let yang bisa ditukar isinya vs kotak const yang terkunci.'),
        code: {
          lang: 'js',
          code: 'let jumlah = 3;\nconst namaToko = "Toko Rani";\njumlah = 4; // boleh!',
        },
        body: [
          rTerm('variabel', 'Variabel', 'Variabel'),
          rText(' memakai '),
          rCode('let'),
          rText(' jika nilainya boleh diganti, dan '),
          rCode('const'),
          rText(' jika tetap.'),
        ],
      }),
      conceptStep({
        title: t('Pilih const Dulu', 'Aturan Praktis Memilih'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'pilih-const' },
        alt: t('Gunakan const sebagai pilihan awal kecuali nilai memang berubah.'),
        body: [
          rText('Biasakan memakai '),
          rCode('const'),
          rText(' lebih dulu. Pakai '),
          rCode('let'),
          rText(' hanya saat nilainya memang berubah, seperti skor atau jumlah keranjang.'),
        ],
      }),
      limitStep({
        analogy: t('Variabel const seperti kotak terkunci'),
        same: [
          t('Kotak berlabel const tidak bisa ditukar dengan kotak nilai baru.'),
        ],
        different: [
          t('Jika isi kotak const berupa daftar atau paket data (object), isi di dalamnya masih bisa diubah tanpa mengganti kotaknya.'),
        ],
      }),
      simStep(
        'mesin-blender',
        t(
          'Masukkan bahan ke kotak variabel pada simulasi pabrik JavaScript!',
          'Uji penyimpanan variabel masukan sebelum diproses oleh fungsi.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a04-l01-q1',
          type: 'analogy',
          prompt: t('Di pabrik JavaScript, variabel paling pas diibaratkan sebagai…'),
          choices: [
            { id: 'box', label: t('Kotak berlabel untuk menyimpan nilai') },
            { id: 'paint', label: t('Cat dinding CSS'), explainWrong: t('Cat mengatur tampilan visual, bukan menyimpan nilai.') },
            { id: 'bell', label: t('Lonceng rumah'), explainWrong: t('Lonceng lebih dekat dengan event atau webhook.') },
          ],
          answer: 'box',
          explainCorrect: t('Benar! Variabel memberi label pada nilai yang disimpan program.'),
          tags: ['variabel'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l01-q2',
          prompt: t('Untuk menyimpan skor pemain yang terus bertambah setiap level, kata kunci terbaik adalah…'),
          choices: [
            { id: 'let', label: t('let') },
            { id: 'const', label: t('const'), explainWrong: t('Skor angka perlu diganti ulang nilainya; const akan memicu error jika diisi ulang.') },
            { id: 'p', label: t('<p>'), explainWrong: t('<p> adalah tag paragraf HTML.') },
          ],
          answer: 'let',
          explainCorrect: t('Tepat! let mengizinkan nilai skor diperbarui sepanjang permainan.'),
          tags: ['variabel'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a04-l01-q3',
          prompt: t('Jika menulis const nama = "Bito"; lalu menulis nama = "Raka";, JavaScript akan memberi peringatan error.'),
          answer: true,
          explainCorrect: t('Betul! Variabel const tidak dapat diisi ulang dengan nilai baru.'),
          explainWrong: t('Hampir! const melarang pengisian ulang langsung ke variabel tersebut.'),
          tags: ['variabel'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l01-q4',
          type: 'limit',
          analogy: t('Variabel const sebagai kotak tersegel'),
          prompt: t('Apa hal yang masih BISA dilakukan pada const keranjang = ["buku"]; ?'),
          choices: [
            { id: 'push', label: t('Menambah isi di dalam daftar keranjang, selama tidak mengganti dengan daftar baru') },
            { id: 're', label: t('Menulis keranjang = ["tas"]'), explainWrong: t('Mengganti seluruh variabel const akan ditolak JavaScript.') },
            { id: 'del', label: t('Menghapus kata const setelah berjalan'), explainWrong: t('Tidak bisa.') },
          ],
          answer: 'push',
          explainCorrect: t('Tepat! const mengunci label kotaknya, bukan membekukan isi daftar di dalamnya.'),
          tags: ['variabel'],
        }),
      ),
      qStep({
        id: 'a04-l01-q5',
        type: 'spotbug',
        difficulty: 2,
        prompt: t('Ketuk baris yang akan menyebabkan error karena mengubah nilai const:'),
        lines: [
          'const kota = "Makassar";',
          'let jumlah = 1;',
          'kota = "Bandung";',
        ],
        answer: [3],
        explainCorrect: t('Mata tajam! Baris 3 mencoba mengganti variabel const kota.'),
        tags: ['variabel'],
      }),
      qStep({
        id: 'a04-l01-q6',
        type: 'fill',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Lengkapi deklarasi variabel yang nilainya bisa berubah menjadi 10:'),
        template: '___ nilai = 5;\nnilai = 10;',
        bank: ['let', 'const', 'class'],
        answer: ['let'],
        explainCorrect: t('Tepat! let membolehkan variabel diisi nilai baru.'),
        tags: ['variabel'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a04-l01-r1',
        prompt: t('Kata kunci variabel untuk nilai yang tidak akan diganti ulang adalah…'),
        choices: [
          { id: 'c', label: t('const') },
          { id: 'l', label: t('let'), explainWrong: t('let dipakai untuk nilai yang berubah-ubah.') },
        ],
        answer: 'c',
        explainCorrect: t('const = constant (tetap).'),
        tags: ['variabel'],
      }),
      makeTf({
        id: 'a04-l01-r2',
        prompt: t('Biasakan memilih const lebih dulu sebelum let.'),
        answer: true,
        explainCorrect: t('Betul! Kode lebih aman dari perubahan tak sengaja.'),
        explainWrong: t('Praktik terbaiknya adalah mulai dari const lalu ganti let bila perlu.'),
        tags: ['variabel'],
      }),
    ],
    recap: t(
      'Variabel adalah kotak berlabel: pakai const untuk tetap dan let untuk yang berubah.',
      'Gunakan const secara default dan let ketika nilai perlu di-reassign.',
    ),
    companion: {
      talkPrompts: ['Beri contoh dua benda: satu yang tetap (seperti tanggal lahir) dan satu yang berubah (seperti umur atau jumlah poin).'],
      offlineActivity: 'Beri label "const" dan "let" di dua gelas, lalu coba ganti isi gelas let dengan kelereng berbeda jumlah.',
    },
  }),

  makeLesson({
    id: 'a04-l02',
    worldId: 'a04',
    title: 'Tipe data',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengelompokkan isi kotak ke teks, angka, benar/salah, daftar, dan paket data.',
      'Aku bisa mengenali lima tipe data dasar JavaScript: String, Number, Boolean, Array, dan Object.',
    ),
    estMinutes: 5,
    introducesTerms: ['tipe-data'],
    usesTerms: ['variabel', 'javascript'],
    warmupFrom: 'a04-l01',
    steps: [
      storyStep('a04/rak-isi-kotak.svg', [
        rText(
          'Isi kotak di pabrik bermacam-macam: ada tulisan nama, angka jumlah barang, saklar ya/tidak, sampai daftar belanja!',
          'Di JavaScript, setiap nilai memiliki jenis atau tipe data tertentu supaya komputer tahu cara mengolahnya.',
        ),
      ]),
      conceptStep({
        title: t('Teks, Angka, dan Ya/Tidak', 'String, Number, Boolean'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'tipe-primitif' },
        alt: t('Contoh String bertanda kutip, Number angka polos, dan Boolean true/false.'),
        code: {
          lang: 'js',
          code: 'const nama = "Tas";     // String\nconst harga = 90000;    // Number\nconst ada = true;       // Boolean',
        },
        body: [
          rTerm('tipe-data', 'Tipe data', 'Tipe data'),
          rText(' teks memakai tanda kutip ("Tas"), angka tanpa kutip (90000), dan Boolean hanya true atau false.'),
        ],
      }),
      conceptStep({
        title: t('Daftar dan Paket Data', 'Array dan Object'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'array-object' },
        alt: t('Array daftar berurutan [1, 2] dan Object berlabel { nama, harga }.'),
        code: {
          lang: 'js',
          code: 'const warna = ["merah", "biru"]; // Array\nconst produk = { nama: "Tas", harga: 90000 }; // Object',
        },
        body: [
          rText('Array '),
          rCode('[...]'),
          rText(' menyimpan daftar urut, sedangkan Object '),
          rCode('{...}'),
          rText(' menyimpan paket data berlabel.'),
        ],
      }),
      limitStep({
        analogy: t('Jenis isi kotak penyimpanan'),
        same: [
          t('Setiap jenis nilai punya bentuk wadah yang berbeda agar tidak tertukar.'),
        ],
        different: [
          t('"25" (dengan kutip) adalah teks String, bukan angka 25! Menambah "25" + 5 di JS menghasilkan "255", bukan 30.'),
        ],
      }),
      simStep(
        'mesin-blender',
        t(
          'Coba lihat tipe data bahan yang masuk dan hasil jus yang keluar di simulator!',
          'Perhatikan perbedaan tipe data masukan pada simulasi fungsi.',
        ),
      ),
      qStep({
        id: 'a04-l02-q1',
        type: 'sort',
        difficulty: 1,
        prompt: t('Kelompokkan nilai berikut ke tipe data String, Number, atau Boolean:'),
        items: [
          { id: 'v1', label: t('"Halo Bito"') },
          { id: 'v2', label: t('42') },
          { id: 'v3', label: t('true') },
          { id: 'v4', label: t('false') },
        ],
        bins: [
          { id: 'str', label: t('String (Teks)') },
          { id: 'num', label: t('Number / Boolean') },
        ],
        answer: { v1: 'str', v2: 'num', v3: 'num', v4: 'num' },
        explainCorrect: t('Benar! Teks selalu memakai tanda kutip, angka dan true/false ditulis tanpa kutip.'),
        tags: ['tipe-data'],
      }),
      qStep(
        makeMcq({
          id: 'a04-l02-q2',
          prompt: t('Bentuk manakah yang merupakan Array (daftar)?'),
          choices: [
            { id: 'arr', label: t('["apel", "jeruk", "mangga"]') },
            { id: 'obj', label: t('{ nama: "apel" }'), explainWrong: t('Kurung kurawal berisi key: value adalah Object.') },
            { id: 'str', label: t('"apel"'), explainWrong: t('Itu hanya satu teks String.') },
          ],
          answer: 'arr',
          explainCorrect: t('Tepat! Array dibungkus kurung siku [ ].'),
          tags: ['tipe-data'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l02-q3',
          prompt: t('Untuk menyimpan satu data lengkap barang (nama, harga, stok) dalam satu paket berlabel, pakai…'),
          choices: [
            { id: 'obj', label: t('Object') },
            { id: 'bool', label: t('Boolean'), explainWrong: t('Boolean hanya bernilai true atau false.') },
            { id: 'num', label: t('Number'), explainWrong: t('Number hanya menyimpan satu angka.') },
          ],
          answer: 'obj',
          explainCorrect: t('Benar! Object menggabungkan berbagai properti berlabel pada satu benda.'),
          tags: ['tipe-data'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l02-q4',
          type: 'limit',
          analogy: t('Tipe data di kotak berlabel'),
          prompt: t('Apa perbedaan tersembunyi antara "10" dan 10 di JavaScript?'),
          choices: [
            { id: 'str', label: t('"10" adalah teks String, sedangkan 10 adalah angka Number untuk berhitung') },
            { id: 'eq', label: t('Keduanya persis sama di segala kondisi'), explainWrong: t('"10" + 5 menjadi "105", sedangkan 10 + 5 menjadi 15.') },
            { id: 'err', label: t('"10" selalu dilarang'), explainWrong: t('String "10" tetap valid.') },
          ],
          answer: 'str',
          explainCorrect: t('Jeli! Tanda kutip mengubah angka menjadi teks biasa.'),
          tags: ['tipe-data'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a04-l02-q5',
          prompt: t('Tipe data Boolean hanya memiliki dua kemungkinan nilai: true atau false.'),
          answer: true,
          explainCorrect: t('Betul! Cocok untuk menyimpan status seperti "sudahLogin" atau "lunas".'),
          explainWrong: t('Boolean memang hanya punya dua nilai: true (benar) dan false (salah).'),
          tags: ['tipe-data'],
        }),
      ),
      qStep({
        id: 'a04-l02-q6',
        type: 'type',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Apa hasil dari "2" + 5 di JavaScript? (tulis dengan atau tanpa kutip)'),
        accept: ['25', '"25"', "'25'"],
        explainCorrect: t('Tepat! Karena "2" adalah String, operator + menggabungkannya menjadi teks "25".'),
        tags: ['tipe-data'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a04-l02-r1',
        prompt: t('Nilai true dan false termasuk tipe data…'),
        choices: [
          { id: 'b', label: t('Boolean') },
          { id: 'a', label: t('Array'), explainWrong: t('Array adalah daftar item di dalam [ ].') },
        ],
        answer: 'b',
        explainCorrect: t('Boolean bernilai benar (true) atau salah (false).'),
        tags: ['tipe-data'],
      }),
      makeMcq({
        id: 'a04-l02-r2',
        prompt: t('Kurung kurawal { nama: "Buku", harga: 25000 } membentuk tipe data…'),
        choices: [
          { id: 'o', label: t('Object') },
          { id: 'n', label: t('Number'), explainWrong: t('Number hanya berisi angka tunggal.') },
        ],
        answer: 'o',
        explainCorrect: t('Object menyimpan pasangan kunci dan nilai.'),
        tags: ['tipe-data'],
      }),
    ],
    recap: t(
      'Lima tipe data utama: String (teks), Number (angka), Boolean (ya/tidak), Array (daftar), Object (paket).',
      'Kuasai lima tipe dasar JavaScript dan bedakan nilai ber-kutip ("10") dengan angka murni (10).',
    ),
    companion: {
      talkPrompts: ['Kalau menulis biodata di kertas, mana yang bertipe teks (String), angka (Number), dan daftar hobi (Array)?'],
      offlineActivity: 'Tuliskan satu Object fiktif di kertas untuk benda di meja: { nama: "Botol", penuh: true }.',
    },
  }),

  makeLesson({
    id: 'a04-l03',
    worldId: 'a04',
    title: 'Kondisi dan perulangan',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membaca percabangan if/else dan perulangan untuk seluruh isi daftar.',
      'Aku bisa menulis logika kondisi if/else dan perulangan forEach pada Array.',
    ),
    estMinutes: 6,
    introducesTerms: ['kondisi'],
    usesTerms: ['variabel', 'tipe-data'],
    warmupFrom: 'a04-l02',
    steps: [
      storyStep('a04/persimpangan.svg', [
        rText(
          'Kondisi itu seperti persimpangan jalan: "Kalau lampu hijau, jalan! Kalau merah, berhenti."',
          'Logika program butuh dua kendali utama: memilih jalur berdasarkan syarat (kondisi) dan mengulang tugas otomatis (perulangan).',
        ),
      ]),
      conceptStep({
        title: t('Kondisi if / else', 'Persimpangan Jalan'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'kondisi-if' },
        alt: t('Cabang if stok > 0 tampilkan Tersedia, else Habis.'),
        code: {
          lang: 'js',
          code: 'if (stok > 0) {\n  tampilkan("Tersedia");\n} else {\n  tampilkan("Habis");\n}',
        },
        body: [
          rTerm('kondisi', 'Kondisi', 'Kondisi'),
          rText(' mengecek apakah syarat bernilai true. Jika ya jalankan '),
          rCode('if'),
          rText(', jika tidak jalankan '),
          rCode('else'),
          rText('.'),
        ],
      }),
      conceptStep({
        title: t('Perulangan forEach', 'Mengulang Isi Daftar'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'perulangan' },
        alt: t('Mesin ban berjalan memproses setiap item daftar satu per satu.'),
        code: {
          lang: 'js',
          code: 'daftar.forEach((item) => {\n  tampilkan(item);\n});',
        },
        body: [
          rText('Daripada menulis kode yang sama 100 kali, perulangan mengerjakan seluruh isi daftar secara otomatis.'),
        ],
      }),
      limitStep({
        analogy: t('Persimpangan jalan dan ban berjalan'),
        same: [
          t('Kondisi memilih satu cabang saja; perulangan memproses tiap barang berurutan.'),
        ],
        different: [
          t('Pada pemrograman, syarat kondisi harus sangat jelas (seperti stok > 0) karena komputer tidak menebak maksud abu-abu.'),
        ],
      }),
      simStep(
        'mesin-blender',
        t(
          'Lihat bagaimana mesin memeriksa bahan dan menghasilkan keluaran yang berbeda.',
          'Uji alur percabangan nilai input dan keluaran di simulator.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a04-l03-q1',
          prompt: t('Jika stok = 0, apa yang dijalankan oleh if (stok > 0) { tampil("Ada"); } else { tampil("Habis"); } ?'),
          choices: [
            { id: 'habis', label: t('Habis') },
            { id: 'ada', label: t('Ada'), explainWrong: t('0 tidak lebih besar dari 0, jadi cabang else yang berjalan.') },
            { id: 'both', label: t('Keduanya tampil'), explainWrong: t('if/else hanya memilih salah satu cabang.') },
          ],
          answer: 'habis',
          explainCorrect: t('Tepat! Karena 0 > 0 bernilai salah, kode masuk ke blok else.'),
          tags: ['kondisi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l03-q2',
          type: 'analogy',
          prompt: t('Memeriksa semua 50 produk di gudang dengan satu perintah yang sama lebih cocok memakai…'),
          choices: [
            { id: 'loop', label: t('Perulangan (forEach)') },
            { id: 'copy', label: t('Menulis manual 50 baris'), explainWrong: t('Terlalu panjang dan rawan salah ketik!') },
            { id: 'css', label: t('Padding CSS'), explainWrong: t('Padding hanya mengatur jarak tampilan.') },
          ],
          answer: 'loop',
          explainCorrect: t('Benar! Perulangan menghemat kode saat menangani isi daftar yang banyak.'),
          tags: ['kondisi'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a04-l03-q3',
          prompt: t('Dalam satu blok if / else, kedua cabang bisa dijalankan sekaligus dalam satu waktu.'),
          answer: false,
          explainCorrect: t('Benar, itu keliru! Hanya satu jalur yang dipilih berdasar hasil syarat.'),
          explainWrong: t('Hampir! Persimpangan if/else hanya memilih salah satu arah.'),
          tags: ['kondisi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l03-q4',
          type: 'limit',
          analogy: t('Persimpangan jalan if/else'),
          prompt: t('Mengapa aturan if di JavaScript tidak boleh ditulis kabur seperti "if (harga cukup murah)"?'),
          choices: [
            { id: 'exact', label: t('Komputer hanya mengerti perbandingan pasti yang bernilai true atau false seperti harga < 50000') },
            { id: 'num', label: t('JavaScript tidak mengenal angka'), explainWrong: t('JavaScript mengenal Number dengan baik.') },
            { id: 'text', label: t('if hanya berjalan di CSS'), explainWrong: t('if berjalan di JavaScript.') },
          ],
          answer: 'exact',
          explainCorrect: t('Tepat! Syarat kondisi wajib menghasilkan Boolean true atau false yang jelas.'),
          tags: ['kondisi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l03-q5',
          type: 'scenario',
          story: t('Toko Rani memberi gratis ongkir jika belanjaan >= 100000.'),
          prompt: t('Manakah syarat kondisi JavaScript yang tepat?'),
          difficulty: 2,
          choices: [
            { id: 'ge', label: t('if (total >= 100000)') },
            { id: 'lt', label: t('if (total < 100000)'), explainWrong: t('< artinya kurang dari 100.000.') },
            { id: 'eq', label: t('if (total === 0)'), explainWrong: t('=== 0 berarti total belanjanya nol.') },
          ],
          answer: 'ge',
          explainCorrect: t('Benar! Tanda >= berarti lebih besar atau sama dengan 100.000.'),
          tags: ['kondisi'],
        }),
      ),
      qStep({
        id: 'a04-l03-q6',
        type: 'fill',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Lengkapi metode perulangan array untuk menampilkan setiap nama buah:'),
        template: 'buah.___((nama) => console.log(nama));',
        bank: ['forEach', 'textContent', 'querySelector'],
        answer: ['forEach'],
        explainCorrect: t('Tepat. forEach menjalankan fungsi untuk setiap elemen di dalam array.'),
        tags: ['kondisi'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a04-l03-r1',
        prompt: t('Kapan blok else di dalam if/else dijalankan?'),
        choices: [
          { id: 'f', label: t('Ketika syarat di dalam if bernilai salah (false)') },
          { id: 't', label: t('Ketika syarat if bernilai benar (true)'), explainWrong: t('Jika benar, yang jalan adalah blok if.') },
        ],
        answer: 'f',
        explainCorrect: t('else adalah jalur cadangan saat syarat if tidak terpenuhi.'),
        tags: ['kondisi'],
      }),
      makeTf({
        id: 'a04-l03-r2',
        prompt: t('Perulangan forEach berguna untuk mengerjakan tugas yang sama bagi setiap isi Array.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('forEach memproses tiap item array satu per satu.'),
        tags: ['kondisi'],
      }),
    ],
    recap: t(
      'if/else memilih jalur berdasar syarat; perulangan memproses setiap isi daftar.',
      'Gunakan percabangan if/else untuk keputusan Boolean dan forEach untuk iterasi daftar.',
    ),
    companion: {
      talkPrompts: ['Buat satu aturan "if / else" di rumah, misalnya "Jika hujan turun, bawa payung; jika tidak, pakai topi."'],
      offlineActivity: 'Tulis aturan if/else untuk permainan tebak lampu lalu lintas bersama.',
    },
  }),

  makeLesson({
    id: 'a04-l04',
    worldId: 'a04',
    title: 'Fungsi: blender',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menunjuk mana bahan masuk (parameter) dan hasil keluar (return) pada fungsi.',
      'Aku bisa membuat dan memanggil fungsi JavaScript dengan parameter dan return.',
    ),
    estMinutes: 6,
    introducesTerms: ['fungsi'],
    usesTerms: ['variabel', 'tipe-data', 'javascript'],
    stickerId: 'blender',
    warmupFrom: 'a04-l03',
    steps: [
      storyStep('a04/blender.svg', [
        rText(
          'Fungsi di JavaScript itu seperti mesin blender! Masukkan buah ke atas, tekan tombolnya, dan keluar segelas jus.',
          'Daripada menulis rumus yang sama berulang-ulang, fungsi membungkus langkah kerja bernama yang bisa dipanggil kapan saja.',
        ),
      ]),
      conceptStep({
        title: t('Bahan Masuk & Hasil Keluar', 'Parameter & Return'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'fungsi-blender' },
        alt: t('Mesin blender menerima parameter dan mengembalikan return.'),
        code: {
          lang: 'js',
          code: 'function hitungTotal(harga, jumlah) {\n  return harga * jumlah;\n}\nhitungTotal(90000, 2); // 180000',
        },
        body: [
          rTerm('fungsi', 'Fungsi', 'Fungsi'),
          rText(' menerima bahan masuk (parameter), mengolahnya, lalu memberi hasil lewat '),
          rCode('return'),
          rText('.'),
        ],
      }),
      conceptStep({
        title: t('Dipakai Berkali-kali', 'Memanggil Fungsi'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'panggil-fungsi' },
        alt: t('Satu blender bisa dipakai untuk mangga, stroberi, atau alpukat.'),
        body: [
          rText('Blender yang sama bisa dipakai untuk angka berbeda-beda kapan saja dengan memanggil namanya.'),
        ],
      }),
      limitStep({
        analogy: t('Fungsi sebagai mesin blender'),
        same: [
          t('Ada masukan bahan (parameter), proses di dalam mesin, dan keluaran hasil (return).'),
        ],
        different: [
          t('Fungsi JavaScript bisa tetap bekerja bahkan tanpa parameter masuk, atau bekerja tanpa mengembalikan hasil apa pun.'),
        ],
      }),
      simStep(
        'mesin-blender',
        t(
          'Pilih bahan dan tekan Putar Blender untuk melihat parameter berubah menjadi hasil return!',
          'Eksperimen langsung memasukkan parameter dan menguji return pada simulator Mesin Blender.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a04-l04-q1',
          type: 'analogy',
          prompt: t('Jika fungsi hitungTotal(harga, jumlah) adalah mesin blender, maka harga dan jumlah adalah…'),
          choices: [
            { id: 'par', label: t('Bahan masukan (parameter)') },
            { id: 'ret', label: t('Hasil jus yang dituang'), explainWrong: t('Hasil yang keluar itu adalah return.') },
            { id: 'css', label: t('Warna tombol'), explainWrong: t('Warna diatur oleh CSS.') },
          ],
          answer: 'par',
          explainCorrect: t('Benar! Bahan yang kita kirim ke dalam tanda kurung disebut parameter.'),
          tags: ['fungsi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l04-q2',
          prompt: t('Jika kita memanggil hitungTotal(20000, 3), hasil apa yang dikembalikan oleh return harga * jumlah ?'),
          choices: [
            { id: '60', label: t('60000') },
            { id: '23', label: t('23000'), explainWrong: t('Operasinya perkalian (*), bukan penjumlahan.') },
            { id: '0', label: t('0'), explainWrong: t('20000 × 3 = 60000.') },
          ],
          answer: '60',
          explainCorrect: t('Tepat! 20000 dikali 3 menghasilkan 60000.'),
          tags: ['fungsi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l04-q3',
          prompt: t('Kata kunci apa yang mengeluarkan hasil dari dalam fungsi agar bisa dipakai lagi?'),
          choices: [
            { id: 'ret', label: t('return') },
            { id: 'let', label: t('let'), explainWrong: t('let hanya membuat variabel di dalam fungsi.') },
            { id: 'if', label: t('if'), explainWrong: t('if untuk mengecek syarat kondisi.') },
          ],
          answer: 'ret',
          explainCorrect: t('Benar! return mengirimkan hasil akhir ke pemanggil fungsi.'),
          tags: ['fungsi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l04-q4',
          type: 'limit',
          analogy: t('Fungsi seperti mesin blender'),
          prompt: t('Mana pernyataan tentang fungsi JavaScript yang berbeda dari blender dapur?'),
          choices: [
            { id: 'empty', label: t('Fungsi JS bisa dibuat tanpa parameter sama sekali, misalnya sapaPengunjung()') },
            { id: 'reuse', label: t('Bisa dipakai berulang-ulang'), explainWrong: t('Keduanya sama-sama bisa dipakai berulang.') },
            { id: 'out', label: t('Bisa mengolah input menjadi hasil'), explainWrong: t('Itu kesamaannya.') },
          ],
          answer: 'empty',
          explainCorrect: t('Tepat! Ada fungsi yang tidak butuh bahan masuk dan hanya menjalankan aksi langsung.'),
          tags: ['fungsi'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a04-l04-q5',
          prompt: t('Menulis resep fungsi sekali saja tanpa memanggil namanya belum akan menjalankan kode di dalamnya.'),
          answer: true,
          explainCorrect: t('Betul! Sama seperti punya blender di meja: harus dinyalakan (dipanggil) agar bekerja.'),
          explainWrong: t('Fungsi baru berjalan saat dipanggil dengan namaFungsi().'),
          tags: ['fungsi'],
        }),
      ),
      qStep({
        id: 'a04-l04-q6',
        type: 'fill',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Lengkapi fungsi penjumlahan agar mengembalikan hasil a + b:'),
        template: 'function tambah(a, b) {\n  ___ a + b;\n}',
        bank: ['return', 'const', 'else'],
        answer: ['return'],
        explainCorrect: t('Tepat! return mengembalikan hasil ekspresi kepada pemanggil fungsi.'),
        tags: ['fungsi'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a04-l04-r1',
        prompt: t('Nilai yang dikirim masuk ke dalam tanda kurung fungsi disebut…'),
        choices: [
          { id: 'p', label: t('Parameter') },
          { id: 's', label: t('Selector'), explainWrong: t('Selector dipakai di CSS untuk memilih elemen.') },
        ],
        answer: 'p',
        explainCorrect: t('Parameter adalah input bagi sebuah fungsi.'),
        tags: ['fungsi'],
      }),
      makeTf({
        id: 'a04-l04-r2',
        prompt: t('Satu fungsi bisa dipanggil berkali-kali dengan nilai masukan berbeda.'),
        answer: true,
        explainCorrect: t('Betul! Itulah guna utama membuat fungsi: agar kode tidak diulang-ulang.'),
        explainWrong: t('Fungsi dibuat khusus agar dapat dipakai ulang dengan berbagai input.'),
        tags: ['fungsi'],
      }),
    ],
    recap: t(
      'Fungsi adalah mesin blender bernama: masukkan parameter, lalu keluarkan hasil return.',
      'Fungsi membungkus langkah kode yang dapat dipanggil ulang dengan parameter masukan dan nilai kembalian return.',
    ),
    companion: {
      talkPrompts: ['Jika mesin blender adalah fungsi buatJus(buah), hasilnya apa kalau masukannya "mangga"?'],
      offlineActivity: 'Tulis satu resep fungsi sederhana di kertas, misal hitungDiskon(harga, potongan).',
    },
  }),

  makeLesson({
    id: 'a04-l05',
    worldId: 'a04',
    title: 'DOM dan event: cari, dengar, ubah',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengurutkan langkah kerja tombol interaktif: cari elemen, dengar event, lalu ubah isi.',
      'Aku bisa menjelaskan struktur pohon DOM dan pola querySelector + addEventListener + textContent.',
    ),
    estMinutes: 6,
    introducesTerms: ['dom', 'event'],
    usesTerms: ['html', 'javascript', 'browser'],
    stickerId: 'pohon-dom',
    warmupFrom: 'a04-l04',
    steps: [
      storyStep('a04/pohon-dom.svg', [
        rText(
          'Browser menyimpan seluruh tag HTML halaman seperti silsilah pohon keluarga. JavaScript bisa memanjat pohon itu dan mengubah daunnya!',
          'Agar JavaScript bisa menyentuh tombol dan teks HTML, browser membangun jembatan berbentuk pohon bernama DOM.',
        ),
      ]),
      conceptStep({
        title: t('Pohon DOM & Cari Elemen', 'DOM: Jembatan ke Halaman'),
        visualName: 'HtmlTreeDiagram',
        visualProps: { worldId: 'a04', topic: 'pohon-dom' },
        alt: t('Pohon DOM bercabang dari html ke head dan body lalu ke h1, p, button.'),
        body: [
          rTerm('dom', 'DOM', 'DOM'),
          rText(' adalah pohon elemen HTML yang bisa dicari oleh JavaScript dengan '),
          rCode('document.querySelector()'),
          rText('.'),
        ],
      }),
      conceptStep({
        title: t('Dengarkan Event lalu Ubah', 'addEventListener & textContent'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'dom-event' },
        alt: t('Tiga langkah: cari elemen, pasang pendengar event klik, lalu ubah textContent.'),
        code: {
          lang: 'js',
          code: 'const btn = document.querySelector(".suka");\nbtn.addEventListener("click", () => {\n  btn.textContent = "Disukai ✓";\n});',
        },
        body: [
          rTerm('event', 'Event', 'Event'),
          rText(' adalah kejadian seperti klik atau ketik. Urutan wajibnya: cari elemen → dengar event → ubah.'),
        ],
      }),
      limitStep({
        analogy: t('DOM seperti pohon silsilah keluarga'),
        same: [
          t('Ada induk, anak, dan saudara yang tersusun bercabang rapi dari atas (html) ke bawah.'),
        ],
        different: [
          t('Di pohon DOM, JavaScript dapat memindahkan, menambah, atau menghapus cabang secara langsung saat halaman aktif.'),
        ],
      }),
      simStep(
        'mesin-blender',
        t(
          'Klik tombol pada simulator untuk melihat aksi tombol langsung mengubah hasil di layar!',
          'Amati respons klik event listener yang mengubah tampilan DOM secara langsung.',
        ),
      ),
      qStep({
        id: 'a04-l05-q1',
        type: 'order',
        difficulty: 1,
        prompt: t('Urutkan tiga langkah sakti membuat halaman bereaksi terhadap klik:'),
        items: [
          { id: 'c', label: t('Cari elemennya (querySelector)') },
          { id: 'd', label: t('Dengarkan kejadian klik (addEventListener)') },
          { id: 'u', label: t('Ubah tampilan atau tulisannya (textContent)') },
        ],
        answer: ['c', 'd', 'u'],
        explainCorrect: t('Tepat! Cari → Dengar → Ubah adalah pola hampir semua interaksi DOM.'),
        tags: ['dom', 'event'],
      }),
      qStep(
        makeMcq({
          id: 'a04-l05-q2',
          prompt: t('Kejadian seperti klik tombol, ketikan huruf, atau kiriman form di JavaScript disebut…'),
          choices: [
            { id: 'ev', label: t('Event') },
            { id: 'css', label: t('Padding'), explainWrong: t('Padding hanya jarak dalam kotak CSS.') },
            { id: 'dns', label: t('Domain'), explainWrong: t('Domain adalah nama alamat situs.') },
          ],
          answer: 'ev',
          explainCorrect: t('Benar! Event adalah setiap kejadian aksi dari pengguna atau browser.'),
          tags: ['event'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l05-q3',
          type: 'analogy',
          prompt: t('Bentuk struktur DOM paling mirip dengan…'),
          choices: [
            { id: 'tree', label: t('Pohon silsilah keluarga (induk, anak, saudara)') },
            { id: 'line', label: t('Garis lurus tanpa cabang'), explainWrong: t('Elemen HTML selalu bersarang di dalam elemen lain membentuk cabang.') },
            { id: 'box', label: t('Satu kotak kosong tanpa isi'), explainWrong: t('DOM terdiri atas banyak simpul bertingkat.') },
          ],
          answer: 'tree',
          explainCorrect: t('Tepat! Document Object Model tersusun sebagai pohon berinduk dan bercabang.'),
          tags: ['dom'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l05-q4',
          type: 'limit',
          analogy: t('DOM sebagai pohon silsilah'),
          prompt: t('Sifat mana yang dimiliki pohon DOM tetapi tidak ada pada silsilah keluarga biasa?'),
          choices: [
            { id: 'mut', label: t('Cabang elemen bisa ditambah, diubah teksnya, atau dihapus otomatis oleh skrip dalam sekejap') },
            { id: 'par', label: t('Ada simpul induk dan simpul anak'), explainWrong: t('Keduanya punya hubungan induk–anak.') },
            { id: 'root', label: t('Berawal dari satu akar paling atas'), explainWrong: t('Keduanya memiliki akar utama.') },
          ],
          answer: 'mut',
          explainCorrect: t('Benar! DOM bersifat dinamis dan terus berubah mengikuti aksi pengguna.'),
          tags: ['dom'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l05-q5',
          type: 'scenario',
          story: t('Raka ingin mengubah tulisan pada tombol ".beli" setelah diklik agar menjadi aman dari sisipan script berbahaya.'),
          prompt: t('Properti mana yang paling aman digunakan?'),
          difficulty: 2,
          choices: [
            { id: 'tc', label: t('tombol.textContent') },
            { id: 'ih', label: t('tombol.innerHTML'), explainWrong: t('innerHTML rawan celah keamanan jika menerima teks dari pengguna.') },
            { id: 'pad', label: t('tombol.padding'), explainWrong: t('padding bukan pengubah teks isi elemen.') },
          ],
          answer: 'tc',
          explainCorrect: t('Hebat! textContent hanya menulis teks polos dan sangat aman.'),
          tags: ['dom'],
        }),
      ),
      qStep({
        id: 'a04-l05-q6',
        type: 'fill',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Pasang pendengar kejadian klik pada tombol dengan method DOM yang tepat:'),
        template: 'tombol.___("click", handleKlik);',
        bank: ['addEventListener', 'querySelector', 'textContent'],
        answer: ['addEventListener'],
        explainCorrect: t('Tepat. addEventListener("click", ...) memantau klik pada elemen target.'),
        tags: ['event', 'dom'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a04-l05-r1',
        prompt: t('Perintah JavaScript untuk mencari satu elemen di halaman menggunakan selector CSS adalah…'),
        choices: [
          { id: 'qs', label: t('document.querySelector(...)') },
          { id: 'fe', label: t('array.forEach(...)'), explainWrong: t('forEach untuk mengulang isi Array.') },
        ],
        answer: 'qs',
        explainCorrect: t('querySelector memilih elemen HTML pertama yang cocok dengan selector.'),
        tags: ['dom'],
      }),
      makeTf({
        id: 'a04-l05-r2',
        prompt: t('Urutan interaksi web umumnya: cari elemen → dengarkan event → ubah halaman.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('Itulah tiga langkah utama interaksi DOM.'),
        tags: ['dom', 'event'],
      }),
    ],
    recap: t(
      'DOM menghubungkan HTML dan JavaScript lewat pola: cari elemen → dengar event → ubah.',
      'Browser memodelkan HTML sebagai pohon DOM; JavaScript memanipulasinya lewat querySelector, addEventListener, dan textContent.',
    ),
    companion: {
      talkPrompts: ['Jika kamu klik tombol "Suka", tiga langkah apa yang dilakukan JavaScript di belakang layar?'],
      offlineActivity: 'Gambar pohon keluarga tag HTML sederhana: html → body → (h1, button).',
    },
  }),

  makeLesson({
    id: 'a04-l06',
    worldId: 'a04',
    title: 'Fetch dan async: nomor antrean kopi',
    modes: ['pro'],
    objective: t('Aku bisa menjelaskan cara kerja async/await dan perintah fetch untuk meminta data dari server.'),
    estMinutes: 6,
    introducesTerms: ['fetch'],
    usesTerms: ['javascript', 'server', 'request', 'response', 'fungsi'],
    stickerId: 'antrean-kopi',
    warmupFrom: 'a04-l05',
    steps: [
      storyStep('a04/antrean-kopi.svg', [
        rText('Saat memesan kopi di kafe ramai, kasir memberimu nomor antrean. Kamu tidak berdiri mematung menghalangi orang lain—kamu duduk santai sampai nomormu dipanggil.'),
      ]),
      conceptStep({
        title: t('Mengambil Data Tanpa Membekukan Layar', 'Fetch & Async/Await'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'a04', topic: 'fetch-async' },
        alt: t('Browser mengirim fetch ke API lalu melanjutkan tugas lain hingga response JSON datang.'),
        code: {
          lang: 'js',
          code: 'async function ambilProduk() {\n  const res = await fetch("https://api.toko-rani.example/produk");\n  const data = await res.json();\n  console.log(data);\n}',
          highlight: [1, 2, 3],
        },
        body: [
          rTerm('fetch', 'fetch'),
          rText(' meminta data ke server secara asinkron (async/await), lalu mengubah jawabannya lewat res.json().'),
        ],
      }),
      conceptStep({
        title: t('Tidak Perlu Hafal Semua Sintaks', 'Rujukan Dokumentasi'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'mdn-docs' },
        alt: t('Membuka dokumentasi resmi MDN Web Docs daripada menghafal.'),
        body: [
          rText('Yang terpenting adalah memahami alurnya: kirim permintaan, tunggu dengan await, lalu olah JSON. Programmer berpengalaman pun selalu membuka dokumentasi.'),
        ],
      }),
      limitStep({
        analogy: t('Nomor antrean kopi untuk async/await'),
        same: [
          t('Sambil menunggu pesanan selesai, pengguna tetap bebas menggulir dan menekan tombol lain di halaman.'),
        ],
        different: [
          t('Jika server rusak atau internet putus, pesanan kopi digital bisa gagal total sehingga perlu penanganan error.'),
        ],
      }),
      simStep('mesin-blender', t('Simulasikan pemrosesan masukan menjadi hasil return asinkron.')),
      qStep(
        makeMcq({
          id: 'a04-l06-q1',
          type: 'analogy',
          prompt: t('Mengapa mengambil data server dengan fetch diibaratkan mendapat nomor antrean kopi?'),
          choices: [
            { id: 'wait', label: t('Halaman tetap bisa dipakai berinteraksi selama menunggu jawaban server datang') },
            { id: 'freeze', label: t('Seluruh browser berhenti membeku tidak bisa diklik'), explainWrong: t('Justru asinkron mencegah halaman membeku!') },
            { id: 'coffee', label: t('Server selalu mengembalikan gambar kopi'), explainWrong: t('Server mengirim data JSON.') },
          ],
          answer: 'wait',
          explainCorrect: t('Tepat. Operasi asinkron menjaga UI tetap responsif.'),
          tags: ['fetch'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l06-q2',
          prompt: t('Setelah const res = await fetch(...), perintah apa yang membaca isi data JSON-nya?'),
          choices: [
            { id: 'json', label: t('await res.json()') },
            { id: 'css', label: t('res.style()'), explainWrong: t('style() tidak ada pada objek Response fetch.') },
            { id: 'dom', label: t('res.querySelector()'), explainWrong: t('Response adalah data jaringan, bukan pohon DOM.') },
          ],
          answer: 'json',
          explainCorrect: t('Benar. res.json() juga proses asinkron yang mengurai teks JSON menjadi object JS.'),
          tags: ['fetch'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a04-l06-q3',
          prompt: t('Kata kunci await hanya bisa digunakan di dalam fungsi yang ditandai async (atau top-level module).'),
          answer: true,
          explainCorrect: t('Betul!'),
          explainWrong: t('Di dalam fungsi biasa non-async, menulis await akan memicu syntax error.'),
          tags: ['fetch'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l06-q4',
          type: 'limit',
          analogy: t('Nomor antrean kafe'),
          prompt: t('Risiko apa yang muncul pada fetch jaringan nyata yang perlu ditangani terpisah di kode?'),
          choices: [
            { id: 'err', label: t('Jaringan bisa terputus atau server mengembalikan status gagal sehingga perlu error handling') },
            { id: 'wait', label: t('Pemesan harus menunggu beberapa saat'), explainWrong: t('Menunggu memang bagian dari analoginya.') },
            { id: 'ui', label: t('Aktivitas lain tetap berjalan'), explainWrong: t('Ini memang kesamaannya.') },
          ],
          answer: 'err',
          explainCorrect: t('Benar! Di Jalur B nanti kita akan mempelajari penanganan error fetch dengan lengkap.'),
          tags: ['fetch'],
        }),
      ),
      qStep({
        id: 'a04-l06-q5',
        type: 'order',
        difficulty: 2,
        prompt: t('Urutkan langkah mengambil dan mencetak daftar produk dengan fetch:'),
        items: [
          { id: 'f1', label: t('Panggil fetch(url) dengan await') },
          { id: 'f2', label: t('Urai respons menjadi JSON lewat await res.json()') },
          { id: 'f3', label: t('Tampilkan data ke layar atau Console') },
        ],
        answer: ['f1', 'f2', 'f3'],
        explainCorrect: t('Sempurna!'),
        tags: ['fetch'],
      }),
      qStep({
        id: 'a04-l06-q6',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi fungsi asinkron untuk mengambil data produk:'),
        template: '___ function ambilProduk() {\n  const res = await fetch("https://api.toko-rani.example/produk");\n}',
        bank: ['async', 'const', 'return'],
        answer: ['async'],
        explainCorrect: t('Tepat. Deklarasi async function memungkinkan pemakaian await di dalamnya.'),
        tags: ['fetch'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a04-l06-r1',
        prompt: t('Perintah JavaScript bawaan browser untuk meminta data dari API server adalah…'),
        choices: [
          { id: 'f', label: t('fetch') },
          { id: 'g', label: t('grid'), explainWrong: t('grid adalah tata letak CSS.') },
        ],
        answer: 'f',
        explainCorrect: t('fetch mengirim permintaan HTTP asinkron.'),
        tags: ['fetch'],
      }),
      makeTf({
        id: 'a04-l06-r2',
        prompt: t('Operasi asinkron mencegah tampilan halaman membeku selama menunggu data dari server.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('Async menjaga browser tetap responsif.'),
        tags: ['fetch'],
      }),
    ],
    recap: t('fetch dan async/await mengambil data dari server secara asinkron tanpa membekukan halaman.'),
  }),
];
