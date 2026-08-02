# PROJECT MEMORY — One Piece 2.0

> **Last Updated**: 2026-08-02
> **Current Phase**: Phase 2N — Architecture Verification
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
| **Latest commit** | `e308f37` — phase 2n: data layer verification and canonicalization |
| **Working tree** | Phase 2N verification audit — 8 schema-doc sample-consistency fixes uncommitted |
| **Phase 1 status** | ✅ COMPLETE |
| **Phase 2A status** | ✅ COMPLETE (documentation-only) |
| **Phase 2B status** | ✅ COMPLETE (folders + READMEs, no production logic changes) |
| **Phase 2C status** | ✅ COMPLETE (documentation-only) |
| **Phase 2D status** | ✅ COMPLETE (documentation-only) |
| **Phase 2E status** | ✅ COMPLETE (documentation-only) |
| **Phase 2F status** | ✅ COMPLETE (documentation-only) |
| **Phase 2G status** | ✅ COMPLETE (documentation-only) |
| **Phase 2H status** | ✅ COMPLETE (documentation-only) |
| **Phase 2I status** | ✅ COMPLETE (documentation-only) |
| **Phase 2J status** | ✅ COMPLETE (documentation-only) |
| **Phase 2K status** | ✅ COMPLETE (documentation-only) |
| **Phase 2L status** | ✅ COMPLETE (documentation-only) |
| **Phase 2M status** | ✅ COMPLETE (first real production data — 3 characters, 2 locations, 1 arc, 1 crew, 1 battle, 1 ship, 1 power) |
| **Phase 2N status** | ✅ COMPLETE (verification tooling + canonicalizations + full audit/stress test — `npm run verify` PASS 0 errors, 0 warnings after mirror-gap resolution) |
| **Hero status** | 🔒 STABLE + PROTECTED |
| **Lint status** | ✅ Passing |
| **Build status** | ✅ Passing |
| **Verify status** | ✅ Passing (`npm run verify` — 0 errors, 0 warnings) |

---

## Project Structure

```
vite-project/
├── index.html
├── package.json
├── vite.config.js
├── scripts/
│   └── verify-data.mjs          ← Phase 2N data verification (npm run verify)
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

**Phase**: Phase 2N — Architecture Verification & Stress Test

**Goal**: Prove the Phase 2 data-layer architecture (schemas, IDs, metadata, relationships) is internally consistent and production-ready before Phase 2O locks it. Verification only — no new entities, no dataset expansion, no schema redesigns, no UI.

**Status**: ✅ COMPLETED — PASS. Both sample mirror-gap warnings resolved with Phase 2O candidate data additions (see "Phase 2N warning resolution" in PHASE_HISTORY.md). `npm run verify` → 0 errors, 0 warnings.

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
| **Phase 2F** | Location Schema Foundation | ✅ |
| **Phase 2G** | Arc Schema Foundation | ✅ |
| **Phase 2H** | Crew & Faction Schema Foundation | ✅ |
| **Phase 2I** | Battle Schema Foundation | ✅ |
| **Phase 2J** | Devil Fruit & Power Schema Foundation | ✅ |
| **Phase 2K** | Ship Schema Foundation | ✅ |
| **Phase 2L** | Cross-Entity Relationship Convention | ✅ |
| **Phase 2M** | Small Integrated Dataset | ✅ |
| **Phase 2N** | Architecture Verification & Stress Test | ✅ |

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

**Phase 2O** — Architecture Lock

Freeze the Phase 2 data-layer conventions (schemas, ID convention, relationship matrix, verification tooling) and record protected systems. The two Phase 2N mirror warnings were resolved with small data additions (Marineford `crewIds`, Luffy `locationIds` + `water-7`) — `npm run verify` now reports 0 errors, 0 warnings.

---

## Phase 2 Architecture Plan

Full blueprint lives in **`docs/PHASE2_ARCHITECTURE_PLAN.md`** — created in Phase 2A.

It covers: current architecture, data flow, assets, strengths, limitations, risks, recommended future architecture, entity relationships, image strategy, map strategy, migration strategy, and the finalized Phase 2B–2O micro-phase roadmap.

**Phase 2B created the data foundation**: `src/data/` now contains folders `characters/`, `locations/`, `arcs/`, `battles/`, `crews/`, `fruits/`, `ships/`, `events/`, `timeline/`, `shared/` — each with a concise README. All folders are EMPTY (documentation only). `heroQuotes.js` remains untouched at `src/data/heroQuotes.js`.

**Phase 2C established the Universal Entity ID Convention**: documented in **`src/data/shared/entity-ids.md`** — lowercase kebab-case IDs, immutable once published, never generated at runtime, `id` ≠ `displayName`, `imageKey` = entity ID, future relationships reference IDs. No production code touched.

**Phase 2D established the Shared Entity Metadata & Schema Foundation**: documented in **`src/data/shared/entity-metadata.md`** — required fields (`id`, `displayName`, `description`), optional fields (`aliases`, `tags`, `status`, `imageKey`, `notes`, `metadata`, `createdAt`, `updatedAt`), image/tag/status/alias/notes strategies, relationship placeholders (IDs only). No giant master object; specialized schemas extend this layer. No production code touched.

**Phase 2E established the Character Schema Foundation**: documented in **`src/data/characters/character-schema.md`** — one reusable schema for all character types (pirates, marines, civilians, historical figures…). Extends shared metadata; character fields (`bounty`, `occupation`, `role`, `species`, `haki`, `devilFruitId`, …); ID-only relationships; `imageKey` strategy; `spoilerLevel` for future spoiler safety; one sample record (`monkey-d-luffy`) for validation. No character database yet. No production code touched.

**Phase 2F established the Location Schema Foundation**: documented in **`src/data/locations/location-schema.md`** — one reusable schema for all location types (seas, islands, kingdoms, marine bases, sky islands, underwater…). Extends shared metadata; location fields (`locationType`, `sea`, `region`, `climate`, `government`, `controllingFactionIds`, …); ID-only relationships; `imageKey` strategy; map-readiness fields (`mapRegion`, `hotspotId`, `displayOrder` — documented only); `spoilerLevel` for future spoiler safety; one sample record (`alabasta`) for validation. No location database yet. No production code touched.

**Phase 2G established the Arc Schema Foundation**: documented in **`src/data/arcs/arc-schema.md`** — one reusable schema for all arc types (introductory, saga, war, training, flashback, transitional…). Extends shared metadata; arc fields (`sagaId`, `arcNumber`, `chronologicalOrder`, `arcType`, `animeEpisodeRange`, `mangaChapterRange`, `duration`, `overview`, `centralConflict`, `outcome`, `significance`, `recommendedViewingOrder`); ID-only relationships (`characterIds`, `locationIds`, `battleIds`, `crewIds`, `eventIds`, `shipIds`); `imageKey` strategy; timeline-readiness fields (`previousArcId`, `nextArcId`, `chronologicalOrder` — documented only); `spoilerLevel` for future spoiler safety; one sample record (`marineford-arc`) for validation. No arc database yet. No production code touched.

**Phase 2H established the Crew & Faction Schema Foundation**: documented in **`src/data/crews/crew-schema.md`** — one reusable schema for all organization types (pirate crews, marines, revolutionary army, world government, kingdoms, alliances, temporary alliances, historical factions…). Extends shared metadata; crew/faction fields (`organizationType`, `captainId`, `leaderIds`, `memberIds`, `shipIds`, `territoryIds`, `headquartersLocationId`, `emblem`, `allegiance`, `foundedBy`, `objective`, `motto`, `affiliations`); ID-only relationships (`characterIds`, `shipIds`, `locationIds`, `battleIds`, `arcIds`, `eventIds`); `imageKey` strategy; optional content (`history`, `formerMembers`, `achievements`, `knownAllies`, `knownEnemies`); `spoilerLevel` for future spoiler safety; one sample record (`straw-hat-pirates`) for validation. No crew database yet. No production code touched.

**Phase 2I established the Battle Schema Foundation**: documented in **`src/data/battles/battle-schema.md`** — one reusable schema for all battle types (duels, crew battles, marine battles, wars, historical conflicts…). Extends shared metadata; battle fields (`battleType`, `locationId`, `arcId`, `participantIds`, `winningSide`, `losingSide`, `outcome`, `duration`, `significance`, `casualties`, `timelineOrder`); ID-only relationships (`characterIds`, `crewIds`, `locationIds`, `shipIds`, `eventIds`, `arcIds`; `participantIds` canonical); `imageKey` strategy; timeline-readiness field (`timelineOrder` — documented only); optional content (`summary`, `keyMoments`, `importantQuotes`, `futureConsequences`); `spoilerLevel` for future spoiler safety; one sample record (`marineford-war`) for validation. No battle database yet. No production code touched.

**Phase 2J established the Devil Fruit & Power Schema Foundation**: documented in **`src/data/fruits/power-schema.md`** — one reusable schema for every power system (Devil Fruits, Haki, combat styles, weapons-based systems, special abilities, non-fruit powers). Extends shared metadata; power fields (`powerType`, `fruitType`, `canonicalName`, `alternativeNames`, `userIds`, `previousUserIds`, `awakeningStatus`, `strengths`, `weaknesses`, `combatApplications`, `rarity`, `canonicalStatus`); Haki via `powerType: 'haki'` + `hakiType` + `advancedForm` (no separate Haki database); fruit categories via `fruitType` (paramecia/zoan/ancient-zoan/mythical-zoan/logia); ID-only relationships (`characterIds`, `battleIds`, `arcIds`, `locationIds`, `crewIds`, `relatedPowerIds`; `userIds`/`previousUserIds` canonical); `imageKey` strategy; optional content (`trivia`, `historicalUsers`, `symbolicMeaning`); `spoilerLevel` for future spoiler safety; one sample record (`gomu-gomu-no-mi`) for validation. No power database yet. No production code touched.

**Phase 2K established the Ship Schema Foundation**: documented in **`src/data/ships/ship-schema.md`** — one reusable schema for all ship types (pirate, marine, government, merchant, historical, special-purpose…). Extends shared metadata; ship fields (`shipType`, `ownerCrewId`, `previousOwnerIds`, `captainIds`, `builder`, `manufacturer`, `launchLocationId`, `currentLocationId`, `size`, `specialFeatures`, `armament`, `propulsion`, `firstAppearance`, `latestAppearance`); ID-only relationships (`crewIds`, `characterIds`, `battleIds`, `locationIds`, `arcIds`, `eventIds`); `imageKey` strategy; history-support fields (`ownershipHistory`, `majorUpgrades`, `repairs`, `destruction`, `restoration`, `significantVoyages` — documented only); optional content (`designInspiration`, `symbolicMeaning`, `trivia`); `spoilerLevel` for future spoiler safety; one sample record (`thousand-sunny`) for validation. No ship database yet. No production code touched.

**Phase 2L established the Cross-Entity Relationship Convention**: documented in **`src/data/shared/relationships.md`** — ONE universal relationship convention. Relationships always reference stable IDs (never embedded entities); stored-both strategy with ONE declared source of truth per relationship (reverse stored as an agreeing mirror copy — canonized in Phase 2N); cardinality rules (One→One singular, One→Many/Many→Many plural `*Ids`); standard field names (`characterIds`, `locationIds`, `battleIds`, `crewIds`, `shipIds`, `devilFruitIds`, `eventIds`, `arcIds`, `powerIds`; singulars `captainId`, `devilFruitId`, `locationId`, `arcId`, `ownerCrewId`); full entity relationship matrix (source-of-truth + stored-mirror columns); canonical alias canonization (battle `participantIds`, power `userIds`/`previousUserIds`, location `connectedLocationIds`); cascade principles (IDs immutable, renames/images never break links); image independence; future search/map/timeline navigation strategies; validation principles backed by Phase 2N tooling; one example relationship graph. Canonical-field notes updated in the battle/power/location schema files. No production code touched.

**Phase 2M created the first production data**: `src/data/<type>/index.js` for characters (3: `monkey-d-luffy`, `roronoa-zoro`, `nami`), locations (2: `marineford`, `water-7`), arcs (1: `marineford-arc`), crews (1: `straw-hat-pirates`), battles (1: `marineford-war`), ships (1: `thousand-sunny`), fruits/powers (1: `gomu-gomu-no-mi`). Every record follows its schema + `relationships.md` (ID-only refs, Phase 2L canonical aliases `participantIds` / `userIds` / `connectedLocationIds`). Verified: every referenced ID resolves to an existing entity of the correct type, no duplicate IDs, no duplicate array values, full traversal chain works (Luffy → crew → ship → battle → arc → location → Luffy → fruit). `npm run lint` + `npm run build` pass. No UI, no Hero/protected-system changes. Key findings for 2N/2O: (1) canonical subset lists (e.g., 3-of-10 `memberIds`) are unavoidable in a closed sample — full lists grow with the dataset; (2) Ship→Battle edge intentionally unexercised (Thousand Sunny was not at Marineford War); (3) `relationships.md` §13 example graph lists a non-canonical edge (Thousand Sunny → Marineford War) and should be corrected; (4) single-direction vs. stored-both ambiguity between `relationships.md` §4 and §5/§2E sample (both `crew.memberIds` and `character.crewIds` stored) needs canonicalization; (5) `fruitId` vs `devilFruitId` naming discrepancy across docs — dataset uses `devilFruitId` (matches 2E sample + 2L matrix).

**Phase 2N built the first verification tooling and canonicalized the data layer**: added `scripts/verify-data.mjs` (`npm run verify`) — structural checks are errors (global duplicate IDs, duplicate array values, unresolved references, type mismatches, unknown relationship fields, alias violations, self-references, circular `previousArcId`/`nextArcId` chains, malformed IDs, missing `id`/`displayName`/`description`/`imageKey`, `imageKey` ≠ id) and stored-both mirror gaps are warnings. Verification surfaced a real defect: the arc `marineford` and location `marineford` shared one ID, breaking `imageKey` uniqueness and global ID resolution — fixed by renaming the arc to **`marineford-arc`** (Phase 2N) across all datasets/schemas/docs, and `entity-ids.md` now requires GLOBALLY unique IDs (all types) with a same-name-collision rule. Canonicalizations applied: §4 rewritten to **stored-both with a declared source of truth** (§5 matrix now has source-of-truth + stored-mirror columns); `fruitId`/`fruitIds` → **`devilFruitId`/`devilFruitIds`** everywhere; §13 example graph replaced with a fully canonical traversal (uses `launchLocationId` + `connectedLocationIds`, no Sunny→Marineford edge). `npm run verify` → **PASS (0 errors, 2 warnings)**, lint + build clean, no UI/Hero changes. The 2 warnings were known sample gaps: (1) `crew.straw-hat-pirates.locationIds` lists `marineford` but `location.marineford.crewIds` was absent; (2) `location.water-7.characterIds` lists `monkey-d-luffy` but `character.monkey-d-luffy.locationIds` lacked `water-7`. **Both were later resolved with Phase 2O candidate data additions** — see "Phase 2N warning resolution" in PHASE_HISTORY.md; `npm run verify` now reports 0 errors, 0 warnings.

**Phase 2N full verification & stress test (audit pass)**: executed the complete 17-section architecture verification. Result: **PASS** — architecture is internally consistent and production-ready for Phase 2O. All 8 schemas audited (shared metadata, character, location, arc, crew, battle, power, ship): naming/required/optional/imageKey/metadata inheritance consistent; no schema contradicts another. Relationship audit: all 13 documented relationship pairs follow the Phase 2L ID-only convention — no embedded entity objects anywhere. Image audit: every schema references `imageKey` only; no paths, URLs, or hardcoded extensions; relationships independent of artwork. Data-quality audit (verified via `npm run verify` + manual review): no duplicate IDs, no invalid/orphaned references, consistent naming, no broken relationships, no invalid imageKeys. File-organization audit: all files in correct `src/data/` locations. Hero regression audit: Hero/Navbar/Section1/`heroQuotes.js`/video/animations all untouched since `027794f` — confirmed via git log. Documentation audit: PROJECT_MEMORY / PHASE_HISTORY / PHASE2_ARCHITECTURE_PLAN synchronized and recoverable by a fresh agent. **Audit findings (documentation-only fixes applied)**: (1) location-schema sample used forbidden `neighborLocationIds` → corrected to `connectedLocationIds`; (2) battle-schema sample listed alias `characterIds` alongside `participantIds` → removed; (3) power-schema sample listed alias `characterIds` alongside `userIds` → removed; (4) crew-schema sample had duplicate `shipIds` key → removed; (5) null singular placeholders in character/crew/ship samples (`currentLocationId`, `headquartersLocationId` = null) → omitted per §3; (6) doc-example arc IDs that collide with location IDs under the global-uniqueness rule (`wano`, `water-7`, `alabasta`, `dressrosa`, `whole-cake-island`, `east-blue`, `skypiea`, `egghead`, `impel-down` used as arcs) → suffix `-arc` applied in arc/power/ship schema samples; (7) `relationships.md` scope line updated (datasets + tooling now exist). Scale review: architecture supports 300+ characters / 100+ locations / 60+ arcs / 100+ battles / 50+ ships / 50+ crews / 50+ powers with no structural redesign (flat JS modules + ID-only references scale linearly; no premature optimization). Future-feature readiness: Character Archive, Wanted Poster Gallery, Arc Explorer, Interactive World Map, Timeline, Search, Relationship Explorer, Character Comparison, Battle/Crew/Ship Pages all architecture-compatible (ID traversal + `imageKey` + map-readiness fields + timeline-readiness fields + spoilerLevel). Stress test: adding the 301st character, a new crew, new Devil Fruit, artwork replacement, new island, new battle, and a non-canonical demo dataset all require zero schema changes. Risks: none critical; minor = mirror-pair maintenance in the verifier as datasets grow (warn-level until fuller data), `winningSide`/`losingSide` remain labels (not IDs) by design, fixed `MIRROR_PAIRS` list may need a derive-from-matrix refactor later, no automated tests beyond `npm run verify`. **Final recommendation: READY FOR PHASE 2O**. The 2 mirror-gap warnings raised by the audit were subsequently resolved with small data additions (see "Phase 2N warning resolution") — `npm run verify` now reports 0 errors, 0 warnings.

**Phase 2 data layer implementation has started.** Phase 2M delivered the first real data records; Phase 2N added the verification tooling; characters/locations/arcs/battles/crews/ships/powers remain small until future dataset phases. UI consumption is NOT started.
