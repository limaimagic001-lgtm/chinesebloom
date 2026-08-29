"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CirclePause,
  CirclePlay,
  Info,
  Pause,
  Play,
  RotateCcw,
  Square,
  TimerReset,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Line = {
  speaker: string;
  hanzi: string;
  pinyin: string;
  english: string;
};

const dialogue: Line[] = [
  { speaker: "小林", hanzi: "你周末有什么安排？", pinyin: "Nǐ zhōumò yǒu shénme ānpái?", english: "What are your plans for the weekend?" },
  { speaker: "美雅", hanzi: "还没想好。最近一直下雨，我本来想去爬山，又怕天气不好。", pinyin: "Hái méi xiǎng hǎo. Zuìjìn yìzhí xiàyǔ, wǒ běnlái xiǎng qù páshān, yòu pà tiānqì bù hǎo.", english: "I haven't decided. It has been raining lately. I wanted to hike, but I'm worried about the weather." },
  { speaker: "小林", hanzi: "我看了天气预报，星期六下午应该会放晴。", pinyin: "Wǒ kàn le tiānqì yùbào, xīngqīliù xiàwǔ yīnggāi huì fàngqíng.", english: "I checked the forecast. It should clear up on Saturday afternoon." },
  { speaker: "美雅", hanzi: "那我们上午先去逛市场，下午再去江边骑车，怎么样？", pinyin: "Nà wǒmen shàngwǔ xiān qù guàng shìchǎng, xiàwǔ zài qù jiāngbiān qíchē, zěnmeyàng?", english: "Then how about visiting the market in the morning and cycling by the river in the afternoon?" },
  { speaker: "小林", hanzi: "听起来不错。那个市场远吗？", pinyin: "Tīng qǐlái búcuò. Nàge shìchǎng yuǎn ma?", english: "That sounds good. Is the market far?" },
  { speaker: "美雅", hanzi: "不远，坐地铁大概二十分钟。听说那里的早餐特别好吃。", pinyin: "Bù yuǎn, zuò dìtiě dàgài èrshí fēnzhōng. Tīngshuō nàli de zǎocān tèbié hǎochī.", english: "No, about twenty minutes by subway. I heard the breakfast there is especially good." },
  { speaker: "小林", hanzi: "那要早点儿出发，不然人太多，可能要排很久的队。", pinyin: "Nà yào zǎodiǎnr chūfā, bùrán rén tài duō, kěnéng yào pái hěn jiǔ de duì.", english: "Then we should leave early, or it may be crowded and we could wait in line for a long time." },
  { speaker: "美雅", hanzi: "八点半见可以吗？我怕我起不来。", pinyin: "Bā diǎn bàn jiàn kěyǐ ma? Wǒ pà wǒ qǐbulái.", english: "Can we meet at eight thirty? I'm afraid I won't be able to get up." },
  { speaker: "小林", hanzi: "你不是说想改掉睡懒觉的习惯吗？这正好是个机会。", pinyin: "Nǐ bú shì shuō xiǎng gǎidiào shuì lǎnjiào de xíguàn ma? Zhè zhènghǎo shì ge jīhuì.", english: "Didn't you say you wanted to stop sleeping in? This is the perfect opportunity." },
  { speaker: "美雅", hanzi: "好吧，那你记得给我发消息。", pinyin: "Hǎo ba, nà nǐ jìde gěi wǒ fā xiāoxi.", english: "All right. Remember to message me." },
  { speaker: "小林", hanzi: "没问题。对了，如果下午还是下雨，我们就去附近的博物馆。", pinyin: "Méi wèntí. Duì le, rúguǒ xiàwǔ háishi xiàyǔ, wǒmen jiù qù fùjìn de bówùguǎn.", english: "No problem. By the way, if it is still raining, we'll go to the nearby museum." },
  { speaker: "美雅", hanzi: "可以。我一直想去看看，只是听说周末票很难订。", pinyin: "Kěyǐ. Wǒ yìzhí xiǎng qù kànkan, zhǐshì tīngshuō zhōumò piào hěn nán dìng.", english: "Sure. I've always wanted to go, but I heard weekend tickets are hard to book." },
  { speaker: "小林", hanzi: "我现在就查一下。既然决定了，就先把票订好吧。", pinyin: "Wǒ xiànzài jiù chá yíxià. Jìrán juédìng le, jiù xiān bǎ piào dìng hǎo ba.", english: "I'll check now. Since we've decided, let's book the tickets first." },
  { speaker: "美雅", hanzi: "太好了。那周六见，希望别再下雨了。", pinyin: "Tài hǎo le. Nà zhōuliù jiàn, xīwàng bié zài xiàyǔ le.", english: "Great. See you Saturday. I hope it stops raining." },
];

const steps = ["Listen", "Dictate", "Shadow", "Retell"];
const fullTranscript = dialogue.map((line) => line.hanzi).join("");

export function normalizeChinese(value: string) {
  return value.replace(/[\s\p{P}\p{S}]/gu, "").toLowerCase();
}

function levenshtein(a: string, b: string) {
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    let corner = previous[0];
    previous[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const upper = previous[j];
      previous[j] = a[i - 1] === b[j - 1]
        ? corner
        : Math.min(previous[j - 1], upper, corner) + 1;
      corner = upper;
    }
  }
  return previous[b.length];
}

export function scoreDictation(value: string) {
  const answer = normalizeChinese(fullTranscript);
  const attempt = normalizeChinese(value);
  if (!attempt) return 0;
  const distance = levenshtein(answer, attempt);
  return Math.max(0, Math.round((1 - distance / Math.max(answer.length, attempt.length)) * 100));
}

export function FreeLesson() {
  const [step, setStep] = useState(0);
  const [speed, setSpeed] = useState(0.9);
  const [dictation, setDictation] = useState("");
  const [checked, setChecked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [retellNotes, setRetellNotes] = useState("");
  const [complete, setComplete] = useState(false);
  const playToken = useRef(0);

  const score = checked ? scoreDictation(dictation) : 0;

  useEffect(() => {
    const saved = window.localStorage.getItem("chinesebloom:v1:free-dictation");
    const savedNotes = window.localStorage.getItem("chinesebloom:v1:free-retell");
    const id = window.setTimeout(() => {
      if (saved) setDictation(saved);
      if (savedNotes) setRetellNotes(savedNotes);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!timerRunning) return;
    const id = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [timerRunning]);

  useEffect(() => () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  function stopAudio() {
    playToken.current += 1;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }

  function playLines(start = 0, singleLine = false) {
    if (!("speechSynthesis" in window)) return;
    stopAudio();
    const token = playToken.current;
    const voices = window.speechSynthesis.getVoices().filter((voice) =>
      /^zh[-_]/i.test(voice.lang),
    );

    const speakIndex = (index: number) => {
      if (token !== playToken.current || index >= dialogue.length) {
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(dialogue[index].hanzi);
      utterance.lang = "zh-CN";
      utterance.rate = speed;
      utterance.pitch = dialogue[index].speaker === "小林" ? 0.94 : 1.06;
      if (voices.length) utterance.voice = voices[index % Math.min(voices.length, 2)];
      utterance.onend = () => {
        if (singleLine) setIsSpeaking(false);
        else speakIndex(index + 1);
      };
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    };

    speakIndex(start);
  }

  function pauseAudio() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
  }

  function resumeAudio() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.resume();
    setIsPaused(false);
  }

  function saveDictation(value: string) {
    setDictation(value);
    setChecked(false);
    window.localStorage.setItem("chinesebloom:v1:free-dictation", value);
  }

  function saveRetell(value: string) {
    setRetellNotes(value);
    window.localStorage.setItem("chinesebloom:v1:free-retell", value);
  }

  function goToStep(nextStep: number) {
    stopAudio();
    setStep(Math.min(3, Math.max(0, nextStep)));
  }

  const timer = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <Tabs value={String(step)} onValueChange={(value) => goToStep(Number(value))}>
      <div className="lesson-shell shell">
        <aside className="lesson-sidebar">
          <span className="lesson-label">Free lesson · HSK 3–4</span>
          <h1>周末去哪儿？</h1>
          <p>Making weekend plans when the weather may change</p>
          <Progress className="lesson-progress" value={(step + 1) * 25} aria-label={`Lesson ${(step + 1) * 25}% complete`} />
          <TabsList className="lesson-step-list" aria-label="Lesson steps">
            {steps.map((label, index) => (
              <TabsTrigger className="lesson-step-button" value={String(index)} key={label}>
                <span className="step-number">{index + 1}</span>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </aside>

        <section className="lesson-workspace">
          <TabsContent value="0">
            <div className="lesson-stage-head">
              <div>
                <span className="lesson-label">Round 1 · Intensive listening</span>
                <h2>Listen before you read.</h2>
              </div>
              <span className="stage-time">About 4 minutes</span>
            </div>
            <div className="practice-card audio-stage">
              <span className="lesson-label">Transcript hidden</span>
              <h3>Focus on the situation, not every word.</h3>
              <p>Listen once for the main idea. Listen again and notice where one word seems to connect to the next.</p>
              <div className="audio-controls">
                <Button onClick={() => playLines()} disabled={isSpeaking && !isPaused}>
                  <Play aria-hidden="true" fill="currentColor" /> Play conversation
                </Button>
                {isSpeaking && !isPaused && (
                  <Button variant="secondary" onClick={pauseAudio}><Pause aria-hidden="true" /> Pause</Button>
                )}
                {isSpeaking && isPaused && (
                  <Button variant="secondary" onClick={resumeAudio}><CirclePlay aria-hidden="true" /> Resume</Button>
                )}
                <Button variant="secondary" onClick={stopAudio}><Square aria-hidden="true" fill="currentColor" /> Stop</Button>
                <label>
                  <span className="sr-only">Playback speed</span>
                  <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>
                    <option value="0.75">0.75×</option>
                    <option value="0.9">0.9×</option>
                    <option value="1">1.0×</option>
                  </select>
                </label>
              </div>
              <p className="browser-note">Uses a Mandarin voice available in your browser. Playback starts only after you press play.</p>
            </div>
            <div className="instruction-list">
              <div className="instruction-item"><span>1</span>First listen: identify who is speaking and what they are deciding.</div>
              <div className="instruction-item"><span>2</span>Second listen: catch time, transport, weather, and the backup plan.</div>
            </div>
          </TabsContent>

          <TabsContent value="1">
            <div className="lesson-stage-head">
              <div>
                <span className="lesson-label">Round 2 · Chinese dictation</span>
                <h2>Write what you hear.</h2>
              </div>
              <span className="stage-time">About 7 minutes</span>
            </div>
            <div className="practice-card">
              <p>Replay the conversation as often as you need. Leave a blank when you are unsure, then keep moving.</p>
              <div className="audio-controls" style={{ color: "var(--ink)" }}>
                <Button onClick={() => playLines()}><Play aria-hidden="true" fill="currentColor" /> Replay Mandarin</Button>
                <label>
                  <span className="sr-only">Playback speed</span>
                  <select className="light-select" value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>
                    <option value="0.75">0.75×</option>
                    <option value="0.9">0.9×</option>
                    <option value="1">1.0×</option>
                  </select>
                </label>
                <Button variant="outline" onClick={stopAudio}><Square aria-hidden="true" /> Stop</Button>
              </div>
              <textarea
                className="practice-textarea"
                aria-label="Chinese dictation"
                placeholder="Type the Chinese you hear here…"
                value={dictation}
                onChange={(event) => saveDictation(event.target.value)}
              />
              <div className="dictation-actions">
                <span className="micro-proof">Punctuation and spaces do not affect your score.</span>
                <Button onClick={() => setChecked(true)} disabled={!dictation.trim()}>Check my dictation</Button>
              </div>
              {checked && (
                <>
                  <div className="feedback-box" role="status">
                    <div className="score-ring">{score}%</div>
                    <div>
                      <strong>{score >= 85 ? "Strong listening." : score >= 60 ? "Good first pass." : "You found the difficult parts."}</strong>
                      <p>Compare your version with the transcript. Focus on missing words and sentence endings before replaying once more.</p>
                    </div>
                  </div>
                  <div className="reference-transcript">
                    <strong>Full transcript</strong>
                    <p>{fullTranscript}</p>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="2">
            <div className="lesson-stage-head">
              <div>
                <span className="lesson-label">Round 3 · Shadowing</span>
                <h2>Copy the rhythm, line by line.</h2>
              </div>
              <span className="stage-time">About 5 minutes</span>
            </div>
            <div className="shadow-tip"><Info aria-hidden="true" />Use 0.75× for your first round. Then switch to 1.0× and speak almost at the same time as the voice.</div>
            <div className="practice-card">
              <Tabs defaultValue="hanzi" className="transcript-tabs">
                <TabsList aria-label="Transcript view">
                  <TabsTrigger value="hanzi">汉字 Hanzi</TabsTrigger>
                  <TabsTrigger value="pinyin">拼音 Pinyin</TabsTrigger>
                  <TabsTrigger value="english">English</TabsTrigger>
                </TabsList>
                {(["hanzi", "pinyin", "english"] as const).map((mode) => (
                  <TabsContent value={mode} key={mode}>
                    <div className="transcript-list">
                      {dialogue.map((line, index) => (
                        <div className="transcript-line" key={`${mode}-${index}`}>
                          <span className="speaker-name">{line.speaker}</span>
                          <span className={`line-copy ${mode}`}>{line[mode]}</span>
                          <button className="line-play" type="button" onClick={() => playLines(index, true)} aria-label={`Play line ${index + 1}`}>
                            <Play aria-hidden="true" fill="currentColor" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
              <div className="audio-controls light-controls">
                <Button onClick={() => playLines()}><Play aria-hidden="true" fill="currentColor" /> Shadow full conversation</Button>
                <label>
                  <span className="sr-only">Playback speed</span>
                  <select className="light-select" value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>
                    <option value="0.75">0.75×</option>
                    <option value="0.9">0.9×</option>
                    <option value="1">1.0×</option>
                  </select>
                </label>
                <Button variant="outline" onClick={stopAudio}><Square aria-hidden="true" /> Stop</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="3">
            <div className="lesson-stage-head">
              <div>
                <span className="lesson-label">Round 4 · Retelling</span>
                <h2>Now make the story yours.</h2>
              </div>
              <span className="stage-time">About 4 minutes</span>
            </div>
            <div className="retell-prompts">
              <div className="retell-prompt"><span>BEGINNING</span><p>What did they first want to do, and what was the problem?</p></div>
              <div className="retell-prompt"><span>NEW PLAN</span><p>Where will they go, how will they get there, and when?</p></div>
              <div className="retell-prompt"><span>BACKUP</span><p>What will they do if the weather does not improve?</p></div>
            </div>
            <div className="timer-card">
              <div>
                <span className="lesson-label timer-label">Speaking timer</span>
                <strong>{timer}</strong>
              </div>
              <div className="retell-actions">
                <Button variant="secondary" onClick={() => setTimerRunning((value) => !value)}>
                  {timerRunning ? <CirclePause aria-hidden="true" /> : <CirclePlay aria-hidden="true" />}
                  {timerRunning ? "Pause" : seconds ? "Continue" : "Start speaking"}
                </Button>
                <Button variant="secondary" onClick={() => { setTimerRunning(false); setSeconds(0); }}><TimerReset aria-hidden="true" /> Reset</Button>
              </div>
            </div>
            <textarea
              className="practice-textarea"
              aria-label="Retelling notes"
              placeholder="After speaking, note the words you needed but could not recall…"
              value={retellNotes}
              onChange={(event) => saveRetell(event.target.value)}
            />
            {!complete ? (
              <div className="dictation-actions">
                <span className="micro-proof">Aim for 45–90 seconds without reading.</span>
                <Button onClick={() => { setComplete(true); setTimerRunning(false); }}>Finish lesson <Check aria-hidden="true" /></Button>
              </div>
            ) : (
              <div className="complete-card" role="status">
                <div className="complete-icon"><Check aria-hidden="true" /></div>
                <div><h3>Lesson complete</h3><p>You turned one natural conversation into language you can reuse. Come back tomorrow and retell it once more.</p></div>
              </div>
            )}
          </TabsContent>

          <div className="lesson-actions">
            <Button variant="outline" onClick={() => goToStep(step - 1)} disabled={step === 0}><ArrowLeft aria-hidden="true" /> Previous</Button>
            {step < 3 ? (
              <Button onClick={() => goToStep(step + 1)}>Next round <ArrowRight aria-hidden="true" /></Button>
            ) : (
              <Button variant="outline" onClick={() => { setStep(0); setComplete(false); setSeconds(0); }}><RotateCcw aria-hidden="true" /> Practice again</Button>
            )}
          </div>
        </section>
      </div>
    </Tabs>
  );
}
