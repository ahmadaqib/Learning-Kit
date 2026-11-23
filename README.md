# Learning-Kit

**Petualang Web** adalah platform belajar pemrograman web dan arsitektur API berbahasa Indonesia berbasis **gamifikasi**, cerita analogi dunia nyata, dan simulator interaktif — dibuat secara **100% Open Source** melalui semangat *vibe coding* dan kecintaan terhadap ilmu pengetahuan.

Kunjungi situs resmi: **[gamifikasi.site](https://gamifikasi.site)**

---

## Mengapa Proyek Ini Dibuat?

Banyak materi pemrograman web langsung melompat ke sintaks yang terasa abstrak bagi pemula maupun pelajar usia dini. **Learning-Kit / Petualang Web** menyusun jembatan konsep lewat cerita **Restoran Web**, **Kurir Internet**, **Radio & Siaran**, **Peta CSS**, hingga **Gerbang Keamanan**, lengkap dengan pengakuan jujur atas **batas setiap analogi** (*di mana perumpamaan berhenti berlaku dan kode asli bekerja*).

Siapa pun **bebas menggunakan, mempelajari, memodifikasi, dan menyebarluaskan** repositori ini untuk kebutuhan sekolah, komunitas belajar, *homeschooling*, kursus, maupun eksplorasi mandiri.

---

## Fitur Utama

- **22 Dunia Petualangan (117 Pelajaran & Side Quest)**
  - **Jalur A (Membangun Tampilan):** Konsep Web & URL, HTML Semantik, Box Model & Flexbox/Grid CSS, Dasar JavaScript & DOM, Desain Responsif, UX & Aksesibilitas, Sistem Desain, hingga Keamanan Frontend.
  - **Jalur B (Aplikasi Saling Bicara):** Restoran API, Request/Response HTTP, JSON & Struktur Data, REST/GraphQL/gRPC, Polling vs SSE vs WebSocket, Webhook, Autentikasi & JWT, CORS & Rate Limiting, Integrasi Frontend, hingga Proyek Puncak.
- **Dual Mode Adaptif:**
  - **Mode Junior (SD):** Kalimat ringkas, ukuran huruf lega, ilustrasi vektor ekspresif, dukungan bacakan suara (`id-ID`), dan tanpa mengetik kode rumit.
  - **Mode Pro (SMP ke atas / Pemula):** Seluruh 113 pelajaran utama + 11 misi bonus, cuplikan kode nyata, soal melengkapi/mengetik sintaks, dan *placement test*.
- **21+ Simulator Interaktif:** Restoran Web, Rak Label HTML, Kupas Box Model, Playground Flexbox, Mesin Blender Fungsi JS, Detektif Kontras WCAG, Perakit Request API, Dokter JSON, Pelayan GraphQL, Balap Realtime, Pembaca Gelang JWT, dan lainnya.
- **13 Tipe Soal Interaktif & Antrean Belajar:** Pilihan ganda, analogi, sebab-akibat, skenario, batas analogi, benar/salah, urutkan langkah, pasangkan kartu, kelompokkan (*sorting*), cari bug (*spot the bug*), area visual (*hotspot*), isi rumpang, dan ketik jawaban — dilengkapi pengulangan soal salah di akhir sesi.
- **Gamifikasi Bermakna:** Sistem 5 Kotak **Leitner** (*spaced repetition*), **53 Stiker Analogi**, kustomisasi maskot **Bito** & **8 karakter vektor orisinal**, XP & level, target mingguan, lencana pencapaian, serta uji Awal/Akhir/Retensi 7 hari.
- **Mode Pendamping & Profil Lokal:** Bahan obrolan tanpa layar, ringkasan perkembangan anak, sertifikat kelulusan dunia siap cetak (A4), **hingga 4 profil lokal**, ekspor/impor kode progres (`PW1.`), tema Terang/Gelap/Sistem, tanpa akun server, dan nol pelacakan.

---

## Menjalankan Secara Lokal

Pastikan Node.js 20+ sudah terpasang:

```bash
# 1. Unduh repositori
git clone https://github.com/ahmadaqib/Learning-Kit.git
cd Learning-Kit

# 2. Pasang dependensi
npm install

# 3. Jalankan server pengembangan lokal
npm run dev
```

### Hewan pendamping dan audio

Di **Pengaturan → Hewan pendamping**, pilih satu dari lima hewan dan gaya bicaranya. Petunjuk dasar berjalan lokal. Selama pelajaran, pendamping bisa menawarkan bantuan, dan peserta memilih kapan membukanya atau mendengarkan suaranya. Mode Fokus menghentikan tawaran. Di bagian suara, peserta dapat mencoba suara studio untuk pendamping, memilih suara Indonesia yang disediakan perangkat, dan mengatur efek serta musik.

Ilustrasi Piko (tarsius dengan buku) berasal dari OpenArt. Mobi (kucing dengan pensil), Lumba (lumba-lumba dengan tas), Ruru (burung hantu dengan buku), dan Kora (kura-kura dengan peta) dibuat dengan ImageGen, dengan garis tinta biru tua dan latar krem. Aset berada di `public/pets/`. Narasi studio dibuat dari naskah petunjuk Indonesia menggunakan suara preset Supertonic 3 dan disimpan di `public/audio/pet/`. Pemutaran klip berlangsung di perangkat. [Model dan lisensi sumber suara](https://huggingface.co/Supertone/supertonic-3)

### Petunjuk AI Pro di Vercel

Fungsi `/api/companion` hanya dipanggil saat peserta Pro memilih petunjuk AI di kartu materi. Browser mengirim pengenal materi, jenis kartu, gaya dan kategori bantuan. Server menyusun masukan dari katalog dan meminta TokenPortal memilih satu strategi. Aplikasi menampilkan petunjuk dari naskah lokal. Jika layanan gagal, petunjuk lokal tetap tersedia.

Pada proyek Vercel, buka **Settings → Environment Variables**. Tetapkan kedua variabel server pada environment yang dituju. Pada mesin pengembangan, Vite dan Vite Preview membaca nama yang sama dari `.env.local`.

| Variabel server | Nilai |
| --- | --- |
| `TOKENPORTAL_API_KEY` | Kunci TokenPortal. Gunakan tipe Sensitive di Vercel. |
| `TOKENPORTAL_MODELS` | ID model utama lalu cadangan, dipisahkan koma dalam urutan percobaan. Maksimal empat. |

Perubahan environment Vercel berlaku pada deployment berikutnya. Proyek memakai fungsi Node untuk rute API dan pengalihan ke halaman utama untuk rute aplikasi. [Environment variables Vercel](https://vercel.com/docs/environment-variables) · [Panduan TokenPortal](https://api.tokenportal.id/docs)

### Skrip Pengembangan & Verifikasi

```bash
npm run validate:content   # Validasi skema Zod & aturan kurikulum seluruh 22 dunia
npm run check:contrast     # Uji rasio kontras WCAG 2.1 AA untuk tema & seluruh warna dunia
npm run typecheck          # Pemeriksaan tipe TypeScript ketat
npm test                   # Jalankan unit test Vitest
npm run build              # Validasi penuh + build produksi ke dist/
```

---

## Lisensi & Kontribusi

Proyek ini dirilis di bawah **Lisensi MIT** ([LICENSE](./LICENSE)). Anda dipersilakan untuk menyalin, mengubah, menerjemahkan, atau mengadaptasi materi maupun antarmukanya untuk kepentingan pembelajaran terbuka. Pull request dan masukan selalu terbuka!

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/ahmadaqib"><strong>ahmadaqib</strong></a> · <a href="https://gamifikasi.site">gamifikasi.site</a>
</p>
