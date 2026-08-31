# ChineseBloom UI Polish Round 2 Test Report

- Date: 2026-08-31
- Branch: `ui/homepage-free-lesson-polish` (continues the same branch)
- Scope: the two desktop whitespace items left open as P3 in `TEST-REPORT-2026-08-31-UI-POLISH.md`
- Evidence: headless Chromium against a local production build, measured at 1536 × 960 across all four lesson rounds
- Files changed: `app/globals.css`, `tests/source.test.mjs`, this report

## Result

- ESLint: **PASS**
- Next.js production build and TypeScript: **PASS**
- Automated source tests: **16/16 PASS** (15 existing, 1 added)
- Horizontal overflow at 1536 / 768 / 390 / 375: **PASS** — none
- Console errors across all four lesson rounds: **PASS** — none
- Containment check: **PASS** — only `/free-lesson` at 1536 renders differently; the homepage at all four widths and `/free-lesson` at 768, 390 and 375 are byte-identical to the previous branch state
- Visual sign-off: **PENDING USER CONFIRMATION**

## What Was Measured First

| Round | Sidebar height | Workspace height | Difference |
| --- | --- | --- | --- |
| 1 Listen | 447px | 690px | 244px |
| 2 Dictate | 447px | 708px | 262px |
| 3 Shadow | 447px | 1491px | 1045px |
| 4 Retell | 447px | 809px | 363px |

The sidebar is `position: sticky`. On round 3 it trails a workspace three times its height, which is
exactly what sticky is for. Padding the card out to match would have meant 1045px of filler on that
round, so the card was **not** stretched. It was given the internal spacing its 24px rhythm lacked.

Likewise the green audio card is 837px wide while its text measure stops at 560px (body) and 620px
(headline). That measure is correct for reading — roughly 75 characters — so the text was not
widened. The unused right third was turned into deliberate composition instead.

## Changes

| Item | Before | After |
| --- | --- | --- |
| Sidebar column width | 265px | 292px |
| Grid gap | 28px | 30px |
| Sidebar padding | 24px | 27px / 26px / 24px |
| Progress bar margin | 24px 0 | 26px 0 22px |
| Step list gap | 6px | 8px |
| Step button height | 48px | 54px |
| Audio card outer ring | 260px | 340px |
| Audio card inner ring | — | new 186px concentric ring |

Resulting sidebar height: 447px → 482px. Workspace card width: 837px → 808px.

## Test Cases

| ID | Test case | Expected result | Result |
| --- | --- | --- | --- |
| R2-01 | Sidebar internal rhythm at 1536 | Card grows on its own content, no filler | PASS — 447px → 482px |
| R2-02 | Sticky behaviour on round 3 | Sidebar still trails the long workspace | PASS |
| R2-03 | Audio card right third at 1536 | Two concentric rings occupy the space | PASS |
| R2-04 | Audio card reading measure | Body text still capped at 560px | PASS — asserted in tests |
| R2-05 | Breakpoint containment | Nothing changes at or below 960px | PASS — screenshots identical |
| R2-06 | Homepage untouched | All four widths identical to previous state | PASS — screenshots identical |
| R2-07 | All four lesson rounds render | No overflow, no console errors | PASS |
| R2-08 | ESLint | No errors | PASS |
| R2-09 | Production build and type-check | Compiles | PASS |
| R2-10 | Automated source tests | All pass | PASS — 16/16 |
| R2-11 | Visual confirmation | Desktop lesson page reads as balanced | PENDING |

## Change Boundary

CSS is scoped inside `@media (min-width: 961px)`, which is above the breakpoint where the lesson
sidebar becomes a horizontal step row. No component, route, copy, colour token, audio or lesson
logic was touched. Both items in this round are spacing and decoration only.

## Remaining Items

- P2 (pre-existing, unchanged): `.lesson-header-inner > a:last-child` hides "Back to the overview"
  below 680px. The logo still links to `/`, so the route stays reachable.
- P1 (pre-existing, content, unchanged): the free lesson uses browser speech synthesis rather than
  recorded native audio. Flagged in `design-qa.md`; out of scope for a layout branch.

final result: passed, pending visual sign-off
