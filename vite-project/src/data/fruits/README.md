# src/data/fruits

## Purpose
Future home for all Devil Fruit datasets in One Piece 2.0.

## What eventually belongs here
- Devil Fruit entity records (e.g., Gomu Gomu no Mi, Hana Hana no Mi)
- Devil Fruit schemas, lookups, and helpers

## ID Convention

Devil Fruits MUST follow the **Universal Entity ID Convention** (see `../shared/entity-ids.md`):

- IDs are lowercase kebab-case, unique, stable, and immutable once published.
- `id` ≠ `displayName` — UI shows the display name, references use the ID.
- Relationships to other entities use their IDs (e.g., `characterIds`).
- IDs are never generated dynamically at runtime.

## Schema (Phase 2J ✅)

Powers follow **`power-schema.md`** (Devil Fruit & Power Schema Foundation, Phase 2J):

- One reusable schema for every power system: Devil Fruits, Haki, combat styles, weapons-based fighting systems, special abilities, and non-Devil Fruit powers
- Extends the shared metadata layer — base fields are NOT duplicated
- Power fields: `powerType`, `fruitType`, `canonicalName`, `alternativeNames`, `userIds`, `previousUserIds`, `awakeningStatus`, `strengths`, `weaknesses`, `combatApplications`, `rarity`, `canonicalStatus`
- Haki represented via `powerType: 'haki'` + `hakiType` (observation/armament/conquerors) + optional `advancedForm` — no separate Haki database
- Devil Fruit categories via `fruitType` (paramecia/zoan/ancient-zoan/mythical-zoan/logia) — no per-category variants
- Relationships use entity IDs only (`characterIds`, `battleIds`, `arcIds`, `locationIds`, `crewIds`, `relatedPowerIds`) — `userIds`/`previousUserIds` are the canonical user references
- Artwork referenced by `imageKey` (equals `id` by default) — never paths or extensions
- Optional content: `trivia`, `historicalUsers`, `symbolicMeaning`
- `spoilerLevel` (`basic`/`advanced`/`late`) supports future spoiler safety
- One sample record (`gomu-gomu-no-mi`) validates the schema. NO power database yet.

## ID Convention

Devil Fruits and powers MUST follow the **Universal Entity ID Convention** (see `../shared/entity-ids.md`):

- IDs are lowercase kebab-case, unique, stable, and immutable once published.
- `id` ≠ `displayName` — UI shows the display name, references use the ID.
- Relationships to other entities use their IDs (e.g., `characterIds`).
- IDs are never generated dynamically at runtime.

## What does NOT belong here
- Characters, locations, arcs, battles, crews, ships, events, timeline data
- UI components or styling
- Image assets (those live in `public/images/`)

## Dataset (Phase 2M ✅)

First real power record — **`index.js`** in this folder (exports `powers`).

- `gomu-gomu-no-mi` (devil-fruit / paramecia, current user Monkey D. Luffy)

Records follow `power-schema.md` + `relationships.md`. Uses the Phase 2L canonical `userIds`/`previousUserIds` fields (not `characterIds`). `previousUserIds` omitted — Shanks is not yet in the sample dataset.

## Expected future phases
- **2C** — Entity ID conventions — ✅ DONE (see `../shared/entity-ids.md`)
- **2D** — Shared metadata — ✅ DONE (see `../shared/entity-metadata.md`)
- **2J** — Devil Fruit & Power schema — ✅ DONE (see `power-schema.md`)
- **2M** — Sample integrated dataset (powers included) — ✅ DONE
- **2N** — Architecture verification (relationship/schema checks over the data layer)

## Status
📦 DATASET CREATED — `power-schema.md` + `index.js` (1 power record, Phase 2M). More power records arrive in future dataset phases.
