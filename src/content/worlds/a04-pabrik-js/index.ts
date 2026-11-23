import {
  conceptStep,
  limitStep,
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
import type { Lesson, Txt, World } from '@/content/schema';
import { arraysAndObjects, handlingErrors } from './workshops';

/**
 * Soal jangkar = soal biasa ditambah pilihan "Belum tahu". Sama dengan `makeAnchorMcq`,
 * tetapi menerima `hints` supaya soal jangkar Junior juga punya petunjuk (copydeck 6.4).
 */
function anchorMcq(params: Parameters<typeof makeMcq>[0]) {
  return makeMcq({
    ...params,
    choices: [...params.choices, { id: 'unknown', label: t('Belum tahu') }],
  });
}

/** Petunjuk untuk soal yang ditulis sebagai objek biasa (bukan lewat makeMcq atau makeTf). */
const hint = (first: Txt, second?: Txt): [Txt, Txt | undefined] => [first, second];

export const world: World = {
  id: 'a04',
  track: 'A',
  order: 4,
  title: 'Pabrik JavaScript',
  tagline: t(
    'Simpan skor dan nama di kotak berlabel. Buat tombol yang bisa menjawab ketukanmu.',
    'Kamu bisa menulis JavaScript yang menyimpan data, mengambil keputusan, dan menanggapi klik.',
  ),
  color: '#D99A00',
  illustration: 'a04-pabrik-js',
  sourceChapters: ['J1-05'],
  requires: ['a03'],
  lessons: ['a04-l01', 'a04-l02', 'a04-l03', 'a04-l04', 'a04-l05', 'a04-l06'],
  sideQuests: [arraysAndObjects.id, handlingErrors.id],
  boss: {
    title: 'Tantangan Penjaga Pabrik JavaScript',
    greeting: t(
      'Selamat datang di Pabrik JavaScript! Ayo nyalakan semua mesinnya.',
      'Uji dasar JavaScript-mu: simpan data, ambil keputusan, dan tanggapi klik.',
    ),
    guardianName: 'Penjaga Pabrik JavaScript',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      anchorMcq({
        id: 'a04-anc-j1',
        prompt: t('Kotak mana yang isinya tidak bisa diganti lagi?'),
        choices: [
          { id: 'const', label: t('Kotak yang terkunci') },
          {
            id: 'let',
            label: t('Kotak yang bisa diisi ulang'),
            explainWrong: t('Kotak ini boleh diisi ulang kapan saja. Isinya bisa diganti.'),
          },
          {
            id: 'div',
            label: t('Kotak yang tidak bernama'),
            explainWrong: t('Nama kotak tidak mengunci isinya. Yang mengunci adalah gemboknya.'),
          },
        ],
        answer: 'const',
        explainCorrect: t('Kotak terkunci tidak bisa diisi ulang. Seperti loker yang digembok.'),
        hints: [t('Ingat loker yang digembok.')],
        tags: ['variabel'],
      }),
      anchorMcq({
        id: 'a04-anc-j2',
        prompt: t('Daftar belanja: apel, jeruk, mangga. Isi seperti ini berjenis apa?'),
        choices: [
          { id: 'arr', label: t('Daftar berurutan') },
          {
            id: 'num',
            label: t('Satu angka saja'),
            explainWrong: t('Angka hanya satu bilangan. Daftar belanja punya banyak isi.'),
          },
          {
            id: 'bool',
            label: t('Jawaban ya atau tidak'),
            explainWrong: t('Ya atau tidak hanya punya 2 isi. Daftar belanja punya banyak isi.'),
          },
        ],
        answer: 'arr',
        explainCorrect: t('Daftar menyimpan banyak isi berurutan. Seperti daftar belanja di kertas.'),
        hints: [t('Ingat daftar belanja di kertas.')],
        tags: ['tipe-data'],
      }),
      anchorMcq({
        id: 'a04-anc-j3',
        prompt: t('Blender perlu buah untuk membuat jus. Buah itu termasuk apa?'),
        choices: [
          { id: 'par', label: t('Bahan masuk') },
          {
            id: 'margin',
            label: t('Hasil keluar'),
            explainWrong: t('Hasil keluar adalah jusnya. Buah adalah bahan yang masuk.'),
          },
          {
            id: 'alt',
            label: t('Tombol penyala'),
            explainWrong: t('Tombol hanya menyalakan blender. Buah adalah bahannya.'),
          },
        ],
        answer: 'par',
        explainCorrect: t('Buah adalah bahan masuk. Blender mengubahnya menjadi jus.'),
        hints: [t('Pikirkan kapan buah dipakai: sebelum atau sesudah?')],
        tags: ['fungsi'],
      }),
      anchorMcq({
        id: 'a04-anc-j4',
        prompt: t('Tombol harus bereaksi saat diketuk. Mana urutan langkahnya?'),
        choices: [
          { id: 'dom', label: t('Cari tombol, dengarkan ketukan, ubah tampilan') },
          {
            id: 'del',
            label: t('Dengarkan ketukan, cari tombol, ubah tampilan'),
            explainWrong: t('Ketukan belum bisa ditunggu sebelum tombolnya ketemu. Cari tombolnya dulu.'),
          },
          {
            id: 'css',
            label: t('Ubah tampilan, cari tombol, dengarkan ketukan'),
            explainWrong: t('Tampilan belum boleh berubah sebelum ada ketukan. Tunggu ketukannya dulu.'),
          },
        ],
        answer: 'dom',
        explainCorrect: t('Tombol dicari dulu, lalu ditunggu ketukannya. Terakhir tampilan diubah.'),
        hints: [t('Tombol harus ketemu lebih dulu.')],
        tags: ['dom', 'event'],
      }),
      anchorMcq({
        id: 'a04-anc-j5',
        prompt: t('Rani mau memeriksa apakah stok masih ada. Alat mana yang cocok?'),
        choices: [
          { id: 'if', label: t('Aturan kalau-maka') },
          {
            id: 'img',
            label: t('Daftar berurutan'),
            explainWrong: t('Daftar hanya menyimpan banyak isi. Daftar tidak memilih jalan.'),
          },
          {
            id: 'flex',
            label: t('Mesin blender'),
            explainWrong: t('Blender mengubah bahan menjadi hasil. Blender tidak memeriksa syarat.'),
          },
        ],
        answer: 'if',
        explainCorrect: t('Aturan kalau-maka memilih jalan. Kalau stok ada, tampilkan Ada.'),
        hints: [t('Cari alat yang memilih jalan.')],
        tags: ['kondisi'],
      }),
    ],
    pro: [
      anchorMcq({
        id: 'a04-anc-p1',
        prompt: t('Satu produk punya nama, harga, dan stok. Tipe data mana yang paling cocok?'),
        choices: [
          { id: 'obj', label: t('Object, misalnya { nama: "Tas", harga: 90000 }') },
          {
            id: 'bool',
            label: t('Array, misalnya ["Tas", 90000, 5]'),
            explainWrong: t('Array menyimpan daftar berurutan tanpa label nama untuk tiap nilai.'),
          },
          {
            id: 'num',
            label: t('String, misalnya "Tas 90000 5"'),
            explainWrong: t('String hanya satu teks. Nama, harga, dan stok tidak terpisah.'),
          },
        ],
        answer: 'obj',
        explainCorrect: t('Object menyimpan pasangan label dan nilai dalam kurung kurawal.'),
        tags: ['tipe-data'],
      }),
      anchorMcq({
        id: 'a04-anc-p2',
        prompt: t('Apa beda utama return dan console.log di dalam fungsi?'),
        choices: [
          { id: 'ret', label: t('return mengirim hasil ke pemanggil fungsi') },
          {
            id: 'col',
            label: t('console.log mengirim hasil ke pemanggil fungsi'),
            explainWrong: t('console.log hanya menampilkan teks di Console. Pemanggil tidak menerima hasilnya.'),
          },
          {
            id: 'loop',
            label: t('Keduanya sama, hanya beda nama'),
            explainWrong: t('Keduanya berbeda. return memberi hasil, console.log hanya menampilkan.'),
          },
        ],
        answer: 'ret',
        explainCorrect: t(
          'Hasil return bisa disimpan dan dihitung lagi oleh pemanggil. Hasil console.log hanya tampil di Console.',
        ),
        tags: ['fungsi'],
      }),
      anchorMcq({
        id: 'a04-anc-p3',
        prompt: t('Tulisan pengunjung akan ditampilkan di halaman. Cara mana yang paling aman?'),
        choices: [
          { id: 'tc', label: t('elemen.textContent = teks') },
          {
            id: 'ih',
            label: t('elemen.innerHTML = teks'),
            explainWrong: t('innerHTML membaca teks sebagai HTML. Script dari pengunjung bisa ikut berjalan.'),
          },
          {
            id: 'ev',
            label: t('eval(teks)'),
            explainWrong: t('eval menjalankan teks sebagai kode. Itu cara paling berbahaya.'),
          },
        ],
        answer: 'tc',
        explainCorrect: t('textContent memperlakukan isi sebagai teks biasa, jadi script tidak dijalankan.'),
        tags: ['dom'],
      }),
      anchorMcq({
        id: 'a04-anc-p4',
        prompt: t('Halaman memanggil fetch dan menunggu jawaban server. Apa yang terjadi pada halaman selama menunggu?'),
        choices: [
          { id: 'as', label: t('Halaman tetap bisa diklik dan digulir') },
          {
            id: 'css',
            label: t('Halaman membeku sampai jawaban datang'),
            explainWrong: t('fetch menunggu di latar belakang. Halaman tidak ikut membeku.'),
          },
          {
            id: 'var',
            label: t('Halaman dimuat ulang dari awal'),
            explainWrong: t('fetch mengambil data tanpa memuat ulang halaman. Tampilan yang ada tetap di tempatnya.'),
          },
        ],
        answer: 'as',
        explainCorrect: t('fetch menunggu jawaban di latar belakang. Klik dan gulir tetap berjalan.'),
        tags: ['fetch'],
      }),
      anchorMcq({
        id: 'a04-anc-p5',
        prompt: t('Method array mana yang menjalankan satu fungsi untuk setiap item?'),
        choices: [
          { id: 'fe', label: t('daftar.forEach(...)') },
          {
            id: 'qs',
            label: t('daftar.push(...)'),
            explainWrong: t('push menambah satu item di akhir daftar. push tidak mengulang fungsi.'),
          },
          {
            id: 'ret',
            label: t('daftar.length'),
            explainWrong: t('length hanya memberi jumlah item. length tidak menjalankan fungsi.'),
          },
        ],
        answer: 'fe',
        explainCorrect: t('forEach menjalankan fungsi callback untuk setiap item array, berurutan.'),
        tags: ['kondisi'],
      }),
      anchorMcq({
        id: 'a04-anc-p6',
        type: 'limit',
        analogy: t('const sebagai kotak yang tidak bisa diganti isinya'),
        prompt: t('Apa yang sering mengejutkan pemula tentang const pada object atau array?'),
        choices: [
          { id: 'mut', label: t('Isi object tetap bisa diubah, walau variabelnya const') },
          {
            id: 'num',
            label: t('Isi object ikut terkunci dan tidak bisa diubah'),
            explainWrong: t('Yang terkunci hanya variabelnya. Isi object tetap bisa diubah.'),
          },
          {
            id: 'str',
            label: t('Variabel const hanya bisa menyimpan angka'),
            explainWrong: t('const bisa menyimpan semua tipe data. Aturannya hanya melarang pengisian ulang.'),
          },
        ],
        answer: 'mut',
        explainCorrect: t(
          'const mengunci ikatan variabelnya. Isi properti object dan item array masih bisa diubah.',
        ),
        tags: ['variabel'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  // ---------------------------------------------------------------------------------------------
  // A4-L01 Variabel: kotak berlabel
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a04-l01',
    worldId: 'a04',
    title: 'Variabel: kotak berlabel',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan kotak yang bisa diisi ulang dan kotak terkunci.',
      'Kamu bisa menyimpan nilai dengan let dan const, lalu menjelaskan perbedaannya.',
    ),
    estMinutes: 6,
    introducesTerms: ['variabel'],
    usesTerms: ['javascript'],
    stickerId: 'kotak-berlabel',
    warmupFrom: 'a03-l05',
    atWork:
      'Di kode situs toko, const dipakai untuk nilai tetap seperti nama toko, dan let untuk jumlah keranjang.',
    steps: [
      storyStep('a04/kotak-berlabel.svg', [
        rText(
          'Rani sedang bermain di pabrik JavaScript. Skornya harus disimpan supaya tidak hilang. Skor itu disimpan di mana, ya?',
          'Game kecil di situs Toko Rani perlu mengingat skor pemain selama permainan berjalan. Di JavaScript, tempat penyimpanan itu bernama variabel.',
        ),
      ]),
      conceptStep({
        title: t('Kotak biasa dan kotak terkunci', 'Dua cara membuat variabel'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'variabel-let-const' },
        alt: t(
          'Kotak biasa bisa diganti isinya. Kotak terkunci tidak bisa.',
          'Kotak let bisa diisi ulang, kotak const terkunci.',
        ),
        code: {
          lang: 'js',
          code: 'let jumlah = 3;\nconst namaToko = "Toko Rani";\njumlah = 4; // boleh!',
        },
        body: [
          rTerm('variabel', 'Variabel', 'Variabel'),
          rJunior(
            ' adalah kotak berlabel untuk menyimpan isi. Kotak let boleh diisi ulang. Kotak const terkunci, tidak bisa diisi ulang.',
          ),
          rPro(' adalah wadah bernama untuk menyimpan nilai. Pakai '),
          rCode('let', ['pro']),
          rPro(' kalau nilainya boleh diganti. Pakai '),
          rCode('const', ['pro']),
          rPro(' kalau nilainya tetap.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a04-l01-q1',
          type: 'analogy',
          prompt: t(
            'Di pabrik JavaScript, variabel itu seperti apa?',
            'Di pabrik JavaScript, variabel paling pas diibaratkan sebagai apa?',
          ),
          choices: [
            {
              id: 'box',
              label: t('Kotak berlabel untuk menyimpan isi', 'Kotak berlabel untuk menyimpan nilai'),
              icon: 'box',
            },
            {
              id: 'paint',
              label: t('Mesin yang membuat jus', 'Mesin yang mengubah masukan menjadi hasil'),
              icon: 'settings',
              explainWrong: t(
                'Mesin pembuat jus itu fungsi. Kamu akan bertemu dengannya nanti.',
                'Itu fungsi, bukan variabel. Fungsi mengubah masukan menjadi hasil.',
              ),
            },
            {
              id: 'bell',
              label: t('Lonceng yang berbunyi saat ditekan'),
              icon: 'bell',
              explainWrong: t(
                'Lonceng memberi tanda saat ditekan. Ia tidak menyimpan apa pun.',
                'Lonceng mirip event: tanda saat sesuatu terjadi. Variabel hanya menyimpan nilai.',
              ),
            },
          ],
          answer: 'box',
          explainCorrect: t(
            'Variabel menyimpan isi dengan sebuah nama. Seperti kotak pensil yang diberi label.',
            'Variabel memberi nama pada sebuah nilai supaya program bisa memakainya lagi. Seperti kotak yang diberi label.',
          ),
          hints: [t('Ingat kotak pensil yang diberi label.', 'Variabel menyimpan satu nilai dengan sebuah nama.')],
          tags: ['variabel'],
        }),
      ),
      conceptStep({
        title: t('Mulai dari kotak terkunci', 'Aturan memilih: const dulu'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'pilih-const' },
        alt: t(
          'Mulai dari kotak terkunci. Pakai kotak biasa kalau isinya berubah.',
          'Pakai const dulu, pindah ke let hanya kalau nilai berubah.',
        ),
        body: [
          rJunior(
            'Mulailah dengan kotak const. Kotak let dipakai hanya untuk isi yang berubah. Contohnya skor atau jumlah keranjang.',
          ),
          rPro('Pakai '),
          rCode('const', ['pro']),
          rPro(' lebih dulu. Ganti ke '),
          rCode('let', ['pro']),
          rPro(' hanya kalau nilainya memang berubah, seperti skor atau jumlah keranjang.'),
        ],
      }),
      limitStep({
        analogy: t('Variabel const seperti kotak terkunci'),
        same: [
          t(
            'Kotak terkunci tidak bisa diisi ulang.',
            'const tidak bisa diarahkan ke nilai baru, seperti kotak yang tidak bisa ditukar.',
          ),
        ],
        different: [
          t(
            'Kalau isinya daftar, kamu masih boleh menambah barang.',
            'Kalau isinya object atau array, isi di dalamnya tetap bisa diubah.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'mesin-blender',
        t(
          'Masukkan bahan ke kotak, lalu lihat hasilnya.',
          'Simpan beberapa nilai di simulator, lalu amati hasil yang keluar.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a04-l01-q2',
          prompt: t(
            'Skor permainanmu bertambah terus. Kotak mana yang cocok menyimpannya?',
            'Skor pemain bertambah setiap level. Kata kunci mana yang dipakai untuk menyimpannya?',
          ),
          choices: [
            { id: 'let', label: t('Kotak yang bisa diisi ulang', 'let') },
            {
              id: 'const',
              label: t('Kotak yang terkunci', 'const'),
              explainWrong: t(
                'Kotak terkunci menolak skor baru. Skor jadi tidak bisa naik.',
                'const menolak nilai baru dan menimbulkan error saat skor diisi ulang. Skor perlu variabel yang bisa diganti.',
              ),
            },
            {
              id: 'p',
              label: t('Kotak baru untuk setiap skor', 'Tanpa kata kunci: langsung skor = 0'),
              explainWrong: t(
                'Skor lama jadi tercecer di banyak kotak. Cukup 1 kotak yang diisi ulang.',
                'Variabel perlu dideklarasikan dengan let atau const. Tanpa itu, kode rawan bug.',
              ),
            },
          ],
          answer: 'let',
          explainCorrect: t(
            'Skor berubah terus, jadi kotaknya harus bisa diisi ulang. Seperti papan skor yang angkanya ditulis ulang.',
            'let membuat variabel yang nilainya boleh diganti. Skor diisi ulang setiap level.',
          ),
          hints: [t('Ingat papan skor yang angkanya terus diganti.', 'Skor berubah setiap level. Lihat lagi beda let dan const.')],
          tags: ['variabel'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a04-l01-q3',
          prompt: t(
            'Kotak terkunci berisi "Bito". Isinya tidak bisa diganti dengan "Raka".',
            'Setelah const nama = "Bito";, menulis nama = "Raka"; menghasilkan error.',
          ),
          answer: true,
          explainCorrect: t(
            'Kotak terkunci tidak bisa diisi ulang. Isi "Bito" tetap di dalamnya.',
            'const melarang pengisian ulang. JavaScript menolaknya dengan error.',
          ),
          explainWrong: t(
            'Kotak terkunci menolak isi baru. Jadi "Raka" tidak bisa masuk.',
            'Variabel const tidak boleh diisi ulang. Percobaan itu pasti error.',
          ),
          hints: [t('Ingat kotak yang digembok.', 'Ingat aturan const: tidak boleh diisi ulang.')],
          tags: ['variabel'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l01-q4',
          type: 'limit',
          analogy: t('Variabel const sebagai kotak terkunci'),
          difficulty: 2,
          prompt: t(
            'Kotak terkunci berisi daftar buku. Apa yang masih boleh dilakukan?',
            'Setelah const keranjang = ["buku"];, tindakan mana yang masih boleh dilakukan?',
          ),
          choices: [
            {
              id: 'push',
              label: t('Menambah buku ke dalam daftar', 'Menambah item dengan keranjang.push("tas")'),
            },
            {
              id: 're',
              label: t('Menukar seluruh daftar dengan daftar lain', 'Menulis keranjang = ["tas"]'),
              explainWrong: t(
                'Menukar daftar berarti mengisi ulang kotak. Kotak terkunci menolaknya.',
                'Menulis ulang variabel const ditolak JavaScript. Yang boleh hanya mengubah isi array.',
              ),
            },
            {
              id: 'del',
              label: t('Membuka kunci kotak lalu mengganti isinya', 'Mengubah const menjadi let saat program berjalan'),
              explainWrong: t(
                'Kotak terkunci tidak bisa dibuka kuncinya. Kuncinya tetap terpasang.',
                'Deklarasi tidak bisa diganti saat program berjalan. const tetap const.',
              ),
            },
          ],
          answer: 'push',
          explainCorrect: t(
            'Kunci hanya menolak isi ulang. Daftar di dalamnya masih boleh bertambah.',
            'const mengunci variabelnya, bukan isi array. Item baru tetap bisa ditambahkan.',
          ),
          hints: [t('Ingat lagi kartu Mirip, tetapi berbeda.', 'Bedakan variabelnya dan isi array di dalamnya.')],
          tags: ['variabel'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l01-q5j',
          type: 'scenario',
          modes: ['junior'],
          difficulty: 2,
          story: t('Rani punya dua kotak. Satu untuk tanggal lahir, satu untuk umur.'),
          prompt: t('Kotak mana yang sebaiknya terkunci?'),
          choices: [
            { id: 'lahir', label: t('Kotak tanggal lahir') },
            {
              id: 'umur',
              label: t('Kotak umur Rani sekarang'),
              explainWrong: t('Umur bertambah setiap tahun. Kotaknya perlu bisa diisi ulang.'),
            },
            {
              id: 'poin',
              label: t('Kotak jumlah poin permainan'),
              explainWrong: t('Poin bisa naik kapan saja. Kotaknya perlu bisa diisi ulang.'),
            },
          ],
          answer: 'lahir',
          explainCorrect: t('Tanggal lahir tidak pernah berubah. Jadi kotaknya cocok dikunci.'),
          hints: [t('Pikirkan isi yang tidak akan pernah berubah.')],
          tags: ['variabel'],
        }),
      ),
      qStep({
        id: 'a04-l01-q5',
        type: 'spotbug',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Ketuk baris yang menyebabkan error karena mengubah nilai const.'),
        lines: ['const kota = "Makassar";', 'let jumlah = 1;', 'kota = "Bandung";'],
        answer: [3],
        explainCorrect: t('Baris 3 mengisi ulang kota, padahal kota dibuat dengan const.'),
        hints: hint(t('Cari baris yang mengisi ulang variabel const.')),
        tags: ['variabel'],
      }),
      qStep({
        id: 'a04-l01-q6',
        type: 'fill',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Lengkapi deklarasi variabel yang nilainya bisa berubah menjadi 10.'),
        template: '___ nilai = 5;\nnilai = 10;',
        bank: ['let', 'const', 'class'],
        answer: ['let'],
        explainCorrect: t('let membolehkan variabel diisi nilai baru. Di sini nilai berubah dari 5 menjadi 10.'),
        hints: hint(t('Pilih kata kunci untuk nilai yang boleh diganti.')),
        tags: ['variabel'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a04-l01-r1',
        prompt: t(
          'Kotak mana yang isinya tidak akan diganti lagi?',
          'Kata kunci mana yang dipakai untuk nilai yang tidak akan diganti?',
        ),
        choices: [
          { id: 'c', label: t('Kotak yang terkunci', 'const') },
          {
            id: 'l',
            label: t('Kotak yang bisa diisi ulang', 'let'),
            explainWrong: t(
              'Kotak ini boleh diisi ulang kapan saja.',
              'let dipakai untuk nilai yang berubah-ubah.',
            ),
          },
          {
            id: 'o',
            label: t('Kotak yang paling besar', 'Tanpa kata kunci'),
            explainWrong: t(
              'Ukuran kotak tidak menjaga isinya. Kunci yang menjaga isi.',
              'Tanpa kata kunci, variabel tidak dideklarasikan dengan benar.',
            ),
          },
        ],
        answer: 'c',
        explainCorrect: t(
          'Kotak terkunci menolak isi baru. Cocok untuk isi yang tidak diganti.',
          'const menjaga nilai variabel supaya tidak diganti tanpa sengaja.',
        ),
        hints: [t('Ingat kotak yang digembok.', 'Cari kata kunci yang berarti tetap.')],
        tags: ['variabel'],
      }),
      makeTf({
        id: 'a04-l01-r2',
        prompt: t(
          'Sebaiknya mulai dengan kotak terkunci, lalu ganti kalau isinya berubah.',
          'Sebaiknya mulai dengan const, lalu ganti ke let kalau nilainya perlu berubah.',
        ),
        answer: true,
        explainCorrect: t(
          'Kotak terkunci lebih aman dari perubahan tanpa sengaja. Seperti lemari yang digembok.',
          'Kode lebih aman dari perubahan yang tidak disengaja.',
        ),
        explainWrong: t(
          'Mulai dari kotak terkunci. Ganti hanya kalau isinya memang berubah.',
          'Praktik yang baik: mulai dari const, pindah ke let bila perlu.',
        ),
        hints: [t('Ingat lemari yang digembok.', 'Pikirkan mana yang lebih aman sebagai pilihan awal.')],
        tags: ['variabel'],
      }),
    ],
    recap: t(
      'Variabel itu kotak berlabel: const terkunci, let bisa diisi ulang.',
      'Pakai const sebagai pilihan awal. Pakai let kalau nilai perlu diisi ulang.',
    ),
    companion: {
      talkPrompts: ['Mana yang berubah, tanggal lahirmu atau umurmu?'],
      offlineActivity:
        'Beri label "const" dan "let" di dua gelas, lalu coba ganti isi gelas let dengan kelereng berbeda jumlah.',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // A4-L02 Tipe data
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a04-l02',
    worldId: 'a04',
    title: 'Tipe data',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengelompokkan isi kotak menjadi 5 jenis.',
      'Kamu bisa mengenali lima tipe data dasar: String, Number, Boolean, Array, dan Object.',
    ),
    estMinutes: 5,
    introducesTerms: ['tipe-data'],
    usesTerms: ['variabel', 'javascript'],
    warmupFrom: 'a04-l01',
    atWork: 'Kamu akan mengecek tipe data di Console saat total belanja muncul sebagai "255", bukan 30.',
    steps: [
      storyStep('a04/rak-isi-kotak.svg', [
        rText(
          'Isi kotak di pabrik macam-macam. Ada tulisan nama, angka jumlah, dan daftar belanja. Apa nama jenis-jenisnya?',
          'Total belanja di kode Toko Rani bisa salah kalau angka terbaca sebagai teks. Karena itu JavaScript membedakan tipe data, yaitu jenis tiap nilai.',
        ),
      ]),
      conceptStep({
        title: t('Teks, angka, ya atau tidak', 'String, Number, Boolean'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'tipe-primitif' },
        alt: t(
          'Tulisan memakai kutip. Angka tanpa kutip. Ya atau tidak.',
          'String memakai tanda kutip, Number berupa angka polos, Boolean hanya true atau false.',
        ),
        code: {
          lang: 'js',
          code: 'const nama = "Tas";     // String\nconst harga = 90000;    // Number\nconst ada = true;       // Boolean',
        },
        body: [
          rTerm('tipe-data', 'Tipe data', 'Tipe data'),
          rJunior(
            ' adalah jenis isi kotak. Tulisan memakai tanda kutip, angka ditulis polos. Ya atau tidak hanya punya 2 isi.',
          ),
          rPro(
            ' adalah jenis sebuah nilai. String (teks) memakai tanda kutip, seperti "Tas". Number berupa angka tanpa kutip. Boolean hanya bernilai true atau false.',
          ),
        ],
      }),
      qStep({
        id: 'a04-l02-q1',
        type: 'sort',
        difficulty: 1,
        prompt: t(
          'Kelompokkan isi kotak: pakai tanda kutip atau tanpa tanda kutip.',
          'Kelompokkan nilai ke String, atau ke Number dan Boolean.',
        ),
        items: [
          { id: 'v1', label: t('"Halo Bito"') },
          { id: 'v2', label: t('42') },
          { id: 'v3', label: t('Ya', 'true') },
          { id: 'v4', label: t('Tidak', 'false') },
        ],
        bins: [
          { id: 'str', label: t('Pakai kutip', 'String (teks)'), icon: 'file-text' },
          { id: 'num', label: t('Tanpa kutip', 'Number atau Boolean'), icon: 'box' },
        ],
        answer: { v1: 'str', v2: 'num', v3: 'num', v4: 'num' },
        explainCorrect: t(
          'Isi berkutip adalah tulisan. Angka dan ya atau tidak ditulis polos.',
          'String selalu memakai tanda kutip. Number dan Boolean ditulis tanpa kutip.',
        ),
        hints: hint(t('Lihat awal dan akhir setiap isi.', 'Cari nilai yang memakai tanda kutip.')),
        tags: ['tipe-data'],
      }),
      conceptStep({
        title: t('Daftar dan kartu isian', 'Array dan Object'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'array-object' },
        alt: t(
          'Daftar berurutan dan kartu isian berlabel.',
          'Array berisi daftar berurutan. Object berisi pasangan label dan nilai.',
        ),
        code: {
          lang: 'js',
          code: 'const warna = ["merah", "biru"]; // Array\nconst produk = { nama: "Tas", harga: 90000 }; // Object',
        },
        body: [
          rJunior(
            'Daftar menyimpan banyak isi berurutan, seperti daftar belanja. Kartu isian menyimpan banyak isi berlabel, seperti kartu biodata.',
          ),
          rPro('Array '),
          rCode('[...]', ['pro']),
          rPro(' adalah daftar berurutan. Object '),
          rCode('{...}', ['pro']),
          rPro(' adalah kumpulan pasangan label dan nilai, seperti nama dan harga.'),
        ],
      }),
      limitStep({
        analogy: t('Jenis isi kotak penyimpanan'),
        same: [
          t(
            'Setiap jenis isi punya bentuk berbeda supaya tidak tertukar.',
            'Setiap tipe punya bentuk penulisan berbeda supaya tidak tertukar.',
          ),
        ],
        different: [
          t(
            'Angka dengan kutip dianggap tulisan, bukan angka.',
            '"25" dengan kutip adalah String. "25" + 5 menghasilkan "255", bukan 30.',
          ),
        ],
        riskyAnalogy: false,
      }),
      simStep(
        'mesin-blender',
        t(
          'Lihat jenis bahan yang masuk dan jus yang keluar.',
          'Perhatikan tipe data masukan dan hasil di simulasi fungsi.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a04-l02-q2',
          prompt: t(
            'Daftar belanja berisi apel, jeruk, dan mangga. Itu jenis isi apa?',
            'Bentuk mana yang berupa Array?',
          ),
          choices: [
            { id: 'arr', label: t('Daftar berurutan', '["apel", "jeruk", "mangga"]') },
            {
              id: 'obj',
              label: t('Kartu isian berlabel', '{ nama: "apel", harga: 5000 }'),
              explainWrong: t(
                'Kartu isian punya label di tiap isi. Daftar belanja tidak punya label.',
                'Kurung kurawal berisi pasangan label dan nilai. Itu Object.',
              ),
            },
            {
              id: 'str',
              label: t('Satu tulisan saja', '"apel"'),
              explainWrong: t(
                'Satu tulisan hanya punya satu isi. Daftar belanja punya banyak isi.',
                '"apel" hanya satu String, bukan daftar.',
              ),
            },
          ],
          answer: 'arr',
          explainCorrect: t(
            'Daftar berurutan memuat banyak isi. Seperti daftar belanja di kertas.',
            'Array dibungkus kurung siku dan berisi daftar berurutan.',
          ),
          hints: [t('Ingat daftar belanja di kertas.', 'Cari bentuk yang memakai kurung siku.')],
          tags: ['tipe-data'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l02-q3',
          prompt: t(
            'Rani mau mencatat nama, harga, dan stok satu barang. Pakai jenis apa?',
            'Satu barang punya nama, harga, dan stok. Tipe data mana yang menyimpan ketiganya bersama?',
          ),
          choices: [
            { id: 'obj', label: t('Kartu isian', 'Object') },
            {
              id: 'bool',
              label: t('Jawaban ya atau tidak', 'Array'),
              explainWrong: t(
                'Ya atau tidak hanya punya 2 isi. Kartu barang butuh lebih banyak.',
                'Array menyimpan daftar berurutan tanpa label nama.',
              ),
            },
            {
              id: 'num',
              label: t('Satu angka saja', 'Number'),
              explainWrong: t(
                'Satu angka tidak cukup untuk nama dan harga.',
                'Number hanya menyimpan satu angka.',
              ),
            },
          ],
          answer: 'obj',
          explainCorrect: t(
            'Kartu isian menyimpan banyak isi berlabel. Seperti kartu biodata.',
            'Object menyimpan beberapa nilai berlabel dalam satu benda.',
          ),
          hints: [t('Ingat kartu biodata dengan banyak isian.', 'Cari tipe yang punya label untuk tiap nilai.')],
          tags: ['tipe-data'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l02-q4',
          type: 'limit',
          analogy: t('Tipe data di kotak berlabel'),
          modes: ['pro'],
          difficulty: 2,
          prompt: t('Apa beda "10" dan 10 di JavaScript?'),
          choices: [
            { id: 'str', label: t('"10" adalah teks, 10 adalah angka untuk berhitung') },
            {
              id: 'eq',
              label: t('Keduanya sama di semua operasi hitung dan gabung teks'),
              explainWrong: t('"10" + 5 menghasilkan "105". 10 + 5 menghasilkan 15.'),
            },
            {
              id: 'err',
              label: t('Tanda kutip membuat "10" tidak valid'),
              explainWrong: t('String "10" tetap valid. Tanda kutip hanya menandai teks.'),
            },
          ],
          answer: 'str',
          explainCorrect: t('Tanda kutip mengubah angka menjadi teks. Teks digabung, bukan dijumlahkan.'),
          hints: [t('Coba hitung "10" + 5 dan 10 + 5.')],
          tags: ['tipe-data'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l02-q4j',
          type: 'scenario',
          modes: ['junior'],
          difficulty: 2,
          story: t('Kotak A berisi angka 5. Kotak B berisi "5" dengan kutip.'),
          prompt: t('Apa isi kotak B?'),
          choices: [
            { id: 'teks', label: t('Tulisan, bukan angka') },
            {
              id: 'angka',
              label: t('Angka yang sama seperti kotak A'),
              explainWrong: t('Angka ditulis tanpa kutip. Kutip membuat isinya tulisan.'),
            },
            {
              id: 'daftar',
              label: t('Daftar berisi satu angka'),
              explainWrong: t('Daftar tidak memakai tanda kutip. Tanda kutip menandai tulisan.'),
            },
          ],
          answer: 'teks',
          explainCorrect: t('Tanda kutip mengubah angka menjadi tulisan. Tulisan tidak bisa dijumlahkan.'),
          hints: [t('Lihat tanda kutipnya.')],
          tags: ['tipe-data'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a04-l02-q5',
          prompt: t(
            'Jenis ya atau tidak hanya punya dua isi.',
            'Tipe Boolean hanya punya dua nilai: true atau false.',
          ),
          answer: true,
          explainCorrect: t(
            'Isinya hanya ya atau tidak. Cocok untuk status, seperti sudah lunas.',
            'Boolean cocok untuk status, seperti sudahLogin atau lunas.',
          ),
          explainWrong: t(
            'Jenis ini hanya punya dua isi: ya dan tidak.',
            'Boolean hanya punya dua nilai: true dan false.',
          ),
          hints: [t('Ingat saklar lampu: hidup atau mati.', 'Boolean berarti benar atau salah.')],
          tags: ['tipe-data'],
        }),
      ),
      qStep({
        id: 'a04-l02-q6',
        type: 'type',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Apa hasil "2" + 5 di JavaScript? Tulis dengan atau tanpa kutip.'),
        accept: ['25', '"25"', "'25'"],
        explainCorrect: t('Karena "2" adalah String, operator + menggabungkannya menjadi teks "25".'),
        hints: hint(t('"2" memakai kutip, jadi dibaca sebagai teks.')),
        tags: ['tipe-data'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a04-l02-r1',
        prompt: t(
          'Isi "ya" dan "tidak" termasuk jenis apa?',
          'Nilai true dan false termasuk tipe data apa?',
        ),
        choices: [
          { id: 'b', label: t('Ya atau tidak', 'Boolean') },
          {
            id: 'a',
            label: t('Daftar', 'Array'),
            explainWrong: t('Daftar berisi banyak isi berurutan.', 'Array adalah daftar item di dalam [ ].'),
          },
          {
            id: 'o',
            label: t('Tulisan', 'String'),
            explainWrong: t('Tulisan memakai tanda kutip.', 'String memakai tanda kutip.'),
          },
        ],
        answer: 'b',
        explainCorrect: t(
          'Jenis ini hanya punya dua isi: ya atau tidak.',
          'Boolean bernilai benar (true) atau salah (false).',
        ),
        hints: [t('Ingat saklar lampu.', 'Cari tipe yang hanya punya dua nilai.')],
        tags: ['tipe-data'],
      }),
      makeMcq({
        id: 'a04-l02-r2',
        prompt: t(
          'Nama dan umur dicatat dalam satu kartu biodata. Itu jenis apa?',
          'Kurung kurawal { nama: "Buku", harga: 25000 } membentuk tipe data apa?',
        ),
        choices: [
          { id: 'o', label: t('Kartu isian', 'Object') },
          {
            id: 'n',
            label: t('Satu angka', 'Number'),
            explainWrong: t('Satu angka tidak cukup untuk nama dan umur.', 'Number hanya berisi angka tunggal.'),
          },
          {
            id: 'a',
            label: t('Satu tulisan', 'Array'),
            explainWrong: t('Satu tulisan hanya punya satu isi.', 'Array berisi daftar berurutan tanpa label.'),
          },
        ],
        answer: 'o',
        explainCorrect: t(
          'Kartu isian menyimpan isi berlabel, seperti nama dan umur.',
          'Object menyimpan pasangan label dan nilai.',
        ),
        hints: [t('Ingat kartu biodata.', 'Cari tipe yang punya label dan nilai.')],
        tags: ['tipe-data'],
      }),
    ],
    recap: t(
      'Isi kotak punya jenis: teks, angka, ya atau tidak, daftar, dan kartu.',
      'Lima tipe dasar: String, Number, Boolean, Array, Object. "10" dengan kutip adalah String, bukan angka.',
    ),
    companion: {
      talkPrompts: ['Di biodatamu, mana yang tulisan dan mana yang angka?'],
      offlineActivity: 'Tuliskan satu Object fiktif di kertas untuk benda di meja: { nama: "Botol", penuh: true }.',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // A4-L03 Kondisi dan perulangan
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a04-l03',
    worldId: 'a04',
    title: 'Kondisi dan perulangan',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membaca aturan kalau-maka dan perulangan isi daftar.',
      'Kamu bisa menulis kondisi if/else dan perulangan forEach pada array.',
    ),
    estMinutes: 6,
    introducesTerms: ['kondisi'],
    usesTerms: ['variabel', 'tipe-data'],
    warmupFrom: 'a04-l02',
    atWork:
      'Kamu akan memakai if/else untuk menampilkan "Habis" saat stok nol, dan forEach untuk menampilkan daftar produk.',
    steps: [
      storyStep('a04/persimpangan.svg', [
        rText(
          'Di pabrik ada persimpangan jalan. Lampu hijau berarti jalan, lampu merah berarti berhenti. Bagaimana mesin bisa memilih seperti itu?',
          'Program sering harus memilih jalur, misalnya menampilkan "Habis" saat stok nol. Pilihan itu disebut kondisi, dan mengulang tugas disebut perulangan.',
        ),
      ]),
      conceptStep({
        title: t('Aturan kalau-maka', 'Kondisi if / else'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'kondisi-if' },
        alt: t(
          'Jalan bercabang: stok ada, tampil Ada. Stok habis, tampil Habis.',
          'Cabang if stok > 0 menampilkan Ada, else menampilkan Habis.',
        ),
        code: {
          lang: 'js',
          code: 'if (stok > 0) {\n  tampilkan("Ada");\n} else {\n  tampilkan("Habis");\n}',
        },
        body: [
          rTerm('kondisi', 'Kondisi', 'Kondisi'),
          rJunior(' adalah aturan kalau-maka. Kalau stok masih ada, tampilkan Ada. Kalau tidak, tampilkan Habis.'),
          rPro(' adalah pemeriksaan syarat yang hasilnya true atau false. Kalau true, kode di '),
          rCode('if', ['pro']),
          rPro(' berjalan. Kalau false, kode di '),
          rCode('else', ['pro']),
          rPro(' berjalan.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a04-l03-q1',
          prompt: t(
            'Aturan toko: stok ada tampil Ada, stok habis tampil Habis. Kalau stok 0, apa yang tampil?',
            'Stok bernilai 0. Apa yang tampil dari if (stok > 0) { tampil("Ada"); } else { tampil("Habis"); }?',
          ),
          choices: [
            { id: 'habis', label: t('Habis') },
            {
              id: 'ada',
              label: t('Ada'),
              explainWrong: t(
                'Ada hanya tampil kalau stok lebih dari 0. Sekarang stok 0.',
                '0 tidak lebih besar dari 0, jadi cabang else yang berjalan.',
              ),
            },
            {
              id: 'both',
              label: t('Ada dan Habis sekaligus', 'Keduanya tampil'),
              explainWrong: t(
                'Aturan kalau-maka hanya memilih satu jalan. Dua tulisan tidak tampil bersamaan.',
                'if/else hanya menjalankan satu cabang.',
              ),
            },
          ],
          answer: 'habis',
          explainCorrect: t(
            'Stok 0 tidak lebih dari 0, jadi jalan kedua dipilih. Yang tampil Habis.',
            'Karena 0 > 0 bernilai false, kode masuk ke blok else.',
          ),
          hints: [t('Cek dulu: apakah 0 lebih dari 0?', 'Periksa hasil 0 > 0: true atau false?')],
          tags: ['kondisi'],
        }),
      ),
      conceptStep({
        title: t('Mengulang untuk semua isi', 'Mengulang isi daftar'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'perulangan' },
        alt: t(
          'Ban berjalan membawa barang satu per satu.',
          'Ban berjalan memproses setiap item array satu per satu.',
        ),
        code: {
          lang: 'js',
          code: 'daftar.forEach((item) => {\n  tampilkan(item);\n});',
        },
        body: [
          rJunior(
            'Bayangkan ban berjalan di pabrik. Mesin memeriksa barang satu per satu sampai habis. Perulangan mengerjakan semua isi daftar secara otomatis.',
          ),
          rPro(
            'Daripada menulis kode yang sama 100 kali, perulangan mengerjakan tiap isi daftar secara otomatis. Pada array, ',
          ),
          rCode('forEach', ['pro']),
          rPro(' menjalankan satu fungsi untuk setiap item.'),
        ],
      }),
      limitStep({
        analogy: t('Persimpangan jalan dan ban berjalan'),
        same: [
          t(
            'Kondisi memilih satu jalan saja.',
            'Kondisi memilih satu cabang, perulangan memproses tiap item berurutan.',
          ),
        ],
        different: [
          t(
            'Komputer tidak bisa menebak. Aturannya harus pasti.',
            'Syarat harus tegas, seperti stok > 0, karena komputer tidak menebak maksud yang kabur.',
          ),
        ],
        riskyAnalogy: false,
      }),
      simStep(
        'mesin-blender',
        t(
          'Lihat mesin memeriksa bahan dan memilih hasilnya.',
          'Uji alur percabangan nilai masukan dan hasilnya di simulator.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a04-l03-q2',
          type: 'analogy',
          prompt: t(
            'Pak Udin memeriksa 50 barang dengan aturan yang sama. Apa yang cocok dipakai?',
            'Satu perintah yang sama perlu dijalankan untuk 50 produk di gudang. Apa yang paling cocok?',
          ),
          choices: [
            { id: 'loop', label: t('Perulangan, seperti ban berjalan', 'Perulangan forEach') },
            {
              id: 'copy',
              label: t('Menulis aturan sendiri untuk tiap barang', 'Menulis 50 baris kode secara manual'),
              explainWrong: t(
                'Menulis 50 kali bisa, tetapi lama dan mudah salah. Perulangan lebih hemat.',
                'Menulis manual lama dan rawan salah ketik. Perulangan jauh lebih singkat.',
              ),
            },
            {
              id: 'css',
              label: t('Kondisi, seperti persimpangan jalan', 'Kondisi if/else untuk tiap produk'),
              explainWrong: t(
                'Kondisi memilih satu jalan. Kondisi tidak mengulang kerja.',
                'Kondisi memilih satu cabang, bukan mengulang tugas.',
              ),
            },
          ],
          answer: 'loop',
          explainCorrect: t(
            'Perulangan mengerjakan semua isi daftar sendiri. Seperti ban berjalan yang tidak berhenti.',
            'Perulangan menjalankan kode yang sama untuk setiap isi daftar. Kode tidak perlu ditulis berulang.',
          ),
          hints: [t('Ingat ban berjalan yang membawa semua barang.', 'Cari cara yang tidak menulis kode berulang.')],
          tags: ['kondisi'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a04-l03-q3',
          prompt: t(
            'Dalam aturan kalau-maka, dua jalan dijalankan sekaligus.',
            'Dalam satu blok if/else, kedua cabang bisa berjalan sekaligus.',
          ),
          answer: false,
          explainCorrect: t(
            'Hanya satu jalan yang dipilih. Seperti mobil di persimpangan yang belok satu arah.',
            'Pernyataan itu keliru: if/else hanya menjalankan satu cabang, sesuai hasil syarat.',
          ),
          explainWrong: t(
            'Mobil tidak bisa belok ke dua arah sekaligus. Hanya satu jalan dipilih.',
            'Hanya satu cabang yang dijalankan, sesuai hasil syarat.',
          ),
          hints: [t('Ingat mobil di persimpangan.', 'Ingat: syarat hanya punya satu hasil, true atau false.')],
          tags: ['kondisi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l03-q4',
          type: 'limit',
          analogy: t('Persimpangan jalan if/else'),
          modes: ['pro'],
          difficulty: 2,
          prompt: t('Mengapa syarat if tidak boleh kabur, seperti if (harga cukup murah)?'),
          choices: [
            { id: 'exact', label: t('Syarat harus pasti, misalnya harga < 50000') },
            {
              id: 'num',
              label: t('JavaScript menebak maksud syaratnya, tetapi sering salah'),
              explainWrong: t('JavaScript tidak menebak. Syarat yang kabur menghasilkan error.'),
            },
            {
              id: 'text',
              label: t('Syarat if hanya boleh berisi satu kata'),
              explainWrong: t('Syarat if boleh panjang. Yang penting, JavaScript bisa menilainya benar atau salah.'),
            },
          ],
          answer: 'exact',
          explainCorrect: t(
            'if butuh syarat yang bisa dinilai benar atau salah. Perbandingan seperti harga < 50000 memenuhinya.',
          ),
          hints: [t('Syarat harus bisa dijawab true atau false.')],
          tags: ['kondisi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l03-q4j',
          type: 'scenario',
          modes: ['junior'],
          difficulty: 1,
          story: t('Aturan toko: stok ada tampil Ada, stok habis tampil Habis.'),
          prompt: t('Kalau stok 5, tulisan apa yang tampil?'),
          choices: [
            { id: 'ada', label: t('Ada') },
            {
              id: 'habis',
              label: t('Habis'),
              explainWrong: t('Habis hanya tampil kalau stok 0. Stok 5 berarti barang masih ada.'),
            },
            {
              id: 'none',
              label: t('Tidak ada tulisan'),
              explainWrong: t('Salah satu jalan selalu dipilih. Stok 5 membuat tulisan Ada tampil.'),
            },
          ],
          answer: 'ada',
          explainCorrect: t('Stok 5 lebih dari 0, jadi jalan pertama dipilih. Yang tampil Ada.'),
          hints: [t('Apakah 5 lebih dari 0?')],
          tags: ['kondisi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l03-q5',
          type: 'scenario',
          difficulty: 2,
          story: t(
            'Toko Rani memberi gratis ongkir untuk belanja 100.000 rupiah atau lebih.',
            'Toko Rani memberi gratis ongkir untuk belanja mulai 100000.',
          ),
          prompt: t('Dimas belanja 120.000 rupiah. Apakah ongkirnya gratis?', 'Syarat if mana yang tepat?'),
          choices: [
            {
              id: 'ge',
              label: t('Ya, ongkirnya gratis', 'if (total >= 100000)'),
            },
            {
              id: 'lt',
              label: t('Tidak, belanjanya kurang', 'if (total < 100000)'),
              explainWrong: t(
                '120.000 lebih banyak dari 100.000. Belanja Dimas sudah cukup.',
                '< berarti kurang dari 100000, kebalikan dari syarat yang diminta.',
              ),
            },
            {
              id: 'eq',
              label: t('Tidak, harus tepat 100.000', 'if (total === 100000)'),
              explainWrong: t(
                'Aturannya 100.000 atau lebih. 120.000 sudah termasuk.',
                '=== 100000 hanya benar kalau total tepat 100000, bukan lebih.',
              ),
            },
          ],
          answer: 'ge',
          explainCorrect: t(
            '120.000 lebih dari 100.000. Jadi ongkir Dimas gratis.',
            'Tanda >= berarti lebih besar atau sama dengan 100000.',
          ),
          hints: [t('Baca lagi syarat gratis ongkir Toko Rani.', 'Cari tanda yang berarti lebih besar atau sama dengan.')],
          tags: ['kondisi'],
        }),
      ),
      qStep({
        id: 'a04-l03-q6',
        type: 'fill',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Lengkapi method perulangan array untuk menampilkan setiap nama buah.'),
        template: 'buah.___((nama) => console.log(nama));',
        bank: ['forEach', 'textContent', 'querySelector'],
        answer: ['forEach'],
        explainCorrect: t('forEach menjalankan fungsi untuk setiap elemen di dalam array.'),
        hints: hint(t('Cari method yang menjalankan fungsi untuk tiap item.')),
        tags: ['kondisi'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a04-l03-r1',
        prompt: t(
          'Kapan jalan kedua dari aturan kalau-maka dipakai?',
          'Kapan blok else di dalam if/else dijalankan?',
        ),
        choices: [
          { id: 'f', label: t('Saat syaratnya tidak terpenuhi', 'Saat syarat if bernilai false') },
          {
            id: 't',
            label: t('Saat syaratnya terpenuhi', 'Saat syarat if bernilai true'),
            explainWrong: t(
              'Kalau syaratnya terpenuhi, jalan pertama yang dipakai.',
              'Kalau syarat bernilai true, yang jalan adalah blok if.',
            ),
          },
          {
            id: 'o',
            label: t('Selalu, sebelum jalan pertama', 'Selalu, sesudah blok if selesai'),
            explainWrong: t(
              'Hanya satu jalan yang dipilih. Jalan kedua tidak selalu dipakai.',
              'if/else hanya menjalankan satu blok, bukan keduanya berurutan.',
            ),
          },
        ],
        answer: 'f',
        explainCorrect: t(
          'Jalan kedua dipakai saat syarat tidak terpenuhi. Itu jalan cadangan.',
          'else adalah jalur cadangan saat syarat if tidak terpenuhi.',
        ),
        hints: [t('Ingat lampu merah di persimpangan.', 'Ingat: else berarti selain itu.')],
        tags: ['kondisi'],
      }),
      makeTf({
        id: 'a04-l03-r2',
        prompt: t(
          'Perulangan mengerjakan tugas yang sama untuk setiap isi daftar.',
          'Perulangan forEach berguna untuk mengerjakan tugas yang sama bagi setiap isi array.',
        ),
        answer: true,
        explainCorrect: t(
          'Perulangan memproses isi daftar satu per satu. Seperti ban berjalan.',
          'forEach memproses tiap item array satu per satu.',
        ),
        explainWrong: t(
          'Perulangan memproses setiap isi daftar satu per satu.',
          'forEach memproses tiap item array satu per satu.',
        ),
        hints: [t('Ingat ban berjalan di pabrik.', 'Pikirkan satu perintah untuk banyak item.')],
        tags: ['kondisi'],
      }),
    ],
    recap: t(
      'Kondisi memilih jalan, perulangan memproses semua isi daftar.',
      'Gunakan if/else untuk keputusan true atau false, dan forEach untuk memproses daftar.',
    ),
    companion: {
      talkPrompts: ['Kalau lampu merah, apa yang dilakukan mobil? Kalau hijau?'],
      offlineActivity: 'Tulis aturan if/else untuk permainan tebak lampu lalu lintas bersama.',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // A4-L04 Fungsi: blender
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a04-l04',
    worldId: 'a04',
    title: 'Fungsi: blender',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menunjuk bahan masuk dan hasil keluar pada fungsi.',
      'Kamu bisa membuat dan memanggil fungsi dengan parameter dan return.',
    ),
    estMinutes: 6,
    introducesTerms: ['fungsi'],
    usesTerms: ['variabel', 'tipe-data', 'javascript'],
    warmupFrom: 'a04-l03',
    atWork:
      'Kamu akan menulis fungsi seperti hitungTotal supaya rumus harga tidak ditulis ulang di setiap halaman toko.',
    steps: [
      storyStep('a04/blender.svg', [
        rText(
          'Bito punya mesin blender di pabrik. Ia memasukkan buah, menekan tombol, lalu jus keluar. Bisakah kode bekerja seperti blender?',
          'Total belanja Toko Rani dihitung di banyak tempat dengan rumus yang sama. Rumus itu bisa dibungkus sekali sebagai fungsi, yaitu langkah kerja bernama yang bisa dipanggil ulang.',
        ),
      ]),
      conceptStep({
        title: t('Bahan masuk, hasil keluar', 'Parameter dan return'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'fungsi-blender' },
        alt: t(
          'Blender menerima bahan dan mengeluarkan hasil.',
          'Fungsi menerima parameter dan mengembalikan nilai lewat return.',
        ),
        code: {
          lang: 'js',
          code: 'function hitungTotal(harga, jumlah) {\n  return harga * jumlah;\n}\nhitungTotal(90000, 2); // 180000',
        },
        body: [
          rTerm('fungsi', 'Fungsi', 'Fungsi'),
          rJunior(' adalah mesin blender bernama. Bahan masuk dari atas, hasil keluar dari bawah.'),
          rPro(' adalah langkah kerja bernama. Fungsi menerima masukan (parameter), memprosesnya, lalu memberi hasil lewat '),
          rCode('return', ['pro']),
          rPro('.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a04-l04-q1',
          type: 'analogy',
          prompt: t(
            'Blender butuh buah untuk membuat jus. Di fungsi, buah itu apa?',
            'Kalau hitungTotal(harga, jumlah) adalah mesin blender, harga dan jumlah itu apa?',
          ),
          choices: [
            { id: 'par', label: t('Bahan masuk', 'Bahan yang dimasukkan') },
            {
              id: 'ret',
              label: t('Jus yang dituang', 'Jus yang dituang keluar'),
              explainWrong: t(
                'Jus yang dituang adalah hasil keluar. Buah adalah bahan yang masuk.',
                'Jus yang keluar adalah hasil, yaitu nilai dari return. Masukannya adalah harga dan jumlah.',
              ),
            },
            {
              id: 'css',
              label: t('Tombol penyala blender', 'Nama mesin blendernya'),
              explainWrong: t(
                'Tombol hanya menyalakan blender. Bahan yang masuk adalah buahnya.',
                'Nama mesin setara dengan nama fungsi, yaitu hitungTotal. Masukannya adalah harga dan jumlah.',
              ),
            },
          ],
          answer: 'par',
          explainCorrect: t(
            'Buah yang dimasukkan adalah bahan masuk. Mesin lalu mengubahnya menjadi jus.',
            'Di definisi fungsi, harga dan jumlah disebut parameter, yaitu nama untuk masukan. Nilai yang dikirim saat memanggil, seperti 90000, disebut argumen.',
          ),
          hints: [t('Ingat buah yang kamu masukkan ke blender.', 'Pikirkan apa yang harus ada sebelum blender dinyalakan.')],
          tags: ['fungsi'],
        }),
      ),
      conceptStep({
        title: t('Satu blender, banyak jus', 'Memanggil fungsi'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'panggil-fungsi' },
        alt: t(
          'Satu blender membuat jus mangga, stroberi, atau alpukat.',
          'Satu fungsi dipanggil berkali-kali dengan masukan berbeda.',
        ),
        body: [
          rJunior(
            'Blender yang sama bisa membuat jus mangga, stroberi, atau alpukat. Cukup panggil namanya dan masukkan bahan baru.',
          ),
          rPro(
            'Fungsi yang sama bisa dipanggil berkali-kali dengan angka berbeda. Cukup tulis namanya, lalu isi tanda kurung dengan masukan baru.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Fungsi seperti mesin blender'),
        same: [
          t(
            'Ada bahan masuk, proses, dan hasil keluar.',
            'Ada parameter masuk, proses di dalam, dan hasil return keluar.',
          ),
        ],
        different: [
          t(
            'Fungsi boleh tanpa bahan masuk, atau tanpa hasil.',
            'Fungsi JavaScript boleh tanpa parameter, atau tanpa hasil return.',
          ),
        ],
        riskyAnalogy: false,
      }),
      simStep(
        'mesin-blender',
        t(
          'Pilih bahan, tekan Putar Blender, lalu lihat hasilnya.',
          'Masukkan nilai ke simulator Mesin Blender, lalu amati hasilnya.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a04-l04-q2',
          prompt: t(
            'Mesin mengalikan harga dengan jumlah. Harga 20.000 dan jumlah 3, berapa hasilnya?',
            'Kalau hitungTotal(20000, 3) memakai return harga * jumlah, hasil apa yang dikembalikan?',
          ),
          choices: [
            { id: '60', label: t('60.000', '60000') },
            {
              id: '23',
              label: t('23.000', '23000'),
              explainWrong: t(
                'Itu hasil menambah 20.000 dan 3. Mesin ini mengalikan.',
                'Operasinya perkalian (*), bukan penjumlahan.',
              ),
            },
            {
              id: '0',
              label: t('6.000', '6000'),
              explainWrong: t(
                'Angka itu kurang satu nol. Hitung ulang 20.000 dikali 3.',
                '20000 × 3 adalah 60000, bukan 6000.',
              ),
            },
          ],
          answer: '60',
          explainCorrect: t(
            '20.000 dikali 3 sama dengan 60.000. Blender mengalikan, bukan menambah.',
            '20000 × 3 = 60000, karena return harga * jumlah mengalikan keduanya.',
          ),
          hints: [t('Hitung 20.000 tiga kali.', 'Hitung 20000 × 3.')],
          tags: ['fungsi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l04-q3',
          prompt: t(
            'Jus sudah jadi di dalam blender. Apa langkah berikutnya supaya Rani bisa meminumnya?',
            'Kata kunci apa yang mengeluarkan hasil dari dalam fungsi supaya bisa dipakai lagi?',
          ),
          choices: [
            { id: 'ret', label: t('Blender menuang jus ke gelas', 'return') },
            {
              id: 'let',
              label: t('Blender menyimpan jus di dalam', 'function'),
              explainWrong: t(
                'Jus yang tersimpan di dalam tidak bisa diminum. Hasil harus dituang dulu.',
                'function hanya membuat fungsi. Kata itu tidak mengeluarkan hasil.',
              ),
            },
            {
              id: 'if',
              label: t('Blender mengecek jus, lalu berhenti', 'if'),
              explainWrong: t(
                'Mengecek jus tidak membuatnya sampai ke gelas. Hasil harus dituang dulu.',
                'if hanya memeriksa syarat. if tidak mengeluarkan hasil.',
              ),
            },
          ],
          answer: 'ret',
          explainCorrect: t(
            'Jus yang dituang ke gelas bisa diminum. Itu hasil dari fungsi.',
            'return mengirim hasil akhir ke pemanggil fungsi.',
          ),
          hints: [t('Pikirkan cara jus sampai ke tangan Rani.', 'Cari kata kunci yang mengembalikan nilai.')],
          tags: ['fungsi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l04-q4',
          type: 'limit',
          analogy: t('Fungsi seperti mesin blender'),
          modes: ['pro'],
          difficulty: 2,
          prompt: t('Pernyataan mana yang berlaku untuk fungsi, tetapi tidak untuk blender?'),
          choices: [
            { id: 'empty', label: t('Fungsi boleh tanpa parameter, misalnya sapaPengunjung()') },
            {
              id: 'reuse',
              label: t('Fungsi bisa dipakai berulang kali'),
              explainWrong: t('Blender juga bisa dipakai berulang kali. Itu kesamaan, bukan beda.'),
            },
            {
              id: 'out',
              label: t('Fungsi mengubah masukan menjadi hasil'),
              explainWrong: t('Blender juga mengubah bahan menjadi jus. Itu kesamaan, bukan beda.'),
            },
          ],
          answer: 'empty',
          explainCorrect: t('Blender kosong tidak menghasilkan jus. Fungsi seperti sapaPengunjung() tetap berjalan tanpa parameter.'),
          hints: [t('Pikirkan fungsi yang hanya menyapa pengunjung.')],
          tags: ['fungsi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l04-q4j',
          type: 'scenario',
          modes: ['junior'],
          difficulty: 2,
          story: t('Rani punya blender di pabrik. Ia memasukkan mangga ke dalamnya.'),
          prompt: t('Apa yang keluar dari blender?'),
          choices: [
            { id: 'jus', label: t('Jus mangga') },
            {
              id: 'utuh',
              label: t('Mangga utuh tanpa diubah'),
              explainWrong: t('Blender mengubah bahan. Mangga utuh tidak keluar lagi.'),
            },
            {
              id: 'lain',
              label: t('Jus dari bahan yang berbeda'),
              explainWrong: t('Hasil selalu dibuat dari bahan yang masuk. Mangga menjadi jus mangga.'),
            },
          ],
          answer: 'jus',
          explainCorrect: t('Blender mengubah bahan menjadi hasil. Mangga menjadi jus mangga.'),
          hints: [t('Mesin mengubah bahan menjadi jus.')],
          tags: ['fungsi'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a04-l04-q5',
          prompt: t(
            'Blender baru bekerja setelah dinyalakan. Fungsi juga baru bekerja setelah dipanggil.',
            'Menulis fungsi tanpa memanggil namanya belum menjalankan kode di dalamnya.',
          ),
          answer: true,
          explainCorrect: t(
            'Blender di meja perlu dinyalakan dulu. Fungsi perlu dipanggil namanya.',
            'Fungsi seperti blender di meja: harus dinyalakan, yaitu dipanggil, supaya bekerja.',
          ),
          explainWrong: t(
            'Blender yang belum dinyalakan tidak bekerja. Fungsi baru bekerja saat dipanggil.',
            'Fungsi baru berjalan saat dipanggil dengan namaFungsi().',
          ),
          hints: [t('Ingat blender yang belum dinyalakan.', 'Bedakan menulis fungsi dan memanggil fungsi.')],
          tags: ['fungsi'],
        }),
      ),
      qStep({
        id: 'a04-l04-q6',
        type: 'fill',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Lengkapi fungsi penjumlahan agar mengembalikan hasil a + b.'),
        template: 'function tambah(a, b) {\n  ___ a + b;\n}',
        bank: ['return', 'const', 'else'],
        answer: ['return'],
        explainCorrect: t('return mengembalikan hasil ekspresi kepada pemanggil fungsi.'),
        hints: hint(t('Cari kata kunci yang mengeluarkan hasil dari fungsi.')),
        tags: ['fungsi'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a04-l04-r1',
        prompt: t(
          'Di fungsi, buah yang masuk ke blender disebut apa?',
          'Nama masukan yang ditulis di definisi fungsi disebut apa?',
        ),
        choices: [
          { id: 'p', label: t('Bahan masuk', 'Parameter') },
          {
            id: 's',
            label: t('Tombol blender', 'Return'),
            explainWrong: t(
              'Tombol hanya menyalakan blender.',
              'Return adalah hasil yang keluar, bukan masukan.',
            ),
          },
          {
            id: 'o',
            label: t('Jus yang keluar', 'Nama fungsi'),
            explainWrong: t(
              'Jus yang keluar adalah hasil, bukan bahan.',
              'Nama fungsi hanya menandai fungsinya.',
            ),
          },
        ],
        answer: 'p',
        explainCorrect: t(
          'Buah adalah bahan masuk. Mesin mengubahnya menjadi hasil.',
          'Parameter menampung nilai yang dikirim saat fungsi dipanggil. Contohnya harga dan jumlah di hitungTotal.',
        ),
        hints: [t('Ingat buah di atas blender.', 'Cari kata untuk masukan fungsi.')],
        tags: ['fungsi'],
      }),
      makeTf({
        id: 'a04-l04-r2',
        prompt: t(
          'Satu blender bisa dipakai berkali-kali dengan bahan berbeda.',
          'Satu fungsi bisa dipanggil berkali-kali dengan nilai masukan berbeda.',
        ),
        answer: true,
        explainCorrect: t(
          'Blender yang sama bisa membuat banyak jus. Fungsi juga begitu.',
          'Itulah guna utama fungsi: kode tidak perlu ditulis berulang.',
        ),
        explainWrong: t(
          'Blender yang sama bisa dipakai lagi dengan bahan lain.',
          'Fungsi dibuat supaya bisa dipakai ulang dengan berbagai masukan.',
        ),
        hints: [t('Ingat satu blender, banyak jus.', 'Pikirkan guna membuat fungsi.')],
        tags: ['fungsi'],
      }),
    ],
    recap: t(
      'Fungsi itu blender bernama: bahan masuk, hasil keluar.',
      'Fungsi membungkus langkah kode yang bisa dipanggil ulang. Parameter menjadi masukan, return menjadi hasil.',
    ),
    companion: {
      talkPrompts: ['Kalau blender menerima mangga, apa yang keluar?'],
      offlineActivity: 'Tulis satu resep fungsi sederhana di kertas, misal hitungDiskon(harga, potongan).',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // A4-L05 DOM dan event: cari, dengar, ubah
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a04-l05',
    worldId: 'a04',
    title: 'DOM dan event: cari, dengar, ubah',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengurutkan 3 langkah tombol: cari, dengar, ubah.',
      'Kamu bisa menjelaskan pohon DOM dan pola querySelector, addEventListener, textContent.',
    ),
    estMinutes: 6,
    introducesTerms: ['dom', 'event'],
    usesTerms: ['html', 'javascript', 'browser'],
    stickerId: 'pohon-dom',
    warmupFrom: 'a04-l04',
    atWork:
      'Kamu akan memakai pola cari, dengar, ubah untuk membuat tombol "Tambah ke keranjang" bereaksi saat diklik.',
    steps: [
      storyStep('a04/pohon-dom.svg', [
        rText(
          'Isi halaman web tersusun seperti pohon keluarga. JavaScript bisa memanjat pohon itu dan mengubah daunnya. Bagaimana caranya?',
          'Tombol "Suka" di halaman Toko Rani perlu berubah saat diklik. Caranya lewat DOM, yaitu pohon yang menggambarkan isi halaman.',
        ),
      ]),
      conceptStep({
        title: t('Pohon halaman dan cara mencarinya', 'DOM: jembatan ke halaman'),
        visualName: 'HtmlTreeDiagram',
        visualProps: { worldId: 'a04', topic: 'pohon-dom' },
        alt: t(
          'Pohon halaman bercabang dari atas ke tombol.',
          'Pohon DOM bercabang dari akar ke judul, paragraf, dan tombol.',
        ),
        body: [
          rTerm('dom', 'DOM', 'DOM'),
          rJunior(
            ' adalah pohon isi halaman. Setiap judul dan tombol adalah satu cabang. JavaScript mencari cabang itu, lalu mengubahnya.',
          ),
          rPro(' adalah pohon yang menggambarkan isi halaman web. JavaScript mencari satu elemen di pohon itu dengan '),
          rCode('document.querySelector()', ['pro']),
          rPro('.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a04-l05-q3',
          type: 'analogy',
          prompt: t('Susunan isi halaman paling mirip apa?', 'Struktur DOM paling mirip apa?'),
          choices: [
            {
              id: 'tree',
              label: t('Pohon keluarga yang bercabang', 'Pohon silsilah (induk, anak, saudara)'),
              icon: 'users',
            },
            {
              id: 'line',
              label: t('Daftar panjang dari atas ke bawah', 'Daftar datar dari atas ke bawah tanpa tingkatan'),
              icon: 'file-text',
              explainWrong: t(
                'Isi halaman punya induk dan anak. Itu bukan daftar lurus.',
                'Elemen HTML bersarang di dalam elemen lain, jadi bukan daftar datar.',
              ),
            },
            {
              id: 'box',
              label: t('Satu kotak besar berisi semuanya', 'Satu blok besar tanpa bagian'),
              icon: 'box',
              explainWrong: t(
                'Halaman punya banyak bagian bertingkat. Satu kotak tidak cukup.',
                'DOM punya banyak simpul bertingkat, bukan satu blok.',
              ),
            },
          ],
          answer: 'tree',
          explainCorrect: t(
            'Halaman punya induk, anak, dan saudara. Seperti pohon keluarga.',
            'DOM berbentuk pohon dengan induk, anak, dan saudara.',
          ),
          hints: [t('Ingat: isi halaman punya induk dan anak.', 'Cari bentuk yang bercabang bertingkat.')],
          tags: ['dom'],
        }),
      ),
      conceptStep({
        title: t('Dengarkan ketukan, lalu ubah', 'addEventListener dan textContent'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'dom-event' },
        alt: t(
          'Tiga langkah: cari tombol, dengar ketukan, ubah tulisan.',
          'Tiga langkah: cari elemen, pasang pendengar klik, ubah textContent.',
        ),
        code: {
          lang: 'js',
          code: 'const btn = document.querySelector(".suka");\nbtn.addEventListener("click", () => {\n  btn.textContent = "Disukai ✓";\n});',
        },
        body: [
          rTerm('event', 'Event', 'Event'),
          rJunior(' adalah kejadian, seperti ketukan di tombol. Urutannya tetap: cari tombol, dengar kejadian, ubah tulisan.'),
          rPro(' adalah kejadian seperti klik atau ketikan. Urutannya selalu sama: cari elemen, dengarkan event, ubah isinya.'),
        ],
      }),
      limitStep({
        analogy: t('Pohon halaman seperti pohon keluarga', 'DOM seperti pohon silsilah keluarga'),
        same: [
          t(
            'Pohon halaman punya induk, anak, dan saudara.',
            'Elemen HTML punya induk, anak, dan saudara, seperti pohon silsilah.',
          ),
        ],
        different: [
          t(
            'Pohon halaman bisa diubah kapan saja oleh JavaScript.',
            'JavaScript bisa menambah, mengubah, dan menghapus cabang saat halaman aktif.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'mesin-blender',
        t(
          'Ketuk tombol di simulator dan lihat layar berubah.',
          'Klik tombol di simulator dan amati perubahan pada tampilan.',
        ),
      ),
      qStep({
        id: 'a04-l05-q1',
        type: 'order',
        difficulty: 1,
        prompt: t(
          'Urutkan 3 langkah supaya tombol bereaksi saat diketuk.',
          'Urutkan tiga langkah agar halaman bereaksi terhadap klik.',
        ),
        items: [
          { id: 'c', label: t('Cari tombolnya', 'Cari elemennya (querySelector)') },
          { id: 'd', label: t('Dengarkan ketukan', 'Dengarkan kejadian klik (addEventListener)') },
          { id: 'u', label: t('Ubah tulisannya', 'Ubah tampilan atau tulisannya (textContent)') },
        ],
        answer: ['c', 'd', 'u'],
        explainCorrect: t(
          'Tombol dicari dulu, lalu didengar, lalu diubah. Hampir semua tombol bekerja begini.',
          'Cari, dengar, ubah adalah pola hampir semua kode yang membuat halaman bereaksi.',
        ),
        hints: hint(t('Apa yang harus ada sebelum tombol bisa didengar?', 'Elemen harus ditemukan sebelum diberi pendengar.')),
        tags: ['dom', 'event'],
      }),
      qStep(
        makeMcq({
          id: 'a04-l05-q2',
          prompt: t(
            'Di halaman web, event itu apa?',
            'Klik tombol, ketikan huruf, atau pengiriman form di JavaScript disebut apa?',
          ),
          choices: [
            { id: 'ev', label: t('Kejadian seperti ketukan tombol', 'Event') },
            {
              id: 'css',
              label: t('Cabang di pohon halaman', 'Elemen'),
              explainWrong: t(
                'Cabang adalah bagian pohon halaman. Event adalah kejadian, seperti ketukan.',
                'Elemen adalah bagian halaman HTML, bukan kejadian.',
              ),
            },
            {
              id: 'dns',
              label: t('Bahan masuk untuk blender', 'Selector'),
              explainWrong: t(
                'Bahan masuk dipakai oleh blender. Event adalah kejadian, seperti ketukan.',
                'Selector memilih elemen. Selector bukan kejadian.',
              ),
            },
          ],
          answer: 'ev',
          explainCorrect: t(
            'Event adalah kejadian di halaman. Contohnya ketukan dan ketikan huruf.',
            'Event adalah setiap kejadian dari pengunjung atau browser.',
          ),
          hints: [t('Ingat apa yang didengar JavaScript dari tombol.', 'Cari istilah untuk kejadian yang bisa didengarkan.')],
          tags: ['event'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l05-q4',
          type: 'limit',
          analogy: t('Pohon halaman seperti pohon keluarga', 'DOM sebagai pohon silsilah'),
          prompt: t(
            'Pohon keluarga digambar di kertas. Mana yang hanya dimiliki pohon halaman?',
            'Sifat mana yang dimiliki pohon DOM tetapi tidak ada pada silsilah keluarga biasa?',
          ),
          choices: [
            {
              id: 'mut',
              label: t('Cabang yang bisa ditambah dan dibuang', 'Skrip bisa menambah dan menghapus cabang secara langsung'),
            },
            {
              id: 'par',
              label: t('Induk, anak, dan saudara', 'Ada simpul induk dan beberapa simpul anak di bawah induk itu'),
              explainWrong: t(
                'Pohon keluarga juga punya induk dan anak. Itu kesamaannya.',
                'Silsilah keluarga juga punya induk dan anak. Itu kesamaan, bukan beda.',
              ),
            },
            {
              id: 'root',
              label: t('Satu akar di paling atas', 'Berawal dari satu akar di bagian paling atas'),
              explainWrong: t(
                'Pohon keluarga juga punya satu akar. Itu kesamaannya.',
                'Silsilah keluarga juga punya satu akar utama. Itu kesamaan.',
              ),
            },
          ],
          answer: 'mut',
          difficulty: 2,
          explainCorrect: t(
            'Halaman bisa berubah saat dipakai. Cabangnya ditambah atau dibuang oleh JavaScript.',
            'DOM bersifat dinamis: skrip bisa mengubah struktur pohon saat halaman aktif.',
          ),
          hints: [t('Cari yang tidak bisa dilakukan pada kertas.', 'Cari sifat yang hanya dimiliki pohon yang hidup.')],
          tags: ['dom'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l05-q5j',
          type: 'scenario',
          modes: ['junior'],
          difficulty: 2,
          story: t('Dimas mengetuk tombol Suka. JavaScript sudah mendengar ketukan itu.'),
          prompt: t('Langkah apa yang terjadi berikutnya?'),
          choices: [
            { id: 'ubah', label: t('Mengubah tulisan tombol') },
            {
              id: 'cari',
              label: t('Mencari tombol dari awal'),
              explainWrong: t('Tombolnya sudah ketemu sebelum ketukan. Tinggal mengubah tampilan.'),
            },
            {
              id: 'tunggu',
              label: t('Menunggu ketukan berikutnya'),
              explainWrong: t('Ketukan sudah terdengar. Saatnya tombol bereaksi.'),
            },
          ],
          answer: 'ubah',
          explainCorrect: t('Setelah ketukan terdengar, tombol diubah. Itu langkah ketiga.'),
          hints: [t('Urutannya: cari, dengar, lalu apa?')],
          tags: ['dom', 'event'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l05-q5',
          type: 'scenario',
          modes: ['pro'],
          difficulty: 2,
          story: t('Raka ingin mengubah teks tombol ".beli" setelah diklik. Hasilnya harus aman dari sisipan script.'),
          prompt: t('Cara mana yang paling aman?'),
          choices: [
            { id: 'tc', label: t('tombol.textContent') },
            {
              id: 'ih',
              label: t('tombol.innerHTML'),
              explainWrong: t('innerHTML membaca teks sebagai HTML, jadi rawan celah keamanan.'),
            },
            {
              id: 'pad',
              label: t('tombol.insertAdjacentHTML'),
              explainWrong: t('insertAdjacentHTML juga membaca teks sebagai HTML, sama berisikonya dengan innerHTML.'),
            },
          ],
          answer: 'tc',
          explainCorrect: t('textContent menulis teks polos. Tag dan atribut berbahaya seperti onerror tidak ikut diproses.'),
          hints: [t('Cari cara yang memperlakukan teks sebagai teks biasa.')],
          tags: ['dom'],
        }),
      ),
      qStep({
        id: 'a04-l05-q6',
        type: 'fill',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Pasang pendengar klik pada tombol dengan method yang tepat.'),
        template: 'tombol.___("click", handleKlik);',
        bank: ['addEventListener', 'querySelector', 'textContent'],
        answer: ['addEventListener'],
        explainCorrect: t('addEventListener("click", ...) memantau klik pada elemen target.'),
        hints: hint(t('Pilih method yang memasang pendengar kejadian.')),
        tags: ['event', 'dom'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a04-l05-r1',
        prompt: t(
          'Apa langkah pertama supaya tombol bisa bereaksi?',
          'Perintah apa yang mencari satu elemen di halaman?',
        ),
        choices: [
          { id: 'qs', label: t('Mencari tombolnya di pohon halaman', 'document.querySelector(...)') },
          {
            id: 'fe',
            label: t('Mengulang isi sebuah daftar', 'array.forEach(...)'),
            explainWrong: t(
              'Mengulang isi daftar itu perulangan, bukan mencari tombol.',
              'forEach untuk mengulang isi array.',
            ),
          },
          {
            id: 'tc',
            label: t('Mengubah tulisan di tombol', 'elemen.textContent'),
            explainWrong: t(
              'Mengubah tulisan datang sesudah tombolnya ketemu.',
              'textContent mengubah teks elemen yang sudah ditemukan.',
            ),
          },
        ],
        answer: 'qs',
        explainCorrect: t(
          'Mencari adalah langkah pertama. Tombol harus ketemu dulu.',
          'querySelector memilih elemen HTML pertama yang cocok dengan selector.',
        ),
        hints: [t('Ingat urutan tiga langkah tombol.', 'Cari perintah yang memilih elemen.')],
        tags: ['dom'],
      }),
      makeTf({
        id: 'a04-l05-r2',
        prompt: t(
          'Urutan tombol bereaksi: cari, dengar, lalu ubah.',
          'Urutan umum: cari elemen, dengarkan event, lalu ubah halaman.',
        ),
        answer: true,
        explainCorrect: t(
          'Tombol dicari, didengar, lalu diubah. Urutan ini hampir selalu sama.',
          'Itulah tiga langkah utama kode yang membuat halaman bereaksi.',
        ),
        explainWrong: t(
          'Urutannya cari, dengar, lalu ubah. Tombol harus ketemu dulu.',
          'Elemen dicari dulu, lalu didengarkan, lalu diubah.',
        ),
        hints: [t('Ingat tiga langkah tombol.', 'Ingat urutan: cari, dengar, ubah.')],
        tags: ['dom', 'event'],
      }),
    ],
    recap: t(
      'DOM menghubungkan halaman dan JavaScript: cari, dengar, ubah.',
      'Halaman dimodelkan sebagai pohon DOM. JavaScript mengubahnya lewat querySelector, addEventListener, dan textContent.',
    ),
    companion: {
      talkPrompts: ['Kamu mengetuk tombol Suka. Apa 3 langkah JavaScript di belakang layar?'],
      offlineActivity: 'Gambar pohon keluarga tag HTML sederhana: html → body → (h1, button).',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // A4-L06 Fetch dan async (khusus Pro)
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a04-l06',
    worldId: 'a04',
    title: 'Fetch dan async: nomor antrean kopi',
    modes: ['pro'],
    objective: t('Kamu bisa menjelaskan cara kerja async/await dan fetch untuk meminta data dari server.'),
    estMinutes: 6,
    introducesTerms: ['fetch'],
    usesTerms: ['javascript', 'server', 'request', 'response', 'fungsi'],
    stickerId: 'antrean-kopi',
    warmupFrom: 'a04-l05',
    atWork:
      'Kamu akan memakai fetch untuk mengisi daftar produk, dan memeriksa hasilnya di tab Network DevTools.',
    steps: [
      storyStep('a04/antrean-kopi.svg', [
        rText(
          'Halaman Toko Rani harus mengambil daftar produk dari server tanpa membuat layar membeku. Cara kerjanya mirip nomor antrean di kafe: kamu duduk dulu sampai nomormu dipanggil.',
        ),
      ]),
      conceptStep({
        title: t('Fetch dan async/await'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'a04', topic: 'fetch-async' },
        alt: t('Urutan: halaman meminta data, lanjut bekerja, lalu menerima jawaban.'),
        code: {
          lang: 'js',
          code: 'async function ambilProduk() {\n  const res = await fetch("https://api.toko-rani.example/produk");\n  const data = await res.json();\n  console.log(data);\n}',
          highlight: [1, 2, 3],
        },
        body: [
          rTerm('fetch', 'fetch'),
          rText(' adalah perintah yang meminta data ke server tanpa membuat halaman menunggu. Dengan async/await, kode menunggu jawaban di satu baris, lalu membaca isinya dengan '),
          rCode('res.json()'),
          rText('.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a04-l06-q1',
          type: 'analogy',
          prompt: t('Mengapa fetch diibaratkan nomor antrean kopi?'),
          choices: [
            { id: 'wait', label: t('Halaman tetap bisa dipakai selama menunggu jawaban server') },
            {
              id: 'freeze',
              label: t('Seluruh halaman berhenti dan tidak bisa diklik sampai jawaban datang'),
              explainWrong: t('Justru async mencegah halaman membeku. Kamu bisa menekan tombol lain sambil menunggu.'),
            },
            {
              id: 'coffee',
              label: t('Jawaban selalu datang tepat sesuai urutan permintaan dikirim'),
              explainWrong: t('Antrean menggambarkan menunggu tanpa mengunci halaman. Urutan jawaban bukan intinya.'),
            },
          ],
          answer: 'wait',
          explainCorrect: t('Nomor antrean membuatmu bebas bergerak sambil menunggu. Async menjaga halaman tetap bisa dipakai.'),
          hints: [t('Ingat kamu duduk santai saat menunggu nomor dipanggil.')],
          tags: ['fetch'],
        }),
      ),
      conceptStep({
        title: t('Rujukan dokumentasi'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a04', topic: 'mdn-docs' },
        alt: t('Pembaca membuka dokumentasi MDN untuk memeriksa sintaks.'),
        body: [
          rText('Kamu tidak perlu menghafal semua sintaks. Pahami alurnya: kirim permintaan, tunggu dengan '),
          rCode('await'),
          rText(', lalu baca isi jawabannya. Developer berpengalaman pun membuka dokumentasi untuk memeriksa sintaks.'),
        ],
      }),
      limitStep({
        analogy: t('Nomor antrean kopi untuk async/await'),
        same: [t('Selama menunggu jawaban, halaman tetap bisa digulir dan tombol lain tetap bisa ditekan.')],
        different: [t('Pesanan bisa gagal total kalau server rusak atau internet putus, jadi kode perlu menangani error.')],
        riskyAnalogy: false,
      }),
      simStep('mesin-blender', t('Jalankan simulator dan amati urutan masukan, proses, lalu hasilnya.')),
      qStep(
        makeMcq({
          id: 'a04-l06-q2',
          difficulty: 2,
          prompt: t('Setelah const res = await fetch(...), perintah apa yang membaca isi JSON-nya?'),
          choices: [
            { id: 'json', label: t('await res.json()') },
            {
              id: 'css',
              label: t('res.data'),
              explainWrong: t('Response tidak punya properti data. Isi jawaban dibaca lewat res.json().'),
            },
            {
              id: 'dom',
              label: t('await res.read()'),
              explainWrong: t('Response tidak punya method read(). Nama method yang benar adalah json().'),
            },
          ],
          answer: 'json',
          explainCorrect: t(
            'res.json() membaca isi jawaban dan mengubahnya menjadi object JavaScript. Proses ini juga asinkron, jadi perlu await.',
          ),
          hints: [t('Cari method milik res yang mengubah isi jawaban menjadi object.')],
          tags: ['fetch'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a04-l06-q3',
          difficulty: 2,
          prompt: t('await hanya bisa dipakai di dalam fungsi async, atau di module tingkat atas (top-level).'),
          answer: true,
          explainCorrect: t('JavaScript hanya mengizinkan await di fungsi async atau di module tingkat atas.'),
          explainWrong: t('await di dalam fungsi biasa menghasilkan syntax error.'),
          hints: [t('Ingat kata async di depan function.')],
          tags: ['fetch'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a04-l06-q4',
          type: 'limit',
          analogy: t('Nomor antrean kafe'),
          difficulty: 2,
          prompt: t('Risiko apa pada fetch jaringan sungguhan yang perlu ditangani terpisah di kode?'),
          choices: [
            { id: 'err', label: t('Jaringan bisa putus atau server membalas dengan gagal') },
            {
              id: 'wait',
              label: t('Pemesan tetap harus menunggu beberapa saat sebelum dipanggil'),
              explainWrong: t('Menunggu memang bagian dari analogi. Itu kesamaan, bukan risiko tambahan.'),
            },
            {
              id: 'ui',
              label: t('Aktivitas lain di halaman tetap berjalan'),
              explainWrong: t('Itu kesamaannya. Risikonya ada pada jawaban yang gagal datang.'),
            },
          ],
          answer: 'err',
          explainCorrect: t('Nomor antrean tidak selalu berujung kopi: pesanan bisa gagal. Karena itu fetch perlu penanganan error.'),
          hints: [t('Cari risiko yang tidak ada di antrean kafe.')],
          tags: ['fetch'],
        }),
      ),
      qStep({
        id: 'a04-l06-q5',
        type: 'order',
        difficulty: 2,
        prompt: t('Urutkan langkah mengambil dan menampilkan daftar produk dengan fetch.'),
        items: [
          { id: 'f1', label: t('Panggil fetch(url) dengan await') },
          { id: 'f2', label: t('Baca jawaban lewat await res.json()') },
          { id: 'f3', label: t('Tampilkan data di layar atau Console') },
        ],
        answer: ['f1', 'f2', 'f3'],
        explainCorrect: t('Kamu mengirim permintaan dulu, membaca isinya, lalu menampilkannya. Setiap langkah butuh hasil langkah sebelumnya.'),
        hints: hint(t('Data harus ada sebelum bisa ditampilkan.')),
        tags: ['fetch'],
      }),
      qStep({
        id: 'a04-l06-q6',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi fungsi asinkron untuk mengambil data produk.'),
        template: '___ function ambilProduk() {\n  const res = await fetch("https://api.toko-rani.example/produk");\n}',
        bank: ['async', 'const', 'return'],
        answer: ['async'],
        explainCorrect: t('Kata async di depan function memungkinkan pemakaian await di dalamnya.'),
        hints: hint(t('Fungsi yang memakai await harus diberi tanda khusus di depannya.')),
        tags: ['fetch'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a04-l06-r1',
        prompt: t('Perintah JavaScript mana yang meminta data dari server?'),
        choices: [
          { id: 'f', label: t('fetch') },
          {
            id: 'g',
            label: t('console.log'),
            explainWrong: t('console.log hanya menampilkan pesan di Console.'),
          },
          {
            id: 'h',
            label: t('addEventListener'),
            explainWrong: t('addEventListener mendengarkan kejadian, bukan mengambil data.'),
          },
        ],
        answer: 'f',
        explainCorrect: t('fetch mengirim permintaan HTTP secara asinkron.'),
        tags: ['fetch'],
      }),
      makeTf({
        id: 'a04-l06-r2',
        prompt: t('Operasi asinkron mencegah halaman membeku selama menunggu data dari server.'),
        answer: true,
        explainCorrect: t('Halaman tetap bisa dipakai selama menunggu.'),
        explainWrong: t('Async menjaga halaman tetap responsif.'),
        tags: ['fetch'],
      }),
    ],
    recap: t('fetch dan async/await mengambil data dari server tanpa membekukan halaman.'),
  }),
  arraysAndObjects,
  handlingErrors,
];
