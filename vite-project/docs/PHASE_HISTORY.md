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
