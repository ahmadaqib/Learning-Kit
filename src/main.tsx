import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/tokens.css';
import './styles/global.css';
import { App } from './app/App';
import { getMotionPrefs } from './motion/prefs';

/**
 * Root attributes that CSS reads (spec 5.3, 5.9.6):
 *  - data-fx-tier: 'off' | 'lite' | 'full'. Set at start, and refreshed only if the reduced-motion setting changes.
 *  - data-input: 'keyboard' after Tab, Enter, Space or an arrow key; 'pointer' after a pointerdown.
 *    Under data-input='keyboard' the transitional entrances (dialogs, route, step) do not play.
 */
function setupRootAttributes(): void {
  const root = document.documentElement;

  const applyTier = () => {
    const tier = getMotionPrefs().tier;
    if (root.dataset.fxTier !== tier) root.dataset.fxTier = tier;
  };
  applyTier();
  if (typeof window.matchMedia === 'function') {
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', applyTier);
  }
  new MutationObserver(applyTier).observe(root, { attributes: true, attributeFilter: ['data-reduced-motion'] });

  root.dataset.input = 'pointer';
  const setInput = (value: 'keyboard' | 'pointer') => {
    if (root.dataset.input !== value) root.dataset.input = value;
  };
  const KEYBOARD_KEYS = new Set(['Tab', 'Enter', ' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);
  window.addEventListener('keydown', (event) => {
    if (KEYBOARD_KEYS.has(event.key)) setInput('keyboard');
  }, true);
  window.addEventListener('pointerdown', () => setInput('pointer'), true);
}

setupRootAttributes();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
