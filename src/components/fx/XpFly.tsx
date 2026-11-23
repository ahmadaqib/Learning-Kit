import React, { useEffect, useRef } from 'react';
import { finishFly, flyTo } from '@/motion/waapi';

export interface XpFlyProps {
  /** The XP badge on the FeedbackSheet. It is cloned into #fx-layer when the fly starts. */
  from: React.RefObject<Element | null>;
  /** The header XP chip that the clone flies to. */
  to: React.RefObject<Element | null>;
  /**
   * Start a fly each time this changes to a new truthy value (use a counter that increments when the learner
   * presses "Lanjut" after a correct answer). The XP fly never plays while the explanation is on screen.
   */
  play: number | boolean | null | undefined;
  /** 2 adds the two-star trail (Junior, tier full, combo of three or more). */
  trail?: 0 | 2;
  /** Runs when the chip lands (or at once when motion is reduced): bump the counter and update the number here. */
  onArrive?: () => void;
}

/**
 * Headless driver of the XP fly (M22, spec 5.9.5 A). Renders nothing. Only one fly is in flight: a new
 * one, an unmount or a hidden document lands the current one at once and runs onArrive.
 * Route changes are handled by RouteTransition, which calls finishFly().
 */
export const XpFly: React.FC<XpFlyProps> = ({ from, to, play, trail = 0, onArrive }) => {
  const arriveRef = useRef(onArrive);
  arriveRef.current = onArrive;
  const last = useRef<XpFlyProps['play']>(play);

  useEffect(() => {
    if (play === last.current) return;
    last.current = play;
    if (!play) return;
    flyTo(from.current, to.current, { trail, onArrive: () => arriveRef.current?.() });
  }, [play, from, to, trail]);

  useEffect(() => () => finishFly(), []);

  return null;
};
