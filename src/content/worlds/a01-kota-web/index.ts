import {
  conceptStep,
  limitStep,
  makeLesson,
  makeMcq,
  makeTf,
  qStep,
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

/** Istilah yang hanya tampil di Junior atau hanya di Pro, supaya kalimat tiap mode tetap utuh. */
const jTerm = (termId: string, text: string): Rich => ({ ...rTerm(termId, text, text), modes: ['junior'] });
const pTerm = (termId: string, text: string): Rich => ({ ...rTerm(termId, text, text), modes: ['pro'] });

/**
 * Soal jangkar = soal biasa ditambah pilihan "Belum tahu". Sama persis dengan `makeAnchorMcq`,
 * tetapi menerima `hints` supaya soal jangkar Junior juga punya petunjuk (copydeck §6.4).
 */
function anchorMcq(params: Parameters<typeof makeMcq>[0]) {
  return makeMcq({
    ...params,
    choices: [...params.choices, { id: 'unknown', label: t('Belum tahu') }],
  });
}

export const world: World = {
  id: 'a01',
  track: 'A',
  order: 1,
  title: 'Kota Web',
  tagline: t(
    'Kenalan dengan restoran web. Ikuti perjalanan pesanan dari meja ke dapur.',
    'Kamu bisa menjelaskan apa yang terjadi dari klik sampai halaman tampil di layar.',
  ),
  color: '#E4572E',
  illustration: 'a01-kota-web',
  sourceChapters: ['J1-01', 'J1-02'],
  requires: [],
  lessons: ['a01-l01', 'a01-l02', 'a01-l03', 'a01-l04', 'a01-l05', 'a01-l06'],
  sideQuests: [],
  boss: {
    title: 'Tantangan Penjaga Kota Web',
    greeting: t(
      'Halo! Ayo tunjukkan apa yang sudah kamu pelajari di restoran web.',
      'Tunjukkan kamu menguasai cara kerja web dan peran tiap bagiannya.',
    ),
    guardianName: 'Penjaga Kota Web',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      anchorMcq({
        id: 'a01-anc-j1',
        prompt: t('Kamu melihat-lihat toko online di HP. Bagian mana yang tampil di layar?'),
        choices: [
          { id: 'fe', label: t('Bagian depan, seperti ruang makan') },
          {
            id: 'be',
            label: t('Bagian belakang, seperti dapur'),
            explainWrong: t('Dapur web bekerja di belakang layar. Tamu restoran juga tidak melihat dapurnya.'),
          },
          {
            id: 'dns',
            label: t('Kabel internet, pengantar pesan'),
            explainWrong: t('Kabel hanya membawa pesan. Kabel tidak membentuk tampilan toko.'),
          },
        ],
        answer: 'fe',
        explainCorrect: t(
          'Bagian depan tampil di layarmu. Seperti ruang makan yang dilihat tamu.',
          'Frontend adalah bagian web yang tampil di layar pengunjung.',
        ),
        hints: [t('Mana yang bisa kamu lihat langsung?')],
        tags: ['frontend'],
      }),
      anchorMcq({
        id: 'a01-anc-j2',
        prompt: t('Tombol toko online itu cantik, tetapi susah diketuk. Apa yang bermasalah?'),
        choices: [
          { id: 'ux', label: t('UX, kemudahan memakai') },
          {
            id: 'ui',
            label: t('UI, tampilan toko'),
            explainWrong: t('UI menjelaskan warna dan bentuk tombol. Yang dikeluhkan adalah sulitnya mengetuk tombol.'),
          },
          {
            id: 'db',
            label: t('Dapur web, di belakang layar'),
            explainWrong: t('Dapur web ada di belakang layar. Ini soal kenyamanan di layar.'),
          },
        ],
        answer: 'ux',
        explainCorrect: t(
          'UX menilai mudah atau tidaknya tombol dipakai. Tombol cantik belum tentu enak diketuk.',
          'UX menilai kemudahan memakai tombol. Tombol yang cantik belum tentu mudah dipakai.',
        ),
        hints: [t('Pikirkan jarimu saat mengetuk tombol.')],
        tags: ['ux'],
      }),
      anchorMcq({
        id: 'a01-anc-j3',
        prompt: t('Rani bilang pesanannya ke pelayan. Ke mana pelayan membawanya?'),
        choices: [
          { id: 'dns', label: t('Ke dapur untuk disiapkan') },
          {
            id: 'css',
            label: t('Ke kasir untuk dihitung'),
            explainWrong: t('Kasir menghitung biaya makan. Pesanan Rani perlu disiapkan dulu.'),
          },
          {
            id: 'js',
            label: t('Ke gudang untuk disimpan'),
            explainWrong: t('Gudang menyimpan bahan. Makanan disiapkan di dapur.'),
          },
        ],
        answer: 'dns',
        explainCorrect: t('Pelayan membawa pesanan ke koki di dapur. Koki lalu menyiapkan makanannya.'),
        hints: [t('Di mana makanan mulai disiapkan?')],
        tags: ['request'],
      }),
      anchorMcq({
        id: 'a01-anc-j4',
        prompt: t('Koki sudah menyiapkan pesanan Rani. Apa tugas pelayan sekarang?'),
        choices: [
          { id: 'safe', label: t('Antar hidangan ke Rani') },
          {
            id: 'closed',
            label: t('Catat pesanan Rani lagi'),
            explainWrong: t('Pelayan sudah mencatat pesanan tadi. Sekarang Rani menunggu hidangannya.'),
          },
          {
            id: 'free',
            label: t('Siapkan hidangan untuk Rani'),
            explainWrong: t('Koki sudah menyiapkan hidangan. Pelayan membawa hasilnya kembali ke meja.'),
          },
        ],
        answer: 'safe',
        explainCorrect: t('Pelayan membawa hidangan dari dapur ke meja Rani. Pesanan Rani sudah siap.'),
        hints: [t('Siapa yang sedang menunggu di meja?')],
        tags: ['response'],
      }),
      anchorMcq({
        id: 'a01-anc-j5',
        prompt: t('Halaman web dibuat dari tiga bahan. Mana yang menjadi kerangkanya?'),
        choices: [
          { id: 'html', label: t('HTML') },
          {
            id: 'css',
            label: t('CSS'),
            explainWrong: t('CSS mendandani halaman dengan warna dan jarak. Seperti cat rumah.'),
          },
          {
            id: 'js',
            label: t('Penggerak halaman'),
            explainWrong: t('Penggerak halaman menanggapi ketukan. Seperti bel yang berbunyi saat ditekan.'),
          },
        ],
        answer: 'html',
        explainCorrect: t('HTML menyusun kerangka halaman. Seperti tembok dan pintu rumah.'),
        hints: [t('Rumah butuh apa lebih dulu sebelum dicat?')],
        tags: ['html'],
      }),
    ],
    pro: [
      anchorMcq({
        id: 'a01-anc-p1',
        prompt: t('Mengapa browser pengunjung tidak boleh langsung membaca isi database di backend?'),
        choices: [
          { id: 'sec', label: t('Supaya data aman dan tugas terpisah') },
          {
            id: 'col',
            label: t('Supaya halaman tampil lebih cepat di layar'),
            explainWrong: t('Kecepatan bukan alasan utamanya. Alasannya adalah keamanan dan pemisahan tugas.'),
          },
          {
            id: 'html',
            label: t('Karena browser tidak punya ruang untuk data'),
            explainWrong: t('Browser bisa menampung banyak data. Yang dijaga adalah keamanannya.'),
          },
        ],
        answer: 'sec',
        explainCorrect: t('Backend menjaga data sensitif tetap di server. Browser hanya menerima hasil yang aman.'),
        hints: [t('Pikirkan siapa yang boleh melihat catatan pribadi pelanggan.')],
        tags: ['backend'],
      }),
      anchorMcq({
        id: 'a01-anc-p2',
        prompt: t('Warna situs harmonis, tetapi orang selalu tersesat mencari menu bayar. Masalahnya ada di mana?'),
        choices: [
          { id: 'ux', label: t('UX (alur dan kejelasan)') },
          {
            id: 'ui',
            label: t('UI (warna dan tampilan)'),
            explainWrong: t('Warnanya sudah harmonis, jadi UI baik. Yang bermasalah adalah alur mencari menu.'),
          },
          {
            id: 'dns',
            label: t('Backend (data dan logika)'),
            explainWrong: t('Backend bekerja di balik layar. Masalah ini terlihat langsung di layar.'),
          },
        ],
        answer: 'ux',
        explainCorrect: t('Orang tersesat karena alurnya membingungkan. Itu masalah UX, bukan warna.'),
        hints: [t('Perhatikan di langkah mana orang tersesat.')],
        tags: ['ux'],
      }),
      anchorMcq({
        id: 'a01-anc-p3',
        prompt: t('Siapa yang merancang alur dan wireframe sebelum tampilan diberi warna?'),
        choices: [
          { id: 'uxd', label: t('UX Designer') },
          {
            id: 'be',
            label: t('Backend Developer'),
            explainWrong: t('Backend Developer mengurus logika dan data. Ia tidak merancang susunan halaman.'),
          },
          {
            id: 'dns',
            label: t('Administrator jaringan'),
            explainWrong: t('Administrator jaringan mengurus koneksi dan alamat. Ia tidak merancang halaman.'),
          },
        ],
        answer: 'uxd',
        explainCorrect: t('UX Designer merancang alur dan susunan halaman lewat wireframe. Warna ditambahkan sesudahnya.'),
        hints: [t('Wireframe adalah sketsa susunan halaman.')],
        tags: ['wireframe'],
      }),
      anchorMcq({
        id: 'a01-anc-p4',
        prompt: t('Urutan mana yang benar, dari mengetik alamat sampai halaman tampil?'),
        choices: [
          { id: 'seq', label: t('Cari alamat, kirim request, terima response, tampilkan halaman') },
          {
            id: 'rev',
            label: t('Terima response, cari alamat, kirim request, tampilkan halaman'),
            explainWrong: t('Response tidak bisa datang sebelum ada request. Alamat juga harus dicari lebih dulu.'),
          },
          {
            id: 'css',
            label: t('Kirim request, cari alamat, tampilkan halaman, terima response'),
            explainWrong: t('Request tidak bisa dikirim sebelum alamatnya ditemukan. DNS bekerja paling awal.'),
          },
        ],
        answer: 'seq',
        explainCorrect: t('Alamat dicari lebih dulu lewat DNS. Baru setelah itu request dikirim dan response diterima.'),
        hints: [t('Apa yang perlu diketahui sebelum mengirim pesan?')],
        tags: ['request', 'response'],
      }),
      anchorMcq({
        id: 'a01-anc-p5',
        prompt: t('Pada https://toko-rani.example/produk?jenis=tas, bagian ?jenis=tas disebut apa?'),
        choices: [
          { id: 'q', label: t('Query parameter, saringan tambahan') },
          {
            id: 'd',
            label: t('Domain, nama utama situs'),
            explainWrong: t('Domain ada di antara https:// dan /produk. Bagian ?jenis=tas ada di ujung alamat.'),
          },
          {
            id: 'p',
            label: t('Protokol, aturan kirim data'),
            explainWrong: t('Protokol ada di awal alamat, yaitu bagian https:// di depan. Bagian ini ada di ujung.'),
          },
        ],
        answer: 'q',
        explainCorrect: t('Bagian setelah tanda tanya adalah query. Isinya di sini satu parameter, jenis=tas, untuk menyaring produk.'),
        hints: [t('Perhatikan tanda baca yang membuka bagian ini.')],
        tags: ['url'],
      }),
      anchorMcq({
        id: 'a01-anc-p6',
        prompt: t('Apa yang membedakan dapur restoran dari backend?'),
        type: 'limit',
        analogy: t('Web seperti restoran'),
        choices: [
          { id: 'one', label: t('Jumlah pengunjung yang sanggup dilayani sekaligus') },
          {
            id: 'hidden',
            label: t('Bagian dalam yang tersembunyi dari pengunjung'),
            explainWrong: t('Pernyataan itu berlaku di web juga. Tamu restoran pun tidak masuk dapur.'),
          },
          {
            id: 'req',
            label: t('Cara pesanan berpindah dari pengunjung ke dapur'),
            explainWrong: t('Pelayan membawa pesanan ke dapur. Di web, browser mengirim permintaan ke server.'),
          },
        ],
        answer: 'one',
        explainCorrect: t('Backend bisa dirancang untuk menangani jauh lebih banyak permintaan sekaligus. Dapur restoran dibatasi ruang dan jumlah koki.'),
        hints: [t('Bayangkan restoran yang penuh sampai tamu mengantre di luar.')],
        tags: ['frontend', 'backend'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  // ---------------------------------------------------------------------------------------------
  // a01-l01  Website itu seperti restoran
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a01-l01',
    worldId: 'a01',
    title: 'Situs web itu seperti restoran',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan ruang makan web dan dapur web.',
      'Kamu bisa menunjuk mana frontend dan mana bagian di balik layar.',
    ),
    estMinutes: 6,
    introducesTerms: ['frontend', 'backend'],
    usesTerms: [],
    stickerId: 'restoran',
    atWork:
      'Saat laporan bug masuk, kamu menentukan apakah tombol salah warna dibenahi tim tampilan atau tim data.',
    steps: [
      storyStep('a01/restoran.svg', [
        rText(
          'Pak Udin punya restoran. Kamu duduk di ruang makan dan memesan nasi goreng. Siapa yang memasaknya, ya?',
          'Kamu membuka web Toko Rani, memilih kue, lalu menekan Pesan. Bagian mana yang kamu lihat, dan bagian mana yang bekerja diam-diam?',
        ),
      ]),
      conceptStep({
        title: t('Ruang makan itu frontend', 'Frontend: bagian yang terlihat'),
        visualName: 'RestoranDiagram',
        visualProps: { worldId: 'a01', topic: 'restoran-frontend' },
        alt: t('Diagram ruang makan frontend berisi menu, meja, dan pelayan.'),
        body: [
          rTerm('frontend', 'Frontend', 'Frontend'),
          rJunior(' adalah ruang makan web. Semua yang kamu lihat dan ketuk ada di sini.'),
          rPro(' adalah bagian web yang kamu lihat dan sentuh di layar. Bagian ini berjalan di perangkat pengunjung.'),
        ],
      }),
      simStep(
        'restoran-web',
        t(
          'Ketuk satu menu dan lihat pesananmu menuju dapur.',
          'Ketuk satu menu dan perhatikan ke mana pesanan itu dikirim.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a01-l01-q1',
          type: 'analogy',
          prompt: t(
            'Ruang makan restoran penuh menu dan meja. Di web, bagian apa yang mirip?',
            'Ruang makan restoran dipenuhi menu dan meja. Bagian web mana yang paling mirip?',
          ),
          choices: [
            { id: 'fe', label: t('Bagian depan web', 'Frontend') },
            {
              id: 'be',
              label: t('Bagian belakang web', 'Backend'),
              explainWrong: t(
                'Dapur dan gudang ada di belakang. Tamu duduk di ruang makan.',
                'Backend bekerja tersembunyi, seperti dapur. Ruang makan adalah bagian yang dilihat tamu.',
              ),
            },
            {
              id: 'db',
              label: t('Tempat menyimpan bahan', 'Database saja'),
              explainWrong: t(
                'Gudang bahan ada di belakang dapur. Tamu tidak duduk di sana.',
                'Database mirip gudang bahan di belakang dapur. Ia bukan ruang makan.',
              ),
            },
          ],
          answer: 'fe',
          explainCorrect: t(
            'Frontend adalah bagian yang kamu lihat dan sentuh. Seperti ruang makan bagi tamu.',
            'Frontend adalah bagian yang tampil dan disentuh orang yang memakai. Posisinya sama dengan ruang makan bagi tamu.',
          ),
          hints: [t('Mana yang bisa kamu lihat langsung?', 'Ingat siapa yang duduk di ruang makan.')],
          tags: ['frontend'],
        }),
      ),
      conceptStep({
        title: t('Dapur itu backend', 'Backend: bagian di balik layar'),
        visualName: 'RestoranDiagram',
        visualProps: { worldId: 'a01', topic: 'restoran-backend' },
        alt: t('Diagram dapur backend tempat pesanan dikerjakan dan catatan disimpan.'),
        body: [
          rTerm('backend', 'Backend', 'Backend'),
          rText(
            ' adalah dapur web. Di sini pesananmu dikerjakan dan catatannya disimpan. Tamu tidak melihatnya.',
            ' adalah bagian web yang berjalan di komputer milik toko. Backend menjalankan aturan toko dan menyimpan pesanan di database, yaitu gudang data.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Situs web itu seperti restoran', 'Web itu seperti restoran'),
        same: [
          t(
            'Tamu tidak masuk dapur. Pengunjung tidak melihat backend.',
            'Tamu tidak masuk dapur, dan pengunjung web tidak melihat isi backend.',
          ),
        ],
        different: [
          t(
            'Dapur web bisa melayani lebih banyak orang sekaligus.',
            'Restoran dibatasi ruang dan jumlah koki. Backend yang dirancang untuk skala besar bisa memproses lebih banyak permintaan sekaligus.',
          ),
        ],
        riskyAnalogy: true,
      }),
      qStep(
        makeTf({
          id: 'a01-l01-q2',
          prompt: t(
            'Pengunjung web boleh masuk dan melihat isi dapur web.',
            'Pengunjung web boleh membuka database di backend secara langsung.',
          ),
          answer: false,
          explainCorrect: t(
            'Dapur web tertutup untuk tamu. Pengunjung hanya menerima hasil masakannya.',
            'Backend tertutup demi keamanan data. Pengunjung hanya menerima hasil yang dikirim backend.',
          ),
          explainWrong: t(
            'Pernyataan itu keliru. Tamu tidak masuk dapur, begitu juga pengunjung web.',
            'Pernyataan itu keliru: pengunjung hanya menerima hasil dari backend, tidak melihat isinya.',
          ),
          hints: [t('Ingat siapa yang boleh masuk dapur.')],
          tags: ['backend'],
        }),
      ),
      qStep({
        id: 'a01-l01-q3',
        type: 'sort',
        prompt: t(
          'Kelompokkan hal ini ke ruang makan atau dapur.',
          'Kelompokkan tugas ini ke dua sisi web.',
        ),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('Warna tombol Beli') },
          { id: 'i2', label: t('Menyimpan akun di gudang data', 'Menyimpan data akun di database') },
          { id: 'i3', label: t('Ukuran huruf judul') },
          { id: 'i4', label: t('Memeriksa kata sandi') },
        ],
        bins: [
          { id: 'fe', label: t('Ruang makan', 'Frontend'), icon: 'utensils' },
          { id: 'be', label: t('Dapur', 'Backend'), icon: 'chef-hat' },
        ],
        answer: { i1: 'fe', i2: 'be', i3: 'fe', i4: 'be' },
        explainCorrect: t(
          'Warna dan huruf tampil di layar, seperti ruang makan. Menyimpan dan memeriksa dikerjakan di dapur.',
          'Warna dan ukuran huruf tampil di layar, jadi milik frontend. Menyimpan dan memeriksa data terjadi di backend.',
        ),
        hints: [t('Mana yang terlihat tamu, mana yang tersembunyi?'), undefined],
        tags: ['frontend', 'backend'],
      }),
      qStep(
        makeMcq({
          id: 'a01-l01-q4',
          type: 'limit',
          analogy: t('Situs web seperti restoran', 'Web seperti restoran'),
          prompt: t(
            'Dapur restoran hanya cocok untuk beberapa tamu. Bagaimana dengan dapur web?',
            'Apa perbedaan antara dapur restoran dan sisi belakang web?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'diff',
              label: t(
                'Melayani sangat banyak pengunjung sekaligus',
                'Jumlah pesanan yang bisa ditangani sekaligus',
              ),
            },
            {
              id: 'hide',
              label: t(
                'Melayani 1 pengunjung saja dalam satu waktu',
                'Bagian tempat pengunjung menunggu hasil pesanan',
              ),
              explainWrong: t(
                'Dapur web bisa menangani banyak pesanan sekaligus. Dapur restoran punya ruang dan koki terbatas.',
                'Tamu restoran menunggu di tempat yang berbeda dari dapur. Pengunjung web menunggu hasilnya di layar.',
              ),
            },
            {
              id: 'menu',
              label: t(
                'Memasak makanan sungguhan untuk pengunjung',
                'Cara pengunjung memilih dari menu yang tersedia',
              ),
              explainWrong: t(
                'Dapur web tidak punya kompor. Ia hanya menyiapkan halaman dan catatan.',
                'Pernyataan itu berlaku di web juga. Tampilan frontend berfungsi seperti menu restoran.',
              ),
            },
          ],
          answer: 'diff',
          explainCorrect: t(
            'Dapur web bisa menangani lebih banyak pesanan sekaligus. Dapur restoran punya ruang dan koki terbatas.',
            'Backend bisa menambah kapasitas lewat komputer tambahan. Dapur restoran dibatasi ruang dan jumlah koki.',
          ),
          hints: [t('Bayangkan dapur restoran saat tamunya penuh.', 'Pikirkan jumlah pengunjung yang bisa dilayani sekaligus.')],
          tags: ['frontend', 'backend'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l01-q5',
          type: 'scenario',
          story: t(
            'Rani menjual kue online. Kamu menekan tombol Pesan. Stok kue di gudang berkurang.',
            'Rani membuka toko kue online. Saat tombol Pesan ditekan, stok kue di gudang berkurang dan tersimpan.',
          ),
          prompt: t(
            'Siapa yang mengurangi angka stok di gudang?',
            'Bagian mana yang mengurangi dan menyimpan angka stok?',
          ),
          difficulty: 3,
          choices: [
            { id: 'be', label: t('Backend, si dapur web', 'Backend') },
            {
              id: 'fe',
              label: t('Frontend, si ruang makan', 'Frontend'),
              explainWrong: t(
                'Ruang makan hanya menampilkan angka stok. Dapur yang mengubahnya.',
                'Frontend hanya menampilkan angka stok. Perubahannya dikerjakan backend.',
              ),
            },
            {
              id: 'meja',
              label: t('Pengunjung yang memesan kue'),
              explainWrong: t(
                'Kamu hanya memesan. Dapur yang mengambil bahan dari gudang.',
                'Pengunjung hanya mengirim pesanan. Backend yang mengubah stok.',
              ),
            },
          ],
          answer: 'be',
          explainCorrect: t(
            'Dapur menyimpan dan mengubah catatan stok. Ruang makan hanya menampilkannya.',
            'Backend mengubah angka stok dan menyimpannya di database. Frontend hanya menampilkan hasilnya.',
          ),
          hints: [t('Siapa yang mengurus gudang bahan di restoran?')],
          tags: ['backend'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l01-q6',
          prompt: t('Kode frontend dijalankan di mana?'),
          modes: ['pro'],
          difficulty: 2,
          choices: [
            { id: 'web', label: t('Di perangkat pengunjung') },
            {
              id: 'sql',
              label: t('Di komputer tempat toko berjalan'),
              explainWrong: t('Komputer toko menjalankan backend. Frontend berjalan di sisi pengunjung.'),
            },
            {
              id: 'php',
              label: t('Di kabel yang menyambung internet'),
              explainWrong: t('Kabel hanya membawa pesan. Kode frontend dijalankan di perangkat pengunjung.'),
            },
          ],
          answer: 'web',
          explainCorrect: t('Kode frontend dijalankan di perangkat pengunjung. Hasilnya langsung tampil di layar.'),
          hints: [t('Tampilan muncul di perangkat siapa?')],
          tags: ['frontend'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a01-l01-r1',
        prompt: t(
          'Kamu duduk di restoran dan memilih makanan. Di bagian mana kamu berada?',
          'Bagian restoran mana yang langsung dipakai tamu untuk memilih pesanan?',
        ),
        choices: [
          { id: 'fe', label: t('Ruang makan') },
          {
            id: 'be',
            label: t('Dapur restoran'),
            explainWrong: t(
              'Dapur bekerja di belakang. Tamu tidak melihatnya.',
              'Koki menyiapkan pesanan di dapur. Tamu memilih pesanan di ruang makan.',
            ),
          },
          {
            id: 'gudang',
            label: t('Gudang bahan'),
            explainWrong: t(
              'Gudang juga ada di belakang. Tamu tidak masuk ke sana.',
              'Gudang menyimpan bahan masakan. Tamu memilih makanan dari menu di ruang makan.',
            ),
          },
        ],
        answer: 'fe',
        explainCorrect: t(
          'Kamu memilih makanan dari meja di ruang makan. Di web, kamu memilihnya langsung di layar.',
          'Tamu memakai ruang makan untuk melihat menu dan memilih. Di web, layar memenuhi peran ini.',
        ),
        hints: [t('Di mana pelayan memberikan daftar makanan?')],
        tags: ['frontend'],
      }),
      makeTf({
        id: 'a01-l01-r2',
        prompt: t(
          'Gudang tempat menyimpan pesanan ada di backend.',
          'Database yang menyimpan semua data pesanan berada di sisi backend.',
        ),
        answer: true,
        explainCorrect: t(
          'Gudang ada di belakang bersama dapur. Ruang makan tidak menyimpan pesanan.',
          'Database berada di balik layar, di sisi backend. Frontend hanya menampilkan isinya.',
        ),
        explainWrong: t(
          'Gudang tidak ada di ruang makan. Gudang ada di belakang, bersama dapur.',
          'Data pesanan tidak disimpan di perangkat pengunjung. Database ada di sisi backend.',
        ),
        hints: [t('Ingat letak gudang bahan di restoran.')],
        tags: ['backend'],
      }),
    ],
    recap: t(
      'Frontend itu ruang makan, backend itu dapur.',
      'Frontend adalah bagian yang dilihat pengunjung. Backend adalah bagian di balik layar yang menyimpan dan menghitung data.',
    ),
    companion: {
      talkPrompts: [
        'Apa bedanya ruang makan dan dapur di restoran web?',
        'Mengapa tamu restoran tidak boleh masuk langsung ke dapur?',
      ],
      offlineActivity:
        'Main restoran-restoranan 5 menit. Satu orang jadi tamu yang membaca menu. Satu orang jadi dapur yang menyiapkan catatan.',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // a01-l02  UI dan UX itu beda
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a01-l02',
    worldId: 'a01',
    title: 'UI dan UX itu beda',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan tampilan dari kemudahan memakai.',
      'Kamu bisa membedakan UI dari pengalaman memakai, lalu memberi contohnya.',
    ),
    estMinutes: 6,
    introducesTerms: ['ui', 'ux'],
    usesTerms: ['frontend'],
    stickerId: 'botol-saus',
    warmupFrom: 'a01-l01',
    atWork:
      'Kamu akan memilah keluhan "tombolnya membingungkan" dari tim produk menjadi masalah tampilan atau masalah alur.',
    steps: [
      storyStep('a01/botol-saus.svg', [
        rText(
          'Ada 2 botol saus di meja. Botol kaca susah dituang, botol plastik tinggal dipencet. Mana yang lebih mudah dipakai?',
          'Aplikasi pesan antar tampil rapi, tetapi orang sering salah ketuk. Dua botol saus menjelaskan sebabnya: keduanya rapi, tetapi satu jauh lebih mudah dipakai.',
        ),
      ]),
      conceptStep({
        title: t('UI: yang terlihat mata', 'UI: tampilan layar'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a01', topic: 'ui-tampilan' },
        alt: t('Contoh tampilan: warna tombol, ikon, dan ukuran huruf.'),
        body: [
          rTerm('ui', 'UI', 'UI'),
          rText(
            ' adalah apa yang terlihat. Di botol, itu bentuk dan warnanya. Di layar, itu warna, huruf, dan tombol.',
            ' adalah semua yang terlihat di layar: warna, huruf, ikon, jarak, dan tombol. UI menjawab pertanyaan "tampilannya seperti apa?"',
          ),
        ],
      }),
      simStep(
        'restoran-web',
        t(
          'Ketuk tombol pesanan, lalu lihat apakah mudah ditemukan.',
          'Ketuk tombol pesanan dan perhatikan seberapa jelas tombol itu.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a01-l02-q1',
          prompt: t(
            'Tombol kuning bergambar bintang termasuk bagian mana?',
            'Warna tombol kuning dan ikon bintang termasuk dalam apa?',
          ),
          choices: [
            { id: 'ui', label: t('UI', 'UI') },
            {
              id: 'ux',
              label: t('Kemudahan memakai', 'Pengalaman memakai'),
              explainWrong: t(
                'Ukuran kecil bisa membuat tombol sulit diketuk. Warna dan gambar menjelaskan tampilannya.',
                'Pengalaman memakai mencakup kemudahan mengetuk tombol. Warna dan ikon adalah unsur UI.',
              ),
            },
            {
              id: 'be',
              label: t('Backend', 'Backend'),
              explainWrong: t(
                'Backend ada di dapur web. Warna dan gambar ada di layar.',
                'Backend bekerja di balik layar. Warna dan ikon tampil di layar.',
              ),
            },
          ],
          answer: 'ui',
          explainCorrect: t(
            'Warna dan gambar bisa dilihat mata. Itu bagian UI, seperti bentuk botol.',
            'Warna, ikon, dan huruf terlihat di layar, jadi termasuk UI.',
          ),
          hints: [t('Apa yang bisa kamu lihat dari botol?')],
          tags: ['ui'],
        }),
      ),
      conceptStep({
        title: t('UX: mudah atau sulit dipakai', 'UX: pengalaman memakai'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a01', topic: 'ux-pengalaman' },
        alt: t('Alur memesan yang mudah dibandingkan dengan alur yang membingungkan.'),
        body: [
          rTerm('ux', 'UX', 'UX'),
          rText(
            ' adalah pengalaman memakai sesuatu. Botol plastik mudah dipencet. Aplikasi juga bisa mudah atau sulit dipakai.',
            ' adalah pengalaman saat memakai produk. Pengalaman itu bisa mudah atau membingungkan, cepat atau lambat.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a01-l02-q2',
          type: 'analogy',
          prompt: t(
            'Botol plastik langsung mengeluarkan saus saat dipencet. Itu contoh apa?',
            'Botol terbalik mengeluarkan saus hanya dengan dipencet. Itu menggambarkan apa?',
          ),
          choices: [
            { id: 'ux', label: t('UX yang baik, mudah dipakai', 'UX yang baik: mudah dipakai') },
            {
              id: 'err',
              label: t('UI yang cantik dilihat orang', 'UI yang menarik secara visual'),
              explainWrong: t(
                'UI membahas rupa botol. Kemudahan menuang saus termasuk UX.',
                'Tampilan menarik itu UI. Yang dinilai di sini adalah kemudahan memencet botol.',
              ),
            },
            {
              id: 'be',
              label: t('Dapur web yang cepat', 'Backend yang berjalan cepat'),
              explainWrong: t(
                'Dapur web bekerja di belakang layar. Contoh ini soal memakai botol.',
                'Backend bekerja di balik layar. Contoh botol ini menggambarkan UX.',
              ),
            },
          ],
          answer: 'ux',
          explainCorrect: t(
            'Kamu cukup memencet botol untuk mengeluarkan saus. Itu contoh UX yang baik.',
            'Saus keluar tanpa usaha ekstra, jadi memakainya mudah. Itu ciri UX yang baik.',
          ),
          hints: [t('Pikirkan usaha yang perlu kamu keluarkan.')],
          tags: ['ux'],
        }),
      ),
      limitStep({
        analogy: t('Botol saus untuk UI dan UX', 'Botol saus untuk tampilan dan pengalaman'),
        same: [
          t(
            'Botol cantik itu UI. Botol mudah dipencet itu UX.',
            'Bentuk botol yang rapi itu UI. Mudah atau tidaknya dipencet itu UX.',
          ),
        ],
        different: [
          t(
            'Aplikasi bisa diuji di banyak ukuran layar.',
            'Botolnya tetap sama saat berpindah tempat. Aplikasi yang sama bisa berubah tata letaknya saat berpindah dari laptop ke HP.',
          ),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeTf({
          id: 'a01-l02-q3',
          prompt: t(
            'Tampilan yang cantik pasti membuat aplikasi mudah dipakai.',
            'Kalau warna dan tata letaknya sudah menarik, aplikasi pasti mudah dipakai.',
          ),
          answer: false,
          explainCorrect: t(
            'Botol kaca bisa cantik, tetapi susah dituang. Aplikasi juga begitu.',
            'Tampilan menarik tidak menjamin alur yang mudah. Aplikasi cantik tetap bisa membingungkan.',
          ),
          explainWrong: t(
            'Pernyataan itu keliru. Ingat botol kaca yang cantik, tetapi susah dituang.',
            'Pernyataan itu keliru: tampilan yang menarik tidak otomatis membuat alurnya mudah.',
          ),
          hints: [t('Ingat botol kaca di meja makan.')],
          tags: ['ui', 'ux'],
        }),
      ),
      qStep({
        id: 'a01-l02-q4',
        type: 'sort',
        prompt: t(
          'Kelompokkan contoh tampilan dan pengalaman memakai.',
          'Kelompokkan contoh ini ke tampilan atau pengalaman.',
        ),
        difficulty: 2,
        items: [
          { id: 'u1', label: t('Jenis huruf di judul') },
          { id: 'u2', label: t('Jumlah ketukan sampai pesanan jadi', 'Jumlah langkah sampai pesanan selesai') },
          { id: 'u3', label: t('Warna hijau pada tombol Bayar') },
          { id: 'u4', label: t('Bingung karena tombol Cari tersembunyi', 'Rasa bingung saat tombol Cari tersembunyi') },
        ],
        bins: [
          { id: 'ui', label: t('UI, dilihat', 'UI (tampilan)'), icon: 'palette' },
          { id: 'ux', label: t('UX, pengalaman', 'UX (pengalaman)'), icon: 'user' },
        ],
        answer: { u1: 'ui', u2: 'ux', u3: 'ui', u4: 'ux' },
        explainCorrect: t(
          'Huruf dan warna terlihat mata, seperti bentuk botol. Jumlah ketukan dan bingung saat memesan termasuk pengalaman memakai.',
          'Jenis huruf dan warna tombol adalah tampilan (UI). Jumlah langkah dan rasa bingung adalah pengalaman (UX).',
        ),
        hints: [t('Ingat bentuk botol dan usaha menuang saus.'), undefined],
        tags: ['ui', 'ux'],
      }),
      qStep(
        makeMcq({
          id: 'a01-l02-q5',
          type: 'limit',
          analogy: t('Botol saus'),
          prompt: t('Apa beda penting antara botol saus dan produk digital?'),
          modes: ['pro'],
          difficulty: 2,
          choices: [
            { id: 'mix', label: t('Tata letak web bisa berubah mengikuti ukuran layar') },
            {
              id: 'eat',
              label: t('Bentuk dan susunan bisa membuat produk lebih nyaman dipakai'),
              explainWrong: t('Ini persamaan. Bentuk botol dan susunan layar sama-sama memengaruhi kemudahan memakai produk.'),
            },
            {
              id: 'glass',
              label: t('Keindahan tampilan berbeda dari kemudahan memakainya'),
              explainWrong: t('Ini persamaan. Botol cantik bisa sulit digunakan, sama seperti aplikasi cantik bisa membingungkan.'),
            },
          ],
          answer: 'mix',
          explainCorrect: t('Botolnya tetap sama di tiap meja. Aplikasi bisa menata ulang tombol saat berpindah dari laptop ke HP.'),
          hints: [t('Bayangkan berpindah perangkat tetapi tetap memakai aplikasi yang sama.')],
          tags: ['ui', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l02-q6',
          type: 'scenario',
          story: t(
            'Dimas memakai aplikasi belanja yang cantik. Untuk mengganti alamat, ia harus mengetuk 9 kali.',
            'Dimas memakai aplikasi belanja berwarna elegan, tetapi perlu 9 langkah hanya untuk mengganti alamat.',
          ),
          prompt: t(
            'Apa cara terbaik membuat aplikasi itu lebih enak dipakai?',
            'Perbaikan UX apa yang paling tepat?',
          ),
          difficulty: 3,
          choices: [
            {
              id: 'short',
              label: t('Membuat langkahnya jauh lebih sedikit', 'Ringkas langkah menjadi 1 atau 2 layar'),
            },
            {
              id: 'color',
              label: t('Mengganti warna semua tombol menjadi ungu', 'Ganti warna semua tombol dari biru menjadi ungu'),
              explainWrong: t(
                'Warna baru hanya mengubah tampilan. Langkahnya tetap 9 ketukan.',
                'Warna tombol termasuk UI. Jumlah langkahnya tetap 9.',
              ),
            },
            {
              id: 'font',
              label: t('Menambahkan hiasan baru di bagian judul', 'Tambahkan animasi di bagian judul halaman'),
              explainWrong: t(
                'Hiasan tidak membuat langkah lebih sedikit. Kamu tetap mengetuk 9 kali.',
                'Animasi hanya mengubah tampilan dan bisa mengganggu fokus. Langkahnya tetap 9.',
              ),
            },
          ],
          answer: 'short',
          explainCorrect: t(
            'Langkah yang sedikit membuat aplikasi mudah dipakai. Seperti botol yang cukup dipencet sekali.',
            'UX membaik saat alurnya diringkas. Warna dan hiasan tidak mengurangi 9 langkah itu.',
          ),
          hints: [t('Hitung berapa kali Dimas harus mengetuk.', 'Hitung jumlah langkah, bukan tampilannya.')],
          tags: ['ux'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a01-l02-r1',
        prompt: t('Apa yang dijawab oleh UI?', 'Pertanyaan apa yang dijawab UI?'),
        choices: [
          { id: 'look', label: t('Tampilannya seperti apa', 'Tampilannya seperti apa?') },
          {
            id: 'feel',
            label: t('Mudah atau sulit dipakai', 'Bagaimana pengalaman saat memakainya?'),
            explainWrong: t(
              'Itu pertanyaan untuk UX. UI menjawab soal yang terlihat.',
              'Itu pertanyaan untuk UX. UI menjawab soal tampilan.',
            ),
          },
          {
            id: 'store',
            label: t('Catatannya disimpan di mana', 'Datanya disimpan di mana?'),
            explainWrong: t(
              'Itu urusan dapur web. UI menjawab soal yang terlihat.',
              'Itu urusan backend. UI menjawab soal tampilan.',
            ),
          },
        ],
        answer: 'look',
        explainCorrect: t(
          'UI menjawab soal yang terlihat mata. Seperti bentuk dan warna botol.',
          'UI membahas tampilan visual di layar, seperti warna, huruf, dan tombol.',
        ),
        hints: [t('Ingat apa yang kamu lihat dari botol.')],
        tags: ['ui'],
      }),
      makeTf({
        id: 'a01-l02-r2',
        prompt: t(
          'Tulisan tombol yang terlalu kecil membuat aplikasi sulit dipakai.',
          'Tampilan adalah bagian dari keseluruhan UX.',
        ),
        answer: true,
        explainCorrect: t(
          'Tulisan kecil sulit dibaca. Kamu bisa bingung memilih tombol yang benar.',
          'Tampilan yang rapi membantu alur berjalan. Keduanya membentuk pengalaman yang baik.',
        ),
        explainWrong: t(
          'Kamu perlu bisa membaca tulisan agar tahu kegunaan tombol.',
          'Tampilan ikut membentuk UX. Tombol yang sulit dibaca merusak pengalaman.',
        ),
        hints: [t('Bayangkan tulisan Bayar yang sangat kecil.', 'Pikirkan pengaruh keterbacaan tombol pada pengalaman.')],
        tags: ['ui', 'ux'],
      }),
    ],
    recap: t(
      'UI adalah tampilan. UX adalah pengalaman saat memakai.',
      'UI adalah tampilan layar. UX adalah pengalaman memakainya: mudah atau membingungkan.',
    ),
    companion: {
      talkPrompts: ['Di aplikasi favoritmu, mana bagian yang cantik dan mana yang mudah dipakai?'],
      offlineActivity:
        'Cari benda di rumah yang bagus tetapi susah dipakai. Ceritakan mengapa susah.',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // a01-l03  Siapa mengerjakan apa (Pro)
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a01-l03',
    worldId: 'a01',
    title: 'Siapa mengerjakan apa',
    modes: ['pro'],
    objective: t('Kamu bisa menyebutkan tugas tiap peran dalam tim web, dari riset sampai backend.'),
    estMinutes: 5,
    introducesTerms: ['wireframe', 'server', 'browser'],
    usesTerms: ['frontend', 'backend', 'ui', 'ux'],
    warmupFrom: 'a01-l02',
    atWork:
      'Kamu akan membaca peran ini di lowongan kerja dan memakainya saat bertanya, "ini tugas siapa?"',
    steps: [
      storyStep('a01/tim-web.svg', [
        rText(
          'Toko Rani akan membuat aplikasi pesan antar. Siapa saja yang perlu terlibat, dan apa tugas masing-masing?',
        ),
      ]),
      conceptStep({
        title: t('Tim riset dan desain'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a01', topic: 'peran-desain' },
        alt: t('Peran periset, desainer UX, dan desainer UI sebelum menulis kode.'),
        body: [
          rText('UX Researcher mencari tahu masalah orang yang memakai produk lewat wawancara. UX Designer merancang alur dan '),
          rTerm('wireframe', 'wireframe'),
          rText(', yaitu sketsa kasar susunan halaman. UI Designer lalu memoles warna dan komponen visual di Figma.'),
        ],
      }),
      simStep(
        'restoran-web',
        t('Jalankan simulasi dan lihat pesanan berpindah dari frontend ke backend.'),
      ),
      qStep(
        makeMcq({
          id: 'a01-l03-q1',
          prompt: t('Siapa yang mewawancarai orang untuk mencari tahu kesulitan mereka memakai produk?'),
          choices: [
            { id: 'uxr', label: t('UX Researcher') },
            {
              id: 'be',
              label: t('Backend Developer'),
              explainWrong: t('Backend Developer mengurus logika dan data. Wawancara bukan tugas utamanya.'),
            },
            {
              id: 'uid',
              label: t('UI Designer'),
              explainWrong: t('UI Designer merancang tampilan visual. Wawancara bukan tugas utamanya.'),
            },
          ],
          answer: 'uxr',
          explainCorrect: t('UX Researcher bertanya langsung kepada orang yang memakai produk. Hasilnya menjadi dasar desain.'),
          hints: [t('Siapa yang bertugas mendengar keluhan orang?')],
          tags: ['ux'],
        }),
      ),
      conceptStep({
        title: t('Tim pengembang'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a01', topic: 'peran-dev' },
        alt: t('Kerja sama developer frontend, backend, dan full-stack.'),
        body: [
          rText('Frontend Developer mengubah desain menjadi halaman yang tampil di '),
          rTerm('browser', 'browser'),
          rText(', yaitu aplikasi untuk membuka situs. Backend Developer mengurus logika dan data di '),
          rTerm('server', 'server'),
          rText(', yaitu komputer yang melayani pengunjung. Full-stack Developer mengerjakan keduanya.'),
        ],
      }),
      limitStep({
        analogy: t('Pembagian tim di restoran besar dan tim kecil'),
        same: [t('Tiap peran punya keahlian khusus, supaya hasil akhir rapi dan cepat.')],
        different: [t('Di tim kecil, satu orang sering merangkap beberapa peran sekaligus.')],
        riskyAnalogy: true,
      }),
      qStep(
        makeMcq({
          id: 'a01-l03-q2',
          prompt: t('Apa nama sketsa kasar susunan halaman yang dibuat UX Designer?'),
          choices: [
            { id: 'wf', label: t('Wireframe') },
            {
              id: 'db',
              label: t('Daftar fitur'),
              explainWrong: t('Daftar fitur hanya menyebut apa yang ada. Sketsa letaknya disebut wireframe.'),
            },
            {
              id: 'url',
              label: t('Palet warna'),
              explainWrong: t('Palet warna memilih warna, bukan susunan halaman. Susunan digambar di wireframe.'),
            },
          ],
          answer: 'wf',
          explainCorrect: t('Wireframe menunjukkan letak elemen halaman sebelum diberi warna. Mirip denah rumah sebelum dicat.'),
          hints: [t('Bayangkan denah rumah sebelum dicat.')],
          tags: ['wireframe'],
        }),
      ),
      qStep({
        id: 'a01-l03-q3',
        type: 'match',
        prompt: t('Pasangkan peran dengan alat kerja yang paling umum.'),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('UI Designer') },
          { id: 'l2', label: t('Frontend Developer') },
          { id: 'l3', label: t('Backend Developer') },
        ],
        right: [
          { id: 'r1', label: t('Figma') },
          { id: 'r2', label: t('React dan kode tampilan') },
          { id: 'r3', label: t('Node.js, Python, SQL') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3' },
        explainCorrect: t('Setiap peran memakai alat sesuai tugasnya. Figma untuk gambar, React untuk tampilan, Node.js untuk server.'),
        hints: [t('Siapa yang menggambar, dan siapa yang menulis kode?'), undefined],
        tags: ['frontend', 'backend', 'ui'],
      }),
      qStep(
        makeMcq({
          id: 'a01-l03-q4',
          type: 'limit',
          analogy: t('Pembagian peran tetap di tim besar'),
          prompt: t('Mana pernyataan yang TIDAK selalu berlaku di tim web sungguhan?'),
          difficulty: 2,
          choices: [
            { id: 'strict', label: t('Setiap orang hanya mengerjakan satu peran') },
            {
              id: 'collab',
              label: t('Desainer dan developer perlu membahas alur bersama'),
              explainWrong: t('Pernyataan itu berlaku di tim mana pun. Desainer dan developer perlu sepakat soal alur.'),
            },
            {
              id: 'fe',
              label: t('Frontend mengubah desain menjadi halaman hidup'),
              explainWrong: t('Pernyataan itu berlaku di tim mana pun. Mengubah desain menjadi halaman memang tugas frontend.'),
            },
          ],
          answer: 'strict',
          explainCorrect: t('Di tim kecil, satu orang sering merangkap beberapa peran. Hanya tim besar yang membaginya tegas.'),
          hints: [t('Pikirkan tim startup yang hanya berisi 3 orang.')],
          tags: ['frontend'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a01-l03-q5',
          prompt: t('Developer yang paham UI dan UX bisa memutuskan hal kecil tanpa menunggu desainer.'),
          answer: true,
          explainCorrect: t('Memahami UI dan UX mempercepat keputusan harian. Developer tidak perlu bertanya untuk setiap detail.'),
          explainWrong: t('Pernyataan itu benar: paham UI dan UX membuat developer bisa memutuskan detail kecil sendiri.'),
          hints: [t('Pikirkan keputusan kecil seperti jarak antar tombol.')],
          tags: ['frontend', 'ui', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l03-q6',
          type: 'scenario',
          story: t('Toko Rani mau meluncurkan aplikasi kecil. Hanya 1 programmer yang mengurus tampilan sekaligus data.'),
          prompt: t('Peran apa yang sedang ia jalankan?'),
          difficulty: 2,
          choices: [
            { id: 'fs', label: t('Full-stack') },
            {
              id: 'uxr',
              label: t('Frontend Developer'),
              explainWrong: t('Frontend Developer hanya mengerjakan tampilan. Programmer ini juga mengurus data.'),
            },
            {
              id: 'ui',
              label: t('Backend Developer'),
              explainWrong: t('Backend Developer hanya mengurus server dan data. Programmer ini juga membuat tampilan.'),
            },
          ],
          answer: 'fs',
          explainCorrect: t('Full-stack Developer mengerjakan frontend dan backend sekaligus. Satu orang menangani tampilan dan data.'),
          hints: [t('Ia mengerjakan dua sisi sekaligus.')],
          tags: ['frontend', 'backend'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a01-l03-r1',
        prompt: t('Peran apa yang merancang alur dan wireframe sebelum tampilan diberi warna?'),
        choices: [
          { id: 'uxd', label: t('UX Designer') },
          {
            id: 'be',
            label: t('Backend Developer'),
            explainWrong: t('Backend Developer bekerja di server dan data. Ia tidak merancang susunan halaman.'),
          },
          {
            id: 'uid',
            label: t('UI Designer'),
            explainWrong: t('UI Designer memoles warna dan komponen. Alur dan susunan dirancang lebih dulu oleh UX Designer.'),
          },
        ],
        answer: 'uxd',
        explainCorrect: t('UX Designer menyusun alur dan struktur halaman. Warna ditambahkan sesudahnya.'),
        hints: [t('Alur dirancang sebelum warna ditambahkan.')],
        tags: ['wireframe'],
      }),
      makeTf({
        id: 'a01-l03-r2',
        prompt: t('Full-stack Developer mengerjakan frontend dan backend sekaligus.'),
        answer: true,
        explainCorrect: t('Full-stack berarti menguasai tampilan dan sisi server. Satu orang mengerjakan keduanya.'),
        explainWrong: t('Full-stack mencakup sisi tampilan dan sisi server.'),
        hints: [t('Kata "full" berarti penuh.')],
        tags: ['frontend', 'backend'],
      }),
    ],
    recap: t('Peneliti mencari masalah, desainer merancang, developer membangun.'),
  }),

  // ---------------------------------------------------------------------------------------------
  // a01-l04  Perjalanan sebuah halaman
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a01-l04',
    worldId: 'a01',
    title: 'Perjalanan sebuah halaman',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengurutkan perjalanan halaman, dari alamat sampai tampil.',
      'Kamu bisa menyebutkan urutan perjalanan halaman dari ketikan alamat sampai tampil di layar.',
    ),
    estMinutes: 6,
    introducesTerms: ['dns', 'request', 'response'],
    usesTerms: ['browser', 'server', 'frontend', 'backend'],
    stickerId: 'ojek-paket',
    warmupFrom: 'a01-l02',
    atWork:
      'Kamu akan melihat request dan balasannya di tab Network DevTools saat halaman lambat dimuat.',
    steps: [
      storyStep('a01/ojek-paket.svg', [
        rText(
          'Kamu memesan paket lewat ojek online. Kurir mencari alamat toko, lalu paket datang. Siapa yang membantu mencari alamat itu?',
          'Halaman Toko Rani lambat tampil. Untuk mencari sebabnya, kamu perlu tahu apa saja yang terjadi setelah alamat diketik.',
        ),
      ]),
      conceptStep({
        title: t('Browser mengirim pesanan', 'Browser dan request'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'a01', topic: 'request-response' },
        alt: t(
          'Pemesan bertanya ke buku alamat, lalu mengirim pesanan ke toko.',
          'Diagram alur permintaan halaman dari browser menuju server.',
        ),
        body: [
          rJunior('Kamu mengetik alamat di '),
          jTerm('browser', 'browser'),
          rJunior(
            ', aplikasi pembuka web. Buku alamat internet mencari nomor toko. Lalu browser mengirim pesananmu ke toko itu.',
          ),
          rPro('Saat kamu mengetik alamat, '),
          pTerm('browser', 'browser'),
          rPro(' mengirim sebuah '),
          pTerm('request', 'request'),
          rPro(', yaitu permintaan halaman. Sebelum itu, '),
          pTerm('dns', 'DNS'),
          rPro(' menerjemahkan nama situs menjadi alamat IP, yaitu nomor alamat server. Cara kerjanya mirip buku kontak.'),
        ],
      }),
      simStep(
        'restoran-web',
        t(
          'Ketuk satu menu dan lihat ke mana pesananmu pergi.',
          'Jalankan simulasi dan perhatikan jalur request dari browser sampai balasan datang.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a01-l04-q2',
          type: 'analogy',
          prompt: t(
            'Buku kontak di HP mengubah nama menjadi nomor. Siapa yang bekerja seperti itu di internet?',
            'Buku kontak di HP mengubah nama menjadi nomor. Bagian mana yang bekerja serupa dalam perjalanan halaman?',
          ),
          choices: [
            { id: 'dns', label: t('Buku alamat internet', 'DNS') },
            {
              id: 'browser',
              label: t('Aplikasi pembuka web', 'Browser'),
              explainWrong: t(
                'Aplikasi pembuka web adalah si pemesan. Ia membawa pesananmu, bukan buku alamat.',
                'Browser adalah pihak yang memesan halaman. Buku kontak adalah tugas DNS.',
              ),
            },
            {
              id: 'server',
              label: t('Toko yang menyimpan halaman', 'Server'),
              explainWrong: t(
                'Toko menyimpan halaman web. Toko tidak mencarikan nomor alamat.',
                'Server menyimpan file halaman. Yang menerjemahkan nama adalah DNS.',
              ),
            },
          ],
          answer: 'dns',
          explainCorrect: t(
            'Buku alamat internet mengubah nama toko menjadi nomor. Cara kerjanya mirip buku kontak di HP.',
            'DNS menerjemahkan nama situs menjadi alamat IP. Cara kerjanya mirip buku kontak di HP.',
          ),
          hints: [t('Ingat buku kontak di HP-mu.')],
          tags: ['dns'],
        }),
      ),
      conceptStep({
        title: t('Toko membalas pesanan', 'Server dan response'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'a01', topic: 'server-response' },
        alt: t(
          'Toko mengirim paket berisi halaman, gambar, dan gaya ke pemesan.',
          'Diagram balasan server berisi file halaman untuk browser.',
        ),
        body: [
          jTerm('server', 'Server'),
          rJunior(
            ' adalah toko di internet yang menyimpan halaman web. Server mengirim paket balasan ke browser. Browser lalu menampilkannya di layarmu.',
          ),
          pTerm('server', 'Server'),
          rPro(' mencari file halaman, lalu mengirim '),
          pTerm('response', 'response'),
          rPro(', yaitu balasan berisi file itu. Browser menerima balasan dan menampilkan halaman di layar. Situs harus tetap tersedia saat perangkat pemiliknya mati.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a01-l04-q3',
          prompt: t(
            'Toko mengirim paket berisi halaman web. Apa peran paket itu?',
            'Pesan balasan dari server berisi file halaman disebut apa?',
          ),
          choices: [
            { id: 'res', label: t('Jawaban dari toko', 'Response, balasan server') },
            {
              id: 'req',
              label: t('Pesanan dari kamu', 'Request, permintaan browser'),
              explainWrong: t(
                'Pesanan adalah yang kamu kirim ke toko. Paket datang sesudahnya.',
                'Request adalah permintaan dari browser. Balasan dari server disebut response.',
              ),
            },
            {
              id: 'dns',
              label: t('Nomor alamat toko', 'DNS, penerjemah alamat'),
              explainWrong: t(
                'Nomor alamat membantu kurir menemukan toko. Nomor itu bukan paketnya.',
                'DNS hanya menerjemahkan alamat. DNS tidak mengirim isi halaman.',
              ),
            },
          ],
          answer: 'res',
          explainCorrect: t(
            'Paket balasan adalah jawaban toko atas pesananmu. Seperti pesanan ojek yang tiba di rumah.',
            'Response adalah balasan atas permintaan halaman. Isinya file halaman yang diminta browser.',
          ),
          hints: [t('Ingat paket yang tiba di rumahmu.')],
          tags: ['response'],
        }),
      ),
      limitStep({
        analogy: t('Pesan makanan ojek online', 'Pesan antar lewat ojek online'),
        same: [
          t(
            'Ada pemesan, buku alamat, dan toko pengirim.',
            'Pemesan itu browser, buku alamat itu DNS. Toko pengirim itu server.',
          ),
        ],
        different: [
          t(
            'Toko web mengirim fotokopi, jadi isinya tidak habis.',
            'Paket web adalah salinan file, bukan barang yang habis. Perjalanannya hanya butuh milidetik.',
          ),
        ],
        riskyAnalogy: true,
      }),
      qStep({
        id: 'a01-l04-q1',
        type: 'order',
        prompt: t(
          'Urutkan perjalanan halaman, dari awal sampai tampil.',
          'Urutkan perjalanan halaman dari ketikan alamat sampai tampil di layar.',
        ),
        difficulty: 2,
        items: [
          { id: 's1', label: t('Kamu mengetik alamat toko', 'Kamu mengetik alamat di browser') },
          {
            id: 's2',
            label: t('Buku alamat mencari nomor, lalu pesanan dikirim', 'DNS mencari alamat IP, lalu browser mengirim request'),
          },
          { id: 's3', label: t('Toko mengirim paket balasan', 'Server membalas dengan response') },
          { id: 's4', label: t('Halaman muncul di layarmu', 'Browser menampilkan halaman di layar') },
        ],
        answer: ['s1', 's2', 's3', 's4'],
        explainCorrect: t(
          'Buku alamat menemukan toko, lalu browser mengirim pesanan. Toko membalas dan halaman muncul di layar.',
          'Browser mengirim permintaan setelah DNS menemukan alamat IP. Lalu browser menampilkan halaman dari balasan server.',
        ),
        hints: [t('Pikirkan kurir yang mencari alamat lebih dulu.', 'Alamat harus ditemukan sebelum pesan dikirim.'), undefined],
        tags: ['browser', 'dns', 'request', 'response'],
      }),
      qStep(
        makeTf({
          id: 'a01-l04-q4',
          prompt: t('Situs Rani tetap bisa dibuka selama server bisa diakses, meski laptop Rani mati.'),
          modes: ['pro'],
          answer: true,
          explainCorrect: t('Browser mengambil halaman dari server. Laptop Rani hanya dipakai untuk membuat atau mengelola situs.'),
          explainWrong: t('Laptop Rani dan server menjalankan tugas yang berbeda. Selama server bisa mengirim halaman, orang tetap bisa membukanya.'),
          hints: [t('Perangkat mana yang mengirim halaman ke pengunjung?')],
          tags: ['server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l04-q5',
          type: 'limit',
          analogy: t('Kurir ojek online'),
          prompt: t(
            'Toko web mengirim halaman ke kamu. Apa yang terjadi pada isi tokonya?',
            'Apa batas analogi kurir ojek online untuk pengiriman halaman web?',
          ),
          choices: [
            {
              id: 'copy',
              label: t(
                'Isinya tetap utuh seperti semula',
                'Server hanya menyalin file, aslinya tetap ada',
              ),
            },
            {
              id: 'addr',
              label: t(
                'Isinya berkurang seperti barang yang terjual',
                'Pemesan harus tahu alamat tujuan sebelum mengirim pesan',
              ),
              explainWrong: t(
                'Toko web tidak kehabisan halaman. Ia hanya mengirim salinan.',
                'Itu bagian yang mirip, bukan batas analogi. Kurir dan browser sama-sama butuh alamat.',
              ),
            },
            {
              id: 'wait',
              label: t(
                'Tokonya tutup sampai barangnya kembali',
                'Pemesan menunggu paket balasan sampai di rumah',
              ),
              explainWrong: t(
                'Toko web tidak perlu tutup. Isinya tidak berkurang saat dikirim.',
                'Itu bagian yang mirip, bukan batas analogi. Pemesan kurir dan browser sama-sama menunggu.',
              ),
            },
          ],
          answer: 'copy',
          explainCorrect: t(
            'Toko web mengirim salinan halaman. Toko kue kehilangan satu kue saat menjualnya.',
            'File asli tetap ada di server dan hanya disalin. Barang fisik habis setelah dikirim.',
          ),
          hints: [t('Bayangkan toko kue saat kuenya dibeli.', 'Pikirkan apa yang terjadi pada file asli saat disalin.')],
          tags: ['server', 'response'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l04-q6',
          type: 'scenario',
          story: t(
            'Sari salah mengetik nama toko. Buku alamat tidak menemukan nomornya.',
            'Sari salah mengetik alamat situs. DNS tidak menemukan alamat server-nya.',
          ),
          prompt: t('Apa yang terjadi pada perjalanan halaman?'),
          difficulty: 2,
          choices: [
            {
              id: 'fail',
              label: t(
                'Pemesan tidak tahu harus ke toko mana',
                'Browser tidak menemukan tujuan dan menampilkan error',
              ),
            },
            {
              id: 'auto',
              label: t(
                'Toko lain yang mirip namanya menjawab',
                'Server lain yang namanya mirip ikut menjawab permintaan',
              ),
              explainWrong: t(
                'Nama yang salah tidak punya nomor. Tidak ada toko yang menjawab.',
                'Alamat yang salah tidak punya server tujuan. Tidak ada yang bisa mengirim halaman.',
              ),
            },
            {
              id: 'css',
              label: t(
                'Halaman tampil, tetapi tanpa warna',
                'Halaman tampil seperti biasa, tetapi tanpa warna',
              ),
              explainWrong: t(
                'Halaman tidak terbuka sama sekali. Warna baru dipikirkan setelah halaman datang.',
                'Halaman tidak terbuka sama sekali. Warna baru diatur setelah halaman diterima.',
              ),
            },
          ],
          answer: 'fail',
          explainCorrect: t(
            'Tanpa nomor alamat, tidak ada tujuan. Seperti kurir yang tidak tahu rumahmu.',
            'Tanpa alamat dari DNS, browser tidak tahu ke mana pergi. Ia lalu menampilkan error.',
          ),
          hints: [t('Apa yang terjadi kalau nomor alamat tidak ketemu?')],
          tags: ['dns', 'browser'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a01-l04-r1',
        prompt: t(
          'Siapa yang mengubah nama toko menjadi nomor alamat?',
          'Apa yang menerjemahkan nama situs menjadi nomor alamat server?',
        ),
        choices: [
          { id: 'dns', label: t('Buku alamat internet', 'DNS') },
          {
            id: 'res',
            label: t('Paket balasan dari toko', 'Response'),
            explainWrong: t(
              'Paket balasan adalah jawaban dari toko. Ia bukan buku alamat.',
              'Response adalah balasan dari server. Ia bukan penerjemah alamat.',
            ),
          },
          {
            id: 'app',
            label: t('Aplikasi pembuka web', 'Browser'),
            explainWrong: t(
              'Aplikasi pembuka web adalah si pemesan. Buku alamat yang mencari nomor.',
              'Browser memesan halaman. DNS yang menerjemahkan nama situs.',
            ),
          },
        ],
        answer: 'dns',
        explainCorrect: t(
          'Buku alamat internet mencocokkan nama toko dengan nomornya. Browser lalu tahu ke mana harus mengirim pesanan.',
          'DNS mencocokkan nama situs dengan alamat IP server, misalnya 203.0.113.5.',
        ),
        hints: [t('Ingat buku kontak di HP-mu.')],
        tags: ['dns'],
      }),
      makeMcq({
        id: 'a01-l04-r2',
        prompt: t(
          'Kamu meminta halaman ke toko. Pesan itu disebut apa?',
          'Pesan yang meminta halaman dari browser ke server disebut apa?',
        ),
        choices: [
          { id: 'req', label: t('Pesanan dari kamu', 'Request') },
          {
            id: 'res',
            label: t('Jawaban dari toko', 'Response'),
            explainWrong: t(
              'Jawaban dikirim toko sesudah pesanan datang. Pesanan lebih dulu.',
              'Response adalah balasan dari server. Pesan permintaannya disebut request.',
            ),
          },
          {
            id: 'num',
            label: t('Nomor alamat toko', 'DNS'),
            explainWrong: t(
              'Nomor alamat hanya menunjuk tokonya. Ia bukan pesananmu.',
              'DNS hanya menerjemahkan alamat. Ia bukan pesan permintaan.',
            ),
          },
        ],
        answer: 'req',
        explainCorrect: t(
          'Pesananmu dikirim lebih dulu ke toko. Toko lalu membalasnya.',
          'Request adalah permintaan halaman yang dikirim browser.',
        ),
        hints: [t('Siapa yang bicara lebih dulu, kamu atau toko?')],
        tags: ['request', 'response'],
      }),
    ],
    recap: t(
      'Cari alamat toko, kirim pesanan, lalu terima paket dari toko.',
      'Setelah alamat ditemukan lewat DNS, permintaan dikirim. Server membalas dengan response.',
    ),
    companion: {
      talkPrompts: ['Kalau tidak ada buku alamat internet, apa yang harus kamu hafal?'],
      offlineActivity:
        'Cari satu nomor di buku kontak HP. Buku alamat internet bekerja dengan cara yang sama.',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // a01-l05  Membaca alamat URL
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a01-l05',
    worldId: 'a01',
    title: 'Membaca alamat URL',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menunjuk bagian-bagian alamat web.',
      'Kamu bisa menunjuk dan menyebut bagian-bagian sebuah URL.',
    ),
    estMinutes: 5,
    introducesTerms: ['url', 'domain', 'https'],
    usesTerms: ['browser', 'server'],
    stickerId: 'alamat-rumah',
    warmupFrom: 'a01-l04',
    atWork:
      'Kamu akan membaca bagian URL di bilah alamat saat link produk membuka halaman yang salah.',
    steps: [
      storyStep('a01/alamat-rumah.svg', [
        rJunior('Alamat rumah punya nama jalan dan nomor rumah. Alamat web juga punya bagian-bagian. Apa saja bagian itu?'),
        rPro('Link produk Toko Rani berbunyi '),
        rCode('https://toko-rani.example/produk?warna=merah', ['pro']),
        rPro('. Apa arti tiap bagiannya?'),
      ]),
      conceptStep({
        title: t('Bagian-bagian alamat web', 'Bagian-bagian URL'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a01', topic: 'bagian-url' },
        alt: t(
          'Contoh alamat toko dibagi menjadi empat bagian.',
          'Contoh URL https://toko-rani.example/produk?warna=merah terbagi menjadi 4 bagian.',
        ),
        code: {
          lang: 'text',
          code: 'https://toko-rani.example/produk?warna=merah',
          highlight: [1],
        },
        body: [
          rTerm('url', 'URL', 'URL'),
          rJunior(' adalah alamat lengkap untuk membuka halaman. Bayangkan alamat pesanan dengan cara antar, toko, rak, dan ukuran. Contohnya antar langsung dari Toko Rani, rak sepatu, ukuran 38.'),
          rPro(' adalah alamat lengkap sebuah halaman web. Bagian pertama menyebut protokol, yaitu aturan kirim data. Setelah itu ada '),
          pTerm('domain', 'domain'),
          rPro(', yaitu nama situs. Path menunjuk halaman. Query berisi catatan tambahan seperti saringan produk.'),
        ],
      }),
      simStep(
        'restoran-web',
        t(
          'Pesan Halaman Produk, lalu pilih halaman lain dari toko yang sama.',
          'Pesan Halaman Produk, lalu pilih halaman lain untuk melihat peran path dalam satu situs.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a01-l05-q1',
          prompt: t(
            'Kamu mau memesan di Toko Rani. Bagian mana yang akan membedakannya dari Toko Dimas?',
            'Pada https://toko-rani.example/produk, bagian mana yang disebut domain?',
          ),
          choices: [
            { id: 'dom', label: t('Nama tempat tujuan', 'toko-rani.example') },
            {
              id: 'https',
              label: t('Cara antar pesanan', 'https:// di bagian depan'),
              explainWrong: t(
                'Cara antar memberi tahu bagaimana pesanan dikirim. Dua toko bisa memakai cara yang sama.',
                'https:// menentukan protokol yang dipakai. Nama situs ada setelahnya.',
              ),
            },
            {
              id: 'path',
              label: t('Rak isi pesanan', '/produk di bagian akhir'),
              explainWrong: t(
                'Bagian itu menunjuk rak di dalam toko. Tokonya sudah dipilih lebih dulu.',
                '/produk adalah path, yaitu halaman tujuan di dalam situs. Nama situs ada sebelumnya.',
              ),
            },
          ],
          answer: 'dom',
          explainCorrect: t(
            'Nama toko menunjukkan toko yang dituju. Seperti papan nama di depan toko.',
            'Dalam contoh ini, domain toko-rani.example berada di antara https:// dan /produk.',
          ),
          hints: [t('Apa yang terbaca di papan depan masing-masing toko?', 'Cari nama unik situs.')],
          tags: ['domain', 'url'],
        }),
      ),
      conceptStep({
        title: t('Cara antar sebuah pesanan', 'HTTP dan HTTPS'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a01', topic: 'https-aman' },
        alt: t(
          'Pesanan dikirim dari toko ke pemesan.',
          'Amplop terbuka (HTTP) dan amplop tersegel gembok (HTTPS).',
        ),
        body: [
          rJunior('Kamu bisa memilih cara antar pesanan. Kurir bisa mengantar langsung atau menitipkannya di pos. Alamat web juga memberi tahu cara komputer saling berkirim pesan.'),
          pTerm('https', 'HTTPS'),
          rPro(' adalah HTTP dengan enkripsi, yaitu penguncian isi pesan. HTTPS melindungi isi pesan dalam perjalanan. Situs palsu juga bisa memakai sambungan ini.'),
        ],
      }),
      limitStep({
        analogy: t('Alamat web seperti alamat kiriman', 'URL seperti alamat rumah'),
        same: [
          t(
            'Keduanya menuntun kamu ke tempat yang tepat.',
            'Alamat rumah dan URL sama-sama menuntun ke tujuan. Amplop terkunci mirip HTTPS.',
          ),
        ],
        different: [
          t(
            'Catatan tambahan di alamat web bisa mengubah isi halaman.',
            'Query seperti ?warna=merah mengubah isi halaman yang dikirim. Catatan di amplop tidak mengubah isi rumah.',
          ),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeMcq({
          id: 'a01-l05-q2',
          type: 'analogy',
          prompt: t(
            'Mana petunjuk tentang cara mengantar pesanan?',
            'Perbedaan HTTP dan HTTPS paling mirip dengan apa?',
          ),
          choices: [
            { id: 'seal', label: t('Antar langsung ke rumah', 'Kartu pos dan surat bergembok') },
            {
              id: 'pen',
              label: t('Kirim sepatu ukuran 38', 'Surat pendek dan surat panjang'),
              explainWrong: t(
                'Ukuran membantu memilih barang. Cara antar memberi tahu bagaimana barang dikirim.',
                'Panjang pesan tidak berhubungan dengan HTTPS. Bedanya ada pada penguncian isi pesan.',
              ),
            },
            {
              id: 'car',
              label: t('Ambil dari Toko Rani', 'Surat biasa dan surat kilat'),
              explainWrong: t(
                'Nama toko menunjukkan asal pesanan. Kurir masih perlu tahu cara mengantarnya.',
                'Kecepatan pengiriman bukan beda utama HTTP dan HTTPS. Yang berbeda adalah penguncian pesan.',
              ),
            },
          ],
          answer: 'seal',
          explainCorrect: t(
            'Antar langsung memberi tahu kurir cara mengirim pesanan. Ia mengantarnya sendiri sampai ke rumah.',
            'HTTPS mengenkripsi pesan, seperti amplop terkunci. Pihak di jaringan tidak bisa membacanya.',
          ),
          hints: [t('Pikirkan apa yang dilakukan setelah barang siap.', 'Ingat siapa yang boleh membaca isi surat.')],
          tags: ['https'],
        }),
      ),
      qStep({
        id: 'a01-l05-q3',
        type: 'match',
        prompt: t(
          'Pasangkan tiap bagian alamat toko sepatu dengan tugasnya.',
          'Pasangkan potongan URL https://toko-rani.example/sepatu?ukuran=38 dengan perannya.',
        ),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('Antar langsung', 'https://') },
          { id: 'l2', label: t('Toko Rani', 'toko-rani.example') },
          { id: 'l3', label: t('Rak sepatu', '/sepatu') },
          { id: 'l4', label: t('Ukuran 38', '?ukuran=38') },
        ],
        right: [
          { id: 'r1', label: t('Menentukan cara barang dikirim', 'Protokol dengan enkripsi') },
          { id: 'r2', label: t('Memilih satu tempat untuk berbelanja', 'Nama domain toko') },
          { id: 'r3', label: t('Menunjuk bagian di dalam toko', 'Path halaman tujuan') },
          { id: 'r4', label: t('Memilih barang yang pas untuk pembeli', 'Query filter tambahan') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
        explainCorrect: t(
          'Bagian alamat bekerja bersama. Kamu tahu cara antar, toko yang dituju, rak, dan pilihannya.',
          'HTTPS menentukan protokol dan mengenkripsi pesan. Domain menunjuk situs, path menunjuk halaman, dan query menyaring isi.',
        ),
        hints: [t('Bayangkan kamu memesan sepatu dari rumah.', 'Lihat fungsi tiap potongan alamat.'), undefined],
        tags: ['url', 'domain', 'https'],
      }),
      qStep(
        makeMcq({
          id: 'a01-l05-q4',
          type: 'limit',
          analogy: t('URL seperti alamat rumah'),
          prompt: t('Apa yang membuat URL berbeda dari alamat rumah biasa?'),
          modes: ['pro'],
          choices: [
            { id: 'q', label: t('Catatan ?warna=merah mengubah isi yang dikirim') },
            {
              id: 'uniq',
              label: t('Setiap tempat punya nama pengenal yang unik'),
              explainWrong: t('Itu persamaan alamat rumah dan URL. Nama unik juga dipakai pada domain.'),
            },
            {
              id: 'guide',
              label: t('Dipakai pengantar untuk menemukan tujuan kiriman'),
              explainWrong: t('Itu juga persamaan. Alamat rumah dan URL sama-sama menuntun ke tujuan.'),
            },
          ],
          answer: 'q',
          explainCorrect: t('Query meminta server menyesuaikan halaman yang dikirim balik. Catatan di alamat rumah tidak mengubah rumahnya.'),
          hints: [t('Cari bagian yang bisa mengubah isi halaman.')],
          tags: ['url'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a01-l05-q5',
          prompt: t(
            'Toko yang sama bisa punya alamat berbeda untuk 2 halaman.',
            'Situs yang meminta kata sandi wajib memakai HTTPS agar datanya tidak disadap.',
          ),
          answer: true,
          explainCorrect: t(
            'Halaman sepatu dan halaman tas punya alamat berbeda. Seperti rak berbeda di toko yang sama.',
            'HTTPS menjaga kata sandi tetap terenkripsi saat dikirim. Pastikan juga alamat situsnya benar sebelum mengisi kata sandi.',
          ),
          explainWrong: t(
            'Tiap halaman punya tujuan sendiri. Satu toko bisa punya banyak halaman.',
            'Data rahasia tidak boleh dikirim lewat HTTP biasa. HTTPS mengenkripsi isinya.',
          ),
          hints: [t('Bayangkan rak sepatu dan rak tas.', 'Ingat amplop terkunci untuk surat rahasia.')],
          tags: ['https'],
        }),
      ),
      qStep({
        id: 'a01-l05-q6',
        type: 'type',
        modes: ['pro'],
        prompt: t('Tulis nama bagian URL setelah tanda ? yang mengirim filter, misalnya ?warna=merah.'),
        difficulty: 2,
        accept: ['query', 'query parameter', 'query string'],
        explainCorrect: t('Bagian setelah tanda tanya disebut query atau query parameter.'),
        hints: [t('Bagian ini menyaring isi halaman.'), undefined],
        tags: ['url'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a01-l05-r1',
        prompt: t(
          'Apa yang diberi tahu bagian pertama alamat web?',
          'Apa yang dilakukan HTTPS pada pesan yang dikirim?',
        ),
        choices: [
          { id: 's', label: t('Cara pesan dikirim', 'Mengunci isinya dengan enkripsi') },
          {
            id: 'slow',
            label: t('Tujuan pesan di toko', 'Mempercepat pengirimannya'),
            explainWrong: t(
              'Bagian lain menunjukkan tujuan pesanan. Bagian pertama memberi tahu cara mengirimnya.',
              'HTTPS tidak mempercepat pengiriman. Tugasnya mengunci isi pesan.',
            ),
          },
          {
            id: 'hide',
            label: t('Isi catatan untuk toko', 'Menyembunyikan alamat situs'),
            explainWrong: t(
              'Catatan ditambahkan di akhir alamat. Bagian pertama memberi tahu cara mengirim pesan.',
              'HTTPS melindungi isi pesan. Nama situs masih bisa diketahui dari informasi jaringan lain.',
            ),
          },
        ],
        answer: 's',
        explainCorrect: t(
          'Cara mengirim ada di bagian awal alamat. Seperti petunjuk antar langsung untuk kurir.',
          'HTTPS mengunci isi pesan dengan enkripsi. Pihak di jaringan tidak bisa membacanya.',
        ),
        hints: [t('Ingat apa yang perlu diketahui kurir.', 'Ingat amplop yang dikunci dengan gembok.')],
        tags: ['https'],
      }),
      makeMcq({
        id: 'a01-l05-r2',
        prompt: t(
          'Kamu mau mencari sepatu di toko lain. Bagian alamat mana yang berubah?',
          'Bagian alamat web yang menjadi nama utama situs disebut apa?',
        ),
        choices: [
          { id: 'd', label: t('Nama tempat tujuan', 'Domain') },
          {
            id: 'p',
            label: t('Rak barang yang dicari', 'Halaman tujuan'),
            explainWrong: t(
              'Bagian itu menunjuk rak di dalam toko. Nama toko ada di bagian lain.',
              'Halaman tujuan ada setelah garis miring, misalnya /produk. Ia bukan nama utama situs.',
            ),
          },
          {
            id: 'h',
            label: t('Cara mengantar pesanan', 'Protokol'),
            explainWrong: t(
              'Cara mengirim bisa sama di kedua toko. Tujuan pesan tetap berbeda.',
              'Protokol ada di awal alamat, misalnya bagian https:// di depan. Ia bukan nama situs.',
            ),
          },
        ],
        answer: 'd',
        explainCorrect: t(
          'Nama toko menunjukkan toko yang dituju. Seperti papan nama di depan toko.',
          'Domain adalah nama pengenal utama situs, misalnya toko-rani.example.',
        ),
        hints: [t('Barangnya sama. Perhatikan tempat yang kamu datangi.')],
        tags: ['domain'],
      }),
    ],
    recap: t(
      'Alamat web bisa memuat cara kirim, nama situs, halaman, dan catatan.',
      'Dalam URL, protokol mengatur cara kirim. Domain menunjuk situs, path menunjuk halaman, dan query memberi keterangan tambahan.',
    ),
    companion: {
      talkPrompts: ['Bagaimana kamu tahu saat membuka halaman lain dari situs yang sama?'],
      offlineActivity:
        'Buat alamat rumah khayalan. Tandai nama jalan dan nomor rumah dengan warna berbeda.',
    },
  }),

  // ---------------------------------------------------------------------------------------------
  // a01-l06  Page structure, appearance, and behavior
  // ---------------------------------------------------------------------------------------------
  makeLesson({
    id: 'a01-l06',
    worldId: 'a01',
    title: 'Kerangka, tampilan, dan gerak web',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan isi, tampilan, dan gerak halaman web.',
      'Kamu bisa membedakan kerangka, tampilan, dan perilaku sebuah halaman web.',
    ),
    estMinutes: 6,
    introducesTerms: ['html', 'css', 'javascript'],
    usesTerms: ['browser', 'frontend'],
    stickerId: 'rumah-lapis',
    warmupFrom: 'a01-l05',
    atWork:
      'Kamu akan membuka tab Elements di DevTools untuk melihat mengapa tombol tampil salah atau tidak bereaksi.',
    steps: [
      storyStep('a01/rumah-lapis.svg', [
        rText(
          'Tembok membentuk rumah, cat mewarnainya, dan listrik menyalakan bel. Di web, apa yang membuat tombol bereaksi seperti bel?',
          'Tombol Beli di Toko Rani tampak rapi, tetapi tidak bereaksi saat diketuk. Lapisan mana yang bermasalah?',
        ),
      ]),
      conceptStep({
        title: t('HTML: tembok dan kerangka', 'HTML: kerangka halaman'),
        visualName: 'HtmlTreeDiagram',
        visualProps: { worldId: 'a01', topic: 'html-kerangka' },
        alt: t('Kerangka halaman berisi judul, paragraf, dan tombol polos.'),
        body: [
          rTerm('html', 'HTML', 'HTML'),
          rText(
            ' adalah tembok dan kerangka halaman. Judul, tulisan, gambar, dan tombol ada di sini.',
            ' adalah bahasa yang menentukan isi dan kerangka halaman: judul, paragraf, gambar, dan tombol.',
          ),
        ],
      }),
      simStep(
        'restoran-web',
        t(
          'Ketuk satu tombol dan lihat apa yang berubah.',
          'Ketuk tombol di simulasi dan perhatikan bagian mana yang berubah.',
        ),
      ),
      conceptStep({
        title: t('CSS: cat dan hiasan', 'CSS: tampilan halaman'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a01', topic: 'css-dandanan' },
        alt: t(
          'Halaman yang diberi warna, sudut bulat, dan tata letak.',
          'Halaman polos yang diberi warna, sudut bulat, dan tata letak lewat CSS.',
        ),
        body: [
          rTerm('css', 'CSS', 'CSS'),
          rText(
            ' adalah cat dan hiasan halaman. CSS mengatur warna, huruf, jarak, dan posisi. Penggerak halaman menanggapi ketukan, seperti listrik yang menyalakan bel.',
            ' adalah bahasa yang mengatur tampilan: warna, ukuran huruf, jarak, dan posisi. Tanpa CSS, halaman tetap terbaca tetapi polos.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a01-l06-q2',
          prompt: t(
            'Kamu ingin tombol berwarna hijau dan bersudut bulat. Mana yang kamu ubah?',
            'Kamu ingin mengubah warna latar tombol menjadi hijau dan sudutnya bulat. Mana yang kamu edit?',
          ),
          choices: [
            { id: 'css', label: t('CSS, cat dan hiasan', 'CSS') },
            {
              id: 'html',
              label: t('HTML, tembok dan pintu', 'HTML'),
              explainWrong: t(
                'Tembok hanya membuat tombol ada. Warnanya dipilih lewat cat.',
                'HTML hanya menentukan bahwa tombol ada, bukan warnanya. Warna diatur CSS.',
              ),
            },
            {
              id: 'dns',
              label: t('Penggerak halaman', 'JavaScript'),
              explainWrong: t(
                'Listrik membuat tombol bereaksi. Warna dan bentuknya urusan cat.',
                'JavaScript mengatur reaksi tombol, bukan warnanya. Warna diatur CSS.',
              ),
            },
          ],
          answer: 'css',
          explainCorrect: t(
            'Cat dan hiasan mengatur warna dan bentuk. Itu tugas CSS, seperti mengecat dinding.',
            'CSS mengatur warna dan bentuk visual. Tombolnya sendiri tetap ada di HTML.',
          ),
          hints: [t('Siapa yang mengecat dinding rumah?')],
          tags: ['css'],
        }),
      ),
      conceptStep({
        title: t('JavaScript: perilaku halaman'),
        modes: ['pro'],
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a01', topic: 'js-gerak' },
        alt: t('Tombol Beli berubah menjadi Terbeli saat diklik berkat JavaScript.'),
        body: [
          pTerm('javascript', 'JavaScript'),
          rPro(' adalah bahasa pemrograman yang membuat halaman bereaksi saat tombol diketuk atau kotak diisi.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a01-l06-q3',
          prompt: t(
            'Kamu menekan tombol Beli, dan angka keranjang bertambah 1. Siapa yang bekerja?',
            'Kamu menekan tombol "Beli" dan angka keranjang langsung bertambah 1. Bagian mana yang bekerja?',
          ),
          choices: [
            { id: 'js', label: t('Penggerak halaman', 'JavaScript') },
            {
              id: 'css',
              label: t('CSS, cat dan hiasan', 'CSS, pengatur tampilan'),
              explainWrong: t(
                'Cat hanya mengubah tampilan. Cat tidak bisa menghitung.',
                'CSS hanya mengatur tampilan. Ia tidak bisa menambah angka.',
              ),
            },
            {
              id: 'html',
              label: t('HTML, tembok dan pintu', 'HTML, penyusun kerangka'),
              explainWrong: t(
                'Tembok berdiri diam. Ia tidak bereaksi saat tombol ditekan.',
                'HTML hanya menyusun isi halaman. Ia tidak bereaksi pada klik.',
              ),
            },
          ],
          answer: 'js',
          explainCorrect: t(
            'Penggerak halaman menanggapi ketukan dan menambah angka. Seperti listrik yang menyalakan bel saat ditekan.',
            'JavaScript menangani klik lalu menambah angka keranjang. Dua bahasa lain tidak menghitung.',
          ),
          hints: [t('Siapa yang menyalakan lampu saat saklar ditekan?')],
          tags: ['javascript'],
        }),
      ),
      limitStep({
        analogy: t('Rumah 3 lapis: tembok, cat, listrik', 'Rumah tiga lapis'),
        same: [
          t(
            'Tanpa tembok, rumah tidak berdiri. Tanpa cat, rumah polos.',
            'HTML memberi kerangka. CSS mengatur tampilan. JavaScript bisa memperbarui keranjang tanpa memuat ulang halaman.',
          ),
        ],
        different: [
          t(
            'Cat rumah sulit diganti. Tampilan web berganti dalam sekejap.',
            'Dinding yang sudah dicat sulit diubah. Halaman web berubah dalam sekejap lewat kodenya.',
          ),
        ],
        riskyAnalogy: true,
      }),
      qStep({
        id: 'a01-l06-q1',
        type: 'match',
        prompt: t(
          'Pasangkan tiga bahan web dengan bagian rumah.',
          'Pasangkan tiga bahan utama frontend dengan perumpamaannya pada rumah.',
        ),
        difficulty: 1,
        left: [
          { id: 'html', label: t('HTML') },
          { id: 'css', label: t('CSS') },
          { id: 'js', label: t('Penggerak halaman', 'JavaScript') },
        ],
        right: [
          { id: 'kerangka', label: t('Tembok dan pintu', 'Tembok, pintu, dan kerangka') },
          { id: 'cat', label: t('Cat dan hiasan', 'Cat dinding dan hiasan') },
          { id: 'listrik', label: t('Listrik dan bel', 'Listrik, saklar, dan bel yang berbunyi') },
        ],
        answer: { html: 'kerangka', css: 'cat', js: 'listrik' },
        explainCorrect: t(
          'HTML itu tembok dan CSS itu cat. Penggerak halaman seperti listrik yang menyalakan bel.',
          'Tiap bahasa mengerjakan satu lapis: kerangka, tampilan, dan gerak. Seperti tembok, cat, dan listrik pada rumah.',
        ),
        hints: [t('Bayangkan tembok, cat, dan saklar di rumah.'), undefined],
        tags: ['html', 'css', 'javascript'],
      }),
      qStep(
        makeMcq({
          id: 'a01-l06-q4',
          type: 'limit',
          analogy: t('Rumah tiga lapis'),
          prompt: t(
            'Cat rumah sulit diganti. Bagaimana dengan halaman web?',
            'Hal mana yang TIDAK sama antara halaman web dan rumah fisik?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'dyn',
              label: t(
                'Tampilannya bisa berubah dalam sekejap',
                'Halaman bisa diubah dan ditambah kapan saja lewat JavaScript',
              ),
            },
            {
              id: 'base',
              label: t(
                'Warnanya terkunci setelah halaman dibuat',
                'Kerangka dibuat lebih dulu untuk menampung seluruh isi halaman',
              ),
              explainWrong: t(
                'Warna halaman web bisa diganti kapan saja. Tidak terkunci seperti cat rumah.',
                'Itu kesamaannya: rumah dan halaman sama-sama dimulai dari kerangka. Yang berbeda adalah kemudahan mengubah.',
              ),
            },
            {
              id: 'style',
              label: t(
                'Perubahannya butuh waktu berhari-hari',
                'Cat luar memperindah kerangka, sama seperti CSS memperindah halaman',
              ),
              explainWrong: t(
                'Perubahan web tidak butuh berhari-hari. Cukup sekejap.',
                'Itu juga kesamaannya: cat memperindah rumah, CSS memperindah halaman.',
              ),
            },
          ],
          answer: 'dyn',
          explainCorrect: t(
            'Halaman web bisa berubah dalam sekejap. Dinding rumah yang sudah dicat sulit diubah.',
            'Di web, halaman bisa ditambah atau diubah kapan saja lewat JavaScript. Rumah fisik tidak bisa begitu.',
          ),
          hints: [t('Bandingkan cat dinding dan tampilan layar.')],
          tags: ['html', 'javascript'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a01-l06-q5',
          prompt: t(
            'Halaman tanpa CSS tetap bisa dibaca, hanya saja polos.',
            'Halaman tanpa CSS tetap bisa dibaca, hanya tampilannya polos.',
          ),
          answer: true,
          explainCorrect: t(
            'Rumah tanpa cat tetap berdiri. Tulisan dan gambar tetap terlihat.',
            'Browser tetap menampilkan teks, gambar, dan tautan dari HTML polos.',
          ),
          explainWrong: t(
            'Tembok sudah cukup untuk berdiri. Cat hanya membuatnya cantik.',
            'HTML saja sudah cukup menampilkan isi. CSS membuatnya menarik.',
          ),
          hints: [t('Bayangkan rumah yang belum dicat.')],
          tags: ['html', 'css'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l06-q6',
          type: 'scenario',
          modes: ['pro'],
          story: t('Di halaman Toko Rani, foto kue tidak bergeser saat tombol panah kanan diketuk. Gambar dan warnanya sudah rapi.'),
          prompt: t('Lapisan mana yang perlu diperiksa?'),
          difficulty: 3,
          choices: [
            { id: 'js', label: t('JavaScript, logika gerak tombol') },
            {
              id: 'css',
              label: t('Warna huruf dan jarak di CSS'),
              explainWrong: t('Tampilan sudah rapi. Yang tidak bekerja adalah reaksi tombol.'),
            },
            {
              id: 'html',
              label: t('Judul utama dan paragraf di HTML'),
              explainWrong: t('Judul tidak mengatur klik tombol. Reaksi klik dikerjakan JavaScript.'),
            },
          ],
          answer: 'js',
          explainCorrect: t('Tombol yang tidak bereaksi biasanya bermasalah di JavaScript. Tampilannya sudah rapi.'),
          hints: [t('Tampilannya normal, tetapi tombol tidak bereaksi.')],
          tags: ['javascript'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a01-l06-r1',
        prompt: t(
          'Siapa yang mengatur warna, huruf, dan jarak?',
          'Apa tugas utama CSS di halaman web?',
        ),
        choices: [
          { id: 'style', label: t('CSS, cat dan hiasan', 'Mengatur warna, ukuran, jarak, dan posisi') },
          {
            id: 'data',
            label: t('HTML, tembok dan pintu', 'Menentukan isi dan kerangka halaman'),
            explainWrong: t(
              'Tembok membuat halaman berdiri. Warna dan jarak diatur oleh cat.',
              'Itu tugas HTML. CSS mengatur tampilan.',
            ),
          },
          {
            id: 'act',
            label: t('Penggerak halaman', 'Membuat halaman bereaksi pada klik'),
            explainWrong: t(
              'Listrik membuat halaman bereaksi. Warna dan jarak diatur oleh cat.',
              'Itu tugas JavaScript. CSS mengatur tampilan.',
            ),
          },
        ],
        answer: 'style',
        explainCorrect: t(
          'Cat dan hiasan mengatur tampilan halaman. Itu tugas CSS.',
          'CSS adalah dandanan visual halaman: warna, ukuran, jarak, dan posisi.',
        ),
        hints: [t('Siapa yang mengecat dinding rumah?')],
        tags: ['css'],
      }),
      makeMcq({
        id: 'a01-l06-r2',
        prompt: t(
          'Siapa yang membuat halaman bereaksi saat diketuk?',
          'Apa tugas utama JavaScript di halaman web?',
        ),
        choices: [
          { id: 'act', label: t('Penggerak halaman', 'Membuat halaman bereaksi pada klik dan ketikan') },
          {
            id: 'addr',
            label: t('CSS, cat dan hiasan', 'Mengatur warna dan jarak elemen'),
            explainWrong: t(
              'Cat hanya mengubah tampilan. Listrik yang membuat halaman bereaksi.',
              'Itu tugas CSS. JavaScript mengatur reaksi halaman.',
            ),
          },
          {
            id: 'wall',
            label: t('HTML, tembok dan pintu', 'Menentukan judul dan paragraf'),
            explainWrong: t(
              'Tembok berdiri diam. Listrik yang membuat halaman bereaksi.',
              'Itu tugas HTML. JavaScript mengatur reaksi halaman.',
            ),
          },
        ],
        answer: 'act',
        explainCorrect: t(
          'Penggerak halaman menanggapi ketukan. Seperti bel yang berbunyi saat ditekan.',
          'JavaScript membuat halaman hidup dan interaktif.',
        ),
        hints: [t('Siapa yang menyalakan lampu saat saklar ditekan?')],
        tags: ['javascript'],
      }),
    ],
    recap: t(
      'HTML memberi bentuk, CSS memberi gaya, dan penggerak halaman menanggapi ketukan.',
      'HTML membangun kerangka halaman. CSS menata tampilannya. JavaScript mengatur reaksinya.',
    ),
    companion: {
      talkPrompts: ['Bagian web mana yang kamu pilih untuk mewarnai tombol?'],
      offlineActivity:
        'Gambar rumah di kertas. Pakai pensil untuk tembok, krayon untuk cat, dan tulis "Ting!" untuk bel.',
    },
  }),
];
