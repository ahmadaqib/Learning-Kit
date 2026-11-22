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
  id: 'a07',
  track: 'A',
  order: 7,
  title: 'Galeri Desain',
  tagline: t(
    'Menata halaman yang jelas dilihat mata dan nyaman dipilih jempol.',
    'Menguasai prinsip desain visual (C.R.A.P.), Gestalt, 14 hukum UX, dan 10 heuristik Nielsen.',
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
      'Selamat datang di Galeri Desain! Mari uji matamu menata halaman rapi dan nyaman!',
      'Buktikan penguasaanmu atas C.R.A.P., Gestalt, 14 Laws of UX, serta 10 Heuristik Nielsen.',
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
        prompt: t('Aturan desain yang membuat mata langsung tahu tulisan mana paling penting untuk dibaca duluan adalah…'),
        choices: [
          { id: 'hier', label: t('Hierarki visual') },
          {
            id: 'z',
            label: t('Nama domain'),
            explainWrong: t('Domain adalah alamat situs di bilah browser.'),
          },
          {
            id: 'var',
            label: t('Variabel angka'),
            explainWrong: t('Variabel menyimpan nilai di JavaScript.'),
          },
        ],
        answer: 'hier',
        explainCorrect: t('Benar! Hierarki memandu mata lewat ukuran, ketebalan, warna, dan posisi.'),
        tags: ['hierarki'],
      }),
      makeAnchorMcq({
        id: 'a07-anc-j2',
        prompt: t('Mengapa label "Nama" harus ditaruh menempel dekat kotak isian Nama dan diberi jarak dari kotak Email?'),
        choices: [
          { id: 'prox', label: t('Supaya jelas label dan kotaknya satu kelompok (proximity)') },
          {
            id: 'col',
            label: t('Supaya warna halamannya menjadi gelap semua'),
            explainWrong: t('Jarak kedekatan tidak mengubah warna halaman.'),
          },
          {
            id: 'net',
            label: t('Supaya internet berjalan tanpa kuota'),
            explainWrong: t('Jarak tata letak membantu mata memahami kelompok informasi.'),
          },
        ],
        answer: 'prox',
        explainCorrect: t('Tepat! Otak otomatis menganggap benda yang berdekatan sebagai satu kelompok.'),
        tags: ['alignment'],
      }),
      makeAnchorMcq({
        id: 'a07-anc-j3',
        prompt: t('Ruang kosong di sekitar gambar dan teks supaya tampilan lega seperti etalase perhiasan disebut…'),
        choices: [
          { id: 'ws', label: t('White space') },
          {
            id: 'bug',
            label: t('Halaman rusak'),
            explainWrong: t('Ruang kosong yang disengaja justru tanda desain rapi dan berkelas.'),
          },
          {
            id: 'tag',
            label: t('Tag penutup'),
            explainWrong: t('Tag penutup adalah bagian penulisan kode HTML.'),
          },
        ],
        answer: 'ws',
        explainCorrect: t('Benar! White space memberi ruang napas agar halaman terasa rapi dan nyaman dibaca.'),
        tags: ['whitespace'],
      }),
      makeAnchorMcq({
        id: 'a07-anc-j4',
        prompt: t('Kalau sebuah menu punya 60 tombol sekaligus tanpa dibagi kelompok, hukum UX mana yang terlanggar?'),
        choices: [
          { id: 'hick', label: t("Hick's Law (kebanyakan pilihan bikin lama memutuskan)") },
          {
            id: 'dns',
            label: t('Aturan buku kontak DNS'),
            explainWrong: t('DNS menerjemahkan nama situs menjadi alamat server.'),
          },
          {
            id: 'html',
            label: t('Aturan tag doctype'),
            explainWrong: t('Doctype hanya pembuka dokumen HTML.'),
          },
        ],
        answer: 'hick',
        explainCorrect: t("Tepat! Menurut Hick's Law, makin banyak pilihan sekaligus, makin lama pengguna memilih."),
        tags: ['hick-law'],
      }),
      makeAnchorMcq({
        id: 'a07-anc-j5',
        type: 'limit',
        analogy: t('Lampu sorot di galeri lukisan untuk hierarki visual'),
        prompt: t('Hal apa yang BERBEDA antara lampu sorot galeri dan hierarki visual di layar HP?'),
        choices: [
          { id: 'size', label: t('Di layar, desainer bisa memperbesar huruf dan memindah posisi, bukan cuma menyinari satu titik') },
          {
            id: 'focus',
            label: t('Keduanya mengarahkan mata ke benda paling penting lebih dulu'),
            explainWrong: t('Itu justru persamaan utamanya.'),
          },
          {
            id: 'guide',
            label: t('Keduanya membantu pengunjung tidak bingung melihat seluruh ruangan sekaligus'),
            explainWrong: t('Itu juga bagian yang memang serupa.'),
          },
        ],
        answer: 'size',
        explainCorrect: t('Benar! Di desain digital kita mengatur skala, bobot huruf, kontras, dan posisi sekaligus.'),
        tags: ['hierarki'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a07-anc-p1',
        prompt: t('Prinsip Gestalt yang membuat kartu-kartu di dalam satu kotak berbingkai otomatis dianggap satu kelompok adalah…'),
        choices: [
          { id: 'cr', label: t('Common Region') },
          {
            id: 'clo',
            label: t('Closure'),
            explainWrong: t('Closure terjadi saat otak melengkapi garis bentuk yang terputus.'),
          },
          {
            id: 'con',
            label: t('Continuity'),
            explainWrong: t('Continuity adalah saat mata mengikuti alur garis atau lengkungan.'),
          },
        ],
        answer: 'cr',
        explainCorrect: t('Tepat. Elemen di dalam batas wadah atau latar yang sama dibaca sebagai satu kesatuan (Common Region).'),
        tags: ['gestalt'],
      }),
      makeAnchorMcq({
        id: 'a07-anc-p2',
        prompt: t('Berdasarkan Fitts’s Law, mengapa tombol berbahaya seperti "Hapus Permanen" harus dijauhkan dari tombol yang sering diklik?'),
        choices: [
          { id: 'err', label: t('Agar jarak gerak jari/kursor menjauh sehingga mencegah klik tidak sengaja') },
          {
            id: 'hide',
            label: t('Karena tombol Hapus tidak boleh memakai warna'),
            explainWrong: t('Penempatan menjauh mengurangi risiko salah tekan akibat gerak cepat.'),
          },
          {
            id: 'load',
            label: t('Agar halaman lebih cepat dimuat oleh server'),
            explainWrong: t('Posisi tombol tidak memengaruhi kecepatan jaringan server.'),
          },
        ],
        answer: 'err',
        explainCorrect: t('Benar. Fitts’s Law dipakai baik untuk mendekatkan aksi utama maupun menjauhkan aksi destruktif.'),
        tags: ['fitts-law'],
      }),
      makeAnchorMcq({
        id: 'a07-anc-p3',
        prompt: t('Menurut Doherty Threshold, batas waktu tanggapan sistem agar interaksi terasa instan dan lancar adalah di bawah…'),
        choices: [
          { id: 'd4', label: t('0,4 detik (400 milidetik)') },
          {
            id: 'd5',
            label: t('5 detik'),
            explainWrong: t('Diam 5 detik membuat pengguna merasa sistem macet atau lambat.'),
          },
          {
            id: 'd30',
            label: t('30 detik'),
            explainWrong: t('Menunggu 30 detik tanpa umpan balik membuat mayoritas pengguna meninggalkan halaman.'),
          },
        ],
        answer: 'd4',
        explainCorrect: t('Tepat. Di bawah 0,4 detik terasa seketika; jika lebih lama, tampilkan loading atau skeleton.'),
        tags: ['fitts-law'],
      }),
      makeAnchorMcq({
        id: 'a07-anc-p4',
        prompt: t('Memecah nomor kartu 16 digit menjadi 4 kelompok (4-4-4-4) adalah penerapan hukum UX apa?'),
        choices: [
          { id: 'mil', label: t("Miller's Law (chunking untuk batas memori kerja 7±2)") },
          {
            id: 'jak',
            label: t("Jakob's Law"),
            explainWrong: t("Jakob's Law membahas kesamaan pola dengan kebiasaan di website lain."),
          },
          {
            id: 'par',
            label: t('Pareto Principle'),
            explainWrong: t('Pareto Principle membahas 80% hasil dari 20% fitur utama.'),
          },
        ],
        answer: 'mil',
        explainCorrect: t('Benar. Chunking menjaga informasi tetap muat di kapasitas memori kerja jangka pendek.'),
        tags: ['miller-law'],
      }),
      makeAnchorMcq({
        id: 'a07-anc-p5',
        prompt: t('Menempatkan tombol "Beranda" di ujung kiri dan "Profil" di ujung kanan bilah navigasi bawah memanfaatkan…'),
        choices: [
          { id: 'sp', label: t('Serial Position Effect') },
          {
            id: 'vr',
            label: t('Von Restorff Effect'),
            explainWrong: t('Von Restorff menonjolkan satu elemen yang paling berbeda di antara yang seragam.'),
          },
          {
            id: 'zg',
            label: t('Zeigarnik Effect'),
            explainWrong: t('Zeigarnik adalah kecenderungan terus mengingat tugas yang tanggung belum selesai.'),
          },
        ],
        answer: 'sp',
        explainCorrect: t('Tepat! Item pertama dan terakhir dalam deretan adalah yang paling mudah diingat pengguna.'),
        tags: ['miller-law'],
      }),
      makeAnchorMcq({
        id: 'a07-anc-p6',
        type: 'limit',
        analogy: t('Aesthetic-Usability Effect seperti makanan ditata cantik'),
        prompt: t('Kesalahan apa yang bisa terjadi bila tim salah memahami Aesthetic-Usability Effect?'),
        choices: [
          { id: 'skip', label: t('Menganggap tampilan visual indah saja cukup sehingga melewatkan usability testing') },
          {
            id: 'first',
            label: t('Merapikan visual karena kesan pertama memengaruhi kepercayaan pengguna'),
            explainWrong: t('Merapikan visual untuk kesan pertama memang langkah yang benar.'),
          },
          {
            id: 'forgive',
            label: t('Pengguna cenderung sedikit lebih pemaaf atas kekurangan kecil saat tampilan rapi'),
            explainWrong: t('Temuan itu memang benar adanya, namun bukan berarti bug besar dimaafkan.'),
          },
        ],
        answer: 'skip',
        explainCorrect: t('Tepat! Keindahan visual tidak menyembuhkan alur rusak saat pengguna gagal menyelesaikan tugas pentingnya.'),
        tags: ['peak-end', 'usability-testing'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'a07-l01',
    worldId: 'a07',
    title: 'Hierarki dan kontras',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengatur ukuran dan kontras warna supaya mata tahu mana yang harus dibaca duluan.',
      'Aku bisa membangun hierarki visual dan kontras yang kuat untuk memandu urutan perhatian pengguna.',
    ),
    estMinutes: 5,
    introducesTerms: ['hierarki'],
    usesTerms: ['ui', 'ux'],
    stickerId: 'sorotan-galeri',
    warmupFrom: 'a06-l05',
    steps: [
      storyStep('a07/sorotan-galeri.svg', [
        rText(
          'Di galeri lukisan, lampu sorot terang diarahkan ke karya paling utama. Mata pengunjung langsung tahu mana yang harus dilihat duluan!',
          'Seperti lampu sorot di galeri seni yang langsung mengarahkan pandangan pengunjung ke karya utama, hierarki dan kontras menuntun mata pembaca di atas layar.',
        ),
      ]),
      conceptStep({
        title: t('Mata Lihat Mana Duluan?', '1. Hierarki Visual'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'urutan-baca-hierarki' },
        alt: t('Poster tanpa hierarki ukuran sama semua dibanding poster dengan judul besar dan tombol jelas.'),
        body: [
          rTerm('hierarki', 'Hierarki visual', 'Hierarki visual'),
          rText(
            ' mengatur agar hal terpenting dilihat duluan. Pakai ukuran besar, huruf tebal, warna, dan posisi atas.',
            ' mengarahkan urutan perhatian pembaca dari informasi terpenting ke pendukung lewat ukuran, ketebalan, warna, dan posisi.',
          ),
        ],
      }),
      conceptStep({
        title: t('Jangan Semua Sama Penting', 'Menciptakan Urutan Baca'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'poster-diskon-hierarki' },
        alt: t('Judul DISKON AKHIR TAHUN besar, Potongan 50% sedang, tanggal kecil, tombol menonjol.'),
        body: [
          rText(
            'Jika semua tulisan sama besar, halaman membingungkan. Buat judul besar, tanggal kecil, dan tombol menonjol.',
            'Jika semua baris memakai ukuran dan bobot yang sama, mata lelah memindai. Bedakan judul utama, subjudul, tanggal kecil, dan ajakan aksi.',
          ),
        ],
      }),
      conceptStep({
        title: t('Kontras Membuat Jelas Terbaca', '2. Kontras'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'perbedaan-kontras' },
        alt: t('Teks abu di latar abu pudar dibanding teks putih di latar gelap yang tajam.'),
        body: [
          rText(
            'Kontras adalah perbedaan yang jelas: gelap lawan terang, besar lawan kecil. Tulisan abu di latar abu susah dibaca!',
            'Kontras adalah perbedaan nyata antara dua elemen (gelap–terang, besar–kecil, tebal–tipis). Kontras tinggi membuat teks tajam terbaca dan aksi utama menonjol.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Lampu sorot galeri untuk hierarki dan kontras'),
        same: [
          t('Mengundang mata melihat hal paling penting dulu sebelum menyebar ke detail kecil.'),
        ],
        different: [
          t('Lampu sorot hanya menerangi lukisan, sedangkan di UI desainer memadukan ukuran huruf, posisi atas-bawah, ruang kosong, dan kontras warna sekaligus.'),
        ],
      }),
      simStep(
        'hick-menu',
        t(
          'Lihat tombol bertanda bintang dan amati seberapa cepat matamu menemukannya!',
          'Amati bagaimana penanda visual yang kontras mempercepat pencarian di antara deretan menu.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a07-l01-q1',
          type: 'analogy',
          prompt: t('Judul promo yang ditulis paling besar dan tebal supaya langsung terlihat pengunjung ibarat…'),
          choices: [
            { id: 'lamp', label: t('Lukisan utama yang diterangi lampu sorot paling terang di galeri') },
            {
              id: 'dark',
              label: t('Mematikan seluruh lampu ruangan galeri'),
              explainWrong: t('Kalau gelap semua, tidak ada satu pun yang terlihat.'),
            },
            {
              id: 'same',
              label: t('Menempel seratus stiker berukuran persis sama rapat-rapat'),
              explainWrong: t('Jika semua sama ukuran dan rapat, tidak ada yang menonjol.'),
            },
          ],
          answer: 'lamp',
          explainCorrect: t('Benar! Hierarki visual menyorot bagian terpenting agar terbaca seketika.'),
          tags: ['hierarki'],
        }),
      ),
      qStep({
        id: 'a07-l01-q2',
        type: 'hotspot',
        prompt: t('Pada sebuah kartu promo acara sekolah, ketuk bagian yang seharusnya paling menonjol agar dilihat mata pertama kali!'),
        image: 'a07-hotspot',
        difficulty: 1,
        regions: [
          { id: 'judul', shape: 'rect', coords: [10, 10, 200, 50], label: 'Judul Besar: PENTAS SENI' },
          { id: 'syarat', shape: 'rect', coords: [10, 70, 200, 95], label: 'Catatan kaki kecil: pintu dibuka 08.00' },
          { id: 'kode', shape: 'rect', coords: [10, 105, 200, 125], label: 'Nomor arsip halaman #04' },
          { id: 'copy', shape: 'rect', coords: [10, 135, 200, 155], label: 'Hak cipta tahun ini' },
        ],
        answer: 'judul',
        explainCorrect: t('Tepat! Judul acara paling atas dan paling besar mengawali urutan baca halaman.'),
        tags: ['hierarki'],
      }),
      qStep(
        makeTf({
          id: 'a07-l01-q3',
          prompt: t('Menulis teks warna abu-abu muda di atas latar warna abu-abu pucat adalah contoh kontras yang baik.'),
          answer: false,
          explainCorrect: t('Benar, pernyataan itu keliru! Abu muda di atas abu pucat sangat rendah kontrasnya dan melelahkan mata.'),
          explainWrong: t('Hampir! Teks dan latar butuh perbedaan gelap–terang yang tegas agar mudah dibaca.'),
          tags: ['hierarki', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l01-q4',
          type: 'limit',
          analogy: t('Lampu sorot di galeri'),
          prompt: t('Apa perbedaan menata hierarki di halaman web dibanding menyinari lukisan dengan lampu sorot?'),
          difficulty: 2,
          choices: [
            { id: 'multi', label: t('Di web, kita tidak cuma mengatur terang-gelap, tapi juga ukuran huruf, ketebalan, dan urutan posisi') },
            {
              id: 'eye',
              label: t('Keduanya membantu mata tahu mana yang penting lebih dulu'),
              explainWrong: t('Ini kesamaan utamanya.'),
            },
            {
              id: 'conf',
              label: t('Menghindari pengunjung bingung di detik pertama'),
              explainWrong: t('Ini juga persamaan keduanya.'),
            },
          ],
          answer: 'multi',
          explainCorrect: t('Benar! Kombinasi skala, bobot huruf, warna, dan posisi membuat hierarki web sangat jelas.'),
          tags: ['hierarki'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l01-q5',
          type: 'scenario',
          story: t('Poster toko buku Rani memuat "OBRAL BUKU", "Diskon 50%", dan "Berlaku Minggu ini" dengan ukuran huruf 14px dan ketebalan yang persis sama rata.'),
          prompt: t('Perbaikan terbaik agar poster langsung menarik dan jelas dibaca adalah…'),
          difficulty: 2,
          choices: [
            { id: 'scale', label: t('Perbesar dan tebalkan "OBRAL BUKU" serta "50%", lalu kecilkan keterangan tanggal') },
            {
              id: 'blink',
              label: t('Buat semua teks berkedip warna-warni setiap setengah detik'),
              explainWrong: t('Berkedip terus-menerus mengganggu fokus dan tidak ramah mata.'),
            },
            {
              id: 'gray',
              label: t('Ubah seluruh tulisan menjadi warna abu sangat tipis'),
              explainWrong: t('Tulisan tipis abu-abu menurunkan kontras sehingga makin susah dibaca.'),
            },
          ],
          answer: 'scale',
          explainCorrect: t('Tepat! Perbedaan ukuran dan ketebalan langsung menciptakan urutan baca yang nyaman.'),
          tags: ['hierarki', 'ui'],
        }),
      ),
      qStep({
        id: 'a07-l01-q6',
        type: 'order',
        prompt: t('Urutkan prioritas baca paling alami pada kartu promosi toko online (dari yang pertama dilihat mata sampai terakhir):'),
        difficulty: 2,
        items: [
          { id: 'tgl', label: t('Keterangan kecil masa berlaku promo') },
          { id: 'cta', label: t('Tombol aksi "Belanja Sekarang" yang kontras') },
          { id: 'jdl', label: t('Judul besar promo utama (H1)') },
          { id: 'sub', label: t('Potongan harga 50% (subjudul)') },
        ],
        answer: ['jdl', 'sub', 'tgl', 'cta'],
        explainCorrect: t('Mantap! Mata membaca judul besar → penawaran 50% → syarat tanggal → tombol aksi.'),
        tags: ['hierarki'],
      }),
      qStep({
        id: 'a07-l01-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi prinsip desain visual berikut: Perbedaan tegas gelap–terang atau besar–kecil agar teks terbaca dan elemen penting menonjol disebut ___.'),
        difficulty: 1,
        template: 'Prinsip ___ membuat teks tajam terbaca di atas latarnya.',
        bank: ['kontras', 'overflow', 'margin'],
        answer: ['kontras'],
        explainCorrect: t('Benar! Kontras dan hierarki bekerja bersama memastikan informasi terbaca cepat.'),
        tags: ['hierarki', 'ui'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-l01-r1',
        prompt: t('Empat cara utama menciptakan hierarki visual pada teks dan tombol adalah…'),
        choices: [
          { id: 'ok', label: t('Ukuran, ketebalan, warna, dan posisi') },
          { id: 'no', label: t('Menyamakan ukuran semua teks jadi 12px'), explainWrong: t('Menyamakan semua ukuran justru menghapus hierarki.') },
        ],
        answer: 'ok',
        explainCorrect: t('Kombinasi ukuran, bobot, warna, dan posisi memandu mata pembaca.'),
        tags: ['hierarki'],
      }),
      makeTf({
        id: 'a07-l01-r2',
        prompt: t('Jika semua bagian di layar diberi sorotan besar yang sama, tidak ada satu pun yang benar-benar menonjol.'),
        answer: true,
        explainCorrect: t('Betul! Hierarki butuh pembeda jelas antara yang utama dan pendukung.'),
        explainWrong: t('Ketika semua berteriak bersamaan, pembaca tidak tahu harus fokus ke mana.'),
        tags: ['hierarki'],
      }),
    ],
    recap: t(
      'Hierarki dan kontras membuat mata langsung melihat hal terpenting dulu tanpa bingung.',
      'Gunakan skala ukuran, bobot, warna, posisi, dan kontras tinggi untuk memandu alur pandang pembaca.',
    ),
    companion: {
      talkPrompts: ['Lihat sampul buku atau kemasan makanan di meja: tulisan mana yang paling besar, dan kenapa itu yang dibaca pertama?'],
      offlineActivity: 'Buka koran atau brosur promo di rumah, lalu lingkari urutan 1, 2, 3 bagian mana yang paling dulu menarik matamu.',
    },
  }),

  makeLesson({
    id: 'a07-l02',
    worldId: 'a07',
    title: 'Alignment dan proximity',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa merapikan elemen sejajar garis lurus dan mendekatkan hal yang sekelompok.',
      'Aku bisa menerapkan prinsip alignment pada garis khayal dan proximity untuk mengelompokkan UI.',
    ),
    estMinutes: 5,
    introducesTerms: ['alignment'],
    usesTerms: ['ui', 'ux', 'hierarki', 'margin', 'padding'],
    warmupFrom: 'a07-l01',
    steps: [
      storyStep('a07/nampan-rapi.svg', [
        rText(
          'Lihat barisan bangku kelas yang sejajar garis ubin dan piring serta sendok yang dikumpulkan di atas satu nampan. Langsung terasa rapi!',
          'Seperti bangku kelas yang sejajar garis lantai dan peralatan makan yang dikelompokkan per nampan, alignment dan proximity langsung menertibkan tampilan.',
        ),
      ]),
      conceptStep({
        title: t('Lurus di Satu Garis: Alignment', '3. Alignment (Kesejajaran)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'garis-khayal-alignment' },
        alt: t('Kartu berantakan acak dibandingkan kartu rata kiri pada satu garis khayal lurus.'),
        body: [
          rTerm('alignment', 'Alignment', 'Alignment'),
          rText(
            ' membuat elemen sejajar di satu garis khayal. Tampilan tidak sejajar langsung terlihat berantakan.',
            ' menambatkan elemen-elemen pada satu garis khayal yang konsisten (misalnya rata kiri) sehingga halaman terasa terstruktur dan tenang.',
          ),
        ],
      }),
      conceptStep({
        title: t('Yang Dekat Satu Kelompok: Proximity', '4. Proximity (Kedekatan)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'jarak-proximity' },
        alt: t('Label Nama menempel ke kotak Nama dan berjarak lebih jauh dari label Email.'),
        body: [
          rText(
            'Hal yang berhubungan diletakkan dekat. Hal berbeda diberi jarak. Label Nama menempel ke kotak Nama!',
            'Proximity meletakkan hal yang berkaitan berdekatan dan memisahkan kelompok berbeda. Label menempel ke inputnya sehingga tidak membingungkan.',
          ),
        ],
      }),
      conceptStep({
        title: t('Mengatur Jarak dengan Konsisten', 'Mengukur Jarak di CSS'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'jarak-dalam-dan-antar' },
        alt: t('Jarak label ke kotak 6px lebih kecil dari jarak antarkelompok isian 20px.'),
        body: [
          rText(
            'Pakai ',
            'Atur jarak dalam kelompok (',
          ),
          rTerm('margin', 'margin', 'margin'),
          rText(
            ' atau jarak lebih kecil di dalam kelompok daripada antar kelompok.',
            ' kecil) lebih rapat daripada jarak antarkelompok agar mata langsung membedakan tiap bagian form.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Barisan bangku dan nampan makan untuk alignment & proximity'),
        same: [
          t('Setiap baris punya tepi lurus yang enak dilihat dan benda sepasang dikumpulkan berdekatan.'),
        ],
        different: [
          t('Di desain UI, jarak tidak dikira-kira dengan mata kosong—kita memakai aturan jarak terukur (piksel atau grid) agar konsisten di semua halaman.'),
        ],
      }),
      simStep(
        'hick-menu',
        t(
          'Amati bagaimana kartu menu yang sejajar rapi memudahkan matamu memindai pilihan!',
          'Perhatikan bagaimana kesejajaran grid 2 atau 4 kolom pada simulator membantu pemindaian cepat.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a07-l02-q1',
          type: 'analogy',
          prompt: t('Meletakkan label "Email" rapat ke kotak Email dan menjauhkannya dari kotak "Nama" di atasnya menerapkan…'),
          choices: [
            { id: 'prox', label: t('Proximity (kedekatan penanda kelompok)') },
            {
              id: 'rand',
              label: t('Jarak acak tanpa pola'),
              explainWrong: t('Justru jaraknya sengaja diatur supaya kelompoknya jelas.'),
            },
            {
              id: 'dns',
              label: t('Penamaan domain web'),
              explainWrong: t('Domain tidak mengatur jarak elemen form.'),
            },
          ],
          answer: 'prox',
          explainCorrect: t('Benar! Proximity membuat otak langsung mengaitkan setiap label ke kotaknya masing-masing.'),
          tags: ['alignment'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a07-l02-q2',
          prompt: t('Jika jarak antara label ke kotak di atasnya dan kotak di bawahnya persis sama rata, pengguna akan cepat bingung label itu milik kotak mana.'),
          answer: true,
          explainCorrect: t('Betul! Jarak sama rata mengaburkan batas kelompok antara input satu dan berikutnya.'),
          explainWrong: t('Hampir! Label harus lebih dekat ke kotak miliknya sendiri daripada ke kotak lain.'),
          tags: ['alignment', 'ux'],
        }),
      ),
      qStep({
        id: 'a07-l02-q3',
        type: 'sort',
        prompt: t('Kelompokkan contoh tata letak berikut ke prinsip Alignment atau Proximity:'),
        difficulty: 2,
        items: [
          { id: 'a1', label: t('Judul, paragraf, dan tombol semua dimulai lurus di garis kiri yang sama') },
          { id: 'p1', label: t('Foto produk dan harga ditaruh rapat dalam satu kartu, jauh dari kartu lain') },
          { id: 'a2', label: t('Tiga kartu sejajar rapi pada tinggi tepi atas yang sama') },
          { id: 'p2', label: t('Label "Kata Sandi" menempel dekat kotak sandinya') },
        ],
        bins: [
          { id: 'al', label: t('Alignment (Kesejajaran)') },
          { id: 'pr', label: t('Proximity (Kedekatan)') },
        ],
        answer: { a1: 'al', p1: 'pr', a2: 'al', p2: 'pr' },
        explainCorrect: t('Mantap! Garis lurus adalah alignment; kedekatan pengelompokan adalah proximity.'),
        tags: ['alignment'],
      }),
      qStep(
        makeMcq({
          id: 'a07-l02-q4',
          type: 'limit',
          analogy: t('Barisan bangku di kelas'),
          prompt: t('Apa perbedaan menata elemen UI di layar dibanding merapikan bangku di kelas?'),
          difficulty: 2,
          choices: [
            { id: 'px', label: t('Di UI kita memakai ukuran piksel/gap konsisten yang tetap harus rapi saat layar menyempit ke HP') },
            {
              id: 'line',
              label: t('Keduanya terlihat kacau kalau tidak sejajar satu garis'),
              explainWrong: t('Itu memang persamaannya.'),
            },
            {
              id: 'scan',
              label: t('Susunan sejajar membuat mata lebih tenang melihatnya'),
              explainWrong: t('Ini juga persamaan manfaatnya.'),
            },
          ],
          answer: 'px',
          explainCorrect: t('Tepat! Kesejajaran di CSS harus tetap terjaga pada ukuran HP maupun laptop.'),
          tags: ['alignment'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l02-q5',
          type: 'scenario',
          story: t('Pada halaman profil buatan Raka, judul kiri menjorok 10px, teks di bawahnya menjorok 28px, dan tombol Simpan menjorok 5px secara acak.'),
          prompt: t('Prinsip desain mana yang langsung terlihat dilanggar oleh halaman Raka?'),
          difficulty: 2,
          choices: [
            { id: 'al', label: t('Alignment — tepi kirinya tidak bersandar pada satu garis khayal yang sama') },
            {
              id: 'js',
              label: t('Bahasa JavaScript-nya lupa memakai variabel'),
              explainWrong: t('Ini masalah tata letak visual CSS, bukan variabel JavaScript.'),
            },
            {
              id: 'url',
              label: t('URL situsnya tidak pakai HTTPS'),
              explainWrong: t('HTTPS soal keamanan jaringan, bukan kerapian garis tata letak.'),
            },
          ],
          answer: 'al',
          explainCorrect: t('Benar! Menyamakan garis kiri membuat seluruh halaman Raka langsung terlihat rapi profesional.'),
          tags: ['alignment', 'ui'],
        }),
      ),
      qStep({
        id: 'a07-l02-q6',
        type: 'spotbug',
        prompt: t('Ketuk baris CSS form yang membuat jarak label ke kotaknya terlalu jauh dibanding jarak ke isian lain (melanggar proximity):'),
        difficulty: 2,
        lines: [
          '.grup-input { margin-bottom: 12px; }',
          '.label-input { margin-bottom: 32px; display: block; }',
          '.kotak-input { padding: 10px; }',
        ],
        answer: [2],
        explainCorrect: t('Jeli! Baris 2 memberi margin-bottom 32px antara label dan kotaknya, jauh lebih besar daripada jarak antar grup 12px!'),
        tags: ['alignment', 'margin'],
      }),
      qStep({
        id: 'a07-l02-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi istilah prinsip desain:'),
        difficulty: 1,
        template: 'Meletakkan elemen yang saling berkaitan berdekatan agar terbaca satu kelompok disebut ___.',
        bank: ['proximity', 'overflow', 'hosting'],
        answer: ['proximity'],
        explainCorrect: t('Tepat! Proximity menjadikan jarak sebagai alat pengelompokan informasi.'),
        tags: ['alignment'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-l02-r1',
        prompt: t('Apa kegunaan utama garis khayal dalam prinsip alignment?'),
        choices: [
          { id: 'ok', label: t('Menjadikan elemen-elemen sejajar rapi sehingga tampilan tidak terlihat acak') },
          { id: 'no', label: t('Membuat semua teks rata tengah di seluruh halaman'), explainWrong: t('Alignment umumnya memakai garis rata kiri yang konsisten untuk paragraf dan formulir.') },
        ],
        answer: 'ok',
        explainCorrect: t('Kesejajaran pada garis khayal memberi kesan teratur dan profesional.'),
        tags: ['alignment'],
      }),
      makeTf({
        id: 'a07-l02-r2',
        prompt: t('Berdasarkan prinsip proximity, jarak antara label dan kotak inputnya harus lebih kecil daripada jarak ke kotak input berikutnya.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('Label dan kotaknya satu kelompok, jadi jaraknya harus paling dekat.'),
        tags: ['alignment'],
      }),
    ],
    recap: t(
      'Alignment membuat semua sejajar di satu garis; proximity mendekatkan yang sekelompok.',
      'Gunakan alignment pada satu garis khayal dan proximity dengan jarak internal lebih rapat daripada jarak antarkelompok.',
    ),
    companion: {
      talkPrompts: ['Kalau piring makan dan sendok ditaruh terpisah-pisah di seluruh meja dibanding di atas satu nampan, mana yang cepat dikenali?'],
      offlineActivity: 'Susun 4 kotak kartu nama atau kartu mainan di meja: satu kali acak, satu kali sejajar tepi kiri penggaris.',
    },
  }),

  makeLesson({
    id: 'a07-l03',
    worldId: 'a07',
    title: 'White space, balance, repetition',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku paham guna ruang kosong lega, pengulangan gaya yang konsisten, dan keseimbangan layar.',
      'Aku bisa menerapkan white space, repetition, balance (simetris/asimetris), serta daftar cek C.R.A.P.',
    ),
    estMinutes: 5,
    introducesTerms: ['whitespace'],
    usesTerms: ['ui', 'ux', 'hierarki', 'alignment'],
    stickerId: 'etalase-lega',
    warmupFrom: 'a07-l02',
    steps: [
      storyStep('a07/etalase-lega.svg', [
        rText(
          'Bandingkan etalase toko perhiasan dan lapak obral. Di etalase perhiasan, satu kalung diberi ruang luas sehingga tampak berharga. Di lapak obral, semua ditumpuk sesak!',
          'Etalase perhiasan hanya memajang satu kalung di ruang lapang sehingga terasa mahal, berbeda dengan lapak obral yang penuh sesak. Jarak yang lega memberi kesan berkualitas.',
        ),
      ]),
      conceptStep({
        title: t('Ruang Kosong Bukan Sia-sia', '5. White Space & 6. Repetition'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'whitespace-dan-repetition' },
        alt: t('Kartu dengan ruang napas lega dan gaya tombol seragam.'),
        body: [
          rTerm('whitespace', 'White space', 'White space'),
          rText(
            ' adalah ruang kosong pemberi napas agar halaman tampak berkelas. ',
            ' adalah ruang negatif pemberi napas agar isi terasa penting. ',
          ),
          rBold('Repetition', 'Repetition'),
          rText(' memakai gaya tombol dan judul yang sama di semua halaman.', ' menjaga warna tombol, sudut kartu, dan judul konsisten.'),
        ],
      }),
      conceptStep({
        title: t('Seimbang Kiri dan Kanan', '7. Balance (Simetris & Asimetris)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'balance-simetris-asimetris' },
        alt: t('Keseimbangan simetris kiri-kanan sama berat vs asimetris foto besar diimbangi teks tebal.'),
        body: [
          rBold('Simetris', 'Balance simetris'),
          rText(' membuat kiri dan kanan sama berat. ', ' menyamakan bobot kiri–kanan (formal, tenang). '),
          rBold('Asimetris', 'Balance asimetris'),
          rText(' menyeimbangkan gambar besar dengan teks tebal di sebelahnya.', ' memadukan gambar besar di satu sisi dengan teks tebal di sisi lain (modern, dinamis).'),
        ],
      }),
      conceptStep({
        title: t('Empat Cek Kilat: C.R.A.P.', 'Singkatan Pengingat: C.R.A.P.'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'daftar-cek-crap' },
        alt: t('Empat pilar C.R.A.P: Contrast, Repetition, Alignment, Proximity.'),
        body: [
          rText(
            'Kalau desain terasa aneh, cek empat hal. Contrast, Repetition, Alignment, dan Proximity.',
            'Hafalkan akronim C.R.A.P. — Contrast, Repetition, Alignment, Proximity. Setiap kali desain terasa ganjil, periksa keempat prinsip ini lebih dulu.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Etalase toko perhiasan vs lapak obral untuk white space'),
        same: [
          t('Memberi ruang kosong di sekitar benda utama membuatnya tampak lebih penting dan mudah dilihat.'),
        ],
        different: [
          t('Etalase perhiasan hanya memajang 1–2 barang, sedangkan aplikasi toko tetap boleh menampilkan banyak produk asalkan tetap menyisakan white space di dalam dan antarkartu.'),
        ],
      }),
      simStep(
        'hick-menu',
        t(
          'Perhatikan ruang kosong di antara tombol menu yang membuat setiap pilihan mudah diklik!',
          'Amati bagaimana celah antar kartu dan konsistensi gaya tombol membantu kecepatan memilih.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a07-l03-q1',
          type: 'analogy',
          prompt: t('Halaman web yang menumpuk ratusan teks, banner, dan tombol mepet tanpa jeda mirip dengan…'),
          choices: [
            { id: 'obral', label: t('Lapak obral sesak yang membuat mata cepat lelah dan tampak kurang rapi') },
            {
              id: 'jewel',
              label: t('Etalase perhiasan lega yang memberi fokus pada satu barang'),
              explainWrong: t('Etalase perhiasan justru contoh white space yang lega.'),
            },
            {
              id: 'grid',
              label: t('Rak buku tersusun dengan jarak rapi'),
              explainWrong: t('Rak buku rapi berarti punya jarak dan kesejajaran.'),
            },
          ],
          answer: 'obral',
          explainCorrect: t('Tepat! Tanpa white space, pembaca bingung melihat mana yang penting dan desain terkesan sesak.'),
          tags: ['whitespace'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a07-l03-q2',
          prompt: t('White space di dalam desain antarmuka adalah ruang kosong terbuang yang harus segera diisi iklan atau hiasan.'),
          answer: false,
          explainCorrect: t('Benar, itu keliru! White space memberi napas visual dan membuat informasi lebih nyaman dibaca.'),
          explainWrong: t('Hampir! Ruang kosong sengaja disisakan agar mata punya jeda istirahat.'),
          tags: ['whitespace'],
        }),
      ),
      qStep({
        id: 'a07-l03-q3',
        type: 'match',
        prompt: t('Pasangkan keempat huruf C.R.A.P. dengan artinya:'),
        difficulty: 2,
        left: [
          { id: 'c', label: t('Contrast') },
          { id: 'r', label: t('Repetition') },
          { id: 'a', label: t('Alignment') },
          { id: 'p', label: t('Proximity') },
        ],
        right: [
          { id: 'rc', label: t('Pembeda jelas terang–gelap dan besar–kecil') },
          { id: 'rr', label: t('Gaya tombol, huruf, dan sudut kartu seragam berulang') },
          { id: 'ra', label: t('Elemen sejajar pada garis khayal') },
          { id: 'rp', label: t('Yang berhubungan diletakkan berdekatan') },
        ],
        answer: { c: 'rc', r: 'rr', a: 'ra', p: 'rp' },
        explainCorrect: t('Hebat! C.R.A.P. adalah empat jurus utama memperbaiki tampilan antarmuka apa pun.'),
        tags: ['ui', 'alignment'],
      }),
      qStep(
        makeMcq({
          id: 'a07-l03-q4',
          type: 'limit',
          analogy: t('Etalase toko perhiasan'),
          prompt: t('Apa yang perlu disesuaikan saat memakai white space ala etalase perhiasan pada aplikasi daftar tugas atau belanja?'),
          difficulty: 2,
          choices: [
            { id: 'bal', label: t('Tetap tampilkan konten yang dibutuhkan pengguna sambil menjaga ruang kosong yang cukup antarelemen') },
            {
              id: 'empty',
              label: t('Hapus semua produk hingga tersisa 1 foto saja di seluruh situs'),
              explainWrong: t('Pengguna aplikasi tetap butuh melihat daftar produk dengan nyaman.'),
            },
            {
              id: 'black',
              label: t('Ruang kosong harus selalu berwarna hitam pekat'),
              explainWrong: t('White space tidak harus berwarna putih atau hitam; maksudnya adalah ruang kosong bersih dari isi.'),
            },
          ],
          answer: 'bal',
          explainCorrect: t('Benar! White space menyeimbangkan kelengkapan isi dengan jarak bernapas yang nyaman.'),
          tags: ['whitespace'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l03-q5',
          type: 'scenario',
          story: t('Di aplikasi Bu Laras, tombol "Simpan" di halaman 1 berwarna biru sudut tumpul, di halaman 2 hijau sudut kotak tajam, dan di halaman 3 merah oval.'),
          prompt: t('Prinsip desain mana yang paling bermasalah di aplikasi Bu Laras?'),
          difficulty: 2,
          choices: [
            { id: 'rep', label: t('Repetition dan konsistensi gaya tombol') },
            {
              id: 'sym',
              label: t('Keseimbangan asimetris foto'),
              explainWrong: t('Masalahnya pada tombol sejenis yang berganti-ganti warna dan bentuk.'),
            },
            {
              id: 'alt',
              label: t('Atribut alt pada gambar'),
              explainWrong: t('Masalahnya adalah ketidakkonsistenan visual antartombol utama.'),
            },
          ],
          answer: 'rep',
          explainCorrect: t('Tepat! Repetition menuntut tombol aksi utama memakai gaya konsisten supaya pengguna cepat belajar.'),
          tags: ['ui', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l03-q6',
          prompt: t('Bagian kiri halaman berisi satu ilustrasi besar, sedangkan bagian kanan berisi judul tebal dan tombol rapi. Ini contoh keseimbangan…'),
          difficulty: 2,
          choices: [
            { id: 'asym', label: t('Balance asimetris (berbeda bentuk tapi tetap seimbang)') },
            {
              id: 'sym',
              label: t('Balance simetris (kiri dan kanan persis kembar)'),
              explainWrong: t('Kiri berupa ilustrasi dan kanan berupa teks, jadi bukan kembar simetris.'),
            },
            {
              id: 'chaos',
              label: t('Ketidakseimbangan total'),
              explainWrong: t('Foto besar dapat diimbangi bobot teks tebal di sisi berlawanan secara modern dan dinamis.'),
            },
          ],
          answer: 'asym',
          explainCorrect: t('Benar! Balance asimetris memberi kesan modern dan dinamis sambil tetap terasa seimbang.'),
          tags: ['ui'],
        }),
      ),
      qStep({
        id: 'a07-l03-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Apa singkatan empat huruf yang merangkum Contrast, Repetition, Alignment, dan Proximity?'),
        difficulty: 1,
        accept: ['crap', 'c.r.a.p.', 'c.r.a.p'],
        explainCorrect: t('Tepat! C.R.A.P. adalah daftar periksa paling praktis setiap kali tampilan terasa janggal.'),
        tags: ['ui', 'alignment'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-l03-r1',
        prompt: t('Keuntungan menerapkan prinsip Repetition (konsistensi gaya) pada antarmuka adalah…'),
        choices: [
          { id: 'ok', label: t('Pengguna cepat belajar mengenali fungsi tombol dan produk terasa profesional') },
          { id: 'no', label: t('Setiap halaman jadi wajib memakai warna acak berbeda'), explainWrong: t('Repetition justru menyamakan gaya komponen yang berulang.') },
        ],
        answer: 'ok',
        explainCorrect: t('Konsistensi menekan kebingungan dan meningkatkan rasa percaya pengguna.'),
        tags: ['ui'],
      }),
      makeTf({
        id: 'a07-l03-r2',
        prompt: t('Balance asimetris terasa modern dan dinamis karena menyeimbangkan elemen berbeda bobot antara sisi kiri dan kanan.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('Asimetris tetap seimbang meskipun sisi kiri dan kanannya tidak kembar persis.'),
        tags: ['ui'],
      }),
    ],
    recap: t(
      'Beri ruang kosong (white space), ulangi gaya yang konsisten, dan jaga keseimbangan dengan cek C.R.A.P.',
      'Padukan white space lega, repetition konsisten, balance simetris/asimetris, dan audit C.R.A.P. pada setiap rancangan UI.',
    ),
    companion: {
      talkPrompts: ['Lebih enak melihat meja belajar yang kosong lapang dengan 1 buku terbuka atau penuh tumpukan barang mepet?'],
      offlineActivity: 'Foto atau amati halaman beranda satu aplikasi favorit, lalu cek apakah semua tombol utamanya punya warna dan bentuk yang sama (Repetition).',
    },
  }),

  makeLesson({
    id: 'a07-l04',
    worldId: 'a07',
    title: 'Gestalt: cara mata mengelompokkan',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengenali bagaimana mata manusia otomatis mengelompokkan gambar dan kotak.',
      'Aku bisa menerapkan enam prinsip Gestalt (Proximity, Similarity, Closure, Continuity, Common Region, Figure–ground) di UI.',
    ),
    estMinutes: 5,
    introducesTerms: ['gestalt'],
    usesTerms: ['ui', 'hierarki', 'alignment', 'whitespace'],
    warmupFrom: 'a07-l03',
    steps: [
      storyStep('a07/rasi-bintang.svg', [
        rText(
          'Saat melihat bintang-bintang di langit malam, otak kita langsung menyambungkannya menjadi bentuk rasi, padahal tidak ada garis di langit!',
          'Tanpa adanya garis penghubung di langit malam, otak manusia otomatis menyambung dan mengelompokkan titik bintang menjadi rasi. Prinsip inilah yang dipelajari dalam psikologi Gestalt.',
        ),
      ]),
      conceptStep({
        title: t('Dekat dan Mirip Jadi Satu Grup', 'Gestalt: Proximity & Similarity'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'gestalt-proximity-similarity' },
        alt: t('Titik berdekatan dan ikon berwarna sama terlihat berkelompok.'),
        body: [
          rText('Menurut '),
          rTerm('gestalt', 'prinsip Gestalt', 'prinsip Gestalt'),
          rText(
            ', yang dekat atau mirip langsung dianggap sejenis.',
            ', otak mengelompokkan elemen berdekatan (Proximity) atau mirip bentuk serta warnanya (Similarity) sebagai satu jenis fungsi.',
          ),
        ],
      }),
      conceptStep({
        title: t('Otak Melengkapi & Mengikuti Arah', 'Closure & Continuity'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'gestalt-closure-continuity' },
        alt: t('Ikon dengan garis terputus tetap terbaca utuh dan titik berbaris melengkung diikuti mata.'),
        body: [
          rBold('Closure', 'Closure'),
          rText(' membuat otak melengkapi bentuk putus-putus. ', ' melengkapi siluet yang terputus. '),
          rBold('Continuity', 'Continuity'),
          rText(' menuntun mata mengikuti deretan garis.', ' menuntun mata menyusuri garis lurus atau lengkungan seperti stepper.'),
        ],
      }),
      conceptStep({
        title: t('Dalam Satu Kotak & Terpisah dari Latar', 'Common Region & Figure–Ground'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'gestalt-region-figure' },
        alt: t('Elemen di dalam satu kotak kartu dianggap satu grup dan pop-up terpisah dari latar belakang.'),
        body: [
          rBold('Common region', 'Common region'),
          rText(' menyatukan isi dalam satu kotak kartu. ', ' mengelompokkan semua yang berada di dalam satu kotak atau latar. '),
          rBold('Figure–ground', 'Figure–ground'),
          rText(' memisahkan objek dari latarnya.', ' memisahkan objek depan dari latar belakang.'),
        ],
      }),
      limitStep({
        analogy: t('Menghubungkan titik bintang di langit untuk prinsip Gestalt'),
        same: [
          t('Otak manusia otomatis mengelompokkan elemen visual tanpa menunggu tulisan penjelasan panjang.'),
        ],
        different: [
          t('Bintang di langit tidak untuk diklik; di UI, pengelompokan Gestalt yang keliru bisa menipu pengguna sehingga mereka menekan tombol milik kartu sebelah!'),
        ],
      }),
      simStep(
        'hick-menu',
        t(
          'Lihat kotak menu pada simulator: setiap pilihan punya bingkai sendiri agar mata tahu batas tiap tombol!',
          'Amati penerapan Common Region dan Similarity pada deretan kartu tombol di simulator.',
        ),
      ),
      qStep({
        id: 'a07-l04-q1',
        type: 'match',
        prompt: t('Pasangkan prinsip Gestalt dengan kejadian sehari-harinya di UI:'),
        difficulty: 2,
        left: [
          { id: 'sim', label: t('Similarity') },
          { id: 'clo', label: t('Closure') },
          { id: 'reg', label: t('Common Region') },
          { id: 'fig', label: t('Figure–Ground') },
        ],
        right: [
          { id: 'rsim', label: t('Semua tombol aksi utama dibuat bulat biru sehingga dikenal sejenis') },
          { id: 'rclo', label: t('Ikon panda atau logo terputus tetap terbaca utuh oleh mata') },
          { id: 'rreg', label: t('Foto, nama, dan tombol Beli dibungkus dalam satu kotak kartu') },
          { id: 'rfig', label: t('Kotak pesan pop-up terang muncul di atas latar yang digelapkan') },
        ],
        answer: { sim: 'rsim', clo: 'rclo', reg: 'rreg', fig: 'rfig' },
        explainCorrect: t('Sempurna! Enam prinsip Gestalt ini menjelaskan hampir semua cara mata membaca tata letak.'),
        tags: ['gestalt'],
      }),
      qStep(
        makeMcq({
          id: 'a07-l04-q2',
          type: 'analogy',
          prompt: t('Mengapa jendela pop-up peringatan membuat latar belakang di belakangnya sedikit digelapkan?'),
          choices: [
            { id: 'fg', label: t('Memperjelas prinsip Figure–Ground agar mata langsung memisahkan pop-up dari latar') },
            {
              id: 'save',
              label: t('Karena layar laptop kehabisan tinta warna'),
              explainWrong: t('Layar tidak memakai tinta; penggelapan latar untuk mengarahkan fokus mata.'),
            },
            {
              id: 'clo',
              label: t('Untuk menghapus semua tulisan di halaman belakang'),
              explainWrong: t('Halaman belakang hanya diredupkan sementara agar pop-up menonjol di depan.'),
            },
          ],
          answer: 'fg',
          explainCorrect: t('Benar! Figure–ground memisahkan objek utama (figure) dari latar belakang (ground).'),
          tags: ['gestalt', 'ui'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a07-l04-q3',
          prompt: t('Memberi warna dan bentuk yang sama persis kepada tombol "Batal" dan tombol "Hapus" memanfaatkan prinsip Similarity agar pengguna menganggap fungsinya mirip.'),
          answer: true,
          explainCorrect: t('Betul—dan hati-hati! Kalau fungsinya berbahaya seperti Hapus, jangan buat bentuknya mirip tombol aman supaya pengguna tidak salah pencet.'),
          explainWrong: t('Hampir! Similarity membuat hal yang mirip tampak sejenis di mata pengguna.'),
          tags: ['gestalt'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l04-q4',
          type: 'limit',
          analogy: t('Melihat rasi bintang di langit'),
          prompt: t('Apa risiko di antarmuka aplikasi kalau prinsip pengelompokan Gestalt tidak diperhatikan dengan hati-hati?'),
          difficulty: 2,
          choices: [
            { id: 'mis', label: t('Pengguna bisa salah mengira tombol milik produk A adalah milik produk B di sebelahnya') },
            {
              id: 'auto',
              label: t('Otak pengguna tetap otomatis mencari pola kelompok pada halaman'),
              explainWrong: t('Itu memang sifat alami kerja otak manusia.'),
            },
            {
              id: 'line',
              label: t('Pengelompokan terjadi walau tanpa garis panah tebal'),
              explainWrong: t('Itu juga kesamaan dasar cara otak melihat.'),
            },
          ],
          answer: 'mis',
          explainCorrect: t('Tepat! Salah jarak atau salah kotak pembungkus langsung memicu salah klik di UI.'),
          tags: ['gestalt', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l04-q5',
          type: 'scenario',
          story: t('Di situs toko kue Sari, foto kue A, harga kue A, foto kue B, dan harga kue B berderet tanpa bingkai kartu, dan harga kue A malah menempel lebih dekat ke foto kue B.'),
          prompt: t('Cara terbersih memperbaiki masalah Gestalt pada daftar kue Sari adalah…'),
          difficulty: 2,
          choices: [
            { id: 'card', label: t('Bungkus foto, nama, dan harga tiap kue dalam satu kotak kartu rapi (Common Region & Proximity)') },
            {
              id: 'same',
              label: t('Samakan jarak seluruh foto dan seluruh harga tanpa kotak apa pun'),
              explainWrong: t('Jarak sama rata tetap membuat pengguna bingung harga mana milik kue mana.'),
            },
            {
              id: 'hide',
              label: t('Sembunyikan harga semua kue sampai setelah dibayar'),
              explainWrong: t('Menyembunyikan harga membuat UX sangat buruk.'),
            },
          ],
          answer: 'card',
          explainCorrect: t('Benar! Common region dalam bentuk kartu langsung menyatukan foto dan harganya tanpa ragu.'),
          tags: ['gestalt', 'ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l04-q6',
          prompt: t('Deretan angka langkah "1 — 2 — 3 — 4" yang dihubungkan garis mendatar memandu mata menyusuri langkah dari kiri ke kanan berkat prinsip…'),
          difficulty: 2,
          choices: [
            { id: 'cont', label: t('Continuity') },
            {
              id: 'clo',
              label: t('Closure'),
              explainWrong: t('Closure melengkapi bentuk terputus menjadi satu sosok utuh.'),
            },
            {
              id: 'fig',
              label: t('Figure–ground'),
              explainWrong: t('Figure–ground memisahkan objek depan dari latar belakang.'),
            },
          ],
          answer: 'cont',
          explainCorrect: t('Tepat! Mata secara alami mengikuti arah garis atau urutan yang berkesinambungan (Continuity).'),
          tags: ['gestalt'],
        }),
      ),
      qStep({
        id: 'a07-l04-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi istilah prinsip Gestalt:'),
        difficulty: 2,
        template: 'Prinsip Gestalt di mana mata manusia memisahkan objek utama dari latar belakangnya disebut ___.',
        bank: ['figure-ground', 'closure', 'similarity'],
        answer: ['figure-ground'],
        explainCorrect: t('Benar! Kontras dan blur/overlay latar membantu memperjelas hubungan figure–ground.'),
        tags: ['gestalt'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-l04-r1',
        prompt: t('Kumpulan temuan psikologi tentang cara otak manusia melihat pola dan mengelompokkan bentuk disebut prinsip…'),
        choices: [
          { id: 'g', label: t('Gestalt') },
          { id: 'v', label: t('Viewport'), explainWrong: t('Viewport adalah luas area layar yang tampak.') },
        ],
        answer: 'g',
        explainCorrect: t('Prinsip Gestalt menjadi fondasi banyak aturan tata letak UI.'),
        tags: ['gestalt'],
      }),
      makeTf({
        id: 'a07-l04-r2',
        prompt: t('Menurut prinsip Common Region, elemen yang diletakkan di dalam satu kotak kartu dibaca sebagai satu kelompok.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('Batas kotak atau warna latar yang sama langsung menyatukan elemen di dalamnya.'),
        tags: ['gestalt'],
      }),
    ],
    recap: t(
      'Otak mengelompokkan hal yang dekat, mirip, segaris, atau berada dalam satu kotak lewat prinsip Gestalt.',
      'Manfaatkan enam prinsip Gestalt—Proximity, Similarity, Closure, Continuity, Common Region, dan Figure–Ground—untuk struktur UI tanpa kebingungan.',
    ),
    companion: {
      talkPrompts: ['Coba lihat ikon baterai atau sinyal di pojok HP: garis putus-putus atau lengkungannya tetap terbaca utuh, ya? Itu prinsip Closure!'],
      offlineActivity: 'Gambar 6 titik yang diletakkan berkelompok 2-2-2 di kertas; tanyakan ke teman ada berapa kelompok yang langsung terlihat matanya.',
    },
  }),

  makeLesson({
    id: 'a07-l05',
    worldId: 'a07',
    title: 'Hukum pilihan: Hick dan Jakob',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku tahu mengapa pilihan tidak boleh terlalu banyak dan letak tombol sebaiknya ikut kebiasaan umum.',
      "Aku bisa menerapkan Hick's Law dan Jakob's Law untuk menyederhanakan menu dan tata letak.",
    ),
    estMinutes: 5,
    introducesTerms: ['hick-law'],
    usesTerms: ['ui', 'ux', 'hierarki'],
    stickerId: 'warung-menu',
    warmupFrom: 'a07-l04',
    steps: [
      storyStep('a07/warung-menu.svg', [
        rText(
          'Di warung dengan 5 menu, kamu langsung memesan! Di restoran dengan 80 menu, kamu bingung sepuluh menit. Di semua mobil, setir juga selalu ada di depan!',
          'Warung dengan 5 menu membuatmu cepat memesan dibanding buku 80 menu. Sementara di mobil apa pun, setir selalu di depan dan rem di kaki—mengubah letak kebiasaan itu hanya bikin celaka.',
        ),
      ]),
      conceptStep({
        title: t('Kebanyakan Pilihan Bikin Lama', "1. Hick's Law"),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'hick-law-pilihan' },
        alt: t('Empat pilihan cepat dipilih dibanding enam belas pilihan yang membingungkan.'),
        body: [
          rTerm('hick-law', "Hick's Law", "Hick's Law"),
          rText(
            ' menyatakan makin banyak pilihan, makin lama orang memutuskan. Batasi menu utama 5–7 item!',
            ' menyatakan waktu memutuskan bertambah seiring jumlah pilihan. Batasi menu utama 5–7 item, pecah form panjang bertahap, dan sorot satu saran.',
          ),
        ],
      }),
      conceptStep({
        title: t('Ikuti Kebiasaan Umum', "2. Jakob's Law"),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'jakob-law-kebiasaan' },
        alt: t('Logo di kiri atas, kaca pembesar untuk cari, dan keranjang belanja di kanan atas.'),
        body: [
          rBold("Jakob's Law", "Jakob's Law"),
          rText(
            ': orang terbiasa memakai website lain. Taruh logo kiri atas, cari dengan kaca pembesar, dan keranjang kanan atas.',
            ' mengingatkan bahwa pengguna lebih banyak menghabiskan waktu di situs lain. Ikuti pola familier (logo kiri atas, cari kaca pembesar, keranjang kanan atas).',
          ),
        ],
      }),
      conceptStep({
        title: t('Bagaimana Jika Barangnya Banyak?', 'Mengelola Katalog Besar'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'kategori-dan-saran' },
        alt: t('Ribuan barang dikelompokkan dalam beberapa kategori dan filter.'),
        body: [
          rText(
            'Kalau barangnya banyak, buat beberapa kategori. Beri tanda "Paling Laris" pada satu pilihan.',
            'Saat katalog besar tak terhindarkan, bantu keputusan pengguna dengan membagi kategori ringkas, filter bertahap, serta menonjolkan satu pilihan rekomendasi.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Warung 5 menu dan setir mobil untuk Hick & Jakob'),
        same: [
          t('Mengurangi beban memilih seketika dan mengikuti posisi tombol yang sudah akrab di ingatan pengguna.'),
        ],
        different: [
          t('Restoran kecil bisa cuma punya 5 makanan, tetapi toko online punya ribuan barang—karena itu Hick diterapkan lewat kategori dan filter, bukan membuang produk!'),
        ],
      }),
      simStep(
        'hick-menu',
        t(
          'Coba sendiri cari "Teh Hangat ★" saat ada 4 menu lalu bandingkan waktumu saat ada 16 menu!',
          'Ukur langsung perbedaan waktu keputusan antara 4 pilihan dan 16 pilihan pada simulator Hick’s Law.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a07-l05-q1',
          type: 'analogy',
          prompt: t('Ibarat memindahkan pedal rem mobil ke atap, kesalahan desain web mana yang melanggar Jakob’s Law?'),
          choices: [
            { id: 'swap', label: t('Menaruh ikon kaca pembesar untuk tombol "Keluar" dan menaruh keranjang belanja di pojok kiri bawah') },
            {
              id: 'top',
              label: t('Menaruh logo di kiri atas yang jika diklik kembali ke beranda'),
              explainWrong: t('Itu justru kebiasaan umum yang sudah dikenal pengguna.'),
            },
            {
              id: 'search',
              label: t('Memakai ikon kaca pembesar untuk kotak pencarian'),
              explainWrong: t('Ikon kaca pembesar untuk mencari sesuai Jakob’s Law.'),
            },
          ],
          answer: 'swap',
          explainCorrect: t('Benar! Jangan berkreasi membalik arti ikon atau letak standar yang sudah menjadi kebiasaan umum.'),
          tags: ['hick-law', 'ux'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a07-l05-q2',
          prompt: t("Menurut Hick's Law, menampilkan 25 tombol menu sejajar di bilah atas membuat pengunjung lebih cepat menemukan tujuannya."),
          answer: false,
          explainCorrect: t("Betul, pernyataan itu salah! Terlalu banyak pilihan membuat pengguna lambat dan bingung memutuskan."),
          explainWrong: t("Hampir! Hick's Law menyarankan membatasi menu utama sekitar 5–7 item saja."),
          tags: ['hick-law'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l05-q3',
          type: 'limit',
          analogy: t('Warung dengan 5 menu'),
          prompt: t('Jika sebuah toko buku online menjual 5.000 judul buku, bagaimana cara menerapkan Hick’s Law secara tepat?'),
          difficulty: 2,
          choices: [
            { id: 'cat', label: t('Bagi menjadi beberapa kategori jelas, sediakan kotak cari dan filter, bukan menghapus ribuan bukunya') },
            {
              id: 'del',
              label: t('Jual hanya 5 buku saja di seluruh toko online'),
              explainWrong: t('Toko besar tetap butuh menjual banyak produk dengan cara mengelompokkannya.'),
            },
            {
              id: 'dump',
              label: t('Tampilkan 5.000 tautan sekaligus dalam satu menu panjang di atas'),
              explainWrong: t('Itu justru melanggar Hick’s Law paling parah.'),
            },
          ],
          answer: 'cat',
          explainCorrect: t('Tepat! Pengelompokan dan filter bertahap menjaga jumlah pilihan di setiap langkah tetap ringan.'),
          tags: ['hick-law'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l05-q4',
          type: 'scenario',
          story: t('Di halaman berlangganan aplikasi belajar Dimas, ada 12 pilihan paket berbeda dengan nama membingungkan sehingga pengguna menutup halaman tanpa memilih apa pun.'),
          prompt: t('Solusi terbaik berdasarkan Hick’s Law adalah…'),
          difficulty: 2,
          choices: [
            { id: 'rec', label: t('Ringkas menjadi 3 paket yang jelas dan beri label "Paling Populer" pada paket yang disarankan') },
            {
              id: 'more',
              label: t('Tambah 10 paket lagi supaya makin lengkap'),
              explainWrong: t('Menambah pilihan hanya makin memperlambat dan melumpuhkan keputusan.'),
            },
            {
              id: 'hide',
              label: t('Ubah ikon keranjang belanja menjadi gambar pisang'),
              explainWrong: t('Mengubah ikon standar hanya melanggar Jakob’s Law juga.'),
            },
          ],
          answer: 'rec',
          explainCorrect: t('Benar! Mengurangi pilihan menjadi 3–4 paket utama mempercepat keputusan pengguna.'),
          tags: ['hick-law', 'ux'],
        }),
      ),
      qStep({
        id: 'a07-l05-q5',
        type: 'sort',
        prompt: t('Kelompokkan keputusan berikut ke "Ikuti Kebiasaan (Jakob)" atau "Sederhanakan Pilihan (Hick)":'),
        difficulty: 2,
        items: [
          { id: 'h1', label: t('Batasi menu utama navigasi menjadi 5–7 item') },
          { id: 'j1', label: t('Gunakan ikon kaca pembesar untuk kolom pencarian') },
          { id: 'h2', label: t('Pecah formulir panjang menjadi 3 langkah bertahap') },
          { id: 'j2', label: t('Taruh tombol keranjang belanja di pojok kanan atas') },
        ],
        bins: [
          { id: 'hick', label: t("Hick's Law") },
          { id: 'jakob', label: t("Jakob's Law") },
        ],
        answer: { h1: 'hick', j1: 'jakob', h2: 'hick', j2: 'jakob' },
        explainCorrect: t('Luar biasa! Hick menjaga pilihan tidak membanjiri; Jakob menjaga pola tetap akrab.'),
        tags: ['hick-law'],
      }),
      qStep(
        makeMcq({
          id: 'a07-l05-q6',
          type: 'why',
          base: 'jakob-law',
          prompt: t("Mengapa pengguna langsung merasa kesal bila sebuah toko online mengganti ikon keranjang belanja dengan ikon aneh buatan sendiri di bawah halaman?"),
          difficulty: 2,
          choices: [
            { id: 'hab', label: t('Karena mereka membawa kebiasaan dari banyak website lain dan langsung tahu di mana keranjang biasanya berada') },
            {
              id: 'bug',
              label: t('Karena HTML melarang ikon ditaruh di bawah'),
              explainWrong: t('HTML membolehkan ikon di mana saja, tetapi psikologi kebiasaan penggunalah yang terganggu.'),
            },
            {
              id: 'slow',
              label: t('Karena gambar ikon aneh selalu berukuran 100 MB'),
              explainWrong: t('Masalah utamanya adalah kebingungan kebiasaan (Jakob’s Law), bukan ukuran file.'),
            },
          ],
          answer: 'hab',
          explainCorrect: t('Tepat! Mengikuti pola familier membuat pengguna baru langsung bisa memakai situsmu tanpa belajar ulang.'),
          tags: ['hick-law', 'ux'],
        }),
      ),
      qStep({
        id: 'a07-l05-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi pedoman praktis Hick’s Law untuk menu navigasi utama:'),
        difficulty: 1,
        template: 'Batasi pilihan menu utama sekitar ___ item agar pengguna cepat memutuskan.',
        bank: ['5–7', '50–80', '100'],
        answer: ['5–7'],
        explainCorrect: t('Benar! Sekitar 5 hingga 7 menu utama menjaga navigasi cepat dipindai tanpa kewalahan.'),
        tags: ['hick-law'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-l05-r1',
        prompt: t("Inti utama dari Hick's Law adalah…"),
        choices: [
          { id: 'ok', label: t('Semakin banyak pilihan, semakin lama waktu untuk memutuskan') },
          { id: 'no', label: t('Semakin kecil tombol, semakin cepat diklik'), explainWrong: t('Ukuran tombol dan jarak dibahas di Fitts’s Law.') },
        ],
        answer: 'ok',
        explainCorrect: t("Hick's Law membantu kita memangkas pilihan yang tidak perlu."),
        tags: ['hick-law'],
      }),
      makeTf({
        id: 'a07-l05-r2',
        prompt: t("Menurut Jakob's Law, pengguna berharap websitemu bekerja mengikuti pola kebiasaan yang sudah mereka kenal di website lain."),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('Jangan mengubah kebiasaan standar seperti letak logo, kolom cari, atau keranjang tanpa alasan kuat.'),
        tags: ['hick-law'],
      }),
    ],
    recap: t(
      "Batasi pilihan utama agar cepat diputuskan (Hick's Law) dan ikuti letak kebiasaan umum (Jakob's Law).",
      "Terapkan Hick's Law (5–7 item, filter, sorot rekomendasi) dan Jakob's Law (pola navigasi serta ikon familier).",
    ),
    companion: {
      talkPrompts: ['Kalau melihat warung makan dengan 3 halaman daftar menu vs 5 menu andalan di papan tulis, mana yang lebih cepat dipesan?'],
      offlineActivity: 'Buka dua website belanja atau berita yang berbeda, lalu cek apakah posisi logo dan ikon pencariannya ada di tempat yang mirip.',
    },
  }),

  makeLesson({
    id: 'a07-l06',
    worldId: 'a07',
    title: 'Hukum gerak: Fitts dan Doherty',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku paham bahwa tombol utama harus cukup besar, dekat jempol, dan merespons dengan cepat.',
      "Aku bisa menerapkan Fitts's Law (ukuran, jarak, area jempol) dan Doherty Threshold (< 0,4 detik).",
    ),
    estMinutes: 5,
    introducesTerms: ['fitts-law'],
    usesTerms: ['ui', 'ux', 'responsif'],
    warmupFrom: 'a07-l05',
    steps: [
      storyStep('a07/gawang-fitts.svg', [
        rText(
          'Menendang bola ke gawang lebar dari dekat jauh lebih mudah daripada menendang ke gawang mini dari tengah lapangan! Dan mengobrol dengan teman yang diam 5 detik sebelum menjawab terasa melelahkan.',
          'Seperti menendang ke gawang besar dari jarak dekat dibanding gawang mini dari jauh, atau mengobrol dengan orang yang baru menjawab setelah diam 5 detik, gerak jari dan kecepatan respons menentukan kenyamanan UI.',
        ),
      ]),
      conceptStep({
        title: t('Besar dan Dekat Jempol: Fitts’s Law', "1. Fitts's Law"),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'area-jempol-fitts' },
        alt: t('Tombol Bayar besar di bagian bawah layar HP dekat jangkauan jempol.'),
        body: [
          rTerm('fitts-law', "Fitts's Law", "Fitts's Law"),
          rText(
            ': target lebih besar dan dekat lebih mudah diklik. Taruh tombol utama di bawah layar HP dekat jempol!',
            ': makin besar dan dekat sebuah target, makin cepat dicapai. Buat tombol utama besar di area jempol dan jauhkan tombol berbahaya seperti Hapus.',
          ),
        ],
      }),
      conceptStep({
        title: t('Jangan Buat Pengguna Menunggu', '2. Doherty Threshold (< 0,4 Detik)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'batas-doherty-04-detik' },
        alt: t('Jam ukur menunjukkan batas terasa instan kurang dari 0,4 detik.'),
        body: [
          rBold('Doherty Threshold', 'Doherty Threshold'),
          rText(
            ': tanggapan di bawah 0,4 detik langsung terasa lancar!',
            ': jika sistem menanggapi dalam < 0,4 detik, pengguna merasa alurnya lancar dan tetap fokus.',
          ),
        ],
      }),
      conceptStep({
        title: t('Beri Tanda Jika Sedang Memproses', 'Umpan Balik Seketika & Skeleton'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'loading-dan-skeleton' },
        alt: t('Tombol berubah warna saat diklik lalu muncul kerangka skeleton sementara data dimuat.'),
        body: [
          rText(
            'Setiap tombol diklik, langsung ubah tampilannya! Kalau butuh waktu lama, tampilkan animasi muat atau kerangka abu-abu.',
            'Selalu beri tanggapan seketika pada tiap klik (ubah warna/status tombol). Untuk proses lebih lama dari 0,4 detik, tampilkan skeleton atau progress bar.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Gawang lebar dan obrolan jeda 5 detik untuk Fitts & Doherty'),
        same: [
          t('Sasaran yang lebar serta dekat mudah dicapai, dan jawaban cepat menjaga alur tetap hidup.'),
        ],
        different: [
          t('Tombol di layar HP tidak boleh diperbesar raksasa memenuhi seluruh layar—cukup minimal 44–48px—dan tombol berbahaya seperti Hapus justru dibuat jauh agar tidak sengaja terpencet.'),
        ],
      }),
      simStep(
        'fitts-target',
        t(
          'Bandingkan rasanya mengetuk tombol mini di pojok atas vs tombol besar dekat jempol di bawah!',
          'Uji langsung perbedaan kemudahan mengetuk target kecil jauh vs tombol besar di zona jempol.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a07-l06-q1',
          type: 'analogy',
          prompt: t('Tombol besar yang diletakkan di bagian bawah layar HP sehingga mudah dijangkau ibu jari adalah penerapan…'),
          choices: [
            { id: 'fit', label: t("Fitts's Law") },
            {
              id: 'doh',
              label: t('Doherty Threshold'),
              explainWrong: t('Doherty Threshold membahas kecepatan waktu respons di bawah 0,4 detik.'),
            },
            {
              id: 'col',
              label: t('Roda warna primer'),
              explainWrong: t('Roda warna membahas keserasian warna, bukan ukuran dan jarak tombol.'),
            },
          ],
          answer: 'fit',
          explainCorrect: t("Benar! Fitts's Law memaksimalkan kemudahan dengan ukuran cukup besar dan jarak dekat jempol."),
          tags: ['fitts-law'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a07-l06-q2',
          prompt: t('Menurut Doherty Threshold, respons aplikasi di bawah 0,4 detik membuat pengguna merasa lancar dan tetap fokus.'),
          answer: true,
          explainCorrect: t('Betul! Di bawah 400 milidetik terasa nyaris instan bagi otak manusia.'),
          explainWrong: t('Hampir! Batas terasa cepat menurut Doherty Threshold adalah sekitar 0,4 detik.'),
          tags: ['fitts-law'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l06-q3',
          type: 'limit',
          analogy: t('Menendang bola ke gawang selebar mungkin'),
          prompt: t('Menurut batas penerapan Fitts’s Law, tombol manakah yang justru TIDAK boleh ditaruh tepat menempel dengan tombol "Simpan"?'),
          difficulty: 2,
          choices: [
            { id: 'del', label: t('Tombol berbahaya seperti "Hapus Semua Data"') },
            {
              id: 'ok',
              label: t('Tombol "Beli Sekarang" di bagian bawah halaman belanja'),
              explainWrong: t('Tombol aksi utama justru bagus ditempatkan di area yang mudah dijangkau.'),
            },
            {
              id: 'next',
              label: t('Tombol "Lanjut" di halaman pendaftaran'),
              explainWrong: t('Tombol Lanjut adalah aksi utama yang memang perlu mudah dijangkau.'),
            },
          ],
          answer: 'del',
          explainCorrect: t('Tepat! Fitts’s Law juga dipakai menjauhkan tombol berbahaya agar jari tidak salah pencet.'),
          tags: ['fitts-law', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l06-q4',
          type: 'scenario',
          story: t('Saat Rani menekan tombol "Kirim Pesanan" di toko online, butuh waktu 2 detik untuk server menjawab, tetapi tombol itu diam saja tanpa animasi muat sehingga Rani mengira belum kepencet dan menekan 4 kali!'),
          prompt: t('Cara terbaik mengatasi masalah Doherty Threshold ini adalah…'),
          difficulty: 2,
          choices: [
            { id: 'load', label: t('Ubah tampilan tombol seketika (< 0,4 dtk) menjadi bertulis "Mengirim..." atau tampilkan spinner/progress') },
            {
              id: 'tiny',
              label: t('Kecilkan tombolnya jadi 10px di pojok kanan atas'),
              explainWrong: t('Mengecilkan tombol justru menyusahkan dan tidak memberi tahu status proses.'),
            },
            {
              id: 'hide',
              label: t('Hilangkan seluruh layar selama 2 detik menjadi putih kosong'),
              explainWrong: t('Layar putih kosong membuat pengguna panik mengira aplikasinya rusak.'),
            },
          ],
          answer: 'load',
          explainCorrect: t('Benar! Tanggapan visual langsung (< 0,4 dtk) menenangkan pengguna sambil menunggu server selesai.'),
          tags: ['fitts-law', 'ux'],
        }),
      ),
      qStep({
        id: 'a07-l06-q5',
        type: 'match',
        prompt: t('Pasangkan masalah UI di HP dengan hukum yang menjelaskannya:'),
        difficulty: 2,
        left: [
          { id: 'f1', label: t('Tombol "Tutup" hanya sebesar 12px di pojok sulit dijangkau jempol') },
          { id: 'd1', label: t('Setelah diklik, layar diam membisu 3 detik tanpa tanda loading') },
          { id: 'f2', label: t('Tombol "Hapus Akun" menempel rapat di sebelah "Simpan Profil"') },
        ],
        right: [
          { id: 'rf1', label: t("Fitts's Law — target terlalu kecil dan jauh") },
          { id: 'rd1', label: t('Doherty Threshold — tidak ada respons instan < 0,4 dtk') },
          { id: 'rf2', label: t("Fitts's Law — aksi berbahaya terlalu dekat aksi harian") },
        ],
        answer: { f1: 'rf1', d1: 'rd1', f2: 'rf2' },
        explainCorrect: t('Mantap! Kamu membedakan masalah ukuran/jarak gerak dengan masalah kecepatan respons.'),
        tags: ['fitts-law'],
      }),
      qStep(
        makeMcq({
          id: 'a07-l06-q6',
          prompt: t('Jika data daftar barang memang butuh 1,5 detik untuk diambil dari server, tampilan pengganti sementara yang menjaga rasa cepat di layar adalah…'),
          difficulty: 2,
          choices: [
            { id: 'skel', label: t('Skeleton loading (kerangka kotak abu berkedip halus) atau progress bar') },
            {
              id: 'err',
              label: t('Pesan "Gagal Memuat" sebelum data selesai datang'),
              explainWrong: t('Jangan tampilkan error padahal data masih dalam perjalanan.'),
            },
            {
              id: 'blank',
              label: t('Membiarkan halaman membeku tak bisa diklik tanpa pesan apa pun'),
              explainWrong: t('Halaman membeku tanpa keterangan membuat pengguna cepat pergi.'),
            },
          ],
          answer: 'skel',
          explainCorrect: t('Tepat! Skeleton memberi tahu pengguna bahwa tata letak sedang disiapkan dan terasa lebih cepat.'),
          tags: ['fitts-law', 'ux'],
        }),
      ),
      qStep({
        id: 'a07-l06-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Berapa detik batas waktu tanggapan sistem agar terasa "instan" menurut Doherty Threshold? (tulis angkanya saja, mis. 0.4 atau 0,4)'),
        difficulty: 2,
        accept: ['0.4', '0,4', '0.4 detik', '0,4 detik'],
        explainCorrect: t('Tepat! Sekitar 0,4 detik (400 ms) menjadi patokan interaksi yang terasa seketika.'),
        tags: ['fitts-law'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-l06-r1',
        prompt: t("Menurut Fitts's Law, posisi paling nyaman untuk tombol utama pada layar HP adalah…"),
        choices: [
          { id: 'bot', label: t('Bagian bawah layar di area jangkauan jempol dengan ukuran cukup besar') },
          { id: 'top', label: t('Pojok paling atas kanan berukuran mungil'), explainWrong: t('Pojok atas paling jauh dari jangkauan ibu jari saat memegang HP dengan satu tangan.') },
        ],
        answer: 'bot',
        explainCorrect: t('Target besar di area jempol cepat dan akurat diketuk.'),
        tags: ['fitts-law'],
      }),
      makeTf({
        id: 'a07-l06-r2',
        prompt: t('Setiap klik tombol sebaiknya memunculkan umpan balik seketika meskipun proses ke server butuh waktu lebih dari 0,4 detik.'),
        answer: true,
        explainCorrect: t('Betul! Perubahan tombol atau loading langsung menjaga fokus dan kepastian pengguna.'),
        explainWrong: t('Umpan balik instan memberi kepastian bahwa klik pengguna sudah diterima sistem.'),
        tags: ['fitts-law'],
      }),
    ],
    recap: t(
      "Buat tombol utama besar dan dekat jempol (Fitts's Law) serta beri tanggapan cepat di bawah 0,4 detik (Doherty Threshold).",
      "Terapkan Fitts's Law (ukuran ≥ 44px di zona jempol, jauhkan tombol berbahaya) dan Doherty Threshold (< 0,4 dtk dengan skeleton/loading).",
    ),
    companion: {
      talkPrompts: ['Pegang HP dengan satu tangan: bagian layar mana yang paling gampang dijangkau ujung jempolmu?'],
      offlineActivity: 'Buka kalkulator atau aplikasi chat di HP dengan satu tangan, lalu tunjuk tombol mana saja yang butuh jari tangan kedua untuk mencapainya.',
    },
  }),

  makeLesson({
    id: 'a07-l07',
    worldId: 'a07',
    title: 'Hukum ingatan: Miller, Serial Position, Von Restorff',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa memenggal informasi agar mudah diingat dan menonjolkan satu tombol paling penting.',
      "Aku bisa menerapkan Miller's Law (chunking 7±2), Von Restorff Effect, dan Serial Position Effect.",
    ),
    estMinutes: 6,
    introducesTerms: ['miller-law'],
    usesTerms: ['ui', 'ux', 'hierarki'],
    warmupFrom: 'a07-l06',
    steps: [
      storyStep('a07/baju-merah-angka.svg', [
        rText(
          'Nomor HP 0812-3456-7890 dipenggal agar gampang diingat! Di rombongan berbaju putih, satu orang berbaju merah juga paling langsung terlihat.',
          'Nomor 081234567890 jauh lebih mudah diingat bila dipenggal jadi 0812-3456-7890, seperti satu orang berbaju merah di tengah kerumunan baju putih langsung menempel di ingatan.',
        ),
      ]),
      conceptStep({
        title: t('Penggal Jadi Kelompok Kecil: Miller', "1. Miller's Law (Chunking)"),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'miller-chunking-nomor' },
        alt: t('Deret angka panjang 081234567890 dipenggal jadi 0812-3456-7890.'),
        body: [
          rTerm('miller-law', "Miller's Law", "Miller's Law"),
          rText(
            ': ingatan kita cuma kuat menampung sekitar 7 hal. Penggal info menjadi kelompok kecil!',
            ': memori jangka pendek manusia rata-rata menampung 7 (±2) potong info. Gunakan chunking pada nomor, formulir, dan bagian bacaan.',
          ),
        ],
      }),
      conceptStep({
        title: t('Yang Beda Sendiri Diingat: Von Restorff', '2. Von Restorff Effect (Efek Isolasi)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'von-restorff-baju-merah' },
        alt: t('Satu tombol merah menonjol di antara tiga kartu netral berlabel Paling Laris.'),
        body: [
          rBold('Von Restorff Effect', 'Von Restorff Effect'),
          rText(
            ': dari benda yang mirip, yang beda sendiri paling diingat. Cukup beri warna mencolok pada SATU tombol utama!',
            ': dari sekumpulan elemen serupa, yang tampil berbeda sendiri paling diingat. Beri warna mencolok pada satu tombol aksi utama atau label "Paling Laris".',
          ),
        ],
      }),
      conceptStep({
        title: t('Awal dan Akhir Paling Nempel', '3. Serial Position Effect'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'serial-position-awal-akhir' },
        alt: t('Menu Beranda di ujung kiri dan Profil di ujung kanan paling mudah diingat.'),
        body: [
          rBold('Serial Position', 'Serial Position Effect'),
          rText(
            ': kita paling ingat bagian pertama dan terakhir di daftar. Taruh menu terpenting di ujung kiri dan ujung kanan!',
            ': item pertama dan terakhir dalam deretan paling mudah diingat. Letakkan menu kunci seperti Beranda di ujung kiri dan Profil di ujung kanan.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Nomor telepon terpenggal dan baju merah untuk hukum ingatan'),
        same: [
          t('Mengelompokkan info meringankan kerja ingatan dan satu pembeda kuat langsung merebut perhatian.'),
        ],
        different: [
          t('Jangan pernah memaksa pengguna menghafal info dari halaman sebelumnya walau sudah dipenggal—tampilkan ringkasannya tetap terlihat di layar saat ini!'),
        ],
      }),
      simStep(
        'fitts-target',
        t(
          'Lihat tombol besar berwarna berbeda di bawah layar: satu tombol mencolok paling mudah diingat!',
          'Amati bagaimana satu tombol pembeda utama menonjol di layar dibanding tombol lain.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a07-l07-q1',
          type: 'analogy',
          prompt: t('Satu orang berjaket merah terang di tengah rombongan seragam putih paling langsung tertangkap mata dan diingat. Ini menggambarkan…'),
          choices: [
            { id: 'vr', label: t('Von Restorff Effect (efek isolasi)') },
            {
              id: 'sp',
              label: t('Serial Position Effect'),
              explainWrong: t('Serial Position membahas posisi paling awal dan paling akhir dalam sebuah urutan.'),
            },
            {
              id: 'mil',
              label: t("Miller's Law"),
              explainWrong: t("Miller's Law membahas batas memori 7±2 potong dan pengelompokan (chunking)."),
            },
          ],
          answer: 'vr',
          explainCorrect: t('Benar! Elemen yang tampil beda sendiri dari kelompoknya langsung mencuri perhatian.'),
          tags: ['miller-law'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a07-l07-q2',
          prompt: t('Agar banyak hal diingat sekaligus, kita sebaiknya memberi warna merah menyala dan tanda "HOT!" pada seluruh 10 tombol di halaman.'),
          answer: false,
          explainCorrect: t('Betul, pernyataan itu salah! Kalau semua ditonjolkan, akhirnya tidak ada satu pun yang menonjol.'),
          explainWrong: t('Hampir! Von Restorff Effect hanya bekerja bila cuma SATU aksi utama yang tampil berbeda.'),
          tags: ['miller-law', 'hierarki'],
        }),
      ),
      qStep({
        id: 'a07-l07-q3',
        type: 'match',
        prompt: t('Pasangkan contoh desain dengan hukum ingatan UX yang mendasarinya:'),
        difficulty: 2,
        left: [
          { id: 'm1', label: t('Nomor kartu dipisah per 4 angka (4111 2222 3333 4444)') },
          { id: 'm2', label: t('Menu "Beranda" di ujung kiri dan "Profil" di ujung kanan') },
          { id: 'm3', label: t('Satu paket harga diberi bingkai sorot "Paling Laris"') },
        ],
        right: [
          { id: 'rm1', label: t("Miller's Law (chunking)") },
          { id: 'rm2', label: t('Serial Position Effect') },
          { id: 'rm3', label: t('Von Restorff Effect') },
        ],
        answer: { m1: 'rm1', m2: 'rm2', m3: 'rm3' },
        explainCorrect: t('Mantap! Ketiga hukum memori ini membuat antarmuka ringan dicerna otak.'),
        tags: ['miller-law'],
      }),
      qStep(
        makeMcq({
          id: 'a07-l07-q4',
          type: 'limit',
          analogy: t('Mengelompokkan nomor telepon agar gampang dihafal'),
          prompt: t('Menurut batas ingatan di aplikasi nyata, apa yang TIDAK boleh disuruh lakukan kepada pengguna pada proses bayar?'),
          difficulty: 2,
          choices: [
            { id: 'mem', label: t('Menghafal kode barang atau total harga dari halaman 1 karena halaman bayar tidak menampilkannya lagi') },
            {
              id: 'chk',
              label: t('Memecah kolom isian menjadi beberapa kelompok kecil seperti Data Diri dan Alamat'),
              explainWrong: t('Membagi formulir menjadi kelompok adalah penerapan chunking yang baik.'),
            },
            {
              id: 'show',
              label: t('Menampilkan ulang ringkasan barang yang dipilih pada layar pembayaran'),
              explainWrong: t('Menampilkan ulang ringkasan justru meringankan ingatan pengguna.'),
            },
          ],
          answer: 'mem',
          explainCorrect: t('Tepat! Desain yang baik membantu pengguna mengenali info langsung di layar, bukan menyuruhnya menghafal.'),
          tags: ['miller-law', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l07-q5',
          type: 'scenario',
          story: t('Pada bilah navigasi bawah aplikasi sekolah dengan 5 tombol (Beranda, Jadwal, Tugas, Nilai, Profil), tombol mana yang menurut Serial Position Effect akan paling mudah diingat letaknya?'),
          prompt: t('Pilih pasangan tombol yang paling kuat tertanam di ingatan urutan pengguna:'),
          difficulty: 2,
          choices: [
            { id: 'ends', label: t('Beranda (paling awal) dan Profil (paling akhir)') },
            {
              id: 'mid',
              label: t('Tugas (tepat di tengah) saja'),
              explainWrong: t('Item di bagian tengah urutan justru paling mudah terlupakan kecuali diberi pembeda visual.'),
            },
            {
              id: 'none',
              label: t('Semua tombol mustahil diingat tanpa dihafal seminggu'),
              explainWrong: t('Posisi ujung kiri dan kanan secara alami lebih cepat diingat manusia.'),
            },
          ],
          answer: 'ends',
          explainCorrect: t('Benar! Posisi pertama dan terakhir paling melekat menurut Serial Position Effect.'),
          tags: ['miller-law'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l07-q6',
          prompt: t("Berapa perkiraan kapasitas potongan informasi yang dapat ditampung memori jangka pendek manusia sekaligus menurut Miller's Law?"),
          difficulty: 1,
          choices: [
            { id: 'seven', label: t('Kira-kira 7 (±2) hal') },
            {
              id: 'fifty',
              label: t('Sekitar 50 hal sekaligus tanpa dikelompokkan'),
              explainWrong: t('50 potong sekaligus tanpa pengelompokan jauh melampaui batas memori kerja.'),
            },
            {
              id: 'zero',
              label: t('Hanya 0 atau 1 huruf'),
              explainWrong: t('Manusia mampu mengingat sekitar 5 hingga 9 potong sekaligus.'),
            },
          ],
          answer: 'seven',
          explainCorrect: t('Tepat! Kapasitas 7 (±2) membuat pengelompokan (chunking) sangat penting dalam desain UI.'),
          tags: ['miller-law'],
        }),
      ),
      qStep({
        id: 'a07-l07-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi istilah teknik memecah deretan panjang seperti 081234567890 menjadi 0812-3456-7890:'),
        difficulty: 2,
        template: 'Teknik memenggal informasi menjadi beberapa kelompok kecil agar mudah diingat disebut ___.',
        bank: ['chunking', 'hovering', 'debugging'],
        answer: ['chunking'],
        explainCorrect: t('Benar! Chunking adalah inti penerapan Miller’s Law di berbagai formulir dan tampilan data.'),
        tags: ['miller-law'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-l07-r1',
        prompt: t('Manakah contoh penerapan Von Restorff Effect yang tepat di layar harga?'),
        choices: [
          { id: 'one', label: t('Menonjolkan warna satu paket pilihan "Paling Laris" di antara tiga paket') },
          { id: 'all', label: t('Menyorot ketiga paket dengan warna neon berkedip semua'), explainWrong: t('Jika semua ditonjolkan, tidak ada efek pembeda.') },
        ],
        answer: 'one',
        explainCorrect: t('Satu pembeda yang jelas menarik fokus dan membantu keputusan.'),
        tags: ['miller-law'],
      }),
      makeTf({
        id: 'a07-l07-r2',
        prompt: t('Orang biasanya paling ingat bagian awal dan akhir dari sebuah deretan menu (Serial Position Effect).'),
        answer: true,
        explainCorrect: t('Betul! Karena itu Beranda dan Profil atau Aksi Utama sering diletakkan di ujung.'),
        explainWrong: t('Awal dan akhir urutan memang paling mudah terekam dibanding bagian tengah.'),
        tags: ['miller-law'],
      }),
    ],
    recap: t(
      'Penggal info panjang (Miller), taruh menu penting di awal/akhir (Serial Position), dan tonjolkan satu tombol (Von Restorff).',
      "Terapkan chunking (Miller's Law 7±2), satu pembeda utama (Von Restorff), dan posisi ujung kiri/kanan (Serial Position).",
    ),
    companion: {
      talkPrompts: ['Kenapa nomor HP lebih gampang dibacakan 0812-3456-7890 daripada dibacakan rapat dua belas angka sekaligus?'],
      offlineActivity: 'Bacakan 8 benda belanjaan berurutan, lalu cek bersama benda mana yang paling mudah teringat (biasanya pertama dan terakhir!).',
    },
  }),

  makeLesson({
    id: 'a07-l08',
    worldId: 'a07',
    title: 'Hukum perasaan: Peak-End, Zeigarnik, Aesthetic-Usability',
    modes: ['pro'],
    objective: t('Aku bisa menjelaskan dan menerapkan Peak-End Rule, Zeigarnik/Goal-Gradient Effect, serta Aesthetic-Usability Effect.'),
    estMinutes: 5,
    introducesTerms: ['peak-end'],
    usesTerms: ['ui', 'ux', 'hierarki', 'usability-testing'],
    warmupFrom: 'a07-l07',
    steps: [
      storyStep('a07/stempel-kopi.svg', [
        rText('Bayangkan kartu stempel kopi "beli 10 gratis 1": saat tinggal dua cap lagi, kamu makin rajin mampir! Dan sebuah liburan biasa tetap terasa berkesan jika punya satu momen puncak indah dan penutupan yang manis.'),
      ]),
      conceptStep({
        title: t('Peak-End Rule'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'peak-end-rule' },
        alt: t('Grafik pengalaman: momen puncak dan momen akhir yang menentukan ingatan pengguna.'),
        body: [
          rTerm('peak-end', 'Peak-End Rule'),
          rText(' menunjukkan orang menilai pengalaman dari momen paling berkesan (puncak) dan momen terakhirnya, bukan rata-ratanya. Buat layar "Pesanan berhasil" yang hangat dan perhalus pesan error agar tidak menjengkelkan.'),
        ],
      }),
      conceptStep({
        title: t('Zeigarnik & Goal-Gradient Effect'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'zeigarnik-goal-gradient' },
        alt: t('Progress bar profil 75% lengkap memotivasi pengguna menyelesaikan sisa 25%.'),
        body: [
          rBold('Zeigarnik Effect'),
          rText(' membuat tugas yang tanggung belum selesai terus teringat, dan '),
          rBold('Goal-Gradient Effect'),
          rText(' membuat pengguna makin bersemangat saat mendekati garis akhir. Terapkan dengan progress bar, "Langkah 2 dari 3", dan checklist onboarding.'),
        ],
      }),
      conceptStep({
        title: t('Aesthetic-Usability Effect'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'aesthetic-usability' },
        alt: t('Makanan ditata cantik terasa lebih nikmat sebagai analogi kesan pertama antarmuka.'),
        body: [
          rBold('Aesthetic-Usability Effect'),
          rText(': tampilan rapi dan indah dipersepsikan lebih mudah dipakai, dan pengguna lebih memaafkan gangguan kecilnya. Namun tetap lakukan '),
          rTerm('usability-testing', 'usability testing'),
          rText(' agar keindahan tidak menutupi cacat alur nyata!'),
        ],
      }),
      limitStep({
        analogy: t('Kartu stempel kopi dan makanan ditata cantik'),
        same: [
          t('Progres yang tampak hampir penuh mendorong penyelesaian, dan kemasan rapi menaikkan kesan awal.'),
        ],
        different: [
          t('Visual indah pada Aesthetic-Usability hanya memaafkan kekurangan kecil—bila tombol utama rusak atau alur gagal, pengguna tetap frustrasi meninggalkan produk.'),
        ],
      }),
      simStep(
        'fitts-target',
        t('Amati bagaimana tampilan rapi dan tombol akhir yang jelas memberi pengalaman penutup yang meyakinkan.'),
      ),
      qStep(
        makeMcq({
          id: 'a07-l08-q1',
          type: 'analogy',
          prompt: t('Layar "Profilmu 80% lengkap—tambahkan foto supaya selesai!" memanfaatkan fenomena psikologi…'),
          choices: [
            { id: 'zg', label: t('Zeigarnik Effect & Goal-Gradient Effect') },
            {
              id: 'pe',
              label: t('Peak-End Rule saja'),
              explainWrong: t('Peak-End Rule berfokus pada puncak emosi dan penutup pengalaman, bukan dorongan menyelesaikan progres tanggung.'),
            },
            {
              id: 'au',
              label: t('Aesthetic-Usability Effect'),
              explainWrong: t('Aesthetic-Usability membahas dampak keindahan visual terhadap persepsi kemudahan.'),
            },
          ],
          answer: 'zg',
          explainCorrect: t('Benar! Tugas yang hampir tuntas terus teringat (Zeigarnik) dan mempercepat semangat menyelesaikan (Goal-Gradient).'),
          tags: ['peak-end', 'ux'],
        }),
      ),
      qStep({
        id: 'a07-l08-q2',
        type: 'match',
        prompt: t('Pasangkan ketiga hukum perasaan UX dengan penerapan nyatanya:'),
        difficulty: 2,
        left: [
          { id: 'pe', label: t('Peak-End Rule') },
          { id: 'zg', label: t('Zeigarnik / Goal-Gradient') },
          { id: 'au', label: t('Aesthetic-Usability') },
        ],
        right: [
          { id: 'rpe', label: t('Halaman "Pesanan berhasil!" yang ramah serta pesan error yang halus') },
          { id: 'rzg', label: t('Penanda "Langkah 2 dari 3" dan progress bar penyelesaian') },
          { id: 'rau', label: t('Merapikan visual dan tipografi agar kesan pertama terasa mudah') },
        ],
        answer: { pe: 'rpe', zg: 'rzg', au: 'rau' },
        explainCorrect: t('Tepat! Ketiganya membentuk emosi positif pengguna sepanjang dan di akhir interaksi.'),
        tags: ['peak-end'],
      }),
      qStep(
        makeTf({
          id: 'a07-l08-q3',
          prompt: t('Selama tampilan UI sudah sangat cantik memanjakan mata, kita tidak perlu lagi menguji kemudahan alurnya ke pengguna asli.'),
          answer: false,
          explainCorrect: t('Betul, itu keliru! Keindahan tidak dapat menyelamatkan alur yang membingungkan atau tombol yang gagal berfungsi.'),
          explainWrong: t('Aesthetic-Usability Effect bukan alasan melewati usability testing.'),
          tags: ['peak-end', 'usability-testing'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l08-q4',
          type: 'limit',
          analogy: t('Makanan yang ditata cantik terasa lebih enak'),
          prompt: t('Apa batas dari Aesthetic-Usability Effect saat diterapkan pada produk perangkat lunak?'),
          difficulty: 2,
          choices: [
            { id: 'fix', label: t('Pengguna hanya memaafkan kekurangan kecil; masalah alur besar dan error tetap membuat produk ditinggalkan') },
            {
              id: 'first',
              label: t('Kesan visual pertama memengaruhi rasa percaya dan nyaman pengguna'),
              explainWrong: t('Ini memang bagian yang benar dari efek tersebut.'),
            },
            {
              id: 'care',
              label: t('Kerapian tampilan menunjukkan perhatian pembuatnya'),
              explainWrong: t('Ini juga efek positif yang nyata.'),
            },
          ],
          answer: 'fix',
          explainCorrect: t('Tepat! Visual indah dan alur fungsional yang teruji harus berjalan beriringan.'),
          tags: ['peak-end'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-l08-q5',
          type: 'scenario',
          story: t('Proses checkout di toko online Nadia sebenarnya lancar, namun saat transaksi selesai pengguna hanya disuguhi teks dingin "OK_200_DONE" di halaman putih kosong, dan bila kartu gagal keluar "FATAL ERR #99".'),
          prompt: t('Hukum UX mana yang paling dirugikan oleh penutup seperti ini?'),
          difficulty: 2,
          choices: [
            { id: 'pe', label: t('Peak-End Rule — momen akhir dan momen kritis error justru meninggalkan kesan buruk') },
            {
              id: 'ser',
              label: t('Serial Position pada urutan menu atas'),
              explainWrong: t('Kasus ini terjadi di akhir transaksi dan penanganan pesan error.'),
            },
            {
              id: 'fit',
              label: t("Fitts's Law pada tombol jempol"),
              explainWrong: t('Tombol tidak dibahas dalam skenario ini, melainkan pesan penutup dan error.'),
            },
          ],
          answer: 'pe',
          explainCorrect: t('Benar! Memoles halaman konfirmasi akhir dan pesan error yang sopan sangat meningkatkan kesan keseluruhan.'),
          tags: ['peak-end', 'ux'],
        }),
      ),
      qStep({
        id: 'a07-l08-q6',
        type: 'fill',
        prompt: t('Lengkapi pasangan konsep berikut:'),
        difficulty: 2,
        template: 'Pengguna cenderung lebih bersemangat saat melihat penanda "Langkah 3 dari 4" berkat ___ Effect.',
        bank: ['Goal-Gradient', 'Serial', 'Viewport'],
        answer: ['Goal-Gradient'],
        explainCorrect: t('Tepat! Semakin dekat dengan garis akhir, semakin kuat dorongan pengguna menyelesaikannya.'),
        tags: ['peak-end', 'ux'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-l08-r1',
        prompt: t('Dua momen yang paling menentukan ingatan pengguna atas keseluruhan pengalaman memakai aplikasi menurut Peak-End Rule adalah…'),
        choices: [
          { id: 'pe', label: t('Momen paling berkesan (puncak) dan momen terakhir') },
          { id: 'mid', label: t('Rata-rata detik demi detik di bagian tengah saja'), explainWrong: t('Manusia tidak menilai pengalaman secara rata-rata matematis, melainkan dari puncak dan akhirnya.') },
        ],
        answer: 'pe',
        explainCorrect: t('Peak dan End adalah dua titik terpenting yang membentuk kesan akhir.'),
        tags: ['peak-end'],
      }),
      makeTf({
        id: 'a07-l08-r2',
        prompt: t('Zeigarnik Effect menjelaskan mengapa checklist onboarding atau progres 75% mendorong pengguna kembali menyelesaikan tugas yang belum tuntas.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('Tugas yang terbuka dan belum selesai terus menempel di benak hingga tuntas.'),
        tags: ['peak-end'],
      }),
    ],
    recap: t('Poles momen puncak dan akhir (Peak-End), dorong penyelesaian lewat progres bertahap (Zeigarnik), dan padukan visual indah dengan uji kelayakan.'),
  }),

  makeLesson({
    id: 'a07-sq1',
    worldId: 'a07',
    title: 'Hukum sistem: Tesler, Pareto, Postel, Parkinson',
    modes: ['pro'],
    isSideQuest: true,
    objective: t('Aku bisa menerapkan empat hukum perancangan sistem: Tesler, Pareto, Postel, dan Parkinson.'),
    estMinutes: 5,
    introducesTerms: [],
    usesTerms: ['ux', 'ui', 'fitts-law'],
    steps: [
      storyStep('a07/mobil-matik-kasir.svg', [
        rText('Pada mobil matik, perpindahan gigi tetap ada—bedanya dikerjakan mesin bukan pengemudi! Sementara kasir yang baik menerima pecahan uang apa saja, tetapi selalu memberi kembalian dengan rapi.'),
      ]),
      conceptStep({
        title: t("Tesler's Law & Pareto Principle"),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'tesler-dan-pareto' },
        alt: t('Sistem mengisi otomatis kota dari kode pos (Tesler) dan fokus ke 20% fitur utama (Pareto).'),
        body: [
          rBold("Tesler's Law"),
          rText(' (kekekalan kerumitan): kerumitan tak bisa hilang, hanya bisa dipindahkan ke sistem (misal isi kota otomatis dari kode pos). '),
          rBold('Pareto (80/20)'),
          rText(': 80% pemakaian berasal dari 20% fitur inti—jadikan fitur itu paling mudah dijangkau!'),
        ],
      }),
      conceptStep({
        title: t("Postel's Law (Prinsip Kelonggaran)"),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'postel-law-input' },
        alt: t('Nomor HP dengan atau tanpa spasi dan tanda hubung semuanya diterima lalu dirapikan sistem.'),
        code: {
          lang: 'text',
          code: '08123456789  |  +62 812-3456-789  |  0812 3456 789  → Semua diterima ✓',
        },
        body: [
          rBold("Postel's Law"),
          rText(': longgarlah dalam menerima masukan pengguna, telitilah dalam memberi keluaran. Terima nomor HP dengan spasi atau tanda hubung, lalu normalkan sendiri di sistem.'),
        ],
      }),
      conceptStep({
        title: t("Parkinson's Law"),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'parkinson-law-kecepatan' },
        alt: t('Mempersingkat alur lewat isi otomatis dan tombol Beli Lagi.'),
        body: [
          rBold("Parkinson's Law"),
          rText(': pekerjaan cenderung mengembang memenuhi waktu yang tersedia. Persingkat waktu pengguna dengan isi otomatis alamat, tombol "Beli Lagi", dan checkout sekali ketuk.'),
        ],
      }),
      limitStep({
        analogy: t('Mobil matik dan kasir toko untuk Tesler & Postel'),
        same: [
          t('Sistem menanggung beban teknis dan menerima variasi wajar dari pengguna.'),
        ],
        different: [
          t('Longgar dalam Postel’s Law bukan berarti menerima data berbahaya atau invalid begitu saja—masukan tetap dibersihkan, divalidasi, dan disimpan dalam format rapi yang ketat!'),
        ],
      }),
      simStep(
        'hick-menu',
        t('Amati bagaimana menonjolkan 20% fitur paling sering dipakai membuat layar tetap ringan dan cepat diputuskan.'),
      ),
      qStep({
        id: 'a07-sq1-q1',
        type: 'match',
        prompt: t('Pasangkan keempat hukum sistem UX dengan contoh implementasinya:'),
        difficulty: 2,
        left: [
          { id: 't', label: t("Tesler's Law") },
          { id: 'pa', label: t('Pareto Principle (80/20)') },
          { id: 'po', label: t("Postel's Law") },
          { id: 'pk', label: t("Parkinson's Law") },
        ],
        right: [
          { id: 'rt', label: t('Mendeteksi jenis kartu bank otomatis dari 4 digit awal nomor') },
          { id: 'rpa', label: t('Menaruh 3 fitur paling sering dipakai di baris teratas') },
          { id: 'rpo', label: t('Menerima nomor HP dengan spasi/+62/- lalu merapikannya di sistem') },
          { id: 'rpk', label: t('Menyediakan tombol "Beli Lagi" agar checkout selesai dalam detik') },
        ],
        answer: { t: 'rt', pa: 'rpa', po: 'rpo', pk: 'rpk' },
        explainCorrect: t('Hebat! Keempat prinsip ini membuat sistem terasa cerdas dan hemat tenaga pengguna.'),
        tags: ['ux'],
      }),
      qStep(
        makeMcq({
          id: 'a07-sq1-q2',
          type: 'analogy',
          prompt: t('Mobil matik yang mengambil alih tugas mengoper gigi dari tangan pengemudi menggambarkan…'),
          choices: [
            { id: 'tes', label: t("Tesler's Law — memindahkan kerumitan dari pengguna ke sistem") },
            {
              id: 'par',
              label: t('Pareto Principle — membuang 80% roda mobil'),
              explainWrong: t('Semua gigi tetap ada, hanya diproses mesin.'),
            },
            {
              id: 'pos',
              label: t("Postel's Law — menerima bensin atau air apa saja"),
              explainWrong: t('Mobil matik adalah contoh kekekalan kerumitan pada Tesler’s Law.'),
            },
          ],
          answer: 'tes',
          explainCorrect: t('Benar! Kerumitan tidak musnah, tetapi lebih baik ditanggung kode sistem daripada membebani pengguna.'),
          tags: ['ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-sq1-q3',
          type: 'limit',
          analogy: t("Kasir toko untuk Postel's Law"),
          prompt: t("Kesalahan apa yang harus dihindari saat menerapkan Postel's Law pada kolom input formulir?"),
          difficulty: 2,
          choices: [
            { id: 'val', label: t('Membiarkan teks acak berbahaya atau format rusak masuk tanpa dibersihkan dan divalidasi') },
            {
              id: 'space',
              label: t('Mengizinkan pengguna mengetik tanda strip atau spasi pada nomor telepon'),
              explainWrong: t('Mengizinkan spasi dan tanda hubung lalu menghapusnya di sistem justru contoh Postel yang baik.'),
            },
            {
              id: 'trim',
              label: t('Menghapus spasi berlebih di awal/akhir ketikan pengguna secara otomatis'),
              explainWrong: t('Trimming spasi sangat membantu mencegah error tak perlu.'),
            },
          ],
          answer: 'val',
          explainCorrect: t('Tepat! Longgar dalam variasi format yang wajar, tetap ketat memvalidasi keamanan dan kerapian output.'),
          tags: ['ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-sq1-q4',
          type: 'scenario',
          story: t('Aplikasi catatan belanja Pak Udin punya 25 fitur di layar utama, padahal data menunjukkan 80% pemakai hanya membuka "Buat Catatan" dan "Centang Selesai".'),
          prompt: t('Tindakan paling tepat berdasarkan Pareto Principle (80/20) adalah…'),
          difficulty: 2,
          choices: [
            { id: 'focus', label: t('Posisikan "Buat Catatan" dan "Centang Selesai" paling menonjol & mulus, rapikan fitur jarang ke menu sekunder') },
            {
              id: 'equal',
              label: t('Beri ukuran tombol yang sama besar untuk ke-25 fitur di layar awal'),
              explainWrong: t('Itu menyamakan fitur langka dengan fitur inti dan melanggar prinsip Pareto.'),
            },
            {
              id: 'ban',
              label: t('Wajibkan setiap pengguna memakai seluruh 25 fitur sebelum boleh mencatat'),
              explainWrong: t('Memaksa pengguna menambah friction berat.'),
            },
          ],
          answer: 'focus',
          explainCorrect: t('Benar! Mengoptimalkan 20% fitur inti memberi dampak terbesar bagi mayoritas pengguna.'),
          tags: ['ux'],
        }),
      ),
      qStep({
        id: 'a07-sq1-q5',
        type: 'fill',
        prompt: t('Lengkapi prinsip Jon Postel:'),
        difficulty: 2,
        template: '___ dalam menerima masukan, telitilah dalam memberi keluaran.',
        bank: ['Longgarlah', 'Kaku', 'Tolaklah'],
        answer: ['Longgarlah'],
        explainCorrect: t('Tepat! Jangan menghukum pengguna hanya karena mengetik spasi atau format kecil berbeda yang bisa dirapikan sistem.'),
        tags: ['ux'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-sq1-r1',
        prompt: t('Mengisi nama kota dan kecamatan secara otomatis begitu pengguna mengetik kode pos adalah penerapan…'),
        choices: [
          { id: 'tes', label: t("Tesler's Law") },
          { id: 'par', label: t('Pareto Principle'), explainWrong: t('Pareto berfokus pada 20% fitur yang menghasilkan 80% pemakaian.') },
        ],
        answer: 'tes',
        explainCorrect: t('Sistem menanggung kerumitan pencarian kota agar pengguna tak perlu mengetik manual.'),
        tags: ['ux'],
      }),
      makeTf({
        id: 'a07-sq1-r2',
        prompt: t("Pareto Principle menyarankan kita menemukan 20% fitur terpenting yang paling sering dipakai pengguna lalu menjadikannya paling mulus."),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('80% kebutuhan pengguna biasanya bertumpu pada 20% fitur utama.'),
        tags: ['ux'],
      }),
    ],
    recap: t('Pindahkan kerumitan ke sistem (Tesler), prioritaskan 20% fitur inti (Pareto), longgar menerima format (Postel), dan persingkat alur (Parkinson).'),
  }),

  makeLesson({
    id: 'a07-sq2',
    worldId: 'a07',
    title: '10 Heuristik Nielsen & Bedah Aplikasi Ini',
    modes: ['pro'],
    isSideQuest: true,
    external: true,
    externalLinks: [
      { label: 'Panduan Aksesibilitas & UX web.dev', url: 'https://web.dev/explore/accessible' },
      { label: 'Referensi Belajar Web MDN', url: 'https://developer.mozilla.org/en-US/docs/Learn' },
    ],
    objective: t('Aku bisa memeriksa kualitas antarmuka sebuah aplikasi memakai daftar periksa 10 Heuristik Nielsen.'),
    estMinutes: 6,
    introducesTerms: [],
    usesTerms: ['ux', 'ui', 'usability-testing', 'hick-law', 'fitts-law'],
    steps: [
      storyStep('a07/inspektur-galeri.svg', [
        rText('Sebelum pameran galeri dibuka untuk umum, inspektur selalu berkeliling membawa papan daftar periksa 10 poin agar tak ada pintu darurat terkunci atau papan petunjuk yang membingungkan.'),
      ]),
      conceptStep({
        title: t('Heuristik 1–4: Jelas, Akrab, Kendali, Konsisten'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'heuristik-nielsen-1-4' },
        alt: t('Empat heuristik pertama: status sistem terlihat, bahasa dunia nyata, tombol batal, dan konsistensi.'),
        body: [
          rText('1) '),
          rBold('Status terlihat'),
          rText(' (loading, tersimpan). 2) '),
          rBold('Bahasa dunia nyata'),
          rText(' ("Keranjang", bukan "Array item"). 3) '),
          rBold('Kendali & kebebasan'),
          rText(' (ada Batal/Urungkan). 4) '),
          rBold('Konsistensi'),
          rText(' pola antarhalaman.'),
        ],
      }),
      conceptStep({
        title: t('Heuristik 5–7: Cegah Error, Kenali, Efisien'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'heuristik-nielsen-5-7' },
        alt: t('Konfirmasi hapus, pilihan terlihat tanpa menghafal, dan jalan pintas bagi pengguna mahir.'),
        body: [
          rText('5) '),
          rBold('Cegah kesalahan'),
          rText(' (konfirmasi hapus, matikan tanggal lampau). 6) '),
          rBold('Mengenali, bukan mengingat'),
          rText(' (tampilkan opsi). 7) '),
          rBold('Fleksibel & efisien'),
          rText(' (jalan pintas tanpa menyulitkan pemula).'),
        ],
      }),
      conceptStep({
        title: t('Heuristik 8–10: Minimalis, Pulih Error, Bantuan'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a07', topic: 'heuristik-nielsen-8-10' },
        alt: t('Desain minimalis, pesan error spesifik cara perbaikan, dan menu bantuan mudah dicari.'),
        code: {
          lang: 'text',
          code: '✗ "Error 422: Invalid input."\n✓ "Kata sandi minimal 8 karakter. Tambahkan 3 karakter lagi."',
        },
        body: [
          rText('8) '),
          rBold('Estetis & minimalis'),
          rText(' (tampilkan yang perlu saja). 9) '),
          rBold('Bantu pulih dari error'),
          rText(' dengan pesan sopan & solusi. 10) '),
          rBold('Bantuan & dokumentasi'),
          rText(' mudah dicari.'),
        ],
      }),
      limitStep({
        analogy: t('Daftar periksa inspektur keselamatan untuk 10 Heuristik Nielsen'),
        same: [
          t('Pedoman praktis untuk menemukan cacat kemudahan pakai secara cepat dan terstruktur.'),
        ],
        different: [
          t('Heuristik adalah pedoman inspeksi ahli, bukan pengganti pengujian pengguna sungguhan—sesudah memeriksa 10 poin, tetap lakukan usability testing!'),
        ],
      }),
      simStep(
        'fitts-target',
        t('Bedah tombol dan alur aplikasi ini sendiri: apakah status klik, ukuran target, dan jalan keluarnya sudah memenuhi 10 heuristik?'),
      ),
      qStep({
        id: 'a07-sq2-q1',
        type: 'match',
        prompt: t('Pasangkan contoh tampilan aplikasi dengan Heuristik Nielsen yang dipatuhinya:'),
        difficulty: 2,
        left: [
          { id: 'h2', label: t('Memakai kata "Keranjang" alih-alih "Array item"') },
          { id: 'h3', label: t('Menyediakan tombol "Batal" dan "Urungkan" setelah hapus') },
          { id: 'h5', label: t('Menonaktifkan tanggal kemarin pada pemesanan tiket baru') },
          { id: 'h9', label: t('Menulis "Tambahkan 3 huruf lagi" bukan "Error 422"') },
        ],
        right: [
          { id: 'rh2', label: t('Sesuai dunia nyata (#2)') },
          { id: 'rh3', label: t('Kendali dan kebebasan (#3)') },
          { id: 'rh5', label: t('Pencegahan kesalahan (#5)') },
          { id: 'rh9', label: t('Bantu pulih dari kesalahan (#9)') },
        ],
        answer: { h2: 'rh2', h3: 'rh3', h5: 'rh5', h9: 'rh9' },
        explainCorrect: t('Hebat! Kamu sudah bisa membaca perilaku antarmuka memakai kacamata 10 heuristik Nielsen.'),
        tags: ['ux', 'ui'],
      }),
      qStep(
        makeMcq({
          id: 'a07-sq2-q2',
          prompt: t('Di antara dua pesan error berikut, manakah yang memenuhi Heuristik #9 (Bantu pulih dari kesalahan)?'),
          choices: [
            { id: 'good', label: t('"Kata sandi minimal 8 karakter. Tambahkan 3 karakter lagi."') },
            {
              id: 'bad1',
              label: t('"Error 422: Invalid input."'),
              explainWrong: t('Kode teknis tidak menjelaskan letak salah maupun cara memperbaikinya.'),
            },
            {
              id: 'bad2',
              label: t('"Anda salah mengetik, coba tebak sendiri."'),
              explainWrong: t('Nada menyalahkan tanpa solusi melanggar heuristik #9.'),
            },
          ],
          answer: 'good',
          explainCorrect: t('Benar! Pesan error yang baik menjelaskan masalah dengan bahasa manusia dan memberi tahu cara memperbaikinya.'),
          tags: ['ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-sq2-q3',
          type: 'limit',
          analogy: t('Daftar periksa inspektur untuk 10 Heuristik Nielsen'),
          prompt: t('Mengapa lulus 10 Heuristik Nielsen oleh tim desainer belum menjamin 100% bebas masalah bagi pengguna baru?'),
          difficulty: 2,
          choices: [
            { id: 'ut', label: t('Karena pemeriksaan heuristik tidak menggantikan pengamatan langsung lewat usability testing ke pengguna asli') },
            {
              id: 'num',
              label: t('Karena daftar periksa heuristik hanya berlaku untuk warna biru'),
              explainWrong: t('Heuristik berlaku lintas komponen dan warna apa pun.'),
            },
            {
              id: 'html',
              label: t('Karena browser tidak menjalankan kode yang lolos heuristik'),
              explainWrong: t('Browser mengeksekusi HTML/CSS/JS tanpa tahu hasil inspeksi heuristik.'),
            },
          ],
          answer: 'ut',
          explainCorrect: t('Tepat! Heuristik menangkap cacat jelas lebih cepat, lalu usability testing memvalidasi pengalaman pemakai nyata.'),
          tags: ['ux', 'usability-testing'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a07-sq2-q4',
          type: 'scenario',
          story: t('Saat membedah sebuah aplikasi kuis belajar, kamu melihat: (a) ada indikator langkah "3/8", (b) ada tombol "Keluar" jelas di pojok atas, dan (c) setiap istilah sulit bisa diketuk untuk melihat arti ringkasnya.'),
          prompt: t('Heuristik apa saja yang terpenuhi oleh ketiga fitur tersebut secara berurutan?'),
          difficulty: 3,
          choices: [
            { id: 'all', label: t('Status sistem terlihat (#1), Kendali & kebebasan (#3), dan Mengenali/Bantuan (#6 & #10)') },
            {
              id: 'none',
              label: t('Semuanya melanggar heuristik estetis dan minimalis (#8)'),
              explainWrong: t('Penunjuk progres, jalan keluar, dan bantuan istilah justru sangat membantu tanpa membanjiri layar.'),
            },
            {
              id: 'tech',
              label: t('Hanya memenuhi kode bahasa mesin tanpa kaitan UX'),
              explainWrong: t('Ketiga fitur tersebut adalah penerapan langsung prinsip heuristik UX.'),
            },
          ],
          answer: 'all',
          explainCorrect: t('Tepat sekali! Aplikasi Petualang Web ini pun dirancang menerapkan heuristik-heuristik tersebut.'),
          tags: ['ux'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a07-sq2-q5',
          prompt: t('Heuristik #8 (Estetis dan minimalis) berarti setiap elemen tambahan di layar bersaing merebut perhatian pengguna dengan elemen penting.'),
          answer: true,
          explainCorrect: t('Betul! Tampilkan hanya elemen yang benar-benar mendukung tugas pengguna pada layar tersebut.'),
          explainWrong: t('Minimalis bukan berarti polos tanpa desain, melainkan bebas elemen pengganggu yang tidak relevan.'),
          tags: ['ui', 'ux'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a07-sq2-r1',
        prompt: t('Mengganti istilah tombol "Execute Array Purge" menjadi "Kosongkan Keranjang" memenuhi heuristik Nielsen nomor #2, yaitu…'),
        choices: [
          { id: 'real', label: t('Sesuai dunia nyata (bahasa akrab pengguna)') },
          { id: 'short', label: t('Fleksibel dan efisien'), explainWrong: t('Penerjemahan ke istilah sehari-hari pengguna adalah heuristik #2.') },
        ],
        answer: 'real',
        explainCorrect: t('Sistem berbicara memakai bahasa pengguna, bukan istilah internal programmer.'),
        tags: ['ux'],
      }),
      makeTf({
        id: 'a07-sq2-r2',
        prompt: t('Meminta konfirmasi sebelum aksi menghapus permanen termasuk heuristik #5: Pencegahan kesalahan.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('Mencegah kesalahan terjadi jauh lebih baik daripada meminta maaf setelah data terhapus.'),
        tags: ['ux'],
      }),
    ],
    recap: t('Gunakan 10 Heuristik Nielsen sebagai daftar periksa audit UI yang rapi, jelas, aman dari salah klik, dan ramah memulihkan error.'),
  }),
];
