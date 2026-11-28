import React, { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { ChatBox } from '@/components/chat/ChatBox';
import { useAppStore } from '@/store/useAppStore';

const STARTERS = [
  'Aku sudah sampai mana? Apa langkah berikutnya?',
  'Jelaskan materi terakhirku dengan contoh nyata',
  'Uji pemahamanku',
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
    <div className="pw-chat-page">
      <ChatBox
        title="Tanya Tutor"
        threadKey={'curriculum:' + profile.id}
        endpoint="/api/chat"
        buildBody={(messages) => ({ messages, progress })}
        starters={STARTERS}
        greeting="Mau belajar apa hari ini?"
        notice="Pesanmu dan daftar pelajaran yang sudah kamu kerjakan dikirim ke AI 1Inference dan tidak disimpan. Jangan tulis data pribadi. Jawaban AI bisa keliru."
        inputId="curriculum-chat"
      />
    </div>
  );
};
