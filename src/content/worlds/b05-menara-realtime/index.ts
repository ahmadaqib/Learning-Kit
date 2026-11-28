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
  rTerm,
  rText,
  simStep,
  storyStep,
  t,
} from '@/content/lessonHelpers';
import type { Lesson, World } from '@/content/schema';

export const world: World = {
  id: 'b05',
  track: 'B',
  order: 5,
  title: 'Menara Realtime',
  tagline: t(
    'Kabar bisa datang langsung tanpa ditanya. Ada siaran radio dan ada sambungan telepon.',
    'Kamu bisa memilih cara mengirim kabar langsung ke aplikasi, dari polling sampai WebSocket.',
  ),
  color: '#E4572E',
  illustration: 'b05-menara-realtime',
  sourceChapters: ['J2-09', 'J2-10'],
  requires: ['b04'],
  lessons: ['b05-l01', 'b05-l02', 'b05-l03', 'b05-l04', 'b05-l05'],
  sideQuests: [],
  boss: {
    title: 'Tantangan Penjaga Menara Radio',
    greeting: t(
      'Halo, penjaga sinyal! Buktikan kamu bisa membedakan tanya berulang, radio SSE, dan telepon WebSocket.',
      'Uji penguasaanmu atas lima cara mengirim kabar langsung, dari polling sampai WebRTC.',
    ),
    guardianName: 'Penjaga Menara Radio',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'b05-anc-j1',
        prompt: t(
          'HP terus meminta kabar baru. Apa yang lebih cepat habis?',
          'Mengapa polling yang bertanya tiap beberapa detik boros kuota dan baterai?',
        ),
        choices: [
          { id: 'empty', label: t('Baterai dan jatah internet', 'Banyak request tetap dikirim walau belum ada data baru') },
          {
            id: 'vid',
            label: t('Ruang untuk foto yang disimpan', 'Setiap jawaban berisi video beresolusi tinggi'),
            explainWrong: t(
              'Pertanyaan baru memakai internet. Ruang penyimpanan fotomu tetap sama.',
              'Polling hanya mengecek data berulang kali, bukan memutar video.',
            ),
          },
          {
            id: 'css',
            label: t('Masa pakai layar', 'Layar mengganti warna latar tiap detik'),
            explainWrong: t(
              'HP bisa bertanya saat layarnya mati. Bertanya tetap memakai baterai.',
              'Beban utamanya berasal dari permintaan jaringan berulang.',
            ),
          },
        ],
        answer: 'empty',
        explainCorrect: t(
          'HP memakai baterai dan internet setiap kali bertanya. Bahkan saat belum ada kabar baru.',
          'Sebagian besar pertanyaan berulang pada polling pulang dengan jawaban kosong yang sia-sia.',
        ),
        tags: ['polling'],
      }),
      makeAnchorMcq({
        id: 'b05-anc-j2',
        prompt: t(
          'Paket belum tiba. Apa yang petugas loket lakukan agar kamu tidak bolak-balik?',
          'Apa yang dilakukan server pada long polling saat belum ada kabar baru?',
        ),
        choices: [
          { id: 'hold', label: t('Memanggilmu saat ada kabar', 'Menahan jawaban sampai ada kabar atau waktu habis') },
          {
            id: 'err',
            label: t('Memintamu datang lebih siang', 'Langsung memutus aplikasi dengan error'),
            explainWrong: t(
              'Kalau pulang, kamu bisa melewatkan kabar. Tunggu panggilan dari petugas.',
              'Server justru menahan jawaban agar tidak cepat membalas kosong.',
            ),
          },
          {
            id: 'del',
            label: t('Menjawab sekarang dan memintamu kembali', 'Menjawab "belum" lalu menutup koneksi'),
            explainWrong: t(
              'Kalau harus kembali, kamu masih bolak-balik. Petugas bisa memanggilmu nanti.',
              'Itu cara polling biasa. Long polling menahan jawaban.',
            ),
          },
        ],
        answer: 'hold',
        explainCorrect: t(
          'Petugas ingat permintaanmu. Kamu cukup menunggu panggilannya.',
          'Long polling menahan jawaban sampai benar-benar ada pembaruan.',
        ),
        tags: ['long-polling'],
      }),
      makeAnchorMcq({
        id: 'b05-anc-j3',
        prompt: t(
          'Siaran radio SSE mengirim kabar ke arah mana?',
          'Ke arah mana kabar mengalir pada jalur siaran SSE?',
        ),
        choices: [
          { id: 'one', label: t('Satu arah, dari server ke kamu', 'Satu arah, dari server ke browser') },
          {
            id: 'two',
            label: t('Dua arah, seperti telepon', 'Dua arah bebas, seperti telepon'),
            explainWrong: t(
              'Dua arah adalah ciri telepon. Radio hanya mengirim ke arahmu.',
              'Dua arah bebas bersamaan adalah ciri WebSocket, bukan SSE.',
            ),
          },
          {
            id: 'p2p',
            label: t('Dari HP ke HP tanpa server', 'Langsung antar dua HP tanpa server'),
            explainWrong: t(
              'Siaran datang dari pemancar. SSE datang dari server.',
              'Komunikasi langsung antar browser adalah WebRTC.',
            ),
          },
        ],
        answer: 'one',
        explainCorrect: t(
          'SSE seperti radio. Server menyiarkan terus, dan kamu hanya mendengar.',
          'SSE bekerja seperti siaran radio: server menyiarkan terus ke pendengar satu arah.',
        ),
        tags: ['sse'],
      }),
      makeAnchorMcq({
        id: 'b05-anc-j4',
        prompt: t(
          'Kamu dan Rani ingin saling membalas pesan dengan cepat. Cara mana yang cocok?',
          'Untuk fitur chat yang saling membalas cepat, teknologi mana yang paling cocok?',
        ),
        choices: [
          { id: 'ws', label: t('Telepon WebSocket', 'WebSocket') },
          {
            id: 'sse',
            label: t('Radio SSE', 'SSE'),
            explainWrong: t(
              'Radio hanya satu arah. Chat butuh dua arah.',
              'SSE hanya mengalir dari server ke browser. Chat lebih cocok memakai WebSocket.',
            ),
          },
          {
            id: 'poll',
            label: t('Bertanya tiap 5 menit', 'Polling tiap 5 menit'),
            explainWrong: t(
              'Lima menit terlalu lama untuk chat. Kabar terasa lambat.',
              'Chat terasa sangat lambat kalau harus menunggu 5 menit.',
            ),
          },
        ],
        answer: 'ws',
        explainCorrect: t(
          'Telepon tetap tersambung dua arah. Chat pun terasa cepat.',
          'WebSocket menjaga koneksi dua arah tetap terbuka, jadi chat terasa seketika.',
        ),
        tags: ['websocket'],
      }),
      makeAnchorMcq({
        id: 'b05-anc-j5',
        prompt: t(
          'Layar hanya menerima skor pertandingan. Mana yang paling ringan?',
          'Layar hanya perlu menerima skor langsung. Mana yang paling ringan?',
        ),
        choices: [
          { id: 'sse', label: t('Siaran radio SSE', 'SSE untuk satu arah') },
          {
            id: 'poll',
            label: t('Bertanya tiap detik', 'Polling tiap detik'),
            explainWrong: t(
              'Bertanya tiap detik jauh lebih boros daripada satu siaran.',
              'Polling tiap detik jauh lebih boros daripada satu jalur SSE.',
            ),
          },
          {
            id: 'ws',
            label: t('Telepon WebSocket dua arah', 'WebSocket dua arah'),
            explainWrong: t(
              'Telepon dua arah lebih berat. Layar skor hanya perlu mendengar.',
              'Layar skor tidak perlu mengirim balik, jadi dua arah berlebihan.',
            ),
          },
        ],
        answer: 'sse',
        explainCorrect: t(
          'Kalau hanya server yang bicara, radio sudah cukup. Ia ringan dan menyambung lagi sendiri.',
          'Kalau hanya server yang mengirim kabar, SSE lebih ringan dan menyambung ulang otomatis.',
        ),
        tags: ['sse'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'b05-anc-p1',
        prompt: t('Kapan polling berkala masih masuk akal dibanding WebSocket?'),
        choices: [
          { id: 'dash', label: t('Dasbor yang datanya berubah tiap menit') },
          {
            id: 'chat',
            label: t('Game balapan multipemain yang butuh jeda sangat kecil'),
            explainWrong: t('Game seperti itu butuh koneksi dua arah dengan jeda kecil, misalnya WebSocket.'),
          },
          {
            id: 'ai',
            label: t('Jawaban chatbot AI yang mengalir kata demi kata'),
            explainWrong: t('Aliran kata demi kata lebih halus dengan SSE.'),
          },
        ],
        answer: 'dash',
        explainCorrect: t('Polling mudah dibuat dan cukup bila jeda satu menit tidak masalah. Dasbor harian biasanya begitu.'),
        tags: ['polling'],
      }),
      makeAnchorMcq({
        id: 'b05-anc-p2',
        prompt: t('Apa batasan EventSource saat kamu perlu mengirim header Authorization?'),
        choices: [
          { id: 'hdr', label: t('EventSource tidak bisa menambahkan header kustom') },
          {
            id: 'http',
            label: t('EventSource tidak bisa berjalan lewat HTTPS'),
            explainWrong: t('SSE berjalan di HTTP atau HTTPS biasa.'),
          },
          {
            id: 'rec',
            label: t('EventSource tidak bisa menyambung ulang sendiri'),
            explainWrong: t('Sambung ulang otomatis justru fitur bawaan EventSource.'),
          },
        ],
        answer: 'hdr',
        explainCorrect: t('EventSource hanya mengirim request GET sederhana. Alternatifnya cookie sesi atau fetch dengan streaming.'),
        tags: ['sse', 'header-body'],
      }),
      makeAnchorMcq({
        id: 'b05-anc-p3',
        prompt: t('Untuk apa pesan ping-pong (heartbeat) yang rutin dikirim di WebSocket yang sedang diam?'),
        choices: [
          { id: 'hb', label: t('Memastikan koneksi masih hidup dan tidak diputus diam-diam') },
          {
            id: 'css',
            label: t('Mengukur kecepatan internet di HP'),
            explainWrong: t('Ping-pong menjaga koneksi tetap hidup, bukan mengukur kecepatan.'),
          },
          {
            id: 'auth',
            label: t('Mengganti proses login saat koneksi dibuka'),
            explainWrong: t('Login diperiksa sekali saat handshake awal.'),
          },
        ],
        answer: 'hb',
        explainCorrect: t('Router dan proxy sering memutus koneksi yang diam. Ping-pong menjaga jalur tetap aktif.'),
        tags: ['websocket'],
      }),
      makeAnchorMcq({
        id: 'b05-anc-p4',
        prompt: t('Aplikasi chat WebSocket memakai beberapa server. Apa yang menyampaikan pesan antarserver?'),
        choices: [
          { id: 'pub', label: t('Message broker seperti Redis Pub/Sub') },
          {
            id: 'html',
            label: t('Database tunggal yang dicek tiap detik'),
            explainWrong: t('Mengecek database terus-menerus itu boros dan lambat. Broker meneruskan pesan langsung.'),
          },
          {
            id: 'get',
            label: t('Memindahkan semua orang ke satu server saja'),
            explainWrong: t('Satu server cepat penuh. Skala besar butuh banyak server.'),
          },
        ],
        answer: 'pub',
        explainCorrect: t('Orang A bisa terhubung ke server 1, orang B ke server 2. Broker meneruskan pesan di antara keduanya.'),
        tags: ['websocket', 'server'],
      }),
      makeAnchorMcq({
        id: 'b05-anc-p5',
        prompt: t('Apa fungsi utama server STUN pada panggilan video WebRTC?'),
        choices: [
          { id: 'stun', label: t('Memberi tahu browser alamat publiknya di luar router') },
          {
            id: 'store',
            label: t('Menyimpan rekaman panggilan video selama satu tahun'),
            explainWrong: t('STUN hanya membantu menemukan alamat publik. Ia tidak menyimpan video.'),
          },
          {
            id: 'css',
            label: t('Meneruskan video saat koneksi langsung gagal'),
            explainWrong: t('Itu tugas TURN, bukan STUN. STUN hanya memberi tahu alamat publik.'),
          },
        ],
        answer: 'stun',
        explainCorrect: t('STUN menjawab alamat rumahmu dari luar router Wi-Fi. Jawaban itu dipakai untuk menyambung dua browser.'),
        tags: ['webrtc'],
      }),
      makeAnchorMcq({
        id: 'b05-anc-p6',
        type: 'limit',
        analogy: t('WebRTC seperti walkie-talkie langsung antar dua orang tanpa operator'),
        prompt: t('Kapan WebRTC melanggar analogi "tanpa operator" dan memakai server TURN?'),
        choices: [
          { id: 'turn', label: t('Saat firewall menghalangi sambungan langsung antar browser') },
          {
            id: 'text',
            label: t('Saat panggilan dilakukan lewat Wi-Fi rumah'),
            explainWrong: t('Wi-Fi rumah biasanya tetap bisa peer-to-peer. TURN dipakai bila firewall menghalangi.'),
          },
          {
            id: 'http',
            label: t('Saat kedua browser hanya bertukar teks JSON'),
            explainWrong: t('DataChannel WebRTC bisa membawa teks maupun biner langsung antar browser.'),
          },
        ],
        answer: 'turn',
        explainCorrect: t('TURN meneruskan data lewat server bila jalur langsung diblokir. Jadi panggilan tetap jalan.'),
        tags: ['webrtc'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'b05-l01',
    worldId: 'b05',
    title: 'Polling: “udah sampai belum?”',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menyebutkan untung dan rugi polling.',
      'Kamu bisa menyebutkan batas HTTP biasa untuk realtime dan untung-rugi polling.',
    ),
    estMinutes: 6,
    introducesTerms: ['polling'],
    usesTerms: ['api', 'request', 'response', 'server', 'fetch'],
    stickerId: 'tanya-berulang',
    warmupFrom: 'b04-l05',
    atWork: 'Kamu akan memakai polling untuk dasbor pesanan yang cukup diperbarui tiap menit.',
    steps: [
      storyStep('b05/tanya-berulang.svg', [
        rText(
          'Kamu menunggu paket kurir. Setiap 5 menit kamu membuka pintu dan melihat. Mengapa kurir tidak mengabari saja?',
          'Dasbor Toko Rani harus menampilkan pesanan baru tanpa dimuat ulang. Tetapi HTTP biasa hanya menjawab setelah browser bertanya.',
        ),
      ]),
      conceptStep({
        title: t('Server tidak bisa menyapa duluan', 'Keterbatasan HTTP tanya-jawab'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b05', topic: 'masalah-http' },
        alt: t(
          'Aplikasi bertanya dulu. Server baru menjawab.',
          'Browser selalu bertanya lebih dulu. Server tidak bisa mengirim kabar tanpa ditanya.',
        ),
        body: [
          rText(
            'Server seperti kurir yang hanya mau datang kalau kamu memanggil. Ia tidak bisa mengetuk pintumu duluan. Padahal chat butuh kabar yang datang sendiri.',
            'Di HTTP biasa, browser harus bertanya lebih dulu. Server tidak bisa mengirim kabar sendiri. Chat, notifikasi, dan posisi kurir butuh layar yang berubah tanpa diminta.',
          ),
        ],
      }),
      qStep(
        makeTf({
          id: 'b05-l01-q2',
          prompt: t(
            'Di web biasa, server boleh mengirim kabar tanpa ditanya.',
            'Pada HTTP biasa tanpa teknik realtime, server bisa mengirim kabar ke browser tanpa ditanya.',
          ),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru. Server hanya menjawab setelah kamu bertanya, seperti kurir yang menunggu panggilan.',
            'Pernyataan itu keliru. Pada HTTP tanya-jawab, browser harus memulai request lebih dulu.',
          ),
          explainWrong: t(
            'Server tidak bisa menyapa duluan. Aplikasi harus bertanya lebih dulu.',
            'Di HTTP standar, server pasif. Ia hanya menjawab request dari browser.',
          ),
          hints: [t('Ingat kurir yang menunggu dipanggil.', 'Siapa yang harus memulai percakapan di HTTP?')],
          tags: ['polling', 'server'],
        }),
      ),
      conceptStep({
        title: t('Bertanya berulang tiap beberapa detik', 'Polling dengan setInterval'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b05', topic: 'polling-berulang' },
        alt: t(
          'Aplikasi bertanya tiap 5 detik. Server menjawab belum, berkali-kali.',
          'Browser mengirim request tiap 5 detik. Server menjawab "belum" berkali-kali.',
        ),
        code: {
          lang: 'js',
          code: 'setInterval(async () => {\n  const res = await fetch("/api/notifikasi");\n  tampilkan(await res.json());\n}, 5000); // tanya setiap 5 detik',
          highlight: [1, 2],
        },
        body: [
          rTerm('polling', 'Polling', 'Polling'),
          rText(
            ' berarti bertanya berulang tiap beberapa detik. Kalau belum ada kabar, ia tanya lagi. Cara ini mudah dibuat, tetapi boros kuota dan baterai.',
            ' adalah memanggil API berulang dengan jeda tetap, tanpa peduli ada data baru atau tidak. Kode di bawah memanggil endpoint setiap 5 detik.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b05-l01-q1',
          type: 'analogy',
          prompt: t(
            'Kamu membuka pintu tiap 5 menit untuk mencari paket. Di web, cara apa yang mirip?',
            'Membuka pintu tiap 5 menit untuk mengecek paket menggambarkan teknik realtime yang mana?',
          ),
          choices: [
            {
              id: 'poll',
              label: t('Bertanya berulang tiap beberapa detik', 'Bertanya ke server berulang dengan jeda tetap'),
            },
            {
              id: 'sse',
              label: t('Server datang mengetuk pintumu lebih dulu', 'Server mengirim kabar tanpa menunggu pertanyaan'),
              explainWrong: t(
                'Server tidak bisa menyapa duluan. Kamu yang harus bertanya.',
                'Pada HTTP biasa server tidak bisa memulai. Itu bukan polling.',
              ),
            },
            {
              id: 'ws',
              label: t('Menunggu kurir tanpa pernah bertanya', 'Satu sambungan dibuka terus untuk dua arah'),
              explainWrong: t(
                'Tanpa bertanya, kamu tidak tahu kapan paket tiba. Polling bertanya terus.',
                'Sambungan yang terus terbuka bukan polling. Polling mengirim request baru tiap putaran.',
              ),
            },
          ],
          answer: 'poll',
          explainCorrect: t(
            'Polling bertanya berulang, seperti membuka pintu tiap 5 menit. Jawabannya sering kosong.',
            'Polling mengirim pertanyaan berulang dengan jeda tetap. Pintu yang dibuka tiap 5 menit sama seperti itu.',
          ),
          hints: [t('Ingat siapa yang berjalan ke pintu.', 'Lihat siapa yang memulai tiap pertanyaan.')],
          tags: ['polling'],
        }),
      ),
      conceptStep({
        title: t('Untung dan rugi polling', 'Untung dan rugi polling'),
        modes: ['pro'],
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b05', topic: 'tanya-berulang' },
        alt: t('Polling mudah dibuat, tetapi boros request, baterai, dan kuota. Kabar terlambat sepanjang jeda.'),
        body: [
          rText(
            'Kelebihan polling: mudah dibuat dan jalan di mana saja. Kekurangannya: server menerima banyak request kosong, baterai dan kuota HP terkuras, dan kabar terlambat sepanjang jeda. Cocok untuk dasbor yang diperbarui tiap menit.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Polling seperti membuka pintu depan tiap 5 menit'),
        same: [
          t(
            'Kamu sering bertanya, dan sering tidak ada kabar.',
            'Sebagian besar pemeriksaan berakhir kosong, dan kabar baru telat diketahui sepanjang jeda.',
          ),
        ],
        different: [
          t(
            '50.000 HP bertanya bersamaan, server bisa kewalahan.',
            'Satu pintu hanya melelahkan satu orang. Polling dari 50.000 HP sekaligus bisa membuat server tumbang.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'balap-realtime',
        t(
          'Ketuk "Kirim Kabar Baru" lalu amati pertanyaan yang sia-sia.',
          'Ketuk "Kirim Kabar Baru", lalu hitung request kosong di baris Polling.',
        ),
      ),
      qStep({
        id: 'b05-l01-q3',
        type: 'sort',
        prompt: t(
          'Kelompokkan sifat polling ini ke Kelebihan atau Kekurangan.',
          'Kelompokkan sifat polling ke kelebihan atau kekurangannya.',
        ),
        difficulty: 2,
        items: [
          { id: 'p1', label: t('Mudah dibuat', 'Mudah dibuat dengan fetch biasa') },
          { id: 'k1', label: t('Banyak pertanyaan tanpa kabar', 'Banyak request kosong membebani server') },
          { id: 'p2', label: t('Jalan di mana saja', 'Berjalan di semua tempat tanpa teknologi khusus') },
          { id: 'k2', label: t('Boros kuota dan baterai HP', 'Menguras kuota dan baterai HP') },
        ],
        bins: [
          { id: 'plus', label: t('Kelebihan', 'Kelebihan polling'), icon: 'lightbulb' },
          { id: 'minus', label: t('Kekurangan', 'Kekurangan polling'), icon: 'bug' },
        ],
        answer: { p1: 'plus', k1: 'minus', p2: 'plus', k2: 'minus' },
        explainCorrect: t(
          'Polling mudah dibuat. Tetapi terlalu sering bertanya itu boros.',
          'Polling mudah dibuat, tetapi boros sumber daya saat dipakai untuk data yang cepat berubah.',
        ),
        hints: [t('Pikirkan pintu yang sering dibuka.', 'Pisahkan yang memudahkan developer dari yang membebani server.'), undefined],
        tags: ['polling'],
      }),
      qStep(
        makeMcq({
          id: 'b05-l01-q4',
          type: 'limit',
          analogy: t('Polling seperti mengecek pintu depan setiap 5 menit'),
          prompt: t(
            '50.000 HP bertanya tiap 5 detik sekaligus. Apa yang terjadi pada server?',
            'Apa yang terjadi di server saat 50.000 HP melakukan polling bersamaan?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'load',
              label: t('Server kebanjiran pertanyaan kosong', 'Server menangani banyak request tanpa kabar baru'),
            },
            {
              id: 'door',
              label: t('Server menjawab makin cepat karena ramai', 'Kabar tiba tanpa jeda karena semua HP bertanya sekaligus'),
              explainWrong: t(
                'Banyak pertanyaan membuat server sibuk, bukan cepat.',
                'Jeda tetap ada, karena kabar baru hanya terlihat saat putaran berikutnya.',
              ),
            },
            {
              id: 'fast',
              label: t('Baterai HP justru menjadi hemat', 'Server membalas semua request dengan data yang sama'),
              explainWrong: t(
                'Bertanya terus tetap menguras baterai HP.',
                'Setiap HP tetap mendapat jawabannya sendiri, jadi bebannya bertambah.',
              ),
            },
          ],
          answer: 'load',
          explainCorrect: t(
            'Semua HP bertanya sekaligus, jadi pertanyaan kosong menumpuk. Server pun kewalahan.',
            'Server tetap harus memproses setiap request, meski belum ada kabar. Banyak request bersamaan menambah beban.',
          ),
          hints: [t('Bayangkan banyak orang mengetuk pintu yang sama.', 'Kalikan satu request dengan 50.000 HP.')],
          tags: ['polling', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l01-q5',
          type: 'scenario',
          story: t(
            'Bu Laras membuat papan jumlah pengunjung perpustakaan. Angkanya cukup diganti tiap 2 menit.',
            'Bu Laras membuat papan jumlah pengunjung harian di perpustakaan. Angka cukup diperbarui tiap 2 menit.',
          ),
          prompt: t('Mengapa tanya berulang tiap 2 menit sudah cukup?', 'Mengapa polling tiap 2 menit sudah cukup untuk papan ini?'),
          difficulty: 2,
          choices: [
            {
              id: 'fit',
              label: t('Angkanya jarang berubah, jadi tidak perlu cepat', 'Data jarang berubah dan jeda menit tidak jadi masalah'),
            },
            {
              id: 'chat',
              label: t('Pengunjung membalas chat lewat papan tiap detik', 'Pengunjung saling berbalas chat lewat papan tiap detik'),
              explainWrong: t(
                'Papan hanya menampilkan jumlah pengunjung. Tidak ada yang membalas chat.',
                'Ceritanya hanya menampilkan jumlah pengunjung tiap 2 menit.',
              ),
            },
            {
              id: 'vid',
              label: t('Tanya berulang lebih cepat daripada cara lain', 'Teknik lain tidak bisa menampilkan angka'),
              explainWrong: t(
                'Tanya berulang justru punya jeda. Papan ini hanya tidak butuh kabar seketika.',
                'Teknik lain juga bisa, tetapi lebih rumit. Untuk angka yang jarang berubah, cara sederhana cukup.',
              ),
            },
          ],
          answer: 'fit',
          explainCorrect: t(
            'Angka jarang berubah, jadi tanya tiap 2 menit sudah cukup. Cara sederhana lebih mudah dibuat.',
            'Untuk angka yang jarang berubah, jeda menit tidak masalah. Polling lebih sederhana daripada teknik lain.',
          ),
          hints: [t('Seberapa sering angka itu berubah?')],
          tags: ['polling'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l01-q6',
          type: 'why',
          modes: ['pro'],
          base: 'Polling disetel bertanya ke server setiap 5 detik.',
          prompt: t('Kabar baru muncul di layar beberapa detik setelah terjadi di server. Apa penyebabnya?'),
          difficulty: 2,
          choices: [
            { id: 'wait', label: t('Browser baru bertanya lagi saat jadwal 5 detik tiba') },
            {
              id: 'css',
              label: t('Server sengaja menunda setiap jawaban selama 5 detik'),
              explainWrong: t('Server menjawab secepatnya. Jeda berasal dari jadwal tanya di browser.'),
            },
            {
              id: 'json',
              label: t('Internet terputus selama 5 detik setiap putaran'),
              explainWrong: t('Koneksi tetap menyala. Jeda muncul karena browser menunggu jadwal berikutnya.'),
            },
          ],
          answer: 'wait',
          explainCorrect: t('Kabar yang terjadi tepat setelah browser bertanya baru terlihat saat browser bertanya lagi. Jeda terpanjang sama dengan interval polling.'),
          hints: [t('Hitung kapan browser bertanya lagi.')],
          tags: ['polling'],
        }),
      ),
      qStep({
        id: 'b05-l01-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi kode yang memanggil API setiap 5 detik.'),
        difficulty: 2,
        template: '___(async () => {\n  const res = await ___("/api/notifikasi");\n}, 5000);',
        bank: ['setInterval', 'fetch', 'EventSource', 'WebSocket'],
        answer: ['setInterval', 'fetch'],
        explainCorrect: t('setInterval mengulang fungsi secara berkala. fetch mengirim request HTTP.'),
        hints: [t('Satu mengulang, satu mengambil data.'), undefined],
        tags: ['polling', 'fetch'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b05-l01-r1',
        prompt: t('Apa kelemahan terbesar polling untuk chat yang cepat?'),
        choices: [
          { id: 'waste', label: t('Terlalu sering bertanya tanpa kabar', 'Banyak request kosong dan kabar yang terlambat') },
          {
            id: 'hard',
            label: t('Sangat sulit dibuat', 'Sulit dibuat dan butuh teknologi khusus'),
            explainWrong: t('Polling justru cara yang paling mudah dibuat.', 'Polling justru teknik paling mudah dibuat.'),
          },
          {
            id: 'old',
            label: t('Hanya jalan di HP yang baru', 'Hanya jalan di browser versi terbaru'),
            explainWrong: t(
              'Polling jalan di mana saja. Kelemahannya terlalu sering bertanya.',
              'Polling jalan di mana saja, karena hanya memakai HTTP biasa.',
            ),
          },
        ],
        answer: 'waste',
        explainCorrect: t(
          'Polling mudah dibuat. Tetapi ia boros kalau terus bertanya saat belum ada kabar.',
          'Polling mudah dibuat, tetapi boros kalau terus bertanya saat belum ada data baru. Untuk chat, jeda sepanjang interval terasa lambat.',
        ),
        hints: [t('Ingat pintu yang sering dibuka sia-sia.', 'Pikirkan chat yang butuh kabar dalam sekejap.')],
        tags: ['polling'],
      }),
      makeTf({
        id: 'b05-l01-r2',
        prompt: t(
          'Polling cocok untuk angka yang jarang berubah.',
          'Polling cocok untuk dasbor yang datanya jarang berubah dan tidak butuh kabar seketika.',
        ),
        answer: true,
        explainCorrect: t(
          'Angka yang jarang berubah tidak perlu cepat. Cara sederhana sudah cukup.',
          'Jeda puluhan detik atau menit bisa ditangani polling sederhana.',
        ),
        explainWrong: t(
          'Angka yang jarang berubah tidak perlu cepat. Kesederhanaan polling justru menjadi kelebihan.',
          'Untuk data yang jarang berubah, kesederhanaan polling justru menjadi kelebihan.',
        ),
        hints: [t('Seberapa sering angka itu berubah?')],
        tags: ['polling'],
      }),
    ],
    recap: t(
      'Polling bertanya berulang: mudah dibuat, tetapi boros.',
      'Polling memanggil API berulang dengan jeda tetap. Mudah dibuat, tetapi boros server dan terlambat sepanjang jeda.',
    ),
    companion: {
      talkPrompts: ['Mengapa membuka pintu tiap 5 menit itu melelahkan?'],
      offlineActivity: 'Main tebak jam: satu orang berpura-pura menulis pesan rahasia di menit acak, yang lain hanya boleh bertanya "Sudah?" tiap 10 detik untuk merasakan jeda Polling.',
    },
  }),

  makeLesson({
    id: 'b05-l02',
    worldId: 'b05',
    title: 'Long polling: menunggu di loket',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan menunggu di loket dan bertanya berulang.',
      'Kamu bisa menjelaskan siklus tanya-tahan-jawab pada long polling.',
    ),
    estMinutes: 6,
    introducesTerms: ['long-polling'],
    usesTerms: ['polling', 'request', 'response', 'server', 'browser'],
    warmupFrom: 'b05-l01',
    atWork: 'Kamu akan menemui long polling di aplikasi kantor lama yang hanya memakai HTTP biasa.',
    steps: [
      storyStep('Loket kurir', [
        rText(
          'Bito memberikan nomor paket di loket kurir. Paketnya belum tiba. Bagaimana ia bisa tahu saat paket datang?',
          'Polling biasa menghasilkan banyak jawaban "belum" yang sia-sia. Bisakah server menunggu sampai kabar benar-benar ada?',
        ),
      ]),
      conceptStep({
        title: t('Tunggu panggilan petugas', 'Cara kerja long polling'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b05', topic: 'Tunggu kabar' },
        alt: t('Menara dengan gambar gelombang radio.'),
        body: [
          rJunior('Petugas loket memanggilmu saat paket tiba. Di web, '),
          rTerm('long-polling', 'Long polling', 'Long polling'),
          rText(
            ' adalah cara meminta kabar dan menunggu jawabannya.',
            ' adalah teknik menahan jawaban. Server menjawab saat ada data baru atau waktu tunggu habis (timeout).',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b05-l02-q1',
          type: 'analogy',
          prompt: t(
            'Bito menitipkan nomor paket di loket saat gudang masih kosong. Cara web apa yang mirip?',
            'Sistem hanya boleh membuka satu permintaan sambil menunggu kabar. Teknik mana yang cocok?',
          ),
          choices: [
            {
              id: 'lp',
              label: t('Menunggu panggilan setelah bertanya', 'Long polling: tanya sekali, jawaban ditahan'),
            },
            {
              id: 'p',
              label: t('Bertanya berulang tiap beberapa detik', 'Polling biasa: tanya berulang tiap 5 detik'),
              explainWrong: t(
                'Bertanya berkali-kali itu polling. Di loket, Bito cukup bertanya sekali.',
                'Polling biasa menutup jawaban "belum" lalu menunggu jadwal berikutnya.',
              ),
            },
            {
              id: 'ws',
              label: t('Menyuruh kurir mengetuk pintu duluan', 'Server mengirim kabar tanpa menunggu pertanyaan'),
              explainWrong: t(
                'Server web tidak bisa menyapa duluan. Kamu tetap harus bertanya.',
                'HTTP biasa tidak mengizinkan server memulai pengiriman. Browser harus bertanya lebih dulu.',
              ),
            },
          ],
          answer: 'lp',
          explainCorrect: t(
            'Petugas mencatat permintaan Bito. Ia baru memanggil Bito saat paket tiba.',
            'Permintaan tetap terbuka sampai server punya kabar atau waktu tunggu habis.',
          ),
          hints: [t('Ingat cara kerja loket kurir.', 'Cari teknik yang menahan jawaban, bukan mengulang pertanyaan.')],
          tags: ['long-polling'],
        }),
      ),
      conceptStep({
        title: t('Tanya lagi setelah dijawab', 'Siklus tanya ulang'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b05', topic: 'Ajukan permintaan baru' },
        alt: t('Menara dengan gambar gelombang radio.'),
        body: [
          rText(
            'Setelah menerima satu jawaban, aplikasi langsung bertanya lagi. Ia bersiap menunggu kabar berikutnya.',
            'Satu jawaban menyelesaikan satu request HTTP. Browser langsung mengirim request baru untuk menunggu kabar berikutnya.',
          ),
        ],
      }),
      qStep({
        id: 'b05-l02-q2',
        type: 'order',
        prompt: t('Urutkan cara meminta kabar seperti di loket.', 'Urutkan satu putaran penuh long polling.'),
        difficulty: 2,
        items: [
          { id: 's3', label: t('Kabar masuk, lalu server menjawab', 'Pesan masuk, jadi server mengirim response') },
          { id: 's1', label: t('Aplikasi bertanya apakah ada kabar', 'Browser mengirim request "ada pesan baru?"') },
          { id: 's4', label: t('Aplikasi langsung bertanya lagi', 'Browser langsung mengirim request baru') },
          { id: 's2', label: t('Server menahan jawaban dan menunggu', 'Server menahan request sampai pesan tiba') },
        ],
        answer: ['s1', 's2', 's3', 's4'],
        explainCorrect: t(
          'Petugas menjawab permintaan pertama. Untuk kabar berikutnya, ajukan permintaan baru.',
          'Urutannya: tanya, tahan, jawab, tanya ulang. Setiap jawaban menyelesaikan satu request.',
        ),
        hints: [t('Mulai dari aplikasi yang bertanya.', 'Jawaban selalu diikuti pertanyaan baru.'), undefined],
        tags: ['long-polling', 'request', 'response'],
      }),
      conceptStep({
        title: t('Kelebihan dan beban', 'Kelebihan dan beban long polling'),
        modes: ['pro'],
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b05', topic: 'Beban permintaan' },
        alt: t('Menara dengan gambar gelombang radio.'),
        body: [
          rText(
            'Kelebihan: kabar tiba hampir seketika lewat HTTP biasa, cocok untuk sistem lama. Kekurangan: server menahan banyak koneksi yang menggantung, dan ada jeda saat menyambung ulang.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Long polling seperti menunggu kabar di loket', 'Long polling seperti menunggu panggilan di loket ekspedisi'),
        same: [
          t(
            'Kamu tidak perlu bertanya berulang, dan kabar datang segera.',
            'Pertanyaan kosong berkurang, dan kabar langsung tiba begitu peristiwa terjadi.',
          ),
        ],
        different: [
          t(
            'Di web, waktunya bisa habis sebelum kabar tiba.',
            'Aplikasi bisa menetapkan batas tunggu. Saat batas tercapai, server bisa membalas tanpa kabar baru, lalu browser bertanya lagi.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'balap-realtime',
        t(
          'Ketuk "Kirim Kabar Baru" dan bandingkan jumlah pertanyaan tiap baris.',
          'Ketuk "Kirim Kabar Baru", lalu bandingkan jumlah request di tiap baris.',
        ),
      ),
      qStep(
        makeTf({
          id: 'b05-l02-q3',
          prompt: t(
            'Setelah menerima jawaban, Bito bisa mendapat kabar berikutnya tanpa bertanya lagi.',
            'Satu permintaan bisa mendapat jawaban baru setelah jawaban sebelumnya selesai.',
          ),
          answer: false,
          explainCorrect: t(
            'Permintaan selesai setelah petugas menjawab. Bito perlu bertanya lagi.',
            'Pernyataan itu keliru. Satu pertanyaan hanya menerima satu jawaban, jadi browser harus bertanya lagi.',
          ),
          explainWrong: t(
            'Kabar pertama menjawab permintaan awal. Kabar lain perlu permintaan baru.',
            'Setelah jawaban selesai, browser harus mengirim request baru.',
          ),
          hints: [t('Berapa kali petugas memanggil untuk satu permintaan?', 'Hitung berapa jawaban untuk satu pertanyaan.')],
          tags: ['long-polling'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l02-q4',
          prompt: t(
            'Banyak orang menunggu di loket. Apa pekerjaan tambahan petugas?',
            'Apa beban utama yang muncul saat banyak orang memakai long polling bersamaan?',
          ),
          choices: [
            {
              id: 'hold',
              label: t('Mencatat orang yang menunggu', 'Banyak koneksi menggantung terbuka sambil menunggu kabar'),
            },
            {
              id: 'css',
              label: t('Langsung menjawab semua permintaan masuk', 'Jumlah request kosong naik seperti polling biasa'),
              explainWrong: t(
                'Petugas menunggu kabar tentang tiap paket sebelum menjawab.',
                'Long polling justru mengurangi jawaban kosong.',
              ),
            },
            {
              id: 'nohttp',
              label: t('Menghafal semua kabar lama', 'Browser harus menyimpan semua pesan lama'),
              explainWrong: t(
                'Petugas perlu mengingat orang yang masih menunggu kabar.',
                'Menyimpan pesan bukan beban utamanya. Beban utama ada pada koneksi yang menggantung.',
              ),
            },
          ],
          answer: 'hold',
          explainCorrect: t(
            'Makin banyak yang menunggu, makin panjang daftar permintaan petugas.',
            'Setiap koneksi yang menggantung memakan memori dan slot koneksi di server. Beban naik seiring jumlah orang yang menunggu.',
          ),
          hints: [t('Bayangkan petugas mencatat semua orang yang datang.', 'Pikirkan apa yang terus terbuka di server.')],
          tags: ['long-polling', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l02-q5',
          type: 'limit',
          analogy: t('Long polling seperti menunggu panggilan di loket'),
          prompt: t(
            'Bito menunggu kabar, tetapi lama tidak ada kabar. Apa yang terjadi?',
            'Pada long polling, apa yang terjadi bila lama tidak ada pesan baru?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'to',
              label: t('Petugas menjawab belum ada. Bito bertanya lagi.', 'Timeout: server menjawab kosong, browser mengirim request baru'),
            },
            {
              id: 'ban',
              label: t('Bito menunggu terus tanpa batas waktu', 'Server menahan koneksi tanpa batas waktu sampai pesan baru tiba'),
              explainWrong: t(
                'Petugas memberi kabar saat batas tunggu habis.',
                'Aplikasi biasanya menetapkan batas tunggu. Server bisa membalas saat batas itu tercapai.',
              ),
            },
            {
              id: 'radio',
              label: t('Petugas menjawab belum ada. Bito pulang.', 'Server menutup koneksi, browser berhenti bertanya'),
              explainWrong: t(
                'Bito masih ingin tahu. Ia langsung bertanya lagi.',
                'Browser tidak berhenti. Setelah waktu habis, ia langsung mengirim request baru.',
              ),
            },
          ],
          answer: 'to',
          explainCorrect: t(
            'Batas tunggu habis, jadi petugas menjawab belum ada. Bito bertanya lagi.',
            'Saat batas tunggu tercapai, server bisa membalas tanpa kabar baru. Browser lalu mengirim permintaan baru.',
          ),
          hints: [
            t(
              'Apa yang petugas lakukan saat batas tunggu habis?',
              'Ingat sifat HTTP: setiap pertanyaan harus berakhir dengan jawaban.',
            ),
          ],
          tags: ['long-polling'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l02-q6',
          type: 'scenario',
          modes: ['pro'],
          story: t(
            'Server kantor hanya mendukung HTTP biasa. Notifikasi harus tiba cepat dengan sedikit request kosong.',
          ),
          prompt: t('Teknik realtime mana yang paling pas?'),
          difficulty: 2,
          choices: [
            { id: 'lp', label: t('Long polling') },
            {
              id: 'p5',
              label: t('Polling tiap 30 detik'),
              explainWrong: t('Jeda 30 detik tidak menghasilkan notifikasi hampir seketika.'),
            },
            {
              id: 'grpc',
              label: t('Polling setiap 300 ms'),
              explainWrong: t('Jeda pendek membuat browser sering bertanya. Banyak permintaan tetap mendapat jawaban kosong.'),
            },
          ],
          answer: 'lp',
          explainCorrect: t('Long polling berjalan di HTTP biasa dan memberi kabar hampir seketika.'),
          hints: [t('Cari teknik yang tetap memakai HTTP biasa.')],
          tags: ['long-polling'],
        }),
      ),
      qStep({
        id: 'b05-l02-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Ketik istilah Inggris untuk waktu tunggu yang habis pada koneksi long polling.'),
        difficulty: 2,
        accept: ['timeout'],
        explainCorrect: t('Saat timeout tercapai, browser langsung bertanya lagi.'),
        hints: [t('Lihat kartu tentang cara kerja long polling.'), undefined],
        tags: ['long-polling'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b05-l02-r1',
        prompt: t(
          'Bagaimana cara menunggu satu jawaban mengurangi pertanyaan kosong?',
          'Bagaimana long polling mengurangi jawaban kosong?',
        ),
        choices: [
          { id: 'hold', label: t('Server menahan jawaban sampai ada kabar', 'Server menahan jawaban sampai ada data baru') },
          {
            id: 'del',
            label: t('Aplikasi bertanya lebih cepat lagi', 'Browser menggandakan jumlah pertanyaan per detik'),
            explainWrong: t(
              'Bertanya lebih cepat justru menambah pertanyaan kosong.',
              'Menambah pertanyaan justru menambah jawaban kosong.',
            ),
          },
          {
            id: 'quick',
            label: t('Server menjawab "belum" dengan cepat', 'Server membalas "belum ada" lebih cepat'),
            explainWrong: t(
              'Jawaban cepat membuat aplikasi harus sering bertanya lagi.',
              'Menjawab "belum ada" lebih cepat tetap menghasilkan jawaban kosong.',
            ),
          },
        ],
        answer: 'hold',
        explainCorrect: t(
          'Dengan menahan jawaban, server tidak menjawab "belum ada" tiap beberapa detik.',
          'Server tidak lagi membalas "belum ada" tiap beberapa detik. Satu pertanyaan menunggu sampai ada kabar.',
        ),
        hints: [t('Bayangkan menunggu panggilan petugas.', 'Bandingkan dengan polling: siapa yang menunda?')],
        tags: ['long-polling'],
      }),
      makeTf({
        id: 'b05-l02-r2',
        prompt: t(
          'Makin banyak orang menunggu, makin banyak permintaan yang dijaga server.',
          'Long polling menahan banyak koneksi terbuka sambil menunggu kabar.',
        ),
        answer: true,
        explainCorrect: t(
          'Setiap yang menunggu memegang satu sambungan. Itu beban utama server.',
          'Hemat request kosong, tetapi koneksi menggantung tetap memakan memori di server.',
        ),
        explainWrong: t(
          'Sambungan yang ditahan tetap terbuka. Server harus menjaga semuanya.',
          'Koneksi yang ditahan tetap terbuka dan memakan memori di server.',
        ),
        hints: [t('Bayangkan antrean loket yang panjang.', 'Pikirkan apa yang terbuka saat menunggu.')],
        tags: ['long-polling'],
      }),
    ],
    recap: t(
      'Tunggu satu jawaban, lalu ajukan permintaan baru.',
      'Long polling menahan jawaban sampai ada data baru atau waktu habis. Setelah itu browser langsung bertanya lagi.',
    ),
    companion: {
      talkPrompts: ['Apa bedanya menunggu panggilan petugas dengan kembali ke loket berkali-kali?'],
      offlineActivity: 'Buat loket dari meja. Tulis nomor paket di kertas, lalu titipkan kepada petugas. Tunggu sampai petugas memanggil nomor itu. Ulangi dengan nomor lain.',
    },
  }),

  makeLesson({
    id: 'b05-l03',
    worldId: 'b05',
    title: 'SSE: siaran radio',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menyebutkan arah kabar pada siaran SSE.',
      'Kamu bisa menyebutkan fitur bawaan dan batasan SSE (EventSource).',
    ),
    estMinutes: 6,
    introducesTerms: ['sse'],
    usesTerms: ['polling', 'long-polling', 'browser', 'server', 'json'],
    stickerId: 'radio',
    warmupFrom: 'b05-l02',
    atWork: 'Kamu akan memakai SSE untuk menampilkan jawaban chatbot atau notifikasi yang mengalir ke browser.',
    steps: [
      storyStep('b05/radio.svg', [
        rText(
          'Kamu menyalakan radio dan memilih satu saluran. Penyiar terus menyiarkan kabar tanpa kamu bertanya. Bisakah kamu bicara balik ke penyiar?',
          'Jawaban chatbot di dasbor Toko Rani muncul kata demi kata. Layarnya hanya menerima kabar, tidak mengirim balik.',
        ),
      ]),
      conceptStep({
        title: t('Siaran satu arah dari server', 'Apa itu SSE?'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b05', topic: 'sse-radio' },
        alt: t(
          'Aplikasi mendengarkan sekali. Server terus mengirim kabar.',
          'Browser berlangganan sekali, lalu server mengalirkan kabar pesanan terus-menerus.',
        ),
        body: [
          rTerm('sse', 'SSE', 'SSE'),
          rText(
            ' berarti siaran radio di web. Server terus mengirim kabar baru ke browser, tanpa ditanya. Kamu hanya mendengar, tidak bisa bicara balik.',
            ' (Server-Sent Events) adalah satu koneksi HTTP yang tetap terbuka untuk aliran data satu arah. Server mengirim kabar teks ke browser kapan saja, tanpa ditanya ulang.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b05-l03-q1',
          type: 'analogy',
          prompt: t(
            'Memilih satu saluran radio, lalu penyiar terus menyiarkan kabar. Teknologi web apa yang mirip?',
            'Pilih satu saluran, lalu server terus mengirim kabar satu arah. Teknologi apa ini?',
          ),
          choices: [
            { id: 'sse', label: t('SSE, siaran satu arah', 'SSE: koneksi terbuka satu arah') },
            {
              id: 'poll',
              label: t('Polling, bertanya berulang', 'Polling: request berulang berkala'),
              explainWrong: t(
                'Polling bertanya berulang kali. Radio cukup dinyalakan sekali.',
                'Polling bertanya berulang kali, bukan membuka satu saluran terbuka.',
              ),
            },
            {
              id: 'webrtc',
              label: t('Long polling, tunggu jawaban di loket', 'Long polling: request ditahan server'),
              explainWrong: t(
                'Petugas loket hanya menjawab sekali. Radio terus menyiarkan kabar.',
                'Satu jawaban menyelesaikan permintaan long polling. SSE terus mengalir selama sambungan terbuka.',
              ),
            },
          ],
          answer: 'sse',
          explainCorrect: t(
            'Radio dinyalakan sekali, lalu kabar mengalir terus. SSE bekerja seperti itu.',
            'SSE menjaga satu koneksi HTTP terbuka, jadi server bisa mengalirkan kabar satu arah.',
          ),
          hints: [t('Ingat radio yang cukup dinyalakan sekali.', 'Cari teknik yang tidak mengulang pertanyaan.')],
          tags: ['sse'],
        }),
      ),
      conceptStep({
        title: t('Cara pakai di browser', 'EventSource dan text/event-stream'),
        modes: ['pro'],
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b05', topic: 'kode-sse' },
        alt: t('Kode EventSource menerima pesan, dan server mengirim text/event-stream.'),
        code: {
          lang: 'js',
          code: 'const sumber = new EventSource("/api/status-pesanan/88");\nsumber.onmessage = (event) => {\n  const data = JSON.parse(event.data);\n  tampilkanStatus(data.status);\n};',
          highlight: [1, 2],
        },
        body: [
          rText('Browser memakai '),
          rCode('EventSource'),
          rText(' untuk berlangganan. Server membalas dengan Content-Type text/event-stream, lalu mengirim baris data yang diakhiri baris kosong.'),
        ],
      }),
      conceptStep({
        title: t('Untung dan batas SSE', 'Fitur bawaan dan batasan SSE'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b05', topic: 'radio' },
        alt: t(
          'SSE menyambung lagi sendiri, tetapi hanya satu arah.',
          'SSE menyambung ulang otomatis dan ramah firewall, tetapi satu arah dan khusus teks.',
        ),
        body: [
          rText(
            'SSE menyambung lagi sendiri kalau sinyal putus. Server bisa mengirim kabar yang masih tersimpan. Jalurnya satu arah, dari server ke browser.',
            'Fitur bawaan SSE: sambung ulang otomatis, kolom id untuk melanjutkan pesan, dan ramah proxy HTTP. Batasannya: hanya satu arah dan hanya teks, bukan biner. EventSource juga tidak bisa menambah header kustom.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b05-l03-q2',
          prompt: t(
            'Sinyalmu putus sebentar. Apa yang SSE lakukan?',
            'Koneksi internet terputus sebentar. Apa yang dilakukan EventSource pada SSE?',
          ),
          choices: [
            {
              id: 'auto',
              label: t('Menyambung lagi secara otomatis', 'Browser menyambung ulang dan memakai id'),
            },
            {
              id: 'p2p',
              label: t('Berhenti sampai kamu membuka ulang halaman', 'Browser berhenti sampai halaman dimuat ulang'),
              explainWrong: t(
                'SSE menyambung lagi sendiri. Kamu tidak perlu membuka ulang halaman.',
                'EventSource punya sambung ulang otomatis, jadi halaman tidak perlu dimuat ulang.',
              ),
            },
            {
              id: 'bin',
              label: t('Mengulang semua kabar dari awal', 'Server mengulang semua kabar dari awal'),
              explainWrong: t(
                'SSE menyambung lagi. Aplikasi bisa meminta kabar yang terlewat.',
                'Browser bisa mengirim ID terakhir. Server perlu menyimpan kabar dan mendukung pemulihan untuk melanjutkan.',
              ),
            },
          ],
          answer: 'auto',
          explainCorrect: t(
            'SSE menyambung sendiri. Server bisa mengulang kabar yang masih tersimpan.',
            'EventSource menyambung ulang. Server dapat memakai ID terakhir untuk mengirim kabar yang terlewat.',
          ),
          hints: [t('Ingat radio yang kembali jernih setelah terowongan.', 'Ingat fitur bawaan yang ada di kartu sebelumnya.')],
          tags: ['sse', 'browser'],
        }),
      ),
      limitStep({
        analogy: t('SSE seperti mendengarkan siaran radio FM'),
        same: [
          t(
            'Kamu memilih saluran sekali, lalu kabar mengalir terus.',
            'Kamu berlangganan sekali, lalu kabar mengalir terus dari pemancar ke pendengar.',
          ),
        ],
        different: [
          t(
            'Radio putus di terowongan, tetapi SSE menyambung lagi sendiri.',
            'SSE menyambung ulang. Server bisa mengirim kabar terlewat kalau menyimpan pesannya dan memakai ID.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'balap-realtime',
        t(
          'Lihat baris "SSE (Radio)" saat kamu menekan Kirim Kabar Baru.',
          'Tekan Kirim Kabar Baru, lalu amati satu koneksi terbuka di baris SSE.',
        ),
      ),
      qStep(
        makeTf({
          id: 'b05-l03-q3',
          prompt: t(
            'Saluran SSE bisa dipakai untuk mengirim foto balik.',
            'Saluran SSE bisa dipakai untuk mengunggah file biner.',
          ),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru. Radio hanya menyiarkan satu arah, dan SSE hanya membawa teks.',
            'Pernyataan itu keliru. SSE hanya satu arah (dari server) dan hanya membawa teks, bukan data biner.',
          ),
          explainWrong: t(
            'Radio tidak bisa menerima suaramu. SSE juga hanya mengirim teks ke arahmu.',
            'Saluran SSE hanya satu arah dan hanya mendukung teks. Untuk mengunggah file, pakai request biasa.',
          ),
          hints: [t('Ingat: radio hanya menyiarkan, tidak mendengar.', 'Ingat dua batasan SSE: arah dan jenis data.')],
          tags: ['sse'],
        }),
      ),
      qStep({
        id: 'b05-l03-q4',
        type: 'hotspot',
        modes: ['pro'],
        prompt: t('Ketuk kotak yang menggambarkan ciri SSE.'),
        difficulty: 2,
        image: 'b05-hotspot',
        regions: [
          { id: 'r1', shape: 'rect', coords: [10, 10, 260, 50], label: 'Satu arah: Server → Client (hanya teks)' },
          { id: 'r2', shape: 'rect', coords: [10, 60, 260, 100], label: 'Dua arah bebas: Client ↔ Server (biner & teks)' },
          { id: 'r3', shape: 'rect', coords: [10, 110, 260, 150], label: 'Langsung antar dua browser tanpa server' },
        ],
        answer: 'r1',
        explainCorrect: t('SSE mengalirkan kabar teks satu arah dari server lewat HTTP biasa.'),
        explainIncorrect: {
          r2: t('Dua arah bebas untuk teks dan biner adalah ciri WebSocket.'),
          r3: t('Komunikasi langsung antar browser adalah WebRTC.'),
        },
        hints: [t('Ingat arah aliran SSE.'), undefined],
        tags: ['sse'],
      }),
      qStep(
        makeMcq({
          id: 'b05-l03-q5',
          type: 'limit',
          analogy: t('SSE seperti mendengarkan siaran radio FM'),
          prompt: t(
            'Sinyalmu putus di terowongan. Apa kelebihan SSE dibanding radio?',
            'Apa yang dimiliki SSE tetapi tidak dimiliki siaran radio FM saat sinyal terputus?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'id',
              label: t('SSE menyambung lagi dan bisa memulihkan kabar', 'Sambung ulang otomatis dan id untuk kabar yang terlewat'),
            },
            {
              id: 'two',
              label: t('Pendengar bisa berteriak balik di jalur yang sama', 'Pendengar bisa mengirim kabar balik lewat jalur yang sama'),
              explainWrong: t(
                'SSE tetap satu arah. Untuk bicara balik, pakai pesan terpisah.',
                'SSE tetap satu arah. Kabar balik dikirim lewat request terpisah.',
              ),
            },
            {
              id: 'nohttp',
              label: t('SSE bisa menyiarkan video dan gambar', 'Kabar bisa berupa video dan gambar'),
              explainWrong: t(
                'SSE hanya membawa teks. Video butuh cara lain.',
                'SSE hanya membawa teks, bukan video atau gambar.',
              ),
            },
          ],
          answer: 'id',
          explainCorrect: t(
            'SSE menyambung sendiri. Kalau server menyimpan kabarnya, kabar yang terlewat bisa dikirim lagi.',
            'Browser menyambung ulang. Server bisa melanjutkan dari ID terakhir kalau masih menyimpan kabar yang terlewat.',
          ),
          hints: [t('Ingat radio dan terowongan.', 'Pikirkan fitur yang radio FM tidak punya.')],
          tags: ['sse'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l03-q6',
          type: 'scenario',
          story: t(
            'Nadia melihat papan skor sepak bola di HP. Angkanya berubah saat ada gol.',
            'Nadia mengirim satu pertanyaan ke asisten teks. Jawabannya muncul sedikit demi sedikit di layar.',
          ),
          prompt: t('Mengapa SSE cocok untuk papan skor itu?', 'Mengapa SSE cocok untuk mengalirkan jawaban teks itu?'),
          difficulty: 2,
          choices: [
            {
              id: 'fit',
              label: t('Papan menerima skor tanpa mengirim balik', 'Jawaban hanya mengalir satu arah, jadi SSE lebih ringan'),
            },
            {
              id: 'vid',
              label: t('Penonton ikut mencatat setiap gol', 'Browser perlu mengirim masukan pada tiap potongan teks'),
              explainWrong: t(
                'Papan skor mencatat gol dari petugas. Penonton hanya menerima kabarnya.',
                'Jawaban mengalir setelah pertanyaan dikirim. Browser tidak perlu membalas tiap potongan teks.',
              ),
            },
            {
              id: 'poll',
              label: t('Papan harus meminta ulang skor berkala', 'Browser harus meminta setiap potongan teks secara terpisah'),
              explainWrong: t(
                'Papan bisa menerima angka baru tanpa bertanya setiap saat.',
                'Satu sambungan membawa beberapa potongan teks. Request terpisah tidak diperlukan.',
              ),
            },
          ],
          answer: 'fit',
          explainCorrect: t(
            'Skor baru datang dari petugas ke penonton. Seperti kabar dari radio.',
            'Pertanyaan dikirim lewat request HTTP biasa, lalu jawaban mengalir satu arah lewat SSE.',
          ),
          hints: [t('Siapa yang mencatat gol dan siapa yang melihat skor?', 'Perhatikan arah aliran data setelah pertanyaan terkirim.')],
          tags: ['sse'],
        }),
      ),
      qStep({
        id: 'b05-l03-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi kode untuk berlangganan SSE dan jenis kontennya.'),
        difficulty: 2,
        template: 'const sumber = new ___("/api/status");\n// Server menjawab Content-Type: ___',
        bank: ['EventSource', 'text/event-stream', 'application/json', 'WebSocket'],
        answer: ['EventSource', 'text/event-stream'],
        explainCorrect: t('EventSource membuka langganan. Content-Type text/event-stream menandai aliran SSE.'),
        hints: [t('Satu nama kelas browser, satu jenis konten.'), undefined],
        tags: ['sse', 'browser'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b05-l03-r1',
        prompt: t('Ke arah mana kabar SSE mengalir?'),
        choices: [
          { id: 's2c', label: t('Satu arah, dari server ke aplikasi', 'Satu arah, dari server ke browser') },
          {
            id: 'both',
            label: t('Dua arah, seperti telepon', 'Dua arah bersamaan dari keduanya'),
            explainWrong: t(
              'Dua arah di satu jalur adalah ciri telepon, bukan radio.',
              'Dua arah di satu jalur adalah WebSocket.',
            ),
          },
          {
            id: 'p2p',
            label: t('Dari HP ke HP tanpa server', 'Langsung antar dua browser tanpa server'),
            explainWrong: t(
              'Siaran datang dari pemancar. SSE datang dari server.',
              'Komunikasi langsung antar browser adalah WebRTC.',
            ),
          },
        ],
        answer: 's2c',
        explainCorrect: t(
          'Radio hanya menyiarkan. SSE juga hanya mengirim dari server ke aplikasi.',
          'SSE cocok untuk notifikasi, skor langsung, dan jawaban AI yang mengalir kata demi kata.',
        ),
        hints: [t('Ingat: radio hanya menyiarkan.', 'Ingat siapa yang berbicara di SSE.')],
        tags: ['sse'],
      }),
      makeMcq({
        id: 'b05-l03-r2',
        prompt: t('Mana contoh yang cocok untuk siaran SSE?', 'Contoh mana yang paling cocok memakai SSE?'),
        choices: [
          { id: 'ai', label: t('Skor pertandingan yang terus berubah', 'Notifikasi dan jawaban chatbot AI yang mengalir') },
          {
            id: 'vc',
            label: t('Telepon video dengan teman', 'Video call langsung antar dua browser'),
            explainWrong: t(
              'Telepon video butuh dua arah. SSE hanya satu arah.',
              'Video call langsung antar browser memakai WebRTC.',
            ),
          },
          {
            id: 'up',
            label: t('Mengirim foto ke guru', 'Unggah file besar ke server'),
            explainWrong: t(
              'Mengirim foto itu arah balik. SSE hanya menyiarkan.',
              'Unggah file bergerak dari browser ke server. SSE hanya mengalir dari server.',
            ),
          },
        ],
        answer: 'ai',
        explainCorrect: t(
          'Skor hanya perlu diterima. SSE ringan untuk kabar satu arah.',
          'Aliran teks satu arah dari server adalah kekuatan utama SSE.',
        ),
        hints: [t('Cari yang hanya perlu menerima kabar.', 'Cari kasus yang hanya butuh data satu arah.')],
        tags: ['sse'],
      }),
    ],
    recap: t(
      'SSE seperti siaran radio: server mengirim kabar satu arah.',
      'SSE mengalirkan teks satu arah lewat satu koneksi HTTP yang tetap terbuka. Ia ringan dan menyambung ulang otomatis.',
    ),
    companion: {
      talkPrompts: ['Mengapa penyiar radio tidak bisa mendengar suaramu?'],
      offlineActivity: 'Satu orang membacakan langkah resep atau skor bola sepotong demi sepotong (server SSE), sementara yang lain cukup mendengarkan dan mencatat (browser).',
    },
  }),

  makeLesson({
    id: 'b05-l04',
    worldId: 'b05',
    title: 'WebSocket: telepon tersambung',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan telepon dua arah dari radio satu arah.',
      'Kamu bisa menjelaskan handshake WebSocket dan memilih antara WebSocket atau SSE untuk sebuah fitur.',
    ),
    estMinutes: 6,
    introducesTerms: ['websocket'],
    usesTerms: ['sse', 'browser', 'server', 'json', 'https'],
    stickerId: 'telepon',
    warmupFrom: 'b05-l03',
    atWork: 'Kamu akan membuat fitur chat atau editor bersama dengan WebSocket, lalu memeriksa pesannya di tab Network.',
    steps: [
      storyStep('b05/telepon.svg', [
        rText(
          'Di radio kamu hanya bisa mendengar. Untuk mengobrol bolak-balik, kamu butuh telepon yang terus tersambung. Siapa yang boleh bicara?',
          'Editor dokumen bersama harus menampilkan ketikan temanmu seketika. Tetapi ketikanmu juga harus sampai ke teman, jadi SSE satu arah tidak cukup.',
        ),
      ]),
      conceptStep({
        title: t('Telepon dua arah tanpa ditutup', 'Koneksi dua arah WebSocket'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b05', topic: 'websocket-telepon' },
        alt: t(
          'Aplikasi dan server saling berkirim pesan chat di satu telepon.',
          'Setelah handshake, browser dan server bertukar pesan chat dua arah.',
        ),
        body: [
          rTerm('websocket', 'WebSocket', 'WebSocket'),
          rText(
            ' adalah telepon yang terus tersambung. Aplikasi dan server boleh bicara kapan saja, bahkan bersamaan.',
            ' adalah koneksi dua arah (full-duplex) yang tetap terbuka setelah handshake awal. Browser dan server bisa mengirim teks maupun data biner kapan saja, bersamaan.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b05-l04-q1',
          type: 'analogy',
          prompt: t(
            'Bito dan Rani mau saling membalas pesan dengan cepat. Saluran mana yang cocok?',
            'SSE ibarat radio satu arah. WebSocket paling tepat diibaratkan apa?',
          ),
          choices: [
            { id: 'tel', label: t('WebSocket, telepon yang tersambung', 'Telepon yang tetap tersambung dua arah') },
            {
              id: 'sur',
              label: t('Surat yang amplopnya diganti tiap kata', 'Surat pos dengan amplop baru tiap kata'),
              explainWrong: t(
                'Surat berulang mirip tanya berulang. Telepon tetap tersambung.',
                'Surat yang diganti amplop tiap kata mirip request HTTP berulang, bukan WebSocket.',
              ),
            },
            {
              id: 'rad',
              label: t('Radio yang tidak punya tombol kirim', 'Radio tanpa tombol kirim'),
              explainWrong: t(
                'Radio tanpa tombol kirim adalah SSE. Telepon bisa dua arah.',
                'Itu analogi untuk SSE.',
              ),
            },
          ],
          answer: 'tel',
          explainCorrect: t(
            'Telepon tersambung dua arah, seperti WebSocket. Kedua pihak bisa bicara kapan saja.',
            'Setelah handshake berhasil, jalur WebSocket tetap terbuka dua arah.',
          ),
          hints: [t('Ingat telepon yang tetap tersambung.', 'Cari ibarat untuk koneksi yang tetap terbuka dua arah.')],
          tags: ['websocket'],
        }),
      ),
      conceptStep({
        title: t('Jabat tangan dan alamat aman', 'Handshake 101 dan kode WebSocket'),
        modes: ['pro'],
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b05', topic: 'handshake-ws' },
        alt: t('Kode new WebSocket("wss://chat.toko-rani.example/ruang/7") dengan onopen dan onmessage.'),
        code: {
          lang: 'js',
          code: 'const soket = new WebSocket("wss://chat.toko-rani.example/ruang/7");\nsoket.onopen = () => soket.send(JSON.stringify({ jenis: "gabung", nama: "Rani" }));\nsoket.onmessage = (e) => tampilkan(JSON.parse(e.data));',
          highlight: [1, 2],
        },
        body: [
          rText(
            'Koneksi dimulai dari request HTTP Upgrade. Server membalas 101 Switching Protocols, lalu jalur berubah menjadi WebSocket. Di aplikasi sungguhan, pakai wss:// yang terenkripsi.',
          ),
        ],
      }),
      conceptStep({
        title: t('Radio SSE atau telepon WebSocket?', 'Memilih SSE atau WebSocket'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b05', topic: 'telepon' },
        alt: t(
          'Radio untuk satu arah. Telepon untuk dua arah.',
          'SSE untuk kabar satu arah, WebSocket untuk dua arah aktif.',
        ),
        body: [
          rText(
            'Pilih radio SSE kalau hanya server yang bicara. Pilih telepon WebSocket kalau dua pihak sering mengobrol cepat.',
            'Pilih SSE bila hanya server yang banyak bicara. WebSocket lebih rumit karena sambung ulang dan heartbeat (pesan kecil tanda koneksi masih hidup) harus dibuat sendiri. Untuk banyak server, perlu broker seperti Redis Pub/Sub.',
          ),
        ],
      }),
      qStep({
        id: 'b05-l04-q2',
        type: 'sort',
        prompt: t(
          'Kelompokkan tiap fitur ke radio atau telepon.',
          'Pilih teknologi yang paling cocok untuk tiap fitur: SSE atau WebSocket?',
        ),
        difficulty: 2,
        items: [
          { id: 's1', label: t('Pengumuman jadwal bus', 'Notifikasi berita dan status paket') },
          { id: 'w1', label: t('Chat grup dan tanda sedang mengetik', 'Chat grup dan indikator "sedang mengetik"') },
          { id: 's2', label: t('Papan skor pertandingan langsung', 'Jawaban chatbot AI muncul kata demi kata') },
          { id: 'w2', label: t('Game bersama dan papan tulis bersama', 'Game multipemain dan papan tulis kolaborasi') },
        ],
        bins: [
          { id: 'sse', label: t('Radio SSE', 'SSE'), icon: 'radio' },
          { id: 'ws', label: t('Telepon WebSocket', 'WebSocket'), icon: 'phone' },
        ],
        answer: { s1: 'sse', w1: 'ws', s2: 'sse', w2: 'ws' },
        explainCorrect: t(
          'Kalau hanya mendengar, pakai radio. Kalau saling bicara, pakai telepon.',
          'Satu arah dari server cukup dengan SSE. Chat dan kolaborasi butuh WebSocket.',
        ),
        hints: [t('Siapa yang bicara: satu pihak atau dua?', 'Tanya dulu: apakah browser perlu mengirim sering?'), undefined],
        tags: ['sse', 'websocket'],
      }),
      limitStep({
        analogy: t('WebSocket seperti telepon yang tetap tersambung', 'WebSocket seperti panggilan telepon yang tetap tersambung'),
        same: [
          t(
            'Setelah diangkat, kalian bisa bicara tanpa menelepon ulang.',
            'Setelah handshake, kedua pihak saling mengirim pesan seketika tanpa menghubungi ulang.',
          ),
        ],
        different: [
          t(
            '100.000 telepon terbuka sekaligus membuat server sangat berat.',
            'WebSocket hanyalah pipa mentah: format pesan dan sambung ulang kamu buat sendiri. Untuk 100.000 orang, server menjaga 100.000 koneksi terbuka.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'balap-realtime',
        t(
          'Ketuk Kirim Kabar Baru dan lihat baris telepon bertukar pesan dua arah.',
          'Ketuk Kirim Kabar Baru, lalu amati pesan dua arah di baris WebSocket.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'b05-l04-q3',
          modes: ['pro'],
          prompt: t('Awalan alamat WebSocket mana yang terenkripsi dan wajib dipakai di aplikasi sungguhan?'),
          choices: [
            { id: 'wss', label: t('wss://') },
            {
              id: 'ws',
              label: t('ws://'),
              explainWrong: t('ws:// tidak terenkripsi, seperti HTTP biasa.'),
            },
            {
              id: 'ftp',
              label: t('https://'),
              explainWrong: t('https:// dipakai untuk halaman web biasa. WebSocket memakai awalan sendiri.'),
            },
          ],
          answer: 'wss',
          explainCorrect: t('wss:// mengenkripsi pesan WebSocket, seperti HTTPS mengenkripsi HTTP.'),
          hints: [t('Ingat perbedaan HTTP dan HTTPS.')],
          tags: ['websocket', 'https'],
        }),
      ),
      qStep(
        makeTf({
          id: 'b05-l04-q4',
          modes: ['pro'],
          prompt: t('WebSocket mentah di browser otomatis menyediakan ruang chat, sambung ulang, dan format pesan.'),
          answer: false,
          explainCorrect: t('WebSocket hanya pipa pesan. Room, reconnect, dan format dibuat sendiri atau lewat library seperti Socket.IO.'),
          explainWrong: t('WebSocket hanyalah pipa dua arah. Ia tidak mengatur bentuk pesan atau ruang chat.'),
          hints: [t('Apakah pipa mentah sudah punya fitur siap pakai?')],
          tags: ['websocket'],
        }),
      ),
      qStep(
        makeTf({
          id: 'b05-l04-q8j',
          modes: ['junior'],
          prompt: t('Game balapan langsung cukup menyiarkan posisi pemain dari server ke layar.'),
          answer: false,
          explainCorrect: t('Game juga perlu menerima gerakan dari pemain. Server lalu membagikan posisi baru.'),
          explainWrong: t('Pemain mengirim gerakan, lalu server mengirim posisi baru. Keduanya perlu bertukar kabar.'),
          hints: [t('Ingat telepon yang tetap tersambung.')],
          tags: ['websocket'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l04-q5',
          type: 'limit',
          analogy: t('WebSocket seperti panggilan telepon antar dua pihak'),
          prompt: t(
            '100.000 telepon dibiarkan terbuka sekaligus. Apa yang terjadi pada server?',
            'Mengapa menjalankan WebSocket untuk chat besar tidak semudah membiarkan telepon menyala?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'scale',
              label: t('Server sangat sibuk menjaga semua telepon', 'Memori terpakai tiap koneksi, dan pesan harus disinkronkan'),
            },
            {
              id: 'one',
              label: t('Server tetap ringan seperti biasa', 'WebSocket hanya bisa mengirim satu pesan, lalu langsung mati'),
              explainWrong: t(
                'Setiap telepon yang terbuka memakai tenaga server. Jadi bebannya naik.',
                'WebSocket justru terus terbuka untuk jutaan pesan.',
              ),
            },
            {
              id: 'html',
              label: t('Server menutup semua telepon sendiri', 'Koneksi WebSocket otomatis tertutup setelah 1 menit'),
              explainWrong: t(
                'Server tidak menutup sendiri. Ia harus terus menjaga semuanya.',
                'Koneksi WebSocket tetap terbuka, walau perlu heartbeat agar tidak diputus proxy.',
              ),
            },
          ],
          answer: 'scale',
          explainCorrect: t(
            'Setiap telepon terbuka memakan tenaga server. Makin banyak telepon, makin berat.',
            'Ratusan ribu koneksi terbuka memakan memori server. Pesan antarserver perlu broker seperti Redis Pub/Sub.',
          ),
          hints: [t('Bayangkan satu petugas menjaga 100.000 telepon.', 'Hitung memori untuk satu koneksi dikali jumlah orang.')],
          tags: ['websocket', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l04-q6',
          type: 'scenario',
          story: t(
            'Dimas dan Sari menulis dokumen bersama. Keduanya melihat ketikan teman seketika.',
            'Dimas dan Sari membuat editor dokumen bersama. Keduanya melihat ketikan dan kursor teman bergerak seketika.',
          ),
          prompt: t('Cara mana yang paling cocok?', 'Teknologi realtime mana yang paling tepat di sini?'),
          difficulty: 2,
          choices: [
            { id: 'ws', label: t('Telepon WebSocket dua arah', 'WebSocket') },
            {
              id: 'sse',
              label: t('Radio SSE yang hanya satu arah', 'SSE tanpa pesan balik'),
              explainWrong: t(
                'Radio hanya mengirim ke arahmu. Kalian berdua perlu mengirim ketikan.',
                'Di editor bersama, setiap orang aktif mengirim ketikan.',
              ),
            },
            {
              id: 'poll',
              label: t('Bertanya tiap 10 detik', 'Polling tiap 10 detik'),
              explainWrong: t(
                'Bertanya tiap 10 detik terasa patah-patah. Ketikan harus muncul seketika.',
                'Jeda 10 detik membuat kolaborasi terasa patah-patah.',
              ),
            },
          ],
          answer: 'ws',
          explainCorrect: t(
            'Keduanya mengirim dan menerima ketikan. Karena itu butuh telepon dua arah.',
            'Editor bersama butuh jalur dua arah yang sangat cepat dari kedua sisi.',
          ),
          hints: [t('Siapa yang mengirim ketikan: satu orang atau dua?', 'Lihat berapa pihak yang mengirim data.')],
          tags: ['websocket'],
        }),
      ),
      qStep({
        id: 'b05-l04-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Ketik angka status HTTP yang dikirim server saat menyetujui perpindahan ke WebSocket.'),
        difficulty: 2,
        accept: ['101'],
        explainCorrect: t('101 Switching Protocols menandai handshake HTTP selesai dan jalur berubah menjadi WebSocket.'),
        hints: [t('Angka itu ada di kartu handshake.'), undefined],
        tags: ['websocket', 'status-code'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b05-l04-r1',
        prompt: t(
          'Siapa yang boleh bicara di telepon yang tersambung?',
          'Apa istilah untuk koneksi yang membolehkan dua pihak mengirim pesan kapan saja, bersamaan?',
        ),
        choices: [
          { id: 'fd', label: t('Kedua pihak, kapan saja', 'Full-duplex') },
          {
            id: 'st',
            label: t('Hanya pihak yang menelepon', 'Satu arah seperti SSE'),
            explainWrong: t(
              'Di telepon tersambung, kedua pihak boleh bicara.',
              'SSE mengalirkan kabar dari server saja.',
            ),
          },
          {
            id: 'turn',
            label: t('Bergantian, satu pihak tiap menit', 'Tanya-jawab seperti HTTP'),
            explainWrong: t(
              'Tidak ada giliran tetap. Keduanya bisa bicara kapan saja.',
              'Tanya-jawab menunggu permintaan. Di sini kedua pihak bisa mulai mengirim kapan saja.',
            ),
          },
        ],
        answer: 'fd',
        explainCorrect: t(
          'Kedua pihak bebas bicara. Itulah arti dua arah pada telepon tersambung.',
          'Full-duplex berarti dua arah berlangsung serentak dalam satu jalur.',
        ),
        hints: [t('Ingat telepon, bukan radio.', 'Cari istilah dua arah sekaligus di kartu pertama.')],
        tags: ['websocket'],
      }),
      makeMcq({
        id: 'b05-l04-r2',
        prompt: t('Kapan kamu memilih radio, dan kapan telepon?', 'Aturan praktis apa untuk memilih antara SSE dan WebSocket?'),
        choices: [
          {
            id: 'rule',
            label: t('Radio untuk mendengar, telepon untuk saling bicara', 'SSE bila hanya server bicara, WebSocket bila keduanya aktif'),
          },
          {
            id: 'always',
            label: t('Telepon untuk mendengar, radio untuk saling bicara', 'WebSocket selalu lebih cepat, jadi pilih untuk semua kabar'),
            explainWrong: t(
              'Terbalik. Radio hanya mendengar, telepon dua arah.',
              'WebSocket menambah tanggung jawab seperti menyambung ulang. SSE bisa lebih sederhana untuk kabar satu arah.',
            ),
          },
          {
            id: 'same',
            label: t('Keduanya sama saja, pilih sesuka hati', 'SSE untuk mengalirkan pesan biner langsung'),
            explainWrong: t(
              'Keduanya berbeda arah. Pilihannya mengikuti siapa yang bicara.',
              'SSE membawa teks dari server. WebSocket juga bisa mengirim pesan biner.',
            ),
          },
        ],
        answer: 'rule',
        explainCorrect: t(
          'Radio cukup untuk mendengar. Telepon dipakai kalau keduanya saling bicara.',
          'Memilih alat sesuai arah komunikasi membuat server lebih ringan dan sederhana.',
        ),
        hints: [t('Tanyakan siapa yang bicara.', 'Mulai dari arah komunikasi.')],
        tags: ['sse', 'websocket'],
      }),
    ],
    recap: t(
      'WebSocket adalah telepon dua arah yang terus tersambung.',
      'WebSocket dimulai dengan handshake HTTP 101 yang membuka jalur dua arah. Cocok saat browser dan server sama-sama aktif mengirim.',
    ),
    companion: {
      talkPrompts: ['Kapan kamu memilih radio, dan kapan telepon?'],
      offlineActivity: 'Pakai telepon mainan. Minta temanmu menjawab sebelum mulai mengobrol. Coba bicara bergantian, lalu coba bicara bersamaan.',
    },
  }),

  makeLesson({
    id: 'b05-l05',
    worldId: 'b05',
    title: 'WebRTC: walkie-talkie',
    modes: ['pro'],
    objective: t('Kamu bisa menjelaskan cara kerja WebRTC dan peran signaling, STUN, serta TURN.'),
    estMinutes: 6,
    introducesTerms: ['webrtc'],
    usesTerms: ['websocket', 'server', 'browser'],
    stickerId: 'walkie-talkie',
    warmupFrom: 'b05-l04',
    atWork: 'Kamu akan menyiapkan signaling, STUN, dan TURN saat membuat fitur video call di aplikasi.',
    steps: [
      storyStep('b05/walkie-talkie.svg', [
        rText(
          'Video call antar dua orang terasa lambat dan mahal kalau semua video lewat satu server. WebRTC adalah cara menghubungkan dua browser langsung, seperti walkie-talkie.',
        ),
      ]),
      conceptStep({
        title: t('Peer-to-peer antar browser'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b05', topic: 'walkie-talkie' },
        alt: t('Dua browser bertukar video dan suara langsung lewat WebRTC.'),
        body: [
          rTerm('webrtc', 'WebRTC'),
          rText(' (Web Real-Time Communication) mengirim suara, video, dan data langsung antar dua browser. Hubungan langsung seperti ini disebut '),
          rBold('peer-to-peer'),
          rText(', dan jedanya sangat kecil. Video tidak perlu lewat server pusat.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b05-l05-q1',
          type: 'analogy',
          prompt: t('Mengapa WebRTC lebih mirip walkie-talkie daripada telepon lewat operator?'),
          choices: [
            { id: 'p2p', label: t('Setelah berkenalan, video mengalir langsung antar browser') },
            {
              id: 'rad',
              label: t('Kabar hanya mengalir satu arah dari server pusat'),
              explainWrong: t('Satu arah dari server adalah ciri SSE.'),
            },
            {
              id: 'poll',
              label: t('Ia bertanya ulang ke server setiap 5 detik'),
              explainWrong: t('Itu cara kerja polling.'),
            },
          ],
          answer: 'p2p',
          explainCorrect: t('Koneksi langsung mengurangi beban video di server dan memperkecil jeda.'),
          hints: [t('Ingat walkie-talkie: tidak ada operator di tengah.')],
          tags: ['webrtc'],
        }),
      ),
      conceptStep({
        title: t('Signaling: perkenalan awal'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b05', topic: 'signaling-webrtc' },
        alt: t('Browser Rani dan Dimas bertukar offer dan answer lewat signaling server sebelum bicara langsung.'),
        body: [
          rText('Dua browser awalnya belum tahu alamat satu sama lain, jadi mereka butuh '),
          rBold('signaling server'),
          rText(' sebagai penghubung. Server ini bisa memakai '),
          rTerm('websocket', 'WebSocket'),
          rText(' untuk bertukar info perkenalan (offer dan answer). Setelah tersambung, signaling server tidak ikut mengobrol.'),
        ],
      }),
      conceptStep({
        title: t('STUN dan TURN server'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b05', topic: 'stun-turn' },
        alt: t('STUN menanyakan alamat publik di balik router. TURN menjadi jalur cadangan bila firewall ketat.'),
        body: [
          rBold('STUN server'),
          rText(' memberi tahu browser alamat luarnya yang tersembunyi di balik router Wi-Fi. '),
          rBold('TURN server'),
          rText(' menjadi jalur cadangan bila firewall menghalangi sambungan langsung.'),
        ],
      }),
      qStep({
        id: 'b05-l05-q2',
        type: 'match',
        prompt: t('Pasangkan tiga server pendukung WebRTC dengan perannya.'),
        difficulty: 2,
        left: [
          { id: 'sig', label: t('Signaling server') },
          { id: 'stun', label: t('STUN server') },
          { id: 'turn', label: t('TURN server') },
        ],
        right: [
          { id: 'r_turn', label: t('Jalur cadangan saat firewall menolak sambungan langsung') },
          { id: 'r_sig', label: t('Penghubung perkenalan (offer dan answer) di awal') },
          { id: 'r_stun', label: t('Memberi tahu alamat IP publik di balik router') },
        ],
        answer: { sig: 'r_sig', stun: 'r_stun', turn: 'r_turn' },
        explainCorrect: t('Signaling untuk perkenalan, STUN untuk alamat luar, TURN untuk cadangan.'),
        hints: [t('Satu mengenalkan, satu mencari alamat, satu menjadi cadangan.'), undefined],
        tags: ['webrtc', 'server'],
      }),
      limitStep({
        analogy: t('WebRTC seperti walkie-talkie langsung antar teman tanpa operator'),
        same: [t('Setelah tahu jalur satu sama lain, data mengalir langsung dengan jeda sangat kecil.')],
        different: [
          t('Walau disebut peer-to-peer, WebRTC tetap butuh signaling dan STUN di awal, dan TURN bila firewall ketat.'),
          t('Video call grup besar biasanya memakai media server (SFU) yang membagikan video ke semua peserta.'),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'balap-realtime',
        t('Bandingkan alur lewat server di simulator dengan komunikasi langsung WebRTC.'),
      ),
      qStep({
        id: 'b05-l05-q3',
        type: 'order',
        prompt: t('Urutkan tahap awal panggilan video WebRTC antara Rani dan Dimas.'),
        difficulty: 2,
        items: [
          { id: 's3', label: t('Dimas membalas dengan answer lewat signaling server') },
          { id: 's1', label: t('Rani mengecek alamat luarnya lewat STUN dan menyiapkan offer') },
          { id: 's4', label: t('Video dan suara mengalir langsung antar browser') },
          { id: 's2', label: t('Signaling server meneruskan offer Rani ke Dimas') },
        ],
        answer: ['s1', 's2', 's3', 's4'],
        explainCorrect: t('Urutannya: STUN dan offer, signaling, answer, lalu jalur langsung terbuka.'),
        hints: [t('Perkenalan lewat server dulu, video belakangan.'), undefined],
        tags: ['webrtc'],
      }),
      qStep(
        makeTf({
          id: 'b05-l05-q4',
          prompt: t('Setelah terhubung lewat WebRTC, video tetap harus lewat signaling server.'),
          answer: false,
          explainCorrect: t('Pernyataan itu keliru. Signaling hanya memperkenalkan di awal, lalu video mengalir langsung.'),
          explainWrong: t('Signaling server hanya penghubung awal dan tidak ikut membawa aliran video.'),
          hints: [t('Kapan signaling server dibutuhkan: awal atau sepanjang panggilan?')],
          tags: ['webrtc', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l05-q5',
          type: 'limit',
          analogy: t('WebRTC seperti walkie-talkie langsung tanpa server sama sekali'),
          prompt: t('Mengapa kesimpulan "WebRTC jalan tanpa server apa pun" itu keliru?'),
          difficulty: 2,
          choices: [
            { id: 'srv', label: t('Butuh signaling, STUN, dan TURN agar dua browser bertemu') },
            {
              id: 'html',
              label: t('Browser butuh server untuk memuat file CSS dan gambar halaman'),
              explainWrong: t('Server yang dimaksud khusus untuk signaling, STUN, dan TURN.'),
            },
            {
              id: 'xml',
              label: t('Video tetap harus lewat server pusat'),
              explainWrong: t('Setelah tersambung, video mengalir langsung antar browser.'),
            },
          ],
          answer: 'srv',
          explainCorrect: t('Tanpa server perkenalan dan penemu alamat, dua browser di rumah berbeda tidak bisa saling menemukan.'),
          hints: [t('Ingat tiga server di kartu sebelumnya.')],
          tags: ['webrtc', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l05-q6',
          type: 'scenario',
          story: t('Nadia menelepon Raka lewat video call WebRTC. Wi-Fi kantor Raka memakai firewall ketat yang memblokir sambungan langsung dari luar.'),
          prompt: t('Komponen mana yang menyelamatkan panggilan itu?'),
          difficulty: 2,
          choices: [
            { id: 'turn', label: t('TURN server sebagai jalur cadangan') },
            {
              id: 'poll',
              label: t('Polling tiap 5 detik sebagai pengganti video'),
              explainWrong: t('Polling HTTP tidak bisa mengalirkan video langsung.'),
            },
            {
              id: 'css',
              label: t('Signaling server yang membawa video'),
              explainWrong: t('Signaling hanya memperkenalkan di awal, bukan membawa video.'),
            },
          ],
          answer: 'turn',
          explainCorrect: t('TURN meneruskan data saat jalur langsung gagal. Jalurnya lebih lambat dan memakan biaya server.'),
          hints: [t('Cari server cadangan saat firewall ketat.')],
          tags: ['webrtc', 'server'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b05-l05-r1',
        prompt: t('Teknologi apa yang paling sering dipakai signaling server untuk mempertemukan dua browser?'),
        choices: [
          { id: 'ws', label: t('WebSocket') },
          {
            id: 'soap',
            label: t('Long polling'),
            explainWrong: t('Long polling hanya satu pertanyaan per jawaban. Signaling butuh pesan dua arah yang cepat.'),
          },
          {
            id: 'sse',
            label: t('SSE'),
            explainWrong: t('SSE hanya satu arah. Signaling perlu pesan dari dua arah.'),
          },
        ],
        answer: 'ws',
        explainCorrect: t('WebSocket sering dipakai untuk bertukar offer dan answer di signaling server.'),
        hints: [t('Cari teknologi dua arah.')],
        tags: ['webrtc', 'websocket'],
      }),
      makeMcq({
        id: 'b05-l05-r2',
        prompt: t('Apa kegunaan utama WebRTC di aplikasi web?'),
        choices: [
          { id: 'vc', label: t('Video call dan transfer file langsung antar browser') },
          {
            id: 'auth',
            label: t('Menggantikan login dan penyimpanan data pesanan'),
            explainWrong: t('WebRTC berfokus pada komunikasi suara, video, dan data antar peserta.'),
          },
          {
            id: 'cache',
            label: t('Mempercepat halaman dengan menyimpan salinan sementara'),
            explainWrong: t('Itu tugas cache. WebRTC berfokus pada komunikasi langsung.'),
          },
        ],
        answer: 'vc',
        explainCorrect: t('WebRTC adalah standar web untuk komunikasi suara, video, dan data langsung dengan jeda kecil.'),
        hints: [t('Ingat walkie-talkie antar browser.')],
        tags: ['webrtc'],
      }),
    ],
    recap: t(
      'WebRTC mengalirkan video, suara, dan data langsung antar browser. Signaling, STUN, dan TURN membantu perkenalan, alamat, dan cadangan.',
    ),
  }),
];
