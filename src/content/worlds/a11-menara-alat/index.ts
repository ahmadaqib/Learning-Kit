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
import type { Lesson, World } from '@/content/schema';
import { npmAndVite, browserDevTools } from './workshops-tools';
import { testingBasics, deploySite } from './workshops-quality';

export const world: World = {
  id: 'a11',
  track: 'A',
  order: 11,
  title: 'Menara Alat',
  tagline: t(
    'Kenali perkakas pembuat web. Simpan hasil kerjamu seperti titik simpan di game. Lalu pasang halamanmu di internet.',
    'Kamu bisa memilih framework dan alat yang tepat, lalu membawa proyek dari Git sampai tayang.',
  ),
  color: '#2F6FED',
  illustration: 'a11-menara-alat',
  sourceChapters: ['J1-16', 'J1-18', 'J1-19'],
  requires: ['a10'],
  lessons: ['a11-l01', 'a11-l02', 'a11-l03', 'a11-l04', 'a11-l05', 'a11-l06', 'a11-l07'],
  sideQuests: [npmAndVite.id, browserDevTools.id, testingBasics.id, deploySite.id],
  boss: {
    title: 'Tantangan Penjaga Menara',
    greeting: t(
      'Selamat datang di Menara Alat! Buktikan kamu siap memakai perkakas dan memasang web ke internet.',
      'Buktikan kamu bisa memilih alat yang tepat dan membawa proyek sampai tayang.',
    ),
    guardianName: 'Penjaga Menara',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'a11-anc-j1',
        prompt: t(
          'Apa beda utama library dan framework?',
          'Apa beda utama library dan framework?',
        ),
        choices: [
          {
            id: 'ctrl',
            label: t(
              'Library kamu pilih sendiri, framework sudah punya aturan',
              'Library kamu panggil sesuai kebutuhan, framework mengatur alur kerja',
            ),
          },
          {
            id: 'free',
            label: t(
              'Library itu versi kecil dari framework',
              'Library hanya untuk CSS, framework hanya untuk JavaScript',
            ),
            explainWrong: t(
              'Library bisa kecil atau besar. Bedanya ada pada siapa yang membuat aturan.',
              'Keduanya ditulis dengan JavaScript. Bedanya ada pada siapa yang memegang kendali alur.',
            ),
          },
          {
            id: 'css',
            label: t(
              'Framework hanya dipakai untuk mewarnai halaman',
              'Library lebih lengkap daripada framework',
            ),
            explainWrong: t(
              'Framework mengatur cara kerja seluruh aplikasi. Warna hanyalah satu bagian kecil.',
              'Framework yang menyediakan kerangka lengkap. Library hanya kumpulan alat.',
            ),
          },
        ],
        answer: 'ctrl',
        explainCorrect: t(
          'Library dipanggil saat kamu butuh. Framework sudah menyiapkan kerangka, seperti rumah jadi.',
          'Library dipanggil oleh kodemu saat dibutuhkan. Framework menyediakan kerangka dan aturan, lalu kodemu mengisinya.',
        ),
        tags: ['library-framework'],
      }),
      makeAnchorMcq({
        id: 'a11-anc-j2',
        prompt: t(
          'Kamu mau mencoba ide baru di kode. Apa gunanya membuat branch dulu?',
          'Apa gunanya membuat branch baru sebelum mencoba fitur baru?',
        ),
        choices: [
          {
            id: 'safe',
            label: t(
              'Supaya aman mencoba tanpa merusak jalur utama',
              'Mencoba fitur baru tanpa merusak branch main',
            ),
          },
          {
            id: 'del',
            label: t(
              'Supaya kodenya otomatis lebih cepat',
              'Membuat kode otomatis berjalan lebih cepat',
            ),
            explainWrong: t(
              'Branch tidak mengubah kecepatan. Branch hanya menyiapkan jalur percobaan yang terpisah.',
              'Branch tidak mempercepat kode. Branch hanya memisahkan jalur percobaan dari main.',
            ),
          },
          {
            id: 'pic',
            label: t(
              'Supaya file langsung terkirim ke GitHub',
              'Mengirim perubahan langsung ke GitHub',
            ),
            explainWrong: t(
              'Mengirim ke GitHub dilakukan dengan langkah lain. Branch hanya membuat jalur percobaan.',
              'Pengiriman ke GitHub memakai push. Branch hanya membuat jalur terpisah.',
            ),
          },
        ],
        answer: 'safe',
        explainCorrect: t(
          'Branch seperti jalur petualangan baru. Kalau gagal, jalur utama tetap aman.',
          'Branch memisahkan percobaan dari jalur main. Kalau gagal, main tetap bersih.',
        ),
        tags: ['git'],
      }),
      makeAnchorMcq({
        id: 'a11-anc-j3',
        prompt: t(
          'Pekerjaan di jalur baru sudah bagus. Apa langkah untuk menyatukannya ke jalur utama?',
          'Pekerjaan di branch sudah selesai dan bagus. Apa langkah untuk menyatukannya ke main?',
        ),
        choices: [
          { id: 'merge', label: t('Merge') },
          {
            id: 'bug',
            label: t('Commit'),
            explainWrong: t(
              'Commit hanya menyimpan satu titik simpan. Menyatukan jalur adalah tugas merge.',
              'Commit menyimpan satu titik simpan. Yang menggabungkan branch ke main adalah merge.',
            ),
          },
          {
            id: 'alt',
            label: t('Branch'),
            explainWrong: t(
              'Branch membuat jalur baru. Merge yang menyatukannya kembali.',
              'Branch membuat jalur baru. Merge yang menggabungkannya kembali.',
            ),
          },
        ],
        answer: 'merge',
        explainCorrect: t(
          'Merge menyatukan jalur baru ke jalur utama. Seperti dua sungai yang bertemu.',
          'Merge menggabungkan perubahan dari branch ke main.',
        ),
        tags: ['git'],
      }),
      makeAnchorMcq({
        id: 'a11-anc-j4',
        prompt: t(
          'Kamu selesai membuat web di laptop. Apa nama langkah memasangnya ke internet supaya orang lain bisa membukanya?',
          'Apa nama proses menaruh situs dari laptop ke server supaya bisa dibuka orang lain?',
        ),
        choices: [
          { id: 'dep', label: t('Deploy') },
          {
            id: 'sket',
            label: t('Wireframe'),
            explainWrong: t(
              'Wireframe adalah sketsa kasar di awal. Web belum tayang.',
              'Wireframe adalah sketsa kasar tata letak di awal, sebelum ada kode.',
            ),
          },
          {
            id: 'insp',
            label: t('Commit'),
            explainWrong: t(
              'Commit hanya membuat titik simpan di laptop. Web belum tayang.',
              'Commit mencatat titik simpan di repo lokal, bukan menayangkan situs ke server.',
            ),
          },
        ],
        answer: 'dep',
        explainCorrect: t(
          'Deploy memasang web ke internet. Seperti pentas drama yang mulai ditonton orang.',
          'Deploy menayangkan aplikasi ke server supaya bisa dikunjungi orang.',
        ),
        tags: ['deploy'],
      }),
      makeAnchorMcq({
        id: 'a11-anc-j5',
        prompt: t(
          'Git seperti titik simpan game. Apa yang hanya ada di Git, tidak di game satu pemain?',
          'Apa beda Git dengan titik simpan di game satu pemain?',
        ),
        type: 'limit',
        analogy: t('Git seperti titik simpan di game'),
        choices: [
          {
            id: 'team',
            label: t(
              'Banyak teman bekerja bersamaan, lalu hasilnya digabung',
              'Banyak orang membuat cabang bersamaan lalu menggabungkan hasilnya',
            ),
          },
          {
            id: 'back',
            label: t(
              'Bisa kembali ke titik simpan yang lama',
              'Sama-sama bisa kembali ke kondisi lama saat salah langkah',
            ),
            explainWrong: t(
              'Itu juga ada di game. Cari hal yang hanya ada di Git.',
              'Itu memang persamaan Git dan save point game. Cari yang hanya ada di Git.',
            ),
          },
          {
            id: 'note',
            label: t(
              'Mencatat sampai mana pekerjaanmu',
              'Sama-sama mencatat posisi perkembangan pekerjaan',
            ),
            explainWrong: t(
              'Game juga mencatat kemajuanmu. Itu bukan beda.',
              'Itu juga persamaannya. Bedanya ada pada kerja tim.',
            ),
          },
        ],
        answer: 'team',
        explainCorrect: t(
          'Di Git, kamu dan teman menyimpan di jalur masing-masing, lalu menyatukannya.',
          'Git dibuat untuk kerja tim yang bersamaan, bukan hanya untuk satu pemain.',
        ),
        tags: ['git'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a11-anc-p1',
        prompt: t('Apa beda mendasar Props dan State di komponen React atau Vue?'),
        choices: [
          {
            id: 'ps',
            label: t('Props dikirim dari induk ke anak, State dikelola di dalam komponen'),
          },
          {
            id: 'css',
            label: t('Props dan State hanyalah dua nama untuk data yang sama'),
            explainWrong: t('Keduanya berbeda. Props datang dari luar, State disimpan di dalam komponen.'),
          },
          {
            id: 'same',
            label: t('Props boleh diubah langsung oleh komponen anak'),
            explainWrong: t('Props bersifat baca-saja bagi anak. Yang diperbarui komponen adalah State-nya.'),
          },
        ],
        answer: 'ps',
        explainCorrect: t(
          'Props mengalir dari induk ke anak. State disimpan di dalam komponen dan menyegarkan tampilan saat berubah.',
        ),
        tags: ['react-komponen'],
      }),
      makeAnchorMcq({
        id: 'a11-anc-p2',
        prompt: t('Teknik render mana yang membuat halaman sekali saat build, lalu menyajikannya cepat berulang kali?'),
        choices: [
          { id: 'ssg', label: t('SSG (Static Site Generation)') },
          {
            id: 'csr',
            label: t('CSR (Client-Side Rendering)'),
            explainWrong: t('CSR mengirim halaman kosong, lalu JavaScript merakitnya di browser.'),
          },
          {
            id: 'ssr',
            label: t('SSR (Server-Side Rendering)'),
            explainWrong: t('SSR membuat halaman ulang di server setiap ada permintaan.'),
          },
        ],
        answer: 'ssg',
        explainCorrect: t(
          'SSG seperti roti yang dipanggang sekali di pagi hari. Cocok untuk blog dan dokumentasi yang jarang berubah.',
        ),
        tags: ['tailwind-css'],
      }),
      makeAnchorMcq({
        id: 'a11-anc-p3',
        prompt: t('Gambar tanpa width dan height tiba-tiba menggeser tombol ke bawah. Ukuran Core Web Vitals mana yang memburuk?'),
        choices: [
          { id: 'cls', label: t('CLS (Cumulative Layout Shift)') },
          {
            id: 'inp',
            label: t('INP (Interaction to Next Paint)'),
            explainWrong: t('INP mengukur seberapa cepat halaman menanggapi klik.'),
          },
          {
            id: 'dns',
            label: t('LCP (Largest Contentful Paint)'),
            explainWrong: t('LCP mengukur kapan isi utama muncul, bukan loncatnya tata letak.'),
          },
        ],
        answer: 'cls',
        explainCorrect: t('CLS mengukur kestabilan tata letak. Targetnya di bawah 0,1.'),
        tags: ['core-web-vitals'],
      }),
      makeAnchorMcq({
        id: 'a11-anc-p4',
        prompt: t('Mengapa URL /produk/sepatu-lari lebih baik untuk SEO daripada /p?id=8812?'),
        choices: [
          { id: 'url', label: t('URL yang jelas menggambarkan isi halaman') },
          {
            id: 'https',
            label: t('Tanda tanya di URL memperlambat halaman'),
            explainWrong: t('Tanda tanya tidak memperlambat halaman. Yang kurang adalah petunjuk tentang isinya.'),
          },
          {
            id: 'git',
            label: t('Mesin pencari hanya membaca URL pendek'),
            explainWrong: t('Panjang URL bukan penentunya. Yang dinilai adalah seberapa baik URL menggambarkan isi halaman.'),
          },
        ],
        answer: 'url',
        explainCorrect: t('Slug yang deskriptif membantu mesin pencari dan pengunjung memahami isi halaman.'),
        tags: ['seo', 'url'],
      }),
      makeAnchorMcq({
        id: 'a11-anc-p5',
        prompt: t('Apa beda lingkungan Staging dan Production dalam alur rilis aplikasi?'),
        choices: [
          { id: 'sp', label: t('Staging untuk uji coba, Production dipakai pengunjung sungguhan') },
          {
            id: 'rev',
            label: t('Staging dipakai pengunjung, Production untuk uji coba'),
            explainWrong: t('Itu terbalik. Staging untuk menguji dulu, Production untuk pengunjung sungguhan.'),
          },
          {
            id: 'code',
            label: t('Staging tempat menulis kode di laptop sendiri'),
            explainWrong: t('Menulis kode dilakukan di lingkungan lokal. Staging sudah berupa server uji coba.'),
          },
        ],
        answer: 'sp',
        explainCorrect: t('Fitur diuji di staging dulu. Bug jadi tidak sampai ke pengunjung di production.'),
        tags: ['deploy'],
      }),
      makeAnchorMcq({
        id: 'a11-anc-p6',
        type: 'limit',
        analogy: t('Performa terasa cepat memakai skeleton, seperti meja yang sedang disiapkan'),
        choices: [
          {
            id: 'real',
            label: t('Skeleton hanya mengurangi bosan; file berat tetap memperlambat LCP'),
          },
          {
            id: 'wait',
            label: t('Memberi tahu pengunjung bahwa halaman sedang bekerja'),
            explainWrong: t('Itu memang tujuan trik perceived performance. Cari batasnya.'),
          },
          {
            id: 'top',
            label: t('Menampilkan bagian atas layar lebih dulu agar terlihat'),
            explainWrong: t('Itu juga bagian yang memang bekerja. Cari batasnya.'),
          },
        ],
        prompt: t('Apa batas dari trik skeleton loader yang membuat halaman terasa cepat?'),
        answer: 'real',
        explainCorrect: t('Skeleton tidak mempercepat file. Gambar berat dan JavaScript berat tetap harus dikecilkan.'),
        tags: ['core-web-vitals'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'a11-l01',
    worldId: 'a11',
    title: 'Library atau framework',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan library dan framework.',
      'Kamu bisa membedakan library dan framework, serta menjelaskan komponen dan reaktivitas.',
    ),
    estMinutes: 6,
    introducesTerms: ['library-framework'],
    usesTerms: ['komponen-ui', 'dom', 'javascript', 'html', 'css'],
    atWork: 'Kamu akan memutuskan memakai library atau framework saat tim memulai proyek web baru.',
    warmupFrom: 'a10-l03',
    steps: [
      storyStep('a11/library-framework.svg', [
        rText(
          'Library seperti memilih meja dan kursi sendiri untuk rumahmu. Framework seperti rumah jadi, lengkap dengan denah dan aturannya. Apa bedanya?',
          'Aplikasi besar tidak perlu ditulis dari nol. Library adalah perabot yang kamu pilih untuk rumah rancanganmu, framework adalah rumah jadi dengan denah dan aturan sendiri.',
        ),
      ]),
      conceptStep({
        title: t('Library: kamu yang mengatur', 'Library (pustaka)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a11', topic: 'library-kendali' },
        alt: t('Kodemu memanggil alat dari library saat perlu.', 'Kodemu memanggil library sesuai kebutuhan.'),
        body: [
          rTerm('library-framework', 'Library', 'Library'),
          rText(
            ' adalah kumpulan alat siap pakai. Kamu memanggilnya saat perlu. Kamu sendiri yang menentukan cara kerjanya. Seperti memilih meja dan kursi untuk rumahmu.',
            ' adalah kumpulan alat yang kamu panggil saat dibutuhkan. Kodemu tetap memegang kendali atas alur program.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a11-l01-q1',
          type: 'analogy',
          prompt: t(
            'Kamu memilih perabot sendiri untuk rumah buatanmu. Itu mirip dengan apa?',
            'Dalam analogi rumah, memilih perabot sendiri untuk rumah rancanganmu paling mirip dengan apa?',
          ),
          choices: [
            { id: 'lib', label: t('Library') },
            {
              id: 'fw',
              label: t('Framework'),
              explainWrong: t(
                'Framework seperti rumah jadi. Denah dan aturannya sudah ditentukan.',
                'Framework ibarat rumah jadi yang denah dan aturannya sudah ditentukan. Kamu mengisinya, bukan menyusunnya.',
              ),
            },
            {
              id: 'dns',
              label: t('JavaScript'),
              explainWrong: t(
                'JavaScript adalah bahasa untuk menulis kode. Library dibuat dengan bahasa itu.',
                'JavaScript adalah bahasa untuk menulis kode. Library dan framework ditulis dengan bahasa itu.',
              ),
            },
          ],
          answer: 'lib',
          explainCorrect: t(
            'Library dipanggil saat kamu perlu, jadi kamu yang mengatur. Seperti memilih perabot satu per satu.',
            'Dengan library, kamu yang mengatur struktur dan hanya memanggil alat yang dibutuhkan.',
          ),
          hints: [t('Ingat siapa yang memilih perabotnya.', 'Perhatikan siapa yang menentukan isi rumahnya.')],
          tags: ['library-framework'],
        }),
      ),
      conceptStep({
        title: t('Framework: mengisi kerangka', 'Framework (kerangka kerja)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a11', topic: 'framework-kerangka' },
        alt: t('Framework menyediakan denah, kodemu mengisi.', 'Framework menyediakan denah aturan dan memanggil kode bagianmu.'),
        body: [
          rBold('Framework', 'Framework'),
          rText(
            ' seperti rumah jadi. Denah dan aturannya sudah ada. Kamu tinggal mengisi bagiannya. Halamannya dipecah jadi keping kecil, seperti balok susun.',
            ' adalah kerangka kerja lengkap yang mengatur struktur proyek dan cara kerjamu. Kamu mengisi bagian yang sudah ditentukan.',
          ),
        ],
      }),
      conceptStep({
        title: t('Komponen dan reaktivitas'),
        modes: ['pro'],
        visualName: 'HtmlTreeDiagram',
        visualProps: { worldId: 'a11', topic: 'reaktivitas-komponen' },
        alt: t('Komponen UI yang terhubung langsung dengan data reaktif.'),
        body: [
          rText('Mengubah '),
          rTerm('dom', 'DOM'),
          rText(' (susunan elemen halaman) secara manual cepat menjadi kusut di proyek besar. Framework modern memberi '),
          rTerm('komponen-ui', 'komponen'),
          rText(' yang bisa dipakai ulang dan '),
          rBold('reaktivitas'),
          rText(': tampilan berubah otomatis saat data berubah.'),
        ],
      }),
      qStep({
        id: 'a11-l01-q3',
        type: 'sort',
        prompt: t('Kelompokkan ciri ini ke Library atau Framework.'),
        difficulty: 2,
        items: [
          {
            id: 'i1',
            label: t('Kamu memilih dan mengatur sendiri', 'Kamu mengatur alur kerja sendiri dan memanggil alat saat perlu'),
          },
          {
            id: 'i2',
            label: t('Aturan dan denahnya sudah ada', 'Kerangka kerja sudah menentukan denah dan aturan main'),
          },
          {
            id: 'i3',
            label: t('Seperti membeli perabot sendiri', 'Ibarat membeli perabot untuk rumah rancangan sendiri'),
          },
          {
            id: 'i4',
            label: t('Seperti mengisi rumah jadi', 'Ibarat mengisi rumah jadi yang denahnya sudah ada'),
          },
        ],
        bins: [
          { id: 'lib', label: t('Library'), icon: 'book-open' },
          { id: 'fw', label: t('Framework'), icon: 'box' },
        ],
        answer: { i1: 'lib', i2: 'fw', i3: 'lib', i4: 'fw' },
        explainCorrect: t(
          'Library kamu pilih sendiri, framework sudah punya aturan. Seperti perabot pilihanmu dan rumah jadi.',
          'Perbedaan utamanya ada pada siapa yang memegang kendali struktur. Library kamu panggil, framework yang mengatur.',
        ),
        hints: [t('Bayangkan denah rumah yang sudah jadi.', 'Tanyakan: siapa yang memegang kendali alurnya?'), undefined],
        tags: ['library-framework'],
      }),
      limitStep({
        analogy: t('Library seperti perabot sendiri, framework seperti rumah jadi'),
        same: [t('Keduanya soal siapa yang mengatur denah utama dan alat mana yang bebas dipilih.')],
        different: [
          t('Proyek sungguhan sering memakai satu framework utama dan beberapa library kecil, seperti pembuat grafik.'),
          t('Kamu tetap perlu menguasai dasar web, bukan hanya framework.'),
        ],
        riskyAnalogy: false,
      }),
      simStep(
        'menara-alat',
        t(
          'Telusuri alur kerja alat di Menara Alat sampai tayang.',
          'Ikuti simulasi langkah kerja perkakas modern di Menara Alat.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a11-l01-q2j',
          type: 'scenario',
          modes: ['junior'],
          story: t('Dimas memakai framework, seperti rumah jadi. Ia ingin menambah grafik.'),
          prompt: t('Apa yang boleh Dimas lakukan?'),
          choices: [
            { id: 'add', label: t('Menambah library kecil untuk grafik') },
            {
              id: 'swap',
              label: t('Mengganti seluruh framework dengan yang baru'),
              explainWrong: t('Rumah jadi tidak perlu dibongkar. Ia cukup menambah perabot kecil.'),
            },
            {
              id: 'wait',
              label: t('Menunggu framework menambahkan grafiknya sendiri'),
              explainWrong: t('Dimas tidak perlu menunggu. Ia boleh memasang library tambahan.'),
            },
          ],
          answer: 'add',
          explainCorrect: t('Framework boleh ditambah library kecil. Seperti rumah jadi yang diberi lemari tambahan.'),
          hints: [t('Rumah jadi boleh diberi perabot tambahan.')],
          tags: ['library-framework'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a11-l01-q2',
          modes: ['pro'],
          prompt: t('Apa dua keuntungan utama memakai library atau framework UI di aplikasi besar?'),
          choices: [
            { id: 'kr', label: t('Komponen yang bisa dipakai ulang dan reaktivitas') },
            {
              id: 'nohtml',
              label: t('Tidak perlu belajar HTML, CSS, dan JavaScript lagi'),
              explainWrong: t('Framework tetap berjalan di atas dasar web. Dasar itu tetap perlu dipelajari.'),
            },
            {
              id: 'nonet',
              label: t('Data tersimpan otomatis tanpa memakai server'),
              explainWrong: t('Framework di sisi tampilan tidak menyimpan data bersama. Itu tugas server.'),
            },
          ],
          answer: 'kr',
          explainCorrect: t('Komponen dan reaktivitas membuat kode DOM manual tidak kusut. Tampilan mengikuti data secara otomatis.'),
          hints: [t('Cari dua hal yang disebut di kartu tentang komponen.')],
          tags: ['library-framework', 'komponen-ui'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a11-l01-q4',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Library sebagai perabot, framework sebagai rumah jadi'),
          prompt: t('Rumah dan perabot terasa terpisah. Apa yang bisa terjadi di proyek web sungguhan?'),
          choices: [
            { id: 'mix', label: t('Framework tetap bisa memakai beberapa library tambahan') },
            {
              id: 'ban',
              label: t('Framework mengharuskan semua tampilan ditulis tanpa HTML'),
              explainWrong: t('Dasar web tetap menjadi fondasi semua framework.'),
            },
            {
              id: 'one',
              label: t('Satu proyek hanya boleh memakai satu library saja'),
              explainWrong: t('Satu proyek boleh memasang beberapa library sekaligus.'),
            },
          ],
          answer: 'mix',
          explainCorrect: t('Aplikasi React atau Next.js sering ditambah library grafik atau animasi.'),
          hints: [t('Rumah jadi masih boleh diberi perabot tambahan.')],
          tags: ['library-framework'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a11-l01-q6',
          prompt: t(
            'Seperti naik sepeda, belajar satu framework membuat framework lain lebih mudah.',
            'Konsep dasar seperti komponen dan state mirip di berbagai framework. Menguasai satu framework membuat framework lain lebih mudah dipelajari.',
          ),
          answer: true,
          explainCorrect: t(
            'Ide dasarnya mirip. Seperti naik sepeda, belajar satu membantu belajar yang lain.',
            'Konsep inti framework modern mirip. Kuasai satu dulu, jangan berpindah-pindah tiap minggu.',
          ),
          explainWrong: t(
            'Ide dasar framework sangat mirip. Belajar satu sudah sangat membantu.',
            'Konsep inti framework modern sangat mirip, jadi menguasai satu sudah membantu.',
          ),
          hints: [t('Ingat: bisa naik satu sepeda, sepeda lain terasa mudah.', 'Pikirkan apa yang sama di semua framework.')],
          tags: ['library-framework'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a11-l01-q5',
          type: 'scenario',
          story: t(
            'Dimas belum paham HTML, CSS, dan JavaScript. Ia ingin langsung memakai framework.',
            'Dimas ingin langsung belajar React, padahal ia belum paham variabel, fungsi, HTML, dan CSS dasar.',
          ),
          prompt: t('Mengapa Dimas bisa cepat bingung?', 'Mengapa langkah Dimas membuatnya cepat bingung?'),
          difficulty: 2,
          choices: [
            {
              id: 'fund',
              label: t(
                'Framework dibangun dari dasar web itu',
                'Framework berjalan di atas HTML, CSS, dan JavaScript dasar',
              ),
            },
            {
              id: 'old',
              label: t(
                'Framework hanya boleh dipakai oleh ahli',
                'React sudah menggantikan HTML dan CSS sepenuhnya',
              ),
              explainWrong: t(
                'Pemula boleh memakai framework, tetapi dasarnya perlu dipelajari dulu.',
                'React tetap menghasilkan HTML dan CSS. Keduanya tidak hilang.',
              ),
            },
            {
              id: 'net',
              label: t(
                'Framework tidak bisa tampil di browser',
                'React hanya bisa dipakai oleh developer senior yang berpengalaman',
              ),
              explainWrong: t(
                'Framework tampil di browser seperti web lainnya. Masalahnya ada pada dasar yang belum paham.',
                'Pemula bisa memakai React. Yang membuat bingung adalah dasar yang belum dikuasai.',
              ),
            },
          ],
          answer: 'fund',
          explainCorrect: t(
            'Framework dibangun dari dasar web. Seperti rumah jadi yang tetap butuh fondasi.',
            'Kuasai dulu dasar web sebelum melompat ke framework.',
          ),
          hints: [t('Ingat: rumah jadi pun berdiri di atas fondasi.', 'Pikirkan apa yang dihasilkan React saat tampil di browser.')],
          tags: ['library-framework', 'javascript'],
        }),
      ),
      qStep({
        id: 'a11-l01-q7',
        type: 'type',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Tulis istilah untuk sifat tampilan yang otomatis berubah saat datanya diperbarui.'),
        accept: ['reaktivitas', 'reactivity', 'reaktif'],
        explainCorrect: t('Reaktivitas membuat tampilan selalu sama dengan datanya, tanpa mencari elemen DOM satu per satu.'),
        hints: [t('Istilah ini ada di kartu tentang komponen.'), undefined],
        tags: ['library-framework'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a11-l01-r1',
        prompt: t('Mana yang menyediakan kerangka aturan lengkap, lalu kamu mengisi bagiannya?'),
        choices: [
          { id: 'fw', label: t('Framework') },
          {
            id: 'lib',
            label: t('Library'),
            explainWrong: t(
              'Library hanya menyediakan alat. Kamu sendiri yang mengatur cara kerjanya.',
              'Library hanya menyediakan alat yang kamu panggil sesuai aturanmu sendiri.',
            ),
          },
          {
            id: 'js',
            label: t('JavaScript'),
            explainWrong: t(
              'JavaScript adalah bahasa kode. Framework dan library ditulis dengan bahasa itu.',
              'JavaScript adalah bahasanya. Framework dan library dibangun dengan bahasa itu.',
            ),
          },
        ],
        answer: 'fw',
        explainCorrect: t(
          'Framework menyiapkan kerangka kerja lengkap. Seperti rumah jadi dengan denahnya.',
          'Framework menyiapkan kerangka kerja lengkap untuk aplikasi.',
        ),
        hints: [t('Ingat rumah jadi yang denahnya sudah ada.')],
        tags: ['library-framework'],
      }),
      makeTf({
        id: 'a11-l01-r2',
        prompt: t(
          'Framework membantu memecah tampilan menjadi bagian kecil yang dipakai ulang.',
          'Pada aplikasi besar, framework membantu memecah tampilan menjadi komponen agar kode tidak kusut.',
        ),
        answer: true,
        explainCorrect: t(
          'Bagian kecil bisa dipakai ulang, jadi kode tidak kusut. Seperti balok susun yang disusun lagi.',
          'Komponen memecah kode tampilan jadi bagian kecil yang mudah dirawat.',
        ),
        explainWrong: t(
          'Bagian kecil yang dipakai ulang justru alasan utama memakai framework.',
          'Komponen justru alasan utama memakai library atau framework UI.',
        ),
        hints: [t('Ingat balok susun yang dipakai berulang.')],
        tags: ['library-framework', 'komponen-ui'],
      }),
    ],
    recap: t(
      'Library itu perabot pilihanmu, framework itu rumah lengkap dengan aturannya.',
      'Library dipanggil kodemu, framework mengatur alur kerjamu. Keduanya berjalan di atas dasar web.',
    ),
    companion: {
      talkPrompts: [
        'Lebih suka memilih perabot sendiri, atau tinggal di rumah jadi? Mengapa?',
      ],
      offlineActivity:
        'Gambar sebuah halaman kartu toko lalu tandai bagian mana yang bisa menjadi komponen berulang, seperti keping balok susun.',
    },
  }),

  makeLesson({
    id: 'a11-l02',
    worldId: 'a11',
    title: 'React, Vue, Angular, Svelte',
    modes: ['pro'],
    objective: t('Kamu bisa membedakan React, Vue, Angular, dan Svelte, serta konsep Props, State, dan Virtual DOM.'),
    estMinutes: 6,
    introducesTerms: ['react-komponen'],
    usesTerms: ['library-framework', 'komponen-ui', 'dom', 'javascript', 'state-ui'],
    atWork: 'Kamu akan membaca kode komponen React atau Vue saat bergabung ke tim yang sudah punya aplikasi.',
    warmupFrom: 'a11-l01',
    steps: [
      storyStep('a11/framework-empat.svg', [
        rText(
          'Tim Toko Rani memilih alat untuk membuat aplikasi toko: React, Vue, Angular, atau Svelte. Semuanya merakit tampilan dari komponen yang bisa dipakai ulang.',
        ),
      ]),
      conceptStep({
        title: t('Empat pilihan dan meta-framework'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a11', topic: 'react-vue-angular-svelte' },
        alt: t('Perbandingan React, Vue, Angular, Svelte serta meta-framework Next.js, Nuxt, SvelteKit, Astro.'),
        body: [
          rBold('React'),
          rText(' (buatan Meta) memakai JSX, yaitu cara menulis tampilan mirip HTML di dalam JavaScript. Ekosistemnya terbesar. '),
          rBold('Vue'),
          rText(' ramah pemula dengan template mirip HTML. '),
          rBold('Angular'),
          rText(' (buatan Google) lengkap dan ketat dengan TypeScript. '),
          rBold('Svelte'),
          rText(' memakai compiler yang menerjemahkan kode saat build (tahap mengemas kode sebelum tayang). Di atasnya ada meta-framework, yaitu paket tambahan untuk halaman dan render server: '),
          rCode('Next.js, Nuxt, SvelteKit, Astro'),
          rText('.'),
        ],
      }),
      qStep({
        id: 'a11-l02-q2',
        type: 'sort',
        prompt: t('Kelompokkan alat ini ke Library UI atau Meta-framework.'),
        difficulty: 2,
        items: [
          { id: 'f1', label: t('React') },
          { id: 'm1', label: t('Next.js') },
          { id: 'f2', label: t('Vue') },
          { id: 'm2', label: t('Nuxt') },
        ],
        bins: [
          { id: 'ui', label: t('Library atau framework UI'), icon: 'code' },
          { id: 'meta', label: t('Meta-framework'), icon: 'layout-dashboard' },
        ],
        answer: { f1: 'ui', m1: 'meta', f2: 'ui', m2: 'meta' },
        explainCorrect: t('Next.js dibangun di atas React, dan Nuxt dibangun di atas Vue. Meta-framework menambah routing dan render server.'),
        hints: [t('Meta-framework dibangun di atas satu alat UI.'), undefined],
        tags: ['react-komponen', 'library-framework'],
      }),
      conceptStep({
        title: t('Component, Props, dan State'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a11', topic: 'props-state-react' },
        alt: t('Komponen TombolSuka memakai useState untuk memperbarui tampilan.'),
        code: {
          lang: 'js',
          code: 'function TombolSuka() {\n  const [suka, setSuka] = useState(0);\n  return (\n    <button onClick={() => setSuka(suka + 1)}>\n      Suka: {suka}\n    </button>\n  );\n}',
          highlight: [2, 4],
        },
        body: [
          rText('Komponen adalah satu keping tampilan yang bisa dipakai ulang, seperti tombol. '),
          rTerm('react-komponen', 'Props'),
          rText(' adalah data yang dikirim dari komponen induk ke anak. '),
          rBold('State'),
          rText(' adalah ingatan di dalam komponen, seperti '),
          rCode('suka'),
          rText('. Saat State berubah, tampilan ikut berubah.'),
        ],
      }),
      conceptStep({
        title: t('Routing, State management, dan Virtual DOM'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a11', topic: 'routing-vdom' },
        alt: t('Routing sebagai peta jalan, State Management sebagai papan bersama, dan Virtual DOM sebagai kertas buram.'),
        body: [
          rBold('Routing'),
          rText(' mengatur perpindahan halaman, seperti peta jalan. '),
          rBold('State management'),
          rText(' (Redux, Zustand, Pinia) menjadi papan pengumuman untuk data yang dipakai banyak komponen. '),
          rBold('Virtual DOM'),
          rText(' adalah salinan DOM di memori, seperti kertas buram, untuk menghitung perubahan sebelum menyalinnya ke DOM asli.'),
        ],
      }),
      qStep({
        id: 'a11-l02-q1',
        type: 'match',
        prompt: t('Pasangkan konsep ini dengan perumpamaannya.'),
        difficulty: 2,
        left: [
          { id: 'c', label: t('Component') },
          { id: 'p', label: t('Props') },
          { id: 's', label: t('State') },
          { id: 'v', label: t('Virtual DOM') },
        ],
        right: [
          { id: 'r1', label: t('Ingatan sementara di dalam komponen') },
          { id: 'r2', label: t('Mengedit di kertas buram sebelum menyalin ke buku') },
          { id: 'r3', label: t('Keping balok tampilan yang dipakai berulang') },
          { id: 'r4', label: t('Pesanan data dari komponen induk ke anak') },
        ],
        answer: { c: 'r3', p: 'r4', s: 'r1', v: 'r2' },
        explainCorrect: t('Component adalah keping tampilan, Props adalah pesanan dari induk, State adalah ingatan komponen. Virtual DOM adalah kertas buram sebelum perubahan disalin.'),
        hints: [t('Pikirkan mana yang datang dari luar dan mana yang disimpan di dalam.'), undefined],
        tags: ['react-komponen'],
      }),
      limitStep({
        analogy: t('Component seperti keping balok, Props seperti pesanan, State seperti ingatan, Virtual DOM seperti kertas buram'),
        same: [
          t('Analogi ini membantu membedakan data kiriman dari luar (Props) dan data yang berubah di dalam komponen (State).'),
        ],
        different: [
          t('Tidak semua alat memakai Virtual DOM. Svelte menerjemahkan kode saat build, jadi langsung memperbarui DOM.'),
          t('State di memori komponen hilang saat halaman di-refresh, tidak seperti data yang tersimpan di server.'),
        ],
        riskyAnalogy: false,
      }),
      simStep(
        'menara-alat',
        t('Amati alur komponen dan fitur yang diuji bertahap di simulasi Menara Alat.'),
      ),
      qStep({
        id: 'a11-l02-q3',
        type: 'spotbug',
        prompt: t('Angka di tombol tidak bertambah saat diklik. Ketuk baris penyebabnya.'),
        difficulty: 2,
        lines: [
          'function TombolSuka() {',
          '  const [suka, setSuka] = useState(0);',
          '  const tambah = () => { suka = suka + 1; };',
          '  return <button onClick={tambah}>Suka: {suka}</button>;',
          '}',
        ],
        answer: [3],
        explainCorrect: t('Baris 3 mengubah suka secara langsung. Panggil setSuka(suka + 1) supaya React memperbarui tampilan.'),
        hints: [t('Cari baris yang mengubah suka tanpa fungsi pengubahnya.'), undefined],
        tags: ['react-komponen'],
      }),
      qStep(
        makeMcq({
          id: 'a11-l02-q4',
          type: 'limit',
          analogy: t('Virtual DOM sebagai kertas buram di semua framework'),
          prompt: t('Mengapa tidak tepat mengatakan semua framework modern memakai Virtual DOM?'),
          choices: [
            { id: 'sv', label: t('Svelte menerjemahkan kode saat build, tanpa Virtual DOM') },
            {
              id: 'no',
              label: t('Hanya Angular yang memakai Virtual DOM di antara framework populer'),
              explainWrong: t('React dan Vue memakai Virtual DOM. Angular justru tidak memakainya.'),
            },
            {
              id: 'css',
              label: t('Virtual DOM hanya dipakai di sisi server saja'),
              explainWrong: t('Virtual DOM berupa salinan struktur tampilan di memori browser.'),
            },
          ],
          answer: 'sv',
          explainCorrect: t('React dan Vue memakai Virtual DOM, tetapi Svelte bekerja sebagai compiler saat build.'),
          hints: [t('Ingat alat yang bekerja saat build, bukan saat halaman jalan.')],
          tags: ['react-komponen'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a11-l02-q5',
          type: 'scenario',
          story: t('Tim perusahaan besar ingin framework yang sudah lengkap: routing, form, dan permintaan data sudah ada. Mereka juga mewajibkan TypeScript.'),
          prompt: t('Pilihan mana yang paling cocok untuk kebutuhan tim itu?'),
          difficulty: 2,
          choices: [
            { id: 'ang', label: t('Angular') },
            {
              id: 'jq',
              label: t('jQuery'),
              explainWrong: t('jQuery adalah library lama untuk mengubah DOM, tanpa arsitektur komponen modern.'),
            },
            {
              id: 'plain',
              label: t('React tanpa library tambahan'),
              explainWrong: t('React hanya library UI. Tim harus memilih sendiri router dan pengelola form.'),
            },
          ],
          answer: 'ang',
          explainCorrect: t('Angular sudah lengkap sejak awal, dengan aturan ketat dan TypeScript.'),
          hints: [t('Cari yang sudah lengkap dan ketat sejak awal.')],
          tags: ['react-komponen', 'library-framework'],
        }),
      ),
      qStep({
        id: 'a11-l02-q6',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi pasangan jenis situs dan meta-framework yang cocok.'),
        template: 'Blog dan dokumentasi yang ringan memakai ___, tetapi aplikasi React yang butuh render server dan SEO memakai ___.',
        bank: ['Astro', 'Next.js', 'Redux', 'Vite'],
        answer: ['Astro', 'Next.js'],
        explainCorrect: t('Astro unggul untuk situs konten yang ringan. Next.js menjadi pasangan umum React.'),
        hints: [t('Satu meta-framework cocok untuk konten, satu lagi dibangun di atas React.'), undefined],
        tags: ['react-komponen'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a11-l02-r1',
        prompt: t('Apa fungsi JSX di komponen React?'),
        choices: [
          { id: 'jsx', label: t('Menulis tampilan mirip HTML di dalam kode JavaScript') },
          {
            id: 'sql',
            label: t('Menyimpan data komponen ke server database'),
            explainWrong: t('JSX tidak menyimpan data. Fungsinya menuliskan tampilan di kode.'),
          },
          {
            id: 'sty',
            label: t('Mengatur gaya warna dan ukuran komponen'),
            explainWrong: t('JSX tidak mengatur gaya. Gaya dipegang oleh CSS.'),
          },
        ],
        answer: 'jsx',
        explainCorrect: t('JSX memudahkan penulisan struktur tampilan di dalam fungsi komponen.'),
        tags: ['react-komponen'],
      }),
      makeTf({
        id: 'a11-l02-r2',
        prompt: t('Redux, Zustand, dan Pinia dipakai untuk State Management agar banyak komponen berbagi data.'),
        answer: true,
        explainCorrect: t('Pinia populer di Vue. Redux dan Zustand populer di React.'),
        explainWrong: t('Ketiganya adalah pustaka state management untuk berbagi data antar komponen.'),
        tags: ['react-komponen'],
      }),
    ],
    recap: t('Pilih satu ekosistem: React/Next.js, Vue/Nuxt, Angular, atau Svelte/SvelteKit. Konsep Component, Props, State, dan Routing berlaku di semuanya.'),
  }),

  makeLesson({
    id: 'a11-l03',
    worldId: 'a11',
    title: 'Tailwind vs Bootstrap',
    modes: ['pro'],
    objective: t('Kamu bisa membandingkan Tailwind dan Bootstrap, tiga cara merender halaman (CSR, SSR, SSG), dan alat pendukung frontend.'),
    estMinutes: 6,
    introducesTerms: ['tailwind-css'],
    usesTerms: ['library-framework', 'react-komponen', 'css', 'class-css', 'server'],
    atWork: 'Kamu akan memilih Tailwind atau Bootstrap, dan mode render, saat tim memulai proyek web baru.',
    warmupFrom: 'a11-l02',
    steps: [
      storyStep('a11/tailwind-bootstrap.svg', [
        rText(
          'Tim Toko Rani memilih cara menata tampilan. Bootstrap seperti baju jadi yang cepat dipakai, Tailwind seperti kain dan penjahit yang hasilnya pas.',
        ),
      ]),
      conceptStep({
        title: t('Utility-first dan component-first'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a11', topic: 'tailwind-vs-bootstrap' },
        alt: t('Perbandingan tombol Bootstrap class btn btn-primary dan Tailwind class bg-blue-600 px-4 py-2.'),
        code: {
          lang: 'html',
          code: '<!-- Bootstrap (component-first) -->\n<button class="btn btn-primary">Simpan</button>\n<!-- Tailwind (utility-first) -->\n<button class="bg-blue-600 text-white px-4 py-2 rounded-lg">Simpan</button>',
        },
        body: [
          rTerm('tailwind-css', 'Tailwind'),
          rText(' memakai pendekatan utility-first, yaitu menyusun tampilan dari class kecil seperti '),
          rCode('p-4, flex'),
          rText('. '),
          rBold('Bootstrap'),
          rText(' memakai pendekatan component-first, yaitu komponen jadi seperti '),
          rCode('btn btn-primary'),
          rText('. Ada juga UI kit, yaitu kumpulan komponen siap pakai, seperti shadcn/ui dan MUI.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a11-l03-q2',
          type: 'analogy',
          prompt: t('Apa arti pendekatan utility-first di Tailwind CSS?'),
          choices: [
            { id: 'util', label: t('Menata elemen dengan class kecil seperti p-4 dan flex') },
            {
              id: 'one',
              label: t('Memakai satu class btn-primary untuk semua jenis elemen'),
              explainWrong: t('Itu gaya component-first, seperti Bootstrap.'),
            },
            {
              id: 'nocss',
              label: t('Menulis semua CSS di satu file yang besar'),
              explainWrong: t('Tailwind justru menghasilkan file CSS dari class-class kecil itu.'),
            },
          ],
          answer: 'util',
          explainCorrect: t('Class kecil memberi kontrol tinggi tanpa perlu menamai class baru terus-menerus.'),
          hints: [t('Utility berarti satu class untuk satu tugas kecil.')],
          tags: ['tailwind-css', 'class-css'],
        }),
      ),
      conceptStep({
        title: t('Cara halaman dirender: CSR, SSR, SSG'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'a11', topic: 'csr-ssr-ssg' },
        alt: t('CSR dirakit browser, SSR dimasak server tiap permintaan, SSG dibuat sekali saat build.'),
        body: [
          rBold('CSR'),
          rText(' mengirim halaman kosong, lalu JavaScript merakitnya di browser, seperti perabot rakitan. '),
          rBold('SSR'),
          rText(' menyusun halaman di '),
          rTerm('server', 'server'),
          rText(' setiap ada permintaan, seperti masakan yang dimasak saat dipesan. '),
          rBold('SSG'),
          rText(' membuat halaman sekali saat build, seperti roti yang siap diambil.'),
        ],
      }),
      conceptStep({
        title: t('Perkakas pendukung modern'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a11', topic: 'alat-pendukung-fe' },
        alt: t('TypeScript, Node.js, npm dan pnpm, Vite, ESLint, Prettier.'),
        body: [
          rBold('TypeScript'),
          rText(' adalah JavaScript dengan pengecekan tipe data sebelum kode jalan. '),
          rBold('Node.js'),
          rText(' menjalankan JavaScript di luar browser. '),
          rBold('npm dan pnpm'),
          rText(' mengunduh paket kode orang lain. '),
          rBold('Vite'),
          rText(' menjalankan dan mengemas proyek dengan cepat; '),
          rBold('ESLint dan Prettier'),
          rText(' mengecek dan merapikan kode.'),
        ],
      }),
      qStep({
        id: 'a11-l03-q1',
        type: 'match',
        prompt: t('Pasangkan cara render halaman dengan perumpamaannya.'),
        difficulty: 2,
        left: [
          { id: 'csr', label: t('CSR (Client-Side Rendering)') },
          { id: 'ssr', label: t('SSR (Server-Side Rendering)') },
          { id: 'ssg', label: t('SSG (Static Site Generation)') },
        ],
        right: [
          { id: 'r1', label: t('Roti yang sudah dipanggang pagi hari, tinggal diambil') },
          { id: 'r2', label: t('Perabot rakitan yang tiba kosong lalu dirakit di rumah') },
          { id: 'r3', label: t('Masakan yang dimasak setiap ada pesanan masuk') },
        ],
        answer: { csr: 'r2', ssr: 'r3', ssg: 'r1' },
        explainCorrect: t('CSR merakit di browser. SSR menyusun di server per permintaan, dan SSG sekali saat build.'),
        hints: [t('Tanyakan: halaman dibuat di mana, dan kapan?'), undefined],
        tags: ['tailwind-css'],
      }),
      limitStep({
        analogy: t('Baju jadi (Bootstrap) dan penjahit (Tailwind), serta perabot rakitan, masakan, dan roti untuk CSR, SSR, SSG'),
        same: [t('Analogi ini menunjukkan pilihan antara cepat dipakai dan bebas diubah.')],
        different: [
          t('Meta-framework seperti Next.js atau Nuxt bisa mencampur SSG untuk beranda, SSR untuk halaman produk, dan CSR untuk dashboard.'),
          t('Tailwind tetap butuh pemahaman CSS dasar di balik nama class-nya.'),
        ],
        riskyAnalogy: false,
      }),
      simStep(
        'menara-alat',
        t('Amati rangkaian alat modern, dari menulis kode sampai mengemas proyek, di Menara Alat.'),
      ),
      qStep({
        id: 'a11-l03-q3',
        type: 'sort',
        prompt: t('Kelompokkan alat pendukung frontend ini sesuai tugas utamanya.'),
        difficulty: 2,
        items: [
          { id: 'ts', label: t('TypeScript (cek tipe sebelum kode jalan)') },
          { id: 'npm', label: t('npm atau pnpm (mengunduh paket)') },
          { id: 'vite', label: t('Vite (menjalankan dan mengemas proyek)') },
          { id: 'pret', label: t('Prettier (merapikan format kode)') },
        ],
        bins: [
          { id: 'code', label: t('Menjaga kualitas kode'), icon: 'shield' },
          { id: 'build', label: t('Mengelola paket dan build'), icon: 'package' },
        ],
        answer: { ts: 'code', npm: 'build', vite: 'build', pret: 'code' },
        explainCorrect: t('TypeScript dan Prettier menjaga kode rapi dan aman. npm dan Vite mengelola paket serta build.'),
        hints: [t('Tanyakan: alat ini menjaga isi kode, atau mengurus paket dan hasil akhir?'), undefined],
        tags: ['tailwind-css'],
      }),
      qStep(
        makeMcq({
          id: 'a11-l03-q4',
          type: 'limit',
          analogy: t('Memilih antara CSR, SSR, atau SSG sebagai satu cara tunggal'),
          prompt: t('Apa yang bisa dilakukan satu aplikasi di meta-framework seperti Next.js atau Nuxt?'),
          choices: [
            { id: 'hyb', label: t('Menggabungkan SSG, SSR, dan CSR di halaman berbeda') },
            {
              id: 'one',
              label: t('Memakai satu cara render yang sama di semua halaman'),
              explainWrong: t('Meta-framework membolehkan cara render berbeda untuk tiap halaman.'),
            },
            {
              id: 'tw',
              label: t('Memakai Tailwind hanya pada halaman mode CSR'),
              explainWrong: t('Tailwind CSS bekerja di CSR, SSR, maupun SSG.'),
            },
          ],
          answer: 'hyb',
          explainCorrect: t('Halaman artikel bisa memakai SSG, tetapi keranjang atau dashboard memakai SSR atau CSR.'),
          hints: [t('Satu aplikasi besar punya halaman dengan kebutuhan berbeda.')],
          tags: ['tailwind-css'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a11-l03-q5',
          type: 'scenario',
          story: t('Raka membuat aplikasi React dengan Tailwind. Ia ingin komponen siap pakai yang kodenya disalin langsung ke foldernya, supaya bebas diubah.'),
          prompt: t('Pustaka komponen mana yang paling cocok untuk Raka?'),
          difficulty: 2,
          choices: [
            { id: 'sh', label: t('shadcn/ui') },
            {
              id: 'jq',
              label: t('MUI'),
              explainWrong: t('MUI dipasang sebagai paket. Kodenya tidak disalin ke proyekmu.'),
            },
            {
              id: 'bs',
              label: t('Bootstrap CSS tanpa React'),
              explainWrong: t('Bootstrap memakai CSS-nya sendiri dan bukan komponen React, jadi tidak menyatu dengan proyek Tailwind Raka.'),
            },
          ],
          answer: 'sh',
          explainCorrect: t('shadcn/ui menyalin kode komponen React dan Tailwind ke proyek, jadi bebas diubah.'),
          hints: [t('Cari yang kodenya disalin ke foldermu, bukan dipasang sebagai paket.')],
          tags: ['tailwind-css', 'react-komponen'],
        }),
      ),
      qStep({
        id: 'a11-l03-q6',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi urutan belajar frontend yang masuk akal.'),
        template: 'HTML + CSS -> ___ -> Tailwind CSS -> React atau Vue -> ___',
        bank: ['JavaScript dasar', 'Next.js / Nuxt', 'jQuery', 'Assembly'],
        answer: ['JavaScript dasar', 'Next.js / Nuxt'],
        explainCorrect: t('Dasar web selalu datang dulu. Baru setelah itu Tailwind, React atau Vue, dan meta-framework.'),
        hints: [t('Belajar dasar dulu, lalu alat yang dibangun di atasnya.'), undefined],
        tags: ['tailwind-css', 'library-framework'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a11-l03-r1',
        prompt: t('Alat mana yang berperan seperti toko aplikasi untuk mengunduh library ke proyek JavaScript?'),
        choices: [
          { id: 'npm', label: t('npm, pnpm, atau yarn') },
          {
            id: 'pret',
            label: t('ESLint dan Prettier'),
            explainWrong: t('ESLint dan Prettier mengecek dan merapikan kode, bukan mengunduh paket.'),
          },
          {
            id: 'vite',
            label: t('Vite dan TypeScript'),
            explainWrong: t('Vite menjalankan dan mengemas proyek. Pengunduh paketnya adalah npm.'),
          },
        ],
        answer: 'npm',
        explainCorrect: t('Package manager seperti npm dan pnpm memasang library ke proyekmu.'),
        tags: ['tailwind-css'],
      }),
      makeTf({
        id: 'a11-l03-r2',
        prompt: t('ESLint mencari potensi kesalahan kode, dan Prettier merapikan format penulisan secara otomatis.'),
        answer: true,
        explainCorrect: t('Keduanya sering dipasang berdampingan di editor kode.'),
        explainWrong: t('ESLint memeriksa aturan dan kesalahan kode. Prettier mengatur indentasi dan spasi.'),
        tags: ['tailwind-css'],
      }),
    ],
    recap: t('Tailwind menata tampilan lewat class kecil, Bootstrap lewat komponen jadi. Halaman bisa dirender dengan CSR, SSR, atau SSG.'),
  }),

  makeLesson({
    id: 'a11-l04',
    worldId: 'a11',
    title: 'Performa: Core Web Vitals',
    modes: ['pro'],
    objective: t('Kamu bisa menjelaskan LCP, INP, dan CLS, lalu memakai teknik untuk mempercepat halaman.'),
    estMinutes: 6,
    introducesTerms: ['core-web-vitals'],
    usesTerms: ['browser', 'server', 'css', 'javascript', 'komponen-ui'],
    atWork: 'Kamu akan membuka Lighthouse di Chrome saat halaman produk lambat dan mengecek skor LCP, INP, dan CLS.',
    warmupFrom: 'a11-l03',
    steps: [
      storyStep('a11/core-web-vitals.svg', [
        rText(
          'Halaman produk Toko Rani lambat dan pengunjung pergi. Core Web Vitals adalah tiga ukuran kecepatan halaman, seperti menilai sebuah restoran.',
        ),
      ]),
      conceptStep({
        title: t('Tiga ukuran Core Web Vitals'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a11', topic: 'cwv-lcp-inp-cls' },
        alt: t('LCP di bawah 2,5 detik, INP di bawah 200 ms, CLS di bawah 0,1.'),
        body: [
          rTerm('core-web-vitals', 'Core Web Vitals'),
          rText(' punya tiga ukuran. '),
          rBold('LCP'),
          rText(' mengukur kapan isi utama muncul, targetnya di bawah 2,5 detik. '),
          rBold('INP'),
          rText(' mengukur seberapa cepat halaman menanggapi klik, targetnya di bawah 200 ms. '),
          rBold('CLS'),
          rText(' mengukur kestabilan tata letak, targetnya di bawah 0,1.'),
        ],
      }),
      qStep({
        id: 'a11-l04-q1',
        type: 'match',
        prompt: t('Pasangkan ukuran Core Web Vitals dengan batas nilai "Baik"-nya.'),
        difficulty: 2,
        left: [
          { id: 'lcp', label: t('LCP (Largest Contentful Paint)') },
          { id: 'inp', label: t('INP (Interaction to Next Paint)') },
          { id: 'cls', label: t('CLS (Cumulative Layout Shift)') },
        ],
        right: [
          { id: 'r1', label: t('Di bawah 0,1 (tata letak tidak loncat)') },
          { id: 'r2', label: t('Di bawah 2,5 detik (isi utama tampil)') },
          { id: 'r3', label: t('Di bawah 200 milidetik (respons klik)') },
        ],
        answer: { lcp: 'r2', inp: 'r3', cls: 'r1' },
        explainCorrect: t('LCP di bawah 2,5 detik, INP di bawah 200 ms, dan CLS di bawah 0,1.'),
        hints: [t('CLS adalah angka kecil tanpa satuan waktu.'), undefined],
        tags: ['core-web-vitals'],
      }),
      conceptStep({
        title: t('Optimasi gambar, kode, dan font'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a11', topic: 'optimasi-aset' },
        alt: t('Format gambar WebP dan AVIF, loading lazy, minify, code splitting, dan font-display swap.'),
        code: {
          lang: 'html',
          code: '<img src="sepatu.webp" width="400" height="300" loading="lazy" alt="Sepatu lari">',
        },
        body: [
          rText('Penyebab lambat nomor satu adalah gambar besar, jadi kecilkan dimensinya dan pakai format '),
          rBold('WebP atau AVIF'),
          rText('. Pasang '),
          rCode('loading="lazy"'),
          rText(' untuk gambar di bawah layar, dan tulis '),
          rCode('width'),
          rText(' dan '),
          rCode('height'),
          rText(' agar layar tidak meloncat. Aktifkan minify (menghapus spasi dan komentar kode) dan code splitting (memecah kode per halaman), lalu atur '),
          rCode('font-display: swap'),
          rText('.'),
        ],
      }),
      conceptStep({
        title: t('Caching, CDN, dan perceived performance'),
        visualName: 'RestoranDiagram',
        visualProps: { worldId: 'a11', topic: 'caching-cdn' },
        alt: t('CDN seperti minimarket di tiap kecamatan, caching seperti stok mi instan di rumah.'),
        body: [
          rBold('CDN'),
          rText(' adalah jaringan server di banyak kota, seperti minimarket di tiap kecamatan: pengunjung dilayani dari server terdekat. '),
          rBold('Caching'),
          rText(' menyimpan salinan file di browser, seperti stok di rumah, jadi kunjungan ulang tidak mengunduh lagi. '),
          rBold('Skeleton'),
          rText(' adalah kerangka abu-abu yang tampil selagi isi dimuat, jadi halaman terasa lebih cepat.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a11-l04-q2',
          type: 'analogy',
          prompt: t('Mengapa CDN sering disamakan dengan minimarket yang punya cabang di tiap kecamatan?'),
          choices: [
            { id: 'near', label: t('Salinan file ada di banyak kota, jadi dilayani dari yang terdekat') },
            {
              id: 'sell',
              label: t('CDN memperkecil ukuran setiap file supaya cepat dikirim ke pengunjung'),
              explainWrong: t('CDN tidak mengubah ukuran file. Ia hanya mengirim salinan dari lokasi terdekat.'),
            },
            {
              id: 'del',
              label: t('CDN membuat server pusat bekerja lebih kuat dan cepat'),
              explainWrong: t('CDN tidak memperkuat server pusat. Ia menaruh salinan file di dekat pengunjung.'),
            },
          ],
          answer: 'near',
          explainCorrect: t('Jarak jaringan yang lebih dekat membuat file lebih cepat sampai. Seperti membeli di minimarket dekat rumah.'),
          hints: [t('Pikirkan jarak antara pengunjung dan sumber file.')],
          tags: ['core-web-vitals', 'server'],
        }),
      ),
      limitStep({
        analogy: t('Restoran cepat, minimarket CDN, dan stok di rumah (caching)'),
        same: [
          t('CDN mendekatkan file ke pengunjung, dan cache menyimpan salinan di browser, jadi waktu tunggu berkurang.'),
        ],
        different: [
          t('Gambar paling atas layar (kandidat LCP) tidak boleh diberi loading="lazy", karena browser jadi menunda memuatnya.'),
          t('Skeleton hanya membuat halaman terasa cepat. File yang berat tetap harus dikecilkan.'),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'menara-alat',
        t('Amati tahap pengemasan dan pemeriksaan kecepatan sebelum tayang di Menara Alat.'),
      ),
      qStep({
        id: 'a11-l04-q3',
        type: 'spotbug',
        prompt: t('Halaman ini lambat tampil dan layarnya meloncat. Ketuk baris penyebabnya.'),
        difficulty: 2,
        lines: [
          '<main>',
          '  <img src="banner-utama.png" loading="lazy" alt="Promo">',
          '  <h1>Koleksi Baru</h1>',
          '  <img src="galeri-1.png" loading="lazy" width="400" height="300" alt="Sepatu lari">',
          '</main>',
        ],
        answer: [2],
        explainCorrect: t('Baris 2 memasang loading="lazy" pada banner utama, padahal gambar itu harus dimuat paling dulu, dan width serta height belum ada. Gambar galeri di bawah boleh lazy.'),
        hints: [t('Cari gambar yang paling dulu terlihat, lalu cek atributnya.'), undefined],
        tags: ['core-web-vitals'],
      }),
      qStep(
        makeMcq({
          id: 'a11-l04-q4',
          type: 'limit',
          analogy: t('Memasang loading="lazy" pada semua gambar agar cepat'),
          prompt: t('Pada gambar mana loading="lazy" sebaiknya tidak dipasang?'),
          choices: [
            { id: 'above', label: t('Gambar utama di atas layar yang menjadi LCP') },
            {
              id: 'foot',
              label: t('Gambar galeri di bawah halaman yang harus digulir'),
              explainWrong: t('Gambar di bagian bawah halaman justru cocok memakai loading="lazy".'),
            },
            {
              id: 'webp',
              label: t('Gambar WebP di bagian bawah artikel'),
              explainWrong: t('Format WebP di bagian bawah tetap boleh dimuat lazy.'),
            },
          ],
          answer: 'above',
          explainCorrect: t('Lazy loading pada gambar hero teratas malah menunda browser memuat elemen LCP.'),
          hints: [t('Gambar yang terlihat paling dulu harus dimuat paling dulu.')],
          tags: ['core-web-vitals'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a11-l04-q5',
          type: 'scenario',
          story: t('Sari mau mengetuk tautan "Baca Berita", tetapi foto iklan di atasnya baru selesai dimuat. Tautan bergeser turun dan Sari salah mengetuk iklan.'),
          prompt: t('Ukuran mana yang buruk, dan apa solusinya?'),
          difficulty: 2,
          choices: [
            { id: 'cls', label: t('CLS buruk; beri ukuran tetap pada gambar iklan') },
            {
              id: 'inp',
              label: t('INP buruk; kurangi script yang menahan klik'),
              explainWrong: t('INP mengukur kecepatan tanggapan klik. Tautan yang bergeser adalah masalah CLS.'),
            },
            {
              id: 'lcp',
              label: t('LCP buruk; kecilkan gambar iklan agar lekas muncul'),
              explainWrong: t('LCP mengukur kapan isi utama muncul. Tautan yang bergeser adalah masalah CLS.'),
            },
          ],
          answer: 'cls',
          explainCorrect: t('Dengan width dan height, browser mencadangkan ruang gambar. Halaman tidak bergeser saat gambar tiba.'),
          hints: [t('Yang bermasalah adalah letak tautan, bukan kecepatan klik.')],
          tags: ['core-web-vitals'],
        }),
      ),
      qStep({
        id: 'a11-l04-q6',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi dua teknik memperkecil dan memecah file JavaScript dan CSS.'),
        template: 'Menghapus spasi dan komentar dari file kode disebut ___, tetapi memecah file agar tiap halaman hanya memuat kode yang ia butuhkan disebut ___.',
        bank: ['Minify', 'Code splitting', 'Caching', 'Lazy loading'],
        answer: ['Minify', 'Code splitting'],
        explainCorrect: t('Build tool seperti Vite melakukan keduanya secara otomatis, jadi file tetap ringan.'),
        hints: [t('Satu istilah soal memperkecil, satu lagi soal memecah.'), undefined],
        tags: ['core-web-vitals'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a11-l04-r1',
        prompt: t('Apa penyebab nomor satu halaman terasa lambat dibuka?'),
        choices: [
          { id: 'img', label: t('Ukuran file gambar yang terlalu besar') },
          {
            id: 'h1',
            label: t('Terlalu banyak teks di halaman'),
            explainWrong: t('Teks sangat ringan. Gambar besar yang paling sering memperlambat.'),
          },
          {
            id: 'name',
            label: t('Nama file yang terlalu panjang'),
            explainWrong: t('Panjang nama file nyaris tidak berpengaruh. Ukuran file gambarnya yang berat.'),
          },
        ],
        answer: 'img',
        explainCorrect: t('Kecilkan dimensi gambar dan pakai format modern seperti WebP atau AVIF.'),
        tags: ['core-web-vitals'],
      }),
      makeTf({
        id: 'a11-l04-r2',
        prompt: t('Dengan font-display: swap, teks tampil dengan huruf cadangan selagi font khusus diunduh.'),
        answer: true,
        explainCorrect: t('Teks tetap terbaca selama font diunduh.'),
        explainWrong: t('Dengan swap, layar tidak kosong. Huruf cadangan tampil dulu.'),
        tags: ['core-web-vitals', 'css'],
      }),
    ],
    recap: t('Jaga LCP di bawah 2,5 detik, INP di bawah 200 ms, CLS di bawah 0,1. Kecilkan gambar dan pakai CDN.'),
  }),

  makeLesson({
    id: 'a11-l05',
    worldId: 'a11',
    title: 'SEO dasar',
    modes: ['pro'],
    objective: t('Kamu bisa menata judul, deskripsi, struktur halaman, URL, dan tag pratinjau tautan supaya mudah ditemukan.'),
    estMinutes: 6,
    introducesTerms: ['seo'],
    usesTerms: ['html', 'semantik', 'alt-text', 'url', 'core-web-vitals', 'tailwind-css'],
    atWork: 'Kamu akan menulis title, meta description, dan Open Graph saat halaman produk baru siap tayang.',
    warmupFrom: 'a11-l04',
    steps: [
      storyStep('a11/seo-katalog.svg', [
        rText(
          'Halaman toko Rani tidak muncul di hasil pencarian. SEO adalah cara merapikan halaman supaya mudah ditemukan, seperti sampul dan nomor rak buku di perpustakaan.',
        ),
      ]),
      conceptStep({
        title: t('Judul, meta description, dan Open Graph'),
        visualName: 'HtmlTreeDiagram',
        visualProps: { worldId: 'a11', topic: 'seo-head-meta' },
        alt: t('Title, meta description, dan og:title di dalam head halaman.'),
        code: {
          lang: 'html',
          code: '<title>Sepatu Lari Ringan | Toko Rani</title>\n<meta name="description" content="Sepatu lari empuk untuk harian.">\n<meta property="og:title" content="Sepatu Lari Ringan">',
        },
        body: [
          rTerm('seo', 'SEO'),
          rText(' dimulai dari '),
          rCode('<head>'),
          rText(', bagian kode yang tidak tampil di halaman. Buat '),
          rCode('<title>'),
          rText(' yang unik dan jelas, serta '),
          rCode('<meta name="description">'),
          rText(' berisi 1 sampai 2 kalimat ringkas. Tambah Open Graph ('),
          rCode('og:title, og:image'),
          rText(') supaya tautan tampil bagus saat dibagikan.'),
        ],
      }),
      qStep({
        id: 'a11-l05-q2',
        type: 'spotbug',
        prompt: t('Ketuk baris yang membuat halaman ini sulit dibedakan di hasil pencarian.'),
        difficulty: 2,
        lines: [
          '<head>',
          '  <title>Beranda</title>',
          '  <meta name="description" content="Toko sepatu lari ringan dan nyaman untuk pemula.">',
          '</head>',
        ],
        answer: [2],
        explainCorrect: t('Baris 2 hanya menulis "Beranda", terlalu umum. Buat judul unik yang menyebut isi tiap halaman.'),
        hints: [t('Cari judul yang terlalu umum untuk dibedakan mesin pencari.'), undefined],
        tags: ['seo'],
      }),
      conceptStep({
        title: t('Struktur HTML, alt text, dan URL bermakna'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a11', topic: 'seo-struktur-url' },
        alt: t('Satu h1 per halaman, urutan h2 dan h3 rapi, alt text gambar, dan URL /produk/sepatu-lari.'),
        body: [
          rText('Pasang tepat satu '),
          rCode('<h1>'),
          rText(' per halaman, dengan urutan heading yang benar. Pakai '),
          rTerm('semantik', 'HTML semantik'),
          rText(' dan '),
          rTerm('alt-text', 'alt text'),
          rText(' pada gambar. Pilih '),
          rTerm('url', 'URL'),
          rText(' yang bermakna, seperti '),
          rCode('/produk/sepatu-lari'),
          rText(', bukan '),
          rCode('/p?id=8812'),
          rText('.'),
        ],
      }),
      conceptStep({
        title: t('Kecepatan, SSR/SSG, dan audit Lighthouse'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a11', topic: 'seo-ssr-lighthouse' },
        alt: t('Halaman ramah HP, Core Web Vitals cepat, SSR atau SSG, dan audit tab Lighthouse.'),
        body: [
          rText('Mesin pencari menyukai halaman ramah HP dengan '),
          rTerm('core-web-vitals', 'Core Web Vitals'),
          rText(' yang baik. Untuk situs yang bergantung pada pencarian, pertimbangkan '),
          rBold('SSR atau SSG'),
          rText(' (halaman disusun di server, bukan di browser). Cek hasilnya di tab '),
          rBold('Lighthouse'),
          rText(' (alat audit di DevTools) atau PageSpeed Insights.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a11-l05-q1',
          prompt: t('URL halaman produk mana yang paling ramah SEO dan mudah dipahami manusia?'),
          choices: [
            { id: 'good', label: t('https://toko-rani.example/produk/sepatu-lari') },
            {
              id: 'num',
              label: t('https://toko-rani.example/p?id=8812'),
              explainWrong: t('Angka ID acak tidak menjelaskan isi produk.'),
            },
            {
              id: 'mix',
              label: t('https://toko-rani.example/x99/a/halaman-baru?k=1&z=0'),
              explainWrong: t('Kode acak sulit dibaca pengunjung dan mesin pencari.'),
            },
          ],
          answer: 'good',
          explainCorrect: t('URL yang menyebut isi halaman mudah dipahami manusia dan mesin pencari.'),
          hints: [t('Pilih alamat yang bisa kamu tebak isinya dari katanya.')],
          tags: ['seo', 'url'],
        }),
      ),
      limitStep({
        analogy: t('SEO seperti menata sampul dan kartu katalog perpustakaan'),
        same: [
          t('Judul akurat, ringkasan jelas, dan alamat rak yang rapi membantu mesin pencari memahami topik halaman.'),
        ],
        different: [
          t('Tag SEO yang rapi tidak otomatis menaikkan peringkat kalau isi halamannya tipis atau tidak menjawab kebutuhan pencari.'),
          t('Menjejalkan kata kunci berulang-ulang secara tidak wajar bisa dianggap spam.'),
        ],
        riskyAnalogy: false,
      }),
      simStep(
        'menara-alat',
        t('Amati tahap pengujian dan audit akhir di Menara Alat sebelum situs tayang.'),
      ),
      qStep({
        id: 'a11-l05-q3',
        type: 'sort',
        prompt: t('Kelompokkan hal ini ke Membantu SEO atau Menghambat SEO.'),
        difficulty: 2,
        items: [
          { id: 's1', label: t('Satu <h1> yang jelas dan tag semantik yang rapi') },
          { id: 's2', label: t('Halaman lambat di HP dan gambar tanpa alt') },
          { id: 's3', label: t('Open Graph og:title dan og:image') },
          { id: 's4', label: t('Judul "Website Saya" di semua halaman') },
        ],
        bins: [
          { id: 'good', label: t('Membantu SEO'), icon: 'search' },
          { id: 'bad', label: t('Menghambat SEO'), icon: 'bug' },
        ],
        answer: { s1: 'good', s2: 'bad', s3: 'good', s4: 'bad' },
        explainCorrect: t('Judul unik, alt text, dan halaman cepat mendukung SEO. Halaman lambat dan judul yang sama di semua halaman menghambatnya.'),
        hints: [t('Tanyakan: apakah hal ini membuat halaman lebih jelas bagi mesin pencari?'), undefined],
        tags: ['seo', 'semantik'],
      }),
      qStep(
        makeMcq({
          id: 'a11-l05-q4',
          type: 'limit',
          analogy: t('SEO sebagai sampul dan label katalog perpustakaan'),
          prompt: t('Apa yang tidak otomatis terjamin, walaupun title, meta, dan heading sudah rapi?'),
          choices: [
            { id: 'qual', label: t('Isi artikel yang bermanfaat tetap menentukan peringkat') },
            {
              id: 'share',
              label: t('Gambar pratinjau tampil rapi saat tautan dibagikan di grup pesan'),
              explainWrong: t('Open Graph memang mengatur pratinjau tautan.'),
            },
            {
              id: 'bot',
              label: t('Mesin pencari lebih mudah mengenali topik halaman'),
              explainWrong: t('Struktur semantik memang membantu mesin pencari membaca halaman.'),
            },
          ],
          answer: 'qual',
          explainCorrect: t('SEO teknis memudahkan mesin pencari membaca halaman, tetapi isi yang bermutu yang memenangkan pembaca.'),
          hints: [t('Tag yang rapi hanyalah pintu masuk. Apa yang ada di dalamnya?')],
          tags: ['seo'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a11-l05-q5',
          type: 'scenario',
          story: t('Nadia membagikan tautan blog barunya di grup pesan. Gambar pratinjau dan judul kartunya tidak muncul.'),
          prompt: t('Tag apa yang lupa Nadia pasang di <head>?'),
          difficulty: 2,
          choices: [
            { id: 'og', label: t('Tag og:title dan og:image') },
            {
              id: 'lazy',
              label: t('Atribut loading="lazy" pada semua gambar di halaman'),
              explainWrong: t('loading="lazy" mengatur kapan gambar dimuat, bukan kartu pratinjau tautan.'),
            },
            {
              id: 'css',
              label: t('Tag meta viewport untuk layar HP'),
              explainWrong: t('Meta viewport mengatur tampilan di layar HP. Kartu pratinjau memakai Open Graph.'),
            },
          ],
          answer: 'og',
          explainCorrect: t('og:title, og:description, dan og:image mengatur kartu pratinjau saat tautan dibagikan.'),
          hints: [t('Pratinjau tautan memakai tag khusus untuk judul dan gambar.')],
          tags: ['seo'],
        }),
      ),
      qStep({
        id: 'a11-l05-q6',
        type: 'fill',
        difficulty: 2,
        prompt: t('Lengkapi nama alat audit di Chrome DevTools yang memberi skor Performance, Accessibility, Best Practices, dan SEO.'),
        template: 'Buka DevTools -> pilih tab ___ -> klik Analyze.',
        bank: ['Lighthouse', 'Console', 'Elements', 'Prettier'],
        answer: ['Lighthouse'],
        explainCorrect: t('Tab Lighthouse menilai empat aspek sekaligus dan memberi saran perbaikan.'),
        hints: [t('Cari tab yang dipakai untuk audit, bukan untuk melihat kode.'), undefined],
        tags: ['seo', 'core-web-vitals'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a11-l05-r1',
        prompt: t('Berapa jumlah <h1> yang dianjurkan per halaman?'),
        choices: [
          { id: 'one', label: t('Satu <h1> per halaman') },
          {
            id: 'five',
            label: t('Lima <h1> berukuran sama'),
            explainWrong: t('Terlalu banyak <h1> membingungkan susunan topik halaman.'),
          },
          {
            id: 'sect',
            label: t('Satu <h1> di setiap bagian halaman'),
            explainWrong: t('<h1> hanya satu per halaman. Bagian di bawahnya memakai <h2> dan <h3>.'),
          },
        ],
        answer: 'one',
        explainCorrect: t('Satu <h1> menandai topik utama halaman, lalu diikuti <h2> dan <h3> berurutan.'),
        tags: ['seo', 'semantik'],
      }),
      makeTf({
        id: 'a11-l05-r2',
        prompt: t('Tag <meta name="description"> merangkum isi halaman dalam 1-2 kalimat untuk hasil pencarian.'),
        answer: true,
        explainCorrect: t('Ringkasan ini sering tampil di bawah judul pada hasil pencarian.'),
        explainWrong: t('Meta description memang ringkasan singkat halaman untuk mesin pencari.'),
        tags: ['seo'],
      }),
    ],
    recap: t('Judul unik, meta description, Open Graph, satu <h1>, URL bermakna, dan halaman cepat membantu halaman ditemukan.'),
  }),

  makeLesson({
    id: 'a11-l06',
    worldId: 'a11',
    title: 'Git: titik simpan game',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menjelaskan commit, branch, dan merge seperti titik simpan game.',
      'Kamu bisa menjelaskan alur kerja Git, dari add, commit, branch, dan merge sampai push, pull, dan pull request.',
    ),
    estMinutes: 7,
    introducesTerms: ['git'],
    usesTerms: ['frontend', 'javascript'],
    atWork: 'Kamu akan membuat branch dan Pull Request setiap kali menambah fitur ke proyek tim.',
    stickerId: 'titik-simpan-git',
    warmupFrom: 'a11-l05',
    steps: [
      storyStep('a11/titik-simpan-git.svg', [
        rText(
          'Pernah main game lalu kalah dari bos? Untung ada titik simpan! Bagaimana menyimpan kerja kodemu seperti itu?',
          'Fitur baru di Toko Rani merusak halaman keranjang, dan kamu perlu kembali ke versi kemarin. Git adalah sistem pencatat riwayat kode, dan setiap commit adalah titik simpan seperti di game.',
        ),
      ]),
      conceptStep({
        title: t('Titik simpan dan jalur baru', 'Commit, branch, dan merge'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a11', topic: 'git-commit-branch-merge' },
        alt: t(
          'Garis utama dengan titik simpan, jalur baru, lalu penyatuan.',
          'Diagram garis main dengan titik commit, cabang fitur-keranjang, lalu merge.',
        ),
        body: [
          rTerm('git', 'Git', 'Git'),
          rText(
            ' adalah mesin titik simpan untuk kode. Satu titik simpan disebut ',
            ' mencatat riwayat kode. Satu ',
          ),
          rBold('commit', 'commit'),
          rText(
            ', dan jalur baru disebut ',
            ' adalah titik simpan dengan catatan perubahan. ',
          ),
          rBold('branch', 'Branch'),
          rText(
            '. Jalur yang sudah bagus disatukan lewat ',
            ' memisahkan cabang fitur dari jalur main. Lalu ',
          ),
          rBold('merge', 'merge'),
          rText('.', ' menggabungkannya kembali setelah fitur berhasil.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a11-l06-q1',
          type: 'analogy',
          prompt: t(
            'Di game, kamu menyimpan permainan. Apa yang mirip dengan itu di Git?',
            'Dalam analogi game, apa yang sama dengan satu commit di Git?',
          ),
          choices: [
            { id: 'save', label: t('Satu titik simpan', 'Satu titik simpan dengan catatan perubahan') },
            {
              id: 'del',
              label: t('Memulai game dari awal lagi', 'Mengulang proyek dari awal'),
              explainWrong: t(
                'Memulai dari awal bukan titik simpan. Titik simpan membuatmu bisa kembali ke tengah permainan.',
                'Commit tidak mengulang proyek. Commit menyimpan perubahan agar bisa ditelusuri atau dikembalikan.',
              ),
            },
            {
              id: 'tv',
              label: t('Menyalin game untuk temanmu', 'Menyalin proyek ke komputer rekan'),
              explainWrong: t(
                'Menyalin untuk teman itu seperti mengirim. Titik simpan hanya mencatat kemajuanmu.',
                'Menyalin ke rekan dilakukan lewat push atau clone, bukan commit.',
              ),
            },
          ],
          answer: 'save',
          explainCorrect: t(
            'Satu commit adalah satu titik simpan. Seperti game yang bisa kamu lanjutkan dari titik itu.',
            'Satu commit menyimpan kondisi kode dan catatannya. Catatan yang rinci membantu tim tahu apa yang berubah.',
          ),
          hints: [t('Ingat tombol simpan di game kesukaanmu.', 'Pikirkan apa yang disimpan saat kamu menekan simpan.')],
          tags: ['git'],
        }),
      ),
      conceptStep({
        title: t('Dari ubah sampai kirim', 'Perintah dasar Git sehari-hari'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a11', topic: 'perintah-git' },
        alt: t(
          'Empat langkah: ubah, pilih file, simpan, kirim.',
          'Urutan git init, git add, git commit, dan git push.',
        ),
        code: {
          lang: 'text',
          code: 'git init\ngit add .\ngit commit -m "Tambah halaman kontak"\ngit push',
        },
        body: [
          rJunior('Kamu mengubah kode lalu memilih file yang mau disimpan. Simpan dengan catatan, lalu kirim ke GitHub. GitHub adalah rak di internet, dan Git ada di laptopmu.'),
          rPro('Empat perintah dasar Git: '),
          rCode('git init', ['pro']),
          rPro(' memulai catatan (sekali di awal proyek), '),
          rCode('git add .', ['pro']),
          rPro(' memilih perubahan, '),
          rCode('git commit', ['pro']),
          rPro(' menyimpan titik, dan '),
          rCode('git push', ['pro']),
          rPro(' mengirimnya ke GitHub.'),
        ],
      }),
      conceptStep({
        title: t('Repo, Clone, Pull Request, Conflict'),
        modes: ['pro'],
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a11', topic: 'github-kolaborasi' },
        alt: t('Repository, clone ke laptop, Pull Request untuk tinjauan tim, dan mengatasi conflict.'),
        body: [
          rText(
            'Folder proyek yang dicatat Git disebut repository (repo). Kamu menyalinnya ke laptop dengan clone, lalu mengajukan perubahan lewat Pull Request (PR) supaya rekan bisa memeriksa. Kalau dua orang mengubah baris yang sama, terjadilah conflict. Kamu menyelesaikannya dengan memilih baris mana yang dipakai.',
          ),
        ],
      }),
      qStep({
        id: 'a11-l06-q2',
        type: 'order',
        prompt: t(
          'Urutkan langkah dari mengubah kode sampai terkirim ke GitHub.',
          'Urutkan langkah menyimpan perubahan kode sampai terkirim ke GitHub.',
        ),
        difficulty: 2,
        items: [
          { id: 'c', label: t('Simpan dengan catatan', 'Simpan titik dengan pesan (git commit)') },
          { id: 'p', label: t('Kirim ke GitHub', 'Kirim titik ke GitHub (git push)') },
          { id: 'e', label: t('Ubah kode di editor', 'Edit kode di VS Code') },
          { id: 'a', label: t('Pilih file yang mau disimpan', 'Pilih file yang mau disimpan (git add .)') },
        ],
        answer: ['e', 'a', 'c', 'p'],
        explainCorrect: t(
          'Kamu mengubah dulu, memilih file, menyimpan, lalu mengirim. Seperti menulis surat, memasukkannya ke amplop, lalu mengirimnya.',
          'Edit, add, commit, lalu push adalah ritme harian developer. Titik simpan harus ada sebelum bisa dikirim.',
        ),
        hints: [t('Ingat: ubah dulu, baru simpan.', 'Titik simpan harus dibuat sebelum dikirim.'), undefined],
        tags: ['git'],
      }),
      limitStep({
        analogy: t('Git seperti titik simpan dan jalur cerita alternatif di game'),
        same: [
          t(
            'Kamu bisa kembali ke titik simpan lama.',
            'Kamu bisa kembali ke titik simpan lama dan mencoba jalur baru dengan aman.',
          ),
        ],
        different: [
          t(
            'Di Git, banyak teman bisa bekerja bersamaan.',
            'Di game single-player hanya ada satu pemain. Di Git banyak developer mengedit file bersamaan, jadi bisa muncul conflict.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'menara-alat',
        t(
          'Ketuk titik simpan, jalur baru, lalu penyatuan di Menara Alat.',
          'Telusuri alur commit, branch, lalu merge pada simulasi Titik Simpan Git.',
        ),
      ),
      qStep({
        id: 'a11-l06-q3',
        type: 'match',
        modes: ['pro'],
        prompt: t('Pasangkan istilah Git dan GitHub dengan artinya.'),
        difficulty: 2,
        left: [
          { id: 'repo', label: t('Repository (repo)') },
          { id: 'clone', label: t('Clone') },
          { id: 'pr', label: t('Pull Request (PR)') },
          { id: 'conf', label: t('Conflict') },
        ],
        right: [
          { id: 'r1', label: t('Menyalin proyek dari GitHub ke laptop') },
          { id: 'r2', label: t('Dua orang mengubah baris kode yang sama') },
          { id: 'r3', label: t('Folder proyek yang riwayatnya dicatat Git') },
          { id: 'r4', label: t('Mengajukan perubahan untuk diperiksa rekan') },
        ],
        answer: { repo: 'r3', clone: 'r1', pr: 'r4', conf: 'r2' },
        explainCorrect: t('Repo adalah folder proyek yang dicatat Git. Clone menyalinnya ke laptop, PR meminta rekan memeriksa, dan conflict muncul saat dua orang mengubah baris yang sama.'),
        hints: [t('Mulai dari yang paling mudah: folder proyek.'), undefined],
        tags: ['git'],
      }),
      qStep(
        makeMcq({
          id: 'a11-l06-q4',
          type: 'limit',
          analogy: t('Git seperti titik simpan di game satu pemain'),
          prompt: t(
            'Dua teman mengubah bagian yang sama. Apa yang terjadi saat digabung?',
            'Masalah apa yang muncul di Git saat tim bekerja bersamaan, tetapi tidak di game satu pemain?',
          ),
          choices: [
            {
              id: 'conf',
              label: t('Kedua teman memilih bagian yang dipakai', 'Conflict saat dua orang mengedit baris yang sama'),
            },
            {
              id: 'load',
              label: t('Perubahan salah satu teman hilang sendiri', 'Perubahan satu orang hilang otomatis saat digabung'),
              explainWrong: t(
                'Git tidak membuang kerja siapa pun. Ia meminta kedua teman memilih.',
                'Git tidak membuang kerja siapa pun. Developer diminta memilih mana yang dipakai.',
              ),
            },
            {
              id: 'note',
              label: t('Git menyatukan keduanya sendiri tanpa masalah', 'Git menggabungkan semuanya sendiri tanpa masalah'),
              explainWrong: t(
                'Git hanya bisa menyatukan bagian yang berbeda. Bagian yang sama harus dipilih manusia.',
                'Git hanya bisa menggabungkan bagian yang berbeda. Baris yang sama harus dipilih manusia.',
              ),
            },
          ],
          answer: 'conf',
          explainCorrect: t(
            'Git tidak tahu mana yang benar. Kedua teman yang memilih, seperti memilih satu gambar dari dua.',
            'Saat dua perubahan menyentuh baris yang sama, developer memilih mana yang dipakai saat merge.',
          ),
          hints: [t('Bayangkan dua anak menulis di baris papan yang sama.', 'Pikirkan dua orang mengedit baris yang sama.')],
          tags: ['git'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a11-l06-q5',
          type: 'scenario',
          story: t(
            'Bito dan Sari mau menambah halaman Kontak. Halaman utama Toko Rani sedang dipakai pembeli.',
            'Bito dan Sari ingin menambah halaman "Kontak" tanpa mengganggu halaman utama Toko Rani yang sedang dipakai pembeli.',
          ),
          prompt: t(
            'Apa yang harus mereka buat sebelum menulis kode?',
            'Apa yang sebaiknya mereka buat sebelum mulai menulis kode halaman kontak?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'br',
              label: t('Membuat branch baru dari jalur utama', 'Branch baru bernama fitur-kontak dari main'),
            },
            {
              id: 'del',
              label: t('Langsung mengubah halaman utama yang sedang dipakai', 'Langsung mengedit halaman di branch main'),
              explainWrong: t(
                'Pembeli bisa melihat halaman yang rusak. Percobaan sebaiknya di jalur terpisah.',
                'Pembeli bisa melihat halaman yang rusak. Percobaan sebaiknya di branch terpisah.',
              ),
            },
            {
              id: 'skip',
              label: t('Mengirim file lewat chat saja', 'Mengirim file lewat chat, tanpa Git'),
              explainWrong: t(
                'File di chat bisa tertimpa. Git mencatat riwayatnya dengan rapi.',
                'File di chat bisa tertimpa dan riwayatnya tidak tercatat.',
              ),
            },
          ],
          answer: 'br',
          explainCorrect: t(
            'Jalur baru menjaga halaman utama tetap aman. Seperti jalur petualangan baru di game.',
            'Mengerjakan fitur di branch terpisah menjaga main tetap bersih dan stabil.',
          ),
          hints: [t('Ingat jalur baru untuk mencoba ide.', 'Ingat: main dipakai pembeli, jadi jangan langsung diubah.')],
          tags: ['git'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a11-l06-q6',
          prompt: t(
            'Git dan GitHub adalah alat yang sama.',
            'Git dan GitHub adalah dua nama untuk alat yang sama.',
          ),
          answer: false,
          explainCorrect: t(
            'Git ada di laptopmu dan mencatat riwayat kode. GitHub adalah tempat menyimpannya di internet.',
            'Pernyataan itu keliru: Git adalah alat pencatat riwayat di laptopmu, GitHub adalah layanan daring untuk menyimpan dan berkolaborasi.',
          ),
          explainWrong: t(
            'Keduanya berbeda. Git adalah alat di laptopmu, GitHub adalah tempat simpan di internet.',
            'Git adalah perangkat lunak pengontrol versi. GitHub adalah tempat menyimpannya secara online.',
          ),
          hints: [t('Ingat siapa yang mencatat dan siapa yang menyimpan.')],
          tags: ['git'],
        }),
      ),
      qStep({
        id: 'a11-l06-q7',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi perintah Git untuk membuat branch baru bernama fitur-baru, lalu menggabungkannya ke main.'),
        template: 'git ___ -b fitur-baru\n# Setelah selesai & pindah ke main:\ngit ___ fitur-baru',
        bank: ['checkout', 'merge', 'init', 'clone'],
        answer: ['checkout', 'merge'],
        explainCorrect: t('git checkout -b membuat branch baru dan langsung pindah ke sana. git merge menggabungkannya ke main.'),
        hints: [t('Satu perintah membuat dan pindah, satu lagi menggabungkan.'), undefined],
        tags: ['git'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a11-l06-r1',
        modes: ['pro'],
        prompt: t('Perintah mana yang mengambil pembaruan terbaru dari GitHub ke laptopmu?'),
        choices: [
          { id: 'pull', label: t('git pull') },
          {
            id: 'init',
            label: t('git init'),
            explainWrong: t('git init hanya dipakai di awal untuk memulai pencatatan Git pada proyek baru.'),
          },
          {
            id: 'push',
            label: t('git push'),
            explainWrong: t('git push justru mengirim commit dari laptopmu ke GitHub.'),
          },
        ],
        answer: 'pull',
        explainCorrect: t('git pull menarik commit terbaru temanmu dari repositori daring.'),
        tags: ['git'],
      }),
      makeMcq({
        id: 'a11-l06-r3j',
        modes: ['junior'],
        prompt: t('Apa nama titik simpan di Git?'),
        choices: [
          { id: 'commit', label: t('Commit') },
          {
            id: 'branch',
            label: t('Branch'),
            explainWrong: t('Branch adalah jalur baru. Titik simpannya bernama lain.'),
          },
          {
            id: 'merge',
            label: t('Merge'),
            explainWrong: t('Merge menyatukan jalur. Titik simpannya bernama lain.'),
          },
        ],
        answer: 'commit',
        explainCorrect: t('Satu titik simpan di Git disebut commit. Seperti satu simpanan di game.'),
        hints: [t('Ingat kata untuk satu titik simpan.')],
        tags: ['git'],
      }),
      makeTf({
        id: 'a11-l06-r2',
        prompt: t(
          'Catatan titik simpan yang jelas lebih membantu daripada "update123".',
          'Pesan commit yang jelas, seperti "Tambah tombol keranjang", jauh lebih membantu daripada "update123".',
        ),
        answer: true,
        explainCorrect: t(
          'Catatan yang rinci membantu teman. Kamu pun mudah mencarinya nanti.',
          'Pesan commit yang deskriptif memudahkan pencarian saat kamu perlu kembali ke titik tertentu.',
        ),
        explainWrong: t(
          'Catatan yang rinci sangat membantu. Teman tahu apa yang berubah.',
          'Pesan commit yang menjelaskan perubahan memudahkan melacak riwayat proyek.',
        ),
        hints: [t('Bayangkan membaca daftar titik simpan.')],
        tags: ['git'],
      }),
    ],
    recap: t(
      'Git menyimpan riwayat kode seperti titik simpan game.',
      'Pakai Git (add, commit, branch, merge, push, pull) dan GitHub agar kode rapi dan aman dikerjakan bersama.',
    ),
    companion: {
      talkPrompts: [
        'Mengapa catatan yang jelas di setiap titik simpan penting kalau dikerjakan berdua?',
      ],
      offlineActivity:
        'Gambar garis lurus bertuliskan "main" di kertas, lalu buat garis cabang "fitur-baru" dengan 2 titik bulat (commit), lalu tarik panah kembali ke garis utama (merge).',
    },
  }),

  makeLesson({
    id: 'a11-l07',
    worldId: 'a11',
    title: 'Dari ide sampai tayang',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengurutkan langkah membuat web dan mencari sebab error.',
      'Kamu bisa menyebutkan empat perkakas harian, tujuh tahap dari riset sampai deploy, dan langkah debugging.',
    ),
    estMinutes: 7,
    introducesTerms: ['deploy'],
    usesTerms: ['wireframe', 'prototype', 'html', 'css', 'git', 'browser'],
    atWork: 'Kamu akan menguji di staging sebelum deploy ke production, lalu membuka Console bila ada error.',
    warmupFrom: 'a11-l06',
    steps: [
      storyStep('a11/ide-ke-tayang.svg', [
        rText(
          'Membuat web sampai bisa dibuka semua orang seperti pentas drama. Ada naskah, sketsa panggung, dan latihan dulu. Apa saja langkah dari ide sampai tampil?',
          'Fitur "Keranjang" Toko Rani harus melewati beberapa tahap sebelum tayang. Tahapnya: riset, wireframe, desain, handoff, slicing, uji, lalu deploy (menayangkan ke internet).',
        ),
      ]),
      conceptStep({
        title: t('Empat perkakas wajib', 'VS Code, DevTools, Git, Figma'),
        modes: ['pro'],
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a11', topic: 'empat-perkakas-fe' },
        alt: t('Empat perkakas harian: VS Code, DevTools, Git, dan Figma.'),
        body: [
          rBold('VS Code'),
          rText(' adalah editor untuk menulis kode, dilengkapi ekstensi seperti Live Server, Prettier, dan ESLint. '),
          rBold('DevTools'),
          rText(' (tekan F12) memeriksa halaman lewat tab Elements, Console, Network, dan Lighthouse. '),
          rTerm('git', 'Git'),
          rText(' dan GitHub menyimpan riwayat kode, dan '),
          rBold('Figma'),
          rText(' dipakai untuk membaca ukuran, warna, dan aset desain.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'a11-l07-q3',
          modes: ['pro'],
          prompt: t('Tab DevTools mana yang kamu buka untuk melihat pesan error JavaScript?'),
          choices: [
            { id: 'con', label: t('Tab Console') },
            {
              id: 'aud',
              label: t('Tab Elements'),
              explainWrong: t('Elements menampilkan struktur halaman dan gayanya. Pesan error ada di Console.'),
            },
            {
              id: 'fig',
              label: t('Tab Network'),
              explainWrong: t('Network menampilkan permintaan data. Pesan error ada di Console.'),
            },
          ],
          answer: 'con',
          explainCorrect: t('Tab Console menampilkan log dan pesan error JavaScript, lengkap dengan nomor barisnya.'),
          hints: [t('Cari tab untuk pesan, bukan untuk struktur halaman.')],
          tags: ['deploy', 'browser'],
        }),
      ),
      conceptStep({
        title: t('Tujuh langkah dari ide sampai tayang', 'Alur kerja handoff sampai deploy'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'a11', topic: 'alur-ide-deploy' },
        alt: t(
          'Tujuh langkah: cari ide, sketsa, desain, serahkan desain, buat kode, uji, tayang.',
          'Riset, wireframe, desain, handoff, koding, uji, deploy.',
        ),
        body: [
          rText(
            'Ada tujuh langkah. Cari ide, buat sketsa, lalu desain. Serahkan desain, buat kode, uji, lalu tayang. Sketsa kasar tata letak disebut ',
            'Urutannya: riset, ',
          ),
          rTerm('wireframe', 'wireframe', 'wireframe'),
          rText(
            '. Memasang web ke internet disebut ',
            '. Lalu buat desain dan handoff (serah terima desain ke developer). Kerjakan slicing dan integrasi API (menyambung halaman ke data server). Uji lintas browser di staging, yaitu server uji coba yang mirip aslinya. Lalu ',
          ),
          rTerm('deploy', 'deploy', 'deploy'),
          rText('.', ' (menayangkan ke internet) ke production, yaitu situs yang dipakai pengunjung, lewat Vercel atau Netlify.'),
        ],
      }),
      qStep({
        id: 'a11-l07-q1',
        type: 'order',
        prompt: t(
          'Urutkan langkah membuat web dari ide sampai tayang.',
          'Urutkan perjalanan membuat website dari ide awal sampai tayang.',
        ),
        difficulty: 2,
        items: [
          { id: 'code', label: t('Menulis kode halaman web', 'Koding (slicing HTML dan CSS, sambung API)') },
          { id: 'dep', label: t('Memasang web ke internet', 'Deploy (tayangkan ke internet)') },
          { id: 'res', label: t('Riset dan sketsa kasar', 'Riset dan wireframe') },
          { id: 'test', label: t('Menguji di banyak layar', 'Uji tampilan di berbagai layar dan browser') },
          { id: 'des', label: t('Membuat desain dan menyerahkannya', 'Desain UI di Figma dan handoff') },
        ],
        answer: ['res', 'des', 'code', 'test', 'dep'],
        explainCorrect: t(
          'Riset dan sketsa dulu, lalu desain, koding, uji, dan tayang. Seperti naskah, latihan, lalu pentas.',
          'Urutannya: riset dan wireframe, desain dan handoff, koding, uji, lalu deploy.',
        ),
        hints: [t('Ingat: naskah ditulis sebelum pentas.', 'Desain harus selesai sebelum kode ditulis.'), undefined],
        tags: ['deploy', 'wireframe'],
      }),
      conceptStep({
        title: t('Jangan panik saat ada error', '5 langkah mengatasi error'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a11', topic: 'debugging-error' },
        alt: t(
          'Baca pesan error, cari bagian yang rusak, lalu jelaskan ulang.',
          'Lima langkah debugging: baca pesan, buka Console, cari, kecilkan masalah, jelaskan ulang.',
        ),
        body: [
          rText(
            'Ada kesalahan, atau bug? Jangan panik. Baca pesan error pelan-pelan. Pesannya muncul di alat periksa browser. Cari bagian kecil yang rusak. Lalu ceritakan masalahnya dengan kata-katamu sendiri.',
            'Ikuti lima langkah. Baca pesan error pelan-pelan, buka tab Console di DevTools, lalu cari pesan errornya. Perkecil masalahnya, lalu jelaskan dengan kata-katamu sendiri.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Menayangkan web seperti pentas drama di panggung utama'),
        same: [
          t(
            'Keduanya butuh persiapan dan latihan sebelum dilihat banyak orang.',
            'Keduanya butuh persiapan naskah, latihan di ruang ganti (staging), dan pemeriksaan sebelum ditonton publik (production).',
          ),
        ],
        different: [
          t(
            'Pentas selesai, tetapi web yang tayang terus dibenahi.',
            'Pentas selesai setelah tirai ditutup. Situs setelah deploy ke production terus dipantau, diperbaiki, dan dirilis ulang.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'menara-alat',
        t(
          'Selesaikan tiga tahap dari awal sampai tayang di Menara Alat.',
          'Jalankan simulasi perjalanan fitur dari commit pertama sampai deploy.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a11-l07-q2j',
          type: 'scenario',
          modes: ['junior'],
          story: t('Bito membuka web buatannya, tetapi halamannya rusak. Layarnya penuh pesan error.'),
          prompt: t('Apa langkah pertama yang tenang?'),
          choices: [
            { id: 'read', label: t('Membaca pesan error pelan-pelan') },
            {
              id: 'del',
              label: t('Menghapus semua kode, lalu mulai lagi'),
              explainWrong: t('Menghapus semua kode membuang kerja yang benar. Cari dulu bagian rusak.'),
            },
            {
              id: 'guess',
              label: t('Mengubah banyak bagian sekaligus'),
              explainWrong: t('Mengubah banyak bagian membuat masalah makin sulit dicari. Ubah sedikit demi sedikit.'),
            },
          ],
          answer: 'read',
          explainCorrect: t('Pesan error biasanya menunjuk letak masalah. Seperti petunjuk di peta harta karun.'),
          hints: [t('Ingat: tenang dulu dan baca petunjuknya.')],
          tags: ['deploy'],
        }),
      ),
      qStep({
        id: 'a11-l07-q2',
        type: 'match',
        modes: ['pro'],
        prompt: t('Pasangkan istilah alur kerja frontend dengan artinya.'),
        difficulty: 2,
        left: [
          { id: 'h', label: t('Handoff') },
          { id: 's', label: t('Slicing') },
          { id: 'd', label: t('Debugging') },
          { id: 'p', label: t('Production') },
        ],
        right: [
          { id: 'r1', label: t('Mengubah desain gambar menjadi HTML dan CSS') },
          { id: 'r2', label: t('Versi aplikasi yang sudah dipakai pengunjung sungguhan') },
          { id: 'r3', label: t('Penyerahan desain dan aset ke developer') },
          { id: 'r4', label: t('Mencari dan memperbaiki kesalahan pada program') },
        ],
        answer: { h: 'r3', s: 'r1', d: 'r4', p: 'r2' },
        explainCorrect: t('Handoff menyerahkan desain ke developer, dan slicing mengubahnya menjadi HTML dan CSS. Debugging memperbaiki kesalahan, dan production adalah versi yang dipakai pengunjung.'),
        hints: [t('Handoff terjadi sebelum slicing.'), undefined],
        tags: ['deploy', 'html', 'css'],
      }),
      qStep(
        makeMcq({
          id: 'a11-l07-q4',
          type: 'limit',
          analogy: t('Menayangkan web seperti pentas drama di panggung'),
          prompt: t(
            'Web sudah tayang di internet. Apa yang terjadi sesudah hari pertama?',
            'Apa yang terjadi pada website setelah hari pertama di-deploy?',
          ),
          choices: [
            {
              id: 'cont',
              label: t(
                'Web terus dirawat dan dibenahi lagi',
                'Website terus dipantau, diperbaiki, dan dirilis ulang',
              ),
            },
            {
              id: 'prep',
              label: t(
                'Web selesai dan tidak perlu disentuh lagi',
                'Website dianggap selesai dan tidak disentuh lagi',
              ),
              explainWrong: t(
                'Web yang tayang tetap bisa punya bug baru. Perawatan terus berjalan.',
                'Persiapan sebelum rilis hanya setengah pekerjaan. Setelah tayang, perawatan terus berjalan.',
              ),
            },
            {
              id: 'team',
              label: t(
                'Web langsung sempurna tanpa error',
                'Website otomatis bebas bug karena sudah diuji',
              ),
              explainWrong: t(
                'Uji coba mengurangi error, tetapi tidak menghapusnya. Web tetap perlu dijaga.',
                'Pengujian mengurangi bug, tetapi tidak menghapusnya. Website tetap perlu dijaga.',
              ),
            },
          ],
          answer: 'cont',
          explainCorrect: t(
            'Web yang sudah tayang tetap dirawat. Seperti drama yang dipentaskan lagi dan makin bagus.',
            'Setelah rilis pertama, produk web terus dirawat dan diperbarui.',
          ),
          hints: [t('Ingat: drama bisa dipentaskan berkali-kali.', 'Pikirkan apa yang terjadi pada produk setelah rilis pertama.')],
          tags: ['deploy'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a11-l07-q5',
          type: 'scenario',
          story: t(
            'Nadia melihat web Toko Rani rapi di laptopnya. Bu Laras membukanya di HP, dan tampilannya berantakan.',
            'Nadia mengetes website Toko Rani di Chrome laptopnya dan tampil rapi. Saat dibuka Bu Laras di Safari HP, tata letaknya berantakan.',
          ),
          prompt: t('Langkah apa yang terlewat sebelum web tayang?', 'Langkah apa yang terlewat sebelum deploy?'),
          difficulty: 2,
          choices: [
            {
              id: 'cbt',
              label: t('Menguji di HP dan layar lain', 'Cross-browser testing di berbagai ukuran layar'),
            },
            {
              id: 'del',
              label: t('Menghapus seluruh gaya dan warna', 'Menulis ulang seluruh CSS dari awal'),
              explainWrong: t(
                'Menghapus gaya membuat web polos. Masalahnya ada di perbedaan layar.',
                'Menulis ulang CSS belum tentu memperbaiki, karena masalahnya ada pada browser yang berbeda.',
              ),
            },
            {
              id: 'hide',
              label: t('Menulis ulang seluruh web dari awal', 'Memasang web ulang di server lain'),
              explainWrong: t(
                'Menulis ulang belum tentu membantu. Coba dulu di layar lain.',
                'Memindahkan server tidak mengubah cara browser menampilkan halaman.',
              ),
            },
          ],
          answer: 'cbt',
          explainCorrect: t(
            'Layar dan perangkat tiap orang berbeda. Uji dulu di beberapa tempat sebelum tayang.',
            'Cross-browser testing memastikan tampilan rapi di Chrome, Safari, Firefox, dan Edge.',
          ),
          hints: [t('Ingat: HP Bu Laras berbeda dari laptop Nadia.', 'Bandingkan perangkat Nadia dengan perangkat Bu Laras.')],
          tags: ['deploy', 'browser'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a11-l07-q6',
          prompt: t(
            'Menjelaskan masalah dengan kata sendiri sering membantu menemukan sebab bug.',
            'Menjelaskan masalah kode dengan kata-katamu sendiri sering membantu menemukan sebab bug.',
          ),
          answer: true,
          explainCorrect: t(
            'Saat menjelaskan pelan-pelan, kamu sering melihat bagian yang terlewat. Seperti bercerita ke boneka.',
            'Saat menyusun penjelasan pelan-pelan, kamu sering melihat bagian yang terlewat.',
          ),
          explainWrong: t(
            'Menjelaskan ulang memang trik yang bagus. Bagian yang terlewat sering terlihat.',
            'Menjelaskan ulang masalah dengan kata sendiri memang salah satu trik debugging yang ampuh.',
          ),
          hints: [t('Ingat langkah terakhir saat ada bug.')],
          tags: ['deploy'],
        }),
      ),
      qStep({
        id: 'a11-l07-q7',
        type: 'type',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Tulis nama proses meninjau kode oleh rekan satu tim sebelum branch digabung ke main.'),
        accept: ['code review', 'Code review', 'Code Review'],
        explainCorrect: t('Code review menemukan bug lebih awal dan menyamakan standar kode tim.'),
        hints: [t('Dua kata Inggris: kode dan tinjauan.'), undefined],
        tags: ['deploy', 'git'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a11-l07-r1',
        prompt: t(
          'Web sudah jadi di laptopmu. Apa langkah agar orang lain bisa membukanya?',
          'Layanan mana yang ramah pemula untuk menayangkan proyek frontend ke internet?',
        ),
        choices: [
          {
            id: 'ver',
            label: t('Memasang web ke internet', 'Vercel, Netlify, atau GitHub Pages'),
          },
          {
            id: 'fig',
            label: t('Menggambar sketsa baru', 'Figma untuk membuat desain'),
            explainWrong: t(
              'Sketsa dibuat di awal. Web belum bisa dibuka orang lain.',
              'Figma adalah alat desain UI dan prototype, bukan layanan hosting kode.',
            ),
          },
          {
            id: 'git',
            label: t('Menyimpan titik simpan baru', 'Git untuk mencatat riwayat kode'),
            explainWrong: t(
              'Titik simpan hanya mencatat kode di laptop. Web belum tayang.',
              'Git mencatat riwayat kode. Layanan hosting yang menayangkan situsnya.',
            ),
          },
        ],
        answer: 'ver',
        explainCorrect: t(
          'Memasang web ke internet disebut deploy. Setelah itu siapa saja bisa membukanya.',
          'Vercel, Netlify, dan GitHub Pages memudahkan deploy langsung dari repositori GitHub.',
        ),
        hints: [t('Ingat panggung utama untuk pentas drama.', 'Pilih layanan yang menjalankan situs di internet.')],
        tags: ['deploy'],
      }),
      makeTf({
        id: 'a11-l07-r2',
        modes: ['pro'],
        prompt: t('Tab Network di DevTools memantau permintaan dan jawaban antara halaman dan server.'),
        answer: true,
        explainCorrect: t('Tab Network menampilkan status, waktu muat, dan isi permintaan serta jawaban.'),
        explainWrong: t('Tab Network memang khusus memeriksa lalu lintas data di browser.'),
        tags: ['deploy', 'browser'],
      }),
      makeTf({
        id: 'a11-l07-r3j',
        modes: ['junior'],
        prompt: t('Web yang sudah tayang tidak perlu dirawat lagi.'),
        answer: false,
        explainCorrect: t('Web yang tayang tetap dirawat dan dibenahi. Seperti drama yang dipentaskan lagi.'),
        explainWrong: t('Web yang tayang tetap dirawat dan dibenahi lagi.'),
        hints: [t('Ingat drama yang dipentaskan berkali-kali.')],
        tags: ['deploy'],
      }),
    ],
    recap: t(
      'Web lahir lewat riset, sketsa, desain, koding, uji, dan tayang.',
      'Kuasai perkakas harian, alur kerja dari riset sampai deploy, dan langkah debugging yang tenang.',
    ),
    companion: {
      talkPrompts: [
        'Coba klik kanan di halaman web, lalu pilih Inspect. Bisa tunjukkan tab Console?',
      ],
      offlineActivity:
        'Buat papan alur 7 langkah dari Riset sampai Deploy di kartu pos berurutan, lalu coba acak dan susun ulang bersama.',
    },
  }),
  npmAndVite,
  browserDevTools,
  testingBasics,
  deploySite,
];
