# src/data/characters

## Purpose
Future home for all character datasets in One Piece 2.0 (100–300+ planned).

## What eventually belongs here
- Character entity records (e.g., `monkey-d-luffy`)
- Character schemas, lookups, and helpers

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

## Expected future phases
- **2C** — Entity ID conventions — ✅ DONE (see `../shared/entity-ids.md`)
- **2E** — Character schema

## Status
🔲 EMPTY — do not populate until Phase 2E defines the character schema.
