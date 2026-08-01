# src/data/events

## Purpose
Future home for notable world-event datasets in One Piece 2.0 (singular events, ceremonies, incidents).

## What eventually belongs here
- Event entity records (executions, festivals, incidents)
- Event schemas, lookups, and helpers

## ID Convention

Events MUST follow the **Universal Entity ID Convention** (see `../shared/entity-ids.md`):

- IDs are lowercase kebab-case, unique, stable, and immutable once published.
- `id` ≠ `displayName` — UI shows the display name, references use the ID.
- Relationships to other entities use their IDs (e.g., `arcIds`, `locationIds`).
- IDs are never generated dynamically at runtime.

## What does NOT belong here
- Characters, locations, arcs, battles, crews, fruits, ships, timeline data
- UI components or styling
- Image assets (those live in `public/images/`)

## Expected future phases
- **2C** — Entity ID conventions — ✅ DONE (see `../shared/entity-ids.md`)
- Schema phase (after core entity schemas; not yet assigned)

## Status
🔲 EMPTY — do not populate until a schema is assigned.
