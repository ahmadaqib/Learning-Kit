# WF2 UI round 1: triage (Fable) and what the fix agents reported

## Package orchestrator

### Decided instructions

NOT a code package: harness and process steps that no package owns. Decisions are recorded in section 17 of docs/superpowers/specs/2026-11-22-playful-redesign-design.md (38 rows; open blocker = row 1).

1. BLOCKER, cause NOT confirmed. The after-r1 capture is blank on every route except Pro /mulai. I could not reproduce it: the dev server on localhost:5199 was down when I checked (curl exit 7) and the capture script (shoot.mjs) is not in the repo. The white (not cream) background means no CSS was applied, which fits a capture/navigation problem or a module load failure better than entrance animations. Before any judge runs again: start the dev server, load /beranda with the seeded 'petualang-web' localStorage profile (junior) once, and read the console. If there is an exception, route it to the owning package before anything else.
2. Fix the capture script: record console errors and page exceptions into the run output; wait for a child of #root plus document.fonts.ready (not a fixed 1.8 s); emulate prefers-reduced-motion: reduce; run the four runs sequentially, never in parallel; treat any PNG under 10 KB as a failure and retry once; add a pro-dark-390 run and make sure pro-light-390 /stiker and the 1280 root route are written.
3. Token budget (user asked for less spend and an adjusted Fable/Opus split): do NOT launch the five Opus persona judges until a cheap gate passes (a Haiku/Sonnet check that every PNG is over 10 KB and layout-*.json is non-empty). Round 1 spent five Opus judges on blank images. For round 2, run the motion critic only on files changed since round 1, and consider one Opus judge covering the two Junior personas and one covering the Pro personas plus Bu Wulan, instead of five.
4. Content issues that belong to the copydeck track, not to a UI package (nobody here owns src/content/worlds/*): (a) a01-kota-web Junior anchors at about lines 112 and 133 ask about DNS and the HTTPS padlock; replace with restaurant-analogy questions and keep DNS/HTTPS in Pro anchors; (b) the a01-l02 warm-up asks Frontend vs Backend before teaching the words; (c) Junior prompts should be short.
5. src/styles/motion.css, src/motion/*, src/components/fx/* and src/components/celebrate/* are untracked, so `git diff main -- src` misses them. Pass untracked files explicitly to reviewers. I did not stage anything.
6. Files owned by two packages in the package list (Bito.tsx, StarRow.tsx, ProgressBar.tsx, ConfettiBurst.tsx, ChoiceCard.tsx, Button.tsx, RichText.tsx, CelebrationHost.tsx are in both p1-ui-kit and foundation). I assigned the Bito change to p1-ui-kit only; foundation must not touch those files this round.

## Package p3-navigation

### Decided instructions

Owned files only. Rows refer to spec section 17.

1. (Row 1, blocker support) src/app/App.tsx: wrap the routes in a top-level React error boundary (class component defined in App.tsx, since no ErrorBoundary exists in src). Fallback: cream page background from tokens, Bito with a neutral expression and react={false}, one sentence in Indonesian ("Ada yang macet. Coba muat ulang, ya."), one primary button that reloads. Log the error with console.error so the capture harness can record it. No animation in the fallback.
2. (Row 4) src/components/layout/AppShell.tsx, creatorWatermark around lines 106-121: do not render it when there is no active profile or the profile mode is junior (this also removes it from onboarding and profile select). In Pro keep it, in Indonesian: "Dibuat dengan" + heart + "oleh ahmadaqib"; change the Heart aria-label from "love" to "cinta". Keep the 44 px target and the existing classes.
3. (Row 5) src/pages/HomePage.tsx: verify on the Junior Home that no XP number and no world code ("A01", "DUNIA A01") are rendered, and that kickers come from sentence-case strings. Fix if not. Pro keeps both.
4. (Row 10) HomePage.tsx around lines 187-203: the hero title is the world title only (e.g. "Kota Web"). Move the pre-test name into the kicker: "Tebak-tebakan Awal" / "Tebak-tebakan Lagi" in Junior, "Cek Titik Awal" / "Cek Kemajuan" in Pro. Keep the CTA strings. This also fixes the section 16.3 wrap ("Tebak-" break and the two-line Pro kicker); keep the Pro kicker on one line.
5. (Row 6) Pro only: next to the level bar show the remaining XP, "{n} XP lagi ke Lv {next}". Never in Junior.
6. (Row 8) Junior sticker tile on Home: replace the "0/53 stiker" count with the next sticker by name ("Stiker berikutnya: {nama}") when one is known; fall back to the count otherwise. Pro keeps the count. Do not add a new strip or a second hook to the Junior Home.
7. (Row 9) Add bottom padding to the scrolling page container equal to the bottom nav height plus env(safe-area-inset-bottom), so the last cards are not covered by the nav.
8. (Row 11) Pro strings on Home: no Junior-only names. Check "Buku Stiker" against the copydeck Pro name (the spec calls the Pro page "Koleksi") and use it.
9. (Row 12, minor) Pro: show the level title in place of "Pelajar" under the name if the title is already available from existing level data, and the weekly-target line in place of "Minggu baru, petualangan baru.". No streak wording. Skip this item if it needs new data.

Rejected, do not implement: flame/streak week dots, "Gas!"/"Main!" CTAs, a sticker strip at the top of Home.

## Package p4-identity

### Decided instructions

Owned files only. Rows refer to spec section 17.

1. (Rows 20, 23) src/pages/OnboardingPage.tsx step 1: (a) centre the step path horizontally and add one text line under it, "Langkah {n} dari 3 · {Kenalan|Nama dan avatar|Gaya belajar}", in sentence case, also used as the indicator's aria-label; (b) group Bito, the heading and the line under it as one block in the optical centre of the space above the action bar, with no stretched gap between heading and button; (c) the subtitle currently uses setAt(700) at about line 220: change it to at most 160 ms, and bring the h1 KineticText `at` from 240 to at most 80. The primary button must be visible and focusable from the first frame with no entrance delay.
2. (Row 24) PRO_LINES at about lines 108-112: change the first line to "Istilah dan kode yang dipakai di dunia kerja". Leave the other two lines as specified in section 8.7.
3. (Row 4) src/pages/SettingsPage.tsx: add a small "Tentang" line at the bottom: "Dibuat dengan ♥ oleh ahmadaqib". In Junior it is plain text with no link. In Pro it links to https://github.com/ahmadaqib with target=_blank rel="noopener noreferrer". Plain small text style, not the mono comment skin.
4. (Layout QA section 16.2 still applies) keep the "baru!" badge inside the card bounds on StickerBookPage.

Rejected or deferred, do not implement: an animal friend for Bito, a Pro-specific opening promise on step 1 (the mode is chosen at step 3), "Gas, mulai", "10 menit" promises. The string "pintar sebanyak apa" was not found in OnboardingPage.tsx; if you find it in one of your files, change it to "biar materinya pas buat kamu".

## Package p2-lesson

### Decided instructions

Owned files only. Rows refer to spec section 17.

1. (Row 32) src/components/lesson/FeedbackSheet.tsx lines 84-88: remove `delay: 120` and set `duration: 240`, keep EASE.drawer. Bito already has react={false} there; leave it.
2. (Row 31) src/components/questions/QuestionRenderer.tsx around line 853: delete the scale(1.02 -> 1) WAAPI bump on arrow-button reorder. The rows already swap in the same frame and focus follows the row.
3. (Row 35) src/components/sims/SimulatorsA.tsx lines 111, 124, 139 and the toggle knob in src/pages/ReviewBoxPage.tsx: the transform transitions have no easing class and fall back to Tailwind's default. Use the existing .pw-t-move class, or add ease-[var(--ease-out)].
4. (Row 28) src/components/lesson/LessonResult.tsx line 349: pass `boil` to KineticText only for a three-star result. Other results render without boil.
5. (Row 13) Warm-up label: "Ingat lagi!" in Junior and "Pemanasan" in Pro, replacing "PEMANASAN PELAJARAN LALU". In the lesson player, when a question is short, place the question block in the optical centre of the area between header and action bar and not pinned to the top, so the lower half is not an empty band. No new decoration.
6. (Row 18) The hint control beside "Periksa" has a visible text label "Petunjuk" in both modes, not an icon alone.
7. (Row 30) Add data-rm="fade" to the FeedbackSheet container if it is not there, so it cross-fades in 120 ms under reduced motion.

Rejected or deferred, do not implement: Bito reacting beside each question, a timer, keeping colour on the disabled "Periksa" button, pictures on answer choices and tap-on-picture questions (need schema and content), a "Di dunia kerja:" line.

## Package foundation

### Decided instructions

Owned files only. Do NOT edit Bito.tsx, StarRow.tsx, ProgressBar.tsx, ConfettiBurst.tsx, ChoiceCard.tsx, Button.tsx, RichText.tsx or CelebrationHost.tsx this round (also listed under p1-ui-kit). Rows refer to spec section 17.

1. (Row 30) src/styles/motion.css reduced-motion block (about lines 1371-1386) and the matching :root[data-reduced-motion='always'] block: after the kill-switch declarations add a rule so that `.pw-t-colors` and `.pw-t-opacity` keep `transition-duration: 120ms !important`. Those classes transition only colour and opacity. Movement stays zeroed. Keep these blocks last in the file.
2. (Row 34) motion.css about lines 814-816, pw-fx-correct: keep the scale(1.04) keyframe peak and run it with var(--ease-out), not var(--ease-pop).
3. (Row 36) motion.css line 1207 .pw-flip-inner: `transition: transform calc(280ms * var(--motion-scale)) var(--ease-in-out)`. Line 1087 .pw-fill: `transition: transform calc(240ms * var(--motion-scale)) var(--ease-out)`. Lines 1231-1233 sheet backdrop: `animation: pw-fade-in 160ms var(--ease-out) both`.
4. (Row 27) Verify in src/components/fx/KineticText.tsx that `boil` has no effect in Pro mode and that under data-reading='comfort' the component renders plain text. Fix if either is false.
5. (Row 5) Verify in global.css that `.pw-kicker` in Junior has text-transform none and letter-spacing 0 by default, not only under comfort reading (spec 4.4).
6. (Row 29, minor) src/components/fx/PageLoader.tsx: after 3 s of being mounted, show the text "Sebentar ya, sedang menyiapkan…" and stop the bob/dash loop. Clear the timer on unmount.
7. (Row 1, blocker support) Confirm index.html preloads only fonts that exist in public/fonts (plus-jakarta-sans-var.woff2 is present) and that no @font-face in global.css/tokens.css still points at the deleted jakarta-400/600/800 or jetbrains-400/700 files. Report anything found.

No change needed (checked): src/motion/prefs.ts resolves the tier to 'full' or the device tier unless reduced motion is set.

## Package p1-ui-kit

### Decided instructions

Owned files only. Rows refer to spec section 17.

1. (Row 36) src/components/mascot/Bito.tsx about line 120, think dots: enter from { opacity: 0, transform: 'scale(0.9)' } to { opacity: 1, transform: 'none' }, not from scale(0.6), and reduce the stagger from 150 ms to 80 ms.
2. (Row 30) src/components/ui/ChoiceCard.tsx: make sure the dimming/selected state changes use the .pw-t-colors / .pw-t-opacity classes (or data-rm="fade"), so they keep a 120 ms change under reduced motion once foundation lands its rule. No other change.

Nothing else for this package in round 1. Do not add a per-answer Bito reaction: the FeedbackSheet already passes react={false} and that stays.

### Report from sonnet:ui-fix-p3-navigation-r1

`npx tsc --noEmit` is clean. I did not run the app, so none of this has been checked in a browser. Items 7, 8 and 9 need no change in my files, and item 9 needs another agent's decision. No commits.

**Changed**
- **Item 1, `src/app/App.tsx`:** I added an `AppErrorBoundary` class component that wraps `<BrowserRouter>`.
  - The fallback has a cream page background (`--cream`) and a neutral Bito (`expression="idle" react={false}`, size 112 because 120 is not an allowed size).
  - It shows "Ada yang macet. Coba muat ulang, ya." and one primary Button, "Muat ulang", that calls `window.location.reload()`.
  - `componentDidCatch` calls `console.error('AppErrorBoundary caught an error', error, componentStack)`.
  - There is no animation in the fallback.
  - The JSX indentation inside `App` is off by one level. Prettier will fix it.
- **Item 2, `src/components/layout/AppShell.tsx`:** the creator watermark renders only when `profile?.mode === 'pro'` (and not on the focus routes). It is gone from onboarding, profile select and Junior.
  - The text is now "Dibuat dengan [heart] oleh ahmadaqib", and the Heart aria-label is "cinta".
  - The classes and the 44 px target are unchanged.
- **Item 3, `src/pages/HomePage.tsx`:** I checked Junior Home. It shows no XP number: the header says "Level N", the retention card says "+30 poin", and there is no `XP` string. It also shows no world code. Kickers are sentence-case strings and Junior never prints `.toUpperCase()` of the world id. Nothing needed fixing. Pro keeps both the XP count and "Dunia A01".
- **Item 4, `HomePage.tsx`:** the hero title for a pre-test or post-test is now the world title only. The test name moved into the kicker:
  - Junior: "Tebak-tebakan Awal" or "Tebak-tebakan Lagi".
  - Pro: "Cek Titik Awal · Dunia A01" or "Cek Kemajuan · Dunia A01", on one line.
  - The CTA strings are unchanged. The "Tebak-" wrap and the two-line Pro kicker should be gone.
- **Item 5, `HomePage.tsx`:** in Pro only, the level chip under the bar now shows "{n} XP lagi ke Lv {next}". Junior never shows it.
- **Item 6, `HomePage.tsx`:** the Junior sticker tile shows "Stiker berikutnya: {title}" when the sticker for the hero lesson (`nextAction.lessonId`) is not yet owned. Otherwise it falls back to "{n} dari {total} stiker". Pro keeps the count. I added no strip and no second hook.

**No change needed**
- **Item 7:** the Junior/Pro tile titles already come from `COLLECTION_LABEL`. Junior shows "Buku Stiker" and Pro shows "Koleksi Konsep", which the copydeck and spec §8.9 give as the Pro name. "Koleksi" alone is only the nav label. So Pro Home never says "Buku Stiker" or "stiker".
- **Item 8:** `.pw-main-with-nav` in `src/styles/global.css` (not mine) already sets `padding-bottom: calc(76px + env(safe-area-inset-bottom))` for the bottom-nav layout. The nav is at most about 68 px plus the safe-area inset, so the last cards are not covered. I did not add padding in `AppShell`, because an inline style there would also override 

### Report from sonnet:ui-fix-p4-identity-r1

All four fixes are applied and `npx tsc --noEmit` is clean. I did not run the app or check the layout visually, and I did not read the .agents motion skills. The only motion change is shorter delays, with no new effects. I edited only OnboardingPage.tsx, StickerBookPage.tsx and SettingsPage.tsx; no other owned file needed changes.

**`src/pages/OnboardingPage.tsx`**
- **Step path (row 20):** `StepStops` now sits in a centred flex column. A new line under the path reads "Langkah {n} dari 3 · {Kenalan|Nama dan avatar|Gaya belajar}". The same string is the `ol`'s `aria-label`, and the visible `<p>` is `aria-hidden` so it isn't announced twice.
- **Step 1 layout (row 23):** Bito, the heading and the subtitle stay as one block, still centred in the space above the action bar. I changed its padding from `py-6` to `pb-10 pt-6` to lift it slightly above true centre. The Bito→heading→subtitle `space-y-4` is unchanged.
- **Timing:** the subtitle `setAt(700)` is now `setAt(160)`, and the h1 `KineticText` `at` goes from 240 to 80. The action bar button has no entrance animation, so it is visible and focusable from the first frame.
- **Pro line (row 24):** the first `PRO_LINES` entry is now "Istilah dan kode yang dipakai di dunia kerja". The other two are unchanged.
- **Formatting:** I ran prettier on this file with `--print-width 110 --single-quote --trailing-comma all`. The file is back to the repo's original style, so only the intended changes should show in the diff.

**`src/pages/SettingsPage.tsx` (row 4)**
- I added a small centred line at the bottom of the page, after the last group and before the dialogs: `pw-small`, `text-[var(--ink-3)]`, no mono skin.
- Junior sees plain text: "Dibuat dengan ♥ oleh ahmadaqib".
- Pro sees the same text with "ahmadaqib" linked to https://github.com/ahmadaqib (`target="_blank"`, `rel="noopener noreferrer"`).
- There is no visible "Tentang" label. I took "Tentang" as the name of the line (an "about" line), so only the credit text is shown.

**`src/pages/StickerBookPage.tsx`**
- The "baru!" badge was `-right-1 -top-2`, which poked outside the card. It is now `right-1 top-1`, so it sits inside the card bounds.

**Other**
- The string "pintar sebanyak apa" is not in any of my owned files. It is at `src/pages/AssessmentPage.tsx:87`, which I don't own. Its replacement text, "biar materinya pas buat kamu", needs to be applied by that file's owner.

### Report from sonnet:ui-fix-foundation-r1

All seven items are done, and `npx tsc --noEmit` passes with no errors. I did not run the app, so none of the CSS or PageLoader behaviour has been checked in a browser.

**Changes in `src/styles/motion.css`**
- **Row 30:** added `.pw-t-colors, .pw-t-opacity { transition-duration: 120ms !important }` after the kill-switch declarations. It sits in both the `@media (prefers-reduced-motion: reduce)` block and a new `:root[data-reduced-motion='always'] .pw-t-colors/.pw-t-opacity` rule. Both stay at the end of the file.
- **Row 34:** `.pw-fx-correct` now runs with `var(--ease-out)` instead of `--ease-pop`. The keyframe peak (`scale(1.04)`) is untouched.
- **Row 36:**
  - `.pw-fill` is now `transform calc(240ms * var(--motion-scale)) var(--ease-out)`, down from 320ms.
  - `.pw-flip-inner` is now `transform calc(280ms * var(--motion-scale)) var(--ease-in-out)`, down from 360ms.
  - The sheet and dialog backdrop is now `pw-fade-in 160ms var(--ease-out) both`, instead of plain `ease`.
- **Row 29 support:** added `.pw-loader[data-slow] .pw-loader-bob, .pw-loader[data-slow] .pw-loader-dash { animation: none }` to stop the loops.

**`src/components/fx/PageLoader.tsx` (Row 29)**
- A `slow` state flips after a 3000 ms `setTimeout` in a `useEffect`, and the timer is cleared on unmount.
- When `slow` is true the root gets `data-slow`, which stops the bob and dash loops. The text becomes "Sebentar ya, sedang menyiapkan…".

**Verified, no change needed**
- **Row 27, `KineticText.tsx`:** it already returns plain text when reduced motion is set, in Pro mode, or when `data-reading='comfort'` is set. `boil` only applies on the animated Junior path, so it has no effect in Pro. One caveat: the comfort check reads `document.documentElement.dataset.reading` during render and is not reactive. If the user toggles comfort while the component is mounted, it won't update until the next render.
- **Row 5, `global.css`:** the base `.pw-kicker` is uppercase with `0.14em` tracking, but `:root[data-mode='junior'] .pw-kicker` sets `text-transform: none` and `letter-spacing: 0` by default. Comfort reading has its own matching rule. Junior therefore meets spec 4.4 without comfort being on.
- **Row 1, fonts:**
  - `public/fonts` contains only `OFL-PatrickHand.txt`, `jetbrains-mono-var.woff2`, `patrick-hand-400.woff2` and `plus-jakarta-sans-var.woff2`.
  - `index.html` preloads only `/fonts/plus-jakarta-sans-var.woff2`, which exists.
  - The three `@font-face` rules in `tokens.css` point at the var Jakarta, var JetBrains and Patrick Hand files, all present.
  - A grep for `jakarta-[0-9]` and `jetbrains-[0-9]` across `index.html`, `src`, `scripts` and `package.json` found no references to the deleted files.

No other file needs to change.

### Report from sonnet:ui-fix-orchestrator-r1

Row 1 (blank-capture blocker): the app renders normally on the current code, so the r1 blank shots were a capture problem. No code package needs to fix an exception. `npx tsc --noEmit` passes, and the full capture matrix passes the cheap gate. I did not run any judges.

**What I changed (files owned: harness only)**
- Added `scripts/shoot.mjs`, the capture script that was missing from the repo. It is plain JS, so tsc does not check it.
  - **Playwright** is not a dependency of the repo. The script resolves it from this repo, then `$PLAYWRIGHT_DIR`, then `/Users/a1234/Coding/ngafe/node_modules`. It launches installed Google Chrome if no bundled Chromium exists.
  - **Console and exceptions**: it records console errors and warnings, page exceptions and failed requests per route into `console-<run>.json`.
  - **Waiting**: it waits for a child of `#root`, then for `[aria-busy="true"]` (the PageLoader) to disappear, then `document.fonts.ready`, then two animation frames. There is no fixed sleep. It retries the wait once if a redirect or Vite reload destroys the page context.
  - **Reduced motion**: it emulates `prefers-reduced-motion: reduce`.
  - **Order and retries**: runs go one at a time. A PNG under 10 KB is retried once and then counts as a failure.
  - **Seeded profiles**: it seeds the `petualang-web` localStorage profile (same shape as the persisted store), junior or pro, with the theme matching the run. Any other profile (for example a fresh one) must be seeded separately.
  - **Layout output**: `layout-<run>.json` lists the viewport, horizontal-scroll state, root child count, text length and overflowing elements per route.
  - **Matrix**: five runs. The new `pro-dark-390` is added, `pro-light-390` `/stiker` and the 1280 root route are written.
  - **Gate**: it exports `checkGate(dir)`, also available as `node scripts/shoot.mjs --out <dir> --gate-only`. It fails on any PNG under 10 KB, an empty or non-rendered `layout-*.json`, or any page exception.
  - **Partial runs**: a run with `--runs` or `--routes` overwrites that run's `layout-*.json` and `console-*.json` with only those routes. Run the full matrix before gating.
- Started the dev server on `localhost:5199` (vite, `--strictPort`, still running; its log is in the scratchpad `vite.log`). I loaded `/beranda` with the seeded junior profile. There were zero console errors, zero page exceptions and zero failed requests, and the screenshot is the real cream Home (75 KB).
- Ran the full matrix into `docs/superpowers/shots/after-r2/`. That is 50 PNGs, 5 layout JSONs and 5 console JSONs, and the gate passes with every PNG over 10 KB. There is no horizontal scroll on any route in any run.
- The first matrix run exposed two harness problems, both fixed in the script. `/belajar/a01-l02` and `/penjaga/a01` captured the PageLoader ("Bito sedang mengantar halaman…") at about 11 KB, and `/stiker` in pro-dark lost its page context mid-wait.

**Notes for the orchestrator**
- Row 1 of §17 can be marked re

### Report from sonnet:ui-fix-p2-lesson-r1

All seven items are handled, and `npx tsc --noEmit` is clean. I did not run the app, so the question centering and the always-visible "Petunjuk" label have not been looked at in a browser.

- **Row 32, `src/components/lesson/FeedbackSheet.tsx`:** removed `delay: 120` and set `duration: 240`. EASE.drawer is unchanged and Bito was left alone.
- **Row 31, `src/components/questions/QuestionRenderer.tsx`:** deleted the `scale(1.02)` bump on arrow-button reorder. The same-frame swap and focus-follows-row logic are unchanged. I updated the comment next to it and the `kicker` prop doc.
- **Row 35:**
  - `src/components/sims/SimulatorsA.tsx`: the three transform transitions (the three `duration-200` cards) now have `ease-[var(--ease-out)]`. I used this instead of `.pw-t-move` because `.pw-t-move` only transitions `transform`, and these cards also animate border and background colour.
  - `src/pages/ReviewBoxPage.tsx`: the toggle knob (`transition-transform duration-[160ms]`) now has `ease-[var(--ease-out)]`.
- **Row 28, `src/components/lesson/LessonResult.tsx`:** no change needed. The `boil` prop is already passed to KineticText only when `!pro && earned === 3`, and other results render a plain `h1`.
- **Row 13, `src/pages/LessonPlayerPage.tsx`:**
  - The warm-up kicker is now "Ingat lagi!" in Junior and "Pemanasan" in Pro. It replaces the old "Pemanasan · masih ingat?", and I found no "PEMANASAN PELAJARAN LALU" string anywhere in `src`.
  - The question block now has `justify-center pb-[6vh]` on its container. Short questions sit near the optical centre between header and action bar, and tall ones still grow and scroll normally. No decoration was added.
- **Row 18, `src/components/lesson/ActionBar.tsx`:** the "Petunjuk" text label was `hidden min-[480px]:inline` and is now always visible in both modes. It was previously hidden below 480px, so on a narrow phone the button showed only the lightbulb. The aria-label is unchanged.
- **Row 30:** no change needed. `data-rm="fade"` is already on the FeedbackSheet container.

I made no edits outside my owned files. I touched `FeedbackSheet.tsx`, `QuestionRenderer.tsx`, `SimulatorsA.tsx`, `ReviewBoxPage.tsx`, `LessonPlayerPage.tsx` and `ActionBar.tsx`.

### Report from sonnet:ui-fix-p1-ui-kit-r1

Both fixes are in, and `npx tsc --noEmit` reports no errors. I touched only `Bito.tsx` and `ChoiceCard.tsx`, and nothing was committed.

- **Row 36, `src/components/mascot/Bito.tsx` (think dots):**
  - Dots now enter from `{opacity:0, transform:'scale(0.9)'}` to `{opacity:1, transform:'none'}`, no longer from `scale(0.6)` to `scale(1)`.
  - Stagger is `i * 80` instead of `i * 150`. The `120 ms` base delay, `180 ms` duration and `EASE.out` are unchanged.
  - The existing guard `if (face !== 'think' || !react) return` is unchanged, so no per-answer Bito reaction was added.
- **Row 30, `src/components/ui/ChoiceCard.tsx`:**
  - The card button now has `pw-t-colors` in its class list, replacing the Tailwind `[transition-property:background-color,border-color,color,opacity]` class. That class was layered, and `.pw-edge` in `global.css` (unlayered) overrode it, so the opacity dim was never transitioning.
  - The button gets a module-level inline style, `transitionProperty: 'background-color, border-color, color, opacity'`. Selected, judged and dimmed changes now fade over `140 ms`, and the dim is included.
  - The check dot has `pw-t-opacity` in place of the Tailwind `[transition-property:opacity,scale]`, `duration-[120ms]` and `ease-[var(--ease-out)]` classes. It has an inline `transitionProperty: 'opacity, scale'`.
  - Under reduced motion, the existing `@media (prefers-reduced-motion: reduce)` rule in `motion.css` (`.pw-t-colors, .pw-t-opacity { transition-duration: 120ms !important }`) now reaches both elements. They keep a `120 ms` fade. I left `data-rm="fade"` alone, since it drives an entry animation, not a state fade.

- **Check dot timing:** it now fades over `140 ms` instead of `120 ms`, because `.pw-t-opacity` sets the duration.
- **Reduced motion on the dot:** it still has the `scale-90` to `scale-100` change, which runs for `120 ms` there. Removing that scale would drop the M17 scale on the check dot for everyone, so I left it. If you want zero movement under reduced motion, foundation can add a `[data-reduced-motion='always'] ... { scale: 1 }` rule.

Foundation's rule at `motion.css` ~line 1387 covers only `@media (prefers-reduced-motion: reduce)`. The in-app `[data-reduced-motion='always']` setting is not covered for `.pw-t-colors` or `.pw-t-opacity`. Foundation needs to extend that selector, because I can't edit `motion.css`.

