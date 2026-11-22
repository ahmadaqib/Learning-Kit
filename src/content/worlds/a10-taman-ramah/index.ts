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
  id: 'a10',
  track: 'A',
  order: 10,
  title: 'Taman Ramah Semua',
  tagline: t(
    'Membuat website yang mudah dipakai semua orang dalam kondisi apa pun.',
    'Menerapkan aksesibilitas web (a11y), empat prinsip WCAG POUR, keyboard navigation, dan ARIA.',
  ),
  color: '#2BA84A',
  illustration: 'a10-taman-ramah',
  sourceChapters: ['J1-15'],
  requires: ['a09'],
  lessons: ['a10-l01', 'a10-l02', 'a10-l03'],
  sideQuests: [],
  boss: {
    title: 'Tantangan Penjaga Taman',
    greeting: t(
      'Selamat datang di Taman Ramah Semua! Ayo pastikan semua pengunjung bisa ikut bermain!',
      'Buktikan kemampuanmu membangun web yang aksesibel sesuai prinsip WCAG POUR dan daftar periksa a11y.',
    ),
    guardianName: 'Penjaga Taman',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'a10-anc-j1',
        prompt: t('Siapa yang ikut terbantu oleh bidang miring di trotoar selain pengguna kursi roda?'),
        choices: [
          { id: 'all', label: t('Semua orang, seperti pendorong kereta bayi dan penarik koper') },
          {
            id: 'car',
            label: t('Hanya mobil balap di jalan tol'),
            explainWrong: t('Bidang miring trotoar memudahkan pejalan kaki dan pengguna roda.'),
          },
          {
            id: 'none',
            label: t('Tidak ada orang lain sama sekali'),
            explainWrong: t('Desain ramah disabilitas justru membantu banyak orang.'),
          },
        ],
        answer: 'all',
        explainCorrect: t('Desain aksesibel membuat tempat dan website jadi lebih nyaman bagi semua orang.'),
        tags: ['aksesibilitas'],
      }),
      makeAnchorMcq({
        id: 'a10-anc-j2',
        prompt: t('Jika lenganmu sedang digips selama dua minggu dan susah memakai mouse, itu keterbatasan…'),
        choices: [
          { id: 'temp', label: t('Sementara') },
          {
            id: 'perm',
            label: t('Permanen'),
            explainWrong: t('Gips hanya sementara sampai tangan sembuh.'),
          },
          {
            id: 'none',
            label: t('Bukan keterbatasan sama sekali'),
            explainWrong: t('Kesulitan memakai mouse selama masa pemulihan termasuk keterbatasan sementara.'),
          },
        ],
        answer: 'temp',
        explainCorrect: t('Keterbatasan bisa bersifat permanen, sementara, atau situasional.'),
        tags: ['aksesibilitas'],
      }),
      makeAnchorMcq({
        id: 'a10-anc-j3',
        prompt: t('Mengapa pesan kesalahan formulir sebaiknya tidak cuma memberi garis merah saja?'),
        choices: [
          { id: 'cb', label: t('Pengguna buta warna butuh tambahan ikon dan tulisan agar tahu apa yang salah') },
          {
            id: 'ink',
            label: t('Karena warna merah menghabiskan baterai layar'),
            explainWrong: t('Alasannya agar semua orang, termasuk yang buta warna, menangkap pesan error.'),
          },
          {
            id: 'hide',
            label: t('Supaya pesan error tidak perlu dibaca'),
            explainWrong: t('Justru pesan error wajib jelas terbaca.'),
          },
        ],
        answer: 'cb',
        explainCorrect: t('Gabungan warna, ikon, dan teks memastikan informasi tersampaikan kepada semua orang.'),
        tags: ['aksesibilitas', 'kontras'],
      }),
      makeAnchorMcq({
        id: 'a10-anc-j4',
        prompt: t('Jika mouse rusak, tombol keyboard apa yang dipakai berpindah dari satu tombol ke tombol berikutnya?'),
        choices: [
          { id: 'tab', label: t('Tombol Tab') },
          {
            id: 'esc',
            label: t('Tombol Caps Lock'),
            explainWrong: t('Caps Lock hanya mengganti huruf besar dan kecil.'),
          },
          {
            id: 'vol',
            label: t('Tombol pengecil suara'),
            explainWrong: t('Navigasi fokus antar-elemen menggunakan tombol Tab.'),
          },
        ],
        answer: 'tab',
        explainCorrect: t('Tombol Tab memindahkan fokus berurutan agar web tetap bisa dipakai tanpa mouse.'),
        tags: ['aksesibilitas'],
      }),
      makeAnchorMcq({
        id: 'a10-anc-j5',
        prompt: t('Apa perbedaan batas analogi antara jalan miring trotoar dan website aksesibel?'),
        type: 'limit',
        analogy: t('Bidang miring trotoar untuk aksesibilitas'),
        choices: [
          { id: 'soft', label: t('Website juga harus ramah alat bantu digital seperti pembaca layar dan pembesar huruf') },
          {
            id: 'help',
            label: t('Sama-sama membantu banyak pengguna di luar target awal'),
            explainWrong: t('Ini justru kesamaan keduanya.'),
          },
          {
            id: 'ease',
            label: t('Sama-sama menghilangkan penghalang saat dipakai'),
            explainWrong: t('Ini juga persamaannya.'),
          },
        ],
        answer: 'soft',
        explainCorrect: t('Di web, pengguna memakai alat bantu seperti keyboard, screen reader, dan zoom layar.'),
        tags: ['aksesibilitas'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a10-anc-p1',
        prompt: t('Pengunjung membaca artikel di HP di bawah terik matahari sehingga layar tampak silau. Ini termasuk keterbatasan…'),
        choices: [
          { id: 'sit', label: t('Situasional') },
          {
            id: 'perm',
            label: t('Permanen'),
            explainWrong: t('Silau matahari bergantung pada kondisi lingkungan saat itu.'),
          },
          {
            id: 'temp',
            label: t('Sementara akibat cedera medis'),
            explainWrong: t('Masalah lingkungan seperti silau atau tempat bising adalah keterbatasan situasional.'),
          },
        ],
        answer: 'sit',
        explainCorrect: t('Keterbatasan situasional muncul karena lingkungan, seperti cahaya silau, suara bising, atau satu tangan penuh.'),
        tags: ['aksesibilitas'],
      }),
      makeAnchorMcq({
        id: 'a10-anc-p2',
        prompt: t('Pada standar WCAG, tingkat kepatuhan mana yang menjadi target umum sebagian besar situs web?'),
        choices: [
          { id: 'aa', label: t('Tingkat AA') },
          {
            id: 'z',
            label: t('Tingkat Z'),
            explainWrong: t('Tingkatan WCAG adalah A, AA, dan AAA.'),
          },
          {
            id: 'b',
            label: t('Tingkat B'),
            explainWrong: t('Tingkatan WCAG adalah A, AA, dan AAA; target umumnya AA.'),
          },
        ],
        answer: 'aa',
        explainCorrect: t('WCAG memiliki level A, AA, dan AAA; level AA menjadi standar praktis yang umum dituju.'),
        tags: ['pour'],
      }),
      makeAnchorMcq({
        id: 'a10-anc-p3',
        prompt: t('Memberi takarir (caption) pada video dan teks alt pada gambar termasuk prinsip WCAG…'),
        choices: [
          { id: 'p', label: t('Perceivable (dapat ditangkap indra)') },
          {
            id: 'o',
            label: t('Operable (dapat dioperasikan)'),
            explainWrong: t('Operable berkaitan dengan keyboard, target sentuh, dan batas waktu.'),
          },
          {
            id: 'r',
            label: t('Robust (kode kokoh)'),
            explainWrong: t('Robust fokus pada standar kode lintas browser dan alat bantu.'),
          },
        ],
        answer: 'p',
        explainCorrect: t('Perceivable memastikan informasi tersedia lewat indra lihat maupun dengar.'),
        tags: ['pour', 'alt-text'],
      }),
      makeAnchorMcq({
        id: 'a10-anc-p4',
        prompt: t('Apa aturan pertama saat ingin memakai atribut ARIA pada elemen HTML?'),
        choices: [
          { id: 'html', label: t('Jika ada tag HTML semantik asli yang cocok seperti <button>, pakai tag HTML asli dulu') },
          {
            id: 'div',
            label: t('Selalu ubah semua elemen menjadi <div> lalu tambahkan ARIA sebanyak mungkin'),
            explainWrong: t('Tag semantik asli lebih andal dan sudah membawa dukungan keyboard bawaan.'),
          },
          {
            id: 'hide',
            label: t('Hapus semua atribut alt saat memakai ARIA'),
            explainWrong: t('Atribut alt tetap wajib untuk gambar bermakna.'),
          },
        ],
        answer: 'html',
        explainCorrect: t('ARIA hanya dipakai bila elemen HTML asli belum cukup menjelaskan peran seperti tombol ikon ×.'),
        tags: ['pour', 'semantik'],
      }),
      makeAnchorMcq({
        id: 'a10-anc-p5',
        prompt: t('Untuk gambar hiasan murni agar dilewati dengan tenang oleh pembaca layar, penulisannya adalah…'),
        choices: [
          { id: 'empty', label: t('<img src="hiasan.png" alt="">') },
          {
            id: 'omit',
            label: t('<img src="hiasan.png"> tanpa atribut alt'),
            explainWrong: t('Tanpa alt, pembaca layar sering membacakan nama file mentahnya.'),
          },
          {
            id: 'desc',
            label: t('<img src="hiasan.png" alt="gambar dekorasi latar biru nomor lima">'),
            explainWrong: t('Gambar hiasan murni cukup diberi alt kosong agar tidak mengganggu pembaca layar.'),
          },
        ],
        answer: 'empty',
        explainCorrect: t('Atribut alt="" menandai gambar murni dekoratif sehingga screen reader melewatinya.'),
        tags: ['alt-text', 'aksesibilitas'],
      }),
      makeAnchorMcq({
        id: 'a10-anc-p6',
        type: 'limit',
        analogy: t('Daftar periksa aksesibilitas otomatis seperti Lighthouse'),
        choices: [
          { id: 'auto', label: t('Alat otomatis tidak bisa menilai apakah bahasa tulisan jelas atau alur Tab terasa masuk akal bagi manusia') },
          {
            id: 'col',
            label: t('Alat otomatis bisa menghitung rasio kontras warna'),
            explainWrong: t('Alat otomatis memang hebat memeriksa hal terukur seperti kontras.'),
          },
          {
            id: 'alt',
            label: t('Alat otomatis bisa mendeteksi gambar yang lupa diberi atribut alt'),
            explainWrong: t('Deteksi alt hilang juga bisa dilakukan alat otomatis, tapi kualitas kalimat alt dinilai manusia.'),
          },
        ],
        prompt: t('Mengapa skor Lighthouse Accessibility 100 belum otomatis menjamin website nyaman dipakai penyandang disabilitas?'),
        answer: 'auto',
        explainCorrect: t('Audit otomatis hanya menangkap sebagian masalah teknis; uji keyboard dan pembaca layar langsung tetap wajib.'),
        tags: ['aksesibilitas', 'pour'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'a10-l01',
    worldId: 'a10',
    title: 'Untuk siapa aksesibilitas',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menjelaskan siapa saja yang terbantu oleh website yang ramah semua orang.',
      'Aku bisa menjelaskan makna a11y serta tiga kategori keterbatasan (permanen, sementara, dan situasional).',
    ),
    estMinutes: 5,
    introducesTerms: ['aksesibilitas'],
    usesTerms: ['ui', 'ux', 'alt-text', 'kontras'],
    stickerId: 'bidang-miring',
    warmupFrom: 'a09-l06',
    steps: [
      storyStep('a10/bidang-miring.svg', [
        rText(
          'Bidang miring di trotoar awalnya dibuat untuk kursi roda. Ternyata orang tua dengan kereta bayi, penarik koper, dan pengantar barang juga ikut senang memakainya!',
          'Bidang miring di trotoar dibangun untuk pengguna kursi roda, tetapi turut memudahkan pendorong kereta bayi, penarik koper, dan kurir barang. Desain yang ramah bagi yang paling membutuhkan membuat semuanya nyaman.',
        ),
      ]),
      conceptStep({
        title: t('Apa Itu Aksesibilitas?', 'Makna Aksesibilitas (a11y)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a10', topic: 'apa-itu-a11y' },
        alt: t('Singkatan a11y berarti huruf a, 11 huruf di tengah, dan huruf y.'),
        body: [
          rTerm('aksesibilitas', 'Aksesibilitas', 'Aksesibilitas (a11y)'),
          rText(
            ' membuat web bisa dipakai siapa saja. Singkatannya ',
            ' berarti membuat web dapat dipakai semua orang. Angka 11 pada ',
          ),
          rCode('a11y'),
          rText(' dari jumlah hurufnya.', ' mewakili 11 huruf di antara a dan y pada kata accessibility.'),
        ],
      }),
      conceptStep({
        title: t('Bukan Cuma Kondisi Tetap', 'Permanen & Sementara'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a10', topic: 'disabilitas-permanen-sementara' },
        alt: t('Contoh keterbatasan permanen seperti tunanetra dan sementara seperti tangan digips.'),
        body: [
          rText('Ada keterbatasan '),
          rBold('permanen', 'permanen'),
          rText(' seperti tunanetra atau tuli. Ada juga yang ', ' (tunanetra, buta warna, tuli, gerak terbatas) dan '),
          rBold('sementara', 'sementara'),
          rText(' seperti tangan digips.', ' seperti lengan digips, mata lelah, atau baru pulih operasi.'),
        ],
      }),
      conceptStep({
        title: t('Kondisi Sekitar Kita', 'Keterbatasan Situasional'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a10', topic: 'keterbatasan-situasional' },
        alt: t('Situasi silau matahari, satu tangan menggendong adik, dan tempat bising.'),
        body: [
          rText('Kondisi '),
          rBold('situasional', 'situasional'),
          rText(
            ' dialami semua orang. Layar silau matahari, tempat bising, atau memegang barang.',
            ' bisa menimpa siapa saja: layar silau di luar ruangan, tempat sangat bising, atau hanya satu tangan yang bebas.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Bidang miring trotoar untuk aksesibilitas'),
        same: [
          t('Memperbaiki akses bagi satu kelompok pengguna langsung memudahkan banyak orang lain juga.'),
        ],
        different: [
          t('Trotoar beton bentuknya tetap, sedangkan website harus bisa menyesuaikan diri lewat teks alt, keyboard, dan alat pembaca layar.'),
        ],
      }),
      simStep(
        'taman-akses',
        t(
          'Ketuk setiap syarat taman ramah agar kamu tahu apa saja yang membantu pengunjung!',
          'Telusuri pilar aksesibilitas di simulator Taman Ramah Semua.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a10-l01-q1',
          type: 'analogy',
          prompt: t('Mengapa aksesibilitas sering diumpamakan seperti jalur bidang miring di trotoar?'),
          choices: [
            { id: 'all', label: t('Karena membantu kursi roda sekaligus memudahkan koper, kereta bayi, dan semua orang') },
            {
              id: 'slide',
              label: t('Karena dipakai anak-anak untuk bermain perosotan'),
              explainWrong: t('Bidang miring membantu pergerakan pengguna roda agar tidak terhalang tangga.'),
            },
            {
              id: 'fast',
              label: t('Karena membuat jalan menjadi lebih sempit'),
              explainWrong: t('Tujuannya justru membuka akses bagi lebih banyak orang.'),
            },
          ],
          answer: 'all',
          explainCorrect: t('Benar! Fitur ramah akses membuat produk nyaman dipakai oleh semua kondisi pengguna.'),
          tags: ['aksesibilitas'],
        }),
      ),
      qStep({
        id: 'a10-l01-q2',
        type: 'sort',
        prompt: t('Kelompokkan kondisi pengguna berikut ke Permanen, Sementara, atau Situasional:'),
        difficulty: 2,
        items: [
          { id: 'c1', label: t('Layar silau di bawah matahari') },
          { id: 'c2', label: t('Tangan kanan sedang digips') },
          { id: 'c3', label: t('Tunanetra sejak lahir') },
          { id: 'c4', label: t('Satu tangan memegang tas belanja') },
        ],
        bins: [
          { id: 'perm', label: t('Permanen') },
          { id: 'temp', label: t('Sementara') },
          { id: 'sit', label: t('Situasional') },
        ],
        answer: { c1: 'sit', c2: 'temp', c3: 'perm', c4: 'sit' },
        explainCorrect: t('Hebat! Kamu membedakan tiga jenis keterbatasan manusia dengan tepat.'),
        tags: ['aksesibilitas'],
      }),
      qStep(
        makeMcq({
          id: 'a10-l01-q3',
          prompt: t('Di singkatan "a11y", angka 11 berasal dari…'),
          choices: [
            { id: 'len', label: t('Jumlah 11 huruf di antara huruf a dan y pada kata accessibility') },
            {
              id: 'ver',
              label: t('Versi browser ke-11'),
              explainWrong: t('a11y adalah singkatan kata accessibility, bukan nomor versi.'),
            },
            {
              id: 'rule',
              label: t('Jumlah maksimal tombol di satu halaman'),
              explainWrong: t('Angka 11 merujuk jumlah huruf tengah pada kata accessibility.'),
            },
          ],
          answer: 'len',
          explainCorrect: t('Tepat! a + (ccessibilit = 11 huruf) + y menjadi a11y.'),
          tags: ['aksesibilitas'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a10-l01-q4',
          type: 'limit',
          analogy: t('Bidang miring di trotoar'),
          prompt: t('Apa hal yang HARUS diperhatikan di website tetapi tidak ada di bidang miring trotoar?'),
          choices: [
            { id: 'sr', label: t('Membantu alat pembaca layar dan keyboard karena penggunanya tidak menyentuh beton fisik') },
            {
              id: 'wide',
              label: t('Menghilangkan hambatan bagi orang yang membutuhkan'),
              explainWrong: t('Itu kesamaan antara bidang miring dan web aksesibel.'),
            },
            {
              id: 'nice',
              label: t('Berguna juga untuk orang lain saat membawa barang'),
              explainWrong: t('Ini juga persamaan keduanya.'),
            },
          ],
          answer: 'sr',
          explainCorrect: t('Benar! Di web, hambatan datang dari kode yang tak terbaca pembaca layar atau tak bisa diklik dengan keyboard.'),
          tags: ['aksesibilitas'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a10-l01-q5',
          type: 'scenario',
          story: t('Rani menonton video tutorial memasak di kereta api yang sangat berisik tanpa membawa earphone.'),
          prompt: t('Fitur aksesibilitas apa yang langsung menolong Rani dalam kondisi situasional itu?'),
          difficulty: 2,
          choices: [
            { id: 'cap', label: t('Takarir atau teks terjemahan (caption) pada video') },
            {
              id: 'anim',
              label: t('Menambah suara musik latar lebih keras'),
              explainWrong: t('Tanpa earphone di tempat bising, suara justru tetap tidak terdengar jelas.'),
            },
            {
              id: 'tiny',
              label: t('Memperkecil layar video hingga seukuran prangko'),
              explainWrong: t('Memperkecil video malah menyulitkan Rani melihat langkahnya.'),
            },
          ],
          answer: 'cap',
          explainCorrect: t('Tepat! Takarir awalnya wajib bagi teman tuli, sekaligus menolong siapa saja di tempat bising.'),
          tags: ['aksesibilitas'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a10-l01-q6',
          prompt: t('Aksesibilitas web berguna bagi semua orang, bukan hanya penyandang disabilitas permanen.'),
          answer: true,
          explainCorrect: t('Betul! Siapa pun bisa mengalami keterbatasan sementara atau situasional setiap hari.'),
          explainWrong: t('Hampir! Setiap orang pernah silau matahari, lelah mata, atau hanya bisa memakai satu tangan.'),
          tags: ['aksesibilitas'],
        }),
      ),
      qStep({
        id: 'a10-l01-q7',
        type: 'type',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Tulis singkatan internasional 4 karakter untuk kata accessibility yang sering dipakai developer.'),
        accept: ['a11y', 'A11Y'],
        explainCorrect: t('Tepat! a11y adalah singkatan standar industri untuk aksesibilitas.'),
        tags: ['aksesibilitas'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a10-l01-r1',
        prompt: t('Manakah contoh keterbatasan situasional saat memakai HP?'),
        choices: [
          { id: 'sun', label: t('Membaca layar di luar ruangan yang silau sinar matahari') },
          {
            id: 'bw',
            label: t('Buta warna sejak kecil'),
            explainWrong: t('Buta warna termasuk kondisi permanen.'),
          },
        ],
        answer: 'sun',
        explainCorrect: t('Silau matahari atau tempat berisik adalah keterbatasan situasional.'),
        tags: ['aksesibilitas'],
      }),
      makeTf({
        id: 'a10-l01-r2',
        prompt: t('Kontras warna yang jelas membantu penyandang gangguan penglihatan sekaligus orang yang melihat layar di luar ruangan.'),
        answer: true,
        explainCorrect: t('Betul! Kontras yang kuat menguntungkan semua pengguna.'),
        explainWrong: t('Kontras baik membantu pengguna gangguan penglihatan maupun siapa pun di bawah cahaya terik.'),
        tags: ['aksesibilitas', 'kontras'],
      }),
    ],
    recap: t(
      'Aksesibilitas membuat website ramah dipakai dalam kondisi permanen, sementara, maupun situasional.',
      'Aksesibilitas (a11y) mengatasi hambatan permanen, sementara, dan situasional sehingga produk lebih nyaman bagi semua orang.',
    ),
    companion: {
      talkPrompts: [
        'Pernahkah kamu memakai HP sambil makan dengan satu tangan atau di tempat berisik? Fitur apa yang membantu saat itu?',
      ],
      offlineActivity:
        'Ajak anak menutup mata 1 menit lalu minta menebak isi kemasan makanan dari suara penjelasan kakak—rasakan pentingnya teks alt dan deskripsi jelas.',
    },
  }),

  makeLesson({
    id: 'a10-l02',
    worldId: 'a10',
    title: 'Empat prinsip POUR',
    modes: ['pro'],
    objective: t(
      'Aku bisa mengingat empat prinsip WCAG POUR dan peran dasar ARIA.',
      'Aku bisa mengelompokkan aturan aksesibilitas ke empat prinsip WCAG POUR (Perceivable, Operable, Understandable, Robust) dan menerapkan aturan pertama ARIA.',
    ),
    estMinutes: 5,
    introducesTerms: ['pour'],
    usesTerms: ['aksesibilitas', 'alt-text', 'kontras', 'semantik'],
    warmupFrom: 'a10-l01',
    steps: [
      storyStep('a10/taman-pour.svg', [
        rText(
          'Bayangkan sebuah taman umum bertaraf internasional: papan petunjuknya mudah dilihat atau didengar, pintunya bisa dibuka tanpa mengandalkan satu cara saja, bahasanya mudah dimengerti, dan bangkunya kokoh dipakai siapa pun. Itulah empat prinsip POUR di WCAG!',
        ),
      ]),
      conceptStep({
        title: t('WCAG & P — Perceivable, O — Operable'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a10', topic: 'pour-po' },
        alt: t('P Perceivable (indra lihat/dengar) dan O Operable (keyboard & target sentuh).'),
        body: [
          rTerm('pour', 'WCAG POUR'),
          rText(' punya target umum kepatuhan '),
          rBold('AA'),
          rText('. '),
          rBold('P (Perceivable)'),
          rText(': info dapat dilihat/didengar ('),
          rTerm('alt-text', 'alt text'),
          rText(', '),
          rTerm('kontras', 'kontras'),
          rText(', takarir). '),
          rBold('O (Operable)'),
          rText(': bisa lewat keyboard, target sentuh besar, tanpa batas waktu menjebak.'),
        ],
      }),
      conceptStep({
        title: t('U — Understandable & R — Robust'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a10', topic: 'pour-ur' },
        alt: t('U Understandable (bahasa jelas & error membantu) dan R Robust (kode standar rapi).'),
        body: [
          rBold('U (Understandable)'),
          rText(': bahasa jelas, navigasi konsisten, pesan error menjelaskan cara memperbaiki. '),
          rBold('R (Robust)'),
          rText(': kode '),
          rTerm('semantik', 'HTML semantik'),
          rText(' rapi dan standar sehingga bekerja di berbagai browser dan alat bantu.'),
        ],
      }),
      conceptStep({
        title: t('Sekilas ARIA dan Aturan Pertamanya'),
        visualName: 'HtmlTreeDiagram',
        visualProps: { worldId: 'a10', topic: 'aria-label' },
        alt: t('Contoh tombol ikon silang memakai aria-label="Tutup" bila tidak ada teks.'),
        code: {
          lang: 'html',
          code: '<!-- Pakai HTML asli dulu: -->\n<button aria-label="Tutup">&times;</button>',
        },
        body: [
          rBold('ARIA'),
          rText(' memberi keterangan peran kepada pembaca layar, misalnya '),
          rCode('aria-label="Tutup"'),
          rText(' pada tombol ikon. Aturan pertamanya: jika ada tag HTML asli yang cocok, pakai tag asli dulu sebelum menambah ARIA.'),
        ],
      }),
      limitStep({
        analogy: t('POUR seperti standar fasilitas taman umum yang ramah'),
        same: [
          t('Pintu masuk, papan informasi, dan pegangan mengikuti standar ukuran baku agar aman dipakai semua tamu.'),
        ],
        different: [
          t('Di taman fisik tidak ada kode HTML; di web, prinsip Robust menuntut struktur kode standar supaya pembaca layar bisa menerjemahkannya ke suara atau braille.'),
          t('Memasang aria-label pada <div> tidak otomatis membuatnya bisa diklik dengan tombol Enter keyboard seperti <button> asli!'),
        ],
      }),
      simStep(
        'taman-akses',
        t('Uji ketiga komponen POUR utama pada panel Pemeriksa Aksesibilitas.'),
      ),
      qStep({
        id: 'a10-l02-q1',
        type: 'match',
        prompt: t('Pasangkan keempat huruf POUR dengan contoh penerapannya di web:'),
        difficulty: 2,
        left: [
          { id: 'p', label: t('Perceivable') },
          { id: 'o', label: t('Operable') },
          { id: 'u', label: t('Understandable') },
          { id: 'r', label: t('Robust') },
        ],
        right: [
          { id: 'r1', label: t('Semua menu dapat dibuka lewat tombol Tab & Enter') },
          { id: 'r2', label: t('Pesan error menjelaskan cara memperbaiki isian') },
          { id: 'r3', label: t('Gambar punya alt text dan video punya takarir') },
          { id: 'r4', label: t('HTML rapi dan valid di berbagai browser & pembaca layar') },
        ],
        answer: { p: 'r3', o: 'r1', u: 'r2', r: 'r4' },
        explainCorrect: t('Tepat sekali! P (Indra), O (Dioperasikan), U (Dipahami), R (Kokoh).'),
        tags: ['pour'],
      }),
      qStep(
        makeMcq({
          id: 'a10-l02-q2',
          type: 'analogy',
          prompt: t('Tombol ikon tanda silang "×" tanpa teks tertulis di sampingnya membutuhkan…'),
          choices: [
            { id: 'aria', label: t('Atribut aria-label="Tutup" di dalam tag <button>') },
            {
              id: 'div',
              label: t('Mengubahnya menjadi <div> polos tanpa teks apa pun'),
              explainWrong: t('Pembaca layar tidak tahu itu tombol tutup jika hanya berupa <div> dengan simbol ×.'),
            },
            {
              id: 'color',
              label: t('Mewarnai latar menjadi merah muda saja'),
              explainWrong: t('Warna tidak terbaca oleh screen reader.'),
            },
          ],
          answer: 'aria',
          explainCorrect: t('Benar! aria-label memberi label suara yang jelas bagi pembaca layar pada tombol ikon.'),
          tags: ['pour'],
        }),
      ),
      qStep({
        id: 'a10-l02-q3',
        type: 'spotbug',
        prompt: t('Ketuk baris kode HTML yang melanggar aturan pertama ARIA karena memakai <div> alih-alih tag HTML asli untuk tombol:'),
        difficulty: 2,
        lines: [
          '<header>',
          '  <div role="button" onclick="tutup()">X</div>',
          '  <button aria-label="Cari">Cari</button>',
          '</header>',
        ],
        answer: [2],
        explainCorrect: t('Jeli! Baris 2 memakai <div role="button"> yang tidak otomatis mendukung tombol Tab dan Enter. Pakailah <button> asli!'),
        tags: ['pour', 'semantik'],
      }),
      qStep(
        makeMcq({
          id: 'a10-l02-q4',
          type: 'limit',
          analogy: t('Fasilitas taman ramah berstandar internasional'),
          prompt: t('Apa kesalahan yang sering muncul ketika developer mengandalkan ARIA tanpa tag HTML asli?'),
          choices: [
            { id: 'kbd', label: t('Menambahkan role="button" pada <div> tidak otomatis memberi fungsi fokus Tab dan Enter') },
            {
              id: 'look',
              label: t('ARIA langsung mengubah warna huruf menjadi hijau'),
              explainWrong: t('ARIA tidak mengubah tampilan visual CSS.'),
            },
            {
              id: 'net',
              label: t('ARIA membuat ukuran gambar bertambah besar'),
              explainWrong: t('ARIA hanya atribut metadata teks pada HTML.'),
            },
          ],
          answer: 'kbd',
          explainCorrect: t('Tepat! Tag <button> asli sudah punya dukungan fokus dan Enter/Spasi dari browser secara gratis.'),
          tags: ['pour', 'semantik'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a10-l02-q5',
          type: 'scenario',
          story: t('Di halaman pendaftaran lomba, pesan error hanya menulis "Error 12!" tanpa menjelaskan kolom mana yang salah atau cara memperbaikinya.'),
          prompt: t('Prinsip POUR mana yang paling dilanggar oleh pesan error tersebut?'),
          difficulty: 2,
          choices: [
            { id: 'u', label: t('Understandable (dapat dipahami)') },
            {
              id: 'r',
              label: t('Robust (kode valid)'),
              explainWrong: t('Kode mungkin valid, tetapi bahasanya membingungkan pengguna.'),
            },
            {
              id: 'o',
              label: t('Operable (ukuran target sentuh)'),
              explainWrong: t('Masalah utamanya ada pada kejelasan bahasa dan petunjuk perbaikan error.'),
            },
          ],
          answer: 'u',
          explainCorrect: t('Benar! Prinsip Understandable meminta pesan error jelas dan memberi tahu cara memperbaikinya.'),
          tags: ['pour'],
        }),
      ),
      qStep({
        id: 'a10-l02-q6',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi singkatan empat prinsip pedoman aksesibilitas WCAG berikut:'),
        template: 'Perceivable, Operable, ___, ___',
        bank: ['Understandable', 'Robust', 'Reusable', 'Responsive'],
        answer: ['Understandable', 'Robust'],
        explainCorrect: t('Sempurna! P-O-U-R: Perceivable, Operable, Understandable, Robust.'),
        tags: ['pour'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a10-l02-r1',
        prompt: t(
          'Kalau ada tag HTML asli seperti <button>, kapan kita memakai ARIA tambahan?',
          'Menurut aturan pertama ARIA, kapan atribut ARIA sebaiknya digunakan?',
        ),
        choices: [
          { id: 'only', label: t('Hanya jika tag HTML biasa belum cukup menjelaskan peran elemen, seperti tombol ikon') },
          {
            id: 'always',
            label: t('Selalu ganti semua tag HTML menjadi <div> lalu pasang ARIA'),
            explainWrong: t('Selalu utamakan tag HTML semantik asli lebih dulu.'),
          },
        ],
        answer: 'only',
        explainCorrect: t('Gunakan HTML asli dulu; tambahkan ARIA seperlunya bila HTML biasa belum cukup.'),
        tags: ['pour', 'semantik'],
      }),
      makeMcq({
        id: 'a10-l02-r2',
        prompt: t(
          'Target tingkat kepatuhan WCAG yang umum dipakai website adalah…',
          'Pada standar WCAG, level kepatuhan yang menjadi target umum adalah…',
        ),
        choices: [
          { id: 'aa', label: t('Level AA') },
          {
            id: 'aaa',
            label: t('Wajib Level AAA di seluruh konten'),
            explainWrong: t('Level AAA sangat ketat untuk semua jenis konten; target umumnya adalah AA.'),
          },
        ],
        answer: 'aa',
        explainCorrect: t('Target praktis dan standar industri di sebagian besar situs adalah WCAG AA.'),
        tags: ['pour'],
      }),
    ],
    recap: t(
      'Empat syarat web ramah: bisa dilihat/didengar, bisa dipakai, mudah dipahami, dan kokoh.',
      'WCAG berpegang pada empat prinsip POUR (Perceivable, Operable, Understandable, Robust) dengan target umum AA serta aturan pertama ARIA.',
    ),
  }),

  makeLesson({
    id: 'a10-l03',
    worldId: 'a10',
    title: 'Daftar periksa aksesibilitas',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengecek tombol, gambar, warna, dan keyboard agar halaman web ramah semua orang.',
      'Aku bisa menerapkan daftar periksa aksesibilitas dasar mulai dari alt text, label form, kontras, fokus keyboard, target sentuh, hingga prefers-reduced-motion.',
    ),
    estMinutes: 5,
    introducesTerms: [],
    usesTerms: ['aksesibilitas', 'alt-text', 'semantik', 'kontras', 'rem-unit', 'fitts-law'],
    warmupFrom: 'a10-l02',
    steps: [
      storyStep('a10/daftar-periksa-taman.svg', [
        rText(
          'Sebelum taman dibuka untuk pengunjung, Pak Udin membawa papan daftar periksa: lampu cukup terang, papan arah jelas, jalur tidak licin, dan pintu mudah dibuka.',
          'Seperti petugas keselamatan memeriksa taman sebelum dibuka, developer memeriksa daftar periksa aksesibilitas dasar agar tidak ada pengguna yang tertinggal di belakang pintu tertutup.',
        ),
      ]),
      conceptStep({
        title: t('Gambar, Label, dan Tag Jelas', 'Alt Text, Semantik & Label Form'),
        visualName: 'HtmlTreeDiagram',
        visualProps: { worldId: 'a10', topic: 'checklist-html' },
        alt: t('Contoh gambar ber-alt, label terhubung ke input, dan HTML semantik.'),
        code: {
          lang: 'html',
          code: '<label for="email">Email</label>\n<input id="email" type="email">',
        },
        body: [
          rText('Beri ', 'Pasang '),
          rTerm('alt-text', 'teks alt', 'alt text'),
          rText(' pada gambar. Pakai ', ' pada gambar (alt="" untuk hiasan), gunakan '),
          rTerm('semantik', 'tag jelas', 'HTML semantik'),
          rText(', dan sambungkan label dengan input.', ', dan hubungkan <label for="..."> dengan id input.'),
        ],
      }),
      conceptStep({
        title: t('Warna Jelas Plus Ikon', 'Kontras 4.5:1 & Bukan Warna Saja'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a10', topic: 'checklist-warna' },
        alt: t('Perbandingan error hanya garis merah vs error dengan warna, ikon peringatan, dan teks.'),
        body: [
          rText('Jaga ', 'Jaga '),
          rTerm('kontras', 'kontras', 'rasio kontras'),
          rText(
            ' minimal 4,5 banding 1. Jangan pakai warna saja. Tambah ikon dan teks agar jelas.',
            ' minimal 4,5:1 untuk teks normal. Sampaikan error lewat warna + ikon + teks agar ramah pengguna buta warna.',
          ),
        ],
      }),
      conceptStep({
        title: t('Keyboard, Tombol Besar, dan Gerak Lembut', 'Keyboard, Focus, Target Sentuh & Gerak'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a10', topic: 'checklist-keyboard-gerak' },
        alt: t('Tombol fokus outline terlihat, target sentuh 44-48px, huruf rem, dan reduced motion.'),
        body: [
          rText('Pastikan bisa pakai keyboard '),
          rCode('Tab'),
          rText(
            ' dengan garis fokus jelas. Buat tombol selebar ',
            ' dengan outline fokus jelas. Jaga target sentuh ',
          ),
          rTerm('fitts-law', '44–48px', '44–48px'),
          rText(', huruf ', ', font '),
          rTerm('rem-unit', 'rem', 'rem'),
          rText(', dan kurangi animasi bila diminta.', ', dan hormati prefers-reduced-motion.'),
        ],
      }),
      limitStep({
        analogy: t('Daftar periksa keamanan taman sebelum dibuka'),
        same: [
          t('Menemukan kekurangan penting lebih awal sebelum banyak pengunjung mengalami kesulitan.'),
        ],
        different: [
          t('Pemeriksaan otomatis di DevTools Lighthouse hanya menangkap sebagian masalah seperti kontras atau alt hilang; menguji langsung memakai tombol Tab tanpa mouse tetap wajib dilakukan.'),
        ],
      }),
      simStep(
        'taman-akses',
        t(
          'Klik ketiga langkah di Pemeriksa Aksesibilitas untuk menandai ceklis taman ramah!',
          'Jalankan simulasi pemeriksaan aksesibilitas dasar dari gambar hingga pesan yang jelas.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a10-l03-q1',
          prompt: t('Mengapa menandai kolom formulir yang salah HANYA dengan warna merah dianggap tidak ramah aksesibilitas?'),
          choices: [
            { id: 'cb', label: t('Pengguna buta warna mungkin tidak bisa membedakan garis merah dari garis biasa') },
            {
              id: 'slow',
              label: t('Karena warna merah membuat internet lambat'),
              explainWrong: t('Warna merah tidak memperlambat jaringan.'),
            },
            {
              id: 'css',
              label: t('Karena browser tidak mengenal warna merah'),
              explainWrong: t('Browser mengenal warna merah; masalahnya ada pada pengguna buta warna.'),
            },
          ],
          answer: 'cb',
          explainCorrect: t('Benar! Tambahkan ikon peringatan dan tulisan jelas seperti "Email belum diisi".'),
          tags: ['aksesibilitas', 'kontras'],
        }),
      ),
      qStep({
        id: 'a10-l03-q2',
        type: 'sort',
        prompt: t('Kelompokkan praktik di bawah ini ke Ramah Aksesibilitas atau Kurang Ramah:'),
        difficulty: 2,
        items: [
          { id: 'g1', label: t('Menulis <label for="nama"> tersambung ke input') },
          { id: 'b1', label: t('Menghapus outline fokus tombol tanpa pengganti') },
          { id: 'g2', label: t('Ukuran tombol minimal 44–48px dengan jarak lega') },
          { id: 'b2', label: t('Mengunci zoom layar HP agar teks tak bisa dibesarkan') },
        ],
        bins: [
          { id: 'good', label: t('Ramah Aksesibilitas') },
          { id: 'bad', label: t('Kurang Ramah') },
        ],
        answer: { g1: 'good', b1: 'bad', g2: 'good', b2: 'bad' },
        explainCorrect: t('Tepat! Jangan pernah menghapus indikator fokus tanpa pengganti atau mengunci zoom pengguna.'),
        tags: ['aksesibilitas', 'fitts-law'],
      }),
      qStep(
        makeMcq({
          id: 'a10-l03-q3',
          type: 'analogy',
          prompt: t('Apa cara termudah menguji apakah website milikmu sudah lolos aturan navigasi keyboard?'),
          choices: [
            { id: 'nomouse', label: t('Lepaskan mouse lalu jelajahi seluruh halaman hanya pakai Tab, Shift+Tab, dan Enter') },
            {
              id: 'bright',
              label: t('Naikkan kecerahan layar laptop ke 100%'),
              explainWrong: t('Kecerahan layar tidak menguji fungsi tombol keyboard.'),
            },
            {
              id: 'wifi',
              label: t('Matikan Wi-Fi lalu lihat gambarnya'),
              explainWrong: t('Mematikan Wi-Fi tidak menguji alur fokus keyboard.'),
            },
          ],
          answer: 'nomouse',
          explainCorrect: t('Benar! Uji tanpa mouse langsung memperlihatkan tombol mana yang terlupakan atau kehilangan indikator fokus.'),
          tags: ['aksesibilitas'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a10-l03-q4',
          type: 'limit',
          analogy: t('Daftar periksa otomatis di browser'),
          prompt: t('Apa hal yang TIDAK bisa sepenuhnya digantikan oleh audit otomatis Lighthouse Accessibility?'),
          choices: [
            { id: 'human', label: t('Menguji langsung pakai keyboard dan memastikan kalimat serta urutan fokus masuk akal') },
            {
              id: 'ratio',
              label: t('Menghitung angka rasio kontras teks dan latar'),
              explainWrong: t('Menghitung rasio kontras bisa dilakukan alat otomatis.'),
            },
            {
              id: 'attr',
              label: t('Mengecek apakah elemen <img> lupa memiliki atribut alt'),
              explainWrong: t('Alat otomatis dapat mengecek keberadaan atribut alt.'),
            },
          ],
          answer: 'human',
          explainCorrect: t('Tepat! Alat otomatis membantu mendeteksi angka teknis, tetapi kenyamanan nyata tetap diuji manusia.'),
          tags: ['aksesibilitas'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a10-l03-q5',
          type: 'scenario',
          story: t('Bito mudah merasa pusing jika melihat kartu animasi yang terus berputar kencang di layar HP-nya.'),
          prompt: t('Pengaturan CSS apa yang sebaiknya dihormati pembuat website untuk membantu Bito?'),
          difficulty: 2,
          choices: [
            { id: 'prm', label: t('Mengurangi animasi saat preferensi prefers-reduced-motion aktif') },
            {
              id: 'fast',
              label: t('Mempercepat putaran animasi jadi dua kali lipat'),
              explainWrong: t('Animasi lebih cepat justru membuat pusing makin parah.'),
            },
            {
              id: 'lock',
              label: t('Memaksa ukuran huruf tidak bisa diubah'),
              explainWrong: t('Mengunci zoom huruf juga melanggar aksesibilitas.'),
            },
          ],
          answer: 'prm',
          explainCorrect: t('Benar! Media query prefers-reduced-motion menonaktifkan atau melambatkan animasi bagi pengguna yang sensitif gerak.'),
          tags: ['aksesibilitas'],
        }),
      ),
      qStep({
        id: 'a10-l03-q6',
        type: 'spotbug',
        prompt: t('Ketuk baris CSS yang berbahaya bagi pengguna keyboard karena menghilangkan penanda kotak yang sedang terpilih:'),
        difficulty: 2,
        lines: [
          'button {',
          '  min-height: 48px;',
          '  outline: none;',
          '  font-size: 1rem;',
          '}',
        ],
        answer: [3],
        explainCorrect: t('Jeli! Baris 3 menghapus outline fokus tanpa menyediakan gaya pengganti, sehingga pengguna keyboard tersesat.'),
        tags: ['aksesibilitas'],
      }),
      qStep({
        id: 'a10-l03-q7',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi pasangan HTML aksesibel agar pembaca layar mengenali label untuk input email:'),
        template: '<label ___="email">Email</label>\n<input ___="email" type="email">',
        bank: ['for', 'id', 'alt', 'class'],
        answer: ['for', 'id'],
        explainCorrect: t('Tepat! Nilai atribut for pada <label> harus sama persis dengan atribut id pada <input>.'),
        tags: ['aksesibilitas', 'semantik'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a10-l03-r1',
        prompt: t('Berapakah rasio kontras minimal WCAG AA untuk teks biasa agar mudah dibaca?'),
        choices: [
          { id: 'c45', label: t('Minimal 4,5 : 1') },
          {
            id: 'c11',
            label: t('1,1 : 1 sudah cukup'),
            explainWrong: t('1,1 : 1 hampir sama warnanya dengan latar sehingga sangat sulit dibaca.'),
          },
        ],
        answer: 'c45',
        explainCorrect: t('Teks normal minimal memiliki rasio kontras 4,5 : 1.'),
        tags: ['kontras', 'aksesibilitas'],
      }),
      makeTf({
        id: 'a10-l03-r2',
        prompt: t('Untuk gambar hiasan murni, kita tetap menulis alt="" agar pembaca layar melewatinya tanpa membacakan nama file.'),
        answer: true,
        explainCorrect: t('Betul! alt="" membuat gambar hiasan tidak mengganggu pendengaran pengguna pembaca layar.'),
        explainWrong: t('Hampir! Menulis alt="" memang cara tepat menandai gambar dekoratif.'),
        tags: ['alt-text', 'aksesibilitas'],
      }),
    ],
    recap: t(
      'Cek alt gambar, label isian, kontras, warna + ikon, tombol besar, huruf rem, dan tombol Tab.',
      'Terapkan daftar periksa a11y: alt text, HTML semantik, label terhubung, kontras 4.5:1, info tak bergantung warna saja, navigasi keyboard dengan indikator fokus, target 44–48px, huruf rem, dan prefers-reduced-motion.',
    ),
    companion: {
      talkPrompts: [
        'Ayo coba buka satu website di laptop lalu tekan tombol Tab berkali-kali tanpa menyentuh mouse—apakah selalu kelihatan sedang ada di tombol mana?',
      ],
      offlineActivity:
        'Buat papan "Tanda Peringatan Ramah Semua" di kertas: jangan hanya pakai warna merah, tambahkan ikon seru dan tulisan singkat jelas.',
    },
  }),
];
