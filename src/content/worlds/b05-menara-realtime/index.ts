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
  id: 'b05',
  track: 'B',
  order: 5,
  title: 'Menara Realtime',
  tagline: t(
    'Mengirim kabar langsung lewat siaran radio SSE dan telepon WebSocket.',
    'Membedakan Polling, Long Polling, SSE (EventSource), WebSocket full-duplex, dan WebRTC.',
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
      'Halo penjaga sinyal! Buktikan kamu bisa membedakan tanya berulang, radio SSE, dan telepon WebSocket!',
      'Uji penguasaanmu tentang Polling, Long Polling, SSE, WebSocket handshake/full-duplex, dan arsitektur WebRTC.',
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
        prompt: t('Mengapa teknik Polling yang bertanya setiap beberapa detik boros kuota dan baterai?'),
        choices: [
          { id: 'empty', label: t('Karena tetap mengirim banyak permintaan walau sering kali belum ada kabar baru') },
          { id: 'vid', label: t('Karena otomatis memutar video beresolusi tinggi'), explainWrong: t('Polling hanya mengecek data berulang kali, bukan memutar video.') },
          { id: 'css', label: t('Karena mengganti warna latar tiap detik'), explainWrong: t('Beban utamanya berasal dari permintaan jaringan berulang.') },
        ],
        answer: 'empty',
        explainCorrect: t('Tepat! Sebagian besar pertanyaan berulang di Polling pulang dengan jawaban kosong yang sia-sia.'),
        tags: ['polling'],
      }),
      makeAnchorMcq({
        id: 'b05-anc-j2',
        prompt: t('Pada teknik Long Polling, apa yang dilakukan server ketika belum ada kabar baru?'),
        choices: [
          { id: 'hold', label: t('Menahan jawaban tetap menunggu hingga ada kabar atau batas waktu habis') },
          { id: 'err', label: t('Langsung memutus aplikasi dengan error 404'), explainWrong: t('Server justru menahan permintaan agar tidak cepat membalas kosong.') },
          { id: 'del', label: t('Menghapus pesan milik pengguna'), explainWrong: t('Server hanya menunggu datangnya data baru.') },
        ],
        answer: 'hold',
        explainCorrect: t('Benar! Long polling menahan respons sampai benar-benar ada pembaruan.'),
        tags: ['long-polling'],
      }),
      makeAnchorMcq({
        id: 'b05-anc-j3',
        prompt: t('Siapa saja yang bisa mengirim pesan lewat jalur siaran radio SSE (Server-Sent Events)?'),
        choices: [
          { id: 'one', label: t('Hanya satu arah dari server ke browser') },
          { id: 'two', label: t('Dua arah bebas bersamaan seperti telepon'), explainWrong: t('Dua arah bebas bersamaan adalah ciri WebSocket, bukan SSE.') },
          { id: 'p2p', label: t('Langsung antar dua HP tanpa server'), explainWrong: t('Komunikasi langsung antar browser adalah WebRTC.') },
        ],
        answer: 'one',
        explainCorrect: t('Betul! SSE seperti siaran radio: server menyiarkan terus ke pendengar secara satu arah.'),
        tags: ['sse'],
      }),
      makeAnchorMcq({
        id: 'b05-anc-j4',
        prompt: t('Untuk fitur aplikasi chat tempat pengirim dan penerima terus saling membalas cepat, teknologi mana yang paling cocok?'),
        choices: [
          { id: 'ws', label: t('WebSocket (telepon dua arah)') },
          { id: 'sse', label: t('SSE satu arah saja'), explainWrong: t('SSE hanya mengalir dari server ke browser; untuk dua arah aktif lebih pas WebSocket.') },
          { id: 'poll', label: t('Polling tiap 5 menit sekali'), explainWrong: t('Chat akan terasa sangat lambat jika menunggu 5 menit.') },
        ],
        answer: 'ws',
        explainCorrect: t('Tepat! WebSocket menjaga koneksi dua arah tetap terbuka sehingga chat terasa instan.'),
        tags: ['websocket'],
      }),
      makeAnchorMcq({
        id: 'b05-anc-j5',
        prompt: t('Jika layar hanya perlu menerima angka skor pertandingan langsung tanpa mengirim balik data besar, mana yang lebih ringan?'),
        choices: [
          { id: 'sse', label: t('SSE (Server-Sent Events)') },
          { id: 'poll', label: t('Bertanya ulang setiap detik dengan Polling'), explainWrong: t('Polling setiap detik jauh lebih boros daripada satu jalur SSE.') },
          { id: 'soap', label: t('Surat dinas XML SOAP'), explainWrong: t('SOAP bukan untuk streaming skor realtime.') },
        ],
        answer: 'sse',
        explainCorrect: t('Benar! Ketika hanya server yang mengirim kabar, SSE lebih ringan dan otomatis menyambung ulang.'),
        tags: ['sse'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'b05-anc-p1',
        prompt: t('Kapan teknik Polling berkala justru tetap masuk akal dipilih dibanding membangun WebSocket?'),
        choices: [
          { id: 'dash', label: t('Untuk data yang jarang berubah dan tidak butuh pembaruan seketika, seperti dasbor yang diperbarui tiap menit') },
          { id: 'chat', label: t('Untuk game balapan multipemain berlatensi milidetik'), explainWrong: t('Game multipemain butuh koneksi full-duplex berlatensi rendah seperti WebSocket/WebRTC.') },
          { id: 'ai', label: t('Untuk menampilkan jawaban chatbot AI kata demi kata'), explainWrong: t('Streaming kata demi kata jauh lebih halus dengan SSE.') },
        ],
        answer: 'dash',
        explainCorrect: t('Tepat. Polling sangat mudah dibuat dan memadai bila jeda beberapa puluh detik atau menit tidak masalah.'),
        tags: ['polling'],
      }),
      makeAnchorMcq({
        id: 'b05-anc-p2',
        prompt: t('Keterbatasan apa yang dimiliki EventSource bawaan browser pada SSE saat membutuhkan autentikasi berbasis header?'),
        choices: [
          { id: 'hdr', label: t('EventSource bawaan tidak dapat mengirim custom HTTP header seperti Authorization: Bearer') },
          { id: 'http', label: t('EventSource tidak bisa berjalan di atas protokol HTTPS'), explainWrong: t('SSE justru berjalan di atas HTTP/HTTPS biasa.') },
          { id: 'rec', label: t('EventSource tidak punya fitur sambung ulang otomatis'), explainWrong: t('Sambung ulang otomatis justru fitur bawaan EventSource.') },
        ],
        answer: 'hdr',
        explainCorrect: t('Benar. Oleh karena itu SSE sering mengandalkan cookie sesi atau library fetch-streaming bila perlu custom header.'),
        tags: ['sse', 'header-body'],
      }),
      makeAnchorMcq({
        id: 'b05-anc-p3',
        prompt: t('Apa arti pesan ping–pong (heartbeat) yang rutin dikirim pada koneksi WebSocket yang sedang diam?'),
        choices: [
          { id: 'hb', label: t('Memastikan koneksi masih hidup agar tidak diputus diam-diam oleh jaringan atau proxy yang mengira sambungan mati') },
          { id: 'css', label: t('Mengukur kecepatan rendering CSS di browser'), explainWrong: t('Heartbeat berkaitan dengan kelangsungan koneksi jaringan WebSocket.') },
          { id: 'auth', label: t('Menggantikan proses login pengguna'), explainWrong: t('Autentikasi diperiksa saat handshake awal.') },
        ],
        answer: 'hb',
        explainCorrect: t('Tepat. Proxy dan router sering memutus koneksi idle; ping–pong menjaga saluran tetap aktif atau cepat mendeteksi putus.'),
        tags: ['websocket'],
      }),
      makeAnchorMcq({
        id: 'b05-anc-p4',
        prompt: t('Jika aplikasi chat WebSocket sudah membesar menjadi beberapa server backend terpisah, apa yang diperlukan agar pesan tersampaikan lintas server?'),
        choices: [
          { id: 'pub', label: t('Perantara pesan antarsimpul server seperti Redis Pub/Sub') },
          { id: 'html', label: t('Menghapus tag <meta viewport> dari HTML'), explainWrong: t('Viewport tidak berhubungan dengan penskalaan server WebSocket.') },
          { id: 'get', label: t('Mengubah wss:// menjadi http:// tanpa enkripsi'), explainWrong: t('Selalu gunakan wss:// di produksi.') },
        ],
        answer: 'pub',
        explainCorrect: t('Benar. Pengguna A bisa terhubung ke Server 1 dan Pengguna B ke Server 2 sehingga butuh broker seperti Redis Pub/Sub.'),
        tags: ['websocket', 'server'],
      }),
      makeAnchorMcq({
        id: 'b05-anc-p5',
        prompt: t('Pada panggilan video WebRTC, apa fungsi utama STUN server?'),
        choices: [
          { id: 'stun', label: t('Memberi tahu browser alamat IP publik luarnya di balik router/NAT') },
          { id: 'store', label: t('Menyimpan rekaman video pengguna selama setahun'), explainWrong: t('STUN hanya membantu menemukan alamat publik jaringan.') },
          { id: 'css', label: t('Mengompres gambar JSON menjadi Protobuf'), explainWrong: t('STUN berkaitan dengan penemuan alamat jaringan peer-to-peer.') },
        ],
        answer: 'stun',
        explainCorrect: t('Tepat! STUN menjawab pertanyaan "Alamat rumahku kalau dilihat dari luar router Wi-Fi apa?".'),
        tags: ['webrtc'],
      }),
      makeAnchorMcq({
        id: 'b05-anc-p6',
        type: 'limit',
        analogy: t('WebRTC seperti walkie-talkie langsung antar dua orang tanpa operator'),
        prompt: t('Kapan batas analogi "tanpa perantara" pada WebRTC terpaksa dilanggar oleh sistem cadangan TURN?'),
        choices: [
          { id: 'turn', label: t('Saat firewall atau NAT jaringan terlalu ketat sehingga kedua browser gagal terhubung peer-to-peer dan data harus dititipkan lewat TURN server') },
          { id: 'text', label: t('Saat kedua browser hanya bertukar data teks JSON'), explainWrong: t('DataChannel WebRTC bisa membawa teks maupun biner secara peer-to-peer.') },
          { id: 'http', label: t('Saat aplikasi hanya memakai method GET'), explainWrong: t('GET adalah request HTTP biasa, bukan WebRTC.') },
        ],
        answer: 'turn',
        explainCorrect: t('Benar! TURN berfungsi sebagai relai cadangan agar panggilan tetap berjalan meski jalur peer-to-peer diblokir firewall.'),
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
      'Aku bisa menjelaskan cara kerja Polling serta kelebihan dan kekurangannya.',
      'Aku bisa menjelaskan keterbatasan HTTP biasa untuk realtime dan mekanisme serta trade-off Polling.',
    ),
    estMinutes: 5,
    introducesTerms: ['polling'],
    usesTerms: ['api', 'request', 'response', 'server', 'fetch'],
    stickerId: 'tanya-berulang',
    warmupFrom: 'b04-l05',
    steps: [
      storyStep('b05/tanya-berulang.svg', [
        rText(
          'Kamu menunggu paket kurir dengan membuka pintu depan tiap 5 menit: "Udah sampai belum?" Hampir semuanya sia-sia! Kalau kurir datang tepat setelah pintu ditutup, kamu baru tahu 5 menit kemudian.',
          'Di HTTP biasa, client selalu bertanya lebih dulu dan server tidak bisa menyapa tanpa diminta. Teknik paling sederhana untuk meniru kabar langsung adalah menanya berulang setiap beberapa detik: Polling.',
        ),
      ]),
      conceptStep({
        title: t('Masalahnya: Server Tak Bisa Menyapa', 'Keterbatasan HTTP Tanya-Jawab'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b05', topic: 'masalah-http' },
        alt: t('Di HTTP biasa client selalu bertanya lebih dulu, server tidak bisa mengirim kabar tanpa ditanya.'),
        body: [
          rText(
            'Di HTTP biasa, server tidak bisa menyapa duluan. Padahal chat atau status kurir butuh kabar datang langsung.',
            'Fitur seperti chat, notifikasi, posisi kurir, atau streaming jawaban AI butuh layar berubah sendiri saat kabar muncul, sementara HTTP standar menunggu request dari client.',
          ),
        ],
      }),
      conceptStep({
        title: t('Cara Kerja Polling', 'Polling dengan setInterval'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b05', topic: 'polling-berulang' },
        alt: t('Browser mengirim request tiap 5 detik: "Ada pesan baru?" Server menjawab "belum" berkali-kali.'),
        code: {
          lang: 'js',
          code: 'setInterval(async () => {\n  const res = await fetch("/api/notifikasi");\n  tampilkan(await res.json());\n}, 5000); // tanya setiap 5 detik',
          highlight: [1, 2],
        },
        body: [
          rTerm('polling', 'Polling', 'Polling'),
          rText(
            ' berarti client bertanya berulang setiap beberapa detik. Apakah ada pesan baru? Belum. Tanya lagi.',
            ' memanggil endpoint server secara berkala dengan jeda tetap (misal via setInterval dan fetch), tidak peduli apakah data baru benar-benar tersedia atau tidak.',
          ),
        ],
      }),
      conceptStep({
        title: t('Untung, Rugi, dan Kapan Cocok', 'Trade-off Polling'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b05', topic: 'tanya-berulang' },
        alt: t('Polling mudah dibuat tetapi boros request, baterai, kuota, dan terlambat sepanjang jeda.'),
        body: [
          rText(
            'Polling paling mudah dibuat. Tapi cara ini boros kuota dan baterai saat sering bertanya.',
            'Kelebihannya: sangat mudah dibuat dan bekerja di mana saja. Kekurangannya: boros beban server, baterai, serta kuota, dan kabar terlambat sepanjang jeda. Cocok untuk dasbor yang diperbarui tiap menit.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Polling seperti membuka pintu depan tiap 5 menit mengecek kurir'),
        same: [
          t('Mayoritas pemeriksaan berakhir kosong ("belum ada"), dan kabar baru telat diketahui sepanjang jeda waktu.'),
        ],
        different: [
          t('Membuka pintu rumah hanya melelahkan satu orang, sedangkan Polling dari puluhan ribu HP sekaligus bisa membebani server hingga tumbang.'),
          t('Di HP, permintaan jaringan berulang juga cepat menguras kuota internet dan baterai pengguna.'),
        ],
      }),
      simStep(
        'balap-realtime',
        t(
          'Ketuk "Kirim Kabar Baru" di simulator Balap Realtime dan lihat berapa banyak request sia-sia yang dikirim Polling!',
          'Bandingkan jumlah request berulang pada baris Polling dengan satu koneksi SSE/WebSocket di simulator.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'b05-l01-q1',
          type: 'analogy',
          prompt: t('Membuka pintu depan tiap 5 menit untuk mengecek "Paketnya sudah datang belum?" menggambarkan…'),
          choices: [
            { id: 'poll', label: t('Polling') },
            { id: 'sse', label: t('Siaran radio SSE'), explainWrong: t('Pada radio, kamu menyalakan sekali tanpa bolak-balik mengecek pintu.') },
            { id: 'ws', label: t('Telepon WebSocket'), explainWrong: t('WebSocket tersambung terus dua arah tanpa menanya berulang.') },
          ],
          answer: 'poll',
          explainCorrect: t('Tepat! Polling bertanya berulang kali berdasarkan selang waktu tertentu.'),
          tags: ['polling'],
        }),
      ),
      qStep(
        makeTf({
          id: 'b05-l01-q2',
          prompt: t('Pada pola HTTP biasa tanpa teknik realtime, server bebas tiba-tiba mengirim kabar ke browser tanpa pernah ditanya client terlebih dahulu.'),
          answer: false,
          explainCorrect: t('Benar, pernyataan itu salah! Pada HTTP tanya-jawab biasa, client selalu harus memulai request terlebih dahulu.'),
          explainWrong: t('Hampir! Di HTTP standar, server selalu pasif menunggu request dari client.'),
          tags: ['polling', 'server'],
        }),
      ),
      qStep({
        id: 'b05-l01-q3',
        type: 'sort',
        prompt: t('Kelompokkan sifat berikut ke Kelebihan Polling atau Kekurangan Polling:'),
        difficulty: 2,
        items: [
          { id: 'p1', label: t('Sangat mudah dibuat memakai fetch biasa') },
          { id: 'k1', label: t('Banyak permintaan kosong yang membebani server') },
          { id: 'p2', label: t('Bekerja di semua tempat tanpa teknologi khusus') },
          { id: 'k2', label: t('Menguras kuota dan baterai HP pengguna') },
        ],
        bins: [
          { id: 'plus', label: t('Kelebihan Polling') },
          { id: 'minus', label: t('Kekurangan Polling') },
        ],
        answer: { p1: 'plus', k1: 'minus', p2: 'plus', k2: 'minus' },
        explainCorrect: t('Mantap! Mudah dibuat tetapi boros sumber daya saat dipakai untuk data cepat.'),
        tags: ['polling'],
      }),
      qStep(
        makeMcq({
          id: 'b05-l01-q4',
          type: 'limit',
          analogy: t('Polling seperti mengecek pintu depan setiap 5 menit'),
          prompt: t('Dampak apa yang terjadi di aplikasi sungguhan saat 50.000 pengguna melakukan Polling bersamaan yang tidak terlihat di cerita satu rumah?'),
          difficulty: 2,
          choices: [
            { id: 'load', label: t('Server menerima banjir puluhan ribu request kosong per detik dan baterai/kuota pengguna cepat habis') },
            { id: 'door', label: t('Pintu rumah kurir menjadi rusak secara fisik'), explainWrong: t('Tentu bukan pintu fisik; dampaknya pada beban server dan baterai HP.') },
            { id: 'fast', label: t('Kabar datang makin instan tanpa jeda sama sekali'), explainWrong: t('Polling justru tetap memiliki jeda keterlambatan.') },
          ],
          answer: 'load',
          explainCorrect: t('Benar! Skala puluhan ribu client membuat polling singkat sangat boros sumber daya server maupun pengguna.'),
          tags: ['polling', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l01-q5',
          type: 'scenario',
          story: t('Bu Laras meminta dibuatkan layar papan informasi jumlah pengunjung harian di perpustakaan yang cukup diperbarui setiap 2 menit.'),
          prompt: t('Mengapa Polling setiap 2 menit sudah sangat pas untuk kasus ini?'),
          difficulty: 2,
          choices: [
            { id: 'fit', label: t('Karena data jarang berubah dan tidak butuh pembaruan seketika sehingga Polling sederhana sudah cukup') },
            { id: 'chat', label: t('Karena pengunjung saling berbalas chat lewat papan tersebut tiap detik'), explainWrong: t('Ceritanya hanya menampilkan jumlah pengunjung setiap 2 menit.') },
            { id: 'vid', label: t('Karena papan memutar panggilan video antar dua orang'), explainWrong: t('Panggilan video butuh WebRTC, bukan polling.') },
          ],
          answer: 'fit',
          explainCorrect: t('Tepat! Untuk dasbor yang jarang berubah dan jeda menit bukan masalah, Polling jauh lebih sederhana.'),
          tags: ['polling'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l01-q6',
          type: 'why',
          base: 'Polling disetel bertanya ke server setiap 5 detik.',
          prompt: t('Mengapa kabar yang baru saja terjadi di server bisa baru muncul di layar pengguna beberapa detik kemudian?'),
          difficulty: 2,
          choices: [
            { id: 'wait', label: t('Karena client menunggu sampai jadwal tanya 5 detik berikutnya tiba sebelum mengirim request') },
            { id: 'css', label: t('Karena browser butuh 5 detik untuk menggambar warna CSS'), explainWrong: t('Browser menggambar layar dalam milidetik; jeda berasal dari interval polling.') },
            { id: 'json', label: t('Karena teks JSON berjalan lambat di kabel'), explainWrong: t('JSON lewat internet hanya butuh beberapa milidetik.') },
          ],
          answer: 'wait',
          explainCorrect: t('Benar! Jika kabar muncul tepat setelah polling selesai, pengguna baru tahu saat putaran jeda berikutnya tiba.'),
          tags: ['polling'],
        }),
      ),
      qStep({
        id: 'b05-l01-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi potongan kode Polling JavaScript yang memanggil API setiap 5 detik:'),
        difficulty: 2,
        template: '___(async () => {\n  const res = await ___("/api/notifikasi");\n}, 5000);',
        bank: ['setInterval', 'fetch', 'EventSource', 'WebSocket'],
        answer: ['setInterval', 'fetch'],
        explainCorrect: t('Tepat! setInterval mengulang fungsi secara berkala sementara fetch mengirim permintaan HTTP.'),
        tags: ['polling', 'fetch'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b05-l01-r1',
        prompt: t('Apa kelemahan terbesar teknik Polling untuk fitur chat cepat?'),
        choices: [
          { id: 'waste', label: t('Boros request kosong, menguras baterai/kuota, dan kabar terlambat sesuai jeda') },
          { id: 'hard', label: t('Sangat sulit dibuat dan butuh teknologi video khusus'), explainWrong: t('Polling justru paling mudah dibuat.') },
        ],
        answer: 'waste',
        explainCorrect: t('Polling mudah dibuat, tetapi boros jika terus menanya ketika belum ada kabar baru.'),
        tags: ['polling'],
      }),
      makeTf({
        id: 'b05-l01-r2',
        prompt: t('Polling cocok dipakai untuk dasbor data yang jarang berubah dan tidak menuntut kabar seketika.'),
        answer: true,
        explainCorrect: t('Betul! Jeda beberapa puluh detik atau menit sangat cocok ditangani Polling sederhana.'),
        explainWrong: t('Hampir! Untuk data yang jarang berubah, kesederhanaan Polling justru menjadi kelebihannya.'),
        tags: ['polling'],
      }),
    ],
    recap: t(
      'Polling bertanya berulang kali tiap beberapa detik; mudah dibuat tetapi boros jika terlalu sering.',
      'Polling memakai request HTTP berkala (setInterval + fetch); sederhana namun boros beban server dan memiliki keterlambatan sepanjang interval.',
    ),
    companion: {
      talkPrompts: ['Kalau setiap 5 menit kamu terus bertanya "Sudah matang belum?" ke dapur, apa yang dirasakan koki?'],
      offlineActivity: 'Main tebak jam: satu orang berpura-pura menulis pesan rahasia di menit acak, yang lain hanya boleh bertanya "Sudah?" tiap 10 detik untuk merasakan jeda Polling.',
    },
  }),

  makeLesson({
    id: 'b05-l02',
    worldId: 'b05',
    title: 'Long polling: telepon yang ditahan',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menjelaskan cara kerja Long Polling dan bedanya dengan Polling biasa.',
      'Aku bisa menguraikan siklus request ditahan pada Long Polling beserta kelebihan dan bebannya di server.',
    ),
    estMinutes: 5,
    introducesTerms: ['long-polling'],
    usesTerms: ['polling', 'request', 'response', 'server', 'browser'],
    warmupFrom: 'b05-l01',
    steps: [
      storyStep('b05/long-polling.svg', [
        rText(
          'Daripada bolak-balik buka pintu, kamu menelepon kantor kurir dan bilang: "Jangan tutup teleponnya, kabari saya begitu paket keluar!" Petugas diam menahan telepon sampai ada kabar, lalu kamu segera menelepon lagi.',
          'Untuk menghindari puluhan jawaban "belum" yang sia-sia di Polling biasa, Long Polling menahan satu permintaan HTTP sampai server benar-benar punya kabar atau batas waktu habis.',
        ),
      ]),
      conceptStep({
        title: t('Telepon yang Ditahan Server', 'Cara Kerja Long Polling'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b05', topic: 'long-polling-tahan' },
        alt: t('Browser bertanya sekali, server menahan belum menjawab hingga pesan baru tiba.'),
        body: [
          rText('Pada '),
          rTerm('long-polling', 'long polling', 'long polling'),
          rText(
            ', client bertanya sekali. Server menahan jawaban sampai benar-benar ada kabar baru atau waktu habis.',
            ', client mengirim HTTP request dan server sengaja menahannya hingga ada data baru (atau timeout), sehingga tidak mengirim jawaban kosong bertubi-tubi.',
          ),
        ],
      }),
      conceptStep({
        title: t('Tanya Ulang Setelah Terjawab', 'Siklus Tanya Ulang'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b05', topic: 'siklus-long-polling' },
        alt: t('Setelah menerima jawaban atau timeout, browser langsung mengirim request baru lagi.'),
        body: [
          rText(
            'Setelah menerima satu jawaban, client langsung bertanya lagi. Ia bersiap menunggu kabar baru.',
            'Setelah response tiba (atau batas waktu habis), sambungan HTTP itu selesai. Client segera mengirim request baru untuk menunggu kabar selanjutnya.',
          ),
        ],
      }),
      conceptStep({
        title: t('Lebih Cepat, Tapi Menahan Jalur', 'Kelebihan dan Kekurangan'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b05', topic: 'beban-long-polling' },
        alt: t('Long polling memakai HTTP biasa dan hampir seketika, tetapi menahan banyak koneksi menggantung.'),
        body: [
          rText(
            'Kabar sampai hampir seketika lewat HTTP biasa. Namun server harus menahan banyak sambungan menunggu bersamaan.',
            'Kelebihan: kabar hampir seketika dan berjalan di HTTP biasa (cocok untuk sistem lama). Kekurangan: server menahan banyak koneksi menggantung dan tetap ada jeda saat menyambung ulang.',
          ),
        ],
      }),
      limitStep({
        analogy: t('Long polling seperti menahan gagang telepon bersama petugas ekspedisi'),
        same: [
          t('Mengurangi pertanyaan kosong berulang-ulang dan langsung memberi kabar begitu peristiwa terjadi.'),
        ],
        different: [
          t('Pada telepon nyata kamu tidak perlu menutup dan menelepon ulang setelah satu kalimat, sedangkan di HTTP Long Polling setiap satu jawaban mengharuskan request baru.'),
          t('Sambungan internet punya batas waktu (timeout), sehingga jika terlalu lama sepi, server harus membalas "belum ada" dan client menelepon ulang.'),
        ],
      }),
      simStep(
        'balap-realtime',
        t(
          'Lihat perbandingan di simulator: perhatikan bahwa teknik bertahan atau satu jalur hemat jauh lebih sedikit request daripada Polling!',
          'Bandingkan penghematan jumlah request dari teknik polling berulang ke jalur tunggu dan streaming di simulator.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'b05-l02-q1',
          type: 'analogy',
          prompt: t('Menelepon petugas toko dan berkata "Jangan tutup teleponnya sampai paket keluar gudang" adalah analogi untuk…'),
          choices: [
            { id: 'lp', label: t('Long polling') },
            { id: 'p', label: t('Polling biasa tiap 5 detik'), explainWrong: t('Polling biasa langsung menutup jawaban "belum" lalu menunggu jadwal baru.') },
            { id: 'ws', label: t('Walkie-talkie langsung antar browser'), explainWrong: t('Walkie-talkie langsung adalah WebRTC.') },
          ],
          answer: 'lp',
          explainCorrect: t('Tepat! Petugas yang menahan gagang telepon adalah server yang menahan response sampai ada kabar.'),
          tags: ['long-polling'],
        }),
      ),
      qStep({
        id: 'b05-l02-q2',
        type: 'order',
        prompt: t('Urutkan langkah terjadinya satu putaran penuh pada teknik Long Polling:'),
        difficulty: 2,
        items: [
          { id: 's3', label: t('Begitu pesan masuk, server langsung mengirim response ke client') },
          { id: 's1', label: t('Browser mengirim request "ada pesan baru?" ke server') },
          { id: 's4', label: t('Browser segera mengirim request baru lagi untuk kabar berikutnya') },
          { id: 's2', label: t('Server menahan request dan belum menjawab selama pesan belum ada') },
        ],
        answer: ['s1', 's2', 's3', 's4'],
        explainCorrect: t('Sempurna! Tanya → tahan sampai ada kabar → jawab → langsung tanya ulang lagi.'),
        tags: ['long-polling', 'request', 'response'],
      }),
      qStep(
        makeTf({
          id: 'b05-l02-q3',
          prompt: t('Setelah server mengirim satu kabar lewat Long Polling, browser tidak perlu mengirim request baru lagi untuk menerima kabar kedua.'),
          answer: false,
          explainCorrect: t('Benar, itu keliru! Satu request HTTP Long Polling hanya untuk satu jawaban, jadi client harus langsung mengirim request lagi.'),
          explainWrong: t('Hampir! Di Long Polling, setiap kali jawaban diterima, browser harus segera bertanya ulang lagi.'),
          tags: ['long-polling'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l02-q4',
          prompt: t('Apa beban utama yang muncul di sisi server ketika banyak pengguna memakai Long Polling bersamaan?'),
          choices: [
            { id: 'hold', label: t('Server harus menahan banyak koneksi HTTP yang menggantung terbuka sambil menunggu kabar') },
            { id: 'css', label: t('Server harus menggambar ulang CSS setiap halaman'), explainWrong: t('CSS digambar oleh browser, bukan server.') },
            { id: 'nohttp', label: t('Server tidak bisa memakai protokol HTTP lagi'), explainWrong: t('Long polling tetap memakai protokol HTTP biasa.') },
          ],
          answer: 'hold',
          explainCorrect: t('Benar! Menahan ribuan sambungan menggantung memakan memori dan slot koneksi di server.'),
          tags: ['long-polling', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l02-q5',
          type: 'limit',
          analogy: t('Long polling seperti menelepon sambil menahan gagang telepon'),
          prompt: t('Apa yang terjadi pada koneksi HTTP Long Polling apabila dalam waktu lama tidak ada pesan baru sama sekali (tidak seperti telepon yang bisa diam berjam-jam)?'),
          difficulty: 2,
          choices: [
            { id: 'to', label: t('Batas waktu (timeout) tercapai sehingga server menjawab kosong dan client langsung membuka request baru') },
            { id: 'ban', label: t('Server langsung memblokir akun pengguna selamanya'), explainWrong: t('Timeout adalah hal normal di Long Polling dan segera disambung request baru.') },
            { id: 'radio', label: t('Koneksi otomatis berubah menjadi siaran video'), explainWrong: t('Tidak ada perubahan ke video; request baru dikirim lagi.') },
          ],
          answer: 'to',
          explainCorrect: t('Tepat! Karena HTTP punya batas timeout, siklus "timeout → tanya ulang" adalah bagian wajar Long Polling.'),
          tags: ['long-polling'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l02-q6',
          type: 'scenario',
          story: t('Sebuah aplikasi kantor masih memakai server lama yang belum mendukung SSE maupun WebSocket, tetapi butuh notifikasi muncul hampir seketika tanpa boros request seperti Polling biasa.'),
          prompt: t('Teknik realtime manakah yang paling pas dipakai karena tetap berjalan di HTTP biasa?'),
          difficulty: 2,
          choices: [
            { id: 'lp', label: t('Long polling') },
            { id: 'p5', label: t('Polling tiap 30 detik'), explainWrong: t('Jeda 30 detik tidak menghasilkan notifikasi hampir seketika.') },
            { id: 'grpc', label: t('gRPC biner langsung dari browser'), explainWrong: t('Browser tidak mendukung gRPC mentah secara langsung.') },
          ],
          answer: 'lp',
          explainCorrect: t('Benar! Long polling kompatibel hampir di semua infrastruktur HTTP lama sekaligus memberi respons hampir seketika.'),
          tags: ['long-polling'],
        }),
      ),
      qStep({
        id: 'b05-l02-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Ketik istilah bahasa Inggris untuk kondisi "batas waktu tunggu habis" saat server menahan koneksi Long Polling terlalu lama tanpa kabar baru:'),
        difficulty: 2,
        accept: ['timeout'],
        explainCorrect: t('Tepat! Saat timeout tercapai, client segera mengirim permintaan Long Polling baru lagi.'),
        tags: ['long-polling'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b05-l02-r1',
        prompt: t('Bagaimana cara Long Polling mengurangi jumlah permintaan sia-sia dibanding Polling biasa?'),
        choices: [
          { id: 'hold', label: t('Server menahan respons hingga ada data baru atau timeout, baru membalas') },
          { id: 'del', label: t('Server mematikan internet setiap 5 detik'), explainWrong: t('Server menahan koneksi menunggu pembaruan data.') },
        ],
        answer: 'hold',
        explainCorrect: t('Dengan menahan respons, server tidak membalas "belum ada" setiap beberapa detik.'),
        tags: ['long-polling'],
      }),
      makeTf({
        id: 'b05-l02-r2',
        prompt: t('Long polling memiliki tingkat kerumitan dan beban koneksi sedang karena server menahan sambungan terbuka sambil menunggu kabar.'),
        answer: true,
        explainCorrect: t('Betul! Long polling lebih hemat request kosong daripada polling, tapi tetap menahan banyak koneksi menggantung.'),
        explainWrong: t('Hampir! Menahan banyak koneksi menggantung itulah beban utama di sisi server Long Polling.'),
        tags: ['long-polling'],
      }),
    ],
    recap: t(
      'Long polling menahan telepon sampai ada kabar baru lalu langsung menelepon lagi, sehingga lebih cepat daripada Polling.',
      'Long polling menahan request HTTP hingga ada pembaruan atau timeout sebelum client langsung mengirim request berikutnya.',
    ),
    companion: {
      talkPrompts: ['Kalau temanmu menelepon dan bilang "Aku tunggu di telepon sampai kuenya matang ya", bedanya apa dengan menelepon tiap 2 menit?'],
      offlineActivity: 'Lakukan simulasi dua orang: satu jadi server yang diam memegang kaleng telepon mainan sampai ada kertas pesan baru muncul, baru menyebut isinya.',
    },
  }),

  makeLesson({
    id: 'b05-l03',
    worldId: 'b05',
    title: 'SSE: siaran radio',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menjelaskan cara kerja siaran radio SSE satu arah dan kapan memakainya.',
      'Aku bisa menjelaskan standar SSE (EventSource), format text/event-stream, fitur bawaan, dan batasannya.',
    ),
    estMinutes: 6,
    introducesTerms: ['sse'],
    usesTerms: ['polling', 'long-polling', 'browser', 'server', 'json'],
    stickerId: 'radio',
    warmupFrom: 'b05-l02',
    steps: [
      storyStep('b05/radio.svg', [
        rText(
          'Menyalakan radio itu praktis: cukup pilih satu saluran, lalu penyiar terus mengirim kabar ke telingamu tanpa perlu bertanya ulang! Tapi ingat, lewat radio kamu tidak bisa bicara balik ke penyiar.',
          'Server-Sent Events (SSE) membuka satu koneksi HTTP yang dibiarkan tetap terbuka agar server dapat mengalirkan kabar secara seketika dan satu arah ke browser layaknya siaran radio.',
        ),
      ]),
      conceptStep({
        title: t('Siaran Satu Arah dari Server', 'Apa itu SSE?'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b05', topic: 'sse-radio' },
        alt: t('Browser berlangganan sekali, lalu server mengalirkan kabar pesanan diterima, dimasak, diantar.'),
        body: [
          rTerm('sse', 'SSE', 'SSE'),
          rText(
            ' membuka satu jalur tetap. Server terus mengirim kabar baru satu arah ke browser tanpa ditanya ulang.',
            ' (Server-Sent Events) menjaga satu koneksi HTTP tetap terbuka untuk aliran data satu arah dari server ke client, hemat beban, dan seketika.',
          ),
        ],
      }),
      conceptStep({
        title: t('Cara Pakai di Browser', 'EventSource dan text/event-stream'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b05', topic: 'kode-sse' },
        alt: t('Kode JavaScript EventSource menerima pesan event.data dan server mengirim text/event-stream.'),
        code: {
          lang: 'js',
          code: 'const sumber = new EventSource("/api/status-pesanan/88");\nsumber.onmessage = (event) => {\n  const data = JSON.parse(event.data);\n  tampilkanStatus(data.status);\n};',
          highlight: [1, 2],
        },
        body: [
          rText('Browser memakai perintah '),
          rCode('EventSource'),
          rText(
            '. Setiap kabar dari server mengalir otomatis sebagai teks di jalur terbuka.',
            ' untuk berlangganan. Server membalas dengan Content-Type: text/event-stream lalu mengirim baris event dan data diakhiri baris kosong.',
          ),
        ],
      }),
      conceptStep({
        title: t('Kelebihan dan Batasan SSE', 'Fitur Bawaan dan Batasannya'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b05', topic: 'radio' },
        alt: t('SSE otomatis sambung ulang dengan id, ramah firewall, namun satu arah dan khusus teks.'),
        body: [
          rText(
            'SSE otomatis menyambung lagi jika putus. Namun jalurnya hanya satu arah dari server ke browser saja.',
            'Fitur bawaan SSE: sambung ulang otomatis, kolom id pelanjut pesan, serta ramah proxy HTTP. Batasannya: hanya server → client, hanya teks (bukan biner), dan EventSource tidak bisa menambah header kustom.',
          ),
        ],
      }),
      limitStep({
        analogy: t('SSE seperti mendengarkan siaran radio FM satu arah'),
        same: [
          t('Kamu memilih saluran sekali lalu kabar mengalir terus dari pemancar ke pendengar tanpa bicara balik lewat radio.'),
        ],
        different: [
          t('Radio FM tidak tahu kalau suaramu sempat putus saat melewati terowongan, sedangkan SSE punya fitur sambung ulang otomatis plus kolom id agar melanjutkan dari kabar yang terlewat!'),
          t('Kalau pengguna sesekali ingin mengirim perintah balik ke stasiun, browser tetap bisa mengirim request HTTP biasa terpisah.'),
        ],
      }),
      simStep(
        'balap-realtime',
        t(
          'Lihat baris "SSE (Radio)" di simulator saat kamu menekan Kirim Kabar Baru!',
          'Amati efisiensi 1 koneksi terbuka pada baris SSE dibanding banyaknya request di Polling.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'b05-l03-q1',
          type: 'analogy',
          prompt: t('Memilih saluran radio sekali lalu penyiar terus mengirim kabar satu arah menggambarkan teknologi…'),
          choices: [
            { id: 'sse', label: t('SSE (Server-Sent Events)') },
            { id: 'poll', label: t('Polling setiap 5 detik'), explainWrong: t('Polling menanya berulang kali, bukan menyalakan satu saluran terbuka.') },
            { id: 'webrtc', label: t('Walkie-talkie WebRTC'), explainWrong: t('Walkie-talkie berjalan langsung dua arah antar pengguna.') },
          ],
          answer: 'sse',
          explainCorrect: t('Tepat! SSE ibarat radio yang mengalirkan siaran satu arah dari server ke client.'),
          tags: ['sse'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l03-q2',
          prompt: t('Apa keunggulan otomatis yang dimiliki EventSource pada SSE ketika koneksi internet pengguna sempat terputus?'),
          choices: [
            { id: 'auto', label: t('Browser otomatis menyambung ulang dan memakai kolom id untuk melanjutkan kabar yang tertinggal') },
            { id: 'p2p', label: t('Browser otomatis menelepon browser teman lewat peer-to-peer'), explainWrong: t('Koneksi langsung antar browser adalah WebRTC.') },
            { id: 'bin', label: t('Browser mengubah semua video menjadi teks HTML'), explainWrong: t('SSE khusus mengalirkan event teks, bukan video.') },
          ],
          answer: 'auto',
          explainCorrect: t('Benar! Sambung ulang otomatis dan pelacakan id adalah fitur bawaan keren dari standar SSE.'),
          tags: ['sse', 'browser'],
        }),
      ),
      qStep(
        makeTf({
          id: 'b05-l03-q3',
          prompt: t('Melalui satu saluran SSE, browser bisa mengirim file foto biner sekaligus ke server seperti upload bolak-balik.'),
          answer: false,
          explainCorrect: t('Benar, itu keliru! SSE hanya satu arah (server → client) dan hanya membawa teks, bukan data biner.'),
          explainWrong: t('Hampir! Saluran SSE hanya satu arah dari server ke browser dan hanya mendukung teks.'),
          tags: ['sse'],
        }),
      ),
      qStep({
        id: 'b05-l03-q4',
        type: 'hotspot',
        prompt: t('Ketuk kotak ciri yang benar-benar dimiliki oleh teknologi SSE (Server-Sent Events):'),
        difficulty: 2,
        image: 'b05-hotspot',
        regions: [
          { id: 'r1', shape: 'rect', coords: [10, 10, 260, 50], label: 'Satu arah: Server → Client (hanya teks)' },
          { id: 'r2', shape: 'rect', coords: [10, 60, 260, 100], label: 'Dua arah bebas: Client ↔ Server (biner & teks)' },
          { id: 'r3', shape: 'rect', coords: [10, 110, 260, 150], label: 'Langsung antar dua browser tanpa server' },
        ],
        answer: 'r1',
        explainCorrect: t('Tepat! SSE mengalirkan event teks satu arah dari server ke client di atas HTTP.'),
        explainIncorrect: {
          r2: t('Dua arah bebas untuk teks dan biner adalah ciri WebSocket.'),
          r3: t('Komunikasi langsung antar browser adalah WebRTC.'),
        },
        tags: ['sse'],
      }),
      qStep(
        makeMcq({
          id: 'b05-l03-q5',
          type: 'limit',
          analogy: t('SSE seperti mendengarkan siaran radio FM'),
          prompt: t('Apa perbedaan yang membuat SSE lebih canggih daripada siaran radio biasa saat sinyal sempat terputus di perjalanan?'),
          difficulty: 2,
          choices: [
            { id: 'id', label: t('SSE otomatis menyambung ulang dan memberi tahu id kabar terakhir agar kabar yang terlewat dikirim lagi') },
            { id: 'two', label: t('Karena di SSE pendengar bisa langsung berteriak dua arah di jalur yang sama'), explainWrong: t('SSE tetap hanya satu arah dari server ke browser.') },
            { id: 'nohttp', label: t('Karena SSE tidak melewati jaringan internet'), explainWrong: t('SSE tetap berjalan di jaringan internet HTTP.') },
          ],
          answer: 'id',
          explainCorrect: t('Benar! Dengan kolom id dan fitur auto-reconnect, pengguna tidak kehilangan riwayat berita saat sinyal berkedip.'),
          tags: ['sse'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l03-q6',
          type: 'scenario',
          story: t('Saat Nadia mengetik pertanyaan di chatbot AI, jawabannya muncul mengalir kata demi kata dengan mulus. Di tab Network browser terlihat tipe permintaan eventsource.'),
          prompt: t('Mengapa pengembang AI tersebut memilih SSE dibanding WebSocket?'),
          difficulty: 2,
          choices: [
            { id: 'fit', label: t('Karena saat streaming jawaban teks satu arah dari server, SSE lebih ringan, ramah HTTP, dan otomatis menyambung ulang') },
            { id: 'vid', label: t('Karena chatbot hanya mengirim video call peer-to-peer'), explainWrong: t('Jawaban teks AI kata demi kata adalah aliran teks satu arah.') },
            { id: 'poll', label: t('Karena SSE menanya ulang server setiap 5 detik dengan setInterval'), explainWrong: t('Itu cara kerja Polling, bukan SSE.') },
          ],
          answer: 'fit',
          explainCorrect: t('Tepat! Pertanyaan dikirim lewat request HTTP biasa, lalu jawaban teks mengalir satu arah lewat SSE.'),
          tags: ['sse'],
        }),
      ),
      qStep({
        id: 'b05-l03-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi kode frontend browser dan header Content-Type server untuk SSE:'),
        difficulty: 2,
        template: 'const sumber = new ___("/api/status");\n// Server menjawab Content-Type: ___',
        bank: ['EventSource', 'text/event-stream', 'application/json', 'WebSocket'],
        answer: ['EventSource', 'text/event-stream'],
        explainCorrect: t('Sempurna! Client berlangganan dengan EventSource, sementara server mengirim Content-Type: text/event-stream.'),
        tags: ['sse', 'browser'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b05-l03-r1',
        prompt: t('Arah aliran pesan pada teknologi SSE (Server-Sent Events) adalah…'),
        choices: [
          { id: 's2c', label: t('Satu arah dari server ke client (browser)') },
          { id: 'both', label: t('Dua arah bersamaan dari keduanya'), explainWrong: t('Komunikasi dua arah di satu jalur adalah WebSocket.') },
        ],
        answer: 's2c',
        explainCorrect: t('SSE cocok untuk notifikasi, feed langsung, skor, dan streaming teks jawaban AI.'),
        tags: ['sse'],
      }),
      makeMcq({
        id: 'b05-l03-r2',
        prompt: t('Contoh penggunaan nyata SSE yang paling populer saat ini adalah…'),
        choices: [
          { id: 'ai', label: t('Streaming teks jawaban chatbot AI kata demi kata dan notifikasi langsung') },
          { id: 'vc', label: t('Video call langsung tanpa server'), explainWrong: t('Video call langsung antar browser memakai WebRTC.') },
        ],
        answer: 'ai',
        explainCorrect: t('Streaming teks satu arah dari server adalah kekuatan utama SSE.'),
        tags: ['sse'],
      }),
    ],
    recap: t(
      'SSE seperti siaran radio satu arah dari server ke browser yang hemat dan otomatis menyambung ulang.',
      'SSE (EventSource + text/event-stream) sangat ideal dan ringan untuk streaming event teks satu arah dari server ke client.',
    ),
    companion: {
      talkPrompts: ['Kalau kita mendengarkan berita lalu lintas di radio mobil, kenapa penyiar tidak bisa mendengar suara kita?'],
      offlineActivity: 'Satu orang membacakan langkah resep atau skor bola sepotong demi sepotong (server SSE), sementara yang lain cukup mendengarkan dan mencatat (browser).',
    },
  }),

  makeLesson({
    id: 'b05-l04',
    worldId: 'b05',
    title: 'WebSocket: telepon tersambung',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa membedakan telepon WebSocket dua arah dengan radio SSE satu arah.',
      'Aku bisa menjelaskan handshake 101 WebSocket, full-duplex, wss://, tantangan produksi, serta perbandingan dengan SSE.',
    ),
    estMinutes: 6,
    introducesTerms: ['websocket'],
    usesTerms: ['sse', 'browser', 'server', 'json', 'https'],
    stickerId: 'telepon',
    warmupFrom: 'b05-l03',
    steps: [
      storyStep('b05/telepon.svg', [
        rText(
          'Di radio SSE kamu cuma bisa mendengarkan. Kalau mau ngobrol cepat bolak-balik seperti aplikasi chat, kamu butuh telepon yang terus tersambung! Kedua pihak bebas bicara kapan saja bahkan bersamaan.',
          'Jika kedua pihak harus saling mengirim pesan cepat secara aktif, siaran radio satu arah saja tidak cukup. WebSocket membuka jalur telepon full-duplex yang tetap tersambung.',
        ),
      ]),
      conceptStep({
        title: t('Telepon Dua Arah Tanpa Ditutup', 'Full-Duplex WebSocket'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b05', topic: 'websocket-telepon' },
        alt: t('Setelah handshake 101 Switching Protocols, browser dan server bertukar pesan chat dua arah.'),
        body: [
          rTerm('websocket', 'WebSocket', 'WebSocket'),
          rText(
            ' membuka satu jalur terus-menerus. Browser dan server bebas mengirim pesan dua arah kapan saja bersamaan.',
            ' menjaga koneksi full-duplex persisten antara browser dan server sehingga keduanya dapat mengirim teks maupun data biner kapan saja bersamaan.',
          ),
        ],
      }),
      conceptStep({
        title: t('Jabat Tangan & Alamat Aman wss://', 'Handshake 101 dan Kode WebSocket'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b05', topic: 'handshake-ws' },
        alt: t('Kode new WebSocket("wss://chat.toko-rani.example/ruang/7") beserta onopen dan onmessage.'),
        code: {
          lang: 'js',
          code: 'const soket = new WebSocket("wss://chat.toko-rani.example/ruang/7");\nsoket.onopen = () => soket.send(JSON.stringify({ jenis: "gabung", nama: "Rani" }));\nsoket.onmessage = (e) => tampilkan(JSON.parse(e.data));',
          highlight: [1, 2],
        },
        body: [
          rText(
            'Keduanya berjabat tangan lewat HTTP dulu. Jika server setuju, jalur berubah terbuka memakai alamat aman wss://.',
            'Dimulai dari request HTTP Upgrade; server membalas 101 Switching Protocols lalu jalur berubah terbuka. Di aplikasi sungguhan selalu pakai wss:// terenkripsi.',
          ),
        ],
      }),
      conceptStep({
        title: t('Pilih SSE atau WebSocket?', 'Tantangan Produksi & Pemilihan'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b05', topic: 'telepon' },
        alt: t('Perbandingan SSE (hanya server bicara) vs WebSocket (keduanya aktif bicara).'),
        body: [
          rText(
            'Pilih radio SSE jika hanya server yang bicara. Pilih telepon WebSocket jika dua pihak sering mengobrol cepat.',
            'Tantangan WebSocket: sambung ulang harus dibuat sendiri, perlu heartbeat ping–pong, skala banyak server butuh Redis pub/sub, serta validasi origin. Pilih SSE bila hanya server yang banyak bicara.',
          ),
        ],
      }),
      limitStep({
        analogy: t('WebSocket seperti panggilan telepon yang tetap tersambung'),
        same: [
          t('Setelah diangkat (jabat tangan), kedua belah pihak bisa saling mengirim pesan seketika tanpa menelepon ulang.'),
        ],
        different: [
          t('Di WebSocket, ia hanyalah "pipa" mentah: pengembang harus menyepakati format pesan (misal JSON) dan membangun sendiri sambung ulang atau memakai library seperti Socket.IO.'),
          t('Jika ada 100.000 pengguna, server harus menjaga 100.000 koneksi tetap terbuka—jauh lebih berat daripada halaman web biasa.'),
        ],
      }),
      simStep(
        'balap-realtime',
        t(
          'Ketuk Kirim Kabar Baru di simulator untuk melihat baris WebSocket bertukar pesan dua arah!',
          'Amati pertukaran pesan dua arah pada jalur WebSocket di simulator Balap Realtime.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'b05-l04-q1',
          type: 'analogy',
          prompt: t('Jika SSE itu seperti radio satu arah, maka WebSocket paling tepat diumpamakan sebagai…'),
          choices: [
            { id: 'tel', label: t('Telepon tersambung dua arah') },
            { id: 'sur', label: t('Kirim surat pos yang harus ganti amplop tiap kata'), explainWrong: t('Kirim surat berulang tiap kata lebih mirip HTTP biasa / Polling.') },
            { id: 'rad', label: t('Radio tanpa tombol kirim'), explainWrong: t('Itu analogi untuk SSE.') },
          ],
          answer: 'tel',
          explainCorrect: t('Tepat! Setelah jabat tangan berhasil, telepon WebSocket terbuka dua arah.'),
          tags: ['websocket'],
        }),
      ),
      qStep({
        id: 'b05-l04-q2',
        type: 'sort',
        prompt: t('Pilih teknologi paling cocok untuk setiap fitur aplikasi berikut: SSE atau WebSocket?'),
        difficulty: 2,
        items: [
          { id: 's1', label: t('Notifikasi berita & status paket satu arah') },
          { id: 'w1', label: t('Chat grup & indikator "sedang mengetik..."') },
          { id: 's2', label: t('Jawaban chatbot AI muncul kata demi kata') },
          { id: 'w2', label: t('Game multipemain & papan tulis kolaborasi') },
        ],
        bins: [
          { id: 'sse', label: t('SSE (Siaran Radio)') },
          { id: 'ws', label: t('WebSocket (Telepon Dua Arah)') },
        ],
        answer: { s1: 'sse', w1: 'ws', s2: 'sse', w2: 'ws' },
        explainCorrect: t('Keren! Kamu sudah paham aturan praktis kapan memakai SSE dan kapan memilih WebSocket.'),
        tags: ['sse', 'websocket'],
      }),
      qStep(
        makeMcq({
          id: 'b05-l04-q3',
          prompt: t('Awalan alamat WebSocket yang terenkripsi aman dan wajib digunakan di aplikasi nyata adalah…'),
          choices: [
            { id: 'wss', label: t('wss://') },
            { id: 'ws', label: t('ws:// tanpa huruf s'), explainWrong: t('ws:// tidak terenkripsi seperti HTTP biasa.') },
            { id: 'ftp', label: t('ftp://'), explainWrong: t('FTP adalah protokol transfer file lama.') },
          ],
          answer: 'wss',
          explainCorrect: t('Benar! wss:// mengenkripsi pesan WebSocket sebagaimana HTTPS mengenkripsi HTTP.'),
          tags: ['websocket', 'https'],
        }),
      ),
      qStep(
        makeTf({
          id: 'b05-l04-q4',
          prompt: t('WebSocket mentah di browser sudah otomatis membuatkan fitur ruangan chat (room), sambung ulang otomatis, dan format pesan tanpa kode tambahan.'),
          answer: false,
          explainCorrect: t('Benar, itu keliru! WebSocket mentah hanyalah pipa pesan; fitur room atau reconnect harus dibuat sendiri atau pakai library seperti Socket.IO.'),
          explainWrong: t('Hampir! WebSocket hanyalah pipa komunikasi dua arah tanpa mengatur bentuk pesan ataupun fitur room.'),
          tags: ['websocket'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l04-q5',
          type: 'limit',
          analogy: t('WebSocket seperti panggilan telepon antar dua pihak'),
          prompt: t('Mengapa dalam aplikasi chat berskala besar, menjalankan WebSocket tidak sesederhana membiarkan telepon tetap menyala?'),
          difficulty: 2,
          choices: [
            { id: 'scale', label: t('Setiap pengguna menahan satu koneksi terbuka di server, butuh detak jantung ping–pong, reconnect, dan sinkronisasi antar server') },
            { id: 'one', label: t('Karena WebSocket hanya bisa mengirim satu kata saja lalu mati'), explainWrong: t('WebSocket justru terus terbuka untuk jutaan pesan.') },
            { id: 'html', label: t('Karena WebSocket hanya bekerja di dokumen HTML tanpa JavaScript'), explainWrong: t('WebSocket di browser dipanggil melalui API JavaScript.') },
          ],
          answer: 'scale',
          explainCorrect: t('Tepat! Menjaga ratusan ribu koneksi persisten menuntut pengelolaan memori, heartbeat, dan broker seperti Redis pub/sub.'),
          tags: ['websocket', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l04-q6',
          type: 'scenario',
          story: t('Dimas dan Sari membuat editor dokumen bersama di mana keduanya bisa mengetik kalimat dan melihat kursor temannya bergerak pada saat bersamaan.'),
          prompt: t('Teknologi realtime manakah yang paling tepat untuk mendukung interaksi dua arah seketika tersebut?'),
          difficulty: 2,
          choices: [
            { id: 'ws', label: t('WebSocket') },
            { id: 'sse', label: t('SSE saja tanpa kirim pesan balik'), explainWrong: t('Di editor kolaborasi, setiap pengguna aktif mengirim ketikan sangat sering.') },
            { id: 'poll', label: t('Polling setiap 10 detik'), explainWrong: t('Jeda 10 detik membuat kolaborasi bersama terasa kacau dan patah-patah.') },
          ],
          answer: 'ws',
          explainCorrect: t('Benar! Editor kolaborasi membutuhkan koneksi dua arah yang sangat cepat dari kedua sisi.'),
          tags: ['websocket'],
        }),
      ),
      qStep({
        id: 'b05-l04-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t('Ketik kode status HTTP tiga digit yang dikembalikan server ketika menyetujui perpindahan jalur (Switching Protocols) ke WebSocket:'),
        difficulty: 2,
        accept: ['101'],
        explainCorrect: t('Benar! 101 Switching Protocols menandai selesainya handshake HTTP menuju koneksi WebSocket.'),
        tags: ['websocket', 'status-code'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b05-l04-r1',
        prompt: t('Istilah teknis untuk koneksi WebSocket yang memungkinkan dua pihak mengirim pesan kapan saja bersamaan adalah…'),
        choices: [
          { id: 'fd', label: t('Full-duplex') },
          { id: 'st', label: t('Stateless'), explainWrong: t('Stateless adalah sifat REST yang tidak menyimpan kondisi antar request.') },
        ],
        answer: 'fd',
        explainCorrect: t('Full-duplex berarti komunikasi dua arah dapat berlangsung serentak dalam satu jalur.'),
        tags: ['websocket'],
      }),
      makeMcq({
        id: 'b05-l04-r2',
        prompt: t('Aturan praktis memilih antara SSE dan WebSocket adalah…'),
        choices: [
          { id: 'rule', label: t('Pilih SSE jika hanya server yang banyak mengirim kabar; pilih WebSocket jika keduanya aktif bicara') },
          { id: 'always', label: t('Selalu pakai WebSocket bahkan untuk halaman profil statis'), explainWrong: t('Halaman statis cukup memakai HTTP GET biasa.') },
        ],
        answer: 'rule',
        explainCorrect: t('Memilih alat sesuai arah komunikasi membuat server jauh lebih ringan dan sederhana.'),
        tags: ['sse', 'websocket'],
      }),
    ],
    recap: t(
      'WebSocket seperti telepon dua arah yang terus tersambung (wss://), cocok untuk chat dan kolaborasi langsung.',
      'WebSocket dimulai dengan handshake HTTP 101 untuk membuka jalur full-duplex persisten, cocok saat client dan server aktif bertukar pesan.',
    ),
    companion: {
      talkPrompts: ['Kalau kita punya aplikasi obrolan pesan cepat dan notifikasi pengumuman satu arah, mana yang pakai telepon dan mana yang pakai radio?'],
      offlineActivity: 'Bentangkan dua ujung tali atau telepon mainan di ruang tamu: berlatihlah menyapa "Boleh pindah ke jalur ngobrol?" (handshake 101) lalu bicara bergantian maupun bersamaan.',
    },
  }),

  makeLesson({
    id: 'b05-l05',
    worldId: 'b05',
    title: 'WebRTC: walkie-talkie',
    modes: ['pro'],
    objective: t('Aku bisa menjelaskan cara kerja peer-to-peer WebRTC serta peran Signaling, STUN, dan TURN server.'),
    estMinutes: 5,
    introducesTerms: ['webrtc'],
    usesTerms: ['websocket', 'server', 'browser'],
    stickerId: 'walkie-talkie',
    warmupFrom: 'b05-l04',
    steps: [
      storyStep('b05/walkie-talkie.svg', [
        rText(
          'Di WebSocket, semua suara dan video harus melewati server operator di tengah. Jika dua orang melakukan panggilan video, mengirim aliran video berat lewat server pusat menjadi mahal dan lambat. WebRTC bekerja seperti walkie-talkie langsung antar dua browser setelah dikenalkan!',
        ),
      ]),
      conceptStep({
        title: t('Peer-to-Peer Antar Browser'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b05', topic: 'walkie-talkie' },
        alt: t('Dua browser terhubung langsung bertukar video dan suara peer-to-peer lewat WebRTC.'),
        body: [
          rTerm('webrtc', 'WebRTC'),
          rText(' (Web Real-Time Communication) menghubungkan dua '),
          rTerm('browser', 'browser'),
          rText(' secara langsung ('),
          rBold('peer-to-peer'),
          rText(') untuk mengirim suara, video, dan data dengan jeda sangat kecil tanpa seluruh video melewati server pusat.'),
        ],
      }),
      conceptStep({
        title: t('Signaling Server: Mak Comblang Awal'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b05', topic: 'signaling-webrtc' },
        alt: t('Browser Rani dan Dimas bertukar offer dan answer lewat Signaling server sebelum bicara langsung.'),
        body: [
          rText('Karena dua browser awalnya belum tahu alamat masing-masing, mereka butuh '),
          rBold('Signaling server'),
          rText(' (biasanya memakai '),
          rTerm('websocket', 'WebSocket'),
          rText(') sebagai mak comblang untuk bertukar info perkenalan (offer & answer). Setelah terhubung, signaling server tidak ikut mengobrol.'),
        ],
      }),
      conceptStep({
        title: t('Peran STUN dan TURN Server'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b05', topic: 'stun-turn' },
        alt: t('STUN menanyakan alamat publik di balik router; TURN menjadi jalur cadangan bila firewall ketat.'),
        body: [
          rBold('STUN server'),
          rText(' memberi tahu browser "alamat luarnya" yang tersembunyi di balik router Wi-Fi. Jika jaringan terlalu ketat sehingga peer-to-peer gagal, '),
          rBold('TURN server'),
          rText(' menjadi jalur cadangan pengantar data agar panggilan tetap berjalan.'),
        ],
      }),
      limitStep({
        analogy: t('WebRTC seperti walkie-talkie langsung antar teman tanpa operator'),
        same: [
          t('Setelah tahu jalur satu sama lain, data mengalir langsung antar kedua perangkat dengan jeda sangat rendah.'),
        ],
        different: [
          t('Walau disebut peer-to-peer, WebRTC TIDAK benar-benar bebas server: selalu butuh Signaling + STUN di awal, dan pada jaringan ber-firewall ketat tetap harus menitipkan data ke TURN server!'),
          t('Untuk video call grup besar puluhan orang, mengirim langsung ke semua peserta terlalu berat di HP sehingga biasanya tetap memakai media server (SFU).'),
        ],
      }),
      simStep(
        'balap-realtime',
        t('Bandingkan arsitektur lewat server pada Polling/SSE/WebSocket di simulator dengan komunikasi langsung WebRTC.'),
      ),
      qStep(
        makeMcq({
          id: 'b05-l05-q1',
          type: 'analogy',
          prompt: t('Mengapa WebRTC lebih mirip walkie-talkie daripada telepon lewat operator?'),
          choices: [
            { id: 'p2p', label: t('Karena setelah berkenalan, suara dan video mengalir langsung antar browser tanpa lewat server tengah') },
            { id: 'rad', label: t('Karena hanya bisa mengirim teks satu arah saja dari server'), explainWrong: t('Satu arah dari server adalah ciri SSE.') },
            { id: 'poll', label: t('Karena selalu bertanya ulang setiap 5 detik'), explainWrong: t('Itu cara kerja Polling.') },
          ],
          answer: 'p2p',
          explainCorrect: t('Tepat! Koneksi peer-to-peer langsung mengurangi beban bandwidth video di server dan memperkecil jeda.'),
          tags: ['webrtc'],
        }),
      ),
      qStep({
        id: 'b05-l05-q2',
        type: 'match',
        prompt: t('Pasangkan ketiga server pendukung WebRTC dengan perannya:'),
        difficulty: 2,
        left: [
          { id: 'sig', label: t('Signaling server') },
          { id: 'stun', label: t('STUN server') },
          { id: 'turn', label: t('TURN server') },
        ],
        right: [
          { id: 'r_turn', label: t('Jalur relai cadangan saat firewall menolak koneksi langsung') },
          { id: 'r_sig', label: t('Mak comblang pertukaran info sambungan (offer/answer) di awal') },
          { id: 'r_stun', label: t('Memberi tahu alamat IP publik luar di balik router Wi-Fi') },
        ],
        answer: { sig: 'r_sig', stun: 'r_stun', turn: 'r_turn' },
        explainCorrect: t('Hebat! Signaling untuk perkenalan, STUN untuk mencari alamat luar, dan TURN sebagai cadangan.'),
        tags: ['webrtc', 'server'],
      }),
      qStep({
        id: 'b05-l05-q3',
        type: 'order',
        prompt: t('Urutkan tahapan dimulainya panggilan video WebRTC antara browser Rani dan browser Dimas:'),
        difficulty: 2,
        items: [
          { id: 's3', label: t('Dimas membalas info sambungan (answer) melalui Signaling server') },
          { id: 's1', label: t('Rani mengecek alamat luarnya via STUN dan mengirim info offer') },
          { id: 's4', label: t('Video dan suara mengalir langsung peer-to-peer antar browser Rani dan Dimas') },
          { id: 's2', label: t('Signaling server meneruskan info offer Rani ke browser Dimas') },
        ],
        answer: ['s1', 's2', 's3', 's4'],
        explainCorrect: t('Tepat sekali! STUN + offer → lewat Signaling server → answer kembali → jalur peer-to-peer langsung terbuka.'),
        tags: ['webrtc'],
      }),
      qStep(
        makeTf({
          id: 'b05-l05-q4',
          prompt: t('Setelah kedua browser saling berkenalan dan terhubung lewat WebRTC, seluruh data video tetap harus lewat Signaling server selamanya.'),
          answer: false,
          explainCorrect: t('Benar, pernyataan itu salah! Signaling server hanya memperkenalkan di awal; setelah tersambung, video mengalir langsung antar browser.'),
          explainWrong: t('Signaling server hanyalah mak comblang awal dan tidak ikut membawa aliran video saat panggilan berlangsung.'),
          tags: ['webrtc', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l05-q5',
          type: 'limit',
          analogy: t('WebRTC seperti walkie-talkie langsung tanpa butuh server sama sekali'),
          prompt: t('Mengapa kesimpulan "WebRTC bisa jalan di internet tanpa perlu menyewa server apa pun" itu salah?'),
          difficulty: 2,
          choices: [
            { id: 'srv', label: t('Tetap butuh Signaling server untuk perkenalan, STUN untuk alamat luar, dan TURN sebagai cadangan firewall') },
            { id: 'html', label: t('Karena browser butuh server untuk memuat file CSS saja'), explainWrong: t('Server dibutuhkan secara khusus untuk proses signaling, STUN, dan TURN pada WebRTC.') },
            { id: 'xml', label: t('Karena WebRTC memakai amplop SOAP XML'), explainWrong: t('WebRTC tidak menggunakan SOAP XML.') },
          ],
          answer: 'srv',
          explainCorrect: t('Benar! Tanpa server perkenalan dan penemuan alamat NAT, dua browser di rumah berbeda tidak akan pernah saling menemukan.'),
          tags: ['webrtc', 'server'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b05-l05-q6',
          type: 'scenario',
          story: t('Nadia menelepon Raka lewat aplikasi video call WebRTC. Jaringan Wi-Fi kantor Raka memakai firewall super ketat yang memblokir seluruh sambungan peer-to-peer langsung dari luar.'),
          prompt: t('Komponen mana yang menyelamatkan panggilan agar video tetap berjalan?'),
          difficulty: 2,
          choices: [
            { id: 'turn', label: t('TURN server sebagai jalur relai cadangan') },
            { id: 'poll', label: t('Mengganti video dengan Polling tiap 5 detik'), explainWrong: t('Polling HTTP tidak dapat mengalirkan panggilan video langsung.') },
            { id: 'css', label: t('Mengubah CSS ukuran layar video'), explainWrong: t('Firewall jaringan hanya bisa ditembus dengan relai TURN server.') },
          ],
          answer: 'turn',
          explainCorrect: t('Tepat! TURN meneruskan paket saat koneksi langsung gagal akibat firewall ketat, meski lebih lambat dan memakan biaya bandwidth server.'),
          tags: ['webrtc', 'server'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b05-l05-r1',
        prompt: t('Protokol yang paling sering digunakan oleh Signaling server untuk mempertemukan dua browser di WebRTC adalah…'),
        choices: [
          { id: 'ws', label: t('WebSocket') },
          { id: 'soap', label: t('SOAP XML'), explainWrong: t('Signaling butuh pertukaran cepat dua arah seperti WebSocket.') },
        ],
        answer: 'ws',
        explainCorrect: t('WebSocket sering dipakai untuk bertukar pesan offer/answer di Signaling server.'),
        tags: ['webrtc', 'websocket'],
      }),
      makeMcq({
        id: 'b05-l05-r2',
        prompt: t('Kegunaan utama WebRTC di aplikasi web modern adalah…'),
        choices: [
          { id: 'vc', label: t('Video call, panggilan suara, berbagi layar, dan transfer file langsung antar browser') },
          { id: 'auth', label: t('Mengganti fungsi login dan penyimpanan database SQL'), explainWrong: t('WebRTC berfokus pada komunikasi media/data peer-to-peer antar pengguna.') },
        ],
        answer: 'vc',
        explainCorrect: t('WebRTC adalah standar web untuk komunikasi audio, video, dan data peer-to-peer berjeda rendah.'),
        tags: ['webrtc'],
      }),
    ],
    recap: t('WebRTC menyalurkan video, suara, dan data langsung peer-to-peer antar browser dengan bantuan Signaling, STUN, dan cadangan TURN server.'),
  }),
];
