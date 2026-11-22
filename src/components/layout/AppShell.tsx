import React, { useEffect } from 'react';
import { BookOpen, Home, Layers, Map as MapIcon, User } from 'lucide-react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { BrandLogo } from '@/components/mascot/BrandLogo';
import { countAllDueCards } from '@/engine/leitner';
import { formatLocalDate } from '@/engine/date';
import { useAppStore } from '@/store/useAppStore';

interface AppShellProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

export const AppShell: React.FC<AppShellProps> = ({ children, hideNav = false }) => {
  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);
  const location = useLocation();
  const dueCount = profile ? countAllDueCards(profile.leitner, formatLocalDate()) : 0;

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

  const navItems = [
    { to: '/beranda', label: 'Beranda', icon: Home },
    { to: '/peta/A', label: 'Peta', icon: MapIcon },
    { to: '/ulang', label: 'Ulang', icon: Layers, badge: dueCount > 0 },
    { to: '/stiker', label: 'Stiker', icon: BookOpen },
    { to: '/profil', label: 'Profil', icon: User },
  ];

  const isNavActive = (to: string) => {
    if (to.startsWith('/peta')) return location.pathname.startsWith('/peta') || location.pathname.startsWith('/dunia');
    return location.pathname === to;
  };

  const creatorWatermark = (
    <footer className="no-print mt-auto flex justify-center px-4 py-4">
      <a
        href="https://github.com/ahmadaqib"
        target="_blank"
        rel="noopener noreferrer"
        className="pw-pressable inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--paper)] px-3.5 py-1.5 text-xs font-extrabold text-[var(--ink-2)] shadow-sm hover:border-[var(--world-600)] hover:text-[var(--ink)]"
      >
        <span>Made with</span>
        <span className="inline-block text-[#E4572E]" aria-label="love">
          ❤️
        </span>
        <span>by</span>
        <span className="text-[var(--world-700)] underline decoration-dotted underline-offset-2">ahmadaqib</span>
      </a>
    </footer>
  );

  if (hideNav || !profile) {
    return (
      <div className="min-h-[100dvh] flex flex-col">
        <a href="#main-content" className="skip-link visually-hidden rounded bg-[var(--ink)] px-4 py-2 text-[var(--paper)]">
          Langsung ke isi utama
        </a>
        <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col w-full">
          <div className="flex-1 flex flex-col w-full">{children}</div>
          {creatorWatermark}
        </main>
      </div>
    );
  }

  return (
    <div className="pw-shell">
      <a href="#main-content" className="skip-link visually-hidden rounded bg-[var(--ink)] px-4 py-2 text-[var(--paper)]">
        Langsung ke isi utama
      </a>

      {/* Rel Samping Kiri untuk iPad mendatar & Desktop (>= 1024px / pendek landscape) */}
      <aside className="pw-side-rail no-print">
        <Link
          to="/beranda"
          aria-label="Beranda Petualang Web"
          className="pw-pressable group mb-2 flex flex-col items-center gap-1 rounded-2xl px-1.5 py-1"
        >
          <BrandLogo size={48} />
          <span className="text-[10px] font-extrabold tracking-tight text-[var(--ink-2)] group-hover:text-[var(--ink)]">
            Petualang
          </span>
        </Link>
        <nav aria-label="Navigasi utama samping" className="flex flex-col gap-2 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isNavActive(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`pw-pressable relative flex flex-col items-center justify-center gap-1 rounded-xl py-2.5 text-[11px] font-bold ${
                  active
                    ? 'pw-squish-pop bg-[var(--world-50)] text-[var(--world-700)] shadow-[0_2px_0_var(--world-600)]'
                    : 'text-[var(--ink-2)] hover:bg-[var(--cream)]'
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    aria-label="Ada kartu jatuh tempo"
                    className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[var(--warn-500)]"
                  />
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <main id="main-content" tabIndex={-1} className="pw-main-with-nav">
        <div className="flex-1 w-full">{children}</div>
        {creatorWatermark}
      </main>

      {/* Tab Bar Bawah untuk HP & iPad tegak */}
      <nav aria-label="Navigasi utama bawah" className="pw-bottom-nav no-print">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isNavActive(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`pw-pressable relative flex min-h-[48px] min-w-[56px] flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-[11px] font-bold ${
                active ? 'pw-squish-pop text-[var(--world-700)] bg-[var(--world-50)]' : 'text-[var(--ink-2)]'
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.label}</span>
              {item.badge && (
                <span
                  aria-label="Ada kartu jatuh tempo"
                  className="absolute right-2.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--warn-500)]"
                />
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
