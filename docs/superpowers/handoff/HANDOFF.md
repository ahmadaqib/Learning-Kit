# Handoff: Petualang Web playful redesign, copydeck and Pro lessons

**For:** the coding agent (Codex) taking over from Claude Code. **Date:** 2026-11-23.
**Branch:** `redesign/playful-ui-copydeck`. Local, uncommitted working tree.

## Current handoff after WF3

All ten copy decision records under `pending-copy/` are applied. The 22 worlds contain 124 lessons and side quests, including seven optional Pro workshops in Pabrik JavaScript, Menara Alat and Dapur Frontend. The main paths keep their existing completion requirements. Lesson practice, reflection, focus and interleaved reviews are integrated. See the [WF3 design and reference checks](../specs/2026-11-23-pro-lessons-learning-science-design.md).

The production build passes the content validator (zero errors, 18 advisories), contrast and color checks, TypeScript and Vite. Vitest passes 180 tests. The per-world report prints separate error and warning counts. Use `scripts/shoot.mjs` for browser captures and layout checks. The [layout QA record](layout-qa-2026-11-23.md) contains the capture matrix and screenshots. The remaining owner decision concerns Git tracking of `docs/superpowers/` before a commit.

Sections 2 and 3 below preserve the original stopping point and work order.

## 0. Rules you must keep

- **No git commit, push or branch switch** unless the owner asks for it.
- `prd.md` is private and gitignored. Read it for context, but never quote it into anything that gets published.
- Learner-facing text is **Indonesian**. Docs and code comments are English.
- The repo folder name ends with a space (`learning-kit `). Use cwd-relative paths and quote them.
- Junior means ages 9 to 12, with a parent or teacher as companion. Pro means teenagers and adults. They are two skins of one system, `[data-mode]`.
- Motion rules (Emil skills in `.agents/skills/`):
  - Frequent actions stay quiet: ease-out, ≤ 300 ms, transform and opacity only.
  - Celebrate only rare milestones.
  - Honour `prefers-reduced-motion` and `[data-reduced-motion='always']`.

## 1. Read these first, in order

1. `docs/superpowers/specs/2026-11-22-playful-redesign-design.md` is the design spec (large). Read §0 for the ten decisions, §2 for goals and anti-goals, §12 for the work split, §15 for judge decisions, §16 for layout blockers from the owner, and §17 for the UI round 1 decisions.
2. `docs/superpowers/specs/2026-11-22-copydeck-guide.md` holds the copy rules C01–C34 (Indonesian).
3. `docs/superpowers/specs/2026-11-23-decision-guide.md` says how to accept or reject critique. Use it whenever you triage feedback.
4. `docs/superpowers/handoff/wf2-ui-triage-round1.md` has the round 1 UI decisions, plus what each fix agent reported doing.

## 2. Original state at 21:04 on 2026-11-23

| Check | Result |
|---|---|
| `npm run validate:content` | Pass: 22 worlds, 117 lessons, 0 errors, 24 copydeck warnings |
| `npm run typecheck` | Pass |
| `npx vitest run` | 176 out of 176 tests pass |
| `npx vite build`, `check:contrast`, `check:colors` | Passed in the last full verify run. I did not re-run them after that |

**Two oddities to check first:**

1. The validator's per-world table prints rows labelled `GALAT` (error), for example a05 C33, a07 C31/M02, b07 M03, and b09 and b10 C32, yet the total says 0 errors. Run `npx tsx scripts/validate-content.ts --details` and confirm the label or the count.
2. `scripts/shoot.mjs` now runs layout detection and browser diagnostics in a single capture. Set `PLAYWRIGHT_DIR` to a project with Playwright installed if this checkout cannot resolve it.

### What is done

- **UI redesign "Buku Saku Petualang", packages P0–P4.**
  - Tokens, fonts, motion system (`src/motion/`, `src/styles/motion.css`, `src/components/fx|celebrate|map|world/`), and the new lesson player pieces.
  - Round 1 judge fixes have been applied to all packages.
  - Note that the files under `src/motion`, `fx` and `celebrate` are untracked, so `git diff main` does not show them. Use `git status`.
- **Copy rewrite of all 22 worlds plus glossary, stickers and badges.** It was judged by a 5-persona panel. For 12 of them the panel's decisions have been applied.

## 3. Original work order

### 3.1 Apply the pending copy decisions (small, do first)

The files are in `docs/superpowers/handoff/pending-copy/<world>.json`, with `status`, `decision` and `judgeIssues`.

| World | Status | Action |
|---|---|---|
| a09 (decided by Fable), a10, a11, a12 (decided by Opus) | `DECIDED_NOT_APPLIED` | Apply `decision.instructions` to `src/content/worlds/<id>-*/index.ts` |
| a01, a08, b02, b03, b05, b09 | `NEEDS_DECISION` | Triage `judgeIssues` with the decision guide, then apply |

**Extra for a01:**
- Junior anchor and pretest questions must not ask about DNS or the HTTPS padlock. Use restaurant-analogy questions, and keep DNS and HTTPS Pro-only.
- The a01-l02 warm-up must not ask "Frontend vs Backend" before those words have been taught.

**Keep:** every id, every answer, and the `t(junior, pro)` helper style.
**After each world:** run `npx tsx scripts/validate-content.ts`.

### 3.2 Fix the layout blockers (design spec §16)

Run the detector:

```
npx vite --port 5199 --strictPort &
node scripts/shoot.mjs --out /tmp/shots --runs junior-light-390 --routes /beranda,/dunia/a01,/peta/a,/stiker
```

It writes PNGs, `layout-<run>.json`, `console-<run>.json`, and `run.log`. It seeds test profiles into the browser context and fails when content is missing, a route redirects, a layout finding occurs, or the browser reports an error. Run with `--gate-only` to verify files from an existing capture.

**Still open as of 21:00:**
- **World sticker overlaps the title.** On `/beranda` the `svg "Pulau Kota Web"` overlaps `h2 "Kota Web"` by 108×37 px. On `/dunia/a01` it overlaps the h1 and the description by 145×34 px.
- **Empty gap in the Home poster.** There is a large empty band between the progress row and "mulai dari sini" (Junior Home, 390 px).

**Check the rest:** the "baru!" badge clipping on `/stiker`, the Pro kicker wrap, the "// kamu di sini" wrap, and horizontal scrollers that need an affordance (all in §16).

**Viewports to cover:** 390×844 and 768×1024 for Junior, Pro at 390×844 and 1280×800, and dark mode.

### 3.3 New Pro lessons and learning-science features (the WF3 scope, not started)

Write `docs/superpowers/specs/2026-11-23-pro-lessons-learning-science-design.md` first, then build it.

**Scope A, learning features.** These techniques are well established in learning science but have **not been checked against the owner's 4 reference videos**, because YouTube rate-limited the transcript fetch. Mark them provisional.

The 4 videos are:
- `kKvK2foOTJM`: Landowski, TEDxHobart
- `mzexJPoXBCM`: Newport & Huberman on active recall
- `JbLAGpQ9RXg`: Chiaravalloti, TEDxHerndon
- `Hu4Yvq-g7_Y`: Chris Bailey on focus, TEDxManchester

The features:
- **"Tebak dulu!" pretest** before the concept card, with no XP penalty.
- **"Ingat-ingat" retrieval warm-up**: 1 or 2 questions from the previous lesson.
- **Interleaved review** in Kotak Ulang. Leitner already exists in `src/engine/leitner.ts`.
- **Ungraded reflection** at the end of a lesson. Junior picks a picture; Pro types a short answer.
- **Lesson focus mode**: hide the nav and ambient motion.
- **Small varied surprises.**
- **A break message** that mentions sleep and consolidation.

For each feature, define:
- Junior vs Pro behaviour.
- The data model. Prefer content-driven steps and separate localStorage keys. Change `src/store/useAppStore.ts` only additively, with a migration.
- Accessibility and reduced-motion behaviour.

**Scope B, new Pro-only lessons:**
- JS array methods and objects
- Error handling (try/catch, reading error messages)
- npm and Vite basics
- Browser DevTools
- React hands-on (components, props, state)
- Testing basics
- Deploying a site

Decide whether these go into existing worlds (a04, a11, b09) or a new world. A new world touches worldMeta, curriculum, stickers and unlock rules.

**Lesson shape:**
- story → concept → read-then-do, with at most 2 reading cards in a row (copy rule C25)
- ≥ 6 questions per lesson, a hint on each
- an `atWork` line
- reuse existing simulators only
- code that is technically correct for modern JS and React

**Then:** critique the spec from the 5 personas (§15 lists them), triage the critique with the decision guide, and implement.

### 3.4 Final pass

- Run the layout detector on all 17 routes: `/,/mulai,/beranda,/peta/a,/peta/b,/dunia/a01,/dunia/a04,/dunia/b01,/belajar/a01-l02,/belajar/a04-l01,/penjaga/a01,/ulang,/stiker,/profil,/pendamping,/pengaturan,/glosarium`.
  - Viewports: Junior light 390, Pro light 390, Junior dark 390, Pro dark 1280, Junior light 768.
  - Zero findings is required (§16).
- `npm run build` runs validate, contrast, colors, tsc and vite build. Then run `npm test`.
- Remove stray temp files such as `_p1_harness*` and `*.tmp` (none were present at 21:04).

## 4. Open question for the owner

`docs/` is not gitignored. The `.gitignore` line `# /docs` is commented out. These specs paraphrase the private PRD, and the screenshots would be published if committed. Ask whether `docs/superpowers/` should be ignored before any commit.
