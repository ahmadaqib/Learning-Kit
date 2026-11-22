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
  id: 'a12',
  track: 'A',
  order: 12,
  title: 'Benteng Keamanan',
  tagline: t(
    'Menjaga halaman tetap aman dan tidak menyimpan rahasia di ruang tamu.',
    'Mencegah XSS, CSRF, clickjacking, memahami penyimpanan token aman, dan aturan keamanan frontend.',
  ),
  color: '#D23B2A',
  illustration: 'a12-benteng-keamanan',
  sourceChapters: ['J1-17'],
  requires: ['a11'],
  lessons: ['a12-l01', 'a12-l02', 'a12-l03', 'a12-l04'],
  sideQuests: [],
  boss: {
    title: 'Tantangan Penjaga Benteng',
    greeting: t(
      'Selamat datang di Benteng Keamanan! Ayo uji caramu menjaga website dan rahasia tetap aman!',
      'Buktikan penguasaanmu terhadap keamanan frontend: validasi & sanitasi, XSS, CSRF, clickjacking, serta penyimpanan rahasia dan token.',
    ),
    guardianName: 'Penjaga Benteng',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'a12-anc-j1',
        prompt: t('Jika website itu seperti bank, di manakah brankas uang dan pemeriksa ulang dokumen berada?'),
        choices: [
          { id: 'be', label: t('Di backend (ruang dalam yang tertutup)') },
          {
            id: 'fe',
            label: t('Di meja depan ruang tamu frontend'),
            explainWrong: t('Meja depan frontend bisa dilihat semua pengunjung, jadi bukan tempat brankas.'),
          },
          {
            id: 'url',
            label: t('Di alamat URL atas layar'),
            explainWrong: t('Alamat URL terlihat di riwayat browser, bukan tempat menyimpan rahasia.'),
          },
        ],
        answer: 'be',
        explainCorrect: t('Pengaman utama dan rahasia harus selalu berada di backend, bukan di meja depan browser.'),
        tags: ['sanitasi', 'rahasia-frontend'],
      }),
      makeAnchorMcq({
        id: 'a12-anc-j2',
        prompt: t('Cara aman menaruh tulisan komentar dari pengunjung agar kode berbahaya tidak berjalan di halaman adalah…'),
        choices: [
          { id: 'tc', label: t('Memakai textContent agar dianggap teks biasa') },
          {
            id: 'ih',
            label: t('Memakai innerHTML tanpa diperiksa'),
            explainWrong: t('innerHTML membuat kode skrip berbahaya di komentar bisa ikut dijalankan.'),
          },
          {
            id: 'ev',
            label: t('Memakai eval() pada komentar'),
            explainWrong: t('eval() langsung menjalankan teks sebagai kode JavaScript dan sangat berbahaya.'),
          },
        ],
        answer: 'tc',
        explainCorrect: t('textContent menampilkan isi apa adanya sebagai tulisan biasa, bukan kode yang dijalankan.'),
        tags: ['xss', 'sanitasi'],
      }),
      makeAnchorMcq({
        id: 'a12-anc-j3',
        prompt: t('Apakah boleh menuliskan kata sandi rahasia database langsung di kode frontend?'),
        choices: [
          { id: 'no', label: t('Tidak boleh, karena semua kode di browser bisa dibuka siapa saja') },
          {
            id: 'yes',
            label: t('Boleh asal warnanya disamakan dengan latar belakang'),
            explainWrong: t('Lewat DevTools, orang tetap bisa membaca semua kode yang dikirim ke browser.'),
          },
          {
            id: 'hide',
            label: t('Boleh kalau tombolnya disembunyikan dengan CSS'),
            explainWrong: t('Menyembunyikan tombol di tampilan tidak mengamankan kode maupun data.'),
          },
        ],
        answer: 'no',
        explainCorrect: t('Seluruh kode frontend terbuka di browser pengunjung sehingga rahasia wajib disimpan di backend.'),
        tags: ['rahasia-frontend'],
      }),
      makeAnchorMcq({
        id: 'a12-anc-j4',
        prompt: t('Saat orang salah mengetik kata sandi waktu login, pesan mana yang paling aman ditampilkan?'),
        choices: [
          { id: 'gen', label: t('"Email atau kata sandi salah"') },
          {
            id: 'det',
            label: t('"Email benar, tetapi kata sandinya kurang satu angka"'),
            explainWrong: t('Pesan yang terlalu rinci membantu penyerang menebak akun orang lain.'),
          },
          {
            id: 'show',
            label: t('"Kata sandi yang benar adalah 123456"'),
            explainWrong: t('Jangan pernah membocorkan kata sandi asli!'),
          },
        ],
        answer: 'gen',
        explainCorrect: t('Pesan umum tidak membocorkan apakah sebuah email terdaftar atau tidak.'),
        tags: ['sanitasi'],
      }),
      makeAnchorMcq({
        id: 'a12-anc-j5',
        prompt: t('Apa perbedaan batas analogi papan pengumuman sekolah biasa dengan serangan XSS di web?'),
        type: 'limit',
        analogy: t('XSS seperti papan pengumuman yang ditempeli kertas tanpa disaring'),
        choices: [
          { id: 'run', label: t('Kertas palsu di web berisi skrip hidup yang bisa mencuri data sesi di browser korban') },
          {
            id: 'trust',
            label: t('Pengunjung percaya karena tampil di tempat resmi milik situs'),
            explainWrong: t('Ini adalah bagian yang mirip antara papan pengumuman dan halaman web.'),
          },
          {
            id: 'filter',
            label: t('Masalah muncul karena kiriman orang asing tidak disaring lebih dulu'),
            explainWrong: t('Ini juga kesamaan utamanya.'),
          },
        ],
        answer: 'run',
        explainCorrect: t('Kertas fisik hanya dibaca mata, sedangkan skrip XSS langsung dieksekusi oleh browser korban.'),
        tags: ['xss'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a12-anc-p1',
        prompt: t('Mengapa validasi formulir di frontend tetap harus diulang kembali di backend?'),
        choices: [
          { id: 'dev', label: t('Karena pengguna bisa melewati validasi HTML/JS lewat DevTools atau mengirim request langsung ke API') },
          {
            id: 'css',
            label: t('Karena CSS menghapus nilai input sebelum dikirim'),
            explainWrong: t('CSS hanya mengatur tampilan; masalahnya karena frontend berjalan di perangkat pengguna yang bisa dimodifikasi.'),
          },
          {
            id: 'font',
            label: t('Karena backend tidak mendukung huruf kecil'),
            explainWrong: t('Validasi ulang dilakukan karena klien tidak pernah bisa dipercaya sepenuhnya.'),
          },
        ],
        answer: 'dev',
        explainCorrect: t('Validasi frontend untuk kenyamanan cepat; validasi backend adalah pengaman sesungguhnya.'),
        tags: ['sanitasi'],
      }),
      makeAnchorMcq({
        id: 'a12-anc-p2',
        prompt: t('Serangan XSS yang terjadi karena skrip jahat disimpan ke database (misal di kolom komentar) dan menimpa semua pembaca disebut…'),
        choices: [
          { id: 'stored', label: t('Stored XSS') },
          {
            id: 'ref',
            label: t('Reflected XSS'),
            explainWrong: t('Reflected XSS berasal dari tautan/parameter pencarian yang langsung dipantulkan server tanpa disimpan di database.'),
          },
          {
            id: 'click',
            label: t('Clickjacking'),
            explainWrong: t('Clickjacking menipu klik lewat <iframe> transparan.'),
          },
        ],
        answer: 'stored',
        explainCorrect: t('Stored XSS tersimpan di database sehingga berjalan di browser setiap pengunjung yang membuka halaman tersebut.'),
        tags: ['xss'],
      }),
      makeAnchorMcq({
        id: 'a12-anc-p3',
        prompt: t('Bagaimana cara paling tepat mencegah serangan Clickjacking di situsmu?'),
        choices: [
          { id: 'csp', label: t("Server mengirim header Content-Security-Policy: frame-ancestors 'self' atau X-Frame-Options: DENY") },
          {
            id: 'ls',
            label: t('Menyimpan token di localStorage saja'),
            explainWrong: t('localStorage justru rawan dicuri bila ada XSS, dan tidak mencegah iframe clickjacking.'),
          },
          {
            id: 'get',
            label: t('Mengubah semua form hapus menjadi method GET'),
            explainWrong: t('Aksi ubah data justru harus memakai POST/PUT/DELETE, bukan GET.'),
          },
        ],
        answer: 'csp',
        explainCorrect: t('Header frame-ancestors atau X-Frame-Options melarang situs lain menanam halamanmu dalam <iframe> tersembunyi.'),
        tags: ['csrf'],
      }),
      makeAnchorMcq({
        id: 'a12-anc-p4',
        prompt: t('Mengapa menyimpan token login di cookie bertanda HttpOnly + Secure + SameSite lebih aman daripada localStorage?'),
        choices: [
          { id: 'httponly', label: t('Cookie HttpOnly tidak dapat dibaca oleh JavaScript jika terjadi celah XSS, hanya terkirim lewat HTTPS, dan terlindungi lintas situs') },
          {
            id: 'size',
            label: t('Karena localStorage hanya bisa menampung angka'),
            explainWrong: t('localStorage menyimpan string, tetapi bisa dibaca bebas oleh skrip JavaScript apa pun di halaman.'),
          },
          {
            id: 'offline',
            label: t('Karena cookie otomatis berjalan tanpa server'),
            explainWrong: t('Cookie HttpOnly justru diatur oleh server backend untuk keamanan transmisi ke server.'),
          },
        ],
        answer: 'httponly',
        explainCorrect: t('HttpOnly menutup akses JavaScript, Secure mewajibkan HTTPS, dan SameSite menahan pengiriman otomatis dari situs jebakan.'),
        tags: ['rahasia-frontend', 'csrf'],
      }),
      makeAnchorMcq({
        id: 'a12-anc-p5',
        prompt: t('Dalam proyek Vite atau Next.js, mengapa menaruh kunci rahasia di variabel VITE_SECRET_KEY atau NEXT_PUBLIC_API_SECRET dalam file .env tetap berbahaya?'),
        choices: [
          { id: 'pub', label: t('Karena variabel berawalan VITE_ atau NEXT_PUBLIC_ otomatis ikut dibundel dan dikirim ke browser') },
          {
            id: 'git',
            label: t('Karena Vite otomatis mengunggahnya ke media sosial'),
            explainWrong: t('Awalan tersebut memang dirancang untuk variabel publik yang boleh dibaca kode frontend di browser.'),
          },
          {
            id: 'err',
            label: t('Karena file .env tidak bisa dibaca Node.js'),
            explainWrong: t('Node.js membacanya, namun awalan publik membuat nilainya masuk ke kode browser.'),
          },
        ],
        answer: 'pub',
        explainCorrect: t('Variabel dengan awalan publik ikut terkirim ke bundle frontend dan dapat dilihat lewat DevTools.'),
        tags: ['rahasia-frontend'],
      }),
      makeAnchorMcq({
        id: 'a12-anc-p6',
        type: 'limit',
        analogy: t('CSRF seperti menyerahkan kertas palsu saat kamu memakai gelang akses gedung'),
        choices: [
          { id: 'auto', label: t('Resepsionis manusia bisa ragu melihat kertas aneh, sedangkan browser mengirim cookie secara otomatis sehingga butuh CSRF token/SameSite') },
          {
            id: 'badge',
            label: t('Server mengenali identitasmu dari tanda akses yang sudah terpasang'),
            explainWrong: t('Ini kesamaan antara cookie sesi dan gelang akses.'),
          },
          {
            id: 'trick',
            label: t('Perintah bukan berasal dari niatmu sendiri melainkan disodorkan pihak ketiga'),
            explainWrong: t('Ini juga bagian yang sama pada serangan CSRF.'),
          },
        ],
        prompt: t('Apa batas dari analogi gelang akses gedung ketika menjelaskan cara kerja CSRF di browser?'),
        answer: 'auto',
        explainCorrect: t('Server tidak melihat wajahmu—ia hanya menerima request dan cookie otomatis, sehingga wajib memeriksa CSRF token dan atribut SameSite.'),
        tags: ['csrf'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'a12-l01',
    worldId: 'a12',
    title: 'Aturan emas: jangan percaya masukan',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menjelaskan mengapa semua ketikan pengunjung harus diperiksa dulu.',
      'Aku bisa menerapkan tiga aturan emas keamanan frontend, escaping karakter khusus, validasi dua sisi, dan HTTPS.',
    ),
    estMinutes: 5,
    introducesTerms: ['sanitasi'],
    usesTerms: ['frontend', 'backend', 'https', 'url', 'browser'],
    stickerId: 'brankas-bank',
    warmupFrom: 'a11-l07',
    steps: [
      storyStep('a12/brankas-bank.svg', [
        rText(
          'Bayangkan bank punya meja depan yang ramah dan brankas terkunci di dalam. Uang tidak pernah ditaruh di meja depan, dan semua formulir tetap diperiksa petugas di dalam!',
          'Frontend adalah meja depan bank yang ramah membantu mengisi formulir, sedangkan backend adalah brankas dan petugas pemeriksa di dalam. Uang dan rahasia tidak pernah ditaruh di meja depan, dan setiap formulir diperiksa ulang di dalam.',
        ),
      ]),
      conceptStep({
        title: t('Tiga Aturan Emas Keamanan', 'Tiga Aturan Emas Frontend'),
        visualName: 'RestoranDiagram',
        visualProps: { worldId: 'a12', topic: 'aturan-emas-keamanan' },
        alt: t('Meja depan frontend terbuka dilihat siapa saja, pengaman sesungguhnya ada di backend.'),
        body: [
          rText(
            'Pertama, jangan percaya sembarang ketikan pengunjung. Kedua, isi halaman bisa diintip. Ketiga, pengaman utama ada di ',
            '1) Jangan pernah percaya masukan (ketikan, tempelan, atau URL). 2) Semua kode di browser bisa dilihat lewat DevTools. 3) Pengaman sesungguhnya ada di ',
          ),
          rTerm('backend', 'backend', 'backend'),
          rText('.', '.'),
        ],
      }),
      conceptStep({
        title: t('Validasi Dua Sisi & Mengubah Tanda Bahaya', 'Validasi Dua Sisi & Escaping'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'validasi-escaping' },
        alt: t('Karakter < diubah menjadi &lt; lewat escaping agar tidak dianggap tag HTML.'),
        code: {
          lang: 'html',
          code: 'Masukan:  <script>\nEscaped:  &lt;script&gt;',
        },
        body: [
          rTerm('sanitasi', 'Escaping', 'Escaping & Validasi'),
          rText(' mengubah tanda ', ' mengubah karakter khusus seperti '),
          rCode('<'),
          rText(
            ' menjadi tulisan biasa. Pemeriksaan dilakukan di layar dan di server.',
            ' menjadi &lt; agar tidak dianggap tag. Gunakan validasi dua sisi: frontend untuk kenyamanan, backend untuk keamanan.',
          ),
        ],
      }),
      conceptStep({
        title: t('Selalu Pakai Amplop Terkunci', 'Wajib HTTPS & Pesan Error Aman'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'https-error-aman' },
        alt: t('Koneksi HTTPS terenkripsi vs HTTP biasa, serta pesan login umum yang aman.'),
        body: [
          rText('Selalu pakai '),
          rTerm('https', 'HTTPS', 'HTTPS'),
          rText(
            ' agar pesan tidak disadap. Saat salah masuk akun, tulis pesan umum saja.',
            '—jangan muat berkas lewat http://toko-rani.example tanpa enkripsi. Saat gagal login, tampilkan pesan umum "Email atau kata sandi salah" agar tidak membocorkan akun terdaftar.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Frontend sebagai meja depan bank dan backend sebagai brankas'),
        same: [
          t('Meja depan hanya membantu mengisi formulir dengan nyaman, sedangkan keputusan akhir dan penyimpanan rahasia ada di dalam.'),
        ],
        different: [
          t('Di bank fisik pengunjung tidak bisa mengubah kertas peraturan di meja; di browser pengunjung bisa memodifikasi aturan HTML/JavaScript sesukanya lewat DevTools!'),
        ],
      }),
      simStep(
        'benteng-xss',
        t(
          'Ketik tulisan bertanda <script> di Benteng Uji dan lihat bedanya mode aman!',
          'Uji langsung bagaimana browser memperlakukan masukan berbahaya di simulator Benteng Uji XSS.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a12-l01-q1',
          type: 'analogy',
          prompt: t('Dalam analogi bank, mengapa petugas di dalam brankas tetap memeriksa ulang formulir yang sudah dicek di meja depan?'),
          choices: [
            { id: 'both', label: t('Karena aturan di frontend (meja depan) bisa dilewati pengguna lewat DevTools, jadi backend wajib memeriksa ulang') },
            {
              id: 'slow',
              label: t('Supaya pengunjung menunggu lebih lama'),
              explainWrong: t('Validasi ulang bukan untuk memperlambat, melainkan menjamin keamanan.'),
            },
            {
              id: 'css',
              label: t('Karena meja depan tidak memiliki warna CSS'),
              explainWrong: t('Validasi backend fokus memeriksa kebenaran dan hak akses data.'),
            },
          ],
          answer: 'both',
          explainCorrect: t('Benar! Validasi frontend untuk kenyamanan pengguna, validasi backend untuk keamanan sesungguhnya.'),
          tags: ['sanitasi', 'backend'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a12-l01-q2',
          prompt: t('Apa tujuan dari proses "escaping" pada teks ketikan pengguna?'),
          choices: [
            { id: 'esc', label: t('Mengubah karakter khusus seperti < menjadi &lt; sehingga tampil sebagai tulisan biasa dan tidak dijalankan') },
            {
              id: 'del',
              label: t('Menghapus seluruh komentar pengguna secara otomatis'),
              explainWrong: t('Komentar tetap tampil aman, hanya karakter HTML-nya yang dinetralkan.'),
            },
            {
              id: 'run',
              label: t('Menjalankan kode JavaScript dari pengguna lebih cepat'),
              explainWrong: t('Escaping justru mencegah teks pengguna dijalankan sebagai kode!'),
            },
          ],
          answer: 'esc',
          explainCorrect: t('Tepat! Escaping memastikan tanda kurung sudut ditampilkan apa adanya sebagai teks.'),
          tags: ['sanitasi'],
        }),
      ),
      qStep({
        id: 'a12-l01-q3',
        type: 'sort',
        prompt: t('Kelompokkan hal berikut ke Tugas Frontend (Kenyamanan) atau Tugas Backend (Pengaman Utama):'),
        difficulty: 2,
        items: [
          { id: 'f1', label: t('Menampilkan pesan cepat saat kotak email masih kosong') },
          { id: 'b1', label: t('Memeriksa ulang harga asli dan hak akses sebelum bayar') },
          { id: 'f2', label: t('Memberi ikon centang hijau jika format nomor sudah pas') },
          { id: 'b2', label: t('Menyimpan kata sandi dan kunci rahasia di server') },
        ],
        bins: [
          { id: 'fe', label: t('Frontend (Kenyamanan)') },
          { id: 'be', label: t('Backend (Pengaman Utama)') },
        ],
        answer: { f1: 'fe', b1: 'be', f2: 'fe', b2: 'be' },
        explainCorrect: t('Mantap! Frontend membuat isian nyaman; backend memegang keputusan akhir dan rahasia.'),
        tags: ['sanitasi', 'frontend', 'backend'],
      }),
      qStep(
        makeMcq({
          id: 'a12-l01-q4',
          type: 'limit',
          analogy: t('Meja depan bank vs brankas'),
          prompt: t('Risiko apa yang ada pada halaman frontend di browser tetapi TIDAK terjadi pada formulir kertas di meja bank?'),
          choices: [
            { id: 'mod', label: t('Pengunjung dapat membuka DevTools dan mengubah sendiri aturan validasi HTML atau JavaScript di layarnya') },
            {
              id: 'ask',
              label: t('Pengunjung melihat form yang rapi dan ramah dibaca'),
              explainWrong: t('Kenyamanan pengisian adalah bagian yang sama.'),
            },
            {
              id: 'check',
              label: t('Petugas di dalam tetap memeriksa ulang data yang masuk'),
              explainWrong: t('Pemeriksaan ulang di dalam juga kesamaan keduanya.'),
            },
          ],
          answer: 'mod',
          explainCorrect: t('Benar! Karena semua kode berjalan di browser milik pengunjung, validasi frontend mudah sekali dilewati.'),
          tags: ['sanitasi', 'browser'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a12-l01-q5',
          type: 'scenario',
          story: t('Bito menulis aplikasi toko online di https://toko-rani.example, tetapi gambar dan skripnya dimuat lewat alamat http://situs-lain.example tanpa gembok HTTPS.'),
          prompt: t('Mengapa memuat file lewat HTTP biasa berbahaya?'),
          difficulty: 2,
          choices: [
            { id: 'sniff', label: t('Data di jalur HTTP tidak terenkripsi sehingga bisa disadap atau diubah di tengah jalan') },
            {
              id: 'color',
              label: t('Gambar tidak bisa diberi sudut membulat'),
              explainWrong: t('Masalah utamanya adalah keamanan jalur transmisi data.'),
            },
            {
              id: 'size',
              label: t('Browser hanya mendukung HTTP untuk file teks saja'),
              explainWrong: t('Seluruh aset halaman modern wajib berjalan lewat HTTPS terenkripsi.'),
            },
          ],
          answer: 'sniff',
          explainCorrect: t('Tepat! Seluruh halaman dan file pendukung wajib memakai HTTPS agar tidak disadap atau disusupi.'),
          tags: ['https', 'sanitasi'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a12-l01-q6',
          prompt: t('Apa pun yang diketik, ditempel, atau datang dari parameter URL oleh pengguna tidak boleh langsung dipercaya tanpa diperiksa.'),
          answer: true,
          explainCorrect: t('Betul! Ini adalah aturan emas pertama keamanan web.'),
          explainWrong: t('Hampir! Masukan dari pengguna maupun URL bisa berisi kode berbahaya sehingga wajib diperiksa.'),
          tags: ['sanitasi', 'url'],
        }),
      ),
      qStep({
        id: 'a12-l01-q7',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi hasil escaping karakter HTML berbahaya agar aman ditampilkan sebagai teks:'),
        template: 'Tanda < diubah menjadi ___, dan tanda > diubah menjadi ___.',
        bank: ['&lt;', '&gt;', '&amp;', 'innerHTML'],
        answer: ['&lt;', '&gt;'],
        explainCorrect: t('Benar! Dengan mengganti < dan > menjadi &lt; dan &gt;, browser menampilkannya sebagai tulisan teks biasa.'),
        tags: ['sanitasi'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a12-l01-r1',
        prompt: t('Siapa yang boleh melihat semua kode HTML, CSS, dan JavaScript yang dikirim ke frontend?'),
        choices: [
          { id: 'any', label: t('Siapa saja melalui Browser DevTools') },
          {
            id: 'only',
            label: t('Hanya pembuat website saja'),
            explainWrong: t('Semua kode frontend dikirim ke komputer pengunjung dan terbuka di DevTools.'),
          },
        ],
        answer: 'any',
        explainCorrect: t('Karena terbuka di browser, jangan pernah menyembunyikan rahasia atau mengandalkan keamanan hanya di frontend.'),
        tags: ['sanitasi', 'browser'],
      }),
      makeTf({
        id: 'a12-l01-r2',
        prompt: t('Validasi di frontend cukup dilakukan sendirian tanpa perlu memeriksa ulang di backend.'),
        answer: false,
        explainCorrect: t('Betul, itu salah! Validasi wajib dilakukan di dua sisi: frontend untuk nyaman, backend untuk aman.'),
        explainWrong: t('Validasi frontend bisa dimatikan lewat DevTools, jadi backend wajib selalu memeriksa ulang.'),
        tags: ['sanitasi', 'backend'],
      }),
    ],
    recap: t(
      'Jangan langsung percaya ketikan pengunjung; keamanan utama selalu dijaga di backend.',
      'Terapkan validasi dua sisi, escaping masukan, dan HTTPS—ingat frontend itu meja depan yang terbuka, sedangkan backend adalah brankas.',
    ),
    companion: {
      talkPrompts: [
        'Kenapa brankas bank selalu disimpan di ruang dalam yang dikunci, bukan di meja depan tamu?',
      ],
      offlineActivity:
        'Main "Pemeriksa Formulir": kakak menulis formulir dengan kata-kata aneh di kertas, adik memeriksa apakah isiannya masuk akal sebelum masuk ke "brankas".',
    },
  }),

  makeLesson({
    id: 'a12-l02',
    worldId: 'a12',
    title: 'XSS: papan pengumuman tanpa disaring',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menjelaskan bahaya XSS dan cara aman menampilkan tulisan pengunjung pakai textContent.',
      'Aku bisa menjelaskan alur dan tiga jenis XSS (Stored, Reflected, DOM-based) serta pencegahannya (textContent, auto-escaping, DOMPurify, dan CSP).',
    ),
    estMinutes: 6,
    introducesTerms: ['xss'],
    usesTerms: ['sanitasi', 'javascript', 'html', 'dom', 'browser'],
    stickerId: 'papan-pengumuman',
    warmupFrom: 'a12-l01',
    steps: [
      storyStep('a12/papan-pengumuman.svg', [
        rText(
          'Bayangkan papan pengumuman sekolah yang boleh ditempeli kertas siapa saja tanpa diperiksa. Jika ada yang menempel kertas jebakan, siswa lain percaya karena kertasnya ada di papan resmi!',
          'XSS ibarat papan pengumuman sekolah yang menempelkan tulisan orang asing tanpa disaring: pembaca mengira pesan itu resmi dari sekolah, padahal penyerang menyelipkan kode JavaScript yang berjalan di browser korban.',
        ),
      ]),
      conceptStep({
        title: t('Apa Itu XSS?', 'Cara Kerja & Tiga Jenis XSS'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'alur-xss' },
        alt: t('Penyerang mengirim komentar berisi script, situs menyimpannya tanpa saring, lalu berjalan di browser korban.'),
        body: [
          rTerm('xss', 'XSS', 'XSS (Cross-Site Scripting)'),
          rText(
            ' terjadi saat kode nakal masuk ke halaman. Kode itu berjalan di browser.',
            ' terjadi ketika skrip berbahaya ikut berjalan di browser korban—baik lewat database (Stored), tautan pencarian (Reflected), maupun skrip halaman (DOM-based).',
          ),
        ],
      }),
      conceptStep({
        title: t('Pakai textContent, Jangan innerHTML!', 'textContent & Auto-Escaping Framework'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'textcontent-vs-innerhtml' },
        alt: t('innerHTML berbahaya menjalankan tag HTML; textContent aman menampilkannya sebagai teks.'),
        code: {
          lang: 'js',
          code: '// BERBAHAYA:\nkotak.innerHTML = komentarPengguna;\n// AMAN:\nkotak.textContent = komentarPengguna;',
          highlight: [4],
        },
        body: [
          rText('Tampilkan tulisan memakai '),
          rCode('textContent'),
          rText(
            ', bukan ',
            ' (bukan ',
          ),
          rCode('innerHTML'),
          rText('. Framework modern menyaring otomatis.', '). React {data} dan Vue {{ data }} melakukan escaping otomatis; hindari dangerouslySetInnerHTML dan v-html.'),
        ],
      }),
      conceptStep({
        title: t('Pembersih Khusus & Aturan CSP', 'Sanitasi DOMPurify, eval & CSP'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'dompurify-csp' },
        alt: t('Pustaka sanitasi DOMPurify dan header Content Security Policy membatasi sumber script.'),
        body: [
          rText(
            'Jika harus menampilkan HTML, bersihkan dulu. Jangan pakai eval dan pasang aturan sumber skrip aman.',
            'Jika terpaksa menampilkan HTML dari editor teks, bersihkan dengan DOMPurify. Hindari eval(), onclick berisi input, dan pasang Content Security Policy (CSP) di server.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Papan pengumuman sekolah tanpa disaring'),
        same: [
          t('Pengunjung memercayai isi yang tampil karena berada di tempat resmi pemilik situs.'),
        ],
        different: [
          t('Kertas di papan sekolah cuma tulisan diam; pada XSS, selipan itu berupa skrip JavaScript aktif yang bisa mencuri data sesi atau mengalihkan ke situs palsu.'),
          t('Browser tidak bisa membedakan mana skrip asli milik developer dan mana skrip selipan dari penyerang.'),
        ],
      }),
      simStep(
        'benteng-xss',
        t(
          'Coba ubah tombol dari innerHTML ke textContent lalu lihat bagaimana tag <script> menjadi aman!',
          'Bandingkan perilaku textContent aman melawan simulasi bahaya innerHTML pada Benteng Uji XSS.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a12-l02-q1',
          type: 'analogy',
          prompt: t('Mengapa XSS diumpamakan seperti papan pengumuman sekolah yang boleh ditempeli kertas tanpa diperiksa?'),
          choices: [
            { id: 'trust', label: t('Karena halaman resmi menampilkan kiriman asing tanpa disaring sehingga browser korban mengeksekusinya') },
            {
              id: 'paper',
              label: t('Karena website dicetak di atas kertas papan kayu'),
              explainWrong: t('Bukan soal bahan kertasnya, melainkan menampilkan kiriman asing tanpa penyaringan.'),
            },
            {
              id: 'bell',
              label: t('Karena berbunyi nyaring setiap jam istirahat'),
              explainWrong: t('Masalah papan pengumuman tersebut ada pada penyaringan isi kiriman.'),
            },
          ],
          answer: 'trust',
          explainCorrect: t('Benar! Browser tidak bisa membedakan skrip asli situs dengan skrip selipan yang tidak disaring.'),
          tags: ['xss', 'sanitasi'],
        }),
      ),
      qStep({
        id: 'a12-l02-q2',
        type: 'spotbug',
        prompt: t('Ketuk baris JavaScript yang membuka celah XSS saat menampilkan komentar pengunjung ke DOM:'),
        difficulty: 2,
        lines: [
          'function tampilkanKomentar(teks) {',
          '  const kotak = document.querySelector("#komentar");',
          '  kotak.innerHTML = teks;',
          '  return kotak;',
          '}',
        ],
        answer: [3],
        explainCorrect: t('Jeli! Baris 3 memakai innerHTML langsung untuk teks pengguna. Ganti dengan kotak.textContent = teks;!'),
        tags: ['xss', 'dom'],
      }),
      qStep({
        id: 'a12-l02-q3',
        type: 'match',
        prompt: t('Pasangkan jenis atau alat keamanan XSS dengan penjelasannya:'),
        difficulty: 2,
        left: [
          { id: 'st', label: t('Stored XSS') },
          { id: 'rf', label: t('Reflected XSS') },
          { id: 'dp', label: t('DOMPurify') },
          { id: 'csp', label: t('Content Security Policy (CSP)') },
        ],
        right: [
          { id: 'r1', label: t('Kode jahat ada di tautan lalu langsung dipantulkan server') },
          { id: 'r2', label: t('Aturan server tentang sumber skrip mana yang boleh jalan') },
          { id: 'r3', label: t('Kode jahat tersimpan di database seperti di kolom komentar') },
          { id: 'r4', label: t('Pustaka pembersih HTML aman jika memang harus tampilkan HTML') },
        ],
        answer: { st: 'r3', rf: 'r1', dp: 'r4', csp: 'r2' },
        explainCorrect: t('Keren! Kamu mengenal jenis serangan XSS dan lapis pertahanannya.'),
        tags: ['xss', 'sanitasi'],
      }),
      qStep(
        makeMcq({
          id: 'a12-l02-q4',
          type: 'limit',
          analogy: t('Papan pengumuman sekolah'),
          prompt: t('Hal berbahaya apa yang terjadi pada XSS di browser tetapi tidak terjadi pada papan tempel kertas biasa?'),
          choices: [
            { id: 'exec', label: t('Browser otomatis menjalankan kode JavaScript selipan yang bisa mencuri sesi atau mengubah halaman') },
            {
              id: 'read',
              label: t('Banyak pengunjung membaca pesan yang ditempel'),
              explainWrong: t('Keduanya sama-sama bisa dibaca pengunjung.'),
            },
            {
              id: 'open',
              label: t('Siapa pun boleh mengirim pesan di papan tersebut'),
              explainWrong: t('Hal itu juga mirip di keduanya.'),
            },
          ],
          answer: 'exec',
          explainCorrect: t('Tepat! Skrip aktif di browser punya kuasa membaca tampilan dan mengirim data diam-diam.'),
          tags: ['xss', 'browser'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a12-l02-q5',
          type: 'scenario',
          story: t('Raka memakai React untuk menampilkan ulasan pembeli dari database. Ia ragu antara menulis <p>{ulasan}</p> atau memakai dangerouslySetInnerHTML.'),
          prompt: t('Pilihan mana yang aman mencegah celah XSS untuk teks ulasan biasa?'),
          difficulty: 2,
          choices: [
            { id: 'safe', label: t('Tulis <p>{ulasan}</p> karena React otomatis melakukan escaping teks') },
            {
              id: 'dang',
              label: t('Pakai dangerouslySetInnerHTML agar lebih cepat'),
              explainWrong: t('Namanya saja sudah "dangerous" karena mematikan perlindungan auto-escaping React.'),
            },
            {
              id: 'eval',
              label: t('Jalankan eval(ulasan) dulu sebelum ditampilkan'),
              explainWrong: t('eval() malah mengeksekusi string sebagai kode JavaScript!'),
            },
          ],
          answer: 'safe',
          explainCorrect: t('Benar! Kurung kurawal {ulasan} di React dan {{ ulasan }} di Vue otomatis melindungi dari XSS.'),
          tags: ['xss', 'sanitasi'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a12-l02-q6',
          prompt: t('Menaruh ketikan pengguna langsung ke dalam atribut onclick="..." atau href="javascript:..." aman selama tidak memakai <script>.'),
          answer: false,
          explainCorrect: t('Betul, itu salah! Atribut onclick dan href="javascript:..." tetap dapat mengeksekusi JavaScript berbahaya.'),
          explainWrong: t('Hampir! Kode JavaScript juga bisa berjalan lewat event handler seperti onclick atau tautan javascript:.'),
          tags: ['xss'],
        }),
      ),
      qStep({
        id: 'a12-l02-q7',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi baris JavaScript agar nama pengguna dari location.hash tampil aman tanpa celah DOM-based XSS:'),
        template: 'const nama = decodeURIComponent(location.hash.slice(1));\njudul.___ = nama;',
        bank: ['textContent', 'innerHTML', 'eval', 'v-html'],
        answer: ['textContent'],
        explainCorrect: t('Tepat! Mengganti innerHTML menjadi textContent langsung menutup celah DOM-based XSS.'),
        tags: ['xss', 'dom'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a12-l02-r1',
        prompt: t('Properti DOM manakah yang aman dipakai untuk menampilkan tulisan komentar pengguna sebagai teks biasa?'),
        choices: [
          { id: 'tc', label: t('elemen.textContent') },
          {
            id: 'ih',
            label: t('elemen.innerHTML'),
            explainWrong: t('innerHTML menguraikan teks sebagai tag HTML dan membuka celah XSS.'),
          },
        ],
        answer: 'tc',
        explainCorrect: t('textContent tidak pernah mengeksekusi tag atau skrip di dalamnya.'),
        tags: ['xss', 'dom'],
      }),
      makeTf({
        id: 'a12-l02-r2',
        prompt: t('v-html di Vue dan dangerouslySetInnerHTML di React harus dihindari kecuali isinya sudah dibersihkan dengan pustaka sanitasi seperti DOMPurify.'),
        answer: true,
        explainCorrect: t('Betul! Kedua pintu darurat itu melewati escaping otomatis framework.'),
        explainWrong: t('Tanpa sanitasi seperti DOMPurify, v-html dan dangerouslySetInnerHTML membuka celah XSS.'),
        tags: ['xss', 'sanitasi'],
      }),
    ],
    recap: t(
      'Tampilkan tulisan pengguna memakai textContent supaya kode berbahaya tidak ikut jalan.',
      'Cegah Stored, Reflected, dan DOM-based XSS dengan textContent, auto-escaping framework, DOMPurify bila butuh HTML, menghindari eval/onclick, dan memasang CSP.',
    ),
    companion: {
      talkPrompts: [
        'Kenapa kita harus menyaring tulisan orang lain sebelum menempelkannya di papan pengumuman resmi sekolah?',
      ],
      offlineActivity:
        'Buat "Filter Papan Pengumuman" di kertas: siapkan 4 kartu tulisan (2 aman seperti "Besok libur", 2 bertanda "<script>") lalu pisahkan mana yang boleh langsung tempel dan mana yang harus dinetralkan.',
    },
  }),

  makeLesson({
    id: 'a12-l03',
    worldId: 'a12',
    title: 'CSRF dan clickjacking',
    modes: ['pro'],
    objective: t(
      'Aku bisa menjelaskan cara kerja CSRF, clickjacking, open redirect, serta pencegahannya di frontend dan backend.',
      'Aku bisa membedakan CSRF dan clickjacking serta memilih pertahanan tepat (CSRF token, SameSite, metode POST, frame-ancestors, rel="noopener noreferrer", dan CORS).',
    ),
    estMinutes: 5,
    introducesTerms: ['csrf'],
    usesTerms: ['sanitasi', 'xss', 'request', 'https', 'server'],
    warmupFrom: 'a12-l02',
    steps: [
      storyStep('a12/gelang-akses.svg', [
        rText(
          'Bayangkan kamu sudah masuk gedung dan memakai gelang akses. Tiba-tiba orang asing menyodorkan amplop tertutup: "Tolong serahkan ke resepsionis." Resepsionis melihat gelangmu dan langsung memproses isi amplop, padahal itu bukan keinginanmu! Itulah serangan CSRF.',
        ),
      ]),
      conceptStep({
        title: t('CSRF: Permintaan Palsu Lintas Situs'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'a12', topic: 'serangan-csrf' },
        alt: t('Situs jebakan diam-diam memicu browser mengirim request ke situs lain tempat korban sedang login.'),
        body: [
          rTerm('csrf', 'CSRF'),
          rText(' membuat browser korban mengirim '),
          rTerm('request', 'request'),
          rText(' diam-diam ke situs tempat korban sedang login. Pencegahannya: pasang '),
          rBold('CSRF token'),
          rText(' sekali pakai di form, beri atribut '),
          rCode('SameSite'),
          rText(' pada cookie, dan pastikan aksi ubah data memakai POST/PUT/DELETE, bukan GET.'),
        ],
      }),
      conceptStep({
        title: t('Clickjacking: Tombol Palsu di Atas Iframe'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'clickjacking-iframe' },
        alt: t('Situs asli ditanam transparan dalam iframe di bawah tombol palsu "Putar video".'),
        code: {
          lang: 'http',
          code: "Content-Security-Policy: frame-ancestors 'self'\nX-Frame-Options: DENY",
        },
        body: [
          rBold('Clickjacking'),
          rText(' menanam situsmu secara tak terlihat dalam '),
          rCode('<iframe>'),
          rText(' di bawah tombol palsu sehingga korban salah mengklik. Cegah dari '),
          rTerm('server', 'server'),
          rText(' dengan header '),
          rCode("frame-ancestors 'self'"),
          rText(' atau '),
          rCode('X-Frame-Options: DENY'),
          rText('.'),
        ],
      }),
      conceptStep({
        title: t('Tautan Tab Baru, Open Redirect & CORS'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'noopener-redirect-cors' },
        alt: t('rel="noopener noreferrer", batas open redirect ke situs sendiri, dan aturan CORS di backend.'),
        body: [
          rText('Pasang '),
          rCode('rel="noopener noreferrer"'),
          rText(' pada tautan '),
          rCode('target="_blank"'),
          rText('. Pada parameter seperti '),
          rCode('?next='),
          rText(', hanya izinkan tujuan dalam situs sendiri (cegah open redirect). Ingat juga: aturan '),
          rBold('CORS'),
          rText(' diatur di backend, jangan asal mengizinkan semua asal (*) untuk API berlogin.'),
        ],
      }),
      limitStep({
        analogy: t('Gelang akses gedung dan surat titipan ke resepsionis (CSRF)'),
        same: [
          t('Pengirim asli tidak berniat memerintah aksi itu, tetapi tanda aksesnya tetap terpakai.'),
        ],
        different: [
          t('Resepsionis manusia bisa bertanya langsung apakah itu keinginanmu; server HTTP tidak melihat wajahmu dan otomatis menerima cookie browser kecuali ada CSRF token atau atribut SameSite.'),
          t('Pada clickjacking, korban sendirilah yang mengklik tombol situs asli, hanya saja pandangannya tertipu tombol palsu yang menumpuk di atas <iframe>.'),
        ],
      }),
      simStep(
        'benteng-xss',
        t('Ingat bahwa jika celah XSS terbuka, token CSRF pun bisa dibaca skrip—periksa pertahanan teks aman di Benteng Uji!'),
      ),
      qStep(
        makeMcq({
          id: 'a12-l03-q1',
          type: 'analogy',
          prompt: t('Mengapa dalam serangan CSRF, situs jebakan bisa mengirim perintah "ubah email" ke situs lain tempat korban login?'),
          choices: [
            { id: 'auto', label: t('Karena browser otomatis menyertakan cookie sesi saat mengirim permintaan ke situs tujuan tersebut') },
            {
              id: 'pass',
              label: t('Karena browser membacakan kata sandi lewat speaker laptop'),
              explainWrong: t('Penyerang tidak perlu tahu kata sandi; mereka menumpang cookie sesi yang ikut terkirim otomatis.'),
            },
            {
              id: 'css',
              label: t('Karena situs jebakan memakai CSS Grid'),
              explainWrong: t('Tata letak CSS tidak memengaruhi pengiriman cookie sesi lintas situs.'),
            },
          ],
          answer: 'auto',
          explainCorrect: t('Benar! Tanpa perlindungan SameSite dan CSRF token, server mengira permintaan itu berasal dari form resminya sendiri.'),
          tags: ['csrf'],
        }),
      ),
      qStep({
        id: 'a12-l03-q2',
        type: 'match',
        prompt: t('Pasangkan ancaman web berikut dengan langkah pencegahannya:'),
        difficulty: 2,
        left: [
          { id: 'csrf', label: t('CSRF (Permintaan palsu)') },
          { id: 'cj', label: t('Clickjacking (Iframe tersembunyi)') },
          { id: 'tab', label: t('Tautan target="_blank"') },
          { id: 'red', label: t('Open redirect (?next=...)') },
        ],
        right: [
          { id: 'r1', label: t("Header frame-ancestors 'self' atau X-Frame-Options: DENY") },
          { id: 'r2', label: t('Tambahkan rel="noopener noreferrer"') },
          { id: 'r3', label: t('Hanya izinkan URL tujuan di dalam situs sendiri') },
          { id: 'r4', label: t('CSRF token sekali pakai, cookie SameSite, dan method POST') },
        ],
        answer: { csrf: 'r4', cj: 'r1', tab: 'r2', red: 'r3' },
        explainCorrect: t('Tepat sekali! Setiap jenis serangan punya celah berbeda dan pertahanan spesifik.'),
        tags: ['csrf'],
      }),
      qStep({
        id: 'a12-l03-q3',
        type: 'spotbug',
        prompt: t('Ketuk baris kode HTML yang kurang aman saat membuka tautan eksternal di tab baru karena tidak memasang rel="noopener noreferrer":'),
        difficulty: 2,
        lines: [
          '<nav>',
          '  <a href="https://situs-lain.example" target="_blank">Partner</a>',
          '  <a href="/bantuan">Bantuan</a>',
          '</nav>',
        ],
        answer: [2],
        explainCorrect: t('Jeli! Baris 2 memakai target="_blank" tanpa rel="noopener noreferrer", yang berisiko memberi kendali tab asal ke halaman tujuan.'),
        tags: ['csrf'],
      }),
      qStep(
        makeMcq({
          id: 'a12-l03-q4',
          type: 'limit',
          analogy: t('Gelang akses gedung yang menipu resepsionis'),
          prompt: t('Mengapa aturan metode HTTP (memakai POST/PUT/DELETE dan melarang GET untuk mengubah data) membantu meredam serangan CSRF sederhana?'),
          choices: [
            { id: 'get', label: t('Karena tag <img> atau tautan biasa hanya memicu permintaan GET, bukan pengiriman form POST ber-CSRF token') },
            {
              id: 'stop',
              label: t('Karena browser sama sekali tidak mendukung metode POST'),
              explainWrong: t('Browser mendukung POST untuk form dan fetch, tetapi aksi ubah data memang harus memakai POST/PUT/DELETE plus token.'),
            },
            {
              id: 'https',
              label: t('Karena metode GET tidak bisa memakai HTTPS'),
              explainWrong: t('GET bisa memakai HTTPS; masalahnya GET tidak boleh mengubah state data di server.'),
            },
          ],
          answer: 'get',
          explainCorrect: t('Tepat! Aksi penting yang mengubah data wajib memakai POST/PUT/DELETE dan dilindungi CSRF token serta cookie SameSite.'),
          tags: ['csrf', 'request'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a12-l03-q5',
          type: 'scenario',
          story: t('Di halaman login https://toko-rani.example/login?next=https://situs-lain.example, setelah pengguna login ia langsung dilempar ke situs tiruan palsu milik penyerang.'),
          prompt: t('Celah apa yang dimanfaatkan oleh tautan tersebut dan bagaimana mencegahnya?'),
          difficulty: 2,
          choices: [
            { id: 'or', label: t('Open redirect; validasi parameter ?next= agar hanya mengizinkan path atau domain di dalam toko-rani.example') },
            {
              id: 'cj',
              label: t('Clickjacking; hapus semua tombol login'),
              explainWrong: t('Mengalihkan pengguna ke situs luar lewat parameter URL adalah Open Redirect.'),
            },
            {
              id: 'cors',
              label: t('CORS; buka Access-Control-Allow-Origin menjadi *'),
              explainWrong: t('Membuka CORS ke * justru memperluas bahaya bagi API berlogin!'),
            },
          ],
          answer: 'or',
          explainCorrect: t('Benar! Parameter pengalihan harus dibatasi ke halaman internal situs sendiri agar tidak dipakai jebakan phishing.'),
          tags: ['csrf', 'sanitasi'],
        }),
      ),
      qStep({
        id: 'a12-l03-q6',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi atribut keamanan pada tautan tab baru dan header pencegah clickjacking berikut:'),
        template: '<a href="https://situs-lain.example" target="_blank" rel="___">Baca</a>\nX-Frame-Options: ___',
        bank: ['noopener noreferrer', 'DENY', 'SameSite', 'POST'],
        answer: ['noopener noreferrer', 'DENY'],
        explainCorrect: t('Tepat! rel="noopener noreferrer" mengamankan tab baru dan X-Frame-Options: DENY mencegah halaman ditanam dalam iframe.'),
        tags: ['csrf'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a12-l03-r1',
        prompt: t(
          'Atribut cookie apa yang mencegah cookie ikut terkirim diam-diam dari situs lain?',
          'Atribut cookie manakah yang mencegah pengiriman cookie otomatis pada permintaan lintas situs untuk menahan CSRF?',
        ),
        choices: [
          { id: 'ss', label: t('SameSite') },
          {
            id: 'alt',
            label: t('alt=""'),
            explainWrong: t('alt adalah atribut teks alternatif gambar HTML.'),
          },
        ],
        answer: 'ss',
        explainCorrect: t('Atribut SameSite membatasi pengiriman cookie dari situs pihak ketiga.'),
        tags: ['csrf'],
      }),
      makeTf({
        id: 'a12-l03-r2',
        prompt: t(
          'Untuk API yang memakai login akun, kita tidak boleh sembarangan memasang izin CORS wildcard (*) untuk semua situs.',
          'Mengatur CORS Access-Control-Allow-Origin: * aman untuk API yang memerlukan login dan kredensial pengguna.',
        ),
        answer: false,
        explainCorrect: t('Betul, pernyataan itu keliru! API berlogin harus menyebut asal (origin) yang diizinkan secara spesifik.'),
        explainWrong: t('Jangan asal mengizinkan semua asal (*) pada API yang memakai login atau data sensitif.'),
        tags: ['csrf'],
      }),
    ],
    recap: t(
      'Lindungi form dengan CSRF token & SameSite, cegah iframe palsu, dan batasi tujuan pengalihan.',
      'Tahan CSRF dengan token sekali pakai, cookie SameSite, dan method POST/PUT/DELETE; cegah clickjacking lewat frame-ancestors/X-Frame-Options; serta amankan tab baru, redirect, dan CORS.',
    ),
  }),

  makeLesson({
    id: 'a12-l04',
    worldId: 'a12',
    title: 'Rahasia tidak boleh di frontend',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku tahu hal-hal rahasia apa saja yang dilarang ditaruh di kode frontend.',
      'Aku bisa memilih penyimpanan token login yang aman (cookie HttpOnly+Secure+SameSite), menjaga file .env, serta menerapkan daftar periksa keamanan frontend (SRI, npm audit, URL bebas sensitif, anti-phishing).',
    ),
    estMinutes: 5,
    introducesTerms: ['rahasia-frontend'],
    usesTerms: ['frontend', 'backend', 'sanitasi', 'xss', 'csrf', 'https', 'git'],
    warmupFrom: 'a12-l03',
    steps: [
      storyStep('a12/rahasia-ruang-tamu.svg', [
        rText(
          'Jangan pernah menaruh kunci brankas di bawah keset ruang tamu atau menulis PIN di papan tulis yang bisa dilihat tamu. Kode di frontend itu ruang tamu terbuka!',
          'Apa pun yang dikirim ke browser—kode JavaScript, variabel build, hingga tombol tersembunyi CSS—dapat dibuka siapa saja lewat DevTools. Semua rahasia wajib tinggal di backend.',
        ),
      ]),
      conceptStep({
        title: t('Apa yang Terlarang di Frontend?', 'Kunci Rahasia, .env & Tombol Tersembunyi'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'rahasia-env-devtools' },
        alt: t('API key rahasia, kata sandi database, NEXT_PUBLIC_/VITE_, dan .gitignore untuk .env.'),
        body: [
          rTerm('rahasia-frontend', 'Rahasia', 'Kunci rahasia'),
          rText(
            ' tidak boleh ditulis di kode browser. Contohnya kata sandi dan kunci bayar. File ',
            ' (API key berbayar, password database, kunci pembayaran) dilarang di kode frontend. Awas: variabel NEXT_PUBLIC_ / VITE_ di ',
          ),
          rCode('.env'),
          rText(
            ' juga dilarang diunggah ke GitHub.',
            ' ikut dikirim ke browser! Masukkan .env ke .gitignore, dan cek hak akses di server.',
          ),
        ],
      }),
      conceptStep({
        title: t('Tempat Aman Menyimpan Tiket Login', 'localStorage vs Cookie HttpOnly'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'simpan-token-login' },
        alt: t('localStorage dapat dibaca JS saat XSS, sedangkan cookie HttpOnly+Secure+SameSite paling dianjurkan.'),
        body: [
          rText('Simpanan browser biasa seperti ', 'Menyimpan token di '),
          rCode('localStorage'),
          rText(
            ' mudah dicuri jika ada celah XSS. Yang paling aman adalah cookie bertanda ',
            ' berisiko dicuri JS saat ada ',
          ),
          rTerm('xss', 'XSS', 'XSS'),
          rText(
            'HttpOnly, Secure, dan SameSite dari server.',
            '. Pilihan paling dianjurkan adalah cookie HttpOnly + Secure + SameSite yang diatur backend.',
          ),
        ],
      }),
      conceptStep({
        title: t('Daftar Periksa Keamanan Lainnya', 'SRI, npm audit, URL & Anti-Phishing'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a12', topic: 'checklist-keamanan-fe' },
        alt: t('SRI integrity CDN, npm audit, jangan taruh token di URL, waspada phishing.'),
        body: [
          rText(
            'Jangan taruh kata sandi di alamat URL. Periksa alamat situs palsu, dan perbarui pustaka proyek.',
            'Jangan taruh token atau sandi di URL (tercatat di log/riwayat). Pasang atribut integrity (SRI) untuk skrip CDN, jalankan npm audit, dukung verifikasi 2 langkah, dan waspadai halaman phishing.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Menyembunyikan kunci rumah di ruang tamu terbuka'),
        same: [
          t('Menutupi tombol dengan CSS atau memakai nama variabel rahasia tidak benar-benar menyembunyikan isi di browser.'),
        ],
        different: [
          t('File .env di komputer/server memang tempat yang benar untuk menyimpan rahasia backend—selama ia tidak memakai awalan publik (VITE_/NEXT_PUBLIC_) dan tidak di-push ke Git.'),
        ],
      }),
      simStep(
        'benteng-xss',
        t(
          'Lihat kembali mengapa celah XSS harus ditutup: jika XSS tembus, semua data di localStorage langsung terbaca!',
          'Bandingkan bahaya XSS pada simulator Benteng Uji dan hubungkan dengan risiko penyimpanan token di localStorage.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a12-l04-q1',
          prompt: t('Jika tombol "Hapus Semua Akun" hanya disembunyikan lewat CSS display: none di frontend, apakah sistem sudah aman?'),
          choices: [
            { id: 'no', label: t('Tidak aman, karena orang bisa memunculkan tombol lewat DevTools atau mengirim request langsung ke backend') },
            {
              id: 'yes',
              label: t('Sudah aman, karena pengguna tidak bisa melihat tombolnya'),
              explainWrong: t('Menyembunyikan tampilan di browser sama sekali bukan pengaman hak akses.'),
            },
            {
              id: 'css',
              label: t('Aman asal memakai warna putih di atas latar putih'),
              explainWrong: t('Pengunjung tetap bisa melihat struktur HTML dan API di DevTools.'),
            },
          ],
          answer: 'no',
          explainCorrect: t('Benar! Hak akses wajib selalu diperiksa ulang di server backend sebelum menghapus data.'),
          tags: ['rahasia-frontend', 'backend'],
        }),
      ),
      qStep({
        id: 'a12-l04-q2',
        type: 'sort',
        prompt: t('Kelompokkan benda berikut ke Boleh Ada di Kode Frontend atau Harus Disimpan di Backend:'),
        difficulty: 2,
        items: [
          { id: 's1', label: t('Kata sandi database utama') },
          { id: 'f1', label: t('Warna merek dan nama toko') },
          { id: 's2', label: t('API key rahasia pembayaran berbayar') },
          { id: 'f2', label: t('Teks tombol dan gambar produk umum') },
        ],
        bins: [
          { id: 'fe', label: t('Boleh di Frontend') },
          { id: 'be', label: t('Harus di Backend') },
        ],
        answer: { s1: 'be', f1: 'fe', s2: 'be', f2: 'fe' },
        explainCorrect: t('Hebat! Rahasia pembayaran dan akses database hanya boleh berada di sisi backend.'),
        tags: ['rahasia-frontend'],
      }),
      qStep({
        id: 'a12-l04-q3',
        type: 'match',
        prompt: t('Pasangkan tempat penyimpanan data login di browser dengan sifatnya:'),
        difficulty: 2,
        left: [
          { id: 'ls', label: t('localStorage / sessionStorage') },
          { id: 'ck', label: t('Cookie biasa') },
          { id: 'ho', label: t('Cookie HttpOnly + Secure + SameSite') },
        ],
        right: [
          { id: 'r1', label: t('Tidak terbaca JavaScript, hanya HTTPS, paling dianjurkan') },
          { id: 'r2', label: t('Mudah dipakai tetapi terbaca oleh JavaScript jika ada celah XSS') },
          { id: 'r3', label: t('Terkirim otomatis tetapi masih bisa dibaca JavaScript') },
        ],
        answer: { ls: 'r2', ck: 'r3', ho: 'r1' },
        explainCorrect: t('Tepat! Cookie HttpOnly + Secure + SameSite melindungi token sesi dari pencurian lewat XSS maupun penyadapan.'),
        tags: ['rahasia-frontend', 'xss', 'csrf'],
      }),
      qStep(
        makeMcq({
          id: 'a12-l04-q4',
          type: 'limit',
          analogy: t('Menaruh rahasia di ruang tamu'),
          prompt: t('Pernyataan mana yang BENAR tentang penggunaan file .env?'),
          choices: [
            { id: 'srv', label: t('File .env aman dipakai di sisi server/backend asal tidak diawali VITE_/NEXT_PUBLIC_ dan tidak diunggah ke GitHub') },
            {
              id: 'all',
              label: t('Semua isi .env otomatis rahasia walaupun diberi awalan NEXT_PUBLIC_'),
              explainWrong: t('Variabel berawalan NEXT_PUBLIC_ dan VITE_ ikut dikirim ke browser sehingga bisa dilihat semua orang.'),
            },
            {
              id: 'push',
              label: t('File .env wajib diunggah ke GitHub publik agar bisa dibaca tim'),
              explainWrong: t('File .env harus dimasukkan ke .gitignore supaya tidak pernah bocor ke GitHub.'),
            },
          ],
          answer: 'srv',
          explainCorrect: t('Benar! Pisahkan variabel rahasia murni di backend dan masukkan .env ke .gitignore.'),
          tags: ['rahasia-frontend', 'git'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a12-l04-q5',
          type: 'scenario',
          story: t('Sari menerima pesan berisi tautan halaman login yang tampilannya sangat mirip dengan situs sekolahnya, tetapi alamat domainnya sedikit berbeda (situs-lain.example).'),
          prompt: t('Jenis penipuan apakah itu dan apa langkah aman yang harus dilakukan Sari?'),
          difficulty: 2,
          choices: [
            { id: 'phish', label: t('Phishing; jangan masukkan kata sandi, selalu periksa alamat domain resmi dan aktifkan verifikasi dua langkah') },
            {
              id: 'css',
              label: t('Bug CSS Grid; tekan Refresh 10 kali lalu masukkan kata sandi'),
              explainWrong: t('Itu bukan bug tampilan, melainkan halaman tiruan phishing untuk mencuri login.'),
            },
            {
              id: 'url',
              label: t('Cara aman adalah menulis kata sandi langsung di parameter URL'),
              explainWrong: t('Jangan pernah menaruh kata sandi atau token di URL karena tercatat di riwayat dan log server.'),
            },
          ],
          answer: 'phish',
          explainCorrect: t('Tepat! Membiasakan memeriksa domain resmi di bilah alamat dan mengaktifkan 2FA melindungi akun dari phishing.'),
          tags: ['rahasia-frontend', 'sanitasi'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a12-l04-q6',
          prompt: t('Menaruh token rahasia atau kata sandi di alamat URL (misalnya ?token=rahasia123) aman karena URL langsung hilang setelah halaman terbuka.'),
          answer: false,
          explainCorrect: t('Betul, itu salah! URL tersimpan di riwayat browser, log server, dan mudah ikut terbawa saat tautan disalin.'),
          explainWrong: t('Hampir! Alamat URL tersimpan di riwayat browser maupun log server sehingga tidak boleh berisi data sensitif.'),
          tags: ['rahasia-frontend'],
        }),
      ),
      qStep({
        id: 'a12-l04-q7',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi perintah audit dependensi dan nama atribut pengaman sidik jari skrip CDN (Subresource Integrity):'),
        template: 'Periksa celah library proyek dengan perintah: npm ___\nSidik jari file CDN dipasang pada atribut: ___',
        bank: ['audit', 'integrity', 'innerHTML', 'push'],
        answer: ['audit', 'integrity'],
        explainCorrect: t('Tepat! npm audit mendeteksi celah pada paket pihak ketiga, sedangkan atribut integrity (SRI) menolak file CDN yang dimodifikasi.'),
        tags: ['rahasia-frontend'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a12-l04-r1',
        prompt: t('Ke manakah file .env berisi kunci rahasia harus didaftarkan agar tidak ikut terunggah saat git push?'),
        choices: [
          { id: 'gi', label: t('.gitignore') },
          {
            id: 'html',
            label: t('index.html'),
            explainWrong: t('Menaruh di index.html justru menampilkannya ke publik.'),
          },
        ],
        answer: 'gi',
        explainCorrect: t('Selalu masukkan .env ke dalam .gitignore sejak awal proyek.'),
        tags: ['rahasia-frontend', 'git'],
      }),
      makeTf({
        id: 'a12-l04-r2',
        prompt: t('Cookie dengan tanda HttpOnly tidak dapat dibaca oleh kode JavaScript di browser.'),
        answer: true,
        explainCorrect: t('Betul! Sifat HttpOnly melindungi token login bila terjadi serangan XSS.'),
        explainWrong: t('HttpOnly memang dirancang agar cookie tidak dapat diakses lewat document.cookie oleh JavaScript.'),
        tags: ['rahasia-frontend', 'xss'],
      }),
    ],
    recap: t(
      'Simpan kunci rahasia di backend, bukan di kode browser atau di alamat URL.',
      'Lindungi rahasia hanya di backend, abaikan awalan publik untuk kunci privat, simpan .env di .gitignore, gunakan cookie HttpOnly+Secure+SameSite, SRI, npm audit, dan hindari data sensitif di URL.',
    ),
    companion: {
      talkPrompts: [
        'Kenapa halaman login tiruan (phishing) sering meniru warna dan logo asli tapi alamat situsnya berbeda satu-dua huruf?',
      ],
      offlineActivity:
        'Latihan detektif alamat situs: tulis 4 kartu alamat URL (1 resmi toko-rani.example, 3 mirip menipu seperti t0k0-rani.example) lalu minta menebak mana yang asli dalam 5 detik.',
    },
  }),
];
