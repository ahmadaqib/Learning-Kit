import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { AppShell } from '@/components/layout/AppShell';
import { ProfileSelectPage } from '@/pages/ProfileSelectPage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { HomePage } from '@/pages/HomePage';
import { MapPage } from '@/pages/MapPage';
import { WorldDetailPage } from '@/pages/WorldDetailPage';
import { StickerBookPage } from '@/pages/StickerBookPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SettingsPage } from '@/pages/SettingsPage';
import { GlossaryPage } from '@/pages/GlossaryPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Lazy-load halaman berat agar initial bundle JS <= 180 KB gzip
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

const PageLoader: React.FC = () => (
  <div className="flex min-h-[60dvh] items-center justify-center p-6">
    <span className="pw-body font-bold text-[var(--ink-2)]">Memuat...</span>
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
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
  );
};
