# src/data/characters

## Purpose
Future home for all character datasets in One Piece 2.0 (100–300+ planned).

## What eventually belongs here
- Character entity records (e.g., `monkey-d-luffy`)
- Character schemas, lookups, and helpers

## Schema (Phase 2E — ✅ DONE)

See **`character-schema.md`** in this folder for the Character Schema Foundation.

Quick summary:
- Extends the shared metadata foundation (`../shared/entity-metadata.md`).
- Required: `id`, `displayName`, `description` (from shared layer).
- Character fields: `bounty`, `occupation`, `role`, `species`, `haki`, `devilFruitId`, `weapons`, `fightingStyles`, `originLocationId`, `currentLocationId`, etc.
- Relationships are ID references only: `crewIds`, `locationIds`, `arcIds`, `battleIds`, `shipIds`, `fruitId`, `mentorIds`, `rivalIds`, `familyIds`.
- `imageKey` only — never hardcoded extensions or URLs.
- `spoilerLevel` supports future spoiler filtering (basic/advanced/late).
- One sample record (`monkey-d-luffy`) validates the schema. NO character database yet.

## ID Convention

Characters MUST follow the **Universal Entity ID Convention** (see `../shared/entity-ids.md`):

- IDs are lowercase kebab-case, unique, stable, and immutable once published.
- `id` ≠ `displayName` — UI shows the display name, references use the ID.
- Relationships to other entities use their IDs (e.g., `crewIds`, `fruitIds`, `arcIds`).
- IDs are never generated dynamically at runtime.

## What does NOT belong here
- Locations, arcs, battles, crews, fruits, ships, events, timeline data
- UI components or styling
- Image assets (those live in `public/images/`)

## Dataset (Phase 2M ✅)

First real character records — **`index.js`** in this folder.

- `monkey-d-luffy` (captain, devil fruit user, at Marineford)
- `roronoa-zoro` (first mate / swordsman, at Water 7)
- `nami` (navigator, at Water 7)

Records follow `character-schema.md` + `relationships.md` (ID-only references). Roster and relationship lists are canonical SUBSETS limited to entities present in the Phase 2M sample.

## Expected future phases
- **2C** — Entity ID conventions — ✅ DONE (see `../shared/entity-ids.md`)
- **2D** — Shared metadata — ✅ DONE (see `../shared/entity-metadata.md`)
- **2E** — Character schema — ✅ DONE (see `character-schema.md`)
- **2M** — Sample integrated dataset (first real character records) — ✅ DONE
- **2N** — Architecture verification (relationship/schema checks over the data layer)

## Status
📦 DATASET CREATED — `character-schema.md` + `index.js` (3 records, Phase 2M). More character records arrive in future dataset phases.
