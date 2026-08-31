# ChineseBloom Option 1 Copy Test Report

- Date: 2026-08-31
- Scope: complete landing-page copy update using the “Hear it clearly. Say it naturally.” direction
- Change boundary: homepage copy, four-step indicator microcopy, visible transformation label, and minimal supporting CSS

## Result

- ESLint: **PASS**
- Next.js production build and TypeScript: **PASS**
- Automated source tests: **12/12 PASS**
- Static route generation: **PASS**
- ChineseBloom/Wavuno isolation: **PASS**
- Vercel Production readback: **PENDING DEPLOYMENT**
- User Chrome visual verification: **PENDING**

## Test Cases

| ID | Test case | Expected result | Result |
| --- | --- | --- | --- |
| CP-01 | Verify hero headline | “Hear it clearly. Say it naturally.” is present | PASS |
| CP-02 | Verify hero conversion copy | New 20-minute value proposition, CTA, and 10-second start proof are present | PASS |
| CP-03 | Verify four-step indicator | Tune your ear, Catch the gaps, Match the flow, and Make it yours are visible | PASS |
| CP-04 | Verify transformation section | Visible section label and new From/To outcome copy are present | PASS |
| CP-05 | Verify method introduction | Active-listening-to-automatic-speech message is present | PASS |
| CP-06 | Verify four method cards | Each card includes the approved bold lead and supporting sentence | PASS |
| CP-07 | Verify bottom CTA | New confidence headline, lesson description, CTA, and no-card proof are present | PASS |
| CP-08 | Run ESLint | No lint errors | PASS |
| CP-09 | Run Next.js build | Compile and type-check successfully | PASS |
| CP-10 | Run automated source tests | All 12 tests pass | PASS |
| CP-11 | Generate static routes | `/`, `/free-lesson`, `robots.txt`, and `sitemap.xml` remain static | PASS |
| CP-12 | Verify project isolation | No Wavuno, Stripe, Supabase, or Wavuno GA identifiers introduced | PASS |
| CP-13 | Read back Vercel Production | New copy and CSS are present on the live homepage | PENDING |
| CP-14 | Inspect desktop/mobile in user Chrome | No undesirable wrapping or overlap after the longer copy is rendered | PENDING |

## Notes

- Existing URLs, hero image, Logo, lesson interaction, free-lesson content, and footer structure were preserved.
- The header CTA was aligned to “Start Free Lesson” for consistency with the hero CTA.
- The mobile conversion bar remains concise as “Start now” to preserve limited screen width.
- Browser-rendered visual verification remains dependent on screenshots from the user's Chrome, per the project constraint.
