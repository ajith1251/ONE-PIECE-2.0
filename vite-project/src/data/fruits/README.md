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

## What does NOT belong here
- Characters, locations, arcs, battles, crews, ships, events, timeline data
- Haki / power systems (future, separate concern — see architecture plan)
- UI components or styling
- Image assets (those live in `public/images/`)

## Expected future phases
- **2C** — Entity ID conventions — ✅ DONE (see `../shared/entity-ids.md`)
- **2J** — Devil Fruit schema

## Status
🔲 EMPTY — do not populate until Phase 2J defines the Devil Fruit schema.
