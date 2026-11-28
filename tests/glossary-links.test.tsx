import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, expect, it } from 'vitest';
import { GlossaryPage } from '@/pages/GlossaryPage';
import { useAppStore } from '@/store/useAppStore';

beforeEach(() => { localStorage.clear(); useAppStore.setState({ activeProfileId: '', profiles: {} }); });
afterEach(cleanup);

it('links Junior only to lessons they can open, and Pro to every lesson in its mode', () => {
  for (const mode of ['junior', 'pro'] as const) {
    cleanup();
    useAppStore.setState({ activeProfileId: '', profiles: {} });
    useAppStore.getState().createProfile({ nickname: 'Ari', avatar: 'star', mode });
    render(<MemoryRouter><GlossaryPage /></MemoryRouter>);
    const links = screen.queryAllByRole('link', { name: /Buka pelajaran terkait/ }).map((a) => a.getAttribute('href'));
    if (mode === 'junior') {
      expect(links.every((href) => href === '/belajar/a01-l01')).toBe(true);
      expect(screen.getAllByText('Pelajarannya terbuka nanti di petamu').length).toBeGreaterThan(0);
    } else {
      expect(links).toContain('/belajar/b09-l06');
      expect(screen.queryByText('Pelajarannya terbuka nanti di petamu')).toBeNull();
    }
  }
});
