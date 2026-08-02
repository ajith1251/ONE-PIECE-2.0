# src/data/ships

## Purpose
Future home for all ship datasets in One Piece 2.0.

## What eventually belongs here
- Ship entity records (e.g., Thousand Sunny, Going Merry)
- Ship schemas, lookups, and helpers

## ID Convention

Ships MUST follow the **Universal Entity ID Convention** (see `../shared/entity-ids.md`):

- IDs are lowercase kebab-case, unique, stable, and immutable once published.
- `id` ≠ `displayName` — UI shows the display name, references use the ID.
- Relationships to other entities use their IDs (e.g., `crewIds`).
- IDs are never generated dynamically at runtime.

## What does NOT belong here
- Characters, locations, arcs, battles, crews, fruits, events, timeline data
- UI components or styling
- Image assets (those live in `public/images/`)

## Schema (Phase 2K ✅)

Ships follow **`ship-schema.md`** (Ship Schema Foundation, Phase 2K):

- One reusable schema for every ship type (pirate, marine, government, merchant, historical, special-purpose…)
- Extends the shared metadata layer — base fields are NOT duplicated
- Ship fields: `shipType`, `ownerCrewId`, `previousOwnerIds`, `captainIds`, `builder`, `manufacturer`, `launchLocationId`, `currentLocationId`, `size`, `specialFeatures`, `armament`, `propulsion`, `firstAppearance`, `latestAppearance`
- Relationships use entity IDs only (`crewIds`, `characterIds`, `battleIds`, `locationIds`, `arcIds`, `eventIds`)
- Artwork referenced by `imageKey` (equals `id` by default) — never paths or extensions
- History-support fields (`ownershipHistory`, `majorUpgrades`, `repairs`, `destruction`, `restoration`, `significantVoyages`) documented only
- Optional content: `designInspiration`, `symbolicMeaning`, `trivia`
- `spoilerLevel` (`basic`/`advanced`/`late`) supports future spoiler safety
- One sample record (`thousand-sunny`) validates the schema. NO ship database yet.

## ID Convention

Ships MUST follow the **Universal Entity ID Convention** (see `../shared/entity-ids.md`):

- IDs are lowercase kebab-case, unique, stable, and immutable once published.
- `id` ≠ `displayName` — UI shows the display name, references use the ID.
- Relationships to other entities use their IDs (e.g., `crewIds`).
- IDs are never generated dynamically at runtime.

## What does NOT belong here
- Characters, locations, arcs, battles, crews, fruits, events, timeline data
- UI components or styling
- Image assets (those live in `public/images/`)

## Dataset (Phase 2M ✅)

First real ship record — **`index.js`** in this folder.

- `thousand-sunny` (pirate ship, owned by the Straw Hat Pirates)

Records follow `ship-schema.md` + `relationships.md` (ID-only references). `battleIds`/`arcIds` omitted — the Sunny was not present at the Marineford War and no other battles/arcs are in the sample.

## Expected future phases
- **2C** — Entity ID conventions — ✅ DONE (see `../shared/entity-ids.md`)
- **2D** — Shared metadata — ✅ DONE (see `../shared/entity-metadata.md`)
- **2K** — Ship schema — ✅ DONE (see `ship-schema.md`)
- **2M** — Sample integrated dataset (ships included) — ✅ DONE
- **2N** — Architecture verification (relationship/schema checks over the data layer)

## Status
📦 DATASET CREATED — `ship-schema.md` + `index.js` (1 record, Phase 2M). More ship records arrive in future dataset phases.
