# Wavuno Component Reuse Audit

- Audit date: 2026-08-28
- Wavuno repository: `limaimagic001-lgtm/deep-english`
- Audited Wavuno commit: `dc33418963b72f9851b47f5ed6dd408f9e462761`
- ChineseBloom isolation rule: no Wavuno source file, credential, service, domain, or deployment is modified.

## Reused product patterns

| Wavuno pattern | ChineseBloom decision | Reason |
|---|---|---|
| `Listen → Dictate → Shadow → Retell` progression | Reused | It is the core learning loop and transfers directly to intermediate Mandarin. |
| Browser Speech Synthesis playback and speed control | Reused with `zh-CN` voices | It provides working MVP audio without sharing Wavuno infrastructure or credentials. |
| Transcript hidden during first listening | Reused | It keeps the first round focused on comprehension rather than reading. |
| Language view switching | Adapted to Hanzi / Pinyin / English | Mandarin learners need all three representations. |
| Local progress and notes | Adapted to device-local lesson drafts only | It supports a useful free lesson without authentication or cloud storage. |
| Step navigation and lesson progress | Reimplemented as isolated React components | The behavior is reusable; the Wavuno static HTML/JavaScript implementation is not copied. |

## Deliberately not reused

| Wavuno capability | Decision |
|---|---|
| Supabase authentication | Excluded from ChineseBloom MVP. |
| Stripe billing and paid-access checks | Excluded from ChineseBloom MVP. |
| Cloud sync and training record tables | Excluded from ChineseBloom MVP. |
| Wavuno analytics ID and consent state | Excluded; ChineseBloom analytics will be configured independently later. |
| Wavuno domain, sitemap, verification tags, and deployment configuration | Excluded. |
| Wavuno visual identity and English lesson content | Excluded. |

## ChineseBloom-specific improvements

- Character-level dictation scoring that ignores punctuation and whitespace.
- Line-by-line Mandarin playback for shadowing.
- Hanzi, pinyin, and English transcript views.
- Speaking timer and retelling prompts.
- A fully separate visual identity, codebase, storage state, and deployment target.
