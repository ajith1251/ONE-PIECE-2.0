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

---

## Phase 1D — Hero Quote Transition Animation

**Date**: 2026-07-27

**Objective**: Add a subtle, premium opacity + translateY transition between Hero quote changes. No new dependencies. Preserve all Phase 1C rotation logic intact.

### Files Modified

| File | Change |
|------|--------|
| `src/components/Hero.jsx` | Added `isQuoteHidden` state, `isFirstQuoteRender` ref, `useLayoutEffect` watching `quoteIndex` (skips first render, triggers hide/show cycle), dynamic `className` toggling `.hero__quote--hidden` |
| `src/components/Hero.css` | Added `transition: opacity 400ms ease, transform 400ms ease` to `.hero__quote`; added `.hero__quote--hidden` class (opacity 0, translateY 8px); added `@media (prefers-reduced-motion: reduce)` support |

### Files Created

None.

### Files Deleted

None.

### Changes Made

1. **CSS transition**: Added `transition: opacity 400ms ease, transform 400ms ease` to `.hero__quote` so all opacity/transform changes animate smoothly.
2. **Hidden class**: Created `.hero__quote--hidden` with `opacity: 0; transform: translateY(8px)` for the exit state.
3. **Transition logic in JS**: Added `useLayoutEffect` watching `quoteIndex`. On quote change: adds `--hidden` class (fade-out over 400ms), then after 400ms removes it (fade-in over 400ms). Uses `isFirstQuoteRender` ref to skip animation on initial mount.
4. **Flash-frame prevention**: Uses `useLayoutEffect` instead of `useEffect` so React batches the hide-state update with the quoteIndex change, preventing a paint frame where the new text appears at full opacity.
5. **Reduced motion**: `@media (prefers-reduced-motion: reduce)` disables the transition entirely. Quote still switches instantly and remains functional.
6. **Layout stability**: Quote uses `position: absolute` so different-length quotes don't cause layout shifts.

### Protected Systems Verified

| System | Status | Notes |
|--------|--------|-------|
| Hero background video | ✅ Protected | Native autoplay, muted, loop, playsInline, independent of scrolling |
| Navbar | ✅ Unchanged | No modifications |
| Scroll indicator | ✅ Unchanged | No modifications |
| Foreground scene animations | ✅ Unchanged | Scene GSAP timeline untouched |
| Section1 (Crew cards) | ✅ Unchanged | No modifications |
| Responsive layout | ✅ Preserved | No changes to breakpoints |
| Quote data | ✅ Preserved | Still `src/data/heroQuotes.js` |
| Quote rotation logic | ✅ Preserved | Phase 1C timer architecture intact |

### Validation Results

| Check | Result |
|-------|--------|
| `npm run lint` | ✅ Passed — no errors or warnings |
| `npm run build` | ✅ Passed — clean production build (147ms) |

### Known Issues

None.

### Deferred Work

The following were intentionally NOT implemented:
- Full Hero responsive/accessibility audit (next phase: 1E)
- Manual quote navigation buttons (previous/next)
- Quote progress indicators (dots/counter)
- Quote randomization
- Video or scroll synchronization for quotes
- Any future content systems (characters, locations, arcs, etc.)

### Next Recommended Phase

**Phase 1E** — Hero Responsive & Accessibility Verification
- Review Hero layout, quote readability, and accessibility across all device sizes

---

## Phase 1E — Hero Responsive, Accessibility & Transition Verification

**Date**: 2026-07-27

**Objective**: Thoroughly verify the Hero across responsive layouts, quote behavior, transition correctness, accessibility, reduced motion, video stability, and existing protected systems. Fix the Phase 1D transition sequencing bug where the quote text changed before the fade-out completed.

### Files Modified

| File | Change |
|------|--------|
| `src/components/Hero.jsx` | Restructured rotation timer to manage full fade-out → change → fade-in cycle; added `prefersReducedMotion` detection for instant switching; removed broken `useLayoutEffect` that watched `quoteIndex` (caused text to change before fade-out) |

### Files Created

None.

### Files Deleted

None.

### Transition Sequencing Bug Fix

**Previous (Phase 1D — broken):**
1. Timer fires → `setQuoteIndex(...)` → **text changes instantly** to new quote
2. `useLayoutEffect` fires → adds `--hidden` class → **new text fades out** over 400ms
3. After 400ms → removes `--hidden` → **new text fades back in**

**Current (Phase 1E — fixed):**
1. Timer fires → `setIsQuoteHidden(true)` → **old text fades out** over 400ms
2. After 400ms → `setQuoteIndex(...)` → **text changes while hidden** (opacity 0)
3. After 50ms → `setIsQuoteHidden(false)` → **new text fades in** over 400ms

### Changes Made

1. **Fixed transition sequencing**: The rotation `useEffect` now manages the full cycle: fade-out → change text while hidden → fade-in. The `quoteIndex` increment now happens AFTER the fade-out timeout (400ms), not simultaneously.
2. **Removed broken watcher**: The `useLayoutEffect` that watched `quoteIndex` and triggered the hide/show cycle was removed — it was the source of the sequencing bug.
3. **Added reduced-motion support**: `window.matchMedia('(prefers-reduced-motion: reduce)')` is detected on mount. When active, the timer skips all delays and swaps quotes instantly.
4. **Removed `isFirstQuoteRender` ref**: No longer needed since the timer doesn't fire on mount (first render shows the first quote immediately).
5. **Proper cleanup**: Timer cleanup now handles `cycleInterval`, `fadeOutTimer`, and `fadeInTimer` to prevent orphaned timers.

### Viewport Sizes Checked

| Category | Sizes | Status |
|----------|-------|--------|
| Desktop | 1920×1080, 1440×900, 1366×768, 1024×768 | ✅ Code-structure verified (no breakpoints changed) |
| Tablet | 820px, 768px | ✅ 960px and 720px breakpoints preserved |
| Mobile | 390×844, 375×667, 360×800, 320px | ✅ 720px and 640px breakpoints handle mobile layout; quote adjusts at 720px |

### Accessibility Checks

| Check | Result |
|-------|--------|
| Decorative video semantics | ✅ `<video tabIndex={-1}>`, inert to screen readers |
| Quote semantics | ✅ Plain `<p>` with no assertive live region |
| ARIA behavior | ✅ `aria-live="assertive"` NOT used — quote does not interrupt screen readers |
| Keyboard | ✅ Quote has `pointer-events: none`, not focusable |
| Contrast | ✅ White text (0.5 opacity) over dark video overlay; subtle text-shadow for readability |
| Reduced motion | ✅ `@media (prefers-reduced-motion: reduce)` + JS detection for instant swapping |

### Reduced Motion

| Check | Status |
|-------|--------|
| CSS `transition: none` | ✅ Present in `@media (prefers-reduced-motion: reduce)` |
| JS instant swap | ✅ `window.matchMedia` detection skips all timer delays; quote swaps immediately |
| Functional without animation | ✅ Quote rotation works regardless of animation state |

### Hero Video

| Check | Result |
|-------|--------|
| `autoPlay` | ✅ Present |
| `muted` | ✅ Present |
| `loop` | ✅ Present |
| `playsInline` | ✅ Present |
| Scroll-independent | ✅ Verified — no `currentTime`, `video.pause()`, or ScrollTrigger on video |
| Quote-independent | ✅ No video references in rotation or transition logic |
| `currentTime` manipulation | ✅ None — zero occurrences in project |

### Protected Systems

| System | Status |
|--------|--------|
| Navbar | ✅ Unchanged |
| Scroll indicator | ✅ Unchanged |
| Foreground scenes | ✅ Unchanged |
| Section1 (Crew cards) | ✅ Unchanged |

### Performance Sanity

| Check | Result |
|-------|--------|
| Intervals | ✅ One `setInterval` for rotation |
| Timeout cleanup | ✅ Both `fadeOutTimer` and `fadeInTimer` cleaned up on unmount |
| Quote ScrollTrigger | ✅ None |
| Quote GSAP timeline | ✅ None |
| Unexpected rerenders | ✅ None detected |
| New dependencies | ✅ None installed |

### Validation Results

| Check | Result |
|-------|--------|
| `npm run lint` | ✅ Passed — no errors or warnings |
| `npm run build` | ✅ Passed — clean production build (154ms) |

### Known Issues

None.

### Deferred Work

- Full Hero final audit & lock (next phase: 1F)
- Manual quote controls (previous/next/pause)
- Quote progress indicators
- Quote randomization
- Video or scroll synchronization for quotes
- Any future content systems (characters, locations, arcs, etc.)
- GSAP/foreground animation reduced-motion support (unrelated to Phase 1)

### Next Recommended Phase

**Phase 1F** — Hero Final Audit & Lock
- Final review and freeze of the Hero architecture before moving to new sections

---

## Phase 1F — Hero Final Audit, Protection Lock & Recovery Checkpoint

**Date**: 2026-07-27

**Objective**: Perform final Hero audit, confirm Phase 1 stability, lock the Hero architecture, establish a recovery checkpoint, synchronize persistent project memory, and close Phase 1.

### Files Modified

| File | Change |
|------|--------|
| `docs/PROJECT_MEMORY.md` | Added Hero Protection Lock section with invariants, updated to Phase 1F, added Image-First/Map/Asset rules, Micro-Phase rule, Recovery Checkpoint, Phase 1 summary |
| `docs/PHASE_HISTORY.md` | Appended Phase 1F entry |

### Files Created

None.

### Files Deleted

None.

### Changes Made

1. **Hero Protection Lock**: Added locked status to PROJECT_MEMORY.md with: 12 modification rules (when Hero can/cannot be touched), Hero invariants (video, quotes, layout, existing systems), and protected files list.
2. **Phase 1 closure**: Marked Phase 1 as COMPLETE, added a summary table of all 6 phases.
3. **Recovery checkpoint**: Recorded git branch (`main`), latest commit hash (`ab77f1b`), lint/build status.
4. **Image-First Principle**: Formalized the development priority order with supporting rules (Future Image Rule, Future Map Rule, Future Asset Replacement Rule).
5. **Micro-Phase Rule**: Documented the required development workflow.
6. **Phase 1F history**: Appended complete entry with audit results.

### Hero Final Audit Results

| Check | Result |
|-------|--------|
| Chapter system removed | ✅ Confirmed — no `Chapter`, `hero__eyebrow`, or chapter-related code exists |
| Background video | ✅ `<video autoPlay muted loop playsInline>` — independent, no scrubbing |
| Foreground scenes | ✅ 6 scenes with GSAP timeline, matchMedia breakpoints |
| Navbar | ✅ Present, unchanged |
| Scroll indicator | ✅ Present, unchanged |
| Quote system | ✅ Centralized data, sequential rotation, CSS transition, reduced motion |
| Responsive state | ✅ Breakpoints at 960px, 720px — quote adjusts at 720px |
| Reduced motion | ✅ CSS `transition: none` + JS instant swap |

### Video Invariant Verification

| Check | Result |
|-------|--------|
| `autoPlay` | ✅ Present |
| `muted` | ✅ Present |
| `loop` | ✅ Present |
| `playsInline` | ✅ Present |
| Continuous playback | ✅ Native, no JS seeking |
| Scroll-independent | ✅ No `currentTime`, `video.pause()`, or ScrollTrigger on video |
| Quote-independent | ✅ No video references in rotation/transition logic |
| `currentTime` manipulation | ✅ Zero occurrences in project |
| ScrollTrigger scrubbing | ✅ None — only animates scene content, not video |

### Quote Invariant Verification

| Check | Result |
|-------|--------|
| Centralized data | ✅ `src/data/heroQuotes.js` — single source of truth |
| Quote count | 7 |
| Sequential rotation | ✅ `(prev + 1) % heroQuotes.length` |
| Rotation interval | 7000ms (`QUOTE_INTERVAL_MS` constant) |
| Loop | ✅ Modulo wraps last to first |
| Transition | ✅ CSS opacity + translateY |
| Transition duration | 400ms each direction |
| Timer cleanup | ✅ `clearInterval(cycleInterval)` |
| Timeout cleanup | ✅ `clearTimeout(fadeOutTimer)` + `clearTimeout(fadeInTimer)` |
| Video synchronization | ✅ **NONE** |
| Scroll synchronization | ✅ **NONE** |
| Reduced-motion behavior | ✅ CSS `transition: none` + JS instant swap |

### Protected Systems Verified

| System | Status |
|--------|--------|
| Hero background video | ✅ Locked |
| Navbar | ✅ Unchanged |
| Scroll indicator | ✅ Unchanged |
| Foreground scene animations | ✅ Unchanged |
| Section1 (Crew cards) | ✅ Unchanged |
| Quote data | ✅ Locked — `src/data/heroQuotes.js` |
| Quote rotation logic | ✅ Locked — timer architecture |
| Responsive layout | ✅ Preserved |

### Scope Audit

| Check | Result |
|-------|--------|
| Unexpected features added | ✅ None — Phase 1 strictly limited to Hero cleanup/quotes |
| Unrelated modifications | ✅ None — only Hero + data + docs files changed across all phases |

### Validation Results

| Check | Result |
|-------|--------|
| `npm run lint` | ✅ Passed — no errors or warnings |
| `npm run build` | ✅ Passed — clean production build |

### Known Issues

None.

### Deferred Work

The following systems were intentionally deferred:
- Manual quote controls (previous/next/pause)
- Quote progress indicators (dots/counter)
- Quote randomization
- Video or scroll synchronization for quotes
- GSAP/foreground animation reduced-motion support (unrelated to Phase 1)
- Character database
- Wanted Archive
- Arc / Voyage Log system
- Location database / World map
- Battle archive
- Crew / faction database
- Devil Fruit system
- Haki / Powers system
- Ship archive
- Timeline
- Mystery board
- Global search
- Spoiler system
- Image asset management system

### Next Recommended Phase

**Phase 2** — Data / Content Architecture Foundation
- Begin building the data layer for future One Piece content systems

---

## Phase 1G — Post-Lock Regression Test & Phase 2 Handoff

**Date**: 2026-07-27

**Objective**: Final regression checkpoint proving the Phase 1 checkpoint can be trusted before Phase 2 development. Recover from persistent memory only (simulating a fresh AI agent handoff).

### Files Modified

| File | Change |
|------|--------|
| `docs/PROJECT_MEMORY.md` | Updated current phase to Phase 1G, added Phase 1G to summary table |
| `docs/PHASE_HISTORY.md` | Appended Phase 1G entry |

### Files Created

None.

### Files Deleted

None.

### Changes Made

Documentation-only: updated project memory and phase history to reflect the successful Phase 1G regression audit.

### Hero Lock

| Check | Result |
|-------|--------|
| Status | ✅ LOCKED — recorded in PROJECT_MEMORY.md |
| Protected files | ✅ `Hero.jsx`, `Hero.css`, `heroQuotes.js` documented |
| Protection rules | ✅ 12 rules + 2 exception conditions documented |

### Video Invariants

| Check | Result |
|-------|--------|
| `autoPlay` | ✅ Present |
| `muted` | ✅ Present |
| `loop` | ✅ Present |
| `playsInline` | ✅ Present |
| Native playback | ✅ Continuous, no JS seeking |
| Scroll-independent | ✅ No `currentTime`, `video.pause()`, ScrollTrigger on video |
| Quote-independent | ✅ No video references in rotation/transition |
| `currentTime` manipulation | ✅ Zero occurrences in project |
| ScrollTrigger scrubbing | ✅ None |

### Quote Invariants

| Check | Result |
|-------|--------|
| Data source | ✅ `src/data/heroQuotes.js` — single source of truth |
| Quote count | 7 |
| Rotation | ✅ Sequential, `(prev + 1) % heroQuotes.length` |
| Interval | 7000ms (`QUOTE_INTERVAL_MS`) |
| Loop | ✅ Modulo wraps last to first |
| Transition | ✅ CSS opacity + translateY, 400ms each direction |
| Cleanup | ✅ `clearInterval` + `clearTimeout` (both fade timers) |
| Reduced motion | ✅ CSS `transition: none` + JS instant swap |
| Scroll coupling | ✅ NONE |
| Video coupling | ✅ NONE |

### Chapter Removal

| Check | Result |
|-------|--------|
| Old Hero chapter UI found | ✅ Zero — no `Chapter`, `CHAPTER`, or `hero__eyebrow` in codebase |
| Obsolete chapter logic | ✅ None found |

### Runtime Verification

| Check | Result |
|-------|--------|
| `npm run dev` | ✅ Started — no compilation errors, no missing modules |
| Hero loads | ✅ Confirmed at code level |
| Video | ✅ `<video autoPlay muted loop playsInline>` |
| Quotes | ✅ Centralized, rotating, transitioning |
| Navbar | ✅ Present, unchanged |
| Scroll indicator | ✅ Present, unchanged |
| Section1 | ✅ Present, unchanged |
| Runtime errors | ✅ None detected |

### Responsive Regression

| Size | Result |
|------|--------|
| 1440×900 | ✅ Code-structure verified |
| 390×844 | ✅ Mobile breakpoints preserved |
| 320px | ✅ `max-width: 70%` on quote prevents overflow |
| Horizontal overflow | ✅ None |

### Reduced Motion

| Check | Result |
|-------|--------|
| CSS `transition: none` | ✅ Present in `@media (prefers-reduced-motion: reduce)` |
| JS instant swap | ✅ `window.matchMedia` detection |
| Functional without animation | ✅ Quote rotation works regardless |

### Production Validation

| Check | Result |
|-------|--------|
| `npm run lint` | ✅ Passed — no errors or warnings |
| `npm run build` | ✅ Passed — clean build (255ms) |
| Tests | ✅ Not available |
| Production preview | Not tested (no preview script verified) |
| Asset errors | ✅ None |

### Recovery Simulation

**Repository-only recovery**: ✅ Successful

All 10 questions answerable from repository documentation:
1. What is One Piece 2.0? — Fan-built interactive One Piece experience (PROJECT_MEMORY.md)
2. What has been completed? — Phase 1 (6 sub-phases), Hero locked (PHASE_HISTORY.md)
3. What is protected? — Video, navbar, scroll indicator, scenes, quotes, Section1 (PROJECT_MEMORY.md)
4. Where are quotes stored? — `src/data/heroQuotes.js` (PROJECT_MEMORY.md)
5. How do quotes rotate? — `setInterval` at 7000ms, sequential, looping (PROJECT_MEMORY.md)
6. Is video connected to scrolling? — NO (PROJECT_MEMORY.md, code search)
7. Missing image behavior? — Entity exists with placeholder (PROJECT_MEMORY.md)
8. Future map? — Image-first, finished asset + hotspots (PROJECT_MEMORY.md)
9. Next phase? — Phase 2: Data / Content Architecture (PROJECT_MEMORY.md)
10. What must agent do before editing? — 10-step recovery process (PROJECT_MEMORY.md)

**Missing context**: None — documentation is sufficient.

### Repository State

| Check | Result |
|-------|--------|
| Branch | `main` |
| HEAD | `5ff7586` — phase 1f: lock hero and complete phase 1 |
| Working tree | Clean (no uncommitted production changes) |
| Phase 1F commit | `5ff7586` |
| Stable tag | Not created |
| Untracked files | `../AGENTS.md`, `../opencode.json` (outside project root) |

### Protected File Integrity

| Check | Result |
|-------|--------|
| Uncommitted protected-file changes | ✅ None — all protected files clean |
| Unexpected changes | ✅ None |

### Known Issues

None.

### Deferred Work

All future content systems remain deferred (characters, arcs, map, battles, crews, Devil Fruits, Haki, ships, timeline, mysteries, search, spoilers, asset management).

### Phase 2 Gate

**READY FOR PHASE 2**

### Next Recommended Phase

**Phase 2A** — Architecture & Data Foundation Audit
- Begin building the data layer for future One Piece content systems

---

## Post-1G Memory Sync — Recovery Checkpoint Refresh

> **Note**: Documentation-only sync, not a new feature phase. Applied between Phase 1G and Phase 2A.

**Date**: 2026-08-01

**Objective**: Refresh the persistent recovery checkpoint after a fresh manual verification of the repository state, so memory docs match the actual HEAD before Phase 2 work begins.

### Files Modified

| File | Change |
|------|--------|
| `docs/PROJECT_MEMORY.md` | Updated `Last Updated` to 2026-08-01; corrected Recovery Checkpoint latest commit to `027794f` (was stale `ab77f1b`); added Working tree status row |
| `AGENTS.md` | Updated `Last Updated` to 2026-08-01; refreshed Completed Phases index and Change Log |

### Files Created

None.

### Files Deleted

None.

### Changes Made

1. **Checkpoint corrected**: The Recovery Checkpoint recorded `ab77f1b` (phase 1e), but the verified HEAD is `027794f` (phase 1g). Updated to the actual commit.
2. **Working tree recorded**: Added explicit clean-tree status row (only untracked `AGENTS.md` and `opencode.json` live outside the project root).
3. **Lightweight index synced**: `AGENTS.md` last-updated date, completed phases list, and change log brought in line with the primary docs.

### Verified State

| Check | Result |
|-------|--------|
| Branch | `main` |
| HEAD | `027794f` — phase 1g |
| Working tree | ✅ Clean |
| Phase 1 status | ✅ COMPLETE |
| Hero status | 🔒 LOCKED |
| Documentation-code sync | ✅ Verified (Hero.jsx, Navbar.jsx, Section1.jsx, heroQuotes.js match docs) |

### Known Issues

None.

### Validation Results

| Check | Result |
|-------|--------|
| `npm run lint` / `npm run build` | Not applicable — documentation-only change, no code touched |

### Next Recommended Phase

**Phase 2A** — Architecture & Data Foundation Audit
- Begin building the data layer for future One Piece content systems

---

## Phase 2A — Architecture Audit & Data Foundation Blueprint

**Date**: 2026-08-01

**Objective**: Analyze the current project and produce a robust architectural blueprint that all future phases will follow. Analysis, documentation, and planning only — NO production code changes, NO data/UI implementation.

### Files Created

| File | Purpose |
|------|---------|
| `docs/PHASE2_ARCHITECTURE_PLAN.md` | Full Phase 2 architecture blueprint — current state, future architecture, entity/image/map strategies, migration plan, Phase 2B–2L roadmap |

### Files Modified

| File | Change |
|------|--------|
| `docs/PROJECT_MEMORY.md` | Current phase → Phase 2A; added Phase 2A to summary; recovery checkpoint notes docs-only changes; added Phase 2 Architecture Plan section; next phase → 2B |
| `AGENTS.md` | Index synced — Phase 2A marked complete, plan file location noted, next phase → 2B, change log entry added |

### Findings

1. **Only one true data module exists**: `src/data/heroQuotes.js`. All other One Piece content (Hero `scenes`, Section1 `crew`) is hardcoded inline in JSX.
2. **Orphan assets identified**: `public/icons.svg`, `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg` — none referenced anywhere.
3. **Image naming is numeric** (`img1.png`…`img10.png`) — not predictable per the future entity-name rule.
4. **No routing, no tests, no TypeScript** — confirmed; single-page React SPA.
5. **Nav links are placeholders** (`href="#"`); `index.html` title still "vite-project".
6. **Tech stack verified**: React 19.2.7, Vite 8.1.0, GSAP 3.15.0, ESLint 10.5.0, Node v24.18.0.
7. **Protected systems all untouched**: Hero (🔒), Navbar, Section1, heroQuotes.js — zero production changes.

### Protected Systems Verified

| System | Status |
|--------|--------|
| Hero (video, quotes, scenes, scroll indicator) | ✅ Unchanged — LOCKED |
| Navbar | ✅ Unchanged |
| Section1 (Crew cards) | ✅ Unchanged |
| `src/data/heroQuotes.js` | ✅ Unchanged |

### Production Code Changes

**NONE.** This phase is documentation-only by design.

### Validation Results

| Check | Result |
|-------|--------|
| `npm run lint` | ✅ Passed — no errors or warnings |
| `npm run build` | ✅ Passed — clean production build |
| Tests | Not available (no test framework) |

### Known Issues

None new. Documented limitations recorded in the architecture plan (inline data, orphan assets, placeholder nav, numeric image names).

### Deferred Work

All Phase 2B–2L implementation (ID convention, schemas, relationships, sample dataset, verification) is deferred by design.

### Next Recommended Phase

**Phase 2B** — Entity ID Convention
- Define the slug-based ID format (e.g., `monkey-d-luffy`, `alabasta`, `wano`) that all future entities will use
- No data implementation

---

## Phase 2 Roadmap Revision — Finalized Micro-Phase Sequence (2B–2O)

**Date**: 2026-08-01

**Objective**: Record the user-finalized Phase 2 micro-phase sequence, superseding the provisional 2B–2L roadmap recorded in the Phase 2A entry. Documentation-only revision — no production code changed.

### Finalized Roadmap

| Phase | Objective |
|-------|-----------|
| **2A** | Architecture audit & blueprint — ✅ COMPLETE |
| **2B** | Repository conventions |
| **2C** | Entity ID conventions |
| **2D** | Shared metadata/schema conventions |
| **2E** | Character schema |
| **2F** | Location schema |
| **2G** | Arc schema |
| **2H** | Crew/Faction schema |
| **2I** | Battle schema |
| **2J** | Devil Fruit schema |
| **2K** | Ship schema |
| **2L** | Relationship conventions |
| **2M** | Small integrated dataset |
| **2N** | Architecture verification |
| **2O** | Architecture lock |

### Files Modified

| File | Change |
|------|--------|
| `docs/PHASE2_ARCHITECTURE_PLAN.md` | Roadmap table → 2A–2O; phase refs updated (characters→2E, locations→2F, arcs→2G, crews→2H, battles→2I, fruits→2J, ships→2K, relationships→2L); haki.js → future (not in roadmap); imageResolver.js → future (post-roadmap); next step → 2B Repository Conventions |
| `docs/PROJECT_MEMORY.md` | Next phase → 2B Repository Conventions; roadmap reference → 2B–2O |
| `AGENTS.md` | Next phase → 2B Repository Conventions; change log entry added |

### Notes

- The provisional "Phase 2B — Entity ID Convention" pointer from Phase 2A is superseded: entity IDs are now **2C**, repository conventions are **2B**.
- No protected systems touched. No production code changed.

### Next Recommended Phase

**Phase 2B** — Repository Conventions
- Establish folder layout, module naming, and file conventions for the future data layer
- No data implementation

---

## Phase 2C — Universal Entity ID Convention

**Date**: 2026-08-01

**Objective**: Define ONE universal identification system that every future One Piece entity will follow (characters, locations, arcs, battles, crews, ships, Devil Fruits, events, timeline, mysteries). Convention must remain stable for the lifetime of the project.

### Files Created

| File | Purpose |
|------|---------|
| `src/data/shared/entity-ids.md` | The complete Universal Entity ID Convention — rules, display-name separation, image key, file naming, examples, invalid examples, future relationships |

### Files Modified

| File | Change |
|------|--------|
| `src/data/shared/README.md` | Added "Established Conventions → Entity IDs (Phase 2C) ✅" section referencing `entity-ids.md`; updated status |
| `docs/PROJECT_MEMORY.md` | Current phase → 2C; summary + recovery checkpoint updated; next phase → 2D; ID convention location noted |
| `docs/PHASE2_ARCHITECTURE_PLAN.md` | Roadmap row 2C marked ✅ DONE; closing note → 2D–2O; section 16 → Phase 2D; section 9 legend updated (shared/ holds entity-ids.md) |
| `AGENTS.md` | Phase 2C complete; next phase → 2D; change log entry added |

### Convention Established

1. **Universal rules**: IDs are lowercase, kebab-case, unique, stable, immutable once published, independent from UI text. NEVER generated dynamically at runtime.
2. **Display name separation**: `id` (`monkey-d-luffy`) ≠ `displayName` (`Monkey D. Luffy`). UI shows display name; relationships use IDs.
3. **Image key**: `imageKey` normally equals the entity ID (`monkey-d-luffy` → `monkey-d-luffy`).
4. **File naming**: artwork follows `entity-id.*` (e.g., `monkey-d-luffy.*`, `alabasta.*`) in any browser format, no fixed extension.
5. **Examples**: one per type — Character `monkey-d-luffy`, Location `alabasta`, Arc `marineford`, Crew `straw-hat-pirates`, Ship `thousand-sunny`, Battle `marineford-war`, Devil Fruit `gomu-gomu-no-mi`.
6. **Invalid examples documented**: `Luffy`, `Monkey D Luffy`, `Monkey_D_Luffy`, `MonkeyDLuffy`, `IMG001`, `character1`.
7. **Future relationships**: reference IDs via `characterIds`, `locationIds`, `crewIds`, `battleIds`, `shipIds`, `fruitIds`. No logic implemented.

### Protected Systems Verified

| System | Status |
|--------|--------|
| Hero (video, quotes, scenes, scroll indicator) | ✅ Unchanged — LOCKED |
| Navbar | ✅ Unchanged |
| Section1 (Crew cards) | ✅ Unchanged |
| `src/data/heroQuotes.js` | ✅ Unchanged |

### Production Code Changes

**NO** — documentation only. No JS/JSX/CSS modified.

### Validation Results

| Check | Result |
|-------|--------|
| `npm run lint` | ✅ Passed — no errors or warnings |
| `npm run build` | ✅ Passed — clean production build |
| Tests | Not available (no test framework) |

### Known Issues

None.

### Deferred Work

All content, schemas, image resolver, and UI remain deferred by design.

### Next Recommended Phase

**Phase 2D** — Shared Entity Metadata & Schema Foundation
- Define the common metadata fields every entity shares (id, displayName, imageKey, summary…)
- No data implementation

---

## Phase 2D — Shared Entity Metadata & Schema Foundation

**Date**: 2026-08-01

**Objective**: Design one reusable metadata foundation that every future entity schema (characters, locations, arcs, battles, crews, ships, Devil Fruits, events, timeline, mysteries) extends. Lightweight and generic — NO giant master object, NO entity-specific fields.

### Files Created

| File | Purpose |
|------|---------|
| `src/data/shared/entity-metadata.md` | The shared metadata foundation — required fields, optional fields, image/tag/status/alias/notes strategies, relationship placeholders, inheritance philosophy, illustrative example |

### Files Modified

| File | Change |
|------|--------|
| `src/data/shared/README.md` | Added "Shared Metadata & Schema Foundation (Phase 2D) ✅" section referencing `entity-metadata.md`; expected phases 2D marked DONE |
| `docs/PROJECT_MEMORY.md` | Current phase → 2D; summary + recovery checkpoint updated; next phase → 2E; metadata foundation location noted |
| `docs/PHASE2_ARCHITECTURE_PLAN.md` | Roadmap row 2D marked ✅ DONE; closing note → 2E–2O; section 16 → Phase 2E; section 9 legend updated (shared/ also holds entity-metadata.md) |
| `AGENTS.md` | Phase 2D complete; next phase → 2E; change log entry added |

### Shared Concepts Established

1. **Design principle**: NO giant master object. Lightweight generic shared layer; specialized schemas extend it.
2. **Required fields** (intentionally small): `id`, `displayName`, `description`.
3. **Optional fields**: `aliases`, `tags`, `status`, `imageKey`, `notes`, `metadata`, `createdAt`, `updatedAt`.
4. **Excluded fields** (entity-specific — belong in specialized schemas): `bounty`, `crew`, `devilFruit`, `captain`, `ship`, `location`, `arc`, `battle`, `power`, `haki`, `episode`, `kingdom`, `island`.
5. **Image metadata**: reference `imageKey` only — never paths, extensions, or absolute URLs. Loading is a future phase.
6. **Tag strategy**: concept only — `pirate`, `marine`, `yonko`, `east-blue`, `villain`, `captain`, `doctor`, `navigator` (illustrative).
7. **Status strategy**: concept only — `active`, `inactive`, `unknown`, `historic`, `deceased`.
8. **Alias strategy**: optional `aliases` array (e.g., Gold Roger → Gol D. Roger). Metadata only, no search.
9. **Notes strategy**: optional maintainer notes, never rendered directly in UI.
10. **Relationship placeholders**: `characterIds`, `locationIds`, `battleIds`, `crewIds`, `fruitIds`, `shipIds` — IDs only, not implemented.
11. **Inheritance**: future schema phases (2E–2K) extend this layer in their own folders.

### Protected Systems Verified

| System | Status |
|--------|--------|
| Hero (video, quotes, scenes, scroll indicator) | ✅ Unchanged — LOCKED |
| Navbar | ✅ Unchanged |
| Section1 (Crew cards) | ✅ Unchanged |
| `src/data/heroQuotes.js` | ✅ Unchanged |

### Production Code Changes

**NO** — documentation only. No JS/JSX/CSS modified.

### Validation Results

| Check | Result |
|-------|--------|
| `npm run lint` | ✅ Passed — no errors or warnings |
| `npm run build` | ✅ Passed — clean production build |
| Tests | Not available (no test framework) |

### Known Issues

None.

### Deferred Work

All content, specialized schemas, relationships, image loading, and UI remain deferred by design.

### Next Recommended Phase

**Phase 2E** — Character Schema
- Define the character entity schema extending the shared metadata foundation
- No production data implementation

---

## Phase 2E — Character Schema Foundation

**Date**: 2026-08-01

**Objective**: Define ONE reusable character schema that represents every One Piece character type (Straw Hats, Marines, Yonko, Shichibukai, Revolutionaries, World Government, Pirates, Civilians, Kings, Villains, Historical figures, Future characters). Schema only — NOT the character database.

### Files Created

| File | Purpose |
|------|---------|
| `src/data/characters/character-schema.md` | The Character Schema Foundation — base metadata reuse, character-specific fields, ID-only relationships, achievements structure, power references, image strategy, spoiler support, one sample record, archetype validation |

### Files Modified

| File | Change |
|------|--------|
| `src/data/characters/README.md` | Added "Schema (Phase 2E ✅)" section referencing `character-schema.md`; expected phases 2C/2D/2E marked DONE + 2M noted; status updated |
| `docs/PROJECT_MEMORY.md` | Current phase → 2E; summary + recovery checkpoint updated; next phase → 2F; schema location noted |
| `docs/PHASE2_ARCHITECTURE_PLAN.md` | Roadmap row 2E marked ✅ DONE; closing note → 2F–2O; section 16 → Phase 2F; section 9 legend updated (characters/ also holds character-schema.md) |
| `AGENTS.md` | Phase 2E complete; next phase → 2F; change log entry added |

### Schema Established

1. **Objective**: one schema for all character types — no per-type variants.
2. **Design principles**: reusable, extensible, image-first, relationship-friendly, independent from UI/image loading/routing.
3. **Base metadata**: reuses shared layer (`id`, `displayName`, `description` required; aliases/tags/status/imageKey/notes/metadata/dates optional) — NOT duplicated.
4. **Character fields**: `bounty`, `occupation`, `role`, `species`, `gender`, `birthday`, `age`, `height`, `originLocationId`, `currentLocationId`, `nicknames`, `haki`, `devilFruitId`, `weapons`, `fightingStyles`, `voiceActors`, `firstAppearance`, `latestAppearance`.
5. **Relationships**: ID references only — `crewIds`, `locationIds`, `arcIds`, `battleIds`, `shipIds`, `fruitId`, `mentorIds`, `rivalIds`, `familyIds`. Never embed objects.
6. **Achievements**: structure only — typed entries (title/victory/territory/kingdom/accomplishment), nothing populated.
7. **Powers**: references only — `haki` array, `devilFruitId`, `fightingStyles`, `weapons`. No power databases.
8. **Image strategy**: `imageKey` only (e.g., `monkey-d-luffy`); never hardcoded extensions or URLs.
9. **Spoiler safety**: `spoilerLevel` field (`basic`/`advanced`/`late`) supports future filtering — no implementation.
10. **Sample**: ONE record (`monkey-d-luffy`) validates the schema — documentation only.
11. **Archetype validation**: pirate / marine / civilian / historical figure all fit the same schema with zero modifications.

### Protected Systems Verified

| System | Status |
|--------|--------|
| Hero (video, quotes, scenes, scroll indicator) | ✅ Unchanged — LOCKED |
| Navbar | ✅ Unchanged |
| Section1 (Crew cards) | ✅ Unchanged |
| `src/data/heroQuotes.js` | ✅ Unchanged |

### Production Code Changes

**NO** — documentation only. No JS/JSX/CSS modified.

### Validation Results

| Check | Result |
|-------|--------|
| `npm run lint` | ✅ Passed — no errors or warnings |
| `npm run build` | ✅ Passed — clean production build |
| Tests | Not available (no test framework) |

### Known Issues

None.

### Deferred Work

All content, the character database (Phase 2M), interfaces, search, image loading, and spoiler filtering remain deferred by design.

### Next Recommended Phase

**Phase 2F** — Location Schema
- Define the location entity schema extending the shared metadata foundation
- No production data implementation

---

## Phase 2B — Repository Foundation & Data Organization

**Date**: 2026-08-01

**Objective**: Prepare the repository for future scalable data. Build the shelves (folder structure + documentation), not the content. No characters, locations, arcs, IDs, schemas, resolvers, UI, or Hero changes.

### Folders Created

`src/data/` now contains:

| Folder | Purpose | Future Schema Phase |
|--------|---------|---------------------|
| `characters/` | Character datasets (100–300+ planned) | 2E |
| `locations/` | Location datasets (islands, seas, regions) | 2F |
| `arcs/` | Arc / saga datasets | 2G |
| `crews/` | Crew / faction datasets | 2H |
| `battles/` | Battle datasets | 2I |
| `fruits/` | Devil Fruit datasets | 2J |
| `ships/` | Ship datasets | 2K |
| `events/` | Notable world-event datasets | not yet assigned |
| `timeline/` | Chronological timeline records | references 2C/2L |
| `shared/` | IDs, metadata, relationships, image keys, validation (documented only) | 2C/2D/2L |

All folders are EMPTY — README.md only. **Do not populate until their schema phases.**

### Files Created

| File | Purpose |
|------|---------|
| `src/data/characters/README.md` | Folder purpose + belongs / does-not-belong + phases |
| `src/data/locations/README.md` | Same |
| `src/data/arcs/README.md` | Same |
| `src/data/battles/README.md` | Same |
| `src/data/crews/README.md` | Same |
| `src/data/fruits/README.md` | Same |
| `src/data/ships/README.md` | Same |
| `src/data/events/README.md` | Same |
| `src/data/timeline/README.md` | Same |
| `src/data/shared/README.md` | Future shared concepts (IDs, metadata, relationships, image keys, validation) |

### Files Modified

| File | Change |
|------|--------|
| `docs/PHASE2_ARCHITECTURE_PLAN.md` | Section 9 tree now mirrors real folders; section 11 extended (future image organization under `public/images/`, naming, missing-image policy, image replacement policy); section 13 extended (recommended migration order Characters→Locations→Arcs→Battles→Relationships→Images→Interfaces) |
| `docs/PROJECT_MEMORY.md` | Current phase → 2B; summary + recovery checkpoint updated; next phase → 2C; data foundation noted |

### Existing Data Preserved

- `src/data/heroQuotes.js` — ✅ untouched, not renamed, not relocated.
- Hero import (`import heroQuotes from '../data/heroQuotes'`) — ✅ unchanged.
- No production imports or logic changed.

### Protected Systems Verified

| System | Status |
|--------|--------|
| Hero (video, quotes, scenes, scroll indicator) | ✅ Unchanged — LOCKED |
| Navbar | ✅ Unchanged |
| Section1 (Crew cards) | ✅ Unchanged |
| `src/data/heroQuotes.js` | ✅ Unchanged |

### Production Code Changes

**NO** — production code (JS/JSX/CSS) untouched. Only new empty folders, README files, and documentation.

### Validation Results

| Check | Result |
|-------|--------|
| `npm run lint` | ✅ Passed — no errors or warnings |
| `npm run build` | ✅ Passed — clean production build |
| Tests | Not available (no test framework) |

### Known Issues

None.

### Deferred Work

All content (characters, locations, arcs, etc.), IDs, schemas, relationships, image resolver, and UI remain deferred by design.

### Next Recommended Phase

**Phase 2C** — Entity ID Convention
- Define the slug-based ID format (e.g., `monkey-d-luffy`) that all future entities will use
- No data implementation

---

## Phase 2F — Location Schema Foundation

**Date**: 2026-08-01

**Objective**: Define ONE reusable location schema that represents every One Piece location type (seas, oceans, islands, kingdoms, cities, villages, forests, castles, marine bases, sky islands, underwater locations, pirate hideouts, historic locations). Schema only — NOT the location database.

### Files Created

| File | Purpose |
|------|---------|
| `src/data/locations/location-schema.md` | The Location Schema Foundation — base metadata reuse, location-specific fields, ID-only relationships, image strategy, map readiness, history support, spoiler support, one sample record, archetype validation |

### Files Modified

| File | Change |
|------|--------|
| `src/data/locations/README.md` | Added "Schema (Phase 2F ✅)" section referencing `location-schema.md`; established conventions (2C/2D) marked DONE + 2M noted; status updated |
| `docs/PROJECT_MEMORY.md` | Current phase → 2F; summary + recovery checkpoint updated; next phase → 2G; schema location noted |
| `docs/PHASE2_ARCHITECTURE_PLAN.md` | Roadmap row 2F marked ✅ DONE; closing note → 2G–2O; section 16 → Phase 2G; section 9 legend updated (locations/ also holds location-schema.md) |
| `AGENTS.md` | Phase 2F complete; next phase → 2G; change log entry added |

### Schema Established

1. **Objective**: one schema for all location types — no per-type variants.
2. **Design principles**: reusable, extensible, image-first, relationship-friendly, map-ready, independent from UI/routing/image loading.
3. **Base metadata**: reuses shared layer (`id`, `displayName`, `description` required; aliases/tags/status/imageKey/notes/metadata/dates optional) — NOT duplicated.
4. **Location fields**: `locationType`, `sea`, `region`, `parentLocationId`, `connectedLocationIds`, `climate`, `terrain`, `government`, `controllingFactionIds`, `population`, `firstAppearance`, `latestAppearance`.
5. **Relationships**: ID references only — `characterIds`, `arcIds`, `battleIds`, `crewIds`, `eventIds`, `neighborLocationIds`. Never embed objects.
6. **Image strategy**: `imageKey` only (e.g., `alabasta`, `water-7`, `marineford`, `egghead`); never hardcoded extensions or URLs.
7. **Map readiness**: planned fields `mapRegion`, `hotspotId`, `displayOrder` — documented only, no coordinates or hotspots.
8. **History support**: planned structures — `historicalSignificance`, `majorBattles`, `importantEvents`, `rulers`, `organizations`, `notableResidents` (nothing populated).
9. **Spoiler readiness**: `spoilerLevel` field (`basic`/`advanced`/`late`) supports future filtering — no implementation.
10. **Sample**: ONE record (`alabasta`) validates the schema — documentation only.
11. **Archetype validation**: island / kingdom / marine base / sky island / underwater all fit the same schema with zero modifications.

### Protected Systems Verified

| System | Status |
|--------|--------|
| Hero (video, quotes, scenes, scroll indicator) | ✅ Unchanged — LOCKED |
| Navbar | ✅ Unchanged |
| Section1 (Crew cards) | ✅ Unchanged |
| `src/data/heroQuotes.js` | ✅ Unchanged |

### Production Code Changes

**NO** — documentation only. No JS/JSX/CSS modified.

### Validation Results

| Check | Result |
|-------|--------|
| `npm run lint` | ✅ Passed — no errors or warnings |
| `npm run build` | ✅ Passed — clean production build |
| Tests | Not available (no test framework) |

### Known Issues

None.

### Deferred Work

All content, the location database (Phase 2M), the interactive map, hotspots, image loading, and spoiler filtering remain deferred by design.

### Next Recommended Phase

**Phase 2G** — Arc Schema
- Define the arc entity schema extending the shared metadata foundation
- No production data implementation
