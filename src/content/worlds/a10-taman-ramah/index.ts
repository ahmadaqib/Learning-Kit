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
  rJunior,
  rPro,
  rTerm,
  rText,
  simStep,
  storyStep,
  t,
} from '@/content/lessonHelpers';
import type { Lesson, Rich, World } from '@/content/schema';

/** Bold or term parts that only one mode sees. Used where Petualang and Pro read two separate sentence paths. */
const rBoldJ = (text: string): Rich => ({ t: 'bold', v: { junior: text, pro: text }, modes: ['junior'] });
const rBoldP = (text: string): Rich => ({ t: 'bold', v: { pro: text }, modes: ['pro'] });
const rTermJ = (termId: string, text: string): Rich => ({
  t: 'term',
  termId,
  v: { junior: text, pro: text },
  modes: ['junior'],
});
const rTermP = (termId: string, text: string): Rich => ({
  t: 'term',
  termId,
  v: { pro: text },
  modes: ['pro'],
});

export const world: World = {
  id: 'a10',
  track: 'A',
  order: 10,
  title: 'Taman Ramah Semua',
  tagline: t(
    'Buat halaman yang bisa dipakai semua orang. Halamanmu tetap mudah dipakai dalam keadaan apa pun.',
    'Kamu bisa membuat halaman yang bisa dipakai semua orang, termasuk lewat keyboard dan pembaca layar.',
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
      'Selamat datang di Taman Ramah Semua. Ayo pastikan semua pengunjung bisa ikut bermain!',
      'Buktikan kamu bisa membuat web yang dipakai semua orang. Soalnya mencakup prinsip POUR dan daftar periksa a11y.',
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
        prompt: t('Selain kursi roda, siapa lagi yang terbantu jalur miring di trotoar?'),
        choices: [
          { id: 'all', label: t('Orang dengan kereta bayi dan koper') },
          {
            id: 'car',
            label: t('Orang yang naik sepeda motor ke pasar'),
            explainWrong: t(
              'Motor lewat jalan raya. Jalur miring membantu orang membawa koper atau mendorong kereta bayi.',
              'Jalur miring di trotoar membantu pejalan kaki yang membawa barang beroda.',
            ),
          },
          {
            id: 'none',
            label: t('Orang yang suka berjalan cepat'),
            explainWrong: t('Jalur miring tidak membuat orang lebih cepat. Ia membuat jalan lebih mudah.'),
          },
        ],
        answer: 'all',
        explainCorrect: t('Satu jalur menolong banyak orang. Web yang ramah juga begitu.'),
        tags: ['aksesibilitas'],
      }),
      makeAnchorMcq({
        id: 'a10-anc-j2',
        prompt: t('Lenganmu digips 2 minggu, jadi sulit memakai mouse. Itu kesulitan jenis apa?'),
        choices: [
          { id: 'temp', label: t('Sementara') },
          {
            id: 'perm',
            label: t('Tetap'),
            explainWrong: t('Gips dilepas saat tangan sembuh. Jadi kesulitannya tidak tetap.'),
          },
          {
            id: 'none',
            label: t('Karena situasi'),
            explainWrong: t('Kesulitan ini datang dari tangan yang cedera. Bukan dari tempatmu berada.'),
          },
        ],
        answer: 'temp',
        explainCorrect: t('Gips dilepas saat tangan sembuh. Kesulitan seperti ini hanya sementara.'),
        tags: ['aksesibilitas'],
      }),
      makeAnchorMcq({
        id: 'a10-anc-j3',
        prompt: t('Mengapa kolom yang salah tidak cukup diberi garis merah saja?'),
        choices: [
          { id: 'cb', label: t('Sebagian orang sulit membedakan warna merah') },
          {
            id: 'ink',
            label: t('Warna merah kurang menarik perhatian'),
            explainWrong: t('Merah memang mencolok. Masalahnya, warna saja tidak cukup untuk semua orang.'),
          },
          {
            id: 'hide',
            label: t('Garis merah membuat tulisan hilang'),
            explainWrong: t('Garis merah tidak menghapus tulisan. Hanya saja, tidak semua mata melihat merah.'),
          },
        ],
        answer: 'cb',
        explainCorrect: t('Warna saja tidak cukup. Tambahkan ikon dan tulisan.'),
        tags: ['aksesibilitas', 'kontras'],
      }),
      makeAnchorMcq({
        id: 'a10-anc-j4',
        prompt: t('Mouse-mu rusak. Tombol keyboard mana yang memindahkan pilihan ke tombol berikutnya?'),
        choices: [
          { id: 'tab', label: t('Tombol Tab') },
          {
            id: 'esc',
            label: t('Tombol Caps Lock'),
            explainWrong: t('Caps Lock hanya mengganti huruf besar dan kecil. Ia tidak memindahkan pilihan.'),
          },
          {
            id: 'vol',
            label: t('Tombol Enter'),
            explainWrong: t('Enter menekan tombol yang sedang dipilih. Ia tidak berpindah.'),
          },
        ],
        answer: 'tab',
        explainCorrect: t('Tab memindahkan pilihan ke tombol berikutnya, seperti menunjuk murid satu per satu.'),
        tags: ['aksesibilitas'],
      }),
      makeAnchorMcq({
        id: 'a10-anc-j5',
        prompt: t('Apa yang perlu dipikirkan di web, tetapi tidak di jalur miring?'),
        type: 'limit',
        analogy: t('Jalur miring di trotoar untuk aksesibilitas'),
        choices: [
          { id: 'soft', label: t('Keyboard atau layar dibacakan') },
          {
            id: 'help',
            label: t('Orang lain ikut terbantu'),
            explainWrong: t('Itu kesamaannya. Jalur miring pun menolong banyak orang.'),
          },
          {
            id: 'ease',
            label: t('Hambatan di jalan dihilangkan'),
            explainWrong: t('Itu juga kesamaannya. Keduanya menghilangkan hambatan.'),
          },
        ],
        answer: 'soft',
        explainCorrect: t(
          'Ada orang yang memakai keyboard atau mendengar layar dibacakan. Halaman perlu mendukung kedua cara itu.',
          'Komponen web harus bisa dikendalikan lewat keyboard dan terbaca oleh pembaca layar.',
        ),
        tags: ['aksesibilitas'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a10-anc-p1',
        prompt: t('Pengunjung membaca artikel di HP di bawah terik matahari, dan layar tampak silau. Ini keterbatasan jenis apa?'),
        choices: [
          { id: 'sit', label: t('Situasional') },
          {
            id: 'perm',
            label: t('Permanen'),
            explainWrong: t('Silau hilang saat pembaca pindah ke tempat teduh. Itu bukan kondisi permanen.'),
          },
          {
            id: 'temp',
            label: t('Sementara akibat cedera'),
            explainWrong: t('Cedera berasal dari tubuh. Silau berasal dari lingkungan, jadi disebut situasional.'),
          },
        ],
        answer: 'sit',
        explainCorrect: t('Silau datang dari lingkungan, bukan dari tubuh. Contoh lain: tempat bising atau satu tangan yang penuh.'),
        tags: ['aksesibilitas'],
      }),
      makeAnchorMcq({
        id: 'a10-anc-p2',
        prompt: t('Level kepatuhan WCAG mana yang menjadi target umum situs web?'),
        choices: [
          { id: 'aa', label: t('Level AA') },
          {
            id: 'z',
            label: t('Level AAA'),
            explainWrong: t('AAA sangat ketat, dan tidak semua konten bisa memenuhinya. Target umumnya AA.'),
          },
          {
            id: 'b',
            label: t('Level A'),
            explainWrong: t('Level A hanya syarat dasar. Target umumnya AA.'),
          },
        ],
        answer: 'aa',
        explainCorrect: t('WCAG punya level A, AA, dan AAA. Level AA menjadi target yang paling umum.'),
        tags: ['pour'],
      }),
      makeAnchorMcq({
        id: 'a10-anc-p3',
        prompt: t('Takarir adalah teks ucapan pada video. Takarir dan alt text pada gambar termasuk prinsip POUR yang mana?'),
        choices: [
          { id: 'p', label: t('Perceivable (dapat ditangkap indra)') },
          {
            id: 'o',
            label: t('Operable (dapat dioperasikan)'),
            explainWrong: t('Operable membahas keyboard, target sentuh, dan batas waktu.'),
          },
          {
            id: 'r',
            label: t('Robust (kode kokoh)'),
            explainWrong: t('Robust membahas kode standar yang bekerja di banyak browser dan alat bantu.'),
          },
        ],
        answer: 'p',
        explainCorrect: t('Perceivable berarti informasi sampai lewat mata atau telinga. Takarir dan alt text menyediakan versi teksnya.'),
        tags: ['pour', 'alt-text'],
      }),
      makeAnchorMcq({
        id: 'a10-anc-p4',
        prompt: t('Apa aturan pertama saat ingin memakai ARIA pada elemen HTML?'),
        choices: [
          { id: 'html', label: t('Pakai elemen HTML asli yang cocok, seperti <button>') },
          {
            id: 'div',
            label: t('Ubah semua elemen menjadi <div>, lalu tambah ARIA'),
            explainWrong: t('Elemen asli sudah membawa dukungan keyboard bawaan. <div> polos belum punya.'),
          },
          {
            id: 'hide',
            label: t('Tambah ARIA pada setiap elemen agar lebih aman'),
            explainWrong: t('ARIA yang berlebihan bisa membingungkan pembaca layar. Pakai seperlunya.'),
          },
        ],
        answer: 'html',
        explainCorrect: t('ARIA menambah keterangan seperti nama tombol ikon ×. Tombol HTML sudah mendukung keyboard.'),
        tags: ['pour', 'semantik'],
      }),
      makeAnchorMcq({
        id: 'a10-anc-p5',
        prompt: t('Bagaimana menulis gambar hiasan murni agar dilewati pembaca layar?'),
        choices: [
          { id: 'empty', label: t('<img src="hiasan.png" alt="">') },
          {
            id: 'omit',
            label: t('<img src="hiasan.png"> tanpa atribut alt'),
            explainWrong: t('Tanpa alt, pembaca layar sering membacakan nama file mentahnya.'),
          },
          {
            id: 'desc',
            label: t('<img src="hiasan.png" alt="hiasan biru nomor lima">'),
            explainWrong: t('Gambar hiasan murni cukup diberi alt kosong supaya tidak mengganggu pembaca layar.'),
          },
        ],
        answer: 'empty',
        explainCorrect: t('alt="" menandai gambar hiasan, jadi pembaca layar melewatinya.'),
        tags: ['alt-text', 'aksesibilitas'],
      }),
      makeAnchorMcq({
        id: 'a10-anc-p6',
        type: 'limit',
        analogy: t('Audit aksesibilitas otomatis seperti Lighthouse'),
        choices: [
          { id: 'auto', label: t('Kejelasan bahasa dan urutan Tab yang masuk akal') },
          {
            id: 'col',
            label: t('Rasio kontras antara teks dan latar'),
            explainWrong: t('Rasio kontras berupa angka, jadi alat otomatis bisa menghitungnya.'),
          },
          {
            id: 'alt',
            label: t('Gambar yang lupa diberi alt'),
            explainWrong: t('Alat otomatis bisa mendeteksi alt yang hilang. Kualitas kalimat alt tetap dinilai manusia.'),
          },
        ],
        prompt: t('Bagian mana dari aksesibilitas yang tidak bisa dinilai alat otomatis seperti Lighthouse?'),
        answer: 'auto',
        explainCorrect: t('Audit otomatis hanya menangkap sebagian masalah teknis. Uji dengan keyboard dan pembaca layar tetap perlu.'),
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
      'Aku bisa menyebut siapa saja yang terbantu oleh web ramah.',
      'Kamu bisa membedakan hambatan permanen, sementara, dan situasional.',
    ),
    estMinutes: 5,
    atWork:
      'Di tim produk, kamu akan menandai halaman yang sulit dipakai saat layar silau atau satu tangan penuh.',
    introducesTerms: ['aksesibilitas'],
    usesTerms: ['ui', 'ux', 'alt-text', 'kontras'],
    stickerId: 'bidang-miring',
    warmupFrom: 'a09-l06',
    steps: [
      storyStep('a10/bidang-miring.svg', [
        rJunior(
          'Tukang membuat jalur miring di trotoar untuk kursi roda. Ibu dengan kereta bayi ikut memakainya. Mengapa banyak orang terbantu?',
        ),
        rPro(
          'Jalur miring di trotoar dibangun untuk kursi roda. Pendorong kereta bayi, penarik koper, dan kurir ikut memakainya.',
        ),
      ]),
      conceptStep({
        title: t('Apa itu aksesibilitas?', 'Makna aksesibilitas'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a10', topic: 'apa-itu-a11y' },
        alt: t('Tulisan a11y: huruf a, angka 11, lalu huruf y.'),
        body: [
          rTerm('aksesibilitas', 'Aksesibilitas', 'Aksesibilitas'),
          rJunior(
            ' artinya web bisa dipakai semua orang. Jalur miring membantu orang memakai kursi roda, membawa koper, atau mendorong kereta. Kata Inggrisnya accessibility, disingkat ',
          ),
          rCode('a11y', ['junior']),
          rJunior(' karena ada 11 huruf di tengah.'),
          rPro(' adalah kemampuan web untuk dipakai semua orang. Singkatannya '),
          rCode('a11y', ['pro']),
          rPro(', karena ada 11 huruf di antara a dan y pada kata accessibility.'),
        ],
      }),
      // Cek cepat (Pro): the first card already shows where the 11 comes from.
      qStep(
        makeMcq({
          id: 'a10-l01-q3',
          modes: ['pro'],
          prompt: t('Angka 11 di tulisan a11y berasal dari mana?'),
          choices: [
            { id: 'len', label: t('Jumlah 11 huruf di antara a dan y') },
            {
              id: 'ver',
              label: t('Nomor versi ke-11 dari standar aksesibilitas'),
              explainWrong: t('a11y adalah singkatan kata accessibility, bukan nomor versi.'),
            },
            {
              id: 'rule',
              label: t('Jumlah 11 aturan pokok aksesibilitas'),
              explainWrong: t('Angka 11 menghitung huruf di antara a dan y, bukan jumlah aturan.'),
            },
          ],
          answer: 'len',
          explainCorrect: t(
            'Kata accessibility punya 11 huruf di antara a dan y. Karena itu, singkatannya ditulis a11y.',
          ),
          hints: [t('Hitung huruf di antara a dan y.')],
          tags: ['aksesibilitas'],
        }),
      ),
      // Cek cepat (Petualang dan Pro): the story and the first card answer this.
      qStep(
        makeMcq({
          id: 'a10-l01-q1',
          type: 'analogy',
          prompt: t(
            'Mengapa jalur miring sering dipakai sebagai contoh aksesibilitas?',
            'Mengapa aksesibilitas sering diumpamakan dengan jalur miring di trotoar?',
          ),
          choices: [
            { id: 'all', label: t('Jalur itu menolong banyak orang sekaligus') },
            {
              id: 'slide',
              label: t('Jalur itu hanya menolong orang berkursi roda'),
              explainWrong: t(
                'Koper dan kereta bayi juga lancar di jalur itu. Banyak orang terbantu.',
                'Pendorong kereta bayi dan penarik koper juga memakainya. Manfaatnya lebih luas dari satu kelompok.',
              ),
            },
            {
              id: 'fast',
              label: t('Jalur itu membuat trotoar tampak lebih indah'),
              explainWrong: t(
                'Jalur miring dibuat supaya mudah dilewati. Bukan untuk hiasan.',
                'Jalur miring dibuat untuk memudahkan lewat, bukan sebagai hiasan. Manfaat praktisnya yang dijadikan contoh.',
              ),
            },
          ],
          answer: 'all',
          explainCorrect: t(
            'Satu perbaikan menolong banyak orang. Kursi roda, koper, dan kereta bayi lewat di jalur yang sama.',
            'Perbaikan untuk satu kelompok ikut menolong banyak orang lain. Fitur aksesibilitas di web bekerja dengan cara yang sama.',
          ),
          hints: [t('Ingat siapa lagi yang lewat di jalur miring.')],
          tags: ['aksesibilitas'],
        }),
      ),
      conceptStep({
        title: t('Tiga macam kesulitan', 'Permanen dan sementara'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a10', topic: 'disabilitas-permanen-sementara' },
        alt: t(
          'Contoh kesulitan tetap dan sementara: mata yang tidak melihat dan tangan digips.',
          'Contoh hambatan permanen (tunanetra) dan sementara (lengan digips).',
        ),
        body: [
          rJunior('Ada kesulitan yang '),
          rBoldJ('tetap'),
          rJunior(', seperti mata yang tidak bisa melihat. Ada yang '),
          rBoldJ('sementara'),
          rJunior(', seperti tangan yang digips. Ada juga yang '),
          rBoldJ('karena situasi'),
          rJunior(', seperti layar silau di bawah matahari.'),
          rPro('Hambatan '),
          rBoldP('permanen'),
          rPro(' tidak berubah: tunanetra, buta warna, tuli, atau gerak terbatas. Hambatan '),
          rBoldP('sementara'),
          rPro(' akan pulih: lengan digips, mata lelah, atau baru pulih operasi.'),
        ],
      }),
      simStep(
        'taman-akses',
        t(
          'Ketuk setiap syarat taman untuk melihat apa yang membantu pengunjung.',
          'Buka panel Pemeriksa Aksesibilitas dan coba tiap syarat.',
        ),
      ),
      conceptStep({
        title: t('Keterbatasan situasional'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a10', topic: 'keterbatasan-situasional' },
        alt: t('Situasi silau matahari, satu tangan menggendong adik, dan tempat bising.'),
        body: [
          rPro('Hambatan '),
          rBoldP('situasional'),
          rPro(
            ' datang dari lingkungan, bukan dari tubuh. Contohnya layar silau di luar ruangan, tempat sangat bising, atau hanya satu tangan yang bebas.',
          ),
        ],
        modes: ['pro'],
      }),
      qStep(
        makeTf({
          id: 'a10-l01-q6',
          prompt: t(
            'Web yang ramah bisa menolong siapa saja.',
            'Aksesibilitas web berguna bagi semua orang, bukan hanya penyandang disabilitas permanen.',
          ),
          answer: true,
          explainCorrect: t(
            'Tulisan ucapan di video menolong saat tempat berisik. Beda terang huruf dan latar membantu saat layar silau.',
            'Siapa pun bisa mengalami hambatan sementara atau situasional setiap hari. Silau, bising, dan tangan yang penuh adalah contohnya.',
          ),
          explainWrong: t(
            'Pernyataan itu benar. Layar silau atau tangan penuh bisa dialami siapa saja.',
            'Pernyataan itu benar: hambatan sementara dan situasional bisa dialami siapa saja.',
          ),
          hints: [t('Ingat saat layar HP-mu silau.', 'Ingat contoh orang di luar ruangan.')],
          tags: ['aksesibilitas'],
        }),
      ),
      qStep({
        id: 'a10-l01-q2',
        type: 'sort',
        prompt: t(
          'Kelompokkan tiap kejadian ke Tetap, Sementara, atau Karena situasi.',
          'Kelompokkan tiap kondisi ke Permanen, Sementara, atau Situasional.',
        ),
        difficulty: 2,
        items: [
          { id: 'c1', label: t('Layar silau di bawah matahari') },
          { id: 'c2', label: t('Tangan kanan sedang digips') },
          { id: 'c3', label: t('Mata yang tidak bisa melihat sejak lahir', 'Tunanetra sejak lahir') },
          { id: 'c4', label: t('Satu tangan memegang tas belanja') },
        ],
        bins: [
          { id: 'perm', label: t('Tetap', 'Permanen'), icon: 'lock' },
          { id: 'temp', label: t('Sementara'), icon: 'clock' },
          { id: 'sit', label: t('Karena situasi', 'Situasional'), icon: 'map-pin' },
        ],
        answer: { c1: 'sit', c2: 'temp', c3: 'perm', c4: 'sit' },
        explainCorrect: t(
          'Gips dipakai sementara, gangguan penglihatan bisa menetap. Silau reda di tempat teduh, tas belanja bisa ditaruh.',
          'Hambatan situasional muncul dari keadaan sekitar dan hilang saat keadaan berubah. Gangguan dari tubuh bisa sementara atau menetap.',
        ),
        hints: [
          t(
            'Tanyakan: sampai kapan kesulitan itu ada?',
            'Dari tubuh atau lingkungan? Kalau dari tubuh, apakah akan pulih?',
          ),
          undefined,
        ],
        tags: ['aksesibilitas'],
      }),
      limitStep({
        analogy: t('Jalur miring di trotoar untuk aksesibilitas'),
        same: [
          t(
            'Satu perbaikan menolong banyak orang.',
            'Perbaikan untuk satu kelompok ikut menolong banyak orang lain.',
          ),
        ],
        different: [
          t(
            'Jalur dilewati roda. Web juga bisa dipakai lewat keyboard.',
            'Trotoar itu beton yang tetap. Web harus bekerja dengan keyboard, pembaca layar, dan zoom.',
          ),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeMcq({
          id: 'a10-l01-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Jalur miring di trotoar'),
          prompt: t('Apa yang perlu diperhatikan di web, tetapi tidak ada di jalur miring?'),
          choices: [
            { id: 'sr', label: t('Dukungan untuk pembaca layar dan keyboard') },
            {
              id: 'wide',
              label: t('Menghilangkan hambatan bagi orang yang membutuhkan'),
              explainWrong: t('Itu kesamaan jalur miring dan web yang aksesibel.'),
            },
            {
              id: 'nice',
              label: t('Ikut berguna bagi orang yang membawa barang'),
              explainWrong: t('Itu juga kesamaannya: banyak orang ikut terbantu.'),
            },
          ],
          answer: 'sr',
          explainCorrect: t(
            'Di web, hambatan datang dari kode yang tidak terbaca pembaca layar atau tidak bisa dipakai dengan keyboard. Jalur miring tidak punya masalah itu.',
          ),
          hints: [t('Pikirkan cara orang menjangkau web, bukan trotoar.')],
          tags: ['aksesibilitas'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a10-l01-q5',
          type: 'scenario',
          story: t(
            'Rani menonton video masak di kereta yang berisik. Ia tidak membawa earphone.',
            'Rani menonton video tutorial memasak di kereta yang berisik. Ia tidak membawa earphone.',
          ),
          prompt: t('Apa yang paling menolong Rani?', 'Fitur aksesibilitas apa yang langsung menolong Rani?'),
          difficulty: 2,
          choices: [
            { id: 'cap', label: t('Tulisan ucapan di video', 'Takarir (teks ucapan) pada video') },
            {
              id: 'anim',
              label: t('Volume suara dinaikkan sampai penuh', 'Volume video dinaikkan sampai maksimal'),
              explainWrong: t(
                'Kereta tetap berisik. Suara keras bisa tenggelam oleh bunyi kereta.',
                'Kebisingan kereta menutupi suara, jadi volume besar belum tentu membantu.',
              ),
            },
            {
              id: 'tiny',
              label: t('Warna video dibuat lebih terang', 'Kecerahan layar dinaikkan sampai penuh'),
              explainWrong: t(
                'Terang layar tidak menolong telinga. Rani butuh cara lain untuk mengerti ucapan.',
                'Kecerahan layar tidak mengubah suara. Rani butuh versi teks dari ucapan.',
              ),
            },
          ],
          answer: 'cap',
          explainCorrect: t(
            'Tulisan ucapan bisa dibaca saat suara tidak terdengar. Seperti membaca teks lagu di layar karaoke.',
            'Takarir awalnya dibuat untuk orang tuli, dan menolong siapa saja di tempat bising. Itu contoh hambatan situasional.',
          ),
          hints: [
            t(
              'Ingat: Rani tidak bisa mendengar dengan jelas.',
              'Rani butuh informasi yang tidak bergantung pada suara.',
            ),
          ],
          tags: ['aksesibilitas'],
        }),
      ),
      qStep({
        id: 'a10-l01-q7',
        type: 'type',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Ketik tulisan 4 karakter yang dipakai developer untuk kata accessibility.'),
        accept: ['a11y', 'A11Y'],
        explainCorrect: t(
          'a11y adalah tulisan standar untuk aksesibilitas. Kamu akan menemukannya di nama kelas CSS dan dokumentasi.',
        ),
        hints: [t('Huruf pertama a, huruf terakhir y.'), undefined],
        tags: ['aksesibilitas'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a10-l01-r1',
        prompt: t(
          'Mana yang terjadi karena situasi, bukan karena tubuh?',
          'Mana contoh keterbatasan situasional saat memakai HP?',
        ),
        choices: [
          { id: 'sun', label: t('Layar silau di luar rumah', 'Layar HP silau di luar ruangan') },
          {
            id: 'bw',
            label: t('Mata yang buta warna sejak kecil', 'Buta warna sejak kecil'),
            explainWrong: t(
              'Buta warna ada pada tubuh dan tidak hilang. Jadi kesulitannya tetap.',
              'Buta warna berasal dari tubuh dan tidak hilang, jadi termasuk kondisi permanen.',
            ),
          },
          {
            id: 'arm',
            label: t('Lengan yang sedang digips'),
            explainWrong: t(
              'Gips berasal dari tangan yang cedera, bukan dari tempat. Nanti ia sembuh.',
              'Lengan digips berasal dari tubuh dan akan pulih, jadi termasuk hambatan sementara.',
            ),
          },
        ],
        answer: 'sun',
        explainCorrect: t(
          'Silau datang dari tempatmu berada. Kalau kamu pindah ke tempat teduh, silaunya hilang.',
          'Silau dan tempat bising berasal dari lingkungan, jadi termasuk situasional.',
        ),
        hints: [t('Ingat: tempat berubah, kesulitan ikut hilang.')],
        tags: ['aksesibilitas'],
      }),
      makeTf({
        id: 'a10-l01-r2',
        prompt: t(
          'Tulisan yang beda jelas dari warna belakangnya mudah dibaca semua orang.',
          'Kontras warna yang jelas membantu penyandang gangguan penglihatan sekaligus orang yang melihat layar di luar ruangan.',
        ),
        answer: true,
        explainCorrect: t(
          'Tulisan gelap di kertas terang mudah dibaca siapa saja. Di bawah matahari pun tetap terbaca.',
          'Kontras yang kuat menolong orang dengan gangguan penglihatan dan siapa pun di bawah cahaya terik.',
        ),
        explainWrong: t(
          'Pernyataan itu benar. Tulisan yang mudah dibaca menolong banyak orang.',
          'Pernyataan itu benar: kontras yang baik menolong gangguan penglihatan dan layar di bawah cahaya terik.',
        ),
        hints: [t('Bayangkan spidol hitam di kertas kuning.')],
        tags: ['aksesibilitas', 'kontras'],
      }),
    ],
    recap: t(
      'Aksesibilitas membuat web bisa dipakai semua orang, dalam keadaan apa pun.',
      'Aksesibilitas (a11y) mengatasi hambatan permanen, sementara, dan situasional. Hasilnya, produk nyaman dipakai semua orang.',
    ),
    companion: {
      talkPrompts: ['Siapa saja yang terbantu oleh jalur miring di trotoar?'],
      offlineActivity:
        'Minta orang di rumah membaca kemasan tanpa menunjukkan gambarnya. Gambar mana yang perlu dijelaskan?',
    },
  }),

  makeLesson({
    id: 'a10-l02',
    worldId: 'a10',
    title: 'Empat prinsip POUR',
    modes: ['pro'],
    objective: t('Kamu bisa mengelompokkan aturan aksesibilitas ke empat prinsip POUR.'),
    estMinutes: 5,
    atWork:
      'Kamu akan melihat POUR di laporan audit aksesibilitas saat klien meminta halaman lolos WCAG AA.',
    introducesTerms: ['pour'],
    usesTerms: ['aksesibilitas', 'alt-text', 'kontras', 'semantik'],
    warmupFrom: 'a10-l01',
    steps: [
      storyStep('a10/taman-pour.svg', [
        rText(
          'Bayangkan taman umum yang ramah: papan petunjuknya terbaca, pintunya mudah dibuka, aturannya jelas, dan bangkunya kokoh. Pedoman WCAG (Web Content Accessibility Guidelines) punya empat prinsip yang disebut ',
        ),
        rTerm('pour', 'POUR'),
        rText('.'),
      ]),
      conceptStep({
        title: t('P dan O: terlihat dan bisa dipakai'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a10', topic: 'pour-po' },
        alt: t('P Perceivable (indra lihat dan dengar) dan O Operable (keyboard dan target sentuh).'),
        body: [
          rBold('P (Perceivable, dapat ditangkap indra)'),
          rText(': informasi bisa dilihat atau didengar, misalnya lewat '),
          rTerm('alt-text', 'alt text'),
          rText(', '),
          rTerm('kontras', 'kontras'),
          rText(', dan teks ucapan di video. '),
          rBold('O (Operable, dapat dioperasikan)'),
          rText(': semua fungsi bisa dipakai lewat keyboard, dengan target sentuh besar dan tanpa batas waktu mendadak.'),
        ],
      }),
      simStep('taman-akses', t('Buka panel Pemeriksa Aksesibilitas dan coba tiap syarat.')),
      conceptStep({
        title: t('U dan R: dipahami dan kokoh'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a10', topic: 'pour-ur' },
        alt: t('U Understandable (bahasa jelas dan error membantu) dan R Robust (kode standar rapi).'),
        body: [
          rBold('U (Understandable, dapat dipahami)'),
          rText(': bahasanya jelas, menu konsisten, dan pesan error menjelaskan cara memperbaikinya. '),
          rBold('R (Robust, kokoh)'),
          rText(': kode yang rapi dan standar bekerja di banyak browser dan alat bantu. WCAG punya level A, AA, dan AAA. Target umumnya '),
          rBold('AA'),
          rText('.'),
        ],
      }),
      qStep({
        id: 'a10-l02-q1',
        type: 'match',
        prompt: t('Pasangkan tiap huruf POUR dengan contohnya di web.'),
        difficulty: 2,
        left: [
          { id: 'p', label: t('Perceivable') },
          { id: 'o', label: t('Operable') },
          { id: 'u', label: t('Understandable') },
          { id: 'r', label: t('Robust') },
        ],
        right: [
          { id: 'r1', label: t('Semua menu bisa dibuka lewat Tab dan Enter') },
          { id: 'r2', label: t('Pesan error menjelaskan cara memperbaiki isian') },
          { id: 'r3', label: t('Gambar punya alt text, video punya takarir') },
          { id: 'r4', label: t('HTML rapi dan valid di banyak browser') },
        ],
        answer: { p: 'r3', o: 'r1', u: 'r2', r: 'r4' },
        explainCorrect: t(
          'Perceivable berarti bisa ditangkap, Operable bisa dipakai, Understandable bisa dipahami, dan Robust kokoh di banyak browser.',
        ),
        hints: [t('Ingat arti tiap huruf: ditangkap, dipakai, dipahami, kokoh.'), undefined],
        tags: ['pour'],
      }),
      conceptStep({
        title: t('ARIA dan aturan pertamanya'),
        visualName: 'HtmlTreeDiagram',
        visualProps: { worldId: 'a10', topic: 'aria-label' },
        alt: t('Contoh tombol ikon silang memakai aria-label="Tutup" bila tidak ada teks.'),
        code: {
          lang: 'html',
          code: '<!-- Pakai HTML asli dulu: -->\n<button aria-label="Tutup">&times;</button>',
        },
        body: [
          rBold('ARIA'),
          rText(' adalah kumpulan atribut yang memberi informasi tentang nama, peran, atau keadaan elemen. Tombol ikon × sudah punya peran tombol dan bisa diberi nama dengan '),
          rCode('aria-label="Tutup"'),
          rText(' supaya terbaca sebagai "Tutup". Aturan pertamanya: kalau ada elemen HTML asli yang cocok, pakai elemen itu dulu.'),
        ],
      }),
      limitStep({
        analogy: t('POUR seperti standar fasilitas taman umum'),
        same: [
          t('Pintu, papan informasi, dan pegangan mengikuti ukuran baku supaya aman dipakai semua tamu.'),
        ],
        different: [
          t('Taman tidak punya kode. Web butuh kode standar agar pembaca layar bisa membacanya.'),
          t('aria-label pada div tidak membuatnya bisa ditekan dengan Enter. Tombol asli sudah bisa.'),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeMcq({
          id: 'a10-l02-q2',
          type: 'mcq',
          prompt: t('Tombol ikon × tidak punya teks di sampingnya. Apa yang perlu ditambahkan?'),
          choices: [
            { id: 'aria', label: t('Beri aria-label="Tutup" pada <button>') },
            {
              id: 'div',
              label: t('Ubah tombol menjadi <div> dengan simbol ×'),
              explainWrong: t(
                'Pembaca layar tidak tahu <div> dengan simbol × adalah tombol tutup. Elemen itu juga tidak bisa difokus dengan Tab.',
              ),
            },
            {
              id: 'color',
              label: t('Tampilkan tooltip saat mouse menyentuh tombol'),
              explainWrong: t(
                'Tooltip muncul saat mouse menyentuh tombol. Pembaca layar dan keyboard belum tentu membacanya.',
              ),
            },
          ],
          answer: 'aria',
          explainCorrect: t(
            'aria-label memberi nama bagi pembaca layar. Tombol × akan dibacakan sebagai "Tutup".',
          ),
          hints: [t('Pembaca layar butuh nama untuk tombol tanpa teks.')],
          tags: ['pour'],
        }),
      ),
      qStep({
        id: 'a10-l02-q3',
        type: 'spotbug',
        prompt: t('Ketuk baris yang memakai div sebagai tombol, padahal ada elemen button asli.'),
        difficulty: 2,
        lines: [
          '<header>',
          '  <div role="button" onclick="tutup()">X</div>',
          '  <button>Cari</button>',
          '</header>',
        ],
        answer: [2],
        explainCorrect: t(
          '<div role="button"> tidak otomatis bisa ditekan dengan Tab dan Enter. <button> asli sudah membawa dukungan itu.',
        ),
        hints: [t('Cari elemen yang menyamar sebagai tombol.'), undefined],
        tags: ['pour', 'semantik'],
      }),
      qStep(
        makeMcq({
          id: 'a10-l02-q4',
          type: 'limit',
          analogy: t('POUR seperti standar fasilitas taman umum'),
          prompt: t('Papan Pintu tidak membuat dinding bisa dibuka. Apa kesalahan serupa saat ARIA dipakai tanpa elemen HTML asli?'),
          choices: [
            { id: 'kbd', label: t('role="button" pada <div> belum membuatnya bisa difokus Tab') },
            {
              id: 'look',
              label: t('ARIA mengubah tampilan elemen menjadi tombol sungguhan'),
              explainWrong: t('ARIA hanya memberi keterangan untuk alat bantu. Tampilan diatur oleh CSS.'),
            },
            {
              id: 'net',
              label: t('ARIA hanya berfungsi di browser lama'),
              explainWrong: t('Browser modern mendukung ARIA. Masalahnya ada pada elemen yang salah dipilih.'),
            },
          ],
          answer: 'kbd',
          explainCorrect: t(
            'Elemen <button> asli sudah punya dukungan fokus dan Enter dari browser. ARIA saja belum menambahkannya.',
          ),
          hints: [t('Ingat apa yang dibawa tombol asli sejak awal.')],
          tags: ['pour', 'semantik'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a10-l02-q5',
          type: 'scenario',
          story: t(
            'Halaman pendaftaran lomba hanya menampilkan "Error 12!". Tidak ada petunjuk kolom mana yang salah atau cara memperbaikinya.',
          ),
          prompt: t('Prinsip POUR mana yang paling dilanggar?'),
          difficulty: 2,
          choices: [
            { id: 'u', label: t('Understandable (dapat dipahami)') },
            {
              id: 'r',
              label: t('Robust (kode valid)'),
              explainWrong: t('Kodenya bisa saja valid. Pesannya yang membingungkan orang.'),
            },
            {
              id: 'o',
              label: t('Operable (ukuran target sentuh)'),
              explainWrong: t('Masalah utamanya ada pada kejelasan bahasa dan petunjuk perbaikan error.'),
            },
          ],
          answer: 'u',
          explainCorrect: t(
            'Understandable meminta pesan error yang mudah dipahami dan menunjukkan cara memperbaikinya.',
          ),
          hints: [t('Pikirkan apakah orang paham apa yang harus dilakukan.')],
          tags: ['pour'],
        }),
      ),
      qStep({
        id: 'a10-l02-q6',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi nama empat prinsip WCAG.'),
        template: 'Perceivable, Operable, ___, ___',
        bank: ['Understandable', 'Robust', 'Reusable', 'Responsive'],
        answer: ['Understandable', 'Robust'],
        explainCorrect: t(
          'Urutannya P-O-U-R: Perceivable, Operable, Understandable, Robust. Hurufnya membentuk kata POUR.',
        ),
        hints: [t('Huruf depan yang hilang membentuk kata POUR.'), undefined],
        tags: ['pour'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a10-l02-r1',
        prompt: t('Kapan atribut ARIA sebaiknya dipakai?'),
        choices: [
          { id: 'only', label: t('Saat HTML asli belum cukup menjelaskan elemen') },
          {
            id: 'always',
            label: t('Di semua elemen, supaya halaman pasti aksesibel'),
            explainWrong: t('ARIA yang berlebihan bisa membingungkan. Utamakan elemen HTML asli.'),
          },
          {
            id: 'never',
            label: t('Tidak pernah, karena pembaca layar hanya membaca HTML'),
            explainWrong: t('ARIA berguna untuk tombol ikon dan komponen khusus yang HTML saja belum cukup.'),
          },
        ],
        answer: 'only',
        explainCorrect: t('Pakai HTML asli dulu. Tambahkan ARIA seperlunya bila HTML biasa belum cukup.'),
        tags: ['pour', 'semantik'],
      }),
      makeMcq({
        id: 'a10-l02-r2',
        prompt: t('Level WCAG mana yang menjadi target umum situs?'),
        choices: [
          { id: 'aa', label: t('Level AA') },
          {
            id: 'aaa',
            label: t('Level AAA di seluruh konten'),
            explainWrong: t('AAA sangat ketat dan tidak semua konten bisa memenuhinya. Target umumnya AA.'),
          },
          {
            id: 'a',
            label: t('Level A saja'),
            explainWrong: t('Level A hanya syarat dasar. Target umumnya AA.'),
          },
        ],
        answer: 'aa',
        explainCorrect: t('AA menjadi target praktis dan standar industri di sebagian besar situs.'),
        tags: ['pour'],
      }),
    ],
    recap: t(
      'Empat prinsip POUR: dapat ditangkap, dapat dipakai, mudah dipahami, dan kokoh. Targetnya AA, dan ARIA dipakai setelah HTML asli.',
    ),
  }),

  makeLesson({
    id: 'a10-l03',
    worldId: 'a10',
    title: 'Daftar periksa aksesibilitas',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengecek warna, tombol, dan keyboard agar web ramah.',
      'Kamu bisa menjalankan daftar periksa aksesibilitas dasar, dari alt text sampai prefers-reduced-motion.',
    ),
    estMinutes: 5,
    atWork:
      'Kamu akan menjalankan daftar ini dengan tombol Tab dan audit Lighthouse sebelum rilis halaman.',
    introducesTerms: [],
    usesTerms: ['aksesibilitas', 'alt-text', 'semantik', 'kontras', 'rem-unit', 'fitts-law'],
    warmupFrom: 'a10-l02',
    steps: [
      storyStep('a10/daftar-periksa-taman.svg', [
        rJunior(
          'Pak Udin memeriksa lampu, papan arah, dan jalur sebelum taman dibuka. Apa yang perlu dicek di web?',
        ),
        rPro(
          'Sebelum halaman baru dirilis, tim memeriksa aksesibilitas seperti petugas mengecek taman sebelum dibuka.',
        ),
      ]),
      conceptStep({
        title: t('Alt text, semantik, dan label form'),
        visualName: 'HtmlTreeDiagram',
        visualProps: { worldId: 'a10', topic: 'checklist-html' },
        alt: t('Contoh gambar ber-alt, label terhubung ke input, dan HTML semantik.'),
        code: {
          lang: 'html',
          code: '<label for="email">Email</label>\n<input id="email" type="email">',
        },
        body: [
          rText('Beri gambar '),
          rTerm('alt-text', 'alt text'),
          rText(', dan sambungkan setiap label ke inputnya. Gambar hiasan diberi alt kosong. Nilai '),
          rCode('for'),
          rText(' pada label harus sama dengan '),
          rCode('id'),
          rText(' pada input. Pakai '),
          rTerm('semantik', 'HTML semantik'),
          rText(' untuk struktur halaman.'),
        ],
        modes: ['pro'],
      }),
      // Cek cepat (Pro): the label and input pair is on the card above.
      qStep({
        id: 'a10-l03-q7',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi atribut agar pembaca layar tahu label milik input email.'),
        template: '<label ___="email">Email</label>\n<input ___="email" type="email">',
        bank: ['for', 'id', 'alt', 'class'],
        answer: ['for', 'id'],
        explainCorrect: t(
          'Nilai for pada label harus sama dengan id pada input. Dengan begitu, mengetuk label akan memilih kolomnya.',
        ),
        hints: [t('Label menunjuk input lewat satu atribut, input membalas lewat atribut lain.'), undefined],
        tags: ['aksesibilitas', 'semantik'],
      }),
      conceptStep({
        title: t('Warna ditemani ikon dan tulisan', 'Kontras 4,5:1 dan bukan warna saja'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a10', topic: 'checklist-warna' },
        alt: t(
          'Dua pesan salah: hanya garis merah, atau warna dengan ikon dan tulisan.',
          'Perbandingan error hanya garis merah dengan error berwarna, berikon peringatan, dan bertulisan.',
        ),
        body: [
          rJunior('Tulisan harus '),
          rTermJ('kontras', 'jelas beda'),
          rJunior(
            ' dari warna belakangnya. Jangan memberi tanda dengan warna saja. Tambahkan ikon dan tulisan agar semua orang mengerti.',
          ),
          rPro('Jaga '),
          rTermP('kontras', 'rasio kontras'),
          rPro(
            ', yaitu beda terang teks dan latarnya, minimal 4,5:1 untuk teks normal. Sampaikan error lewat warna, ikon, dan teks agar jelas bagi orang buta warna.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a10-l03-q1',
          prompt: t(
            'Kolom yang salah hanya diberi garis merah. Mengapa itu kurang ramah?',
            'Mengapa menandai kolom form yang salah hanya dengan warna merah kurang aksesibel?',
          ),
          choices: [
            {
              id: 'cb',
              label: t(
                'Sebagian orang sulit membedakan warna merah',
                'Orang buta warna mungkin tidak bisa membedakan garis merah',
              ),
            },
            {
              id: 'slow',
              label: t(
                'Garis merah terlalu tipis',
                'Garis merah terlalu tipis untuk terlihat di layar HP',
              ),
              explainWrong: t(
                'Tebal garis bukan masalahnya. Masalahnya, sebagian orang sulit melihat warna merah.',
                'Tebal garis bisa diatur. Masalah utamanya, warna saja tidak cukup untuk orang buta warna.',
              ),
            },
            {
              id: 'css',
              label: t(
                'Warna merah terlalu mencolok',
                'Warna merah terlalu mencolok bagi pembaca halaman',
              ),
              explainWrong: t(
                'Merah memang mencolok. Masalahnya, warna saja tidak cukup untuk semua orang.',
                'Mencolok justru membantu orang yang melihat warna. Masalahnya ada pada orang yang tidak bisa membedakannya.',
              ),
            },
          ],
          answer: 'cb',
          explainCorrect: t(
            'Warna saja tidak cukup. Tambahkan ikon dan tulisan, seperti "Email belum diisi".',
            'Tambahkan ikon peringatan dan tulisan seperti "Email belum diisi". Informasi tidak boleh hanya bergantung pada warna.',
          ),
          hints: [t('Ingat: tidak semua mata melihat warna yang sama.')],
          tags: ['aksesibilitas', 'kontras'],
        }),
      ),
      conceptStep({
        title: t('Keyboard, tombol besar, gerak lembut', 'Keyboard, fokus, target sentuh, gerak'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a10', topic: 'checklist-keyboard-gerak' },
        alt: t(
          'Tombol dengan garis penanda, tombol besar, dan gerakan yang bisa dikurangi.',
          'Tombol dengan outline fokus, target sentuh 44–48 px, huruf rem, dan reduced motion.',
        ),
        body: [
          rJunior('Halaman harus bisa dipakai hanya dengan keyboard. Tombol '),
          rCode('Tab', ['junior']),
          rJunior(' memindahkan garis penanda ke tombol berikutnya. Buat '),
          rTermJ('fitts-law', 'tombol besar'),
          rJunior(', '),
          rTermJ('rem-unit', 'huruf yang bisa dibesarkan'),
          rJunior(', dan gerakan lembut.'),
          rPro('Pastikan semua fungsi bisa dipakai lewat keyboard, dengan '),
          rCode('Tab', ['pro']),
          rPro(' untuk berpindah dan outline fokus yang jelas. Jaga '),
          rTermP('fitts-law', 'target sentuh 44–48 px'),
          rPro(' agar mudah diketuk. WCAG 2.2 AA memakai batas dasar 24 × 24 px dengan beberapa pengecualian. Atur ukuran huruf dalam '),
          rTermP('rem-unit', 'rem'),
          rPro('. Hormati juga '),
          rCode('prefers-reduced-motion', ['pro']),
          rPro(', pengaturan yang meminta animasi dikurangi.'),
        ],
      }),
      simStep(
        'taman-akses',
        t(
          'Ketuk ketiga langkah untuk menandai daftar periksa.',
          'Jalankan pemeriksaan dasar, dari alt text sampai pesan error yang jelas.',
        ),
      ),
      limitStep({
        analogy: t('Daftar periksa keamanan taman sebelum dibuka'),
        same: [
          t(
            'Kekurangan penting ketemu lebih awal.',
            'Keduanya menemukan kekurangan penting sebelum banyak orang kesulitan.',
          ),
        ],
        different: [
          t(
            'Di web, cek jalur tombol Tab tanpa mouse.',
            'Audit otomatis Lighthouse hanya menangkap sebagian masalah. Uji dengan Tab tanpa mouse tetap perlu.',
          ),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeMcq({
          id: 'a10-l03-q3',
          type: 'analogy',
          prompt: t(
            'Bagaimana cara termudah mencoba web hanya dengan keyboard?',
            'Apa cara tercepat menguji navigasi keyboard di halaman buatanmu?',
          ),
          choices: [
            {
              id: 'nomouse',
              label: t(
                'Lepas mouse dan uji dengan Tab',
                'Lepas mouse lalu coba Tab, Shift+Tab, dan Enter',
              ),
            },
            {
              id: 'bright',
              label: t(
                'Tekan Caps Lock untuk berpindah tombol',
                'Naikkan kecerahan layar laptop sampai maksimal',
              ),
              explainWrong: t(
                'Caps Lock hanya mengganti huruf besar dan kecil. Tab yang memindahkan pilihan.',
                'Kecerahan layar tidak menguji alur fokus keyboard.',
              ),
            },
            {
              id: 'wifi',
              label: t('Tekan Enter berkali-kali di tombol pertama', 'Perbesar zoom browser sampai 200%'),
              explainWrong: t(
                'Enter menekan tombol yang dipilih. Pakai Tab untuk pindah tombol.',
                'Zoom menguji tata letak, bukan alur fokus keyboard.',
              ),
            },
          ],
          answer: 'nomouse',
          explainCorrect: t(
            'Coba berpindah tanpa mouse. Kamu jadi tahu tombol mana yang tidak bisa dijangkau.',
            'Uji tanpa mouse memperlihatkan tombol yang terlupakan atau kehilangan indikator fokus.',
          ),
          hints: [t('Ingat: mouse rusak, tombol apa yang tersisa?')],
          tags: ['aksesibilitas'],
        }),
      ),
      qStep({
        id: 'a10-l03-q2',
        type: 'sort',
        prompt: t(
          'Kelompokkan tiap kebiasaan ke Ramah atau Kurang ramah.',
          'Kelompokkan praktik di bawah ini ke Ramah aksesibilitas atau Kurang ramah.',
        ),
        difficulty: 2,
        items: [
          {
            id: 'g1',
            label: t('Memberi ikon dan tulisan di samping warna', 'Menulis <label for="nama"> tersambung ke input'),
          },
          {
            id: 'b1',
            label: t('Menghapus garis yang menandai tombol pilihan', 'Menghapus garis penanda tombol tanpa pengganti'),
          },
          {
            id: 'g2',
            label: t('Membuat tombol besar dengan jarak lega', 'Ukuran tombol minimal 44–48 px dengan jarak lega'),
          },
          {
            id: 'b2',
            label: t('Mengunci layar agar tulisan tak bisa dibesarkan', 'Mengunci zoom layar HP agar teks tak bisa dibesarkan'),
          },
        ],
        bins: [
          { id: 'good', label: t('Ramah', 'Ramah aksesibilitas'), icon: 'users' },
          { id: 'bad', label: t('Kurang ramah'), icon: 'lock' },
        ],
        answer: { g1: 'good', b1: 'bad', g2: 'good', b2: 'bad' },
        explainCorrect: t(
          'Tombol besar dan penanda yang mudah dilihat menolong jari dan mata. Seperti papan arah yang mudah dibaca di taman.',
          'Indikator fokus dan zoom adalah jalan masuk bagi orang yang memakai keyboard dan orang yang butuh tulisan besar. Jangan dihapus tanpa pengganti.',
        ),
        hints: [
          t(
            'Tanyakan: apakah ini menolong atau menyulitkan orang?',
            'Tanyakan: apakah praktik ini menambah atau menutup akses?',
          ),
          undefined,
        ],
        tags: ['aksesibilitas', 'fitts-law'],
      }),
      qStep(
        makeMcq({
          id: 'a10-l03-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Daftar periksa otomatis di browser'),
          prompt: t('Bagian mana yang tidak bisa sepenuhnya dinilai audit otomatis Lighthouse?'),
          choices: [
            { id: 'human', label: t('Uji keyboard dan urutan fokus yang masuk akal') },
            {
              id: 'ratio',
              label: t('Menghitung rasio kontras antara teks dan latar'),
              explainWrong: t('Rasio kontras berupa angka, jadi alat otomatis bisa menghitungnya.'),
            },
            {
              id: 'attr',
              label: t('Mengecek elemen <img> yang tidak punya alt'),
              explainWrong: t(
                'Alat otomatis bisa mendeteksi atribut alt yang hilang. Kualitas kalimat alt tetap dinilai manusia.',
              ),
            },
          ],
          answer: 'human',
          explainCorrect: t(
            'Alat otomatis menangkap hal yang bisa diukur. Kenyamanan sungguhan tetap diuji oleh manusia.',
          ),
          hints: [t('Pikirkan bagian yang butuh penilaian manusia.')],
          tags: ['aksesibilitas'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a10-l03-q5',
          type: 'scenario',
          story: t(
            'Bito pusing kalau melihat kartu yang berputar terus di layar HP.',
            'Bito pusing kalau melihat kartu animasi yang terus berputar di layar HP-nya.',
          ),
          prompt: t(
            'Apa yang bisa dilakukan pembuat web untuk menolong Bito?',
            'Apa yang sebaiknya dilakukan halaman untuk membantu Bito?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'prm',
              label: t('Beri tombol untuk menghentikan gerakan', 'Mengurangi animasi saat reduced motion aktif'),
            },
            {
              id: 'fast',
              label: t('Memutar kartu lebih cepat saat tombol disentuh', 'Mempercepat animasi menjadi dua kali lipat'),
              explainWrong: t(
                'Gerakan lebih cepat membuat pusing lebih parah. Bito butuh gerakan yang lebih tenang.',
                'Animasi lebih cepat memperburuk rasa pusing. Pengaturan reduced motion justru meminta gerakan dikurangi.',
              ),
            },
            {
              id: 'lock',
              label: t('Memperbesar kartu yang berputar', 'Mengganti animasi putar dengan animasi memantul'),
              explainWrong: t(
                'Kartu besar tetap berputar. Bito butuh gerakan yang dikurangi.',
                'Animasi memantul tetap bergerak. Reduced motion meminta gerakan dikurangi atau dimatikan.',
              ),
            },
          ],
          answer: 'prm',
          explainCorrect: t(
            'Tombol itu menghentikan kartu berputar supaya Bito lebih nyaman. Seperti menghentikan komidi putar saat ada yang pusing.',
            'prefers-reduced-motion memberi tahu halaman untuk mematikan atau melambatkan animasi bagi orang yang sensitif terhadap gerak.',
          ),
          hints: [t('Apa yang membuat Bito pusing?', 'Bito butuh gerakan yang lebih sedikit atau berhenti.')],
          tags: ['aksesibilitas'],
        }),
      ),
      qStep({
        id: 'a10-l03-q6',
        type: 'spotbug',
        modes: ['pro'],
        prompt: t('Ketuk baris CSS yang menghapus penanda fokus untuk orang yang memakai keyboard.'),
        difficulty: 2,
        lines: [
          'button {',
          '  min-height: 48px;',
          '  outline: none;',
          '  font-size: 1rem;',
          '}',
        ],
        answer: [3],
        explainCorrect: t(
          'Baris 3 menghapus outline fokus tanpa gaya pengganti. Orang yang memakai keyboard tidak tahu sedang berada di tombol mana.',
        ),
        hints: [t('Cari baris yang menyembunyikan garis penanda tombol.'), undefined],
        tags: ['aksesibilitas'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a10-l03-r1',
        prompt: t(
          'Mana tulisan yang paling mudah dibaca?',
          'Berapa rasio kontras minimal WCAG AA untuk teks biasa?',
        ),
        choices: [
          { id: 'c45', label: t('Tulisan hitam di kertas kuning', 'Minimal 4,5 : 1') },
          {
            id: 'c11',
            label: t('Tulisan kuning muda di kertas kuning', '1,1 : 1 sudah cukup'),
            explainWrong: t(
              'Warnanya hampir sama dengan kertas, jadi sulit dibaca.',
              '1,1 : 1 hampir sama dengan warna latar, jadi sangat sulit dibaca.',
            ),
          },
          {
            id: 'c2',
            label: t('Tulisan abu-abu muda di kertas putih', 'Minimal 2 : 1'),
            explainWrong: t(
              'Abu-abu muda di kertas putih masih pudar. Pilih yang paling beda.',
              'Rasio 2 : 1 masih terlalu rendah. Teks normal butuh minimal 4,5 : 1.',
            ),
          },
        ],
        answer: 'c45',
        explainCorrect: t(
          'Hitam di kuning sangat beda, jadi mudah dibaca. Seperti spidol hitam di kertas kuning.',
          'Teks normal butuh rasio kontras minimal 4,5 : 1.',
        ),
        hints: [t('Pilih yang paling beda dari warna belakangnya.')],
        tags: ['kontras', 'aksesibilitas'],
      }),
      makeTf({
        id: 'a10-l03-r2',
        prompt: t(
          'Tombol besar lebih mudah diketuk jari.',
          'Untuk gambar hiasan murni, alt="" membuat pembaca layar melewatinya tanpa membacakan nama file.',
        ),
        answer: true,
        explainCorrect: t(
          'Jari lebih mudah mengenai tombol yang besar. Seperti bola yang lebih mudah masuk ke gawang lebar.',
          'alt="" menandai gambar dekoratif, jadi pembaca layar tidak membacakan nama file yang mengganggu.',
        ),
        explainWrong: t(
          'Tombol besar memberi ruang lebih luas untuk jari.',
          'Pernyataan itu benar: alt="" adalah cara yang tepat menandai gambar dekoratif.',
        ),
        hints: [t('Ingat main bola. Lebih mudah masuk ke gawang mana?', 'Ingat hiasan dinding di kelas.')],
        tags: ['alt-text', 'aksesibilitas'],
      }),
    ],
    recap: t(
      'Cek warna, ikon, keyboard, tombol besar, dan gerakan sebelum halaman dibuka.',
      'Periksa alt text, label, dan kontras. Lalu uji fokus keyboard, target sentuh, dan prefers-reduced-motion.',
    ),
    companion: {
      talkPrompts: ['Tombol apa yang memindahkan pilihan tanpa mouse?'],
      offlineActivity:
        'Buat papan tanda peringatan di kertas. Jangan hanya memakai warna merah. Tambahkan ikon seru dan tulisan singkat.',
    },
  }),
];
