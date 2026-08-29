"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

const phrase = "听起来不错";

export function PhrasePlayer() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  function togglePlayback() {
    if (!("speechSynthesis" in window)) return;

    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = "zh-CN";
    utterance.rate = 0.82;
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setPlaying(true);
  }

  return (
    <div className="phrase-player">
      <div>
        <span>TRY A NATURAL PHRASE</span>
        <strong lang="zh-CN">听起来不错</strong>
        <p>Tīng qǐlái búcuò</p>
        <small>That sounds good.</small>
      </div>
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={playing ? "Stop phrase playback" : "Play Mandarin phrase"}
        aria-pressed={playing}
      >
        {playing ? <Pause aria-hidden="true" fill="currentColor" /> : <Play aria-hidden="true" fill="currentColor" />}
      </button>
    </div>
  );
}
