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
  id: 'a05',
  track: 'A',
  order: 5,
  title: 'Pulau Responsif',
  tagline: t(
    'Membuat halaman rapi seperti air di HP, tablet, dan laptop.',
    'Menerapkan desain responsif mobile-first, viewport, breakpoint, dan media query.',
  ),
  color: '#0E9AA7',
  illustration: 'a05-pulau-responsif',
  sourceChapters: ['J1-06'],
  requires: ['a04'],
  lessons: ['a05-l01', 'a05-l02', 'a05-l03', 'a05-l04'],
  sideQuests: [],
  boss: {
    title: 'Tantangan Penjaga Pulau Responsif',
    greeting: t(
      'Halo! Tunjukkan apakah halamanmu bisa mengalir rapi seperti air di semua layar!',
      'Buktikan pemahamanmu tentang desain responsif, viewport, breakpoint, dan media query mobile-first.',
    ),
    guardianName: 'Penjaga Pulau Responsif',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'a05-anc-j1',
        prompt: t('Website yang otomatis merapikan susunan kotaknya agar pas di HP, tablet, dan laptop disebut…'),
        choices: [
          {
            id: 'resp',
            label: t('Desain responsif'),
          },
          {
            id: 'stat',
            label: t('Halaman kaku'),
            explainWrong: t('Halaman kaku tidak menyesuaikan bentuk layar.'),
          },
          {
            id: 'serv',
            label: t('Server gudang'),
            explainWrong: t('Server berada di belakang layar untuk menyimpan data.'),
          },
        ],
        answer: 'resp',
        explainCorrect: t('Benar! Desain responsif membuat satu website nyaman dilihat di berbagai ukuran layar.'),
        tags: ['responsif'],
      }),
      makeAnchorMcq({
        id: 'a05-anc-j2',
        prompt: t('Tag khusus di kepala HTML agar layar HP tidak menampilkan halaman dalam versi mengecil sekali adalah…'),
        choices: [
          {
            id: 'vp',
            label: t('Tag meta viewport'),
          },
          {
            id: 'ft',
            label: t('Tag footer'),
            explainWrong: t('Footer hanya untuk bagian bawah halaman.'),
          },
          {
            id: 'bg',
            label: t('Warna latar belakang'),
            explainWrong: t('Warna latar tidak mengatur skala layar HP.'),
          },
        ],
        answer: 'vp',
        explainCorrect: t('Tepat! Meta viewport memberi tahu browser HP agar memakai lebar layar aslinya.'),
        tags: ['viewport'],
      }),
      makeAnchorMcq({
        id: 'a05-anc-j3',
        prompt: t('Titik lebar layar tempat tata letak berubah dari 1 kolom menjadi 2 kolom disebut…'),
        choices: [
          {
            id: 'bp',
            label: t('Breakpoint'),
          },
          {
            id: 'pad',
            label: t('Padding'),
            explainWrong: t('Padding adalah ruang kosong di dalam bingkai kotak.'),
          },
          {
            id: 'var',
            label: t('Variabel'),
            explainWrong: t('Variabel adalah kotak penyimpan nilai di JavaScript.'),
          },
        ],
        answer: 'bp',
        explainCorrect: t('Hebat! Breakpoint adalah batas lebar layar tempat susunan kotak berpindah.'),
        tags: ['breakpoint'],
      }),
      makeAnchorMcq({
        id: 'a05-anc-j4',
        prompt: t('Ikon tiga garis di HP yang menyimpan daftar menu panjang agar layar tetap lega disebut…'),
        choices: [
          {
            id: 'ham',
            label: t('Menu hamburger'),
          },
          {
            id: 'tab',
            label: t('Tabel raksasa'),
            explainWrong: t('Tabel lebar justru membuat layar HP sesak.'),
          },
          {
            id: 'pop',
            label: t('Kartu bertumpuk'),
            explainWrong: t('Kartu bertumpuk dipakai untuk menggantikan kolom atau tabel lebar.'),
          },
        ],
        answer: 'ham',
        explainCorrect: t('Tepat! Menu hamburger menyembunyikan menu di balik ikon tiga garis di layar sempit.'),
        tags: ['responsif'],
      }),
      makeAnchorMcq({
        id: 'a05-anc-j5',
        type: 'limit',
        analogy: t('Website responsif seperti air dalam wadah'),
        prompt: t('Dalam analogi air mengikuti wadah, apa yang BERBEDA pada website asli?'),
        choices: [
          {
            id: 'rule',
            label: t('Website butuh aturan kode ukuran agar isi tidak melebar keluar layar'),
          },
          {
            id: 'fit',
            label: t('Bentuk luarnya bisa berubah mengikuti wadahnya'),
            explainWrong: t('Itu justru persamaan antara air dan website responsif.'),
          },
          {
            id: 'same',
            label: t('Isi utamanya tetap sama walau tempatnya berbeda'),
            explainWrong: t('Kesamaan keduanya adalah isi informasinya tetap sama.'),
          },
        ],
        answer: 'rule',
        explainCorrect: t('Benar! Air mengalir otomatis karena gravitasi, sedangkan web butuh aturan CSS seperti max-width.'),
        tags: ['responsif'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a05-anc-p1',
        prompt: t('Perbedaan utama antara fluid layout dan adaptive layout adalah…'),
        choices: [
          {
            id: 'fl',
            label: t('Fluid memakai satuan cair (% atau fr) yang melebar mulus, sedangkan adaptive memilih beberapa tata letak tetap'),
            explainWrong: t('Tepat.'),
          },
          {
            id: 'no',
            label: t('Adaptive tidak pernah memakai HTML sama sekali'),
            explainWrong: t('Semua halaman web tetap dibangun di atas HTML.'),
          },
          {
            id: 'px',
            label: t('Fluid mewajibkan width: 1200px pada semua elemen'),
            explainWrong: t('Lebar tetap dalam piksel besar justru merusak sifat fluid.'),
          },
        ],
        answer: 'fl',
        explainCorrect: t('Fluid layout melar secara kontinu dengan %/fr, sementara adaptive memilih beberapa ukuran tetap per perangkat.'),
        tags: ['responsif'],
      }),
      makeAnchorMcq({
        id: 'a05-anc-p2',
        prompt: t('Mengapa strategi mobile-first menulis CSS dasar untuk layar kecil lalu menambah aturan lewat min-width?'),
        choices: [
          {
            id: 'mf',
            label: t('Mayoritas akses berasal dari HP dan menambah fitur untuk layar lebar lebih mudah daripada memangkas layar besar'),
          },
          {
            id: 'desk',
            label: t('Karena browser desktop tidak bisa membaca file CSS tanpa min-width'),
            explainWrong: t('Browser desktop membaca seluruh CSS, termasuk aturan dasar.'),
          },
          {
            id: 'js',
            label: t('Agar tidak perlu memakai JavaScript di seluruh aplikasi'),
            explainWrong: t('Mobile-first adalah strategi tata letak CSS, bukan pengganti JS.'),
          },
        ],
        answer: 'mf',
        explainCorrect: t('Tepat. Layar kecil memaksa prioritas konten utama sebelum memperluas kolom ke tablet dan desktop.'),
        tags: ['mobile-first', 'media-query'],
      }),
      makeAnchorMcq({
        id: 'a05-anc-p3',
        prompt: t('Deklarasi CSS standar untuk memastikan gambar tidak pernah meluber keluar dari wadahnya adalah…'),
        choices: [
          {
            id: 'mw',
            label: t('max-width: 100%;'),
          },
          {
            id: 'fw',
            label: t('width: 1200px;'),
            explainWrong: t('Lebar tetap 1200px akan membuat gambar meluber keluar layar HP.'),
          },
          {
            id: 'zi',
            label: t('z-index: 999;'),
            explainWrong: t('z-index mengatur urutan tumpukan lapis, bukan batas lebar.'),
          },
        ],
        answer: 'mw',
        explainCorrect: t('Benar. max-width: 100% membatasi gambar agar mengecil mengikuti lebar wadah induknya.'),
        tags: ['responsif'],
      }),
      makeAnchorMcq({
        id: 'a05-anc-p4',
        prompt: t('Ukuran minimal touch target pada tombol di layar sentuh agar jari tidak salah ketuk adalah sekitar…'),
        choices: [
          {
            id: 'tt',
            label: t('44–48px'),
          },
          {
            id: 'sm',
            label: t('12–16px'),
            explainWrong: t('16px adalah batas minimal teks isi, terlalu kecil untuk area sentuh jari.'),
          },
          {
            id: 'big',
            label: t('320px'),
            explainWrong: t('320px hampir selebar seluruh layar ponsel kecil.'),
          },
        ],
        answer: 'tt',
        explainCorrect: t('Area sentuh minimal sekitar 44–48px memberi ruang nyaman bagi ujung jari manusia.'),
        tags: ['responsif'],
      }),
      makeAnchorMcq({
        id: 'a05-anc-p5',
        prompt: t('Pola paling ramah pengguna untuk menampilkan tabel data yang lebar pada layar ponsel sempit adalah…'),
        choices: [
          {
            id: 'card',
            label: t('Mengubah setiap baris tabel menjadi kartu bertumpuk ke bawah'),
          },
          {
            id: 'tiny',
            label: t('Mengecilkan huruf tabel menjadi 6px agar muat satu layar'),
            explainWrong: t('Huruf 6px tidak terbaca dan melelahkan mata.'),
          },
          {
            id: 'hide',
            label: t('Menghapus separuh kolom data penting tanpa pengganti'),
            explainWrong: t('Pengguna tetap membutuhkan data penting tersebut di HP.'),
          },
        ],
        answer: 'card',
        explainCorrect: t('Tepat. Mengubah tabel menjadi kartu per baris menghindari gulir horizontal yang melelahkan.'),
        tags: ['responsif'],
      }),
      makeAnchorMcq({
        id: 'a05-anc-p6',
        type: 'limit',
        analogy: t('Breakpoint 640px, 768px, 1024px sebagai aturan baku'),
        prompt: t('Mengapa menganggap angka 640px, 768px, dan 1024px sebagai hukum wajib yang tak boleh diubah adalah keliru?'),
        choices: [
          {
            id: 'cont',
            label: t('Angka itu hanya kebiasaan umum; breakpoint idealnya dipasang saat konten memang mulai terlihat sesak atau patah'),
          },
          {
            id: 'err',
            label: t('Karena browser hanya mau menjalankan angka ganjil'),
            explainWrong: t('Browser menerima ukuran piksel berapa pun.'),
          },
          {
            id: 'no',
            label: t('Karena CSS tidak mengenal ukuran piksel'),
            explainWrong: t('CSS mengenal satuan px, rem, %, dan lainnya.'),
          },
        ],
        answer: 'cont',
        explainCorrect: t('Benar. Breakpoint ditentukan oleh kebutuhan tata letak isi halamanmu, bukan sekadar hafalan merek perangkat.'),
        tags: ['breakpoint', 'media-query'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'a05-l01',
    worldId: 'a05',
    title: 'Responsif itu seperti air',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menjelaskan mengapa tampilan web harus menyesuaikan layar HP, tablet, dan laptop.',
      'Aku bisa membedakan desain responsive, fluid, dan adaptive serta menerapkan responsive image.',
    ),
    estMinutes: 5,
    introducesTerms: ['responsif'],
    usesTerms: ['css', 'grid-css', 'flexbox'],
    stickerId: 'air-wadah',
    warmupFrom: 'a04-l06',
    steps: [
      storyStep('a05/air-wadah.svg', [
        rText(
          'Tuangkan air ke gelas, bentuknya seperti gelas. Tuangkan ke mangkuk, bentuknya ikut mangkuk. Website yang baik juga lentur seperti air!',
          'Website dibuka di layar ponsel sempit hingga monitor lebar. Seperti air yang mengikuti bentuk gelas dan mangkuk, tata letak responsif menyesuaikan wadah layarnya.',
        ),
      ]),
      conceptStep({
        title: t('Satu Website, Banyak Wadah', 'Apa Itu Desain Responsif?'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'satu-web-banyak-layar' },
        alt: t('Empat kartu tersusun 1 kolom di HP, 2 kolom di tablet, dan 4 kolom di laptop.'),
        body: [
          rTerm('responsif', 'Desain responsif', 'Desain responsif'),
          rText(
            ' menata ulang isi sesuai lebar layar. HP pakai 1 kolom. Tablet 2 kolom. Laptop 4 kolom.',
            ' memastikan satu halaman yang sama tersusun nyaman pada setiap ukuran layar, misalnya 1 kolom di HP, 2 kolom di tablet, hingga 4 kolom di laptop.',
          ),
        ],
      }),
      conceptStep({
        title: t('Gambar Tidak Boleh Meluber', 'Fluid Layout & Responsive Image'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'fluid-dan-gambar' },
        alt: t('Gambar memakai max-width 100% agar muat rapi dalam wadah.'),
        code: {
          lang: 'css',
          code: 'img { max-width: 100%; height: auto; }',
        },
        body: [
          rText(
            'Pakai ukuran lentur seperti persen atau ',
            'Gunakan satuan lentur seperti persen atau ',
          ),
          rCode('fr'),
          rText(
            ' pada ',
            ' di ',
          ),
          rTerm('grid-css', 'Grid', 'CSS Grid'),
          rText(
            '. Pasang ',
            ', lalu batasi gambar dengan ',
          ),
          rCode('max-width: 100%'),
          rText(' agar tidak keluar kotak.', ' supaya gambar menyusut mengikuti wadahnya.'),
        ],
      }),
      conceptStep({
        title: t('Tiga Gaya Menyesuaikan Layar', 'Responsive vs Fluid vs Adaptive'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'fluid-adaptive-responsive' },
        alt: t('Perbandingan susunan fluid yang melar mulus dan adaptive yang memilih tata letak tetap.'),
        body: [
          rBold('Fluid', 'Fluid'),
          rText(
            ' melar terus memakai persen. ',
            ' melebar dan menyempit mulus dengan persen atau fr. ',
          ),
          rBold('Adaptive', 'Adaptive'),
          rText(
            ' memilih beberapa cetakan tetap. ',
            ' menyiapkan beberapa layout tetap, sedangkan ',
          ),
          rTerm('responsif', 'Responsif', 'Responsif'),
          rText(' menggabungkan kelenturan dan perpindahan kolom.', ' menggabungkan fluid dan perpindahan kolom mulus.'),
        ],
      }),
      limitStep({
        analogy: t('Website responsif seperti air di dalam wadah'),
        same: [
          t('Isi utamanya tetap sama, hanya bentuk susunannya mengikuti ruang yang ada.'),
          t('Tidak memaksa gelas kecil menampung bentuk nampan lebar.'),
        ],
        different: [
          t('Air mengalir bebas tanpa kode, sedangkan website hanya lentur jika kita menulis aturan CSS yang tepat.'),
          t('Di layar sangat lebar, isi perlu dibatasi lebar maksimal agar teks tidak terlalu panjang melebar.'),
        ],
      }),
      simStep(
        'penggeser-layar',
        t(
          'Geser lebar layar dari HP ke laptop dan lihat jumlah kolom berubah!',
          'Uji penggeser lebar layar untuk mengamati perubahan susunan 1, 2, dan 3 kolom secara langsung.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a05-l01-q1',
          type: 'analogy',
          prompt: t('Mengapa website responsif diibaratkan seperti air di gelas dan mangkuk?'),
          choices: [
            { id: 'fit', label: t('Isinya sama, tetapi susunan bentuknya menyesuaikan ukuran layar') },
            {
              id: 'wet',
              label: t('Membuat layar HP terasa basah saat disentuh'),
              explainWrong: t('Air di sini hanya kiasan cara isi menyesuaikan wadahnya.'),
            },
            {
              id: 'gone',
              label: t('Sebagian isi halaman dibuang saat dibuka di laptop'),
              explainWrong: t('Isi utamanya tetap utuh, hanya tata letaknya yang menyesuaikan.'),
            },
          ],
          answer: 'fit',
          explainCorrect: t('Tepat! Seperti air mengikuti wadah, tata letak responsif menyesuaikan lebar layar.'),
          tags: ['responsif'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a05-l01-q2',
          prompt: t('Menambahkan max-width: 100% pada gambar mencegah gambar meluber keluar layar HP.'),
          answer: true,
          explainCorrect: t('Betul! Gambar besar akan otomatis mengecil mengikuti lebar kotaknya.'),
          explainWrong: t('Hampir! Tanpa max-width: 100%, gambar lebar bisa mendorong halaman meluber ke samping.'),
          tags: ['responsif'],
        }),
      ),
      qStep({
        id: 'a05-l01-q3',
        type: 'match',
        prompt: t('Pasangkan perangkat dengan jumlah kolom kartu yang paling nyaman dilihat:'),
        difficulty: 1,
        left: [
          { id: 'hp', label: t('HP (layar sempit)') },
          { id: 'tab', label: t('Tablet (layar sedang)') },
          { id: 'lap', label: t('Laptop (layar lebar)') },
        ],
        right: [
          { id: 'c1', label: t('1 kolom bertumpuk') },
          { id: 'c2', label: t('2 kolom seimbang') },
          { id: 'c4', label: t('4 kolom sejajar') },
        ],
        answer: { hp: 'c1', tab: 'c2', lap: 'c4' },
        explainCorrect: t('Keren! Makin lebar layarnya, makin banyak kolom yang bisa berjajar nyaman.'),
        tags: ['responsif'],
      }),
      qStep(
        makeMcq({
          id: 'a05-l01-q4',
          type: 'limit',
          analogy: t('Responsif seperti air'),
          prompt: t('Apa batas yang perlu diingat dari perumpamaan air untuk website responsif?'),
          difficulty: 2,
          choices: [
            { id: 'css', label: t('Website tidak lentur sendiri; pembuat harus memasang aturan CSS agar rapi') },
            {
              id: 'same',
              label: t('Website bisa dibuka di HP maupun laptop'),
              explainWrong: t('Itu memang kenyataan dan persamaan yang ingin dicapai.'),
            },
            {
              id: 'shape',
              label: t('Susunan kartu berubah sesuai lebar wadah'),
              explainWrong: t('Itu juga bagian yang memang mirip.'),
            },
          ],
          answer: 'css',
          explainCorrect: t('Tepat! Tanpa aturan CSS seperti Grid/Flexbox dan max-width, halaman akan tetap kaku.'),
          tags: ['responsif', 'css'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a05-l01-q5',
          type: 'scenario',
          story: t('Di toko kue Rani, kotak utama dipasang width: 1200px sehingga saat dibuka di HP, tulisannya terpotong ke kanan.'),
          prompt: t('Cara terbaik memperbaikinya agar responsif adalah…'),
          difficulty: 2,
          choices: [
            { id: 'mw', label: t('Ganti width tetap 1200px dengan max-width dan satuan lentur seperti % atau fr') },
            {
              id: 'del',
              label: t('Tulis pesan "Buka hanya di laptop"'),
              explainWrong: t('Sebagian besar pengguna justru membuka web dari HP.'),
            },
            {
              id: 'font',
              label: t('Ubah ukuran huruf menjadi 6px'),
              explainWrong: t('Huruf 6px sangat sulit dibaca di HP.'),
            },
          ],
          answer: 'mw',
          explainCorrect: t('Benar! Menghindari lebar piksel kaku membuat wadah menyusut rapi di layar sempit.'),
          tags: ['responsif'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a05-l01-q6',
          prompt: t('Manakah perbedaan yang benar antara fluid layout dan adaptive layout?'),
          difficulty: 2,
          choices: [
            { id: 'diff', label: t('Fluid melebar mulus dengan % atau fr, sedangkan adaptive memilih beberapa layout tetap') },
            {
              id: 'none',
              label: t('Keduanya melarang pemakaian CSS Grid dan Flexbox'),
              explainWrong: t('Keduanya justru bisa memakai Grid atau Flexbox.'),
            },
            {
              id: 'img',
              label: t('Adaptive hanya boleh dipakai untuk situs berisi gambar'),
              explainWrong: t('Jenis layout tidak dibatasi hanya untuk gambar.'),
            },
          ],
          answer: 'diff',
          explainCorrect: t('Tepat! Fluid melar kontinu, sedangkan adaptive berpindah antar beberapa tata letak tetap.'),
          tags: ['responsif'],
        }),
      ),
      qStep({
        id: 'a05-l01-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi deklarasi CSS agar gambar selalu menyesuaikan batas lebar wadahnya tanpa melebar keluar:'),
        difficulty: 2,
        template: 'img { ___: 100%; height: auto; }',
        bank: ['max-width', 'min-height', 'z-index'],
        answer: ['max-width'],
        explainCorrect: t('Tepat. max-width: 100% memastikan gambar tidak melebihi lebar elemen pembungkusnya.'),
        tags: ['responsif', 'css'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a05-l01-r1',
        prompt: t('Tujuan utama desain responsif adalah…'),
        choices: [
          { id: 'ok', label: t('Satu website tampil rapi di HP, tablet, maupun laptop') },
          { id: 'no', label: t('Membuat tiga alamat domain berbeda untuk tiap perangkat'), explainWrong: t('Responsif memakai satu website yang menyesuaikan diri.') },
        ],
        answer: 'ok',
        explainCorrect: t('Satu situs yang menyesuaikan ukuran layar adalah inti desain responsif.'),
        tags: ['responsif'],
      }),
      makeTf({
        id: 'a05-l01-r2',
        prompt: t('Memasang width: 1200px pada wadah utama membuat tampilan di HP menjadi sangat nyaman.'),
        answer: false,
        explainCorrect: t('Benar, itu keliru! Lebar kaku 1200px membuat halaman HP meluber ke samping.'),
        explainWrong: t('Hampir! Lebar 1200px jauh melebihi layar HP yang sekitar 360–400px.'),
        tags: ['responsif'],
      }),
    ],
    recap: t(
      'Desain responsif membuat satu website rapi di semua ukuran layar seperti air mengikuti wadah.',
      'Desain responsif memadukan fluid layout (% atau fr), responsive image (max-width: 100%), dan penyesuaian kolom.',
    ),
    companion: {
      talkPrompts: ['Kalau kita tuang air ke gelas kecil lalu ke mangkuk lebar, apa yang berubah dan apa yang tetap sama?'],
      offlineActivity: 'Buka satu website yang sama di HP dan laptop, lalu hitung berapa kolom kartu yang muncul di masing-masing layar.',
    },
  }),

  makeLesson({
    id: 'a05-l02',
    worldId: 'a05',
    title: 'Viewport dan breakpoint',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengenali area layar (viewport) dan titik berubahnya susunan (breakpoint).',
      'Aku bisa menjelaskan fungsi tag meta viewport, breakpoint umum, touch target, dan orientation.',
    ),
    estMinutes: 5,
    introducesTerms: ['viewport', 'breakpoint'],
    usesTerms: ['responsif', 'html'],
    warmupFrom: 'a05-l01',
    steps: [
      storyStep('a05/jendela-rambu.svg', [
        rText(
          'Bayangkan melihat kota lewat jendela kereta. Lebar jendela itu batas pandangmu. Di jalan juga ada rambu kapan barisan harus berpisah jalur!',
          'Saat melihat halaman web, ukuran jendela perangkat menjadi batas tampilan (viewport), sedangkan titik perubahan tata letak bekerja seperti rambu pengatur jalur (breakpoint).',
        ),
      ]),
      conceptStep({
        title: t('Jendela Layar: Viewport', 'Mengenal Viewport & Tag Meta'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'meta-viewport' },
        alt: t('Perbandingan HP tanpa meta viewport mengecil dan HP dengan meta viewport terbaca jelas.'),
        code: {
          lang: 'html',
          code: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        },
        body: [
          rTerm('viewport', 'Viewport', 'Viewport'),
          rText(
            ' adalah luas layar yang terlihat mata. Tag meta di ',
            ' adalah area jendela browser yang tampak. Tag ',
          ),
          rTerm('html', 'HTML', 'HTML'),
          rText(
            ' mencegah HP mengecilkan halaman.',
            ' di kepala dokumen mencegah HP mengecilkan halaman versi desktop menjadi mini.',
          ),
        ],
      }),
      conceptStep({
        title: t('Titik Pindah Jalur: Breakpoint', 'Breakpoint Umum Layar'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'tangga-breakpoint' },
        alt: t('Tangga ukuran breakpoint 640px HP besar, 768px tablet, 1024px laptop, 1280px desktop.'),
        body: [
          rTerm('breakpoint', 'Breakpoint', 'Breakpoint'),
          rText(
            ' adalah batas lebar saat susunan berubah. Misalnya 640px, 768px, 1024px, dan 1280px.',
            ' menandai titik lebar (umumnya 640px, 768px, 1024px, 1280px) tempat jumlah kolom dan navigasi berubah.',
          ),
        ],
      }),
      conceptStep({
        title: t('Ramah Jari & Arah Layar', 'Touch Target & Orientation'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'touch-target-orientasi' },
        alt: t('Tombol minimal 44-48px nyaman disentuh jari pada layar portrait maupun landscape.'),
        body: [
          rText(
            'Area sentuh tombol minimal 44–48px agar jari tidak salah pencet. Layar bisa tegak (portrait) atau mendatar (landscape).',
            'Pastikan touch target minimal 44–48px agar mudah diketuk jari di layar sentuh, baik saat posisi portrait (tegak) maupun landscape (mendatar).',
          ),
        ],
      }),
      limitStep({
        analogy: t('Jendela kereta dan rambu jalan untuk viewport & breakpoint'),
        same: [
          t('Jendela membatasi area terlihat (viewport), dan rambu menandai titik perubahan susunan (breakpoint).'),
        ],
        different: [
          t('Angka breakpoint seperti 768px bukan peraturan kaku; desainer bebas memilih angka lain jika isi halaman mulai tampak sesak.'),
          t('Pengguna bisa memutar HP dari portrait ke landscape kapan saja sehingga lebar viewport berubah seketika.'),
        ],
      }),
      simStep(
        'penggeser-layar',
        t(
          'Geser lebar layar melewati angka 620px dan 900px. Perhatikan kapan kartu berpindah kolom!',
          'Uji langsung breakpoint pada simulator penggeser layar dengan melewati batas 620px dan 900px.',
        ),
      ),
      qStep({
        id: 'a05-l02-q1',
        type: 'hotspot',
        prompt: t('Ketuk angka breakpoint yang paling umum menandai batas masuk ukuran Tablet!'),
        image: 'a05-hotspot',
        difficulty: 1,
        regions: [
          { id: 'r360', shape: 'rect', coords: [10, 10, 90, 50], label: '360px (HP kecil)' },
          { id: 'r768', shape: 'rect', coords: [110, 10, 190, 50], label: '768px (Tablet)' },
          { id: 'r1024', shape: 'rect', coords: [210, 10, 290, 50], label: '1024px (Laptop)' },
          { id: 'r1440', shape: 'rect', coords: [310, 10, 390, 50], label: '1440px (Monitor lebar)' },
        ],
        answer: 'r768',
        explainCorrect: t('Tepat! 768px adalah kebiasaan umum untuk batas mulai tata letak tablet.'),
        tags: ['breakpoint'],
      }),
      qStep({
        id: 'a05-l02-q2',
        type: 'order',
        prompt: t('Urutkan titik breakpoint dari layar PALING SEMPIT ke PALING LEBAR:'),
        difficulty: 2,
        items: [
          { id: 'b1024', label: t('1024px (Laptop)') },
          { id: 'b640', label: t('640px (HP besar)') },
          { id: 'b1280', label: t('1280px+ (Desktop besar)') },
          { id: 'b768', label: t('768px (Tablet)') },
        ],
        answer: ['b640', 'b768', 'b1024', 'b1280'],
        explainCorrect: t('Mantap! Urutannya naik dari 640px, 768px, 1024px, sampai 1280px+.'),
        tags: ['breakpoint'],
      }),
      qStep(
        makeTf({
          id: 'a05-l02-q3',
          prompt: t('Angka breakpoint 640px, 768px, dan 1024px adalah aturan mutlak yang tidak boleh diubah sama sekali.'),
          answer: false,
          explainCorrect: t('Benar, pernyataan itu salah! Angka tersebut hanya kebiasaan umum dan boleh disesuaikan isi halaman.'),
          explainWrong: t('Hampir! Breakpoint sebaiknya mengikuti kebutuhan isi halamanmu sendiri.'),
          tags: ['breakpoint'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a05-l02-q4',
          type: 'limit',
          analogy: t('Rambu persimpangan jalan untuk breakpoint'),
          prompt: t('Apa perbedaan breakpoint CSS dengan rambu batas kota di jalan raya?'),
          difficulty: 2,
          choices: [
            { id: 'flex', label: t('Angka breakpoint CSS boleh digeser sesuai titik saat konten terlihat sesak') },
            {
              id: 'change',
              label: t('Saat melewati batasnya, aturan tata letak bisa berubah'),
              explainWrong: t('Itu memang persamaannya dengan rambu jalan.'),
            },
            {
              id: 'num',
              label: t('Memakai ukuran jarak tertentu sebagai patokan'),
              explainWrong: t('Keduanya sama-sama memakai patokan ukuran.'),
            },
          ],
          answer: 'flex',
          explainCorrect: t('Tepat! Jika teks atau kartu sudah sempit di 820px, pasang saja breakpoint di 820px.'),
          tags: ['breakpoint'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a05-l02-q5',
          type: 'scenario',
          story: t('Di aplikasi kantin Pak Udin, tombol "Tambah" di layar HP dibuat cuma selebar 20px sehingga jari Dimas sering salah memencet tombol di sebelahnya.'),
          prompt: t('Berapa ukuran minimal area sentuh tombol (touch target) yang disarankan agar jari nyaman mengetuk?'),
          difficulty: 2,
          choices: [
            { id: 'ok', label: t('Sekitar 44–48px') },
            {
              id: 'small',
              label: t('Cukup 10–12px saja'),
              explainWrong: t('10px jauh lebih kecil dari ujung jari manusia.'),
            },
            {
              id: 'huge',
              label: t('Harus tepat 500px'),
              explainWrong: t('500px lebih lebar daripada layar HP biasa.'),
            },
          ],
          answer: 'ok',
          explainCorrect: t('Benar! Ukuran touch target minimal 44–48px mencegah salah pencet di layar sentuh.'),
          tags: ['responsif'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a05-l02-q6',
          prompt: t('Apa yang terjadi jika halaman HTML lupa memasang tag <meta name="viewport"> saat dibuka di HP?'),
          difficulty: 2,
          choices: [
            { id: 'tiny', label: t('Browser HP mengecilkan seluruh halaman versi laptop menjadi tulisan mikro yang susah dibaca') },
            {
              id: 'blank',
              label: t('Layar langsung mati dan berwarna hitam'),
              explainWrong: t('Halaman tetap tampil, hanya skalanya mengecil seperti layar desktop.'),
            },
            {
              id: 'color',
              label: t('Semua warna CSS berubah menjadi abu-abu'),
              explainWrong: t('Tag viewport tidak mengatur warna, melainkan skala lebar layar.'),
            },
          ],
          answer: 'tiny',
          explainCorrect: t('Tepat! Tanpa meta viewport, HP berpura-pura memiliki layar lebar lalu menyusutkannya.'),
          tags: ['viewport', 'html'],
        }),
      ),
      qStep({
        id: 'a05-l02-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi tag meta HTML wajib agar browser seluler menggunakan lebar layar perangkat yang sesungguhnya:'),
        difficulty: 2,
        template: '<meta name="___" content="width=device-width, initial-scale=1.0">',
        bank: ['viewport', 'breakpoint', 'orientation'],
        answer: ['viewport'],
        explainCorrect: t('Benar! name="viewport" dengan width=device-width mengaktifkan skala responsif yang benar di ponsel.'),
        tags: ['viewport', 'html'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a05-l02-r1',
        prompt: t('Area layar yang tampak terlihat oleh pengguna pada perangkatnya disebut…'),
        choices: [
          { id: 'vp', label: t('Viewport') },
          { id: 'bp', label: t('Breakpoint'), explainWrong: t('Breakpoint adalah titik lebar tempat tata letak berubah.') },
        ],
        answer: 'vp',
        explainCorrect: t('Viewport adalah jendela area layar yang terlihat oleh mata pengguna.'),
        tags: ['viewport'],
      }),
      makeMcq({
        id: 'a05-l02-r2',
        prompt: t('Ukuran touch target tombol yang aman agar tidak salah ketuk oleh jari di HP adalah minimal…'),
        choices: [
          { id: 'ok', label: t('44–48px') },
          { id: 'no', label: t('14px'), explainWrong: t('14px terlalu kecil untuk disentuh ujung jari.') },
        ],
        answer: 'ok',
        explainCorrect: t('Sekitar 44–48px memberi ruang sentuh yang aman dan nyaman.'),
        tags: ['responsif'],
      }),
    ],
    recap: t(
      'Viewport adalah luas layar yang terlihat, sedangkan breakpoint adalah titik lebar saat susunan halaman berubah.',
      'Pasang meta viewport di HTML, atur breakpoint sesuai konten, dan jaga touch target minimal 44–48px.',
    ),
    companion: {
      talkPrompts: ['Coba ukur tombol aplikasi di HP pakai ujung jari jempol: apakah ukurannya cukup lebar atau terlalu mepet?'],
      offlineActivity: 'Putar HP dari posisi berdiri (portrait) ke menyamping (landscape) pada sebuah artikel dan amati perubahannya.',
    },
  }),

  makeLesson({
    id: 'a05-l03',
    worldId: 'a05',
    title: 'Media query mobile-first',
    modes: ['pro'],
    objective: t('Aku bisa menjelaskan keuntungan pendekatan mobile-first dan menulis aturan @media (min-width) berurutan.'),
    estMinutes: 6,
    introducesTerms: ['media-query', 'mobile-first'],
    usesTerms: ['responsif', 'viewport', 'breakpoint', 'css', 'grid-css'],
    warmupFrom: 'a05-l02',
    steps: [
      storyStep('a05/tenda-ransel.svg', [
        rText('Bayangkan berkemah: kamu merancang perlengkapan inti agar muat dalam satu ransel kecil lebih dulu, baru menambah ruang tenda tambahan saat menemukan lahan luas.'),
      ]),
      conceptStep({
        title: t('Strategi Mobile-First'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'strategi-mobile-first' },
        alt: t('Alur mobile-first: susunan 1 kolom dasar di HP lalu berkembang menjadi 2 dan 4 kolom.'),
        body: [
          rTerm('mobile-first', 'Mobile-first'),
          rText(' berarti menulis desain dan CSS dasar untuk layar HP lebih dulu. Layar sempit memaksa memilih isi terpenting, dan menambah aturan untuk layar lebar jauh lebih mudah daripada memangkas.'),
        ],
      }),
      conceptStep({
        title: t('Menulis Media Query dengan min-width'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'sintaks-media-query' },
        alt: t('Kode CSS media query min-width 768px dan 1024px.'),
        code: {
          lang: 'css',
          code: `.daftar-kartu {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n}\n@media (min-width: 768px) {\n  .daftar-kartu { grid-template-columns: repeat(2, 1fr); }\n}\n@media (min-width: 1024px) {\n  .daftar-kartu { grid-template-columns: repeat(4, 1fr); }\n}`,
          highlight: [6, 9],
        },
        body: [
          rTerm('media-query', 'Media query'),
          rText(' memakai blok '),
          rCode('@media (min-width: ...)'),
          rText(' yang hanya aktif saat lebar '),
          rTerm('viewport', 'viewport'),
          rText(' minimal mencapai '),
          rTerm('breakpoint', 'breakpoint'),
          rText(' tersebut.'),
        ],
      }),
      conceptStep({
        title: t('Cascade Pada Media Query'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'urutan-min-width' },
        alt: t('Urutan aturan min-width dari kecil ke besar agar cascade CSS menimpa dengan benar.'),
        body: [
          rText('Pada layar 1200px, syarat '),
          rCode('min-width: 768px'),
          rText(' dan '),
          rCode('min-width: 1024px'),
          rText(' sama-sama terpenuhi! Karena CSS menerapkan aturan terakhir (cascade), tulis '),
          rCode('min-width'),
          rText(' berurutan dari kecil ke besar.'),
        ],
      }),
      limitStep({
        analogy: t('Berkemah dari ransel kecil ke lahan luas untuk mobile-first'),
        same: [
          t('Memulai dari kebutuhan paling inti di ruang terbatas, lalu memperluas saat ruang tersedia.'),
        ],
        different: [
          t('Di CSS, aturan dasar HP tidak dibuang saat masuk tablet atau laptop; aturan @media hanya menimpa properti tertentu melalui cascade.'),
        ],
      }),
      simStep(
        'penggeser-layar',
        t('Amati kapan aturan 2 kolom dan 3 kolom aktif saat lebar layar digeser melewati batasnya.'),
      ),
      qStep(
        makeMcq({
          id: 'a05-l03-q1',
          type: 'why',
          base: 'mobile-first',
          prompt: t('Mengapa pendekatan mobile-first lebih dianjurkan saat membangun website modern?'),
          choices: [
            { id: 'why', label: t('Sebagian besar pengguna membuka web lewat HP dan menambah kolom untuk layar lebar lebih mudah daripada memangkas layout desktop') },
            {
              id: 'fast',
              label: t('Karena browser laptop dilarang membaca aturan dasar CSS'),
              explainWrong: t('Browser laptop justru tetap memakai gaya dasar sebagai fondasi.'),
            },
            {
              id: 'html',
              label: t('Karena dengan mobile-first kita tidak perlu menulis HTML sama sekali'),
              explainWrong: t('HTML tetap menjadi kerangka utama halaman.'),
            },
          ],
          answer: 'why',
          explainCorrect: t('Tepat. Layar sempit melatih prioritas informasi terpenting sebelum dikembangkan ke layar besar.'),
          tags: ['mobile-first'],
        }),
      ),
      qStep({
        id: 'a05-l03-q2',
        type: 'spotbug',
        prompt: t('Ketuk baris CSS yang urutannya terbalik sehingga aturan 2 kolom akan mengalahkan aturan 4 kolom pada layar 1200px:'),
        difficulty: 3,
        lines: [
          '.daftar-kartu { display: grid; grid-template-columns: 1fr; }',
          '@media (min-width: 1024px) { .daftar-kartu { grid-template-columns: repeat(4, 1fr); } }',
          '@media (min-width: 768px) { .daftar-kartu { grid-template-columns: repeat(2, 1fr); } }',
        ],
        answer: [3],
        explainCorrect: t('Jeli! Pada 1200px, kedua kondisi min-width benar, sehingga baris ke-3 (768px) yang ditulis terakhir menang menimpa 4 kolom menjadi 2 kolom!'),
        tags: ['media-query', 'mobile-first'],
      }),
      qStep({
        id: 'a05-l03-q3',
        type: 'order',
        prompt: t('Urutkan penulisan aturan CSS mobile-first yang benar dari paling atas ke paling bawah:'),
        difficulty: 2,
        items: [
          { id: 'tab', label: t('@media (min-width: 768px) — 2 kolom tablet') },
          { id: 'lap', label: t('@media (min-width: 1024px) — 4 kolom laptop') },
          { id: 'base', label: t('Gaya dasar .daftar-kartu — 1 kolom untuk HP') },
        ],
        answer: ['base', 'tab', 'lap'],
        explainCorrect: t('Benar! Gaya dasar HP paling atas, lalu min-width 768px, lalu min-width 1024px.'),
        tags: ['mobile-first', 'media-query'],
      }),
      qStep(
        makeMcq({
          id: 'a05-l03-q4',
          type: 'limit',
          analogy: t('Ransel kecil ke tenda luas'),
          prompt: t('Apa batas dari analogi berkemah ketika memahami gaya dasar HP dan media query?'),
          difficulty: 2,
          choices: [
            { id: 'casc', label: t('Aturan dasar HP tetap ikut terpakai di laptop kecuali properti tertentu ditimpa di dalam @media') },
            {
              id: 'core',
              label: t('Memulai dari hal terpenting lebih dulu'),
              explainWrong: t('Ini memang persamaan yang tepat.'),
            },
            {
              id: 'space',
              label: t('Menambah ruang saat tempatnya lebih luas'),
              explainWrong: t('Ini juga persamaan konsepnya.'),
            },
          ],
          answer: 'casc',
          explainCorrect: t('Tepat. Warna, font, gap, dan display: grid dari aturan dasar tetap diwarisi di desktop.'),
          tags: ['mobile-first', 'media-query'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a05-l03-q5',
          type: 'scenario',
          story: t('Sebuah halaman memakai CSS dasar 1fr, @media (min-width: 768px) menjadi 2 kolom, dan @media (min-width: 1024px) menjadi 4 kolom.'),
          prompt: t('Jika halaman itu dibuka di tablet berlebar 900px, berapa kolom yang tampil?'),
          difficulty: 2,
          choices: [
            { id: 'two', label: t('2 kolom') },
            {
              id: 'one',
              label: t('1 kolom'),
              explainWrong: t('900px sudah lebih besar atau sama dengan 768px, jadi media query 768px aktif.'),
            },
            {
              id: 'four',
              label: t('4 kolom'),
              explainWrong: t('900px belum mencapai syarat minimal 1024px.'),
            },
          ],
          answer: 'two',
          explainCorrect: t('Benar! Lebar 900px memenuhi min-width: 768px tetapi belum mencapai 1024px, sehingga tampil 2 kolom.'),
          tags: ['media-query', 'breakpoint'],
        }),
      ),
      qStep({
        id: 'a05-l03-q6',
        type: 'fill',
        prompt: t('Lengkapi kata kunci kondisi media query mobile-first agar 4 kolom aktif pada lebar layar 1024px ke atas:'),
        difficulty: 2,
        template: '@media (___: 1024px) { .daftar-kartu { grid-template-columns: repeat(4, 1fr); } }',
        bank: ['min-width', 'max-height', 'font-size'],
        answer: ['min-width'],
        explainCorrect: t('Tepat! Mobile-first selalu memakai min-width untuk menambah aturan saat layar membesar.'),
        tags: ['media-query', 'mobile-first'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a05-l03-r1',
        prompt: t('Pada gaya CSS mobile-first, syarat kondisi media query yang biasa dipakai untuk layar lebih besar adalah…'),
        choices: [
          { id: 'min', label: t('min-width') },
          { id: 'max', label: t('max-width'), explainWrong: t('max-width dipakai pada gaya desktop-first untuk menyusutkan layar.') },
        ],
        answer: 'min',
        explainCorrect: t('min-width berarti "mulai lebar minimal sekian ke atas".'),
        tags: ['media-query', 'mobile-first'],
      }),
      makeTf({
        id: 'a05-l03-r2',
        prompt: t('Dalam CSS mobile-first, gaya dasar tanpa @media berlaku sebagai tampilan awal untuk layar HP.'),
        answer: true,
        explainCorrect: t('Betul! Gaya dasar itulah yang pertama dibaca untuk ponsel.'),
        explainWrong: t('Gaya dasar di luar @media selalu diterapkan lebih dulu untuk layar kecil.'),
        tags: ['mobile-first'],
      }),
    ],
    recap: t('Tulis gaya dasar untuk layar HP terlebih dahulu, lalu tambahkan penyesuaian layar lebar berurutan dengan @media (min-width).'),
  }),

  makeLesson({
    id: 'a05-l04',
    worldId: 'a05',
    title: 'Pola responsif (hamburger, kolom menumpuk)',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengenali pola menu hamburger, kolom menumpuk, dan kartu pengganti tabel lebar di HP.',
      'Aku bisa memilih pola tata letak responsif yang tepat dan menghindari jebakan layout HP.',
    ),
    estMinutes: 5,
    introducesTerms: [],
    usesTerms: ['responsif', 'viewport', 'breakpoint', 'mobile-first', 'flexbox', 'grid-css'],
    warmupFrom: 'a05-l03',
    steps: [
      storyStep('a05/meja-piknik.svg', [
        rText(
          'Meja piknik lipat bisa dilipat ringkas di bagasi mobil sempit, lalu dibentangkan lebar saat sampai di taman luas.',
          'Seperti meja piknik lipat yang berubah bentuk antara bagasi sempit dan taman luas, antarmuka web memiliki pola baku agar nyaman di HP maupun laptop.',
        ),
      ]),
      conceptStep({
        title: t('Menu Hamburger & Kolom Menumpuk', 'Menu Hamburger & Kolom Menumpuk'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'hamburger-kolom' },
        alt: t('Menu berjajar di laptop menjadi ikon hamburger di HP; kolom samping menumpuk ke bawah.'),
        body: [
          rText(
            'Di HP, menu berjajar disimpan ke dalam tombol tiga garis (hamburger). Dua kotak sejajar di laptop disusun bertumpuk ke bawah.',
            'Pola menu hamburger menyembunyikan daftar tautan di balik ikon tiga garis pada layar sempit, sementara kolom berdampingan ditumpuk vertikal.',
          ),
        ],
      }),
      conceptStep({
        title: t('Tabel Lebar Jadi Kartu', 'Mengubah Tabel Lebar Menjadi Kartu'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'tabel-jadi-kartu' },
        alt: t('Tabel banyak kolom di laptop berubah menjadi kartu vertikal per baris di HP.'),
        body: [
          rText(
            'Tabel dengan banyak kolom susah dibaca di HP. Ubah tiap baris tabel jadi satu kartu. Layar HP tidak perlu geser samping.',
            'Tabel berkolom banyak sulit dibaca pada viewport sempit; ubahlah tiap baris data menjadi satu kartu bertumpuk agar tidak terjadi horizontal scroll.',
          ),
        ],
      }),
      conceptStep({
        title: t('Tiga Pantangan di Layar HP', 'Pantangan Tata Letak Responsif'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'pantangan-responsif' },
        alt: t('Checklist responsif: hindari width 1200px, cegah geser samping, dan teks minimal 16px.'),
        body: [
          rText(
            'Jangan pasang lebar kaku 1200px! Pastikan halaman tidak terpotong ke samping dan teks isi minimal 16px.',
            'Hindari lebar tetap seperti width: 1200px (pakai max-width), cegah gulir ke samping di HP, dan jaga teks isi minimal 16px.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Meja piknik lipat untuk pola responsif'),
        same: [
          t('Menyesuaikan bentuk antara ruang sempit (HP) dan ruang lapang (laptop).'),
        ],
        different: [
          t('Saat dilipat ke layar HP, data penting seperti isi tabel tidak boleh hilang—bentuknya saja berubah menjadi kartu vertikal agar tetap terbaca utuh.'),
        ],
      }),
      simStep(
        'penggeser-layar',
        t(
          'Lihat bagaimana kartu berubah dari berjajar 3 kolom menjadi bertumpuk 1 kolom saat layar dipersempit!',
          'Uji peralihan kolom sejajar menjadi kolom menumpuk saat lebar layar menyusut ke ukuran HP.',
        ),
      ),
      qStep({
        id: 'a05-l04-q1',
        type: 'match',
        prompt: t('Pasangkan masalah layar di HP dengan pola responsif yang paling pas:'),
        difficulty: 2,
        left: [
          { id: 'menu', label: t('Daftar menu navigasi terlalu panjang') },
          { id: 'cols', label: t('Dua kolom berita berjajar jadi gepeng') },
          { id: 'tbl', label: t('Tabel jadwal punya 6 kolom lebar') },
        ],
        right: [
          { id: 'ham', label: t('Menu hamburger (ikon tiga garis)') },
          { id: 'stack', label: t('Kolom menumpuk ke bawah') },
          { id: 'card', label: t('Tabel diubah menjadi kartu per baris') },
        ],
        answer: { menu: 'ham', cols: 'stack', tbl: 'card' },
        explainCorrect: t('Hebat! Setiap masalah layar sempit punya pola responsif andalan.'),
        tags: ['responsif'],
      }),
      qStep(
        makeMcq({
          id: 'a05-l04-q2',
          type: 'analogy',
          prompt: t('Dua kotak berjajar di laptop lalu menumpuk ke bawah saat masuk HP mirip dengan…'),
          choices: [
            { id: 'meja', label: t('Meja piknik yang dilipat ringkas agar muat di bagasi sempit') },
            {
              id: 'batu',
              label: t('Tembok beton yang dipotong hancur supaya masuk rumah'),
              explainWrong: t('Isi website tidak dihancurkan atau dibuang.'),
            },
            {
              id: 'lamp',
              label: t('Lampu kamar yang dimatikan total'),
              explainWrong: t('Konten tetap tampil utuh dengan susunan baru.'),
            },
          ],
          answer: 'meja',
          explainCorrect: t('Benar! Semua bagian tetap berguna, hanya disusun ulang mengikuti ruangnya.'),
          tags: ['responsif'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a05-l04-q3',
          prompt: t('Di HP, halaman website yang bagus seharusnya bisa digeser-geser ke kanan dan kiri dengan bebas.'),
          answer: false,
          explainCorrect: t('Benar, pernyataan itu salah! Di HP, halaman tidak boleh meluber sehingga perlu digeser ke samping.'),
          explainWrong: t('Hampir! Geser kanan-kiri di HP tanda ada elemen yang terlalu lebar.'),
          tags: ['responsif'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a05-l04-q4',
          type: 'limit',
          analogy: t('Meja piknik lipat'),
          prompt: t('Hal apa yang TIDAK sama antara melipat meja piknik dan mengubah tampilan web ke HP?'),
          difficulty: 2,
          choices: [
            { id: 'stay', label: t('Data penting seperti baris tabel tidak disembunyikan, melainkan ditata ulang jadi kartu agar tetap terbaca') },
            {
              id: 'space',
              label: t('Bentuk berubah agar muat di tempat lebih sempit'),
              explainWrong: t('Ini kesamaannya.'),
            },
            {
              id: 'open',
              label: t('Bisa melebar lagi saat berada di tempat luas'),
              explainWrong: t('Ini juga kesamaan dengan layar laptop.'),
            },
          ],
          answer: 'stay',
          explainCorrect: t('Tepat! Pengunjung HP tetap harus bisa membaca isi data secara utuh tanpa geser samping.'),
          tags: ['responsif'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a05-l04-q5',
          type: 'scenario',
          story: t('Sari membuat daftar nilai ujian 6 kolom. Di laptop bagus, tetapi di HP layar harus digeser ke kanan jauh dan angkanya kecil sekali.'),
          prompt: t('Pola responsif manakah yang sebaiknya Sari terapkan?'),
          difficulty: 2,
          choices: [
            { id: 'card', label: t('Ubah tampilan tabel menjadi kartu per siswa di HP dan jaga teks minimal 16px') },
            {
              id: 'fixed',
              label: t('Pasang width: 1200px pada tabel agar bentuknya tidak berubah'),
              explainWrong: t('Lebar tetap 1200px justru memperparah geser kanan-kiri di HP.'),
            },
            {
              id: 'cut',
              label: t('Sembunyikan semua angka nilai saat dibuka di HP'),
              explainWrong: t('Data penting tidak boleh hilang di perangkat HP.'),
            },
          ],
          answer: 'card',
          explainCorrect: t('Benar! Pola tabel jadi kartu membuat data terbaca vertikal rapi di layar ponsel.'),
          tags: ['responsif'],
        }),
      ),
      qStep({
        id: 'a05-l04-q6',
        type: 'spotbug',
        prompt: t('Ketuk baris CSS yang menyebabkan halaman meluber ke samping saat dibuka di HP:'),
        difficulty: 2,
        lines: [
          '.wadah-utama {',
          '  width: 1200px;',
          '  margin: 0 auto;',
          '  font-size: 16px;',
          '}',
        ],
        answer: [2],
        explainCorrect: t('Jeli sekali! Baris 2 memakai width: 1200px yang kaku. Ganti dengan max-width: 1200px; width: 100%;!'),
        tags: ['responsif'],
      }),
      qStep({
        id: 'a05-l04-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Apa sebutan populer untuk tombol ikon tiga garis yang menyembunyikan menu navigasi di layar ponsel?'),
        difficulty: 1,
        accept: ['hamburger', 'menu hamburger', 'hamburger menu'],
        explainCorrect: t('Tepat! Ikon tiga garis bertumpuk itu disebut menu hamburger.'),
        tags: ['responsif'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a05-l04-r1',
        prompt: t('Untuk membatasi lebar wadah utama agar tidak meluber di HP, kita sebaiknya memakai…'),
        choices: [
          { id: 'mw', label: t('max-width') },
          { id: 'fw', label: t('width tetap 1200px'), explainWrong: t('width tetap 1200px akan membuat HP butuh geser ke samping.') },
        ],
        answer: 'mw',
        explainCorrect: t('max-width menjaga batas maksimal di desktop sambil tetap bisa menyusut di HP.'),
        tags: ['responsif'],
      }),
      makeMcq({
        id: 'a05-l04-r2',
        prompt: t('Ukuran teks isi paragraf minimal di HP agar mata tidak cepat lelah adalah…'),
        choices: [
          { id: '16', label: t('16px') },
          { id: '10', label: t('10px'), explainWrong: t('10px terlalu kecil untuk bacaan paragraf di layar HP.') },
        ],
        answer: '16',
        explainCorrect: t('16px menjadi standar aman agar paragraf mudah dibaca di layar ponsel.'),
        tags: ['responsif'],
      }),
    ],
    recap: t(
      'Pakai menu hamburger, kolom menumpuk, dan kartu pengganti tabel agar halaman bebas geser samping di HP.',
      'Terapkan menu hamburger, stacked columns, tabel menjadi kartu, max-width, dan teks minimal 16px pada tampilan mobile.',
    ),
    companion: {
      talkPrompts: ['Pernahkah melihat tombol tiga garis di pojok aplikasi HP? Mengapa menunya tidak dijejerkan semua di atas?'],
      offlineActivity: 'Gambar 2 kotak sejajar di kertas lebar (laptop), lalu gunting dan tempel menumpuk atas-bawah di kertas kecil (HP).',
    },
  }),
];
