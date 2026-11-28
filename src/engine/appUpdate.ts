import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare const __BUILD_ID__: string;

/**
 * Mobile browsers keep a tab alive for days, so learners can run an old build long after a deploy and miss
 * new menus. The build stamps /version.json; when it changes, the app reloads at a safe moment. Progress lives
 * in localStorage, so a reload loses nothing, but it never happens inside a lesson, quiz, test or review.
 */
const UNSAFE = /^\/(belajar|penjaga|tes|ulang)(\/|$)/;
const RELOAD_GUARD = 'petualang-web-reloaded-for';
const CHECK_EVERY_MS = 10 * 60_000;

export const isSafePath = (path: string) => !UNSAFE.test(path);

let updateReady = false;

/** One reload per new build, so a broken deploy can never cause a reload loop. */
export function reloadOnce(target: string, storage: Pick<Storage, 'getItem' | 'setItem'> = sessionStorage): boolean {
  try {
    if (storage.getItem(RELOAD_GUARD) === target) return false;
    storage.setItem(RELOAD_GUARD, target);
  } catch {
    return false;
  }
  window.location.reload();
  return true;
}

async function checkForUpdate(): Promise<void> {
  if (updateReady || __BUILD_ID__ === 'dev') return;
  try {
    const response = await fetch('/version.json', { cache: 'no-store', credentials: 'omit' });
    if (!response.ok) return;
    const { id } = await response.json() as { id?: unknown };
    if (typeof id === 'string' && id !== __BUILD_ID__) updateReady = true;
  } catch {
    // Offline or blocked: try again later.
  }
}

/** Mount once inside the router. */
export function useAppUpdates(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    // A page chunk from the old build is gone after a deploy: reload into the new build instead of breaking.
    const onPreloadError = (event: Event) => {
      if (reloadOnce('chunk:' + __BUILD_ID__)) event.preventDefault();
    };
    const onVisible = () => {
      if (document.visibilityState !== 'visible') return;
      void checkForUpdate().then(() => {
        if (updateReady && isSafePath(window.location.pathname)) reloadOnce('build:' + __BUILD_ID__);
      });
    };
    window.addEventListener('vite:preloadError', onPreloadError);
    document.addEventListener('visibilitychange', onVisible);
    void checkForUpdate();
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') void checkForUpdate();
    }, CHECK_EVERY_MS);
    return () => {
      window.removeEventListener('vite:preloadError', onPreloadError);
      document.removeEventListener('visibilitychange', onVisible);
      window.clearInterval(timer);
    };
  }, []);

  // Apply a waiting update on the next move to a safe page, e.g. back to the map after a lesson.
  useEffect(() => {
    if (updateReady && isSafePath(pathname)) reloadOnce('build:' + __BUILD_ID__);
  }, [pathname]);
}
