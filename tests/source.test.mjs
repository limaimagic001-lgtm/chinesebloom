import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), "utf8");
}

test("contains the landing page and free lesson routes", async () => {
  await Promise.all([
    access(new URL("app/page.tsx", root)),
    access(new URL("app/free-lesson/page.tsx", root)),
    access(new URL("app/robots.ts", root)),
    access(new URL("app/sitemap.ts", root)),
  ]);
});

test("keeps the complete four-round training loop", async () => {
  const source = await read("components/free-lesson.tsx");
  for (const content of [
    "Intensive listening",
    "Chinese dictation",
    "Shadowing",
    "Retelling",
    "汉字 Hanzi",
    "拼音 Pinyin",
    "Check my dictation",
    "Speaking timer",
  ]) {
    assert.match(source, new RegExp(content));
  }
});

test("keeps ChineseBloom isolated from Wavuno services", async () => {
  const sources = await Promise.all([
    read("app/page.tsx"),
    read("app/layout.tsx"),
    read("components/free-lesson.tsx"),
  ]);
  const combined = sources.join("\n").toLowerCase();
  assert.doesNotMatch(combined, /wavuno|supabase|stripe|g-vld40p54xm/);
  assert.match(combined, /chinesebloom/);
});

test("uses the independent local-storage namespace", async () => {
  const source = await read("components/free-lesson.tsx");
  assert.match(source, /chinesebloom:v1:free-dictation/);
  assert.match(source, /chinesebloom:v1:free-retell/);
});

test("uses a native Next.js Vercel build", async () => {
  const pkg = JSON.parse(await read("package.json"));
  const vercel = JSON.parse(await read("vercel.json"));
  assert.equal(pkg.scripts.build, "next build");
  assert.equal(vercel.framework, "nextjs");
  assert.equal(vercel.buildCommand, "npx next build");
});

test("targets the selected Mandarin listening and speaking search intent", async () => {
  const layout = await read("app/layout.tsx");
  const page = await read("app/page.tsx");
  assert.match(layout, /Mandarin Listening & Speaking Practice for Intermediate Learners/);
  assert.match(page, /MANDARIN LISTENING &amp; SPEAKING PRACTICE/);
  assert.match(page, /HSK 3–4/);
  assert.match(page, /One conversation\. Four focused steps\. 20 minutes to fluency\./);
  for (const step of ["Listen", "Dictate", "Shadow", "Retell"]) {
    assert.match(page, new RegExp(step));
  }
});

test("keeps the free-lesson conversion path immediate and low-friction", async () => {
  const page = await read("app/page.tsx");
  const player = await read("components/phrase-player.tsx");
  assert.match(page, /Start Free Lesson/);
  assert.match(page, /No account needed\. Start in 10 seconds\./);
  assert.match(page, /mobile-conversion-bar/);
  assert.match(player, /SpeechSynthesisUtterance/);
  assert.match(player, /Play Mandarin phrase/);
});

test("uses the selected four-step brand mark instead of a Chinese character glyph", async () => {
  const page = await read("app/page.tsx");
  const lesson = await read("app/free-lesson/page.tsx");
  const layout = await read("app/layout.tsx");
  const mark = await read("public/chinesebloom-mark.svg");
  assert.match(page, /chinesebloom-mark\.svg/);
  assert.match(lesson, /chinesebloom-mark\.svg/);
  assert.match(layout, /chinesebloom-mark\.svg/);
  assert.match(mark, /ChineseBloom four-step bloom mark/);
  assert.match(mark, /data:image\/png;base64/);
  assert.doesNotMatch(page + lesson, />中</);
});

test("implements the selected option-one messaging in the option-three layout", async () => {
  const page = await read("app/page.tsx");
  const player = await read("components/phrase-player.tsx");
  assert.match(page, /className="home-page"/);
  assert.match(page, /hero-method-steps/);
  assert.match(page, /Hear it clearly\./);
  assert.match(page, /Say it naturally\./);
  assert.match(page, /Stuck in your head/);
  assert.match(page, /Replying on reflex/);
  assert.match(page, /Turn active listening into automatic speech\./);
  assert.match(page, /Ready to speak Mandarin with confidence\?/);
  for (const indicator of ["Tune your ear", "Catch the gaps", "Match the flow", "Make it yours"]) {
    assert.match(page, new RegExp(indicator));
  }
  assert.match(player, /Play the conversation/);
  assert.match(player, /player-waveform/);
  assert.match(player, /player-method/);
});

test("prevents the homepage hero from being nested in the legacy two-column grid", async () => {
  const css = await read("app/globals.css");
  assert.match(css, /\.home-page \.hero \{[\s\S]*?display: block;[\s\S]*?width: 100%;/);
  assert.match(css, /\.home-page \.hero-copy \{[\s\S]*?padding: 72px clamp\(42px, 5vw, 84px\) 58px;/);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*?\.home-page \.hero-copy \{[\s\S]*?padding: 45px 0 104px;/);
});

test("uses a compact mobile layout for every free-lesson round", async () => {
  const css = await read("app/globals.css");
  assert.match(css, /lesson-shell\.shell[\s\S]*gap: 12px/);
  assert.match(css, /lesson-step-list[\s\S]*repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(css, /lesson-stage-head h2[\s\S]*font-size: 26px/);
  assert.match(css, /practice-textarea[\s\S]*min-height: 150px/);
  assert.match(css, /lesson-actions[\s\S]*grid-template-columns: 0\.82fr 1\.18fr/);
  assert.match(css, /body:has\(\.mobile-conversion-bar\)/);
});

test("makes the locked transcript a clear non-button status", async () => {
  const css = await read("app/globals.css");
  const lesson = await read("components/free-lesson.tsx");
  assert.match(css, /\.transcript-status[\s\S]*color: #fff7ee/);
  assert.match(lesson, /Transcript unlocks after dictation/);
  assert.match(lesson, /LockKeyhole/);
  assert.doesNotMatch(lesson, /<button[^>]*>\s*Transcript unlocks after dictation/);
});
