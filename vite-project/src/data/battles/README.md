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

## Expected future phases
- **2C** — Entity ID conventions — ✅ DONE (see `../shared/entity-ids.md`)
- **2I** — Battle schema

## Status
🔲 EMPTY — do not populate until Phase 2I defines the battle schema.
