# Project Memory - One Piece 2.0

## ⚠️ IMPORTANT — Documentation Location

**Primary project documentation is now in `docs/PROJECT_MEMORY.md` and `docs/PHASE_HISTORY.md`.**

This file is a lightweight index. For full context (protected systems, recovery instructions, phase history, architecture decisions), read the docs directory first.

---

## Quick Reference

- **Type**: React + Vite single-page application
- **Theme**: One Piece anime/manga tribute website
- **Location**: `D:\one-piece2.0\vite-project`
- **Last Updated**: 2026-08-01

## Tech Stack
- **Framework**: React 19.2.7
- **Build Tool**: Vite 8.1.0
- **Animation**: GSAP 3.15.0 with ScrollTrigger plugin
- **Styling**: CSS (BEM methodology)
- **Linting**: ESLint with React hooks and refresh plugins

## Project Structure
```
vite-project/
├── index.html
├── package.json
├── vite.config.js
├── docs/                         ← Primary documentation
│   ├── PROJECT_MEMORY.md
│   └── PHASE_HISTORY.md
├── public/
│   └── video/hero.mp4
│   └── images/img1-10.png
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── components/
│       ├── Navbar.jsx + Navbar.css
│       ├── Hero.jsx + Hero.css
│       └── Section1.jsx + Section1.css
```

## Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Completed Phases
- **Phase 1** (1–1G): Hero Cleanup, Quote System, Responsive/Accessibility Audit, Final Lock, Post-Lock Regression — all ✅ COMPLETE (2026-07-27)
- **Phase 2A** (2026-08-01): Architecture Audit & Data Foundation Blueprint — ✅ COMPLETE (docs only). Plan: `vite-project/docs/PHASE2_ARCHITECTURE_PLAN.md`
- **Phase 2B** (2026-08-01): Repository Foundation & Data Organization — ✅ COMPLETE. `src/data/` now has empty folders (characters, locations, arcs, battles, crews, fruits, ships, events, timeline, shared) each with a README. No production logic changed.
- Hero is 🔒 LOCKED. Next: Phase 2C — Entity ID Convention

> **Full details**: `vite-project/docs/PROJECT_MEMORY.md` + `vite-project/docs/PHASE_HISTORY.md`

## Change Log
- **2026-08-01**: Phase 2B completed. Created 10 empty data folders + READMEs under `src/data/`, extended architecture plan (image organization + migration order).
- **2026-08-01**: Phase 2 roadmap finalized (2B–2O). Docs synced: `PHASE2_ARCHITECTURE_PLAN.md`, `PROJECT_MEMORY.md`, `PHASE_HISTORY.md`, `AGENTS.md`.
- **2026-08-01**: Phase 2A completed (docs-only). Created `PHASE2_ARCHITECTURE_PLAN.md`, memory synced.
- **2026-08-01**: Memory sync — recovery checkpoint refreshed to HEAD `027794f`, working tree confirmed clean.
- **2026-07-27**: Phase 1 (1–1G) completed. Removed Chapter UI from Hero. Created docs/ directory with PROJECT_MEMORY.md and PHASE_HISTORY.md.
