# src/data/battles

## Purpose
Future home for all battle dataset records in One Piece 2.0.

## What eventually belongs here
- Battle entity records (fights, confrontations, wars)
- Battle schemas, lookups, and helpers

## ID Convention

Battles MUST follow the **Universal Entity ID Convention** (see `../shared/entity-ids.md`):

- IDs are lowercase kebab-case, unique, stable, and immutable once published.
- `id` ≠ `displayName` — UI shows the display name, references use the ID.
- Relationships to other entities use their IDs (e.g., `arcIds`, `characterIds`).
- IDs are never generated dynamically at runtime.

## What does NOT belong here
- Characters, locations, arcs, crews, fruits, ships, events, timeline data
- UI components or styling
- Image assets (those live in `public/images/`)

## Schema (Phase 2I ✅)

Battles follow **`battle-schema.md`** (Battle Schema Foundation, Phase 2I):

- One reusable schema for every battle type (duels, crew battles, marine battles, war-scale conflicts, historical battles…)
- Extends the shared metadata layer — base fields are NOT duplicated
- Battle fields: `battleType`, `locationId`, `arcId`, `participantIds`, `winningSide`, `losingSide`, `outcome`, `duration`, `significance`, `casualties`, `timelineOrder`
- Relationships use entity IDs only (`characterIds`, `crewIds`, `locationIds`, `shipIds`, `eventIds`, `arcIds`) — `participantIds` is the canonical participant list
- Artwork referenced by `imageKey` (equals `id` by default) — never paths or extensions
- Timeline-readiness field (`timelineOrder`) documented only
- Optional content: `summary`, `keyMoments`, `importantQuotes`, `futureConsequences`
- `spoilerLevel` (`basic`/`advanced`/`late`) supports future spoiler safety
- One sample record (`marineford-war`) validates the schema. NO battle database yet.

## ID Convention

Battles MUST follow the **Universal Entity ID Convention** (see `../shared/entity-ids.md`):

- IDs are lowercase kebab-case, unique, stable, and immutable once published.
- `id` ≠ `displayName` — UI shows the display name, references use the ID.
- Relationships to other entities use their IDs (e.g., `arcIds`, `characterIds`).
- IDs are never generated dynamically at runtime.

## What does NOT belong here
- Characters, locations, arcs, crews, fruits, ships, events, timeline data
- UI components or styling
- Image assets (those live in `public/images/`)

## Dataset (Phase 2M ✅)

First real battle record — **`index.js`** in this folder.

- `marineford-war` (war-scale conflict, at Marineford)

Records follow `battle-schema.md` + `relationships.md`. Uses the Phase 2L canonical `participantIds` field (not `characterIds`). `winningSide`/`losingSide` are labels, not entity IDs. `shipIds` omitted — the Thousand Sunny was not present at this battle.

## Expected future phases
- **2C** — Entity ID conventions — ✅ DONE (see `../shared/entity-ids.md`)
- **2D** — Shared metadata — ✅ DONE (see `../shared/entity-metadata.md`)
- **2I** — Battle schema — ✅ DONE (see `battle-schema.md`)
- **2M** — Sample integrated dataset (battles included) — ✅ DONE
- **2N** — Architecture verification (relationship/schema checks over the data layer)

## Status
📦 DATASET CREATED — `battle-schema.md` + `index.js` (1 record, Phase 2M). More battle records arrive in future dataset phases.
