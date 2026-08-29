# ChineseBloom logo replacement test report — 2026-08-29

## Scope

- Replace the ambiguous Chinese-character mark with a five-petal bloom symbol.
- Apply the mark consistently to the landing header, footer, free lesson, favicon, shortcut icon, and Apple icon.
- Remove the obsolete character-logo asset and CSS.

## Test results

| Test | Result |
|---|---|
| ESLint | PASS |
| Next.js production build | PASS |
| TypeScript validation | PASS |
| Existing regression tests | PASS — 7/7 |
| New logo consistency test | PASS |
| Total Node tests | PASS — 8/8 |

## Logo checks

| Check | Result |
|---|---|
| Landing header uses `/chinesebloom-mark.svg` | PASS |
| Landing footer uses the same mark | PASS |
| Free lesson uses the same mark | PASS |
| Metadata uses the same mark for browser icons | PASS |
| Visible brand markup contains no `中` character glyph | PASS |
| Old character-mark CSS removed | PASS |
