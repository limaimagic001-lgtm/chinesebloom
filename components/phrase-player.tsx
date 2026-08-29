"use client";

import { AudioWaveform, Pause, Play, Volume2 } from "lucide-react";
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
      <span className="player-label">Play the conversation</span>
      <div className="player-audio-row">
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? "Stop phrase playback" : "Play Mandarin phrase"}
          aria-pressed={playing}
        >
          {playing ? <Pause aria-hidden="true" fill="currentColor" /> : <Play aria-hidden="true" fill="currentColor" />}
        </button>
        <AudioWaveform className="player-waveform" aria-hidden="true" />
        <small>{playing ? "0:01" : "0:00"} / 0:02</small>
      </div>
      <div className="player-phrase">
        <strong lang="zh-CN">听起来不错 <Volume2 aria-hidden="true" /></strong>
        <p>Tīng qǐlái búcuò</p>
        <small>That sounds good.</small>
      </div>
      <ol className="player-method" aria-label="Lesson preview steps">
        <li className="is-current"><span>1</span> Listen</li>
        <li><span>2</span> Dictate</li>
        <li><span>3</span> Shadow</li>
        <li><span>4</span> Retell</li>
      </ol>
    </div>
  );
}
