# src/data/locations

## Purpose
Future home for all location datasets in One Piece 2.0 (islands, seas, regions, landmarks).

## What eventually belongs here
- Location entity records (e.g., `alabasta`, `wano`, `egghead`)
- Location schemas, lookups, and helpers

## ID Convention

Locations MUST follow the **Universal Entity ID Convention** (see `../shared/entity-ids.md`):

- IDs are lowercase kebab-case, unique, stable, and immutable once published.
- `id` ≠ `displayName` — UI shows the display name, references use the ID.
- Relationships to other entities use their IDs (e.g., `arcIds`, `battleIds`).
- IDs are never generated dynamically at runtime.

## What does NOT belong here
- Characters, arcs, battles, crews, fruits, ships, events, timeline data
- UI components or styling
- Image assets (those live in `public/images/`)

## Expected future phases
- **2C** — Entity ID conventions — ✅ DONE (see `../shared/entity-ids.md`)
- **2F** — Location schema

## Status
🔲 EMPTY — do not populate until Phase 2F defines the location schema.
