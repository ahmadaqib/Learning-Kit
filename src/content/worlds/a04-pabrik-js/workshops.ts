import { conceptStep, limitStep, qStep, rPro, storyStep } from '../../lessonHelpers';
import { workshopQuestions } from '../../workshopQuestions';
import type { Lesson } from '../../schema';

const pro = (text: string) => ({ pro: text });

const orderQuestion = workshopQuestions('a04-sq1', 'array');
const errorQuestion = workshopQuestions('a04-sq2', 'try-catch');

export const arraysAndObjects: Lesson = {
  id: 'a04-sq1', worldId: 'a04', title: 'Menyaring daftar pesanan', modes: ['pro'], isSideQuest: true,
  warmupFrom: 'a04-l06', estMinutes: 6, introducesTerms: [], usesTerms: [],
  objective: pro('Kamu bisa memilih pesanan siap kirim, lalu mengambil nama pelanggannya.'),
  atWork: 'Tim pengiriman memakai daftar nama pelanggan untuk menyiapkan label paket.',
  steps: [
    storyStep('Pesanan siap kirim', [rPro('Meja pengiriman punya setumpuk nota. Bima hanya perlu nama pelanggan yang paketnya siap dikirim.')]),
    conceptStep({
      title: pro('Baca satu pesanan'), visualName: 'DiagramConcept',
      visualProps: { worldId: 'a04', topic: 'Data pesanan' }, alt: pro('Pulau Pabrik JavaScript dengan roda gigi'),
      body: [rPro('Objek menyimpan data dengan nama properti, seperti nama dan siap. Array menyimpan beberapa pesanan secara berurutan. Indeks pertama bernilai nol.')],
      code: { lang: 'js', code: 'const pesanan = [\n  { nama: "Ayu", siap: false },\n  { nama: "Bayu", siap: true }\n];\nconsole.log(pesanan[1].nama);' },
    }),
    qStep(orderQuestion('q1', 'Apa isi pesanan[1].nama pada daftar Ayu lalu Bayu?', ['Ayu', 'Bayu', 'undefined'], 1,
      ['Ayu ada pada indeks nol.', 'Indeks satu menunjuk pesanan kedua, milik Bayu.', 'Pesanan kedua memiliki properti nama.'], 'Hitung posisi mulai dari nol.')),
    conceptStep({
      title: pro('Saring dahulu, lalu ambil nama'), visualName: 'OrderPipeline',
      visualProps: { worldId: 'a04', topic: 'Daftar siap kirim' }, alt: pro('Pilih langkah untuk melihat pesanan awal, hasil filter, dan nama hasil map.'),
      body: [rPro('filter membuat daftar baru berisi pesanan yang lolos syarat. map membuat daftar baru dengan mengubah setiap pesanan menjadi satu hasil.')],
      code: { lang: 'js', code: 'const pesanan = [{ nama: "Ayu", siap: false },\n  { nama: "Bayu", siap: true }];\nconst label = pesanan\n  .filter(p => p.siap)\n  .map(p => p.nama);\nconsole.log(label); // ["Bayu"]' },
    }),
    qStep(orderQuestion('q2', 'Dari empat pesanan, satu siap dikirim. Berapa hasil filter(p => p.siap)?', ['Satu pesanan', 'Tiga pesanan', 'Empat pesanan'], 0,
      ['Satu pesanan memenuhi syarat siap.', 'Tiga lainnya belum siap dan tersaring.', 'Syarat siap membatasi isi daftar hasil.'], 'Hitung pesanan yang memenuhi syarat.')),
    limitStep({ analogy: pro('Memilih nota dari tumpukan'), same: [pro('Kamu memilih nota yang memenuhi syarat.')],
      different: [pro('filter membuat daftar baru. Objek pesanan di dalamnya masih sama.')], riskyAnalogy: false }),
    qStep(orderQuestion('q3', 'Apa yang terjadi pada daftar asal setelah filter(p => p.siap)?', ['Isinya tetap', 'Isinya berkurang', 'Urutannya terbalik'], 0,
      ['Pemanggilan ini hanya membaca properti siap dan membuat daftar hasil.', 'Yang berkurang bisa jumlah pesanan pada hasil penyaringan.', 'Penyaringan mempertahankan urutan pesanan yang lolos.'], 'Perhatikan daftar mana yang menerima hasil.', 'Memindahkan nota secara fisik')),
    qStep(orderQuestion('q4', 'Apa isi hasil map(p => p.nama) untuk dua pesanan milik Nia lalu Rio?', ['["Rio", "Nia"]', '["Nia", "Rio"]', '[2, 2]'], 1,
      ['map mempertahankan urutan masukan.', 'Setiap pesanan menghasilkan nama pada posisi yang sama.', 'Kode membaca properti nama tanpa menghitung panjangnya.'], 'Ikuti pesanan dari kiri ke kanan.')),
    qStep(orderQuestion('q5', 'Bagaimana hasil filter(p => p.siap) kalau semua pesanan belum siap?', ['Daftar asal', 'Nilai kosong null', 'Daftar kosong'], 2,
      ['Tidak ada pesanan yang memenuhi syarat.', 'filter selalu mengembalikan daftar saat selesai.', 'Daftar hasil berisi nol pesanan.'], 'Pikirkan wadah yang bisa berisi nol barang.')),
    qStep(orderQuestion('q6', 'Mengapa menyaring pesanan sebelum mengambil namanya?', ['Nama menjadi unik', 'Status masih tersedia', 'Pesanan otomatis berurutan'], 1,
      ['Dua pelanggan masih bisa memiliki nama yang sama.', 'Objek pesanan masih menyimpan properti siap saat disaring.', 'Kedua langkah ini mempertahankan urutan masukan.'], 'Data apa yang hilang kalau hanya nama yang disimpan?')),
  ],
  reviewCards: [
    orderQuestion('r1', 'Toko punya daftar produk. Langkah mana yang menghasilkan nama produk yang tersedia?', ['Ambil semua nama', 'Saring stok lalu ambil nama', 'Hitung semua stok'], 1,
      ['Nama saja tidak menunjukkan ketersediaan.', 'Kamu memeriksa stok sebelum mengambil nama setiap produk terpilih.', 'Jumlah stok tidak memuat nama produk.'], 'Cek ketersediaan saat data stok masih ada.'),
    orderQuestion('r2', 'Satu nama dikembalikan untuk setiap pesanan lewat map. Berapa nama dihasilkan dari tiga pesanan?', ['Satu nama', 'Dua nama', 'Tiga nama'], 2,
      ['map memproses ketiga pesanan.', 'Tidak ada pesanan yang disaring pada langkah ini.', 'Setiap pesanan menghasilkan tepat satu nama.'], 'Pasangkan satu hasil dengan tiap masukan.'),
  ],
  recap: pro('Gunakan filter untuk memilih pesanan. Gunakan map untuk mengambil nama dari setiap pesanan terpilih.'),
};

export const handlingErrors: Lesson = {
  id: 'a04-sq2', worldId: 'a04', title: 'Menangani kesalahan saat membaca data', modes: ['pro'], isSideQuest: true,
  warmupFrom: 'a04-l06', estMinutes: 6, introducesTerms: [], usesTerms: [],
  objective: pro('Kamu bisa menelusuri pesan kesalahan dan memilih langkah pemulihan.'),
  atWork: 'Tim dukungan membedakan berkas rusak dari daftar kosong saat memeriksa impor pesanan.',
  steps: [
    storyStep('Impor pesanan', [rPro('Kasir mengimpor daftar pesanan. Saat isi berkas terpotong, halaman harus tetap bisa dipakai untuk memilih berkas pengganti.')]),
    conceptStep({
      title: pro('Cari operasi yang gagal'), visualName: 'DiagramConcept',
      visualProps: { worldId: 'a04', topic: 'Pembacaan berkas' }, alt: pro('Pulau Pabrik JavaScript dengan roda gigi'),
      body: [rPro('JSON.parse membaca teks berformat JSON. Saat teksnya rusak, operasi ini melempar kesalahan. Di dalam try, kesalahan itu mengalihkan alur ke catch. Baca nama dan pesan kesalahan sebelum menebak penyebabnya.')],
      code: { lang: 'js', code: 'try {\n  const daftar = JSON.parse("[");\n  console.log(daftar.length);\n} catch (error) {\n  console.warn(error.name, error.message);\n}' },
    }),
    qStep(errorQuestion('q1', 'Teks berisi satu kurung buka. Bagian mana berjalan setelah JSON.parse gagal?', ['Baris daftar.length', 'Isi blok catch', 'Awal blok try'], 1,
      ['Baris berikutnya dalam try dilewati setelah kesalahan.', 'Kesalahan dari pembacaan teks ditangkap oleh catch.', 'try tidak mengulang operasi dengan sendirinya.'], 'Ikuti jalur saat operasi melempar kesalahan.')),
    qStep(errorQuestion('q2', 'Apa arti SyntaxError saat JSON.parse membaca berkas?', ['Bentuk teks tidak sah', 'Daftar pesanan kosong', 'Pesanan belum dibayar'], 0,
      ['Susunan teks melanggar aturan format yang dibaca.', 'Daftar kosong yang ditulis [] masih sah.', 'Status pembayaran tidak mengubah aturan penulisan teks.'], 'Pisahkan bentuk teks dari isi pesanan.')),
    conceptStep({
      title: pro('Periksa bentuk data setelah dibaca'), visualName: 'JsonBranches',
      visualProps: { worldId: 'a04', topic: 'Bentuk data' }, alt: pro('Pilih masukan JSON untuk menelusuri jalur fungsi dan nilai kembali.'),
      body: [rPro('Teks yang sah belum tentu berisi daftar. Array.isArray memeriksa bentuk hasil. Gunakan finally untuk pekerjaan penutup seperti mematikan tanda sibuk.')],
      code: { lang: 'js', code: 'function baca(teks) {\n  try {\n    const isi = JSON.parse(teks);\n    if (!Array.isArray(isi)) return "Perlu daftar";\n    return isi.length;\n  } catch {\n    return "Periksa berkas";\n  } finally {\n    console.log("Pemeriksaan selesai");\n  }\n}' },
    }),
    qStep(errorQuestion('q3', 'Apa nilai yang dikembalikan baca("{}")?', ['Nol', 'Periksa berkas', 'Perlu daftar'], 2,
      ['Nol adalah hasil untuk daftar kosong.', 'Teks itu sah dan berhasil dibaca.', 'Hasil pembacaan berupa objek. Pemeriksaan daftar pun gagal.'], 'Perhatikan perbedaan kurung kurawal dan kurung siku.')),
    limitStep({ analogy: pro('Petugas yang menerima laporan kerusakan'), same: [pro('Kedua alur menyediakan tempat untuk menanggapi masalah.')],
      different: [pro('Blok catch baru berjalan saat ada kesalahan yang dilempar.')], riskyAnalogy: false }),
    qStep(errorQuestion('q4', 'Jumlah barang bernilai negatif tanpa ada kesalahan yang dilempar. Apa yang perlu ditambahkan?', ['Satu blok catch', 'Pemeriksaan nilai jumlah', 'Pesan saat selesai'], 1,
      ['catch tidak mengetahui aturan jumlah barang.', 'Program perlu memeriksa aturan jumlah secara langsung.', 'Pesan penutup tidak memeriksa nilai pesanan.'], 'Nilai yang bisa dibaca belum tentu layak dipakai.', 'Petugas yang melihat setiap masalah')),
    qStep(errorQuestion('q5', 'Apa nilai yang dikembalikan baca("[]")?', ['Nol', 'Perlu daftar', 'Periksa berkas'], 0,
      ['Daftar itu sah dan panjangnya nol.', 'Hasil pembacaan sudah berupa daftar.', 'Data kosong ini ditulis dengan format yang sah.'], 'Hitung isi kurung siku.')),
    qStep(errorQuestion('q6', 'Kapan pesan penutup dalam finally muncul pada contoh baca?', ['Hanya saat data rusak', 'Hanya saat berhasil', 'Pada kedua jalur'], 2,
      ['finally juga berjalan setelah pembacaan berhasil.', 'finally juga berjalan setelah catch menangani kesalahan.', 'Sebelum fungsi selesai, finally berjalan pada kedua jalur.'], 'Telusuri jalur try dan jalur catch sampai fungsi selesai.')),
  ],
  reviewCards: [
    errorQuestion('r1', 'Teks daftar terpotong di tengah. Apa bantuan yang paling tepat untuk kasir?', ['Tampilkan stok nol', 'Minta berkas yang lengkap', 'Kosongkan daftar lama'], 1,
      ['Stok nol menyampaikan hasil yang belum diketahui.', 'Berkas lengkap memberi kesempatan untuk mengulangi pembacaan.', 'Data lama masih bisa dipakai sambil menunggu berkas pengganti.'], 'Pilih langkah yang memulihkan proses impor.'),
    errorQuestion('r2', 'Impor gagal membaca berkas. Di mana sebaiknya tanda sibuk dimatikan pada kedua jalur?', ['Dalam finally', 'Sebelum membaca berkas', 'Hanya dalam catch'], 0,
      ['finally menjalankan pekerjaan penutup saat berhasil maupun gagal.', 'Tanda akan padam sebelum pekerjaan selesai.', 'Jalur berhasil akan melewati catch.'], 'Cari bagian yang dilalui kedua jalur.'),
  ],
  recap: pro('Pisahkan kesalahan membaca teks dari pemeriksaan isi. Pakai pesan kesalahan untuk memilih langkah pemulihan.'),
};
