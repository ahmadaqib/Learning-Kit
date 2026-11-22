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
  id: 'a08',
  track: 'A',
  order: 8,
  title: 'Studio Warna & Huruf',
  tagline: t(
    'Memilih paduan warna yang serasi dan huruf yang enak dibaca.',
    'Menguasai roda warna, HSL, skema warna, aturan 60-30-10, kontras WCAG, kode HEX/RGB, dan tipografi.',
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
      'Halo! Ayo padukan warna serasi dan huruf nyaman dibaca di Studio Warna & Huruf!',
      'Uji kemampuanmu memilih palet warna, membaca HSL/HEX/RGB, menjaga kontras WCAG, dan menata tipografi.',
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
        prompt: t('Pada roda warna tradisional, tiga warna dasar yang tidak bisa dibuat dari campuran warna lain adalah…'),
        choices: [
          { id: 'pri', label: t('Merah, kuning, dan biru') },
          {
            id: 'sec',
            label: t('Hijau, jingga, dan ungu'),
            explainWrong: t('Hijau, jingga, dan ungu adalah warna sekunder hasil campuran.'),
          },
          {
            id: 'gray',
            label: t('Hitam, putih, dan abu-abu'),
            explainWrong: t('Itu warna netral, bukan tiga warna primer pada roda warna.'),
          },
        ],
        answer: 'pri',
        explainCorrect: t('Benar! Merah, kuning, dan biru adalah tiga warna primer pembentuk roda warna.'),
        tags: ['roda-warna'],
      }),
      makeAnchorMcq({
        id: 'a08-anc-j2',
        prompt: t('Pada aturan 60-30-10, bagian paling kecil sebesar 10% dipakai untuk…'),
        choices: [
          { id: 'acc', label: t('Warna aksen mencolok pada tombol utama dan sorotan penting') },
          {
            id: 'bg',
            label: t('Warna latar belakang seluruh halaman'),
            explainWrong: t('Latar belakang netral menempati porsi terbesar 60%.'),
          },
          {
            id: 'card',
            label: t('Warna semua tulisan biasa dan kotak kartu'),
            explainWrong: t('Teks dan kartu biasanya masuk ke porsi sekunder 30%.'),
          },
        ],
        answer: 'acc',
        explainCorrect: t('Tepat! Porsi 10% membuat tombol utama langsung menonjol tanpa membuat mata lelah.'),
        tags: ['aturan-60-30-10'],
      }),
      makeAnchorMcq({
        id: 'a08-anc-j3',
        prompt: t('Supaya teman yang buta warna tetap tahu arti pesan hijau (berhasil) atau merah (gagal), warna wajib ditemani…'),
        choices: [
          { id: 'ico', label: t('Ikon atau teks penjelasan') },
          {
            id: 'flash',
            label: t('Suara sirine keras terus-menerus'),
            explainWrong: t('Ikon dan tulisan jelas lebih nyaman bagi semua orang.'),
          },
          {
            id: 'none',
            label: t('Tidak perlu apa-apa, cukup kotak warna polos saja'),
            explainWrong: t('Mengandalkan warna saja menyulitkan pengguna dengan buta warna.'),
          },
        ],
        answer: 'ico',
        explainCorrect: t('Benar! Tanda centang ✓ atau tanda seru ! beserta teks memastikan pesan dimengerti semua orang.'),
        tags: ['warna-semantik'],
      }),
      makeAnchorMcq({
        id: 'a08-anc-j4',
        prompt: t('Jenis huruf tanpa kaki kecil di ujungnya yang bersih dan mudah dibaca di layar HP adalah…'),
        choices: [
          { id: 'sans', label: t('Sans-serif') },
          {
            id: 'disp',
            label: t('Display hias penuh lengkungan'),
            explainWrong: t('Huruf Display hanya untuk judul besar, bukan paragraf panjang.'),
          },
          {
            id: 'mono',
            label: t('Monospace berjarak kaku'),
            explainWrong: t('Monospace dipakai khusus untuk baris kode dan angka tabel.'),
          },
        ],
        answer: 'sans',
        explainCorrect: t('Tepat! Huruf sans-serif seperti Inter dan Roboto sangat jernih di layar digital.'),
        tags: ['tipografi'],
      }),
      makeAnchorMcq({
        id: 'a08-anc-j5',
        type: 'limit',
        analogy: t('Gelas sirup dan lampu ruangan untuk Hue, Saturation, Lightness'),
        prompt: t('Apa perbedaan mengatur warna di layar komputer dibanding mencampur gelas sirup asli?'),
        choices: [
          { id: 'num', label: t('Di komputer kita cukup menggeser angka persentase cahaya 0–100% tanpa menambah air fisik') },
          {
            id: 'hue',
            label: t('Jenis rasa sirup ibarat nama warnanya (Hue)'),
            explainWrong: t('Itu bagian persamaan dalam analogi HSL.'),
          },
          {
            id: 'sat',
            label: t('Kekentalan sirup mirip kepekatan warnanya (Saturation)'),
            explainWrong: t('Itu juga persamaan analoginya.'),
          },
        ],
        answer: 'num',
        explainCorrect: t('Benar! Di kode CSS, perubahan warna langsung terukur presisi dari 0% hingga 100%.'),
        tags: ['hsl'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a08-anc-p1',
        prompt: t('Skema warna yang memadukan dua warna saling berseberangan pada roda warna untuk menghasilkan kontras terkuat adalah…'),
        choices: [
          { id: 'comp', label: t('Komplementer') },
          {
            id: 'mono',
            label: t('Monokromatik'),
            explainWrong: t('Monokromatik memakai satu hue saja dengan variasi terang-gelap.'),
          },
          {
            id: 'ana',
            label: t('Analog'),
            explainWrong: t('Skema analog memadukan warna-warna yang saling bersebelahan.'),
          },
        ],
        answer: 'comp',
        explainCorrect: t('Tepat. Pasangan komplementer seperti biru dan jingga sangat efektif menonjolkan tombol CTA.'),
        tags: ['skema-warna'],
      }),
      makeAnchorMcq({
        id: 'a08-anc-p2',
        prompt: t('Standar aksesibilitas WCAG AA menetapkan rasio kontras minimal antara teks ukuran biasa dan latarnya sebesar…'),
        choices: [
          { id: 'c45', label: t('4,5 : 1') },
          {
            id: 'c15',
            label: t('1,5 : 1'),
            explainWrong: t('1,5 : 1 nyaris menyatu dengan latar dan gagal dibaca.'),
          },
          {
            id: 'c30',
            label: t('3 : 1 untuk semua teks sangat kecil'),
            explainWrong: t('3 : 1 hanya berlaku untuk teks berukuran besar, sedangkan teks biasa butuh minimal 4,5 : 1.'),
          },
        ],
        answer: 'c45',
        explainCorrect: t('Benar. Rasio minimal 4,5 : 1 (dan 3 : 1 untuk teks besar) menjamin keterbacaan bagi semua pengguna.'),
        tags: ['kontras'],
      }),
      makeAnchorMcq({
        id: 'a08-anc-p3',
        prompt: t('Format kode warna CSS mana yang paling memudahkan manusia menghasilkan versi lebih terang atau gelap hanya dengan mengubah satu angka?'),
        choices: [
          { id: 'hsl', label: t('HSL (cukup ubah nilai Lightness)') },
          {
            id: 'hex',
            label: t('HEX (#RRGGBB)'),
            explainWrong: t('Pada HEX, kamu harus menghitung ulang keenam digit heksadesimal untuk menggelapkan warna.'),
          },
          {
            id: 'rgb',
            label: t('RGB (harus menggeser ketiga angka R, G, B bersamaan)'),
            explainWrong: t('Menurunkan kecerahan di RGB menuntut penyesuaian proporsi tiga saluran sekaligus.'),
          },
        ],
        answer: 'hsl',
        explainCorrect: t('Tepat. Di HSL, mengubah nilai persentase ketiga (Lightness) langsung menghasilkan tint atau shade konsisten.'),
        tags: ['hsl', 'hex-rgb'],
      }),
      makeAnchorMcq({
        id: 'a08-anc-p4',
        prompt: t('Mengapa saat merancang Dark mode kita dianjurkan memakai abu sangat gelap (misal #121212) daripada hitam pekat #000000 dengan putih pekat #FFFFFF?'),
        choices: [
          { id: 'glare', label: t('Kontras ekstrem #000 dan #FFF terlalu silau dan melelahkan mata di ruangan redup') },
          {
            id: 'oled',
            label: t('Karena layar browser tidak mendukung kode #000000'),
            explainWrong: t('Browser mendukung #000000, tetapi kenyamanannya buruk jika dipadukan putih murni #FFF.'),
          },
          {
            id: 'wcag',
            label: t('Karena rasio hitam di atas putih hanya 1 : 1'),
            explainWrong: t('Hitam di atas putih justru rasio 21 : 1 yang terlalu menusuk bila dibalik di mode gelap.'),
          },
        ],
        answer: 'glare',
        explainCorrect: t('Benar! Abu sangat gelap dengan teks putih sedikit redup serta warna aksen agak kalem jauh lebih nyaman di mata.'),
        tags: ['aturan-60-30-10', 'kontras'],
      }),
      makeAnchorMcq({
        id: 'a08-anc-p5',
        prompt: t('Berapakah panjang baris paragraf yang paling ideal di layar agar mata tidak lelah dan bacaan tidak terasa terputus?'),
        choices: [
          { id: 'ch', label: t('45–75 karakter per baris (sekitar max-width: 65ch)') },
          {
            id: 'tiny',
            label: t('10–15 karakter per baris'),
            explainWrong: t('Terlalu pendek membuat mata melompat ganti baris terus-menerus.'),
          },
          {
            id: 'wide',
            label: t('180–220 karakter memenuhi seluruh lebar layar monitor'),
            explainWrong: t('Terlalu lebar membuat mata sering tersesat saat berpindah ke baris berikutnya.'),
          },
        ],
        answer: 'ch',
        explainCorrect: t('Tepat. Rentang 45–75 karakter menjaga ritme gerak mata saat membaca paragraf panjang.'),
        tags: ['tipografi', 'type-scale'],
      }),
      makeAnchorMcq({
        id: 'a08-anc-p6',
        type: 'limit',
        analogy: t('Mencampur cat kertas RYB vs cahaya piksel RGB di layar'),
        prompt: t('Perbedaan fisika utama antara warna cat di kanvas (RYB) dan warna di layar monitor (RGB) adalah…'),
        choices: [
          { id: 'light', label: t('Cat mencampur pigmen yang makin gelap bila ditumpuk, sedangkan layar memancarkan cahaya RGB yang menjadi putih saat maksimal') },
          {
            id: 'wheel',
            label: t('Keduanya sama-sama bisa disusun menjadi lingkaran keserasian warna'),
            explainWrong: t('Keserasiannya tetap dipelajari lewat roda warna, bedanya pada sifat pigmen vs cahaya.'),
          },
          {
            id: 'warm',
            label: t('Warna merah, jingga, dan kuning sama-sama memberi kesan hangat'),
            explainWrong: t('Kesan psikologis hangat-dingin tetap sama di kanvas maupun layar.'),
          },
        ],
        answer: 'light',
        explainCorrect: t('Benar! Roda RYB dipakai belajar harmoni, sementara layar digital merakit warna dari cahaya Merah, Hijau, Biru (RGB).'),
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
      'Aku bisa mengelompokkan warna primer, sekunder, tersier, serta warna hangat dan dingin.',
      'Aku bisa membaca roda warna 12 bagian (RYB), peran suhu warna, serta bedanya dengan cahaya layar RGB.',
    ),
    estMinutes: 5,
    introducesTerms: ['roda-warna'],
    usesTerms: ['ui', 'css'],
    warmupFrom: 'a07-l08',
    steps: [
      storyStep('a08/roda-cat.svg', [
        rText(
          'Di studio lukis Bu Laras, tiga cat utama—merah, kuning, biru—ditaruh melingkar di palet lalu dicampur memutar menjadi 12 warna serasi!',
          'Warna bukanlah soal tebak-tebakan selera semata. Di studio lukis, warna disusun melingkar membentuk roda warna 12 bagian agar mudah melihat mana yang serasi.',
        ),
      ]),
      conceptStep({
        title: t('Primer, Sekunder, dan Tersier', 'Tiga Lapisan Roda Warna'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'roda-warna-12' },
        alt: t('Roda warna 12 bagian berisi warna primer, sekunder, dan tersier.'),
        body: [
          rTerm('roda-warna', 'Roda warna', 'Roda warna'),
          rText(
            ' dimulai dari ',
            ' dimulai dari warna ',
          ),
          rBold('primer', 'primer'),
          rText(
            ' (merah, kuning, biru). Campurannya menghasilkan ',
            ' (merah, kuning, biru). Dua primer menghasilkan ',
          ),
          rBold('sekunder', 'sekunder'),
          rText(
            ' (jingga, hijau, ungu), lalu ',
            ' (jingga, hijau, ungu), dan tambahannya menjadi ',
          ),
          rBold('tersier', 'tersier'),
          rText(' seperti merah-jingga.', ' (misal merah-jingga).'),
        ],
      }),
      conceptStep({
        title: t('Warna Hangat dan Dingin', 'Suhu Warna: Hangat vs Dingin'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'hangat-vs-dingin' },
        alt: t('Merah-jingga-kuning di sisi hangat dan hijau-biru-ungu di sisi dingin.'),
        body: [
          rText(
            'Merah, jingga, dan kuning itu warna hangat: terasa dekat dan penuh semangat. Hijau, biru, dan ungu terasa tenang!',
            'Warna hangat (merah, jingga, kuning) terasa dekat dan menarik perhatian. Warna dingin (hijau, biru, ungu) terasa tenang, profesional, dan tepercaya.',
          ),
        ],
      }),
      conceptStep({
        title: t('Cat Kertas vs Cahaya Layar', 'Roda Cat RYB vs Cahaya Layar RGB'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'ryb-vs-rgb' },
        alt: t('Lingkaran RYB untuk belajar keserasian vs piksel cahaya RGB di layar.'),
        body: [
          rText(
            'Lingkaran merah-kuning-biru membantu kita belajar paduan serasi. Di dalam layar HP, warna dibuat dari cahaya merah, hijau, biru!',
            'Roda RYB dipakai untuk mempelajari harmoni visual. Secara fisik, layar digital membentuk jutaan warna dari tiga cahaya primer: Merah, Hijau, Biru (RGB).',
          ),
        ],
      }),
      limitStep({
        analogy: t('Palet cat lukis RYB untuk roda warna layar'),
        same: [
          t('Menunjukkan hubungan mana warna yang bertetangga lembut dan mana yang berseberangan kuat.'),
        ],
        different: [
          t('Mencampur semua cat pigmen menghasilkan warna gelap keruh, sedangkan menyalakan semua cahaya layar RGB maksimal justru menghasilkan cahaya putih terang!'),
        ],
      }),
      simStep(
        'roda-warna',
        t(
          'Lihat berbagai pilihan warna di roda warna lalu amati mana yang serasi dan mana yang mencolok!',
          'Eksplorasi kombinasi warna pada roda warna untuk membedakan paduan harmonis dan kontras.',
        ),
      ),
      qStep({
        id: 'a08-l01-q1',
        type: 'sort',
        prompt: t('Kelompokkan warna berikut ke golongan Primer atau Sekunder pada roda warna:'),
        difficulty: 1,
        items: [
          { id: 'm', label: t('Merah') },
          { id: 'h', label: t('Hijau') },
          { id: 'k', label: t('Kuning') },
          { id: 'u', label: t('Ungu') },
          { id: 'b', label: t('Biru') },
          { id: 'j', label: t('Jingga (Oranye)') },
        ],
        bins: [
          { id: 'pri', label: t('Warna Primer') },
          { id: 'sec', label: t('Warna Sekunder') },
        ],
        answer: { m: 'pri', k: 'pri', b: 'pri', h: 'sec', u: 'sec', j: 'sec' },
        explainCorrect: t('Hebat! Primer = merah, kuning, biru. Sekunder = jingga, hijau, ungu.'),
        tags: ['roda-warna'],
      }),
      qStep(
        makeMcq({
          id: 'a08-l01-q2',
          type: 'analogy',
          prompt: t('Jika kamu ingin memberi kesan tenang, aman, dan tepercaya untuk aplikasi bank atau sekolah, kelompok warna mana yang paling pas?'),
          choices: [
            { id: 'cold', label: t('Warna dingin seperti biru dan hijau') },
            {
              id: 'hot',
              label: t('Merah terang menyala di seluruh layar'),
              explainWrong: t('Merah terang memberi kesan mendesak atau peringatan bahaya.'),
            },
            {
              id: 'neon',
              label: t('Semua 12 warna sekaligus tanpa batas'),
              explainWrong: t('Terlalu banyak warna membuat mata lelah dan tidak fokus.'),
            },
          ],
          answer: 'cold',
          explainCorrect: t('Benar! Warna dingin seperti biru sering dipakai untuk rasa tenang dan dapat dipercaya.'),
          tags: ['roda-warna', 'ui'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a08-l01-q3',
          prompt: t('Warna tersier seperti "merah-jingga" dibuat dari campuran satu warna primer dengan satu warna sekunder di sebelahnya.'),
          answer: true,
          explainCorrect: t('Betul! Primer + sekunder tetangganya menghasilkan 6 warna tersier pada roda 12 bagian.'),
          explainWrong: t('Hampir! Gabungan satu warna primer dan satu sekunder tetangga membentuk warna tersier.'),
          tags: ['roda-warna'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l01-q4',
          type: 'limit',
          analogy: t('Palet cat lukis RYB'),
          prompt: t('Apa perbedaan nyata antara warna cat di atas kertas dan warna di layar HP?'),
          difficulty: 2,
          choices: [
            { id: 'rgb', label: t('Layar memancarkan cahaya Merah, Hijau, dan Biru (RGB), bukan cat RYB') },
            {
              id: 'warm',
              label: t('Kuning dan jingga tetap memberi kesan ceria serta hangat'),
              explainWrong: t('Kesan hangat memang sama antara cat dan layar.'),
            },
            {
              id: 'wheel',
              label: t('Kita tetap bisa mencari warna bersebelahan dan berseberangan'),
              explainWrong: t('Cara mencari pasangan harmonis di roda warna tetap berlaku.'),
            },
          ],
          answer: 'rgb',
          explainCorrect: t('Tepat! Roda RYB membantu belajar keserasian, sedangkan piksel layar bekerja memakai cahaya RGB.'),
          tags: ['roda-warna'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l01-q5',
          type: 'scenario',
          story: t('Dimas membuat banner promosi "DISKON KILAT HARI INI!" untuk tombol ajakan toko makanan yang ingin terasa energik dan langsung menarik mata.'),
          prompt: t('Suhu warna manakah yang paling mendukung kesan mendesak dan bersemangat?'),
          difficulty: 2,
          choices: [
            { id: 'warm', label: t('Warna hangat seperti jingga atau merah') },
            {
              id: 'pale',
              label: t('Abu-abu sangat pucat yang menyatu dengan latar'),
              explainWrong: t('Abu-abu pucat tidak menarik perhatian dan lemah kontrasnya.'),
            },
            {
              id: 'darkb',
              label: t('Biru sangat pudar yang tersembunyi'),
              explainWrong: t('Biru terasa tenang, kurang menonjolkan dorongan segera dibanding jingga/merah.'),
            },
          ],
          answer: 'warm',
          explainCorrect: t('Benar! Merah dan jingga hangat sering dipakai untuk tombol ajakan dan e-commerce.'),
          tags: ['roda-warna', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l01-q6',
          prompt: t('Berapakah jumlah bagian warna utama pada roda warna standar yang memadukan primer, sekunder, dan tersier?'),
          difficulty: 1,
          choices: [
            { id: '12', label: t('12 warna (3 primer, 3 sekunder, 6 tersier)') },
            {
              id: '2',
              label: t('2 warna saja'),
              explainWrong: t('Roda warna dasar memuat 12 titik campuran.'),
            },
            {
              id: '100',
              label: t('100 warna primer'),
              explainWrong: t('Warna primer hanya ada 3 buah.'),
            },
          ],
          answer: '12',
          explainCorrect: t('Tepat! 3 primer + 3 sekunder + 6 tersier membentuk roda warna 12 bagian.'),
          tags: ['roda-warna'],
        }),
      ),
      qStep({
        id: 'a08-l01-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi pasangan warna primer pembentuk cahaya layar digital:'),
        difficulty: 2,
        template: 'Layar komputer menyusun warna menggunakan campuran cahaya merah, ___, dan biru (RGB).',
        bank: ['hijau', 'kuning', 'ungu'],
        answer: ['hijau'],
        explainCorrect: t('Benar! RGB adalah singkatan dari Red (merah), Green (hijau), dan Blue (biru).'),
        tags: ['roda-warna', 'css'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a08-l01-r1',
        prompt: t('Tiga warna sekunder pada roda warna RYB adalah…'),
        choices: [
          { id: 's', label: t('Jingga, hijau, dan ungu') },
          { id: 'p', label: t('Merah, kuning, dan biru'), explainWrong: t('Merah, kuning, dan biru adalah tiga warna primer.') },
        ],
        answer: 's',
        explainCorrect: t('Campuran dua warna primer menghasilkan jingga, hijau, dan ungu.'),
        tags: ['roda-warna'],
      }),
      makeTf({
        id: 'a08-l01-r2',
        prompt: t('Warna hijau, biru, dan ungu termasuk kelompok warna dingin yang memberi kesan tenang dan dapat dipercaya.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('Hijau, biru, dan ungu berada pada sisi warna dingin di roda warna.'),
        tags: ['roda-warna'],
      }),
    ],
    recap: t(
      'Roda warna membagi 12 warna menjadi primer, sekunder, tersier, serta warna hangat dan dingin.',
      'Pahami roda warna 12 bagian (RYB) dan suhu warna hangat–dingin sebagai peta sebelum meracik palet digital RGB.',
    ),
    companion: {
      talkPrompts: ['Kalau kita ingin menggambar poster toko es krim ceria vs aplikasi bank yang tenang, warna hangat atau dingin yang cocok?'],
      offlineActivity: 'Gunakan pensil warna merah, kuning, dan biru untuk mencoba mencampur warna jingga, hijau, dan ungu di kertas.',
    },
  }),

  makeLesson({
    id: 'a08-l02',
    worldId: 'a08',
    title: 'Hue, saturation, lightness',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan jenis warna (Hue), kepekatan (Saturation), dan terang-gelapnya (Lightness).',
      'Aku bisa mengatur sifat warna HSL serta membuat skala tint, shade, dan tone dari satu warna dasar.',
    ),
    estMinutes: 5,
    introducesTerms: ['hsl'],
    usesTerms: ['ui', 'roda-warna'],
    stickerId: 'sirup-hsl',
    warmupFrom: 'a08-l01',
    steps: [
      storyStep('a08/sirup-hsl.svg', [
        rText(
          'Bayangkan membuat segelas sirup! Kamu pilih rasa stroberi atau melon, takar banyak sirup atau banyak air, lalu atur terang lampu ruangannya.',
          'Memahami satu warna digital paling mudah lewat segelas sirup: rasa sirup adalah jenis warnanya, kekentalan sirup adalah kepekatannya, dan lampu ruangan menentukan terang-gelapnya.',
        ),
      ]),
      conceptStep({
        title: t('Tiga Sifat Warna: H, S, L', 'Mengenal Hue, Saturation, Lightness'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'hsl-tiga-sifat' },
        alt: t('Pengatur HSL: Hue sudut warna 0-360, Saturation kepekatan 0-100%, Lightness terang 0-100%.'),
        body: [
          rTerm('hsl', 'HSL', 'HSL'),
          rText(
            ': Hue itu jenis warnanya. Saturation itu kepekatannya. Lightness itu terang atau gelapnya.',
            ' mengurai warna menjadi tiga angka: Hue (posisi sudut roda 0°–360°), Saturation (abu-abu 0% ke murni 100%), dan Lightness (hitam 0% ke putih 100%).',
          ),
        ],
      }),
      conceptStep({
        title: t('Muda, Tua, dan Kalem', 'Tint, Shade, dan Tone'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'tint-shade-tone' },
        alt: t('Tint campuran putih lebih muda, Shade campuran hitam lebih tegas, Tone campuran abu lebih kalem.'),
        body: [
          rText(
            'Tambah putih jadi ',
            'Dari satu warna lahir skala 50–900: ',
          ),
          rBold('Tint', 'Tint'),
          rText(
            ' (muda lembut). Tambah hitam jadi ',
            ' (+ putih, lembut), ',
          ),
          rBold('Shade', 'Shade'),
          rText(
            ' (tua tegas). Tambah abu jadi ',
            ' (+ hitam, tegas), dan ',
          ),
          rBold('Tone', 'Tone'),
          rText(' (kalem).', ' (+ abu-abu, kalem).'),
        ],
      }),
      conceptStep({
        title: t('Menulis HSL di CSS', 'Memakai hsl() untuk Varian Warna'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'kode-hsl-css' },
        alt: t('Contoh hsl(14, 77%, 54%) dengan angka terakhir diubah untuk versi terang dan gelap.'),
        code: {
          lang: 'css',
          code: '/* Ubah angka terakhir (Lightness) untuk membuat tint & shade */\nbackground: hsl(14, 77%, 54%);',
        },
        body: [
          rText(
            'Di ',
            'Format ',
          ),
          rCode('hsl(14, 77%, 54%)'),
          rText(
            ', angka terakhir mengatur terang-gelap dengan cepat!',
            ' paling ramah manusia: cukup naikkan atau turunkan angka ketiga (Lightness) untuk membuat varian hover atau latar lembut.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Gelas sirup dan lampu ruangan untuk HSL'),
        same: [
          t('Rasa (Hue), kekentalan (Saturation), dan terang lampu (Lightness) bisa diubah terpisah-pisah.'),
        ],
        different: [
          t('Sirup di gelas nyata akan luber kalau terus ditambah air, sedangkan angka Saturation dan Lightness di layar selalu terukur rapi antara 0% sampai 100%.'),
        ],
      }),
      simStep(
        'roda-warna',
        t(
          'Lihat pada skema Monokromatik: satu rasa warna sama diubah terang-gelapnya menjadi satu keluarga warna serasi!',
          'Amati variasi terang-gelap pada skema Monokromatik di simulator untuk melihat skala warna dari satu Hue.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a08-l02-q1',
          type: 'analogy',
          prompt: t('Pada perumpamaan segelas sirup HSL, banyak sedikitnya sirup dibanding air (dari pucat abu ke pekat murni) adalah…'),
          choices: [
            { id: 'sat', label: t('Saturation (kepekatan)') },
            {
              id: 'hue',
              label: t('Hue (rasa sirup)'),
              explainWrong: t('Hue adalah jenis warnanya seperti merah atau hijau.'),
            },
            {
              id: 'lit',
              label: t('Lightness (terang lampu)'),
              explainWrong: t('Lightness mengatur terang hingga gelap dari hitam ke putih.'),
            },
          ],
          answer: 'sat',
          explainCorrect: t('Benar! Saturation 0% menghasilkan abu-abu pudar, sedangkan 100% menghasilkan warna paling pekat.'),
          tags: ['hsl'],
        }),
      ),
      qStep({
        id: 'a08-l02-q2',
        type: 'match',
        prompt: t('Pasangkan istilah turunan warna berikut dengan campurannya:'),
        difficulty: 2,
        left: [
          { id: 'ti', label: t('Tint (lebih muda & lembut)') },
          { id: 'sh', label: t('Shade (lebih tua & tegas)') },
          { id: 'to', label: t('Tone (lebih kalem)') },
        ],
        right: [
          { id: 'w', label: t('Warna dasar + Putih') },
          { id: 'b', label: t('Warna dasar + Hitam') },
          { id: 'g', label: t('Warna dasar + Abu-abu') },
        ],
        answer: { ti: 'w', sh: 'b', to: 'g' },
        explainCorrect: t('Hebat! Dari satu warna utama kamu bisa menghasilkan satu keluarga skala 50 sampai 900.'),
        tags: ['hsl'],
      }),
      qStep(
        makeTf({
          id: 'a08-l02-q3',
          prompt: t('Dalam HSL, mengubah nilai Lightness menjadi 0% akan membuat warna apa pun tampak hitam.'),
          answer: true,
          explainCorrect: t('Betul! Lightness 0% berarti tanpa cahaya (hitam), sedangkan 100% berarti putih penuh.'),
          explainWrong: t('Hampir! Rentang Lightness dimulai dari 0% (hitam) menuju 100% (putih).'),
          tags: ['hsl'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l02-q4',
          type: 'limit',
          analogy: t('Gelas sirup dan lampu ruangan'),
          prompt: t('Apa perbedaan sifat antara menakar sirup nyata dengan mengatur HSL di layar komputer?'),
          difficulty: 2,
          choices: [
            { id: 'pct', label: t('HSL memakai ukuran pasti sudut 0–360° dan persentase 0–100% yang bisa diulang persis sama') },
            {
              id: 'rasa',
              label: t('Jenis warna tetap dibedakan layaknya memilih rasa sirup'),
              explainWrong: t('Ini persamaan antara analogi rasa dan Hue.'),
            },
            {
              id: 'gelap',
              label: t('Lampu redup membuat tampilan terlihat makin gelap'),
              explainWrong: t('Ini juga persamaan dengan Lightness.'),
            },
          ],
          answer: 'pct',
          explainCorrect: t('Tepat! Angka pasti pada HSL memudahkan tim desainer maupun programmer membuat skala warna yang konsisten.'),
          tags: ['hsl'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l02-q5',
          type: 'scenario',
          story: t('Nadia memakai warna tombol utama hsl(215, 80%, 50%). Ketika tombol diarahkan kursor (hover), ia ingin warnanya sedikit lebih gelap tetapi tetap warna biru yang sama.'),
          prompt: t('Bagian mana pada hsl(215, 80%, 50%) yang sebaiknya diturunkan?'),
          difficulty: 2,
          choices: [
            { id: 'lit', label: t('Angka ketiga (Lightness), misal dari 50% menjadi 40%') },
            {
              id: 'hue',
              label: t('Angka pertama (Hue), misal menjadi 0'),
              explainWrong: t('Mengubah Hue dari 215 ke 0 akan mengganti warnanya dari biru menjadi merah!'),
            },
            {
              id: 'up',
              label: t('Naikkan Lightness menjadi 98%'),
              explainWrong: t('98% akan membuat tombol menjadi hampir putih sangat pucat, bukan lebih gelap.'),
            },
          ],
          answer: 'lit',
          explainCorrect: t('Benar! Menurunkan Lightness dari 50% ke 40% membuat biru tampak lebih gelap tanpa mengubah Hue-nya.'),
          tags: ['hsl', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l02-q6',
          prompt: t('Dari angka-angka berikut, nilai sudut berapakah yang menjadi rentang lengkap properti Hue pada lingkaran roda warna HSL?'),
          difficulty: 1,
          choices: [
            { id: 'deg', label: t('0° sampai 360°') },
            {
              id: 'ten',
              label: t('1 sampai 10'),
              explainWrong: t('Roda warna berbentuk lingkaran penuh 360 derajat.'),
            },
            {
              id: 'neg',
              label: t('Hanya 0 atau 1 saja'),
              explainWrong: t('0 dan 1 adalah tipe boolean/alpha, bukan derajat roda warna.'),
            },
          ],
          answer: 'deg',
          explainCorrect: t('Tepat! Satu putaran lingkaran penuh roda warna membentang dari 0° hingga 360°.'),
          tags: ['hsl', 'roda-warna'],
        }),
      ),
      qStep({
        id: 'a08-l02-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi kalimat pembentukan keluarga skala warna:'),
        difficulty: 2,
        template: 'Mencampur suatu warna dengan warna hitam untuk menghasilkan versi lebih tua dan tegas disebut ___.',
        bank: ['shade', 'tint', 'tone'],
        answer: ['shade'],
        explainCorrect: t('Benar! Tint (+ putih), Shade (+ hitam), dan Tone (+ abu-abu).'),
        tags: ['hsl'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a08-l02-r1',
        prompt: t('Pada singkatan HSL, huruf "L" adalah kependekan dari…'),
        choices: [
          { id: 'l', label: t('Lightness (terang-gelap warna)') },
          { id: 'w', label: t('Length (panjang huruf)'), explainWrong: t('HSL terdiri dari Hue, Saturation, dan Lightness.') },
        ],
        answer: 'l',
        explainCorrect: t('Lightness mengatur kecerahan dari 0% hitam ke 100% putih.'),
        tags: ['hsl'],
      }),
      makeTf({
        id: 'a08-l02-r2',
        prompt: t('Menambahkan warna putih ke suatu warna dasar menghasilkan Tint yang lebih muda dan lembut.'),
        answer: true,
        explainCorrect: t('Betul! Tint sering dipakai untuk warna latar kartu lembut seperti biru muda (#EAF0FE).'),
        explainWrong: t('Warna dasar ditambah putih menghasilkan Tint.'),
        tags: ['hsl'],
      }),
    ],
    recap: t(
      'HSL membagi warna menjadi jenis (Hue), kepekatan (Saturation), dan terang-gelap (Lightness).',
      'Atur warna secara presisi lewat HSL serta ciptakan color scale menggunakan Tint (+putih), Shade (+hitam), dan Tone (+abu-abu).',
    ),
    companion: {
      talkPrompts: ['Kalau membuat sirup stroberi terlalu encer atau terlalu kental, itu mirip mengatur apa di HSL?'],
      offlineActivity: 'Amati warna kemeja atau cat dinding di ruangan saat lampu terang vs saat gorden ditutup (itulah perubahan Lightness!).',
    },
  }),

  makeLesson({
    id: 'a08-l03',
    worldId: 'a08',
    title: 'Skema warna',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa memilih resep skema warna yang serasi seperti monokromatik, analog, dan komplementer.',
      'Aku bisa membedakan skema monokromatik, analog, komplementer, split-komplementer, triadik, dan tetradik.',
    ),
    estMinutes: 5,
    introducesTerms: ['skema-warna'],
    usesTerms: ['ui', 'roda-warna', 'hsl'],
    warmupFrom: 'a08-l02',
    steps: [
      storyStep('a08/resep-seragam.svg', [
        rText(
          'Memilih warna website itu seperti memilih baju serasi dari lemari. Ada resep pasangan warna agar mata nyaman melihatnya!',
          'Seperti memadukan pakaian memakai rumus warna agar tidak saling bertabrakan, skema warna adalah resep memilih beberapa warna dari roda agar hasilnya harmonis.',
        ),
      ]),
      conceptStep({
        title: t('Satu Warna & Tetangga Dekat', 'Monokromatik & Analog'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'skema-mono-analog' },
        alt: t('Skema monokromatik biru tua sampai muda dan skema analog biru-toska-hijau.'),
        body: [
          rTerm('skema-warna', 'Skema warna', 'Skema warna'),
          rText(' ', ' '),
          rBold('Monokromatik', 'Monokromatik'),
          rText(
            ' memakai satu warna beda terang-gelap (paling aman). ',
            ' memakai satu hue beragam terang-gelap (paling rapi). ',
          ),
          rBold('Analog', 'Analog'),
          rText(' memadukan tetangga bersebelahan seperti alam.', ' memakai 2–3 warna bersebelahan (lembut harmonis).'),
        ],
      }),
      conceptStep({
        title: t('Berseberangan untuk Tombol Menonjol', 'Komplementer & Split-Komplementer'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'skema-komplementer' },
        alt: t('Biru berseberangan dengan jingga pada roda warna menghasilkan kontras tajam.'),
        body: [
          rBold('Komplementer', 'Komplementer'),
          rText(
            ' memilih dua warna berseberangan. Kontrasnya paling kuat untuk menonjolkan tombol!',
            ' memadukan 2 warna berseberangan (kontras terkuat untuk tombol). ',
          ),
          rBold('Split-komplementer', 'Split-komplementer'),
          rText(' memadukan dua tetangga seberangnya agar lembut.', ' memakai 1 warna plus 2 tetangga seberangnya agar lebih lembut.'),
        ],
      }),
      conceptStep({
        title: t('Tiga, Empat, dan Rumus Pemula', 'Triadik, Tetradik, & Rumus Aman'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'triadik-rumus-pemula' },
        alt: t('Tiga warna triadik ceria dan rumus praktis 1 utama + abu-abu + 1 aksen.'),
        body: [
          rBold('Triadik', 'Triadik'),
          rText(
            ' memakai 3 warna berjarak sama untuk kesan ceria. Resep pemula paling aman: 1 warna utama, abu-abu, dan 1 aksen!',
            ' memakai 3 warna segitiga (ceria untuk anak), sedangkan tetradik 4 warna paling sulit seimbang. Rumus aman: 1 utama + abu-abu + 1 aksen.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Resep memilih pasangan warna pakaian'),
        same: [
          t('Warna tetangga terasa tenang menyatu; warna berseberangan membuat satu hal langsung mencuri pandangan.'),
        ],
        different: [
          t('Pada skema komplementer di UI, kamu tidak boleh membagi biru 50% dan oranye 50% sama banyak—jadikan satu warna utama dan pasangannya cukup sedikit untuk tombol!'),
        ],
      }),
      simStep(
        'roda-warna',
        t(
          'Klik Monokromatik, Analog, lalu Komplementer di simulator roda warna dan perhatikan bedanya!',
          'Bandingkan palet Monokromatik, Analog, dan Komplementer langsung pada simulator Pembuat Skema Roda Warna.',
        ),
      ),
      qStep({
        id: 'a08-l03-q1',
        type: 'match',
        prompt: t('Pasangkan jenis skema warna dengan ciri khasnya di roda warna:'),
        difficulty: 2,
        left: [
          { id: 'mo', label: t('Monokromatik') },
          { id: 'an', label: t('Analog') },
          { id: 'co', label: t('Komplementer') },
          { id: 'tr', label: t('Triadik') },
        ],
        right: [
          { id: 'rmo', label: t('Satu hue dengan variasi terang dan gelap saja') },
          { id: 'ran', label: t('Dua hingga tiga warna yang bersebelahan di roda') },
          { id: 'rco', label: t('Dua warna yang saling berseberangan untuk kontras kuat') },
          { id: 'rtr', label: t('Tiga warna berjarak sama membentuk segitiga ceria') },
        ],
        answer: { mo: 'rmo', an: 'ran', co: 'rco', tr: 'rtr' },
        explainCorrect: t('Hebat! Kamu sudah menguasai empat skema warna yang paling sering dipakai desainer.'),
        tags: ['skema-warna'],
      }),
      qStep(
        makeMcq({
          id: 'a08-l03-q2',
          type: 'analogy',
          prompt: t('Jika halaman websitemu banyak memakai biru yang tenang lalu tombol "Beli" diberi warna jingga seberangnya agar langsung terlihat, skema apa itu?'),
          choices: [
            { id: 'co', label: t('Skema komplementer') },
            {
              id: 'mo',
              label: t('Skema monokromatik'),
              explainWrong: t('Monokromatik hanya memakai variasi warna biru saja tanpa jingga.'),
            },
            {
              id: 'an',
              label: t('Skema analog'),
              explainWrong: t('Biru dan jingga berseberangan di roda warna, bukan bersebelahan.'),
            },
          ],
          answer: 'co',
          explainCorrect: t('Tepat! Pasangan berseberangan seperti biru dan jingga menciptakan kontras tinggi untuk tombol ajakan.'),
          tags: ['skema-warna', 'ui'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a08-l03-q3',
          prompt: t('Skema tetradik (4 warna sekaligus) adalah skema paling mudah diseimbangkan untuk pemula.'),
          answer: false,
          explainCorrect: t('Benar, itu keliru! Tetradik paling sulit diseimbangkan; skema paling aman untuk pemula adalah monokromatik.'),
          explainWrong: t('Hampir! Semakin banyak warna berbeda dipakai bersamaan, semakin sulit menjaga keseimbangan mata.'),
          tags: ['skema-warna'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l03-q4',
          type: 'limit',
          analogy: t('Memadukan warna berseberangan'),
          prompt: t('Aturan apa yang wajib dijaga saat memakai skema komplementer (misal biru + jingga) agar layar tidak terasa menyilaukan mata?'),
          difficulty: 2,
          choices: [
            { id: 'dom', label: t('Jangan bagi 50%-50% merata; jadikan satu warna dominan atau netral dan pakai pasangannya sebagai aksen tombol') },
            {
              id: 'max',
              label: t('Taruh teks jingga menyala di atas latar biru menyala di seluruh paragraf'),
              explainWrong: t('Dua warna cerah bertabrakan penuh di teks panjang sangat melelahkan mata.'),
            },
            {
              id: 'gray',
              label: t('Dilarang memakai warna abu-abu atau putih sama sekali'),
              explainWrong: t('Warna netral putih dan abu-abu justru sangat dibutuhkan untuk meredam palet.'),
            },
          ],
          answer: 'dom',
          explainCorrect: t('Benar! Satu warna utama + latar netral + aksen komplementer kecil adalah resep yang jauh lebih nyaman.'),
          tags: ['skema-warna'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l03-q5',
          type: 'scenario',
          story: t('Bito diminta membuat situs belajar permainan anak SD yang suasananya ceria, penuh warna, namun tetap teratur dari 3 warna berjarak sama.'),
          prompt: t('Skema warna manakah yang paling cocok dicoba Bito?'),
          difficulty: 2,
          choices: [
            { id: 'tri', label: t('Skema Triadik') },
            {
              id: 'bw',
              label: t('Hitam pekat dan abu gelap semua'),
              explainWrong: t('Warna gelap seragam terkesan kaku dan kurang ceria untuk produk anak.'),
            },
            {
              id: 'ten',
              label: t('Sepuluh warna neon acak tanpa aturan'),
              explainWrong: t('Sepuluh warna acak membuat halaman berantakan.'),
            },
          ],
          answer: 'tri',
          explainCorrect: t('Tepat! Skema triadik memberi nuansa ceria dan berenergi yang cocok untuk aplikasi anak.'),
          tags: ['skema-warna'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l03-q6',
          prompt: t('Untuk pemula yang ingin paletnya langsung rapi di hampir semua produk digital, kombinasi paling praktis terdiri atas…'),
          difficulty: 1,
          choices: [
            { id: 'safe', label: t('1 warna utama + keluarga abu-abu netral + 1 warna aksen kontras') },
            {
              id: 'four',
              label: t('4 warna cerah sama besar tanpa warna abu-abu'),
              explainWrong: t('Tanpa abu-abu untuk teks dan latar, halaman terasa sangat ramai.'),
            },
            {
              id: 'rain',
              label: t('Seluruh 12 warna di roda warna dipakai menjadi latar kotak'),
              explainWrong: t('Terlalu banyak warna merusak hierarki visual.'),
            },
          ],
          answer: 'safe',
          explainCorrect: t('Benar! Tiga kelompok warna itu sudah cukup untuk membuat antarmuka yang rapi dan fokus.'),
          tags: ['skema-warna', 'ui'],
        }),
      ),
      qStep({
        id: 'a08-l03-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Apa nama skema warna yang hanya menggunakan satu hue tunggal dengan berbagai variasi terang-gelapnya?'),
        difficulty: 1,
        accept: ['monokromatik', 'monochromatic'],
        explainCorrect: t('Tepat! Skema monokromatik paling aman dan rapi bagi pemula.'),
        tags: ['skema-warna'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a08-l03-r1',
        prompt: t('Skema warna yang memadukan dua atau tiga warna yang bersebelahan pada roda warna seperti biru–toska–hijau disebut…'),
        choices: [
          { id: 'an', label: t('Analog') },
          { id: 'co', label: t('Komplementer'), explainWrong: t('Komplementer adalah dua warna yang berseberangan.') },
        ],
        answer: 'an',
        explainCorrect: t('Skema analog menghasilkan suasana lembut dan harmonis seperti warna alam.'),
        tags: ['skema-warna'],
      }),
      makeTf({
        id: 'a08-l03-r2',
        prompt: t('Split-komplementer memadukan satu warna utama dengan dua warna tetangga dari seberangnya sehingga kontrasnya tetap kuat namun lebih lembut.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('Split-komplementer memberi variasi kontras tanpa terasa terlalu keras.'),
        tags: ['skema-warna'],
      }),
    ],
    recap: t(
      'Pilih skema monokromatik untuk rapi aman, analog untuk lembut, atau komplementer agar tombol menonjol.',
      'Gunakan skema monokromatik, analog, komplementer, split-komplementer, atau triadik bersama rumus 1 utama + abu-abu + 1 aksen.',
    ),
    companion: {
      talkPrompts: ['Lihat daun hijau dan langit biru-toska di luar rumah: warna yang berdekatan itu contoh skema Analog!'],
      offlineActivity: 'Buka lemari pakaian dan coba pasangkan satu set baju memakai pola Monokromatik (biru muda + biru tua) lalu bandingkan dengan Komplementer.',
    },
  }),

  makeLesson({
    id: 'a08-l04',
    worldId: 'a08',
    title: 'Aturan 60-30-10',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membagi takaran warna halaman menjadi 60% dominan, 30% sekunder, dan 10% aksen.',
      'Aku bisa menyusun struktur palet produk (Primary, Accent, Neutral, Semantic) dan merancang Dark mode yang nyaman.',
    ),
    estMinutes: 5,
    introducesTerms: ['aturan-60-30-10'],
    usesTerms: ['ui', 'roda-warna', 'skema-warna'],
    warmupFrom: 'a08-l03',
    steps: [
      storyStep('a08/berpakaian-60-30-10.svg', [
        rText(
          'Saat berpakaian rapi: kemeja dan celana netral paling banyak (60%), jaket (30%), lalu satu syal mencolok (10%). Kalau semuanya menyala terang, mata langsung capek!',
          'Seperti berpakaian dengan setelan netral 60%, jaket 30%, dan satu aksesori mencolok 10%, takaran warna yang seimbang mencegah layar terasa ramai dan melelahkan mata.',
        ),
      ]),
      conceptStep({
        title: t('Resep Takaran 60 – 30 – 10', 'Aturan 60-30-10'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'diagram-60-30-10' },
        alt: t('Batang proporsi 60% warna latar netral, 30% kartu dan teks, 10% tombol aksen.'),
        body: [
          rTerm('aturan-60-30-10', 'Aturan 60-30-10', 'Aturan 60-30-10'),
          rText(
            ': 60% warna latar netral. 30% warna kartu, header, dan teks. 10% warna mencolok khusus tombol penting!',
            ' membagi tampilan: 60% dominan (umumnya latar netral), 30% sekunder (teks, kartu, header), dan 10% aksen (tombol aksi utama).',
          ),
        ],
      }),
      conceptStep({
        title: t('Susunan Palet Aplikasi Lengkap', 'Empat Bagian Palet Produk'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'empat-kelompok-palet' },
        alt: t('Empat kelompok palet: Primary, Accent, Neutral abu-abu, dan Semantic.'),
        body: [
          rText(
            'Aplikasi butuh empat kelompok warna. Warna merek, sorotan tombol, abu netral, dan status.',
            'Hampir semua sistem desain membagi palet menjadi 4 kelompok: Primary (merek), Accent (sorotan), Neutral (skala abu-abu teks/latar), dan Semantic (status).',
          ),
        ],
      }),
      conceptStep({
        title: t('Aturan Aman Mode Gelap', 'Light Mode vs Dark Mode'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'dark-mode-nyaman' },
        alt: t('Dark mode memakai abu sangat gelap #121212 bukan hitam pekat #000000 dengan putih redup.'),
        body: [
          rText(
            'Mode gelap bukan sekadar membalik putih jadi hitam pekat! Pakai abu sangat gelap agar mata tidak silau.',
            'Dark mode nyaman di tempat redup dan hemat baterai OLED, tapi hindari #000 murni dengan #FFF murni karena silau. Gunakan abu gelap (#121212) dan aksen agak kalem.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Berpakaian 60% dasar, 30% jaket, 10% aksesori'),
        same: [
          t('Menjaga warna mencolok hanya di bagian kecil supaya menjadi pusat perhatian tanpa membuat mata lelah.'),
        ],
        different: [
          t('Dalam aplikasi nyata, porsi 60% dan 30% juga diisi bermacam tingkat warna netral (putih, abu muda, abu gelap) serta warna status khusus saat sukses atau error.'),
        ],
      }),
      simStep(
        'roda-warna',
        t(
          'Lihat palet di simulator: warna paling gelap dan terang jadi ruang netral, warna cerah dipakai hemat untuk tombol!',
          'Amati perbandingan warna dominan lembut dan aksen kuat pada simulator Roda Warna.',
        ),
      ),
      qStep({
        id: 'a08-l04-q1',
        type: 'match',
        prompt: t('Pasangkan takaran aturan 60-30-10 dengan perannya pada halaman web:'),
        difficulty: 1,
        left: [
          { id: 'p60', label: t('60% Dominan') },
          { id: 'p30', label: t('30% Sekunder') },
          { id: 'p10', label: t('10% Aksen') },
        ],
        right: [
          { id: 'r60', label: t('Latar belakang netral yang lapang dan tenang') },
          { id: 'r30', label: t('Kartu, header, garis pembatas, dan teks') },
          { id: 'r10', label: t('Tombol utama "Beli" dan sorotan terpenting') },
        ],
        answer: { p60: 'r60', p30: 'r30', p10: 'r10' },
        explainCorrect: t('Mantap! Proporsi 60-30-10 langsung memberi keseimbangan warna yang profesional.'),
        tags: ['aturan-60-30-10'],
      }),
      qStep(
        makeMcq({
          id: 'a08-l04-q2',
          type: 'analogy',
          prompt: t('Jika sebuah halaman memakai warna latar oranye menyala 60%, tombol biru neon 30%, dan teks kuning terang 10%, kesalahan apa yang terjadi seperti cara berpakaian?'),
          choices: [
            { id: 'loud', label: t('Semuanya mencolok sekaligus sehingga ramai dan melelahkan mata') },
            {
              id: 'calm',
              label: t('Terlalu netral sehingga tidak ada tombol yang bisa diklik'),
              explainWrong: t('Justru warnanya terlalu mencolok dan saling berebut perhatian.'),
            },
            {
              id: 'dark',
              label: t('Halaman menjadi mode gelap OLED hemat baterai'),
              explainWrong: t('Warna cerah menyala memenuhi layar bukanlah dark mode.'),
            },
          ],
          answer: 'loud',
          explainCorrect: t('Benar! Latar dominan 60% sebaiknya netral agar warna aksen 10% benar-benar bersinar.'),
          tags: ['aturan-60-30-10'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a08-l04-q3',
          prompt: t('Membuat Dark mode terbaik dilakukan dengan memakai hitam pekat murni #000000 dan teks putih paling terang #FFFFFF di seluruh layar.'),
          answer: false,
          explainCorrect: t('Betul, itu keliru! Hitam pekat dan putih pekat terlalu kontras menyilaukan mata; lebih nyaman memakai abu sangat gelap seperti #121212 dan putih agak diredupkan.'),
          explainWrong: t('Hampir! Dark mode bukan sekadar membalik #FFF menjadi #000.'),
          tags: ['aturan-60-30-10', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l04-q4',
          type: 'limit',
          analogy: t('Berpakaian dengan aturan 60-30-10'),
          prompt: t('Apa tambahan yang dibutuhkan saat menyusun palet aplikasi web nyata dibanding memilih baju harian?'),
          difficulty: 2,
          choices: [
            { id: 'pal', label: t('Aplikasi juga butuh deretan warna Neutral abu-abu serta warna Semantic untuk pesan sukses, error, dan peringatan') },
            {
              id: 'ten',
              label: t('Aksen mencolok tetap dijaga sekitar 10% agar menonjol'),
              explainWrong: t('Itu memang persamaan yang tetap dipakai.'),
            },
            {
              id: 'bal',
              label: t('Warna latar utama tetap mendominasi ruang terbesar'),
              explainWrong: t('Ini juga persamaan keduanya.'),
            },
          ],
          answer: 'pal',
          explainCorrect: t('Tepat! Skala abu-abu netral dan warna status semantik melengkapi aturan 60-30-10 di produk digital.'),
          tags: ['aturan-60-30-10'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l04-q5',
          type: 'scenario',
          story: t('Di aplikasi belajar Pak Udin, seluruh latar halaman diberi warna biru terang mencolok sehingga tombol aksi "Mulai Kuis" yang juga biru terang tenggelam tak terlihat.'),
          prompt: t('Perbaikan terbaik memakai aturan 60-30-10 adalah…'),
          difficulty: 2,
          choices: [
            { id: 'fix', label: t('Jadikan latar 60% warna netral terang (putih/abu sangat muda), 30% biru gelap/abu untuk kartu & teks, dan 10% warna aksen cerah hanya untuk tombol utama') },
            {
              id: 'same',
              label: t('Ganti semua teks menjadi warna biru terang juga'),
              explainWrong: t('Teks biru terang di latar biru terang tidak akan terbaca sama sekali.'),
            },
            {
              id: 'more',
              label: t('Tambahkan latar kuning terang di separuh bagian lain'),
              explainWrong: t('Menambah warna cerah di area dominan makin membingungkan fokus.'),
            },
          ],
          answer: 'fix',
          explainCorrect: t('Benar! Begitu latar 60% dibuat netral tenang, tombol aksen 10% langsung terlihat jelas.'),
          tags: ['aturan-60-30-10', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l04-q6',
          prompt: t('Di layar ponsel OLED, selain nyaman di ruangan redup, apa keuntungan lain penggunaan Dark mode yang dirancang dengan baik?'),
          difficulty: 2,
          choices: [
            { id: 'bat', label: t('Menghemat pemakaian baterai pada layar OLED') },
            {
              id: 'wifi',
              label: t('Menggandakan kecepatan internet Wi-Fi secara otomatis'),
              explainWrong: t('Dark mode memengaruhi tampilan dan konsumsi daya piksel layar, bukan kecepatan Wi-Fi.'),
            },
            {
              id: 'html',
              label: t('Menghapus kebutuhan kode HTML di browser'),
              explainWrong: t('Struktur HTML tetap sama di light mode maupun dark mode.'),
            },
          ],
          answer: 'bat',
          explainCorrect: t('Tepat! Piksel gelap di panel OLED menyedot daya jauh lebih sedikit dibanding layar putih terang.'),
          tags: ['ui'],
        }),
      ),
      qStep({
        id: 'a08-l04-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi empat kelompok struktur palet sistem desain:'),
        difficulty: 2,
        template: 'Palet produk umumnya terbagi atas Primary, Accent, ___, dan Semantic.',
        bank: ['Neutral', 'Random', 'Viewport'],
        answer: ['Neutral'],
        explainCorrect: t('Benar! Keluarga warna Neutral (skala abu-abu) menopang teks, garis pemisah, dan latar halaman.'),
        tags: ['aturan-60-30-10'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a08-l04-r1',
        prompt: t('Dalam aturan 60-30-10, bagian 60% paling besar sebaiknya diisi dengan warna…'),
        choices: [
          { id: 'neu', label: t('Warna latar yang tenang dan netral') },
          { id: 'neon', label: t('Warna aksen menyala paling mencolok'), explainWrong: t('Warna aksen mencolok cukup 10% saja agar tidak melelahkan mata.') },
        ],
        answer: 'neu',
        explainCorrect: t('Latar netral 60% memberi ruang lapang agar konten dan tombol aksen terbaca nyaman.'),
        tags: ['aturan-60-30-10'],
      }),
      makeTf({
        id: 'a08-l04-r2',
        prompt: t('Pada Dark mode, warna mencolok sebaiknya sedikit diturunkan kepekatannya agar tidak menyilaukan mata di atas latar gelap.'),
        answer: true,
        explainCorrect: t('Betul! Warna jenuh penuh bisa terasa berpendar terlalu silau di atas abu gelap.'),
        explainWrong: t('Menurunkan sedikit kepekatan aksen membuat dark mode jauh lebih lembut dan elegan.'),
        tags: ['aturan-60-30-10'],
      }),
    ],
    recap: t(
      'Pakai takaran 60% latar netral, 30% kartu/teks, dan 10% aksen tombol supaya tampilan seimbang.',
      'Terapkan proporsi 60-30-10, lengkapi 4 laci palet (Primary, Accent, Neutral, Semantic), dan jaga kenyamanan Dark mode tanpa #000/#FFF ekstrem.',
    ),
    companion: {
      talkPrompts: ['Lihat pakaian yang kita pakai hari ini: warna apa yang paling banyak (60%) dan apa yang jadi aksen kecilnya (10%)?'],
      offlineActivity: 'Buka satu aplikasi rapi di HP dan perkirakan persentase warna latarnya, warna kartunya, dan warna tombol utamanya.',
    },
  }),

  makeLesson({
    id: 'a08-l05',
    worldId: 'a08',
    title: 'Arti warna dan warna semantik',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku mengerti arti warna pesan seperti hijau berhasil atau merah bahaya, serta wajib disertai ikon atau teks.',
      'Aku bisa memilih psikologi warna merek dan menerapkan warna semantik yang aksesibel bersama ikon serta konteks budaya.',
    ),
    estMinutes: 5,
    introducesTerms: ['warna-semantik'],
    usesTerms: ['ui', 'ux', 'skema-warna'],
    warmupFrom: 'a08-l04',
    steps: [
      storyStep('a08/lampu-lalu-lintas.svg', [
        rText(
          'Lampu lalu lintas memakai warna hijau untuk jalan dan merah untuk berhenti agar pengemudi langsung mengerti pesannya dalam sekejap!',
          'Seperti lampu lalu lintas yang memberi sinyal seketika tanpa paragraf panjang, warna pada UI membawa makna psikologis dan status tetap bagi pengguna.',
        ),
      ]),
      conceptStep({
        title: t('Kesan dan Arti Warna', 'Psikologi Warna Merek'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'psikologi-warna' },
        alt: t('Biru untuk kepercayaan, hijau alami aman, merah berani mendesak, ungu kreatif.'),
        body: [
          rText(
            'Biru terasa tenang dan dipercaya. Hijau terasa aman dan alami. Merah terasa mendesak. Ungu terasa kreatif.',
            'Warna membawa kesan umum: Biru (tepercaya: bank/teknologi), Hijau (alami/sukses), Merah (mendesak/bahaya), Jingga (ramah/e-commerce), Ungu (kreatif/mewah), Hitam (premium).',
          ),
        ],
      }),
      conceptStep({
        title: t('Empat Warna Status: Semantik', 'Warna Semantik Tetap'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'empat-warna-semantik' },
        alt: t('Hijau Success, Merah Error, Kuning Warning, dan Biru Info.'),
        body: [
          rTerm('warna-semantik', 'Warna semantik', 'Warna semantik'),
          rText(
            ' punya arti tetap. Hijau berhasil, kuning hati-hati, merah gagal, dan biru info.',
            ' punya makna tetap di antarmuka: Success (hijau: berhasil), Error/Danger (merah: gagal/bahaya), Warning (kuning/jingga: hati-hati), Info (biru: keterangan).',
          ),
        ],
      }),
      conceptStep({
        title: t('Jangan Andalkan Warna Saja!', 'Aksesibilitas & Budaya Warna'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'warna-plus-ikon-buta-warna' },
        alt: t('Kotak pesan disertai ikon centang dan teks jelas, bukan warna saja.'),
        body: [
          rText(
            'Sebagian orang buta warna! Selalu tambahkan ikon dan tulisan agar semua orang paham. Ingat juga arti warna bisa beda antarbudaya.',
            'Jangan pernah mengandalkan warna saja karena penyandang buta warna tidak bisa membedakannya—selalu sertakan ikon dan teks. Perhatikan pula perbedaan makna warna antarbudaya.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Lampu lalu lintas untuk warna semantik'),
        same: [
          t('Warna hijau, kuning, dan merah langsung menyampaikan arti aman, hati-hati, dan berhenti/bahaya.'),
        ],
        different: [
          t('Pengendara yang buta warna masih terbantu POSISI lampu atas-tengah-bawah yang selalu tetap, sedangkan pesan di web wajib disertai IKON dan TEKS yang jelas!'),
        ],
      }),
      simStep(
        'detektif-kontras',
        t(
          'Lihat pada simulator tanda centang ✓ dan silang ✗ yang menemani status warna supaya jelas bagi siapa saja!',
          'Amati bagaimana tanda ✓ dan ✗ bersama teks mendampingi indikator warna pada simulator Detektif Kontras.',
        ),
      ),
      qStep({
        id: 'a08-l05-q1',
        type: 'match',
        prompt: t('Pasangkan warna semantik dengan arti statusnya di aplikasi:'),
        difficulty: 1,
        left: [
          { id: 'ok', label: t('Hijau (Success)') },
          { id: 'err', label: t('Merah (Error / Danger)') },
          { id: 'wrn', label: t('Kuning / Oranye (Warning)') },
          { id: 'inf', label: t('Biru (Info)') },
        ],
        right: [
          { id: 'rok', label: t('Pesanan atau simpan data berhasil ✓') },
          { id: 'rerr', label: t('Gagal atau aksi berbahaya hapus data ✕') },
          { id: 'rwrn', label: t('Peringatan untuk berhati-hati !') },
          { id: 'rinf', label: t('Pesan keterangan netral ℹ') },
        ],
        answer: { ok: 'rok', err: 'rerr', wrn: 'rwrn', inf: 'rinf' },
        explainCorrect: t('Hebat! Keempat warna status ini menjadi bahasa universal di hampir semua aplikasi.'),
        tags: ['warna-semantik'],
      }),
      qStep(
        makeMcq({
          id: 'a08-l05-q2',
          type: 'analogy',
          prompt: t('Jika sebuah kotak formulir yang salah ketik hanya mengubah garis tepinya menjadi merah tanpa ikon dan tanpa tulisan error, apa masalahnya?'),
          choices: [
            { id: 'cb', label: t('Pengguna buta warna merah-hijau tidak tahu bagian mana yang salah dan bagaimana memperbaikinya') },
            {
              id: 'fast',
              label: t('Halaman menjadi lebih cepat mengirim pesan ke server'),
              explainWrong: t('Garis merah polos justru menyulitkan pemulihan kesalahan.'),
            },
            {
              id: 'pretty',
              label: t('Tampilan menjadi terlalu banyak kata'),
              explainWrong: t('Pesan singkat dan ikon justru membantu kejelasan, bukan mengganggu.'),
            },
          ],
          answer: 'cb',
          explainCorrect: t('Benar! Warna semantik wajib ditemani ikon dan teks singkat agar aksesibel bagi semua.'),
          tags: ['warna-semantik', 'ux'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a08-l05-q3',
          prompt: t('Makna setiap warna selalu sama persis di seluruh budaya dan negara di dunia tanpa pengecualian.'),
          answer: false,
          explainCorrect: t('Betul, pernyataan itu salah! Misalnya putih melambangkan kesucian di banyak tempat, namun dipakai berkabung di sebagian budaya.'),
          explainWrong: t('Hampir! Selalu pertimbangkan siapa pengguna dan konteks budayanya.'),
          tags: ['warna-semantik'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l05-q4',
          type: 'limit',
          analogy: t('Lampu lalu lintas'),
          prompt: t('Mengapa aturan "warna saja sudah cukup" pada aplikasi digital BERBEDA dengan lampu lalu lintas?'),
          difficulty: 2,
          choices: [
            { id: 'pos', label: t('Lampu lalu lintas punya urutan posisi tetap atas-bawah, sedangkan di layar pesan error harus ditemani ikon dan teks') },
            {
              id: 'mean',
              label: t('Hijau sering dipakai tanda aman sedangkan merah tanda berhenti atau bahaya'),
              explainWrong: t('Itu kesamaan antara lampu lalu lintas dan warna semantik UI.'),
            },
            {
              id: 'fast',
              label: t('Warna membantu pengguna menangkap status dengan cepat'),
              explainWrong: t('Ini juga kesamaannya.'),
            },
          ],
          answer: 'pos',
          explainCorrect: t('Tepat! Tanpa ikon atau teks, pengguna buta warna tidak memiliki petunjuk pengganti di formulir web.'),
          tags: ['warna-semantik'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l05-q5',
          type: 'scenario',
          story: t('Rani sedang merancang aplikasi dompet tabungan sekolah. Ia bingung memilih antara warna utama merah menyala atau biru tenang, lalu ia juga ingin menandai tombol "Bayar Berhasil" berwarna merah supaya serasi.'),
          prompt: t('Saran paling tepat untuk Rani adalah…'),
          difficulty: 3,
          choices: [
            { id: 'fix', label: t('Pakai biru untuk kesan aman tepercaya pada aplikasi tabungan, dan tetap gunakan hijau + ikon ✓ untuk status berhasil') },
            {
              id: 'red',
              label: t('Pakai merah untuk pesan "Berhasil" supaya seragam dengan merah'),
              explainWrong: t('Memakai merah untuk pesan sukses bertentangan dengan kebiasaan warna semantik dan membingungkan pengguna!'),
            },
            {
              id: 'none',
              label: t('Hilangkan semua ikon centang agar lebih polos'),
              explainWrong: t('Menghilangkan ikon merugikan pengguna buta warna.'),
            },
          ],
          answer: 'fix',
          explainCorrect: t('Benar! Jangan pernah menukar arti warna semantik—merah untuk bahaya/gagal, hijau + ikon untuk sukses.'),
          tags: ['warna-semantik', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l05-q6',
          prompt: t('Kesan psikologis apakah yang umumnya dibawa warna Ungu ketika dipakai pada identitas visual produk?'),
          difficulty: 2,
          choices: [
            { id: 'cre', label: t('Mewah, kreatif, dan imajinatif') },
            {
              id: 'err',
              label: t('Kesalahan sistem kritis atau tanda dilarang masuk'),
              explainWrong: t('Kesalahan dan larangan identik dengan warna merah.'),
            },
            {
              id: 'agr',
              label: t('Kesegaran sayur organik di kebun'),
              explainWrong: t('Alami dan segar identik dengan warna hijau.'),
            },
          ],
          answer: 'cre',
          explainCorrect: t('Tepat! Ungu sering dipilih untuk produk kreatif, desain, atau kecantikan.'),
          tags: ['ui'],
        }),
      ),
      qStep({
        id: 'a08-l05-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi aturan aksesibilitas warna semantik:'),
        difficulty: 1,
        template: 'Jangan pernah mengandalkan warna saja untuk status; selalu sertakan ___ atau teks penjelasan.',
        bank: ['ikon', 'animasi', 'garis putus'],
        answer: ['ikon'],
        explainCorrect: t('Benar! Ikon dan teks membuat indikator status tetap jelas terbaca bahkan dalam tampilan hitam-putih.'),
        tags: ['warna-semantik', 'ux'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a08-l05-r1',
        prompt: t('Warna semantik yang dipakai untuk peringatan "hati-hati" (Warning) biasanya adalah…'),
        choices: [
          { id: 'y', label: t('Kuning atau oranye disertai ikon !') },
          { id: 'g', label: t('Hijau muda'), explainWrong: t('Hijau dipakai untuk status sukses (Success).') },
        ],
        answer: 'y',
        explainCorrect: t('Kuning atau oranye menandakan peringatan hati-hati.'),
        tags: ['warna-semantik'],
      }),
      makeTf({
        id: 'a08-l05-r2',
        prompt: t('Warna hijau saja tanpa teks atau ikon centang sudah cukup jelas bagi seluruh pengguna termasuk penyandang buta warna.'),
        answer: false,
        explainCorrect: t('Betul, itu salah! Wajib tambahkan ikon dan teks agar dapat dipahami oleh penyandang buta warna.'),
        explainWrong: t('Hampir! Sebagian orang mengalami buta warna merah-hijau.'),
        tags: ['warna-semantik'],
      }),
    ],
    recap: t(
      'Warna semantik (hijau berhasil, merah gagal, kuning hati-hati, biru info) wajib selalu ditemani ikon dan teks.',
      'Pilih warna merek sesuai psikologi audiens serta budaya, dan padukan warna semantik dengan ikon serta teks agar aksesibel.',
    ),
    companion: {
      talkPrompts: ['Kalau warna merah dan hijau di lampu jalan tertukar di tempat yang sama, apakah orang buta warna masih bisa membedakannya?'],
      offlineActivity: 'Cari 3 tombol atau pesan status di aplikasi HP dan cek apakah warna merah/hijaunya sudah ditemani ikon tanda seru atau centang.',
    },
  }),

  makeLesson({
    id: 'a08-l06',
    worldId: 'a08',
    title: 'Kontras agar terbaca',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan tulisan yang mudah dibaca dan yang terlalu pudar di atas latarnya.',
      'Aku bisa menerapkan standar rasio kontras WCAG (4,5:1 teks normal dan 3:1 teks besar) serta memeriksanya dengan alat uji.',
    ),
    estMinutes: 5,
    introducesTerms: ['kontras'],
    usesTerms: ['ui', 'ux', 'warna-semantik'],
    warmupFrom: 'a08-l05',
    steps: [
      storyStep('a08/kapur-papan.svg', [
        rText(
          'Menulis dengan kapur putih di papan tulis hitam sangat jelas dilihat dari bangku belakang. Tapi menulis dengan kapur kuning pucat di kertas putih nyaris tak terlihat!',
          'Sebagaimana kapur putih di papan hitam mudah dibaca dari jauh dibanding kapur kuning di kertas putih, kontras warna menentukan apakah teks di layarmu terbaca atau menyiksa mata.',
        ),
      ]),
      conceptStep({
        title: t('Beda Terang dan Gelap: Kontras', 'Apa Itu Rasio Kontras?'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'rasio-kontras-wcag' },
        alt: t('Perbandingan rasio kontras buruk 1.3:1 vs kontras baik 6:1 dan 15:1.'),
        body: [
          rTerm('kontras', 'Kontras', 'Kontras'),
          rText(
            ' mengukur seberapa beda warna huruf dan latarnya. Makin besar bedanya, makin jelas terbaca.',
            ' mengukur perbedaan kecerahan teks terhadap latarnya dari 1:1 (sama persis) hingga 21:1 (hitam di atas putih).',
          ),
        ],
      }),
      conceptStep({
        title: t('Angka Patokan Aman: 4,5 : 1', 'Standar WCAG: 4,5 : 1 dan 3 : 1'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'standar-wcag-aa' },
        alt: t('Standar WCAG minimal 4,5:1 untuk teks biasa dan 3:1 untuk teks besar.'),
        body: [
          rText(
            'Aturan aman: beda warna teks dan latarnya minimal 4,5 banding 1!',
            'Standar aksesibilitas WCAG AA menetapkan rasio kontras minimal 4,5 : 1 untuk teks ukuran biasa dan 3 : 1 untuk teks besar.',
          ),
        ],
      }),
      conceptStep({
        title: t('Jangan Tebak dengan Mata Saja', 'Menguji Kontras Sebelum Rilis'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'alat-cek-kontras' },
        alt: t('Pemeriksa kontras DevTools dan WebAIM Contrast Checker untuk mengecek rasio teks.'),
        body: [
          rText(
            'Selalu periksa warna tulisan dengan alat cek kontras. Jangan pakai tulisan putih di latar kuning cerah!',
            'Gunakan alat pemeriksa seperti WebAIM Contrast Checker atau DevTools browser untuk memastikan teks aman dibaca di luar ruangan sekalipun.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Kapur di papan tulis untuk rasio kontras'),
        same: [
          t('Tulisan dan papan belakangnya butuh perbedaan terang–gelap yang tegas supaya terbaca jelas.'),
        ],
        different: [
          t('Di layar HP, kita memakai angka hitung pasti (4,5 : 1) karena layar bisa meredup di bawah terik matahari dan dilihat oleh pengguna dengan mata lelah maupun rabun.'),
        ],
      }),
      simStep(
        'detektif-kontras',
        t(
          'Klik ketiga kartu "Teks Contoh" pada simulator Detektif Kontras dan temukan mana yang lolos 4,5:1!',
          'Uji ketiga pasangan warna teks dan latar pada simulator Detektif Kontras untuk menemukan mana yang lolos WCAG AA.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a08-l06-q1',
          type: 'analogy',
          prompt: t('Menulis teks warna kuning cerah di atas tombol berwarna putih bersih mirip dengan…'),
          choices: [
            { id: 'bad', label: t('Kapur kuning muda di kertas putih yang hampir menghilang saat dilihat') },
            {
              id: 'good',
              label: t('Kapur putih di atas papan tulis hitam yang tajam'),
              explainWrong: t('Kapur putih di papan hitam justru kontrasnya sangat tinggi (21:1).'),
            },
            {
              id: 'bold',
              label: t('Spidol hitam pekat di atas kertas putih bersih'),
              explainWrong: t('Hitam di atas putih sangat mudah dibaca.'),
            },
          ],
          answer: 'bad',
          explainCorrect: t('Benar! Kuning cerah dan putih sama-sama sangat terang, sehingga rasionya rendah dan gagal terbaca.'),
          tags: ['kontras'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a08-l06-q2',
          prompt: t('Rasio kontras 1 : 1 berarti warna teks dan warna latar persis sama sehingga tulisan tidak terlihat sama sekali.'),
          answer: true,
          explainCorrect: t('Betul! 1 : 1 adalah tidak ada perbedaan sama sekali, sedangkan 21 : 1 adalah hitam di atas putih.'),
          explainWrong: t('Hampir! Rasio kontras berjalan mulai dari 1 : 1 (identik) hingga 21 : 1 (maksimal).'),
          tags: ['kontras'],
        }),
      ),
      qStep({
        id: 'a08-l06-q3',
        type: 'sort',
        prompt: t('Kelompokkan pasangan teks dan latar berikut ke "Jelas Terbaca (Lolos)" atau "Terlalu Pudar (Gagal)":'),
        difficulty: 2,
        items: [
          { id: 'c1', label: t('Teks putih (#FFFFFF) di atas latar biru gelap (#1F2340)') },
          { id: 'c2', label: t('Teks abu muda di atas latar abu pucat') },
          { id: 'c3', label: t('Teks biru tua di atas latar putih bersih') },
          { id: 'c4', label: t('Teks putih di atas latar kuning cerah') },
        ],
        bins: [
          { id: 'pass', label: t('Lolos Kontras ✓') },
          { id: 'fail', label: t('Gagal Pudar ✗') },
        ],
        answer: { c1: 'pass', c2: 'fail', c3: 'pass', c4: 'fail' },
        explainCorrect: t('Hebat! Matamu sudah jeli membedakan pasangan terang–gelap yang aman dan yang pudar.'),
        tags: ['kontras', 'ui'],
      }),
      qStep(
        makeMcq({
          id: 'a08-l06-q4',
          type: 'limit',
          analogy: t('Membaca papan tulis di ruang kelas'),
          prompt: t('Mengapa mengira-ngira keterbacaan di laptop dalam kamar gelap saja sering menipu dibanding memakai penguji rasio WCAG?'),
          difficulty: 2,
          choices: [
            { id: 'sun', label: t('Di bawah matahari luar ruangan atau bagi pengguna berpenglihatan rendah, teks agak pudar langsung hilang jika di bawah 4,5:1') },
            {
              id: 'diff',
              label: t('Perbedaan terang dan gelap membantu mata membaca lebih cepat'),
              explainWrong: t('Itu memang persamaan dasar di kelas maupun di layar.'),
            },
            {
              id: 'big',
              label: t('Tulisan yang terlalu kecil sulit dibaca dari jarak jauh'),
              explainWrong: t('Itu juga persamaan di dunia nyata dan layar.'),
            },
          ],
          answer: 'sun',
          explainCorrect: t('Tepat! Standar angka 4,5 : 1 melindungi pembacaan di berbagai kondisi pencahayaan dan penglihatan.'),
          tags: ['kontras', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l06-q5',
          type: 'scenario',
          story: t('Sari membuat tombol "Daftar Sekarang" berwarna oranye terang (#FFB400) dengan tulisan putih (#FFFFFF). Saat dicek dengan Contrast Checker, rasionya hanya 1,8 : 1.'),
          prompt: t('Perubahan tercepat agar tombol tetap bernuansa hangat tetapi lolos standar 4,5 : 1 adalah…'),
          difficulty: 2,
          choices: [
            { id: 'dark', label: t('Ubah tulisan tombol menjadi gelap pekat (#1F2340) atau gelapkan warna latar oranyenya menjadi cokelat-oranye tua') },
            {
              id: 'thin',
              label: t('Kecilkan ukuran tulisan menjadi 9px tipis'),
              explainWrong: t('Mengecilkan huruf pada kontras 1,8 : 1 justru membuatnya makin tak terbaca!'),
            },
            {
              id: 'same',
              label: t('Biarkan saja karena warna kuning oranye sedang tren'),
              explainWrong: t('Tren visual tidak boleh mengorbankan keterbacaan tombol utama.'),
            },
          ],
          answer: 'dark',
          explainCorrect: t('Benar! Teks gelap di atas kuning/oranye terang langsung menaikkan kontras secara drastis.'),
          tags: ['kontras', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l06-q6',
          prompt: t('Berapa rasio kontras minimal WCAG AA untuk teks berukuran biasa vs teks berukuran besar?'),
          difficulty: 2,
          choices: [
            { id: 'w', label: t('Minimal 4,5 : 1 untuk teks biasa dan 3 : 1 untuk teks besar') },
            {
              id: 'w2',
              label: t('Minimal 1,2 : 1 untuk teks biasa dan 21 : 1 untuk teks besar'),
              explainWrong: t('1,2 : 1 sangat pudar dan tidak lolos standar aksesibilitas apa pun.'),
            },
            {
              id: 'w3',
              label: t('Cukup 1 : 1 asalkan hurufnya ditebalkan'),
              explainWrong: t('1 : 1 berarti tulisan sama persis warnanya dengan latar.'),
            },
          ],
          answer: 'w',
          explainCorrect: t('Tepat! 4,5 : 1 adalah angka patokan emas untuk teks normal dan 3 : 1 untuk judul besar.'),
          tags: ['kontras'],
        }),
      ),
      qStep({
        id: 'a08-l06-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Apa nama standar aksesibilitas web internasional yang menetapkan batas minimal kontras 4,5 : 1? (tulis 4 huruf singkatannya)'),
        difficulty: 2,
        accept: ['wcag', 'wcag aa'],
        explainCorrect: t('Benar! WCAG (Web Content Accessibility Guidelines) menjadi acuan global aksesibilitas web.'),
        tags: ['kontras'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a08-l06-r1',
        prompt: t('Berapa rasio kontras maksimal (hitam di atas putih bersih)?'),
        choices: [
          { id: '21', label: t('21 : 1') },
          { id: '1', label: t('1 : 1'), explainWrong: t('1 : 1 adalah saat warna teks dan latar sama persis.') },
        ],
        answer: '21',
        explainCorrect: t('Rentang rasio kontras berjalan dari 1 : 1 hingga 21 : 1.'),
        tags: ['kontras'],
      }),
      makeTf({
        id: 'a08-l06-r2',
        prompt: t('Untuk teks ukuran biasa, standar WCAG menetapkan rasio kontras minimal 4,5 : 1.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('4,5 : 1 adalah batas minimal agar teks normal terbaca nyaman.'),
        tags: ['kontras'],
      }),
    ],
    recap: t(
      'Pastikan beda terang-gelap teks dan latar selalu tajam (minimal 4,5 : 1) dan cek dengan alat kontras.',
      'Jaga rasio kontras WCAG minimal 4,5:1 (teks biasa) dan 3:1 (teks besar), serta verifikasi lewat DevTools atau Contrast Checker.',
    ),
    companion: {
      talkPrompts: ['Pernahkah melihat tulisan di poster atau HP yang warnanya hampir sama dengan latar sehingga susah dibaca?'],
      offlineActivity: 'Tulis kalimat dengan pensil kuning di kertas putih, lalu dengan spidol hitam di kertas putih. Bandingkan mana yang terbaca dari seberang ruangan!',
    },
  }),

  makeLesson({
    id: 'a08-l07',
    worldId: 'a08',
    title: 'Menulis warna dalam kode',
    modes: ['pro'],
    objective: t('Aku bisa membaca dan menulis warna digital dalam format HEX, RGB, RGBA, serta HSL di CSS.'),
    estMinutes: 5,
    introducesTerms: ['hex-rgb'],
    usesTerms: ['ui', 'css', 'hsl', 'kontras'],
    warmupFrom: 'a08-l06',
    steps: [
      storyStep('a08/mesin-cat.svg', [
        rText('Di toko cat modern, kamu tidak bilang "minta warna biru agak ceria dikit". Mesin pencampur memakai resep angka pasti per tetes pigmen agar warnanya persis sama di toko mana pun!'),
      ]),
      conceptStep({
        title: t('HEX & RGB'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'format-hex-dan-rgb' },
        alt: t('Anatomi kode HEX #E4572E (R=E4, G=57, B=2E) dan rgb(228, 87, 46).'),
        code: {
          lang: 'css',
          code: 'color: #E4572E;          /* Merah=E4, Hijau=57, Biru=2E */\ncolor: rgb(228, 87, 46); /* Tiap saluran 0–255 */',
        },
        body: [
          rTerm('hex-rgb', 'HEX & RGB'),
          rText(' sama-sama menakar kadar Merah, Hijau, Biru. '),
          rBold('HEX'),
          rText(' paling umum dipakai (6 digit: 2 merah, 2 hijau, 2 biru). '),
          rBold('RGB'),
          rText(' memakai angka desimal 0–255 per saluran.'),
        ],
      }),
      conceptStep({
        title: t('RGBA (Transparansi) & HSL'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'format-rgba-dan-hsl' },
        alt: t('Contoh rgba(228, 87, 46, 0.5) dengan alpha 0.5 dan hsl(14, 77%, 54%).'),
        code: {
          lang: 'css',
          code: 'background: rgba(228, 87, 46, 0.5); /* Alpha 0–1 */\nbackground: hsl(14, 77%, 54%);      /* Hue, Sat, Light */',
        },
        body: [
          rBold('RGBA'),
          rText(' menambahkan alpha (tingkat tembus pandang 0 sampai 1). Sementara '),
          rTerm('hsl', 'HSL'),
          rText(' paling mudah dibaca manusia saat ingin membuat versi warna lebih terang atau lebih gelap.'),
        ],
      }),
      conceptStep({
        title: t('Memilih Format yang Tepat'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'kapan-hex-rgba-hsl' },
        alt: t('Panduan memilih HEX untuk palet statis, RGBA untuk overlay transparan, HSL untuk varian dinamis.'),
        body: [
          rText('Gunakan '),
          rBold('HEX'),
          rText(' saat menyalin kode palet ringkas dari Figma/design system, '),
          rBold('RGBA'),
          rText(' atau alpha untuk bayangan dan overlay semi-transparan, serta '),
          rBold('HSL'),
          rText(' saat menyusun skala terang-gelap warna secara terstruktur.'),
        ],
      }),
      limitStep({
        analogy: t('Resep tetes cat di mesin pencampur'),
        same: [
          t('Memakai angka terukur untuk menjamin warna yang sama persis dapat direproduksi ulang.'),
        ],
        different: [
          t('Cat fisik bekerja secara subtraktif (campur semua warna menjadi gelap), sedangkan rgb(255, 255, 255) di layar adalah aditif cahaya yang menghasilkan warna putih penuh!'),
        ],
      }),
      simStep(
        'detektif-kontras',
        t('Amati kode HEX yang dipakai tiap kartu pada simulator Detektif Kontras.'),
      ),
      qStep({
        id: 'a08-l07-q1',
        type: 'match',
        prompt: t('Pasangkan contoh kode warna CSS dengan jenis format dan fungsinya:'),
        difficulty: 2,
        left: [
          { id: 'hx', label: t('#E4572E') },
          { id: 'rg', label: t('rgb(228, 87, 46)') },
          { id: 'ra', label: t('rgba(228, 87, 46, 0.5)') },
          { id: 'hs', label: t('hsl(14, 77%, 54%)') },
        ],
        right: [
          { id: 'rhx', label: t('HEX — 6 digit paling ringkas dan umum dipakai') },
          { id: 'rrg', label: t('RGB — kadar merah, hijau, biru masing-masing 0–255') },
          { id: 'rra', label: t('RGBA — RGB ditambah tingkat transparansi alpha 0–1') },
          { id: 'rhs', label: t('HSL — paling mudah digeser terang-gelapnya oleh manusia') },
        ],
        answer: { hx: 'rhx', rg: 'rrg', ra: 'rra', hs: 'rhs' },
        explainCorrect: t('Mantap! Keempat format ini sangat sering ditemui di Figma dan file CSS.'),
        tags: ['hex-rgb', 'hsl'],
      }),
      qStep({
        id: 'a08-l07-q2',
        type: 'spotbug',
        prompt: t('Ketuk baris kode warna CSS yang memiliki nilai saluran warna TIDAK valid:'),
        difficulty: 2,
        lines: [
          '.kartu { color: #1F2340; }',
          '.overlay { background: rgba(0, 0, 0, 0.6); }',
          '.tombol { background: rgb(350, 90, 40); }',
        ],
        answer: [3],
        explainCorrect: t('Jeli! Baris 3 menulis 350 pada saluran Merah, padahal rentang nilai setiap saluran RGB hanya 0 sampai 255.'),
        tags: ['hex-rgb', 'css'],
      }),
      qStep(
        makeMcq({
          id: 'a08-l07-q3',
          type: 'limit',
          analogy: t('Mesin pencampur cat fisik vs RGB layar'),
          prompt: t('Jika kamu menulis rgb(255, 255, 255) di CSS, warna apakah yang muncul di layar?'),
          difficulty: 2,
          choices: [
            { id: 'wht', label: t('Putih terang — berbeda dari pigmen cat yang justru menjadi gelap bila dicampur semua') },
            {
              id: 'blk',
              label: t('Hitam pekat karena semua warna bercampur'),
              explainWrong: t('Hitam di layar adalah rgb(0, 0, 0) saat semua cahaya dimatikan.'),
            },
            {
              id: 'red',
              label: t('Merah menyala saja'),
              explainWrong: t('Merah menyala adalah rgb(255, 0, 0).'),
            },
          ],
          answer: 'wht',
          explainCorrect: t('Benar! RGB adalah model cahaya aditif: saat merah, hijau, dan biru menyala maksimal (255), hasilnya putih.'),
          tags: ['hex-rgb'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l07-q4',
          type: 'scenario',
          story: t('Dimas ingin membuat lapisan latar di belakang jendela modal agar tampak setengah transparan (50% tembus pandang) di atas halaman utama.'),
          prompt: t('Kode warna manakah yang paling tepat untuk lapisan overlay tersebut?'),
          difficulty: 2,
          choices: [
            { id: 'rgba', label: t('rgba(31, 35, 64, 0.5)') },
            {
              id: 'rgb',
              label: t('rgb(31, 35, 64)'),
              explainWrong: t('rgb tanpa saluran alpha tampil padat 100%, tidak tembus pandang.'),
            },
            {
              id: 'a5',
              label: t('rgba(31, 35, 64, 255)'),
              explainWrong: t('Nilai alpha pada rgba hanya berada di rentang 0 hingga 1, jadi 50% adalah 0.5.'),
            },
          ],
          answer: 'rgba',
          explainCorrect: t('Tepat! Saluran keempat (0.5) pada rgba mengatur kepekatan 50% sehingga isi di belakang masih membayang.'),
          tags: ['hex-rgb', 'css'],
        }),
      ),
      qStep({
        id: 'a08-l07-q5',
        type: 'fill',
        prompt: t('Lengkapi bagian nilai warna pada kode HEX #E4572E:'),
        difficulty: 2,
        template: 'Pada kode HEX #E4572E, dua digit E4 mewakili merah, 57 mewakili ___, dan 2E mewakili biru.',
        bank: ['hijau', 'kuning', 'hitam'],
        answer: ['hijau'],
        explainCorrect: t('Benar! Urutan dua-dua digit HEX selalu R (merah), G (hijau), B (biru).'),
        tags: ['hex-rgb'],
      }),
      qStep({
        id: 'a08-l07-q6',
        type: 'type',
        prompt: t('Berapakah angka maksimal tiap saluran Merah, Hijau, atau Biru dalam format rgb(r, g, b)?'),
        difficulty: 1,
        accept: ['255'],
        explainCorrect: t('Tepat! Rentang setiap saluran warna di RGB adalah 0 hingga 255.'),
        tags: ['hex-rgb'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a08-l07-r1',
        prompt: t('Pada rgba(0, 0, 0, 0.2), angka 0.2 di paling belakang menunjukkan nilai…'),
        choices: [
          { id: 'al', label: t('Alpha (tingkat tembus pandang 0–1)') },
          { id: 'hue', label: t('Sudut warna merah'), explainWrong: t('Angka keempat di rgba adalah alpha untuk transparansi.') },
        ],
        answer: 'al',
        explainCorrect: t('Alpha 0 berarti bening tak terlihat, 1 berarti pekat penuh.'),
        tags: ['hex-rgb'],
      }),
      makeTf({
        id: 'a08-l07-r2',
        prompt: t('Kode warna #E4572E terdiri atas enam digit: dua untuk merah, dua untuk hijau, dan dua untuk biru.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('Format HEX #RRGGBB membagi pasangan digitnya sesuai urutan R, G, B.'),
        tags: ['hex-rgb'],
      }),
    ],
    recap: t('Pahami cara membaca #RRGGBB pada HEX, 0–255 pada RGB, transparansi alpha pada RGBA, serta kemudahan modifikasi lewat HSL.'),
  }),

  makeLesson({
    id: 'a08-l08',
    worldId: 'a08',
    title: 'Jenis huruf dan cara menatanya',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa memilih jenis huruf yang tepat dan menata jarak baris supaya bacaan nyaman di mata.',
      'Aku bisa membedakan 4 keluarga huruf, menerapkan aturan keterbacaan paragraf (16px, line-height, 45–75ch), dan memasangkan huruf.',
    ),
    estMinutes: 5,
    introducesTerms: ['tipografi'],
    usesTerms: ['ui', 'ux', 'hierarki', 'kontras'],
    warmupFrom: 'a08-l07',
    steps: [
      storyStep('a08/buku-nyaman.svg', [
        rText(
          'Tulisan buku yang barisnya mepet dan hurufnya penuh lekuk hias bikin mata cepat pusing. Kalau ukuran pas dan barisnya lega, membaca terasa ringan!',
          'Sebagian besar isi website adalah teks. Seperti halaman buku yang barisnya lega jauh lebih nikmat dibaca daripada cetakan rapat sesak, menata huruf berarti membereskan separuh desain.',
        ),
      ]),
      conceptStep({
        title: t('Empat Keluarga Huruf', 'Jenis-Jenis Huruf'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'empat-jenis-huruf' },
        alt: t('Contoh Serif berkaki, Sans-serif bersih, Monospace sama lebar, dan Display hias.'),
        body: [
          rTerm('tipografi', 'Tipografi', 'Tipografi'),
          rText(' punya 4 huruf. ', ' membagi 4 jenis: '),
          rBold('Serif', 'Serif'),
          rText(' klasik. ', ' (berkaki klasik), '),
          rBold('Sans-serif', 'Sans-serif'),
          rText(' bersih. ', ' (bersih di layar), '),
          rBold('Monospace', 'Monospace'),
          rText(' buat kode. ', ' (lebar sama untuk kode), dan '),
          rBold('Display', 'Display'),
          rText(' buat judul.', ' (judul besar saja).'),
        ],
      }),
      conceptStep({
        title: t('Aturan Nyaman Membaca', 'Pegangan Ukuran, Baris, dan Panjang'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'aturan-baca-nyaman' },
        alt: t('Teks minimal 16px, jarak baris 1.5-1.7, dan panjang 45-75 karakter.'),
        body: [
          rText(
            'Teks isi minimal 16px. Beri jarak baris 1,5×. Jangan kepanjangan. Ratakan kiri paragraf!',
            'Jaga teks isi ≥ 16px (1rem), line-height 1,5–1,7 (paragraf) atau 1,1–1,3 (judul), panjang 45–75 karakter, rata kiri, dan warna abu sangat gelap.',
          ),
        ],
      }),
      conceptStep({
        title: t('Jangan Pakai Banyak Jenis Huruf', 'Memasangkan Huruf dengan Aman'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'memasangkan-huruf' },
        alt: t('Maksimal 2 keluarga huruf: satu keluarga saja atau judul Serif dengan isi Sans-serif.'),
        body: [
          rText(
            'Maksimal 2 jenis huruf dalam satu web! Paling aman pakai 1 jenis saja, bedakan tebal dan besarnya.',
            'Batasi maksimal 2 keluarga huruf: pakai 1 keluarga saja (bedakan ketebalan Bold/Regular), atau padukan judul Serif/Display dengan isi Sans-serif bersih.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Cetakan buku kertas untuk tipografi layar'),
        same: [
          t('Ukuran huruf cukup besar, jarak antarbaris lega, dan panjang baris sedang sama-sama menjaga mata tidak lelah.'),
        ],
        different: [
          t('Di buku cetak, paragraf sering memakai rata kanan-kiri (justify) dan huruf Serif; di layar web, rata kiri lebih aman agar spasi tidak bolong dan file font (woff2) perlu dijaga ringan!'),
        ],
      }),
      simStep(
        'detektif-kontras',
        t(
          'Lihat tulisan pada simulator: warna gelap lembut dan ukuran huruf jelas membuat kalimat terbaca seketika!',
          'Amati bagaimana kombinasi kontras tinggi dan warna abu gelap nyaman dibaca tanpa membuat mata silau.',
        ),
      ),
      qStep({
        id: 'a08-l08-q1',
        type: 'match',
        prompt: t('Pasangkan keempat jenis huruf dengan kegunaan terbaiknya di website:'),
        difficulty: 2,
        left: [
          { id: 'se', label: t('Serif (punya kaki kecil di ujung)') },
          { id: 'sa', label: t('Sans-serif (tanpa kaki, bersih)') },
          { id: 'mo', label: t('Monospace (semua huruf sama lebar)') },
          { id: 'di', label: t('Display (huruf hias penuh karakter)') },
        ],
        right: [
          { id: 'rse', label: t('Kesan klasik, resmi, cocok untuk judul atau majalah') },
          { id: 'rsa', label: t('Teks paragraf dan antarmuka layar agar mudah dibaca') },
          { id: 'rmo', label: t('Potongan kode program dan angka sejajar pada tabel') },
          { id: 'rdi', label: t('Hanya untuk judul besar atau poster, bukan paragraf panjang') },
        ],
        answer: { se: 'rse', sa: 'rsa', mo: 'rmo', di: 'rdi' },
        explainCorrect: t('Keren! Memilih keluarga huruf yang pas langsung menentukan suasana dan kenyamanan web.'),
        tags: ['tipografi'],
      }),
      qStep(
        makeMcq({
          id: 'a08-l08-q2',
          type: 'analogy',
          prompt: t('Mengapa memasang huruf Display yang meliuk-liuk pada seluruh paragraf cerita panjang 500 kata adalah kesalahan besar?'),
          choices: [
            { id: 'hard', label: t('Mata cepat lelah karena bentuk hiasannya rumit bila dibaca terus-menerus') },
            {
              id: 'size',
              label: t('Huruf Display dilarang dipakai untuk judul besar poster'),
              explainWrong: t('Huruf Display justru paling pas untuk judul besar yang singkat.'),
            },
            {
              id: 'css',
              label: t('Browser hanya bisa menampilkan huruf Display dengan warna merah'),
              explainWrong: t('Semua jenis huruf bisa diberi warna apa saja.'),
            },
          ],
          answer: 'hard',
          explainCorrect: t('Benar! Huruf hias Display cukup untuk judul besar; serahkan paragraf panjang kepada Sans-serif yang bersih.'),
          tags: ['tipografi', 'ux'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a08-l08-q3',
          prompt: t('Menggunakan lima jenis huruf berbeda-beda di satu halaman web membuat tampilan terlihat lebih rapi dan terpercaya.'),
          answer: false,
          explainCorrect: t('Betul, itu salah! Maksimal 2 keluarga huruf saja; terlalu banyak jenis huruf tampak berantakan.'),
          explainWrong: t('Hampir! Batasi maksimal 1 sampai 2 keluarga huruf agar halaman tetap konsisten.'),
          tags: ['tipografi', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l08-q4',
          type: 'limit',
          analogy: t('Tata letak buku dan majalah kertas'),
          prompt: t('Mengapa aturan rata kanan-kiri (justify) dari buku cetak sebaiknya dihindari pada paragraf website di layar sempit?'),
          difficulty: 2,
          choices: [
            { id: 'gap', label: t('Rata kanan-kiri di layar sempit sering menimbulkan spasi bolong-bolong yang memutus aliran baca; rata kiri lebih nyaman') },
            {
              id: 'lh',
              label: t('Jarak antarbaris tetap perlu lega sekitar 1,5 kali ukuran huruf'),
              explainWrong: t('Kebutuhan jarak baris yang lega sama-sama berlaku di buku maupun di web.'),
            },
            {
              id: 'dark',
              label: t('Huruf gelap di latar terang tetap lebih mudah dibaca'),
              explainWrong: t('Ini juga kesamaan prinsip keterbacaan.'),
            },
          ],
          answer: 'gap',
          explainCorrect: t('Tepat! Rata kiri membuat jarak antar kata selalu seragam dan alami di layar HP maupun laptop.'),
          tags: ['tipografi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l08-q5',
          type: 'scenario',
          story: t('Pada blog catatan harian Raka, teks artikelnya memakai ukuran 12px dengan line-height: 1.0, warna hitam pekat #000, dan membentang penuh 140 karakter selebar layar monitor.'),
          prompt: t('Paket perbaikan tipografi yang paling tepat untuk artikel Raka adalah…'),
          difficulty: 3,
          choices: [
            { id: 'fix', label: t('Ubah ukuran isi minimal 16px, line-height 1.5–1.7, pakai abu sangat gelap, dan batasi lebar baris 45–75 karakter') },
            {
              id: 'disp',
              label: t('Ganti semua huruf artikel menjadi jenis huruf Display berkaki melingkar'),
              explainWrong: t('Huruf hias Display di paragraf panjang justru makin melelahkan mata.'),
            },
            {
              id: 'tight',
              label: t('Turunkan line-height menjadi 0.8 agar lebih banyak kalimat muat satu layar'),
              explainWrong: t('Jarak baris yang terlalu rapat membuat pembaca sering salah pindah baris.'),
            },
          ],
          answer: 'fix',
          explainCorrect: t('Benar! Ukuran 16px, line-height 1,6, warna abu gelap lembut, dan lebar 65ch langsung membuat blog Raka nyaman dibaca.'),
          tags: ['tipografi', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l08-q6',
          prompt: t('Berapakah batas maksimal jumlah keluarga huruf yang dianjurkan dalam satu desain website agar tetap harmonis?'),
          difficulty: 1,
          choices: [
            { id: 'two', label: t('Maksimal 2 keluarga huruf (atau cukup 1 keluarga saja)') },
            {
              id: 'six',
              label: t('Minimal 6 keluarga huruf berbeda per halaman'),
              explainWrong: t('Enam keluarga huruf membuat tampilan tampak kacau dan memperlambat muat halaman.'),
            },
            {
              id: 'ten',
              label: t('Setiap paragraf wajib memakai font baru'),
              explainWrong: t('Konsistensi huruf adalah kunci keterbacaan.'),
            },
          ],
          answer: 'two',
          explainCorrect: t('Tepat! Satu keluarga huruf saja (bedakan Bold/Regular) atau maksimal dua (judul + isi) sudah sangat cukup.'),
          tags: ['tipografi'],
        }),
      ),
      qStep({
        id: 'a08-l08-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi pengaturan jarak antarbaris paragraf yang nyaman di CSS:'),
        difficulty: 2,
        template: 'Untuk paragraf bacaan panjang, atur line-height di kisaran ___ sampai 1.7.',
        bank: ['1.5', '0.9', '4.0'],
        answer: ['1.5'],
        explainCorrect: t('Benar! Rentang line-height 1.5 hingga 1.7 memberi celah antarbaris yang pas bagi mata.'),
        tags: ['tipografi', 'css'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a08-l08-r1',
        prompt: t('Keluarga huruf di mana seluruh karakter memiliki lebar yang persis sama untuk kode program atau angka tabel adalah…'),
        choices: [
          { id: 'mo', label: t('Monospace') },
          { id: 'se', label: t('Serif'), explainWrong: t('Serif memiliki kaki hias di ujung huruf dengan lebar berbeda-beda.') },
        ],
        answer: 'mo',
        explainCorrect: t('Monospace seperti JetBrains Mono atau Fira Code membuat kode dan kolom angka sejajar rapi.'),
        tags: ['tipografi'],
      }),
      makeTf({
        id: 'a08-l08-r2',
        prompt: t('Paragraf panjang di website lebih nyaman memakai perataan rata kiri daripada rata kanan-kiri (justify).'),
        answer: true,
        explainCorrect: t('Betul! Rata kiri menghindari celah spasi bolong di tengah baris.'),
        explainWrong: t('Rata kanan-kiri kerap memutus ritme baca karena jarak antar kata menjadi tidak rata.'),
        tags: ['tipografi'],
      }),
    ],
    recap: t(
      'Pilih huruf yang jernih seperti Sans-serif, atur ukuran minimal 16px, dan beri jarak baris lega.',
      'Terapkan aturan baca nyaman (≥16px, line-height 1,5–1,7, 45–75ch, rata kiri, maks 2 keluarga huruf) dan pilih jenis huruf sesuai fungsi.',
    ),
    companion: {
      talkPrompts: ['Bandingkan tulisan buku cerita dengan tulisan kode angka di struk belanja: mana yang semua huruf dan angkanya selebar sama persis?'],
      offlineActivity: 'Hitung jumlah huruf dalam satu baris pada halaman buku favoritmu—biasanya berkisar 45–75 karakter agar nyaman diikuti mata!',
    },
  }),

  makeLesson({
    id: 'a08-l09',
    worldId: 'a08',
    title: 'Type scale',
    modes: ['pro'],
    objective: t('Aku bisa menyusun tangga ukuran huruf (type scale), membedakan typeface dan font, serta mengoptimalkan font web.'),
    estMinutes: 5,
    introducesTerms: ['type-scale'],
    usesTerms: ['ui', 'hierarki', 'tipografi', 'rem-unit'],
    warmupFrom: 'a08-l08',
    steps: [
      storyStep('a08/tangga-nada-huruf.svg', [
        rText('Seperti tangga nada musik punya tingkatan nada teratur agar lagu tidak sumbang, tangga ukuran huruf menjaga judul besar, subjudul, dan paragraf selalu serasi dan jelas bedanya.'),
      ]),
      conceptStep({
        title: t('Type Scale: Tangga Ukuran Huruf'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'tangga-type-scale' },
        alt: t('Tangga ukuran huruf bertingkat: H1 40px, H2 30px, H3 22px, Body 16px, Small 14px, Caption 12px.'),
        body: [
          rTerm('type-scale', 'Type scale'),
          rText(' adalah daftar beberapa ukuran tetap yang dipakai konsisten di seluruh produk—misalnya H1 (40px), H2 (30px), H3 (22px), Body (16px), Small (14px), Caption (12px)—agar tiap tingkat '),
          rTerm('hierarki', 'hierarki'),
          rText(' langsung tampak berbeda.'),
        ],
      }),
      conceptStep({
        title: t('Anatomi Pengaturan Teks & Typeface vs Font'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'anatomi-pengaturan-teks' },
        alt: t('Empat properti: font-size, line-height, letter-spacing, dan font-weight 100-900.'),
        body: [
          rText('Empat pengaturan teks utama di CSS: '),
          rCode('font-size'),
          rText(', '),
          rCode('line-height'),
          rText(', '),
          rCode('letter-spacing'),
          rText(', dan '),
          rCode('font-weight'),
          rText(' (100–900). Catatan istilah: '),
          rBold('Typeface'),
          rText(' adalah keluarganya (mis. Inter), sedangkan '),
          rBold('Font'),
          rText(' adalah satu anggotanya (Inter Bold 16px).'),
        ],
      }),
      conceptStep({
        title: t('Menulis di CSS & Optimasi Web Font'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a08', topic: 'css-ch-dan-woff2' },
        alt: t('Aturan CSS body font-size 16px, line-height 1.6, max-width 65ch, dan format woff2.'),
        code: {
          lang: 'css',
          code: 'body {\n  font-size: 16px; /* atau 1rem */\n  line-height: 1.6;\n  max-width: 65ch;\n}',
        },
        body: [
          rText('Satuan '),
          rCode('ch'),
          rText(' kira-kira selebar satu karakter ('),
          rCode('65ch'),
          rText(' pas di tengah rentang 45–75 karakter), bersama '),
          rTerm('rem-unit', 'rem'),
          rText(' agar skalabel. Untuk Google Fonts di web, pilih format '),
          rCode('woff2'),
          rText(' dan muat ketebalan yang benar-benar dipakai saja.'),
        ],
      }),
      limitStep({
        analogy: t('Tangga nada musik untuk type scale'),
        same: [
          t('Tingkatan ditentukan teratur lebih dulu alih-alih mengarang ukuran angka acak di setiap kartu.'),
        ],
        different: [
          t('Tangga nada bebas naik-turun di oktaf mana saja, sedangkan tangga ukuran teks di web tidak boleh mengecilkan teks isi di bawah 16px dan tetap harus menyusut rapi di viewport HP!'),
        ],
      }),
      simStep(
        'detektif-kontras',
        t('Amati perbedaan ukuran dan ketebalan antara judul kartu dan label keterangannya pada simulator.'),
      ),
      qStep({
        id: 'a08-l09-q1',
        type: 'order',
        prompt: t('Urutkan tangga Type Scale berikut dari tingkat ukuran PALING BESAR ke PALING KECIL:'),
        difficulty: 1,
        items: [
          { id: 'b', label: t('Body (16px) — Teks isi paragraf') },
          { id: 'h1', label: t('H1 (40px) — Judul Halaman') },
          { id: 'cap', label: t('Caption (12px) — Label kecil') },
          { id: 'h2', label: t('H2 (30px) — Judul Bagian') },
          { id: 'h3', label: t('H3 (22px) — Subjudul') },
        ],
        answer: ['h1', 'h2', 'h3', 'b', 'cap'],
        explainCorrect: t('Tepat! Tangga yang berjarak jelas memastikan hierarki langsung terbaca.'),
        tags: ['type-scale', 'hierarki'],
      }),
      qStep({
        id: 'a08-l09-q2',
        type: 'match',
        prompt: t('Pasangkan properti dan istilah tipografi CSS dengan fungsinya:'),
        difficulty: 2,
        left: [
          { id: 'lh', label: t('line-height') },
          { id: 'ls', label: t('letter-spacing') },
          { id: 'fw', label: t('font-weight (100–900)') },
          { id: 'ch', label: t('max-width: 65ch') },
        ],
        right: [
          { id: 'rlh', label: t('Mengatur jarak vertikal antarbaris teks') },
          { id: 'rls', label: t('Mengatur jarak horizontal antarhuruf') },
          { id: 'rfw', label: t('Mengatur tingkat ketebalan huruf (regular hingga bold)') },
          { id: 'rch', label: t('Membatasi panjang baris sekitar 65 karakter per baris') },
        ],
        answer: { lh: 'rlh', ls: 'rls', fw: 'rfw', ch: 'rch' },
        explainCorrect: t('Hebat! Empat properti plus satuan ch ini menjadi kendali penuh tipografi CSS.'),
        tags: ['type-scale', 'tipografi'],
      }),
      qStep({
        id: 'a08-l09-q3',
        type: 'spotbug',
        prompt: t('Ketuk baris CSS yang melanggar prinsip Type Scale dengan memberi perbedaan ukuran yang hampir tidak terlihat antara judul H2 dan teks isi Body:'),
        difficulty: 2,
        lines: [
          'h1 { font-size: 40px; line-height: 1.2; }',
          'h2 { font-size: 17px; line-height: 1.3; }',
          'body { font-size: 16px; line-height: 1.6; max-width: 65ch; }',
        ],
        answer: [2],
        explainCorrect: t('Jeli! H2 sebesar 17px nyaris tidak bisa dibedakan dari teks Body 16px; setiap tingkat type scale harus terlihat jelas bedanya (misal 28–30px).'),
        tags: ['type-scale', 'hierarki'],
      }),
      qStep(
        makeMcq({
          id: 'a08-l09-q4',
          type: 'limit',
          analogy: t('Tangga nada musik untuk type scale'),
          prompt: t('Manakah aturan yang wajib dijaga pada type scale website agar tidak seperti tangga nada bebas?'),
          difficulty: 2,
          choices: [
            { id: 'min', label: t('Teks isi (Body) tidak boleh ikut turun di bawah 16px, dan judul raksasa harus disesuaikan agar tidak sesak di HP') },
            {
              id: 'step',
              label: t('Memilih beberapa ukuran baku tetap daripada menebak angka baru di setiap komponen'),
              explainWrong: t('Ini memang kesamaan dan tujuan utama type scale.'),
            },
            {
              id: 'hier',
              label: t('Memberi lompatan ukuran yang jelas antara tiap tingkat'),
              explainWrong: t('Ini juga persamaan manfaat tangga ukuran.'),
            },
          ],
          answer: 'min',
          explainCorrect: t('Benar! Batas keterbacaan mata manusia (Body ≥ 16px) tidak boleh dikorbankan demi skala matematis semata.'),
          tags: ['type-scale', 'tipografi'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a08-l09-q5',
          type: 'scenario',
          story: t('Situs portofolio Nadia mendadak berat dan lambat dimuat karena ia mengimpor 9 tingkat ketebalan font (100 hingga 900) dalam format lama padahal hanya memakai Regular (400) dan Bold (700).'),
          prompt: t('Cara mengoptimalkan pemuatan web font pada proyek Nadia adalah…'),
          difficulty: 2,
          choices: [
            { id: 'woff', label: t('Muat hanya ketebalan 400 dan 700 yang benar-benar dipakai dalam format modern woff2') },
            {
              id: 'all',
              label: t('Tambahkan lagi ketebalan Italic dan Oblique semua angka agar lengkap'),
              explainWrong: t('Menambah file font yang tidak dipakai hanya makin memperlambat waktu muat halaman.'),
            },
            {
              id: 'img',
              label: t('Ubah seluruh paragraf teks menjadi file gambar PNG'),
              explainWrong: t('Teks dalam bentuk gambar berat, buram saat diperbesar, dan merusak aksesibilitas serta SEO.'),
            },
          ],
          answer: 'woff',
          explainCorrect: t('Tepat! Format woff2 berukuran jauh lebih ringan dan memuat bobot secukupnya menjaga performa web tetap gesit.'),
          tags: ['tipografi'],
        }),
      ),
      qStep({
        id: 'a08-l09-q6',
        type: 'fill',
        prompt: t('Lengkapi perbedaan istilah teknis berikut:'),
        difficulty: 2,
        template: '___ adalah nama keluarga hurufnya (misalnya Inter), sedangkan font adalah satu anggota spesifiknya (misalnya Inter Bold 16px).',
        bank: ['Typeface', 'Contrast', 'Viewport'],
        answer: ['Typeface'],
        explainCorrect: t('Benar! Typeface = keluarga huruf; Font = satu anggota ukuran/ketebalan spesifik.'),
        tags: ['tipografi', 'type-scale'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a08-l09-r1',
        prompt: t('Tujuan utama menyusun Type Scale tetap di sebuah proyek desain adalah…'),
        choices: [
          { id: 'ok', label: t('Menjaga hierarki ukuran huruf tetap jelas dan konsisten di seluruh halaman') },
          { id: 'no', label: t('Supaya setiap kata di dalam satu kalimat memakai ukuran acak berbeda'), explainWrong: t('Type scale justru membatasi pilihan ukuran agar konsisten.') },
        ],
        answer: 'ok',
        explainCorrect: t('Tangga ukuran baku mencegah munculnya puluhan ukuran acak seperti 15px, 16px, 17px, 19px yang tidak rapi.'),
        tags: ['type-scale'],
      }),
      makeTf({
        id: 'a08-l09-r2',
        prompt: t('Pada CSS, satuan ch kira-kira selebar satu karakter sehingga max-width: 65ch efektif menjaga panjang baris nyaman dibaca.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('65ch menempatkan panjang baris tepat di tengah rentang ideal 45–75 karakter.'),
        tags: ['type-scale', 'tipografi'],
      }),
    ],
    recap: t('Susun tangga type scale yang konsisten dan jelas bedanya, atur max-width: 65ch serta line-height lega, dan muat font woff2 secukupnya.'),
  }),
];
