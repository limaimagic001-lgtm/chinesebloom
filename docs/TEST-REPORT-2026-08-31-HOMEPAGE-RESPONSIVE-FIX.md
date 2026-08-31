# ChineseBloom Homepage Responsive Fix Test Report

- Date: 2026-08-31
- Scope: desktop hero clipping/blank-space regression and mobile sticky CTA overlap
- Evidence: user Chrome screenshots at 1848 × 955 and 375 × 667

## Result

- Root cause identified: **PASS**
- CSS regression coverage: **PASS**
- ESLint: **PASS**
- Next.js production build and TypeScript: **PASS**
- Automated source tests: **12/12 PASS**
- Static route generation: **PASS**
- Post-deploy desktop/mobile visual comparison: **PENDING USER CHROME SCREENSHOTS**

## Test Cases

| ID | Test case | Expected result | Result |
| --- | --- | --- | --- |
| RF-01 | Inspect 1848 × 955 desktop screenshot | Identify the clipping and blank-space source | PASS |
| RF-02 | Inspect 375 × 667 mobile screenshot | Identify sticky CTA overlap without changing the approved layout | PASS |
| RF-03 | Override the legacy hero container | Homepage hero uses one full-width wrapper instead of a nested outer grid | PASS |
| RF-04 | Stabilize desktop copy padding | Headline receives symmetric clamped padding and no viewport-offset squeeze | PASS |
| RF-05 | Reserve mobile CTA clearance | Four-step row can scroll clear of the fixed conversion bar | PASS |
| RF-06 | Run ESLint | No lint errors | PASS |
| RF-07 | Run Next.js production build | Compile and type-check successfully | PASS |
| RF-08 | Run automated source tests | All 12 tests pass, including the new hero-grid regression test | PASS |
| RF-09 | Generate public routes | `/`, `/free-lesson`, `robots.txt`, and `sitemap.xml` remain static | PASS |
| RF-10 | Recheck production desktop/mobile rendering | No desktop clipping/blank half; no mobile CTA overlap | PENDING |

## Change Boundary

Only homepage CSS and its regression test were changed. Landing-page copy, imagery, free-lesson behavior, authentication/payment isolation, and Wavuno were not modified.

## Visual Verification Boundary

The user requires visual checks in their own Chrome rather than a cloud browser. Production HTTP readback will be completed after deployment; final visual QA remains blocked until new desktop and mobile screenshots are supplied.
