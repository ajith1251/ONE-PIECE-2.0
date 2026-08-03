# PHASE 2 ARCHITECTURE PLAN — One Piece 2.0

> **Created**: 2026-08-01 (Phase 2A)
> **Status**: Blueprint only — NO production implementation has started
> **Purpose**: Allow a new AI agent to understand the project's current state and future direction without reading previous chats.

---

## 1. Current Project Architecture

### Repository Layout

```
one-piece2.0/
├── AGENTS.md                    ← Lightweight memory index (repo root)
├── opencode.json                ← Editor/tool config (repo root)
└── vite-project/
    ├── index.html               ← HTML entry (title still "vite-project")
    ├── package.json
    ├── vite.config.js           ← Vite + React plugin only
    ├── eslint.config.js         ← Flat config (js recommended + react-hooks + react-refresh)
    ├── docs/
    │   ├── PROJECT_MEMORY.md    ← Primary persistent memory
    │   ├── PHASE_HISTORY.md     ← Append-only phase log
    │   └── PHASE2_ARCHITECTURE_PLAN.md  ← This document
    ├── public/                  ← Served at site root "/"
    │   ├── favicon.svg          ← Used by index.html
    │   ├── icons.svg            ← ⚠️ ORPHAN — not referenced anywhere
    │   ├── images/
    │   │   ├── README.md        ← Universal Asset System architecture (Phase 3A)
    │   │   ├── img1.png – img10.png   ← Crew portraits (numeric names, UNTIL future migration)
    │   │   ├── characters/  locations/  arcs/  crews/  ships/  battles/  powers/  timeline/  shared/
    │   │   │       ← Phase 3A asset tree (each with a README; empty by design)
    │   └── video/
    │       └── hero.mp4         ← Hero background video
    └── src/
        ├── main.jsx             ← React entry (StrictMode, createRoot)
        ├── App.jsx              ← Composition root: Navbar + Hero + Section1
        ├── App.css
        ├── index.css            ← Design tokens (CSS variables, fonts)
        ├── assets/              ← ⚠️ Mostly ORPHANS
        │   ├── hero.png         ← ⚠️ ORPHAN — not referenced (early hero placeholder)
        │   ├── react.svg        ← ⚠️ Vite template leftover
        │   └── vite.svg         ← ⚠️ Vite template leftover
        ├── data/
        │   └── heroQuotes.js    ← ✅ Centralized quote data (7 lines)
        └── components/
            ├── Navbar.jsx + Navbar.css
            ├── Hero.jsx + Hero.css
            └── Section1.jsx + Section1.css
```

### Current Data Flow

```
JSX hardcoded data  ──►  React components  ──►  DOM
      │                        │
      │  (scenes, crew)        │  (GSAP + ScrollTrigger animation)
      │                        │
      └── data modules ────────┘
          (heroQuotes.js only)
```

Content currently flows from **two sources**:
1. **Centralized data module**: `src/data/heroQuotes.js` → Hero quote system (the only true data layer precedent).
2. **Inline component arrays**: `Hero.jsx` `scenes` (6 entries) and `Section1.jsx` `crew` (10 entries) are hardcoded inside component files.

Animation is applied via GSAP ScrollTrigger directly inside components (Hero pinned scene timeline, Section1 stagger + bounty counter).

### Component Hierarchy

```
App
├── Navbar        (static header — brand + 4 placeholder links)
├── Hero          (video bg + 6-scene pinned timeline + quote system + scroll indicator)
└── Section1      (crew card grid — 10 members, bounty counter)
```

### Existing Assets

| Location | Files | Used? | Notes |
|----------|-------|-------|-------|
| `public/video/hero.mp4` | 1 | ✅ Hero | Video background |
| `public/images/img1–img10.png` | 10 | ✅ Section1 | Crew portraits, numeric names |
| `public/favicon.svg` | 1 | ✅ index.html | Site favicon |
| `public/icons.svg` | 1 | ❌ **ORPHAN** | Never referenced |
| `src/assets/hero.png` | 1 | ❌ **ORPHAN** | Unused hero placeholder |
| `src/assets/react.svg` | 1 | ❌ **ORPHAN** | Vite template default |
| `src/assets/vite.svg` | 1 | ❌ **ORPHAN** | Vite template default |

**Naming convention today**: numeric (`img1.png`…`img10.png`) — NOT predictable per future entity names.
**Formats today**: PNG (images), MP4 (video), SVG (icons/favicon).
**Import style**: public assets referenced by absolute path (`/images/img1.png`); `src/assets` files unused.

---

## 2. Technology Stack (Verified)

| Layer | Technology | Verified Version |
|-------|-----------|-----------------|
| Framework | React | 19.2.7 |
| Build tool | Vite | 8.1.0 |
| Animation | GSAP + ScrollTrigger | 3.15.0 |
| Language | JavaScript (JSX) — **not TypeScript** | — |
| Styling | Plain CSS, BEM methodology | — |
| CSS tokens | CSS variables in `index.css` | — |
| Fonts | Cinzel (headings), Inter (body) — Google Fonts | — |
| Routing | **NONE** (single-page, single view) | — |
| Testing | **NONE** (no test framework installed) | — |
| Linting | ESLint flat config (js recommended + react-hooks + react-refresh) | 10.5.0 |
| Node | v24.18.0 | — |
| npm | 11.16.0 | — |

---

## 3. Component Audit

| Component | Purpose | Responsibilities | Data Ownership | Animation Ownership | Reusable? | Protected? |
|-----------|---------|------------------|----------------|---------------------|-----------|------------|
| **Navbar** | Sticky site header | Brand, nav links, responsive wrap | Hardcoded links | None (CSS only) | No (single instance) | ✅ Yes |
| **Hero** | Cinematic landing | Video bg, 6-scene timeline, quote rotation, scroll indicator | Owns `scenes` array inline; imports `heroQuotes.js` | GSAP timeline (pinned+scrubbed) + quote CSS transitions | No | 🔒 **LOCKED** |
| **Section1** | Straw Hat Crew showcase | Wanted-poster card grid, bounty counter, hover reveal | Owns `crew` array inline | GSAP stagger entrance + count-up | No | ✅ Yes (stable) |
| **App** | Composition root | Renders Navbar + Hero + Section1 | None (no state/props) | None | — | — |

**Key observation**: No component currently receives props or consumes external data at render time except Hero's quote import. All visual entities (scenes, crew) are static data baked into components.

---

## 4. Current Data Audit

| Content | Location | Type | Size |
|---------|----------|------|------|
| Hero quotes | `src/data/heroQuotes.js` | Array of strings (module export) | 7 |
| Hero scenes | `src/components/Hero.jsx` | Inline array of objects (title, description, cta) | 6 |
| Crew members | `src/components/Section1.jsx` | Inline array of objects (name, role, bounty, fruit, color, image) | 10 |

**Findings**:
- Only **one** true data module exists (`heroQuotes.js`).
- The bulk of One Piece content (crew, scenes) is **trapped inside JSX files**.
- No JSON files, no schemas, no IDs, no cross-references.
- Data is NOT moved in this phase — documented only.

---

## 5. Asset Audit

- **Images**: `public/images/img1–img10.png` — crew portraits; numeric, non-semantic naming; all referenced from `Section1.jsx`.
- **Video**: `public/video/hero.mp4` — single hero background video.
- **Icons**: `public/favicon.svg` (used), `public/icons.svg` (orphan).
- **src/assets**: `hero.png`, `react.svg`, `vite.svg` — all orphaned (unreferenced).
- **Formats present**: PNG, MP4, SVG.
- **Import vs public**: app uses public-absolute paths; `src/assets` is dead weight today.

---

## 6. Existing Strengths

1. **Image-first philosophy is already documented** and the crew section demonstrates it (portraits carry the visuals).
2. **BEM CSS discipline** — consistent, predictable class naming.
3. **Centralized data precedent** — `heroQuotes.js` proves the data → UI pipeline works.
4. **Hero protection lock** — stable system with explicit invariants and regression checks.
5. **Micro-phase workflow + memory sync** — every phase is documented, validated, committed.
6. **Contained animation** — GSAP usage is scoped per component with `matchMedia` breakpoints; no animation required for functionality.
7. **Minimal dependencies** — React + GSAP only; no routing, state library, or CSS framework bloat.
8. **Clean tree at HEAD `027794f`** — verified working state.

---

## 7. Existing Limitations

1. **Content trapped in JSX** — `scenes` and `crew` arrays cannot be reused, re-sorted, or searched from a data layer.
2. **Numeric image names** — `img1.png` carries no meaning; violates the future predictable-name rule.
3. **Orphan assets** — `icons.svg`, `hero.png`, `react.svg`, `vite.svg` add confusion and dead weight.
4. **Nav links are placeholders** — `href="#"` for Voyage/Crew/Treasure/Legacy; no routing exists.
5. **`index.html` title is "vite-project"** — not branded as One Piece.
6. **No IDs or relationships** — entities can't reference each other yet.
7. **No tests** — regression protection relies on manual/code-level checks.
8. **Duplicate data patterns** — each component invents its own inline shape; no schema convention.

---

## 8. Potential Risks

1. **Refactor temptation**: Future agents may want to "fix" Hero while migrating data. Hero is 🔒 LOCKED — data extraction must never alter Hero behavior.
2. **Scope creep**: Building all entity schemas at once (characters + locations + arcs + …) violates the micro-phase rule.
3. **Image-name churn**: Renaming `img1.png` → `monkey-d-luffy.png` must be coordinated with an image resolver and graceful fallback, or UI breaks.
4. **Over-engineering**: A full relational database or TypeScript migration would be premature; the architecture must stay simple.
5. **Orphan accumulation**: Deleting orphan assets is low-risk but must be an explicit micro-phase, not a side task.

---

## 9. Recommended Future Architecture

```
src/
├── data/                        ← THE CONTENT LAYER (source of truth) — folders created in Phase 2B
│   ├── characters/              (Phase 2E)
│   ├── locations/               (Phase 2F)
│   ├── arcs/                    (Phase 2G)
│   ├── crews/                   (Phase 2H)
│   ├── battles/                 (Phase 2I)
│   ├── fruits/                  (Phase 2J — Devil Fruit data)
│   ├── ships/                   (Phase 2K)
│   ├── events/                  (schema not yet assigned)
│   ├── timeline/                (future)
│   ├── shared/                  (Phase 2C/2D/2L — IDs, metadata, relationships, validation)
│   │   └── relationships.js     (Phase 2L — cross-entity links live HERE, inside shared/)
├── scripts/
│   └── verify-data.mjs          (Phase 2N — data-layer verification, `npm run verify`)
├── lib/ (or utils/)
│   └── imageResolver.js         (future — post-roadmap) — predictable filename → asset or placeholder
├── components/                  ← PRESENTATION ONLY (consume data, no hardcoding)
└── assets/                      ← imported assets (currently orphaned)
```

> **Legend**: Folders `characters/`…`shared/` were CREATED in Phase 2B (empty except READMEs; `shared/` also holds `entity-ids.md` from Phase 2C, `entity-metadata.md` from Phase 2D, and `relationships.md` from Phase 2L; `characters/` holds `character-schema.md` from Phase 2E; `locations/` holds `location-schema.md` from Phase 2F; `arcs/` holds `arc-schema.md` from Phase 2G; `crews/` holds `crew-schema.md` from Phase 2H; `battles/` holds `battle-schema.md` from Phase 2I; `fruits/` holds `power-schema.md` from Phase 2J; `ships/` holds `ship-schema.md` from Phase 2K). Phase 2M added the first real data: each folder now also holds an `index.js` dataset module (`characters/`, `locations/`, `arcs/`, `crews/`, `battles/`, `ships/`, `fruits/`). Phase 2N added `scripts/verify-data.mjs` (`npm run verify`).
> Files like `shared/relationships.js` and `lib/imageResolver.js` are PLANNED for future phases — they do NOT exist yet.

**Principles**:
1. **Data owns content** — every entity type is a plain JS module exporting an array of objects with a consistent schema.
2. **Components are dumb** — they receive data and render it; no inline content arrays.
3. **IDs enable relationships** — entities reference each other via stable slug IDs (Phase 2C).
4. **Images are predictable** — `entity-slug.ext`; missing images fall back to a placeholder (never break the UI).
5. **Map is image-first** — finished image asset + hotspot data + content overlay (no Three.js/WebGL/Canvas).
6. **Incremental migration** — extract data one entity type at a time; never rewrite working systems.

---

## 10. Entity Relationship Strategy (Concept Only)

**Canonized in Phase 2L → `src/data/shared/relationships.md`.**

The full Cross-Entity Relationship Convention defines: ID-only references (never embedded entities), stored-both strategy with ONE declared source of truth per relationship (reverse stored as an agreeing mirror copy — canonized Phase 2N), cardinality rules (One→One singular, One→Many/Many→Many plural `*Ids`), standard field naming (`characterIds`, `locationIds`, `battleIds`, `crewIds`, `shipIds`, `devilFruitIds`, `eventIds`, `arcIds`, `powerIds`), a complete entity relationship matrix, cascade principles, image independence, and future search/map/timeline/validation strategies.

Concept-level overview (see the convention doc for the authoritative rules):

```
            Character
           ↕         ↕
          Arc       Crew ── Ship
           ↕         ↕
        Location   Faction
           ↕
        Battle ──── Character(s)
           ↕
        Devil Fruit / Haki (powers)
           ↕
        Timeline / Mysteries
```

No relationship logic is implemented in this phase — the convention is architecture only.

---

## 11. Image Strategy (Future)

### Future Image Organization

> **Phase 3A (2026-08-04) — NOW CREATED.** The Universal Asset System tree exists under `public/images/` and the authoritative conventions live in **`public/images/README.md`** (folder responsibilities, naming, formats, replacement/placeholder/ownership rules, migration plan, future resolver). The full structure below reflects the created tree.

```
public/images/
├── characters/
├── locations/
├── arcs/
├── crews/
├── ships/
├── battles/
├── powers/       ← corresponds to the `src/data/fruits/` data folder (power-schema)
├── timeline/
└── shared/       ← fallbacks, generic artwork, logos, icons
```

Existing files (`img1.png`…`img10.png`) stay in the `public/images/` ROOT until a dedicated migration phase renames and re-homes them (planned, NOT executed in Phase 3A).

### Future Image Naming

- **Predictable names**: `monkey-d-luffy.*`, `roronoa-zoro.*`, `alabasta.*`, `marineford.*`, `wano.*`, `egghead.*`, `thousand-sunny.*`
- **Formats**: PNG, JPG, JPEG, WEBP, AVIF, GIF (browser-compatible); SVG only for icons/emblems/logos.
- **No fixed extension**: the resolver should accept any supported format.
- **Resolution**: an image resolver (future) maps entity → asset file → placeholder fallback. Not implemented yet.
- **Canonical source (Phase 3A)**: `public/images/README.md` is the single source of truth for asset rules.

### Missing Image Policy

- Missing artwork must NEVER prevent: entity creation, page rendering, or navigation.
- The UI shows a graceful placeholder state (e.g., styled monogram/silhouette) until a real asset is added.
- Placeholder components are NOT implemented yet.

### Image Replacement Policy

- The user should be able to replace artwork simply by replacing the corresponding asset file.
- Components must NOT require rewriting because artwork changes.
- This behavior is NOT implemented yet — documented as a future rule.

---

## 12. World Map Strategy (Future)

```
Finished image asset (source of truth)
        ↓
Hotspot data (coordinates + IDs)
        ↓
Location information (name, arcs, images, content)
        ↓
Rendered map + interactive hotspots
```

**Explicitly NOT recommended**: Three.js, WebGL, Canvas reconstruction, procedural maps, complex SVG generation, GSAP camera systems. The map image is the visual source of truth; code adds interaction afterward. **Do not build the map now.**

---

## 13. Migration Strategy

1. **Incremental**: one entity type per micro-phase. NEVER perform a giant repository rewrite.
2. **Non-breaking**: every phase must keep lint + build green; protected systems (Hero 🔒) untouched.
3. **Extract before consuming**: build the data module + schema first, then swap components to consume it.
4. **Verify per phase**: IMPLEMENT → VALIDATE → VERIFY → DIFF REVIEW → MEMORY SYNC → COMMIT → NEXT.
5. **Never rewrite working systems**: Navbar, Hero, Section1 visuals remain as-is unless a phase explicitly and minimally integrates.
6. **Defer decisions**: asset relocation, placeholder visuals, and resolver internals belong to later phases, not now.

### Recommended Migration Order

One entity type at a time, in this order:

```
Characters
    ↓
Locations
    ↓
Arcs
    ↓
Battles
    ↓
Relationships
    ↓
Images
    ↓
Interfaces
```

Corresponds to roadmap phases 2E → 2F → 2G → 2I → 2L → (image migration) → (UI consumption).

---

## 14. Future Micro-Phase Roadmap

| Phase | Objective | Scope |
|-------|-----------|-------|
| **2A** | Architecture audit + blueprint | ✅ DONE — this document |
| **2B** | Repository conventions | ✅ DONE — 10 data folders + READMEs created (Phase 2B) |
| **2C** | Entity ID conventions | ✅ DONE — convention in `src/data/shared/entity-ids.md` (Phase 2C) |
| **2D** | Shared metadata/schema conventions | ✅ DONE — foundation in `src/data/shared/entity-metadata.md` (Phase 2D) |
| **2E** | Character schema | ✅ DONE — schema in `src/data/characters/character-schema.md` (Phase 2E) |
| **2F** | Location schema | ✅ DONE — schema in `src/data/locations/location-schema.md` (Phase 2F) |
| **2G** | Arc schema | ✅ DONE — schema in `src/data/arcs/arc-schema.md` (Phase 2G) |
| **2H** | Crew/Faction schema | ✅ DONE — schema in `src/data/crews/crew-schema.md` (Phase 2H) |
| **2I** | Battle schema | ✅ DONE — schema in `src/data/battles/battle-schema.md` (Phase 2I) |
| **2J** | Devil Fruit schema | ✅ DONE — schema in `src/data/fruits/power-schema.md` (Phase 2J — Devil Fruit & Power) |
| **2K** | Ship schema | ✅ DONE — schema in `src/data/ships/ship-schema.md` (Phase 2K) |
| **2L** | Relationship conventions | ✅ DONE — convention in `src/data/shared/relationships.md` (Phase 2L) |
| **2M** | Small integrated dataset | Small connected dataset proving schemas + relationships — ✅ DONE (3 characters, 2 locations, 1 arc, 1 crew, 1 battle, 1 ship, 1 power in `src/data/<type>/index.js`) |
| **2N** | Architecture verification | ✅ DONE — `scripts/verify-data.mjs` (`npm run verify`): relationship resolution, duplicate IDs, missing refs, type mismatches, aliases, cycles; stored-both canonicalized; `marineford-arc` global-ID fix; full 17-section audit + stress test PASS (8 doc-sample consistency fixes; both mirror-gap warnings resolved → `npm run verify` 0 errors, 0 warnings; READY FOR PHASE 2O) |
| **2O** | Architecture lock | ✅ DONE — Phase 2 conventions frozen + protected systems recorded (declared LOCKED per operator brief entering Phase 3A) |
| **3A** | Universal Asset System foundation | ✅ DONE — `public/images/` asset tree (characters/locations/arcs/crews/ships/battles/powers/timeline/shared) + `public/images/README.md` (naming, formats, replacement/placeholder/ownership/migration/resolver rules). No runtime loading, no migration |

> Phase 2 is declared **COMPLETE / LOCKED** (operator brief entering Phase 3A, 2026-08-04). Phase 2N delivered the verification tooling (`npm run verify`) and the full 17-section audit/stress test PASS; both mirror-gap warnings were resolved (Marineford `crewIds`, `water-7` on Luffy's `locationIds`) — `npm run verify` reports 0 errors, 0 warnings. **Phase 3A (Universal Asset System foundation) is COMPLETE** — asset tree + conventions at `public/images/README.md`. Next: **Phase 3B — Asset Naming Migration Preparation**.

---

## 15. Protected Systems (Reaffirmed)

| System | Status |
|--------|--------|
| Hero (video, quotes, scenes, scroll indicator, layout) | 🔒 LOCKED — do not modify without explicit request |
| Navbar | ✅ Protected |
| Section1 (Crew cards) | ✅ Protected |
| `src/data/heroQuotes.js` | 🔒 LOCKED |

---

## 16. Immediate Next Step

**Phase 2O — Architecture Lock**: Phase 2 conventions are declared LOCKED (per the operator brief entering Phase 3A). Phase 3A (2026-08-04) established the Universal Asset System foundation (`public/images/README.md` + asset tree). **Phase 3B — Asset Naming Migration Preparation**: produce the mapping of legacy `img1.png`–`img10.png` → owning entity → future `imageKey.*` name → target folder, WITHOUT moving/renaming/deleting any production asset. A later phase executes the migration alongside the image resolver.
