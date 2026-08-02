# src/data/arcs

## Purpose
Future home for all anime arc / saga datasets in One Piece 2.0.

## What eventually belongs here
- Arc entity records (e.g., `marineford`, `wano`)
- Arc schemas, lookups, and helpers

## ID Convention

Arcs MUST follow the **Universal Entity ID Convention** (see `../shared/entity-ids.md`):

- IDs are lowercase kebab-case, unique, stable, and immutable once published.
- `id` ≠ `displayName` — UI shows the display name, references use the ID.
- Relationships to other entities use their IDs (e.g., `locationIds`, `characterIds`).
- IDs are never generated dynamically at runtime.

## What does NOT belong here
- Characters, locations, battles, crews, fruits, ships, events, timeline data
- UI components or styling
- Image assets (those live in `public/images/`)

## Schema (Phase 2G ✅)

Arcs follow **`arc-schema.md`** (Arc Schema Foundation, Phase 2G):

- One reusable schema for every arc type (introductory, saga, war, training, flashback, transitional…)
- Extends the shared metadata layer — base fields are NOT duplicated
- Arc fields: `sagaId`, `arcNumber`, `chronologicalOrder`, `arcType`, `animeEpisodeRange`, `mangaChapterRange`, `duration`, `overview`, `centralConflict`, `outcome`, `significance`, `recommendedViewingOrder`
- Relationships use entity IDs only (`characterIds`, `locationIds`, `battleIds`, `crewIds`, `eventIds`, `shipIds`)
- Artwork referenced by `imageKey` (equals `id` by default) — never paths or extensions
- Timeline-readiness fields (`sagaId`, `arcNumber`, `chronologicalOrder`, `previousArcId`, `nextArcId`) documented only
- `spoilerLevel` (`basic`/`advanced`/`late`) supports future spoiler safety
- One sample record (`marineford`) validates the schema. NO arc database yet.

## ID Convention

Arcs MUST follow the **Universal Entity ID Convention** (see `../shared/entity-ids.md`):

- IDs are lowercase kebab-case, unique, stable, and immutable once published.
- `id` ≠ `displayName` — UI shows the display name, references use the ID.
- Relationships to other entities use their IDs (e.g., `locationIds`, `characterIds`).
- IDs are never generated dynamically at runtime.

## What does NOT belong here
- Characters, locations, battles, crews, fruits, ships, events, timeline data
- UI components or styling
- Image assets (those live in `public/images/`)

## Dataset (Phase 2M ✅)

First real arc record — **`index.js`** in this folder.

- `marineford` (war arc, Paramount War saga)

Records follow `arc-schema.md` + `relationships.md` (ID-only references). `previousArcId`/`nextArcId` omitted — those arcs are not yet in the dataset.

## Expected future phases
- **2C** — Entity ID conventions — ✅ DONE (see `../shared/entity-ids.md`)
- **2D** — Shared metadata — ✅ DONE (see `../shared/entity-metadata.md`)
- **2G** — Arc schema — ✅ DONE (see `arc-schema.md`)
- **2M** — Sample integrated dataset (arcs included) — ✅ DONE
- **2N** — Architecture verification (relationship/schema checks over the data layer)

## Status
📦 DATASET CREATED — `arc-schema.md` + `index.js` (1 record, Phase 2M). More arc records arrive in future dataset phases.
