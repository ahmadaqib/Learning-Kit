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
import { contractWorkflow } from './workshop-kontrak';
import { twoTeamsOneContract } from './workshop-dua-tim';

export const world: World = {
  id: 'b10',
  track: 'B',
  order: 10,
  title: 'Puncak Petualang',
  tagline: t(
    'Pilih alat yang paling cocok untuk tiap tantangan. Kamu sudah sampai di puncak!',
    'Kamu bisa memilih cara komunikasi yang paling cocok untuk satu kasus kerja.',
  ),
  color: '#1F2340',
  illustration: 'b10-puncak-petualang',
  sourceChapters: ['J2-16'],
  requires: ['b09'],
  lessons: ['b10-l01'],
  sideQuests: [contractWorkflow.id, twoTeamsOneContract.id],
  boss: {
    title: 'Tantangan Penjaga Puncak Petualang',
    greeting: t(
      'Selamat datang di puncak! Pilih jenis API yang pas untuk setiap misi.',
      'Di ujian akhir ini, kamu memilih jenis API yang paling cocok untuk tiap kasus kerja.',
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
        prompt: t('Kamu membuat toko web biasa. Jenis API apa yang cocok untuk mulai?'),
        choices: [
          { id: 'rest', label: t('REST, seperti pelayan restoran') },
          {
            id: 'webrtc',
            label: t('WebRTC, seperti walkie-talkie langsung'),
            explainWrong: t('WebRTC dipakai untuk suara dan video langsung. Toko biasa tidak butuh itu.'),
          },
          {
            id: 'poll',
            label: t('Polling, bertanya berulang tiap detik'),
            explainWrong: t('Polling bertanya terus, padahal toko tidak butuh kabar langsung. Itu boros kuota.'),
          },
        ],
        answer: 'rest',
        explainCorrect: t(
          'REST sederhana dan cocok untuk kebanyakan situs. Seperti pelayan yang mencatat pesanan satu per satu.',
          'REST sederhana dan cocok untuk kebanyakan situs. Seperti pelayan restoran yang melayani pesanan satu per satu.',
        ),
        tags: ['rest'],
      }),
      makeAnchorMcq({
        id: 'b10-anc-j2',
        prompt: t('Skor pertandingan terus muncul di layarmu. Apa yang cocok?'),
        choices: [
          { id: 'sse', label: t('SSE, seperti siaran radio') },
          {
            id: 'wh',
            label: t('Webhook, seperti bel pintu'),
            explainWrong: t('Webhook memencet bel server lain. Layarmu tidak ikut mendengar bel itu.'),
          },
          {
            id: 'rest',
            label: t('REST, seperti pelayan restoran'),
            explainWrong: t('Pelayan hanya datang saat kamu memanggil. Skor harus muncul tanpa diminta.'),
          },
        ],
        answer: 'sse',
        explainCorrect: t(
          'Skor mengalir satu arah dari server ke layarmu. Seperti radio yang terus bersuara.',
          'SSE mengalirkan skor satu arah dari server ke client, seperti siaran radio yang terus bersuara.',
        ),
        tags: ['sse'],
      }),
      makeAnchorMcq({
        id: 'b10-anc-j3',
        prompt: t('Kamu dan teman bermain game sambil chat. Apa yang cocok?'),
        choices: [
          { id: 'ws', label: t('WebSocket, seperti telepon tersambung') },
          {
            id: 'sse',
            label: t('SSE, seperti siaran radio'),
            explainWrong: t('SSE hanya satu arah. Seperti radio yang tidak bisa dijawab.'),
          },
          {
            id: 'css',
            label: t('Polling, bertanya berulang tiap detik'),
            explainWrong: t('Polling bertanya berulang, jadi kabar terlambat. Chat butuh sambungan terbuka.'),
          },
        ],
        answer: 'ws',
        explainCorrect: t('WebSocket menjaga jalur dua arah tetap terbuka. Seperti telepon yang belum ditutup.'),
        tags: ['websocket'],
      }),
      makeAnchorMcq({
        id: 'b10-anc-j4',
        prompt: t(
          'Bank ingin memberi tahu toko bahwa uang sudah masuk. Cara apa yang cocok?',
          'Bank ingin memberi tahu server toko bahwa pembayaran sudah masuk. Cara apa yang cocok?',
        ),
        choices: [
          { id: 'wh', label: t('Webhook, seperti bel pintu') },
          {
            id: 'rtc',
            label: t('WebRTC, seperti walkie-talkie langsung'),
            explainWrong: t('WebRTC dipakai untuk panggilan video. Bank dan toko tidak perlu saling melihat.'),
          },
          {
            id: 'gql',
            label: t('GraphQL, seperti pelayan pribadi'),
            explainWrong: t('Pelayan pribadi membawakan data yang kamu minta. Ia tidak berbunyi sendiri.'),
          },
        ],
        answer: 'wh',
        explainCorrect: t(
          'Bank memencet bel toko saat uang masuk. Seperti bel pintu yang berbunyi sendiri.',
          'Webhook mengabari server toko saat pembayaran masuk, seperti bel pintu yang berbunyi sendiri.',
        ),
        tags: ['webhook'],
      }),
      makeAnchorMcq({
        id: 'b10-anc-j5',
        prompt: t('Dua teman ingin video call langsung. Apa yang cocok?'),
        choices: [
          { id: 'rtc', label: t('WebRTC, seperti walkie-talkie langsung') },
          {
            id: 'rest',
            label: t('REST, seperti pelayan restoran'),
            explainWrong: t('REST cocok untuk tanya-jawab biasa. Video butuh jalur yang terus mengalir.'),
          },
          {
            id: 'mq',
            label: t('Antrean pesan, seperti nomor antrean'),
            explainWrong: t('Antrean pesan mengatur tugas yang menunggu giliran. Ia bukan untuk video langsung.'),
          },
        ],
        answer: 'rtc',
        explainCorrect: t('WebRTC menyambung dua teman secara langsung. Seperti walkie-talkie tanpa lewat orang lain.'),
        tags: ['webrtc'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'b10-anc-p1',
        prompt: t('Dua layanan internal saling memanggil 5.000 kali per detik. Jenis API mana yang pesannya paling kecil dan cepat diproses?'),
        choices: [
          { id: 'grpc', label: t('gRPC dengan Protobuf') },
          {
            id: 'soap',
            label: t('SOAP dengan XML'),
            explainWrong: t('SOAP membungkus pesan dalam XML yang besar. Ia cocok untuk sistem lama, bukan untuk layanan cepat.'),
          },
          {
            id: 'json',
            label: t('REST dengan JSON'),
            explainWrong: t('JSON berbentuk teks, jadi pesannya lebih besar dan lebih lambat diurai. Pada 5.000 panggilan per detik, selisihnya terasa.'),
          },
        ],
        answer: 'grpc',
        explainCorrect: t('gRPC mengirim pesan biner lewat HTTP/2, jadi pesannya kecil dan cepat diproses antar server.'),
        tags: ['grpc'],
      }),
      makeAnchorMcq({
        id: 'b10-anc-p2',
        prompt: t('Tampilan web, Android, dan jam pintar butuh kolom data yang berbeda-beda. Pendekatan mana yang mencegah data berlebih atau kurang (over-fetching dan under-fetching)?'),
        choices: [
          { id: 'gql', label: t('GraphQL') },
          {
            id: 'sse',
            label: t('SSE'),
            explainWrong: t('SSE mengalirkan kabar satu arah dari server. Ia tidak menyesuaikan kolom data untuk tiap tampilan.'),
          },
          {
            id: 'wh',
            label: t('Webhook'),
            explainWrong: t('Webhook mengabari server lain saat ada kejadian. Ia bukan cara tampilan meminta data.'),
          },
        ],
        answer: 'gql',
        explainCorrect: t('Di GraphQL, tiap tampilan bisa meminta tepat kolom yang dibutuhkan dalam satu query.'),
        tags: ['graphql'],
      }),
      makeAnchorMcq({
        id: 'b10-anc-p3',
        prompt: t('Satu tim memakai TypeScript di frontend dan backend, tanpa file kontrak terpisah. Apa pilihan yang paling praktis?'),
        choices: [
          { id: 'trpc', label: t('tRPC') },
          {
            id: 'soap',
            label: t('SOAP'),
            explainWrong: t('SOAP memakai kontrak XML yang ditulis terpisah. Itu justru yang ingin dihindari tim.'),
          },
          {
            id: 'mqtt',
            label: t('MQTT'),
            explainWrong: t('MQTT mengirim pesan ringan untuk perangkat sensor. Ia bukan pengganti kontrak tipe.'),
          },
        ],
        answer: 'trpc',
        explainCorrect: t('tRPC berbagi tipe TypeScript langsung antara server dan client, jadi tidak perlu file kontrak.'),
        tags: ['trpc-soap'],
      }),
      makeAnchorMcq({
        id: 'b10-anc-p4',
        prompt: t('Satu pesanan yang dibayar harus mengabari layanan email, gudang, dan poin tanpa saling menunggu. Pola mana yang cocok?'),
        choices: [
          { id: 'ps', label: t('Pub/Sub atau antrean event') },
          {
            id: 'rtc',
            label: t('WebRTC peer-to-peer'),
            explainWrong: t('WebRTC menyambung dua browser secara langsung. Ia bukan untuk mengabari banyak layanan.'),
          },
          {
            id: 'lp',
            label: t('Long polling dari browser'),
            explainWrong: t('Long polling menghubungkan satu peminta dengan satu sumber. Satu event untuk banyak layanan lebih cocok lewat Pub/Sub.'),
          },
        ],
        answer: 'ps',
        explainCorrect: t('Pub/Sub menyiarkan satu event ke banyak pelanggan (subscriber) yang bekerja sendiri-sendiri.'),
        tags: ['queue-pubsub'],
      }),
      makeAnchorMcq({
        id: 'b10-anc-p5',
        prompt: t('Apa prinsip keamanan yang menyatukan semua pelajaran frontend dan API?'),
        choices: [
          { id: 'srv', label: t('Server memeriksa ulang login, izin, dan data di setiap request') },
          {
            id: 'cors',
            label: t('Batasi CORS hanya ke domain milik sendiri'),
            explainWrong: t('CORS hanya mengatur pembacaan di browser. Panggilan langsung ke API tetap bisa lolos.'),
          },
          {
            id: 'enc',
            label: t('Enkripsi semua data di frontend sebelum dikirim ke server'),
            explainWrong: t('Kunci enkripsi di frontend bisa dibaca siapa saja. Server tetap harus memeriksa data yang masuk.'),
          },
        ],
        answer: 'srv',
        explainCorrect: t('Siapa saja bisa memanggil API di luar browser. Karena itu server adalah penjaga terakhir.'),
        tags: ['api', 'bff'],
      }),
      makeAnchorMcq({
        id: 'b10-anc-p6',
        type: 'limit',
        analogy: t('Pohon keputusan sederhana memilih jenis API'),
        prompt: t('Pohon keputusan menunjuk GraphQL. Mengapa tim tetap perlu menimbang REST?'),
        choices: [
          { id: 'prag', label: t('Cache dan kemampuan tim sering membuat REST lebih mudah') },
          {
            id: 'one',
            label: t('Satu aplikasi hanya boleh memakai satu jenis API'),
            explainWrong: t('Aplikasi besar biasanya memadukan beberapa jenis API. Tiap fitur memilih yang paling cocok.'),
          },
          {
            id: 'ban',
            label: t('REST tidak bisa berjalan bersama SSE atau Webhook'),
            explainWrong: t('REST dan SSE bisa hidup di aplikasi yang sama. Tiap jenis mengurus fitur berbeda.'),
          },
        ],
        answer: 'prag',
        explainCorrect: t('Bila ragu, mulailah dengan REST. Tambahkan alat lain hanya di fitur yang membutuhkannya.'),
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
      'Aku bisa memilih jenis API yang cocok untuk tiap aplikasi.',
      'Kamu bisa memilih jenis API yang cocok untuk satu kasus, dari REST sampai Webhook.',
    ),
    atWork: 'Kamu akan memakai pohon keputusan ini di rapat tim saat memilih cara fitur chat atau notifikasi bayar mengirim data.',
    estMinutes: 7,
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
          'Kamu sudah sampai di puncak! Restoran, radio, telepon, dan bel pintu sudah kamu kenal. Alat mana yang cocok untuk tiap misi?',
          'Tim kamu membangun aplikasi dengan katalog, chat, dan notifikasi bayar. Jenis API apa yang cocok untuk masing-masing?',
        ),
      ]),
      conceptStep({
        title: t('REST atau pelayan pribadi', 'REST, GraphQL, atau gRPC'),
        visualName: 'RestoranDiagram',
        visualProps: { worldId: 'b10', topic: 'rest-graphql-grpc' },
        alt: t(
          'Pohon keputusan: REST untuk mulai, GraphQL untuk banyak layar berbeda.',
          'Pohon keputusan tiga cabang: REST sebagai dasar, GraphQL untuk banyak tampilan, gRPC antar layanan.',
        ),
        body: [
          rTerm('rest', 'REST', 'REST'),
          rText(
            ' itu pelayan restoran. Mulailah dari sini kalau tidak butuh kabar langsung. Untuk banyak layar berbeda, pilih ',
            ' cocok sebagai pilihan awal kalau tidak butuh kabar langsung. Pakai ',
          ),
          rTerm('graphql', 'GraphQL', 'GraphQL'),
          rText(
            ' si pelayan pribadi.',
            ' kalau tiap tampilan butuh kolom data berbeda. gRPC dan tRPC cocok untuk komunikasi antar layanan internal.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b10-l01-q5',
          prompt: t(
            'Kamu membuat situs baru dan ragu memilih jenis API. Apa langkah awalnya?',
            'Kamu membangun situs web baru dan ragu memilih jenis API untuk data utama. Apa langkah awal yang paling aman?',
          ),
          choices: [
            { id: 'rest', label: t('Mulai dengan REST lebih dulu') },
            {
              id: 'all',
              label: t('Pasang banyak jenis API di hari pertama', 'Pasang GraphQL, gRPC, dan WebSocket sekaligus di hari pertama'),
              explainWrong: t(
                'Terlalu banyak alat membuat proyek rumit. Mulailah dari yang sederhana.',
                'Alat yang belum dibutuhkan hanya menambah kerumitan dan memperlambat proyek.',
              ),
            },
            {
              id: 'none',
              label: t('Pilih jenis API yang sedang ramai dipakai', 'Pilih jenis API yang sedang tren'),
              explainWrong: t(
                'Alat yang ramai belum tentu cocok untukmu. Pilih sesuai kebutuhan.',
                'Tren tidak menjawab kebutuhan fitur. Pilihan awal perlu sederhana dan didukung luas.',
              ),
            },
          ],
          answer: 'rest',
          explainCorrect: t(
            'REST sederhana dan cocok untuk kebanyakan situs. Tambahkan alat lain saat kamu butuh.',
            'REST sederhana dan didukung luas. Tambahkan alat lain saat sebuah fitur memang membutuhkannya.',
          ),
          hints: [t('Apakah situs baru butuh banyak alat sekaligus?', 'Ingat apa yang dikatakan kartu pertama.')],
          tags: ['rest'],
        }),
      ),
      conceptStep({
        title: t('Radio atau telepon', 'Realtime: SSE atau WebSocket'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b10', topic: 'sse-vs-websocket' },
        alt: t(
          'Radio menyiarkan satu arah. Telepon tersambung dua arah.',
          'SSE mengalir satu arah. WebSocket berjalan dua arah.',
        ),
        body: [
          rTerm('sse', 'SSE', 'SSE'),
          rText(
            ' itu siaran radio. Kabar mengalir satu arah dari server ke layarmu. ',
            ' dipakai kalau hanya server yang mengirim kabar, seperti notifikasi atau jawaban AI yang mengalir. ',
          ),
          rTerm('websocket', 'WebSocket', 'WebSocket'),
          rText(
            ' itu telepon tersambung, untuk chat dua arah.',
            ' dipakai kalau orang yang memakai juga mengirim pesan cepat, seperti chat atau game.',
          ),
        ],
      }),
      conceptStep({
        title: t('Bel pintu atau walkie-talkie', 'Webhook, Pub/Sub, dan WebRTC'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b10', topic: 'webhook-pubsub-webrtc' },
        alt: t(
          'Bel pintu untuk kabar antar server. Walkie-talkie menyambung dua teman secara langsung.',
          'Webhook dan Pub/Sub untuk kabar antar layanan. WebRTC untuk video langsung antar browser.',
        ),
        body: [
          rTerm('webhook', 'Webhook', 'Webhook'),
          rText(
            ' itu bel pintu yang berbunyi saat bayar lunas. ',
            ' memberi kabar antar server saat ada kejadian, misalnya pembayaran lunas. Pub/Sub menyiarkan satu kejadian ke banyak layanan. ',
          ),
          rTerm('webrtc', 'WebRTC', 'WebRTC'),
          rText(
            ' itu walkie-talkie. Dua teman tersambung langsung untuk panggilan video.',
            ' menyambung suara dan video langsung antar browser.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b10-l01-q1',
          type: 'analogy',
          prompt: t(
            'Pasangan mana yang benar untuk siaran radio dan bel pintu?',
            'Mana pasangan perumpamaan dan teknologi yang tepat untuk radio dan bel pintu?',
          ),
          choices: [
            { id: 'ok', label: t('Radio itu SSE, bel pintu itu Webhook') },
            {
              id: 'swap',
              label: t('Radio itu REST, bel pintu itu WebRTC'),
              explainWrong: t(
                'REST itu pelayan restoran. WebRTC itu walkie-talkie langsung.',
                'REST seperti pelayan restoran dan WebRTC seperti walkie-talkie langsung.',
              ),
            },
            {
              id: 'ws',
              label: t('Radio itu WebSocket, bel pintu itu Polling'),
              explainWrong: t(
                'WebSocket itu telepon dua arah. Polling itu bertanya berulang kali.',
                'WebSocket berjalan dua arah seperti telepon. Polling bertanya berulang kali.',
              ),
            },
          ],
          answer: 'ok',
          explainCorrect: t(
            'Radio menyiarkan satu arah, seperti SSE. Bel pintu berbunyi saat ada tamu, seperti Webhook.',
            'SSE mengalir satu arah, seperti siaran radio. Webhook mengabari server lain, seperti bel pintu.',
          ),
          hints: [
            t(
              'Radio terus bicara sendiri. Bel hanya berbunyi saat ada tamu.',
              'Radio mengalir satu arah. Bel pintu mengabari saat ada kejadian.',
            ),
          ],
          tags: ['sse', 'webhook'],
        }),
      ),
      conceptStep({
        title: t('Aturan emas petualang', 'Jangan percaya client'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b10', topic: 'aturan-emas-keamanan' },
        alt: t(
          'Ringkasan akhir: server selalu memeriksa sandi dan izin.',
          'Ringkasan akhir: kuasai REST dan fetch, lalu amankan semuanya di server.',
        ),
        body: [
          rText(
            'Aturan emas: jangan percaya aplikasi di HP saja. Server harus memeriksa sandi dan izin lagi. Seperti penjaga gerbang yang memeriksa setiap tamu.',
            'Jangan percaya client: siapa saja bisa memanggil API tanpa lewat browser. Jadi server harus memeriksa login, izin, dan data yang masuk. Kuasai REST dan fetch dulu. Lalu tambahkan BFF untuk menyimpan kunci rahasia. Tambahkan juga OpenAPI untuk mendokumentasikan API.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Restoran, radio, telepon, dan bel pintu', 'Pohon keputusan dan lima perumpamaan API'),
        same: [
          t(
            'Tiap perumpamaan cocok untuk satu jenis API.',
            'Restoran, kurir, radio, telepon, dan bel pintu menggambarkan pola inti tiap jenis API.',
          ),
        ],
        different: [
          t(
            'Satu aplikasi bisa memakai beberapa jenis API sekaligus.',
            'Satu aplikasi sering memadukan REST untuk katalog dan Webhook untuk pembayaran lunas.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'puncak-api',
        t(
          'Ketuk 4 tombol kebutuhan, lalu lihat jenis API yang cocok.',
          'Ketuk tiap kebutuhan dan bandingkan jenis API yang direkomendasikan simulator.',
        ),
      ),
      qStep({
        id: 'b10-l01-q2',
        type: 'match',
        prompt: t(
          'Pasangkan tiap aplikasi dengan jenis API yang cocok.',
          'Pasangkan kasus kerja dengan jenis API yang paling cocok.',
        ),
        difficulty: 2,
        left: [
          { id: 'l1', label: t('Toko kue yang menerima pesanan', 'Toko kue online (daftar, keranjang, pesan)') },
          { id: 'l2', label: t('Ruang chat dua arah', 'Ruang chat dua arah antar murid') },
          { id: 'l3', label: t('Jawaban AI muncul huruf demi huruf', 'Teks jawaban AI mengalir huruf demi huruf') },
          { id: 'l4', label: t('Kabar bayar lunas dari bank', 'Notifikasi bayar lunas dari bank ke server toko') },
        ],
        right: [
          { id: 'r1', label: t('REST, pelayan restoran', 'REST API') },
          { id: 'r2', label: t('WebSocket, telepon tersambung', 'WebSocket') },
          { id: 'r3', label: t('SSE, siaran radio', 'SSE') },
          { id: 'r4', label: t('Webhook, bel pintu', 'Webhook') },
        ],
        answer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
        explainCorrect: t(
          'Pesanan lewat pelayan, dan chat lewat telepon. Jawaban AI mengalir seperti radio, dan kabar bayar memencet bel.',
          'Katalog cukup dengan REST, dan chat butuh WebSocket. Teks AI mengalir lewat SSE, dan notifikasi bayar lewat Webhook.',
        ),
        hints: [
          t(
            'Ingat pelayan, telepon, radio, dan bel pintu.',
            'Tanyakan: apakah kabar harus langsung, dua arah, atau hanya saat ada kejadian?',
          ),
          undefined,
        ],
        tags: ['rest', 'websocket', 'sse', 'webhook'],
      }),
      qStep({
        id: 'b10-l01-q3',
        type: 'sort',
        modes: ['pro'],
        prompt: t('Kelompokkan kebutuhan ini ke tanya-jawab biasa atau kabar langsung.'),
        difficulty: 2,
        items: [
          { id: 'i1', label: t('Mengambil profil saat halaman dibuka (REST)') },
          { id: 'i2', label: t('Obrolan game multipemain seketika (WebSocket)') },
          { id: 'i3', label: t('Meminta daftar produk halaman 2 (REST atau GraphQL)') },
          { id: 'i4', label: t('Bel otomatis saat paket dikirim kurir (Webhook)') },
        ],
        bins: [
          { id: 'qa', label: t('Tanya-jawab biasa') },
          { id: 'rt', label: t('Kabar langsung atau kejadian') },
        ],
        answer: { i1: 'qa', i2: 'rt', i3: 'qa', i4: 'rt' },
        explainCorrect: t(
          'Tanya-jawab biasa cukup dengan REST. Kabar langsung butuh jalur yang terus terbuka atau dikirim saat ada kejadian.',
        ),
        hints: [t('Tanyakan: apakah kabar harus tiba tanpa diminta?'), undefined],
        tags: ['rest', 'websocket', 'webhook'],
      }),
      qStep({
        id: 'b10-l01-q4',
        type: 'hotspot',
        modes: ['pro'],
        difficulty: 1,
        prompt: t('Ketuk cabang pohon keputusan untuk aplikasi panggilan video dan berbagi layar antar teman.'),
        image: 'b10-hotspot',
        regions: [
          { id: 'rest', shape: 'rect', coords: [10, 10, 150, 50], label: 'REST (Tanya-jawab standar)' },
          { id: 'sse', shape: 'rect', coords: [170, 10, 150, 50], label: 'SSE (Radio satu arah)' },
          { id: 'webrtc', shape: 'rect', coords: [10, 75, 150, 50], label: 'WebRTC (Video langsung)' },
          { id: 'webhook', shape: 'rect', coords: [170, 75, 150, 50], label: 'Webhook (Bel server)' },
        ],
        answer: 'webrtc',
        explainCorrect: t(
          'WebRTC adalah standar browser untuk suara, video, dan berbagi layar langsung. Datanya mengalir antar dua perangkat (peer-to-peer).',
        ),
        explainIncorrect: {
          rest: t('REST melayani tanya-jawab biasa. Ia tidak menyambung video langsung.'),
          sse: t('SSE hanya mengalir satu arah dari server. Panggilan video butuh dua arah.'),
          webhook: t('Webhook mengabari server saat ada kejadian. Ia tidak membawa suara dan video.'),
        },
        hints: [t('Siapa yang bicara langsung dengan siapa?'), undefined],
        tags: ['webrtc'],
      }),
      qStep(
        makeTf({
          id: 'b10-l01-q6',
          prompt: t(
            'Aplikasi di HP sudah memeriksa sandi. Server tidak perlu memeriksa lagi.',
            'Frontend sudah menyembunyikan tombol admin, jadi server tidak perlu memeriksa izin lagi.',
          ),
          answer: false,
          difficulty: 2,
          explainCorrect: t(
            'Pernyataan itu keliru. Orang jahil bisa mengirim pesan ke server tanpa lewat aplikasimu.',
            'Pernyataan itu keliru. Siapa saja bisa memanggil API langsung, tanpa lewat browser.',
          ),
          explainWrong: t(
            'Server adalah penjaga gerbang terakhir. Ia tetap memeriksa, walau aplikasi sudah memeriksa.',
            'Server wajib mengecek izin sendiri. Tombol yang tersembunyi tidak menghentikan panggilan langsung ke API.',
          ),
          hints: [t('Ingat penjaga gerbang yang memeriksa setiap tamu.', 'Tanyakan: bisakah orang memanggil API tanpa browser?')],
          tags: ['api', 'bff'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b10-l01-q7',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Pohon keputusan satu jenis API per proyek'),
          prompt: t('Apakah satu aplikasi besar hanya boleh memilih satu cabang pohon keputusan?'),
          choices: [
            { id: 'mix', label: t('Tidak, satu aplikasi bisa memadukan beberapa jenis API') },
            {
              id: 'one',
              label: t('Ya, browser error kalau REST dan SSE dipakai bersamaan'),
              explainWrong: t('Browser mendukung REST dan SSE yang berjalan bersamaan.'),
            },
            {
              id: 'lock',
              label: t('Ya, server hanya boleh punya satu jenis endpoint'),
              explainWrong: t('Server boleh punya banyak endpoint dengan gaya yang saling melengkapi.'),
            },
          ],
          answer: 'mix',
          explainCorrect: t(
            'Pohon keputusan membantu memilih alat per fitur. Satu aplikasi tidak perlu terkunci pada satu jenis API.',
          ),
          hints: [t('Ingat contoh toko: katalog, bayar, dan notifikasi.')],
          tags: ['rest', 'webhook', 'sse', 'websocket'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b10-l01-q8',
          type: 'scenario',
          story: t(
            'Bito dan Rani membuat aplikasi belajar. Isinya daftar pelajaran dan chat antar murid. Nilai baru juga muncul langsung di layar.',
            'Bito dan Rani membuat aplikasi belajar dengan daftar materi, chat langsung antar murid, dan notifikasi otomatis saat ujian selesai.',
          ),
          prompt: t('Jenis API apa yang cocok untuk tiap fitur?', 'Kombinasi API mana yang paling masuk akal untuk ketiga fitur itu?'),
          difficulty: 3,
          choices: [
            {
              id: 'combo',
              label: t(
                'Daftar: pelayan. Chat: telepon. Nilai: radio.',
                'REST untuk daftar, WebSocket untuk chat, SSE untuk notifikasi',
              ),
            },
            {
              id: 'poll',
              label: t('Polling cepat untuk ketiga fitur sekaligus', 'Polling tiap 0,2 detik untuk ketiga fitur sekaligus'),
              explainWrong: t(
                'Bertanya terus-menerus itu boros baterai. Chat butuh telepon tersambung.',
                'Polling yang sangat rapat memboroskan baterai dan membebani server saat dipakai untuk chat.',
              ),
            },
            {
              id: 'soap',
              label: t('Daftar: radio. Chat: pelayan. Nilai: telepon.', 'SOAP XML untuk ketiga fitur sekaligus di browser'),
              explainWrong: t(
                'Radio hanya menyiarkan, jadi tidak bisa mengambil daftar. Chat butuh telepon dua arah.',
                'SOAP dibuat untuk sistem lama, bukan untuk chat realtime di browser.',
              ),
            },
          ],
          answer: 'combo',
          explainCorrect: t(
            'Daftar butuh pelayan, dan chat butuh telepon. Nilai mengalir satu arah ke layarmu, seperti radio.',
            'Daftar materi cukup dengan REST, chat butuh WebSocket, dan notifikasi cukup SSE. Satu jenis API untuk semuanya jarang cocok.',
          ),
          hints: [t('Ingat: tiap alat punya tugasnya sendiri.', 'Cocokkan tiap fitur dengan arah dan kecepatan kabarnya.')],
          tags: ['rest', 'websocket', 'sse', 'webhook'],
        }),
      ),
      qStep({
        id: 'b10-l01-q9',
        type: 'order',
        modes: ['pro'],
        prompt: t('Urutkan rencana 6 minggu belajar API, dari dasar sampai keamanan.'),
        difficulty: 2,
        items: [
          { id: 'w3', label: t('Login dengan token, lalu fitur realtime SSE dan WebSocket') },
          { id: 'w1', label: t('HTTP, JSON, dan uji REST dengan Postman') },
          { id: 'w4', label: t('BFF untuk menyembunyikan API key, dan dokumentasi OpenAPI') },
          { id: 'w2', label: t('Fetch di frontend (4 state, debounce, pagination) dan GraphQL') },
        ],
        answer: ['w1', 'w2', 'w3', 'w4'],
        explainCorrect: t(
          'Dasar HTTP dan REST datang lebih dulu. Realtime dan BFF dibangun di atas dasar itu.',
        ),
        hints: [t('Mulai dari dasar HTTP. Tiap minggu memakai hasil minggu sebelumnya.'), undefined],
        tags: ['rest', 'graphql', 'bff', 'openapi'],
      }),
      qStep(
        makeMcq({
          id: 'b10-l01-q10',
          type: 'why',
          modes: ['pro'],
          base: 'Dua layanan internal pemroses gambar memilih gRPC, bukan REST dengan JSON.',
          prompt: t('Mengapa gRPC lebih cocok untuk komunikasi antar server dengan volume tinggi?'),
          choices: [
            { id: 'bin', label: t('Protobuf berformat biner, jadi pesannya lebih kecil') },
            {
              id: 'html',
              label: t('Pesan gRPC lebih mudah dibaca manusia daripada JSON'),
              explainWrong: t('Protobuf berbentuk biner, jadi sulit dibaca manusia. JSON lebih mudah dibaca.'),
            },
            {
              id: 'soap',
              label: t('gRPC memakai XML yang lebih padat daripada JSON'),
              explainWrong: t('gRPC tidak memakai XML. XML yang panjang adalah ciri SOAP.'),
            },
          ],
          answer: 'bin',
          explainCorrect: t(
            'Pesan biner lebih kecil dan lebih cepat dibaca mesin daripada teks JSON. Pada 5.000 panggilan per detik, selisihnya terasa.',
          ),
          hints: [t('Bandingkan ukuran pesan biner dan pesan teks.')],
          tags: ['grpc'],
        }),
      ),
      qStep({
        id: 'b10-l01-q11',
        type: 'fill',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Lengkapi pasangan: jenis API dan kebutuhan yang dilayaninya.'),
        template: 'Sistem perbankan lama biasanya memakai ___ (XML), sementara aplikasi IoT sensor suhu hemat kuota memakai ___.',
        bank: ['SOAP', 'MQTT', 'GraphQL', 'WebRTC'],
        answer: ['SOAP', 'MQTT'],
        explainCorrect: t(
          'SOAP berbasis XML dan banyak dipakai sistem bank atau pemerintah yang lama. MQTT populer untuk perangkat IoT yang hemat kuota.',
        ),
        hints: [t('Satu pasangan untuk XML yang formal, satu untuk pesan ringan sensor.'), undefined],
        tags: ['trpc-soap', 'queue-pubsub'],
      }),
      qStep({
        id: 'b10-l01-q12',
        type: 'type',
        modes: ['pro'],
        difficulty: 2,
        prompt: t('Pola server kecil yang menyimpan kunci rahasia untuk aplikasimu punya nama tiga huruf. Apa namanya?'),
        accept: ['BFF', 'bff'],
        explainCorrect: t(
          'BFF adalah server kecil milik tim, di antara aplikasi dan layanan lain. Ia menyimpan kunci rahasia dan merapikan balasan.',
        ),
        hints: [t('Ingat pelajaran tentang menyembunyikan kunci.'), undefined],
        tags: ['bff'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b10-l01-r1',
        prompt: t(
          'Kamu ragu memilih jenis API untuk situs biasa. Apa pilihan paling aman?',
          'Kamu ragu memilih jenis API untuk aplikasi web standar. Apa pilihan paling aman untuk memulai?',
        ),
        choices: [
          { id: 'rest', label: t('REST, pelayan restoran', 'REST API') },
          {
            id: 'soap',
            label: t('WebSocket, telepon tersambung', 'SOAP XML'),
            explainWrong: t(
              'Telepon tersambung cocok untuk chat. Situs biasa tidak perlu tersambung terus.',
              'SOAP lebih umum di sistem lama milik bank dan pemerintah.',
            ),
          },
          {
            id: 'gql',
            label: t('GraphQL, pelayan pribadi', 'GraphQL'),
            explainWrong: t(
              'Pelayan pribadi cocok bila layar butuh isi berbeda. Untuk mulai, pelayan restoran sudah cukup.',
              'GraphQL berguna bila tiap tampilan butuh kolom berbeda. Untuk memulai, REST sudah cukup.',
            ),
          },
        ],
        answer: 'rest',
        explainCorrect: t(
          'REST sederhana dan dipakai di banyak tempat. Seperti pelayan restoran yang semua orang kenal.',
          'REST sederhana, memakai method dan status HTTP, dan didukung di mana-mana.',
        ),
        hints: [t('Situs biasa cukup tanya-jawab, atau butuh kabar langsung?')],
        tags: ['rest'],
      }),
      makeMcq({
        id: 'b10-l01-r2',
        prompt: t('Mana pasangan perumpamaan dan teknologi yang benar?'),
        choices: [
          { id: 'ok', label: t('Radio SSE, telepon WebSocket, bel pintu Webhook') },
          {
            id: 'no',
            label: t('Radio REST, telepon Webhook, bel pintu SSE'),
            explainWrong: t('Radio satu arah itu SSE. REST adalah pelayan restoran.'),
          },
          {
            id: 'mix',
            label: t('Radio SSE, telepon Webhook, bel pintu WebSocket'),
            explainWrong: t('Telepon dua arah itu WebSocket. Webhook adalah bel pintu.'),
          },
        ],
        answer: 'ok',
        explainCorrect: t(
          'Radio bicara satu arah, telepon dua arah. Bel pintu berbunyi sendiri saat ada tamu.',
          'SSE mengalir satu arah dan WebSocket berjalan dua arah. Webhook dikirim saat ada kejadian.',
        ),
        hints: [t('Ingat: radio hanya bicara, telepon bisa dijawab.')],
        tags: ['sse', 'websocket', 'webhook'],
      }),
      makeTf({
        id: 'b10-l01-r3',
        prompt: t(
          'Server tetap harus memeriksa sandi dan izin, walau aplikasi sudah memeriksa.',
          'Jangan percaya client: validasi, login, dan izin tetap diperiksa di server.',
        ),
        answer: true,
        explainCorrect: t(
          'Orang jahil bisa mengirim pesan tanpa lewat aplikasimu. Server adalah penjaga gerbang terakhir.',
          'Siapa saja bisa memanggil API langsung, jadi pemeriksaan keamanan harus ada di server.',
        ),
        explainWrong: t(
          'Pesan bisa dikirim tanpa lewat aplikasi. Karena itu server tetap memeriksa.',
          'Pemeriksaan di browser bisa dilewati. Hanya pemeriksaan di server yang bisa dipercaya.',
        ),
        hints: [t('Ingat penjaga gerbang yang memeriksa setiap tamu.')],
        tags: ['api', 'bff'],
      }),
    ],
    recap: t(
      'Mulai dari REST, pilih alat sesuai tugas, dan periksa di server.',
      'Mulai dari REST, lalu pilih alat per fitur. Keamanan selalu ditegakkan di server.',
    ),
    companion: {
      talkPrompts: [
        'Dari restoran, radio, telepon, dan bel pintu, mana yang paling kamu ingat?',
        'Aplikasi impianmu butuh fitur apa? Fitur mana yang butuh telepon, dan mana yang butuh bel?',
      ],
      offlineActivity:
        'Gambar peta mini Kerajaan Petualang Web. Tandai tempat yang sudah kamu kunjungi: restoran, gudang, menara radio, gerbang, dan puncak.',
    },
  }),  contractWorkflow,
  twoTeamsOneContract,
];
