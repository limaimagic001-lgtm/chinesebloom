import type { Metadata } from "next";
import Image from "next/image";
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
            <Image className="brand-mark-image" src="/chinesebloom-mark.svg" alt="" width={34} height={34} />
            <span>ChineseBloom</span>
          </Link>
          <Link href="/">← Back to the overview</Link>
        </div>
      </header>
      <FreeLesson />
    </main>
  );
}
