# Ship Schema Foundation — One Piece 2.0

> **Created**: 2026-08-01 (Phase 2K)
> **Status**: SCHEMA — defines the shape of every future ship record
> **Extends**: `../shared/entity-metadata.md` (Shared Entity Metadata, Phase 2D)
> **IDs follow**: `../shared/entity-ids.md` (Universal Entity ID Convention, Phase 2C)

---

## 1. Objective

Define ONE reusable schema that represents **every** type of One Piece ship:

```
Pirate Ships · Marine Ships · Government Ships · Merchant Vessels
Historical Ships · Special-Purpose Vessels
```

One schema works for all — no per-type variants, no forks.

---

## 2. Design Principles

The schema is:

- **reusable** — one shape for every ship type
- **extensible** — future fields can be added without breaking existing records
- **relationship-driven** — related entities referenced by ID, never embedded
- **image-first** — artwork referenced by `imageKey`, never hardcoded paths
- **spoiler-ready** — supports future spoiler differentiation
- **independent from UI** — no presentation concerns
- **independent from routing** — no navigation concepts
- **independent from image loading** — resolution is a future phase

No presentation logic exists in this schema.

---

## 3. Base Metadata (from the Shared Layer)

Reused from `../shared/entity-metadata.md` — **NOT duplicated**.

### Required (shared)

| Field | Source | Notes |
|-------|--------|-------|
| `id` | shared | Convention-compliant, immutable (e.g., `thousand-sunny`, `going-merry`) |
| `displayName` | shared | UI text (e.g., `Thousand Sunny`) |
| `description` | shared | Short summary |

### Optional (shared)

| Field | Source | Notes |
|-------|--------|-------|
| `aliases` | shared | Alternate names |
| `tags` | shared | Loose categorizations |
| `status` | shared | Lifecycle (e.g., `active`, `destroyed`, `retired`, `historical`) |
| `imageKey` | shared | Equals `id` by default |
| `notes` | shared | Maintainer notes, not rendered |
| `metadata` | shared | Reserved flexible data |
| `createdAt` / `updatedAt` | shared | Optional timestamps |

---

## 4. Ship-Specific Fields

Fields that genuinely belong to ships (all optional unless noted):

| Field | Type | Notes |
|-------|------|-------|
| `shipType` | string | e.g., `pirate-ship`, `marine-ship`, `government-ship`, `merchant-vessel`, `historical-ship`, `special-purpose` |
| `ownerCrewId` | string | Crew/faction ID that currently owns the ship |
| `previousOwnerIds` | string[] | Crew/faction or character IDs of past owners |
| `captainIds` | string[] | Character IDs who commanded/captained the ship |
| `builder` | string | Optional — name or ID of the shipwright / builder |
| `manufacturer` | string | Optional — shipyard / dock name |
| `launchLocationId` | string | Location ID where the ship was launched |
| `currentLocationId` | string | Location ID where the ship currently is |
| `status` | string | Shared optional — lifecycle (see Status Strategy) |
| `size` | string | Optional — e.g., `very large`, `56m` |
| `specialFeatures` | string[] | Unique capabilities (e.g., `Coup de Burst`, `gaon cannon`, `Sea Train compatibility`) |
| `armament` | string[] | Weapons installed (e.g., `gaon cannon`, `gangster cannon`) |
| `propulsion` | string | Optional — e.g., `sail`, `paddle`, `steam` |
| `firstAppearance` | object | Optional — `{ arcId, chapter, episode }` |
| `latestAppearance` | object | Optional — same shape |

> `shipType` is the single most important discriminator; `ownerCrewId` anchors ownership. Everything else is optional per ship.

---

## 5. Relationship Fields (ID References Only)

**Never embed complete objects.** Every relationship is an ID reference.

| Field | References |
|-------|-----------|
| `crewIds` | Crew/faction IDs associated with the ship (ownership, use) |
| `characterIds` | Character IDs connected to the ship (captains, crews, shipwrights) |
| `battleIds` | Battle IDs the ship participated in |
| `locationIds` | Location IDs connected (launch, current, visited) |
| `arcIds` | Arc IDs where the ship is significant |
| `eventIds` | Notable event IDs involving the ship |

Documented how relationships work — **no relationship logic implemented**.

---

## 6. Image Strategy

Ship records carry **`imageKey`** only:

```js
imageKey: 'thousand-sunny'   // equals id by default
```

Examples: `thousand-sunny`, `going-merry`, `moby-dick`, `red-force`.

- ❌ Never hardcode `.png`, `.webp`, `.jpg`
- ❌ Never absolute URLs
- Image resolution (key → asset file → placeholder) is a **later phase**

---

## 7. History Support (Future)

The schema allows future history content — **documented only, nothing populated**:

- `ownershipHistory` — structured timeline of past and current owners (IDs + periods)
- `majorUpgrades` — notable modifications (e.g., new cannons, refinements)
- `repairs` — significant repairs / restorations
- `destruction` — how/when the ship was destroyed (narrative or structured)
- `restoration` — how/when it was restored or rebuilt
- `significantVoyages` — notable journeys (ID-referenced arcs/events)

These are planned structures, not required fields.

---

## 8. Optional Fields (Explicit)

Ships are NOT required to have every field. Common optional-only fields:

```
aliases · notes · designInspiration · symbolicMeaning · trivia
```

| Field | Notes |
|-------|-------|
| `designInspiration` | What inspired the ship's design (e.g., a lion motif) |
| `symbolicMeaning` | Thematic meaning (e.g., the Sunny's lion as courage) |
| `trivia` | Lightweight fun facts / background |

---

## 9. Spoiler Readiness (Schema Support Only)

The schema supports future spoiler differentiation — **no filtering implemented**.

Planned field: `spoilerLevel`

| Level | Meaning | Example content |
|-------|---------|-----------------|
| `basic` | Beginner-safe | Ship name, type, owner |
| `advanced` | Intermediate | Features, armament, history |
| `late` | Full-story | Destruction/restoration reveals, post-arc status |

> Uses the SAME levels (`basic`/`advanced`/`late`) as the Character (2E), Location (2F), Arc (2G), Crew (2H), Battle (2I), and Power (2J) schemas for consistency. Implementation (filtering UI, gating) belongs to a future phase — the schema simply allows the field.

---

## 10. Sample Ship (ONE — Validation Only)

Exactly ONE sample, to validate the schema. This is documentation, NOT the ship database.

```js
// Thousand Sunny — validates the schema for a pirate ship archetype
{
  id: 'thousand-sunny',
  displayName: 'Thousand Sunny',
  description: 'The Straw Hat Pirates\' second ship, built by Franky after the Going Merry.',
  // shared optional
  aliases: ['Sunny'],
  tags: ['pirate-ship', 'straw-hat-pirates'],
  status: 'active',
  imageKey: 'thousand-sunny',
  // ship-specific
  shipType: 'pirate-ship',
  ownerCrewId: 'straw-hat-pirates',
  previousOwnerIds: [],
  captainIds: ['monkey-d-luffy'],
  builder: 'Franky',
  manufacturer: 'Water 7 Shipyards',
  launchLocationId: 'water-7',
  currentLocationId: null, // currently at sea — omitted when not set, never a placeholder string
  size: '56m',
  specialFeatures: ['Coup de Burst', 'gaon cannon', 'doctor room', 'shark submarine'],
  armament: ['gaon cannon', 'gangster cannon', 'coup de bur', 'striker', 'wavemaker'],
  propulsion: 'sail',
  // relationships
  crewIds: ['straw-hat-pirates'],
  characterIds: ['monkey-d-luffy', 'franky'],
  battleIds: ['marineford-war'],
  locationIds: ['water-7'],
  arcIds: ['water-7', 'marineford-arc'],
  eventIds: ['timeskip'],
  // spoiler safety
  spoilerLevel: 'basic',
  // optional
  designInspiration: 'A lion — the Sunny\'s figurehead and motif reflect Franky\'s design.',
  symbolicMeaning: 'Courage and the promise of adventure.',
  trivia: 'The Sunny was designed as a ship that could sail almost anywhere.',
  notes: 'Sample record created in Phase 2K to validate the schema only.',
}
```

> This is the ONLY sample. No additional ships are created in this phase.

---

## 11. Schema Validation (Archetypes)

Verify the SAME schema represents diverse archetypes **without structural changes**:

| Archetype | Field usage (all within the one schema) |
|-----------|-----------------------------------------|
| **Pirate ship** | `shipType: 'pirate-ship'` · `ownerCrewId` set · `specialFeatures` set · `armament` set |
| **Marine ship** | `shipType: 'marine-ship'` · `ownerCrewId` → marine fleet faction · `armament` set · `specialFeatures` optional |
| **Merchant vessel** | `shipType: 'merchant-vessel'` · `ownerCrewId` omitted · `armament` empty · `propulsion` set |
| **Historical ship** | `shipType: 'historical-ship'` · `status: 'historical'` · `previousOwnerIds` set · `spoilerLevel: 'basic'` |

✅ The schema represents all four archetypes with **zero structural changes** — the same fields, different values. No refinement needed.

---

## 12. Future Extension Points

- `metadata` (shared) — flexible container for future tooling data
- `ownershipHistory` / `significantVoyages` — structured ship history (future)
- `spoilerLevel` — future spoiler filtering
- Ship datasets arrive in Phase 2M (sample integrated dataset) — NOT now
