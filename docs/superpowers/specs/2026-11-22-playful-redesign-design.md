# Petualang Web — Playful Redesign Spec: "Buku Saku Petualang"

| | |
|---|---|
| Date | 2026-11-22 |
| Branch | `redesign/playful-ui-copydeck` |
| Status | Approved direction, revised after the judge panel on 2026-11-23 (§15). Motion reviewed the same day: §5.9 is the final motion catalogue. Ready to build |
| Companion doc | `docs/superpowers/specs/2026-11-22-copydeck-guide.md` (curriculum text rewrite) |
| Source of truth it amends | `prd.md` §10 (Design System), §9 (screens). Deltas are listed in §11 of this spec |
| Stack (unchanged) | React 19, Vite 6, Tailwind v4, zustand, react-router 7 (`BrowserRouter`), lucide-react |

A builder should be able to implement this without asking questions. Where the spec says "must", it is a requirement. Everything else in the existing app that this spec does not mention stays as it is.

---

## 0. The ten decisions

1. **Direction: "Buku Saku Petualang"** (the adventurer's pocket notebook). Warm paper, colour-blocked world posters, die-cut stickers, and Bito's marker-pen doodles. It extends the PRD's "buku cerita yang rapi" instead of replacing it.
2. **Colour comes from the world, in big blocks.** Each screen has one saturated "poster" surface in `--world-600`. Neutrals get warmer and gain depth tokens. No new brand hue.
3. **One accent font: Patrick Hand (OFL 1.1)**, used only for short annotations. Plus Jakarta Sans and JetBrains Mono stay, and their duplicated font files collapse into one variable file each (144 KB of font requests becomes about 83 KB including the new font).
4. **Tactile shadow system** with three elevations, an inner top highlight and a pressable bottom edge. Shadows are never animated.
5. **Motion is feedback, not ambience.** Every effect is triggered by something the learner did or by a state change. CSS keyframes plus the Web Animations API. **No animation dependency.** Constant interactions are quiet and rare moments are choreographed: exact values are in §5.9.
6. **One reduced-motion contract.** A global kill switch covers `prefers-reduced-motion`, the in-app "Kurangi animasi" setting and Tailwind `animate-*`. Particles are also guarded in JS.
7. **Junior and Pro are two skins of one system**, switched by tokens under `[data-mode]`: radius, density, motion scale, mascot frequency, annotation style (handwriting vs code comment) and celebration length. Pro has its own identity (a code editor's calm). It is not Junior with things removed. In the UI the Junior mode is called "Petualang".
8. **Lesson player is re-laid out.** Header becomes exit + progress + session XP. Reading cards and questions interleave: never more than two reading cards in a row. "Dengar" (read-aloud) sits next to the text and reads everything a learner must read, including the answer choices and the feedback. "Petunjuk" moves next to "Periksa". A lesson resumes at the question where the learner left it.
9. **Celebrations are tiered and queued**: answer burst, XP fly and count-up, star stamps, sticker slap, level-up, world unlock, weekly-target celebration. A reward never competes with an explanation: the XP chip flies only after the learner presses "Lanjut". There is no daily streak, no timer in Junior and no loss messaging (PRD §3.2 stands).
10. **Six file-disjoint work packages.** Package 0 (foundation) lands first. Packages 1 to 5 then run in parallel.

**Revised by the judge panel.** Five persona judges (ages 8, 11, 14, 27 and a primary-school teacher) reviewed this spec and the copydeck guide. Every issue they raised has a decision in §15. Where two judges asked for opposite things, the answer is the Junior/Pro split, never an average of the two (§7).

---

## 1. Design intent and why

### 1.1 The problem

The audit calls today's UI "Duolingo-lite": white cards on cream `#f6f3ee`, one pressable 3D button, a handful of entrance keyframes. Three things make it feel flat:

- **Sameness.** Every screen is the same white card on the same cream. The world colour, which is the app's strongest asset, only shows up in thin borders and a button.
- **Missing moments.** A correct answer, a level-up, an unlocked world and a new sticker all look almost like a normal screen change. There is no XP movement, no reveal, no path on the map.
- **One voice for two audiences.** Junior and Pro differ only by type scale and touch size, so the app is neither warm enough for a nine-year-old nor crisp enough for an adult.

### 1.2 The intent

Make the app feel like a **notebook that a friendly courier robot is filling in with you**: you turn a page, Bito circles the important thing with a marker, you earn a sticker and stick it in. The interface should reward attention with something to notice, not with noise.

"Cognitively stimulating for children and adults" is treated as a design constraint with a specific meaning:

- **Stimulating** means the screen offers *one* clear thing to look at, *one* thing to wonder about and *one* thing to do. It does not mean more things moving.
- **For children**, stimulation comes from character, colour blocks, touchable objects and visible progress.
- **For adults**, it comes from clarity, rhythm, density that respects their time and small moments of craft.
- Both groups share the same learning science (PRD §3): chunking, dual coding, retrieval, goal gradient. The design applies those per screen (§6).

### 1.3 What we borrow from the reference (uizze.com), as principles only

| Principle observed | How it appears here |
|---|---|
| Hand-drawn annotations that draw themselves in | `Doodle` component: 12 original inline SVG doodles, drawn with `stroke-dashoffset` |
| Handwritten accent next to a clean sans | Patrick Hand next to Plus Jakarta Sans, annotations only |
| Kinetic type with a stepped jitter | `KineticText` "boil", Junior only, four cycles then rest |
| Floating and flipping sticker references | Die-cut sticker treatment, sticker flip in the Sticker Book |
| Tactile cards: layered soft shadow plus 1 px inner highlight | `--elev-1/2/3` tokens |
| Cursor-following sheen | `useSheen`, pointer devices only, posters and stickers only |
| Large radii and ease-out-expo curves | Radius scale 8 to 34 px, `--ease-out-expo`, `--ease-out-quint` |
| Focus-ring pulse | One-shot `outline-offset` settle on `:focus-visible` |

Nothing from that site is copied: no branding, text, colours, illustrations or SVG paths. Every doodle path and illustration is drawn for this project.

---

## 2. Goals, non-goals, anti-goals

### Goals

- G1. Every primary screen passes the PRD's five-second test and squint test (PRD §10.11) **and** has one deliberate moment of delight.
- G2. Every learning event in the catalogue (§5.4) has visible feedback, in both modes, with a reduced-motion fallback.
- G3. Junior and Pro are recognisably different at a glance while sharing every component.
- G4. Dark mode is correct on every screen. No hard-coded hex in components.
- G5. WCAG 2.1 AA still passes. `npm run check:contrast` passes with the new tokens and all 22 world colours.
- G6. No regression in the performance budget (PRD §13.8): initial JS ≤ 180 KB gzip, fonts ≤ 90 KB, INP ≤ 200 ms on a low-end Android phone.
- G7. In Junior, nothing a learner must read to proceed is text-only: story, concept, question, answer choices, hint and feedback can all be heard (§8.5).
- G8. A session that is cut off resumes where it stopped, including inside the quiz (§8.5).
- G9. A learner never presses "Lanjut" more than twice in a row without doing something: answering, trying a simulator or revealing a card (§8.5).

### Non-goals (this pass)

- No change to the content schema beyond three additive optional fields: `modes` on `Rich` segments, `icon` on choices, sort items and sort bins, and `atWork` on lessons (§12 P0). No change to `src/store/useAppStore.ts` or to the persisted profile schema. New per-device state (quiz resume, personal records, reading comfort, seen flags) lives in separate `localStorage` keys.
- No change to scoring, unlock rules, Leitner logic or routes.
- No View Transitions API and no router migration. Route transitions are enter-only CSS.
- No sound assets. The five existing Web Audio effects are re-mapped and two short synthesised effects are added (§5.8).
- No new illustrations for lessons. Existing `ConceptVisuals` are re-tokenised, not redrawn.
- No haptics, no canvas, no Lottie or Rive.
- No live code editor inside lessons and no simulator redesign. Both are follow-up work (§15.3).
- No service worker in this pass (PRD v1.1). This pass prefetches the active world and fixes the offline message (§8.2, §8.5).
- No third text tier for readers under nine. Junior stays written for ages 9 to 12. Younger children are supported through read-aloud and a companion (§7).
- No new characters. Bito stays the only mascot and the guardians stay shields.

### Anti-goals (things this redesign must not become)

- **Not a noisy kids' app.** No ambient motion loops, no decoration behind text, no more than two doodles per screen.
- **Not manipulative.** No daily streak, no loss aversion, no random rewards, no confetti on ordinary clicks (PRD §3.2). The result screen offers a stopping point, and a reward animation never plays over the text that explains an answer.
- **Not shaming, and not falsely praising.** Wrong answers are amber "Belum pas" (Junior) or "Belum tepat" (Pro), never red, never a harsh shake. "Hampir!" is used only when most of the answer was right (§5.5). Bito has no sad or disappointed expression.
- **Not rushing.** No countdowns and no time-triggered nudges in Junior. Timed play exists only as an optional stopwatch in Pro (§8.11).
- **Not a clone.** No resemblance to the reference site's brand.
- **Not slower.** Nothing may delay input. Every sequence is skippable with a tap and the primary button is focusable from the first frame.

---

## 3. Approaches considered

| | A. Polish pass | **B. Buku Saku Petualang (chosen)** | C. Illustrated game world |
|---|---|---|---|
| What it is | Keep the white-card look. Add the missing effects and fix dark mode | New surface language (posters, stickers, doodles, handwriting), full motion system, two mode personalities, CSS and WAAPI only | Scene-based UI: illustrated backgrounds, parallax, character animation with Rive or Lottie, canvas particles |
| Fixes "boring" | Partly. Effects help, the sameness stays | Yes. Colour, texture and character change on every screen | Yes, strongly |
| Cost | Low | Medium. Mostly CSS, small TS utilities, no new art beyond 12 doodles | High. Dozens of new illustrations and animation files |
| Low-end Android | Safe | Safe. Transform and opacity only, particle caps, lite tier | Risky. Canvas and runtime animation libraries on 2 GB devices |
| Bundle | +2 KB | About +14 KB gzip (CSS + JS), fonts go *down* | +60 to 150 KB before art |
| Clarity rules (PRD §10.11) | Kept | Kept. Rules V1 to V14 are designed in | At risk: text over imagery, several focal points |
| Contrast across 22 worlds | Unchanged | Verified numerically (§4.3) | Each scene needs its own audit |

**Chosen: B.** A does not answer the brief: the user asked for an overhaul, and effects on top of identical white cards would still read as the same app. C answers it but breaks three hard constraints at once (performance on school devices, the 180 KB budget, and the clarity rules), and needs art production that this project does not have. B gets most of C's character from things CSS is good at: colour fields, shadows, strokes that draw, and objects that respond to touch.

---

## 4. Visual direction: "Buku Saku Petualang"

### 4.1 The five rules of the look

1. **Paper, poster, sticker.** Three surface kinds only. *Paper* is the neutral page and cards. A *poster* is the one saturated world-coloured block per screen. A *sticker* is any illustration, avatar or reward, shown die-cut with a slight tilt.
2. **Bito holds the pen.** Doodles and handwritten notes are Bito's annotations. They always point at, circle or underline something real. If a doodle would not help a child find the next action, it is not drawn.
3. **Objects have weight.** Things you can press look raised and move down when pressed. Things you cannot press are flat.
4. **One loud thing.** One poster, one primary button, at most two doodles, at most one mascot per screen.
5. **Text sits on plain colour.** Never on an illustration, a pattern or a gradient (PRD V5).

### 4.2 Palette tokens

All values were checked with the WCAG relative-luminance formula. Ratios are listed in §10.1.

#### Neutrals and status

| Token | Light | Dark | Use | Change |
|---|---|---|---|---|
| `--cream` | `#FBF3E4` | `#14162A` | App background (the page) | Light was `#F6F3EE`. Warmer, more chroma |
| `--paper` | `#FFFDF8` | `#1E2140` | Cards | Light was `#FFFFFF` |
| `--paper-2` | `#F3E9D6` | `#171A33` | Wells, inset areas, inline code background, disabled fills | New |
| `--paper-raised` | `#FFFFFF` | `#262A4F` | Sheets, dialogs, dragged items | New |
| `--line` | `#E9DEC8` | `#2E3258` | Hairlines, card borders | Light was `#E4E1DA` |
| `--line-strong` | `#8E8672` | `#6F75A3` | Boundaries that must reach 3:1: text inputs, drop zones, hotspot regions | New |
| `--ink` | `#1F2340` | `#E8EAF6` | Main text | Unchanged |
| `--ink-2` | `#4A4F72` | `#B8BCE0` | Secondary text | Unchanged |
| `--ink-3` | `#646886` | `#9499C2` | Helper text, inactive icons | Light was `#8A8EA8` (3.2:1, failed AA) |
| `--ok-500` / `--ok-600` / `--ok-50` | `#23913F` / `#1C7432` / `#EAF7EC` | `#23913F` / `#6FE08B` / `#132A1D` | Correct | Unchanged |
| `--warn-500` / `--warn-700` / `--warn-50` | `#C97A00` / `#8F5600` / `#FFF4E0` | `#C97A00` / `#FFC857` / `#2C200D` | Wrong answers, hints | Unchanged |
| `--err-500` / `--err-600` / `--err-50` | `#D23B2A` / `#B52D1E` / `#FDECEA` | `#D23B2A` / `#FF8577` / `#331618` | Technical errors only | Unchanged |
| `--star` | `#F5B400` | `#F5B400` | Stars, XP, rewards | Unchanged |
| `--star-50` | `#FFF3CC` | `#33290F` | Reward chip background | New |
| `--star-700` | `#7A5200` | `#FFD466` | Text on `--star-50` | New |
| `--on-star` | `#1F2340` | `#14162A` | Text and icons on a solid `--star` fill (badges, gold buttons). Dark in both themes, because `--ink` turns light in dark mode | New |
| `--boss` | `#1F2340` | `#0F1122` | Boss surfaces, code blocks | New (replaces hard-coded `--ink` backgrounds) |
| `--on-boss` | `#FFFDF8` | `#E8EAF6` | Text on `--boss` | New |

#### Semantic surface aliases (use these in components, not raw tokens)

| Alias | Value | Use |
|---|---|---|
| `--surface-page` | `var(--cream)` | Body |
| `--surface-card` | `var(--paper)` | `.pw-card` |
| `--surface-well` | `var(--paper-2)` | `.pw-well` |
| `--surface-stage` | `var(--world-50)` | `.pw-stage`: the tinted area that holds an illustration |
| `--surface-poster` | `var(--world-600)` | `.pw-poster`: the one saturated block |
| `--on-poster` | `var(--world-btn-text)` | All text and icons on a poster. Never reduce its opacity |
| `--doodle` | `var(--world-600)` light, `var(--world-700)` dark | Doodle strokes |
| `--marker` | `color-mix(in srgb, var(--star), transparent 45%)` | `.pw-mark` highlighter |

### 4.3 How world accents fit

- The 22 world colours and the `--world-50 / -100 / -600 / -700` `color-mix()` scale are **unchanged**. The yellow-world and B10 overrides in `tokens.css` stay.
- What changes is *how much* of the screen the world colour gets. Each screen has one `.pw-poster` in `--world-600` with `--on-poster` text, and optionally one `.pw-stage` in `--world-50`. Everything else is neutral.
- Verified for the real CSS values (not the checker's adjusted ones): white on `--world-600` is at least **4.80:1** for every non-yellow world (lowest is green `#22833A`). Yellow worlds and dark-mode B10 use dark text through the existing `--world-btn-text` override. `--world-700` on `--paper`, `--cream`, `--world-50` and `--world-100` is at least **5.18:1** in light and **4.82:1** in dark.
- Rules that follow from the numbers:
  - Text on a poster is always `--on-poster` at full opacity. A translucent white on green drops to 3.96:1.
  - Coloured text on a neutral surface is always `--world-700`, never `--world` or `--world-600`.
  - Raw `--world` is for illustrations, doodles and fills without text.
- Rewards are always `--star`, in every world, so a reward reads the same everywhere.
- The Map shows several world colours at once (one per node). That is the one screen exempt from "one accent" (PRD V4), as it already is today.

### 4.4 Typography

| Role | Family | Weights | Notes |
|---|---|---|---|
| UI and reading | Plus Jakarta Sans (variable, `wght` 200 to 800) | 400 body, 600 emphasis, 700 `h3` and buttons, 800 headings | Already shipped. Declare **one** `@font-face` with `font-weight: 200 800` |
| Code | JetBrains Mono (variable, `wght` 400 to 800) | 400, 700 | One `@font-face` with `font-weight: 400 800` |
| Accent | **Patrick Hand** (OFL 1.1), regular 400 only | 400 | New. Annotations only |

**Font file fix (verified).** `public/fonts/jakarta-400.woff2`, `-600` and `-800` are byte-identical (same MD5) and are a variable font with a `wght` axis of 200 to 800. The two JetBrains files are also identical and variable (400 to 800). Today the browser can download the same 27 KB file three times, and weight 700 resolves to the 800 face. Fix in Package 0:

- Rename `jakarta-400.woff2` to `plus-jakarta-sans-var.woff2`. Delete `jakarta-600.woff2` and `jakarta-800.woff2`.
- Rename `jetbrains-400.woff2` to `jetbrains-mono-var.woff2`. Delete `jetbrains-700.woff2`.
- Add `patrick-hand-400.woff2` (Latin subset, must be ≤ 24 KB) and `OFL-PatrickHand.txt` to `public/fonts/`.
- Font budget after the change: 27.3 + 31.3 + ≤ 24 = **≤ 83 KB** (PRD budget 90 KB).

**Getting Patrick Hand.** Install `@fontsource/patrick-hand` temporarily, copy its Latin 400 `woff2` (expected at `files/patrick-hand-latin-400-normal.woff2`) and its licence file into `public/fonts/`, then uninstall the package so it never enters `package.json`. If the file is over 24 KB, subset it with `pyftsubset` to `U+0020-007E, U+00A0-00FF, U+2013-2014, U+2018-201D, U+2026, U+2192`. Confirm the licence text says SIL Open Font License 1.1 before committing. If the font cannot be obtained, ship without it: the `--font-hand` stack falls back to Plus Jakarta Sans 600, and the `.pw-hand` tilt still marks the text as an annotation.

```css
--font-hand: 'Patrick Hand', 'Plus Jakarta Sans', sans-serif;
--fs-hand: calc(var(--fs-body) * 1.15);   /* Patrick Hand has a small x-height */
```

**Rules for the accent font**

- Only inside `.pw-hand` / the `Annot` component. At most five words. At most two annotations per screen.
- Never for question prompts, answer choices, explanations, body text, buttons or anything a learner must read to proceed.
- Minimum rendered size 18 px (Junior 20 px). Colour `--ink-2` or `--world-700` on neutral surfaces, `--on-poster` on posters.
- An annotation that carries meaning ("kamu di sini") must also exist as plain text for assistive technology. Purely decorative ones are `aria-hidden`.
- Pro mode does not use the handwriting font for annotations. It uses the code-comment skin (§7).
- With "Teks nyaman dibaca" on (§8.10), `.pw-hand` uses Plus Jakarta Sans 600 with no tilt.

**Type scale.** The existing `--fs-*` clamp tokens and the Junior overrides stay. Changes:

| Class | Change |
|---|---|
| `.pw-display`, `.pw-h1` | Add `letter-spacing: -0.02em`. Weight 800 |
| `.pw-h2` | `letter-spacing: -0.01em`. Headings only. Question prompts no longer use it |
| `.pw-prompt` (new) | The question prompt, the text that matters most on a question screen: the size of `.pw-h2`, weight 700, `letter-spacing: 0`, `line-height: 1.4`, `max-width: 60ch` |
| `.pw-h3` | Weight 700 now renders as a real 700 (variable font) |
| `.pw-kicker` | Pro: unchanged (uppercase, tracked). Junior: `text-transform: none; letter-spacing: 0`, and the source string is sentence case ("Soal 2 dari 4"). On posters it uses `--on-poster` |
| `.pw-hand` (new) | `font-family: var(--font-hand); font-size: var(--fs-hand); line-height: 1.15; rotate: -2deg;` |
| `.pw-note` (new) | The annotation slot. Junior: same as `.pw-hand`. Pro: `font-family: var(--font-mono); font-size: 0.8125rem; color: var(--ink-3);` with `// ` generated by `::before` |
| `.pw-mark` (new) | Highlighter under one key phrase: `background: linear-gradient(transparent 58%, var(--marker) 58% 92%, transparent 92%)` |

**Reading comfort.** `:root[data-reading='comfort']` is set by the "Teks nyaman dibaca" setting (§8.10). Under it: body and prompt text get `letter-spacing: 0.02em`, `word-spacing: 0.08em` and `line-height: 1.6`; headings lose their negative tracking; kickers are sentence case in both modes; `.pw-hand` loses its tilt and uses the sans family; `KineticText` renders plain text (no pop, no boil). It is independent of "Kurangi animasi". It exists because jittering letters, tilted text, tight tracking and all-caps stack up for a dyslexic reader.

### 4.5 Radii and spacing

One scale, two personalities. Components use the tokens, never a literal radius.

| Token | Pro (base) | Junior | Use |
|---|---|---|---|
| `--radius-xs` | 6 px | 8 px | Chips, inline code |
| `--radius-sm` | 10 px | 12 px | Inputs, small buttons, tags |
| `--radius-md` | 14 px | 18 px | Buttons, choice cards |
| `--radius-lg` | 20 px | 26 px | Cards |
| `--radius-xl` | 28 px | 34 px | Posters, stages, sheet top corners |
| `--radius-full` | 999 px | 999 px | Pills, avatars |

| Token | Pro | Junior | Use |
|---|---|---|---|
| `--space-card` | 16 px | 20 px | Card inner padding |
| `--gap-stack` | 12 px | 16 px | Gap between items in a group |
| `--gap-group` | 24 px | 28 px | Gap between groups |
| `--screen-pad` | 16 px | 20 px | Existing |
| `--touch-min` | 48 px | 56 px | Existing |

Remove the mixed literals found in the audit (`rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded` on cards and tiles). Replace with `rounded-[var(--radius-*)]`.

### 4.6 Tactile shadow system

Shadows are tinted with navy ink, not black, so they sit on warm paper. Every raised surface also gets a 1 px inner top highlight.

```css
/* light */
--elev-1: inset 0 1px 0 rgba(255,255,255,.90),
          0 1px 2px rgba(31,35,64,.06),
          0 6px 14px -6px rgba(31,35,64,.14);
--elev-2: inset 0 1px 0 rgba(255,255,255,.90),
          0 2px 6px rgba(31,35,64,.07),
          0 16px 32px -14px rgba(31,35,64,.30);
--elev-3: 0 4px 12px rgba(31,35,64,.10),
          0 28px 60px -20px rgba(31,35,64,.45);
--elev-inset: inset 0 2px 4px rgba(31,35,64,.07);
--elev-sticker: 0 0 0 3px var(--paper),
                0 2px 0 3px rgba(31,35,64,.10),
                0 10px 18px -8px rgba(31,35,64,.35);

/* dark */
--elev-1: inset 0 1px 0 rgba(255,255,255,.06), 0 1px 2px rgba(0,0,0,.40), 0 8px 18px -8px rgba(0,0,0,.55);
--elev-2: inset 0 1px 0 rgba(255,255,255,.08), 0 2px 6px rgba(0,0,0,.45), 0 18px 36px -14px rgba(0,0,0,.70);
--elev-3: 0 4px 12px rgba(0,0,0,.50), 0 28px 60px -20px rgba(0,0,0,.80);
--elev-inset: inset 0 2px 4px rgba(0,0,0,.35);
--elev-sticker: 0 0 0 3px var(--paper-raised), 0 10px 18px -8px rgba(0,0,0,.70);
```

| Level | Token | Used by |
|---|---|---|
| Flat | none, 1.5 px `--line` border | Locked items, disabled items, list rows |
| Sunken | `--elev-inset` on `--paper-2` | Wells, progress track, drop zones, empty sticker slots |
| Resting | `--elev-1` | `.pw-card`, tiles |
| Raised | `--elev-2` | Hovered card, active lesson row, FeedbackSheet, dragged item |
| Overlay | `--elev-3` | Dialogs, celebration overlays |
| Sticker | `--elev-sticker` | `.pw-sticker` |

**Pressable edge.** Buttons and choice cards keep the solid bottom edge (`0 4px 0 <edge colour>`), combined with the inner highlight. On press the element moves down by the edge height and the edge collapses to 1 px. This replaces `--shadow-btn` and `--shadow-card`, which are removed along with the other unused tokens.

**Shadow rules**

- Shadows are static. To animate a "lift", put the larger shadow on a `::after` pseudo-element and animate its `opacity`.
- `pw-pulse-ring` currently animates `box-shadow`. Replace it with a pseudo-element ring that animates `transform: scale()` and `opacity`.
- Remove `backdrop-filter: blur()` from `dialog::backdrop`. Use a solid scrim: `rgba(20,22,42,.55)`.
- Remove `filter: brightness()` hover transitions. Change `background-color` instead.

### 4.7 Texture and doodle language

**Texture.** One texture only, in CSS, and only on stages and the map, never behind text:

```css
.pw-stage {
  background-color: var(--surface-stage);
  background-image: radial-gradient(color-mix(in srgb, var(--world), transparent 78%) 1.2px, transparent 1.3px);
  background-size: 18px 18px;
}
```

No SVG noise filters, no `background-attachment: fixed`, no raster textures.

**Doodles.** `src/components/fx/Doodle.tsx` ships exactly twelve original doodles as inline SVG paths:

| Name | Shape | Typical use |
|---|---|---|
| `underline` | One wavy stroke | Under a headline word |
| `scribble` | Back-and-forth underline | Under a result headline |
| `circle` | Imperfect loop that overlaps itself | Around the new or important thing |
| `arrow` | Curved arrow, direction by `rotate` prop | Pointing at the primary button |
| `arrow-loop` | Arrow with one loop | "Start here" on first sessions |
| `spark` | Four short strokes in a cross | Next to a star or a correct answer |
| `rays` | Seven radial strokes | Behind a reward |
| `check` | Hand-drawn tick | Completed states |
| `curl` | Question-mark curl | Wrong-answer state, mystery sticker |
| `sprout` | Stem with two leaves | Weekly target reached |
| `flag` | Small pennant | "Kamu di sini" on the map |
| `dash-path` | Dashed trail segment | Map and lesson trail |

Doodle rules:

- Stroke 2.5 to 3 px, round caps and joins, `stroke: currentColor` (default `var(--doodle)`), no fill. Paths are slightly irregular on purpose.
- Each path has `pathLength="1"`, so drawing in is `stroke-dasharray: 1; stroke-dashoffset: 1 → 0`.
- Always `aria-hidden="true"` and `pointer-events: none`.
- At most two per screen in Junior, one in Pro (only `underline`, `arrow` and `check` in Pro).
- A doodle is anchored to a real element and must not overlap text.
- The "start here" doodle on Home is shown only while the profile has fewer than three completed lessons.

### 4.8 Sticker treatment

`.pw-sticker` is applied to world islands, avatars, earned stickers, the boss shield and Bito when he sits on a poster.

```css
.pw-sticker {
  border-radius: var(--radius-lg);
  box-shadow: var(--elev-sticker);
  rotate: var(--tilt, -3deg);          /* individual transform property, so .pw-pressable can still use transform */
}
```

- Tilt is deterministic: `--tilt` cycles through `-3deg, 2deg, -1.5deg, 3deg` by index. Never random per render.
- Locked or unowned stickers are flat: no tilt, no shadow, a dashed `--line-strong` outline and a `curl` doodle or a lock icon with the text "Terkunci".
- **Gold finish.** A sticker whose lesson has three stars gets `data-finish="gold"`: the paper outline in `--elev-sticker` becomes `--star`, with a small star icon and the text "emas" on the back. One sheen sweep plays the first time it is shown. The finish is computed from the lesson stars that already exist, so it is deterministic. Nothing is random.
- **Pro treatment.** In Pro the collection renders the same component as an upright concept card: no tilt, `--radius-md`, a 1.5 px `--line` border instead of the die-cut outline, and the concept name under the art. Pro UI text never calls it a sticker (§7). World islands and avatars keep the sticker treatment in Pro at half tilt.

### 4.9 Mascot and illustration tokens (dark-mode fix)

Hard-coded `#1F2340` and `#FFFFFF` in `Bito.tsx`, `CharacterAvatar.tsx`, `BrandLogo.tsx` and `ConceptVisuals.tsx` are replaced by these tokens, defined in `tokens.css`:

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bito-body` | `#FFFDF8` | `#2A2E57` | Bito's body, avatar faces |
| `--bito-line` | `#1F2340` | `#C9CDEE` | Outlines, arms, antenna, feet |
| `--bito-screen` | `#1F2340` | `#0F1122` | Bito's face screen (dark in both themes) |
| `--bito-eye` | `#F5B400` | `#F5B400` | Eyes, antenna tip |
| `--illus-line` | `var(--bito-line)` | same | Illustration outlines |
| `--illus-fill` | `var(--bito-body)` | same | Illustration light fills |
| `--illus-shade` | `var(--paper-2)` | same | Illustration secondary fills |
| `--illus-accent` | `var(--world)` | same | Illustration accent |
| `--illus-accent-soft` | `var(--world-100)` | same | Illustration soft accent |
| `--illus-sun` | `var(--star)` | same | Highlights |

Avatar skin, hair and clothing colours in `CharacterAvatar.tsx` are content, not theme. Keep them as a named palette object at the top of that file. Only outlines and neutral fills move to tokens.

`scripts/check-hardcoded-colors.ts` (new, Package 0) fails when a hex literal appears in `src/components` or `src/pages` outside an allow-list (`CharacterAvatar.tsx` palette, `WorldThemeWrapper.tsx` default, `Bito.tsx` `BITO_COLORS`). It runs in warn mode until Packages 1 to 4 have landed, then joins `npm run build`.

---

## 5. Motion system

### 5.1 Principles

1. **Triggered, never ambient.** Motion starts because the learner acted or the state changed. The only loops are the loader and Bito's capped idle.
2. **Transform and opacity only.** Nothing else is animated (§9).
3. **Input is never blocked.** Animations do not delay focus, taps or the primary button. A tap during a sequence finishes it.
4. **Meaning first.** Every animated state is also expressed with icon, text and colour, so reduced-motion users lose nothing.
5. **Scale with the audience.** Junior plays the full effect. Pro plays a shorter version with the same weight, minus the cute layer (boil, doodle sparks, frequent mascot).
6. **Feedback before reward.** While an explanation is on screen, nothing else moves. Reward motion waits for the learner's next tap.
7. **No clock in Junior.** No effect in Junior is triggered by elapsed time on a question.

### 5.2 Easings and durations

> **Superseded in part by §5.9.2.** The token names for durations stay. The easing set and the duration values are the ones in §5.9.2. `prefs.ts` below is unchanged.

```css
--ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);     /* entrances, draws */
--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);    /* sheets, pages */
--ease-in-quick:  cubic-bezier(0.5, 0, 0.75, 0);     /* exits */
--ease-in-out:    cubic-bezier(0.65, 0, 0.35, 1);    /* A to B travel (XP fly, gate) */
--ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1); /* overshoot pops (existing) */

--dur-press:     80ms;
--dur-fast:      140ms;
--dur-base:      240ms;
--dur-pop:       320ms;
--dur-slow:      420ms;
--dur-draw:      480ms;
--dur-travel:    600ms;
--dur-celebrate: 1200ms;

--motion-scale: 1;                       /* Junior */
:root[data-mode='pro'] { --motion-scale: 0.7; }
```

Every animation duration is written as `calc(var(--dur-*) * var(--motion-scale))`. `--dur-press` and `--dur-fast` are not scaled. The removed curves are `--ease-out`, `--ease-in-out` (old value) and `--ease-drawer`. Replace their uses with the table above.

`src/motion/tokens.ts` mirrors these values for WAAPI code. `src/motion/prefs.ts` exports:

```ts
type FxTier = 'off' | 'lite' | 'full';
function getMotionPrefs(): { reduced: boolean; tier: FxTier; scale: number; mode: 'junior' | 'pro' };
function useMotionPrefs(): ReturnType<typeof getMotionPrefs>;   // re-renders on change
```

- `reduced` is true when `matchMedia('(prefers-reduced-motion: reduce)')` matches **or** `document.documentElement.dataset.reducedMotion === 'always'`.
- `tier` is `'off'` when `reduced`. It is `'lite'` when `navigator.hardwareConcurrency <= 4` or `navigator.deviceMemory <= 2`. Otherwise `'full'`. The tier follows the device, not the mode: Pro drops the cute layer (§7), it does not get weaker feedback.
- `src/main.tsx` sets `data-fx-tier` on `<html>` once at start, so CSS can also target the tier.

### 5.3 The reduced-motion contract

This is the single mechanism. It fixes the two gaps in the audit: confetti ignoring the in-app setting, and Tailwind `animate-*` being unhandled.

```css
/* motion.css, last rules in the file */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  [data-rm='fade'] { animation: pw-fade-in 120ms linear both !important; }
}
:root[data-reduced-motion='always'] *,
:root[data-reduced-motion='always'] *::before,
:root[data-reduced-motion='always'] *::after { /* same declarations */ }
:root[data-reduced-motion='always'] [data-rm='fade'] { animation: pw-fade-in 120ms linear both !important; }
```

Rules that make the kill switch safe:

- Every keyframe animation must end in the element's resting state, with `animation-fill-mode: both`. Then "duration 0.01 ms, one iteration" lands on the correct final frame.
- A component that wants the PRD's 120 ms fade under reduced motion adds `data-rm="fade"`. Nothing else is needed.
- Particles (confetti, sparks, XP fly clone) are not rendered at all when `tier === 'off'`. This is a JS guard, in addition to CSS.
- `scrollIntoView` and `scrollTo` calls pass `behavior: reduced ? 'auto' : 'smooth'` (today `MapPage` always passes `'smooth'`).
- The existing per-class reduced-motion blocks in `global.css` (lines 476 to 542) are deleted. The kill switch replaces them.

### 5.4 Effect catalogue

> **Read with §5.9.** This catalogue defines each effect's id, trigger and reduced-motion result. Its durations, easings, properties and staggers are replaced by §5.9.4, and the effects cut or narrowed there (M02 to M05, M07, M10, M15 to M17, M45) follow §5.9.

Durations are Junior / Pro. "CSS" means a keyframe or transition driven by a class or data attribute. "WAAPI" means `element.animate()` through `src/motion/waapi.ts`. "RM" is the reduced-motion result.

#### Basics

| ID | Effect | Trigger | Duration | Implementation | RM |
|---|---|---|---|---|---|
| M01 | Press | `:active` on buttons, cards, nav items | 80 ms down, 200 ms spring back | CSS transition on `transform` (`.pw-pressable`, `.pw-btn-*`): `translateY(edge) scale(1.03, .94)` | No transform. Background colour changes |
| M02 | Hover lift | `:hover`, pointer devices only | 140 ms | CSS: `translateY(-2px)`, `::after` shadow opacity 0 → 1 | None |
| M03 | Sheen follow | Pointer moves over a poster or sticker (pointer: fine) | Continuous while hovering | `useSheen` sets `--mx`/`--my` in a `requestAnimationFrame` throttle. A `::before` radial gradient reads them | Off. Also off on touch and in tier `lite` |
| M04 | Focus settle | `:focus-visible` | 240 ms, once | CSS: `outline-offset` 7 px → 3 px | Static ring |
| M05 | Doodle draw | A `Doodle` mounts | 480 ms, delay 200 ms after its anchor | CSS: `stroke-dashoffset` 1 → 0, `--ease-out-expo` | Drawn, no animation |
| M06 | Kinetic headline | `KineticText` mounts (Junior only) | Letters pop in 320 ms with 30 ms stagger, then "boil" 700 ms × 4 cycles, then rest | CSS: per-letter `inline-block` spans with `--i`. Boil is a two-frame keyframe with `steps(1)`, odd and even letters half a cycle apart. One frame change per 350 ms | Plain text. Also plain text when "Teks nyaman dibaca" is on |
| M07 | Stagger reveal | A card or list mounts | Children rise 8 px and fade, 60 ms apart, total ≤ 420 ms | CSS: `.pw-stagger > *` with `animation-delay: calc(var(--i) * 60ms)` | All visible at once |
| M08 | Dialog / sheet open | `<dialog>` opens | 240 ms / 280 ms | CSS (existing `pw-pop-elastic`, `pw-sheet-spring`), retimed with the new easings | 120 ms fade (`data-rm="fade"`) |
| M09 | Toggle and segmented control | A setting or tab changes | 140 ms | CSS transition on the knob or pill `transform` | Instant |
| M10 | Nav tab change | Route changes | 240 ms | CSS: active icon hops 4 px, active pill fades in | None |

#### Navigation and loading

| ID | Effect | Trigger | Duration | Implementation | RM |
|---|---|---|---|---|---|
| M11 | Route enter | Pathname changes | 240 ms / 170 ms | `RouteTransition` wraps route content with a key. Enter only. Going deeper (Home → Map → World → Lesson): rise 12 px and scale .985 → 1. Going back: slide in from the left 16 px. Depth comes from a route table in the component | 120 ms fade |
| M12 | Lesson step forward | "Lanjut" or "Periksa → Lanjut" | 240 ms / 170 ms | CSS, keyed: slides in from the right 28 px and fades | 120 ms fade |
| M13 | Requeued question returns | A question the learner missed comes back | 320 ms | CSS: rises 24 px with `rotate(-2deg → 0)`, kicker reads "Coba lagi" (Junior) or "COBA LAGI" (Pro) with a `curl` doodle | 120 ms fade |
| M14 | Loading | Suspense fallback or lesson fetch lasts > 150 ms | Loop while loading | `PageLoader`: nothing for 150 ms, then Bito bobs (1.2 s loop, 4 px) carrying a parcel along a dashed line whose dashes march (`stroke-dashoffset`, linear). Text: "Bito sedang mengantar halaman…" | Static Bito and text, `aria-busy="true"` |
| M15 | Map path draw | Map mounts | 800 ms / 500 ms | CSS: the completed part of the path draws from the previous progress to the current one (`stroke-dashoffset`) | Path shown at final length |
| M16 | Scroll to current world | Map mounts | Browser smooth scroll | `scrollIntoView` | `behavior: 'auto'` |

#### Answering

| ID | Effect | Trigger | Duration | Implementation | RM |
|---|---|---|---|---|---|
| M17 | Select | Learner picks or places an answer | 280 ms | CSS: existing `pw-jelly-press` on the chosen element | State style only |
| M18 | Drag lift and settle | Sort or order item picked up, then dropped | 140 ms lift, 200 ms settle | CSS: `scale(1.03)` and `--elev-2` while dragging. Spring settle on drop. Target zone flashes its border once | No scale |
| M19 | Correct burst | "Periksa" and the answer is right | 320 ms pop, 480 ms ring, 480 ms sparks | CSS: `.pw-fx-correct` on the answered element (squash and stretch), `::after` ring scales .8 → 1.6 and fades, tick draws in 280 ms. `Burst` adds six `spark` strokes. Sparks only in Junior, in tier `full`, and only on a first-try answer | Green state, tick and text |
| M20 | "Belum pas" wobble | "Periksa" and the answer is wrong | 320 ms | CSS: `.pw-fx-almost`: `rotate(±1.5deg)` and `translateX(±4px)`, two cycles, softer than today's shake. Amber dashed outline, `curl` doodle, and an icon with text on every judged part (§5.5) | Amber dashed state, icon and text |
| M21 | Feedback sheet | Right after M19 or M20 | 280 ms, Bito peeks 320 ms after an 80 ms delay | CSS: sheet rises with `--ease-out-quint`. Bito slides up from behind the sheet's top edge. Title underline doodle draws | 120 ms fade |
| M22 | XP fly | The learner presses "Lanjut" on the FeedbackSheet after a correct answer. It never plays while the explanation is on screen | 600 ms / 420 ms | WAAPI `flyTo(source, target)`: a `+10` chip is cloned into a fixed `#fx-layer` as the sheet closes, travels on an arc (mid keyframe lifted 40 px, scale 1.15) to the header XP counter and shrinks to .6. The next step enters underneath it and is not delayed | No fly. The counter updates |
| M23 | Counter bump and count-up | XP chip arrives, or a number changes on a result screen | 240 ms bump, 400 to 900 ms count | CSS `.pw-fx-bump` (scale 1.25 → 1, spring). `useCountUp` runs `requestAnimationFrame` with ease-out-cubic | Final number at once |
| M24 | Progress fill | Step completed | 420 ms, glint 600 ms at the halfway point and at the end | CSS: inner bar uses `transform: scaleX()` with `transform-origin: left` (not `width`). The glint is a pseudo-element sliding across | Jumps to the new value |
| M25 | Hint offer | Junior only: when a question the learner missed comes back (M13), or after the learner has changed the selection three times without checking. **Never on a timer**: a slow reader is still reading at 12 s | 240 ms fade, once per question | CSS: the label "Butuh petunjuk?" fades in next to the "Petunjuk" button. No wiggle | Label appears |
| M26 | Limit card reveal | Tap "Apa bedanya?" on a Batas Analogi card | 240 ms | CSS: the "Bedanya" column slides in from the right 16 px and fades. Button label changes to "Paham →" | Appears |

#### Results and rewards

| ID | Effect | Trigger | Duration | Implementation | RM |
|---|---|---|---|---|---|
| M27 | Star stamp | Result screen mounts | 320 ms per star, 180 ms apart | CSS `.pw-fx-stamp`: scale 2.2 → .9 → 1 with `rotate(-12deg → 0)`. On landing a `spark` doodle draws and the `star` sound plays | Stars fade in together (120 ms) |
| M28 | Confetti | Three stars or a boss pass | ≤ 1350 ms / ≤ 800 ms | CSS, DOM pieces: 28 in tier `full`, 12 in tier `lite`. Transform and opacity only. Rendered once, removed on `animationend` | Not rendered |
| M29 | Lesson result sequence | Lesson complete | See §5.6 | CSS stagger and M23, M27, M28 | Static, final values |
| M30 | Sticker slap | Result screen with a new sticker, 400 ms after the stars | 420 ms slap, 600 ms sheen | CSS: scale 1.6 → 1, `rotate(-14deg → -3deg)`, opacity 0 → 1, spring. Then one diagonal sheen sweep (`::before` translateX) | Sticker fades in |
| M31 | Sticker flip | Tap a sticker (result screen or Sticker Book) | 420 ms | CSS: `rotateY(180deg)` on a two-faced card with `backface-visibility: hidden`. Back shows the analogy summary. It is a real `<button aria-pressed>` | 120 ms cross-fade |
| M32 | Level-up | XP crosses a level threshold | ≤ 1200 ms / inline 400 ms | Junior: `LevelUpOverlay`. Badge scales in with a spring, the level digit rolls up (`translateY`), `rays` draw, the new title is underlined, Bito shows `wow`, and one line names the next reward ("Di Level 4: syal untuk Bito") from `mascotRewards.ts`. Pro: a toast banner slides down on the result screen, "LEVEL 4 · {gelar}" in mono digits with a count-up and the `unlock` sound, no overlay | Static overlay or banner |
| M33 | Week dot stamp | First completed lesson or review session of the day | 320 ms | CSS: today's dot fills with `.pw-fx-stamp` and a ring | Dot filled |
| M34 | Weekly target reached | The dot that completes the weekly target | 900 ms | CSS: the seven dots hop in a wave (60 ms apart), a `sprout` doodle grows from the last dot (`scaleY` from the bottom), text "Target minggu ini tercapai!". In Pro the consecutive-weeks number counts up. Junior does not show that number (§8.2) | Static text and sprout |
| M35 | Lesson unlock | World Detail mounts and a lesson is unlocked but not yet "seen" | 320 ms lock, 600 ms path, ring twice | CSS: lock icon rotates 20° and fades, the number pops in, the trail segment draws, a pseudo-element ring pulses twice then stops. Label "Baru terbuka" | Static state with the label |
| M36 | World unlock | Boss passed and a new world opens | ≤ 1200 ms / 700 ms | `WorldUnlockOverlay`: the new island sticker rises with a peel (`rotate(-8deg → 0)`, scale .6 → 1), the lock splits into two halves that fly apart, a `dash-path` draws toward it, title "Dunia baru terbuka!". Buttons: "Lihat di peta →", "Nanti saja" | Static card |
| M37 | Map node reveal | Map mounts and a world is unlocked but not yet "seen" | 600 ms | CSS: a coloured layer cross-fades in over the grey layer (opacity, not `filter`), the node pops once | Coloured node |

#### Boss, profile and mascot

| ID | Effect | Trigger | Duration | Implementation | RM |
|---|---|---|---|---|---|
| M38 | Boss intro | Boss screen mounts | 420 ms | CSS: the guardian shield sticker stamps in (scale 1.4 → 1), the title uses M06 in Junior, rule chips stagger | Static |
| M39 | Boss pip | Each boss answer | 240 ms | CSS: the next shield pip fills gold with a bump when correct, and the guardian shield sticker in the header bumps once (scale 1 → .94 → 1), so a right answer reads as a hit on the guardian's shield. A wrong answer gives the pip a dashed outline. No red | Pip state |
| M40 | Boss pass | Boss result, passed | 900 ms / 500 ms | CSS: two gate halves slide apart (`translateX ±100%`, `--ease-in-out`) to reveal the result, then M28 and M36 | Static result |
| M41 | Boss not yet | Boss result, below 80% | 240 ms stagger | CSS: no shake, no red. Bito goes `think` then `happy`. "Sedikit lagi!", the concrete gap ("Kurang 1 jawaban benar") and the lessons to revisit rise in a stagger | Static |
| M42 | Profile deal-in | Profile Select mounts | 320 ms each, 70 ms apart | CSS: profile sticker cards rise and rotate from -4° to their tilt | Visible |
| M43 | Avatar pick | Avatar selected in Onboarding or Profile | 280 ms | CSS: the chosen avatar sticker pops and gains its tilt. Others flatten | State style |
| M44 | Bito idle | Bito rendered with `idle` enabled | Blink 140 ms about every 5 s. Antenna sway ±4° over 2.4 s | CSS on `<g>` groups. **At most four cycles after the last user interaction, then rest** (so no pause control is needed) | None |
| M45 | Bito reactions | Expression prop changes, or a celebration | 420 to 900 ms, once | CSS on the whole SVG and on arm groups (§5.7) | Expression swaps |
| M46 | Empty state | Empty Review Box, empty Sticker Book section | 4 s breathing, four cycles | CSS: Bito `sleep` scales 1 → 1.02 | Static |

#### Added after the judge panel

| ID | Effect | Trigger | Duration | Implementation | RM |
|---|---|---|---|---|---|
| M47 | Bito poke | Junior only: the learner taps Bito on Home, on the Map or on a result screen | 420 to 900 ms, once per tap | CSS: Bito cycles through four reactions in a fixed order (`happy` hop, a 360° spin, antenna bounce, `wow`) with the `bip` sound. Where he is pokeable Bito is a real `<button aria-label="Sapa Bito">`. Taps during a reaction are ignored. It is learner-triggered, so it keeps principle 1 | Expression swaps. Sound still plays |
| M48 | Combo chip | Three first-try correct answers in a row within one lesson or review session | 240 ms pop | CSS: a chip appears beside the session XP chip after "Lanjut": "3 beruntun" (Junior), `// 3 beruntun` (Pro). The number bumps (M23) on each further first-try answer. In Junior the M19 sparks grow from six to eight at five in a row and stay there. On a miss the chip fades out with no text. It is not persisted and carries no reward and no penalty | Chip appears and disappears without motion |
| M49 | Read-aloud highlight | "Dengar" is playing | Follows the speech | The sentence being read gets `.pw-mark`. While choices are read, the choice card being read gets a static ring. Highlight is per sentence, not per word, because word-boundary events are unreliable on Android voices | Same. It is a state, not an animation |
| M50 | Halfway note | Junior only: the progress bar passes 50% | 320 ms, once per lesson | CSS: the note "setengah jalan!" (an `Annot`) pops under the progress bar, together with the M24 glint. No overlay. Input is not paused | Note appears |

### 5.5 Answer feedback by question type

`QuestionRenderer` receives `isSubmitted` and `isCorrect` today but only the multiple-choice family reacts. Each type gets both states. For wrong answers the renderer may mark *which parts* are wrong, but it must not reveal the right answer, because the question comes back later.

| Type | Correct (M19) | Wrong (M20) |
|---|---|---|
| `mcq`, `analogy`, `why`, `scenario`, `limit` | Chosen card: green state, tick draws, pop, ring. Sparks on first try | Chosen card: amber dashed outline, wobble, `curl`. Other cards dim to 60% |
| `tf` | Same, on the chosen Benar/Salah card | Same |
| `sort` | Every item gets a small tick. Bins pop once in a 60 ms stagger | Misplaced items wobble and get the amber dashed outline. Correct items get a tick |
| `order` | The list "zips": items pop top to bottom, 50 ms apart, and a solid green line draws down the left edge | Items in the wrong position get an amber **dashed** left bar and the "belum pas" icon, and wobble 40 ms apart. Items in the right position get a tick |
| `match` | Each connector turns green and thickens, pairs pop in sequence | Wrong pairs: connector turns amber and dashed, the two ends move 6 px apart and back |
| `hotspot` | A green ring ripples from the tapped region and a tick stamps on it | An amber ring ripples once from the tapped point. The marker wobbles |
| `spotbug` | Chosen line gets the green state with a tick in the gutter | Chosen line gets the amber dashed state with the "belum pas" icon in the gutter and wobbles once |
| `fill` | Filled chips pop left to right, each with a tick | Wrong chips wobble and get an amber dashed underline |
| `type` | The input gets the green state and a tick at its end | The input wobbles once and gets an amber dashed border with the "belum pas" icon at its end. The typed text stays |

In every case the FeedbackSheet (M21) follows, the `correct` or `incorrect` sound plays, and the status is also conveyed by icon and text.

**Judged parts never rely on colour or motion.** Every part the renderer marks carries an icon and visually hidden text: a tick with "benar" for a right part, a `rotate-ccw` icon with "belum pas" for a wrong part. Wrong outlines, bars and underlines are dashed. Right ones are solid. This must hold with "Kurangi animasi" on, where the wobble is gone, and under simulated deuteranopia and protanopia (§13). Green `#23913F` and amber `#C97A00` look alike to about one boy in twelve.

**Partial credit decides the title.** For `sort`, `order`, `match` and `fill` the renderer knows how many parts are right. It reports `partsRight / partsTotal` to the page through a new optional callback. When the answer is wrong but that ratio is at least 0.7, the FeedbackSheet title is "Hampir!". In every other wrong case it is "Belum pas" (Junior) or "Belum tepat" (Pro). "Hampir" therefore always means something.

### 5.6 Lesson-complete sequence by stars

> **Timing superseded by §5.9.5 B.** The copy rows, the actions and the stopping-point rule below stay. The "Time" column is replaced by the timeline in §5.9.5 B.

All three share the same layout (§8.5, "Result"). They differ in intensity. Times are for Junior; Pro compresses every gap by `--motion-scale` and skips the items marked "Junior only". The primary button is in the DOM and focusable from the first frame.

| Time | 1 star | 2 stars | 3 stars |
|---|---|---|---|
| 0 ms | Bito `cheer`, one hop | Bito `cheer`, two hops | Bito `cheer`, two hops, then `wow` |
| 150 ms | One star stamps. The other two are dashed outlines | Two stars stamp, each with a `spark` | Three stars stamp. On the third, the whole card thumps (scale 1.02, 120 ms) |
| 700 ms | Headline "Pelajaran selesai!" | Headline with an `underline` doodle | Headline with M06 (Junior only) and a `scribble` doodle |
| 900 ms | — | — | Confetti (M28) |
| 1000 ms | XP lines count up: "Jawaban benar", "Pelajaran selesai +20" | Same | Same, plus "Bonus ★★★ +15" |
| 1300 ms | Level bar fills (M24). Level-up (M32) if crossed | Same | Same |
| 1500 ms | "Inti hari ini" note rises, key phrase highlighted with `.pw-mark` | Same | Same |
| 1700 ms | New sticker slaps in (M30) with the `slap` sound, if any | Same | Same |
| Copy under the headline, Junior | "Kamu selesai! Soal yang diulang membuatmu makin ingat." | "Hampir sempurna. Benar {n} soal lagi di percobaan pertama, dapat ★★★." | "Semua benar di percobaan pertama!" |
| Copy under the headline, Pro | "Selesai. {k} dari {total} benar di percobaan pertama." | "{k} dari {total} benar di percobaan pertama. {n} lagi untuk ★★★." | "Semua benar di percobaan pertama." |
| Low-emphasis action | "Ulangi untuk ★★★": a text link in Junior, a ghost button in Pro | Same | Junior: "Tantangan Kode" when the lesson has one (§8.5). Pro: none |

A one-star result is warm and complete, never a consolation: Bito cheers and the sticker still lands. There is no "kurang" wording. The copy gives a concrete target (`n` = questions not yet right on the first try) instead of a comment about how memory works.

**A stopping point.** The primary button is normally "Pelajaran berikutnya →" (or "Kembali ke {dunia} →"). It becomes "Selesai untuk hari ini" (Bito `sleep`, goes to Home) and "Pelajaran berikutnya" becomes the secondary button when either is true: this is the second lesson finished since the app was opened (`src/engine/sitting.ts`, in memory only), or, in Junior, the break reminder came due during the lesson. Nothing is locked. Only the order of the two buttons changes.

### 5.7 Bito

`Bito.tsx` keeps its API and gains four optional props: `idle?: boolean` (default `false`), `react?: boolean` (default `true`, plays the one-shot reaction when `expression` changes), `pokeable?: boolean` (default `false`, renders Bito inside a button and plays M47 on tap) and `onPoke?: () => void` (the page uses it to play the `bip` sound, so `Bito.tsx` does not read settings). A seventh expression, `wow`, is added (round eyes, small open mouth) for unlocks and level-ups. There is still no sad, angry or disappointed expression.

The SVG is regrouped so parts can move: `g.bito-antenna`, `g.bito-arm-l`, `g.bito-arm-r`, `g.bito-eyes`, `g.bito-body`. Each group sets `transform-box: fill-box` and a sensible `transform-origin`.

| State | Motion | Duration |
|---|---|---|
| `idle` | Eyes blink (`scaleY` 1 → .1 → 1). Antenna sways ±4° | Blink 140 ms about every 5 s, sway 2.4 s. Four cycles, then rest |
| `wave` | Left arm swings three times (`rotate` 0 → -18° → 0) | 900 ms |
| `happy` | Whole body hops 8 px with squash and stretch. Antenna tip pulses | 420 ms |
| `cheer` | Both arms up, two hops, two `spark` doodles | 900 ms |
| `think` | Body tilts 6°. Three dots appear one by one above the antenna | 600 ms |
| `wow` | Body scales 1 → 1.08 → 1. Eyes grow | 420 ms |
| `sleep` | Slow breathing (scale 1 → 1.02). In Junior a small "z" rises and fades | 4 s, four cycles |

Where Bito appears:

| Screen | Junior | Pro |
|---|---|---|
| Loader | Yes | Yes (smaller) |
| Onboarding, Profile Select | Yes, 160 px, `idle` on | Yes, 96 px |
| Home | 72 px sticker on the hero poster, `wave` on arrival, pokeable | No |
| Map | 56 px next to the current node, pokeable | No |
| Story card | 96 px, `wave` | No |
| FeedbackSheet | 72 px, peeks over the top edge | 40 px, inline |
| Result, Boss result | 128 px, pokeable once the sequence has finished | 96 px |
| Empty and error states | Yes | Yes |

### 5.8 Sound mapping

| Moment | Effect in `sound.ts` |
|---|---|
| Button press | `tap` |
| Correct answer | `correct` |
| Wrong answer | `incorrect` |
| XP chip arrives at the counter | `tap` |
| Each star stamp | `star` |
| Sticker slap | `slap` (new) |
| Lesson unlock | `star` |
| Bito poke (M47) | `bip` (new) |
| Level-up, world unlock, boss pass | `unlock` |

Sound still follows the profile setting and still never plays before the first interaction.

The two new effects are synthesised in `sound.ts` the same way as the existing five, with no audio files: `slap` is a 90 ms filtered noise burst over a low thump, `bip` is two short square-wave notes a fifth apart, 140 ms in total. Seven effects is the ceiling for this pass.

### 5.9 Motion catalogue v2 (Emil review)

**This section is the final word on motion.** It was written on 2026-11-23 after reviewing §5.2, §5.4, §5.6 and §5.7 against the project's animation skills: `emil-design-eng`, `review-animations` (with its `STANDARDS.md`), `choreograph` and `find-animation-opportunities`. Where a value here differs from those sections, this section wins. Triggers, UI text, the reduced-motion contract (§5.3) and the sound mapping (§5.8) stay as written unless a row below changes them.

The review follows one idea: **take motion away where it is constant, and spend it where it is rare.** A learner presses a button dozens of times in a lesson and finishes that lesson once. So presses, selections, tabs and focus lose their animation, the answer loop gets short and precise feedback, and the rare moments (lesson complete, level-up, sticker, unlock, boss pass) get the full choreography that the user asked for ("efek lebih bagus dan seru").

Verdict on the 50 effects of §5.4: 4 are cut (M04, the M10 icon hop, the M16 smooth scroll on mount, the M17 jelly keyframe), 6 are narrowed to fewer places (M02, M03, M05, M07, M15, M45), 14 are made quieter or faster, 17 keep their shape and get exact values, and 9 are made richer: the XP fly and the rare moments (M22, M27 to M30, M32, M34, M36, M40).

#### 5.9.1 Frequency tiers

Every effect belongs to one tier. The tier decides how much motion it may have.

| Tier | How often | Members | What is allowed |
|---|---|---|---|
| **Constant** | Many times per minute | Press (M01), hover (M02), sheen (M03), focus (M04), toggle (M09), bottom-nav change (M10), select (M17), drag (M18) | No keyframes. A state swap, or one CSS transition of at most 160 ms. No overshoot. No stagger. Nothing on a keyboard action |
| **Frequent** | Tens of times per session | Dialogs and sheets (M08), route push (M11), step forward (M12), answer feedback (M19, M20), FeedbackSheet (M21), XP fly (M22), counter bump (M23), progress (M24) | One move per event, at most 280 ms (the XP fly is the one exception at 480 ms, and it never blocks). One entrance per container: children are carried, they never stagger. `--ease-pop` gives Junior a small overshoot and Pro none |
| **Occasional** | A few times per session | Doodle draw (M05), requeue (M13), loader (M14), map (M15, M16), hint offer (M25), limit reveal (M26), sticker flip (M31), Bito (M44 to M47), combo chip (M48), read-aloud highlight (M49), halfway note (M50) | Standard motion, at most 300 ms per element. Short staggers allowed |
| **Rare** | Once per lesson or less | Kinetic headline (M06), stagger (M07), result (M27 to M30), level-up (M32), week dot and weekly target (M33, M34), lesson and world unlock (M35 to M37), boss (M38 to M41), profile select and avatar pick (M42, M43) | The delight budget lives here: choreographed sequences up to 2 s, overshoot, stamps with impact, particles, sound cues. Always skippable (§5.9.6) |

#### 5.9.2 Tokens v2 (replaces the block in §5.2)

The three curves already in `tokens.css` are the ones the standards name, so they stay. `--ease-out-quint` and `--ease-in-quick` are not added: the first duplicates `--ease-out`, and an accelerating curve on an exit delays the frame the learner is watching.

```css
--ease-out:      cubic-bezier(0.23, 1, 0.32, 1);     /* default: entrances, exits, reveals */
--ease-in-out:   cubic-bezier(0.77, 0, 0.175, 1);    /* something already on screen travels from A to B: XP fly (x axis), gate, flip, digit roll */
--ease-drawer:   cubic-bezier(0.32, 0.72, 0, 1);     /* sheets that rise from the bottom edge */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);      /* strokes that draw: doodles, paths, ticks */
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);  /* overshoot. Rare tier only, in both modes */
--ease-impact:   cubic-bezier(0.55, 0, 0.9, 0.4);    /* acceleration into a landing. Only as the first segment of a stamp or slap keyframe */
--ease-pop:      var(--ease-spring);                 /* frequent and occasional pops. Junior and no-mode */
:root[data-mode='pro'] { --ease-pop: var(--ease-out); }

--dur-press:     120ms;   /* not scaled */
--dur-fast:      140ms;   /* not scaled: colour, hover, toggles */
--dur-base:      180ms;   /* step, route, reveal */
--dur-pop:       220ms;   /* pops, bumps, staggered children */
--dur-slow:      280ms;   /* sheets */
--dur-draw:      400ms;   /* strokes */
--dur-travel:    480ms;   /* XP fly */
--dur-celebrate: 1200ms;  /* upper bound of one overlay sequence */

--motion-scale: 1;
:root[data-mode='pro'] { --motion-scale: 0.7; }
```

Rules for writing an effect:

- A duration is `calc(var(--dur-*) * var(--motion-scale))`. A start time inside a sequence is the custom property `--at`, and every effect class uses `animation-delay: calc(var(--at, 0ms) * var(--motion-scale))`.
- Built-in keywords (`ease-in`, `ease-out`, `ease-in-out`) are not used. `ease` is allowed for colour and opacity-only hover changes. `linear` is allowed for the loader dashes and for count-up text.
- `transition: all` and Tailwind `transition-all` are not allowed. Name the properties.
- Nothing enters from `scale(0)`. The smallest starting scale is 0.6 with opacity 0. Stamps and slaps start *larger* than their final size.
- Every hover effect sits inside `@media (hover: hover) and (pointer: fine)`.
- Motion that can be re-triggered before it ends (select, toggle, flip, progress, drag, hover) is a CSS **transition**, so it retargets from where it is. Keyframes are for one-shot events only.
- `transform-origin`: centre for stamps, pops and dialogs. `left` for the progress fill. `bottom` for the sprout. `transform-box: fill-box` for Bito's groups.

`src/motion/tokens.ts` mirrors exactly these names and values.

#### 5.9.3 Findings

| Before (§5.2, §5.4, current code) | After | Why |
|---|---|---|
| M01 press: `translateY(edge) scale(1.03, .94)`, 80 ms down and 200 ms spring back, on every button | Edge buttons and choice cards: face and edge swap in the same frame, no transition. Flat pressables: `scale(0.97)`, `transition: transform 120ms var(--ease-out)` | Pressed many times per minute. Squash distorts the label, and a transition on `transform` while the edge `box-shadow` snaps makes the edge jump. A zero-latency press is the most tactile one |
| M04 focus settle: `outline-offset` 7 px → 3 px over 240 ms | Cut. Static ring | Focus moves by keyboard. Keyboard actions are never animated, and `outline-offset` is not a compositor property |
| M10 nav: active icon hops 4 px, 240 ms | Cut the hop. Pill and colour change with `transition: background-color 140ms ease, color 140ms ease` | Core navigation. A hop is decoration on the most repeated action in the shell |
| M11 route enter 240 ms on every pathname change, back slides from the left | Deeper: fade and 8 px rise, 180 ms `--ease-out`. Tab to tab: nothing. Back: 120 ms fade | Tab changes are constant-tier. Going back is leaving: exits are shorter and simpler than entrances |
| M07 stagger "a card or list mounts", including the sentences of every lesson card | Stagger only on five rare surfaces (§5.9.4). Lesson cards, questions, Home, Map and lists appear with their container | One entrance per container. A reader must not wait for sentences to arrive on every card |
| M07 uniform delay `calc(var(--i) * 60ms)` | Shrinking gaps: starts at 0, 50, 90, 120, 145, 165 ms, later children at 180 ms | Equal gaps read as a metronome. Item 12 must not wait twelve steps |
| M12 step forward: 28 px slide, 240 ms | 16 px, 180 ms `--ease-out`, enter only | Played on every "Lanjut". Shorter travel and time keep the direction cue and drop the wait |
| M16 smooth scroll to the current world on every Map mount | Instant on mount. Smooth only when the learner arrives from the world-unlock overlay | A scroll the learner did not ask for, on a screen opened many times |
| M17 select: `pw-jelly-press` keyframe, 280 ms | No keyframe. Border and background `transition` 140 ms, check dot 120 ms | A learner changes the selection several times. Keyframes restart from zero, transitions retarget |
| M19 correct: 320 ms pop with squash and stretch, 480 ms ring, 480 ms sparks | 220 ms pop `scale(1 → 1.04 → 1)`, 360 ms ring, 200 ms tick, 320 ms sparks, all finished by 400 ms | The feedback moment stays, with no label distortion, and the FeedbackSheet can start at 120 ms |
| M20 wobble: rotate ±1.5° and translate ±4 px, two cycles, 320 ms | Translate only, `0 → -4 → 3 → -1 → 0` px, 240 ms | Rotating a card full of text is the "harsh shake" the anti-goals forbid. A decaying nudge reads as "not yet" |
| M21: sheet rises, then Bito slides up after an 80 ms delay, then the underline draws | One move: the sheet rises 280 ms `--ease-drawer` and carries Bito, title, doodle and button. Bito does not react. Closing is same-frame | Three entrances on a surface seen after every answer. The verdict text is the content |
| M08 `pw-pop-elastic` and `pw-sheet-spring` overshoot (scale 1.03, -4 px) | No overshoot. Dialog: fade and `scale(.96 → 1)`, 200 ms `--ease-out`. Sheet: `translateY(100% → 0)`, 280 ms `--ease-drawer` | The hint dialog and term sheet open often. Bounce belongs to rare moments |
| M22 XP fly 600 ms | 480 ms (Pro 336 ms), x and y on separate curves, at most one in flight | Seen after every correct answer. Still the session's signature move, now under half a second |
| M24 fill 420 ms keyframe with a glint at 50% and 100% | `transform: scaleX()` **transition** 320 ms `--ease-out`. Glint only at 100%, and at 50% with M50 in Junior | The bar retargets when two steps finish close together |
| M03 sheen on posters and stickers, driven by `--mx`/`--my` on the element | Stickers only. `useSheen` moves one child element with `style.transform`, eased towards the pointer | A custom property on a poster recalculates every child on each pointer move, and a poster holds the primary button |
| M05 every `Doodle` draws on mount | Doodles are drawn already. They animate only for first-run guidance, inside a celebration, and for the correct tick | A doodle that redraws on every visit is ambient motion |
| M27 star: `scale(2.2 → .9 → 1)`, 180 ms apart, one easing | Impact keyframe (accelerate in, settle out), 300 ms, starts 160 then 140 ms apart, sparks and sound on the impact frame | A stamp speeds up into the page. Accents belong to the impact, not to a delay that looks about right |
| M28 confetti falls from the top edge, staggered by 110 ms | Bursts from the cause (the star row, the gate seam): out fast, then gravity | Motion should come from what caused it |
| `pw-star-pop` starts at `scale(0.4)`, `pw-pulse-ring` animates `box-shadow`, `ConfettiBurst` ships its own `<style>` keyframe, `QuestionRenderer` uses `transition-all` | Replaced by the contract classes in §5.9.7 | Starting scale, compositor-only properties, one place for keyframes, named transition properties |
| `--ease-in-quick` for exits | Not added. Exits use `--ease-out` at about 60% of the enter time, or are same-frame | `ease-in` on UI is a block in the standards |
| M44 antenna sways continuously over 2.4 s | First blink after 2.5 s, then every 6 s, one antenna swing per blink, four cycles | An attention loop waits, repeats rarely and stops while the learner interacts |

#### 5.9.4 Catalogue v2: exact values

Durations are Junior. Pro multiplies durations and `--at` by 0.7 unless the row says "fixed". Properties are `transform` and `opacity` unless named.

**Constant tier**

| ID | Verdict | Exact motion |
|---|---|---|
| M01 Press | Quieter | **Edge pressables** (`.pw-btn-*`, `ChoiceCard`): on `:active`, `transform: translateY(calc(var(--edge) - 1px))` and the edge shadow becomes 1 px, both in the same frame. No `transition` on `transform` or `box-shadow`, in either direction. **Flat pressables** (`.pw-pressable`: tiles, nav items, icon buttons, sticker cards): `:active { transform: scale(0.97) }`, or `0.985` with `data-press="lg"` for anything wider than 240 px. `transition: transform 120ms var(--ease-out)`. Fixed |
| M02 Hover lift | Narrower | Only links and buttons that are tiles, world nodes or sticker cards. Never on edge buttons or answer choices. `translateY(-2px)`, `transition: transform 140ms var(--ease-out)`, `::after` shadow `opacity 140ms ease`. Fixed |
| M03 Sheen follow | Narrower | Owned sticker cards only, pointer fine, tier `full`. `useSheen(ref)` sets `style.transform = translate(x, y)` on one child `.pw-sheen-blob`, moving 18% of the remaining distance per frame. Blob opacity 0 → 0.35 over 140 ms on enter and → 0 over 200 ms on leave. The frame loop runs only while the pointer is over the card and stops when the blob has settled |
| M04 Focus settle | **Cut** | Static 3 px ring (§10.2) |
| M09 Toggle, segmented control | Kept | Knob or pill: `transition: transform 160ms var(--ease-out)`. Colours: `140ms ease`. Fixed |
| M10 Nav change | **Cut the hop** | `transition: background-color 140ms ease, color 140ms ease` on the pill, icon and label. No transform |
| M17 Select | **Cut the keyframe** | Border and background: `transition 140ms ease`. Check dot: opacity and `scale(.9 → 1)`, `transition 120ms var(--ease-out)`. `.pw-squish-pop` becomes a no-op |
| M18 Drag, reorder | Quieter | Lift: `scale(1.03)`, `transition: transform 120ms var(--ease-out)`, `::after` shadow opacity 120 ms. Drop: back to `scale(1)` in 200 ms `--ease-pop`. Target zone: a pseudo-element ring, opacity 1 → 0, 300 ms `--ease-out`. Arrow-button reorder: rows swap in the same frame and the moved row plays `scale(1.02 → 1)`, 160 ms `--ease-out` |

**Frequent tier**

| ID | Verdict | Exact motion |
|---|---|---|
| M08 Dialog, sheet | Quieter | Dialog: opacity 0 → 1 and `scale(.96 → 1)`, 200 ms `--ease-out`, origin centre. Sheet: `translateY(100% → 0)`, 280 ms `--ease-drawer`, no `scaleY`. Scrim: opacity, 160 ms `ease`. Closing is same-frame. No overshoot in either mode |
| M11 Route enter | Quieter | Deeper route: opacity and `translateY(8px → 0)`, 180 ms `--ease-out`. Same depth (bottom-nav destinations): none. Shallower: opacity only, 120 ms. `/` and `/mulai` choreograph themselves, so `RouteTransition` adds nothing there. Depth table: `/`, `/mulai` 0. `/beranda`, `/peta/:jalur`, `/ulang`, `/stiker`, `/profil` 1. `/dunia/:duniaId`, `/pengaturan`, `/glosarium`, `/pendamping` 2. `/belajar/:pelajaranId`, `/penjaga/:duniaId`, `/tes/:duniaId/:jenis` 3 |
| M12 Step forward | Quieter | Opacity and `translateX(16px → 0)`, 180 ms `--ease-out`. Enter only: the previous step unmounts in the same frame. Nothing inside the step has its own entrance |
| M19 Correct burst | Quieter | Answered element `.pw-fx-correct`: `scale(1 → 1.04 → 1)` (peak at 40%), 220 ms `--ease-pop`. Ring: `scale(.9 → 1.35)`, opacity 0.45 → 0, 360 ms `--ease-out`. Tick: `stroke-dashoffset` 1 → 0, 200 ms `--ease-out-expo`, `--at: 60ms`. Sparks (Junior, tier `full`, first try): six strokes move 14 px outward along their own angle and fade, 320 ms `--ease-out`, `--at: 80ms`, all together |
| M20 "Belum pas" | Quieter | `.pw-fx-almost`: `translateX(0 → -4px → 3px → -1px → 0)`, 240 ms, `--ease-out` on each segment. No rotation. Other choices dim to opacity 0.6 with `transition: opacity 140ms ease` |
| M21 Feedback sheet | Quieter | `translateY(100% → 0)`, 280 ms `--ease-drawer`, `--at: 120ms` after "Periksa". Bito (`react={false}`), title, drawn doodle, explanation and button are carried. Closing is same-frame |
| M22 XP fly | Richer, shorter | 480 ms. See §5.9.5 A |
| M23 Bump, count-up | Quieter | `.pw-fx-bump`: `scale(1 → 1.18 → 1)`, 200 ms `--ease-pop`. Count-up: 300 ms for the session chip, 600 ms for result lines, cubic ease-out on the number, text only |
| M24 Progress fill | Quieter | `transform: scaleX()` **transition**, 320 ms `--ease-out`, origin left. Glint: `translateX(-100% → 100%)`, 500 ms `--ease-in-out`, only at 100% and at 50% with M50 |

**Occasional tier**

| ID | Verdict | Exact motion |
|---|---|---|
| M05 Doodle draw | Narrower | `Doodle` gains `draw?: boolean`, default `false` (rendered drawn). With `draw`: `stroke-dashoffset` 1 → 0, 400 ms `--ease-out-expo`, at `--at`. Allowed uses: the Home `arrow-loop` (first three lessons), doodles inside the sequences of §5.9.5, the correct tick |
| M13 Requeued question | Quieter | Replaces M12 for that step: opacity, `translateY(12px → 0)` and `rotate(-1.5deg → 0)`, 220 ms `--ease-out`. The `curl` doodle is drawn already |
| M14 Loading | Kept | Nothing for 150 ms, then a 120 ms fade. Bito bob `translateY(0 → -4px → 0)`, 900 ms loop. Dashes `stroke-dashoffset`, `linear`, 600 ms loop. Fixed |
| M15 Map path draw | Narrower | Plays only when a world's completed count is higher than at the last visit, and draws only the new part: 600 ms `--ease-out-expo`. Otherwise the path is static |
| M16 Scroll to current world | **Cut on mount** | `behavior: 'auto'` on mount. `'smooth'` only when the URL carries `?baru={worldId}` (set by the world-unlock overlay) and motion is not reduced |
| M25 Hint offer | Kept | Opacity and `translateX(-4px → 0)`, 200 ms `--ease-out`, once per question |
| M26 Limit reveal | Kept | Opacity and `translateX(12px → 0)`, 200 ms `--ease-out` |
| M31 Sticker flip | Kept | `transition: transform 360ms var(--ease-in-out)` to `rotateY(180deg)`, parent `perspective: 800px`. A second tap during the flip retargets it |
| M45 Bito reactions | Narrower | A reaction plays only on: the story card (`wave`, once per lesson), the first Home mount after the app opens (`wave`), the result, level-up and world-unlock sequences, the mascot preview on Profile, and a poke. Not in the FeedbackSheet. Durations as §5.7, each segment `--ease-out`, hops use `--ease-spring` |
| M47 Bito poke | Kept | `happy` hop 420 ms, spin `rotate(360deg)` 600 ms `--ease-in-out`, antenna bounce 420 ms `--ease-spring`, `wow` 420 ms. Taps during a reaction are ignored |
| M48 Combo chip | Kept | In: opacity and `scale(.9 → 1)`, 200 ms `--ease-pop`, when the XP chip lands. Number: M23. Out: opacity, 140 ms `--ease-out` |
| M49 Read-aloud highlight | Kept | A state, no motion |
| M50 Halfway note | Kept | Opacity, `scale(.9 → 1)` and `rotate(-5deg → -2deg)`, 260 ms `--ease-spring`, once per lesson, with the M24 glint |
| M44 Bito idle | Quieter | First blink 2.5 s after mount, then every 6 s, four cycles, then rest. Blink `scaleY(1 → .1 → 1)`, 140 ms. One antenna swing `rotate(0 → 4deg → -4deg → 0)`, 1200 ms, with each blink. Any pointer or key event stops it. Fixed |
| M46 Empty state | Quieter | `scale(1 → 1.02 → 1)`, 4 s, three cycles. Fixed |

**Rare tier**

| ID | Verdict | Exact motion |
|---|---|---|
| M06 Kinetic headline | Kept | Junior only: Onboarding step 1, the three-star result, the boss intro. Letter: opacity, `translateY(.35em → 0)` and `rotate(-6deg → 0)`, 260 ms `--ease-spring`, start `min(i × 24, 360)` ms. Boil: two frames with `steps(1)` (`rotate(±0.6deg)`, `translateY(±0.5px)`), 700 ms, three cycles, then rest |
| M07 Stagger | Narrower | `.pw-stagger` only on: the Result, the boss intro chips, the boss "not yet" list, Onboarding step 1, Profile Select. Child: opacity and `translateY(8px → 0)`, 220 ms `--ease-out`. Starts by position: 0, 50, 90, 120, 145, 165 ms, every later child 180 ms |
| M27 Star stamp | Richer | `.pw-fx-stamp`, 300 ms: 0% `scale(1.9) rotate(-14deg)` opacity 0, `--ease-impact`. 55% `scale(.92) rotate(2deg)` opacity 1, `--ease-out`. 100% `scale(1) rotate(0)`. The impact frame is at 165 ms. Starts 0, 160, 300 ms |
| M28 Confetti | Richer | Bursts from the centre of an origin element. Per piece, deterministic by index: `--dx` -160 to 160 px, `--peak` -80 to -220 px, `--fall` 240 to 420 px, `--rot` ±540°, `--dur` 1000 to 1300 ms (Pro 800 ms, fixed), `--at` 0 to 90 ms. Keyframe: 0% `translate(0, 0) scale(.6)`, `--ease-out`. 35% `translate(calc(var(--dx) * .7), var(--peak)) scale(1)`, then `cubic-bezier(0.45, 0, 0.9, 0.55)` as gravity. 80% opacity 1. 100% `translate(var(--dx), var(--fall)) rotate(var(--rot))`, opacity 0. 28 pieces in tier `full`, 12 in `lite`: rectangles, dots and four `spark` strokes in `--star`, `--world-600`, `--world-100` and `--ok-500` |
| M30 Sticker slap | Richer | `.pw-fx-slap`, 380 ms: 0% `scale(1.5) rotate(-13deg)` opacity 0, `--ease-impact`. 60% `scale(.96) rotate(1deg)` opacity 1, `--ease-out`. 100% `scale(1) rotate(0)`. The static tilt stays on the `rotate` property. Impact at 228 ms: `slap` sound and four dust strokes (`Burst`, 240 ms). Sheen: `translateX(-120% → 120%) skewX(-20deg)`, 520 ms `--ease-in-out`, 80 ms after impact, once. A gold sticker gets a second sheen in `--star` 200 ms later |
| M33 Week dot | Kept | `.pw-fx-stamp` with `--stamp-from: 1.6`, and the ring of M19 |
| M35 Lesson unlock | Kept | §5.9.5 F |
| M37 Map node reveal | Kept | §5.9.5 D |
| M38 Boss intro | Kept | Shield: `.pw-fx-stamp` with `--stamp-from: 1.4`, at 0 ms. Title: M06 from 200 ms (Junior), a 220 ms rise in Pro. Rule chips: `.pw-stagger` from 420 ms. The button does not animate |
| M39 Boss pip | Kept | Pip: fill cross-fades in 140 ms and plays `.pw-fx-bump`. Shield, together with it: `.pw-fx-hit`, `scale(1 → .92 → 1)` and `rotate(0 → -4deg → 0)`, 240 ms `--ease-out` |
| M41 Boss not yet | Kept | `.pw-stagger` only. No shake, no red |
| M42 Profile deal-in | Quieter | Opacity, `translateY(16px → 0)` and `rotate(-4deg → 0)` (the static tilt stays on `rotate`), 260 ms `--ease-out`. Starts 0, 60, 110, 150 ms, later cards +30 ms each up to 240 ms |
| M43 Avatar pick | Kept | A transition: `scale(1 → 1.06)` and the tilt, 200 ms `--ease-pop`. The others flatten in 140 ms |
| M29, M32, M34, M36, M40 | Richer | The sequences in §5.9.5 |

#### 5.9.5 Choreography

Each sequence is written as a cast. **Lead** moves first and furthest. **Support** follows with less. **Decoration** fades or draws. **Static** does not animate. Times are Junior, in milliseconds from the trigger. Pro multiplies them by 0.7 and skips rows marked (J).

**A. The answer loop** (frequent, so it is one gesture and it never blocks)

On "Periksa", answer correct:

| Element | Role | Starts | Duration | Motion | Relationship |
|---|---|---|---|---|---|
| Answered element | Lead | 0 | 220 | M19 pop. `correct` sound at 0 | Lands on the press |
| Ring | Decoration | 0 | 360 | M19 ring | Together with the pop |
| Tick | Support | 60 | 200 | Draws | Overlaps the pop |
| Sparks (J, tier `full`, first try) | Decoration | 80 | 320 | Six strokes, eight from a combo of five | Leave at the pop's peak |
| FeedbackSheet with everything in it | Lead of the second beat | 120 | 280 | M21 | Overlaps: it starts while the pop is still settling. Done at 400 |

A wrong answer uses the same times with M20 instead of the pop, ring, tick and sparks.

On "Lanjut" after a correct answer:

| Element | Role | Starts | Duration | Motion | Relationship |
|---|---|---|---|---|---|
| FeedbackSheet | Static | 0 | 0 | Unmounts in the same frame | Exits are immediate |
| Next step | Lead | 0 | 180 | M12 | Interactive from frame 0 |
| Progress fill | Support | 0 | 320 | M24 | Together with the step |
| XP chip clone | Support | 0 | 480 | Flies from the sheet's XP badge to the header chip, in `#fx-layer` | Above the step, never over an explanation |
| Trail (J, tier `full`, combo of three or more) | Decoration | 50, 90 | 480 | Two small stars on the same path at scale 0.7 and 0.5 | Follow the chip |
| Header XP chip | Support | 480 | 200 | M23 bump, number counts up in 300 ms, `tap` sound | Synced to the arrival, not to a delay |
| Combo chip, when the count reaches three | Decoration | 480 | 200 | M48 | Together with the bump |

The fly path (`flyTo` in `src/motion/waapi.ts`) uses two nested elements so the path is an arc without animating anything but `transform`: the outer element animates `translateX(0 → dx)` with `--ease-in-out`, the inner animates `translateY(0 → dy)` with `--ease-out` and `scale(1 → 1.15 → 0.6)` (peak at 30%). Opacity is 1 until 80%, then 0 at 100%. Only one fly is in flight: a new one, a route change or a hidden document calls `finish()` on the current one, which lands it and updates the counter at once.

**B. Lesson complete** (M29, replaces the time column of §5.6; the copy rows and the actions of §5.6 stay)

`T` is the impact frame of the last earned star: 285 for one star, 445 for two, 585 for three.

| Element | Role | Starts | Duration | Motion | Relationship |
|---|---|---|---|---|---|
| Result container, stage, dashed star outlines, **action buttons** | Static | 0 | 0 | Present and focusable from frame 0 | The container has no entrance, so its children may be choreographed |
| Bito (128 px) | Support | 0 | 900 | `cheer`: one hop for one star, two for two or three, then `wow` at `T` for three | Frames the stars |
| Star 1, 2, 3 (earned ones) | Lead | 120, 280, 420 | 300 each | M27 | Overlap, gaps shrink |
| Spark doodle and `star` sound per star | Decoration | Each star's start + 165 | 200 | Spark draws (J). Sound in both modes | On the impact frame |
| Stage thump (three stars) | Support | `T` | 140 | `.pw-fx-thump`: `scale(1 → 1.02 → 1)`, `--ease-out` | Caused by the third impact |
| Confetti (three stars) | Decoration | `T` | ≤ 1300 | M28 from the star row | Caused by the third impact |
| Headline | Support | `T` + 60 | 260 | Opacity and `translateY(10px → 0)`, `--ease-out`. Three stars in Junior: M06 | After the stars |
| Line under the headline | Support | `T` + 180 | 220 | Opacity and `translateY(6px → 0)` | Overlaps |
| Headline doodle (`underline` for two stars, `scribble` for three) (J) | Decoration | `T` + 280 | 400 | Draws | Lands after the headline has settled |
| XP lines, top to bottom | Support | `T` + 320, + 380, + 430 | 220 each, count-up 600 from each start | Opacity and `translateY(6px → 0)` | Overlap, gaps shrink |
| Level bar | Support | `T` + 520 | 320 | M24. Glint if it reaches 100% | Cause and effect: the XP arrives, then the bar moves |
| "Inti hari ini" note, and the mode line beside it | Support, Decoration | `T` + 670 | 220, 180 | Note: opacity and 6 px rise. Mode line (companion, "Di tempat kerja", record): opacity only | Together |
| New sticker or concept card | Lead of the last beat | `T` + 870 | 380, sheen 520 | M30. Pro: opacity and `scale(.96 → 1)`, 200 ms, no slap sound | Last, because it is the reward |
| Note "stiker baru!" | Decoration | `T` + 1180 | 200 | Opacity | After the impact |
| Level-up, when crossed | — | `T` + 1420, or at once on skip | — | Junior: `celebrate({ kind: 'levelUp' })`. Pro: the toast banner at `T` + 840 (scaled) | The overlay waits until the sticker has landed |

A three-star result reaches its last impact at about 1.7 s, a one-star result at about 1.4 s. Pro finishes in about 1.2 s.

**C. Level-up overlay** (M32, Junior, at most 1200 ms)

| Element | Role | Starts | Duration | Motion | Relationship |
|---|---|---|---|---|---|
| Scrim and card | Static frame | 0 | 200 | Opacity, card `scale(.96 → 1)`, `--ease-out` | The only entrance |
| Title, button "Lanjut" | Static | 0 | 0 | Carried by the card. The button has focus from frame 0 | — |
| Level badge | Lead | 80 | 300 | `.pw-fx-stamp` with `--stamp-from: 1.6`. Impact at 245. `unlock` sound on impact | Lands on the card |
| `rays` doodle | Decoration | 245 | 360 | Seven strokes draw outward in three groups 20 ms apart | On the impact frame |
| Bito | Support | 245 | 420 | `wow` | On the impact frame |
| Level digit | Support | 340 | 420 | `.pw-fx-roll`: a strip of old and new digit moves `translateY(0 → -50%)` inside a clipped box, `--ease-in-out` | After the badge has landed |
| Title `underline` doodle | Decoration | 760 | 400 | Draws | After the digit has settled |
| Next-reward line ("Di Level 4: syal untuk Bito") | Decoration | 900 | 200 | Opacity only | Last |

Closing is same-frame. Pro has no overlay: the banner on the result slides down with opacity and `translateY(-100% → 0)`, 300 ms `--ease-out`, and its level number counts up in 400 ms.

**D. World unlock** (M36, Junior at most 1200 ms, then the Map)

| Element | Role | Starts | Duration | Motion | Relationship |
|---|---|---|---|---|---|
| Scrim and card, title, both buttons | Static frame | 0 | 200 | As in C | — |
| `dash-path` doodle (J) | Support | 100 | 400 | Draws towards the island | The cause: the trail arrives |
| Lock halves | Lead of the first beat | 420 | 320 | `.pw-fx-lock`: wiggle `rotate(±6deg)` until 30%, then `translate(∓18px, 12px) rotate(∓24deg)` and opacity 0, `--ease-out`. `unlock` sound at 420 | The effect: the trail opens the lock |
| Island sticker | Lead | 520 | 480 | `.pw-fx-peel`: opacity 0 → 1 by 30%, `scale(.7 → 1)`, `rotate(-10deg → 0)`, `--ease-spring` | Starts while the lock is still leaving, underneath it |
| World name | Support | 760 | 220 | Opacity and `translateY(6px → 0)` | After the island is readable |
| Four sparks (J, tier `full`) | Decoration | 900 | 300 | `Burst` | As the peel settles |

Pro: no path, no wiggle, no peel rotation, no sparks. The lock fades in 140 ms, the island enters with opacity and `scale(.9 → 1)` in 240 ms, the name fades. About 700 ms.

"Lihat di peta →" navigates to `/peta/{jalur}?baru={worldId}`. On that Map mount only: smooth scroll to the node (M16), then the path draws to it (M15, 0 to 600), then M37: the colour layer fades in over the grey one (opacity, 480 ms `--ease-out`, from 420) and the node pops once (`scale(1 → 1.08 → 1)`, 320 ms `--ease-spring`, from 660). A world revealed without the overlay plays the same M15 and M37 without the scroll.

**E. Boss pass** (M40)

| Element | Role | Starts | Duration | Motion | Relationship |
|---|---|---|---|---|---|
| Result content behind the gate, buttons | Static | 0 | 0 | Rendered already. It is revealed, it does not enter | Carried by the gate |
| Shield pips (J) | Support | 0, then every `min(45, 360 / n)` ms | 240 each | `.pw-fx-hop`: `translateY(0 → -6px → 0)`, `--ease-out` | A wave along the row |
| Guardian shield | Support | 300 | 320 | `scale(1 → 1.15 → 1)`, `--ease-spring` | When the wave reaches the end |
| Gate halves | Lead | 420 | 520 | `.pw-fx-gate`: `translateX(0 → ∓100%)`, `--ease-in-out`. `unlock` sound at 420 | Cause and effect: the shield gives way, then the gate opens |
| Confetti | Decoration | 700 | ≤ 1300 | M28 from the centre of the seam | When the gap is about half open |
| Headline "Gerbang terbuka!" | Support | 760 | — | M06 in Junior, a 220 ms rise in Pro | Appears through the gap |
| "+50" line | Support | 900 | 220, count-up 600 | Opacity and 6 px rise | After the gate has stopped |
| World unlock, when a world opens | — | 1700, or at once on skip | — | `celebrate({ kind: 'worldUnlock' })` | Queued after the level-up if both happen |

Pro: no pip wave and no shield bump, the gate opens in 360 ms from 0, confetti lasts 800 ms.

**F. Lesson unlock** (M35, World Detail, starts 250 ms after mount so the route entrance has finished)

| Element | Role | Starts | Duration | Motion | Relationship |
|---|---|---|---|---|---|
| Trail segment | Support | 0 | 420 | Draws to the node, `--ease-out-expo` | The cause |
| Lock icon | Lead | 360 | 160 | `rotate(0 → 20deg)` and opacity 1 → 0, `--ease-out`. `star` sound | The effect |
| Lesson number | Lead | 440 | 240 | Opacity and `scale(.8 → 1)`, `--ease-spring` | Overlaps the lock leaving |
| Label "Baru terbuka" | Decoration | 520 | 200 | Opacity | — |
| Ring | Decoration | 600 | 2 × 600 | `.pw-fx-ring` with `data-ring="2"`, then a static ring | After the number has landed |

**G. Weekly target** (M34, the week strip on Home, about 900 ms)

| Element | Role | Starts | Duration | Motion | Relationship |
|---|---|---|---|---|---|
| Today's dot | Lead | 0 | 300 | M33 stamp and ring | — |
| Seven dots | Support | 200, then every 45 ms | 240 each | `.pw-fx-hop` | A wave, left to right |
| `sprout` doodle | Support | 480 | 360 | `.pw-fx-grow`: `scaleY(.2 → 1)` and opacity, origin bottom, `--ease-spring` | Grows when the wave reaches the last dot |
| Text "Target minggu ini tercapai!" | Decoration | 560 | 200 | Opacity | — |
| Consecutive-weeks number (Pro) | Decoration | 560 | 400 | Count-up | — |

**H. First run** (Onboarding step 1, once per device)

| Element | Role | Starts | Duration | Motion | Relationship |
|---|---|---|---|---|---|
| Bito (160 px) | Lead | 0 | 320 | Opacity and `scale(.9 → 1)`, `--ease-spring`, then `wave` from 200 (900 ms) | — |
| "Halo! Aku Bito." | Lead | 240 | Letters | M06 | Overlaps the wave |
| Intro line | Support | 700 | 220 | Opacity and 6 px rise | After the headline is readable |
| Button | Static | 0 | 0 | Focusable from frame 0 | — |

On Home, while the profile has fewer than three completed lessons, the `arrow-loop` doodle draws once per mount at 400 ms (400 ms `--ease-out-expo`) and the note "mulai dari sini!" fades in at 700 ms.

#### 5.9.6 Sequencing, skipping and interruption

- **One mechanism.** A choreographed group is a container with class `.pw-seq`. Each moving child carries an effect class and its start as `--at`. Sound cues, count-up starts, confetti and `celebrate()` calls are scheduled with `runSequence(root, cues)` from `src/motion/waapi.ts`, which scales every time by `--motion-scale`.
- **Skipping.** A `pointerdown`, or Enter, Space or Escape, anywhere in the container calls `skip()`: the container gets `data-seq="done"`, CSS then sets every delay to 0 ms and every duration to 0.01 ms inside it so each element lands on its last frame, particles are removed, count-ups jump to the final number, and the remaining cues run at once with `skipped: true` (sound cues stay silent, state cues still apply). The event is not cancelled, so a tap on the primary button skips **and** activates the button. Nobody presses twice.
- **Never blocking.** Buttons are in the DOM, visible and focusable from frame 0 of every sequence. No sequence sets `pointer-events: none` on the page.
- **Hidden document.** A sequence skips itself when `document.hidden` becomes true.
- **Interruption.** Leaving the screen cancels the timers and runs nothing. Retargetable motion is a transition (§5.9.2). One XP fly at a time (§5.9.5 A). A celebration overlay never opens over a running result sequence: it is queued by a cue at the end of that sequence.
- **Keyboard.** `src/main.tsx` sets `data-input="keyboard"` on `<html>` on a `keydown` of Tab, Enter, Space or an arrow key, and `data-input="pointer"` on `pointerdown`. Under `:root[data-input='keyboard']` the transitional entrances are off: M08 opens without motion, and M11, M12 and M13 do not play. Feedback (M19, M20, M23) and the rare sequences still play, because they answer the action instead of delaying it.
- **Reduced motion.** The contract of §5.3 collapses every sequence: no delays, no movement, particles not rendered. Step, route, sheet, dialog, overlay and result containers carry `data-rm="fade"`, so they still cross-fade in 120 ms. `runSequence` runs every cue at once when `reduced` is true.

#### 5.9.7 Class and API contract (Package 0 delivers all of it; Packages 1 to 4 only apply it)

No package other than Package 0 adds a keyframe, a `<style>` tag or a Tailwind `animate-*` class. A package that needs a one-off effect calls `fx()`.

| Kind | Name | Behaviour |
|---|---|---|
| Root attribute | `data-input="keyboard \| pointer"` | §5.9.6 |
| Entrance | `.pw-enter[data-enter="rise \| right \| fade \| pop \| deal \| retry"]` | `rise` M11, `right` M12, `fade` 120 ms opacity, `pop` opacity and `scale(.96 → 1)` 220 ms `--ease-pop`, `deal` M42, `retry` M13. `left` is kept as an alias of `fade`. All read `--at` |
| Group | `.pw-stagger` | M07, delays by `:nth-child`, no `--i` needed |
| Sequence | `.pw-seq`, `data-seq="run \| done"` | §5.9.6 |
| Stroke | `.pw-draw` | 400 ms `--ease-out-expo`, reads `--at` |
| Text | `.pw-boil` | M06 boil, three cycles |
| Answer | `.pw-fx-correct`, `.pw-fx-almost`, `.pw-fx-ring` (`data-ring="2"` for two 600 ms pulses), `.pw-fx-bump` | M19, M20, M23 |
| Impact | `.pw-fx-stamp` (reads `--stamp-from`, default 1.9), `.pw-fx-slap`, `.pw-fx-thump`, `.pw-fx-sheen` | M27, M30, §5.9.5 B |
| Small moves | `.pw-fx-rise` (opacity and 6 px, 220 ms), `.pw-fx-fade` (opacity, 200 ms), `.pw-fx-hop`, `.pw-fx-hit`, `.pw-fx-grow` | §5.9.5 |
| Overlays | `.pw-fx-roll`, `.pw-fx-lock[data-side="l \| r"]`, `.pw-fx-peel`, `.pw-fx-gate[data-side="l \| r"]` | §5.9.5 C, D, E |
| Particles | `.pw-confetti-piece` (reads `--dx`, `--peak`, `--fall`, `--rot`, `--dur`, `--at`) | M28 |
| Bito | `.bito[data-react="wave \| happy \| cheer \| think \| wow \| spin \| bounce"]`, `.bito[data-idle="on"]`, acting on `g.bito-antenna`, `g.bito-arm-l`, `g.bito-arm-r`, `g.bito-eyes`, `g.bito-body` | §5.7, M44, M47. `Bito.tsx` sets the attribute and removes it on `animationend` |
| Flip | `.pw-flip`, `.pw-flip-inner`, driven by `aria-pressed` | M31, inside `StickerCard` |
| Compatibility | `.pw-anim-slide-up` (now `rise`), `.pw-anim-pop` (now `pop`), `.pw-anim-star` (now the stamp), `.pw-anim-shake` (now M20), `.pw-anim-pulse` (pseudo-element ring, two pulses), `.pw-squish-pop` and `.pw-float` (no-ops) | Until Packages 1 to 4 have replaced them |

```ts
// src/motion/waapi.ts
type Cue = { at: number; run: (ctx: { skipped: boolean }) => void };          // `at` in Junior ms
function runSequence(root: HTMLElement, cues: Cue[], opts?: { onDone?: () => void }): { skip(): void; cancel(): void };
function fx(el: Element, keyframes: Keyframe[], opts: { duration: number; easing?: string; delay?: number }): Animation | null;  // scaled, null when reduced
function flyTo(source: Element, target: Element, opts?: { trail?: 0 | 2; onArrive?: () => void }): { finish(): void };           // calls onArrive at once when reduced or when either element is missing
```

Component props that the sequences need, all typed in Package 0: `Doodle` `draw` and `at`, `Burst` `count` (4, 6 or 8) and `at`, `KineticText` `at` and `boil`, `ConfettiBurst` `pieces` and `origin` (a ref to the element the burst starts from), `StarRow` `stamp`, `Bito` `react`, `idle`, `pokeable`, `onPoke`.

#### 5.9.8 What does not move, and why

- **Action buttons**, in every sequence and overlay: a button that arrives late is a button the learner waits for.
- **Text inside a lesson card or a question**: the step entrance carries it. Reading must not wait for motion.
- **Everything inside the FeedbackSheet**: the sheet is one object. The explanation is the content, the reward waits for "Lanjut".
- **Bottom-nav destinations and focus rings**: core navigation and keyboard actions.
- **Posters**: no sheen, no float, no parallax. The poster holds the primary button and the screen's one headline.
- **Locked things** (worlds, lessons, stickers, the locked boss card): flat and still, as PRD V14 requires.
- **Doodles on screens visited often** (map flag, check stamps, the FeedbackSheet underline, `curl`): drawn already.

#### 5.9.9 Considered and rejected

- A spring on the button release. Constant tier, and it cannot stay in sync with a static edge shadow.
- A staggered entrance for Home, World Detail rows, the Sticker Book grid and Settings groups. They are opened many times, and the route entrance already carries them.
- An exit animation for steps, the FeedbackSheet and dialogs. The learner has already decided to move on. The next entrance is the bridge.
- Screen shake or a flash on a three-star result. The 2% stage thump gives the weight without moving the text the learner is about to read.
- Per-word highlight for read-aloud, parallax on the map, a looping glow on the open boss card. Unreliable, ambient, or both.
- A bigger effect for a long combo. The combo grows the sparks from six to eight and adds the XP trail, then stops. An effect that keeps growing becomes a reason to rush.

#### 5.9.10 Feel check and definition-of-done additions

These cannot be judged from code. Record each one and step through it frame by frame, in Junior and Pro, at 4× CPU throttle:

1. **Answer loop.** The pop peaks before the sheet covers the answer, and the sheet reads as one object. Scrub 0 to 400 ms after "Periksa".
2. **XP fly.** The path is an arc, not a straight line, and the bump lands on the frame the chip disappears. Scrub the last 100 ms.
3. **Star stamps.** Each star accelerates into the page, and spark and sound sit on the impact frame, not after it.
4. **Three-star result.** Stars, thump, confetti and headline read as one wave, not a queue. Then imagine the tenth result of the week: nothing in it should make the learner reach for the skip.
5. **Gate.** Confetti leaves the seam when the gap is about half open, not before the halves move.
6. **Sticker slap.** The dust and the `slap` sound are on the impact frame, and the sheen starts after the sticker has stopped.

Added to §13:

- No `transition: all`, no Tailwind `transition-all`, no built-in `ease-in`, no `scale(0)` start, no keyframe outside `motion.css`, no component `<style>` tag with keyframes.
- With the keyboard only, pressing Enter through a whole lesson shows no step slide and no dialog motion, and every result sequence can be skipped with Enter.
- Tapping the primary button at any moment of a result, level-up, world-unlock or boss-pass sequence performs its action with that one tap.
- Every row of §5.9.4 has been checked in Junior, in Pro and with reduced motion from both the OS setting and "Kurangi animasi".

---

## 6. Layout and cognitive-stimulation principles

Six principles, each tied to the PRD's theory table, and what each means on each screen.

| Principle | Meaning | PRD theory |
|---|---|---|
| **Chunking** | Three to five visually separate groups per screen. One idea per card | T3 |
| **Progressive disclosure** | Show the next step. Reveal detail on request or on arrival | T3, T7 |
| **Visual hierarchy** | One poster and one primary button win the squint test. Size, colour block and elevation agree | V1, Von Restorff |
| **Curiosity hook** | One open question or one hidden-but-deterministic thing per screen | T11, T20 |
| **Spaced rhythm** | Consistent 12 / 24 px gaps. Dense and airy areas alternate. Text and a visual alternate inside a lesson | T13 |
| **Dual coding** | Every concept and status has a picture and words placed together | T4 |

| Screen | Chunking | Progressive disclosure | Visual hierarchy | Curiosity hook | Spaced rhythm | Dual coding |
|---|---|---|---|---|---|---|
| **Home** | Four groups: greeting, hero poster, week strip, two tiles | Retention-test cards appear only when due. At most one is shown, others collapse into "+1 lagi" | The poster is the only saturated block and holds the only primary button | One hook, by mode. Junior: the quest line to the Guardian ("2 pelajaran lagi → Penjaga") with the shield silhouette. Pro: "Setelah ini kamu bisa: …" from the lesson objective | 28 px between groups. The poster takes about 45% of the first viewport | Island sticker with the lesson title. Week dots with "2 dari 3 hari" |
| **Map** | Worlds are nodes on one path. The track switch is a separate group | Locked worlds show the name and a grey island only. World detail opens on tap | The current node is the largest, in colour, with a flag | The next locked world is visible but grey and still (PRD V14) | Nodes at a fixed 148 px rhythm, alternating left and right | Island illustration with title, stars and a status icon with text |
| **World Detail** | Three groups: world poster, lesson trail, boss card | The active lesson row is expanded. Completed rows are compact. Locked rows are flat and not interactive | The active row is raised with a "Mulai" pill. The world poster carries progress | The sticker silhouette on each unfinished lesson. The boss card says how many lessons remain | Trail nodes at an even rhythm, joined by the path | Numbered stamp with the title. Stars as icons with a count |
| **Lesson: story and concept** | One idea per card. Stage on top, text below | Title, then sentences in a 60 ms stagger. In a limit card "Mirip" shows first, "Bedanya" on tap | The stage holds one illustration. One primary button in a fixed bar | The story card ends with a question that the next card answers | Read, do, read, do: at most two reading cards, then a quick check or the simulator (§8.5) | Illustration and text adjacent (contiguity). "Dengar" next to the text |
| **Lesson: question** | Situation (note card), question, answers, action bar | The hint is one tap away. The second hint only after the first | The prompt is the largest text. A type chip says what to do ("Pilih satu", "Urutkan") | Requeued questions return marked "Coba lagi". The combo chip counts first-try answers in a row | Answer cards 12 px apart, 24 px from the prompt | Type chip with an icon. Optional icons on choices, required on Junior sort bins. Status by icon, colour and text |
| **FeedbackSheet** | Verdict, reason, next step | The explanation is two short lines. The "kenapa" for a wrong choice is specific to that choice | Verdict in the largest text. One button | — | — | Bito's expression with the verdict text |
| **Result** | Stars, numbers, recap, sticker, actions | Items arrive in order (§5.6) | Stars and headline first | A new sticker lands face up and flips to show its analogy | 16 px stack, sticker set apart | Stars with a count. XP lines with labels |
| **Boss** | Intro: guardian, rules, action. Quiz: pips, question, answers | Rules are three icon chips, not a paragraph | Dark `--boss` surface makes this screen unlike any other | What is behind the gate: the next world's silhouette | Same question rhythm as lessons | Shield pips with "Soal 3 dari 8" |
| **Onboarding** | One decision per step, three steps | Mode cards preview their own style | One primary button per step | "Aku Bito, robot pengantar pesan." | — | Each mode card shows a sample |
| **Profile Select** | One sticker card per profile | — | Cards equal. "Tambah profil" is secondary | — | Deal-in stagger | Avatar with name, mode and level |
| **Profile** | Identity, four stats, badges, mascot customisation | Mascot options that are locked show their level requirement | Identity poster first | Next title: "Level 4: Penata Warna" as a dashed outline | Stat tiles in a 2 × 2 grid | Each stat has an icon, a number and a label |
| **Sticker Book** | By track, then by world | Unowned stickers are dashed outlines with the lesson name that awards them | Owned stickers in colour with tilt | Tap to flip | Grid with 12 px gaps, section headings every world | Sticker art with the analogy sentence on the back |
| **Settings** | Groups: Tampilan, Suara & Bacakan, Belajar, Data | Dangerous actions sit last, behind the Companion Gate | No poster. Settings are calm | — | 24 px between groups | Each setting has an icon, a label and a one-line effect |

---

## 7. Junior and Pro: one system, two personalities

Everything below is driven by `[data-mode]` tokens or by `useMotionPrefs().mode`. No component forks. The internal mode ids stay `junior` and `pro`.

**Pro is not "Junior minus".** Each mode has things the other does not have. Junior has Bito everywhere, handwriting, stickers, read-aloud by default and sparks. Pro has the editor look (mono digits, a prompt glyph, a caret), real terms, code on the cards, personal records, the stopwatch review and the "Di tempat kerja" line. Feedback has the same weight in both.

| Aspect | Junior, shown as "Petualang" ("warm") | Pro ("crisp") |
|---|---|---|
| One-line character | A sticker-covered notebook with Bito beside you | A code editor with a field manual's calm: mono digits, a prompt glyph, real terms |
| Name in the UI | "Petualang". Never a school grade or an age | "Pro", always with "mulai dari nol" where the mode is chosen. Never an age |
| Written for | Ages 9 to 12 reading alone. Younger children with a companion, through read-aloud | Teenagers and adults starting from zero, including career changers |
| Radius | 8 / 12 / 18 / 26 / 34 px | 6 / 10 / 14 / 20 / 28 px |
| Density | `--space-card` 20 px, `--gap-stack` 16 px, larger type (existing) | `--space-card` 16 px, `--gap-stack` 12 px |
| Annotation skin (`.pw-note`, `Annot`) | Patrick Hand, tilted, with doodles: *mulai dari sini!* | JetBrains Mono, `--ink-3`: `// mulai di sini` |
| Kicker | Sentence case, no tracking: "Soal 2 dari 4" | Uppercase, tracked: "SOAL 2 DARI 4" |
| Numbers and reward words | "poin", "Level 3". Never "XP" or "Lv" | "XP", "Lv 3", in JetBrains Mono tabular digits |
| World codes ("A1") | Hidden | Shown |
| Title glyph | None | The hero poster title starts with a mono `>` and ends with a caret that blinks four times, then rests |
| Doodles | Up to two per screen, all twelve | At most one per screen: `underline`, `arrow`, `check` |
| Kinetic headline (M06) | Onboarding, three-star result, boss intro | Never |
| Mascot | Frequent, larger, pokeable (§5.7, M47) | Loader, feedback (40 px), results, empty states |
| Stage content | Illustration as a sticker on the dotted stage | From 640 px: the code block with the illustration. Under 640 px: title, one core sentence, the code, then the rest (§8.5) |
| Collection | "Buku Stiker": die-cut, tilted, gold finish for ★★★ | "Koleksi Konsep": upright concept cards. The word "stiker" never appears |
| Tilt on islands and avatars | On | Half: `--tilt` values are halved |
| Motion scale | 1 | 0.7 |
| Effect tier | Follows the device | Follows the device |
| Correct answer | Pop, ring, sparks. XP fly after "Lanjut" | Pop, ring. XP fly after "Lanjut" |
| Three-star result | Confetti, kinetic headline, about 1.7 s | Confetti, no kinetic headline, about 0.9 s |
| Level-up | Full overlay that names the next reward | Toast banner on the result screen with a count-up |
| World unlock | Full overlay, 1.2 s | Overlay, 0.7 s, no peel |
| Read-aloud | "Dengar" pill with a label on every card. Auto-read is on for new profiles | Speaker icon, shown when auto-read is on |
| Hint offer (M25) | When a missed question comes back. Never on a timer | No |
| Combo chip (M48) | "3 beruntun" | `// 3 beruntun` |
| Personal record, stopwatch review | No. Junior has no clock | Yes (§8.5, §8.11) |
| Bonus after ★★★ | "Tantangan Kode": one real code question, optional | None in this pass |
| Sound default | On (existing) | Off (existing) |
| Wrong-answer title | "Belum pas". "Hampir!" when at least 70% of the parts were right | "Belum tepat". "Hampir" when at least 70% of the parts were right |
| Consecutive weeks | Not shown | "3 minggu berturut-turut" |
| Home | Bito waves. The poster shows the quest line to the Guardian | No mascot. The poster shows "± 5 menit · langkah 3 dari 9" and "Setelah ini kamu bisa: …" |
| Objective label | "Tujuan: Aku bisa …" | "Setelah ini: kamu bisa …" |
| Result copy | Warmer, second person, a concrete target | The numbers. No comment on how learning works |
| Pre-test note | "belum tahu? tidak apa-apa" | `// belum tahu? lewati saja` |
| Theme default | Follows the device | Follows the device |

**How the two modes settle opposite requests.** The panel's youngest judge asked for more character, sound and stickers. The teenage and adult judges asked for less childishness. These are not averaged into one middle design, because the middle serves nobody. Each request lands in the mode that asked for it: tappable Bito, new sounds and the sticker book are Junior only, while the editor look, records, the stopwatch and "Koleksi Konsep" are Pro only. Within Pro, the teenager's wish for weight and the adult's wish for calm are both met by keeping feedback strong and removing only the cute layer.

Implementation notes:

- The mode tokens live in `tokens.css` under `:root[data-mode='junior']` (existing block) and `:root[data-mode='pro']` (new block).
- Before a profile exists (Onboarding, Profile Select) the root has no `data-mode`. Base tokens are the Pro values for size and Junior values for motion, as today.
- `Annot` renders one element with class `.pw-note`. The skin is pure CSS.
- Mode names, the reward word, the level label, the collection name and the warm-up cap come from `src/app/modeConfig.ts` (Package 0): `MODE_LABEL`, `xpWord(mode)`, `levelLabel(level, mode)`, `COLLECTION_LABEL`, `WARMUP_CAP`. No page hard-codes "Junior", "XP", "Lv" or "Buku Stiker".

---

## 8. Per-screen change list

Indonesian strings below are the required UI text unless marked "existing". Kickers are written here in their Pro form (uppercase). The Junior form is the same words in sentence case, unless a Junior string is given. Where a string says "XP", Junior shows "poin" (`xpWord`).

### 8.1 AppShell and navigation (`AppShell.tsx`, `App.tsx`)

- Wrap route content in `RouteTransition` (M11). Replace `PageLoader` with `fx/PageLoader` (M14).
- Mount `<CelebrationHost />` once inside `AppShell`, for both the nav and no-nav variants.
- Bottom nav: `--paper-raised` surface, `--elev-2` upward, top corners `--radius-lg`, 1 px inner highlight. Active item: icon and label in `--world-700`, a `--world-50` pill behind them, icon hop (M10). Inactive: `--ink-2`.
- The due-cards dot becomes a count badge: `--star` background with `--on-star` text (8.3:1). White on `--warn-500` is 3.35:1 and is no longer allowed.
- Side rail (≥ 1024 px): same states. The brand logo sits on a small poster block.
- The creator watermark stays, restyled as a `.pw-note`. It is hidden on the lesson, boss and assessment routes so those screens keep one focus.
- `theme-color` meta: `#FBF3E4` for light and `#14162A` for dark (two `<meta>` tags with `media`).
- `AppShell` calls `applyReadingComfort(profile.id)` on mount and whenever the active profile changes. It sets or removes `data-reading="comfort"` on `<html>` (§4.4).
- The nav label of the collection route comes from `COLLECTION_LABEL`: "Stiker" in Junior, "Koleksi" in Pro.

### 8.2 Home (`HomePage.tsx`)

Compact layout, top to bottom:

1. **Greeting row.** Avatar as a 48 px sticker, "Hai, {nama}!" (`.pw-h2`), level title below. On the right a level chip that links to Profile. Junior: "Level 3" only, with no number and no bar (the bar lives on Profile). Pro: "Lv 3 · 240 XP" in mono digits with a thin XP bar inside the chip. The separate bar under the header is removed.
2. **Hero poster** (`.pw-poster`, `--radius-xl`, about 45% of the first viewport). Island sticker overlapping the top-right edge (104 px, tilt 4°). Kicker: "Lanjutkan · Kota Web" in Junior, "LANJUTKAN · DUNIA A1 · KOTA WEB" in Pro. Title in `.pw-display` (Pro adds the `>` glyph and caret, §7). A meta line: "± 5 menit" and, when resuming, "langkah 3 dari 9" as small pips. When a warm-up is queued the time includes it: "± 7 menit dengan pemanasan". The primary button is `.pw-btn-inverse` (paper background, `--world-700` text, edge shadow), full width. In Junior, Bito (72 px sticker) waves once from the poster's bottom-left on arrival and can be poked (M47).
   - **One hook, by mode.** Junior: the quest line "2 pelajaran lagi → Penjaga" with a small shield silhouette and a meter with one segment per lesson of the world. When the next action is the boss it reads "Penjaga menunggu!". Pro: "Setelah ini kamu bisa: {objective}". The "Stiker berikutnya" silhouette chip is not shown on Home. It stays on the World Detail rows.
   - **Button labels.** Junior labels are at most four words: "Ayo mulai →" (first lesson), "Lanjut belajar →", "Mulai tebak-tebakan →", "Lihat kemajuanmu →", "Hadapi Penjaga →". Pro keeps the existing labels except the warm-up one.
   - **Warm-up.** When cards are due and the learner has not studied today, the primary button reads "Pemanasan dulu →" with the line "3 kartu, lalu lanjut pelajaran" under it (Junior), or "Ulang 5 kartu, lalu lanjut →" (Pro). The warm-up is capped at 3 cards in Junior and 5 in Pro (`WARMUP_CAP`; it was 5 and 10). Under the button a text link "Langsung ke pelajaran" goes straight to the lesson in both modes. Skipped cards stay due in Kotak Ulang. The old label "Pemanasan Kotak Ulang (5) → Lanjut pelajaran" is removed.
   - While the profile has fewer than three completed lessons: an `arrow-loop` doodle and the note "mulai dari sini!" point at the button.
   - Remove the `pw-float` loop from the island. It was ambient motion.
3. **Week strip** (`WeekDots`): one row. Today's dot has a ring. Label "Minggu ini · 2 dari 3 hari". Pro also shows consecutive weeks, "3 minggu berturut-turut", with the `sprout` doodle, and shows nothing when the count is 0. Junior never shows the consecutive count, so there is no number that can fall back to zero. M33 and M34 play here when the learner returns after studying.
4. **Two tiles** (`.pw-card`, 2 columns). "Kotak Ulang" with the due number in `.pw-h1` and "5 kartu siap diulang" (or "Semua aman" with a `check`). Junior adds the line "ulang supaya tidak lupa", because the name alone does not explain itself. The second tile depends on the mode: "Buku Stiker" with a fan of the three most recent stickers and "12 dari 46 stiker" (Junior), or "Koleksi Konsep" with the three most recent concept cards upright and "12 dari 46 konsep" (Pro).
5. **Retention test card** when due: `.pw-card` with a `--world-50` left band. "Masih ingat {dunia}?" / "Sudah 7 hari. Cek ingatanmu (+30 XP)." At most one card, plus "+1 lagi" as a text link.

The Junior Home shows the level chip, the poster with one hook, the week strip and two tiles. It has no XP number, no world code and no sticker silhouette.

Expanded layout (≥ 1024 px): two columns `1.45fr 1fr` as today, poster on the left.

**Prefetch.** When Home is idle (`requestIdleCallback`, with a 2 s timeout fallback) it calls the existing world loader for the world of the next action and for the world after it. A lesson opened later in a tunnel then finds its chunk already loaded. It is skipped when `navigator.connection?.saveData` is true. These are the same chunks the lesson would request, so no new kind of network request is added. `worldLoader.ts` itself is not changed.

### 8.3 Map (`MapPage.tsx`, new `components/map/MapPath.tsx`, `WorldNode.tsx`)

- **A real path.** `MapPath` renders one SVG behind the nodes. Geometry is computed from constants, not measured from the DOM: row height 148 px, node centres alternate `x = ±56 px` (`±88 px` from 640 px wide), cubic curves between consecutive centres. Two strokes on the same path: a dashed `--line-strong` trail for the whole track, and a solid 6 px stroke in each segment's world colour for the completed part, revealed by `stroke-dashoffset` (M15).
- **Nodes** (`WorldNode`): 104 px island sticker.
  - Done: full colour, a `check` stamp, "14/18 ★".
  - Current: full colour, 116 px, a `flag` doodle with the note "kamu di sini" (plain text "Kamu di sini" for assistive technology), a ring that pulses twice then stays as a static ring. Junior: Bito (56 px) stands beside it and can be poked (M47).
  - Locked: grey layer, lock icon, "Terkunci", title visible, flat, no motion, no accent (PRD V14). Tapping shows the existing message in a `.pw-well` with `role="status"`.
- Newly unlocked worlds play M37 once (tracked with `src/engine/seen.ts`).
- The stage behind the path uses the dot grid in `--line` colour. Junior adds at most four tiny static terrain doodles per viewport. Pro adds none.
- Track switch: a segmented control on `--paper-2` with a sliding pill (M09). Labels: "Jalur A · Tampilan", "Jalur B · API" (Junior: "Tampilan", "API").
- Pro only: after the last node of each track, one `.pw-note` line: `// berikutnya: DevTools, npm, deploy. Sedang disiapkan.` It is text, not a node, and has no lock. It tells a career changer where the path continues (copydeck guide §14).
- Expanded: the side panel becomes a world poster (island sticker, title, tagline, lesson list as a compact trail) with one primary button "Buka {dunia} →".

### 8.4 World Detail (`WorldDetailPage.tsx`, new `components/world/LessonTrail.tsx`, `BossCard.tsx`)

- **World poster**: `.pw-poster` with the island sticker (140 px), kicker "DUNIA A1" (Junior: "Dunia", with no code), title, tagline, and progress as "3 dari 6 pelajaran · 7/18 ★" over a segmented bar (one segment per lesson, on-poster colours).
- **Pre-test card** (when not done): `.pw-card` with a `--world-50` band, "Tebak-tebakan Awal" (Junior) or "Cek Titik Awal" (Pro), "5 pertanyaan singkat sebelum belajar (+10 XP)" (the number follows the mode: 5 or 6), and the `.pw-note` "belum tahu? tidak apa-apa" (Junior) or `// belum tahu? lewati saja` (Pro).
- **Lesson trail** (`LessonTrail`): a vertical path on the left joins numbered stamp nodes. Rows:
  - Completed: compact (64 px), `check` stamp, title, stars. Tappable. Junior rows whose "Tantangan Kode" was solved carry a small `</>` stamp with the text "Tantangan Kode" (`seen.ts` key `bonus:{lessonId}`).
  - Active: expanded, `--elev-2`, `--world-50`, title in `.pw-h3`, "± 5 menit", the sticker silhouette if any, and a "Mulai" or "Lanjut" pill. Exactly one row is active.
  - Locked: flat, grey, lock icon and "Terkunci", `aria-disabled`. Not focusable as a button.
  - Newly unlocked rows play M35 once.
- **Side quests**: dashed-border rows with a `flag` icon, "Misi Bonus · opsional · +25 XP".
- **Boss card** (`BossCard`): `--boss` surface, `--on-boss` text, the guardian shield as a sticker, gold (`--star`) accents.
  - Locked: flat and still. "Selesaikan 2 pelajaran lagi untuk menantang {penjaga}." with a small meter.
  - Open: gold edge, static `rays` doodle behind the shield, "Siap ditantang!", button "Hadapi Penjaga →" in gold with `--on-star` text.
  - Passed: `check` stamp, "Lulus", best score.
- The Pro placement test button moves into the world poster as a `.pw-btn-inverse` secondary: "Tes Penempatan". It is never shown in Junior.
- **"Siap naik ke Pro?" card** (Junior only, once per profile, `seen.ts` key `offer:pro`): shown on the World Detail of a world whose Guardian is passed with an average of at least 2.5 stars per lesson. `.pw-card`: "Kamu sudah jago di sini. Mau coba mode Pro? Ada istilah asli dan kode sungguhan." Buttons: "Lihat mode Pro" (opens the mode section in Settings, which stays behind the Companion Gate) and "Nanti saja". Moving up is offered as an achievement, so an older child does not pick Pro on day one out of pride.

### 8.5 Lesson Player (`LessonPlayerPage.tsx`, new `components/lesson/LessonHeader.tsx`, `ActionBar.tsx`, `LessonResult.tsx`)

**Header** (`LessonHeader`): exit button (44 px, `aria-label="Keluar pelajaran"`), progress bar, session XP chip, combo chip (M48).

- Progress: one continuous bar. Fill uses M24. The total is the number of steps in the lesson for this mode plus requeued questions. A requeue lengthens the track and the fill keeps its absolute length, so the bar never moves backwards. There are no phase notches, because reading cards and questions now interleave. Junior gets the halfway note (M50).
- The kind of the current step is the kicker of the content, with an icon: "Cerita" (`book-open`), "Belajar" in Junior or "KONSEP" in Pro (`pencil`), "Coba sendiri" (`hand`), "Cek cepat" and "Soal 2 dari 4" (`circle-help`). Junior never shows the word "Konsep".
- Session XP chip: "★ 30", not interactive, `aria-label="Poin sesi ini: 30"` (Pro: "XP sesi ini: 30"). It is the target of M22 and updates when the chip lands, after "Lanjut". It shows +10 for a first-try answer and +3 for a retry, matching `XP_RULES`. It is display only: XP is still awarded by `completeLesson`.

**Step order: read, then do**

- The player follows the authored order of `lesson.steps`, including `question` steps. Today it pulls every question out and plays them after all the cards. A question placed between cards is a quick check, with the kicker "Cek cepat". It is an ordinary question from the lesson's own set: same scoring, same XP, same requeue. The questions after the last card form the closing quiz, and "Soal 2 dari 4" counts only those.
- One quiz session is created when the lesson starts: `createQuizSession` with every question visible in the mode, in authored order. A quick check answers the head of that queue. A missed question is requeued to the end as today, so it returns in the closing quiz. `queue.ts` and `scoring.ts` are not changed.
- **The rule** (enforced by the content validator, copydeck C25): in each mode, a learner never sees more than two reading cards (story, concept, limit) in a row without a question or a simulator. Package 5 moves one existing question to sit right after the card it tests. No new card type and no new question is needed for this.
- A simulator may sit anywhere in the order. In a lesson that has one, writers place it no later than third.
- There is no separate "guess first" card. The story card ends with a question (copydeck §6.5) and the world pre-test already does the pre-testing.
- Content that still has every question at the end plays exactly as before, so the player can land before the writers finish.
- Limit cards are skipped in Junior unless `riskyAnalogy` is true (existing rule).

**"Dengar" (read-aloud)** moves out of the header. It sits at the right end of the kicker row of the card or question it reads.

- Junior: a pill button with a speaker icon and the visible label "Dengar", `--touch-min` high. While it plays the label is "Berhenti". Pro: a 44 px speaker icon with `aria-label="Bacakan"`, shown when auto-read is on in Settings.
- **What it reads.** Story and concept cards: the title, then the visible text (`richToPlainText`). Limit card: the "Mirip" point, and the "Bedanya" point once it is revealed. Sim card: the instruction. Question: the scenario story or the `base` statement if there is one, the prompt, then each choice as "Pilihan 1: …, Pilihan 2: …" in the order shown on screen. For `sort`, `order` and `match` it reads the prompt, then the item and bin labels. Code bodies (`spotbug`, `fill`, `type`) are not read. Those types are Pro only.
- **The hint dialog and the FeedbackSheet** each have their own "Dengar" button. With auto-read on, the hint is read when it opens, and the FeedbackSheet reads its title and explanation when it appears.
- **Highlight (M49).** Text is spoken one sentence at a time by chaining `speakText(sentence, onEnd)` from the existing `speech.ts`. A session token cancels the chain when the learner stops it, checks an answer or moves on, so a cancelled sentence cannot start the next one.
- **Auto-read.** New Petualang profiles start with auto-read on: Onboarding calls `updateSettings({ autoReadAloud: true })` right after `createProfile`. The store default is untouched. An existing Junior profile with auto-read off gets a one-time offer on its first lesson card: "Mau dibacakan? [Nyalakan] [Tidak usah]" (`seen.ts` key `offer:autoread`).
- **No Indonesian voice.** The button is hidden as today, and Settings now says why (§8.10) instead of hiding the option silently.
- The logic lives in `src/engine/readAloud.ts` (new, Package 2): `buildReadQueue(target, mode, shownOrder)` returns sentences with the element each belongs to, `playQueue(queue, onSentence)` and `stopQueue()`.

**Action bar** (`ActionBar`): fixed to the bottom, `--paper-raised`, hairline top, safe-area padding. It holds the primary button and, on questions only, a round "Petunjuk" button to its left (`--touch-min`, lightbulb icon, visible label "Petunjuk" from 480 px, `aria-label="Petunjuk"` below). On non-question cards the hint button is not rendered (today it opens an unrelated dialog). The hint offer (M25) appears beside it when a missed question comes back, never on a timer.

**Story and concept cards**

- Stage on top: `.pw-stage`, `--radius-xl`, minimum 200 px, the illustration as a sticker. Junior story cards: Bito (96 px) waves next to it.
- Text below: kicker, title, body. Children use M07.
- Objective on story cards: a `.pw-well` with a target icon and "Tujuan: …" (Junior, existing text) or "Setelah ini: …" (Pro).
- Concept cards with code (Pro). From 640 px: the code block is inside the stage with the illustration. Under 640 px the order is title, the first sentence of the body, the code block, then the rest of the body, and the illustration shrinks to a 72 px sticker beside the title. A beginner therefore reads one plain sentence before meeting code, and never opens a card on a wall of code. The copydeck caps a Pro concept body at 60 words when the card has a code block.
- Expanded layout: two columns as today (stage left, text right).

**Batas Analogi card** (`LimitCard.tsx`): amber kicker "Mirip, tetapi berbeda" in Junior and "BATAS ANALOGI" in Pro. The "Mirip" column shows first. The primary button reads "Apa bedanya? →". On tap, "Bedanya" appears (M26) and the button reads "Paham →". Both columns have an icon and a heading, so the difference is not carried by colour alone. No new illustration is drawn for it.

**Sim card**: kicker "COBA SENDIRI", the instruction as the title (the generic "Simulasi Interaktif" heading is removed), the simulator inside the stage.

**Question card**

- Kicker: "SOAL 2 DARI 4", "CEK CEPAT" for a quick check, "PEMANASAN · MASIH INGAT?" for the warm-up, "COBA LAGI" for a requeued question (M13). Junior shows the same words in sentence case.
- A type chip under the kicker tells the learner what to do, with an icon: "Pilih satu", "Benar atau salah?", "Kelompokkan", "Urutkan", "Pasangkan", "Ketuk bagian yang tepat", "Ketuk baris yang salah", "Lengkapi", "Ketik jawaban".
- `scenario` questions: the story is in a `.pw-well` note card with a small character avatar sticker, separate from the prompt. `why` questions: the `base` statement is in the same note card. `limit` questions: the analogy is a chip.
- Prompt in `.pw-prompt` (§4.4). Answers below with 12 px gaps.
- **Icons on answers.** A choice, a sort item or a sort bin may carry `icon`, a name from the fixed list in `src/content/icons.ts` (40 lucide icons, no new art). A choice shows it at 28 px to the left of the label. A Junior sort bin shows it at 40 px above a label of one or two words. `QuestionRenderer` resolves the name through `ContentIcon` and passes the element to `ChoiceCard`, so the icon map stays in the lazy lesson chunk. The validator requires `icon` on sort bins that Junior sees (copydeck C29).
- Feedback per §5.5.

**FeedbackSheet** (`FeedbackSheet.tsx`)

- Surface `--ok-50` or `--warn-50`, top corners `--radius-xl`, `--elev-2` upward, a 3 px top band in `--ok-500` or `--warn-500`.
- Bito peeks over the top edge (M21): `happy` or `think`.
- Title: one of "Tepat!", "Betul!", "Pas!" for correct. For wrong: "Belum pas" (Junior) or "Belum tepat" (Pro), and "Hampir!" only when at least 70% of the parts were right (§5.5). An `underline` doodle draws under it.
- The XP badge "+10 XP" (Junior: "+10 poin") uses `--star` with `--on-star` text through tokens (today the text colour is a hard-coded hex). It stays still while the sheet is open and becomes the source element for M22 when the learner presses "Lanjut". It shows "+3" for a retry.
- Explanation in `.pw-body`, at most two sentences (copydeck guide §6), with its own "Dengar" button in Junior.
- The title already carries the verdict. Remove the duplicate prefix from the fallback explanation in `LessonPlayerPage.tsx` (line 254, `Hampir! Jawaban itu belum tepat. …`). Package 5 removes the same prefix from the `makeMcq` default in `lessonHelpers.ts`.
- Wrong answers add a chip with a repeat icon: "Soal ini muncul lagi nanti."
- Button "Lanjut →". It keeps `autoFocus`. The region keeps `aria-live="polite"`.

**Result** (`LessonResult`): layout top to bottom: Bito and stars on a `.pw-stage`, headline, the line under it (§5.6), XP breakdown lines with count-up, the level bar ("Level 3 · 240 / 300 poin" or "Lv 3 · 240 / 300 XP"), the recap as a note with the key phrase in `.pw-mark` under the kicker "Inti hari ini", one mode-specific line (below), the new sticker (M30, M31) with the note "stiker baru!" (Pro: the concept card with `// konsep baru`), then the actions from §5.6. "Ulangi" must restart the lesson state in place instead of calling `window.location.reload()`.

- **Companion line (Junior).** A `.pw-well` with a two-people icon: "Ceritakan ke kakak atau temanmu:" followed by the lesson's first `companion.talkPrompts` entry, or the recap when the lesson has none. It is a teach-back step, and it gives a companion a job besides reading aloud. No input, no score.
- **"Di tempat kerja" (Pro).** The lesson's `atWork` sentence, when present, in a `.pw-well` with a briefcase icon: "Di tempat kerja: kamu akan melihat ini di tab Network saat form gagal terkirim."
- **Personal record (Pro).** "4 dari 5 benar di percobaan pertama · 4 mnt 10 dtk". When either number beats the stored best for this lesson it adds `// rekor baru`. Otherwise the best is shown plainly ("terbaik: 5 dari 5 · 3 mnt 40 dtk") with no comparison wording. `src/engine/records.ts` (new, Package 2), `localStorage` key `petualang-web-records-v1`. Time counts only while the document is visible. It compares the learner with nobody else.
- **"Tantangan Kode" (Junior, three-star result only, optional).** Offered when the lesson has a question with `modes: ['pro']`, type `fill` or `spotbug` and `difficulty` 1 or 2. It plays that one question with its Pro text, with the hint and "Dengar" available. It gives no XP and no stars (scoring is frozen) and is never requeued. A right answer stamps `</>` on the lesson row (`seen.ts` key `bonus:{lessonId}`) and Bito shows `wow`. A wrong answer shows the explanation and "Kode seperti ini ada di mode Pro. Kamu bisa coba lagi kapan saja." It never appears before a three-star result, so a beginning reader does not meet code by accident, and an older child gets real code to show off.

**Resume inside the quiz** (`src/engine/lessonSession.ts`, new, Package 2). After every answer and every "Lanjut" the player saves a snapshot under the `localStorage` key `petualang-web-session-v1`, one entry per profile and lesson: `{ lessonId, mode, stepIndex, queue: [{ id, isRetry }], attemptedFirstTry, firstTryCorrectIds, retryCorrectIds, completedIds, elapsedMs, savedAt }`. When a lesson opens, a snapshot for the same lesson and mode that is less than 7 days old and whose question ids all still exist is restored: the session is rebuilt from the lesson's own questions (choices are reshuffled) and the learner lands on the same card or question. Any other snapshot is dropped. The snapshot is cleared by `completeLesson` and by "Ulangi". The store and its `saveLessonStep` call are unchanged. The exit dialog keeps its text, "Kemajuanmu di pelajaran ini sudah disimpan. Kamu bisa melanjutkannya kapan saja.", which is now true. Boss and assessment sessions are short and are not resumed in this pass.

**Break reminder** (Junior, existing `breakReminderMinutes`): the dialog's primary button becomes "Istirahat dulu" (goes to Home, progress is saved as above) and "Lanjut belajar" becomes the secondary button. Today it is the other way round.

**Level-up detection without touching the store**: before calling `completeLesson`, read `getLevelFromXp(profile.xp, mode).level`. After, compute the level for `profile.xp + res.xpEarned`. If it rose: in Junior call `celebrate({ kind: 'levelUp', level, title })`, in Pro render the level-up toast banner inside `LessonResult` and do not call `celebrate`. The same pattern applies to the boss, review and assessment pages.

**World-unlock detection** (boss page): after a pass, find the worlds in `WORLD_METAS` whose `requires` includes this world and that `isWorldUnlocked` now returns true for. Call `celebrate({ kind: 'worldUnlock', worldId })` for the first one, and do not mark it seen: the Map still plays M37 for it.

**Loading and error**: the loader is `fx/PageLoader`. The error state keeps its title ("Bito tersesat sebentar") with Bito `think` on a stage. The line under it names the likely cause: "Sinyal putus? Pelajaran ini belum tersimpan di HP-mu. Coba lagi saat sinyal kembali." The "Coba lagi" button calls the loader again in place instead of `window.location.reload()`, so nothing else on the page is lost.

### 8.6 Boss (`BossQuizPage.tsx`)

- **Intro**: full-height `--boss` surface. The guardian shield as a large sticker (M38). Kicker "TANTANGAN PENJAGA" in gold. Title. The greeting in a speech bubble (`--paper-raised`). Three rule chips with icons: "8 soal" (or 12), "Lulus 80%", "+50 XP". Primary button in gold with `--on-star` text: "Mulai Tantangan →". Ghost: "Nanti saja".
- **Quiz**: the header shows the guardian shield (40 px) and its shield pips, one per question (M39), with "Soal 3 dari 8". Each right answer fills a pip and bumps the shield, so the pips read as the guardian's shield wearing down. No separate HP bar is added. The question area is the same component and rhythm as lessons, on the normal page surface, so reading conditions do not change. Existing flow logic stays.
- **Passed**: gate opens (M40), confetti (M28), "+50 XP" counts up, then the world-unlock celebration (M36) when a world opens. Headline: "Gerbang terbuka!".
- **Not yet**: calm (M41). Headline "Sedikit lagi!". Under it the concrete gap: "Kurang {n} jawaban benar untuk membuka gerbang." The score as pips. Then "Pembahasan Soal" for the missed questions, then "Pelajaran yang bisa kamu lihat lagi:" with links. Buttons "Coba lagi" and "Kembali ke {dunia}".
- The review list ("Pembahasan Soal") uses `.pw-well` rows with icon and text status.

### 8.7 Onboarding (`OnboardingPage.tsx`)

- Step indicator: a `dash-path` with three stops. The current stop is a filled stamp.
- Step 1: Bito 160 px with `idle` on, waving. "Halo! Aku Bito." with M06. One line: "Aku robot pengantar pesan. Yuk, kita jelajahi cara kerja web." ("Paket data" is not used: to a child it means phone credit.)
- Step 2 (name and avatar): avatars as a sticker grid (M43). The name field uses `--line-strong` for its border.
- Step 3 (mode): two large cards that preview their own skin. **Neither card names a school grade or an age.** The cards describe a style, so a twelve-year-old does not pick Pro out of pride and an adult does not feel sent to a children's app.
  - **"Petualang"** card: Junior radius, a doodle, the handwritten note "banyak gambar dan cerita", and a small "Dengar" pill. Three icon lines: "Cerita dan gambar di tiap pelajaran", "Semua bisa dibacakan", "Boleh ditemani kakak atau orang tua".
  - **"Pro"** card: Pro radius and the comment skin (`// mulai dari nol`). It shows the best of the mode: a three-line coloured code snippet on the `--boss` surface with its rendered result beside it (a static pair, no animation). Three icon lines: "Istilah asli dan kode sungguhan", "Untuk remaja dan dewasa", "Langsung ke inti". Under the card: "Tanda // adalah catatan di dalam kode. Kamu akan sering melihatnya."
  - Below both cards: "Bisa diganti kapan saja di Pengaturan."
- After creating a Petualang profile, Onboarding calls `updateSettings({ autoReadAloud: true })` (§8.5).
- One primary button per step in the action bar position.

### 8.8 Profile Select (`ProfileSelectPage.tsx`)

- Profiles become sticker cards in a 2-column grid (one column under 360 px): avatar sticker (72 px), name, "Petualang · Level 3" or "Pro · Lv 3" (`MODE_LABEL`, `levelLabel`), tilt by index. They deal in (M42).
- "Tambah profil" is a dashed empty-sticker slot with a plus icon, not a primary button, so the screen's first action is choosing an existing profile.
- Headline "Siapa yang mau belajar?" (existing), Bito 96 px with `idle` on.
- The note about local storage stays as `.pw-small`.

### 8.9 Profile and Sticker Book (`ProfilePage.tsx`, `StickerBookPage.tsx`)

**Profile**

- Identity poster: avatar sticker, name, "LEVEL 3 · {gelar}", the XP bar with "240 / 300 XP", and the next title as a dashed chip: "Berikutnya: Penata Warna".
- Four stat tiles (2 × 2): icon, number (count-up on first view), label.
- Badges as stickers. Unearned ones are dashed outlines with the requirement as text.
- Mascot customisation: colour swatches and accessories as sticker chips. Bito previews the change and reacts with `happy`. The accessory list and its level requirements move to `src/content/mascotRewards.ts` (Package 0), so the level-up overlay can name the next reward. Labels spell out "Level 2", never "Lv 2", in Junior.

**Collection** (same route and file; "Buku Stiker" in Junior, "Koleksi Konsep" in Pro)

- Uses `ui/StickerCard`. Junior, owned: colour, tilt, tap to flip (M31). The back shows the analogy summary and its concept. Stickers from three-star lessons have the gold finish (§4.8).
- Pro, owned: upright concept cards with no tilt (§4.8). The front shows the art and the concept name, the back the analogy summary. The page title, the headings and every note say "konsep", never "stiker".
- Unowned: dashed slot, `curl` doodle, and the text "Dari pelajaran: {judul}". No pulsing.
- An item earned since the last visit carries the note "baru!" (Pro: `// baru`) until it has been flipped once (tracked with `seen.ts`).
- Section headings per track and world, each with "3 dari 4".
- The grid stays 3 / 4 / 5 columns.

### 8.10 Settings (`SettingsPage.tsx`)

- No poster. Groups in `.pw-card`s with headings: "Tampilan", "Suara & Bacakan", "Belajar", "Data".
- Each setting: icon, label, one line saying what it does, and its control. Segmented controls and switches use M09.
- "Kurangi animasi" explains itself: "Mematikan gerakan, konfeti, dan getar. Perubahan layar jadi pudar halus." Changing it takes effect immediately.
- **"Teks nyaman dibaca"** (new, in "Tampilan"): "Huruf dan baris lebih renggang. Tanpa tulisan miring dan huruf bergerak." It is stored per profile by `src/engine/readingComfort.ts` in its own `localStorage` key, not in the profile store, and takes effect immediately (§4.4).
- Theme choice shows three small previews (Terang, Gelap, Ikuti perangkat) as mini cards in each theme's real tokens. The default stays "Ikuti perangkat" in both modes.
- **"Suara & Bacakan"**: "Bacakan otomatis" with the line "Bito membacakan cerita, soal, pilihan, dan penjelasan." When the device has no Indonesian voice, a `.pw-well` says so instead of hiding the option: "Perangkat ini belum punya suara Bahasa Indonesia. Pasang lewat pengaturan suara di perangkat, lalu buka lagi halaman ini."
- The mode section names the modes "Petualang" and "Pro (mulai dari nol)", with the existing line that progress carries over.
- Dangerous actions (reset, delete profile) are last, use the danger button, and stay behind the Companion Gate.

### 8.11 Other screens

- **Review Box, Assessment** (`ReviewBoxPage.tsx`, `AssessmentPage.tsx`): use the lesson question card, action bar, read-aloud and feedback effects. The Leitner boxes on the Review Box landing are drawn as five stacked card sticks with counts. Assessment results use count-up and, for the post-test, a before/after pair of bars.
  - **Warm-up session** (opened from Home with `?next=`): takes `WARMUP_CAP` cards, 3 in Junior and 5 in Pro, instead of 10. Its closing button reads "Lanjut ke pelajaran →". A session opened from the tile keeps the existing size. Leitner logic is unchanged: only the number of cards drawn changes.
  - **Junior landing** adds one sentence: "Soal lama muncul lagi di sini supaya kamu tidak lupa."
  - **"Kilat" (Pro only, optional)**: a switch on the landing, `// kilat: pakai stopwatch`. The session is the same. A stopwatch counts up (never down) in the header, and the end screen shows the time and the personal best for that session size (`records.ts`). There is no countdown, nothing is cut short, and Junior does not have it.
- **Glossary, Companion, Not Found** (`GlossaryPage.tsx`, `CompanionPage.tsx`, `NotFoundPage.tsx`): tokens, radii, shadows and the reduced-motion contract only. Not Found gets Bito `think` on a stage. Companion stays calm and adult: Pro skin regardless of the child's mode.
- **Simulators** (`SimulatorsA.tsx`, `SimulatorsB.tsx`, `SimulatorHost.tsx`): replace hard-coded hex with tokens, replace `animate-pulse` with a `.pw-well` skeleton, apply the radius tokens. No redesign in this pass. A redesigned simulator and a live code editor are follow-up work (§15.3).

---

## 9. Performance rules

Target device: a low-end Android phone (4 cores, 2 GB RAM) in Chrome.

1. **Animate only `transform` and `opacity`.** `stroke-dashoffset` is allowed for doodles and paths (small SVGs only). Never animate `box-shadow`, `filter`, `backdrop-filter`, `width`, `height`, `top`, `left`, `margin`, `border-width` or `background-position` (the sheen is the one exception and runs only on pointer devices in tier `full`).
2. **No `backdrop-filter` anywhere.** No SVG filters. No `mix-blend-mode` on animated elements.
3. **Particle caps.** Confetti 28 (`full`) or 12 (`lite`). Sparks six per burst, eight at a combo of five (M48). Never more than 40 animated elements at once. Particles are removed from the DOM on `animationend`.
4. **`will-change` is temporary.** Effect classes add `will-change: transform, opacity` and the class is removed when the animation ends. No permanent `will-change`.
5. **No animation loops in JS** except `useCountUp` (≤ 900 ms) and `useSheen` (pointer only). Both stop when `document.hidden`.
6. **Nothing blocks input.** No `pointer-events: none` on the page during a sequence. The primary button is in the DOM from the first frame. Overlays close on tap, Enter and Escape.
7. **Containment.** `.pw-stage` and celebration overlays use `contain: layout paint`.
8. **Fonts.** Three files, ≤ 83 KB. Preload only `plus-jakarta-sans-var.woff2`. Patrick Hand and JetBrains Mono load on first use with `font-display: swap`.
9. **Budgets for this change.** CSS grows by ≤ 8 KB gzip. JS for `src/motion`, `src/components/fx` and `src/components/celebrate` is ≤ 6 KB gzip in the initial chunk. Celebration overlays are lazy-loaded with `React.lazy` inside `CelebrationHost`. `ContentIcon`, `readAloud.ts`, `lessonSession.ts` and `records.ts` are imported only by lazy routes, so they stay out of the initial chunk. No new runtime dependency.
10. **Check.** With 4× CPU throttling in Chrome DevTools, answering a question (M19 to M23) and opening the result screen show no long task over 50 ms caused by animation code, and INP stays ≤ 200 ms.

---

## 10. Accessibility rules

### 10.1 Contrast (WCAG 2.1 AA), verified pairs

| Foreground on background | Light | Dark |
|---|---|---|
| `--ink` on `--cream` / `--paper` / `--paper-2` | 13.87 / 15.05 / 12.70 | 14.88 / 13.02 / 14.23 |
| `--ink-2` on `--cream` / `--paper` / `--paper-2` | 7.18 / 7.79 / 6.57 | 9.60 / 8.40 / 9.18 |
| `--ink-3` on `--cream` / `--paper` / `--paper-2` | 4.93 / 5.34 / 4.51 | 6.45 / 5.64 / 6.16 |
| `--ink` on `--paper-raised` | 15+ | 11.48 |
| `--ok-600` on `--ok-50` | 5.29 | 9.23 |
| `--warn-700` on `--warn-50` | 5.51 | 10.35 |
| `--star-700` on `--star-50` | 6.24 | 10.15 |
| `--on-star` on `--star` | 8.31 | 9.69 |
| `--on-boss` on `--boss` | 15.05 | 15.60 |
| `--star` on `--boss` | 8.31 | 10.16 |
| White on `--world-600`, worst non-yellow world | 4.80 | 4.80 |
| `--world-700` on `--paper` / `--world-50` / `--world-100`, worst world | 6.43 / 5.89 / 5.18 | 6.30 / 5.95 / 4.82 |
| `--line-strong` on `--paper` (non-text, needs 3:1) | 3.56 | 3.53 |

Pairs that are **not allowed** because they fail: white on `--ok-500` (4.04), white on `--warn-500` (3.35), the old `--ink-3` `#8A8EA8` on white (3.22), translucent `--on-poster`.

`scripts/check-contrast.ts` is updated in Package 0: new `TOKENS` values, plus checks for `--ink-3`, `--paper-2`, `--star-700`/`--star-50`, `--on-star`/`--star`, `--on-boss`/`--boss`, and world checks against the new `--paper` and `--cream` instead of the literal `#FFFFFF`.

### 10.2 Rules

1. **Focus.** `:focus-visible` shows a 3 px outline in `--world-700` with 3 px offset. On posters and on `--boss` the outline colour is `--on-poster` / `--star`. Focus is never removed.
2. **Targets.** `--touch-min` 48 / 56 px. 16 px between targets, 24 px between groups (PRD V11).
3. **Not by colour alone.** Every status has an icon and text: locked, done, correct, wrong, new. This includes each judged part inside `sort`, `order`, `match`, `fill`, `spotbug` and `type` (§5.5). Wrong is dashed and right is solid, so the pair survives both reduced motion and red-green colour blindness.
4. **Decorations are silent.** Doodles, particles, sheen, kinetic letter spans and stage textures are `aria-hidden`. `KineticText` renders the full string once in a visually hidden element.
5. **Annotations.** If an `Annot` carries information, pass `label` and it renders visually hidden plain text. The Pro `// ` prefix is generated in CSS and is not read.
6. **Live regions.** FeedbackSheet stays `aria-live="polite"`. Count-up elements are `aria-hidden` and are followed by a visually hidden final value. Celebration overlays are `<dialog>` elements with a heading, focus moves to their primary button, and Escape closes them.
7. **Motion.** Nothing changes more than three times per second. No auto-playing loop lasts longer than five seconds without ending, except the loader. The reduced-motion contract (§5.3) covers every effect.
8. **Text scaling.** At 130% text scale on a 360 × 640 viewport: no horizontal scroll, the action bar does not cover content, posters grow in height instead of clipping.
9. **Handwriting font.** Never the only carrier of required information. Minimum 18 px.
10. **Keyboard.** Sticker flip, limit-card reveal, track switch and overlays are all operable with Tab, Enter and Space. No hidden gestures (PRD V7).
11. **Dark mode.** Every colour comes from a token. Each screen is checked in both themes before a package is done.
12. **Read-aloud coverage.** In Junior every text a learner must read to proceed can be heard: story, concept, question, each answer choice, hint and feedback (§8.5). When no Indonesian voice exists, Settings says so.
13. **Reading comfort.** "Teks nyaman dibaca" (§4.4, §8.10) widens letter and line spacing, removes tilt and all-caps and stops kinetic text. Question prompts use `.pw-prompt` with no negative tracking in every setting.
14. **No time pressure in Junior.** No timers, countdowns or time-triggered nudges. The Pro stopwatch is optional and off by default.

---

## 11. PRD deltas

This spec supersedes these parts of `prd.md`. The PRD itself is not edited in this pass.

| PRD section | Was | Now |
|---|---|---|
| §10 intro | "Bukan gaya aplikasi anak yang ramai; lebih seperti buku cerita yang rapi" | Kept in spirit: a notebook with stickers and doodles, still one focus per screen |
| §10.1 base tokens | `--cream #F6F3EE`, `--paper #FFFFFF`, `--line #E4E1DA`, `--ink-3 #8A8EA8` | §4.2 values. New tokens `--paper-2`, `--paper-raised`, `--line-strong`, `--star-50`, `--star-700`, `--on-star`, `--boss`, `--on-boss` |
| §10.2 fonts | Three Jakarta files plus two JetBrains files | One variable file per family, plus Patrick Hand 400 |
| §10.3 radius and shadow | `sm 8 / md 14 / lg 20`, one card shadow | §4.5 scale per mode, §4.6 elevation system |
| §10.4 `Mascot` | Six expressions, static | Seven (adds `wow`), with idle and reaction motion |
| §10.8 motion table | Seven rows | §5.2 tokens and the §5.4 catalogue. The reduced-motion rule is unchanged and now enforced globally |
| §9.5 lesson player header | ✕, progress, 🔊, 💡 in the header | ✕, progress, session XP. 🔊 moves next to the text, 💡 next to "Periksa" (V6 still holds: the three icons exist and are labelled) |
| §13.8 font budget | 3 files, ≤ 90 KB | 3 files, ≤ 83 KB |
| §7.8 weekly target | Unchanged | Unchanged. This spec adds the celebration only. No daily streak. The consecutive-weeks count is shown in Pro only |
| Mode name | "Junior" in the UI | Shown as "Petualang". The id stays `junior`. Mode cards describe a style, not a grade or an age |
| §9.5 lesson order | All cards, then all questions | Authored order. At most two reading cards in a row (§8.5) |
| §11.4 wrong-answer title | "Hampir!" for every wrong answer in Junior | "Belum pas" / "Belum tepat". "Hampir!" only at 70% partial credit |
| §12.1 read-aloud | Reads the prompt. Auto-read off by default | Reads prompt, choices, hint and feedback. Auto-read on for new Petualang profiles |
| §12.3 break reminder | "Lanjut belajar" is the primary button | "Istirahat dulu" is the primary button |
| Warm-up before a lesson | 5 cards (Junior), 10 (Pro), no way to skip | 3 and 5, with "Langsung ke pelajaran" |
| Content schema | — | Three additive optional fields: `modes` on `Rich`, `icon` on choices, items and bins, `atWork` on lessons |
| Sounds | Five effects | Seven: adds `slap` and `bip`, both synthesised |

---

## 12. Work split

Six packages. **Package 0 lands first and blocks the rest.** Packages 1 to 5 then run in parallel. (Build note, 2026-11-23: Packages 1 to 4 run at the same time in **one working tree**, without worktrees, so the file lists below are exact and nobody formats, renames or reverts a file they do not own. Package 5 is run by the copy team on its own files.) A package may edit only the files it owns. No file is owned by two parallel packages. Files not listed are frozen for everyone: `src/store/useAppStore.ts`, `src/engine/{date,leitner,queue,scoring,speech,unlock}.ts`, `src/content/{curriculum,worldLoader}.ts`, `src/content/mock-api/mockFetch.ts`, `tests/*` (existing files), `vite.config.ts`, `tsconfig.json`, `vercel.json`, `prd.md`.

Parallel packages depend only on the **Package 0 contract**: CSS classes and tokens, `src/motion/*`, `src/components/fx/*`, `ui/StickerCard`, `ui/Poster`, `ui/ContentIcon`, `src/app/modeConfig.ts`, `src/engine/celebrations.ts`, `src/engine/seen.ts`, `src/engine/readingComfort.ts`, `src/engine/sound.ts`, `src/content/rich.ts`, `src/content/icons.ts`, `src/content/mascotRewards.ts`, the schema fields, and the prop stubs listed below. Each package must typecheck against Package 0 alone.

Cross-package hand-offs go through data, not shared files: Package 2 writes the `seen.ts` keys `bonus:{lessonId}` and `offer:autoread`, Package 3 reads `bonus:{lessonId}` and writes `offer:pro`. Packages 2 and 3 both read `WARMUP_CAP`.

### Package 0 — Foundation (must land first)

Owns and modifies:

- `src/styles/tokens.css` — all tokens in §4 and §5.2, mode blocks, Bito and illustration tokens. Remove unused tokens.
- `src/styles/global.css` — base, surface and button classes, `.pw-prompt`, the Junior kicker rule, the `[data-reading='comfort']` block, the gold and Pro treatments of `.pw-sticker`. Delete the old per-class reduced-motion blocks.
- `src/styles/motion.css` (new, imported by `global.css`) — keyframes, effect classes, the reduced-motion contract. It delivers the whole class contract of §5.9.7 with the values of §5.9.4, because no later package may add a keyframe.
- `public/fonts/*` — renames, deletions and additions from §4.4.
- `index.html` — font preload, two `theme-color` metas, the empty `<div id="fx-layer">` used by the XP fly.
- `src/main.tsx` — set `data-fx-tier` at start, and keep `data-input` up to date (§5.9.6).
- `scripts/check-contrast.ts` — new values and checks (§10.1).
- `scripts/check-hardcoded-colors.ts` (new) and `package.json` (script `check:colors` only, warn mode).
- `src/motion/tokens.ts`, `src/motion/prefs.ts`, `src/motion/waapi.ts` (`runSequence`, `fx`, `flyTo`, §5.9.7), `src/motion/useCountUp.ts`, `src/motion/useSheen.ts` (new).
- `src/app/modeConfig.ts` (new) — `MODE_LABEL` (`junior: 'Petualang'`, `pro: 'Pro'`), `xpWord(mode)`, `levelLabel(level, mode)`, `COLLECTION_LABEL`, `WARMUP_CAP` (`junior: 3`, `pro: 5`).
- `src/engine/celebrations.ts` (new) — `celebrate(event)`, `useCelebrations()` returning `{ current, dismiss }`. Events: `{ kind: 'levelUp'; level: number; title: string }` and `{ kind: 'worldUnlock'; worldId: string }`. A module-level queue, not persisted. Level-up shows before world unlock. The weekly target is not an overlay: it is always inline in the week strip.
- `src/engine/seen.ts` (new) — `hasSeen(profileId, key)`, `markSeen(profileId, key)`, `primeSeen(profileId, keys)`. Stored in `localStorage` under `petualang-web-seen-v1`, separate from the profile store. On first run it primes with everything already unlocked, so no reveal replays for existing users: `primeSeen` only has an effect the first time it is called for a profile. Key names: `unlock:world:{worldId}`, `unlock:lesson:{lessonId}`, `path:{worldId}:{completedCount}`, `flip:{stickerId}`, `gold:{stickerId}`, `day:{date}`, `week:{isoWeek}`, `bonus:{lessonId}`, `offer:autoread`, `offer:pro`.
- `src/engine/readingComfort.ts` (new) — `getReadingComfort(profileId)`, `setReadingComfort(profileId, on)`, `applyReadingComfort(profileId)`. Stored under `petualang-web-reading-v1`.
- `src/engine/sound.ts` — add `slap` and `bip` to `SoundEffect` (§5.8). The five existing effects are not changed. This file leaves the frozen list.
- `src/content/schema.ts` — **three additive changes**, all optional, so existing content stays valid: `modes: z.array(z.enum(['junior','pro'])).optional()` on each `Rich` variant; `icon: z.enum(CONTENT_ICONS).optional()` on `ChoiceSchema`, `ItemSchema` and `BinSchema`; `atWork: z.string().min(1).optional()` on `LessonSchema`.
- `src/content/icons.ts` (new) — `CONTENT_ICONS`, the fixed list of 40 icon names (names only, no component imports, so the schema and the validator can import it).
- `src/content/mascotRewards.ts` (new) — the accessory list with level requirements (moved out of `ProfilePage.tsx`) and `nextReward(level)`.
- `src/content/rich.ts` (new) — `visibleSegments(segments, mode)` and `richToPlainText(segments, mode)`. A segment is hidden when its `modes` excludes the mode, or when it is a text segment whose resolved string is empty.
- `src/content/lessonHelpers.ts` — add `rJunior(text)`, `rPro(text)`, and an optional `modes` argument on `rCode`. No behaviour change to existing helpers.
- `src/components/fx/Doodle.tsx`, `Annot.tsx`, `KineticText.tsx`, `CountUp.tsx`, `Burst.tsx`, `XpFly.tsx`, `RouteTransition.tsx`, `PageLoader.tsx` (new).
- `src/components/ui/StickerCard.tsx` (with `finish?: 'plain' | 'gold'`), `src/components/ui/Poster.tsx`, `src/components/ui/ContentIcon.tsx` (maps a `CONTENT_ICONS` name to its lucide component) (new).
- `src/components/celebrate/CelebrationHost.tsx` (new, stub that renders `null`).
- `tests/motion.test.ts`, `tests/rich.test.ts`, `tests/seen.test.ts`, `tests/readingComfort.test.ts` (new).
- **Prop stubs** (typed, accepted, ignored until Package 1) in `src/components/mascot/Bito.tsx` (`idle`, `react`, `pokeable`, `onPoke`, expression `'wow'`), `src/components/ui/StarRow.tsx` (`stamp`), `src/components/ui/ProgressBar.tsx` (`segments`, `variant: 'poster'`, `halfwayNote`), `src/components/ui/ConfettiBurst.tsx` (`pieces`, `origin`), `src/components/ui/ChoiceCard.tsx` (state `'almost'` as an alias of `'incorrect'`, `icon?: ReactNode`, `reading?: boolean`), `src/components/ui/Button.tsx` (variant `'inverse'`), and `src/components/ui/RichText.tsx` (use `visibleSegments`).

Class contract delivered by Package 0:

| Group | Classes and attributes |
|---|---|
| Surfaces | `.pw-card`, `.pw-card-raised`, `.pw-well`, `.pw-stage`, `.pw-poster`, `.pw-sticker` (with `data-finish="gold"`), `.pw-boss` |
| Text | `.pw-display`, `.pw-h1`, `.pw-h2`, `.pw-h3`, `.pw-prompt`, `.pw-body-l`, `.pw-body`, `.pw-small`, `.pw-kicker`, `.pw-code`, `.pw-hand`, `.pw-note`, `.pw-mark` |
| Buttons | `.pw-btn-primary`, `.pw-btn-secondary`, `.pw-btn-ghost`, `.pw-btn-danger`, `.pw-btn-inverse`, `.pw-pressable` |
| Motion | The full list in §5.9.7: `.pw-enter` with `data-enter`, `.pw-stagger`, `.pw-seq`, `.pw-draw`, `.pw-boil`, the `.pw-fx-*` classes, `.pw-confetti-piece`, the `.bito[data-react]` rules, `.pw-flip`, `data-rm="fade"` |
| Root attributes | `data-mode`, `data-fx-tier`, `data-reduced-motion`, `data-reading="comfort"`, `data-input` |
| Kept for compatibility | `.pw-anim-slide-up`, `.pw-anim-pop`, `.pw-anim-star`, `.pw-anim-shake` (now the soft nudge of M20), `.pw-anim-pulse` (now a pseudo-element ring, two cycles). `.pw-squish-pop` and `.pw-float` become no-ops (§5.9.7) |

### Package 1 — UI kit, mascot and celebrations

- `src/components/ui/Button.tsx`, `ChoiceCard.tsx`, `CodeBlock.tsx`, `CompanionGate.tsx`, `ConfettiBurst.tsx`, `DialogModal.tsx`, `ProgressBar.tsx`, `RichText.tsx`, `StarRow.tsx`, `StorageWarningBanner.tsx`, `WeekDots.tsx`, `WorldThemeWrapper.tsx`
- `src/components/mascot/Bito.tsx`, `BrandLogo.tsx`, `CharacterAvatar.tsx`
- `src/components/illustrations/ConceptVisuals.tsx`
- `src/components/celebrate/CelebrationHost.tsx`, `LevelUpOverlay.tsx`, `WorldUnlockOverlay.tsx` (the last two are new)

Scope: implement the stubs, the pressable edge, tokenised colours (dark mode), Bito motion (§5.7) including the poke (M47), star stamps, segmented progress for posters, the continuous lesson bar with the halfway note (M50), `ChoiceCard` with an icon slot and the read-aloud ring (M49), tiered confetti with the JS guard, the week strip with M33 and M34 (played once per day and once per week, tracked with `seen.ts` keys `day:{date}` and `week:{isoWeek}`; the consecutive count renders only when the page passes it), and the celebration overlays (M32 with the next reward from `mascotRewards.ts`, M36).

### Package 2 — Lesson experience

- `src/pages/LessonPlayerPage.tsx`, `BossQuizPage.tsx`, `AssessmentPage.tsx`, `ReviewBoxPage.tsx`
- `src/components/lesson/FeedbackSheet.tsx`, `LimitCard.tsx`, `QuestionGuideOverlay.tsx`
- `src/components/lesson/LessonHeader.tsx`, `ActionBar.tsx`, `LessonResult.tsx` (new)
- `src/components/questions/QuestionRenderer.tsx`
- `src/components/sims/SimulatorHost.tsx`, `SimulatorsA.tsx`, `SimulatorsB.tsx`
- `src/engine/lessonSession.ts`, `src/engine/readAloud.ts`, `src/engine/records.ts`, `src/engine/sitting.ts` (new)
- `tests/lessonSession.test.ts`, `tests/readAloud.test.ts`, `tests/records.test.ts` (new)

Scope: §8.5, §8.6, §8.11 (Review Box, Assessment, simulators), §5.5, §5.6, M12, M13, M17 to M31, M38 to M41, M48, M49, level-up detection. In detail: authored step order with quick checks, read-aloud for cards, choices, hints and feedback, quiz resume, the hint offer without a timer, XP fly after "Lanjut", per-part icons and the partial-credit title, the stopping point and the break dialog order, the companion line, "Di tempat kerja", personal records, "Tantangan Kode", the warm-up cap and "Kilat" in the Review Box, and the offline error with an in-place retry. `getReadableText` is replaced by `readAloud.ts`, which uses `richToPlainText`.

### Package 3 — Navigation screens and shell

- `src/app/App.tsx`
- `src/components/layout/AppShell.tsx`
- `src/pages/HomePage.tsx`, `MapPage.tsx`, `WorldDetailPage.tsx`, `NotFoundPage.tsx`
- `src/components/map/MapPath.tsx`, `WorldNode.tsx` (new)
- `src/components/world/LessonTrail.tsx`, `BossCard.tsx` (new)

Scope: §8.1 to §8.4, M10, M11, M14 to M16, M35, M37. In detail: `applyReadingComfort`, the Home hook by mode, the Junior button labels, the warm-up label with "Langsung ke pelajaran", the world prefetch, the Pro note at the end of the map, the `</>` stamp on lesson rows and the "Siap naik ke Pro?" card.

### Package 4 — Identity and collection screens

- `src/pages/OnboardingPage.tsx`, `ProfileSelectPage.tsx`, `ProfilePage.tsx`, `StickerBookPage.tsx`, `SettingsPage.tsx`, `GlossaryPage.tsx`, `CompanionPage.tsx`

Scope: §8.7 to §8.10, §8.11 (Glossary, Companion), M31, M42, M43, M46. In detail: the two mode cards without grades or ages, auto-read on for new Petualang profiles, mode and level labels from `modeConfig.ts`, the collection by mode with the gold finish, "Teks nyaman dibaca", the missing-voice message, and `ProfilePage.tsx` reading accessories from `mascotRewards.ts`.

### Package 5 — Copydeck and content tooling

- `scripts/validate-content.ts`
- `src/content/lessonHelpers.ts` (after Package 0 has landed)
- `src/content/glossary.ts`, `stickers.ts`, `worldMeta.ts`, `badges.ts`
- `src/content/worlds/*/index.ts` (22 files)
- `src/content/worlds/*/copydeck.done` (22 new empty marker files, one per world, each owned by the writer of that world)

Scope: the companion copydeck guide. The 22 world folders are themselves disjoint, so this package splits across writers by world: 5a = `a01` to `a06`, 5b = `a07` to `a12`, 5c = `b01` to `b05`, 5d = `b06` to `b10`. One owner (5-tools) holds `validate-content.ts`, `lessonHelpers.ts`, `glossary.ts`, `stickers.ts`, `worldMeta.ts` and `badges.ts`, and lands the new validator rules (C01 to C34) as **warnings** first.

**Per-world ratchet.** When a writer finishes a world, they add the empty file `copydeck.done` in that world's folder. The validator treats the copydeck rules as errors for every world that has the marker. A finished world therefore cannot regress while the other worlds are still being written, and nobody edits a shared list. After all four writer groups have merged, the rules are errors everywhere and the markers are deleted in the integration pass.

Writers also do three things that come from the panel: move one question to sit after the card it tests (C25), add `atWork` to every lesson shown in Pro (C30), and add `icon` to sort bins that Junior sees (C29).

### Order and merge

```
P0 ──► P1 ─┐
     ├► P2 ─┤
     ├► P3 ─┼──► integration pass ──► enable check:colors and copydeck rules as errors
     ├► P4 ─┤
     └► P5 ─┘
```

Integration pass (one owner, after all merges): turn `check:colors` and the copydeck validator rules into errors for every world, delete the `copydeck.done` markers, run the definition of done, fix seams between packages.

---

## 13. Definition of done

- `npm run build` passes: content validation, contrast check, typecheck, Vite build.
- `npm test` passes, including the new `motion`, `rich`, `seen`, `readingComfort`, `lessonSession`, `readAloud` and `records` tests.
- `npm run check:colors` passes in error mode.
- Every effect in §5.4 is implemented and has been checked three ways: Junior full, Pro, and reduced motion through **both** the OS setting and the in-app setting.
- Every screen in §8 has been checked in light and dark, at 360 × 640 with 130% text scale, and at 1280 px wide.
- The PRD's five-second, squint and thumb tests (PRD §10.11) pass on Home, Map, World Detail, a lesson question and the result screen.
- Budgets in §9 hold: initial JS ≤ 180 KB gzip, fonts ≤ 83 KB, no long animation task over 50 ms at 4× CPU throttle.
- No hex literals outside the allow-list. No `backdrop-filter`. No animated `box-shadow`.
- Offline still works: no new network request at runtime, all fonts self-hosted.
- **Resume test.** Leave a lesson on the third question (close the tab), open it again: it continues on the third question with the same first-try record. The same holds after leaving on a quick check between cards.
- **Read-aloud test.** In Junior with auto-read on, every lesson step can be completed with the screen text covered: story, concept, question, each choice, hint and feedback are all spoken.
- **Reading flow test.** In both modes, no lesson in a world marked `copydeck.done` needs more than two presses of "Lanjut" in a row.
- **Colour-blindness test.** A wrong answer on `sort`, `order`, `match`, `fill`, `spotbug` and `type` is checked with Chrome DevTools vision emulation (deuteranopia and protanopia) and with "Kurangi animasi" on. Wrong and right parts are still told apart.
- **No clock in Junior.** No timer, countdown or time-triggered nudge appears in a Junior session.
- **Child five-second test.** Before release, three children aged 8 to 11 each see the Junior Home for five seconds and are asked what they would press. All three name the primary button. This is a release check owned by the product owner, not by a package.

---

## 14. Risks and mitigations

| Risk | Mitigation |
|---|---|
| "Playful" drifts into noise and breaks the clarity rules | Hard caps in the spec: one poster, two doodles, one mascot per screen. No ambient loops. Squint test in the definition of done |
| Celebrations feel slow on the tenth lesson | Every sequence is skippable. Pro is 0.7× and inline. The "start here" doodle retires after three lessons |
| Low-end devices drop frames | Tier `lite` chosen automatically. Transform and opacity only. Particle caps. No blur |
| Parallel packages collide | File ownership is exact. Cross-package needs go through the Package 0 contract and prop stubs |
| Poster colour fails contrast in some world | Numbers verified against the real CSS for all 22 worlds. The checker is extended. Text on posters is always full-opacity `--on-poster` |
| Handwriting font hurts readability | Annotations only, five words at most, never required content, 18 px minimum, plain-text twin for assistive technology |
| Patrick Hand cannot be fetched in the build environment | The stack falls back to Plus Jakarta Sans 600. The design does not depend on the glyph shapes |
| The warmer palette changes existing illustrations | Illustrations move to `--illus-*` tokens in Package 1 and are reviewed in both themes |
| The panel's additions grow the scope | Each addition was sized to existing data and existing files: no store change, no new art, three optional schema fields. Larger wishes are deferred by name in §15.3 |
| A quick check asks about a card the learner has not seen yet | Writers place each moved question after the card it tests. Validator rule C25 and the reading flow test cover the order. Untouched worlds keep the old order |
| Read-aloud is weak or missing on some Android phones | Sentence-level chaining with the existing engine, no dependence on word-boundary events. Settings explains a missing voice. Text is always on screen as well |
| "Petualang" and "Junior" both appear during the transition | Every label comes from `modeConfig.ts`. The id stays `junior`. The Companion page says "Mode Petualang (Junior)" once |
| The Junior "Tantangan Kode" shows Pro text to a child | Shown only after three stars, optional, with no score and no penalty. The copydeck asks writers to keep those Pro questions short |

---

## 15. Judge panel decisions

On 2026-11-23 five persona judges reviewed this spec and the copydeck guide. This section records what they scored, how conflicts between them were settled, and the decision on every issue. Accepted and adapted changes are already written into the sections named in the "Reason" column and into the copydeck guide.

Scores before the revision (each out of 10):

| Persona | Playfulness | Cognitive stimulation | Clarity | Age fit | Copy readability | Average |
|---|---|---|---|---|---|---|
| Naya, 8, grade 3, beginning reader | 6 | 5 | 6 | 3 | 4 | 4.8 |
| Raka, 11, grade 6, gamer | 6 | 5 | 7 | 5 | 7 | 6.0 |
| Dimas, 14, grade 8, uses Pro | 4 | 5 | 7 | 4 | 6 | 5.2 |
| Sari, 27, career changer, uses Pro on a commute | 6 | 5 | 6 | 4 | 5 | 5.2 |
| Bu Wulan, 38, primary-school teacher | 7 | 5 | 6 | 6 | 5 | 5.8 |
| All five | 5.8 | 5.0 | 6.4 | 4.4 | 5.4 | 5.4 |

Age fit (4.4) and cognitive stimulation (5.0) were the lowest. Most accepted changes target those two.

### 15.1 How conflicts were settled

Conflicts are settled by the Junior/Pro split or by a rule that both sides can live with. They are never averaged.

| Conflict | Settlement |
|---|---|
| Naya wants more character, sound and stickers. Dimas and Sari want nothing childish | Split. Tappable Bito, new sounds and "Buku Stiker" are Junior only. Pro gets its own editor look and "Koleksi Konsep". Neither mode is toned towards the other |
| Raka wants real code to feel skilled. Naya cannot read code at all | The required Junior quiz stays code-free. "Tantangan Kode" is optional and appears only after a three-star result |
| Raka and Dimas want timers and records. Bu Wulan says timers punish slow readers | Split. Junior has no clock at all. Pro gets a personal record and an optional stopwatch. Both modes get the combo chip, which has no clock and no penalty |
| Dimas wants Pro loud (terminal, HUD, dark by default). Sari likes Pro calm | Pro keeps strong feedback and gains the editor look, and drops only the cute layer. The theme default stays with the device |
| Dimas wants code first. Sari is frightened by a wall of code | One plain sentence, then the code. At most two reading cards before something to do, in both modes |
| Raka and Dimas want no age labels (pride). Naya and Sari want to know the mode is for them | Mode cards describe a style and say who is welcome ("boleh ditemani", "untuk remaja dan dewasa", "mulai dari nol") without a grade or an age number |
| Dimas wants peer language. Bu Wulan wants standard Indonesian | Standard words that are short and familiar in both modes. Peer voice in Pro comes from directness, not slang. Colloquial words only inside quoted speech |
| Raka wants a visible next reward on Home. Bu Wulan wants fewer things on the Junior Home | The Junior Home shows one hook, the quest line to the Guardian. The next reward is named on the level-up overlay and on Profile |
| Raka wants a concrete "replay for three stars" target. Bu Wulan wants less push to replay | The copy states the concrete target. The action itself is a small text link in Junior |

### 15.2 Decisions

| Persona | Issue | Decision | Reason |
|---|---|---|---|
| Naya | Read-aloud for beginning readers (blocker) | Adapt | She quits at the wall of text, not at the idea. "Dengar" now reads choices, hints and feedback and auto-read is on for new Petualang profiles (§8.5). Highlight is per sentence, not per word, because Android voices do not report word boundaries reliably |
| Naya | Target age and onboarding (blocker) | Adapt | Grade labels are gone, the card says "boleh ditemani kakak atau orang tua", and the result has a companion line (§8.7, §8.5). A third text tier for ages 7 to 8 is rejected: it would mean a third version of 445 questions, and read-aloud serves that child better |
| Naya | Word list still leaks (server, API, status numbers, "paket data") | Accept | Writers copy the examples. Core web words are now gated by introduction, status numbers need the lesson's own analogy, and the leaking examples are fixed (copydeck §3.2, §9.1, §10) |
| Naya | Today's Junior quiz in b01 (dangling prompts, heavy words) | Accept | A prompt ending in "…" does not tell a child what is asked. New rule C18, new words in §9.2 and a rewritten example |
| Naya | Dual coding on answer choices | Adapt | Optional `icon` from a fixed list of 40 lucide icons, required only on Junior sort bins (§8.5, C29). No custom illustrations: this pass has no art production |
| Naya | Fun: sounds, animals, touchable things | Adapt | Tappable Bito (M47) and two synthesised sounds are accepted because the child triggers them. Animal guardians are rejected: no new art, and Bito stays the only character |
| Naya | Lesson length and fatigue | Adapt | At most two reading cards in a row, a halfway note (M50), "Belajar" instead of "Konsep", and `estMinutes` at a beginner's pace (C34). Two concept cards and four to five questions are guidance with a warning (C32), not a hard cut, because some lessons need the third idea |
| Naya | Batas Analogi card | Adapt | Junior kicker "Mirip, tetapi berbeda" and a difference of at most 10 words. No spot-the-difference pictures (no new art). `limit` questions stay in Junior only for the eleven risky analogies, asked in positive form |
| Naya | All-caps kickers and game jargon | Accept | Junior kickers are sentence case, "poin" and "Level" replace "XP" and "Lv", world codes are hidden, buttons have at most four words (§7, §8.2). "Poin", not "bintang", because stars already rate a lesson |
| Naya | Hint nudge and one-star copy | Accept | The nudge is no longer timed (M25) and the one-star result is rewritten and gets Bito's cheer and the sticker sound (§5.6) |
| Raka | Five reading cards before the first question (blocker) | Adapt | The player follows authored order and the validator forbids more than two reading cards in a row (§8.5, C25). A separate "Tebak dulu" card is rejected: it needs 113 new prompts, and the story's closing question plus the world pre-test do the same job |
| Raka | Code is banned from the Junior quiz | Adapt | The required quiz stays code-free (PRD §8.1, and Naya). The optional "Tantangan Kode" after three stars reuses an existing Pro question. It gives a stamp, not XP, because scoring is frozen |
| Raka | The notebook look reads as school | Adapt | The Junior Home poster now shows the quest line to the Guardian (§8.2). The direction and its name stay: "Buku Saku" is an internal name and never appears in the UI |
| Raka | Rewards cannot be shown off, no mid-term goal | Adapt | Gold finish for three-star stickers (deterministic, §4.8) and the next reward named at level-up. Renaming to "Koleksi Kartu" in Junior is rejected: younger children like stickers, and Pro already gets "Koleksi Konsep" |
| Raka | No momentum inside a session | Adapt | The combo chip (M48) is accepted for both modes. "Mode Kilat" is Pro only as a stopwatch (§8.11): Junior has no clock |
| Raka | Copydeck examples 8 and 9 are still confusing | Accept | Both are rewritten with a clear subject, and §6.1 now says a question must be answerable from the choices without free interpretation |
| Raka | a04 content shows why rules must bite early | Accept | Per-world ratchet: a `copydeck.done` marker turns the rules into errors for that world at once (§12). The a04 fix is a new copydeck example |
| Raka | Mode names and onboarding | Accept | Junior is shown as "Petualang", cards describe style, and "Siap naik ke Pro?" makes moving up an achievement (§8.7, §8.4) |
| Raka | Boss screen has no drama | Adapt | The shield pips now read as the guardian's shield and the guardian reacts to hits (M39), and a miss shows the concrete gap. A separate HP bar and a mini-quiz of missed questions are rejected: they duplicate the pips and add a new flow for a minor issue |
| Raka | Result copy and the Home button | Accept | Concrete targets replace consolation, and the warm-up button is short and explains itself (§5.6, §8.2) |
| Dimas | Pro is only "Junior minus" (blocker) | Adapt | Pro gets its own identity: editor look, mono digits, prompt glyph, level toast, full-weight feedback, and the tier no longer drops to `lite` because of the mode (§7, §5.2). Dark by default is rejected: the device setting is the right default, and Sari reads in daylight on a train |
| Dimas | No hands-on code early (blocker) | Adapt | At most two reading cards before something to do, a core sentence then code on concept cards, and simulators no later than third (§8.5). A live code editor and a simulator redesign are deferred (§15.3): they need sandboxing and a bundle budget of their own. "Lewati cerita" is rejected: a Pro story is one or two sentences and "Lanjut" already skips it |
| Dimas | Silly distractors and rote acronym questions | Accept | Rule C28 forbids acronym-expansion questions, and the copydeck gains Pro examples from b01 |
| Dimas | Preachy tone | Accept | New "Suara Pro": direct, no comments on how learning works. Pro result copy states numbers, the pre-test note and the objective label change (§7, copydeck §2) |
| Dimas | Sticker vocabulary in Pro | Accept | Pro shows "Koleksi Konsep" with upright cards. The word "stiker" never appears in Pro (§4.8, §8.9) |
| Dimas | No challenge in Pro | Adapt | Personal record and the stopwatch review are accepted (§8.5, §8.11). "Soal Bos Mini" is deferred: it needs a new difficulty-3 question for each of 113 lessons |
| Dimas | Forced warm-up of 10 cards | Accept | Capped at 5 in Pro and 3 in Junior, with "Langsung ke pelajaran" (§8.2, §8.11) |
| Dimas | Dangling prompts and longest-is-correct in Pro | Accept | The direct-question rule now covers Pro (C18) and a per-world check flags the longest choice being correct in over 30% of questions (C26) |
| Dimas | Terms used in answers before being taught | Adapt | Rule C24 flags glossary terms in choices that no earlier lesson lists. Requiring every answer term in `introducesTerms` is rejected: it collides with the cap of three new terms. "Composite API" is in fact taught on a concept card of that same b01 lesson, so that question stands |
| Dimas | The Pro card in onboarding looks dull | Accept | The Pro card shows coloured code with its result and says "mulai dari nol" (§8.7) |
| Sari | Quiz progress is lost on leaving (blocker) | Accept | A commute ends sessions, the learner does not. Quiz state is saved in its own `localStorage` key, so the store stays untouched, with a resume test in §13 (§8.5) |
| Sari | Pro rules ignore adult beginners | Accept | The copydeck gains a Pro reader section, a heavy-word list for Pro and the rule that a recap can be repeated to a colleague |
| Sari | The validator barely checks Pro | Accept | New rules C20 to C23 check heavy words, term density, first-use meaning and glossary entries for Pro |
| Sari | No link to real work | Adapt | Optional `atWork` on lessons, required for Pro by C30, shown on the result. The Pro Home hook is "Setelah ini kamu bisa". Placeholder "coming soon" worlds are rejected in favour of one honest note at the end of the Pro map (§8.3) |
| Sari | Pro concept card opens on a wall of code on a phone | Accept | Under 640 px: title, one sentence, code, rest. Pro concept bodies with code are capped at 60 words (§8.5) |
| Sari | Offline and weak signal | Adapt | Home prefetches the active and next world, and the error names the cause and retries in place (§8.2, §8.5). A service worker stays in PRD v1.1: `vite.config.ts` is frozen and it deserves its own test pass |
| Sari | Warm-up does not fit a commute | Accept | Same change as Dimas: 5 cards at most, a skip link, and the poster time includes the warm-up |
| Sari | Acronyms and pronunciation in Pro | Accept | Meaning in Indonesian first, the English expansion after. Pro terms now need `pronunciation` and `shortDef.pro` (C23) |
| Sari | Age framing and the `//` skin | Accept | The Pro card names no age, the collection is "Koleksi Konsep", and one sentence explains `//` so the skin teaches something (§8.7) |
| Sari | Too few Pro examples | Accept | Pro examples from b02 are added, and all writers read the Pro text aloud as well |
| Bu Wulan | Read-aloud skips choices, hints and feedback (blocker) | Accept | Same change as Naya. Settings now explains a missing voice instead of hiding the option (§8.5, §8.10) |
| Bu Wulan | Rewards compete with the learning moment | Accept | XP flies only after "Lanjut" (M22), the result offers "Selesai untuk hari ini", the break dialog leads with rest, Junior shows no consecutive-weeks count, and "Ulangi" is a small link in Junior (§5.6, §8.2) |
| Bu Wulan | The copydeck teaches colloquial words | Adapt | Standard words that are short and familiar: "tetapi", "hanya", "mengapa". Colloquial words only in quoted speech (C19). "Kalau" stays because it is standard |
| Bu Wulan | The "after" examples break the guide's own rules | Accept | Examples 1, 2, 5, 7, 8 and 9 are rewritten before any writer package starts |
| Bu Wulan | Typography and motion for dyslexic readers | Accept | `.pw-prompt` without negative tracking, sentence-case kickers in Junior and the "Teks nyaman dibaca" setting (§4.4, §8.10) |
| Bu Wulan | Wrong states rely on green versus amber | Accept | Every judged part has an icon and text, wrong is dashed, and §13 adds a colour-blindness test (§5.5) |
| Bu Wulan | The 12-second hint nudge punishes slow readers | Accept | No timer. The offer appears when a missed question comes back and it does not move (M25) |
| Bu Wulan | "Hampir!" for every wrong answer is false praise | Accept | "Belum pas" by default. "Hampir!" only at 70% partial credit (§5.5) |
| Bu Wulan | Junior Home is overloaded and full of jargon | Adapt | No XP number, no world code and one hook on the Junior Home (§8.2). The five-second test with three real children is a release check in §13, owned by the product owner |
| Bu Wulan | The validator cannot catch tone and sense | Adapt | Every world is read aloud by a non-technical adult. A trial with two children is required for one world per writer group, not all 22, to keep the schedule. Sarcasm and long-affix words get warnings (C31, C33) |

Totals: 29 accepted, 21 adapted, 0 rejected outright. Every adapted row names the part that was turned down and why.

### 15.3 Deferred work

These were asked for and are not in this pass. Each needs its own spec.

| Item | Asked by | Why it waits |
|---|---|---|
| Live code editor in Pro lessons ("Coba Dulu") | Dimas | Needs a sandboxed preview, a security review and its own bundle budget |
| A simulator redesigned as the centre of a lesson | Dimas | New interaction design per simulator. This pass only re-tokenises them |
| "Soal Bos Mini": a difficulty-3 bonus question per Pro lesson | Dimas | Needs 113 new questions. Planned with the new Pro lessons (copydeck §14) |
| Service worker and full offline use | Sari | PRD v1.1. `vite.config.ts` is frozen in this pass |
| New Pro worlds: DevTools, npm and Vite, testing, deploy | Sari | New lessons, written after the copydeck rewrite (copydeck §14) |
| Animal guardians and other new characters | Naya | Needs illustration work that this project does not have |
| A text tier for readers aged 7 to 8 | Naya | A third version of every text. Read-aloud and the companion line cover this group for now |

---

## 16. Layout QA blockers (reported by the product owner, 2026-11-23)

These are **blockers**: every UI judge round must treat them as accepted issues, and no round may be declared done while any remains. The screenshot harness now runs an automatic layout check on every route and writes `layout-<mode>-<theme>-<width>.json` next to the PNGs. Any `overlap`, `text-clipped`, `clipped-by-ancestor`, `off-viewport-right` or `page-horizontal-overflow` entry there is a blocker too.

1. **World sticker escapes its poster.** The die-cut world sticker (`Pulau …` SVG) on the world poster sits partly outside the poster and covers other content. On `/peta/:jalur` it covers the "Jalur A / Jalur B" toggle above the poster. On `/beranda`, `/dunia/:id` and the desktop map side panel it covers the poster title (h1/h2) and the description. Measured overlaps run from 105×28 to 145×34 px, at both 390 px and 1280 px. **Fix:** reserve space for the sticker inside the poster with padding or a grid column, so the title and body wrap beside or below it. Small decorative offsets are fine, but the sticker must never overlap text or controls outside the poster.
2. **Badges and cards clipped on the Koleksi/Stiker page.** The "baru!" / `// baru` badge (`absolute -right-1 -top-2` in `StickerBookPage.tsx`) pokes outside the card, so a scrolling or overflow-clipped row cuts it. In the same row the next card is cut at the right edge with no affordance. **Fix:** keep the badge inside the card's padding box, or give the row enough padding that nothing is clipped. Horizontal rows need a visible peek or scroll affordance, otherwise switch to a wrapping grid.
3. **Awkward wraps.** The Junior Home poster title "Tebak-tebakan Awal: Kota Web" breaks after "Tebak-" at display size; use a smaller display step for long titles or `text-wrap: balance`. The Pro Home kicker "LANJUTKAN · DUNIA A01 · KOTA WEB" wraps onto a second line; shorten it or allow a single-line truncation. The map node note "// kamu di sini" wraps into two mono lines; keep it to one line.
4. **Empty band in the Pro Home poster.** At 390 px, dark mode, there is a large empty vertical gap between the title and the `// mulai di sini` annotation. Collapse it.

---

## 17. UI judge round 1 decisions (2026-11-23)

Round 1 was judged almost blind: the `after-r1` capture is blank on every route except Pro `/mulai`, and every `layout-*.json` is empty. The cause is **not confirmed**. Nobody recorded console output, the capture script is not in the repo, and the dev server on port 5199 was no longer running when the decision was made. The white (not cream) background means no CSS was applied at all, which points at the capture or at a module failing to load, and not at entrance animations caught at opacity 0. Round 2 does not start until one real Junior `/beranda` shot exists.

Conflicts between personas are settled by the Junior/Pro split. "Rejected" means it breaks an anti-goal (§2), the frequency rules (§5.9.1) or a decision already taken in §15.

| # | Raised by | Issue | Decision | What happens |
|---|---|---|---|---|
| 1 | All five personas | `after-r1` shots blank, layout JSON empty | **Accept (blocker)** | Harness: record console errors and page exceptions, wait for a child of `#root` and `document.fonts.ready`, emulate reduced motion, run the runs one at a time, fail any PNG under 10 KB. `App.tsx` gets a top-level error boundary with a calm Bito fallback, so a crash is never a white page. Then re-shoot |
| 2 | Dimas, Sari | No Pro dark shots, Pro `/stiker` missing | Accept | `pro-dark-390` joins the capture matrix |
| 3 | Naya | First Junior quiz asks about DNS and the HTTPS padlock | Adapt | Right, but it is content. Goes to the copydeck track (`a01-kota-web/index.ts`): Junior anchors use the restaurant analogy, DNS and HTTPS stay in Pro. No UI package owns it |
| 4 | Naya, Raka, Sari, Bu Wulan | "// Made with ♥ by ahmadaqib": English, code styling, external link on child screens | Accept | Not rendered in Junior or when there is no profile (onboarding, profile select). Pro keeps it in Indonesian, "Dibuat dengan ♥ oleh ahmadaqib". Settings gets an "Tentang" line, plain text in Junior, link in Pro |
| 5 | Naya, Raka | "Lv 2 · 240 XP", "DUNIA A01", all-caps kicker on Junior Home | Accept (already in §8.2 and §4.4) | Verify on the new build: no XP number and no world code in Junior, kicker in sentence case. Pro keeps both |
| 6 | Raka | No "XP left to next level" | Adapt | Pro only: "60 XP lagi ke Lv 3" beside the bar. Junior shows no XP number (§8.2) |
| 7 | Raka | Week dots as a flame or streak | **Reject** | Daily streak and loss aversion are anti-goals |
| 8 | Naya, Raka | "0/53 stiker" reads as losing. Wants a sticker strip at the top | Adapt | Junior tile names the next sticker instead of the count. No new strip: Junior Home keeps one hook (§15.2) |
| 9 | Raka | Bottom cards cut by the bottom nav | Accept | Page bottom padding equals nav height plus the safe area |
| 10 | Raka, Dimas, Sari | Hero says "Tebak-tebakan Awal" twice, sounds childish or like an exam | Adapt | Names stay as specified ("Tebak-tebakan Awal" Junior, "Cek Titik Awal" Pro). Title becomes the world name only, the pre-test name moves to the kicker. This also fixes the §16.3 wrap. "Gas!" and "Tes cepat: seberapa jago kamu?" rejected: slang dates, and the second one grades the learner |
| 11 | Sari | Pro still says "Buku Stiker", "Dunia A01" | Accept | Pro strings on Home are checked against the copydeck. Playful names are Junior only |
| 12 | Dimas | "Pelajar" under the name, cliché tagline | Adapt (minor) | Pro shows the level title in place of "Pelajar" and the weekly-target line in place of the tagline. No streak wording |
| 13 | Naya, Raka, Dimas, Sari | Lesson question screen is empty and plain | Adapt | Label becomes "Ingat lagi!" (Junior) and "Pemanasan" (Pro). The question block sits in the optical centre, not at the top. Pictures on choices and tap-on-picture questions need schema and content: deferred with §15.3 |
| 14 | Naya, Raka | Bito reacting beside every question | **Reject** | Frequent mascot motion is the noise §5.9.1 removes |
| 15 | Raka | Timer on questions | **Reject** | No countdowns in Junior. The combo chip he asks for is M48 already |
| 16 | Raka, Naya | "Frontend/Backend" jargon without a hint, prompts too long | Adapt | Content. Copydeck track: teach the word before asking, Junior prompts short. Auto read-aloud is already on for Junior (§8.7) |
| 17 | Dimas | Disabled "Periksa" should keep its colour | Reject | A disabled button must look disabled |
| 18 | Sari | Hint button has no label | Accept | "Petunjuk" is a visible label beside "Periksa" (§8.5) |
| 19 | Sari | "Di dunia kerja:" context line | Defer | Pro content, with the new Pro lessons |
| 20 | All five | Onboarding step dots off-centre and unlabelled, about 60% empty | Accept | Step path centred with one text line under it ("Langkah 1 dari 3 · Kenalan"). Bito, heading and line grouped in the optical centre |
| 21 | Dimas, Sari, Raka | Opening needs a Pro promise, smaller Bito, "Gas, mulai" | Adapt | The mode is not chosen until step 3, so step 1 cannot split. The spec line under the heading stays and now shows at once (row 23). "Bikin website dalam 10 menit" rejected: a promise the app does not keep |
| 22 | Naya | Animal friend for Bito | Defer | Already in §15.3 |
| 23 | Dimas, Sari, Bu Wulan | Content starts at opacity 0 and waits on a delay (onboarding subtitle 700 ms) | Adapt | Keyframes already rest in the visible state. New rule: on a first screen, text needed to proceed starts within 200 ms and the primary button never waits. Result sequences (§5.6) are exempt: they are rare and skippable |
| 24 | Sari | "Untuk remaja dan dewasa" lumps her with teenagers | Adapt (minor) | First Pro line becomes "Istilah dan kode yang dipakai di dunia kerja". The rest stays |
| 25 | Dimas | "pintar sebanyak apa" | No change | The string is not in `OnboardingPage.tsx` |
| 26 | Raka | Motion tier may default to off | No change | Checked: `prefs.ts` gives `full` or the device tier unless reduced motion is set. No GIF capture, to keep judging cheap |
| 27 | Bu Wulan, Sari | Boil and handwriting hurt reading | Adapt | Boil stays Junior only and is off under "Teks nyaman dibaca" (§4.4). It is verified that Pro never boils. Turning it off by default in Junior is rejected: it is the Junior signature and it rests after three cycles |
| 28 | Motion critic | Boil on every lesson result | Accept | Boil only on a three-star result. Other results get plain kinetic text |
| 29 | Bu Wulan | Loader loops with no text | Accept (minor) | After 3 s the loader shows "Sebentar ya, sedang menyiapkan…" and the bob stops |
| 30 | Motion critic | Reduced motion zeroes colour and opacity transitions too | Adapt | §5.3 amended: `.pw-t-colors` and `.pw-t-opacity` keep 120 ms under both triggers. Movement stays off |
| 31 | Motion critic | Reorder bump restarts on every arrow press | Accept | Deleted. The rows already swap and focus follows |
| 32 | Motion critic | FeedbackSheet waits 120 ms, then 280 ms | Accept | No delay, 240 ms, `--ease-drawer`. Replaces the 280 ms in §5.9.3 |
| 33 | Motion critic | Bito reacts in the FeedbackSheet on every answer | No change | Already `react={false}` there |
| 34 | Motion critic | Correct-answer pop overshoots twice | Accept | Keyframe peak stays, easing becomes `--ease-out` |
| 35 | Motion critic | Tailwind default easing on simulator moves and the ReviewBox knob | Accept | `.pw-t-move` or `ease-[var(--ease-out)]` |
| 36 | Motion critic | Flip 360 ms unscaled, fill 320 ms, backdrop uses `ease`, think dots from `scale(.6)` | Accept | Flip `calc(280ms * var(--motion-scale))`, fill 240 ms scaled, backdrop `--ease-out`, dots from `scale(.9)` with 80 ms stagger |
| 37 | Motion critic | Motion files are untracked, so `git diff main` misses them | Note | Reviews must list untracked files. Staging is left to the owner |
| 38 | Bu Wulan | Keep Home calm: one CTA, one new decoration | Accept | Checked side by side in round 2 |

Totals: 38 rows. 16 accepted, 12 adapted, 4 rejected, 2 deferred, 3 no change, 1 note. Open blocker: row 1.
