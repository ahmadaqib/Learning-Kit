import { useCallback, useEffect, useRef, useState } from 'react';
import { CircleHelp, Square, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { DialogModal } from '@/components/ui/DialogModal';
import { PET_AI_TIP_IDS, type PetHintCue, type PetHintRequest, type PetHintResponse, type PetId, type PetPersonality } from '@/content/petContract';
import { getExtraPetTip, getPetId, getPetPersonality, getPetTip, PET_DETAILS, type PetContext } from '@/content/petTips';
import type { Mode } from '@/content/schema';
import { canSpeakCompanion, isQueuePlaying, speakCompanion, stopCompanionSpeaking } from '@/engine/readAloud';
import type { PetOffer } from '@/engine/usePetLessonOffer';
import { useAppStore } from '@/store/useAppStore';
import { PetPortrait } from './PetPortrait';
import type { PetMotion } from './usePetMotion';

interface PetLauncherProps {
  context: PetContext;
  studyGuide?: string;
  studyExercise?: string;
  compact?: boolean;
  offer?: PetOffer;
  arrival?: PetMotion['arrival'];
  pauseMotion?: boolean;
  onLaunch?: () => void;
  onQuestionHint?: () => void;
}

type AiState = 'idle' | 'loading' | 'unavailable' | PetHintResponse;

const AI_TIMEOUT_MS = 23_000;

function parseTip(payload: unknown): PetHintResponse | undefined {
  if (!payload || typeof payload !== 'object' || !('tipId' in payload)) return undefined;
  const tipId = PET_AI_TIP_IDS.find((id) => id === payload.tipId);
  if (!tipId || !('source' in payload) || (payload.source !== 'live' && payload.source !== 'prepared')) return undefined;
  return { tipId, source: payload.source };
}

export function PetLauncher(props: PetLauncherProps) {
  const mode = useAppStore((s) => s.profiles[s.activeProfileId]?.mode);
  const settings = useAppStore((s) => s.profiles[s.activeProfileId]?.settings);
  const profileId = useAppStore((s) => s.activeProfileId);
  if (!mode || !settings || settings.petHidden === true) return null;
  const petId = getPetId(settings.petId);

  return (
    <PetPanel
      {...props}
      key={`${profileId}:${mode}:${petId}`}
      mode={mode}
      petId={petId}
      personality={getPetPersonality(mode, settings.petPersonality)}
      muted={settings.petMuted === true}
    />
  );
}

function PetPanel({
  context,
  studyGuide,
  studyExercise,
  compact = false,
  offer,
  arrival = 'greet',
  pauseMotion = false,
  onLaunch,
  onQuestionHint,
  mode,
  petId,
  personality,
  muted,
}: PetLauncherProps & {
  mode: Mode;
  petId: PetId;
  personality: PetPersonality;
  muted: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [ai, setAi] = useState<AiState>('idle');
  const [speaking, setSpeaking] = useState(false);
  const [voiceIssue, setVoiceIssue] = useState<'reader' | 'unavailable' | null>(null);
  const pendingQuestionHint = useRef(false);
  const request = useRef<AbortController | null>(null);
  const speakingHere = useRef(false);
  const openedFrom = useRef<PetHintCue>('requested');
  const name = PET_DETAILS[petId].name;

  const stopSpeech = useCallback(() => {
    if (!speakingHere.current) return;
    speakingHere.current = false;
    stopCompanionSpeaking();
  }, []);

  useEffect(() => () => {
    const pending = request.current;
    request.current = null;
    pending?.abort();
    stopSpeech();
  }, [stopSpeech]);

  const close = () => {
    const pending = request.current;
    request.current = null;
    pending?.abort();
    stopSpeech();
    setSpeaking(false);
    setOpen(false);
    setAi('idle');
    setVoiceIssue(null);
    if (pendingQuestionHint.current) {
      pendingQuestionHint.current = false;
      onQuestionHint?.();
    }
  };

  const localTip = getPetTip(context, mode, personality);
  const tipId = typeof ai === 'object' ? ai.tipId : undefined;
  const extraTip = context.surface === 'lesson' && tipId ? getExtraPetTip(context.stepKind, tipId) : undefined;
  const spokenTip = extraTip ?? studyExercise ?? localTip;
  const canSpeak = !muted && canSpeakCompanion(spokenTip);
  const canAskAi = mode === 'pro' && context.surface === 'lesson';

  const toggleSpeech = () => {
    if (speaking) {
      stopSpeech();
      setSpeaking(false);
      return;
    }
    setVoiceIssue(null);
    speakingHere.current = true;
    const started = speakCompanion(spokenTip, (completed) => {
      if (!speakingHere.current) return;
      speakingHere.current = false;
      setSpeaking(false);
      if (!completed) setVoiceIssue('unavailable');
    });
    setSpeaking(started && speakingHere.current);
    if (!started) {
      speakingHere.current = false;
      setVoiceIssue(isQueuePlaying() ? 'reader' : 'unavailable');
    }
  };

  const askAi = async () => {
    if (!canAskAi || context.surface !== 'lesson' || request.current || tipId) return;
    const controller = new AbortController();
    request.current = controller;
    setAi('loading');
    const timeout = window.setTimeout(() => controller.abort(), AI_TIMEOUT_MS);
    const body: PetHintRequest = {
      worldId: context.worldId,
      topicId: context.topicId,
      stepKind: context.stepKind,
      personality,
      intent: 'study_hint',
      cue: openedFrom.current,
    };

    try {
      const response = await fetch('/api/companion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        signal: controller.signal,
        body: JSON.stringify(body),
      });
      const id = response.ok ? parseTip(await response.json()) : undefined;
      if (request.current === controller) setAi(id ?? 'unavailable');
    } catch {
      if (request.current === controller) setAi('unavailable');
    } finally {
      window.clearTimeout(timeout);
      if (request.current === controller) request.current = null;
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label={offer ? `Buka ${name}, ada tawaran petunjuk` : `Buka ${name}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        data-sfx={muted ? 'off' : undefined}
        onClick={() => {
          openedFrom.current = offer ?? 'requested';
          onLaunch?.();
          setOpen(true);
        }}
        className={`pw-pressable no-print pointer-events-auto inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center rounded-full border bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--world-700)] ${offer ? 'border-[var(--world-700)]' : 'border-[var(--line-strong)]'} ${compact ? 'w-12' : 'pr-3'}`}
      >
        <span className="relative grid place-items-center">
          <PetPortrait
            petId={petId}
            size={compact ? 46 : 52}
            motion={{ arrival, reaction: offer ? 'offer' : undefined, ambient: true, suspended: open || pauseMotion }}
          />
          {offer && <CircleHelp aria-hidden="true" size={16} className="pointer-events-none absolute right-0 top-0 rounded-full bg-[var(--paper)] text-[var(--world-700)]" />}
        </span>
        {!compact && <span className="pw-small font-extrabold">{name}</span>}
      </button>
      {compact && <span role="status" className="sr-only">{offer ? `${name} punya petunjuk jika kamu ingin membukanya.` : ''}</span>}

      <DialogModal open={open} onClose={close} title={name} soundless={muted}>
        {open && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 sm:gap-4">
              <PetPortrait petId={petId} size={86} motion={{ arrival: 'engage', reaction: speaking ? 'talk' : undefined }} />
              <p className="pw-body m-0 min-w-0">{localTip}</p>
            </div>

            {studyGuide && <div className="space-y-1">
              <p className="pw-small m-0 font-extrabold">Coba di kartu ini</p>
              <p className="pw-body m-0">{studyGuide}</p>
            </div>}

            {context.surface === 'question' && context.hasHint && onQuestionHint && (
              <Button
                variant="secondary"
                onClick={() => {
                  pendingQuestionHint.current = true;
                  setOpen(false);
                }}
              >
                Buka petunjuk soal
              </Button>
            )}

            {canAskAi && (
              <div className="space-y-2 border-t border-[var(--line)] pt-3">
                <p className="pw-small m-0 text-[var(--ink-2)]">
                  Untuk memilih strategi, pet dapat mengirim judul pelajaran, jenis kartu, gaya pet, dan alasan bantuan ke TokenPortal.
                </p>
                <Button
                  variant="secondary"
                  aria-disabled={ai === 'loading' || Boolean(extraTip)}
                  tabIndex={extraTip ? -1 : undefined}
                  className="aria-disabled:cursor-default aria-disabled:opacity-70"
                  onClick={askAi}
                >
                  {ai === 'loading' ? 'Memilih petunjuk…' : extraTip ? 'Petunjuk dipilih' : 'Petunjuk AI'}
                </Button>
                <div role="status" className="space-y-1">
                  {extraTip && (
                    <>
                      <p className="pw-small m-0 font-extrabold">{typeof ai === 'object' && ai.source === 'prepared' ? 'Pilihan AI untuk materi ini · tersimpan' : 'Petunjuk pilihan AI'}</p>
                      <p className="pw-body m-0">{extraTip}</p>
                    </>
                  )}
                  {ai === 'unavailable' && (
                    <p className="pw-small m-0 text-[var(--ink-2)]">
                      Petunjuk AI belum tersedia. Petunjuk {name} di atas bisa langsung dipakai.
                    </p>
                  )}
                </div>
              </div>
            )}

            <p role="status" className={voiceIssue ? 'pw-small m-0 text-[var(--ink-2)]' : 'sr-only'}>
              {voiceIssue === 'reader' && 'Tunggu sampai bacaan pelajaran selesai.'}
              {voiceIssue === 'unavailable' && `Suara ${name} sedang tidak tersedia.`}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[var(--line)] pt-2">
              {canSpeak && (
                <Button variant="ghost" onClick={toggleSpeech} data-sfx="off">
                  {speaking ? <Square size={16} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
                  {speaking ? 'Hentikan suara' : `Dengarkan ${name}`}
                </Button>
              )}
              <Link
                to="/pengaturan#pet"
                className="pw-pressable inline-flex min-h-11 items-center rounded-[var(--radius-sm)] px-2 font-bold text-[var(--world-700)] underline decoration-dotted underline-offset-4"
              >
                Pengaturan hewan
              </Link>
            </div>
          </div>
        )}
      </DialogModal>
    </>
  );
}
