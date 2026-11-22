import {
  conceptStep,
  limitStep,
  makeAnchorMcq,
  makeLesson,
  makeMcq,
  makeTf,
  qStep,
  rTerm,
  rText,
  simStep,
  storyStep,
  t,
} from '@/content/lessonHelpers';
import type { Lesson, World } from '@/content/schema';

export const world: World = {
  id: 'a01',
  track: 'A',
  order: 1,
  title: 'Kota Web',
  tagline: t(
    'Kenalan dengan restoran web, kurir internet, dan alamat URL.',
    'Memahami arsitektur frontend–backend, UI vs UX, perjalanan request–response, dan anatomi URL.',
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
      'Halo! Tunjukkan apakah kamu sudah paham isi restoran web!',
      'Tunjukkan penguasaanmu tentang cara kerja web, UI/UX, dan peran HTML–CSS–JS.',
    ),
    guardianName: 'Penjaga Kota Web',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'a01-anc-j1',
        prompt: t('Saat membuka toko online, bagian mana yang dilihat mata pengunjung?'),
        choices: [
          { id: 'fe', label: t('Frontend (ruang makan)'), explainWrong: t('Benar, frontend adalah bagian yang tampil.') },
          { id: 'be', label: t('Backend (dapur tertutup)'), explainWrong: t('Backend bekerja tersembunyi di belakang.') },
          { id: 'dns', label: t('Gudang kabel internet'), explainWrong: t('Kabel hanya mengantar data.') },
        ],
        answer: 'fe',
        explainCorrect: t('Frontend adalah seluruh tampilan di layar pengunjung.'),
        tags: ['frontend'],
      }),
      makeAnchorMcq({
        id: 'a01-anc-j2',
        prompt: t('Tombol cantik tapi susah diklik. Bagian mana yang bermasalah?'),
        choices: [
          { id: 'ux', label: t('UX (pengalaman pakainya)'), explainWrong: t('Tepat.') },
          { id: 'ui', label: t('Warna catnya'), explainWrong: t('Tampilannya sudah cantik, berarti UI baik.') },
          { id: 'db', label: t('Dapur server'), explainWrong: t('Ini soal kenyamanan di layar.') },
        ],
        answer: 'ux',
        explainCorrect: t('UX menilai mudah atau tidaknya tombol dipakai.'),
        tags: ['ux'],
      }),
      makeAnchorMcq({
        id: 'a01-anc-j3',
        prompt: t('Apa tugas DNS ketika kita mengetik alamat situs?'),
        choices: [
          { id: 'dns', label: t('Mencari nomor alamat komputer server'), explainWrong: t('Benar.') },
          { id: 'css', label: t('Mengganti warna huruf'), explainWrong: t('Itu tugas CSS.') },
          { id: 'js', label: t('Memutar video'), explainWrong: t('DNS hanya buku kontak alamat.') },
        ],
        answer: 'dns',
        explainCorrect: t('DNS seperti buku kontak yang mencocokkan nama situs dengan nomor alamat server.'),
        tags: ['dns'],
      }),
      makeAnchorMcq({
        id: 'a01-anc-j4',
        prompt: t('Tanda gembok pada alamat https:// artinya…'),
        choices: [
          { id: 'safe', label: t('Pesan dikirim dalam amplop terkunci aman'), explainWrong: t('Benar.') },
          { id: 'closed', label: t('Website sedang tutup'), explainWrong: t('Situs justru aman diakses.') },
          { id: 'free', label: t('Gratis tanpa kuota'), explainWrong: t('Gembok bukan soal kuota.') },
        ],
        answer: 'safe',
        explainCorrect: t('HTTPS mengenkripsi pesan antara browser dan server.'),
        tags: ['https'],
      }),
      makeAnchorMcq({
        id: 'a01-anc-j5',
        prompt: t('Dari tiga bahan web, mana yang menjadi kerangka halaman?'),
        choices: [
          { id: 'html', label: t('HTML'), explainWrong: t('Benar.') },
          { id: 'css', label: t('CSS'), explainWrong: t('CSS bertugas mendandani warna dan jarak.') },
          { id: 'js', label: t('JavaScript'), explainWrong: t('JavaScript membuat halaman bergerak.') },
        ],
        answer: 'html',
        explainCorrect: t('HTML menyusun kerangka seperti tembok dan pintu rumah.'),
        tags: ['html'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a01-anc-p1',
        prompt: t('Mengapa pengunjung browser tidak boleh langsung melihat isi database di backend?'),
        choices: [
          { id: 'sec', label: t('Demi keamanan data dan pemisahan tugas ruang makan–dapur') },
          { id: 'col', label: t('Karena database tidak punya warna CSS') },
          { id: 'html', label: t('Karena browser hanya membaca file PDF') },
        ],
        answer: 'sec',
        explainCorrect: t('Backend memproses aturan bisnis dan menjaga data sensitif tetap aman di server.'),
        tags: ['backend'],
      }),
      makeAnchorMcq({
        id: 'a01-anc-p2',
        prompt: t('Sebuah situs memiliki warna harmonis, namun pengguna selalu tersesat mencari menu bayar. Ini masalah…'),
        choices: [
          { id: 'ux', label: t('UX (User Experience)') },
          { id: 'ui', label: t('UI saja tanpa UX') },
          { id: 'dns', label: t('DNS') },
        ],
        answer: 'ux',
        explainCorrect: t('Kebingungan alur dan rasa frustrasi pengguna termasuk masalah UX.'),
        tags: ['ux'],
      }),
      makeAnchorMcq({
        id: 'a01-anc-p3',
        prompt: t('Peran mana yang merancang user flow dan wireframe sebelum tampilan diwarnai?'),
        choices: [
          { id: 'uxd', label: t('UX Designer') },
          { id: 'be', label: t('Backend Developer') },
          { id: 'dns', label: t('Administrator DNS') },
        ],
        answer: 'uxd',
        explainCorrect: t('UX Designer merancang alur pengguna dan struktur dasar halaman lewat wireframe.'),
        tags: ['wireframe'],
      }),
      makeAnchorMcq({
        id: 'a01-anc-p4',
        prompt: t('Urutan tepat saat pengguna mengetik URL sampai halaman tampil adalah…'),
        choices: [
          { id: 'seq', label: t('Cari alamat via DNS → kirim request → terima response → browser render') },
          { id: 'rev', label: t('Browser render → kirim response → hapus DNS') },
          { id: 'css', label: t('Server membaca CSS pengguna → ubah DNS') },
        ],
        answer: 'seq',
        explainCorrect: t('Browser menerjemahkan domain via DNS, meminta file ke server, lalu me-render responsenya.'),
        tags: ['request', 'response'],
      }),
      makeAnchorMcq({
        id: 'a01-anc-p5',
        prompt: t('Pada URL https://toko-rani.example/produk?kategori=tas, bagian ?kategori=tas adalah…'),
        choices: [
          { id: 'q', label: t('Query parameter (catatan filter tambahan)') },
          { id: 'd', label: t('Domain utama') },
          { id: 'p', label: t('Protokol enkripsi') },
        ],
        answer: 'q',
        explainCorrect: t('Teks setelah tanda tanya (?) adalah query parameter untuk menyaring atau mengurutkan isi.'),
        tags: ['url'],
      }),
      makeAnchorMcq({
        id: 'a01-anc-p6',
        prompt: t('Pada analogi restoran, apa batas yang TIDAK berlaku pada server backend?'),
        type: 'limit',
        analogy: t('Website seperti restoran'),
        choices: [
          { id: 'one', label: t('Satu server bisa melayani ribuan pengunjung bersamaan, bukan hanya satu meja') },
          { id: 'hidden', label: t('Pengunjung tidak melihat langsung bagian dalam dapur/server') },
          { id: 'req', label: t('Pesanan disampaikan lewat perantara') },
        ],
        answer: 'one',
        explainCorrect: t('Server digital memproses ribuan request secara paralel dan mengolah data, bukan memasak fisik.'),
        tags: ['frontend', 'backend'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'a01-l01',
    worldId: 'a01',
    title: 'Website itu seperti restoran',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan mana bagian ruang makan (frontend) dan dapur (backend).',
      'Aku bisa menjelaskan perbedaan frontend dan backend beserta alat utamanya.',
    ),
    estMinutes: 5,
    introducesTerms: ['frontend', 'backend'],
    usesTerms: [],
    stickerId: 'restoran',
    steps: [
      storyStep('a01/restoran.svg', [
        rText(
          'Saat makan di restoran Pak Udin, kamu duduk nyaman di ruang makan. Kamu tidak pernah masuk ke dapur.',
          'Saat berkunjung ke restoran Pak Udin, kamu hanya melihat ruang makan dan buku menu, sementara semua masakan diolah tersembunyi di dapur.',
        ),
      ]),
      conceptStep({
        title: t('Ruang makan itu Frontend', 'Frontend = Ruang Makan'),
        visualName: 'RestoranDiagram',
        visualProps: { worldId: 'a01', topic: 'restoran-frontend' },
        alt: t('Diagram ruang makan frontend berisi menu, meja, dan pelayan.'),
        body: [
          rTerm('frontend', 'Frontend', 'Frontend'),
          rText(
            ' adalah semua yang terlihat dan disentuh di layar.',
            ' mencakup semua elemen visual dan interaksi yang dijalankan browser menggunakan HTML, CSS, dan JavaScript.',
          ),
        ],
      }),
      conceptStep({
        title: t('Dapur itu Backend', 'Backend = Dapur & Gudang'),
        visualName: 'RestoranDiagram',
        visualProps: { worldId: 'a01', topic: 'restoran-backend' },
        alt: t('Diagram dapur backend yang menyimpan dan mengolah data.'),
        body: [
          rTerm('backend', 'Backend', 'Backend'),
          rText(
            ' bekerja di balik layar untuk mengolah dan menyimpan data.',
            ' bertugas menjalankan aturan bisnis di server dan menyimpan data ke database, tersembunyi dari pengunjung.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Website itu seperti restoran'),
        same: [
          t('Tamu tidak boleh masuk dapur; browser tidak langsung melihat isi server.'),
          t('Tamu melihat menu rapi sebelum memesan makanan.'),
        ],
        different: [
          t('Server tidak memasak; server mengolah dan mengirim data digital.'),
          t('Satu server bisa melayani ribuan tamu sekaligus dalam satu detik.'),
        ],
      }),
      simStep(
        'restoran-web',
        t(
          'Ketuk tombol pesanan di bawah atau Lihat Contoh untuk melihat pelayan mengantar request ke dapur!',
          'Jalankan simulasi alur pesanan dari ruang makan frontend menuju dapur backend.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a01-l01-q1',
          type: 'analogy',
          prompt: t('Di restoran, ruang makan yang penuh menu dan meja itu ibarat…'),
          choices: [
            { id: 'fe', label: t('Frontend') },
            { id: 'be', label: t('Backend'), explainWrong: t('Dapur dan gudang yang tersembunyi itulah backend.') },
            { id: 'db', label: t('Database saja'), explainWrong: t('Database seperti gudang bahan di belakang dapur.') },
          ],
          answer: 'fe',
          explainCorrect: t('Tepat! Frontend adalah bagian yang tampil dan disentuh pengguna.'),
          hints: [t('Ingat mana yang bisa kamu lihat langsung.'), t('Tamu duduk di ruang makan.')],
          tags: ['frontend'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a01-l01-q2',
          prompt: t('Pengunjung website bebas melihat isi gudang database di backend secara langsung.'),
          answer: false,
          explainCorrect: t('Benar, pernyataan itu salah! Backend tetap tersembunyi demi keamanan data.'),
          explainWrong: t('Hampir! Pengunjung tidak masuk ke dapur backend, hanya menerima hasilnya.'),
          tags: ['backend'],
        }),
      ),
      qStep({
        id: 'a01-l01-q3',
        type: 'sort',
        prompt: t('Kelompokkan hal berikut ke Frontend atau Backend:'),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('Warna tombol Beli') },
          { id: 'i2', label: t('Menyimpan data akun ke gudang database') },
          { id: 'i3', label: t('Ukuran huruf judul halaman') },
          { id: 'i4', label: t('Memeriksa kata sandi di server') },
        ],
        bins: [
          { id: 'fe', label: t('Frontend (Layar)') },
          { id: 'be', label: t('Backend (Dapur)') },
        ],
        answer: { i1: 'fe', i2: 'be', i3: 'fe', i4: 'be' },
        explainCorrect: t('Hebat! Tampilan layar milik frontend, olah dan simpan data milik backend.'),
        tags: ['frontend', 'backend'],
      }),
      qStep(
        makeMcq({
          id: 'a01-l01-q4',
          type: 'limit',
          analogy: t('Website seperti restoran'),
          prompt: t('Manakah hal yang TIDAK sama persis antara restoran asli dan website?'),
          difficulty: 2,
          choices: [
            {
              id: 'diff',
              label: t('Server digital bisa melayani ribuan tamu sekaligus, tidak memasak fisik'),
            },
            {
              id: 'hide',
              label: t('Bagian belakang tidak terlihat langsung oleh pengunjung'),
              explainWrong: t('Itu memang bagian yang mirip!'),
            },
            {
              id: 'menu',
              label: t('Pengunjung memilih dari tampilan yang disediakan'),
              explainWrong: t('Ini juga persamaan antara menu restoran dan UI.'),
            },
          ],
          answer: 'diff',
          explainCorrect: t('Tepat! Server mengolah data digital untuk ribuan pengguna sekaligus, bukan memasak.'),
          tags: ['frontend', 'backend'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l01-q5',
          type: 'scenario',
          story: t('Rani membuka toko kue online. Saat tombol Pesan ditekan, stok kue di gudang berkurang dan tersimpan.'),
          prompt: t('Siapakah yang bertugas mengurangi dan menyimpan angka stok di gudang data?'),
          difficulty: 3,
          choices: [
            { id: 'be', label: t('Backend') },
            { id: 'fe', label: t('Warna tombol di layar'), explainWrong: t('Warna tombol hanya tampilan frontend.') },
            { id: 'meja', label: t('Ukuran huruf menu'), explainWrong: t('Huruf menu hanya bagian tampilan.') },
          ],
          answer: 'be',
          explainCorrect: t('Benar! Pengolahan data stok dan penyimpanan ke database dilakukan di backend.'),
          tags: ['backend'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l01-q6',
          prompt: t('Bahasa utama yang berjalan di browser untuk membangun sisi frontend adalah…'),
          modes: ['pro'],
          difficulty: 2,
          choices: [
            { id: 'web', label: t('HTML, CSS, dan JavaScript') },
            { id: 'sql', label: t('SQL saja'), explainWrong: t('SQL dipakai untuk database di backend.') },
            { id: 'php', label: t('PHP dan Python saja'), explainWrong: t('PHP dan Python berjalan di server backend.') },
          ],
          answer: 'web',
          explainCorrect: t('Tepat. Browser memahami HTML untuk struktur, CSS untuk tampilan, dan JS untuk interaksi.'),
          tags: ['frontend'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a01-l01-r1',
        prompt: t('Bagian website yang terlihat dan diklik langsung oleh pengguna adalah…'),
        choices: [
          { id: 'fe', label: t('Frontend') },
          { id: 'be', label: t('Backend'), explainWrong: t('Backend bekerja di dapur server.') },
        ],
        answer: 'fe',
        explainCorrect: t('Frontend ibarat ruang makan yang dilihat pengunjung.'),
        tags: ['frontend'],
      }),
      makeTf({
        id: 'a01-l01-r2',
        prompt: t('Database tempat menyimpan seluruh data pesanan berada di sisi backend.'),
        answer: true,
        explainCorrect: t('Betul! Gudang database berada di balik layar pada sisi backend.'),
        explainWrong: t('Hampir! Gudang data tidak ditaruh di browser pengunjung, melainkan di backend.'),
        tags: ['backend'],
      }),
    ],
    recap: t(
      'Frontend adalah ruang makan yang dilihat tamu; backend adalah dapur pengolah data.',
      'Frontend membangun antarmuka di browser, sedangkan backend mengolah logika dan database di server.',
    ),
    companion: {
      talkPrompts: [
        'Kalau aplikasi favorit kita itu restoran, apa saja yang ada di ruang makannya?',
        'Kenapa tamu restoran tidak boleh masuk langsung ke dapur atau lemari es?',
      ],
      offlineActivity:
        'Main restoran-restoranan 5 menit: satu orang jadi tamu (frontend) yang membaca menu, satu jadi dapur (backend) yang menyiapkan catatan.',
    },
  }),

  makeLesson({
    id: 'a01-l02',
    worldId: 'a01',
    title: 'UI dan UX itu beda',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan mana tampilan (UI) dan mana rasa nyaman memakainya (UX).',
      'Aku bisa membedakan UI dan UX serta memberi contoh nyata keduanya.',
    ),
    estMinutes: 5,
    introducesTerms: ['ui', 'ux'],
    usesTerms: ['frontend'],
    stickerId: 'botol-saus',
    warmupFrom: 'a01-l01',
    steps: [
      storyStep('a01/botol-saus.svg', [
        rText(
          'Lihat dua botol saus di meja makan. Keduanya rapi, tetapi botol kaca kaku membuat saus susah keluar.',
          'Dua botol saus memiliki isi yang sama dan kemasan rapi, namun botol terbalik jauh lebih nyaman dipakai daripada botol kaca kaku.',
        ),
      ]),
      conceptStep({
        title: t('UI: Apa yang terlihat mata', 'UI (User Interface)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a01', topic: 'ui-tampilan' },
        alt: t('Contoh elemen UI seperti warna tombol, ikon, dan ukuran huruf.'),
        body: [
          rTerm('ui', 'UI', 'UI'),
          rText(
            ' adalah wujud tampilan: warna, huruf, tombol, dan gambar.',
            ' menjawab pertanyaan "Tampilannya seperti apa?" meliputi warna, tipografi, ikon, jarak, dan komponen layar.',
          ),
        ],
      }),
      conceptStep({
        title: t('UX: Rasa saat dipakai', 'UX (User Experience)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a01', topic: 'ux-pengalaman' },
        alt: t('Alur UX yang mudah dibanding alur membingungkan.'),
        body: [
          rTerm('ux', 'UX', 'UX'),
          rText(
            ' adalah perasaanmu saat memakai aplikasi: mudah atau malah kesal.',
            ' menjawab pertanyaan "Rasanya bagaimana saat dipakai?" mencakup kemudahan alur, kecepatan, dan kejelasan.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Botol saus untuk UI dan UX'),
        same: [
          t('Bentuk cantik di luar itu UI; nyaman atau tidak saat dipencet itu UX.'),
        ],
        different: [
          t('Di website, UI dan UX tidak terpisah: UI adalah bagian penting dari UX.'),
        ],
      }),
      simStep(
        'restoran-web',
        t(
          'Perhatikan alur memesan makanan pada simulator: tombol jelas membuat UX nyaman!',
          'Amati bagaimana kejelasan tombol UI memengaruhi kelancaran pengalaman (UX).',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a01-l02-q1',
          prompt: t('Warna tombol kuning cerah dan gambar ikon bintang termasuk ke dalam…'),
          choices: [
            { id: 'ui', label: t('UI (tampilan)') },
            { id: 'ux', label: t('UX saja'), explainWrong: t('Warna dan ikon adalah apa yang dilihat mata (UI).') },
            { id: 'be', label: t('Backend'), explainWrong: t('Ini hal visual di layar.') },
          ],
          answer: 'ui',
          explainCorrect: t('Benar! Warna, ikon, dan huruf yang terlihat adalah UI.'),
          tags: ['ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l02-q2',
          type: 'analogy',
          prompt: t('Botol saus terbalik yang tinggal pencet langsung keluar menggambarkan…'),
          choices: [
            { id: 'ux', label: t('UX yang baik karena mudah dipakai') },
            { id: 'err', label: t('Server sedang rusak'), explainWrong: t('Saus justru lancar keluar.') },
            { id: 'be', label: t('Database yang penuh'), explainWrong: t('Botol saus menggambarkan UI dan UX.') },
          ],
          answer: 'ux',
          explainCorrect: t('Tepat! Pengguna tidak perlu bersusah payah saat memakainya.'),
          tags: ['ux'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a01-l02-q3',
          prompt: t('Kalau warnanya sudah cantik, aplikasi pasti langsung mudah dipakai.'),
          answer: false,
          explainCorrect: t('Benar, itu keliru! Tampilan cantik tetap bisa membingungkan kalau alurnya rumit.'),
          explainWrong: t('Hampir! Ingat botol saus kaca yang cantik tetapi susah dituang.'),
          tags: ['ui', 'ux'],
        }),
      ),
      qStep({
        id: 'a01-l02-q4',
        type: 'sort',
        prompt: t('Kelompokkan contoh berikut ke UI atau UX:'),
        difficulty: 2,
        items: [
          { id: 'u1', label: t('Jenis huruf yang dipakai di judul') },
          { id: 'u2', label: t('Berapa langkah klik sampai pesanan selesai') },
          { id: 'u3', label: t('Warna hijau pada tombol Bayar') },
          { id: 'u4', label: t('Perasaan bingung saat tombol Cari tersembunyi') },
        ],
        bins: [
          { id: 'ui', label: t('UI (Tampilan)') },
          { id: 'ux', label: t('UX (Pengalaman)') },
        ],
        answer: { u1: 'ui', u2: 'ux', u3: 'ui', u4: 'ux' },
        explainCorrect: t('Keren! Kamu sudah membedakan aspek visual (UI) dan pengalaman alur (UX).'),
        tags: ['ui', 'ux'],
      }),
      qStep(
        makeMcq({
          id: 'a01-l02-q5',
          type: 'limit',
          analogy: t('Botol saus'),
          prompt: t('Apa perbedaan yang perlu diingat dari analogi botol saus pada website?'),
          difficulty: 2,
          choices: [
            { id: 'mix', label: t('Di web, UI dan UX saling menyatu: UI buruk langsung merusak UX') },
            { id: 'eat', label: t('Website tidak punya tombol'), explainWrong: t('Website justru punya tombol.') },
            { id: 'glass', label: t('Layar HP terbuat dari saus'), explainWrong: t('Tentu bukan itu maksud batas analogi.') },
          ],
          answer: 'mix',
          explainCorrect: t('Benar! UI yang sulit dibaca otomatis membuat pengalaman (UX) jadi tidak nyaman.'),
          tags: ['ui', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l02-q6',
          type: 'scenario',
          story: t('Dimas memakai aplikasi belanja yang warnanya elegan, namun ia perlu 9 langkah berulang hanya untuk mengganti alamat.'),
          prompt: t('Saran perbaikan UX terbaik untuk aplikasi itu adalah…'),
          difficulty: 3,
          choices: [
            { id: 'short', label: t('Ringkas langkah ubah alamat menjadi 1–2 layar yang jelas') },
            { id: 'color', label: t('Ganti warna tombol dari biru menjadi ungu'), explainWrong: t('Ganti warna saja tidak mengurangi 9 langkah yang melelahkan.') },
            { id: 'font', label: t('Tambahkan hiasan berkedip di judul'), explainWrong: t('Hiasan justru mengganggu fokus.') },
          ],
          answer: 'short',
          explainCorrect: t('Tepat! UX diperbaiki dengan menyederhanakan alur kerja pengguna.'),
          tags: ['ux'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a01-l02-r1',
        prompt: t('Apa pertanyaan utama yang dijawab oleh UI?'),
        choices: [
          { id: 'look', label: t('Tampilannya seperti apa?') },
          { id: 'feel', label: t('Rasanya bagaimana saat dipakai?'), explainWrong: t('Itu pertanyaan untuk UX.') },
        ],
        answer: 'look',
        explainCorrect: t('UI membahas tampilan visual layar.'),
        tags: ['ui'],
      }),
      makeTf({
        id: 'a01-l02-r2',
        prompt: t('UI adalah bagian dari keseluruhan UX.'),
        answer: true,
        explainCorrect: t('Betul! Tampilan bagus dan alur mudah berjalan bersama membentuk UX yang baik.'),
        explainWrong: t('Hampir! UI yang rapi ikut membentuk pengalaman memakai yang baik.'),
        tags: ['ui', 'ux'],
      }),
    ],
    recap: t(
      'UI adalah apa yang terlihat di mata; UX adalah rasa nyaman saat memakainya.',
      'UI fokus pada elemen visual layar, sedangkan UX fokus pada kemudahan dan kenyamanan pengalaman pengguna.',
    ),
    companion: {
      talkPrompts: [
        'Coba lihat satu aplikasi di HP: mana bagian tampilannya (UI), dan mana yang bikin gampang dipakai (UX)?',
      ],
      offlineActivity:
        'Cari benda di rumah yang bentuknya bagus tapi susah dipakai (seperti tutup botol licin) dan diskusikan kenapa.',
    },
  }),

  makeLesson({
    id: 'a01-l03',
    worldId: 'a01',
    title: 'Siapa mengerjakan apa',
    modes: ['pro'],
    objective: t('Aku bisa membedakan tugas UX Researcher, UX Designer, UI Designer, Frontend, dan Backend Developer.'),
    estMinutes: 5,
    introducesTerms: ['wireframe'],
    usesTerms: ['frontend', 'backend', 'ui', 'ux'],
    warmupFrom: 'a01-l02',
    steps: [
      storyStep('a01/tim-web.svg', [
        rText('Membangun aplikasi seperti membangun sebuah rumah makan: ada yang mewawancarai tamu, menggambar denah, memilih cat, hingga membangun dapur.'),
      ]),
      conceptStep({
        title: t('Tim Riset & Desain (UX Researcher, UX/UI Designer)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a01', topic: 'peran-desain' },
        alt: t('Peran UX Researcher, UX Designer, dan UI Designer sebelum coding.'),
        body: [
          rText('UX Researcher meneliti kebutuhan pengguna lewat wawancara. UX Designer merancang alur dan '),
          rTerm('wireframe', 'wireframe'),
          rText(', lalu UI Designer memoles warna serta komponen visual di Figma.'),
        ],
      }),
      conceptStep({
        title: t('Tim Pengembang (Frontend, Backend, Full-stack)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a01', topic: 'peran-dev' },
        alt: t('Kolaborasi Frontend, Backend, dan Full-stack Developer.'),
        body: [
          rText('Frontend Developer mengubah desain menjadi antarmuka interaktif. Backend Developer mengurus logika server dan database, sementara Full-stack mengerjakan keduanya.'),
        ],
      }),
      limitStep({
        analogy: t('Pembagian tim di restoran besar vs tim kecil'),
        same: [
          t('Setiap peran punya keahlian khusus agar hasil akhir rapi dan cepat.'),
        ],
        different: [
          t('Di tim startup kecil, satu orang sering merangkap UI/UX sekaligus Frontend.'),
        ],
      }),
      simStep('restoran-web', t('Simulasikan bagaimana pesan melewati frontend menuju backend.')),
      qStep(
        makeMcq({
          id: 'a01-l03-q1',
          prompt: t('Siapa yang bertugas menanyakan langsung kesulitan pengguna lewat wawancara dan usability test?'),
          choices: [
            { id: 'uxr', label: t('UX Researcher') },
            { id: 'be', label: t('Backend Developer'), explainWrong: t('Backend berfokus pada server dan database.') },
            { id: 'uid', label: t('UI Designer'), explainWrong: t('UI Designer fokus merancang tampilan visual.') },
          ],
          answer: 'uxr',
          explainCorrect: t('Tepat. UX Researcher mencari tahu kebutuhan dan masalah pengguna lewat riset.'),
          tags: ['ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l03-q2',
          prompt: t('Dokumen sketsa kasar struktur halaman yang dibuat UX Designer disebut…'),
          choices: [
            { id: 'wf', label: t('Wireframe') },
            { id: 'db', label: t('Database'), explainWrong: t('Database menyimpan data backend.') },
            { id: 'url', label: t('URL'), explainWrong: t('URL adalah alamat situs.') },
          ],
          answer: 'wf',
          explainCorrect: t('Benar. Wireframe fokus pada struktur tata letak sebelum pewarnaan UI.'),
          tags: ['wireframe'],
        }),
      ),
      qStep({
        id: 'a01-l03-q3',
        type: 'match',
        prompt: t('Pasangkan peran dengan alat kerjanya yang paling umum:'),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('UI Designer') },
          { id: 'l2', label: t('Frontend Developer') },
          { id: 'l3', label: t('Backend Developer') },
        ],
        right: [
          { id: 'r1', label: t('Figma') },
          { id: 'r2', label: t('HTML, CSS, JS, React') },
          { id: 'r3', label: t('Node.js, Python, SQL') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3' },
        explainCorrect: t('Tepat sekali! Setiap peran memakai perkakas sesuai tanggung jawabnya.'),
        tags: ['frontend', 'backend', 'ui'],
      }),
      qStep(
        makeMcq({
          id: 'a01-l03-q4',
          type: 'limit',
          analogy: t('Pembagian peran tetap di tim besar'),
          prompt: t('Manakah pernyataan yang TIDAK selalu berlaku dalam tim web nyata?'),
          choices: [
            { id: 'strict', label: t('Satu orang selalu hanya boleh mengerjakan satu peran saja') },
            { id: 'collab', label: t('Desainer dan developer perlu berkomunikasi tentang alur'), explainWrong: t('Komunikasi lintas peran selalu penting.') },
            { id: 'fe', label: t('Frontend mengubah desain menjadi halaman hidup'), explainWrong: t('Itu memang tugas utama frontend.') },
          ],
          answer: 'strict',
          explainCorrect: t('Di tim kecil, satu orang sering merangkap UI/UX sekaligus Frontend atau Full-stack.'),
          tags: ['frontend'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a01-l03-q5',
          prompt: t('Frontend developer yang paham prinsip UI/UX bisa membuat keputusan tampilan yang baik tanpa selalu menunggu desainer.'),
          answer: true,
          explainCorrect: t('Benar. Pemahaman UI/UX membuat kolaborasi dan pengambilan keputusan harian lebih cepat.'),
          explainWrong: t('Memahami UI/UX sangat membantu frontend developer saat merakit antarmuka.'),
          tags: ['frontend', 'ui', 'ux'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l03-q6',
          type: 'scenario',
          story: t('Toko Rani ingin meluncurkan aplikasi kecil dengan hanya 1 programmer yang mengurus tampilan sekaligus database.'),
          prompt: t('Peran apakah yang sedang dijalankan programmer tersebut?'),
          difficulty: 2,
          choices: [
            { id: 'fs', label: t('Full-stack Developer') },
            { id: 'uxr', label: t('UX Researcher saja'), explainWrong: t('Ia juga menulis kode tampilan dan database.') },
            { id: 'ui', label: t('UI Designer saja'), explainWrong: t('Ia menangani pemrograman frontend maupun backend.') },
          ],
          answer: 'fs',
          explainCorrect: t('Tepat. Full-stack Developer mengerjakan sisi frontend maupun backend.'),
          tags: ['frontend', 'backend'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a01-l03-r1',
        prompt: t('Peran yang merancang alur pengguna dan wireframe sebelum diberi warna adalah…'),
        choices: [
          { id: 'uxd', label: t('UX Designer') },
          { id: 'be', label: t('Backend Developer'), explainWrong: t('Backend bekerja di server dan database.') },
        ],
        answer: 'uxd',
        explainCorrect: t('UX Designer menyusun alur dan struktur halaman.'),
        tags: ['wireframe'],
      }),
      makeTf({
        id: 'a01-l03-r2',
        prompt: t('Full-stack Developer adalah pengembang yang mengerjakan frontend dan backend sekaligus.'),
        answer: true,
        explainCorrect: t('Betul! Full-stack menggabungkan keduanya.'),
        explainWrong: t('Full-stack mencakup sisi klien maupun sisi server.'),
        tags: ['frontend', 'backend'],
      }),
    ],
    recap: t('Aplikasi web lahir dari kerja sama periset, desainer UI/UX, frontend, dan backend.'),
  }),

  makeLesson({
    id: 'a01-l04',
    worldId: 'a01',
    title: 'Perjalanan sebuah halaman (request–response)',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengurutkan perjalanan halaman dari browser sampai tampil di layar.',
      'Aku bisa menjelaskan pola request–response, DNS, browser, dan server.',
    ),
    estMinutes: 6,
    introducesTerms: ['browser', 'server', 'dns', 'request', 'response'],
    usesTerms: ['frontend', 'backend'],
    stickerId: 'ojek-paket',
    warmupFrom: 'a01-l02',
    steps: [
      storyStep('a01/ojek-paket.svg', [
        rText(
          'Membuka website itu seperti memesan paket lewat ojek online. Kamu memesan, kurir mencari alamat toko, lalu paket datang!',
          'Membuka website bekerja persis seperti pesan antar: browser mengirim pesanan, DNS menunjuk alamat, dan server mengirim berkas halaman.',
        ),
      ]),
      conceptStep({
        title: t('Browser mengirim Request', 'Browser & Request'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'a01', topic: 'request-response' },
        alt: t('Diagram alur browser mengirim request lewat DNS menuju server.'),
        body: [
          rText('Saat kamu mengetik alamat di '),
          rTerm('browser', 'browser', 'browser'),
          rText(', ia mencari nomor alamat lewat '),
          rTerm('dns', 'DNS', 'DNS'),
          rText(' lalu mengirim '),
          rTerm('request', 'request', 'request'),
          rText('.'),
        ],
      }),
      conceptStep({
        title: t('Server membalas dengan Response', 'Server & Response'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'a01', topic: 'server-response' },
        alt: t('Server mengirimkan response berisi HTML, CSS, dan gambar ke browser.'),
        body: [
          rTerm('server', 'Server', 'Server'),
          rText(' mencari file website lalu mengirim balik '),
          rTerm('response', 'response', 'response'),
          rText(' agar browser menatanya di layar.'),
        ],
      }),
      limitStep({
        analogy: t('Pesan makanan ojek online'),
        same: [
          t('Ada pemesan (browser), buku alamat (DNS), dan toko pengirim (server).'),
        ],
        different: [
          t('Paket website berupa salinan file digital, bukan barang fisik yang habis dari toko.'),
          t('Perjalanan pesan internet terjadi dalam hitungan milidetik.'),
        ],
      }),
      simStep(
        'restoran-web',
        t(
          'Amati perjalanan request dan response pada simulasi restoran web.',
          'Uji alur request dari client dan response dari server pada simulator.',
        ),
      ),
      qStep({
        id: 'a01-l04-q1',
        type: 'order',
        prompt: t('Urutkan perjalanan halaman web dari awal hingga tampil di layar:'),
        difficulty: 2,
        items: [
          { id: 's1', label: t('Kamu mengetik alamat di browser') },
          { id: 's2', label: t('DNS menerjemahkan nama situs ke nomor alamat server') },
          { id: 's3', label: t('Server membalas request dengan mengirim response') },
          { id: 's4', label: t('Browser menampilkan halaman di layar') },
        ],
        answer: ['s1', 's2', 's3', 's4'],
        explainCorrect: t('Tepat sekali! Urutan request–DNS–response–render berjalan setiap kali web dibuka.'),
        tags: ['browser', 'dns', 'request', 'response'],
      }),
      qStep(
        makeMcq({
          id: 'a01-l04-q2',
          type: 'analogy',
          prompt: t('Buku kontak telepon di HP yang mengubah nama jadi nomor mirip dengan…'),
          choices: [
            { id: 'dns', label: t('DNS') },
            { id: 'browser', label: t('Browser'), explainWrong: t('Browser ibarat diri kita sebagai pemesan.') },
            { id: 'server', label: t('Server'), explainWrong: t('Server adalah toko yang menyimpan file.') },
          ],
          answer: 'dns',
          explainCorrect: t('Benar! DNS menerjemahkan nama domain seperti toko-rani.example ke angka IP.'),
          tags: ['dns'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l04-q3',
          prompt: t('Pesan balasan dari server berisi file halaman disebut…'),
          choices: [
            { id: 'res', label: t('Response') },
            { id: 'req', label: t('Request'), explainWrong: t('Request adalah pesan permintaan dari browser.') },
            { id: 'dns', label: t('DNS'), explainWrong: t('DNS adalah penerjemah alamat.') },
          ],
          answer: 'res',
          explainCorrect: t('Tepat! Request berarti meminta, Response berarti jawaban.'),
          tags: ['response'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a01-l04-q4',
          prompt: t('Hosting adalah tempat menyewa ruang di komputer server untuk menaruh file website.'),
          answer: true,
          explainCorrect: t('Betul! Hosting ibarat menyewa ruko agar toko webmu bisa dikunjungi kapan saja.'),
          explainWrong: t('Hampir! File website butuh komputer yang selalu menyala, yaitu hosting/server.'),
          tags: ['server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l04-q5',
          type: 'limit',
          analogy: t('Kurir ojek online'),
          prompt: t('Apa batas dari analogi kurir ojek online saat menjelaskan pengiriman website?'),
          choices: [
            { id: 'copy', label: t('Server mengirim salinan file digital, sehingga file di server tidak berkurang') },
            { id: 'addr', label: t('Harus tahu alamat tujuan sebelum mengirim'), explainWrong: t('Keduanya sama-sama butuh alamat yang tepat.') },
            { id: 'wait', label: t('Pemesan menunggu paket balasan'), explainWrong: t('Ini memang kemiripannya.') },
          ],
          answer: 'copy',
          explainCorrect: t('Tepat! Berkas web disalin dan dikirim dalam milidetik kepada jutaan pengunjung sekaligus.'),
          tags: ['server', 'response'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l04-q6',
          type: 'scenario',
          story: t('Sari mengetik alamat situs yang salah eja sehingga DNS tidak menemukan alamat servernya.'),
          prompt: t('Apa yang terjadi pada perjalanan halaman?'),
          difficulty: 2,
          choices: [
            { id: 'fail', label: t('Browser tidak tahu ke server mana request dikirim dan menampilkan error alamat') },
            { id: 'auto', label: t('Server tetap mengirim gambar acak'), explainWrong: t('Server tujuan belum ditemukan tanpa DNS.') },
            { id: 'css', label: t('Halaman tampil tanpa warna saja'), explainWrong: t('Halaman tidak akan terbuka sama sekali.') },
          ],
          answer: 'fail',
          explainCorrect: t('Benar! Tanpa alamat IP dari DNS, browser tidak bisa menghubungi server tujuan.'),
          tags: ['dns', 'browser'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a01-l04-r1',
        prompt: t('Penerjemah nama domain menjadi nomor alamat komputer server adalah…'),
        choices: [
          { id: 'dns', label: t('DNS') },
          { id: 'res', label: t('Response'), explainWrong: t('Response adalah paket jawaban dari server.') },
        ],
        answer: 'dns',
        explainCorrect: t('DNS mencocokkan nama domain ke nomor alamat server.'),
        tags: ['dns'],
      }),
      makeMcq({
        id: 'a01-l04-r2',
        prompt: t('Saat browser meminta halaman ke server, pesan itu disebut…'),
        choices: [
          { id: 'req', label: t('Request') },
          { id: 'res', label: t('Response'), explainWrong: t('Response adalah balasan dari server.') },
        ],
        answer: 'req',
        explainCorrect: t('Request adalah permintaan yang dikirim client ke server.'),
        tags: ['request'],
      }),
    ],
    recap: t(
      'Browser mengirim request lewat petunjuk DNS, lalu server membalas dengan response.',
      'Semua situs web bekerja lewat pola request dari browser, resolusi alamat oleh DNS, dan response dari server.',
    ),
    companion: {
      talkPrompts: ['Kalau tidak ada buku kontak DNS, apa yang harus kita hafal setiap mau buka website?'],
      offlineActivity: 'Cari sebuah nomor telepon kontak di HP lalu pahami bahwa DNS bekerja persis seperti buku kontak itu.',
    },
  }),

  makeLesson({
    id: 'a01-l05',
    worldId: 'a01',
    title: 'Membaca alamat URL',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menunjuk mana protokol, domain, dan halaman tujuan pada URL.',
      'Aku bisa menguraikan bagian URL: protokol HTTPS, domain, path, dan query parameter.',
    ),
    estMinutes: 5,
    introducesTerms: ['url', 'domain', 'https'],
    usesTerms: ['browser', 'server'],
    stickerId: 'alamat-rumah',
    warmupFrom: 'a01-l04',
    steps: [
      storyStep('a01/alamat-rumah.svg', [
        rText(
          'Alamat rumah lengkap menyebutkan jalan, nomor rumah, dan catatan pagar. Alamat web juga punya susunan yang sama!',
          'Seperti alamat surat lengkap yang menunjuk kota, jalan, gedung, hingga ruang spesifik, URL membimbing browser tepat ke tujuan.',
        ),
      ]),
      conceptStep({
        title: t('Bagian-bagian URL', 'Anatomi URL'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a01', topic: 'bagian-url' },
        alt: t('Contoh URL https://toko-rani.example/produk?warna=merah terbagi 4 bagian.'),
        code: {
          lang: 'text',
          code: 'https://toko-rani.example/produk?warna=merah',
          highlight: [1],
        },
        body: [
          rTerm('url', 'URL', 'URL'),
          rText(' berisi cara bicara aman ('),
          rTerm('https', 'HTTPS', 'HTTPS'),
          rText('), nama toko ('),
          rTerm('domain', 'domain', 'domain'),
          rText('), lokasi halaman (path), dan saringan (query).'),
        ],
      }),
      conceptStep({
        title: t('HTTPS menjaga pesan terkunci', 'HTTP vs HTTPS'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a01', topic: 'https-aman' },
        alt: t('Amplop terbuka HTTP vs amplop tersegel gembok HTTPS.'),
        body: [
          rTerm('https', 'HTTPS', 'HTTPS'),
          rText(
            ' membungkus pesanmu dalam amplop terkunci agar tidak diintip di jalan.',
            ' menambahkan lapisan enkripsi di atas HTTP agar data kata sandi atau transaksi tidak terbaca penyadap.',
          ),
        ],
      }),
      limitStep({
        analogy: t('URL seperti alamat rumah dan surat tersegel'),
        same: [
          t('Mengarahkan kurir tepat ke tujuan, dan HTTPS mengunci isi suratnya.'),
        ],
        different: [
          t('Bagian query (?warna=merah) bisa langsung mengubah isi yang tampil di halaman, sedangkan catatan amplop rumah tidak mengubah isi rumah.'),
        ],
      }),
      simStep(
        'restoran-web',
        t(
          'Lihat alamat yang dikirim saat memesan di simulasi kota web.',
          'Amati bagaimana domain dan path dipakai mengarahkan request ke endpoint yang tepat.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a01-l05-q1',
          prompt: t('Pada https://toko-rani.example/produk, manakah yang disebut domain?'),
          choices: [
            { id: 'dom', label: t('toko-rani.example') },
            { id: 'https', label: t('https://'), explainWrong: t('https:// adalah protokol cara bicara aman.') },
            { id: 'path', label: t('/produk'), explainWrong: t('/produk adalah path halaman yang dituju.') },
          ],
          answer: 'dom',
          explainCorrect: t('Benar! Domain adalah nama unik situs web tersebut.'),
          tags: ['domain', 'url'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l05-q2',
          type: 'analogy',
          prompt: t('Perbedaan HTTP biasa dan HTTPS paling mirip dengan…'),
          choices: [
            { id: 'seal', label: t('Kartu pos terbuka vs surat dalam amplop tersegel gembok') },
            { id: 'pen', label: t('Pulpen biru vs pensil'), explainWrong: t('Bedanya ada pada keamanan penguncian pesan.') },
            { id: 'car', label: t('Mobil merah vs motor'), explainWrong: t('Fokusnya adalah pesan terkunci aman.') },
          ],
          answer: 'seal',
          explainCorrect: t('Tepat! HTTPS menyegel pesan sehingga pihak luar di jaringan tidak bisa mengintip.'),
          tags: ['https'],
        }),
      ),
      qStep({
        id: 'a01-l05-q3',
        type: 'match',
        prompt: t('Pasangkan potongan URL https://toko-rani.example/sepatu?ukuran=38 dengan perannya:'),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('https://') },
          { id: 'l2', label: t('toko-rani.example') },
          { id: 'l3', label: t('/sepatu') },
          { id: 'l4', label: t('?ukuran=38') },
        ],
        right: [
          { id: 'r1', label: t('Protokol aman') },
          { id: 'r2', label: t('Nama domain toko') },
          { id: 'r3', label: t('Path halaman tujuan') },
          { id: 'r4', label: t('Query filter tambahan') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
        explainCorrect: t('Mantap! Kamu bisa membaca seluruh bagian sebuah URL dengan tepat.'),
        tags: ['url', 'domain', 'https'],
      }),
      qStep(
        makeMcq({
          id: 'a01-l05-q4',
          type: 'limit',
          analogy: t('URL seperti alamat rumah'),
          prompt: t('Bagian mana yang berbeda antara URL web dan alamat rumah biasa?'),
          choices: [
            { id: 'q', label: t('Query (?warna=merah) bisa memicu server menyaring isi yang dikirim') },
            { id: 'uniq', label: t('Setiap tempat punya nama pengenal unik'), explainWrong: t('Ini persamaan alamat rumah dan domain.') },
            { id: 'guide', label: t('Dipakai pengantar untuk menemukan tujuan'), explainWrong: t('Keduanya sama-sama memandu ke tujuan.') },
          ],
          answer: 'q',
          explainCorrect: t('Benar! Query parameter meminta server menyesuaikan halaman yang dikirim balik.'),
          tags: ['url'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a01-l05-q5',
          prompt: t('Situs yang meminta kata sandi wajib memakai HTTPS agar data tidak disadap.'),
          answer: true,
          explainCorrect: t('Betul! HTTPS mencegah orang di jaringan Wi-Fi umum mengintip kata sandimu.'),
          explainWrong: t('Hampir! Data rahasia tidak boleh dikirim lewat HTTP polos tanpa enkripsi HTTPS.'),
          tags: ['https'],
        }),
      ),
      qStep({
        id: 'a01-l05-q6',
        type: 'type',
        modes: ['pro'],
        prompt: t('Tulis nama bagian URL setelah tanda ? yang berfungsi mengirim filter atau halaman (contoh: ?warna=merah).'),
        difficulty: 2,
        accept: ['query', 'query parameter', 'query string'],
        explainCorrect: t('Tepat. Bagian setelah tanda tanya disebut query atau query parameter.'),
        tags: ['url'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a01-l05-r1',
        prompt: t('Huruf "S" pada HTTPS berarti…'),
        choices: [
          { id: 's', label: t('Secure (aman dan terenkripsi)') },
          { id: 'slow', label: t('Slow (lambat)'), explainWrong: t('S singkatan dari Secure.') },
        ],
        answer: 's',
        explainCorrect: t('HTTPS memastikan komunikasi browser–server terenkripsi aman.'),
        tags: ['https'],
      }),
      makeMcq({
        id: 'a01-l05-r2',
        prompt: t('Bagian alamat web yang menjadi nama utama situs (seperti toko-rani.example) disebut…'),
        choices: [
          { id: 'd', label: t('Domain') },
          { id: 'p', label: t('Path'), explainWrong: t('Path adalah bagian setelah garis miring /, misalnya /produk.') },
        ],
        answer: 'd',
        explainCorrect: t('Domain adalah nama pengenal utama situs.'),
        tags: ['domain'],
      }),
    ],
    recap: t(
      'URL terdiri atas cara bicara (HTTPS), nama situs (domain), halaman tujuan (path), dan catatan (query).',
      'URL menggabungkan protokol HTTPS, domain, path halaman, dan query parameter dalam satu alamat lengkap.',
    ),
    companion: {
      talkPrompts: ['Coba cek bilah alamat browser bersama: apakah ada ikon gembok HTTPS?'],
      offlineActivity: 'Tuliskan alamat lengkap rumah di secarik kertas lalu beri garis warna mana yang seperti domain dan mana yang seperti path.',
    },
  }),

  makeLesson({
    id: 'a01-l06',
    worldId: 'a01',
    title: 'HTML, CSS, JavaScript: kerangka, baju, gerak',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mencocokkan peran HTML, CSS, dan JavaScript saat membangun halaman web.',
      'Aku bisa membedakan tanggung jawab HTML, CSS, dan JavaScript pada satu halaman yang sama.',
    ),
    estMinutes: 6,
    introducesTerms: ['html', 'css', 'javascript'],
    usesTerms: ['browser', 'frontend'],
    stickerId: 'rumah-lapis',
    warmupFrom: 'a01-l05',
    steps: [
      storyStep('a01/rumah-lapis.svg', [
        rText(
          'Membuat halaman web itu seperti membangun rumah. Butuh tembok kokoh dulu, baru cat indah, lalu saklar lampu yang menyala!',
          'Satu halaman web modern dibangun dari tiga lapisan kerja yang saling melengkapi ibarat struktur rumah, cat dekorasi, dan instalasi listrik.',
        ),
      ]),
      conceptStep({
        title: t('HTML = Kerangka dan Isi', 'HTML (Kerangka)'),
        visualName: 'HtmlTreeDiagram',
        visualProps: { worldId: 'a01', topic: 'html-kerangka' },
        alt: t('Kerangka HTML berisi judul, paragraf, dan tombol polos.'),
        body: [
          rTerm('html', 'HTML', 'HTML'),
          rText(' menentukan isi dan kerangka halaman: mana judul, tulisan, gambar, dan tombol.'),
        ],
      }),
      conceptStep({
        title: t('CSS = Cat dan Dandanan', 'CSS (Tampilan)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a01', topic: 'css-dandanan' },
        alt: t('Halaman HTML yang diberi warna, sudut bulat, dan tata letak oleh CSS.'),
        body: [
          rTerm('css', 'CSS', 'CSS'),
          rText(' mengatur warna, ukuran huruf, jarak, dan posisi agar halaman sedap dipandang.'),
        ],
      }),
      conceptStep({
        title: t('JavaScript = Gerak dan Aksi', 'JavaScript (Perilaku)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a01', topic: 'js-gerak' },
        alt: t('Tombol Beli berubah menjadi Terbeli saat diklik berkat JavaScript.'),
        body: [
          rTerm('javascript', 'JavaScript', 'JavaScript'),
          rText(' membuat halaman hidup dan merespons saat tombol diklik atau kotak diketik.'),
        ],
      }),
      limitStep({
        analogy: t('Rumah 3 lapis: tembok, cat, listrik'),
        same: [
          t('Tanpa kerangka HTML tidak ada isi; tanpa CSS tampil polos; tanpa JS tidak interaktif.'),
        ],
        different: [
          t('Rumah sekali dicat sulit diubah, sedangkan CSS dan JS web bisa langsung mengubah tampilan dan isi halaman dalam sekejap.'),
        ],
      }),
      simStep(
        'restoran-web',
        t(
          'Lihat interaksi tombol di layar pada simulasi restoran web.',
          'Amati kolaborasi struktur HTML, gaya CSS, dan aksi klik JavaScript di browser.',
        ),
      ),
      qStep({
        id: 'a01-l06-q1',
        type: 'match',
        prompt: t('Pasangkan tiga bahan utama frontend dengan perumpamaannya pada rumah:'),
        difficulty: 1,
        left: [
          { id: 'html', label: t('HTML') },
          { id: 'css', label: t('CSS') },
          { id: 'js', label: t('JavaScript') },
        ],
        right: [
          { id: 'kerangka', label: t('Tembok, pintu, dan kerangka') },
          { id: 'cat', label: t('Cat dinding dan hiasan') },
          { id: 'listrik', label: t('Listrik, saklar, dan bel yang berbunyi') },
        ],
        answer: { html: 'kerangka', css: 'cat', js: 'listrik' },
        explainCorrect: t('Sempurna! Kerangka (HTML), dandanan (CSS), gerak (JavaScript).'),
        tags: ['html', 'css', 'javascript'],
      }),
      qStep(
        makeMcq({
          id: 'a01-l06-q2',
          prompt: t('Kalau kamu ingin mengubah warna latar tombol menjadi hijau dan sudutnya bulat, mana yang kamu edit?'),
          choices: [
            { id: 'css', label: t('CSS') },
            { id: 'html', label: t('HTML saja'), explainWrong: t('HTML hanya menentukan tombolnya ada, bukan warnanya.') },
            { id: 'dns', label: t('DNS'), explainWrong: t('DNS menerjemahkan alamat situs.') },
          ],
          answer: 'css',
          explainCorrect: t('Benar! Warna dan bentuk visual diatur oleh CSS.'),
          tags: ['css'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l06-q3',
          prompt: t('Ketika tombol "Beli" ditekan lalu angka keranjang langsung bertambah 1, siapa yang bekerja?'),
          choices: [
            { id: 'js', label: t('JavaScript') },
            { id: 'css', label: t('CSS saja'), explainWrong: t('CSS tidak bisa menghitung penambahan angka keranjang.') },
            { id: 'html', label: t('HTML saja'), explainWrong: t('HTML hanya struktur diam.') },
          ],
          answer: 'js',
          explainCorrect: t('Tepat! Logika perhitungan dan reaksi klik ditangani JavaScript.'),
          tags: ['javascript'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l06-q4',
          type: 'limit',
          analogy: t('Rumah tiga lapis'),
          prompt: t('Hal mana yang TIDAK sama antara halaman web dan rumah fisik?'),
          choices: [
            { id: 'dyn', label: t('JavaScript bisa mengubah dan menambah bagian kerangka HTML kapan saja') },
            { id: 'base', label: t('Kerangka dibuat paling awal untuk menampung isi'), explainWrong: t('Ini kesamaannya.') },
            { id: 'style', label: t('Hiasan luar memperindah kerangka'), explainWrong: t('Ini juga kesamaannya.') },
          ],
          answer: 'dyn',
          explainCorrect: t('Benar! Di web, JavaScript bisa menambah atau mengubah kerangka HTML secara dinamis.'),
          tags: ['html', 'javascript'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a01-l06-q5',
          prompt: t('Sebuah halaman web dengan HTML saja tanpa CSS tetap bisa dibaca, hanya saja tampilannya polos.'),
          answer: true,
          explainCorrect: t('Betul! Browser tetap bisa menampilkan teks, gambar, dan tautan dari HTML polos.'),
          explainWrong: t('Hampir! HTML saja sudah cukup untuk menampilkan isi, CSS yang membuatnya cantik.'),
          tags: ['html', 'css'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a01-l06-q6',
          type: 'scenario',
          story: t('Di halaman Toko Rani, foto kue tidak mau bergeser saat tombol panah kanan ditekan, padahal gambar dan warnanya sudah rapi.'),
          prompt: t('Bagian kode mana yang perlu diperiksa?'),
          difficulty: 3,
          choices: [
            { id: 'js', label: t('JavaScript (logika gerak tombol)') },
            { id: 'css', label: t('Warna huruf di CSS'), explainWrong: t('Tampilannya sudah rapi; tombolnya tidak bereaksi.') },
            { id: 'html', label: t('Judul utama HTML'), explainWrong: t('Judul tidak mengatur klik tombol geser.') },
          ],
          answer: 'js',
          explainCorrect: t('Tepat! Tombol yang tidak bereaksi saat diklik biasanya bermasalah di kode JavaScript.'),
          tags: ['javascript'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a01-l06-r1',
        prompt: t('Mana tugas utama CSS di halaman website?'),
        choices: [
          { id: 'style', label: t('Mengatur warna, ukuran, jarak, dan posisi') },
          { id: 'data', label: t('Menyimpan kata sandi di gudang server'), explainWrong: t('Itu tugas backend.') },
        ],
        answer: 'style',
        explainCorrect: t('CSS adalah dandanan visual halaman.'),
        tags: ['css'],
      }),
      makeMcq({
        id: 'a01-l06-r2',
        prompt: t('Mana tugas utama JavaScript di halaman website?'),
        choices: [
          { id: 'act', label: t('Membuat halaman merespons klik dan ketikan pengguna') },
          { id: 'addr', label: t('Menerjemahkan domain menjadi nomor IP'), explainWrong: t('Itu tugas DNS.') },
        ],
        answer: 'act',
        explainCorrect: t('JavaScript membuat halaman hidup dan interaktif.'),
        tags: ['javascript'],
      }),
    ],
    recap: t(
      'HTML adalah kerangka, CSS adalah dandanan, dan JavaScript adalah gerak.',
      'HTML membangun struktur, CSS menata tampilan visual, dan JavaScript mengatur perilaku interaktif.',
    ),
    companion: {
      talkPrompts: ['Kalau halaman website bisa diwarnai dan ditekan, bagian mana yang dikerjakan HTML, CSS, dan JS?'],
      offlineActivity: 'Gambar sketsa rumah sederhana di kertas: garis pensil (HTML), krayon warna (CSS), lalu gambar bel pintu bertuliskan "Ting!" (JS).',
    },
  }),
];
