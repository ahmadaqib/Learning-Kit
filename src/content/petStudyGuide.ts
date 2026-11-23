import { resolveTxt, type Lesson, type Mode, type Step } from './schema';

interface PetStudyGuideContext {
  lesson: Pick<Lesson, 'id' | 'title'>;
  card: Exclude<Step, { kind: 'question' }>;
  mode: Mode;
  limitRevealed?: boolean;
}

// Each exercise transfers the current lesson's idea to a new example.
const LESSON_EXERCISES: Partial<Record<string, string>> = {
  'a01-l01': 'Bayangkan kamu menekan tombol Pesan. Ceritakan apa yang perlu kamu lihat di layar dan pekerjaan apa yang bisa selesai di balik layar.',
  'a01-l02': 'Gambar dua tombol dengan bentuk yang sama. Pakai tulisan “Lanjut” pada satu tombol dan “Ke daftar pelajaran” pada yang lain. Mana yang membuat tujuan tombol lebih jelas?',
  'a01-l03': 'Aplikasi perpustakaan sekolah perlu fitur pinjam buku. Pilih dua orang dari tim web dan jelaskan apa yang perlu mereka sepakati sebelum mulai.',
  'a01-l04': 'Bayangkan alamat situs sudah benar, tetapi halaman belum muncul. Tunjukkan dua tempat dalam perjalanan itu yang bisa kamu periksa.',
  'a01-l05': 'Bayangkan kamu pindah dari daftar buku ke halaman satu buku. Buat dua contoh alamat dan tunjukkan bagian yang tetap sama.',
  'a01-l06': 'Bayangkan tombol kelasmu berubah biru dan membuka daftar nama saat ditekan. Gambar bagian yang memuat tulisan, bagian yang menentukan warna, dan bagian yang menangani ketukan.',
  'a02-l01': 'Buat kotak kertas berlabel “Cerita” dan masukkan satu kalimat. Tunjukkan bagian yang menandai awal dan akhir cerita itu.',
  'a02-l02': 'Mulai dengan satu halaman yang hanya menulis “Halo”. Rencanakan letak judul tab dan letak tulisan yang dibaca pengunjung.',
  'a02-l03': 'Rancang undangan satu layar untuk acara kelas. Tulis mana yang berperan sebagai judul, mana yang menjelaskan acara, dan mana yang bisa ditekan.',
  'a02-l04': 'Gambar satu halaman koran sekolah. Coba beri setiap bagiannya label berdasarkan pekerjaan yang dilakukan bagian itu.',
  'a02-l05': 'Bayangkan gambar kucing pada poster gagal muncul. Tulis keterangan singkat yang masih membantu pembaca memahami poster itu.',
  'a03-l01': 'Bayangkan hanya kartu pengumuman yang perlu berwarna jingga. Jelaskan cara membedakannya dari kartu lain sebelum memilih warna.',
  'a03-l02': 'Bayangkan tulisan pada kartu berdesakan dengan bingkainya, sementara jarak ke kartu sebelah sudah pas. Tunjuk satu ruang yang ingin kamu ubah.',
  'a03-l03': 'Bandingkan garis pemisah dan ukuran tulisan pada kartu. Satuan mana yang akan kamu pilih untuk masing-masing agar pembesaran teks tetap nyaman?',
  'a03-l04': 'Gambar tiga buku pada rak lebar. Susun buku dari kiri, lalu di tengah. Perhatikan ruang kosong sebelum buku pertama dan sesudah buku terakhir.',
  'a03-l05': 'Sketsakan tiga tombol dalam satu baris dan kalender satu minggu. Bandingkan mana yang perlu menjaga posisi dalam satu arah atau dalam dua arah.',
  'a03-l06': 'Dua kartu menindih satu sama lain dan tombolnya sulit ditekan. Cari dulu aturan yang membentuk tumpukan sebelum mengubah angka lapisannya.',
  'a03-sq1': 'Gambar satu rak berisi tiga buku. Tebak cara membuat kedua buku ujung menempel ke tepi rak dan buku tengah tetap di tengah.',
  'a04-l01': 'Bayangkan permainan punya kotak berlabel “Nama pemain” dan “Skor”. Ketika pemain mendapat satu poin, kotak mana yang perlu kamu buka?',
  'a04-l02': 'Ada 7 apel di rak berlabel “7”. Catat jumlah apel, tulisan pada label, dan jawaban ya atau tidak untuk “Rak sudah penuh?”. Mana yang kamu pakai untuk menghitung total saat satu apel ditambah?',
  'a04-l03': 'Bayangkan robot menyiram lima pot, tetapi melewati pot yang tanahnya sudah basah. Tulis apa yang diperiksa robot di setiap pot.',
  'a04-l04': 'Buat satu mesin khayalan yang menggandakan jumlah buah. Isi dengan tiga mangga lalu dengan lima mangga. Catat masukan dan hasilnya.',
  'a04-l05': 'Bayangkan tombol Bel membuat papan bertuliskan “Ada tamu”. Tunjukkan tombol yang dipantau dan bagian layar yang berubah ketika bel ditekan.',
  'a04-l06': 'Bayangkan daftar menu masih diminta dari server. Sketsakan apa yang harus dilihat pengguna selama menunggu dan setelah permintaan gagal.',
  'a04-sq1': 'Buat contoh tiga pesanan dengan dua pelanggan bernama sama. Periksa apakah daftar akhirmu memang berasal dari pesanan siap kirim.',
  'a04-sq2': 'Bayangkan data pesanan gagal dibuka. Bedakan apa yang ingin kamu catat untuk pengembang dengan pemberitahuan yang membantu pengguna mencoba lagi.',
  'a05-l01': 'Sketsakan halaman yang memuat judul, foto, dan tombol di HP lalu di laptop. Coba beri foto tempat baru tanpa membuat judul sukar ditemukan.',
  'a05-l02': 'Bayangkan jendela mengecil sementara gambar dan tulisan masih berdampingan. Pilih tanda yang membuatmu ingin memindahkan tulisan ke bawah.',
  'a05-l03': 'Coba rancang kartu mulai dari ukuran sempit. Setelah itu, tentukan satu lebar yang memberi cukup tempat untuk membuat dua kolom.',
  'a05-l04': 'Buat versi HP dari daftar jadwal tiga kolom. Pilih bagian yang tetap harus mudah ditemukan ketika setiap jadwal pindah ke kartunya sendiri.',
  'a06-l01': 'Bayangkan teman baru ingin mencari jadwal. Amati bagian pertama yang ia tekan dan bagian yang membuatnya berhenti lama.',
  'a06-l02': 'Kalau tas sekolah sering terasa berat, tanyakan kapan temanmu paling merasakannya. Sketsakan solusi hanya setelah kamu tahu penyebab yang diceritakannya.',
  'a06-l03': 'Seseorang mau membeli buku sebelum naik bus. Petakan dari mencari buku sampai pembayaran, lalu catat tahap mana yang paling perlu kamu amati.',
  'a06-l04': 'Sketsakan tempat tombol Pesan di kertas. Buat versi sederhana yang bisa dicoba teman jika yang perlu kamu periksa adalah perjalanan setelah tombol ditekan.',
  'a06-l05': 'Minta teman mencari sebuah jadwal di sketsa halamanmu. Catat langkah pertamanya tanpa menunjukkan tombol mana yang harus ia pakai.',
  'a07-l01': 'Gambar poster perpustakaan yang semua tulisannya sama besar. Perbesar satu bagian dan tanyakan ke teman apa yang pertama kali ia baca.',
  'a07-l02': 'Tulis dua judul dan dua keterangan di kertas. Dekatkan setiap judul dengan keterangannya sampai pasangan keduanya terlihat tanpa perlu garis.',
  'a07-l03': 'Gambar kartu dengan judul menempel ke pinggir. Geser judul sedikit ke dalam dan bandingkan apakah kartu kini lebih mudah dilihat.',
  'a07-l04': 'Gambar enam titik. Dekatkan tiga titik di kiri tanpa memberi warna. Minta teman menunjukkan kelompok yang pertama ia lihat.',
  'a07-l05': 'Bandingkan dua sketsa menu kedai, satu menampilkan semua minuman sekaligus dan satu dikelompokkan. Periksa di mana es jeruk lebih cepat ditemukan.',
  'a07-l06': 'Tandai tempat jempolmu bisa mencapai layar tanpa menggeser tangan. Sketsakan letak tombol yang paling sering kamu tekan.',
  'a07-l07': 'Tulis kode tiket enam angka dua kali. Biarkan yang pertama rapat dan buat yang kedua menjadi kelompok kecil. Coba ingat masing-masing selama beberapa detik.',
  'a07-l08': 'Pilih alur pengiriman tugas sekolah. Bandingkan bagian yang paling menegangkan dengan pesan akhir, lalu tentukan pengalaman mana yang ingin kamu perbaiki.',
  'a07-sq1': 'Ambil satu formulir yang meminta alamat. Tentukan informasi yang bisa disiapkan sistem dan bagian yang memang perlu dipastikan oleh pengguna.',
  'a07-sq2': 'Coba mulai sebuah tugas di aplikasi ini. Catat apakah kamu tahu prosesnya sedang berjalan, selesai, atau masih bisa dibatalkan.',
  'a08-l01': 'Pilih warna untuk dua poster, lomba lari dan hari membaca. Pindahkan satu warna dari satu poster ke poster lain dan bandingkan kesannya.',
  'a08-l02': 'Bayangkan ingin membuat versi lebih pudar untuk satu warna biru. Bandingkan dengan versi yang hanya lebih terang dan lihat apa yang masih sama.',
  'a08-l03': 'Pilih warna dasar untuk sampul buku. Coba satu teman warna yang dekat di roda warna dan satu yang berseberangan. Bandingkan kesan keduanya.',
  'a08-l04': 'Gambar sebuah layar dengan latar luas, kartu, dan satu tombol. Warnai tombol terakhir supaya kamu bisa melihat seberapa sedikit warna itu dipakai.',
  'a08-l05': 'Bayangkan warna pada tanda berhasil dan gagal dihapus. Tambahkan bentuk atau kata yang tetap membuat kedua tanda bisa dibedakan.',
  'a08-l06': 'Tulis kata yang sama di atas latar terang dengan dua warna tinta. Dari jarak yang sama, periksa versi mana yang masih bisa kamu baca.',
  'a08-l07': 'Ambil satu warna tombol. Pertahankan warna dasarnya dan coba dua tingkat transparansi di atas latar terang, lalu bandingkan hasilnya.',
  'a08-l08': 'Tulis dua kalimat dengan baris berdekatan. Salin lagi dengan jarak baris lebih lebar. Mana yang memudahkan matamu menemukan awal baris kedua?',
  'a08-l09': 'Sketsakan judul, isi, dan keterangan foto. Batasi pilihan ukuran menjadi tiga, lalu periksa apakah hierarki masih terbaca ketika semuanya berwarna sama.',
  'a09-l01': 'Sketsakan tiga kartu pada kisi 12 kolom. Ubah satu kartu menjadi dua kali lebih lebar, lalu periksa bagaimana posisi kartu terakhir ikut berubah.',
  'a09-l02': 'Gambar pesan singkat setelah draf tersimpan. Lalu gambar jendela yang meminta kepastian sebelum draf dihapus. Apa yang perlu dilakukan pengguna pada masing-masing?',
  'a09-l03': 'Gambar bentuk tombol Kirim sebelum dan setelah ditekan. Beri tanda yang membantu teman tahu bahwa kiriman sedang diproses.',
  'a09-l04': 'Gambar tombol dan kartu yang sama untuk aplikasi perpustakaan dan aplikasi main. Ubah gaya tampilannya sambil menjaga letak dan tugas tombol.',
  'a09-l05': 'Bayangkan semua teks penting perlu lebih gelap. Pilih satu nama untuk warna itu, lalu tunjukkan beberapa komponen yang bisa merujuk ke nama yang sama.',
  'a09-l06': 'Ambil satu kartu buku. Pecah menjadi bagian yang bisa dipakai sendiri, lalu coba susun salah satu bagiannya di panel lain.',
  'a10-l01': 'Bayangkan kamu membuka halaman di bawah sinar matahari. Pilih bagian yang akan sukar terlihat dan buat satu perubahan yang membantu.',
  'a10-l02': 'Bayangkan formulir bisa dilihat tetapi tombol Kirim tidak bisa dijangkau dengan keyboard. Gunakan daftar POUR untuk menentukan apa yang perlu diperiksa.',
  'a10-l03': 'Coba pindah dari satu tombol ke tombol lain tanpa mouse. Periksa apakah kamu bisa melihat letak pilihanmu setiap kali berpindah.',
  'a11-l01': 'Bayangkan merakit rumah mainan dari paket yang punya urutan sendiri. Lalu bayangkan membuat rumah dari kardus dengan alat pilihanmu. Siapa yang menentukan urutan kerja pada tiap cara?',
  'a11-l02': 'Rancang penghitung buku pinjaman. Tandai data yang datang dari luar komponen dan data yang berubah setiap kali tombolnya ditekan.',
  'a11-l03': 'Buat dua sketsa kartu yang sama. Pada satu sketsa, pilih pengaturan kecil satu per satu. Pada yang lain, mulai dari kartu yang sudah dirakit. Bandingkan bagian mana yang perlu kamu ubah sendiri.',
  'a11-l04': 'Bayangkan judul cepat muncul, tetapi tombol lama menanggapi dan teks bergeser saat foto masuk. Catat dua masalah itu sebagai pengamatan terpisah.',
  'a11-l05': 'Bayangkan tautan halaman pendaftaran dibagikan ke grup kelas. Tulis judul dan keterangan ringkas yang masih jelas bagi pembaca yang baru pertama melihatnya.',
  'a11-l06': 'Bayangkan kamu dan teman membuat dua versi peta. Tulis catatan singkat tentang perubahan masing-masing sebelum menyatukannya.',
  'a11-l07': 'Bayangkan tombol pada halaman latihan mendadak berhenti bekerja. Catat tindakan terakhir yang bisa kamu ulang sebelum meminta bantuan.',
  'a11-sq1': 'Bayangkan halaman bekerja saat pengembangan, tetapi hasil build belum pernah dibuka. Catat bagian yang perlu kamu coba lagi pada hasil build.',
  'a11-sq2': 'Saat halaman bilang barang tidak ditemukan, cari bukti yang bisa membedakan alamat keliru, balasan server, dan cara layar menampilkannya.',
  'a11-sq3': 'Pilih satu ambang ongkos kirim. Siapkan tiga nilai belanja berdekatan yang bisa membedakan perilaku tepat di ambang dari perilaku di kedua sisinya.',
  'a11-sq4': 'Buka satu alamat halaman dari tab baru, lalu muat ulang tepat di alamat itu. Periksa juga versi yang muncul sebelum memutuskan rilis berhasil.',
  'a12-l01': 'Bayangkan formulir umur menerima kata “banyak”. Rancang pesan yang membantu tamu memperbaiki ketikannya tanpa menyalahkan dia.',
  'a12-l02': 'Bayangkan papan kelas menerima komentar yang berisi tanda kurung sudut. Jelaskan apa yang semestinya dilihat pembaca jika komentar tampil sebagai tulisan biasa.',
  'a12-l03': 'Bayangkan persetujuan terjadi tanpa maksud pengguna. Bedakan bukti pengguna memang sedang masuk dengan bukti bahwa ia melihat dan memilih tindakan yang tepat.',
  'a12-l04': 'Bayangkan web kelas memanggil layanan yang memerlukan kunci rahasia. Gambar siapa yang boleh menyimpan kunci dan siapa yang hanya perlu melihat hasilnya.',
  'b01-l01': 'Bayangkan kamu memesan tanpa mengetahui dapurnya. Tulis pesanan yang cukup jelas agar pelayan bisa membawakannya kembali ke mejamu.',
  'b01-l02': 'Gambar panah dari HP ke layanan musik saat kamu mencari lagu. Tambahkan panah pulang dan tulis apa yang dibawa masing-masing panah.',
  'b01-l03': 'Pilih fitur lokasi pada aplikasi. Bandingkan pekerjaan yang dilakukan aplikasi sendiri dengan pekerjaan yang ia minta melalui API.',
  'b01-l04': 'Pelayan berjanji membawa nomor meja pada setiap pesanan yang selesai. Bayangkan nomor itu hilang dan jelaskan siapa yang kesulitan.',
  'b02-l01': 'Bayangkan memesan dua teh untuk meja empat. Pisahkan informasi yang dipakai untuk mengantar pesan dari rincian pesanan yang harus dibaca di tujuan.',
  'b02-l02': 'Pilih satu kontak. Bandingkan melihat nomornya, memperbaruinya, dan menghapusnya dengan menyebut apa yang berubah setiap kali.',
  'b02-l03': 'Bayangkan satu permintaan dikirim dua kali. Bandingkan membaca catatan dengan menambah satu salinan catatan setiap kali permintaan sampai.',
  'b02-l04': 'Bandingkan dua kabar dari situs. Yang satu bilang halaman tidak ditemukan, yang lain bilang ada gangguan di server. Untuk masing-masing, apa yang ingin kamu periksa dulu?',
  'b02-l05': 'Rancang permintaan membuka satu buku, menyaring daftar buku berdasarkan kelas, dan menambah buku. Tentukan bagian permintaan yang cocok untuk membawa rincian tiap tugas.',
  'b02-l06': 'Bayangkan situs mengingat tema gelap yang kamu pilih dan menyimpan salinan gambar agar cepat dibuka. Jika gambar di situs diganti, apa yang perlu diperbarui?',
  'b03-l01': 'Buat formulir buku favorit dengan satu kotak judul dan satu kotak jumlah halaman. Tentukan cara membedakan label kotak dan isi kotak.',
  'b03-l02': 'Salin dua isian sederhana ke formulir JSON. Baca sekali untuk memeriksa nama dan isi, lalu baca lagi dari ujung baris untuk melihat tanda pemisah.',
  'b03-l03': 'Tuliskan daftar tiga barang agar seorang teman bisa menyusun kembali daftar yang sama tanpa melihat barang aslinya. Periksa rincian yang mudah tertinggal.',
  'b03-l04': 'Bandingkan mengirim dua kolom isian pendek dengan mengunggah foto tugas. Catat perbedaan kebutuhan sebelum memilih format.',
  'b04-l01': 'Ambil dua kebutuhan, membaca daftar buku dan memilih hanya judul serta pengarang. Bandingkan cara pengguna menyampaikan setiap permintaan.',
  'b04-l02': 'Sketsakan alamat untuk semua buku dan untuk satu buku saja. Tunjukkan bagian yang membuat pembaca tahu rak atau buku mana yang dimaksud.',
  'b04-l03': 'Bayangkan satu buku baru masuk saat kamu membaca halaman kedua daftar. Periksa apakah cara meminta halaman berikutnya akan melewatkan atau mengulangi buku.',
  'b04-l04': 'Bayangkan halaman hanya menampilkan judul dan stok. Tanyakan apa yang bisa ditinggalkan dari pesan pelayan tanpa membuat halaman kehilangan informasi.',
  'b04-l05': 'Bandingkan dua layanan internal yang terus bertukar data dengan satu halaman yang harus mudah dibaca saat diuji. Catat kebutuhan yang menentukan pilihan protokol.',
  'b04-sq1': 'Ambil operasi menghitung ongkos kirim. Bandingkan memberi nama operasi itu dengan membentuk alamat untuk sebuah sumber data.',
  'b05-l01': 'Bayangkan kamu menunggu skor berubah. Gambar kapan layar menanyakan skor dan tandai pertanyaan yang tidak membawa kabar baru.',
  'b05-l02': 'Bayangkan dua orang bertanya soal skor. Yang satu segera kembali dan bertanya lagi nanti. Yang lain menunggu jawaban di tempat. Bandingkan jumlah pertanyaan sebelum skor berubah.',
  'b05-l03': 'Bayangkan layar di kantin menampilkan skor terbaru. Gambar arah kabar dari pencatat skor hingga muncul di layar. Tambahkan arah lain jika penonton juga perlu mengirim komentar.',
  'b05-l04': 'Bayangkan dua pemain saling mengirim gerakan. Gambar satu panah untuk tiap arah yang dibutuhkan dan catat kapan pemain bisa mulai mengirim.',
  'b05-l05': 'Dalam panggilan video, bedakan pesan yang memperkenalkan kedua perangkat dari video yang dikirim setelah keduanya terhubung.',
  'b06-l01': 'Bayangkan toko menunggu kabar barang sudah dibayar. Tentukan kapan kabar perlu dikirim dan siapa yang bisa mengirimkannya saat kejadian itu terjadi.',
  'b06-l02': 'Dua pemberitahuan menyebut pembayaran yang sama. Pisahkan bukti pengirimnya sah dari bukti bahwa pesanan itu sudah diproses.',
  'b06-l03': 'Bayangkan satu roti harus dibungkus dan satu pengumuman harus didengar tiga orang. Pilih siapa yang perlu mengambil pekerjaan dan siapa yang cukup menerima kabar.',
  'b07-l01': 'Bayangkan seorang teman sudah dikenal penjaga sekolah. Saat ia ingin masuk ruang alat, pertanyaan apa lagi yang harus dijawab penjaga?',
  'b07-l02': 'Bandingkan akses seorang siswa dengan akses aplikasi yang bekerja sendiri. Sebutkan siapa yang sedang diwakili oleh kredensial pada tiap contoh.',
  'b07-l03': 'Gambar gelang konser kertas. Pisahkan bagian yang boleh dibaca semua orang dari tanda yang membantu penjaga memeriksa keasliannya.',
  'b07-l04': 'Bayangkan tanda akses untuk melihat daftar buku kedaluwarsa. Gambarkan dua permintaan terpisah, meminta tanda akses pengganti dan mengambil daftar buku.',
  'b07-l05': 'Aplikasi cetak hanya perlu membaca foto yang dipilih pengguna. Tentukan operasi yang perlu diizinkan, lalu pertimbangkan apakah aplikasi juga perlu izin menghapus foto.',
  'b08-l01': 'Bayangkan server berhasil menjawab, tetapi halaman tidak bisa membaca jawabannya. Catat apa yang harus kamu periksa tentang asal halaman dan izin server.',
  'b08-l02': 'Bayangkan semua teman ingin naik wahana berulang kali. Buat aturan jumlah naik per anak dalam sepuluh menit agar teman yang baru datang juga mendapat kesempatan.',
  'b08-l03': 'Bayangkan pesan pertamamu ke perpustakaan belum dibalas. Gambar jarak antara tiga percobaan berikutnya dan periksa apakah percobaan itu menumpuk.',
  'b08-l04': 'Bayangkan pembayaran berhasil tepat sebelum sambungan terputus. Catat tanda yang bisa dipakai saat mencoba ulang agar transaksi lama dapat dikenali.',
  'b08-l05': 'Bayangkan satu endpoint memperbarui profil siswa. Sebutkan data yang boleh ditulis pengguna dan pemeriksaan yang membatasi profil yang boleh ia ubah.',
  'b09-l01': 'Bayangkan server mengembalikan pesan gagal dalam bentuk JSON. Tentukan apa yang perlu diperiksa sebelum memakai isi pesan seperti data berhasil.',
  'b09-l02': 'Gambar empat tampilan daftar buku. Bayangkan daftar masih dimuat, sudah berisi buku, kosong, atau gagal dibuka. Apa yang perlu dilihat pembaca pada tiap tampilan?',
  'b09-l03': 'Bayangkan kamu mengetik “kim” lalu “kimia”. Rancang cara mencegah hasil pencarian singkat datang belakangan dan menimpa hasil terbaru.',
  'b09-l04': 'Pilih tindakan memberi Suka atau membayar pesanan. Bandingkan akibat menampilkan keberhasilan sebelum server membalas pada kedua tindakan.',
  'b09-l05': 'Gambar alur dari tombol Cari ke penyedia data. Tandai di mana kredensial dibutuhkan dan di mana hanya hasil pencarian yang diperlukan.',
  'b09-l06': 'Bayangkan tampilan menunggu angka tetapi balasan berisi teks. Bandingkan kontrak dengan data nyata sebelum memutuskan bagian yang perlu diperbaiki.',
  'b09-sq1': 'Sketsakan kartu buku dengan judul yang datang dari induknya dan tombol Suka yang bisa berubah. Tandai siapa pemilik setiap nilai.',
  'b10-l01': 'Rancang papan skor dan tombol obrolan untuk pertandingan. Gambar arah kabar bagi tiap fitur sebelum menentukan cara menghubungkannya.',
};

const SIMULATOR_OBSERVATIONS: Partial<Record<string, string>> = {
  'restoran-web': 'Ikuti urutan yang terlihat setelah satu ketukan.',
  'rak-label-html': 'Perhatikan bagian halaman yang mendapat label setelah kamu memilihnya.',
  'kupas-box-model': 'Ubah satu penggeser dan amati batas kotak yang ikut bergerak.',
  'playground-flexbox': 'Perhatikan ruang di tepi rak dan di antara buku saat posisi berubah.',
  'mesin-blender': 'Amati apa yang masuk, lalu ikuti perubahan sampai hasilnya muncul.',
  'penggeser-layar': 'Geser pelan dan perhatikan kapan letak kartu mulai berubah.',
  'desa-ux': 'Ketuk satu tahap dan cari pekerjaan yang perlu selesai sebelum tahap itu.',
  'hick-menu': 'Perhatikan bagaimana kamu menemukan pilihan di antara tombol yang ada.',
  'fitts-target': 'Bandingkan seberapa jauh kamu harus bergerak untuk mencapai masing-masing tombol.',
  'roda-warna': 'Saat memilih warna lain, perhatikan bagian palet yang ikut berubah.',
  'detektif-kontras': 'Amati contoh yang tulisannya paling mudah terbaca.',
  'tombol-seribu-wajah': 'Perhatikan bagian tombol yang berubah dan bagian yang masih sama.',
  'taman-akses': 'Periksa perubahan yang muncul ketika satu syarat ditandai.',
  'menara-alat': 'Ikuti satu tahap sampai selesai dan amati tahap yang menyusul.',
  'perakit-request': 'Bandingkan bagian pesan yang kamu isi dengan status balasan.',
  'benteng-xss': 'Bandingkan cara dua mode menampilkan tulisan yang sama.',
  'restoran-api': 'Perhatikan tempat jawaban muncul setelah pesanan dikirim.',
  'penyortir-status': 'Perhatikan angka pertama pada kartu sebelum memilih kelompok.',
  'dokter-json': 'Periksa satu tanda atau isian setiap kali, lalu bandingkan hasilnya.',
  'pelayan-graphql': 'Ubah satu pilihan dan lihat bagian mana yang hilang atau muncul pada jawaban.',
  'balap-realtime': 'Bandingkan waktu munculnya kabar dengan waktu layar menanyakannya.',
  'bel-webhook': 'Perhatikan peristiwa yang terjadi tepat sebelum bel berbunyi.',
  'pembaca-gelang-jwt': 'Perhatikan apakah keputusan penjaga berubah saat jenis tamu berganti.',
  'satpam-cors': 'Amati apa yang berubah ketika asal permintaan diganti.',
  'telepon-sopan': 'Bandingkan jarak percobaan dan balasan yang muncul.',
  'empat-wajah-layar': 'Ubah hasil permintaan dan amati informasi baru yang diberikan layar.',
  'puncak-api': 'Pilih dua kebutuhan berbeda dan bandingkan jalur kabar yang disarankan.',
};

/** The text shared by the visible exercise and its prerecorded narration. */
export function getPetStudyExercise(lesson: PetStudyGuideContext['lesson']): string {
  return LESSON_EXERCISES[lesson.id]
    ?? `Pilih contoh untuk “${lesson.title}”. Ceritakan apa yang terjadi jika kamu mengubah salah satu bagiannya.`;
}

export function getPetStudyGuide({ lesson, card, mode, limitRevealed = false }: PetStudyGuideContext): string {
  const exercise = getPetStudyExercise(lesson);

  switch (card.kind) {
    case 'story':
      return exercise;
    case 'concept':
      return `${exercise} Cari petunjuk di kartu “${resolveTxt(card.title, mode)}”.`;
    case 'sim':
      return [SIMULATOR_OBSERVATIONS[card.simId], exercise].filter(Boolean).join(' ');
    case 'limit':
      return limitRevealed
        ? `${exercise} Cocokkan pengamatanmu dengan batas perumpamaan di kartu.`
        : `${exercise} Simpan dugaanmu sebelum membuka batas perumpamaan.`;
  }
}
