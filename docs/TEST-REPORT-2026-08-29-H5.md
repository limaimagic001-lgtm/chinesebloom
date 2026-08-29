# ChineseBloom free lesson H5 optimization test report — 2026-08-29

## Scope

- Compact free-lesson header and summary card on small screens.
- Reflow all four training rounds for mobile.
- Reduce oversized headings, cards, controls, and navigation.
- Remove landing-only bottom whitespace from the free lesson.
- Preserve desktop styling and all lesson behavior.

## Automated results

| Test | Result |
|---|---|
| ESLint | PASS |
| Next.js production build | PASS |
| TypeScript validation | PASS |
| Existing regression tests | PASS — 8/8 |
| New compact-H5 source test | PASS |
| Total Node tests | PASS — 9/9 |

## Mobile layout cases

| Case | Expected | Result |
|---|---|---|
| Course summary | Reduced padding, hidden repeated description, compact progress | PASS — source verified |
| Four-step navigation | Four equal compact columns without horizontal overflow | PASS — source verified |
| Listening card | Smaller title and panel with efficient control wrap | PASS — source verified |
| Dictation | 150px minimum textarea instead of desktop-height input | PASS — source verified |
| Shadowing | Compact tabs, transcript rows, and play controls | PASS — source verified |
| Retelling | Compact prompts, timer, and completion panel | PASS — source verified |
| Bottom actions | Previous and Next share one row | PASS — source verified |
| Bottom whitespace | Landing CTA padding does not apply to free lesson | PASS — source verified |

## Visual status

The supplied screenshots establish the pre-fix problems. Post-fix visual confirmation requires new screenshots from the user's Chrome because cloud-browser use is prohibited by the project instructions.
