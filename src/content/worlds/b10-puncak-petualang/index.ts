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
  id: 'b10',
  track: 'B',
  order: 10,
  title: 'Puncak Petualang',
  tagline: t(
    'Memilih alat dan jenis API yang paling cocok untuk tiap tantangan!',
    'Menyintesis pemilihan arsitektur API (REST, GraphQL, gRPC, SSE, WebSocket, Webhook) dari kasus nyata.',
  ),
  color: '#1F2340',
  illustration: 'b10-puncak-petualang',
  sourceChapters: ['J2-16'],
  requires: ['b09'],
  lessons: ['b10-l01'],
  sideQuests: [],
  boss: {
    title: 'Tantangan Penjaga Puncak Petualang',
    greeting: t(
      'Selamat datang di puncak! Pilihlah jenis API yang paling pas untuk setiap misi!',
      'Di ujian akhir ini, buktikan kemampuanmu menyintesis arsitektur API terbaik untuk kasus nyata.',
    ),
    guardianName: 'Penjaga Puncak Petualang',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'b10-anc-j1',
        prompt: t('Jika ragu memilih jenis API untuk toko web biasa dengan tombol ambil, buat, ubah, dan hapus, mulai saja dengan…'),
        choices: [
          { id: 'rest', label: t('REST API'), explainWrong: t('Benar!') },
          {
            id: 'webrtc',
            label: t('Walkie-talkie WebRTC'),
            explainWrong: t('WebRTC khusus komunikasi suara dan video langsung antar browser.'),
          },
          {
            id: 'poll',
            label: t('Polling setiap setengah detik'),
            explainWrong: t('Polling terus-menerus boros kuota bila tidak butuh pembaruan langsung.'),
          },
        ],
        answer: 'rest',
        explainCorrect: t('REST adalah pilihan awal terbaik yang sederhana dan cocok untuk hampir semua aplikasi web.'),
        tags: ['rest'],
      }),
      makeAnchorMcq({
        id: 'b10-anc-j2',
        prompt: t('Untuk menampilkan berita terkini atau jawaban AI yang mengalir satu arah dari server ke layar, pilihlah…'),
        choices: [
          { id: 'sse', label: t('SSE (siaran radio satu arah)'), explainWrong: t('Tepat!') },
          {
            id: 'wh',
            label: t('Webhook antar server'),
            explainWrong: t('Webhook dikirim ke server, bukan mengalir ke layar browser.'),
          },
          {
            id: 'soap',
            label: t('Surat dinas XML'),
            explainWrong: t('SOAP dipakai untuk tanya-jawab formal sistem lama, bukan streaming teks.'),
          },
        ],
        answer: 'sse',
        explainCorrect: t('SSE seperti radio: server menyiarkan pembaruan satu arah ke browser.'),
        tags: ['sse'],
      }),
      makeAnchorMcq({
        id: 'b10-anc-j3',
        prompt: t('Agar dua pemain game atau chat bisa mengirim dan menerima pesan cepat dua arah sekaligus, gunakan…'),
        choices: [
          { id: 'ws', label: t('WebSocket (telepon tersambung)'), explainWrong: t('Benar!') },
          {
            id: 'sse',
            label: t('SSE satu arah'),
            explainWrong: t('SSE hanya satu arah dari server ke layar.'),
          },
          {
            id: 'css',
            label: t('Grid CSS'),
            explainWrong: t('Grid CSS untuk tata letak kotak halaman.'),
          },
        ],
        answer: 'ws',
        explainCorrect: t('WebSocket membuka jalur dua arah terus-menerus seperti telepon tersambung.'),
        tags: ['websocket'],
      }),
      makeAnchorMcq({
        id: 'b10-anc-j4',
        prompt: t('Layanan pembayaran ingin mengabari server toko saat uang pembeli sudah masuk. Pilihan terbaiknya adalah…'),
        choices: [
          { id: 'wh', label: t('Webhook (bel pintu server)'), explainWrong: t('Tepat!') },
          {
            id: 'rtc',
            label: t('Video call WebRTC'),
            explainWrong: t('Server pembayaran dan server toko tidak melakukan panggilan video.'),
          },
          {
            id: 'gql',
            label: t('Pelayan GraphQL di browser'),
            explainWrong: t('GraphQL untuk meminta data dari browser, bukan pemberitahuan otomatis antar server.'),
          },
        ],
        answer: 'wh',
        explainCorrect: t('Webhook memencet bel server toko begitu kejadian pembayaran lunas terjadi.'),
        tags: ['webhook'],
      }),
      makeAnchorMcq({
        id: 'b10-anc-j5',
        prompt: t('Untuk melakukan panggilan video langsung antar dua teman tanpa rekaman lewat server terus-menerus, pakailah…'),
        choices: [
          { id: 'rtc', label: t('WebRTC (walkie-talkie langsung)'), explainWrong: t('Benar!') },
          {
            id: 'rest',
            label: t('REST API biasa'),
            explainWrong: t('REST tidak cocok untuk aliran suara dan video langsung.'),
          },
          {
            id: 'mq',
            label: t('Nomor antrean bank'),
            explainWrong: t('Antrean pesan untuk tugas tertunda, bukan video langsung.'),
          },
        ],
        answer: 'rtc',
        explainCorrect: t('WebRTC menghubungkan audio dan video secara langsung antar pengguna.'),
        tags: ['webrtc'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'b10-anc-p1',
        prompt: t('Tim backend membangun layanan internal berkecepatan tinggi antar server microservice. Pilihan API yang paling efisien adalah…'),
        choices: [
          { id: 'grpc', label: t('gRPC dengan kontrak .proto dan Protobuf biner') },
          { id: 'soap', label: t('SOAP XML dengan banyak pembungkus teks') },
          { id: 'poll', label: t('Polling HTTP/1.1 tanpa cache') },
        ],
        answer: 'grpc',
        explainCorrect: t('gRPC memakai HTTP/2 dan biner Protobuf yang sangat ringkas dan cepat untuk komunikasi internal antar layanan.'),
        tags: ['grpc'],
      }),
      makeAnchorMcq({
        id: 'b10-anc-p2',
        prompt: t('Sebuah aplikasi punya tampilan web, Android, dan jam pintar dengan kebutuhan kolom data berbeda-beda dari banyak relasi. Arsitektur yang mencegah over-fetching dan under-fetching adalah…'),
        choices: [
          { id: 'gql', label: t('GraphQL') },
          { id: 'sse', label: t('SSE (Server-Sent Events)') },
          { id: 'wh', label: t('Webhook') },
        ],
        answer: 'gql',
        explainCorrect: t('GraphQL memungkinkan tiap klien meminta tepat kolom yang dibutuhkan dalam satu query.'),
        tags: ['graphql'],
      }),
      makeAnchorMcq({
        id: 'b10-anc-p3',
        prompt: t('Bila satu tim membangun aplikasi web full-stack menggunakan TypeScript di frontend dan backend sekaligus tanpa ingin menulis file kontrak terpisah, opsi paling praktis adalah…'),
        choices: [
          { id: 'trpc', label: t('tRPC') },
          { id: 'soap', label: t('SOAP') },
          { id: 'mqtt', label: t('MQTT') },
        ],
        answer: 'trpc',
        explainCorrect: t('tRPC berbagi tipe TypeScript langsung antara server dan client tanpa kode tambahan.'),
        tags: ['trpc-soap'],
      }),
      makeAnchorMcq({
        id: 'b10-anc-p4',
        prompt: t('Ketika satu event pesanan.dibayar perlu langsung memicu layanan email, gudang, dan poin secara terpisah tanpa saling mengunci, arsitektur terbaiknya adalah…'),
        choices: [
          { id: 'ps', label: t('Pub/Sub atau Event-Driven Queue') },
          { id: 'rtc', label: t('WebRTC peer-to-peer') },
          { id: 'lp', label: t('Long polling dari browser') },
        ],
        answer: 'ps',
        explainCorrect: t('Pub/Sub menyiarkan event ke banyak subscriber independen secara andal.'),
        tags: ['queue-pubsub'],
      }),
      makeAnchorMcq({
        id: 'b10-anc-p5',
        prompt: t('Prinsip keamanan paling mendasar yang menyatukan seluruh pembelajaran frontend dan API di Jilid 1 dan 2 adalah…'),
        choices: [
          { id: 'srv', label: t('Jangan pernah percaya client; seluruh autentikasi, otorisasi, validasi, dan kunci rahasia wajib ditegakkan di server') },
          { id: 'cors', label: t('Cukup pasang Access-Control-Allow-Origin: * agar semua aman') },
          { id: 'opt', label: t('Pakai Optimistic Update untuk pembayaran agar terlihat cepat') },
        ],
        answer: 'srv',
        explainCorrect: t('Siapa saja dapat memanggil API di luar browser, sehingga server adalah benteng terakhir kebenaran dan keamanan.'),
        tags: ['api', 'bff'],
      }),
      makeAnchorMcq({
        id: 'b10-anc-p6',
        type: 'limit',
        analogy: t('Pohon keputusan sederhana memilih jenis API'),
        prompt: t('Mengapa dalam proyek nyata kamu tetap perlu meninjau keterbatasan tim dan ekosistem meskipun pohon keputusan menunjuk teknologi canggih seperti GraphQL atau gRPC?'),
        choices: [
          { id: 'prag', label: t('Pohon keputusan adalah panduan awal; kebutuhan cache HTTP sederhana, kurva belajar tim, atau kompatibilitas browser sering membuat REST lebih bijak untuk mulai') },
          { id: 'one', label: t('Satu aplikasi dilarang keras memakai lebih dari satu jenis API'), },
          { id: 'ban', label: t('REST tidak bisa berjalan bersama SSE atau Webhook'), },
        ],
        answer: 'prag',
        explainCorrect: t('Bila ragu, mulailah dengan REST, lalu tambahkan SSE, WebSocket, atau Webhook sesuai bagian sistem yang benar-benar membutuhkannya.'),
        tags: ['rest', 'graphql', 'grpc'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'b10-l01',
    worldId: 'b10',
    title: 'Memilih jenis API',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa memilih jenis API yang paling pas untuk aplikasi toko, chat, radio berita, video call, dan bel pembayaran!',
      'Aku bisa menerapkan pohon keputusan arsitektur API (REST, GraphQL, gRPC, tRPC, SSE, WebSocket, WebRTC, Webhook, Pub/Sub) dan merangkum keamanan ujung-ke-ujung.',
    ),
    estMinutes: 6,
    introducesTerms: [],
    usesTerms: [
      'api',
      'rest',
      'graphql',
      'grpc',
      'trpc-soap',
      'polling',
      'sse',
      'websocket',
      'webrtc',
      'webhook',
      'queue-pubsub',
      'bff',
      'openapi',
    ],
    warmupFrom: 'b09-l06',
    steps: [
      storyStep('b10/puncak-api.svg', [
        rText(
          'Selamat tiba di Puncak Petualang! Kamu sudah belajar banyak cara aplikasi berbicara: restoran, kurir, radio, telepon, walkie-talkie, dan bel pintu. Sekarang saatnya memilih alat terbaik untuk tiap misi!',
          'Jilid 1 mengajarkan cara membangun ruang makan yang nyaman; Jilid 2 mengajarkan cara memesan ke dapur dengan tepat. Kamu tidak harus menguasai semua API sekaligus—cukup pakai pohon keputusan sederhana!',
        ),
      ]),
      conceptStep({
        title: t('Pilih REST atau GraphQL', 'Tanya-Jawab: REST, GraphQL, gRPC'),
        visualName: 'RestoranDiagram',
        visualProps: { worldId: 'b10', topic: 'rest-graphql-grpc' },
        alt: t('Pohon keputusan untuk API non-realtime: gRPC antar server, GraphQL multi-tampilan, atau REST sebagai dasar.'),
        body: [
          rText(
            'Kalau tidak perlu kabar langsung, mulai saja dengan ',
            'Jika tidak butuh kabar realtime, pakai ',
          ),
          rTerm('rest', 'REST', 'REST'),
          rText(
            '. Untuk banyak layar berbeda, pilih pelayan pribadi ',
            ' sebagai standar awal, atau ',
          ),
          rTerm('graphql', 'GraphQL', 'GraphQL'),
          rText(
            '.',
            ' bila banyak tampilan butuh kolom data berbeda (sedangkan gRPC dan tRPC unggul antar layanan internal/TS).',
          ),
        ],
      }),
      conceptStep({
        title: t('Pilih Radio SSE atau Telepon WebSocket', 'Realtime: SSE vs WebSocket'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b10', topic: 'sse-vs-websocket' },
        alt: t('SSE satu arah seperti radio; WebSocket dua arah seperti telepon tersambung.'),
        body: [
          rText(
            'Untuk kabar langsung satu arah dari server, pilih radio ',
            'Jika butuh kabar mengalir ke browser: pilih ',
          ),
          rTerm('sse', 'SSE', 'SSE'),
          rText(
            '. Untuk obrolan dua arah seperti chat, pilih telepon ',
            ' bila hanya server yang mengirim (notifikasi, streaming AI), atau ',
          ),
          rTerm('websocket', 'WebSocket', 'WebSocket'),
          rText('.', ' bila pengguna juga aktif mengirim pesan cepat (chat, game, kolaborasi).'),
        ],
      }),
      conceptStep({
        title: t('Pilih Bel Webhook atau Video WebRTC', 'Webhook, Pub/Sub & WebRTC'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b10', topic: 'webhook-pubsub-webrtc' },
        alt: t('Webhook/Pub-Sub untuk event antar server dan WebRTC untuk video call langsung antar pengguna.'),
        body: [
          rText(
            'Untuk kabar antar server saat ada kejadian, pilih bel ',
            'Untuk komunikasi antar server saat ada kejadian, gunakan ',
          ),
          rTerm('webhook', 'Webhook', 'Webhook'),
          rText(
            '. Untuk panggilan video antar teman, pilih walkie-talkie ',
            ' atau Pub/Sub. Untuk suara dan video langsung antar browser, pilih ',
          ),
          rTerm('webrtc', 'WebRTC', 'WebRTC'),
          rText('.', '.'),
        ],
      }),
      conceptStep({
        title: t('Aturan Emas Petualang', 'Jangan Pernah Percaya Client'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b10', topic: 'aturan-emas-keamanan' },
        alt: t('Ringkasan akhir: kuasai REST dan fetch dengan baik, lalu amankan selalu di sisi server.'),
        body: [
          rText(
            'Ingat aturan emas petualang: jangan pernah percaya browser saja. Selalu amankan aturan, sandi, dan izin di server!',
            'Kuasai REST dan fetch lebih dulu, lengkapi dengan BFF serta kontrak OpenAPI, dan ingat selalu: jangan pernah percaya client—amankan validasi serta otorisasi di server.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Pohon keputusan dan lima metafora utama API'),
        same: [
          t('Restoran (REST/API), kurir (request), radio (SSE), telepon (WebSocket), dan bel pintu (Webhook) merangkum pola inti komunikasi.'),
        ],
        different: [
          t('Satu aplikasi nyata sering menggabungkan beberapa jenis API sekaligus—misalnya REST untuk katalog, Webhook untuk bayar lunas, dan SSE untuk notifikasi layar.'),
          t('Kalau masih ragu saat memulai proyek baru, hampir selalu mulailah dari REST terlebih dahulu sebelum menambah alat lain.'),
        ],
      }),
      simStep(
        'puncak-api',
        t(
          'Coba keempat tombol kebutuhan aplikasi di simulator untuk melihat jenis API yang paling direkomendasikan!',
          'Uji pohon keputusan jenis API pada simulator untuk membandingkan kecocokan REST, WebSocket, SSE, dan Webhook.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'b10-l01-q1',
          type: 'analogy',
          prompt: t('Pasangkan lima analogi besar yang tepat untuk mengingatkannya: mana yang ibarat "siaran radio" dan "bel pintu"?'),
          choices: [
            { id: 'ok', label: t('Radio = SSE (server ke browser satu arah), Bel pintu = Webhook (server ke server)') },
            {
              id: 'swap',
              label: t('Radio = REST, Bel pintu = WebRTC'),
              explainWrong: t('REST ibarat loket restoran, dan WebRTC ibarat walkie-talkie video.'),
            },
            {
              id: 'ws',
              label: t('Radio = WebSocket, Bel pintu = Polling'),
              explainWrong: t('WebSocket dua arah seperti telepon; Polling bertanya berulang kali.'),
            },
          ],
          answer: 'ok',
          explainCorrect: t('Sempurna! Mengingat restoran, radio, telepon, walkie-talkie, dan bel pintu membuatmu tak akan tertukar.'),
          tags: ['sse', 'webhook'],
        }),
      ),
      qStep({
        id: 'b10-l01-q2',
        type: 'match',
        prompt: t('Pasangkan jenis aplikasi nyata dengan jenis API paling pas untuknya:'),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('Toko kue online biasa (daftar, keranjang, pesan)') },
          { id: 'l2', label: t('Ruang chat cepat dua arah antar pengguna') },
          { id: 'l3', label: t('Streaming teks jawaban AI satu huruf demi satu huruf') },
          { id: 'l4', label: t('Notifikasi bayar lunas dari bank ke server toko') },
        ],
        right: [
          { id: 'r1', label: t('REST API') },
          { id: 'r2', label: t('WebSocket') },
          { id: 'r3', label: t('SSE (Server-Sent Events)') },
          { id: 'r4', label: t('Webhook') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
        explainCorrect: t('Hebat! Keempat skenario ini adalah pemakaian klasik paling populer di dunia nyata.'),
        tags: ['rest', 'websocket', 'sse', 'webhook'],
      }),
      qStep({
        id: 'b10-l01-q3',
        type: 'sort',
        prompt: t('Kelompokkan kebutuhan komunikasi berikut ke Tanya-Jawab Biasa atau Kabar Langsung (Realtime / Kejadian):'),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('Mengambil profil pengguna saat halaman dibuka (REST)') },
          { id: 'i2', label: t('Obrolan game multipemain seketika (WebSocket)') },
          { id: 'i3', label: t('Meminta daftar produk halaman 2 (REST / GraphQL)') },
          { id: 'i4', label: t('Bel otomatis saat paket dikirim kurir (Webhook)') },
        ],
        bins: [
          { id: 'qa', label: t('Tanya-Jawab Biasa') },
          { id: 'rt', label: t('Kabar Langsung / Kejadian') },
        ],
        answer: { i1: 'qa', i2: 'rt', i3: 'qa', i4: 'rt' },
        explainCorrect: t('Tepat! Membedakan butuh kabar langsung atau tanya-jawab biasa adalah cabang pertama pohon keputusan.'),
        tags: ['rest', 'websocket', 'webhook'],
      }),
      qStep({
        id: 'b10-l01-q4',
        type: 'hotspot',
        difficulty: 1,
        prompt: t('Ketuk pilihan cabang pohon keputusan untuk aplikasi "Panggilan Video & Berbagi Layar Antar Teman"!'),
        image: 'b10-hotspot',
        regions: [
          { id: 'rest', shape: 'rect', coords: [10, 10, 150, 50], label: 'REST (Tanya-jawab standar)' },
          { id: 'sse', shape: 'rect', coords: [170, 10, 150, 50], label: 'SSE (Radio satu arah)' },
          { id: 'webrtc', shape: 'rect', coords: [10, 75, 150, 50], label: 'WebRTC (Video langsung)' },
          { id: 'webhook', shape: 'rect', coords: [170, 75, 150, 50], label: 'Webhook (Bel server)' },
        ],
        answer: 'webrtc',
        explainCorrect: t('Benar! WebRTC adalah standar utama browser untuk suara, video, dan berbagi layar langsung peer-to-peer.'),
        tags: ['webrtc'],
      }),
      qStep(
        makeMcq({
          id: 'b10-l01-q5',
          prompt: t('Kalau kamu sedang membangun website baru dan masih ragu memilih jenis API untuk data utamanya, saran terbaik untuk memulai adalah…'),
          choices: [
            { id: 'rest', label: t('Mulailah dengan REST API karena sederhana dan cocok untuk hampir semua web') },
            {
              id: 'all',
              label: t('Langsung pasang GraphQL, gRPC, WebSocket, dan Kafka di hari pertama'),
              explainWrong: t('Menambah kerumitan tanpa kebutuhan nyata justru memperlambat proyek.'),
            },
            {
              id: 'none',
              label: t('Taruh semua data rahasia di HTML tanpa server'),
              explainWrong: t('Data dan keamanan tetap butuh server API.'),
            },
          ],
          answer: 'rest',
          explainCorrect: t('Tepat! Kuasai REST dan fetch dulu; teknologi lain tinggal ditambahkan saat kasusnya memang butuh.'),
          tags: ['rest'],
        }),
      ),
      qStep(
        makeTf({
          id: 'b10-l01-q6',
          prompt: t('Karena browser sudah menyembunyikan tombol admin atau memeriksa password di frontend, server API tidak perlu mengecek izin lagi.'),
          answer: false,
          explainCorrect: t('Betul, pernyataan itu salah! Aturan emas: jangan pernah percaya client; semua pemeriksaan hak wajib di server.'),
          explainWrong: t('Hampir! Siapa saja bisa memanggil API langsung tanpa lewat browser sehingga server wajib selalu mengecek izin.'),
          tags: ['api', 'bff'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b10-l01-q7',
          type: 'limit',
          analogy: t('Pohon keputusan satu jenis API per proyek'),
          prompt: t('Apakah satu aplikasi besar hanya boleh memilih SATU cabang di pohon keputusan (misal REST saja tanpa boleh memakai Webhook atau SSE)?'),
          choices: [
            { id: 'mix', label: t('Tidak—aplikasi nyata sering memadukan REST untuk data biasa, Webhook untuk pembayaran, dan SSE/WebSocket untuk kabar realtime') },
            {
              id: 'one',
              label: t('Ya, browser akan error jika memakai REST dan SSE bersamaan'),
              explainWrong: t('Browser sangat mendukung pemakaian REST dan SSE/WebSocket bersamaan.'),
            },
            {
              id: 'lock',
              label: t('Ya, server hanya boleh punya satu file endpoint'),
              explainWrong: t('Server bebas memiliki banyak endpoint dengan gaya yang saling melengkapi.'),
            },
          ],
          answer: 'mix',
          explainCorrect: t('Tepat! Pohon keputusan membantu memilih alat per FITUR, bukan mengunci seluruh perusahaan pada satu protokol saja.'),
          tags: ['rest', 'webhook', 'sse', 'websocket'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b10-l01-q8',
          type: 'scenario',
          story: t('Bito dan Rani meluncurkan aplikasi belajar bersama: ada daftar materi pelajaran, ruang diskusi chat langsung antar murid, dan notifikasi otomatis dari server nilai saat ujian selesai.'),
          prompt: t('Kombinasi arsitektur paling masuk akal untuk ketiga fitur tersebut adalah…'),
          difficulty: 3,
          choices: [
            { id: 'combo', label: t('REST untuk daftar materi, WebSocket untuk ruang chat dua arah, dan SSE/Webhook untuk notifikasi selesai') },
            {
              id: 'poll',
              label: t('Polling setiap 0,2 detik untuk semua fitur termasuk chat dan daftar materi'),
              explainWrong: t('Polling super rapat untuk chat sangat boros baterai dan membebani server.'),
            },
            {
              id: 'soap',
              label: t('Hanya memakai SOAP XML di seluruh browser'),
              explainWrong: t('SOAP tidak cocok untuk chat realtime di browser.'),
            },
          ],
          answer: 'combo',
          explainCorrect: t('Luar biasa! Itu cara berpikir arsitek web sejati: memilih alat tepat untuk setiap bagian sistem.'),
          tags: ['rest', 'websocket', 'sse', 'webhook'],
        }),
      ),
      qStep({
        id: 'b10-l01-q9',
        type: 'order',
        modes: ['pro'],
        prompt: t('Urutkan rencana latihan 6 minggu penguasaan API dari fondasi dasar hingga keamanan produksi:'),
        difficulty: 2,
        items: [
          { id: 'w3', label: t('Login token & auth + fitur realtime SSE/WebSocket') },
          { id: 'w1', label: t('HTTP, JSON, dan uji Postman/REST dasar') },
          { id: 'w4', label: t('BFF menyembunyikan API key dan dokumentasi OpenAPI') },
          { id: 'w2', label: t('Fetch di frontend (4 state, debounce, pagination) & GraphQL') },
        ],
        answer: ['w1', 'w2', 'w3', 'w4'],
        explainCorrect: t('Mantap! Peta latihan bertahap ini memastikan fondasi HTTP dan REST kuat sebelum melangkah ke realtime dan BFF.'),
        tags: ['rest', 'graphql', 'bff', 'openapi'],
      }),
      qStep(
        makeMcq({
          id: 'b10-l01-q10',
          type: 'why',
          modes: ['pro'],
          base: 'Layanan internal pemroses gambar antar microservice memilih gRPC daripada REST JSON.',
          prompt: t('Mengapa gRPC lebih unggul untuk komunikasi server-ke-server internal bervolume tinggi?'),
          choices: [
            { id: 'bin', label: t('Karena memakai format biner Protobuf yang sangat ringkas dan HTTP/2 streaming berkecepatan tinggi') },
            {
              id: 'html',
              label: t('Karena gRPC langsung menggambar HTML di browser tanpa CSS'),
              explainWrong: t('gRPC justru kurang cocok dipanggil langsung dari browser tanpa proxy.'),
            },
            {
              id: 'soap',
              label: t('Karena memakai tag XML panjang yang bisa dibaca manual'),
              explainWrong: t('Tag XML panjang itu ciri SOAP, bukan Protobuf gRPC.'),
            },
          ],
          answer: 'bin',
          explainCorrect: t('Benar! Protobuf jauh lebih kecil dan cepat di-parse antar server dibandingkan teks JSON.'),
          tags: ['grpc'],
        }),
      ),
      qStep({
        id: 'b10-l01-q11',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi pasangan standar API dan jenis kebutuhannya dari tabel rangkuman:'),
        template: 'Sistem perbankan lama biasanya memakai ___ (XML), sementara aplikasi IoT sensor suhu hemat kuota memakai ___.',
        bank: ['SOAP', 'MQTT', 'GraphQL', 'WebRTC'],
        answer: ['SOAP', 'MQTT'],
        explainCorrect: t('Tepat! SOAP XML masih banyak di sistem perbankan/pemerintahan lama, sedangkan MQTT populer untuk perangkat IoT.'),
        tags: ['trpc-soap', 'queue-pubsub'],
      }),
      qStep({
        id: 'b10-l01-q12',
        type: 'type',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Tulis singkatan arsitektur server perantara milikmu sendiri untuk menyembunyikan API key rahasia dari browser (3 huruf):'),
        accept: ['BFF', 'bff'],
        explainCorrect: t('Tepat! BFF (Backend for Frontend) adalah perisai wajib di frontend untuk menyimpan kunci rahasia dan merapikan komunikasi API.'),
        tags: ['bff'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b10-l01-r1',
        prompt: t('Kalau kamu ragu memilih jenis API saat memulai proyek aplikasi web standar, apa pilihan paling aman untuk dimulai?'),
        choices: [
          { id: 'rest', label: t('REST API') },
          { id: 'soap', label: t('SOAP XML'), explainWrong: t('SOAP lebih umum di sistem warisan bank/pemerintah.') },
        ],
        answer: 'rest',
        explainCorrect: t('REST sederhana, memanfaatkan method dan status HTTP, dan didukung di mana-mana.'),
        tags: ['rest'],
      }),
      makeMcq({
        id: 'b10-l01-r2',
        prompt: t('Mana pasangan yang TEPAT antara metafora dan teknologinya?'),
        choices: [
          { id: 'ok', label: t('Radio = SSE, Telepon = WebSocket, Bel pintu = Webhook') },
          { id: 'no', label: t('Radio = REST, Telepon = Webhook, Bel pintu = SSE'), explainWrong: t('Ingat arahnya: radio satu arah (SSE), telepon dua arah (WebSocket), bel pintu antar server (Webhook).') },
        ],
        answer: 'ok',
        explainCorrect: t('Lima metafora—restoran, kurir, radio, telepon, dan bel pintu—akan selalu membantumu memilih API yang tepat.'),
        tags: ['sse', 'websocket', 'webhook'],
      }),
      makeTf({
        id: 'b10-l01-r3',
        prompt: t('Aturan emas terakhir: jangan pernah percaya client; amankan autentikasi, otorisasi, dan validasi di server.'),
        answer: true,
        explainCorrect: t('Betul! Itulah fondasi paling penting dari seluruh petualangan web dan API.'),
        explainWrong: t('Seluruh pemeriksaan keamanan sejati selalu berada di sisi server.'),
        tags: ['api', 'bff'],
      }),
    ],
    recap: t(
      'Mulailah dengan REST, pakai SSE untuk siaran, WebSocket untuk chat, Webhook untuk bel server, dan selalu amankan di server!',
      'Pilih API sesuai kebutuhan: REST sebagai dasar, GraphQL/gRPC/tRPC untuk efisiensi data, SSE/WebSocket/WebRTC/Webhook untuk realtime/kejadian, dan selalu amankan di server.',
    ),
    companion: {
      talkPrompts: [
        'Dari semua perumpamaan di Jalur A & B (restoran, kurir, radio, telepon, bel pintu, kunci valet), mana yang paling kamu ingat?',
        'Kalau kita membuat aplikasi impian bersama, fitur mana yang butuh REST, mana yang butuh chat WebSocket, dan mana yang butuh bel Webhook?',
      ],
      offlineActivity:
        'Gambar peta mini "Kerajaan Petualang Web" berisi semua tempat yang sudah ditaklukkan: Restoran UI/UX, Gudang JSON, Menara Radio SSE, Gerbang Login JWT, dan Puncak Petualang!',
    },
  }),
];
