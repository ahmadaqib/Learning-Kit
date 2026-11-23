# Petualang Web — Panduan Copydeck Kurikulum

| | |
|---|---|
| Tanggal | 2026-11-22 |
| Cabang | `redesign/playful-ui-copydeck` |
| Untuk siapa | Penulis yang menulis ulang teks di `src/content/worlds/*/index.ts`, `glossary.ts`, `stickers.ts`, `worldMeta.ts` |
| Dokumen pasangan | `docs/superpowers/specs/2026-11-22-playful-redesign-design.md` (desain ulang tampilan). Paket kerja copydeck adalah **Paket 5** di dokumen itu |
| Dasar | `prd.md` §5.1, §8, §11, §14.3 |
| Revisi | 2026-11-23, setelah panel lima juri persona. Keputusan lengkap ada di dokumen desain §15 |

Panduan ini bersifat mengikat. Kalau ada aturan di sini yang lebih ketat daripada PRD, ikuti panduan ini.

---

## 1. Masalah yang sedang diperbaiki

Hasil audit konten (22 dunia, 113 pelajaran, 4 misi bonus):

- Dari 445 soal kuis yang dilihat Junior, 441 memakai **teks yang sama persis** dengan Pro, karena penulis memanggil `t('satu teks')` dengan satu argumen. Sebanyak 260 di antaranya lebih panjang dari 12 kata.
- Junior mendapat soal **berbasis kode**: 9 soal `spotbug` dan 6 soal `why`, padahal PRD §8.1 melarang kode di kuis Junior.
- Teks Junior **rusak** di kartu yang memakai potongan `rCode(...)`: kalimat Junior sudah selesai, lalu potongan kode dan kata sambung milik Pro ikut tampil.
- Hanya 4 dari 445 soal yang punya petunjuk.
- Kartu Batas Analogi tampil di **semua** 76 pelajaran Junior, karena `limitStep()` menganggap setiap analogi berisiko.
- Istilah sulit masuk ke soal Junior: "Doherty Threshold", "1,8 : 1", "HTTP/1.1", "30 kolom tak terpakai", "DOM", "XSS".

Tujuan penulisan ulang: **anak kelas 4 SD bisa membaca soalnya sendiri, mengerti yang ditanyakan, dan mengerti mengapa jawabannya benar.** Anak yang lebih muda bisa mengikuti bersama pendamping, karena semua teks Junior dibacakan oleh aplikasi. Untuk Pro: remaja dan orang dewasa yang mulai dari nol bisa mengikuti tanpa harus membuka kamus setiap kalimat.

Lima juri persona (usia 8, 11, 14, 27, dan seorang guru SD) sudah membaca panduan ini. Temuan terpentingnya: **penulis menyalin contoh, bukan aturan.** Jadi contoh di §10 harus lebih taat daripada aturannya sendiri. Semua contoh yang melanggar sudah diperbaiki, dan contoh untuk Pro ditambah.

---

## 2. Suara

Sama dengan PRD §11.1, ditegaskan lagi:

- Pakai "kamu". Bito memakai "aku". Jangan pakai "Anda", "kalian", "kita semua", atau "pengguna" di teks Junior.
- **Santai tetapi rapi: kata baku yang pendek dan akrab.** Bukan kata cakapan. Tulis "tetapi", "hanya", "mudah", "membuat", "tidak", "mengapa". Jangan tulis "tapi", "cuma", "gampang", "bikin", "nggak". Kata baku yang pendek tetap mudah dipahami anak, dan guru serta orang tua tidak ragu merekomendasikan aplikasinya. Daftarnya ada di §9.4.
- Kata cakapan hanya boleh di dalam **ucapan Bito atau tokoh**, dan diberi tanda kutip: Bito berkata, "Wah, cuma segini?"
- Tanpa singkatan chat ("gk", "bgt", "yg").
- Tidak memuji berlebihan. Tidak menyalahkan. Tidak menyindir. Tanpa kata penegas yang bisa terdengar menyindir ("tentu saja", "jelas", "masa").
- Paling banyak satu tanda seru per teks. Tanpa huruf kapital untuk menekankan (kecuali kata TIDAK di soal Pro yang memang menanyakan pengecualian).
- **Teks dibacakan oleh aplikasi.** Cerita, konsep, soal, pilihan, petunjuk, dan penjelasan Junior semuanya bisa didengar. Tulis kalimat yang enak didengar: tanpa tanda "→", "/", atau "&" di teks Junior. Tulis "lalu", "atau", "dan".

### 2.1 Suara Junior: kakak yang sabar

Bukan guru galak, bukan iklan, bukan buku paket. Hangat, konkret, dan dekat dengan dunia anak. Di aplikasi, mode Junior tampil dengan nama **"Petualang"**. Di panduan ini dan di kode, namanya tetap Junior.

### 2.2 Suara Pro: teman yang sudah mahir

Pembaca Pro ada dua: remaja yang ingin cepat memegang kode, dan orang dewasa yang mulai dari nol. Keduanya pergi kalau merasa digurui.

- **Langsung ke fakta.** Kalimat pertama berisi isi, bukan pembuka.
- **Tanpa komentar tentang cara belajar atau cara kerja otak.** Jangan: "Soal yang diulang memperkuat ingatan." Pakai angka: "4 dari 5 benar di percobaan pertama."
- **Tidak menghibur, tidak membujuk.** Jangan: "belum tahu? tidak apa-apa". Pakai: "belum tahu? lewati saja".
- **Akrab karena lugas, bukan karena gaul.** Aturan kata baku di atas tetap berlaku.
- **Tujuan ditulis sebagai hasil**: "Kamu bisa membaca isi sebuah request HTTP."
- **Mulai dari pekerjaan nyata** bila bisa: form yang gagal terkirim, halaman yang lambat, tombol yang tidak bisa diketuk.

---

## 3. Aturan Junior (9–12 tahun)

Junior ditulis untuk anak 9–12 tahun yang membaca sendiri. Anak 7–8 tahun memakai teks yang sama dengan bantuan tombol "Dengar" dan seorang pendamping. Tidak ada versi teks ketiga.

### 3.1 Kalimat

1. **Paling banyak 12 kata per kalimat.** Hitung setiap kata yang dipisah spasi. Angka dihitung satu kata. Kata di dalam kurung ikut dihitung.
2. **Satu kalimat, satu ide.** Kalau perlu "dan juga", "sehingga", atau "sedangkan", pecah jadi dua kalimat.
3. **Kalimat aktif.** Pelakunya disebut di depan.
   - Jangan: "Pesanan dibawa oleh pelayan ke dapur."
   - Pakai: "Pelayan membawa pesanan ke dapur."
4. **Tanpa negatif ganda.** Jangan: "Tidak ada yang tidak boleh masuk." Pakai: "Semua boleh masuk."
5. **Angka ditulis dengan angka**: "3 kotak", bukan "tiga kotak".
6. **Tanpa kurung penjelas yang panjang.** Kalau butuh penjelasan, tulis kalimat baru.
7. **Tanpa sarkasme dan ironi.** Anak membacanya secara harfiah.

### 3.2 Kata

1. **Kata sehari-hari.** Ujiannya: apakah kata ini dipakai anak saat mengobrol di kantin? Kalau tidak, ganti (lihat daftar di §9).
2. **Analogi dulu, istilah kemudian.** Istilah Inggris baru boleh muncul setelah analoginya disebut.
3. **Paling banyak 2 istilah baru per pelajaran.** Istilah baru ditulis sebagai `rTerm(...)` dan langsung diikuti artinya di kalimat yang sama: "**Frontend** adalah ruang makan web."
4. **Cara baca ada di glosarium.** Setiap istilah yang dipakai di pelajaran Junior wajib punya `pronunciation` dan `shortDef.junior` di `glossary.ts`. Cara baca tampil saat istilah diketuk, jadi tidak perlu diulang di kalimat. (Ini keputusan baru. PRD §11.2 meminta cara baca ditulis di kalimat, tetapi itu menghabiskan jatah 12 kata.)
5. **Nama hukum, teori, dan tokoh ilmuwan tidak ditanyakan.** Junior ditanya idenya ("tombol besar lebih mudah diketuk"), bukan namanya ("Fitts's Law"). Nama boleh muncul satu kali sebagai `rTerm` di kartu konsep.
6. **Tanpa angka teknis**: kode warna heks (`#FFB400`), rasio (`4,5 : 1`), satuan piksel, milidetik, versi protokol (`HTTP/1.1`), nama header. Ganti dengan perbandingan yang bisa dibayangkan: "oranye terang", "cukup beda terang-gelapnya", "sekejap".
7. **Kata inti web boleh dipakai setelah dikenalkan.** "Server", "browser", "situs", "API", "frontend", "backend", dan "data" memang kata yang diajarkan. Sebelum pelajaran yang mengenalkannya, pakai kata analoginya (§9.1). Sesudah dikenalkan dengan `rTerm` dan artinya, kata itu boleh dipakai di pelajaran berikutnya, termasuk di pilihan jawaban. Junior tidak dikurung di dalam analogi: anak yang lebih besar senang memakai istilah asli yang sudah ia pahami.
8. **Angka status (401, 404, 429) hanya muncul bila pelajaran itu mengajarkannya**, yaitu angkanya ada di kartu konsep Junior pelajaran itu bersama analoginya. Di luar itu, tulis maknanya: "pintu terkunci", "tunggu dulu".

### 3.3 Contoh dari dunia anak

Setiap ide baru butuh satu gambaran dari hal yang pernah dialami anak. Ambil dari daftar ini, jangan dari dunia kantor:

| Dunia anak | Cocok untuk |
|---|---|
| Kantin sekolah, antre, pesan makanan | Request, response, antrean, batas jumlah |
| Surat, amplop, tukang pos, paket | Pesan, header, isi paket, alamat |
| Kelas, papan tulis, papan pengumuman, ketua kelas | Aturan, izin, pengumuman, penyaringan |
| Tas sekolah, kotak pensil, rak buku, lemari | Menyimpan, mengelompokkan, variabel, data |
| Main bola, gawang, layangan, petak umpet | Ukuran target, jarak, giliran |
| Rumah: pintu, kunci, bel, satpam kompleks | Login, izin, webhook, keamanan |
| Telepon, radio, grup chat kelas | Sambungan, siaran, pesan langsung |
| Menggambar, mewarnai, spidol, kertas | Warna, kontras, tata letak |

Tokoh contoh tetap dari PRD §11.6: **Bito, Rani, Dimas, Sari, Pak Udin, Bu Laras**. Domain contoh tetap `*.example`. Jangan memakai nama merek.

### 3.4 Kode di Junior

- **Soal kuis Junior tidak berisi kode.** Tidak ada tag, tidak ada properti, tidak ada baris kode, baik di pertanyaan maupun di pilihan.
- **Kartu konsep Junior** boleh memuat paling banyak **satu** potongan kode pendek sebagai "gambar": satu tag atau satu kata, paling panjang 12 karakter, misalnya `<p>`. Potongan itu harus dijelaskan dengan kata biasa di kalimat yang sama.
- Angka seperti 401 atau 404 ditulis sebagai angka biasa di dalam kalimat Junior, bukan sebagai potongan kode, dan hanya di pelajaran yang mengajarkannya (§3.2 aturan 8).
- Blok kode (`code: { ... }`) di kartu konsep tidak tampil di Junior. Jangan menulis kalimat Junior yang merujuk ke blok itu ("lihat baris ke-2").
- **Tantangan Kode.** Setelah mendapat ★★★, anak Junior boleh memilih satu soal kode sungguhan: soal `fill` atau `spotbug` milik Pro dengan `difficulty` 1 atau 2 dari pelajaran itu. Soal ini opsional dan tidak dinilai. Jadi tulis teks Pro untuk soal semacam itu sependek dan sejelas mungkin, karena anak 11 tahun mungkin membacanya.

---

## 4. Aturan Pro (remaja dan dewasa, mulai dari nol)

Pembaca Pro bukan hanya anak 13 tahun. Ia juga karyawan 27 tahun yang ingin pindah karier dan belajar di kereta. Keduanya pemula. Aturan Pro lebih longgar daripada Junior dalam panjang kalimat, tetapi **tidak lebih longgar dalam kejelasan**.

1. **Paling banyak 20 kata per kalimat.** Satu kalimat tetap satu ide.
2. **Istilah teknis boleh, asal dikenalkan.** Saat istilah muncul **pertama kali di pelajaran itu**, beri arti singkat dengan kata biasa. Dua pola yang dipakai:
   - Arti dulu: "Data yang ikut terkirim padahal tidak dipakai disebut **over-fetching**."
   - Istilah dulu: "**Over-fetching** (data berlebih yang ikut terkirim) memperlambat aplikasi."
3. **Setelah dikenalkan, pakai apa adanya.** Tidak perlu terus diterjemahkan.
4. **Jangan menumpuk istilah.** Dalam satu kalimat, paling banyak **satu** istilah yang baru dikenalkan dan paling banyak **dua** istilah teknis secara keseluruhan. Kalau lebih, pecah kalimatnya.
5. **Singkatan diberi arti dulu, kepanjangan kemudian.** Menjabarkan singkatan Inggris dengan kata Inggris lain tidak menjelaskan apa-apa. Tulis artinya dalam Bahasa Indonesia, lalu kepanjangannya di dalam kurung bila perlu: "RPC, cara memanggil fungsi di server lain (Remote Procedure Call)". Singkatan yang sudah menjadi nama dunia atau pelajaran (HTML, CSS, API, URL) diberi arti sekali di pelajaran yang mengenalkannya.
6. **Paling banyak 3 istilah baru per pelajaran** (PRD §5.1), dan semuanya terdaftar di `introducesTerms`. Setiap istilah itu wajib punya `pronunciation` dan `shortDef.pro` di glosarium. Orang dewasa juga perlu tahu cara menyebut PATCH, GraphQL, atau Vite di depan tim.
7. **Kode, nama properti, nama header, dan nilai** memakai `rCode(...)`.
8. **Tanpa bahasa gaul teknis**: "menembak endpoint" jadi "memanggil endpoint", "nge-fetch" jadi "mengambil data".
9. **Angka dengan satuan**: "0,4 detik", "9 px", "rasio 4,5 : 1".
10. **Kalimat aktif**, sama seperti Junior.
11. **Tanpa kata buku teks.** Daftar §9.2 berlaku juga untuk Pro, ditambah daftar §9.3 ("anatomi", "menguraikan", "metadata", "muatan", "entitas", "implementasi"). Kata semacam itu hanya boleh bila ia memang istilah yang dikenalkan di pelajaran itu.
12. **Rangkuman bisa diucapkan ulang ke teman kantor**, sama seperti aturan Junior. Contoh: "Request berisi method, alamat, header (keterangan), dan body (isi data). Response dibuka dengan kode status."
13. **Tidak ada soal hafalan singkatan.** Jangan menanyakan kepanjangan ("Tuliskan kepanjangan API"). Tanyakan gunanya, atau minta pembaca memprediksi: "Kode ini menampilkan apa?", "Baris mana yang membuat halaman kosong?".
14. **Pertanyaan berbentuk tanya langsung**, sama seperti Junior (§6.1 aturan 2). Tanpa kalimat menggantung yang diakhiri "…".
15. **Kartu konsep yang punya blok kode**: kalimat pertama harus berdiri sendiri dan menjelaskan intinya dengan kata biasa. Di HP, kalimat itu tampil sebelum kode. Isi kartu paling banyak 60 kata.

### 4.1 Di tempat kerja (`atWork`)

Setiap pelajaran yang tampil di Pro wajib punya `atWork`: **satu kalimat, paling banyak 20 kata**, yang menjawab "di pekerjaan developer, ini dipakai untuk apa?". Kalimat ini tampil di layar hasil Pro.

- Sebut situasi yang bisa dibayangkan, bukan manfaat umum.
- Pakai: "Kamu akan melihat ini di tab Network DevTools saat form gagal terkirim."
- Jangan: "Konsep ini sangat penting dalam pengembangan web modern."
- `atWork` hanya untuk Pro. Isinya satu string biasa, bukan `t()`.

---

## 5. Batas panjang per jenis teks

| Jenis teks (field) | Junior | Pro |
|---|---|---|
| Judul pelajaran (`title`, satu teks untuk dua mode) | Paling banyak 6 kata. Kalau pelajaran tampil di Junior, judul mengikuti aturan Junior | Paling banyak 6 kata |
| Tujuan (`objective`) | 1 kalimat, ≤ 12 kata, diawali "Aku bisa…" | 1 kalimat, ≤ 20 kata, diawali "Kamu bisa…" |
| Cerita pembuka (`storyStep`) | 2–3 kalimat, total ≤ 30 kata. Kalimat terakhir berupa pertanyaan | 1–2 kalimat. Mulai dari situasi kerja bila bisa |
| Judul kartu konsep | ≤ 6 kata | ≤ 6 kata |
| Isi kartu konsep | ≤ 40 kata, ≤ 3 kalimat | ≤ 80 kata, ≤ 4 kalimat. ≤ 60 kata bila kartu punya blok kode |
| Batas Analogi (`same`, `different`) | 1 poin di tiap kolom, ≤ 10 kata | 1–2 poin, ≤ 20 kata |
| Instruksi simulasi | 1 kalimat perintah, ≤ 12 kata | 1 kalimat, ≤ 20 kata |
| Cerita soal (`story` di `scenario`) | ≤ 3 kalimat | ≤ 2 kalimat |
| Pertanyaan (`prompt`) | ≤ 2 kalimat. Soal pilihan diakhiri "?" | ≤ 2 kalimat (situasi, lalu pertanyaan). Soal pilihan diakhiri "?" |
| Pilihan jawaban (`label`) | ≤ 8 kata | ≤ 12 kata |
| Penjelasan (`explainCorrect`, `explainWrong`) | ≤ 2 kalimat | ≤ 2 kalimat |
| Petunjuk (`hints`) | ≤ 10 kata | ≤ 15 kata |
| Rangkuman (`recap`) | 1 kalimat, ≤ 12 kata | 1–2 kalimat, total ≤ 20 kata |
| Di tempat kerja (`atWork`) | Tidak ada | 1 kalimat, ≤ 20 kata (§4.1) |
| Teks alternatif gambar (`alt`) | Menyebut apa yang terlihat, ≤ 15 kata | Sama |
| Perkiraan waktu (`estMinutes`) | Dihitung dengan kecepatan baca pemula (§6.7, C34) | Satu angka untuk dua mode |

Batas kata per kalimat (12 dan 20) berlaku untuk semua baris di atas.

**Judul pelajaran.** Judul hanya punya satu teks. Untuk pelajaran yang tampil di Junior, tulis analoginya, bukan nama teorinya. Judul juga tersimpan di `src/content/worldMeta.ts`. Kalau judul berubah, ubah di dua tempat (kirim daftar perubahan judul ke pemegang `worldMeta.ts`).

---

## 6. Aturan per bagian soal

### 6.1 Pertanyaan (`prompt`)

1. **Tanyakan satu hal.** Kalau ada kata "dan" di antara dua hal yang ditanyakan, itu dua soal.
2. **Bentuk tanya langsung, di kedua mode**: "Siapa…?", "Apa…?", "Mana…?", "Mengapa…?". Soal pilihan (`mcq`, `analogy`, `why`, `scenario`, `limit`) selalu diakhiri tanda tanya. Kalimat menggantung yang diakhiri "adalah…", "melambangkan…", atau "berkat prinsip…" dilarang. Itu gaya buku paket, dan pembaca tidak tahu ia sedang ditanya apa.
3. **Situasi dulu, pertanyaan kemudian.** Kalau butuh konteks, tulis satu kalimat situasi, lalu satu kalimat tanya. Untuk `scenario`, situasi masuk ke `story` dan `prompt` hanya berisi pertanyaan.
4. **Tanpa kurung penjelas** di dalam pertanyaan.
5. **Pertanyaan negatif** ("mana yang TIDAK…") hanya untuk Pro, dan hanya di soal tipe `limit`. Junior selalu ditanya dalam bentuk positif.
6. **Perintah untuk soal interaktif** dimulai dengan kata kerja: "Urutkan…", "Kelompokkan…", "Pasangkan…", "Ketuk…".
7. **Jangan menyebut jawabannya** di pertanyaan, dan jangan memakai kata kunci yang hanya ada di pilihan benar.
8. **Bisa dijawab dengan salah satu pilihan, tanpa tafsir bebas.** Ujinya: tutup pilihannya, lalu jawab sendiri. "Matamu jadi bagaimana?" bisa dijawab "capek", jadi pertanyaannya kabur. "Ke mana matamu bergerak?" jelas.
9. **Pelakunya jelas.** Kalau ada dua pihak (browser dan server, tamu dan pelayan), sebut siapa yang melakukan apa, di pertanyaan dan di setiap pilihan.
10. **Tidak menanyakan kepanjangan singkatan**, di mode mana pun (§4 aturan 13).

### 6.2 Pilihan jawaban (`choices`)

1. **Bentuk sejajar.** Semua pilihan memakai pola kalimat yang sama: semuanya kata benda, atau semuanya diawali kata kerja, atau semuanya diawali "Supaya…".
2. **Panjang mirip.** Selisih pilihan terpanjang dan terpendek paling banyak 3 kata (Junior) atau 5 kata (Pro). Jawaban benar tidak boleh menjadi satu-satunya pilihan yang paling panjang atau paling rinci. Di satu dunia, pilihan benar tidak boleh menjadi pilihan terpanjang pada lebih dari 30% soal (C26). Kalau lebih, pembaca cukup menebak dari panjangnya.
3. **Tidak ada bocoran:**
   - Pilihan salah tidak memakai kata mutlak yang mencolok ("selamanya", "semua", "tidak pernah", "langsung memblokir").
   - Pilihan salah tidak diberi sifat buruk yang membuatnya jelas salah ("dengan banyak pembungkus teks", "tanpa cache").
   - Pilihan benar tidak mengulang kata dari pertanyaan kalau pilihan lain tidak.
4. **Pengecoh harus masuk akal.** Setiap pilihan salah adalah **salah paham yang sungguh mungkin terjadi** tentang topik itu. Jangan memakai pilihan konyol dari topik lain ("Koneksi berubah menjadi siaran video", "Roda warna primer" di soal tentang ukuran tombol, "Server meminta client memasak database", `<p>` di soal tentang variabel). Pilihan konyol membuat pembaca menang tanpa berpikir, dan pembaca remaja merasa dihina. Pilihan "biarkan saja" juga bukan pengecoh: tidak ada yang sungguh memilihnya.
5. **Tiga pilihan** untuk Junior. Tiga atau empat untuk Pro.
6. **Tanpa "semua benar" dan "semua salah".**
7. **Soal jangkar** tetap memakai pilihan "Belum tahu" yang ditambahkan otomatis oleh `makeAnchorMcq`.
8. **Istilah di pilihan sudah dikenalkan.** Setiap istilah di pilihan jawaban, yang benar maupun yang salah, sudah muncul di kartu konsep pelajaran itu atau pelajaran sebelumnya. Pengecoh berupa istilah yang belum pernah diajarkan terasa seperti jebakan (C24).
9. **Ikon (`icon`).** Pilihan, butir `sort`, dan wadah `sort` boleh diberi ikon dari daftar tetap di `src/content/icons.ts`. Untuk Junior, **wadah `sort` wajib punya ikon** dan labelnya 1–2 kata (C29). Pilihan yang berupa benda nyata (pelayan, dapur, surat, kunci) sebaiknya diberi ikon, supaya pembaca lambat bisa berpikir dulu, bukan mengeja dulu. Kalau satu pilihan diberi ikon, semua pilihan di soal itu diberi ikon, supaya ikon tidak membocorkan jawaban.

### 6.3 Penjelasan (`explainCorrect`, `explainWrong`)

Panel umpan balik sudah menampilkan judulnya: "Tepat!" untuk jawaban benar, "Belum pas" (Junior) atau "Belum tepat" (Pro) untuk jawaban yang belum benar. "Hampir!" hanya tampil bila sebagian besar butir sudah benar di soal `sort`, `order`, `match`, atau `fill`. Aplikasi yang menentukannya, bukan penulis. Jadi:

1. **Jangan mengawali penjelasan dengan pujian atau vonis**: tanpa "Benar!", "Tepat!", "Betul!", "Hebat!", "Jeli!", "Mantap!", "Hampir!", "Salah".
2. **`explainCorrect` = mengapa benar + satu gambaran konkret.**
   - Kalimat 1: alasannya.
   - Kalimat 2: gambaran yang bisa dibayangkan, biasanya dari analogi pelajaran itu ("Seperti…").
3. **`explainWrong` ditulis untuk setiap pilihan salah**, khusus untuk pilihan itu:
   - Kalimat 1: pilihan itu sebenarnya apa atau mengapa belum pas.
   - Kalimat 2: arahkan kembali ke analogi, tanpa menyebut ID atau huruf pilihan.
   - Jangan mengandalkan teks bawaan `makeMcq` ("Pilihan itu belum pas…"). Teks bawaan hanya jaring pengaman.
4. **Jangan menulis `explainWrong` pada pilihan yang benar.** Teks itu tidak pernah tampil.
5. **Tidak mengulang pertanyaan.** Penjelasan menambah pengertian, bukan mengulang.
6. Nada untuk jawaban salah: tenang dan membantu. Contoh dari PRD: "Dapur tempat memasak. Yang membawa pesanan adalah pelayan."
7. **Soal benar/salah yang jawabannya "salah"**: jangan menulis "Benar, itu keliru!". Vonis ganda membingungkan. Tulis: "Pernyataan itu keliru: GET umumnya tanpa body, karena hanya meminta data."
8. **Penjelasan wajib berisi alasan.** "Keempat komponen terpetakan dengan sempurna" adalah pujian kosong. Sebut satu alasan yang bisa diingat.

### 6.4 Petunjuk (`hints`)

1. **Setiap soal yang tampil di Junior wajib punya `hints[0]`.** Tanpa kecuali, termasuk soal `tf`, `sort`, `order`, `match`, dan `hotspot`.
2. **`hints[0]` mengingatkan pada cerita atau analogi**, tidak mempersempit jawaban: "Ingat siapa yang berjalan dari meja ke dapur."
3. **`hints[1]` (opsional) mempersempit**: menyingkirkan satu pilihan atau menunjuk kata kunci: "Dapur tidak pernah mendatangi meja tamu."
4. **Petunjuk tidak pernah menyebut jawabannya**, dan tidak memakai kata yang hanya ada di pilihan benar.
5. Bentuknya kalimat ajakan atau pertanyaan pendek. Junior ≤ 10 kata.
6. Untuk Pro, petunjuk wajib pada soal dengan `difficulty` 2 dan 3, dan dianjurkan untuk yang lain.
7. Di Junior, aplikasi menawarkan petunjuk saat soal yang belum tepat muncul lagi, tidak memakai hitungan waktu. Jadi `hints[0]` harus tetap berguna bagi anak yang sudah pernah salah di soal itu: tunjuk bagian cerita atau gambar yang perlu dilihat lagi.

### 6.5 Kartu cerita, konsep, dan rangkuman

- **Cerita pembuka** dimulai dari situasi yang dikenal pembaca, bukan dari definisi. Untuk Junior, kalimat terakhirnya berupa **pertanyaan yang dijawab kartu berikutnya**: "Skor permainanmu disimpan di mana, ya?" Untuk Pro, cerita dimulai dari situasi kerja: "Form pesanan di web Toko Rani gagal terkirim. Mengapa?"
- **Kartu konsep**: kalimat pertama berisi inti. Kalimat kedua berisi contoh. Istilah tebal muncul sekali (PRD §11.5). Di Pro, kalimat pertama harus berdiri sendiri, karena di HP ia tampil sebelum blok kode.
- **Rangkuman** bisa diucapkan ulang kepada teman: "Frontend itu ruang makan, backend itu dapur." Ini berlaku untuk Junior dan Pro. Di layar hasil Junior, rangkuman atau `companion.talkPrompts[0]` tampil sebagai ajakan "Ceritakan ke kakak atau temanmu". Jadi tulis `talkPrompts[0]` sebagai satu pertanyaan pendek yang bisa dijawab anak dari pelajaran itu.
- **Tujuan** memakai kata kerja yang bisa diamati: "membedakan", "menyebutkan", "memilih", "mengurutkan". Hindari "memahami" dan "mengerti" untuk Junior, dan "menguraikan" untuk Pro. Junior: "Aku bisa…". Pro: "Kamu bisa…".

### 6.6 Kartu Batas Analogi

- Bawaan `limitStep()` diubah: `riskyAnalogy` menjadi `false` kalau tidak ditulis. **Penulis wajib menuliskannya secara jelas** di setiap `limitStep`.
- Tulis `riskyAnalogy: true` hanya bila anak mudah membawa sifat analogi yang keliru. Sebelas analogi di tabel PRD §5.3 selalu `true`: restoran, lukisan berbingkai, kotak berlabel, air, pelayan, radio, telepon, bel pintu, gelang hologram, kunci valet, satpam.
- Kalau `riskyAnalogy: false`, soal tipe `limit` di pelajaran itu diberi `modes: ['pro']` (lihat §8).
- Di Junior kartu ini berjudul **"Mirip, tetapi berbeda"**. Kata "Batas Analogi" tidak tampil untuk anak.
- Kolom "Bedanya" untuk Junior: satu poin, ≤ 10 kata, tanpa istilah baru. Tulis hal yang bisa dibayangkan: "Pelayan melayani 1 meja. API melayani 1.000 aplikasi."
- Soal `limit` yang tampil di Junior ditulis dalam bentuk positif dan konkret. Tanyakan apa yang terjadi, bukan "apa bedanya dengan…".

### 6.7 Urutan langkah: baca, lalu kerjakan

Pemutar pelajaran sekarang mengikuti urutan `steps` yang kamu tulis, termasuk letak soal. Soal yang diletakkan di antara kartu tampil sebagai "Cek cepat". Sebelumnya semua soal ditarik ke akhir, sehingga pembaca menekan "Lanjut" lima kali sebelum melakukan apa pun.

1. **Paling banyak 2 kartu baca berturut-turut** (cerita, konsep, Batas Analogi) di tiap mode. Sesudah itu harus ada soal atau simulasi (C25). Hitung per mode: kartu `modes: ['pro']` tidak dihitung untuk Junior.
2. **Pindahkan satu soal yang sudah ada** ke belakang kartu yang diujinya. Tidak perlu menulis soal baru untuk ini. ID soal tidak berubah.
3. **Cek cepat hanya menanyakan hal yang sudah tampil.** Soal itu harus bisa dijawab dari kartu-kartu sebelum letaknya.
4. **Simulasi paling lambat di urutan ketiga** bila pelajaran punya simulasi.
5. **Pola yang dianjurkan:** cerita, konsep 1, cek cepat, konsep 2, simulasi, lalu soal penutup.
6. **Takaran Junior:** paling banyak 2 kartu konsep dan 4–5 soal yang tampil di Junior. Kalau ada kartu konsep ketiga yang tidak dipakai soal Junior, beri kartu itu `modes: ['pro']`. Lebih dari takaran ini memunculkan peringatan C32, bukan galat, karena beberapa pelajaran memang butuh ide ketiga.
7. **`estMinutes` dihitung jujur** dengan kecepatan baca pemula (C34). Anak yang dijanjikan "± 5 menit" lalu butuh 15 menit tidak mau mulai lagi.

---

## 7. Potongan kode (`rCode`) di dalam teks Junior

### 7.1 Mengapa teks Junior bisa rusak

Isi kartu ditulis sebagai deretan potongan. `rText(junior, pro)` punya dua versi, tetapi `rCode(v)` hanya punya satu dan tampil di kedua mode. Kalau kalimat Junior ditulis utuh di potongan pertama, potongan kode dan kata sambung Pro di belakangnya tetap ikut tampil di Junior.

### 7.2 Aturannya

1. **Teks Junior harus berupa kalimat utuh yang berdiri sendiri.** Jangan pernah menyambung kalimat Junior melewati potongan kode.
2. **Tulis Junior dan Pro sebagai dua jalur terpisah** memakai pembantu baru (tersedia setelah Paket 0 masuk):
   - `rJunior('…')`: potongan yang hanya tampil di Junior.
   - `rPro('…')`: potongan yang hanya tampil di Pro.
   - `rCode('…', ['pro'])`: potongan kode yang hanya tampil di Pro.
   - `rCode('…')` tanpa argumen kedua tetap tampil di dua mode. Pakai ini hanya untuk "satu tag pendek sebagai gambar" (§3.4).
3. **Urutan penulisan**: jalur Junior dulu (biasanya satu `rJunior`), lalu jalur Pro.
4. **`rTerm` dan `rBold`** boleh dipakai di kedua jalur. Kalau istilahnya hanya untuk satu mode, bungkus kalimatnya dengan pola di atas dan tulis istilah itu sebagai teks biasa di jalur lainnya.
5. **Uji baca**: gabungkan semua potongan yang tampil di Junior, lalu baca keras-keras. Kalau ada kata sambung yang menggantung, titik ganda, atau kode yang menempel, perbaiki.

### 7.3 Pola yang benar

```ts
body: [
  // jalur Junior: satu kalimat utuh, tanpa kode
  rJunior('Belum bisa membuktikan siapa kamu? Penjaga gerbang menjawab 401. Sudah masuk, tetapi kamar itu terlarang? Jawabannya 403.'),
  // jalur Pro: boleh diselingi kode
  rPro('Gagal autentikasi dibalas status '),
  rCode('401 Unauthorized', ['pro']),
  rPro('. Sudah login tetapi tidak punya izin dibalas '),
  rCode('403 Forbidden', ['pro']),
  rPro('.'),
],
```

---

## 8. Kapan soal diberi `modes: ['pro']`

Beri `modes: ['pro']` bila **salah satu** hal ini benar:

1. Tipe soalnya `spotbug`, `fill`, atau `type`. Selalu.
2. Tipe soalnya `why` dan `base`-nya berisi kode atau istilah teknis. (`base` hanya punya satu teks untuk dua mode.)
3. Pertanyaan, pilihan, atau gambar soalnya memuat kode, tag, nama properti, nama header, atau potongan respons HTTP. Ini termasuk soal `hotspot` yang gambarnya berupa kode atau respons HTTP.
4. Soalnya menanyakan angka teknis: rasio kontras, heks warna, piksel, milidetik, kode status selain yang dikenalkan dengan analogi di pelajaran itu, versi protokol.
5. Jawabannya adalah nama hukum, teori, pola, atau singkatan.
6. Soalnya memakai istilah yang tidak dikenalkan di jalur Junior pelajaran itu atau pelajaran Junior sebelumnya.
7. Soalnya bertipe `limit` dan `limitStep` pelajaran itu `riskyAnalogy: false`.
8. Soalnya membandingkan dua teknologi berdasarkan untung-ruginya (misalnya REST melawan GraphQL untuk kasus tertentu).

**Setelah soal dipindah ke Pro, cek jumlah soal Junior.** Setiap pelajaran Junior harus tetap punya **minimal 4 soal** yang tampil di Junior (PRD §5.1), dan sebaiknya tidak lebih dari 5 (§6.7). Kalau kurang, tulis soal pengganti dengan `modes: ['junior']`:

- Pakai tipe tanpa kode: `mcq`, `analogy`, `tf`, `scenario`, `sort`, `order`, `match`.
- Tanyakan ide yang sama lewat analogi pelajaran itu.
- Beri `hints[0]`.
- Tingkat kesulitan naik dari soal 1 ke soal 4.

Soal yang tampil di dua mode boleh tetap satu soal, asal teks Junior dan Pro ditulis terpisah: `t('teks Junior', 'teks Pro')`.

**Aturan `t()` satu argumen.** `t('satu teks')` menyalin teks ke dua mode. Itu hanya boleh bila teksnya memenuhi **semua** aturan Junior dan tetap wajar dibaca Pro, misalnya label pendek "Frontend" atau "Benar". Untuk pertanyaan, penjelasan, dan cerita, selalu tulis dua argumen.

---

## 9. Daftar ganti kata

Kata di kolom kiri tidak boleh muncul di teks Junior, kecuali ia adalah salah satu dari dua istilah baru pelajaran itu dan ditulis sebagai `rTerm` dengan artinya. Daftar §9.2, §9.3, dan §9.4 berlaku juga untuk teks Pro.

### 9.1 Istilah teknis

| Hindari | Ganti dengan |
|---|---|
| request | pesanan, permintaan |
| response, respons | jawaban, balasan |
| client | aplikasi di HP-mu, tamu |
| endpoint | alamat loket, pintu layanan |
| database | gudang data |
| autentikasi | membuktikan siapa kamu |
| otorisasi | izin: boleh atau tidak |
| enkripsi | pesan dikunci |
| protokol | aturan bersama |
| parameter, query | catatan tambahan |
| header | catatan di amplop |
| body, payload | isi paket |
| kode status | angka jawaban |
| rate limit | batas jumlah permintaan |
| token | tanda masuk |
| cache | simpanan sementara |
| timeout | waktu tunggu habis |
| render | menampilkan |
| deploy | memasang ke internet |
| DOM | isi halaman |
| over-fetching, under-fetching | data kebanyakan, data kurang |
| microservice, layanan internal | bagian-bagian dapur yang saling membantu |
| rasio kontras, 4,5 : 1 | beda terang dan gelapnya cukup |
| kode heks (`#FFB400`) | nama warna: oranye terang |
| piksel, px | ukuran: sebesar ujung jari |
| milidetik, 0,4 detik | sekejap, kurang dari setengah detik |
| HTTP/1.1, HTTP/2 | (jangan disebut) |
| Doherty Threshold | aturan "jangan membuat orang menunggu" |
| Fitts's Law | aturan "tombol besar dan dekat" |
| Continuity, Closure, Figure–ground | mata mengikuti garis, otak melengkapi bentuk, depan dan latar |
| Proximity, Alignment | yang dekat dianggap sekelompok, lurus sejajar |
| server (sebelum dikenalkan) | dapur, penjaga, komputer yang melayani |
| browser (sebelum dikenalkan) | aplikasi pembuka web |
| API, frontend, backend (sebelum dikenalkan) | pelayan, ruang makan, dapur |
| website | situs, halaman web |
| data (bila bisa lebih konkret) | isi, catatan, daftar |
| paket data | pesan, kiriman. Bagi anak, "paket data" berarti kuota HP |
| long polling, WebSocket, SSE | analoginya: menelepon lalu menunggu, sambungan telepon, siaran radio |
| 401, 403, 404, 429 (di luar pelajaran yang mengajarkannya) | pintu terkunci, dilarang masuk, tidak ketemu, tunggu dulu |

Kata bertanda "(sebelum dikenalkan)" boleh dipakai di pelajaran yang mengenalkannya dan di pelajaran sesudahnya (§3.2 aturan 7).

### 9.2 Kata baku yang terlalu berat

Gantinya tetap kata baku, hanya lebih pendek dan lebih akrab. Daftar ini berlaku untuk Junior dan Pro.

| Hindari | Ganti dengan |
|---|---|
| pengguna | kamu, orang yang memakai |
| antarmuka | tampilan |
| interaksi | saat kamu mengetuk atau menggeser |
| paralel, simultan | bersamaan |
| mayoritas | kebanyakan |
| drastis, signifikan | sangat, jauh lebih |
| destruktif | berbahaya, bisa menghapus |
| mengaburkan | membuat tidak jelas |
| memandu | menuntun |
| penerapan | contoh |
| sehingga | jadi |
| apabila, jika | kalau |
| sedangkan, namun, melainkan | tetapi, atau pecah jadi dua kalimat |
| manakah, apakah yang | mana, apa |
| dikarenakan, oleh karena itu | karena, jadi |
| merupakan, adalah (di tengah kalimat panjang) | itu |
| tersebut | itu |
| berdasarkan, menurut | (buang, tulis langsung isinya) |
| melambangkan, mewakili | itu seperti, namanya apa |
| beserta | dan |
| berikut, berikut ini | ini |
| mengolah | memasak, menghitung, mengerjakan |
| perantara | penghubung, pengantar |
| nyata | sungguhan |
| ribuan | sangat banyak, 1.000 |
| kategori | kelompok |
| cerdas, efisien | bagus, hemat |
| menuntaskan | menyelesaikan |

### 9.3 Kata buku teks (terutama di teks Pro)

Kata di kolom kiri membuat pemula dewasa merasa bodoh, padahal idenya sederhana. Kata itu hanya boleh bila ia istilah yang dikenalkan di pelajaran itu.

| Hindari | Ganti dengan |
|---|---|
| anatomi | bagian-bagian |
| menguraikan | menyebutkan, menjelaskan |
| metadata | keterangan |
| muatan, payload (sebelum dikenalkan) | isi data |
| entitas | benda, data |
| implementasi | cara membuat |
| tersusun atas, tersusun dari | berisi |
| berkinerja tinggi | cepat |
| alih-alih | bukan |
| memicu | menyebabkan, memulai |
| terpetakan, terdefinisi | (buang, tulis langsung isinya) |

### 9.4 Kata cakapan

Kata ragam cakap atau terlalu santai untuk teks pelajaran. Tidak dipakai di pertanyaan, pilihan, penjelasan, petunjuk, kartu, atau rangkuman, di kedua mode. Boleh hanya di dalam ucapan tokoh yang diberi tanda kutip.

| Hindari | Ganti dengan |
|---|---|
| tapi | tetapi |
| cuma | hanya |
| gampang | mudah |
| bikin | membuat |
| nggak, gak, enggak | tidak |
| gimana | bagaimana |
| kenapa | mengapa |
| enaknya | untungnya |
| banget | sangat |
| kayak | seperti |
| udah | sudah |
| aja | saja |
| ngobrol | mengobrol |

"Kalau" adalah kata baku dan boleh dipakai.

---

## 10. Contoh sebelum dan sesudah (dari konten yang ada)

Jalur file di bawah relatif terhadap `src/content/worlds/`. Contoh 1–10 dan 13–16 terutama tentang Junior. Contoh 11, 12, dan 17–20 tentang Pro.

### Contoh 1 — Teks Junior rusak karena potongan kode

`b07-gerbang-login/index.ts:282-291`

**Sebelum** (yang tampil di Junior):
> Jika gagal membuktikan diri, server memberi kode 401. Jika sudah masuk tetapi dilarang masuk kamar lain, kodenya 403.`401 Unauthorized`, sedangkan lolos login tetapi tidak memiliki izin dibalas `403 Forbidden`.

**Sesudah:**

```ts
body: [
  rJunior('Belum bisa membuktikan siapa kamu? Penjaga gerbang menjawab 401. Sudah masuk, tetapi kamar itu terlarang? Jawabannya 403.'),
  rPro('Gagal autentikasi dibalas status '),
  rCode('401 Unauthorized', ['pro']),
  rPro('. Sudah login tetapi tidak punya izin dibalas '),
  rCode('403 Forbidden', ['pro']),
  rPro('.'),
],
```

Mengapa lebih baik: Junior mendapat empat kalimat pendek yang utuh (5, 4, 6, dan 2 kata). Pro mendapat dua kalimat dengan kode. Kata "server" diganti "penjaga gerbang", analogi dunia itu. Angka 401 dan 403 boleh muncul karena kartu ini memang mengajarkannya (§3.2 aturan 8).

### Contoh 2 — Teks Junior rusak dan angkanya tidak cocok

`b08-satpam-api/index.ts:494-505`

**Sebelum** (yang tampil di Junior):
> Jika melebihi batas, server menjawab dengan kode 429. Ada pesan kapan boleh mencoba lagi, seperti 20 menit lagi.`429 Too Many Requests` bersama header `RateLimit-Remaining: 0` dan `Retry-After`.

Selain rusak, teks Junior menyebut "20 menit" padahal contoh kodenya `Retry-After: 30`.

**Sesudah:**

```ts
body: [
  rJunior('Kamu meminta terlalu sering? Satpam menjawab 429. Artinya: tunggu dulu, lalu coba lagi.'),
  rPro('Saat jatah habis, server membalas '),
  rCode('429 Too Many Requests', ['pro']),
  rPro('. Header '),
  rCode('Retry-After', ['pro']),
  rPro(' memberi tahu berapa detik client harus menunggu.'),
],
```

Teks Junior memakai "satpam", analogi dunia itu, bukan "server". Angka 429 muncul karena kartu ini yang mengajarkannya.

### Contoh 3 — Nama teori di soal Junior

`a07-galeri-desain/index.ts:1592` (soal `tf`, teks sama untuk dua mode, 17 kata)

**Sebelum:**
> Menurut Doherty Threshold, respons aplikasi di bawah 0,4 detik membuat pengguna merasa lancar dan tetap fokus.

**Sesudah:**

```ts
prompt: t(
  'Aplikasi yang menjawab dalam sekejap terasa lancar.',
  'Menurut Doherty Threshold, respons di bawah 0,4 detik membuat interaksi terasa lancar.',
),
explainCorrect: t(
  'Kalau tombol langsung menjawab, kamu tidak sempat bosan. Seperti teman yang langsung membalas saat diajak mengobrol.',
  'Di bawah 0,4 detik, jeda nyaris tidak terasa. Perhatian pengguna tidak terputus.',
),
explainWrong: t(
  'Menunggu lama terasa macet. Jawaban yang cepat terasa lancar.',
  'Jeda panjang justru memutus fokus. Batas terasa lancar sekitar 0,4 detik.',
),
hints: [t('Ingat teman yang diam 5 detik sebelum menjawab.')],
```

### Contoh 4 — Pilihan jawaban berupa nama teori, pengecoh konyol

`a07-galeri-desain/index.ts:1570` (pilihan: "Fitts's Law", "Doherty Threshold", "Roda warna primer")

**Sebelum:**
> Tombol besar yang diletakkan di bagian bawah layar HP sehingga mudah dijangkau ibu jari adalah penerapan…

**Sesudah (Junior):**

| Bagian | Teks |
|---|---|
| Pertanyaan | Tombol Bayar dibuat besar dan dekat jempol. Mengapa? |
| Pilihan benar | Supaya mudah diketuk |
| Pilihan salah 1 | Supaya tampak lebih bagus |
| Pilihan salah 2 | Supaya muat banyak tulisan |
| Penjelasan benar | Tombol yang besar dan dekat lebih mudah diketuk. Seperti gawang lebar yang mudah dibobol dari dekat. |
| Penjelasan "bagus" | Tombol besar memang mencolok. Tujuannya supaya jarimu tidak meleset. |
| Penjelasan "tulisan" | Tulisan di tombol itu pendek. Ukurannya dibuat besar untuk jarimu. |
| Petunjuk | Ingat gawang lebar dan gawang mini. |

**Sesudah (Pro):** pertanyaan menjadi tanya langsung: "Hukum UX mana yang diterapkan tombol besar di bagian bawah layar HP, dekat ibu jari?". Pengecoh "Roda warna primer" diganti dengan hukum UX lain yang sudah dipelajari di dunia itu.

Mengapa lebih baik: Junior ditanya idenya, bukan namanya. Ketiga pilihan sejajar ("Supaya…") dan panjangnya 3–4 kata. Dua pilihan salah adalah salah paham yang sungguh mungkin: mengira ukuran itu soal hiasan atau soal isi tulisan. Pilihan lama "Supaya terlihat mahal" terasa seperti soal untuk anak yang jauh lebih kecil.

### Contoh 5 — Angka teknis dan pilihan benar yang paling panjang

`a08-studio-warna-huruf/index.ts:1698-1702` (soal `scenario`)

**Sebelum:**
> Cerita: Sari membuat tombol "Daftar Sekarang" berwarna oranye terang (#FFB400) dengan tulisan putih (#FFFFFF). Saat dicek dengan Contrast Checker, rasionya hanya 1,8 : 1.
> Pertanyaan: Perubahan tercepat agar tombol tetap bernuansa hangat tetapi lolos standar 4,5 : 1 adalah…
> Pilihan benar (20 kata): Ubah tulisan tombol menjadi gelap pekat (#1F2340) atau gelapkan warna latar oranyenya menjadi cokelat-oranye tua

**Sesudah:**

| Bagian | Junior | Pro |
|---|---|---|
| Cerita | Sari membuat tombol oranye terang. Tulisannya putih. Tulisan itu sulit dibaca. | Sari membuat tombol "Daftar Sekarang" oranye terang (`#FFB400`) dengan teks putih. Contrast checker menunjukkan rasio 1,8 : 1. |
| Pertanyaan | Apa cara tercepat supaya tulisannya terbaca? | Perubahan tercepat mana yang membuat tombol tetap hangat dan lolos rasio 4,5 : 1? |
| Pilihan benar | Ganti tulisan menjadi warna gelap | Ganti teks menjadi warna gelap |
| Pilihan salah 1 | Besarkan ukuran tulisannya saja | Besarkan teks menjadi 24 px |
| Pilihan salah 2 | Ganti tombol menjadi kuning muda | Ganti latar menjadi kuning muda |
| Penjelasan benar | Tulisan gelap di atas warna terang mudah dibaca. Seperti spidol hitam di kertas kuning. | Teks gelap di atas oranye terang menaikkan rasio kontras jauh di atas 4,5 : 1 tanpa mengubah warna tombol. |
| Petunjuk | Ingat: tulisan harus beda jelas dari latarnya. | Yang diubah cukup satu: warna teks atau warna latar. |

Mengapa lebih baik: pengecoh lama ("Biarkan saja seperti itu", "Biarkan, karena oranye sedang tren") tidak akan dipilih siapa pun. Pengecoh baru adalah salah paham yang nyata: mengira tulisan yang lebih besar atau warna yang lebih muda menyelesaikan masalah kontras. Pertanyaan Pro tidak lagi menggantung.

### Contoh 6 — Istilah bertumpuk di soal yang dilihat Junior

`b04-peta-jenis-api/index.ts:998-1002` (pelajaran "GraphQL: pelayan pribadi", tampil di Junior)

**Sebelum:**
> Cerita: Di aplikasi HP Toko Rani, layar profil hanya butuh nama pengguna, foto, dan 3 judul pesanan terakhir. Dengan REST lama, aplikasi harus menembak 2 endpoint berbeda dan menerima 30 kolom tak terpakai.
> Pertanyaan: Dua masalah apakah yang langsung teratasi jika tim beralih ke satu query GraphQL?
> Pilihan: "Over-fetching dan under-fetching sekaligus" · "Kesalahan warna kontras dan ukuran font" · "Kesalahan ejaan alamat domain"

**Sesudah:**

| Bagian | Junior | Pro |
|---|---|---|
| Cerita | Kamu hanya mau nasi dan telur. Pelayan biasa membawa satu nampan penuh. Banyak yang tidak kamu makan. | Layar profil Toko Rani hanya butuh nama, foto, dan 3 judul pesanan terakhir. Dengan REST, aplikasi memanggil 2 endpoint dan menerima 30 kolom yang tidak dipakai. |
| Pertanyaan | Apa untungnya punya pelayan pribadi? | Dua masalah apa yang teratasi dengan satu query GraphQL? |
| Pilihan benar | Kamu dapat persis yang kamu minta | Over-fetching dan under-fetching sekaligus |
| Pilihan salah 1 | Kamu dapat semua menu sekaligus | Over-fetching saja |
| Pilihan salah 2 | Kamu tidak perlu memesan lagi | Under-fetching saja |
| Penjelasan benar | Pelayan pribadi hanya membawa yang kamu sebut. Tidak lebih, tidak kurang. | Satu query meminta tepat kolom yang dibutuhkan dari beberapa sumber sekaligus. Data berlebih dan request tambahan sama-sama hilang. |
| Petunjuk | Ingat nampan penuh yang tidak habis dimakan. | Hitung jumlah request dan jumlah kolom yang terpakai. |

Mengapa lebih baik: pengecoh lama berasal dari topik lain (warna, DNS), jadi jawabannya bisa ditebak tanpa belajar. Pengecoh baru adalah salah paham yang sungguh mungkin: mengira GraphQL hanya menyelesaikan satu dari dua masalah itu.

### Contoh 7 — Soal kode di pelajaran Junior

`a12-benteng-keamanan/index.ts:644-646` (soal `spotbug`, tampil di Junior)

**Sebelum:**
> Ketuk baris JavaScript yang membuka celah XSS saat menampilkan komentar pengunjung ke DOM:
> (diikuti lima baris kode JavaScript)

**Sesudah:** soal lama diberi `modes: ['pro']`. Junior mendapat soal pengganti tanpa kode, memakai analogi pelajaran itu (papan pengumuman):

```ts
qStep(
  makeMcq({
    id: 'a12-l02-q2j',
    type: 'scenario',
    modes: ['junior'],
    story: t('Di kelas ada papan pengumuman. Siapa saja boleh menempel kertas. Pak Udin menjaga papan itu.'),
    prompt: t('Apa tugas Pak Udin?'),
    choices: [
      { id: 'cek', label: t('Memeriksa setiap kertas dulu') },
      { id: 'tempel', label: t('Menempel kertas tanpa memeriksa'),
        explainWrong: t('Kalau langsung ditempel, tulisan jahat bisa ikut terpasang. Kertas perlu diperiksa dulu.') },
      { id: 'copot', label: t('Mencopot papan dari kelas'),
        explainWrong: t('Papan tetap berguna untuk kelas. Yang perlu dijaga adalah isinya.') },
    ],
    answer: 'cek',
    explainCorrect: t('Kertas diperiksa supaya tidak ada tulisan jahat. Komentar di halaman web juga begitu.'),
    hints: [t('Ingat papan pengumuman yang tidak disaring.')],
    tags: ['xss'],
  }),
),
```

Ketiga pilihan diawali kata kerja, panjangnya 4 kata, dan tidak ada kata mutlak seperti "selamanya" atau "semua". Cerita menyebut Pak Udin lebih dulu, jadi pertanyaan "Apa tugas Pak Udin?" punya pelaku yang jelas. Kata "website" diganti "halaman web".

### Contoh 8 — Pertanyaan panjang dengan kurung, pengecoh mutlak

`b05-menara-realtime/index.ts:541-546` (soal `limit`, 25 kata)

**Sebelum:**
> Apa yang terjadi pada koneksi HTTP Long Polling apabila dalam waktu lama tidak ada pesan baru sama sekali (tidak seperti telepon yang bisa diam berjam-jam)?
> Pilihan: "Batas waktu (timeout) tercapai sehingga server menjawab kosong dan client langsung membuka request baru" · "Server langsung memblokir akun pengguna selamanya" · "Koneksi otomatis berubah menjadi siaran video"

**Sesudah:**

| Bagian | Junior | Pro |
|---|---|---|
| Pertanyaan | Bito menunggu kabar, tetapi lama tidak ada kabar. Apa yang Bito lakukan? | Pada long polling, apa yang terjadi jika lama tidak ada pesan baru? |
| Pilihan benar | Bito menutup telepon, lalu bertanya lagi | Timeout: server menjawab kosong, client mengirim request baru |
| Pilihan salah 1 | Bito menunggu terus tanpa batas waktu | Server membiarkan koneksi terbuka tanpa batas waktu |
| Pilihan salah 2 | Bito menutup telepon dan berhenti bertanya | Server menutup koneksi, client berhenti bertanya |
| Penjelasan benar | Di web, menunggu ada batas waktunya. Bito menutup sambungan, lalu bertanya lagi. | HTTP punya batas waktu. Siklus "timeout, lalu request baru" adalah bagian normal long polling. |
| Petunjuk | Ingat: telepon di web tidak bisa ditahan terus. | Ingat sifat HTTP: setiap request harus dijawab. |

Mengapa lebih baik: versi Junior tidak lagi memakai istilah "long polling", kalimat tanyanya utuh, dan setiap pilihan diawali pelakunya ("Bito…"). Di versi lama, "Sambungan ditutup, lalu bertanya lagi" membuat sambungan seolah-olah yang bertanya. Di versi Pro, setiap pilihan juga menyebut siapa yang berbuat: server atau client.

### Contoh 9 — Kalimat menggantung dengan istilah Inggris sebagai jawaban

`a07-galeri-desain/index.ts:1182` (pilihan: "Continuity", "Closure", "Figure–ground")

**Sebelum:**
> Deretan angka langkah "1 — 2 — 3 — 4" yang dihubungkan garis mendatar memandu mata menyusuri langkah dari kiri ke kanan berkat prinsip…

**Sesudah (Junior):**

| Bagian | Teks |
|---|---|
| Pertanyaan | Angka 1 sampai 4 disambung satu garis. Ke mana matamu bergerak? |
| Pilihan benar | Mengikuti garis dari kiri ke kanan |
| Pilihan salah 1 | Melompat acak ke angka mana saja |
| Pilihan salah 2 | Berhenti di angka pertama saja |
| Penjelasan benar | Mata suka mengikuti garis. Seperti mengikuti jalan setapak di taman. |
| Petunjuk | Bayangkan jalan setapak yang menyambung. |

**Sesudah (Pro):** "Langkah "1 — 2 — 3 — 4" dihubungkan garis mendatar. Prinsip mana yang membuat mata mengikuti urutannya?" dengan pilihan yang sama seperti sekarang.

Mengapa lebih baik: "Matamu jadi bagaimana?" bisa dijawab "capek". "Ke mana matamu bergerak?" hanya bisa dijawab dengan arah, dan arah itulah isi pilihannya (§6.1 aturan 8).

### Contoh 10 — Penjelasan yang tidak pernah tampil

`a01-kota-web/index.ts:49` dan `:61`

**Sebelum:**

```ts
{ id: 'fe', label: t('Frontend (ruang makan)'), explainWrong: t('Benar, frontend adalah bagian yang tampil.') },
// ...
{ id: 'ux', label: t('UX (pengalaman pakainya)'), explainWrong: t('Tepat.') },
```

`fe` dan `ux` adalah jawaban benar. `explainWrong` pada jawaban benar tidak pernah tampil.

**Sesudah:** hapus `explainWrong` dari pilihan benar. Pastikan setiap pilihan salah punya penjelasan khusus dua kalimat:

```ts
{ id: 'fe', label: t('Frontend (ruang makan)') },
{ id: 'be', label: t('Backend (dapur tertutup)'),
  explainWrong: t('Dapur bekerja di belakang. Tamu tidak bisa melihatnya.') },
```

### Contoh 11 — Pro: istilah bertumpuk dalam dua kalimat

`b04-peta-jenis-api/index.ts:1079` (pelajaran khusus Pro)

**Sebelum:**
> gRPC adalah kerangka RPC (Remote Procedure Call) berkinerja tinggi buatan Google. Alih-alih JSON lewat HTTP/1.1, gRPC memakai HTTP/2 dan format biner Protobuf agar ukuran pesan mungil dan sangat cepat.

Enam istilah teknis dalam dua kalimat: RPC, JSON, HTTP/1.1, HTTP/2, biner, Protobuf.

**Sesudah:**
> **gRPC** adalah cara satu server memanggil fungsi di server lain (RPC, Remote Procedure Call). Pesannya dikirim dalam format biner **Protobuf**, jadi lebih kecil daripada JSON. gRPC berjalan di atas HTTP/2.

Satu istilah baru per kalimat, masing-masing dengan artinya.

### Contoh 12 — Pro: pilihan salah diberi sifat buruk

`b10-puncak-petualang/index.ts:149-153`

**Sebelum:**
> Tim backend membangun layanan internal berkecepatan tinggi antar server microservice. Pilihan API yang paling efisien adalah…
> Pilihan: "gRPC dengan kontrak .proto dan Protobuf biner" · "SOAP XML dengan banyak pembungkus teks" · "Polling HTTP/1.1 tanpa cache"

Dua pilihan salah sudah dijelek-jelekkan di teksnya, jadi jawabannya terbaca tanpa perlu paham.

**Sesudah:**
> Dua layanan internal saling memanggil ribuan kali per detik. Jenis API mana yang paling efisien?
> Pilihan: "gRPC" · "SOAP" · "REST dengan polling"

Alasannya dipindah ke penjelasan: "gRPC mengirim pesan biner lewat HTTP/2, jadi paling ringan untuk komunikasi antar server."

### Contoh 13 — Judul pelajaran Junior berisi nama teori

`a07-galeri-desain/index.ts:1495`

**Sebelum:** `title: 'Hukum gerak: Fitts dan Doherty'`

**Sesudah:** `title: 'Tombol besar, jawaban cepat'` (ubah juga di `worldMeta.ts`).

### Contoh 14 — Soal benar/salah yang terlalu panjang

`a07-galeri-desain/index.ts:622` (24 kata)

**Sebelum:**
> Jika jarak antara label ke kotak di atasnya dan kotak di bawahnya persis sama rata, pengguna akan cepat bingung label itu milik kotak mana.

**Sesudah:**

```ts
prompt: t(
  'Label sama jauhnya ke dua kotak. Kamu jadi bingung label itu milik siapa.',
  'Jika jarak label ke kotak di atas dan di bawahnya sama, pengguna bingung label itu milik kotak mana.',
),
hints: [t('Ingat: yang dekat dianggap satu kelompok.')],
```

### Contoh 15 — Junior: kalimat menggantung dan kata berat

`b01-restoran-api/index.ts:280`

**Sebelum:**
> Di cerita restoran, pelayan beserta buku menunya melambangkan…

"Beserta" dan "melambangkan" tidak dipakai anak, dan kalimatnya tidak bertanya apa-apa.

**Sesudah:**

```ts
prompt: t(
  'Pelayan membawa pesananmu ke dapur. Di web, pelayan itu namanya apa?',
  'Dalam analogi restoran, pelayan dan buku menunya mewakili apa?',
),
hints: [t('Ingat siapa yang berjalan dari meja ke dapur.')],
```

### Contoh 16 — Junior: soal berkode dan pengecoh yang jelas salah

`a04-pabrik-js/index.ts:272-281`

**Sebelum** (tampil di Junior):
> Untuk menyimpan skor pemain yang terus bertambah setiap level, kata kunci terbaik adalah…
> Pilihan: `let` · `const` · `<p>`

Pilihannya berupa kode, pertanyaannya menggantung, dan `<p>` jelas salah sehingga tidak ada yang perlu dipikirkan.

**Sesudah:**

| Bagian | Junior | Pro |
|---|---|---|
| Pertanyaan | Skor permainanmu bertambah terus. Kotak mana yang cocok untuk menyimpannya? | Skor pemain bertambah setiap level. Kata kunci mana yang dipakai untuk menyimpannya? |
| Pilihan benar | Kotak yang isinya bisa diganti | `let` |
| Pilihan salah 1 | Kotak yang isinya terkunci | `const` |
| Pilihan salah 2 | Kotak yang tidak berlabel | Tanpa kata kunci, langsung `skor = 0` |
| Penjelasan benar | Skor berubah terus, jadi isi kotaknya harus bisa diganti. Seperti papan skor yang angkanya ditulis ulang. | `let` membuat variabel yang nilainya boleh diganti. Skor diisi ulang setiap level. |
| Petunjuk | Ingat papan skor yang angkanya terus diganti. | Lihat lagi beda `let` dan `const`. |

Soal `tf` berikutnya di pelajaran itu ("Jika menulis const nama = "Bito"; lalu menulis nama = "Raka";, …") berisi kode, jadi diberi `modes: ['pro']`. Junior yang ingin kode sungguhan mendapatkannya lewat Tantangan Kode setelah ★★★ (§3.4).

### Contoh 17 — Pro: soal hafalan singkatan

`b01-restoran-api/index.ts:376` dan `:819`

**Sebelum:**
> Tuliskan kepanjangan lengkap dari singkatan API dalam bahasa Inggris!
> Ketik singkatan dari "Software Development Kit" yang membungkus API agar lebih mudah dipanggil:

Soal pertama menguji hafalan. Soal kedua menyebut jawabannya di pertanyaan.

**Sesudah:** kedua soal diganti dengan soal tentang gunanya.

> Tim aplikasi HP ingin memakai API pembayaran tanpa menulis request HTTP sendiri. Apa yang mereka pasang?
> Pilihan: "SDK dari penyedia pembayaran" · "Dokumentasi API pembayaran" · "Endpoint baru di server sendiri"

Penjelasan benar: "SDK berisi fungsi siap panggil yang membungkus request ke API. Tim cukup memanggil fungsinya."

### Contoh 18 — Pro: pengecoh konyol

`b01-restoran-api/index.ts:126`, `:159-163`, `:791`

**Sebelum:**
> Hubungan paling akurat antara API dan SDK adalah…
> Pilihan salah di dunia ini: "SDK hanya berisi file gaya CSS" · "SDK membuat internet bekerja tanpa DNS" · "Server mengirim request ke client agar client memasak database"

Pengecoh yang mustahil bisa dicoret tanpa paham. Pembaca remaja merasa aplikasinya dibuat untuk anak kecil.

**Sesudah:**
> Apa hubungan API dan SDK?
> Pilihan: "SDK membungkus API agar mudah dipanggil" · "SDK adalah nama lain untuk API" · "API dibuat dari kumpulan SDK"

Ketiga pilihan sama pola dan hampir sama panjang (6, 6, dan 5 kata). Dua pilihan salah adalah kekeliruan yang sering terjadi pada pemula: menganggap keduanya sama, atau membalik hubungannya.

### Contoh 19 — Pro: vonis ganda dan pujian kosong

`b02-kantor-pos-http/index.ts:321` dan `:313`

**Sebelum:**
> Benar, itu keliru! Permintaan GET umumnya tidak membawa body karena hanya meminta data.
> Mantap! Keempat komponen HTTP request kini terpetakan dengan sempurna.

"Benar, itu keliru!" memuat dua vonis sekaligus. Penjelasan kedua tidak berisi alasan sama sekali.

**Sesudah:**
> Pernyataan itu keliru: GET umumnya tanpa body, karena hanya meminta data.
> Baris pembuka menyebut method dan alamat. Header membawa keterangan, body membawa isi data.

### Contoh 20 — Pro: tujuan, cerita, dan rangkuman bergaya buku teks

`b02-kantor-pos-http/index.ts:195`, `:206`, `:415`

**Sebelum:**
> Tujuan: Aku bisa menguraikan anatomi lengkap sebuah HTTP request dan HTTP response.
> Cerita: Hampir seluruh Web API berkomunikasi menggunakan HTTP. Membaca pesan HTTP seperti membaca surat pesanan resmi yang tersusun atas baris pembuka, amplop keterangan, dan isi paket.
> Rangkuman: HTTP request dan response masing-masing tersusun rapi dari baris pembuka, header metadata, serta body payload.

"Menguraikan anatomi", "tersusun atas", "header metadata", "body payload": tiga istilah Inggris dalam satu kalimat, dan "payload" tidak pernah dikenalkan. Ceritanya dibuka dengan definisi dan memakai tiga perumpamaan sekaligus.

**Sesudah (Pro):**

| Bagian | Teks |
|---|---|
| Tujuan | Kamu bisa menyebutkan bagian-bagian HTTP request dan response. |
| Cerita | Form pesanan di web Toko Rani gagal terkirim. Untuk mencari sebabnya, kamu perlu membaca pesan HTTP-nya. |
| Rangkuman | Request berisi method, alamat, header (keterangan), dan body (isi data). Response dibuka dengan kode status. |
| `atWork` | Kamu akan membaca request dan response ini di tab Network DevTools saat form gagal terkirim. |

Mengapa lebih baik: cerita dimulai dari masalah kerja yang nyata. Setiap istilah Inggris langsung diberi arti di dalam kurung. Rangkumannya bisa diucapkan ulang ke teman kantor.

---

## 11. Teks antarmuka (untuk paket halaman)

Teks tombol dan judul layar ditetapkan di dokumen desain §8. Aturan nadanya sama dengan PRD §11.4. Istilah hadiah dan nada **dipisah per mode**: Junior hangat dan konkret, Pro lugas dan berisi angka. Ringkasan yang paling sering dipakai:

| Situasi | Junior (tampil sebagai "Petualang") | Pro |
|---|---|---|
| Nama mode | Petualang | Pro (mulai dari nol) |
| Poin dan level | poin · Level 3 | XP · Lv 3 |
| Judul jawaban benar | Tepat! · Betul! · Pas! | Tepat! · Betul! · Pas! |
| Judul jawaban belum benar | Belum pas | Belum tepat |
| Judul bila sebagian besar butir benar | Hampir! | Hampir |
| Soal yang diulang | Soal ini muncul lagi nanti. | Soal ini muncul lagi nanti. |
| Pelajaran selesai, 1 bintang | Kamu selesai! Soal yang diulang membuatmu makin ingat. | Selesai. {k} dari {total} benar di percobaan pertama. |
| Pelajaran selesai, 2 bintang | Hampir sempurna. Benar {n} soal lagi di percobaan pertama, dapat ★★★. | {k} dari {total} benar di percobaan pertama. {n} lagi untuk ★★★. |
| Pelajaran selesai, 3 bintang | Semua benar di percobaan pertama! | Semua benar di percobaan pertama. |
| Titik berhenti | Selesai untuk hari ini | Selesai untuk hari ini |
| Ajakan bercerita | Ceritakan ke kakak atau temanmu: | (tidak ada) |
| Di tempat kerja | (tidak ada) | Di tempat kerja: {atWork} |
| Rekor pribadi | (tidak ada) | // rekor baru |
| Beruntun benar | 3 beruntun | // 3 beruntun |
| Target mingguan tercapai | Target minggu ini tercapai! | Target minggu ini tercapai. |
| Minggu baru | Minggu baru, petualangan baru. | Minggu baru, petualangan baru. |
| Penjaga belum lulus | Sedikit lagi! Kurang {n} jawaban benar untuk membuka gerbang. | Sedikit lagi. Kurang {n} jawaban benar. |
| Memuat | Bito sedang mengantar halaman… | Bito sedang mengantar halaman… |
| Sinyal putus | Sinyal putus? Pelajaran ini belum tersimpan di HP-mu. Coba lagi saat sinyal kembali. | Sama |
| Tes awal | belum tahu? tidak apa-apa | belum tahu? lewati saja |
| Pemanasan di Beranda | Pemanasan dulu → · 3 kartu, lalu lanjut pelajaran | Ulang 5 kartu, lalu lanjut → |
| Lewati pemanasan | Langsung ke pelajaran | Langsung ke pelajaran |
| Tombol bacakan | Dengar · Berhenti | (ikon pengeras suara) |
| Tawaran petunjuk | Butuh petunjuk? | (tidak ada) |
| Kartu Batas Analogi | Mirip, tetapi berbeda | Batas Analogi |
| Jenis kartu | Cerita · Belajar · Coba sendiri · Cek cepat · Soal 2 dari 4 | CERITA · KONSEP · COBA SENDIRI · CEK CEPAT · SOAL 2 DARI 4 |
| Label tujuan | Tujuan: Aku bisa … | Setelah ini: Kamu bisa … |
| Koleksi | Buku Stiker · stiker baru! | Koleksi Konsep · // konsep baru |
| Perkenalan Bito | Aku Bito, robot pengantar pesan. | Sama |
| Kotak Ulang | Soal lama muncul lagi di sini supaya kamu tidak lupa. | (tanpa keterangan) |
| Istirahat | Istirahat dulu (tombol utama) · Lanjut belajar | (tidak ada pengingat) |

Aturan untuk semua teks antarmuka:

- Tidak ada teks yang menyebut kehilangan, gagal, kalah, atau membandingkan dengan orang lain.
- Tidak ada teks Junior yang menyebut waktu, kecepatan, atau rekor.
- Teks Junior memakai huruf kapital hanya di awal kalimat. Tanpa "XP", "Lv", dan kode dunia seperti "A1".
- Tombol Junior paling banyak 4 kata.
- Teks Pro tidak memakai kata "stiker" dan tidak mengomentari cara belajar.
- Kartu pilihan mode tidak menyebut kelas atau umur.

---

## 12. Aturan pemeriksa otomatis (`scripts/validate-content.ts`)

Pemegang alat konten menambahkan aturan di bawah. Aturan ini mulai sebagai **peringatan**.

**Galat per dunia.** Begitu satu dunia selesai ditulis ulang, penulisnya menambahkan file kosong `copydeck.done` di folder dunia itu. Untuk dunia yang punya file itu, aturan langsung menjadi **galat** yang menggagalkan build. Dunia yang sudah selesai tidak bisa rusak lagi selagi dunia lain masih dikerjakan. Setelah keempat kelompok penulis selesai, aturan menjadi galat untuk semua dunia dan file penanda dihapus. Aturan bertanda "peringatan tetap" tidak pernah menjadi galat, karena butuh penilaian manusia.

Cara menghitung: teks dipecah menjadi kalimat pada tanda `.`, `!`, `?`, dan `…`. Kata dihitung dengan memecah pada spasi. Potongan `rCode` tidak dihitung. Untuk teks kaya (`Rich[]`), yang diperiksa adalah gabungan potongan yang tampil di mode itu (`richToPlainText`).

| Kode | Aturan | Berlaku untuk |
|---|---|---|
| C01 | Ada kalimat Junior lebih dari 12 kata | Semua teks Junior |
| C02 | Ada kalimat Pro lebih dari 20 kata | Semua teks Pro |
| C03 | Soal yang tampil di Junior bertipe `spotbug`, `fill`, atau `type` | Soal |
| C04 | Soal yang tampil di Junior tidak punya `hints[0]` | Soal |
| C05 | Teks Junior sama persis dengan teks Pro dan lebih dari 12 kata | `prompt`, `story`, `explainCorrect`, `explainIncorrect` |
| C06 | Kartu Junior menampilkan lebih dari satu potongan kode, atau potongan kode lebih dari 12 karakter | Kartu cerita dan konsep |
| C07 | Kata dari daftar §9.1 muncul di teks Junior dan bukan `rTerm` pelajaran itu | Semua teks Junior |
| C08 | Heks warna, "px", pola "angka : 1", atau "HTTP/angka" muncul di teks Junior | Semua teks Junior |
| C09 | Selisih panjang pilihan lebih dari 3 kata (Junior) atau 5 kata (Pro) | Pilihan |
| C10 | Pilihan benar adalah satu-satunya pilihan terpanjang, dengan selisih 3 kata atau lebih | Pilihan |
| C11 | `explainWrong` ditulis pada pilihan yang benar | Pilihan |
| C12 | Penjelasan diawali "Benar", "Tepat", "Betul", "Hebat", "Jeli", "Mantap", "Hampir", atau "Salah" | Penjelasan, kedua mode |
| C13 | Pelajaran Junior punya kurang dari 4 soal yang tampil di Junior | Pelajaran |
| C14 | Pertanyaan Junior lebih dari 2 kalimat, atau penjelasan lebih dari 2 kalimat | Soal |
| C15 | `limitStep` tanpa `riskyAnalogy` yang ditulis jelas | Kartu Batas Analogi |
| C16 | Istilah yang dipakai di pelajaran Junior tidak punya `pronunciation` atau `shortDef.junior` di glosarium | Glosarium |
| C17 | Teks Junior hasil gabungan memuat titik ganda, spasi ganda, atau tanda baca yang menempel pada huruf berikutnya (tanda teks rusak) | Teks kaya |
| C18 | Pertanyaan soal pilihan (`mcq`, `analogy`, `why`, `scenario`, `limit`) tidak diakhiri "?", atau diakhiri "…" | Soal, kedua mode |
| C19 | Kata dari daftar §9.4 muncul di luar tanda kutip | Semua teks, kedua mode |
| C20 | Kata dari daftar §9.2 atau §9.3 muncul di teks Pro dan bukan istilah pelajaran itu | Semua teks Pro |
| C21 | Satu kalimat Pro memuat lebih dari 2 istilah glosarium, atau lebih dari 1 istilah dari `introducesTerms` pelajaran itu | Semua teks Pro |
| C22 | Istilah dari `introducesTerms` muncul pertama kali di teks Pro tanpa arti di kalimat yang sama (kurung, "disebut", "adalah", "yaitu") | Kartu Pro |
| C23 | Istilah dari `introducesTerms` pelajaran Pro tidak punya `pronunciation` atau `shortDef.pro` | Glosarium |
| C24 | Pilihan jawaban memuat istilah glosarium yang tidak ada di `introducesTerms` atau `usesTerms` pelajaran itu atau pelajaran sebelumnya | Pilihan, kedua mode |
| C25 | Lebih dari 2 kartu baca berturut-turut (cerita, konsep, Batas Analogi) yang tampil di satu mode tanpa soal atau simulasi di antaranya | Pelajaran, per mode |
| C26 | Di satu dunia, pilihan benar adalah pilihan terpanjang pada lebih dari 30% soal pilihan | Dunia, per mode |
| C27 | Angka status HTTP muncul di soal Junior, padahal tidak ada di kartu konsep Junior pelajaran itu | Soal Junior |
| C28 | Soal menanyakan kepanjangan singkatan (pola "kepanjangan", "singkatan dari", "kependekan") | Soal, kedua mode |
| C29 | Wadah `sort` yang tampil di Junior tidak punya `icon`, atau labelnya lebih dari 2 kata | Soal Junior |
| C30 | Pelajaran yang tampil di Pro tidak punya `atWork`, atau `atWork` lebih dari 20 kata | Pelajaran Pro |
| C31 | Penjelasan memuat kata penegas yang bisa terdengar menyindir ("tentu saja", "jelas", "masa sih") | Penjelasan. Peringatan tetap |
| C32 | Pelajaran menampilkan lebih dari 2 kartu konsep atau lebih dari 5 soal di Junior | Pelajaran Junior. Peringatan tetap |
| C33 | Kata Junior dengan 4 suku kata atau lebih dan imbuhan ganda ("memper-…-kan", "diper-…-kan") | Teks Junior. Peringatan tetap |
| C34 | `estMinutes` lebih kecil daripada perkiraan hitung: kata Junior ÷ 70 per menit, ditambah 25 detik per soal dan 60 detik per simulasi (pelajaran khusus Pro: 150 kata per menit dan 20 detik per soal) | Pelajaran |

Yang tidak bisa ditangkap mesin tetap harus ditangkap manusia: sindiran halus, pengecoh dari topik lain, perumpamaan yang asing bagi anak ("KTP info untuk browser"), dan kalimat pendek yang penuh kata berimbuhan. Itu tugas uji baca di §13. Lulus pemeriksa bukan berarti selesai.

Perubahan pembantu di `src/content/lessonHelpers.ts` (pemegang alat konten):

- `limitStep`: bawaan `riskyAnalogy` menjadi `false`.
- `makeMcq`: teks bawaan penjelasan salah tidak lagi diawali "Hampir!" (judul panel sudah menyebutnya). Menjadi: "Pilihan itu belum pas. …" untuk Junior dan "Belum tepat. …" tetap untuk Pro.
- `makeMcq`: abaikan dan peringatkan `explainWrong` pada pilihan benar.
- `validate-content.ts`: baca penanda `copydeck.done` per dunia, dan pakai daftar ikon dari `src/content/icons.ts`.

Bidang baru di skema (ditambahkan Paket 0, semuanya opsional): `icon` pada pilihan, butir `sort`, dan wadah `sort`; `atWork` pada pelajaran.

---

## 13. Alur kerja per dunia

1. **Baca seluruh dunia dulu.** Catat analogi tiap pelajaran dan dua istilah barunya.
2. **Putuskan per soal**: tetap untuk dua mode, atau `modes: ['pro']` (§8). Hitung sisa soal Junior (4–5 per pelajaran).
3. **Atur urutan langkah** (§6.7): paling banyak 2 kartu baca berturut-turut. Pindahkan satu soal ke belakang kartu yang diujinya.
4. **Tulis teks Junior dari nol**, jangan memendekkan teks Pro. Mulai dari analoginya.
5. **Rapikan teks Pro**: batas 20 kata, arti istilah saat pertama muncul, tanpa kata buku teks (§9.3), pilihan tanpa bocoran, pertanyaan berbentuk tanya langsung.
6. **Tulis `atWork`** untuk setiap pelajaran yang tampil di Pro (§4.1).
7. **Tulis petunjuk** untuk setiap soal Junior.
8. **Beri `icon`** pada wadah `sort` Junior, dan pada pilihan yang berupa benda nyata (§6.2 aturan 9).
9. **Perbaiki kartu** yang memakai `rCode` dengan pola §7.3.
10. **Tetapkan `riskyAnalogy`** di setiap `limitStep`.
11. **Hitung ulang `estMinutes`** dengan rumus C34.
12. **Jalankan** `npm run validate:content`. Selesaikan semua peringatan C01–C34 untuk dunia itu, kecuali yang bertanda "peringatan tetap" dan sudah kamu timbang.
13. **Uji baca keras, dua mode.** Baca teks Junior dan teks Pro satu pelajaran dengan suara. Kalau harus menarik napas di tengah kalimat, kalimatnya terlalu panjang. Semua kelompok penulis melakukan ini untuk Pro juga, bukan hanya untuk Junior.
14. **Uji tanpa belajar**: lihat hanya pilihan jawaban, tanpa membaca pertanyaan. Kalau jawabannya bisa ditebak, pilihannya membocorkan.
15. **Uji pembaca awam (wajib, setiap dunia).** Satu orang dewasa yang bukan orang teknis membaca keras teks Junior dunia itu. Catat setiap kalimat yang membuatnya berhenti atau bertanya "maksudnya apa?", lalu perbaiki.
16. **Uji anak (wajib, satu dunia per kelompok penulis).** Sebelum kelompokmu menandai dunia pertamanya selesai, ujikan dunia itu kepada minimal 2 anak usia 9–10 tahun. Catat soal yang membuat anak bertanya "maksudnya apa?". Pelajaran dari uji ini dipakai untuk dunia-dunia berikutnya. Kalau bisa, sertakan satu guru SD untuk membaca semua contoh Junior.
17. **Tandai selesai**: tambahkan file kosong `copydeck.done` di folder dunia itu. Sejak itu aturan menjadi galat untuk dunia tersebut (§12).

### Pembagian file

| Kelompok | File yang dipegang |
|---|---|
| Alat konten | `scripts/validate-content.ts`, `src/content/lessonHelpers.ts`, `src/content/glossary.ts`, `src/content/stickers.ts`, `src/content/worldMeta.ts`, `src/content/badges.ts` |
| Penulis 5a | `a01-kota-web`, `a02-hutan-html`, `a03-bengkel-css`, `a04-pabrik-js`, `a05-pulau-responsif`, `a06-desa-ux` |
| Penulis 5b | `a07-galeri-desain`, `a08-studio-warna-huruf`, `a09-toko-komponen`, `a10-taman-ramah`, `a11-menara-alat`, `a12-benteng-keamanan` |
| Penulis 5c | `b01-restoran-api`, `b02-kantor-pos-http`, `b03-gudang-json`, `b04-peta-jenis-api`, `b05-menara-realtime` |
| Penulis 5d | `b06-lonceng-kejadian`, `b07-gerbang-login`, `b08-satpam-api`, `b09-dapur-frontend`, `b10-puncak-petualang` |

Penulis hanya mengubah `index.ts` di dunia miliknya, dan menambahkan `copydeck.done` di folder dunia itu saat selesai. Tidak ada file yang dipegang dua kelompok. Perubahan judul pelajaran, glosarium, dan ringkasan stiker dikirim sebagai daftar ke kelompok alat konten.

### Yang tidak boleh berubah

- ID dunia, pelajaran, soal, pilihan, dan stiker. Kemajuan belajar yang sudah tersimpan memakai ID itu. Soal baru memakai ID baru.
- Jawaban benar (`answer`), kecuali soalnya memang keliru.
- Urutan pelajaran, `introducesTerms`, dan `usesTerms`, kecuali untuk memperbaiki pelanggaran batas istilah. Urutan **langkah di dalam** satu pelajaran boleh, dan memang perlu, diubah (§6.7).
- Jumlah soal jangkar (Junior 5, Pro 6) dan pilihan "Belum tahu".
- Jumlah soal per pelajaran tidak boleh turun di bawah 6 (aturan pemeriksa yang ada menghitung semua soal, dua mode).

---

## 14. Di luar cakupan penulisan ulang ini

Audit juga mencatat materi Pro yang masih tipis: JavaScript (baru 6 pelajaran), metode array, penanganan error, npm dan Vite, DevTools, praktik React, pengujian, dan deploy. Itu **pelajaran baru**, bukan penulisan ulang. Pelajaran baru dikerjakan terpisah setelah copydeck ini selesai, dan wajib mengikuti panduan ini sejak awal.

Materi itulah yang paling ditanyakan perekrut, jadi pembaca dewasa perlu tahu bahwa jalurnya berlanjut. Sampai pelajaran baru ada, dua hal menjembataninya: kalimat `atWork` di setiap pelajaran Pro (§4.1), dan satu catatan di ujung peta Pro: "// berikutnya: DevTools, npm, deploy. Sedang disiapkan." (dokumen desain §8.3). Soal bonus tingkat sulit untuk Pro ("Soal Bos Mini") juga ditulis bersama pelajaran baru itu.

---

## 15. Daftar periksa sebelum mengirim satu dunia

- [ ] Tidak ada kalimat Junior lebih dari 12 kata, tidak ada kalimat Pro lebih dari 20 kata.
- [ ] Tidak ada `t('…')` satu argumen pada pertanyaan, cerita, atau penjelasan yang tampil di Junior.
- [ ] Tidak ada soal `spotbug`, `fill`, `type`, atau soal berkode yang tampil di Junior.
- [ ] Setiap pelajaran Junior punya minimal 4 soal Junior, dan setiap soal itu punya `hints[0]`.
- [ ] Setiap pilihan salah punya `explainWrong` sendiri. Tidak ada `explainWrong` di pilihan benar.
- [ ] Pilihan sejajar, panjangnya mirip, dan tidak membocorkan jawaban.
- [ ] Penjelasan tidak diawali pujian atau vonis, dan berisi alasan serta satu gambaran.
- [ ] Setiap kartu dengan `rCode` sudah dibaca dalam mode Junior dan utuh.
- [ ] Setiap `limitStep` menulis `riskyAnalogy` dengan jelas.
- [ ] Istilah baru Junior paling banyak 2 per pelajaran, dan semuanya punya cara baca di glosarium.
- [ ] Tidak ada nama orang sungguhan, nama merek, atau domain selain `*.example`.
- [ ] Tidak ada pertanyaan menggantung yang diakhiri "…", di kedua mode. Tidak ada soal kepanjangan singkatan.
- [ ] Tidak ada kata cakapan (§9.4) di luar ucapan tokoh. Tidak ada kata buku teks (§9.3) di teks Pro.
- [ ] Setiap pilihan salah adalah salah paham yang sungguh mungkin, dan setiap istilah di pilihan sudah dikenalkan.
- [ ] Tidak ada lebih dari 2 kartu baca berturut-turut, di kedua mode.
- [ ] Setiap pelajaran Pro punya `atWork`. Setiap wadah `sort` Junior punya `icon`.
- [ ] Angka status hanya muncul di pelajaran Junior yang mengajarkannya.
- [ ] `estMinutes` sudah dihitung ulang.
- [ ] Teks Junior dan Pro sudah dibaca keras. Satu orang dewasa awam sudah membaca teks Junior dunia ini.
- [ ] `npm run validate:content` lulus tanpa peringatan C01–C34 untuk dunia ini (selain "peringatan tetap" yang sudah ditimbang).
- [ ] File `copydeck.done` sudah ditambahkan di folder dunia ini.
