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
