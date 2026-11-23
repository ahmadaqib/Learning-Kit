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

/** Teks tebal atau istilah yang hanya tampil di satu mode (rJunior dan rPro hanya untuk teks biasa). */
const rBoldJ = (text: string): Rich => ({ t: 'bold', v: { junior: text, pro: text }, modes: ['junior'] });
const rBoldP = (text: string): Rich => ({ t: 'bold', v: { pro: text }, modes: ['pro'] });
const rTermJ = (termId: string, text: string): Rich => ({
  t: 'term',
  termId,
  v: { junior: text, pro: text },
  modes: ['junior'],
});
const rTermP = (termId: string, text: string): Rich => ({ t: 'term', termId, v: { pro: text }, modes: ['pro'] });

export const world: World = {
  id: 'a09',
  track: 'A',
  order: 9,
  title: 'Toko Komponen',
  tagline: t(
    'Rakit tombol dan kartu dari keping seperti LEGO. Lalu pilih gayanya.',
    'Kamu bisa menyusun tampilan dari komponen yang dipakai ulang, dengan jarak dan gaya yang konsisten.',
  ),
  color: '#0E9AA7',
  illustration: 'a09-toko-komponen',
  sourceChapters: ['J1-12', 'J1-13', 'J1-14'],
  requires: ['a08'],
  lessons: ['a09-l01', 'a09-l02', 'a09-l03', 'a09-l04', 'a09-l05', 'a09-l06'],
  sideQuests: [],
  boss: {
    title: 'Tantangan Penjaga Toko Komponen',
    greeting: t(
      'Halo! Ayo buktikan kamu kenal tombol, kartu, dan gaya tampilan.',
      'Ayo uji kemampuanmu menyusun tampilan dari komponen.',
    ),
    guardianName: 'Penjaga Toko Komponen',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'a09-anc-j1',
        prompt: t('Tombol bulat di daftar ini hanya boleh dipilih satu. Apa namanya?'),
        choices: [
          { id: 'radio', label: t('Radio button') },
          {
            id: 'checkbox',
            label: t('Checkbox'),
            explainWrong: t('Checkbox boleh dicentang banyak. Seperti daftar belanja yang dicentang semuanya.'),
          },
          {
            id: 'toast',
            label: t('Toast'),
            explainWrong: t('Toast adalah pesan kecil yang muncul sebentar. Ia bukan tempat memilih.'),
          },
        ],
        answer: 'radio',
        explainCorrect: t(
          'Radio button hanya memilih satu. Seperti memilih satu rasa es krim.',
          'Radio button dipakai saat hanya satu opsi yang boleh dipilih.',
        ),
        tags: ['komponen-ui'],
      }),
      makeAnchorMcq({
        id: 'a09-anc-j2',
        prompt: t('Pesan kecil "Disimpan!" muncul sebentar, lalu hilang sendiri. Apa namanya?'),
        choices: [
          { id: 'toast', label: t('Toast') },
          {
            id: 'modal',
            label: t('Modal'),
            explainWrong: t('Modal menutupi layar sampai kamu menutupnya. Ia tidak hilang sendiri.'),
          },
          {
            id: 'navbar',
            label: t('Navbar'),
            explainWrong: t('Navbar adalah deretan menu di atas halaman. Ia bukan pesan kecil.'),
          },
        ],
        answer: 'toast',
        explainCorrect: t(
          'Toast memberi kabar singkat, lalu hilang. Seperti kertas catatan yang melayang pergi.',
          'Toast memberi kabar singkat tanpa menghalangi layar terlalu lama.',
        ),
        tags: ['komponen-ui'],
      }),
      makeAnchorMcq({
        id: 'a09-anc-j3',
        prompt: t(
          'Kamu menekan tombol, lalu ikonnya berputar. Itu wajah yang mana?',
          'Ikon di tombol berputar selama data dikirim. Tombol ada di state apa?',
        ),
        choices: [
          { id: 'loading', label: t('Loading') },
          {
            id: 'hover',
            label: t('Hover'),
            explainWrong: t('Hover terjadi saat panah mouse menyentuh tombol. Tombol belum bekerja.'),
          },
          {
            id: 'default',
            label: t('Default'),
            explainWrong: t('Default adalah keadaan biasa. Tombol sedang diam dan belum disentuh.'),
          },
        ],
        answer: 'loading',
        explainCorrect: t(
          'Loading artinya tombol sedang bekerja. Seperti lampu "sedang diproses" di mesin cuci.',
          'State loading menandakan sistem sedang memproses permintaanmu.',
        ),
        tags: ['state-ui'],
      }),
      makeAnchorMcq({
        id: 'a09-anc-j4',
        prompt: t(
          'Aplikasi belajar anak TK ingin terasa empuk dan ramah. Gaya apa yang cocok?',
          'Aplikasi belajar untuk anak TK perlu terasa empuk dan ramah. Gaya UI mana yang cocok?',
        ),
        choices: [
          { id: 'clay', label: t('Gaya tanah liat', 'Claymorphism') },
          {
            id: 'dark',
            label: t('Gaya kaca', 'Glassmorphism'),
            explainWrong: t(
              'Gaya kaca terasa halus dan dingin. Bentuknya datar.',
              'Glassmorphism memakai panel buram yang tembus pandang. Kesannya seperti kaca.',
            ),
          },
          {
            id: 'retro',
            label: t('Gaya garis tebal', 'Neo-brutalism'),
            explainWrong: t(
              'Gaya garis tebal terasa tegas. Gaya tanah liat terasa empuk.',
              'Neo-brutalism bergaris tebal dan berkesan keras. Claymorphism terasa empuk dan ramah anak.',
            ),
          },
        ],
        answer: 'clay',
        explainCorrect: t(
          'Gaya tanah liat berbentuk gembung seperti mainan empuk. Warnanya cerah.',
          'Claymorphism berbentuk gembung seperti tanah liat, dengan warna pastel yang ramah anak.',
        ),
        tags: ['gaya-ui'],
      }),
      makeAnchorMcq({
        id: 'a09-anc-j5',
        prompt: t(
          'Komponen di layar mirip keping LEGO. Apa bedanya dengan LEGO plastik?',
          'Apa yang membedakan komponen UI di layar dari keping LEGO plastik sungguhan?',
        ),
        type: 'limit',
        analogy: t('Komponen di layar seperti keping LEGO', 'Komponen UI seperti keping LEGO'),
        choices: [
          {
            id: 'dyn',
            label: t('Komponen bisa berubah wajah saat disentuh', 'Komponen bisa berubah tampilan sesuai state'),
          },
          {
            id: 'reuse',
            label: t('Keduanya bisa dipakai di banyak tempat'),
            explainWrong: t(
              'Itu kesamaan keduanya. LEGO juga bisa dipasang di mana saja.',
              'Itu justru kesamaan utama komponen UI dan LEGO.',
            ),
          },
          {
            id: 'fit',
            label: t('Keduanya membuat susunan terlihat seragam'),
            explainWrong: t(
              'Itu juga kesamaan keduanya. Keping yang sama membuat susunan rapi.',
              'Itu juga kesamaan keduanya: bagian yang sama membuat susunan seragam.',
            ),
          },
        ],
        answer: 'dyn',
        explainCorrect: t(
          'LEGO plastik tidak berubah. Tombol di layar bisa pudar, berputar, atau menyala.',
          'Plastik itu kaku, sedangkan komponen UI punya beberapa state yang berganti otomatis.',
        ),
        tags: ['komponen-ui', 'state-ui'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a09-anc-p1',
        prompt: t('Mengapa sistem grid web paling sering memilih 12 kolom?'),
        choices: [
          {
            id: 'div',
            label: t('Karena 12 habis dibagi 2, 3, 4, dan 6'),
          },
          {
            id: 'px',
            label: t('Karena lebar layar komputer rata-rata tepat 1200 px'),
            explainWrong: t('Lebar layar sangat beragam, dari HP sampai monitor besar. Angka 1200 hanya salah satunya.'),
          },
          {
            id: 'css',
            label: t('Karena CSS Grid hanya mendukung sampai 12 kolom'),
            explainWrong: t('CSS Grid bisa membuat kolom sebanyak apa pun. Angka 12 dipilih karena mudah dibagi.'),
          },
        ],
        answer: 'div',
        explainCorrect: t('12 bisa dibagi rata menjadi 2, 3, 4, atau 6 bagian, misalnya 6+6 atau 4+4+4. Kombinasi 3+9 cocok untuk sidebar dan isi.'),
        tags: ['grid-8pt'],
      }),
      makeAnchorMcq({
        id: 'a09-anc-p2',
        prompt: t('Kapan Accordion lebih cocok dipakai daripada Tabs?'),
        choices: [
          {
            id: 'acc',
            label: t('Untuk 10 pertanyaan umum yang dibaca satu per satu'),
          },
          {
            id: 'tab',
            label: t('Untuk 3 tampilan setara yang sering diganti bolak-balik'),
            explainWrong: t('Sedikit panel setara yang sering diganti lebih cocok memakai Tabs. Semua judulnya terlihat sejajar.'),
          },
          {
            id: 'toast',
            label: t('Untuk isi penting yang harus selalu terlihat'),
            explainWrong: t('Accordion menyembunyikan isi sampai dibuka. Tulis langsung di halaman bila isi harus selalu terlihat.'),
          },
        ],
        answer: 'acc',
        explainCorrect: t('Accordion cocok untuk banyak bagian yang dibaca satu per satu. Pembaca hanya membuka bagian yang ia perlukan.'),
        tags: ['komponen-ui'],
      }),
      makeAnchorMcq({
        id: 'a09-anc-p3',
        prompt: t('Mengapa gaya Neumorphism berisiko di aplikasi perbankan?'),
        choices: [
          {
            id: 'low',
            label: t('Tombol sewarna latar membuat kontras terlalu rendah'),
          },
          {
            id: 'html',
            label: t('Bayangannya membuat halaman bank terlalu berat'),
            explainWrong: t('Berat halaman bukan risiko utamanya. Risikonya ada pada kontras dan keterbacaan.'),
          },
          {
            id: 'fast',
            label: t('Warna pastelnya terlalu mencolok untuk bank'),
            explainWrong: t('Warna bukan masalah utamanya. Kontras rendah yang mengurangi keterbacaan.'),
          },
        ],
        answer: 'low',
        explainCorrect: t('Latar dan elemen yang sewarna membuat kontras rendah. Itu sulit dibaca dan kurang ramah aksesibilitas.'),
        tags: ['gaya-ui', 'kontras'],
      }),
      makeAnchorMcq({
        id: 'a09-anc-p4',
        prompt: t('Apa manfaat utama menyimpan warna merek sebagai design token, misalnya --color-primary?'),
        choices: [
          {
            id: 'one',
            label: t('Ganti satu baris, semua komponen ikut berubah'),
          },
          {
            id: 'net',
            label: t('Halaman dimuat lebih cepat karena CSS lebih kecil'),
            explainWrong: t('Token tidak memperkecil CSS. Token membuat nilai desain konsisten.'),
          },
          {
            id: 'sec',
            label: t('Warna merek tersembunyi dari DevTools browser'),
            explainWrong: t('Variabel CSS tetap terlihat di browser. Token bukan alat penyembunyi.'),
          },
        ],
        answer: 'one',
        explainCorrect: t('Design token memusatkan nilai desain di satu sumber. Ubah di sana, semua komponen ikut berubah.'),
        tags: ['design-token'],
      }),
      makeAnchorMcq({
        id: 'a09-anc-p5',
        prompt: t('Label, input, dan tombol Cari digabung menjadi satu kotak pencarian. Itu tingkat Atomic Design yang mana?'),
        choices: [
          { id: 'mol', label: t('Molecule') },
          {
            id: 'atom',
            label: t('Atom'),
            explainWrong: t('Atom adalah bagian tunggal terkecil, seperti satu tombol atau satu input.'),
          },
          {
            id: 'page',
            label: t('Page'),
            explainWrong: t('Page adalah halaman lengkap yang sudah berisi konten sungguhan.'),
          },
        ],
        answer: 'mol',
        explainCorrect: t('Beberapa atom yang bergabung menjadi satu unit fungsi disebut Molecule.'),
        tags: ['atomic-design'],
      }),
      makeAnchorMcq({
        id: 'a09-anc-p6',
        type: 'limit',
        analogy: t('Design token seperti nomor yang disimpan di kontak HP'),
        choices: [
          {
            id: 'tier',
            label: t('Token bisa berlapis dan berganti sesuai tema gelap'),
          },
          {
            id: 'rename',
            label: t('Satu perubahan di sumber memperbarui semua pemakainya'),
            explainWrong: t('Itu kesamaan keduanya. Mengubah satu kontak juga memperbarui semua panggilan ke kontak itu.'),
          },
          {
            id: 'label',
            label: t('Nama bermakna lebih mudah diingat daripada angka mentah'),
            explainWrong: t('Itu juga kesamaannya. Nama kontak lebih mudah diingat daripada nomor.'),
          },
        ],
        prompt: t('Apa yang membedakan design token CSS dari satu nama kontak di HP?'),
        answer: 'tier',
        explainCorrect: t('Token dasar bisa dirujuk token lain, lalu nilainya berganti di tema gelap.'),
        tags: ['design-token'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  // ---------------------------------------------------------------------------------------------
  // a09-l01 (khusus Pro)
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a09-l01',
    worldId: 'a09',
    title: 'Grid 12 kolom dan jarak 8',
    modes: ['pro'],
    objective: t('Kamu bisa membagi halaman dengan grid 12 kolom dan jarak kelipatan 4 atau 8.'),
    estMinutes: 5,
    introducesTerms: ['grid-8pt'],
    usesTerms: ['grid-css', 'padding', 'margin', 'alignment', 'whitespace'],
    atWork: 'Kamu akan memakai jarak kelipatan 8 dan grid 12 kolom saat menyusun halaman dashboard dari desain.',
    warmupFrom: 'a08-l09',
    steps: [
      storyStep('a09/grid-12.svg', [
        rText(
          'Papan rak yang dipotong dengan ukuran acak membuat rak miring. Desainer halaman memakai grid 12 kolom dan skala jarak (kelipatan 4 atau 8).',
        ),
      ]),
      conceptStep({
        title: t('Sistem grid 12 kolom'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'grid-12-kolom' },
        alt: t('Pembagian grid 12 kolom menjadi 6+6, 4+4+4, atau 3 sidebar dan 9 isi.'),
        body: [
          rTerm('grid-8pt', 'Grid 12 kolom'),
          rText(
            ' membagi lebar halaman menjadi 12 kolom sama lebar. Angka 12 habis dibagi 2, 3, 4, dan 6, jadi pembagiannya fleksibel. Contohnya 6+6, 4+4+4, atau 3+9 untuk sidebar dan isi. Jarak antarkolom disebut ',
          ),
          rBold('gutter'),
          rText(', dan jarak tepi luar disebut '),
          rBold('margin'),
          rText('.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a09-l01-q1',
          prompt: t('Apa nama jarak antara satu kolom dan kolom di sebelahnya?'),
          choices: [
            { id: 'gutter', label: t('Gutter') },
            {
              id: 'margin',
              label: t('Margin'),
              explainWrong: t('Margin adalah jarak di tepi luar grid, bukan di antara kolom.'),
            },
            {
              id: 'placeholder',
              label: t('Padding'),
              explainWrong: t('Padding adalah jarak di dalam satu kolom, antara isi dan tepinya.'),
            },
          ],
          answer: 'gutter',
          explainCorrect: t('Gutter memisahkan kolom satu dari kolom berikutnya, jadi isinya tidak bertabrakan.'),
          hints: [t('Cari jarak di antara kolom, bukan di tepi luar.')],
          tags: ['grid-8pt'],
        }),
      ),
      conceptStep({
        title: t('Skala jarak kelipatan 8pt'),
        visualName: 'BoxModelDiagram',
        visualProps: { worldId: 'a09', topic: 'skala-8pt' },
        alt: t('Skala jarak kelipatan 4 dan 8 piksel untuk padding dan margin yang konsisten.'),
        code: {
          lang: 'css',
          code: '.kartu {\n  padding: 16px;      /* 2 x 8 */\n  margin-bottom: 24px; /* 3 x 8 */\n  gap: 12px;\n}',
        },
        body: [
          rText('Pakai skala jarak kelipatan 4 atau 8, bukan angka acak seperti 13 px. Skalanya: '),
          rCode('4, 8, 12, 16, 24, 32, 48, 64'),
          rText('. Di skala ini, langkah dasar 8pt ditulis '),
          rCode('8px'),
          rText(' di CSS.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a09-l01-q2',
          type: 'analogy',
          prompt: t('Skala jarak 4, 8, 16, 24, dan 32 px paling mirip dengan apa?'),
          choices: [
            { id: 'balok', label: t('Memotong papan rak dengan balok ukur standar') },
            {
              id: 'acak',
              label: t('Mencampur cat dengan takaran yang berubah-ubah'),
              explainWrong: t('Takaran acak membuat hasil tidak seragam. Skala justru menyeragamkan ukuran.'),
            },
            {
              id: 'kunci',
              label: t('Memilih palet warna yang serasi'),
              explainWrong: t('Palet mengatur warna. Skala jarak mengatur ukuran dan jarak.'),
            },
          ],
          answer: 'balok',
          explainCorrect: t('Balok ukur standar membuat semua sambungan pas. Skala jarak membuat ritme halaman seragam.'),
          hints: [t('Pikirkan alat yang menjaga ukuran tetap sama.')],
          tags: ['grid-8pt'],
        }),
      ),
      conceptStep({
        title: t('Jarak kecil mengelompok, jarak besar memisah'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'jarak-hierarki' },
        alt: t('Jarak 8px mengikat judul dan deskripsi, jarak 32px memisahkan antarbagian.'),
        body: [
          rText('Beri jarak kecil (4–8 px) untuk elemen yang berhubungan, misalnya judul dan deskripsi. Beri jarak besar (32–64 px) untuk memisahkan bagian. Rapikan juga dengan '),
          rTerm('alignment', 'alignment'),
          rText(' (rata sejajar) dan '),
          rTerm('whitespace', 'white space'),
          rText(' (ruang kosong).'),
        ],
      }),
      limitStep({
        analogy: t('Lemari 12 petak dan balok ukur 8 cm'),
        same: [t('Ukuran baku membuat bagian-bagian selalu sejajar dan cepat dipasang.')],
        different: [
          t('Di HP, grid 12 kolom menyusut menjadi 4 kolom atau menumpuk jadi 1 kolom.'),
          t('Untuk garis tipis dan teks kecil, angka 1–2 px di luar skala masih wajar.'),
        ],
        riskyAnalogy: false,
      }),
      simStep(
        'tombol-seribu-wajah',
        t('Amati jarak dan proporsi tombol yang konsisten di simulator Toko Komponen.'),
      ),
      qStep({
        id: 'a09-l01-q3',
        type: 'spotbug',
        prompt: t('Ketuk baris CSS yang memakai jarak di luar skala 4/8pt.'),
        difficulty: 2,
        lines: [
          '.kartu-produk {',
          '  padding: 16px;',
          '  gap: 13px;',
          '  margin-bottom: 32px;',
          '}',
        ],
        answer: [3],
        explainCorrect: t('Baris 3 memakai 13px. Ganti dengan 12px atau 16px agar sesuai skala.'),
        hints: [t('Cari angka yang bukan kelipatan 4.'), undefined],
        tags: ['grid-8pt'],
      }),
      qStep(
        makeMcq({
          id: 'a09-l01-q4',
          type: 'limit',
          analogy: t('Lemari bersekat 12 petak'),
          prompt: t('Apa yang berbeda antara grid 12 kolom di web dan lemari 12 petak?'),
          difficulty: 2,
          choices: [
            { id: 'resp', label: t('Di HP, grid berubah jadi 4 kolom atau menumpuk') },
            {
              id: 'bagi',
              label: t('Angka 12 bisa dibagi menjadi 2, 3, atau 4 bagian'),
              explainWrong: t('Itu kesamaan keduanya: lemari 12 petak juga bisa dibagi begitu.'),
            },
            {
              id: 'rapi',
              label: t('Keduanya membantu isinya terlihat sejajar dan rapi'),
              explainWrong: t('Itu juga kesamaan keduanya. Petak dan kolom sama-sama merapikan susunan.'),
            },
          ],
          answer: 'resp',
          explainCorrect: t('Grid web menyesuaikan lebar layar. Lemari kayu tetap berbentuk sama.'),
          hints: [t('Bayangkan membuka situs di HP, lalu di laptop.')],
          tags: ['grid-8pt'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a09-l01-q5',
          type: 'scenario',
          story: t('Raka membuat dashboard dengan sidebar sempit di kiri dan konten lebar di kanan.'),
          prompt: t('Pembagian grid 12 kolom mana yang paling cocok?'),
          difficulty: 2,
          choices: [
            { id: '39', label: t('3 kolom sidebar, 9 kolom isi') },
            {
              id: '66',
              label: t('6 kolom sidebar, 6 kolom isi'),
              explainWrong: t('Pembagian 6+6 membuat sidebar sama lebar dengan isi. Sidebar jadi terlalu lebar.'),
            },
            {
              id: '12',
              label: t('9 kolom sidebar, 3 kolom isi'),
              explainWrong: t('Pembagian itu terbalik. Sidebar jadi lebar dan isi utama terlalu sempit.'),
            },
          ],
          answer: '39',
          explainCorrect: t('Rasio 3:9 memberi seperempat lebar untuk sidebar dan tiga perempat untuk isi. Fokus ada di konten utama.'),
          hints: [t('Sidebar perlu ruang lebih kecil daripada isi.')],
          tags: ['grid-8pt'],
        }),
      ),
      qStep({
        id: 'a09-l01-q6',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi CSS ini agar 3 kartu sama lebar dan jaraknya mengikuti skala.'),
        template: '.kartu-tiga { grid-column: span ___; padding: ___px; }',
        bank: ['4', '16', '5', '17'],
        answer: ['4', '16'],
        explainCorrect: t('12 ÷ 3 = 4 kolom per kartu, dan 16 px adalah kelipatan 8.'),
        hints: [t('Bagi 12 kolom dengan jumlah kartu.'), undefined],
        tags: ['grid-8pt'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a09-l01-r1',
        prompt: t('Deret jarak mana yang mengikuti skala 4/8pt?'),
        choices: [
          { id: 'ok', label: t('8, 16, 24, 32 px') },
          {
            id: 'bad',
            label: t('13, 17, 22, 29 px'),
            explainWrong: t('Angka acak membuat jarak antarelemen tidak teratur.'),
          },
          {
            id: 'ten',
            label: t('10, 20, 30, 40 px'),
            explainWrong: t('Kelipatan 10 rapi, tetapi bukan kelipatan 4 atau 8. Skalanya jadi tidak selaras.'),
          },
        ],
        answer: 'ok',
        explainCorrect: t('Kelipatan 4 dan 8 menjaga jarak semua komponen tetap selaras.'),
        tags: ['grid-8pt'],
      }),
      makeTf({
        id: 'a09-l01-r2',
        prompt: t('Skala 8pt memakai jarak kecil untuk elemen yang berpasangan dan jarak besar untuk memisahkan bagian.'),
        answer: true,
        explainCorrect: t('Jarak yang dekat menunjukkan elemen itu berhubungan.'),
        explainWrong: t('Terbalik: jarak kecil menyatukan elemen yang terkait, dan jarak besar memisahkan bagian.'),
        tags: ['grid-8pt'],
      }),
    ],
    recap: t('Grid 12 kolom memudahkan pembagian tata letak. Jarak kelipatan 4 atau 8 membuat ritme visual konsisten.'),
  }),

  // ---------------------------------------------------------------------------------------------
  // a09-l02
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a09-l02',
    worldId: 'a09',
    title: 'Kamus komponen UI',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menyebut nama tombol, kartu, modal, dan toast.',
      'Kamu bisa membedakan fungsi komponen UI umum seperti Button, Checkbox, Radio, Modal, Toast, Tabs, dan Accordion.',
    ),
    estMinutes: 6,
    introducesTerms: ['komponen-ui'],
    usesTerms: ['ui', 'ux', 'frontend'],
    stickerId: 'lego-ds',
    atWork: 'Saat desainer menulis "pakai Toast di sini" di desain, kamu langsung tahu komponen mana yang dibuat.',
    warmupFrom: 'a09-l01',
    steps: [
      storyStep('a09/lego-ds.svg', [
        rText(
          'Setiap ruangan punya perabot dengan nama jelas, seperti kursi dan lemari. Halaman web juga punya perabot siap pakai. Apa saja namanya?',
          'Desainer menulis "pakai komponen Toast", dan developer langsung paham maksudnya. Nama baku membuat tim tidak salah paham.',
        ),
      ]),
      conceptStep({
        title: t('Tombol dan kotak pilihan', 'Komponen aksi dan masukan'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'komponen-input' },
        alt: t(
          'Gambar tombol, kotak centang, tombol bulat pilihan, dan saklar.',
          'Contoh Button, Input dengan placeholder, Checkbox, Radio, dan Toggle.',
        ),
        body: [
          rTerm('komponen-ui', 'Komponen UI'),
          rJunior(' adalah bagian layar, seperti tombol, yang dipakai berulang. '),
          rBoldJ('Checkbox'),
          rJunior(' boleh memilih banyak. '),
          rBoldJ('Radio'),
          rJunior(' hanya boleh memilih satu.'),
          rPro(
            ' adalah bagian tampilan yang dipakai ulang di banyak halaman. Contoh dasarnya Button (primary, secondary, atau ghost dengan latar transparan), Input dengan placeholder, dan Dropdown. ',
          ),
          rBoldP('Checkbox'),
          rPro(' memilih banyak opsi, '),
          rBoldP('Radio'),
          rPro(' hanya satu opsi. Toggle adalah saklar nyala-mati.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a09-l02-q1',
          type: 'analogy',
          prompt: t(
            'Kursi selalu disebut kursi. Mengapa komponen layar juga perlu nama baku?',
            'Mengapa tim web sepakat memakai nama baku seperti Modal, Toast, dan Accordion?',
          ),
          choices: [
            { id: 'name', label: t('Supaya semua orang langsung paham', 'Supaya tim langsung saling paham') },
            {
              id: 'hide',
              label: t('Supaya tampilannya otomatis seragam'),
              explainWrong: t(
                'Nama tidak mengubah tampilan. Nama membuat semua orang saling paham.',
                'Nama tidak mengatur tampilan. Nama membuat tim memakai istilah yang sama.',
              ),
            },
            {
              id: 'slow',
              label: t('Supaya halaman terbuka lebih cepat'),
              explainWrong: t(
                'Nama tidak mempercepat halaman. Nama membantu orang saling paham.',
                'Nama tidak mempercepat kode. Nama hanya menyamakan istilah dalam tim.',
              ),
            },
          ],
          answer: 'name',
          explainCorrect: t(
            'Nama yang sama membuat semua orang saling paham. Seperti kata "kursi" yang dimengerti siapa saja.',
            'Nama baku menjadi bahasa bersama antara desainer dan developer. Diskusi dan dokumentasi jadi lebih cepat dipahami.',
          ),
          hints: [t('Ingat kata "kursi" yang semua orang tahu.', 'Pikirkan cara tim menyebut komponen saat berdiskusi.')],
          tags: ['komponen-ui'],
        }),
      ),
      conceptStep({
        title: t('Kartu dan jendela pesan', 'Wadah dan pemberitahuan'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'komponen-pesan' },
        alt: t(
          'Kartu, jendela di tengah, pesan kecil yang hilang, dan pesan yang tetap.',
          'Perbandingan Card, Modal dialog, Toast sementara, dan Alert yang menetap.',
        ),
        body: [
          rBoldJ('Kartu'),
          rJunior(' membungkus satu kabar. '),
          rBoldJ('Modal'),
          rJunior(' minta dijawab. '),
          rBoldJ('Toast'),
          rJunior(' hilang sendiri, '),
          rBoldJ('Alert'),
          rJunior(' tetap di halaman.'),
          rBoldP('Card'),
          rPro(' membungkus satu unit informasi. '),
          rBoldP('Modal'),
          rPro(' meminta perhatian penuh di atas halaman. '),
          rBoldP('Toast'),
          rPro(' muncul singkat lalu hilang. '),
          rBoldP('Alert'),
          rPro(' (atau Banner) tetap bertahan di halaman.'),
        ],
      }),
      simStep(
        'tombol-seribu-wajah',
        t(
          'Pencet tombol di simulator dan lihat apa yang berubah.',
          'Amati perilaku komponen tombol interaktif di simulator Toko Komponen.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a09-l02-q8j',
          type: 'scenario',
          modes: ['junior'],
          story: t('Bu Laras bertanya hobi murid. Setiap murid hanya boleh memilih satu hobi.'),
          prompt: t('Kotak pilihan apa yang cocok?'),
          choices: [
            { id: 'radio', label: t('Radio') },
            {
              id: 'checkbox',
              label: t('Checkbox'),
              explainWrong: t('Checkbox boleh dicentang banyak. Setiap murid hanya boleh satu hobi.'),
            },
            {
              id: 'tombol',
              label: t('Tombol'),
              explainWrong: t('Tombol dipencet untuk memulai aksi. Ia tidak menyimpan pilihan.'),
            },
          ],
          answer: 'radio',
          explainCorrect: t('Radio hanya memilih satu. Seperti memilih satu ketua kelas.'),
          hints: [t('Baca lagi: berapa hobi yang boleh dipilih?')],
          tags: ['komponen-ui'],
        }),
      ),
      qStep({
        id: 'a09-l02-q2',
        type: 'sort',
        prompt: t('Kelompokkan setiap komponen ke wadah yang cocok.', 'Kelompokkan komponen ini ke Pilihan input atau Pemberitahuan.'),
        difficulty: 2,
        items: [
          { id: 'cb', label: t('Checkbox, memilih banyak', 'Checkbox (pilih banyak)') },
          { id: 'ts', label: t('Toast, hilang sendiri', 'Toast (hilang sendiri)') },
          { id: 'rd', label: t('Radio, memilih satu', 'Radio (pilih satu)') },
          { id: 'al', label: t('Alert, tetap di halaman', 'Alert (menetap di halaman)') },
        ],
        bins: [
          { id: 'inp', label: t('Pilihan', 'Pilihan input'), icon: 'file-text' },
          { id: 'msg', label: t('Pesan', 'Pemberitahuan'), icon: 'bell' },
        ],
        answer: { cb: 'inp', ts: 'msg', rd: 'inp', al: 'msg' },
        explainCorrect: t(
          'Checkbox dan Radio dipakai untuk memilih. Toast dan Alert seperti papan pengumuman kecil.',
          'Checkbox dan Radio menerima masukan. Toast dan Alert menyampaikan pesan.',
        ),
        hints: [t('Tanya dirimu: ini untuk memilih atau memberi kabar?', 'Tanyakan: komponen ini menerima masukan atau menyampaikan pesan?'), undefined],
        tags: ['komponen-ui'],
      }),
      conceptStep({
        title: t('Navigasi dan pengelompokan'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'komponen-navigasi' },
        alt: t('Contoh Navbar, Breadcrumb, Tabs, Accordion, Skeleton, dan Pagination.'),
        modes: ['pro'],
        body: [
          rBoldP('Breadcrumb'),
          rPro(' menandai jejak lokasi. '),
          rBoldP('Tabs'),
          rPro(' berganti isi tanpa pindah halaman. '),
          rBoldP('Accordion'),
          rPro(' melipat isi, misalnya daftar FAQ. '),
          rBoldP('Skeleton'),
          rPro(' menandai data yang sedang dimuat, dan '),
          rBoldP('Pagination'),
          rPro(' membagi daftar menjadi halaman bernomor.'),
        ],
      }),
      qStep({
        id: 'a09-l02-q3',
        type: 'match',
        modes: ['pro'],
        prompt: t('Pasangkan nama komponen dengan contoh tampilannya.'),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('Breadcrumb') },
          { id: 'l2', label: t('Accordion') },
          { id: 'l3', label: t('Skeleton') },
          { id: 'l4', label: t('Modal') },
        ],
        right: [
          { id: 'r1', label: t('Kotak abu-abu saat data masih dimuat') },
          { id: 'r2', label: t('Beranda > Sepatu > Sneakers') },
          { id: 'r3', label: t('Jendela konfirmasi "Hapus data?" di tengah layar') },
          { id: 'r4', label: t('Daftar tanya jawab FAQ yang bisa dibuka-tutup') },
        ],
        answer: { l1: 'r2', l2: 'r4', l3: 'r1', l4: 'r3' },
        explainCorrect: t('Breadcrumb menunjukkan posisi, Accordion melipat isi, Skeleton mengisi tempat data, dan Modal meminta jawaban.'),
        hints: [t('Mulai dari komponen yang paling mudah dikenali.'), undefined],
        tags: ['komponen-ui'],
      }),
      limitStep({
        analogy: t('Komponen UI seperti perabot rumah atau keping LEGO'),
        same: [t('Setiap bagian punya nama baku dan bisa dipasang ulang di banyak tempat.')],
        different: [
          t('Perabot kayu hanya diam. Komponen UI bisa dibuka-tutup dan merespons klik.'),
          t('Satu komponen tombol bisa tampil sebagai primary, secondary, atau ghost, tergantung perannya.'),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeMcq({
          id: 'a09-l02-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Komponen UI seperti kursi kayu atau LEGO'),
          prompt: t('Apa yang bisa dilakukan komponen UI, tetapi tidak bisa dilakukan kursi kayu?'),
          difficulty: 2,
          choices: [
            { id: 'inter', label: t('Dibuka-tutup dan merespons klik') },
            {
              id: 'nama',
              label: t('Punya nama tetap agar tidak salah sebut'),
              explainWrong: t('Itu kesamaan keduanya. Kursi pun punya nama tetap.'),
            },
            {
              id: 'ulang',
              label: t('Dipasang di banyak ruangan berbeda'),
              explainWrong: t('Itu juga kesamaan keduanya. Keduanya bisa dipakai ulang di banyak tempat.'),
            },
          ],
          answer: 'inter',
          explainCorrect: t('Komponen UI hidup: ia bisa terbuka, berubah, dan menanggapi klik. Kursi kayu hanya diam.'),
          hints: [t('Bandingkan benda yang diam dengan benda yang bereaksi.')],
          tags: ['komponen-ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a09-l02-q5',
          type: 'scenario',
          story: t(
            'Sari membuat halaman belanja. Ia ingin bertanya "Hapus semua isi keranjang?" sebelum menghapus.',
            'Sari membuat halaman belanja. Ia ingin menampilkan konfirmasi "Hapus seluruh keranjang?" sebelum data terhapus.',
          ),
          prompt: t('Komponen apa yang cocok untuk bertanya itu?', 'Komponen apa yang paling tepat untuk konfirmasi ini?'),
          difficulty: 2,
          choices: [
            { id: 'modal', label: t('Modal') },
            {
              id: 'toast',
              label: t('Toast'),
              explainWrong: t(
                'Toast hilang sendiri dalam sekejap. Pertanyaan penting perlu kamu jawab.',
                'Toast hilang sendiri sebelum dibaca. Konfirmasi penting harus menunggu jawaban.',
              ),
            },
            {
              id: 'badge',
              label: t('Alert'),
              explainWrong: t(
                'Alert hanya tampil di halaman. Ia tidak menahan kamu sampai menjawab.',
                'Alert tetap tampil, tetapi tidak menghentikan halaman. Konfirmasi bisa terlewat.',
              ),
            },
          ],
          answer: 'modal',
          explainCorrect: t(
            'Modal muncul di tengah dan menunggu jawabanmu. Seperti guru yang berhenti sampai kamu menjawab.',
            'Modal muncul di atas halaman dan menahan perhatian sampai ada jawaban. Cocok untuk aksi yang tidak bisa dibatalkan.',
          ),
          hints: [t('Pertanyaan penting harus dijawab dulu sebelum lanjut.', 'Konfirmasi penting harus tetap terlihat sampai dijawab.')],
          tags: ['komponen-ui'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a09-l02-q6',
          prompt: t(
            'Teks contoh abu-abu di kotak ketik hilang saat kamu mulai mengetik.',
            'Teks contoh abu-abu di dalam kolom isian, seperti "nama@toko-rani.example", disebut placeholder.',
          ),
          answer: true,
          explainCorrect: t(
            'Teks contoh membantu kamu tahu isi yang diminta. Seperti contoh tulisan di buku latihan.',
            'Placeholder memberi contoh isian sebelum kamu mengetik, lalu hilang.',
          ),
          explainWrong: t(
            'Teks contoh itu memang hilang saat kamu mengetik. Ia hanya petunjuk.',
            'Teks contoh itu memang disebut placeholder. Ia hilang saat kamu mulai mengetik.',
          ),
          hints: [t('Bayangkan kotak nama yang masih kosong.')],
          tags: ['komponen-ui'],
        }),
      ),
      qStep({
        id: 'a09-l02-q7',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi kalimat ini dengan nama komponen yang tepat.'),
        template: 'Kerangka abu-abu saat data dimuat disebut ___, dan pembagi halaman bernomor 1 2 3 disebut ___.',
        bank: ['Skeleton', 'Pagination', 'Navbar', 'Tooltip'],
        answer: ['Skeleton', 'Pagination'],
        explainCorrect: t('Skeleton mengisi tempat data selagi dimuat. Pagination membagi daftar panjang menjadi halaman bernomor.'),
        hints: [t('Satu tampil saat menunggu, satu berupa nomor halaman.'), undefined],
        tags: ['komponen-ui'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a09-l02-r1',
        prompt: t(
          'Rani boleh memilih banyak hobi. Kotak mana yang cocok?',
          'Formulir mengizinkan lebih dari satu hobi. Komponen apa yang dipakai?',
        ),
        choices: [
          { id: 'cb', label: t('Checkbox') },
          {
            id: 'rd',
            label: t('Radio', 'Radio button'),
            explainWrong: t(
              'Radio hanya boleh satu. Rani boleh memilih banyak hobi.',
              'Radio hanya mengizinkan satu pilihan.',
            ),
          },
          {
            id: 'tg',
            label: t('Tombol', 'Toggle'),
            explainWrong: t(
              'Tombol dipencet untuk memulai aksi. Ia tidak menyimpan banyak pilihan.',
              'Toggle hanya menyalakan atau mematikan satu pengaturan.',
            ),
          },
        ],
        answer: 'cb',
        explainCorrect: t(
          'Checkbox boleh dicentang banyak. Seperti memilih beberapa lauk di kantin.',
          'Checkbox memilih banyak opsi sekaligus.',
        ),
        hints: [t('Baca lagi: boleh satu hobi atau banyak?')],
        tags: ['komponen-ui'],
      }),
      makeTf({
        id: 'a09-l02-r2',
        prompt: t(
          'Tombol ajakan utama, seperti "Daftar Sekarang", dibuat paling mencolok.',
          'CTA adalah tombol ajakan utama di halaman, misalnya "Daftar Sekarang".',
        ),
        answer: true,
        explainCorrect: t(
          'Tombol ajakan utama harus mudah terlihat. Seperti pintu masuk toko yang terang.',
          'Tombol CTA dibuat paling menonjol agar tujuan halaman mudah dikenali.',
        ),
        explainWrong: t(
          'Tombol ajakan utama memang dibuat paling terlihat. Orang jadi tahu langkah berikutnya.',
          'CTA adalah tombol ajakan utama, misalnya "Daftar Sekarang" atau "Beli".',
        ),
        hints: [t('Pikirkan tombol yang ingin dipencet semua orang.')],
        tags: ['komponen-ui'],
      }),
    ],
    recap: t(
      'Setiap bagian layar punya nama, seperti tombol, kartu, modal, dan toast.',
      'Komponen UI punya nama baku, seperti Button, Modal, Toast, dan Tabs. Nama yang sama mempercepat kerja tim.',
    ),
    companion: {
      talkPrompts: ['Di aplikasi favoritmu, mana tombol dan mana kartunya?'],
      offlineActivity:
        'Gambar 4 komponen favorit di kartu kertas, seperti kartu barang, tombol, kotak tanya, dan pesan kecil. Tulis namanya di balik kartu.',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // a09-l03
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a09-l03',
    worldId: 'a09',
    title: 'State: tombol punya banyak wajah',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengenali enam wajah tombol.',
      'Kamu bisa menyiapkan enam state tombol, dari default sampai disabled.',
    ),
    estMinutes: 6,
    introducesTerms: ['state-ui'],
    usesTerms: ['komponen-ui', 'ui', 'ux'],
    atWork: 'Kamu akan mengecek semua state tombol, dari hover sampai disabled, sebelum fitur dirilis.',
    warmupFrom: 'a09-l02',
    steps: [
      storyStep('a09/tombol-wajah.svg', [
        rText(
          'Lampu lalu lintas punya banyak wajah. Wajah itu memberi tahu kapan jalan atau berhenti. Apakah tombol juga punya wajah?',
          'Tombol "Bayar" yang tidak berubah setelah diketuk membuat orang mengetuknya dua kali. Karena itu satu tombol punya beberapa state (keadaan), dan tiap state memberi umpan balik.',
        ),
      ]),
      conceptStep({
        title: t('Tiga wajah sebelum diklik', 'Default, Hover, Focus'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'state-awal' },
        alt: t(
          'Tiga tombol: diam, disorot panah, dan dipilih dengan keyboard.',
          'Perbandingan tombol dalam keadaan default, hover disorot mouse, dan focus keyboard.',
        ),
        body: [
          rJunior('Wajah tombol disebut '),
          rTermJ('state-ui', 'state'),
          rJunior('. '),
          rBoldJ('Default'),
          rJunior(' saat diam, '),
          rBoldJ('Hover'),
          rJunior(' saat disorot panah. '),
          rBoldJ('Focus'),
          rJunior(' saat dipilih dengan tombol Tab di keyboard.'),
          rTermP('state-ui', 'State'),
          rPro(' (keadaan) adalah tampilan tombol pada saat tertentu. Ada tiga state awal: '),
          rBoldP('Default'),
          rPro(' (biasa), '),
          rBoldP('Hover'),
          rPro(' (disorot kursor), dan '),
          rBoldP('Focus'),
          rPro(' (dipilih lewat keyboard dengan Tab).'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a09-l03-q1',
          prompt: t(
            'Panah mouse baru menyentuh tombol, belum menekannya. Itu wajah apa?',
            'Kursor berada di atas tombol, tetapi belum mengeklik. Tombol ada di state apa?',
          ),
          choices: [
            { id: 'hover', label: t('Hover') },
            {
              id: 'active',
              label: t('Active'),
              explainWrong: t(
                'Active terjadi saat tombol benar-benar ditekan. Di sini panah baru menyentuh.',
                'Active adalah saat tombol sedang ditekan. Di sini kursor baru menyentuh.',
              ),
            },
            {
              id: 'disabled',
              label: t('Disabled'),
              explainWrong: t(
                'Disabled berarti tombol pudar dan tidak bisa dipencet. Tombol di sini masih bisa.',
                'Disabled adalah tombol nonaktif. Tombol di sini masih bisa diklik.',
              ),
            },
          ],
          answer: 'hover',
          explainCorrect: t(
            'Hover muncul saat panah menyentuh tombol. Seperti lampu kecil yang menyala saat kamu mendekat.',
            'Hover menandakan tombol siap diklik saat kursor berada di atasnya.',
          ),
          hints: [t('Ingat: panah mouse hanya lewat di atas tombol.', 'Ingat: kursor hanya berada di atas tombol.')],
          tags: ['state-ui'],
        }),
      ),
      conceptStep({
        title: t('Tiga wajah saat bekerja', 'Active, Loading, Disabled'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'state-aksi' },
        alt: t(
          'Tombol ditekan, tombol berputar, dan tombol pudar.',
          'Keadaan active ditekan, loading berputar, dan disabled redup tidak aktif.',
        ),
        body: [
          rBoldJ('Active'),
          rJunior(' muncul saat tombol ditekan. '),
          rBoldJ('Loading'),
          rJunior(' menampilkan ikon berputar saat tombol bekerja. '),
          rBoldJ('Disabled'),
          rJunior(' pudar dan tidak bisa dipencet.'),
          rBoldP('Active'),
          rPro(' terlihat saat tombol ditekan. '),
          rBoldP('Loading'),
          rPro(' menampilkan ikon berputar. Tombol dikunci sementara agar orang tidak mengetuk dua kali. '),
          rBoldP('Disabled'),
          rPro(' tampil redup saat tombol tidak bisa dipakai. Kolom input punya state tambahan, yaitu error dan success.'),
        ],
      }),
      simStep(
        'tombol-seribu-wajah',
        t(
          'Pilih wajah di atas tombol, lalu lihat tampilannya.',
          'Pilih tiap state tombol di simulator Tombol Seribu Wajah dan amati perubahannya.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a09-l03-q8j',
          type: 'scenario',
          modes: ['junior'],
          story: t('Tombol Kirim tampak pudar. Dimas menekannya, tetapi tidak ada yang terjadi.'),
          prompt: t('Tombol itu ada di wajah yang mana?'),
          choices: [
            { id: 'disabled', label: t('Disabled') },
            {
              id: 'loading',
              label: t('Loading'),
              explainWrong: t('Loading berputar saat tombol bekerja. Tombol ini hanya pudar.'),
            },
            {
              id: 'default',
              label: t('Default'),
              explainWrong: t('Default berarti tombol tampil biasa. Tombol ini pudar dan tidak bisa dipencet.'),
            },
          ],
          answer: 'disabled',
          explainCorrect: t('Disabled berarti tombol tidak bisa dipakai. Seperti lampu yang dimatikan.'),
          hints: [t('Ingat wajah tombol yang tidak bisa dipencet.')],
          tags: ['state-ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a09-l03-q3',
          type: 'analogy',
          prompt: t(
            'Tombol Bayar berputar setelah dipencet. Mengapa begitu?',
            'Mengapa tombol "Bayar" perlu masuk ke state Loading setelah diklik?',
          ),
          choices: [
            { id: 'dup', label: t('Supaya kamu tahu tombol sedang bekerja') },
            {
              id: 'hias',
              label: t('Supaya halaman tampak ramai'),
              explainWrong: t(
                'Putaran itu bukan hiasan. Ia memberi tahu bahwa tombol sedang bekerja.',
                'Loading bukan hiasan. Ia memberi umpan balik bahwa proses sedang berjalan.',
              ),
            },
            {
              id: 'del',
              label: t('Supaya pembayarannya terjadi lebih cepat'),
              explainWrong: t(
                'Putaran tidak mempercepat apa pun. Ia hanya memberi kabar.',
                'Loading tidak mempercepat proses. Ia hanya memberi tahu bahwa proses berjalan.',
              ),
            },
          ],
          answer: 'dup',
          explainCorrect: t(
            'Putaran memberi tahu bahwa tombol sedang bekerja. Seperti lampu "sedang diproses" di mesin cuci.',
            'Loading memberi umpan balik bahwa proses berjalan. Tombol juga terkunci, jadi klik ganda dan pembayaran ganda tercegah.',
          ),
          hints: [t('Apa yang kamu rasakan kalau tombol tidak bereaksi?', 'Pikirkan apa yang terjadi kalau tombol tidak bereaksi.')],
          tags: ['state-ui'],
        }),
      ),
      qStep({
        id: 'a09-l03-q2',
        type: 'match',
        prompt: t('Pasangkan nama wajah tombol dengan cirinya.', 'Pasangkan nama state tombol dengan keadaannya.'),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('Focus') },
          { id: 'l2', label: t('Loading') },
          { id: 'l3', label: t('Disabled') },
          { id: 'l4', label: t('Default') },
        ],
        right: [
          {
            id: 'r1',
            label: t('Pudar dan tidak bisa dipencet', 'Tampil redup dan tidak bisa diklik'),
          },
          {
            id: 'r2',
            label: t('Ada garis luar saat dipilih keyboard', 'Garis luar jelas saat dipilih lewat keyboard'),
          },
          { id: 'r3', label: t('Tampil biasa, belum disentuh', 'Keadaan biasa sebelum disentuh') },
          { id: 'r4', label: t('Berputar karena sedang bekerja', 'Berputar karena sedang memproses') },
        ],
        answer: { l1: 'r2', l2: 'r4', l3: 'r1', l4: 'r3' },
        explainCorrect: t(
          'Setiap wajah memberi kabar yang berbeda. Seperti lampu lalu lintas yang berganti warna.',
          'Tiap state memberi sinyal berbeda: Focus menunjukkan posisi, Loading menunjukkan proses, Disabled menunjukkan tombol tidak aktif.',
        ),
        hints: [t('Mulai dari wajah yang paling mudah ditebak.'), undefined],
        tags: ['state-ui'],
      }),
      qStep(
        makeMcq({
          id: 'a09-l03-q5',
          type: 'scenario',
          story: t(
            'Tombol Tab memindahkan pilihan. Dimas menekan Tab, tetapi tidak ada garis penanda. Ia bingung tombol mana yang terpilih.',
            'Dimas memakai Tab di keyboard untuk berpindah antartombol. Tidak ada garis penanda, jadi ia tidak tahu tombol mana yang terpilih.',
          ),
          prompt: t('Wajah tombol mana yang belum dibuat?', 'State tombol mana yang belum didesain?'),
          difficulty: 2,
          choices: [
            { id: 'focus', label: t('Focus') },
            {
              id: 'default',
              label: t('Default'),
              explainWrong: t(
                'Default sudah tampil sebelum tombol dipilih. Itu bukan masalah Dimas.',
                'Default sudah tampil sebelum tombol dipilih, jadi bukan itu yang hilang.',
              ),
            },
            {
              id: 'loading',
              label: t('Loading'),
              explainWrong: t(
                'Loading muncul saat tombol bekerja. Dimas hanya memindahkan pilihan.',
                'Dimas belum menekan untuk memproses. Ia baru memindahkan pilihan lewat keyboard.',
              ),
            },
          ],
          answer: 'focus',
          explainCorrect: t(
            'Garis Focus menunjukkan tombol yang sedang terpilih. Seperti jari yang menunjuk satu murid.',
            'Indikator Focus harus terlihat agar orang yang memakai keyboard tahu posisinya.',
          ),
          hints: [t('Dimas memilih tombol, tetapi belum menekannya.', 'Tombol sudah terpilih, tetapi belum ditekan.')],
          tags: ['state-ui'],
        }),
      ),
      conceptStep({
        title: t('Ikon, sudut, dan bayangan'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'ikon-sudut-bayangan' },
        alt: t('Ikon SVG seragam, sudut bulat dan sudut tajam, serta bayangan elevation.'),
        modes: ['pro'],
        body: [
          rPro(
            'Pakai satu set ikon SVG dengan gaya seragam. Pilih 1–2 nilai border radius, lalu pakai secara konsisten. Beri bayangan (elevation) yang lebih besar dan lembut pada elemen yang tinggi, seperti Modal.',
          ),
        ],
      }),
      qStep(
        makeTf({
          id: 'a09-l03-q6',
          modes: ['pro'],
          prompt: t('Satu website sebaiknya memakai satu set ikon dengan gaya seragam, misalnya semuanya bergaya garis.'),
          answer: true,
          explainCorrect: t('Ikon tebal, tipis, dan 3D yang bercampur membuat tampilan berantakan.'),
          explainWrong: t('Ikon dengan gaya seragam, terutama format SVG, membuat tampilan terlihat rapi dan profesional.'),
          hints: [t('Bayangkan satu halaman dengan tiga gaya ikon berbeda.')],
          tags: ['state-ui', 'komponen-ui'],
        }),
      ),
      limitStep({
        analogy: t('Tombol seperti rambu lampu yang berganti wajah'),
        same: [t('Setiap perubahan tampilan memberi sinyal cepat tentang keadaan saat itu.')],
        different: [
          t('Lampu jalan berganti mengikuti waktu. State tombol berubah seketika mengikuti tindakanmu dan bisa mengunci klik ganda saat loading.'),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeMcq({
          id: 'a09-l03-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Tombol seperti rambu lalu lintas'),
          prompt: t('Apa yang berbeda antara state tombol dan lampu lalu lintas?'),
          difficulty: 2,
          choices: [
            { id: 'react', label: t('Tampilan tombol berubah mengikuti tindakanmu') },
            {
              id: 'sig',
              label: t('Keduanya memberi tanda lewat perubahan tampilan'),
              explainWrong: t('Itu kesamaan keduanya. Lampu dan tombol sama-sama memberi sinyal visual.'),
            },
            {
              id: 'see',
              label: t('Keduanya dilihat orang di layar atau di jalan'),
              explainWrong: t('Itu juga kesamaannya. Keduanya dibuat untuk dilihat.'),
            },
          ],
          answer: 'react',
          explainCorrect: t('Lampu lalu lintas berganti mengikuti waktu. State tombol berubah mengikuti klik, keyboard, dan proses.'),
          hints: [t('Bandingkan apa yang menyebabkan perubahan pada tiap benda.')],
          tags: ['state-ui'],
        }),
      ),
      qStep({
        id: 'a09-l03-q7',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi pernyataan tentang format ikon dan sudut komponen.'),
        template: 'Format gambar terbaik untuk ikon agar selalu tajam di segala ukuran adalah ___, dan properti CSS untuk kelengkungan sudut adalah ___.',
        bank: ['SVG', 'border-radius', 'JPEG', 'z-index'],
        answer: ['SVG', 'border-radius'],
        explainCorrect: t('SVG tetap tajam di ukuran berapa pun. border-radius mengatur sudut, dari tegas sampai ramah.'),
        hints: [t('Satu format gambar vektor, satu properti CSS untuk sudut.'), undefined],
        tags: ['state-ui'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a09-l03-r1',
        modes: ['pro'],
        prompt: t('Selain enam state tombol, kolom Input punya dua state tambahan. Apa saja?'),
        choices: [
          { id: 'es', label: t('Error dan Success') },
          {
            id: 'hv',
            label: t('Placeholder dan Label'),
            explainWrong: t('Placeholder dan Label adalah bagian input, bukan state.'),
          },
          {
            id: 'rl',
            label: t('Required dan Optional'),
            explainWrong: t('Required dan Optional menandai wajib atau tidak, bukan keadaan tampilan.'),
          },
        ],
        answer: 'es',
        explainCorrect: t('Kolom input memberi tahu saat isiannya salah (error) atau valid (success).'),
        tags: ['state-ui'],
      }),
      makeTf({
        id: 'a09-l03-r2',
        modes: ['pro'],
        prompt: t('Elemen yang lebih tinggi, seperti Modal, memakai bayangan yang lebih besar dan lembut.'),
        answer: true,
        explainCorrect: t('Bayangan (elevation) membantu mata melihat lapisan mana yang berada di atas.'),
        explainWrong: t('Elemen yang melayang lebih tinggi memang memakai bayangan lebih besar dan lembut.'),
        tags: ['state-ui'],
      }),
      makeMcq({
        id: 'a09-l03-r3',
        modes: ['junior'],
        prompt: t('Tombol Kirim tampil biasa dan belum disentuh. Itu wajah apa?'),
        choices: [
          { id: 'df', label: t('Default') },
          {
            id: 'hv',
            label: t('Hover'),
            explainWrong: t('Hover terjadi saat panah menyentuh tombol. Tombol ini belum disentuh.'),
          },
          {
            id: 'ac',
            label: t('Active'),
            explainWrong: t('Active terjadi saat tombol ditekan. Tombol ini belum ditekan.'),
          },
        ],
        answer: 'df',
        explainCorrect: t('Default adalah wajah biasa tombol. Seperti kamu yang sedang diam di kelas.'),
        hints: [t('Ingat wajah tombol saat tidak ada yang menyentuh.')],
        tags: ['state-ui'],
      }),
      makeMcq({
        id: 'a09-l03-r4',
        modes: ['junior'],
        prompt: t('Kamu menekan Kirim, lalu ikon di tombol berputar. Itu wajah apa?'),
        choices: [
          { id: 'ld', label: t('Loading') },
          {
            id: 'fc',
            label: t('Focus'),
            explainWrong: t('Focus berarti tombol dipilih lewat keyboard. Ia tidak berputar.'),
          },
          {
            id: 'ds',
            label: t('Disabled'),
            explainWrong: t('Disabled berarti tombol pudar dan tidak bisa dipencet. Ia tidak berputar.'),
          },
        ],
        answer: 'ld',
        explainCorrect: t('Loading berputar saat tombol bekerja. Seperti jam pasir yang menunggu pasirnya habis.'),
        hints: [t('Ingat wajah tombol yang sedang bekerja.')],
        tags: ['state-ui'],
      }),
    ],
    recap: t(
      'Satu tombol punya banyak wajah: biasa, disorot, dipilih, ditekan, berputar, dan pudar.',
      'Siapkan state default, hover, focus, active, loading, dan disabled, lalu ikon, radius, dan elevation yang konsisten.',
    ),
    companion: {
      talkPrompts: ['Saat panah menyentuh tombol, apa yang berubah?'],
      offlineActivity:
        'Gambar 4 wajah satu tombol "Kirim" di kertas: diam, menyala, berputar, dan pudar.',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // a09-l04
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a09-l04',
    worldId: 'a09',
    title: 'Tema dan gaya UI',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengenali gaya tampilan dan memilih yang cocok.',
      'Kamu bisa memilih gaya visual UI yang cocok dan menyebut risikonya.',
    ),
    estMinutes: 6,
    introducesTerms: ['gaya-ui'],
    usesTerms: ['ui', 'kontras', 'komponen-ui'],
    atWork: 'Kamu akan memilih dan menguji gaya visual di desain sebelum developer mulai membuat halaman.',
    warmupFrom: 'a09-l03',
    steps: [
      storyStep('a09/gaya-ui.svg', [
        rText(
          'Rumah minimalis dan rumah warna-warni sama-sama nyaman, tetapi kesannya berbeda. Aplikasi juga punya gaya. Apa saja gayanya?',
          'Klien meminta tampilan aplikasi yang "modern", dan tiap desainer membayangkan gaya berbeda. Nama gaya visual membantu tim memilih dengan jelas.',
        ),
      ]),
      conceptStep({
        title: t('Gaya polos, bertumpuk, dan mirip benda', 'Flat, Material, Skeuomorphism'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'gaya-flat-material' },
        alt: t(
          'Tiga kartu: polos, seperti kertas bertumpuk, dan seperti benda sungguhan.',
          'Kartu bergaya Flat Design polos, Material bertumpuk, dan Skeuomorphism menyerupai benda sungguhan.',
        ),
        body: [
          rTermJ('gaya-ui', 'Gaya UI'),
          rJunior(' adalah pakaian tampilan sebuah aplikasi. '),
          rBoldJ('Gaya polos'),
          rJunior(' itu rata dan rapi. '),
          rBoldJ('Gaya bertumpuk'),
          rJunior(' seperti tumpukan kertas. '),
          rBoldJ('Gaya mirip benda'),
          rJunior(' meniru benda sungguhan.'),
          rTermP('gaya-ui', 'Gaya visual UI'),
          rPro(' adalah cara tampilan diberi kesan tertentu. '),
          rBoldP('Flat 2.0'),
          rPro(' adalah gaya polos dengan sedikit bayangan agar tombol tetap dikenali. '),
          rBoldP('Material Design'),
          rPro(' meniru kertas bertumpuk dengan bayangan. '),
          rBoldP('Skeuomorphism'),
          rPro(' meniru tekstur kulit atau logam dari benda sungguhan.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a09-l04-q6',
          prompt: t(
            'Semua tombol tampak polos dan rata. Apa masalahnya?',
            'Apa risiko desain Flat yang terlalu polos, tanpa bayangan atau pembeda warna?',
          ),
          choices: [
            {
              id: 'btn',
              label: t('Sulit membedakan tombol dari hiasan'),
            },
            {
              id: 'load',
              label: t('Halaman jadi lambat dibuka'),
              explainWrong: t(
                'Gaya polos tidak menentukan kecepatan. Tombol yang mirip hiasan sulit dikenali.',
                'Flat Design tidak menentukan kecepatan halaman. Tanpa pembeda, tombol sulit dikenali.',
              ),
            },
            {
              id: 'font',
              label: t('Tulisan terlalu kecil dibaca'),
              explainWrong: t(
                'Ukuran tulisan tidak berubah karena gayanya polos. Yang sulit dikenali adalah tombolnya.',
                'Ukuran huruf tidak ditentukan oleh gaya Flat. Masalahnya ada pada petunjuk elemen yang bisa diklik.',
              ),
            },
          ],
          answer: 'btn',
          explainCorrect: t(
            'Kalau semua tampak sama, tombol sulit dikenali. Seperti pintu yang catnya sama dengan dinding.',
            'Tombol yang tidak berbeda dari hiasan sulit dikenali. Karena itu Flat 2.0 menambahkan sedikit bayangan.',
          ),
          hints: [t('Bayangkan pintu yang catnya sama dengan dinding.', 'Pikirkan cara orang mengenali elemen yang bisa diketuk.')],
          tags: ['gaya-ui'],
        }),
      ),
      conceptStep({
        title: t('Gaya kaca, tanah liat, dan garis tebal', 'Glass, Clay, Neumorphism, Neo-brutalism'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'gaya-modern' },
        alt: t(
          'Panel kaca buram, bentuk gembung, dan kotak bergaris hitam tebal.',
          'Perbandingan Glassmorphism, Claymorphism, Neumorphism, dan Neo-brutalism.',
        ),
        body: [
          rBoldJ('Gaya kaca'),
          rJunior(' tampak seperti kaca buram. '),
          rBoldJ('Gaya tanah liat'),
          rJunior(' gembung dan lembut. '),
          rBoldJ('Gaya garis tebal'),
          rJunior(' tampak tegas seperti gambar spidol.'),
          rBoldP('Glassmorphism'),
          rPro(' memakai panel buram yang tembus pandang. '),
          rBoldP('Claymorphism'),
          rPro(' berbentuk gembung dan pastel, ramah anak. '),
          rBoldP('Neo-brutalism'),
          rPro(' bergaris tegas dengan bayangan keras. '),
          rBoldP('Neumorphism'),
          rPro(' rawan bermasalah karena kontras rendah.'),
        ],
      }),
      simStep(
        'tombol-seribu-wajah',
        t(
          'Lihat tombol yang rapi dan jelas di simulator.',
          'Amati bagaimana gaya Flat 2.0 menjaga tombol tetap jelas di tiap state.',
        ),
      ),
      qStep(
        makeTf({
          id: 'a09-l04-q5',
          prompt: t(
            'Tulisan di atas panel kaca buram bisa sulit dibaca.',
            'Pada Glassmorphism, teks di atas panel buram perlu dicek kontrasnya karena bisa sulit dibaca di atas latar ramai.',
          ),
          answer: true,
          explainCorrect: t(
            'Latar yang ramai mengganggu tulisan. Seperti membaca di kertas bergambar penuh.',
            'Latar ramai di balik panel buram mengurangi kontras. Efek blur juga lebih berat di perangkat lemah.',
          ),
          explainWrong: t(
            'Tulisan di atas kaca buram memang bisa sulit dibaca. Latarnya terlihat tembus.',
            'Panel transparan di atas foto ramai memang rawan membuat teks sulit dibaca.',
          ),
          hints: [t('Ingat membaca di atas gambar yang ramai.')],
          tags: ['gaya-ui', 'kontras'],
        }),
      ),
      qStep({
        id: 'a09-l04-q2',
        type: 'match',
        prompt: t('Pasangkan nama gaya dengan cirinya.', 'Pasangkan nama gaya UI dengan ciri utamanya.'),
        difficulty: 2,
        left: [
          { id: 'g1', label: t('Gaya kaca', 'Glassmorphism') },
          { id: 'g2', label: t('Gaya tanah liat', 'Claymorphism') },
          { id: 'g3', label: t('Gaya garis tebal', 'Neo-brutalism') },
          { id: 'g4', label: t('Gaya mirip benda', 'Skeuomorphism') },
        ],
        right: [
          {
            id: 'r1',
            label: t('Tepinya seperti dicoret spidol hitam', 'Garis tepi hitam tebal, bayangan keras tanpa blur'),
          },
          { id: 'r2', label: t('Latar di belakangnya terlihat samar', 'Panel seperti kaca buram yang tembus pandang') },
          {
            id: 'r3',
            label: t('Tombolnya seperti kayu atau logam', 'Meniru benda sungguhan, misalnya tombol kayu atau logam'),
          },
          { id: 'r4', label: t('Bentuk gembung seperti mainan empuk', 'Bentuk gembung pastel seperti tanah liat empuk') },
        ],
        answer: { g1: 'r2', g2: 'r4', g3: 'r1', g4: 'r3' },
        explainCorrect: t(
          'Tiap gaya punya ciri sendiri. Kaca itu tembus pandang, tanah liat itu gembung.',
          'Glass tembus pandang, Clay gembung dan pastel, Neo-brutalism bergaris tebal, Skeuomorphism meniru benda sungguhan.',
        ),
        hints: [t('Dengar nama gayanya, lalu bayangkan bentuknya.'), undefined],
        tags: ['gaya-ui'],
      }),
      qStep(
        makeMcq({
          id: 'a09-l04-q3',
          type: 'scenario',
          story: t(
            'Bu Laras membuat aplikasi tabungan bank untuk kakek dan nenek.',
            'Bu Laras merancang aplikasi kesehatan dan tabungan bank untuk semua usia, termasuk orang tua.',
          ),
          prompt: t('Gaya apa yang paling tepat?', 'Gaya UI mana yang paling tepat?'),
          difficulty: 2,
          choices: [
            { id: 'flat', label: t('Gaya polos yang rapi', 'Flat 2.0') },
            {
              id: 'clay',
              label: t('Gaya tanah liat yang gembung', 'Claymorphism'),
              explainWrong: t(
                'Gaya tanah liat terasa seperti mainan. Aplikasi bank perlu tampak tenang.',
                'Claymorphism terasa main-main untuk aplikasi bank yang butuh kesan serius.',
              ),
            },
            {
              id: 'neu',
              label: t('Gaya kaca yang buram', 'Neumorphism'),
              explainWrong: t(
                'Latar tembus pandang bisa mengganggu bacaan. Bu Laras perlu menjaga tulisan tetap terbaca.',
                'Neumorphism berkontras rendah, jadi sulit dibaca orang tua.',
              ),
            },
          ],
          answer: 'flat',
          explainCorrect: t(
            'Gaya polos mudah dibaca dan terasa aman. Seperti seragam rapi di kantor bank.',
            'Flat 2.0 membantu membedakan tombol dari latar. Bu Laras bisa menjaga kontras teks dan tombol tetap tinggi.',
          ),
          hints: [t('Pikirkan mata kakek dan nenek saat membaca.', 'Pertimbangkan kontras dan kesan serius.')],
          tags: ['gaya-ui', 'kontras'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a09-l04-q8j',
          type: 'analogy',
          modes: ['junior'],
          prompt: t(
            'Mengapa aplikasi anak dan aplikasi bank memakai gaya berbeda?',
            'Mengapa gaya tampilan perlu menyesuaikan orang yang memakainya?',
          ),
          choices: [
            { id: 'cocok', label: t('Supaya pas untuk orang yang membukanya') },
            {
              id: 'sama',
              label: t('Supaya kedua aplikasi mudah dibedakan'),
              explainWrong: t('Nama dan isi sudah membedakan aplikasi. Gaya mengikuti kebutuhan pemakainya.'),
            },
            {
              id: 'besar',
              label: t('Supaya layar terlihat lebih besar'),
              explainWrong: t('Gaya tidak mengubah ukuran layar. Gaya mengubah kesannya.'),
            },
          ],
          answer: 'cocok',
          explainCorrect: t(
            'Tampilan ceria cocok untuk belajar anak. Tampilan tenang membantu orang membaca informasi bank.',
            'Gaya mengikuti kebutuhan orang yang membuka aplikasi. Anak dan nasabah mencari pengalaman yang berbeda.',
          ),
          difficulty: 2,
          hints: [t('Ingat memilih baju untuk pesta atau olahraga.')],
          tags: ['gaya-ui'],
        }),
      ),
      conceptStep({
        title: t('Minimalism, Bento Grid, dan memilih gaya'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'gaya-minimal-bento' },
        alt: t('Minimalism penuh ruang kosong dan Bento Grid seperti sekat kotak bekal.'),
        modes: ['pro'],
        body: [
          rBoldP('Minimalism'),
          rPro(' menonjolkan isi utama dengan banyak ruang kosong. '),
          rBoldP('Bento Grid'),
          rPro(' membagi fitur ke dalam kotak, seperti sekat kotak bekal. '),
          rBoldP('Editorial'),
          rPro(' meminjam tata letak majalah, dengan judul besar dan banyak foto. Pilih gaya yang cocok dengan produk dan orang yang memakainya.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a09-l04-q1',
          type: 'analogy',
          modes: ['pro'],
          prompt: t('Mengapa Bento Grid dinamai seperti kotak bekal Jepang?'),
          choices: [
            { id: 'sekat', label: t('Isinya disusun dalam kotak-kotak berbeda ukuran') },
            {
              id: 'makan',
              label: t('Gaya ini hanya cocok dipakai di situs restoran'),
              explainWrong: t('Bento Grid sering dipakai di halaman fitur produk dan portofolio.'),
            },
            {
              id: 'kulit',
              label: t('Mengambil palet warnanya dari makanan Jepang'),
              explainWrong: t('Nama itu merujuk pada sekat kotak, bukan pada warna.'),
            },
          ],
          answer: 'sekat',
          explainCorrect: t('Tiap sekat memuat satu poin informasi yang mudah dipindai. Susunan ini mirip isi kotak bekal.'),
          hints: [t('Pikirkan bentuk kotak bekal yang bersekat.')],
          tags: ['gaya-ui'],
        }),
      ),
      limitStep({
        analogy: t('Gaya UI seperti pakaian atau gaya arsitektur rumah'),
        same: [t('Memilih gaya perlu menyesuaikan siapa yang memakai dan suasana produknya.')],
        different: [
          t('Gaya hanyalah "pakaian". Prinsip tata letak dan kontras tetap wajib dipenuhi di gaya mana pun.'),
          t('Satu aplikasi bisa berganti tema, misalnya ke Dark UI, tanpa mengubah isi dan fungsi tombol.'),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeMcq({
          id: 'a09-l04-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Gaya UI sebagai pakaian luar'),
          prompt: t('Gaya UI berganti seperti pakaian. Apa yang tetap berlaku?'),
          difficulty: 2,
          choices: [
            { id: 'base', label: t('Aturan kontras dan kemudahan pakai') },
            {
              id: 'nohtml',
              label: t('Radius sudut dan bentuk bayangan'),
              explainWrong: t('Radius dan bayangan bisa berubah. Kontras tetap perlu cukup agar tulisan terbaca.'),
            },
            {
              id: 'only',
              label: t('Palet warna dan jenis huruf'),
              explainWrong: t('Warna dan huruf bisa berubah. Keduanya tetap harus mudah dibaca.'),
            },
          ],
          answer: 'base',
          explainCorrect: t('Gaya adalah pakaian, bukan badannya. Prinsip tata letak dan kontras tetap nomor satu.'),
          hints: [t('Pakaian berganti, tetapi tubuh di dalamnya tetap sama.')],
          tags: ['gaya-ui'],
        }),
      ),
      qStep({
        id: 'a09-l04-q7',
        type: 'type',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Tulis nama gaya UI yang meniru tata letak majalah dengan judul besar dan banyak foto.'),
        accept: ['Editorial', 'editorial', 'Editorial Design', 'editorial design', 'Gaya Editorial', 'gaya editorial'],
        explainCorrect: t('Gaya Editorial meminjam tata letak majalah cetak untuk cerita dan publikasi.'),
        hints: [t('Pikirkan halaman majalah atau koran.'), undefined],
        tags: ['gaya-ui'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a09-l04-r1',
        prompt: t(
          'Bito ingin situsnya tampak berani dan tegas. Gaya apa yang cocok?',
          'Gaya UI mana yang cocok untuk portofolio agensi kreatif yang ingin tampil berani dengan garis tepi hitam tebal?',
        ),
        choices: [
          { id: 'nb', label: t('Gaya garis tebal', 'Neo-brutalism') },
          {
            id: 'clay',
            label: t('Gaya tanah liat', 'Claymorphism'),
            explainWrong: t(
              'Gaya tanah liat gembung dan lembut. Bentuknya seperti mainan empuk.',
              'Claymorphism berkesan lembut dan pastel seperti tanah liat.',
            ),
          },
          {
            id: 'gl',
            label: t('Gaya kaca', 'Glassmorphism'),
            explainWrong: t(
              'Gaya kaca tembus pandang. Kesan halus muncul dari lapisan buram.',
              'Glassmorphism berkesan ringan dan tembus pandang, bukan tegas dan berani.',
            ),
          },
        ],
        answer: 'nb',
        explainCorrect: t(
          'Gaya garis tebal tampak tegas. Seperti gambar kartun dengan garis spidol.',
          'Neo-brutalism menonjolkan garis hitam tebal, bayangan keras, dan warna kontras berani.',
        ),
        hints: [t('Cari gaya yang tampak seperti dicoret spidol hitam.')],
        tags: ['gaya-ui'],
      }),
      makeTf({
        id: 'a09-l04-r2',
        modes: ['pro'],
        prompt: t('Minimalism berarti membuang semua petunjuk penting sampai layar terlihat kosong.'),
        answer: false,
        explainCorrect: t('Pernyataan itu keliru: Minimalism membuang hiasan yang tidak perlu, tetapi tetap menjaga petunjuk penting.'),
        explainWrong: t('Minimalis bukan berarti kosong. Informasi penting tetap harus ada dan mudah dipahami.'),
        tags: ['gaya-ui'],
      }),
      makeTf({
        id: 'a09-l04-r3',
        modes: ['junior'],
        prompt: t('Tombol yang polos tanpa bayangan bisa sulit dikenali.'),
        answer: true,
        explainCorrect: t('Tombol polos mirip hiasan. Seperti pintu yang catnya sama dengan dinding.'),
        explainWrong: t('Tombol polos memang bisa tampak seperti hiasan. Orang jadi sulit menemukannya.'),
        hints: [t('Bayangkan pintu yang catnya sama dengan dinding.')],
        tags: ['gaya-ui'],
      }),
    ],
    recap: t(
      'Gaya UI adalah pakaian aplikasi yang dipilih agar cocok dengan pemakainya.',
      'Pilih gaya UI (Flat 2.0, Material, Glassmorphism, Claymorphism, Neo-brutalism, Minimalism, Bento Grid) sesuai produk, dan jaga kontras.',
    ),
    companion: {
      talkPrompts: ['Aplikasi anak cocok bergaya gembung berwarna cerah atau serba hitam?'],
      offlineActivity:
        'Gambar kartu harga yang sama dalam dua gaya di kertas: satu polos rapi, satu bergaris hitam tebal.',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // a09-l05 (khusus Pro)
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a09-l05',
    worldId: 'a09',
    title: 'Design system dan token',
    modes: ['pro'],
    objective: t('Kamu bisa menjelaskan tiga bagian design system dan menulis design token di CSS.'),
    estMinutes: 5,
    introducesTerms: ['design-token'],
    usesTerms: ['komponen-ui', 'state-ui', 'gaya-ui', 'css'],
    atWork: 'Kamu akan mengubah satu nilai token warna, lalu melihat semua tombol dan kartu di aplikasi ikut berubah.',
    warmupFrom: 'a09-l04',
    steps: [
      storyStep('a09/lego-ds.svg', [
        rText(
          'Tim mengganti warna merek, lalu harus mengubah 200 file CSS satu per satu. Design system ibarat kotak LEGO standar, dan design token (nama untuk nilai desain) ibarat nama kontak di HP.',
        ),
      ]),
      conceptStep({
        title: t('Tiga pilar design system'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'design-system-pilar' },
        alt: t('Style guide, Component library, dan Dokumentasi membentuk Design System.'),
        body: [
          rTerm('design-token', 'Design system'),
          rText(
            ' dipakai bersama oleh desainer dan developer, dan berisi tiga bagian. Style guide mengatur warna, huruf, dan jarak. Component library menyimpan tombol, kartu, dan modal lengkap dengan ',
          ),
          rTerm('state-ui', 'state'),
          rText('. Dokumentasi menjelaskan kapan tiap komponen dipakai.'),
        ],
      }),
      qStep({
        id: 'a09-l05-q2',
        type: 'match',
        prompt: t('Pasangkan tiap bagian design system dengan isinya.'),
        difficulty: 2,
        left: [
          { id: 'sg', label: t('Style guide') },
          { id: 'cl', label: t('Component library') },
          { id: 'doc', label: t('Dokumentasi') },
        ],
        right: [
          { id: 'r1', label: t('Tombol, input, kartu, dan modal lengkap dengan state') },
          { id: 'r2', label: t('Aturan warna, huruf, ikon, jarak, dan nada bahasa') },
          { id: 'r3', label: t('Petunjuk kapan dan bagaimana tiap komponen dipakai') },
        ],
        answer: { sg: 'r2', cl: 'r1', doc: 'r3' },
        explainCorrect: t('Style guide mengatur tampilan, component library menyimpan komponen, dan dokumentasi menjelaskan cara memakainya.'),
        hints: [t('Cocokkan dulu bagian yang namanya paling jelas.'), undefined],
        tags: ['design-token'],
      }),
      conceptStep({
        title: t('Design token: satu nama, satu nilai'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'design-token-css' },
        alt: t('Contoh CSS custom properties --color-primary dan --space-4 dipakai oleh .tombol.'),
        code: {
          lang: 'css',
          code: ':root {\n  --color-primary: #2F6FED;\n  --space-2: 8px;\n  --space-4: 16px;\n  --radius-md: 8px;\n}\n.tombol {\n  background: var(--color-primary);\n  padding: var(--space-2) var(--space-4);\n  border-radius: var(--radius-md);\n}',
          highlight: [2, 8],
        },
        body: [
          rTerm('design-token', 'Design token'),
          rText(' memberi nama bermakna pada nilai desain. Tanpa token, kamu menulis '),
          rCode('#2F6FED'),
          rText(' berulang kali di 200 file. Dengan token, cukup ubah satu baris di '),
          rCode(':root'),
          rText('.'),
        ],
      }),
      simStep(
        'tombol-seribu-wajah',
        t('Amati bagaimana satu tombol standar mengikuti token warna, padding, dan radius.'),
      ),
      qStep({
        id: 'a09-l05-q3',
        type: 'spotbug',
        prompt: t('Ketuk baris CSS yang masih menulis kode warna langsung, padahal sudah ada token warna merek.'),
        difficulty: 2,
        lines: [
          '.tombol-aksi {',
          '  background: var(--color-primary);',
          '  border-color: #2F6FED;',
          '  padding: var(--space-2) var(--space-4);',
          '}',
        ],
        answer: [3],
        explainCorrect: t('Baris 3 menulis #2F6FED langsung. Ganti dengan var(--color-primary) agar ikut berubah bersama token.'),
        hints: [t('Cari nilai yang tidak memakai var(...).'), undefined],
        tags: ['design-token'],
      }),
      conceptStep({
        title: t('Contoh terbuka dan proyek kecil'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'design-system-contoh' },
        alt: t('Referensi design system populer dan aturan sederhana untuk proyek kecil.'),
        body: [
          rText(
            'Beberapa design system terbuka bisa dipelajari: Material Design, Fluent, Carbon, dan Polaris. Untuk proyek kecil, cukup satu halaman berisi warna, skala huruf, jarak, dan komponen dasar yang dipakai konsisten.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a09-l05-q5',
          type: 'scenario',
          story: t('Dimas membuat aplikasi catatan sendirian. Ia ragu harus membangun design system sebesar Material Design lebih dulu.'),
          prompt: t('Apa langkah paling masuk akal untuk proyek kecil ini?'),
          difficulty: 2,
          choices: [
            { id: 'mini', label: t('Buat satu halaman aturan warna, huruf, jarak, dan komponen dasar') },
            {
              id: 'big',
              label: t('Tiru seluruh Material Design sebelum menulis fitur pertama'),
              explainWrong: t('Itu menambah banyak pekerjaan sebelum fitur pertama bisa dibuat.'),
            },
            {
              id: 'none',
              label: t('Tentukan warna dan jarak saat membuat tiap halaman'),
              explainWrong: t('Tanpa aturan bersama, tiap halaman bisa memakai nilai berbeda. Satu halaman panduan membantu menjaga tampilan tetap konsisten.'),
            },
          ],
          answer: 'mini',
          explainCorrect: t('Proyek kecil cukup memakai aturan sederhana yang dipakai dengan disiplin.'),
          hints: [t('Ukuran aturan harus sesuai ukuran proyek.')],
          tags: ['design-token'],
        }),
      ),
      limitStep({
        analogy: t('Design token seperti nama kontak "Ibu" di HP'),
        same: [t('Mengubah nilai di satu tempat otomatis memperbarui semua pemakainya.')],
        different: [
          t('Token bisa berlapis: token warna dasar dirujuk token bernama fungsi, seperti warna tombol, dan berganti nilai di Dark Mode.'),
          t('Design system tidak menggantikan alasan di balik desain. Tim tetap perlu membaca dokumentasi.'),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeMcq({
          id: 'a09-l05-q1',
          type: 'analogy',
          prompt: t('Mengapa design system sering diibaratkan keping LEGO yang baku?'),
          choices: [
            { id: 'same', label: t('Siapa pun yang merakit, hasilnya serasi') },
            {
              id: 'hard',
              label: t('Setiap keping hanya cocok untuk satu halaman'),
              explainWrong: t('Komponen dan token dipakai ulang di banyak halaman.'),
            },
            {
              id: 'one',
              label: t('Setiap tim harus membuat kepingnya sendiri'),
              explainWrong: t('Tim memakai keping yang sama, jadi hasilnya seragam.'),
            },
          ],
          answer: 'same',
          explainCorrect: t('Aturan dan keping yang baku membuat halaman baru tetap serasi. Seperti rakitan LEGO dari kotak yang sama.'),
          hints: [t('Pikirkan siapa pun yang merakit dari kotak yang sama.')],
          tags: ['design-token'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a09-l05-q4',
          type: 'limit',
          analogy: t('Token seperti kontak telepon bernama "Ibu"'),
          prompt: t('Apa yang bisa dilakukan design token CSS tetapi tidak bisa dilakukan satu kontak telepon?'),
          difficulty: 2,
          choices: [
            { id: 'theme', label: t('Menukar seluruh palet nilai untuk mode gelap') },
            {
              id: 'save',
              label: t('Menyimpan nilai di satu tempat pusat yang rapi'),
              explainWrong: t('Itu kesamaan keduanya. Kontak juga menyimpan nomor di satu tempat.'),
            },
            {
              id: 'alias',
              label: t('Memberi nama yang lebih mudah diingat daripada kode'),
              explainWrong: t('Itu juga kesamaannya. Nama kontak lebih mudah diingat daripada nomor.'),
            },
          ],
          answer: 'theme',
          explainCorrect: t('Token bisa memiliki nilai berbeda untuk mode gelap dan terang. Semua komponen ikut menyesuaikan.'),
          hints: [t('Pikirkan apa yang terjadi saat tema berganti.')],
          tags: ['design-token'],
        }),
      ),
      qStep({
        id: 'a09-l05-q6',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi CSS: buat token jarak 16px, lalu pakai di kartu.'),
        template: ':root { --space-4: ___; }\n.kartu { padding: var(___); }',
        bank: ['16px', '--space-4', '#2F6FED', 'var'],
        answer: ['16px', '--space-4'],
        explainCorrect: t('Token dideklarasikan dengan dua tanda hubung (--) di :root, lalu dipanggil dengan var(...).'),
        hints: [t('Nama token diawali dua tanda hubung.'), undefined],
        tags: ['design-token'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a09-l05-r1',
        prompt: t('Mengapa menulis #2F6FED di 200 tempat sebaiknya diganti design token --color-primary?'),
        choices: [
          { id: 'easy', label: t('Cukup ubah satu baris saat warna merek berganti') },
          {
            id: 'dark',
            label: t('Kode warna yang diulang membuat CSS tidak valid'),
            explainWrong: t('Kode warna yang diulang tetap valid. Masalahnya, CSS sulit dirawat.'),
          },
          {
            id: 'sp',
            label: t('Halaman memuat warna lebih cepat'),
            explainWrong: t('Token tidak mempercepat halaman. Token memudahkan perawatan.'),
          },
        ],
        answer: 'easy',
        explainCorrect: t('Token menghemat waktu saat merek atau tema berubah.'),
        tags: ['design-token'],
      }),
      makeTf({
        id: 'a09-l05-r2',
        prompt: t('Polaris dan Carbon adalah contoh design system terbuka yang bisa dipelajari.'),
        answer: true,
        explainCorrect: t('Material Design dan Fluent juga terbuka, sama seperti Polaris dan Carbon.'),
        explainWrong: t('Keduanya memang contoh design system terbuka yang populer.'),
        tags: ['design-token'],
      }),
    ],
    recap: t('Design system menyatukan aturan dan komponen. Design token menyimpan nilai desain di satu nama pusat.'),
  }),

  // ---------------------------------------------------------------------------------------------
  // a09-l06 (khusus Pro)
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a09-l06',
    worldId: 'a09',
    title: 'Atomic design',
    modes: ['pro'],
    objective: t('Kamu bisa mengurutkan elemen UI dari Atom sampai Page dengan pola Atomic Design.'),
    estMinutes: 5,
    introducesTerms: ['atomic-design'],
    usesTerms: ['komponen-ui', 'design-token', 'wireframe'],
    atWork: 'Kamu akan menemukan folder atoms, molecules, dan organisms di sebagian proyek React dan pustaka komponen.',
    warmupFrom: 'a09-l05',
    steps: [
      storyStep('a09/atomic-design.svg', [
        rText(
          'Developer baru membuka proyek dan menemukan folder bernama atoms, molecules, dan organisms. Cara menyusun halaman dari keping kecil hingga utuh disebut Atomic Design.',
        ),
      ]),
      conceptStep({
        title: t('Atom dan Molecule'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'atomic-atom-molecule' },
        alt: t('Atom berupa label, input, tombol; bergabung menjadi Molecule kotak pencarian.'),
        body: [
          rTerm('atomic-design', 'Atomic Design'),
          rText(' dimulai dari '),
          rBold('Atom'),
          rText(', yaitu bagian terkecil yang tidak dipecah lagi, seperti label, input, tombol, dan ikon. '),
          rBold('Molecule'),
          rText(' adalah gabungan beberapa atom yang bekerja bersama, misalnya kotak pencarian.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a09-l06-q2',
          type: 'analogy',
          prompt: t('Tombol Cari dan kotak input adalah Atom. Gabungan keduanya menjadi kotak pencarian disebut apa?'),
          choices: [
            { id: 'mol', label: t('Molecule') },
            {
              id: 'tpl',
              label: t('Template'),
              explainWrong: t('Template adalah kerangka tata letak satu halaman, bukan satu kotak pencarian.'),
            },
            {
              id: 'page',
              label: t('Organism'),
              explainWrong: t('Organism lebih besar, misalnya header lengkap. Kotak pencarian hanya gabungan kecil.'),
            },
          ],
          answer: 'mol',
          explainCorrect: t('Gabungan beberapa atom yang menjalankan satu tugas kecil disebut Molecule. Kotak pencarian contohnya.'),
          hints: [t('Dua atom bergabung, tetapi belum sebesar header.')],
          tags: ['atomic-design'],
        }),
      ),
      conceptStep({
        title: t('Organism'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'atomic-organism' },
        alt: t('Organism berupa header yang menggabungkan logo, menu navigasi, dan molecule pencarian.'),
        body: [
          rBold('Organism'),
          rText(' adalah gabungan molecule dan atom yang membentuk satu bagian tampilan mandiri. Contohnya '),
          rCode('<header>'),
          rText(' berisi logo, menu navigasi, dan kotak pencarian.'),
        ],
      }),
      qStep({
        id: 'a09-l06-q3',
        type: 'sort',
        prompt: t('Kelompokkan elemen ini ke tingkat Atom atau Organism.'),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('Ikon kaca pembesar') },
          { id: 'i2', label: t('Bilah Header berisi logo, menu, dan pencarian') },
          { id: 'i3', label: t('Label teks "Email"') },
          { id: 'i4', label: t('Deretan Kartu Produk lengkap di katalog') },
        ],
        bins: [
          { id: 'atom', label: t('Atom') },
          { id: 'org', label: t('Organism') },
        ],
        answer: { i1: 'atom', i2: 'org', i3: 'atom', i4: 'org' },
        explainCorrect: t('Atom adalah bagian tunggal terkecil. Organism adalah bagian tampilan yang kompleks.'),
        hints: [t('Tanya dirimu: bagian ini masih bisa dipecah lagi?'), undefined],
        tags: ['atomic-design'],
      }),
      conceptStep({
        title: t('Template dan Page'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'atomic-template-page' },
        alt: t('Template kerangka tata letak tanpa isi asli, lalu Page berisi konten sesungguhnya.'),
        body: [
          rBold('Template'),
          rText(' menyusun organism menjadi kerangka halaman tanpa isi asli, mirip '),
          rTerm('wireframe', 'wireframe'),
          rText(' yang lebih terstruktur. '),
          rBold('Page'),
          rText(' adalah template yang sudah diisi teks, gambar, dan data sungguhan.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a09-l06-q5',
          type: 'scenario',
          story: t('Nadia ingin menguji tata letak halaman produk memakai teks contoh sementara untuk judul dan foto.'),
          prompt: t('Tingkat Atomic Design mana yang ia tinjau?'),
          difficulty: 2,
          choices: [
            { id: 'tpl', label: t('Template') },
            {
              id: 'atom',
              label: t('Atom (bagian terkecil)'),
              explainWrong: t('Nadia meninjau kerangka seluruh halaman, bukan satu tombol.'),
            },
            {
              id: 'page',
              label: t('Page (halaman sungguhan)'),
              explainWrong: t('Page memakai konten sungguhan. Nadia masih memakai teks contoh.'),
            },
          ],
          answer: 'tpl',
          explainCorrect: t('Template menguji struktur tata letak sebelum konten asli masuk ke Page.'),
          hints: [t('Teks contoh sementara berarti isinya belum asli.')],
          tags: ['atomic-design'],
        }),
      ),
      simStep(
        'tombol-seribu-wajah',
        t('Amati tombol "Simpan Pesanan" sebagai contoh Atom yang nanti masuk ke Molecule dan Organism.'),
      ),
      qStep({
        id: 'a09-l06-q1',
        type: 'order',
        prompt: t('Urutkan lima tingkat Atomic Design dari yang paling kecil ke paling utuh.'),
        difficulty: 2,
        items: [
          { id: 'org', label: t('Organism (contoh: header lengkap)') },
          { id: 'atom', label: t('Atom (contoh: tombol atau input)') },
          { id: 'page', label: t('Page (template berisi konten sungguhan)') },
          { id: 'mol', label: t('Molecule (contoh: kotak pencarian)') },
          { id: 'tpl', label: t('Template (kerangka halaman)') },
        ],
        answer: ['atom', 'mol', 'org', 'tpl', 'page'],
        explainCorrect: t('Urutannya Atom, Molecule, Organism, Template, lalu Page. Tiap tingkat menggabungkan tingkat sebelumnya.'),
        hints: [t('Mulai dari bagian yang tidak bisa dipecah lagi.'), undefined],
        tags: ['atomic-design'],
      }),
      limitStep({
        analogy: t('Susunan tampilan seperti atom kimia yang membentuk benda'),
        same: [t('Bagian besar dibangun dengan menggabungkan komponen kecil yang sama berulang kali.')],
        different: [
          t('Batas antara Molecule dan Organism tidak sekaku ikatan kimia. Tim bebas menyepakati kelompoknya.'),
          t('Di React atau Vue, semuanya tetap ditulis sebagai "komponen" yang saling memanggil.'),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeMcq({
          id: 'a09-l06-q4',
          type: 'limit',
          analogy: t('Atomic Design seperti atom kimia'),
          prompt: t('Apa yang boleh disesuaikan tim saat memakai Atomic Design di proyek?'),
          difficulty: 2,
          choices: [
            { id: 'flex', label: t('Letak batas antara Molecule dan Organism') },
            {
              id: 'small',
              label: t('Komponen besar dibangun dari komponen kecil'),
              explainWrong: t('Itu prinsip inti Atomic Design, bukan bagian yang boleh disesuaikan.'),
            },
            {
              id: 'reuse',
              label: t('Bagian kecil dipakai ulang di banyak tempat'),
              explainWrong: t('Pemakaian ulang juga prinsip inti, jadi tetap dijaga.'),
            },
          ],
          answer: 'flex',
          explainCorrect: t('Atomic Design adalah cara berpikir, bukan aturan kaku. Tim boleh menyesuaikan batas antartingkat.'),
          hints: [t('Pikirkan bagian yang bisa disepakati tim.')],
          tags: ['atomic-design'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a09-l06-q6',
          prompt: t('Atomic Design sejalan dengan komponen yang disusun di dalam komponen lain di React dan Vue.'),
          answer: true,
          explainCorrect: t('Di React dan Vue, komponen kecil disusun di dalam komponen lebih besar hingga membentuk halaman.'),
          explainWrong: t('Komponen di React dan Vue memang disusun bertingkat, seperti Atomic Design.'),
          tags: ['atomic-design', 'komponen-ui'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a09-l06-r1',
        prompt: t('Pada Atomic Design, tingkat mana yang paling kecil dan tidak dipecah lagi?'),
        choices: [
          { id: 'atom', label: t('Atom (seperti tombol atau ikon)') },
          {
            id: 'org',
            label: t('Organism (seperti bilah atas lengkap)'),
            explainWrong: t('Organism adalah gabungan banyak komponen kecil.'),
          },
          {
            id: 'mol',
            label: t('Molecule (seperti kotak pencarian)'),
            explainWrong: t('Molecule menggabungkan beberapa atom, jadi bukan yang terkecil.'),
          },
        ],
        answer: 'atom',
        explainCorrect: t('Atom adalah bagian dasar yang tidak dipecah lagi.'),
        tags: ['atomic-design'],
      }),
      makeMcq({
        id: 'a09-l06-r2',
        prompt: t('Apa perbedaan utama antara Template dan Page?'),
        choices: [
          { id: 'p', label: t('Template masih kerangka, Page sudah berisi konten') },
          {
            id: 's',
            label: t('Template untuk HP, Page untuk laptop'),
            explainWrong: t('Keduanya bisa dibuat responsif. Bedanya ada pada isi kontennya.'),
          },
          {
            id: 'rev',
            label: t('Template berisi data asli, Page berisi kerangka'),
            explainWrong: t('Itu terbalik: Template tanpa isi asli, dan Page berisi isi asli.'),
          },
        ],
        answer: 'p',
        explainCorrect: t('Page adalah wujud akhir Template setelah diisi foto, judul, dan data asli.'),
        tags: ['atomic-design'],
      }),
    ],
    recap: t('Atomic Design menyusun tampilan bertahap: Atom, Molecule, Organism, Template, lalu Page. Cara ini sejalan dengan komponen framework.'),
  }),
];
