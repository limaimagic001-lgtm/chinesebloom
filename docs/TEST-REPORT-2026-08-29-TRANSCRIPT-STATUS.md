# ChineseBloom transcript-status affordance test — 2026-08-29

## Change

- Replace the button-like `TRANSCRIPT HIDDEN` pill with a plain locked status.
- Use the clearer copy `TRANSCRIPT UNLOCKS AFTER DICTATION`.
- Add a lock icon and remove the border, background, rounded container, and button affordance.
- Keep round 1 transcript hidden so the intensive-listening method is unchanged.

## Results

| Test | Result |
|---|---|
| ESLint | PASS |
| Next.js production build | PASS |
| TypeScript validation | PASS |
| Existing regression tests | PASS — 9/9 |
| Non-button transcript-status test | PASS |
| Total Node tests | PASS — 10/10 |
