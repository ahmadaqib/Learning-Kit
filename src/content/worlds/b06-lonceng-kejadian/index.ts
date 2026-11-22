import {
  conceptStep,
  limitStep,
  makeAnchorMcq,
  makeLesson,
  makeMcq,
  makeTf,
  qStep,
  rCode,
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
    'Menerima bel pintu webhook saat pesanan lunas dan antrean pekerja.',
    'Memahami webhook, verifikasi signature HMAC, idempotensi penerima, Message Queue, dan Pub/Sub.',
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
      'Halo! Buktikan kamu paham bel pintu webhook dan antrean pesan!',
      'Tunjukkan penguasaanmu tentang webhook, pengamanan signature, serta pola queue dan Pub/Sub.',
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
        prompt: t('Cara layanan lain mengetuk servermu otomatis saat pembayaran selesai disebut…'),
        choices: [
          {
            id: 'wh',
            label: t('Webhook'),
            explainWrong: t('Benar, webhook itu bel pintu server.'),
          },
          {
            id: 'css',
            label: t('CSS'),
            explainWrong: t('CSS hanya mengatur warna dan tata letak.'),
          },
          {
            id: 'poll',
            label: t('Polling terus-menerus'),
            explainWrong: t('Polling itu kamu yang bertanya berulang kali.'),
          },
        ],
        answer: 'wh',
        explainCorrect: t('Webhook memencet bel servermu otomatis begitu ada kejadian baru.'),
        tags: ['webhook'],
      }),
      makeAnchorMcq({
        id: 'b06-anc-j2',
        prompt: t('Ke mana kurir webhook datang memencet bel saat ada kabar baru?'),
        choices: [
          {
            id: 'srv',
            label: t('Ke alamat server toko'),
            explainWrong: t('Tepat!'),
          },
          {
            id: 'brw',
            label: t('Langsung ke tab browser pembeli'),
            explainWrong: t('Tab browser tidak punya alamat tetap di internet.'),
          },
          {
            id: 'key',
            label: t('Ke keyboard laptop'),
            explainWrong: t('Webhook dikirim lewat jaringan ke server.'),
          },
        ],
        answer: 'srv',
        explainCorrect: t('Webhook selalu dikirim dari server ke server melalui URL tetap.'),
        tags: ['webhook', 'server'],
      }),
      makeAnchorMcq({
        id: 'b06-anc-j3',
        prompt: t('Dalam nomor antrean bank (Message Queue), satu pesan diambil oleh…'),
        choices: [
          {
            id: 'one',
            label: t('Satu pekerja saja'),
            explainWrong: t('Benar!'),
          },
          {
            id: 'all',
            label: t('Semua pembeli di toko'),
            explainWrong: t('Pembeli tidak mengambil tugas antrean pekerja.'),
          },
          {
            id: 'none',
            label: t('Dibuang langsung'),
            explainWrong: t('Pesan justru disimpan aman sampai dikerjakan.'),
          },
        ],
        answer: 'one',
        explainCorrect: t('Di antrean kerja, satu tugas diambil oleh satu pekerja agar tidak dikerjakan dua kali.'),
        tags: ['queue-pubsub'],
      }),
      makeAnchorMcq({
        id: 'b06-anc-j4',
        prompt: t('Papan pengumuman grup (Pub/Sub) paling mirip dengan kejadian…'),
        choices: [
          {
            id: 'grp',
            label: t('Satu pesan admin dibaca semua anggota grup'),
            explainWrong: t('Tepat!'),
          },
          {
            id: 'loket',
            label: t('Satu nomor antrean dipanggil satu teller'),
            explainWrong: t('Itu perumpamaan Message Queue.'),
          },
          {
            id: 'kunci',
            label: t('Mengunci pintu rumah'),
            explainWrong: t('Pub/Sub menyiarkan kabar ke banyak penerima.'),
          },
        ],
        answer: 'grp',
        explainCorrect: t('Pub/Sub menerbitkan kabar ke satu topik untuk diterima semua pelanggan topik itu.'),
        tags: ['queue-pubsub'],
      }),
      makeAnchorMcq({
        id: 'b06-anc-j5',
        prompt: t('Kalau pembayaran sedang diproses lewat antrean, tampilan layar yang ramah sebaiknya…'),
        choices: [
          {
            id: 'info',
            label: t('Menulis "Pembayaran sedang diverifikasi"'),
            explainWrong: t('Benar!'),
          },
          {
            id: 'blank',
            label: t('Diam putih polos saja'),
            explainWrong: t('Layar kosong bikin pengguna bingung.'),
          },
          {
            id: 'err',
            label: t('Langsung menulis gagal total'),
            explainWrong: t('Pesanan belum gagal, hanya sedang antre diproses.'),
          },
        ],
        answer: 'info',
        explainCorrect: t('Memberi info yang jujur membuat pengguna tenang saat antrean bekerja.'),
        tags: ['queue-pubsub', 'frontend'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'b06-anc-p1',
        prompt: t('Apa perbedaan utama antara memanggil API biasa secara berkala dan menerima webhook?'),
        choices: [
          {
            id: 'push',
            label: t('Pada webhook, penyedia mengirim HTTP POST otomatis saat event terjadi sehingga server tidak perlu polling'),
          },
          {
            id: 'html',
            label: t('Webhook selalu mengirim file HTML lengkap ke browser'),
          },
          {
            id: 'get',
            label: t('Webhook hanya berjalan memakai method GET tanpa body'),
          },
        ],
        answer: 'push',
        explainCorrect: t('Webhook membalik arah inisiatif: penyedia menghubungi URL server kita saat kejadian muncul.'),
        tags: ['webhook'],
      }),
      makeAnchorMcq({
        id: 'b06-anc-p2',
        prompt: t('Mengapa server penerima wajib memverifikasi HMAC signature pada header webhook?'),
        choices: [
          {
            id: 'auth',
            label: t('Memastikan request benar-benar berasal dari pengirim sah dan isinya tidak diubah di jalan'),
          },
          {
            id: 'fast',
            label: t('Supaya file JSON otomatis terkompresi lebih kecil'),
          },
          {
            id: 'css',
            label: t('Agar browser mengizinkan perubahan warna tombol'),
          },
        ],
        answer: 'auth',
        explainCorrect: t('Karena URL webhook terbuka di internet, signature mencegah request palsu dari pihak iseng.'),
        tags: ['signature-webhook'],
      }),
      makeAnchorMcq({
        id: 'b06-anc-p3',
        prompt: t('Bagaimana pola terbaik jika pemrosesan tugas setelah menerima webhook memakan waktu 15 detik?'),
        choices: [
          {
            id: 'ack',
            label: t('Validasi signature, balas 200 OK secepatnya, lalu taruh tugas ke message queue'),
          },
          {
            id: 'wait',
            label: t('Tahan koneksi HTTP selama 15 detik sebelum mengirim status 200'),
          },
          {
            id: 'drop',
            label: t('Tolak dengan status 500 agar pengirim mencoba lagi nanti'),
          },
        ],
        answer: 'ack',
        explainCorrect: t('Balasan lambat memicu timeout dan retry ganda dari pengirim webhook.'),
        tags: ['signature-webhook', 'queue-pubsub'],
      }),
      makeAnchorMcq({
        id: 'b06-anc-p4',
        prompt: t('Alasan menyimpan ID kejadian webhook yang sudah diproses di server adalah agar…'),
        choices: [
          {
            id: 'idem',
            label: t('Penerima bersifat idempotent dan tidak memproses ulang saat pengirim melakukan retry'),
          },
          {
            id: 'cache',
            label: t('Browser menyimpan gambar lebih lama di disk'),
          },
          {
            id: 'cors',
            label: t('CORS otomatis mati untuk semua domain'),
          },
        ],
        answer: 'idem',
        explainCorrect: t('Retry webhook dapat mengirim event yang sama lebih dari sekali; menyimpan ID event mencegah proses ganda.'),
        tags: ['signature-webhook', 'idempotent'],
      }),
      makeAnchorMcq({
        id: 'b06-anc-p5',
        prompt: t('Kapan Apache Kafka atau Redis Pub/Sub lebih cocok daripada Message Queue satu pekerja biasa?'),
        choices: [
          {
            id: 'multi',
            label: t('Ketika satu event seperti pesanan.dibayar perlu memicu banyak layanan sekaligus secara paralel'),
          },
          {
            id: 'form',
            label: t('Ketika hanya ingin mengirim formulir kontak statis di satu file HTML'),
          },
          {
            id: 'font',
            label: t('Ketika mengatur ukuran huruf judul di CSS'),
          },
        ],
        answer: 'multi',
        explainCorrect: t('Pub/Sub menyiarkan salinan event ke banyak subscriber berbeda tanpa penerbit harus mengenal semuanya.'),
        tags: ['queue-pubsub'],
      }),
      makeAnchorMcq({
        id: 'b06-anc-p6',
        type: 'limit',
        analogy: t('Kurir memencet bel pintu rumah'),
        prompt: t('Apa batas penting dari analogi bel pintu rumah ketika diterapkan pada webhook?'),
        choices: [
          {
            id: 'srv',
            label: t('Bel webhook berbunyi di server ber-URL publik, bukan di browser pengguna, dan paket bisa datang dua kali atau terbalik urutannya'),
          },
          {
            id: 'ring',
            label: t('Pemilik rumah tidak perlu membuka pintu setiap lima menit'),
          },
          {
            id: 'addr',
            label: t('Pengirim butuh alamat tujuan yang jelas'),
          },
        ],
        answer: 'srv',
        explainCorrect: t('Webhook berjalan antar server dan di jaringan nyata pengiriman ulang atau urutan tertukar tetap bisa terjadi.'),
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
      'Aku tahu cara kerja webhook sebagai bel pintu server saat ada kejadian baru.',
      'Aku bisa menjelaskan cara kerja webhook serta perbedaannya dengan polling ke API biasa.',
    ),
    estMinutes: 5,
    introducesTerms: ['webhook'],
    usesTerms: ['api', 'server', 'browser', 'request', 'http-method', 'polling', 'sse', 'websocket'],
    stickerId: 'bel-pintu',
    warmupFrom: 'b05-l05',
    steps: [
      storyStep('b06/bel-pintu.svg', [
        rText(
          'Daripada membuka pintu setiap 5 menit untuk mengecek paket, kamu bilang ke kurir: pencet bel rumah kalau paket sudah tiba!',
          'Daripada terus bertanya "Pembayaran pesanan 88 sudah masuk belum?" lewat polling, kamu mendaftarkan alamat ke layanan lain agar ia memencet bel servermu saat kejadian terjadi.',
        ),
      ]),
      conceptStep({
        title: t('Apa Itu Webhook?', 'Konsep Dasar Webhook'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b06', topic: 'webhook-request' },
        alt: t('Diagram penyedia pembayaran mengirim request POST webhook ke server toko.'),
        body: [
          rTerm('webhook', 'Webhook', 'Webhook'),
          rText(
            ' mengirim HTTP POST ke alamat servermu. Pesan dikirim otomatis saat kejadian muncul.',
            ' adalah panggilan HTTP otomatis (umumnya POST) dari layanan lain ke URL server yang sudah kamu daftarkan.',
          ),
        ],
      }),
      conceptStep({
        title: t('Contoh Bayar Online', 'Alur Pembayaran Online'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b06', topic: 'bayar-online' },
        alt: t('Alur pembeli membayar di bank lalu payment gateway memanggil webhook server toko.'),
        body: [
          rText(
            'Saat pembeli bayar lewat bank, server tidak tahu. Layanan bayar memencet bel webhook ke servermu.',
            'Payment gateway tidak tahu kapan pembeli selesai transfer, namun begitu dana masuk, ia mengirim webhook ke server Toko Rani dan menerima jawaban 200 OK.',
          ),
        ],
      }),
      conceptStep({
        title: t('Server ke Server', 'Webhook Bukan untuk Browser'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b06', topic: 'server-ke-server' },
        alt: t('Webhook berhenti di server, lalu server meneruskannya ke browser lewat SSE atau WebSocket.'),
        body: [
          rText(
            'Webhook datang ke server, bukan ke browser. Server lalu mengabari layar lewat siaran atau telepon.',
            'Browser tidak punya URL publik tetap yang bisa dipanggil dari luar. Server menerima webhook lebih dulu, lalu mengabari browser via ',
          ),
          rTerm('sse', 'SSE', 'SSE'),
          rText(' atau ', ' atau '),
          rTerm('websocket', 'WebSocket', 'WebSocket'),
          rText('.', '.'),
        ],
      }),
      limitStep({
        analogy: t('Kurir memencet bel pintu rumah'),
        same: [
          t('Kamu tidak perlu bertanya berulang kali; pengirim mengabari begitu paket datang.'),
          t('Alamat rumah yang didaftarkan mirip URL endpoint webhook di servermu.'),
        ],
        different: [
          t('Bel webhook hanya bisa dipasang di server publik, bukan di browser HP pengguna.'),
          t('Di internet, kurir webhook bisa memencet bel dua kali atau urutan kabar tertukar.'),
        ],
      }),
      simStep(
        'bel-webhook',
        t(
          'Klik tombol bayar untuk melihat layanan bayar memencet bel webhook ke server Toko Rani!',
          'Simulasikan alur pembeli membayar di bank hingga payment gateway mengirim POST /webhook ke server.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'b06-l01-q1',
          type: 'analogy',
          prompt: t('Dalam analogi kurir dan bel rumah, bunyi bel yang terdengar di rumah ibarat…'),
          choices: [
            { id: 'req', label: t('Request webhook yang masuk ke servermu') },
            {
              id: 'poll',
              label: t('Membuka pintu tiap 5 menit sendiri'),
              explainWrong: t('Membuka pintu terus-menerus itulah cara polling, bukan bel webhook.'),
            },
            {
              id: 'css',
              label: t('Warna cat pintu rumah'),
              explainWrong: t('Warna pintu mirip CSS, bukan kabar yang masuk.'),
            },
          ],
          answer: 'req',
          explainCorrect: t('Benar! Bunyi bel adalah request HTTP yang dikirim ke URL servermu.'),
          hints: [t('Siapa yang memicu bunyi bel?'), t('Pengirim mengirim pesan ketika kejadian selesai.')],
          tags: ['webhook'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b06-l01-q2',
          prompt: t('Method HTTP apa yang paling sering dipakai layanan lain saat mengirim data webhook?'),
          choices: [
            { id: 'post', label: t('POST') },
            {
              id: 'get',
              label: t('GET tanpa isi data'),
              explainWrong: t('Webhook membawa payload data kejadian di body sehingga memakai POST.'),
            },
            {
              id: 'del',
              label: t('DELETE'),
              explainWrong: t('DELETE untuk menghapus resource, bukan mengabari kejadian baru.'),
            },
          ],
          answer: 'post',
          explainCorrect: t('Tepat! Webhook umumnya mengirim request POST berisi JSON detail kejadian.'),
          tags: ['webhook', 'http-method'],
        }),
      ),
      qStep({
        id: 'b06-l01-q3',
        type: 'order',
        prompt: t('Urutkan alur pembayaran online memakai webhook dari awal hingga lunas:'),
        difficulty: 2,
        items: [
          { id: 's3', label: t('Payment gateway mengirim POST webhook ke server toko') },
          { id: 's1', label: t('Pembeli menekan Bayar dan melunasi tagihan di bank') },
          { id: 's4', label: t('Server toko mencatat lunas lalu mengabari browser pembeli') },
          { id: 's2', label: t('Layanan pembayaran menerima konfirmasi dana masuk') },
        ],
        answer: ['s1', 's2', 's3', 's4'],
        explainCorrect: t('Mantap! Bank mengabari payment gateway, lalu gateway memencet bel server toko.'),
        tags: ['webhook'],
      }),
      qStep(
        makeTf({
          id: 'b06-l01-q4',
          prompt: t('Dengan webhook, browser pengguna langsung menerima request POST dari server bank tanpa lewat server toko.'),
          answer: false,
          explainCorrect: t('Betul, pernyataan itu salah! Webhook selalu masuk ke server, bukan langsung ke browser.'),
          explainWrong: t('Hampir! Browser pengguna tidak punya alamat publik tetap sehingga tidak bisa menerima webhook langsung.'),
          tags: ['webhook', 'browser', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b06-l01-q5',
          type: 'limit',
          analogy: t('Kurir memencet bel pintu rumah'),
          prompt: t('Apa batas dari perumpamaan bel rumah saat menjelaskan webhook di aplikasi web?'),
          difficulty: 2,
          choices: [
            {
              id: 'srv',
              label: t('Webhook hanya bisa memanggil alamat server yang terbuka di internet, bukan browser pribadi'),
            },
            {
              id: 'wait',
              label: t('Pemilik tidak perlu bertanya berulang kali'),
              explainWrong: t('Itu justru bagian yang sama antara bel rumah dan webhook.'),
            },
            {
              id: 'note',
              label: t('Kurir mengantarkan kabar saat sesuatu tiba'),
              explainWrong: t('Ini kemiripan utamanya.'),
            },
          ],
          answer: 'srv',
          explainCorrect: t('Tepat! Saat mengembangkan di laptop lokal, kamu bahkan butuh tunnel seperti ngrok agar server punya alamat publik.'),
          tags: ['webhook', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b06-l01-q6',
          type: 'scenario',
          story: t('Raka membuat toko buku. Ia lelah karena servernya harus menanya status pembayaran ke API bank setiap 3 detik untuk ribuan pesanan.'),
          prompt: t('Solusi paling hemat dan otomatis untuk mengganti tanya-tanya berulang itu adalah…'),
          difficulty: 2,
          choices: [
            { id: 'wh', label: t('Daftarkan URL endpoint webhook di layanan pembayaran') },
            {
              id: 'fast',
              label: t('Percepat polling menjadi setiap 0,1 detik'),
              explainWrong: t('Itu justru membuat server dan bank makin kewalahan.'),
            },
            {
              id: 'css',
              label: t('Ubah warna tombol Bayar'),
              explainWrong: t('Warna tombol tidak memberi kabar pembayaran masuk.'),
            },
          ],
          answer: 'wh',
          explainCorrect: t('Benar! Dengan webhook, layanan pembayaran langsung menghubungi server Raka saat uang masuk.'),
          tags: ['webhook', 'polling'],
        }),
      ),
      qStep({
        id: 'b06-l01-q7',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi contoh alur pengiriman kabar setelah server menerima webhook agar halaman browser ikut terbarui:'),
        template: 'Payment gateway kirim ___ ke server → Server balas 200 → Server dorong kabar ke browser via ___',
        bank: ['POST webhook', 'SSE / WebSocket', 'CSS', 'HTML'],
        answer: ['POST webhook', 'SSE / WebSocket'],
        explainCorrect: t('Tepat. Webhook berhenti di server, kemudian server menyiarkannya ke browser via SSE atau WebSocket.'),
        tags: ['webhook', 'sse', 'websocket'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b06-l01-r1',
        prompt: t('Apa tugas utama webhook?'),
        choices: [
          { id: 'push', label: t('Mengabari servermu otomatis lewat HTTP POST saat ada kejadian') },
          { id: 'ask', label: t('Menanya server terus-menerus tiap detik'), explainWrong: t('Menanya berulang kali disebut polling.') },
        ],
        answer: 'push',
        explainCorrect: t('Webhook memencet bel servermu otomatis begitu sebuah event terjadi.'),
        tags: ['webhook'],
      }),
      makeTf({
        id: 'b06-l01-r2',
        prompt: t('Webhook dikirim dari server layanan ke server aplikasi kita, bukan langsung ke browser.'),
        answer: true,
        explainCorrect: t('Benar! Browser tidak memiliki URL publik tetap untuk dipanggil dari luar.'),
        explainWrong: t('Ingat: webhook adalah komunikasi server ke server.'),
        tags: ['webhook', 'server'],
      }),
    ],
    recap: t(
      'Webhook adalah bel pintu server: layanan lain mengirim kabar otomatis saat ada kejadian.',
      'Webhook menggantikan polling antar server dengan mengirim HTTP POST ke URL terdaftar ketika event terjadi.',
    ),
    companion: {
      talkPrompts: [
        'Lebih capek mana: mengintip kotak surat setiap 5 menit atau memasang bel pintu untuk kurir?',
        'Kenapa notifikasi lunas di HP butuh bantuan server toko dulu sebelum tampil di layar?',
      ],
      offlineActivity:
        'Main tebak peran 3 menit: satu orang jadi Pembeli, satu jadi Bank, satu jadi Server Toko. Saat Pembeli menaruh uang mainan ke Bank, Bank mengetuk meja Server Toko ("Ting! Lunas!").',
    },
  }),

  makeLesson({
    id: 'b06-l02',
    worldId: 'b06',
    title: 'Mengamankan webhook',
    modes: ['pro'],
    objective: t('Aku bisa memeriksa signature HMAC, menjaga idempotensi penerima, dan menghindari jebakan umum webhook.'),
    estMinutes: 5,
    introducesTerms: ['signature-webhook'],
    usesTerms: ['webhook', 'server', 'header-body', 'status-code', 'idempotent', 'https', 'api'],
    warmupFrom: 'b06-l01',
    steps: [
      storyStep('b06/signature-webhook.svg', [
        rText('Alamat webhook terbuka di internet sehingga siapa pun bisa iseng mengirim surat "pesanan 88 LUNAS". Seperti segel lilin bercap pada surat kerajaan, hanya pemilik kunci rahasia yang bisa membuat cap asli.'),
      ]),
      conceptStep({
        title: t('Verifikasi Tanda Tangan (Signature)'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b06', topic: 'signature-hmac' },
        alt: t('Pengirim dan server penerima menghitung HMAC SHA-256 lalu mencocokkannya.'),
        code: {
          lang: 'js',
          code: 'const capKita = crypto.createHmac("sha256", RAHASIA_WEBHOOK)\n  .update(isiMentahRequest).digest("hex");\nif (capKita !== req.headers["x-signature"]) {\n  return res.status(401).send("Tanda tangan tidak cocok");\n}',
        },
        body: [
          rText('Pengirim membuat '),
          rTerm('signature-webhook', 'signature'),
          rText(' dari isi pesan dan kunci rahasia di header. Server menghitung ulang cap yang sama dan menolak (401) jika tidak cocok, lalu mengecek ulang API sumber untuk transaksi uang.'),
        ],
      }),
      conceptStep({
        title: t('Idempotensi & Balas 200 Cepat'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b06', topic: 'aturan-main-webhook' },
        alt: t('Tabel aturan main webhook: idempotent untuk retry, balas 200 cepat, jangan percaya urutan.'),
        body: [
          rText('Pengirim bisa mengirim ulang jika servermu lambat menjawab. Buat penerima '),
          rTerm('idempotent', 'idempotent'),
          rText(' dengan menyimpan ID kejadian agar tidak diproses dua kali, dan balas '),
          rCode('200 OK'),
          rText(' secepatnya.'),
        ],
      }),
      conceptStep({
        title: t('Urutan Terbalik & Uji Lokal'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b06', topic: 'urutan-dan-tunnel' },
        alt: t('Menangani urutan event terbalik serta memakai tunnel saat mengembangkan di laptop.'),
        body: [
          rText('Jangan bergantung pada urutan kedatangan webhook karena kabar "dikirim" bisa tiba sebelum "dibayar"; cek status terbaru dari API sumber. Saat coding di laptop, pakai '),
          rCode('ngrok'),
          rText(' atau '),
          rCode('Cloudflare Tunnel'),
          rText(' untuk alamat HTTPS sementara.'),
        ],
      }),
      limitStep({
        analogy: t('Segel lilin bercap pada surat kerajaan'),
        same: [
          t('Memastikan isi pesan benar-benar ditulis oleh pemilik kunci rahasia dan tidak diubah di tengah jalan.'),
        ],
        different: [
          t('Surat fisik jarang datang dua kali dengan amplop identik; webhook bisa dikirim ulang otomatis (retry) atau datang dengan urutan tertukar.'),
        ],
      }),
      simStep(
        'bel-webhook',
        t('Uji penerimaan webhook pada simulator dan bayangkan pemeriksaan header signature sebelum status berubah.'),
      ),
      qStep(
        makeMcq({
          id: 'b06-l02-q1',
          type: 'analogy',
          prompt: t('Dalam keamanan webhook, signature HMAC di header paling tepat diumpamakan sebagai…'),
          choices: [
            { id: 'seal', label: t('Segel lilin bercap rahasia pada surat kerajaan') },
            {
              id: 'env',
              label: t('Warna amplop surat'),
              explainWrong: t('Warna amplop tidak membuktikan pengirim memiliki kunci rahasia.'),
            },
            {
              id: 'bell',
              label: t('Papan nama depan rumah'),
              explainWrong: t('Papan nama itu URL endpoint, bukan cap keaslian.'),
            },
          ],
          answer: 'seal',
          explainCorrect: t('Tepat. Hanya pihak yang mengetahui kunci rahasia yang dapat menghasilkan signature yang cocok.'),
          tags: ['signature-webhook'],
        }),
      ),
      qStep({
        id: 'b06-l02-q2',
        type: 'spotbug',
        prompt: t('Ketuk baris yang berbahaya karena langsung melunaskan pesanan tanpa memverifikasi signature webhook:'),
        difficulty: 2,
        lines: [
          'app.post("https://api.toko-rani.example/webhook", (req, res) => {',
          '  tandaiPesananLunas(req.body.pesananId);',
          '  return res.status(200).send("OK");',
          '});',
        ],
        answer: [2],
        explainCorrect: t('Tepat! Baris 2 langsung mempercayai req.body tanpa memeriksa header signature atau cek ulang ke API sumber.'),
        tags: ['signature-webhook', 'webhook'],
      }),
      qStep({
        id: 'b06-l02-q3',
        type: 'match',
        prompt: t('Pasangkan masalah webhook dengan solusi terbaiknya:'),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('Bel berbunyi dua kali (retry)') },
          { id: 'l2', label: t('Pengirim menyerah karena timeout') },
          { id: 'l3', label: t('Kabar "dikirim" datang sebelum "dibayar"') },
          { id: 'l4', label: t('Request palsu dari orang iseng') },
        ],
        right: [
          { id: 'r1', label: t('Simpan ID kejadian agar idempotent') },
          { id: 'r2', label: t('Balas 200 secepatnya lalu proses di belakang') },
          { id: 'r3', label: t('Cek status terbaru langsung ke API sumber') },
          { id: 'r4', label: t('Wajib periksa signature dan gunakan HTTPS') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
        explainCorrect: t('Sempurna! Keempat aturan main ini membuat penerima webhook tangguh di dunia nyata.'),
        tags: ['signature-webhook', 'idempotent', 'https'],
      }),
      qStep(
        makeMcq({
          id: 'b06-l02-q4',
          type: 'why',
          base: 'Server penerima webhook wajib membalas status 200 secepatnya sebelum melakukan pekerjaan berat seperti membuat PDF atau mengirim email.',
          prompt: t('Mengapa balasan 200 harus cepat dikirim?'),
          choices: [
            { id: 'timeout', label: t('Agar pengirim tidak menganggap gagal lalu mengirim ulang (retry) berulang kali') },
            {
              id: 'size',
              label: t('Karena status 200 hanya berlaku di bawah 100 byte'),
              explainWrong: t('Status 200 tidak memiliki batas 100 byte.'),
            },
            {
              id: 'json',
              label: t('Supaya format JSON berubah menjadi XML'),
              explainWrong: t('Kecepatan balas tidak mengubah format data.'),
            },
          ],
          answer: 'timeout',
          explainCorrect: t('Benar. Jika jawaban lambat, penyedia webhook mengira servermu bermasalah dan akan melakukan retry.'),
          tags: ['webhook', 'status-code'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b06-l02-q5',
          type: 'limit',
          analogy: t('Segel lilin surat kerajaan'),
          prompt: t('Mengapa memeriksa signature saja masih perlu dilengkapi dengan cek ulang ke sumber dan penyimpanan ID kejadian?'),
          choices: [
            {
              id: 'extra',
              label: t('Karena surat bersigel asli pun bisa terkirim ganda lewat retry atau datang dengan urutan tertukar'),
            },
            {
              id: 'weak',
              label: t('Karena HMAC SHA-256 tidak memakai kunci rahasia'),
              explainWrong: t('HMAC justru memakai kunci rahasia bersama.'),
            },
            {
              id: 'css',
              label: t('Karena signature hanya berlaku di browser'),
              explainWrong: t('Signature webhook diverifikasi di server.'),
            },
          ],
          answer: 'extra',
          explainCorrect: t('Tepat. Signature membuktikan keaslian pengirim, sedangkan idempotensi dan cek ulang melindungi logika bisnis.'),
          tags: ['signature-webhook', 'idempotent'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b06-l02-q6',
          type: 'scenario',
          story: t('Dimas sedang menguji webhook pembayaran di laptop lokalnya (localhost), tetapi payment gateway di internet gagal menghubungi alamat laptopnya.'),
          prompt: t('Alat apa yang membantu Dimas mendapatkan alamat publik sementara agar webhook bisa masuk ke laptop?'),
          choices: [
            { id: 'tun', label: t('ngrok atau Cloudflare Tunnel') },
            {
              id: 'css',
              label: t('File style.css tambahan'),
              explainWrong: t('CSS tidak memberi alamat publik untuk server lokal.'),
            },
            {
              id: 'cache',
              label: t('Hapus cache browser'),
              explainWrong: t('Localhost tetap tidak bisa diakses server luar meski cache dihapus.'),
            },
          ],
          answer: 'tun',
          explainCorrect: t('Benar! Tunnel meneruskan URL HTTPS publik sementara langsung ke port laptop lokal.'),
          tags: ['webhook', 'https'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b06-l02-r1',
        prompt: t('Jika header signature webhook tidak cocok dengan hasil hitungan servermu, tindakan yang tepat adalah…'),
        choices: [
          { id: 'rej', label: t('Tolak request (misalnya 401) dan jangan proses datanya') },
          { id: 'ok', label: t('Tetap proses pesanan agar pembeli tidak menunggu'), explainWrong: t('Itu membuka celah pesan palsu.') },
        ],
        answer: 'rej',
        explainCorrect: t('Jangan pernah memproses webhook yang tanda tangannya tidak cocok.'),
        tags: ['signature-webhook'],
      }),
      makeTf({
        id: 'b06-l02-r2',
        prompt: t('Untuk transaksi bernilai uang besar, cek ulang langsung ke API sumber setelah menerima webhook seperti menelepon balik nomor resmi bank.'),
        answer: true,
        explainCorrect: t('Betul! Verifikasi ganda ke API sumber menambah lapisan keamanan ekstra.'),
        explainWrong: t('Untuk transaksi kritis, konfirmasi langsung ke sumber sangat dianjurkan.'),
        tags: ['signature-webhook', 'api'],
      }),
    ],
    recap: t('Amankan webhook dengan HTTPS, verifikasi HMAC signature, penerima idempotent, dan balasan 200 yang cepat.'),
  }),

  makeLesson({
    id: 'b06-l03',
    worldId: 'b06',
    title: 'Antrean dan grup pengumuman',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan nomor antrean kerja (Queue) dan grup pengumuman (Pub/Sub).',
      'Aku bisa menjelaskan arsitektur event-driven menggunakan Message Queue dan Pub/Sub beserta perannya bagi tampilan frontend.',
    ),
    estMinutes: 5,
    introducesTerms: ['queue-pubsub'],
    usesTerms: ['webhook', 'server', 'frontend', 'websocket'],
    stickerId: 'antrean-bank',
    warmupFrom: 'b06-l02',
    steps: [
      storyStep('b06/antrean-bank.svg', [
        rText(
          'Di bank, kamu ambil nomor antrean lalu duduk. Di kelas, satu pengumuman grup WA dibaca semua murid!',
          'Dalam arsitektur berbasis kejadian (event-driven), sistem tidak saling memerintah langsung, melainkan menitipkan tugas di antrean bank atau mengumumkan kabar ke grup langganan.',
        ),
      ]),
      conceptStep({
        title: t('Nomor Antrean (Queue)', 'Message Queue'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b06', topic: 'message-queue' },
        alt: t('Pengirim menaruh pesan di antrean, lalu pekerja mengambil satu per satu.'),
        body: [
          rTerm('queue-pubsub', 'Message queue', 'Message queue'),
          rText(
            ' seperti nomor antrean bank. Pesan dititipkan ke antrean lalu dikerjakan satu pekerja.',
            ' menyimpan tugas seperti kirim email konfirmasi atau olah video. Satu pesan diambil satu pekerja saja (contoh alat: RabbitMQ, Amazon SQS).',
          ),
        ],
      }),
      conceptStep({
        title: t('Grup Pengumuman (Pub/Sub)', 'Publish–Subscribe'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b06', topic: 'pub-sub' },
        alt: t('Satu topik pesanan.dibayar mengirim salinan ke layanan email, gudang, dan poin.'),
        body: [
          rTerm('queue-pubsub', 'Pub/Sub', 'Pub/Sub'),
          rText(
            ' seperti grup pengumuman kelas. Satu kabar disiarkan ke topik agar semua pelanggan menerimanya.',
            ' (publish–subscribe) menyiarkan event ke sebuah topik sehingga semua layanan pelanggan menerima salinan (contoh: Redis Pub/Sub, Apache Kafka, MQTT untuk IoT).',
          ),
        ],
      }),
      conceptStep({
        title: t('Kabar Jujur di Layar', 'Pengaruh ke Frontend'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b06', topic: 'tampilan-antrean' },
        alt: t('Tampilan status "Pembayaran sedang diverifikasi" saat tugas menunggu di antrean.'),
        body: [
          rText(
            'Saat pesan menunggu di antrean, layar aplikasi memberi tahu pengguna agar sabar menunggu sebentar.',
            'Sebagai frontend developer, paham pola antrean membuatmu mengerti mengapa status tak langsung berubah dan menampilkan pesan seperti "Pembayaran sedang diverifikasi".',
          ),
        ],
      }),
      limitStep({
        analogy: t('Nomor antrean bank dan grup WA kelas'),
        same: [
          t('Pengirim tugas tidak perlu menunggu pekerja selesai untuk melayani tamu berikutnya.'),
          t('Di grup pengumuman, pengirim tidak perlu tahu apa reaksi setiap anggota.'),
        ],
        different: [
          t('Jika listrik mati sebentar atau pekerja sibuk, antrean digital menyimpan pesan dengan aman sampai pekerja hidup lagi.'),
          t('Sistem besar seperti Apache Kafka mencatat jutaan kejadian berurutan dan bisa memutar ulang catatan lama.'),
        ],
      }),
      simStep(
        'bel-webhook',
        t(
          'Lihat saat bel webhook diterima server lalu pekerja di belakang layar menandai pesanan lunas!',
          'Amati bagaimana webhook memicu pencatatan cepat agar pekerjaan lanjutan bisa masuk ke antrean.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'b06-l03-q1',
          type: 'analogy',
          prompt: t('Admin kelas mengirim satu pengumuman "Besok libur" ke grup agar semua murid bereaksi masing-masing. Itu mirip dengan…'),
          choices: [
            { id: 'ps', label: t('Pub/Sub (Publish–Subscribe)') },
            {
              id: 'mq',
              label: t('Satu nomor antrean untuk satu teller'),
              explainWrong: t('Nomor antrean bank hanya dikerjakan oleh satu pekerja, bukan disiarkan ke semua.'),
            },
            {
              id: 'poll',
              label: t('Menanya teman tiap detik'),
              explainWrong: t('Menanya berulang itu polling.'),
            },
          ],
          answer: 'ps',
          explainCorrect: t('Benar! Pada Pub/Sub, satu kejadian disiarkan ke semua pelanggan topik tersebut.'),
          tags: ['queue-pubsub'],
        }),
      ),
      qStep({
        id: 'b06-l03-q2',
        type: 'sort',
        prompt: t('Kelompokkan contoh berikut ke Message Queue (1 pekerja) atau Pub/Sub (semua pelanggan):'),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('Antrean tugas kirim email struk satu per satu') },
          { id: 'i2', label: t('Topik pesanan.dibayar diterima gudang, email, dan poin') },
          { id: 'i3', label: t('Nomor antrean bank dipanggil teller') },
          { id: 'i4', label: t('Grup pengumuman kelas WA') },
        ],
        bins: [
          { id: 'mq', label: t('Message Queue') },
          { id: 'ps', label: t('Pub/Sub') },
        ],
        answer: { i1: 'mq', i2: 'ps', i3: 'mq', i4: 'ps' },
        explainCorrect: t('Hebat! Queue mengantrekan satu pesan untuk satu pekerja; Pub/Sub menyiarkan ke semua pelanggan topik.'),
        tags: ['queue-pubsub'],
      }),
      qStep({
        id: 'b06-l03-q3',
        type: 'match',
        prompt: t('Pasangkan alat atau protokol dengan peran populernya:'),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('RabbitMQ / Amazon SQS') },
          { id: 'l2', label: t('Apache Kafka') },
          { id: 'l3', label: t('MQTT') },
          { id: 'l4', label: t('Redis Pub/Sub') },
        ],
        right: [
          { id: 'r1', label: t('Layanan antrean pesan populer') },
          { id: 'r2', label: t('Catatan kejadian berurutan skala raksasa') },
          { id: 'r3', label: t('Pub/sub hemat untuk perangkat IoT') },
          { id: 'r4', label: t('Pub/sub ringan untuk chat antar server') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
        explainCorrect: t('Keren! Setiap alat punya kekuatan dari antrean ringan sampai sensor IoT dan log kejadian besar.'),
        tags: ['queue-pubsub', 'websocket'],
      }),
      qStep(
        makeTf({
          id: 'b06-l03-q4',
          prompt: t('Jika satu pekerja antrean sedang istirahat atau mati sebentar, pesan di message queue langsung hilang selamanya.'),
          answer: false,
          explainCorrect: t('Betul, itu salah! Pesan tetap aman menunggu di antrean sampai diambil pekerja lain.'),
          explainWrong: t('Hampir! Justru keunggulan antrean adalah menjaga pesan tetap aman saat pekerja sedang sibuk atau mati sebentar.'),
          tags: ['queue-pubsub'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b06-l03-q5',
          type: 'limit',
          analogy: t('Nomor antrean bank dan grup WA'),
          prompt: t('Apa perbedaan yang TIDAK terjadi pada antrean kertas di bank biasa dibanding antrean pesan digital?'),
          choices: [
            {
              id: 'save',
              label: t('Antrean digital bisa menyimpan ribuan pesan aman meski pekerja mati sebentar dan memutar ulang catatan lama'),
            },
            {
              id: 'order',
              label: t('Pelanggan mendapat giliran antrean'),
              explainWrong: t('Keduanya sama-sama mengatur giliran.'),
            },
            {
              id: 'free',
              label: t('Pemberi nomor tidak perlu menunggu teller selesai'),
              explainWrong: t('Ini memang persamaan antara satpam bank dan pengirim pesan.'),
            },
          ],
          answer: 'save',
          explainCorrect: t('Tepat! Antrean pesan digital menjaga ketahanan data dan sistem seperti Kafka bisa membaca ulang riwayat.'),
          tags: ['queue-pubsub'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b06-l03-q6',
          type: 'scenario',
          story: t('Sari baru membayar pesanan kue di Toko Rani. Karena tugas cek pembayaran masuk ke antrean server selama 3 detik, status belum langsung berubah di layar.'),
          prompt: t('Desain pesan frontend terbaik untuk Sari adalah…'),
          difficulty: 2,
          choices: [
            { id: 'msg', label: t('Tampilkan "Pembayaran sedang diverifikasi" sambil menunggu pembaruan') },
            {
              id: 'freeze',
              label: t('Biarkan tombol Bayar bisa diklik berkali-kali tanpa pesan apa pun'),
              explainWrong: t('Pengguna bisa panik dan menekan bayar berkali-kali.'),
            },
            {
              id: 'fail',
              label: t('Tampilkan layar error merah padahal masih antre'),
              explainWrong: t('Transaksi belum gagal, hanya sedang diproses di antrean.'),
            },
          ],
          answer: 'msg',
          explainCorrect: t('Tepat! Info jujur membuat pengalaman pengguna nyaman sementara pekerja antrean bekerja di belakang.'),
          tags: ['queue-pubsub', 'frontend'],
        }),
      ),
      qStep({
        id: 'b06-l03-q7',
        type: 'type',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Tulis nama protokol pub/sub yang sangat hemat dan cocok untuk sensor suhu atau lampu pintar IoT:'),
        accept: ['MQTT', 'mqtt'],
        explainCorrect: t('Tepat! MQTT dirancang ringan dan hemat daya untuk perangkat IoT di jaringan lemah.'),
        tags: ['queue-pubsub'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b06-l03-r1',
        prompt: t('Pola apa yang mengirim satu pesan kepada SATU pekerja saja untuk diproses?'),
        choices: [
          { id: 'mq', label: t('Message Queue') },
          { id: 'ps', label: t('Pub/Sub'), explainWrong: t('Pub/Sub mengirim salinan ke semua pelanggan topik.') },
        ],
        answer: 'mq',
        explainCorrect: t('Message Queue bekerja seperti nomor antrean bank: satu tugas dikerjakan satu pekerja.'),
        tags: ['queue-pubsub'],
      }),
      makeMcq({
        id: 'b06-l03-r2',
        prompt: t('Ketika satu event "pesanan.dibayar" harus memicu layanan email, gudang, dan poin sekaligus, pola yang dipakai adalah…'),
        choices: [
          { id: 'ps', label: t('Pub/Sub') },
          { id: 'css', label: t('Box Model CSS'), explainWrong: t('Box model untuk jarak elemen layar.') },
        ],
        answer: 'ps',
        explainCorrect: t('Pub/Sub menyiarkan event ke topik sehingga semua layanan berlangganan dapat bereaksi sendiri.'),
        tags: ['queue-pubsub'],
      }),
    ],
    recap: t(
      'Antrean (Queue) membagi pekerjaan ke satu pekerja; Pub/Sub menyiarkan kabar ke banyak penerima sekaligus.',
      'Event-driven memisahkan pengirim dan pemroses lewat Message Queue (satu pekerja) serta Pub/Sub (banyak pelanggan topik).',
    ),
    companion: {
      talkPrompts: [
        'Apa bedanya nomor antrean puskesmas dengan pengumuman pengeras suara di sekolah?',
        'Kenapa layar kasir perlu memberi tulisan "Sedang diproses" saat antrean di dapur ramai?',
      ],
      offlineActivity:
        'Buat kertas nomor antrean 1-3 dan satu kertas pengumuman "Bel istirahat berbunyi!". Bandingkan mana yang hanya diambil satu petugas (Queue) dan mana yang diikuti semua orang (Pub/Sub).',
    },
  }),
];
