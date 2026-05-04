# JTBD Statement Checker

A Jobs-To-Be-Done statement checker. Type or paste a statement (or upload a screenshot of one), and Sipsy the Milkshake reacts with a verdict and explanation drawn from JTBD theory.

Originally built as a Claude artifact, ported to a self-hosted Next.js app so it can be shared publicly.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind v4
- Anthropic Claude API (Sonnet 4.6 for analysis, Haiku 4.5 for image OCR)
- Hosted on Vercel

## Local development

```bash
npm install
cp .env.example .env.local   # then paste your Anthropic API key
npm run dev
```

Open http://localhost:3000.

The `dev` script unsets `ANTHROPIC_API_KEY` and `ANTHROPIC_BASE_URL` from the parent shell before starting Next, because Claude Code sets those env vars and they would otherwise override `.env.local`.

## Routes

- `/` — main JTBD checker
- `/playground` — Sipsy animation playground
- `/api/analyze` — POST `{ statement }` → `{ verdict, label, issues, explanation, rewrite, school_note }`
- `/api/extract` — POST `{ base64, mediaType }` → `{ text }`

## Cost / abuse protection

- **Anthropic spend cap:** set in the Anthropic console (the real backstop)
- **Per-IP rate limit:** 10 req/hour, in-memory per serverless instance ([src/lib/rate-limit.ts](src/lib/rate-limit.ts))
- **Input length cap:** 2000 chars on text, 8 MB on base64 images
- **Image MIME allowlist:** PNG / JPEG / WebP / GIF only

The rate limiter is per-instance, so a determined abuser routing across cold-starts could exceed the per-IP cap. The Anthropic spend cap is the hard backstop.

## Reference

The original single-file React components used in the Claude artifact are preserved in `reference/` (gitignored). The research notes that informed the system prompt are in `research-report.md`.
