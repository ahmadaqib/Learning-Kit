# Decision guide for judge-panel triage

**Who this is for:** the agent acting as **decision maker** after an Opus judge panel. It replaces the free-form reasoning a Fable decider used to do: apply these rules in order, then write instructions an executor can follow without guessing. Effort: medium. Read only the parts of the inputs you need.

## 1. Order of authority (higher wins)

1. **Correctness.** Facts, code that runs, meaning preserved, answers still correct.
2. **Hard rules.** Accessibility (WCAG 2.1 AA, 44 px targets, reduced motion). The anti-goals in `2026-11-22-playful-redesign-design.md` §2. Performance budgets (§9).
3. **Decisions already taken.** §15 and §17 of the design spec, and the rules in `2026-11-22-copydeck-guide.md`. Do not reopen a decision without new evidence.
4. **Layout-detector findings and product-owner blockers** (§16). These are blockers unless you show from the code that a finding is a false positive.
5. **Persona taste.** Lowest priority.

## 2. Verdict for each issue

| Verdict | When |
|---|---|
| **Accept** | Concrete and correct, it fits rules 1–3, and the fix is inside an owned file |
| **Adapt** | The problem is real but the suggested fix breaks a rule. Fix it a different way and say why |
| **Reject** | It breaks an anti-goal, contradicts §15/§17 or the copydeck, is vague, or is taste only with no learning benefit |
| **Defer** | Valid, but it needs new data, a new dependency, schema or store changes, or files nobody owns. List it, don't plan it |

Quick reject list: daily streaks, loss aversion, random rewards, red or shaking wrong-answer states, countdowns in Junior, confetti on ordinary clicks, decoration behind text, ambient motion loops, slang, new mascots, anything that delays input.

## 3. Persona conflicts

Settle a conflict with the **Junior/Pro split**, never by averaging. Junior (ages 9–12, plus a parent or teacher companion) gets read-aloud, no code in required quizzes, and no clocks. Pro (teenagers and adults) gets a work-style voice, code, and optional records. If a split doesn't fit, pick the rule both sides can live with, the way §15.1 does.

## 4. Copy decisions

- Junior: ≤ 12 words per sentence, everyday words, a hint on every question, no code in quiz questions.
- Pro: ≤ 20 words per sentence, explain jargon the first time it appears, and an `atWork` line.
- Explanations must say **why**, not just "correct".
- Answer choices are about the same length, and none gives the answer away.
- Keep every id, answer and piece of structure. When you change a question's meaning, check that the marked answer is still right.
- If a fix needs a new question, give it a new unique id and the same lesson, and say why.

## 5. UI decisions

- Frequent actions stay quiet and fast: ease-out, ≤ 300 ms, transform and opacity only. Only rare milestones may celebrate.
- No overlap with text or controls, no clipped text, no page horizontal scroll at 390, 768 or 1280 px.
- Tokens only (no hard-coded hex), and dark mode must be correct.

## 6. Output contract

- **Instructions must be self-contained.** Give `file → id or line → exact new text or exact change`. The executor must not need to read the judge output.
- Group fixes so that each batch owns a **disjoint** set of files.
- Record the verdicts as a short table in the spec named in your prompt: `# | source | issue | verdict | reason`, with a one-line reason per row.
- Report counts: accepted, adapted, rejected, deferred.
- Set `done: true` only when no accepted blocker or major issue is left open.
