import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  Check,
  Ear,
  MessageCircleMore,
  Mic2,
  Play,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const method = [
  {
    number: "01",
    title: "Listen closely",
    copy: "Hear a natural Mandarin conversation before you see the words.",
    icon: Ear,
  },
  {
    number: "02",
    title: "Dictate & correct",
    copy: "Write what you hear, then find the sounds and phrases you missed.",
    icon: BookOpenText,
  },
  {
    number: "03",
    title: "Shadow the speaker",
    copy: "Copy the rhythm, tones, and connected speech line by line.",
    icon: Mic2,
  },
  {
    number: "04",
    title: "Retell naturally",
    copy: "Put the transcript away and express the same ideas in your own words.",
    icon: MessageCircleMore,
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="ChineseBloom home">
          <span className="brand-mark" aria-hidden="true">
            中
          </span>
          ChineseBloom
        </Link>
        <nav className="header-links" aria-label="Main navigation">
          <a href="#method">How it works</a>
          <Link href="/free-lesson">Free lesson</Link>
          <Button asChild className="header-cta">
            <Link href="/free-lesson">Start practicing</Link>
          </Button>
        </nav>
      </header>

      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles aria-hidden="true" /> For HSK 3–4 learners
          </div>
          <h1>
            From textbook Chinese to <em>natural conversation.</em>
          </h1>
          <p className="hero-lead">
            Turn the Mandarin you understand into words you can actually say —
            with one focused 20-minute practice a day.
          </p>
          <div className="hero-actions">
            <Button asChild size="lg" className="primary-cta">
              <Link href="/free-lesson">
                Try a free Mandarin lesson <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <span className="micro-proof">
              <Check aria-hidden="true" /> No sign-up required
            </span>
          </div>
          <div className="hero-method-line" aria-label="Training sequence">
            <span>Listen</span>
            <i>→</i>
            <span>Dictate</span>
            <i>→</i>
            <span>Shadow</span>
            <i>→</i>
            <span>Retell</span>
          </div>
        </div>

        <div className="hero-visual">
          <Image
            src="/chinesebloom-conversation.png"
            alt="A Mandarin learner having a relaxed conversation with a friend in a tea shop"
            width={1536}
            height={1024}
            sizes="(max-width: 960px) 100vw, 50vw"
            priority
          />
          <div className="phrase-card">
            <span>Today&apos;s useful phrase</span>
            <strong>听起来不错</strong>
            <p>Tīng qǐlái búcuò</p>
            <small>That sounds good.</small>
            <Link href="/free-lesson" aria-label="Practice this phrase in the free lesson">
              <Play aria-hidden="true" fill="currentColor" />
            </Link>
          </div>
        </div>
      </section>

      <section className="problem-strip">
        <div className="shell problem-grid">
          <p className="section-kicker">THE INTERMEDIATE PLATEAU</p>
          <h2>You know the words. Real conversations still move too fast.</h2>
          <div className="problem-copy">
            <p>
              ChineseBloom is built for the frustrating middle: you can read a
              lesson, but natural speech blurs together and your own sentences
              arrive too slowly.
            </p>
            <p>
              Each practice closes that gap by turning one short conversation
              into listening, speaking, and reusable expression.
            </p>
          </div>
        </div>
      </section>

      <section className="method-section shell" id="method">
        <div className="section-heading">
          <p className="section-kicker">ONE CONVERSATION · FOUR ROUNDS</p>
          <h2>A practice loop designed for active Mandarin.</h2>
          <p>
            You do more than replay audio. Every round asks your brain to notice,
            reproduce, and finally own the language.
          </p>
        </div>
        <div className="method-grid">
          {method.map((item) => {
            const Icon = item.icon;
            return (
              <article className="method-card" key={item.number}>
                <div className="method-topline">
                  <span>{item.number}</span>
                  <Icon aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="lesson-preview shell">
        <div className="lesson-preview-copy">
          <p className="section-kicker">FREE 20-MINUTE LESSON</p>
          <h2>Weekend plans that change with the weather</h2>
          <p>
            Practice a natural HSK 3–4 conversation about making plans, checking
            the weather, and suggesting a backup idea.
          </p>
          <ul>
            <li><Check aria-hidden="true" /> 60–90 seconds of natural Mandarin</li>
            <li><Check aria-hidden="true" /> Hanzi, pinyin, and English views</li>
            <li><Check aria-hidden="true" /> Dictation feedback and line-by-line shadowing</li>
          </ul>
          <Button asChild size="lg" className="primary-cta">
            <Link href="/free-lesson">
              Start the free lesson <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="lesson-ticket" aria-label="Free lesson details">
          <div className="ticket-top">
            <span>FREE LESSON · 01</span>
            <span>HSK 3–4</span>
          </div>
          <div className="ticket-character">周</div>
          <div>
            <p>Real-life conversation</p>
            <h3>周末去哪儿？</h3>
            <span>Where should we go this weekend?</span>
          </div>
          <div className="ticket-meta">
            <span>20 min</span>
            <span>14 lines</span>
            <span>4 rounds</span>
          </div>
        </div>
      </section>

      <footer className="site-footer shell">
        <div>
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">中</span>
            ChineseBloom
          </Link>
          <p>Mandarin listening and speaking practice for intermediate learners.</p>
        </div>
        <Link href="/free-lesson">Free lesson <ArrowRight aria-hidden="true" /></Link>
      </footer>
    </main>
  );
}
