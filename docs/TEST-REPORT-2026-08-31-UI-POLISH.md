# ChineseBloom UI Polish Test Report

- Date: 2026-08-31
- Branch: `ui/homepage-free-lesson-polish` (based on `main` @ `87c256f`)
- Scope: layout, responsive behaviour and interaction feedback on `/` and `/free-lesson`
- Evidence: headless Chromium against a local production build (`next build` + `next start`), captured at 1536, 768, 390 and 375 CSS px, density 1
- Files changed: `app/globals.css`, `tests/source.test.mjs` (2 files, +173 / -17)

## Result

- ESLint: **PASS**
- Next.js production build and TypeScript: **PASS**
- Automated source tests: **15/15 PASS** (12 existing, 1 amended, 3 added)
- Static route generation: **PASS** — `/`, `/free-lesson`, `/robots.txt`, `/sitemap.xml` all still static
- Horizontal overflow at 1536 / 768 / 390 / 375: **PASS** — none on either page
- Console errors at all four widths: **PASS** — none on either page
- CTA integrity: **PASS** — 6 links to `/free-lesson`, all with `pointer-events: auto`
- Desktop and mobile visual sign-off: **PENDING USER CONFIRMATION**

## Test Cases

| ID | Test case | Expected result | Result |
| --- | --- | --- | --- |
| UP-01 | Phone header navigation at 390 and 375 | A text link to `/free-lesson` is rendered and visible | PASS |
| UP-02 | Hero four-step row at 375 | Four steps laid out 2 × 2; no step or label crosses the viewport edge | PASS |
| UP-03 | Four-step microcopy size on phones | Label font ≥ 10px (was 8px) | PASS — computed 10px |
| UP-04 | Sticky conversion bar vs four-step row | Zero overlap at every scroll offset, 375 × 667 and 390 × 844 | PASS — worst overlap 0px |
| UP-05 | Hero dead space on phones | Gap between the four-step row and the hero photo reduced from 104px to 36px | PASS |
| UP-06 | Free-lesson audio headline at 1536 | "Focus on the situation, not every word." sets on one line | PASS |
| UP-07 | Keyboard focus ring | Every link, button, select and textarea on both pages shows a visible ring | PASS |
| UP-08 | Pressed state on primary actions | Primary CTAs and audio controls acknowledge a press | PASS |
| UP-09 | Method card pointer feedback | Hover background change, gated behind `(hover: hover)` | PASS |
| UP-10 | Reduced-motion preference | No transforms applied under `prefers-reduced-motion: reduce` | PASS |
| UP-11 | Horizontal overflow | `scrollWidth <= clientWidth` on both pages at all four widths | PASS |
| UP-12 | Console errors | No console or page errors on either page at any width | PASS |
| UP-13 | CTA destinations | Every CTA still resolves to `/free-lesson` | PASS |
| UP-14 | Desktop regression at 1536 | Hero, four-step row, method grid, CTA card and footer structurally unchanged | PASS |
| UP-15 | ESLint | No lint errors | PASS |
| UP-16 | Production build and type-check | Compiles and type-checks | PASS |
| UP-17 | Automated source tests | All tests pass | PASS — 15/15 |
| UP-18 | Production visual comparison in the user's own browser | Desktop and phone match intent | PENDING |

## Amended Test

`prevents the homepage hero from being nested in the legacy two-column grid` asserted the literal
value `padding: 45px 0 104px`. That 104px was added on 2026-08-29 as sticky-bar clearance, but the
bar is `position: fixed`, so a fixed padding inside the hero cannot control occlusion at arbitrary
scroll offsets — `body:has(.mobile-conversion-bar) { padding-bottom: 76px }` is what actually does
that. The assertion now expects `36px` and additionally asserts the body reserve. Occlusion is
covered empirically by UP-04, which measures the two rectangles at every 20px scroll step.

## Added Tests

- `keeps a free-lesson entry point in the phone header`
- `stacks the hero four-step row two-by-two on phones`
- `gives every interactive element a visible keyboard focus ring`

## Change Boundary

Not modified: the logo and mark assets, brand colour tokens, English copy, routes, SEO metadata,
`robots.txt`, `sitemap.xml`, audio playback behaviour, lesson state logic, `app/page.tsx`,
`app/free-lesson/page.tsx`, `components/free-lesson.tsx`, `components/phrase-player.tsx`, and any
`components/ui` primitive.

This repository contains no authentication, Stripe, payment or Wavuno code — verified by search
across `*.ts`, `*.tsx`, `*.css` and `package.json`; the only matches were the `class-variance-authority`
dependency. There is therefore no surface on which those systems could be affected.

## Known Remaining Items

- P3: at 1536 the free-lesson sidebar card is materially shorter than the workspace card, leaving
  whitespace under it. Cosmetic, not addressed in this branch.
- P3: the green audio card keeps unused space on its right at 1536. Cosmetic.
- P2 (pre-existing, unchanged): `.lesson-header-inner > a:last-child` hides "Back to the overview"
  below 680px. The logo still links to `/`, so the route stays reachable.
- P1 (pre-existing, content, unchanged): the free lesson uses browser speech synthesis rather than
  recorded native audio. Flagged in `design-qa.md`; out of scope for a layout branch.

## Merge Gate

Not to be merged until the user has confirmed the desktop and phone screenshots.

final result: passed, pending visual sign-off
