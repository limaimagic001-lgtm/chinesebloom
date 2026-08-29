# ChineseBloom Homepage Option 3 Test Report

- Date: 2026-08-29
- Scope: approved Option 3 homepage, selected four-arc logo, conversion hero, responsive CSS
- Environment: local Next.js 16.2.6 production build

## Result

- Automated source tests: **11/11 PASS**
- ESLint: **PASS**
- TypeScript / Next.js production build: **PASS**
- Static route generation: **PASS**
- Local production HTTP readback: **PASS**
- Browser visual comparison: **PENDING USER CHROME SCREENSHOTS**

## Test Cases

| ID | Test case | Expected result | Result |
| --- | --- | --- | --- |
| HP-01 | Run ESLint | No lint errors | PASS |
| HP-02 | Run `next build` | Production build compiles and type-checks | PASS |
| HP-03 | Generate public routes | `/`, `/free-lesson`, `robots.txt`, and `sitemap.xml` are static | PASS |
| HP-04 | Run Node source tests | All 11 isolation, SEO, funnel, lesson, logo, and responsive tests pass | PASS |
| HP-05 | Verify Option 3 copy | Headline, product proof, four steps, and transformation text are present | PASS |
| HP-06 | Verify conversion path | Primary CTA and free-lesson route remain immediate | PASS |
| HP-07 | Verify product preview | Play control, waveform icon, phrase, and four preview steps are present | PASS |
| HP-08 | Verify logo replacement | Homepage, lesson page, and metadata reference the new generated logo asset | PASS |
| HP-09 | Verify logo file | SVG wrapper embeds the selected 508 × 512 transparent generated PNG | PASS |
| HP-10 | Verify local homepage HTTP | `/` returns 200 and contains approved hero strings | PASS |
| HP-11 | Verify local lesson HTTP | `/free-lesson` returns 200 | PASS |
| HP-12 | Verify logo HTTP | `/chinesebloom-mark.svg` returns 200 | PASS |
| HP-13 | Verify Wavuno isolation | No Wavuno, Stripe, Supabase, or Wavuno GA identifiers introduced | PASS |
| HP-14 | Desktop visual comparison | Match 1536 × 960 selected reference | PENDING |
| HP-15 | Mobile visual comparison | No overflow; CTA, steps, and audio card remain readable | PENDING |

## Local HTTP Evidence

- Homepage: HTTP 200, 40,767 bytes
- Free lesson: HTTP 200, 26,746 bytes
- Logo: HTTP 200, generated transparent mark embedded in SVG
- Verified strings: `Understand Mandarin.`, `Speak it naturally.`, `Start the free lesson`, `No account needed`, `Play the conversation`, `Listen`, `Dictate`, `Shadow`, `Retell`

## Known Verification Boundary

The user requires that no cloud browser be used. Therefore the browser-rendered desktop/mobile comparison and live console inspection must be completed from screenshots captured in the user's Chrome after Production deploy. This limitation is recorded in `design-qa.md` as `final result: blocked` until visual evidence is supplied.
