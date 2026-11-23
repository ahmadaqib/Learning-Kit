#!/usr/bin/env node
/**
 * Capture and gate Petualang Web's browser layouts. Start Vite on port 5199, then run:
 *   node scripts/shoot.mjs [--out /tmp/petualang-layout-qa] [--base http://localhost:5199]
 *                          [--runs junior-light-390,pro-dark-390] [--routes /beranda,/stiker]
 *                          [--full] [--gate-only]
 * Custom viewports use mode-theme-WIDTHxHEIGHT, for example pro-dark-320x740.
 * Playwright can be installed in this repo or resolved from PLAYWRIGHT_DIR (project directory).
 * Installed Google Chrome is used when Playwright's bundled Chromium is unavailable.
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { measureLayout } from './measure-layout.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIN_PNG_BYTES = 10 * 1024;
const ALL_ROUTES = [
  '/', '/mulai', '/beranda', '/peta/a', '/peta/b', '/dunia/a01', '/dunia/a04', '/dunia/b01',
  '/belajar/a01-l02', '/belajar/a04-l01', '/penjaga/a01', '/ulang', '/stiker', '/profil',
  '/pendamping', '/pengaturan', '/glosarium',
];
const ALL_RUNS = {
  'junior-light-390': { mode: 'junior', theme: 'light', width: 390, height: 844 },
  'pro-light-390': { mode: 'pro', theme: 'light', width: 390, height: 844 },
  'junior-dark-390': { mode: 'junior', theme: 'dark', width: 390, height: 844 },
  'pro-dark-1280': { mode: 'pro', theme: 'dark', width: 1280, height: 800 },
  'junior-light-768': { mode: 'junior', theme: 'light', width: 768, height: 1024 },
  'pro-dark-390': { mode: 'pro', theme: 'dark', width: 390, height: 844 },
  'pro-light-1280': { mode: 'pro', theme: 'light', width: 1280, height: 800 },
};
const DEFAULT_RUNS = Object.keys(ALL_RUNS).slice(0, 6);

function runConfig(run) {
  if (Object.hasOwn(ALL_RUNS, run)) return ALL_RUNS[run];
  const match = /^(junior|pro)-(light|dark)-([1-9]\d*)x([1-9]\d*)$/.exec(run);
  if (!match) return null;
  const [, mode, theme, width, height] = match;
  return { mode, theme, width: Number(width), height: Number(height) };
}

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : fallback;
}

const shotName = (run, route) =>
  `${run}_${route === '/' ? 'root' : route.slice(1).replace(/[/?=&:]+/g, '_')}.png`;

/** Matches the persisted ProfileSchema. Selection requires two profiles to stay at /. */
function seed({ mode, theme }, route) {
  const id = 'p-shot';
  const profile = {
    id,
    nickname: mode === 'junior' ? 'Naya' : 'Dimas',
    avatar: 'kurir',
    mode,
    createdAt: '2026-11-20',
    settings: {
      soundEnabled: false,
      autoReadAloud: false,
      textScale: 100,
      reducedMotion: 'system',
      theme,
      weeklyTarget: 3,
      breakReminderMinutes: 0,
    },
    xp: 240,
    lessons: { 'a01-l01': { stars: 3, completedAt: '2026-11-21', attempts: 1 } },
    bosses: {},
    assessments: {},
    leitner: {},
    stickers: ['restoran', 'botol-saus', 'denah-rumah'],
    badges: [],
    weeks: {},
    mistakes: {},
    limitMistakes: {},
    seenQuestionGuides: ['mcq', 'tf', 'analogy', 'scenario', 'limit', 'match', 'sort', 'order', 'hotspot', 'spotbug', 'why', 'fill', 'type'],
    mascot: { color: '#E4572E', accessory: 'none' },
  };
  // Home exercises the Junior pretest and the Pro continuation kicker.
  if (mode === 'pro' && route === '/beranda') {
    profile.assessments.a01 = { pre: { score: 3, max: 6, at: '2026-11-21', answers: {} } };
  }
  if (route === '/ulang') {
    profile.leitner = {
      'a01-l01-r1': { box: 1, due: '2020-01-01' },
      'a04-l01-r1': { box: 2, due: '2020-01-01' },
    };
  }
  const profiles = { [id]: profile };
  if (route === '/') profiles['p-second'] = { ...profile, id: 'p-second', nickname: 'Sari', xp: 0 };
  return JSON.stringify({ state: { schemaVersion: 1, activeProfileId: id, profiles }, version: 1 });
}

function loadPlaywright() {
  const candidates = [ROOT, process.env.PLAYWRIGHT_DIR, path.resolve(ROOT, '../ngafe')].filter(Boolean);
  for (const dir of candidates) {
    try {
      return createRequire(path.join(path.resolve(dir), 'package.json'))('playwright');
    } catch (error) {
      if (error.code !== 'MODULE_NOT_FOUND') throw error;
    }
  }
  throw new Error('Playwright could not be resolved. Set PLAYWRIGHT_DIR to a project with Playwright installed.');
}

function significantErrors(events) {
  return [
    ...events.pageErrors,
    ...events.console.filter((entry) => entry.startsWith('error:')),
    ...events.failedRequests.filter((entry) => !entry.endsWith('net::ERR_ABORTED')),
  ];
}

export function checkGate(dir, runs = DEFAULT_RUNS, routes = ALL_ROUTES) {
  const problems = [];
  for (const run of runs) {
    const cfg = runConfig(run);
    if (!cfg) {
      problems.push(`Unknown run ${run}`);
      continue;
    }
    let layouts;
    let logs;
    try {
      layouts = JSON.parse(fs.readFileSync(path.join(dir, `layout-${run}.json`), 'utf8'));
      logs = JSON.parse(fs.readFileSync(path.join(dir, `console-${run}.json`), 'utf8'));
    } catch (error) {
      problems.push(`${run}: ${error.message}`);
      continue;
    }
    for (const route of routes) {
      const label = `${run} ${route}`;
      const file = path.join(dir, shotName(run, route));
      const png = fs.statSync(file, { throwIfNoEntry: false });
      if (!png || png.size < MIN_PNG_BYTES) problems.push(`${label}: BLANK or missing PNG (${png?.size ?? 0} bytes)`);
      const layout = layouts?.[route];
      if (!layout?.rootChildren || !layout.textLength || !Array.isArray(layout.issues)) {
        problems.push(`${label}: missing rendered layout`);
      } else {
        const expectedPath = new URL(route, 'https://local.test').pathname;
        const mode = expectedPath === '/pendamping' ? 'pro' : cfg.mode;
        if (layout.path !== expectedPath || layout.mode !== mode || layout.theme !== cfg.theme ||
            layout.windowWidth !== cfg.width || layout.viewportHeight !== cfg.height) {
          problems.push(`${label}: unexpected route, skin or viewport (${layout.path}, ${layout.mode}, ${layout.theme}, ${layout.windowWidth}×${layout.viewportHeight})`);
        }
        if (layout.issues.length) problems.push(`${label}: ${layout.issues.length} layout findings`);
      }
      const events = logs?.[route];
      if (!events || !Array.isArray(events.pageErrors) || !Array.isArray(events.console) || !Array.isArray(events.failedRequests)) {
        problems.push(`${label}: missing browser diagnostics`);
      } else {
        for (const error of significantErrors(events)) problems.push(`${label}: ${error.split('\n')[0]}`);
      }
    }
  }
  return problems;
}

async function capture(page, base, file, route, fullPage) {
  const events = { console: [], pageErrors: [], failedRequests: [] };
  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) events.console.push(`${message.type()}: ${message.text()}`);
  });
  page.on('pageerror', (error) => events.pageErrors.push(String(error.stack || error)));
  page.on('requestfailed', (request) => {
    events.failedRequests.push(`${request.url()} ${request.failure()?.errorText ?? ''}`);
  });

  let size = 0;
  let layout = null;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await page.goto(base + route, { waitUntil: 'domcontentloaded' });
      if (!response?.ok()) throw new Error(`Navigation returned HTTP ${response?.status() ?? 'unknown'}`);
      await page.waitForFunction(
        () => Boolean(document.querySelector('#root')?.innerText.trim()) && !document.querySelector('#root [aria-busy="true"]'),
        null,
        { timeout: 15000 },
      );
      await page.evaluate(async () => {
        await document.fonts.ready;
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      });
      layout = await page.evaluate(measureLayout);
      size = (await page.screenshot({ path: file, fullPage })).length;
      if (size >= MIN_PNG_BYTES) break;
    } catch (error) {
      if (attempt === 2) events.pageErrors.push(`Capture failed: ${error.message}`);
    }
  }
  return { size, layout, events };
}

async function main() {
  const dir = path.resolve(arg('out', path.join(os.tmpdir(), 'petualang-layout-qa')));
  const base = arg('base', 'http://localhost:5199').replace(/\/$/, '');
  const routes = arg('routes', ALL_ROUTES.join(',')).split(',');
  const runs = arg('runs', DEFAULT_RUNS.join(',')).split(',');
  if (routes.some((route) => !route.startsWith('/') || route.startsWith('//')) || runs.some((run) => !runConfig(run))) {
    throw new Error('Pass local paths to --routes and known run names to --runs.');
  }
  const gateOnly = process.argv.includes('--gate-only');
  const fullPage = process.argv.includes('--full');
  const logLines = [];
  const log = (line) => {
    logLines.push(line);
    console.log(line);
  };

  if (!gateOnly) {
    const { chromium } = loadPlaywright();
    fs.mkdirSync(dir, { recursive: true });
    const browser = await chromium.launch().catch(() => chromium.launch({ channel: 'chrome' }));
    try {
      for (const run of runs) {
        log(`run ${run}`);
        const cfg = runConfig(run);
        const context = await browser.newContext({
          viewport: { width: cfg.width, height: cfg.height },
          deviceScaleFactor: 1,
          isMobile: cfg.width < 640,
          hasTouch: cfg.width <= 768,
          colorScheme: cfg.theme,
          reducedMotion: 'reduce',
        });
        const seeds = Object.fromEntries(routes.map((route) => [new URL(base + route).pathname, seed(cfg, route)]));
        await context.addInitScript(({ origin, seeds }) => {
          if (location.origin !== origin || !seeds[location.pathname]) return;
          localStorage.clear();
          localStorage.setItem('petualang-web', seeds[location.pathname]);
          localStorage.setItem('petualang-web-seen-v1', JSON.stringify({ 'p-shot': { primed: true, keys: [] } }));
        }, { origin: new URL(base).origin, seeds });

        const layouts = {};
        const logs = {};
        for (const route of routes) {
          const page = await context.newPage();
          const file = path.join(dir, shotName(run, route));
          const { size, layout, events } = await capture(page, base, file, route, fullPage);
          await page.close();
          layouts[route] = layout;
          logs[route] = events;
          const findings = layout?.issues ?? [];
          log(`  ${route} ${size}B${size < MIN_PNG_BYTES ? ' BLANK' : ''}${findings.length ? ` LAYOUT=${findings.length}` : ''}`);
          for (const issue of findings) log(`    LAYOUT ${JSON.stringify(issue)}`);
          for (const error of significantErrors(events)) log(`    page-error ${error.split('\n')[0]}`);
        }
        fs.writeFileSync(path.join(dir, `layout-${run}.json`), JSON.stringify(layouts, null, 2));
        fs.writeFileSync(path.join(dir, `console-${run}.json`), JSON.stringify(logs, null, 2));
        await context.close();
      }
    } finally {
      await browser.close();
    }
  }

  const problems = checkGate(dir, runs, routes);
  log(problems.length ? `GATE FAIL\n- ${problems.join('\n- ')}` : `GATE PASS (${runs.length} × ${routes.length})`);
  if (!gateOnly) fs.writeFileSync(path.join(dir, 'run.log'), logLines.join('\n') + '\n');
  process.exitCode = problems.length ? 1 : 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 2;
  });
}
