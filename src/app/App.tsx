import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAppStore, type AppStore } from '@/store/useAppStore';
import type { Settings } from '@/content/schema';
import { AppShell } from '@/components/layout/AppShell';
import { PageLoader } from '@/components/fx/PageLoader';
import { ProfileSelectPage } from '@/pages/ProfileSelectPage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { Bito } from '@/components/mascot/Bito';
import { Button } from '@/components/ui/Button';
import { configureSound, listenForInterfaceSounds } from '@/engine/sound';
import { configureSpeech, stopSpeaking } from '@/engine/speech';
import { useAppUpdates } from '@/engine/appUpdate';

// Lazy-load halaman berat agar initial bundle JS <= 180 KB gzip
const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })));
const MapPage = lazy(() => import('@/pages/MapPage').then((m) => ({ default: m.MapPage })));
const WorldDetailPage = lazy(() => import('@/pages/WorldDetailPage').then((m) => ({ default: m.WorldDetailPage })));
const StickerBookPage = lazy(() => import('@/pages/StickerBookPage').then((m) => ({ default: m.StickerBookPage })));
const ProfilePage = lazy(() => import('@/pages/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const SettingsPage = lazy(() => import('@/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));
const GlossaryPage = lazy(() => import('@/pages/GlossaryPage').then((m) => ({ default: m.GlossaryPage })));
const ChatPage = lazy(() => import('@/pages/ChatPage').then((m) => ({ default: m.ChatPage })));
const LessonPlayerPage = lazy(() =>
  import('@/pages/LessonPlayerPage').then((m) => ({ default: m.LessonPlayerPage })),
);
const BossQuizPage = lazy(() =>
  import('@/pages/BossQuizPage').then((m) => ({ default: m.BossQuizPage })),
);
const AssessmentPage = lazy(() =>
  import('@/pages/AssessmentPage').then((m) => ({ default: m.AssessmentPage })),
);
const ReviewBoxPage = lazy(() =>
  import('@/pages/ReviewBoxPage').then((m) => ({ default: m.ReviewBoxPage })),
);
const CompanionPage = lazy(() =>
  import('@/pages/CompanionPage').then((m) => ({ default: m.CompanionPage })),
);

const RequireProfile: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const activeProfile = useAppStore((s) => s.profiles[s.activeProfileId]);
  if (!activeProfile) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

/**
 * Top-level error boundary. A thrown render error would otherwise leave a blank page. The fallback is static on
 * purpose: cream page, a neutral Bito that does not react, one sentence, one reload button. No animation.
 */
class AppErrorBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error('AppErrorBoundary caught an error', error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div
        role="alert"
        className="flex min-h-[100dvh] flex-col items-center justify-center gap-5 bg-[var(--cream)] px-[var(--screen-pad,16px)] py-10 text-center text-[var(--ink)]"
      >
        <Bito expression="idle" size={112} react={false} />
        <p className="pw-body m-0 max-w-[28ch] font-extrabold">Ada yang macet. Coba muat ulang, ya.</p>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Muat ulang
        </Button>
      </div>
    );
  }
}

/** Picks up new deploys at safe moments (see engine/appUpdate). Needs the router for the current path. */
const AppUpdates: React.FC = () => {
  useAppUpdates();
  return null;
};

export const App: React.FC = () => {
  useEffect(() => {
    let activeProfileId: string | undefined;
    let appliedSettings: Settings | undefined;
    const syncAudio = (state: AppStore) => {
      const profile = state.profiles[state.activeProfileId];
      if (profile?.id !== activeProfileId) stopSpeaking();
      activeProfileId = profile?.id;
      if (profile?.settings === appliedSettings) return;
      appliedSettings = profile?.settings;
      configureSound(appliedSettings);
      configureSpeech(appliedSettings);
    };
    syncAudio(useAppStore.getState());
    const unsubscribe = useAppStore.subscribe(syncAudio);
    const stopListening = listenForInterfaceSounds();
    return () => {
      unsubscribe();
      stopListening();
      stopSpeaking();
      configureSound();
      configureSpeech();
    };
  }, []);

  return (
    <AppErrorBoundary>
    <BrowserRouter>
      <AppUpdates />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<AppShell hideNav><ProfileSelectPage /></AppShell>} />
          <Route path="/mulai" element={<AppShell hideNav><OnboardingPage /></AppShell>} />

          <Route
            path="/beranda"
            element={
              <RequireProfile>
                <AppShell><HomePage /></AppShell>
              </RequireProfile>
            }
          />
          <Route
            path="/peta/:jalur"
            element={
              <RequireProfile>
                <AppShell><MapPage /></AppShell>
              </RequireProfile>
            }
          />
          <Route
            path="/dunia/:duniaId"
            element={
              <RequireProfile>
                <AppShell><WorldDetailPage /></AppShell>
              </RequireProfile>
            }
          />
          <Route
            path="/belajar/:pelajaranId"
            element={
              <RequireProfile>
                <AppShell hideNav><LessonPlayerPage /></AppShell>
              </RequireProfile>
            }
          />
          <Route
            path="/penjaga/:duniaId"
            element={
              <RequireProfile>
                <AppShell hideNav><BossQuizPage /></AppShell>
              </RequireProfile>
            }
          />
          <Route
            path="/tes/:duniaId/:jenis"
            element={
              <RequireProfile>
                <AppShell hideNav><AssessmentPage /></AppShell>
              </RequireProfile>
            }
          />
          <Route
            path="/ulang"
            element={
              <RequireProfile>
                <AppShell><ReviewBoxPage /></AppShell>
              </RequireProfile>
            }
          />
          <Route
            path="/stiker"
            element={
              <RequireProfile>
                <AppShell><StickerBookPage /></AppShell>
              </RequireProfile>
            }
          />
          <Route
            path="/profil"
            element={
              <RequireProfile>
                <AppShell><ProfilePage /></AppShell>
              </RequireProfile>
            }
          />
          <Route
            path="/pendamping"
            element={
              <RequireProfile>
                <AppShell><CompanionPage /></AppShell>
              </RequireProfile>
            }
          />
          <Route
            path="/pengaturan"
            element={
              <RequireProfile>
                <AppShell><SettingsPage /></AppShell>
              </RequireProfile>
            }
          />
          <Route
            path="/tanya"
            element={
              <RequireProfile>
                <AppShell><ChatPage /></AppShell>
              </RequireProfile>
            }
          />
          <Route
            path="/glosarium"
            element={
              <RequireProfile>
                <AppShell><GlossaryPage /></AppShell>
              </RequireProfile>
            }
          />
          <Route path="*" element={<AppShell hideNav><NotFoundPage /></AppShell>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
    </AppErrorBoundary>
  );
};
