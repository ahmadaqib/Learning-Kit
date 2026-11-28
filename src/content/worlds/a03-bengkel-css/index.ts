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

/** A glossary term that only Pro learners see (the Junior path teaches the idea with plain words). */
const rTermPro = (termId: string, text: string): Rich => ({
  t: 'term',
  termId,
  v: { pro: text },
  modes: ['pro'],
});

export const world: World = {
  id: 'a03',
  track: 'A',
  order: 3,
  title: 'Bengkel CSS',
  tagline: t(
    'Warnai halaman, atur jarak kotak, dan rapikan buku di rak.',
    'Kamu bisa mengatur warna, jarak, dan tata letak halaman dengan CSS.',
  ),
  color: '#2F6FED',
  illustration: 'a03-bengkel-css',
  sourceChapters: ['J1-04'],
  requires: ['a02'],
  lessons: ['a03-l01', 'a03-l02', 'a03-l03', 'a03-l04', 'a03-l05', 'a03-l06'],
  sideQuests: ['a03-sq1'],
  boss: {
    title: 'Tantangan Penjaga Bengkel CSS',
    greeting: t(
      'Ayo tunjukkan keahlianmu mengecat kotak dan menata rak di Bengkel CSS!',
      'Buktikan kamu bisa mendandani halaman dan menata kotak dengan CSS.',
    ),
    guardianName: 'Penjaga Bengkel CSS',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'a03-anc-j1',
        prompt: t(
          'Tukang cat berkata: semua pagar dicat hijau. Kata mana yang menunjuk benda yang dicat?',
          'Pada aturan CSS .tombol { color: white; }, bagian .tombol disebut apa?',
        ),
        choices: [
          {
            id: 'sel',
            label: t('Kata "semua pagar"', 'Selector, penunjuk elemen yang dihias'),
          },
          {
            id: 'val',
            label: t('Kata "hijau"', 'Nilai warna'),
            explainWrong: t(
              'Hijau adalah warna yang dipakai. Yang ditunjuk adalah pagarnya.',
              'white adalah nilainya, yaitu hasil perubahan.',
            ),
          },
          {
            id: 'tag',
            label: t('Kata "dicat"', 'Tag pembuka HTML'),
            explainWrong: t(
              'Dicat adalah pekerjaan tukangnya. Benda yang dicat disebut di bagian lain.',
              '.tombol adalah selector class di CSS, bukan tag HTML.',
            ),
          },
        ],
        answer: 'sel',
        explainCorrect: t(
          'Kata itu menunjuk siapa yang dicat. Perintah cat hanya berlaku untuk pagar.',
          'Selector memilih elemen mana yang menerima gaya CSS.',
        ),
        tags: ['selector'],
      }),
      makeAnchorMcq({
        id: 'a03-anc-j2',
        prompt: t(
          'Lukisan ada di dalam bingkai. Ruang kosong antara lukisan dan bingkai disebut apa?',
          'Di box model, jarak ruang kosong di dalam bingkai sekitar isi disebut apa?',
        ),
        choices: [
          { id: 'pad', label: t('Padding') },
          {
            id: 'mar',
            label: t('Margin'),
            explainWrong: t(
              'Margin adalah jarak di luar bingkai. Ia memisahkan satu lukisan dari lukisan lain.',
              'Margin adalah jarak di luar bingkai.',
            ),
          },
          {
            id: 'bor',
            label: t('Border'),
            explainWrong: t(
              'Border adalah bingkainya sendiri. Ia bukan ruang kosong.',
              'Border adalah garis bingkainya.',
            ),
          },
        ],
        answer: 'pad',
        explainCorrect: t(
          'Padding memberi ruang kosong di dalam bingkai. Seperti jarak antara foto dan tepi bingkainya.',
          'Padding memberi ruang napas di dalam bingkai kotak.',
        ),
        tags: ['padding'],
      }),
      makeAnchorMcq({
        id: 'a03-anc-j3',
        prompt: t(
          'Kamu mau menata kotak kartu berjajar satu baris seperti buku di rak. Mana yang cocok?',
          'Agar kotak kartu berjajar rapi satu baris seperti buku di rak, apa yang dipakai?',
        ),
        choices: [
          { id: 'flex', label: t('Flexbox') },
          {
            id: 'alt',
            label: t('Margin'),
            explainWrong: t(
              'Margin hanya memberi jarak di luar kotak. Ia tidak menjejerkan kotak.',
              'Margin hanya memberi jarak di luar kotak.',
            ),
          },
          {
            id: 'head',
            label: t('Border'),
            explainWrong: t(
              'Border hanya membuat garis bingkai. Ia tidak mengatur susunan kotak.',
              'Border hanya membuat garis bingkai.',
            ),
          },
        ],
        answer: 'flex',
        explainCorrect: t(
          'Flexbox menata kotak satu deretan, seperti buku di satu rak.',
          'Flexbox cocok menata item satu arah dalam baris atau kolom.',
        ),
        tags: ['flexbox'],
      }),
      makeAnchorMcq({
        id: 'a03-anc-j4',
        prompt: t(
          'Kamu menata kotak dalam baris dan kolom sekaligus. Alat apa yang paling pas?',
          'Kapan CSS Grid lebih pas dipakai daripada Flexbox?',
        ),
        choices: [
          { id: 'grid', label: t('CSS Grid') },
          {
            id: 'text',
            label: t('Flexbox'),
            explainWrong: t(
              'Flexbox menata satu arah saja. Baris dan kolom sekaligus perlu alat lain.',
              'Flexbox menata satu arah saja.',
            ),
          },
          {
            id: 'btn',
            label: t('Margin'),
            explainWrong: t(
              'Margin hanya mengatur jarak luar. Ia tidak membagi ruang menjadi kotak-kotak.',
              'Margin hanya mengatur jarak luar.',
            ),
          },
        ],
        answer: 'grid',
        explainCorrect: t(
          'Grid mengatur dua arah sekaligus: baris dan kolom, seperti sekat kotak bekal.',
          'Grid mengatur dua arah: baris dan kolom bersamaan.',
        ),
        tags: ['grid-css'],
      }),
      makeAnchorMcq({
        id: 'a03-anc-j5',
        prompt: t(
          'Kotak punya 4 lapis. Mana urutan dari paling dalam ke paling luar?',
          'Bagaimana urutan lapisan box model, dari paling dalam ke paling luar?',
        ),
        choices: [
          {
            id: 'ord',
            label: t('Isi, ruang dalam, bingkai, jarak luar', 'Content, padding, border, margin'),
          },
          {
            id: 'rev',
            label: t('Jarak luar, bingkai, ruang dalam, isi', 'Margin, border, padding, content'),
            explainWrong: t(
              'Itu urutan dari luar ke dalam. Isi justru ada di tengah.',
              'Itu urutan dari luar ke dalam.',
            ),
          },
          {
            id: 'mix',
            label: t('Bingkai, isi, jarak luar, ruang dalam', 'Border, content, margin, padding'),
            explainWrong: t(
              'Isi selalu ada di tengah. Jarak luar selalu paling luar.',
              'Content selalu paling dalam, margin paling luar.',
            ),
          },
        ],
        answer: 'ord',
        explainCorrect: t(
          'Isi ada di tengah. Lapisan lain membungkusnya, sampai jarak luar.',
          'Isi di tengah, dilapisi padding, dibungkus border, dipisah margin.',
        ),
        tags: ['box-model'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a03-anc-p1',
        prompt: t(
          'Mengapa class selector (.kartu) lebih sering dipakai daripada id (#kartu)?',
        ),
        choices: [
          { id: 'reuse', label: t('Class bisa dipakai ulang di banyak elemen') },
          {
            id: 'fast',
            label: t('Id lebih lambat dibaca oleh browser'),
            explainWrong: t('Kecepatan membaca selector tidak jauh berbeda. Id lebih jarang dipakai karena hanya cocok untuk satu elemen.'),
          },
          {
            id: 'color',
            label: t('Class lebih kuat daripada id saat bertabrakan'),
            explainWrong: t('Justru id yang lebih kuat. Class dipilih karena bisa dipakai ulang.'),
          },
        ],
        answer: 'reuse',
        explainCorrect: t('Satu class bisa menghias banyak kartu sekaligus. Id hanya cocok untuk satu elemen unik.'),
        tags: ['class-css'],
      }),
      makeAnchorMcq({
        id: 'a03-anc-p2',
        prompt: t('Apa efek langsung dari * { box-sizing: border-box; } pada ukuran kotak?'),
        choices: [
          { id: 'bb', label: t('Width sudah termasuk padding dan border') },
          {
            id: 'del',
            label: t('Semua margin di halaman dihapus'),
            explainWrong: t('Border-box tidak menyentuh margin. Margin tetap berada di luar ukuran kotak.'),
          },
          {
            id: 'hide',
            label: t('Garis tepi semua elemen disembunyikan'),
            explainWrong: t('Border tetap tampil. Ia hanya ikut dihitung di dalam width.'),
          },
        ],
        answer: 'bb',
        explainCorrect: t('Border-box menghitung padding dan border di dalam width. Kotak tidak melebar tanpa terduga.'),
        tags: ['box-model'],
      }),
      makeAnchorMcq({
        id: 'a03-anc-p3',
        prompt: t('Satuan CSS mana yang mengikuti ukuran huruf dasar halaman?'),
        choices: [
          { id: 'rem', label: t('rem') },
          {
            id: 'px',
            label: t('px'),
            explainWrong: t('px berukuran tetap. Ia tidak mengikuti pengaturan huruf.'),
          },
          {
            id: 'vh',
            label: t('vh'),
            explainWrong: t('vh mengikuti tinggi layar, bukan ukuran huruf.'),
          },
        ],
        answer: 'rem',
        explainCorrect: t('Rem berpatokan pada ukuran huruf akar, biasanya 16 px. Teks ikut membesar saat orang memperbesar huruf.'),
        tags: ['rem-unit'],
      }),
      makeAnchorMcq({
        id: 'a03-anc-p4',
        prompt: t('Properti Flexbox mana yang menyebar item dengan jarak merata, dari tepi kiri sampai tepi kanan?'),
        choices: [
          { id: 'sb', label: t('justify-content: space-between') },
          {
            id: 'fs',
            label: t('justify-content: flex-start'),
            explainWrong: t('flex-start menumpuk item di awal baris. Tidak ada jarak yang disebar.'),
          },
          {
            id: 'col',
            label: t('flex-direction: column'),
            explainWrong: t('flex-direction hanya mengubah arah susunan, bukan jarak antar item.'),
          },
        ],
        answer: 'sb',
        explainCorrect: t('Space-between menaruh item pertama di awal dan item terakhir di ujung. Sisa jarak dibagi rata.'),
        tags: ['flexbox'],
      }),
      makeAnchorMcq({
        id: 'a03-anc-p5',
        prompt: t('Tiga aturan CSS menata satu elemen: #judul, .judul, dan h1. Aturan mana yang menang?'),
        choices: [
          { id: 'id', label: t('Aturan #judul') },
          {
            id: 'tag',
            label: t('Aturan h1'),
            explainWrong: t('Tag seperti h1 lebih lemah daripada class dan id.'),
          },
          {
            id: 'cls',
            label: t('Aturan .judul'),
            explainWrong: t('Class memang kuat, tetapi id masih lebih kuat.'),
          },
        ],
        answer: 'id',
        explainCorrect: t('Id lebih kuat daripada class, dan class lebih kuat daripada tag. Karena itu #judul menang.'),
        tags: ['z-index', 'selector'],
      }),
      makeAnchorMcq({
        id: 'a03-anc-p6',
        type: 'limit',
        analogy: t('Box model seperti lukisan berbingkai di dinding'),
        prompt: t('Sifat box model mana yang TIDAK dimiliki lukisan berbingkai sungguhan?'),
        choices: [
          { id: 'col', label: t('Margin atas dan bawah dua kotak bisa menyatu') },
          {
            id: 'pad',
            label: t('Ada ruang kosong antara lukisan dan bingkai'),
            explainWrong: t('Ruang itu mirip padding, jadi sifat ini ada di kedua dunia.'),
          },
          {
            id: 'out',
            label: t('Ada jarak antara lukisan dan benda di sebelahnya'),
            explainWrong: t('Jarak itu mirip margin, jadi sifat ini ada di kedua dunia.'),
          },
        ],
        answer: 'col',
        explainCorrect: t('Margin vertikal yang bersebelahan bisa menyatu (collapsing). Jarak dua lukisan di dinding tidak begitu.'),
        tags: ['margin', 'box-model'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'a03-l01',
    worldId: 'a03',
    title: 'Selector, properti, nilai',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menunjuk siapa yang dicat dan warna apa yang dipakai.',
      'Kamu bisa menulis aturan yang memilih elemen dengan class atau id.',
    ),
    estMinutes: 5,
    introducesTerms: ['selector', 'class-css'],
    usesTerms: ['css', 'tag', 'elemen'],
    stickerId: 'kuas-cat',
    warmupFrom: 'a02-l05',
    atWork: 'Kamu akan menulis selector seperti .tombol di file CSS untuk mengubah warna tombol Toko Rani.',
    steps: [
      storyStep('a03/kuas-cat.svg', [
        rText(
          'Tukang cat datang ke Bengkel CSS. Ia butuh perintah yang jelas. Bagaimana cara menyuruhnya mengecat semua kartu?',
          'Tombol di halaman Toko Rani masih abu-abu polos. Kamu perlu menyuruh CSS mengubah warnanya.',
        ),
      ]),
      conceptStep({
        title: t('Perintah untuk tukang cat', 'Selector, properti, dan nilai'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'aturan-css' },
        alt: t(
          'Tukang cat menunjuk kotak, lalu memilih warna.',
          'Aturan .tombol { background: orange; } dengan selector, properti, dan nilai.',
        ),
        code: {
          lang: 'css',
          code: '.tombol {\n  background: orange;\n}',
          highlight: [1, 2],
        },
        body: [
          rTerm('selector', 'Selector', 'Selector'),
          rJunior(
            ' adalah penunjuk siapa yang dihias. Setelah itu kamu menyebut hal yang diubah, misalnya warna. Terakhir, kamu menyebut hasilnya, misalnya biru.',
          ),
          rPro(
            ' adalah bagian aturan CSS yang menunjuk elemen mana yang diberi gaya. Di dalam kurung kurawal ada properti, yaitu hal yang diubah, dan nilainya.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a03-l01-q1',
          prompt: t(
            'Perintah tukang cat: semua kartu dicat biru. Kata mana yang menunjuk siapa yang dicat?',
            'Pada aturan .kartu { color: navy; }, bagian mana yang menjadi selector?',
          ),
          choices: [
            { id: 'sel', label: t('Kata "kartu"', '.kartu') },
            {
              id: 'prop',
              label: t('Kata "dicat"', 'color'),
              explainWrong: t(
                'Dicat adalah hal yang dikerjakan. Ia bukan penunjuk siapa yang dicat.',
                'color adalah propertinya. Ia menyebut hal yang diubah, bukan sasarannya.',
              ),
            },
            {
              id: 'val',
              label: t('Kata "biru"', 'navy'),
              explainWrong: t(
                'Biru adalah hasil cat. Ia bukan penunjuk siapa yang dicat.',
                'navy adalah nilai warnanya. Ia menyebut hasil perubahan, bukan sasarannya.',
              ),
            },
          ],
          answer: 'sel',
          explainCorrect: t(
            'Kata "kartu" menunjuk siapa yang dicat. Seperti tukang cat yang disuruh mengecat semua kartu.',
            '.kartu memilih semua elemen dengan class="kartu". Properti color dan nilai navy hanya mengatur warna.',
          ),
          hints: [
            t('Ingat tukang cat: ia perlu tahu apa yang dicat.', 'Cari bagian yang menyebut sasaran, bukan warna.'),
          ],
          tags: ['selector'],
        }),
      ),
      conceptStep({
        title: t('Nama untuk kelompok', 'Tag, class, dan id'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'class-id-css' },
        alt: t(
          'Tiga kotak: semua murid, satu klub, dan satu murid.',
          'Perbandingan tag p, class dengan titik, dan id dengan pagar.',
        ),
        body: [
          rTerm('class-css', 'Class', 'Class'),
          rJunior(' adalah nama kelompok, seperti klub basket. Namanya diawali titik, seperti '),
          rCode('.kartu', ['junior']),
          rJunior('. Tag memilih semua benda sejenis, dan ID hanya satu benda.'),
          rPro(' adalah nama kelompok yang bisa dipakai ulang oleh banyak elemen. Namanya diawali titik, seperti '),
          rCode('.kartu', ['pro']),
          rPro('. Tag seperti '),
          rCode('p', ['pro']),
          rPro(' memilih semua elemen sejenis, dan ID seperti '),
          rCode('#header', ['pro']),
          rPro(' memilih satu elemen unik.'),
        ],
      }),
      limitStep({
        analogy: t('Class seperti seragam klub'),
        same: [
          t(
            'Banyak kotak memakai class yang sama, seperti seragam klub.',
            'Class ibarat seragam klub: banyak elemen bisa memakai class yang sama.',
          ),
        ],
        different: [
          t(
            'Kotak boleh punya 2 class, seperti murid ikut 2 klub.',
            'Satu elemen HTML boleh punya beberapa class sekaligus.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'kupas-box-model',
        t(
          'Geser pengaturnya. Lihat kotaknya berubah.',
          'Ubah properti dan nilai di simulator, lalu amati perubahan kotaknya.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a03-l01-q2',
          prompt: t(
            'Kamu memberi nama kelompok untuk kartu. Tanda apa yang ada di depan nama itu?',
            'Simbol apa yang mengawali nama class di file CSS?',
          ),
          choices: [
            { id: 'dot', label: t('Tanda titik', 'Titik (.)') },
            {
              id: 'hash',
              label: t('Tanda pagar', 'Pagar (#)'),
              explainWrong: t(
                'Tanda pagar dipakai untuk nama satu benda saja. Itu bukan nama kelompok.',
                'Pagar dipakai untuk id, yang hanya menunjuk satu elemen.',
              ),
            },
            {
              id: 'star',
              label: t('Tanda bintang', 'Bintang (*)'),
              explainWrong: t(
                'Tanda bintang memilih semua kotak sekaligus. Nama kelompok memakai tanda lain.',
                'Bintang memilih semua elemen sekaligus, bukan satu kelompok.',
              ),
            },
          ],
          answer: 'dot',
          explainCorrect: t(
            'Titik di depan menandai nama kelompok. Seperti lencana klub di baju seragam.',
            'Class selalu diawali titik, misalnya .tombol atau .kartu-produk. Titik membedakannya dari tag dan id.',
          ),
          hints: [t('Ingat tanda kecil di depan nama kelompok.', 'Lihat contoh .kartu di kartu konsep tadi.')],
          tags: ['class-css'],
        }),
      ),
      qStep({
        id: 'a03-l01-q3',
        type: 'match',
        difficulty: 1,
        prompt: t('Pasangkan nama dengan perumpamaannya dari sekolah.', 'Pasangkan jenis selector CSS dengan perumpamaannya.'),
        left: [
          { id: 'l1', label: t('Tag', 'p { } (Tag)') },
          { id: 'l2', label: t('Class', '.kartu { } (Class)') },
          { id: 'l3', label: t('ID', '#header { } (ID)') },
        ],
        right: [
          { id: 'r1', label: t('Semua murid di sekolah') },
          { id: 'r2', label: t('Semua anggota klub basket') },
          { id: 'r3', label: t('Satu murid dengan nomor unik') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3' },
        explainCorrect: t(
          'Tag untuk semua benda sejenis, class untuk kelompok, ID untuk satu benda. Seperti seluruh sekolah, satu klub, dan satu murid.',
          'Tag memilih semua elemen sejenis, class memilih kelompok, id memilih satu elemen unik. Urutannya dari paling luas ke paling sempit.',
        ),
        hints: [t('Ingat sekolah, klub basket, dan nomor murid.', 'Mulai dari yang paling luas: semua elemen sejenis.'), undefined],
        tags: ['selector', 'class-css'],
      }),
      qStep(
        makeMcq({
          id: 'a03-l01-q4',
          type: 'limit',
          analogy: t('Class seperti seragam kelompok'),
          prompt: t(
            'Sebuah kotak diberi 2 nama kelompok. Apa yang terjadi pada kotak itu?',
            'Apa yang boleh dilakukan pada class di elemen HTML?',
          ),
          choices: [
            {
              id: 'multi',
              label: t('Kotak ikut dihias oleh kedua kelompok', 'Satu elemen boleh memakai beberapa class'),
            },
            {
              id: 'one',
              label: t('Kotak hanya ikut kelompok pertama', 'Satu halaman hanya boleh punya satu class'),
              explainWrong: t(
                'Kotak boleh ikut lebih dari satu kelompok. Murid juga boleh ikut 2 klub.',
                'Class boleh dipakai berulang kali di satu halaman.',
              ),
            },
            {
              id: 'id',
              label: t('Kotak ditolak dan tidak dihias', 'Satu class hanya boleh dipakai satu elemen'),
              explainWrong: t(
                'Kotak tidak ditolak. Dua nama kelompok bisa dipakai bersamaan.',
                'Justru class dibuat supaya bisa dipakai ulang oleh banyak elemen.',
              ),
            },
          ],
          answer: 'multi',
          explainCorrect: t(
            'Satu kotak boleh punya banyak nama kelompok. Seperti murid yang ikut 2 klub.',
            'Satu elemen boleh punya beberapa class, misalnya class="btn btn-primary". Kedua class berlaku bersamaan.',
          ),
          hints: [t('Ingat murid yang ikut dua klub.', 'Ingat atribut class boleh berisi beberapa nama.')],
          difficulty: 2,
          tags: ['class-css'],
        }),
      ),
      qStep({
        id: 'a03-l01-q5',
        type: 'spotbug',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Ketuk baris yang kurang titik koma (;) di ujungnya.'),
        lines: [
          '.judul {',
          '  color: blue',
          '  background: white;',
          '}',
        ],
        answer: [2],
        explainCorrect: t('Baris 2 tidak diakhiri titik koma. Tanpa tanda itu, CSS tidak tahu deklarasi pertama sudah selesai.'),
        hints: [t('Periksa ujung setiap baris di dalam kurung kurawal.'), undefined],
        tags: ['selector'],
      }),
      qStep({
        id: 'a03-l01-q6',
        type: 'fill',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Lengkapi aturan agar semua elemen berkelas "peringatan" berwarna oranye.'),
        template: '___ { color: orange; }',
        bank: ['.peringatan', '#peringatan', 'peringatan'],
        answer: ['.peringatan'],
        explainCorrect: t('Class selalu dimulai tanda titik. Jadi .peringatan memilih semua elemen berkelas peringatan.'),
        hints: [t('Ingat tanda yang mengawali nama class.'), undefined],
        tags: ['class-css'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a03-l01-r1',
        prompt: t(
          'Kamu mau menghias banyak kotak sekaligus. Penunjuk mana yang paling sering dipakai?',
          'Dalam praktik sehari-hari, selector mana yang paling sering dipakai?',
        ),
        choices: [
          { id: 'c', label: t('Nama kelompok (class)', 'Class (.nama)') },
          {
            id: 'i',
            label: t('Nama satu benda (ID)', 'ID (#nama)'),
            explainWrong: t(
              'ID hanya untuk satu benda. Sulit dipakai untuk banyak kotak.',
              'ID hanya untuk satu elemen unik, jadi sulit dipakai ulang.',
            ),
          },
          {
            id: 't',
            label: t('Nama jenis benda (tag)', 'Tag (p)'),
            explainWrong: t(
              'Tag menunjuk semua benda sejenis. Itu terlalu luas untuk gaya khusus.',
              'Tag memilih semua elemen sejenis, jadi terlalu luas untuk gaya khusus.',
            ),
          },
        ],
        answer: 'c',
        explainCorrect: t(
          'Nama kelompok bisa dipakai banyak kotak. Seperti satu seragam untuk satu klub.',
          'Class mudah dipakai ulang di banyak elemen.',
        ),
        hints: [t('Ingat seragam klub yang dipakai banyak murid.')],
        tags: ['class-css'],
      }),
      makeTf({
        id: 'a03-l01-r2',
        prompt: t(
          'Perintah warna punya dua bagian: hal yang diubah dan hasilnya.',
          'Gabungan properti dan nilai, seperti color: navy;, disebut deklarasi.',
        ),
        answer: true,
        explainCorrect: t(
          'Hal yang diubah selalu berpasangan dengan hasilnya. Seperti "warna" dan "biru".',
          'Properti dan nilai selalu berpasangan dalam satu deklarasi.',
        ),
        explainWrong: t(
          'Hal yang diubah dan hasilnya memang berpasangan. Contohnya "warna" dan "biru".',
          'Properti + nilai membentuk satu deklarasi CSS.',
        ),
        hints: [t('Ingat pasangan "warna" dan "biru".')],
        tags: ['selector'],
      }),
    ],
    recap: t(
      'Selector menunjuk siapa yang dicat, lalu kamu memilih warnanya.',
      'Aturan CSS berisi selector yang memilih elemen, lalu properti dan nilai yang mengubah tampilannya.',
    ),
    companion: {
      talkPrompts: ['Kalau mau mengecat semua kartu, kamu menunjuk satu kartu atau satu kelompok?'],
      offlineActivity: 'Tempel stiker warna yang sama pada beberapa benda sekelompok di meja belajar.',
    },
  }),

  makeLesson({
    id: 'a03-l02',
    worldId: 'a03',
    title: 'Box model: lukisan berbingkai',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menyebut 4 lapis kotak dari dalam ke luar.',
      'Kamu bisa menyebut 4 lapis kotak CSS dan fungsi border-box.',
    ),
    estMinutes: 6,
    // box-model moved to a03-l03 so this Petualang lesson introduces only 2 new terms (X08).
    introducesTerms: ['padding', 'margin'],
    usesTerms: ['css', 'selector'],
    stickerId: 'lukisan-berbingkai',
    warmupFrom: 'a03-l01',
    atWork: 'Kamu akan memeriksa kotak elemen di tab Elements DevTools saat tombol terlihat sesak atau menempel.',
    steps: [
      storyStep('a03/lukisan-berbingkai.svg', [
        rJunior(
          'Semua benda di halaman web berbentuk kotak. Bayangkan lukisan berbingkai di dinding. Berapa lapis yang dimiliki kotak itu?',
        ),
        rPro('Tombol "Beli" di halaman Toko Rani terlihat sesak, dan kartu di sebelahnya menempel. Dua masalah itu berasal dari '),
        rTermPro('box-model', 'box model'),
        rPro(', yaitu kotak berlapis milik setiap elemen.'),
      ]),
      conceptStep({
        title: t('Isi dan ruang dalam', 'Content dan padding'),
        visualName: 'BoxModelDiagram',
        visualProps: { worldId: 'a03', topic: 'box-model-dalam' },
        alt: t(
          'Lukisan di tengah, dikelilingi ruang kosong.',
          'Diagram box model: content di tengah dikelilingi padding.',
        ),
        body: [
          rJunior('Lukisan adalah isi kotak. Ruang kosong antara lukisan dan bingkai disebut '),
          rPro('Content adalah isi elemen, misalnya teks atau gambar. Ruang kosong antara content dan garis tepi disebut '),
          rTerm('padding', 'padding', 'padding'),
          rText('.'),
        ],
      }),
      qStep({
        id: 'a03-l02-q1',
        type: 'hotspot',
        difficulty: 1,
        prompt: t(
          'Ketuk lapis kosong di antara isi dan bingkai.',
          'Ketuk lapisan yang menjadi ruang kosong antara isi dan garis tepi elemen.',
        ),
        image: 'a03-box-hotspot',
        regions: [
          { id: 'content', shape: 'rect', coords: [60, 60, 120, 40], label: 'Isi' },
          { id: 'padding', shape: 'rect', coords: [40, 40, 160, 80], label: 'Padding' },
          { id: 'border', shape: 'rect', coords: [20, 20, 200, 120], label: 'Bingkai (garis tepi)' },
          { id: 'margin', shape: 'rect', coords: [0, 0, 240, 160], label: 'Jarak luar' },
        ],
        answer: 'padding',
        explainCorrect: t(
          'Ruang itu ada di dalam bingkai. Seperti jarak antara foto dan tepi bingkainya.',
          'Padding berada di dalam garis tepi dan memberi ruang di sekitar isi.',
        ),
        hints: [t('Ingat jarak antara foto dan bingkainya.'), undefined],
        tags: ['padding', 'box-model'],
      }),
      conceptStep({
        title: t('Bingkai dan jarak luar', 'Border, margin, dan border-box'),
        visualName: 'BoxModelDiagram',
        visualProps: { worldId: 'a03', topic: 'box-model-luar' },
        alt: t(
          'Bingkai kayu mengelilingi lukisan, lalu ada jarak ke lukisan lain.',
          'Diagram box model: border sebagai bingkai dan margin sebagai jarak luar.',
        ),
        code: {
          lang: 'css',
          code: '* { box-sizing: border-box; }',
        },
        body: [
          rJunior('Bingkai kayu adalah garis tepi kotak. Jarak antar dua lukisan di dinding disebut '),
          rPro('Border adalah garis tepi elemen. Jarak kosong di luar border yang memisahkan elemen dari tetangganya disebut '),
          rTerm('margin', 'margin', 'margin'),
          rText('.'),
          rPro(' Aturan border-box membuat width sudah termasuk padding dan border.'),
        ],
      }),
      limitStep({
        analogy: t('Box model seperti lukisan berbingkai di dinding'),
        same: [
          t(
            'Kotak punya isi, ruang dalam, bingkai, dan jarak luar.',
            'Ada isi di tengah, ruang dalam, bingkai, dan jarak luar antar bingkai.',
          ),
        ],
        different: [
          t(
            'Jarak luar dua kotak bisa menyatu. Jarak dua lukisan tidak.',
            'Margin atas dan bawah dua kotak yang bertumpuk bisa menyatu (margin collapsing). Jarak dua lukisan di dinding tidak menyatu.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'kupas-box-model',
        t(
          'Geser slider untuk melihat kotaknya membesar atau menjauh.',
          'Uji perubahan border, margin, dan border-box di simulator.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a03-l02-q2',
          type: 'analogy',
          prompt: t(
            'Dua bingkai foto digantung berdekatan. Jarak di luar bingkai itu disebut apa?',
            'Dua bingkai foto di dinding diberi jarak agar tidak menempel. Lapis box model mana yang berperan seperti jarak itu?',
          ),
          choices: [
            { id: 'm', label: t('Margin') },
            {
              id: 'p',
              label: t('Padding'),
              explainWrong: t(
                'Padding ada di dalam bingkai, bukan di luar. Ia memberi ruang untuk isi.',
                'Padding berada di dalam bingkai, bukan di luar.',
              ),
            },
            {
              id: 'c',
              label: t('Isi gambar', 'Content'),
              explainWrong: t(
                'Isi gambar adalah lukisannya. Jarak antar bingkai ada di luar.',
                'Content adalah isi gambarnya, bukan jaraknya.',
              ),
            },
          ],
          answer: 'm',
          explainCorrect: t(
            'Margin memberi jarak antar kotak di luar garis tepinya. Seperti jarak antar foto di dinding.',
            'Margin memberi jarak antar kotak di luar garis tepinya.',
          ),
          hints: [t('Bayangkan dua foto di dinding yang tidak menempel.', 'Jarak ini ada di luar border.')],
          tags: ['margin'],
        }),
      ),
      qStep({
        id: 'a03-l02-q3',
        type: 'order',
        difficulty: 2,
        prompt: t(
          'Urutkan 4 lapis kotak dari yang paling dalam ke paling luar.',
          'Urutkan empat lapis box model dari yang paling dalam ke paling luar.',
        ),
        items: [
          { id: 'c', label: t('Isi (lukisan)', 'Content (isi)') },
          { id: 'p', label: t('Padding (ruang dalam)', 'Padding') },
          { id: 'b', label: t('Bingkai', 'Border') },
          { id: 'm', label: t('Margin (jarak luar)', 'Margin') },
        ],
        answer: ['c', 'p', 'b', 'm'],
        explainCorrect: t(
          'Isi ada di tengah. Padding, bingkai, lalu jarak luar membungkusnya.',
          'Content ada di tengah. Setiap lapis berikutnya membungkus lapis sebelumnya, sampai margin di luar.',
        ),
        hints: [t('Mulai dari lukisan di tengah.', 'Mulai dari yang di tengah, berakhir di yang paling jauh.'), undefined],
        tags: ['box-model'],
      }),
      qStep(
        makeMcq({
          id: 'a03-l02-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Lukisan berbingkai'),
          prompt: t(
            'Dua kotak bertumpuk, masing-masing punya jarak luar. Apa yang terjadi pada dua jarak luar yang bertemu?',
            'Mana perilaku CSS yang TIDAK terjadi pada bingkai lukisan di dinding?',
          ),
          choices: [
            {
              id: 'col',
              label: t('Menyatu menjadi satu jarak', 'Margin atas-bawah dua kotak melebur jadi satu'),
            },
            {
              id: 'in',
              label: t('Ditambah jadi satu jarak yang lebih lebar', 'Isi berada di tengah bingkai'),
              explainWrong: t(
                'Jaraknya tidak ditambah. CSS memakai satu jarak yang terbesar.',
                'Isi juga berada di tengah elemen CSS, jadi sifat ini sama.',
              ),
            },
            {
              id: 'out',
              label: t('Hilang dua-duanya sampai kotak menempel', 'Ada jarak antara satu lukisan dan tetangganya'),
              explainWrong: t(
                'Jaraknya tidak hilang. Kotak tetap terpisah oleh satu jarak.',
                'Jarak ke tetangga juga ada di CSS, jadi sifat ini sama.',
              ),
            },
          ],
          answer: 'col',
          explainCorrect: t(
            'Di CSS, dua jarak luar yang bertemu menyatu. Dua lukisan di dinding tidak begitu.',
            'Margin vertikal yang bersebelahan menyatu menjadi jarak yang terbesar. Dua lukisan di dinding tidak begitu.',
          ),
          hints: [t('Lihat lagi kartu "Mirip, tetapi berbeda".', 'Ingat kartu Batas Analogi tadi.')],
          difficulty: 2,
          tags: ['margin', 'box-model'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-l02-q5',
          type: 'scenario',
          story: t(
            'Tulisan di tombol "Beli" menempel ke tepi tombol. Tombol itu terasa sesak.',
            'Teks di dalam tombol "Beli" menempel terlalu rapat ke garis tepi tombol.',
          ),
          prompt: t(
            'Apa yang perlu ditambah supaya tombol terasa lega di dalam?',
            'Properti apa yang perlu ditambah supaya teks punya ruang di dalam tombol?',
          ),
          difficulty: 2,
          choices: [
            { id: 'pad', label: t('Tambah padding') },
            {
              id: 'mar',
              label: t('Tambah margin'),
              explainWrong: t(
                'Margin hanya menjauhkan tombol dari kotak lain. Ruang di dalam tidak berubah.',
                'Margin hanya mendorong tombol menjauh dari elemen lain.',
              ),
            },
            {
              id: 'h1',
              label: t('Tebalkan bingkai', 'Tambah border tebal'),
              explainWrong: t(
                'Bingkai tebal hanya mengubah garis tepinya. Ruang di dalam tombol tetap sempit.',
                'Border hanya menebalkan garis tepi. Ruang antara teks dan tepi tidak berubah.',
              ),
            },
          ],
          answer: 'pad',
          explainCorrect: t(
            'Padding memberi ruang antara tulisan dan bingkai. Seperti ruang antara foto dan bingkainya.',
            'Padding menambah ruang antara teks dan garis tepi tombol. Margin hanya mengatur jarak ke elemen lain.',
          ),
          hints: [t('Cari ruang di dalam bingkai tombol.', 'Ruang yang dicari ada di antara teks dan garis tepi.')],
          tags: ['padding'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a03-l02-q6',
          modes: ['pro'],
          prompt: t('Dengan * { box-sizing: border-box; }, nilai width sudah mencakup padding dan border.'),
          answer: true,
          explainCorrect: t('Lebar elemen tetap sama saat padding ditambah. Kotak tidak melebar tanpa terduga.'),
          explainWrong: t('Dengan border-box, padding dan border masuk ke dalam ukuran width.'),
          tags: ['box-model'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a03-l02-r1',
        prompt: t(
          'Jarak di luar bingkai yang memisahkan dua kotak disebut apa?',
          'Jarak di luar border yang memisahkan satu kotak dari kotak lain disebut apa?',
        ),
        choices: [
          { id: 'm', label: t('Margin') },
          {
            id: 'p',
            label: t('Padding'),
            explainWrong: t(
              'Padding ada di dalam bingkai. Margin ada di luarnya.',
              'Padding ada di dalam garis tepi, bukan di luarnya.',
            ),
          },
          {
            id: 'b',
            label: t('Bingkai', 'Border'),
            explainWrong: t(
              'Bingkai adalah garis tepinya sendiri. Ia bukan jarak.',
              'Border adalah garis tepinya sendiri, bukan jarak.',
            ),
          },
        ],
        answer: 'm',
        explainCorrect: t(
          'Jarak luar memisahkan satu bingkai dari bingkai lain.',
          'Margin adalah jarak di bagian luar border.',
        ),
        hints: [t('Ingat dua foto yang tidak menempel.')],
        tags: ['margin'],
      }),
      makeMcq({
        id: 'a03-l02-r2',
        prompt: t(
          'Ruang kosong di dalam bingkai, antara isi dan tepi, disebut apa?',
          'Jarak di dalam kotak antara content dan border disebut apa?',
        ),
        choices: [
          { id: 'p', label: t('Padding') },
          {
            id: 'm',
            label: t('Margin'),
            explainWrong: t(
              'Margin ada di luar bingkai. Ruang ini ada di dalamnya.',
              'Margin ada di luar border, bukan di dalam.',
            ),
          },
          {
            id: 'b',
            label: t('Bingkai', 'Border'),
            explainWrong: t(
              'Bingkai adalah garisnya, bukan ruang kosongnya.',
              'Border adalah garisnya, bukan ruang kosongnya.',
            ),
          },
        ],
        answer: 'p',
        explainCorrect: t(
          'Padding adalah ruang bantalan di dalam bingkai.',
          'Padding adalah ruang bantalan di dalam bingkai.',
        ),
        hints: [t('Ingat ruang antara foto dan bingkainya.')],
        tags: ['padding'],
      }),
    ],
    recap: t(
      'Kotak punya 4 lapis: isi, padding, bingkai, dan margin.',
      'Setiap elemen punya empat lapis dari dalam ke luar. Border-box membuat width sudah termasuk padding dan border.',
    ),
    companion: {
      talkPrompts: ['Di kartu ini, mana ruang dalamnya dan mana jarak antar kartu?'],
      offlineActivity: 'Letakkan foto di atas kertas yang lebih besar. Sisa tepi di dalam bingkai itu padding, jarak ke foto sebelah itu margin.',
    },
  }),

  makeLesson({
    id: 'a03-l03',
    worldId: 'a03',
    title: 'Satuan ukuran',
    modes: ['pro'],
    objective: t('Kamu bisa memilih satuan CSS yang tepat untuk garis, huruf, lebar, dan kolom.'),
    estMinutes: 5,
    // box-model is introduced here (see a03-l02): the Petualang lesson keeps to 2 new terms.
    introducesTerms: ['rem-unit', 'box-model'],
    usesTerms: ['css'],
    warmupFrom: 'a03-l02',
    atWork: 'Kamu akan mengganti px dengan rem saat teks di halaman tidak ikut membesar ketika orang memperbesar huruf.',
    steps: [
      storyStep('a03/penggaris.svg', [
        rText(
          'Garis bingkai cukup memakai ukuran tetap, tetapi lebar tirai harus mengikuti jendela. Ukuran CSS bekerja dengan cara yang sama.',
        ),
      ]),
      conceptStep({
        title: t('Satuan tetap dan satuan huruf'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'satuan-px-rem' },
        alt: t('Perbandingan px yang tetap dan rem yang mengikuti huruf dasar 16px.'),
        body: [
          rTerm('rem-unit', 'rem', 'rem'),
          rText(
            ' adalah satuan yang mengikuti ukuran huruf dasar halaman (biasanya 1rem = 16px). Ia ikut membesar saat orang memperbesar huruf di pengaturan browser. Satuan px berukuran tetap, cocok untuk garis tepi dan bayangan.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a03-l03-q2',
          prompt: t('Ukuran huruf dasar bawaan browser biasanya 16px. Dengan dasar itu, berapa px ukuran 1.5rem?'),
          choices: [
            { id: '24', label: t('24px') },
            {
              id: '15',
              label: t('15px'),
              explainWrong: t('Hasil itu muncul bila 1,5 dikali 10. Kalikan dengan 16, bukan 10.'),
            },
            {
              id: '32',
              label: t('32px'),
              explainWrong: t('32px adalah 2rem. Ukuran 1,5rem lebih kecil dari itu.'),
            },
          ],
          answer: '24',
          explainCorrect: t('Rem adalah kelipatan ukuran huruf dasar. Hitungnya 1,5 × 16px = 24px.'),
          hints: [t('Kalikan 1,5 dengan 16.')],
          tags: ['rem-unit'],
        }),
      ),
      conceptStep({
        title: t('Satuan ruang: %, vw, vh, dan fr'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'satuan-persen-fr' },
        alt: t('Satuan %, vw, vh, dvh, dan fr untuk pembagian kolom Grid.'),
        body: [
          rText(
            '% mengikuti lebar elemen induknya. vw dan vh mengikuti ukuran layar, dan dvh dipakai di HP. fr membagi sisa ruang kosong di CSS Grid.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Penggaris tetap dan ukuran proporsi'),
        same: [t('px selalu sama seperti penggaris kayu. % dan rem berubah mengikuti acuannya.')],
        different: [t('Ukuran huruf dalam px tidak ikut berubah saat orang mengubah ukuran huruf di pengaturan browser. Zoom halaman tetap memperbesarnya.')],
        riskyAnalogy: false,
      }),
      simStep('kupas-box-model', t('Ubah ukuran di simulator, lalu amati kotak dan padding.')),
      qStep({
        id: 'a03-l03-q1',
        type: 'match',
        difficulty: 1,
        prompt: t('Pasangkan satuan CSS dengan kegunaan terbaiknya.'),
        left: [
          { id: 'px', label: t('px') },
          { id: 'rem', label: t('rem') },
          { id: 'fr', label: t('fr') },
          { id: 'pct', label: t('%') },
        ],
        right: [
          { id: 'r1', label: t('Garis tepi tipis (border: 2px)') },
          { id: 'r2', label: t('Ukuran huruf dan jarak yang konsisten') },
          { id: 'r3', label: t('Pembagian kolom di CSS Grid') },
          { id: 'r4', label: t('Lebar relatif terhadap wadah induk') },
        ],
        answer: { px: 'r1', rem: 'r2', fr: 'r3', pct: 'r4' },
        explainCorrect: t('Pilih satuan sesuai tugasnya: px untuk garis, rem untuk huruf, fr untuk kolom, persen untuk lebar relatif.'),
        hints: [t('Cocokkan fr dulu, lalu sisanya.'), undefined],
        tags: ['rem-unit'],
      }),
      qStep(
        makeMcq({
          id: 'a03-l03-q3',
          prompt: t('Apa beda utama em dan rem?'),
          choices: [
            { id: 'diff', label: t('rem mengikuti huruf akar, em huruf elemennya') },
            {
              id: 'same',
              label: t('em mengikuti lebar layar, rem mengikuti tinggi layar'),
              explainWrong: t('Yang mengikuti ukuran layar adalah vw dan vh. em dan rem sama-sama mengikuti ukuran huruf.'),
            },
            {
              id: 'px',
              label: t('em selalu tetap, rem berubah mengikuti induk'),
              explainWrong: t('Terbalik: em yang berpatokan pada huruf elemen atau induknya. rem selalu berpatokan pada huruf akar.'),
            },
          ],
          answer: 'diff',
          explainCorrect: t('Rem berpatokan pada huruf html, em pada huruf elemen itu sendiri. Karena itu em cocok untuk padding tombol agar ikut ukuran huruf tombol.'),
          difficulty: 2,
          hints: [t('Tanyakan: ukuran huruf siapa yang dijadikan patokan?')],
          tags: ['rem-unit'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-l03-q4',
          type: 'limit',
          analogy: t('Penggaris cm dan skala rem'),
          prompt: t('Apa masalahnya kalau semua teks halaman memakai px?'),
          choices: [
            { id: 'zoom', label: t('Teks mengabaikan ukuran huruf di pengaturan browser') },
            {
              id: 'err',
              label: t('Teks px selalu tampak buram di layar HP modern'),
              explainWrong: t('Teks px tampil tajam seperti satuan lain. Masalahnya ada pada pengaturan ukuran huruf.'),
            },
            {
              id: 'css',
              label: t('Teks px terlalu besar di layar HP yang kecil'),
              explainWrong: t('px tidak otomatis menjadi besar atau kecil. Ukurannya sama di semua layar.'),
            },
          ],
          answer: 'zoom',
          explainCorrect: t('Satuan rem mengikuti ukuran huruf di pengaturan browser. Teks px mengabaikannya, walau zoom halaman tetap memperbesarnya.'),
          difficulty: 2,
          hints: [t('Pikirkan orang yang butuh huruf lebih besar untuk membaca.')],
          tags: ['rem-unit'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a03-l03-q5',
          prompt: t('Di browser HP, 100dvh lebih akurat daripada 100vh karena memperhitungkan bilah alamat yang muncul dan hilang.'),
          answer: true,
          explainCorrect: t('dvh (dynamic viewport height) menyesuaikan tinggi layar saat bilah alamat berubah. Bagian bawah halaman tidak tertutup.'),
          explainWrong: t('100vh sering terlalu tinggi saat bilah alamat tampil, jadi bagian bawah halaman tertutup.'),
          tags: ['rem-unit'],
        }),
      ),
      qStep({
        id: 'a03-l03-q6',
        type: 'type',
        difficulty: 2,
        prompt: t('Tulis nama satuan CSS khusus Grid yang berarti "bagian dari sisa ruang".'),
        accept: ['fr'],
        explainCorrect: t('Contohnya 1fr 2fr membagi sisa ruang menjadi satu bagian dan dua bagian.'),
        hints: [t('Namanya hanya dua huruf. Kamu pernah melihatnya di 1fr 2fr 1fr.'), undefined],
        tags: ['rem-unit'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a03-l03-r1',
        prompt: t('Satuan apa yang paling tepat untuk ukuran teks agar mengikuti pengaturan huruf browser?'),
        choices: [
          { id: 'rem', label: t('rem') },
          {
            id: 'fr',
            label: t('fr'),
            explainWrong: t('fr hanya dipakai untuk kolom dan baris CSS Grid.'),
          },
          {
            id: 'px',
            label: t('px'),
            explainWrong: t('px berukuran tetap, jadi tidak mengikuti pengaturan huruf.'),
          },
        ],
        answer: 'rem',
        explainCorrect: t('rem selalu relatif terhadap ukuran huruf dasar elemen html.'),
        tags: ['rem-unit'],
      }),
      makeTf({
        id: 'a03-l03-r2',
        prompt: t('Satuan px cocok untuk ketebalan garis tepi yang tidak perlu ikut membesar saat huruf membesar.'),
        answer: true,
        explainCorrect: t('Garis tipis 1 sampai 2px memang umum memakai px.'),
        explainWrong: t('Border tipis memang umum memakai px, karena tebalnya tidak perlu berubah.'),
        tags: ['rem-unit'],
      }),
    ],
    recap: t('Pakai px untuk garis tipis, rem untuk huruf dan jarak, persen atau dvh untuk proporsi layar, fr untuk Grid.'),
  }),

  makeLesson({
    id: 'a03-l04',
    worldId: 'a03',
    title: 'Flexbox: buku di rak',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menata kotak ke kiri, tengah, atau tersebar rata.',
      'Kamu bisa menata satu baris elemen dengan display: flex, justify-content, dan align-items.',
    ),
    estMinutes: 6,
    introducesTerms: ['flexbox'],
    usesTerms: ['css', 'box-model'],
    stickerId: 'rak-buku',
    warmupFrom: 'a03-l02',
    atWork: 'Kamu akan memakai Flexbox untuk meratakan logo dan menu di header, atau menyejajarkan tombol di dalam kartu.',
    steps: [
      storyStep('a03/rak-buku.svg', [
        rText(
          'Kamu punya satu rak panjang dan banyak buku. Bagaimana cara menatanya dengan rapi?',
          'Logo dan menu di header Toko Rani menumpuk di kiri. Kamu perlu membaginya rata dengan beberapa baris CSS.',
        ),
      ]),
      conceptStep({
        title: t('Rak: kiri, tengah, atau rata', 'display: flex dan arah utama'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'flexbox-justify' },
        alt: t(
          'Tiga rak: buku di kiri, di tengah, dan tersebar rata.',
          'Nilai justify-content: flex-start, center, dan space-between.',
        ),
        code: {
          lang: 'css',
          code: '.rak {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}',
        },
        body: [
          rTerm('flexbox', 'Flexbox', 'Flexbox'),
          rJunior(
            ' menata kotak dalam satu baris, seperti buku di rak. Kamu bisa mendorong buku ke kiri, ke tengah, atau menyebarnya rata.',
          ),
          rPro(' adalah cara menata item dalam satu baris atau satu kolom. '),
          rCode('justify-content', ['pro']),
          rPro(' mengatur arah utama, dan '),
          rCode('align-items', ['pro']),
          rPro(' mengatur arah silang.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a03-l04-q1',
          prompt: t(
            'Kamu mau buku berkumpul, sama jauh dari kedua ujung rak. Mana yang kamu pilih?',
            'Item di baris Flexbox ingin dikumpulkan di tengah arah mendatar. Nilai justify-content mana yang dipakai?',
          ),
          choices: [
            { id: 'c', label: t('Geser ke tengah rak', 'justify-content: center') },
            {
              id: 'sb',
              label: t('Sebar sampai kedua ujung rak', 'justify-content: space-between'),
              explainWrong: t(
                'Disebar berarti buku pertama menempel ke kiri. Buku terakhir menempel ke kanan.',
                'space-between menyebar item sampai ujung kiri dan kanan.',
              ),
            },
            {
              id: 'end',
              label: t('Dorong ke ujung kanan rak', 'justify-content: flex-end'),
              explainWrong: t(
                'Dorong ke kanan membuat semua buku menumpuk di ujung kanan.',
                'flex-end mendorong semua item ke ujung kanan.',
              ),
            },
          ],
          answer: 'c',
          explainCorrect: t(
            'Buku berkumpul di tengah rak. Ruang kosong di kiri dan kanan sama lebar.',
            'center mengumpulkan item di tengah arah utama. Ruang kosong terbagi sama di kedua sisi.',
          ),
          hints: [t('Ingat tiga cara menata buku di kartu tadi.', 'Cari nilai yang memusatkan item.')],
          tags: ['flexbox'],
        }),
      ),
      conceptStep({
        title: t('Jarak dan turun baris', 'gap, flex-wrap, flex-direction'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'flexbox-wrap' },
        alt: t(
          'Buku yang turun ke baris baru saat rak penuh.',
          'Kartu yang otomatis turun baris saat flex-wrap: wrap aktif.',
        ),
        body: [
          rJunior('Kamu bisa memberi jarak antar buku. Kalau rak penuh, buku turun ke baris baru.'),
          rPro('Gunakan '),
          rCode('gap', ['pro']),
          rPro(' untuk jarak antar item dan '),
          rCode('flex-wrap: wrap', ['pro']),
          rPro(' agar item turun ke baris baru bila ruang penuh.'),
        ],
      }),
      limitStep({
        analogy: t('Menata buku di satu rak'),
        same: [
          t(
            'Kamu menata buku sepanjang satu baris rak.',
            'Flexbox menata item sepanjang satu baris, seperti buku di rak.',
          ),
        ],
        different: [
          t(
            'Rak Flexbox bisa diputar jadi menara.',
            'Rak Flexbox bisa diputar menjadi kolom vertikal dengan flex-direction: column atau turun baris dengan flex-wrap.',
          ),
        ],
        riskyAnalogy: false,
      }),
      simStep(
        'playground-flexbox',
        t(
          'Ubah posisi buku, lalu lihat kotaknya pindah.',
          'Ubah justify-content, align-items, dan gap di Playground Flexbox.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a03-l04-q2',
          type: 'analogy',
          prompt: t('Flexbox paling cocok untuk menata apa?', 'Flexbox paling cocok untuk mengatur apa?'),
          choices: [
            { id: 'one', label: t('Satu deretan menu', 'Satu deretan menu atau isi kartu') },
            {
              id: 'two',
              label: t('Papan catur berbaris dan berkolom', 'Kotak 8 × 8 yang kaku di dua arah'),
              explainWrong: t(
                'Papan catur butuh baris dan kolom sekaligus. Flexbox hanya mengatur satu arah.',
                'Untuk dua arah sekaligus, baris dan kolom, lebih cocok CSS Grid.',
              ),
            },
            {
              id: 'sec',
              label: t('Garis tepi di sekitar kotak', 'Garis tepi dan sudut membulat'),
              explainWrong: t(
                'Garis tepi dibuat oleh border. Flexbox hanya mengatur susunan kotak.',
                'Garis tepi dan sudut diatur oleh border, bukan Flexbox.',
              ),
            },
          ],
          answer: 'one',
          explainCorrect: t(
            'Flexbox menata satu deretan, seperti buku di satu rak. Untuk baris dan kolom sekaligus, ada alat lain.',
            'Flexbox ahli menata satu dimensi: satu baris atau satu kolom.',
          ),
          hints: [t('Ingat satu rak berisi satu deretan buku.', 'Ingat kata kunci satu arah.')],
          tags: ['flexbox'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-l04-q3',
          prompt: t(
            'Kamu mau jarak rapi antar buku tanpa mengatur satu per satu. Mana yang membantu?',
            'Properti Flexbox mana yang memberi jarak rapi antar item tanpa margin di tiap item?',
          ),
          choices: [
            { id: 'gap', label: t('Pasang satu celah untuk seluruh rak', 'gap') },
            {
              id: 'alt',
              label: t('Dorong buku ke sisi kiri rak', 'align-items'),
              explainWrong: t(
                'Buku yang didorong ke kiri justru saling menempel. Jarak rapi tidak muncul.',
                'align-items mengatur posisi di arah silang, bukan jarak antar item.',
              ),
            },
            {
              id: 'pad',
              label: t('Lebarkan setiap buku di rak', 'padding'),
              explainWrong: t(
                'Buku yang lebih lebar tetap menempel. Jarak di antaranya tidak berubah.',
                'padding memberi ruang di dalam tiap item, bukan di antara item.',
              ),
            },
          ],
          answer: 'gap',
          explainCorrect: t(
            'Satu celah berlaku untuk seluruh rak. Jarak di antara semua buku jadi sama lebar.',
            'gap memberi celah hanya di antara item. Tidak perlu margin di tiap item.',
          ),
          hints: [t('Ingat rak yang memberi jarak antar buku.', 'Cari properti yang bekerja di antara item.')],
          tags: ['flexbox'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-l04-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Buku berjajar di satu rak'),
          prompt: t('Kemampuan apa yang dimiliki Flexbox tetapi tidak dimiliki satu baris rak kayu?'),
          choices: [
            { id: 'wrap', label: t('Bisa diputar menjadi kolom atau turun baris') },
            {
              id: 'left',
              label: t('Bisa merapatkan item ke sisi kiri atau kanan'),
              explainWrong: t('Rak kayu juga bisa merapatkan buku ke satu sisi.'),
            },
            {
              id: 'mid',
              label: t('Bisa dirapatkan tepat di tengah rak'),
              explainWrong: t('Rak kayu juga bisa mengumpulkan buku di tengah.'),
            },
          ],
          answer: 'wrap',
          explainCorrect: t('flex-direction dan flex-wrap membuat wadah menyesuaikan ruang, hal yang tidak bisa dilakukan rak kayu.'),
          difficulty: 2,
          hints: [t('Cari kemampuan yang hanya dimiliki layar, bukan rak kayu.')],
          tags: ['flexbox'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-l04-q5',
          type: 'scenario',
          story: t(
            'Di bagian atas halaman Toko Rani ada logo dan menu. Keduanya menempel di kiri.',
            'Header Toko Rani punya logo dan menu. Keduanya menempel rapat di sisi kiri.',
          ),
          prompt: t(
            'Cara menata apa yang memisahkan logo ke kiri dan menu ke kanan?',
            'Nilai justify-content mana yang memisahkan logo ke ujung kiri dan menu ke ujung kanan?',
          ),
          difficulty: 2,
          choices: [
            { id: 'sb', label: t('Sebar ke kedua ujung', 'space-between') },
            {
              id: 'fs',
              label: t('Rapatkan semuanya ke kiri', 'flex-start'),
              explainWrong: t(
                'Dirapatkan ke kiri membuat keduanya tetap menumpuk di kiri.',
                'flex-start menumpuk semua item di kiri. Logo dan menu tidak terpisah.',
              ),
            },
            {
              id: 'c',
              label: t('Kumpulkan keduanya di tengah', 'center'),
              explainWrong: t(
                'Dikumpulkan di tengah membuat keduanya berdekatan. Logo dan menu tidak terpisah.',
                'center menaruh kedua item berdekatan di tengah. Logo dan menu tidak terpisah.',
              ),
            },
          ],
          answer: 'sb',
          explainCorrect: t(
            'Disebar berarti kotak pertama di kiri dan kotak terakhir di kanan. Seperti buku pertama dan terakhir di ujung rak.',
            'space-between menaruh item pertama di kiri dan item terakhir di kanan. Sisa ruang dibagi rata di antaranya.',
          ),
          hints: [t('Bayangkan buku pertama di ujung kiri rak.', 'Pikirkan nilai yang menyebar item ke kedua ujung.')],
          tags: ['flexbox'],
        }),
      ),
      qStep({
        id: 'a03-l04-q6',
        type: 'fill',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Lengkapi CSS agar item di baris Flexbox sejajar di tengah secara vertikal.'),
        template: '.navbar { display: flex; ___: center; }',
        bank: ['align-items', 'box-sizing', 'text-decoration'],
        answer: ['align-items'],
        explainCorrect: t('align-items mengatur perataan di arah silang, yaitu vertikal pada baris.'),
        hints: [t('Arah silang tegak lurus dengan arah baris.'), undefined],
        tags: ['flexbox'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a03-l04-r1',
        prompt: t(
          'Kamu mau menjejerkan kotak ke samping. Perintah apa yang dipasang di kotak pembungkus?',
          'Properti apa yang wajib dipasang di wadah induk agar anak-anaknya berjajar dengan Flexbox?',
        ),
        choices: [
          { id: 'df', label: t('Perintah susun berjajar', 'display: flex;') },
          {
            id: 'bc',
            label: t('Perintah warna bingkai', 'border-color: red;'),
            explainWrong: t(
              'Warna bingkai hanya mengubah warna garis. Kotak tidak berjajar.',
              'border-color hanya mengatur warna bingkai.',
            ),
          },
          {
            id: 'fs',
            label: t('Perintah ukuran huruf', 'font-size: 20px;'),
            explainWrong: t(
              'Ukuran huruf hanya mengubah besar tulisan. Kotak tidak berjajar.',
              'font-size hanya mengatur besar huruf.',
            ),
          },
        ],
        answer: 'df',
        explainCorrect: t(
          'Perintah susun berjajar mengaktifkan Flexbox di kotak pembungkus.',
          'display: flex; mengaktifkan tata letak Flexbox.',
        ),
        hints: [t('Ingat rak yang menjejerkan buku.')],
        tags: ['flexbox'],
      }),
      makeTf({
        id: 'a03-l04-r2',
        prompt: t(
          'Jarak antar buku hanya muncul di antara buku, bukan di tepi rak.',
          'Properti gap di Flexbox memberi jarak hanya di antara item, bukan di tepi luar wadah.',
        ),
        answer: true,
        explainCorrect: t(
          'Jarak itu hanya mengisi celah di antara buku. Tepi rak tetap kosong.',
          'gap hanya menyisipkan celah di antara anak-anak wadah flex.',
        ),
        explainWrong: t(
          'Jarak itu hanya mengisi celah antar buku. Tepi rak tidak ikut diberi jarak.',
          'gap hanya menyisipkan celah di antara anak-anak wadah flex, bukan di tepinya.',
        ),
        hints: [t('Ingat celah di antara dua buku.')],
        tags: ['flexbox'],
      }),
    ],
    recap: t(
      'Flexbox menata kotak dalam satu baris, seperti buku di rak.',
      'Flexbox menata item dalam satu arah. Perataan diatur justify-content dan align-items, jarak diatur gap.',
    ),
    companion: {
      talkPrompts: ['Kalau 4 buku disusun di rak, bagaimana posisi "tengah" dan "tersebar rata"?'],
      offlineActivity: 'Susun 4 balok atau buku di meja, lalu coba posisi kiri, tengah, dan tersebar rata.',
    },
  }),

  makeLesson({
    id: 'a03-l05',
    worldId: 'a03',
    title: 'Grid: kotak bekal',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa memilih kapan memakai Grid dan kapan Flexbox.',
      'Kamu bisa menyusun tata letak baris dan kolom dengan display: grid dan satuan fr.',
    ),
    estMinutes: 6,
    introducesTerms: ['grid-css'],
    usesTerms: ['css', 'flexbox'],
    stickerId: 'kotak-bekal',
    warmupFrom: 'a03-l04',
    atWork: 'Kamu akan memakai Grid untuk katalog produk berkolom dan kerangka halaman, lalu Flexbox untuk isi tiap kartu.',
    steps: [
      storyStep('a03/kotak-bekal.svg', [
        rText(
          'Lihat kotak bekal ini. Nasi di atas, sayur dan lauk di bawah, semuanya bersekat. Bagaimana menata halaman seperti ini?',
          'Halaman produk Toko Rani butuh katalog 4 kolom dan header selebar halaman. Flexbox satu arah kurang pas untuk itu.',
        ),
      ]),
      conceptStep({
        title: t('Baris dan kolom sekaligus', 'display: grid dan kolom fr'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'css-grid' },
        alt: t(
          'Kotak bekal dengan sekat nasi, sayur, dan lauk.',
          'Grid tiga kolom 1fr 2fr 1fr dengan header dan footer.',
        ),
        code: {
          lang: 'css',
          code: '.halaman {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  gap: 16px;\n}',
        },
        body: [
          rTerm('grid-css', 'CSS Grid', 'CSS Grid'),
          rJunior(' membagi halaman menjadi baris dan kolom, seperti sekat kotak bekal. Setiap sekat bisa diisi satu benda.'),
          rPro(' adalah cara menata elemen dalam baris dan kolom sekaligus. Kolom diatur dengan satuan fr, yaitu bagian dari sisa ruang.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a03-l05-q1',
          type: 'analogy',
          prompt: t(
            'Kamu mau menata 12 foto rapi dalam 3 kolom dan 4 baris. Alat mana yang pas?',
            'Galeri 12 foto harus rapi dalam 3 kolom dan 4 baris. Sistem tata letak apa yang paling pas?',
          ),
          choices: [
            { id: 'grid', label: t('CSS Grid') },
            {
              id: 'p',
              label: t('Flexbox', 'Flexbox satu baris'),
              explainWrong: t(
                'Flexbox menata satu baris. Untuk 3 kolom dan 4 baris, ada alat lain.',
                'Flexbox menata satu arah, jadi kurang pas untuk kisi kolom dan baris yang kaku.',
              ),
            },
            {
              id: 'href',
              label: t('Margin'),
              explainWrong: t(
                'Margin hanya mengatur jarak luar. Ia tidak membagi ruang menjadi kolom.',
                'Margin hanya memberi jarak luar pada satu elemen.',
              ),
            },
          ],
          answer: 'grid',
          explainCorrect: t(
            'Grid membagi ruang menjadi baris dan kolom. Seperti sekat kotak bekal.',
            'Galeri berbaris dan berkolom adalah keahlian CSS Grid.',
          ),
          hints: [t('Ingat kotak bekal punya baris dan kolom.', 'Hitung jumlah arah yang dibutuhkan: satu atau dua?')],
          tags: ['grid-css'],
        }),
      ),
      conceptStep({
        title: t('Grid dan Flexbox bersama', 'Dipakai bersamaan'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'flex-vs-grid' },
        alt: t(
          'Kerangka kotak bekal dengan rak kecil di dalamnya.',
          'Kerangka luar Grid dengan isi kartu memakai Flexbox.',
        ),
        body: [
          rText(
            'Kamu bisa memakai keduanya. Grid menyusun kerangka halaman. Flexbox menata tombol di dalam setiap kartu.',
            'Keduanya sering bekerja sama: Grid menyusun kerangka halaman besar, lalu Flexbox menata tombol di dalam setiap kartu.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Kotak bekal bersekat'),
        same: [
          t(
            'Ruang dibagi dengan batas baris dan kolom yang jelas.',
            'Ruang dibagi secara dua dimensi dengan batas baris dan kolom yang jelas.',
          ),
        ],
        different: [
          t(
            'Satu sekat Grid boleh melebar ke beberapa kolom.',
            'Di Grid, satu area bisa melebar melintasi beberapa kolom, dan jumlah kolom bisa berubah di layar kecil.',
          ),
        ],
        riskyAnalogy: false,
      }),
      simStep(
        'playground-flexbox',
        t(
          'Ubah susunan di simulator, lalu bandingkan satu arah dan dua arah.',
          'Amati perbedaan perilaku Flexbox satu arah dan Grid dua arah.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a03-l05-q2',
          prompt: t(
            'Sekat kiri dapat 1 bagian, tengah 2 bagian, kanan 1 bagian. Sekat mana yang paling lebar?',
            'Dengan grid-template-columns: 1fr 2fr 1fr, kolom mana yang paling lebar?',
          ),
          choices: [
            { id: 'mid', label: t('Sekat tengah', 'Kolom tengah') },
            {
              id: 'left',
              label: t('Sekat kiri', 'Kolom kiri'),
              explainWrong: t(
                'Kiri hanya dapat 1 bagian. Tengah dapat 2 bagian.',
                'Kolom kiri hanya mendapat 1 bagian, kolom tengah mendapat 2 bagian.',
              ),
            },
            {
              id: 'eq',
              label: t('Ketiganya sama lebar', 'Ketiganya sama lebar'),
              explainWrong: t(
                'Jatahnya tidak sama. Tengah dapat dua kali lipat.',
                '1fr 2fr 1fr berarti kolom tengah dua kali lebih lebar dari kolom samping.',
              ),
            },
          ],
          answer: 'mid',
          explainCorrect: t(
            'Tengah dapat 2 bagian, tepi hanya 1. Jadi tengah dua kali lebih lebar.',
            'Kolom 2fr mendapat dua kali jatah ruang kolom 1fr. Jadi kolom tengah paling lebar.',
          ),
          hints: [t('Hitung jatah bagian tiap sekat.', 'Bandingkan angka di depan fr.')],
          tags: ['grid-css'],
        }),
      ),
      qStep({
        id: 'a03-l05-q3',
        type: 'sort',
        prompt: t('Pilih alat yang paling pas untuk tiap tugas.', 'Pilih alat terbaik untuk tiap tugas tata letak.'),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('Barisan tombol di bagian atas', 'Barisan tombol ikon sejajar di navbar') },
          { id: 'i2', label: t('Kerangka halaman dengan 4 bagian', 'Kerangka halaman: header, sidebar, isi, footer') },
          { id: 'i3', label: t('Foto dan nama di samping tombol', 'Foto dan nama di samping tombol') },
          { id: 'i4', label: t('Katalog 4 kolom dan 3 baris', 'Katalog produk 4 kolom × 3 baris') },
        ],
        bins: [
          { id: 'flex', label: t('Flexbox', 'Flexbox (satu arah)'), icon: 'book-open' },
          { id: 'grid', label: t('Grid', 'CSS Grid (dua arah)'), icon: 'layout-dashboard' },
        ],
        answer: { i1: 'flex', i2: 'grid', i3: 'flex', i4: 'grid' },
        explainCorrect: t(
          'Satu deretan cocok untuk Flexbox. Baris dan kolom sekaligus cocok untuk Grid.',
          'Flexbox menata satu arah, Grid menata baris dan kolom sekaligus.',
        ),
        hints: [t('Ingat: satu rak atau kotak bekal bersekat?', 'Tanyakan: susunannya satu arah atau dua arah?'), undefined],
        tags: ['flexbox', 'grid-css'],
      }),
      qStep(
        makeMcq({
          id: 'a03-l05-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Kotak bekal bersekat'),
          prompt: t('Apa kelebihan CSS Grid dibanding sekat plastik kotak bekal?'),
          choices: [
            { id: 'span', label: t('Item bisa melebar ke beberapa kolom') },
            {
              id: 'box',
              label: t('Bisa membagi ruang menjadi bagian'),
              explainWrong: t('Sekat plastik juga membagi ruang menjadi bagian.'),
            },
            {
              id: 'sep',
              label: t('Bisa memisahkan bagian satu sama lain'),
              explainWrong: t('Sekat plastik juga memisahkan bagian satu sama lain.'),
            },
          ],
          answer: 'span',
          explainCorrect: t('Header Grid bisa melebar penuh 3 kolom, lalu menumpuk jadi 1 kolom di layar kecil. Sekat plastik tidak bisa berubah.'),
          difficulty: 2,
          hints: [t('Cari kemampuan yang tidak dimiliki sekat plastik.')],
          tags: ['grid-css'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a03-l05-q5',
          prompt: t(
            'Kamu boleh memakai Flexbox dan Grid sekaligus di satu halaman.',
            'Flexbox dan Grid boleh dipakai bersamaan di satu halaman web.',
          ),
          answer: true,
          explainCorrect: t(
            'Grid menyusun kerangka halaman. Flexbox menata isi setiap kartu.',
            'Umumnya Grid menyusun kerangka utama dan Flexbox menata isi tiap kartu.',
          ),
          explainWrong: t(
            'Keduanya boleh dipakai bersama. Seperti rak kecil di dalam kotak bekal.',
            'Keduanya boleh dipakai bersama. Grid menyusun kerangka, Flexbox menata isi di dalamnya.',
          ),
          hints: [t('Ingat kotak bekal besar yang berisi rak kecil.')],
          tags: ['flexbox', 'grid-css'],
        }),
      ),
      qStep({
        id: 'a03-l05-q6',
        type: 'fill',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Lengkapi CSS Grid untuk membuat 3 kolom sama lebar dengan jarak 16px.'),
        template: '.galeri { display: grid; ___: repeat(3, 1fr); gap: 16px; }',
        bank: ['grid-template-columns', 'justify-content', 'box-sizing'],
        answer: ['grid-template-columns'],
        explainCorrect: t('repeat(3, 1fr) membuat 3 kolom sama besar.'),
        hints: [t('Cari properti yang menentukan kolom.'), undefined],
        tags: ['grid-css'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a03-l05-r1',
        prompt: t(
          'Kamu mau baris dan kolom sekaligus. Alat mana yang pas?',
          'Sistem tata letak CSS apa yang mengatur baris dan kolom sekaligus?',
        ),
        choices: [
          { id: 'g', label: t('Grid', 'CSS Grid') },
          {
            id: 'm',
            label: t('Margin'),
            explainWrong: t(
              'Margin hanya memberi jarak luar. Ia tidak membagi ruang.',
              'Margin hanya memberi jarak luar pada satu elemen.',
            ),
          },
          {
            id: 'f',
            label: t('Flexbox'),
            explainWrong: t(
              'Flexbox menata satu arah. Baris dan kolom sekaligus perlu Grid.',
              'Flexbox menata satu dimensi, bukan baris dan kolom sekaligus.',
            ),
          },
        ],
        answer: 'g',
        explainCorrect: t(
          'Grid mengatur baris dan kolom sekaligus.',
          'CSS Grid mengatur tata letak dua dimensi.',
        ),
        hints: [t('Ingat kotak bekal bersekat.')],
        tags: ['grid-css'],
      }),
      makeTf({
        id: 'a03-l05-r2',
        prompt: t(
          'Tiga sekat yang masing-masing dapat 1 bagian punya lebar sama.',
          'repeat(3, 1fr) membagi lebar menjadi tiga kolom yang sama rata.',
        ),
        answer: true,
        explainCorrect: t(
          'Jatah sama berarti lebar sama. Seperti tiga sekat bekal yang sama besar.',
          'repeat(3, 1fr) sama dengan menulis 1fr 1fr 1fr.',
        ),
        explainWrong: t(
          'Jatah yang sama membuat lebar sama. Tiga sekat tadi sama besar.',
          'repeat(3, 1fr) sama dengan 1fr 1fr 1fr, jadi ketiga kolom sama lebar.',
        ),
        hints: [t('Ingat jatah bagian tiap sekat.')],
        tags: ['grid-css'],
      }),
    ],
    recap: t(
      'Grid menata baris dan kolom sekaligus, seperti kotak bekal.',
      'Pakai Grid untuk tata letak baris dan kolom, dan Flexbox untuk elemen satu arah.',
    ),
    companion: {
      talkPrompts: ['Apa beda rak buku satu baris dan kotak bekal bersekat?'],
      offlineActivity: 'Gambar sketsa kotak bekal makan siang, lalu tandai sekat mana yang lebih lebar.',
    },
  }),

  makeLesson({
    id: 'a03-l06',
    worldId: 'a03',
    title: 'Position, z-index, cascade',
    modes: ['pro'],
    objective: t('Kamu bisa mengatur tumpukan elemen, memprediksi aturan CSS yang menang, dan memakai variabel CSS.'),
    estMinutes: 6,
    introducesTerms: ['z-index'],
    usesTerms: ['css', 'selector', 'class-css'],
    warmupFrom: 'a03-l05',
    atWork: 'Kamu akan memakai z-index saat menu dropdown atau popup tertutup elemen lain di halaman.',
    steps: [
      storyStep('a03/tumpukan-kertas.svg', [
        rText('Dua kertas bertumpuk di meja bengkel. Kertas mana yang paling depan, dan aturan mana yang menang saat bertabrakan?'),
      ]),
      conceptStep({
        title: t('Position dan z-index'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'position-zindex' },
        alt: t('Lima nilai position dan urutan tumpukan z-index.'),
        body: [
          rTerm('z-index', 'Position', 'Position'),
          rText(
            ' adalah properti penempatan elemen, dengan lima nilai: static, relative, absolute, fixed, dan sticky. Angka z-index yang lebih besar membuat elemen berposisi tampil di depan. Induk berposisi yang punya z-index membentuk tumpukan tersendiri, disebut stacking context. z-index anak hanya dibandingkan di dalam tumpukan itu.',
          ),
        ],
      }),
      qStep({
        id: 'a03-l06-q1',
        type: 'match',
        difficulty: 2,
        prompt: t('Pasangkan nilai position dengan perilakunya.'),
        left: [
          { id: 'rel', label: t('relative') },
          { id: 'abs', label: t('absolute') },
          { id: 'fix', label: t('fixed') },
          { id: 'stk', label: t('sticky') },
        ],
        right: [
          { id: 'r1', label: t('Bergeser sedikit dari posisi asalnya') },
          { id: 'r2', label: t('Ditempatkan bebas, berpatokan pada induk yang berposisi') },
          { id: 'r3', label: t('Tetap menempel di layar saat halaman digulir') },
          { id: 'r4', label: t('Ikut digulir, lalu menempel saat mencapai tepi layar') },
        ],
        answer: { rel: 'r1', abs: 'r2', fix: 'r3', stk: 'r4' },
        explainCorrect: t('Empat nilai ini sering dipakai untuk navbar dan badge. Sticky dan fixed menempel di layar, relative bergeser sedikit, absolute berpatokan pada induk.'),
        hints: [t('Cocokkan fixed dulu, lalu sisanya.'), undefined],
        tags: ['z-index'],
      }),
      conceptStep({
        title: t('Cascade, pseudo-class, dan variabel'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'cascade-var' },
        alt: t('Prioritas id, class, tag; :hover, :focus, dan var(--utama).'),
        code: {
          lang: 'css',
          code: ':root { --utama: #2F6FED; }\n.tombol { background: var(--utama); transition: 0.2s; }\n.tombol:hover { filter: brightness(1.1); }',
        },
        body: [
          rText(
            'Kalau dua aturan bertabrakan, aturan yang lebih spesifik menang: id, lalu class, lalu tag. Pseudo-class seperti :hover mengubah gaya saat kursor berada di atas elemen. Variabel CSS seperti --utama menyimpan nilai yang dipakai berulang.',
          ),
        ],
      }),
      limitStep({
        analogy: t('z-index seperti tumpukan kertas di meja'),
        same: [t('Angka z-index yang lebih besar menutupi elemen di bawahnya.')],
        different: [t('z-index hanya bekerja pada elemen yang position-nya bukan static, dan tidak bisa keluar dari stacking context induknya.')],
        riskyAnalogy: false,
      }),
      simStep('kupas-box-model', t('Ubah lapisan border dan jarak antar kotak di simulator Bengkel CSS.')),
      qStep(
        makeMcq({
          id: 'a03-l06-q2',
          prompt: t('Aturan .btn { color: red; } dan .btn { color: blue; } ditulis berurutan di satu file. Warna apa yang tampil?'),
          choices: [
            { id: 'blue', label: t('Biru, karena aturan terakhir menang') },
            {
              id: 'red',
              label: t('Merah, karena aturan pertama lebih kuat'),
              explainWrong: t('Kalau kekuatan sama, aturan yang ditulis paling bawah menang. Urutan tulis menentukan hasilnya.'),
            },
            {
              id: 'purple',
              label: t('Ungu, gabungan keduanya'),
              explainWrong: t('CSS tidak mencampur warna dua aturan yang bertabrakan. Hanya satu aturan yang berlaku.'),
            },
          ],
          answer: 'blue',
          explainCorrect: t('Kalau kekuatan sama, aturan yang ditulis paling bawah menang. Inilah prinsip cascade.'),
          tags: ['z-index', 'selector'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-l06-q3',
          prompt: t('Developer menyimpan warna utama sebagai --utama: #2F6FED. Apa untungnya?'),
          choices: [
            { id: 'var', label: t('Cukup ubah satu baris, warna halaman ikut berubah') },
            {
              id: 'z',
              label: t('Warna tampil lebih cepat di browser'),
              explainWrong: t('Variabel tidak mempercepat tampilan. Ia hanya menyimpan nilai agar mudah diganti.'),
            },
            {
              id: 'html',
              label: t('Warna otomatis menyesuaikan diri dengan mode gelap'),
              explainWrong: t('Variabel tidak mengubah warna sendiri. Mode gelap tetap perlu nilai tersendiri.'),
            },
          ],
          answer: 'var',
          explainCorrect: t('Variabel menyimpan nilai di satu tempat. Mengubahnya sekali memperbarui semua aturan yang memakainya.'),
          tags: ['css'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-l06-q4',
          type: 'limit',
          analogy: t('z-index sebagai tumpukan kertas'),
          prompt: t('Mengapa z-index: 9999 kadang tetap membuat elemen tertutup elemen lain?'),
          choices: [
            { id: 'ctx', label: t('Elemen static atau terkurung stacking context induknya') },
            {
              id: 'max',
              label: t('Angka 9999 melebihi batas z-index yang dibaca browser'),
              explainWrong: t('Batas z-index jauh di atas 9999. Masalahnya ada di position atau konteks tumpukan induk.'),
            },
            {
              id: 'font',
              label: t('Angka z-index harus negatif agar elemen tampil di depan'),
              explainWrong: t('Angka negatif justru menaruh elemen di belakang. Periksa position dan induk elemen.'),
            },
          ],
          answer: 'ctx',
          explainCorrect: t('z-index tidak aktif pada elemen static. Elemen juga tidak bisa keluar dari stacking context induknya.'),
          difficulty: 2,
          hints: [t('Periksa nilai position elemen dan induknya.')],
          tags: ['z-index'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a03-l06-q5',
          prompt: t('Menambahkan transition: 0.2s membuat perubahan gaya saat :hover terasa halus, tidak mendadak.'),
          answer: true,
          explainCorrect: t('Transition menganimasikan perpindahan antara dua keadaan selama 0,2 detik.'),
          explainWrong: t('Transition menghaluskan perpindahan nilai CSS selama waktu yang ditentukan.'),
          tags: ['css'],
        }),
      ),
      qStep({
        id: 'a03-l06-q6',
        type: 'type',
        difficulty: 2,
        prompt: t('Tulis pseudo-class yang aktif saat elemen dipilih lewat tombol Tab di keyboard.'),
        accept: [':focus', ':focus-visible'],
        explainCorrect: t(':focus atau :focus-visible harus dijaga supaya navigasi keyboard tetap terlihat.'),
        hints: [t('Namanya berarti "fokus" dan diawali titik dua.'), undefined],
        tags: ['selector'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a03-l06-r1',
        prompt: t('Bagaimana urutan kekuatan selector, dari paling kuat ke paling lemah?'),
        choices: [
          { id: 'ok', label: t('id, class, tag') },
          {
            id: 'no',
            label: t('tag, class, id'),
            explainWrong: t('Urutannya terbalik. Id jauh lebih kuat daripada class dan tag.'),
          },
          {
            id: 'mid',
            label: t('class, id, tag'),
            explainWrong: t('Class memang kuat, tetapi id masih di atasnya.'),
          },
        ],
        answer: 'ok',
        explainCorrect: t('Id mengalahkan class, dan class mengalahkan tag.'),
        tags: ['selector'],
      }),
      makeTf({
        id: 'a03-l06-r2',
        prompt: t('position: fixed membuat tombol atau header tetap menempel di layar saat halaman digulir.'),
        answer: true,
        explainCorrect: t('fixed menambatkan elemen pada layar, bukan pada halaman.'),
        explainWrong: t('fixed menambatkan elemen pada layar, jadi elemen tidak ikut bergulir.'),
        tags: ['z-index'],
      }),
    ],
    recap: t('Atur tumpukan dengan position dan z-index. Pahami urutan id, class, tag, dan simpan nilai berulang di variabel.'),
  }),

  makeLesson({
    id: 'a03-sq1',
    worldId: 'a03',
    title: 'Playground Flexbox',
    modes: ['junior', 'pro'],
    isSideQuest: true,
    objective: t(
      'Aku bisa menyelesaikan 3 tantangan menata buku di rak.',
      'Kamu bisa menguji kombinasi justify-content, align-items, dan gap untuk berbagai tata letak.',
    ),
    estMinutes: 4,
    introducesTerms: [],
    usesTerms: ['flexbox', 'css'],
    atWork: 'Kamu akan mengatur posisi tombol di tengah kartu dengan Flexbox saat mengerjakan tampilan HP.',
    steps: [
      storyStep('a03/rak-buku.svg', [
        rText(
          'Misi sampingan! Penjaga Bengkel CSS butuh bantuanmu. Bisakah kamu menyusun tiga kotak warna di rak ajaib?',
          'Desainer meminta tiga kotak di Playground Flexbox diletakkan persis di posisi target.',
        ),
      ]),
      conceptStep({
        title: t('Dua tombol pengatur', 'Sumbu utama dan sumbu silang'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'flexbox-sim' },
        alt: t(
          'Panah mendatar untuk kiri-kanan dan panah tegak untuk atas-bawah.',
          'Panah horizontal justify-content dan panah vertikal align-items.',
        ),
        body: [
          rJunior('Tombol pertama menggeser kiri dan kanan. Tombol kedua menggeser atas dan bawah.'),
          rPro('Flexbox punya dua sumbu: utama (kiri-kanan) dan silang (atas-bawah). '),
          rCode('justify-content', ['pro']),
          rPro(' mengatur sumbu utama, dan '),
          rCode('align-items', ['pro']),
          rPro(' mengatur sumbu silang.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a03-sq1-q1',
          prompt: t(
            'Tombol harus tepat di tengah kotak. Kedua tombol pengatur diatur ke mana?',
            'Kombinasi mana yang menaruh satu tombol persis di tengah kotak, horizontal dan vertikal?',
          ),
          choices: [
            { id: 'cc', label: t('Pertama ke tengah, kedua ke tengah', 'justify-content: center dan align-items: center') },
            {
              id: 'fs',
              label: t('Pertama ke kiri, kedua ke tengah', 'justify-content: flex-start dan align-items: flex-end'),
              explainWrong: t(
                'Itu menaruh tombol di tengah sisi kiri. Pengatur pertama belum pas.',
                'Itu menaruh tombol di pojok kiri bawah, bukan di tengah.',
              ),
            },
            {
              id: 'tr',
              label: t('Pertama ke tengah, kedua ke atas', 'justify-content: flex-end dan align-items: flex-start'),
              explainWrong: t(
                'Itu menaruh tombol di tengah sisi atas. Pengatur kedua belum pas.',
                'Itu menaruh tombol di pojok kanan atas, bukan di tengah.',
              ),
            },
          ],
          answer: 'cc',
          explainCorrect: t(
            'Dua arah sama-sama di tengah, jadi tombol tepat di tengah. Seperti satu buku di tengah rak tinggi.',
            'center pada kedua sumbu langsung memusatkan isi.',
          ),
          hints: [t('Tengah berarti sama jauh dari semua sisi.', 'Pikirkan nilai yang memusatkan di kedua sumbu.')],
          tags: ['flexbox'],
        }),
      ),
      limitStep({
        analogy: t('Rak buku di playground'),
        same: [t('Kotak langsung berpindah sesuai pengaturan.')],
        different: [t('Ukuran kotak di proyek sungguhan juga bergantung pada lebar layar.')],
        riskyAnalogy: false,
      }),
      simStep(
        'playground-flexbox',
        t(
          'Letakkan kotak di tengah, lalu sebarkan rata.',
          'Selesaikan berbagai skenario perataan pada Playground Flexbox.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a03-sq1-q2',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Rak buku playground'),
          prompt: t('Hasil Flexbox rapi di laptop tetapi berdesakan di HP. Apa yang perlu dicek?'),
          choices: [
            { id: 'wrap', label: t('Tambahkan flex-wrap atau ubah arah menjadi kolom') },
            {
              id: 'del',
              label: t('Hapus tag HTML yang membungkus item'),
              explainWrong: t('Membuang tag tidak memberi ruang tambahan. Item tetap berdesakan.'),
            },
            {
              id: 'sm',
              label: t('Perkecil ukuran huruf di setiap item kartu'),
              explainWrong: t('Huruf kecil sulit dibaca dan tidak mengatur susunan. Item tetap dipaksa satu baris.'),
            },
          ],
          answer: 'wrap',
          explainCorrect: t('flex-wrap membuat item turun ke baris baru saat ruang sempit.'),
          difficulty: 2,
          hints: [t('Pikirkan apa yang terjadi kalau layar sempit.')],
          tags: ['flexbox'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a03-sq1-q3',
          prompt: t(
            'Tombol pengatur kedua menggeser kotak ke atas atau ke bawah.',
            'Mengubah align-items dari flex-start ke center menggeser posisi vertikal item di baris Flexbox.',
          ),
          answer: true,
          explainCorrect: t(
            'Tombol kedua mengatur atas dan bawah. Seperti memindah buku ke rak atas atau bawah.',
            'align-items mengatur sumbu silang, yaitu atas-bawah pada baris mendatar.',
          ),
          explainWrong: t(
            'Tombol kedua memang mengatur atas dan bawah. Tombol pertama mengatur kiri dan kanan.',
            'align-items mengatur posisi di sumbu silang, yaitu atas-bawah pada baris mendatar.',
          ),
          hints: [t('Ingat tombol mana yang mengatur atas-bawah.', 'Ingat sumbu mana yang diatur align-items.')],
          tags: ['flexbox'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-sq1-q4',
          prompt: t(
            'Dua kartu menempel tanpa celah. Apa cara paling rapi untuk memisahkannya?',
            'Dua kartu menempel tanpa celah di dalam wadah flex. Properti apa yang paling bersih untuk memisahkannya?',
          ),
          choices: [
            { id: 'gap', label: t('Pasang jarak antar kartu', 'gap: 16px;') },
            {
              id: 'bold',
              label: t('Tebalkan tulisan di kartu', 'font-weight: bold;'),
              explainWrong: t(
                'Huruf tebal hanya mengubah tulisan. Kartu tetap menempel.',
                'font-weight hanya menebalkan teks.',
              ),
            },
            {
              id: 'sz',
              label: t('Besarkan ukuran kartu', 'width: 100%;'),
              explainWrong: t(
                'Kartu yang lebih besar tetap menempel. Celah tidak ikut muncul.',
                'width mengatur lebar kartu, bukan celah di antara kartu.',
              ),
            },
          ],
          answer: 'gap',
          explainCorrect: t(
            'Jarak antar kartu memberi celah bersih di antaranya. Seperti jarak sama antar buku di rak.',
            'gap memberi jarak bersih antar anak flex.',
          ),
          hints: [t('Ingat celah rapi antara dua buku.', 'Cari properti yang memberi celah di antara item.')],
          tags: ['flexbox'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-sq1-q5j',
          modes: ['junior'],
          type: 'scenario',
          story: t('Rak sudah penuh. Satu buku lagi tidak muat di baris pertama.'),
          prompt: t('Apa yang sebaiknya terjadi pada buku itu?'),
          difficulty: 2,
          choices: [
            { id: 'wrap', label: t('Turun ke baris baru') },
            {
              id: 'spill',
              label: t('Keluar dari rak'),
              explainWrong: t(
                'Buku yang keluar dari rak terlihat berantakan. Lebih rapi kalau ia turun ke baris baru.',
                'Item yang keluar dari wadah merusak tata letak. Item sebaiknya turun ke baris baru.',
              ),
            },
            {
              id: 'squeeze',
              label: t('Dijejalkan di baris pertama'),
              explainWrong: t(
                'Buku yang dijejalkan jadi sesak dan sempit. Baris baru memberi ruang yang cukup.',
                'Item yang dijejalkan jadi sesak. Baris baru memberi ruang yang cukup.',
              ),
            },
          ],
          answer: 'wrap',
          explainCorrect: t(
            'Buku yang turun ke baris baru tetap rapi. Seperti kotak Flexbox yang turun saat ruang sempit.',
            'Item yang turun ke baris baru tetap rapi, seperti item dengan flex-wrap.',
          ),
          hints: [t('Ingat rak yang punya baris kedua.')],
          tags: ['flexbox'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a03-sq1-r1',
        prompt: t(
          'Buku harus sama jauh dari semua sisi rak. Kedua tombol pengatur diisi apa?',
          'Untuk memusatkan isi horizontal dan vertikal dengan Flexbox, kedua properti diatur ke nilai apa?',
        ),
        choices: [
          { id: 'c', label: t('Tengah', 'center') },
          {
            id: 's',
            label: t('Awal', 'flex-start'),
            explainWrong: t(
              'Awal menaruh isi di pojok kiri atas. Isi tidak ke tengah.',
              'flex-start meletakkan isi di awal pojok, bukan di tengah.',
            ),
          },
          {
            id: 'e',
            label: t('Akhir', 'flex-end'),
            explainWrong: t(
              'Akhir menaruh isi di pojok kanan bawah. Isi tidak ke tengah.',
              'flex-end meletakkan isi di akhir pojok, bukan di tengah.',
            ),
          },
        ],
        answer: 'c',
        explainCorrect: t(
          'Tengah di dua arah menaruh isi tepat di tengah.',
          'justify-content: center dan align-items: center memusatkan isi.',
        ),
        hints: [t('Bayangkan buku yang tidak menyentuh sisi mana pun.')],
        tags: ['flexbox'],
      }),
      makeTf({
        id: 'a03-sq1-r2',
        prompt: t(
          'Flexbox dipasang pada kotak pembungkus, bukan pada isinya.',
          'Flexbox diaktifkan dengan display: flex; pada wadah induknya.',
        ),
        answer: true,
        explainCorrect: t(
          'Kotak pembungkus mengatur isinya. Seperti rak yang mengatur buku di dalamnya.',
          'display: flex dipasang pada wadah pembungkus, bukan pada item di dalamnya.',
        ),
        explainWrong: t(
          'Pembungkuslah yang mengatur isinya. Isi hanya mengikuti.',
          'display: flex selalu dipasang pada elemen induk pembungkus.',
        ),
        hints: [t('Ingat rak mengatur buku.')],
        tags: ['flexbox'],
      }),
    ],
    recap: t(
      'Dengan tiga pengatur, kamu menata deretan kotak dengan cepat.',
      'Gabungan justify-content, align-items, flex-wrap, dan gap menyelesaikan kebanyakan kebutuhan tata letak satu arah.',
    ),
    companion: {
      talkPrompts: ['Posisi rak mana yang paling sering kamu lihat di aplikasi HP?'],
      offlineActivity: 'Susun kartu mainan di meja membentuk baris tersebar rata dan baris di tengah.',
    },
  }),
];
