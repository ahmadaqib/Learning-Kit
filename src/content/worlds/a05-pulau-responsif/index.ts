import {
  conceptStep,
  limitStep,
  makeAnchorMcq,
  makeLesson,
  makeMcq,
  makeTf,
  qStep,
  rBold,
  rJunior,
  rPro,
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
    'Halaman menyesuaikan diri seperti air dalam wadah. Wadahnya bisa HP, tablet, atau laptop.',
    'Kamu bisa membuat halaman responsif, yaitu satu halaman yang pas di HP, tablet, dan laptop.',
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
      'Halo! Bisakah halamanmu mengalir rapi seperti air di semua layar?',
      'Buktikan kamu bisa membuat halaman yang pas di semua ukuran layar. Soalnya diambil dari 4 pelajaran di pulau ini.',
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
        prompt: t(
          'Halaman web merapikan kotaknya agar pas di HP, tablet, dan laptop. Namanya apa?',
          'Halaman menata ulang kotaknya agar pas di HP, tablet, dan laptop. Apa nama pendekatan ini?',
        ),
        choices: [
          {
            id: 'resp',
            label: t('Desain responsif'),
          },
          {
            id: 'stat',
            label: t('Halaman kaku'),
            explainWrong: t('Halaman kaku tidak mengikuti bentuk layar. Kotaknya tetap di tempat.'),
          },
          {
            id: 'serv',
            label: t('Halaman cepat'),
            explainWrong: t('Cepat itu soal kecepatan. Responsif itu soal bentuk yang mengikuti layar.'),
          },
        ],
        answer: 'resp',
        explainCorrect: t('Halaman responsif mengikuti ukuran layar. Seperti air yang mengikuti bentuk wadah.'),
        tags: ['responsif'],
      }),
      makeAnchorMcq({
        id: 'a05-anc-j2',
        prompt: t('Halaman web tampil sangat kecil di HP. Apa yang kurang?'),
        choices: [
          {
            id: 'vp',
            label: t('Tanda lebar layar'),
          },
          {
            id: 'ft',
            label: t('Tanda ukuran gambar'),
            explainWrong: t('Tanda itu hanya mengatur besar gambar. Ia tidak memberi tahu lebar layar.'),
          },
          {
            id: 'bg',
            label: t('Tanda warna tulisan'),
            explainWrong: t('Tanda itu hanya mewarnai tulisan. Ia tidak memberi tahu lebar layar.'),
          },
        ],
        answer: 'vp',
        explainCorrect: t(
          'Tanpa tanda ini, HP mengira layarnya selebar laptop. Semua isi pun mengecil.',
          'Meta viewport memberi tahu browser HP agar memakai lebar layar aslinya.',
        ),
        tags: ['viewport'],
      }),
      makeAnchorMcq({
        id: 'a05-anc-j3',
        prompt: t(
          'Layar melebar, lalu kartu pindah ke 2 kolom. Titik pindah itu bernama apa?',
          'Apa nama titik lebar layar tempat tata letak berubah dari 1 kolom menjadi 2 kolom?',
        ),
        choices: [
          {
            id: 'bp',
            label: t('Breakpoint'),
          },
          {
            id: 'pad',
            label: t('Padding'),
            explainWrong: t('Padding adalah ruang kosong di dalam kotak. Ia tidak memindahkan kartu.'),
          },
          {
            id: 'var',
            label: t('Variabel'),
            explainWrong: t('Variabel adalah kotak penyimpan isi. Ia tidak mengatur lebar layar.'),
          },
        ],
        answer: 'bp',
        explainCorrect: t(
          'Breakpoint adalah titik lebar layar tempat susunan berpindah. Seperti rambu batas kota: lewat rambu, aturan berubah.',
          'Breakpoint adalah batas lebar layar tempat susunan kotak berpindah.',
        ),
        tags: ['breakpoint'],
      }),
      makeAnchorMcq({
        id: 'a05-anc-j4',
        prompt: t('Di pojok layar HP ada ikon tiga garis. Apa nama ikon itu?'),
        choices: [
          {
            id: 'ham',
            label: t('Menu hamburger'),
          },
          {
            id: 'tab',
            label: t('Tombol cari'),
            explainWrong: t('Tombol cari bergambar kaca pembesar. Ikon tiga garis menyimpan menu.'),
          },
          {
            id: 'pop',
            label: t('Tombol bagikan'),
            explainWrong: t('Tombol bagikan bergambar panah atau titik. Ikon tiga garis menyimpan menu.'),
          },
        ],
        answer: 'ham',
        explainCorrect: t(
          'Ikon tiga garis itu bernama menu hamburger. Ia menyimpan menu panjang agar layar HP lega.',
          'Menu hamburger menyembunyikan menu di balik ikon tiga garis di layar sempit.',
        ),
        tags: ['responsif'],
      }),
      makeAnchorMcq({
        id: 'a05-anc-j5',
        type: 'limit',
        analogy: t('Halaman web seperti air dalam wadah'),
        prompt: t('Air mengalir sendiri ke wadah. Apa yang berbeda dengan halaman web?'),
        choices: [
          {
            id: 'rule',
            label: t('Halaman perlu aturan dari kita'),
          },
          {
            id: 'fit',
            label: t('Bentuknya mengikuti wadah'),
            explainWrong: t('Itu persamaannya. Air dan halaman sama-sama mengikuti wadah.'),
          },
          {
            id: 'same',
            label: t('Isinya tetap sama'),
            explainWrong: t('Itu juga persamaannya. Isi air dan isi halaman tetap sama.'),
          },
        ],
        answer: 'rule',
        explainCorrect: t('Air mengalir sendiri. Halaman hanya lentur kalau kita menulis aturannya.'),
        tags: ['responsif'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a05-anc-p1',
        prompt: t('Apa beda utama fluid layout dan adaptive layout?'),
        choices: [
          {
            id: 'fl',
            label: t('Fluid melebar mulus; adaptive memilih beberapa tata letak tetap'),
          },
          {
            id: 'no',
            label: t('Fluid berpindah antar tata letak tetap; adaptive melebar mulus'),
            explainWrong: t('Itu terbalik. Fluid yang melar mulus, dan adaptive yang berpindah antar tata letak tetap.'),
          },
          {
            id: 'px',
            label: t('Fluid mengatur lebar kolom; adaptive mengatur ukuran huruf'),
            explainWrong: t('Keduanya mengatur tata letak seluruh halaman. Bedanya ada di cara tata letak berubah.'),
          },
        ],
        answer: 'fl',
        explainCorrect: t('Fluid melar terus mengikuti lebar layar. Adaptive berpindah antar beberapa ukuran tetap.'),
        tags: ['responsif'],
      }),
      makeAnchorMcq({
        id: 'a05-anc-p2',
        prompt: t('Mengapa CSS mobile-first dimulai dari layar kecil?'),
        choices: [
          {
            id: 'mf',
            label: t('Layar kecil memaksa memilih isi terpenting dulu'),
          },
          {
            id: 'desk',
            label: t('Aturan max-width membuat halaman dimuat lebih lambat'),
            explainWrong: t('Max-width tidak membuat halaman lebih lambat. Mobile-first soal urutan, bukan kecepatan.'),
          },
          {
            id: 'js',
            label: t('Situs mobile-first tidak memakai JavaScript'),
            explainWrong: t('Mobile-first mengatur tata letak lewat CSS. JavaScript tetap boleh dipakai.'),
          },
        ],
        answer: 'mf',
        explainCorrect: t('Layar sempit memaksa prioritas isi dari awal. Menambah kolom untuk layar lebar lebih mudah daripada memangkas.'),
        tags: ['mobile-first', 'media-query'],
      }),
      makeAnchorMcq({
        id: 'a05-anc-p3',
        prompt: t('Deklarasi CSS mana yang membuat gambar tidak meluber dari wadahnya?'),
        choices: [
          {
            id: 'mw',
            label: t('max-width: 100%;'),
          },
          {
            id: 'fw',
            label: t('width: 1200px;'),
            explainWrong: t('Lebar tetap 1200px membuat gambar meluber di layar HP.'),
          },
          {
            id: 'zi',
            label: t('z-index: 999;'),
            explainWrong: t('z-index mengatur urutan tumpukan, bukan batas lebar.'),
          },
        ],
        answer: 'mw',
        explainCorrect: t('max-width: 100% membuat gambar menyusut mengikuti lebar wadahnya.'),
        tags: ['responsif'],
      }),
      makeAnchorMcq({
        id: 'a05-anc-p4',
        prompt: t('Berapa ukuran touch target yang disarankan agar jari tidak salah ketuk?'),
        choices: [
          {
            id: 'tt',
            label: t('44–48px'),
          },
          {
            id: 'sm',
            label: t('12–16px'),
            explainWrong: t('16px adalah ukuran teks isi, terlalu kecil untuk area sentuh jari.'),
          },
          {
            id: 'big',
            label: t('24–28px'),
            explainWrong: t('24px adalah batas minimum di pedoman aksesibilitas WCAG. Apple dan Google menyarankan 44–48px agar nyaman untuk jari.'),
          },
        ],
        answer: 'tt',
        explainCorrect: t('Apple menyarankan 44px dan Google 48px, cukup lega untuk ujung jari.'),
        tags: ['responsif'],
      }),
      makeAnchorMcq({
        id: 'a05-anc-p5',
        prompt: t('Cara mana yang paling nyaman untuk menampilkan tabel lebar di HP?'),
        choices: [
          {
            id: 'card',
            label: t('Ubah setiap baris tabel menjadi kartu bertumpuk'),
          },
          {
            id: 'tiny',
            label: t('Kecilkan huruf tabel menjadi 6px agar muat'),
            explainWrong: t('Huruf 6px tidak terbaca dan melelahkan mata.'),
          },
          {
            id: 'hide',
            label: t('Hapus separuh kolom data tanpa pengganti'),
            explainWrong: t('Data penting tetap dibutuhkan di HP. Menghapus kolom membuat isinya hilang.'),
          },
        ],
        answer: 'card',
        explainCorrect: t('Kartu per baris menghindari gulir ke samping yang melelahkan.'),
        tags: ['responsif'],
      }),
      makeAnchorMcq({
        id: 'a05-anc-p6',
        type: 'limit',
        analogy: t('Breakpoint 640px, 768px, 1024px sebagai aturan baku'),
        prompt: t('Mengapa 640px, 768px, dan 1024px bukan angka wajib?'),
        choices: [
          {
            id: 'cont',
            label: t('Angka itu kebiasaan umum; pasang saat isi sesak'),
          },
          {
            id: 'err',
            label: t('Setiap browser punya angka breakpoint sendiri'),
            explainWrong: t('Browser menerima ukuran berapa pun. Penulis CSS yang memilih angkanya.'),
          },
          {
            id: 'no',
            label: t('Angka itu hanya berlaku untuk layar HP'),
            explainWrong: t('Breakpoint dipakai di semua ukuran layar. Angkanya bebas dipilih.'),
          },
        ],
        answer: 'cont',
        explainCorrect: t('Breakpoint mengikuti kebutuhan tata letak isi halamanmu, bukan angka perangkat.'),
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
      'Aku bisa menjelaskan mengapa halaman web menyesuaikan layar.',
      'Kamu bisa membedakan desain responsif, fluid, dan adaptive, lalu memakai gambar responsif.',
    ),
    estMinutes: 6,
    introducesTerms: ['responsif'],
    usesTerms: ['css', 'grid-css', 'flexbox'],
    stickerId: 'air-wadah',
    warmupFrom: 'a04-l06',
    atWork:
      'Kamu akan menguji satu halaman di mode HP dan mode laptop pada DevTools sebelum halaman dirilis.',
    steps: [
      storyStep('a05/air-wadah.svg', [
        rText(
          'Air di gelas berbentuk gelas. Air di mangkuk berbentuk mangkuk. Bisakah halaman web ikut bentuk layar juga?',
          'Halaman toko dibuka di HP sempit dan di monitor lebar. Bagaimana satu halaman bisa pas di keduanya?',
        ),
      ]),
      conceptStep({
        title: t('Satu halaman, banyak wadah', 'Apa itu desain responsif?'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'satu-web-banyak-layar' },
        alt: t(
          'Empat kartu: 1 kolom di HP, 2 di tablet, 4 di laptop.',
          'Empat kartu: 1 kolom di HP, 2 kolom di tablet, 4 kolom di laptop.',
        ),
        body: [
          rTerm('responsif', 'Desain responsif', 'Desain responsif'),
          rText(
            ' artinya halaman mengikuti ukuran layar. HP memakai 1 kolom, tablet 2 kolom, laptop 4 kolom. Jadi halaman ikut bentuk layar, seperti air ikut wadah.',
            ' adalah cara membuat satu halaman tampil nyaman di semua ukuran layar. Contohnya 1 kolom di HP, 2 kolom di tablet, dan 4 kolom di laptop.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a05-l01-q1',
          type: 'analogy',
          prompt: t(
            'Air berubah bentuk mengikuti wadahnya. Halaman web mirip air dalam hal apa?',
            'Mengapa desain responsif diibaratkan air di gelas dan mangkuk?',
          ),
          choices: [
            {
              id: 'fit',
              label: t('Susunannya menyesuaikan ukuran layar', 'Isi sama, susunan menyesuaikan ukuran layar'),
            },
            {
              id: 'wet',
              label: t('Tiap layar memakai halaman yang berbeda', 'Halaman dibuat terpisah untuk tiap perangkat'),
              explainWrong: t(
                'Responsif memakai satu halaman saja. Seperti satu air yang mengikuti banyak wadah.',
                'Responsif memakai satu halaman yang menyesuaikan diri. Tidak ada salinan per perangkat.',
              ),
            },
            {
              id: 'gone',
              label: t('Sebagian isi dibuang di layar kecil'),
              explainWrong: t(
                'Isi tetap utuh. Air tetap air, hanya bentuknya yang berubah.',
                'Isi utama tetap utuh. Yang berubah hanya tata letaknya.',
              ),
            },
          ],
          answer: 'fit',
          explainCorrect: t(
            'Susunan halaman ikut layar, isinya tetap. Seperti air yang tetap air di gelas atau mangkuk.',
            'Tata letak menyesuaikan lebar layar, isinya tetap sama. Seperti air yang berbentuk gelas atau mangkuk.',
          ),
          hints: [t('Ingat air di gelas dan di mangkuk.', 'Ingat apa yang berubah dan apa yang tetap pada air.')],
          tags: ['responsif'],
        }),
      ),
      conceptStep({
        title: t('Gambar tidak boleh meluber', 'Fluid layout dan gambar responsif'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'fluid-dan-gambar' },
        alt: t(
          'Gambar mengecil rapi di dalam kotak.',
          'Gambar dengan max-width 100% menyusut rapi di dalam wadahnya.',
        ),
        code: {
          lang: 'css',
          code: 'img { max-width: 100%; height: auto; }',
        },
        body: [
          // Jalur Junior: tiga kalimat utuh, tanpa kode.
          rJunior(
            'Gambar besar bisa keluar dari kotaknya di HP. Kita beri gambar aturan: jangan lebih lebar dari kotaknya. Gambar pun mengecil dan muat.',
          ),
          // Jalur Pro: boleh diselingi kode.
          rPro('Satuan lentur membuat kolom ikut melebar dan menyempit. Contohnya persen, atau '),
          rCode('fr', ['pro']),
          rPro(' (bagian dari ruang kosong) di CSS Grid. Agar gambar tidak meluber, tulis '),
          rCode('max-width: 100%', ['pro']),
          rPro('. Gambar lalu menyusut mengikuti wadahnya.'),
        ],
      }),
      simStep(
        'penggeser-layar',
        t(
          'Geser lebar layar dari HP ke laptop dan lihat kolom berubah.',
          'Geser lebar layar dan amati susunan 1, 2, lalu 3 kolom.',
        ),
      ),
      qStep(
        makeTf({
          id: 'a05-l01-q2',
          prompt: t(
            'Gambar besar di HP bisa dibuat mengecil agar muat di kotaknya.',
            'Menambahkan max-width: 100% pada gambar mencegah gambar meluber keluar layar HP.',
          ),
          answer: true,
          explainCorrect: t(
            'Gambar diberi aturan agar tidak lebih lebar dari kotaknya. Seperti air yang pas di gelas kecil.',
            'Gambar mengecil mengikuti lebar wadahnya. Tanpa aturan ini, gambar lebar mendorong halaman meluber ke samping.',
          ),
          explainWrong: t(
            'Gambar besar tanpa aturan bisa keluar dari kotak. Dengan aturan lebar, gambar mengecil dan muat.',
            'Tanpa batas lebar, gambar besar mendorong halaman keluar dari layar. Aturan ini mencegahnya.',
          ),
          hints: [t('Ingat air yang berubah bentuk di gelas kecil.', 'Ingat apa yang terjadi pada gambar besar di layar sempit.')],
          tags: ['responsif'],
        }),
      ),
      conceptStep({
        title: t('Responsive, fluid, dan adaptive'),
        modes: ['pro'],
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'fluid-adaptive-responsive' },
        alt: t('Perbandingan fluid yang melar mulus dan adaptive yang memilih tata letak tetap.'),
        body: [
          rBold('Fluid'),
          rText(' adalah tata letak yang melebar dan menyempit mulus dengan persen atau fr. '),
          rBold('Adaptive'),
          rText(' menyiapkan beberapa tata letak tetap, lalu memilih satu sesuai lebar layar. '),
          rText('Desain responsif menggabungkan keduanya: kolom melar mulus, lalu susunan berpindah di lebar tertentu.'),
        ],
      }),
      limitStep({
        analogy: t('Halaman web seperti air dalam wadah', 'Desain responsif seperti air dalam wadah'),
        same: [
          t(
            'Isinya tetap sama, bentuknya mengikuti wadah.',
            'Isi utamanya tetap sama; hanya susunannya yang mengikuti ruang yang tersedia.',
          ),
        ],
        different: [
          t(
            'Air mengalir sendiri. Halaman hanya lentur kalau kita menulis aturannya.',
            'Air mengalir sendiri karena gravitasi. Halaman hanya lentur kalau CSS-nya ditulis dengan benar, misalnya dengan max-width.',
          ),
        ],
        riskyAnalogy: true,
      }),
      qStep({
        id: 'a05-l01-q3',
        type: 'match',
        prompt: t('Pasangkan layar dengan jumlah kolom yang paling nyaman.'),
        difficulty: 1,
        left: [
          { id: 'hp', label: t('HP', 'HP (layar sempit)') },
          { id: 'tab', label: t('Tablet', 'Tablet (layar sedang)') },
          { id: 'lap', label: t('Laptop', 'Laptop (layar lebar)') },
        ],
        right: [
          { id: 'c1', label: t('1 kolom', '1 kolom bertumpuk') },
          { id: 'c2', label: t('2 kolom', '2 kolom seimbang') },
          { id: 'c4', label: t('4 kolom', '4 kolom sejajar') },
        ],
        answer: { hp: 'c1', tab: 'c2', lap: 'c4' },
        explainCorrect: t(
          'Layar lebih lebar muat lebih banyak kolom. Di HP, kolom yang berjajar jadi terlalu sempit.',
          'Makin lebar layarnya, makin banyak kolom yang muat berjajar. Di HP, kolom yang dijejerkan terlalu gepeng untuk dibaca.',
        ),
        hints: [t('Ingat: layar lebar muat lebih banyak kotak.', 'Bandingkan lebar HP, tablet, dan laptop.'), undefined],
        tags: ['responsif'],
      }),
      qStep(
        makeMcq({
          id: 'a05-l01-q4',
          type: 'limit',
          analogy: t('Halaman web seperti air dalam wadah', 'Responsif seperti air'),
          prompt: t(
            'Air menyesuaikan diri sendiri. Apa yang berbeda pada halaman web?',
            'Apa batas dari perumpamaan air untuk desain responsif?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'css',
              label: t('Kita menulis aturan agar halaman lentur', 'Penulis memasang aturan CSS agar halaman lentur'),
            },
            {
              id: 'same',
              label: t('Halaman bisa dibuka di HP maupun laptop', 'Halaman yang sama bisa dibuka di HP maupun laptop'),
              explainWrong: t(
                'Itu persamaannya, bukan perbedaan. Air dan halaman sama-sama cocok untuk banyak wadah.',
                'Itu persamaannya, bukan perbedaan. Air dan halaman sama-sama cocok untuk banyak wadah.',
              ),
            },
            {
              id: 'shape',
              label: t('Susunan kartu berubah sesuai lebar layar', 'Susunan kartu berubah mengikuti lebar wadahnya'),
              explainWrong: t(
                'Itu juga persamaannya. Air dan halaman sama-sama mengikuti bentuk wadah.',
                'Itu juga persamaannya. Air dan halaman sama-sama mengikuti bentuk wadah.',
              ),
            },
          ],
          answer: 'css',
          explainCorrect: t(
            'Air bergerak sendiri. Halaman baru lentur kalau kita menulis aturannya.',
            'Tanpa aturan CSS seperti max-width dan Grid, halaman tetap kaku. Air tidak memerlukan aturan.',
          ),
          hints: [t('Siapa yang membuat halaman menjadi lentur?', 'Air mengalir sendiri. Apa yang harus ditambah di halaman?')],
          tags: ['responsif', 'css'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a05-l01-q5',
          type: 'scenario',
          story: t(
            'Kotak toko kue Rani dibuat sangat lebar. Di HP, tulisannya terpotong.',
            'Di toko kue Rani, kotak utama memakai width: 1200px. Di HP, tulisannya terpotong ke kanan.',
          ),
          prompt: t(
            'Apa yang sebaiknya Rani lakukan pada kotak itu?',
            'Apa perbaikan terbaik agar halamannya responsif?',
          ),
          difficulty: 2,
          choices: [
            { id: 'mw', label: t('Buat kotaknya bisa mengecil', 'Pakai max-width dan satuan lentur') },
            {
              id: 'del',
              label: t('Minta pengunjung memakai laptop', 'Minta pengunjung membuka halaman di laptop'),
              explainWrong: t(
                'Banyak orang membuka web dari HP. Halaman harus pas untuk mereka.',
                'Banyak orang membuka web dari HP. Halaman perlu pas untuk mereka.',
              ),
            },
            {
              id: 'font',
              label: t('Kecilkan semua tulisan', 'Kecilkan huruf menjadi 6px agar muat'),
              explainWrong: t(
                'Tulisan yang kecil sulit dibaca. Kotaknya tetap terlalu lebar.',
                'Huruf 6px sulit dibaca di HP. Lebar kotaknya tetap melebihi layar.',
              ),
            },
          ],
          answer: 'mw',
          explainCorrect: t(
            'Kotak yang bisa mengecil muat di layar HP. Seperti air yang pas di gelas kecil.',
            'Lebar yang lentur membuat kotak menyusut di layar sempit. Lebar tetap 1200px justru melebihi layar HP.',
          ),
          hints: [t('Ingat air yang muat di gelas kecil.', 'Bandingkan lebar HP dengan 1200px.')],
          tags: ['responsif'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a05-l01-q6',
          modes: ['pro'],
          prompt: t('Apa beda fluid layout dan adaptive layout?'),
          difficulty: 2,
          choices: [
            { id: 'diff', label: t('Fluid melebar mulus; adaptive berpindah antar tata letak tetap') },
            {
              id: 'none',
              label: t('Fluid berpindah antar tata letak tetap; adaptive melebar mulus'),
              explainWrong: t('Itu terbalik. Fluid yang melar mulus, dan adaptive yang berpindah antar tata letak tetap.'),
            },
            {
              id: 'img',
              label: t('Fluid dipakai untuk gambar; adaptive dipakai untuk teks'),
              explainWrong: t('Keduanya mengatur seluruh halaman, bukan jenis isi tertentu. Bedanya ada pada cara layout berubah.'),
            },
          ],
          answer: 'diff',
          explainCorrect: t('Fluid melar terus mengikuti lebar layar. Adaptive berpindah antar beberapa tata letak tetap.'),
          hints: [t('Ingat: satu melar terus, satu memilih cetakan tetap.')],
          tags: ['responsif'],
        }),
      ),
      qStep({
        id: 'a05-l01-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi deklarasi CSS agar gambar tidak melebihi lebar wadahnya.'),
        difficulty: 2,
        template: 'img { ___: 100%; height: auto; }',
        bank: ['max-width', 'min-height', 'z-index'],
        answer: ['max-width'],
        explainCorrect: t('max-width: 100% membuat gambar tidak melebihi lebar elemen pembungkusnya.'),
        hints: [t('Cari properti yang membatasi lebar paling besar.'), undefined],
        tags: ['responsif', 'css'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a05-l01-r1',
        prompt: t('Apa tujuan desain responsif?', 'Apa tujuan utama desain responsif?'),
        choices: [
          { id: 'ok', label: t('Satu halaman pas di semua layar', 'Satu halaman tampil rapi di semua layar') },
          {
            id: 'no',
            label: t('Alamat web berbeda untuk tiap layar', 'Alamat web berbeda untuk tiap perangkat'),
            explainWrong: t(
              'Responsif memakai satu halaman saja. Halaman itu menyesuaikan diri.',
              'Responsif memakai satu halaman yang menyesuaikan diri.',
            ),
          },
          {
            id: 'cut',
            label: t('Isi dibuang di layar kecil', 'Sebagian isi dibuang di layar kecil'),
            explainWrong: t(
              'Isi tetap utuh. Hanya susunannya yang berubah.',
              'Isi tetap utuh. Yang berubah hanya tata letaknya.',
            ),
          },
        ],
        answer: 'ok',
        explainCorrect: t(
          'Satu halaman menyesuaikan diri dengan layar. Seperti satu air untuk banyak wadah.',
          'Satu halaman yang menyesuaikan diri menghemat kerja dan menjaga isi tetap sama di semua layar.',
        ),
        hints: [t('Ingat satu air untuk banyak wadah.')],
        tags: ['responsif'],
      }),
      makeTf({
        id: 'a05-l01-r2',
        prompt: t(
          'Kotak selebar layar laptop membuat halaman nyaman di HP.',
          'Memasang width: 1200px pada wadah utama membuat tampilan di HP sangat nyaman.',
        ),
        answer: false,
        explainCorrect: t(
          'Kotak selebar laptop melebihi layar HP. Isinya terpotong atau harus digeser.',
          'Lebar 1200px melebihi lebar layar HP. Halaman jadi meluber ke samping.',
        ),
        explainWrong: t(
          'Layar HP jauh lebih sempit daripada laptop. Kotak selebar laptop tidak muat.',
          'Lebar 1200px jauh melebihi layar HP. Itu membuat HP perlu gulir ke samping.',
        ),
        hints: [t('Bandingkan lebar HP dan laptop.')],
        tags: ['responsif'],
      }),
    ],
    recap: t(
      'Halaman responsif mengikuti ukuran layar, seperti air mengikuti wadah.',
      'Desain responsif memadukan tata letak fluid, gambar yang menyusut dengan max-width, dan kolom yang berpindah.',
    ),
    companion: {
      talkPrompts: ['Saat air pindah wadah, apa yang berubah?'],
      offlineActivity: 'Buka satu website yang sama di HP dan laptop, lalu hitung berapa kolom kartu yang muncul di masing-masing layar.',
    },
  }),

  makeLesson({
    id: 'a05-l02',
    worldId: 'a05',
    title: 'Jendela layar dan rambu jalan',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengenali viewport dan breakpoint.',
      'Kamu bisa memasang meta viewport agar halaman pas di layar HP.',
    ),
    estMinutes: 5,
    introducesTerms: ['viewport', 'breakpoint'],
    usesTerms: ['responsif', 'html'],
    warmupFrom: 'a05-l01',
    atWork:
      'Kamu akan menambahkan tag meta viewport di setiap halaman baru, supaya tampilan di HP tidak mengecil.',
    steps: [
      storyStep('a05/jendela-rambu.svg', [
        rText(
          'Dari jendela kereta, kamu hanya melihat sebagian kota. Jendela lebar memperlihatkan lebih banyak. Apa yang jadi jendela bagi halaman web?',
          'Halaman toko tampil sangat kecil saat dibuka di HP. Apa yang membuat tampilannya begitu?',
        ),
      ]),
      conceptStep({
        title: t('Jendela layar: viewport', 'Mengenal viewport dan tag meta'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'meta-viewport' },
        alt: t(
          'HP tanpa tanda khusus mengecil, HP dengan tanda tampil jelas.',
          'Perbandingan HP tanpa meta viewport yang mengecil dan HP dengan meta viewport yang terbaca jelas.',
        ),
        code: {
          lang: 'html',
          code: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        },
        body: [
          rTerm('viewport', 'Viewport', 'Viewport'),
          rText(
            ' adalah jendela layar, tempat halaman terlihat. Tanpa tanda lebar layar, HP mengira layarnya selebar laptop, lalu halaman mengecil. Dengan tanda itu, halaman pas di layar.',
            ' adalah area jendela browser tempat halaman terlihat. Tanpa meta viewport di kepala dokumen, HP mengecilkan halaman versi desktop menjadi mini. Dengan meta itu, HP memakai lebar layarnya sendiri.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a05-l02-q6',
          prompt: t(
            'Tanda lebar layar lupa dipasang. Apa yang terjadi di HP?',
            'Apa yang terjadi kalau halaman lupa memasang <meta name="viewport"> saat dibuka di HP?',
          ),
          difficulty: 1,
          choices: [
            {
              id: 'tiny',
              label: t('Halaman mengecil sampai sulit dibaca', 'HP menyusutkan halaman laptop jadi tulisan mikro'),
            },
            {
              id: 'blank',
              label: t('Halaman tidak tampil sama sekali', 'Halaman tidak tampil sama sekali'),
              explainWrong: t(
                'Halaman tetap tampil. Hanya ukurannya yang jadi sangat kecil.',
                'Halaman tetap tampil, hanya skalanya yang mengecil seperti layar desktop.',
              ),
            },
            {
              id: 'color',
              label: t('Halaman terpotong di sisi kanan', 'Halaman terpotong di sisi kanan layar yang sempit'),
              explainWrong: t(
                'Halaman justru mengecil agar semuanya muat. Tulisannya jadi sangat kecil.',
                'Tanpa meta viewport, halaman mengecil agar muat, bukan terpotong.',
              ),
            },
          ],
          answer: 'tiny',
          explainCorrect: t(
            'HP mengira layarnya selebar laptop, lalu mengecilkan halaman. Tulisannya pun jadi sangat kecil.',
            'Tanpa meta viewport, HP berpura-pura punya layar lebar lalu menyusutkannya.',
          ),
          hints: [t('Lihat lagi gambar HP tanpa tanda itu.', 'Lihat lagi apa yang diatur tag meta viewport.')],
          tags: ['viewport', 'html'],
        }),
      ),
      conceptStep({
        title: t('Rambu batas kota', 'Breakpoint umum layar'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'tangga-breakpoint' },
        alt: t(
          'Tangga lebar layar: HP, tablet, laptop, lalu monitor besar.',
          'Tangga ukuran breakpoint: 640px HP besar, 768px tablet, 1024px laptop, 1280px desktop.',
        ),
        body: [
          rTerm('breakpoint', 'Breakpoint', 'Breakpoint'),
          rText(
            ' adalah titik pindah susunan halaman. Lewat titik itu, 1 kolom menjadi 2 kolom. Seperti rambu batas kota: lewat rambu, aturan jalan berubah.',
            ' adalah titik lebar layar tempat susunan berpindah. Nilai yang umum dipakai: 640px, 768px, 1024px, dan 1280px. Angka itu kebiasaan, bukan aturan.',
          ),
        ],
      }),
      simStep(
        'penggeser-layar',
        t(
          'Geser lebar layar dan lihat kapan kartu berpindah kolom.',
          'Geser lebar layar melewati 620px dan 900px, lalu amati kapan kartu berpindah kolom.',
        ),
      ),
      qStep({
        id: 'a05-l02-q2',
        type: 'order',
        prompt: t(
          'Urutkan layar dari yang paling sempit ke paling lebar.',
          'Urutkan breakpoint dari layar paling sempit ke paling lebar.',
        ),
        difficulty: 1,
        items: [
          { id: 'b1024', label: t('Laptop', '1024px (Laptop)') },
          { id: 'b640', label: t('HP', '640px (HP besar)') },
          { id: 'b1280', label: t('Monitor besar', '1280px+ (Desktop besar)') },
          { id: 'b768', label: t('Tablet', '768px (Tablet)') },
        ],
        answer: ['b640', 'b768', 'b1024', 'b1280'],
        explainCorrect: t(
          'HP paling sempit, lalu tablet, laptop, dan monitor besar. Makin besar bendanya, makin lebar layarnya.',
          'Urutan naiknya 640px, 768px, 1024px, lalu 1280px atau lebih. Angka lebih kecil berarti layar lebih sempit.',
        ),
        hints: [t('Mulai dari layar yang paling kecil.', 'Mulai dari ukuran HP, lalu naik.'), undefined],
        tags: ['breakpoint'],
      }),
      conceptStep({
        title: t('Touch target dan orientation'),
        modes: ['pro'],
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'touch-target-orientasi' },
        alt: t('Tombol 44–48px nyaman disentuh jari pada layar portrait maupun landscape.'),
        body: [
          rBold('Touch target'),
          rText(' adalah area yang bisa diketuk jari. Ukuran yang disarankan 44–48px agar jari tidak salah ketuk. Batas minimum di pedoman aksesibilitas WCAG adalah 24px. Layar bisa tegak (portrait) atau mendatar (landscape).'),
        ],
      }),
      limitStep({
        analogy: t('Jendela kereta dan rambu batas kota'),
        same: [
          t('Jendela membatasi area yang terlihat, seperti viewport. Rambu batas kota menandai titik perubahan aturan, seperti breakpoint.'),
        ],
        different: [
          t('Angka breakpoint seperti 768px bukan aturan kaku. Pilih angka lain kalau isi halaman mulai sesak.'),
          t('Kamu bisa memutar HP kapan saja, jadi lebar viewport berubah seketika.'),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeTf({
          id: 'a05-l02-q3',
          prompt: t(
            'Semua halaman harus memakai breakpoint di lebar layar yang sama.',
            'Breakpoint 640px, 768px, dan 1024px adalah aturan mutlak yang tidak boleh diubah.',
          ),
          difficulty: 2,
          answer: false,
          explainCorrect: t(
            'Breakpoint boleh digeser. Pasang di tempat isi halaman mulai sesak.',
            'Angka itu hanya kebiasaan umum. Breakpoint boleh disesuaikan dengan isi halaman.',
          ),
          explainWrong: t(
            'Breakpoint tidak harus sama. Isi halaman yang menentukan tempatnya.',
            'Breakpoint sebaiknya mengikuti kebutuhan isi halamanmu sendiri. Angka umum hanya titik awal.',
          ),
          hints: [t('Lihat lagi kapan kartu berpindah kolom.', 'Ingat: isi halaman, bukan angka, yang menentukan titiknya.')],
          tags: ['breakpoint'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a05-l02-q8j',
          modes: ['junior'],
          type: 'scenario',
          story: t(
            'Kartu di halaman Rani terlihat sempit di tablet. Rani ingin tablet memakai 2 kolom.',
            'Kartu di halaman Rani terlihat sempit di tablet. Rani ingin kartunya berpindah ke 2 kolom di lebar itu.',
          ),
          prompt: t('Apa yang perlu Rani pasang?'),
          difficulty: 2,
          choices: [
            { id: 'bp', label: t('Breakpoint') },
            {
              id: 'vp',
              label: t('Viewport'),
              explainWrong: t('Viewport adalah jendela layar. Ia tidak mengatur jumlah kolom.'),
            },
            {
              id: 'img',
              label: t('Padding'),
              explainWrong: t('Padding adalah ruang kosong di dalam kotak. Ia tidak mengatur jumlah kolom.'),
            },
          ],
          answer: 'bp',
          explainCorrect: t(
            'Breakpoint adalah titik pindah susunan. Di titik itu, tablet mulai memakai 2 kolom.',
            'Breakpoint memberi tahu halaman kapan susunan berganti menjadi 2 kolom.',
          ),
          hints: [t('Ingat rambu batas kota.')],
          tags: ['breakpoint'],
        }),
      ),
      qStep({
        id: 'a05-l02-q1',
        type: 'hotspot',
        modes: ['pro'],
        prompt: t('Ketuk angka breakpoint yang umum menandai batas masuk tablet.'),
        image: 'a05-hotspot',
        difficulty: 1,
        regions: [
          { id: 'r360', shape: 'rect', coords: [10, 10, 90, 50], label: '360px' },
          { id: 'r768', shape: 'rect', coords: [110, 10, 190, 50], label: '768px' },
          { id: 'r1024', shape: 'rect', coords: [210, 10, 290, 50], label: '1024px' },
          { id: 'r1440', shape: 'rect', coords: [310, 10, 390, 50], label: '1440px' },
        ],
        answer: 'r768',
        explainCorrect: t('768px adalah kebiasaan umum untuk batas mulai tata letak tablet. 1024px umumnya dipakai untuk laptop.'),
        hints: [t('Cari ukuran di antara HP dan laptop.'), undefined],
        tags: ['breakpoint'],
      }),
      qStep(
        makeMcq({
          id: 'a05-l02-q4',
          modes: ['pro'],
          type: 'limit',
          analogy: t('Rambu batas kota untuk breakpoint'),
          prompt: t('Apa beda breakpoint CSS dan rambu batas kota di jalan raya?'),
          difficulty: 2,
          choices: [
            { id: 'flex', label: t('Angka breakpoint boleh digeser mengikuti isi') },
            {
              id: 'change',
              label: t('Melewati batasnya, aturan tata letak berubah'),
              explainWrong: t('Itu persamaannya, bukan perbedaan. Rambu dan breakpoint sama-sama menandai perubahan.'),
            },
            {
              id: 'num',
              label: t('Memakai ukuran jarak sebagai patokan'),
              explainWrong: t('Itu juga persamaan. Keduanya memakai ukuran sebagai patokan.'),
            },
          ],
          answer: 'flex',
          explainCorrect: t('Kalau kartu sudah sempit di 820px, pasang breakpoint di 820px. Rambu jalan tidak bisa dipindah sendiri.'),
          hints: [t('Cari hal yang bisa kamu atur sendiri di CSS.')],
          tags: ['breakpoint'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a05-l02-q5',
          modes: ['pro'],
          type: 'scenario',
          story: t('Tombol "Tambah" di aplikasi kantin Pak Udin selebar 20px. Jari Dimas sering salah ketuk tombol di sebelahnya.'),
          prompt: t('Berapa ukuran touch target yang disarankan untuk jari?'),
          difficulty: 2,
          choices: [
            { id: 'ok', label: t('Sekitar 44–48px') },
            {
              id: 'small',
              label: t('Sekitar 28–32px'),
              explainWrong: t('Itu sudah di atas batas minimum 24px, tetapi masih sempit untuk ujung jari.'),
            },
            {
              id: 'huge',
              label: t('Sekitar 16–20px'),
              explainWrong: t('Itu hanya selebar huruf besar. Jari akan sering meleset.'),
            },
          ],
          answer: 'ok',
          explainCorrect: t('44–48px memberi ruang cukup untuk ujung jari. Tombol 20px terlalu sempit.'),
          hints: [t('Bandingkan dengan lebar ujung jari.')],
          tags: ['responsif'],
        }),
      ),
      qStep({
        id: 'a05-l02-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi tag meta agar browser HP memakai lebar layar sebenarnya.'),
        difficulty: 2,
        template: '<meta name="___" content="width=device-width, initial-scale=1.0">',
        bank: ['viewport', 'breakpoint', 'orientation'],
        answer: ['viewport'],
        explainCorrect: t('name="viewport" dengan width=device-width membuat halaman memakai lebar layar HP.'),
        hints: [t('Nama tag ini sama dengan area layar yang terlihat.'), undefined],
        tags: ['viewport', 'html'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a05-l02-r1',
        prompt: t('Bagian layar yang terlihat disebut apa?', 'Apa nama area jendela browser tempat halaman terlihat?'),
        choices: [
          { id: 'vp', label: t('Viewport') },
          {
            id: 'bp',
            label: t('Breakpoint'),
            explainWrong: t(
              'Breakpoint adalah titik lebar tempat susunan berubah. Ia bukan jendela layar.',
              'Breakpoint adalah titik lebar tempat tata letak berubah. Ia bukan area yang terlihat.',
            ),
          },
          {
            id: 'pad',
            label: t('Padding'),
            explainWrong: t(
              'Padding adalah ruang kosong di dalam kotak. Ia bukan jendela layar.',
              'Padding adalah ruang kosong di dalam kotak. Ia bukan area yang terlihat.',
            ),
          },
        ],
        answer: 'vp',
        explainCorrect: t(
          'Viewport adalah jendela layar yang terlihat. Seperti jendela kereta.',
          'Viewport adalah area jendela browser yang terlihat. Lebarnya berubah saat HP diputar atau jendela diubah ukurannya.',
        ),
        hints: [t('Ingat jendela kereta tadi.')],
        tags: ['viewport'],
      }),
      makeMcq({
        id: 'a05-l02-r2',
        modes: ['pro'],
        prompt: t('Berapa ukuran touch target yang disarankan di HP?'),
        choices: [
          { id: 'ok', label: t('44–48px') },
          { id: 'no', label: t('14px'), explainWrong: t('14px terlalu kecil untuk disentuh ujung jari.') },
          { id: 'min', label: t('24px'), explainWrong: t('24px adalah batas minimum WCAG, belum nyaman untuk ujung jari.') },
        ],
        answer: 'ok',
        explainCorrect: t('Sekitar 44–48px memberi ruang cukup untuk ujung jari.'),
        tags: ['responsif'],
      }),
      makeMcq({
        id: 'a05-l02-r3',
        modes: ['junior'],
        prompt: t('Titik lebar layar tempat susunan berpindah disebut apa?'),
        choices: [
          { id: 'bp', label: t('Breakpoint') },
          {
            id: 'vp',
            label: t('Viewport'),
            explainWrong: t('Viewport adalah jendela layar. Ia bukan titik pindah.'),
          },
          {
            id: 'pad',
            label: t('Padding'),
            explainWrong: t('Padding adalah ruang kosong di dalam kotak. Ia bukan titik pindah.'),
          },
        ],
        answer: 'bp',
        explainCorrect: t(
          'Breakpoint adalah titik pindah susunan. Seperti rambu batas kota: lewat rambu, aturan berubah.',
          'Breakpoint adalah titik lebar layar tempat susunan berpindah.',
        ),
        hints: [t('Ingat rambu batas kota.')],
        tags: ['breakpoint'],
      }),
    ],
    recap: t(
      'Viewport adalah jendela layar, dan breakpoint adalah titik pindah susunan.',
      'Pasang meta viewport di HTML. Pilih breakpoint sesuai isi dan buat touch target sekitar 44–48px.',
    ),
    companion: {
      talkPrompts: ['Apa yang terjadi kalau jendela kereta makin sempit?'],
      offlineActivity: 'Putar HP dari posisi berdiri (portrait) ke menyamping (landscape) pada sebuah artikel dan amati perubahannya.',
    },
  }),

  makeLesson({
    id: 'a05-l03',
    worldId: 'a05',
    title: 'Media query mobile-first',
    modes: ['pro'],
    objective: t('Kamu bisa menulis aturan @media (min-width) yang berurutan.'),
    estMinutes: 6,
    introducesTerms: ['media-query', 'mobile-first'],
    usesTerms: ['responsif', 'viewport', 'breakpoint', 'css', 'grid-css'],
    warmupFrom: 'a05-l02',
    atWork:
      'Kamu akan menulis CSS untuk HP dulu, lalu menambah blok @media saat tim meminta tampilan tablet.',
    steps: [
      storyStep('a05/tenda-ransel.svg', [
        rText(
          'Tim meminta halaman toko yang nyaman di HP, tablet, dan laptop. Mulailah seperti berkemas: isi ransel kecil dengan barang inti dulu, lalu tambah barang lain saat ada ruang.',
        ),
      ]),
      conceptStep({
        title: t('Strategi mobile-first'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'strategi-mobile-first' },
        alt: t('Alur mobile-first: susunan 1 kolom dasar di HP lalu berkembang menjadi 2 dan 4 kolom.'),
        body: [
          rTerm('mobile-first', 'Mobile-first'),
          rText(
            ' adalah cara menulis CSS dasar untuk layar HP lebih dulu. Layar sempit memaksa kamu memilih isi terpenting. Menambah aturan untuk layar lebar lebih mudah daripada memangkas desain desktop.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a05-l03-q1',
          type: 'why',
          base: 'mobile-first',
          prompt: t('Mengapa mobile-first dianjurkan untuk membangun situs?'),
          choices: [
            { id: 'why', label: t('Layar sempit memaksa memilih isi terpenting dulu') },
            {
              id: 'fast',
              label: t('Situs dibuat khusus untuk HP, terpisah dari laptop'),
              explainWrong: t('Mobile-first tetap satu halaman untuk semua layar. Hanya urutan menulis CSS yang dimulai dari HP.'),
            },
            {
              id: 'html',
              label: t('Aturan @media tidak diperlukan lagi'),
              explainWrong: t('Media query tetap dipakai untuk menambah aturan di layar lebar.'),
            },
          ],
          answer: 'why',
          explainCorrect: t('Layar sempit memaksa prioritas isi sejak awal. Menambah kolom untuk layar lebar lebih mudah daripada memangkas.'),
          hints: [t('Pikirkan apa yang muat di layar paling sempit dulu.')],
          tags: ['mobile-first'],
        }),
      ),
      conceptStep({
        title: t('Menulis media query dengan min-width'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'sintaks-media-query' },
        alt: t('Kode CSS dengan aturan @media min-width 768px dan 1024px.'),
        code: {
          lang: 'css',
          code: `.daftar-kartu {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n}\n@media (min-width: 768px) {\n  .daftar-kartu { grid-template-columns: repeat(2, 1fr); }\n}\n@media (min-width: 1024px) {\n  .daftar-kartu { grid-template-columns: repeat(4, 1fr); }\n}`,
          highlight: [6, 9],
        },
        body: [
          rTerm('media-query', 'Media query'),
          rText(' adalah aturan yang baru aktif saat lebar layar memenuhi syarat. Ia ditulis dengan blok '),
          rCode('@media (min-width: ...)'),
          rText('. Blok itu aktif saat lebar '),
          rTerm('viewport', 'viewport'),
          rText(' mencapai angka '),
          rTerm('breakpoint', 'breakpoint'),
          rText(' yang kamu tulis.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a05-l03-q5',
          type: 'scenario',
          story: t('Sebuah halaman memakai 1fr sebagai dasar, 2 kolom di min-width: 768px, dan 4 kolom di min-width: 1024px.'),
          prompt: t('Berapa kolom tampil di tablet selebar 900px?'),
          difficulty: 2,
          choices: [
            { id: 'two', label: t('2 kolom') },
            {
              id: 'one',
              label: t('1 kolom'),
              explainWrong: t('900px sudah melewati 768px, jadi aturan 2 kolom aktif.'),
            },
            {
              id: 'four',
              label: t('4 kolom'),
              explainWrong: t('900px belum mencapai 1024px, jadi aturan 4 kolom belum aktif.'),
            },
          ],
          answer: 'two',
          explainCorrect: t('Lebar 900px memenuhi min-width: 768px, tetapi belum mencapai 1024px. Hasilnya 2 kolom.'),
          hints: [t('Cek angka mana yang sudah terlewati oleh 900px.')],
          tags: ['media-query', 'breakpoint'],
        }),
      ),
      simStep(
        'penggeser-layar',
        t('Geser lebar layar dan amati kapan aturan 2 kolom dan 3 kolom aktif.'),
      ),
      conceptStep({
        title: t('Cascade pada media query'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'urutan-min-width' },
        alt: t('Urutan aturan min-width dari kecil ke besar agar cascade CSS menimpa dengan benar.'),
        body: [
          rText('Pada layar 1200px, syarat '),
          rCode('min-width: 768px'),
          rText(' dan '),
          rCode('min-width: 1024px'),
          rText(' sama-sama terpenuhi. Aturan yang ditulis terakhir menang (cascade), jadi urutkan '),
          rCode('min-width'),
          rText(' dari kecil ke besar.'),
        ],
      }),
      limitStep({
        analogy: t('Berkemas dari ransel kecil untuk mobile-first'),
        same: [
          t('Mulai dari kebutuhan paling inti di ruang terbatas, lalu memperluas saat ruang tersedia.'),
        ],
        different: [
          t('Barang tambahan tidak mengubah barang inti. Blok @media bisa menimpa sebagian properti dasar lewat cascade, sisanya tetap berlaku.'),
        ],
        riskyAnalogy: false,
      }),
      qStep({
        id: 'a05-l03-q2',
        type: 'spotbug',
        prompt: t('Ketuk baris CSS yang membuat layar 1200px hanya menampilkan 2 kolom.'),
        difficulty: 3,
        lines: [
          '.daftar-kartu { display: grid; grid-template-columns: 1fr; }',
          '@media (min-width: 1024px) { .daftar-kartu { grid-template-columns: repeat(4, 1fr); } }',
          '@media (min-width: 768px) { .daftar-kartu { grid-template-columns: repeat(2, 1fr); } }',
        ],
        answer: [3],
        explainCorrect: t('Pada 1200px kedua min-width terpenuhi, jadi baris 3 menang karena ditulis terakhir. Hasilnya 2 kolom, bukan 4.'),
        hints: [t('Lihat urutan angka min-width dari atas ke bawah.'), undefined],
        tags: ['media-query', 'mobile-first'],
      }),
      qStep({
        id: 'a05-l03-q3',
        type: 'order',
        prompt: t('Urutkan penulisan CSS mobile-first dari paling atas ke paling bawah.'),
        difficulty: 2,
        items: [
          { id: 'tab', label: t('@media (min-width: 768px): 2 kolom tablet') },
          { id: 'lap', label: t('@media (min-width: 1024px): 4 kolom laptop') },
          { id: 'base', label: t('Gaya dasar .daftar-kartu: 1 kolom untuk HP') },
        ],
        answer: ['base', 'tab', 'lap'],
        explainCorrect: t('Gaya dasar HP ditulis paling atas, lalu min-width 768px, lalu min-width 1024px.'),
        hints: [t('Mulai dari aturan tanpa @media.'), undefined],
        tags: ['mobile-first', 'media-query'],
      }),
      qStep(
        makeMcq({
          id: 'a05-l03-q4',
          type: 'limit',
          analogy: t('Berkemas dari ransel kecil'),
          prompt: t('Apa batas analogi berkemas untuk gaya dasar HP dan media query?'),
          difficulty: 2,
          choices: [
            { id: 'casc', label: t('Blok @media bisa menimpa aturan dasar, bukan hanya menambah') },
            {
              id: 'core',
              label: t('Mulai dari kebutuhan terpenting lebih dulu di ruang sempit'),
              explainWrong: t('Itu persamaan dengan berkemas, bukan perbedaan. Berkemas dan mobile-first sama-sama mulai dari inti.'),
            },
            {
              id: 'space',
              label: t('Menambah isi saat ruang yang tersedia lebih luas'),
              explainWrong: t('Itu juga persamaannya. Keduanya menambah isi saat ruangnya cukup.'),
            },
          ],
          answer: 'casc',
          explainCorrect: t('Barang tambahan tidak mengubah barang inti di ransel. Blok @media bisa menimpa properti dasar, dan properti lain tetap berlaku.'),
          hints: [t('Pikirkan nasib aturan dasar saat layar melebar.')],
          tags: ['mobile-first', 'media-query'],
        }),
      ),
      qStep({
        id: 'a05-l03-q6',
        type: 'fill',
        prompt: t('Lengkapi syarat media query agar 4 kolom aktif mulai lebar 1024px.'),
        difficulty: 2,
        template: '@media (___: 1024px) { .daftar-kartu { grid-template-columns: repeat(4, 1fr); } }',
        bank: ['min-width', 'max-height', 'font-size'],
        answer: ['min-width'],
        explainCorrect: t('min-width membuat aturan aktif saat layar membesar ke ukuran itu atau lebih.'),
        hints: [t('Pilih syarat yang berarti "lebar minimal".'), undefined],
        tags: ['media-query', 'mobile-first'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a05-l03-r1',
        prompt: t('Syarat apa yang dipakai CSS mobile-first untuk layar lebih besar?'),
        choices: [
          { id: 'min', label: t('min-width') },
          { id: 'max', label: t('max-width'), explainWrong: t('max-width dipakai pada gaya desktop-first untuk menyusutkan tampilan.') },
        ],
        answer: 'min',
        explainCorrect: t('min-width berarti "mulai dari lebar minimal ini ke atas".'),
        tags: ['media-query', 'mobile-first'],
      }),
      makeTf({
        id: 'a05-l03-r2',
        prompt: t('Di CSS mobile-first, gaya dasar tanpa @media berlaku sebagai tampilan awal untuk HP.'),
        answer: true,
        explainCorrect: t('Gaya dasar berlaku di semua lebar layar. Di HP belum ada @media yang aktif, jadi gaya dasar itulah tampilannya.'),
        explainWrong: t('Gaya di luar @media berlaku di semua lebar layar. Di layar lebar, @media hanya menimpa sebagian propertinya.'),
        tags: ['mobile-first'],
      }),
    ],
    recap: t('Tulis gaya dasar untuk HP lebih dulu. Tambahkan penyesuaian layar lebar berurutan dengan @media (min-width).'),
  }),

  makeLesson({
    id: 'a05-l04',
    worldId: 'a05',
    title: 'Pola responsif (hamburger, kolom menumpuk)',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengenali menu hamburger, kolom menumpuk, dan kartu pengganti tabel.',
      'Kamu bisa memilih pola tata letak yang tepat untuk layar HP.',
    ),
    estMinutes: 5,
    introducesTerms: [],
    usesTerms: ['responsif', 'viewport', 'breakpoint', 'mobile-first', 'flexbox', 'grid-css'],
    warmupFrom: 'a05-l03',
    atWork:
      'Kamu akan mengubah tabel laporan menjadi kartu di HP, karena klien mengeluh harus menggeser layar ke samping.',
    steps: [
      storyStep('a05/meja-piknik.svg', [
        rText(
          'Meja piknik dilipat kecil di bagasi mobil. Di taman, meja itu dibentangkan lebar. Bagaimana halaman web melakukan hal serupa?',
          'Tabel laporan Toko Rani meluber di layar HP, seperti meja piknik yang terlalu lebar untuk bagasi. Pola apa yang membuatnya muat?',
        ),
      ]),
      conceptStep({
        title: t('Menu hamburger dan kolom menumpuk'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'hamburger-kolom' },
        alt: t(
          'Menu berjajar di laptop jadi ikon tiga garis di HP.',
          'Menu berjajar di laptop menjadi ikon hamburger di HP; kolom samping menumpuk ke bawah.',
        ),
        body: [
          rText(
            'Di HP, menu panjang disimpan di balik ikon tiga garis. Ikon itu disebut ',
            'Pada layar sempit, daftar tautan disembunyikan di balik ikon tiga garis, yang disebut ',
          ),
          rBold('hamburger', 'menu hamburger'),
          rText(
            '. Dua kotak yang berjajar di laptop bertumpuk ke bawah di HP.',
            '. Kolom yang berdampingan ditumpuk ke bawah.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a05-l04-q2',
          type: 'analogy',
          prompt: t(
            'Dua kotak berjajar di laptop lalu bertumpuk di HP. Apa yang mirip dengan itu?',
            'Dua kotak berjajar di laptop lalu menumpuk di HP. Hal apa yang paling mirip?',
          ),
          difficulty: 1,
          choices: [
            {
              id: 'meja',
              label: t('Meja piknik yang dilipat di bagasi', 'Meja piknik dilipat agar muat di bagasi'),
            },
            {
              id: 'batu',
              label: t('Kue yang dipotong, lalu sebagian dibuang', 'Kue dipotong, lalu sebagian dibuang karena kurang tempat'),
              explainWrong: t(
                'Isi halaman tidak dibuang. Semua bagian tetap ada, hanya ditata ulang.',
                'Isi halaman tidak dibuang. Semua bagian tetap ada dengan susunan baru.',
              ),
            },
            {
              id: 'lamp',
              label: t('Balon yang dikempiskan sampai kecil', 'Balon dikempiskan sampai kecil agar muat'),
              explainWrong: t(
                'Balon kempis kehilangan udaranya. Isi halaman tetap utuh, hanya disusun ulang.',
                'Balon kempis kehilangan udaranya. Isi halaman tetap utuh dan hanya disusun ulang.',
              ),
            },
          ],
          answer: 'meja',
          explainCorrect: t(
            'Meja yang dilipat tetap utuh. Kotak di HP juga hanya disusun ulang.',
            'Semua bagian tetap berguna dan hanya disusun ulang mengikuti ruang. Seperti meja yang dilipat tanpa membuang kakinya.',
          ),
          hints: [t('Ingat meja piknik di bagasi.', 'Ingat bahwa semua bagian tetap ada dan hanya pindah tempat.')],
          tags: ['responsif'],
        }),
      ),
      conceptStep({
        title: t('Tabel lebar jadi kartu', 'Mengubah tabel lebar menjadi kartu'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'tabel-jadi-kartu' },
        alt: t(
          'Tabel banyak kolom di laptop jadi kartu per baris di HP.',
          'Tabel banyak kolom di laptop berubah menjadi kartu vertikal per baris di HP.',
        ),
        body: [
          rText(
            'Tabel dengan banyak kolom sulit dibaca di HP. Ubah setiap baris tabel menjadi satu kartu. Halaman yang rapi tidak perlu digeser ke samping.',
            'Tabel berkolom banyak sulit dibaca di layar sempit. Ubah setiap baris data menjadi satu kartu yang bertumpuk. Dengan begitu, pembaca tidak perlu gulir horizontal.',
          ),
        ],
      }),
      simStep(
        'penggeser-layar',
        t(
          'Persempit layar dan lihat kartu bertumpuk menjadi 1 kolom.',
          'Persempit lebar layar dan amati 3 kolom sejajar berubah menjadi 1 kolom bertumpuk.',
        ),
      ),
      qStep({
        id: 'a05-l04-q1',
        type: 'match',
        prompt: t(
          'Pasangkan masalah di HP dengan jalan keluarnya.',
          'Pasangkan masalah layar HP dengan pola responsif yang paling pas.',
        ),
        difficulty: 1,
        left: [
          { id: 'menu', label: t('Menu terlalu panjang', 'Daftar tautan navigasi terlalu panjang') },
          { id: 'cols', label: t('Dua kolom jadi gepeng', 'Dua kolom berita berjajar jadi gepeng') },
          { id: 'tbl', label: t('Tabel punya 6 kolom lebar', 'Tabel jadwal punya 6 kolom lebar') },
        ],
        right: [
          { id: 'ham', label: t('Simpan di balik ikon', 'Menu hamburger (ikon tiga garis)') },
          { id: 'stack', label: t('Susun atas-bawah', 'Kolom menumpuk ke bawah') },
          { id: 'card', label: t('Ubah menjadi kartu', 'Kartu per baris data') },
        ],
        answer: { menu: 'ham', cols: 'stack', tbl: 'card' },
        explainCorrect: t(
          'Setiap masalah punya jalan keluar sendiri. Menu masuk ke ikon, kolom bertumpuk, tabel jadi kartu.',
          'Setiap masalah layar sempit punya pola andalan: menu jadi hamburger, kolom menumpuk, tabel jadi kartu.',
        ),
        hints: [t('Ingat meja piknik: dilipat, isinya tetap.', 'Cocokkan masalah dengan pola yang baru kamu baca.'), undefined],
        tags: ['responsif'],
      }),
      conceptStep({
        title: t('Pantangan tata letak responsif'),
        modes: ['pro'],
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a05', topic: 'pantangan-responsif' },
        alt: t('Daftar periksa responsif: hindari width 1200px, cegah geser samping, teks minimal 16px.'),
        body: [
          rText('Hindari lebar tetap seperti '),
          rCode('width: 1200px'),
          rText(' dan pakai '),
          rCode('max-width'),
          rText('. Cegah gulir ke samping di HP, dan jaga teks isi minimal 16px.'),
        ],
      }),
      limitStep({
        analogy: t('Meja piknik lipat'),
        same: [
          t('Bentuk menyesuaikan antara ruang sempit di HP dan ruang lapang di laptop.'),
        ],
        different: [
          t('Meja yang dilipat tidak bisa dipakai. Halaman di HP harus tetap bisa dipakai penuh, jadi tabel berubah menjadi kartu.'),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeTf({
          id: 'a05-l04-q3',
          prompt: t(
            'Di HP, halaman yang rapi harus digeser ke kanan dan kiri.',
            'Di HP, halaman yang baik seharusnya bisa digeser bebas ke kanan dan kiri.',
          ),
          difficulty: 2,
          answer: false,
          explainCorrect: t(
            'Halaman rapi muat di layar HP. Kalau harus digeser ke samping, ada kotak yang terlalu lebar.',
            'Halaman yang baik tidak meluber, jadi tidak perlu digeser ke samping.',
          ),
          explainWrong: t(
            'Geser ke samping menandakan ada kotak yang terlalu lebar. Halaman rapi muat di layar.',
            'Geser ke kanan dan kiri di HP menandakan ada elemen yang terlalu lebar.',
          ),
          hints: [t('Ingat tabel yang jadi kartu agar tidak digeser.', 'Ingat tanda halaman yang meluber di HP.')],
          tags: ['responsif'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a05-l04-q4',
          modes: ['pro'],
          type: 'limit',
          analogy: t('Meja piknik lipat'),
          prompt: t('Mana yang TIDAK sama antara melipat meja piknik dan mengubah tampilan web ke HP?'),
          difficulty: 2,
          choices: [
            { id: 'stay', label: t('Tetap bisa dipakai penuh saat bentuknya dikecilkan') },
            {
              id: 'space',
              label: t('Bentuk berubah supaya muat di tempat yang lebih sempit'),
              explainWrong: t('Itu kesamaannya, bukan perbedaan. Meja dan halaman sama-sama berubah bentuk.'),
            },
            {
              id: 'open',
              label: t('Bisa melebar kembali saat tempatnya lebih luas'),
              explainWrong: t('Itu juga kesamaan. Keduanya bisa kembali lebar di tempat luas.'),
            },
          ],
          answer: 'stay',
          explainCorrect: t('Meja yang dilipat tidak bisa dipakai. Halaman di HP harus tetap berfungsi penuh, jadi tabel diubah menjadi kartu.'),
          hints: [t('Bisakah kamu makan di meja yang sedang dilipat?')],
          tags: ['responsif'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a05-l04-q5',
          type: 'scenario',
          story: t(
            'Sari membuat daftar nilai dengan 6 kolom. Di HP, daftarnya harus digeser jauh ke kanan.',
            'Sari membuat daftar nilai 6 kolom. Di laptop bagus, tetapi di HP harus digeser jauh ke kanan dan angkanya kecil sekali.',
          ),
          prompt: t('Pola apa yang sebaiknya Sari pakai?', 'Pola responsif mana yang sebaiknya Sari pakai?'),
          difficulty: 2,
          choices: [
            { id: 'card', label: t('Ubah tabel menjadi kartu per siswa') },
            {
              id: 'fixed',
              label: t('Buat tabelnya lebih lebar lagi', 'Pasang width: 1200px pada tabel agar bentuknya tetap'),
              explainWrong: t(
                'Kotak yang makin lebar membuat HP makin banyak digeser. Tabel perlu jadi kartu.',
                'Lebar tetap 1200px justru memperparah gulir ke samping di HP.',
              ),
            },
            {
              id: 'cut',
              label: t('Sembunyikan semua angka nilai di HP', 'Sembunyikan semua angka nilai saat dibuka di HP'),
              explainWrong: t(
                'Angka nilai itu penting. Isinya tetap harus terbaca di HP.',
                'Data penting tidak boleh hilang di HP. Tata ulang tampilannya, jangan hapus isinya.',
              ),
            },
          ],
          answer: 'card',
          explainCorrect: t(
            'Setiap siswa menjadi satu kartu. Seperti meja piknik yang dilipat, isinya tetap ada.',
            'Tabel berubah menjadi kartu vertikal, jadi data terbaca rapi tanpa gulir ke samping.',
          ),
          hints: [t('Ingat tabel yang berubah jadi kartu.', 'Cari pola yang menjaga semua data tetap terbaca.')],
          tags: ['responsif'],
        }),
      ),
      qStep({
        id: 'a05-l04-q6',
        type: 'spotbug',
        modes: ['pro'],
        prompt: t('Ketuk baris CSS yang membuat halaman meluber ke samping di HP.'),
        difficulty: 2,
        lines: [
          '.wadah-utama {',
          '  width: 1200px;',
          '  margin: 0 auto;',
          '  font-size: 16px;',
          '}',
        ],
        answer: [2],
        explainCorrect: t('Baris 2 memakai width: 1200px yang kaku. Ganti dengan max-width: 1200px dan width: 100%.'),
        hints: [t('Cari lebar yang tidak bisa menyusut.'), undefined],
        tags: ['responsif'],
      }),
      qStep({
        id: 'a05-l04-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Apa nama populer untuk ikon tiga garis yang menyembunyikan menu di HP?'),
        difficulty: 1,
        accept: ['hamburger', 'menu hamburger', 'hamburger menu'],
        explainCorrect: t('Ikon tiga garis bertumpuk itu disebut menu hamburger.'),
        tags: ['responsif'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a05-l04-r1',
        modes: ['pro'],
        prompt: t('Apa yang sebaiknya dipakai untuk membatasi lebar wadah utama di HP?'),
        choices: [
          { id: 'mw', label: t('max-width') },
          { id: 'fw', label: t('width tetap 1200px'), explainWrong: t('width tetap 1200px membuat HP butuh gulir ke samping.') },
          { id: 'mn', label: t('min-width: 1200px'), explainWrong: t('min-width: 1200px memaksa wadah selebar itu, jadi tetap meluber di HP.') },
        ],
        answer: 'mw',
        explainCorrect: t('max-width menjaga batas di desktop, tetapi wadah tetap bisa menyusut di HP.'),
        tags: ['responsif'],
      }),
      makeMcq({
        id: 'a05-l04-r2',
        modes: ['pro'],
        prompt: t('Berapa ukuran minimal teks isi paragraf di HP?'),
        choices: [
          { id: '16', label: t('16px') },
          { id: '10', label: t('10px'), explainWrong: t('10px terlalu kecil untuk paragraf di layar HP.') },
          { id: '12', label: t('12px'), explainWrong: t('12px masih terlalu kecil untuk paragraf panjang.') },
        ],
        answer: '16',
        explainCorrect: t('16px menjadi ukuran aman agar paragraf mudah dibaca di layar HP.'),
        tags: ['responsif'],
      }),
      makeMcq({
        id: 'a05-l04-r3',
        modes: ['junior'],
        prompt: t('Ikon tiga garis di HP menyimpan apa?'),
        choices: [
          { id: 'ham', label: t('Daftar menu') },
          { id: 'cari', label: t('Tombol cari'), explainWrong: t('Tombol cari bergambar kaca pembesar. Tiga garis menyimpan menu.') },
          { id: 'pesan', label: t('Pesan baru'), explainWrong: t('Pesan baru punya ikon amplop. Tiga garis menyimpan menu.') },
        ],
        answer: 'ham',
        explainCorrect: t('Ikon hamburger menyimpan daftar menu. Layar HP jadi lega.'),
        hints: [t('Ingat apa yang muncul saat ikon itu diketuk.')],
        tags: ['responsif'],
      }),
      makeMcq({
        id: 'a05-l04-r4',
        modes: ['junior'],
        prompt: t('Tabel lebar di HP sebaiknya jadi apa?'),
        choices: [
          { id: 'card', label: t('Kartu per baris') },
          { id: 'tiny', label: t('Tulisan yang sangat kecil'), explainWrong: t('Tulisan kecil sulit dibaca. Kartu membuat isinya tetap besar.') },
          { id: 'del', label: t('Kolom yang dihapus'), explainWrong: t('Isi tabel penting. Isinya harus tetap ada di HP.') },
        ],
        answer: 'card',
        explainCorrect: t('Setiap baris menjadi satu kartu. Isinya utuh dan tidak perlu digeser.'),
        hints: [t('Ingat tabel yang jadi kartu.')],
        tags: ['responsif'],
      }),
    ],
    recap: t(
      'Menu hamburger, kolom menumpuk, dan kartu membuat halaman rapi di HP.',
      'Pakai menu hamburger, kolom menumpuk, dan kartu pengganti tabel, lalu batasi lebar dengan max-width.',
    ),
    companion: {
      talkPrompts: ['Mengapa menu di HP disimpan di balik tiga garis?'],
      offlineActivity: 'Gambar 2 kotak sejajar di kertas lebar (laptop), lalu gunting dan tempel menumpuk atas-bawah di kertas kecil (HP).',
    },
  }),
];
