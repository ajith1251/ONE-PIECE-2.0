# src/data/locations

## Purpose
Future home for all location datasets in One Piece 2.0 (islands, seas, regions, landmarks).

## What eventually belongs here
- Location entity records (e.g., `alabasta`, `wano`, `egghead`)
- Location schemas, lookups, and helpers

## ID Convention

Locations MUST follow the **Universal Entity ID Convention** (see `../shared/entity-ids.md`):

- IDs are lowercase kebab-case, unique, stable, and immutable once published.
- `id` ≠ `displayName` — UI shows the display name, references use the ID.
- Relationships to other entities use their IDs (e.g., `arcIds`, `battleIds`).
- IDs are never generated dynamically at runtime.

## What does NOT belong here
- Characters, arcs, battles, crews, fruits, ships, events, timeline data
- UI components or styling
- Image assets (those live in `public/images/`)

## Established Conventions

- **2C** — Entity ID conventions — ✅ DONE (see `../shared/entity-ids.md`)
- **2D** — Shared metadata — ✅ DONE (see `../shared/entity-metadata.md`)

## Schema (Phase 2F ✅)

Locations follow **`location-schema.md`** (Location Schema Foundation, Phase 2F):

- One reusable schema for every location type (seas, islands, kingdoms, marine bases, sky islands, underwater…)
- Extends the shared metadata layer — base fields are NOT duplicated
- Relationships use entity IDs only (`characterIds`, `arcIds`, `battleIds`, …)
- Artwork referenced by `imageKey` (equals `id` by default) — never paths or extensions
- Map-readiness fields (`mapRegion`, `hotspotId`, `displayOrder`) documented only
- `spoilerLevel` (`basic`/`advanced`/`late`) supports future spoiler safety

## Expected future phases
- **2M** — Sample integrated dataset (locations included)

## Status
📐 SCHEMA DEFINED — `location-schema.md` exists (Phase 2F). Dataset remains empty — do not populate until Phase 2M.
