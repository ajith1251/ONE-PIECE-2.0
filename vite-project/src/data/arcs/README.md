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

## Expected future phases
- **2C** — Entity ID conventions — ✅ DONE (see `../shared/entity-ids.md`)
- **2G** — Arc schema

## Status
🔲 EMPTY — do not populate until Phase 2G defines the arc schema.
