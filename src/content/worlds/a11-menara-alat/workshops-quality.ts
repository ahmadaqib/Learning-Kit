import { conceptStep, limitStep, qStep, rPro, storyStep } from '../../lessonHelpers';
import { workshopQuestions } from '../../workshopQuestions';
import type { Lesson } from '../../schema';

const pro = (text: string) => ({ pro: text });
const testQuestion = workshopQuestions('a11-sq3', 'pengujian');
const deployQuestion = workshopQuestions('a11-sq4', 'publikasi');

export const testingBasics: Lesson = {
  id: 'a11-sq3', worldId: 'a11', title: 'Menguji batas ongkos kirim', modes: ['pro'], isSideQuest: true,
  warmupFrom: 'a11-l07', estMinutes: 6, introducesTerms: [], usesTerms: [],
  objective: pro('Kamu bisa menulis tes yang menangkap kesalahan di batas harga.'),
  atWork: 'Tim kasir menguji batas bebas ongkos kirim sebelum menerbitkan perubahan harga.',
  steps: [
    storyStep('Aturan ongkos kirim', [rPro('Toko menjanjikan gratis ongkos kirim mulai dari 100 ribu rupiah. Pelanggan yang belanja tepat 100 ribu justru ditagih.')]),
    conceptStep({
      title: pro('Ubah janji toko menjadi tes'), visualName: 'DiagramConcept',
      visualProps: { worldId: 'a11', topic: 'Kasus uji' }, alt: pro('Ilustrasi Menara Alat'),
      body: [rPro('Tes otomatis menjalankan contoh dan memeriksa hasilnya. Contoh ini memakai Vitest, alat pengujian JavaScript. expect menerima hasil aktual. toBe membandingkannya dengan nilai yang kamu harapkan.')],
      code: { lang: 'js', code: 'import { expect, test } from "vitest";\n\nfunction ongkir(total) {\n  return total > 100000 ? 0 : 8000;\n}\n\ntest("gratis tepat di batas", () => {\n  expect(ongkir(100000)).toBe(0);\n});' },
    }),
    qStep(testQuestion('q1', 'Pelanggan belanja tepat 100 ribu. Berapa ongkos kirim yang dijanjikan toko?', ['0 rupiah', '8 ribu rupiah', '100 ribu rupiah'], 0,
      ['Kata mulai mencakup nilai batas.', 'Tarif ini berlaku di bawah batas.', 'Nilai belanja berbeda dari ongkos kirim.'], 'Perhatikan kata mulai pada janji toko.')),
    qStep(testQuestion('q2', 'Apa hasil aktual untuk 100000 saat kode memakai total > 100000?', ['0', '8000', '100000'], 1,
      ['Nilai yang sama belum memenuhi tanda lebih besar.', 'Perbandingan bernilai salah. Fungsi memilih tarif 8000.', 'Fungsi mengembalikan tarif, bukan total belanja.'], 'Bandingkan dua angka yang sama.')),
    conceptStep({
      title: pro('Jaga kedua sisi batas'), visualName: 'DiagramConcept',
      visualProps: { worldId: 'a11', topic: 'Nilai batas' }, alt: pro('Ilustrasi Menara Alat'),
      body: [rPro('Ganti > dengan >= agar tepat di batas juga gratis. Uji harga sedikit di bawah batas serta harga tepat di batas. Jalankan tes lagi setelah memperbaiki kode.')],
      code: { lang: 'js', code: 'import { expect, test } from "vitest";\nconst ongkir = total => total >= 100000 ? 0 : 8000;\ntest("tarif di sekitar batas", () => {\n  expect(ongkir(99999)).toBe(8000);\n  expect(ongkir(100000)).toBe(0);\n});' },
    }),
    qStep(testQuestion('q3', 'Masukan mana yang membedakan aturan > dari >= untuk batas 100000?', ['99999', '100001', '100000'], 2,
      ['Kedua aturan masih mengenakan ongkos pada nilai ini.', 'Kedua aturan memberi ongkos gratis di atas batas.', 'Hanya >= yang mencakup angka tepat di batas.'], 'Cari nilai tempat kedua perbandingan berbeda.')),
    limitStep({ analogy: pro('Mencicipi satu porsi sebelum menyajikan makanan'), same: [pro('Kamu memeriksa hasil sebelum pelanggan menerimanya.')],
      different: [pro('Tes hanya menjawab pertanyaan yang kamu tulis.')], riskyAnalogy: false }),
    qStep(testQuestion('q4', 'Tes harga di bawah batas lulus. Apa yang diketahui tentang harga tepat di batas?', ['Sudah pasti gratis', 'Belum diuji', 'Pasti ditagih'], 1,
      ['Satu contoh belum memeriksa titik batas.', 'Tes itu hanya memeriksa harga di bawah batas.', 'Hasil untuk harga lain belum diketahui.'], 'Lihat nilai masukan yang benar-benar dijalankan.', 'Mencicipi satu porsi')),
    qStep(testQuestion('q5', 'Tes menunjukkan hasil 8000 untuk belanja tepat di batas. Perubahan mana memenuhi janji toko?', ['Naikkan batas belanja', 'Ganti harapan menjadi 8000', 'Sertakan harga tepat di batas'], 2,
      ['Menaikkan batas membuat lebih sedikit pelanggan mendapat gratis ongkir.', 'Tes akan lulus padahal aturan toko masih dilanggar.', 'Memakai >= memasukkan nilai batas ke kelompok gratis.'], 'Pertahankan janji toko saat memilih perbaikan.')),
    qStep(testQuestion('q6', 'Mengapa tes lama tetap disimpan setelah kode diperbaiki?', ['Menangkap kesalahan yang kembali', 'Mengatur tarif di kasir', 'Menghapus transaksi percobaan'], 0,
      ['Tes dapat memberi tahu tim saat perubahan berikutnya merusak aturan ini.', 'Fungsi ongkir yang menentukan tarif produksi.', 'Tes memeriksa hasil fungsi tanpa membuat transaksi.'], 'Bayangkan seseorang mengubah perbandingan bulan depan.')),
  ],
  reviewCards: [
    testQuestion('r1', 'Diskon berlaku mulai lima barang. Pasangan mana memeriksa peralihan aturan?', ['Satu dan dua', 'Empat dan lima', 'Enam dan tujuh'], 1,
      ['Keduanya di bawah batas diskon.', 'Empat belum berhak. Lima sudah mendapat diskon.', 'Keduanya sudah melebihi batas.'], 'Pilih satu nilai pada setiap sisi peralihan.'),
    testQuestion('r2', 'Dari mana hasil yang diharapkan dalam tes tarif sebaiknya diambil?', ['Dari aturan toko', 'Dari keluaran terbaru', 'Dari waktu tes'], 0,
      ['Aturan toko menjadi pembanding yang terpisah dari perhitungan program.', 'Menyalin keluaran dapat mengabadikan kesalahan perhitungan.', 'Waktu pengujian tidak menetapkan tarif.'], 'Cari sumber yang bisa menunjukkan program sedang keliru.'),
  ],
  recap: pro('Tentukan hasil dari aturan toko, lalu uji nilai di kedua sisi batas. Simpan tes untuk perubahan berikutnya.'),
};

export const deploySite: Lesson = {
  id: 'a11-sq4', worldId: 'a11', title: 'Menerbitkan situs statis', modes: ['pro'], isSideQuest: true,
  warmupFrom: 'a11-l07', estMinutes: 6, introducesTerms: [], usesTerms: [],
  objective: pro('Kamu bisa menyiapkan hasil build, memeriksa tayangan publik, dan kembali ke rilis sebelumnya.'),
  atWork: 'Tim memeriksa halaman utama dan aset di alamat publik sesudah menerbitkan katalog.',
  steps: [
    storyStep('Katalog toko', [rPro('Katalog sudah terbuka di laptop Sari. Pelanggan perlu alamat yang tetap bisa dibuka saat laptop Sari mati.')]),
    conceptStep({
      title: pro('Siapkan berkas yang akan ditayangkan'), visualName: 'DiagramConcept',
      visualProps: { worldId: 'a11', topic: 'Berkas siap tayang' }, alt: pro('Ilustrasi Menara Alat'),
      body: [rPro('Proyek ini memakai Vite dan perintah build sudah tersedia. Jalankan build untuk membuat berkas statis di folder dist. Buka hasilnya secara lokal dengan preview. Langkah ini membantu memeriksa berkas sebelum diunggah.')],
      code: { lang: 'text', code: 'npm run build\nnpm run preview' },
    }),
    qStep(deployQuestion('q1', 'Dengan pengaturan bawaan Vite, folder mana yang berisi hasil build?', ['src', 'dist', 'node_modules'], 1,
      ['src berisi sumber proyek yang masih perlu dibangun.', 'Vite menulis hasil siap tayang ke dist.', 'Folder ini berisi paket yang dipasang untuk proyek.'], 'Cari keluaran proses build.')),
    qStep(deployQuestion('q2', 'Preview di laptop berhasil. Apa yang sudah diperiksa?', ['Alamat publik pelanggan', 'Proses unggah jarak jauh', 'Hasil build lokal'], 2,
      ['Alamat publik perlu dibuka setelah penerbitan.', 'Perintah preview tidak mengunggah berkas.', 'Preview menyajikan hasil build melalui layanan lokal.'], 'Tentukan komputer yang melayani permintaan.')),
    conceptStep({
      title: pro('Periksa alamat yang dibuka pelanggan'), visualName: 'DiagramConcept',
      visualProps: { worldId: 'a11', topic: 'Rilis publik' }, alt: pro('Ilustrasi Menara Alat'),
      body: [rPro('Pada layanan hosting statis, unggah seluruh isi dist atau pilih dist sebagai folder keluaran. Buka alamat publik. Periksa judul, gambar, dan tautan. Simpan rilis sebelumnya agar bisa dipulihkan saat perlu.')],
    }),
    qStep(deployQuestion('q3', 'Sesudah rilis, teks tampil tetapi gambar hilang. Pemeriksaan mana paling langsung?', ['Buka alamat gambar publik', 'Ganti nama aplikasi', 'Hapus riwayat pesanan'], 0,
      ['Alamat gambar menunjukkan apakah berkas itu dapat diambil dari lokasi yang dirujuk.', 'Nama aplikasi tidak menunjukkan lokasi gambar yang gagal.', 'Riwayat pesanan tidak menentukan berkas gambar.'], 'Telusuri permintaan berkas yang hilang.')),
    limitStep({ analogy: pro('Memeriksa contoh cetak sebelum buku diedarkan'), same: [pro('Kamu memeriksa hasil yang akan diterima pembaca.')],
      different: [pro('Berkas yang benar di laptop masih bisa ditempatkan pada jalur yang salah saat diterbitkan.')], riskyAnalogy: false }),
    qStep(deployQuestion('q4', 'Mengapa membuka alamat publik meski preview lokal sudah benar?', ['Mempercepat proses cetak', 'Memeriksa jalur di hosting', 'Mengubah semua tautan'], 1,
      ['Penerbitan situs ini tidak melibatkan pencetakan.', 'Jalur di tempat tayang dapat berbeda dari jalur lokal.', 'Membuka halaman tidak mengubah tautannya.'], 'Bandingkan tempat berkas disajikan.', 'Memeriksa contoh cetak')),
    qStep(deployQuestion('q5', 'Rilis baru merusak katalog, tetapi rilis lama masih tersimpan. Apa cara tercepat memulihkan layanan?', ['Tunggu pengunjung kembali', 'Mulai proyek kosong', 'Aktifkan rilis sebelumnya'], 2,
      ['Menunggu tidak memperbaiki katalog yang rusak.', 'Membangun ulang dari awal menambah waktu pemulihan.', 'Mengaktifkan kembali berkas yang teruji memulihkan katalog sambil perbaikan disiapkan.'], 'Gunakan hasil yang sudah diketahui bekerja.')),
    qStep(deployQuestion('q6', 'Sesudah memulihkan rilis lama, apa yang perlu dicek?', ['Katalog di alamat publik', 'Warna terminal lokal', 'Nama folder cadangan'], 0,
      ['Alamat publik menunjukkan katalog yang sedang diterima pelanggan.', 'Warna terminal tidak menunjukkan hasil pemulihan.', 'Nama cadangan tidak membuktikan rilis mana yang sedang tayang.'], 'Periksa dari sisi orang yang memakai layanan.')),
  ],
  reviewCards: [
    deployQuestion('r1', 'Berkas JavaScript pada rilis baru gagal dimuat. Bukti mana yang langsung membantu?', ['Nama komputer pengembang', 'Alamat dan status permintaan', 'Jumlah baris sumber'], 1,
      ['Nama komputer tidak menjelaskan berkas publik yang gagal.', 'Alamat dan status menunjukkan permintaan mana yang harus diperiksa.', 'Jumlah baris tidak mengungkap lokasi berkas di hosting.'], 'Cari catatan pemuatan berkas pada halaman publik.'),
    deployQuestion('r2', 'Mengapa salinan rilis sebelumnya disimpan saat menerbitkan perubahan?', ['Memudahkan pemulihan', 'Mengganti isi semua rilis', 'Menghemat satu pengujian'], 0,
      ['Tim dapat menayangkan kembali versi yang sudah berfungsi.', 'Salinan lama menjaga isi versi itu tetap tersedia.', 'Rilis baru tetap memerlukan pemeriksaan sendiri.'], 'Bayangkan perubahan baru perlu dibatalkan.'),
  ],
  recap: pro('Bangun berkas, tayangkan folder keluaran, lalu cek alamat publik. Siapkan rilis lama untuk pemulihan.'),
};
