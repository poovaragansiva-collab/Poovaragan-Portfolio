# Poovaragan S — Premium Portfolio
## Full Architecture, Design System & Implementation Plan

---

## 1. Design System

### 1.1 Brand Token System

**Color Palette**
| Token | Hex | Usage |
|---|---|---|
| `--bg-primary` | `#08090B` | Deep black base |
| `--bg-elevated` | `#101215` | Cards, panels |
| `--fg-primary` | `#F5F5F2` | Off-white text |
| `--fg-muted` | `#9A9CA3` | Secondary text |
| `--accent` | `#2E6FFF` | Electric blue — CTAs, links, glow |
| `--accent-soft` | `#2E6FFF1A` | 10% opacity accent for glass fills |
| `--border` | `#FFFFFF14` | Hairline borders (8% white) |
| `--success` | `#3ECF8E` | Availability / status indicators |

Glassmorphism recipe used throughout: `background: rgba(255,255,255,0.04)`, `backdrop-filter: blur(20px)`, `border: 1px solid rgba(255,255,255,0.08)`, subtle inset highlight on top edge.

**Typography**
- Display: **Geist** (variable weight 500–700) — used for headlines only, tight tracking (-0.02em), large sizes
- Body: **Inter** — 400/500, generous line-height (1.6) for readability
- Mono/Utility: **JetBrains Mono** — for labels, code snippets, tech tags, timestamps ("2025", "PYTHON", stat labels)

Scale: 12 / 14 / 16 / 18 / 24 / 32 / 48 / 64 / 96px, using `clamp()` for fluid hero sizes.

**Layout**
- Max content width: 1200px, generous 96–160px vertical section padding on desktop
- 8px base spacing grid
- Signature element: a **single mouse-reactive glass sphere with orbiting particles** in the hero — not a "playground," one deliberate 3D moment that anchors the brand (systems + intelligence + precision), then 3D recedes to ambient/quiet accents elsewhere (subtle particle field behind AI Lab, depth-parallax cards).

### 1.2 Motion Principles
- Page load: staggered fade+rise (headline → subhead → CTAs → visual), 400–600ms, ease `[0.16, 1, 0.3, 1]`
- Scroll reveals: `IntersectionObserver`-driven fade+rise per section, one-time trigger
- Hover: 150–200ms micro-interactions only (lift 4px, border glow, cursor-follow highlight on cards)
- Respect `prefers-reduced-motion`: disable 3D parallax + particle motion, keep only opacity fades

---

## 2. Site Structure & Component Hierarchy

```
app/
├─ layout.tsx                      # Root layout, fonts, providers, FloatingAssistant mount
├─ page.tsx                        # Home — composes all sections
├─ projects/[slug]/page.tsx        # Individual project deep-dive pages
├─ writing/[slug]/page.tsx         # Individual article/writing sample pages
├─ api/
│  ├─ chat/route.ts                # AI assistant — OpenRouter streaming endpoint
│  ├─ leads/route.ts               # Lead capture → MongoDB + email notify
│  └─ contact/route.ts             # Contact form submission
│
components/
├─ layout/
│  ├─ Navbar.tsx                   # Sticky, glass, scroll-aware
│  ├─ Footer.tsx
│  └─ SectionWrapper.tsx           # Consistent spacing/reveal wrapper
│
├─ hero/
│  ├─ HeroSection.tsx
│  ├─ HeroScene.tsx                # R3F canvas: glass sphere + particles
│  └─ ProfilePhoto.tsx             # Reusable glass-framed photo (hero + about)
│
├─ about/AboutSection.tsx
├─ expertise/
│  ├─ ExpertiseSection.tsx
│  └─ ExpertiseCategoryCard.tsx
│
├─ projects/
│  ├─ ProjectsSection.tsx
│  └─ ProjectCard.tsx              # Flip/hover reveal: problem→solution→stack
│
├─ services/
│  ├─ ServicesSection.tsx
│  └─ ServiceCard.tsx              # Ready for future price slot
│
├─ ai-lab/
│  ├─ AILabSection.tsx
│  └─ ExperimentCard.tsx
│
├─ writing/
│  ├─ WritingSection.tsx
│  └─ ArticleCard.tsx              # Placeholder-friendly CMS-ready card
│
├─ ai-assistant-showcase/
│  └─ AIAssistantSection.tsx       # Full-page explainer, not the widget itself
│
├─ assistant/
│  ├─ FloatingAssistant.tsx        # Global chat bubble + panel
│  ├─ ChatWindow.tsx
│  ├─ MessageBubble.tsx
│  ├─ SuggestedPrompts.tsx
│  └─ LeadCaptureForm.tsx          # Inline chat-embedded form
│
├─ resume/ResumeSection.tsx
├─ contact/
│  ├─ ContactSection.tsx
│  └─ ContactForm.tsx
│
└─ ui/                             # shadcn/ui primitives (button, card, input, dialog, badge...)

lib/
├─ mongodb.ts                      # Connection singleton
├─ openrouter.ts                   # AI client + system prompt
├─ email.ts                        # Notification sender
├─ validations.ts                  # zod schemas
└─ data/
   ├─ projects.ts
   ├─ services.ts
   ├─ experiments.ts
   └─ writing.ts

models/ (Mongoose or typed collections)
├─ Lead.ts
├─ ChatSession.ts
└─ ContactSubmission.ts
```

---

## 3. Page Flow (Home)

```
┌─────────────────────────────────────────┐
│ Navbar (sticky, glass, blur-on-scroll)   │
├─────────────────────────────────────────┤
│ HERO                                     │
│  L: Headline / Subhead / CTAs            │
│  R: ProfilePhoto (glass frame) + 3D scene│
│  BG: particle field, mouse parallax      │
├─────────────────────────────────────────┤
│ ABOUT — story + ProfilePhoto (smaller)   │
├─────────────────────────────────────────┤
│ EXPERTISE — 4 category grid              │
├─────────────────────────────────────────┤
│ PROJECTS — premium cards, 5 projects     │
├─────────────────────────────────────────┤
│ SERVICES — 5 cards, "Request a Quote"    │
├─────────────────────────────────────────┤
│ AI LAB — innovation showcase grid        │
├─────────────────────────────────────────┤
│ TECHNICAL WRITING — article grid         │
├─────────────────────────────────────────┤
│ AI ASSISTANT — full explainer section    │
├─────────────────────────────────────────┤
│ RESUME — download/preview card           │
├─────────────────────────────────────────┤
│ CONTACT — form + email/LinkedIn/GitHub   │
├─────────────────────────────────────────┤
│ Footer                                   │
└─────────────────────────────────────────┘
  [Floating AI Assistant — persists globally, bottom-right]
```

---

## 4. Database Schema (MongoDB Atlas)

### Collection: `leads`
```ts
{
  _id: ObjectId,
  name: string,
  email: string,
  company?: string,
  projectDetails: string,
  source: "chat_assistant" | "contact_form" | "quote_request",
  serviceInterest?: string,       // which service card triggered it
  status: "new" | "contacted" | "closed",
  chatTranscript?: { role: "user"|"assistant", content: string, ts: Date }[],
  createdAt: Date,
  updatedAt: Date
}
```

### Collection: `chat_sessions`
```ts
{
  _id: ObjectId,
  sessionId: string,              // client-generated UUID (localStorage)
  messages: { role: "user"|"assistant", content: string, ts: Date }[],
  leadCaptured: boolean,
  leadId?: ObjectId,
  createdAt: Date
}
```

### Collection: `contact_submissions`
```ts
{
  _id: ObjectId,
  name: string,
  email: string,
  message: string,
  createdAt: Date,
  notified: boolean
}
```

Indexes: `leads.email`, `leads.createdAt desc`, `chat_sessions.sessionId` (unique).

---

## 5. AI Assistant Architecture

**Flow**
```
User message → FloatingAssistant (client)
   → POST /api/chat  { sessionId, message, history }
   → route.ts builds system prompt (bio, projects, services, AI Lab, writing, availability)
   → OpenRouter chat completion (streaming)
   → Response streamed back → rendered token-by-token
   → Intent classifier (lightweight, keyword + LLM-flagged) detects hiring intent
        ("hire", "quote", "budget", "available for freelance", "let's work together")
   → If detected: assistant asks for Name / Email / Company / Project details
        inline in chat (LeadCaptureForm renders as a message bubble)
   → On submit → POST /api/leads → save to MongoDB + send email via lib/email.ts
   → Session persisted to chat_sessions for continuity
```

**System Prompt Contents** (assembled server-side from `lib/data/*`):
- Poovaragan's bio, identity, tagline
- Full project list w/ problem/solution/stack
- Services list
- AI Lab experiments
- Writing samples metadata
- Availability status
- Guardrails: never invent projects/credentials, redirect off-topic questions politely, never share phone number, escalate hiring-intent to lead form

**Suggested prompts** rendered as chips above the input, matching the brief's example questions.

---

## 6. 3D Implementation Strategy

- **Library**: `@react-three/fiber` + `@react-three/drei` (`Float`, `Sphere`, `MeshDistortMaterial`, `Sparkles`/custom `Points`)
- **Hero scene**: one glass-like distorted sphere (`MeshTransmissionMaterial` or `MeshDistortMaterial` fallback for perf) that subtly follows cursor via `useFrame` + lerp; a sparse particle field behind it
- **Performance guardrails**:
  - Lazy-load the R3F canvas with `next/dynamic({ ssr:false })`
  - Cap `dpr` to `[1, 1.5]`
  - Detect low-end device / `prefers-reduced-motion` / mobile viewport → render a static gradient/glow `<div>` instead of canvas
  - `frameloop="demand"` where possible so it only re-renders on interaction
  - No 3D anywhere except Hero (ambient ~) and a lightweight particle CSS/canvas2d layer in AI Lab — not R3F again, to save GPU budget

---

## 7. Animation System

- **Framer Motion** `variants` co-located per component; shared `fadeUp`, `staggerContainer` in `lib/motion.ts`
- Scroll reveals via `whileInView` + `viewport={{ once: true, margin: "-80px" }}`
- Navbar: background blur/opacity interpolated from scroll position via `useScroll`
- Card hover: spring-based lift + border glow (`whileHover`)
- Reduced motion: wrap variants with a check against `useReducedMotion()` from Framer Motion

---

## 8. Responsive Strategy

| Breakpoint | Behavior |
|---|---|
| `< 640px` (mobile) | Single column, ProfilePhoto stacks above hero text, 3D canvas replaced with static glow gradient, nav collapses to sheet menu, floating assistant becomes full-screen sheet on open |
| `640–1024px` (tablet) | 2-column grids for projects/services, 3D canvas active but simplified (fewer particles) |
| `> 1024px` (desktop) | Full experience, 3-column grids, full particle count, side-by-side hero |

Tailwind breakpoints used directly (`sm/md/lg/xl`), container queries for card-internal layout where needed.

---

## 9. Accessibility Strategy

- Semantic landmarks (`<nav>`, `<main>`, `<section aria-label>`, `<footer>`)
- Full keyboard navigation: visible focus rings (accent-colored, 2px offset) on all interactive elements including 3D canvas fallback controls
- Floating assistant: `role="dialog"`, `aria-modal`, focus trap when open, `Esc` to close, returns focus to trigger button
- Color contrast: off-white on deep black exceeds WCAG AAA for body text; accent blue checked against AA on both backgrounds
- All images (incl. ProfilePhoto) require descriptive `alt`; decorative 3D canvas marked `aria-hidden`
- Respect `prefers-reduced-motion` globally (see §6, §7)
- Form errors announced via `aria-live="polite"`

---

## 10. Performance Strategy

- Next.js 15 App Router, RSC by default; only interactive leaves (`HeroScene`, `FloatingAssistant`, forms, cards with hover state) are `"use client"`
- Images via `next/image`, AVIF/WebP, blur placeholders for ProfilePhoto
- Fonts via `next/font` (self-hosted, zero layout shift)
- Code-split heavy libs: R3F canvas and chat UI both `dynamic()` imported
- Edge runtime for `/api/chat` (streaming) where supported; Node runtime for `/api/leads` (Mongoose)
- Target Lighthouse: 95+ Performance, 100 Accessibility/Best Practices/SEO on desktop; 85+ Performance mobile (3D disabled there)

---

## 11. Deployment Strategy

1. **Repo**: GitHub, `main` branch protected, PR previews via Vercel
2. **Vercel project**: connect repo, framework preset Next.js
3. **Environment variables** (Vercel dashboard):
   - `MONGODB_URI`
   - `OPENROUTER_API_KEY`
   - `EMAIL_SERVER` / `EMAIL_FROM` / `EMAIL_TO` (Resend or SMTP)
   - `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (if admin/auth area added later)
4. **MongoDB Atlas**: free/shared cluster to start, network access via Vercel IP allowlist or 0.0.0.0/0 + strong credentials, database `poovaragan_portfolio`
5. Custom domain → Vercel DNS, auto SSL
6. Analytics: Vercel Analytics + optional Plausible for privacy-friendly tracking

---

## 12. Implementation Roadmap

**Phase 1 — Foundation (Week 1)**
- Next.js 15 + TS + Tailwind + shadcn/ui scaffold
- Design tokens, fonts, global layout, Navbar/Footer
- Static Hero + About with ProfilePhoto (no 3D yet)

**Phase 2 — Core Content (Week 2)**
- Expertise, Projects, Services, AI Lab, Writing sections with real/placeholder data
- Resume + Contact sections, contact form → `/api/contact` → MongoDB

**Phase 3 — 3D & Motion (Week 3)**
- R3F hero scene, particle system, scroll-reveal animation pass, reduced-motion handling

**Phase 4 — AI Assistant (Week 4)**
- OpenRouter integration, system prompt from data files, streaming chat UI
- Floating assistant global mount, suggested prompts, AI Assistant showcase section

**Phase 5 — Lead Capture (Week 5)**
- Hiring-intent detection, inline lead form in chat, `/api/leads`, MongoDB persistence, email notifications

**Phase 6 — Polish & Launch (Week 6)**
- Accessibility audit, performance pass, responsive QA across devices, SEO metadata/OG images, Vercel deploy, custom domain

---
