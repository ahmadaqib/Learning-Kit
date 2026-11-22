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
  id: 'a03',
  track: 'A',
  order: 3,
  title: 'Bengkel CSS',
  tagline: t(
    'Mewarnai halaman, mengatur jarak kotak, dan merapikan rak.',
    'Menguasai selector, Box Model, satuan CSS, Flexbox, Grid, position, z-index, dan cascade.',
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
      'Buktikan pemahamanmu tentang selector, box model, Flexbox, Grid, dan cascade CSS.',
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
        prompt: t('Pada aturan CSS .tombol { color: white; }, bagian .tombol disebut…'),
        choices: [
          { id: 'sel', label: t('Selector (penunjuk siapa yang dihias)') },
          { id: 'val', label: t('Nilai warna'), explainWrong: t('white adalah nilainya.') },
          { id: 'tag', label: t('Tag pembuka HTML'), explainWrong: t('.tombol adalah selector class di CSS.') },
        ],
        answer: 'sel',
        explainCorrect: t('Selector memilih elemen mana yang menerima gaya CSS.'),
        tags: ['selector'],
      }),
      makeAnchorMcq({
        id: 'a03-anc-j2',
        prompt: t('Di box model, jarak ruang kosong di DALAM bingkai sekitar isi disebut…'),
        choices: [
          { id: 'pad', label: t('Padding') },
          { id: 'mar', label: t('Margin'), explainWrong: t('Margin adalah jarak di luar bingkai.') },
          { id: 'bor', label: t('Border'), explainWrong: t('Border adalah garis bingkainya.') },
        ],
        answer: 'pad',
        explainCorrect: t('Padding memberi ruang napas di dalam bingkai kotak.'),
        tags: ['padding'],
      }),
      makeAnchorMcq({
        id: 'a03-anc-j3',
        prompt: t('Jika ingin kotak-kotak kartu berjajar rapi satu baris seperti buku di rak, pakai…'),
        choices: [
          { id: 'flex', label: t('Flexbox') },
          { id: 'alt', label: t('Atribut alt'), explainWrong: t('alt adalah teks deskripsi gambar di HTML.') },
          { id: 'head', label: t('Tag <head>'), explainWrong: t('<head> menyimpan info dokumen.') },
        ],
        answer: 'flex',
        explainCorrect: t('Flexbox cocok menata item satu arah dalam baris atau kolom.'),
        tags: ['flexbox'],
      }),
      makeAnchorMcq({
        id: 'a03-anc-j4',
        prompt: t('Kapan CSS Grid lebih pas dipakai daripada Flexbox?'),
        choices: [
          { id: 'grid', label: t('Saat menata baris dan kolom sekaligus seperti sekat kotak bekal') },
          { id: 'text', label: t('Saat menulis paragraf cerita'), explainWrong: t('Paragraf cukup memakai tag <p>.') },
          { id: 'btn', label: t('Saat memutar suara'), explainWrong: t('CSS Grid mengatur tata letak baris dan kolom.') },
        ],
        answer: 'grid',
        explainCorrect: t('Grid mengatur dua arah: baris dan kolom bersamaan.'),
        tags: ['grid-css'],
      }),
      makeAnchorMcq({
        id: 'a03-anc-j5',
        prompt: t('Urutan lapisan Box Model dari paling dalam ke paling luar adalah…'),
        choices: [
          { id: 'ord', label: t('Content → Padding → Border → Margin') },
          { id: 'rev', label: t('Margin → Border → Padding → Content'), explainWrong: t('Itu urutan dari luar ke dalam.') },
          { id: 'mix', label: t('Border → Content → Margin → Padding'), explainWrong: t('Content selalu paling dalam, margin paling luar.') },
        ],
        answer: 'ord',
        explainCorrect: t('Isi di tengah, dilapisi padding, dibungkus border, dipisah margin.'),
        tags: ['box-model'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a03-anc-p1',
        prompt: t('Mengapa dalam proyek nyata class selector (.kartu) dipakai jauh lebih sering daripada id (#kartu)?'),
        choices: [
          { id: 'reuse', label: t('Class dapat dipakai ulang di banyak elemen dan mudah digabung') },
          { id: 'fast', label: t('ID dilarang oleh browser modern') },
          { id: 'color', label: t('ID tidak bisa mengubah warna latar') },
        ],
        answer: 'reuse',
        explainCorrect: t('Satu class bisa menghias puluhan kartu sekaligus dengan spesifisitas terjaga.'),
        tags: ['class-css'],
      }),
      makeAnchorMcq({
        id: 'a03-anc-p2',
        prompt: t('Apa efek langsung dari * { box-sizing: border-box; } pada ukuran kotak?'),
        choices: [
          { id: 'bb', label: t('Width dan height sudah mencakup content, padding, dan border') },
          { id: 'del', label: t('Menghapus seluruh margin di halaman') },
          { id: 'hide', label: t('Menyembunyikan garis tepi elemen') },
        ],
        answer: 'bb',
        explainCorrect: t('border-box mencegah kotak melebar tak terduga saat ditambah padding dan border.'),
        tags: ['box-model'],
      }),
      makeAnchorMcq({
        id: 'a03-anc-p3',
        prompt: t('Satuan ukuran CSS mana yang mengikuti ukuran huruf dasar dokumen (16px di root) dan ramah aksesibilitas zoom?'),
        choices: [
          { id: 'rem', label: t('rem') },
          { id: 'px', label: t('px') },
          { id: 'vh', label: t('vh') },
        ],
        answer: 'rem',
        explainCorrect: t('rem mengacu pada ukuran huruf akar sehingga ikut membesar saat pengguna mengatur teks.'),
        tags: ['rem-unit'],
      }),
      makeAnchorMcq({
        id: 'a03-anc-p4',
        prompt: t('Properti Flexbox untuk menyebar anak elemen dengan jarak merata hingga menyentuh tepi kiri dan kanan adalah…'),
        choices: [
          { id: 'sb', label: t('justify-content: space-between') },
          { id: 'fs', label: t('justify-content: flex-start') },
          { id: 'col', label: t('flex-direction: column') },
        ],
        answer: 'sb',
        explainCorrect: t('space-between menempatkan item pertama di awal, terakhir di ujung, dan membagi sisa jarak rata.'),
        tags: ['flexbox'],
      }),
      makeAnchorMcq({
        id: 'a03-anc-p5',
        prompt: t('Jika tiga aturan CSS bertabrakan menata satu elemen: #judul, .judul, dan h1, mana yang menang?'),
        choices: [
          { id: 'id', label: t('#judul (karena ID lebih spesifik dari class dan tag)') },
          { id: 'tag', label: t('h1') },
          { id: 'cls', label: t('.judul') },
        ],
        answer: 'id',
        explainCorrect: t('Aturan specificity CSS adalah ID > class > tag.'),
        tags: ['z-index', 'selector'],
      }),
      makeAnchorMcq({
        id: 'a03-anc-p6',
        type: 'limit',
        analogy: t('Box model seperti lukisan berbingkai di dinding'),
        prompt: t('Sifat CSS margin mana yang TIDAK terjadi pada lukisan berbingkai sungguhan?'),
        choices: [
          { id: 'col', label: t('Margin vertikal dua kotak berurutan dapat menyatu (margin collapsing)') },
          { id: 'pad', label: t('Ada ruang kosong antara lukisan dan bingkainya') },
          { id: 'out', label: t('Ada jarak pemisah ke benda di sebelahnya') },
        ],
        answer: 'col',
        explainCorrect: t('Margin atas-bawah antar blok dapat saling tumpang tindih (collapsing), tidak seperti jarak fisik dinding.'),
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
      'Aku bisa membaca aturan CSS: siapa yang dihias, apa yang diubah, dan jadi apa.',
      'Aku bisa menulis aturan CSS dengan tag, class, dan id selector.',
    ),
    estMinutes: 5,
    introducesTerms: ['selector', 'class-css'],
    usesTerms: ['css', 'tag', 'elemen'],
    stickerId: 'kuas-cat',
    warmupFrom: 'a02-l05',
    steps: [
      storyStep('a03/kuas-cat.svg', [
        rText(
          'Mengecat halaman dengan CSS itu seperti memberi perintah ke tukang cat: "Semua kartu, cat dindingnya biru!"',
          'Setiap aturan CSS bekerja seperti kalimat perintah: menunjuk sasaran (selector), lalu menyebut properti dan nilainya.',
        ),
      ]),
      conceptStep({
        title: t('Anatomi Aturan CSS', 'Selector, Properti, Nilai'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'aturan-css' },
        alt: t('Anatomi aturan .tombol { background: orange; }.'),
        code: {
          lang: 'css',
          code: '.tombol {\n  background: orange;\n}',
          highlight: [1, 2],
        },
        body: [
          rTerm('selector', 'Selector', 'Selector'),
          rText(' menunjuk siapa yang dihias, lalu di dalam kurung kurawal ada properti dan nilainya.'),
        ],
      }),
      conceptStep({
        title: t('Tag, Class, dan ID', 'Tiga Selector Dasar'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'class-id-css' },
        alt: t('Perbandingan tag p, .class dengan titik, dan #id dengan pagar.'),
        body: [
          rTerm('class-css', 'Class (.kartu)', 'Class (.kartu)'),
          rText(' diawali titik untuk kelompok elemen, sedangkan ID (#header) memakai pagar untuk satu elemen unik.'),
        ],
      }),
      limitStep({
        analogy: t('Memberi perintah cat untuk kelompok siswa'),
        same: [
          t('Class ibarat seragam klub basket: banyak siswa bisa memakai class yang sama.'),
        ],
        different: [
          t('Satu elemen HTML boleh memiliki beberapa class sekaligus, seperti baju yang punya beberapa lencana.'),
        ],
      }),
      simStep(
        'kupas-box-model',
        t(
          'Amati perubahan kotak di Bengkel CSS saat nilainya digeser!',
          'Eksperimen dengan properti dan nilai CSS pada simulator.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a03-l01-q1',
          prompt: t('Pada aturan .kartu { color: navy; }, bagian manakah yang menjadi selector?'),
          choices: [
            { id: 'sel', label: t('.kartu') },
            { id: 'prop', label: t('color'), explainWrong: t('color adalah propertinya.') },
            { id: 'val', label: t('navy'), explainWrong: t('navy adalah nilai warnanya.') },
          ],
          answer: 'sel',
          explainCorrect: t('Benar! .kartu memilih semua elemen dengan class="kartu".'),
          tags: ['selector'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-l01-q2',
          prompt: t('Simbol apa yang mengawali nama class selector di file CSS?'),
          choices: [
            { id: 'dot', label: t('Tanda titik (.)') },
            { id: 'hash', label: t('Tanda pagar (#)'), explainWrong: t('Tanda pagar (#) dipakai untuk ID.') },
            { id: 'star', label: t('Tanda tanya (?)'), explainWrong: t('Tanda tanya dipakai pada query URL.') },
          ],
          answer: 'dot',
          explainCorrect: t('Tepat! Contohnya .tombol atau .kartu-produk.'),
          tags: ['class-css'],
        }),
      ),
      qStep({
        id: 'a03-l01-q3',
        type: 'match',
        difficulty: 1,
        prompt: t('Pasangkan jenis selector CSS dengan perumpamaannya:'),
        left: [
          { id: 'l1', label: t('p { } (Tag)') },
          { id: 'l2', label: t('.kartu { } (Class)') },
          { id: 'l3', label: t('#header { } (ID)') },
        ],
        right: [
          { id: 'r1', label: t('Semua siswa di sekolah') },
          { id: 'r2', label: t('Semua anggota klub basket') },
          { id: 'r3', label: t('Satu siswa bernomor induk unik') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3' },
        explainCorrect: t('Keren! Tag = semua elemen sejenis, class = kelompok, ID = unik satu saja.'),
        tags: ['selector', 'class-css'],
      }),
      qStep(
        makeMcq({
          id: 'a03-l01-q4',
          type: 'limit',
          analogy: t('Class sebagai seragam kelompok'),
          prompt: t('Mana pernyataan yang TIDAK membatasi pemakaian class pada elemen HTML?'),
          choices: [
            { id: 'multi', label: t('Satu elemen HTML boleh memakai lebih dari satu class sekaligus') },
            { id: 'one', label: t('Setiap halaman hanya boleh punya satu class'), explainWrong: t('Justru class boleh dipakai berulang kali.') },
            { id: 'id', label: t('Class tidak boleh punya warna'), explainWrong: t('Class bebas mengatur warna.') },
          ],
          answer: 'multi',
          explainCorrect: t('Benar! Misalnya class="btn btn-primary" menggabungkan dua class pada satu tombol.'),
          tags: ['class-css'],
        }),
      ),
      qStep({
        id: 'a03-l01-q5',
        type: 'spotbug',
        difficulty: 2,
        prompt: t('Ketuk baris CSS yang lupa memberi titik dua atau tanda titik koma:'),
        lines: [
          '.judul {',
          '  color: blue',
          '  background: white;',
          '}',
        ],
        answer: [2],
        explainCorrect: t('Jeli sekali! Baris 2 kurang tanda titik koma (;) di ujung deklarasi.'),
        tags: ['selector'],
      }),
      qStep({
        id: 'a03-l01-q6',
        type: 'fill',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Lengkapi aturan CSS agar semua elemen berkelas "peringatan" berwarna oranye:'),
        template: '___ { color: orange; }',
        bank: ['.peringatan', '#peringatan', 'peringatan'],
        answer: ['.peringatan'],
        explainCorrect: t('Benar! Selector class selalu dimulai tanda titik.'),
        tags: ['class-css'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a03-l01-r1',
        prompt: t('Dalam praktik sehari-hari, selector mana yang dipakai sekitar 90% waktu?'),
        choices: [
          { id: 'c', label: t('Class (.nama)') },
          { id: 'i', label: t('ID (#nama)'), explainWrong: t('ID hanya untuk satu elemen unik dan terlalu kaku.') },
        ],
        answer: 'c',
        explainCorrect: t('Class mudah dipakai ulang di banyak elemen.'),
        tags: ['class-css'],
      }),
      makeTf({
        id: 'a03-l01-r2',
        prompt: t('Gabungan properti dan nilai di dalam CSS (seperti color: navy;) disebut deklarasi.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('Properti + nilai membentuk satu deklarasi CSS.'),
        tags: ['selector'],
      }),
    ],
    recap: t(
      'CSS bekerja memakai selector untuk memilih elemen, lalu properti dan nilai untuk mendandaninya.',
      'Aturan CSS memasangkan selector (tag, .class, #id) dengan deklarasi properti dan nilai.',
    ),
    companion: {
      talkPrompts: ['Kalau kita ingin menghias semua kartu produk di halaman agar warnanya sama, lebih enak pakai tag, class, atau id?'],
      offlineActivity: 'Beri stiker warna yang sama pada beberapa benda sekelompok di meja belajar sebagai latihan konsep class.',
    },
  }),

  makeLesson({
    id: 'a03-l02',
    worldId: 'a03',
    title: 'Box model: lukisan berbingkai',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menunjuk empat lapis kotak: isi, padding, border, dan margin.',
      'Aku bisa membedakan content, padding, border, dan margin serta fungsi box-sizing: border-box.',
    ),
    estMinutes: 6,
    introducesTerms: ['box-model', 'padding', 'margin'],
    usesTerms: ['css', 'selector'],
    stickerId: 'lukisan-berbingkai',
    warmupFrom: 'a03-l01',
    steps: [
      storyStep('a03/lukisan-berbingkai.svg', [
        rText(
          'Semua benda di layar website sebenarnya berbentuk kotak! Bayangkan sebuah lukisan berbingkai yang tergantung di dinding.',
          'Dalam CSS, setiap elemen dianggap kotak empat lapis yang sangat mudah dipahami lewat analogi lukisan berbingkai.',
        ),
      ]),
      conceptStep({
        title: t('Content & Padding (Di Dalam Bingkai)', 'Content & Padding'),
        visualName: 'BoxModelDiagram',
        visualProps: { worldId: 'a03', topic: 'box-model-dalam' },
        alt: t('Diagram box model: content di tengah dikelilingi padding.'),
        body: [
          rText('Lukisannya adalah isi (content). Ruang kosong antara lukisan dan bingkai adalah '),
          rTerm('padding', 'padding', 'padding'),
          rText('.'),
        ],
      }),
      conceptStep({
        title: t('Border & Margin (Bingkai & Jarak Luar)', 'Border, Margin & border-box'),
        visualName: 'BoxModelDiagram',
        visualProps: { worldId: 'a03', topic: 'box-model-luar' },
        alt: t('Diagram box model: border sebagai bingkai dan margin jarak luar.'),
        code: {
          lang: 'css',
          code: '* { box-sizing: border-box; }',
        },
        body: [
          rTerm('box-model', 'Box model', 'Box model'),
          rText(' ditutup bingkai (border) lalu dipisahkan kotak lain oleh '),
          rTerm('margin', 'margin', 'margin'),
          rText('.'),
        ],
      }),
      limitStep({
        analogy: t('Box model seperti lukisan berbingkai di dinding'),
        same: [
          t('Ada isi di tengah, ruang dalam, bingkai, dan jarak luar antar bingkai.'),
        ],
        different: [
          t('Margin atas dan bawah dua kotak yang bertumpuk bisa saling menyatu (margin collapsing), sedangkan jarak dua lukisan tidak menyatu.'),
        ],
      }),
      simStep(
        'kupas-box-model',
        t(
          'Geser slider padding, border, dan margin untuk melihat kotaknya membesar atau menjauh!',
          'Uji langsung perubahan padding, border, margin, dan border-box pada simulator.',
        ),
      ),
      qStep({
        id: 'a03-l02-q1',
        type: 'hotspot',
        difficulty: 1,
        prompt: t('Ketuk lapisan yang menjadi jarak di DALAM bingkai antara isi dan border!'),
        image: 'a03-box-hotspot',
        regions: [
          { id: 'content', shape: 'rect', coords: [60, 60, 120, 40], label: 'Content (Lukisan)' },
          { id: 'padding', shape: 'rect', coords: [40, 40, 160, 80], label: 'Padding (Ruang dalam)' },
          { id: 'border', shape: 'rect', coords: [20, 20, 200, 120], label: 'Border (Bingkai kayu)' },
          { id: 'margin', shape: 'rect', coords: [0, 0, 240, 160], label: 'Margin (Jarak luar)' },
        ],
        answer: 'padding',
        explainCorrect: t('Tepat! Padding berada di dalam border dan memberi ruang napas di sekitar teks/isi.'),
        tags: ['padding', 'box-model'],
      }),
      qStep(
        makeMcq({
          id: 'a03-l02-q2',
          type: 'analogy',
          prompt: t('Jarak antar dua bingkai foto di dinding supaya tidak saling menempel ibarat…'),
          choices: [
            { id: 'm', label: t('Margin') },
            { id: 'p', label: t('Padding'), explainWrong: t('Padding berada di dalam bingkai, bukan di luar.') },
            { id: 'c', label: t('Content'), explainWrong: t('Content adalah isi gambarnya.') },
          ],
          answer: 'm',
          explainCorrect: t('Benar! Margin memberi jarak antar kotak di luar garis tepinya.'),
          tags: ['margin'],
        }),
      ),
      qStep({
        id: 'a03-l02-q3',
        type: 'order',
        difficulty: 2,
        prompt: t('Urutkan empat lapis Box Model dari yang paling DALAM ke paling LUAR:'),
        items: [
          { id: 'c', label: t('Content (Isi)') },
          { id: 'p', label: t('Padding') },
          { id: 'b', label: t('Border') },
          { id: 'm', label: t('Margin') },
        ],
        answer: ['c', 'p', 'b', 'm'],
        explainCorrect: t('Hebat! Content → Padding → Border → Margin.'),
        tags: ['box-model'],
      }),
      qStep(
        makeMcq({
          id: 'a03-l02-q4',
          type: 'limit',
          analogy: t('Lukisan berbingkai'),
          prompt: t('Mana perilaku CSS yang TIDAK terjadi pada bingkai lukisan di dinding?'),
          choices: [
            { id: 'col', label: t('Margin dua kotak di atas-bawah bisa melebur menyatu') },
            { id: 'in', label: t('Isi berada di tengah bingkai'), explainWrong: t('Keduanya sama.') },
            { id: 'out', label: t('Ada jarak antar satu lukisan dan tetangganya'), explainWrong: t('Keduanya sama.') },
          ],
          answer: 'col',
          explainCorrect: t('Tepat! Di CSS, margin vertikal bersebelahan mengalami collapsing menjadi jarak terbesar saja.'),
          tags: ['margin', 'box-model'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-l02-q5',
          type: 'scenario',
          story: t('Teks di dalam tombol "Beli" menempel terlalu rapat ke garis tepi tombol.'),
          prompt: t('Properti apa yang harus ditambah agar tombol terasa lega di dalam?'),
          difficulty: 2,
          choices: [
            { id: 'pad', label: t('Tambah padding') },
            { id: 'mar', label: t('Tambah margin'), explainWrong: t('Margin hanya mendorong tombol menjauh dari elemen lain.') },
            { id: 'h1', label: t('Ganti jadi <h6>'), explainWrong: t('Itu tidak memberi ruang di sekitar teks tombol.') },
          ],
          answer: 'pad',
          explainCorrect: t('Benar! Padding menambah ruang antara teks dan garis tepi tombol.'),
          tags: ['padding'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a03-l02-q6',
          modes: ['pro'],
          prompt: t('Menulis * { box-sizing: border-box; } membuat nilai width sudah mencakup padding dan border.'),
          answer: true,
          explainCorrect: t('Betul! Ini menjaga lebar elemen tetap terprediksi saat diberi padding.'),
          explainWrong: t('Dengan border-box, padding dan border masuk ke dalam ukuran width.'),
          tags: ['box-model'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a03-l02-r1',
        prompt: t('Jarak di luar garis tepi untuk menjauhkan kotak satu dari kotak lain disebut…'),
        choices: [
          { id: 'm', label: t('Margin') },
          { id: 'p', label: t('Padding'), explainWrong: t('Padding ada di dalam garis tepi.') },
        ],
        answer: 'm',
        explainCorrect: t('Margin adalah jarak bagian luar.'),
        tags: ['margin'],
      }),
      makeMcq({
        id: 'a03-l02-r2',
        prompt: t('Jarak ruang di dalam kotak antara isi dan border disebut…'),
        choices: [
          { id: 'p', label: t('Padding') },
          { id: 'm', label: t('Margin'), explainWrong: t('Margin adalah jarak di luar border.') },
        ],
        answer: 'p',
        explainCorrect: t('Padding adalah ruang bantalan di dalam bingkai.'),
        tags: ['padding'],
      }),
    ],
    recap: t(
      'Setiap kotak punya 4 lapis dari dalam ke luar: isi, padding, border, dan margin.',
      'Box model terdiri dari content, padding, border, dan margin; gunakan box-sizing: border-box.',
    ),
    companion: {
      talkPrompts: ['Lihat kotak kartu di layar ini: mana bagian padding-nya dan mana bagian margin antarkartu?'],
      offlineActivity: 'Ambil kartu atau foto lalu letakkan di atas kertas lebih besar—sisa tepi di dalam bingkai itu padding, jarak ke foto sebelah itu margin.',
    },
  }),

  makeLesson({
    id: 'a03-l03',
    worldId: 'a03',
    title: 'Satuan ukuran',
    modes: ['pro'],
    objective: t('Aku bisa memilih satuan CSS yang tepat: px, rem, em, %, vw/vh, dan fr.'),
    estMinutes: 5,
    introducesTerms: ['rem-unit'],
    usesTerms: ['css', 'box-model'],
    warmupFrom: 'a03-l02',
    steps: [
      storyStep('a03/penggaris.svg', [
        rText('Di bengkel, mengukur tebal bingkai cukup dengan milimeter tetap, tetapi mengukur lebar tirai jendela harus mengikuti lebar jendelanya.'),
      ]),
      conceptStep({
        title: t('Satuan Tetap (px) vs Relatif Huruf (rem, em)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'satuan-px-rem' },
        alt: t('Perbandingan px tetap vs rem relatif terhadap root 16px.'),
        body: [
          rTerm('rem-unit', 'px & rem'),
          rText(': px berukuran tetap (cocok untuk garis tepi/bayangan). rem adalah kelipatan ukuran huruf dasar dokumen (1rem = 16px), sehingga ikut membesar saat pengguna memperbesar huruf.'),
        ],
      }),
      conceptStep({
        title: t('Satuan Ruang: %, vw/vh, dan fr'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'satuan-persen-fr' },
        alt: t('Satuan %, vw/vh/dvh, dan fr untuk pembagian kolom Grid.'),
        body: [
          rText('% mengikuti induknya, vw/vh (atau dvh di HP) mengikuti ukuran layar, dan fr membagi sisa ruang kosong khusus pada CSS Grid.'),
        ],
      }),
      limitStep({
        analogy: t('Penggaris tetap vs ukuran proporsi'),
        same: [
          t('px selalu sama seperti penggaris kayu; % dan rem menyesuaikan acuan dasarnya.'),
        ],
        different: [
          t('Menulis ukuran font paragraf dengan px tetap dapat menghambat pengaturan besar teks browser sebagian pengguna.'),
        ],
      }),
      simStep('kupas-box-model', t('Amati perubahan ukuran kotak dan padding pada simulator.')),
      qStep({
        id: 'a03-l03-q1',
        type: 'match',
        difficulty: 1,
        prompt: t('Pasangkan satuan CSS dengan kegunaan terbaiknya:'),
        left: [
          { id: 'px', label: t('px') },
          { id: 'rem', label: t('rem') },
          { id: 'fr', label: t('fr') },
          { id: 'pct', label: t('%') },
        ],
        right: [
          { id: 'r1', label: t('Garis tepi tipis (border: 2px)') },
          { id: 'r2', label: t('Ukuran huruf dan jarak konsisten') },
          { id: 'r3', label: t('Pembagian kolom di CSS Grid') },
          { id: 'r4', label: t('Lebar relatif terhadap wadah induk') },
        ],
        answer: { px: 'r1', rem: 'r2', fr: 'r3', pct: 'r4' },
        explainCorrect: t('Tepat sekali! Memilih satuan sesuai konteks menjaga layout fleksibel dan aksesibel.'),
        tags: ['rem-unit'],
      }),
      qStep(
        makeMcq({
          id: 'a03-l03-q2',
          prompt: t('Jika ukuran huruf dasar browser adalah 16px, berapa piksel ukuran 1.5rem?'),
          choices: [
            { id: '24', label: t('24px') },
            { id: '15', label: t('15px'), explainWrong: t('1.5 × 16 = 24.') },
            { id: '32', label: t('32px'), explainWrong: t('32px adalah 2rem.') },
          ],
          answer: '24',
          explainCorrect: t('Benar. 1.5 × 16px = 24px.'),
          tags: ['rem-unit'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-l03-q3',
          prompt: t('Apa perbedaan utama antara em dan rem?'),
          choices: [
            { id: 'diff', label: t('rem mengacu pada huruf akar (html), em mengacu pada huruf elemen itu sendiri/induknya') },
            { id: 'same', label: t('Keduanya hanya bisa dipakai untuk warna'), explainWrong: t('Keduanya adalah satuan ukuran panjang.') },
            { id: 'px', label: t('em selalu 100px'), explainWrong: t('Nilai em bergantung pada font-size elemen.') },
          ],
          answer: 'diff',
          explainCorrect: t('Tepat. Itulah sebabnya em cocok untuk padding tombol agar ikut skala font tombolnya.'),
          tags: ['rem-unit'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-l03-q4',
          type: 'limit',
          analogy: t('Penggaris cm vs skala rem'),
          prompt: t('Mengapa memakai px pada semua teks di website bisa menjadi masalah aksesibilitas?'),
          choices: [
            { id: 'zoom', label: t('Pengguna yang memperbesar default font browser mungkin tidak merasakan perubahan pada teks px') },
            { id: 'err', label: t('px tidak didukung Safari'), explainWrong: t('px didukung semua browser.') },
            { id: 'css', label: t('px tidak bisa dipakai pada tag p'), explainWrong: t('Bisa, hanya kurang fleksibel terhadap preferensi huruf.') },
          ],
          answer: 'zoom',
          explainCorrect: t('Benar. Satuan rem menghormati setelan ukuran teks bawaan pengguna.'),
          tags: ['rem-unit'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a03-l03-q5',
          prompt: t('Satuan 100dvh di Safari HP lebih akurat daripada 100vh karena memperhitungkan bilah alamat yang muncul-hilang.'),
          answer: true,
          explainCorrect: t('Betul! dvh (dynamic viewport height) mencegah bagian bawah halaman tertutup bilah browser HP.'),
          explainWrong: t('100vh di browser HP sering terlalu tinggi saat bilah alamat tampil; gunakan 100dvh.'),
          tags: ['rem-unit'],
        }),
      ),
      qStep({
        id: 'a03-l03-q6',
        type: 'type',
        difficulty: 2,
        prompt: t('Tulis nama satuan CSS khusus Grid yang berarti "bagian dari sisa ruang".'),
        accept: ['fr'],
        explainCorrect: t('Tepat! Contohnya grid-template-columns: 1fr 2fr; membagi sisa ruang menjadi 1:2.'),
        tags: ['rem-unit'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a03-l03-r1',
        prompt: t('Satuan terbaik untuk ukuran teks agar menghormati pengaturan ukuran huruf browser pengguna adalah…'),
        choices: [
          { id: 'rem', label: t('rem') },
          { id: 'fr', label: t('fr'), explainWrong: t('fr hanya dipakai untuk kolom/baris CSS Grid.') },
        ],
        answer: 'rem',
        explainCorrect: t('rem selalu relatif terhadap ukuran font dasar root html.'),
        tags: ['rem-unit'],
      }),
      makeTf({
        id: 'a03-l03-r2',
        prompt: t('Satuan px cocok dipakai untuk ketebalan garis tepi (border) yang tidak perlu ikut membesar saat huruf membesar.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('Border tipis 1–2px memang umum memakai px.'),
        tags: ['rem-unit'],
      }),
    ],
    recap: t('Gunakan px untuk garis tipis, rem untuk huruf/jarak, %/dvh untuk proporsi layar, dan fr untuk Grid.'),
  }),

  makeLesson({
    id: 'a03-l04',
    worldId: 'a03',
    title: 'Flexbox: buku di rak',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengatur barisan kotak ke kiri, tengah, atau tersebar rata dengan Flexbox.',
      'Aku bisa mengatur tata letak satu arah menggunakan display: flex, justify-content, align-items, dan gap.',
    ),
    estMinutes: 6,
    introducesTerms: ['flexbox'],
    usesTerms: ['css', 'box-model'],
    stickerId: 'rak-buku',
    warmupFrom: 'a03-l02',
    steps: [
      storyStep('a03/rak-buku.svg', [
        rText(
          'Flexbox itu seperti merapikan buku di satu rak panjang. Kamu bisa mendorong semuanya ke kiri, ke tengah, atau disebar rata.',
          'Memberi display: flex pada wadah induk membuat semua anak langsung berjajar dalam satu arah yang mudah diatur perataannya.',
        ),
      ]),
      conceptStep({
        title: t('Satu Arah: Baris atau Kolom', 'display: flex & Arah Utama'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'flexbox-justify' },
        alt: t('Berbagai nilai justify-content: flex-start, center, dan space-between.'),
        code: {
          lang: 'css',
          code: '.rak {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}',
        },
        body: [
          rTerm('flexbox', 'Flexbox', 'Flexbox'),
          rText(' menata satu baris lewat '),
          rCode('justify-content'),
          rText(' (arah utama) dan '),
          rCode('align-items'),
          rText(' (arah silang).'),
        ],
      }),
      conceptStep({
        title: t('Jarak, Turun Baris, Arah Kolom', 'gap, flex-wrap, flex-direction'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'flexbox-wrap' },
        alt: t('Kartu yang otomatis turun baris saat flex-wrap: wrap aktif.'),
        body: [
          rText('Pakai '),
          rCode('gap'),
          rText(' untuk jarak antarkotak dan '),
          rCode('flex-wrap: wrap'),
          rText(' agar kotak turun ke baris baru bila penuh.'),
        ],
      }),
      limitStep({
        analogy: t('Menata buku di satu rak'),
        same: [
          t('Mengatur posisi buku sepanjang satu baris rak agar rapat tengah, kiri, atau berjarak rata.'),
        ],
        different: [
          t('Di CSS, rak bisa diputar vertikal memakai flex-direction: column atau membungkus ke bawah otomatis.'),
        ],
      }),
      simStep(
        'playground-flexbox',
        t(
          'Coba ubah nilai justify-content dan align-items lalu lihat kotaknya berpindah!',
          'Eksplorasi langsung nilai justify-content, align-items, dan gap di Playground Flexbox.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a03-l04-q1',
          prompt: t('Jika ingin semua item di barisan Flexbox berkumpul persis di tengah arah mendatar, gunakan…'),
          choices: [
            { id: 'c', label: t('justify-content: center') },
            { id: 'sb', label: t('justify-content: space-between'), explainWrong: t('space-between menyebar item sampai ujung kiri dan kanan.') },
            { id: 'end', label: t('justify-content: flex-end'), explainWrong: t('flex-end mendorong item ke ujung kanan.') },
          ],
          answer: 'c',
          explainCorrect: t('Benar! justify-content: center mengumpulkan item di tengah arah utama.'),
          tags: ['flexbox'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-l04-q2',
          type: 'analogy',
          prompt: t('Flexbox paling cocok dipakai untuk mengatur…'),
          choices: [
            { id: 'one', label: t('Satu deretan menu atau isi dalam satu kartu (satu arah)') },
            { id: 'two', label: t('Peta kotak catur 8x8 yang kaku dua arah'), explainWrong: t('Untuk dua arah baris dan kolom sekaligus lebih cocok CSS Grid.') },
            { id: 'sec', label: t('Mengunci kata sandi'), explainWrong: t('Flexbox hanya untuk tata letak tampilan.') },
          ],
          answer: 'one',
          explainCorrect: t('Tepat! Flexbox adalah ahli tata letak satu dimensi.'),
          tags: ['flexbox'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-l04-q3',
          prompt: t('Properti Flexbox mana yang memberi jarak rapi antarkotak tanpa perlu margin di tiap item?'),
          choices: [
            { id: 'gap', label: t('gap') },
            { id: 'alt', label: t('alt'), explainWrong: t('alt adalah atribut deskripsi gambar.') },
            { id: 'pad', label: t('font-weight'), explainWrong: t('font-weight mengatur ketebalan huruf.') },
          ],
          answer: 'gap',
          explainCorrect: t('Benar! gap memberi celah hanya di antara anak-anak Flexbox.'),
          tags: ['flexbox'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-l04-q4',
          type: 'limit',
          analogy: t('Buku berjajar di satu rak'),
          prompt: t('Kemampuan apa yang dimiliki Flexbox tetapi tidak dimiliki satu baris rak kayu biasa?'),
          choices: [
            { id: 'wrap', label: t('Bisa diputar jadi susunan vertikal (column) dan otomatis turun baris dengan flex-wrap') },
            { id: 'left', label: t('Bisa merapat ke sisi kiri'), explainWrong: t('Rak buku biasa juga bisa.') },
            { id: 'mid', label: t('Bisa dirapatkan di tengah'), explainWrong: t('Rak buku biasa juga bisa.') },
          ],
          answer: 'wrap',
          explainCorrect: t('Tepat! flex-direction dan flex-wrap membuat wadah fleksibel menyesuaikan ruang.'),
          tags: ['flexbox'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-l04-q5',
          type: 'scenario',
          story: t('Di header Toko Rani, ada Logo di kiri dan Menu di kanan. Saat ini keduanya masih menempel rapat di sebelah kiri.'),
          prompt: t('Nilai justify-content mana yang langsung memisahkan Logo ke ujung kiri dan Menu ke ujung kanan?'),
          difficulty: 2,
          choices: [
            { id: 'sb', label: t('space-between') },
            { id: 'fs', label: t('flex-start'), explainWrong: t('flex-start justru menumpuk semuanya di kiri.') },
            { id: 'c', label: t('center'), explainWrong: t('center menaruh keduanya berdekatan di tengah.') },
          ],
          answer: 'sb',
          explainCorrect: t('Keren! space-between meletakkan elemen pertama di kiri dan elemen terakhir di kanan.'),
          tags: ['flexbox'],
        }),
      ),
      qStep({
        id: 'a03-l04-q6',
        type: 'fill',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Lengkapi CSS agar anak elemen di baris Flexbox sejajar vertikal di tengah:'),
        template: '.navbar { display: flex; ___: center; }',
        bank: ['align-items', 'box-sizing', 'text-decoration'],
        answer: ['align-items'],
        explainCorrect: t('Tepat. align-items mengatur perataan pada sumbu silang (vertikal saat row).'),
        tags: ['flexbox'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a03-l04-r1',
        prompt: t('Untuk menyusun anak-anak sebuah kotak ke samping memakai Flexbox, properti wajib di induk adalah…'),
        choices: [
          { id: 'df', label: t('display: flex;') },
          { id: 'bc', label: t('border-color: red;'), explainWrong: t('border-color hanya mengatur warna bingkai.') },
        ],
        answer: 'df',
        explainCorrect: t('display: flex; mengaktifkan tata letak Flexbox.'),
        tags: ['flexbox'],
      }),
      makeTf({
        id: 'a03-l04-r2',
        prompt: t('Properti gap di Flexbox memberi jarak hanya di antara item, bukan di tepi luar wadah.'),
        answer: true,
        explainCorrect: t('Betul sekali!'),
        explainWrong: t('gap hanya menyisipkan celah di antara anak-anak wadah flex.'),
        tags: ['flexbox'],
      }),
    ],
    recap: t(
      'Flexbox menata kotak dalam satu arah: pakai justify-content, align-items, dan gap.',
      'Gunakan display: flex untuk tata letak satu dimensi dengan kendali perataan, jarak gap, dan pembungkusan baris.',
    ),
    companion: {
      talkPrompts: ['Kalau menyusun 4 buku di meja dengan gaya space-between vs center, seperti apa posisinya?'],
      offlineActivity: 'Susun 4 balok atau buku di meja lalu praktikkan posisi flex-start, center, dan space-between.',
    },
  }),

  makeLesson({
    id: 'a03-l05',
    worldId: 'a03',
    title: 'Grid: kotak bekal',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan kapan memakai Grid (baris & kolom) dan kapan Flexbox.',
      'Aku bisa menyusun tata letak dua dimensi dengan display: grid, grid-template-columns, dan fr.',
    ),
    estMinutes: 6,
    introducesTerms: ['grid-css'],
    usesTerms: ['css', 'flexbox'],
    stickerId: 'kotak-bekal',
    warmupFrom: 'a03-l04',
    steps: [
      storyStep('a03/kotak-bekal.svg', [
        rText(
          'Lihat kotak bekal yang punya sekat untuk nasi di atas, sayur di kiri bawah, dan lauk di kanan bawah. Itulah CSS Grid!',
          'Jika Flexbox unggul untuk satu baris atau kolom, CSS Grid mengatur baris dan kolom sekaligus seperti sekat kotak bekal.',
        ),
      ]),
      conceptStep({
        title: t('Dua Arah Sekaligus', 'display: grid & Kolom fr'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'css-grid' },
        alt: t('Grid tiga kolom 1fr 2fr 1fr dengan header dan footer.'),
        code: {
          lang: 'css',
          code: '.halaman {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  gap: 16px;\n}',
        },
        body: [
          rTerm('grid-css', 'CSS Grid', 'CSS Grid'),
          rText(' membagi layar menjadi baris dan kolom rapi dalam satu wadah.'),
        ],
      }),
      conceptStep({
        title: t('Flexbox vs Grid', 'Dipakai Bersamaan'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'flex-vs-grid' },
        alt: t('Kerangka luar Grid dengan isi kartu memakai Flexbox.'),
        body: [
          rText('Keduanya sering bekerja sama: Grid menyusun kerangka halaman besar, lalu Flexbox menata tombol di dalam setiap kartu.'),
        ],
      }),
      limitStep({
        analogy: t('Kotak bekal bersekat kaku'),
        same: [
          t('Membagi ruang secara dua dimensi dengan batas baris dan kolom yang jelas.'),
        ],
        different: [
          t('Di CSS Grid, satu sekat boleh melebar melintasi beberapa kolom (span), bahkan jumlah kolomnya bisa berubah sesuai ukuran layar.'),
        ],
      }),
      simStep(
        'playground-flexbox',
        t(
          'Bandingkan susunan satu arah pada simulator dengan tata letak dua arah Grid.',
          'Amati perbedaan perilaku satu arah Flexbox dan pembagian sekat dua dimensi.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a03-l05-q1',
          type: 'analogy',
          prompt: t('Menata galeri 12 foto yang harus rapi 3 kolom × 4 baris paling pas memakai…'),
          choices: [
            { id: 'grid', label: t('CSS Grid') },
            { id: 'p', label: t('Tag <p> saja'), explainWrong: t('<p> untuk paragraf tulisan.') },
            { id: 'href', label: t('Atribut href'), explainWrong: t('href untuk alamat tautan.') },
          ],
          answer: 'grid',
          explainCorrect: t('Benar! Galeri baris dan kolom adalah keahlian CSS Grid.'),
          tags: ['grid-css'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-l05-q2',
          prompt: t('Jika menulis grid-template-columns: 1fr 2fr 1fr, kolom mana yang paling lebar?'),
          choices: [
            { id: 'mid', label: t('Kolom tengah (dua kali lebih lebar dari samping)') },
            { id: 'left', label: t('Kolom kiri'), explainWrong: t('Kiri hanya 1 bagian, tengah 2 bagian.') },
            { id: 'eq', label: t('Ketiganya sama persis'), explainWrong: t('1fr, 2fr, 1fr berarti tengah 2 kali lipat.') },
          ],
          answer: 'mid',
          explainCorrect: t('Tepat! 2fr mendapat jatah dua kali bagian sisa ruang dibanding 1fr.'),
          tags: ['grid-css'],
        }),
      ),
      qStep({
        id: 'a03-l05-q3',
        type: 'sort',
        prompt: t('Pilih alat terbaik untuk tiap tugas tata letak:'),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('Barisan tombol ikon sejajar di navbar') },
          { id: 'i2', label: t('Kerangka halaman berisi header, sidebar, isi, footer') },
          { id: 'i3', label: t('Deretan foto + nama di samping tombol') },
          { id: 'i4', label: t('Katalog produk 4 kolom × 3 baris') },
        ],
        bins: [
          { id: 'flex', label: t('Flexbox (1 Arah)') },
          { id: 'grid', label: t('CSS Grid (2 Arah)') },
        ],
        answer: { i1: 'flex', i2: 'grid', i3: 'flex', i4: 'grid' },
        explainCorrect: t('Mantap! Flexbox untuk satu arah, Grid untuk dua arah.'),
        tags: ['flexbox', 'grid-css'],
      }),
      qStep(
        makeMcq({
          id: 'a03-l05-q4',
          type: 'limit',
          analogy: t('Kotak bekal bersekat'),
          prompt: t('Apa kelebihan CSS Grid dibanding sekat plastik kotak bekal?'),
          choices: [
            { id: 'span', label: t('Satu item di Grid bisa melebar menggabung beberapa kolom sekaligus dan berubah di HP') },
            { id: 'box', label: t('Bisa menampung isi'), explainWrong: t('Keduanya sama-sama menampung isi.') },
            { id: 'sep', label: t('Sekatnya memisahkan bagian'), explainWrong: t('Keduanya sama-sama memisahkan bagian.') },
          ],
          answer: 'span',
          explainCorrect: t('Benar! Header di Grid bisa melebar penuh 3 kolom lalu menumpuk jadi 1 kolom di layar kecil.'),
          tags: ['grid-css'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a03-l05-q5',
          prompt: t('Flexbox dan CSS Grid boleh dipakai bersamaan di satu halaman website.'),
          answer: true,
          explainCorrect: t('Betul! Bahkan sangat umum memakai Grid untuk kerangka utama dan Flexbox untuk isi tiap kartu.'),
          explainWrong: t('Keduanya bukan musuh; justru paling kuat bila digabungkan.'),
          tags: ['flexbox', 'grid-css'],
        }),
      ),
      qStep({
        id: 'a03-l05-q6',
        type: 'fill',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Lengkapi CSS Grid untuk membuat 3 kolom sama lebar dengan jarak 16px:'),
        template: '.galeri { display: grid; ___: repeat(3, 1fr); gap: 16px; }',
        bank: ['grid-template-columns', 'justify-content', 'box-sizing'],
        answer: ['grid-template-columns'],
        explainCorrect: t('Tepat. grid-template-columns: repeat(3, 1fr) membuat 3 kolom sama besar.'),
        tags: ['grid-css'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a03-l05-r1',
        prompt: t('Sistem tata letak CSS untuk baris dan kolom dua arah sekaligus adalah…'),
        choices: [
          { id: 'g', label: t('CSS Grid') },
          { id: 'm', label: t('Margin'), explainWrong: t('Margin hanya memberi jarak luar pada satu elemen.') },
        ],
        answer: 'g',
        explainCorrect: t('CSS Grid mengatur tata letak dua dimensi.'),
        tags: ['grid-css'],
      }),
      makeTf({
        id: 'a03-l05-r2',
        prompt: t('Dalam CSS Grid, repeat(3, 1fr) berarti membagi lebar menjadi tiga kolom yang sama rata.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('repeat(3, 1fr) adalah singkatan dari 1fr 1fr 1fr.'),
        tags: ['grid-css'],
      }),
    ],
    recap: t(
      'CSS Grid menata baris dan kolom dua arah seperti kotak bekal, sering digabung bersama Flexbox.',
      'Gunakan CSS Grid untuk tata letak dua dimensi dan Flexbox untuk elemen satu arah.',
    ),
    companion: {
      talkPrompts: ['Bandingkan rak buku satu baris (Flexbox) dengan kotak bekal banyak sekat (Grid): apa bedanya?'],
      offlineActivity: 'Gambar sketsa susunan kotak bekal makan siang dan tandai kolom mana yang 1fr dan mana yang 2fr.',
    },
  }),

  makeLesson({
    id: 'a03-l06',
    worldId: 'a03',
    title: 'Position, z-index, cascade',
    modes: ['pro'],
    objective: t('Aku bisa mengatur tumpukan posisi CSS, specificity cascade, pseudo-class, dan CSS variable.'),
    estMinutes: 6,
    introducesTerms: ['z-index'],
    usesTerms: ['css', 'selector', 'class-css'],
    warmupFrom: 'a03-l05',
    steps: [
      storyStep('a03/tumpukan-kertas.svg', [
        rText('Di meja bengkel ada kertas bertumpuk. Kertas mana yang muncul paling depan? Dan kalau dua instruksi bertabrakan, siapa yang menang?'),
      ]),
      conceptStep({
        title: t('Position & z-index (Tumpukan Kertas)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'position-zindex' },
        alt: t('Lima nilai position dan urutan tumpukan z-index.'),
        body: [
          rTerm('z-index', 'Position & z-index'),
          rText(': position bisa static, relative, absolute, fixed, atau sticky. Elemen berposisi dengan angka z-index lebih besar berada di depan.'),
        ],
      }),
      conceptStep({
        title: t('Cascade, Pseudo-class & CSS Variable'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'cascade-var' },
        alt: t('Prioritas ID > class > tag, :hover/:focus/:disabled, dan var(--utama).'),
        code: {
          lang: 'css',
          code: ':root { --utama: #2F6FED; }\n.tombol { background: var(--utama); transition: 0.2s; }\n.tombol:hover { filter: brightness(1.1); }',
        },
        body: [
          rText('Aturan lebih spesifik menang: ID > class > tag. Gunakan pseudo-class (:hover, :focus, :disabled) dan CSS variable (--utama) agar gaya konsisten.'),
        ],
      }),
      limitStep({
        analogy: t('z-index seperti tumpukan kertas di meja'),
        same: [
          t('Angka z-index lebih besar menutupi elemen di bawahnya.'),
        ],
        different: [
          t('z-index hanya bekerja pada elemen dengan position selain static (atau anak flex/grid), serta terbatas pada stacking context induknya.'),
        ],
      }),
      simStep('kupas-box-model', t('Uji lapisan border dan jarak antar kotak di simulator Bengkel CSS.')),
      qStep({
        id: 'a03-l06-q1',
        type: 'match',
        difficulty: 2,
        prompt: t('Pasangkan nilai position CSS dengan perilakunya:'),
        left: [
          { id: 'rel', label: t('relative') },
          { id: 'abs', label: t('absolute') },
          { id: 'fix', label: t('fixed') },
          { id: 'stk', label: t('sticky') },
        ],
        right: [
          { id: 'r1', label: t('Geser sedikit dari posisi asalnya') },
          { id: 'r2', label: t('Menempel bebas di dalam induk berposisi') },
          { id: 'r3', label: t('Tetap menempel di layar walau halaman digulir') },
          { id: 'r4', label: t('Ikut gulir lalu menempel di tepi saat tersentuh') },
        ],
        answer: { rel: 'r1', abs: 'r2', fix: 'r3', stk: 'r4' },
        explainCorrect: t('Hebat! Empat mode position ini sangat sering dipakai untuk navbar dan badge.'),
        tags: ['z-index'],
      }),
      qStep(
        makeMcq({
          id: 'a03-l06-q2',
          prompt: t('Jika .btn { color: red; } dan .btn { color: blue; } ditulis berurutan di satu file, warna apa yang tampil?'),
          choices: [
            { id: 'blue', label: t('Biru (karena kekuatannya sama, yang ditulis terakhir menang)') },
            { id: 'red', label: t('Merah'), explainWrong: t('Aturan yang sama kuat akan dimenangkan baris terakhir.') },
            { id: 'purple', label: t('Ungu gabungan'), explainWrong: t('CSS tidak mencampur warna dua aturan yang bertabrakan.') },
          ],
          answer: 'blue',
          explainCorrect: t('Benar. Prinsip cascade: jika specificity seimbang, deklarasi paling bawah menang.'),
          tags: ['z-index', 'selector'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-l06-q3',
          prompt: t('Mengapa developer menyimpan warna utama di CSS variable (--utama: #2F6FED)?'),
          choices: [
            { id: 'var', label: t('Cukup ubah satu baris untuk memperbarui warna di seluruh halaman') },
            { id: 'z', label: t('Agar z-index naik jadi 999'), explainWrong: t('Variabel CSS tidak otomatis mengubah z-index.') },
            { id: 'html', label: t('Agar tidak perlu menulis file HTML'), explainWrong: t('HTML tetap dibutuhkan untuk struktur.') },
          ],
          answer: 'var',
          explainCorrect: t('Tepat. Ini juga menjadi dasar design token pada design system modern.'),
          tags: ['css'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-l06-q4',
          type: 'limit',
          analogy: t('z-index sebagai tumpukan kertas'),
          prompt: t('Mengapa memberi z-index: 9999 terkadang tetap membuat elemen tertutup elemen lain?'),
          choices: [
            { id: 'ctx', label: t('Elemen masih position: static atau terkurung stacking context induknya') },
            { id: 'max', label: t('z-index maksimal hanya sampai 10'), explainWrong: t('z-index mendukung bilangan bulat besar.') },
            { id: 'font', label: t('Karena font-size terlalu kecil'), explainWrong: t('Ukuran huruf tidak mematikan z-index.') },
          ],
          answer: 'ctx',
          explainCorrect: t('Benar! z-index tidak aktif pada elemen static dan selalu tunduk pada stacking context wadahnya.'),
          tags: ['z-index'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a03-l06-q5',
          prompt: t('Menambahkan transition: 0.2s membuat perubahan gaya saat :hover terasa halus, tidak mendadak.'),
          answer: true,
          explainCorrect: t('Betul! Transition memberi animasi singkat yang halus antar dua state.'),
          explainWrong: t('transition memang dibuat untuk menghaluskan perpindahan nilai CSS.'),
          tags: ['css'],
        }),
      ),
      qStep({
        id: 'a03-l06-q6',
        type: 'type',
        difficulty: 2,
        prompt: t('Tulis nama pseudo-class CSS yang aktif ketika elemen sedang dipilih lewat tombol Tab keyboard (awali dengan :).'),
        accept: [':focus', ':focus-visible'],
        explainCorrect: t('Tepat sekali! :focus / :focus-visible wajib dijaga agar navigasi keyboard tetap terlihat.'),
        tags: ['selector'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a03-l06-r1',
        prompt: t('Urutan kekuatan specificity CSS dari paling kuat ke paling lemah adalah…'),
        choices: [
          { id: 'ok', label: t('ID > class > tag') },
          { id: 'no', label: t('tag > class > ID'), explainWrong: t('ID jauh lebih spesifik dibanding class dan tag.') },
        ],
        answer: 'ok',
        explainCorrect: t('ID mengalahkan class, dan class mengalahkan tag.'),
        tags: ['selector'],
      }),
      makeTf({
        id: 'a03-l06-r2',
        prompt: t('position: fixed membuat tombol atau header tetap menempel di layar meskipun halaman digulir.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('fixed menambatkan elemen terhadap viewport layar.'),
        tags: ['z-index'],
      }),
    ],
    recap: t('Atur tumpukan dengan position/z-index, pahami cascade ID > class > tag, serta manfaatkan :focus dan CSS variable.'),
  }),

  makeLesson({
    id: 'a03-sq1',
    worldId: 'a03',
    title: 'Playground Flexbox',
    modes: ['junior', 'pro'],
    isSideQuest: true,
    objective: t(
      'Aku bisa menyelesaikan 3 tantangan menata buku di rak dengan Flexbox.',
      'Aku bisa menguji kombinasi justify-content, align-items, dan gap untuk berbagai layout.',
    ),
    estMinutes: 4,
    introducesTerms: [],
    usesTerms: ['flexbox', 'css'],
    steps: [
      storyStep('a03/rak-buku.svg', [
        rText(
          'Misi sampingan! Penjaga Bengkel CSS butuh bantuanmu menyusun tiga kotak warna di rak ajaib.',
          'Tantangan sampingan: atur tata letak elemen agar persis mencapai posisi target pada Playground Flexbox.',
        ),
      ]),
      conceptStep({
        title: t('Ingat Dua Tombol Pengatur', 'Sumbu Utama & Sumbu Silang'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a03', topic: 'flexbox-sim' },
        alt: t('Panah horizontal justify-content dan panah vertikal align-items.'),
        body: [
          rCode('justify-content'),
          rText(' menggeser kiri-kanan. '),
          rCode('align-items'),
          rText(' menggeser atas-bawah.'),
        ],
      }),
      limitStep({
        analogy: t('Rak buku di playground'),
        same: [t('Kotak langsung berpindah sesuai perintah perataan.')],
        different: [t('Di proyek nyata, ukuran kotak juga bergantung pada lebar layar perangkat. ')],
      }),
      simStep(
        'playground-flexbox',
        t(
          'Cobalah meletakkan kotak di tengah layar (center + center), lalu sebarkan rata (space-between)!',
          'Selesaikan berbagai skenario perataan pada Playground Flexbox.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a03-sq1-q1',
          prompt: t('Kombinasi mana yang menaruh satu tombol persis di tengah-tengah kotak (horizontal dan vertikal)?'),
          choices: [
            { id: 'cc', label: t('justify-content: center dan align-items: center') },
            { id: 'fs', label: t('justify-content: flex-start dan align-items: flex-end'), explainWrong: t('Itu menaruh tombol di pojok kiri bawah.') },
          ],
          answer: 'cc',
          explainCorrect: t('Tepat! center pada kedua sumbu langsung memusatkan isi.'),
          tags: ['flexbox'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-sq1-q2',
          type: 'limit',
          analogy: t('Rak buku playground'),
          prompt: t('Apa yang perlu dicek lagi jika hasil Flexbox sudah rapi di laptop tetapi berdesakan di HP?'),
          choices: [
            { id: 'wrap', label: t('Menambahkan flex-wrap: wrap atau mengubah arah menjadi column') },
            { id: 'del', label: t('Menghapus tag HTML-nya'), explainWrong: t('HTML tidak perlu dihapus.') },
          ],
          answer: 'wrap',
          explainCorrect: t('Benar! flex-wrap menjaga item turun ke baris baru bila ruang sempit.'),
          tags: ['flexbox'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a03-sq1-q3',
          prompt: t('Mengubah align-items dari flex-start ke center akan menggeser posisi vertikal item di baris Flexbox.'),
          answer: true,
          explainCorrect: t('Betul!'),
          explainWrong: t('align-items mengatur posisi pada sumbu silang (atas–bawah pada baris mendatar).'),
          tags: ['flexbox'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a03-sq1-q4',
          prompt: t('Kalau dua kartu menempel tanpa celah di dalam wadah flex, properti terbersih untuk memisahkannya adalah…'),
          choices: [
            { id: 'gap', label: t('gap: 16px;') },
            { id: 'bold', label: t('font-weight: bold;'), explainWrong: t('Itu hanya menebalkan teks.') },
          ],
          answer: 'gap',
          explainCorrect: t('Tepat! gap memberi jarak bersih antar anak flex.'),
          tags: ['flexbox'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a03-sq1-r1',
        prompt: t('Untuk memusatkan isi ke tengah kiri-kanan maupun atas-bawah dengan Flexbox, atur kedua properti ini ke…'),
        choices: [
          { id: 'c', label: t('center') },
          { id: 's', label: t('flex-start'), explainWrong: t('flex-start meletakkan isi di awal pojok.') },
        ],
        answer: 'c',
        explainCorrect: t('justify-content: center + align-items: center.'),
        tags: ['flexbox'],
      }),
      makeTf({
        id: 'a03-sq1-r2',
        prompt: t('Flexbox bisa diaktifkan dengan menaruh display: flex; pada wadah induknya.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('display: flex selalu dipasang pada elemen induk pembungkus.'),
        tags: ['flexbox'],
      }),
    ],
    recap: t(
      'Dengan justify-content, align-items, dan gap, kamu bisa menata deretan elemen dengan cepat!',
      'Menggabungkan justify-content, align-items, flex-wrap, dan gap menyelesaikan mayoritas kebutuhan tata letak satu arah.',
    ),
    companion: {
      talkPrompts: ['Posisi Flexbox mana yang paling sering kamu lihat di aplikasi HP?'],
      offlineActivity: 'Susun kartu mainan di meja membentuk baris space-between dan center.',
    },
  }),
];
