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

/** Teks tebal yang hanya tampil di Pro (istilah teknis yang tidak dipakai di jalur Petualang). */
const proBold = (text: string): Rich => ({ t: 'bold', v: { pro: text }, modes: ['pro'] });

export const world: World = {
  id: 'b04',
  track: 'B',
  order: 4,
  title: 'Peta Jenis API',
  tagline: t(
    'Kenali perpustakaan dan pelayan pribadi. Keduanya cara aplikasi meminta data.',
    'Kamu bisa membandingkan REST dan GraphQL, lalu memilih yang cocok untuk satu kasus.',
  ),
  color: '#6C5CE7',
  illustration: 'b04-peta-jenis-api',
  sourceChapters: ['J2-04', 'J2-05', 'J2-06', 'J2-07', 'J2-08'],
  requires: ['b03'],
  lessons: ['b04-l01', 'b04-l02', 'b04-l03', 'b04-l04', 'b04-l05'],
  sideQuests: ['b04-sq1'],
  boss: {
    title: 'Tantangan Penjaga Persimpangan',
    greeting: t(
      'Selamat datang di persimpangan jenis API! Ayo pilih jalur yang tepat.',
      'Uji pilihanmu antara REST, GraphQL, gRPC, dan varian RPC lain. Soalnya diambil dari seluruh pelajaran di dunia ini.',
    ),
    guardianName: 'Penjaga Persimpangan',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'b04-anc-j1',
        prompt: t(
          'Keluarga API mana yang menunggu kamu bertanya dulu?',
          'Keluarga API mana yang selalu menunggu client bertanya sebelum server menjawab?',
        ),
        choices: [
          {
            id: 'rr',
            label: t('Tanya-Jawab, seperti memesan makanan', 'Tanya-Jawab (seperti REST dan GraphQL)'),
          },
          {
            id: 'ev',
            label: t('Bel Pintu, seperti kurir memencet bel', 'Berbasis Kejadian (seperti bel pintu)'),
            explainWrong: t(
              'Bel pintu berbunyi sendiri saat ada kejadian. Ia tidak menunggu kamu bertanya.',
              'Keluarga Berbasis Kejadian mengabari sendiri saat peristiwa terjadi, tanpa menunggu client bertanya.',
            ),
          },
          {
            id: 'rt',
            label: t('Siaran Radio, seperti mendengar radio', 'Realtime (seperti siaran radio)'),
            explainWrong: t(
              'Radio terus bersuara. Kamu tidak perlu bertanya lebih dulu.',
              'Keluarga Realtime mengirim kabar yang mengalir tanpa ditanya ulang.',
            ),
          },
        ],
        answer: 'rr',
        explainCorrect: t(
          'Kamu bertanya, lalu dapur menjawab. Seperti memesan makanan di restoran.',
          'Pada keluarga Tanya-Jawab, client bertanya lebih dulu, lalu server menjawab. Seperti memesan di restoran.',
        ),
        tags: ['api'],
      }),
      makeAnchorMcq({
        id: 'b04-anc-j2',
        prompt: t(
          'Di perpustakaan REST, label rak berisi apa?',
          'Dalam penulisan REST yang rapi, bagian URL seharusnya berisi apa?',
        ),
        choices: [
          {
            id: 'noun',
            label: t('Nama benda, seperti buku', 'Kata benda yang mewakili kumpulan data, seperti /produk'),
          },
          {
            id: 'verb',
            label: t('Kata kerja, seperti pinjam', 'Kata kerja, seperti /ambilSemuaProduk'),
            explainWrong: t(
              'Kata kerja ditulis di kartu perintah. Label rak cukup berisi nama benda.',
              'Kata kerja sudah diwakili method HTTP, jadi URL tidak perlu memuatnya.',
            ),
          },
          {
            id: 'clr',
            label: t('Kata sifat, seperti murah', 'Nama method, seperti /get-produk'),
            explainWrong: t(
              'Label rak tidak menjelaskan sifat benda. Ia hanya menyebut nama bendanya.',
              'Method HTTP, seperti GET, dikirim terpisah dari URL dan tidak ditulis di dalamnya.',
            ),
          },
        ],
        answer: 'noun',
        explainCorrect: t(
          'Label rak berisi nama benda. Kata kerja ditulis di kartu perintah.',
          'URL REST berisi kata benda. Kata kerjanya diwakili method seperti GET, POST, PATCH, dan DELETE.',
        ),
        tags: ['rest', 'endpoint'],
      }),
      makeAnchorMcq({
        id: 'b04-anc-j3',
        prompt: t(
          'Pelayan pelupa tidak ingat pesananmu tadi. Apa yang kamu lakukan?',
          'Pada REST yang stateless, mengapa setiap request harus lengkap?',
        ),
        choices: [
          {
            id: 'forget',
            label: t('Menyebut pesanan lengkap setiap kali', 'Server tidak mengingat request sebelumnya'),
          },
          {
            id: 'slow',
            label: t('Meminta pelayan menghafal namamu', 'Server menyimpan sesi setiap client di memorinya'),
            explainWrong: t(
              'Pelayan pelupa tidak bisa menghafal. Kamu harus menyebut semuanya lagi.',
              'Justru server stateless tidak menyimpan sesi client, jadi server mana pun bisa melayani.',
            ),
          },
          {
            id: 'nocode',
            label: t('Memesan satu kali saja dalam sehari', 'Client hanya boleh mengirim satu request per sesi'),
            explainWrong: t(
              'Kamu boleh memesan kapan saja. Hanya tiap pesanan harus lengkap.',
              'Jumlah request tidak dibatasi oleh sifat stateless. Yang wajib hanyalah isi request yang lengkap.',
            ),
          },
        ],
        answer: 'forget',
        explainCorrect: t(
          'Pelayan pelupa tidak menyimpan ingatan. Jadi setiap pesanan harus lengkap, seperti menyebut meja dan menu.',
          'Server tidak menyimpan ingatan percakapan lama. Karena itu server mana pun bisa langsung melayani.',
        ),
        tags: ['rest'],
      }),
      makeAnchorMcq({
        id: 'b04-anc-j4',
        prompt: t(
          'Kamu hanya mau nama dan foto. Pelayan mana yang paling pas?',
          'Layar profil hanya butuh nama dan foto, padahal datanya punya 30 kolom. API mana yang paling pas?',
        ),
        choices: [
          {
            id: 'gql',
            label: t('Pelayan pribadi, membawa sesuai daftarmu', 'GraphQL, meminta kolom sesuai kebutuhan'),
          },
          {
            id: 'big',
            label: t('Pelayan menu tetap, membawa semuanya', 'REST dengan paket tetap 30 kolom'),
            explainWrong: t(
              'Paket tetap membawa semuanya. Itu terlalu banyak untuk kamu.',
              'Paket tetap 30 kolom justru menyebabkan over-fetching, yaitu data berlebih.',
            ),
          },
          {
            id: 'css',
            label: t('Pelayan radio, membawa kabar terus-menerus', 'SOAP dengan amplop XML yang lengkap'),
            explainWrong: t(
              'Radio hanya mengirim kabar. Ia tidak membawa daftar pesananmu.',
              'SOAP membungkus data dalam amplop XML yang panjang, jadi kolom berlebih tetap ikut terkirim.',
            ),
          },
        ],
        answer: 'gql',
        explainCorrect: t(
          'Pelayan pribadi hanya membawa yang kamu tulis. Seperti hanya mengambil nasi dan telur.',
          'GraphQL membawa tepat kolom yang diminta di query. Tidak ada kolom lain yang ikut terkirim.',
        ),
        tags: ['graphql'],
      }),
      makeAnchorMcq({
        id: 'b04-anc-j5',
        prompt: t(
          'Pelayan pribadi punya tugas mengganti isi pesanan. Apa nama tugas itu?',
          'Di GraphQL, operasi mana yang dipakai untuk menambah atau mengubah data?',
        ),
        choices: [
          { id: 'mut', label: t('Mengubah', 'mutation') },
          {
            id: 'qry',
            label: t('Membaca', 'query'),
            explainWrong: t(
              'Membaca hanya melihat isi. Ia tidak mengganti apa pun.',
              'query dipakai untuk membaca data, bukan mengubahnya.',
            ),
          },
          {
            id: 'del',
            label: t('Kabar langsung', 'subscription'),
            explainWrong: t(
              'Kabar langsung datang sendiri saat pesanan siap. Ia tidak mengganti isi pesanan.',
              'subscription dipakai untuk menerima pembaruan realtime.',
            ),
          },
        ],
        answer: 'mut',
        explainCorrect: t(
          'Mengubah berarti mengganti isi. Seperti menukar teh dengan jus di daftar pesanan.',
          'mutation adalah padanan POST, PUT, PATCH, dan DELETE di GraphQL.',
        ),
        tags: ['graphql'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'b04-anc-p1',
        prompt: t('Pasangan mana yang membedakan gaya arsitektur, protokol, dan format data dengan benar?'),
        choices: [
          { id: 'ok', label: t('REST gaya arsitektur, HTTP protokol, JSON format data') },
          {
            id: 'rev',
            label: t('REST protokol, HTTP format data, JSON gaya arsitektur'),
            explainWrong: t('REST bukan protokol, dan JSON bukan gaya arsitektur. Peran ketiganya tertukar.'),
          },
          {
            id: 'same',
            label: t('REST format data, HTTP gaya arsitektur, JSON protokol'),
            explainWrong: t('HTTP bukan gaya arsitektur, dan REST bukan format data. Peran ketiganya tertukar.'),
          },
        ],
        answer: 'ok',
        explainCorrect: t(
          'REST adalah gaya rancangan, HTTP protokol pengiriman, dan JSON format datanya. Membedakan ketiganya membantu membaca dokumentasi API.',
        ),
        tags: ['rest', 'json'],
      }),
      makeAnchorMcq({
        id: 'b04-anc-p2',
        prompt: t(
          'Mengapa cursor pagination lebih stabil dari offset untuk feed yang di-scroll tanpa batas?',
        ),
        choices: [
          { id: 'cur', label: t('Cursor menandai posisi item terakhir, jadi isinya tidak bergeser') },
          {
            id: 'jump',
            label: t('Cursor bisa langsung melompat ke halaman 50'),
            explainWrong: t('Melompat ke halaman acak justru keunggulan offset, bukan cursor.'),
          },
          {
            id: 'nohttp',
            label: t('Cursor menyimpan seluruh daftar di browser'),
            explainWrong: t('Cursor tetap mengambil data dari server, bukan menyimpan seluruh daftar di browser.'),
          },
        ],
        answer: 'cur',
        explainCorrect: t(
          'Offset bergeser saat kiriman baru masuk. Cursor bertahan di item terakhir, seperti pembatas buku.',
        ),
        tags: ['pagination', 'rest'],
      }),
      makeAnchorMcq({
        id: 'b04-anc-p3',
        prompt: t('Mana praktik error REST yang dianggap keliru (anti-pattern)?'),
        choices: [
          { id: 'bad', label: t('Membalas 200 OK, lalu menulis "sukses": false di body') },
          {
            id: 'good',
            label: t('Membalas 422 dengan objek error berisi kode dan detail'),
            explainWrong: t('Status 422 dengan objek error terstruktur adalah praktik yang baik.'),
          },
          {
            id: 'rfc',
            label: t('Mengikuti format Problem Details (RFC 9457)'),
            explainWrong: t('RFC 9457 adalah standar resmi untuk format error REST.'),
          },
        ],
        answer: 'bad',
        explainCorrect: t(
          'Pakai status HTTP yang tepat, yaitu 4xx atau 5xx untuk error. Dengan begitu logika error di frontend tetap seragam.',
        ),
        tags: ['rest', 'status-code', 'pagination'],
      }),
      makeAnchorMcq({
        id: 'b04-anc-p4',
        prompt: t('Pada schema GraphQL, apa arti tanda seru (!) di "nama: String!"?'),
        choices: [
          { id: 'req', label: t('Kolom wajib punya nilai, tidak boleh null') },
          {
            id: 'sec',
            label: t('Kolom rahasia yang tidak boleh dibaca'),
            explainWrong: t('Tanda seru menandakan non-nullable, bukan kolom rahasia.'),
          },
          {
            id: 'arr',
            label: t('Kolom berisi daftar (array)'),
            explainWrong: t('Daftar array ditandai dengan kurung siku, misalnya [String].'),
          },
        ],
        answer: 'req',
        explainCorrect: t('Tanda seru menjamin kolom itu tidak akan bernilai null. Client boleh mengandalkan isinya.'),
        tags: ['graphql'],
      }),
      makeAnchorMcq({
        id: 'b04-anc-p5',
        prompt: t('Mengapa gRPC populer untuk komunikasi antar layanan backend internal?'),
        choices: [
          { id: 'fast', label: t('Memakai HTTP/2 dan Protobuf biner dengan kontrak ketat') },
          {
            id: 'html',
            label: t('Semua browser bisa memanggilnya langsung tanpa proxy'),
            explainWrong: t('Browser butuh proxy gRPC-Web karena tidak membuka akses ke frame HTTP/2 mentah.'),
          },
          {
            id: 'xml',
            label: t('Memakai amplop XML panjang seperti SOAP'),
            explainWrong: t('gRPC memakai pesan biner Protobuf, bukan XML.'),
          },
        ],
        answer: 'fast',
        explainCorrect: t(
          'HTTP/2 dan Protobuf biner membuat pesan kecil dan cepat. Kontrak .proto menjaga kedua sisi tetap cocok.',
        ),
        tags: ['grpc', 'protobuf'],
      }),
      makeAnchorMcq({
        id: 'b04-anc-p6',
        type: 'limit',
        analogy: t('REST seperti restoran paket tetap dan GraphQL seperti pelayan pribadi sesuai daftar'),
        prompt: t('Apa kelebihan REST yang justru menjadi kerumitan baru di GraphQL?'),
        choices: [
          { id: 'cache', label: t('Caching HTTP lebih mudah di URL GET milik REST') },
          {
            id: 'over',
            label: t('REST memilih kolom lebih tepat daripada GraphQL'),
            explainWrong: t('Memilih kolom dengan tepat adalah kekuatan GraphQL, bukan kelemahannya.'),
          },
          {
            id: 'type',
            label: t('REST punya schema yang lebih ketat dari GraphQL'),
            explainWrong: t('GraphQL justru punya schema yang sangat ketat.'),
          },
        ],
        answer: 'cache',
        explainCorrect: t(
          'Karena REST memakai URL GET unik untuk tiap resource, caching HTTP dan CDN bekerja alami. GraphQL butuh strategi cache khusus.',
        ),
        tags: ['rest', 'graphql', 'cookie-cache'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'b04-l01',
    worldId: 'b04',
    title: 'Tiga keluarga besar API',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa mengelompokkan API ke tiga keluarga besar.',
      'Kamu bisa membedakan gaya, protokol, dan format, lalu mengelompokkan API dengan dua pertanyaan.',
    ),
    atWork:
      'Kamu akan memilih jenis API untuk fitur baru, misalnya katalog, chat, atau notifikasi pembayaran di toko online.',
    estMinutes: 7,
    introducesTerms: [],
    usesTerms: ['api', 'json', 'protobuf'],
    warmupFrom: 'b03-l04',
    steps: [
      storyStep('b04/peta-api.svg', [
        rText(
          'Bayangkan peta dengan tiga jalur. Ada jalur restoran, jalur radio, dan jalur bel pintu. Jalur mana yang cocok untuk tiap tugas?',
          'Di rapat tim, orang menyebut REST, gRPC, dan Webhook dalam satu kalimat. Peta ini membantu kamu membedakannya.',
        ),
      ]),
      conceptStep({
        title: t('Dua pertanyaan kunci'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b04', topic: 'dua-pertanyaan' },
        alt: t('Dua pertanyaan kunci: siapa memulai pembicaraan dan berapa arah pembicaraannya.'),
        body: [
          rText(
            'Ada dua pertanyaan untuk memilih jalur. Siapa yang mulai bicara? Berapa arah obrolannya, satu atau dua?',
            'REST dan GraphQL adalah gaya rancangan: aturan cara menyusun API. HTTP dan WebSocket adalah protokol, yaitu aturan cara data dikirim. JSON dan Protobuf adalah format, yaitu bentuk isi data. Dua pertanyaan membedakan jenis API: siapa yang memulai, dan berapa arah komunikasinya?',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b04-l01-q3',
          prompt: t(
            'Dua pertanyaan mana yang membantu mengenali jenis API?',
            'Dua pertanyaan mana yang membedakan hampir semua jenis API?',
          ),
          choices: [
            { id: 'two', label: t('Siapa yang mulai bicara, dan berapa arahnya') },
            {
              id: 'clr',
              label: t('Seberapa cepat jalurnya, dan seberapa besar datanya'),
              explainWrong: t(
                'Kecepatan penting, tetapi tidak menunjukkan jalurnya. Jalur ditentukan oleh siapa yang mulai bicara.',
                'Kecepatan dan ukuran data penting, tetapi tidak membedakan keluarga API. Dua pertanyaan kunci menyangkut siapa memulai dan berapa arah.',
              ),
            },
            {
              id: 'os',
              label: t('Bahasa apa yang dipakai, dan siapa pembuatnya'),
              explainWrong: t(
                'Bahasa dan pembuat tidak menentukan jalur. Yang menentukan adalah siapa yang mulai bicara.',
                'Bahasa pemrograman dan pembuat tidak menentukan keluarga API. Yang menentukan adalah siapa memulai dan berapa arah.',
              ),
            },
          ],
          answer: 'two',
          explainCorrect: t(
            'Dua jawaban itu langsung menunjukkan jalurnya. Seperti memilih antara bertanya, mendengar radio, atau menunggu bel.',
            'Siapa yang memulai dan berapa arahnya sudah cukup untuk memetakan hampir semua jenis API.',
          ),
          hints: [
            t('Ingat jalur restoran, radio, dan bel pintu.', 'Ingat dua pertanyaan kunci pada peta.'),
          ],
          tags: ['api'],
        }),
      ),
      conceptStep({
        title: t('Tiga jalur API', 'Keluarga Tanya-Jawab dan Realtime'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b04', topic: 'tanya-jawab-realtime' },
        alt: t(
          'Jalur restoran untuk bertanya, radio untuk kabar, bel pintu untuk kejadian.',
          'Peta keluarga Tanya-Jawab dan keluarga Realtime, lengkap dengan contoh tiap jenis.',
        ),
        body: [
          rText(
            'Jalur restoran: kamu bertanya, dapur menjawab. Jalur radio: kabar datang terus, seperti siaran radio atau obrolan telepon. Jalur bel pintu: kabar datang saat ada kejadian.',
            'Keluarga Tanya-Jawab berisi REST, GraphQL, dan gRPC. Client bertanya, lalu server menjawab. Keluarga Realtime mengirim kabar baru tanpa ditanya ulang, misalnya lewat SSE atau WebSocket.',
          ),
        ],
      }),
      conceptStep({
        title: t('Keluarga Kejadian dan Kombinasi'),
        modes: ['pro'],
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b04', topic: 'kejadian-kombinasi' },
        alt: t(
          'Bel pintu memberi kabar saat ada kejadian.',
          'Keluarga Berbasis Kejadian seperti Webhook dan Pub/Sub, dengan contoh gabungan.',
        ),
        body: [
          rText(
            'Keluarga Berbasis Kejadian mengabari saat sebuah peristiwa terjadi, misalnya lewat Webhook atau Pub/Sub. Satu aplikasi sering memakai ketiganya sekaligus: REST untuk katalog, WebSocket untuk chat, Webhook untuk pembayaran.',
          ),
        ],
      }),
      qStep({
        id: 'b04-l01-q1',
        type: 'sort',
        prompt: t('Kelompokkan tiap contoh ke jalurnya.', 'Kelompokkan jenis API ini ke keluarga besarnya.'),
        difficulty: 2,
        items: [
          { id: 'r', label: t('Kamu memesan, lalu pelayan menjawab', 'REST dan GraphQL') },
          { id: 's', label: t('Berita cuaca terus terdengar sepanjang hari', 'SSE') },
          { id: 'w', label: t('Mengobrol dengan nenek lewat telepon', 'WebSocket') },
          { id: 'wh', label: t('Kamu dikabari saat kurir tiba', 'Webhook') },
          { id: 'g', label: t('Kamu bertanya harga es krim, penjual menjawab', 'gRPC') },
          { id: 'ps', label: t('Alarm berbunyi saat kue matang', 'Pub/Sub') },
        ],
        bins: [
          { id: 'qa', label: t('Jalur restoran', '1. Tanya-Jawab'), icon: 'utensils' },
          { id: 'rt', label: t('Jalur radio', '2. Realtime'), icon: 'radio' },
          { id: 'ev', label: t('Bel pintu', '3. Berbasis Kejadian'), icon: 'bell' },
        ],
        answer: {
          r: 'qa',
          g: 'qa',
          s: 'rt',
          w: 'rt',
          wh: 'ev',
          ps: 'ev',
        },
        explainCorrect: t(
          'Tiap contoh cocok dengan satu jalur di peta. Restoran menunggu pertanyaan, radio terus bersuara, bel berbunyi saat ada kejadian.',
          'Tanya-Jawab menunggu client bertanya. Realtime mengirim kabar tanpa ditanya, dan Berbasis Kejadian mengabari saat peristiwa terjadi.',
        ),
        hints: [
          t('Pikirkan siapa yang membawa kabar lebih dulu.', 'Tanyakan siapa yang memulai, dan berapa arahnya.'),
        undefined,
        ],
        tags: ['api'],
      }),
      limitStep({
        analogy: t(
          'Peta dengan tiga jalur: restoran, radio, dan bel pintu.',
          'Peta kota berisi tiga distrik: Restoran, Radio/Telepon, dan Bel Pintu',
        ),
        same: [
          t(
            'Tiap jalur cocok untuk satu keperluan.',
            'Peta membantu memilih jenis API yang cocok untuk setiap fitur.',
          ),
        ],
        different: [
          t(
            'Satu aplikasi boleh memakai ketiga jalur sekaligus.',
            'Satu aplikasi boleh memakai semua jenis API. Tidak ada jenis yang paling hebat untuk semua hal.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'pelayan-graphql',
        t(
          'Centang nama, harga, atau stok, lalu lihat jawaban pelayan.',
          'Pilih kolom data di simulator untuk merasakan satu gaya Tanya-Jawab modern.',
        ),
      ),
      qStep({
        id: 'b04-l01-q2',
        type: 'match',
        prompt: t('Pasangkan tiap jalur dengan tugasnya.', 'Pasangkan jenis API dengan perumpamaan singkatnya.'),
        difficulty: 1,
        left: [
          { id: 'rest', label: t('Restoran menu tetap', 'REST') },
          { id: 'gql', label: t('Pelayan pribadi', 'GraphQL') },
          { id: 'sse', label: t('Siaran radio', 'SSE') },
          { id: 'wh', label: t('Bel pintu', 'Webhook') },
        ],
        right: [
          { id: 'a_sse', label: t('Kabar terus datang tanpa kamu minta', 'Mendengarkan siaran radio satu arah') },
          { id: 'a_wh', label: t('Kabar datang saat ada kejadian', 'Kurir memencet bel saat paket tiba') },
          { id: 'a_rest', label: t('Pilihannya sudah ditentukan', 'Restoran dengan banyak loket paket tetap') },
          { id: 'a_gql', label: t('Kamu menulis daftar maumu sendiri', 'Satu pelayan pribadi membawa kertas daftarmu') },
        ],
        answer: { rest: 'a_rest', gql: 'a_gql', sse: 'a_sse', wh: 'a_wh' },
        explainCorrect: t(
          'Tiap perumpamaan punya cara kerja sendiri. Restoran dan pelayan menunggu pesananmu, radio dan bel mengirim kabar.',
          'REST dan GraphQL menunggu request dari client. SSE mengalirkan kabar satu arah, dan Webhook mengabari saat kejadian.',
        ),
        hints: [t('Pikirkan siapa yang bicara lebih dulu.', 'Tanyakan siapa yang memulai pembicaraan.'), undefined],
        tags: ['api'],
      }),
      qStep(
        makeTf({
          id: 'b04-l01-q4',
          prompt: t(
            'Satu aplikasi hanya boleh memakai satu jalur API.',
            'Aplikasi belanja besar hanya boleh memakai satu jenis API dan dilarang mencampur REST dengan WebSocket.',
          ),
          answer: false,
          explainCorrect: t(
            'Satu aplikasi boleh pakai banyak jalur. Restoran untuk daftar, bel pintu untuk kabar bayar.',
            'Pernyataan itu keliru: satu aplikasi boleh memadukan beberapa jenis API. Toko online memakai REST untuk katalog, WebSocket untuk chat, dan Webhook untuk pembayaran.',
          ),
          explainWrong: t(
            'Setiap tugas boleh memakai jalur yang paling pas. Satu aplikasi tidak dikunci pada satu jalur.',
            'Setiap fitur boleh memakai jenis API yang paling cocok. Tidak ada aturan satu produk satu jenis API.',
          ),
          hints: [t('Ingat peta dengan tiga jalur.', 'Ingat contoh toko online dengan banyak fitur.')],
          tags: ['api'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b04-l01-q5',
          type: 'limit',
          modes: ['pro'],
          analogy: t('Peta jenis API yang membagi semua jenis API ke tiga kotak terpisah'),
          prompt: t('Mengapa REST, HTTP, dan JSON tidak sejajar untuk dibandingkan?'),
          difficulty: 2,
          choices: [
            { id: 'layer', label: t('Gaya rancangan, protokol, dan format ada di lapisan berbeda') },
            {
              id: 'old',
              label: t('HTTP sudah diganti REST di semua API modern'),
              explainWrong: t('REST justru berjalan di atas protokol HTTP. Keduanya tidak saling menggantikan.'),
            },
            {
              id: 'bin',
              label: t('REST dan JSON adalah dua protokol yang saling bersaing di API modern'),
              explainWrong: t('JSON adalah format data, bukan protokol. REST sendiri adalah gaya rancangan.'),
            },
          ],
          answer: 'layer',
          explainCorrect: t(
            'Gaya, protokol, dan format menjawab pertanyaan yang berbeda. REST berjalan di atas HTTP, dan datanya biasanya berupa JSON.',
          ),
          hints: [t('Tanyakan: ini gaya, protokol, atau format?')],
          tags: ['api', 'json'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b04-l01-q6',
          type: 'scenario',
          story: t(
            'Rani membuat aplikasi toko. Aplikasinya punya daftar barang, chat dengan penjual, dan kabar pembayaran lunas.',
            'Rani membangun aplikasi belanja dengan katalog barang, chat pembeli dan penjual, dan kabar otomatis saat pembayaran lunas.',
          ),
          prompt: t(
            'Urut dari daftar barang, chat, lalu kabar lunas. Jalur mana yang cocok?',
            'Kombinasi keluarga API mana yang paling tepat untuk aplikasi Rani?',
          ),
          difficulty: 3,
          choices: [
            {
              id: 'mix',
              label: t(
                'Restoran, telepon, dan bel pintu',
                'Tanya-Jawab untuk katalog, Realtime dua arah untuk chat, Kejadian untuk pembayaran',
              ),
            },
            {
              id: 'one',
              label: t(
                'Radio, restoran, dan bel pintu',
                'Realtime satu arah, seperti siaran radio, untuk semua fitur termasuk chat dan pembayaran',
              ),
              explainWrong: t(
                'Daftar barang butuh tanya-jawab, jadi pakai restoran. Chat butuh dua arah, jadi pakai telepon.',
                'Siaran satu arah tidak bisa menerima balasan dari pembeli, jadi chat tidak bisa berjalan.',
              ),
            },
            {
              id: 'none',
              label: t(
                'Restoran, telepon, dan restoran',
                'Tanya-Jawab saja untuk semua fitur, termasuk chat dan pembayaran',
              ),
              explainWrong: t(
                'Restoran hanya menjawab saat ditanya. Ia tidak mengabari saat pembayaran lunas.',
                'Tanya-Jawab hanya menjawab saat client bertanya, jadi kabar pembayaran lunas tidak datang sendiri.',
              ),
            },
          ],
          answer: 'mix',
          explainCorrect: t(
            'Tiap tugas cocok dengan jalur yang berbeda. Daftar barang seperti memesan, chat seperti menelepon, pembayaran seperti bel pintu.',
            'Setiap fitur memakai keluarga API yang sesuai dengan arah dan waktu komunikasinya.',
          ),
          hints: [
            t('Pikirkan arah kabar untuk tiap tugas.', 'Tanyakan siapa yang memulai dan berapa arahnya untuk tiap fitur.'),
          ],
          tags: ['api'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b04-l01-r1',
        prompt: t(
          'Toko ingin memberi kabar saat pembayaran lunas. Jalur mana yang cocok?',
          'Keluarga API mana yang cocok untuk mengabari server lain bahwa pembayaran sudah lunas?',
        ),
        choices: [
          { id: 'ev', label: t('Jalur bel pintu', 'Berbasis Kejadian, seperti bel pintu') },
          {
            id: 'qa',
            label: t('Jalur restoran', 'Tanya-Jawab, menunggu client bertanya'),
            explainWrong: t(
              'Restoran menunggu kamu bertanya. Ia tidak mengabari sendiri.',
              'Tanya-Jawab menunggu client bertanya lebih dulu, jadi kabar tidak datang sendiri.',
            ),
          },
          {
            id: 'rt',
            label: t('Jalur radio', 'Realtime, mengalir seperti radio'),
            explainWrong: t(
              'Radio bersuara terus-menerus. Bel berbunyi hanya saat ada kejadian.',
              'Realtime mengalirkan kabar terus-menerus, bukan hanya saat satu peristiwa terjadi.',
            ),
          },
        ],
        answer: 'ev',
        explainCorrect: t(
          'Bel pintu berbunyi saat ada kejadian. Seperti kurir memencet bel saat paket tiba.',
          'Keluarga Berbasis Kejadian mengabari saat peristiwa terjadi, tanpa menunggu ditanya.',
        ),
        hints: [t('Pikirkan siapa yang memberi kabar lebih dulu.')],
        tags: ['api'],
      }),
      makeTf({
        id: 'b04-l01-r2',
        prompt: t(
          'Tidak ada satu jalur API yang paling bagus untuk semua tugas.',
          'Tidak ada satu jenis API yang paling bagus untuk semua situasi, karena pilihan bergantung pada kebutuhan fitur.',
        ),
        answer: true,
        explainCorrect: t(
          'Tiap jalur punya tugas yang paling cocok. Radio bagus untuk kabar, restoran untuk bertanya.',
          'Pilihan bergantung pada arah dan waktu komunikasi fitur itu. Cocokkan kebutuhan dengan jenis API yang tepat.',
        ),
        explainWrong: t(
          'Tiap jalur punya kelebihan dan batas. Tidak ada yang cocok untuk semua tugas.',
          'Setiap jenis API punya kelebihan dan batas sendiri, sesuai kasusnya.',
        ),
        hints: [t('Ingat peta dengan tiga jalur.')],
        tags: ['api'],
      }),
    ],
    recap: t(
      'Ada tiga jalur API. Restoran untuk bertanya, radio untuk kabar, bel pintu untuk kejadian.',
      'Dua pertanyaan, yaitu siapa memulai dan berapa arahnya, memetakan API ke Tanya-Jawab, Realtime, atau Berbasis Kejadian.',
    ),
    companion: {
      talkPrompts: ['Aplikasi chat keluarga butuh jalur apa, dan jadwal cuaca jalur apa?'],
      offlineActivity:
        'Kelompokkan mainan atau kartu tugas di rumah menjadi 3 tumpukan: restoran (pesan makan), radio atau telepon (mengobrol langsung), dan bel pintu (paket datang).',
    },
  }),

  makeLesson({
    id: 'b04-l02',
    worldId: 'b04',
    title: 'REST: perpustakaan dan rak bernomor',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menjelaskan alamat kata benda dan pelayan pelupa.',
      'Kamu bisa menulis URL REST yang rapi dan menyebutkan prinsip dasar REST, termasuk stateless.',
    ),
    atWork:
      'Kamu akan menamai alamat seperti /produk/12/ulasan saat merancang endpoint baru bersama tim backend.',
    estMinutes: 6,
    introducesTerms: ['rest'],
    usesTerms: ['api', 'endpoint', 'http-method', 'url', 'cookie-cache'],
    stickerId: 'perpustakaan-rest',
    warmupFrom: 'b04-l01',
    steps: [
      storyStep('b04/perpustakaan-rest.svg', [
        rText(
          'Perpustakaan punya rak bernomor. Setiap rak berlabel nama benda, seperti "buku". Lalu bagaimana kamu meminjam, menambah, atau menghapus buku?',
          'Tim mobile Toko Rani meminta alamat API yang mudah ditebak untuk data produk. Gaya REST menjawabnya: tiap benda (resource) punya alamat sendiri, dan aksinya lewat method HTTP.',
        ),
      ]),
      conceptStep({
        title: t('Kata benda, bukan kata kerja'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b04', topic: 'perpustakaan-rest' },
        alt: t(
          'Rak berlabel benda, kata kerja pinjam dan hapus ditulis di kartu perintah.',
          'URL REST memakai kata benda untuk kumpulan data, seperti /produk, dan kata kerjanya adalah GET, POST, atau DELETE.',
        ),
        code: {
          lang: 'text',
          code: 'BUKAN REST: POST /hapusProduk?id=12\nGAYA REST : DELETE /produk/12',
          highlight: [2],
        },
        body: [
          rTerm('rest', 'REST', 'REST'),
          rJunior(
            ' adalah cara menata API seperti rak perpustakaan. Label rak memakai nama benda. Kata kerja, seperti pinjam, ditulis di kartu perintah.',
          ),
          rPro(' adalah gaya merancang API. Setiap data (resource) punya alamat berupa kata benda yang menamai kumpulan data, seperti '),
          rCode('/produk', ['pro']),
          rPro(' (di API berbahasa Inggris: /products). Aksinya ditentukan method HTTP, bukan kata kerja di URL.'),
        ],
      }),
      qStep({
        id: 'b04-l02-q1j',
        type: 'sort',
        modes: ['junior'],
        prompt: t('Kelompokkan kata-kata ini ke tempat yang tepat.'),
        difficulty: 1,
        items: [
          { id: 'buku', label: t('Buku') },
          { id: 'pinjam', label: t('Meminjam') },
          { id: 'rak', label: t('Rak') },
          { id: 'hapus', label: t('Menghapus') },
        ],
        bins: [
          { id: 'benda', label: t('Nama benda'), icon: 'box' },
          { id: 'aksi', label: t('Kata kerja'), icon: 'zap' },
        ],
        answer: { buku: 'benda', pinjam: 'aksi', rak: 'benda', hapus: 'aksi' },
        explainCorrect: t(
          'Label rak memakai nama benda. Kata kerja ditulis di tempat lain.',
        ),
        hints: [t('Ingat label rak di perpustakaan.'), undefined],
        tags: ['rest', 'url'],
      }),
      qStep({
        id: 'b04-l02-q1',
        type: 'sort',
        modes: ['pro'],
        prompt: t('Kelompokkan alamat endpoint ini menjadi Gaya REST yang rapi atau Bukan REST.'),
        difficulty: 2,
        items: [
          { id: 'ok1', label: t('GET /produk') },
          { id: 'bad1', label: t('GET /ambilSemuaProduk') },
          { id: 'ok2', label: t('DELETE /produk/12') },
          { id: 'bad2', label: t('POST /hapusProduk?id=12') },
        ],
        bins: [
          { id: 'rest', label: t('Gaya REST (kata benda dan method)') },
          { id: 'not', label: t('Bukan REST (kata kerja di URL)') },
        ],
        answer: { ok1: 'rest', bad1: 'not', ok2: 'rest', bad2: 'not' },
        explainCorrect: t(
          'URL REST memakai kata benda seperti /produk. Kata kerjanya ada di method, bukan di URL seperti /ambilSemuaProduk.',
        ),
        hints: [t('Cari URL yang memuat kata kerja.'), undefined],
        tags: ['rest', 'endpoint', 'http-method'],
      }),
      conceptStep({
        title: t('Pola CRUD dan Nested Resource'),
        modes: ['pro'],
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b04', topic: 'crud-rest' },
        alt: t('GET /produk, POST /produk, PATCH /produk/12, DELETE /produk/12 dan /pembeli/5/pesanan.'),
        body: [
          rPro(
            'Pakai GET untuk membaca, POST untuk membuat, PATCH untuk mengubah, dan DELETE untuk menghapus data. Untuk data milik data lain, pakai nested resource (data di dalam data lain) maksimal dua tingkat, seperti ',
          ),
          rCode('/pembeli/5/pesanan', ['pro']),
          rPro('. Pakai satu bahasa untuk semua nama di satu API.'),
        ],
      }),
      conceptStep({
        title: t('Pelayan pelupa', 'Stateless dan prinsip REST'),
        visualName: 'RestoranDiagram',
        visualProps: { worldId: 'b04', topic: 'stateless-rest' },
        alt: t(
          'Pelayan pelupa tidak ingat tamu, jadi tiap pesanan ditulis lengkap.',
          'Server stateless tidak mengingat client, jadi setiap request membawa info lengkap.',
        ),
        body: [
          rText(
            'Pelayan REST itu pelupa. Ia tidak ingat pesananmu yang tadi. Jadi setiap pesanan harus lengkap.',
            'Stateless berarti server tidak mengingat request sebelumnya, jadi setiap request membawa semua info yang dibutuhkan, termasuk bukti login. Prinsip lain: client dan server terpisah, respons bisa di-cache, interface seragam, dan sistem berlapis.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b04-l02-q2',
          type: 'analogy',
          prompt: t(
            'Mengapa pelayan pelupa cocok untuk menggambarkan REST?',
            'Mengapa prinsip stateless pada REST diumpamakan pelayan restoran yang pelupa?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'full',
              label: t(
                'Pesanan harus lengkap tanpa mengandalkan ingatan',
                'Setiap request harus lengkap, tanpa mengandalkan ingatan server',
              ),
            },
            {
              id: 'bad',
              label: t(
                'Pelayan sering lupa mengantar pesanan ke meja',
                'Server sering lupa menyimpan data barang di database setelah restart',
              ),
              explainWrong: t(
                'Pelayan tetap mengantar pesanan. Yang ia lupa hanyalah percakapan lama.',
                'Database tetap menyimpan data. Yang tidak disimpan adalah ingatan sesi percakapan di tiap server.',
              ),
            },
            {
              id: 'slow',
              label: t(
                'Pelayan menolak melayani tamu yang sudah pernah datang',
                'Server menolak melayani client yang pernah mengirim request sebelumnya',
              ),
              explainWrong: t(
                'Pelayan pelupa tetap melayani tamu lama. Tamu hanya perlu menyebut pesanan lengkap.',
                'Server stateless tetap melayani client lama, selama setiap request-nya lengkap.',
              ),
            },
          ],
          answer: 'full',
          explainCorrect: t(
            'Pelayan pelupa tidak menyimpan ingatan. Pelayan mana pun yang kosong bisa langsung melayani.',
            'Karena stateless, server mana pun yang sedang kosong bisa langsung melayani request.',
          ),
          hints: [
            t('Ingat pelayan yang tidak ingat pesananmu tadi.', 'Tanyakan: apa yang tidak disimpan server?'),
          ],
          tags: ['rest'],
        }),
      ),
      limitStep({
        analogy: t('REST seperti perpustakaan dengan rak bernomor dan pelayan yang pelupa'),
        same: [
          t('Setiap benda punya alamat rak tetap dan dikelola kata kerja yang seragam.'),
          t('Pelayan pelupa membuat restoran mudah menambah pelayan baru saat ramai.'),
        ],
        different: [
          t(
            'Di perpustakaan kamu membawa pulang bukunya. Di aplikasi, kamu hanya melihat salinannya.',
            'Di perpustakaan kamu membawa pulang buku fisik. Di REST, browser menerima salinan data.',
          ),
          t(
            'Kadang ada tugas yang sulit diberi nama benda, seperti membayar.',
            'Kadang aplikasi tetap butuh alamat aksi, seperti /pesanan/88/bayar, karena prosesnya tidak cocok dipaksa jadi kata benda.',
          ),
        ],
        riskyAnalogy: false,
      }),
      simStep(
        'pelayan-graphql',
        t(
          'Ini pelayan pribadi. Ia berbeda dari pelayan pelupa. Centang nama, harga, atau stok, lalu lihat yang ia bawa.',
          'Pilih kolom di simulator, lalu bandingkan dengan paket tetap bergaya REST yang berisi semua kolom.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'b04-l02-q3j',
          type: 'scenario',
          modes: ['junior'],
          story: t('Kamu duduk di restoran dengan pelayan pelupa. Kamu mau menambah 1 nasi.'),
          prompt: t('Apa yang kamu katakan?'),
          difficulty: 2,
          choices: [
            { id: 'full', label: t('Tambah 1 nasi untuk meja 5') },
            {
              id: 'tadi',
              label: t('Tambah 1 nasi untuk pesananku yang tadi'),
              explainWrong: t('Pelayan pelupa tidak tahu pesananmu yang tadi. Sebut meja dan menu lagi.'),
            },
            {
              id: 'ingat',
              label: t('Kamu ingat pesananku tadi, kan?'),
              explainWrong: t('Pelayan pelupa tidak ingat apa pun. Kamu harus menyebut semuanya.'),
            },
          ],
          answer: 'full',
          explainCorrect: t('Pesananmu lengkap, jadi pelayan bisa bekerja. Seperti surat beralamat lengkap.'),
          hints: [t('Ingat pelayan yang tidak ingat pesananmu tadi.')],
          tags: ['rest'],
        }),
      ),
      qStep(
        makeTf({
          id: 'b04-l02-q3',
          modes: ['pro'],
          prompt: t(
            'Menyusun nested resource sampai lima tingkat, seperti /toko/1/rak/2/produk/3/ulasan/4/balasan, sangat dianjurkan.',
          ),
          answer: false,
          difficulty: 2,
          explainCorrect: t(
            'Pernyataan itu keliru: nested resource sebaiknya maksimal dua tingkat. URL tetap ringkas dan mudah dipahami.',
          ),
          explainWrong: t('URL yang bersarang terlalu dalam menyulitkan pemakaiannya. Cukup satu atau dua tingkat.'),
          hints: [t('Hitung berapa tingkat yang masih mudah dibaca.')],
          tags: ['rest', 'url'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b04-l02-q4j',
          type: 'mcq',
          modes: ['junior'],
          prompt: t('Mengapa banyak pelayan pelupa membantu saat restoran ramai?'),
          difficulty: 2,
          choices: [
            { id: 'any', label: t('Pelayan mana pun bisa melayani tamu') },
            {
              id: 'one',
              label: t('Satu pelayan harus melayani semua tamu'),
              explainWrong: t('Justru banyak pelayan yang melayani. Setiap pelayan bisa menerima tamu siapa saja.'),
            },
            {
              id: 'no',
              label: t('Tamu tidak perlu memesan lagi'),
              explainWrong: t('Tamu tetap memesan. Hanya saja pesanannya harus lengkap setiap kali.'),
            },
          ],
          answer: 'any',
          explainCorrect: t('Pelayan pelupa tidak butuh ingatan, jadi pelayan mana pun bisa melayani.'),
          hints: [t('Ingat: pelayan pelupa tidak menyimpan ingatan tamu.')],
          tags: ['rest'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b04-l02-q4',
          modes: ['pro'],
          prompt: t('Penulisan URL REST mana yang mengikuti kebiasaan penamaan terbaik?'),
          difficulty: 2,
          choices: [
            { id: 'good', label: t('GET /jenis-produk?urut=-harga') },
            {
              id: 'mix1',
              label: t('GET /Jenis_Product/ambil'),
              explainWrong: t(
                'URL ini mencampur huruf kapital, garis bawah, dua bahasa, dan kata kerja. Penamaan REST memilih huruf kecil dan satu bahasa.',
              ),
            },
            {
              id: 'mix2',
              label: t('GET /categories-produk/LIST?urut=harga'),
              explainWrong: t(
                'URL ini mencampur bahasa Inggris dan Indonesia, lalu memakai kata kerja kapital. Pilih satu bahasa dan kata benda.',
              ),
            },
          ],
          answer: 'good',
          explainCorrect: t(
            'Huruf kecil semua, tanda hubung (-), dan satu bahasa. Urutan ditaruh di query parameter, dan tanda minus di -harga berarti urut dari harga tertinggi.',
          ),
          hints: [t('Cari URL yang konsisten: huruf kecil, satu bahasa, tanpa kata kerja.')],
          tags: ['rest', 'url'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b04-l02-q5',
          type: 'limit',
          modes: ['pro'],
          analogy: t('REST seperti perpustakaan yang semua alamatnya harus kata benda'),
          prompt: t('Kapan tim kadang tetap memakai alamat aksi seperti POST /pesanan/88/bayar?'),
          difficulty: 2,
          choices: [
            { id: 'act', label: t('Saat proses seperti pembayaran tidak natural kalau dipaksa jadi kata benda') },
            {
              id: 'never',
              label: t('Tidak pernah, karena browser memblokir semua URL yang memuat kata kerja di dalamnya'),
              explainWrong: t('Browser tidak memblokirnya. REST adalah kebiasaan merancang, bukan aturan yang dipaksakan browser.'),
            },
            {
              id: 'css',
              label: t('Saat tim ingin URL lebih panjang agar terlihat lengkap'),
              explainWrong: t('Panjang URL bukan alasan teknis. Aksi dipakai karena prosesnya lebih cocok sebagai aksi.'),
            },
          ],
          answer: 'act',
          explainCorrect: t(
            'REST adalah pedoman agar konsisten, bukan penjara kaku. Proses bisnis yang lebih cocok sebagai aksi boleh memakai alamat aksi.',
          ),
          hints: [t('Pikirkan proses yang sulit dijadikan satu benda.')],
          tags: ['rest', 'endpoint'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b04-l02-q6',
          type: 'scenario',
          modes: ['pro'],
          story: t('Raka ingin mengambil semua ulasan milik produk nomor 12 di Toko Rani dengan gaya REST.'),
          prompt: t('Susunan method dan URL mana yang paling tepat?'),
          difficulty: 2,
          choices: [
            { id: 'ok', label: t('GET /produk/12/ulasan') },
            {
              id: 'bad1',
              label: t('POST /lihatUlasan?produk=12'),
              explainWrong: t('Membaca data memakai GET, dan URL memakai kata benda, bukan kata kerja seperti lihat.'),
            },
            {
              id: 'bad2',
              label: t('DELETE /ulasan/produk/12'),
              explainWrong: t('DELETE akan menghapus data, bukan mengambil daftar ulasan.'),
            },
          ],
          answer: 'ok',
          explainCorrect: t(
            '/produk/12/ulasan menunjukkan ulasan milik produk nomor 12, dan GET dipakai untuk membaca.',
          ),
          hints: [t('Susun dari benda terbesar: produk, lalu ulasan di dalamnya.')],
          tags: ['rest', 'http-method'],
        }),
      ),
      qStep({
        id: 'b04-l02-q7',
        type: 'type',
        modes: ['pro'],
        prompt: t(
          'Ketik nama prinsip REST yang berarti server tidak menyimpan ingatan request sebelumnya, jadi tiap request harus lengkap.',
        ),
        difficulty: 2,
        accept: ['stateless'],
        explainCorrect: t('Stateless membuat server backend mudah diperbanyak, karena server mana pun bisa melayani.'),
        hints: [t('Ingat kata untuk pelayan pelupa.'), undefined],
        tags: ['rest'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b04-l02-r1',
        prompt: t(
          'Di REST, kata kerja "hapus" ditulis di mana?',
          'Untuk menghapus produk nomor 12 pada gaya REST, kombinasi mana yang tepat?',
        ),
        choices: [
          { id: 'del', label: t('Di kartu perintah terpisah', 'DELETE /produk/12') },
          {
            id: 'get',
            label: t('Di label rak, sebelum nama benda', 'GET /hapusProduk/12'),
            explainWrong: t(
              'Label rak hanya berisi nama benda. Kata kerja ditulis di kartu perintah.',
              'GET tidak boleh menghapus data, dan URL REST memakai kata benda.',
            ),
          },
          {
            id: 'post',
            label: t('Di nomor rak, setelah nama benda', 'POST /produk/12/hapus'),
            explainWrong: t(
              'Nomor rak hanya menunjuk bendanya. Kata kerja tidak ditulis di sana.',
              'Menghapus sudah punya method khusus, yaitu DELETE. Alamat aksi seperti /hapus tidak diperlukan di sini.',
            ),
          },
        ],
        answer: 'del',
        explainCorrect: t(
          'Kata kerja ditulis di kartu perintah, dan label rak hanya menyebut benda.',
          'Kata kerjanya ada di method (DELETE), dan URL hanya berisi kata benda (/produk/12).',
        ),
        hints: [t('Ingat label rak hanya berisi nama benda.')],
        tags: ['rest', 'http-method'],
      }),
      makeTf({
        id: 'b04-l02-r2',
        prompt: t(
          'Pelayan pelupa tidak ingat pesananmu, jadi setiap pesanan harus lengkap.',
          'Karena REST stateless, server tidak mengingat request sebelumnya, jadi tiap request membawa info yang dibutuhkan.',
        ),
        answer: true,
        explainCorrect: t(
          'Pelayan pelupa tidak menyimpan ingatan. Karena itu pesanan harus lengkap setiap kali.',
          'Stateless membuat layanan mudah dibesarkan saat pemakai bertambah.',
        ),
        explainWrong: t(
          'Pelayan pelupa memang tidak ingat pesanan lama. Kamu harus menyebut semuanya lagi.',
          'Stateless memang berarti server tidak bergantung pada ingatan request sebelumnya.',
        ),
        hints: [t('Ingat pelayan yang tidak ingat pesananmu tadi.')],
        tags: ['rest'],
      }),
    ],
    recap: t(
      'REST memakai kata benda untuk alamat, dan pelayannya pelupa.',
      'REST memberi alamat berupa kata benda, aksinya lewat method HTTP, dan servernya stateless.',
    ),
    companion: {
      talkPrompts: ['Mengapa label rak "buku" lebih mudah dipahami daripada kalimat panjang?'],
      offlineActivity:
        'Beri label nama benda di 3 kotak di rumah, seperti "buku" dan "mainan". Lalu mainkan tebak kata kerja: ambil, tambah, ubah, hapus.',
    },
  }),

  makeLesson({
    id: 'b04-l03',
    worldId: 'b04',
    title: 'Pagination, error, versioning',
    modes: ['pro'],
    objective: t(
      'Kamu bisa memilih offset atau cursor pagination, merancang format error seragam, dan menjelaskan versioning.',
    ),
    atWork: 'Kamu akan memilih pagination dan versi /v2 saat tim mobile meminta daftar produk yang panjang.',
    estMinutes: 6,
    introducesTerms: ['pagination'],
    usesTerms: ['rest', 'api', 'kontrak-api', 'status-code', 'json', 'cookie-cache'],
    warmupFrom: 'b04-l02',
    steps: [
      storyStep('b04/pagination-versi.svg', [
        rText(
          'Toko Rani punya 50.000 produk, dan satu paket JSON berisi semuanya membuat jaringan macet. Versi baru API juga tidak boleh mematahkan aplikasi lama.',
        ),
      ]),
      conceptStep({
        title: t('Pagination: offset dan cursor'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b04', topic: 'offset-cursor' },
        alt: t('Perbandingan offset pagination (?halaman=3) dengan cursor pagination (?setelah=token).'),
        code: {
          lang: 'http',
          code: 'GET /produk?halaman=3&per_halaman=20       // Offset/page\nGET /produk?setelah=eyJpZCI6ODh9&batas=20  // Cursor',
          highlight: [1, 2],
        },
        body: [
          rTerm('pagination', 'Pagination'),
          rText(' adalah cara membagi daftar besar menjadi halaman kecil. '),
          rBold('Offset/page'),
          rText(' memakai nomor halaman: bisa lompat ke halaman 50, tetapi isinya bergeser saat data baru masuk. '),
          rBold('Cursor'),
          rText(
            ' memakai penanda posisi item terakhir, jadi stabil untuk infinite scroll (daftar tanpa halaman) meski data terus bertambah.',
          ),
        ],
      }),
      qStep({
        id: 'b04-l03-q1',
        type: 'sort',
        prompt: t('Kelompokkan ciri ini ke Offset Pagination atau Cursor Pagination.'),
        difficulty: 2,
        items: [
          { id: 'o1', label: t('Bisa langsung melompat ke halaman 50') },
          { id: 'c1', label: t('Stabil saat ada data baru masuk di feed') },
          { id: 'o2', label: t('Isi halaman bisa bergeser atau ganda saat data baru masuk') },
          { id: 'c2', label: t('Cocok untuk infinite scroll ("lanjutkan dari sini")') },
        ],
        bins: [
          { id: 'off', label: t('Offset / Page Pagination') },
          { id: 'cur', label: t('Cursor Pagination') },
        ],
        answer: { o1: 'off', c1: 'cur', o2: 'off', c2: 'cur' },
        explainCorrect: t(
          'Offset cocok untuk lompat ke nomor halaman tabel. Cursor lebih stabil untuk infinite scroll yang datanya terus bertambah.',
        ),
        hints: [t('Tanyakan: ciri ini soal nomor halaman atau penanda posisi?'), undefined],
        tags: ['pagination', 'rest'],
      }),
      conceptStep({
        title: t('Format error dan versioning'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b04', topic: 'error-versioning' },
        alt: t('Format error terstruktur status 422 dan versi endpoint /v1/produk vs /v2/produk.'),
        code: {
          lang: 'http',
          code: 'https://api.toko-rani.example/v1/produk\nhttps://api.toko-rani.example/v2/produk',
          highlight: [1, 2],
        },
        body: [
          rText('Pakai format error yang seragam, misalnya '),
          rBold('Problem Details'),
          rText(' (RFC 9457). Jangan membalas status 200 lalu menulis '),
          rCode('"sukses": false'),
          rText(' di body. Untuk perubahan besar, buat versi '),
          rCode('/v2/'),
          rText(' dan beri masa '),
          rBold('deprecation'),
          rText(' (pemberitahuan bahwa versi lama akan dimatikan) sebelum '),
          rCode('/v1/'),
          rText(' dihentikan.'),
        ],
      }),
      conceptStep({
        title: t('HATEOAS, kelebihan, dan kekurangan REST'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b04', topic: 'kelebihan-kekurangan-rest' },
        alt: t('HATEOAS links langkah berikutnya serta masalah over-fetching dan under-fetching di REST.'),
        body: [
          rBold('HATEOAS'),
          rText(' adalah kolom '),
          rCode('links'),
          rText(
            ' di response yang menunjuk langkah berikutnya, seperti struk ATM yang menawarkan menu lanjutan. Kelebihan REST: sederhana, cocok dengan ',
          ),
          rTerm('cookie-cache', 'cache HTTP'),
          rText(', dan banyak alatnya. Kekurangannya: '),
          rBold('over-fetching'),
          rText(' (data berlebih yang ikut terkirim) dan '),
          rBold('under-fetching'),
          rText(' (butuh banyak panggilan untuk satu layar).'),
        ],
      }),
      qStep({
        id: 'b04-l03-q2',
        type: 'spotbug',
        prompt: t('Ketuk dua baris yang melanggar praktik error REST yang baik.'),
        difficulty: 2,
        lines: [
          'HTTP/1.1 200 OK',
          'Content-Type: application/json',
          '{',
          '  "sukses": false,',
          '  "pesan": "Email tidak valid"',
          '}',
        ],
        answer: [1, 4],
        explainCorrect: t(
          'Status 200 berarti sukses, tetapi isinya gagal. Seharusnya status 422, dan kegagalan tidak ditulis sebagai "sukses": false.',
        ),
        hints: [t('Cocokkan kode status di baris pertama dengan isi pesannya.'), undefined],
        tags: ['rest', 'status-code', 'pagination'],
      }),
      limitStep({
        analogy: t('Offset pagination seperti nomor halaman buku, dan deprecation seperti masa ganti buku menu restoran'),
        same: [
          t(
            'Nomor halaman buku membantu kamu berpindah halaman, dan masa ganti menu memberi waktu untuk beralih.',
          ),
        ],
        different: [
          t(
            'Halaman buku kertas tidak bertambah di tengah bacaan. Tabel database terus menerima baris baru, jadi offset bisa menampilkan item ganda.',
          ),
        ],
        riskyAnalogy: false,
      }),
      simStep(
        'pelayan-graphql',
        t('Pilih kolom di simulator untuk melihat cara GraphQL menghindari data berlebih (over-fetching) yang sering terjadi di REST.'),
      ),
      qStep(
        makeMcq({
          id: 'b04-l03-q3',
          prompt: t('Apa nama pengumuman bahwa endpoint /v1/produk akan dihentikan pada akhir bulan?'),
          choices: [
            { id: 'dep', label: t('Deprecation') },
            {
              id: 'cur',
              label: t('Cursor pagination'),
              explainWrong: t('Cursor pagination adalah teknik memecah daftar data, bukan pengumuman versi.'),
            },
            {
              id: 'hat',
              label: t('HATEOAS'),
              explainWrong: t('HATEOAS adalah tautan langkah berikutnya di response, bukan pengumuman versi.'),
            },
          ],
          answer: 'dep',
          explainCorrect: t(
            'Deprecation memberi waktu bagi aplikasi lama untuk pindah ke /v2/. Seperti pengumuman masa ganti buku menu restoran.',
          ),
          tags: ['kontrak-api', 'pagination'],
        }),
      ),
      qStep(
        makeTf({
          id: 'b04-l03-q4',
          prompt: t('Problem Details (RFC 9457) memakai kolom type, title, status, dan detail untuk format error.'),
          answer: true,
          explainCorrect: t(
            'RFC 9457 membuat bentuk pesan error seragam antar layanan REST. Frontend jadi mudah memprosesnya.',
          ),
          explainWrong: t('RFC 9457 memang mendefinisikan kolom standar type, title, status, dan detail untuk error HTTP.'),
          tags: ['rest', 'pagination'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b04-l03-q5',
          type: 'limit',
          analogy: t('Offset pagination (?halaman=3) seperti nomor halaman buku cetak'),
          prompt: t('Mengapa nomor halaman buku gagal menjaga isi tetap stabil di daftar berita yang terus bertambah?'),
          difficulty: 2,
          choices: [
            { id: 'shift', label: t('Data baru menggeser item, jadi item lama muncul lagi') },
            {
              id: 'num',
              label: t('Nomor halaman tidak bisa dikirim lewat query parameter atau URL'),
              explainWrong: t('Nomor halaman mudah dikirim lewat query parameter, misalnya ?halaman=3.'),
            },
            {
              id: 'json',
              label: t('Server menolak daftar yang punya lebih dari seratus halaman'),
              explainWrong: t('Server tidak menolak daftar panjang. Masalahnya ada pada posisi item yang bergeser.'),
            },
          ],
          answer: 'shift',
          explainCorrect: t(
            'Baris baru menggeser posisi offset. Pembatas cursor lebih aman untuk data yang terus bertambah.',
          ),
          hints: [t('Bayangkan buku yang halamannya bertambah saat kamu membaca.')],
          tags: ['pagination'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b04-l03-q6',
          type: 'scenario',
          story: t(
            'Tim Toko Rani mengubah kolom "harga_diskon" menjadi objek harga baru. Aplikasi Android lama masih dipakai pembeli.',
          ),
          prompt: t('Strategi versioning mana yang menjaga aplikasi lama tetap jalan?'),
          difficulty: 2,
          choices: [
            { id: 'ver', label: t('Luncurkan /v2/produk dan pertahankan /v1/produk saat masa transisi') },
            {
              id: 'del',
              label: t('Ganti /produk langsung di tengah malam tanpa versi'),
              explainWrong: t('Aplikasi Android yang belum diperbarui akan langsung error.'),
            },
            {
              id: 'stat',
              label: t('Minta semua pembeli memperbarui aplikasi sebelum perubahan dirilis ke server'),
              explainWrong: t('Pembeli yang belum memperbarui akan langsung melihat error, karena kontrak lama sudah hilang.'),
            },
          ],
          answer: 'ver',
          explainCorrect: t('Versi /v1 dan /v2 berjalan bersamaan, jadi aplikasi lama tetap jalan selama masa transisi.'),
          hints: [t('Cari cara yang tidak memutus aplikasi lama.')],
          tags: ['kontrak-api', 'rest', 'pagination'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b04-l03-r1',
        prompt: t('Kapan sebaiknya memilih Cursor Pagination dibanding Offset Pagination?'),
        choices: [
          { id: 'inf', label: t('Untuk feed infinite scroll yang sering menerima data baru') },
          {
            id: 'jmp',
            label: t('Saat pembaca wajib bisa lompat ke halaman 47'),
            explainWrong: t('Lompat ke nomor halaman acak cocok dengan offset pagination.'),
          },
          {
            id: 'tiny',
            label: t('Untuk daftar kecil yang hanya punya satu halaman'),
            explainWrong: t('Daftar kecil tidak butuh pagination sama sekali, jadi tidak ada alasan memilih cursor.'),
          },
        ],
        answer: 'inf',
        explainCorrect: t('Cursor stabil terhadap masuknya data baru, jadi cocok untuk infinite scroll.'),
        tags: ['pagination'],
      }),
      makeMcq({
        id: 'b04-l03-r2',
        prompt: t('Apa maksud istilah HATEOAS pada REST API?'),
        choices: [
          { id: 'lnk', label: t('Response menyertakan tautan ke langkah berikutnya') },
          {
            id: 'enc',
            label: t('Cara membagi daftar besar menjadi halaman kecil'),
            explainWrong: t('Itu pagination. HATEOAS berkaitan dengan tautan di response.'),
          },
          {
            id: 'ver',
            label: t('Cara memberi nomor versi pada endpoint'),
            explainWrong: t('Itu versioning. HATEOAS berkaitan dengan tautan di response.'),
          },
        ],
        answer: 'lnk',
        explainCorrect: t('Seperti kolom links yang berisi alamat halaman berikutnya pada response pagination.'),
        tags: ['rest', 'pagination'],
      }),
    ],
    recap: t('Bagi daftar besar dengan offset atau cursor, balas error dengan format seragam, dan jaga aplikasi lama lewat versi.'),
  }),

  makeLesson({
    id: 'b04-l04',
    worldId: 'b04',
    title: 'GraphQL: pelayan pribadi',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menjelaskan pelayan pribadi dan tiga tugasnya.',
      'Kamu bisa menjelaskan over-fetching dan under-fetching, tiga operasi GraphQL, serta schema dan resolver.',
    ),
    atWork: 'Kamu akan menulis query GraphQL agar layar profil hanya mengambil nama dan foto.',
    estMinutes: 6,
    introducesTerms: ['graphql'],
    usesTerms: ['api', 'rest', 'endpoint', 'json', 'cookie-cache'],
    stickerId: 'pelayan-pribadi',
    warmupFrom: 'b04-l02',
    steps: [
      storyStep('b04/pelayan-pribadi.svg', [
        rText(
          'Di restoran biasa, pelayan membawa paket menu tetap. Kamu tidak suka sayur, tetapi sayur ikut terbawa. Bagaimana kalau kamu menulis daftar maumu sendiri?',
          'Layar profil Toko Rani hanya butuh nama dan foto, tetapi REST mengirim 30 kolom lewat 2 panggilan. GraphQL adalah cara meminta persis kolom yang dibutuhkan lewat satu pintu.',
        ),
      ]),
      conceptStep({
        title: t('Paket terlalu penuh atau kurang', 'Over-fetching dan Under-fetching'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b04', topic: 'over-under-fetching' },
        alt: t(
          'Satu paket sembako padahal hanya butuh telur, atau belanja ke tiga toko.',
          'Over-fetching seperti membeli paket sembako padahal hanya butuh telur. Under-fetching seperti belanja ke tiga toko.',
        ),
        body: [
          rJunior(
            'Kamu hanya mau telur, tetapi dapat satu paket sembako. Itu disebut data kebanyakan. Kalau harus ke tiga toko, itu data kurang.',
          ),
          proBold('Over-fetching'),
          rPro(' (data berlebih) terjadi saat aplikasi menerima jauh lebih banyak data daripada kebutuhan. '),
          proBold('Under-fetching'),
          rPro(' (data kurang) terjadi saat satu endpoint belum cukup, jadi aplikasi memanggil beberapa kali.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b04-l04-q1',
          type: 'analogy',
          prompt: t(
            'Kamu hanya mau telur, tetapi dapat satu paket sembako. Apa masalahnya?',
            'Membeli satu paket sembako padahal hanya butuh telur menggambarkan masalah apa?',
          ),
          choices: [
            { id: 'over', label: t('Data kebanyakan', 'Over-fetching (data berlebih)') },
            {
              id: 'under',
              label: t('Data datang terlambat', 'Latensi tinggi karena jaringan lambat'),
              explainWrong: t(
                'Cepat atau lambat tidak ditanyakan. Masalahnya ada pada isi paket yang kebanyakan.',
                'Kecepatan jaringan tidak disebut di cerita. Masalahnya ada pada kolom berlebih yang ikut terkirim.',
              ),
            },
            {
              id: 'mut',
              label: t('Data kurang', 'Under-fetching (data kurang)'),
              explainWrong: t(
                'Data kurang berarti harus ke tiga toko. Kamu justru dapat terlalu banyak.',
                'Under-fetching berarti harus memanggil beberapa kali. Di sini data yang datang justru terlalu banyak.',
              ),
            },
          ],
          answer: 'over',
          explainCorrect: t(
            'Kamu membawa pulang banyak yang tidak dipakai. Itu disebut data kebanyakan.',
            'Over-fetching berarti server mengirim kolom yang tidak dipakai layar. Seperti membeli satu paket sembako untuk satu telur.',
          ),
          hints: [t('Ingat paket sembako yang tidak habis dipakai.')],
          tags: ['graphql'],
        }),
      ),
      conceptStep({
        title: t('Satu pintu, bentuk sama', 'Satu Endpoint dan Bentuk Query'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b04', topic: 'pelayan-pribadi' },
        alt: t(
          'Kamu menulis daftar nama dan foto, pelayan membawa persis itu.',
          'GraphQL meminta nama, foto, dan 3 judul postingan, lalu jawabannya berstruktur sama.',
        ),
        code: {
          lang: 'text',
          code: '# Query GraphQL\nquery {\n  pengguna(id: 5) {\n    nama\n    foto\n    postingan(batas: 3) { judul }\n  }\n}',
          highlight: [3, 4, 5],
        },
        body: [
          rTerm('graphql', 'GraphQL', 'GraphQL'),
          rJunior(
            ' adalah pelayan pribadi. Kamu menulis daftar yang kamu mau, dan ia membawa persis itu. Tugasnya ada tiga: membaca, mengubah, dan memberi kabar langsung.',
          ),
          rPro(' umumnya memakai satu endpoint, yaitu '),
          rCode('POST /graphql', ['pro']),
          rPro('. Client menulis kolom yang dibutuhkan, lalu server menjawab dengan JSON berbentuk sama.'),
        ],
      }),
      conceptStep({
        title: t('Operasi, Schema, dan Resolver'),
        modes: ['pro'],
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b04', topic: 'schema-resolver' },
        alt: t('Operasi query, mutation, subscription serta schema menu ketat dan resolver per kolom.'),
        body: [
          rText(
            'GraphQL punya tiga operasi: query untuk membaca, mutation untuk mengubah, dan subscription untuk pembaruan realtime. Schema adalah buku menu yang ketat, dengan tanda seru (!) untuk kolom wajib. Resolver adalah koki yang mengambil nilai tiap kolom.',
          ),
        ],
      }),
      qStep({
        id: 'b04-l04-q2',
        type: 'match',
        prompt: t(
          'Pasangkan tiga tugas pelayan pribadi dengan artinya.',
          'Pasangkan tiga operasi GraphQL dengan padanannya di REST atau WebSocket.',
        ),
        difficulty: 2,
        left: [
          { id: 'q', label: t('Membaca', 'query') },
          { id: 'm', label: t('Mengubah', 'mutation') },
          { id: 's', label: t('Kabar langsung', 'subscription') },
        ],
        right: [
          { id: 'r_m', label: t('Mengganti isi pesanan', 'POST, PUT, PATCH, DELETE (mengubah data)') },
          { id: 'r_s', label: t('Dapat kabar saat pesanan siap', 'Realtime (biasanya lewat WebSocket)') },
          { id: 'r_q', label: t('Melihat isi menu', 'GET (membaca data)') },
        ],
        answer: { q: 'r_q', m: 'r_m', s: 'r_s' },
        explainCorrect: t(
          'Membaca hanya melihat isi. Mengubah mengganti isi, dan kabar langsung datang sendiri.',
          'Query membaca data, mutation mengubahnya, dan subscription mengirim pembaruan realtime.',
        ),
        hints: [
          t('Ingat tiga tugas pelayan pribadi.', 'Cocokkan kata kerja REST dengan operasi GraphQL yang sepadan.'),
        undefined,
        ],
        tags: ['graphql', 'rest'],
      }),
      limitStep({
        analogy: t(
          'GraphQL seperti pelayan pribadi yang membawa persis daftarmu',
          'GraphQL seperti pelayan pribadi yang membawakan tepat daftar pesananmu',
        ),
        same: [
          t(
            'Kamu mendapat persis yang kamu minta, tanpa sisa.',
            'Kamu mendapat persis kolom yang diminta, tanpa sisa dan tanpa kekurangan, dalam satu kali pesan.',
          ),
        ],
        different: [
          t(
            'Pelayan melayani 1 meja. GraphQL melayani banyak aplikasi.',
            'Satu alamat POST /graphql membuat caching HTTP lebih sulit daripada URL GET milik REST. Untuk CRUD sederhana atau unggah file, GraphQL juga bisa lebih rumit.',
          ),
        ],
        riskyAnalogy: true,
      }),
      simStep(
        'pelayan-graphql',
        t(
          'Centang nama, harga, atau stok, lalu lihat jawaban pelayan berubah.',
          'Uji di simulator bagaimana centang kolom mengubah query dan jawabannya.',
        ),
      ),
      qStep(
        makeTf({
          id: 'b04-l04-q3',
          modes: ['pro'],
          prompt: t('Client GraphQL boleh meminta kolom apa saja, walau kolom itu tidak ada di schema server.'),
          answer: false,
          difficulty: 2,
          explainCorrect: t(
            'Pernyataan itu keliru: schema adalah buku menu yang ketat. Client hanya bisa meminta kolom yang terdaftar di sana.',
          ),
          explainWrong: t('Client bebas memilih kolom, tetapi hanya dari daftar di schema.'),
          hints: [t('Ingat buku menu: apa yang boleh dipesan?')],
          tags: ['graphql'],
        }),
      ),
      qStep({
        id: 'b04-l04-q4',
        type: 'hotspot',
        modes: ['pro'],
        prompt: t('Ketuk bagian yang bertugas mengambil nilai tiap kolom di server GraphQL.'),
        difficulty: 2,
        image: 'b04-hotspot',
        regions: [
          { id: 'r1', shape: 'rect', coords: [10, 10, 150, 50], label: 'Schema (buku menu tipe data)' },
          { id: 'r2', shape: 'rect', coords: [170, 10, 320, 50], label: 'Resolver (fungsi pengambil per kolom)' },
          { id: 'r3', shape: 'rect', coords: [10, 70, 320, 110], label: 'Endpoint POST /graphql (pintu masuk)' },
        ],
        answer: 'r2',
        explainCorrect: t(
          'Resolver adalah fungsi di server yang mengambil nilai untuk setiap kolom. Ia berperan seperti koki per kolom.',
        ),
        explainIncorrect: {
          r1: t('Schema adalah daftar aturan, seperti buku menu. Ia tidak memasak.'),
          r3: t('Alamat POST /graphql hanyalah pintu masuk. Ia menerima query lalu meneruskannya.'),
        },
        hints: [t('Cari bagian yang berupa fungsi, bukan daftar atau alamat.'), undefined],
        tags: ['graphql'],
      }),
      qStep(
        makeMcq({
          id: 'b04-l04-q5',
          type: 'limit',
          analogy: t(
            'GraphQL sebagai pelayan pribadi yang membawa persis daftarmu',
            'GraphQL sebagai pelayan pribadi yang jauh lebih fleksibel dari paket menu REST',
          ),
          prompt: t(
            'Kamu selalu memesan menu yang sama. Pelayan mana yang paling mudah?',
            'Kapan REST justru lebih sederhana dan menguntungkan daripada GraphQL?',
          ),
          difficulty: 2,
          choices: [
            {
              id: 'sim',
              label: t(
                'Menu tetap dari pelayan biasa',
                'CRUD sederhana atau katalog publik dengan cache URL',
              ),
            },
            {
              id: 'mob',
              label: t(
                'Pelayan pribadi dengan daftar baru tiap hari',
                'Layar HP butuh profil dan 3 postingan dalam 1 panggilan',
              ),
              explainWrong: t(
                'Menulis daftar baru tiap hari merepotkan kalau pesananmu sama terus.',
                'Kasus ini justru kekuatan utama GraphQL, yaitu menggabungkan beberapa data dalam satu panggilan.',
              ),
            },
            {
              id: 'no',
              label: t(
                'Pelayan baru yang tidak tahu menumu',
                'Proyek perlu bentuk data yang berubah di setiap layar',
              ),
              explainWrong: t(
                'Pelayan baru justru butuh daftar yang lengkap. Menu tetap sudah cukup untuk pesanan yang sama.',
                'Bentuk data yang berubah-ubah justru cocok dengan GraphQL, karena kolom dipilih per layar.',
              ),
            },
          ],
          answer: 'sim',
          explainCorrect: t(
            'Kalau pesananmu selalu sama, menu tetap paling mudah. Tidak perlu menulis daftar setiap kali.',
            'Untuk CRUD sederhana dengan cache yang kuat, REST lebih ringkas tanpa beban schema dan resolver.',
          ),
          hints: [
            t('Pikirkan pesanan yang tidak pernah berubah.', 'Pikirkan kasus yang tidak butuh memilih kolom.'),
          ],
          tags: ['graphql', 'rest', 'cookie-cache'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b04-l04-q6',
          type: 'scenario',
          story: t(
            'Kamu hanya mau nasi dan telur. Pelayan biasa membawa satu nampan penuh. Banyak yang tidak kamu makan.',
            'Layar profil Toko Rani hanya butuh nama, foto, dan 3 judul postingan terakhir. Dengan REST, aplikasi memanggil 2 endpoint dan menerima 30 kolom, padahal hanya beberapa yang dipakai.',
          ),
          prompt: t('Apa untungnya punya pelayan pribadi?', 'Dua masalah apa yang teratasi dengan satu query GraphQL?'),
          difficulty: 2,
          choices: [
            {
              id: 'both',
              label: t('Kamu dapat persis yang kamu minta', 'Over-fetching dan under-fetching sekaligus'),
            },
            {
              id: 'css',
              label: t('Kamu dapat semua menu sekaligus di nampan', 'Hanya over-fetching, under-fetching tetap ada'),
              explainWrong: t(
                'Semua menu sekaligus adalah nampan penuh. Pelayan pribadi justru membawa lebih sedikit.',
                'Satu query GraphQL juga menggabungkan beberapa sumber, jadi under-fetching ikut teratasi.',
              ),
            },
            {
              id: 'dns',
              label: t('Kamu tidak perlu memesan lagi', 'Hanya under-fetching, over-fetching tetap ada'),
              explainWrong: t(
                'Kamu tetap menulis daftar. Pelayan pribadi hanya membawa sesuai daftar itu.',
                'Query yang memilih kolom juga menghapus data berlebih, jadi over-fetching ikut teratasi.',
              ),
            },
          ],
          answer: 'both',
          explainCorrect: t(
            'Pelayan pribadi hanya membawa yang kamu sebut. Tidak lebih, tidak kurang.',
            'Satu query meminta tepat kolom yang dibutuhkan dari beberapa sumber. Data berlebih dan panggilan tambahan sama-sama hilang.',
          ),
          hints: [
            t('Ingat nampan penuh yang tidak habis dimakan.', 'Hitung jumlah panggilan dan jumlah kolom yang terpakai.'),
          ],
          tags: ['graphql', 'rest'],
        }),
      ),
      qStep({
        id: 'b04-l04-q7',
        type: 'fill',
        modes: ['pro'],
        prompt: t('Lengkapi tiga operasi utama GraphQL sesuai perannya.'),
        difficulty: 2,
        template:
          'Untuk membaca data pakai ___, untuk membuat atau mengubah data pakai ___, dan untuk pembaruan realtime pakai ___.',
        bank: ['query', 'mutation', 'subscription', 'resolver'],
        answer: ['query', 'mutation', 'subscription'],
        explainCorrect: t('Query membaca data, mutation mengubah data, dan subscription mengirim pembaruan realtime.'),
        hints: [t('Ingat tiga peran: baca, ubah, realtime.'), undefined],
        tags: ['graphql'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'b04-l04-r1',
        prompt: t(
          'Kamu menerima lebih banyak daripada yang kamu butuhkan. Apa namanya?',
          'Apa nama masalah saat aplikasi menerima data lebih banyak daripada yang dibutuhkan layar?',
        ),
        choices: [
          { id: 'ov', label: t('Data kebanyakan', 'Over-fetching') },
          {
            id: 'un',
            label: t('Data kurang', 'Under-fetching'),
            explainWrong: t(
              'Data kurang berarti satu pesanan tidak cukup. Kamu harus memesan lagi.',
              'Under-fetching berarti satu panggilan tidak cukup, jadi harus memanggil lagi.',
            ),
          },
          {
            id: 'sl',
            label: t('Data terlambat', 'Latensi'),
            explainWrong: t(
              'Terlambat artinya lambat sampai. Di sini isinya yang kebanyakan.',
              'Latensi adalah jeda waktu jaringan. Di sini masalahnya ada pada jumlah data.',
            ),
          },
        ],
        answer: 'ov',
        explainCorrect: t(
          'Data kebanyakan terbuang, seperti sayur yang tidak dimakan.',
          'Over-fetching membuang kuota karena membawa kolom yang tidak terpakai.',
        ),
        hints: [t('Ingat paket sembako yang tidak habis dipakai.')],
        tags: ['graphql'],
      }),
      makeTf({
        id: 'b04-l04-r2',
        prompt: t(
          'Pelayan pribadi selalu membawa persis yang ada di daftarmu.',
          'Bentuk JSON jawaban GraphQL selalu mengikuti persis kolom yang diminta.',
        ),
        answer: true,
        explainCorrect: t(
          'Apa yang kamu tulis, itu yang dibawa pelayan.',
          '"Apa yang kamu minta, itu yang kamu dapat" adalah ciri khas GraphQL.',
        ),
        explainWrong: t(
          'Pelayan pribadi memang membawa persis sesuai daftarmu. Tidak lebih, tidak kurang.',
          'Jawaban GraphQL memang mencerminkan persis daftar kolom yang diminta query.',
        ),
        hints: [t('Ingat pelayan yang membaca daftarmu.')],
        tags: ['graphql', 'json'],
      }),
    ],
    recap: t(
      'Pelayan pribadi membawa persis yang kamu minta, tidak lebih dan tidak kurang.',
      'GraphQL mengatasi over-fetching dan under-fetching. Satu query meminta kolom persis, dan schema menjaga bentuknya.',
    ),
    companion: {
      talkPrompts: ['Mengapa memilih lauk sendiri lebih hemat daripada nasi kotak tetap?'],
      offlineActivity:
        'Tulis daftar menu makan malam keluarga dengan memilih 3 lauk yang paling kamu suka, lalu bandingkan dengan paket komplet isi 8 jenis.',
    },
  }),

  makeLesson({
    id: 'b04-l05',
    worldId: 'b04',
    title: 'gRPC: interkom berkode',
    modes: ['pro'],
    objective: t(
      'Kamu bisa menjelaskan cara kerja gRPC di atas HTTP/2 dan Protobuf serta kapan gRPC unggul dibanding REST.',
    ),
    atWork: 'Kamu akan melihat gRPC saat layanan Pesanan memanggil layanan Gudang di backend Toko Rani.',
    estMinutes: 6,
    introducesTerms: ['grpc'],
    usesTerms: ['api', 'protobuf', 'server', 'browser', 'kontrak-api'],
    stickerId: 'interkom-grpc',
    warmupFrom: 'b04-l04',
    steps: [
      storyStep('b04/interkom-grpc.svg', [
        rText(
          'Di backend Toko Rani, layanan Pesanan memanggil layanan Gudang 1.000 kali per detik. Untuk jalur sepadat ini, interkom berkode yang disebut gRPC biasanya lebih cepat daripada REST. Pesannya berupa biner Protobuf yang ringkas.',
        ),
      ]),
      conceptStep({
        title: t('Apa itu gRPC?'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b04', topic: 'interkom-grpc' },
        alt: t('Dua layanan internal berkomunikasi lewat gRPC memakai kontrak .proto.'),
        body: [
          rTerm('grpc', 'gRPC'),
          rText(' adalah cara satu server memanggil fungsi di server lain (RPC, Remote Procedure Call). Pesannya memakai format biner (bukan teks) bernama '),
          rTerm('protobuf', 'Protobuf'),
          rText(', jadi lebih kecil daripada JSON. gRPC berjalan di atas '),
          rBold('HTTP/2'),
          rText('.'),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b04-l05-q1',
          type: 'analogy',
          prompt: t('Mengapa gRPC diumpamakan interkom berkode antar ruangan di satu gedung?'),
          choices: [
            { id: 'int', label: t('Sangat cepat dan ringkas untuk panggilan antar layanan') },
            {
              id: 'pub',
              label: t('Pesan binernya mudah dibaca langsung oleh browser'),
              explainWrong: t(
                'Browser justru butuh proxy gRPC-Web, dan pesan biner tidak terbaca manusia.',
              ),
            },
            {
              id: 'css',
              label: t('Pesannya berupa teks panjang yang mudah diaudit manusia'),
              explainWrong: t(
                'Teks panjang adalah ciri SOAP atau JSON. gRPC memakai pesan biner yang ringkas.',
              ),
            },
          ],
          answer: 'int',
          explainCorrect: t(
            'gRPC mengutamakan kecepatan antar layanan internal, bukan keterbacaan. Seperti interkom berkode yang hanya dimengerti rekan satu gedung.',
          ),
          hints: [t('Ingat siapa yang memakai interkom: rekan satu gedung.')],
          tags: ['grpc', 'protobuf'],
        }),
      ),
      conceptStep({
        title: t('Kontrak .proto dan mode streaming'),
        visualName: 'SequenceDiagram',
        visualProps: { worldId: 'b04', topic: 'streaming-grpc' },
        alt: t('Kontrak file .proto mendefinisikan layanan RPC serta mode unary dan streaming HTTP/2.'),
        code: {
          lang: 'text',
          code: 'service GudangService {\n  rpc CekStok (StokRequest) returns (StokReply);\n}',
          highlight: [2],
        },
        body: [
          rText('Kontrak gRPC ditulis dalam berkas '),
          rCode('.proto'),
          rText(
            ', lalu menghasilkan kode client dan server otomatis. Berkat HTTP/2, gRPC mendukung panggilan tunggal (unary) dan streaming satu arah maupun dua arah.',
          ),
        ],
      }),
      conceptStep({
        title: t('Kapan pakai gRPC, dan batasnya di browser'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b04', topic: 'grpc-microservices' },
        alt: t('gRPC unggul untuk komunikasi antar layanan internal, tetapi browser butuh proxy gRPC-Web.'),
        body: [
          rText('gRPC paling cocok untuk panggilan cepat antar '),
          rTerm('server', 'server'),
          rText(' internal. '),
          rTerm('browser', 'Browser'),
          rText(' tidak bisa memanggil gRPC mentah, jadi butuh proxy '),
          rCode('gRPC-Web'),
          rText('. Isi pesan biner juga tidak terbaca mata tanpa alat bantu.'),
        ],
      }),
      qStep({
        id: 'b04-l05-q2',
        type: 'match',
        prompt: t('Pasangkan komponen gRPC dengan perannya.'),
        difficulty: 2,
        left: [
          { id: 'p', label: t('Protobuf') },
          { id: 'h', label: t('HTTP/2') },
          { id: 'c', label: t('Berkas .proto') },
        ],
        right: [
          { id: 'rc', label: t('Kontrak ketat yang menghasilkan kode otomatis') },
          { id: 'rp', label: t('Format biner yang kecil dan cepat') },
          { id: 'rh', label: t('Protokol yang mengirim banyak pesan dalam satu koneksi') },
        ],
        answer: { p: 'rp', h: 'rh', c: 'rc' },
        explainCorrect: t('Protobuf mengemas data, HTTP/2 mengirimnya, dan berkas .proto menjadi kontraknya.'),
        hints: [t('Satu komponen adalah format, satu protokol, satu kontrak.'), undefined],
        tags: ['grpc', 'protobuf', 'kontrak-api'],
      }),
      limitStep({
        analogy: t('gRPC seperti interkom berkode singkatan antar ruangan dapur'),
        same: [
          t('Keduanya mengorbankan keterbacaan bagi orang luar demi kecepatan antar rekan internal.'),
        ],
        different: [
          t(
            'Interkom hanya membawa suara. gRPC juga menghasilkan kode client otomatis dalam banyak bahasa dari satu berkas .proto.',
          ),
        ],
        riskyAnalogy: false,
      }),
      simStep(
        'pelayan-graphql',
        t('Di simulator ini permintaan ditulis sebagai teks yang bisa dibaca. Pilih beberapa kolom, lalu bayangkan pesan yang sama dikirim gRPC sebagai biner yang ringkas dan tidak terbaca manusia.'),
      ),
      qStep(
        makeTf({
          id: 'b04-l05-q3',
          prompt: t('Browser biasa bisa memanggil gRPC mentah tanpa proxy atau adaptor apa pun.'),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru: browser tidak membuka akses ke frame HTTP/2 mentah. Karena itu proxy gRPC-Web dibutuhkan.',
          ),
          explainWrong: t('Browser butuh penghubung seperti proxy gRPC-Web atau gateway REST di depannya.'),
          tags: ['grpc', 'browser'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b04-l05-q4',
          type: 'why',
          base: 'Kontrak layanan gRPC ditulis dalam file .proto sebelum menulis kode fungsi di tiap layanan.',
          prompt: t('Apa keuntungan utama menulis kontrak .proto lebih dulu?'),
          difficulty: 2,
          choices: [
            { id: 'gen', label: t('Kode client dan server dibuat otomatis, tipenya pasti cocok') },
            {
              id: 'nocode',
              label: t('Browser bisa memanggil layanan langsung tanpa proxy tambahan'),
              explainWrong: t('Browser tetap butuh proxy gRPC-Web. Kontrak .proto tidak mengubah hal itu.'),
            },
            {
              id: 'html',
              label: t('Panggilan jaringan menjadi tidak diperlukan lagi'),
              explainWrong: t('gRPC tetap berjalan lewat jaringan di antara client dan server.'),
            },
          ],
          answer: 'gen',
          explainCorrect: t(
            'Generator kode memakai .proto sebagai sumber tunggal. Pengirim dan penerima tidak pernah salah mengetik nama kolom.',
          ),
          hints: [t('Pikirkan apa yang bisa dibuat otomatis dari satu kontrak.')],
          tags: ['grpc', 'kontrak-api'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b04-l05-q5',
          type: 'limit',
          analogy: t('gRPC sebagai interkom kantor yang jauh lebih cepat dari surat REST'),
          prompt: t('Kapan gRPC kurang praktis dibanding REST untuk layanan publik?'),
          difficulty: 3,
          choices: [
            { id: 'pub', label: t('Saat developer luar ingin mencoba API dengan teks JSON') },
            {
              id: 'ms',
              label: t('Saat dua layanan internal bertukar 1.000 pesan per detik'),
              explainWrong: t('Ini justru kondisi tempat gRPC bersinar, karena pesan biner sangat ringan.'),
            },
            {
              id: 'str',
              label: t('Saat layanan butuh streaming biner terus-menerus antar server'),
              explainWrong: t('Streaming dua arah di atas HTTP/2 adalah keunggulan gRPC.'),
            },
          ],
          answer: 'pub',
          explainCorrect: t(
            'Untuk layanan publik yang dipanggil browser, REST dengan JSON lebih ramah dan mudah di-debug.',
          ),
          hints: [t('Pikirkan siapa yang memanggil API dan alat apa yang mereka punya.')],
          tags: ['grpc', 'rest'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b04-l05-q6',
          type: 'scenario',
          story: t(
            'Toko Rani memecah backend menjadi layanan Pesanan, Gudang, dan Ongkir. Layanan Pesanan memanggil Gudang 1.000 kali per detik dengan jeda sekecil mungkin.',
          ),
          prompt: t('Komunikasi antar layanan internal mana yang paling tepat?'),
          difficulty: 2,
          choices: [
            { id: 'grpc', label: t('gRPC dengan Protobuf di atas HTTP/2') },
            {
              id: 'soap',
              label: t('REST dengan JSON untuk setiap panggilan'),
              explainWrong: t('JSON berbentuk teks lebih besar dan lebih lambat diproses daripada Protobuf.'),
            },
            {
              id: 'html',
              label: t('GraphQL dengan satu endpoint untuk semua layanan'),
              explainWrong: t('GraphQL cocok untuk layar yang memilih kolom, bukan untuk panggilan cepat antar server.'),
            },
          ],
          answer: 'grpc',
          explainCorrect: t(
            'gRPC adalah pilihan umum untuk komunikasi cepat antar microservice internal, karena pesannya biner dan ringan.',
          ),
          hints: [t('Cari pilihan yang paling ringan untuk panggilan antar server.')],
          tags: ['grpc', 'server'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b04-l05-r1',
        prompt: t('Dua teknologi inti apa yang membuat gRPC cepat?'),
        choices: [
          { id: 'p', label: t('HTTP/2 dan format biner Protobuf') },
          {
            id: 'x',
            label: t('HTTP/1.1 dan JSON berbentuk teks'),
            explainWrong: t('Itu kombinasi yang umum di REST. gRPC memakai HTTP/2 dan biner Protobuf.'),
          },
          {
            id: 'y',
            label: t('HTTP/2 dan JSON yang dikompres'),
            explainWrong: t('Pesan gRPC berformat biner, bukan JSON yang dikompres.'),
          },
        ],
        answer: 'p',
        explainCorrect: t('HTTP/2 mengirim banyak pesan sekaligus, dan Protobuf memadatkan data menjadi biner.'),
        tags: ['grpc', 'protobuf'],
      }),
      makeTf({
        id: 'b04-l05-r2',
        prompt: t(
          'gRPC cocok untuk layanan backend internal. Browser biasanya memakai REST atau proxy gRPC-Web.',
        ),
        answer: true,
        explainCorrect: t('Banyak sistem memakai REST di pintu depan dan gRPC di jalur antar layanan internal.'),
        explainWrong: t('Browser memang tidak mendukung gRPC mentah tanpa proxy gRPC-Web.'),
        tags: ['grpc', 'browser'],
      }),
    ],
    recap: t('gRPC memakai HTTP/2, pesan biner Protobuf, dan kontrak .proto untuk komunikasi cepat antar layanan internal.'),
  }),

  makeLesson({
    id: 'b04-sq1',
    worldId: 'b04',
    title: 'SOAP, JSON-RPC, tRPC',
    modes: ['pro'],
    isSideQuest: true,
    objective: t('Kamu bisa membedakan SOAP, JSON-RPC, dan tRPC, serta tahu di mana masing-masing dipakai.'),
    atWork:
      'Kamu akan menemui SOAP saat menghubungkan toko ke sistem bank lama, atau tRPC di proyek TypeScript satu repositori.',
    estMinutes: 5,
    introducesTerms: ['trpc-soap'],
    usesTerms: ['api', 'json', 'rest', 'grpc', 'kontrak-api'],
    steps: [
      storyStep('b04/saudara-rpc.svg', [
        rText(
          'Tiga varian lain sering muncul, yaitu SOAP di sistem bank, JSON-RPC untuk perintah singkat, dan tRPC di proyek TypeScript. Ketiganya termasuk keluarga Tanya-Jawab.',
        ),
      ]),
      conceptStep({
        title: t('SOAP: surat dinas resmi'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b04', topic: 'soap-xml' },
        alt: t('Amplop XML SOAP berlapis dengan kontrak WSDL.'),
        body: [
          rTerm('trpc-soap', 'SOAP'),
          rText(
            ' adalah gaya pemanggilan yang memakai format XML dan kontrak ketat bernama WSDL. Ibarat surat dinas berkop dan stempel, SOAP kaku dan berat, tetapi masih dipakai di perbankan, asuransi, dan pemerintahan.',
          ),
        ],
      }),
      qStep(
        makeMcq({
          id: 'b04-sq1-q2',
          prompt: t('Di sektor mana API gaya SOAP masih paling sering ditemui?'),
          choices: [
            { id: 'bank', label: t('Sistem bank lama, asuransi, dan pemerintahan') },
            {
              id: 'game',
              label: t('Aplikasi chat dan video call modern yang butuh sambungan langsung'),
              explainWrong: t('Chat dan video call butuh sambungan langsung dua arah. SOAP tidak dirancang untuk itu.'),
            },
            {
              id: 'chat',
              label: t('Startup TypeScript yang baru dibangun bersama tim kecil'),
              explainWrong: t('Startup TypeScript baru lebih sering memilih REST, GraphQL, atau tRPC yang lebih ringan.'),
            },
          ],
          answer: 'bank',
          explainCorrect: t(
            'Banyak bank dan instansi pemerintah masih memakai kontrak SOAP dan WSDL yang ketat. Sistem itu dibangun sebelum REST populer.',
          ),
          tags: ['trpc-soap'],
        }),
      ),
      conceptStep({
        title: t('JSON-RPC: SMS perintah singkat'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b04', topic: 'json-rpc' },
        alt: t('Contoh isi JSON-RPC berisi method, params, dan id.'),
        code: {
          lang: 'json',
          code: '{\n  "jsonrpc": "2.0",\n  "method": "hitungOngkir",\n  "params": { "kota": "Makassar", "berat": 2 },\n  "id": 1\n}',
          highlight: [2, 3],
        },
        body: [
          rBold('JSON-RPC'),
          rText(' memanggil fungsi jarak jauh lewat pesan singkat berisi '),
          rCode('method'),
          rText(', '),
          rCode('params'),
          rText(', dan '),
          rCode('id'),
          rText('. Ibarat SMS perintah singkat: kamu langsung menyebut nama aksi tanpa merancang URL resource ala REST.'),
        ],
      }),
      conceptStep({
        title: t('tRPC: tipe aman dari ujung ke ujung'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'b04', topic: 'trpc-typescript' },
        alt: t('Dua sisi TypeScript berbagi tipe data otomatis lewat tRPC.'),
        body: [
          rBold('tRPC'),
          rText(
            ' populer di tim full-stack TypeScript, misalnya proyek Next.js dalam satu repositori. Tanpa file schema atau generator kode, frontend memanggil fungsi backend seperti fungsi biasa, lengkap dengan autocomplete dan pengecekan tipe.',
          ),
        ],
      }),
      qStep({
        id: 'b04-sq1-q1',
        type: 'match',
        prompt: t('Pasangkan varian API dengan perumpamaan yang paling tepat.'),
        difficulty: 2,
        left: [
          { id: 'soap', label: t('SOAP') },
          { id: 'jrpc', label: t('JSON-RPC') },
          { id: 'trpc', label: t('tRPC') },
        ],
        right: [
          { id: 'a_jrpc', label: t('SMS perintah singkat yang menyebut nama fungsi dan parameter') },
          { id: 'a_trpc', label: t('Memanggil fungsi server langsung di proyek TypeScript dengan autocomplete') },
          { id: 'a_soap', label: t('Surat dinas XML resmi lengkap dengan kop dan kontrak WSDL') },
        ],
        answer: { soap: 'a_soap', jrpc: 'a_jrpc', trpc: 'a_trpc' },
        explainCorrect: t('Ketiga saudara Tanya-Jawab ini punya tempat pemakaian sendiri: bank lama, perintah singkat, dan proyek TypeScript.'),
        hints: [t('Cocokkan kata kunci: XML, parameter, dan TypeScript.'), undefined],
        tags: ['trpc-soap', 'json'],
      }),
      limitStep({
        analogy: t('SOAP seperti surat dinas resmi, JSON-RPC seperti SMS perintah, tRPC seperti menelepon rekan satu bahasa'),
        same: [
          t('Ketiganya masuk keluarga Tanya-Jawab, tetapi memanggil aksi atau fungsi, bukan alamat resource seperti REST.'),
        ],
        different: [
          t(
            'tRPC nyaman bila kedua sisi memakai TypeScript. Untuk API publik yang dipanggil Python, Go, atau Swift, tRPC tidak cocok.',
          ),
        ],
        riskyAnalogy: false,
      }),
      simStep(
        'pelayan-graphql',
        t('Di simulator ini kamu memilih kolom lewat query. Coba pilih beberapa kolom. Ingat, tRPC tidak memakai query. Client memanggil fungsi server secara langsung.'),
      ),
      qStep(
        makeTf({
          id: 'b04-sq1-q3',
          prompt: t('tRPC cocok untuk API publik yang dipanggil developer Kotlin, Swift, dan Python.'),
          answer: false,
          explainCorrect: t(
            'Pernyataan itu keliru: kekuatan tRPC bergantung pada TypeScript di kedua sisi. API publik lintas bahasa lebih cocok memakai REST atau GraphQL.',
          ),
          explainWrong: t('Developer Kotlin, Swift, dan Python tidak berbagi tipe TypeScript. Mereka lebih mudah memakai REST atau GraphQL.'),
          tags: ['trpc-soap'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b04-sq1-q4',
          type: 'limit',
          analogy: t('tRPC membuat panggilan API semudah memanggil fungsi lokal biasa'),
          prompt: t('Apa yang tetap perlu diingat developer saat memakai tRPC?'),
          difficulty: 2,
          choices: [
            { id: 'net', label: t('Panggilannya tetap lewat jaringan: bisa lambat, gagal, dan butuh cek izin') },
            {
              id: 'json',
              label: t('Panggilannya selalu berhasil karena tipe datanya sudah dicek di editor kode'),
              explainWrong: t('Tipe yang cocok tidak menjamin jaringan stabil. Panggilan tetap bisa lambat atau gagal.'),
            },
            {
              id: 'xml',
              label: t('Validasi izin di server tidak lagi diperlukan'),
              explainWrong: t('Server tetap harus memeriksa izin. Panggilan tRPC bisa dikirim siapa saja.'),
            },
          ],
          answer: 'net',
          explainCorrect: t(
            'Walau terasa seperti fungsi lokal, tRPC tetap panggilan jaringan. Kamu butuh state loading, penanganan error, dan keamanan.',
          ),
          hints: [t('Pikirkan apa yang terjadi di antara frontend dan backend.')],
          tags: ['trpc-soap', 'kontrak-api'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'b04-sq1-q5',
          type: 'scenario',
          story: t(
            'Startup kecil membangun web Toko Rani dengan React dan Node.js dalam satu repositori TypeScript. Mereka tidak mau menulis dokumen OpenAPI manual.',
          ),
          prompt: t('Teknologi mana yang memberi keamanan tipe otomatis dari backend ke frontend?'),
          difficulty: 2,
          choices: [
            { id: 'trpc', label: t('tRPC') },
            {
              id: 'soap',
              label: t('GraphQL dengan schema terpisah'),
              explainWrong: t('GraphQL butuh schema yang ditulis dan dijaga terpisah, padahal tim ingin menghindari file kontrak.'),
            },
            {
              id: 'css',
              label: t('REST dengan dokumen kontrak manual'),
              explainWrong: t('Dokumen kontrak manual justru yang ingin dihindari tim ini.'),
            },
          ],
          answer: 'trpc',
          explainCorrect: t('tRPC membagikan tipe TypeScript dari backend ke kode layar secara langsung.'),
          hints: [t('Cari yang tidak butuh file schema atau dokumen kontrak.')],
          tags: ['trpc-soap'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'b04-sq1-r1',
        prompt: t('Protokol mana yang mengirim perintah lewat JSON dengan kolom method, params, dan id?'),
        choices: [
          { id: 'jrpc', label: t('JSON-RPC') },
          {
            id: 'soap',
            label: t('SOAP'),
            explainWrong: t('SOAP memakai amplop XML yang berlapis.'),
          },
          {
            id: 'trpc',
            label: t('tRPC'),
            explainWrong: t('tRPC memanggil fungsi TypeScript dan tidak memakai kolom method, params, dan id.'),
          },
        ],
        answer: 'jrpc',
        explainCorrect: t('JSON-RPC adalah protokol panggilan ringan berbasis JSON, misalnya dipakai di node blockchain.'),
        tags: ['trpc-soap', 'json'],
      }),
      makeTf({
        id: 'b04-sq1-r2',
        prompt: t('SOAP memakai format XML yang terstruktur dan sering punya dokumen kontrak WSDL.'),
        answer: true,
        explainCorrect: t('Amplop XML dan WSDL menjadi ciri khas SOAP.'),
        explainWrong: t('SOAP memang memakai amplop XML berlapis dan kontrak WSDL.'),
        tags: ['trpc-soap'],
      }),
    ],
    recap: t(
      'SOAP adalah surat dinas resmi, JSON-RPC adalah SMS perintah, dan tRPC adalah panggilan fungsi aman tipe di TypeScript.',
    ),
  }),
];
