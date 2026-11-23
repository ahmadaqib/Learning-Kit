import { useEffect, type RefObject } from 'react';
import { getMotionPrefs } from './prefs';

const FOLLOW = 0.18; // fraction of the remaining distance covered per frame
const SETTLED_PX = 0.5;

/**
 * M03: a soft highlight that follows the pointer over an owned sticker card. Pointer devices only
 * (hover: hover and pointer: fine), tier `full` only.
 *
 * The host element carries `.pw-sheen-host` and contains one child `.pw-sheen-blob`. This hook moves that one
 * child with `style.transform` (a custom property on the parent would recalculate every descendant on
 * each pointer move) and toggles `data-sheen="on"` on the host so CSS fades the blob in and out.
 * The frame loop runs only while the pointer is over the host and stops once the blob has settled.
 */
export function useSheen(hostRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    if (getMotionPrefs().tier !== 'full') return undefined;
    const blob = host.querySelector<HTMLElement>('.pw-sheen-blob');
    if (!blob) return undefined;

    let frame = 0;
    let hovering = false;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let placed = false;

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const aim = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      targetX = event.clientX - rect.left - blob.offsetWidth / 2;
      targetY = event.clientY - rect.top - blob.offsetHeight / 2;
      if (!placed) {
        x = targetX;
        y = targetY;
        placed = true;
        blob.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const step = () => {
      frame = 0;
      if (!hovering || document.hidden) return;
      x += (targetX - x) * FOLLOW;
      y += (targetY - y) * FOLLOW;
      blob.style.transform = `translate(${x}px, ${y}px)`;
      if (Math.abs(targetX - x) > SETTLED_PX || Math.abs(targetY - y) > SETTLED_PX) {
        frame = requestAnimationFrame(step);
      }
    };

    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      hovering = true;
      placed = false;
      aim(event);
      host.dataset.sheen = 'on';
      if (!frame) frame = requestAnimationFrame(step);
    };
    const onMove = (event: PointerEvent) => {
      if (!hovering) return;
      aim(event);
      if (!frame) frame = requestAnimationFrame(step);
    };
    const onLeave = () => {
      hovering = false;
      stop();
      delete host.dataset.sheen;
    };

    host.addEventListener('pointerenter', onEnter);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    return () => {
      host.removeEventListener('pointerenter', onEnter);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      stop();
      delete host.dataset.sheen;
    };
  }, [hostRef]);
}
