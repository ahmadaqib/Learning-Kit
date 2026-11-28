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
  rTerm,
  rText,
  simStep,
  storyStep,
  t,
} from '@/content/lessonHelpers';
import type { Lesson, Rich, World } from '@/content/schema';

/** Teks tebal yang hanya tampil di Pro (nama hukum dan istilah Inggris). Junior tidak melihat nama ini. */
const proBold = (v: string): Rich => ({ t: 'bold', v: { pro: v }, modes: ['pro'] });

export const world: World = {
  id: 'a07',
  track: 'A',
  order: 7,
  title: 'Galeri Desain',
  tagline: t(
    'Tata halaman supaya mata cepat menemukan yang penting. Buat tombol nyaman diketuk jempol.',
    'Kamu bisa menata tampilan dengan prinsip desain visual dan hukum UX, lalu menilai tampilan aplikasi buatan orang lain.',
  ),
  color: '#D6336C',
  illustration: 'a07-galeri-desain',
  sourceChapters: ['J1-08', 'J1-09'],
  requires: ['a06'],
  lessons: [
    'a07-l01',
    'a07-l02',
    'a07-l03',
    'a07-l04',
    'a07-l05',
    'a07-l06',
    'a07-l07',
    'a07-l08',
  ],
  sideQuests: ['a07-sq1', 'a07-sq2'],
  boss: {
    title: 'Tantangan Penjaga Galeri Desain',
    greeting: t(
      'Selamat datang di Galeri Desain! Ayo tunjukkan matamu menata halaman rapi.',
      'Tunjukkan kamu menguasai prinsip desain visual, Gestalt, hukum UX, dan 10 heuristik Nielsen.',
    ),
    guardianName: 'Penjaga Galeri Desain',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'a07-anc-j1',
        prompt: t('Judul dibuat besar dan tebal. Untuk apa?'),
        choices: [
          { id: 'hier', label: t('Supaya mata membacanya dulu') },
          {
            id: 'z',
            label: t('Supaya halaman tampak lebih bagus'),
            explainWrong: t('Judul besar memang enak dilihat. Tujuannya mengatur apa yang dibaca dulu.'),
          },
          {
            id: 'var',
            label: t('Supaya tulisan lain boleh dilewati'),
            explainWrong: t('Tulisan lain tetap dibaca. Judul besar hanya mengatur mana yang dibaca dulu.'),
          },
        ],
        answer: 'hier',
        explainCorrect: t('Tulisan besar menarik mata lebih dulu. Seperti lampu sorot di galeri.'),
        tags: ['hierarki'],
      }),
      makeAnchorMcq({
        id: 'a07-anc-j2',
        prompt: t('Label "Nama" ditaruh dekat kotak Nama. Mengapa?'),
        choices: [
          { id: 'prox', label: t('Supaya terlihat satu kelompok') },
          {
            id: 'col',
            label: t('Supaya hemat tempat di layar'),
            explainWrong: t('Jarak tidak menghemat tempat. Jarak menunjukkan siapa berpasangan dengan siapa.'),
          },
          {
            id: 'net',
            label: t('Supaya kotaknya terlihat lebih besar'),
            explainWrong: t('Ukuran kotak tidak berubah. Label yang dekat hanya menunjukkan pasangannya.'),
          },
        ],
        answer: 'prox',
        explainCorrect: t('Yang berdekatan dianggap satu kelompok. Seperti piring dan sendok di nampan.'),
        tags: ['alignment'],
      }),
      makeAnchorMcq({
        id: 'a07-anc-j3',
        prompt: t('Halaman punya banyak ruang kosong. Apa gunanya?'),
        choices: [
          { id: 'ws', label: t('Mata tidak cepat lelah') },
          {
            id: 'bug',
            label: t('Tanda halaman masih rusak'),
            explainWrong: t('Ruang kosong sengaja dibuat. Itu tanda halaman rapi.'),
          },
          {
            id: 'tag',
            label: t('Tempat iklan yang belum terisi'),
            explainWrong: t('Ruang kosong boleh tetap kosong. Tidak harus ada iklan.'),
          },
        ],
        answer: 'ws',
        explainCorrect: t('Ruang kosong memberi mata jeda. Seperti etalase toko perhiasan yang lega.'),
        tags: ['whitespace'],
      }),
      makeAnchorMcq({
        id: 'a07-anc-j4',
        prompt: t('Sebuah menu punya 60 tombol sekaligus. Apa akibatnya?'),
        choices: [
          { id: 'hick', label: t('Orang jadi bingung memilih') },
          {
            id: 'dns',
            label: t('Orang jadi lebih cepat memilih'),
            explainWrong: t('Pilihan yang banyak tidak membuat orang makin cepat. Mereka malah lama berpikir.'),
          },
          {
            id: 'html',
            label: t('Orang jadi hafal semua tombol'),
            explainWrong: t('Orang tidak hafal 60 tombol sekaligus. Ingatan kita terbatas.'),
          },
        ],
        answer: 'hick',
        explainCorrect: t('Terlalu banyak pilihan membuat orang bingung. Seperti buku menu dengan 80 makanan.'),
        tags: ['hick-law'],
      }),
      makeAnchorMcq({
        id: 'a07-anc-j5',
        type: 'limit',
        analogy: t('Lampu sorot di galeri lukisan'),
        prompt: t(
          'Lampu sorot membuat satu lukisan menonjol. Di layar, apa yang membuat judul menonjol?',
          'Selain terang, apa lagi yang bisa kamu atur di layar untuk menyorot hal penting?',
        ),
        choices: [
          { id: 'size', label: t('Ukuran huruf dan letaknya') },
          {
            id: 'focus',
            label: t('Panjang kalimatnya'),
            explainWrong: t('Kalimat panjang tidak membuat judul menonjol. Yang menonjol adalah huruf besar.'),
          },
          {
            id: 'guide',
            label: t('Banyaknya tulisan di sekitarnya'),
            explainWrong: t('Tulisan yang ramai di sekitarnya justru menutupi judul. Atur ukuran dan letaknya.'),
          },
        ],
        answer: 'size',
        explainCorrect: t('Tanpa lampu sorot, ukuran dan letak huruf yang membuat judul menonjol.'),
        tags: ['hierarki'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a07-anc-p1',
        prompt: t('Prinsip Gestalt mana yang membuat kartu dalam satu kotak berbingkai dianggap satu kelompok?'),
        choices: [
          { id: 'cr', label: t('Common Region') },
          {
            id: 'clo',
            label: t('Closure'),
            explainWrong: t('Closure membuat otak melengkapi garis bentuk yang terputus.'),
          },
          {
            id: 'con',
            label: t('Continuity'),
            explainWrong: t('Continuity membuat mata mengikuti alur garis atau lengkungan.'),
          },
        ],
        answer: 'cr',
        explainCorrect: t('Elemen di dalam satu batas atau latar dibaca sebagai satu kesatuan. Itu Common Region.'),
        tags: ['gestalt'],
      }),
      makeAnchorMcq({
        id: 'a07-anc-p2',
        prompt: t('Mengapa tombol berbahaya seperti "Hapus Permanen" dijauhkan dari tombol yang sering diketuk?'),
        choices: [
          { id: 'err', label: t('Supaya jari tidak salah ketuk') },
          {
            id: 'hide',
            label: t('Supaya tombol Hapus lebih mudah ditemukan'),
            explainWrong: t('Jarak yang jauh justru membuat tombol lebih sulit dicapai. Tujuannya mengurangi salah ketuk.'),
          },
          {
            id: 'load',
            label: t('Supaya halaman dimuat lebih cepat'),
            explainWrong: t('Posisi tombol tidak memengaruhi kecepatan memuat halaman.'),
          },
        ],
        answer: 'err',
        explainCorrect: t("Makin jauh sebuah target, makin kecil kemungkinan terketuk tanpa sengaja. Itu contoh Fitts's Law."),
        tags: ['fitts-law'],
      }),
      makeAnchorMcq({
        id: 'a07-anc-p3',
        prompt: t('Dalam Doherty Threshold, tanggapan sistem harus di bawah berapa lama agar terasa instan?'),
        choices: [
          { id: 'd4', label: t('0,4 detik') },
          {
            id: 'd5',
            label: t('5 detik'),
            explainWrong: t('Diam 5 detik membuat orang merasa sistem macet atau lambat.'),
          },
          {
            id: 'd30',
            label: t('30 detik'),
            explainWrong: t('Menunggu 30 detik tanpa tanda apa pun membuat kebanyakan orang pergi.'),
          },
        ],
        answer: 'd4',
        explainCorrect: t('Di bawah 0,4 detik, jeda nyaris tidak terasa. Kalau lebih lama, tampilkan indikator muat.'),
        tags: ['fitts-law'],
      }),
      makeAnchorMcq({
        id: 'a07-anc-p4',
        prompt: t('Memecah nomor kartu 16 digit menjadi 4-4-4-4 memakai hukum UX apa?'),
        choices: [
          { id: 'mil', label: t("Miller's Law") },
          {
            id: 'jak',
            label: t("Jakob's Law"),
            explainWrong: t("Jakob's Law membahas kebiasaan orang dari situs lain."),
          },
          {
            id: 'par',
            label: t('Pareto Principle'),
            explainWrong: t('Pareto Principle membahas 20% fitur yang menghasilkan 80% pemakaian.'),
          },
        ],
        answer: 'mil',
        explainCorrect: t('Chunking memecah 16 digit menjadi 4 kelompok pendek, supaya muat di memori kerja yang terbatas.'),
        tags: ['miller-law'],
      }),
      makeAnchorMcq({
        id: 'a07-anc-p5',
        prompt: t('Tombol "Beranda" di ujung kiri dan "Profil" di ujung kanan bilah bawah memakai efek apa?'),
        choices: [
          { id: 'sp', label: t('Serial Position Effect') },
          {
            id: 'vr',
            label: t('Von Restorff Effect'),
            explainWrong: t('Von Restorff membuat satu elemen yang paling berbeda paling diingat.'),
          },
          {
            id: 'zg',
            label: t('Zeigarnik Effect'),
            explainWrong: t('Zeigarnik membuat tugas yang belum selesai terus teringat.'),
          },
        ],
        answer: 'sp',
        explainCorrect: t('Item pertama dan terakhir dalam deretan paling mudah diingat.'),
        tags: ['miller-law'],
      }),
      makeAnchorMcq({
        id: 'a07-anc-p6',
        type: 'limit',
        analogy: t('Aesthetic-Usability Effect: makanan ditata cantik terasa lebih enak'),
        prompt: t('Salah paham apa yang bisa muncul tentang Aesthetic-Usability Effect?'),
        choices: [
          { id: 'skip', label: t('Tampilan indah sudah cukup, jadi tidak perlu diuji') },
          {
            id: 'first',
            label: t('Tampilan rapi memberi kesan pertama yang baik'),
            explainWrong: t('Itu memang benar. Kesan pertama memengaruhi rasa percaya.'),
          },
          {
            id: 'forgive',
            label: t('Tampilan rapi membuat kekurangan kecil lebih dimaafkan'),
            explainWrong: t('Itu juga benar. Kekurangan besar tetap tidak dimaafkan.'),
          },
        ],
        answer: 'skip',
        explainCorrect: t('Tampilan indah tidak memperbaiki alur yang rusak. Tim tetap perlu menguji dengan orang sungguhan.'),
        tags: ['peak-end', 'usability-testing'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'a07-l01',
    worldId: 'a07',
    title: 'Lampu sorot untuk mata',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa memilih tulisan yang dibaca mata lebih dulu.',
      'Kamu bisa menyusun urutan baca dengan ukuran, ketebalan, warna, dan kontras.',
    ),
    estMinutes: 6,
    introducesTerms: ['hierarki'],
    usesTerms: ['ui', 'ux'],
    stickerId: 'sorotan-galeri',
    warmupFrom: 'a06-l05',
    atWork: 'Kamu akan mengatur ukuran judul dan tombol di halaman promo supaya pembaca langsung melihat penawarannya.',
    steps: [
      storyStep('a07/sorotan-galeri.svg', [
        rText(
          'Di galeri, lampu sorot menyinari lukisan utama. Mata langsung tahu harus melihat ke mana. Di halaman web, apa yang jadi lampu sorotnya?',
          'Poster promo toko online memuat judul, harga, tanggal, dan tombol dengan ukuran yang sama. Pembaca tidak tahu harus mulai dari mana.',
        ),
      ]),
      conceptStep({
        title: t('Mata lihat mana dulu?', 'Hierarki visual'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'urutan-baca-hierarki' },
        alt: t('Poster dengan judul besar dan tombol jelas dibanding poster berukuran sama semua.'),
        body: [
          rTerm('hierarki', 'Hierarki visual', 'Hierarki visual'),
          rText(
            ' itu seperti lampu sorot di galeri. Ia membuat mata melihat hal terpenting lebih dulu. Caranya: ukuran besar, huruf tebal, warna, dan letak.',
            ' adalah urutan perhatian yang kamu atur lewat ukuran, ketebalan, warna, dan posisi. Informasi terpenting dibaca lebih dulu, informasi pendukung sesudahnya.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a07-l01-q1',
          type: 'analogy',
          prompt: t(
            'Judul promo ditulis besar dan tebal. Itu mirip apa di galeri?',
            'Judul promo dibuat paling besar dan tebal. Dalam analogi galeri, itu mirip apa?',
          ),
          choices: [
            { id: 'lamp', label: t('Satu lukisan disorot paling terang') },
            {
              id: 'dark',
              label: t('Semua lampu galeri dimatikan'),
              explainWrong: t(
                'Kalau semua lampu mati, tidak ada yang terlihat. Lampu sorot justru menerangi satu lukisan.',
                'Tanpa lampu, tidak ada karya yang terlihat. Hierarki menyorot satu hal, bukan menghapus semuanya.',
              ),
            },
            {
              id: 'same',
              label: t('Semua lukisan disorot sama terang'),
              explainWrong: t(
                'Kalau semua sama terang, tidak ada yang menonjol. Mata jadi bingung memilih.',
                'Kalau semua sama terang, tidak ada karya yang menonjol. Mata tidak punya titik awal.',
              ),
            },
          ],
          answer: 'lamp',
          explainCorrect: t(
            'Judul besar menarik mata lebih dulu. Seperti lampu sorot pada lukisan utama.',
            'Ukuran dan ketebalan menarik mata ke judul lebih dulu. Itu sama seperti lampu sorot pada karya utama.',
          ),
          hints: [t('Ingat lampu sorot di galeri.', 'Cari yang membuat satu karya paling terlihat.')],
          tags: ['hierarki'],
        }),
      ),
      conceptStep({
        title: t('Kontras membuat tulisan terbaca', 'Kontras'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'perbedaan-kontras' },
        alt: t('Tulisan abu di latar abu pudar. Tulisan putih di latar gelap tajam.'),
        body: [
          rText(
            'Kontras adalah beda yang tegas: gelap lawan terang, besar lawan kecil. Tulisan abu di latar abu sulit dibaca.',
            'Kontras adalah perbedaan tegas antara dua elemen, seperti gelap lawan terang atau besar lawan kecil. Kontras tinggi membuat teks terbaca dan tombol utama menonjol.',
          ),
        ],
      }),
      conceptStep({
        title: t('Menyusun urutan baca'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'poster-diskon-hierarki' },
        alt: t('Judul DISKON AKHIR TAHUN besar, potongan 50% sedang, tanggal kecil, tombol menonjol.'),
        modes: ['pro'],
        body: [
          rText(
            'Kalau semua baris memakai ukuran dan ketebalan yang sama, mata lelah memindai. Bedakan judul utama, subjudul, tanggal kecil, dan ajakan aksi.',
          ),
        ],
      }),
      simStep(
        'hick-menu',
        t(
          'Temukan tombol bertanda bintang di antara menu.',
          'Temukan tombol bertanda bintang dan amati bagaimana kontras mempercepat pencarian di antara menu.',
        ),
      ),
      limitStep({
        analogy: t('Lampu sorot galeri dan hierarki visual'),
        same: [t('Keduanya mengarahkan mata ke hal terpenting lebih dulu.')],
        different: [
          t(
            'Lampu hanya menerangi. Di layar, kamu juga mengatur ukuran huruf.',
            'Lampu sorot hanya mengatur terang. Di layar, kamu mengatur ukuran huruf, ketebalan, posisi, dan kontras sekaligus.',
          ),
        ],
        riskyAnalogy: false,
      }),
      qStep({
        id: 'a07-l01-q2',
        type: 'hotspot',
        prompt: t(
          'Ketuk bagian kartu promo yang paling menonjol.',
          'Ketuk bagian kartu promo acara sekolah yang harus paling menonjol.',
        ),
        image: 'a07-hotspot',
        difficulty: 1,
        regions: [
          { id: 'judul', shape: 'rect', coords: [10, 10, 200, 50], label: 'Judul Besar: PENTAS SENI' },
          { id: 'syarat', shape: 'rect', coords: [10, 70, 200, 95], label: 'Catatan kaki kecil: pintu dibuka 08.00' },
          { id: 'kode', shape: 'rect', coords: [10, 105, 200, 125], label: 'Nomor arsip halaman #04' },
          { id: 'copy', shape: 'rect', coords: [10, 135, 200, 155], label: 'Hak cipta tahun ini' },
        ],
        answer: 'judul',
        explainCorrect: t(
          'Judul besar ada di atas. Mata membacanya lebih dulu.',
          'Judul acara paling atas dan paling besar, jadi dibaca pertama.',
        ),
        hints: [t('Ingat lampu sorot. Bagian mana yang paling mencolok?', 'Pilih bagian yang paling besar dan paling tebal.'), undefined],
        tags: ['hierarki'],
      }),
      qStep(
        makeTf({
          id: 'a07-l01-q3',
          prompt: t(
            'Tulisan abu muda di latar abu pucat mudah dibaca.',
            'Teks abu muda di atas latar abu pucat adalah contoh kontras yang baik.',
          ),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru: abu di atas abu sulit dibaca. Seperti pensil abu di kertas abu.',
            'Pernyataan itu keliru: abu muda di atas abu pucat berkontras sangat rendah dan melelahkan mata.',
          ),
          explainWrong: t(
            'Tulisan perlu beda terang dan gelap yang tegas. Abu di atas abu hampir menyatu.',
            'Teks dan latar butuh perbedaan gelap-terang yang tegas agar terbaca.',
          ),
          hints: [t('Bayangkan pensil abu di kertas abu. Terbaca?')],
          tags: ['hierarki', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l01-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Lampu sorot di galeri'),
          prompt: t('Apa beda utama menata hierarki di halaman web dan menyinari lukisan dengan lampu sorot?'),
          difficulty: 2,
          choices: [
            { id: 'multi', label: t('Di web, kamu juga mengatur ukuran huruf, ketebalan, dan posisi') },
            {
              id: 'eye',
              label: t('Keduanya membantu mata tahu mana yang penting dulu'),
              explainWrong: t('Itu persamaan keduanya, bukan perbedaannya. Cari hal yang hanya bisa dilakukan di layar.'),
            },
            {
              id: 'conf',
              label: t('Keduanya mencegah pengunjung bingung di detik pertama'),
              explainWrong: t('Itu juga persamaan: keduanya menuntun perhatian. Cari hal yang hanya ada di layar.'),
            },
          ],
          answer: 'multi',
          explainCorrect: t('Di web, hierarki memakai ukuran, ketebalan, warna, dan posisi sekaligus. Lampu sorot hanya mengatur terang.'),
          hints: [t('Cari hal yang hanya bisa kamu atur di layar.')],
          tags: ['hierarki'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l01-q5',
          type: 'scenario',
          story: t(
            'Poster Rani punya tiga tulisan. Isinya: OBRAL BUKU, Diskon 50%, dan tanggal berlaku. Semuanya sama besar dan sama tebal.',
            'Poster toko buku Rani memuat "OBRAL BUKU", "Diskon 50%", dan "Berlaku minggu ini" dengan ukuran huruf dan ketebalan yang sama.',
          ),
          prompt: t('Apa perbaikan terbaik supaya poster mudah dibaca?', 'Perbaikan mana yang paling cepat membuat poster terbaca?'),
          difficulty: 2,
          choices: [
            { id: 'scale', label: t('Besarkan judul, kecilkan tanggal') },
            {
              id: 'blink',
              label: t('Buat semua tulisan berkedip'),
              explainWrong: t(
                'Tulisan berkedip mengganggu mata. Halaman jadi sulit dibaca.',
                'Berkedip terus mengganggu fokus dan tidak ramah mata. Urutan baca tetap tidak terbentuk.',
              ),
            },
            {
              id: 'gray',
              label: t('Ubah semua tulisan jadi abu tipis'),
              explainWrong: t(
                'Abu tipis membuat tulisan pudar. Semua jadi sulit dibaca.',
                'Teks abu tipis menurunkan kontras, jadi semua baris makin sulit dibaca.',
              ),
            },
          ],
          answer: 'scale',
          explainCorrect: t(
            'Judul besar dan tanggal kecil membuat urutan baca rapi. Mata tahu harus mulai dari mana.',
            'Perbedaan ukuran dan ketebalan langsung membentuk urutan baca yang nyaman.',
          ),
          hints: [t('Pilih satu tulisan sebagai lampu sorot.', 'Pilih satu elemen sebagai pusat perhatian.')],
          tags: ['hierarki', 'ui'],
        }),
      ),
      qStep({
        id: 'a07-l01-q6',
        type: 'order',
        prompt: t(
          'Urutkan dari yang dibaca mata pertama sampai terakhir.',
          'Urutkan bagian kartu promosi dari yang dilihat mata pertama sampai terakhir.',
        ),
        difficulty: 2,
        items: [
          { id: 'tgl', label: t('Tanggal berlaku, kecil', 'Keterangan kecil masa berlaku promo') },
          { id: 'cta', label: t('Tombol "Belanja Sekarang"', 'Tombol aksi "Belanja Sekarang" yang kontras') },
          { id: 'jdl', label: t('Judul besar promo', 'Judul besar promo utama (H1)') },
          { id: 'sub', label: t('Potongan harga 50%', 'Potongan harga 50% (subjudul)') },
        ],
        answer: ['jdl', 'sub', 'tgl', 'cta'],
        explainCorrect: t(
          'Mata melihat judul besar lebih dulu. Lalu harga, tanggal, dan tombol.',
          'Mata membaca judul besar, lalu penawaran 50%, lalu syarat tanggal, lalu tombol aksi.',
        ),
        hints: [t('Ingat lampu sorot: terang dulu, redup kemudian.', 'Pikirkan urutan baca: penawaran dulu, aksi di akhir.'), undefined],
        tags: ['hierarki'],
      }),
      qStep({
        id: 'a07-l01-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Isi bagian kosong dengan prinsip yang tepat.'),
        difficulty: 1,
        template: 'Prinsip ___ membuat teks tajam terbaca di atas latarnya.',
        bank: ['kontras', 'overflow', 'margin'],
        answer: ['kontras'],
        explainCorrect: t('Kontras dan hierarki bekerja bersama supaya informasi cepat terbaca.'),
        hints: [t('Cari prinsip tentang beda gelap dan terang.'), undefined],
        tags: ['hierarki', 'ui'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-l01-r1',
        prompt: t(
          'Apa saja cara membuat mata membaca judul lebih dulu?',
          'Apa empat cara utama membuat hierarki visual pada teks dan tombol?',
        ),
        choices: [
          { id: 'ok', label: t('Ukuran, ketebalan, warna, dan letak', 'Ukuran, ketebalan, warna, dan posisi') },
          {
            id: 'no',
            label: t('Semua tulisan sama besar', 'Menyamakan semua teks menjadi 12 px'),
            explainWrong: t(
              'Kalau semua sama besar, mata tidak tahu harus mulai dari mana.',
              'Menyamakan semua ukuran justru menghapus hierarki.',
            ),
          },
          {
            id: 'one',
            label: t('Semua tulisan satu warna', 'Memberi satu warna pada semua teks'),
            explainWrong: t(
              'Satu warna saja tidak cukup. Mata butuh beda ukuran dan letak juga.',
              'Warna saja tidak cukup. Ukuran, ketebalan, dan posisi ikut menentukan urutan baca.',
            ),
          },
        ],
        answer: 'ok',
        explainCorrect: t(
          'Ukuran, ketebalan, warna, dan letak menuntun mata. Seperti lampu sorot memilih lukisan.',
          'Ukuran, ketebalan, warna, dan posisi menuntun mata pembaca ke hal terpenting.',
        ),
        hints: [t('Ingat lampu sorot di galeri.')],
        tags: ['hierarki'],
      }),
      makeTf({
        id: 'a07-l01-r2',
        prompt: t(
          'Semua tulisan sama besar berarti tidak ada yang menonjol.',
          'Kalau semua bagian layar mendapat sorotan sama besar, tidak ada yang benar-benar menonjol.',
        ),
        answer: true,
        explainCorrect: t(
          'Kalau semua sama, mata tidak tahu harus mulai dari mana. Hierarki butuh pembeda.',
          'Hierarki butuh pembeda tegas antara yang utama dan yang pendukung.',
        ),
        explainWrong: t(
          'Kalau semua berteriak bersamaan, pembaca bingung. Itu sebabnya perlu satu yang utama.',
          'Ketika semua berteriak bersamaan, pembaca tidak tahu harus fokus ke mana.',
        ),
        hints: [t('Bayangkan lampu sorot menyinari semua lukisan.')],
        tags: ['hierarki'],
      }),
    ],
    recap: t(
      'Tulisan besar dan kontras menuntun mata ke hal terpenting.',
      'Atur ukuran, ketebalan, warna, posisi, dan kontras untuk menyusun urutan baca.',
    ),
    companion: {
      talkPrompts: ['Lihat sampul buku. Tulisan mana yang kamu baca dulu?'],
      offlineActivity: 'Ambil brosur atau koran, lalu lingkari urutan 1, 2, 3 bagian yang paling dulu menarik matamu.',
    },
  }),

  makeLesson({
    id: 'a07-l02',
    worldId: 'a07',
    title: 'Sejajar dan berdekatan',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa merapikan tulisan sejajar dan mendekatkan yang sekelompok.',
      'Kamu bisa menyejajarkan elemen pada satu garis dan mengelompokkannya dengan jarak.',
    ),
    estMinutes: 6,
    introducesTerms: ['alignment'],
    usesTerms: ['ui', 'ux', 'hierarki', 'margin', 'padding'],
    warmupFrom: 'a07-l01',
    atWork: 'Kamu akan memperbaiki jarak label dan kotak di form pendaftaran yang membuat orang salah mengisi.',
    steps: [
      storyStep('a07/nampan-rapi.svg', [
        rText(
          'Bangku di kelas berbaris lurus mengikuti garis ubin. Piring dan sendok dikumpulkan di satu nampan. Mengapa keduanya terasa rapi?',
          'Form pendaftaran Toko Rani terasa berantakan. Label dan kotak isiannya tidak jelas mana yang berpasangan.',
        ),
      ]),
      conceptStep({
        title: t('Lurus di satu garis', 'Alignment (kesejajaran)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'garis-khayal-alignment' },
        alt: t('Kartu acak dibandingkan kartu rata kiri pada satu garis lurus.'),
        body: [
          rTerm('alignment', 'Sejajar', 'Alignment'),
          rText(
            ' artinya berbaris rapi di satu garis. Seperti bangku di garis ubin. Kalau tidak sejajar, halaman terlihat berantakan.',
            ' adalah menempatkan elemen pada satu garis khayal yang sama, misalnya rata kiri. Halaman jadi terasa tertata dan tenang.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a07-l02-q5',
          type: 'scenario',
          story: t(
            'Halaman profil Raka berantakan. Judul, teks, dan tombol mulai di tempat yang berbeda-beda.',
            'Pada halaman profil buatan Raka, judul menjorok 10 px, teks di bawahnya 28 px, dan tombol Simpan 5 px.',
          ),
          prompt: t('Aturan rapi mana yang dilanggar halaman Raka?', 'Prinsip desain mana yang dilanggar halaman Raka?'),
          difficulty: 1,
          choices: [
            { id: 'al', label: t('Tepi kirinya tidak satu garis', 'Alignment') },
            {
              id: 'js',
              label: t('Tulisannya terlalu kecil', 'Kontras warna'),
              explainWrong: t(
                'Tulisan kecil tidak membuat halaman berantakan. Masalahnya ada di tepi kirinya.',
                'Kontras mengatur beda terang dan gelap. Masalah Raka ada pada tepi kiri yang tidak lurus.',
              ),
            },
            {
              id: 'url',
              label: t('Warna tombolnya kurang terang', 'Hierarki visual'),
              explainWrong: t(
                'Warna tombol bukan sumber masalahnya. Lihat tepi kiri yang tidak sejajar.',
                'Hierarki mengatur urutan baca. Urutan di halaman Raka sudah jelas, yang kacau adalah tepi kirinya.',
              ),
            },
          ],
          answer: 'al',
          explainCorrect: t(
            'Tepi kiri harus satu garis. Seperti bangku yang berbaris lurus di kelas.',
            'Menyamakan garis kiri langsung membuat halaman Raka terlihat rapi dan profesional.',
          ),
          hints: [t('Lihat tepi kiri ketiganya. Apakah satu garis?', 'Bandingkan posisi tepi kiri judul, teks, dan tombol.')],
          tags: ['alignment', 'ui'],
        }),
      ),
      conceptStep({
        title: t('Yang dekat satu kelompok', 'Proximity (kedekatan)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'jarak-proximity' },
        alt: t('Label Nama menempel ke kotak Nama dan jauh dari label Email.'),
        body: [
          rBold('Berdekatan', 'Proximity'),
          rText(
            ' artinya hal yang berhubungan diletakkan dekat. Hal yang berbeda diberi jarak. Label Nama menempel ke kotak Nama.',
            ' adalah menempatkan elemen yang berhubungan berdekatan dan memisahkan kelompok yang berbeda. Label menempel pada kotak isiannya, jadi tidak membingungkan.',
          ),
        ],
      }),
      conceptStep({
        title: t('Mengukur jarak di CSS'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'jarak-dalam-dan-antar' },
        alt: t('Jarak label ke kotak 6 px lebih kecil daripada jarak antarkelompok 20 px.'),
        modes: ['pro'],
        body: [
          rText('Jarak di dalam kelompok harus lebih kecil daripada jarak antarkelompok. Atur dengan '),
          rTerm('margin', 'margin', 'margin'),
          rText(' dan '),
          rTerm('padding', 'padding', 'padding'),
          rText(' agar mata langsung membedakan setiap bagian form.'),
        ],
      }),
      simStep(
        'hick-menu',
        t(
          'Lihat deretan kartu menu yang sejajar rapi.',
          'Amati bagaimana kisi 2 atau 4 kolom pada simulator mempermudah pemindaian pilihan.',
        ),
      ),
      limitStep({
        analogy: t('Barisan bangku dan nampan makan'),
        same: [t('Tepi yang lurus dan benda sekelompok yang berdekatan terlihat rapi.')],
        different: [
          t(
            'Jarak di layar diukur, tidak dikira-kira.',
            'Jarak di UI memakai ukuran yang terukur agar konsisten di semua halaman, bukan dikira-kira mata.',
          ),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeMcq({
          id: 'a07-l02-q1',
          type: 'analogy',
          prompt: t(
            'Label "Email" menempel ke kotak Email dan menjauh dari kotak Nama. Mengapa?',
            'Label "Email" diletakkan rapat ke kotak Email dan dijauhkan dari kotak "Nama" di atasnya. Prinsip apa yang dipakai?',
          ),
          choices: [
            { id: 'prox', label: t('Supaya jelas label milik siapa', 'Proximity (kedekatan)') },
            {
              id: 'rand',
              label: t('Supaya form terlihat lebih penuh', 'Hierarki visual'),
              explainWrong: t(
                'Form yang penuh tidak berarti rapi. Jarak dipilih supaya pasangannya terlihat.',
                'Hierarki visual mengatur urutan baca. Di sini yang diatur adalah jarak antara label dan kotaknya.',
              ),
            },
            {
              id: 'dns',
              label: t('Supaya tulisan terlihat lebih besar', 'Alignment (kesejajaran)'),
              explainWrong: t(
                'Ukuran tulisan tidak berubah oleh jarak. Jarak hanya menunjukkan pasangan.',
                'Alignment mengatur garis tepi, bukan jarak antarpasangan.',
              ),
            },
          ],
          answer: 'prox',
          explainCorrect: t(
            'Label yang dekat dianggap pasangan kotaknya. Seperti piring dan sendok di satu nampan.',
            'Jarak yang dekat membuat otak langsung mengaitkan setiap label dengan kotaknya.',
          ),
          hints: [t('Ingat piring dan sendok di satu nampan.', 'Cari prinsip yang memakai jarak sebagai penanda kelompok.')],
          tags: ['alignment'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a07-l02-q2',
          prompt: t(
            'Label sama jauhnya ke dua kotak, jadi kamu bingung milik siapa.',
            'Kalau jarak label ke kotak di atas dan di bawahnya sama, pembaca bingung label itu milik kotak mana.',
          ),
          answer: true,
          explainCorrect: t(
            'Jarak yang sama menghapus batas kelompok. Label harus lebih dekat ke pasangannya.',
            'Jarak sama rata membuat batas kelompok tidak terlihat. Pembaca harus menebak pasangannya.',
          ),
          explainWrong: t(
            'Label perlu lebih dekat ke kotak miliknya. Kalau sama jauh, kamu bingung.',
            'Label harus lebih dekat ke kotak miliknya daripada ke kotak lain.',
          ),
          hints: [t('Ingat: yang dekat dianggap satu kelompok.')],
          tags: ['alignment', 'ux'],
        }),
      ),
      qStep({
        id: 'a07-l02-q3',
        type: 'sort',
        prompt: t(
          'Kelompokkan contoh ke Sejajar atau Berdekatan.',
          'Kelompokkan contoh tata letak ke Alignment atau Proximity.',
        ),
        difficulty: 2,
        items: [
          { id: 'a1', label: t('Judul dan tombol mulai di garis kiri yang sama', 'Judul, paragraf, dan tombol semua dimulai lurus di garis kiri yang sama') },
          { id: 'p1', label: t('Foto dan harga sekotak, jauh dari kotak lain', 'Foto produk dan harga ditaruh rapat dalam satu kartu, jauh dari kartu lain') },
          { id: 'a2', label: t('Tiga kartu rata di tepi atas yang sama', 'Tiga kartu sejajar rapi pada tinggi tepi atas yang sama') },
          { id: 'p2', label: t('Label "Kata Sandi" menempel dekat kotaknya', 'Label "Kata Sandi" menempel dekat kotak sandinya') },
        ],
        bins: [
          { id: 'al', label: t('Sejajar', 'Alignment'), icon: 'layout-dashboard' },
          { id: 'pr', label: t('Berdekatan', 'Proximity'), icon: 'users' },
        ],
        answer: { a1: 'al', p1: 'pr', a2: 'al', p2: 'pr' },
        explainCorrect: t(
          'Berbaris di satu garis itu sejajar. Berdekatan membuat satu kelompok.',
          'Garis tepi yang sama berarti alignment. Jarak yang membentuk kelompok berarti proximity.',
        ),
        hints: [t('Tanya diri: garis lurus, atau jarak dekat?', 'Pisahkan contoh tentang garis dari contoh tentang jarak.'), undefined],
        tags: ['alignment'],
      }),
      qStep(
        makeMcq({
          id: 'a07-l02-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Barisan bangku di kelas'),
          prompt: t('Apa bedanya menata elemen UI di layar dengan merapikan bangku di kelas?'),
          difficulty: 2,
          choices: [
            { id: 'px', label: t('Di UI, jarak terukur dan harus tetap rapi di layar HP') },
            {
              id: 'line',
              label: t('Keduanya terlihat kacau kalau tidak sejajar di satu garis'),
              explainWrong: t('Itu persamaannya, bukan perbedaannya. Cari hal yang hanya ada di layar.'),
            },
            {
              id: 'scan',
              label: t('Susunan sejajar membuat mata lebih tenang saat melihatnya'),
              explainWrong: t('Itu juga persamaan keduanya. Cari hal yang hanya ada di layar.'),
            },
          ],
          answer: 'px',
          explainCorrect: t('Lebar layar berubah-ubah, jadi jarak di UI ditetapkan dengan angka supaya tetap rapi di HP maupun laptop. Bangku di kelas cukup diluruskan sekali.'),
          hints: [t('Pikirkan layar yang bisa menyempit di HP.')],
          tags: ['alignment'],
        }),
      ),
      qStep({
        id: 'a07-l02-q6',
        type: 'spotbug',
        modes: ['pro'],
        prompt: t('Ketuk baris CSS yang membuat jarak label ke kotaknya terlalu jauh dibanding jarak antarkelompok.'),
        difficulty: 2,
        lines: [
          '.grup-input { margin-bottom: 12px; }',
          '.label-input { margin-bottom: 32px; display: block; }',
          '.kotak-input { padding: 10px; }',
        ],
        answer: [2],
        explainCorrect: t('Baris 2 memberi margin-bottom 32 px antara label dan kotaknya, jauh di atas jarak antarkelompok 12 px.'),
        hints: [t('Cari angka margin yang paling besar.'), undefined],
        tags: ['alignment', 'margin'],
      }),
      qStep(
        makeMcq({
          id: 'a07-l02-q6j',
          type: 'scenario',
          modes: ['junior'],
          story: t(
            'Bu Laras menata meja kelas. Pensil dan penghapus ditaruh berjauhan. Padahal keduanya dipakai bersamaan.',
            'Bu Laras menata meja kelas, tetapi pensil dan penghapus berjauhan. Keduanya selalu dipakai bersamaan.',
          ),
          prompt: t('Apa yang sebaiknya Bu Laras lakukan?'),
          difficulty: 2,
          choices: [
            { id: 'near', label: t('Dekatkan pensil dan penghapus') },
            {
              id: 'same',
              label: t('Sebar semua benda sama jauh'),
              explainWrong: t('Kalau semua sama jauh, pasangannya tidak terlihat. Benda sepasang perlu dekat.'),
            },
            {
              id: 'pile',
              label: t('Tumpuk semua benda jadi satu'),
              explainWrong: t('Tumpukan membuat semua benda sulit dibedakan. Beri jarak antarkelompok.'),
            },
          ],
          answer: 'near',
          explainCorrect: t('Benda yang dipakai bersama sebaiknya berdekatan. Mata langsung melihat pasangannya.'),
          hints: [t('Ingat piring dan sendok di satu nampan.')],
          tags: ['alignment'],
        }),
      ),
      qStep({
        id: 'a07-l02-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Isi bagian kosong dengan istilah yang tepat.'),
        difficulty: 1,
        template: 'Meletakkan elemen yang saling berkaitan berdekatan agar terbaca satu kelompok disebut ___.',
        bank: ['proximity', 'overflow', 'hosting'],
        answer: ['proximity'],
        explainCorrect: t('Proximity memakai jarak sebagai alat pengelompokan informasi.'),
        hints: [t('Cari istilah tentang kedekatan jarak.'), undefined],
        tags: ['alignment'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-l02-r1',
        prompt: t(
          'Untuk apa garis khayal dipakai saat menata halaman?',
          'Apa guna garis khayal dalam alignment?',
        ),
        choices: [
          { id: 'ok', label: t('Menjaga tulisan dan kotak sejajar', 'Menjaga elemen sejajar supaya tampilan tidak acak') },
          {
            id: 'no',
            label: t('Menengahkan semua tulisan', 'Menengahkan semua teks di seluruh halaman'),
            explainWrong: t(
              'Rata tengah tidak selalu rapi. Rata kiri yang konsisten lebih mudah diikuti mata.',
              'Alignment biasanya memakai garis rata kiri yang konsisten untuk paragraf dan form.',
            ),
          },
          {
            id: 'sz',
            label: t('Menyamakan ukuran semua tulisan', 'Menyamakan ukuran semua elemen'),
            explainWrong: t(
              'Garis khayal mengatur letak, bukan ukuran. Ukuran diatur dengan cara lain.',
              'Garis khayal mengatur posisi tepi, bukan ukuran elemen.',
            ),
          },
        ],
        answer: 'ok',
        explainCorrect: t(
          'Satu garis membuat halaman terlihat teratur. Seperti bangku yang berbaris di garis ubin.',
          'Kesejajaran pada garis khayal memberi kesan teratur dan profesional.',
        ),
        hints: [t('Ingat bangku di garis ubin.')],
        tags: ['alignment'],
      }),
      makeTf({
        id: 'a07-l02-r2',
        prompt: t(
          'Label dan kotaknya harus lebih dekat daripada ke kotak lain.',
          'Dalam proximity, jarak label ke kotak miliknya harus lebih kecil daripada jarak ke kotak berikutnya.',
        ),
        answer: true,
        explainCorrect: t(
          'Pasangan yang dekat terlihat satu kelompok.',
          'Jarak yang lebih kecil membuat label terbaca sebagai milik kotak itu.',
        ),
        explainWrong: t(
          'Label dan kotaknya satu kelompok, jadi jaraknya harus paling dekat.',
          'Label dan kotaknya satu kelompok, jadi jaraknya harus paling kecil.',
        ),
        hints: [t('Ingat piring dan sendok di satu nampan.')],
        tags: ['alignment'],
      }),
    ],
    recap: t(
      'Rapikan di satu garis, dan dekatkan yang sekelompok.',
      'Sejajarkan elemen pada satu garis khayal. Beri jarak dalam kelompok lebih kecil daripada antarkelompok.',
    ),
    companion: {
      talkPrompts: ['Piring dan sendok sebaiknya ditaruh di mana?'],
      offlineActivity: 'Susun 4 kartu di meja: satu kali acak, satu kali sejajar tepi kiri penggaris.',
    },
  }),

  makeLesson({
    id: 'a07-l03',
    worldId: 'a07',
    title: 'Ruang lega dan seimbang',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa memberi ruang lega dan menjaga gaya tetap sama.',
      'Kamu bisa memakai white space, repetition, dan balance, lalu memeriksa desain dengan C.R.A.P.',
    ),
    estMinutes: 6,
    introducesTerms: ['whitespace'],
    usesTerms: ['ui', 'ux', 'hierarki', 'alignment'],
    stickerId: 'etalase-lega',
    warmupFrom: 'a07-l02',
    atWork: 'Kamu akan menyamakan warna dan sudut tombol di semua halaman saat aplikasi terasa dibuat tiga orang berbeda.',
    steps: [
      storyStep('a07/etalase-lega.svg', [
        rText(
          'Etalase toko perhiasan hanya memajang satu kalung. Lapak obral menumpuk semua barang sampai sesak. Mana yang terasa lebih berharga?',
          'Etalase perhiasan memajang satu kalung di ruang lapang, dan terasa mahal. Lapak obral penuh sesak dan terasa murah.',
        ),
      ]),
      conceptStep({
        title: t('Ruang kosong itu berguna', 'White space dan repetition'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'whitespace-dan-repetition' },
        alt: t('Kartu dengan ruang lega dan tombol bergaya sama.'),
        body: [
          rTerm('whitespace', 'Ruang kosong', 'White space'),
          rJunior(' sengaja dibiarkan supaya halaman terasa lega, seperti etalase. Tombol dan judul yang bergaya sama membuat halaman rapi.'),
          rPro(' adalah ruang kosong di antara elemen yang memberi napas pada isi. Repetition berarti mengulang gaya yang sama: warna tombol, sudut kartu, dan gaya judul.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a07-l03-q1',
          type: 'analogy',
          prompt: t(
            'Halaman penuh teks dan tombol yang rapat. Itu mirip apa?',
            'Halaman web menumpuk banyak teks, banner, dan tombol rapat tanpa jeda. Itu mirip apa?',
          ),
          choices: [
            { id: 'obral', label: t('Lapak obral yang sesak') },
            {
              id: 'jewel',
              label: t('Etalase perhiasan yang lega'),
              explainWrong: t(
                'Etalase perhiasan justru lega. Satu barang diberi ruang luas.',
                'Etalase perhiasan justru contoh white space yang lega.',
              ),
            },
            {
              id: 'grid',
              label: t('Rak buku yang tertata'),
              explainWrong: t(
                'Rak buku yang tertata punya jarak rapi. Itu bukan tumpukan sesak.',
                'Rak buku yang rapi punya jarak dan kesejajaran, bukan kesesakan.',
              ),
            },
          ],
          answer: 'obral',
          explainCorrect: t(
            'Barang yang sesak membuat mata lelah. Tidak ada yang terlihat penting.',
            'Tanpa white space, pembaca bingung mana yang penting dan tampilan terasa sesak.',
          ),
          hints: [t('Ingat toko mana yang terasa sesak.')],
          tags: ['whitespace'],
        }),
      ),
      conceptStep({
        title: t('Empat cek kilat', 'Pengingat C.R.A.P.'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'daftar-cek-crap' },
        alt: t('Empat pilar: beda, ulang, lurus, dekat.'),
        body: [
          rJunior('Kalau halaman terasa aneh, cek empat hal. Cek beda terang dan gelap, lalu gaya yang berulang. Cek juga garis lurus dan jarak yang dekat.'),
          rPro('C.R.A.P. adalah singkatan empat prinsip: Contrast, Repetition, Alignment, dan Proximity. Setiap kali desain terasa janggal, periksa keempatnya lebih dulu.'),
        ],
      }),
      conceptStep({
        title: t('Balance: simetris dan asimetris'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'balance-simetris-asimetris' },
        alt: t('Keseimbangan simetris kiri-kanan sama berat dan asimetris foto besar diimbangi teks tebal.'),
        modes: ['pro'],
        body: [
          rText(
            'Balance simetris menyamakan bobot kiri dan kanan, dan terasa formal serta tenang. Balance asimetris menyeimbangkan gambar besar di satu sisi dengan teks tebal di sisi lain, dan terasa modern.',
          ),
        ],
      }),
      simStep(
        'hick-menu',
        t(
          'Amati ruang kosong di antara tombol menu.',
          'Amati bagaimana celah antarkartu dan gaya tombol yang seragam membantu pemilihan.',
        ),
      ),
      limitStep({
        analogy: t('Etalase perhiasan dan lapak obral'),
        same: [t('Ruang kosong membuat barang utama terlihat penting.', 'Ruang kosong di sekitar benda utama membuatnya terlihat lebih penting dan mudah dilihat.')],
        different: [
          t(
            'Toko online boleh menampilkan banyak barang, tetap dengan ruang lega.',
            'Etalase memajang 1–2 barang, tetapi aplikasi toko boleh menampilkan banyak produk asal white space tetap terjaga.',
          ),
        ],
        riskyAnalogy: true,
      }),
      qStep(
        makeTf({
          id: 'a07-l03-q2',
          prompt: t(
            'Ruang kosong di halaman itu sia-sia dan harus diisi.',
            'White space di UI adalah ruang terbuang yang harus segera diisi iklan atau hiasan.',
          ),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru: ruang kosong memberi mata jeda. Seperti jeda saat membaca.',
            'Pernyataan itu keliru: white space memberi napas visual dan membuat isi nyaman dibaca.',
          ),
          explainWrong: t(
            'Ruang kosong sengaja disisakan. Ia membuat halaman nyaman dibaca.',
            'Ruang kosong sengaja disisakan supaya mata punya jeda istirahat.',
          ),
          hints: [t('Ingat etalase perhiasan yang lega.')],
          tags: ['whitespace'],
        }),
      ),
      qStep({
        id: 'a07-l03-q3',
        type: 'match',
        prompt: t(
          'Pasangkan empat cek kilat dengan gambarannya.',
          'Pasangkan keempat huruf C.R.A.P. dengan artinya.',
        ),
        difficulty: 2,
        left: [
          { id: 'c', label: t('Beda terang dan gelap', 'Contrast') },
          { id: 'r', label: t('Gaya yang berulang', 'Repetition') },
          { id: 'a', label: t('Berbaris di satu garis', 'Alignment') },
          { id: 'p', label: t('Yang sekelompok berdekatan', 'Proximity') },
        ],
        right: [
          { id: 'rc', label: t('Spidol hitam di kertas kuning', 'Beda tegas antara terang dan gelap, atau besar dan kecil') },
          { id: 'rr', label: t('Semua tombol sama warna dan bentuk', 'Gaya tombol, huruf, dan sudut kartu berulang seragam') },
          { id: 'ra', label: t('Bangku berbaris di garis ubin', 'Elemen sejajar pada garis khayal') },
          { id: 'rp', label: t('Piring dan sendok di satu nampan', 'Elemen yang berhubungan diletakkan berdekatan') },
        ],
        answer: { c: 'rc', r: 'rr', a: 'ra', p: 'rp' },
        explainCorrect: t(
          'Empat cek ini membantu membenahi tampilan apa pun.',
          'C.R.A.P. adalah empat pemeriksaan cepat untuk membenahi tampilan apa pun.',
        ),
        hints: [t('Cari benda yang mirip dengan tiap gambaran.', 'Cocokkan huruf pertama dengan artinya: kontras, ulang, lurus, dekat.'), undefined],
        tags: ['ui', 'alignment'],
      }),
      qStep(
        makeMcq({
          id: 'a07-l03-q4',
          type: 'limit',
          analogy: t('Etalase toko perhiasan'),
          prompt: t(
            'Aplikasi belanja butuh banyak barang. Apa yang sebaiknya dilakukan?',
            'Apa yang perlu disesuaikan saat memakai white space ala etalase pada aplikasi belanja?',
          ),
          difficulty: 2,
          choices: [
            { id: 'bal', label: t('Tampilkan barang dengan jarak lega') },
            {
              id: 'empty',
              label: t('Sisakan satu foto di seluruh situs'),
              explainWrong: t(
                'Satu foto saja tidak cukup untuk toko. Orang perlu melihat banyak barang.',
                'Aplikasi belanja tetap perlu menampilkan daftar produk dengan nyaman.',
              ),
            },
            {
              id: 'black',
              label: t('Isi semua ruang kosong dengan iklan'),
              explainWrong: t(
                'Ruang kosong sengaja dibiarkan kosong. Iklan membuatnya sesak lagi.',
                'Mengisi semua ruang dengan iklan menghapus napas visual yang dibutuhkan halaman.',
              ),
            },
          ],
          answer: 'bal',
          explainCorrect: t(
            'Toko boleh punya banyak barang. Beri jarak lega di antara kartu.',
            'White space menyeimbangkan kelengkapan isi dengan jarak bernapas yang nyaman.',
          ),
          hints: [t('Ingat etalase. Toko online punya lebih banyak barang.', 'Cari cara menampilkan banyak isi tanpa membuat halaman sesak.')],
          tags: ['whitespace'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l03-q5',
          type: 'scenario',
          story: t(
            'Tombol Simpan di aplikasi Bu Laras berubah-ubah. Halaman 1 biru, halaman 2 hijau, halaman 3 merah.',
            'Tombol Simpan di aplikasi Bu Laras biru di halaman 1, hijau di halaman 2, dan merah di halaman 3.',
          ),
          prompt: t('Apa yang paling bermasalah?', 'Prinsip mana yang paling bermasalah di aplikasi Bu Laras?'),
          difficulty: 2,
          choices: [
            { id: 'rep', label: t('Gaya tombol berubah-ubah', 'Repetition (gaya tombol)') },
            {
              id: 'sym',
              label: t('Foto terlalu besar di halaman', 'Balance asimetris pada foto'),
              explainWrong: t(
                'Foto tidak disebut di cerita. Masalahnya ada pada tombol Simpan.',
                'Masalahnya ada pada tombol sejenis yang berganti warna dan bentuk, bukan pada foto.',
              ),
            },
            {
              id: 'alt',
              label: t('Tulisan terlalu panjang', 'Teks alt pada gambar'),
              explainWrong: t(
                'Tulisan tidak jadi masalah. Gaya tombol Simpan yang berubah-ubah itulah masalahnya.',
                'Teks alt tidak disebut di cerita. Masalahnya ada pada gaya tombol utama yang berganti-ganti.',
              ),
            },
          ],
          answer: 'rep',
          explainCorrect: t(
            'Tombol yang sama sebaiknya bergaya sama. Orang jadi cepat hafal.',
            'Repetition menuntut tombol aksi utama memakai gaya konsisten supaya orang cepat belajar.',
          ),
          hints: [t('Lihat tombol Simpan di tiga halaman. Apa yang berbeda?', 'Bandingkan gaya tombol yang fungsinya sama di tiap halaman.')],
          tags: ['ui', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l03-q6',
          modes: ['pro'],
          prompt: t('Kiri halaman berisi ilustrasi besar, kanan berisi judul tebal dan tombol. Ini contoh balance apa?'),
          difficulty: 2,
          choices: [
            { id: 'asym', label: t('Balance asimetris') },
            {
              id: 'sym',
              label: t('Balance simetris'),
              explainWrong: t('Simetris berarti kiri dan kanan kembar. Di sini bentuknya berbeda.'),
            },
            {
              id: 'chaos',
              label: t('Tidak seimbang sama sekali'),
              explainWrong: t('Gambar besar diimbangi teks tebal di sisi lain. Halaman tetap seimbang.'),
            },
          ],
          answer: 'asym',
          explainCorrect: t('Bobot gambar besar diimbangi teks tebal, jadi halaman seimbang walau tidak kembar.'),
          hints: [t('Apakah kiri dan kanan berbentuk kembar?')],
          tags: ['ui'],
        }),
      ),
      qStep({
        id: 'a07-l03-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Tulis satu kata: prinsip yang dilanggar kalau gaya tombol berubah-ubah di setiap halaman.'),
        difficulty: 1,
        accept: ['repetition', 'repetisi', 'pengulangan'],
        explainCorrect: t('Repetition menjaga gaya komponen yang berulang tetap sama di semua halaman.'),
        hints: [t('Cari prinsip C.R.A.P. tentang gaya yang diulang.'), undefined],
        tags: ['ui', 'alignment'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-l03-r1',
        prompt: t(
          'Mengapa tombol harus bergaya sama di semua halaman?',
          'Apa untungnya memakai gaya yang konsisten pada tampilan?',
        ),
        choices: [
          { id: 'ok', label: t('Orang cepat hafal fungsinya', 'Orang cepat mengenali fungsi tombol') },
          {
            id: 'no',
            label: t('Tiap halaman berwarna acak', 'Setiap halaman wajib memakai warna acak'),
            explainWrong: t(
              'Gaya acak membuat orang bingung. Tombol yang sama sebaiknya mirip.',
              'Repetition justru menyamakan gaya komponen yang berulang.',
            ),
          },
          {
            id: 'fast',
            label: t('Halaman dimuat lebih cepat', 'Halaman dimuat lebih cepat'),
            explainWrong: t(
              'Gaya tombol tidak memengaruhi kecepatan. Ia memengaruhi rasa akrab.',
              'Konsistensi gaya tidak mengubah kecepatan memuat. Ia mengurangi kebingungan.',
            ),
          },
        ],
        answer: 'ok',
        explainCorrect: t(
          'Gaya yang sama membuat orang cepat mengenali tombol.',
          'Konsistensi menekan kebingungan dan menambah rasa percaya.',
        ),
        hints: [t('Ingat tombol Simpan yang berganti warna.')],
        tags: ['ui'],
      }),
      makeTf({
        id: 'a07-l03-r2',
        prompt: t(
          'Satu gambar besar bisa seimbang dengan tulisan tebal di sisi lain.',
          'Balance asimetris terasa modern karena menyeimbangkan elemen berbobot beda di sisi kiri dan kanan.',
        ),
        answer: true,
        explainCorrect: t(
          'Gambar besar bisa diimbangi tulisan tebal. Kiri dan kanan tidak harus kembar.',
          'Asimetris tetap seimbang walau kedua sisinya tidak kembar.',
        ),
        explainWrong: t(
          'Kiri dan kanan tidak harus kembar. Bobot yang berbeda tetap bisa seimbang.',
          'Asimetris tetap seimbang meskipun sisi kiri dan kanannya tidak kembar persis.',
        ),
        hints: [t('Bayangkan timbangan dengan benda berbeda yang seimbang.')],
        tags: ['ui'],
      }),
    ],
    recap: t(
      'Beri ruang lega, jaga gaya tetap sama, dan cek empat hal.',
      'Padukan white space, repetition, dan balance, lalu periksa rancangan dengan C.R.A.P.',
    ),
    companion: {
      talkPrompts: ['Meja belajar mana yang lebih enak: kosong atau penuh tumpukan?'],
      offlineActivity: 'Amati halaman beranda satu aplikasi favorit, lalu cek apakah semua tombol utamanya sama warna dan bentuknya.',
    },
  }),

  makeLesson({
    id: 'a07-l04',
    worldId: 'a07',
    title: 'Mata suka mengelompokkan',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menyebutkan cara mata mengelompokkan bentuk.',
      'Kamu bisa memakai enam prinsip Gestalt untuk menyusun tampilan yang mudah dipahami.',
    ),
    estMinutes: 6,
    introducesTerms: ['gestalt'],
    usesTerms: ['ui', 'hierarki', 'alignment', 'whitespace'],
    warmupFrom: 'a07-l03',
    atWork: 'Kamu akan membungkus foto, nama, dan harga produk dalam satu kartu saat daftar produk terasa membingungkan.',
    steps: [
      storyStep('a07/rasi-bintang.svg', [
        rText(
          'Bintang di langit tidak punya garis penghubung. Tetapi matamu melihat bentuk rasi. Mengapa bisa begitu?',
          'Di toko online Sari, harga kue A terasa milik kue B. Mata punya aturan sendiri dalam mengelompokkan elemen.',
        ),
      ]),
      conceptStep({
        title: t('Dekat dan mirip jadi satu', 'Proximity dan Similarity'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'gestalt-proximity-similarity' },
        alt: t('Titik berdekatan dan ikon sewarna terlihat berkelompok.'),
        body: [
          rText(
            'Mata menganggap yang dekat atau mirip itu sekelompok. Aturan ini bernama ',
            'Otak mengelompokkan elemen yang berdekatan (proximity) atau mirip bentuk dan warnanya (similarity). Kumpulan aturan ini disebut ',
          ),
          rTerm('gestalt', 'prinsip Gestalt', 'prinsip Gestalt'),
          rText(
            '. Seperti bintang yang berdekatan menjadi satu rasi.',
            ' dalam psikologi persepsi.',
          ),
        ],
      }),
      qStep(
        makeTf({
          id: 'a07-l04-q3',
          prompt: t(
            'Tombol Batal dan Hapus dibuat sama bentuk dan warna. Orang mengira fungsinya mirip.',
            'Tombol "Batal" dan "Hapus" yang bentuk dan warnanya sama membuat orang menganggap fungsinya mirip.',
          ),
          answer: true,
          explainCorrect: t(
            'Yang mirip dianggap sejenis. Tombol Hapus sebaiknya dibuat beda supaya tidak salah tekan.',
            'Similarity membuat elemen yang mirip tampak sejenis. Karena Hapus berbahaya, bedakan bentuknya dari tombol aman.',
          ),
          explainWrong: t(
            'Yang mirip memang dianggap sejenis. Mata menyamakan fungsinya.',
            'Similarity membuat elemen yang mirip tampak sejenis di mata pembaca.',
          ),
          hints: [t('Ingat apa yang terjadi pada hal yang mirip.')],
          tags: ['gestalt'],
        }),
      ),
      conceptStep({
        title: t('Otak melengkapi, mata mengikuti', 'Closure dan Continuity'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'gestalt-closure-continuity' },
        alt: t('Ikon bergaris terputus tetap terbaca utuh dan titik melengkung diikuti mata.'),
        modes: ['pro'],
        body: [
          proBold('Closure'),
          rPro(' membuat otak melengkapi bentuk yang terputus. '),
          proBold('Continuity'),
          rPro(' membuat mata menyusuri garis lurus atau lengkung, seperti pada penanda langkah (stepper).'),
        ],
      }),
      conceptStep({
        title: t('Satu kotak, depan, dan latar', 'Common Region dan Figure–ground'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'gestalt-region-figure' },
        alt: t('Isi satu kartu terlihat sekelompok. Jendela kecil terpisah dari latar.'),
        body: [
          rJunior('Isi satu kotak dianggap sekelompok. Benda di depan terlihat terpisah dari latarnya. Contohnya jendela kecil yang muncul di atas latar gelap.'),
          proBold('Common region'),
          rPro(' mengelompokkan semua elemen yang berada di satu kotak atau latar. '),
          proBold('Figure–ground'),
          rPro(' memisahkan objek depan dari latar belakang.'),
        ],
      }),
      simStep(
        'hick-menu',
        t(
          'Lihat bagaimana bingkai memisahkan setiap pilihan menu.',
          'Amati Common Region dan Similarity pada deretan kartu tombol di simulator.',
        ),
      ),
      limitStep({
        analogy: t('Menghubungkan bintang jadi rasi'),
        same: [t('Otak mengelompokkan bentuk tanpa diberi penjelasan panjang.')],
        different: [
          t(
            'Bintang tidak diketuk, tetapi di layar salah kelompok membuat salah ketuk.',
            'Bintang tidak diketuk, tetapi di UI pengelompokan yang keliru membuat orang mengetuk tombol milik kartu sebelah.',
          ),
        ],
        riskyAnalogy: false,
      }),
      qStep({
        id: 'a07-l04-q1',
        type: 'match',
        modes: ['pro'],
        prompt: t('Pasangkan prinsip Gestalt dengan contohnya di UI.'),
        difficulty: 2,
        left: [
          { id: 'sim', label: t('Similarity') },
          { id: 'clo', label: t('Closure') },
          { id: 'reg', label: t('Common Region') },
          { id: 'fig', label: t('Figure–ground') },
        ],
        right: [
          { id: 'rsim', label: t('Semua tombol aksi utama bulat dan biru, jadi dikenali sejenis') },
          { id: 'rclo', label: t('Logo yang garisnya terputus tetap terbaca utuh') },
          { id: 'rreg', label: t('Foto, nama, dan tombol Beli dibungkus dalam satu kartu') },
          { id: 'rfig', label: t('Kotak pop-up terang muncul di atas latar yang digelapkan') },
        ],
        answer: { sim: 'rsim', clo: 'rclo', reg: 'rreg', fig: 'rfig' },
        explainCorrect: t('Bentuk dan warna yang sama dibaca sejenis (Similarity), dan kotak pembungkus menyatukan isinya (Common Region). Garis terputus dilengkapi otak (Closure), dan latar gelap menonjolkan pop-up (Figure–ground).'),
        hints: [t('Cocokkan tiap contoh dengan cara mata mengelompokkan.'), undefined],
        tags: ['gestalt'],
      }),
      qStep(
        makeMcq({
          id: 'a07-l04-q2',
          type: 'analogy',
          prompt: t(
            'Saat jendela kecil muncul, latar di belakangnya digelapkan. Untuk apa?',
            'Mengapa latar di belakang jendela pop-up peringatan digelapkan sedikit?',
          ),
          choices: [
            { id: 'fg', label: t('Supaya jendelanya terlihat di depan', 'Untuk memisahkan pop-up (figure) dari latar (ground)') },
            {
              id: 'save',
              label: t('Supaya layar tidak terlalu terang', 'Untuk menghemat baterai perangkat'),
              explainWrong: t(
                'Latar digelapkan untuk mengarahkan mata. Bukan untuk mengatur terang layar.',
                'Latar digelapkan untuk mengarahkan fokus mata, bukan menghemat daya.',
              ),
            },
            {
              id: 'clo',
              label: t('Supaya tulisan di belakang terhapus', 'Untuk menghapus isi halaman belakang'),
              explainWrong: t(
                'Tulisan di belakang hanya diredupkan. Tulisannya tidak hilang.',
                'Halaman belakang hanya diredupkan sementara agar pop-up menonjol di depan.',
              ),
            },
          ],
          answer: 'fg',
          explainCorrect: t(
            'Latar gelap membuat jendelanya terlihat di depan. Mata langsung fokus ke sana.',
            'Figure–ground memisahkan objek utama (figure) dari latar belakang (ground).',
          ),
          hints: [t('Bayangkan lampu bioskop meredup saat film mulai.', 'Cari alasan yang berkaitan dengan fokus mata.')],
          tags: ['gestalt', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l04-q8j',
          type: 'mcq',
          modes: ['junior'],
          prompt: t(
            'Enam titik: 3 titik dekat di kiri, 3 titik dekat di kanan. Mata melihat berapa kelompok?',
            'Enam titik terbagi dua gerombol yang berdekatan di kiri dan kanan. Berapa kelompok yang terlihat?',
          ),
          difficulty: 1,
          choices: [
            { id: 'two', label: t('Dua kelompok yang terpisah') },
            {
              id: 'six',
              label: t('Enam kelompok sendiri-sendiri'),
              explainWrong: t('Titik yang berdekatan menyatu di mata. Enam titik tidak berdiri sendiri.'),
            },
            {
              id: 'one',
              label: t('Satu kelompok besar'),
              explainWrong: t('Ada jarak lebar di tengah. Jarak itu memisahkan dua kelompok.'),
            },
          ],
          answer: 'two',
          explainCorrect: t('Titik yang berdekatan dianggap sekelompok. Jadi mata melihat dua kelompok.'),
          hints: [t('Lihat jarak antara titik-titik itu.')],
          tags: ['gestalt'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l04-q9j',
          type: 'mcq',
          modes: ['junior'],
          prompt: t(
            'Buku merah dan biru bercampur di satu rak. Mata menyatukan yang mana?',
            'Buku merah dan biru bercampur di satu rak. Mata mengelompokkan buku menurut apa?',
          ),
          difficulty: 2,
          choices: [
            { id: 'col', label: t('Buku yang warnanya sama') },
            {
              id: 'thick',
              label: t('Buku yang paling tebal'),
              explainWrong: t('Tebal buku tidak membuatnya sekelompok. Mata menyatukan yang warnanya mirip.'),
            },
            {
              id: 'far',
              label: t('Buku yang paling jauh'),
              explainWrong: t('Yang jauh justru terlihat terpisah. Yang mirip terlihat sekelompok.'),
            },
          ],
          answer: 'col',
          explainCorrect: t('Yang mirip dianggap sekelompok. Warna sama membuat buku terlihat satu kelompok.'),
          hints: [t('Ingat ikon yang berwarna sama.')],
          tags: ['gestalt'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l04-q5',
          type: 'scenario',
          story: t(
            'Di toko kue Sari, harga kue A dekat foto kue B. Orang jadi salah paham.',
            'Di toko kue Sari, foto dan harga kue berderet tanpa bingkai, dan harga kue A lebih dekat ke foto B.',
          ),
          prompt: t('Apa cara terbaik memperbaikinya?', 'Apa cara terbaik memperbaiki masalah pengelompokan pada daftar kue Sari?'),
          difficulty: 2,
          choices: [
            { id: 'card', label: t('Beri tiap kue satu kartu', 'Beri tiap kue satu kartu (Common Region)') },
            {
              id: 'same',
              label: t('Samakan jarak semua foto dan semua harga'),
              explainWrong: t(
                'Jarak yang sama membuat harga tetap sulit dipasangkan. Kotak lebih membantu.',
                'Jarak sama rata tetap membuat orang bingung harga mana milik kue mana.',
              ),
            },
            {
              id: 'hide',
              label: t('Sembunyikan harga semua kue', 'Sembunyikan harga sampai ke halaman pembayaran'),
              explainWrong: t(
                'Harga yang disembunyikan membuat orang bingung. Harga harus terlihat dekat kuenya.',
                'Menyembunyikan harga merusak UX. Orang ingin tahu harga sebelum membeli.',
              ),
            },
          ],
          answer: 'card',
          explainCorrect: t(
            'Satu kartu menyatukan foto dan harga kue yang sama. Orang tidak salah paham lagi.',
            'Common Region dalam bentuk kartu langsung menyatukan foto dan harganya.',
          ),
          hints: [t('Cari cara agar foto dan harga satu kue terlihat bersama.', 'Pilih cara yang memberi batas jelas pada tiap kue.')],
          tags: ['gestalt', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l04-q6',
          modes: ['pro'],
          prompt: t('Langkah "1 — 2 — 3 — 4" dihubungkan garis mendatar. Prinsip mana yang membuat mata mengikuti urutannya?'),
          difficulty: 2,
          choices: [
            { id: 'cont', label: t('Continuity') },
            {
              id: 'clo',
              label: t('Closure'),
              explainWrong: t('Closure membuat otak melengkapi bentuk yang terputus menjadi sosok utuh.'),
            },
            {
              id: 'fig',
              label: t('Figure–ground'),
              explainWrong: t('Figure–ground memisahkan objek depan dari latar belakang.'),
            },
          ],
          answer: 'cont',
          explainCorrect: t('Mata mengikuti arah garis atau deretan yang bersambung. Itulah Continuity.'),
          hints: [t('Cari prinsip yang membuat mata menyusuri garis.')],
          tags: ['gestalt'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l04-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Melihat rasi bintang di langit'),
          prompt: t('Apa risiko di UI kalau prinsip pengelompokan Gestalt diabaikan?'),
          difficulty: 2,
          choices: [
            { id: 'mis', label: t('Orang bisa mengira tombol produk A milik produk B') },
            {
              id: 'auto',
              label: t('Orang berhenti mengelompokkan elemen di layar sama sekali'),
              explainWrong: t('Otak tetap mengelompokkan dengan sendirinya. Risikonya, kelompok yang terbentuk bisa salah.'),
            },
            {
              id: 'line',
              label: t('Tampilan jadi kurang indah, tetapi fungsinya tetap aman'),
              explainWrong: t('Akibatnya lebih dari soal keindahan. Kelompok yang salah membuat orang salah ketuk.'),
            },
          ],
          answer: 'mis',
          explainCorrect: t('Jarak atau kotak yang salah langsung menyebabkan salah ketuk di UI.'),
          hints: [t('Cari akibat yang merugikan orang yang memakai UI.')],
          tags: ['gestalt', 'ux'],
        }),
      ),
      qStep({
        id: 'a07-l04-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Isi bagian kosong dengan prinsip Gestalt yang tepat.'),
        difficulty: 2,
        template: 'Prinsip Gestalt di mana mata memisahkan objek utama dari latar belakangnya disebut ___.',
        bank: ['figure-ground', 'closure', 'similarity'],
        answer: ['figure-ground'],
        explainCorrect: t('Kontras dan overlay gelap di latar memperkuat hubungan figure–ground.'),
        hints: [t('Cari prinsip tentang objek depan dan latar.'), undefined],
        tags: ['gestalt'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-l04-r1',
        prompt: t(
          'Dua gambar berdekatan dan berwarna sama. Mata menganggapnya bagaimana?',
          'Apa nama kumpulan temuan psikologi tentang cara otak mengelompokkan bentuk?',
        ),
        choices: [
          { id: 'g', label: t('Satu kelompok', 'Prinsip Gestalt') },
          {
            id: 'v',
            label: t('Dua hal yang berlawanan', 'Aturan C.R.A.P.'),
            explainWrong: t(
              'Benda yang dekat dan mirip tampak berhubungan, bukan berlawanan.',
              'Itu daftar periksa tampilan, bukan teori persepsi.',
            ),
          },
          {
            id: 'x',
            label: t('Dua hal yang tidak berhubungan', 'Hierarki visual'),
            explainWrong: t(
              'Yang dekat dan mirip terlihat berhubungan. Mata menyatukannya.',
              'Hierarki mengatur urutan baca, bukan cara mengelompokkan bentuk.',
            ),
          },
        ],
        answer: 'g',
        explainCorrect: t(
          'Yang dekat dan mirip dianggap satu kelompok.',
          'Prinsip Gestalt menjadi dasar banyak aturan tata letak UI.',
        ),
        hints: [t('Ingat bintang yang berdekatan menjadi satu rasi.')],
        tags: ['gestalt'],
      }),
      makeTf({
        id: 'a07-l04-r2',
        prompt: t(
          'Isi satu kotak kartu dianggap satu kelompok.',
          'Dalam prinsip Common Region, elemen di dalam satu kotak kartu dibaca sebagai satu kelompok.',
        ),
        answer: true,
        explainCorrect: t(
          'Batas kotak menyatukan isinya.',
          'Batas kotak atau warna latar yang sama menyatukan elemen di dalamnya.',
        ),
        explainWrong: t(
          'Batas kotak menyatukan isinya. Foto dan harga dalam satu kartu terlihat sekelompok.',
          'Batas kotak atau warna latar yang sama langsung menyatukan elemen di dalamnya.',
        ),
        hints: [t('Bayangkan foto dan harga di dalam satu kartu.')],
        tags: ['gestalt'],
      }),
    ],
    recap: t(
      'Mata mengelompokkan yang dekat, mirip, segaris, atau sekotak.',
      'Enam prinsip Gestalt: Proximity, Similarity, Closure, Continuity, Common Region, dan Figure–ground.',
    ),
    companion: {
      talkPrompts: ['Kamu melihat rasi bintang tanpa garis. Mengapa bisa?'],
      offlineActivity: 'Gambar 6 titik berkelompok 2-2-2 di kertas, lalu tanya temanmu ada berapa kelompok yang langsung terlihat.',
    },
  }),

  makeLesson({
    id: 'a07-l05',
    worldId: 'a07',
    title: 'Sedikit pilihan, letak biasa',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa memilih menu yang sedikit dan tombol di tempat biasa.',
      "Kamu bisa memakai Hick's Law dan Jakob's Law untuk menyederhanakan menu dan tata letak.",
    ),
    estMinutes: 6,
    introducesTerms: ['hick-law'],
    usesTerms: ['ui', 'ux', 'hierarki'],
    stickerId: 'warung-menu',
    warmupFrom: 'a07-l04',
    atWork: 'Kamu akan memangkas menu navigasi yang terlalu panjang setelah data klik menunjukkan orang jarang menyentuhnya.',
    steps: [
      storyStep('a07/warung-menu.svg', [
        rText(
          'Di warung dengan 5 menu, kamu cepat memesan. Di restoran dengan 80 menu, kamu lama memilih. Mengapa begitu?',
          'Halaman langganan aplikasi Dimas menampilkan 12 paket, dan orang menutup halaman tanpa memilih. Mengapa?',
        ),
      ]),
      conceptStep({
        title: t('Terlalu banyak pilihan', "Hick's Law"),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'hick-law-pilihan' },
        alt: t('Empat pilihan cepat dipilih. Enam belas pilihan membingungkan.'),
        body: [
          rTerm('hick-law', "Hick's Law", "Hick's Law"),
          rText(
            ' berkata: makin banyak pilihan, makin lama kita memutuskan. Jadi buat menu utama pendek, misalnya 5 sampai 7 pilihan.',
            ' adalah hukum yang menyatakan bahwa waktu memutuskan bertambah seiring jumlah pilihan. Hukum ini tidak menyebut angka. Praktik umumnya: jaga menu utama ringkas (sering 5–7 item) dan pecah form panjang menjadi beberapa langkah.',
          ),
        ],
      }),
      qStep(
        makeTf({
          id: 'a07-l05-q2',
          prompt: t(
            'Menu atas punya 25 tombol. Orang jadi lebih cepat menemukan tujuannya.',
            'Menu atas dengan 25 tombol sejajar membuat orang lebih cepat menemukan tujuannya.',
          ),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru: pilihan yang banyak membuat orang bingung. Seperti buku menu 80 makanan.',
            'Pernyataan itu keliru: waktu memutuskan bertambah seiring jumlah pilihan.',
          ),
          explainWrong: t(
            'Makin banyak pilihan, makin lama orang memutuskan. Cukup 5 sampai 7 menu.',
            "Dalam Hick's Law, 25 pilihan memperlambat keputusan. Menu utama yang ringkas (sering 5–7 item) lebih cepat dipindai.",
          ),
          hints: [t('Ingat buku menu restoran dengan 80 makanan.')],
          tags: ['hick-law'],
        }),
      ),
      conceptStep({
        title: t('Ikuti kebiasaan umum', "Jakob's Law"),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'jakob-law-kebiasaan' },
        alt: t('Logo di kiri atas, kaca pembesar untuk cari, keranjang di kanan atas.'),
        body: [
          rJunior('Orang terbiasa dengan situs lain. Taruh logo di kiri atas dan keranjang di kanan atas. Pakai kaca pembesar untuk mencari.'),
          proBold("Jakob's Law"),
          rPro(' adalah hukum yang menyatakan bahwa orang lebih banyak memakai situs lain, jadi mereka mengharapkan pola yang sama. Ikuti pola yang akrab: logo di kiri atas, pencarian berikon kaca pembesar, keranjang di kanan atas.'),
        ],
      }),
      conceptStep({
        title: t('Mengelola katalog besar'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'kategori-dan-saran' },
        alt: t('Banyak produk dikelompokkan dalam beberapa kelompok dan filter.'),
        modes: ['pro'],
        body: [
          rText(
            'Katalog besar tidak bisa dipangkas. Bantu keputusan dengan kelompok produk yang ringkas, filter bertahap, dan satu rekomendasi.',
          ),
        ],
      }),
      simStep(
        'hick-menu',
        t(
          'Cari "Teh Hangat" di 4 menu, lalu di 16 menu.',
          "Bandingkan waktu keputusan antara 4 pilihan dan 16 pilihan pada simulator Hick's Law.",
        ),
      ),
      limitStep({
        analogy: t('Warung dengan 5 menu'),
        same: [t('Pilihan yang sedikit membuat kita cepat memutuskan.')],
        different: [
          t(
            'Toko online mengelompokkan banyak barang, bukan membuangnya.',
            "Toko online punya banyak barang, jadi Hick's Law dipakai lewat kelompok dan filter, bukan membuang produk.",
          ),
        ],
        riskyAnalogy: true,
      }),
      qStep(
        makeMcq({
          id: 'a07-l05-q1',
          type: 'analogy',
          prompt: t(
            'Rem mobil dipindah ke atap. Desain web mana yang mirip kesalahan itu?',
            "Ibarat memindahkan pedal rem ke atap mobil, desain mana yang melanggar Jakob's Law?",
          ),
          choices: [
            {
              id: 'swap',
              label: t('Keranjang di pojok kiri bawah', 'Keranjang belanja dipindah ke pojok kiri bawah'),
            },
            {
              id: 'top',
              label: t('Logo di kiri atas, menuju beranda', 'Logo di kiri atas membuka beranda saat diketuk'),
              explainWrong: t(
                'Logo di kiri atas memang kebiasaan umum. Orang langsung mengenalinya.',
                'Itu justru kebiasaan umum yang sudah dikenal orang.',
              ),
            },
            {
              id: 'search',
              label: t('Kaca pembesar untuk kotak cari', 'Kaca pembesar dipakai sebagai ikon pencarian'),
              explainWrong: t(
                'Kaca pembesar sudah dikenal sebagai tombol cari. Itu bukan kesalahan.',
                "Kaca pembesar untuk mencari sesuai dengan Jakob's Law.",
              ),
            },
          ],
          answer: 'swap',
          explainCorrect: t(
            'Orang mengira keranjang ada di kanan atas. Letak yang aneh membuat mereka bingung.',
            'Jangan membalik arti ikon atau letak standar yang sudah menjadi kebiasaan umum.',
          ),
          hints: [t('Ingat rem mobil yang selalu ada di kaki.', 'Cari letak yang berbeda dari kebiasaan situs lain.')],
          tags: ['hick-law', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l05-q3',
          type: 'limit',
          analogy: t('Warung dengan 5 menu'),
          prompt: t(
            'Toko buku online punya 5.000 buku. Apa yang sebaiknya dilakukan?',
            "Toko buku online menjual 5.000 judul. Bagaimana menerapkan Hick's Law dengan tepat?",
          ),
          difficulty: 2,
          choices: [
            { id: 'cat', label: t('Bagi buku ke dalam kelompok', 'Bagi ke dalam kelompok, sediakan kotak cari dan filter') },
            {
              id: 'del',
              label: t('Kurangi bukunya jadi sedikit', 'Pangkas katalog menjadi 50 judul terlaris'),
              explainWrong: t('Toko besar tetap perlu banyak buku. Cukup kelompokkan.', 'Toko besar tetap perlu katalog lengkap. Yang dikurangi adalah pilihan di tiap langkah, lewat kelompok dan filter.'),
            },
            {
              id: 'dump',
              label: t('Urutkan buku dari A sampai Z', 'Urutkan 5.000 judul dari A sampai Z di satu halaman'),
              explainWrong: t('Urutan A sampai Z tetap menampilkan banyak sekali buku sekaligus. Orang tetap lama memilih.', 'Urutan abjad tetap menyajikan 5.000 pilihan sekaligus. Waktu memutuskan tidak berkurang.'),
            },
          ],
          answer: 'cat',
          explainCorrect: t(
            'Kelompok dan kotak cari menjaga pilihan tetap sedikit. Bukunya tidak perlu dibuang.',
            'Pengelompokan dan filter bertahap menjaga jumlah pilihan di setiap langkah tetap ringan.',
          ),
          hints: [t('Ingat etalase. Toko online punya lebih banyak barang.', 'Cari cara mengurangi pilihan per langkah tanpa membuang produk.')],
          tags: ['hick-law'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l05-q4',
          type: 'scenario',
          story: t(
            'Aplikasi belajar Dimas punya 12 paket berlangganan. Orang menutup halaman tanpa memilih.',
            'Halaman langganan aplikasi Dimas punya 12 paket bernama membingungkan, dan orang menutup halaman tanpa memilih.',
          ),
          prompt: t('Apa solusi terbaik?', "Dalam Hick's Law, apa solusi terbaik?"),
          difficulty: 2,
          choices: [
            { id: 'rec', label: t('Ringkas menjadi 3 paket', 'Ringkas jadi 3 paket, tandai satu rekomendasi') },
            {
              id: 'more',
              label: t('Susun 12 paket dalam tabel', 'Susun 12 paket dalam tabel perbandingan'),
              explainWrong: t('Tabel terlihat rapi, tetapi pilihannya tetap 12. Orang tetap bingung.', 'Tabel merapikan tampilan, tetapi jumlah pilihannya tetap 12. Waktu memutuskan tidak turun.'),
            },
            {
              id: 'hide',
              label: t('Beri tiap paket warna berbeda', 'Beri 12 paket nama yang lebih jelas'),
              explainWrong: t('Warna membuat paket mudah dibedakan. Tetapi pilihannya tetap 12.', 'Nama yang jelas membantu, tetapi orang tetap harus menimbang 12 pilihan.'),
            },
          ],
          answer: 'rec',
          explainCorrect: t(
            'Tiga paket membuat orang cepat memilih. Satu paket bisa diberi tanda "Paling Populer".',
            'Mengurangi pilihan menjadi 3–4 paket utama mempercepat keputusan.',
          ),
          hints: [t('Ingat warung dengan 5 menu.', 'Kurangi jumlah pilihan, lalu sorot satu saran.')],
          tags: ['hick-law', 'ux'],
        }),
      ),
      qStep({
        id: 'a07-l05-q5',
        type: 'sort',
        prompt: t(
          'Kelompokkan tiap keputusan ke aturan yang tepat.',
          "Kelompokkan keputusan ini ke Hick's Law atau Jakob's Law.",
        ),
        difficulty: 2,
        items: [
          { id: 'h1', label: t('Menu utama hanya 5 sampai 7 item', 'Batasi menu utama navigasi menjadi 5–7 item') },
          { id: 'j1', label: t('Kaca pembesar untuk kotak cari', 'Pakai ikon kaca pembesar untuk kolom pencarian') },
          { id: 'h2', label: t('Form panjang dibagi 3 langkah', 'Pecah form panjang menjadi 3 langkah bertahap') },
          { id: 'j2', label: t('Keranjang di pojok kanan atas', 'Taruh tombol keranjang belanja di pojok kanan atas') },
        ],
        bins: [
          { id: 'hick', label: t('Pilihan sedikit', "Hick's Law"), icon: 'lightbulb' },
          { id: 'jakob', label: t('Letak biasa', "Jakob's Law"), icon: 'map-pin' },
        ],
        answer: { h1: 'hick', j1: 'jakob', h2: 'hick', j2: 'jakob' },
        explainCorrect: t(
          'Pilihan sedikit membuat cepat memutuskan. Letak biasa membuat tombol mudah ditemukan.',
          'Hick menjaga pilihan tidak membanjir. Jakob menjaga pola tetap akrab.',
        ),
        hints: [t('Tanya: ini mengurangi pilihan, atau meniru kebiasaan?'), undefined],
        tags: ['hick-law'],
      }),
      qStep(
        makeMcq({
          id: 'a07-l05-q6',
          type: 'why',
          modes: ['pro'],
          base: 'jakob-law',
          prompt: t('Mengapa orang kesal kalau toko online menaruh ikon keranjang aneh di bawah halaman?'),
          difficulty: 2,
          choices: [
            { id: 'hab', label: t('Mereka sudah tahu letak keranjang dari situs lain') },
            {
              id: 'bug',
              label: t('Ikon di bagian bawah tidak bisa diketuk'),
              explainWrong: t('Ikon bisa diletakkan di mana saja. Yang terganggu adalah kebiasaan orang.'),
            },
            {
              id: 'slow',
              label: t('Ikon baru membuat halaman lebih lambat dimuat'),
              explainWrong: t('Kecepatan halaman tidak berubah. Yang berubah adalah kebiasaan orang.'),
            },
          ],
          answer: 'hab',
          explainCorrect: t('Orang membawa kebiasaan dari situs lain. Pola yang akrab membuat situs baru langsung terpakai.'),
          hints: [t('Pikirkan apa yang orang harapkan dari situs lain yang pernah mereka pakai.')],
          tags: ['hick-law', 'ux'],
        }),
      ),
      qStep({
        id: 'a07-l05-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Isi bagian kosong dengan kebiasaan umum jumlah menu utama.'),
        difficulty: 1,
        template: 'Batasi pilihan menu utama sekitar ___ item agar orang cepat memutuskan.',
        bank: ['5–7', '50–80', '100'],
        answer: ['5–7'],
        explainCorrect: t("Hick's Law tidak menetapkan angka. Kebiasaan umumnya 5 sampai 7 menu utama, supaya navigasi cepat dipindai."),
        hints: [t('Pilih angka yang bisa terbaca sekilas.'), undefined],
        tags: ['hick-law'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-l05-r1',
        prompt: t(
          'Apa yang terjadi kalau pilihan terlalu banyak?',
          "Apa inti Hick's Law?",
        ),
        choices: [
          { id: 'ok', label: t('Orang lama memutuskan', 'Makin banyak pilihan, makin lama waktu memutuskan') },
          {
            id: 'no',
            label: t('Orang makin cepat memilih', 'Makin kecil tombol, makin cepat diketuk'),
            explainWrong: t(
              'Pilihan yang banyak membuat orang bingung, bukan cepat.',
              "Ukuran tombol dan jarak dibahas di Fitts's Law.",
            ),
          },
          {
            id: 'mem',
            label: t('Orang makin hafal menu', 'Makin sedikit pilihan, makin lama memutuskan'),
            explainWrong: t(
              'Menu yang panjang justru sulit dihafal.',
              'Pilihan yang sedikit mempercepat keputusan, bukan memperlambat.',
            ),
          },
        ],
        answer: 'ok',
        explainCorrect: t(
          'Pilihan yang banyak membuat orang bingung. Karena itu menu dibuat singkat.',
          "Hick's Law membantu kita memangkas pilihan yang tidak perlu.",
        ),
        hints: [t('Ingat buku menu restoran dengan 80 makanan.')],
        tags: ['hick-law'],
      }),
      makeTf({
        id: 'a07-l05-r2',
        prompt: t(
          'Orang berharap situs baru bekerja seperti situs lain yang mereka kenal.',
          "Dalam Jakob's Law, orang berharap situsmu bekerja seperti situs lain yang sudah mereka kenal.",
        ),
        answer: true,
        explainCorrect: t(
          'Orang membawa kebiasaan dari situs lain. Letak yang akrab membuat mereka tenang.',
          'Pola yang akrab membuat situs baru langsung terpakai.',
        ),
        explainWrong: t(
          'Orang membawa kebiasaan dari situs lain. Jangan mengubah letak standar tanpa alasan kuat.',
          'Jangan mengubah letak logo, kolom cari, atau keranjang tanpa alasan kuat.',
        ),
        hints: [t('Ingat rem mobil yang selalu ada di kaki.')],
        tags: ['hick-law'],
      }),
    ],
    recap: t(
      'Sedikitkan pilihan dan taruh tombol di tempat yang biasa.',
      "Terapkan Hick's Law (menu ringkas, filter, satu rekomendasi) dan Jakob's Law (pola dan ikon yang akrab).",
    ),
    companion: {
      talkPrompts: ['Warung mana yang lebih cepat dipesan: 5 menu atau 80 menu?'],
      offlineActivity: 'Buka dua situs belanja atau berita yang berbeda, lalu cek apakah letak logo dan ikon pencariannya mirip.',
    },
  }),

  makeLesson({
    id: 'a07-l06',
    worldId: 'a07',
    title: 'Tombol besar, jawaban cepat',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa memilih tombol yang besar dan dekat jempol.',
      'Kamu bisa menerapkan Fitts\'s Law dan Doherty Threshold pada tombol dan waktu tanggapan.',
    ),
    estMinutes: 6,
    introducesTerms: ['fitts-law'],
    usesTerms: ['ui', 'ux', 'responsif'],
    warmupFrom: 'a07-l05',
    atWork: 'Kamu akan memperbesar tombol dan menambah indikator muat saat laporan pengujian menunjukkan orang mengetuk dua kali.',
    steps: [
      storyStep('a07/gawang-fitts.svg', [
        rText(
          'Menendang bola ke gawang lebar dari dekat itu mudah. Gawang mini dari tengah lapangan sulit. Bagaimana dengan tombol di HP?',
          'Laporan pengujian toko Rani menunjukkan orang mengetuk tombol "Kirim Pesanan" dua kali, karena layar diam tanpa tanda. Apa yang salah?',
        ),
      ]),
      conceptStep({
        title: t('Besar dan dekat jempol', "Fitts's Law"),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'area-jempol-fitts' },
        alt: t('Tombol Bayar besar di bawah layar HP dekat jempol.'),
        body: [
          rTerm('fitts-law', "Fitts's Law", "Fitts's Law"),
          rText(
            ' berkata: tombol yang besar dan dekat lebih mudah diketuk. Taruh tombol utama di bawah layar HP, dekat jempol.',
            ' adalah hukum yang menyatakan bahwa target yang lebih besar dan lebih dekat lebih cepat dicapai. Letakkan tombol utama besar di zona jempol dan jauhkan tombol berbahaya seperti Hapus.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a07-l06-q1',
          type: 'analogy',
          prompt: t(
            'Tombol Bayar dibuat besar dan dekat jempol. Mengapa?',
            'Hukum UX mana yang diterapkan pada tombol besar di bagian bawah layar HP, dekat ibu jari?',
          ),
          choices: [
            { id: 'fit', label: t('Supaya mudah diketuk', "Fitts's Law") },
            {
              id: 'doh',
              label: t('Supaya tampak lebih bagus', 'Doherty Threshold'),
              explainWrong: t(
                'Tombol besar memang mencolok. Tujuannya supaya jarimu tidak meleset.',
                'Doherty Threshold membahas waktu tanggapan di bawah 0,4 detik.',
              ),
            },
            {
              id: 'col',
              label: t('Supaya muat banyak tulisan', "Hick's Law"),
              explainWrong: t(
                'Tulisan di tombol itu pendek. Ukurannya dibuat besar untuk jarimu.',
                "Hick's Law membahas jumlah pilihan, bukan ukuran dan jarak tombol.",
              ),
            },
          ],
          answer: 'fit',
          explainCorrect: t(
            'Tombol besar dan dekat lebih mudah diketuk. Seperti gawang lebar yang mudah dibobol dari dekat.',
            "Fitts's Law: target yang lebih besar dan lebih dekat lebih mudah dicapai.",
          ),
          hints: [t('Ingat gawang lebar dan gawang mini.', 'Cari hukum yang membahas ukuran dan jarak target.')],
          tags: ['fitts-law'],
        }),
      ),
      conceptStep({
        title: t('Jawaban cepat terasa lancar', 'Doherty Threshold'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'batas-doherty-04-detik' },
        alt: t('Jam ukur menunjukkan batas terasa seketika.'),
        body: [
          rJunior('Tombol yang menjawab dalam sekejap terasa lancar. Kalau butuh waktu, tampilkan tanda memuat.'),
          proBold('Doherty Threshold'),
          rPro(' adalah batas waktu tanggapan sistem agar terasa seketika: kurang dari 0,4 detik.'),
        ],
      }),
      conceptStep({
        title: t('Umpan balik seketika dan skeleton'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'loading-dan-skeleton' },
        alt: t('Tombol berubah warna saat diketuk, lalu kerangka skeleton muncul sementara data dimuat.'),
        modes: ['pro'],
        body: [
          rText(
            'Beri umpan balik langsung pada setiap ketukan, misalnya ubah warna atau status tombol. Untuk proses lebih lama dari 0,4 detik, tampilkan skeleton (kerangka abu sementara) atau progress bar (bilah kemajuan).',
          ),
        ],
      }),
      simStep(
        'fitts-target',
        t(
          'Bandingkan tombol kecil di pojok atas dengan tombol besar dekat jempol.',
          'Bandingkan mengetuk target kecil yang jauh dengan tombol besar di zona jempol.',
        ),
      ),
      limitStep({
        analogy: t('Gawang lebar dari dekat'),
        same: [
          t(
            'Sasaran besar dan dekat mudah dicapai.',
            'Sasaran yang lebar dan dekat mudah dicapai, dan jawaban cepat menjaga alur tetap hidup.',
          ),
        ],
        different: [
          t(
            'Tombol Hapus justru dijauhkan, supaya tidak terketuk tanpa sengaja.',
            'Tombol tidak perlu sebesar layar: cukup 44–48 px. Tombol berbahaya seperti Hapus justru dijauhkan agar tidak terketuk tanpa sengaja.',
          ),
        ],
        riskyAnalogy: true,
      }),
      qStep(
        makeTf({
          id: 'a07-l06-q2',
          prompt: t(
            'Aplikasi yang menjawab dalam sekejap terasa lancar.',
            'Dalam Doherty Threshold, tanggapan di bawah 0,4 detik membuat orang merasa alurnya lancar dan tetap fokus.',
          ),
          answer: true,
          explainCorrect: t(
            'Kalau tombol langsung menjawab, kamu tidak sempat bosan. Seperti teman yang langsung membalas saat diajak mengobrol.',
            'Di bawah 0,4 detik, jeda nyaris tidak terasa. Perhatian orang tidak terputus.',
          ),
          explainWrong: t(
            'Menunggu lama terasa macet. Jawaban yang cepat terasa lancar.',
            'Jeda panjang memutus fokus. Batas terasa lancar sekitar 0,4 detik.',
          ),
          hints: [t('Ingat teman yang lama diam sebelum menjawab.')],
          tags: ['fitts-law'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l06-q3',
          type: 'limit',
          analogy: t('Menendang bola ke gawang selebar mungkin'),
          prompt: t(
            'Tombol Hapus Semua Data sebaiknya ditaruh di mana?',
            'Dalam Fitts\'s Law, tombol mana yang sebaiknya dijauhkan dari tombol "Simpan"?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'del',
              label: t('Jauh dari tombol Simpan', 'Tombol berbahaya seperti "Hapus Semua Data"'),
            },
            {
              id: 'ok',
              label: t('Menempel di samping tombol Simpan', 'Tombol "Beli Sekarang" di bagian bawah halaman belanja'),
              explainWrong: t(
                'Kalau menempel, jari mudah salah ketuk. Tombol Hapus berbahaya.',
                'Tombol aksi utama justru ditaruh di area yang mudah dijangkau.',
              ),
            },
            {
              id: 'next',
              label: t('Besar di dekat jempol', 'Tombol "Lanjut" di halaman pendaftaran'),
              explainWrong: t(
                'Tempat itu untuk tombol utama. Hapus tidak boleh semudah itu diketuk.',
                'Tombol Lanjut adalah aksi utama yang perlu mudah dijangkau.',
              ),
            },
          ],
          answer: 'del',
          explainCorrect: t(
            'Tombol berbahaya sebaiknya sulit tersentuh. Jarak membuat jari tidak salah ketuk.',
            "Fitts's Law juga dipakai untuk menjauhkan tombol berbahaya agar jari tidak salah ketuk.",
          ),
          hints: [t('Tombol yang berbahaya sebaiknya jangan terlalu mudah diketuk.', 'Pikirkan tombol yang bisa menghapus data.')],
          tags: ['fitts-law', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l06-q4',
          type: 'scenario',
          story: t(
            'Rani menekan "Kirim Pesanan". Tombol diam saja. Rani mengira belum terketuk, lalu menekannya 4 kali.',
            'Tombol "Kirim Pesanan" diam tanpa animasi selama 2 detik, jadi Rani mengetuknya 4 kali.',
          ),
          prompt: t('Apa yang sebaiknya tombol lakukan?', 'Cara apa yang paling tepat memperbaiki masalah Doherty Threshold ini?'),
          difficulty: 2,
          choices: [
            { id: 'load', label: t('Berubah jadi "Mengirim..."', 'Ubah teks tombol seketika jadi "Mengirim…"') },
            {
              id: 'tiny',
              label: t('Berubah warna setelah selesai', 'Tampilkan pesan sukses setelah server menjawab'),
              explainWrong: t('Tanda itu datang terlambat. Rani sudah menekan berkali-kali sebelum selesai.', 'Pesan itu baru muncul setelah 2 detik. Selama menunggu, Rani tetap tidak tahu ketukannya diterima.'),
            },
            {
              id: 'hide',
              label: t('Terkunci agar tidak bisa ditekan', 'Nonaktifkan tombol tanpa mengubah tampilannya'),
              explainWrong: t('Tombol terkunci mencegah ketukan ganda. Tetapi Rani tetap tidak tahu pesanannya sedang dikirim.', 'Ketukan ganda memang tercegah. Tetapi Rani tetap tidak melihat tanda bahwa pesanan sedang diproses.'),
            },
          ],
          answer: 'load',
          explainCorrect: t(
            'Tombol yang berubah memberi tahu bahwa ketukanmu diterima. Rani tidak perlu menekan lagi.',
            'Tanggapan visual langsung (di bawah 0,4 detik) menenangkan orang sambil menunggu proses selesai.',
          ),
          hints: [t('Apa yang bisa tombol tunjukkan setelah diketuk?', 'Cari cara memberi tanda sebelum proses selesai.')],
          tags: ['fitts-law', 'ux'],
        }),
      ),
      qStep({
        id: 'a07-l06-q5',
        type: 'match',
        prompt: t(
          'Pasangkan masalah tombol dengan penyebabnya.',
          'Pasangkan masalah UI di HP dengan hukum yang menjelaskannya.',
        ),
        difficulty: 2,
        left: [
          { id: 'f1', label: t('Tombol Tutup sangat kecil di pojok', 'Tombol "Tutup" hanya 12 px di pojok, sulit dijangkau jempol') },
          { id: 'd1', label: t('Layar diam lama setelah diketuk', 'Setelah diketuk, layar diam 3 detik tanpa tanda loading') },
          { id: 'f2', label: t('Tombol Hapus menempel di dekat Simpan', 'Tombol "Hapus Akun" menempel di sebelah "Simpan Profil"') },
        ],
        right: [
          { id: 'rf1', label: t('Terlalu kecil dan jauh', "Fitts's Law: target kecil dan jauh") },
          { id: 'rd1', label: t('Tidak ada tanda menjawab', 'Doherty Threshold: tanpa tanggapan') },
          { id: 'rf2', label: t('Tombol berbahaya terlalu dekat', "Fitts's Law: aksi berbahaya terlalu dekat") },
        ],
        answer: { f1: 'rf1', d1: 'rd1', f2: 'rf2' },
        explainCorrect: t(
          'Ukuran dan jarak menentukan mudah-tidaknya diketuk. Tanda menjawab menentukan rasa lancar.',
          "Masalah ukuran dan jarak termasuk Fitts's Law. Masalah kecepatan tanggapan termasuk Doherty Threshold.",
        ),
        hints: [t('Tanya: masalahnya ukuran, jarak, atau menunggu?', 'Pisahkan masalah gerak jari dari masalah waktu tunggu.'), undefined],
        tags: ['fitts-law'],
      }),
      qStep(
        makeMcq({
          id: 'a07-l06-q6',
          modes: ['pro'],
          prompt: t('Data daftar barang butuh 1,5 detik untuk diambil dari server. Tampilan sementara apa yang menjaga rasa cepat?'),
          difficulty: 2,
          choices: [
            { id: 'skel', label: t('Skeleton loading atau progress bar') },
            {
              id: 'err',
              label: t('Pesan "Gagal Memuat" sebelum data tiba'),
              explainWrong: t('Data masih dalam perjalanan. Pesan error terlalu cepat membuat orang panik.'),
            },
            {
              id: 'blank',
              label: t('Halaman membeku tanpa pesan apa pun'),
              explainWrong: t('Halaman beku tanpa keterangan membuat orang cepat pergi.'),
            },
          ],
          answer: 'skel',
          explainCorrect: t('Skeleton menunjukkan bahwa tata letak sedang disiapkan, jadi halaman terasa lebih cepat.'),
          hints: [t('Cari tampilan yang memberi tanda sedang memuat.')],
          tags: ['fitts-law', 'ux'],
        }),
      ),
      qStep({
        id: 'a07-l06-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Berapa detik batas tanggapan agar terasa instan dalam Doherty Threshold? Tulis angkanya saja, misalnya 2,5.'),
        difficulty: 2,
        accept: ['0.4', '0,4', '0.4 detik', '0,4 detik'],
        explainCorrect: t('Sekitar 0,4 detik (400 ms) menjadi patokan tanggapan yang terasa seketika.'),
        hints: [t('Angkanya kurang dari 1 detik.'), undefined],
        tags: ['fitts-law'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-l06-r1',
        prompt: t(
          'Di layar HP, tombol utama paling nyaman ditaruh di mana?',
          "Dalam Fitts's Law, di mana posisi paling nyaman untuk tombol utama di layar HP?",
        ),
        choices: [
          { id: 'bot', label: t('Di bawah, dekat jempol', 'Bagian bawah layar, dekat jempol') },
          {
            id: 'top',
            label: t('Di pojok atas, ukuran mungil', 'Pojok atas kanan, ukuran mungil'),
            explainWrong: t(
              'Pojok atas paling jauh dari jempol. Tombol mungil juga sulit diketuk.',
              'Pojok atas paling jauh dari jangkauan ibu jari saat memegang HP dengan satu tangan.',
            ),
          },
          {
            id: 'mid',
            label: t('Di tengah, tertutup tulisan', 'Di tengah layar, tertutup teks panjang'),
            explainWrong: t(
              'Tombol yang tertutup tulisan sulit ditemukan dan diketuk.',
              'Tombol yang tertutup konten menyulitkan orang menemukan dan mengetuknya.',
            ),
          },
        ],
        answer: 'bot',
        explainCorrect: t(
          'Tombol besar dekat jempol cepat dan tepat diketuk.',
          'Target besar di area jempol cepat dan akurat diketuk.',
        ),
        hints: [t('Ingat gawang lebar dari dekat.')],
        tags: ['fitts-law'],
      }),
      makeTf({
        id: 'a07-l06-r2',
        prompt: t(
          'Setiap ketukan tombol sebaiknya langsung memberi tanda.',
          'Setiap ketukan sebaiknya memberi umpan balik seketika, walau proses ke server butuh lebih dari 0,4 detik.',
        ),
        answer: true,
        explainCorrect: t(
          'Tanda langsung membuat orang yakin ketukannya diterima.',
          'Perubahan tombol atau loading langsung menjaga fokus dan kepastian.',
        ),
        explainWrong: t(
          'Tanda langsung membuat orang yakin ketukannya diterima. Tanpa tanda, mereka mengetuk lagi.',
          'Umpan balik instan memberi kepastian bahwa ketukan sudah diterima sistem.',
        ),
        hints: [t('Ingat tombol Kirim Pesanan yang diam saja.')],
        tags: ['fitts-law'],
      }),
    ],
    recap: t(
      'Buat tombol besar dan dekat jempol, lalu beri jawaban cepat.',
      "Terapkan Fitts's Law (≥ 44 px di zona jempol, jauhkan tombol berbahaya) dan Doherty Threshold (< 0,4 detik dengan skeleton).",
    ),
    companion: {
      talkPrompts: ['Pegang HP dengan satu tangan. Bagian layar mana yang paling mudah dijangkau jempolmu?'],
      offlineActivity: 'Buka kalkulator atau aplikasi chat dengan satu tangan, lalu tunjuk tombol yang butuh tangan kedua.',
    },
  }),

  makeLesson({
    id: 'a07-l07',
    worldId: 'a07',
    title: 'Kelompok kecil, mudah diingat',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa memecah info panjang dan menonjolkan satu tombol penting.',
      "Kamu bisa memakai Miller's Law, Von Restorff Effect, dan Serial Position Effect pada tampilan.",
    ),
    estMinutes: 6,
    introducesTerms: ['miller-law'],
    usesTerms: ['ui', 'ux', 'hierarki'],
    warmupFrom: 'a07-l06',
    atWork: 'Kamu akan memecah nomor kartu menjadi kelompok 4 angka saat form pembayaran sering salah ketik.',
    steps: [
      storyStep('a07/baju-merah-angka.svg', [
        rText(
          'Nomor HP 081234567890 sulit diingat. Kalau dipecah jadi 0812-3456-7890, jauh lebih mudah. Mengapa?',
          'Form pembayaran Toko Rani sering salah ketik nomor kartu 16 digit. Tim ingin tahu cara membuat nomor itu lebih mudah dibaca.',
        ),
      ]),
      conceptStep({
        title: t('Pecah jadi kelompok kecil', "Miller's Law dan chunking"),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'miller-chunking-nomor' },
        alt: t('Deret angka panjang 081234567890 dipecah jadi 0812-3456-7890.'),
        body: [
          rTerm('miller-law', "Miller's Law", "Miller's Law"),
          rText(
            ' berkata: ingatan kita hanya kuat menampung sekitar 7 hal sekaligus. Jadi pecah info panjang menjadi kelompok kecil.',
            ' adalah hukum yang menyatakan bahwa memori jangka pendek menampung rata-rata 7 (±2) potong informasi. Pecah nomor, formulir, dan bacaan menjadi kelompok kecil (chunking).',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a07-l07-q6',
          prompt: t(
            'Berapa hal yang bisa ingatan kita pegang sekaligus?',
            "Berapa kapasitas memori jangka pendek manusia dalam Miller's Law?",
          ),
          difficulty: 1,
          choices: [
            { id: 'seven', label: t('Sekitar 7 hal', 'Sekitar 7 (±2) potong informasi') },
            {
              id: 'fifty',
              label: t('Sekitar 50 hal', 'Sekitar 50 potong tanpa pengelompokan'),
              explainWrong: t(
                'Kita tidak bisa mengingat 50 hal sekaligus. Ingatan punya batas.',
                '50 potong sekaligus jauh melampaui kapasitas memori kerja.',
              ),
            },
            {
              id: 'zero',
              label: t('Hanya 2 hal', 'Hanya 2 atau 3 potong'),
              explainWrong: t(
                'Kita bisa mengingat lebih dari 2 hal. Sekitar 7 hal.',
                'Manusia mampu mengingat sekitar 5 sampai 9 potong sekaligus.',
              ),
            },
          ],
          answer: 'seven',
          explainCorrect: t(
            'Ingatan kita menampung sekitar 7 hal. Karena itu info panjang perlu dipecah.',
            'Kapasitas 7 (±2) membuat pengelompokan (chunking) penting dalam desain UI.',
          ),
          hints: [t('Ingat nomor HP yang dipecah jadi kelompok.')],
          tags: ['miller-law'],
        }),
      ),
      conceptStep({
        title: t('Yang beda dan yang di ujung'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'von-restorff-baju-merah' },
        alt: t('Satu tombol merah menonjol. Menu awal dan akhir mudah diingat.'),
        modes: ['junior'],
        body: [
          rText('Satu benda yang beda sendiri paling diingat. Seperti baju merah di antara baju putih. Awal dan akhir daftar juga mudah diingat.'),
        ],
      }),
      conceptStep({
        title: t('Von Restorff Effect'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'von-restorff-baju-merah' },
        alt: t('Satu tombol merah menonjol di antara tiga kartu netral berlabel Paling Laris.'),
        modes: ['pro'],
        body: [
          rText(
            'Von Restorff Effect adalah kecenderungan mengingat elemen yang tampil berbeda dari sekumpulan elemen serupa. Beri warna mencolok pada satu tombol aksi utama atau satu label "Paling Laris".',
          ),
        ],
      }),
      conceptStep({
        title: t('Serial Position Effect'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'serial-position-awal-akhir' },
        alt: t('Menu Beranda di ujung kiri dan Profil di ujung kanan paling mudah diingat.'),
        modes: ['pro'],
        body: [
          rText(
            'Serial Position Effect adalah kecenderungan mengingat item pertama dan terakhir dalam deretan. Letakkan menu kunci seperti Beranda di ujung kiri dan Profil di ujung kanan.',
          ),
        ],
      }),
      simStep(
        'fitts-target',
        t(
          'Lihat tombol yang warnanya beda sendiri di bawah layar.',
          'Amati bagaimana satu tombol berwarna berbeda menonjol dibanding tombol lain.',
        ),
      ),
      limitStep({
        analogy: t('Nomor telepon yang dipecah dan baju merah'),
        same: [
          t(
            'Info yang dikelompokkan meringankan ingatan, dan satu pembeda kuat menarik perhatian.',
          ),
        ],
        different: [
          t(
            'Info penting tetap ditampilkan, bukan disuruh hafal.',
            'Info dari halaman sebelumnya tetap harus terlihat di layar, bukan dihafal orang.',
          ),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeMcq({
          id: 'a07-l07-q1',
          type: 'analogy',
          prompt: t(
            'Satu anak berjaket merah di antara anak berseragam putih. Siapa yang paling diingat?',
            'Satu orang berjaket merah di tengah rombongan berseragam putih langsung tertangkap mata. Efek apa itu?',
          ),
          choices: [
            { id: 'vr', label: t('Anak berjaket merah', 'Von Restorff Effect') },
            {
              id: 'sp',
              label: t('Anak yang paling tinggi', 'Serial Position Effect'),
              explainWrong: t(
                'Tinggi badan tidak membuatnya menonjol. Warna yang berbeda yang menarik mata.',
                'Serial Position membahas posisi paling awal dan paling akhir dalam sebuah urutan.',
              ),
            },
            {
              id: 'mil',
              label: t('Anak yang berdiri di tengah', "Miller's Law"),
              explainWrong: t(
                'Anak di tengah tidak terlihat istimewa. Yang berbeda sendiri paling diingat.',
                "Miller's Law membahas batas memori 7±2 potong dan pengelompokan (chunking).",
              ),
            },
          ],
          answer: 'vr',
          explainCorrect: t(
            'Yang berbeda sendiri paling menarik mata. Itu sebabnya satu tombol utama diberi warna mencolok.',
            'Elemen yang tampil beda sendiri dari kelompoknya langsung mencuri perhatian.',
          ),
          hints: [t('Siapa yang terlihat berbeda sendiri?', 'Cari efek tentang elemen yang paling berbeda.')],
          tags: ['miller-law'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a07-l07-q2',
          prompt: t(
            'Semua 10 tombol diberi warna merah menyala. Semua tombol jadi paling diingat.',
            'Memberi warna merah menyala dan tanda "HOT!" pada semua 10 tombol membuat semuanya lebih diingat.',
          ),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru: kalau semua menonjol, tidak ada yang menonjol.',
            'Pernyataan itu keliru: kalau semua ditonjolkan, tidak ada yang menonjol.',
          ),
          explainWrong: t(
            'Hanya satu tombol utama yang sebaiknya berbeda.',
            'Von Restorff Effect bekerja hanya kalau satu aksi utama tampil berbeda.',
          ),
          hints: [t('Bayangkan semua baju di rombongan berwarna merah.')],
          tags: ['miller-law', 'hierarki'],
        }),
      ),
      qStep({
        id: 'a07-l07-q3',
        type: 'match',
        prompt: t(
          'Pasangkan contoh desain dengan cara ingatan bekerja.',
          'Pasangkan contoh desain dengan hukum ingatan yang mendasarinya.',
        ),
        difficulty: 2,
        left: [
          { id: 'm1', label: t('Nomor kartu dipisah per 4 angka', 'Nomor kartu dipisah per 4 angka (4111 2222 3333 4444)') },
          { id: 'm2', label: t('Beranda di ujung kiri, Profil di ujung kanan', 'Menu "Beranda" di ujung kiri dan "Profil" di ujung kanan') },
          { id: 'm3', label: t('Satu paket diberi bingkai "Paling Laris"', 'Satu paket harga diberi bingkai sorot "Paling Laris"') },
        ],
        right: [
          { id: 'rm1', label: t('Pecah info jadi kelompok kecil', "Miller's Law (chunking)") },
          { id: 'rm2', label: t('Awal dan akhir paling diingat', 'Serial Position Effect') },
          { id: 'rm3', label: t('Yang beda sendiri paling diingat', 'Von Restorff Effect') },
        ],
        answer: { m1: 'rm1', m2: 'rm2', m3: 'rm3' },
        explainCorrect: t(
          'Tiga cara ini meringankan ingatan. Halaman jadi mudah dicerna.',
          'Ketiga hukum memori ini membuat tampilan ringan dicerna otak.',
        ),
        hints: [t('Cari mana yang tentang awal, akhir, atau beda.', 'Cocokkan tiap contoh dengan satu efek memori.'), undefined],
        tags: ['miller-law'],
      }),
      qStep(
        makeMcq({
          id: 'a07-l07-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Mengelompokkan nomor telepon agar mudah dihafal'),
          prompt: t('Apa yang sebaiknya TIDAK diminta dari orang saat proses bayar?'),
          difficulty: 2,
          choices: [
            { id: 'mem', label: t('Menghafal kode barang dari halaman 1') },
            {
              id: 'chk',
              label: t('Mengisi kolom yang dikelompokkan menjadi Data Diri dan Alamat'),
              explainWrong: t('Kolom yang dikelompokkan adalah chunking yang baik.'),
            },
            {
              id: 'show',
              label: t('Melihat ringkasan barang di layar pembayaran'),
              explainWrong: t('Ringkasan yang terlihat justru meringankan ingatan.'),
            },
          ],
          answer: 'mem',
          explainCorrect: t('Desain yang baik membuat orang mengenali info di layar, bukan menghafalnya.'),
          hints: [t('Cari tugas yang membebani ingatan.')],
          tags: ['miller-law', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l07-q5',
          type: 'scenario',
          story: t(
            'Aplikasi sekolah punya 5 tombol bawah: Beranda, Jadwal, Tugas, Nilai, Profil.',
            'Bilah navigasi bawah aplikasi sekolah berisi 5 tombol: Beranda, Jadwal, Tugas, Nilai, Profil.',
          ),
          prompt: t(
            'Tombol mana saja yang paling mudah diingat letaknya?',
            'Pasangan tombol mana yang paling mudah diingat letaknya dalam Serial Position Effect?',
          ),
          difficulty: 2,
          choices: [
            { id: 'ends', label: t('Beranda dan Profil', 'Beranda (pertama) dan Profil (terakhir)') },
            {
              id: 'mid',
              label: t('Tugas di tengah', 'Hanya Tugas, di tengah'),
              explainWrong: t(
                'Bagian tengah deretan justru paling mudah terlupa.',
                'Item di tengah justru paling mudah terlupa kecuali diberi pembeda visual.',
              ),
            },
            {
              id: 'none',
              label: t('Semua sama sulit diingat', 'Tidak ada, semua perlu dihafal seminggu'),
              explainWrong: t(
                'Ujung kiri dan kanan lebih mudah diingat daripada tengah.',
                'Posisi ujung kiri dan kanan secara alami lebih cepat diingat.',
              ),
            },
          ],
          answer: 'ends',
          explainCorrect: t(
            'Awal dan akhir daftar paling mudah diingat. Tombol di tengah mudah terlupa.',
            'Posisi pertama dan terakhir paling melekat dalam Serial Position Effect.',
          ),
          hints: [t('Mana yang pertama dan mana yang terakhir?', 'Ingat bagian deretan yang paling melekat.')],
          tags: ['miller-law'],
        }),
      ),
      qStep({
        id: 'a07-l07-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Isi bagian kosong dengan istilah teknik memecah deretan panjang seperti 081234567890.'),
        difficulty: 2,
        template: 'Teknik memenggal informasi menjadi beberapa kelompok kecil agar mudah diingat disebut ___.',
        bank: ['chunking', 'hovering', 'debugging'],
        answer: ['chunking'],
        explainCorrect: t("Chunking memecah deretan panjang menjadi potongan pendek. Itulah inti Miller's Law."),
        hints: [t('Cari istilah yang berarti memecah menjadi potongan.'), undefined],
        tags: ['miller-law'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-l07-r1',
        prompt: t(
          'Tiga paket harga. Mana yang sebaiknya diberi warna mencolok?',
          'Mana contoh Von Restorff Effect yang tepat di layar harga?',
        ),
        choices: [
          { id: 'one', label: t('Satu paket "Paling Laris"', 'Menonjolkan satu paket "Paling Laris" di antara tiga paket') },
          {
            id: 'all',
            label: t('Ketiganya dengan warna neon', 'Menyorot ketiga paket dengan warna neon berkedip'),
            explainWrong: t(
              'Kalau semua menonjol, tidak ada yang berbeda.',
              'Kalau semua ditonjolkan, efek pembeda hilang.',
            ),
          },
          {
            id: 'none',
            label: t('Tidak ada, semua dibuat polos', 'Tidak menonjolkan paket mana pun'),
            explainWrong: t(
              'Tanpa pembeda, mata tidak punya titik fokus.',
              'Tanpa pembeda, mata tidak punya titik fokus untuk keputusan.',
            ),
          },
        ],
        answer: 'one',
        explainCorrect: t(
          'Satu pembeda menarik mata dan membantu memilih.',
          'Satu pembeda yang tegas menarik fokus dan membantu keputusan.',
        ),
        hints: [t('Ingat baju merah di antara baju putih.')],
        tags: ['miller-law'],
      }),
      makeTf({
        id: 'a07-l07-r2',
        prompt: t(
          'Orang paling ingat awal dan akhir sebuah daftar.',
          'Orang biasanya paling ingat bagian awal dan akhir sebuah deretan menu (Serial Position Effect).',
        ),
        answer: true,
        explainCorrect: t(
          'Awal dan akhir paling melekat. Karena itu Beranda dan Profil sering ditaruh di ujung.',
          'Karena itu Beranda dan Profil atau aksi utama sering diletakkan di ujung.',
        ),
        explainWrong: t(
          'Awal dan akhir daftar paling mudah diingat. Bagian tengah mudah terlupa.',
          'Awal dan akhir urutan memang lebih mudah terekam daripada bagian tengah.',
        ),
        hints: [t('Coba ingat daftar belanja: bagian mana yang paling melekat?')],
        tags: ['miller-law'],
      }),
    ],
    recap: t(
      'Pecah info panjang, dan beri satu hal pembeda yang menonjol.',
      "Pecah informasi menjadi kelompok kecil (Miller), tonjolkan satu aksi (Von Restorff), taruh menu kunci di ujung (Serial Position).",
    ),
    companion: {
      talkPrompts: ['Mengapa nomor HP lebih mudah dibaca kalau dipecah?'],
      offlineActivity: 'Bacakan 8 benda belanjaan berurutan, lalu cek bersama benda mana yang paling mudah teringat.',
    },
  }),

  makeLesson({
    id: 'a07-l08',
    worldId: 'a07',
    title: 'Hukum perasaan: Peak-End, Zeigarnik, Aesthetic-Usability',
    modes: ['pro'],
    objective: t('Kamu bisa menerapkan Peak-End Rule, Zeigarnik Effect, dan Aesthetic-Usability Effect pada alur UI.'),
    estMinutes: 5,
    introducesTerms: ['peak-end'],
    usesTerms: ['ui', 'ux', 'hierarki', 'usability-testing'],
    warmupFrom: 'a07-l07',
    atWork: 'Kamu akan memoles halaman "Pesanan berhasil" dan pesan error setelah ulasan menunjukkan akhir checkout terasa dingin.',
    steps: [
      storyStep('a07/stempel-kopi.svg', [
        rText(
          'Kartu stempel kopi "beli 10 gratis 1" membuatmu makin rajin saat cap tinggal dua lagi. Liburan biasa pun terasa berkesan kalau punya satu momen puncak dan penutup yang manis.',
        ),
      ]),
      conceptStep({
        title: t('Peak-End Rule'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'peak-end-rule' },
        alt: t('Grafik pengalaman: momen puncak dan momen akhir yang menentukan ingatan.'),
        body: [
          rTerm('peak-end', 'Peak-End Rule'),
          rText(
            ' adalah kecenderungan menilai pengalaman dari momen paling berkesan (puncak) dan momen terakhir, bukan dari rata-ratanya. Buat layar "Pesanan berhasil" yang hangat dan haluskan pesan error.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a07-l08-q5',
          type: 'scenario',
          story: t(
            'Checkout toko online Nadia lancar. Setelah transaksi, hanya muncul "OK_200_DONE" di halaman putih, dan kalau kartu gagal yang muncul "FATAL ERR #99".',
          ),
          prompt: t('Hukum UX mana yang paling menjelaskan kesan dari penutup seperti ini?'),
          difficulty: 2,
          choices: [
            { id: 'pe', label: t('Peak-End Rule: kesan akhir buruk') },
            {
              id: 'ser',
              label: t('Serial Position pada urutan menu atas'),
              explainWrong: t('Kasus ini terjadi di akhir transaksi dan penanganan pesan error, bukan urutan menu.'),
            },
            {
              id: 'fit',
              label: t("Fitts's Law pada tombol jempol"),
              explainWrong: t('Tombol tidak dibahas di skenario ini. Yang bermasalah adalah pesan penutup dan error.'),
            },
          ],
          answer: 'pe',
          explainCorrect: t('Halaman konfirmasi dan pesan error yang dipoles meningkatkan kesan keseluruhan.'),
          hints: [t('Cari hukum yang membahas momen terakhir pengalaman.')],
          tags: ['peak-end', 'ux'],
        }),
      ),
      conceptStep({
        title: t('Zeigarnik dan Goal-Gradient'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'zeigarnik-goal-gradient' },
        alt: t('Progress bar profil 75% lengkap memotivasi orang menyelesaikan sisa 25%.'),
        body: [
          rBold('Zeigarnik Effect'),
          rText(' adalah kecenderungan terus mengingat tugas yang belum selesai. '),
          rBold('Goal-Gradient Effect'),
          rText(
            ' adalah dorongan yang makin kuat saat garis akhir mendekat. Pakai progress bar (bilah kemajuan), "Langkah 2 dari 3", dan checklist awal.',
          ),
        ],
      }),
      conceptStep({
        title: t('Aesthetic-Usability Effect'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'aesthetic-usability' },
        alt: t('Makanan ditata cantik terasa lebih nikmat, seperti kesan pertama sebuah tampilan.'),
        body: [
          rBold('Aesthetic-Usability Effect'),
          rText(
            ' adalah kecenderungan menganggap tampilan yang rapi lebih mudah dipakai, dan lebih memaafkan gangguan kecil. Tetap lakukan ',
          ),
          rTerm('usability-testing', 'usability testing'),
          rText(', karena keindahan tidak menutupi cacat alur yang sungguhan.'),
        ],
      }),
      simStep(
        'fitts-target',
        t('Amati bagaimana tampilan rapi dan tombol akhir yang tegas membuat penutup terasa meyakinkan.'),
      ),
      limitStep({
        analogy: t('Kartu stempel kopi dan makanan ditata cantik'),
        same: [t('Progres yang hampir penuh mendorong penyelesaian, dan kemasan rapi menaikkan kesan awal.')],
        different: [
          t('Visual indah hanya memaafkan kekurangan kecil, bukan tombol utama yang rusak atau alur yang gagal.'),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeMcq({
          id: 'a07-l08-q1',
          type: 'analogy',
          prompt: t('Layar "Profilmu 80% lengkap, tambahkan foto supaya selesai" memakai efek psikologi apa?'),
          choices: [
            { id: 'zg', label: t('Zeigarnik dan Goal-Gradient Effect') },
            {
              id: 'pe',
              label: t('Peak-End Rule pada momen akhir'),
              explainWrong: t('Peak-End Rule membahas momen puncak dan akhir, bukan dorongan menyelesaikan progres.'),
            },
            {
              id: 'au',
              label: t('Aesthetic-Usability Effect pada tampilan'),
              explainWrong: t('Aesthetic-Usability membahas pengaruh keindahan terhadap kesan kemudahan.'),
            },
          ],
          answer: 'zg',
          explainCorrect: t('Tugas yang hampir selesai terus teringat (Zeigarnik) dan makin menyemangati saat mendekati akhir (Goal-Gradient).'),
          hints: [t('Cari efek tentang tugas yang hampir selesai.')],
          tags: ['peak-end', 'ux'],
        }),
      ),
      qStep({
        id: 'a07-l08-q2',
        type: 'match',
        prompt: t('Pasangkan ketiga hukum perasaan UX dengan contoh penerapannya.'),
        difficulty: 2,
        left: [
          { id: 'pe', label: t('Peak-End Rule') },
          { id: 'zg', label: t('Zeigarnik dan Goal-Gradient') },
          { id: 'au', label: t('Aesthetic-Usability') },
        ],
        right: [
          { id: 'rpe', label: t('Halaman "Pesanan berhasil!" yang ramah dan pesan error yang halus') },
          { id: 'rzg', label: t('Penanda "Langkah 2 dari 3" dan progress bar penyelesaian') },
          { id: 'rau', label: t('Visual dan tipografi dirapikan agar kesan pertama terasa mudah') },
        ],
        answer: { pe: 'rpe', zg: 'rzg', au: 'rau' },
        explainCorrect: t('Ketiganya membentuk emosi positif sepanjang pemakaian dan di akhirnya.'),
        hints: [t('Cocokkan tiap contoh dengan momen akhir, progres, atau kesan pertama.'), undefined],
        tags: ['peak-end'],
      }),
      qStep(
        makeTf({
          id: 'a07-l08-q3',
          prompt: t('Kalau tampilan UI sudah sangat cantik, kita tidak perlu menguji alurnya kepada orang sungguhan.'),
          answer: false,
          explainCorrect: t('Pernyataan itu keliru: keindahan tidak menyelamatkan alur yang membingungkan atau tombol yang gagal.'),
          explainWrong: t('Aesthetic-Usability Effect bukan alasan melewati usability testing.'),
          hints: [t('Ingat batas efek keindahan pada alur yang rusak.')],
          tags: ['peak-end', 'usability-testing'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l08-q4',
          type: 'limit',
          analogy: t('Makanan yang ditata cantik terasa lebih enak'),
          prompt: t('Apa batas Aesthetic-Usability Effect pada produk perangkat lunak?'),
          difficulty: 2,
          choices: [
            { id: 'fix', label: t('Hanya kekurangan kecil yang dimaafkan') },
            {
              id: 'first',
              label: t('Kesan visual pertama memengaruhi rasa percaya'),
              explainWrong: t('Itu bagian yang benar dari efek ini, bukan batasnya.'),
            },
            {
              id: 'care',
              label: t('Kerapian tampilan menunjukkan perhatian pembuatnya'),
              explainWrong: t('Itu juga efek positif, bukan batasnya.'),
            },
          ],
          answer: 'fix',
          explainCorrect: t('Visual indah dan alur yang berfungsi harus berjalan bersama.'),
          hints: [t('Cari hal yang tidak bisa diselamatkan oleh tampilan indah.')],
          tags: ['peak-end'],
        }),
      ),
      qStep({
        id: 'a07-l08-q6',
        type: 'fill',
        prompt: t('Isi bagian kosong dengan efek yang tepat.'),
        difficulty: 2,
        template: 'Orang cenderung lebih bersemangat saat melihat penanda "Langkah 3 dari 4" berkat ___ Effect.',
        bank: ['Goal-Gradient', 'Serial', 'Viewport'],
        answer: ['Goal-Gradient'],
        explainCorrect: t('Makin dekat dengan garis akhir, makin kuat dorongan menyelesaikannya.'),
        hints: [t('Cari efek tentang dorongan mendekati garis akhir.'), undefined],
        tags: ['peak-end', 'ux'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-l08-r1',
        prompt: t('Dalam Peak-End Rule, dua momen mana yang paling menentukan kesan seluruh pengalaman?'),
        choices: [
          { id: 'pe', label: t('Momen paling berkesan dan momen terakhir') },
          {
            id: 'mid',
            label: t('Rata-rata detik demi detik di bagian tengah'),
            explainWrong: t('Orang menilai pengalaman dari puncak dan akhirnya. Mereka tidak menghitung rata-rata.'),
          },
        ],
        answer: 'pe',
        explainCorrect: t('Puncak dan akhir adalah dua momen yang paling diingat orang.'),
        tags: ['peak-end'],
      }),
      makeTf({
        id: 'a07-l08-r2',
        prompt: t('Zeigarnik Effect menjelaskan mengapa checklist awal atau progres 75% mendorong orang kembali menyelesaikan tugas.'),
        answer: true,
        explainCorrect: t('Tugas yang terbuka terus menempel di benak sampai selesai.'),
        explainWrong: t('Tugas yang terbuka dan belum selesai terus menempel di benak sampai tuntas.'),
        tags: ['peak-end'],
      }),
    ],
    recap: t('Poles puncak dan akhir pengalaman (Peak-End), dorong penyelesaian lewat progres (Zeigarnik), dan padukan visual indah dengan uji pemakaian.'),
  }),

  makeLesson({
    id: 'a07-sq1',
    worldId: 'a07',
    title: 'Hukum sistem: Tesler, Pareto, Postel, Parkinson',
    modes: ['pro'],
    isSideQuest: true,
    objective: t('Kamu bisa memakai empat hukum perancangan sistem: Tesler, Pareto, Postel, dan Parkinson.'),
    estMinutes: 5,
    introducesTerms: [],
    usesTerms: ['ux', 'ui', 'fitts-law'],
    atWork: 'Kamu akan menambahkan isi otomatis kota dari kode pos saat form alamat sering ditinggalkan di tengah jalan.',
    steps: [
      storyStep('a07/mobil-matik-kasir.svg', [
        rText(
          'Mobil matik tetap berganti gigi, tetapi mesin yang mengerjakannya. Kasir yang baik menerima pecahan uang apa saja dan selalu memberi kembalian dengan rapi.',
        ),
      ]),
      conceptStep({
        title: t("Tesler's Law dan Pareto Principle"),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'tesler-dan-pareto' },
        alt: t('Sistem mengisi otomatis kota dari kode pos (Tesler) dan fokus ke 20% fitur utama (Pareto).'),
        body: [
          rBold("Tesler's Law"),
          rText(
            ' menyatakan bahwa kerumitan tidak bisa dihilangkan, hanya dipindahkan ke sistem. Contohnya mengisi kota otomatis dari kode pos. ',
          ),
          rBold('Pareto Principle'),
          rText(': sekitar 80% pemakaian berasal dari 20% fitur. Buat fitur inti itu paling mudah dijangkau.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a07-sq1-q2',
          type: 'analogy',
          prompt: t('Mobil matik mengambil alih tugas mengoper gigi dari pengemudi. Hukum apa yang digambarkannya?'),
          choices: [
            { id: 'tes', label: t("Tesler's Law: sistem menanggung kerumitan") },
            {
              id: 'par',
              label: t('Pareto Principle: fokus pada 20% fitur utama'),
              explainWrong: t('Pareto membahas fitur yang paling sering dipakai. Mobil matik soal pemindahan beban.'),
            },
            {
              id: 'pos',
              label: t("Postel's Law: menerima masukan secara longgar"),
              explainWrong: t('Postel membahas kelonggaran menerima masukan. Mobil matik soal pemindahan kerumitan.'),
            },
          ],
          answer: 'tes',
          explainCorrect: t('Kerumitan tidak hilang, tetapi lebih baik ditanggung sistem daripada orang yang memakainya.'),
          hints: [t('Siapa yang sekarang mengerjakan tugas yang rumit?')],
          tags: ['ux'],
        }),
      ),
      conceptStep({
        title: t("Postel's Law"),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'postel-law-input' },
        alt: t('Nomor HP dengan atau tanpa spasi dan tanda hubung semuanya diterima lalu dirapikan sistem.'),
        code: {
          lang: 'text',
          code: '08123456789  |  +62 812-3456-789  |  0812 3456 789  → Semua diterima ✓',
        },
        body: [
          rBold("Postel's Law"),
          rText(
            ' menyarankan longgar saat menerima masukan dan teliti saat memberi keluaran. Terima nomor HP dengan spasi atau tanda hubung, lalu rapikan sendiri di sistem.',
          ),
        ],
      }),
      conceptStep({
        title: t("Parkinson's Law"),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'parkinson-law-kecepatan' },
        alt: t('Mempersingkat alur lewat isi otomatis dan tombol Beli Lagi.'),
        body: [
          rBold("Parkinson's Law"),
          rText(
            ': pekerjaan cenderung mengembang memenuhi waktu yang tersedia. Persingkat alur dengan isi otomatis alamat, tombol "Beli Lagi", dan proses bayar (checkout) sekali ketuk.',
          ),
        ],
      }),
      simStep(
        'hick-menu',
        t('Amati bagaimana menonjolkan 20% fitur yang paling sering dipakai membuat layar tetap ringan dan cepat diputuskan.'),
      ),
      limitStep({
        analogy: t('Mobil matik dan kasir toko'),
        same: [t('Sistem menanggung beban teknis dan menerima variasi wajar dari orang yang memakainya.')],
        different: [
          t('Longgar tidak berarti menerima data berbahaya atau tidak valid; masukan tetap dibersihkan, divalidasi, dan disimpan dalam format ketat.'),
        ],
        riskyAnalogy: false,
      }),
      qStep({
        id: 'a07-sq1-q1',
        type: 'match',
        prompt: t('Pasangkan keempat hukum sistem UX dengan contoh penerapannya.'),
        difficulty: 2,
        left: [
          { id: 't', label: t("Tesler's Law") },
          { id: 'pa', label: t('Pareto Principle (80/20)') },
          { id: 'po', label: t("Postel's Law") },
          { id: 'pk', label: t("Parkinson's Law") },
        ],
        right: [
          { id: 'rt', label: t('Mendeteksi jenis kartu bank dari 4 digit awal nomor') },
          { id: 'rpa', label: t('Menaruh 3 fitur yang paling sering dipakai di baris teratas') },
          { id: 'rpo', label: t('Menerima nomor HP dengan spasi, +62, atau tanda hubung, lalu merapikannya') },
          { id: 'rpk', label: t('Menyediakan tombol "Beli Lagi" agar checkout selesai dalam hitungan detik') },
        ],
        answer: { t: 'rt', pa: 'rpa', po: 'rpo', pk: 'rpk' },
        explainCorrect: t('Keempat hukum ini membuat sistem terasa pintar dan menghemat tenaga orang yang memakainya.'),
        hints: [t('Cocokkan tiap contoh dengan satu hukum: beban, fitur inti, kelonggaran, atau waktu.'), undefined],
        tags: ['ux'],
      }),
      qStep(
        makeMcq({
          id: 'a07-sq1-q3',
          type: 'limit',
          analogy: t("Kasir toko untuk Postel's Law"),
          prompt: t("Kesalahan apa yang harus dihindari saat menerapkan Postel's Law pada kolom input form?"),
          difficulty: 2,
          choices: [
            { id: 'val', label: t('Membiarkan teks berbahaya masuk tanpa divalidasi') },
            {
              id: 'space',
              label: t('Mengizinkan spasi atau tanda strip pada nomor telepon'),
              explainWrong: t('Mengizinkan spasi lalu menghapusnya di sistem adalah contoh Postel yang baik.'),
            },
            {
              id: 'trim',
              label: t('Menghapus spasi berlebih di awal dan akhir ketikan'),
              explainWrong: t('Memangkas spasi berlebih mencegah error yang tidak perlu.'),
            },
          ],
          answer: 'val',
          explainCorrect: t('Terima format yang wajar, seperti spasi atau tanda strip. Tetap periksa isinya agar aman dan rapi.'),
          hints: [t('Cari hal yang bukan sekadar variasi format.')],
          tags: ['ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-sq1-q4',
          type: 'scenario',
          story: t(
            'Aplikasi catatan belanja Pak Udin punya 25 fitur di layar utama. Data menunjukkan 80% orang hanya membuka "Buat Catatan" dan "Centang Selesai".',
          ),
          prompt: t('Tindakan mana yang paling tepat dalam Pareto Principle?'),
          difficulty: 2,
          choices: [
            { id: 'focus', label: t('Tonjolkan dua fitur inti, pindahkan sisanya ke menu kedua') },
            {
              id: 'equal',
              label: t('Beri ke-25 fitur ukuran tombol yang sama'),
              explainWrong: t('Itu menyamakan fitur langka dengan fitur inti.'),
            },
            {
              id: 'ban',
              label: t('Wajibkan memakai ke-25 fitur sebelum mencatat'),
              explainWrong: t('Memaksa orang memakai semua fitur menambah hambatan.'),
            },
          ],
          answer: 'focus',
          explainCorrect: t('Mengoptimalkan 20% fitur inti memberi dampak terbesar bagi kebanyakan orang.'),
          hints: [t('Fokus pada fitur yang paling sering dipakai.')],
          tags: ['ux'],
        }),
      ),
      qStep({
        id: 'a07-sq1-q5',
        type: 'fill',
        prompt: t('Isi bagian kosong dengan kata yang tepat.'),
        difficulty: 2,
        template: '___ dalam menerima masukan, telitilah dalam memberi keluaran.',
        bank: ['Longgarlah', 'Kaku', 'Tolaklah'],
        answer: ['Longgarlah'],
        explainCorrect: t('Jangan menghukum orang karena mengetik spasi atau format berbeda yang bisa dirapikan sistem.'),
        hints: [t('Cari kata yang berlawanan dengan "telitilah".'), undefined],
        tags: ['ux'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-sq1-r1',
        prompt: t('Mengisi nama kota dan kecamatan otomatis begitu orang mengetik kode pos memakai hukum apa?'),
        choices: [
          { id: 'tes', label: t("Tesler's Law") },
          {
            id: 'par',
            label: t('Pareto Principle'),
            explainWrong: t('Pareto berfokus pada 20% fitur yang menghasilkan 80% pemakaian.'),
          },
        ],
        answer: 'tes',
        explainCorrect: t('Sistem menanggung kerumitan mencari kota, jadi orang tidak perlu mengetik manual.'),
        tags: ['ux'],
      }),
      makeTf({
        id: 'a07-sq1-r2',
        prompt: t('Pareto Principle menyarankan kita mencari 20% fitur terpenting yang paling sering dipakai, lalu membuatnya paling mulus.'),
        answer: true,
        explainCorrect: t('Kebanyakan kebutuhan orang bertumpu pada 20% fitur utama.'),
        explainWrong: t('Sekitar 80% kebutuhan orang bertumpu pada 20% fitur utama.'),
        tags: ['ux'],
      }),
    ],
    recap: t('Pindahkan kerumitan ke sistem (Tesler), prioritaskan 20% fitur inti (Pareto), terima format longgar (Postel), dan persingkat alur (Parkinson).'),
  }),

  makeLesson({
    id: 'a07-sq2',
    worldId: 'a07',
    title: '10 Heuristik Nielsen: bedah aplikasi ini',
    modes: ['pro'],
    isSideQuest: true,
    external: true,
    externalLinks: [
      { label: 'Panduan Aksesibilitas & UX web.dev', url: 'https://web.dev/explore/accessible' },
      { label: 'Referensi Belajar Web MDN', url: 'https://developer.mozilla.org/en-US/docs/Learn' },
    ],
    objective: t('Kamu bisa memeriksa kualitas tampilan sebuah aplikasi dengan daftar periksa 10 Heuristik Nielsen.'),
    estMinutes: 6,
    introducesTerms: [],
    usesTerms: ['ux', 'ui', 'usability-testing', 'hick-law', 'fitts-law'],
    atWork: 'Kamu akan memeriksa fitur baru dengan 10 heuristik sebelum tim mengundang orang untuk usability testing.',
    steps: [
      storyStep('a07/inspektur-galeri.svg', [
        rText(
          'Sebelum pameran dibuka, inspektur berkeliling membawa daftar periksa 10 poin. Ia memastikan tidak ada pintu darurat terkunci atau papan petunjuk yang membingungkan.',
        ),
      ]),
      conceptStep({
        title: t('Heuristik 1–4: Jelas, Akrab, Kendali, Konsisten'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'heuristik-nielsen-1-4' },
        alt: t('Empat heuristik pertama: status terlihat, bahasa sehari-hari, tombol batal, dan konsistensi.'),
        body: [
          rText('Empat heuristik pertama menjaga kejelasan dan kendali. '),
          rBold('Status sistem terlihat'),
          rText(' (loading, tersimpan) dan '),
          rBold('bahasa sehari-hari'),
          rText(' ("Keranjang", bukan "Array item"). '),
          rBold('Kendali dan kebebasan'),
          rText(' berarti ada Batal atau Urungkan. '),
          rBold('Konsistensi'),
          rText(' menjaga pola antarhalaman.'),
        ],
      }),
      simStep(
        'fitts-target',
        t('Bedah tombol dan alur aplikasi ini dengan heuristik 1–4: status klik, bahasa, jalan keluar, dan konsistensi.'),
      ),
      conceptStep({
        title: t('Heuristik 5–7: cegah salah, kenali, fleksibel'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'heuristik-nielsen-5-7' },
        alt: t('Konfirmasi hapus, pilihan terlihat tanpa menghafal, dan jalan pintas bagi orang mahir.'),
        body: [
          rText('Heuristik 5–7 mencegah salah dan meringankan ingatan. '),
          rBold('Cegah kesalahan'),
          rText(' dengan konfirmasi hapus dan tanggal lampau yang dimatikan. '),
          rBold('Mengenali, bukan mengingat'),
          rText(' berarti pilihan ditampilkan. '),
          rBold('Fleksibel dan cepat'),
          rText(' memberi jalan pintas bagi orang mahir tanpa menyulitkan pemula.'),
        ],
      }),
      conceptStep({
        title: t('Heuristik 8–10: Minimalis, Pulih Error, Bantuan'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'heuristik-nielsen-8-10' },
        alt: t('Desain minimalis, pesan error yang menunjukkan cara memperbaiki, dan menu bantuan mudah dicari.'),
        code: {
          lang: 'text',
          code: '✗ "Error 422: Invalid input."\n✓ "Kata sandi minimal 8 karakter. Tambahkan 3 karakter lagi."',
        },
        body: [
          rText('Heuristik 8–10 menjaga tampilan ringkas dan membantu saat error. '),
          rBold('Estetis dan minimalis'),
          rText(' hanya menampilkan yang perlu. '),
          rBold('Bantu pulih dari error'),
          rText(' dengan pesan sopan dan solusi. '),
          rBold('Bantuan dan dokumentasi'),
          rText(' mudah dicari.'),
        ],
      }),
      qStep({
        id: 'a07-sq2-q1',
        type: 'match',
        prompt: t('Pasangkan contoh tampilan aplikasi dengan heuristik Nielsen yang dipenuhinya.'),
        difficulty: 2,
        left: [
          { id: 'h2', label: t('Memakai kata "Keranjang", bukan "Array item"') },
          { id: 'h3', label: t('Menyediakan tombol "Batal" dan "Urungkan" setelah hapus') },
          { id: 'h5', label: t('Menonaktifkan tanggal kemarin pada pemesanan tiket baru') },
          { id: 'h9', label: t('Menulis "Tambahkan 3 huruf lagi", bukan "Error 422"') },
        ],
        right: [
          { id: 'rh2', label: t('Sesuai bahasa sehari-hari (#2)') },
          { id: 'rh3', label: t('Kendali dan kebebasan (#3)') },
          { id: 'rh5', label: t('Pencegahan kesalahan (#5)') },
          { id: 'rh9', label: t('Bantu pulih dari kesalahan (#9)') },
        ],
        answer: { h2: 'rh2', h3: 'rh3', h5: 'rh5', h9: 'rh9' },
        explainCorrect: t('Setiap contoh memenuhi satu heuristik: bahasa sehari-hari, kendali, pencegahan salah, atau pemulihan error.'),
        hints: [t('Cocokkan tiap contoh dengan satu heuristik dari tiga kartu tadi.'), undefined],
        tags: ['ux', 'ui'],
      }),
      limitStep({
        analogy: t('Daftar periksa inspektur keselamatan'),
        same: [t('Pedoman praktis untuk menemukan cacat kemudahan pakai dengan cepat dan terstruktur.')],
        different: [
          t('Heuristik adalah pemeriksaan ahli, bukan pengganti uji dengan orang sungguhan, jadi tetap lakukan usability testing.'),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeMcq({
          id: 'a07-sq2-q2',
          prompt: t('Pesan error mana yang memenuhi heuristik #9, bantu pulih dari kesalahan?'),
          choices: [
            { id: 'good', label: t('"Kata sandi minimal 8 karakter."') },
            {
              id: 'bad1',
              label: t('"Error 422: Invalid input."'),
              explainWrong: t('Kode teknis tidak menunjukkan letak salah atau cara memperbaikinya.'),
            },
            {
              id: 'bad2',
              label: t('"Kamu salah mengetik, coba tebak sendiri."'),
              explainWrong: t('Nada menyalahkan tanpa solusi melanggar heuristik #9.'),
            },
          ],
          answer: 'good',
          explainCorrect: t('Pesan yang baik menjelaskan masalahnya dengan bahasa manusia dan menunjukkan cara memperbaikinya.'),
          hints: [t('Cari pesan yang menunjukkan apa yang harus diubah.')],
          tags: ['ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-sq2-q3',
          type: 'limit',
          analogy: t('Daftar periksa inspektur untuk 10 Heuristik Nielsen'),
          prompt: t('Mengapa lulus 10 Heuristik Nielsen belum menjamin produk bebas masalah bagi orang baru?'),
          difficulty: 2,
          choices: [
            { id: 'ut', label: t('Heuristik tidak menggantikan uji langsung') },
            {
              id: 'num',
              label: t('Heuristik hanya berlaku untuk situs yang besar'),
              explainWrong: t('Heuristik berlaku untuk situs dan aplikasi dalam ukuran apa pun.'),
            },
            {
              id: 'html',
              label: t('Heuristik sudah usang untuk aplikasi HP'),
              explainWrong: t('Heuristik tetap berlaku di HP. Aturannya tentang kemudahan pakai, bukan perangkat.'),
            },
          ],
          answer: 'ut',
          explainCorrect: t('Heuristik menemukan cacat yang mudah terlihat dengan cepat, lalu usability testing memeriksa pengalaman orang sungguhan.'),
          hints: [t('Ingat batas pemeriksaan ahli dibanding mengamati orang sungguhan.')],
          tags: ['ux', 'usability-testing'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-sq2-q4',
          type: 'scenario',
          story: t(
            'Sebuah aplikasi kuis punya indikator langkah "3/8", tombol "Keluar" di pojok atas, dan arti singkat untuk setiap istilah sulit.',
          ),
          prompt: t('Heuristik mana yang dipenuhi ketiga fitur itu, berurutan?'),
          difficulty: 3,
          choices: [
            { id: 'all', label: t('Status (#1), kendali (#3), bantuan (#10)') },
            {
              id: 'none',
              label: t('Semuanya melanggar heuristik minimalis (#8)'),
              explainWrong: t('Indikator langkah, jalan keluar, dan bantuan istilah membantu tanpa membanjiri layar.'),
            },
            {
              id: 'tech',
              label: t('Semuanya hanya memenuhi konsistensi (#4)'),
              explainWrong: t('Ketiga fitur itu memenuhi heuristik yang berbeda-beda, bukan hanya konsistensi.'),
            },
          ],
          answer: 'all',
          explainCorrect: t('Indikator langkah menunjukkan status, tombol Keluar memberi kendali, dan arti istilah memberi bantuan.'),
          hints: [t('Cocokkan tiap fitur dengan satu heuristik: status, kendali, bantuan.')],
          tags: ['ux'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a07-sq2-q5',
          prompt: t('Heuristik #8 (estetis dan minimalis) berarti setiap elemen tambahan bersaing merebut perhatian dengan elemen penting.'),
          answer: true,
          explainCorrect: t('Tampilkan hanya elemen yang mendukung tugas di layar itu.'),
          explainWrong: t('Minimalis bukan berarti polos, tetapi bebas dari elemen yang tidak relevan.'),
          tags: ['ui', 'ux'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-sq2-r1',
        prompt: t('Mengganti tombol "Execute Array Purge" menjadi "Kosongkan Keranjang" memenuhi heuristik apa?'),
        choices: [
          { id: 'real', label: t('Bahasa sehari-hari (#2)') },
          {
            id: 'short',
            label: t('Fleksibel dan cepat (#7)'),
            explainWrong: t('Mengganti istilah teknis dengan kata sehari-hari adalah heuristik #2.'),
          },
        ],
        answer: 'real',
        explainCorrect: t('Sistem berbicara dengan bahasa orang yang memakainya, bukan istilah internal programmer.'),
        tags: ['ux'],
      }),
      makeTf({
        id: 'a07-sq2-r2',
        prompt: t('Meminta konfirmasi sebelum aksi menghapus permanen termasuk heuristik #5: pencegahan kesalahan.'),
        answer: true,
        explainCorrect: t('Konfirmasi mencegah kesalahan sebelum data terlanjur terhapus.'),
        explainWrong: t('Mencegah kesalahan jauh lebih baik daripada meminta maaf setelah data terhapus.'),
        tags: ['ux'],
      }),
    ],
    recap: t('Pakai 10 Heuristik Nielsen sebagai daftar periksa: tampilan rapi, aman dari salah ketuk, dan ramah saat error.'),
  }),
];
