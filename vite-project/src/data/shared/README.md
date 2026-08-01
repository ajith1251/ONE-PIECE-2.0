# src/data/shared

## Purpose
Future home for common utilities, metadata, and conventions shared across ALL data folders. **Nothing is implemented yet** — this file documents the plan only.

## Established Conventions

### Entity IDs (Phase 2C) — ✅ DOCUMENTED

See **`entity-ids.md`** in this folder for the complete Universal Entity ID Convention.

Quick summary:
- IDs are lowercase, kebab-case, unique, stable, immutable once published, independent from UI text.
- IDs are NEVER generated dynamically at runtime.
- `id` ≠ `displayName` (identity vs UI text).
- `imageKey` normally equals the entity ID.
- Future relationships reference IDs (`characterIds`, `locationIds`, `crewIds`, etc.).
- Example: `monkey-d-luffy`, `alabasta`, `wano`, `egghead`.

Shared ID helpers (validation, normalization) will live here in a future phase.

### Metadata
- Common fields every entity shares (e.g., `id`, `name`, `imageKey`, `summary`).
- Shared metadata shape documented in Phase 2D.

### Relationships (Phase 2L)
- Cross-entity references (character ↔ crew, arc ↔ location, etc.).
- Shared relationship helpers will live here.

### Image Keys
- Entities reference artwork via a predictable key (e.g., entity slug), not a hardcoded path.
- Keys map to files like `monkey-d-luffy.*` (any browser format).
- Missing artwork must never break the UI — a placeholder fallback is planned (not implemented).

### Validation
- Future validation helpers for schema compliance.
- Will be added when schemas exist (Phase 2E+).

## What does NOT belong here
- Any entity datasets (characters, locations, etc.)
- UI components or styling
- Image assets

## Expected Future Phases
- **2C** — Entity ID conventions — ✅ DONE (see `entity-ids.md`)
- **2D** — Shared metadata/schema conventions
- **2L** — Relationship conventions

## Status
📄 README + `entity-ids.md` only. Do not implement shared helpers until their phases arrive.
