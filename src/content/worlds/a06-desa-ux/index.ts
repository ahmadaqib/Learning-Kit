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
  rTerm,
  rText,
  simStep,
  storyStep,
  t,
} from '@/content/lessonHelpers';
import type { Lesson, World } from '@/content/schema';

/**
 * Soal jangkar = soal biasa ditambah pilihan "Belum tahu". Sama dengan `makeAnchorMcq`,
 * tetapi menerima `hints` supaya soal jangkar Junior juga punya petunjuk (copydeck 6.4).
 */
function anchorMcq(params: Parameters<typeof makeMcq>[0]) {
  return makeMcq({
    ...params,
    choices: [...params.choices, { id: 'unknown', label: t('Belum tahu') }],
  });
}

export const world: World = {
  id: 'a06',
  track: 'A',
  order: 6,
  title: 'Desa UX',
  tagline: t(
    'Dengarkan dulu orang yang akan memakai halamanmu. Lalu gambar dan coba rancanganmu.',
    'Kamu bisa meneliti kebutuhan pemakai, membuat sketsa rancangan, dan mengujinya.',
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
      'Selamat datang di Desa UX. Ayo tunjukkan kamu pandai mendengarkan dan mencoba bersama pemakai!',
      'Kamu sudah melewati Desa UX. Buktikan kamu bisa meneliti, merancang, dan menguji.',
    ),
    guardianName: 'Penjaga Desa UX',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      anchorMcq({
        id: 'a06-anc-j1',
        prompt: t('Pembuat aplikasi sudah hafal letak tombol. Apa yang sebaiknya ia lakukan?'),
        choices: [
          { id: 'ask', label: t('Meminta orang lain mencoba') },
          {
            id: 'ban',
            label: t('Menebak dari selera sendiri'),
            explainWrong: t('Selera pembuat belum tentu sama dengan orang lain. Lebih baik bertanya.'),
          },
          {
            id: 'same',
            label: t('Mengira semua orang sama sepertinya'),
            explainWrong: t('Setiap orang punya kebiasaan sendiri. Dengarkan dulu kebiasaan mereka.'),
          },
        ],
        answer: 'ask',
        explainCorrect: t(
          'Orang lain melihat aplikasimu dengan mata baru. Seperti teman yang pertama kali memainkan permainan buatanmu.',
          'Pemakai melihat aplikasi dengan mata baru, jadi hal yang jelas bagi pembuat belum tentu jelas bagi mereka.',
        ),
        hints: [t('Apakah orang lain sehafal kamu pada tombolnya?')],
        tags: ['ux'],
      }),
      anchorMcq({
        id: 'a06-anc-j2',
        prompt: t('Apa langkah pertama saat merancang aplikasi untuk pemakai?'),
        choices: [
          { id: 'emp', label: t('Mendengarkan dan mengamati pemakai') },
          {
            id: 'code',
            label: t('Langsung membuat aplikasinya'),
            explainWrong: t('Membuat sebelum paham masalah bisa salah sasaran. Dokter juga bertanya dulu.'),
          },
          {
            id: 'paint',
            label: t('Memilih warna dan gambar hiasan'),
            explainWrong: t('Warna dan gambar dipilih sesudah masalahnya dipahami. Dokter tidak langsung memberi obat.'),
          },
        ],
        answer: 'emp',
        explainCorrect: t('Dokter menanyakan keluhan dulu. Pembuat aplikasi juga mendengarkan pemakai lebih dulu.'),
        hints: [t('Ingat apa yang dokter lakukan sebelum memberi obat.')],
        tags: ['design-thinking'],
      }),
      anchorMcq({
        id: 'a06-anc-j3',
        prompt: t('Kamu mau merencanakan letak tombol dan gambar. Apa yang cocok dibuat dulu?'),
        choices: [
          { id: 'wf', label: t('Sketsa kasar hitam-putih') },
          {
            id: 'pr',
            label: t('Versi yang bisa diklik'),
            explainWrong: t(
              'Versi yang bisa diklik dibuat sesudah letaknya ditata. Itu langkah akhir.',
              'Versi yang bisa diklik dibuat sesudah tata letak ditentukan. Itu langkah yang lebih akhir.',
            ),
          },
          {
            id: 'ab',
            label: t('Gambar penuh warna'),
            explainWrong: t('Warna dipilih belakangan. Letak tombol dan gambar ditata lebih dulu.'),
          },
        ],
        answer: 'wf',
        explainCorrect: t('Sketsa kasar hanya menata letak. Seperti denah pensil sebelum rumah dibangun.'),
        hints: [t('Ingat denah pensil sebelum rumah dibangun.')],
        tags: ['wireframe'],
      }),
      anchorMcq({
        id: 'a06-anc-j4',
        prompt: t('Berapa orang yang cukup untuk menemukan banyak masalah saat menguji rancangan?'),
        choices: [
          { id: 'five', label: t('5 orang') },
          {
            id: 'one',
            label: t('1 orang saja'),
            explainWrong: t('Satu orang belum cukup menunjukkan pola. Beberapa orang lebih meyakinkan.'),
          },
          {
            id: 'mill',
            label: t('500 orang'),
            explainWrong: t(
              'Ratusan orang memang boleh, tetapi tidak perlu. Lima orang sudah cukup.',
              'Ratusan peserta memang boleh, tetapi tidak perlu. Lima orang sudah menunjukkan sebagian besar masalah.',
            ),
          },
        ],
        answer: 'five',
        explainCorrect: t(
          'Lima orang sudah menunjukkan banyak masalah. Banyak yang bingung di tempat yang sama.',
          'Lima pemakai sudah menunjukkan sebagian besar masalah. Pola kebingungan yang sama muncul berulang.',
        ),
        hints: [t('Bayangkan beberapa teman mencoba permainanmu.')],
        tags: ['usability-testing'],
      }),
      anchorMcq({
        id: 'a06-anc-j5',
        type: 'limit',
        analogy: t('Mirip dokter yang memeriksa pasien'),
        prompt: t('Gambar contoh aplikasi ternyata gagal saat dicoba. Apa yang terjadi?'),
        choices: [
          { id: 'many', label: t('Pembuat menggambar contoh baru') },
          {
            id: 'ask',
            label: t('Pemakai ikut jatuh sakit'),
            explainWrong: t(
              'Itu terjadi kalau dokter salah memberi obat. Gambar contoh yang gagal tidak menyakiti siapa pun.',
              'Kegagalan sketsa tidak melukai pemakai. Itu risiko obat, bukan risiko prototype.',
            ),
          },
          {
            id: 'check',
            label: t('Aplikasi harus dibuat dari awal'),
            explainWrong: t('Hanya gambarnya yang diganti. Aplikasinya belum dibuat.'),
          },
        ],
        answer: 'many',
        explainCorrect: t('Gambar contoh aman dan mudah diganti. Obat tidak boleh dicoba-coba seperti itu.'),
        hints: [t('Bayangkan kamu salah menggambar di kertas.')],
        tags: ['design-thinking'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a06-anc-p1',
        prompt: t('Apa beda paling mendasar antara user flow dan user journey?'),
        choices: [
          { id: 'uj', label: t('Flow mencatat langkah di layar, journey juga mencatat perasaan pemakai') },
          {
            id: 'rev',
            label: t('Flow memetakan perasaan pemakai, journey hanya memetakan langkah di layar'),
            explainWrong: t('Terbalik. Journey yang memuat perasaan dan konteks sebelum serta sesudah memakai aplikasi.'),
          },
          {
            id: 'same',
            label: t('Keduanya sama saja, hanya beda nama istilah'),
            explainWrong: t('Keduanya berbeda: flow hanya langkah di layar, journey mencakup yang lebih luas.'),
          },
        ],
        answer: 'uj',
        explainCorrect: t(
          'User journey mencakup perasaan dan kejadian sebelum dan sesudah memakai produk. User flow hanya langkah di dalam aplikasi.',
        ),
        tags: ['user-flow'],
      }),
      makeAnchorMcq({
        id: 'a06-anc-p2',
        prompt: t('Sifat UX apa yang membuat produk bisa dipakai semua orang, termasuk penyandang disabilitas?'),
        choices: [
          { id: 'acc', label: t('Accessible') },
          {
            id: 'des',
            label: t('Desirable'),
            explainWrong: t('Desirable berarti menarik, jadi orang senang kembali.'),
          },
          {
            id: 'cred',
            label: t('Credible'),
            explainWrong: t('Credible berarti terlihat tepercaya dan aman.'),
          },
        ],
        answer: 'acc',
        explainCorrect: t('Accessible berarti produk bisa dipakai orang dengan kemampuan dan kondisi yang berbeda.'),
        tags: ['ux'],
      }),
      makeAnchorMcq({
        id: 'a06-anc-p3',
        prompt: t('Mana contoh affordance yang baik di halaman web?'),
        choices: [
          { id: 'aff', label: t('Tombol utama tampak timbul, jadi jelas bisa ditekan') },
          {
            id: 'hide',
            label: t('Tautan penting dibuat sama persis dengan teks biasa'),
            explainWrong: t('Tautan yang menyamar sebagai teks biasa menghilangkan petunjuk bahwa ia bisa diklik.'),
          },
          {
            id: 'slow',
            label: t('Pesan balasan setelah menekan Kirim dihilangkan'),
            explainWrong: t('Itu masalah feedback, bukan affordance. Feedback adalah tanggapan sistem atas aksi.'),
          },
        ],
        answer: 'aff',
        explainCorrect: t('Affordance adalah petunjuk dari bentuk elemen tentang cara memakainya. Tombol yang tampak timbul mengajak ditekan.'),
        tags: ['ux', 'ui'],
      }),
      makeAnchorMcq({
        id: 'a06-anc-p4',
        prompt: t('Mengapa tim membuat prototype sebelum menulis kode aplikasi lengkap?'),
        choices: [
          { id: 'cost', label: t('Kesalahan alur ketahuan lebih awal, saat perbaikannya masih murah') },
          {
            id: 'nohtml',
            label: t('Prototype menggantikan HTML dan server di produk akhir'),
            explainWrong: t('Produk akhir tetap perlu kode frontend dan backend.'),
          },
          {
            id: 'color',
            label: t('Prototype membuat pemakai tidak perlu ikut menguji'),
            explainWrong: t('Prototype justru dibuat supaya pemakai bisa mengujinya lebih awal.'),
          },
        ],
        answer: 'cost',
        explainCorrect: t('Makin awal hambatan ketahuan, makin murah perbaikannya. Memindahkan kotak di prototype lebih cepat daripada menulis ulang kode.'),
        tags: ['prototype'],
      }),
      makeAnchorMcq({
        id: 'a06-anc-p5',
        prompt: t('Sikap mana yang paling merusak sesi usability testing?'),
        choices: [
          { id: 'help', label: t('Menunjuk tombol yang benar setiap kali peserta ragu') },
          {
            id: 'note',
            label: t('Mencatat bagian saat peserta berhenti atau bertanya'),
            explainWrong: t('Mencatat titik bingung adalah tujuan utama sesi ini.'),
          },
          {
            id: 'silent',
            label: t('Membiarkan peserta menyelesaikan tugas sendiri'),
            explainWrong: t('Peserta yang mencoba sendiri menunjukkan kesulitan yang asli.'),
          },
        ],
        answer: 'help',
        explainCorrect: t('Bantuan menutupi masalah desain. Pemakai asli nanti tidak punya penguji di sampingnya.'),
        tags: ['usability-testing'],
      }),
      makeAnchorMcq({
        id: 'a06-anc-p6',
        type: 'limit',
        analogy: t('Wireframe, mockup, dan prototype seperti denah, gambar 3D, dan rumah contoh'),
        prompt: t('Apa beda penting prototype digital dengan rumah contoh fisik?'),
        choices: [
          { id: 'iter', label: t('Prototype digital diubah dan diuji ulang dalam hitungan menit') },
          {
            id: 'early',
            label: t('Kesalahan lebih murah dibetulkan di tahap sketsa awal'),
            explainWrong: t('Itu persamaannya: denah dan wireframe sama-sama murah dibetulkan sebelum ada yang dibangun.'),
          },
          {
            id: 'enter',
            label: t('Keduanya dibuat agar calon pemakai bisa mencoba alurnya'),
            explainWrong: t('Itu juga persamaan, bukan perbedaan.'),
          },
        ],
        answer: 'iter',
        explainCorrect: t('Prototype digital bisa direvisi dalam menit tanpa membongkar bangunan. Siklus belajarnya jadi lebih cepat.'),
        tags: ['prototype', 'wireframe'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  // ---------------------------------------------------------------------------------------------
  // a06-l01  Kamu bukan pemakainya
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a06-l01',
    worldId: 'a06',
    title: 'Kamu bukan pemakai halamanmu',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menyebutkan 4 hal yang membuat aplikasi enak dipakai.',
      'Kamu bisa menilai UX sebuah aplikasi lewat enam sifatnya.',
    ),
    estMinutes: 6,
    introducesTerms: [],
    usesTerms: ['ux', 'ui'],
    warmupFrom: 'a05-l04',
    atWork: 'Di rapat desain, kamu bisa memakai enam sifat ini untuk menilai layar yang baru dibuat.',
    steps: [
      storyStep('a06/tukang-sepatu.svg', [
        rText(
          'Tukang sepatu di desa memakai ukuran kakinya sendiri untuk semua sepatu. Banyak warga jadi kesempitan atau kebesaran. Bagaimana tukang sepatu bisa membuat sepatu yang pas?',
          'Tim Toko Rani merasa tombol Simpan sudah jelas, tetapi Bu Laras tidak menemukannya. Seperti tukang sepatu yang memakai ukuran kakinya sendiri untuk seluruh desa.',
        ),
      ]),
      conceptStep({
        title: t('Kamu bukan pemakainya', 'Inti UX: kamu bukan pemakainya'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'empati-pengguna' },
        alt: t('Pembuat dan pemakai melihat aplikasi yang sama dengan sudut pandang berbeda.'),
        body: [
          rText('Tugas ', 'Inti '),
          rTerm('ux', 'UX', 'UX'),
          rText(
            ' adalah bertanya kepada pemakai, bukan menebak. Pembuat sudah hafal letak tombol, tetapi orang lain belum.',
            ' adalah mencari tahu lewat pengamatan sungguhan, bukan menebak. Pembuat sudah hafal letak tombol, tetapi pemakai baru belum.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a06-l01-q1',
          type: 'analogy',
          prompt: t(
            'Pembuat aplikasi hanya memakai seleranya sendiri. Siapa yang mirip dengannya?',
            'Apa yang paling mirip dengan membuat aplikasi hanya dari selera pembuatnya?',
          ),
          choices: [
            { id: 'shoe', label: t('Tukang sepatu yang memakai ukuran kakinya sendiri') },
            {
              id: 'tailor',
              label: t('Penjahit yang mengukur setiap pelanggan sebelum menjahit'),
              explainWrong: t('Penjahit itu mengukur tiap pelanggan dulu. Itu justru cara yang baik.'),
            },
            {
              id: 'chef',
              label: t('Koki yang bertanya tingkat pedas kesukaan tamu'),
              explainWrong: t('Koki itu bertanya kepada tamunya. Itu justru cara yang baik.'),
            },
          ],
          answer: 'shoe',
          explainCorrect: t(
            'Selera pembuat belum tentu cocok untuk orang lain. Seperti sepatu pas di satu kaki, tetapi sempit di kaki lain.',
            'Selera pembuat belum tentu cocok untuk orang lain. Ukuran yang pas di kakinya bisa sempit di kaki orang lain.',
          ),
          hints: [t('Ingat cerita desa tadi. Siapa yang memikirkan dirinya sendiri?')],
          tags: ['ux'],
        }),
      ),
      conceptStep({
        title: t('Aplikasi yang Enak Dipakai', 'Useful, Usable, dan Findable'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'tiga-syarat-ux' },
        alt: t(
          'Empat gambar: berguna, mudah dipakai, mudah ditemukan, dan ramah semua orang.',
          'Tiga pilar UX: berguna, mudah dipakai tanpa diajari, dan cepat ditemukan.',
        ),
        body: [
          rText('Aplikasi yang baik itu ', 'Syarat dasar UX: '),
          rBold('berguna', 'Useful'),
          rText(', ', ' (berguna menyelesaikan masalah), '),
          rBold('mudah dipakai', 'Usable'),
          rText(', dan ', ' (mudah dipakai tanpa diajari), dan '),
          rBold('mudah ditemukan', 'Findable'),
          rText('. Ia juga ', ' (menu dan info cepat ditemukan).'),
          { t: 'bold', v: { junior: 'ramah semua orang', pro: 'ramah semua orang' }, modes: ['junior'] },
          rJunior(', termasuk yang sulit melihat.'),
        ],
      }),
      simStep(
        'desa-ux',
        t(
          'Ketuk tiap langkah kerja di Desa UX dan lihat urutannya.',
          'Telusuri urutan kerja UX di simulator: solusi selalu berangkat dari kebutuhan pemakai.',
        ),
      ),
      conceptStep({
        title: t('Aman, Ramah, dan Disukai', 'Credible, Accessible, Desirable'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'enam-kualitas-ux' },
        alt: t('Aplikasi tepercaya, ramah semua pemakai, dan menyenangkan dipakai kembali.'),
        modes: ['pro'],
        body: [
          rText('Tiga sifat lain: '),
          rBold('Credible'),
          rText(' (tepercaya), '),
          rBold('Accessible'),
          rText(' (bisa dipakai semua orang, termasuk penyandang disabilitas), dan '),
          rBold('Desirable'),
          rText(' (menyenangkan, orang ingin kembali).'),
        ],
      }),
      limitStep({
        riskyAnalogy: false,
        analogy: t('Tukang sepatu mengukur kaki sendiri untuk warga desa'),
        same: [t('Pembuat produk tidak boleh memakai kebiasaannya sendiri sebagai patokan semua orang.')],
        different: [
          t('Sepatu bisa dibuat satu per satu sesuai ukuran kaki. Satu aplikasi harus langsung cocok untuk banyak layar dan kebutuhan.'),
        ],
      }),
      qStep({
        id: 'a06-l01-q2',
        type: 'match',
        prompt: t('Pasangkan tiap sifat dengan artinya.', 'Pasangkan sifat UX dengan artinya:'),
        difficulty: 2,
        left: [
          { id: 'u1', label: t('Berguna', 'Useful') },
          { id: 'u2', label: t('Mudah dipakai', 'Usable') },
          { id: 'u3', label: t('Mudah ditemukan', 'Findable') },
          { id: 'u4', label: t('Ramah semua orang', 'Accessible') },
        ],
        right: [
          { id: 'r1', label: t('Menyelesaikan masalah sungguhan') },
          { id: 'r2', label: t('Bisa dipakai tanpa diajari') },
          { id: 'r3', label: t('Tombol cepat ditemukan', 'Cepat menemukan yang dibutuhkan') },
          { id: 'r4', label: t('Bisa dipakai semua orang', 'Bisa dipakai semua orang, termasuk penyandang disabilitas') },
        ],
        answer: { u1: 'r1', u2: 'r2', u3: 'r3', u4: 'r4' },
        explainCorrect: t(
          'Aplikasi yang baik berguna, mudah dipakai, mudah ditemukan, dan ramah. Seperti sepatu yang pas di kaki siapa saja.',
          'Keempat sifat itu menjadi patokan menilai UX. Useful soal manfaat, Usable soal kemudahan, Findable soal letak, Accessible soal akses setara.',
        ),
        hints: [
          t(
            'Ingat kartu tentang 4 hal yang baik di aplikasi.',
            'Useful soal manfaat, Usable soal cara pakai, Findable soal letak.',
          ),
          undefined,
        ],
        tags: ['ux'],
      }),
      qStep(
        makeTf({
          id: 'a06-l01-q3',
          prompt: t(
            'Tombol yang mudah bagi pembuat pasti mudah bagi semua orang.',
            'Kalau tombol jelas bagi pembuatnya, semua pemakai baru pasti langsung paham juga.',
          ),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru: pembuat sudah hafal letak tombol. Orang baru melihatnya untuk pertama kali.',
            'Pernyataan itu keliru: pembuat sudah hafal letak tombol. Pemakai baru melihatnya untuk pertama kali.',
          ),
          explainWrong: t(
            'Pembuat sudah terbiasa dengan tombolnya. Orang baru belum, jadi mereka bisa bingung.',
            'Pembuat sudah terbiasa, jadi tombol terasa mudah baginya. Pemakai baru belum punya kebiasaan itu.',
          ),
          hints: [t('Siapa yang sudah hafal letak tombolnya?')],
          tags: ['ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l01-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Tukang sepatu desa'),
          prompt: t('Apa batas perumpamaan tukang sepatu untuk sebuah situs web?'),
          difficulty: 2,
          choices: [
            { id: 'adapt', label: t('Satu situs harus cocok untuk banyak layar dan kebutuhan') },
            {
              id: 'ask',
              label: t('Pembuat perlu mengenal kebutuhan pemakainya sebelum merancang'),
              explainWrong: t('Itu persamaan utamanya, bukan batas perumpamaannya. Tukang sepatu juga perlu mengukur kaki.'),
            },
            {
              id: 'fit',
              label: t('Produk yang tidak pas membuat pemakai kesulitan dan pergi'),
              explainWrong: t('Itu juga bagian yang serupa dengan sepatu yang sempit.'),
            },
          ],
          answer: 'adapt',
          explainCorrect: t('Sepatu bisa dibuat satu per satu. Satu situs harus langsung cocok untuk banyak layar dan kebutuhan.'),
          hints: [t('Cari hal yang berbeda, bukan yang sama.')],
          tags: ['ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l01-q5',
          type: 'scenario',
          story: t(
            'Bito membuat aplikasi jadwal belajar. Bu Laras sudah mengisi jadwalnya. Ia membuka 3 menu, tetapi belum bisa menyimpan.',
            'Tim Bito membuat aplikasi jadwal belajar dengan fitur lengkap. Tombol "Simpan" tersembunyi di tiga menu kecil, jadi Bu Laras terus gagal menyimpan.',
          ),
          prompt: t('Apa yang paling perlu Bito perbaiki?', 'Sifat UX mana yang paling perlu dibetulkan?'),
          difficulty: 2,
          choices: [
            { id: 'uf', label: t('Membuat tombol Simpan mudah ditemukan', 'Findable dan Usable: tombol mudah ditemukan') },
            {
              id: 'be',
              label: t('Menambah banyak fitur baru ke aplikasi', 'Menambah lebih banyak fitur baru ke aplikasinya'),
              explainWrong: t('Fitur baru membuat tombol Simpan makin sulit dicari.'),
            },
            {
              id: 'dark',
              label: t('Mengganti warna latar halaman', 'Mengganti warna latar halaman menjadi lebih cerah'),
              explainWrong: t('Warna latar tidak membuat tombol Simpan lebih mudah ditemukan.'),
            },
          ],
          answer: 'uf',
          explainCorrect: t(
            'Fitur sebaik apa pun percuma kalau tombolnya sulit dicari. Seperti pintu rumah yang tersembunyi di balik lemari.',
            'Fitur lengkap tidak berguna kalau tombol utamanya sulit dicari dan dipakai. Itu masalah Findable dan Usable.',
          ),
          hints: [
            t(
              'Ingat apa yang dicari Bu Laras, tetapi tidak ditemukannya.',
              'Cari sifat yang berkaitan dengan letak tombol.',
            ),
          ],
          tags: ['ux', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l01-q6',
          type: 'why',
          base: 'ux-research',
          prompt: t(
            'Mengapa pembuat aplikasi bertanya dulu, bukan menebak?',
            'Mengapa tugas utama desainer UX adalah mencari tahu, bukan menebak?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'real',
              label: t('Karena tebakan pembuat sering meleset', 'Tebakan pembuat sering meleset dari kebiasaan pemakai'),
            },
            {
              id: 'slow',
              label: t('Karena bertanya lebih cepat daripada membuat', 'Bertanya lebih cepat daripada membangun fitur'),
              explainWrong: t(
                'Bertanya memang cepat, tetapi itu bukan alasan utamanya. Alasannya: menghindari rancangan yang salah sasaran.',
                'Kecepatan bukan alasan utamanya. Riset menghindarkan tim dari membangun hal yang tidak dibutuhkan.',
              ),
            },
            {
              id: 'law',
              label: t('Karena selera orang lain mirip selera pembuat', 'Selera pemakai biasanya sama dengan selera pembuat aplikasi'),
              explainWrong: t(
                'Selera tiap orang berbeda. Karena itu pembuat perlu bertanya.',
                'Selera dan kebiasaan pemakai sering berbeda dari pembuat. Karena itu tim perlu bertanya.',
              ),
            },
          ],
          answer: 'real',
          explainCorrect: t(
            'Dengan bertanya, pembuat tidak membuat hal yang tidak dibutuhkan. Seperti tukang sepatu yang mengukur kaki dulu.',
            'Bertanya langsung menghindarkan tim membangun fitur yang tidak dibutuhkan. Satu wawancara bisa membatalkan asumsi yang salah.',
          ),
          hints: [
            t(
              'Ingat tukang sepatu yang menebak ukuran.',
              'Bandingkan tebakan pembuat dengan kebiasaan pemakai asli.',
            ),
          ],
          tags: ['ux'],
        }),
      ),
      qStep({
        id: 'a06-l01-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi sifat UX yang membuat pemakai merasa aman mengisi data:'),
        difficulty: 2,
        template: 'Enam sifat UX baik: Useful, Usable, Findable, ___, Accessible, dan Desirable.',
        bank: ['Responsive', 'Credible', 'Semantic'],
        answer: ['Credible'],
        explainCorrect: t('Credible membangun rasa percaya saat pemakai mengisi data atau membayar. Seperti toko yang terlihat rapi dan jujur.'),
        hints: [t('Sifat ini ada di kartu bersama Accessible dan Desirable.'), undefined],
        tags: ['ux'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a06-l01-r1',
        prompt: t(
          'Kamu bingung mencari tombol cari di sebuah aplikasi. Apa yang kurang?',
          'Pemakai bingung mencari tombol pencarian. Sifat UX mana yang kurang?',
        ),
        choices: [
          { id: 'f', label: t('Mudah ditemukan', 'Findable (mudah dicari)') },
          {
            id: 'c',
            label: t('Terasa aman', 'Credible (tepercaya)'),
            explainWrong: t(
              'Terasa aman itu soal rasa percaya. Tombol yang sulit dicari itu soal letak.',
              'Credible soal rasa aman dan profesional. Soal letak tombol adalah Findable.',
            ),
          },
          {
            id: 'u',
            label: t('Berguna', 'Useful (berguna)'),
            explainWrong: t(
              'Berguna itu soal manfaat. Tombolnya ada, tetapi sulit ditemukan.',
              'Useful soal manfaat. Tombolnya ada, tetapi letaknya sulit ditemukan.',
            ),
          },
        ],
        answer: 'f',
        explainCorrect: t(
          'Pemakai harus cepat menemukan yang ia butuhkan. Seperti mencari buku di rak yang rapi.',
          'Findable berarti pemakai cepat menemukan yang dibutuhkan. Letak tombol yang tersembunyi menurunkan sifat ini.',
        ),
        hints: [t('Apa yang kamu cari tetapi sulit ditemukan?')],
        tags: ['ux'],
      }),
      makeTf({
        id: 'a06-l01-r2',
        prompt: t(
          'UX berarti menebak apa yang diinginkan pemakai tanpa bertanya.',
          'Tugas UX adalah menebak keinginan pemakai di ruang tertutup tanpa bertanya.',
        ),
        answer: false,
        explainCorrect: t(
          'Pernyataan itu keliru: UX berarti bertanya dan mengamati pemakai. Seperti tukang sepatu yang mengukur kaki dulu.',
          'Pernyataan itu keliru: tugas UX adalah mencari tahu langsung dari pemakai. Tebakan tanpa bukti sering salah.',
        ),
        explainWrong: t(
          'Menebak tanpa bertanya bisa membuat aplikasi tidak dipakai. Orang lain punya kebiasaan sendiri.',
          'Menebak tanpa bukti berisiko membuat aplikasi tidak terpakai. Pemakai punya kebiasaan yang belum tentu sama dengan pembuat.',
        ),
        hints: [t('Apa yang dilakukan tukang sepatu yang baik?')],
        tags: ['ux'],
      }),
    ],
    recap: t(
      'Kamu bukan pemakainya, jadi tanya dulu supaya aplikasi mudah dipakai.',
      'Mulai dari pemakai sungguhan, bukan asumsi sendiri. Nilai hasilnya dengan enam sifat UX.',
    ),
    companion: {
      talkPrompts: ['Tombol apa di aplikasi yang pernah membuatmu bingung?'],
      offlineActivity:
        'Minta anggota keluarga membuka satu menu baru di perangkat rumah tanpa diberi tahu caranya. Amati bagian mana yang membuatnya ragu.',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // a06-l02  Design thinking: seperti dokter
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a06-l02',
    worldId: 'a06',
    title: 'Design thinking: seperti dokter',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengurutkan 5 langkah mencari solusi seperti dokter.',
      'Kamu bisa menyebutkan lima tahap Design Thinking dan fungsi tiap tahap.',
    ),
    estMinutes: 6,
    introducesTerms: ['design-thinking'],
    usesTerms: ['ux'],
    stickerId: 'dokter-ux',
    warmupFrom: 'a06-l01',
    atWork: 'Di awal proyek, kamu akan ikut wawancara pemakai untuk menemukan masalah sebelum tim mulai menggambar layar.',
    steps: [
      storyStep('a06/dokter-ux.svg', [
        rText(
          'Kalau kamu sakit, dokter tidak langsung memberi obat. Dokter bertanya, memeriksa, lalu mengecek hasilnya. Apa saja langkah dokter?',
          'Form pendaftaran di aplikasi Rani sepi peminat. Tim UX bekerja seperti dokter: bertanya keluhan dulu, lalu menguji obatnya.',
        ),
      ]),
      conceptStep({
        title: t('Langkah 1 dan 2: Pahami, Tentukan', 'Empathize dan Define'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'empathize-define' },
        alt: t('Tahap Empathize bertanya ke pemakai dan tahap Define menentukan satu masalah utama.'),
        body: [
          rText('', 'Dalam '),
          rTerm('design-thinking', 'Design Thinking', 'Design Thinking'),
          rText(
            ' adalah cara mencari solusi dalam 5 langkah. Langkah 1: ',
            ' (proses lima tahap memecahkan masalah pemakai), tahap 1 ',
          ),
          rBold('Pahami', 'Empathize'),
          rText(
            '. Dengarkan pemakai. Langkah 2: ',
            ' menggali masalah lewat wawancara dan pengamatan. Tahap 2 ',
          ),
          rBold('Tentukan', 'Define'),
          rText('. Pilih satu masalah utama.', ' merumuskan satu masalah inti.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a06-l02-q2',
          type: 'analogy',
          prompt: t(
            'Dokter mendengar semua keluhanmu sebelum memberi obat. Itu mirip langkah yang mana?',
            'Dokter mendengarkan keluhan pasien sebelum memberi resep. Itu mirip tahap apa?',
          ),
          choices: [
            { id: 'emp', label: t('Pahami pemakai', 'Empathize (mendengarkan pemakai)') },
            {
              id: 'tst',
              label: t('Tentukan satu masalah', 'Define (memilih satu masalah inti)'),
              explainWrong: t(
                'Langkah Tentukan datang sesudah mendengar. Dokter memilih satu masalah setelah mendengar semua keluhan.',
                'Define datang sesudah Empathize. Masalah inti baru dipilih setelah semua keluhan didengar.',
              ),
            },
            {
              id: 'pro',
              label: t('Langsung membuat aplikasi', 'Langsung membangun fitur'),
              explainWrong: t(
                'Membuat aplikasi sebelum paham masalah bisa salah sasaran. Dokter juga tidak langsung memberi obat.',
                'Membangun fitur sebelum paham masalah bisa salah sasaran. Dokter pun tidak langsung menulis resep.',
              ),
            },
          ],
          answer: 'emp',
          explainCorrect: t(
            'Dokter mendengar dulu sebelum bertindak. Pembuat aplikasi juga mendengarkan pemakai lebih dulu.',
            'Empathize berarti mendengarkan dan mengamati situasi pemakai lebih dulu. Dokter menanyakan keluhan sebelum memberi resep.',
          ),
          hints: [t('Dokter melakukan apa sebelum memberi obat?')],
          tags: ['design-thinking'],
        }),
      ),
      conceptStep({
        title: t('Langkah 3, 4, 5: Ide, Contoh, Uji', 'Ideate, Prototype, dan Test'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'ideate-prototype-test' },
        alt: t('Tahap Ideate mengumpulkan ide, Prototype membuat contoh, dan Test menguji ke pemakai.'),
        body: [
          rJunior('Langkah 3: '),
          rBold('Ide', 'Ideate'),
          rText(
            '. Kumpulkan banyak ide. Langkah 4: ',
            ' menggali banyak ide tanpa langsung menghakimi. ',
          ),
          rBold('Contoh', 'Prototype'),
          rText(
            '. Buat contoh sederhana. Langkah 5: ',
            ' membuat contoh kasar yang bisa dicoba. ',
          ),
          rBold('Uji', 'Test'),
          rText(
            '. Coba ke pemakai asli, lalu ulangi kalau belum bagus.',
            ' mengujinya ke pemakai asli, lalu hasilnya dipakai untuk membetulkan rancangan.',
          ),
        ],
      }),
      conceptStep({
        title: t('Boleh Berputar Kembali', 'Proses Berulang (Iteratif)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'siklus-berputar' },
        alt: t('Panah melingkar dari Test kembali ke Define atau Ideate saat hasil perlu dibetulkan.'),
        modes: ['pro'],
        body: [
          rText('Prosesnya bersifat iteratif, artinya berulang: kalau tahap Test menunjukkan masalah baru, tim kembali ke Ideate atau Define.'),
        ],
      }),
      qStep(
        makeTf({
          id: 'a06-l02-q3',
          prompt: t(
            'Kamu hanya boleh menjalankan 5 langkah mencari solusi 1 kali.',
            'Kalau Test menemukan masalah baru, tim sebaiknya tetap merilis sesuai jadwal.',
          ),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru: langkahnya boleh diulang kalau hasilnya belum bagus. Seperti dokter yang mengecek pasiennya lagi.',
            'Pernyataan itu keliru: prosesnya iteratif (berulang). Kalau Test menemukan masalah baru, tim kembali ke Ideate atau Define.',
          ),
          explainWrong: t(
            'Hasil uji yang belum bagus boleh dibetulkan. Dokter juga mengecek pasien lagi.',
            'Merilis masalah yang sudah ketahuan hanya memindahkannya ke pemakai. Tim kembali ke Ideate atau Define lebih dulu.',
          ),
          hints: [t('Ingat dokter yang mengecek hasil obatnya.', 'Lihat arah panah sesudah tahap Test.')],
          tags: ['design-thinking'],
        }),
      ),
      limitStep({
        riskyAnalogy: true,
        analogy: t('Mirip dokter yang memeriksa pasien', 'Design Thinking seperti dokter memeriksa pasien'),
        same: [
          t(
            'Dokter dan pembuat aplikasi sama-sama mendengar dulu, lalu mengecek hasilnya.',
            'Sama-sama mendengarkan dulu, menentukan inti masalah, mencoba solusi, lalu memantau hasilnya.',
          ),
        ],
        different: [
          t(
            'Dokter tidak boleh coba-coba obat. Contoh aplikasi boleh dicoba.',
            'Dokter tidak boleh bereksperimen sembarangan pada tubuh pasien. Desainer justru dianjurkan mencoba banyak sketsa kasar lebih dulu.',
          ),
        ],
      }),
      simStep(
        'desa-ux',
        t(
          'Ketuk 3 tombol di Desa UX dan lihat urutannya.',
          'Ikuti tahap Empathize sampai Test di simulator dan lihat hasil tiap tahap.',
        ),
      ),
      qStep({
        id: 'a06-l02-q1',
        type: 'order',
        prompt: t('Urutkan 5 langkah mencari solusi, dari awal sampai akhir.', 'Urutkan lima tahap Design Thinking dari awal sampai akhir:'),
        difficulty: 2,
        items: [
          { id: 'ide', label: t('Ide: kumpulkan banyak ide', 'Ideate (kumpulkan banyak ide)') },
          { id: 'emp', label: t('Pahami: dengarkan pemakai', 'Empathize (pahami pemakai)') },
          { id: 'tst', label: t('Uji: coba ke pemakai asli', 'Test (uji ke pemakai asli)') },
          { id: 'def', label: t('Tentukan: pilih satu masalah', 'Define (rumuskan masalah utama)') },
          { id: 'pro', label: t('Contoh: buat contoh sederhana', 'Prototype (buat contoh kasar)') },
        ],
        answer: ['emp', 'def', 'ide', 'pro', 'tst'],
        explainCorrect: t(
          'Urutannya: Pahami, Tentukan, Ide, Contoh, Uji. Seperti dokter: bertanya, menentukan sakit, memikirkan obat, memberi obat, mengecek.',
          'Urutannya: Empathize, Define, Ideate, Prototype, Test. Setiap tahap memakai hasil tahap sebelumnya.',
        ),
        hints: [
          t(
            'Ingat dokter: bertanya, menentukan sakit, memikirkan obat, memberi obat, mengecek.',
            'Mulai dari pemakai, akhiri dengan pengujian ke pemakai.',
          ),
          undefined,
        ],
        tags: ['design-thinking'],
      }),
      qStep(
        makeMcq({
          id: 'a06-l02-q4',
          type: 'limit',
          analogy: t('Mirip dokter yang memeriksa pasien'),
          prompt: t(
            'Dokter harus berhati-hati dengan obat. Apa yang boleh dicoba berkali-kali pembuat aplikasi, tetapi tidak oleh dokter?',
            'Apa yang aman dicoba berkali-kali oleh desainer UX, tetapi tidak oleh dokter?',
          ),
          difficulty: 2,
          choices: [
            { id: 'exp', label: t('Mencoba banyak contoh sederhana', 'Mencoba banyak contoh kasar') },
            {
              id: 'ask',
              label: t('Mendengarkan keluhan lebih dulu'),
              explainWrong: t('Dokter juga mendengarkan keluhan lebih dulu. Itu bagian yang mirip.'),
            },
            {
              id: 'eval',
              label: t('Mengecek hasil sesudah dicoba'),
              explainWrong: t('Dokter juga mengecek hasil pengobatan. Itu bagian yang mirip.'),
            },
          ],
          answer: 'exp',
          explainCorrect: t(
            'Contoh aplikasi aman dan murah dicoba berkali-kali. Obat tidak bisa dicoba begitu.',
            'Sketsa kasar aplikasi aman dan murah diuji berkali-kali. Obat tidak bisa dicoba seperti itu pada pasien.',
          ),
          hints: [t('Cari hal yang tidak boleh dilakukan dokter.')],
          tags: ['design-thinking'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l02-q5',
          type: 'scenario',
          story: t(
            'Tim Dimas membuat aplikasi selama 3 bulan. Mereka tidak bertanya ke calon pemakai. Setelah jadi, tidak ada warga yang mau memakainya.',
            'Tim Dimas membangun aplikasi selama 3 bulan tanpa bertanya ke calon pemakai. Setelah rilis, tidak ada warga yang memakainya.',
          ),
          prompt: t('Langkah awal mana yang dilewati tim Dimas?', 'Tahap awal mana yang dilewati tim?'),
          difficulty: 2,
          choices: [
            { id: 'ed', label: t('Memahami pemakai dan masalahnya', 'Empathize dan Define (memahami pemakai)') },
            {
              id: 'color',
              label: t('Memilih warna yang lebih cerah', 'Memilih warna ungu yang lebih cerah dan menarik'),
              explainWrong: t(
                'Warna cerah tidak menolong aplikasi yang tidak dibutuhkan. Warga butuh solusi, bukan hiasan.',
                'Aplikasi yang tidak memecahkan masalah pemakai tetap ditinggalkan, secerah apa pun warnanya.',
              ),
            },
            {
              id: 'server',
              label: t('Membuat aplikasinya lebih cepat', 'Menambah kecepatan server'),
              explainWrong: t(
                'Aplikasi yang cepat pun tidak dipakai kalau tidak dibutuhkan. Masalahnya ada di awal.',
                'Masalahnya bukan di server, tetapi di solusi yang tidak cocok dengan kebutuhan pemakai.',
              ),
            },
          ],
          answer: 'ed',
          explainCorrect: t(
            'Tanpa bertanya, tim membangun hal yang tidak dibutuhkan. Seperti dokter yang memberi obat tanpa mendengar keluhan.',
            'Tanpa Empathize dan Define, tim bisa bekerja keras membangun hal yang tidak dibutuhkan.',
          ),
          hints: [
            t(
              'Ingat apa yang dilakukan dokter sebelum memberi obat.',
              'Cari tahap sebelum tim mulai membangun.',
            ),
          ],
          tags: ['design-thinking', 'ux'],
        }),
      ),
      qStep({
        id: 'a06-l02-q6',
        type: 'match',
        modes: ['pro'],
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
          { id: 'rtst', label: t('Mengamati pemakai asli mencoba rancangan') },
        ],
        answer: { def: 'rdef', ide: 'ride', tst: 'rtst' },
        explainCorrect: t('Tiap tahap punya hasil sendiri: masalah inti, kumpulan ide, dan temuan dari uji.'),
        hints: [t('Tahap Test selalu melibatkan pemakai asli.'), undefined],
        tags: ['design-thinking'],
      }),
      qStep({
        id: 'a06-l02-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Apa nama tahap ketiga Design Thinking, saat tim mengumpulkan sebanyak mungkin ide sebelum menilainya?'),
        difficulty: 2,
        accept: ['ideate'],
        explainCorrect: t('Ideate membuka ruang untuk banyak alternatif solusi. Seperti mencatat semua ide di papan tulis sebelum memilih.'),
        hints: [t('Tahap ini ada di antara Define dan Prototype.'), undefined],
        tags: ['design-thinking'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a06-l02-r1',
        prompt: t(
          'Apa langkah pertama saat mencari solusi untuk pemakai?',
          'Apa tahap pertama dalam Design Thinking?',
        ),
        choices: [
          { id: 'e', label: t('Pahami pemakai', 'Empathize (memahami pemakai)') },
          {
            id: 't',
            label: t('Uji hasil akhir', 'Test (menguji hasil akhir)'),
            explainWrong: t(
              'Uji adalah langkah terakhir, setelah ada contoh.',
              'Test adalah tahap kelima, setelah prototype dibuat.',
            ),
          },
          {
            id: 'p',
            label: t('Kumpulkan banyak ide', 'Ideate (mengumpulkan ide)'),
            explainWrong: t(
              'Ide dikumpulkan setelah kamu paham masalahnya.',
              'Ideate datang setelah masalah dipahami dan dirumuskan.',
            ),
          },
        ],
        answer: 'e',
        explainCorrect: t(
          'Mendengarkan pemakai adalah pintu masuk. Dokter menanyakan keluhan sebelum memberi obat.',
          'Empathize menjadi pintu masuk supaya tim paham siapa yang dibantu. Dokter menanyakan keluhan sebelum memberi resep.',
        ),
        hints: [t('Dokter bertanya dulu sebelum memeriksa.')],
        tags: ['design-thinking'],
      }),
      makeTf({
        id: 'a06-l02-r2',
        prompt: t(
          'Saat mengumpulkan ide, ide yang aneh langsung ditolak.',
          'Pada tahap Ideate, tim langsung menolak ide yang aneh sebelum sempat dicatat.',
        ),
        answer: false,
        explainCorrect: t(
          'Pernyataan itu keliru: ide dikumpulkan dulu tanpa dinilai. Seperti menulis semua usul teman di papan tulis.',
          'Pernyataan itu keliru: pada Ideate, tim mengumpulkan banyak ide dulu tanpa menilai.',
        ),
        explainWrong: t(
          'Menolak terlalu cepat mematikan ide bagus. Ide aneh kadang menjadi ide terbaik.',
          'Menilai terlalu cepat mematikan ide kreatif yang mungkin berguna.',
        ),
        hints: [t('Ingat langkah 3: kumpulkan banyak ide.', 'Ingat tujuan tahap Ideate: jumlah ide dulu, penilaian kemudian.')],
        tags: ['design-thinking'],
      }),
    ],
    recap: t(
      'Cara mencari solusi punya 5 langkah: pahami, tentukan, ide, contoh, uji.',
      'Design Thinking memecahkan masalah lewat Empathize, Define, Ideate, Prototype, dan Test. Prosesnya berulang sampai hasil uji memuaskan.',
    ),
    companion: {
      talkPrompts: ['Kalau merancang tas sekolah baru, apa yang kamu tanyakan ke teman?'],
      offlineActivity:
        'Amati satu barang di rumah yang sering membuatmu kesal. Tulis 5 ide perbaikannya, yang lucu maupun yang serius.',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // a06-l03  Persona, user flow, user journey (Pro)
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a06-l03',
    worldId: 'a06',
    title: 'Persona, user flow, user journey',
    modes: ['pro'],
    objective: t('Kamu bisa menyusun persona berbasis riset dan memetakan alur belanja pemakai.'),
    estMinutes: 6,
    introducesTerms: ['persona', 'user-flow'],
    usesTerms: ['ux', 'design-thinking'],
    warmupFrom: 'a06-l02',
    atWork: 'Di rapat desain, kamu akan membawa persona untuk memutuskan layar mana yang dibuat lebih dulu.',
    steps: [
      storyStep('a06/peta-sutradara.svg', [
        rText('Tim aplikasi Toko Rani berdebat tentang siapa pembelinya. Sutradara film punya cara untuk masalah seperti ini: profil tokoh dan papan urutan adegan.'),
      ]),
      conceptStep({
        title: t('Persona Berbasis Riset'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'kartu-persona' },
        alt: t('Kartu persona Rani, 21 tahun, berisi tujuan, kesulitan, dan kebiasaan memakai HP.'),
        body: [
          rTerm('persona', 'Persona'),
          rText(
            ' adalah tokoh rekaan dari hasil riset yang menggambarkan satu kelompok pemakai. Isinya tujuan, kesulitan, dan kebiasaan, misalnya Rani, mahasiswi berkuota terbatas yang memakai HP.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a06-l03-q4',
          type: 'limit',
          analogy: t('Profil karakter dan naskah film'),
          prompt: t('Apa yang TIDAK boleh dilakukan saat menyusun persona seperti membuat tokoh film?'),
          difficulty: 2,
          choices: [
            { id: 'fake', label: t('Mengarang sifat dan kebutuhan pemakai tanpa riset') },
            {
              id: 'team',
              label: t('Memakai tokoh itu sebagai sasaran bersama seluruh tim'),
              explainWrong: t('Menyatukan pemahaman tim justru manfaat utama persona.'),
            },
            {
              id: 'goal',
              label: t('Mencantumkan tujuan dan kebiasaan pemakai'),
              explainWrong: t('Tujuan dan kebiasaan memang bagian penting persona.'),
            },
          ],
          answer: 'fake',
          explainCorrect: t('Persona harus berasal dari pola hasil riset, bukan karangan bebas. Tokoh film boleh dikarang, persona tidak.'),
          hints: [t('Tanyakan dari mana isi persona berasal.')],
          tags: ['persona'],
        }),
      ),
      conceptStep({
        title: t('User Flow vs User Journey'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'a06', topic: 'user-flow-journey' },
        alt: t('Urutan layar user flow dari buka aplikasi hingga bayar serta perasaan user journey.'),
        body: [
          rTerm('user-flow', 'User flow'),
          rText(' memetakan langkah di dalam layar (Buka → Cari → Detail → Keranjang → Bayar). Sebaliknya, '),
          rBold('user journey'),
          rText(' lebih luas. Ia mencatat perasaan dan kejadian di luar layar, seperti kesal karena ongkir mahal.'),
        ],
      }),
      qStep({
        id: 'a06-l03-q3',
        type: 'order',
        prompt: t('Urutkan user flow menyelesaikan belanja di aplikasi toko online:'),
        difficulty: 1,
        items: [
          { id: 'det', label: t('Lihat detail produk') },
          { id: 'pay', label: t('Bayar pesanan') },
          { id: 'open', label: t('Buka aplikasi') },
          { id: 'cart', label: t('Masukkan ke keranjang') },
          { id: 'find', label: t('Cari produk') },
        ],
        answer: ['open', 'find', 'det', 'cart', 'pay'],
        explainCorrect: t('Urutannya: buka aplikasi, cari produk, lihat detail, keranjang, bayar. Setiap layar mengarah ke layar berikutnya.'),
        hints: [t('Mulai dari membuka aplikasi, akhiri dengan membayar.'), undefined],
        tags: ['user-flow'],
      }),
      qStep(
        makeMcq({
          id: 'a06-l03-q1',
          prompt: t('Pembeli kesal karena kurir terlambat dua hari. Diagram mana yang mencatat kejadian itu?'),
          difficulty: 2,
          choices: [
            { id: 'uj', label: t('User journey') },
            {
              id: 'code',
              label: t('User flow'),
              explainWrong: t('User flow hanya memetakan langkah di layar aplikasi. Kurir terlambat terjadi di luar layar.'),
            },
            {
              id: 'one',
              label: t('Persona'),
              explainWrong: t('Persona menggambarkan siapa pemakainya, bukan urutan kejadian yang ia alami.'),
            },
          ],
          answer: 'uj',
          explainCorrect: t('User journey mencatat perasaan dan kejadian di luar layar, termasuk pengiriman. User flow berhenti di langkah dalam aplikasi.'),
          hints: [t('Tanyakan: apakah kurir terlihat di layar aplikasi?')],
          tags: ['user-flow', 'ux'],
        }),
      ),
      conceptStep({
        title: t('Hambatan dan Petunjuk di Layar'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'kamus-istilah-ux' },
        alt: t('Istilah pain point, friction, affordance, dan feedback pada satu layar.'),
        body: [
          rBold('Pain point'),
          rText(' adalah titik yang membuat pemakai kesal, misalnya ongkir yang baru muncul di akhir. '),
          rBold('Friction'),
          rText(' adalah hambatan yang memperlambat, misalnya form 22 kolom. '),
          rBold('Affordance'),
          rText(' adalah petunjuk dari bentuk tentang cara memakai, misalnya tombol yang tampak timbul. '),
          rBold('Feedback'),
          rText(' adalah tanggapan sistem atas aksi pemakai, misalnya tanda centang setelah menekan Simpan.'),
        ],
      }),
      qStep({
        id: 'a06-l03-q2',
        type: 'match',
        prompt: t('Pasangkan istilah UX dengan maknanya:'),
        difficulty: 2,
        left: [
          { id: 'pp', label: t('Pain point') },
          { id: 'af', label: t('Affordance') },
          { id: 'fb', label: t('Feedback') },
          { id: 'fr', label: t('Friction') },
        ],
        right: [
          { id: 'rpp', label: t('Titik yang membuat pemakai kesal, misalnya biaya tersembunyi') },
          { id: 'raf', label: t('Petunjuk dari bentuk benda tentang cara memakainya') },
          { id: 'rfb', label: t('Tanggapan sistem atas aksi, misalnya pesan "Tersimpan"') },
          { id: 'rfr', label: t('Hambatan yang memperlambat, misalnya form terlalu panjang') },
        ],
        answer: { pp: 'rpp', af: 'raf', fb: 'rfb', fr: 'rfr' },
        explainCorrect: t('Pain point membuat pemakai kesal, friction memperlambat. Affordance memberi petunjuk, feedback memberi tanggapan.'),
        hints: [t('Feedback datang sesudah pemakai menekan sesuatu.'), undefined],
        tags: ['ux'],
      }),
      conceptStep({
        title: t('Tata Isi, Teks Kecil, dan MVP'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'kamus-istilah-ux' },
        alt: t('Istilah information architecture, microcopy, dan MVP.'),
        body: [
          rBold('Information Architecture'),
          rText(' (IA) adalah cara menata isi halaman, seperti menata lorong supermarket. '),
          rBold('Microcopy'),
          rText(' adalah teks kecil di tombol atau pesan error. '),
          rBold('MVP'),
          rText(' adalah versi paling sederhana yang sudah bisa diuji, misalnya daftar produk dan satu tombol pesan. Tim memakainya untuk mengecek ide inti sebelum membangun semua fitur.'),
        ],
      }),
      limitStep({
        riskyAnalogy: false,
        analogy: t('Papan cerita dan profil tokoh film'),
        same: [t('Menyatukan pemahaman seluruh tim tentang siapa tokohnya dan bagaimana alurnya.')],
        different: [t('Karakter film lahir dari imajinasi penulis. Persona harus dibangun dari hasil riset sungguhan.')],
      }),
      simStep(
        'desa-ux',
        t('Telusuri alur kerja UX di simulator dan lihat bagaimana riset mendasari tiap tahap.'),
      ),
      qStep(
        makeMcq({
          id: 'a06-l03-q5',
          type: 'scenario',
          story: t('Banyak calon pendaftar di aplikasi Rani berhenti di tengah, karena harus mengisi 22 kolom. Tombol terakhir hanya bertulis "Proses".'),
          prompt: t('Masalah UX apa yang sedang terjadi?'),
          difficulty: 3,
          choices: [
            { id: 'fm', label: t('Friction tinggi karena form panjang, dan microcopy kurang jelas') },
            {
              id: 'mvp',
              label: t('Feedback yang terlalu banyak muncul setelah pemakai menekan tombol'),
              explainWrong: t('Pemakai justru terhambat dan bingung, bukan kebanjiran tanggapan.'),
            },
            {
              id: 'ia',
              label: t('Information Architecture yang terlalu rumit di halaman beranda'),
              explainWrong: t('Masalahnya ada di panjang form dan teks tombol, bukan di cara menata isi halaman.'),
            },
          ],
          answer: 'fm',
          explainCorrect: t('Memotong kolom mengurangi friction, dan teks tombol yang mudah dipahami membantu pemakai menyelesaikan form. Keduanya menaikkan jumlah yang mendaftar.'),
          hints: [t('Hitung kolom yang harus diisi, lalu baca tulisan tombolnya.')],
          tags: ['ux'],
        }),
      ),
      qStep({
        id: 'a06-l03-q6',
        type: 'fill',
        prompt: t('Lengkapi istilah ini: cara menata dan memberi nama isi halaman, seperti lorong supermarket, disebut ___ architecture.'),
        difficulty: 2,
        template: '___ architecture',
        bank: ['Information', 'Conversion', 'Onboarding'],
        answer: ['Information'],
        explainCorrect: t('Information Architecture (IA) menata dan menamai isi halaman supaya mudah ditemukan. Seperti papan petunjuk di lorong supermarket.'),
        hints: [t('Pikirkan isi halaman: apa yang ditata?'), undefined],
        tags: ['ux'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a06-l03-r1',
        prompt: t('Apa nama versi produk paling sederhana yang sudah bisa diuji ke pemakai sungguhan?'),
        choices: [
          { id: 'mvp', label: t('MVP (Minimum Viable Product)') },
          {
            id: 'ia',
            label: t('Information Architecture'),
            explainWrong: t('IA adalah cara menata dan mengelompokkan isi halaman.'),
          },
          {
            id: 'pers',
            label: t('Persona'),
            explainWrong: t('Persona adalah tokoh rekaan dari riset, bukan versi produk.'),
          },
        ],
        answer: 'mvp',
        explainCorrect: t('Dengan MVP, tim bisa menguji ide inti tanpa menunggu semua fitur selesai. Seperti mencoba satu resep dulu sebelum membuka restoran.'),
        hints: [t('Cari versi yang paling sederhana, tetapi sudah bisa dipakai.')],
        tags: ['ux'],
      }),
      makeTf({
        id: 'a06-l03-r2',
        prompt: t('Teks kecil seperti label tombol dan pesan error termasuk microcopy.'),
        answer: true,
        explainCorrect: t('Label tombol, petunjuk isian, dan pesan error adalah microcopy. Teks yang mudah dipahami mencegah pemakai bingung.'),
        explainWrong: t('Label tombol, petunjuk isian, dan pesan error memang microcopy. Teks kecil itu ikut menentukan UX.'),
        hints: [t('Pikirkan tulisan kecil di layar.')],
        tags: ['ux'],
      }),
    ],
    recap: t(
      'Persona berasal dari riset. User flow memetakan langkah di layar, user journey mencakup perasaan di luar layar.',
    ),
  }),

  // ---------------------------------------------------------------------------------------------
  // a06-l04  Wireframe, mockup, prototype
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a06-l04',
    worldId: 'a06',
    title: 'Wireframe, mockup, prototype',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan denah kasar, gambar berwarna, dan contoh yang bisa diklik.',
      'Kamu bisa menjelaskan peran wireframe, mockup, dan prototype dalam menekan biaya revisi sebelum menulis kode.',
    ),
    estMinutes: 6,
    introducesTerms: ['prototype'],
    usesTerms: ['wireframe', 'ux', 'ui', 'design-thinking'],
    stickerId: 'denah-rumah',
    warmupFrom: 'a06-l03',
    atWork: 'Kamu akan membuat prototype di alat desain, lalu menunjukkannya ke pemakai sebelum programmer mulai menulis kode.',
    steps: [
      storyStep('a06/denah-rumah.svg', [
        rText(
          'Arsitek menggambar denah pensil dulu. Lalu gambar 3D berwarna, lalu rumah contoh yang pintunya bisa dibuka. Bagaimana cara merancang web seperti itu?',
          'Tim Dimas ingin menguji alur beli sepatu sebelum menulis kode. Mereka memakai tiga tahap seperti arsitek: denah, gambar 3D, lalu rumah contoh.',
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
            ' adalah sketsa kasar hitam-putih. Ia menata letak tombol dan gambar. Warna dipilih nanti.',
            ' adalah sketsa struktur hitam-putih. Ia menata letak dan urutan bagian halaman, tanpa warna atau foto.',
          ),
        ],
      }),
      qStep(
        makeTf({
          id: 'a06-l04-q3',
          prompt: t(
            'Saat membuat wireframe, kamu sebaiknya langsung memilih warna yang rumit.',
            'Pada wireframe awal, tim sebaiknya langsung memilih kombinasi warna gradasi yang rumit.',
          ),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru: wireframe hitam-putih supaya kamu fokus ke letak. Seperti denah pensil tanpa cat.',
            'Pernyataan itu keliru: wireframe dibuat hitam-putih supaya tim fokus pada susunan. Warna baru dipilih di tahap mockup.',
          ),
          explainWrong: t(
            'Warna dipilih nanti, di tahap gambar berwarna. Denah pensil tidak memakai cat.',
            'Warna dan gaya visual dipilih nanti, pada tahap mockup.',
          ),
          hints: [t('Ingat denah pensil di cerita arsitek.')],
          tags: ['wireframe'],
        }),
      ),
      conceptStep({
        title: t('Gambar Jadi dan Versi Bisa Diklik', 'Tahap 2 dan 3: Mockup dan Prototype'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'mockup-dan-prototype' },
        alt: t('Mockup gambar berwarna statis dan prototype yang menghubungkan antarlayar saat diklik.'),
        body: [
          rBold('Mockup', 'Mockup'),
          rText(
            ' sudah penuh warna dan huruf, tetapi diam. ',
            ' memberi warna, huruf, dan gaya visual lengkap (statis). ',
          ),
          rTerm('prototype', 'Prototype', 'Prototype'),
          rText(
            ' sudah bisa diklik seperti aslinya. Mengubah rancangan jauh lebih mudah daripada membongkar tembok.',
            ' adalah mockup yang layarnya terhubung, jadi bisa diklik untuk menguji alur.',
          ),
        ],
      }),
      conceptStep({
        title: t('Cepat Ketahuan, Hemat Tenaga', 'Mengapa Harus Bertahap?'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'hemat-biaya-revisi' },
        alt: t('Grafik biaya perbaikan murah di wireframe dan mahal setelah menulis kode penuh.'),
        modes: ['pro'],
        body: [
          rText(
            'Makin awal kesalahan alur ketahuan di wireframe atau prototype, makin murah dan cepat perbaikannya. Membongkar kode yang sudah jadi jauh lebih mahal.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a06-l04-q2',
          type: 'analogy',
          prompt: t(
            'Gambar 3D rumah sudah dicat, tetapi pintunya belum bisa dibuka. Itu mirip apa?',
            'Gambar 3D rumah sudah dicat dan berperabot, tetapi pintunya belum bisa dibuka. Itu mirip tahap apa?',
          ),
          choices: [
            { id: 'mk', label: t('Mockup: gambar berwarna', 'Mockup') },
            {
              id: 'wf',
              label: t('Wireframe: sketsa hitam-putih', 'Wireframe'),
              explainWrong: t('Wireframe masih sketsa hitam-putih tanpa cat.'),
            },
            {
              id: 'pr',
              label: t('Prototype: bisa diklik', 'Prototype'),
              explainWrong: t(
                'Prototype itu seperti rumah contoh yang pintunya bisa dibuka.',
                'Pada prototype, tombol atau pintu sudah bisa diklik dan dicoba alurnya.',
              ),
            },
          ],
          answer: 'mk',
          explainCorrect: t(
            'Mockup sudah berwarna, tetapi masih diam. Seperti gambar rumah yang indah tetapi belum bisa dimasuki.',
            'Mockup menampilkan hasil visual akhir, tetapi belum punya alur klik. Prototype menambahkan alur itu.',
          ),
          hints: [t('Ingat gambar kedua yang dibuat arsitek.', 'Warna sudah ada. Apa yang belum bisa?')],
          tags: ['prototype', 'ui'],
        }),
      ),
      limitStep({
        riskyAnalogy: false,
        analogy: t('Membangun rumah: denah, gambar 3D, rumah contoh'),
        same: [t('Menguji tata ruang sebelum bahan bangunan atau kode terpasang permanen.')],
        different: [t('Rumah contoh fisik mahal dan lama dibangun. Prototype digital bisa direvisi dalam hitungan menit.')],
      }),
      simStep(
        'desa-ux',
        t(
          'Ketuk tahap Contoh dan lihat di mana ia berada.',
          'Amati posisi tahap Prototype dan Test sebelum tim mulai menulis kode.',
        ),
      ),
      qStep({
        id: 'a06-l04-q1',
        type: 'order',
        prompt: t(
          'Urutkan 3 tahap rancangan, dari paling kasar sampai bisa diklik.',
          'Urutkan tiga tahap rancangan dari paling kasar sampai yang bisa dicoba klik:',
        ),
        difficulty: 1,
        items: [
          { id: 'mk', label: t('Mockup: gambar berwarna', 'Mockup (gambar jadi berwarna)') },
          { id: 'pr', label: t('Prototype: bisa diklik', 'Prototype (bisa diklik pindah halaman)') },
          { id: 'wf', label: t('Wireframe: sketsa hitam-putih', 'Wireframe (sketsa kasar hitam-putih)') },
        ],
        answer: ['wf', 'mk', 'pr'],
        explainCorrect: t(
          'Urutannya: wireframe, mockup, prototype. Seperti denah pensil, gambar 3D, lalu rumah contoh.',
          'Wireframe menyusun struktur, mockup menambah tampilan visual, prototype menambah alur klik.',
        ),
        hints: [t('Mulai dari denah pensil, akhiri dengan rumah contoh.'), undefined],
        tags: ['wireframe', 'prototype'],
      }),
      qStep(
        makeMcq({
          id: 'a06-l04-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Denah dan rumah contoh fisik'),
          prompt: t('Apa beda prototype aplikasi dengan rumah contoh fisik?'),
          difficulty: 2,
          choices: [
            { id: 'fast', label: t('Prototype digital bisa diubah dan digandakan dalam detik') },
            {
              id: 'cheap',
              label: t('Kesalahan lebih murah ditemukan sebelum bangunan atau kode jadi'),
              explainWrong: t('Itu persamaan, bukan perbedaan. Rumah contoh dan prototype sama-sama dibuat sebelum bangunan jadi.'),
            },
            {
              id: 'try',
              label: t('Calon pemakai bisa mencoba alurnya lebih awal'),
              explainWrong: t('Itu juga persamaan keduanya. Rumah contoh pun bisa dimasuki sebelum rumah asli dibangun.'),
            },
          ],
          answer: 'fast',
          explainCorrect: t('Prototype digital bisa direvisi berkali-kali dengan cepat. Rumah contoh fisik harus dibongkar dan dibangun ulang.'),
          hints: [t('Cari hal yang hanya berlaku untuk prototype digital.')],
          tags: ['prototype'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l04-q5',
          type: 'scenario',
          story: t(
            'Tim Dimas ingin tahu apakah pembeli paham cara memilih sepatu sampai membayar. Programmer belum mulai bekerja.',
            'Tim Dimas ingin tahu apakah pembeli paham urutan klik dari memilih sepatu sampai membayar, sebelum programmer menulis kode.',
          ),
          prompt: t('Apa yang paling cocok dibuat tim Dimas sekarang?', 'Rancangan apa yang paling cocok dibuat sekarang?'),
          difficulty: 2,
          choices: [
            { id: 'pr', label: t('Contoh yang bisa diklik sampai bayar', 'Prototype yang bisa diklik sampai pembayaran') },
            {
              id: 'wf',
              label: t('Gambar berwarna satu halaman saja', 'Mockup satu halaman produk'),
              explainWrong: t(
                'Satu gambar diam tidak menguji urutan klik. Pembeli perlu mencoba berpindah halaman.',
                'Mockup statis tidak menguji urutan klik antarhalaman.',
              ),
            },
            {
              id: 'db',
              label: t('Menyiapkan penyimpanan data dulu', 'Membangun database dan server dulu'),
              explainWrong: t(
                'Penyimpanan data dibangun belakangan. Urutan klik diuji lebih dulu.',
                'Alur klik diuji di prototype sebelum sistem penuh dibangun.',
              ),
            },
          ],
          answer: 'pr',
          explainCorrect: t(
            'Contoh yang bisa diklik menguji urutan langkah pembeli. Seperti rumah contoh yang pintunya bisa dibuka.',
            'Prototype menguji alur klik sebelum coding dimulai. Kesalahan urutan ketahuan saat perbaikannya masih murah.',
          ),
          hints: [
            t(
              'Ingat rumah contoh yang pintunya bisa dibuka.',
              'Cari rancangan yang bisa diklik, bukan hanya dilihat.',
            ),
          ],
          tags: ['prototype', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l04-q6',
          type: 'why',
          base: 'early-testing',
          prompt: t(
            'Mengapa lebih baik menemukan kesalahan saat masih sketsa?',
            'Mengapa kesalahan desain lebih baik ditemukan di wireframe atau prototype daripada setelah aplikasi dikoding?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'save',
              label: t(
                'Karena sketsa lebih mudah dan murah diubah',
                'Membetulkan sketsa lebih cepat dan murah daripada menulis ulang',
              ),
            },
            {
              id: 'css',
              label: t('Karena aplikasi jadi tidak perlu diuji lagi', 'Prototype yang lolos uji tidak perlu diuji lagi setelah dikoding'),
              explainWrong: t(
                'Aplikasi tetap perlu diuji berkali-kali. Sketsa hanya membuat perbaikan lebih murah.',
                'Aplikasi jadi tetap perlu diuji. Uji awal hanya membuat perbaikan lebih murah.',
              ),
            },
            {
              id: 'font',
              label: t('Karena fitur aplikasi jadi lebih banyak', 'Wireframe sudah menunjukkan kecepatan aplikasi di HP pemakai'),
              explainWrong: t(
                'Tujuannya bukan fitur lebih banyak. Tujuannya menghemat tenaga saat membetulkan.',
                'Wireframe dan prototype menguji alur, bukan kecepatan. Kecepatan baru terukur setelah ada kode.',
              ),
            },
          ],
          answer: 'save',
          explainCorrect: t(
            'Menghapus garis pensil jauh lebih mudah daripada membongkar tembok. Perbaiki rancangan dulu, baru bangun.',
            'Memindahkan kotak di alat desain hanya butuh detik. Merombak fitur di kode butuh berhari-hari.',
          ),
          hints: [
            t(
              'Mana lebih mudah: menghapus pensil atau membongkar tembok?',
              'Bandingkan waktu memindahkan kotak dengan menulis ulang kode.',
            ),
          ],
          tags: ['wireframe', 'prototype'],
        }),
      ),
      qStep({
        id: 'a06-l04-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi tiga tahap rancangan UX sesuai tugasnya:'),
        difficulty: 2,
        template: 'Tim menata letak di ___, memberi warna dan huruf di ___, lalu menguji alur klik di ___.',
        bank: ['prototype', 'user flow', 'wireframe', 'mockup'],
        answer: ['wireframe', 'mockup', 'prototype'],
        explainCorrect: t('Wireframe menyusun struktur, mockup menambah warna dan huruf, prototype menghubungkan layar supaya alurnya bisa diuji.'),
        hints: [t('Struktur dulu, tampilan kemudian, uji klik terakhir.'), undefined],
        tags: ['wireframe', 'prototype'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a06-l04-r1',
        prompt: t(
          'Arsitek menggambar denah pensil dulu. Di web, itu mirip apa?',
          'Tahap rancangan mana yang masih hitam-putih dan berfokus pada tata letak?',
        ),
        choices: [
          { id: 'wf', label: t('Wireframe: sketsa hitam-putih', 'Wireframe') },
          { id: 'mk', label: t('Mockup: gambar berwarna', 'Mockup'), explainWrong: t('Mockup sudah punya warna dan jenis huruf.') },
          { id: 'pr', label: t('Prototype: bisa diklik', 'Prototype'), explainWrong: t('Prototype sudah bisa diklik untuk dicoba.') },
        ],
        answer: 'wf',
        explainCorrect: t(
          'Wireframe hanya menata letak, tanpa warna. Seperti denah pensil sebelum rumah dibangun.',
          'Wireframe menata susunan isi tanpa warna dan foto. Warna baru dipilih di tahap mockup.',
        ),
        hints: [t('Denah pensil belum diberi cat.', 'Ingat denah pensil tanpa cat.')],
        tags: ['wireframe'],
      }),
      makeMcq({
        id: 'a06-l04-r2',
        prompt: t(
          'Rumah contoh pintunya sudah bisa dibuka. Di web, itu mirip apa?',
          'Tahap rancangan mana yang tombolnya sudah bisa diklik untuk menguji alur?',
        ),
        choices: [
          { id: 'pr', label: t('Prototype: bisa diklik', 'Prototype') },
          { id: 'mk', label: t('Mockup: gambar berwarna', 'Mockup'), explainWrong: t('Mockup masih gambar diam.') },
          { id: 'wf', label: t('Wireframe: sketsa hitam-putih', 'Wireframe'), explainWrong: t('Wireframe masih sketsa hitam-putih.') },
        ],
        answer: 'pr',
        explainCorrect: t(
          'Prototype bisa diklik dan dicoba. Seperti rumah contoh yang pintunya bisa dibuka.',
          'Dengan prototype, pemakai bisa mencoba alur klik sebelum coding.',
        ),
        hints: [t('Ingat tahap terakhir yang dibuat arsitek.', 'Ingat rumah contoh yang pintunya bisa dibuka.')],
        tags: ['prototype'],
      }),
    ],
    recap: t(
      'Rancang bertahap: denah kasar, gambar berwarna, lalu contoh yang bisa diklik.',
      'Mulai dari wireframe untuk struktur, lanjut ke mockup untuk visual, lalu prototype untuk menguji alur sebelum menulis kode.',
    ),
    companion: {
      talkPrompts: ['Mana lebih cepat: menggambar denah pensil atau langsung mewarnai?'],
      offlineActivity:
        'Gambar satu wireframe kotak-kotak hitam-putih untuk beranda toko mainan di buku tulis dalam 3 menit.',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // a06-l05  Usability testing
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a06-l05',
    worldId: 'a06',
    title: 'Usability testing',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengajak 5 teman mencoba rancangan tanpa memberi tahu caranya.',
      'Kamu bisa merencanakan usability testing, menjaga sikap netral, dan membedakannya dari A/B testing.',
    ),
    estMinutes: 5,
    introducesTerms: ['usability-testing'],
    usesTerms: ['ux', 'prototype', 'design-thinking'],
    warmupFrom: 'a06-l04',
    atWork: 'Kamu akan melihat peserta salah klik di rekaman sesi uji, lalu mencatatnya sebagai masalah desain.',
    steps: [
      storyStep('a06/uji-papan-main.svg', [
        rText(
          'Sari membuat papan permainan baru. Ia mengajak 5 teman bermain, tanpa membantu sedikit pun. Di mana teman-temannya bingung?',
          'Sebelum menerbitkan papan permainannya, Sari meminta 5 teman bermain sendiri. Ia diam dan mencatat bagian aturan yang membingungkan.',
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
            ' adalah mengajak orang mencoba rancanganmu. Jangan dibantu! Catat di mana mereka bingung.',
            ' adalah meminta pemakai mencoba rancangan sambil diamati. Penguji diam dan mencatat titik hambatan, tidak membimbing mereka.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a06-l05-q1',
          prompt: t(
            'Temanmu bingung mencari tombol Bayar di rancanganmu. Apa yang kamu lakukan?',
            'Peserta bingung mencari tombol Bayar di prototype. Apa sikap terbaik penguji?',
          ),
          choices: [
            { id: 'obs', label: t('Mengamati dan mencatat tempat ia bingung') },
            {
              id: 'point',
              label: t('Menunjuk tombolnya dan memberi tahu letaknya'),
              explainWrong: t(
                'Kalau dibantu, kamu tidak tahu di mana orang lain akan tersesat. Seperti membisikkan jawaban saat teman bermain.',
                'Kalau dibantu, kamu tidak tahu di mana pemakai asli akan tersesat saat sendirian.',
              ),
            },
            {
              id: 'blame',
              label: t('Menegur temanmu karena kurang teliti', 'Menegur peserta karena kurang teliti'),
              explainWrong: t(
                'Yang diuji adalah rancanganmu, bukan temanmu. Titik bingung itu berharga.',
                'Yang diuji adalah rancangan, bukan peserta. Titik bingung itu berharga.',
              ),
            },
          ],
          answer: 'obs',
          explainCorrect: t(
            'Titik bingung memberi tahu bagian yang perlu dibetulkan. Seperti peta yang menunjukkan jalan buntu.',
            'Titik kebingungan menunjukkan bagian rancangan yang perlu dibetulkan. Catat letaknya dan apa yang peserta ucapkan.',
          ),
          hints: [t('Ingat Sari yang hanya mencatat, tidak membantu.')],
          tags: ['usability-testing'],
        }),
      ),
      conceptStep({
        title: t('Lima Orang Sudah Cukup', 'Aturan 5 Pemakai dan Sikap Netral'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'lima-pengguna' },
        alt: t('Lima ikon pemakai sudah menyingkap sebagian besar hambatan desain.'),
        body: [
          rText(
            'Mengajak 5 orang mencoba sudah menemukan banyak masalah. Kalau temanmu salah klik, rancangannya yang perlu dibetulkan.',
            'Menguji 5 pemakai sudah menemukan sebagian besar masalah. Kalau peserta salah klik, rancangannya yang dibetulkan, bukan pemakainya yang disalahkan.',
          ),
        ],
      }),
      qStep(
        makeTf({
          id: 'a06-l05-q2',
          prompt: t(
            'Mengajak 5 orang mencoba sudah cukup untuk menemukan banyak masalah.',
            'Menguji lima orang saja sudah cukup untuk menemukan sebagian besar masalah besar pada tampilan.',
          ),
          answer: true,
          explainCorrect: t(
            'Lima orang sudah menunjukkan masalah yang berulang. Tidak perlu menunggu 1.000 orang.',
            'Uji kecil ke 5 pemakai sudah menunjukkan pola kebingungan yang berulang. Pola itu cukup untuk mulai membetulkan rancangan.',
          ),
          explainWrong: t(
            'Lima orang sudah cukup untuk mulai. Banyak masalah muncul berulang pada orang berbeda.',
            'Pola kebingungan yang sama muncul pada sekitar 5 pemakai. Menunggu ratusan peserta hanya menunda perbaikan.',
          ),
          hints: [t('Ingat Sari dan 5 temannya.')],
          tags: ['usability-testing'],
        }),
      ),
      conceptStep({
        title: t('Membandingkan Dua Pilihan', 'A/B Testing dan Conversion'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a06', topic: 'ab-testing-conversion' },
        alt: t('Perbandingan tombol versi A dan versi B untuk mengukur mana yang lebih banyak dipilih.'),
        modes: ['pro'],
        body: [
          rText(
            'A/B testing membandingkan dua versi halaman pada pemakai sungguhan setelah rilis. Versi yang membuat lebih banyak orang menyelesaikan tujuan (conversion) dianggap lebih baik.',
          ),
        ],
      }),
      limitStep({
        riskyAnalogy: false,
        analogy: t('Mengamati teman mencoba papan permainan baru'),
        same: [t('Kamu melihat langsung bagian mana pemain berhenti atau salah paham tanpa membocorkan jawaban.')],
        different: [
          t('Aturan papan permainan dicetak sekali dan sulit diubah. Aplikasi bisa dibetulkan dan diuji ulang, bahkan lewat A/B testing.'),
        ],
      }),
      simStep(
        'desa-ux',
        t(
          'Lihat tahap terakhir di Desa UX: contoh diuji pemakai asli.',
          'Telusuri tahap Prototype dan Test di alur UX untuk melihat mengapa umpan balik langsung menentukan.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a06-l05-q3',
          type: 'analogy',
          prompt: t(
            'Temanmu mencoba permainan baru tanpa kamu bocorkan caranya. Itu mirip apa?',
            'Meminta teman mencoba permainan baru sendirian tanpa membocorkan caranya mirip kegiatan apa?',
          ),
          choices: [
            { id: 'ut', label: t('Usability testing: menguji ke pemakai', 'Usability testing') },
            {
              id: 'wf',
              label: t('Wireframe: menggambar sketsa hitam-putih', 'Membuat wireframe'),
              explainWrong: t(
                'Wireframe itu menggambar sketsanya, bukan mengamati orang yang mencoba.',
                'Wireframe adalah menggambar sketsa kasarnya, bukan mengamati orang mencobanya.',
              ),
            },
            {
              id: 'css',
              label: t('Prototype: membuat contoh bisa diklik', 'Membuat prototype'),
              explainWrong: t(
                'Prototype itu contoh yang dicoba. Yang mirip di sini adalah mengamati orang mencobanya.',
                'Prototype adalah bahan yang diuji. Mengamati orang yang mencobanya adalah usability testing.',
              ),
            },
          ],
          answer: 'ut',
          explainCorrect: t(
            'Usability testing melihat apakah rancangan mudah dipahami tanpa petunjuk. Seperti teman yang bermain tanpa dibisiki.',
            'Usability testing menilai apakah rancangan mudah dipahami tanpa petunjuk dari pembuatnya. Peserta mencoba sendiri, penguji hanya mengamati.',
          ),
          hints: [t('Ingat teman Sari yang bermain sendiri.')],
          tags: ['usability-testing'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l05-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Menguji papan permainan ke teman'),
          prompt: t('Empat dari lima peserta gagal menemukan tombol Simpan. Kesimpulan mana yang keliru?'),
          difficulty: 2,
          choices: [
            { id: 'err', label: t('Pemakainya kurang pintar, desain tidak perlu diubah') },
            {
              id: 'fix',
              label: t('Letak atau bentuk tombol Simpan perlu dibuat lebih jelas'),
              explainWrong: t('Itu kesimpulan yang masuk akal dari hasil uji. Banyak peserta gagal di bagian yang sama.'),
            },
            {
              id: 'retest',
              label: t('Setelah dibetulkan, rancangan diuji ulang'),
              explainWrong: t('Menguji ulang setelah revisi memang langkah yang benar. Siklusnya berulang.'),
            },
          ],
          answer: 'err',
          explainCorrect: t('Kalau banyak peserta gagal di bagian yang sama, masalahnya ada di rancangan. Peserta bukan penyebabnya.'),
          hints: [t('Siapa yang diuji: peserta atau rancangan?')],
          tags: ['usability-testing', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a06-l05-q5',
          type: 'scenario',
          modes: ['pro'],
          story: t('Rani ingin tahu mana yang lebih sering diklik pengunjung: tombol hijau "Daftar Gratis" atau tombol biru "Mulai Sekarang".'),
          prompt: t('Cara apa yang paling tepat membandingkan kedua versi pada pengunjung sungguhan?'),
          difficulty: 2,
          choices: [
            { id: 'ab', label: t('A/B testing: tiap versi dilihat kelompok pengunjung berbeda') },
            {
              id: 'coin',
              label: t('Menanyakan pendapat seluruh tim desain tentang tombol yang paling bagus'),
              explainWrong: t('Pendapat tim belum tentu sama dengan perilaku pengunjung. A/B testing memakai data klik sungguhan.'),
            },
            {
              id: 'both',
              label: t('Memasang kedua tombol bersebelahan untuk aksi yang sama'),
              explainWrong: t('Dua tombol untuk satu aksi membingungkan pemakai. Hasilnya juga tidak bisa dibandingkan dengan adil.'),
            },
          ],
          answer: 'ab',
          explainCorrect: t('A/B testing membandingkan dua versi lewat perilaku pengunjung sungguhan. Versi dengan hasil lebih baik yang dipakai.'),
          hints: [t('Cari cara yang memakai data, bukan pendapat.')],
          tags: ['usability-testing', 'ux'],
        }),
      ),
      qStep({
        id: 'a06-l05-q6',
        type: 'sort',
        prompt: t(
          'Kelompokkan tindakan penguji: dilakukan atau dihindari.',
          'Kelompokkan tindakan saat memimpin usability testing ke "Lakukan" atau "Hindari":',
        ),
        difficulty: 2,
        items: [
          { id: 's1', label: t('Mencatat tempat teman berhenti atau ragu', 'Mencatat bagian saat peserta berhenti atau ragu') },
          { id: 's2', label: t('Menunjuk tombol yang benar saat teman bingung', 'Menunjuk tombol yang benar saat peserta bingung') },
          { id: 's3', label: t('Bertanya apa yang sedang ia pikirkan', 'Meminta peserta menceritakan apa yang ia pikirkan') },
          { id: 's4', label: t('Membela rancangan dan menyalahkan teman', 'Membela rancangan dan menyalahkan peserta') },
        ],
        bins: [
          { id: 'do', label: t('Lakukan'), icon: 'lightbulb' },
          { id: 'dont', label: t('Hindari'), icon: 'lock' },
        ],
        answer: { s1: 'do', s2: 'dont', s3: 'do', s4: 'dont' },
        explainCorrect: t(
          'Penguji yang baik mengamati dengan tenang. Ia tidak membantu dan tidak membela diri.',
          'Penguji netral mengamati, mencatat, dan menggali pikiran peserta. Membantu atau membela rancangan merusak hasil uji.',
        ),
        hints: [
          t(
            'Ingat Sari: ia hanya mengamati dan mencatat.',
            'Penguji netral tidak mengubah apa yang dilakukan peserta.',
          ),
          undefined,
        ],
        tags: ['usability-testing'],
      }),
      qStep({
        id: 'a06-l05-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Apa nama persentase pemakai yang akhirnya menyelesaikan aksi yang diharapkan, seperti mendaftar atau membeli?'),
        difficulty: 2,
        accept: ['conversion', 'konversi'],
        explainCorrect: t('Conversion mengukur berapa persen pemakai yang menyelesaikan tujuan utama alur. Naiknya angka itu tanda alurnya makin lancar.'),
        hints: [t('Angka ini dipantau tim saat A/B testing.'), undefined],
        tags: ['ux'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a06-l05-r1',
        prompt: t(
          'Mengapa kamu tidak boleh membantu teman saat ia mencoba rancanganmu?',
          'Mengapa penguji tidak boleh membantu peserta mengklik tombol saat sesi?',
        ),
        choices: [
          { id: 'ok', label: t('Supaya terlihat di mana ia tersesat sendiri') },
          {
            id: 'no',
            label: t('Supaya temanmu belajar lebih pintar', 'Supaya peserta belajar lebih pintar'),
            explainWrong: t(
              'Yang diuji adalah rancanganmu, bukan kepintaran temanmu. Bantuan menutupi masalah.',
              'Yang diuji adalah rancangan, bukan kepintaran peserta. Bantuan menutupi masalah.',
            ),
          },
          {
            id: 'p',
            label: t('Supaya rancanganmu terlihat sempurna', 'Supaya rancangan terlihat sempurna'),
            explainWrong: t('Bantuan justru menutupi masalah. Yang kamu cari adalah masalahnya.'),
          },
        ],
        answer: 'ok',
        explainCorrect: t(
          'Tanpa bantuan, kamu melihat kesulitan yang asli. Pemakai sungguhan nanti juga memakai sendiri.',
          'Pengamatan jujur tanpa bantuan membuka titik hambatan yang tersembunyi.',
        ),
        hints: [t('Ingat Sari yang hanya mencatat.')],
        tags: ['usability-testing'],
      }),
      makeTf({
        id: 'a06-l05-r2',
        prompt: t(
          'Kalau temanmu salah klik, rancanganmu mungkin perlu dibetulkan.',
          'A/B testing membandingkan dua versi tampilan pada pemakai asli untuk melihat mana yang lebih berhasil.',
        ),
        answer: true,
        explainCorrect: t(
          'Kalau banyak teman salah di tempat yang sama, rancangannya yang perlu diubah. Orangnya tidak salah.',
          'A/B testing membandingkan dua versi pada pemakai asli lewat data perilaku. Hasilnya menunjukkan versi mana yang lebih berhasil.',
        ),
        explainWrong: t(
          'Kalau salah klik terjadi, biasanya rancangannya membingungkan, bukan temanmu yang ceroboh.',
          'A/B testing memang membandingkan dua versi tampilan. Keputusannya diambil dari data klik, bukan dari selera.',
        ),
        hints: [t('Ingat: yang diuji adalah rancangannya.')],
        tags: ['usability-testing'],
      }),
    ],
    recap: t(
      'Ajak 5 orang mencoba tanpa dibantu, lalu catat bagian yang membingungkan.',
      'Uji ke sekitar 5 pemakai secara netral tanpa menuntun. Pakai A/B testing untuk membandingkan dua versi.',
    ),
    companion: {
      talkPrompts: ['Mana yang perlu dibetulkan: temanmu atau aplikasinya?'],
      offlineActivity:
        'Minta satu teman atau anggota keluarga mencari satu menu di aplikasi yang belum pernah ia pakai, tanpa dibantu. Catat tempat ia bingung.',
    },
  }),
];
