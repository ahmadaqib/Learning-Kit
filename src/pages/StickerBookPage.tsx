import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Sparkles, TriangleAlert } from 'lucide-react';
import { COLLECTION_LABEL } from '@/app/modeConfig';
import { STICKERS } from '@/content/stickers';
import { resolveTxt, type Sticker } from '@/content/schema';
import { WORLD_METAS } from '@/content/worldMeta';
import { hasSeen, isPrimed, markSeen } from '@/engine/seen';
import { playSound } from '@/engine/sound';
import { useAppStore } from '@/store/useAppStore';
import { WorldIslandIllustration } from '@/components/illustrations/ConceptVisuals';
import { Bito } from '@/components/mascot/Bito';
import { QuestionRenderer } from '@/components/questions/QuestionRenderer';
import { Button } from '@/components/ui/Button';
import { DialogModal } from '@/components/ui/DialogModal';
import { StickerCard } from '@/components/ui/StickerCard';

const TRACKS = [
  { id: 'A', title: 'Jalur A — Membangun Tampilan' },
  { id: 'B', title: 'Jalur B — Aplikasi Saling Bicara' },
] as const;

const LESSON_TITLE = new Map(
  WORLD_METAS.flatMap((w) => [...w.lessons, ...w.sideQuests]).map((l) => [l.id, l] as const),
);

/** "a01" becomes "A1". Shown in Pro only (spec 7). */
function worldCode(id: string): string {
  return id.replace(/^([a-z])0*(\d+)$/i, (_m, letter: string, n: string) => `${letter.toUpperCase()}${n}`);
}

const EmptyNote: React.FC<{ text: string }> = ({ text }) => (
  <div className="pw-well flex items-center gap-4">
    {/* M46: a slow breath, three cycles, then still */}
    <div className="pw-fx-breathe flex-shrink-0">
      <Bito expression="sleep" size={96} />
    </div>
    <p className="pw-body">{text}</p>
  </div>
);

export const StickerBookPage: React.FC = () => {
  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);
  const [activeSticker, setActiveSticker] = useState<Sticker | null>(null);
  const [answer, setAnswer] = useState<unknown>(undefined);
  const [quizResult, setQuizResult] = useState<{ ok: boolean; text: string } | null>(null);
  /** Bumped after a first flip so the "baru!" note re-reads the seen flags. */
  const [seenTick, setSeenTick] = useState(0);
  /** Gold stickers whose one-time sheen has started on this page. */
  const [sheenIds, setSheenIds] = useState<ReadonlySet<string>>(() => new Set());
  const pageRef = useRef<HTMLDivElement>(null);

  const profileId = profile?.id;
  const mode = profile?.mode ?? 'junior';
  const stickersKey = profile ? profile.stickers.join(',') : '';

  // Owned stickers and stickers this mode can still earn. A Pro-only lesson never awards a Petualang sticker.
  const visible = useMemo(() => {
    const owned = new Set(stickersKey ? stickersKey.split(',') : []);
    return STICKERS.filter(
      (st) => owned.has(st.id) || LESSON_TITLE.get(st.lessonId)?.modes.includes(mode) !== false,
    );
  }, [stickersKey, mode]);

  /** "baru!" shows only when the seen flags were primed for this profile, so an old collection is not all "new". */
  const unflipped = useMemo(() => {
    const out = new Set<string>();
    if (!profileId || !isPrimed(profileId)) return out;
    for (const id of stickersKey ? stickersKey.split(',') : []) {
      if (!hasSeen(profileId, `flip:${id}`)) out.add(id);
    }
    return out;
    // seenTick re-reads the flags after a flip
  }, [profileId, stickersKey, seenTick]);

  const goldKey = profile
    ? visible
        .filter((st) => profile.stickers.includes(st.id) && profile.lessons[st.lessonId]?.stars === 3)
        .map((st) => st.id)
        .join(',')
    : '';

  // The gold sheen plays once per sticker (key gold:{id}), the first time the card is on screen
  useEffect(() => {
    const root = pageRef.current;
    if (!root || !profileId) return undefined;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-gold-id]'));
    const reveal = (id: string) => {
      if (hasSeen(profileId, `gold:${id}`)) return;
      markSeen(profileId, `gold:${id}`);
      setSheenIds((prev) => new Set(prev).add(id));
    };
    if (typeof IntersectionObserver === 'undefined') {
      nodes.forEach((n) => n.dataset.goldId && reveal(n.dataset.goldId));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = (entry.target as HTMLElement).dataset.goldId;
          io.unobserve(entry.target);
          if (id) reveal(id);
        }
      },
      { threshold: 0.6 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [profileId, goldKey]);

  if (!profile) return null;

  const label = COLLECTION_LABEL[mode];
  const pro = mode === 'pro';
  const owned = new Set(profile.stickers);
  const ownedCount = visible.filter((st) => owned.has(st.id)).length;

  const openQuiz = (st: Sticker) => {
    setActiveSticker(st);
    setAnswer(undefined);
    setQuizResult(null);
  };

  const emptyLine = pro
    ? `Belum ada ${label.unit} di sini. Selesaikan pelajaran untuk membukanya.`
    : `Belum ada ${label.unit} di sini. Selesaikan satu pelajaran untuk mendapat ${label.unit} pertamamu.`;

  const renderGrid = (items: Sticker[]) => (
    <ul className="grid list-none grid-cols-2 gap-3 p-0 min-[480px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5">
      {items.map((st, idx) => {
        const isOwned = owned.has(st.id);
        const lesson = LESSON_TITLE.get(st.lessonId);
        const gold = isOwned && profile.lessons[st.lessonId]?.stars === 3;
        return (
          <li key={st.id} className="relative" data-gold-id={gold ? st.id : undefined}>
            <StickerCard
              title={st.title}
              conceptName={st.concept}
              art={
                <span className="grid place-items-center">
                  <WorldIslandIllustration worldId={st.worldId} size={64} />
                </span>
              }
              badge={isOwned && unflipped.has(st.id) && (
                <span
                  className={`inline-flex items-center gap-1 rounded-full border-2 border-[var(--star)] bg-[var(--star-50)] px-2 py-0.5 text-xs font-extrabold text-[var(--star-700)] ${
                    pro ? 'font-mono' : ''
                  }`}
                >
                  {!pro && <Sparkles className="h-3 w-3" aria-hidden="true" />}
                  {pro ? '// baru' : 'baru!'}
                </span>
              )}
              summary={resolveTxt(st.summary, mode)}
              finish={gold ? 'gold' : 'plain'}
              locked={!isOwned}
              lockedHint={lesson ? `Dari pelajaran: ${lesson.title}` : undefined}
              index={idx}
              sheen={gold && sheenIds.has(st.id)}
              onFlip={(flipped) => {
                if (!flipped || !isOwned) return;
                markSeen(profile.id, `flip:${st.id}`);
                setSeenTick((t) => t + 1);
              }}
              className="[&_.pw-flip-front]:min-h-[11.5rem]"
            />
            {isOwned && (
              <button
                type="button"
                onClick={() => openQuiz(st)}
                className="pw-t-colors pw-small mt-1 min-h-11 w-full cursor-pointer rounded-[var(--radius-sm)] font-bold text-[var(--world-700)] underline underline-offset-4 hover:bg-[var(--world-50)]"
              >
                {pro ? 'Kuis' : 'Uji aku'}
                <span className="visually-hidden"> tentang {st.title}</span>
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div ref={pageRef} className="mx-auto max-w-[1080px] space-y-[var(--gap-group)] px-4 py-6 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="pw-h1">{label.title}</h1>
          <p className="pw-small text-[var(--ink-2)]">
            {pro
              ? 'Ketuk kartu untuk membaca ringkasan analoginya.'
              : 'Ketuk stiker untuk membaliknya dan baca ceritanya.'}
          </p>
        </div>
        <span className="pw-small rounded-full bg-[var(--world-50)] px-4 py-1.5 font-extrabold text-[var(--world-700)]">
          {ownedCount} dari {visible.length} {label.unit}
        </span>
      </header>

      {ownedCount === 0 && <EmptyNote text={emptyLine} />}

      {TRACKS.map((track) => {
        const items = visible.filter((st) => WORLD_METAS.find((w) => w.id === st.worldId)?.track === track.id);
        const trackOwned = items.filter((st) => owned.has(st.id)).length;
        const worlds = WORLD_METAS.filter((w) => w.track === track.id).sort((a, b) => a.order - b.order);
        return (
          <section key={track.id} aria-labelledby={`track-${track.id}`} className="space-y-[var(--gap-stack)]">
            <h2 id={`track-${track.id}`} className="pw-h2">
              {track.title}
            </h2>
            {ownedCount > 0 && trackOwned === 0 && <EmptyNote text={emptyLine} />}
            {worlds.map((w) => {
              const list = items.filter((st) => st.worldId === w.id);
              if (list.length === 0) return null;
              const have = list.filter((st) => owned.has(st.id)).length;
              return (
                <div key={w.id} className="space-y-2">
                  <h3 className="pw-h3 flex flex-wrap items-baseline justify-between gap-x-3">
                    <span>{pro ? `${worldCode(w.id)} · ${w.title}` : w.title}</span>
                    <span className="pw-small font-bold text-[var(--ink-2)]">
                      {have} dari {list.length}
                    </span>
                  </h3>
                  {renderGrid(list)}
                </div>
              );
            })}
          </section>
        );
      })}

      <DialogModal
        open={Boolean(activeSticker)}
        onClose={() => setActiveSticker(null)}
        title={activeSticker ? activeSticker.title : label.title}
        variant="sheet"
      >
        {activeSticker && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-[var(--radius-md)] bg-[var(--cream)] p-4">
              <WorldIslandIllustration worldId={activeSticker.worldId} size={64} />
              <div className="min-w-0">
                <div className="pw-kicker">{activeSticker.concept}</div>
                <p className="pw-body mt-1">{resolveTxt(activeSticker.summary, mode)}</p>
              </div>
            </div>
            <h3 className="pw-prompt">{resolveTxt(activeSticker.quizQuestion.prompt, mode)}</h3>
            <QuestionRenderer
              question={activeSticker.quizQuestion}
              mode={mode}
              value={answer}
              onChange={setAnswer}
              disabled={Boolean(quizResult)}
            />
            {quizResult && (
              <div
                role="status"
                className={`flex items-start gap-2 rounded-[var(--radius-md)] p-3 font-bold text-[var(--ink)] ${
                  quizResult.ok ? 'bg-[var(--ok-50)]' : 'bg-[var(--warn-50)]'
                }`}
              >
                {quizResult.ok ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--ok-600)]" aria-hidden="true" />
                ) : (
                  <TriangleAlert className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--warn-700)]" aria-hidden="true" />
                )}
                <span className="pw-small">{quizResult.text}</span>
              </div>
            )}
            {!quizResult ? (
              <Button
                variant="primary"
                fullWidth
                disabled={!answer}
                onClick={() => {
                  const q = activeSticker.quizQuestion;
                  const ok = 'answer' in q && answer === q.answer;
                  playSound(ok ? 'correct' : 'incorrect', profile.settings.soundEnabled);
                  const explain = resolveTxt(q.explainCorrect, mode);
                  setQuizResult({
                    ok,
                    text: ok ? explain : `${pro ? 'Belum tepat.' : 'Belum pas.'} ${explain}`,
                  });
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
      </DialogModal>
    </div>
  );
};
