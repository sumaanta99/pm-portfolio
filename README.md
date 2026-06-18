# Sumaanta Munde — Animated PM Portfolio

A high-impact, animated Product Manager portfolio. Built as a living product, not a static resume — 3D hero, scroll-triggered reveals, magnetic buttons, animated metrics, case-study modals, dark/light mode, and buttery smooth scroll.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (CSS variables for theming)
- **Framer Motion** — reveals, stagger, layout animations, micro-interactions
- **Three.js + React Three Fiber + drei** — 3D animated hero blob & particles
- **Lenis** — smooth scroll + anchor easing
- **Vercel Analytics**

## Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

### macOS file-watcher note

If `npm run dev` spams `Watchpack Error: EMFILE: too many open files` and keeps
restarting, your shell's open-file limit is too low. Raise it before running:

```bash
ulimit -n 10240
npm run dev
```

For a permanent fix, install Watchman: `brew install watchman`.
(This only affects the dev watcher — `npm run build` is unaffected.)

## Scripts

| Command         | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Start dev server                |
| `npm run build` | Production build                |
| `npm run start` | Serve the production build      |
| `npm run lint`  | Lint                            |

## Structure

```
src/
  app/            layout (fonts, SEO, JSON-LD), page, globals.css, robots, sitemap
  components/
    providers/    ThemeProvider (dark/light), SmoothScroll (Lenis)
    ui/           Reveal, MagneticButton, AnimatedCounter, SectionHeading, ThemeToggle
    three/        HeroScene (R3F)
    projects/     ProjectCard (3D tilt), ProjectModal (case study)
    Navbar, Hero, About, Projects, Skills, Contact, Footer
  lib/data.ts     single source of truth for all content
```

## Editing content

All copy — profile, projects, timeline, skills, tools — lives in
[`src/lib/data.ts`](src/lib/data.ts). Update there; the UI follows.

## Accessibility & performance

- Respects `prefers-reduced-motion` (Lenis, counters, 3D frameloop, reveals).
- Animations use transform/opacity only; 3D capped DPR for mobile.
- Static-rendered, code-split; 3D scene is client-only via dynamic import.

## Deploy to Vercel

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

Then set the real domain in `siteUrl` (in `src/app/layout.tsx`, `robots.ts`,
`sitemap.ts`) and add your LinkedIn URL in `src/lib/data.ts`.
