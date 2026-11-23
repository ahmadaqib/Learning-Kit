# Practice, reflection and optional Pro workshops

## Scope and access

Keep the 22 worlds and their existing main paths. Seven optional Pro side quests extend Pabrik JS (arrays and objects, handling errors), Menara Alat (npm and Vite, browser DevTools, testing, deployment), and Dapur Frontend (React components, props and state). Existing side-quest unlock rules govern access. Filtering must apply to direct lesson URLs, review sessions and world menus. Adding required lessons would move the finish line for returning learners. A new world would add a guardian and change progression for a small group of advanced activities.

Each lesson starts with a problem at work, explains one mechanism, then asks the learner to use it. Provide six or more questions, an individual hint for each, two review cards, a concrete work application and no more than two consecutive reading cards. Use the existing question, code and simulator surfaces. Run the content validator against real world bundles and verify that the metadata used in navigation matches those bundles.

## Practice contract

| Moment | Petualang | Pro | State and accessibility |
| --- | --- | --- | --- |
| Recall at entry | One previous-lesson question, labelled Ingat-ingat | One previous-lesson question, labelled Pemanasan | Resolve the authored warmupFrom in the learner’s mode. Omit if unavailable. Read-aloud and the normal question controls remain available. Practice answers do not affect scoring or the mistake record. |
| Prediction | Tebak dulu! with a familiar, mode-visible choice and an option to pass | Predict an outcome before the first concept | Draw a suitable question from this lesson’s review cards, with a visible explanation after the prediction. Keep this interaction outside the scored queue and the numeric resume timeline. Completing or skipping it returns to the same concept. |
| Interleaved review | Up to five due cards | Up to ten due cards | Filter mode and availability before applying the limit. Start with the oldest due eligible card, alternate lesson topics when possible, keep due order within topics. The usual Leitner schedule and review UI handle each card. |
| Reflection at completion | Choose a labelled picture to say what to do with the lesson | Write one short takeaway | Optional inline control on the result. Save locally by profile, lesson and mode. Use native buttons or textarea, accessible labels and status. Completion and navigation work without a reflection. |
| Focus | Keep the exit, progress and read-aloud reachable | Same, quiet feedback for sustained practice | The lesson route already hides global navigation. Add a labelled focus toggle that also suppresses decorative movement and reward effects during practice. Remember the preference per profile apart from progress. System and in-app reduced motion continue to apply in either setting. |
| Small surprises | Offer one of several brief picture-based recall invitations | Offer a brief transferable challenge | Vary the reflection invitation deterministically with the lesson. In one of the three variants, offer a second review question as a cue with a keyboard-accessible answer reveal. No random payout, timer, audio, overlay or extra animation. |
| Rest | A short invitation to stop and a plain sentence about how sleep helps memory | Explain the same idea in adult language | Use the existing result stopping point. No interruption or penalty for continuing. |

## Reference checks and limits

Checked on 2026-11-23. Exact captions and short-clip timecodes remain unverified. The chapter and interview timecodes below refer to the linked recordings.

- **Lila Landowski, TEDxHobart (`kKvK2foOTJM`).** Landowski links to the original talk from her own site and published three segments on sleep, repetition, and breaks. These establish the topics. The timing and wording of the app's stopping message are product choices. [Speaker’s site](https://lilalandowski.com/about/) · [Sleep segment](https://www.youtube.com/watch?v=Oh4VfvYgIF0) · [Repetition segment](https://www.youtube.com/watch?v=U8DZrSWPAeU) · [Breaks segment](https://www.youtube.com/watch?v=eEeJW6dGeAE)
- **Cal Newport and Andrew Huberman (`mzexJPoXBCM`).** Huberman Lab labels the excerpt as active recall. In the full episode's chapter starting at 24:57, Huberman describes trying to remember information before reopening the source to check it. The one-question recall warm-up applies that sequence. [Publisher’s clip](https://www.youtube.com/watch?v=mzexJPoXBCM) · [Full episode transcript and chapters](https://www.hubermanlab.com/episode/dr-cal-newport-how-to-enhance-focus-and-improve-productivity)
- **Nancy Chiaravalloti, TEDxHerndon (`JbLAGpQ9RXg`).** Kessler Foundation confirms the TEDx title and event. In a separate 2019 Kessler interview, Chiaravalloti explains imagery and story context at 35:32, then discusses self-testing and spaced learning at 37:44. These are interview timecodes. The talk's wording and timestamps remain unverified. [TEDx recording](https://www.youtube.com/watch?v=JbLAGpQ9RXg) · [Kessler newsletter](https://kesslerfoundation.org/sites/default/files/2019-07/KF_2016_Winter_TBINewsletter_Vol7_No2_WEB_1.pdf) · [Kessler interview transcript, pp. 12–13](https://kesslerfoundation.org/sites/default/files/2019-08/Nancy-chiaravalloti-on-improving-memory_expert-interview-series-FINAL-Transcript.pdf#page=12)
- **Chris Bailey, TEDxManchester (`Hu4Yvq-g7_Y`).** Bailey embeds the matching video and identifies reducing stimulation as a focus topic. The in-app focus switch is a design inference. [Speaker’s summary and recording](https://chrisbailey.com/my-new-tedx-talk-how-to-get-your-brain-to-focus/)

### Experimental evidence

- **Sleep.** Ellenbogen et al. (2006) reported that sleep protected newly learned word associations from subsequent interference. Later experiments had mixed results on the same mechanism. The app offers a brief reminder that sleep can help memory and leaves break timing to the learner. [Original experiment](https://doi.org/10.1016/j.cub.2006.05.024) · [Pöhlchen et al., 2021](https://doi.org/10.1111/jsr.13042) · [2023 replication and discussion](https://doi.org/10.3758/s13423-023-02264-8)
- **Pretesting.** Richland, Kornell, and Kao (2009) found better posttest performance on concepts that participants had tried and failed to recall before reading a prose passage. The optional prediction adapts the approach to a short web lesson. [Primary paper](https://web.williams.edu/Psychology/Faculty/Kornell/Publications/Richland.Kornell.Kao.2009.pdf)
- **Interleaving.** Rohrer et al. (2020) found a delayed-test advantage for mixed math assignments in a randomized trial of 54 seventh-grade classes. Matlen et al. (2026) found a smaller advantage in their preliminary replication across two cohorts. Alternating topics in the review queue is an application of these findings. The effect on web-development learning in this app has yet to be measured. [Classroom trial](https://doi.org/10.1037/edu0000367) · [Preliminary replication](https://escholarship.org/uc/item/9429f5h9)

## Five-persona design review

Scenario walkthroughs against the existing persona descriptions, without learner interviews.

| Source | Issue | Verdict | Implementation decision |
| --- | --- | --- | --- |
| Naya, early reader | A prediction can feel like a test on a concept she has never met | Adapt | Offer a skip, explain the outcome in Junior language and award zero XP either way. |
| Raka, age 11 | A varied discovery loses its appeal if every completion triggers another celebration | Adapt | Vary a quiet, optional recall prompt with the lesson. |
| Dimas, teenage coder | A definition quiz gives little practice with actual code | Accept | Use executable examples and tasks about outputs, state updates and diagnosis in the Pro workshops. |
| Sari, adult learner | A mandatory journal or extra world blocks the next work task | Accept | Save the optional reflection locally and expose workshops through existing side quests. |
| Bu Wulan, teacher | Revisiting a Pro-only topic after switching to Junior could expose untaught material | Accept | Filter review cards and parent lessons before selecting a session. |

Three accepted, two adapted, zero rejected or deferred. Verify scoring isolation, old snapshots, mixed review pools, mode boundaries and local reflection before the final layout and build pass.
