import {
  conceptStep,
  limitStep,
  makeAnchorMcq,
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
import type { Lesson, World } from '@/content/schema';

export const world: World = {
  id: 'a02',
  track: 'A',
  order: 2,
  title: 'Hutan HTML',
  tagline: t(
    'Tempel label pada setiap kardus isi halaman. Label membuat komputer mengerti isinya.',
    'Kamu bisa menyusun halaman HTML yang rapi dan bisa dibaca oleh pembaca layar.',
  ),
  color: '#2BA84A',
  illustration: 'a02-hutan-html',
  sourceChapters: ['J1-03'],
  requires: ['a01'],
  lessons: ['a02-l01', 'a02-l02', 'a02-l03', 'a02-l04', 'a02-l05'],
  sideQuests: [],
  boss: {
    title: 'Tantangan Penjaga Hutan HTML',
    greeting: t(
      'Selamat datang di Hutan HTML. Yuk, cek apakah label kardusmu sudah rapi.',
      'Uji dirimu pada tag HTML, HTML semantik, dan tiga aturan emasnya.',
    ),
    guardianName: 'Penjaga Hutan HTML',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'a02-anc-j1',
        prompt: t('Tag pembuka, isi, dan tag penutup bersama-sama namanya apa?'),
        choices: [
          { id: 'el', label: t('Elemen') },
          { id: 'css', label: t('Tag pembuka saja'), explainWrong: t('Tag pembuka hanya label di depan. Paket lengkapnya punya nama lain.') },
          { id: 'url', label: t('Isi tulisan saja'), explainWrong: t('Isi saja belum lengkap. Label depan dan belakang ikut dihitung.') },
        ],
        answer: 'el',
        explainCorrect: t('Ketiganya bersama membentuk satu elemen. Seperti kardus lengkap dengan isinya.'),
        tags: ['elemen'],
      }),
      makeAnchorMcq({
        id: 'a02-anc-j2',
        prompt: t('Kamu ingin membuat tombol "Simpan". Tag apa yang cocok?'),
        choices: [
          { id: 'btn', label: t('Tag untuk tombol') },
          { id: 'p', label: t('Tag untuk paragraf'), explainWrong: t('Tag paragraf hanya untuk tulisan. Tombol punya tag sendiri.') },
          { id: 'img', label: t('Tag untuk gambar'), explainWrong: t('Tag gambar hanya menampilkan foto. Tombol punya tag sendiri.') },
        ],
        answer: 'btn',
        explainCorrect: t('Tombol punya tag khusus. Tag itu dibuat untuk aksi seperti Simpan.'),
        tags: ['tag'],
      }),
      makeAnchorMcq({
        id: 'a02-anc-j3',
        prompt: t('Mengapa menu sebaiknya memakai tag khusus?'),
        choices: [
          { id: 'sem', label: t('Supaya komputer tahu tugas bagian itu') },
          { id: 'col', label: t('Supaya tampilannya otomatis jadi cantik'), explainWrong: t('Tag tidak mengatur warna. Warna diatur di tempat lain.') },
          { id: 'net', label: t('Supaya halaman terbuka lebih cepat'), explainWrong: t('Tag khusus tidak mempercepat halaman. Ia hanya memberi arti.') },
        ],
        answer: 'sem',
        explainCorrect: t('Tag khusus memberi tahu tugas setiap bagian. Seperti lemari yang berlabel nama.'),
        tags: ['semantik'],
      }),
      makeAnchorMcq({
        id: 'a02-anc-j4',
        prompt: t('Catatan teks apa yang wajib ada pada setiap gambar?'),
        choices: [
          { id: 'alt', label: t('Teks pengganti gambar') },
          { id: 'href', label: t('Alamat tujuan tautan'), explainWrong: t('Alamat tujuan dipakai pada tautan. Gambar butuh catatan lain.') },
          { id: 'h6', label: t('Judul yang paling kecil'), explainWrong: t('Judul kecil dipakai untuk subjudul. Gambar butuh teks yang bercerita.') },
        ],
        answer: 'alt',
        explainCorrect: t(
          'Teks alt menceritakan isi gambar. Pembaca layar membacakannya untuk orang yang tidak melihat gambar.',
          'Atribut alt menjelaskan isi gambar. Pembaca layar membacakannya untuk pengunjung yang tidak melihat gambar.',
        ),
        tags: ['alt-text'],
      }),
      makeAnchorMcq({
        id: 'a02-anc-j5',
        prompt: t('Berapa judul utama yang sebaiknya ada di satu halaman?'),
        choices: [
          { id: 'one', label: t('Cukup 1 judul utama') },
          { id: 'ten', label: t('Satu untuk setiap paragraf'), explainWrong: t('Judul utama itu hanya satu. Bagian lain memakai subjudul.') },
          { id: 'zero', label: t('Dua, atas dan bawah'), explainWrong: t('Judul utama hanya satu, bukan dua. Seperti judul di sampul buku.') },
        ],
        answer: 'one',
        explainCorrect: t('Satu judul utama sudah cukup. Seperti satu judul di sampul buku.'),
        tags: ['tag'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a02-anc-p1',
        prompt: t('Pada <a href="/promo">Lihat Promo</a>, bagian href="/promo" disebut apa?'),
        choices: [
          { id: 'attr', label: t('Atribut') },
          { id: 'close', label: t('Tag penutup'), explainWrong: t('Tag penutup memakai garis miring, misalnya </a>. Bagian href tidak punya garis miring.') },
          { id: 'body', label: t('Isi elemen'), explainWrong: t('Isi elemen adalah teks di antara dua tag, yaitu "Lihat Promo". Bagian href ada di tag pembuka.') },
        ],
        answer: 'attr',
        explainCorrect: t('Atribut menambah keterangan di tag pembuka, ditulis sebagai nama="nilai".'),
        tags: ['atribut'],
      }),
      makeAnchorMcq({
        id: 'a02-anc-p2',
        prompt: t('Bagian mana dari kerangka HTML5 yang berisi keterangan untuk browser dan tidak tampil di layar?'),
        choices: [
          { id: 'head', label: t('<head>') },
          { id: 'body', label: t('<body>'), explainWrong: t('<body> berisi yang tampil di layar, seperti teks dan gambar.') },
          { id: 'main', label: t('<main>'), explainWrong: t('<main> ada di dalam <body>, jadi isinya tampil di layar.') },
        ],
        answer: 'head',
        explainCorrect: t('<head> menyimpan keterangan dokumen, misalnya judul tab dan file stylesheet.'),
        tags: ['doctype'],
      }),
      makeAnchorMcq({
        id: 'a02-anc-p3',
        prompt: t('Mengapa <img> tidak butuh tag penutup </img>?'),
        choices: [
          { id: 'void', label: t('Elemen kosong tidak membungkus isi, hanya membawa atribut') },
          { id: 'bug', label: t('Browser menambahkan tag penutupnya sendiri'), explainWrong: t('Browser tidak menambah penutup untuk <img>. Elemen ini memang tidak memakainya.') },
          { id: 'css', label: t('Penutupnya sudah ada di dalam atribut src'), explainWrong: t('Atribut src hanya berisi alamat gambar. Ia bukan tag penutup.') },
        ],
        answer: 'void',
        explainCorrect: t('Elemen seperti <img> tidak membungkus teks. Jadi tidak ada isi yang perlu ditutup.'),
        tags: ['tag'],
      }),
      makeAnchorMcq({
        id: 'a02-anc-p4',
        prompt: t('Pengunjung perlu pindah ke halaman kontak. Elemen mana yang paling tepat?'),
        choices: [
          { id: 'a', label: t('<a href="/kontak">Kontak</a>') },
          { id: 'btn', label: t('<button>Kontak</button>'), explainWrong: t('<button> menjalankan aksi di halaman, bukan pindah alamat. Untuk pindah halaman, pakai tautan.') },
          { id: 'div', label: t('<div onclick="...">Kontak</div>'), explainWrong: t('<div> tidak punya arti tautan. Keyboard dan pembaca layar tidak mengenalinya sebagai tautan.') },
        ],
        answer: 'a',
        explainCorrect: t('<a> membawa pengunjung ke alamat lain. <button> dipakai untuk aksi di dalam halaman.'),
        tags: ['semantik'],
      }),
      makeAnchorMcq({
        id: 'a02-anc-p5',
        prompt: t('Gambar hiasan murni tidak perlu dibacakan pembaca layar. Nilai alt apa yang dianjurkan?'),
        choices: [
          { id: 'empty', label: t('alt="" (teks kosong)') },
          { id: 'omit', label: t('Hapus atribut alt sama sekali'), explainWrong: t('Tanpa atribut alt, sebagian pembaca layar membacakan nama file gambar.') },
          { id: 'long', label: t('alt berisi deskripsi panjang tiap garis'), explainWrong: t('Deskripsi panjang untuk hiasan hanya mengganggu. Pembaca layar membacakannya setiap kali.') },
        ],
        answer: 'empty',
        explainCorrect: t('alt="" memberi tahu pembaca layar agar melewati gambar hiasan.'),
        tags: ['alt-text'],
      }),
      makeAnchorMcq({
        id: 'a02-anc-p6',
        type: 'limit',
        analogy: t('Tag HTML seperti label kardus pindahan'),
        prompt: t('Apa batas analogi label kardus untuk tag HTML?'),
        choices: [
          { id: 'nest', label: t('Browser bertindak atas atribut seperti href') },
          { id: 'name', label: t('Label membantu mengenali isi di dalamnya'), explainWrong: t('Itu justru kemiripan. Batas analogi adalah hal yang berbeda.') },
          { id: 'keep', label: t('Barang di dalam kardus tetap menjadi isinya'), explainWrong: t('Itu juga kemiripan. Kardus kertas tidak memberi perintah.') },
        ],
        answer: 'nest',
        explainCorrect: t('Label kardus hanya dibaca orang. Browser bertindak atas atribut, misalnya membuka alamat di href.'),
        tags: ['tag', 'elemen'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'a02-l01',
    worldId: 'a02',
    title: 'Tag itu label kardus',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menunjuk tag pembuka, isi, dan tag penutup.',
      'Kamu bisa mengenali tag pembuka, atribut, isi, dan tag penutup dalam satu elemen HTML.',
    ),
    estMinutes: 6,
    introducesTerms: ['tag', 'elemen'],
    usesTerms: ['html', 'browser'],
    atWork: 'Kamu akan membaca tag dan atribut di DevTools saat tombol di halaman tidak berfungsi.',
    stickerId: 'label-kardus',
    warmupFrom: 'a01-l06',
    steps: [
      storyStep('a02/label-kardus.svg', [
        rText(
          'Kamu pindahan rumah. Kamu menempel label "Buku" atau "Piring" di setiap kardus. Bagaimana orang tahu isinya tanpa membuka kardus?',
          'Halaman Toko Rani menampilkan judul, gambar, dan tombol "Beli". Browser tahu mana judul dan mana tombol dari tag, yaitu label yang ditulis di antara tanda kurung sudut.',
        ),
      ]),
      conceptStep({
        title: t('Label depan dan label belakang', 'Tag pembuka dan tag penutup'),
        visualName: 'HtmlTreeDiagram',
        visualProps: { worldId: 'a02', topic: 'tag-html' },
        alt: t(
          'Contoh satu elemen dengan tag pembuka, isi teks, dan tag penutup.',
          'Elemen <a> dengan tag pembuka, atribut href, isi teks, dan tag penutup.',
        ),
        code: {
          lang: 'html',
          code: '<a href="/promo">Lihat Promo</a>',
          highlight: [1],
        },
        body: [
          rTerm('tag', 'Tag', 'Tag'),
          rText(
            ' adalah label yang menandai isi halaman web. Tag pembuka ada di depan isi, dan tag penutup di belakangnya. Tag paragraf, misalnya, ditulis ',
            ' adalah label yang menandai jenis isi sebuah elemen. Tag pembuka ditulis dengan ',
          ),
          rCode('<nama>', ['pro']),
          rPro(', dan tag penutup memakai garis miring: '),
          rCode('</nama>', ['pro']),
          rPro('.'),
          rCode('<p>', ['junior']),
          rJunior('.'),
        ],
      }),
      simStep(
        'rak-label-html',
        t(
          'Tempelkan label tag yang pas pada setiap bagian halaman.',
          'Pasangkan tag HTML ke bagian halaman tiruan di simulator.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a02-l01-q1',
          type: 'analogy',
          prompt: t(
            'Label "Buku" ditempel di kardus. Di halaman web, apa yang mirip label itu?',
            'Dalam analogi kardus pindahan, label "Buku" mirip apa di HTML?',
          ),
          choices: [
            {
              id: 'tag',
              label: t('Tag penanda isi', 'Tag HTML'),
            },
            {
              id: 'js',
              label: t('Isi tulisan halaman', 'Isi teks di dalam elemen'),
              explainWrong: t(
                'Isi tulisan adalah barang di dalam kardus. Labelnya ada di luar.',
                'Isi teks adalah barang di dalam kardus. Labelnya adalah tag di sekelilingnya.',
              ),
            },
            {
              id: 'dns',
              label: t('Warna latar halaman', 'Aturan tampilan CSS'),
              explainWrong: t(
                'Warna bukan label. Label hanya menamai isi kardus.',
                'CSS mengatur tampilan, bukan jenis isi. Jenis isi ditandai oleh tag.',
              ),
            },
          ],
          answer: 'tag',
          explainCorrect: t(
            'Tag menandai jenis isi, seperti label "Buku" di kardus. Komputer membaca label itu untuk tahu isinya.',
            'Tag menandai jenis isi, seperti label pada kardus. Browser memakainya untuk menentukan cara menampilkan isi.',
          ),
          hints: [t('Ingat label apa yang kamu tempel di kardus.', 'Cari bagian yang menamai isi, bukan isinya.')],
          tags: ['tag'],
        }),
      ),
      conceptStep({
        title: t('Satu paket disebut elemen', 'Atribut dan elemen'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a02', topic: 'atribut-elemen' },
        alt: t(
          'Tag pembuka, isi, dan tag penutup menyatu menjadi satu elemen.',
          'Tag pembuka, atribut, isi, dan tag penutup menyatu menjadi satu elemen.',
        ),
        body: [
          rTerm('elemen', 'Elemen', 'Elemen'),
          rText(
            ' adalah satu paket lengkap: tag pembuka, isi, dan tag penutup. Seperti kardus utuh dengan label depan dan belakang.',
            ' adalah satu unit HTML lengkap: tag pembuka, isi, dan tag penutup. Tag pembuka bisa membawa atribut, yaitu keterangan tambahan seperti ',
          ),
          rCode('href="/promo"', ['pro']),
          rPro('.'),
        ],
      }),
      limitStep({
        analogy: t('Tag seperti label kardus pindahan'),
        same: [
          t(
            'Sama-sama menamai isi supaya langsung dikenali.',
            'Keduanya menamai isi supaya langsung dikenali pembaca atau browser.',
          ),
        ],
        different: [
          t(
            'Label HTML menyuruh komputer bekerja. Label kardus hanya dibaca orang.',
            'Browser bertindak atas tag dan atribut, misalnya membuka alamat di href. Label kardus hanya dibaca orang.',
          ),
        ],
        riskyAnalogy: true,
      }),
      qStep(
        makeMcq({
          id: 'a02-l01-q2',
          prompt: t(
            'Satu kardus berisi label depan, barang, dan label belakang. Di HTML, paket lengkap itu disebut apa?',
            'Gabungan <p>, teks isinya, dan </p> disebut apa?',
          ),
          choices: [
            { id: 'el', label: t('Elemen') },
            {
              id: 'att',
              label: t('Tag pembuka saja', 'Atribut'),
              explainWrong: t(
                'Tag pembuka hanya label di depan. Paket lengkapnya punya nama lain.',
                'Atribut adalah keterangan tambahan di tag pembuka, bukan seluruh paket.',
              ),
            },
            {
              id: 'url',
              label: t('Isi tulisan saja', 'Tag'),
              explainWrong: t(
                'Isi saja belum lengkap. Label depan dan belakang ikut dihitung.',
                'Tag hanya penandanya, yaitu <p> atau </p>. Elemen mencakup isinya juga.',
              ),
            },
          ],
          answer: 'el',
          explainCorrect: t(
            'Label depan, isi, dan label belakang membentuk satu elemen. Seperti kardus lengkap dengan isinya.',
            'Tag pembuka, isi, dan tag penutup membentuk satu elemen HTML. Contohnya <p>Halo</p> adalah satu elemen paragraf.',
          ),
          hints: [t('Ingat satu kardus utuh, bukan labelnya saja.', 'Hitung semua bagian dari pembuka sampai penutup.')],
          tags: ['elemen'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a02-l01-q3',
          modes: ['pro'],
          prompt: t('Penulisan tag penutup paragraf mana yang benar?'),
          choices: [
            { id: 'ok', label: t('</p>') },
            {
              id: 'bad1',
              label: t('<p/>'),
              explainWrong: t('Garis miring di akhir bukan penutup HTML biasa. Letakkan garis miring sebelum nama tag.'),
            },
            { id: 'bad2', label: t('<p>'), explainWrong: t('<p> adalah tag pembuka, bukan penutup.') },
          ],
          answer: 'ok',
          explainCorrect: t('Garis miring ditulis tepat sebelum nama tag, yaitu </p>.'),
          tags: ['tag'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a02-l01-q3j',
          type: 'scenario',
          modes: ['junior'],
          story: t(
            'Bu Laras menempel label "Mulai" di depan kardus. Setelah kardus penuh, ia menempel label lain di belakang.',
            'Bu Laras menempel label "Mulai" di depan kardus, lalu label penutup di belakang setelah kardus penuh.',
          ),
          prompt: t('Label di belakang kardus itu mirip tag apa?'),
          choices: [
            { id: 'close', label: t('Tag penutup') },
            { id: 'open', label: t('Tag pembuka'), explainWrong: t('Tag pembuka ada di depan isi. Label belakang adalah yang lain.') },
            { id: 'item', label: t('Isi di dalamnya'), explainWrong: t('Isi adalah barang di dalam kardus. Label belakang ada di luar isi.') },
          ],
          answer: 'close',
          explainCorrect: t('Label belakang menandai akhir kardus. Di HTML, itu namanya tag penutup.'),
          hints: [t('Ingat di mana label itu ditempel.')],
          tags: ['tag'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a02-l01-q4',
          type: 'limit',
          analogy: t('Tag seperti label kardus'),
          prompt: t(
            'Apa yang hanya bisa dilakukan label HTML?',
            'Sifat elemen HTML mana yang tidak dimiliki kardus kertas biasa?',
          ),
          choices: [
            {
              id: 'act',
              label: t('Menyuruh komputer bekerja', 'Atribut href mengubah perilaku elemen'),
            },
            {
              id: 'name',
              label: t('Memberi tahu jenis isinya', 'Memberi tahu jenis isi di dalamnya'),
              explainWrong: t(
                'Label kardus juga menamai isinya. Itu kemiripannya.',
                'Itu kemiripannya: kardus kertas juga menamai isi.',
              ),
            },
            {
              id: 'wrap',
              label: t('Menempel di luar isinya', 'Membungkus isi supaya tetap rapi dan teratur'),
              explainWrong: t(
                'Label kardus juga menempel di luar isinya. Itu kemiripannya.',
                'Itu kemiripannya: kardus kertas juga membungkus isi.',
              ),
            },
          ],
          answer: 'act',
          explainCorrect: t(
            'Komputer membaca label HTML, lalu mengerjakannya. Label kardus hanya dibaca orang.',
            'Browser membaca tag dan atribut sebagai perintah aktif. Kardus kertas tidak bisa memberi perintah.',
          ),
          hints: [t('Ingat siapa yang membaca label HTML.', 'Cari hal yang browser kerjakan, tetapi kardus tidak.')],
          tags: ['atribut', 'elemen'],
        }),
      ),
      qStep({
        id: 'a02-l01-q5',
        type: 'spotbug',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Ketuk baris HTML yang tag penutupnya salah tulis.'),
        lines: [
          '<h1>Toko Rani</h1>',
          '<p>Selamat datang di toko kami.<p>',
          '<a href="/produk">Lihat Produk</a>',
        ],
        answer: [2],
        explainCorrect: t('Baris 2 diakhiri <p> lagi. Tag penutup harus </p>, dengan garis miring.'),
        hints: [t('Bandingkan tag penutup tiap baris dengan tag pembukanya.'), undefined],
        tags: ['tag'],
      }),
      qStep(
        makeMcq({
          id: 'a02-l01-q5j',
          type: 'scenario',
          modes: ['junior'],
          difficulty: 2,
          story: t(
            'Bito menempel label "Piring" di depan kardus. Ia lupa menempel label di belakang.',
            'Bito menempel label "Piring" di depan kardus, tetapi lupa menempel label di belakangnya.',
          ),
          prompt: t('Apa yang kurang pada elemen HTML itu?'),
          choices: [
            { id: 'close', label: t('Tag penutup') },
            { id: 'open', label: t('Tag pembuka'), explainWrong: t('Label depan sudah ada. Yang hilang ada di belakang.') },
            { id: 'item', label: t('Isi kardus'), explainWrong: t('Isi kardus tidak disebut hilang. Yang hilang adalah labelnya.') },
          ],
          answer: 'close',
          explainCorrect: t('Label belakang tidak ada. Elemen lengkap butuh tag penutup di belakang isi.'),
          hints: [t('Periksa bagian belakang kardus.')],
          tags: ['tag', 'elemen'],
        }),
      ),
      qStep({
        id: 'a02-l01-q6',
        type: 'fill',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Lengkapi atribut tujuan tautan menuju /kontak.'),
        template: '<a ___="/kontak">Hubungi Kami</a>',
        bank: ['href', 'src', 'alt'],
        answer: ['href'],
        explainCorrect: t('Tautan <a> memakai atribut href untuk menyimpan alamat tujuan.'),
        hints: [t('Cari atribut yang menyimpan alamat tujuan.'), undefined],
        tags: ['atribut'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a02-l01-r1',
        prompt: t(
          'Label "Piring" menunjukkan apa tentang sebuah kardus?',
          'Pada <img src="kue.png" alt="Kue bolu">, src="kue.png" disebut apa?',
        ),
        choices: [
          { id: 'a', label: t('Jenis isinya', 'Atribut') },
          {
            id: 'b',
            label: t('Ukuran kardusnya', 'Isi elemen'),
            explainWrong: t(
              'Label tidak memberi tahu ukuran. Label hanya menamai isi.',
              'Isi elemen adalah teks di antara dua tag. src ada di dalam tag pembuka.',
            ),
          },
          {
            id: 'c',
            label: t('Warna kardusnya', 'Tag penutup'),
            explainWrong: t(
              'Label tidak memberi tahu warna. Label hanya menamai isi.',
              'Tag penutup memakai garis miring, misalnya </p>. <img> bahkan tidak punya tag penutup.',
            ),
          },
        ],
        answer: 'a',
        explainCorrect: t(
          'Label menandai jenis isi. Tag di HTML bekerja dengan cara yang sama.',
          'Pasangan nama="nilai" di dalam tag pembuka disebut atribut.',
        ),
        hints: [t('Ingat label "Buku" dan "Piring" di kardus.', 'Lihat bagian dalam tag pembuka.')],
        tags: ['tag', 'atribut'],
      }),
      makeTf({
        id: 'a02-l01-r2',
        prompt: t(
          'Satu paket kardus utuh punya label depan, isi, dan label belakang.',
          '<img> tidak punya tag penutup karena tidak membungkus isi.',
        ),
        answer: true,
        explainCorrect: t(
          'Elemen utuh punya tag pembuka, isi, dan tag penutup. Seperti kardus lengkap.',
          'Tag penutup menandai akhir isi. <img> tidak punya isi, hanya atribut seperti src dan alt.',
        ),
        explainWrong: t(
          'Elemen yang lengkap memang punya ketiganya. Satu label saja belum cukup.',
          '<img> adalah elemen kosong: tidak ada teks di antara dua tag. Jadi tidak ada yang perlu ditutup.',
        ),
        hints: [t('Ingat kardus lengkap dengan dua label.')],
        tags: ['elemen'],
      }),
    ],
    recap: t(
      'Tag menamai isi halaman, dan paket lengkapnya disebut elemen.',
      'Tag pembuka, isi, dan tag penutup membentuk satu elemen. Atribut di tag pembuka menambah keterangan.',
    ),
    companion: {
      talkPrompts: ['Di rumahmu, benda apa saja yang diberi label?'],
      offlineActivity: 'Tempel catatan kertas bertuliskan "Judul", "Isi", dan "Tombol" pada gambar majalah atau buku.',
    },
  }),

  makeLesson({
    id: 'a02-l02',
    worldId: 'a02',
    title: 'Kerangka wajib halaman',
    modes: ['pro'],
    objective: t('Kamu bisa menyusun kerangka dokumen HTML5: DOCTYPE, html, head, dan body.'),
    estMinutes: 5,
    introducesTerms: ['doctype'],
    usesTerms: ['tag', 'html', 'browser'],
    atWork: 'Kamu akan menambahkan meta viewport di head saat halaman tampil terlalu kecil di HP.',
    warmupFrom: 'a02-l01',
    steps: [
      storyStep('a02/kerangka-ktp.svg', [
        rText(
          'Halaman Toko Rani tampil berantakan di HP. Penyebabnya sering ada di kerangka dokumen, bukan di isinya.',
        ),
      ]),
      conceptStep({
        title: t('Baris pertama: DOCTYPE'),
        visualName: 'HtmlTreeDiagram',
        visualProps: { worldId: 'a02', topic: 'doctype-html' },
        alt: t('Struktur DOCTYPE, html, head, dan body.'),
        code: {
          lang: 'html',
          code: '<!DOCTYPE html>\n<html lang="id">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <title>Toko Rani</title>\n  </head>\n  <body>\n    <h1>Halo!</h1>\n  </body>\n</html>',
          highlight: [1, 3, 8],
        },
        body: [
          rTerm('doctype', 'DOCTYPE', 'DOCTYPE'),
          rText(' adalah baris pertama yang memberi tahu browser cara membaca halaman. Atribut '),
          rCode('lang="id"'),
          rText(' di tag '),
          rCode('<html>'),
          rText(' menandai bahasa isi halaman.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a02-l02-q2',
          prompt: t('Mengapa atribut lang="id" perlu dipasang di tag html?'),
          choices: [
            { id: 'lang', label: t('Pembaca layar tahu cara melafalkan teks') },
            {
              id: 'css',
              label: t('Browser menerjemahkan halaman secara otomatis'),
              explainWrong: t('Atribut lang tidak menerjemahkan apa pun. Ia hanya memberi label bahasa.'),
            },
            {
              id: 'net',
              label: t('Halaman dimuat lebih cepat di Indonesia'),
              explainWrong: t('Atribut lang tidak mengubah kecepatan muat. Ia hanya menandai bahasa halaman.'),
            },
          ],
          answer: 'lang',
          explainCorrect: t(
            'Pembaca layar memakai lang untuk memilih pelafalan yang tepat. Mesin pencari juga memakainya untuk mengenali bahasa halaman.',
          ),
          tags: ['doctype', 'atribut'],
        }),
      ),
      conceptStep({
        title: t('Head untuk browser, body untuk layar'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a02', topic: 'head-vs-body' },
        alt: t('Isi head menyimpan keterangan, isi body tampil di layar.'),
        body: [
          rCode('<head>'),
          rText(' menyimpan keterangan untuk browser, misalnya judul tab dan file CSS. '),
          rCode('<body>'),
          rText(' menampung semua yang tampil di layar pengunjung.'),
        ],
      }),
      limitStep({
        analogy: t('Head seperti KTP di saku, body seperti badan'),
        same: [t('Head menyimpan identitas halaman, dan body adalah yang terlihat pengunjung.')],
        different: [t('Judul <title> di dalam <head> tetap tampil di tab browser, walau bukan isi badan halaman.')],
        riskyAnalogy: false,
      }),
      simStep('rak-label-html', t('Pasangkan bagian head dan body ke tempat yang benar di simulator.')),
      qStep(
        makeMcq({
          id: 'a02-l02-q1',
          prompt: t('Di bagian mana tag <meta name="viewport"> dan <link rel="stylesheet"> harus ditaruh?'),
          choices: [
            { id: 'head', label: t('Di dalam <head>') },
            {
              id: 'body',
              label: t('Di dalam <main>'),
              explainWrong: t('<main> berisi isi yang tampil di layar. Pengaturan dokumen tidak ditaruh di sini.'),
            },
            {
              id: 'doc',
              label: t('Sebelum <!DOCTYPE html>'),
              explainWrong: t('<!DOCTYPE html> harus menjadi baris pertama. Tidak ada yang boleh di depannya.'),
            },
          ],
          answer: 'head',
          explainCorrect: t('Pengaturan dokumen dan file CSS berada di <head>. Browser membacanya sebelum menampilkan isi.'),
          tags: ['doctype'],
        }),
      ),
      qStep({
        id: 'a02-l02-q3',
        type: 'order',
        difficulty: 2,
        prompt: t('Urutkan kerangka dokumen HTML dari baris paling atas.'),
        items: [
          { id: 'o1', label: t('<!DOCTYPE html>') },
          { id: 'o2', label: t('<html lang="id">') },
          { id: 'o3', label: t('<head> ... </head>') },
          { id: 'o4', label: t('<body> ... </body>') },
        ],
        answer: ['o1', 'o2', 'o3', 'o4'],
        explainCorrect: t('Itu urutan standar berkas index.html: deklarasi dulu, lalu head, lalu body.'),
        hints: [t('Mulai dari baris yang menyatakan jenis dokumen.'), undefined],
        tags: ['doctype'],
      }),
      qStep(
        makeMcq({
          id: 'a02-l02-q4',
          type: 'limit',
          analogy: t('Head seperti KTP di saku'),
          prompt: t('Fakta mana yang menjadi pengecualian dari anggapan "head tidak pernah terlihat"?'),
          choices: [
            { id: 'tab', label: t('Judul <title> dan favicon terlihat di tab browser') },
            {
              id: 'meta',
              label: t('Tag <meta> tampil sebagai baris teks kecil'),
              explainWrong: t('Tag meta tidak tampil di halaman. Ia hanya memberi keterangan ke browser.'),
            },
            {
              id: 'link',
              label: t('Tag <link> tampil sebagai tautan di bagian atas halaman'),
              explainWrong: t('Tag link menghubungkan file CSS ke halaman. Ia tidak tampil sebagai tautan.'),
            },
          ],
          answer: 'tab',
          explainCorrect: t('<title> tampil di tab browser, walaupun ada di head. Jadi head tidak sepenuhnya tersembunyi.'),
          tags: ['doctype'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a02-l02-q5',
          prompt: t('Tag <script> sebaiknya ditaruh di akhir halaman atau diberi atribut defer, supaya isi tampil lebih dulu.'),
          answer: true,
          explainCorrect: t('Browser menampilkan HTML lebih dulu, lalu menjalankan skrip.'),
          explainWrong: t('Skrip di awal halaman membuat browser menunggu skrip selesai sebelum menampilkan isi.'),
          tags: ['doctype'],
        }),
      ),
      qStep({
        id: 'a02-l02-q6',
        type: 'spotbug',
        difficulty: 2,
        prompt: t('Ketuk baris yang menaruh paragraf di tempat yang salah.'),
        lines: [
          '<!DOCTYPE html>',
          '<head><title>Toko Rani</title><p>Promo Hari Ini</p></head>',
          '<body><h1>Selamat Datang</h1></body>',
        ],
        answer: [2],
        explainCorrect: t('Paragraf <p> ada di dalam <head>. Tempat yang benar adalah <body>.'),
        hints: [t('Periksa apa saja yang ada di dalam head.'), undefined],
        tags: ['doctype'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a02-l02-r1',
        prompt: t('Semua teks, gambar, dan tombol di layar ditulis di bagian mana?'),
        choices: [
          { id: 'body', label: t('Di dalam <body>') },
          { id: 'head', label: t('Di dalam <head>'), explainWrong: t('<head> hanya menyimpan keterangan untuk browser.') },
          {
            id: 'html',
            label: t('Di luar <html>'),
            explainWrong: t('Seluruh dokumen berada di dalam <html>. Tidak ada isi yang ditaruh di luarnya.'),
          },
        ],
        answer: 'body',
        explainCorrect: t('Seluruh isi yang terlihat di layar ditulis di dalam <body>.'),
        tags: ['doctype'],
      }),
      makeTf({
        id: 'a02-l02-r2',
        prompt: t('Baris DOCTYPE memberi tahu browser bahwa dokumen memakai standar modern.'),
        answer: true,
        explainCorrect: t('Tanpa DOCTYPE, browser bisa menampilkan halaman dengan aturan lama yang tidak terduga.'),
        explainWrong: t('DOCTYPE ditulis di baris pertama dan menyatakan jenis dokumen.'),
        tags: ['doctype'],
      }),
    ],
    recap: t('Dokumen HTML dibuka dengan DOCTYPE. Head menyimpan keterangan dokumen, dan body menampung semua yang tampil di layar.'),
  }),

  makeLesson({
    id: 'a02-l03',
    worldId: 'a02',
    title: 'Tag yang paling sering dipakai',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa memilih tag yang tepat untuk judul, paragraf, dan tombol.',
      'Kamu bisa memilih tag untuk judul, paragraf, gambar, tautan, tombol, daftar, dan formulir.',
    ),
    estMinutes: 6,
    introducesTerms: ['atribut'],
    usesTerms: ['tag', 'elemen'],
    atWork: 'Kamu akan memilih tag yang tepat untuk tombol, tautan, dan judul saat membuat halaman produk Toko Rani.',
    warmupFrom: 'a02-l01',
    steps: [
      storyStep('a02/perkakas-tag.svg', [
        rText(
          'Kotak pensilmu berisi alat dengan tugas masing-masing. Pensil menulis dan penghapus menghapus. Di web, tag mana yang paling sering dipakai?',
          'Halaman Toko Rani dibangun dari beberapa tag saja, walaupun HTML punya lebih dari seratus tag. Belasan tag inti sudah cukup untuk memulai sebagian besar halaman.',
        ),
      ]),
      conceptStep({
        title: t('Judul, paragraf, gambar, daftar', 'Teks dan media: judul, paragraf, gambar, daftar'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a02', topic: 'tag-teks-gambar' },
        alt: t('Daftar tag untuk judul, paragraf, gambar, dan daftar.', 'Daftar tag h1, p, img, ul, dan li.'),
        code: {
          lang: 'html',
          code: '<h1>Toko Rani</h1>\n<p>Sedia kue segar tiap pagi.</p>\n<img src="kue.jpg" alt="Kue bolu cokelat">',
        },
        body: [
          rJunior('Judul, paragraf, gambar, dan daftar masing-masing punya tag. Judul punya 6 tingkat: tingkat 1 paling penting, tingkat 6 paling rendah. Judul tingkat 1 ditulis '),
          rCode('<h1>', ['junior']),
          rJunior('.'),
          rPro('HTML punya tag berbeda untuk setiap jenis isi. Tag '),
          rCode('<h1>–<h6>', ['pro']),
          rPro(' untuk judul, '),
          rCode('<p>', ['pro']),
          rPro(' untuk paragraf, '),
          rCode('<img>', ['pro']),
          rPro(' untuk gambar, dan '),
          rCode('<ul>', ['pro']),
          rPro(' atau '),
          rCode('<ol>', ['pro']),
          rPro(' untuk daftar.'),
        ],
      }),
      simStep(
        'rak-label-html',
        t(
          'Tempelkan tag yang tepat pada setiap bagian halaman.',
          'Cocokkan bagian halaman dengan tag HTML yang tepat di simulator.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a02-l03-q2',
          prompt: t(
            'Daftar belanjaanmu memakai titik di depan setiap barang. Tag apa yang cocok?',
            'Tag mana yang membuat daftar berpoin, bukan bernomor?',
          ),
          choices: [
            { id: 'ul', label: t('Tag daftar bertitik', '<ul> bersama <li>') },
            {
              id: 'ol',
              label: t('Tag daftar bernomor', '<ol> bersama <li>'),
              explainWrong: t(
                'Tag bernomor memberi angka 1, 2, 3. Daftarmu memakai titik.',
                '<ol> (ordered list) membuat daftar bernomor, bukan berpoin.',
              ),
            },
            {
              id: 'p',
              label: t('Tag paragraf', '<li> saja'),
              explainWrong: t(
                'Tag paragraf hanya untuk tulisan biasa. Daftar punya tag sendiri.',
                'Butir <li> harus berada di dalam <ul> atau <ol>.',
              ),
            },
          ],
          answer: 'ul',
          explainCorrect: t(
            'Tag ini membuat titik di depan setiap barang. Cocok untuk daftar belanja.',
            '<ul> (unordered list) membuat daftar berpoin, dan setiap butirnya ditulis dengan <li>.',
          ),
          hints: [t('Lihat apa yang ada di depan tiap barang.', 'Perhatikan apakah butir daftar memakai nomor.')],
          tags: ['tag'],
        }),
      ),
      conceptStep({
        title: t('Tautan, tombol, dan kotak polos', 'Tautan, tombol, dan wadah'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a02', topic: 'tag-interaksi' },
        alt: t(
          'Perbedaan tag tautan, tag tombol, dan kotak polos besar atau kecil.',
          'Perbedaan tag tautan <a>, tombol <button>, dan wadah div atau span.',
        ),
        body: [
          rTerm('atribut', 'Atribut', 'Atribut'),
          rText(
            ' adalah catatan tambahan di dalam tag pembuka. Tautan memakai atribut untuk alamat tujuan, dan tombol menjalankan aksi. Kotak polos besar membungkus satu bagian, yang kecil satu kata.',
            ' adalah keterangan tambahan di dalam tag pembuka. Tag ',
          ),
          rCode('<a>', ['pro']),
          rPro(' membawa pengunjung ke halaman lain lewat atribut '),
          rCode('href', ['pro']),
          rPro(', tag '),
          rCode('<button>', ['pro']),
          rPro(' menjalankan aksi, dan '),
          rCode('<div>', ['pro']),
          rPro(' serta '),
          rCode('<span>', ['pro']),
          rPro(' menjadi wadah.'),
        ],
      }),
      limitStep({
        analogy: t('Kotak polos dan kotak khusus', '<div> seperti kardus polos serbaguna'),
        same: [
          t(
            'Kotak polos mengelompokkan beberapa barang sekaligus.',
            '<div> mengelompokkan beberapa elemen sekaligus, seperti kardus polos.',
          ),
        ],
        different: [
          t(
            'Kotak polos tidak memberi tahu apa tugas isinya.',
            'Jangan memakai <div> untuk tombol atau judul: pembaca layar tidak tahu fungsinya.',
          ),
        ],
        riskyAnalogy: true,
      }),
      qStep({
        id: 'a02-l03-q1',
        type: 'match',
        difficulty: 1,
        prompt: t('Pasangkan setiap bagian halaman dengan tag yang cocok.', 'Pasangkan tag HTML dengan fungsinya.'),
        left: [
          { id: 't1', label: t('Nama toko di atas halaman', '<h1>') },
          { id: 't2', label: t('Cerita tentang kue di toko', '<p>') },
          { id: 't3', label: t('Tulisan untuk pindah ke halaman lain', '<a href="...">') },
          { id: 't4', label: t('Tulisan "Simpan" di formulir', '<button>') },
        ],
        right: [
          { id: 'f1', label: t('Tag judul', 'Judul paling penting') },
          { id: 'f2', label: t('Tag paragraf', 'Paragraf tulisan') },
          { id: 'f3', label: t('Tag tautan', 'Tautan ke halaman lain') },
          { id: 'f4', label: t('Tag tombol', 'Tombol melakukan aksi') },
        ],
        answer: { t1: 'f1', t2: 'f2', t3: 'f3', t4: 'f4' },
        explainCorrect: t(
          'Judul, paragraf, tautan, dan tombol masing-masing punya tag sendiri. Seperti alat di kotak pensil.',
          'Empat tag ini dipakai di hampir setiap halaman: judul, paragraf, tautan, dan tombol.',
        ),
        hints: [t('Tanya dulu: apa tugas tulisan itu di halaman?', 'Cocokkan fungsi tiap tag dengan bentuk isinya.'), undefined],
        tags: ['tag'],
      }),
      qStep(
        makeMcq({
          id: 'a02-l03-q3',
          prompt: t(
            'Apa beda kotak polos besar dan kotak polos kecil?',
            'Apa beda kegunaan <div> dan <span>?',
          ),
          choices: [
            {
              id: 'blk',
              label: t('Besar untuk bagian, kecil untuk kata', '<div> untuk blok, <span> untuk potongan teks'),
            },
            {
              id: 'img',
              label: t('Besar untuk tulisan, kecil untuk gambar', '<div> untuk teks, <span> untuk gambar kecil'),
              explainWrong: t(
                'Gambar punya tag sendiri. Kotak polos hanya membungkus.',
                'Gambar memakai <img>. <span> tidak dikhususkan untuk gambar.',
              ),
            },
            {
              id: 'h1',
              label: t('Besar untuk judul, kecil untuk tombol', '<div> untuk judul, <span> untuk tombol kecil'),
              explainWrong: t(
                'Judul dan tombol punya tag sendiri. Kotak polos hanya membungkus.',
                'Judul memakai <h1> dan tombol memakai <button>. <div> dan <span> hanya wadah.',
              ),
            },
          ],
          answer: 'blk',
          explainCorrect: t(
            'Kotak besar membungkus satu bagian halaman. Kotak kecil membungkus satu kata di dalam kalimat.',
            '<span> membungkus potongan teks di tengah kalimat tanpa memutus baris, tetapi <div> memulai baris baru.',
          ),
          hints: [t('Baca lagi kartu tentang kotak polos.', 'Bandingkan ukuran isi yang dibungkus keduanya.')],
          tags: ['tag'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a02-l03-q4',
          type: 'limit',
          analogy: t('Kotak polos serbaguna', '<div> sebagai kardus polos serbaguna'),
          prompt: t(
            'Kamu perlu tombol Simpan. Mengapa kotak polos kurang cocok?',
            'Mengapa <div> tidak boleh menggantikan <button>?',
          ),
          choices: [
            {
              id: 'a11y',
              label: t('Kotak polos tidak memberi tahu itu tombol', '<div> tidak dikenali keyboard sebagai tombol'),
            },
            {
              id: 'col',
              label: t('Kotak polos tidak bisa diberi warna', '<div> tidak bisa diberi warna atau ukuran CSS'),
              explainWrong: t(
                'Kotak polos tetap bisa diberi warna. Masalahnya ada pada artinya.',
                '<div> tetap bisa diberi CSS. Masalahnya ada pada artinya.',
              ),
            },
            {
              id: 'tag',
              label: t('Kotak polos terlalu besar untuk tombol', '<div> tidak punya tag penutup'),
              explainWrong: t(
                'Ukuran bisa diatur. Masalahnya, kotak polos tidak punya arti tombol.',
                '<div> punya tag penutup </div>. Masalahnya ada pada artinya.',
              ),
            },
          ],
          answer: 'a11y',
          explainCorrect: t(
            'Tag tombol memberi tahu komputer bahwa itu tombol. Kotak polos tidak memberi tanda apa pun.',
            '<button> otomatis bisa ditekan dengan Enter atau Spasi, dan pembaca layar mengenalinya sebagai tombol.',
          ),
          hints: [t('Bayangkan kardus tanpa label. Apa isinya?', 'Coba tekan Tab dan Enter tanpa mouse.')],
          tags: ['tag'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a02-l03-q5',
          prompt: t(
            'Judul tingkat 6 adalah judul yang paling penting.',
            'Tag <h6> menandai judul yang lebih penting daripada <h1>.',
          ),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru: tingkat 1 yang paling penting. Tingkat 6 adalah tingkat paling rendah.',
            'Pernyataan itu keliru: tingkat judul turun dari <h1> (paling penting) sampai <h6> (paling rendah).',
          ),
          explainWrong: t(
            'Judul paling penting ada di tingkat 1. Tingkat 6 adalah tingkat paling rendah.',
            'Makin kecil angkanya, makin tinggi tingkat judul. Jadi <h1> yang paling penting.',
          ),
          hints: [t('Ingat judul yang punya 6 tingkat.')],
          tags: ['tag'],
        }),
      ),
      qStep({
        id: 'a02-l03-q6',
        type: 'fill',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Lengkapi atribut agar kolom input ini menerima email.'),
        template: '<form><input ___="email"></form>',
        bank: ['type', 'href', 'alt'],
        answer: ['type'],
        explainCorrect: t('Atribut type="email" membuat browser memeriksa format email dan menampilkan keyboard dengan tombol @ di HP.'),
        hints: [t('Atribut ini menentukan jenis kolom isian.'), undefined],
        tags: ['atribut'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a02-l03-r1',
        prompt: t(
          'Kamu ingin daftar dengan nomor 1, 2, 3. Tag apa yang cocok?',
          'Tag mana yang membuat daftar bernomor 1, 2, 3?',
        ),
        choices: [
          { id: 'ol', label: t('Tag daftar bernomor', '<ol>') },
          {
            id: 'ul',
            label: t('Tag daftar bertitik', '<ul>'),
            explainWrong: t('Tag bertitik memakai bulatan, bukan angka.', '<ul> menghasilkan poin bulat, bukan nomor urut.'),
          },
          {
            id: 'p',
            label: t('Tag paragraf', '<p>'),
            explainWrong: t('Tag paragraf untuk tulisan biasa, bukan daftar.', '<p> membuat satu paragraf teks, bukan daftar.'),
          },
        ],
        answer: 'ol',
        explainCorrect: t(
          'Tag ini memberi nomor otomatis di depan tiap barang.',
          '<ol> (ordered list) memberi nomor urut otomatis pada setiap butir.',
        ),
        hints: [t('Bayangkan daftar lomba dengan peringkat 1, 2, 3.')],
        tags: ['tag'],
      }),
      makeMcq({
        id: 'a02-l03-r2',
        prompt: t(
          'Kamu ingin membungkus satu kata di tengah kalimat. Kotak mana yang cocok?',
          'Tag mana yang membungkus satu kata di tengah kalimat?',
        ),
        choices: [
          { id: 'span', label: t('Kotak polos kecil', '<span>') },
          {
            id: 'img',
            label: t('Tag tautan', '<img>'),
            explainWrong: t('Tag tautan membawa kamu pindah halaman. Ia bukan pembungkus biasa.', '<img> hanya untuk menampilkan gambar.'),
          },
          {
            id: 'div',
            label: t('Kotak polos besar', '<div>'),
            explainWrong: t('Kotak besar membungkus satu bagian halaman, bukan satu kata.', '<div> membungkus satu blok dan memulai baris baru.'),
          },
        ],
        answer: 'span',
        explainCorrect: t(
          'Kotak kecil membungkus satu kata, dan kalimat tetap menyambung.',
          '<span> membungkus potongan teks kecil tanpa memutus baris.',
        ),
        hints: [t('Ingat ukuran bungkus: satu bagian atau satu kata.')],
        tags: ['tag'],
      }),
    ],
    recap: t(
      'Tiap isi halaman punya tag: judul, paragraf, tautan, tombol, dan gambar.',
      'Pakai <h1>–<h6> untuk judul, <p> paragraf, <a> tautan, <button> tombol, <img> gambar, dan <ul> atau <ol> daftar.',
    ),
    companion: {
      talkPrompts: ['Di berita yang kamu baca, mana judul dan paragrafnya?'],
      offlineActivity: 'Beri label tag HTML pada potongan halaman koran atau brosur.',
    },
  }),

  makeLesson({
    id: 'a02-l04',
    worldId: 'a02',
    title: 'Tag yang punya arti',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menunjuk bagian atas, menu, isi utama, dan kaki halaman.',
      'Kamu bisa menyusun kerangka halaman dengan HTML semantik dan menyebutkan tiga manfaatnya.',
    ),
    estMinutes: 6,
    introducesTerms: ['semantik'],
    usesTerms: ['tag', 'elemen', 'browser'],
    atWork: 'Kamu akan mengganti <div> menjadi <nav> dan <main> setelah audit menemukan halaman sulit dinavigasi pembaca layar.',
    stickerId: 'pohon-berlabel',
    warmupFrom: 'a02-l03',
    steps: [
      storyStep('a02/pohon-berlabel.svg', [
        rText(
          'Semua lemari di kelas berlabel sama: "Kotak". Kamu jadi sulit mencari penghapus. Label seperti apa yang lebih baik?',
          'Halaman lama membungkus semua bagian dengan <div> tanpa makna. Pembaca layar tidak tahu mana menu dan mana isi utama.',
        ),
      ]),
      conceptStep({
        title: t('Tag untuk bagian halaman', 'Header, nav, main, footer'),
        visualName: 'HtmlTreeDiagram',
        visualProps: { worldId: 'a02', topic: 'semantik-halaman' },
        alt: t(
          'Susunan bagian atas, menu, isi utama, dan kaki halaman.',
          'Susunan header, nav, main, article, aside, dan footer.',
        ),
        body: [
          rTerm('semantik', 'Tag semantik', 'HTML semantik'),
          rText(
            ' adalah tag yang punya arti jelas. Halaman punya bagian atas, menu, isi utama, dan kaki. Tag menu ditulis ',
            ' adalah penggunaan tag yang menjelaskan peran isinya: ',
          ),
          rCode('<header>', ['pro']),
          rPro(' (bagian atas), '),
          rCode('<nav>', ['pro']),
          rPro(' (menu), '),
          rCode('<main>', ['pro']),
          rPro(' (isi utama), dan '),
          rCode('<footer>', ['pro']),
          rPro(' (kaki halaman).'),
          rCode('<nav>', ['junior']),
          rJunior('.'),
        ],
      }),
      simStep(
        'rak-label-html',
        t(
          'Tempelkan label atas, menu, isi, dan kaki ke halaman.',
          'Susun ulang tata letak semantik di simulator Rak Label HTML.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a02-l04-q2',
          prompt: t(
            'Kamu ingin membungkus menu halaman. Tag mana yang cocok?',
            'Tag semantik mana yang membungkus menu tautan navigasi?',
          ),
          choices: [
            { id: 'nav', label: t('Tag menu', '<nav>') },
            {
              id: 'aside',
              label: t('Tag isi utama', '<aside>'),
              explainWrong: t(
                'Tag isi utama membungkus cerita utama. Menu punya tag sendiri.',
                '<aside> untuk info sampingan, bukan menu utama.',
              ),
            },
            {
              id: 'footer',
              label: t('Tag kaki halaman', '<footer>'),
              explainWrong: t(
                'Tag kaki ada di paling bawah. Menu punya tag sendiri.',
                '<footer> ada di bagian paling bawah untuk info penutup.',
              ),
            },
          ],
          answer: 'nav',
          explainCorrect: t(
            'Menu halaman punya tag sendiri. Seperti lemari berlabel khusus untuk menu.',
            '<nav> adalah penanda khusus untuk kumpulan tautan navigasi utama.',
          ),
          hints: [t('Ingat lemari kelas yang berlabel jelas.')],
          tags: ['semantik'],
        }),
      ),
      conceptStep({
        title: t('Tiga manfaat tag semantik', 'Mengapa memakai tag semantik?'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a02', topic: 'manfaat-semantik' },
        alt: t(
          'Tiga manfaat: pembaca layar, mesin pencari, dan kode mudah dibaca tim.',
          'Tiga manfaat: pembaca layar, mesin pencari, dan kode mudah dibaca tim.',
        ),
        body: [
          rText(
            'Pembaca layar adalah alat yang membacakan halaman dengan suara. Tag semantik membantu alat itu melompat ke isi utama. Mesin pencari dan teman satu tim juga lebih mudah paham.',
            'Tag semantik punya tiga manfaat. Pembaca layar (alat yang membacakan halaman) bisa langsung melompat ke isi utama. Mesin pencari memahami peran tiap bagian, dan tim lebih mudah membaca kode.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Lemari berlabel jelas dan kardus polos'),
        same: [
          t(
            'Label yang jelas membuat siapa pun mudah menemukan isinya.',
            'Nama yang bermakna memudahkan siapa pun menavigasi halaman.',
          ),
        ],
        different: [
          t(
            'Tag baru tidak mengubah warna dan tata letak.',
            'Tag semantik tidak otomatis mengubah warna atau tata letak. Kamu tetap perlu CSS.',
          ),
        ],
        riskyAnalogy: true,
      }),
      qStep({
        id: 'a02-l04-q1',
        type: 'sort',
        prompt: t('Kelompokkan isi halaman ke bagian yang tepat.', 'Kelompokkan isi halaman ke tag semantik yang tepat.'),
        difficulty: 2,
        items: [
          { id: 's1', label: t('Menu: Beranda, Produk, Kontak', 'Menu Beranda · Produk · Kontak') },
          { id: 's2', label: t('Cerita utama yang sedang dibaca', 'Artikel utama yang sedang dibaca') },
          { id: 's3', label: t('Catatan hak cipta di paling bawah', 'Catatan hak cipta di paling bawah') },
          { id: 's4', label: t('Logo dan nama situs di atas', 'Logo dan nama situs di atas') },
        ],
        bins: [
          { id: 'headnav', label: t('Bagian atas', '<header> / <nav>'), icon: 'layout-dashboard' },
          { id: 'mainfoot', label: t('Tengah, bawah', '<main> / <footer>'), icon: 'book-open' },
        ],
        answer: { s1: 'headnav', s4: 'headnav', s2: 'mainfoot', s3: 'mainfoot' },
        explainCorrect: t(
          'Logo dan menu berada di atas halaman. Cerita utama di tengah, dan catatan hak cipta di bawah.',
          'Logo ada di <header> dan menu di <nav>. Isi utama ada di <main>, catatan hak cipta di <footer>.',
        ),
        hints: [t('Bayangkan halaman dari atas sampai bawah.', 'Pikirkan posisi tiap bagian dari atas ke bawah halaman.'), undefined],
        tags: ['semantik'],
      }),
      qStep(
        makeMcq({
          id: 'a02-l04-q3',
          modes: ['pro'],
          prompt: t('Kamu menulis berita yang bisa berdiri sendiri saat dibagikan. Tag mana yang paling tepat?'),
          choices: [
            { id: 'art', label: t('<article>') },
            {
              id: 'div',
              label: t('<section>'),
              explainWrong: t('<section> mengelompokkan bagian bertema, tetapi tidak menandai isi yang berdiri sendiri.'),
            },
            { id: 'nav', label: t('<nav>'), explainWrong: t('<nav> khusus untuk menu navigasi.') },
          ],
          answer: 'art',
          explainCorrect: t('<article> menandai isi yang utuh dan bisa berdiri sendiri, seperti berita atau posting blog.'),
          tags: ['semantik'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a02-l04-q3j',
          type: 'scenario',
          modes: ['junior'],
          difficulty: 2,
          story: t(
            'Dimas memakai alat yang membacakan halaman dengan suara. Ia ingin langsung membaca isi utama.',
            'Dimas memakai pembaca layar dan ingin langsung mendengar isi utama halaman.',
          ),
          prompt: t('Tag apa yang paling membantu Dimas?'),
          choices: [
            { id: 'main', label: t('Tag isi utama') },
            {
              id: 'plain',
              label: t('Kotak polos di mana-mana'),
              explainWrong: t('Kotak polos tidak memberi petunjuk apa pun. Dimas harus mendengar semuanya.'),
            },
            {
              id: 'color',
              label: t('Warna yang sangat cerah'),
              explainWrong: t('Warna hanya terlihat oleh mata. Alat pembaca tidak melihat warna.'),
            },
          ],
          answer: 'main',
          explainCorrect: t(
            'Tag isi utama memberi tahu alat itu di mana isi inti. Dimas bisa langsung melompat ke sana.',
            'Tag isi utama menandai isi inti, jadi pembaca layar bisa langsung melompat ke sana.',
          ),
          hints: [t('Pikirkan alat yang hanya membaca dengan suara.')],
          tags: ['semantik'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a02-l04-q4',
          type: 'limit',
          analogy: t('Lemari berlabel semantik'),
          prompt: t(
            'Kamu mengganti kotak polos menjadi tag menu. Tampilannya jadi bagaimana?',
            'Apa yang TIDAK terjadi otomatis saat <div> diganti menjadi <nav>?',
          ),
          choices: [
            {
              id: 'css',
              label: t('Tampilan tetap sama seperti semula', 'Tampilan menjadi rapi dan berwarna tanpa CSS'),
            },
            {
              id: 'sr',
              label: t('Tampilan otomatis berubah warna cantik', 'Pembaca layar mengenali bagian navigasi halaman'),
              explainWrong: t(
                'Tag menu hanya memberi arti. Warna tidak berubah sendiri.',
                'Pembaca layar justru langsung mengenali <nav> sebagai menu.',
              ),
            },
            {
              id: 'read',
              label: t('Tampilan otomatis berjajar rapi', 'Kode lebih mudah dibaca teman satu tim'),
              explainWrong: t(
                'Tag menu tidak mengatur tata letak. Itu tugas CSS.',
                'Nama tag yang bermakna memang membuat kode lebih mudah dibaca.',
              ),
            },
          ],
          answer: 'css',
          explainCorrect: t(
            'Tag menu hanya memberi arti, bukan gaya. Warna dan tata letak diatur oleh CSS.',
            'Tag semantik hanya memberi arti. Tampilan tetap diatur oleh CSS.',
          ),
          hints: [t('Label lemari diganti. Apakah warna lemarinya ikut berubah?', 'Bedakan arti tag dari tampilan tag.')],
          tags: ['semantik'],
        }),
      ),
      qStep({
        id: 'a02-l04-q5',
        type: 'hotspot',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Ketuk area tag semantik yang menampung isi utama halaman.'),
        image: 'a02-hotspot',
        regions: [
          { id: 'header', shape: 'rect', coords: [10, 10, 200, 40], label: '<header> (Logo & Judul)' },
          { id: 'nav', shape: 'rect', coords: [10, 50, 200, 40], label: '<nav> (Daftar Menu)' },
          { id: 'main', shape: 'rect', coords: [10, 100, 200, 80], label: '<main> (Isi Utama Halaman)' },
          { id: 'footer', shape: 'rect', coords: [10, 190, 200, 40], label: '<footer> (Hak Cipta & Kontak)' },
        ],
        answer: 'main',
        explainCorrect: t('Isi utama halaman diletakkan di dalam <main>.'),
        hints: [t('Cari bagian yang berisi isi pokok, bukan menu.'), undefined],
        tags: ['semantik'],
      }),
      qStep(
        makeMcq({
          id: 'a02-l04-q5j',
          modes: ['junior'],
          difficulty: 2,
          prompt: t('Di halaman berita, cerita beritanya ada di bagian mana?'),
          choices: [
            { id: 'main', label: t('Isi utama') },
            { id: 'foot', label: t('Kaki halaman'), explainWrong: t('Kaki halaman memuat catatan kecil di paling bawah. Cerita berita ada di tengah.', 'Kaki halaman berisi catatan kecil di bawah, bukan isi berita.') },
            { id: 'nav', label: t('Menu halaman'), explainWrong: t('Menu hanya berisi pilihan untuk pindah halaman. Cerita berita ada di tempat lain.', 'Menu berisi tautan navigasi, bukan isi berita.') },
          ],
          answer: 'main',
          explainCorrect: t('Cerita berita ada di isi utama. Itu bagian terpenting halaman.'),
          hints: [t('Ingat bagian halaman yang paling penting.')],
          tags: ['semantik'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a02-l04-q6',
          modes: ['pro'],
          prompt: t('<aside> dipakai untuk info sampingan, seperti daftar artikel terkait atau iklan kecil.'),
          answer: true,
          explainCorrect: t('<aside> berisi keterangan sampingan yang mendampingi isi utama.'),
          explainWrong: t('Info tambahan di sisi halaman memang ditaruh di <aside>.'),
          tags: ['semantik'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a02-l04-r1',
        prompt: t(
          'Catatan hak cipta ada di paling bawah halaman. Tag apa yang cocok?',
          'Tag apa yang dipakai untuk bagian paling bawah halaman, tempat hak cipta dan kontak?',
        ),
        choices: [
          { id: 'f', label: t('Tag kaki halaman', '<footer>') },
          {
            id: 'h',
            label: t('Tag bagian atas', '<nav>'),
            explainWrong: t('Bagian atas ada di atas halaman. Catatan hak cipta ada di bawah.', '<nav> membungkus menu tautan, bukan penutup halaman.'),
          },
          {
            id: 'm',
            label: t('Tag menu', '<main>'),
            explainWrong: t('Menu berisi pilihan halaman. Catatan hak cipta bukan menu.', '<main> berisi isi utama, bukan penutup halaman.'),
          },
        ],
        answer: 'f',
        explainCorrect: t('Tag kaki menandai bagian paling bawah halaman.', '<footer> menandai kaki halaman.'),
        hints: [t('Ingat bagian paling bawah halaman.')],
        tags: ['semantik'],
      }),
      makeTf({
        id: 'a02-l04-r2',
        prompt: t(
          'Tag semantik membantu alat pembaca layar menemukan bagian halaman.',
          'HTML semantik membantu pembaca layar melompat ke bagian halaman yang dicari.',
        ),
        answer: true,
        explainCorrect: t(
          'Alat pembaca bisa langsung melompat ke menu atau isi utama.',
          'Pembaca layar bisa langsung melompat ke <nav> atau <main>.',
        ),
        explainWrong: t(
          'Tag semantik memberi penanda yang dipakai alat pembaca.',
          'Tag semantik justru memberi penanda yang dipakai alat bantu aksesibilitas.',
        ),
        hints: [t('Ingat Dimas dan alat yang membacakan halaman.')],
        tags: ['semantik'],
      }),
    ],
    recap: t(
      'Tag yang punya arti membantu alat pembaca dan mesin pencari.',
      'HTML semantik membantu pembaca layar, mesin pencari, dan tim yang membaca kode.',
    ),
    companion: {
      talkPrompts: ['Di koran sekolah, mana bagian atas, isi, dan kakinya?'],
      offlineActivity: 'Lipat kertas jadi empat bagian vertikal dan tuliskan nama tag semantiknya dari atas ke bawah.',
    },
  }),

  makeLesson({
    id: 'a02-l05',
    worldId: 'a02',
    title: 'Tiga aturan emas HTML',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menghindari tiga kesalahan umum pada judul, tombol, dan gambar.',
      'Kamu bisa memeriksa tiga kesalahan HTML yang umum: urutan judul, tombol atau tautan, dan teks alt.',
    ),
    estMinutes: 6,
    introducesTerms: ['alt-text'],
    usesTerms: ['tag', 'atribut', 'semantik'],
    atWork: 'Kamu akan memperbaiki gambar tanpa alt dan tombol yang memakai div saat audit aksesibilitas halaman.',
    warmupFrom: 'a02-l04',
    steps: [
      storyStep('a02/aturan-emas.svg', [
        rText(
          'Sebuah buku cerita melompat dari Bab 1 ke Bab 4. Gambarnya juga tanpa keterangan. Apa yang dirasakan pembacanya?',
          'Audit halaman Toko Rani menemukan tiga kesalahan HTML yang sering muncul. Ketiganya mudah dicegah.',
        ),
      ]),
      conceptStep({
        title: t('Satu judul utama, urut rapi', 'Urutan judul rapi'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a02', topic: 'aturan-h1' },
        alt: t('Urutan judul tingkat 1, 2, dan 3 tanpa melompat.', 'Urutan h1 ke h2 ke h3 tanpa melompat.'),
        body: [
          rJunior('Judul utama memakai tag '),
          rCode('<h1>', ['junior']),
          rJunior(', dan satu halaman cukup punya satu. Judul berikutnya turun satu tingkat, tidak melompat. Seperti bab dan subbab di buku.'),
          rPro('Satu halaman cukup punya satu '),
          rCode('<h1>', ['pro']),
          rPro('. Urutan judul tidak boleh melompat, misalnya dari h1 langsung ke h4.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a02-l05-q2',
          prompt: t(
            'Judul utama sudah ada. Subjudul tepat di bawahnya memakai tingkat berapa?',
            'Subjudul tepat di bawah judul utama <h1> sebaiknya memakai tag apa?',
          ),
          choices: [
            { id: 'h2', label: t('Tingkat 2', '<h2>') },
            {
              id: 'h4',
              label: t('Tingkat 4', '<h4>'),
              explainWrong: t(
                'Tingkat 4 melompati tingkat 2 dan 3. Itu membingungkan pembaca layar.',
                'Melompati h2 dan h3 membingungkan pembaca layar.',
              ),
            },
            {
              id: 'h6',
              label: t('Tingkat 6', '<h6>'),
              explainWrong: t(
                'Tingkat 6 terlalu jauh. Jangan memilih tingkat hanya karena ukuran hurufnya.',
                'Jangan melompat tingkat judul hanya demi ukuran huruf.',
              ),
            },
          ],
          answer: 'h2',
          explainCorrect: t(
            'Subjudul turun satu tingkat dari judul utama, jadi tingkat 2.',
            'Urutan judul berjalan rapi: h1, lalu h2, lalu h3.',
          ),
          hints: [t('Ingat bab dan subbab di buku.', 'Turun satu tingkat dari judul utama.')],
          tags: ['tag'],
        }),
      ),
      conceptStep({
        title: t('Tombol, tautan, dan teks alt', 'Aksi, pindah halaman, dan alt'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a02', topic: 'button-vs-a' },
        alt: t(
          'Tombol untuk aksi, tautan untuk pindah halaman, dan gambar wajib teks alt.',
          'Perbedaan button untuk aksi, a untuk tautan, dan img wajib alt.',
        ),
        body: [
          rJunior('Tombol dipakai untuk aksi, seperti Simpan. Tautan dipakai untuk pindah halaman. '),
          rCode('<button>', ['pro']),
          rPro(' dipakai untuk aksi, dan '),
          rCode('<a>', ['pro']),
          rPro(' untuk pindah halaman. '),
          rTerm('alt-text', 'Teks alt', 'Teks alt'),
          rText(
            ' adalah keterangan gambar yang wajib ada di setiap gambar.',
            ' (atribut alt) adalah keterangan gambar untuk pembaca layar. Setiap gambar wajib memilikinya.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Daftar isi buku untuk judul'),
        same: [
          t(
            'Bab dan subbab berurutan membuat pembaca paham struktur.',
            'Seperti bab dan subbab buku, h1 sampai h6 menunjukkan struktur halaman.',
          ),
        ],
        different: [
          t(
            'Judul diurutkan sesuai arti, bukan sesuai besar hurufnya.',
            'Ukuran judul diatur lewat CSS, bukan dengan memilih h4 karena ukurannya pas.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'rak-label-html',
        t(
          'Periksa label mana yang cocok untuk tombol dan tautan.',
          'Uji aturan emas HTML di simulator Rak Label HTML.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a02-l05-q1',
          prompt: t(
            'Kamu membuat tombol "Simpan Perubahan" di formulir. Tag apa yang benar?',
            'Kamu membuat tombol "Simpan Perubahan" di formulir. Tag mana yang benar?',
          ),
          choices: [
            { id: 'btn', label: t('Tag tombol', '<button>') },
            {
              id: 'div',
              label: t('Kotak polos', '<div>'),
              explainWrong: t(
                'Kotak polos tidak dikenali sebagai tombol. Tombol punya tag sendiri.',
                '<div> tidak ramah keyboard dan tidak dikenali sebagai tombol.',
              ),
            },
            {
              id: 'a',
              label: t('Tag tautan', '<a href="#">'),
              explainWrong: t(
                'Tag tautan dipakai untuk pindah halaman. Simpan adalah aksi.',
                '<a> dipakai untuk pindah ke halaman lain, bukan untuk aksi.',
              ),
            },
          ],
          answer: 'btn',
          explainCorrect: t(
            'Aksi seperti Simpan memakai tag tombol. Keyboard dan alat pembaca ikut mengenalinya.',
            'Aksi seperti Simpan atau Hapus memakai <button>. Tag ini otomatis bisa ditekan dengan Enter atau Spasi.',
          ),
          hints: [t('Simpan itu aksi atau pindah halaman?', 'Tentukan apakah ini aksi atau pindah alamat.')],
          tags: ['tag', 'semantik'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a02-l05-q3',
          prompt: t(
            'Gambar sepatu lari merah diberi teks alt. Apa gunanya teks itu?',
            'Apa fungsi utama atribut alt pada <img src="sepatu.jpg" alt="Sepatu lari merah">?',
          ),
          choices: [
            { id: 'desc', label: t('Membacakan isi gambar untuk pembaca layar', 'Menjelaskan isi gambar bagi pembaca layar') },
            {
              id: 'size',
              label: t('Membuat gambar tampil lebih besar', 'Mengatur ukuran gambar di layar'),
              explainWrong: t(
                'Ukuran gambar diatur oleh CSS. Teks alt hanya bercerita.',
                'Ukuran gambar diatur dengan CSS, bukan alt. Alt adalah teks deskripsi.',
              ),
            },
            {
              id: 'link',
              label: t('Membuka halaman baru saat gambar itu diketuk', 'Membuka halaman baru saat gambar itu diketuk'),
              explainWrong: t(
                'Tautan memakai tag tautan. Teks alt hanya bercerita tentang gambar.',
                'Tautan memakai tag <a>. Alt tidak membuka halaman apa pun.',
              ),
            },
          ],
          answer: 'desc',
          explainCorrect: t(
            'Teks alt menceritakan isi gambar. Orang yang tidak melihat gambar tetap tahu isinya.',
            'Teks alt menyampaikan isi gambar kepada pembaca layar dan tampil saat gambar gagal dimuat.',
          ),
          hints: [t('Bayangkan temanmu tidak bisa melihat gambar.', 'Pikirkan pengunjung yang tidak melihat gambar.')],
          tags: ['alt-text'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a02-l05-q4',
          type: 'limit',
          analogy: t('Daftar isi bab judul'),
          prompt: t(
            'Judul terasa terlalu besar. Apa kesalahan yang sering terjadi?',
            'Kesalahan apa yang sering terjadi saat ukuran judul terasa terlalu besar?',
          ),
          choices: [
            {
              id: 'pick',
              label: t('Memakai judul tingkat 4 karena hurufnya kecil', 'Memakai <h4> karena hurufnya lebih kecil'),
            },
            {
              id: 'css',
              label: t('Mengatur ukuran huruf judul dengan CSS', 'Mengatur ukuran font lewat aturan CSS pada <h2>'),
              explainWrong: t(
                'CSS memang bertugas mengatur ukuran huruf. Itu cara yang benar.',
                'Mengatur ukuran dengan CSS justru cara yang benar.',
              ),
            },
            {
              id: 'one',
              label: t('Memakai hanya 1 judul utama di halaman', 'Menjaga hanya ada satu <h1> di setiap halaman'),
              explainWrong: t(
                'Satu judul utama adalah aturan yang benar. Masalahnya ada di pilihan tingkat.',
                'Satu <h1> per halaman adalah aturan yang benar.',
              ),
            },
          ],
          answer: 'pick',
          explainCorrect: t(
            'Tingkat judul dipilih sesuai artinya. Ukuran huruf diatur terpisah dengan CSS.',
            'Tag judul dipilih sesuai urutan maknanya, dan ukuran huruf diatur di CSS.',
          ),
          hints: [t('Ingat bab dan subbab di buku.', 'Pisahkan urusan arti judul dari ukuran hurufnya.')],
          tags: ['tag', 'semantik'],
        }),
      ),
      qStep({
        id: 'a02-l05-q5',
        type: 'spotbug',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Ketuk baris HTML yang melanggar aturan alt.'),
        lines: [
          '<h1>Menu Hari Ini</h1>',
          '<img src="roti.jpg">',
          '<button>Pesan Sekarang</button>',
        ],
        answer: [2],
        explainCorrect: t('Baris 2 memakai <img> tanpa atribut alt.'),
        hints: [t('Periksa baris yang menampilkan gambar.'), undefined],
        tags: ['alt-text'],
      }),
      qStep(
        makeMcq({
          id: 'a02-l05-q6',
          type: 'scenario',
          story: t(
            'Di halaman Toko Rani ada tulisan "Lihat Promo Lebaran". Kalau diketuk, tulisan itu membuka halaman lain.',
            'Di halaman Toko Rani, tulisan "Lihat Promo Lebaran" membuka halaman baru bernama /promo.',
          ),
          prompt: t('Tag apa yang cocok untuk tulisan itu?', 'Tag mana yang paling tepat membungkus tulisan itu?'),
          difficulty: 2,
          choices: [
            { id: 'a', label: t('Tag tautan', '<a href="/promo">Lihat Promo Lebaran</a>') },
            {
              id: 'btn',
              label: t('Tag tombol', '<button>Lihat Promo Lebaran</button>'),
              explainWrong: t(
                'Tombol menjalankan aksi di halaman itu. Pindah halaman memakai tautan.',
                'Pindah ke alamat halaman lain lebih tepat memakai <a>.',
              ),
            },
            {
              id: 'span',
              label: t('Kotak polos kecil', '<span title="promo">Lihat Promo Lebaran</span>'),
              explainWrong: t(
                'Kotak polos kecil hanya membungkus. Ia tidak bisa membuka halaman.',
                '<span> tidak punya sifat tautan, jadi tidak bisa membuka halaman.',
              ),
            },
          ],
          answer: 'a',
          explainCorrect: t(
            'Pindah ke halaman lain memakai tag tautan. Aksi di dalam halaman memakai tag tombol.',
            'Pindah halaman memakai <a href="...">, dan aksi di dalam halaman memakai <button>.',
          ),
          hints: [t('Ingat tugas tautan dan tugas tombol.', 'Tulisan ini memindahkan pembaca ke alamat lain.')],
          tags: ['tag', 'semantik'],
        }),
      ),
    ],
    reviewCards: [
      makeTf({
        id: 'a02-l05-r1',
        prompt: t(
          'Tombol Simpan sebaiknya memakai tag tautan.',
          'Tombol Simpan di formulir sebaiknya ditulis dengan <a>.',
        ),
        answer: false,
        explainCorrect: t(
          'Pernyataan itu keliru: Simpan adalah aksi, jadi memakai tag tombol. Tag tautan untuk pindah halaman.',
          'Pernyataan itu keliru: Simpan adalah aksi, jadi memakai <button>. <a> dipakai untuk pindah ke alamat lain.',
        ),
        explainWrong: t(
          'Tautan membawa kamu pindah halaman. Simpan adalah aksi, jadi memakai tag tombol.',
          '<a> untuk pindah alamat, <button> untuk aksi. Simpan adalah aksi.',
        ),
        hints: [t('Ingat tugas tautan dan tugas tombol.')],
        tags: ['semantik'],
      }),
      makeMcq({
        id: 'a02-l05-r2',
        prompt: t(
          'Gambar yang membawa informasi wajib punya apa?',
          'Atribut apa yang wajib dimiliki setiap gambar informatif?',
        ),
        choices: [
          { id: 'alt', label: t('Teks alt', 'alt') },
          {
            id: 'ol',
            label: t('Judul di atasnya', 'title'),
            explainWrong: t(
              'Judul di atas gambar boleh ada, tetapi bukan yang wajib. Gambar butuh teks yang bercerita.',
              'Atribut title hanya tooltip, bukan pengganti alt.',
            ),
          },
          {
            id: 'x',
            label: t('Bingkai berwarna', 'width'),
            explainWrong: t(
              'Bingkai hanya hiasan. Gambar butuh teks yang bercerita.',
              'Atribut width hanya mengatur lebar gambar, bukan isinya.',
            ),
          },
        ],
        answer: 'alt',
        explainCorrect: t(
          'Teks alt menjelaskan gambar kepada pembaca layar.',
          'Atribut alt menjelaskan gambar kepada pembaca layar.',
        ),
        hints: [t('Ingat teman yang tidak bisa melihat gambar.')],
        tags: ['alt-text'],
      }),
    ],
    recap: t(
      'Satu judul utama, urut rapi, dan gambar selalu punya teks alt.',
      'Pakai satu h1 dan urutan judul berurutan. <button> untuk aksi, <a> untuk pindah halaman, dan setiap gambar punya alt.',
    ),
    companion: {
      talkPrompts: ['Bagaimana teman yang tidak bisa melihat tahu isi sebuah foto?'],
      offlineActivity: 'Tutup mata sebentar. Minta teman menceritakan satu gambar di sekitarmu. Itulah fungsi teks alt.',
    },
  }),
];
