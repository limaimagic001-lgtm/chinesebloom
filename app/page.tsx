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
  { number: "01", title: "Listen", indicator: "Tune your ear", lead: "Listen raw.", copy: "Train your ears on real, unscripted native conversations—no text safety net.", icon: Ear },
  { number: "02", title: "Dictate", indicator: "Catch the gaps", lead: "Catch the gaps.", copy: "Write what you hear to instantly spot connected speech and blurred sounds.", icon: PencilLine },
  { number: "03", title: "Shadow", indicator: "Match the flow", lead: "Match the rhythm.", copy: "Mimic line-by-line tones, pitch, and cadence until it flows effortlessly.", icon: Mic2 },
  { number: "04", title: "Retell", indicator: "Make it yours", lead: "Speak freely.", copy: "Ditch the script and express the story using your own natural vocabulary.", icon: MessageCircleMore },
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
          <Button asChild className="header-cta"><Link href="/free-lesson">Start Free Lesson</Link></Button>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">MANDARIN LISTENING &amp; SPEAKING PRACTICE · HSK 3–4</p>
            <h1>Hear it clearly.<em>Say it naturally.</em></h1>
            <p className="hero-lead">
              One conversation. Four focused steps. 20 minutes a day.
            </p>
            <div className="hero-actions">
              <Button asChild size="lg" className="primary-cta">
                <Link href="/free-lesson">Start Free Lesson <ArrowRight aria-hidden="true" /></Link>
              </Button>
              <span className="micro-proof"><Check aria-hidden="true" /> No account needed. Start in 10 seconds.</span>
            </div>
            <div className="hero-method-steps" aria-label="ChineseBloom training method">
              {method.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div className="hero-method-step-wrap" key={item.number}>
                    <a className={index === 0 ? "hero-method-step is-current" : "hero-method-step"} href="#method" aria-current={index === 0 ? "step" : undefined}>
                      <span><Icon aria-hidden="true" /></span>
                      <strong>{item.title}</strong>
                      <small>{item.indicator}</small>
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
        <h2 className="section-kicker transformation-kicker" id="transformation-title">FROM UNDERSTANDING TO RESPONDING</h2>
        <article>
          <p className="section-kicker">FROM</p>
          <h3>Stuck in your head</h3>
          <p>You get every word, but freeze the moment you try to answer.</p>
        </article>
        <ArrowRight className="transformation-arrow" aria-hidden="true" />
        <article className="after-card">
          <p className="section-kicker">TO</p>
          <h3>Replying on reflex</h3>
          <p>You hear the tone, catch the meaning, and answer without hesitation.</p>
        </article>
      </section>

      <section className="method-section" id="method">
        <div className="method-landscape" aria-hidden="true" />
        <div className="shell method-content">
          <div className="section-heading">
            <p className="section-kicker">THE CHINESEBLOOM METHOD</p>
            <h2>From listening to native reflex.</h2>
            <p>Four guided steps to bridge the gap between understanding and speaking.</p>
          </div>
          <div className="method-grid">
            {method.map((item) => {
              const Icon = item.icon;
              return (
                <article className="method-card" key={item.number}>
                  <div className="method-topline"><span>{item.number}</span><Icon aria-hidden="true" /></div>
                  <h3>{item.title}</h3>
                  <p><strong>{item.lead}</strong> {item.copy}</p>
                </article>
              );
            })}
          </div>
          <div className="method-cta">
            <div>
              <p className="section-kicker">GET STARTED FOR FREE</p>
              <h2>Speak Mandarin naturally in your next conversation.</h2>
              <p>Take the 20-minute sample lesson. Includes Mandarin audio, instant dictation feedback, and guided speaking prompts.</p>
            </div>
            <div>
              <Button asChild size="lg" className="primary-cta">
                <Link href="/free-lesson">Try the Free Lesson Now <ArrowRight aria-hidden="true" /></Link>
              </Button>
              <span>No credit card. No sign-up required.</span>
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
