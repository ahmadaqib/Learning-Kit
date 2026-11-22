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
  id: 'a02',
  track: 'A',
  order: 2,
  title: 'Hutan HTML',
  tagline: t(
    'Memberi label kardus isi halaman agar browser mengerti.',
    'Menguasai struktur dokumen HTML, elemen dasar, HTML semantik, dan aturan aksesibilitas awal.',
  ),
  color: '#2BA84A',
  illustration: 'a02-hutan-html',
  sourceChapters: ['J1-03'],
  requires: ['a01'],
  lessons: ['a02-l01', 'a02-l02', 'a02-l03', 'a02-l04', 'a02-l05'],
  sideQuests: [],
  boss: {
    title: 'Tantangan Penjaga Hutan HTML',
    greeting: t(
      'Selamat datang di Hutan HTML! Mari cek apakah label kardusmu sudah rapi!',
      'Uji pemahamanmu mengenai anatomi elemen HTML, tag umum, tag semantik, dan aturan emasnya.',
    ),
    guardianName: 'Penjaga Hutan HTML',
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: {
    junior: [
      makeAnchorMcq({
        id: 'a02-anc-j1',
        prompt: t('Di dalam HTML, tag pembuka, isi, dan tag penutup bersama-sama disebut…'),
        choices: [
          { id: 'el', label: t('Elemen') },
          { id: 'css', label: t('Warna CSS'), explainWrong: t('Warna diatur di CSS.') },
          { id: 'url', label: t('Alamat DNS'), explainWrong: t('DNS berada di jaringan.') },
        ],
        answer: 'el',
        explainCorrect: t('Tag pembuka + isi + tag penutup membentuk satu elemen utuh.'),
        tags: ['elemen'],
      }),
      makeAnchorMcq({
        id: 'a02-anc-j2',
        prompt: t('Tag mana yang dipakai untuk membuat tombol aksi seperti "Simpan"?'),
        choices: [
          { id: 'btn', label: t('<button>') },
          { id: 'p', label: t('<p>'), explainWrong: t('<p> untuk paragraf tulisan.') },
          { id: 'img', label: t('<img>'), explainWrong: t('<img> untuk menampilkan gambar.') },
        ],
        answer: 'btn',
        explainCorrect: t('<button> dipakai untuk aksi di halaman, bukan <div>.'),
        tags: ['tag'],
      }),
      makeAnchorMcq({
        id: 'a02-anc-j3',
        prompt: t('Kenapa tag <main> dan <nav> lebih bagus daripada membungkus semuanya pakai <div>?'),
        choices: [
          { id: 'sem', label: t('Lebih jelas maknanya untuk mesin pencari dan pembaca layar') },
          { id: 'col', label: t('Otomatis mewarnai gambar jadi pelangi'), explainWrong: t('Tag semantik tidak otomatis mewarnai gambar.') },
          { id: 'net', label: t('Membuat website jalan tanpa listrik'), explainWrong: t('Tentu tetap butuh perangkat menyala.') },
        ],
        answer: 'sem',
        explainCorrect: t('HTML semantik menjelaskan peran setiap bagian halaman.'),
        tags: ['semantik'],
      }),
      makeAnchorMcq({
        id: 'a02-anc-j4',
        prompt: t('Setiap gambar <img> wajib punya catatan teks penjelasan bernama…'),
        choices: [
          { id: 'alt', label: t('alt') },
          { id: 'href', label: t('href'), explainWrong: t('href dipakai pada tautan <a>.') },
          { id: 'h6', label: t('h6'), explainWrong: t('<h6> adalah subjudul paling kecil.') },
        ],
        answer: 'alt',
        explainCorrect: t('Atribut alt membantu pembaca layar menjelaskan isi gambar.'),
        tags: ['alt-text'],
      }),
      makeAnchorMcq({
        id: 'a02-anc-j5',
        prompt: t('Dalam satu halaman web, berapa jumlah judul utama <h1> yang sebaiknya ada?'),
        choices: [
          { id: 'one', label: t('Cukup 1 saja') },
          { id: 'ten', label: t('10 buah sekaligus'), explainWrong: t('Judul utama <h1> cukup satu agar hierarkinya jelas.') },
          { id: 'zero', label: t('Tidak boleh ada'), explainWrong: t('Setiap halaman sebaiknya memiliki satu judul utama <h1>.') },
        ],
        answer: 'one',
        explainCorrect: t('Satu halaman cukup memiliki satu <h1> sebagai judul utama.'),
        tags: ['tag'],
      }),
    ],
    pro: [
      makeAnchorMcq({
        id: 'a02-anc-p1',
        prompt: t('Pada <a href="/promo">Lihat Promo</a>, bagian href="/promo" disebut…'),
        choices: [
          { id: 'attr', label: t('Atribut') },
          { id: 'close', label: t('Tag penutup') },
          { id: 'body', label: t('Metadata head') },
        ],
        answer: 'attr',
        explainCorrect: t('Atribut memberi informasi tambahan di dalam tag pembuka berupa nama="nilai".'),
        tags: ['atribut'],
      }),
      makeAnchorMcq({
        id: 'a02-anc-p2',
        prompt: t('Di kerangka wajib HTML5, bagian mana yang berfungsi sebagai KTP info untuk browser dan tidak tampil di layar?'),
        choices: [
          { id: 'head', label: t('<head>') },
          { id: 'body', label: t('<body>') },
          { id: 'main', label: t('<main>') },
        ],
        answer: 'head',
        explainCorrect: t('<head> menampung metadata seperti charset, viewport, title, dan tautan stylesheet.'),
        tags: ['doctype'],
      }),
      makeAnchorMcq({
        id: 'a02-anc-p3',
        prompt: t('Mengapa tag <img> tidak membutuhkan tag penutup </img>?'),
        choices: [
          { id: 'void', label: t('Termasuk elemen kosong yang hanya membawa atribut seperti src dan alt') },
          { id: 'bug', label: t('Karena browser lupa mendukungnya') },
          { id: 'css', label: t('Karena gambar diatur oleh SQL') },
        ],
        answer: 'void',
        explainCorrect: t('Elemen seperti <img> tidak membungkus teks di dalamnya.'),
        tags: ['tag'],
      }),
      makeAnchorMcq({
        id: 'a02-anc-p4',
        prompt: t('Untuk memindahkan pengunjung ke halaman kontak lain, elemen yang paling tepat adalah…'),
        choices: [
          { id: 'a', label: t('<a href="/kontak">') },
          { id: 'btn', label: t('<button> tanpa tautan') },
          { id: 'div', label: t('<div onclick="...">') },
        ],
        answer: 'a',
        explainCorrect: t('Gunakan <a> untuk navigasi pindah halaman/URL, dan <button> untuk melakukan aksi.'),
        tags: ['semantik'],
      }),
      makeAnchorMcq({
        id: 'a02-anc-p5',
        prompt: t('Untuk gambar hiasan murni agar tidak mengganggu pengguna pembaca layar, nilai alt yang dianjurkan adalah…'),
        choices: [
          { id: 'empty', label: t('alt="" (string kosong)') },
          { id: 'omit', label: t('Hapus atribut alt sama sekali') },
          { id: 'long', label: t('alt="gambar hiasan garis kotak biru nomor 3"') },
        ],
        answer: 'empty',
        explainCorrect: t('alt="" memberi tahu pembaca layar agar melewati gambar dekoratif dengan tenang.'),
        tags: ['alt-text'],
      }),
      makeAnchorMcq({
        id: 'a02-anc-p6',
        type: 'limit',
        analogy: t('Tag HTML seperti label kardus pindahan'),
        prompt: t('Apa batas dari analogi label kardus saat diterapkan pada tag HTML?'),
        choices: [
          { id: 'nest', label: t('Elemen HTML bisa bersarang bertingkat hingga puluhan lapis dan punya atribut aktif seperti href') },
          { id: 'name', label: t('Label membantu mengenali isi di dalamnya') },
          { id: 'keep', label: t('Barang di dalam kardus tetap menjadi isinya') },
        ],
        answer: 'nest',
        explainCorrect: t('Struktur HTML membentuk pohon elemen bersarang dan langsung diartikan browser.'),
        tags: ['tag', 'elemen'],
      }),
    ],
  },
};

export const lessons: Lesson[] = [
  makeLesson({
    id: 'a02-l01',
    worldId: 'a02',
    title: 'Tag itu label kardus',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menunjuk mana tag pembuka, isi, dan tag penutup.',
      'Aku bisa mengidentifikasi tag pembuka, atribut, isi, tag penutup, dan elemen HTML.',
    ),
    estMinutes: 5,
    introducesTerms: ['tag', 'atribut', 'elemen'],
    usesTerms: ['html', 'browser'],
    stickerId: 'label-kardus',
    warmupFrom: 'a01-l06',
    steps: [
      storyStep('a02/label-kardus.svg', [
        rText(
          'Saat pindahan rumah, kamu menempel label "Buku" atau "Piring" di kardus agar tidak tertukar.',
          'Tag HTML bekerja persis seperti label pada kardus pindahan yang memberi tahu browser jenis isi di dalamnya.',
        ),
      ]),
      conceptStep({
        title: t('Tag Pembuka & Penutup', 'Anatomi Tag'),
        visualName: 'HtmlTreeDiagram',
        visualProps: { worldId: 'a02', topic: 'tag-html' },
        alt: t('Contoh elemen <a> dengan tag pembuka, atribut href, isi teks, dan tag penutup.'),
        code: {
          lang: 'html',
          code: '<a href="/promo">Lihat Promo</a>',
          highlight: [1],
        },
        body: [
          rTerm('tag', 'Tag', 'Tag'),
          rText(' pembuka ditulis dengan '),
          rCode('<nama>'),
          rText(' dan penutupnya memakai garis miring '),
          rCode('</nama>'),
          rText('.'),
        ],
      }),
      conceptStep({
        title: t('Atribut dan Elemen', 'Attribute & Element'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a02', topic: 'atribut-elemen' },
        alt: t('Kotak tag pembuka, atribut, isi, dan penutup menyatu menjadi satu elemen.'),
        body: [
          rTerm('atribut', 'Atribut', 'Attribute'),
          rText(' adalah info tambahan di dalam tag pembuka. Semuanya bersama-sama menjadi satu '),
          rTerm('elemen', 'elemen', 'element'),
          rText('.'),
        ],
      }),
      limitStep({
        analogy: t('Tag seperti label kardus pindahan'),
        same: [
          t('Sama-sama menamai isi agar pembaca langsung tahu jenisnya.'),
        ],
        different: [
          t('Kardus HTML boleh berisi kardus lain di dalamnya (bersarang) dan atributnya ikut memberi perintah ke browser.'),
        ],
      }),
      simStep(
        'rak-label-html',
        t(
          'Coba lihat contoh, lalu tempelkan label tag HTML yang pas pada bagian halaman!',
          'Pasangkan tag HTML pada struktur halaman tiruan menggunakan simulator Rak Label HTML.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a02-l01-q1',
          type: 'analogy',
          prompt: t('Di cerita pindahan rumah, stiker bertuliskan "Buku" pada kardus ibarat…'),
          choices: [
            { id: 'tag', label: t('Tag HTML') },
            { id: 'js', label: t('Listrik JavaScript'), explainWrong: t('Listrik adalah perilaku interaktif.') },
            { id: 'dns', label: t('Kontak DNS'), explainWrong: t('DNS menerjemahkan alamat domain.') },
          ],
          answer: 'tag',
          explainCorrect: t('Benar! Tag menandai jenis isi bagi browser.'),
          tags: ['tag'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a02-l01-q2',
          prompt: t('Gabungan lengkap dari <p>, teks isinya, dan </p> disebut satu…'),
          choices: [
            { id: 'el', label: t('Elemen') },
            { id: 'att', label: t('Atribut saja'), explainWrong: t('Atribut hanya catatan tambahan di tag pembuka.') },
            { id: 'url', label: t('URL'), explainWrong: t('URL adalah alamat halaman.') },
          ],
          answer: 'el',
          explainCorrect: t('Tepat! Tag pembuka + isi + tag penutup membentuk satu elemen HTML.'),
          tags: ['elemen'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a02-l01-q3',
          prompt: t('Manakah penulisan tag penutup yang benar?'),
          choices: [
            { id: 'ok', label: t('</p>') },
            { id: 'bad1', label: t('<p/>'), explainWrong: t('Garis miring penutup harus berada sebelum nama tag.') },
            { id: 'bad2', label: t('<p>'), explainWrong: t('<p> adalah tag pembuka.') },
          ],
          answer: 'ok',
          explainCorrect: t('Benar! Tanda garis miring selalu diletakkan setelah kurung buka: </p>.'),
          tags: ['tag'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a02-l01-q4',
          type: 'limit',
          analogy: t('Tag seperti label kardus'),
          prompt: t('Mana sifat elemen HTML yang TIDAK terjadi pada kardus kertas sungguhan?'),
          choices: [
            { id: 'act', label: t('Atribut seperti href="/promo" langsung mengubah perilaku elemen saat diklik') },
            { id: 'name', label: t('Memberi tahu jenis isi di dalamnya'), explainWrong: t('Itu kesamaannya.') },
            { id: 'wrap', label: t('Membungkus isi agar rapi'), explainWrong: t('Keduanya sama-sama membungkus isi.') },
          ],
          answer: 'act',
          explainCorrect: t('Tepat! Browser membaca tag dan atribut sebagai instruksi aktif di layar.'),
          tags: ['atribut', 'elemen'],
        }),
      ),
      qStep({
        id: 'a02-l01-q5',
        type: 'spotbug',
        prompt: t('Ketuk baris kode HTML yang tag penutupnya salah tulis:'),
        difficulty: 2,
        lines: [
          '<h1>Toko Rani</h1>',
          '<p>Selamat datang di toko kami.<p>',
          '<a href="/produk">Lihat Produk</a>',
        ],
        answer: [2],
        explainCorrect: t('Hebat! Baris 2 memakai <p> di akhir, seharusnya </p>.'),
        tags: ['tag'],
      }),
      qStep({
        id: 'a02-l01-q6',
        type: 'fill',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Lengkapi atribut tujuan tautan menuju /kontak:'),
        template: '<a ___="/kontak">Hubungi Kami</a>',
        bank: ['href', 'src', 'alt'],
        answer: ['href'],
        explainCorrect: t('Tepat. Tautan <a> menggunakan atribut href untuk alamat tujuan.'),
        tags: ['atribut'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a02-l01-r1',
        prompt: t('Pada <img src="kue.png" alt="Kue bolu">, bagian src="kue.png" adalah…'),
        choices: [
          { id: 'a', label: t('Atribut') },
          { id: 'c', label: t('Tag penutup'), explainWrong: t('Tag penutup memakai </nama>.') },
        ],
        answer: 'a',
        explainCorrect: t('Pasangan nama="nilai" di dalam tag pembuka disebut atribut.'),
        tags: ['atribut'],
      }),
      makeTf({
        id: 'a02-l01-r2',
        prompt: t('Satu elemen HTML utuh selalu mencakup tag pembuka, isi, dan tag penutup (kecuali tag kosong seperti <img>).'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('Hampir! Elemen memang terdiri atas pembuka, isi, dan penutup.'),
        tags: ['elemen'],
      }),
    ],
    recap: t(
      'Tag menamai bagian halaman, atribut memberi info tambahan, dan semuanya membentuk elemen.',
      'Tag pembuka, atribut, konten, dan tag penutup membentuk satu elemen HTML.',
    ),
    companion: {
      talkPrompts: ['Benda apa saja di rumah yang punya label mirip tag HTML?'],
      offlineActivity: 'Tempel catatan kertas bertuliskan "Judul", "Isi", dan "Tombol" pada gambar majalah atau buku.',
    },
  }),

  makeLesson({
    id: 'a02-l02',
    worldId: 'a02',
    title: 'Kerangka wajib halaman',
    modes: ['pro'],
    objective: t('Aku bisa menyusun struktur wajib dokumen HTML5: DOCTYPE, html, head, dan body.'),
    estMinutes: 5,
    introducesTerms: ['doctype'],
    usesTerms: ['tag', 'atribut', 'html', 'browser'],
    warmupFrom: 'a02-l01',
    steps: [
      storyStep('a02/kerangka-ktp.svg', [
        rText('Setiap dokumen HTML ibarat manusia yang membawa KTP di saku (<head>) dan tubuh yang terlihat orang (<body>).'),
      ]),
      conceptStep({
        title: t('<!DOCTYPE html> & <html lang="id">'),
        visualName: 'HtmlTreeDiagram',
        visualProps: { worldId: 'a02', topic: 'doctype-html' },
        alt: t('Struktur DOCTYPE, html, head, dan body.'),
        code: {
          lang: 'html',
          code: '<!DOCTYPE html>\n<html lang="id">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <title>Toko Rani</title>\n  </head>\n  <body>\n    <h1>Halo!</h1>\n  </body>\n</html>',
          highlight: [1, 3, 8],
        },
        body: [
          rTerm('doctype', '<!DOCTYPE html>'),
          rText(' memberi tahu browser bahwa file memakai standar HTML modern, sedangkan atribut lang="id" menandakan bahasa isi halaman.'),
        ],
      }),
      conceptStep({
        title: t('Perbedaan <head> dan <body>'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a02', topic: 'head-vs-body' },
        alt: t('Isi head untuk browser vs isi body tampil di layar.'),
        body: [
          rText('<head> menyimpan info untuk browser (judul tab, charset, viewport, file CSS), sedangkan <body> menampung semua yang tampil di layar pengunjung.'),
        ],
      }),
      limitStep({
        analogy: t('<head> sebagai KTP dan <body> sebagai badan'),
        same: [
          t('<head> menyimpan identitas halaman; <body> yang terlihat oleh pengunjung.'),
        ],
        different: [
          t('Judul <title> dan favicon di dalam <head> tetap tampil di tab browser meski bukan isi badan halaman.'),
        ],
      }),
      simStep('rak-label-html', t('Pasangkan bagian <head> dan <body> pada simulator kerangka HTML.')),
      qStep(
        makeMcq({
          id: 'a02-l02-q1',
          prompt: t('Di bagian manakah tag <meta name="viewport"> dan <link rel="stylesheet"> harus ditaruh?'),
          choices: [
            { id: 'head', label: t('Di dalam <head>') },
            { id: 'body', label: t('Di dalam <body>'), explainWrong: t('<body> hanya untuk isi visual halaman.') },
            { id: 'doc', label: t('Sebelum <!DOCTYPE html>'), explainWrong: t('<!DOCTYPE html> harus di baris paling pertama.') },
          ],
          answer: 'head',
          explainCorrect: t('Tepat. Pengaturan dokumen dan stylesheet berada di dalam <head>.'),
          tags: ['doctype'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a02-l02-q2',
          prompt: t('Mengapa atribut lang="id" di tag <html> penting dipasang?'),
          choices: [
            { id: 'lang', label: t('Membantu pembaca layar dan mesin pencari mengetahui bahasa utama halaman') },
            { id: 'css', label: t('Membuat font otomatis berubah hijau'), explainWrong: t('Atribut lang tidak mengubah warna.') },
            { id: 'net', label: t('Mempercepat Wi-Fi rumah'), explainWrong: t('Tidak memengaruhi kecepatan Wi-Fi.') },
          ],
          answer: 'lang',
          explainCorrect: t('Benar. Screen reader memakai lang="id" agar pelafalan suaranya tepat.'),
          tags: ['doctype', 'atribut'],
        }),
      ),
      qStep({
        id: 'a02-l02-q3',
        type: 'order',
        difficulty: 2,
        prompt: t('Urutkan kerangka dokumen HTML dari baris paling atas hingga penutup:'),
        items: [
          { id: 'o1', label: t('<!DOCTYPE html>') },
          { id: 'o2', label: t('<html lang="id">') },
          { id: 'o3', label: t('<head> ... </head>') },
          { id: 'o4', label: t('<body> ... </body>') },
        ],
        answer: ['o1', 'o2', 'o3', 'o4'],
        explainCorrect: t('Sempurna! Itu urutan standar setiap berkas index.html.'),
        tags: ['doctype'],
      }),
      qStep(
        makeMcq({
          id: 'a02-l02-q4',
          type: 'limit',
          analogy: t('<head> adalah KTP tersembunyi'),
          prompt: t('Fakta mana yang menjadi pengecualian dari anggapan "<head> tidak pernah terlihat pengguna"?'),
          choices: [
            { id: 'tab', label: t('Isi <title> dan favicon di <head> terlihat pada tab browser pengguna') },
            { id: 'meta', label: t('<meta charset="UTF-8"> tampil besar di tengah halaman'), explainWrong: t('Meta charset tidak tampil di halaman.') },
            { id: 'link', label: t('<link> tercetak di bagian footer'), explainWrong: t('Tag <link> tidak tampil sebagai teks.') },
          ],
          answer: 'tab',
          explainCorrect: t('Tepat. Meski tidak masuk area kanvas halaman, <title> muncul di tab browser.'),
          tags: ['doctype'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a02-l02-q5',
          prompt: t('<script> sebaiknya diletakkan di akhir <body> atau memakai defer agar tidak menghambat tampilnya halaman.'),
          answer: true,
          explainCorrect: t('Betul! HTML bisa tampil lebih cepat sebelum skrip selesai dijalankan.'),
          explainWrong: t('Menaruh <script> di akhir <body> mencegah pemblokiran render awal.'),
          tags: ['doctype'],
        }),
      ),
      qStep({
        id: 'a02-l02-q6',
        type: 'spotbug',
        difficulty: 2,
        prompt: t('Ketuk baris yang menempatkan paragraf tampilan di tempat yang keliru:'),
        lines: [
          '<!DOCTYPE html>',
          '<head><title>Toko Rani</title><p>Promo Hari Ini</p></head>',
          '<body><h1>Selamat Datang</h1></body>',
        ],
        answer: [2],
        explainCorrect: t('Tepat! Paragraf <p> seharusnya berada di dalam <body>, bukan di dalam <head>.'),
        tags: ['doctype'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a02-l02-r1',
        prompt: t('Semua teks, gambar, dan tombol yang tampil di layar ditulis di dalam tag…'),
        choices: [
          { id: 'body', label: t('<body>') },
          { id: 'head', label: t('<head>'), explainWrong: t('<head> hanya menyimpan metadata untuk browser.') },
        ],
        answer: 'body',
        explainCorrect: t('Seluruh konten visual ditempatkan di dalam <body>.'),
        tags: ['doctype'],
      }),
      makeTf({
        id: 'a02-l02-r2',
        prompt: t('<!DOCTYPE html> memberitahu browser bahwa dokumen menggunakan standar HTML modern.'),
        answer: true,
        explainCorrect: t('Betul!'),
        explainWrong: t('DOCTYPE selalu ditulis di baris pertama dokumen HTML.'),
        tags: ['doctype'],
      }),
    ],
    recap: t('Dokumen HTML selalu dimulai <!DOCTYPE html>, diikuti <head> untuk info browser dan <body> untuk tampilan.'),
  }),

  makeLesson({
    id: 'a02-l03',
    worldId: 'a02',
    title: 'Tag yang paling sering dipakai',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa memilih tag yang tepat untuk judul, paragraf, gambar, tautan, dan tombol.',
      'Aku bisa memilih dan memakai tag HTML dasar: h1–h6, p, a, img, button, daftar, form, dan div/span.',
    ),
    estMinutes: 6,
    introducesTerms: [],
    usesTerms: ['tag', 'atribut', 'elemen'],
    warmupFrom: 'a02-l01',
    steps: [
      storyStep('a02/perkakas-tag.svg', [
        rText(
          'Dari ratusan tag HTML, cukup kuasai segelintir tag paling sering dipakai untuk membangun hampir seluruh halaman!',
          'Meski spesifikasi HTML punya lebih dari seratus tag, 10 tag inti ini menyusun 90% isi website sehari-hari.',
        ),
      ]),
      conceptStep({
        title: t('Judul, Paragraf, Gambar, Daftar', 'Teks & Media: h1–h6, p, img, ul/ol'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a02', topic: 'tag-teks-gambar' },
        alt: t('Daftar tag h1, p, img, ul, dan li.'),
        code: {
          lang: 'html',
          code: '<h1>Toko Rani</h1>\n<p>Sedia kue segar tiap pagi.</p>\n<img src="kue.jpg" alt="Kue bolu cokelat">',
        },
        body: [
          rCode('<h1>–<h6>'),
          rText(' untuk judul, '),
          rCode('<p>'),
          rText(' untuk paragraf, '),
          rCode('<img>'),
          rText(' untuk gambar, dan '),
          rCode('<ul> / <ol>'),
          rText(' untuk daftar.'),
        ],
      }),
      conceptStep({
        title: t('Tautan, Tombol, Formulir', 'Interaksi: a, button, form, div, span'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a02', topic: 'tag-interaksi' },
        alt: t('Perbedaan tag tautan <a>, tombol <button>, dan wadah div/span.'),
        body: [
          rCode('<a>'),
          rText(' membawa ke halaman lain, '),
          rCode('<button>'),
          rText(' menjalankan aksi, dan '),
          rCode('<div> / <span>'),
          rText(' menjadi wadah pembungkus.'),
        ],
      }),
      limitStep({
        analogy: t('Kotak pembungkus serbaguna <div> vs kotak khusus'),
        same: [
          t('<div> seperti kardus polos untuk mengelompokkan beberapa kotak sekaligus.'),
        ],
        different: [
          t('Jangan memakai <div> polos untuk tombol atau judul, karena pembaca layar tidak tahu fungsinya.'),
        ],
      }),
      simStep(
        'rak-label-html',
        t(
          'Latih menempelkan tag yang tepat pada bagian halaman!',
          'Cocokkan elemen antarmuka ke tag HTML intinya.',
        ),
      ),
      qStep({
        id: 'a02-l03-q1',
        type: 'match',
        difficulty: 1,
        prompt: t('Pasangkan tag HTML dengan fungsinya:'),
        left: [
          { id: 't1', label: t('<h1>') },
          { id: 't2', label: t('<p>') },
          { id: 't3', label: t('<a href="...">') },
          { id: 't4', label: t('<button>') },
        ],
        right: [
          { id: 'f1', label: t('Judul paling penting') },
          { id: 'f2', label: t('Paragraf tulisan') },
          { id: 'f3', label: t('Tautan ke halaman lain') },
          { id: 'f4', label: t('Tombol melakukan aksi') },
        ],
        answer: { t1: 'f1', t2: 'f2', t3: 'f3', t4: 'f4' },
        explainCorrect: t('Mantap! Empat tag ini adalah pondasi hampir setiap halaman web.'),
        tags: ['tag'],
      }),
      qStep(
        makeMcq({
          id: 'a02-l03-q2',
          prompt: t('Tag manakah yang dipakai untuk membuat daftar berpoin (tidak bernomor)?'),
          choices: [
            { id: 'ul', label: t('<ul> bersama <li>') },
            { id: 'ol', label: t('<ol> bersama <li>'), explainWrong: t('<ol> untuk daftar bernomor (ordered list).') },
            { id: 'p', label: t('<p>'), explainWrong: t('<p> untuk paragraf, bukan daftar.') },
          ],
          answer: 'ul',
          explainCorrect: t('Benar! ul = unordered list (berpoin), ol = ordered list (bernomor).'),
          tags: ['tag'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a02-l03-q3',
          prompt: t('Apa perbedaan kegunaan <div> dan <span>?'),
          choices: [
            { id: 'blk', label: t('<div> membungkus blok bagian; <span> membungkus kata kecil di dalam teks') },
            { id: 'img', label: t('<span> khusus gambar; <div> khusus video'), explainWrong: t('Gambar memakai <img>.') },
            { id: 'h1', label: t('<div> lebih besar daripada <h1>'), explainWrong: t('<div> adalah wadah netral tanpa ukuran judul.') },
          ],
          answer: 'blk',
          explainCorrect: t('Tepat! <span> dipakai menyisipkan gaya di tengah kalimat tanpa memutus baris.'),
          tags: ['tag'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a02-l03-q4',
          type: 'limit',
          analogy: t('<div> sebagai kardus polos serbaguna'),
          prompt: t('Mengapa kita tidak boleh memperlakukan <div> sebagai pengganti <button>?'),
          choices: [
            { id: 'a11y', label: t('<div> tidak punya arti tombol bagi keyboard dan pembaca layar') },
            { id: 'col', label: t('<div> tidak bisa diberi warna'), explainWrong: t('<div> tetap bisa diberi CSS.') },
            { id: 'tag', label: t('<div> tidak punya tag penutup'), explainWrong: t('<div> punya tag penutup </div>.') },
          ],
          answer: 'a11y',
          explainCorrect: t('Benar! Elemen native <button> otomatis bisa ditekan dengan tombol Enter/Spasi.'),
          tags: ['tag'],
        }),
      ),
      qStep(
        makeTf({
          id: 'a02-l03-q5',
          prompt: t('Tag <h6> adalah judul yang paling kecil tingkat kepentingannya dibanding <h1>.'),
          answer: true,
          explainCorrect: t('Betul! Tingkat judul paling penting adalah <h1> hingga paling kecil <h6>.'),
          explainWrong: t('Hampir! Angka lebih kecil (h1) lebih tinggi derajatnya daripada h6.'),
          tags: ['tag'],
        }),
      ),
      qStep({
        id: 'a02-l03-q6',
        type: 'fill',
        difficulty: 2,
        modes: ['pro'],
        prompt: t('Lengkapi tag untuk kolom input email di dalam formulir:'),
        template: '<form><input ___="email"></form>',
        bank: ['type', 'href', 'alt'],
        answer: ['type'],
        explainCorrect: t('Tepat. Atribut type="email" membantu validasi dasar dan menampilkan keyboard @ di HP.'),
        tags: ['atribut'],
      }),
    ],
    reviewCards: [
      makeMcq({
        id: 'a02-l03-r1',
        prompt: t('Tag yang tepat untuk membuat daftar bernomor 1, 2, 3 adalah…'),
        choices: [
          { id: 'ol', label: t('<ol>') },
          { id: 'ul', label: t('<ul>'), explainWrong: t('<ul> menghasilkan poin bulat, bukan nomor urut.') },
        ],
        answer: 'ol',
        explainCorrect: t('<ol> singkatan dari Ordered List (daftar berurutan).'),
        tags: ['tag'],
      }),
      makeMcq({
        id: 'a02-l03-r2',
        prompt: t('Tag yang dipakai membungkus satu kata di tengah kalimat adalah…'),
        choices: [
          { id: 'span', label: t('<span>') },
          { id: 'img', label: t('<img>'), explainWrong: t('<img> hanya untuk menampilkan gambar.') },
        ],
        answer: 'span',
        explainCorrect: t('<span> membungkus potongan teks kecil secara sejajar.'),
        tags: ['tag'],
      }),
    ],
    recap: t(
      'Pakai <h1>–<h6> untuk judul, <p> paragraf, <a> tautan, <button> tombol, <img> gambar.',
      'Kuasai tag inti (h1–h6, p, a, img, button, ul/ol, form, div, span) sesuai fungsinya masing-masing.',
    ),
    companion: {
      talkPrompts: ['Buka satu berita di browser: coba tebak mana yang pakai tag <h1>, <p>, dan <img>!'],
      offlineActivity: 'Beri label tag HTML pada potongan halaman koran atau brosur.',
    },
  }),

  makeLesson({
    id: 'a02-l04',
    worldId: 'a02',
    title: 'HTML semantik: tag yang bermakna',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menunjuk bagian header, nav, main, dan footer pada halaman.',
      'Aku bisa menyusun kerangka halaman memakai HTML semantik dan menjelaskan tiga manfaatnya.',
    ),
    estMinutes: 6,
    introducesTerms: ['semantik'],
    usesTerms: ['tag', 'elemen', 'browser'],
    stickerId: 'pohon-berlabel',
    warmupFrom: 'a02-l03',
    steps: [
      storyStep('a02/pohon-berlabel.svg', [
        rText(
          'Bayangkan semua lemari di kelas diberi label sama: "Kotak". Pasti bingung mencarinya! Begitu juga tag <div> di mana-mana.',
          'Dulu semua bagian halaman dibungkus <div> tanpa makna. HTML semantik menggantinya dengan tag yang menjelaskan peran isinya.',
        ),
      ]),
      conceptStep({
        title: t('Tag Bagian Halaman', 'Header, Nav, Main, Footer'),
        visualName: 'HtmlTreeDiagram',
        visualProps: { worldId: 'a02', topic: 'semantik-halaman' },
        alt: t('Susunan header, nav, main, article, aside, dan footer.'),
        body: [
          rTerm('semantik', 'HTML semantik', 'HTML semantik'),
          rText(' memakai '),
          rCode('<header>'),
          rText(' (atas), '),
          rCode('<nav>'),
          rText(' (menu), '),
          rCode('<main>'),
          rText(' (isi utama), dan '),
          rCode('<footer>'),
          rText(' (kaki halaman).'),
        ],
      }),
      conceptStep({
        title: t('Tiga Manfaat Semantik', 'Kenapa Memakai Tag Semantik?'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a02', topic: 'manfaat-semantik' },
        alt: t('Tiga manfaat: pembaca layar, mesin pencari, dan kode mudah dibaca tim.'),
        body: [
          rText('Pembaca layar untuk teman tunanetra bisa melompat langsung ke isi, mesin pencari paham isinya, dan tim mudah membacanya.'),
        ],
      }),
      limitStep({
        analogy: t('Lemari berlabel jelas dibanding kardus polos'),
        same: [
          t('Menandai isi dengan nama yang bermakna memudahkan siapa pun menavigasi.'),
        ],
        different: [
          t('Tag semantik tidak otomatis mempercantik tampilan warna atau tata letak; kamu tetap perlu CSS.'),
        ],
      }),
      simStep(
        'rak-label-html',
        t(
          'Tempelkan header, nav, main, dan footer ke posisi halaman yang tepat!',
          'Susun ulang tata letak semantik menggunakan simulator Rak Label HTML.',
        ),
      ),
      qStep({
        id: 'a02-l04-q1',
        type: 'sort',
        prompt: t('Kelompokkan isi halaman ke tag semantik yang tepat:'),
        difficulty: 2,
        items: [
          { id: 's1', label: t('Menu Beranda · Produk · Kontak') },
          { id: 's2', label: t('Artikel utama yang sedang dibaca') },
          { id: 's3', label: t('Catatan hak cipta di paling bawah') },
          { id: 's4', label: t('Logo dan nama situs di atas') },
        ],
        bins: [
          { id: 'headnav', label: t('<header> / <nav>') },
          { id: 'mainfoot', label: t('<main> / <footer>') },
        ],
        answer: { s1: 'headnav', s4: 'headnav', s2: 'mainfoot', s3: 'mainfoot' },
        explainCorrect: t('Tepat! Bagian atas/navigasi di <header>/<nav>, isi utama dan kaki di <main>/<footer>.'),
        tags: ['semantik'],
      }),
      qStep(
        makeMcq({
          id: 'a02-l04-q2',
          prompt: t('Tag semantik manakah yang dipakai untuk membungkus menu tautan navigasi?'),
          choices: [
            { id: 'nav', label: t('<nav>') },
            { id: 'aside', label: t('<aside>'), explainWrong: t('<aside> untuk info sampingan, bukan menu utama.') },
            { id: 'footer', label: t('<footer>'), explainWrong: t('<footer> di bagian paling bawah untuk info penutup.') },
          ],
          answer: 'nav',
          explainCorrect: t('Benar! <nav> adalah singkatan dari navigation.'),
          tags: ['semantik'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a02-l04-q3',
          prompt: t('Jika menulis artikel berita yang bisa berdiri sendiri saat dibagikan, tag terbaiknya adalah…'),
          choices: [
            { id: 'art', label: t('<article>') },
            { id: 'div', label: t('<div>'), explainWrong: t('<div> tidak punya makna artikel bagi mesin pencari.') },
            { id: 'nav', label: t('<nav>'), explainWrong: t('<nav> khusus menu navigasi.') },
          ],
          answer: 'art',
          explainCorrect: t('Tepat! <article> cocok untuk berita, posting blog, atau kartu ulasan mandiri.'),
          tags: ['semantik'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a02-l04-q4',
          type: 'limit',
          analogy: t('Lemari berlabel semantik'),
          prompt: t('Apa hal yang TIDAK otomatis terjadi saat kamu mengganti <div> menjadi <nav>?'),
          choices: [
            { id: 'css', label: t('Tampilannya tidak langsung berjajar rapi dan berwarna tanpa CSS') },
            { id: 'sr', label: t('Pembaca layar mengenali bagian navigasi'), explainWrong: t('Pembaca layar justru langsung mengenali <nav>.') },
            { id: 'read', label: t('Kode menjadi lebih mudah dibaca teman tim'), explainWrong: t('Memang jadi lebih mudah dibaca.') },
          ],
          answer: 'css',
          explainCorrect: t('Tepat! Tag semantik memberi arti struktur; urusan gaya tetap dikerjakan oleh CSS.'),
          tags: ['semantik'],
        }),
      ),
      qStep({
        id: 'a02-l04-q5',
        type: 'hotspot',
        difficulty: 2,
        prompt: t('Ketuk area tag semantik yang menampung konten inti utama halaman!'),
        image: 'a02-hotspot',
        regions: [
          { id: 'header', shape: 'rect', coords: [10, 10, 200, 40], label: '<header> (Logo & Judul)' },
          { id: 'nav', shape: 'rect', coords: [10, 50, 200, 40], label: '<nav> (Daftar Menu)' },
          { id: 'main', shape: 'rect', coords: [10, 100, 200, 80], label: '<main> (Isi Utama Halaman)' },
          { id: 'footer', shape: 'rect', coords: [10, 190, 200, 40], label: '<footer> (Hak Cipta & Kontak)' },
        ],
        answer: 'main',
        explainCorrect: t('Benar! Isi utama halaman selalu diletakkan di dalam <main>.'),
        tags: ['semantik'],
      }),
      qStep(
        makeTf({
          id: 'a02-l04-q6',
          prompt: t('Tag <aside> dipakai untuk info sampingan seperti daftar artikel terkait atau iklan kecil.'),
          answer: true,
          explainCorrect: t('Betul! <aside> berisi keterangan sampingan yang mendampingi konten utama.'),
          explainWrong: t('Hampir! Info tambahan di sisi halaman memang memakai <aside>.'),
          tags: ['semantik'],
        }),
      ),
    ],
    reviewCards: [
      makeMcq({
        id: 'a02-l04-r1',
        prompt: t('Bagian paling bawah halaman yang memuat hak cipta dan kontak memakai tag…'),
        choices: [
          { id: 'f', label: t('<footer>') },
          { id: 'h', label: t('<header>'), explainWrong: t('<header> adalah bagian atas/pembuka.') },
        ],
        answer: 'f',
        explainCorrect: t('<footer> menandai kaki halaman.'),
        tags: ['semantik'],
      }),
      makeTf({
        id: 'a02-l04-r2',
        prompt: t('HTML semantik membantu teman tunanetra yang memakai screen reader untuk menavigasi halaman.'),
        answer: true,
        explainCorrect: t('Betul! Pembaca layar bisa langsung melompat ke <nav> atau <main>.'),
        explainWrong: t('Tag semantik memberi penanda jelas untuk alat bantu aksesibilitas.'),
        tags: ['semantik'],
      }),
    ],
    recap: t(
      'Pakai tag semantik seperti <header>, <nav>, <main>, <article>, dan <footer> agar maknanya jelas.',
      'HTML semantik meningkatkan aksesibilitas pembaca layar, SEO, dan keterbacaan kode.',
    ),
    companion: {
      talkPrompts: ['Kalau koran sekolah dibagi menjadi header, main, dan footer, bagian mana masuk ke mana?'],
      offlineActivity: 'Lipat kertas jadi empat bagian vertikal dan tuliskan nama tag semantiknya dari atas ke bawah.',
    },
  }),

  makeLesson({
    id: 'a02-l05',
    worldId: 'a02',
    title: 'Aturan emas HTML (h1, button vs a, alt)',
    modes: ['junior', 'pro'],
    objective: t(
      'Aku bisa menghindari kesalahan umum HTML: urutan judul, button vs a, dan alt pada gambar.',
      'Aku bisa mengaudit kesalahan HTML umum: satu h1 berurutan, button vs a yang tepat, dan teks alt.',
    ),
    estMinutes: 5,
    introducesTerms: ['alt-text'],
    usesTerms: ['tag', 'atribut', 'semantik'],
    warmupFrom: 'a02-l04',
    steps: [
      storyStep('a02/aturan-emas.svg', [
        rText(
          'Bayangkan buku cerita yang halaman babnya lompat dari Bab 1 langsung ke Bab 4, dan gambarnya tanpa keterangan. Pembaca pasti bingung!',
          'Tiga kesalahan kecil di HTML sering merusak pengalaman pembaca layar dan pencarian, padahal sangat mudah dicegah dengan aturan emas.',
        ),
      ]),
      conceptStep({
        title: t('Aturan 1: Satu <h1> & Jangan Lompat', 'Urutan Judul Rapi'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a02', topic: 'aturan-h1' },
        alt: t('Urutan h1 ke h2 ke h3 tanpa melompat.'),
        body: [
          rText('Satu halaman cukup punya satu '),
          rCode('<h1>'),
          rText('. Urutan judul jangan melompat dari h1 langsung ke h4.'),
        ],
      }),
      conceptStep({
        title: t('Aturan 2: button vs a, dan Wajib alt', 'Aksi vs Pindah & Alt Text'),
        visualName: 'DiagramConcept',
        visualProps: { worldId: 'a02', topic: 'button-vs-a' },
        alt: t('Perbedaan button untuk aksi, a untuk tautan, dan img wajib alt.'),
        body: [
          rText('Pakai '),
          rCode('<button>'),
          rText(' untuk aksi, '),
          rCode('<a>'),
          rText(' untuk pindah halaman. Setiap gambar wajib punya '),
          rTerm('alt-text', 'alt', 'alt'),
          rText('.'),
        ],
      }),
      limitStep({
        analogy: t('Daftar isi buku untuk h1–h6'),
        same: [
          t('Seperti bab dan subbab buku yang berurutan rapi agar pembaca mengerti strukturnya.'),
        ],
        different: [
          t('Jika ingin judul terlihat lebih kecil atau besar, ubah ukurannya lewat CSS, bukan memilih tag h4 karena ukurannya pas.'),
        ],
      }),
      simStep(
        'rak-label-html',
        t(
          'Periksa kembali label mana yang cocok untuk tombol aksi dan tautan halaman!',
          'Uji penerapan aturan emas HTML di simulator.',
        ),
      ),
      qStep(
        makeMcq({
          id: 'a02-l05-q1',
          prompt: t('Kamu membuat tombol "Simpan Perubahan" di formulir. Tag mana yang benar?'),
          choices: [
            { id: 'btn', label: t('<button>') },
            { id: 'div', label: t('<div>'), explainWrong: t('Jangan pakai <div> sebagai tombol karena tidak ramah keyboard.') },
            { id: 'a', label: t('<a>'), explainWrong: t('<a> dipakai untuk berpindah ke halaman/tautan lain.') },
          ],
          answer: 'btn',
          explainCorrect: t('Benar! Aksi seperti Simpan atau Hapus selalu memakai <button>.'),
          tags: ['tag', 'semantik'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a02-l05-q2',
          prompt: t('Setelah judul utama <h1>, subjudul tepat di bawahnya seharusnya memakai…'),
          choices: [
            { id: 'h2', label: t('<h2>') },
            { id: 'h4', label: t('<h4>'), explainWrong: t('Melompati h2 dan h3 membingungkan pembaca layar.') },
            { id: 'h6', label: t('<h6>'), explainWrong: t('Jangan lompat tingkat judul hanya demi ukuran huruf.') },
          ],
          answer: 'h2',
          explainCorrect: t('Tepat! Urutan judul berjalan rapi: h1 lalu h2 lalu h3.'),
          tags: ['tag'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a02-l05-q3',
          prompt: t('Fungsi utama atribut alt pada <img src="sepatu.jpg" alt="Sepatu lari merah"> adalah…'),
          choices: [
            { id: 'desc', label: t('Menjelaskan isi gambar kepada pembaca layar dan saat gambar gagal dimuat') },
            { id: 'size', label: t('Mengganti warna sepatu jadi biru'), explainWrong: t('alt adalah teks deskripsi, bukan filter warna.') },
            { id: 'link', label: t('Membuka tab baru saat diklik'), explainWrong: t('Link memakai tag <a>.') },
          ],
          answer: 'desc',
          explainCorrect: t('Benar! Alt text membuat informasi gambar tetap dapat diakses semua orang.'),
          tags: ['alt-text'],
        }),
      ),
      qStep(
        makeMcq({
          id: 'a02-l05-q4',
          type: 'limit',
          analogy: t('Daftar isi bab h1–h6'),
          prompt: t('Kesalahan mana yang sering terjadi jika ukuran teks judul dirasa terlalu besar?'),
          choices: [
            { id: 'pick', label: t('Memilih tag <h4> padahal seharusnya <h2> dengan ukuran diatur di CSS') },
            { id: 'css', label: t('Mengatur ukuran font di CSS'), explainWrong: t('Mengatur ukuran dengan CSS justru cara yang benar.') },
            { id: 'one', label: t('Menjaga hanya ada satu <h1>'), explainWrong: t('Satu <h1> per halaman adalah aturan yang benar.') },
          ],
          answer: 'pick',
          explainCorrect: t('Tepat! Tag judul dipilih menurut urutan maknanya, sedangkan besar huruf diatur di CSS.'),
          tags: ['tag', 'semantik'],
        }),
      ),
      qStep({
        id: 'a02-l05-q5',
        type: 'spotbug',
        difficulty: 2,
        prompt: t('Ketuk baris HTML yang melanggar aturan emas aksesibilitas:'),
        lines: [
          '<h1>Menu Hari Ini</h1>',
          '<img src="roti.jpg">',
          '<button>Pesan Sekarang</button>',
        ],
        answer: [2],
        explainCorrect: t('Mata tajam! Baris 2 tidak memiliki atribut alt pada <img>.'),
        tags: ['alt-text'],
      }),
      qStep(
        makeMcq({
          id: 'a02-l05-q6',
          type: 'scenario',
          story: t('Di halaman Toko Rani, tulisan "Lihat Promo Lebaran" akan membuka halaman baru bernama /promo.'),
          prompt: t('Tag HTML manakah yang paling tepat membungkus tulisan tersebut?'),
          difficulty: 2,
          choices: [
            { id: 'a', label: t('<a href="/promo">Lihat Promo Lebaran</a>') },
            { id: 'btn', label: t('<button>Lihat Promo Lebaran</button>'), explainWrong: t('Pindah ke URL halaman lain lebih tepat memakai <a>.') },
            { id: 'span', label: t('<span>Lihat Promo Lebaran</span>'), explainWrong: t('<span> tidak punya sifat tautan navigasi.') },
          ],
          answer: 'a',
          explainCorrect: t('Benar! Pindah halaman memakai <a href="...">, aksi dalam halaman memakai <button>.'),
          tags: ['tag', 'semantik'],
        }),
      ),
    ],
    reviewCards: [
      makeTf({
        id: 'a02-l05-r1',
        prompt: t('Untuk pindah ke halaman lain di website, gunakan tag <a>; untuk melakukan aksi seperti Simpan, gunakan <button>.'),
        answer: true,
        explainCorrect: t('Betul sekali!'),
        explainWrong: t('Ingat: <a> untuk navigasi alamat, <button> untuk aksi.'),
        tags: ['semantik'],
      }),
      makeMcq({
        id: 'a02-l05-r2',
        prompt: t('Setiap gambar informatif wajib memiliki atribut…'),
        choices: [
          { id: 'alt', label: t('alt') },
          { id: 'ol', label: t('ol'), explainWrong: t('<ol> adalah tag daftar bernomor.') },
        ],
        answer: 'alt',
        explainCorrect: t('Atribut alt menjelaskan gambar kepada pembaca layar.'),
        tags: ['alt-text'],
      }),
    ],
    recap: t(
      'Satu h1 saja, urutan judul rapi, button untuk aksi, a untuk tautan, dan gambar wajib alt.',
      'Patuhi aturan emas HTML: hierarki judul berurutan dari satu h1, pisahkan <button> dan <a>, serta selalu isi atribut alt.',
    ),
    companion: {
      talkPrompts: ['Kalau teman kita tidak bisa melihat layar, bagaimana dia tahu isi sebuah foto di website?'],
      offlineActivity: 'Tutup mata sebentar dan minta teman mendeskripsikan satu gambar di sekitar—itulah fungsi teks alt.',
    },
  }),
];
