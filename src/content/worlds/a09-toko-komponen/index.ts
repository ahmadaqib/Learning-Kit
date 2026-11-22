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
  id: 'a09',
  track: 'A',
  order: 9,
  title: 'Toko Komponen',
  tagline: t(
    'Merakit keping tombol, kartu, dan gaya antarmuka seperti LEGO.',
    'Memahami grid 12 kolom, skala 8pt, kamus komponen, state UI, gaya visual, design token, dan atomic design.',
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
      'Halo! Ayo buktikan kamu kenal keping komponen, wajah tombol, dan gaya tampilan!',
      'Uji pemahamanmu tentang grid 12 kolom, skala 8pt, kamus komponen UI, state, gaya visual, design token, dan atomic design.',
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
        prompt: t('Kotak pilihan tempat kamu hanya boleh memilih SATU jawaban saja disebut…'),
        choices: [
          {
            id: 'radio',
            label: t('Radio button'),
            explainWrong: t('Benar, radio hanya untuk satu pilihan.'),
          },
          {
            id: 'checkbox',
            label: t('Checkbox'),
            explainWrong: t('Checkbox dipakai jika kamu boleh mencentang banyak pilihan sekaligus.'),
          },
          {
            id: 'toast',
            label: t('Toast'),
            explainWrong: t('Toast adalah pesan singkat yang muncul sebentar lalu hilang.'),
          },
        ],
        answer: 'radio',
        explainCorrect: t('Radio button dipakai saat pengguna hanya boleh memilih satu opsi.'),
        tags: ['komponen-ui'],
      }),
      makeAnchorMcq({
        id: 'a09-anc-j2',
        prompt: t('Pesan kecil bertuliskan "Disimpan!" yang muncul sebentar lalu hilang sendiri adalah…'),
        choices: [
          { id: 'toast', label: t('Toast / Snackbar') },
          {
            id: 'modal',
            label: t('Modal / Dialog'),
            explainWrong: t('Modal menutupi layar dan meminta perhatian penuh sampai ditutup.'),
          },
          {
            id: 'navbar',
            label: t('Navbar'),
            explainWrong: t('Navbar adalah bilah menu utama di bagian atas halaman.'),
          },
        ],
        answer: 'toast',
        explainCorrect: t('Toast memberi kabar singkat tanpa menghalangi layar terlalu lama.'),
        tags: ['komponen-ui'],
      }),
      makeAnchorMcq({
        id: 'a09-anc-j3',
        prompt: t('Saat tombol sedang mengirim data dan memutar ikon agar tidak diklik dua kali, itu state…'),
        choices: [
          { id: 'loading', label: t('Loading') },
          {
            id: 'hover',
            label: t('Hover'),
            explainWrong: t('Hover terjadi saat panah mouse menyorot tombol.'),
          },
          {
            id: 'default',
            label: t('Default'),
            explainWrong: t('Default adalah keadaan biasa sebelum disentuh atau diproses.'),
          },
        ],
        answer: 'loading',
        explainCorrect: t('State loading menandakan sistem sedang memproses permintaanmu.'),
        tags: ['state-ui'],
      }),
      makeAnchorMcq({
        id: 'a09-anc-j4',
        prompt: t('Aplikasi belajar anak yang memakai bentuk gembung empuk dan warna pastel cocok memakai gaya…'),
        choices: [
          { id: 'clay', label: t('Claymorphism') },
          {
            id: 'dark',
            label: t('Dark UI serba hitam tajam'),
            explainWrong: t('Tampilan gelap tajam lebih sering dipakai aplikasi kerja developer atau hiburan.'),
          },
          {
            id: 'retro',
            label: t('Retro piksel kaku'),
            explainWrong: t('Claymorphism terasa paling empuk dan ramah anak.'),
          },
        ],
        answer: 'clay',
        explainCorrect: t('Claymorphism berbentuk lembut seperti tanah liat warna pastel yang ramah anak.'),
        tags: ['gaya-ui'],
      }),
      makeAnchorMcq({
        id: 'a09-anc-j5',
        prompt: t('Apa batas yang membedakan komponen UI di layar dengan keping LEGO plastik sungguhan?'),
        type: 'limit',
        analogy: t('Komponen UI seperti keping LEGO'),
        choices: [
          {
            id: 'dyn',
            label: t('Komponen UI bisa berubah wajah sesuai keadaan (hover, loading, disabled)'),
          },
          {
            id: 'reuse',
            label: t('Sama-sama bisa dipakai ulang di banyak tempat'),
            explainWrong: t('Itu justru persamaan utama komponen UI dan LEGO.'),
          },
          {
            id: 'fit',
            label: t('Sama-sama membuat susunan terlihat seragam'),
            explainWrong: t('Ini juga persamaan keduanya.'),
          },
        ],
        answer: 'dyn',
        explainCorrect: t('Tidak seperti plastik yang kaku, komponen UI punya berbagai state yang berubah otomatis.'),
        tags: ['komponen-ui', 'state-ui'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a09-anc-p1',
        prompt: t('Mengapa sistem grid web paling sering memilih tepat 12 kolom?'),
        choices: [
          {
            id: 'div',
            label: t('Karena angka 12 habis dibagi 2, 3, 4, dan 6 sehingga fleksibel untuk berbagai susunan'),
          },
          {
            id: 'px',
            label: t('Karena lebar setiap layar komputer selalu tepat 1200px'),
            explainWrong: t('Lebar layar sangat beragam dari HP hingga monitor besar.'),
          },
          {
            id: 'css',
            label: t('Karena CSS Grid melarang kolom lebih dari 12'),
            explainWrong: t('CSS Grid bisa membuat berapa pun kolom.'),
          },
        ],
        answer: 'div',
        explainCorrect: t('12 kolom mudah dibagi menjadi 2×6, 3×4, 4×3, atau kombinasi 3+9 untuk sidebar dan konten.'),
        tags: ['grid-8pt'],
      }),
      makeAnchorMcq({
        id: 'a09-anc-p2',
        prompt: t('Kapan sebuah aplikasi sebaiknya memakai Accordion dibanding Tabs?'),
        choices: [
          {
            id: 'acc',
            label: t('Saat menampilkan daftar FAQ yang perlu dibuka-tutup per bagian di ruang vertikal'),
          },
          {
            id: 'tab',
            label: t('Saat ingin berpindah antarhalaman lain di situs berbeda'),
            explainWrong: t('Perpindahan antarhalaman menggunakan Navbar atau tautan navigasi.'),
          },
          {
            id: 'toast',
            label: t('Saat memberi kabar singkat "Berhasil disimpan" yang hilang sendiri'),
            explainWrong: t('Kabar singkat sementara adalah tugas Toast/Snackbar.'),
          },
        ],
        answer: 'acc',
        explainCorrect: t('Accordion membuka dan menutup panel konten langsung di tempat, sangat umum untuk daftar FAQ.'),
        tags: ['komponen-ui'],
      }),
      makeAnchorMcq({
        id: 'a09-anc-p3',
        prompt: t('Mengapa gaya Neumorphism berisiko bermasalah pada aplikasi perbankan?'),
        choices: [
          {
            id: 'low',
            label: t('Kontras antara tombol dan latar sewarna terlalu rendah sehingga sulit dibaca'),
          },
          {
            id: 'html',
            label: t('Neumorphism tidak mendukung tag <button>'),
            explainWrong: t('Masalahnya ada pada keterbacaan visual dan aksesibilitas kontras.'),
          },
          {
            id: 'fast',
            label: t('Neumorphism membuat situs terlalu cepat dimuat'),
            explainWrong: t('Kecepatan bukan masalahnya; kontras rendah dan aksesibilitaslah risikonya.'),
          },
        ],
        answer: 'low',
        explainCorrect: t('Latar dan elemen yang sama warna membuat kontras rendah dan kurang ramah aksesibilitas.'),
        tags: ['gaya-ui', 'kontras'],
      }),
      makeAnchorMcq({
        id: 'a09-anc-p4',
        prompt: t('Manfaat utama menyimpan warna merek sebagai design token --color-primary di :root adalah…'),
        choices: [
          {
            id: 'one',
            label: t('Jika warna merek berubah, cukup mengubah satu baris nilai dan seluruh komponen ikut berubah'),
          },
          {
            id: 'net',
            label: t('Website bisa terbuka tanpa koneksi internet'),
            explainWrong: t('Design token mengatur konsistensi nilai CSS, bukan jaringan offline.'),
          },
          {
            id: 'sec',
            label: t('Menyembunyikan kode CSS dari browser DevTools'),
            explainWrong: t('Variabel CSS tetap terlihat di browser.'),
          },
        ],
        answer: 'one',
        explainCorrect: t('Design token memusatkan keputusan desain menjadi satu sumber kebenaran.'),
        tags: ['design-token'],
      }),
      makeAnchorMcq({
        id: 'a09-anc-p5',
        prompt: t('Dalam urutan Atomic Design, gabungan label + input + tombol Cari menjadi satu kotak pencarian termasuk tingkat…'),
        choices: [
          { id: 'mol', label: t('Molecule') },
          {
            id: 'atom',
            label: t('Atom'),
            explainWrong: t('Atom adalah bagian tunggal terkecil seperti tombol saja atau input saja.'),
          },
          {
            id: 'page',
            label: t('Page'),
            explainWrong: t('Page adalah halaman lengkap yang sudah diisi konten sungguhan.'),
          },
        ],
        answer: 'mol',
        explainCorrect: t('Beberapa Atom yang bergabung membentuk satu unit fungsi disebut Molecule.'),
        tags: ['atomic-design'],
      }),
      makeAnchorMcq({
        id: 'a09-anc-p6',
        type: 'limit',
        analogy: t('Design token seperti menyimpan nomor di kontak HP'),
        choices: [
          {
            id: 'tier',
            label: t('Design token bisa berlapis (token warna dasar dirujuk oleh token semantik dan tema gelap)'),
          },
          {
            id: 'rename',
            label: t('Mengubah satu sumber otomatis memperbarui semua pemakainya'),
            explainWrong: t('Ini adalah bagian yang sama dengan buku kontak.'),
          },
          {
            id: 'label',
            label: t('Lebih mudah mengingat nama bermakna daripada angka mentah'),
            explainWrong: t('Ini juga bagian yang sama.'),
          },
        ],
        prompt: t('Hal apa yang membedakan design token di kode CSS dengan sekadar menyimpan satu nama kontak di HP?'),
        answer: 'tier',
        explainCorrect: t('Di sistem desain, token bisa dirangkai berjenjang dan berubah otomatis sesuai mode terang/gelap.'),
        tags: ['design-token'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'a09-l01',
    worldId: 'a09',
    title: 'Grid 12 kolom dan jarak 8',
    modes: ['pro'],
    objective: t(
      'Aku bisa memakai grid 12 kolom dan skala jarak 8pt agar tata letak selalu rapi.',
      'Aku bisa menyusun tata letak dengan sistem grid 12 kolom (gutter & margin) serta skala jarak kelipatan 4/8pt.',
    ),
    estMinutes: 5,
    introducesTerms: ['grid-8pt'],
    usesTerms: ['grid-css', 'padding', 'margin', 'alignment', 'whitespace'],
    warmupFrom: 'a08-l09',
    steps: [
      storyStep('a09/grid-12.svg', [
        rText(
          'Bayangkan tukang kayu di Toko Komponen memotong papan rak dengan ukuran acak 13 cm, 17 cm, dan 22 cm—rak pasti miring. Dengan balok ukur kelipatan 4 cm dan 8 cm serta lemari bersekat 12 petak, semua rak langsung pas rapi!',
        ),
      ]),
      conceptStep({
        title: t('Sistem Grid 12 Kolom'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'grid-12-kolom' },
        alt: t('Pembagian grid 12 kolom menjadi 6+6, 4+4+4, atau 3 sidebar dan 9 isi.'),
        body: [
          rTerm('grid-8pt', 'Grid 12 kolom'),
          rText(' dipilih karena 12 habis dibagi 2 (6+6), 3 (4+4+4), 4, dan 6, atau dipakai sebagai 3 kolom sidebar + 9 kolom isi. Jarak antarkolom disebut '),
          rBold('gutter'),
          rText(' dan jarak tepi luar disebut '),
          rBold('margin'),
          rText('.'),
        ],
      }),
      conceptStep({
        title: t('Skala Jarak 8pt (4, 8, 12, 16, 24, 32, 48, 64)'),
        visualName: 'BoxModelDiagram',
        visualProps: { worldId: 'a09', topic: 'skala-8pt' },
        alt: t('Skala jarak kelipatan 4 dan 8 piksel untuk padding dan margin yang konsisten.'),
        code: {
          lang: 'css',
          code: '.kartu {\n  padding: 16px;      /* 2 x 8 */\n  margin-bottom: 24px; /* 3 x 8 */\n  gap: 12px;\n}',
        },
        body: [
          rText('Alih-alih menebak jarak acak seperti 13px atau 17px, gunakan skala kelipatan 4 atau 8 ('),
          rCode('4, 8, 12, 16, 24, 32, 48, 64'),
          rText('). Halaman otomatis terasa konsisten tanpa menebak-nebak.'),
        ],
      }),
      conceptStep({
        title: t('Jarak Kecil Mengelompok, Jarak Besar Memisah'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'jarak-hierarki' },
        alt: t('Jarak 8px mengikat judul dan deskripsi, jarak 32px memisahkan antarbagian.'),
        body: [
          rText('Kombinasikan skala 8pt dengan '),
          rTerm('alignment', 'alignment'),
          rText(' dan '),
          rTerm('whitespace', 'white space'),
          rText(': beri jarak kecil (4–8px) untuk elemen yang berhubungan erat, dan jarak besar (32–64px) untuk memisahkan antarbagian.'),
        ],
      }),
      limitStep({
        analogy: t('Lemari 12 petak dan balok ukur 8 cm'),
        same: [
          t('Angka pembagi baku membuat potongan komponen mana pun selalu sejajar dan cepat dipasang.'),
        ],
        different: [
          t('Di layar web responsif, grid 12 kolom tidak dipaksa tetap 12 kolom sempit di HP, melainkan menyusut menjadi 4 kolom atau menumpuk 1 kolom.'),
          t('Untuk teks kecil atau garis tipis, terkadang masih dipakai angka 1px–2px di luar kelipatan 4.'),
        ],
      }),
      simStep(
        'tombol-seribu-wajah',
        t('Amati jarak dan proporsi tombol yang konsisten di dalam area simulator Toko Komponen.'),
      ),
      qStep(
        makeMcq({
          id: 'a09-l01-q1',
          prompt: t('Dalam sistem grid 12 kolom, ruang jarak antara satu kolom dan kolom di sebelahnya disebut…'),
          choices: [
            { id: 'gutter', label: t('Gutter') },
            {
              id: 'margin',
              label: t('Margin'),
              explainWrong: t('Margin adalah jarak di tepi kiri-kanan luar grid.'),
            },
            {
              id: 'placeholder',
              label: t('Placeholder'),
              explainWrong: t('Placeholder adalah teks contoh di dalam kotak isian.'),
            },
          ],
          answer: 'gutter',
          explainCorrect: t('Tepat. Gutter memisahkan kolom satu dengan kolom berikutnya agar konten tidak bertabrakan.'),
          tags: ['grid-8pt'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a09-l01-q2',
          type: 'analogy',
          prompt: t('Memakai skala 4, 8, 16, 24, 32 px dibanding angka acak 13, 17, 22 px paling mirip dengan…'),
          choices: [
            { id: 'balok', label: t('Memakai balok ukur standar tukang kayu agar tiap sambungan rak selalu pas') },
            {
              id: 'acak',
              label: t('Mencampur cat warna secara acak setiap hari'),
              explainWrong: t('Mencampur acak justru menimbulkan inkonsistensi.'),
            },
            {
              id: 'kunci',
              label: t('Mengunci pintu gudang agar tidak ada yang masuk'),
              explainWrong: t('Skala 8pt bertujuan menjaga konsistensi ukuran.'),
            },
          ],
          answer: 'balok',
          explainCorrect: t('Benar! Ukuran kelipatan 4 dan 8 menjamin ritme jarak di seluruh halaman seragam.'),
          tags: ['grid-8pt'],
        }),
      ),
      qStep({
        id: 'a09-l01-q3',
        type: 'spotbug',
        prompt: t('Ketuk baris CSS yang memakai angka jarak sembarang dan melanggar skala 4/8pt:'),
        difficulty: 2,
        lines: [
          '.kartu-produk {',
          '  padding: 16px;',
          '  gap: 13px;',
          '  margin-bottom: 32px;',
          '}',
        ],
        answer: [3],
        explainCorrect: t('Jeli! Baris 3 memakai 13px. Gunakan 12px atau 16px agar tetap mengikuti skala 4/8pt.'),
        tags: ['grid-8pt'],
      }),
      qStep(
        makeMcq({
          id: 'a09-l01-q4',
          type: 'limit',
          analogy: t('Lemari bersekat 12 petak'),
          prompt: t('Apa hal yang BERBEDA antara grid 12 kolom di website dengan lemari kayu 12 petak?'),
          difficulty: 2,
          choices: [
            { id: 'resp', label: t('Di layar HP, grid 12 kolom beradaptasi menjadi 4 kolom atau menumpuk vertikal') },
            {
              id: 'bagi',
              label: t('Angka 12 bisa dibagi 2, 3, atau 4 bagian'),
              explainWrong: t('Sifat pembagian angka 12 berlaku di keduanya.'),
            },
            {
              id: 'rapi',
              label: t('Membantu benda terlihat sejajar'),
              explainWrong: t('Keduanya sama-sama merapikan susunan.'),
            },
          ],
          answer: 'resp',
          explainCorrect: t('Tepat! Grid web bersifat responsif menyesuaikan lebar layar perangkat.'),
          tags: ['grid-8pt'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a09-l01-q5',
          type: 'scenario',
          story: t('Raka membuat tata letak dashboard dengan sidebar kiri sempit dan area konten utama yang lebar di layar desktop.'),
          prompt: t('Pembagian grid 12 kolom mana yang paling proporsional untuk susunan tersebut?'),
          difficulty: 2,
          choices: [
            { id: '39', label: t('3 kolom untuk sidebar dan 9 kolom untuk isi utama') },
            {
              id: '66',
              label: t('6 kolom sidebar dan 6 kolom isi'),
              explainWrong: t('6 + 6 membagi layar sama besar sehingga sidebar terlalu lebar.'),
            },
            {
              id: '12',
              label: t('12 kolom sidebar dan 0 kolom isi'),
              explainWrong: t('Tidak menyisakan ruang untuk konten utama.'),
            },
          ],
          answer: '39',
          explainCorrect: t('Benar! Rasio 3 : 9 (seperempat : tiga perempat) memberi fokus pada isi utama.'),
          tags: ['grid-8pt'],
        }),
      ),
      qStep({
        id: 'a09-l01-q6',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi CSS di bawah dengan nilai jarak skala 8pt untuk membagi 3 kartu sama lebar di grid 12 kolom:'),
        template: '.kartu-tiga { grid-column: span ___; padding: ___px; }',
        bank: ['4', '16', '5', '17'],
        answer: ['4', '16'],
        explainCorrect: t('Tepat! 12 / 3 = 4 kolom per kartu, dan 16px adalah kelipatan 8pt.'),
        tags: ['grid-8pt'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a09-l01-r1',
        prompt: t(
          'Manakah angka jarak yang mengikuti skala rapi 8pt?',
          'Manakah deret angka jarak yang sesuai dengan skala 4/8pt?',
        ),
        choices: [
          { id: 'ok', label: t('8px, 16px, 24px, 32px') },
          {
            id: 'bad',
            label: t('13px, 17px, 22px, 29px'),
            explainWrong: t('Angka acak membuat tampilan kurang teratur.'),
          },
        ],
        answer: 'ok',
        explainCorrect: t('Kelipatan 4 dan 8 menjaga jarak seluruh komponen tetap selaras.'),
        tags: ['grid-8pt'],
      }),
      makeTf({
        id: 'a09-l01-r2',
        prompt: t(
          'Jarak kecil dipakai untuk barang yang dekat artinya, jarak besar untuk memisah bagian.',
          'Dalam skala 8pt, jarak kecil mengikat elemen berpasangan sedangkan jarak besar memisahkan antarbagian.',
        ),
        answer: true,
        explainCorrect: t('Betul! Kedekatan jarak menunjukkan hubungan antarisi.'),
        explainWrong: t('Justru jarak kecil menyatukan yang terkait dan jarak besar memisah bagian.'),
        tags: ['grid-8pt'],
      }),
    ],
    recap: t(
      'Gunakan grid 12 kolom dan skala jarak 4/8pt agar susunan halaman rapi.',
      'Grid 12 kolom mempermudah pembagian tata letak, sementara skala jarak 4/8pt menciptakan ritme visual yang konsisten.',
    ),
  }),

  makeLesson({
    id: 'a09-l02',
    worldId: 'a09',
    title: 'Kamus komponen UI',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengenali nama dan guna komponen UI seperti tombol, kartu, modal, dan toast.',
      'Aku bisa membedakan fungsi komponen antarmuka umum seperti Button, Input, Checkbox, Radio, Modal, Toast, Alert, Tabs, Accordion, dan Breadcrumb.',
    ),
    estMinutes: 6,
    introducesTerms: ['komponen-ui'],
    usesTerms: ['ui', 'ux', 'frontend'],
    stickerId: 'lego-ds',
    warmupFrom: 'a09-l01',
    steps: [
      storyStep('a09/lego-ds.svg', [
        rText(
          'Setiap ruangan punya perabot bernama jelas seperti kursi atau lemari. Halaman web juga punya perabot siap pakai yang dirakit seperti keping LEGO!',
          'Komponen UI adalah "perabot" antarmuka siap pakai ulang. Mengetahui nama bakunya membuat desainer dan developer langsung nyambung saat berdiskusi maupun membaca dokumentasi.',
        ),
      ]),
      conceptStep({
        title: t('Tombol dan Kotak Pilihan', 'Komponen Aksi & Masukan'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'komponen-input' },
        alt: t('Contoh Button, Input dengan placeholder, Checkbox, Radio, dan Toggle.'),
        body: [
          rTerm('komponen-ui', 'Komponen UI', 'Komponen UI'),
          rText(
            ' untuk aksi: tombol dan kotak ketik. ',
            ' dasar meliputi Button (primary, secondary, ghost), Input ber-',
          ),
          rBold('Checkbox', 'placeholder, Checkbox'),
          rText(' pilih banyak. ', ' (pilih banyak), '),
          rBold('Radio', 'Radio'),
          rText(' pilih satu. Ada juga saklar Toggle.', ' (pilih satu), Toggle, serta Dropdown.'),
        ],
      }),
      conceptStep({
        title: t('Kartu dan Jendela Pesan', 'Wadah & Pemberitahuan'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'komponen-pesan' },
        alt: t('Perbandingan Card, Modal dialog, Toast sementara, dan Alert menetap.'),
        body: [
          rBold('Card', 'Card'),
          rText(' merangkum satu info. ', ' membungkus satu unit informasi. '),
          rBold('Modal', 'Modal'),
          rText(' muncul menuntut jawaban. ', ' meminta perhatian penuh di atas halaman. '),
          rBold('Toast', 'Toast'),
          rText(' muncul sebentar, lalu hilang. ', ' muncul singkat lalu hilang, berbeda dengan '),
          rBold('Alert', 'Alert/Banner'),
          rText(' yang menetap.', ' yang tetap bertahan di halaman.'),
        ],
      }),
      conceptStep({
        title: t('Penunjuk Jalan dan Isi Lipat', 'Navigasi & Pengelompokan'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'komponen-navigasi' },
        alt: t('Contoh Navbar, Breadcrumb, Tabs, Accordion, Badge, Skeleton, dan Pagination.'),
        body: [
          rBold('Breadcrumb', 'Breadcrumb'),
          rText(' menunjukkan jejak posisi. ', ' menandai jejak lokasi, '),
          rBold('Tabs', 'Tabs'),
          rText(' berpindah isi seketika. ', ' berganti isi tanpa pindah halaman, '),
          rBold('Accordion', 'Accordion'),
          rText(' bisa dibuka-tutup, dan ', ' melipat FAQ, '),
          rBold('Skeleton', 'Skeleton/Badge/Pagination'),
          rText(' dipakai saat menunggu muatan.', ' menandai muatan, status, serta nomor halaman.'),
        ],
      }),
      limitStep({
        analogy: t('Komponen UI seperti perabot rumah atau keping LEGO'),
        same: [
          t('Setiap bagian punya nama baku dan bisa dipasang ulang di banyak tempat.'),
        ],
        different: [
          t('Perabot kayu diam saja, sedangkan komponen UI bisa menyimpan data, terbuka-tutup, dan merespons klik.'),
          t('Satu komponen tombol bisa tampil dalam variasi primary, secondary, atau ghost tergantung perannya.'),
        ],
      }),
      simStep(
        'tombol-seribu-wajah',
        t(
          'Lihat contoh komponen Button di Toko Komponen dan pencet tombolnya!',
          'Amati perilaku komponen tombol interaktif di simulator Toko Komponen.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a09-l02-q1',
          type: 'analogy',
          prompt: t('Mengapa tim pembuat web sepakat memakai nama baku seperti Modal, Toast, dan Accordion?'),
          choices: [
            { id: 'name', label: t('Supaya semua anggota tim langsung paham maksudnya seperti nama perabot') },
            {
              id: 'hide',
              label: t('Supaya pengunjung tidak tahu cara menutup halaman'),
              explainWrong: t('Nama baku memudahkan pembuat web berkomunikasi dan mencari dokumentasi.'),
            },
            {
              id: 'slow',
              label: t('Supaya gambar menjadi lebih berat'),
              explainWrong: t('Komponen justru membantu kode lebih rapi dan bisa dipakai ulang.'),
            },
          ],
          answer: 'name',
          explainCorrect: t('Benar! Kamus komponen memberi bahasa bersama antara desainer dan programmer.'),
          tags: ['komponen-ui'],
        }),
      ),
      qStep({
        id: 'a09-l02-q2',
        type: 'sort',
        prompt: t('Kelompokkan komponen berikut ke dalam Pemberitahuan Sementara atau Pilihan Input:'),
        difficulty: 2,
        items: [
          { id: 'cb', label: t('Checkbox (pilih banyak)') },
          { id: 'ts', label: t('Toast (hilang sendiri)') },
          { id: 'rd', label: t('Radio (pilih satu)') },
          { id: 'al', label: t('Alert (menetap di halaman)') },
        ],
        bins: [
          { id: 'inp', label: t('Pilihan Input') },
          { id: 'msg', label: t('Pemberitahuan') },
        ],
        answer: { cb: 'inp', ts: 'msg', rd: 'inp', al: 'msg' },
        explainCorrect: t('Keren! Checkbox dan Radio adalah komponen masukan; Toast dan Alert adalah komponen pesan.'),
        tags: ['komponen-ui'],
      }),
      qStep({
        id: 'a09-l02-q3',
        type: 'match',
        prompt: t('Pasangkan nama komponen UI dengan contoh tampilannya:'),
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
        explainCorrect: t('Tepat sekali! Kamu sudah hafal fungsi berbagai komponen antarmuka populer.'),
        tags: ['komponen-ui'],
      }),
      qStep(
        makeMcq({
          id: 'a09-l02-q4',
          type: 'limit',
          analogy: t('Komponen UI seperti kursi kayu atau LEGO'),
          prompt: t('Hal apa yang dimiliki komponen UI di web tetapi TIDAK dimiliki kursi kayu biasa?'),
          choices: [
            { id: 'inter', label: t('Bisa dibuka-tutup, diisi teks, dan merespons klik pengguna') },
            {
              id: 'nama',
              label: t('Punya nama tetap agar orang tidak salah sebut'),
              explainWrong: t('Nama tetap dimiliki baik oleh perabot maupun komponen UI.'),
            },
            {
              id: 'ulang',
              label: t('Bisa dipasang di banyak ruangan berbeda'),
              explainWrong: t('Keduanya bisa dipakai ulang di banyak tempat.'),
            },
          ],
          answer: 'inter',
          explainCorrect: t('Benar! Komponen UI bersifat hidup dan interaktif ketika dipakai pengunjung.'),
          tags: ['komponen-ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a09-l02-q5',
          type: 'scenario',
          story: t('Sari membuat halaman belanja. Ia ingin menampilkan konfirmasi berbahaya "Hapus seluruh keranjang?" sebelum data benar-benar terhapus.'),
          prompt: t('Komponen apa yang paling tepat dipakai untuk meminta perhatian penuh pengguna?'),
          difficulty: 2,
          choices: [
            { id: 'modal', label: t('Modal / Dialog') },
            {
              id: 'toast',
              label: t('Toast yang hilang dalam 2 detik'),
              explainWrong: t('Toast terlalu cepat hilang untuk konfirmasi penting.'),
            },
            {
              id: 'badge',
              label: t('Badge kecil bertuliskan "Baru"'),
              explainWrong: t('Badge hanya label status kecil, bukan jendela konfirmasi.'),
            },
          ],
          answer: 'modal',
          explainCorrect: t('Tepat! Modal muncul di atas halaman agar pengguna membaca konfirmasi dengan fokus.'),
          tags: ['komponen-ui'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a09-l02-q6',
          prompt: t('Teks contoh abu-abu di dalam kotak isian seperti "nama@toko-rani.example" disebut placeholder.'),
          answer: true,
          explainCorrect: t('Betul! Placeholder memberi petunjuk contoh isian sebelum pengguna mengetik.'),
          explainWrong: t('Hampir! Teks contoh di dalam input memang disebut placeholder.'),
          tags: ['komponen-ui'],
        }),
      ),
      qStep({
        id: 'a09-l02-q7',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi kalimat tentang dua komponen pemuat dan pemisah halaman berikut:'),
        template: 'Kerangka abu-abu saat data dimuat disebut ___, sedangkan pembagi halaman angka 1 2 3 disebut ___.',
        bank: ['Skeleton', 'Pagination', 'Navbar', 'Tooltip'],
        answer: ['Skeleton', 'Pagination'],
        explainCorrect: t('Tepat! Skeleton menjaga kenyamanan saat menunggu muatan, dan Pagination membagi daftar panjang.'),
        tags: ['komponen-ui'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a09-l02-r1',
        prompt: t('Bila pengguna boleh memilih LEBIH DARI SATU hobi dalam formulir, komponen mana yang dipakai?'),
        choices: [
          { id: 'cb', label: t('Checkbox') },
          {
            id: 'rd',
            label: t('Radio button'),
            explainWrong: t('Radio hanya mengizinkan satu pilihan saja.'),
          },
        ],
        answer: 'cb',
        explainCorrect: t('Checkbox dipakai untuk memilih banyak opsi sekaligus.'),
        tags: ['komponen-ui'],
      }),
      makeTf({
        id: 'a09-l02-r2',
        prompt: t('CTA (Call to Action) adalah tombol ajakan utama di sebuah halaman, misalnya "Daftar Sekarang".'),
        answer: true,
        explainCorrect: t('Betul! Tombol CTA menjadi aksi paling menonjol di halaman.'),
        explainWrong: t('CTA memang singkatan dari Call to Action untuk tombol ajakan utama.'),
        tags: ['komponen-ui'],
      }),
    ],
    recap: t(
      'Setiap bagian layar punya nama baku seperti Button, Card, Modal, Toast, dan Tabs.',
      'Menguasai kamus komponen UI (Button, Input, Checkbox/Radio, Card, Modal, Toast, Alert, Tabs, Accordion, Breadcrumb, Skeleton) mempercepat kerja tim.',
    ),
    companion: {
      talkPrompts: [
        'Buka satu aplikasi di HP bersama: bisa sebutkan mana Navbar, Card, Badge, dan Button?',
      ],
      offlineActivity:
        'Gambar 4 komponen favorit (misalnya Card barang, Tombol CTA, Modal tanya, dan Toast berhasil) di kartu kertas dan beri nama di baliknya.',
    },
  }),

  makeLesson({
    id: 'a09-l03',
    worldId: 'a09',
    title: 'State: tombol punya banyak wajah',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengenali enam wajah tombol agar pengguna tahu apa yang sedang terjadi.',
      'Aku bisa merancang enam state tombol (default, hover, focus, active, loading, disabled), state input, ikon seragam, border radius, dan elevation.',
    ),
    estMinutes: 5,
    introducesTerms: ['state-ui'],
    usesTerms: ['komponen-ui', 'ui', 'ux'],
    warmupFrom: 'a09-l02',
    steps: [
      storyStep('a09/tombol-wajah.svg', [
        rText(
          'Satu tombol tidak cukup digambar sekali saja! Bayangkan lampu lalu lintas yang punya wajah berbeda agar kita tahu kapan jalan atau tunggu.',
          'Satu komponen tombol punya beberapa state (keadaan). Setiap state memberi umpan balik jelas agar pengguna tidak bingung apakah kliknya sudah masuk atau tidak.',
        ),
      ]),
      conceptStep({
        title: t('Tiga Wajah Sebelum Diklik', 'Default, Hover, Focus'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'state-awal' },
        alt: t('Perbandingan tombol dalam keadaan default, hover disorot mouse, dan focus keyboard.'),
        body: [
          rTerm('state-ui', 'State', 'State'),
          rText(' awal tombol ada tiga. ', ' awal ada tiga: '),
          rBold('Default', 'Default'),
          rText(' saat diam. ', ' (biasa), '),
          rBold('Hover', 'Hover'),
          rText(' saat disorot panah. ', ' (disorot kursor), dan '),
          rBold('Focus', 'Focus'),
          rText(' saat dipilih tombol keyboard.', ' (dipilih lewat keyboard Tab agar mudah dilihat).'),
        ],
      }),
      conceptStep({
        title: t('Tiga Wajah Saat Bekerja', 'Active, Loading, Disabled'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'state-aksi' },
        alt: t('Keadaan active ditekan, loading berputar, dan disabled redup tidak aktif.'),
        body: [
          rBold('Active', 'Active'),
          rText(' muncul saat tombol ditekan. ', ' terlihat saat ditekan. '),
          rBold('Loading', 'Loading'),
          rText(' berputar saat sedang memproses. ', ' berputar selama data diproses. '),
          rBold('Disabled', 'Disabled'),
          rText(' tampak pudar saat tidak bisa diklik.', ' tampil redup saat tidak dapat dipakai, sedangkan input juga punya state error dan success.'),
        ],
      }),
      conceptStep({
        title: t('Ikon, Sudut, dan Bayangan', 'Ikon Seragam, Border Radius & Shadow'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'ikon-sudut-bayangan' },
        alt: t('Ikon SVG seragam, sudut bulat ramah vs tajam resmi, dan elevation bayangan.'),
        body: [
          rText('Pakai satu gaya ', 'Gunakan satu set '),
          rBold('ikon', 'ikon SVG'),
          rText(' seragam. Sudut bulat terasa ramah. Bayangan lembut membuat kartu tampak lebih tinggi.', ' bergaya seragam. Pilih 1–2 border radius secara konsisten, lalu beri bayangan (elevation) lebih lembut untuk elemen tinggi seperti Modal.'),
        ],
      }),
      limitStep({
        analogy: t('Tombol seperti rambu lampu yang berganti wajah'),
        same: [
          t('Setiap perubahan tampilan memberi sinyal cepat tentang keadaan saat itu.'),
        ],
        different: [
          t('Lampu jalan berganti menurut waktu, sedangkan state tombol berubah seketika merespons tindakanmu dan bisa mengunci klik ganda saat loading.'),
        ],
      }),
      simStep(
        'tombol-seribu-wajah',
        t(
          'Klik pilihan state di atas tombol untuk melihat wajah hover, focus, loading, dan disabled!',
          'Uji perubahan visual setiap state tombol langsung pada simulator Tombol Seribu Wajah.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a09-l03-q1',
          prompt: t('Keadaan tombol ketika kamu baru menggerakkan kursor panah mouse di atasnya (belum diklik) disebut…'),
          choices: [
            { id: 'hover', label: t('Hover') },
            {
              id: 'active',
              label: t('Active'),
              explainWrong: t('Active adalah saat tombol benar-benar sedang ditekan.'),
            },
            {
              id: 'disabled',
              label: t('Disabled'),
              explainWrong: t('Disabled adalah tombol nonaktif yang tidak bisa diklik.'),
            },
          ],
          answer: 'hover',
          explainCorrect: t('Benar! Hover menandakan tombol siap diklik saat disorot kursor.'),
          tags: ['state-ui'],
        }),
      ),
      qStep({
        id: 'a09-l03-q2',
        type: 'match',
        prompt: t('Pasangkan nama state tombol dengan keadaannya:'),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('Focus') },
          { id: 'l2', label: t('Loading') },
          { id: 'l3', label: t('Disabled') },
          { id: 'l4', label: t('Default') },
        ],
        right: [
          { id: 'r1', label: t('Tombol tampil redup dan tidak bisa diklik') },
          { id: 'r2', label: t('Muncul garis luar jelas saat dipilih pakai keyboard') },
          { id: 'r3', label: t('Keadaan biasa sebelum disentuh') },
          { id: 'r4', label: t('Sedang memproses dan menampilkan putaran') },
        ],
        answer: { l1: 'r2', l2: 'r4', l3: 'r1', l4: 'r3' },
        explainCorrect: t('Mantap! Mengenal semua state membuat antarmuka jauh lebih ramah.'),
        tags: ['state-ui'],
      }),
      qStep(
        makeMcq({
          id: 'a09-l03-q3',
          type: 'analogy',
          prompt: t('Mengapa tombol "Bayar" perlu berubah ke state Loading setelah diklik?'),
          choices: [
            { id: 'dup', label: t('Agar pengguna tahu proses sedang berjalan dan tidak menekan dua kali') },
            {
              id: 'hias',
              label: t('Hanya untuk hiasan agar halaman penuh warna'),
              explainWrong: t('Loading bukan hiasan, melainkan umpan balik penting.'),
            },
            {
              id: 'del',
              label: t('Untuk menghapus semua isi formulir'),
              explainWrong: t('Loading menjaga formulir tidak terkirim ganda.'),
            },
          ],
          answer: 'dup',
          explainCorrect: t('Tepat! State loading mencegah pengguna bingung dan mencegah pengiriman ganda.'),
          tags: ['state-ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a09-l03-q4',
          type: 'limit',
          analogy: t('Tombol seperti rambu lalu lintas'),
          prompt: t('Apa perbedaan state tombol di website dengan rambu lampu di jalan?'),
          choices: [
            { id: 'react', label: t('State tombol langsung merespons gerakan pengguna dan bisa mencegah klik berulang') },
            {
              id: 'sig',
              label: t('Sama-sama memberi tanda arti tertentu lewat perubahan tampilan'),
              explainWrong: t('Itu justru persamaan keduanya.'),
            },
            {
              id: 'see',
              label: t('Sama-sama dilihat oleh pengguna'),
              explainWrong: t('Itu juga persamaannya.'),
            },
          ],
          answer: 'react',
          explainCorrect: t('Benar! Tombol web bereaksi terhadap interaksi kursor, keyboard, dan status proses.'),
          tags: ['state-ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a09-l03-q5',
          type: 'scenario',
          story: t('Dimas memakai tombol Tab di keyboard untuk memilih tombol di halaman, tetapi tidak ada garis penanda sama sekali sehingga ia bingung tombol mana yang sedang terpilih.'),
          prompt: t('State tombol mana yang lupa didesain oleh pembuat website tersebut?'),
          difficulty: 2,
          choices: [
            { id: 'focus', label: t('State Focus') },
            {
              id: 'default',
              label: t('State Default'),
              explainWrong: t('Default sudah tampil sebelum tombol dipilih.'),
            },
            {
              id: 'loading',
              label: t('State Loading'),
              explainWrong: t('Dimas belum menekan untuk memproses; ia baru memindahkan pilihan lewat keyboard.'),
            },
          ],
          answer: 'focus',
          explainCorrect: t('Tepat! Indikator Focus wajib jelas agar pengguna keyboard tahu posisi aktifnya.'),
          tags: ['state-ui'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a09-l03-q6',
          prompt: t('Jika memakai ikon di seluruh website, sebaiknya pilih satu set gaya yang seragam (misalnya semua bergaya garis atau semua terisi penuh).'),
          answer: true,
          explainCorrect: t('Betul! Mencampur ikon tebal, tipis, dan 3D membuat tampilan berantakan.'),
          explainWrong: t('Hampir! Ikon yang seragam gayanya (format terbaik SVG) membuat antarmuka tampak profesional.'),
          tags: ['state-ui', 'komponen-ui'],
        }),
      ),
      qStep({
        id: 'a09-l03-q7',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi pernyataan tentang format ikon dan sudut komponen berikut:'),
        template: 'Format gambar terbaik untuk ikon agar selalu tajam di segala ukuran adalah ___, dan properti CSS untuk kelengkungan sudut adalah ___.',
        bank: ['SVG', 'border-radius', 'JPEG', 'z-index'],
        answer: ['SVG', 'border-radius'],
        explainCorrect: t('Benar! Ikon SVG tetap tajam saat diperbesar, dan border-radius mengatur kesan tegas atau ramah sudut kotak.'),
        tags: ['state-ui'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a09-l03-r1',
        prompt: t('Selain enam state tombol, dua state tambahan yang sering dimiliki kotak isian (Input) adalah…'),
        choices: [
          { id: 'es', label: t('Error dan Success') },
          {
            id: 'hv',
            label: t('Navbar dan Footer'),
            explainWrong: t('Navbar dan Footer adalah komponen navigasi, bukan state input.'),
          },
        ],
        answer: 'es',
        explainCorrect: t('Kolom isian memberi tahu jika ketikan salah (error) atau valid (success).'),
        tags: ['state-ui'],
      }),
      makeTf({
        id: 'a09-l03-r2',
        prompt: t('Semakin tinggi posisi elemen seperti jendela Modal di atas layar, bayangannya dibuat semakin besar dan lembut.'),
        answer: true,
        explainCorrect: t('Betul! Bayangan (elevation) membantu mata melihat lapisan mana yang berada di atas.'),
        explainWrong: t('Elemen yang melayang lebih tinggi memang memakai bayangan lebih besar dan lembut.'),
        tags: ['state-ui'],
      }),
    ],
    recap: t(
      'Satu tombol punya banyak wajah: biasa, disorot, dipilih keyboard, ditekan, memuat, dan mati.',
      'Desain komponen wajib menyiapkan state default, hover, focus, active, loading, dan disabled beserta ikon seragam, radius, dan elevation konsisten.',
    ),
    companion: {
      talkPrompts: [
        'Coba arahkan kursor ke tombol di layar ini: apakah warnanya berubah saat hover atau focus?',
      ],
      offlineActivity:
        'Gambar 4 ekspresi wajah satu tombol "Kirim" di kertas: Diam (Default), Terang (Hover), Berputar (Loading), dan Redup (Disabled).',
    },
  }),

  makeLesson({
    id: 'a09-l04',
    worldId: 'a09',
    title: 'Tema dan gaya UI',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengenali beberapa gaya tampilan UI dan memilih yang cocok untuk pengguna.',
      'Aku bisa mengenali 9 gaya visual UI populer beserta ciri, kecocokan produk, dan risikonya.',
    ),
    estMinutes: 5,
    introducesTerms: ['gaya-ui'],
    usesTerms: ['ui', 'kontras', 'komponen-ui'],
    warmupFrom: 'a09-l03',
    steps: [
      storyStep('a09/gaya-ui.svg', [
        rText(
          'Gaya tampilan website itu seperti pakaian atau bentuk rumah. Rumah minimalis dan rumah warna-warni sama-sama nyaman dihuni, hanya kesannya berbeda!',
          'Gaya UI ibarat gaya arsitektur rumah: minimalis, klasik, atau berani. Fungsinya tetap sebagai antarmuka produk, tetapi kesan dan kecocokannya terhadap penghuni berbeda.',
        ),
      ]),
      conceptStep({
        title: t('Gaya Polos dan Bertumpuk', 'Flat, Material, Skeuomorphism'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'gaya-flat-material' },
        alt: t('Kartu bergaya Flat Design polos, Material bertumpuk, dan Skeuomorphism menyerupai benda nyata.'),
        body: [
          rTerm('gaya-ui', 'Gaya UI', 'Gaya UI'),
          rText(' populer: ', ' klasik: '),
          rBold('Flat', 'Flat 2.0'),
          rText(' polos cepat. ', ' ringan untuk banyak produk, '),
          rBold('Material', 'Material Design'),
          rText(' seperti kertas bertumpuk. ', ' ala kertas bertumpuk berbayangan, dan '),
          rBold('Skeuomorphism', 'Skeuomorphism'),
          rText(' meniru benda nyata.', ' yang meniru tekstur kulit atau logam benda nyata.'),
        ],
      }),
      conceptStep({
        title: t('Gaya Kaca, Tanah Liat, dan Tebal', 'Glass, Clay, Neumorphism, Neo-brutalism'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'gaya-modern' },
        alt: t('Perbandingan Glassmorphism kaca buram, Claymorphism gembung, Neumorphism, dan Neo-brutalism.'),
        body: [
          rBold('Glassmorphism', 'Glassmorphism'),
          rText(' mirip kaca buram. ', ' tembus pandang, '),
          rBold('Claymorphism', 'Claymorphism'),
          rText(' gembung ramah anak. ', ' pastel empuk ramah anak, '),
          rBold('Neo-brutalism', 'Neo-brutalism'),
          rText(' bergaris hitam tebal, sedangkan ', ' bergaris tegas, sementara '),
          rBold('Neumorphism', 'Neumorphism'),
          rText(' sering kurang kontras.', ' rawan bermasalah di kontras rendah.'),
        ],
      }),
      conceptStep({
        title: t('Minimalis dan Kotak Bekal Bento', 'Minimalism, Bento Grid & Memilih Gaya'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'gaya-minimal-bento' },
        alt: t('Minimalism penuh ruang kosong dan Bento Grid seperti sekat kotak bekal.'),
        body: [
          rBold('Minimalism', 'Minimalism'),
          rText(' fokus pada isi utama. ', ' menonjolkan foto dan huruf, sedangkan '),
          rBold('Bento Grid', 'Bento Grid'),
          rText(' menyusun kotak seperti kotak bekal. Pilih gaya sesuai penggunanya.', ' membagi fitur dalam kotak sekat bekal. Ingat, gaya adalah pakaian yang harus cocok dengan pengguna.'),
        ],
      }),
      limitStep({
        analogy: t('Gaya UI seperti pakaian atau gaya arsitektur rumah'),
        same: [
          t('Memilih gaya perlu menyesuaikan siapa yang memakai dan suasana produknya.'),
        ],
        different: [
          t('Gaya visual di web adalah "pakaian", bukan struktur dasarnya: prinsip tata letak dan kontras tetap wajib dipenuhi di gaya mana pun.'),
          t('Satu aplikasi bisa beralih tema (misalnya ke Dark UI) tanpa mengubah isi maupun tombol fungsinya.'),
        ],
      }),
      simStep(
        'tombol-seribu-wajah',
        t(
          'Perhatikan gaya bersih pada tombol simulasi: sudut rapi dan kontras tulisan jelas!',
          'Amati bagaimana gaya Flat 2.0 menjaga tombol tetap jelas dibedakan di berbagai state.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a09-l04-q1',
          type: 'analogy',
          prompt: t('Gaya Bento Grid dinamai seperti kotak bekal Jepang karena…'),
          choices: [
            { id: 'sekat', label: t('Isinya disusun dalam kotak-kotak rapat berbeda ukuran untuk tiap info') },
            {
              id: 'makan',
              label: t('Hanya boleh dipakai untuk situs restoran makanan'),
              explainWrong: t('Bento Grid sering dipakai untuk halaman fitur produk teknologi dan portofolio.'),
            },
            {
              id: 'kulit',
              label: t('Memakai tekstur kulit dan kayu mengilap'),
              explainWrong: t('Meniru bahan kulit dan kayu adalah ciri Skeuomorphism.'),
            },
          ],
          answer: 'sekat',
          explainCorrect: t('Benar! Tiap sekat kotak memuat satu poin informasi yang mudah dipindai.'),
          tags: ['gaya-ui'],
        }),
      ),
      qStep({
        id: 'a09-l04-q2',
        type: 'match',
        prompt: t('Pasangkan nama gaya UI dengan ciri utamanya:'),
        difficulty: 2,
        left: [
          { id: 'g1', label: t('Glassmorphism') },
          { id: 'g2', label: t('Claymorphism') },
          { id: 'g3', label: t('Neo-brutalism') },
          { id: 'g4', label: t('Skeuomorphism') },
        ],
        right: [
          { id: 'r1', label: t('Garis tepi hitam tebal, bayangan keras tanpa blur') },
          { id: 'r2', label: t('Panel seperti kaca buram yang tembus pandang') },
          { id: 'r3', label: t('Meniru benda nyata seperti tombol kayu atau logam') },
          { id: 'r4', label: t('Bentuk gembung pastel seperti tanah liat empuk') },
        ],
        answer: { g1: 'r2', g2: 'r4', g3: 'r1', g4: 'r3' },
        explainCorrect: t('Keren! Kamu bisa membedakan ciri visual keempat gaya populer ini.'),
        tags: ['gaya-ui'],
      }),
      qStep(
        makeMcq({
          id: 'a09-l04-q3',
          type: 'scenario',
          story: t('Bu Laras diminta merancang aplikasi kesehatan dan tabungan bank untuk semua usia termasuk orang tua.'),
          prompt: t('Gaya UI mana yang paling tepat dan tepercaya untuk aplikasi tersebut?'),
          difficulty: 2,
          choices: [
            { id: 'flat', label: t('Flat 2.0 atau Material Design yang bersih dan kontrasnya tinggi') },
            {
              id: 'clay',
              label: t('Claymorphism serba gembung main-main'),
              explainWrong: t('Claymorphism terlalu main-main untuk aplikasi perbankan yang butuh kesan serius.'),
            },
            {
              id: 'neu',
              label: t('Neumorphism dengan tombol sewarna latar'),
              explainWrong: t('Neumorphism punya kontras rendah sehingga menyulitkan orang tua membaca.'),
            },
          ],
          answer: 'flat',
          explainCorrect: t('Tepat! Produk perbankan dan kesehatan mengutamakan kejelasan, kepercayaan, dan keterbacaan.'),
          tags: ['gaya-ui', 'kontras'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a09-l04-q4',
          type: 'limit',
          analogy: t('Gaya UI sebagai pakaian luar'),
          prompt: t('Pernyataan mana yang benar tentang batas gaya UI saat dibandingkan dengan pakaian?'),
          choices: [
            { id: 'base', label: t('Tren gaya bisa berganti, tetapi aturan kontras dan kemudahan pakai tetap wajib dijaga') },
            {
              id: 'nohtml',
              label: t('Memakai gaya Minimalism berarti boleh membuang semua petunjuk penting'),
              explainWrong: t('Minimalis bukan berarti kosong tanpa petunjuk.'),
            },
            {
              id: 'only',
              label: t('Jika gaya sedang tren di media sosial, semua website wajib memakainya'),
              explainWrong: t('Pemilihan gaya harus mengikuti tujuan produk dan penggunanya.'),
            },
          ],
          answer: 'base',
          explainCorrect: t('Benar! Gaya adalah pakaian, bukan tubuhnya; prinsip desain dan kejelasan tetap nomor satu.'),
          tags: ['gaya-ui'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a09-l04-q5',
          prompt: t('Pada Glassmorphism, teks di atas panel kaca buram harus dicek kontrasnya karena bisa sulit terbaca di atas latar ramai.'),
          answer: true,
          explainCorrect: t('Betul! Efek buram juga lebih berat di perangkat lemah sehingga perlu diuji dengan cermat.'),
          explainWrong: t('Hampir! Panel transparan di atas foto warna-warni memang rentan membuat teks sulit dibaca.'),
          tags: ['gaya-ui', 'kontras'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a09-l04-q6',
          prompt: t('Bahaya jika desain Flat terlalu polos tanpa sedikit pun bayangan atau pembeda warna adalah…'),
          choices: [
            { id: 'btn', label: t('Pengguna bingung membedakan mana tombol yang bisa diklik dan mana hiasan biasa') },
            {
              id: 'load',
              label: t('Halaman menjadi sangat lambat dimuat'),
              explainWrong: t('Justru Flat Design sangat ringan dan cepat dimuat.'),
            },
            {
              id: 'font',
              label: t('Huruf tidak bisa ditampilkan browser'),
              explainWrong: t('Masalahnya ada pada petunjuk mana elemen yang bisa diklik.'),
            },
          ],
          answer: 'btn',
          explainCorrect: t('Tepat! Karena itulah hadir Flat 2.0 yang memberi sedikit bayangan agar tombol jelas terlihat.'),
          tags: ['gaya-ui'],
        }),
      ),
      qStep({
        id: 'a09-l04-q7',
        type: 'type',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Tulis nama gaya UI yang meniru tata letak majalah dengan judul besar, huruf serif, dan banyak foto.'),
        accept: ['Editorial', 'editorial'],
        explainCorrect: t('Benar! Gaya Editorial meminjam tata letak majalah cetak untuk cerita dan publikasi.'),
        tags: ['gaya-ui'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a09-l04-r1',
        prompt: t('Gaya UI manakah yang cocok untuk portofolio agensi kreatif yang ingin tampil berani dengan garis tepi hitam tebal?'),
        choices: [
          { id: 'nb', label: t('Neo-brutalism') },
          {
            id: 'clay',
            label: t('Claymorphism'),
            explainWrong: t('Claymorphism berkesan lembut pastel seperti tanah liat.'),
          },
        ],
        answer: 'nb',
        explainCorrect: t('Neo-brutalism menonjolkan garis hitam tebal, bayangan keras, dan warna kontras berani.'),
        tags: ['gaya-ui'],
      }),
      makeTf({
        id: 'a09-l04-r2',
        prompt: t('Minimalism berarti membuang semua petunjuk penting sampai layar terlihat kosong.'),
        answer: false,
        explainCorrect: t('Betul, itu keliru! Minimalism membuang hiasan yang tidak perlu sambil tetap menjaga petunjuk penting tetap jelas.'),
        explainWrong: t('Minimalis bukan berarti kosong; informasi penting tetap harus ada dan mudah dipahami.'),
        tags: ['gaya-ui'],
      }),
    ],
    recap: t(
      'Gaya UI adalah pakaian halaman yang dipilih agar cocok dengan penggunanya.',
      'Pilih gaya UI (Flat 2.0, Material, Glassmorphism, Claymorphism, Neo-brutalism, Minimalism, Bento Grid) sesuai karakter produk sambil menjaga kejelasan dan kontras.',
    ),
    companion: {
      talkPrompts: [
        'Menurutmu aplikasi untuk anak SD lebih enak pakai gaya tanah liat berwarna cerah atau gaya serba hitam?',
      ],
      offlineActivity:
        'Gambar kartu harga yang sama dalam dua gaya berbeda di kertas: satu gaya polos rapi (Flat) dan satu bergaris tepi hitam tebal (Neo-brutalism).',
    },
  }),

  makeLesson({
    id: 'a09-l05',
    worldId: 'a09',
    title: 'Design system dan token',
    modes: ['pro'],
    objective: t(
      'Aku bisa menjelaskan komponen design system dan menulis variabel CSS untuk design token.',
      'Aku bisa merangkum 3 bagian design system dan menerapkan design token di CSS.',
    ),
    estMinutes: 5,
    introducesTerms: ['design-token'],
    usesTerms: ['komponen-ui', 'state-ui', 'gaya-ui', 'css'],
    warmupFrom: 'a09-l04',
    steps: [
      storyStep('a09/lego-ds.svg', [
        rText(
          'Design system itu seperti kotak LEGO standar: ukuran dan sambungannya baku sehingga siapa pun yang merakit, seluruh bangunan tetap terlihat satu keluarga. Design token di dalamnya ibarat menyimpan nomor dengan nama kontak "Ibu" di HP: kalau nomor berubah, ubah satu baris saja!',
        ),
      ]),
      conceptStep({
        title: t('Tiga Pilar Design System'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'design-system-pilar' },
        alt: t('Style guide, Component library, dan Dokumentasi membentuk Design System.'),
        body: [
          rText('Design system dipakai bersama desainer dan developer, terdiri atas '),
          rBold('Style guide'),
          rText(' (warna, huruf, jarak), '),
          rBold('Component library'),
          rText(' (tombol, kartu, modal lengkap dengan '),
          rTerm('state-ui', 'state'),
          rText('), serta '),
          rBold('Dokumentasi'),
          rText(' kapan tiap komponen dipakai.'),
        ],
      }),
      conceptStep({
        title: t('Design Token: Satu Nama untuk Nilai Desain'),
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
          rText(' memberi nama bermakna pada nilai desain agar tidak menulis '),
          rCode('#2F6FED'),
          rText(' berulang kali di 200 file.'),
        ],
      }),
      conceptStep({
        title: t('Contoh Terbuka & Proyek Kecil'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'design-system-contoh' },
        alt: t('Referensi design system populer dan aturan sederhana untuk proyek kecil.'),
        body: [
          rText('Contoh design system terbuka: Material Design (Google), Human Interface Guidelines (Apple), Fluent (Microsoft), Carbon (IBM), dan Polaris (Shopify). Untuk proyek kecil, cukup buat satu halaman berisi warna, skala huruf, jarak, dan komponen dasar yang konsisten.'),
        ],
      }),
      limitStep({
        analogy: t('Design token seperti nama kontak "Ibu" di HP'),
        same: [
          t('Mengubah nilai di satu tempat (token/kontak) otomatis memperbarui seluruh pemakainya.'),
        ],
        different: [
          t('Design token dapat disusun bertingkat (token dasar → token semantik → token komponen) dan ditukar nilainya sekaligus saat beralih ke Dark Mode.'),
          t('Design system tidak menggantikan kebutuhan mengerti alasan desain; tim tetap perlu membaca dokumentasi kapan komponen dipakai.'),
        ],
      }),
      simStep(
        'tombol-seribu-wajah',
        t('Amati bagaimana satu tombol standar mengikuti token warna, padding, dan radius secara konsisten.'),
      ),
      qStep(
        makeMcq({
          id: 'a09-l05-q1',
          type: 'analogy',
          prompt: t('Mengapa design system sering diibaratkan sebagai keping LEGO yang baku?'),
          choices: [
            { id: 'same', label: t('Siapa pun yang merakit halaman baru, hasilnya otomatis seragam dan menyatu') },
            {
              id: 'hard',
              label: t('Karena hanya boleh dimainkan di layar komputer besar'),
              explainWrong: t('Design system justru membantu desain konsisten di semua ukuran layar.'),
            },
            {
              id: 'one',
              label: t('Karena hanya bisa dipakai satu kali lalu dibuang'),
              explainWrong: t('Keunggulan komponen dan token adalah dapat dipakai berulang kali.'),
            },
          ],
          answer: 'same',
          explainCorrect: t('Tepat! Aturan dan keping standar mencegah tampilan belang-belang antarhalaman.'),
          tags: ['design-token'],
        }),
      ),
      qStep({
        id: 'a09-l05-q2',
        type: 'match',
        prompt: t('Pasangkan tiga bagian utama dalam Design System dengan isinya:'),
        difficulty: 2,
        left: [
          { id: 'sg', label: t('Style guide') },
          { id: 'cl', label: t('Component library') },
          { id: 'doc', label: t('Dokumentasi') },
        ],
        right: [
          { id: 'r1', label: t('Tombol, input, kartu, dan modal jadi lengkap dengan state') },
          { id: 'r2', label: t('Aturan warna, huruf, ikon, jarak, dan nada bahasa') },
          { id: 'r3', label: t('Petunjuk kapan dan bagaimana tiap komponen dipakai') },
        ],
        answer: { sg: 'r2', cl: 'r1', doc: 'r3' },
        explainCorrect: t('Benar! Ketiga bagian ini menjaga konsistensi tampilan sekaligus cara pemakaiannya.'),
        tags: ['design-token'],
      }),
      qStep({
        id: 'a09-l05-q3',
        type: 'spotbug',
        prompt: t('Ketuk baris CSS yang masih menulis kode warna mentah langsung sehingga akan terlewat jika token warna merek berubah:'),
        difficulty: 2,
        lines: [
          '.tombol-aksi {',
          '  background: var(--color-primary);',
          '  border-color: #2F6FED;',
          '  padding: var(--space-2) var(--space-4);',
          '}',
        ],
        answer: [3],
        explainCorrect: t('Jeli! Baris 3 menulis #2F6FED secara manual. Seharusnya juga memakai var(--color-primary).'),
        tags: ['design-token'],
      }),
      qStep(
        makeMcq({
          id: 'a09-l05-q4',
          type: 'limit',
          analogy: t('Token seperti kontak telepon bernama "Ibu"'),
          prompt: t('Kemampuan apa yang dimiliki design token CSS tetapi TIDAK dimiliki satu kontak telepon biasa?'),
          choices: [
            { id: 'theme', label: t('Bisa menukar seluruh palet nilai sekaligus untuk mode gelap/terang') },
            {
              id: 'save',
              label: t('Menyimpan nilai di satu tempat pusat'),
              explainWrong: t('Keduanya sama-sama menyimpan nilai di satu tempat pusat.'),
            },
            {
              id: 'alias',
              label: t('Memberi nama yang lebih mudah diingat daripada kode mentah'),
              explainWrong: t('Ini juga kesamaannya.'),
            },
          ],
          answer: 'theme',
          explainCorrect: t('Tepat! Dengan mengubah nilai token di tema gelap, seluruh komponen otomatis menyesuaikan.'),
          tags: ['design-token'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a09-l05-q5',
          type: 'scenario',
          story: t('Bito membuat aplikasi catatan pribadi kecil sendirian, tetapi ia ragu apakah harus membangun design system sebesar Material Design dulu sebelum ngoding.'),
          prompt: t('Langkah paling masuk akal untuk proyek kecil Bito adalah…'),
          difficulty: 2,
          choices: [
            { id: 'mini', label: t('Buat satu halaman ringkas berisi daftar warna, skala huruf, jarak, dan komponen dasar lalu pakai konsisten') },
            {
              id: 'big',
              label: t('Tunda proyek 6 bulan untuk menulis 200 halaman dokumentasi dulu'),
              explainWrong: t('Terlalu berlebihan untuk proyek kecil satu orang.'),
            },
            {
              id: 'none',
              label: t('Pakai warna berbeda-beda di setiap tombol agar cepat'),
              explainWrong: t('Tetap perlu konsistensi dasar agar aplikasi rapi.'),
            },
          ],
          answer: 'mini',
          explainCorrect: t('Benar! Design system untuk proyek kecil cukup sederhana namun disiplin dipakai.'),
          tags: ['design-token'],
        }),
      ),
      qStep({
        id: 'a09-l05-q6',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi CSS berikut untuk mendeklarasikan token jarak 16px dan memakainya pada padding kartu:'),
        template: ':root { --space-4: ___; }\n.kartu { padding: var(___); }',
        bank: ['16px', '--space-4', '#2F6FED', 'var'],
        answer: ['16px', '--space-4'],
        explainCorrect: t('Tepat! Deklarasi variabel diawali dua tanda hubung (--) di :root dan dipanggil dengan var(...).'),
        tags: ['design-token'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a09-l05-r1',
        prompt: t('Mengapa penulisan #2F6FED di 200 tempat sebaiknya diganti dengan design token --color-primary?'),
        choices: [
          { id: 'easy', label: t('Agar jika warna merek berganti, cukup ubah satu baris di :root') },
          {
            id: 'dark',
            label: t('Karena browser melarang kode hex di file CSS'),
            explainWrong: t('Browser mendukung kode hex; token dipakai demi kemudahan pemeliharaan.'),
          },
        ],
        answer: 'easy',
        explainCorrect: t('Design token menghemat waktu saat pembaruan merek atau tema.'),
        tags: ['design-token'],
      }),
      makeTf({
        id: 'a09-l05-r2',
        prompt: t('Polaris (Shopify) dan Carbon (IBM) adalah contoh design system terbuka yang bisa dipelajari.'),
        answer: true,
        explainCorrect: t('Betul! Selain Material Design dan Fluent, Polaris dan Carbon juga terbuka untuk dipelajari.'),
        explainWrong: t('Keduanya memang contoh design system terbuka yang populer.'),
        tags: ['design-token'],
      }),
    ],
    recap: t(
      'Design system menyatukan aturan dan komponen; design token menyimpan nilai desain di satu nama pusat.',
      'Design system memadukan style guide, component library, dan dokumentasi, dengan design token (--nama-token) sebagai fondasi konsistensi.',
    ),
  }),

  makeLesson({
    id: 'a09-l06',
    worldId: 'a09',
    title: 'Atomic design',
    modes: ['pro'],
    objective: t(
      'Aku bisa menyusun antarmuka dari bagian terkecil hingga halaman utuh dengan pola Atomic Design.',
      'Aku bisa mengurutkan dan mengelompokkan elemen UI ke lima level Atomic Design: Atom, Molecule, Organism, Template, dan Page.',
    ),
    estMinutes: 5,
    introducesTerms: ['atomic-design'],
    usesTerms: ['komponen-ui', 'design-token', 'wireframe'],
    warmupFrom: 'a09-l05',
    steps: [
      storyStep('a09/atomic-design.svg', [
        rText(
          'Seperti materi alam yang tersusun dari atom-atom kecil menjadi molekul hingga benda utuh, Brad Frost merancang cara menyusun halaman web dari keping terkecil bernama Atomic Design!',
        ),
      ]),
      conceptStep({
        title: t('Atom & Molecule (Keping Dasar & Gabungan Kecil)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'atomic-atom-molecule' },
        alt: t('Atom berupa label, input, tombol; bergabung menjadi Molecule kotak pencarian.'),
        body: [
          rTerm('atomic-design', 'Atomic Design'),
          rText(' dimulai dari '),
          rBold('1. Atom'),
          rText(' (bagian terkecil yang tak dipecah lagi: label, input, tombol, ikon) lalu '),
          rBold('2. Molecule'),
          rText(' (gabungan beberapa atom yang bekerja bersama, misalnya kotak pencarian).'),
        ],
      }),
      conceptStep({
        title: t('Organism (Bagian Utuh Antarmuka)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'atomic-organism' },
        alt: t('Organism berupa header yang menggabungkan logo, menu navigasi, dan molecule pencarian.'),
        body: [
          rBold('3. Organism'),
          rText(' adalah gabungan molekul dan atom yang membentuk satu bagian antarmuka mandiri—misalnya '),
          rCode('<header>'),
          rText(' berisi logo, menu navigasi, dan kotak pencarian.'),
        ],
      }),
      conceptStep({
        title: t('Template & Page (Kerangka hingga Isi Nyata)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a09', topic: 'atomic-template-page' },
        alt: t('Template kerangka tata letak tanpa isi asli, lalu Page berisi konten sesungguhnya.'),
        body: [
          rBold('4. Template'),
          rText(' menyusun organism ke dalam kerangka halaman tanpa isi asli (mirip '),
          rTerm('wireframe', 'wireframe'),
          rText(' terstruktur). Terakhir, '),
          rBold('5. Page'),
          rText(' adalah template yang sudah diisi teks, gambar, dan data sungguhan.'),
        ],
      }),
      limitStep({
        analogy: t('Susunan antarmuka seperti atom kimia membentuk materi'),
        same: [
          t('Bagian besar dibangun dengan menggabungkan komponen kecil yang sama berulang kali.'),
        ],
        different: [
          t('Batas antara Molecule dan Organism di UI tidak sekaku ikatan atom kimia; tim bebas menyepakati kategorinya selama struktur folder tetap jelas.'),
          t('Di framework seperti React atau Vue, semuanya tetap ditulis sebagai "komponen" yang saling memanggil.'),
        ],
      }),
      simStep(
        'tombol-seribu-wajah',
        t('Amati tombol "Simpan Pesanan" sebagai contoh Atom yang nanti masuk ke kartu/form Molecule dan Organism.'),
      ),
      qStep({
        id: 'a09-l06-q1',
        type: 'order',
        prompt: t('Urutkan lima tingkat Atomic Design dari yang paling KECIL ke paling UTUH:'),
        difficulty: 2,
        items: [
          { id: 'org', label: t('Organism (contoh: Header lengkap)') },
          { id: 'atom', label: t('Atom (contoh: Tombol atau Input)') },
          { id: 'page', label: t('Page (Template berisi konten nyata)') },
          { id: 'mol', label: t('Molecule (contoh: Kotak pencarian)') },
          { id: 'tpl', label: t('Template (Kerangka halaman)') },
        ],
        answer: ['atom', 'mol', 'org', 'tpl', 'page'],
        explainCorrect: t('Sempurna! Atom → Molecule → Organism → Template → Page.'),
        tags: ['atomic-design'],
      }),
      qStep(
        makeMcq({
          id: 'a09-l06-q2',
          type: 'analogy',
          prompt: t('Jika tombol "Cari" dan kotak input teks adalah Atom, maka gabungan keduanya menjadi kotak pencarian disebut…'),
          choices: [
            { id: 'mol', label: t('Molecule') },
            {
              id: 'tpl',
              label: t('Template'),
              explainWrong: t('Template adalah kerangka tata letak satu halaman.'),
            },
            {
              id: 'page',
              label: t('Page'),
              explainWrong: t('Page adalah satu halaman penuh berisi data asli.'),
            },
          ],
          answer: 'mol',
          explainCorrect: t('Benar! Beberapa atom yang bergabung menjalankan satu tugas kecil membentuk Molecule.'),
          tags: ['atomic-design'],
        }),
      ),
      qStep({
        id: 'a09-l06-q3',
        type: 'sort',
        prompt: t('Kelompokkan contoh elemen berikut ke tingkat Atom atau Organism:'),
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
        explainCorrect: t('Tepat! Bagian tunggal terkecil adalah Atom, sedangkan bagian antarmuka yang kompleks adalah Organism.'),
        tags: ['atomic-design'],
      }),
      qStep(
        makeMcq({
          id: 'a09-l06-q4',
          type: 'limit',
          analogy: t('Atomic Design seperti atom kimia'),
          prompt: t('Apa hal yang TIDAK seketat hukum kimia saat menerapkan Atomic Design di kode proyek?'),
          choices: [
            { id: 'flex', label: t('Batas antara Molecule dan Organism bersifat fleksibel sesuai kesepakatan tim') },
            {
              id: 'small',
              label: t('Komponen besar tersusun dari komponen lebih kecil'),
              explainWrong: t('Itu justru prinsip inti yang sama antara keduanya.'),
            },
            {
              id: 'reuse',
              label: t('Bagian kecil dapat dipakai ulang di banyak tempat'),
              explainWrong: t('Keduanya mengandalkan pengulangan unit kecil.'),
            },
          ],
          answer: 'flex',
          explainCorrect: t('Benar! Atomic Design adalah cara berpikir menyusun komponen, bukan aturan kaku yang tidak boleh disesuaikan.'),
          tags: ['atomic-design'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a09-l06-q5',
          type: 'scenario',
          story: t('Nadia ingin menguji apakah tata letak halaman produk sudah bagus walau judul dan foto produk diganti teks contoh sementara.'),
          prompt: t('Tingkat Atomic Design mana yang sedang ditinjau Nadia?'),
          difficulty: 2,
          choices: [
            { id: 'tpl', label: t('Template') },
            {
              id: 'atom',
              label: t('Atom'),
              explainWrong: t('Nadia meninjau kerangka seluruh halaman, bukan satu tombol saja.'),
            },
            {
              id: 'page',
              label: t('Page'),
              explainWrong: t('Page sudah memakai konten nyata, sedangkan Nadia memakai teks contoh sementara.'),
            },
          ],
          answer: 'tpl',
          explainCorrect: t('Tepat! Template fokus menguji struktur tata letak sebelum konten asli dimasukkan ke Page.'),
          tags: ['atomic-design'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a09-l06-q6',
          prompt: t('Cara berpikir Atomic Design sejalan dengan konsep komponen bersarang di React dan Vue.'),
          answer: true,
          explainCorrect: t('Betul! Di React/Vue, komponen kecil disusun di dalam komponen lebih besar hingga membentuk halaman.'),
          explainWrong: t('Komponen di React/Vue memang dirancang untuk disusun bertingkat seperti Atomic Design.'),
          tags: ['atomic-design', 'komponen-ui'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a09-l06-r1',
        prompt: t(
          'Pada susunan Atomic Design, manakah yang menjadi keping paling kecil?',
          'Pada hierarki Atomic Design, manakah tingkat paling kecil yang tidak dipecah lagi?',
        ),
        choices: [
          { id: 'atom', label: t('Atom (seperti tombol atau ikon)') },
          {
            id: 'org',
            label: t('Organism (seperti header lengkap)'),
            explainWrong: t('Organism adalah gabungan banyak komponen kecil.'),
          },
        ],
        answer: 'atom',
        explainCorrect: t('Atom adalah batu bata paling dasar dalam Atomic Design.'),
        tags: ['atomic-design'],
      }),
      makeMcq({
        id: 'a09-l06-r2',
        prompt: t(
          'Bedanya Template dan Page di Atomic Design adalah…',
          'Apa perbedaan utama antara Template dan Page dalam Atomic Design?',
        ),
        choices: [
          { id: 'p', label: t('Template masih kerangka kosong, Page sudah berisi konten sungguhan') },
          {
            id: 's',
            label: t('Template hanya untuk HP, Page hanya untuk laptop'),
            explainWrong: t('Keduanya bisa dibuat responsif; bedanya ada pada isi kontennya.'),
          },
        ],
        answer: 'p',
        explainCorrect: t('Page adalah wujud akhir Template setelah diisi foto, judul, dan data asli.'),
        tags: ['atomic-design'],
      }),
    ],
    recap: t(
      'Atomic Design merakit halaman dari Atom, Molecule, Organism, Template, hingga Page.',
      'Atomic Design (Brad Frost) menyusun UI bertahap dari Atom → Molecule → Organism → Template → Page agar terstruktur seperti komponen framework.',
    ),
  }),
];
