import React from 'react';
import { Hand } from 'lucide-react';
import type { Question } from '@/content/schema';
import { DialogModal } from '@/components/ui/DialogModal';
import { Button } from '@/components/ui/Button';

const GUIDE_MAP: Record<Question['type'], { title: string; steps: string[] }> = {
  mcq: {
    title: 'Cara menjawab Pilihan Ganda',
    steps: ['Baca pertanyaan pelan-pelan.', 'Ketuk salah satu kotak jawaban.', 'Tekan tombol Periksa di bawah.'],
  },
  tf: {
    title: 'Cara menjawab Benar / Salah',
    steps: ['Baca pernyataan yang tampil.', 'Ketuk tombol Benar atau Salah.', 'Tekan Periksa untuk melihat penjelasannya.'],
  },
  analogy: {
    title: 'Cara memilih Analogi',
    steps: ['Ingat perumpamaan cerita di awal pelajaran.', 'Ketuk gambar/pilihan perumpamaan yang paling pas.', 'Tekan Periksa.'],
  },
  sort: {
    title: 'Cara Mengelompokkan Kartu',
    steps: ['Ketuk satu kartu di bagian atas.', 'Lalu ketuk kotak keranjang tujuan di bawah (atau seret kartu).', 'Ulangi sampai semua kartu masuk keranjang, lalu tekan Periksa.'],
  },
  order: {
    title: 'Cara Mengurutkan Langkah',
    steps: ['Gunakan tombol panah atas/bawah di sebelah kanan kartu (atau seret).', 'Susun dari langkah paling awal sampai paling akhir.', 'Tekan Periksa bila urutan sudah pas.'],
  },
  match: {
    title: 'Cara Memasangkan',
    steps: ['Ketuk satu kotak di kolom kiri.', 'Lalu ketuk pasangannya di kolom kanan.', 'Ulangi sampai semua berpasangan, lalu tekan Periksa.'],
  },
  hotspot: {
    title: 'Cara Mengetuk Bagian Gambar',
    steps: ['Perhatikan bagian yang ditanyakan.', 'Ketuk langsung area atau label yang dimaksud pada diagram.', 'Tekan Periksa.'],
  },
  spotbug: {
    title: 'Cara Memilih Baris Kode',
    steps: ['Baca tiap baris dengan teliti.', 'Ketuk setiap baris yang sesuai dengan pertanyaan.', 'Tekan Periksa.'],
  },
  fill: {
    title: 'Cara Mengisi Bagian Kosong',
    steps: ['Ketuk potongan kata di bank kata di bawah.', 'Potongan itu akan mengisi bagian yang kosong.', 'Ketuk kotak isian jika ingin melepasnya kembali.'],
  },
  type: {
    title: 'Cara Mengetik Jawaban',
    steps: ['Ketik jawaban singkat di kotak yang tersedia.', 'Periksa kembali ejaanmu.', 'Tekan Periksa.'],
  },
  why: {
    title: 'Cara Memilih Alasan',
    steps: ['Pikirkan mengapa aturan tersebut dibuat.', 'Ketuk alasan yang paling menjelaskan sebabnya.', 'Tekan Periksa.'],
  },
  scenario: {
    title: 'Cara Memilih Solusi Kasus',
    steps: ['Baca cerita masalah singkat yang terjadi.', 'Pilih tindakan terbaik untuk menyelesaikan masalah itu.', 'Tekan Periksa.'],
  },
  limit: {
    title: 'Cara Menjawab Batas Analogi',
    steps: ['Ingat bahwa perumpamaan punya bagian yang TIDAK sama persis.', 'Pilih pernyataan yang BUKAN sifat asli konsep teknologinya.', 'Tekan Periksa.'],
  },
};

interface QuestionGuideOverlayProps {
  questionType: Question['type'];
  open: boolean;
  onClose: () => void;
}

export const QuestionGuideOverlay: React.FC<QuestionGuideOverlayProps> = ({
  questionType,
  open,
  onClose,
}) => {
  const guide = GUIDE_MAP[questionType];
  return (
    <DialogModal open={open} onClose={onClose} title={guide.title} variant="dialog">
      <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-[var(--radius-md)] bg-[var(--world-50)] p-3 text-[var(--world-700)]">
          <Hand className="h-7 w-7 flex-shrink-0" aria-hidden="true" />
          <p className="pw-small m-0 font-bold">Tipe soal baru. Begini cara memainkannya.</p>
        </div>
        <ol className="list-decimal space-y-2 pl-5 pw-body">
          {guide.steps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
        <Button variant="primary" fullWidth onClick={onClose}>
          Mengerti, ayo coba!
        </Button>
      </div>
    </DialogModal>
  );
};
