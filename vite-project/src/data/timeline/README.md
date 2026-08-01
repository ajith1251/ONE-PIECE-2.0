# src/data/timeline

## Purpose
Future home for the world timeline dataset — chronological ordering of arcs, battles, and events.

## What eventually belongs here
- Chronological timeline records
- Date/order metadata and helpers

## ID Convention

Timeline entries MUST follow the **Universal Entity ID Convention** (see `../shared/entity-ids.md`):

- IDs are lowercase kebab-case, unique, stable, and immutable once published.
- `id` ≠ `displayName` — UI shows the display name, references use the ID.
- Relationships to other entities use their IDs (e.g., `arcIds`, `battleIds`, `eventIds`).
- IDs are never generated dynamically at runtime.

## What does NOT belong here
- Individual entity datasets (characters, locations, arcs, etc.) — the timeline references them
- UI components or styling
- Image assets (those live in `public/images/`)

## Expected future phases
- **2C** — Entity ID conventions — ✅ DONE (see `../shared/entity-ids.md`)
- **2L** — Relationship conventions (timeline references other entities)

## Status
🔲 EMPTY — do not populate until relationship conventions exist.
