# ChineseBloom Option 3 Design QA

- Date: 2026-08-29
- Source visual truth: `/workspace/scratch/ccad1d88e39e/generated_images/exec-a8ccd4bf-5268-4dac-b2d8-b49ebb66e6ef.png`
- Source pixels: 1536 × 960
- Target route: `/`
- Intended desktop viewport: 1536 × 960 CSS px at density 1
- Intended mobile breakpoint: 390 × 844 CSS px at density 1
- State: default homepage, audio preview idle
- Implementation screenshots received from the user's Chrome: desktop 1848 × 955 and mobile 375 × 667

**Findings from the 2026-08-31 Chrome screenshots**

- [P0 fixed in code] The desktop hero was constrained to the left half of the viewport.
  - Location: desktop homepage hero.
  - Evidence: the 1848 × 955 screenshot showed the headline and image clipped at approximately x=936 with blank space to the right.
  - Cause: the legacy `.hero` two-column grid wrapped the new `.hero-inner` two-column grid.
  - Fix: `.home-page .hero` now explicitly uses `display: block`, full width, and zero padding.
- [P1 fixed in code] The desktop copy column inherited viewport-relative left padding after centering the hero container.
  - Location: desktop headline and supporting copy.
  - Fix: use symmetric clamped internal padding so the title has a stable readable width.
- [P1 fixed in code] The mobile sticky conversion bar covered the top of the four-step row.
  - Location: 375 × 667 mobile hero.
  - Fix: reserve 104px of bottom clearance in the mobile hero copy.

**Post-copy desktop review received on 2026-08-31**

- [Passed] Desktop structure and hierarchy are healthy across the hero, transformation, method, and bottom CTA sections.
  - The earlier half-width clipping and right-side blank area are gone.
  - The audio player does not cover either speaker's face.
  - The four-step indicator and four method cards are aligned and readable.
- [Passed with P3 note] The hero headline uses a three-line composition: “Hear it clearly.” followed by “Say it / naturally.” The wrap is balanced and does not require a layout change.
- [Not site UI] The small blue square icons and blue subtitle highlight are browser extension/selection overlays; they do not appear in the ChineseBloom source.
- [P1 content-truth risk] “real, unscripted native conversations” and “native audio” imply recorded native-speaker material, while the current free lesson uses browser Mandarin speech synthesis. Replace those claims or add recorded native audio before paid acquisition.

- [Blocked] Browser-rendered comparison is unavailable.
  - Location: homepage full view and responsive states.
  - Evidence: post-fix desktop screenshots were received and inspected, but no post-copy mobile screenshot has been received.
  - Impact: the 375–390px headline, four-step microcopy, sticky CTA clearance, and mobile audio-card crop cannot yet be certified.
  - Fix: capture one mobile screenshot in the user's Chrome after a hard refresh.

**Static Fidelity Review**

- Fonts and typography: the implementation uses the existing serif/sans pairing and the source hierarchy; browser-rendered wrapping remains to be verified.
- Spacing and layout rhythm: the hero uses a 40/60 desktop split, full-width right image, and mobile single-column fallback; rendered geometry remains to be verified.
- Colors and visual tokens: deep pine, celadon, warm paper, and cinnabar tokens match the selected direction; rendered contrast remains to be verified.
- Image quality and asset fidelity: the existing production hero photograph is reused; the selected four-arc mark is a generated RGBA PNG with transparent corners. Crop and favicon appearance remain to be verified.
- Copy and content: headline, CTA, proof, four steps, audio phrase, and transformation copy match the approved direction.

**Primary Interactions Checked Without Browser UI**

- Homepage and `/free-lesson` return HTTP 200 from the local production server.
- The deployed homepage, `/free-lesson`, and `/chinesebloom-mark.svg` each return HTTP 200 from `https://chinesebloom.vercel.app`.
- The logo asset returns HTTP 200 as an SVG wrapper around the selected 508 × 512 transparent generated PNG.
- CTA and navigation destinations are present in server-rendered HTML.
- Speech-synthesis play/stop behavior remains covered by source inspection and build validation; live click behavior awaits browser verification.
- Console errors: not checked because browser use is blocked by the user's constraint.

**Implementation Checklist**

1. ~~Deploy the tested commit to Vercel Production.~~ Completed and read back successfully.
2. ~~Capture desktop production screenshots in the user's Chrome.~~ Completed and passed.
3. Capture one mobile production screenshot and compare the same viewport/state.
4. Fix any P0/P1/P2 differences and update this report to `passed`.

**Follow-up Polish**

- Confirm the four-arc mark remains crisp at 24–42 px.
- Confirm the mobile audio card does not obscure either speaker's face.
- Confirm the Option 1 microcopy does not create undesirable wrapping in the desktop four-step indicator or the 375px mobile hero.

final result: blocked
