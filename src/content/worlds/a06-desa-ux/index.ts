import {
  conceptStep,
  limitStep,
  makeAnchorMcq,
  makeLesson,
  makeMcq,
  makeTf,
  qStep,
  rBold,
  rTerm,
  rText,
  simStep,
  storyStep,
  t,
} from '@/content/lessonHelpers';
import type { Lesson, World } from '@/content/schema';

export const world: World = {
  id: 'a06',
  track: 'A',
  order: 6,
  title: 'Desa UX',
  tagline: t(
    'Mendengarkan pengguna sebelum menggambar dan menguji rancangan.',
    'Memahami empati pengguna, Design Thinking, persona, user flow, wireframe–prototype, dan usability testing.',
  ),
  color: '#0E9AA7',
  illustration: 'a06-desa-ux',
  sourceChapters: ['J1-07'],
  requires: ['a05'],
  lessons: ['a06-l01', 'a06-l02', 'a06-l03', 'a06-l04', 'a06-l05'],
  sideQuests: [],
  boss: {
    title: 'Tantangan Penjaga Desa UX',
    greeting: t(
      'Selamat datang di Desa UX! Ayo buktikan kamu siap mendengarkan dan menguji demi pengguna!',
      'Uji penguasaanmu tentang riset empati, Design Thinking, persona, user flow, prototype, dan usability testing.',
    ),
    guardianName: 'Penjaga Desa UX',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'a06-anc-j1',
        prompt: t('Apa maksud aturan utama UX "Kamu bukan penggunamu"?'),
        choices: [
          { id: 'ask', label: t('Hal yang jelas menurut pembuat belum tentu mudah bagi pemakai, jadi harus bertanya') },
          {
            id: 'ban',
            label: t('Pembuat website dilarang membuka aplikasinya sendiri'),
            explainWrong: t('Pembuat tetap menguji aplikasinya, namun tidak boleh hanya menebak selera sendiri.'),
          },
          {
            id: 'same',
            label: t('Semua pengguna di dunia punya kesukaan yang persis sama'),
            explainWrong: t('Kebiasaan dan kebutuhan pengguna sangat beragam.'),
          },
        ],
        answer: 'ask',
        explainCorrect: t('Tepat! Desainer harus mencari tahu kebutuhan pengguna nyata, bukan mengira-ngira.'),
        tags: ['ux'],
      }),
      makeAnchorMcq({
        id: 'a06-anc-j2',
        prompt: t('Pada Design Thinking seperti dokter, langkah pertama sebelum merumuskan masalah adalah…'),
        choices: [
          { id: 'emp', label: t('Empathize (mendengarkan dan mengamati pengguna)') },
          {
            id: 'code',
            label: t('Langsung menulis semua kode aplikasi'),
            explainWrong: t('Menulis kode di awal tanpa memahami masalah berisiko membuat produk yang keliru.'),
          },
          {
            id: 'paint',
            label: t('Memilih gambar hiasan paling mahal'),
            explainWrong: t('Tampilan dipilih setelah masalah dan ide solusinya jelas.'),
          },
        ],
        answer: 'emp',
        explainCorrect: t('Benar! Seperti dokter menanyakan keluhan, desainer mendengarkan pengguna terlebih dahulu.'),
        tags: ['design-thinking'],
      }),
      makeAnchorMcq({
        id: 'a06-anc-j3',
        prompt: t('Sketsa hitam-putih polos seperti denah pensil yang fokus menata letak bagian halaman disebut…'),
        choices: [
          { id: 'wf', label: t('Wireframe') },
          {
            id: 'pr',
            label: t('Prototype berwarna'),
            explainWrong: t('Prototype sudah menyerupai tampilan jadi dan dapat diklik.'),
          },
          {
            id: 'ab',
            label: t('Usability testing'),
            explainWrong: t('Usability testing adalah kegiatan mengamati pengguna mencoba rancangan.'),
          },
        ],
        answer: 'wf',
        explainCorrect: t('Tepat! Wireframe menjaga tim fokus pada tata letak sebelum sibuk mewarnai.'),
        tags: ['wireframe'],
      }),
      makeAnchorMcq({
        id: 'a06-anc-j4',
        prompt: t('Sekitar berapa orang peserta yang umumnya sudah cukup untuk menemukan sebagian besar masalah saat usability testing?'),
        choices: [
          { id: 'five', label: t('5 orang') },
          {
            id: 'one',
            label: t('Cukup 0 orang, cukup ditebak saja'),
            explainWrong: t('Menebak tanpa menguji membuat masalah tersembunyi tidak ketahuan.'),
          },
          {
            id: 'mill',
            label: t('Minimal 10.000 orang'),
            explainWrong: t('Lima pengguna nyata sudah menyingkap mayoritas hambatan utama.'),
          },
        ],
        answer: 'five',
        explainCorrect: t('Benar! Mengamati 5 pengguna berbeda sudah sangat ampuh menemukan masalah alur.'),
        tags: ['usability-testing'],
      }),
      makeAnchorMcq({
        id: 'a06-anc-j5',
        type: 'limit',
        analogy: t('Design Thinking seperti dokter memeriksa pasien'),
        prompt: t('Di mana batas kemiripan antara kerja dokter dan proses Design Thinking?'),
        choices: [
          { id: 'many', label: t('Desainer bebas menguji banyak contoh ide untuk banyak pengguna tanpa risiko bahaya fisik') },
          {
            id: 'ask',
            label: t('Keduanya memulai dengan bertanya dan mendengarkan keluhan'),
            explainWrong: t('Ini bagian yang memang mirip antara dokter dan UX designer.'),
          },
          {
            id: 'check',
            label: t('Keduanya mengevaluasi kembali kalau hasilnya belum berhasil'),
            explainWrong: t('Ini juga persamaan proses berulangnya.'),
          },
        ],
        answer: 'many',
        explainCorrect: t('Tepat! Pada rancangan digital kita bisa membuat banyak prototype kasar untuk diuji sebelum rilis.'),
        tags: ['design-thinking'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a06-anc-p1',
        prompt: t('Apa perbedaan paling mendasar antara user flow dan user journey?'),
        choices: [
          { id: 'uj', label: t('User flow memetakan langkah di dalam layar aplikasi, sedangkan user journey mencakup emosi dan kejadian di luar aplikasi') },
          {
            id: 'rev',
            label: t('User flow berisi perasaan marah pengguna, sedangkan user journey berisi kode CSS'),
            explainWrong: t('Justru user journey yang memuat emosi dan konteks sebelum/sesudah memakai aplikasi.'),
          },
          {
            id: 'same',
            label: t('Keduanya hanya istilah lain untuk database pengguna'),
            explainWrong: t('Keduanya adalah alat pemetaan pengalaman UX, bukan database.'),
          },
        ],
        answer: 'uj',
        explainCorrect: t('Benar. User journey melihat gambaran besar sebelum kenal produk hingga setelah selesai memakai.'),
        tags: ['user-flow'],
      }),
      makeAnchorMcq({
        id: 'a06-anc-p2',
        prompt: t('Sifat UX yang memastikan produk dapat dipakai semua orang termasuk penyandang disabilitas disebut…'),
        choices: [
          { id: 'acc', label: t('Accessible') },
          {
            id: 'des',
            label: t('Desirable'),
            explainWrong: t('Desirable berarti tampil menarik sehingga orang senang kembali.'),
          },
          {
            id: 'cred',
            label: t('Credible'),
            explainWrong: t('Credible berarti terlihat tepercaya dan aman.'),
          },
        ],
        answer: 'acc',
        explainCorrect: t('Tepat. Accessible memastikan akses setara bagi pengguna dengan beragam kemampuan dan kondisi.'),
        tags: ['ux'],
      }),
      makeAnchorMcq({
        id: 'a06-anc-p3',
        prompt: t('Manakah contoh penerapan konsep Affordance yang baik pada antarmuka web?'),
        choices: [
          { id: 'aff', label: t('Tombol aksi utama dibuat tampak timbul dan jelas bentuknya sehingga mengundang untuk ditekan') },
          {
            id: 'hide',
            label: t('Tautan penting dibuat persis sama warna dan bentuknya dengan teks biasa'),
            explainWrong: t('Tautan yang disamarkan justru menghilangkan petunjuk bahwa ia bisa diklik.'),
          },
          {
            id: 'slow',
            label: t('Menghilangkan semua pesan balasan setelah pengguna menekan Kirim'),
            explainWrong: t('Itu masalah ketiadaan Feedback, bukan affordance.'),
          },
        ],
        answer: 'aff',
        explainCorrect: t('Benar. Affordance adalah petunjuk visual dari bentuk elemen tentang cara menggunakannya.'),
        tags: ['ux', 'ui'],
      }),
      makeAnchorMcq({
        id: 'a06-anc-p4',
        prompt: t('Mengapa tim produk membuat prototype sebelum menulis kode aplikasi penuh?'),
        choices: [
          { id: 'cost', label: t('Untuk menguji alur klik dan menemukan kesalahan lebih dini saat biaya perbaikannya masih murah') },
          {
            id: 'nohtml',
            label: t('Karena prototype otomatis menggantikan HTML dan server di produksi'),
            explainWrong: t('Aplikasi akhir tetap harus dibangun dengan kode frontend dan backend.'),
          },
          {
            id: 'color',
            label: t('Karena programmer tidak boleh melihat warna desain'),
            explainWrong: t('Justru mockup dan prototype membantu programmer memahami rancangan dengan jelas.'),
          },
        ],
        answer: 'cost',
        explainCorrect: t('Tepat. Makin awal hambatan alur ditemukan sebelum coding, makin hemat waktu dan biaya.'),
        tags: ['prototype'],
      }),
      makeAnchorMcq({
        id: 'a06-anc-p5',
        prompt: t('Sikap manakah yang menjadi kesalahan paling fatal saat memandu sesi usability testing?'),
        choices: [
          { id: 'help', label: t('Langsung menunjuk tombol yang benar setiap kali peserta terlihat ragu') },
          {
            id: 'note',
            label: t('Mencatat bagian mana peserta berhenti atau bertanya'),
            explainWrong: t('Mencatat titik bingung adalah tujuan utama sesi ini.'),
          },
          {
            id: 'silent',
            label: t('Membiarkan peserta mencoba menyelesaikan tugasnya sendiri'),
            explainWrong: t('Membiarkan peserta mencoba mandiri menunjukkan kenyataan sebenarnya.'),
          },
        ],
        answer: 'help',
        explainCorrect: t('Benar! Membantu peserta menyembunyikan masalah desain yang nanti akan membingungkan pengguna asli.'),
        tags: ['usability-testing'],
      }),
      makeAnchorMcq({
        id: 'a06-anc-p6',
        type: 'limit',
        analogy: t('Wireframe–Mockup–Prototype seperti denah, gambar 3D, dan rumah contoh'),
        prompt: t('Apa perbedaan penting antara rumah contoh fisik dan prototype digital?'),
        choices: [
          { id: 'iter', label: t('Prototype digital dapat diubah, digandakan, dan diuji ulang dalam hitungan menit tanpa membongkar bangunan') },
          {
            id: 'early',
            label: t('Kesalahan lebih murah diperbaiki pada tahap sketsa awal'),
            explainWrong: t('Ini persamaan utama antara arsitektur rumah dan desain UX.'),
          },
          {
            id: 'enter',
            label: t('Keduanya dibuat agar calon pemakai bisa mencoba alurnya'),
            explainWrong: t('Ini juga merupakan persamaan konsepnya.'),
          },
        ],
        answer: 'iter',
        explainCorrect: t('Tepat! Kemudahan revisi di prototype digital mempercepat siklus belajar dan perbaikan UX.'),
        tags: ['prototype', 'wireframe'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'a06-l01',
    worldId: 'a06',
    title: 'Kamu bukan penggunamu',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku paham bahwa aplikasi dibuat agar mudah bagi pemakainya, bukan cuma ikut seleraku.',
      'Aku bisa menerapkan pola pikir user-centered dan menilai UX lewat enam sifat utamanya.',
    ),
    estMinutes: 5,
    introducesTerms: [],
    usesTerms: ['ux', 'ui'],
    warmupFrom: 'a05-l04',
    steps: [
      storyStep('a06/tukang-sepatu.svg', [
        rText(
          'Tukang sepatu di desa membuat semua sepatu persis seukuran kakinya sendiri. Akibatnya, seluruh warga kesempitan atau kebesaran!',
          'Jika pembuat sepatu hanya memakai ukuran kakinya untuk seluruh penduduk desa, hampir semua orang tersiksa. Hal yang jelas bagi pembuat sering membingungkan pemakai.',
        ),
      ]),
      conceptStep({
        title: t('Ingat: Kamu Bukan Penggunamu', 'Inti UX: Kamu Bukan Penggunamu'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'empati-pengguna' },
        alt: t('Pembuat dan pengguna melihat aplikasi yang sama dengan sudut pandang berbeda.'),
        body: [
          rText(
            'Tugas ',
            'Inti ',
          ),
          rTerm('ux', 'UX', 'UX'),
          rText(
            ' adalah bertanya dan mencari tahu kebutuhan pemakai. Jangan hanya menebak sendiri.',
            ' adalah mencari tahu lewat pengamatan nyata, bukan menebak dari asumsi kita sendiri.',
          ),
        ],
      }),
      conceptStep({
        title: t('Tiga Syarat Dasar UX', 'Useful, Usable, dan Findable'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'tiga-syarat-ux' },
        alt: t('Tiga pilar UX: berguna, mudah dipakai tanpa diajari, dan cepat ditemukan.'),
        body: [
          rBold('Useful', 'Useful'),
          rText(' artinya berguna. ', ' (berguna menyelesaikan masalah), '),
          rBold('Usable', 'Usable'),
          rText(' mudah dipakai tanpa diajari. ', ' (mudah dipakai tanpa diajari), dan '),
          rBold('Findable', 'Findable'),
          rText(' artinya tombol cepat ditemukan.', ' (menu dan info cepat ditemukan).'),
        ],
      }),
      conceptStep({
        title: t('Aman, Ramah, dan Disukai', 'Credible, Accessible, Desirable'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'enam-kualitas-ux' },
        alt: t('Aplikasi tepercaya, ramah semua pengguna, dan menyenangkan dipakai kembali.'),
        body: [
          rBold('Credible', 'Credible'),
          rText(' terasa aman. ', ' (terlihat tepercaya), '),
          rBold('Accessible', 'Accessible'),
          rText(' ramah untuk semua orang. ', ' (bisa diakses semua orang termasuk disabilitas), dan '),
          rBold('Desirable', 'Desirable'),
          rText(' bikin orang senang kembali.', ' (menyenangkan sehingga orang ingin kembali).'),
        ],
      }),
      limitStep({
        analogy: t('Tukang sepatu mengukur kaki sendiri untuk warga desa'),
        same: [
          t('Pembuat produk tidak boleh memakai ukuran dan kebiasaan dirinya sendiri sebagai patokan semua orang.'),
        ],
        different: [
          t('Sepatu dibuat berbeda-beda ukuran fisiknya, sedangkan satu aplikasi harus langsung bisa menyesuaikan beragam pengguna lewat tampilan dan alur yang jelas.'),
        ],
      }),
      simStep(
        'desa-ux',
        t(
          'Lihat langkah kerja di Desa UX yang selalu dimulai dari mendengarkan pengguna!',
          'Telusuri urutan kerja UX pada simulator agar solusi selalu berangkat dari kebutuhan pengguna.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a06-l01-q1',
          type: 'analogy',
          prompt: t('Membuat aplikasi hanya berdasarkan selera pembuatnya mirip dengan…'),
          choices: [
            { id: 'shoe', label: t('Tukang sepatu yang membuat seluruh sepatu memakai ukuran kakinya sendiri') },
            {
              id: 'tailor',
              label: t('Penjahit yang mengukur baju setiap pelanggan sebelum menjahit'),
              explainWrong: t('Justru mengukur pelanggan adalah sikap UX yang benar.'),
            },
            {
              id: 'chef',
              label: t('Koki yang bertanya tingkat kepedasan kesukaan tamu'),
              explainWrong: t('Bertanya kepada tamu berarti mendengarkan pengguna.'),
            },
          ],
          answer: 'shoe',
          explainCorrect: t('Tepat! Apa yang pas di kaki kita belum tentu nyaman di kaki orang lain.'),
          tags: ['ux'],
        }),
      ),
      qStep({
        id: 'a06-l01-q2',
        type: 'match',
        prompt: t('Pasangkan sifat UX yang baik dengan artinya:'),
        difficulty: 2,
        left: [
          { id: 'u1', label: t('Useful') },
          { id: 'u2', label: t('Usable') },
          { id: 'u3', label: t('Findable') },
          { id: 'u4', label: t('Accessible') },
        ],
        right: [
          { id: 'r1', label: t('Menyelesaikan masalah nyata') },
          { id: 'r2', label: t('Bisa dipakai tanpa diajari') },
          { id: 'r3', label: t('Cepat menemukan yang dibutuhkan') },
          { id: 'r4', label: t('Bisa dipakai semua orang termasuk penyandang disabilitas') },
        ],
        answer: { u1: 'r1', u2: 'r2', u3: 'r3', u4: 'r4' },
        explainCorrect: t('Mantap! Keenam sifat itu jadi pegangan penting saat menilai kualitas UX.'),
        tags: ['ux'],
      }),
      qStep(
        makeTf({
          id: 'a06-l01-q3',
          prompt: t('Kalau tombol terasa jelas menurut pembuat aplikasinya, semua pengguna baru pasti langsung paham juga.'),
          answer: false,
          explainCorrect: t('Benar, itu keliru! Pembuat sudah hafal letaknya, sedangkan pengguna baru melihatnya pertama kali.'),
          explainWrong: t('Hampir! Ingat aturan emas: kamu bukan penggunamu.'),
          tags: ['ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l01-q4',
          type: 'limit',
          analogy: t('Tukang sepatu desa'),
          prompt: t('Apa batas dari perumpamaan sepatu ukuran tunggal bila dibandingkan dengan website?'),
          difficulty: 2,
          choices: [
            { id: 'adapt', label: t('Satu website harus bisa melayani berbagai ukuran layar dan kebutuhan pengguna sekaligus') },
            {
              id: 'ask',
              label: t('Pembuat perlu mengenal kebutuhan pemakainya lebih dulu'),
              explainWrong: t('Itu memang persamaan utamanya.'),
            },
            {
              id: 'fit',
              label: t('Produk yang tidak pas akan membuat pemakai kesulitan'),
              explainWrong: t('Itu juga bagian yang serupa.'),
            },
          ],
          answer: 'adapt',
          explainCorrect: t('Benar! Web yang baik ramah di banyak perangkat dan kondisi pemakai dalam satu sistem.'),
          tags: ['ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l01-q5',
          type: 'scenario',
          story: t('Bito membuat website jadwal belajar yang fiturnya lengkap, tetapi tombol "Simpan" disembunyikan di dalam tiga menu kecil sehingga Bu Laras terus gagal menyimpan.'),
          prompt: t('Sifat UX manakah yang paling perlu diperbaiki Bito?'),
          difficulty: 2,
          choices: [
            { id: 'uf', label: t('Usable dan Findable (mudah ditemukan dan mudah dipakai)') },
            {
              id: 'be',
              label: t('Menambah ratusan fitur baru lagi'),
              explainWrong: t('Menambah fitur justru membuat tombol utama makin tenggelam.'),
            },
            {
              id: 'dark',
              label: t('Mengubah nama domain situsnya'),
              explainWrong: t('Nama domain tidak menyelesaikan tombol simpan yang tersembunyi.'),
            },
          ],
          answer: 'uf',
          explainCorrect: t('Tepat! Fitur berguna tidak ada artinya jika tombolnya susah dicari dan susah dipakai.'),
          tags: ['ux', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l01-q6',
          type: 'why',
          base: 'ux-research',
          prompt: t('Mengapa tugas utama desainer UX adalah mencari tahu, bukan menebak?'),
          difficulty: 2,
          choices: [
            { id: 'real', label: t('Karena tebakan pembuat sering meleset dari kebiasaan dan kesulitan asli pengguna') },
            {
              id: 'slow',
              label: t('Karena menebak membutuhkan listrik lebih besar'),
              explainWrong: t('Alasannya adalah menghindari rancangan yang tidak sesuai kebutuhan pengguna.'),
            },
            {
              id: 'law',
              label: t('Karena browser akan memblokir halaman yang tidak diwawancarai'),
              explainWrong: t('Browser tidak memeriksa proses riset; manusia penggunanyalah yang merasakan dampaknya.'),
            },
          ],
          answer: 'real',
          explainCorrect: t('Benar! Bertanya langsung menghindarkan tim membangun fitur yang salah sasaran.'),
          tags: ['ux'],
        }),
      ),
      qStep({
        id: 'a06-l01-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi sifat UX yang menunjukkan tampilan terasa aman, profesional, dan tepercaya:'),
        difficulty: 2,
        template: 'Enam sifat UX baik: Useful, Usable, Findable, ___, Accessible, dan Desirable.',
        bank: ['Credible', 'Hidden', 'Random'],
        answer: ['Credible'],
        explainCorrect: t('Tepat! Credible membangun rasa percaya pengguna saat bertransaksi atau mengisi data.'),
        tags: ['ux'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a06-l01-r1',
        prompt: t('Jika pengguna bingung mencari letak tombol pencarian di aplikasi, sifat UX mana yang kurang?'),
        choices: [
          { id: 'f', label: t('Findable (mudah dicari)') },
          { id: 'c', label: t('Credible (dipercaya)'), explainWrong: t('Credible soal rasa aman dan profesional, sedangkan soal letak adalah Findable.') },
        ],
        answer: 'f',
        explainCorrect: t('Findable berarti pengguna cepat menemukan hal yang dibutuhkan.'),
        tags: ['ux'],
      }),
      makeTf({
        id: 'a06-l01-r2',
        prompt: t('Tugas UX adalah menebak keinginan pengguna di dalam ruangan tertutup tanpa bertanya.'),
        answer: false,
        explainCorrect: t('Betul, pernyataan itu salah! Tugas UX adalah mencari tahu langsung dari pengguna.'),
        explainWrong: t('Hampir! Menebak tanpa bukti berisiko membuat aplikasi tidak terpakai.'),
        tags: ['ux'],
      }),
    ],
    recap: t(
      'Kamu bukan penggunamu. Dengarkan pemakai agar aplikasi berguna, mudah dipakai, aman, dan ramah semua orang.',
      'Mulailah desain dari pengguna nyata (bukan asumsi pribadi) untuk memenuhi sifat Useful, Usable, Findable, Credible, Accessible, dan Desirable.',
    ),
    companion: {
      talkPrompts: ['Pernahkah orang tua dan anak melihat satu tombol di aplikasi dengan cara berbeda? Tombol apa itu?'],
      offlineActivity: 'Minta anggota keluarga mencoba membuka satu menu baru di perangkat rumah tanpa diberi tahu caranya, lalu amati bagian mana yang bikin ragu.',
    },
  }),

  makeLesson({
    id: 'a06-l02',
    worldId: 'a06',
    title: 'Design thinking: seperti dokter',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengurutkan 5 langkah mencari solusi untuk pengguna seperti cara dokter.',
      'Aku bisa menjelaskan lima tahap Design Thinking yang berulang (iteratif) beserta fungsi tiap tahapnya.',
    ),
    estMinutes: 5,
    introducesTerms: ['design-thinking'],
    usesTerms: ['ux'],
    stickerId: 'dokter-ux',
    warmupFrom: 'a06-l01',
    steps: [
      storyStep('a06/dokter-ux.svg', [
        rText(
          'Saat kamu sakit, dokter tidak langsung memberi obat! Dokter menanyakan keluhan, menentukan sakitnya, memilih cara sembuh, lalu mengecek apakah sudah membaik.',
          'Dokter yang bijak tidak pernah langsung menulis resep sebelum bertanya keluhan, menegakkan diagnosis, mempertimbangkan terapi, mencoba resep, lalu memantau pemulihan pasien.',
        ),
      ]),
      conceptStep({
        title: t('Langkah 1 & 2: Pahami dan Rumuskan', 'Empathize dan Define'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'empathize-define' },
        alt: t('Tahap Empathize bertanya ke pengguna dan tahap Define menentukan satu masalah utama.'),
        body: [
          rText('Dalam '),
          rTerm('design-thinking', 'Design Thinking', 'Design Thinking'),
          rText(
            ', tahap 1 ',
            ', tahap 1 ',
          ),
          rBold('Empathize', 'Empathize'),
          rText(
            ' itu bertanya ke pengguna. Tahap 2 ',
            ' menggali masalah lewat wawancara/pengamatan, lalu ',
          ),
          rBold('Define', 'Define'),
          rText(' memilih satu masalah utama.', ' merumuskan satu masalah inti secara jelas.'),
        ],
      }),
      conceptStep({
        title: t('Langkah 3, 4, 5: Ide, Contoh, Uji', 'Ideate, Prototype, dan Test'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'ideate-prototype-test' },
        alt: t('Tahap Ideate mengumpulkan ide, Prototype membuat contoh, dan Test menguji ke pengguna.'),
        body: [
          rBold('Ideate', 'Ideate'),
          rText(' mengumpulkan banyak ide. ', ' menggali banyak ide tanpa langsung menghakimi, '),
          rBold('Prototype', 'Prototype'),
          rText(' membuat contoh kasar. ', ' membuat contoh kasar yang bisa dicoba, lalu '),
          rBold('Test', 'Test'),
          rText(' mengujinya ke pengguna asli.', ' mengujinya ke pengguna asli untuk diperbaiki.'),
        ],
      }),
      conceptStep({
        title: t('Boleh Berputar Kembali', 'Proses Berulang (Iteratif)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'siklus-berputar' },
        alt: t('Panah melingkar dari Test kembali ke Define atau Prototype saat hasil perlu diperbaiki.'),
        body: [
          rText(
            'Kalau hasil uji belum bagus, ulangi lagi seperti dokter mengganti resep. Proses ',
            'Proses ',
          ),
          rTerm('ux', 'UX', 'UX'),
          rText(
            ' tidak lurus sekali jadi.',
            ' bersifat iteratif: bila tahap Test menyingkap masalah baru, tim bisa kembali ke Ideate atau Define.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Design Thinking seperti dokter memeriksa pasien'),
        same: [
          t('Sama-sama mendengarkan dulu, menentukan inti masalah, mencoba solusi, lalu memantau hasilnya.'),
        ],
        different: [
          t('Dokter tidak boleh sembarangan bereksperimen obat ke tubuh manusia, sedangkan desainer UX sangat dianjurkan mencoba banyak sketsa ide kasar terlebih dahulu.'),
        ],
      }),
      simStep(
        'desa-ux',
        t(
          'Klik langkah 1 sampai 3 pada alur kerja UX untuk melihat perjalanannya!',
          'Ikuti alur tahapan Design Thinking dari Empathize, Define, hingga Prototype dan Test pada simulator.',
        ),
      ),
      qStep({
        id: 'a06-l02-q1',
        type: 'order',
        prompt: t('Urutkan lima langkah Design Thinking dari awal sampai akhir:'),
        difficulty: 2,
        items: [
          { id: 'ide', label: t('3. Ideate (Kumpulkan banyak ide)') },
          { id: 'emp', label: t('1. Empathize (Pahami pengguna)') },
          { id: 'tst', label: t('5. Test (Uji ke pengguna asli)') },
          { id: 'def', label: t('2. Define (Rumuskan masalah utama)') },
          { id: 'pro', label: t('4. Prototype (Buat contoh kasar)') },
        ],
        answer: ['emp', 'def', 'ide', 'pro', 'tst'],
        explainCorrect: t('Hebat! Empathize → Define → Ideate → Prototype → Test.'),
        tags: ['design-thinking'],
      }),
      qStep(
        makeMcq({
          id: 'a06-l02-q2',
          type: 'analogy',
          prompt: t('Saat dokter mendengarkan semua keluhan pasien sebelum memberi resep, itu mirip tahap…'),
          choices: [
            { id: 'emp', label: t('Empathize') },
            {
              id: 'tst',
              label: t('Test'),
              explainWrong: t('Test dilakukan setelah solusi dibuat untuk mengecek apakah sudah membaik.'),
            },
            {
              id: 'pro',
              label: t('Prototype'),
              explainWrong: t('Prototype adalah membuat contoh kasar solusinya.'),
            },
          ],
          answer: 'emp',
          explainCorrect: t('Benar! Empathize berarti mendengarkan dan mengamati situasi pengguna lebih dulu.'),
          tags: ['design-thinking'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a06-l02-q3',
          prompt: t('Design Thinking selalu berjalan lurus satu kali saja dan tidak pernah kembali ke tahap sebelumnya.'),
          answer: false,
          explainCorrect: t('Benar, pernyataan itu salah! Proses ini berulang: jika uji coba kurang pas, kita perbaiki lagi.'),
          explainWrong: t('Hampir! Sama seperti dokter mengecek pasien lagi, Design Thinking berputar memperbaiki hasil.'),
          tags: ['design-thinking'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l02-q4',
          type: 'limit',
          analogy: t('Dokter memeriksa pasien'),
          prompt: t('Perbedaan apa yang berlaku pada Design Thinking dibanding pekerjaan dokter sungguhan?'),
          difficulty: 2,
          choices: [
            { id: 'exp', label: t('Desainer bebas menguji banyak ide kasar sebelum membuat aplikasi jadi') },
            {
              id: 'ask',
              label: t('Harus mencari akar masalah sebelum memilih solusi'),
              explainWrong: t('Itu persamaan penting antara dokter dan desainer UX.'),
            },
            {
              id: 'eval',
              label: t('Memantau hasil setelah solusi dicoba'),
              explainWrong: t('Evaluasi setelah solusi dicoba juga persamaan keduanya.'),
            },
          ],
          answer: 'exp',
          explainCorrect: t('Tepat! Sketsa kasar aplikasi sangat aman dan murah untuk diuji berkali-kali.'),
          tags: ['design-thinking'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l02-q5',
          type: 'scenario',
          story: t('Tim Raka langsung membuat aplikasi selama 3 bulan tanpa bertanya ke calon pemakai. Setelah jadi, tidak ada warga yang mau memakai karena tidak sesuai masalah mereka.'),
          prompt: t('Tahap awal mana yang dilewati tim Raka?'),
          difficulty: 2,
          choices: [
            { id: 'ed', label: t('Empathize dan Define (memahami pengguna dan merumuskan masalahnya)') },
            {
              id: 'color',
              label: t('Memilih warna ungu yang lebih cerah'),
              explainWrong: t('Aplikasi yang tidak memecahkan masalah pengguna tetap ditinggalkan meski warnanya cerah.'),
            },
            {
              id: 'server',
              label: t('Menambah kecepatan server'),
              explainWrong: t('Masalahnya bukan di server, melainkan di ketidakcocokan solusi dengan kebutuhan pengguna.'),
            },
          ],
          answer: 'ed',
          explainCorrect: t('Benar! Tanpa Empathize dan Define, tim bisa bekerja keras membangun hal yang tidak dibutuhkan.'),
          tags: ['design-thinking', 'ux'],
        }),
      ),
      qStep({
        id: 'a06-l02-q6',
        type: 'match',
        prompt: t('Pasangkan tahap Design Thinking dengan kegiatan utamanya:'),
        difficulty: 2,
        left: [
          { id: 'def', label: t('Define') },
          { id: 'ide', label: t('Ideate') },
          { id: 'tst', label: t('Test') },
        ],
        right: [
          { id: 'rdef', label: t('Merumuskan satu masalah inti dengan jelas') },
          { id: 'ride', label: t('Mengumpulkan banyak ide tanpa langsung mengkritik') },
          { id: 'rtst', label: t('Mengamati pengguna asli mencoba rancangan') },
        ],
        answer: { def: 'rdef', ide: 'ride', tst: 'rtst' },
        explainCorrect: t('Keren! Setiap tahap memiliki peran khusus sebelum produk dirilis.'),
        tags: ['design-thinking'],
      }),
      qStep({
        id: 'a06-l02-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Apa nama tahap ketiga dalam Design Thinking saat tim mengumpulkan sebanyak mungkin ide solusi sebelum menilainya?'),
        difficulty: 2,
        accept: ['ideate'],
        explainCorrect: t('Tepat! Tahap Ideate membuka ruang bagi sebanyak mungkin alternatif solusi.'),
        tags: ['design-thinking'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a06-l02-r1',
        prompt: t('Langkah pertama dalam Design Thinking adalah…'),
        choices: [
          { id: 'e', label: t('Empathize (memahami pengguna)') },
          { id: 't', label: t('Test (uji hasil akhir)'), explainWrong: t('Test adalah tahap kelima setelah prototype dibuat.') },
        ],
        answer: 'e',
        explainCorrect: t('Empathize menjadi pintu masuk agar kita paham siapa yang dibantu.'),
        tags: ['design-thinking'],
      }),
      makeTf({
        id: 'a06-l02-r2',
        prompt: t('Pada tahap Ideate, tim langsung menolak ide-ide aneh sebelum sempat dicatat.'),
        answer: false,
        explainCorrect: t('Betul, pernyataan itu salah! Pada Ideate, kita kumpulkan banyak ide dulu tanpa langsung menilai.'),
        explainWrong: t('Hampir! Menilai terlalu cepat mematikan ide kreatif yang mungkin sangat berguna.'),
        tags: ['design-thinking'],
      }),
    ],
    recap: t(
      'Design Thinking berputar lewat 5 langkah: Empathize, Define, Ideate, Prototype, dan Test.',
      'Design Thinking memandu pemecahan masalah secara iteratif mulai dari empati pengguna hingga pengujian prototype.',
    ),
    companion: {
      talkPrompts: ['Kalau kita mau merancang tas sekolah baru, apa saja pertanyaan Empathize yang bisa ditanyakan ke teman?'],
      offlineActivity: 'Amati barang yang sering bikin kesal di rumah (Define), lalu tuliskan 5 ide perbaikan lucu maupun serius (Ideate).',
    },
  }),

  makeLesson({
    id: 'a06-l03',
    worldId: 'a06',
    title: 'Persona, user flow, user journey',
    modes: ['pro'],
    objective: t('Aku bisa menyusun persona berbasis riset, membedakan user flow dan user journey, serta mengenali istilah UX penting.'),
    estMinutes: 6,
    introducesTerms: ['persona', 'user-flow'],
    usesTerms: ['ux', 'design-thinking'],
    warmupFrom: 'a06-l02',
    steps: [
      storyStep('a06/peta-sutradara.svg', [
        rText('Sebelum merekam film, sutradara membuat profil tokoh utama serta papan urutan adegan dari awal sampai akhir agar seluruh kru merancang adegan untuk sosok yang sama.'),
      ]),
      conceptStep({
        title: t('Persona Berbasis Riset'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'kartu-persona' },
        alt: t('Kartu persona Rani 21 tahun berisi tujuan, kesulitan, dan kebiasaan pakai HP.'),
        body: [
          rTerm('persona', 'Persona'),
          rText(' adalah tokoh rekaan hasil riset yang mewakili kelompok pengguna (berisi tujuan, kesulitan, dan kebiasaan). Misalnya: Rani, mahasiswi berkuota terbatas yang mengakses lewat HP.'),
        ],
      }),
      conceptStep({
        title: t('User Flow vs User Journey'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'a06', topic: 'user-flow-journey' },
        alt: t('Urutan layar user flow dari buka aplikasi hingga bayar serta perasaan user journey.'),
        body: [
          rTerm('user-flow', 'User flow'),
          rText(' memetakan langkah di dalam layar (Buka → Cari → Detail → Keranjang → Bayar). Sebaliknya, '),
          rBold('user journey'),
          rText(' lebih luas: mencatat emosi dan kejadian di luar layar, seperti kesal karena ongkir mahal.'),
        ],
      }),
      conceptStep({
        title: t('Kamus Istilah UX Harian'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'kamus-istilah-ux' },
        alt: t('Istilah IA, pain point, affordance, feedback, friction, microcopy, dan MVP.'),
        body: [
          rText('Kenali istilah inti: '),
          rBold('Information Architecture'),
          rText(' (menata lorong supermarket), '),
          rBold('Pain point'),
          rText(' & '),
          rBold('Friction'),
          rText(' (hambatan), '),
          rBold('Affordance'),
          rText(' (petunjuk bentuk klik), '),
          rBold('Feedback'),
          rText(' (tanggapan sistem), '),
          rBold('Microcopy'),
          rText(' (teks kecil tombol/error), serta '),
          rBold('MVP'),
          rText(' (versi paling sederhana yang sudah bisa diuji).'),
        ],
      }),
      limitStep({
        analogy: t('Papan cerita film untuk persona dan user flow'),
        same: [
          t('Menyatukan pemahaman seluruh tim tentang siapa tokohnya dan bagaimana alur perjalanannya.'),
        ],
        different: [
          t('Karakter film dibuat dari imajinasi penulis, sedangkan persona wajib dibangun dari hasil riset nyata dan alur aplikasi punya banyak cabang aksi pengguna.'),
        ],
      }),
      simStep(
        'desa-ux',
        t('Tinjau alur tahapan kerja UX untuk memastikan persona dan user flow selalu berangkat dari data riset.'),
      ),
      qStep(
        makeMcq({
          id: 'a06-l03-q1',
          prompt: t('Manakah perbedaan paling akurat antara user flow dan user journey?'),
          difficulty: 2,
          choices: [
            { id: 'uj', label: t('User flow menggambarkan langkah di dalam aplikasi, sedangkan user journey mencakup perasaan dan kejadian sebelum maupun sesudah memakai aplikasi') },
            {
              id: 'code',
              label: t('User flow ditulis memakai CSS, sedangkan user journey memakai HTML'),
              explainWrong: t('Keduanya adalah diagram perencanaan UX sebelum penulisan kode.'),
            },
            {
              id: 'one',
              label: t('User journey hanya berisi satu tombol saja'),
              explainWrong: t('User journey merangkum perjalanan lengkap lintas titik kontak.'),
            },
          ],
          answer: 'uj',
          explainCorrect: t('Benar! Misalnya keluhan soal biaya ongkir atau menunggu kurir termasuk bagian user journey.'),
          tags: ['user-flow', 'ux'],
        }),
      ),
      qStep({
        id: 'a06-l03-q2',
        type: 'match',
        prompt: t('Pasangkan istilah UX berikut dengan maknanya yang tepat:'),
        difficulty: 2,
        left: [
          { id: 'pp', label: t('Pain point') },
          { id: 'af', label: t('Affordance') },
          { id: 'fb', label: t('Feedback') },
          { id: 'fr', label: t('Friction') },
        ],
        right: [
          { id: 'rpp', label: t('Titik yang membuat pengguna kesal atau terhambat') },
          { id: 'raf', label: t('Petunjuk dari bentuk benda tentang cara memakainya') },
          { id: 'rfb', label: t('Tanggapan sistem atas aksi, misal pesan "Tersimpan"') },
          { id: 'rfr', label: t('Hambatan yang memperlambat, misal form terlalu panjang') },
        ],
        answer: { pp: 'rpp', af: 'raf', fb: 'rfb', fr: 'rfr' },
        explainCorrect: t('Mantap! Menguasai kosa kata ini membuat diskusi desain dan pengembangan jauh lebih tepat.'),
        tags: ['ux'],
      }),
      qStep({
        id: 'a06-l03-q3',
        type: 'order',
        prompt: t('Urutkan user flow penyelesaian tugas belanja di aplikasi toko online:'),
        difficulty: 1,
        items: [
          { id: 'det', label: t('Lihat detail produk') },
          { id: 'pay', label: t('Bayar pesanan') },
          { id: 'open', label: t('Buka aplikasi') },
          { id: 'cart', label: t('Masukkan ke keranjang') },
          { id: 'find', label: t('Cari produk') },
        ],
        answer: ['open', 'find', 'det', 'cart', 'pay'],
        explainCorrect: t('Tepat! Buka aplikasi → Cari produk → Lihat detail → Keranjang → Bayar.'),
        tags: ['user-flow'],
      }),
      qStep(
        makeMcq({
          id: 'a06-l03-q4',
          type: 'limit',
          analogy: t('Profil karakter dan naskah film'),
          prompt: t('Apa yang TIDAK boleh dilakukan saat menyusun persona seperti membuat tokoh film?'),
          difficulty: 2,
          choices: [
            { id: 'fake', label: t('Mengarang sifat dan kebutuhan pengguna secara asal tanpa melakukan riset terlebih dahulu') },
            {
              id: 'team',
              label: t('Memakai tokoh tersebut agar seluruh tim memiliki satu sasaran yang sama'),
              explainWrong: t('Menyatukan pemahaman tim justru manfaat utama persona.'),
            },
            {
              id: 'goal',
              label: t('Mencantumkan tujuan dan kebiasaan pengguna'),
              explainWrong: t('Tujuan dan kebiasaan memang bagian penting persona.'),
            },
          ],
          answer: 'fake',
          explainCorrect: t('Benar! Persona bukan karangan bebas, melainkan rangkuman pola nyata hasil riset pengguna.'),
          tags: ['persona'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l03-q5',
          type: 'scenario',
          story: t('Di halaman daftar aplikasi Nadia, banyak calon pendaftar berhenti di tengah karena harus mengisi 22 kolom sekaligus, dan label tombolnya hanya bertulis "Proses" tanpa penjelasan jelas.'),
          prompt: t('Kombinasi masalah UX manakah yang sedang terjadi?'),
          difficulty: 3,
          choices: [
            { id: 'fm', label: t('Friction tinggi (form kepanjangan) dan microcopy kurang jelas') },
            {
              id: 'mvp',
              label: t('Kelebihan feedback positif'),
              explainWrong: t('Pengguna justru terhambat dan bingung, bukan mendapat umpan balik yang jelas.'),
            },
            {
              id: 'ia',
              label: t('Affordance tombol terlalu cepat'),
              explainWrong: t('Affordance tidak memiliki ukuran kecepatan; masalahnya ada pada panjang form dan teks tombol.'),
            },
          ],
          answer: 'fm',
          explainCorrect: t('Tepat! Memotong jumlah kolom mengurangi friction, dan microcopy tombol yang jelas meningkatkan konversi.'),
          tags: ['ux'],
        }),
      ),
      qStep({
        id: 'a06-l03-q6',
        type: 'fill',
        prompt: t('Lengkapi istilah UX berikut: Cara mengelompokkan dan memberi nama isi halaman seperti menata lorong supermarket disebut ___ architecture.'),
        difficulty: 2,
        template: '___ architecture',
        bank: ['Information', 'Conversion', 'Onboarding'],
        answer: ['Information'],
        explainCorrect: t('Tepat! Information Architecture (IA) memastikan pengguna mudah menemukan letak informasi.'),
        tags: ['ux'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a06-l03-r1',
        prompt: t('Versi paling sederhana dari sebuah produk yang sudah bisa dipakai dan diuji ke pengguna nyata disebut…'),
        choices: [
          { id: 'mvp', label: t('MVP (Minimum Viable Product)') },
          { id: 'ia', label: t('Information Architecture'), explainWrong: t('IA adalah cara menata dan mengelompokkan isi halaman.') },
        ],
        answer: 'mvp',
        explainCorrect: t('MVP memungkinkan tim menguji ide inti secepat mungkin tanpa menunggu seluruh fitur lengkap.'),
        tags: ['ux'],
      }),
      makeTf({
        id: 'a06-l03-r2',
        prompt: t('Teks kecil pada antarmuka seperti label tombol dan pesan error termasuk microcopy / UX writing.'),
        answer: true,
        explainCorrect: t('Betul! Microcopy yang ramah dan jelas sangat membantu mencegah kebingungan pengguna.'),
        explainWrong: t('Label tombol, petunjuk isian, dan pesan error memang bagian dari microcopy.'),
        tags: ['ux'],
      }),
    ],
    recap: t('Gunakan persona berbasis riset, petakan user flow & journey, serta minimalkan friction lewat IA, affordance, feedback, dan microcopy yang jelas.'),
  }),

  makeLesson({
    id: 'a06-l04',
    worldId: 'a06',
    title: 'Wireframe, mockup, prototype',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan denah kasar (wireframe), gambar berwarna (mockup), dan contoh bisa diklik (prototype).',
      'Aku bisa menjelaskan peran wireframe, mockup, dan prototype untuk menekan biaya revisi sebelum coding.',
    ),
    estMinutes: 5,
    introducesTerms: ['prototype'],
    usesTerms: ['wireframe', 'ux', 'ui', 'design-thinking'],
    stickerId: 'denah-rumah',
    warmupFrom: 'a06-l03',
    steps: [
      storyStep('a06/denah-rumah.svg', [
        rText(
          'Sebelum membangun rumah, arsitek menggambar denah pensil dulu. Lalu dibuat gambar 3D berwarna, lalu rumah contoh yang pintunya bisa dibuka!',
          'Membangun rumah dilakukan bertahap dari denah garis kasar, gambar 3D berwarna, hingga rumah contoh yang bisa dimasuki. Merancang web juga melewati tiga tahap tersebut.',
        ),
      ]),
      conceptStep({
        title: t('Denah Hitam-Putih: Wireframe', 'Tahap 1: Wireframe'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'wireframe-denah' },
        alt: t('Sketsa wireframe hitam putih berisi kotak posisi gambar, judul, dan tombol.'),
        body: [
          rTerm('wireframe', 'Wireframe', 'Wireframe'),
          rText(
            ' itu sketsa kasar hitam-putih. Fokus menata letak bagian halaman sebelum memilih warna.',
            ' adalah sketsa struktur hitam-putih. Fokus utamanya menata hierarki dan letak bagian halaman, belum membahas warna atau foto.',
          ),
        ],
      }),
      conceptStep({
        title: t('Gambar Jadi & Versi Bisa Diklik', 'Tahap 2 & 3: Mockup dan Prototype'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'mockup-dan-prototype' },
        alt: t('Mockup gambar berwarna statis dan prototype yang menghubungkan antarlayar saat diklik.'),
        body: [
          rBold('Mockup', 'Mockup'),
          rText(' sudah penuh warna dan huruf, tapi diam. ', ' memberi warna, huruf, dan gaya visual lengkap (statis). '),
          rTerm('prototype', 'Prototype', 'Prototype'),
          rText(' sudah bisa dicoba klik seperti asli.', ' menghubungkan layar agar bisa diklik guna menguji alur.'),
        ],
      }),
      conceptStep({
        title: t('Cepat Ketahuan, Hemat Tenaga', 'Mengapa Harus Bertahap?'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'hemat-biaya-revisi' },
        alt: t('Grafik biaya perbaikan murah di wireframe dan mahal setelah menulis kode penuh.'),
        body: [
          rText(
            'Mengubah garis pensil jauh lebih mudah daripada membongkar tembok. Uji rancangan sebelum menulis kode!',
            'Makin awal kesalahan alur ketahuan di wireframe atau prototype, makin murah dan cepat memperbaikinya dibanding membongkar kode program.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Membangun rumah: denah (wireframe), 3D (mockup), rumah contoh (prototype)'),
        same: [
          t('Menguji tata ruang sebelum bahan bangunan atau kode terpasang permanen.'),
        ],
        different: [
          t('Rumah contoh fisik butuh biaya besar dan lama dibangun, sedangkan prototype digital dapat direvisi atau diganti warnanya dalam hitungan menit.'),
        ],
      }),
      simStep(
        'desa-ux',
        t(
          'Lihat di mana tahap Prototype bekerja dalam alur UX di Desa UX!',
          'Amati posisi tahap Prototype dan Test sebelum tim melangkah ke penulisan kode.',
        ),
      ),
      qStep({
        id: 'a06-l04-q1',
        type: 'order',
        prompt: t('Urutkan tiga tahap rancangan desain dari paling kasar sampai yang sudah bisa dicoba klik:'),
        difficulty: 1,
        items: [
          { id: 'mk', label: t('Mockup (gambar jadi berwarna)') },
          { id: 'pr', label: t('Prototype (bisa diklik pindah halaman)') },
          { id: 'wf', label: t('Wireframe (sketsa kasar hitam-putih)') },
        ],
        answer: ['wf', 'mk', 'pr'],
        explainCorrect: t('Tepat! Wireframe (susunan) → Mockup (tampilan visual) → Prototype (interaktif).'),
        tags: ['wireframe', 'prototype'],
      }),
      qStep(
        makeMcq({
          id: 'a06-l04-q2',
          type: 'analogy',
          prompt: t('Gambar 3D rumah yang cat dan perabotnya sudah cantik, tetapi pintunya belum bisa dibuka, mirip dengan…'),
          choices: [
            { id: 'mk', label: t('Mockup') },
            {
              id: 'wf',
              label: t('Wireframe'),
              explainWrong: t('Wireframe masih berupa sketsa garis hitam-putih tanpa warna cat.'),
            },
            {
              id: 'pr',
              label: t('Prototype'),
              explainWrong: t('Pada prototype, tombol/pintu sudah bisa diklik dan dicoba alurnya.'),
            },
          ],
          answer: 'mk',
          explainCorrect: t('Benar! Mockup menampilkan hasil visual akhir, namun belum memiliki alur klik interaktif.'),
          tags: ['prototype', 'ui'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a06-l04-q3',
          prompt: t('Saat membuat wireframe awal, kita sebaiknya langsung sibuk memilih kombinasi warna gradasi yang rumit.'),
          answer: false,
          explainCorrect: t('Betul, pernyataan itu salah! Wireframe dibuat hitam-putih supaya fokus dulu ke susunan tata letak.'),
          explainWrong: t('Hampir! Warna dan gaya visual baru dipilih nanti pada tahap mockup.'),
          tags: ['wireframe'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l04-q4',
          type: 'limit',
          analogy: t('Denah dan rumah contoh fisik'),
          prompt: t('Apa perbedaan prototype aplikasi dibanding membangun rumah contoh fisik?'),
          difficulty: 2,
          choices: [
            { id: 'fast', label: t('Prototype digital dapat diubah, digeser, dan diperbanyak hanya dalam hitungan detik') },
            {
              id: 'cheap',
              label: t('Kesalahan lebih murah ditemukan sebelum bangunan atau kode jadi'),
              explainWrong: t('Itu justru persamaan utamanya.'),
            },
            {
              id: 'try',
              label: t('Calon pemakai bisa merasakan alurnya lebih awal'),
              explainWrong: t('Ini juga persamaan keduanya.'),
            },
          ],
          answer: 'fast',
          explainCorrect: t('Tepat! Prototype web sangat fleksibel diedit ulang berkali-kali setelah mendapat masukan.'),
          tags: ['prototype'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l04-q5',
          type: 'scenario',
          story: t('Tim Dimas ingin memastikan pembeli paham urutan klik dari memilih sepatu sampai membayar sebelum programmer menulis kode satu baris pun.'),
          prompt: t('Rancangan apakah yang paling cocok dibuat tim Dimas sekarang?'),
          difficulty: 2,
          choices: [
            { id: 'pr', label: t('Prototype yang bisa diklik dari halaman produk ke pembayaran') },
            {
              id: 'wf',
              label: t('Cukup foto warna cat merek di kertas'),
              explainWrong: t('Foto warna saja tidak menguji alur klik antarhalaman.'),
            },
            {
              id: 'db',
              label: t('Langsung membangun database server dulu'),
              explainWrong: t('Alur klik harus diuji di prototype sebelum masuk ke pembangunan sistem penuh.'),
            },
          ],
          answer: 'pr',
          explainCorrect: t('Benar! Prototype menguji pengalaman alur klik secara nyata sebelum coding dimulai.'),
          tags: ['prototype', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l04-q6',
          type: 'why',
          base: 'early-testing',
          prompt: t('Mengapa kesalahan desain jauh lebih baik ditemukan pada tahap wireframe atau prototype daripada setelah aplikasi selesai dikoding?'),
          difficulty: 2,
          choices: [
            { id: 'save', label: t('Karena memperbaiki sketsa atau prototype jauh lebih cepat dan murah daripada menulis ulang kode') },
            {
              id: 'css',
              label: t('Karena CSS tidak bisa diubah lagi setelah file disimpan'),
              explainWrong: t('CSS bisa diubah, tetapi membongkar alur kode dan database yang sudah terikat memakan banyak waktu.'),
            },
            {
              id: 'font',
              label: t('Karena browser hanya mau membuka website yang pernah digambar di kertas'),
              explainWrong: t('Browser tidak tahu apakah ada sketsa kertas; manfaatnya adalah efisiensi tim.'),
            },
          ],
          answer: 'save',
          explainCorrect: t('Tepat! Memindah kotak di Figma cuma butuh detik, sedangkan merombak fitur di kode butuh berhari-hari.'),
          tags: ['wireframe', 'prototype'],
        }),
      ),
      qStep({
        id: 'a06-l04-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi urutan istilah tiga tahap rancangan UX:'),
        difficulty: 2,
        template: 'Sketsa hitam-putih disebut ___, tampilan warna statis disebut mockup, dan versi interaktif bisa diklik disebut prototype.',
        bank: ['wireframe', 'persona', 'hosting'],
        answer: ['wireframe'],
        explainCorrect: t('Benar! Wireframe meletakkan kerangka struktur di awal sebelum masuk ke detail visual.'),
        tags: ['wireframe', 'prototype'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a06-l04-r1',
        prompt: t('Tahap rancangan yang masih hitam-putih polos untuk fokus pada tata letak adalah…'),
        choices: [
          { id: 'wf', label: t('Wireframe') },
          { id: 'mk', label: t('Mockup'), explainWrong: t('Mockup sudah lengkap warna dan jenis hurufnya.') },
        ],
        answer: 'wf',
        explainCorrect: t('Wireframe seperti denah pensil yang fokus ke susunan isi.'),
        tags: ['wireframe'],
      }),
      makeMcq({
        id: 'a06-l04-r2',
        prompt: t('Tahap rancangan yang tombolnya sudah bisa diklik pindah halaman untuk diuji adalah…'),
        choices: [
          { id: 'pr', label: t('Prototype') },
          { id: 'mk', label: t('Mockup statis'), explainWrong: t('Mockup masih berupa gambar diam.') },
        ],
        answer: 'pr',
        explainCorrect: t('Prototype membolehkan pengguna mencoba alur interaksi sebelum coding.'),
        tags: ['prototype'],
      }),
    ],
    recap: t(
      'Rancang bertahap dari wireframe (denah), mockup (gambar berwarna), hingga prototype (bisa diklik).',
      'Mulai dari wireframe untuk struktur, lanjut mockup untuk visual, lalu prototype untuk uji alur sebelum menulis kode.',
    ),
    companion: {
      talkPrompts: ['Kalau mau bikin aplikasi catatan PR, lebih cepat bikin denah kotak pakai pensil dulu atau langsung mewarnai?'],
      offlineActivity: 'Gambar 1 wireframe kotak-kotak hitam putih untuk halaman beranda toko mainan di buku tulis dalam 3 menit.',
    },
  }),

  makeLesson({
    id: 'a06-l05',
    worldId: 'a06',
    title: 'Usability testing',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa tahu cara mengajak 5 teman menguji rancangan tanpa mendikte mereka.',
      'Aku bisa merencanakan usability testing, menjaga sikap netral saat observasi, dan memahami A/B testing.',
    ),
    estMinutes: 5,
    introducesTerms: ['usability-testing'],
    usesTerms: ['ux', 'prototype', 'design-thinking'],
    warmupFrom: 'a06-l04',
    steps: [
      storyStep('a06/uji-papan-main.svg', [
        rText(
          'Sari membuat papan permainan baru. Ia mengajak 5 teman memainkannya tanpa ia bantu sama sekali, lalu ia mencatat di mana mereka bingung!',
          'Sebelum menerbitkan papan permainan buatannya, Sari meminta beberapa teman mencoba bermain sendiri sambil ia diam mencatat bagian aturan mana yang membingungkan.',
        ),
      ]),
      conceptStep({
        title: t('Amati Pemakai Asli Tanpa Dibantu', 'Apa Itu Usability Testing?'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'observasi-usability-testing' },
        alt: t('Penguji mengamati dan mencatat saat peserta mencoba prototype aplikasi.'),
        body: [
          rTerm('usability-testing', 'Usability testing', 'Usability testing'),
          rText(
            ' adalah mengajak orang mencoba rancangan kita. Jangan dibantu! Catat di mana mereka berhenti atau bingung.',
            ' meminta pengguna mencoba rancangan sambil diamati titik hambatannya. Diam dan catatlah—jangan membimbing tangan mereka.',
          ),
        ],
      }),
      conceptStep({
        title: t('Lima Orang Sudah Cukup Ampuh', 'Aturan 5 Pengguna & Sikap Netral'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'lima-pengguna' },
        alt: t('Lima ikon pengguna sudah menyingkap mayoritas hambatan desain.'),
        body: [
          rText(
            'Cukup 5 orang sudah bisa menemukan sebagian besar masalah. Ingat, yang diuji adalah aplikasinya, bukan kepintaran orangnya.',
            'Menguji kepada 5 pengguna saja sudah menemukan sebagian besar masalah. Jika peserta salah klik, desainlah yang harus diperbaiki, bukan menyalahkan pengguna.',
          ),
        ],
      }),
      conceptStep({
        title: t('Membandingkan Dua Pilihan', 'A/B Testing dan Conversion'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'ab-testing-conversion' },
        alt: t('Perbandingan tombol versi A dan versi B untuk mengukur mana yang lebih banyak dipilih.'),
        body: [
          rText(
            'Kita bisa membandingkan dua desain A dan B. Lihat mana yang lebih berhasil.',
            'Setelah dirilis, tim juga memakai A/B testing untuk membandingkan dua versi halaman secara nyata guna mengukur mana yang menghasilkan conversion lebih tinggi.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Mengamati teman mencoba papan permainan baru'),
        same: [
          t('Kita melihat langsung bagian mana pemain berhenti atau salah paham tanpa dibisiki jawaban.'),
        ],
        different: [
          t('Jika empat dari lima teman bingung di papan permainan, aturannya mungkin diubah di cetakan; di aplikasi web, perbaikan bisa langsung diuji lewat A/B testing kepada ribuan pemakai.'),
        ],
      }),
      simStep(
        'desa-ux',
        t(
          'Lihat tahap akhir di Desa UX tempat Prototype diuji kepada pemakai asli!',
          'Telusuri tahap Prototype & Test pada alur UX untuk melihat mengapa umpan balik langsung sangat menentukan.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a06-l05-q1',
          prompt: t('Saat teman mencoba prototype buatanmu dan dia bingung mencari tombol Bayar, sikap terbaikmu adalah…'),
          choices: [
            { id: 'obs', label: t('Tetap tenang mengamati dan mencatat mengapa tombol itu sulit ia temukan') },
            {
              id: 'point',
              label: t('Langsung menunjuk layarnya sambil berkata "Itu tombolnya di pojok!"'),
              explainWrong: t('Kalau dibantu, kamu tidak tahu cara pengguna asli nanti tersesat saat sendirian.'),
            },
            {
              id: 'blame',
              label: t('Memarahinya karena dianggap kurang teliti melihat layar'),
              explainWrong: t('Dalam UX, pengguna bukan objek ujian—desainlah yang diuji.'),
            },
          ],
          answer: 'obs',
          explainCorrect: t('Tepat! Titik kebingungan itu adalah emas berharga untuk memperbaiki desainmu.'),
          tags: ['usability-testing'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a06-l05-q2',
          prompt: t('Menguji kepada lima orang saja sudah cukup untuk menemukan sebagian besar masalah besar pada tampilan.'),
          answer: true,
          explainCorrect: t('Betul! Uji kecil ke 5 orang sudah cepat menemukan pola kebingungan yang berulang.'),
          explainWrong: t('Hampir! Kamu tidak perlu menunggu seribu peserta untuk mulai menemukan masalah desain.'),
          tags: ['usability-testing'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l05-q3',
          type: 'analogy',
          prompt: t('Meminta teman mencoba permainan baru sendirian tanpa kita bocorkan caranya mirip kegiatan…'),
          choices: [
            { id: 'ut', label: t('Usability testing') },
            {
              id: 'wf',
              label: t('Membuat wireframe'),
              explainWrong: t('Wireframe adalah menggambar sketsa kasarnya, bukan mengamati orang mencobanya.'),
            },
            {
              id: 'css',
              label: t('Menulis media query'),
              explainWrong: t('Media query adalah aturan CSS untuk ukuran layar.'),
            },
          ],
          answer: 'ut',
          explainCorrect: t('Benar! Usability testing menguji apakah rancangan mudah dipahami tanpa petunjuk pembuatnya.'),
          tags: ['usability-testing'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l05-q4',
          type: 'limit',
          analogy: t('Menguji papan permainan ke teman'),
          prompt: t('Jika 4 dari 5 penguji aplikasi gagal menemukan tombol Simpan, kesimpulan mana yang SALAH?'),
          difficulty: 2,
          choices: [
            { id: 'err', label: t('Berarti penggunanya yang kurang pintar, desainnya tidak perlu diubah') },
            {
              id: 'fix',
              label: t('Berarti letak atau bentuk tombol Simpan perlu dibuat lebih jelas'),
              explainWrong: t('Itu kesimpulan yang benar!'),
            },
            {
              id: 'retest',
              label: t('Setelah diperbaiki, rancangan perlu diuji ulang'),
              explainWrong: t('Menguji ulang setelah revisi memang langkah yang tepat.'),
            },
          ],
          answer: 'err',
          explainCorrect: t('Tepat! Jika banyak orang gagal pada bagian yang sama, masalahnya pasti ada pada desain antarmuka.'),
          tags: ['usability-testing', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l05-q5',
          type: 'scenario',
          story: t('Nadia ingin tahu apakah tombol warna hijau bertulis "Daftar Gratis" atau tombol biru bertulis "Mulai Sekarang" lebih banyak diklik oleh pengunjung situsnya.'),
          prompt: t('Cara terbaik membandingkan kedua versi itu ke pengunjung nyata adalah…'),
          difficulty: 2,
          choices: [
            { id: 'ab', label: t('A/B testing (memperlihatkan versi A dan versi B ke dua kelompok pengunjung lalu hitung hasilnya)') },
            {
              id: 'coin',
              label: t('Melempar koin tanpa melihat data pengunjung'),
              explainWrong: t('Melempar koin tidak membuktikan mana yang lebih jelas bagi pengguna.'),
            },
            {
              id: 'both',
              label: t('Menaruh kedua tombol itu bersebelahan untuk aksi yang persis sama'),
              explainWrong: t('Dua tombol untuk satu aksi sama justru membuat pengguna bingung memilih.'),
            },
          ],
          answer: 'ab',
          explainCorrect: t('Benar! A/B testing membandingkan performa dua variasi desain langsung berdasarkan perilaku pengguna.'),
          tags: ['usability-testing', 'ux'],
        }),
      ),
      qStep({
        id: 'a06-l05-q6',
        type: 'sort',
        prompt: t('Kelompokkan tindakan saat memandu usability testing ke "Lakukan" atau "Hindari":'),
        difficulty: 2,
        items: [
          { id: 's1', label: t('Mencatat di bagian mana peserta berhenti atau ragu') },
          { id: 's2', label: t('Langsung menunjuk tombol yang benar saat peserta bingung') },
          { id: 's3', label: t('Meminta peserta menceritakan apa yang sedang ia pikirkan') },
          { id: 's4', label: t('Membela desain dan menyalahkan peserta') },
        ],
        bins: [
          { id: 'do', label: t('Lakukan ✓') },
          { id: 'dont', label: t('Hindari ✗') },
        ],
        answer: { s1: 'do', s2: 'dont', s3: 'do', s4: 'dont' },
        explainCorrect: t('Luar biasa! Penguji yang baik mengamati dengan netral tanpa membimbing atau membela diri.'),
        tags: ['usability-testing'],
      }),
      qStep({
        id: 'a06-l05-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Istilah UX saat pengguna akhirnya melakukan aksi yang diharapkan (seperti mendaftar atau menyelesaikan pembelian) disebut…'),
        difficulty: 2,
        accept: ['conversion', 'konversi'],
        explainCorrect: t('Tepat! Conversion mengukur persentase pengguna yang menuntaskan tujuan utama alur.'),
        tags: ['ux'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a06-l05-r1',
        prompt: t('Mengapa kita tidak boleh membantu peserta mengklik tombol saat sesi usability testing?'),
        choices: [
          { id: 'ok', label: t('Agar ketahuan di mana pengguna asli bisa tersesat saat memakai sendirian') },
          { id: 'no', label: t('Supaya sesi ujiannya menjadi sangat lama'), explainWrong: t('Tujuannya adalah melihat kebingungan nyata pengguna tanpa bantuan.') },
        ],
        answer: 'ok',
        explainCorrect: t('Pengamatan jujur tanpa bantuan membuka titik hambatan yang tersembunyi.'),
        tags: ['usability-testing'],
      }),
      makeTf({
        id: 'a06-l05-r2',
        prompt: t('A/B testing adalah membandingkan dua versi tampilan ke pengguna asli untuk melihat mana yang lebih berhasil.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('A/B testing membantu mengambil keputusan berdasarkan data perilaku pengguna nyata.'),
        tags: ['usability-testing'],
      }),
    ],
    recap: t(
      'Ajak 5 orang mencoba rancangan tanpa dibantu untuk menemukan bagian yang membingungkan.',
      'Lakukan usability testing ke sekitar 5 pengguna secara netral tanpa menuntun, dan gunakan A/B testing untuk membandingkan variasi.',
    ),
    companion: {
      talkPrompts: ['Kalau teman bingung memakai aplikasi buatan kita, siapa yang perlu diperbaiki: teman atau desain aplikasinya?'],
      offlineActivity: 'Minta satu teman atau keluarga memesan atau mencari satu menu di aplikasi yang belum pernah ia pakai tanpa dibantu, lalu catat titik bingungnya.',
    },
  }),
];
