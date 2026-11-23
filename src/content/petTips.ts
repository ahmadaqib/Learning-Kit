import { PET_IDS, PET_PERSONALITIES, type PetAiStepKind, type PetAiTipId, type PetId, type PetPersonality } from './petContract';
import type { Mode, Question } from './schema';

type RouteSurface = 'home' | 'map' | 'world' | 'review' | 'glossary';

export type PetContext =
  | { surface: RouteSurface }
  | { surface: 'lesson'; stepKind: PetAiStepKind; worldId: string; topicId: string }
  | { surface: 'question'; questionType: Question['type']; hasHint: boolean };

interface TipCopy {
  junior: string;
  pro: string;
}

const ROUTE_TIPS: Record<RouteSurface, TipCopy> = {
  home: {
    junior: 'Lihat kartu paling atas untuk menemukan langkah belajarmu. Kalau pernah berhenti di tengah jalan, kamu bisa lanjut dari situ.',
    pro: 'Kartu teratas menunjukkan langkah sesuai progresmu. Jika ada sesi belajar dalam proses, lanjutkan dari langkah yang tersimpan.',
  },
  map: {
    junior: 'Ketuk dunia yang ingin kamu lihat. Kalau masih terkunci, petanya akan memberi tahu langkah untuk membukanya.',
    pro: 'Pilih dunia untuk melihat pelajarannya. Ketuk dunia terkunci untuk melihat prasyaratnya.',
  },
  world: {
    junior: 'Cari langkah yang bisa dibuka. Kalau ada cek awal, kerjakan dulu supaya jalan belajarmu terbuka.',
    pro: 'Mulai dari langkah yang tersedia. Cek Titik Awal memetakan pemahamanmu sebelum pelajaran pertama terbuka.',
  },
  review: {
    junior: 'Waktu mengulang kartu, coba ingat jawabannya dulu. Kalau masih lupa, kamu akan bertemu kartunya lagi.',
    pro: 'Gunakan kartu ulang untuk menguji ingatan. Kartu yang masih sulit akan muncul lagi lebih cepat.',
  },
  glossary: {
    junior: 'Cari kata yang belum kamu kenal. Baca artinya, lalu coba ceritakan dengan contoh dari sekitarmu.',
    pro: 'Gunakan kolom pencarian untuk istilah yang belum familier. Buat satu contoh sendiri untuk menguji definisinya.',
  },
};

const LESSON_TIPS: Record<PetAiStepKind, TipCopy> = {
  story: {
    junior: 'Pilih satu kejadian dari cerita. Coba ceritakan siapa yang melakukan apa dan apa yang berubah setelahnya.',
    pro: 'Pilih satu kejadian dalam cerita. Identifikasi siapa yang bertindak, tindakannya, dan perubahan yang dihasilkan.',
  },
  concept: {
    junior: 'Lihat gambar atau contoh di kartu. Coba ceritakan satu hal yang baru kamu pahami dengan bahasamu sendiri.',
    pro: 'Ambil satu gagasan dari kartu. Jelaskan dengan kata-katamu sendiri, lalu buat contoh kecil yang berbeda.',
  },
  sim: {
    junior: 'Coba ubah satu hal di simulasi. Lihat apa yang ikut berubah, lalu coba lagi dengan pilihan lain.',
    pro: 'Ubah satu input, amati hasilnya, lalu bandingkan dengan kondisi awal. Uji input lain secara terpisah.',
  },
  limit: {
    junior: 'Cari satu hal yang mirip antara cerita dan cara kerja web. Setelah membuka penjelasannya, cari satu hal yang berbeda.',
    pro: 'Sebutkan satu persamaan dalam analogi. Saat membuka batasnya, periksa bagian yang tidak lagi mewakili cara kerja web.',
  },
};

const QUESTION_TIPS: Record<Question['type'], string> = {
  mcq: 'Baca pertanyaannya sekali lagi. Bandingkan pilihan yang tersisa dengan hal yang ditanyakan.',
  analogy: 'Cari bagian cerita dan bagian web yang punya tugas serupa.',
  why: 'Cari pilihan yang menjelaskan penyebabnya. Uji alasan itu dengan satu contoh.',
  scenario: 'Perhatikan tujuan dalam cerita. Bandingkan apa yang mungkin terjadi jika tiap pilihan dicoba.',
  limit: 'Periksa bagian perumpamaan yang mulai berbeda dari cara kerja web.',
  tf: 'Uji pernyataannya dengan satu contoh. Coba pikirkan kapan pernyataan itu gagal.',
  sort: 'Sebutkan ciri tiap kelompok. Pakai ciri itu untuk memeriksa satu kartu setiap kali.',
  order: 'Cari langkah yang harus terjadi paling awal. Susun langkah berikutnya dari situ.',
  match: 'Mulai dari satu pasangan yang kamu yakini. Jelaskan hubungan keduanya sebelum lanjut.',
  hotspot: 'Lihat gambar utuh. Cari bagian yang cirinya paling sesuai dengan pertanyaan.',
  spotbug: 'Baca kode baris demi baris. Periksa apakah nama, tanda, dan urutannya sesuai contoh.',
  fill: 'Baca kalimatnya secara utuh, lalu pikirkan kata apa yang membuat maknanya pas.',
  type: 'Baca lagi apa yang diminta. Periksa ejaan dan tanda baca sebelum mengirim jawaban.',
};

const EXTRA_TIPS: Record<PetAiStepKind, Record<PetAiTipId, string>> = {
  story: {
    recall: 'Tutup cerita sebentar dan tulis satu kalimat yang merangkum masalahnya. Buka kembali untuk memeriksa ringkasanmu.',
    compare: 'Temukan situasi serupa di sekitar kamu. Sebutkan satu hal yang sama dan satu hal yang berbeda.',
    predict: 'Bayangkan satu bagian cerita berubah. Apa akibatnya pada bagian lain? Jelaskan alasannya.',
  },
  concept: {
    recall: 'Tutup kartu sebentar dan ucapkan definisinya dengan bahasamu sendiri. Buka kembali untuk memeriksanya.',
    compare: 'Bandingkan dua contoh yang berbeda. Cari ciri yang tetap sama di keduanya.',
    predict: 'Ubah satu bagian pada contoh di kartu. Perkirakan apa yang ikut berubah dan kenapa.',
  },
  sim: {
    recall: 'Ulangi percobaan tanpa melihat petunjuk. Sebutkan input yang kamu ubah dan hasil yang kamu amati.',
    compare: 'Coba dua nilai untuk input yang sama. Bandingkan bagian hasil yang berubah dan yang tetap.',
    predict: 'Tebak hasilnya sebelum mengubah satu input. Setelah mencoba, bandingkan hasilnya dengan tebakanmu.',
  },
  limit: {
    recall: 'Setelah membuka batas analogi, tutup sejenak dan sebutkan kembali dari ingatan.',
    compare: 'Pilih satu bagian dari perumpamaan. Bandingkan apa yang bisa dilakukannya dengan cara web bekerja.',
    predict: 'Bayangkan kamu menerapkan semua bagian perumpamaan secara harfiah. Periksa perkiraanmu saat membuka batas analogi.',
  },
};

export const PET_DETAILS: Record<PetId, { name: string; species: string }> = {
  piko: { name: 'Piko', species: 'Tarsius' },
  mobi: { name: 'Mobi', species: 'Kucing' },
  lumba: { name: 'Lumba', species: 'Lumba-lumba' },
  ruru: { name: 'Ruru', species: 'Burung hantu' },
  kora: { name: 'Kora', species: 'Kura-kura' },
};

export const PET_PERSONALITY_LABELS: Record<PetPersonality, string> = {
  ramah: 'Suportif',
  tenang: 'Tenang',
  langsung: 'Terus terang',
  sinis: 'Sinis ringan',
  penasaran: 'Penasaran',
};

export function getPetId(preference?: PetId): PetId {
  return preference && PET_IDS.includes(preference) ? preference : 'piko';
}

export function getPetPersonality(mode: Mode, preference?: PetPersonality): PetPersonality {
  if (preference && PET_PERSONALITIES.includes(preference)) return preference;
  return mode === 'junior' ? 'ramah' : 'langsung';
}

const PERSONA_OPENERS: Record<Exclude<PetPersonality, 'langsung'>, Record<'route' | 'lesson' | 'question', string>> = {
  ramah: {
    route: 'Aku temani cari langkah berikutnya.',
    lesson: 'Kita coba pahami satu bagian dulu.',
    question: 'Mulai dari bagian yang paling kamu pahami.',
  },
  tenang: {
    route: 'Ambil satu langkah dulu.',
    lesson: 'Beri waktu untuk satu pengamatan.',
    question: 'Jeda sebentar sebelum memilih.',
  },
  sinis: {
    route: 'Menu cukup pendiam untuk sesuatu yang disebut navigasi.',
    lesson: 'Contohnya tampak rapi. Mari kita periksa.',
    question: 'Soalnya pandai menyimpan rahasia.',
  },
  penasaran: {
    route: 'Kira-kira apa yang bisa kita temukan di sini?',
    lesson: 'Apa yang akan berubah kalau contohnya kita utak-atik?',
    question: 'Petunjuk apa yang bisa kita temukan di soalnya?',
  },
};

export function getPetTip(context: PetContext, mode: Mode, personality: PetPersonality): string {
  const kind = context.surface === 'lesson' || context.surface === 'question' ? context.surface : 'route';
  const text = context.surface === 'question'
    ? QUESTION_TIPS[context.questionType]
    : context.surface === 'lesson'
      ? LESSON_TIPS[context.stepKind][mode]
      : ROUTE_TIPS[context.surface][mode];
  return personality === 'langsung' ? text : `${PERSONA_OPENERS[personality][kind]} ${text}`;
}

export function getExtraPetTip(stepKind: PetAiStepKind, tipId: PetAiTipId): string {
  return EXTRA_TIPS[stepKind][tipId];
}
