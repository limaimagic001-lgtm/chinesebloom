# ChineseBloom MVP Test Report

- Date: 2026-08-28
- Scope: English landing page and first free HSK 3–4 Mandarin lesson
- Wavuno production code changed: **No**
- Browser automation used: **No**

## Completion criteria

The MVP must keep ChineseBloom isolated from Wavuno; provide an English landing page; provide one complete Mandarin practice with intensive listening, dictation and correction, shadowing, and retelling; expose Hanzi, pinyin, and English transcript views; work on desktop and mobile layouts; build without errors; and include production-ready metadata.

## Automated results

| Check | Result |
|---|---|
| Production build | PASS |
| Native Next.js / Vercel build | PASS — 5 static routes |
| ESLint | PASS — 0 errors, 0 warnings |
| Node test suite | PASS — 10/10 |
| Landing page HTTP render | PASS — 200 |
| Free lesson HTTP render | PASS — 200 |
| Landing-to-lesson CTA links | PASS |
| Title, description, and canonical | PASS |
| robots.txt and sitemap.xml | PASS |
| Starter copy / preview metadata removed | PASS |
| Shadcn tabs and progress semantics | PASS |
| Dictation exact-match score | PASS — 100% |
| Dictation punctuation / whitespace normalization | PASS |
| Empty dictation guard | PASS |
| Hanzi / pinyin / English views present | PASS |
| Mobile responsive breakpoints present | PASS |
| Reduced-motion fallback present | PASS |

## Independent GitHub / Vercel package validation

Revalidated on 2026-08-29 after extracting the MVP into its own clean, Vercel-native Next.js repository.

| Check | Result |
|---|---|
| Clean dependency install (`npm ci`) | PASS — 442 packages installed |
| ESLint (`npm run lint`) | PASS — 0 errors |
| Native production build (`next build`) | PASS |
| TypeScript validation | PASS |
| Static route generation | PASS — 5 public routes plus the framework not-found route |
| Repository source tests | PASS — 5/5 |
| Landing and free-lesson routes present | PASS |
| Four-round training loop retained | PASS |
| Wavuno / Supabase / Stripe isolation | PASS |
| ChineseBloom local-storage namespace | PASS |
| Vercel-native scripts and configuration | PASS |

## Lesson content verification

| Item | Actual | Result |
|---|---:|---|
| Dialogue lines | 14 | PASS |
| Hanzi characters excluding punctuation | 242 | PASS |
| Estimated natural playback duration | about 61 seconds plus pauses | PASS |
| Training rounds | 4 | PASS |
| Playback speeds | 0.75× / 0.9× / 1.0× | PASS |
| Transcript representations | Hanzi / pinyin / English | PASS |

## Functional coverage

- Round 1 keeps the transcript hidden and provides Mandarin playback controls.
- Round 2 saves a device-local dictation draft and calculates a character-level score after the learner checks the answer.
- Round 3 provides full-dialogue and line-by-line playback with Hanzi, pinyin, and English tabs.
- Round 4 provides guided retelling prompts, a speaking timer, device-local notes, and a completion state.
- All browser storage keys use the independent `chinesebloom:v1:` namespace.
- No Supabase, Stripe, Wavuno analytics ID, Wavuno domain configuration, or Wavuno cloud-sync code is included.

## Known MVP constraint

Audio uses the Mandarin speech voice available in the learner's browser. Voice character and exact duration therefore vary by operating system. A fixed studio-quality two-speaker audio file should replace browser speech synthesis after the product validates demand.

## Deployment verification

Pending final production deployment and remote health verification.
