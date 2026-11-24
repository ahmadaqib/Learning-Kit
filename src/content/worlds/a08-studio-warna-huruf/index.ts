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
import type { Lesson, Rich, World } from '@/content/schema';

/** Potongan teks kaya per jalur, supaya jalur Junior dan jalur Pro ditulis terpisah (panduan §7). */
const rProBold = (text: string): Rich => ({ t: 'bold', v: { pro: text }, modes: ['pro'] });
const rJBold = (text: string): Rich => ({ t: 'bold', v: { junior: text, pro: text }, modes: ['junior'] });
const rJTerm = (termId: string, text: string): Rich => ({
  t: 'term',
  termId,
  v: { junior: text, pro: text },
  modes: ['junior'],
});
const rProTerm = (termId: string, text: string): Rich => ({
  t: 'term',
  termId,
  v: { pro: text },
  modes: ['pro'],
});

export const world: World = {
  id: 'a08',
  track: 'A',
  order: 8,
  title: 'Studio Warna dan Huruf',
  tagline: t(
    'Pilih warna yang serasi. Pilih huruf yang enak dibaca.',
    'Kamu bisa memilih warna dan huruf yang serasi dan lolos uji kontras.',
  ),
  color: '#6C5CE7',
  illustration: 'a08-studio-warna-huruf',
  sourceChapters: ['J1-10', 'J1-11'],
  requires: ['a07'],
  lessons: [
    'a08-l01',
    'a08-l02',
    'a08-l03',
    'a08-l04',
    'a08-l05',
    'a08-l06',
    'a08-l07',
    'a08-l08',
    'a08-l09',
  ],
  sideQuests: [],
  boss: {
    title: 'Tantangan Penjaga Studio',
    greeting: t(
      'Halo! Ayo pilih warna yang serasi dan huruf yang enak dibaca.',
      'Uji kemampuanmu memilih palet, membaca kode warna, menjaga kontras, dan menata huruf.',
    ),
    guardianName: 'Penjaga Studio',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'a08-anc-j1',
        prompt: t(
          'Tiga warna pokok tidak bisa dibuat dari campuran warna lain. Mana ketiganya?',
          'Warna primer pada roda warna tradisional tidak bisa dibuat dari campuran warna lain. Mana tiga warna itu?',
        ),
        choices: [
          { id: 'pri', label: t('Merah, kuning, dan biru') },
          {
            id: 'sec',
            label: t('Hijau, jingga, dan ungu'),
            explainWrong: t(
              'Ketiganya hasil campuran dua warna pokok. Hijau berasal dari biru dan kuning.',
              'Hijau, jingga, dan ungu adalah warna sekunder hasil campuran dua primer.',
            ),
          },
          {
            id: 'gray',
            label: t('Hitam, putih, dan abu-abu'),
            explainWrong: t(
              'Itu warna netral, bukan warna pokok. Warna pokok bisa dicampur menjadi warna baru.',
              'Hitam, putih, dan abu-abu adalah warna netral, bukan primer pada roda warna.',
            ),
          },
        ],
        answer: 'pri',
        explainCorrect: t(
          'Merah, kuning, dan biru tidak lahir dari warna lain. Seperti tiga cat di palet Bu Laras.',
          'Merah, kuning, dan biru adalah tiga warna primer. Dari ketiganya lahir warna lain.',
        ),
        tags: ['roda-warna'],
      }),
      makeAnchorMcq({
        id: 'a08-anc-j2',
        prompt: t(
          'Enam kotak untuk latar, tiga untuk kartu. Satu kotak cerah untuk apa?',
          'Pada aturan 60-30-10, bagian 10% dipakai untuk apa?',
        ),
        choices: [
          { id: 'acc', label: t('Tombol penting yang mencolok') },
          {
            id: 'bg',
            label: t('Latar halaman yang luas'),
            explainWrong: t(
              'Latar sudah punya enam kotak. Kotak cerah menarik perhatian.',
              'Latar netral memakai porsi terbesar, yaitu 60%.',
            ),
          },
          {
            id: 'card',
            label: t('Tulisan biasa dan kartu'),
            explainWrong: t(
              'Tulisan dan kartu masuk bagian 30. Bagian 10 lebih kecil lagi.',
              'Teks dan kartu biasanya masuk porsi sekunder, yaitu 30%.',
            ),
          },
        ],
        answer: 'acc',
        explainCorrect: t(
          'Bagian kecil membuat tombol penting langsung terlihat. Seperti syal merah di baju netral.',
          'Porsi 10% membuat tombol utama menonjol tanpa melelahkan mata.',
        ),
        tags: ['aturan-60-30-10'],
      }),
      makeAnchorMcq({
        id: 'a08-anc-j3',
        prompt: t(
          'Hijau berarti berhasil, merah berarti gagal. Teman yang buta warna butuh apa lagi?',
          'Agar pesan hijau dan merah dipahami orang yang buta warna, warna harus ditemani apa?',
        ),
        choices: [
          { id: 'ico', label: t('Ikon atau tulisan') },
          {
            id: 'flash',
            label: t('Suara sirene yang keras'),
            explainWrong: t(
              'Suara keras mengganggu semua orang. Ikon dan tulisan lebih nyaman.',
              'Suara keras mengganggu dan tidak menggantikan informasi yang terlihat.',
            ),
          },
          {
            id: 'none',
            label: t('Kotak warna polos saja'),
            explainWrong: t(
              'Teman yang buta warna sulit membedakan warna polos. Tambahkan ikon atau tulisan.',
              'Warna saja menyulitkan orang yang buta warna. Tambahkan ikon atau teks.',
            ),
          },
        ],
        answer: 'ico',
        explainCorrect: t(
          'Ikon centang atau tulisan "Berhasil" membantu semua orang. Warna bukan satu-satunya petunjuk.',
          'Ikon centang dan teks memastikan pesan terbaca tanpa bergantung pada warna.',
        ),
        tags: ['warna-semantik'],
      }),
      makeAnchorMcq({
        id: 'a08-anc-j4',
        prompt: t(
          'Huruf berkaki punya garis kecil di ujung. Apa ciri huruf tanpa kaki?',
          'Jenis huruf tanpa kaki kecil di ujungnya, bersih dan mudah dibaca di layar HP, disebut apa?',
        ),
        choices: [
          { id: 'sans', label: t('Ujungnya polos', 'Sans-serif') },
          {
            id: 'disp',
            label: t('Ujungnya berhias', 'Display'),
            explainWrong: t(
              'Hiasan bisa beraneka bentuk. Lihat ujung garis hurufnya.',
              'Huruf Display dipakai untuk judul besar, bukan paragraf panjang.',
            ),
          },
          {
            id: 'mono',
            label: t('Semua huruf sama lebar', 'Monospace'),
            explainWrong: t(
              'Lebar huruf dan bentuk ujungnya adalah dua ciri berbeda.',
              'Monospace dipakai untuk baris kode dan angka di tabel.',
            ),
          },
        ],
        answer: 'sans',
        explainCorrect: t(
          'Ujung hurufnya polos tanpa garis kecil melintang.',
          'Sans-serif berarti tanpa serif, yaitu kaki kecil pada ujung goresan huruf.',
        ),
        tags: ['tipografi'],
      }),
      makeAnchorMcq({
        id: 'a08-anc-j5',
        type: 'limit',
        analogy: t('Warna segelas sirup', 'Gelas sirup dan lampu ruangan untuk Hue, Saturation, Lightness'),
        prompt: t(
          'Di layar, warna diatur dengan angka. Apa bedanya dengan menakar sirup sungguhan?',
          'Apa perbedaan mengatur warna dengan angka HSL dan mencampur sirup sungguhan?',
        ),
        choices: [
          { id: 'num', label: t('Angka di layar selalu bisa diulang persis') },
          {
            id: 'hue',
            label: t('Warna sirup mirip jenis warna'),
            explainWrong: t(
              'Itu bagian yang mirip, bukan bedanya.',
              'Itu bagian yang sama dalam analogi HSL, bukan perbedaannya.',
            ),
          },
          {
            id: 'sat',
            label: t('Kentalnya sirup mirip kepekatan warna'),
            explainWrong: t(
              'Itu juga bagian yang mirip.',
              'Itu juga bagian yang sama dalam analogi, bukan perbedaannya.',
            ),
          },
        ],
        answer: 'num',
        explainCorrect: t(
          'Tiga angka yang sama memberi warna yang sama di layar itu. Takaran sirup bisa meleset.',
          'Di CSS, angka 0% sampai 100% selalu menghasilkan warna yang sama persis.',
        ),
        tags: ['hsl'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a08-anc-p1',
        prompt: t(
          'Skema warna mana yang memadukan dua warna berseberangan pada roda warna?',
          'Skema warna mana yang memadukan dua warna berseberangan pada roda warna untuk kontras terkuat?',
        ),
        choices: [
          { id: 'comp', label: t('Komplementer') },
          {
            id: 'mono',
            label: t('Monokromatik'),
            explainWrong: t(
              'Monokromatik memakai satu hue dengan variasi terang-gelap.',
              'Monokromatik memakai satu hue dengan variasi terang-gelap.',
            ),
          },
          {
            id: 'ana',
            label: t('Analog'),
            explainWrong: t(
              'Skema analog memadukan warna yang bersebelahan.',
              'Skema analog memadukan warna yang bersebelahan.',
            ),
          },
        ],
        answer: 'comp',
        explainCorrect: t(
          'Pasangan komplementer, seperti biru dan jingga, membuat tombol ajakan menonjol.',
          'Pasangan komplementer, seperti biru dan jingga, membuat tombol ajakan menonjol.',
        ),
        tags: ['skema-warna'],
      }),
      makeAnchorMcq({
        id: 'a08-anc-p2',
        prompt: t(
          'Berapa rasio kontras minimal WCAG AA untuk teks berukuran biasa?',
          'Pedoman aksesibilitas WCAG AA menetapkan rasio kontras minimal berapa untuk teks berukuran biasa?',
        ),
        choices: [
          { id: 'c45', label: t('4,5 : 1') },
          {
            id: 'c15',
            label: t('1,5 : 1'),
            explainWrong: t(
              'Rasio 1,5 : 1 nyaris menyatu dengan latar dan sulit dibaca.',
              'Rasio 1,5 : 1 nyaris menyatu dengan latar dan sulit dibaca.',
            ),
          },
          {
            id: 'c30',
            label: t('3 : 1'),
            explainWrong: t(
              'Rasio 3 : 1 hanya untuk teks besar. Teks biasa butuh minimal 4,5 : 1.',
              'Rasio 3 : 1 hanya untuk teks besar. Teks biasa butuh minimal 4,5 : 1.',
            ),
          },
        ],
        answer: 'c45',
        explainCorrect: t(
          'Rasio 4,5 : 1 untuk teks biasa dan 3 : 1 untuk teks besar menjaga teks tetap terbaca.',
          'Rasio 4,5 : 1 untuk teks biasa dan 3 : 1 untuk teks besar menjaga teks tetap terbaca.',
        ),
        tags: ['kontras'],
      }),
      makeAnchorMcq({
        id: 'a08-anc-p3',
        prompt: t(
          'Format warna CSS mana yang paling mudah dibuat lebih terang atau gelap dengan mengubah satu angka?',
          'Format warna CSS mana yang paling mudah dibuat lebih terang atau gelap dengan mengubah satu angka?',
        ),
        choices: [
          { id: 'hsl', label: t('HSL') },
          {
            id: 'hex',
            label: t('HEX'),
            explainWrong: t(
              'Di HEX, menggelapkan warna berarti menghitung ulang ketiga pasangan digit.',
              'Di HEX, menggelapkan warna berarti menghitung ulang ketiga pasangan digit.',
            ),
          },
          {
            id: 'rgb',
            label: t('RGB'),
            explainWrong: t(
              'Di RGB, kecerahan berubah lewat penyesuaian ketiga angka sekaligus.',
              'Di RGB, kecerahan berubah lewat penyesuaian ketiga angka sekaligus.',
            ),
          },
        ],
        answer: 'hsl',
        explainCorrect: t(
          'Di HSL, angka ketiga mengatur terang-gelap. Satu angka cukup untuk membuat tint atau shade.',
          'Di HSL, angka ketiga mengatur terang-gelap. Satu angka cukup untuk membuat tint atau shade.',
        ),
        tags: ['hsl', 'hex-rgb'],
      }),
      makeAnchorMcq({
        id: 'a08-anc-p4',
        prompt: t(
          'Mengapa mode gelap memakai abu sangat gelap, bukan hitam #000000 dengan putih #FFFFFF?',
          'Mengapa mode gelap memakai abu sangat gelap, bukan hitam #000000 dengan putih #FFFFFF?',
        ),
        choices: [
          { id: 'glare', label: t('Kontras ekstrem terlalu silau di ruangan redup') },
          {
            id: 'oled',
            label: t('Browser tidak mendukung #000000'),
            explainWrong: t(
              'Browser mendukung #000000. Masalahnya, hitam dan putih murni terlalu silau.',
              'Browser mendukung #000000. Masalahnya, hitam dan putih murni terlalu silau.',
            ),
          },
          {
            id: 'wcag',
            label: t('Rasio hitam di atas putih hanya 1 : 1'),
            explainWrong: t(
              'Hitam di atas putih justru 21 : 1. Rasio setinggi itu menyilaukan di mode gelap.',
              'Hitam di atas putih justru 21 : 1. Rasio setinggi itu menyilaukan di mode gelap.',
            ),
          },
        ],
        answer: 'glare',
        explainCorrect: t(
          'Abu sangat gelap dengan teks putih yang diredupkan lebih nyaman di mata.',
          'Abu sangat gelap dengan teks putih yang diredupkan lebih nyaman di mata.',
        ),
        tags: ['aturan-60-30-10', 'kontras'],
      }),
      makeAnchorMcq({
        id: 'a08-anc-p5',
        prompt: t(
          'Berapa panjang baris paragraf yang ideal agar mata tidak lelah?',
          'Berapa panjang baris paragraf yang ideal agar mata tidak lelah?',
        ),
        choices: [
          { id: 'ch', label: t('45–75 karakter per baris') },
          {
            id: 'tiny',
            label: t('10–15 karakter per baris'),
            explainWrong: t(
              'Baris sependek itu membuat mata terus melompat ke baris baru.',
              'Baris sependek itu membuat mata terus melompat ke baris baru.',
            ),
          },
          {
            id: 'wide',
            label: t('180–220 karakter per baris'),
            explainWrong: t(
              'Baris selebar itu membuat mata tersesat saat pindah ke baris berikutnya.',
              'Baris selebar itu membuat mata tersesat saat pindah ke baris berikutnya.',
            ),
          },
        ],
        answer: 'ch',
        explainCorrect: t(
          'Rentang 45–75 karakter menjaga ritme mata saat membaca paragraf panjang.',
          'Rentang 45–75 karakter menjaga ritme mata saat membaca paragraf panjang.',
        ),
        tags: ['tipografi', 'type-scale'],
      }),
      makeAnchorMcq({
        id: 'a08-anc-p6',
        type: 'limit',
        analogy: t('Mencampur cat kertas RYB vs cahaya piksel RGB di layar'),
        prompt: t(
          'Apa beda utama warna cat di kanvas dengan warna di layar?',
          'Apa beda utama warna cat di kanvas dengan warna di layar?',
        ),
        choices: [
          { id: 'light', label: t('Cat makin gelap saat dicampur, cahaya layar makin terang') },
          {
            id: 'wheel',
            label: t('Hanya cat yang bisa disusun menjadi roda warna'),
            explainWrong: t(
              'Roda warna dipakai untuk belajar keserasian, baik untuk cat maupun layar.',
              'Roda warna dipakai untuk belajar keserasian, baik untuk cat maupun layar.',
            ),
          },
          {
            id: 'warm',
            label: t('Merah, jingga, dan kuning hanya terasa hangat di cat'),
            explainWrong: t(
              'Kesan hangat tetap sama di kanvas maupun di layar.',
              'Kesan hangat tetap sama di kanvas maupun di layar.',
            ),
          },
        ],
        answer: 'light',
        explainCorrect: t(
          'Cat mencampur pigmen, jadi makin gelap. Layar merakit warna dari cahaya merah, hijau, dan biru.',
          'Cat mencampur pigmen, jadi makin gelap. Layar merakit warna dari cahaya merah, hijau, dan biru.',
        ),
        tags: ['roda-warna', 'hex-rgb'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'a08-l01',
    worldId: 'a08',
    title: 'Roda warna',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan warna pokok, warna campuran, hangat, dan dingin.',
      'Kamu bisa membaca roda warna 12 bagian, suhu warna, dan beda cat dengan cahaya layar.',
    ),
    atWork: 'Kamu memilih warna merek untuk sebuah halaman web dan perlu tahu mana yang serasi.',
    estMinutes: 5,
    introducesTerms: ['roda-warna'],
    usesTerms: ['ui', 'css'],
    warmupFrom: 'a07-l08',
    steps: [
      storyStep('a08/roda-cat.svg', [
        rText(
          'Bu Laras punya 3 cat di palet: merah, kuning, dan biru. Ia mencampurnya menjadi banyak warna. Warna apa saja yang lahir?',
          'Kamu memilih warna untuk sebuah halaman web, tetapi tidak yakin mana yang serasi. Roda warna adalah lingkaran 12 warna yang menunjukkan hubungan antarwarna.',
        ),
      ]),
      conceptStep({
        title: t('Warna pokok dan campuran', 'Primer, sekunder, dan tersier'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'roda-warna-12' },
        alt: t(
          'Roda warna dengan warna pokok dan warna campuran.',
          'Roda warna 12 bagian berisi warna primer, sekunder, dan tersier.',
        ),
        body: [
          rJTerm('roda-warna', 'Roda warna'),
          rJunior(' adalah lingkaran warna. Merah, kuning, dan biru adalah warna '),
          rJBold('primer'),
          rJunior(' atau warna pokok. Campur dua warna pokok, hasilnya warna campuran: hijau, jingga, atau ungu.'),
          rProTerm('roda-warna', 'Roda warna'),
          rPro(' dimulai dari tiga warna '),
          rProBold('primer'),
          rPro(': merah, kuning, biru. Dua primer menghasilkan warna '),
          rProBold('sekunder'),
          rPro(': jingga, hijau, ungu. Primer ditambah sekunder di sebelahnya menghasilkan warna '),
          rProBold('tersier'),
          rPro(', misalnya merah-jingga.'),
        ],
      }),
      qStep({
        id: 'a08-l01-q1',
        type: 'sort',
        prompt: t(
          'Kelompokkan warna ini: pokok atau campuran?',
          'Kelompokkan warna ini sebagai primer atau sekunder.',
        ),
        difficulty: 1,
        items: [
          { id: 'm', label: t('Merah') },
          { id: 'h', label: t('Hijau') },
          { id: 'k', label: t('Kuning') },
          { id: 'u', label: t('Ungu') },
          { id: 'b', label: t('Biru') },
          { id: 'j', label: t('Jingga') },
        ],
        bins: [
          { id: 'pri', label: t('Warna pokok', 'Primer'), icon: 'palette' },
          { id: 'sec', label: t('Warna campuran', 'Sekunder'), icon: 'box' },
        ],
        answer: { m: 'pri', k: 'pri', b: 'pri', h: 'sec', u: 'sec', j: 'sec' },
        explainCorrect: t(
          'Merah, kuning, dan biru tidak bisa dibuat dari warna lain. Hijau, jingga, dan ungu adalah campurannya, seperti cat di palet.',
          'Primer (merah, kuning, biru) tidak bisa dibuat dari warna lain. Sekunder (jingga, hijau, ungu) adalah campuran dua primer.',
        ),
        hints: [t('Ingat tiga cat di palet Bu Laras.'), undefined],
        tags: ['roda-warna'],
      }),
      conceptStep({
        title: t('Warna hangat dan dingin', 'Suhu warna: hangat dan dingin'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'hangat-vs-dingin' },
        alt: t('Merah, jingga, kuning di sisi hangat. Hijau, biru, ungu di sisi dingin.'),
        body: [
          rText(
            'Merah, jingga, dan kuning terasa hangat dan menarik mata. Hijau, biru, dan ungu terasa dingin dan tenang.',
            'Warna hangat (merah, jingga, kuning) terasa dekat dan menarik perhatian. Warna dingin (hijau, biru, ungu) terasa tenang dan tepercaya. Bank dan sekolah sering memakai warna dingin.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a08-l01-q2',
          type: 'analogy',
          prompt: t(
            'Poster bank harus terasa tenang dan aman. Warna apa yang cocok?',
            'Aplikasi bank atau sekolah perlu terasa tenang dan tepercaya. Kelompok warna mana yang paling cocok?',
          ),
          choices: [
            {
              id: 'cold',
              label: t('Warna dingin seperti biru', 'Warna dingin, misalnya biru dan hijau'),
            },
            {
              id: 'hot',
              label: t('Warna hangat seperti merah', 'Warna hangat, misalnya merah terang'),
              explainWrong: t(
                'Merah terasa mendesak, seperti tanda bahaya. Poster bank perlu terasa tenang.',
                'Merah terasa mendesak dan sering menandai bahaya. Aplikasi bank perlu kesan tenang.',
              ),
            },
            {
              id: 'neon',
              label: t('Warna neon seperti hijau stabilo', 'Warna neon yang menyala di seluruh layar'),
              explainWrong: t(
                'Warna neon menyilaukan mata. Poster yang tenang memakai warna lembut.',
                'Warna neon menyilaukan dan membuat mata lelah. Kesan tepercaya butuh warna yang lebih kalem.',
              ),
            },
          ],
          answer: 'cold',
          explainCorrect: t(
            'Biru terasa tenang dan aman. Seperti langit cerah dan laut yang lapang.',
            'Biru dan hijau terasa tenang, jadi bank dan sekolah sering memakainya. Warna dingin membangun rasa percaya.',
          ),
          hints: [
            t(
              'Ingat warna langit dan laut.',
              'Pikirkan kesan yang dicari: tenang atau mendesak.',
            ),
          ],
          tags: ['roda-warna', 'ui'],
        }),
      ),
      simStep(
        'roda-warna',
        t(
          'Ketuk warna di roda, lalu lihat mana yang serasi.',
          'Ketuk beberapa warna di roda dan bedakan paduan yang serasi dari yang mencolok.',
        ),
      ),
      conceptStep({
        title: t('Cat kertas dan cahaya layar', 'Roda cat RYB dan cahaya layar RGB'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'ryb-vs-rgb' },
        alt: t('Lingkaran cat merah-kuning-biru dan piksel cahaya merah-hijau-biru di layar.'),
        modes: ['pro'],
        body: [
          rPro(
            'Roda RYB (merah, kuning, biru) cocok untuk belajar keserasian warna. Layar membentuk warna dari tiga cahaya: merah, hijau, biru (RGB). Mencampur semua cat menghasilkan warna gelap, tetapi semua cahaya menyala menghasilkan putih.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Cat di palet dan warna di layar'),
        same: [
          t(
            'Keduanya membuat banyak warna dari sedikit warna pokok.',
            'Keduanya membentuk banyak warna dari beberapa warna dasar.',
          ),
        ],
        different: [
          t(
            'Cat dicampur jadi gelap. Cahaya layar dicampur jadi putih.',
            'Semua cat dicampur menghasilkan warna gelap keruh. Semua cahaya RGB menyala menghasilkan putih.',
          ),
        ],
        riskyAnalogy: true,
      }),
      qStep(
        makeTf({
          id: 'a08-l01-q3',
          modes: ['pro'],
          prompt: t(
            'Warna tersier, misalnya merah-jingga, adalah campuran satu primer dengan satu sekunder di sebelahnya.',
          ),
          answer: true,
          explainCorrect: t(
            'Primer ditambah sekunder di sebelahnya menghasilkan 6 warna tersier. Bersama 3 primer dan 3 sekunder, jumlahnya 12 warna.',
          ),
          explainWrong: t(
            'Pernyataan itu benar: satu primer dan satu sekunder tetangganya menghasilkan tersier.',
          ),
          hints: [t('Hitung dulu berapa primer dan sekunder di roda.')],
          tags: ['roda-warna'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l01-q4',
          type: 'limit',
          analogy: t('Cat di palet dan warna di layar'),
          prompt: t(
            'Semua cat dicampur menjadi gelap. Semua cahaya layar dicampur menjadi apa?',
            'Semua cat dicampur menghasilkan warna gelap. Apa yang terjadi saat semua cahaya layar menyala penuh?',
          ),
          difficulty: 2,
          choices: [
            { id: 'rgb', label: t('Putih terang', 'Putih, karena cahaya saling menambah') },
            {
              id: 'warm',
              label: t('Hitam pekat', 'Hitam, karena warna saling menutup'),
              explainWrong: t(
                'Hitam adalah hasil campuran cat. Cahaya layar bekerja sebaliknya.',
                'Hitam adalah hasil campuran pigmen cat. Cahaya layar bekerja sebaliknya: makin banyak, makin terang.',
              ),
            },
            {
              id: 'wheel',
              label: t('Cokelat keruh', 'Cokelat keruh, seperti campuran cat biasa'),
              explainWrong: t(
                'Cokelat keruh adalah hasil campuran cat. Cahaya layar makin terang, tidak keruh.',
                'Cokelat keruh adalah hasil campuran pigmen. Cahaya yang ditambahkan justru makin terang.',
              ),
            },
          ],
          answer: 'rgb',
          explainCorrect: t(
            'Cahaya saling menambah, jadi layar menjadi putih. Cat saling menutup, jadi gelap.',
            'Cahaya saling menambah: makin banyak menyala, makin terang. Pigmen cat saling menutup: makin banyak dicampur, makin gelap.',
          ),
          hints: [
            t(
              'Ingat senter: makin banyak, makin terang.',
              'Bayangkan menumpuk tiga senter berwarna.',
            ),
          ],
          tags: ['roda-warna'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l01-q5',
          type: 'scenario',
          story: t(
            'Dimas membuat poster diskon kilat untuk toko makanan. Poster itu harus terasa seru dan mendesak.',
            'Dimas membuat banner diskon untuk toko makanan. Banner itu harus terasa mendesak dan bersemangat.',
          ),
          prompt: t('Warna apa yang paling cocok?', 'Suhu warna mana yang paling mendukung kesan itu?'),
          difficulty: 2,
          choices: [
            {
              id: 'warm',
              label: t('Warna hangat seperti jingga', 'Warna hangat, misalnya jingga atau merah'),
            },
            {
              id: 'pale',
              label: t('Warna dingin seperti biru', 'Warna dingin, misalnya biru atau hijau'),
              explainWrong: t(
                'Biru terasa tenang. Poster diskon butuh rasa seru.',
                'Biru terasa tenang dan tepercaya, bukan mendesak. Diskon kilat butuh warna hangat.',
              ),
            },
            {
              id: 'darkb',
              label: t('Warna netral seperti abu-abu', 'Warna netral, misalnya abu-abu pucat atau putih'),
              explainWrong: t(
                'Abu-abu terasa datar. Poster seru butuh warna yang menarik mata.',
                'Abu-abu pucat menyatu dengan latar dan tidak menarik perhatian.',
              ),
            },
          ],
          answer: 'warm',
          explainCorrect: t(
            'Jingga dan merah terasa hangat dan seru. Seperti spanduk diskon di pasar.',
            'Jingga dan merah terasa hangat dan mendesak, jadi sering dipakai untuk tombol ajakan dan diskon.',
          ),
          hints: [
            t(
              'Warna apa yang terasa dekat dan seru?',
              'Pilih kelompok warna yang terasa dekat dan menarik perhatian.',
            ),
          ],
          tags: ['roda-warna', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l01-q6',
          modes: ['pro'],
          prompt: t(
            'Berapa jumlah warna pada roda warna standar yang memuat primer, sekunder, dan tersier?',
          ),
          difficulty: 1,
          choices: [
            { id: '12', label: t('12 warna: 3 primer, 3 sekunder, 6 tersier') },
            {
              id: '2',
              label: t('9 warna: 3 primer, 3 sekunder, 3 tersier'),
              explainWrong: t(
                'Roda standar punya 6 warna tersier, bukan 3. Setiap pasangan primer dan sekunder menghasilkan satu.',
              ),
            },
            {
              id: '100',
              label: t('24 warna: 6 primer, 6 sekunder, 12 tersier'),
              explainWrong: t(
                'Primer hanya ada 3 dan sekunder hanya 3. Jumlah totalnya 12.',
              ),
            },
          ],
          answer: '12',
          explainCorrect: t(
            '3 primer, 3 sekunder, dan 6 tersier membentuk roda warna 12 bagian.',
          ),
          hints: [t('Jumlahkan ketiga kelompok warna.')],
          tags: ['roda-warna'],
        }),
      ),
      qStep({
        id: 'a08-l01-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Cahaya apa yang melengkapi tiga cahaya dasar layar?'),
        difficulty: 2,
        template: 'Layar menyusun warna dari cahaya merah, ___, dan biru.',
        bank: ['hijau', 'kuning', 'ungu'],
        answer: ['hijau'],
        explainCorrect: t('Layar memakai cahaya merah, hijau, dan biru (RGB). Kuning muncul dari merah dan hijau yang menyala bersama.'),
        hints: [t('Layar tidak memakai kuning sebagai cahaya dasar.'), undefined],
        tags: ['roda-warna', 'css'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a08-l01-r1',
        prompt: t(
          'Mana tiga warna campuran dari dua warna pokok?',
          'Apa tiga warna sekunder pada roda warna?',
        ),
        choices: [
          { id: 's', label: t('Jingga, hijau, dan ungu') },
          {
            id: 'p',
            label: t('Merah, kuning, dan biru'),
            explainWrong: t(
              'Itu warna pokok, bukan campuran. Warna pokok tidak bisa dibuat dari warna lain.',
              'Itu tiga warna primer. Primer tidak bisa dibuat dari warna lain.',
            ),
          },
          {
            id: 'n',
            label: t('Hitam, putih, dan abu-abu'),
            explainWrong: t(
              'Itu warna netral. Warna netral bukan campuran dua warna pokok.',
              'Itu warna netral. Warna netral bukan campuran dua primer.',
            ),
          },
        ],
        answer: 's',
        explainCorrect: t(
          'Dua warna pokok dicampur menjadi jingga, hijau, atau ungu.',
          'Campuran dua primer menghasilkan jingga, hijau, dan ungu.',
        ),
        hints: [t('Ingat tiga cat di palet.')],
        tags: ['roda-warna'],
      }),
      makeTf({
        id: 'a08-l01-r2',
        prompt: t(
          'Hijau, biru, dan ungu terasa dingin dan tenang.',
          'Hijau, biru, dan ungu termasuk warna dingin yang terasa tenang.',
        ),
        answer: true,
        explainCorrect: t(
          'Ketiganya ada di sisi dingin roda warna. Seperti daun, langit, dan laut.',
          'Ketiganya ada di sisi dingin roda warna dan memberi kesan tenang.',
        ),
        explainWrong: t(
          'Ketiganya ada di sisi dingin. Warna hangat itu merah, jingga, dan kuning.',
          'Ketiganya ada di sisi dingin roda warna. Sisi hangat berisi merah, jingga, dan kuning.',
        ),
        hints: [t('Ingat langit dan laut.')],
        tags: ['roda-warna'],
      }),
    ],
    recap: t(
      'Roda warna punya warna pokok, warna campuran, hangat, dan dingin.',
      'Roda warna membagi 12 warna menjadi primer, sekunder, dan tersier. Warna juga terbagi hangat dan dingin.',
    ),
    companion: {
      talkPrompts: ['Poster toko es krim cocok memakai warna hangat atau dingin?'],
      offlineActivity:
        'Campur cat atau pensil warna merah dan kuning di kertas. Warna apa yang muncul?',
    },
  }),

  makeLesson({
    id: 'a08-l02',
    worldId: 'a08',
    title: 'Warna seperti segelas sirup',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan jenis warna, kepekatan, dan terang-gelapnya.',
      'Kamu bisa mengatur warna dengan HSL dan membuat varian tint, shade, dan tone.',
    ),
    atWork: 'Kamu membuat warna hover yang sedikit lebih gelap dengan menurunkan satu angka di CSS.',
    estMinutes: 5,
    introducesTerms: ['hsl'],
    usesTerms: ['ui', 'roda-warna'],
    stickerId: 'sirup-hsl',
    warmupFrom: 'a08-l01',
    steps: [
      storyStep('a08/sirup-hsl.svg', [
        rText(
          'Sirup stroberi merah. Sirup melon hijau. Bayangkan kamu memilih salah satu warna itu untuk gambar minuman.',
          'Tim memberi satu warna merek. Kamu perlu membuat versi lebih gelap saat penunjuk menyentuh tombol.',
        ),
      ]),
      conceptStep({
        title: t('Tiga sifat warna', 'Tiga angka dalam HSL'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'hsl-tiga-sifat' },
        alt: t(
          'Tiga sifat warna: jenis, kepekatan, dan terang-gelap.',
          'Pengatur HSL: Hue 0-360, Saturation 0-100%, Lightness 0-100%.',
        ),
        body: [
          rJTerm('hsl', 'Pengatur warna'),
          rJunior(
            ' punya tiga pilihan. Pilih jenisnya, seperti merah atau biru. Buat warnanya pekat atau pudar. Atur terang atau gelapnya.',
          ),
          rProTerm('hsl', 'HSL'),
          rPro(
            ' mengatur warna lewat tiga angka. Hue adalah posisi di roda (0°–360°), Saturation adalah kepekatan (0%–100%), dan Lightness adalah terang-gelap (0%–100%).',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a08-l02-q1',
          type: 'analogy',
          prompt: t(
            'Sirup yang sedikit air terasa sangat kental. Itu mirip sifat warna yang mana?',
            'Dalam perumpamaan sirup, perbandingan sirup dan air sama dengan sifat HSL yang mana?',
          ),
          choices: [
            { id: 'sat', label: t('Kepekatan warna', 'Saturation (kepekatan)') },
            {
              id: 'hue',
              label: t('Jenis warna', 'Hue (jenis warna)'),
              explainWrong: t(
                'Jenis warna itu seperti merah stroberi atau hijau melon. Kentalnya sirup itu hal lain.',
                'Hue adalah jenis warna, seperti merah atau hijau, bukan kadar sirup.',
              ),
            },
            {
              id: 'lit',
              label: t('Terang-gelap warna', 'Lightness (terang-gelap)'),
              explainWrong: t(
                'Terang-gelap itu seperti lampu ruangan. Kentalnya sirup itu hal lain.',
                'Lightness mengatur terang-gelap dari hitam ke putih, bukan kadar sirup.',
              ),
            },
          ],
          answer: 'sat',
          explainCorrect: t(
            'Sirup yang kental sama dengan warna yang pekat. Sirup yang encer sama dengan warna yang pudar.',
            'Saturation 0% menghasilkan abu-abu pudar, dan 100% menghasilkan warna paling pekat.',
          ),
          hints: [t('Ingat sirup yang kental dan yang encer.')],
          tags: ['hsl'],
        }),
      ),
      conceptStep({
        title: t('Muda, tua, dan kalem', 'Tint, shade, dan tone'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'tint-shade-tone' },
        alt: t('Satu warna ditambah putih, hitam, atau abu-abu menjadi tiga versi.'),
        body: [
          rJunior(
            'Campur warna dengan putih, hasilnya lebih muda. Campur dengan hitam, hasilnya lebih tua. Campur dengan abu-abu, hasilnya lebih kalem.',
          ),
          rPro('Satu warna dasar bisa dibuat menjadi skala 50–900. '),
          rProBold('Tint'),
          rPro(' (+ putih) lebih muda dan lembut, '),
          rProBold('shade'),
          rPro(' (+ hitam) lebih tua dan tegas, '),
          rProBold('tone'),
          rPro(' (+ abu-abu) lebih kalem.'),
        ],
      }),
      qStep({
        id: 'a08-l02-q2',
        type: 'match',
        prompt: t(
          'Pasangkan campuran warna dengan hasilnya.',
          'Pasangkan istilah turunan warna dengan campurannya.',
        ),
        difficulty: 2,
        left: [
          { id: 'ti', label: t('Tambah putih', 'Tint (lebih muda dan lembut)') },
          { id: 'sh', label: t('Tambah hitam', 'Shade (lebih tua dan tegas)') },
          { id: 'to', label: t('Tambah abu-abu', 'Tone (lebih kalem)') },
        ],
        right: [
          { id: 'w', label: t('Warna lebih muda', 'Warna dasar + putih') },
          { id: 'b', label: t('Warna lebih tua', 'Warna dasar + hitam') },
          { id: 'g', label: t('Warna lebih kalem', 'Warna dasar + abu-abu') },
        ],
        answer: { ti: 'w', sh: 'b', to: 'g' },
        explainCorrect: t(
          'Putih membuat warna muda, hitam membuat tua, abu-abu membuat kalem. Seperti cat yang dicampur sedikit demi sedikit.',
          'Satu warna dasar menghasilkan satu keluarga skala 50 sampai 900.',
        ),
        hints: [t('Ingat warna biru yang dicampur susu putih.'), undefined],
        tags: ['hsl'],
      }),
      simStep(
        'roda-warna',
        t(
          'Pilih satu warna di simulator, lalu lihat terang-gelapnya berubah.',
          'Pilih skema Monokromatik di simulator dan amati skala terang-gelap dari satu Hue.',
        ),
      ),
      conceptStep({
        title: t('Menulis HSL di CSS', 'Memakai hsl() untuk varian warna'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'kode-hsl-css' },
        alt: t('Contoh hsl(14, 77%, 54%) dengan angka terakhir diubah untuk versi terang dan gelap.'),
        modes: ['pro'],
        code: {
          lang: 'css',
          code: '/* Ubah angka terakhir (Lightness) untuk membuat tint dan shade */\nbackground: hsl(14, 77%, 54%);',
        },
        body: [
          rPro('Varian warna mudah dibuat dengan HSL: cukup ubah angka ketiga. Contoh: '),
          rCode('hsl(14, 77%, 54%)', ['pro']),
          rPro(' menjadi lebih gelap kalau angka 54% diturunkan, misalnya untuk warna hover.'),
        ],
      }),
      limitStep({
        analogy: t('Warna segelas sirup', 'Gelas sirup dan lampu ruangan untuk HSL'),
        same: [
          t(
            'Sirup dan gambar sama-sama bisa tampak merah atau hijau.',
            'Rasa, kekentalan, dan terang lampu bisa diubah satu per satu, seperti Hue, Saturation, Lightness.',
          ),
        ],
        different: [
          t(
            'Sirup pekat kadang lebih gelap. Di layar, keduanya diatur terpisah.',
            'Sirup pekat juga dapat tampak gelap. Dalam HSL, kepekatan dan terang bisa diatur terpisah.',
          ),
        ],
        riskyAnalogy: true,
      }),
      qStep(
        makeTf({
          id: 'a08-l02-q3',
          prompt: t(
            'Terang lampu dikecilkan sampai habis. Warnanya menjadi hitam.',
            'Dalam HSL, Lightness 0% membuat warna apa pun tampak hitam.',
          ),
          answer: true,
          explainCorrect: t(
            'Tanpa cahaya, semua warna tampak hitam. Seperti kamar yang lampunya mati.',
            'Lightness 0% berarti tanpa cahaya, yaitu hitam. Lightness 100% berarti putih penuh.',
          ),
          explainWrong: t(
            'Pernyataan itu benar. Lampu yang mati membuat semua warna tampak hitam.',
            'Pernyataan itu benar: rentang Lightness dimulai dari 0% (hitam) sampai 100% (putih).',
          ),
          hints: [t('Ingat kamar yang lampunya mati.')],
          tags: ['hsl'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l02-q5j',
          type: 'scenario',
          modes: ['junior'],
          story: t(
            'Nadia menggambar gelas biru di layar. Ia ingin biru yang sama, tetapi lebih gelap.',
            'Nadia memakai sirup biru untuk minuman kelasnya. Ia ingin biru yang sama dengan hasil lebih gelap.',
          ),
          prompt: t('Sifat warna mana yang ia turunkan?'),
          difficulty: 2,
          choices: [
            { id: 'lit', label: t('Terang-gelapnya') },
            {
              id: 'hue',
              label: t('Jenis warnanya saja'),
              explainWrong: t(
                'Mengganti jenis membuat biru menjadi warna lain, misalnya merah. Nadia mau biru yang sama.',
                'Mengganti Hue membuat biru berubah menjadi warna lain, misalnya merah. Nadia mau biru yang sama.',
              ),
            },
            {
              id: 'sat',
              label: t('Kepekatannya'),
              explainWrong: t(
                'Saat kepekatan turun, biru mendekati abu-abu. Nadia ingin mengubah terangnya.',
                'Saturation yang turun membuat biru pudar dan keabu-abuan, bukan lebih gelap.',
              ),
            },
          ],
          answer: 'lit',
          explainCorrect: t(
            'Turunkan terang warna. Gambar gelas menjadi biru yang lebih gelap.',
          ),
          hints: [t('Ingat lampu ruangan yang diredupkan.')],
          tags: ['hsl'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l02-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Gelas sirup dan lampu ruangan'),
          prompt: t('Apa beda menakar sirup sungguhan dengan mengatur HSL di layar?'),
          difficulty: 2,
          choices: [
            {
              id: 'pct',
              label: t('HSL memakai angka pasti yang bisa diulang persis'),
            },
            {
              id: 'rasa',
              label: t('HSL memakai jenis warna seperti memilih rasa sirup'),
              explainWrong: t(
                'Itu kesamaan antara rasa sirup dan Hue, bukan perbedaannya.',
              ),
            },
            {
              id: 'gelap',
              label: t('HSL membuat tampilan gelap saat lampu diredupkan'),
              explainWrong: t(
                'Itu kesamaan dengan Lightness, bukan perbedaannya.',
              ),
            },
          ],
          answer: 'pct',
          explainCorrect: t(
            'Sudut 0°–360° dan persentase 0%–100% selalu menghasilkan warna yang sama. Takaran sirup asli bisa meleset.',
          ),
          hints: [t('Cari bagian yang tidak ada pada sirup asli.')],
          tags: ['hsl'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l02-q5',
          type: 'scenario',
          modes: ['pro'],
          story: t(
            'Nadia memakai warna tombol hsl(215, 80%, 50%). Saat kursor di atas tombol (hover), warnanya harus sedikit lebih gelap tetapi tetap biru.',
          ),
          prompt: t('Bagian mana pada hsl(215, 80%, 50%) yang sebaiknya diturunkan?'),
          difficulty: 2,
          choices: [
            { id: 'lit', label: t('Angka ketiga, misalnya dari 50% ke 40%') },
            {
              id: 'hue',
              label: t('Angka pertama, misalnya dari 215 ke 0'),
              explainWrong: t(
                'Hue 215 adalah biru. Hue 0 adalah merah, jadi warnanya berganti.',
              ),
            },
            {
              id: 'up',
              label: t('Angka kedua, misalnya dari 80% ke 30%'),
              explainWrong: t(
                'Angka kedua mengatur kepekatan. Menurunkannya membuat biru pudar, bukan gelap.',
              ),
            },
          ],
          answer: 'lit',
          explainCorrect: t(
            'Menurunkan Lightness dari 50% ke 40% menggelapkan biru tanpa mengubah Hue.',
          ),
          hints: [t('Angka mana yang mengatur terang-gelap?')],
          tags: ['hsl', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l02-q6',
          modes: ['pro'],
          prompt: t('Berapa rentang sudut Hue pada roda warna HSL?'),
          difficulty: 1,
          choices: [
            { id: 'deg', label: t('0° sampai 360°') },
            {
              id: 'ten',
              label: t('0° sampai 180°'),
              explainWrong: t(
                'Roda warna berbentuk lingkaran penuh. Satu putaran penuh adalah 360°.',
              ),
            },
            {
              id: 'neg',
              label: t('0° sampai 255°'),
              explainWrong: t(
                'Rentang 0 sampai 255 milik saluran warna RGB. Hue memakai sudut lingkaran.',
              ),
            },
          ],
          answer: 'deg',
          explainCorrect: t(
            'Satu putaran penuh roda warna membentang dari 0° sampai 360°.',
          ),
          hints: [t('Roda warna berbentuk lingkaran penuh.')],
          tags: ['hsl', 'roda-warna'],
        }),
      ),
      qStep({
        id: 'a08-l02-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Apa nama campuran warna dengan hitam?'),
        difficulty: 2,
        template: 'Warna dasar ditambah hitam menghasilkan versi lebih tua dan tegas, disebut ___.',
        bank: ['shade', 'tint', 'tone'],
        answer: ['shade'],
        explainCorrect: t('Shade memakai hitam. Tint memakai putih, dan tone memakai abu-abu.'),
        hints: [t('Hitam membuat warna lebih tua dan tegas.'), undefined],
        tags: ['hsl'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a08-l02-r1',
        prompt: t(
          'Sifat warna mana yang mengatur terang atau gelapnya?',
          'Sifat HSL mana yang mengatur warna dari hitam sampai putih?',
        ),
        choices: [
          { id: 'l', label: t('Terang-gelap', 'Lightness') },
          {
            id: 'w',
            label: t('Jenis warna', 'Hue'),
            explainWrong: t(
              'Jenis warna itu seperti merah stroberi atau hijau melon. Terang lampu itu hal lain.',
              'Hue mengatur posisi di roda, bukan hitam sampai putih.',
            ),
          },
          {
            id: 'k',
            label: t('Kepekatan', 'Saturation'),
            explainWrong: t(
              'Kepekatan itu kentalnya sirup. Terang lampu itu hal lain.',
              'Saturation mengatur abu-abu sampai murni, bukan hitam sampai putih.',
            ),
          },
        ],
        answer: 'l',
        explainCorrect: t(
          'Terang-gelap diatur seperti lampu ruangan. Dari gelap sampai terang.',
          'Lightness mengatur kecerahan dari 0% hitam ke 100% putih.',
        ),
        hints: [t('Ingat lampu ruangan.')],
        tags: ['hsl'],
      }),
      makeTf({
        id: 'a08-l02-r2',
        prompt: t(
          'Putih dicampur ke satu warna membuat warna itu lebih muda dan lembut.',
          'Menambahkan putih ke warna dasar menghasilkan tint yang lebih muda dan lembut.',
        ),
        answer: true,
        explainCorrect: t(
          'Putih membuat warna lebih muda. Seperti cat biru yang diberi susu putih.',
          'Tint sering dipakai untuk latar kartu yang lembut, misalnya biru muda.',
        ),
        explainWrong: t(
          'Pernyataan itu benar. Putih membuat warna lebih muda dan lembut.',
          'Pernyataan itu benar: warna dasar ditambah putih menghasilkan tint.',
        ),
        hints: [t('Ingat cat yang diberi susu putih.')],
        tags: ['hsl'],
      }),
    ],
    recap: t(
      'Kamu bisa memilih jenis warna, kepekatan, dan terangnya.',
      'HSL mengatur warna lewat Hue, Saturation, dan Lightness. Tint, shade, dan tone membuat skala dari satu warna.',
    ),
    companion: {
      talkPrompts: ['Sirup terlalu encer itu mirip mengubah sifat warna yang mana?'],
      offlineActivity:
        'Lihat warna kemeja atau cat dinding saat lampu terang dan saat gorden ditutup. Itu perubahan terang-gelap.',
    },
  }),

  makeLesson({
    id: 'a08-l03',
    worldId: 'a08',
    title: 'Skema warna',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa memilih resep warna: satu warna, bertetangga, atau berseberangan.',
      'Kamu bisa membedakan skema monokromatik, analog, komplementer, split-komplementer, triadik, dan tetradik.',
    ),
    atWork: 'Kamu memilih warna tombol ajakan yang menonjol dari latar halaman tanpa membuat tampilan ramai.',
    estMinutes: 5,
    introducesTerms: ['skema-warna'],
    usesTerms: ['ui', 'roda-warna', 'hsl'],
    warmupFrom: 'a08-l02',
    steps: [
      storyStep('a08/resep-seragam.svg', [
        rText(
          'Kamu memilih baju untuk hari pertama sekolah. Ada resep supaya warna baju terlihat serasi. Resep apa saja yang ada?',
          'Kamu menyusun palet untuk sebuah situs, tetapi warnanya saling bertabrakan. Kamu butuh resep yang menjaga warna tetap harmonis.',
        ),
      ]),
      conceptStep({
        title: t('Satu warna dan tetangga dekat', 'Monokromatik dan analog'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'skema-mono-analog' },
        alt: t('Biru tua sampai muda, dan biru, toska, hijau yang bertetangga.'),
        body: [
          rJTerm('skema-warna', 'Skema warna'),
          rJunior(
            ' adalah resep memilih warna yang serasi. Satu warna dengan terang-gelap berbeda terasa aman dan rapi. Dua warna bertetangga terasa lembut.',
          ),
          rProTerm('skema-warna', 'Skema warna'),
          rPro(' adalah resep memilih beberapa warna dari roda. '),
          rProBold('Monokromatik'),
          rPro(' memakai satu hue dengan variasi terang-gelap, paling aman dan rapi. '),
          rProBold('Analog'),
          rPro(' memakai 2–3 warna yang bersebelahan, lembut dan harmonis.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a08-l03-q8',
          prompt: t(
            'Biru, toska, dan hijau saling bertetangga di roda. Resep warna apa itu?',
            'Biru, toska, dan hijau bersebelahan pada roda warna. Skema apa itu?',
          ),
          choices: [
            { id: 'an', label: t('Warna yang bertetangga', 'Analog') },
            {
              id: 'mo',
              label: t('Satu warna saja', 'Monokromatik'),
              explainWrong: t(
                'Satu warna hanya memakai biru yang terang-gelap. Di sini ada tiga warna.',
                'Monokromatik memakai satu hue. Di sini ada tiga hue yang berdekatan.',
              ),
            },
            {
              id: 'rnd',
              label: t('Warna yang dipilih acak', 'Komplementer'),
              explainWrong: t(
                'Ketiga warna itu berdekatan, bukan acak. Letak berdekatan itulah resepnya.',
                'Komplementer memadukan dua warna yang berseberangan, bukan tiga warna yang bersebelahan.',
              ),
            },
          ],
          answer: 'an',
          explainCorrect: t(
            'Warna bertetangga terasa lembut dan menyatu. Seperti pelangi yang warnanya berurutan.',
            'Skema analog memakai 2–3 warna yang bersebelahan. Hasilnya lembut dan harmonis, seperti warna alam.',
          ),
          hints: [t('Lihat letak ketiga warna di roda.')],
          tags: ['skema-warna'],
        }),
      ),
      conceptStep({
        title: t('Berseberangan agar tombol menonjol', 'Komplementer dan split-komplementer'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'skema-komplementer' },
        alt: t('Biru berseberangan dengan jingga pada roda warna menghasilkan kontras tajam.'),
        body: [
          rJunior(
            'Dua warna berseberangan membuat tombol langsung menonjol. Tiga warna berjarak sama terasa ceria.',
          ),
          rProBold('Komplementer'),
          rPro(' memadukan 2 warna berseberangan dan menghasilkan kontras terkuat untuk tombol. '),
          rProBold('Split-komplementer'),
          rPro(' memakai 1 warna dan 2 tetangga dari seberangnya agar lebih lembut.'),
        ],
      }),
      conceptStep({
        title: t('Triadik, tetradik, dan rumus aman'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'triadik-rumus-pemula' },
        alt: t('Tiga warna berjarak sama dan rumus satu utama, abu-abu, satu aksen.'),
        modes: ['pro'],
        body: [
          rProBold('Triadik'),
          rPro(' memakai 3 warna berjarak sama, kesannya ceria. '),
          rProBold('Tetradik'),
          rPro(
            ' memakai 4 warna dan paling sulit diseimbangkan. Rumus aman untuk pemula: 1 warna utama, abu-abu, dan 1 aksen.',
          ),
        ],
      }),
      simStep(
        'roda-warna',
        t(
          'Ketuk tiga pilihan skema di simulator, lalu lihat bedanya.',
          'Bandingkan palet Monokromatik, Analog, dan Komplementer di simulator Pembuat Skema Roda Warna.',
        ),
      ),
      limitStep({
        analogy: t('Resep memilih pasangan warna pakaian'),
        same: [
          t(
            'Warna tetangga terasa tenang. Warna berseberangan langsung mencuri pandangan.',
            'Warna tetangga terasa tenang menyatu, dan warna berseberangan langsung mencuri pandangan.',
          ),
        ],
        different: [
          t(
            'Di halaman, jangan bagi dua warna sama banyak. Pakai satu utama, pasangannya sedikit.',
            'Pada skema komplementer, jangan bagi biru dan jingga sama banyak. Jadikan satu warna utama dan pasangannya sedikit untuk tombol.',
          ),
        ],
        riskyAnalogy: false,
      }),
      qStep({
        id: 'a08-l03-q1',
        type: 'match',
        prompt: t(
          'Pasangkan resep warna dengan kesannya.',
          'Pasangkan jenis skema warna dengan ciri khasnya di roda warna.',
        ),
        difficulty: 2,
        left: [
          { id: 'mo', label: t('Satu warna saja', 'Monokromatik') },
          { id: 'an', label: t('Warna bertetangga', 'Analog') },
          { id: 'co', label: t('Warna berseberangan', 'Komplementer') },
          { id: 'tr', label: t('Tiga warna berjarak sama', 'Triadik') },
        ],
        right: [
          { id: 'rmo', label: t('Aman dan rapi', 'Satu hue dengan variasi terang-gelap') },
          { id: 'ran', label: t('Lembut dan tenang', '2–3 warna yang bersebelahan') },
          { id: 'rco', label: t('Tombol menonjol', '2 warna berseberangan untuk kontras kuat') },
          { id: 'rtr', label: t('Ceria dan seru', '3 warna berjarak sama membentuk segitiga') },
        ],
        answer: { mo: 'rmo', an: 'ran', co: 'rco', tr: 'rtr' },
        explainCorrect: t(
          'Setiap resep punya kesan sendiri: aman, lembut, menonjol, atau ceria. Pilih sesuai tujuanmu.',
          'Keempat skema ini paling sering dipakai desainer. Masing-masing punya kesan dan fungsi sendiri.',
        ),
        hints: [t('Ingat resep baju: satu warna, tetangga, seberang.'), undefined],
        tags: ['skema-warna'],
      }),
      qStep(
        makeMcq({
          id: 'a08-l03-q2',
          type: 'analogy',
          prompt: t(
            'Halaman berwarna biru, lalu tombol "Beli" diberi jingga. Resep warna apa itu?',
            'Halaman banyak memakai biru yang tenang, lalu tombol "Beli" diberi jingga dari seberangnya. Skema apa itu?',
          ),
          choices: [
            { id: 'co', label: t('Warna berseberangan', 'Skema komplementer') },
            {
              id: 'mo',
              label: t('Satu warna saja', 'Skema monokromatik'),
              explainWrong: t(
                'Satu warna saja tidak punya jingga. Di sini ada biru dan jingga.',
                'Monokromatik hanya memakai variasi biru, tanpa jingga.',
              ),
            },
            {
              id: 'an',
              label: t('Warna bertetangga dekat', 'Skema analog'),
              explainWrong: t(
                'Biru dan jingga berdiri berjauhan di roda. Warna bertetangga lebih mirip satu sama lain.',
                'Biru dan jingga berseberangan di roda warna, bukan bersebelahan.',
              ),
            },
          ],
          answer: 'co',
          explainCorrect: t(
            'Dua warna berseberangan membuat tombol langsung terlihat. Seperti spidol jingga di kertas biru.',
            'Pasangan berseberangan seperti biru dan jingga menciptakan kontras tinggi untuk tombol ajakan.',
          ),
          hints: [t('Biru dan jingga berdiri berjauhan di roda.')],
          tags: ['skema-warna', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l03-q5',
          type: 'scenario',
          story: t(
            'Bito membuat situs permainan untuk anak SD. Situsnya harus ceria, penuh warna, dan tetap rapi.',
            'Bito membuat situs permainan anak SD yang ceria dan penuh warna. Palet harus tetap teratur.',
          ),
          prompt: t('Resep warna mana yang paling cocok?', 'Skema warna mana yang paling cocok?'),
          difficulty: 2,
          choices: [
            { id: 'tri', label: t('Tiga warna berjarak sama', 'Triadik: 3 warna berjarak sama') },
            {
              id: 'bw',
              label: t('Satu warna biru saja', 'Monokromatik: satu hue saja'),
              explainWrong: t(
                'Satu warna terasa aman, tetapi kurang ceria untuk anak.',
                'Monokromatik terasa aman tetapi kurang ceria untuk produk anak.',
              ),
            },
            {
              id: 'ten',
              label: t('Dua warna bertetangga', 'Analog: 2–3 warna bersebelahan'),
              explainWrong: t(
                'Warna bertetangga terasa lembut. Situs anak butuh rasa yang lebih ramai.',
                'Analog terasa lembut dan tenang, kurang energik untuk produk anak.',
              ),
            },
          ],
          answer: 'tri',
          explainCorrect: t(
            'Tiga warna berjarak sama terasa ceria. Seperti pelangi kecil di kelas.',
            'Skema triadik memberi nuansa ceria dan berenergi yang cocok untuk aplikasi anak.',
          ),
          hints: [t('Ingat: ceria dan tetap rapi.', 'Cari skema yang ceria tetapi seimbang.')],
          tags: ['skema-warna'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a08-l03-q3',
          modes: ['pro'],
          prompt: t('Skema tetradik (4 warna sekaligus) paling mudah diseimbangkan untuk pemula.'),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru: tetradik paling sulit diseimbangkan. Skema paling aman untuk pemula adalah monokromatik.',
          ),
          explainWrong: t(
            'Makin banyak warna berbeda, makin sulit menjaga keseimbangan. Tetradik memakai 4 warna.',
          ),
          hints: [t('Hitung berapa warna yang harus diseimbangkan.')],
          tags: ['skema-warna'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l03-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Memadukan warna berseberangan'),
          prompt: t('Aturan apa yang perlu dijaga saat memakai skema komplementer, misalnya biru dan jingga?'),
          difficulty: 2,
          choices: [
            { id: 'dom', label: t('Satu warna dominan, pasangannya sebagai aksen kecil') },
            {
              id: 'max',
              label: t('Teks jingga di atas latar biru untuk seluruh paragraf'),
              explainWrong: t(
                'Dua warna cerah yang berseberangan saling menabrak. Di teks panjang, itu melelahkan mata.',
              ),
            },
            {
              id: 'gray',
              label: t('Hindari warna putih dan abu-abu sama sekali'),
              explainWrong: t(
                'Putih dan abu-abu justru dibutuhkan untuk meredam palet.',
              ),
            },
          ],
          answer: 'dom',
          explainCorrect: t(
            'Satu warna utama, latar netral, dan aksen komplementer yang kecil membuat layar nyaman.',
          ),
          hints: [t('Pikirkan porsi: warna mana yang dipakai paling sedikit?')],
          tags: ['skema-warna'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l03-q6',
          modes: ['pro'],
          prompt: t('Kombinasi apa yang paling praktis agar palet pemula rapi di hampir semua produk digital?'),
          difficulty: 1,
          choices: [
            { id: 'safe', label: t('1 warna utama, abu-abu netral, 1 aksen kontras') },
            {
              id: 'four',
              label: t('4 warna cerah sama besar, tanpa abu-abu'),
              explainWrong: t(
                'Tanpa abu-abu untuk teks dan latar, halaman terasa sangat ramai.',
              ),
            },
            {
              id: 'rain',
              label: t('12 warna di roda dipakai sebagai latar kotak'),
              explainWrong: t(
                'Terlalu banyak warna merusak hierarki visual.',
              ),
            },
          ],
          answer: 'safe',
          explainCorrect: t(
            'Tiga kelompok itu cukup untuk tampilan yang rapi dan fokus.',
          ),
          hints: [t('Ingat rumus aman: utama, netral, aksen.')],
          tags: ['skema-warna', 'ui'],
        }),
      ),
      qStep({
        id: 'a08-l03-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Apa nama skema warna yang hanya memakai satu hue dengan variasi terang-gelap?'),
        difficulty: 1,
        accept: ['monokromatik', 'monochromatic'],
        explainCorrect: t('Skema monokromatik paling aman dan rapi bagi pemula.'),
        hints: [t('Awalan "mono" berarti satu.'), undefined],
        tags: ['skema-warna'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a08-l03-r1',
        prompt: t(
          'Warna yang bertetangga di roda terasa seperti apa?',
          'Skema yang memadukan 2–3 warna bersebelahan, misalnya biru, toska, dan hijau, disebut apa?',
        ),
        choices: [
          { id: 'an', label: t('Lembut dan menyatu', 'Analog') },
          {
            id: 'co',
            label: t('Tegas dan berlawanan', 'Komplementer'),
            explainWrong: t(
              'Tegas dan berlawanan itu warna berseberangan. Warna bertetangga lebih lembut.',
              'Komplementer memadukan dua warna yang berseberangan.',
            ),
          },
          {
            id: 'mo',
            label: t('Ramai dan acak', 'Monokromatik'),
            explainWrong: t(
              'Warna bertetangga tertata dan tidak acak. Mereka berdekatan di roda.',
              'Monokromatik memakai satu hue, bukan beberapa warna bersebelahan.',
            ),
          },
        ],
        answer: 'an',
        explainCorrect: t(
          'Warna bertetangga terasa lembut dan menyatu. Seperti warna daun dan langit.',
          'Skema analog menghasilkan suasana lembut dan harmonis, seperti warna alam.',
        ),
        hints: [t('Ingat pelangi yang warnanya berurutan.')],
        tags: ['skema-warna'],
      }),
      makeTf({
        id: 'a08-l03-r2',
        prompt: t(
          'Dua warna berseberangan di roda membuat tombol menonjol.',
          'Split-komplementer memadukan satu warna dengan dua tetangga dari seberangnya, jadi kontrasnya lebih lembut.',
        ),
        answer: true,
        explainCorrect: t(
          'Dua warna berseberangan saling menonjolkan. Seperti spidol jingga di kertas biru.',
          'Kontrasnya tetap kuat, tetapi tidak sekeras skema komplementer biasa.',
        ),
        explainWrong: t(
          'Pernyataan itu benar. Warna berseberangan membuat satu hal mencuri pandangan.',
          'Pernyataan itu benar: split-komplementer memberi kontras tanpa terasa terlalu keras.',
        ),
        hints: [t('Ingat spidol jingga di kertas biru.')],
        tags: ['skema-warna'],
      }),
    ],
    recap: t(
      'Satu warna itu aman, bertetangga itu lembut, berseberangan membuat tombol menonjol.',
      'Pilih monokromatik, analog, komplementer, split-komplementer, atau triadik. Rumus aman: 1 utama, abu-abu, 1 aksen.',
    ),
    companion: {
      talkPrompts: ['Resep warna apa yang kamu pakai di bajumu hari ini?'],
      offlineActivity:
        'Buka lemari baju. Pasangkan satu set baju serba biru, lalu bandingkan dengan biru dan jingga.',
    },
  }),

  makeLesson({
    id: 'a08-l04',
    worldId: 'a08',
    title: 'Aturan 60-30-10',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membagi warna latar, kartu, dan tombol.',
      'Kamu bisa menyusun palet produk (Primary, Accent, Neutral, Semantic) dan merancang dark mode yang nyaman.',
    ),
    atWork: 'Kamu menentukan warna tombol utama supaya menonjol di halaman yang latarnya sudah dipilih tim desain.',
    estMinutes: 6,
    introducesTerms: ['aturan-60-30-10'],
    usesTerms: ['ui', 'roda-warna', 'skema-warna'],
    warmupFrom: 'a08-l03',
    steps: [
      storyStep('a08/berpakaian-60-30-10.svg', [
        rText(
          'Baju yang rapi punya warna netral paling banyak. Jaketnya sedang, dan syalnya mencolok sedikit. Apa jadinya kalau semuanya menyala?',
          'Halaman memakai warna yang serasi, tetapi terasa ramai dan melelahkan mata. Kamu perlu takaran yang seimbang.',
        ),
      ]),
      conceptStep({
        title: t('Resep takaran 60-30-10', 'Aturan 60-30-10'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'diagram-60-30-10' },
        alt: t('Batang takaran: latar netral paling luas, kartu dan teks sedang, tombol kecil.'),
        body: [
          rJTerm('aturan-60-30-10', 'Aturan 60-30-10'),
          rJunior(
            ' adalah contoh pembagian warna. Bayangkan sepuluh kotak. Enam untuk latar, tiga untuk kartu, satu untuk tombol.',
          ),
          rProTerm('aturan-60-30-10', 'Aturan 60-30-10'),
          rPro(
            ' adalah takaran tampilan: 60% dominan (latar netral), 30% sekunder (teks, kartu), dan 10% aksen (tombol utama).',
          ),
        ],
      }),
      qStep({
        id: 'a08-l04-q1',
        type: 'match',
        prompt: t(
          'Pasangkan takaran warna dengan tugasnya di halaman.',
          'Pasangkan takaran aturan 60-30-10 dengan perannya di halaman web.',
        ),
        difficulty: 1,
        left: [
          { id: 'p60', label: t('60 bagian', '60% dominan') },
          { id: 'p30', label: t('30 bagian', '30% sekunder') },
          { id: 'p10', label: t('10 bagian', '10% aksen') },
        ],
        right: [
          { id: 'r60', label: t('Latar netral yang lapang', 'Latar belakang netral yang lapang dan tenang') },
          { id: 'r30', label: t('Kartu, garis, dan tulisan', 'Kartu, garis pembatas, dan teks') },
          { id: 'r10', label: t('Tombol penting seperti "Beli"', 'Tombol utama "Beli" dan sorotan terpenting') },
        ],
        answer: { p60: 'r60', p30: 'r30', p10: 'r10' },
        explainCorrect: t(
          'Latar netral paling luas, kartu sedang, tombol paling kecil. Seperti baju, jaket, dan syal.',
          'Takaran ini memberi keseimbangan warna yang profesional. Aksen yang kecil menjadi pusat perhatian.',
        ),
        hints: [t('Ingat baju netral paling banyak.'), undefined],
        tags: ['aturan-60-30-10'],
      }),
      conceptStep({
        title: t('Empat bagian palet produk'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'empat-kelompok-palet' },
        alt: t('Empat kelompok palet: Primary, Accent, Neutral abu-abu, dan Semantic.'),
        modes: ['pro'],
        body: [
          rPro(
            'Palet produk biasanya punya 4 kelompok. Primary adalah warna merek, Accent adalah sorotan, Neutral adalah skala abu-abu, dan Semantic adalah warna status.',
          ),
        ],
      }),
      conceptStep({
        title: t('Aturan aman mode gelap', 'Light mode dan dark mode'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'dark-mode-nyaman' },
        alt: t(
          'Mode gelap memakai abu sangat gelap, bukan hitam pekat.',
          'Dark mode memakai abu sangat gelap #121212, bukan hitam pekat #000000.',
        ),
        body: [
          rText(
            'Mode gelap bukan sekadar membalik putih menjadi hitam pekat. Pakai abu sangat gelap supaya mata tidak silau. Di banyak HP, mode gelap juga menghemat baterai.',
            'Dark mode nyaman di tempat redup dan menghemat baterai layar OLED. Hindari #000 murni dengan #FFF murni karena terlalu silau. Pakai abu gelap (#121212) dan aksen yang sedikit lebih kalem.',
          ),
        ],
      }),
      simStep(
        'roda-warna',
        t(
          'Lihat palet di simulator: warna cerah dipakai sedikit untuk tombol.',
          'Amati perbandingan warna dominan yang lembut dan aksen yang kuat di simulator Roda Warna.',
        ),
      ),
      limitStep({
        analogy: t('Berpakaian 60% dasar, 30% jaket, 10% aksesori'),
        same: [
          t(
            'Warna mencolok hanya sedikit, jadi menjadi pusat perhatian tanpa melelahkan mata.',
            'Warna mencolok hanya di bagian kecil, jadi menjadi pusat perhatian tanpa melelahkan mata.',
          ),
        ],
        different: [
          t(
            'Aplikasi butuh tanda saat sesuatu berhasil atau gagal.',
            'Aplikasi juga butuh deretan abu-abu netral dan warna status untuk sukses atau error.',
          ),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeMcq({
          id: 'a08-l04-q2',
          type: 'analogy',
          prompt: t(
            'Latar halaman oranye menyala, tombol biru neon, tulisan kuning terang. Apa yang salah?',
            'Latar oranye menyala, kartu biru neon, tombol kuning terang. Mengapa tombol sulit ditemukan?',
          ),
          choices: [
            {
              id: 'loud',
              label: t('Semua warnanya mencolok sekaligus', 'Semua warna mencolok sekaligus dan melelahkan'),
            },
            {
              id: 'calm',
              label: t('Warnanya terlalu sedikit', 'Terlalu netral, tidak ada tombol yang menonjol'),
              explainWrong: t(
                'Justru terlalu banyak warna yang menyala. Mata tidak tahu harus melihat ke mana.',
                'Masalahnya justru semua warna berebut perhatian.',
              ),
            },
            {
              id: 'dark',
              label: t('Warnanya terlalu gelap', 'Terlalu gelap, mirip mode gelap OLED'),
              explainWrong: t(
                'Warna cerah yang menyala bukan warna gelap.',
                'Warna cerah menyala yang memenuhi layar bukanlah dark mode.',
              ),
            },
          ],
          answer: 'loud',
          explainCorrect: t(
            'Kalau semuanya menyala, mata lelah. Latar netral membuat satu aksen bersinar.',
            'Latar dominan 60% sebaiknya netral agar aksen 10% benar-benar bersinar.',
          ),
          hints: [t('Ingat baju yang semuanya menyala.', 'Hitung berapa warna yang saling berebut perhatian.')],
          tags: ['aturan-60-30-10'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a08-l04-q3',
          prompt: t(
            'Mode gelap terbaik memakai hitam pekat dan putih paling terang.',
            'Dark mode terbaik memakai hitam murni #000000 dan teks putih murni #FFFFFF di seluruh layar.',
          ),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru. Abu sangat gelap lebih nyaman di mata.',
            'Pernyataan itu keliru: hitam #000000 dengan putih #FFFFFF terlalu silau. Abu sangat gelap (#121212) dengan putih yang diredupkan lebih nyaman.',
          ),
          explainWrong: t(
            'Hitam dan putih pekat membuat mata silau. Mode gelap butuh abu yang lembut.',
            'Dark mode bukan sekadar membalik #FFF menjadi #000.',
          ),
          hints: [t('Ingat lampu kamar yang terlalu terang.')],
          tags: ['aturan-60-30-10', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l04-q5',
          type: 'scenario',
          story: t(
            'Di aplikasi belajar Pak Udin, seluruh latar berwarna biru terang. Tombol "Mulai Kuis" juga biru terang, jadi tenggelam.',
            'Di aplikasi belajar Pak Udin, seluruh latar berwarna biru terang mencolok. Tombol "Mulai Kuis" yang juga biru terang jadi tenggelam.',
          ),
          prompt: t('Apa perbaikan terbaiknya?', 'Perbaikan terbaik dengan aturan 60-30-10 adalah apa?'),
          difficulty: 2,
          choices: [
            {
              id: 'fix',
              label: t('Latar netral, hanya tombol yang cerah', 'Latar netral, aksen cerah khusus tombol utama'),
            },
            {
              id: 'same',
              label: t('Semua tulisan dibuat biru terang juga', 'Ganti semua teks menjadi biru terang juga'),
              explainWrong: t(
                'Tulisan biru terang di latar biru terang tidak terbaca. Semuanya menyatu.',
                'Teks biru terang di latar biru terang hampir tidak terbaca.',
              ),
            },
            {
              id: 'more',
              label: t('Setengah latar dibuat kuning terang', 'Tambahkan latar kuning terang di sebagian halaman'),
              explainWrong: t(
                'Warna cerah tambahan membuat mata makin bingung. Tombol tetap tenggelam.',
                'Menambah warna cerah di area dominan makin membingungkan fokus.',
              ),
            },
          ],
          answer: 'fix',
          explainCorrect: t(
            'Latar netral memberi ruang. Tombol cerah yang kecil langsung terlihat.',
            'Begitu latar 60% dibuat netral, tombol aksen 10% langsung terlihat.',
          ),
          hints: [t('Ingat syal kecil di baju netral.', 'Pisahkan peran latar, kartu, dan tombol.')],
          tags: ['aturan-60-30-10', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l04-q6',
          prompt: t(
            'Apa untung lain mode gelap di banyak HP?',
            'Selain nyaman di ruangan redup, apa keuntungan lain dark mode yang dirancang baik di layar OLED?',
          ),
          difficulty: 2,
          choices: [
            { id: 'bat', label: t('Baterai lebih hemat', 'Menghemat baterai layar OLED') },
            {
              id: 'wifi',
              label: t('Internet jadi lebih cepat', 'Menambah kepekatan warna merek'),
              explainWrong: t(
                'Mode gelap mengubah tampilan, bukan kecepatan internet.',
                'Kepekatan warna merek ditentukan oleh warna yang dipilih.',
              ),
            },
            {
              id: 'html',
              label: t('Gambar jadi lebih tajam', 'Menjamin kontras setiap tulisan'),
              explainWrong: t(
                'Gambar tetap sama tajam. Hanya warnanya yang berbeda.',
                'Teks gelap pada latar gelap tetap sulit dibaca.',
              ),
            },
          ],
          answer: 'bat',
          explainCorrect: t(
            'Titik layar yang gelap memakai sedikit tenaga. Jadi baterai tahan lebih lama.',
            'Piksel gelap di panel OLED memakai daya jauh lebih sedikit daripada layar putih terang.',
          ),
          hints: [t('Ingat titik layar yang mati.')],
          tags: ['ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l04-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Berpakaian dengan aturan 60-30-10'),
          prompt: t('Apa tambahan yang dibutuhkan palet aplikasi dibanding memilih baju harian?'),
          difficulty: 2,
          choices: [
            { id: 'pal', label: t('Deretan abu-abu netral dan warna status') },
            {
              id: 'ten',
              label: t('Aksen mencolok tetap dijaga sekitar 10%'),
              explainWrong: t('Itu kesamaan yang tetap berlaku, bukan tambahan.'),
            },
            {
              id: 'bal',
              label: t('Warna latar utama tetap memakai ruang terbesar'),
              explainWrong: t('Itu juga kesamaan keduanya, bukan tambahan.'),
            },
          ],
          answer: 'pal',
          explainCorrect: t('Skala abu-abu netral dan warna status melengkapi aturan 60-30-10 di produk digital.'),
          hints: [t('Cari bagian yang tidak dimiliki baju.')],
          tags: ['aturan-60-30-10'],
        }),
      ),
      qStep({
        id: 'a08-l04-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Kelompok apa yang melengkapi struktur palet sistem desain?'),
        difficulty: 2,
        template: 'Palet produk umumnya terbagi atas Primary, Accent, ___, dan Semantic.',
        bank: ['Neutral', 'Contrast', 'Gradient'],
        answer: ['Neutral'],
        explainCorrect: t('Neutral adalah skala abu-abu untuk teks, garis pemisah, dan latar halaman.'),
        hints: [t('Skala abu-abu menopang teks dan latar.'), undefined],
        tags: ['aturan-60-30-10'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a08-l04-r1',
        prompt: t(
          'Bagian 60 yang paling besar diisi warna apa?',
          'Dalam aturan 60-30-10, bagian 60% sebaiknya diisi warna apa?',
        ),
        choices: [
          { id: 'neu', label: t('Latar yang tenang dan netral') },
          {
            id: 'neon',
            label: t('Warna menyala yang paling mencolok'),
            explainWrong: t(
              'Warna menyala cukup 10 bagian saja. Kalau lebih, mata cepat lelah.',
              'Warna aksen yang mencolok cukup 10% agar tidak melelahkan mata.',
            ),
          },
          {
            id: 'btn',
            label: t('Warna tombol yang penting'),
            explainWrong: t(
              'Tombol penting memakai bagian 10, yaitu bagian terkecil.',
              'Tombol utama memakai porsi aksen 10%, bukan 60%.',
            ),
          },
        ],
        answer: 'neu',
        explainCorrect: t(
          'Latar netral memberi ruang lapang. Tombol dan tulisan terbaca nyaman.',
          'Latar netral 60% memberi ruang agar konten dan tombol aksen terbaca nyaman.',
        ),
        hints: [t('Ingat baju yang paling banyak terlihat.')],
        tags: ['aturan-60-30-10'],
      }),
      makeTf({
        id: 'a08-l04-r2',
        prompt: t(
          'Di mode gelap, warna mencolok sebaiknya sedikit diredupkan.',
          'Pada dark mode, warna mencolok sebaiknya diturunkan sedikit kepekatannya agar tidak menyilaukan.',
        ),
        answer: true,
        explainCorrect: t(
          'Warna yang terlalu terang terasa menyilaukan di latar gelap. Diredupkan sedikit, mata lebih nyaman.',
          'Warna yang sangat pekat terasa berpendar silau di atas abu gelap.',
        ),
        explainWrong: t(
          'Pernyataan itu benar. Warna yang diredupkan sedikit terasa lebih lembut.',
          'Pernyataan itu benar: aksen yang sedikit lebih kalem membuat dark mode lebih lembut.',
        ),
        hints: [t('Ingat senter di kamar yang gelap.')],
        tags: ['aturan-60-30-10'],
      }),
    ],
    recap: t(
      'Latar netral 60 bagian, kartu dan tulisan 30, tombol penting 10.',
      'Terapkan 60-30-10 dengan palet Primary, Accent, Neutral, dan Semantic. Di mode gelap, hindari #000 dan #FFF murni.',
    ),
    companion: {
      talkPrompts: ['Warna apa yang paling banyak di bajumu hari ini?'],
      offlineActivity:
        'Buka satu aplikasi yang rapi di HP. Perkirakan berapa bagian untuk latar, kartu, dan tombol utamanya.',
    },
  }),

  makeLesson({
    id: 'a08-l05',
    worldId: 'a08',
    title: 'Warna yang membawa pesan',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menyebutkan arti warna status dan menambahkan ikon atau tulisan.',
      'Kamu bisa memilih warna merek sesuai kesannya dan memakai warna semantik bersama ikon.',
    ),
    atWork: 'Kamu menandai kolom form yang salah dengan warna, ikon, dan pesan, bukan warna saja.',
    estMinutes: 6,
    introducesTerms: ['warna-semantik'],
    usesTerms: ['ui', 'ux', 'skema-warna'],
    warmupFrom: 'a08-l04',
    steps: [
      storyStep('a08/lampu-lalu-lintas.svg', [
        rText(
          'Lampu lalu lintas hijau berarti jalan. Merah berarti berhenti. Mengapa pengemudi langsung mengerti?',
          'Form pesanan di aplikasi Toko Rani harus menunjukkan statusnya secepat lampu lalu lintas. Warna pada tampilan membawa pesan itu.',
        ),
      ]),
      conceptStep({
        title: t('Kesan dan arti warna', 'Psikologi warna merek'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'psikologi-warna' },
        alt: t('Biru untuk kepercayaan, hijau alami, merah mendesak, ungu kreatif.'),
        modes: ['pro'],
        body: [
          rPro(
            'Sejumlah merek memakai biru untuk memberi kesan tepercaya atau ungu untuk kesan kreatif. Kesan ini dapat berbeda antarbudaya. Periksa pilihan warna bersama calon pemakai.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a08-l05-q6',
          modes: ['pro'],
          prompt: t('Kesan apa yang umumnya dibawa warna ungu pada identitas produk?'),
          difficulty: 2,
          choices: [
            { id: 'cre', label: t('Mewah, kreatif, dan imajinatif') },
            {
              id: 'err',
              label: t('Kesalahan sistem atau larangan masuk'),
              explainWrong: t('Banyak aplikasi memakai merah untuk menandai kesalahan.'),
            },
            {
              id: 'agr',
              label: t('Segar dan alami seperti sayur organik'),
              explainWrong: t('Banyak merek memilih hijau untuk memberi kesan segar.'),
            },
          ],
          answer: 'cre',
          explainCorrect: t('Ungu sering dipilih untuk produk kreatif, desain, atau kecantikan.'),
          hints: [t('Pikirkan merek kecantikan atau desain.')],
          tags: ['ui'],
        }),
      ),
      conceptStep({
        title: t('Empat warna status', 'Warna semantik tetap'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'empat-warna-semantik' },
        alt: t('Hijau berhasil, merah gagal, kuning hati-hati, dan biru keterangan.'),
        body: [
          rJTerm('warna-semantik', 'Warna semantik'),
          rJunior(
            ' artinya warna yang punya arti tetap. Hijau berarti berhasil, kuning berarti hati-hati. Merah berarti gagal, biru berarti keterangan.',
          ),
          rProTerm('warna-semantik', 'Warna semantik'),
          rPro(
            ' adalah warna dengan makna tetap pada tampilan. Success (hijau) berarti berhasil, Error (merah) gagal atau bahaya, Warning (kuning atau jingga) hati-hati, dan Info (biru) keterangan.',
          ),
        ],
      }),
      qStep({
        id: 'a08-l05-q1',
        type: 'match',
        prompt: t(
          'Pasangkan warna dengan artinya di aplikasi.',
          'Pasangkan warna semantik dengan arti statusnya di aplikasi.',
        ),
        difficulty: 1,
        left: [
          { id: 'ok', label: t('Hijau') },
          { id: 'err', label: t('Merah') },
          { id: 'wrn', label: t('Kuning atau oranye') },
          { id: 'inf', label: t('Biru') },
        ],
        right: [
          { id: 'rok', label: t('Berhasil', 'Pesanan atau simpan data berhasil') },
          { id: 'rerr', label: t('Gagal atau bahaya', 'Gagal atau aksi berbahaya seperti hapus data') },
          { id: 'rwrn', label: t('Hati-hati', 'Peringatan untuk berhati-hati') },
          { id: 'rinf', label: t('Keterangan', 'Pesan keterangan yang netral') },
        ],
        answer: { ok: 'rok', err: 'rerr', wrn: 'rwrn', inf: 'rinf' },
        explainCorrect: t(
          'Hijau berhasil, kuning hati-hati, merah gagal, biru keterangan. Artinya sama di hampir semua aplikasi.',
          'Keempat warna status ini dipakai di hampir semua aplikasi. Orang langsung mengenal artinya tanpa membaca.',
        ),
        hints: [t('Ingat lampu lalu lintas.'), undefined],
        tags: ['warna-semantik'],
      }),
      conceptStep({
        title: t('Jangan hanya andalkan warna', 'Aksesibilitas dan budaya warna'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'warna-plus-ikon-buta-warna' },
        alt: t('Kotak pesan dengan ikon centang dan tulisan, bukan warna saja.'),
        body: [
          rText(
            'Sebagian orang buta warna. Selalu tambahkan ikon dan tulisan. Arti warna juga bisa berbeda di setiap budaya.',
            'Jangan mengandalkan warna saja, karena orang yang buta warna sulit membedakannya. Selalu sertakan ikon dan teks. Arti warna juga berbeda antarbudaya.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Lampu lalu lintas untuk warna status'),
        same: [
          t(
            'Hijau, kuning, dan merah langsung memberi arti aman, hati-hati, dan berhenti.',
            'Hijau, kuning, dan merah langsung menyampaikan arti aman, hati-hati, dan berhenti atau bahaya.',
          ),
        ],
        different: [
          t(
            'Lampu lalu lintas punya urutan tetap. Pesan di layar butuh ikon dan tulisan.',
            'Pengendara buta warna masih terbantu posisi lampu yang tetap. Pesan di layar butuh ikon dan teks yang jelas.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'detektif-kontras',
        t(
          'Lihat di simulator: tanda centang dan silang menemani warna.',
          'Amati bagaimana tanda centang, tanda silang, dan teks mendampingi indikator warna di simulator Detektif Kontras.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a08-l05-q2',
          type: 'analogy',
          prompt: t(
            'Kotak isian yang salah hanya bergaris merah, tanpa ikon atau tulisan. Apa masalahnya?',
            'Kolom form yang salah hanya berubah garis tepinya menjadi merah, tanpa ikon dan tanpa pesan. Apa masalahnya?',
          ),
          choices: [
            {
              id: 'cb',
              label: t('Sebagian orang sulit membedakan warnanya', 'Orang buta warna tidak tahu yang salah'),
            },
            {
              id: 'fast',
              label: t('Halaman jadi lambat dibuka', 'Halaman jadi lebih lambat mengirim data'),
              explainWrong: t(
                'Mengganti warna garis tidak memperlambat halaman. Tambahkan tulisan yang menjelaskan masalahnya.',
                'Garis merah tidak memengaruhi kecepatan. Masalahnya ada pada keterbacaan status.',
              ),
            },
            {
              id: 'pretty',
              label: t('Warna merah terlalu menakutkan', 'Garis merah membuat tampilan terlalu ramai'),
              explainWrong: t(
                'Garisnya terlihat, tetapi warnanya bisa sulit dibedakan.',
                'Garis merah polos tidak membuat tampilan ramai. Masalahnya, statusnya tidak terbaca semua orang.',
              ),
            },
          ],
          answer: 'cb',
          explainCorrect: t(
            'Warna saja tidak cukup. Ikon dan tulisan membantu semua orang.',
            'Warna semantik perlu ikon dan teks singkat agar aksesibel bagi semua orang.',
          ),
          hints: [t('Ingat teman yang sulit membedakan warna.', 'Siapa yang tidak bisa membedakan merah dan hijau?')],
          tags: ['warna-semantik', 'ux'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a08-l05-q3',
          prompt: t(
            'Arti satu warna selalu sama di semua negara.',
            'Makna setiap warna selalu sama di seluruh budaya, tanpa pengecualian.',
          ),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru. Putih berarti suci di satu tempat, tetapi duka di tempat lain.',
            'Pernyataan itu keliru: putih berarti kesucian di banyak tempat, tetapi dipakai untuk berkabung di sebagian budaya.',
          ),
          explainWrong: t(
            'Arti warna bisa berbeda antarbudaya. Tanyakan dulu siapa yang akan melihatnya.',
            'Pertimbangkan siapa pembacanya dan konteks budayanya.',
          ),
          hints: [t('Ingat: tempat berbeda, kebiasaan berbeda.')],
          tags: ['warna-semantik'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l05-q4',
          type: 'limit',
          analogy: t('Lampu lalu lintas'),
          prompt: t(
            'Apa yang perlu ditambah di layar, tetapi tidak di lampu lalu lintas?',
            'Mengapa warna saja belum cukup untuk status di layar, padahal cukup untuk lampu lalu lintas?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'pos',
              label: t('Ikon dan tulisan', 'Lampu punya posisi tetap, layar butuh ikon dan teks'),
            },
            {
              id: 'mean',
              label: t('Hijau sebagai tanda aman', 'Hijau umumnya berarti aman dan merah berarti bahaya'),
              explainWrong: t(
                'Lampu lalu lintas juga memakai hijau sebagai tanda aman. Yang perlu ditambah hal lain.',
                'Itu kesamaan antara lampu lalu lintas dan warna semantik, bukan perbedaannya.',
              ),
            },
            {
              id: 'fast',
              label: t('Warna yang cepat dikenali', 'Warna membantu orang menangkap status dengan cepat'),
              explainWrong: t(
                'Lampu lalu lintas juga memakai warna yang cepat dikenali. Yang perlu ditambah hal lain.',
                'Itu juga kesamaannya, bukan perbedaannya.',
              ),
            },
          ],
          answer: 'pos',
          explainCorrect: t(
            'Lampu punya posisi atas, tengah, bawah. Layar tidak punya, jadi butuh ikon dan tulisan.',
            'Tanpa ikon atau teks, orang yang buta warna tidak punya petunjuk pengganti di form web.',
          ),
          hints: [t('Pengemudi buta warna masih melihat posisi lampu.')],
          tags: ['warna-semantik'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l05-q5',
          type: 'scenario',
          story: t(
            'Rani membuat aplikasi tabungan. Ia mau pesan "Berhasil" berwarna merah supaya serasi.',
            'Rani merancang aplikasi tabungan sekolah. Ia mempertimbangkan merah menyala atau biru tenang sebagai warna utama, dan ingin pesan "Berhasil" berwarna merah agar serasi.',
          ),
          prompt: t('Apa saran yang tepat untuk Rani?', 'Saran mana yang paling tepat untuk Rani?'),
          difficulty: 2,
          choices: [
            {
              id: 'fix',
              label: t('Hijau dan ikon centang', 'Utama biru, tanda berhasil hijau dengan centang'),
            },
            {
              id: 'red',
              label: t('Merah dan ikon centang', 'Merah untuk pesan "Berhasil" supaya serasi dengan warna utama'),
              explainWrong: t(
                'Merah berarti gagal atau bahaya. Pesan berhasil jadi membingungkan.',
                'Merah untuk pesan sukses bertentangan dengan kebiasaan warna semantik dan membingungkan.',
              ),
            },
            {
              id: 'none',
              label: t('Hijau tanpa ikon apa pun', 'Hapus ikon centang supaya tampilan lebih polos'),
              explainWrong: t(
                'Tambahkan centang agar artinya terbaca saat warna sulit dibedakan.',
                'Menghapus ikon merugikan orang yang buta warna.',
              ),
            },
          ],
          answer: 'fix',
          explainCorrect: t(
            'Hijau berarti berhasil, dan ikon centang membantu semua orang. Jangan menukar arti warna.',
            'Jangan menukar arti warna semantik: merah untuk gagal atau bahaya, hijau dengan ikon untuk berhasil.',
          ),
          hints: [t('Ingat lampu lalu lintas: hijau berarti jalan.', 'Pisahkan dua keputusan: warna utama dan warna status.')],
          tags: ['warna-semantik', 'ui'],
        }),
      ),
      qStep({
        id: 'a08-l05-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Apa yang wajib menemani warna status?'),
        difficulty: 1,
        template: 'Jangan mengandalkan warna saja untuk status; selalu sertakan ___ atau teks penjelasan.',
        bank: ['ikon', 'animasi', 'garis putus'],
        answer: ['ikon'],
        explainCorrect: t('Ikon dan teks menjaga status tetap terbaca, bahkan di tampilan hitam-putih.'),
        hints: [t('Tanda kecil yang menemani teks di samping warna.'), undefined],
        tags: ['warna-semantik', 'ux'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a08-l05-r1',
        prompt: t(
          'Warna apa yang biasa dipakai untuk "hati-hati"?',
          'Warna semantik apa yang biasa dipakai untuk status Warning?',
        ),
        choices: [
          { id: 'y', label: t('Kuning atau oranye') },
          {
            id: 'g',
            label: t('Hijau muda'),
            explainWrong: t(
              'Hijau berarti berhasil. Hati-hati memakai kuning atau oranye.',
              'Hijau dipakai untuk status sukses (Success).',
            ),
          },
          {
            id: 'b',
            label: t('Biru tua'),
            explainWrong: t(
              'Biru memberi keterangan. Hati-hati memakai kuning atau oranye.',
              'Biru dipakai untuk status Info, bukan Warning.',
            ),
          },
        ],
        answer: 'y',
        explainCorrect: t(
          'Kuning atau oranye berarti hati-hati, seperti lampu kuning di jalan.',
          'Kuning atau oranye menandai peringatan agar berhati-hati.',
        ),
        hints: [t('Ingat lampu kuning di jalan.')],
        tags: ['warna-semantik'],
      }),
      makeTf({
        id: 'a08-l05-r2',
        prompt: t(
          'Warna hijau saja sudah cukup jelas untuk semua orang.',
          'Warna hijau tanpa teks atau ikon centang sudah cukup jelas bagi semua orang, termasuk yang buta warna.',
        ),
        answer: false,
        explainCorrect: t(
          'Pernyataan itu keliru. Teman yang buta warna butuh ikon atau tulisan.',
          'Pernyataan itu keliru: ikon dan teks wajib ada agar status terbaca oleh orang yang buta warna.',
        ),
        explainWrong: t(
          'Sebagian orang buta warna merah-hijau. Mereka butuh ikon dan tulisan.',
          'Sebagian orang mengalami buta warna merah-hijau.',
        ),
        hints: [t('Ingat teman yang sulit membedakan hijau dan merah.')],
        tags: ['warna-semantik'],
      }),
    ],
    recap: t(
      'Hijau berhasil, merah gagal, kuning hati-hati, biru keterangan, selalu dengan ikon.',
      'Pilih warna merek sesuai kesan yang dicari. Padukan warna semantik dengan ikon dan teks.',
    ),
    companion: {
      talkPrompts: ['Apa yang membantu teman buta warna membedakan lampu lalu lintas?'],
      offlineActivity:
        'Cari 3 tombol atau pesan status di aplikasi HP. Cek apakah warnanya sudah ditemani ikon centang atau tanda seru.',
    },
  }),

  makeLesson({
    id: 'a08-l06',
    worldId: 'a08',
    title: 'Kontras agar terbaca',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan tulisan yang jelas dan yang terlalu pudar.',
      'Kamu bisa menerapkan standar kontras WCAG (4,5 : 1 untuk teks biasa, 3 : 1 untuk teks besar) dan mengujinya.',
    ),
    atWork: 'Kamu mengecek warna teks di tab DevTools sebelum rilis, supaya tombol tetap terbaca di bawah matahari.',
    estMinutes: 5,
    introducesTerms: ['kontras'],
    usesTerms: ['ui', 'ux', 'warna-semantik'],
    warmupFrom: 'a08-l05',
    steps: [
      storyStep('a08/kapur-papan.svg', [
        rText(
          'Kapur putih di papan tulis hitam terlihat jelas dari bangku belakang. Kapur kuning pucat di kertas putih hampir tak terlihat. Apa bedanya?',
          'Teks abu muda di latar putih tampak rapi di monitormu, tetapi sulit dibaca di bawah matahari. Kontras menentukan teks terbaca atau tidak.',
        ),
      ]),
      conceptStep({
        title: t('Beda terang dan gelap: kontras', 'Apa itu rasio kontras?'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'rasio-kontras-wcag' },
        alt: t(
          'Tulisan terbaca di latar berbeda, dan pudar di latar yang mirip.',
          'Perbandingan rasio kontras buruk 1,3 : 1 dengan kontras baik 6 : 1 dan 15 : 1.',
        ),
        body: [
          rJTerm('kontras', 'Kontras'),
          rJunior(
            ' mengukur seberapa beda warna huruf dan latarnya. Makin besar bedanya, makin jelas tulisannya.',
          ),
          rProTerm('kontras', 'Kontras'),
          rPro(
            ' mengukur selisih kecerahan teks dan latarnya, dari 1 : 1 (sama persis) sampai 21 : 1 (hitam di atas putih).',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a08-l06-q1',
          type: 'analogy',
          prompt: t(
            'Tulisan kuning cerah di tombol putih mirip apa?',
            'Teks kuning cerah di atas tombol putih mirip dengan situasi mana?',
          ),
          choices: [
            { id: 'bad', label: t('Kapur kuning di kertas putih', 'Kapur kuning muda di kertas putih') },
            {
              id: 'good',
              label: t('Kapur putih di papan hitam', 'Kapur putih di papan tulis hitam'),
              explainWrong: t(
                'Kapur putih di papan hitam sangat mudah dilihat. Itu contoh kontras yang kuat.',
                'Kapur putih di papan hitam punya kontras sangat tinggi, sekitar 21 : 1.',
              ),
            },
            {
              id: 'bold',
              label: t('Spidol hitam di kertas putih', 'Spidol hitam pekat di kertas putih'),
              explainWrong: t(
                'Hitam di atas putih mudah dibaca. Itu juga kontras yang kuat.',
                'Hitam di atas putih sangat mudah dibaca.',
              ),
            },
          ],
          answer: 'bad',
          explainCorrect: t(
            'Kuning cerah dan putih sama-sama terang. Jadi tulisannya hampir menghilang.',
            'Kuning cerah dan putih sama-sama terang, jadi rasionya rendah dan teks sulit dibaca.',
          ),
          hints: [t('Ingat kapur kuning pucat di kertas putih.')],
          tags: ['kontras'],
        }),
      ),
      conceptStep({
        title: t('Standar WCAG: 4,5 : 1 dan 3 : 1'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'standar-wcag-aa' },
        alt: t('Standar WCAG minimal 4,5 : 1 untuk teks biasa dan 3 : 1 untuk teks besar.'),
        modes: ['pro'],
        body: [
          rPro(
            'WCAG AA adalah pedoman aksesibilitas web. Rasio kontras minimal 4,5 : 1 untuk teks biasa dan 3 : 1 untuk teks besar.',
          ),
        ],
      }),
      conceptStep({
        title: t('Jangan tebak dengan mata saja', 'Menguji kontras sebelum rilis'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'alat-cek-kontras' },
        alt: t('Alat cek kontras yang menghitung seberapa jelas teks terbaca.'),
        body: [
          rText(
            'Periksa warna tulisan dengan alat cek kontras. Jangan memakai tulisan putih di latar kuning cerah.',
            'Alat seperti WebAIM Contrast Checker atau DevTools browser memastikan teks aman dibaca. Cek rasionya sebelum halaman rilis.',
          ),
        ],
      }),
      simStep(
        'detektif-kontras',
        t(
          'Ketuk tiga kartu contoh dan cari yang mudah dibaca.',
          'Uji tiga pasangan warna teks dan latar di simulator Detektif Kontras, lalu cari yang lolos WCAG AA.',
        ),
      ),
      limitStep({
        analogy: t('Kapur di papan tulis untuk rasio kontras'),
        same: [
          t(
            'Tulisan dan papan butuh beda terang-gelap yang tegas.',
            'Tulisan dan papan belakangnya butuh beda terang-gelap yang tegas agar terbaca.',
          ),
        ],
        different: [
          t(
            'Layar HP bisa redup di bawah matahari. Tulisan pudar jadi hilang.',
            'Di layar HP, rasio 4,5 : 1 dipakai karena layar bisa redup di bawah matahari dan dibaca mata yang lelah.',
          ),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeTf({
          id: 'a08-l06-q2',
          prompt: t(
            'Tulisan dan latar yang warnanya sama persis membuat tulisan tidak terlihat.',
            'Rasio kontras 1 : 1 berarti warna teks dan latar persis sama, jadi teks tidak terlihat.',
          ),
          answer: true,
          explainCorrect: t(
            'Warna yang sama persis saling menyatu. Seperti kapur putih di papan putih.',
            'Rasio 1 : 1 berarti tanpa perbedaan, dan 21 : 1 berarti hitam di atas putih.',
          ),
          explainWrong: t(
            'Pernyataan itu benar. Tulisan yang warnanya sama dengan latar menghilang.',
            'Pernyataan itu benar: rasio kontras berjalan dari 1 : 1 (identik) sampai 21 : 1 (maksimal).',
          ),
          hints: [t('Ingat kapur putih di papan putih.')],
          tags: ['kontras'],
        }),
      ),
      qStep({
        id: 'a08-l06-q3',
        type: 'sort',
        prompt: t(
          'Kelompokkan tulisan ini: jelas atau pudar?',
          'Kelompokkan pasangan teks dan latar ini sebagai lolos atau gagal kontras.',
        ),
        difficulty: 2,
        items: [
          {
            id: 'c1',
            label: t('Tulisan putih di latar biru gelap', 'Teks putih (#FFFFFF) di latar biru gelap (#1F2340)'),
          },
          { id: 'c2', label: t('Tulisan abu muda di latar abu pucat', 'Teks abu muda di latar abu pucat') },
          { id: 'c3', label: t('Tulisan biru tua di latar putih', 'Teks biru tua di latar putih') },
          { id: 'c4', label: t('Tulisan putih di latar kuning cerah', 'Teks putih di latar kuning cerah') },
        ],
        bins: [
          { id: 'pass', label: t('Jelas dibaca', 'Lolos kontras'), icon: 'search' },
          { id: 'fail', label: t('Terlalu pudar', 'Gagal kontras'), icon: 'bug' },
        ],
        answer: { c1: 'pass', c2: 'fail', c3: 'pass', c4: 'fail' },
        explainCorrect: t(
          'Tulisan gelap di latar terang mudah terbaca. Tulisan terang di latar terang pudar.',
          'Pasangan dengan selisih terang-gelap besar lolos. Pasangan yang sama-sama terang atau sama-sama gelap gagal.',
        ),
        hints: [t('Bandingkan terang tulisan dan terang latarnya.'), undefined],
        tags: ['kontras', 'ui'],
      }),
      qStep(
        makeMcq({
          id: 'a08-l06-q5',
          type: 'scenario',
          story: t(
            'Sari membuat tombol "Daftar" berwarna oranye terang. Tulisannya putih, dan tulisan itu sulit dibaca.',
            'Sari membuat tombol "Daftar Sekarang" oranye terang (#FFB400) dengan teks putih. Contrast checker menunjukkan rasio 1,8 : 1.',
          ),
          prompt: t(
            'Apa cara tercepat supaya tulisannya terbaca?',
            'Perubahan tercepat mana yang membuat tombol tetap hangat dan lolos rasio 4,5 : 1?',
          ),
          difficulty: 2,
          choices: [
            { id: 'dark', label: t('Ganti tulisan menjadi warna gelap', 'Ganti teks menjadi warna gelap') },
            {
              id: 'thin',
              label: t('Besarkan ukuran tulisannya saja', 'Besarkan teks menjadi 24 px'),
              explainWrong: t(
                'Tulisan yang lebih besar tetap pudar di latar terang. Warnanya yang perlu berubah.',
                'Ukuran lebih besar tidak mengubah rasio kontras. Warna teks atau latarnya yang harus berubah.',
              ),
            },
            {
              id: 'same',
              label: t('Ganti tombol menjadi kuning muda', 'Ganti latar menjadi kuning muda'),
              explainWrong: t(
                'Kuning muda sama terangnya dengan putih. Tulisan putih tetap pudar.',
                'Latar kuning muda hampir sama terangnya dengan teks putih, jadi rasionya tetap rendah.',
              ),
            },
          ],
          answer: 'dark',
          explainCorrect: t(
            'Tulisan gelap di warna terang mudah dibaca. Seperti spidol hitam di kertas kuning.',
            'Teks gelap di atas oranye terang menaikkan rasio kontras jauh di atas 4,5 : 1 tanpa mengubah warna tombol.',
          ),
          hints: [
            t('Ingat: tulisan harus beda jelas dari latarnya.', 'Yang diubah cukup satu: warna teks atau warna latar.'),
          ],
          tags: ['kontras', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l06-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Membaca papan tulis di ruang kelas'),
          prompt: t('Mengapa melihat tulisan di monitor kantor saja belum cukup untuk menilai keterbacaan?'),
          difficulty: 2,
          choices: [
            { id: 'sun', label: t('Teks kurang kontras sulit dibaca di luar') },
            {
              id: 'diff',
              label: t('Beda terang dan gelap membantu mata membaca lebih cepat'),
              explainWrong: t('Itu kesamaan dasar di kelas maupun di layar, bukan alasannya.'),
            },
            {
              id: 'big',
              label: t('Tulisan terlalu kecil sulit dibaca dari jauh'),
              explainWrong: t('Itu juga kesamaan di papan tulis dan layar, bukan alasannya.'),
            },
          ],
          answer: 'sun',
          explainCorrect: t('Rasio kontras mengukur beda terang teks dan latar. Cahaya sekitar juga memengaruhi keterbacaan.'),
          hints: [t('Pikirkan layar HP yang dibaca di luar ruangan.')],
          tags: ['kontras', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l06-q6',
          modes: ['pro'],
          prompt: t('Berapa rasio kontras minimal WCAG AA untuk teks biasa dan teks besar?'),
          difficulty: 2,
          choices: [
            { id: 'w', label: t('Teks biasa 4,5 : 1, teks besar 3 : 1') },
            {
              id: 'w2',
              label: t('Teks biasa 3 : 1, teks besar 4,5 : 1'),
              explainWrong: t('Urutannya terbalik. Teks besar lebih mudah dibaca, jadi syaratnya lebih longgar.'),
            },
            {
              id: 'w3',
              label: t('Teks biasa 7 : 1, teks besar 4,5 : 1'),
              explainWrong: t('Rasio 7 : 1 adalah level AAA yang lebih ketat. AA cukup 4,5 : 1.'),
            },
          ],
          answer: 'w',
          explainCorrect: t('Rasio 4,5 : 1 untuk teks biasa dan 3 : 1 untuk judul atau teks besar.'),
          hints: [t('Teks besar lebih mudah dibaca, jadi syaratnya lebih longgar.')],
          tags: ['kontras'],
        }),
      ),
      qStep({
        id: 'a08-l06-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Apa nama pedoman aksesibilitas web yang menetapkan kontras minimal 4,5 : 1? Tulis dengan 4 huruf.'),
        difficulty: 2,
        accept: ['wcag', 'wcag aa'],
        explainCorrect: t('WCAG menjadi acuan global aksesibilitas web.'),
        hints: [t('Namanya diawali huruf W.'), undefined],
        tags: ['kontras'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a08-l06-r1',
        prompt: t(
          'Mana pasangan yang paling mudah dibaca?',
          'Berapa rasio kontras maksimal, yaitu hitam di atas putih bersih?',
        ),
        choices: [
          { id: '21', label: t('Hitam di atas putih', '21 : 1') },
          {
            id: '1',
            label: t('Putih di atas putih', '1 : 1'),
            explainWrong: t(
              'Putih di atas putih tidak terlihat. Warnanya sama persis.',
              'Rasio 1 : 1 terjadi saat warna teks dan latar sama persis.',
            ),
          },
          {
            id: 'n',
            label: t('Kuning muda di atas putih', '10 : 1'),
            explainWrong: t(
              'Kuning muda dan putih sama-sama terang. Tulisannya pudar.',
              'Rasio tertinggi adalah 21 : 1, bukan 10 : 1.',
            ),
          },
        ],
        answer: '21',
        explainCorrect: t(
          'Hitam di atas putih sangat mudah dibaca. Seperti tulisan spidol di kertas.',
          'Rentang rasio kontras berjalan dari 1 : 1 sampai 21 : 1.',
        ),
        hints: [t('Ingat spidol hitam di kertas putih.')],
        tags: ['kontras'],
      }),
      makeTf({
        id: 'a08-l06-r2',
        prompt: t(
          'Tulisan perlu cukup beda dari latarnya supaya mudah dibaca.',
          'Untuk teks ukuran biasa, standar WCAG menetapkan rasio kontras minimal 4,5 : 1.',
        ),
        answer: true,
        explainCorrect: t(
          'Beda terang yang besar membuat tulisan mudah dilihat. Seperti kapur putih di papan hitam.',
          'Rasio 4,5 : 1 adalah batas minimal agar teks biasa terbaca nyaman.',
        ),
        explainWrong: t(
          'Pernyataan itu benar. Tulisan yang mirip warna latarnya sulit dibaca.',
          'Pernyataan itu benar: 4,5 : 1 adalah batas minimal untuk teks biasa.',
        ),
        hints: [t('Ingat kapur putih di papan hitam.')],
        tags: ['kontras'],
      }),
    ],
    recap: t(
      'Tulisan harus beda jelas dari latarnya, dan cek dengan alat kontras.',
      'Jaga rasio kontras minimal 4,5 : 1 (teks biasa) dan 3 : 1 (teks besar). Cek lewat DevTools.',
    ),
    companion: {
      talkPrompts: ['Pernahkah kamu melihat tulisan yang warnanya hampir sama dengan latar?'],
      offlineActivity:
        'Tulis satu kalimat dengan pensil kuning di kertas putih, lalu dengan spidol hitam. Bandingkan mana yang terbaca dari seberang ruangan.',
    },
  }),

  makeLesson({
    id: 'a08-l07',
    worldId: 'a08',
    title: 'Menulis warna dalam kode',
    modes: ['pro'],
    objective: t('Kamu bisa menulis warna dengan HEX, RGB, RGBA, dan HSL serta mengenali nilai RGB yang dibatasi browser.'),
    atWork: 'Kamu menyalin kode HEX dari file desain ke CSS dan membuat overlay semi-transparan dengan RGBA.',
    estMinutes: 5,
    introducesTerms: ['hex-rgb'],
    usesTerms: ['ui', 'css', 'hsl', 'kontras'],
    warmupFrom: 'a08-l06',
    steps: [
      storyStep('a08/mesin-cat.svg', [
        rText(
          'Toko cat tidak menerima pesanan "biru yang agak ceria". Mesin pencampur memakai resep angka pasti per tetes, jadi warnanya sama di toko mana pun.',
        ),
      ]),
      conceptStep({
        title: t('HEX dan RGB'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'format-hex-dan-rgb' },
        alt: t('Kode HEX #E4572E dengan R=E4, G=57, B=2E, dan rgb(228, 87, 46).'),
        code: {
          lang: 'css',
          code: 'color: #E4572E;          /* Merah=E4, Hijau=57, Biru=2E */\ncolor: rgb(228, 87, 46); /* Browser membatasi tiap angka ke 0–255 */',
        },
        body: [
          rTerm('hex-rgb', 'HEX dan RGB'),
          rText(' adalah dua cara menulis kadar merah, hijau, dan biru. '),
          rBold('HEX'),
          rText(' paling umum: 6 digit, 2 untuk merah, 2 untuk hijau, 2 untuk biru. '),
          rBold('RGB'),
          rText(' memakai tiga angka. Browser membatasi setiap angka ke rentang 0–255.'),
        ],
      }),
      qStep({
        id: 'a08-l07-q6',
        type: 'type',
        prompt: t('Bila isi rgb() ditulis tanpa persen, berapa angka tertinggi yang dipakai browser untuk tiap warna dasar?'),
        difficulty: 1,
        accept: ['255'],
        explainCorrect: t('Browser membatasi angka tiap warna dasar ke rentang 0–255. Angka yang lebih besar menjadi 255.'),
        hints: [t('Baca komentar di blok kode tadi.'), undefined],
        tags: ['hex-rgb'],
      }),
      conceptStep({
        title: t('RGBA dan HSL'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'format-rgba-dan-hsl' },
        alt: t('Contoh rgba(228, 87, 46, 0.5) dengan alpha 0.5 dan hsl(14, 77%, 54%).'),
        code: {
          lang: 'css',
          code: 'background: rgba(228, 87, 46, 0.5); /* Alpha 0–1 */\nbackground: hsl(14, 77%, 54%);      /* Hue, Sat, Light */',
        },
        body: [
          rBold('RGBA'),
          rText(' menambahkan alpha. Nilai 0 berarti bening dan 1 berarti padat. Browser membatasi alpha ke rentang itu. '),
          rTerm('hsl', 'HSL'),
          rText(' paling mudah dibaca manusia untuk membuat warna lebih terang atau lebih gelap.'),
        ],
      }),
      conceptStep({
        title: t('Memilih format yang tepat'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'kapan-hex-rgba-hsl' },
        alt: t('Pakai HEX untuk palet statis, RGBA untuk overlay transparan, HSL untuk varian dinamis.'),
        body: [
          rText('Pakai '),
          rBold('HEX'),
          rText(' untuk menyalin kode palet dari file desain. Pakai '),
          rBold('RGBA'),
          rText(' untuk bayangan dan overlay semi-transparan. Pakai '),
          rBold('HSL'),
          rText(' untuk menyusun skala terang-gelap warna.'),
        ],
      }),
      simStep(
        'detektif-kontras',
        t('Amati kode HEX yang dipakai tiap kartu di simulator Detektif Kontras.'),
      ),
      limitStep({
        analogy: t('Resep tetes cat di mesin pencampur'),
        same: [t('Angka terukur membuat warna yang sama bisa dibuat ulang.')],
        different: [
          t(
            'Cat fisik makin gelap saat dicampur. Di layar, rgb(255, 255, 255) menyalakan semua cahaya dan menghasilkan putih.',
          ),
        ],
        riskyAnalogy: false,
      }),
      qStep({
        id: 'a08-l07-q1',
        type: 'match',
        prompt: t('Pasangkan contoh kode warna CSS dengan format dan fungsinya.'),
        difficulty: 2,
        left: [
          { id: 'hx', label: t('#E4572E') },
          { id: 'rg', label: t('rgb(228, 87, 46)') },
          { id: 'ra', label: t('rgba(228, 87, 46, 0.5)') },
          { id: 'hs', label: t('hsl(14, 77%, 54%)') },
        ],
        right: [
          { id: 'rhx', label: t('HEX: 6 digit, paling ringkas dan umum') },
          { id: 'rrg', label: t('RGB: merah, hijau, biru masing-masing 0–255') },
          { id: 'rra', label: t('RGBA: RGB ditambah transparansi alpha 0–1') },
          { id: 'rhs', label: t('HSL: paling mudah diubah terang-gelapnya') },
        ],
        answer: { hx: 'rhx', rg: 'rrg', ra: 'rra', hs: 'rhs' },
        explainCorrect: t('Keempat format ini sering ditemui di file desain dan file CSS.'),
        hints: [t('Cari format yang punya angka keempat.'), undefined],
        tags: ['hex-rgb', 'hsl'],
      }),
      qStep({
        id: 'a08-l07-q2',
        type: 'spotbug',
        prompt: t('Ketuk baris yang nilai merahnya dibatasi browser ke 255.'),
        difficulty: 2,
        lines: [
          '.kartu { color: #1F2340; }',
          '.overlay { background: rgba(0, 0, 0, 0.6); }',
          '.tombol { background: rgb(350, 90, 40); }',
        ],
        answer: [3],
        explainCorrect: t('Baris 3 memakai 350 untuk merah. Browser membatasinya menjadi 255, jadi hasilnya rgb(255, 90, 40).'),
        hints: [t('Cari angka merah yang melewati rentang 0–255.'), undefined],
        tags: ['hex-rgb', 'css'],
      }),
      qStep(
        makeMcq({
          id: 'a08-l07-q3',
          type: 'limit',
          analogy: t('Mesin pencampur cat fisik dan RGB layar'),
          prompt: t('Warna apa yang muncul di layar untuk rgb(255, 255, 255)?'),
          difficulty: 2,
          choices: [
            { id: 'wht', label: t('Putih terang, karena semua cahaya menyala penuh') },
            {
              id: 'blk',
              label: t('Hitam pekat, karena semua warna bercampur'),
              explainWrong: t('Hitam adalah rgb(0, 0, 0), saat semua cahaya mati.'),
            },
            {
              id: 'red',
              label: t('Abu-abu terang, karena warnanya saling mencampur'),
              explainWrong: t('Abu-abu muncul bila ketiga angka sama tetapi lebih kecil, misalnya 128.'),
            },
          ],
          answer: 'wht',
          explainCorrect: t(
            'RGB mencampur cahaya. Saat merah, hijau, dan biru menyala maksimal (255), hasilnya putih.',
          ),
          hints: [t('Cahaya yang ditambah makin terang.')],
          tags: ['hex-rgb'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l07-q4',
          type: 'scenario',
          story: t(
            'Dimas membuat lapisan di belakang jendela modal agar setengah tembus pandang di atas halaman utama.',
          ),
          prompt: t('Kode warna mana yang paling tepat untuk lapisan overlay itu?'),
          difficulty: 2,
          choices: [
            { id: 'rgba', label: t('rgba(31, 35, 64, 0.5)') },
            {
              id: 'rgb',
              label: t('rgb(31, 35, 64)'),
              explainWrong: t('Tanpa alpha, warna tampil padat 100% dan tidak tembus pandang.'),
            },
            {
              id: 'a5',
              label: t('rgba(31, 35, 64, 255)'),
              explainWrong: t('Browser membatasi alpha 255 menjadi 1 dan menampilkan warna padat. Untuk setengah tembus pandang, tulis 0.5.'),
            },
          ],
          answer: 'rgba',
          explainCorrect: t('Nilai keempat (0.5) mengatur kepekatan 50%, jadi isi di belakang masih terlihat.'),
          hints: [t('Nilai keempat mengatur tembus pandang.')],
          tags: ['hex-rgb', 'css'],
        }),
      ),
      qStep({
        id: 'a08-l07-q5',
        type: 'fill',
        prompt: t('Dua digit tengah pada #E4572E mengatur warna dasar yang mana?'),
        difficulty: 2,
        template: 'Pada kode #E4572E, E4 untuk merah, 57 untuk ___, dan 2E untuk biru.',
        bank: ['hijau', 'kuning', 'hitam'],
        answer: ['hijau'],
        explainCorrect: t('Urutan pasangan digit HEX selalu merah, hijau, biru (RGB).'),
        hints: [t('Urutannya sama dengan huruf R, G, B.'), undefined],
        tags: ['hex-rgb'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a08-l07-r1',
        prompt: t('Pada rgba(0, 0, 0, 0.2), angka 0.2 menunjukkan apa?'),
        choices: [
          { id: 'al', label: t('Alpha, tingkat tembus pandang') },
          {
            id: 'hue',
            label: t('Sudut warna merah'),
            explainWrong: t('Angka keempat di rgba adalah alpha untuk transparansi.'),
          },
        ],
        answer: 'al',
        explainCorrect: t('Alpha 0 berarti bening, dan 1 berarti pekat penuh.'),
        hints: [t('Angka keempat mengatur tembus pandang.')],
        tags: ['hex-rgb'],
      }),
      makeTf({
        id: 'a08-l07-r2',
        prompt: t('Kode #E4572E terdiri atas enam digit: dua untuk merah, dua untuk hijau, dan dua untuk biru.'),
        answer: true,
        explainCorrect: t('Format #RRGGBB membagi pasangan digit sesuai urutan merah, hijau, biru.'),
        explainWrong: t('Pernyataan itu benar: HEX memakai enam digit dalam tiga pasangan.'),
        hints: [t('Hitung pasangan digit setelah tanda #.')],
        tags: ['hex-rgb'],
      }),
    ],
    recap: t(
      'Baca #RRGGBB pada HEX dan 0–255 pada RGB. Pakai alpha di RGBA untuk transparansi dan HSL untuk varian terang-gelap.',
    ),
  }),

  makeLesson({
    id: 'a08-l08',
    worldId: 'a08',
    title: 'Huruf yang enak dibaca',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa memilih jenis huruf dan jarak baris yang nyaman di mata.',
      'Kamu bisa membedakan 4 jenis huruf dan menerapkan aturan baca nyaman: 16px, line-height 1.5–1.7, 45–75 karakter.',
    ),
    atWork: 'Kamu menentukan font, ukuran, dan lebar baris artikel blog supaya nyaman dibaca di HP.',
    estMinutes: 6,
    introducesTerms: ['tipografi'],
    usesTerms: ['ui', 'ux', 'hierarki', 'kontras'],
    warmupFrom: 'a08-l07',
    steps: [
      storyStep('a08/buku-nyaman.svg', [
        rText(
          'Buku yang barisnya mepet dan hurufnya penuh hiasan membuat mata pusing. Buku yang barisnya lega terasa ringan. Apa rahasianya?',
          'Sebagian besar isi halaman web adalah teks. Menata huruf berarti membereskan separuh desain.',
        ),
      ]),
      conceptStep({
        title: t('Lihat bentuk huruf', 'Jenis-jenis huruf'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'empat-jenis-huruf' },
        alt: t('Huruf n berkaki kecil dan huruf n berujung polos.'),
        body: [
          rJTerm('tipografi', 'Tipografi'),
          rJunior(
            ' adalah cara memilih dan menata huruf. Lihat kaki kecil di ujung huruf. Ada juga ujung yang polos. Huruf sama lebar merapikan angka. Huruf hias cocok untuk judul.',
          ),
          rProTerm('tipografi', 'Tipografi'),
          rPro(' adalah seni menata huruf. Ada 4 jenis huruf. '),
          rProBold('Serif'),
          rPro(' (berkaki, klasik), '),
          rProBold('Sans-serif'),
          rPro(' (bersih di layar), '),
          rProBold('Monospace'),
          rPro(' (lebar sama, untuk kode), dan '),
          rProBold('Display'),
          rPro(' (hias, untuk judul besar).'),
        ],
      }),
      qStep({
        id: 'a08-l08-q1',
        type: 'match',
        prompt: t(
          'Pasangkan jenis huruf dengan kegunaannya.',
          'Pasangkan keempat jenis huruf dengan kegunaan terbaiknya di web.',
        ),
        difficulty: 2,
        left: [
          { id: 'se', label: t('Huruf berkaki', 'Serif (kaki kecil di ujung)') },
          { id: 'sa', label: t('Huruf tanpa kaki', 'Sans-serif (tanpa kaki, bersih)') },
          { id: 'mo', label: t('Huruf sama lebar', 'Monospace (semua huruf selebar sama)') },
          { id: 'di', label: t('Huruf hias', 'Display (huruf hias penuh karakter)') },
        ],
        right: [
          { id: 'rse', label: t('Kesan klasik dan resmi', 'Kesan klasik dan resmi, cocok untuk judul atau majalah') },
          { id: 'rsa', label: t('Tulisan paragraf di layar', 'Teks paragraf dan tampilan layar agar mudah dibaca') },
          { id: 'rmo', label: t('Angka pada struk', 'Potongan kode dan angka sejajar pada tabel') },
          { id: 'rdi', label: t('Judul besar atau poster', 'Judul besar atau poster, bukan paragraf panjang') },
        ],
        answer: { se: 'rse', sa: 'rsa', mo: 'rmo', di: 'rdi' },
        explainCorrect: t(
          'Setiap jenis huruf punya tugas sendiri. Pilih yang cocok untuk tulisanmu.',
          'Keluarga huruf yang tepat menentukan suasana dan kenyamanan baca.',
        ),
        hints: [t('Ingat huruf mana yang cocok untuk judul poster.'), undefined],
        tags: ['tipografi'],
      }),
      conceptStep({
        title: t('Aturan nyaman membaca', 'Ukuran, jarak baris, dan panjang baris'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'aturan-baca-nyaman' },
        code: { lang: 'css', code: 'article { max-width: 65ch; line-height: 1.5; }' },
        alt: t('Huruf cukup besar, jarak baris lega, dan baris tidak terlalu panjang.'),
        body: [
          rText(
            'Huruf isi harus cukup besar. Jarak antarbaris dibuat lega. Baris jangan terlalu panjang.',
            'Jaga teks isi minimal 16px (1rem) dengan line-height 1.5–1.7. Panjang baris 45–75 karakter dan rata kiri membuat paragraf nyaman. Judul memakai line-height 1.1–1.3.',
          ),
        ],
      }),
      conceptStep({
        title: t('Memasangkan huruf dengan aman'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'memasangkan-huruf' },
        alt: t('Maksimal 2 keluarga huruf: satu keluarga, atau judul serif dengan isi sans-serif.'),
        modes: ['pro'],
        body: [
          rPro(
            'Batasi maksimal 2 keluarga huruf. Pakai 1 keluarga dan bedakan ketebalannya, atau padukan judul Serif atau Display dengan isi Sans-serif.',
          ),
        ],
      }),
      simStep(
        'detektif-kontras',
        t(
          'Lihat tulisan di simulator: warna gelap lembut dan huruf jelas mudah dibaca.',
          'Amati bagaimana kontras tinggi dan abu gelap membuat teks nyaman dibaca di simulator.',
        ),
      ),
      limitStep({
        analogy: t('Buku cetak dan huruf di layar'),
        same: [
          t(
            'Buku dan layar sama-sama butuh huruf besar dan baris lega.',
            'Ukuran huruf, jarak baris, dan panjang baris yang pas menjaga mata tidak lelah.',
          ),
        ],
        different: [
          t(
            'Di layar kecil, baris rata kiri lebih nyaman dibaca.',
            'Buku cetak sering memakai rata kanan-kiri (justify). Di layar web, rata kiri lebih aman agar spasi tidak bolong.',
          ),
        ],
        riskyAnalogy: true,
      }),
      qStep(
        makeMcq({
          id: 'a08-l08-q2',
          type: 'analogy',
          prompt: t(
            'Mengapa huruf hias sulit dibaca dalam cerita panjang?',
            'Mengapa huruf Display tidak cocok untuk paragraf cerita 500 kata?',
          ),
          choices: [
            {
              id: 'hard',
              label: t('Hiasannya membuat mata cepat lelah', 'Hiasannya melelahkan mata kalau dibaca terus-menerus'),
            },
            {
              id: 'size',
              label: t('Huruf hias hanya boleh dipakai sekali', 'Huruf Display dilarang dipakai untuk judul poster besar'),
              explainWrong: t(
                'Huruf hias bisa dipakai untuk judul pendek.',
                'Huruf Display justru paling pas untuk judul besar yang singkat.',
              ),
            },
            {
              id: 'css',
              label: t('Huruf hias terlalu kecil untuk dibaca', 'Huruf Display membuat halaman terlalu berat dimuat'),
              explainWrong: t(
                'Ukuran huruf bisa diubah. Perhatikan bentuknya.',
                'Berat file memang perlu dijaga, tetapi masalah utamanya keterbacaan paragraf panjang.',
              ),
            },
          ],
          answer: 'hard',
          explainCorrect: t(
            'Huruf hias cukup untuk judul besar. Cerita panjang butuh huruf yang bersih.',
            'Hiasan huruf bisa memperlambat pembaca. Pilih bentuk sederhana untuk cerita panjang.',
          ),
          hints: [t('Ingat buku yang hurufnya penuh hiasan.', 'Bayangkan membaca 500 kata dengan huruf hias.')],
          tags: ['tipografi', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l08-q4',
          type: 'limit',
          analogy: t('Tata letak buku dan majalah kertas'),
          prompt: t(
            'Mengapa paragraf di layar HP sebaiknya rata kiri?',
            'Mengapa rata kanan-kiri (justify) dari buku cetak sebaiknya dihindari pada paragraf web di layar sempit?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'gap',
              label: t('Jarak antarkata tetap rapi', 'Spasi bolong-bolong di tengah baris memutus ritme baca'),
            },
            {
              id: 'lh',
              label: t('Jarak antarbaris perlu lega', 'Jarak antarbaris perlu lega, sekitar 1,5 kali ukuran huruf'),
              explainWrong: t(
                'Jarak baris lega berlaku di buku dan di layar. Itu bukan alasan rata kiri.',
                'Jarak antarbaris yang lega berlaku di buku dan web, jadi itu kesamaan.',
              ),
            },
            {
              id: 'dark',
              label: t('Huruf gelap lebih mudah dibaca', 'Huruf gelap di latar terang tetap mudah dibaca'),
              explainWrong: t(
                'Huruf gelap di latar terang berlaku di buku dan di layar. Itu bukan alasan rata kiri.',
                'Itu juga kesamaan prinsip keterbacaan.',
              ),
            },
          ],
          answer: 'gap',
          explainCorrect: t(
            'Rata kiri membuat jarak antarkata sama. Bacaan jadi mengalir.',
            'Rata kiri menjaga jarak antarkata tetap seragam di layar HP maupun laptop.',
          ),
          hints: [t('Bayangkan baris yang spasinya bolong-bolong.')],
          tags: ['tipografi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l08-q5',
          type: 'scenario',
          story: t(
            'Blog Raka memakai huruf sangat kecil. Barisnya mepet dan membentang selebar layar.',
            'Teks artikel blog Raka memakai ukuran 12px dengan line-height 1.0 dan warna hitam #000. Barisnya membentang 140 karakter selebar monitor.',
          ),
          prompt: t('Perbaikan apa yang paling tepat?', 'Paket perbaikan tipografi mana yang paling tepat?'),
          difficulty: 2,
          choices: [
            {
              id: 'fix',
              label: t('Huruf besar, baris lega, dan baris pendek', 'Isi 16px, line-height 1.5, baris 65 karakter'),
            },
            {
              id: 'disp',
              label: t('Pakai huruf hias untuk seluruh cerita', 'Ganti semua huruf artikel dengan huruf Display berkaki melingkar'),
              explainWrong: t(
                'Huruf hias di cerita panjang melelahkan mata. Blog butuh huruf yang bersih.',
                'Huruf hias Display di paragraf panjang justru makin melelahkan mata.',
              ),
            },
            {
              id: 'tight',
              label: t('Rapatkan baris supaya muat lebih banyak', 'Turunkan line-height ke 0.8 agar lebih banyak baris muat satu layar'),
              explainWrong: t(
                'Baris yang terlalu rapat membuat mata salah pindah baris. Baris perlu lega.',
                'Jarak baris yang terlalu rapat membuat pembaca sering salah pindah baris.',
              ),
            },
          ],
          answer: 'fix',
          explainCorrect: t(
            'Huruf besar, baris lega, dan baris pendek membuat blog nyaman dibaca.',
            'Ukuran 16px, line-height 1.6, abu gelap lembut, dan lebar 65ch membuat blog Raka nyaman dibaca.',
          ),
          hints: [t('Ingat buku yang nyaman dibaca.', 'Perbaiki tiga hal: ukuran, jarak baris, panjang baris.')],
          tags: ['tipografi', 'ux'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a08-l08-q3',
          modes: ['pro'],
          prompt: t('Memakai lima jenis huruf berbeda di satu halaman membuat tampilan lebih rapi dan tepercaya.'),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru: batasnya maksimal 2 keluarga huruf. Terlalu banyak jenis huruf tampak berantakan.',
          ),
          explainWrong: t('Batasi 1 sampai 2 keluarga huruf agar halaman tetap konsisten.'),
          hints: [t('Ingat batas maksimal keluarga huruf.')],
          tags: ['tipografi', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l08-q6',
          modes: ['pro'],
          prompt: t('Berapa jumlah keluarga huruf maksimal yang dianjurkan dalam satu desain web?'),
          difficulty: 1,
          choices: [
            { id: 'two', label: t('Maksimal 2 keluarga huruf, atau cukup 1') },
            {
              id: 'six',
              label: t('Maksimal 4 keluarga huruf, satu untuk tiap jenis'),
              explainWrong: t('Empat keluarga masih terlalu banyak dan membuat halaman terlihat kacau.'),
            },
            {
              id: 'ten',
              label: t('Sebanyak yang dibutuhkan setiap bagian halaman'),
              explainWrong: t('Huruf yang konsisten adalah kunci keterbacaan.'),
            },
          ],
          answer: 'two',
          explainCorrect: t(
            'Satu keluarga (bedakan bold dan regular) atau paling banyak dua (judul dan isi) sudah cukup.',
          ),
          hints: [t('Satu keluarga bisa dibedakan lewat ketebalan.')],
          tags: ['tipografi'],
        }),
      ),
      qStep({
        id: 'a08-l08-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Berapa batas bawah line-height untuk paragraf yang nyaman?'),
        difficulty: 2,
        template: 'Untuk paragraf bacaan panjang, atur line-height antara ___ sampai 1.7.',
        bank: ['1.5', '0.9', '4.0'],
        answer: ['1.5'],
        explainCorrect: t('Rentang 1.5 sampai 1.7 memberi celah antarbaris yang pas bagi mata.'),
        hints: [t('Baris perlu lebih lega dari 1 kali ukuran huruf.'), undefined],
        tags: ['tipografi', 'css'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a08-l08-r1',
        prompt: t(
          'Pada struk, angka harus berjajar rapi. Huruf mana yang cocok?',
          'Keluarga huruf mana yang semua karakternya selebar sama, cocok untuk kode dan angka tabel?',
        ),
        choices: [
          { id: 'mo', label: t('Huruf sama lebar', 'Monospace') },
          {
            id: 'se',
            label: t('Huruf berkaki', 'Serif'),
            explainWrong: t(
              'Kaki huruf menunjukkan bentuk ujungnya. Lihat juga lebar tiap angka.',
              'Serif punya kaki hias di ujung huruf dengan lebar yang berbeda-beda.',
            ),
          },
          {
            id: 'di',
            label: t('Huruf hias', 'Display'),
            explainWrong: t(
              'Huruf hias cocok untuk judul. Lebar tiap angka bisa berbeda.',
              'Display adalah huruf hias untuk judul besar, bukan untuk kode.',
            ),
          },
        ],
        answer: 'mo',
        explainCorrect: t(
          'Huruf sama lebar memberi tempat yang sama untuk setiap angka.',
          'Monospace, misalnya JetBrains Mono atau Fira Code, membuat kode dan kolom angka sejajar rapi.',
        ),
        hints: [t('Ingat angka di struk belanja.')],
        tags: ['tipografi'],
      }),
      makeTf({
        id: 'a08-l08-r2',
        prompt: t(
          'Paragraf di layar HP lebih nyaman rata kiri.',
          'Paragraf panjang di web lebih nyaman rata kiri daripada rata kanan-kiri (justify).',
        ),
        answer: true,
        explainCorrect: t(
          'Rata kiri menjaga jarak antarkata tetap rapi. Tidak ada celah yang bolong.',
          'Rata kiri menghindari celah spasi bolong di tengah baris.',
        ),
        explainWrong: t(
          'Pernyataan itu benar. Rata kiri membuat bacaan mengalir.',
          'Pernyataan itu benar: rata kanan-kiri kerap memutus ritme baca karena jarak antarkata tidak rata.',
        ),
        hints: [t('Bayangkan baris dengan celah kosong di tengah.')],
        tags: ['tipografi'],
      }),
    ],
    recap: t(
      'Pilih huruf yang bersih, buat cukup besar, dan beri jarak baris lega.',
      'Pakai teks isi minimal 16px, line-height 1.5–1.7, baris 45–75 karakter, rata kiri, maksimal 2 keluarga huruf.',
    ),
    companion: {
      talkPrompts: ['Mana yang semua hurufnya selebar sama: buku cerita atau struk belanja?'],
      offlineActivity:
        'Hitung jumlah huruf dalam satu baris di buku favoritmu. Biasanya sekitar 45 sampai 75 karakter.',
    },
  }),

  makeLesson({
    id: 'a08-l09',
    worldId: 'a08',
    title: 'Type scale',
    modes: ['pro'],
    objective: t(
      'Kamu bisa menyusun type scale (tangga ukuran huruf), membedakan typeface dan font, dan memuat web font dengan ringan.',
    ),
    atWork: 'Kamu menetapkan ukuran judul dan teks isi satu kali, lalu memakainya di seluruh halaman produk.',
    estMinutes: 5,
    introducesTerms: ['type-scale'],
    usesTerms: ['ui', 'hierarki', 'tipografi', 'rem-unit'],
    warmupFrom: 'a08-l08',
    steps: [
      storyStep('a08/tangga-nada-huruf.svg', [
        rText(
          'Tangga nada musik punya tingkatan teratur agar lagu tidak sumbang. Tangga ukuran huruf menjaga judul, subjudul, dan paragraf tetap serasi dan jelas bedanya.',
        ),
      ]),
      conceptStep({
        title: t('Type scale: tangga ukuran huruf'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'tangga-type-scale' },
        alt: t('Tangga ukuran huruf: H1 40px, H2 30px, H3 22px, Body 16px, Small 14px, Caption 12px.'),
        body: [
          rTerm('type-scale', 'Type scale'),
          rText(
            ' adalah daftar ukuran tetap yang dipakai konsisten di seluruh produk. Contohnya H1 (40px), H2 (30px), H3 (22px), Body (16px), Small (14px), dan Caption (12px). Dengan begitu, setiap tingkat ',
          ),
          rTerm('hierarki', 'hierarki'),
          rText(' langsung terlihat.'),
        ],
      }),
      qStep({
        id: 'a08-l09-q1',
        type: 'order',
        prompt: t('Urutkan tangga type scale dari ukuran paling besar ke paling kecil.'),
        difficulty: 1,
        items: [
          { id: 'b', label: t('Body (16px), teks isi paragraf') },
          { id: 'h1', label: t('H1 (40px), judul halaman') },
          { id: 'cap', label: t('Caption (12px), label kecil') },
          { id: 'h2', label: t('H2 (30px), judul bagian') },
          { id: 'h3', label: t('H3 (22px), subjudul') },
        ],
        answer: ['h1', 'h2', 'h3', 'b', 'cap'],
        explainCorrect: t('Tangga dengan jarak yang lebar membuat hierarki langsung terbaca.'),
        hints: [t('Mulai dari judul halaman, akhiri dengan label kecil.'), undefined],
        tags: ['type-scale', 'hierarki'],
      }),
      conceptStep({
        title: t('Pengaturan teks, typeface, dan font'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'anatomi-pengaturan-teks' },
        alt: t('Empat properti: font-size, line-height, letter-spacing, dan font-weight 100-900.'),
        body: [
          rText('Ada empat pengaturan teks utama di CSS: '),
          rCode('font-size'),
          rText(', '),
          rCode('line-height'),
          rText(', '),
          rCode('letter-spacing'),
          rText(', dan '),
          rCode('font-weight'),
          rText(' (100–900). '),
          rBold('Typeface'),
          rText(' adalah keluarga huruf (misalnya Inter), dan '),
          rBold('font'),
          rText(' adalah satu anggotanya (misalnya Inter Bold 16px).'),
        ],
      }),
      qStep({
        id: 'a08-l09-q6',
        type: 'fill',
        prompt: t('Istilah apa yang menamai keluarga huruf?'),
        difficulty: 2,
        template:
          '___ adalah nama keluarga hurufnya (misalnya Inter), dan font adalah satu anggota spesifiknya (misalnya Inter Bold 16px).',
        bank: ['Typeface', 'Contrast', 'Viewport'],
        answer: ['Typeface'],
        explainCorrect: t('Typeface adalah keluarga huruf. Font adalah satu anggota dengan ketebalan dan ukuran tertentu.'),
        hints: [t('Ingat contoh Inter: satu keluarga, banyak anggota.'), undefined],
        tags: ['tipografi', 'type-scale'],
      }),
      conceptStep({
        title: t('Menulis di CSS dan memuat web font'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'css-ch-dan-woff2' },
        alt: t('Aturan font-size 16px, line-height 1.6, max-width 65ch, dan format woff2.'),
        code: {
          lang: 'css',
          code: 'body {\n  font-size: 16px; /* atau 1rem */\n  line-height: 1.6;\n  max-width: 65ch;\n}',
        },
        body: [
          rText('Satuan '),
          rCode('ch'),
          rText(' kira-kira selebar satu karakter, jadi '),
          rCode('65ch'),
          rText(' pas di tengah rentang 45–75 karakter. Pakai '),
          rTerm('rem-unit', 'rem'),
          rText(' agar ukuran bisa menyesuaikan. Untuk web font, pilih format '),
          rCode('woff2'),
          rText(' dan muat hanya ketebalan yang dipakai.'),
        ],
      }),
      simStep(
        'detektif-kontras',
        t('Amati perbedaan ukuran dan ketebalan antara judul kartu dan label keterangannya di simulator.'),
      ),
      limitStep({
        analogy: t('Tangga nada musik untuk type scale'),
        same: [t('Tingkatan ukuran ditetapkan lebih dulu, bukan angka acak di tiap kartu.')],
        different: [
          t(
            'Tangga nada bebas naik-turun. Tangga ukuran web tidak boleh mengecilkan teks isi di bawah 16px dan harus tetap rapi di HP.',
          ),
        ],
        riskyAnalogy: false,
      }),
      qStep({
        id: 'a08-l09-q2',
        type: 'match',
        prompt: t('Pasangkan properti tipografi CSS dengan fungsinya.'),
        difficulty: 2,
        left: [
          { id: 'lh', label: t('line-height') },
          { id: 'ls', label: t('letter-spacing') },
          { id: 'fw', label: t('font-weight (100–900)') },
          { id: 'ch', label: t('max-width: 65ch') },
        ],
        right: [
          { id: 'rlh', label: t('Jarak vertikal antarbaris teks') },
          { id: 'rls', label: t('Jarak horizontal antarhuruf') },
          { id: 'rfw', label: t('Tingkat ketebalan huruf, dari regular sampai bold') },
          { id: 'rch', label: t('Batas panjang baris sekitar 65 karakter') },
        ],
        answer: { lh: 'rlh', ls: 'rls', fw: 'rfw', ch: 'rch' },
        explainCorrect: t('Empat pengaturan ini dan satuan ch memberi kendali penuh atas teks.'),
        hints: [t('Vertikal berarti antarbaris, horizontal berarti antarhuruf.'), undefined],
        tags: ['type-scale', 'tipografi'],
      }),
      qStep({
        id: 'a08-l09-q3',
        type: 'spotbug',
        prompt: t('Ketuk baris CSS yang membuat H2 hampir tidak berbeda dari teks isi.'),
        difficulty: 2,
        lines: [
          'h1 { font-size: 40px; line-height: 1.2; }',
          'h2 { font-size: 17px; line-height: 1.3; }',
          'body { font-size: 16px; line-height: 1.6; max-width: 65ch; }',
        ],
        answer: [2],
        explainCorrect: t(
          'H2 sebesar 17px hampir sama dengan teks isi 16px. Setiap tingkat harus tampak berbeda, misalnya 28–30px.',
        ),
        hints: [t('Bandingkan ukuran H2 dengan teks isi.'), undefined],
        tags: ['type-scale', 'hierarki'],
      }),
      qStep(
        makeMcq({
          id: 'a08-l09-q4',
          type: 'limit',
          analogy: t('Tangga nada musik untuk type scale'),
          prompt: t('Aturan apa yang perlu dijaga pada type scale web, selain memilih ukuran tetap?'),
          difficulty: 2,
          choices: [
            { id: 'min', label: t('Teks isi tidak turun di bawah 16px, judul disesuaikan untuk HP') },
            {
              id: 'step',
              label: t('Memilih beberapa ukuran baku, bukan menebak angka baru di tiap komponen'),
              explainWrong: t('Itu kesamaan dan tujuan utama type scale, bukan aturan tambahan.'),
            },
            {
              id: 'hier',
              label: t('Memberi lompatan ukuran yang jelas di setiap tingkat'),
              explainWrong: t('Itu juga manfaat tangga ukuran, bukan aturan tambahan.'),
            },
          ],
          answer: 'min',
          explainCorrect: t('Batas keterbacaan teks isi (minimal 16px) tidak boleh dikorbankan demi skala matematis.'),
          hints: [t('Pikirkan ukuran terkecil yang masih nyaman dibaca.')],
          tags: ['type-scale', 'tipografi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l09-q5',
          type: 'scenario',
          story: t(
            'Situs portofolio Nadia lambat dimuat. Ia memuat 9 ketebalan font (100 sampai 900), padahal hanya memakai Regular (400) dan Bold (700).',
          ),
          prompt: t('Bagaimana cara mengoptimalkan pemuatan web font Nadia?'),
          difficulty: 2,
          choices: [
            { id: 'woff', label: t('Muat hanya ketebalan 400 dan 700 dalam format woff2') },
            {
              id: 'all',
              label: t('Tambahkan juga ketebalan Italic dan Oblique agar lengkap'),
              explainWrong: t('Font tambahan yang tidak dipakai memperlambat waktu muat.'),
            },
            {
              id: 'img',
              label: t('Ubah semua paragraf menjadi gambar PNG'),
              explainWrong: t('Teks berupa gambar berat, buram saat diperbesar, dan merugikan aksesibilitas.'),
            },
          ],
          answer: 'woff',
          explainCorrect: t('Format woff2 lebih ringan, dan memuat ketebalan secukupnya menjaga performa halaman.'),
          hints: [t('Muat hanya yang benar-benar dipakai.')],
          tags: ['tipografi'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a08-l09-r1',
        prompt: t('Apa tujuan utama menyusun type scale tetap di sebuah proyek?'),
        choices: [
          { id: 'ok', label: t('Menjaga hierarki ukuran huruf tetap jelas dan konsisten') },
          {
            id: 'no',
            label: t('Memberi tiap halaman ukuran huruf yang berbeda'),
            explainWrong: t('Type scale justru membatasi pilihan ukuran agar konsisten.'),
          },
        ],
        answer: 'ok',
        explainCorrect: t('Tangga ukuran baku mencegah puluhan ukuran acak seperti 15px, 16px, dan 17px.'),
        hints: [t('Ingat tangga nada yang teratur.')],
        tags: ['type-scale'],
      }),
      makeTf({
        id: 'a08-l09-r2',
        prompt: t('Satuan ch kira-kira selebar satu karakter, jadi max-width: 65ch menjaga panjang baris tetap nyaman.'),
        answer: true,
        explainCorrect: t('Angka 65 berada dalam rentang 45–75. Jumlah karakter tiap baris bisa berbeda sesuai lebar huruf.'),
        explainWrong: t('Lebar 65ch membatasi paragraf. Pada jenis huruf proporsional, karakter seperti i dan m punya lebar berbeda.'),
        hints: [t('Bandingkan 65 dengan batas 45 dan 75.')],
        tags: ['type-scale', 'tipografi'],
      }),
    ],
    recap: t(
      'Susun type scale yang konsisten dan jelas bedanya. Pakai max-width 65ch, line-height lega, dan font woff2 secukupnya.',
    ),
  }),
];
