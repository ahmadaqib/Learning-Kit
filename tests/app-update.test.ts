import { describe, expect, it, vi } from 'vitest';
import { isSafePath, reloadOnce } from '@/engine/appUpdate';

describe('picking up a new deploy', () => {
  it('never reloads inside a lesson, boss, test or review', () => {
    for (const path of ['/belajar/a01-l01', '/penjaga/a01', '/tes/a01/pre', '/ulang']) expect(isSafePath(path)).toBe(false);
    for (const path of ['/beranda', '/peta/A', '/dunia/a01', '/tanya', '/profil', '/ulangan-lain']) expect(isSafePath(path)).toBe(true);
  });

  it('reloads at most once per build, so a broken deploy cannot loop', () => {
    const reload = vi.fn();
    const original = window.location;
    Object.defineProperty(window, 'location', { configurable: true, value: { ...original, reload } });
    const store = new Map<string, string>();
    const storage = { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => void store.set(k, v) };
    expect(reloadOnce('build:abc', storage)).toBe(true);
    expect(reloadOnce('build:abc', storage)).toBe(false);
    expect(reload).toHaveBeenCalledTimes(1);
    Object.defineProperty(window, 'location', { configurable: true, value: original });
  });
});
