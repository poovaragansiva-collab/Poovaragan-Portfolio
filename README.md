# Poovaragan S — Portfolio

Premium dark / crystal-glass / gold portfolio built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide**.
Fully static — no backend, no database, no CMS.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Deployable directly to Vercel (static output).

## Add your photo

Drop your portrait at:

```
public/profile.jpg
```

That's the only step. `ProfileImage` loads it automatically and falls back to an
elegant crystal placeholder if the file is missing.
A square image (at least 800×800) works best.

## Edit content

All copy lives in local data files — no code changes required:

| File                | What it controls                                            |
| ------------------- | ----------------------------------------------------------- |
| `src/data/site.ts`  | Name, contact links, hero copy, about, focus areas, journey, highlights |
| `src/data/projects.ts` | Project showcase, filters and case-study details          |
| `src/data/skills.ts`   | Skill categories and chips                               |

> `src/data/projects.ts` contains a `TODO` for the exact **SJ TailorOS**
> repository URL — replace it once the repo is public.

## Design system

- Background: `#050505 / #080808 / #0C0C0C`
- Glass: `rgba(255,255,255,0.04–0.07)` with `1px` white borders + backdrop blur
- Text: `#F5F5F5` primary, `#A1A1A1` secondary
- Gold accent only: `#D4AF37`, highlight `#F5D76E`
- Fonts: Manrope (UI) + JetBrains Mono (technical labels)

Utility classes `.glass`, `.sheen`, `.gold-text`, `.grid-faint`, `.noise` are
defined in `src/index.css`.

## Accessibility

- Semantic landmarks and heading hierarchy
- Keyboard-navigable nav, filters and project modal (Esc to close)
- Visible gold focus rings
- Full `prefers-reduced-motion` support (animations and custom cursor disabled)
