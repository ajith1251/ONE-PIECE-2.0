# Cross-Entity Relationship Convention — One Piece 2.0

> **Created**: 2026-08-01 (Phase 2L)
> **Updated**: 2026-08-02 (Phase 2N — stored-both canonicalization, global-ID fix `marineford-arc`, verification tooling reference)
> **Status**: CONVENTION — defines how every entity schema relates to one another
> **Extends**: `../shared/entity-ids.md` (Universal Entity ID Convention, Phase 2C) + `../shared/entity-metadata.md` (Shared Entity Metadata, Phase 2D)
> **Applies to**: Character, Location, Arc, Crew/Faction, Battle, Devil Fruit & Power, Ship, Event schemas
> **Scope**: Architecture only — NO datasets, NO validation code, NO relationship logic implemented

---

## 1. Objective

Define ONE universal relationship convention that every entity relationship in the project follows. Every future dataset, lookup, and navigation feature depends on this single, stable rule set.

---

## 2. Relationship Philosophy

**Relationships always reference stable IDs. Never embed complete entities.**

| ✅ Correct | ❌ Incorrect |
|-----------|-------------|
| `characterIds: ['monkey-d-luffy']` | `characters: [{ id, displayName, bounty, ... }]` |
| `locationIds: ['marineford']` | `location: { id, displayName, sea, ... }` |
| `battleIds: ['marineford-war']` | `battles: [<full battle objects>]` |
| `crewIds: ['straw-hat-pirates']` | `crew: { id, displayName, captainId, ... }` |
| `shipIds: ['thousand-sunny']` | `ships: [<full ship objects>]` |
| `devilFruitIds: ['gomu-gomu-no-mi']` | `devilFruit: { id, displayName, ... }` |

Rules:

1. A relationship field stores **only an ID** or **an array of IDs**.
2. The referenced entity's full record lives in its **own dataset folder** (`src/data/<type>/`).
3. Consumers resolve an ID → entity record at **use time**, never at rest.
4. No relationship field ever duplicates an entity's content (no embedded objects, no denormalized display text).

---

## 3. Cardinality Rules

Supported relationship types, defined once for the whole project:

| Cardinality | Field shape | Used when |
|-------------|-------------|-----------|
| **One → One** | Single ID field (e.g., `character.devilFruitId`) | A child entity is unique to a parent (or vice versa) |
| **One → Many** | Single ID on the "one" side pointing to a group, OR a plural `*Ids` array on the "many" side | e.g., `crew.captainId` (one captain per crew) |
| **Many → Many** | Plural `*Ids` arrays on **one or both** sides | The common case: characters in arcs, battles in locations, etc. |

Convention:

- **Singular field** (`captainId`, `devilFruitId`, `locationId`) when the relationship is One → One or the field names a single anchor (current location, primary arc).
- **Plural field** (`characterIds`, `arcIds`, `battleIds`) when the relationship is One → Many or Many → Many.
- A plural field may contain an **empty array** or be **omitted** — both mean "no relationship", never `null` placeholders.

No validation code is implemented; this documents intent.

---

## 4. Bidirectional Relationships

**Strategy: store relationships in BOTH directions, with ONE declared source of truth per relationship.**

- Every relationship declares a single **source-of-truth** field — the canonical owner.
- The reverse direction MAY also be stored on the counterpart record as a **mirror copy** (stored-both). Mirrors give O(1) traversal in both directions and self-contained records.
- A mirror is conceptually derived from its source of truth and MUST agree with it. Edit the source, regenerate the mirror.
- Example: `crew.memberIds` is the source of truth for Straw Hat membership; `character.crewIds` is a stored mirror derived from it. Both appear in Phase 2M records.
- Phase 2N verification (`npm run verify` → `scripts/verify-data.mjs`) checks mirror agreement; gaps are reported as warnings.

Rationale:

- Mirrors make reverse lookups instant (no dataset scan) and keep every record self-contained for future UI features.
- A single source of truth keeps edits deterministic and prevents drift between the two sides.
- Where a schema provides no reverse field (e.g., a location has no `shipIds`), the relationship is stored one-directionally — mirrors are optional, agreement is mandatory whenever both sides exist.

Exceptions (documented per-schema aliases, canonized here):

| Alias pair | Canonical owner | Notes |
|------------|-----------------|-------|
| Battle `participantIds` ↔ `characterIds` | `participantIds` on battle | Schemas must use `participantIds`; drop `characterIds` on battles |
| Power `userIds`/`previousUserIds` ↔ `characterIds` | `userIds`/`previousUserIds` on power | Schemas must use user fields; drop `characterIds` on powers |
| Location `connectedLocationIds` ↔ `neighborLocationIds` | `connectedLocationIds` on location | Schemas must use `connectedLocationIds`; drop `neighborLocationIds` |

---

## 5. Entity Relationship Matrix

How entities connect (ID references only). Documented — NOT populated beyond the Phase 2M sample.

Columns: **Source of truth** = the canonical owner (where edits land). **Stored mirror** = the optional reverse copy on the counterpart record (stored-both convention, §4). When both are stored they MUST agree; `npm run verify` reports gaps as warnings.

| Relationship | Source of truth | Stored mirror (stored-both) | Referenced type |
|--------------|-----------------|-----------------------------|-----------------|
| Character → Crew | `crew.memberIds` | `character.crewIds` | crew |
| Character → Ship | `ship.characterIds` | `character.shipIds` | ship |
| Character → Arc | `arc.characterIds` | `character.arcIds` | arc |
| Character → Battle | `battle.participantIds` | `character.battleIds` | battle |
| Character → Location | `location.characterIds` | `character.locationIds` | location |
| Character → Devil Fruit / Power | `character.devilFruitId` | `power.userIds` (current user) | power |
| Arc → Battle | `battle.arcId` | `arc.battleIds` | battle |
| Arc → Location | `arc.locationIds` | `location.arcIds` | location |
| Arc → Character | `arc.characterIds` | `character.arcIds` | character |
| Arc → Crew | `arc.crewIds` | `crew.arcIds` | crew |
| Crew → Ship | `ship.ownerCrewId` | `crew.shipIds` | ship |
| Crew → Battle | `battle.crewIds` | `crew.battleIds` | crew |
| Crew → Location | `location.crewIds` | `crew.locationIds` | location |
| Location → Battle | `battle.locationId` | `location.battleIds` | location |
| Ship → Battle | `battle.shipIds` | `ship.battleIds` | ship |
| Ship → Location | `ship.launchLocationId` / `currentLocationId` | — (no `shipIds` on locations; one-way) | location |
| Power → Character | `power.userIds` / `previousUserIds` | `character.devilFruitId` (current user only) | character |

Guidance: **the singular side is the source of truth.** When one side is naturally singular (battle's arc, ship's owner crew, character's fruit, battle's location), store the relationship there; mirror the plural side when a reverse field exists.

---

## 6. Relationship Naming

**One naming convention project-wide. No aliases, no variants.**

Standard relationship property names:

```
characterIds
locationIds
battleIds
crewIds
shipIds
devilFruitIds
eventIds
arcIds
powerIds        // powers other than Devil Fruits (Haki, combat styles, weapons)
relatedPowerIds // thematic links between powers
```

Singular variants (One → One / single anchor only):

```
captainId
devilFruitId    // a character's single Devil Fruit
locationId      // a battle's single location
arcId           // a battle's single arc
ownerCrewId     // a ship's owning crew
parentLocationId
headquartersLocationId
originLocationId
currentLocationId
```

**Forbidden** (avoid inconsistent shapes):

```
crew            crewList         members         memberList
ships           ship             shipList        fruits
locations       locationList     devilFruit      fruit
participants    cast             belligerents
```

- A field is plural (`*Ids`) whenever it may hold more than one ID.
- A field is singular whenever it holds exactly one ID or `null`/omitted.
- Phase 2M datasets and all future datasets MUST use these exact names.

---

## 7. Cascade Principles

Expected behavior when an entity changes — **documented only**:

| Change | ID impact | Relationship impact |
|--------|-----------|---------------------|
| Character renamed (`displayName` changes) | ID unchanged | All `*Ids` references keep working unchanged |
| Character ID changes | ID changes (should NEVER happen — IDs are immutable once published) | Every referencing record must be updated; this is a breaking change |
| Character image changes (`imageKey`) | ID unchanged | Relationships unaffected (image independence) |
| Entity deleted / status → `deceased`/`historic` | ID retained | Referencing records keep valid IDs; consumers show placeholder/status |
| Entity typo fixed | ID unchanged unless the ID itself was wrong | References unaffected |

Core principle: **the ID is the contract.** Renames, image swaps, and lifecycle changes must not break relationships. Only an ID change (prohibited) breaks them.

---

## 8. Image Independence

**Relationships NEVER depend on image path, image extension, or image availability.**

- Relationships use IDs only.
- `imageKey` is metadata on the entity record, never a relationship key.
- If artwork is missing, an entity still exists and its relationships still resolve (placeholder rendering is a future UI concern).
- Replacing an image file never requires editing a relationship.

---

## 9. Future Search Support

- Future search will resolve queries against **IDs and metadata** (`displayName`, `aliases`, `tags`, `description`), not UI labels or relationship fields.
- Relationships provide traversal (e.g., "battles of this character"), not text matching.
- Search must never depend on how a record is rendered.

No search implementation — architecture only.

---

## 10. Future Map Support

Locations will connect to the world map via their **IDs**, not via image coordinates:

```
map hotspots → locationId (canonical location ID)
    └─ resolves → characters (location.characterIds / character.locationIds)
    └─ resolves → battles (battle.locationId / location.battleIds)
    └─ resolves → arcs (arc.locationIds)
    └─ resolves → crews (crew.headquartersLocationId / location.crewIds)
    └─ resolves → ships (ship.currentLocationId / launchLocationId)
```

- Map data (`mapRegion`, `hotspotId`, `displayOrder`) is stored on the location record.
- Hotspot → content resolution always flows through the location ID.

No hotspot implementation — architecture only.

---

## 11. Future Timeline Support

Chronological navigation will compose entities through IDs:

| Entity | Timeline anchor |
|--------|-----------------|
| Arc | `sagaId`, `arcNumber`, `chronologicalOrder`, `previousArcId`, `nextArcId` |
| Battle | `arcId`, `timelineOrder` |
| Event | (future) date / position relative to arcs |
| Location | `firstAppearance` / `latestAppearance` (arc + chapter + episode) |
| Character | `firstAppearance` / `latestAppearance` |

- Navigation flows from arc → battles → events → appearances, resolved by ID.
- Flashback arcs are ordered by `chronologicalOrder`, distinct from `arcNumber` (release order).

No timeline logic implemented — architecture only.

---

## 12. Validation Principles (Future)

Expected validation concerns — **no validation code implemented, architecture only**:

| Concern | Expected future check |
|---------|-----------------------|
| Missing referenced ID | Every `*Id`/`*Ids` value resolves to an existing entity record |
| Duplicate IDs | No duplicate IDs within a dataset; no duplicate values inside a single `*Ids` array |
| Circular references | Detect cycles in relationships (e.g., a chain of arcs or event dependencies) |
| Invalid entity type | Referenced ID resolves to the entity type the field name implies (e.g., `crewIds` → a crew) |
| Broken relationship | ID referenced but target missing → flagged (data-quality, not runtime error) |

Validation runs as Phase 2N tooling: `npm run verify` → `scripts/verify-data.mjs`. Structural checks (resolution, duplicates, types, aliases, cycles) are errors; stored-both mirror gaps are warnings.

---

## 13. Example Relationship Graph (Documentation Only)

One small traversal matching the Phase 2M dataset — walks every entity type exactly once. NOT the full data:

```
Monkey D. Luffy (character)
        │  crewIds
        ▼
Straw Hat Pirates (crew)
        │  shipIds
        ▼
Thousand Sunny (ship)
        │  launchLocationId
        ▼
Water 7 (location)
        │  connectedLocationIds
        ▼
Marineford (location)
        │  battleIds
        ▼
Marineford War (battle)
        │  arcId
        ▼
Marineford (arc)
        │  characterIds
        ▼
Monkey D. Luffy (character)
        │  devilFruitId
        ▼
Gomu Gomu no Mi (power)
```

Reading the graph:

- Every arrow is a **stored ID reference on the source entity** — each field shown exists in the Phase 2M dataset.
- Reverse directions may be stored as mirror copies on the counterpart record (stored-both, per §4) — omitted here for readability.
- No arrow carries entity content — only IDs.
- Replacing any entity's displayName or image leaves every arrow intact (§7–8).

---

## 14. Future Extension Points

- `scripts/verify-data.mjs` — Phase 2N verification tooling (`npm run verify`); a future `shared/relationships.js` resolve/derive helper remains a later-phase option
- `eventIds` / `powerIds` / `relatedPowerIds` — new relationship kinds without schema changes
- Timeline + map navigation layers consume the same ID conventions
- Phase 2M datasets MUST follow every rule in this document
