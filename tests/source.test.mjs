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
  assert.match(page, /Listen, dictate, shadow, and retell/);
});

test("keeps the free-lesson conversion path immediate and low-friction", async () => {
  const page = await read("app/page.tsx");
  const player = await read("components/phrase-player.tsx");
  assert.match(page, /Start the free lesson/);
  assert.match(page, /No sign-up required/);
  assert.match(page, /mobile-conversion-bar/);
  assert.match(player, /SpeechSynthesisUtterance/);
  assert.match(player, /Play Mandarin phrase/);
});

test("uses the flower brand mark instead of a Chinese character glyph", async () => {
  const page = await read("app/page.tsx");
  const lesson = await read("app/free-lesson/page.tsx");
  const layout = await read("app/layout.tsx");
  const mark = await read("public/chinesebloom-mark.svg");
  assert.match(page, /chinesebloom-mark\.svg/);
  assert.match(lesson, /chinesebloom-mark\.svg/);
  assert.match(layout, /chinesebloom-mark\.svg/);
  assert.match(mark, /ChineseBloom flower mark/);
  assert.doesNotMatch(page + lesson, />中</);
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
