# PROJECT MEMORY — One Piece 2.0

> **Last Updated**: 2026-07-27
> **Current Phase**: Phase 1D — Hero Quote Transition Animation

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

## Image Philosophy

Future development is IMAGE-FIRST. Characters, locations, arcs, battles, ships, and other major entities will use clearly named image assets.

Examples of future asset naming:
- `monkey-d-luffy.*`
- `roronoa-zoro.*`
- `shanks.*`
- `alabasta.*`
- `marineford.*`
- `wano.*`
- `thousand-sunny.*`

Supported formats (browser-compatible): `.png`, `.webp`, `.jpg`, `.jpeg`, `.avif`, `.gif`

Missing images must NOT prevent an entity from existing. An entity may exist with a placeholder until a better image is manually added later.

**This system is NOT yet implemented.** Documented as a principle only.

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

## Protection Systems

> Anything listed here must NOT be modified by future phases unless that phase explicitly requires it.

### Hero Background Video (VERIFIED WORKING)

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
│   └── components/
│       ├── Navbar.jsx + Navbar.css
│       ├── Hero.jsx + Hero.css
│       └── Section1.jsx + Section1.css
```

---

## Current Phase

**Phase**: Phase 1D

**Goal**: Add a subtle, premium opacity + translateY transition between Hero quote changes, keeping the Phase 1C rotation logic intact. No new dependencies.

**Status**: ✅ Completed (see PHASE_HISTORY.md for details)

---

## Quote System

| Aspect | Detail |
|--------|--------|
| **Data file** | `src/data/heroQuotes.js` — 7 original atmospheric lines |
| **Rotation logic** | `src/components/Hero.jsx` — `useState` + `useEffect` with `setInterval` (7000ms) |
| **Rotation order** | Sequential: 0 → 1 → 2 → ... → last → 0 (looping) |
| **Cleanup** | `clearInterval(interval)` on component unmount |
| **Transition type** | CSS `opacity` + `transform: translateY(8px)` — 400ms ease each direction |
| **Transition trigger** | `useLayoutEffect` watching `quoteIndex` — toggles `.hero__quote--hidden` class |
| **Reduced motion** | `@media (prefers-reduced-motion: reduce)` — disables transition, instant switching |
| **Video sync** | NOT connected — completely independent |
| **Scroll sync** | NOT connected — completely independent |

---

## Transition Behavior

1. Quote is fully visible at `opacity: 1` for ~6.2s
2. Timer fires → `quoteIndex` increments → `useLayoutEffect` adds `--hidden` class → CSS transitions to `opacity: 0; transform: translateY(8px)` over 400ms
3. Text (already updated from `quoteIndex`) is now at the new quote, fully faded out
4. After 400ms, `setTimeout` removes `--hidden` class → CSS transitions to `opacity: 1; transform: translateY(0)` over 400ms
5. New quote is fully visible for ~6.2s, then the cycle repeats

---

## Next Phase (Recommended)

**Phase 1E** — Hero Responsive & Accessibility Verification

Review Hero layout, quote readability, and accessibility across all device sizes.

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
