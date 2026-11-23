import React, { Suspense, useEffect, useRef } from 'react';
import { BookOpen, Heart, Home, Layers, Map as MapIcon, User } from 'lucide-react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { COLLECTION_LABEL } from '@/app/modeConfig';
import { BrandLogo } from '@/components/mascot/BrandLogo';
import { CelebrationHost } from '@/components/celebrate/CelebrationHost';
import { PageLoader } from '@/components/fx/PageLoader';
import { RouteTransition } from '@/components/fx/RouteTransition';
import { LESSON_STUBS, WORLD_STUBS, getPathCount, pathSeenKey } from '@/components/map/MapPath';
import { WORLD_META_BY_ID } from '@/content/worldMeta';
import type { Profile } from '@/content/schema';
import { useDueReviewCount } from '@/content/reviewCards';
import { formatLocalDate } from '@/engine/date';
import { primeSeen } from '@/engine/seen';
import { applyReadingComfort } from '@/engine/readingComfort';
import { isLessonUnlocked, isWorldUnlocked } from '@/engine/unlock';
import { useAppStore } from '@/store/useAppStore';

interface AppShellProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

/**
 * Everything the learner can already see is "seen" for good, so no reveal replays for an existing profile:
 * unlocked worlds and lessons, the path as far as it goes, and every sticker already owned. Only the first call
 * per profile has an effect (seen.ts).
 */
function collectSeenKeys(profile: Profile): string[] {
  const keys: string[] = [];
  for (const world of WORLD_STUBS) {
    const meta = WORLD_META_BY_ID[world.id];
    keys.push(pathSeenKey(world.id, 0), pathSeenKey(world.id, getPathCount(meta, profile).count));
    if (!isWorldUnlocked(world, profile, WORLD_STUBS)) continue;
    keys.push(`unlock:world:${world.id}`);
    if (!profile.assessments[world.id]?.pre) continue;
    for (const lessonId of [...world.lessons, ...world.sideQuests]) {
      if (isLessonUnlocked(lessonId, world, LESSON_STUBS, profile, WORLD_STUBS)) keys.push(`unlock:lesson:${lessonId}`);
    }
  }
  for (const stickerId of profile.stickers) {
    keys.push(`flip:${stickerId}`, `gold:${stickerId}`);
  }
  return keys;
}

/** Routes where the creator note stays away so the screen keeps one focus. */
const FOCUS_ROUTES = ['/belajar', '/penjaga', '/tes'];

export const AppShell: React.FC<AppShellProps> = ({ children, hideNav = false }) => {
  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);
  const location = useLocation();
  const dueCount = useDueReviewCount(hideNav ? undefined : profile, formatLocalDate());
  const profileId = profile?.id;

  // Must happen before the pages below render their first frame: a reveal reads seen.ts while it renders.
  // primeSeen only has an effect the first time for a profile, so repeating it is harmless.
  const primedFor = useRef<string | null>(null);
  if (profile && primedFor.current !== profile.id) {
    primedFor.current = profile.id;
    primeSeen(profile.id, collectSeenKeys(profile));
  }

  // "Teks nyaman dibaca" follows the active profile
  useEffect(() => {
    if (profileId) applyReadingComfort(profileId);
  }, [profileId]);

  // Sinkronisasi atribut root untuk tema, ukuran teks, mode Junior/Pro, dan animasi
  useEffect(() => {
    if (!profile) return;
    const root = document.documentElement;
    root.dataset.mode = profile.mode;
    root.dataset.reducedMotion = profile.settings.reducedMotion;
    const scaleNum = profile.settings.textScale / 100;
    root.style.setProperty('--text-scale', String(scaleNum));

    const meta = document.querySelector('meta[name="color-scheme"]');
    if (profile.settings.theme === 'dark') {
      meta?.setAttribute('content', 'dark');
      root.dataset.theme = 'dark';
    } else if (profile.settings.theme === 'light') {
      meta?.setAttribute('content', 'light');
      root.dataset.theme = 'light';
    } else {
      meta?.setAttribute('content', 'light dark');
      const sysDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      root.dataset.theme = sysDark ? 'dark' : 'light';
    }
  }, [profile]);

  const collection = COLLECTION_LABEL[profile?.mode ?? 'junior'];
  const navItems = [
    { to: '/beranda', label: 'Beranda', icon: Home, badge: 0 },
    { to: '/peta/A', label: 'Peta', icon: MapIcon, badge: 0 },
    { to: '/ulang', label: 'Ulang', icon: Layers, badge: dueCount },
    { to: '/stiker', label: collection.nav, icon: BookOpen, badge: 0 },
    { to: '/profil', label: 'Profil', icon: User, badge: 0 },
  ];

  const isNavActive = (to: string) => {
    if (to.startsWith('/peta')) return location.pathname.startsWith('/peta') || location.pathname.startsWith('/dunia');
    return location.pathname === to;
  };

  const showWatermark = !FOCUS_ROUTES.some((p) => location.pathname === p || location.pathname.startsWith(`${p}/`));

  const creatorWatermark = showWatermark && profile?.mode === 'pro' ? (
    <footer className="no-print mt-auto flex justify-center px-4 py-4">
      <a
        href="https://github.com/ahmadaqib"
        target="_blank"
        rel="noopener noreferrer"
        className="pw-note pw-pressable inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3.5 hover:text-[var(--ink)]"
      >
        <span>Dibuat dengan</span>
        <Heart className="h-4 w-4 fill-[var(--err-500)] text-[var(--err-500)]" aria-label="cinta" role="img" />
        <span>oleh</span>
        <span className="text-[var(--world-700)] underline decoration-dotted underline-offset-2">ahmadaqib</span>
      </a>
    </footer>
  ) : null;

  const showNav = !hideNav && Boolean(profile);
  const badgeLabel = (n: number) => `${n} kartu jatuh tempo`;

  // One tree for both variants. `main` and the route wrapper keep their place when a learner moves between a screen
  // with navigation and one without, so RouteTransition still knows where it came from (M11).
  return (
    <div className={showNav ? 'pw-shell' : 'flex min-h-[100dvh] flex-col'}>
      <a href="#main-content" className="skip-link visually-hidden rounded bg-[var(--ink)] px-4 py-2 text-[var(--paper)]">
        Langsung ke isi utama
      </a>

      {/* Rel samping untuk iPad mendatar dan desktop (>= 1024px / pendek landscape) */}
      {showNav ? (
        <aside className="pw-side-rail no-print">
          <Link
            to="/beranda"
            aria-label="Beranda Petualang Web"
            className="pw-pressable group mb-2 flex flex-col items-center gap-1 rounded-[var(--radius-md)] px-1.5 py-1"
          >
            <span className="pw-poster inline-flex rounded-[var(--radius-lg)] p-1.5">
              <BrandLogo size={40} />
            </span>
            <span className="text-[10px] font-extrabold tracking-tight text-[var(--ink-2)] group-hover:text-[var(--ink)]">
              Petualang
            </span>
          </Link>
          <nav aria-label="Navigasi utama samping" className="flex w-full flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isNavActive(item.to);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className={`pw-pressable relative flex flex-col items-center justify-center gap-1 rounded-[var(--radius-md)] py-2.5 text-[11px] font-bold ${
                    active ? 'bg-[var(--world-50)] text-[var(--world-700)]' : 'text-[var(--ink-2)] hover:bg-[var(--paper-2)]'
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span
                      aria-label={badgeLabel(item.badge)}
                      className="absolute right-1.5 top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--star)] px-1 text-[11px] font-extrabold leading-none text-[var(--on-star)]"
                    >
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </aside>
      ) : null}

      <main id="main-content" tabIndex={-1} className={showNav ? 'pw-main-with-nav' : 'flex w-full flex-1 flex-col'}>
        <RouteTransition className="flex w-full flex-1 flex-col">
          <Suspense fallback={<PageLoader />}>{children}</Suspense>
        </RouteTransition>
        {creatorWatermark}
      </main>

      {/* Tab bar bawah untuk HP dan iPad tegak. Tombol aktif hanya berganti warna (M10): tanpa lompatan ikon. */}
      {showNav ? (
        <nav aria-label="Navigasi utama bawah" className="pw-bottom-nav no-print">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isNavActive(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={`pw-pressable relative flex min-h-[var(--touch-min)] min-w-0 flex-col items-center justify-center gap-0.5 rounded-[var(--radius-md)] px-1 py-1 text-center text-[11px] leading-tight font-bold [overflow-wrap:anywhere] ${
                  active ? 'bg-[var(--world-50)] text-[var(--world-700)]' : 'text-[var(--ink-2)]'
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <span
                    aria-label={badgeLabel(item.badge)}
                    className="absolute right-1 top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--star)] px-1 text-[11px] font-extrabold leading-none text-[var(--on-star)]"
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      ) : null}

      <CelebrationHost />
    </div>
  );
};
