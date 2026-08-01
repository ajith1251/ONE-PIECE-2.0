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

## Expected future phases
- **2C** — Entity ID conventions — ✅ DONE (see `../shared/entity-ids.md`)
- **2K** — Ship schema

## Status
🔲 EMPTY — do not populate until Phase 2K defines the ship schema.
