import { useEffect, useRef, useState } from 'react';
import type { PetHintCue } from '@/content/petContract';

export type PetOffer = Exclude<PetHintCue, 'requested'>;

const OFFER_AFTER_MS = 75_000;
const COOLDOWN_MS = 120_000;
const lastOfferAt = new Map<string, number>();

function isForeground() {
  return !document.hidden && document.hasFocus();
}

export function usePetLessonOffer({
  profileId,
  stepKey,
  enabled,
  blocked,
}: {
  profileId: string;
  stepKey: string;
  enabled: boolean;
  blocked: boolean;
}) {
  const [foreground, setForeground] = useState(isForeground);
  const [offer, setOffer] = useState<{ kind: PetOffer; stepKey: string } | null>(null);
  const handled = useRef(false);
  const mistakes = useRef(0);
  const awaitingHint = useRef(false);
  const time = useRef({ stepKey, remaining: OFFER_AFTER_MS });

  useEffect(() => {
    const update = () => setForeground(isForeground());
    document.addEventListener('visibilitychange', update);
    window.addEventListener('focus', update);
    window.addEventListener('blur', update);
    return () => {
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('focus', update);
      window.removeEventListener('blur', update);
    };
  }, []);

  useEffect(() => {
    if (time.current.stepKey !== stepKey) time.current = { stepKey, remaining: OFFER_AFTER_MS };
    if (!enabled || blocked || !foreground || handled.current) return;

    const clock = time.current;
    const cooldown = (lastOfferAt.get(profileId) ?? 0) + COOLDOWN_MS - Date.now();
    const wait = Math.max(cooldown, awaitingHint.current ? 0 : clock.remaining);
    const startedAt = performance.now();
    const id = window.setTimeout(() => {
      if (handled.current || !isForeground()) return;
      handled.current = true;
      lastOfferAt.set(profileId, Date.now());
      setOffer({ kind: awaitingHint.current ? 'stuck' : 'taking_time', stepKey });
    }, wait);

    return () => {
      window.clearTimeout(id);
      clock.remaining = Math.max(0, clock.remaining - (performance.now() - startedAt));
    };
  }, [enabled, blocked, foreground, profileId, stepKey]);

  return {
    offer: enabled && !blocked && foreground && offer?.stepKey === stepKey ? offer.kind : undefined,
    dismiss() {
      handled.current = true;
      setOffer(null);
    },
    recordAttempt(correct: boolean) {
      mistakes.current = correct || !enabled ? 0 : mistakes.current + 1;
      awaitingHint.current = mistakes.current >= 2;
    },
  };
}
