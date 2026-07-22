# Poovaragan S — Premium Portfolio

A premium, founder-grade portfolio built with Next.js 15, TypeScript, Tailwind CSS,
Framer Motion, React Three Fiber, and an integrated AI assistant with MongoDB-backed
lead capture.

See `ARCHITECTURE.md` for the full design system, component hierarchy, database
schema, AI assistant architecture, and implementation roadmap.

## Quick Start

```bash
npm install
cp .env.example .env.local   # fill in your real values
npm run dev
```

Open http://localhost:3000

## Required services

| Service | Purpose | Where to get it |
|---|---|---|
| MongoDB Atlas | Leads, chat sessions, contact submissions | https://www.mongodb.com/cloud/atlas |
| OpenRouter | Powers the AI assistant | https://openrouter.ai |
| Resend (optional) | Email notifications on new leads | https://resend.com |

Fill these into `.env.local` (see `.env.example` for the full list).

## What's implemented

- Full page: Hero (with 3D glass-sphere scene), About, Expertise, Projects,
  Services, AI Lab, Technical Writing, AI Assistant showcase, Resume, Contact
- Floating AI assistant (bottom-right, global) with streaming responses via
  `/api/chat`, suggested prompts, and inline lead capture on hiring intent
- `/api/leads` and `/api/contact` routes writing to MongoDB + optional email
  notification
- Glassmorphism `ProfilePhoto` component used in both Hero and About, with
  graceful fallback to an avatar icon if no photo is supplied yet
- 3D hero scene (React Three Fiber) that auto-disables on mobile / reduced-motion
  in favor of a static ambient glow
- Fully responsive, keyboard-accessible, `prefers-reduced-motion`-aware

## Adding your real profile photo

Drop your photo into `/public/images/profile.jpg`, then pass it to both
`ProfilePhoto` usages:

```tsx
<ProfilePhoto src="/images/profile.jpg" size="hero" />
```

in `components/hero/HeroSection.tsx` and `components/about/AboutSection.tsx`.

## Adding your resume

Drop your PDF into `/public/resume/Poovaragan-S-Resume.pdf` (path already
wired up in `lib/data/profile.ts` → `links.resumeUrl`).

## Filling in real project/writing content

All content lives in `lib/data/*.ts` — plain typed arrays, no CMS required.
Edit `projects.ts`, `services.ts`, `experiments.ts`, and `writing.ts` directly.
These files also feed the AI assistant's knowledge (`lib/ai/systemPrompt.ts`),
so updating them updates what the assistant knows automatically.

## Deployment (Vercel)

1. Push this repo to GitHub
2. Import into Vercel
3. Add the environment variables from `.env.example` in the Vercel dashboard
4. Deploy — done

## Notes

- The Geist display font falls back to Inter unless you add real Geist font
  files; swap `app/layout.tsx`'s `geist` const for `next/font/google`'s Geist
  export if/when available in your Next.js version.
- `MeshDistortMaterial` (drei) is used for the hero sphere — swap for
  `MeshTransmissionMaterial` for a heavier true-glass refraction look if your
  performance budget allows.
