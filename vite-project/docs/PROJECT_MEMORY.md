# PROJECT MEMORY — One Piece 2.0

> **Last Updated**: 2026-08-01
> **Current Phase**: Phase 2E — Character Schema Foundation
> **Phase 1 Status**: ✅ COMPLETE
> **Hero Status**: 🔒 STABLE + PROTECTED (unchanged)

---

## Project

**One Piece 2.0**

A fan-built interactive One Piece experience. The website is being developed as an exploration of:
- Characters
- Anime arcs / sagas
- Locations
- World exploration
- Battles
- Crews / factions
- Devil Fruits
- Powers / Haki
- Ships
- Timeline
- Mysteries

---

## Project Vision

An image-first interactive exploration of the One Piece world. The priority order is:

1. **Images / Artwork** — images create the world
2. **Content** — data describes the world
3. **Layout / Typography** — components present the world
4. **Interaction** — interactions let users explore the world
5. **Animation** — animation only enhances it

The project should remain visually impressive primarily because of strong imagery and content, NOT because of complicated animation systems.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19.2.7 |
| Build Tool | Vite 8.1.0 |
| Animation | GSAP 3.15.0 + ScrollTrigger |
| Styling | CSS (BEM methodology) |
| Linting | ESLint (React hooks + refresh plugins) |

---

## Complexity Rules

Avoid unnecessary:
- GSAP complexity
- ScrollTrigger chains
- Scroll-jacking
- Video scrubbing
- Three.js
- WebGL
- Canvas-based visual reconstruction
- Excessive Framer Motion
- Excessive gradients
- Glassmorphism
- Glowing UI everywhere
- Gold-heavy global themes
- Complicated generated visual effects

Animation must never be required for basic functionality. If animations fail, the content should still work.

---

## Image-First Principle

The rest of One Piece 2.0 follows:

**IMAGES → CONTENT → LAYOUT → INTERACTION → ANIMATION**

Future phases must not make the project animation-first. Major visuals should come from image assets rather than complex programmatic reconstruction. This is especially important for the future world map.

### Future Image Rule

Characters, locations, arcs, battles, crews, ships and other visual entities will eventually use predictable image names.

Examples:
- `monkey-d-luffy.*`
- `roronoa-zoro.*`
- `portgas-d-ace.*`
- `alabasta.*`
- `marineford.*`
- `wano.*`
- `thousand-sunny.*`

Supported formats (browser-compatible): `.png`, `.webp`, `.jpg`, `.jpeg`, `.avif`, `.gif`

Missing images must NOT prevent an entity from existing. An entity may exist with a placeholder until a better image is manually added later.

**This system is NOT yet implemented.** Documented as a principle only.

### Future Map Rule

The future One Piece world map must be IMAGE-FIRST. The map itself should be a finished image asset. Code will later add interaction/hotspots over that image.

Future agents must NOT automatically turn the map into:
- Three.js world
- WebGL globe
- Canvas reconstruction
- CSS-drawn continents
- procedural map
- complex animated SVG
- GSAP camera system

The visual map asset is the source of truth. Interaction comes afterward. Do NOT build the map now.

### Future Asset Replacement Rule

Artwork should eventually be replaceable without redesigning components. If the user finds a better image, replacing the appropriate asset file should update the interface without rewriting components. This architecture belongs to future phases. Do not implement it now.

---

## Micro-Phase Development Rule

ALL FUTURE DEVELOPMENT USES MICRO-PHASES.

One prompt should have one clearly measurable objective.

Workflow: **IMPLEMENT → VALIDATE → VERIFY → DIFF REVIEW → MEMORY SYNC → COMMIT → NEXT MICRO-PHASE**

Do not combine multiple major features in one prompt.

---

## Design System

### Colors
- **Background**: `#05060d`
- **Text**: `#f7f2eb`
- CSS variables defined in `index.css`

### Typography
- **Headings**: Cinzel (Google Fonts)
- **Body**: Inter (Google Fonts)
- Weights: 400, 500, 600, 700, 900

### Animations
- GSAP ScrollTrigger for scroll-based animations
- MatchMedia for responsive animation breakpoints
- Smooth transitions with cubic-bezier easing

---

## Hero Protection Lock

> **Status**: 🔒 LOCKED AFTER PHASE 1
>
> The Hero is now a protected stable system. Future phases must NOT redesign or broadly refactor the Hero unless the user explicitly requests a Hero change.

### Protected Hero Files

- `src/components/Hero.jsx`
- `src/components/Hero.css`
- `src/data/heroQuotes.js`

### What "LOCKED" Means

LOCKED does NOT mean files can never be touched. It means future phases must follow these rules:

1. Do not redesign the Hero.
2. Do not replace its visual direction.
3. Do not rewrite its working video architecture.
4. Do not reconnect video playback to scrolling.
5. Do not connect quote rotation to scrolling.
6. Do not connect quote rotation to video playback.
7. Do not remove the quote system.
8. Do not replace the lightweight quote system with a complex animation framework.
9. Do not alter Hero CSS while implementing unrelated sections.
10. Do not use Hero as a convenient place for global styles.
11. Do not move Hero files during unrelated architecture refactors.
12. Do not install dependencies for the Hero during unrelated phases.

A future phase may touch the Hero only when:
- **A.** The user explicitly requests a Hero change, **OR**
- **B.** Another feature requires a tiny integration point and the change can be proven not to alter Hero behavior.

Any such change must be documented.

### Hero Invariants

Future agents must preserve:

#### Video
- Native `autoplay`
- `muted`
- `loop`
- `playsInline`
- Continuous playback
- Independent of scrolling
- Independent of quote system
- No JS frame-by-frame seeking

#### Quotes
- Centralized data in `src/data/heroQuotes.js`
- Sequential rotation (0 → 1 → 2 → ... → last → 0)
- Lightweight timing (`setInterval` at 7000ms)
- Lightweight transition (CSS opacity + translateY, 400ms)
- Independent from video
- Independent from scrolling
- Reduced-motion compatible (CSS + JS)

#### Layout
- Video remains visual focus
- No forced gold-heavy theme
- No giant opaque Hero panels
- No unnecessary visual clutter
- Responsive behavior preserved

#### Existing Systems
- Navbar preserved
- Scroll indicator preserved
- Foreground scene system preserved

These invariants become requirements for future regression checks.

---

## Protection Systems

> Anything listed here must NOT be modified by future phases unless that phase explicitly requires it.

### Hero Background Video (VERIFIED WORKING — LOCKED)

The Hero video must:
- ✅ Autoplay (native `<video autoplay>`)
- ✅ Remain muted (`muted` attribute)
- ✅ Loop (`loop` attribute)
- ✅ Use `playsInline`
- ✅ Play independently of scrolling
- ✅ NOT have `currentTime` controlled by scrolling
- ✅ NOT be paused by ScrollTrigger
- ✅ NOT require JS frame-by-frame seeking

Implementation: Standard `<video>` element with React ref. A `useEffect` handles autoplay Promise rejection fallback. No scroll-based video control exists.

### Navbar (VERIFIED WORKING)
- Sticky header at `z-index: 12`
- Brand logo + "One Piece" title
- Navigation links: Voyage, Crew, Treasure, Legacy
- Responsive wrapping below 740px

### Scroll Indicator (VERIFIED WORKING)
- Positioned at bottom center of Hero
- "Scroll to begin" label
- Mouse/circle visual with CSS animation
- Fades out on scroll via ScrollTrigger (top top+=80 to top top+=240)

### Foreground Scene Animations (VERIFIED WORKING)
- 6 scene cards with title, description, CTA button
- Fade in/out on scroll via GSAP timeline
- Uses `matchMedia` for desktop/tablet/mobile breakpoints
- Scene animations are independent from the video

### Section1 (Straw Hat Crew)
- Crew card grid with bounty counter animation
- Card hover effects
- GSAP stagger entrance animation

### Responsive Layout
- Breakpoints: 960px, 720px, 640px
- Hero content adapts padding and alignment
- Scene copy reflows at smaller sizes

### Quote System (VERIFIED WORKING — LOCKED)
- Data: `src/data/heroQuotes.js` — single source of truth (7 quotes)
- Rotation: `setInterval` at 7000ms, sequential, looping
- Transition: CSS opacity + translateY, 400ms each direction
- Reduced motion: CSS `transition: none` + JS instant swap
- Independent of video, scroll, GSAP

---

## Recovery Instructions

A future coding agent must:
1. Read `PROJECT_MEMORY.md` first
2. Read the latest entries in `PHASE_HISTORY.md`
3. Inspect git status (`git status`)
4. Inspect the files mentioned in the latest phase
5. Run validation before making new changes when practical
6. Respect PROTECTED SYSTEMS
7. Continue only the explicitly requested phase
8. Never assume unfinished work is complete
9. Never automatically continue into another phase
10. Update project memory after completing work

### If Documentation and Code Disagree

**THE CODE IS THE SOURCE OF TRUTH FOR CURRENT BEHAVIOR.**

Investigate the mismatch and update documentation accordingly. Do not rewrite working code merely to match outdated documentation.

---

## Memory Synchronization Rule

At the END of every future phase, the coding agent must:
1. Update `PROJECT_MEMORY.md` with the latest CURRENT state
2. Append the completed phase to `PHASE_HISTORY.md`
3. Record newly protected systems
4. Record unresolved issues
5. Record what was intentionally deferred
6. Record the next recommended micro-phase
7. Run validation
8. Report completion

A phase is NOT complete until memory is synchronized.

---

## Recovery Checkpoint

| Aspect | Detail |
|--------|--------|
| **Git branch** | `main` |
| **Latest commit** | `027794f` — phase 1g: post-lock regression test and phase 2 handoff |
| **Working tree** | ✅ Clean production code (only docs modified this phase) |
| **Phase 1 status** | ✅ COMPLETE |
| **Phase 2A status** | ✅ COMPLETE (documentation-only) |
| **Phase 2B status** | ✅ COMPLETE (folders + READMEs, no production logic changes) |
| **Phase 2C status** | ✅ COMPLETE (documentation-only) |
| **Phase 2D status** | ✅ COMPLETE (documentation-only) |
| **Phase 2E status** | ✅ COMPLETE (documentation-only) |
| **Hero status** | 🔒 STABLE + PROTECTED |
| **Lint status** | ✅ Passing |
| **Build status** | ✅ Passing |

---

## Project Structure

```
vite-project/
├── index.html
├── package.json
├── vite.config.js
├── docs/
│   ├── PROJECT_MEMORY.md
│   └── PHASE_HISTORY.md
├── public/
│   ├── video/hero.mp4
│   └── images/img1.png–img10.png
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── data/
│   │   └── heroQuotes.js          ← Centralized quote data
│   └── components/
│       ├── Navbar.jsx + Navbar.css
│       ├── Hero.jsx + Hero.css
│       └── Section1.jsx + Section1.css
```

---

## Current Phase

**Phase**: Phase 2E — Character Schema Foundation

**Goal**: Define ONE reusable character schema (extending the shared metadata layer) that represents every character type.

**Status**: ✅ COMPLETED

---

## Phase Summary

| Phase | Objective | Status |
|-------|-----------|--------|
| **Phase 1** | Hero Cleanup + Project Memory | ✅ |
| **Phase 1B** | Hero Quote Foundation | ✅ |
| **Phase 1C** | Hero Quote Rotation | ✅ |
| **Phase 1D** | Hero Quote Transition | ✅ |
| **Phase 1E** | Responsive & Accessibility Verification | ✅ |
| **Phase 1F** | Hero Final Audit & Lock | ✅ |
| **Phase 1G** | Post-Lock Regression Test | ✅ |
| **Phase 2A** | Architecture Audit & Data Foundation Blueprint | ✅ |
| **Phase 2B** | Repository Foundation & Data Organization | ✅ |
| **Phase 2C** | Universal Entity ID Convention | ✅ |
| **Phase 2D** | Shared Entity Metadata & Schema Foundation | ✅ |
| **Phase 2E** | Character Schema Foundation | ✅ |

---

## Quote System

| Aspect | Detail |
|--------|--------|
| **Data file** | `src/data/heroQuotes.js` — 7 original atmospheric lines |
| **Rotation logic** | `src/components/Hero.jsx` — `useState` + `useEffect` with `setInterval` (7000ms) |
| **Rotation order** | Sequential: 0 → 1 → 2 → ... → last → 0 (looping) |
| **Cleanup** | `clearInterval(cycleInterval)` + `clearTimeout(fadeOutTimer)` + `clearTimeout(fadeInTimer)` |
| **Transition type** | CSS `opacity` + `transform: translateY(8px)` — 400ms ease each direction |
| **Transition trigger** | Rotation timer manages full cycle: fade-out → change text (while hidden) → fade-in |
| **Reduced motion (CSS)** | `@media (prefers-reduced-motion: reduce)` — disables transition |
| **Reduced motion (JS)** | `window.matchMedia` detection — skips all timer delays, swaps instantly |
| **Video sync** | NOT connected — completely independent |
| **Scroll sync** | NOT connected — completely independent |

---

## Corrected Transition Behavior

1. Quote is fully visible at `opacity: 1` for ~6.15s
2. Timer fires → `setIsQuoteHidden(true)` → old text fades OUT over 400ms
3. After 400ms → `setQuoteIndex(...)` → text changes WHILE hidden (opacity 0)
4. After 50ms → `setIsQuoteHidden(false)` → new text fades IN over 400ms
5. Quote fully visible for ~6.15s, then cycle repeats

**Important**: Quote `index` changes AFTER the fade-out, not simultaneously.

---

## Next Phase (Recommended)

**Phase 2F** — Location Schema

Define the location entity schema extending the shared metadata foundation. No production data implementation.

---

## Phase 2 Architecture Plan

Full blueprint lives in **`docs/PHASE2_ARCHITECTURE_PLAN.md`** — created in Phase 2A.

It covers: current architecture, data flow, assets, strengths, limitations, risks, recommended future architecture, entity relationships, image strategy, map strategy, migration strategy, and the finalized Phase 2B–2O micro-phase roadmap.

**Phase 2B created the data foundation**: `src/data/` now contains folders `characters/`, `locations/`, `arcs/`, `battles/`, `crews/`, `fruits/`, `ships/`, `events/`, `timeline/`, `shared/` — each with a concise README. All folders are EMPTY (documentation only). `heroQuotes.js` remains untouched at `src/data/heroQuotes.js`.

**Phase 2C established the Universal Entity ID Convention**: documented in **`src/data/shared/entity-ids.md`** — lowercase kebab-case IDs, immutable once published, never generated at runtime, `id` ≠ `displayName`, `imageKey` = entity ID, future relationships reference IDs. No production code touched.

**Phase 2D established the Shared Entity Metadata & Schema Foundation**: documented in **`src/data/shared/entity-metadata.md`** — required fields (`id`, `displayName`, `description`), optional fields (`aliases`, `tags`, `status`, `imageKey`, `notes`, `metadata`, `createdAt`, `updatedAt`), image/tag/status/alias/notes strategies, relationship placeholders (IDs only). No giant master object; specialized schemas extend this layer. No production code touched.

**Phase 2E established the Character Schema Foundation**: documented in **`src/data/characters/character-schema.md`** — one reusable schema for all character types (pirates, marines, civilians, historical figures…). Extends shared metadata; character fields (`bounty`, `occupation`, `role`, `species`, `haki`, `devilFruitId`, …); ID-only relationships; `imageKey` strategy; `spoilerLevel` for future spoiler safety; one sample record (`monkey-d-luffy`) for validation. No character database yet. No production code touched.

**Phase 2 production implementation has NOT started.** The data layer (characters, locations, arcs, etc.) remains planned only.
