# src/data/crews

## Purpose
Future home for all crew / faction datasets in One Piece 2.0.

## What eventually belongs here
- Crew and faction entity records (e.g., Straw Hats, Marines)
- Crew/faction schemas, lookups, and helpers

## ID Convention

Crews and factions MUST follow the **Universal Entity ID Convention** (see `../shared/entity-ids.md`):

- IDs are lowercase kebab-case, unique, stable, and immutable once published.
- `id` ≠ `displayName` — UI shows the display name, references use the ID.
- Relationships to other entities use their IDs (e.g., `characterIds`, `shipIds`).
- IDs are never generated dynamically at runtime.

## What does NOT belong here
- Characters, locations, arcs, battles, fruits, ships, events, timeline data
- UI components or styling
- Image assets (those live in `public/images/`)

## Schema (Phase 2H ✅)

Crews and factions follow **`crew-schema.md`** (Crew & Faction Schema Foundation, Phase 2H):

- One reusable schema for every organization type (pirate crews, marines, revolutionary army, world government, kingdoms, alliances, temporary alliances, historical factions…)
- Extends the shared metadata layer — base fields are NOT duplicated
- Crew/faction fields: `organizationType`, `captainId`, `leaderIds`, `memberIds`, `shipIds`, `territoryIds`, `headquartersLocationId`, `emblem`, `allegiance`, `foundedBy`, `objective`, `motto`, `affiliations`
- Relationships use entity IDs only (`characterIds`, `shipIds`, `locationIds`, `battleIds`, `arcIds`, `eventIds`)
- Artwork referenced by `imageKey` (equals `id` by default) — never paths or extensions
- Optional content: `history`, `formerMembers`, `achievements`, `knownAllies`, `knownEnemies`
- `spoilerLevel` (`basic`/`advanced`/`late`) supports future spoiler safety
- One sample record (`straw-hat-pirates`) validates the schema. NO crew database yet.

## ID Convention

Crews and factions MUST follow the **Universal Entity ID Convention** (see `../shared/entity-ids.md`):

- IDs are lowercase kebab-case, unique, stable, and immutable once published.
- `id` ≠ `displayName` — UI shows the display name, references use the ID.
- Relationships to other entities use their IDs (e.g., `characterIds`, `shipIds`).
- IDs are never generated dynamically at runtime.

## What does NOT belong here
- Characters, locations, arcs, battles, fruits, ships, events, timeline data
- UI components or styling
- Image assets (those live in `public/images/`)

## Dataset (Phase 2M ✅)

First real crew/faction record — **`index.js`** in this folder.

- `straw-hat-pirates` (pirate crew, captain Luffy)

Records follow `crew-schema.md` + `relationships.md` (ID-only references). `memberIds` is a canonical SUBSET (3 of 10 members) — the full roster arrives as more character records are added.

## Expected future phases
- **2C** — Entity ID conventions — ✅ DONE (see `../shared/entity-ids.md`)
- **2D** — Shared metadata — ✅ DONE (see `../shared/entity-metadata.md`)
- **2H** — Crew/Faction schema — ✅ DONE (see `crew-schema.md`)
- **2M** — Sample integrated dataset (crews/factions included) — ✅ DONE
- **2N** — Architecture verification (relationship/schema checks over the data layer)

## Status
📦 DATASET CREATED — `crew-schema.md` + `index.js` (1 record, Phase 2M). More crew/faction records arrive in future dataset phases.
