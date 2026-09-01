# ChineseBloom UI Polish Handoff for Claude

## Project

- Repository: `limaimagic001-lgtm/chinesebloom`
- Production: `https://chinesebloom.vercel.app/`
- Framework: Next.js 16 App Router, TypeScript, Tailwind/CSS
- Current baseline snapshot: `87c256f`
- Always pull the latest `main` before starting because Stripe work may land after this snapshot.

## Goal

Polish layout, responsive behavior, and interaction feedback without changing the approved brand direction, copy, routes, or course behavior.

The intended visual direction is clean Song-inspired Chinese design: warm paper background, deep pine text, cinnabar CTA, restrained celadon accents, editorial serif headings, and minimal decoration.

## Branch and Merge Rules

1. Create `feature/ui-polish-claude` from the latest `main`.
2. Do not work directly on `main`.
3. Do not force-push or rewrite history.
4. Before handoff, rebase or merge the latest `main` into the UI branch and resolve conflicts without overwriting Stripe/Auth changes.
5. Do not merge until desktop and mobile screenshots are approved.

## Allowed Scope

- Homepage layout, spacing, typography, responsive behavior, hover/focus/pressed states
- Free lesson layout and responsive presentation
- Existing component-level CSS needed for visual polish
- Accessibility improvements that do not change product behavior
- Small interaction feedback such as hover, focus, loading, active, and disabled presentation

## Protected Scope

Do not change any of the following unless explicitly approved:

- Approved English copy
- Logo or brand color palette
- `/free-lesson` URL or any public URL
- Audio playback and browser speech-synthesis logic
- Dictation scoring, local storage, lesson rounds, timers, shadowing, or retelling behavior
- Authentication, Stripe, payments, checkout, webhooks, environment variables, or account configuration
- SEO metadata, canonical, robots, sitemap, or structured data
- Wavuno or any Wavuno identifiers/services
- Test reports or historical documentation

## Conversion Requirements

- Every primary CTA must remain clickable and route to `/free-lesson`.
- Keep the primary CTA visible without making the page feel aggressive.
- Preserve `No account needed. Start in 10 seconds.`
- Preserve the mobile conversion bar, but it must not cover lesson or method content.
- Do not add fake reviews, fake user counts, fake urgency, or unsupported product claims.

## Current Approved Copy

- Hero: `Hear it clearly. Say it naturally.`
- Hero subtitle: `One conversation. Four focused steps. 20 minutes a day.`
- Method title: `From listening to native reflex.`
- Method subtitle: `Four guided steps to bridge the gap between understanding and speaking.`
- Bottom tag: `GET STARTED FOR FREE`
- Bottom title: `Speak Mandarin naturally in your next conversation.`
- Bottom body: `Take the 20-minute sample lesson. Includes Mandarin audio, instant dictation feedback, and guided speaking prompts.`
- Listen card: `Listen raw. Train your ears on natural Mandarin in context—no text safety net.`

Do not reintroduce these unsupported claims:

- `real, unscripted native conversations`
- `native audio`
- `real-time speaking prompts`

## Required Viewports

Verify all important states at:

- Desktop: 1536 × 960 and 1440 × 900
- Tablet: 768 × 1024
- Mobile: 390 × 844 and 375 × 667

## Visual Acceptance Checklist

- No horizontal overflow at any required viewport
- Hero headline wraps intentionally and remains readable
- Hero image crop keeps both people understandable; the audio card does not cover either face
- Header and CTA alignment remains balanced
- Four-step indicator stays readable without crowding or overlap
- Transformation section keeps a clear From → To reading order
- Four method cards have equal visual weight and consistent vertical rhythm
- Bottom CTA remains prominent and does not collide with the landscape artwork
- Mobile sticky CTA does not cover content or controls
- Logo remains crisp at header and mobile sizes
- Minimum readable supporting text size and adequate color contrast
- Keyboard focus is visible for links, buttons, and interactive controls
- Hover, active, focus, disabled, and loading states are visually distinct

## Functional Acceptance Checklist

- Header CTA opens `/free-lesson`
- Hero CTA opens `/free-lesson`
- Bottom CTA opens `/free-lesson`
- Mobile CTA opens `/free-lesson`
- Homepage audio play/stop still works
- Free lesson Listen, Dictate, Shadow, and Retell rounds still work
- Dictation input and feedback still work
- Transcript status remains a non-button status
- No browser console errors
- No HTTP 5xx on `/` or `/free-lesson`

## Required Tests

Run after changes:

```bash
npm run lint
npm test
npm run build
```

Create a dated Markdown test report under `docs/` containing:

- Changed files and scope
- Test cases
- Commands and results
- Desktop/tablet/mobile verification results
- Console and runtime errors
- Known limitations
- Production readback after deployment

## Handoff Deliverables

Before requesting merge approval, provide:

1. Summary of only the files changed
2. Desktop screenshots at 1536px and 1440px
3. Tablet screenshot at 768px
4. Mobile screenshots at 390px and 375px
5. Test report
6. Git commit SHA
7. Any conflicts encountered with concurrent Stripe/Auth work

Do not merge or deploy destructive changes without approval.
