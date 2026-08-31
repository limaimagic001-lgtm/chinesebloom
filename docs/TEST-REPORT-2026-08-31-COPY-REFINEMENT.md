# ChineseBloom Copy Refinement Test Report

- Date: 2026-08-31
- Scope: Hero habit framing, method header refinement, and truthful bottom CTA capability claims
- Change boundary: homepage copy and corresponding regression assertions only

## Result

- ESLint: **PASS**
- Next.js production build and TypeScript: **PASS**
- Automated source tests: **12/12 PASS**
- Static route generation: **PASS**
- Vercel Production readback: **PASS**
- User Chrome visual verification: **PENDING**

## Test Cases

| ID | Test case | Expected result | Result |
| --- | --- | --- | --- |
| CR-01 | Verify Hero Subtitle | Uses the realistic “20 minutes a day” habit framing | PASS |
| CR-02 | Verify Method Title | Uses “From listening to native reflex.” | PASS |
| CR-03 | Verify Method Subtitle | Uses the approved bridge-between-understanding-and-speaking copy | PASS |
| CR-04 | Verify bottom CTA Tag | Uses “GET STARTED FOR FREE” | PASS |
| CR-05 | Verify bottom CTA Title | Uses the next-conversation outcome copy | PASS |
| CR-06 | Verify bottom CTA Body | Describes Mandarin audio, instant dictation feedback, and guided speaking prompts without claiming native recording or real-time AI feedback | PASS |
| CR-07 | Run ESLint | No lint errors | PASS |
| CR-08 | Run Next.js build | Compile and type-check successfully | PASS |
| CR-09 | Run automated tests | All regression tests pass | PASS |
| CR-10 | Verify project isolation | No Wavuno service identifiers introduced | PASS |
| CR-11 | Read back Vercel Production | All five refined copy areas are present on the live homepage | PASS |

## Product Accuracy

The approved bottom CTA matches the current MVP: browser Mandarin audio, instant dictation scoring/feedback, and guided retelling prompts. It intentionally avoids unsupported claims about recorded native-speaker audio or real-time AI speaking feedback.

## Production Evidence

- `https://chinesebloom.vercel.app/`: HTTP 200, 41,304 bytes
- `https://chinesebloom.vercel.app/free-lesson`: HTTP 200, 26,573 bytes
- All six refined strings were found in the production homepage HTML.
- Unsupported `native audio` and `real-time speaking prompts` claims were not found.
- GitHub implementation commit: `21a0d95d1e9b473ce7f11aa761cdd007b81060d2`
- Iteration report head before production evidence: `d68dbeaaf10e43988c27e6a52769e34ad8ed881c`

## Remaining Copy Risk Outside This Iteration

The existing Listen method card still says `real, unscripted native conversations`. That card was not part of the five approved replacements in this iteration, but the claim should be changed before paid acquisition unless recorded native-speaker material is added.
