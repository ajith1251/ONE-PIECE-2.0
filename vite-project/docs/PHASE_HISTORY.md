# Phase History — One Piece 2.0

> This file is APPEND-ONLY. Do not erase previous entries.

---

## Phase 1 — Hero Cleanup

**Date**: 2026-07-27

**Objective**: Clean the Hero chapter UI while preserving the existing working cinematic Hero. Remove the chapter numbering system, orphaned CSS, and create persistent project memory structure.

### Files Modified

| File | Change |
|------|--------|
| `src/components/Hero.jsx` | Removed `<p className="hero__eyebrow">Chapter {index + 1}</p>` line from scene rendering |
| `src/components/Hero.css` | Removed orphaned `.hero__eyebrow` CSS rules (no longer used) |

### Files Created

| File | Purpose |
|------|---------|
| `docs/PROJECT_MEMORY.md` | Persistent project documentation — current state, architecture, protected systems, recovery instructions |
| `docs/PHASE_HISTORY.md` | Append-only phase history log for recovery trail |

### Files Deleted

None.

### Changes Made

1. **Removed Chapter UI**: The "Chapter {index + 1}" eyebrow label was rendered above each scene's title. This was the only chapter-specific UI in the Hero. The `hero__eyebrow` paragraph was removed from the JSX.
2. **Removed Orphaned CSS**: The `.hero__eyebrow` CSS class was only used for the chapter label. Removed the rule set (margin, color, letter-spacing, text-transform, font-size, font-weight).
3. **Created Documentation System**: Established `docs/` directory with `PROJECT_MEMORY.md` and `PHASE_HISTORY.md` for persistent project memory.
4. **Verified Protected Systems**: Confirmed Hero video, navbar, scroll indicator, foreground scene animations, and responsive layout are all working.

### Protected Systems Verified

| System | Status | Notes |
|--------|--------|-------|
| Hero background video | ✅ Verified | Native autoplay, muted, loop, playsInline, independent of scrolling |
| Navbar | ✅ Verified | Sticky header, brand, nav links, responsive |
| Scroll indicator | ✅ Verified | Bottom center, fade-out on scroll, CSS animation |
| Foreground scene animations | ✅ Verified | 6 scenes with GSAP fade in/out on scroll |
| Section1 (Crew cards) | ✅ Verified | Untouched by Phase 1 |
| Responsive layout | ✅ Verified | All breakpoints preserved |

### Validation Results

| Check | Result |
|-------|--------|
| `npm run lint` | ✅ Passed |
| `npm run build` | ✅ Passed |

### Known Issues

None.

### Deferred Work

The following were intentionally NOT implemented:
- Quote system / rotating quotes
- Quote arrays, timers, or carousels
- GSAP quote timelines
- Scroll-based quote changes
- New themes / gold overlays / panels / cards
- Particles / Three.js / Canvas effects
- Image asset management system
- Any future-phase features

### Next Recommended Phase

**Phase 1B** — Hero Quote Foundation
- Introduce editable atmospheric quote data for each Hero scene
- Simple data-driven quote overlay with animation

---

## Phase 1B — Hero Quote Foundation

**Date**: 2026-07-27

**Objective**: Create a centralized, editable atmospheric quote data source for the Hero, render ONE static line, and establish the data → UI pipeline without rotation or animation.

### Files Modified

| File | Change |
|------|--------|
| `src/components/Hero.jsx` | Imported `heroQuotes` from new data file; rendered `<p className="hero__quote">“{heroQuotes[0]}”</p>` as persistent element outside scene cycling |
| `src/components/Hero.css` | Added `.hero__quote` styles (absolute bottom-left positioning, italic, 0.5 opacity, subtle text-shadow); added mobile responsive adjustment at 720px |

### Files Created

| File | Purpose |
|------|---------|
| `src/data/heroQuotes.js` | Centralized hero quote data — 7 original atmospheric lines, editable from one place |

### Files Deleted

None.

### Changes Made

1. **Created quote data source**: `src/data/heroQuotes.js` with 7 atmospheric lines (themes: dreams, adventure, freedom, the sea, exploration, inherited will, ambition).
2. **Integrated into Hero**: Imported `heroQuotes` and rendered one static quote as a persistent element outside the scene fade-in/out cycle.
3. **Styled restrainedly**: The quote is positioned at the bottom-left of the Hero, small/italic/subtle (0.5 opacity), with a minimal text-shadow for readability over the video. No backgrounds, borders, or decorative clutter.
4. **Added responsive adjustment**: At 720px breakpoint, the quote repositions to `left: 5%; bottom: 60px` to avoid overlap with mobile-aligned scene content.
5. **Video protected**: No changes to the video element, playback, or scroll behavior.

### Protected Systems Verified

| System | Status | Notes |
|--------|--------|-------|
| Hero background video | ✅ Protected | Native autoplay, muted, loop, playsInline, independent of scrolling |
| Navbar | ✅ Unchanged | No modifications |
| Scroll indicator | ✅ Unchanged | No modifications |
| Foreground scene animations | ✅ Unchanged | Scene GSAP timeline untouched |
| Section1 (Crew cards) | ✅ Unchanged | No modifications |
| Responsive layout | ✅ Preserved | Quote adjustments added harmoniously |

### Validation Results

| Check | Result |
|-------|--------|
| `npm run lint` | ✅ Passed — no errors or warnings |
| `npm run build` | ✅ Passed — clean production build |

### Known Issues

None.

### Deferred Work

The following were intentionally NOT implemented:
- Quote rotation / cycling (next phase: 1C)
- Quote transition animation (fade, slide, blur, typewriter, etc.)
- GSAP quote timelines
- Scroll-based quote changes
- Video-synchronized quote changes
- Timer or interval-based quote switching
- Any future content systems (characters, locations, arcs, etc.)

### Next Recommended Phase

**Phase 1C** — Hero Quote Rotation Logic
- Introduce lightweight automatic switching between the centralized quotes
- Must remain independent of scrolling, video playback, and video currentTime

---

## Phase 1C — Hero Quote Rotation Logic

**Date**: 2026-07-27

**Objective**: Implement lightweight automatic sequential rotation through the existing centralized Hero quotes using a React-friendly timer. No transition animation — instant text switching only. Fully independent of video and scrolling.

### Files Modified

| File | Change |
|------|--------|
| `src/components/Hero.jsx` | Added `useState` for `quoteIndex`, `useEffect` with `setInterval` (7000ms), functional state update to avoid stale closures, `clearInterval` cleanup on unmount, changed `heroQuotes[0]` to `heroQuotes[quoteIndex]` |

### Files Created

None.

### Files Deleted

None.

### Changes Made

1. **Added rotation state**: `const [quoteIndex, setQuoteIndex] = useState(0)` tracks the current quote.
2. **Added rotation timer**: `useEffect` with `setInterval` at 7000ms. Uses functional `setQuoteIndex((prev) => (prev + 1) % heroQuotes.length)` to avoid stale closures.
3. **Added cleanup**: `clearInterval(interval)` returned from the effect prevents memory leaks/duplicate timers.
4. **Updated render**: Changed `heroQuotes[0]` to `heroQuotes[quoteIndex]` in the JSX.
5. **Added constant**: `QUOTE_INTERVAL_MS = 7000` at module level — easy to modify.
6. **Video/scroll independence**: No references to video, `currentTime`, scroll position, ScrollTrigger, or GSAP. Zero coupling.

### Protected Systems Verified

| System | Status | Notes |
|--------|--------|-------|
| Hero background video | ✅ Protected | Native autoplay, muted, loop, playsInline, independent of scrolling |
| Navbar | ✅ Unchanged | No modifications |
| Scroll indicator | ✅ Unchanged | No modifications |
| Foreground scene animations | ✅ Unchanged | Scene GSAP timeline untouched |
| Section1 (Crew cards) | ✅ Unchanged | No modifications |
| Responsive layout | ✅ Preserved | No changes |
| Quote data | ✅ Preserved | Still in single source (`src/data/heroQuotes.js`) |

### Validation Results

| Check | Result |
|-------|--------|
| `npm run lint` | ✅ Passed — no errors or warnings |
| `npm run build` | ✅ Passed — clean production build (162ms) |
| `npm run dev` | ✅ Started — no compilation errors, no missing modules |

### Known Issues

None.

### Deferred Work

The following were intentionally NOT implemented:
- Quote transition animation (fade, slide, blur, etc.) — next phase: 1D
- Quote navigation controls (pause/play, buttons)
- Video synchronization for quotes
- Scroll synchronization for quotes
- Quote randomization (sequential only)
- Tab visibility handling
- Assertive live region for accessibility
- Any future content systems (characters, locations, arcs, etc.)

### Next Recommended Phase

**Phase 1D** — Hero Quote Transition Animation
- Add smooth fade transition between quote changes
- Keep the rotation logic from Phase 1C intact
