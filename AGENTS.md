# Project Memory - One Piece 2.0

## ⚠️ IMPORTANT — Documentation Location

**Primary project documentation is now in `docs/PROJECT_MEMORY.md` and `docs/PHASE_HISTORY.md`.**

This file is a lightweight index. For full context (protected systems, recovery instructions, phase history, architecture decisions), read the docs directory first.

---

## Quick Reference

- **Type**: React + Vite single-page application
- **Theme**: One Piece anime/manga tribute website
- **Location**: `D:\one-piece2.0\vite-project`
- **Last Updated**: 2026-08-02

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
- `npm run verify` - Run data-layer verification (`scripts/verify-data.mjs`)
- `npm run preview` - Preview production build

## Completed Phases
- **Phase 1** (1–1G): Hero Cleanup, Quote System, Responsive/Accessibility Audit, Final Lock, Post-Lock Regression — all ✅ COMPLETE (2026-07-27)
- **Phase 2A** (2026-08-01): Architecture Audit & Data Foundation Blueprint — ✅ COMPLETE (docs only). Plan: `vite-project/docs/PHASE2_ARCHITECTURE_PLAN.md`
- **Phase 2B** (2026-08-01): Repository Foundation & Data Organization — ✅ COMPLETE. `src/data/` now has empty folders (characters, locations, arcs, battles, crews, fruits, ships, events, timeline, shared) each with a README. No production logic changed.
- **Phase 2C** (2026-08-01): Universal Entity ID Convention — ✅ COMPLETE. Doc: `src/data/shared/entity-ids.md` (lowercase kebab-case, immutable, id ≠ displayName). No production logic changed.
- **Phase 2D** (2026-08-01): Shared Entity Metadata & Schema Foundation — ✅ COMPLETE. Doc: `src/data/shared/entity-metadata.md` (required: id/displayName/description; optional: aliases/tags/status/imageKey/notes/metadata/dates). No production logic changed.
- **Phase 2E** (2026-08-01): Character Schema Foundation — ✅ COMPLETE. Doc: `src/data/characters/character-schema.md` (one reusable schema for all character types; ID-only relationships; imageKey; spoilerLevel; one sample record). No production logic changed.
- **Phase 2F** (2026-08-01): Location Schema Foundation — ✅ COMPLETE. Doc: `src/data/locations/location-schema.md` (one reusable schema for all location types; ID-only relationships; imageKey; map-readiness fields; spoilerLevel; one sample record). No production logic changed.
- **Phase 2G** (2026-08-01): Arc Schema Foundation — ✅ COMPLETE. Doc: `src/data/arcs/arc-schema.md` (one reusable schema for all arc types; ID-only relationships; imageKey; timeline-readiness fields; spoilerLevel; one sample record). No production logic changed.
- **Phase 2H** (2026-08-01): Crew & Faction Schema Foundation — ✅ COMPLETE. Doc: `src/data/crews/crew-schema.md` (one reusable schema for all organization types; ID-only relationships; imageKey; spoilerLevel; one sample record). No production logic changed.
- **Phase 2I** (2026-08-01): Battle Schema Foundation — ✅ COMPLETE. Doc: `src/data/battles/battle-schema.md` (one reusable schema for all battle types; ID-only relationships; imageKey; timeline-readiness; spoilerLevel; one sample record). No production logic changed.
- **Phase 2J** (2026-08-01): Devil Fruit & Power Schema Foundation — ✅ COMPLETE. Doc: `src/data/fruits/power-schema.md` (one reusable schema for all power systems: Devil Fruits, Haki, combat styles, weapons; ID-only relationships; imageKey; spoilerLevel; one sample record). No production logic changed.
- **Phase 2K** (2026-08-01): Ship Schema Foundation — ✅ COMPLETE. Doc: `src/data/ships/ship-schema.md` (one reusable schema for all ship types; ID-only relationships; imageKey; history-support fields; spoilerLevel; one sample record). No production logic changed.
- **Phase 2L** (2026-08-01): Cross-Entity Relationship Convention — ✅ COMPLETE. Doc: `src/data/shared/relationships.md` (ID-only relationships; single-direction storage; cardinality rules; standard field naming; relationship matrix; cascade + validation principles). No production logic changed.
- **Phase 2M** (2026-08-02): Small Integrated Dataset — ✅ COMPLETE. First real production data: `src/data/<type>/index.js` for characters (3), locations (2), arcs (1), crews (1), battles (1), ships (1), fruits/powers (1). All ID references resolve; lint + build pass; no UI/protected changes. Findings recorded for 2N/2O (canonical subsets, Ship→Battle edge, §13 graph edge, single-direction vs stored-both, fruitId vs devilFruitId).
- **Phase 2N** (2026-08-02): Architecture Verification — ✅ COMPLETE. Added `scripts/verify-data.mjs` (`npm run verify`) + node-globals eslint scope for `scripts/`; structural checks are errors, stored-both mirror gaps are warnings. Found + fixed a real defect: arc `marineford` and location `marineford` shared one ID → renamed arc to `marineford-arc`, `entity-ids.md` now requires globally unique IDs. Canonicalized: stored-both + declared source of truth (§4/§5), `fruitId`/`fruitIds` → `devilFruitId`/`devilFruitIds`, new canonical §13 example graph. `npm run verify` = PASS (0 errors, 2 documented sample-gap warnings); lint + build clean; no UI/protected changes.
- Hero is 🔒 LOCKED. Next: Phase 2O — Architecture Lock

> **Full details**: `vite-project/docs/PROJECT_MEMORY.md` + `vite-project/docs/PHASE_HISTORY.md`

## Change Log
- **2026-08-02**: Phase 2N completed. Added `scripts/verify-data.mjs` + `npm run verify`; renamed arc `marineford` → `marineford-arc` (global-ID fix); canonicalized stored-both + `devilFruitId` naming; new §13 example graph; entity-ids.md global uniqueness. Updated all READMEs + memory docs. `npm run verify` PASS (0 errors, 2 documented warnings).
- **2026-08-02**: Phase 2M completed. Created `src/data/<type>/index.js` sample datasets (3 characters, 2 locations, 1 arc, 1 crew, 1 battle, 1 ship, 1 power), updated all data-folder READMEs + shared README + memory docs. Verified all ID references resolve + lint/build pass.
- **2026-08-01**: Phase 2L completed. Created `src/data/shared/relationships.md` (Cross-Entity Relationship Convention), updated shared README + schema canonical notes + memory docs.
- **2026-08-01**: Phase 2K completed. Created `src/data/ships/ship-schema.md` (Ship Schema Foundation), updated ships README + memory docs.
- **2026-08-01**: Phase 2J completed. Created `src/data/fruits/power-schema.md` (Devil Fruit & Power Schema Foundation), updated fruits README + memory docs.
- **2026-08-01**: Phase 2I completed. Created `src/data/battles/battle-schema.md` (Battle Schema Foundation), updated battles README + memory docs.
- **2026-08-01**: Phase 2H completed. Created `src/data/crews/crew-schema.md` (Crew & Faction Schema Foundation), updated crews README + memory docs.
- **2026-08-01**: Phase 2G completed. Created `src/data/arcs/arc-schema.md` (Arc Schema Foundation), updated arcs README + memory docs.
- **2026-08-01**: Phase 2F completed. Created `src/data/locations/location-schema.md` (Location Schema Foundation), updated locations README + memory docs.
- **2026-08-01**: Phase 2E completed. Created `src/data/characters/character-schema.md` (Character Schema Foundation), updated characters README + memory docs.
- **2026-08-01**: Phase 2D completed. Created `src/data/shared/entity-metadata.md` (shared metadata foundation), updated shared README + memory docs.
- **2026-08-01**: Phase 2C completed. Created `src/data/shared/entity-ids.md` (Universal Entity ID Convention), updated shared README + memory docs.
- **2026-08-01**: Phase 2B completed. Created 10 empty data folders + READMEs under `src/data/`, extended architecture plan (image organization + migration order).
- **2026-08-01**: Phase 2 roadmap finalized (2B–2O). Docs synced: `PHASE2_ARCHITECTURE_PLAN.md`, `PROJECT_MEMORY.md`, `PHASE_HISTORY.md`, `AGENTS.md`.
- **2026-08-01**: Phase 2A completed (docs-only). Created `PHASE2_ARCHITECTURE_PLAN.md`, memory synced.
- **2026-08-01**: Memory sync — recovery checkpoint refreshed to HEAD `027794f`, working tree confirmed clean.
- **2026-07-27**: Phase 1 (1–1G) completed. Removed Chapter UI from Hero. Created docs/ directory with PROJECT_MEMORY.md and PHASE_HISTORY.md.
