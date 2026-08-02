# Location Schema Foundation — One Piece 2.0

> **Created**: 2026-08-01 (Phase 2F)
> **Status**: SCHEMA — defines the shape of every future location record
> **Extends**: `../shared/entity-metadata.md` (Shared Entity Metadata, Phase 2D)
> **IDs follow**: `../shared/entity-ids.md` (Universal Entity ID Convention, Phase 2C)

---

## 1. Objective

Define ONE reusable schema that represents **every** type of One Piece location:

```
Seas · Oceans · Islands · Kingdoms · Cities · Villages · Forests · Castles
Marine Bases · Sky Islands · Underwater Locations · Pirate Hideouts
Historic Locations
```

One schema works for all — no per-type variants, no forks.

---

## 2. Design Principles

The schema is:

- **reusable** — one shape for every location type
- **extensible** — future fields can be added without breaking existing records
- **image-first** — artwork referenced by `imageKey`, never hardcoded paths
- **relationship-friendly** — related entities referenced by ID, never embedded
- **independent from UI** — no presentation concerns
- **independent from routing** — no navigation concepts
- **independent from image loading** — resolution is a future phase
- **map-ready** — every location can later connect to the world map

No presentation logic exists in this schema.

---

## 3. Base Metadata (from the Shared Layer)

Reused from `../shared/entity-metadata.md` — **NOT duplicated**.

### Required (shared)

| Field | Source | Notes |
|-------|--------|-------|
| `id` | shared | Convention-compliant, immutable (e.g., `alabasta`) |
| `displayName` | shared | UI text (e.g., `Alabasta`) |
| `description` | shared | Short summary |

### Optional (shared)

| Field | Source | Notes |
|-------|--------|-------|
| `aliases` | shared | Alternate names |
| `tags` | shared | Loose categorizations |
| `status` | shared | Lifecycle (e.g., `active`, `historic`) |
| `imageKey` | shared | Equals `id` by default |
| `notes` | shared | Maintainer notes, not rendered |
| `metadata` | shared | Reserved flexible data |
| `createdAt` / `updatedAt` | shared | Optional timestamps |

---

## 4. Location-Specific Fields

Fields that genuinely belong to locations (all optional unless noted):

| Field | Type | Notes |
|-------|------|-------|
| `locationType` | string | e.g., `island`, `kingdom`, `marine-base`, `sky-island`, `underwater`, `sea` |
| `sea` | string | Which sea it belongs to — e.g., `east-blue`, `grand-line`, `north-blue` |
| `region` | string | Sub-region, e.g., `paradise`, `new-world` |
| `parentLocationId` | string | Containing location ID reference (e.g., island inside a kingdom) |
| `connectedLocationIds` | string[] | Directly reachable locations |
| `climate` | string | e.g., `tropical`, `arid`, `snowy` |
| `terrain` | string[] | e.g., `['desert', 'oasis']` |
| `government` | string | e.g., `monarchy`, `world-government` |
| `controllingFactionIds` | string[] | Faction ID references controlling this location |
| `population` | number | Approximate population |
| `firstAppearance` | object | Optional — `{ arcId, chapter, episode }` |
| `latestAppearance` | object | Optional — same shape |

> `locationType` is the single most important discriminator; everything else is optional per location.

---

## 5. Relationship Fields (ID References Only)

**Never embed complete objects.** Every relationship is an ID reference.

| Field | References |
|-------|-----------|
| `characterIds` | Character IDs associated with this location |
| `arcIds` | Arc IDs set here |
| `battleIds` | Battle IDs that happened here |
| `crewIds` | Crew/faction IDs based or active here |
| `eventIds` | Notable event IDs |
| `neighborLocationIds` | Adjacent locations (alias of `connectedLocationIds`) |

Documented how relationships work — **no relationship logic implemented**.

> ⚠️ **Canonical field (Phase 2L)**: `connectedLocationIds` is the canonical adjacency field. `neighborLocationIds` exists only because the Phase 2F spec named it — future datasets MUST use `connectedLocationIds` and omit `neighborLocationIds` to avoid divergence (canonized in `../shared/relationships.md`).

---

## 6. Image Strategy

Location records carry **`imageKey`** only:

```js
imageKey: 'alabasta'   // equals id by default
```

Examples: `alabasta`, `water-7`, `marineford`, `egghead`.

- ❌ Never hardcode `.png`, `.webp`, `.jpg`
- ❌ Never absolute URLs
- Image resolution (key → asset file → placeholder) is a **later phase**

---

## 7. Map Readiness (Future)

Every location can later connect to the world map. **Documented only — no coordinates or hotspots implemented.**

Planned map metadata:

| Field | Purpose |
|-------|---------|
| `mapRegion` | Which map region this location belongs to |
| `hotspotId` | Future map hotspot identifier |
| `displayOrder` | Suggested ordering/priority on the map |

The map itself stays image-first (finished asset + hotspots), per the architecture plan.

---

## 8. Achievement / History Support (Future)

The schema allows future history content — **nothing populated**:

- `historicalSignificance` — why this location matters historically
- `majorBattles` — battle ID references
- `importantEvents` — event ID references
- `rulers` — character ID references
- `organizations` — faction ID references
- `notableResidents` — character ID references

These are planned structures, not required fields.

---

## 9. Optional Fields (Explicit)

Locations are NOT required to have every field. Common optional-only fields:

```
aliases · notes · specialFeatures · hiddenInformation
```

| Field | Notes |
|-------|-------|
| `specialFeatures` | Unique traits (e.g., weather anomalies, terrain quirks) |
| `hiddenInformation` | Secrets/reveals — pairs with spoiler readiness |

---

## 10. Spoiler Readiness (Schema Support Only)

The schema supports future spoiler differentiation — **no filtering implemented**.

Planned field: `spoilerLevel`

| Level | Meaning | Example content |
|-------|---------|-----------------|
| `basic` | Public knowledge | Name, location type, region |
| `advanced` | Deeper lore | Government, factions, history |
| `late` | Late-story reveals | Hidden information, post-arc status |

Implementation (filtering UI, gating) belongs to a future phase — the schema simply allows the field.

---

## 11. Sample Location (ONE — Validation Only)

Exactly ONE sample, to validate the schema. This is documentation, NOT the location database.

```js
// Alabasta — validates the schema for island/kingdom archetypes
{
  id: 'alabasta',
  displayName: 'Alabasta',
  description: 'A vast desert kingdom on the Grand Line.',
  // shared optional
  aliases: ['The Sand Kingdom'],
  tags: ['kingdom', 'desert', 'grand-line'],
  status: 'active',
  imageKey: 'alabasta',
  // location-specific
  locationType: 'kingdom',
  sea: 'grand-line',
  region: 'paradise',
  climate: 'arid',
  terrain: ['desert', 'oasis', 'river'],
  government: 'monarchy',
  population: 10000000,
  // relationships
  characterIds: ['nefertari-vivi'],
  arcIds: ['alabasta-arc'],
  battleIds: ['alabasta-war'],
  crewIds: ['straw-hat-pirates'],
  eventIds: ['alabasta-rebellion'],
  connectedLocationIds: ['nanohana'],
  // map readiness (documented, not implemented)
  mapRegion: 'paradise',
  // spoiler safety
  spoilerLevel: 'basic',
  // optional
  notes: 'Sample record created in Phase 2F to validate the schema only.',
}
```

> This is the ONLY sample. No additional locations are created in this phase.

---

## 12. Schema Validation (Archetypes)

Verify the SAME schema represents diverse archetypes **without structural changes**:

| Archetype | Field usage (all within the one schema) |
|-----------|-----------------------------------------|
| **Island** | `locationType: 'island'` · `sea` set · `parentLocationId` optional |
| **Kingdom** | `locationType: 'kingdom'` · `government` set · `rulers` planned |
| **Marine base** | `locationType: 'marine-base'` · `controllingFactionIds` → marine faction |
| **Sky island** | `locationType: 'sky-island'` · `terrain` e.g. `clouds` · `sea` omitted |
| **Underwater location** | `locationType: 'underwater'` · `climate` n/a · `connectedLocationIds` via sea routes |

✅ The schema represents all five archetypes with **zero structural changes** — the same fields, different values. No refinement needed.

---

## 13. Future Extension Points

- `metadata` (shared) — flexible container for future tooling data
- `mapRegion` / `hotspotId` / `displayOrder` — world map connection (Phase 7+)
- `spoilerLevel` — future spoiler filtering
- Location datasets arrive in Phase 2M (sample integrated dataset) — NOT now
