import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Ear,
  MessageCircleMore,
  Mic2,
  PencilLine,
} from "lucide-react";

import { PhrasePlayer } from "@/components/phrase-player";
import { Button } from "@/components/ui/button";

const method = [
  { number: "01", title: "Listen", copy: "Hear one natural conversation in context. No transcript yet.", icon: Ear },
  { number: "02", title: "Dictate", copy: "Write what you hear and notice exactly where speech blurred.", icon: PencilLine },
  { number: "03", title: "Shadow", copy: "Copy the tones, rhythm, and connected speech line by line.", icon: Mic2 },
  { number: "04", title: "Retell", copy: "Put the transcript away and express the idea in your own words.", icon: MessageCircleMore },
];

export default function Home() {
  return (
    <main className="home-page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="ChineseBloom home">
          <Image className="brand-mark-image" src="/chinesebloom-mark.svg" alt="" width={42} height={42} />
          <span>ChineseBloom</span>
        </Link>
        <nav className="header-links" aria-label="Main navigation">
          <a href="#method">How it works</a>
          <Link href="/free-lesson">Free lesson</Link>
          <Button asChild className="header-cta"><Link href="/free-lesson">Start the free lesson</Link></Button>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">MANDARIN LISTENING &amp; SPEAKING PRACTICE · HSK 3–4</p>
            <h1>Understand Mandarin.<em>Speak it naturally.</em></h1>
            <p className="hero-lead">
              One natural conversation. Four focused steps. Twenty minutes.
            </p>
            <div className="hero-actions">
              <Button asChild size="lg" className="primary-cta">
                <Link href="/free-lesson">Start the free lesson <ArrowRight aria-hidden="true" /></Link>
              </Button>
              <span className="micro-proof"><Check aria-hidden="true" /> No account needed</span>
            </div>
            <div className="hero-method-steps" aria-label="ChineseBloom training method">
              {method.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div className="hero-method-step-wrap" key={item.number}>
                    <a className={index === 0 ? "hero-method-step is-current" : "hero-method-step"} href="#method" aria-current={index === 0 ? "step" : undefined}>
                      <span><Icon aria-hidden="true" /></span>
                      <strong>{item.title}</strong>
                    </a>
                    {index < method.length - 1 ? <ArrowRight className="hero-step-arrow" aria-hidden="true" /> : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hero-visual">
            <Image
              src="/chinesebloom-song-teahouse.webp"
              alt="A Mandarin tutor and an intermediate learner having a natural conversation over tea"
              fill
              sizes="(max-width: 800px) 100vw, 58vw"
              priority
            />
            <PhrasePlayer />
          </div>
        </div>
      </section>

      <section className="transformation shell" aria-labelledby="transformation-title">
        <h2 className="sr-only" id="transformation-title">From understanding to responding</h2>
        <article>
          <p className="section-kicker">FROM</p>
          <h3>Understanding every word</h3>
          <p>Knowing what was said, but hesitating when it&apos;s your turn.</p>
        </article>
        <ArrowRight className="transformation-arrow" aria-hidden="true" />
        <article className="after-card">
          <p className="section-kicker">TO</p>
          <h3>Responding in the moment</h3>
          <p>Hearing the meaning and answering with natural expression.</p>
        </article>
      </section>

      <section className="method-section" id="method">
        <div className="method-landscape" aria-hidden="true" />
        <div className="shell method-content">
          <div className="section-heading">
            <p className="section-kicker">THE CHINESEBLOOM METHOD</p>
            <h2>One conversation. Four focused steps.</h2>
            <p>Listen closely, write what you hear, shadow the rhythm, then retell it in your own words.</p>
          </div>
          <div className="method-grid">
            {method.map((item) => {
              const Icon = item.icon;
              return (
                <article className="method-card" key={item.number}>
                  <div className="method-topline"><span>{item.number}</span><Icon aria-hidden="true" /></div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              );
            })}
          </div>
          <div className="method-cta">
            <div>
              <p className="section-kicker">FREE LESSON · WEEKEND PLANS</p>
              <h2>Turn understanding into natural expression.</h2>
              <p>Start with a complete HSK 3–4 lesson—audio, transcript, pinyin, feedback, and speaking practice included.</p>
            </div>
            <div>
              <Button asChild size="lg" className="primary-cta">
                <Link href="/free-lesson">Try the free 20-minute lesson <ArrowRight aria-hidden="true" /></Link>
              </Button>
              <span>No account. No card. Start immediately.</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer shell">
        <div>
          <Link className="brand" href="/">
            <Image className="brand-mark-image" src="/chinesebloom-mark.svg" alt="" width={38} height={38} />
            <span>ChineseBloom</span>
          </Link>
          <p>Mandarin listening and speaking practice for intermediate learners.</p>
        </div>
        <Link href="/free-lesson">Free lesson <ArrowRight aria-hidden="true" /></Link>
      </footer>

      <div className="mobile-conversion-bar">
        <span><strong>Free HSK 3–4 lesson</strong><small>No sign-up · 20 min</small></span>
        <Button asChild className="header-cta"><Link href="/free-lesson">Start now</Link></Button>
      </div>
    </main>
  );
}
