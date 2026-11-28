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
  id: 'b06',
  track: 'B',
  order: 6,
  title: 'Lonceng Kejadian',
  tagline: t(
    'Bel pintu berbunyi saat pesanan lunas. Kabar itu antre, lalu pekerja mengambilnya satu per satu.',
    'Kamu bisa menerima kabar dari sistem lain lewat webhook dan memprosesnya dengan antrean pesan.',
  ),
  color: '#2BA84A',
  illustration: 'b06-lonceng-kejadian',
  sourceChapters: ['J2-11'],
  requires: ['b05'],
  lessons: ['b06-l01', 'b06-l02', 'b06-l03'],
  sideQuests: [],
  boss: {
    title: 'Tantangan Penjaga Lonceng',
    greeting: t(
      'Halo, aku Penjaga Lonceng! Coba jawab soal tentang bel webhook dan antrean pesan.',
      'Jawab soal tentang webhook, signature, Message Queue, dan Pub/Sub.',
    ),
    guardianName: 'Penjaga Lonceng',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'b06-anc-j1',
        prompt: t('Layanan bayar memencet bel servermu saat pembayaran selesai. Apa namanya?'),
        choices: [
          { id: 'wh', label: t('Webhook') },
          {
            id: 'css',
            label: t('Antrean pesan'),
            explainWrong: t('Antrean pesan menyimpan tugas untuk pekerja. Bukan kabar yang datang sendiri.'),
          },
          {
            id: 'poll',
            label: t('Bertanya berulang kali'),
            explainWrong: t('Itu berarti kamu yang bertanya terus. Seperti membuka pintu tiap 5 menit.'),
          },
        ],
        answer: 'wh',
        explainCorrect: t('Webhook memencet bel servermu saat ada kabar. Seperti kurir menekan bel rumah.'),
        tags: ['webhook'],
      }),
      makeAnchorMcq({
        id: 'b06-anc-j2',
        prompt: t('Ke mana kurir webhook datang memencet bel saat ada kabar baru?'),
        choices: [
          { id: 'srv', label: t('Ke alamat server toko') },
          {
            id: 'brw',
            label: t('Ke HP pembeli'),
            explainWrong: t('HP pembeli tidak punya alamat tetap. Bel hanya bisa dipasang di server.'),
          },
          {
            id: 'key',
            label: t('Ke server layanan bayar'),
            explainWrong: t('Layanan bayar yang memencet bel. Bel itu ada di server tokomu.'),
          },
        ],
        answer: 'srv',
        explainCorrect: t('Server toko punya alamat tetap. Seperti rumah yang dikenal kurir.'),
        tags: ['webhook', 'server'],
      }),
      makeAnchorMcq({
        id: 'b06-anc-j3',
        prompt: t('Di antrean kerja, satu tugas diambil oleh siapa?'),
        choices: [
          { id: 'one', label: t('Satu pekerja saja') },
          {
            id: 'all',
            label: t('Setiap pekerja dapat salinan'),
            explainWrong: t('Salinan untuk semua itu grup pengumuman. Antrean memberi tugas ke satu pekerja.'),
          },
          {
            id: 'none',
            label: t('Dua pekerja bekerja bersama'),
            explainWrong: t('Tugas yang sama tidak perlu dikerjakan dua kali. Satu pekerja sudah cukup.'),
          },
        ],
        answer: 'one',
        explainCorrect: t('Satu tugas dikerjakan satu pekerja. Seperti nomor antrean dipanggil satu petugas.'),
        tags: ['queue-pubsub'],
      }),
      makeAnchorMcq({
        id: 'b06-anc-j4',
        prompt: t('Admin mengirim satu pengumuman ke grup kelas. Siapa yang menerimanya?'),
        choices: [
          { id: 'grp', label: t('Semua anggota grup') },
          {
            id: 'loket',
            label: t('Satu anggota yang paling cepat'),
            explainWrong: t('Satu penerima itu cara antrean. Grup pengumuman memberi kabar ke semua anggota.'),
          },
          {
            id: 'kunci',
            label: t('Anggota yang dipanggil namanya'),
            explainWrong: t('Pengumuman grup tidak memilih orang. Semua anggota membaca kabar yang sama.'),
          },
        ],
        answer: 'grp',
        explainCorrect: t('Satu pengumuman sampai ke semua anggota. Seperti pesan di grup kelas.'),
        tags: ['queue-pubsub'],
      }),
      makeAnchorMcq({
        id: 'b06-anc-j5',
        prompt: t('Pembayaran masih antre untuk diproses. Apa yang sebaiknya tampil di layar?'),
        choices: [
          { id: 'info', label: t('Tulisan "Pembayaran sedang diperiksa"') },
          {
            id: 'blank',
            label: t('Layar putih tanpa tulisan'),
            explainWrong: t('Layar kosong membuat pembeli bingung. Mereka tidak tahu apa yang terjadi.'),
          },
          {
            id: 'err',
            label: t('Tulisan "Pembayaran gagal"'),
            explainWrong: t('Pembayaran belum gagal. Pesanan hanya menunggu giliran.'),
          },
        ],
        answer: 'info',
        explainCorrect: t('Tulisan yang jujur membuat pembeli tenang. Pembayaran memang masih diperiksa.'),
        tags: ['queue-pubsub', 'frontend'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'b06-anc-p1',
        prompt: t('Apa beda utama polling dan webhook?'),
        choices: [
          { id: 'push', label: t('Penyedia mengirim POST sendiri saat event terjadi') },
          {
            id: 'html',
            label: t('Server toko mengirim GET ke penyedia tiap beberapa detik'),
            explainWrong: t('Itu cara kerja polling: servermu yang bertanya berulang kali. Webhook membalik arah itu.'),
          },
          {
            id: 'get',
            label: t('Browser pembeli mengirim POST ke server toko'),
            explainWrong: t('Webhook tidak berasal dari browser. Pengirimnya server milik penyedia layanan.'),
          },
        ],
        answer: 'push',
        explainCorrect: t('Webhook membalik arah: penyedia yang menghubungi servermu saat kejadian muncul.'),
        tags: ['webhook'],
      }),
      makeAnchorMcq({
        id: 'b06-anc-p2',
        prompt: t('Mengapa penerima webhook harus memeriksa signature HMAC?'),
        choices: [
          { id: 'auth', label: t('Memastikan pengirimnya asli dan isinya tidak diubah') },
          {
            id: 'fast',
            label: t('Menyembunyikan isi pesan dari pihak ketiga'),
            explainWrong: t('HMAC tidak menyembunyikan isi pesan. Ia hanya membuktikan siapa pengirimnya dan isinya tidak berubah.'),
          },
          {
            id: 'css',
            label: t('Mencegah pengirim mengirim event yang sama dua kali'),
            explainWrong: t('Kiriman ganda ditangani dengan menyimpan ID kejadian. Signature hanya memeriksa keaslian.'),
          },
        ],
        answer: 'auth',
        explainCorrect: t('URL webhook terbuka di internet. Signature mencegah request palsu dari pihak iseng.'),
        tags: ['signature-webhook'],
      }),
      makeAnchorMcq({
        id: 'b06-anc-p3',
        prompt: t('Pemrosesan setelah webhook butuh 15 detik. Apa pola terbaiknya?'),
        choices: [
          { id: 'ack', label: t('Periksa signature, simpan ke antrean, lalu balas 200 OK') },
          {
            id: 'wait',
            label: t('Tahan koneksi 15 detik, baru balas 200 OK'),
            explainWrong: t('Koneksi yang ditahan lama kena timeout. Pengirim mengira servermu gagal.'),
          },
          {
            id: 'drop',
            label: t('Balas 500 dulu agar pengirim mencoba lagi nanti'),
            explainWrong: t('Status 500 berarti servermu bermasalah. Pengirim akan mengirim ulang tanpa hasil.'),
          },
        ],
        answer: 'ack',
        explainCorrect: t('Antrean menyimpan tugas berat, jadi balasan tetap cepat dan tugas tidak hilang.'),
        tags: ['signature-webhook', 'queue-pubsub'],
      }),
      makeAnchorMcq({
        id: 'b06-anc-p4',
        prompt: t('Mengapa penerima webhook menyimpan ID setiap kejadian yang sudah diproses?'),
        choices: [
          { id: 'idem', label: t('Agar kejadian yang sama tidak diproses dua kali') },
          {
            id: 'cache',
            label: t('Agar penerima bisa mengurutkan kejadian dengan benar'),
            explainWrong: t('ID dipakai untuk mengenali kejadian yang sama. Urutan harus dicek ke API sumber.'),
          },
          {
            id: 'cors',
            label: t('Agar pengirim berhenti mengirim ulang'),
            explainWrong: t('Pengirim tidak membaca daftar ID milikmu. Ia berhenti kalau mendapat balasan 200.'),
          },
        ],
        answer: 'idem',
        explainCorrect: t('ID yang tersimpan mencegah proses ganda, dan itu membuat penerima idempotent.'),
        tags: ['signature-webhook', 'idempotent'],
      }),
      makeAnchorMcq({
        id: 'b06-anc-p5',
        prompt: t('Kapan Kafka atau Redis Pub/Sub lebih cocok daripada antrean biasa?'),
        choices: [
          { id: 'multi', label: t('Saat satu event harus sampai ke banyak layanan sekaligus') },
          {
            id: 'form',
            label: t('Saat satu tugas harus dikerjakan tepat satu pekerja'),
            explainWrong: t('Itu tugas message queue biasa. Pub/Sub menyiarkan ke banyak penerima.'),
          },
          {
            id: 'font',
            label: t('Saat pesan harus tiba lebih cepat daripada HTTP'),
            explainWrong: t('Pub/Sub bukan soal kecepatan. Ia soal siapa saja yang menerima pesan.'),
          },
        ],
        answer: 'multi',
        explainCorrect: t('Pub/Sub menyiarkan salinan event ke banyak pelanggan. Penerbitnya tidak perlu mengenal mereka satu per satu.'),
        tags: ['queue-pubsub'],
      }),
      makeAnchorMcq({
        id: 'b06-anc-p6',
        type: 'limit',
        analogy: t('Kurir memencet bel pintu rumah'),
        prompt: t('Apa batas penting dari analogi bel pintu untuk webhook?'),
        choices: [
          { id: 'srv', label: t('Kabar webhook bisa datang dua kali atau terbalik') },
          {
            id: 'ring',
            label: t('Pemilik rumah tidak perlu bertanya setiap lima menit'),
            explainWrong: t('Itu justru kemiripan analogi ini. Webhook juga membuatmu tidak perlu bertanya berulang.'),
          },
          {
            id: 'addr',
            label: t('Pengirim perlu alamat tujuan yang jelas'),
            explainWrong: t('Itu juga kemiripan: webhook butuh URL tujuan yang terdaftar.'),
          },
        ],
        answer: 'srv',
        explainCorrect: t('Kurir jarang memencet bel dua kali untuk paket yang sama, tetapi webhook bisa dikirim ulang atau tiba terbalik.'),
        tags: ['webhook'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'b06-l01',
    worldId: 'b06',
    title: 'Webhook: kurir memencet bel',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menceritakan cara kerja webhook dengan bel pintu.',
      'Kamu bisa menjelaskan cara kerja webhook dan bedanya dengan polling.',
    ),
    atWork: 'Saat Toko Rani menerima pembayaran, kamu akan menulis kode penerima webhook yang mengubah status pesanan menjadi lunas.',
    estMinutes: 6,
    introducesTerms: ['webhook'],
    usesTerms: ['api', 'server', 'browser', 'request', 'http-method', 'polling', 'sse', 'websocket'],
    stickerId: 'bel-pintu',
    warmupFrom: 'b05-l05',
    steps: [
      storyStep('b06/bel-pintu.svg', [
        rText(
          'Kamu menunggu paket di rumah. Kamu minta kurir memencet bel kalau paket tiba. Bagaimana toko online tahu bahwa pembayaran sudah selesai?',
          'Pembeli sudah membayar pesanan 88 di Toko Rani, tetapi statusnya masih "menunggu". Bagaimana server toko tahu pembayaran sudah masuk?',
        ),
      ]),
      conceptStep({
        title: t('Apa itu webhook?'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b06', topic: 'webhook-request' },
        alt: t(
          'Gambar layanan bayar memencet bel di server toko.',
          'Diagram penyedia pembayaran mengirim POST ke server toko.',
        ),
        body: [
          rTerm('webhook', 'Webhook', 'Webhook'),
          rJunior(
            ' adalah bel pintu untuk server. Layanan lain memencet bel itu sendiri saat ada kabar baru. Kamu memasang bel itu di server, bukan di HP pembeli.',
          ),
          rPro(
            ' adalah panggilan HTTP otomatis dari layanan lain ke URL yang kamu daftarkan. Layanan itu memanggil saat sebuah event terjadi, umumnya dengan method POST. Servermu tidak perlu polling, yaitu bertanya berulang kali.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b06-l01-q1',
          type: 'analogy',
          prompt: t(
            'Kurir memencet bel rumahmu. Bunyi bel itu ibarat apa?',
            'Dalam analogi kurir dan bel rumah, bunyi bel itu sama dengan apa?',
          ),
          choices: [
            { id: 'req', label: t('Kabar baru yang masuk ke server', 'Request webhook yang masuk ke servermu') },
            {
              id: 'poll',
              label: t('Kamu membuka pintu tiap 5 menit', 'Polling: servermu bertanya tiap 5 menit'),
              explainWrong: t(
                'Membuka pintu terus-menerus itu cara lama. Dengan bel, kamu cukup menunggu.',
                'Itu polling: servermu yang bertanya berulang kali. Webhook membalik arah itu.',
              ),
            },
            {
              id: 'css',
              label: t('Pembeli menekan tombol Bayar'),
              explainWrong: t(
                'Pembeli hanya menekan Bayar. Bel dipencet layanan bayar, bukan pembeli.',
                'Pembeli hanya memulai pembayaran. Bel dipencet layanan pembayaran, bukan pembeli.',
              ),
            },
          ],
          answer: 'req',
          explainCorrect: t(
            'Bunyi bel adalah kabar baru yang datang sendiri. Seperti kurir yang menekan bel saat paket tiba.',
            'Bunyi bel adalah request HTTP yang dikirim ke URL servermu.',
          ),
          hints: [
            t('Ingat siapa yang menekan bel di cerita.', 'Siapa yang mengirim request saat kejadian selesai?'),
            t('Pembeli tidak ikut menekan bel.', 'Pengirimnya layanan lain, bukan pembeli.'),
          ],
          tags: ['webhook'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b06-l01-q2',
          modes: ['pro'],
          prompt: t('Method HTTP apa yang paling sering dipakai layanan lain untuk mengirim webhook?'),
          choices: [
            { id: 'post', label: t('POST (mengirim data)') },
            {
              id: 'get',
              label: t('GET (meminta data baru)'),
              explainWrong: t('GET meminta data dan umumnya tanpa body. Webhook perlu membawa data kejadian.'),
            },
            {
              id: 'del',
              label: t('PUT (mengganti data)'),
              explainWrong: t('PUT dipakai untuk mengganti data yang sudah ada. Webhook mengabarkan kejadian baru.'),
            },
          ],
          answer: 'post',
          explainCorrect: t('Webhook umumnya memakai POST, karena ia membawa data kejadian. Data itu biasanya berupa JSON.'),
          hints: [t('Method mana yang dipakai untuk mengirim data?')],
          tags: ['webhook', 'http-method'],
        }),
      ),
      conceptStep({
        title: t('Contoh: bayar online', 'Alur pembayaran online'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b06', topic: 'bayar-online' },
        alt: t(
          'Gambar pembeli membayar di bank, lalu layanan bayar memencet bel toko.',
          'Alur pembeli membayar di bank, lalu payment gateway memanggil webhook server toko.',
        ),
        body: [
          rText(
            'Pembeli membayar lewat bank. Server toko belum tahu. Layanan bayar lalu memencet bel webhook di server toko.',
            'Server toko tidak tahu kapan pembeli selesai membayar di bank. Begitu dana masuk, payment gateway (layanan penerima pembayaran) mengirim webhook ke server toko. Server membalas 200 OK.',
          ),
        ],
      }),
      qStep({
        id: 'b06-l01-q3',
        type: 'order',
        prompt: t(
          'Urutkan cerita bayar online dari awal sampai akhir.',
          'Urutkan alur pembayaran online dengan webhook, dari awal sampai pesanan tercatat lunas.',
        ),
        difficulty: 2,
        items: [
          {
            id: 's3',
            label: t('Layanan bayar memencet bel server toko', 'Payment gateway mengirim POST webhook ke server toko'),
          },
          {
            id: 's1',
            label: t('Pembeli membayar lewat bank', 'Pembeli menekan Bayar dan melunasi tagihan di bank'),
          },
          {
            id: 's4',
            label: t('Server toko mencatat lunas, lalu mengabari pembeli', 'Server toko mencatat lunas lalu mengabari browser pembeli'),
          },
          {
            id: 's2',
            label: t('Layanan bayar tahu uang sudah masuk', 'Layanan pembayaran menerima konfirmasi dana masuk'),
          },
        ],
        answer: ['s1', 's2', 's3', 's4'],
        explainCorrect: t(
          'Bank memberi kabar ke layanan bayar dulu. Seperti kurir yang baru memencet bel setelah paket tiba.',
          'Bank mengabari payment gateway, lalu gateway mengirim webhook ke server toko.',
        ),
        hints: [
          t('Ingat urutan kurir: paket tiba dulu, baru bel.', 'Pembayaran terjadi lebih dulu daripada webhook.'),
          undefined,
        ],
        tags: ['webhook'],
      }),
      conceptStep({
        title: t('Webhook bukan untuk browser'),
        modes: ['pro'],
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b06', topic: 'server-ke-server' },
        alt: t('Webhook berhenti di server. Server meneruskan kabar ke browser lewat jalur lain.'),
        body: [
          rPro('Browser tidak punya URL publik tetap yang bisa dipanggil dari luar. Server menerima webhook lebih dulu. Lalu server meneruskan kabarnya ke halaman lewat '),
          rTerm('sse', 'SSE', 'SSE'),
          rPro('. '),
          rTerm('websocket', 'WebSocket', 'WebSocket'),
          rPro(' juga bisa dipakai untuk tujuan ini.'),
        ],
      }),
      simStep(
        'bel-webhook',
        t(
          'Ketuk Bayar, lalu lihat layanan bayar memencet bel toko.',
          'Jalankan simulasi: pembeli membayar, lalu payment gateway mengirim POST ke server toko.',
        ),
      ),
      limitStep({
        analogy: t('Kurir memencet bel pintu rumah'),
        riskyAnalogy: true,
        same: [
          t(
            'Kabar datang sendiri, jadi kamu tidak perlu bertanya terus.',
            'Kamu tidak perlu bertanya berulang kali; pengirim mengabari saat kejadian muncul.',
          ),
        ],
        different: [
          t(
            'Bel rumah berbunyi sekali. Bel webhook bisa berbunyi dua kali untuk kabar yang sama.',
            'Kurir jarang memencet bel dua kali untuk paket yang sama, tetapi webhook bisa dikirim ulang atau tiba terbalik.',
          ),
        ],
      }),
      qStep(
        makeTf({
          id: 'b06-l01-q4',
          prompt: t(
            'Bel webhook berbunyi di HP pembeli.',
            'Bank mengirim webhook langsung ke browser pembeli.',
          ),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru: bel webhook ada di server toko. Seperti bel yang menempel di pintu.',
            'Pernyataan itu keliru: webhook hanya masuk ke server. Browser tidak punya URL publik tetap untuk dipanggil dari luar.',
          ),
          explainWrong: t(
            'Kurir hanya bisa memencet bel di rumah tetap. HP pembeli selalu berpindah tempat, jadi bel dipasang di server.',
            'Browser tidak punya URL publik tetap. Karena itu webhook hanya bisa masuk ke server.',
          ),
          hints: [t('Ingat: bel dipasang di rumah, bukan di kurir.', 'Siapa yang punya alamat tetap di internet?')],
          tags: ['webhook', 'browser', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b06-l01-q5',
          type: 'limit',
          analogy: t('Kurir memencet bel pintu rumah'),
          prompt: t(
            'Apa beda bel webhook dengan bel rumah?',
            'Apa batas perumpamaan bel rumah saat menjelaskan webhook?',
          ),
          difficulty: 2,
          choices: [
            { id: 'srv', label: t('Bel webhook bisa berbunyi dua kali', 'Webhook yang sama bisa terkirim dua kali') },
            {
              id: 'wait',
              label: t('Kabar datang sendiri tanpa ditanya', 'Pemilik rumah tidak perlu bertanya berulang kali'),
              explainWrong: t(
                'Itu justru sama. Bel rumah juga membuat kabar datang sendiri.',
                'Itu justru kemiripan: pemilik tidak perlu bertanya berulang kali. Bukan batas analogi.',
              ),
            },
            {
              id: 'note',
              label: t('Bel dipasang di tempat yang tetap', 'Kurir mengantarkan kabar saat sesuatu tiba'),
              explainWrong: t(
                'Itu juga sama. Bel rumah dan bel webhook dipasang di alamat tetap.',
                'Itu kemiripan utamanya. Batas analogi ada pada kabar yang bisa datang lebih dari sekali.',
              ),
            },
          ],
          answer: 'srv',
          explainCorrect: t(
            'Kurir memencet bel sekali saja. Layanan bayar bisa mengirim kabar yang sama dua kali.',
            'Kurir jarang memencet bel dua kali untuk satu paket. Webhook bisa dikirim ulang, jadi servermu harus siap menerima kabar ganda.',
          ),
          hints: [t('Cari hal yang tidak terjadi pada bel rumah.', 'Pikirkan apa yang bisa terjadi pada webhook, tetapi jarang pada bel rumah.')],
          tags: ['webhook'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b06-l01-q6',
          type: 'scenario',
          story: t(
            'Raka punya toko buku. Server tokonya bertanya ke bank tiap 3 detik. Server itu kelelahan.',
            'Raka membuat toko buku. Servernya menanyakan status pembayaran ke API bank tiap 3 detik untuk setiap pesanan yang menunggu.',
          ),
          prompt: t(
            'Apa yang sebaiknya Raka lakukan?',
            'Apa solusi paling hemat untuk menggantikan pengecekan berulang itu?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'wh',
              label: t('Memberi alamat servernya ke layanan bayar', 'Daftarkan URL webhook di layanan pembayaran'),
            },
            {
              id: 'fast',
              label: t('Bertanya ke bank lebih sering lagi', 'Percepat polling menjadi tiap 0,1 detik'),
              explainWrong: t(
                'Bertanya lebih sering membuat server makin sibuk. Cara itu tetap melelahkan.',
                'Polling lebih sering membebani server dan bank. Pengecekan berulang tetap terjadi.',
              ),
            },
            {
              id: 'css',
              label: t('Menambah server supaya bertanya lebih cepat', 'Tambah server untuk menjalankan lebih banyak polling'),
              explainWrong: t(
                'Server tambahan ikut bertanya terus. Pekerjaan yang sama tetap berulang.',
                'Server tambahan hanya menambah jumlah pengecekan. Pola polling-nya tidak berubah.',
              ),
            },
          ],
          answer: 'wh',
          explainCorrect: t(
            'Layanan bayar memencet bel saat uang masuk. Server Raka tidak perlu bertanya lagi.',
            'Dengan webhook, layanan pembayaran menghubungi server Raka saat uang masuk. Pengecekan berulang tidak diperlukan lagi.',
          ),
          hints: [t('Ingat cara kerja kurir dan bel rumah.', 'Cari cara agar bank yang mengabari server toko.')],
          tags: ['webhook', 'polling'],
        }),
      ),
      qStep({
        id: 'b06-l01-q7',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi alur agar halaman pembeli ikut berubah setelah pembayaran masuk.'),
        template: 'Payment gateway kirim ___ ke server → Server balas 200 → Server dorong kabar ke browser via ___',
        bank: ['POST webhook', 'SSE / WebSocket', 'GET polling', 'Redirect HTTP'],
        answer: ['POST webhook', 'SSE / WebSocket'],
        explainCorrect: t('Webhook berhenti di server. Dari sana, kabar diteruskan ke halaman lewat SSE atau WebSocket.'),
        hints: [t('Server meneruskan kabar itu ke browser.'), undefined],
        tags: ['webhook', 'sse', 'websocket'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b06-l01-r1',
        prompt: t('Apa tugas utama webhook?'),
        choices: [
          {
            id: 'push',
            label: t('Mengabari servermu saat ada kabar baru', 'Mengabari servermu lewat POST saat ada kejadian'),
          },
          {
            id: 'ask',
            label: t('Bertanya ke layanan lain tiap detik', 'Mengecek status ke API tiap beberapa detik'),
            explainWrong: t(
              'Bertanya berulang kali itu cara lama. Webhook membuat kabar datang sendiri.',
              'Itu polling, bukan webhook. Pada webhook, penyedia yang mengabari.',
            ),
          },
          {
            id: 'store',
            label: t('Menyimpan data pesanan di gudang data', 'Menyimpan data pesanan di database'),
            explainWrong: t(
              'Menyimpan data adalah tugas gudang data. Webhook hanya membawa kabar.',
              'Menyimpan data adalah tugas database. Webhook hanya membawa kabar kejadian.',
            ),
          },
        ],
        answer: 'push',
        explainCorrect: t(
          'Webhook memencet bel servermu saat ada kabar baru. Seperti kurir yang menekan bel rumah.',
          'Webhook mengirim POST ke servermu saat sebuah event terjadi. Servermu tidak perlu bertanya.',
        ),
        hints: [t('Ingat siapa yang menekan bel.')],
        tags: ['webhook'],
      }),
      makeTf({
        id: 'b06-l01-r2',
        prompt: t(
          'Bel webhook berbunyi di server toko, bukan di HP pembeli.',
          'Browser tidak bisa menerima webhook secara langsung.',
        ),
        answer: true,
        explainCorrect: t(
          'Server toko punya alamat tetap, jadi kurir bisa memencet bel. HP pembeli tidak punya.',
          'Browser tidak punya URL publik tetap untuk dipanggil dari luar.',
        ),
        explainWrong: t(
          'Server toko punya alamat tetap. HP pembeli berpindah-pindah, jadi bel ada di server.',
          'Ingat: webhook adalah komunikasi server ke server.',
        ),
        hints: [t('Ingat tempat bel dipasang.')],
        tags: ['webhook', 'server'],
      }),
    ],
    recap: t(
      'Webhook itu bel server: kabar datang sendiri saat ada kejadian.',
      'Webhook mengirim kabar otomatis ke servermu saat event terjadi. Servermu tidak perlu polling.',
    ),
    companion: {
      talkPrompts: [
        'Mengapa bel lebih mudah daripada mengintip pintu tiap 5 menit?',
        'Mengapa kabar lunas di HP perlu lewat server toko dulu?',
      ],
      offlineActivity:
        'Main peran 3 menit: satu orang jadi Pembeli, satu jadi Bank, satu jadi Server Toko. Saat Pembeli menaruh uang mainan ke Bank, Bank mengetuk meja Server Toko ("Ting! Lunas!").',
    },
  }),

  makeLesson({
    id: 'b06-l02',
    worldId: 'b06',
    title: 'Mengamankan webhook',
    modes: ['pro'],
    objective: t('Kamu bisa memeriksa signature webhook dan mencegah proses ganda.'),
    atWork: 'Kamu akan menulis pemeriksa signature di endpoint webhook pembayaran sebelum pesanan ditandai lunas.',
    estMinutes: 5,
    introducesTerms: ['signature-webhook'],
    usesTerms: ['webhook', 'server', 'header-body', 'status-code', 'idempotent', 'https', 'api'],
    warmupFrom: 'b06-l01',
    steps: [
      storyStep('b06/signature-webhook.svg', [
        rText(
          'Alamat webhook Toko Rani terbuka di internet, jadi siapa pun bisa mengirim kabar palsu "pesanan 88 lunas". Bagaimana servermu membedakan kabar asli dari yang palsu?',
        ),
      ]),
      conceptStep({
        title: t('Memeriksa tanda tangan (signature)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b06', topic: 'signature-hmac' },
        alt: t('Pengirim dan server penerima menghitung HMAC SHA-256 lalu mencocokkannya.'),
        code: {
          lang: 'js',
          code: 'const capKita = crypto.createHmac("sha256", RAHASIA_WEBHOOK)\n  .update(isiMentahRequest).digest("hex");\n// Di produksi, bandingkan dengan crypto.timingSafeEqual\nif (capKita !== req.headers["x-signature"]) {\n  return res.status(401).send("Tanda tangan tidak cocok");\n}',
        },
        body: [
          rTerm('signature-webhook', 'Signature', 'Signature'),
          rText(
            ' adalah cap, seperti segel lilin, yang dibuat dari isi pesan dan kunci rahasia. Pengirim menaruhnya di header request. Servermu menghitung ulang cap yang sama, lalu menolak dengan 401 kalau tidak cocok. Untuk transaksi uang, cek ulang juga ke API sumber.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b06-l02-q1',
          type: 'analogy',
          prompt: t('Dalam keamanan webhook, signature HMAC di header paling mirip apa?'),
          choices: [
            { id: 'seal', label: t('Segel lilin bercap pada surat') },
            {
              id: 'env',
              label: t('Nama pengirim yang ditulis di surat'),
              explainWrong: t('Nama bisa ditulis siapa saja, jadi tidak membuktikan apa-apa. Signature butuh kunci rahasia.'),
            },
            {
              id: 'bell',
              label: t('Alamat tujuan di bagian luar amplop'),
              explainWrong: t('Alamat tujuan itu seperti URL webhook, bukan cap keaslian. Cap hanya bisa dibuat pemilik kunci.'),
            },
          ],
          answer: 'seal',
          explainCorrect: t(
            'Hanya pemilik kunci rahasia yang bisa membuat signature yang cocok. Seperti cap segel kerajaan yang tidak bisa ditiru.',
          ),
          hints: [t('Pikirkan sesuatu yang tidak bisa ditiru orang lain.')],
          tags: ['signature-webhook'],
        }),
      ),
      qStep({
        id: 'b06-l02-q2',
        type: 'spotbug',
        prompt: t('Ketuk baris yang langsung melunasi pesanan tanpa memeriksa signature webhook.'),
        difficulty: 2,
        lines: [
          'app.post("/webhook", (req, res) => {',
          '  tandaiPesananLunas(req.body.pesananId);',
          '  return res.status(200).send("OK");',
          '});',
        ],
        answer: [2],
        explainCorrect: t(
          'Baris 2 langsung mempercayai isi request. Kode ini tidak memeriksa signature atau API sumber.',
        ),
        hints: [t('Cari baris yang mempercayai isi request begitu saja.'), undefined],
        tags: ['signature-webhook', 'webhook'],
      }),
      conceptStep({
        title: t('Idempotent dan balasan 200 cepat'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b06', topic: 'aturan-main-webhook' },
        alt: t('Aturan webhook: idempotent untuk kirim ulang, balas 200 cepat, jangan percaya urutan.'),
        body: [
          rText('Pengirim bisa mengirim ulang kalau servermu lambat menjawab. Buat penerima '),
          rTerm('idempotent', 'idempotent', 'idempotent'),
          rText(': simpan ID kejadian, supaya kejadian yang sama tidak diproses dua kali. Lalu balas '),
          rCode('200 OK'),
          rText(' secepatnya dan kerjakan tugas berat di belakang.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b06-l02-q4',
          type: 'why',
          base: 'Server penerima webhook wajib membalas status 200 secepatnya sebelum melakukan pekerjaan berat seperti membuat PDF atau mengirim email.',
          prompt: t('Mengapa balasan 200 harus dikirim cepat?'),
          choices: [
            { id: 'timeout', label: t('Agar pengirim tidak mengira servermu gagal') },
            {
              id: 'size',
              label: t('Agar pembeli tidak menunggu di halaman bayar'),
              explainWrong: t('Pembeli tidak menunggu webhook. Webhook berjalan antar server di belakang layar.'),
            },
            {
              id: 'json',
              label: t('Agar pengirim yakin signature-nya cocok'),
              explainWrong: t('Status 200 hanya berarti kabar sudah diterima. Ia tidak membuktikan signature cocok.'),
            },
          ],
          answer: 'timeout',
          explainCorrect: t('Balasan lambat membuat pengirim mengira servermu bermasalah. Ia lalu mengirim webhook yang sama lagi.'),
          hints: [t('Apa yang dilakukan pengirim bila tidak mendapat balasan?')],
          tags: ['webhook', 'status-code'],
        }),
      ),
      conceptStep({
        title: t('Urutan terbalik dan uji lokal'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b06', topic: 'urutan-dan-tunnel' },
        alt: t('Menangani urutan event terbalik dan memakai tunnel saat mengembangkan di laptop.'),
        body: [
          rText(
            'Jangan bergantung pada urutan kedatangan webhook, karena kabar "dikirim" bisa tiba sebelum "dibayar". Cek status terbaru ke API sumber. Saat membuat di laptop, tunnel meneruskan alamat HTTPS sementara ke laptopmu. Alat tunnel yang umum adalah ',
          ),
          rCode('ngrok'),
          rText(' dan '),
          rCode('Cloudflare Tunnel'),
          rText('.'),
        ],
      }),
      simStep(
        'bel-webhook',
        t('Jalankan simulator webhook dan bayangkan pemeriksaan signature sebelum status berubah.'),
      ),
      limitStep({
        analogy: t('Segel lilin bercap pada surat kerajaan'),
        riskyAnalogy: false,
        same: [
          t('Cap membuktikan pesan ditulis pemilik kunci rahasia dan isinya tidak diubah di jalan.'),
        ],
        different: [
          t('Surat fisik jarang datang dua kali, tetapi webhook bisa dikirim ulang atau tiba dengan urutan terbalik.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b06-l02-q6',
          type: 'scenario',
          story: t(
            'Dimas menguji webhook pembayaran di laptopnya (localhost). Payment gateway di internet tidak bisa menghubungi alamat laptopnya.',
          ),
          prompt: t('Apa yang sebaiknya Dimas lakukan?'),
          choices: [
            { id: 'tun', label: t('Menjalankan tunnel seperti ngrok') },
            {
              id: 'css',
              label: t('Mengisi alamat localhost di dasbor'),
              explainWrong: t('Alamat localhost hanya dikenal laptopmu sendiri. Layanan di internet tidak bisa menjangkaunya.'),
            },
            {
              id: 'cache',
              label: t('Mengganti port server lokal'),
              explainWrong: t('Port lain tetap berada di jaringan laptop. Alamatnya tetap tidak terbuka untuk internet.'),
            },
          ],
          answer: 'tun',
          explainCorrect: t('Tunnel meneruskan alamat HTTPS publik sementara ke port di laptop. Webhook lalu bisa masuk ke server lokal.'),
          hints: [t('Alamat laptop perlu bisa dijangkau dari internet.')],
          tags: ['webhook', 'https'],
        }),
      ),
      qStep({
        id: 'b06-l02-q3',
        type: 'match',
        prompt: t('Pasangkan masalah webhook dengan solusi terbaiknya.'),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('Webhook yang sama tiba dua kali') },
          { id: 'l2', label: t('Pengirim menyerah karena balasan lambat') },
          { id: 'l3', label: t('Kabar "dikirim" datang sebelum "dibayar"') },
          { id: 'l4', label: t('Request palsu dari orang iseng') },
        ],
        right: [
          { id: 'r1', label: t('Simpan ID kejadian agar idempotent') },
          { id: 'r2', label: t('Balas 200 secepatnya, kerjakan di belakang') },
          { id: 'r3', label: t('Cek status terbaru ke API sumber') },
          { id: 'r4', label: t('Periksa signature HMAC') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
        explainCorrect: t('ID kejadian mencegah proses ganda, dan balasan 200 cepat mencegah pengiriman ulang. Cek API sumber memulihkan urutan, dan signature menolak request palsu.'),
        hints: [t('Mulai dari pasangan yang paling jelas dulu.'), undefined],
        tags: ['signature-webhook', 'idempotent', 'https'],
      }),
      qStep(
        makeMcq({
          id: 'b06-l02-q5',
          type: 'limit',
          analogy: t('Segel lilin surat kerajaan'),
          prompt: t('Mengapa signature saja belum cukup untuk melindungi pesanan?'),
          choices: [
            { id: 'extra', label: t('Webhook asli pun bisa tiba dua kali atau terbalik') },
            {
              id: 'weak',
              label: t('Signature mudah ditebak oleh pihak ketiga di internet'),
              explainWrong: t('HMAC memakai kunci rahasia yang tidak pernah dikirim. Orang luar tidak bisa menebaknya dari pesan.'),
            },
            {
              id: 'css',
              label: t('Signature tidak ikut memeriksa isi pesan yang dikirim'),
              explainWrong: t('HMAC dihitung dari isi pesan, jadi isi yang diubah akan ketahuan. Masalahnya ada di pengiriman ulang dan urutan.'),
            },
          ],
          answer: 'extra',
          explainCorrect: t(
            'Signature hanya membuktikan pengirimnya asli. Kejadian asli tetap bisa tiba ganda atau terbalik, jadi perlu ID kejadian dan cek ulang.',
          ),
          hints: [t('Pikirkan apa yang tidak dicegah oleh segel.')],
          tags: ['signature-webhook', 'idempotent'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b06-l02-r1',
        prompt: t('Apa yang kamu lakukan kalau signature webhook tidak cocok?'),
        choices: [
          { id: 'rej', label: t('Tolak dengan 401 dan jangan proses datanya') },
          {
            id: 'ok',
            label: t('Proses pesanan dulu, periksa belakangan'),
            explainWrong: t('Memproses dulu membuka celah untuk request palsu. Pemeriksaan harus lebih dulu.'),
          },
          {
            id: 'quiet',
            label: t('Balas 200 lalu abaikan saja kabarnya'),
            explainWrong: t('Balasan 200 memberi tahu pengirim bahwa kabarnya diterima. Tolak dengan 401 agar pengirim tahu.'),
          },
        ],
        answer: 'rej',
        explainCorrect: t('Request yang signature-nya tidak cocok mungkin palsu. Jangan proses datanya sebelum terbukti asli.'),
        hints: [t('Pesan yang tidak bisa dibuktikan asli tidak boleh dipercaya.')],
        tags: ['signature-webhook'],
      }),
      makeTf({
        id: 'b06-l02-r2',
        prompt: t('Untuk transaksi uang, cek ulang ke API sumber setelah webhook masuk.'),
        answer: true,
        explainCorrect: t('Cek ulang menambah satu lapis pengaman. Seperti menelepon balik nomor resmi bank.'),
        explainWrong: t('Webhook bisa dipalsukan atau terlambat. Konfirmasi langsung ke sumber lebih aman.'),
        hints: [t('Uang butuh pengaman lebih dari satu lapis.')],
        tags: ['signature-webhook', 'api'],
      }),
    ],
    recap: t('Periksa signature HMAC dan pakai HTTPS. Buat penerima idempotent dan balas 200 cepat.'),
  }),

  makeLesson({
    id: 'b06-l03',
    worldId: 'b06',
    title: 'Antrean dan grup pengumuman',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan antrean kerja dan grup pengumuman.',
      'Kamu bisa membedakan antrean pesan dan Pub/Sub, lalu menampilkan status yang jujur di layar.',
    ),
    atWork: 'Kamu akan melihat antrean tugas dan topik Pub/Sub saat memeriksa mengapa email konfirmasi pesanan terlambat terkirim.',
    estMinutes: 5,
    introducesTerms: ['queue-pubsub'],
    usesTerms: ['webhook', 'server', 'frontend', 'websocket'],
    stickerId: 'antrean-bank',
    warmupFrom: 'b06-l02',
    steps: [
      storyStep('b06/antrean-bank.svg', [
        rText(
          'Di bank, kamu mengambil nomor lalu menunggu. Di grup kelas, satu pengumuman dibaca semua murid. Bagaimana komputer meniru dua cara ini?',
          'Setelah pembayaran lunas, Toko Rani harus mengirim email, memberi poin, dan menyiapkan barang. Bagaimana sistem membagi pekerjaan itu tanpa saling menunggu?',
        ),
      ]),
      conceptStep({
        title: t('Nomor antrean di komputer', 'Message queue'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b06', topic: 'message-queue' },
        alt: t('Pengirim menaruh pesan di antrean, lalu pekerja mengambilnya satu per satu.'),
        body: [
          rTerm('queue-pubsub', 'Antrean pesan', 'Message queue'),
          rJunior(
            ' bekerja seperti nomor antrean di bank. Pesan menunggu dengan aman sampai satu pekerja mengambilnya. Sambil menunggu, layar toko menulis "Pembayaran sedang diperiksa".',
          ),
          rPro(
            ' adalah antrean yang menyimpan tugas, misalnya mengirim email konfirmasi atau memproses video. Satu pesan diambil satu pekerja saja. Contoh alatnya RabbitMQ dan Amazon SQS.',
          ),
        ],
      }),
      qStep(
        makeTf({
          id: 'b06-l03-q4',
          prompt: t(
            'Pekerja sedang istirahat, jadi pesan di antrean hilang.',
            'Kalau satu pekerja berhenti sebentar, pesan di message queue langsung hilang.',
          ),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru: pesan tetap aman di antrean. Seperti nomor antrean yang tetap ada saat petugas bank istirahat.',
            'Pernyataan itu keliru: antrean menyimpan pesan sampai pekerja berikutnya mengambilnya.',
          ),
          explainWrong: t(
            'Antrean menyimpan pesan sampai ada yang mengambil. Nomor di bank tidak hilang saat petugas istirahat.',
            'Antrean justru menjaga pesan tetap aman saat pekerja sibuk atau berhenti.',
          ),
          hints: [
            t('Ingat nomor antrean saat petugas istirahat.', 'Pikirkan apa gunanya antrean di antara pengirim dan pekerja.'),
          ],
          tags: ['queue-pubsub'],
        }),
      ),
      conceptStep({
        title: t('Grup pengumuman', 'Pub/Sub (publish–subscribe)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b06', topic: 'pub-sub' },
        alt: t('Satu topik pesanan.dibayar mengirim salinan ke layanan email, gudang, dan poin.'),
        body: [
          rTerm('queue-pubsub', 'Grup pengumuman', 'Pub/Sub'),
          rJunior(
            ' di komputer mirip grup pengumuman kelas. Semua anggota grup membaca pengumuman yang sama. Admin tidak perlu tahu siapa saja yang membaca.',
          ),
          rPro(
            ' (publish–subscribe) menyiarkan event ke sebuah topik. Semua layanan yang berlangganan topik itu menerima salinannya. Contoh alatnya Redis Pub/Sub, Apache Kafka, dan MQTT untuk perangkat pintar (IoT). Kafka juga menyimpan event sebagai catatan berurutan, jadi pesan lama bisa dibaca ulang. Redis Pub/Sub tidak menyimpan pesan.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b06-l03-q1',
          type: 'analogy',
          prompt: t(
            'Toko mengirim satu kabar lunas ke gudang, email, dan poin. Itu mirip apa?',
            'Admin kelas mengirim satu pengumuman ke grup chat. Pola mana yang bekerja seperti itu?',
          ),
          choices: [
            {
              id: 'ps',
              label: t('Pengumuman di grup kelas', 'Pub/Sub: satu kejadian untuk semua pelanggan'),
            },
            {
              id: 'mq',
              label: t('Nomor antrean di bank', 'Message queue: satu tugas untuk satu pekerja saja'),
              explainWrong: t(
                'Nomor antrean hanya dipanggil satu petugas. Kabar lunas ini diterima tiga bagian.',
                'Message queue memberi satu pesan ke satu pekerja, bukan ke semua. Itu bukan siaran.',
              ),
            },
            {
              id: 'poll',
              label: t('Murid bertanya ke guru terus-menerus', 'Polling: pelanggan bertanya berulang kali'),
              explainWrong: t(
                'Tidak ada yang bertanya di sini. Kabar datang sendiri ke semua bagian.',
                'Polling berarti penerima bertanya berulang kali. Di Pub/Sub, pengirim menyiarkan sendiri.',
              ),
            },
          ],
          answer: 'ps',
          explainCorrect: t(
            'Satu kabar sampai ke semua bagian. Seperti satu pengumuman yang dibaca seluruh grup kelas.',
            'Pada Pub/Sub, satu kejadian disiarkan ke semua pelanggan topik. Admin tidak perlu tahu siapa pembacanya.',
          ),
          hints: [t('Hitung penerimanya: satu, atau banyak?', 'Siapa saja yang menerima satu pengumuman grup?')],
          tags: ['queue-pubsub'],
        }),
      ),
      qStep({
        id: 'b06-l03-q2',
        type: 'sort',
        prompt: t(
          'Kelompokkan tiap contoh ke antrean kerja atau grup pengumuman.',
          'Kelompokkan contoh ini ke Message Queue atau Pub/Sub.',
        ),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('Tugas kirim struk, dikerjakan satu per satu', 'Antrean tugas kirim email struk satu per satu') },
          { id: 'i2', label: t('Kabar diskon dikirim ke semua pelanggan toko', 'Topik pesanan.dibayar diterima gudang, email, dan poin') },
          { id: 'i3', label: t('Pesanan kue dibuat oleh satu koki', 'Nomor antrean bank dipanggil teller') },
          { id: 'i4', label: t('Bel sekolah didengar semua kelas', 'Grup pengumuman kelas di aplikasi chat') },
        ],
        bins: [
          { id: 'mq', label: t('Antrean kerja', 'Message Queue'), icon: 'clock' },
          { id: 'ps', label: t('Grup pengumuman', 'Pub/Sub'), icon: 'radio' },
        ],
        answer: { i1: 'mq', i2: 'ps', i3: 'mq', i4: 'ps' },
        explainCorrect: t(
          'Antrean memberi satu tugas ke satu pekerja. Grup pengumuman memberi satu kabar ke semua.',
          'Message Queue memberi satu pesan ke satu pekerja. Pub/Sub menyiarkan salinan ke semua pelanggan topik.',
        ),
        hints: [
          t('Tanyakan: satu penerima, atau semua penerima?', 'Tanyakan siapa yang menerima: satu pekerja atau semua pelanggan?'),
          undefined,
        ],
        tags: ['queue-pubsub'],
      }),
      conceptStep({
        title: t('Antrean dan status di layar'),
        modes: ['pro'],
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b06', topic: 'tampilan-antrean' },
        alt: t('Tampilan status "Pembayaran sedang diverifikasi" saat tugas menunggu di antrean.'),
        body: [
          rPro(
            'Karena tugas menunggu di antrean, status pesanan tidak langsung berubah. Selama menunggu, tampilkan pesan yang jujur, misalnya "Pembayaran sedang diverifikasi".',
          ),
        ],
      }),
      simStep(
        'bel-webhook',
        t(
          'Lihat bel webhook berbunyi, lalu pekerja menandai pesanan lunas.',
          'Amati cara webhook dicatat cepat, lalu pekerjaan lanjutan masuk ke antrean.',
        ),
      ),
      limitStep({
        analogy: t('Nomor antrean bank dan grup chat kelas'),
        riskyAnalogy: false,
        same: [
          t(
            'Pengirim tidak perlu menunggu pekerja selesai.',
            'Pengirim tidak perlu menunggu penerima selesai, dan tidak perlu tahu reaksi tiap penerima.',
          ),
        ],
        different: [
          t(
            'Bank tutup saat sore. Antrean komputer tetap menyimpan ribuan pesan sepanjang malam.',
            'Antrean digital bisa menampung jutaan pesan, dan sistem catatan seperti Kafka bisa memutar ulang pesan lama.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b06-l03-q6',
          type: 'scenario',
          story: t(
            'Sari membayar pesanan kue di Toko Rani. Pembayarannya masih antre 3 detik. Layar belum berubah.',
            'Sari baru membayar pesanan kue di Toko Rani. Tugas cek pembayaran menunggu 3 detik di antrean server, jadi status belum berubah di layar.',
          ),
          prompt: t(
            'Apa tulisan terbaik di layar untuk Sari?',
            'Pesan apa yang paling baik ditampilkan frontend untuk Sari?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'msg',
              label: t('Menulis "Pembayaran sedang diperiksa"', 'Tampilkan "Pembayaran sedang diverifikasi" selama menunggu'),
            },
            {
              id: 'freeze',
              label: t('Membiarkan layar tanpa tulisan apa pun', 'Biarkan tombol Bayar aktif tanpa pesan apa pun'),
              explainWrong: t(
                'Layar kosong membuat Sari bingung. Ia mungkin menekan Bayar berkali-kali.',
                'Tombol aktif tanpa pesan mendorong pembeli menekan Bayar berkali-kali.',
              ),
            },
            {
              id: 'fail',
              label: t('Menulis "Pembayaran gagal"', 'Tampilkan error "Pembayaran gagal"'),
              explainWrong: t(
                'Pembayaran belum gagal. Pesanan hanya menunggu giliran di antrean.',
                'Transaksi belum gagal, hanya sedang diproses di antrean.',
              ),
            },
          ],
          answer: 'msg',
          explainCorrect: t(
            'Tulisan yang jujur membuat Sari tenang. Seperti petugas bank yang bilang "Tunggu sebentar".',
            'Info yang jujur membuat pembeli tenang saat pekerja antrean bekerja di belakang layar.',
          ),
          hints: [
            t('Ingat petugas bank yang bilang "tunggu sebentar".', 'Statusnya belum final: jangan tampilkan sukses atau gagal.'),
          ],
          tags: ['queue-pubsub', 'frontend'],
        }),
      ),
      qStep({
        id: 'b06-l03-q3',
        type: 'match',
        modes: ['pro'],
        prompt: t('Pasangkan alat atau protokol dengan peran populernya.'),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('RabbitMQ / Amazon SQS') },
          { id: 'l2', label: t('Apache Kafka') },
          { id: 'l3', label: t('MQTT') },
          { id: 'l4', label: t('Redis Pub/Sub') },
        ],
        right: [
          { id: 'r1', label: t('Layanan antrean pesan populer') },
          { id: 'r2', label: t('Catatan event berurutan yang bisa dibaca ulang') },
          { id: 'r3', label: t('Pub/Sub hemat untuk perangkat IoT') },
          { id: 'r4', label: t('Siaran ringan, pesan tidak disimpan') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
        explainCorrect: t('Setiap alat punya peran sendiri: antrean tugas, catatan kejadian besar, sensor IoT, dan siaran ringan.'),
        hints: [t('Ingat contoh alat di kartu Pub/Sub dan Message queue.'), undefined],
        tags: ['queue-pubsub', 'websocket'],
      }),
      qStep(
        makeMcq({
          id: 'b06-l03-q5',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Nomor antrean bank dan grup chat kelas'),
          prompt: t('Apa yang bisa dilakukan antrean digital, tetapi tidak bisa dilakukan antrean kertas di bank?'),
          choices: [
            { id: 'save', label: t('Memutar ulang pesan lama, misalnya dengan Kafka') },
            {
              id: 'order',
              label: t('Memberi giliran kepada setiap pelanggan yang datang'),
              explainWrong: t('Antrean kertas juga memberi giliran. Itu kemiripan, bukan beda.'),
            },
            {
              id: 'free',
              label: t('Membiarkan pemberi nomor tidak menunggu teller selesai'),
              explainWrong: t('Pemberi nomor di bank juga tidak menunggu teller selesai. Itu kemiripan lain.'),
            },
          ],
          answer: 'save',
          explainCorrect: t('Nomor antrean kertas yang sudah dipanggil tidak bisa diulang. Sistem catatan seperti Kafka menyimpan riwayat pesan dan bisa membacanya ulang.'),
          hints: [t('Cari kemampuan yang hanya dimiliki antrean digital.')],
          tags: ['queue-pubsub'],
        }),
      ),
      qStep({
        id: 'b06-l03-q7',
        type: 'type',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Ketik nama protokol Pub/Sub yang hemat daya untuk sensor suhu atau lampu pintar.'),
        accept: ['MQTT', 'mqtt'],
        explainCorrect: t('MQTT dirancang ringan dan hemat daya, jadi cocok untuk perangkat di jaringan yang lemah.'),
        hints: [t('Cari nama protokol IoT di kartu Pub/Sub.'), undefined],
        tags: ['queue-pubsub'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b06-l03-r1',
        prompt: t(
          'Pola mana yang memberi satu pesan ke satu pekerja?',
          'Pola mana yang memberi satu pesan ke satu pekerja saja?',
        ),
        choices: [
          { id: 'mq', label: t('Antrean kerja', 'Message Queue') },
          {
            id: 'ps',
            label: t('Grup pengumuman', 'Pub/Sub'),
            explainWrong: t(
              'Grup pengumuman memberi kabar ke semua anggota. Bukan ke satu orang saja.',
              'Pub/Sub mengirim salinan ke semua pelanggan topik.',
            ),
          },
          {
            id: 'poll',
            label: t('Bertanya berulang kali', 'Polling'),
            explainWrong: t(
              'Bertanya berulang kali itu cara lama. Antrean tidak perlu ditanya terus.',
              'Polling berarti penerima bertanya berulang kali, bukan antrean tugas.',
            ),
          },
        ],
        answer: 'mq',
        explainCorrect: t(
          'Antrean kerja memberi satu tugas ke satu pekerja. Seperti nomor antrean bank.',
          'Message queue memberi satu tugas ke satu pekerja, seperti nomor antrean bank.',
        ),
        hints: [t('Ingat nomor antrean bank.')],
        tags: ['queue-pubsub'],
      }),
      makeMcq({
        id: 'b06-l03-r2',
        prompt: t(
          'Satu kabar lunas harus sampai ke gudang, email, dan poin. Pola mana yang cocok?',
          'Satu event "pesanan.dibayar" harus sampai ke layanan email, gudang, dan poin. Pola mana yang cocok?',
        ),
        choices: [
          { id: 'ps', label: t('Grup pengumuman', 'Pub/Sub') },
          {
            id: 'css',
            label: t('Antrean kerja', 'Message Queue'),
            explainWrong: t(
              'Antrean memberi tugas ke satu pekerja saja. Tiga bagian itu perlu menerima kabar yang sama.',
              'Message queue memberi satu pesan ke satu pekerja. Layanan lain tidak ikut menerimanya.',
            ),
          },
          {
            id: 'poll',
            label: t('Bertanya berulang kali', 'Polling'),
            explainWrong: t(
              'Bertanya berulang kali itu cara lama. Pengumuman datang sendiri ke semua anggota.',
              'Polling membuat tiap layanan bertanya sendiri. Pub/Sub menyiarkan kabar ke semuanya.',
            ),
          },
        ],
        answer: 'ps',
        explainCorrect: t(
          'Satu kabar sampai ke semua anggota grup. Gudang, email, dan poin menerimanya sama-sama.',
          'Pub/Sub menyiarkan event ke topik, jadi tiap layanan pelanggan bereaksi sendiri.',
        ),
        hints: [t('Ingat grup pengumuman kelas.')],
        tags: ['queue-pubsub'],
      }),
    ],
    recap: t(
      'Antrean memberi tugas ke satu pekerja, grup pengumuman ke semua anggota.',
      'Message queue memberi satu tugas ke satu pekerja. Pub/Sub menyiarkan satu kejadian ke banyak pelanggan.',
    ),
    companion: {
      talkPrompts: [
        'Apa beda nomor antrean puskesmas dengan pengumuman lewat pengeras suara?',
        'Mengapa layar kasir menulis "Sedang diproses" saat dapur ramai?',
      ],
      offlineActivity:
        'Buat kertas nomor antrean 1 sampai 3 dan satu kertas pengumuman "Bel istirahat berbunyi!". Bandingkan: mana yang hanya diambil satu petugas (antrean), dan mana yang diikuti semua orang (grup pengumuman)?',
    },
  }),
];
