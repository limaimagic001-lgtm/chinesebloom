# ChineseBloom

Mandarin listening and speaking practice for intermediate learners.

ChineseBloom helps HSK 3–4 learners move from textbook Chinese to natural
conversation through a focused 20-minute loop:

1. Intensive listening
2. Chinese dictation and correction
3. Shadowing
4. Retelling

## Included in the MVP

- English landing page
- One complete free Mandarin lesson
- Browser-based Mandarin playback with three speeds
- Character-level dictation scoring
- Hanzi, pinyin, and English transcript views
- Line-by-line shadowing
- Speaking timer and device-local lesson notes
- Responsive layouts, metadata, robots.txt, and sitemap.xml

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm test
```

The production build is configured for Vercel through `vercel.json`.
