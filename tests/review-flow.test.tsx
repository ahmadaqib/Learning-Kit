import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { BossQuizPage } from '@/pages/BossQuizPage';
import { ReviewBoxPage } from '@/pages/ReviewBoxPage';
import { useAppStore } from '@/store/useAppStore';

const scrollIntoView = HTMLElement.prototype.scrollIntoView;

beforeEach(() => {
  localStorage.clear();
  useAppStore.setState({ activeProfileId: '', profiles: {} });
  document.documentElement.dataset.reducedMotion = 'always';
  vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
  HTMLElement.prototype.scrollIntoView = vi.fn();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  HTMLElement.prototype.scrollIntoView = scrollIntoView;
  delete document.documentElement.dataset.reducedMotion;
});

function seedProfile() {
  const store = useAppStore.getState();
  const id = store.createProfile({ nickname: 'Naya', avatar: 'kurir', mode: 'junior' })!;
  store.updateSettings({ soundEnabled: false, autoReadAloud: false });
  store.markQuestionGuideSeen('mcq');
  store.markQuestionGuideSeen('tf');
  return id;
}

function renderReview() {
  return render(<MemoryRouter initialEntries={['/ulang']}><ReviewBoxPage /></MemoryRouter>);
}

it('explains the wrong choice in scheduled review', () => {
  seedProfile();
  useAppStore.getState().answerLeitnerCard('a01-l01-r1', false, '2020-01-01');
  renderReview();

  fireEvent.click(screen.getByRole('button', { name: /Mulai ulang/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Dapur restoran' }));
  fireEvent.click(screen.getByRole('button', { name: 'Periksa' }));

  expect(screen.getByText('Dapur bekerja di belakang. Tamu tidak melihatnya.')).toBeInTheDocument();
  expect(screen.getByText('Soal ini muncul lagi nanti.')).toBeInTheDocument();
});

it('focuses each new review question and preserves the explanation of a correct answer', () => {
  seedProfile();
  const store = useAppStore.getState();
  store.answerLeitnerCard('a01-l01-r1', false, '2020-01-01');
  store.answerLeitnerCard('a01-l04-r1', false, '2020-01-02');
  renderReview();

  fireEvent.click(screen.getByRole('button', { name: /Mulai ulang/ }));
  expect(screen.getByRole('heading', { name: /Kamu duduk di restoran/ })).toHaveFocus();
  fireEvent.click(screen.getByRole('button', { name: 'Ruang makan' }));
  fireEvent.click(screen.getByRole('button', { name: 'Periksa' }));
  expect(screen.getByText('Kamu memilih makanan dari meja di ruang makan. Di web, kamu memilihnya langsung di layar.')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Lanjut →' }));

  expect(screen.getByRole('heading', { name: /Siapa yang mengubah nama toko/ })).toHaveFocus();
});

it('finishes free practice without promising a retry or displaying an unearned reward', () => {
  const id = seedProfile();
  const profile = useAppStore.getState().profiles[id];
  useAppStore.setState({ profiles: { [id]: {
    ...profile,
    xp: 240,
    lessons: { 'a01-l01': { stars: 3, completedAt: '2020-01-01', attempts: 1 } },
  } } });
  const { container } = renderReview();

  fireEvent.click(screen.getByRole('button', { name: /Latihan bebas/ }));
  const chooseWrong = () => fireEvent.click(screen.queryByRole('button', { name: 'Dapur restoran' }) ?? screen.getByRole('button', { name: 'Salah' }));
  chooseWrong();
  fireEvent.click(screen.getByRole('button', { name: 'Periksa' }));
  const replayPromise = screen.queryByText('Soal ini muncul lagi nanti.');
  fireEvent.click(screen.getByRole('button', { name: 'Lanjut →' }));
  chooseWrong();
  fireEvent.click(screen.getByRole('button', { name: 'Periksa' }));
  fireEvent.click(screen.getByRole('button', { name: 'Lanjut →' }));

  expect(screen.getByRole('heading', { name: /Kotak Ulang selesai/ })).toBeInTheDocument();
  expect(replayPromise).toBeNull();
  expect(container).not.toHaveTextContent(/\+\d+ poin/);
  expect(useAppStore.getState().profiles[id]).toMatchObject({ xp: 240, leitner: {} });
});

it('focuses the first question after starting the keeper challenge', async () => {
  seedProfile();
  render(<MemoryRouter initialEntries={['/penjaga/a01']}>
    <Routes><Route path="/penjaga/:duniaId" element={<BossQuizPage />} /></Routes>
  </MemoryRouter>);

  fireEvent.click(await screen.findByRole('button', { name: /Mulai Tantangan/ }));

  expect(screen.getByRole('heading', { level: 2 })).toHaveFocus();
});
