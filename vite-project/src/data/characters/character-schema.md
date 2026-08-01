# Character Schema Foundation — One Piece 2.0

> **Created**: 2026-08-01 (Phase 2E)
> **Status**: SCHEMA — defines the shape of every future character record
> **Extends**: `../shared/entity-metadata.md` (Shared Entity Metadata, Phase 2D)
> **IDs follow**: `../shared/entity-ids.md` (Universal Entity ID Convention, Phase 2C)

---

## 1. Objective

Define ONE reusable schema that represents **every** type of One Piece character:

```
Straw Hat Pirates · Marines · Yonko · Shichibukai · Revolutionaries
World Government · Pirates · Civilians · Kings · Villains
Historical figures · Future characters
```

One schema works for all — no per-type variants, no forks.

---

## 2. Design Principles

The schema is:

- **reusable** — one shape for every character type
- **extensible** — future fields can be added without breaking existing records
- **image-first** — artwork referenced by `imageKey`, never hardcoded paths
- **relationship-friendly** — related entities referenced by ID, never embedded
- **independent from UI** — no presentation concerns
- **independent from image loading** — resolution is a future phase
- **independent from routing** — no navigation concepts

No presentation logic exists in this schema.

---

## 3. Base Metadata (from the Shared Layer)

Reused from `../shared/entity-metadata.md` — **NOT duplicated**.

### Required (shared)

| Field | Source | Notes |
|-------|--------|-------|
| `id` | shared | Convention-compliant, immutable (e.g., `monkey-d-luffy`) |
| `displayName` | shared | UI text (e.g., `Monkey D. Luffy`) |
| `description` | shared | Short summary |

### Optional (shared)

| Field | Source | Notes |
|-------|--------|-------|
| `aliases` | shared | Alternate names |
| `tags` | shared | Loose categorizations |
| `status` | shared | Lifecycle (e.g., `active`, `deceased`) |
| `imageKey` | shared | Equals `id` by default |
| `notes` | shared | Maintainer notes, not rendered |
| `metadata` | shared | Reserved flexible data |
| `createdAt` / `updatedAt` | shared | Optional timestamps |

---

## 4. Character-Specific Fields

Fields that genuinely belong to characters (all optional unless noted):

| Field | Type | Notes |
|-------|------|-------|
| `bounty` | number | Current bounty (pirates/wanted figures) — omit if none |
| `occupation` | string | e.g., `pirate`, `marine`, `doctor` |
| `role` | string | Crew/group role — e.g., `captain`, `swordsman`, `navigator` |
| `species` | string | e.g., `human`, `fish-man`, `minks` |
| `gender` | string | Free-form |
| `birthday` | string | e.g., `1997-05-05` (ISO date or known OP format) |
| `age` | number | Current age; may be omitted or `null` |
| `height` | string | e.g., `174cm` |
| `originLocationId` | string | Home location ID reference |
| `currentLocationId` | string | Where they currently are |
| `nicknames` | string[] | Informal titles (distinct from `aliases`) |
| `haki` | string[] | Haki types — e.g., `['observation', 'armament', 'conquerors']` |
| `devilFruitId` | string | ID reference to a Devil Fruit record |
| `weapons` | string[] | Weapon names or IDs |
| `fightingStyles` | string[] | e.g., `['rokushiki', 'swordsmanship']` |
| `voiceActors` | object | Optional — `{ japanese, english }` names |
| `quotes` | string[] | Optional — notable lines, e.g., `["A memorable line."]` |
| `appearanceVariations` | object[] | Optional — visual variants, e.g., `[{ displayName: 'Pre-Timeskip', imageKey: 'monkey-d-luffy-pretimeskip' }]` |
| `firstAppearance` | object | Optional — `{ arcId, chapter, episode }` |
| `latestAppearance` | object | Optional — same shape |

> `species`, `gender`, `birthday`, `age`, `height` are descriptive facts — optional, not required.

---

## 5. Relationship Fields (ID References Only)

**Never embed complete objects.** Every relationship is an ID reference.

| Field | References |
|-------|-----------|
| `crewIds` | Crew/faction IDs |
| `locationIds` | Location IDs |
| `arcIds` | Arc IDs |
| `battleIds` | Battle IDs |
| `shipIds` | Ship IDs |
| `fruitId` | Devil Fruit ID (singular — one fruit per character) |
| `mentorIds` | Character IDs |
| `rivalIds` | Character IDs |
| `familyIds` | Character IDs |

Documented how relationships work — **no relationship logic implemented**.

---

## 6. Achievement Structure (Future)

Plan support for future achievements — structure only, nothing populated:

```
achievements: [
  {
    id: 'title-earned',        // stable kebab-case ID
    displayName: 'Title Earned',
    description: 'Short description', // optional
    arcId: 'marineford',       // optional — where it happened
    year: '1516',              // optional — in-world date
    type: 'title' | 'victory' | 'territory' | 'kingdom' | 'accomplishment'
  }
]
```

Achievement types planned: **defeated enemies · territories conquered · kingdoms ruled · titles earned · major accomplishments**. Not populated.

---

## 7. Power Information (References Only)

No detailed power databases here. The character schema **references** powers:

- **Haki** → `haki: string[]` (e.g., `['armament']`)
- **Devil Fruit** → `devilFruitId` (points to a future fruit record)
- **Combat style** → `fightingStyles: string[]`
- **Weapons** → `weapons: string[]`

Power details live in future specialized schemas (Phase 2J Devil Fruit, etc.).

---

## 8. Image Strategy

Character records carry **`imageKey`** only:

```js
imageKey: 'monkey-d-luffy'   // equals id by default
```

- ❌ Never hardcode `.png`, `.webp`, `.jpg`
- ❌ Never absolute URLs
- Image resolution (key → asset file → placeholder) is a **later phase**

---

## 9. Optional Fields (Explicit)

Characters are NOT required to have every field. Common optional-only fields:

```
voiceActors · aliases · quotes · notes · appearance variations
```

(Full optional list is the union of shared optional fields + character-specific optional fields above.)

---

## 10. Spoiler Safety (Schema Support Only)

The schema supports future spoiler differentiation — **no filtering implemented**.

Planned field: `spoilerLevel`

| Level | Meaning | Example content |
|-------|---------|-----------------|
| `basic` | Public knowledge | Name, role, occupation |
| `advanced` | Deeper lore | Devil fruit details, crew history |
| `late` | Late-story reveals | True lineage, end-of-arc identity |

Implementation (filtering UI, gating) belongs to a future phase — the schema simply allows the field.

---

## 11. Sample Character (ONE — Validation Only)

Exactly ONE sample, to validate the schema. This is documentation, NOT the character database.

```js
// Monkey D. Luffy — validates the schema for a pirate archetype
{
  id: 'monkey-d-luffy',
  displayName: 'Monkey D. Luffy',
  description: 'Captain of the Straw Hat Pirates, aiming to become the Pirate King.',
  // shared optional
  aliases: ['Straw Hat Luffy'],
  tags: ['pirate', 'captain', 'yonko'],
  status: 'active',
  imageKey: 'monkey-d-luffy',
  // character-specific
  bounty: 3000000000,
  occupation: 'pirate',
  role: 'captain',
  species: 'human',
  gender: 'male',
  birthday: '1997-05-05',
  age: 19,
  height: '174cm',
  originLocationId: 'foosha-village',
  currentLocationId: null, // unknown — omitted when not set, never a placeholder string
  nicknames: ['Straw Hat'],
  haki: ['observation', 'armament', 'conquerors'],
  devilFruitId: 'gomu-gomu-no-mi',
  weapons: [],
  fightingStyles: ['gum-gum techniques'],
  // relationships
  crewIds: ['straw-hat-pirates'],
  locationIds: ['east-blue'],
  arcIds: ['marineford'],
  battleIds: ['marineford-war'],
  shipIds: ['thousand-sunny'],
  mentorIds: ['silvers-rayleigh'],
  rivalIds: [],
  familyIds: ['monkey-d-dragon'],
  // spoiler safety
  spoilerLevel: 'late',
  // optional
  voiceActors: { japanese: 'Mayumi Tanaka', english: 'Colleen Clinkenbeard' },
  notes: 'Sample record created in Phase 2E to validate the schema only.',
}
```

> This is the ONLY sample. No additional characters are created in this phase.

---

## 12. Schema Validation (Archetypes)

Verify the SAME schema represents diverse archetypes **without modification**:

| Archetype | Field usage (all within the one schema) |
|-----------|-----------------------------------------|
| **Pirate** | `bounty` set · `occupation: 'pirate'` · `crewIds` set · `devilFruitId` optional |
| **Marine** | `bounty` omitted · `occupation: 'marine'` · `crewIds` → marine faction ID |
| **Civilian** | `bounty` omitted · `occupation` e.g. `doctor` · `crewIds` empty/omitted · `haki` empty |
| **Historical figure** | `status: 'deceased'` · `voiceActors` omitted · `spoilerLevel: 'basic'` · `aliases` set |

✅ The schema represents all four archetypes with **zero modifications** — the same fields, different values. No refinement needed.

---

## 13. Future Extension Points

- `metadata` (shared) — flexible container for future tooling data
- `achievements` — extensible typed structure
- `spoilerLevel` — future spoiler filtering
- Character datasets arrive in Phase 2M (sample integrated dataset) — NOT now
