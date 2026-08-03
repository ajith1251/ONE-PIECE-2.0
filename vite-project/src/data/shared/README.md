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
- **Relationship placeholders**: `characterIds`, `locationIds`, `battleIds`, `crewIds`, `devilFruitIds`, `shipIds` — IDs only.
- Entity-specific fields (`bounty`, `crew`, `devilFruit`, `haki`, …) belong in specialized schemas, NOT here.

### Relationships (Phase 2L) — ✅ DOCUMENTED

See **`relationships.md`** in this folder for the complete Cross-Entity Relationship Convention.

Quick summary:
- Relationships ALWAYS reference stable IDs — never embed complete entities.
- Stored-both strategy (Phase 2N canon): each relationship has ONE declared source of truth; the reverse MAY be stored as a mirror copy that must agree with it.
- Cardinality: One→One (singular field), One→Many / Many→Many (plural `*Ids` fields).
- Standard names: `characterIds`, `locationIds`, `battleIds`, `crewIds`, `shipIds`, `devilFruitIds`, `eventIds`, `arcIds`, `powerIds`; singulars like `captainId`, `devilFruitId`, `locationId`, `arcId`, `ownerCrewId`.
- Canonized aliases: battle `participantIds`, power `userIds`/`previousUserIds`, location `connectedLocationIds` (drop `characterIds` on battles, drop `neighborLocationIds`).
- Relationships are ID- and image-independent, and future search/map/timeline navigation all flow through IDs.
- Full entity matrix + example graph documented. Verification tooling implemented in Phase 2N (`scripts/verify-data.mjs`, `npm run verify`).

### Metadata
- Common fields every entity shares (e.g., `id`, `name`, `imageKey`, `summary`).
- Shared metadata shape documented in Phase 2D.

### Image Keys
- Entities reference artwork via a predictable key (e.g., entity slug), not a hardcoded path.
- Keys map to files like `monkey-d-luffy.*` (any browser format).
- Missing artwork must never break the UI — a placeholder fallback is planned (not implemented).
- **Universal Asset System (Phase 3A ✅)** — the permanent asset architecture lives in **`public/images/README.md`** (directory structure, folder responsibilities, naming convention, supported formats, replacement/ownership/placeholder/migration rules, future resolver responsibilities). Data references `imageKey` only; the future resolver is the only code that maps `imageKey` → file.

### Validation
- Phase 2N verification tooling: `scripts/verify-data.mjs` (run via `npm run verify`).
- Structural checks are errors: missing/duplicate IDs, duplicate array values, unresolved references, type mismatches, alias violations, self-references, circular `previousArcId`/`nextArcId` chains, malformed IDs.
- Stored-both mirror gaps/disagreements are warnings (data completeness, not structure).
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
- **2N** — Architecture verification — ✅ DONE (`scripts/verify-data.mjs` + canonicalization of storage direction, `devilFruitId`, `marineford-arc` global-ID fix)
- **2O** — Architecture lock (freeze conventions, record protected systems) — ✅ DONE (Phase 2 locked; see `docs/PROJECT_MEMORY.md`)
- **3A** — Universal Asset System foundation (asset tree + conventions in `public/images/README.md`) — ✅ DONE

## Status
📄 README + `entity-ids.md` + `entity-metadata.md` + `relationships.md` + Phase 2M dataset (`index.js` in every data folder) + Phase 2N verification tooling (`scripts/verify-data.mjs`). Do not implement shared helpers until their phases arrive.
