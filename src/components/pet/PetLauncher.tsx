import { useCallback, useEffect, useRef, useState } from 'react';
import { CircleHelp, Square, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { DialogModal } from '@/components/ui/DialogModal';
import { PET_AI_TIP_IDS, type PetAiTipId, type PetHintCue, type PetHintRequest, type PetId, type PetPersonality } from '@/content/petContract';
import { getExtraPetTip, getPetId, getPetPersonality, getPetTip, PET_DETAILS, type PetContext } from '@/content/petTips';
import type { Mode } from '@/content/schema';
import { canSpeakCompanion, isQueuePlaying, speakCompanion, stopCompanionSpeaking } from '@/engine/readAloud';
import type { PetOffer } from '@/engine/usePetLessonOffer';
import { getMotionPrefs } from '@/motion/prefs';
import { fx } from '@/motion/waapi';
import { useAppStore } from '@/store/useAppStore';
import { PetPortrait } from './PetPortrait';

interface PetLauncherProps {
  context: PetContext;
  compact?: boolean;
  offer?: PetOffer;
  onLaunch?: () => void;
  onQuestionHint?: () => void;
}

type AiState = 'idle' | 'loading' | 'unavailable' | PetAiTipId;

const AI_TIMEOUT_MS = 23_000;

function parseTipId(payload: unknown): PetAiTipId | undefined {
  if (!payload || typeof payload !== 'object' || !('tipId' in payload)) return undefined;
  return PET_AI_TIP_IDS.find((id) => id === payload.tipId);
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
  compact = false,
  offer,
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
  const portrait = useRef<HTMLSpanElement>(null);
  const posed = useRef(false);
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

  useEffect(() => {
    if (!offer || posed.current || !portrait.current) return;
    posed.current = true;
    if (getMotionPrefs().reduced) return;
    const pose = fx(portrait.current, [
      { transform: 'translateY(0) rotate(0deg)' },
      { transform: 'translateY(-2px) rotate(-8deg)' },
      { transform: 'translateY(0) rotate(0deg)' },
    ], { duration: 280, easing: 'ease-out' });
    return () => pose?.cancel();
  }, [offer]);

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
  const tipId = PET_AI_TIP_IDS.find((id) => id === ai);
  const extraTip = context.surface === 'lesson' && tipId ? getExtraPetTip(context.stepKind, tipId) : undefined;
  const spokenTip = extraTip ?? localTip;
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
      const id = response.ok ? parseTipId(await response.json()) : undefined;
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
        className={`pw-pressable no-print inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--world-700)] ${offer ? 'border-[var(--world-700)]' : 'border-[var(--line-strong)]'} ${compact ? 'w-11' : 'py-1 pl-1.5 pr-3'}`}
      >
        <span className="relative grid place-items-center">
          <span ref={portrait} className="grid place-items-center">
            <PetPortrait petId={petId} size={compact ? 30 : 32} />
          </span>
          {offer && <CircleHelp aria-hidden="true" size={17} className="absolute -right-1 -top-1 rounded-full bg-[var(--paper)] text-[var(--world-700)]" />}
        </span>
        {!compact && <span className="pw-small font-extrabold">{name}</span>}
      </button>
      {compact && <span role="status" className="sr-only">{offer ? `${name} punya petunjuk jika kamu ingin membukanya.` : ''}</span>}

      <DialogModal open={open} onClose={close} title={name} soundless={muted}>
        {open && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 sm:gap-4">
              <PetPortrait petId={petId} size={56} />
              <p className="pw-body m-0 min-w-0">{localTip}</p>
            </div>

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
                  Saat kamu meminta petunjuk, TokenPortal menerima judul pelajaran, jenis kartu, gaya pendamping, dan alasan bantuan ditawarkan.
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
                      <p className="pw-small m-0 font-extrabold">Petunjuk pilihan AI</p>
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
