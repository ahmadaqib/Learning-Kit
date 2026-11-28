import React, { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { ChatBox, type ChatMessage } from '@/components/chat/ChatBox';
import { useAppStore } from '@/store/useAppStore';

const STARTERS = [
  'Aku sudah sampai mana, dan sebaiknya belajar apa berikutnya?',
  'Jelaskan materi terakhir yang aku selesaikan dengan contoh nyata.',
  'Uji pemahamanku tentang pelajaran yang baru selesai.',
];

/** Pro curriculum chat. Only lesson ids leave the device as progress; the server turns them into titles. */
export const ChatPage: React.FC = () => {
  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);

  const progress = useMemo(() => {
    const entries = Object.entries(profile?.lessons ?? {});
    return {
      done: entries.filter(([, l]) => l.completedAt).map(([id]) => id).slice(0, 400),
      started: entries.filter(([, l]) => !l.completedAt && l.stepIndex !== undefined).map(([id]) => id).slice(0, 20),
    };
  }, [profile?.lessons]);

  if (!profile) return null;
  if (profile.mode !== 'pro') return <Navigate to="/beranda" replace />;

  return (
    <div className="mx-auto w-full max-w-[840px] space-y-5 px-4 py-6 sm:px-6">
      <header>
        <span className="pw-kicker">Tanya Tutor</span>
        <h1 className="pw-h1">Tanya soal pelajaran</h1>
        <p className="pw-small text-[var(--ink-2)]">
          Tanyakan isi pelajaran, posisimu di kurikulum, atau langkah belajar berikutnya.
        </p>
      </header>
      <ChatBox
        threadKey={'curriculum:' + profile.id}
        endpoint="/api/chat"
        buildBody={(messages: ChatMessage[]) => ({ messages, progress })}
        starters={STARTERS}
        notice="Pesanmu dan daftar pelajaran yang sudah kamu kerjakan dikirim ke AI 1Inference dan tidak disimpan di aplikasi. Jangan tulis data pribadi. Jawaban AI bisa keliru."
        // Page height minus the header, the notice, the form and the bottom navigation.
        listHeight="max-h-[max(12rem,calc(100dvh-31rem))]"
        inputId="curriculum-chat"
      />
    </div>
  );
};
