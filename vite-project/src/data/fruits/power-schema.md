# Devil Fruit & Power Schema Foundation — One Piece 2.0

> **Created**: 2026-08-01 (Phase 2J)
> **Status**: SCHEMA — defines the shape of every future power record
> **Extends**: `../shared/entity-metadata.md` (Shared Entity Metadata, Phase 2D)
> **IDs follow**: `../shared/entity-ids.md` (Universal Entity ID Convention, Phase 2C)

---

## 1. Objective

Define ONE reusable schema that represents **every** power system in One Piece:

```
Devil Fruits · Haki · Combat Styles · Weapons-Based Fighting Systems
Special Abilities · Non-Devil Fruit Powers
```

One schema works for all — no per-system variants, no forks. The schema is flexible enough to support all current and future power systems without redesign.

---

## 2. Design Principles

The schema is:

- **reusable** — one shape for every power type
- **extensible** — future systems can be added without breaking existing records
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
| `id` | shared | Convention-compliant, immutable (e.g., `gomu-gomu-no-mi`, `mera-mera-no-mi`) |
| `displayName` | shared | UI text (e.g., `Gomu Gomu no Mi`) |
| `description` | shared | Short summary |

### Optional (shared)

| Field | Source | Notes |
|-------|--------|-------|
| `aliases` | shared | Alternate names |
| `tags` | shared | Loose categorizations |
| `status` | shared | Lifecycle (e.g., `active`, `awakened`, `historic`) |
| `imageKey` | shared | Equals `id` by default |
| `notes` | shared | Maintainer notes, not rendered |
| `metadata` | shared | Reserved flexible data |
| `createdAt` / `updatedAt` | shared | Optional timestamps |

---

## 4. Power-Specific Fields

Fields that genuinely belong to powers (all optional unless noted):

| Field | Type | Notes |
|-------|------|-------|
| `powerType` | string | e.g., `devil-fruit`, `haki`, `combat-style`, `weapon-style`, `special-ability`, `non-fruit` |
| `fruitType` | string | Only for Devil Fruits — e.g., `paramecia`, `zoan`, `ancient-zoan`, `mythical-zoan`, `logia` |
| `canonicalName` | string | The canonical in-story name (may differ from `displayName` for spoiler-sensitive reveals) |
| `alternativeNames` | string[] | Other in-story names (complements shared `aliases`) |
| `userIds` | string[] | Character IDs of current users/wielders |
| `previousUserIds` | string[] | Character IDs of past users/wielders |
| `awakeningStatus` | string | Optional — `awakened` / `not-awakened` / `unknown` |
| `strengths` | string[] | What the power excels at |
| `weaknesses` | string[] | Limitations, counters, drawbacks |
| `combatApplications` | string[] | How the power is used in battle |
| `rarity` | string | Optional — descriptive rarity, e.g., `unique`, `rare`, `common` |
| `canonicalStatus` | string | Optional — how canon the record is, e.g., `canon`, `movie-only`, `novel-only` |

> `powerType` is the single most important discriminator; `fruitType` applies only when `powerType` is `devil-fruit`. Everything else is optional per power.

---

## 5. Haki Support

The schema represents Haki via `powerType: 'haki'` plus a `hakiType` discriminator — **no separate Haki database**:

| Haki Type | `powerType` | `hakiType` | Notes |
|-----------|-------------|------------|-------|
| Observation Haki | `haki` | `observation` | Advanced form: future sight |
| Armament Haki | `haki` | `armament` | Advanced form: internal destruction |
| Conqueror's Haki | `haki` | `conquerors` | Advanced form: coating / imbuing |

Representing advanced forms:

```js
hakiType: 'armament',
advancedForm: 'internal destruction',   // optional — descriptive label of the advanced application
```

- Haki records reference users via `userIds` (same as every power).
- Haki is described with `strengths`, `weaknesses`, and `combatApplications` like any power.

---

## 6. Devil Fruit Support

The schema supports every Devil Fruit category via `powerType: 'devil-fruit'` + `fruitType` — **no per-category variants**:

| Category | `fruitType` |
|----------|-------------|
| Paramecia | `paramecia` |
| Zoan | `zoan` |
| Ancient Zoan | `ancient-zoan` |
| Mythical Zoan | `mythical-zoan` |
| Logia | `logia` |

Fruit-specific considerations:

- `awakeningStatus` applies primarily to Devil Fruits.
- `canonicalName` covers cases where the true fruit name differs from what characters believe (spoiler-sensitive).
- `previousUserIds` tracks reincarnation/transfer of a fruit's power.

---

## 7. Relationship Fields (ID References Only)

**Never embed complete objects.** Every relationship is an ID reference.

| Field | References |
|-------|-----------|
| `characterIds` | Character IDs who use/have used the power (alias of `userIds`/`previousUserIds`) |
| `battleIds` | Battle IDs where the power was decisive |
| `arcIds` | Arc IDs where the power is significant |
| `locationIds` | Location IDs where the power was acquired/used |
| `crewIds` | Crew/faction IDs associated with the power's users |
| `relatedPowerIds` | Power IDs thematically related (e.g., elemental counterparts, same-class fruits) |

Documented how relationships work — **no relationship logic implemented**.

> ⚠️ **Canonical field (Phase 2L)**: `userIds` / `previousUserIds` are the canonical user references. `characterIds` remains a relationship alias documented in `../shared/relationships.md` — future datasets MUST use `userIds` / `previousUserIds` and omit `characterIds` to avoid divergence.

---

## 8. Image Strategy

Power records carry **`imageKey`** only:

```js
imageKey: 'gomu-gomu-no-mi'   // equals id by default
```

Examples: `gomu-gomu-no-mi`, `mera-mera-no-mi`, `ope-ope-no-mi`.

- ❌ Never hardcode `.png`, `.webp`, `.jpg`
- ❌ Never absolute URLs
- Image resolution (key → asset file → placeholder) is a **later phase**

---

## 9. Optional Fields (Explicit)

Powers are NOT required to have every field. Common optional-only fields:

```
aliases · trivia · notes · historicalUsers · symbolicMeaning
```

| Field | Notes |
|-------|-------|
| `trivia` | Lightweight fun facts / background |
| `historicalUsers` | Notable past users (complements `previousUserIds` with narrative context) |
| `symbolicMeaning` | Thematic meaning of the power (e.g., freedom, flame of passing wills) |

---

## 10. Spoiler Readiness (Schema Support Only)

The schema supports future spoiler differentiation — **no filtering implemented**.

Planned field: `spoilerLevel`

| Level | Meaning | Example content |
|-------|---------|-----------------|
| `basic` | Beginner-safe | Power name, type, category |
| `advanced` | Intermediate | Strengths, weaknesses, known users |
| `late` | Full-story | True canonical name, awakening, final reveals |

> Uses the SAME levels (`basic`/`advanced`/`late`) as the Character (2E), Location (2F), Arc (2G), Crew (2H), and Battle (2I) schemas for consistency. Implementation (filtering UI, gating) belongs to a future phase — the schema simply allows the field.

---

## 11. Sample Power (ONE — Validation Only)

Exactly ONE sample, to validate the schema. This is documentation, NOT the power database.

```js
// Gomu Gomu no Mi — validates the schema for a Devil Fruit archetype
{
  id: 'gomu-gomu-no-mi',
  displayName: 'Gomu Gomu no Mi',
  description: 'A Devil Fruit that grants its user a rubber body.',
  // shared optional
  aliases: ['Rubber Fruit'],
  tags: ['devil-fruit', 'paramecia'],
  status: 'active',
  imageKey: 'gomu-gomu-no-mi',
  // power-specific
  powerType: 'devil-fruit',
  fruitType: 'paramecia',
  canonicalName: 'Hito Hito no Mi, Model: Nika', // late-story reveal — handled by spoilerLevel
  alternativeNames: ['Gum-Gum Fruit'],
  userIds: ['monkey-d-luffy'],
  previousUserIds: ['shanks'],
  awakeningStatus: 'awakened',
  strengths: ['elastic resilience', 'creative stretching', 'unconventional movement'],
  weaknesses: ['swimming (seawater weakness)', 'bladed weapons (pre-refinement)'],
  combatApplications: ['gum-gum techniques', 'Gear 5 transformations'],
  rarity: 'unique',
  canonicalStatus: 'canon',
  // relationships
  characterIds: ['monkey-d-luffy'],
  battleIds: ['luffy-vs-kaido'],
  arcIds: ['marineford', 'wano'],
  locationIds: ['foosha-village'],
  crewIds: ['straw-hat-pirates'],
  relatedPowerIds: ['mera-mera-no-mi'],
  // spoiler safety
  spoilerLevel: 'late',
  // optional
  trivia: 'The canonical name is a major late-story reveal.',
  symbolicMeaning: 'Freedom and liberation.',
  notes: 'Sample record created in Phase 2J to validate the schema only.',
}
```

> This is the ONLY sample. No additional powers are created in this phase.

---

## 12. Schema Validation (Archetypes)

Verify the SAME schema represents diverse archetypes **without structural changes**:

| Archetype | Field usage (all within the one schema) |
|-----------|-----------------------------------------|
| **Logia fruit** | `powerType: 'devil-fruit'` · `fruitType: 'logia'` · `strengths` elemental intangibility · `weaknesses` set |
| **Mythical Zoan** | `powerType: 'devil-fruit'` · `fruitType: 'mythical-zoan'` · `canonicalName` reveal · `awakeningStatus` optional |
| **Paramecia** | `powerType: 'devil-fruit'` · `fruitType: 'paramecia'` · `combatApplications` broad |
| **Haki ability** | `powerType: 'haki'` · `hakiType: 'observation'/'armament'/'conquerors'` · `advancedForm` optional · `fruitType` omitted |
| **Weapon-based combat style** | `powerType: 'weapon-style'` · `combatApplications` set · `fruitType` omitted · `userIds` set |

✅ The schema represents all five archetypes with **zero structural changes** — the same fields, different values. No refinement needed.

---

## 13. Future Extension Points

- `metadata` (shared) — flexible container for future tooling data
- `relatedPowerIds` — power web (elemental counterparts, fruit classes) without structural change
- `powerType` — new systems (e.g., `cyborg-augmentation`, `race-ability`) added as values, not schema changes
- `spoilerLevel` — future spoiler filtering
- Power datasets arrive in Phase 2M (sample integrated dataset) — NOT now
