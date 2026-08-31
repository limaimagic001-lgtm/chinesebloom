# ChineseBloom Copy Accuracy Fix Test Report

- Date: 2026-08-31
- Scope: remove the unsupported native/unscripted conversation claim from the Listen method card
- Change boundary: one homepage sentence and its regression assertions

## Result

- ESLint: **PASS**
- Next.js production build and TypeScript: **PASS**
- Automated source tests: **12/12 PASS**
- Unsupported-claim scan: **PASS**
- Vercel Production readback: **PASS**

## Test Cases

| ID | Test case | Expected result | Result |
| --- | --- | --- | --- |
| CA-01 | Verify Listen card copy | Uses “natural Mandarin in context” | PASS |
| CA-02 | Scan unsupported claims | No `real, unscripted native conversations`, `native audio`, or `real-time speaking prompts` | PASS |
| CA-03 | Run ESLint | No lint errors | PASS |
| CA-04 | Run Next.js build | Compile and type-check successfully | PASS |
| CA-05 | Run automated tests | All regression tests pass | PASS |
| CA-06 | Verify project isolation | No Wavuno service identifiers introduced | PASS |
| CA-07 | Read back Vercel Production | Safe Listen copy is live and unsupported claims are absent | PASS |

## Production Evidence

- `https://chinesebloom.vercel.app/`: HTTP 200, 41,284 bytes
- `https://chinesebloom.vercel.app/free-lesson`: HTTP 200, 26,573 bytes
- Safe Listen copy found in production HTML.
- `real, unscripted native conversations`, `native audio`, and `real-time speaking prompts` are absent from the production homepage.
- GitHub implementation commit: `947f793e27674b60a36605bb5817e24bf5f8a8aa`
- Iteration report head before production evidence: `be5d4563a3780405310780da2af228b90002b6bb`
