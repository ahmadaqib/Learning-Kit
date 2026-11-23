import { useState } from 'react';
import { Lightbulb, MessagesSquare, Pencil } from 'lucide-react';
import { resolveTxt, type Lesson, type Mode } from '@/content/schema';
import { getReflection, saveReflection } from '@/engine/lessonNotes';
import { Button } from '@/components/ui/Button';

const choices = [
  { id: 'explain', label: 'Ceritakan', Icon: MessagesSquare },
  { id: 'draw', label: 'Gambarkan', Icon: Pencil },
  { id: 'try', label: 'Coba sendiri', Icon: Lightbulb },
];

const invitations = [
  ['Bagaimana kamu mau mengingat pelajaran ini?', 'Apa yang ingin kamu coba setelah pelajaran ini?'],
  ['Bagaimana kamu mau berbagi ide tadi?', 'Bagaimana kamu menjelaskan ide ini kepada rekan kerja?'],
  ['Bagaimana kamu mau mencoba ide ini lagi?', 'Kesalahan apa yang sekarang bisa kamu kenali?'],
];

export function LessonReflection({ profileId, lesson, mode }: { profileId: string; lesson: Lesson; mode: Mode }) {
  const lessonId = lesson.id;
  const [text, setText] = useState(() => getReflection(profileId, mode, lessonId));
  const [status, setStatus] = useState('');
  const variant = Array.from(lessonId).reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % invitations.length;
  const prompt = invitations[variant][mode === 'junior' ? 0 : 1];
  const challenge = variant === 0
    ? lesson.reviewCards.slice(1).find((q) => q.type === 'mcq' && (!q.modes || q.modes.includes(mode)))
    : undefined;
  const challengeAnswer = challenge?.type === 'mcq'
    ? challenge.choices.find((c) => c.id === challenge.answer)
    : undefined;
  function store(value: string) {
    const saved = saveReflection(profileId, mode, lessonId, value);
    setText(value.trim());
    setStatus(saved ? (value.trim() ? 'Tersimpan di perangkat ini.' : 'Catatan dihapus.') : 'Tersimpan selama halaman ini terbuka.');
  }
  return (
    <fieldset className="pw-card min-w-0 space-y-3 p-4">
      <legend className="px-1 font-bold">Refleksi (opsional)</legend>
      {mode === 'junior' ? (
        <>
          <p className="pw-body m-0">{prompt}</p>
          <div className="flex flex-wrap gap-2">
            {choices.map(({ id, label, Icon }) => (
              <button key={id} type="button" aria-pressed={text === id}
                className="pw-pressable flex min-h-11 items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--line)] px-3 aria-pressed:bg-[var(--world-50)] aria-pressed:border-[var(--world-700)]"
                onClick={() => store(text === id ? '' : id)}>
                <Icon size={20} aria-hidden="true" />{label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <label htmlFor="reflection-note" className="block">{prompt}</label>
          <textarea id="reflection-note" rows={2} maxLength={240} value={text}
            onChange={(event) => { setText(event.target.value); setStatus(''); }}
            className="block w-full rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--paper)] p-3" />
          <Button variant="secondary" onClick={() => store(text)}>Simpan catatan</Button>
        </>
      )}
      <span role="status" className="pw-small block">{status}</span>
      {challenge && challengeAnswer && (
        <div className="border-t border-[var(--line)] pt-3">
          <p className="pw-small font-bold">{mode === 'junior' ? 'Coba ingat tanpa melihat' : 'Coba jawab dari ingatan'}</p>
          <p className="pw-body">{resolveTxt(challenge.prompt, mode)}</p>
          <details>
            <summary className="min-h-11 cursor-pointer py-3 font-bold">Lihat jawabannya</summary>
            <p className="pw-body font-bold">{resolveTxt(challengeAnswer.label, mode)}</p>
            <p className="pw-body">{resolveTxt(challenge.explainCorrect, mode)}</p>
          </details>
        </div>
      )}
    </fieldset>
  );
}
