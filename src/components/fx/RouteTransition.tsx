import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { finishFly } from '@/motion/waapi';

/**
 * Route depth for the enter-only transition (spec 5.9.4 M11).
 * 0: `/` and `/mulai` choreograph themselves, so nothing is added there.
 * 1: bottom-nav destinations. 2: second level. 3: the lesson, boss and test flows.
 */
export function getRouteDepth(pathname: string): number {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/' || path === '/mulai') return 0;
  const first = path.split('/')[1];
  switch (first) {
    case 'beranda':
    case 'peta':
    case 'ulang':
    case 'stiker':
    case 'profil':
      return 1;
    case 'dunia':
    case 'pengaturan':
    case 'glosarium':
    case 'pendamping':
      return 2;
    case 'belajar':
    case 'penjaga':
    case 'tes':
      return 3;
    default:
      return 1;
  }
}

export type RouteVariant = 'rise' | 'fade' | 'none';

/**
 * Deeper route: opacity and an 8 px rise, 180 ms. Same depth (tab to tab): nothing. Shallower (going back):
 * opacity only, 120 ms. Pages at depth 0 add nothing. Enter only: the old page unmounts in the same frame.
 */
export function getRouteVariant(fromDepth: number, toDepth: number): RouteVariant {
  if (toDepth === 0) return 'none';
  if (toDepth > fromDepth) return 'rise';
  if (toDepth < fromDepth) return 'fade';
  return 'none';
}

interface RouteTransitionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps route content. Keyed by pathname so a route change remounts the wrapper and plays the entrance
 * from motion.css (`.pw-enter`). The wrapper carries data-rm="fade", so under reduced motion it still cross-fades
 * in 120 ms. Also lands an XP fly that is in flight when the route changes.
 */
export const RouteTransition: React.FC<RouteTransitionProps> = ({
  children,
  className = 'flex flex-1 flex-col',
}) => {
  const { pathname } = useLocation();
  const depth = getRouteDepth(pathname);
  const [state, setState] = useState<{ path: string; depth: number; variant: RouteVariant }>({
    path: pathname,
    depth,
    variant: 'none',
  });

  if (state.path !== pathname) {
    setState({ path: pathname, depth, variant: getRouteVariant(state.depth, depth) });
  }

  useEffect(() => {
    finishFly();
  }, [pathname]);

  const variant = state.path === pathname ? state.variant : 'none';

  return (
    <div
      key={pathname}
      className={`${variant === 'none' ? '' : 'pw-enter'} ${className}`.trim()}
      data-enter={variant === 'none' ? undefined : variant}
      data-rm={variant === 'none' ? undefined : 'fade'}
    >
      {children}
    </div>
  );
};
