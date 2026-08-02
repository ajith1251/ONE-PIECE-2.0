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

### Shared Metadata & Schema Foundation (Phase 2D) — ✅ DOCUMENTED

See **`entity-metadata.md`** in this folder for the shared metadata layer every future schema extends.

Quick summary:
- **No giant master object** — lightweight generic layer; specialized schemas extend it.
- **Required fields**: `id`, `displayName`, `description` (intentionally small).
- **Optional fields**: `aliases`, `tags`, `status`, `imageKey`, `notes`, `metadata`, `createdAt`, `updatedAt`.
- **Image reference** is `imageKey` only — never paths, extensions, or URLs. Loading is a future phase.
- **Relationship placeholders**: `characterIds`, `locationIds`, `battleIds`, `crewIds`, `fruitIds`, `shipIds` — IDs only.
- Entity-specific fields (`bounty`, `crew`, `devilFruit`, `haki`, …) belong in specialized schemas, NOT here.

### Relationships (Phase 2L) — ✅ DOCUMENTED

See **`relationships.md`** in this folder for the complete Cross-Entity Relationship Convention.

Quick summary:
- Relationships ALWAYS reference stable IDs — never embed complete entities.
- Single-direction storage: each relationship has one canonical owner; reverse links are derived dynamically (minimizes duplicated data).
- Cardinality: One→One (singular field), One→Many / Many→Many (plural `*Ids` fields).
- Standard names: `characterIds`, `locationIds`, `battleIds`, `crewIds`, `shipIds`, `fruitIds`, `eventIds`, `arcIds`, `powerIds`; singulars like `captainId`, `fruitId`, `locationId`, `arcId`, `ownerCrewId`.
- Canonized aliases: battle `participantIds`, power `userIds`/`previousUserIds`, location `connectedLocationIds` (drop `characterIds` on battles, drop `neighborLocationIds`).
- Relationships are ID- and image-independent, and future search/map/timeline navigation all flow through IDs.
- Full entity matrix + example graph documented. No logic implemented.

### Metadata
- Common fields every entity shares (e.g., `id`, `name`, `imageKey`, `summary`).
- Shared metadata shape documented in Phase 2D.

### Image Keys
- Entities reference artwork via a predictable key (e.g., entity slug), not a hardcoded path.
- Keys map to files like `monkey-d-luffy.*` (any browser format).
- Missing artwork must never break the UI — a placeholder fallback is planned (not implemented).

### Validation
- Future validation helpers for schema compliance.
- Will be added when schemas exist (Phase 2E+).
- Relationship validation concerns documented in `relationships.md` (Phase 2L): missing IDs, duplicates, circular references, invalid types, broken links.

## What does NOT belong here
- Any entity datasets (characters, locations, etc.)
- UI components or styling
- Image assets

## Expected Future Phases
- **2C** — Entity ID conventions — ✅ DONE (see `entity-ids.md`)
- **2D** — Shared metadata/schema conventions — ✅ DONE (see `entity-metadata.md`)
- **2L** — Relationship conventions — ✅ DONE (see `relationships.md`)
- **2M** — Sample integrated dataset (first records + first real relationships) — ✅ DONE (`index.js` files created in `characters/`, `locations/`, `arcs/`, `crews/`, `battles/`, `ships/`, `fruits/`)
- **2N** — Architecture verification (first relationship/schema checks over the data layer)

## Status
📄 README + `entity-ids.md` + `entity-metadata.md` + `relationships.md` + Phase 2M dataset (`index.js` in every data folder). Do not implement shared helpers until their phases arrive.
