import type { Metadata } from "next";
import Link from "next/link";

import { FreeLesson } from "@/components/free-lesson";

export const metadata: Metadata = {
  title: "Free HSK 3–4 Mandarin Listening Lesson",
  description:
    "Try a free 20-minute Mandarin lesson with listening, dictation, shadowing, pinyin, English translation, and retelling practice.",
  alternates: { canonical: "/free-lesson" },
};

export default function FreeLessonPage() {
  return (
    <main className="lesson-page">
      <header className="lesson-header">
        <div className="lesson-header-inner shell">
          <Link className="brand" href="/" aria-label="ChineseBloom home">
            <span className="brand-mark" aria-hidden="true">中</span>
            ChineseBloom
          </Link>
          <Link href="/">← Back to the overview</Link>
        </div>
      </header>
      <FreeLesson />
    </main>
  );
}
