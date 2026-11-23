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

/** Istilah yang hanya tampil di satu mode, supaya teks Junior dan Pro tetap dua jalur terpisah. */
const jTerm = (termId: string, text: string): Rich => ({ ...rTerm(termId, text), modes: ['junior'] }) as Rich;
const pTerm = (termId: string, text: string): Rich => ({ ...rTerm(termId, text), modes: ['pro'] }) as Rich;

export const world: World = {
  id: 'b02',
  track: 'B',
  order: 2,
  title: 'Kantor Pos HTTP',
  tagline: t(
    'Tulis surat pesanan dengan benar. Baca angka jawaban dari kantor pos.',
    'Kamu bisa membaca pesan HTTP dan tahu arti kode statusnya.',
  ),
  color: '#2F6FED',
  illustration: 'b02-kantor-pos-http',
  sourceChapters: ['J2-02'],
  requires: ['b01'],
  lessons: ['b02-l01', 'b02-l02', 'b02-l03', 'b02-l04', 'b02-l05', 'b02-l06'],
  sideQuests: [],
  boss: {
    title: 'Tantangan Penjaga Kantor Pos',
    greeting: t(
      'Halo, kurir web. Ayo uji surat pesananmu dan angka jawabanmu!',
      'Buktikan kamu bisa membaca pesan HTTP, memilih method, dan membaca kode status, cookie, dan cache.',
    ),
    guardianName: 'Penjaga Kantor Pos',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'b02-anc-j1',
        prompt: t('Di surat pesanan web, kata kerja seperti GET ditaruh di mana?'),
        choices: [
          { id: 'm', label: t('Di baris pertama surat') },
          { id: 'b', label: t('Di dalam isi paket'), explainWrong: t('Isi paket membawa data yang dikirim. Kata kerja ada di baris pertama.') },
          { id: 'c', label: t('Di catatan amplop'), explainWrong: t('Catatan amplop memberi keterangan tambahan. Kata kerja ada di baris pertama.') },
        ],
        answer: 'm',
        explainCorrect: t('Baris pertama berisi kata kerjanya. Dari situ kantor pos tahu maksudmu.'),
        tags: ['request', 'http-method'],
      }),
      makeAnchorMcq({
        id: 'b02-anc-j2',
        prompt: t('Kamu ingin melihat daftar barang saja. Kata kerja mana yang dipilih?'),
        choices: [
          { id: 'get', label: t('GET') },
          { id: 'del', label: t('DELETE'), explainWrong: t('DELETE dipakai untuk menghapus. Kamu hanya ingin melihat.') },
          { id: 'post', label: t('POST'), explainWrong: t('POST dipakai untuk membuat catatan baru. Kamu hanya ingin melihat.') },
        ],
        answer: 'get',
        explainCorrect: t('GET dipakai untuk membaca. Seperti melihat daftar tanpa mencoret apa pun.'),
        tags: ['http-method'],
      }),
      makeAnchorMcq({
        id: 'b02-anc-j3',
        prompt: t('Jawaban dari server berawalan angka 2, seperti 200. Apa artinya?'),
        choices: [
          { id: 'ok', label: t('Permintaanmu berhasil') },
          { id: 'err', label: t('Server sedang mengalami masalah'), explainWrong: t('Masalah di server dimulai angka 5. Angka 2 selalu kabar baik.') },
          { id: 'nf', label: t('Alamat yang dicari tidak ada'), explainWrong: t('Tidak ketemu berawalan angka 4. Angka 2 selalu kabar baik.') },
        ],
        answer: 'ok',
        explainCorrect: t('Angka depan 2 berarti berhasil. Seperti amplop balasan bertanda centang.'),
        tags: ['status-code'],
      }),
      makeAnchorMcq({
        id: 'b02-anc-j4',
        prompt: t('Kamu membuka alamat yang salah dan melihat 404. Apa artinya?'),
        choices: [
          { id: 'nf', label: t('Alamat itu tidak ketemu') },
          { id: 'ok', label: t('Data baru berhasil dibuat'), explainWrong: t('Data baru yang berhasil dibuat berangka 201. Angka 404 berarti tidak ketemu.') },
          { id: 'wait', label: t('Kamu terlalu sering memesan'), explainWrong: t('Terlalu sering memesan berangka 429. Angka 404 berarti tidak ketemu.') },
        ],
        answer: 'nf',
        explainCorrect: t('404 berarti alamat tidak ketemu. Seperti mencari rumah yang tidak ada.'),
        tags: ['status-code'],
      }),
      makeAnchorMcq({
        id: 'b02-anc-j5',
        prompt: t('Mengapa browser menyimpan salinan gambar untuk dipakai lagi?'),
        choices: [
          { id: 'save', label: t('Supaya gambar lebih cepat muncul') },
          { id: 'del', label: t('Supaya server tidak perlu menyimpan gambar'), explainWrong: t('Server tetap menyimpan gambarnya. Browser hanya menyimpan salinan untuk dipakai lagi.') },
          { id: 'up', label: t('Supaya gambar bisa dikirim ke teman'), explainWrong: t('Menyimpan salinan tidak mengirim apa pun. Salinan hanya dipakai lagi nanti.') },
        ],
        answer: 'save',
        explainCorrect: t('Salinan sudah ada di HP. Browser bisa langsung menampilkan gambarnya.'),
        tags: ['cookie-cache'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'b02-anc-p1',
        prompt: t('Apa beda paling mendasar antara PUT dan PATCH saat memperbarui produk?'),
        choices: [
          { id: 'diff', label: t('PUT mengganti seluruh isi, PATCH hanya mengubah kolom yang dikirim') },
          { id: 'read', label: t('PUT hanya membuat data baru, PATCH mengubah data lama'), explainWrong: t('PUT dan PATCH sama-sama memperbarui data. Bedanya ada pada seberapa banyak yang diganti.') },
          { id: 'body', label: t('PATCH mengganti seluruh isi, PUT hanya mengubah kolom yang dikirim'), explainWrong: t('Pengertiannya terbalik. Yang menimpa seluruh isi adalah PUT.') },
        ],
        answer: 'diff',
        explainCorrect: t('PUT menimpa seluruh data lama dengan kiriman baru. PATCH hanya menyentuh kolom yang kamu kirim.'),
        tags: ['http-method'],
      }),
      makeAnchorMcq({
        id: 'b02-anc-p2',
        prompt: t('Mengapa DELETE termasuk idempotent tetapi tidak termasuk safe?'),
        choices: [
          { id: 'idem', label: t('Ia mengubah data, tetapi hasil akhirnya sama kalau diulang') },
          { id: 'safe', label: t('Ia hanya membaca data dan tidak mengubah apa pun'), explainWrong: t('DELETE menghapus data, jadi tidak safe. Safe hanya untuk method yang membaca.') },
          { id: 'post', label: t('Ia membuat data baru setiap kali dikirim'), explainWrong: t('Membuat data baru adalah sifat POST. DELETE justru menghapus data.') },
        ],
        answer: 'idem',
        explainCorrect: t('Panggilan pertama menghapus data. Panggilan ulang tidak mengubah apa-apa lagi.'),
        tags: ['idempotent', 'http-method'],
      }),
      makeAnchorMcq({
        id: 'b02-anc-p3',
        prompt: t('Apa beda kode status 401 dan 403?'),
        choices: [
          { id: 'auth', label: t('401: belum login. 403: sudah login, tetapi tidak punya izin') },
          { id: 'rev', label: t('401: sudah login, tetapi tidak punya izin. 403: belum login'), explainWrong: t('Pengertiannya terbalik. 401 untuk yang belum login, 403 untuk yang tidak punya izin.') },
          { id: 'same', label: t('401 dan 403 sama-sama berarti data tidak ditemukan'), explainWrong: t('Data yang tidak ditemukan adalah 404. Kode 401 dan 403 menyangkut identitas dan izin.') },
        ],
        answer: 'auth',
        explainCorrect: t('401 berarti "aku belum kenal kamu". 403 berarti "aku kenal kamu, tetapi kamu dilarang masuk".'),
        tags: ['status-code'],
      }),
      makeAnchorMcq({
        id: 'b02-anc-p4',
        prompt: t('Pada GET /toko/9/produk/15?warna=biru&halaman=2, bagian mana yang menjadi filter tampilan?'),
        choices: [
          { id: 'q', label: t('Query parameter ?warna=biru&halaman=2') },
          { id: 'path', label: t('Path parameter /toko/9/produk/15'), explainWrong: t('Path menunjuk benda yang dituju. Filter tampilan ada di query.') },
          { id: 'meth', label: t('Method GET'), explainWrong: t('Method menentukan tindakan, yaitu mengambil data. Filter tampilan ada di query.') },
        ],
        answer: 'q',
        explainCorrect: t('Path menjawab "yang mana", query menjawab "bagaimana". Warna dan halaman mengatur cara tampil.'),
        tags: ['header-body', 'url'],
      }),
      makeAnchorMcq({
        id: 'b02-anc-p5',
        prompt: t('Apa keunggulan utama HTTP/2 dibanding HTTP/1.1 untuk halaman dengan banyak file?'),
        choices: [
          { id: 'mux', label: t('Banyak request berjalan bersamaan dalam satu koneksi') },
          { id: 'nocode', label: t('Setiap file memakai koneksi baru agar tidak antre'), explainWrong: t('HTTP/2 tidak membuka koneksi baru untuk tiap file. Koneksi yang sama dipakai bersama.') },
          { id: 'nohttps', label: t('Semua file digabung otomatis menjadi satu file'), explainWrong: t('HTTP/2 tidak menggabungkan file. Setiap file tetap dikirim terpisah, tetapi bersamaan.') },
        ],
        answer: 'mux',
        explainCorrect: t('HTTP/2 seperti jalan tol dengan banyak lajur. Permintaan tidak antre satu per satu.'),
        tags: ['cookie-cache', 'https'],
      }),
      makeAnchorMcq({
        id: 'b02-anc-p6',
        type: 'limit',
        analogy: t('Kode status 4xx = kesalahan peminta dan 5xx = kesalahan server'),
        prompt: t('Kapan pembagian "4xx salahmu, 5xx salah kami" perlu dipakai dengan hati-hati?'),
        choices: [
          { id: 'care', label: t('Saat bug frontend mengirim format salah, atau memesan terlalu cepat') },
          { id: 'same', label: t('Saat server mengalami gangguan dan membalas kode 500'), explainWrong: t('Pada gangguan server, 5xx memang menunjuk server. Pembagian itu tidak menyesatkan di situ.') },
          { id: 'ok', label: t('Saat permintaan berhasil dan dibalas dengan kode 200'), explainWrong: t('Kode 200 bukan kegagalan, jadi pembagian 4xx dan 5xx tidak dipakai.') },
        ],
        answer: 'care',
        explainCorrect: t('Kode 4xx bisa berasal dari bug di frontend atau batas laju 429. Tidak selalu karena kesalahan orang yang memakai.'),
        tags: ['status-code'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'b02-l01',
    worldId: 'b02',
    title: 'Isi surat pesanan (request)',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menunjuk 4 bagian surat pesanan.',
      'Kamu bisa menyebutkan bagian-bagian HTTP request dan response.',
    ),
    estMinutes: 5,
    introducesTerms: ['header-body'],
    usesTerms: ['request', 'response', 'endpoint', 'api'],
    stickerId: 'surat-pesanan',
    warmupFrom: 'b01-l04',
    atWork: 'Kamu akan membaca request ini di tab Network DevTools saat form gagal terkirim.',
    steps: [
      storyStep('b02/surat-pesanan.svg', [
        rText(
          'Rani mengirim surat pesanan ke kantor pos. Surat itu punya kata kerja, alamat, catatan, dan isi paket. Bagian mana yang membawa pesanannya?',
          'Form pesanan di web Toko Rani gagal terkirim. Untuk mencari sebabnya, kamu perlu membaca pesan HTTP-nya.',
        ),
      ]),
      conceptStep({
        title: t('Empat bagian surat pesanan', 'Bagian-bagian HTTP request'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b02', topic: 'surat-request' },
        alt: t(
          'Surat pesanan dengan kata kerja, alamat, catatan di amplop, dan isi paket.',
          'Contoh request POST dengan Host dan Content-Type, lalu isi JSON.',
        ),
        code: {
          lang: 'http',
          code: 'POST /api/pesanan HTTP/1.1\nHost: api.toko-rani.example\nContent-Type: application/json\n\n{\n  "produk_id": 12,\n  "jumlah": 2\n}',
          highlight: [1, 2, 3, 5],
        },
        body: [
          rJunior('Kata kerja menyatakan maksudmu, dan alamat menunjuk tujuan. Catatan di amplop disebut '),
          jTerm('header-body', 'header'),
          rJunior('. Isi paket disebut '),
          jTerm('header-body', 'body'),
          rJunior('.'),
          pTerm('request', 'Request'),
          rPro(' adalah surat pesanan dari aplikasi ke server. Isinya method (jenis tindakan), alamat tujuan, '),
          pTerm('header-body', 'header'),
          rPro(' (keterangan di amplop), dan '),
          pTerm('header-body', 'body'),
          rPro(' (data yang dikirim). Method POST berarti mengirim data baru ke alamat itu.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b02-l01-q1',
          type: 'analogy',
          prompt: t(
            'Keterangan ditulis di luar amplop. Bagian itu bernama apa?',
            'Pada surat pesanan HTTP, bagian mana yang memuat keterangan format isi di amplop luar?',
          ),
          choices: [
            { id: 'hdr', label: t('Header') },
            {
              id: 'bdy',
              label: t('Body'),
              explainWrong: t(
                'Body adalah isi paket di dalam amplop. Catatan di luar amplop itu header.',
                'Body adalah isi di dalam surat, bukan keterangan di amplopnya.',
              ),
            },
            {
              id: 'url',
              label: t('Kata kerja', 'Kode status'),
              explainWrong: t(
                'Kata kerja menyatakan maksud surat. Catatan di luar amplop itu header.',
                'Kode status hanya ada di baris pertama surat balasan (response).',
              ),
            },
          ],
          answer: 'hdr',
          explainCorrect: t(
            'Header adalah catatan di luar amplop. Seperti tulisan "Mudah pecah" di kardus paket.',
            'Header memuat keterangan tentang request, seperti format isi. Ia berada di luar isi, seperti catatan di amplop.',
          ),
          hints: [t('Ingat tulisan "Mudah pecah" di luar kardus.', 'Cari bagian yang berada di luar isi surat.')],
          tags: ['request'],
        }),
      ),
      conceptStep({
        title: t('Header dan body', 'Header dan body'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b02', topic: 'amplop-isi' },
        alt: t('Perbandingan header di luar amplop dan body di dalam amplop.'),
        modes: ['pro'],
        body: [
          rBold('Header'),
          rText(' berisi keterangan tambahan, seperti format isi, bahasa, dan token izin. '),
          rBold('Body'),
          rText(' membawa data yang akan dikirim. GET umumnya tidak punya body.'),
        ],
      }),
      conceptStep({
        title: t('Surat balasan', 'Bagian-bagian HTTP response'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b02', topic: 'request-response-http' },
        alt: t(
          'Surat balasan dibuka dengan baris angka jawaban, lalu header dan body.',
          'Baris status 201 Created, lalu header dan body.',
        ),
        code: {
          lang: 'http',
          code: 'HTTP/1.1 201 Created\nContent-Type: application/json\nCache-Control: no-store\n\n{\n  "id": 9031,\n  "status": "menunggu_pembayaran"\n}',
          highlight: [1],
        },
        body: [
          rTerm('response', 'Response'),
          rJunior(' adalah surat balasan. Baris pertamanya berisi angka jawaban. Sesudah itu ada header dan body.'),
          rPro(' dibuka dengan baris status, yaitu angka 3 digit yang meringkas hasil request. Setelah itu ada header dan body.'),
        ],
      }),
      simStep(
        'perakit-request',
        t(
          'Pilih kata kerja dan alamat, lalu tekan Kirim.',
          'Kirim request ke api.toko-rani.example, lalu amati status dan isi response.',
        ),
      ),
      limitStep({
        analogy: t('Surat pesanan'),
        same: [
          t(
            'Ada alamat, catatan, dan isi paket.',
            'Keduanya punya alamat tujuan, keterangan di amplop (header), dan isi surat (body).',
          ),
        ],
        different: [
          t(
            'Surat web harus ditulis sesuai aturan.',
            'Pesan HTTP harus memakai kata kunci dan format baku agar server bisa membacanya.',
          ),
        ],
        riskyAnalogy: true,
      }),
      qStep({
        id: 'b02-l01-q2',
        type: 'match',
        prompt: t('Pasangkan bagian surat dengan tugasnya.', 'Pasangkan 4 bagian HTTP request dengan perannya.'),
        difficulty: 2,
        left: [
          { id: 'm', label: t('Kata kerja', 'Method') },
          { id: 'u', label: t('Alamat', 'URL atau path') },
          { id: 'h', label: t('Header') },
          { id: 'b', label: t('Body') },
        ],
        right: [
          { id: 'rb', label: t('Isi pesanan', 'Data pesanan yang dikirim') },
          { id: 'ru', label: t('Tujuan surat', 'Alamat sumber data yang dituju') },
          { id: 'rm', label: t('Maksud surat', 'Jenis tindakan, misalnya GET atau POST') },
          { id: 'rh', label: t('Catatan di amplop', 'Keterangan amplop: format dan identitas') },
        ],
        answer: { m: 'rm', u: 'ru', h: 'rh', b: 'rb' },
        explainCorrect: t(
          'Kata kerja menyatakan maksud, alamat menunjuk tujuan. Header ada di amplop, body di dalam paket.',
          'Method menentukan tindakan, URL menunjuk tujuan. Header membawa keterangan, body membawa data.',
        ),
        hints: [t('Bayangkan amplop: apa di luar, apa di dalam?', 'Pisahkan yang ada di luar amplop dan di dalamnya.'), undefined],
        tags: ['request'],
      }),
      qStep(
        makeTf({
          id: 'b02-l01-q3',
          prompt: t(
            'Untuk melihat daftar, suratmu wajib membawa isi paket panjang.',
            'GET untuk mengambil daftar produk wajib membawa body yang panjang.',
          ),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru. Melihat daftar cukup dengan alamat, tanpa isi paket.',
            'Pernyataan itu keliru: GET umumnya tanpa body, karena hanya meminta data.',
          ),
          explainWrong: t(
            'Isi paket dipakai untuk mengirim data. Melihat daftar tidak mengirim apa-apa.',
            'Body dipakai untuk mengirim data. GET hanya meminta data, jadi cukup alamat dan header.',
          ),
          hints: [t('Apa yang kamu titipkan saat hanya melihat?', 'GET meminta data, bukan mengirimnya.')],
          tags: ['request'],
        }),
      ),
      qStep({
        id: 'b02-l01-q4',
        type: 'hotspot',
        modes: ['pro'],
        prompt: t('Ketuk bagian response yang langsung memberi tahu hasil permintaan.'),
        difficulty: 1,
        image: 'b02-hotspot',
        regions: [
          { id: 'r1', shape: 'rect', coords: [10, 10, 260, 45], label: 'HTTP/1.1 201 Created' },
          { id: 'r2', shape: 'rect', coords: [10, 55, 260, 90], label: 'Content-Type: application/json' },
          { id: 'r3', shape: 'rect', coords: [10, 100, 260, 150], label: '{ "id": 9031 }' },
        ],
        answer: 'r1',
        explainCorrect: t('Baris pertama response berisi kode status, misalnya 201 Created.'),
        explainIncorrect: {
          r2: t('Content-Type adalah header yang menyebut format isi, bukan baris status.'),
          r3: t('Baris itu berisi data JSON. Hasil permintaan diringkas di baris status paling atas.'),
        },
        hints: [t('Cari baris yang paling atas.'), undefined],
        tags: ['response'],
      }),
      qStep(
        makeMcq({
          id: 'b02-l01-q5',
          type: 'limit',
          analogy: t('Surat pesanan di kantor pos'),
          prompt: t(
            'Kamu menulis surat web seperti pesan ke teman. Apa yang terjadi?',
            'Apa beda utama antara surat pos kertas dan pesan HTTP?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'fmt',
              label: t('Server tidak mengerti suratmu', 'HTTP memakai format baku yang dibaca server'),
            },
            {
              id: 'addr',
              label: t('Server menebak maksud tulisanmu', 'Hanya surat pos yang membutuhkan alamat tujuan'),
              explainWrong: t(
                'Server adalah mesin, jadi ia tidak menebak. Surat harus tertata rapi.',
                'Pesan HTTP juga punya alamat tujuan, yaitu URL.',
              ),
            },
            {
              id: 'env',
              label: t('Server membetulkan suratmu sendiri', 'Hanya pesan HTTP yang punya keterangan di luar'),
              explainWrong: t(
                'Server tidak bisa membetulkan surat berantakan. Ia hanya membaca surat yang rapi.',
                'Header di pesan HTTP mirip keterangan di amplop surat.',
              ),
            },
          ],
          answer: 'fmt',
          explainCorrect: t(
            'Server adalah mesin, bukan manusia. Ia hanya mengerti surat yang tertata sesuai aturan.',
            'Server adalah program, jadi tidak bisa menebak kalimat bebas seperti manusia. Karena itu format request dan response harus baku.',
          ),
          hints: [t('Ingat: yang membaca surat adalah mesin.', 'Bandingkan siapa yang membaca: manusia atau program.')],
          tags: ['request', 'response'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b02-l01-q6',
          type: 'scenario',
          story: t(
            'Rani menulis surat untuk membeli tas. Ia lupa menulis jumlahnya.',
            'Rani mengirim POST ke /api/pesanan untuk membeli tas, tetapi lupa mengirim produk_id dan jumlah.',
          ),
          prompt: t('Bagian mana dari surat Rani yang kosong?', 'Bagian mana dari request Rani yang kosong?'),
          difficulty: 2,
          choices: [
            { id: 'body', label: t('Body') },
            {
              id: 'method',
              label: t('Kata kerja', 'Method'),
              explainWrong: t(
                'Rani sudah menulis kata kerjanya. Yang kosong adalah isi paket.',
                'Method sudah diisi, yaitu POST. Yang kosong adalah body.',
              ),
            },
            {
              id: 'path',
              label: t('Alamat tujuan', 'Path tujuan'),
              explainWrong: t(
                'Alamat tujuan sudah tertulis. Yang kosong adalah isi paket.',
                'Path /api/pesanan sudah ditulis. Yang kosong adalah body.',
              ),
            },
          ],
          answer: 'body',
          explainCorrect: t(
            'Jumlah dan jenis tas ikut di isi paket. Tanpa isi paket, kantor pos tidak tahu pesananmu.',
            'Data pesanan yang dicatat harus ada di body.',
          ),
          hints: [t('Ingat paket tempat pesanan ditaruh.', 'Cari bagian yang membawa data, bukan alamat.')],
          tags: ['request'],
        }),
      ),
      qStep({
        id: 'b02-l01-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi tiga bagian response dari atas ke bawah.'),
        difficulty: 2,
        template: 'Baris pertama response memuat ___, diikuti ___ untuk keterangan, lalu ___ berisi data balasan.',
        bank: ['kode status', 'header', 'body', 'method'],
        answer: ['kode status', 'header', 'body'],
        explainCorrect: t('Urutannya kode status, header, lalu body.'),
        hints: [t('Mulai dari baris yang paling atas.'), undefined],
        tags: ['response'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b02-l01-r1',
        prompt: t('Bagian surat mana yang membawa isi pesananmu?', 'Bagian request mana yang membawa data formulir untuk disimpan?'),
        choices: [
          { id: 'b', label: t('Body') },
          {
            id: 'h',
            label: t('Header'),
            explainWrong: t(
              'Header hanya berisi catatan di luar amplop. Pesananmu ada di dalam paket.',
              'Header hanya menyimpan keterangan tambahan.',
            ),
          },
          {
            id: 'm',
            label: t('Kata kerja', 'Method'),
            explainWrong: t(
              'Kata kerja hanya menyatakan maksud surat. Pesananmu ada di dalam paket.',
              'Method hanya menyatakan tindakan, misalnya POST.',
            ),
          },
        ],
        answer: 'b',
        explainCorrect: t('Body adalah isi paket. Di situ pesananmu dititipkan.', 'Body membawa data utama yang dikirim.'),
        hints: [t('Ingat isi paket di dalam amplop.', 'Cari bagian yang membawa data.')],
        tags: ['request'],
      }),
      makeTf({
        id: 'b02-l01-r2',
        prompt: t(
          'Baris pertama surat balasan berisi angka jawaban.',
          'Baris pertama response selalu berisi kode status 3 digit.',
        ),
        answer: true,
        explainCorrect: t('Angka itu langsung memberi tahu hasil suratmu.', 'Contohnya 200 OK atau 201 Created.'),
        explainWrong: t(
          'Surat balasan memang dibuka dengan angka jawaban. Angka itu memberi tahu hasilnya.',
          'Response memang dibuka dengan baris status 3 digit agar hasilnya langsung terbaca.',
        ),
        hints: [t('Lihat lagi bagian paling atas surat balasan.', 'Ingat contoh response dengan baris status di atas.')],
        tags: ['response'],
      }),
    ],
    recap: t(
      'Surat pesanan punya kata kerja, alamat, header, dan body.',
      'Pesan HTTP berisi method, alamat, header (keterangan), dan body (isi data). Response dibuka dengan kode status.',
    ),
    companion: {
      talkPrompts: ['Apa yang kamu tulis di luar amplop, dan apa di dalam?'],
      offlineActivity:
        'Ambil amplop bekas. Tulis alamat dan pesan "Jangan dilipat" di luarnya. Masukkan kertas pesanan ke dalam amplop.',
    },
  }),

  makeLesson({
    id: 'b02-l02',
    worldId: 'b02',
    title: 'Method dan CRUD',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa memilih kata kerja yang cocok dengan tugasnya.',
      'Kamu bisa memilih method HTTP untuk setiap operasi CRUD dan membedakan PUT dari PATCH.',
    ),
    estMinutes: 6,
    introducesTerms: ['http-method'],
    usesTerms: ['request', 'endpoint', 'server'],
    warmupFrom: 'b02-l01',
    atWork: 'Kamu akan memilih method yang tepat saat membuat tombol Simpan dan Hapus yang memanggil API.',
    steps: [
      storyStep('b02/buku-tamu-crud.svg', [
        rText(
          'Pak Udin punya buku tamu. Kamu bisa membaca, menulis, mencoret, atau menghapus isinya. Kata kerja mana yang cocok untuk tiap tugas?',
          'Tombol Simpan dan Hapus di aplikasi Toko Rani harus memberi tahu server tindakan yang diminta. Tindakan itu ditulis sebagai method HTTP.',
        ),
      ]),
      conceptStep({
        title: t('Kata kerja web', 'Lima method utama'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b02', topic: 'method-buku-tamu' },
        alt: t('4 kata kerja web dan tugas masing-masing.', 'Lima method HTTP dan arti masing-masing.'),
        body: [
          rJunior('Kata kerja di web disebut '),
          jTerm('http-method', 'method'),
          rJunior('. GET membaca, POST membuat, PATCH mengubah sebagian, DELETE menghapus.'),
          pTerm('http-method', 'HTTP method'),
          rPro(
            ' adalah kata kerja yang memberi tahu server tindakan terhadap data. GET mengambil, POST membuat baru, PUT mengganti total, PATCH mengubah sebagian, dan DELETE menghapus.',
          ),
        ],
      }),
      qStep({
        id: 'b02-l02-q1',
        type: 'match',
        prompt: t(
          'Pasangkan kata kerja dengan tugasnya di buku tamu.',
          'Pasangkan method HTTP dengan tindakannya pada catatan buku tamu.',
        ),
        difficulty: 1,
        left: [
          { id: 'g', label: t('GET') },
          { id: 'p', label: t('POST') },
          { id: 'pa', label: t('PATCH') },
          { id: 'd', label: t('DELETE') },
        ],
        right: [
          { id: 'r_pa', label: t('Mencoret satu kata dan menggantinya') },
          { id: 'r_d', label: t('Menghapus seluruh catatan') },
          { id: 'r_g', label: t('Membaca isi catatan') },
          { id: 'r_p', label: t('Menulis catatan baru') },
        ],
        answer: { g: 'r_g', p: 'r_p', pa: 'r_pa', d: 'r_d' },
        explainCorrect: t(
          'Setiap kata kerja punya satu tugas. GET membaca, POST menulis baru, PATCH mencoret, DELETE menghapus.',
          'Setiap method punya satu tindakan pada catatan. GET membaca, POST membuat, PATCH mengubah sebagian, DELETE menghapus.',
        ),
        hints: [t('Ingat apa saja yang bisa dilakukan pada buku.', 'Pikirkan apa yang kamu lakukan pada buku tamu.'), undefined],
        tags: ['http-method'],
      }),
      conceptStep({
        title: t('Empat kerja data: CRUD', 'Pola dasar CRUD'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b02', topic: 'crud-dasar' },
        alt: t('Empat operasi CRUD: Create (POST), Read (GET), Update (PUT atau PATCH), Delete (DELETE).'),
        modes: ['pro'],
        body: [
          rText('Hampir semua aplikasi memakai empat operasi data, disingkat '),
          rBold('CRUD'),
          rText('. Isinya Create (POST), Read (GET), Update (PUT atau PATCH), dan Delete (DELETE). HEAD dan OPTIONS dipakai untuk mengecek header atau izin.'),
        ],
      }),
      conceptStep({
        title: t('PUT dan PATCH', 'PUT (ganti total) dan PATCH (sebagian)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b02', topic: 'put-vs-patch' },
        alt: t(
          'PUT menyobek halaman, PATCH hanya mencoret satu kata.',
          'PUT menghapus kolom stok yang tidak dikirim; PATCH menjaga stok tetap ada.',
        ),
        code: {
          lang: 'json',
          code: '// Awal: { "nama": "Tas", "harga": 90000, "stok": 5 }\n// PUT   { "nama": "Tas", "harga": 85000 } -> stok hilang!\n// PATCH { "harga": 85000 }                -> stok tetap 5',
          highlight: [2, 3],
        },
        body: [
          rBold('PUT'),
          rJunior(' menyobek satu halaman, lalu menulis ulang semuanya. '),
          rPro(' mengganti satu data secara utuh, jadi kolom yang tidak dikirim bisa hilang. '),
          rBold('PATCH'),
          rJunior(' hanya mencoret satu kata dan menggantinya.'),
          rPro(' hanya memperbarui kolom yang dikirim.'),
        ],
      }),
      simStep(
        'perakit-request',
        t(
          'Coba GET, POST, lalu DELETE, dan lihat hasilnya.',
          'Uji GET, POST, dan DELETE pada /produk atau /produk/7 di simulator.',
        ),
      ),
      limitStep({
        analogy: t('HTTP method seperti tindakan di buku tamu kertas'),
        same: [t('Setiap method punya tujuan berbeda: membaca, menambah, mengubah, atau menghapus.')],
        different: [
          t('Kalau PUT dikirim tanpa satu kolom, kolom itu bisa terhapus.'),
          t('HEAD dan OPTIONS hanya menanyakan keterangan atau izin, tanpa menyentuh data.'),
        ],
        riskyAnalogy: false,
      }),
      qStep({
        id: 'b02-l02-q2',
        type: 'sort',
        prompt: t(
          'Kelompokkan kegiatan di Toko Rani ke tugas yang cocok.',
          'Kelompokkan kegiatan di Toko Rani ke operasi CRUD yang tepat.',
        ),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('Melihat daftar tas', 'Melihat daftar tas (GET)') },
          { id: 'i2', label: t('Menambah topi baru', 'Menambah produk topi baru (POST)') },
          { id: 'i3', label: t('Mengganti harga tas saja', 'Mengganti harga tas saja (PATCH)') },
          { id: 'i4', label: t('Menghapus tas lama', 'Menghapus tas lama (DELETE)') },
        ],
        bins: [
          { id: 'r', label: t('Baca', 'Read (baca)'), icon: 'search' },
          { id: 'c', label: t('Buat', 'Create (buat)'), icon: 'package' },
          { id: 'u', label: t('Ubah', 'Update (ubah)'), icon: 'file-text' },
          { id: 'd', label: t('Hapus', 'Delete (hapus)'), icon: 'zap' },
        ],
        answer: { i1: 'r', i2: 'c', i3: 'u', i4: 'd' },
        explainCorrect: t(
          'Melihat itu baca, menambah itu buat. Mengganti itu ubah, menghapus itu hapus.',
          'Fitur pengelolaan data hampir selalu berupa Create, Read, Update, atau Delete. Seperti tombol Tambah, Lihat, Ubah, dan Hapus di aplikasi catatan.',
        ),
        hints: [t('Ingat apa yang bisa kamu lakukan pada buku.', 'Cocokkan method di kurung dengan empat operasi CRUD.'), undefined],
        tags: ['http-method'],
      }),
      qStep(
        makeMcq({
          id: 'b02-l02-q3',
          prompt: t(
            'Sari ingin menambahkan pesanan kue baru. Kata kerja mana yang cocok?',
            'Method mana yang paling tepat untuk menambahkan pesanan kue baru milik Sari ke server?',
          ),
          choices: [
            { id: 'post', label: t('POST') },
            {
              id: 'get',
              label: t('GET'),
              explainWrong: t(
                'GET hanya membaca isi buku. Kamu ingin menulis catatan baru.',
                'GET hanya dipakai untuk mengambil atau membaca data.',
              ),
            },
            {
              id: 'del',
              label: t('DELETE'),
              explainWrong: t(
                'DELETE menghapus catatan. Kamu ingin menambah catatan baru.',
                'DELETE dipakai untuk menghapus data.',
              ),
            },
          ],
          answer: 'post',
          explainCorrect: t(
            'POST dipakai untuk membuat catatan baru. Seperti menulis nama tamu baru di buku.',
            'POST dipakai untuk membuat data baru di server.',
          ),
          hints: [t('Ingat tamu baru yang namanya belum ditulis.')],
          tags: ['http-method'],
        }),
      ),
      qStep(
        makeTf({
          id: 'b02-l02-q4',
          prompt: t(
            'Dengan PATCH, Rani membetulkan alamat tanpa mengubah nama di buku tamu.',
            'PATCH lebih cocok daripada PUT untuk memperbarui satu kolom, seperti harga barang.',
          ),
          answer: true,
          explainCorrect: t(
            'PATCH hanya mengubah bagian yang kamu kirim. Seperti mencoret satu kata, bukan menyobek halaman.',
            'PATCH hanya mengubah kolom yang dikirim, tanpa menghapus kolom lain.',
          ),
          explainWrong: t(
            'PUT menyobek seluruh halaman. Untuk satu kata, mencoret lebih aman.',
            'PUT mengganti seluruh data, jadi untuk mengubah harga saja, PATCH lebih aman.',
          ),
          hints: [t('Ingat: mencoret satu kata atau menyobek halaman?', 'Bandingkan berapa banyak data yang diganti.')],
          tags: ['http-method'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b02-l02-q6j',
          type: 'scenario',
          modes: ['junior'],
          story: t(
            'Buku tamu mencatat nama dan nomor kursi. Rani merobek satu halaman. Di halaman pengganti, ia hanya menulis nama.',
            'Rani mengganti halaman berisi nama dan nomor kursi dengan halaman baru yang hanya berisi nama.',
          ),
          prompt: t('Apa yang terjadi pada nomor kursi?'),
          difficulty: 3,
          choices: [
            { id: 'lost', label: t('Nomor kursi ikut hilang') },
            {
              id: 'same',
              label: t('Nomor kursi tetap ada di halaman'),
              explainWrong: t('Halaman lama sudah disobek. Tulisan di dalamnya tidak tersisa.'),
            },
            {
              id: 'moved',
              label: t('Nomor kursi pindah ke halaman lain'),
              explainWrong: t('Tulisan tidak berpindah sendiri. Halaman yang disobek ikut membuang isinya.'),
            },
          ],
          answer: 'lost',
          explainCorrect: t('PUT bekerja seperti menyobek halaman. Tulisan lama ikut hilang.'),
          hints: [t('Bayangkan halaman yang sudah disobek.')],
          tags: ['http-method'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b02-l02-q5',
          type: 'limit',
          modes: ['pro'],
          analogy: t('HTTP method seperti mencoret dan menulis di buku tamu kertas'),
          prompt: t('Mengapa menyamakan PUT dengan mengganti catatan kertas bisa menjebak?'),
          difficulty: 2,
          choices: [
            { id: 'drop', label: t('Pada PUT, kolom yang lupa dikirim bisa hilang') },
            {
              id: 'read',
              label: t('PUT hanya bisa dipakai untuk membaca data'),
              explainWrong: t('PUT adalah method resmi untuk mengganti data. Ia tidak dipakai untuk membaca.'),
            },
            {
              id: 'ink',
              label: t('PUT selalu membuat data baru, bukan mengganti'),
              explainWrong: t('PUT mengganti data yang sudah ada. Membuat data baru adalah tugas POST.'),
            },
          ],
          answer: 'drop',
          explainCorrect: t('PUT mengganti seluruh isi data dengan kiriman baru. Kolom yang tidak dikirim bisa ikut hilang.'),
          hints: [t('Pikirkan kolom yang tidak ikut dikirim.')],
          tags: ['http-method'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b02-l02-q6',
          type: 'scenario',
          modes: ['pro'],
          story: t(
            'Di database tersimpan { nama: "Tas", harga: 90000, stok: 5 }. Raka mengirim PUT /produk/12 dengan isi { nama: "Tas", harga: 85000 }.',
          ),
          prompt: t('Apa yang terjadi pada kolom stok setelah request PUT itu dijalankan?'),
          difficulty: 3,
          choices: [
            { id: 'lost', label: t('Kolom stok bisa hilang karena PUT mengganti seluruh isi') },
            {
              id: 'add',
              label: t('Stok tetap 5 karena kolom itu tidak ikut diubah'),
              explainWrong: t('PUT mengganti data dengan apa yang dikirim saja. Kolom yang tidak dikirim tidak dipertahankan.'),
            },
            {
              id: 'copy',
              label: t('Terbentuk produk baru dengan nomor 13, lengkap dengan stok kosong'),
              explainWrong: t('Membuat produk baru adalah perilaku POST, bukan PUT pada /produk/12.'),
            },
          ],
          answer: 'lost',
          explainCorrect: t('PUT mengganti total data lama dengan data yang baru dikirim.'),
          hints: [t('Ingat: PUT mengganti seluruh isi, bukan sebagian.')],
          tags: ['http-method'],
        }),
      ),
      qStep({
        id: 'b02-l02-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Tombol Tambah, Lihat, Ubah, dan Hapus membentuk satu pola operasi data. Ketik nama polanya.'),
        difficulty: 1,
        accept: ['crud'],
        explainCorrect: t('Pola itu bernama CRUD: Create, Read, Update, Delete. Hampir semua aplikasi data memakainya.'),
        hints: [t('Huruf depan tiap operasi membentuk namanya.'), undefined],
        tags: ['http-method'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b02-l02-r1',
        prompt: t(
          'Kata kerja mana yang mengubah sebagian saja, misalnya satu kata?',
          'Method HTTP mana yang mengganti sebagian data, misalnya hanya harga?',
        ),
        choices: [
          { id: 'patch', label: t('PATCH') },
          {
            id: 'put',
            label: t('PUT'),
            explainWrong: t(
              'PUT menyobek seluruh halaman dan menulis ulang.',
              'PUT mengganti data secara keseluruhan.',
            ),
          },
          {
            id: 'del',
            label: t('DELETE'),
            explainWrong: t('DELETE menghapus, bukan mengubah.', 'DELETE menghapus data, bukan mengubahnya.'),
          },
        ],
        answer: 'patch',
        explainCorrect: t(
          'PATCH hanya mencoret satu kata. Bagian lain tetap utuh.',
          'PATCH mengubah sebagian kolom tanpa menghapus kolom lain.',
        ),
        hints: [t('Ingat mencoret satu kata di halaman.', 'Cari method yang tidak mengganti semuanya.')],
        tags: ['http-method'],
      }),
      makeMcq({
        id: 'b02-l02-r2',
        prompt: t(
          'Kata kerja mana yang dipakai untuk membaca isi buku?',
          'Dalam CRUD, huruf R (Read) dipasangkan dengan method apa?',
        ),
        choices: [
          { id: 'get', label: t('GET') },
          {
            id: 'post',
            label: t('POST'),
            explainWrong: t(
              'POST menulis catatan baru. Kamu hanya ingin membaca.',
              'POST berpasangan dengan C (Create).',
            ),
          },
          {
            id: 'x',
            label: t('DELETE', 'PATCH'),
            explainWrong: t(
              'DELETE menghapus catatan. Kamu hanya ingin membaca.',
              'PATCH berpasangan dengan U (Update).',
            ),
          },
        ],
        answer: 'get',
        explainCorrect: t(
          'GET dipakai untuk membaca. Seperti membuka buku tanpa menulis apa pun.',
          'Read (membaca data) memakai method GET.',
        ),
        hints: [t('Ingat apa yang kamu lakukan saat hanya melihat.', 'R berarti membaca, bukan mengubah.')],
        tags: ['http-method'],
      }),
    ],
    recap: t(
      'GET membaca, POST membuat, PATCH mengubah, DELETE menghapus.',
      'POST membuat, GET membaca, PUT atau PATCH mengubah, dan DELETE menghapus data.',
    ),
    companion: {
      talkPrompts: ['Di daftar kontak HP, kegiatan mana yang membaca, menambah, mengubah, atau menghapus?'],
      offlineActivity:
        'Pakai satu buku catatan kecil. Tulis 3 barang belanjaan (POST), baca ulang (GET), ubah jumlah satu barang (PATCH), lalu coret satu barang (DELETE).',
    },
  }),

  makeLesson({
    id: 'b02-l03',
    worldId: 'b02',
    title: 'Safe dan idempotent: tombol lift',
    modes: ['pro'],
    objective: t('Kamu bisa membedakan sifat safe dan idempotent pada setiap method HTTP.'),
    estMinutes: 5,
    introducesTerms: ['idempotent'],
    usesTerms: ['http-method', 'request', 'server'],
    stickerId: 'tombol-lift',
    warmupFrom: 'b02-l02',
    atWork: 'Kamu akan mencegah klik ganda pada tombol Bayar supaya pembayaran tidak tercatat dua kali.',
    steps: [
      storyStep('b02/tombol-lift.svg', [
        rText(
          'Pelanggan mengetuk tombol Bayar dua kali karena sinyal lambat, dan pesanan tercatat dua kali. Tombol lift tidak berperilaku begitu: menekannya dua kali tetap memanggil satu lift.',
        ),
      ]),
      conceptStep({
        title: t('Apa arti safe?'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b02', topic: 'sifat-safe' },
        alt: t('GET hanya membaca data, jadi aman (safe) dan tidak mengubah data.'),
        body: [
          rBold('Safe'),
          rText(' (aman) adalah sifat method yang tidak mengubah data apa pun. Contohnya '),
          rCode('GET'),
          rText(', '),
          rCode('HEAD'),
          rText(', dan '),
          rCode('OPTIONS'),
          rText(', karena ketiganya hanya membaca.'),
        ],
      }),
      qStep(
        makeTf({
          id: 'b02-l03-q3',
          prompt: t('DELETE termasuk safe karena sifatnya idempotent.'),
          answer: false,
          explainCorrect: t('Pernyataan itu keliru: DELETE mengubah data di server, jadi tidak safe, walau idempotent.'),
          explainWrong: t('Safe berarti tidak mengubah data sama sekali. DELETE menghapus data.'),
          hints: [t('Tanyakan: apakah DELETE mengubah data?')],
          tags: ['idempotent', 'http-method'],
        }),
      ),
      conceptStep({
        title: t('Apa arti idempotent?'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b02', topic: 'tombol-lift' },
        alt: t('Tombol lift ditekan berkali-kali tetap menghasilkan kondisi akhir yang sama.'),
        body: [
          rTerm('idempotent', 'Idempotent'),
          rText(' adalah sifat request yang hasil akhirnya sama, dikirim sekali atau sepuluh kali. '),
          rCode('GET'),
          rText(', '),
          rCode('PUT'),
          rText(', dan '),
          rCode('DELETE'),
          rText(' bersifat idempotent.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b02-l03-q1',
          type: 'analogy',
          prompt: t('Mengapa menekan tombol lift berkali-kali menggambarkan sifat idempotent?'),
          choices: [
            { id: 'same', label: t('Hasil akhirnya tetap satu lift, berapa pun tekanannya') },
            {
              id: 'fast',
              label: t('Tombol lift hanya membaca posisi lift yang sedang naik'),
              explainWrong: t('Tombol lift tetap memanggil lift, jadi bukan sekadar membaca. Membaca saja adalah sifat safe.'),
            },
            {
              id: 'read',
              label: t('Setiap tekanan memanggil satu lift tambahan'),
              explainWrong: t('Menekan lagi tidak memanggil lift kedua. Hasil akhirnya tetap satu lift.'),
            },
          ],
          answer: 'same',
          explainCorrect: t('Idempotent berarti hasil akhir sama walau request diulang. Tombol lift tetap memanggil satu lift.'),
          hints: [t('Hitung berapa lift yang datang setelah tiga tekanan.')],
          tags: ['idempotent'],
        }),
      ),
      conceptStep({
        title: t('Mengapa POST berbeda?'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b02', topic: 'post-tidak-idempotent' },
        alt: t('POST membuat data baru setiap kali dikirim, jadi tidak idempotent.'),
        body: [
          rCode('POST'),
          rText(' tidak safe dan tidak idempotent, karena setiap kiriman membuat data baru. '),
          rCode('PATCH'),
          rText(' bergantung pada isinya: mengubah harga menjadi 85000 idempotent, tetapi menambah saldo 10000 tidak.'),
        ],
      }),
      simStep(
        'perakit-request',
        t('Kirim GET /produk berkali-kali, lalu bandingkan dengan POST /pesanan dua kali di simulator.'),
      ),
      limitStep({
        analogy: t('Tombol lift untuk operasi idempotent'),
        same: [t('Menjalankan aksi yang sama berulang kali menghasilkan kondisi akhir yang sama.')],
        different: [t('Pada DELETE, kondisi akhir sama, tetapi response kedua bisa 404, bukan 200 atau 204.')],
        riskyAnalogy: false,
      }),
      qStep({
        id: 'b02-l03-q2',
        type: 'sort',
        prompt: t('Kelompokkan request di bawah ini sebagai idempotent atau tidak idempotent.'),
        difficulty: 2,
        items: [
          { id: 'g', label: t('GET /produk') },
          { id: 'p', label: t('POST /pesanan') },
          { id: 'pu', label: t('PUT /produk/12 (isi sama)') },
          { id: 'd', label: t('DELETE /produk/12') },
        ],
        bins: [
          { id: 'yes', label: t('Idempotent (hasil akhir sama)') },
          { id: 'no', label: t('Tidak idempotent (membuat baru tiap kirim)') },
        ],
        answer: { g: 'yes', p: 'no', pu: 'yes', d: 'yes' },
        explainCorrect: t(
          'GET, PUT dengan isi sama, dan DELETE hasil akhirnya sama kalau diulang. POST membuat data baru setiap kali.',
        ),
        hints: [t('Tanyakan: kalau diulang, apakah data bertambah?'), undefined],
        tags: ['idempotent', 'http-method'],
      }),
      qStep(
        makeMcq({
          id: 'b02-l03-q4',
          type: 'why',
          base: 'Dalam tabel sifat method HTTP, PATCH diberi keterangan "idempotent: tergantung isinya".',
          prompt: t('Mengapa sifat idempotent PATCH bergantung pada isi yang dikirim?'),
          difficulty: 3,
          choices: [
            { id: 'dep', label: t('Nilai pasti seperti harga = 85000 idempotent, perintah seperti stok - 1 tidak') },
            {
              id: 'net',
              label: t('Hasilnya ditentukan jumlah kolom yang dikirim, bukan isi perintahnya'),
              explainWrong: t('Jumlah kolom tidak menentukan. Yang menentukan adalah nilai pasti atau perintah relatif.'),
            },
            {
              id: 'get',
              label: t('Hasilnya ditentukan jenis koneksi yang dipakai oleh pengirim'),
              explainWrong: t('Jenis koneksi tidak memengaruhi hasil akhir. Yang berpengaruh adalah isi perintahnya.'),
            },
          ],
          answer: 'dep',
          explainCorrect: t('Nilai pasti memberi hasil sama setiap kali. Perintah "stok - 1" dikirim 3 kali, hasilnya berkurang 3.'),
          hints: [t('Bandingkan "harga = 85000" dengan "stok - 1" kalau dikirim berulang.')],
          tags: ['idempotent', 'http-method'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b02-l03-q5',
          type: 'limit',
          analogy: t('Tombol lift untuk sifat idempotent HTTP'),
          prompt: t('Apa beda menekan tombol lift berkali-kali dan mengirim DELETE /produk/12 berkali-kali?'),
          difficulty: 2,
          choices: [
            { id: 'code', label: t('Pada DELETE kedua, server bisa membalas 404 walau data tetap terhapus') },
            {
              id: 'same',
              label: t('Keadaan akhir data berubah setiap kali DELETE diulang'),
              explainWrong: t('Keadaan akhirnya tetap sama: data terhapus. Yang berbeda adalah kode response-nya.'),
            },
            {
              id: 'one',
              label: t('DELETE hanya bisa dikirim satu kali ke tiap produk'),
              explainWrong: t('DELETE bisa dikirim ulang. Hanya kode response-nya yang bisa berbeda.'),
            },
          ],
          answer: 'code',
          explainCorrect: t('Idempotent menilai keadaan akhir data, bukan kode jawabannya. Kode 404 pada panggilan kedua tidak mengubah keadaan itu.'),
          hints: [t('Bedakan keadaan data dari kode jawaban.')],
          tags: ['idempotent'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b02-l03-q6',
          type: 'scenario',
          story: t(
            'Sinyal HP Bito tersendat saat ia mengetuk "Bayar Pesanan" (POST /pembayaran). Aplikasi otomatis mengirim request ulang dua kali.',
          ),
          prompt: t('Apa bahaya yang bisa terjadi karena POST tidak idempotent?'),
          difficulty: 2,
          choices: [
            { id: 'dup', label: t('Pembayaran tercatat dua kali tanpa penjagaan khusus') },
            {
              id: 'safe',
              label: t('Tidak ada efek karena POST hanya membaca saldo'),
              explainWrong: t('POST membuat transaksi baru setiap kali dipanggil, bukan hanya membaca.'),
            },
            {
              id: 'del',
              label: t('Request kedua ditolak otomatis oleh server'),
              explainWrong: t('Server tidak menolak otomatis. Tanpa penjagaan, request kedua diproses seperti yang pertama.'),
            },
          ],
          answer: 'dup',
          explainCorrect: t('POST membuat catatan baru setiap kali dikirim. Tombol pembayaran perlu penjagaan supaya tidak terkirim dua kali.'),
          hints: [t('Hitung berapa transaksi yang tercatat.')],
          tags: ['idempotent', 'http-method'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b02-l03-r1',
        prompt: t('Method mana yang bersifat safe, yaitu tidak mengubah data di server?'),
        choices: [
          { id: 'get', label: t('GET') },
          { id: 'post', label: t('POST'), explainWrong: t('POST membuat data baru, jadi tidak safe.') },
          { id: 'del', label: t('DELETE'), explainWrong: t('DELETE menghapus data, jadi tidak safe.') },
        ],
        answer: 'get',
        explainCorrect: t('GET hanya membaca data, jadi bersifat safe dan idempotent.'),
        hints: [t('Cari method yang hanya membaca.')],
        tags: ['idempotent', 'http-method'],
      }),
      makeTf({
        id: 'b02-l03-r2',
        prompt: t('Request yang dikirim berulang dan memberi hasil akhir data yang sama disebut idempotent.'),
        answer: true,
        explainCorrect: t('Seperti tombol lift, pengulangan request idempotent memberi hasil akhir yang sama.'),
        explainWrong: t('Idempotent memang berarti hasil akhir sama walau request diulang.'),
        hints: [t('Ingat tombol lift yang ditekan berkali-kali.')],
        tags: ['idempotent'],
      }),
    ],
    recap: t('Safe berarti tidak mengubah data (GET). Idempotent berarti diulang hasilnya sama (GET, PUT, DELETE).'),
  }),

  makeLesson({
    id: 'b02-l04',
    worldId: 'b02',
    title: 'Kode status: 2xx, 4xx, 5xx',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menebak arti angka jawaban dari angka depannya.',
      'Kamu bisa membedakan arti kode status 200, 201, 204, 304, 400, 401, 403, 404, 422, 429, dan 5xx.',
    ),
    estMinutes: 6,
    introducesTerms: ['status-code'],
    usesTerms: ['response', 'request', 'server', 'endpoint'],
    warmupFrom: 'b02-l03',
    atWork: 'Kamu akan membaca kode status di tab Network DevTools untuk tahu form gagal karena 422 atau 500.',
    steps: [
      storyStep('b02/kode-status.svg', [
        rText(
          'Balasan dari kantor pos selalu ditempeli angka sandi 3 digit. Angka itu memberi kabar singkat. Apa arti angka pertamanya?',
          'Form pendaftaran Toko Rani menampilkan "gagal", dan kamu perlu tahu penyebabnya. Baris pertama response memuat kode status 3 digit yang meringkas nasib request.',
        ),
      ]),
      conceptStep({
        title: t('Lihat angka pertamanya', 'Lima kelompok kode status'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b02', topic: 'kelompok-status' },
        alt: t(
          '2xx berhasil, 4xx kendala di pihak peminta, 5xx dapur bermasalah.',
          'Kelompok 1xx info, 2xx berhasil, 3xx pindah, 4xx salah di peminta, 5xx salah di server.',
        ),
        body: [
          rTerm('status-code', 'Kode status'),
          rJunior(
            ' adalah angka jawaban dari kantor pos. 200 berarti berhasil, 201 berarti pesanan baru tercatat. 4xx kendala di pihak peminta. 500 dan 503 berarti dapur bermasalah.',
          ),
          rPro(
            ' adalah angka 3 digit di baris pertama response. Lihat angka pertamanya: 1xx info, 2xx berhasil, 3xx pindah (redirect), 4xx salah dari peminta, 5xx gangguan di server.',
          ),
        ],
      }),
      qStep({
        id: 'b02-l04-q1',
        type: 'sort',
        prompt: t('Masukkan tiap angka ke keranjang yang benar.', 'Kelompokkan kode status di bawah ini ke 2xx, 4xx, atau 5xx.'),
        difficulty: 1,
        items: [
          { id: 'c200', label: t('200', '200 OK') },
          { id: 'c201', label: t('201', '201 Created') },
          { id: 'c401', label: t('401', '401 Unauthorized') },
          { id: 'c404', label: t('404', '404 Not Found') },
          { id: 'c500', label: t('500', '500 Server Error') },
          { id: 'c503', label: t('503', '503 Unavailable') },
        ],
        bins: [
          { id: 'b2', label: t('Berhasil', '2xx (berhasil)'), icon: 'package' },
          { id: 'b4', label: t('Permintaan terhalang', '4xx (kendala di pihak peminta)'), icon: 'mail' },
          { id: 'b5', label: t('Dapur rusak', '5xx (masalah di server)'), icon: 'chef-hat' },
        ],
        answer: {
          c200: 'b2',
          c201: 'b2',
          c401: 'b4',
          c404: 'b4',
          c500: 'b5',
          c503: 'b5',
        },
        explainCorrect: t(
          'Angka pertama menunjukkan kelompoknya. 2 berhasil, 4 permintaan terhalang, 5 dapur bermasalah.',
          'Angka pertama menentukan kelompok: 2 berhasil, 4 salah di peminta, 5 salah di server.',
        ),
        hints: [t('Ingat: lihat angka pertama jawabannya.', 'Cukup lihat digit pertama.'), undefined],
        tags: ['status-code'],
      }),
      conceptStep({
        title: t('Kode 2xx dan 3xx', 'Kode 2xx dan 3xx yang sering muncul'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b02', topic: 'kode-sukses' },
        alt: t('Arti kode 200 OK, 201 Created, 204 No Content, 301 dan 302 Moved, 304 Not Modified.'),
        modes: ['pro'],
        body: [
          rCode('200'),
          rText(' berarti berhasil. '),
          rCode('201'),
          rText(' berarti data baru tercatat setelah POST. '),
          rCode('204'),
          rText(' berarti selesai tanpa body, sering setelah DELETE. '),
          rCode('301'),
          rText(' atau '),
          rCode('302'),
          rText(' berarti alamat pindah. '),
          rCode('304'),
          rText(' berarti isinya belum berubah, jadi browser memakai salinan lamanya.'),
        ],
      }),
      conceptStep({
        title: t('Tiga angka penting', 'Kode 4xx dan 5xx yang perlu dikenal'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b02', topic: 'kode-gagal' },
        alt: t(
          'Tiga angka penting: 401, 403, dan 404.',
          'Perbedaan 400, 401, 403, 404, 409, 422, 429, dan kelompok 5xx.',
        ),
        body: [
          rJunior(
            '401 berarti kamu belum masuk. 403 berarti kamu tidak punya izin. 404 berarti alamat tidak ditemukan.',
          ),
          rCode('400', ['pro']),
          rPro(' menandakan masalah di request, misalnya formatnya rusak. '),
          rCode('422', ['pro']),
          rPro(' berarti format request terbaca, tetapi isi gagal lolos aturan, misalnya alamat email tanpa tanda @. '),
          rCode('401', ['pro']),
          rPro(' berarti belum login, dan '),
          rCode('403', ['pro']),
          rPro(' berarti tidak punya izin. '),
          rCode('404', ['pro']),
          rPro(' berarti data tidak ada. '),
          rCode('409', ['pro']),
          rPro(' berarti request berbenturan dengan keadaan data. '),
          rCode('429', ['pro']),
          rPro(' berarti terlalu banyak request. '),
          rCode('500', ['pro']),
          rPro(' sampai '),
          rCode('504', ['pro']),
          rPro(' berarti bug atau gangguan di server.'),
        ],
      }),
      simStep(
        'penyortir-status',
        t(
          'Ketuk keranjang 2xx, 4xx, atau 5xx yang cocok untuk setiap kartu!',
          'Kelompokkan tiap kode status ke 2xx, 4xx, atau 5xx.',
        ),
      ),
      limitStep({
        analogy: t('4xx seperti salah tamu memesan, 5xx seperti kompor dapur rusak'),
        same: [t('Developer langsung tahu apakah kelirunya di permintaan atau di server.')],
        different: [
          t('4xx tidak selalu salah orang yang mengetik. Bug di frontend juga bisa menyebabkannya.'),
          t('429 bukan karena isi request salah, tetapi karena terlalu sering mengirim.'),
        ],
        riskyAnalogy: false,
      }),
      qStep({
        id: 'b02-l04-q2',
        type: 'match',
        prompt: t('Pasangkan angka jawaban dengan artinya.', 'Pasangkan kode status dengan maknanya.'),
        difficulty: 2,
        left: [
          { id: 'k201', label: t('201', '201 Created') },
          { id: 'k401', label: t('401', '401 Unauthorized') },
          { id: 'k403', label: t('403', '403 Forbidden') },
          { id: 'k500', label: t('500', '500 Server Error') },
        ],
        right: [
          {
            id: 'm403',
            label: t('Aku tahu kamu siapa, tetapi kamu dilarang masuk', 'Server menolak karena akses tidak diizinkan'),
          },
          { id: 'm500', label: t('Kompor dapur rusak, jadi pesanan tertunda', 'Server mengalami gangguan internal') },
          { id: 'm201', label: t('Pesanan baru sudah dicatat di dapur', 'Data baru berhasil dibuat') },
          { id: 'm401', label: t('Kamu siapa? Tunjukkan kartu masukmu dulu', 'Server perlu bukti identitas yang sah') },
        ],
        answer: { k201: 'm201', k401: 'm401', k403: 'm403', k500: 'm500' },
        explainCorrect: t(
          'Angka 401 dan 403 sering tertukar. 401 belum dikenal, 403 dikenal tetapi dilarang.',
          '401 berarti bukti identitas belum sah atau belum dikirim. 403 berarti server menolak memberi akses.',
        ),
        hints: [t('Bayangkan penjaga pintu restoran dan dapurnya.', 'Pisahkan dulu kode 4xx dan 5xx.'), undefined],
        tags: ['status-code'],
      }),
      qStep(
        makeMcq({
          id: 'b02-l04-q3',
          prompt: t(
            'Sari sudah masuk dan membuka ruang khusus penjaga toko. Jawaban apa yang muncul?',
            'Sari sudah login sebagai pembeli biasa, lalu membuka halaman admin toko. Server membalas dengan kode apa?',
          ),
          choices: [
            { id: '403', label: t('403', '403 Forbidden') },
            {
              id: '401',
              label: t('401', '401 Unauthorized'),
              explainWrong: t(
                '401 untuk orang yang belum masuk. Sari sudah masuk!',
                '401 berarti belum login sama sekali. Sari sudah login.',
              ),
            },
            {
              id: '201',
              label: t('201', '201 Created'),
              explainWrong: t(
                '201 berarti pesanan baru dicatat. Sari tidak membuat apa pun.',
                '201 berarti data baru berhasil dibuat.',
              ),
            },
          ],
          answer: '403',
          explainCorrect: t(
            '403 berarti kamu dikenal, tetapi dilarang masuk. Seperti anak yang tidak boleh masuk ruang guru.',
            '403 berarti identitas sudah dikenal, tetapi tidak punya izin akses.',
          ),
          hints: [t('Ingat: Sari sudah dikenal oleh penjaga.', 'Bedakan belum dikenal dan sudah dikenal.')],
          tags: ['status-code'],
        }),
      ),
      qStep(
        makeTf({
          id: 'b02-l04-q4',
          prompt: t(
            'Meja yang kamu pesan sudah diambil orang lain. Jawabannya berawalan 4.',
            'Kode 409 Conflict dipakai saat data bentrok, misalnya meja yang mau dipesan sudah diambil orang lain.',
          ),
          answer: true,
          explainCorrect: t(
            'Mejanya sudah dipesan orang lain. Itu kendala pada permintaanmu.',
            '409 Conflict berarti request bentrok dengan keadaan data yang sudah ada.',
          ),
          explainWrong: t(
            'Meja sudah terisi, jadi permintaanmu bentrok. Itu masuk kelompok 4xx.',
            '409 memang dipakai saat request bertabrakan dengan kondisi data yang ada.',
          ),
          hints: [t('Apakah dapurnya rusak atau mejanya sudah terisi?', 'Ingat: bentrok dengan data yang sudah ada.')],
          tags: ['status-code'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b02-l04-q6j',
          type: 'scenario',
          modes: ['junior'],
          story: t('Pesananmu sudah sampai di dapur. Tetapi kompor dapur rusak.'),
          prompt: t('Jawabannya berawalan angka berapa?'),
          difficulty: 2,
          choices: [
            { id: 'c5', label: t('Berawalan 5') },
            {
              id: 'c4',
              label: t('Berawalan 4'),
              explainWrong: t('Awalan 4 untuk pesanan yang salah. Pesananmu benar, dapurnya yang rusak.'),
            },
            {
              id: 'c2',
              label: t('Berawalan 2'),
              explainWrong: t('Awalan 2 untuk pesanan yang berhasil. Pesananmu belum dimasak.'),
            },
          ],
          answer: 'c5',
          explainCorrect: t('Angka 5 berarti dapur bermasalah. Seperti kompor yang rusak.'),
          hints: [t('Siapa yang bermasalah: tamu atau dapur?')],
          tags: ['status-code'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b02-l04-q5',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Kode 4xx berarti kesalahan peminta'),
          prompt: t('Mengapa aturan "4xx selalu salah orang yang mengetik" tidak selalu tepat?'),
          difficulty: 2,
          choices: [
            { id: 'fe', label: t('Bug di frontend bisa menyebabkan 400 atau 404') },
            {
              id: 'ok',
              label: t('404 hanya muncul saat server sedang mengalami gangguan'),
              explainWrong: t('Server yang rusak memakai kelompok 5xx. 404 berarti data atau alamat tidak ditemukan.'),
            },
            {
              id: 'srv',
              label: t('Semua kode 4xx berasal dari bug di server'),
              explainWrong: t('Bug di server memakai kelompok 5xx. Kelompok 4xx berasal dari sisi peminta.'),
            },
          ],
          answer: 'fe',
          explainCorrect: t(
            'Peminta di aplikasi adalah program frontend, bukan hanya manusia yang mengetik. Bug di program itu juga menyebabkan 4xx.',
          ),
          hints: [t('Siapa saja yang bisa menjadi peminta?')],
          tags: ['status-code', 'frontend'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b02-l04-q6',
          type: 'scenario',
          modes: ['pro'],
          story: t(
            'Dimas mengisi form pendaftaran Toko Rani dengan email "dimas-tanpa-at". Server bisa membaca JSON-nya, tetapi gagal memeriksa format email.',
          ),
          prompt: t('Kode status mana yang paling tepat dikirim server?'),
          difficulty: 3,
          choices: [
            { id: '422', label: t('422 Unprocessable Content') },
            {
              id: '502',
              label: t('502 Bad Gateway'),
              explainWrong: t('502 berarti gangguan antar server. Email yang salah format bukan masalah jaringan.'),
            },
            {
              id: '204',
              label: t('204 No Content'),
              explainWrong: t('204 berarti berhasil tanpa isi balasan. Di sini pendaftaran ditolak.'),
            },
          ],
          answer: '422',
          explainCorrect: t('422 berarti struktur pesan terbaca, tetapi isinya gagal lolos aturan validasi.'),
          hints: [t('Pesan terbaca, tetapi isinya tidak lolos aturan.')],
          tags: ['status-code'],
        }),
      ),
      qStep({
        id: 'b02-l04-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Aplikasi mengirim request terlalu sering, dan server membalas "Too Many Requests". Ketik kode 3 digitnya.'),
        difficulty: 2,
        accept: ['429'],
        explainCorrect: t('429 Too Many Requests memberi tahu aplikasi agar memperlambat request-nya.'),
        hints: [t('Kode ini ada di kelompok 4xx.'), undefined],
        tags: ['status-code'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b02-l04-r1',
        prompt: t(
          'Pesanan baru berhasil kamu tulis lewat POST. Angka jawaban mana yang cocok?',
          'Kode status 201 Created umumnya dikembalikan setelah method apa?',
        ),
        choices: [
          { id: 'post', label: t('201', 'POST (berhasil membuat data baru)') },
          {
            id: 'get',
            label: t('200', 'GET (hanya membaca data)'),
            explainWrong: t(
              '200 berarti berhasil. 201 menegaskan pesanan baru sudah tercatat.',
              'GET biasanya dibalas 200 OK.',
            ),
          },
          {
            id: 'x',
            label: t('404', 'DELETE (menghapus data)'),
            explainWrong: t(
              '404 berarti alamat tidak ketemu. Pesananmu berhasil ditulis.',
              'DELETE biasanya dibalas 204 atau 200, bukan 201.',
            ),
          },
        ],
        answer: 'post',
        explainCorrect: t(
          '201 berarti pesanan baru dicatat. Cocok untuk surat yang menulis catatan baru.',
          '201 Created menandakan data baru selesai dicatat setelah POST.',
        ),
        hints: [t('Ingat angka untuk pesanan baru dicatat.', 'Cari method yang membuat data baru.')],
        tags: ['status-code', 'http-method'],
      }),
      makeMcq({
        id: 'b02-l04-r2',
        prompt: t(
          'Dapur rusak saat memasak pesananmu. Jawabannya berawalan angka berapa?',
          'Server mengalami bug saat memproses request. Kelompok kode status mana yang muncul?',
        ),
        choices: [
          { id: '5xx', label: t('Berawalan 5', '5xx (misalnya 500 Internal Server Error)') },
          {
            id: '2xx',
            label: t('Berawalan 2', '2xx (misalnya 200 OK)'),
            explainWrong: t('Awalan 2 untuk pesanan yang berhasil. Dapur yang rusak berawalan 5.', '2xx adalah tanda berhasil.'),
          },
          {
            id: '4xx',
            label: t('Berawalan 4', '4xx (misalnya 404 Not Found)'),
            explainWrong: t('Awalan 4 untuk pesanan yang salah. Dapur yang rusak berawalan 5.', '4xx berasal dari sisi peminta, bukan bug di server.'),
          },
        ],
        answer: '5xx',
        explainCorrect: t(
          'Angka 5 berarti dapur bermasalah.',
          'Kelompok 5xx menandakan gangguan atau bug di sisi server.',
        ),
        hints: [t('Siapa yang bermasalah: tamu atau dapur?', 'Bug di server masuk kelompok mana?')],
        tags: ['status-code'],
      }),
    ],
    recap: t(
      '2xx berhasil, 4xx kendala di pihak peminta, 5xx dapur bermasalah.',
      'Angka pertama kode status menunjukkan hasil: 2xx berhasil, 4xx salah di peminta, 5xx salah di server.',
    ),
    companion: {
      talkPrompts: ['Kamu pernah melihat tulisan 404 saat salah mengetik alamat? Apa artinya?'],
      offlineActivity:
        'Buat 3 kartu kertas bertuliskan 200 (berhasil), 404 (tidak ada), dan 500 (dapur rusak), lalu tebak pesanan temanmu.',
    },
  }),

  makeLesson({
    id: 'b02-l05',
    worldId: 'b02',
    title: 'Path, query, header, body',
    modes: ['pro'],
    objective: t('Kamu bisa memilih tempat yang aman untuk menitipkan data: path, query, header, atau body.'),
    estMinutes: 5,
    introducesTerms: ['header-body'],
    usesTerms: ['request', 'url', 'endpoint', 'http-method', 'https'],
    warmupFrom: 'b02-l04',
    atWork: 'Kamu akan memutuskan data mana masuk path, query, atau header saat mendesain endpoint.',
    steps: [
      storyStep('b02/kantong-request.svg', [
        rText(
          'Pesan HTTP punya empat tempat untuk menitipkan data, yaitu path, query, header, dan body. Rahasia yang salah tempat bisa bocor lewat riwayat browser dan log server.',
        ),
      ]),
      conceptStep({
        title: t('Path dan query parameter'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b02', topic: 'path-vs-query' },
        alt: t('GET /toko/7/produk/12?warna=merah&urut=harga: path menunjuk benda, query mengatur cara.'),
        code: {
          lang: 'http',
          code: 'GET /toko/7/produk/12?warna=merah&urut=harga',
          highlight: [1],
        },
        body: [
          rTerm('header-body', 'Path parameter'),
          rText(' ('),
          rCode('/toko/7/produk/12'),
          rText(') menunjuk '),
          rBold('benda yang dituju'),
          rText('. '),
          rBold('Query parameter'),
          rText(' ('),
          rCode('?warna=merah'),
          rText(') mengatur cara tampil, seperti filter, pencarian, urutan, dan nomor halaman.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b02-l05-q5',
          type: 'scenario',
          story: t('Kamu ingin mengambil ulasan produk nomor 12 yang hanya bintang 5, diurutkan dari yang terbaru.'),
          prompt: t('Susunan path dan query mana yang paling rapi?'),
          difficulty: 2,
          choices: [
            { id: 'ok', label: t('GET /produk/12/ulasan?bintang=5&urut=terbaru') },
            {
              id: 'bad1',
              label: t('GET /bintang/5/urut/terbaru?id=12'),
              explainWrong: t('Benda yang dituju, yaitu produk 12, harus ada di path. Filter ada di query.'),
            },
            {
              id: 'bad2',
              label: t('GET /produk/12/ulasan/bintang/5/urut/terbaru'),
              explainWrong: t('Filter bintang dan urutan adalah pengaturan tampilan, jadi masuk query, bukan path.'),
            },
          ],
          answer: 'ok',
          explainCorrect: t('Produk 12 adalah benda yang dituju, jadi masuk path. Bintang 5 dan urutan adalah filter, jadi masuk query.'),
          hints: [t('Tanyakan: ini benda yang dituju atau pengaturan tampilan?')],
          tags: ['header-body', 'http-method'],
        }),
      ),
      conceptStep({
        title: t('Header request yang perlu dikenal'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b02', topic: 'daftar-header' },
        alt: t('Fungsi Content-Type, Accept, Authorization, Cookie, Cache-Control, dan User-Agent.'),
        body: [
          rCode('Content-Type'),
          rText(' menyebut format body yang dikirim, misalnya '),
          rCode('application/json'),
          rText('. '),
          rCode('Accept'),
          rText(' meminta format balasan. '),
          rCode('Authorization'),
          rText(' membawa token bukti identitas, dan '),
          rCode('User-Agent'),
          rText(' menyebut aplikasi pengirim.'),
        ],
      }),
      conceptStep({
        title: t('Body, dan larangan rahasia di URL'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b02', topic: 'keamanan-url' },
        alt: t('Peringatan: jangan menaruh kata sandi atau data pribadi di path atau query URL.'),
        body: [
          rBold('Body'),
          rText(' dipakai untuk mengirim data form yang akan disimpan atau diubah. '),
          rBold('Awas:'),
          rText(' jangan menaruh kata sandi atau data pribadi di '),
          rTerm('url', 'URL'),
          rText(' (path atau query). Riwayat browser dan log server menyimpan alamat lengkapnya. Taruh rahasia di header atau body.'),
        ],
      }),
      simStep(
        'perakit-request',
        t('Bandingkan endpoint daftar /produk dengan endpoint path parameter /produk/7 di simulator.'),
      ),
      limitStep({
        analogy: t('Header seperti tulisan di luar amplop, body seperti isi surat'),
        same: [t('Header memberi aturan pengantaran. Body membawa data inti.')],
        different: [
          t(
            'Amplop kertas terbuka bagi kurir, tetapi HTTPS mengenkripsi seluruh isi pesan selama perjalanan. URL tetap tercatat di riwayat browser dan log akses.',
          ),
        ],
        riskyAnalogy: false,
      }),
      qStep({
        id: 'b02-l05-q1',
        type: 'match',
        prompt: t('Pasangkan empat tempat menitipkan data dengan contohnya.'),
        difficulty: 2,
        left: [
          { id: 'path', label: t('Path parameter') },
          { id: 'query', label: t('Query parameter') },
          { id: 'hdr', label: t('Header') },
          { id: 'bdy', label: t('Body') },
        ],
        right: [
          { id: 'ex_hdr', label: t('Authorization: Bearer token123') },
          { id: 'ex_bdy', label: t('{ "nama": "Tas Kanvas", "jumlah": 2 }') },
          { id: 'ex_q', label: t('?cari=tas&halaman=2') },
          { id: 'ex_p', label: t('/produk/12') },
        ],
        answer: { path: 'ex_p', query: 'ex_q', hdr: 'ex_hdr', bdy: 'ex_bdy' },
        explainCorrect: t('Path menunjuk benda, query menyaring atau mengurutkan. Header membawa keterangan, body membawa data.'),
        hints: [t('Pisahkan alamat (path dan query) dari amplop dan isi.'), undefined],
        tags: ['header-body', 'url'],
      }),
      qStep({
        id: 'b02-l05-q2',
        type: 'spotbug',
        prompt: t('Ketuk baris pada request di bawah ini yang membahayakan keamanan kata sandi.'),
        difficulty: 2,
        lines: [
          'POST /masuk?kata_sandi=rahasia123 HTTP/1.1',
          'Host: api.toko-rani.example',
          'Content-Type: application/json',
          '{ "email": "rani@toko-rani.example" }',
        ],
        answer: [1],
        explainCorrect: t('Kata sandi di URL ikut tercatat di riwayat browser. Taruh kata sandi di body, bukan di alamat.'),
        hints: [t('Cari bagian alamat yang memuat data pribadi.'), undefined],
        tags: ['header-body', 'url'],
      }),
      qStep(
        makeMcq({
          id: 'b02-l05-q3',
          prompt: t('Header mana yang menyebut format body yang dikirim?'),
          choices: [
            { id: 'ct', label: t('Content-Type: application/json') },
            {
              id: 'ua',
              label: t('User-Agent: Mozilla/5.0 Chrome'),
              explainWrong: t('User-Agent hanya menyebut aplikasi pengirim.'),
            },
            {
              id: 'cc',
              label: t('Accept: application/json'),
              explainWrong: t('Accept menyebut format balasan yang diinginkan, bukan format body yang dikirim.'),
            },
          ],
          answer: 'ct',
          explainCorrect: t('Content-Type menyebut format body yang kamu kirim. Server memakainya untuk membaca isi request.'),
          hints: [t('Cari header yang menjelaskan isi kiriman.')],
          tags: ['header-body'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b02-l05-q4',
          type: 'limit',
          analogy: t('URL seperti alamat di luar amplop yang tercatat di kantor pos'),
          prompt: t('Mengapa kata sandi tetap dilarang di URL walau memakai HTTPS?'),
          difficulty: 2,
          choices: [
            { id: 'log', label: t('URL tercatat polos di riwayat browser, bookmark, dan log server') },
            {
              id: 'https',
              label: t('HTTPS hanya mengenkripsi isi body dan melewatkan bagian path'),
              explainWrong: t('HTTPS mengenkripsi seluruh koneksi saat melewati jaringan. Masalahnya ada pada penyimpanan di riwayat dan log.'),
            },
            {
              id: 'len',
              label: t('Server sering menolak request yang memakai query parameter panjang'),
              explainWrong: t('Query tidak membuat request ditolak. Masalahnya ada pada riwayat dan log.'),
            },
          ],
          answer: 'log',
          explainCorrect: t('Riwayat browser dan log server sering menyimpan alamat lengkap secara polos.'),
          hints: [t('Pikirkan di mana alamat disimpan setelah perjalanan selesai.')],
          tags: ['header-body', 'https', 'url'],
        }),
      ),
      qStep({
        id: 'b02-l05-q6',
        type: 'fill',
        prompt: t('Lengkapi pasangan header HTTP sesuai fungsinya.'),
        difficulty: 2,
        template: 'Header ___ menyebut format body yang dikirim, ___ menentukan format jawaban yang diinginkan, dan ___ membawa token izin.',
        bank: ['Content-Type', 'Accept', 'Authorization', 'User-Agent'],
        answer: ['Content-Type', 'Accept', 'Authorization'],
        explainCorrect: t('Content-Type untuk isi yang dikirim, Accept untuk format jawaban, Authorization untuk bukti identitas.'),
        hints: [t('Satu header mengatur isi, satu jawaban, satu identitas.'), undefined],
        tags: ['header-body'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b02-l05-r1',
        prompt: t('Pada GET /produk/12?warna=hitam, bagian mana yang menunjuk benda yang dituju?'),
        choices: [
          { id: 'p', label: t('Path parameter (/produk/12)') },
          { id: 'q', label: t('Query parameter (?warna=hitam)'), explainWrong: t('Query mengatur saringan atau cara tampil.') },
          { id: 'm', label: t('Method GET'), explainWrong: t('Method hanya menentukan tindakan, yaitu mengambil data.') },
        ],
        answer: 'p',
        explainCorrect: t('Path menunjuk sumber data yang spesifik. Query menyaring atau mengurutkan.'),
        hints: [t('Cari bagian yang menjawab "yang mana".')],
        tags: ['header-body'],
      }),
      makeTf({
        id: 'b02-l05-r2',
        prompt: t('Kata sandi aman ditaruh di query selama memakai HTTPS.'),
        answer: false,
        explainCorrect: t('Pernyataan itu keliru: riwayat browser menyimpan URL lengkap. Rahasia harus ada di header atau body.'),
        explainWrong: t('HTTPS tidak menyembunyikan URL dari riwayat dan log. Rahasia harus ada di header atau body.'),
        hints: [t('Ingat di mana URL tersimpan setelah dipakai.')],
        tags: ['header-body', 'url'],
      }),
    ],
    recap: t('Path menunjuk benda, query mengatur filter dan urutan. Header membawa keterangan dan izin, body membawa data.'),
  }),

  makeLesson({
    id: 'b02-l06',
    worldId: 'b02',
    title: 'Cookie dan cache',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menjelaskan guna cookie dan simpanan sementara.',
      'Kamu bisa menjelaskan Set-Cookie dan Cookie, cache dengan ETag, dan perbedaan HTTP/1.1, HTTP/2, dan HTTP/3.',
    ),
    estMinutes: 5,
    introducesTerms: ['cookie-cache'],
    usesTerms: ['browser', 'server', 'response', 'status-code', 'header-body'],
    stickerId: 'cap-tangan',
    warmupFrom: 'b02-l05',
    atWork: 'Kamu akan mengecek tab Application dan Network di DevTools untuk melihat cookie dan cache sebuah situs.',
    steps: [
      storyStep('b02/cap-tangan.svg', [
        rText(
          'Penjaga menempel cap di tanganmu. Saat kamu kembali, ia langsung ingat. Bagaimana web mengingatmu?',
          'Pelanggan Toko Rani tetap login setelah pindah halaman, dan gambar produk muncul cepat. Dua trik di balik itu adalah cookie dan cache.',
        ),
      ]),
      conceptStep({
        title: t('Cookie, cap tangan', 'Set-Cookie dan Cookie'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b02', topic: 'cap-tangan' },
        alt: t(
          'Cap kecil dari penjaga dibawa kembali saat kamu masuk lagi.',
          'Diagram: Cookie dititipkan di kunjungan pertama dan dibawa kembali di kunjungan berikutnya.',
        ),
        body: [
          rJunior('Penjaga menempel cap kecil di tanganmu. Cap itu disebut '),
          jTerm('cookie-cache', 'cookie'),
          rJunior('. Setiap kamu kembali, browser membawanya, jadi server ingat kamu.'),
          pTerm('cookie-cache', 'Cookie'),
          rPro(
            ' adalah data kecil yang dititipkan server lewat Set-Cookie. Pada kunjungan berikutnya, browser mengirim Cookie itu kembali. Dengan begitu server mengingat status loginmu.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b02-l06-q1',
          type: 'analogy',
          prompt: t(
            'Cap di tanganmu ikut terbawa saat lewat pintu. Itu apa di web?',
            'Cap tangan di taman bermain terbawa setiap kamu melewati pintu. Apa padanannya di web?',
          ),
          choices: [
            { id: 'ck', label: t('Cookie') },
            {
              id: 'er',
              label: t('Angka jawaban', 'Header Accept'),
              explainWrong: t(
                'Angka jawaban berisi kabar hasil. Penanda pengunjung adalah cookie.',
                'Accept hanya menyebut format balasan yang diinginkan.',
              ),
            },
            {
              id: 'url',
              label: t('Alamat halaman', 'Path URL'),
              explainWrong: t(
                'Alamat menunjuk tujuan, bukan penanda pengunjung. Penanda itu adalah cookie.',
                'Path menunjuk alamat halaman.',
              ),
            },
          ],
          answer: 'ck',
          explainCorrect: t(
            'Cookie dititipkan server, lalu dibawa browser setiap kali kamu kembali. Seperti cap di tanganmu.',
            'Cookie dititipkan lewat Set-Cookie, lalu dibawa kembali oleh browser.',
          ),
          hints: [t('Ingat cap yang ditempel penjaga di tanganmu.', 'Cari yang dibawa kembali otomatis oleh browser.')],
          tags: ['cookie-cache'],
        }),
      ),
      conceptStep({
        title: t('Cache dan ETag: hemat kuota', 'Cache dan ETag (304 Not Modified)'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b02', topic: 'cache-etag' },
        alt: t(
          'Browser bertanya apakah gambar masih sama, lalu server menjawab 304.',
          'Server menjawab 304 Not Modified bila isi belum berubah.',
        ),
        body: [
          rJunior('Browser menyimpan salinan gambar di cache, simpanan sementara. Ia bertanya ke server: gambar ini masih sama? Kalau sama, server menjawab 304.'),
          rPro('Browser menyimpan salinan file di '),
          pTerm('cookie-cache', 'cache'),
          rPro('. Server memberi label versi '),
          rCode('ETag', ['pro']),
          rPro(' pada setiap file. Kalau label masih sama, server cukup menjawab '),
          rCode('304 Not Modified', ['pro']),
          rPro(', jadi browser memakai salinannya dan hemat kuota.'),
        ],
      }),
      conceptStep({
        title: t('HTTP/1.1, HTTP/2, dan HTTP/3'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b02', topic: 'versi-http' },
        alt: t('Perbandingan jalan satu lajur HTTP/1.1, jalan tol HTTP/2, dan HTTP/3 di atas QUIC.'),
        modes: ['pro'],
        body: [
          rText(
            'HTTP/1.1 melayani satu permintaan per saat. HTTP/2 memakai banyak lajur dalam satu koneksi (multiplexing) dan mengompres header. HTTP/3 memakai QUIC supaya tahan sinyal putus-putus.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b02-l06-q2',
          prompt: t(
            'Server menjawab 304 saat browser bertanya soal gambar. Apa artinya?',
            'Setelah mengecek ETag, server membalas 304 Not Modified. Apa maknanya?',
          ),
          choices: [
            {
              id: 'same',
              label: t('Gambar lama masih sama, tidak diunduh lagi', 'File di cache masih terbaru, tidak diunduh ulang'),
            },
            {
              id: 'gone',
              label: t('Gambar sudah dihapus dari server', 'File sudah dihapus dari server oleh pemiliknya'),
              explainWrong: t(
                'Gambar yang hilang dijawab dengan angka lain. Angka 304 berarti masih sama.',
                'Kalau file tidak ditemukan, kodenya 404.',
              ),
            },
            {
              id: 'ban',
              label: t('Kamu dilarang membuka gambar itu', 'Akses ke file itu dilarang oleh server'),
              explainWrong: t(
                'Larangan masuk memakai angka lain. Angka 304 berarti gambarmu masih sama.',
                'Akses dilarang berkode 403.',
              ),
            },
          ],
          answer: 'same',
          explainCorrect: t(
            'Gambar lamamu masih sama dengan di server. Jadi tidak perlu mengunduh lagi.',
            '304 berarti isi belum berubah, jadi browser memakai salinan di cache. Kuota dan waktu pun hemat.',
          ),
          hints: [t('Ingat majalah lama yang masih edisi terbaru.', 'Pikirkan arti "Not Modified".')],
          tags: ['cookie-cache', 'status-code'],
        }),
      ),
      limitStep({
        analogy: t('Cap tangan untuk cookie dan majalah lama untuk cache'),
        same: [t('Keduanya menghindari pemeriksaan atau unduhan ulang untuk hal yang tidak berubah.')],
        different: [
          t('Atribut Secure membatasi cookie ke HTTPS. HttpOnly mencegah skrip halaman membaca cookie.'),
          t('Data rahasia seperti saldo tidak boleh masuk cache umum (no-store).'),
        ],
        riskyAnalogy: false,
      }),
      qStep(
        makeTf({
          id: 'b02-l06-q3',
          prompt: t(
            'Penjaga harus menempel cap lebih dulu sebelum kamu membawanya.',
            'Cookie harus dititipkan lebih dulu lewat Set-Cookie sebelum browser bisa mengirimnya.',
          ),
          answer: true,
          explainCorrect: t(
            'Cap harus ditempel dulu, baru bisa dibawa. Server menitipkan cookie lebih dulu.',
            'Cookie pertama datang dari server lewat Set-Cookie. Setelah itu browser mengirimnya kembali di setiap request.',
          ),
          explainWrong: t(
            'Cap tidak muncul sendiri di tanganmu. Penjagalah yang menempelkannya.',
            'Browser tidak membuat cookie login sendiri. Cookie itu dititipkan lewat Set-Cookie.',
          ),
          hints: [t('Siapa yang menempel cap di tanganmu?', 'Tanyakan: siapa yang membuat Cookie pertama kali?')],
          tags: ['cookie-cache', 'header-body'],
        }),
      ),
      qStep({
        id: 'b02-l06-q4',
        type: 'order',
        prompt: t(
          'Urutkan perjalanan cap Nadia.',
          'Urutkan perjalanan Cookie saat Nadia login ke Toko Rani sampai kunjungan berikutnya.',
        ),
        difficulty: 2,
        items: [
          { id: 's3', label: t('Cap itu tetap menempel', 'Browser menyimpan Cookie di perangkat Nadia') },
          { id: 's1', label: t('Nadia pertama kali masuk', 'Nadia berhasil login pertama kali di server') },
          { id: 's4', label: t('Nadia menunjukkan cap lagi', 'Saat membuka halaman lain, browser mengirim Cookie otomatis') },
          { id: 's2', label: t('Penjaga menempel cap', 'Server membalas dengan header Set-Cookie di response') },
        ],
        answer: ['s1', 's2', 's3', 's4'],
        explainCorrect: t(
          'Cap ditempel dulu, lalu dibawa setiap masuk lagi. Seperti gelang tanda masuk taman.',
          'Alurnya: login, Set-Cookie, penyimpanan, lalu Cookie dikirim kembali otomatis.',
        ),
        hints: [t('Cap harus ditempel sebelum bisa ditunjukkan.', 'Cookie baru ada setelah server menitipkannya.'), undefined],
        tags: ['cookie-cache', 'response', 'request'],
      }),
      qStep(
        makeMcq({
          id: 'b02-l06-q6j',
          type: 'scenario',
          modes: ['junior'],
          story: t('Browser menyimpan salinan logo Toko Rani. Toko Rani lalu mengganti logonya.'),
          prompt: t('Apa yang browser lakukan setelah tahu logonya berganti?'),
          difficulty: 2,
          choices: [
            { id: 'fast', label: t('Mengambil logo baru dari server') },
            {
              id: 'new',
              label: t('Tetap menampilkan salinan logo lama'),
              explainWrong: t('Browser bisa memakai salinan selama logonya masih sama.'),
            },
            {
              id: 'hide',
              label: t('Menghapus semua gambar milik toko'),
              explainWrong: t('Browser cukup mengambil logo pengganti. Gambar lain boleh tetap tersimpan.'),
            },
          ],
          answer: 'fast',
          explainCorrect: t('Browser perlu logo baru karena salinannya sudah berbeda dari logo toko.'),
          hints: [t('Bandingkan logo salinan dan logo yang baru.')],
          tags: ['cookie-cache'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b02-l06-q5',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Menyimpan majalah lama di rumah (cache) agar hemat'),
          prompt: t('Kapan aturan "simpan di cache supaya hemat" tidak boleh dipakai sembarangan?'),
          difficulty: 2,
          choices: [
            { id: 'priv', label: t('Saat menampilkan data sensitif, seperti saldo atau pembayaran') },
            {
              id: 'logo',
              label: t('Saat menampilkan logo toko yang tidak berubah selama berbulan-bulan'),
              explainWrong: t('Logo toko yang jarang berubah justru paling cocok disimpan di cache.'),
            },
            {
              id: 'font',
              label: t('Saat memuat file huruf yang tetap sama bertahun-tahun'),
              explainWrong: t('File huruf yang tetap sangat cocok disimpan di cache.'),
            },
          ],
          answer: 'priv',
          explainCorrect: t('Data sensitif perlu Cache-Control: no-store agar tidak tersimpan dan selalu segar.'),
          hints: [t('Pikirkan data yang berubah atau rahasia.')],
          tags: ['cookie-cache'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b02-l06-q6',
          type: 'scenario',
          modes: ['pro'],
          story: t(
            'Situs Toko Rani memuat 20 ikon kecil. Dengan HTTP/1.1, ikon antre satu per satu di satu lajur, jadi halaman terasa lambat.',
          ),
          prompt: t('Versi HTTP mana yang menjalankan banyak request bersamaan dalam satu koneksi?'),
          difficulty: 2,
          choices: [
            { id: 'h2', label: t('HTTP/2 dengan multiplexing') },
            {
              id: 'h1',
              label: t('HTTP/1.0 yang lebih tua'),
              explainWrong: t('HTTP/1.0 bahkan lebih lambat daripada HTTP/1.1.'),
            },
            {
              id: 'h0',
              label: t('HTTP/1.1 dengan koneksi lebih banyak'),
              explainWrong: t('Menambah koneksi di HTTP/1.1 membantu sedikit, tetapi setiap koneksi tetap melayani satu request per saat.'),
            },
          ],
          answer: 'h2',
          explainCorrect: t('HTTP/2 memakai multiplexing, jadi banyak file diminta bersamaan tanpa macet di satu lajur. Seperti jalan tol dengan banyak lajur.'),
          hints: [t('Cari versi yang punya banyak lajur.')],
          tags: ['cookie-cache', 'https'],
        }),
      ),
      qStep({
        id: 'b02-l06-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Ketik kode status 3 digit yang berarti isi di cache masih sama dengan di server.'),
        difficulty: 1,
        accept: ['304'],
        explainCorrect: t('304 Not Modified memberi tahu browser agar memakai salinan di cache.'),
        hints: [t('Kode ini berawalan 3.'), undefined],
        tags: ['cookie-cache', 'status-code'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b02-l06-r1',
        prompt: t(
          'Apa nama cap yang dibawa browser setiap kamu kembali?',
          'Header apa yang dipakai untuk menitipkan cookie pertama kali?',
        ),
        choices: [
          { id: 'sc', label: t('Cookie', 'Set-Cookie') },
          {
            id: 'et',
            label: t('Angka jawaban', 'User-Agent'),
            explainWrong: t(
              'Angka jawaban berisi kabar hasil. Cap yang dibawa kembali adalah cookie.',
              'User-Agent hanya menyebut jenis browser.',
            ),
          },
          {
            id: 'ac',
            label: t('Alamat halaman', 'Accept'),
            explainWrong: t(
              'Alamat menunjuk tujuan. Cap yang dibawa kembali adalah cookie.',
              'Accept hanya menyebut format balasan yang diinginkan.',
            ),
          },
        ],
        answer: 'sc',
        explainCorrect: t(
          'Cookie adalah cap kecil yang dibawa browser. Server ingat kamu karenanya.',
          'Cookie dititipkan lewat Set-Cookie, lalu dikirim kembali oleh browser.',
        ),
        hints: [t('Ingat cap di tangan yang dibawa setiap masuk lagi.', 'Cari header yang dikirim oleh server.')],
        tags: ['cookie-cache'],
      }),
      makeTf({
        id: 'b02-l06-r2',
        prompt: t(
          'Angka 304 membuat gambar tidak perlu diunduh ulang.',
          '304 Not Modified menghemat kuota karena file tidak perlu diunduh ulang.',
        ),
        answer: true,
        explainCorrect: t(
          'Browser cukup memakai gambar yang sudah tersimpan.',
          'Browser cukup memakai file yang sudah tersimpan di cache.',
        ),
        explainWrong: t(
          'Angka 304 berarti gambar masih sama. Jadi tidak perlu diunduh ulang.',
          '304 menandakan cache masih berlaku, jadi file tidak diunduh ulang.',
        ),
        hints: [t('Ingat majalah lama yang masih edisi terbaru.', 'Pikirkan arti "Not Modified".')],
        tags: ['cookie-cache', 'status-code'],
      }),
    ],
    recap: t(
      'Cookie mengingat kamu, cache menyimpan salinan agar hemat kuota.',
      'Cookie menjaga sesi login otomatis. Cache dengan ETag dan 304 menghemat bandwidth, dan HTTP/2 mempercepat pemuatan.',
    ),
    companion: {
      talkPrompts: ['Penjaga wahana memberi cap, jadi ia tidak perlu meminta tiketmu lagi. Mengapa begitu?'],
      offlineActivity:
        'Buka satu majalah atau buku pelajaran di rumah. Kalau isinya masih edisi yang sama, perlukah membeli yang baru? Itulah ide 304.',
    },
  }),
];
