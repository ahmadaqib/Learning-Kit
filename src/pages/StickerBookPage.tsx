import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { STICKERS } from '@/content/stickers';
import { resolveTxt, type Sticker } from '@/content/schema';
import { playSound } from '@/engine/sound';
import { useAppStore } from '@/store/useAppStore';
import { WorldIslandIllustration } from '@/components/illustrations/ConceptVisuals';
import { QuestionRenderer } from '@/components/questions/QuestionRenderer';
import { Button } from '@/components/ui/Button';
import { DialogModal } from '@/components/ui/DialogModal';

export const StickerBookPage: React.FC = () => {
  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);
  const [activeSticker, setActiveSticker] = useState<Sticker | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [answer, setAnswer] = useState<unknown>(undefined);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  if (!profile) return null;

  const ownedSet = new Set(profile.stickers);
  const trackA = STICKERS.filter((s) => s.track === 'A');
  const trackB = STICKERS.filter((s) => s.track === 'B');

  const openSticker = (st: Sticker) => {
    setActiveSticker(st);
    setQuizMode(false);
    setAnswer(undefined);
    setQuizFeedback(null);
  };

  const renderGrid = (items: Sticker[]) => (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
      {items.map((st, idx) => {
        const owned = ownedSet.has(st.id);
        const tilt = [-3, 2, -1.5, 3, -2][idx % 5];
        return (
          <button
            key={st.id}
            type="button"
            disabled={!owned}
            onClick={() => owned && openSticker(st)}
            style={{ transform: owned ? `rotate(${tilt}deg)` : undefined }}
            className={`pw-card pw-pressable flex min-h-[132px] flex-col items-center justify-center gap-2 p-3 text-center ${
              owned
                ? 'border-4 border-white shadow-md cursor-pointer bg-[var(--paper)]'
                : 'bg-[var(--cream)] opacity-60 cursor-default'
            }`}
          >
            {owned ? (
              <>
                <WorldIslandIllustration worldId={st.worldId} size={64} />
                <span className="text-xs font-extrabold leading-tight text-[var(--ink)]">{st.title}</span>
              </>
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--line)] text-[var(--ink-3)]">
                  <HelpCircle className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="text-[11px] font-bold text-[var(--ink-3)]">Belum didapat</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="mx-auto max-w-[1080px] px-4 py-6 sm:px-6 space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="pw-h1">Buku Stiker Analogi</h1>
          <p className="pw-small text-[var(--ink-2)]">
            Ketuk stiker yang sudah kamu kumpulkan untuk mengulang ceritanya.
          </p>
        </div>
        <span className="rounded-full bg-[var(--world-50)] px-4 py-1.5 font-extrabold text-[var(--world-700)]">
          {profile.stickers.length} / {STICKERS.length} stiker
        </span>
      </header>

      <section className="space-y-3">
        <h2 className="pw-h2">Jalur A — Membangun Tampilan</h2>
        {renderGrid(trackA)}
      </section>

      <section className="space-y-3">
        <h2 className="pw-h2">Jalur B — Aplikasi Saling Bicara</h2>
        {renderGrid(trackB)}
      </section>

      <DialogModal
        open={Boolean(activeSticker)}
        onClose={() => setActiveSticker(null)}
        title={activeSticker ? activeSticker.title : 'Stiker'}
        variant="sheet"
      >
        {activeSticker && (
          <div className="space-y-4">
            {!quizMode ? (
              <>
                <div className="flex items-center gap-4 rounded-xl bg-[var(--cream)] p-4">
                  <WorldIslandIllustration worldId={activeSticker.worldId} size={80} />
                  <div>
                    <div className="pw-kicker">{activeSticker.concept}</div>
                    <p className="pw-body mt-1">{resolveTxt(activeSticker.summary, profile.mode)}</p>
                  </div>
                </div>
                <Button variant="primary" fullWidth onClick={() => setQuizMode(true)}>
                  Uji aku tentang stiker ini! →
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <h3 className="pw-h3">{resolveTxt(activeSticker.quizQuestion.prompt, profile.mode)}</h3>
                <QuestionRenderer
                  question={activeSticker.quizQuestion}
                  mode={profile.mode}
                  value={answer}
                  onChange={setAnswer}
                  disabled={Boolean(quizFeedback)}
                />
                {quizFeedback && (
                  <div className="rounded-xl bg-[var(--ok-50)] p-3 text-sm font-bold text-[var(--ink)]">
                    {quizFeedback}
                  </div>
                )}
                {!quizFeedback ? (
                  <Button
                    variant="primary"
                    fullWidth
                    disabled={!answer}
                    onClick={() => {
                      const q = activeSticker.quizQuestion;
                      const ok = 'answer' in q && answer === q.answer;
                      playSound(ok ? 'correct' : 'incorrect', profile.settings.soundEnabled);
                      setQuizFeedback(
                        ok
                          ? resolveTxt(q.explainCorrect, profile.mode)
                          : `Hampir! ${resolveTxt(q.explainCorrect, profile.mode)}`,
                      );
                    }}
                  >
                    Periksa
                  </Button>
                ) : (
                  <Button variant="secondary" fullWidth onClick={() => setActiveSticker(null)}>
                    Tutup
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </DialogModal>
    </div>
  );
};
