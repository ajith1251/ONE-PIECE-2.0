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

## Expected future phases
- **2C** — Entity ID conventions — ✅ DONE (see `../shared/entity-ids.md`)
- **2H** — Crew/Faction schema

## Status
🔲 EMPTY — do not populate until Phase 2H defines the crew/faction schema.
