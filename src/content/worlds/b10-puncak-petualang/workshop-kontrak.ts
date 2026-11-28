import {
  conceptStep,
  limitStep,
  makeLesson,
  makeMcq,
  makeTf,
  qStep,
  rJunior,
  rPro,
  rText,
  simStep,
  storyStep,
  t,
} from '@/content/lessonHelpers';
import type { Rich } from '@/content/schema';

/** OpenAPI dikenalkan di b09-l06 yang khusus Pro, jadi Junior tidak melihat istilahnya. */
const pTerm = (termId: string, text: string): Rich => ({ t: 'term', termId, v: { junior: text, pro: text }, modes: ['pro'] });

export const contractWorkflow = makeLesson({
  id: 'b10-sq1',
  worldId: 'b10',
  title: 'Bekerja dengan kontrak API',
  modes: ['junior', 'pro'],
  isSideQuest: true,
  objective: t(
    'Aku bisa menjelaskan mengapa tim membuat janji dulu sebelum membuat aplikasi.',
    'Kamu bisa menjalankan alur contract-first dan membedakan perubahan kontrak yang aman dari yang merusak.',
  ),
  estMinutes: 7,
  introducesTerms: [],
  usesTerms: ['api', 'kontrak-api', 'openapi', 'json', 'endpoint'],
  warmupFrom: 'b10-l01',
  atWork: 'Tulis dan sepakati kontrak dulu, lalu jadikan versi baru setiap perubahan yang merusak.',
  steps: [
    storyStep('b01/colokan-listrik.svg', [
      rText(
        'Tim Rani membuat fitur pesanan baru. Koki dan pelayan ingin mulai bersamaan.',
        'Tim Toko Rani membuat fitur pesanan baru. Tim frontend dan backend ingin mulai pada hari yang sama.',
      ),
    ]),
    conceptStep({
      title: t('Sepakati janji dulu', 'Contract-first: kontrak sebelum kode'),
      visualName: 'DiagramConcept',
      visualProps: { worldId: 'b09', topic: 'openapi-swagger' },
      alt: t('Dokumen janji berisi alamat, isi pesanan, dan contoh jawaban.', 'Satu dokumen kontrak berisi alamat, isi pesanan, dan contoh jawaban yang disepakati dua tim.'),
      code: {
        lang: 'text',
        code: 'paths:\n  /pesanan:\n    post:\n      requestBody: { produk_id: integer, jumlah: integer }\n      responses:\n        201: { id: integer, status: string }\n        400: { pesan: string }',
      },
      body: [
        rJunior('Dua tim menulis janji dulu. Isinya: apa yang dikirim dan apa jawabannya. '),
        rJunior('Setelah itu, keduanya bisa bekerja tanpa saling menunggu.'),
        rPro('Tim menulis '),
        pTerm('kontrak-api', 'kontrak API'),
        rPro(' lebih dulu. Formatnya sering memakai '),
        pTerm('openapi', 'OpenAPI'),
        rPro('. Frontend memakai mock sesuai kontrak. Backend membangun versi sungguhan pada saat yang sama.'),
      ],
    }),
    qStep({
      id: 'b10-sq1-q1',
      type: 'order',
      prompt: t('Urutkan cara kerja tim dengan janji API.', 'Urutkan alur kerja contract-first dari awal sampai rilis.'),
      difficulty: 1,
      items: [
        { id: 'agree', label: t('Sepakati janji API', 'Sepakati kontrak API') },
        { id: 'build', label: t('Pelayan berlatih, koki memasak', 'Frontend pakai mock, backend membangun') },
        { id: 'check', label: t('Cek jawaban sesuai janji', 'Uji balasan sesuai kontrak') },
        { id: 'ship', label: t('Buka untuk pengunjung', 'Rilis ke production') },
      ],
      answer: ['agree', 'build', 'check', 'ship'],
      explainCorrect: t(
        'Janji dibuat dulu. Lalu dua tim bekerja bersamaan dan hasilnya dicek.',
        'Kontrak disepakati dulu agar dua tim bisa bekerja bersamaan. Balasan diuji sebelum rilis.',
      ),
      hints: [t('Apa yang harus ada sebelum dua tim mulai bekerja?'), undefined],
      tags: ['kontrak-api'],
    }),
    qStep(makeTf({
      id: 'b10-sq1-q2',
      prompt: t(
        'Pelayan harus menunggu koki selesai sebelum bisa berlatih.',
        'Frontend harus menunggu backend selesai sebelum bisa mulai bekerja.',
      ),
      answer: false,
      explainWrong: t('Tanpa janji, pelayan memang harus menunggu. Dengan janji, ia bisa berlatih lebih dulu.', 'Itu hanya terjadi tanpa kontrak. Dengan kontrak, frontend bisa mulai memakai mock.'),
      explainCorrect: t(
        'Pelayan bisa berlatih dengan dapur tiruan. Dapur tiruan itu menjawab sesuai janji.',
        'Frontend bisa memakai mock yang menjawab sesuai kontrak. Backend dibangun pada waktu yang sama.',
      ),
      hints: [t('Ingat dapur tiruan untuk berlatih.', 'Ingat mock API.')],
      tags: ['kontrak-api', 'openapi'],
    })),
    conceptStep({
      title: t('Ubah dalamnya, jangan janjinya', 'Perubahan aman dan perubahan yang merusak'),
      visualName: 'DiagramConcept',
      visualProps: { worldId: 'b01', topic: 'kontrak-rusak' },
      alt: t('Jawaban lama berisi nama. Jawaban baru memakai name. Layar aplikasi lama jadi kosong.'),
      code: {
        lang: 'json',
        code: '// Aman: menambah kolom baru\n{ "nama": "Tas Kanvas", "warna": "biru" }\n\n// Merusak: mengganti nama kolom\n{ "name": "Tas Kanvas" }',
      },
      body: [
        rJunior('Menambah isi baru biasanya aman. Aplikasi lama tidak membacanya. '),
        rJunior('Mengganti atau menghapus isi lama bisa merusak aplikasi lama.'),
        rPro('Menambah kolom atau endpoint baru biasanya aman, karena client lama mengabaikannya. '),
        rPro('Mengganti nama, menghapus, atau mengubah tipe kolom itu perubahan yang merusak. Buat versi baru dan beri masa transisi.'),
      ],
    }),
    qStep({
      id: 'b10-sq1-q3',
      type: 'sort',
      prompt: t('Pilah perubahan janji: aman atau merusak?', 'Pilah perubahan kontrak: aman atau merusak client lama?'),
      difficulty: 2,
      items: [
        { id: 'add-field', label: t('Menambah kolom warna') },
        { id: 'rename', label: t('Mengganti nama menjadi name') },
        { id: 'remove', label: t('Menghapus kolom harga') },
        { id: 'type', label: t('Harga 15000 menjadi teks "15000"') },
        { id: 'add-endpoint', label: t('Menambah alamat baru untuk ulasan', 'Menambah endpoint baru /ulasan') },
      ],
      bins: [
        { id: 'safe', label: t('Aman'), icon: 'shield' },
        { id: 'breaking', label: t('Merusak'), icon: 'bug' },
      ],
      answer: { 'add-field': 'safe', rename: 'breaking', remove: 'breaking', type: 'breaking', 'add-endpoint': 'safe' },
      explainCorrect: t(
        'Menambah itu aman. Mengganti, menghapus, atau mengubah jenis isi itu merusak.',
        'Client lama mengabaikan tambahan. Mereka rusak saat kolom yang mereka baca diganti, dihapus, atau berubah tipe.',
      ),
      hints: [t('Apakah aplikasi lama masih menemukan isi yang ia baca?'), undefined],
      tags: ['kontrak-api'],
    }),
    limitStep({
      analogy: t('Kontrak API seperti buku menu restoran'),
      same: [t('Keduanya memberi tahu apa yang bisa dipesan dan apa yang datang.')],
      different: [
        t(
          'Menu bisa dicetak ulang. Janji API perlu versi baru.',
          'Menu bisa dicetak ulang kapan saja, tetapi aplikasi lama masih memakai kontrak lama. Karena itu kontrak perlu versi dan masa transisi.',
        ),
      ],
      riskyAnalogy: true,
    }),
    qStep(makeMcq({
      id: 'b10-sq1-q4',
      type: 'limit',
      analogy: t('Kontrak API seperti buku menu restoran'),
      prompt: t(
        'Koki ingin mengganti kata nama menjadi name. Apa cara paling aman?',
        'Backend ingin mengganti kolom nama menjadi name, padahal aplikasi HP lama masih dipakai. Langkah apa yang paling aman?',
      ),
      difficulty: 2,
      choices: [
        { id: 'version', label: t('Buat janji versi baru', 'Rilis v2, biarkan v1 jalan dulu') },
        {
          id: 'silent',
          label: t('Langsung ganti diam-diam', 'Langsung ganti di v1'),
          explainWrong: t(
            'Aplikasi lama mencari nama dan tidak menemukannya. Layarnya jadi kosong.',
            'Aplikasi lama masih membaca nama. Begitu kolom itu hilang, layarnya kosong.',
          ),
        },
        {
          id: 'guess',
          label: t('Minta pelayan menebak', 'Minta frontend menebak'),
          explainWrong: t(
            'Menebak membuat aplikasi mudah salah. Janji ada supaya tidak perlu menebak.',
            'Kontrak ada supaya tidak ada yang menebak. Tebakan membuat bug sulit dicari.',
          ),
        },
      ],
      answer: 'version',
      explainCorrect: t(
        'Aplikasi lama tetap memakai janji lama. Aplikasi baru memakai janji baru.',
        'Client lama tetap memakai v1 sampai sempat pindah. Setelah masa transisi, v1 baru dimatikan.',
      ),
      hints: [t('Siapa yang masih memakai janji lama?', 'Siapa yang masih memakai kontrak lama?')],
      tags: ['kontrak-api'],
    })),
    simStep(
      'restoran-api',
      t(
        'Kirim pesanan sesuai janji, lalu cek jawabannya.',
        'Panggil endpoint sesuai kontrak, lalu cek apakah bentuk balasannya cocok.',
      ),
    ),
    qStep(makeMcq({
      id: 'b10-sq1-q5',
      type: 'scenario',
      story: t(
        'Janjinya harga berupa angka. Dapur malah mengirim teks "15000".',
        'Kontrak menyebut harga bertipe integer. Server membalas "harga": "15000" sebagai teks.',
      ),
      prompt: t('Siapa yang salah di sini?', 'Apa kesimpulan yang tepat?'),
      difficulty: 2,
      choices: [
        { id: 'server', label: t('Dapur, karena melanggar janji', 'Server melanggar kontrak') },
        {
          id: 'client',
          label: t('Pelayan, karena salah baca', 'Frontend salah membaca balasan'),
          explainWrong: t(
            'Pelayan membaca sesuai janji. Yang berubah adalah jawaban dapur.',
            'Frontend membaca sesuai kontrak. Balasan server yang menyimpang.',
          ),
        },
        {
          id: 'fine',
          label: t('Tidak ada masalah', 'Tidak masalah, isinya sama'),
          explainWrong: t(
            'Angka dan teks itu beda. Menjumlah teks bisa memberi hasil aneh.',
            'Teks dan angka diperlakukan berbeda. "15000" + 1 menjadi "150001", bukan 15001.',
          ),
        },
      ],
      answer: 'server',
      explainCorrect: t(
        'Jawaban harus sesuai janji. Dapur perlu mengirim angka.',
        'Uji kontrak akan gagal di sini. Server perlu membalas integer sesuai kontrak.',
      ),
      hints: [t('Bandingkan jawaban dengan isi janji.', 'Bandingkan tipe di balasan dengan tipe di kontrak.')],
      tags: ['kontrak-api', 'json'],
    })),
  ],
  reviewCards: [
    makeMcq({
      id: 'b10-sq1-r1',
      prompt: t('Perubahan mana yang aman untuk aplikasi lama?', 'Perubahan kontrak mana yang aman untuk client lama?'),
      choices: [
        { id: 'add', label: t('Menambah kolom baru') },
        {
          id: 'remove',
          label: t('Menghapus kolom lama'),
          explainWrong: t('Aplikasi lama masih membaca kolom itu. Tanpa kolom itu, layarnya rusak.', 'Client lama masih membaca kolom itu, jadi layarnya rusak.'),
        },
        {
          id: 'rename',
          label: t('Mengganti nama kolom'),
          explainWrong: t('Aplikasi lama mencari nama lama dan tidak menemukannya.', 'Client lama mencari nama kolom lama dan tidak menemukannya.'),
        },
      ],
      answer: 'add',
      explainCorrect: t('Aplikasi lama tidak membaca kolom baru. Jadi ia tetap jalan.', 'Client lama mengabaikan kolom yang tidak ia kenal, jadi tetap berjalan.'),
      hints: [t('Apa yang terjadi pada isi yang dibaca aplikasi lama?')],
      tags: ['kontrak-api'],
    }),
    makeTf({
      id: 'b10-sq1-r2',
      prompt: t(
        'Dengan janji yang disepakati, pelayan bisa berlatih memakai dapur tiruan.',
        'Dengan kontrak yang disepakati, frontend bisa bekerja memakai mock sebelum backend selesai.',
      ),
      answer: true,
      explainWrong: t('Dapur tiruan menjawab sesuai janji. Pelayan tidak perlu menunggu dapur asli.', 'Mock menjawab sesuai kontrak, jadi frontend bisa mulai sebelum backend selesai.'),
      explainCorrect: t('Dapur tiruan menjawab sesuai janji. Jadi pelayan tidak perlu menunggu.', 'Mock menjawab sesuai kontrak, jadi frontend tidak perlu menunggu backend.'),
      hints: [t('Ingat dapur tiruan.', 'Ingat mock API.')],
      tags: ['kontrak-api', 'openapi'],
    }),
  ],
  recap: t(
    'Buat janji dulu, lalu dua tim bekerja bersamaan. Menambah itu aman, mengganti perlu versi baru.',
    'Sepakati kontrak dulu agar frontend dan backend bekerja bersamaan. Tambahan itu aman, perubahan yang merusak perlu versi baru.',
  ),
});
