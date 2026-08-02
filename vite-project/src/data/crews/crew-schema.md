# Crew & Faction Schema Foundation — One Piece 2.0

> **Created**: 2026-08-01 (Phase 2H)
> **Status**: SCHEMA — defines the shape of every future crew / faction record
> **Extends**: `../shared/entity-metadata.md` (Shared Entity Metadata, Phase 2D)
> **IDs follow**: `../shared/entity-ids.md` (Universal Entity ID Convention, Phase 2C)

---

## 1. Objective

Define ONE reusable schema that represents **every** type of One Piece organization:

```
Pirate Crews · Marine Organizations · Revolutionary Army · World Government
Kingdoms · Alliances · Temporary Alliances · Historical Factions
```

One schema works for all — no per-type variants, no forks.

---

## 2. Design Principles

The schema is:

- **reusable** — one shape for every crew / faction type
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
| `id` | shared | Convention-compliant, immutable (e.g., `straw-hat-pirates`, `marines`) |
| `displayName` | shared | UI text (e.g., `Straw Hat Pirates`) |
| `description` | shared | Short summary |

### Optional (shared)

| Field | Source | Notes |
|-------|--------|-------|
| `aliases` | shared | Alternate names |
| `tags` | shared | Loose categorizations |
| `status` | shared | Lifecycle (e.g., `active`, `historical`, `dissolved`) |
| `imageKey` | shared | Equals `id` by default |
| `notes` | shared | Maintainer notes, not rendered |
| `metadata` | shared | Reserved flexible data |
| `createdAt` / `updatedAt` | shared | Optional timestamps |

---

## 4. Crew / Faction-Specific Fields

Fields that genuinely belong to organizations (all optional unless noted):

| Field | Type | Notes |
|-------|------|-------|
| `organizationType` | string | e.g., `pirate-crew`, `marine`, `revolutionary`, `government`, `kingdom`, `alliance`, `temporary-alliance`, `historical` |
| `captainId` | string | Character ID of the leader who commands (pirates / crews) |
| `leaderIds` | string[] | Character IDs of the leadership group (captains, admirals, commanders) |
| `memberIds` | string[] | Character IDs of current core members |
| `shipIds` | string[] | Ship IDs associated with the organization |
| `territoryIds` | string[] | Location IDs controlled or claimed |
| `headquartersLocationId` | string | Location ID of the main base / HQ |
| `emblem` | string | Optional — free-form description of the Jolly Roger / insignia |
| `allegiance` | string | e.g., `pirates`, `marines`, `world-government`, `revolutionary`, `independent` |
| `foundedBy` | string | Optional — founder name or character ID note |
| `objective` | string | Optional — the organization's goal |
| `motto` | string | Optional — slogan / catchphrase |
| `affiliations` | string[] | Optional — loose affiliation labels (e.g., `yonko`, `shichibukai`) |

> `organizationType` is the single most important discriminator; `leaderIds`/`memberIds` carry the human structure. Everything else is optional per organization.

---

## 5. Relationship Fields (ID References Only)

**Never embed complete objects.** Every relationship is an ID reference.

| Field | References |
|-------|-----------|
| `characterIds` | Character IDs associated with the organization |
| `shipIds` | Ship IDs owned or used |
| `locationIds` | Location IDs connected to the organization |
| `battleIds` | Battle IDs the organization participated in |
| `arcIds` | Arc IDs where the organization is significant |
| `eventIds` | Notable event IDs involving the organization |

Documented how relationships work — **no relationship logic implemented**.

---

## 6. Image Strategy

Crew / faction records carry **`imageKey`** only:

```js
imageKey: 'straw-hat-pirates'   // equals id by default
```

Examples: `straw-hat-pirates`, `red-hair-pirates`, `marines`, `world-government`.

- ❌ Never hardcode `.png`, `.webp`, `.jpg`
- ❌ Never absolute URLs
- Image resolution (key → asset file → placeholder) is a **later phase**

---

## 7. Optional Fields (Explicit)

Organizations are NOT required to have every field. Common optional-only fields:

```
history · formerMembers · achievements · knownAllies · knownEnemies · notes
```

| Field | Notes |
|-------|-------|
| `history` | Free-form background narrative |
| `formerMembers` | Character ID references who left / are no longer members |
| `achievements` | Notable accomplishments (structure mirrors character achievements) |
| `knownAllies` | Free-form or ID-based allied groups (canonical affiliation via relationships) |
| `knownEnemies` | Free-form or ID-based enemy groups |
| `notes` | Maintainer notes (shared layer) |

---

## 8. Spoiler Readiness (Schema Support Only)

The schema supports future spoiler differentiation — **no filtering implemented**.

Planned field: `spoilerLevel`

| Level | Meaning | Example content |
|-------|---------|-----------------|
| `basic` | Public knowledge | Name, allegiance, organization type |
| `advanced` | Deeper lore | Membership details, objectives, alliances |
| `late` | Late-story reveals | Hidden affiliations, post-arc status |

> Uses the SAME levels (`basic`/`advanced`/`late`) as the Character (2E), Location (2F), and Arc (2G) schemas for consistency. Implementation (filtering UI, gating) belongs to a future phase — the schema simply allows the field.

---

## 9. Sample Organization (ONE — Validation Only)

Exactly ONE sample, to validate the schema. This is documentation, NOT the crew database.

```js
// Straw Hat Pirates — validates the schema for a pirate crew archetype
{
  id: 'straw-hat-pirates',
  displayName: 'Straw Hat Pirates',
  description: 'The pirate crew led by Monkey D. Luffy, bound for the journey to become the Pirate King.',
  // shared optional
  aliases: ['Straw Hats', 'Mugiwara Pirates'],
  tags: ['pirate-crew', 'protagonist-crew'],
  status: 'active',
  imageKey: 'straw-hat-pirates',
  // crew/faction-specific
  organizationType: 'pirate-crew',
  captainId: 'monkey-d-luffy',
  leaderIds: ['monkey-d-luffy'],
  memberIds: ['roronoa-zoro', 'nami', 'usopp', 'sanji', 'tony-tony-chopper', 'nico-robin', 'franky', 'brook', 'jinbe'],
  shipIds: ['going-merry', 'thousand-sunny'],
  territoryIds: ['fish-man-island'],
  headquartersLocationId: null, // ship-based crew — omitted when not set, never a placeholder string
  emblem: 'Straw Hat Jolly Roger',
  allegiance: 'pirates',
  foundedBy: 'Monkey D. Luffy',
  objective: 'To reach Laugh Tale and find the One Piece.',
  motto: 'Sailing with my crew to become the Pirate King.',
  affiliations: ['yonko'],
  // relationships
  characterIds: ['monkey-d-luffy', 'roronoa-zoro', 'nami'],
  shipIds: ['going-merry', 'thousand-sunny'],
  locationIds: ['east-blue'],
  battleIds: ['marineford-war'],
  arcIds: ['marineford'],
  eventIds: ['timeskip'],
  // spoiler safety
  spoilerLevel: 'basic',
  // optional
  history: 'Founded when Luffy departed Foosha Village and gathered his crew across the East Blue.',
  formerMembers: ['nefertari-vivi'],
  notes: 'Sample record created in Phase 2H to validate the schema only.',
}
```

> This is the ONLY sample. No additional crews or factions are created in this phase.

---

## 10. Schema Validation (Archetypes)

Verify the SAME schema represents diverse archetypes **without structural changes**:

| Archetype | Field usage (all within the one schema) |
|-----------|-----------------------------------------|
| **Pirate Crew** | `organizationType: 'pirate-crew'` · `captainId` set · `memberIds` set · `shipIds` set |
| **Marine Organization** | `organizationType: 'marine'` · `captainId` omitted · `leaderIds` → admirals · `allegiance: 'marines'` |
| **Government Organization** | `organizationType: 'government'` · `leaderIds` → Celestial Dragons / Gorosei · `headquartersLocationId` → Mary Geoise |
| **Revolutionary Group** | `organizationType: 'revolutionary'` · `allegiance: 'revolutionary'` · `leaderIds` set · `objective` set |

✅ The schema represents all four archetypes with **zero structural changes** — the same fields, different values. No refinement needed.

---

## 11. Future Extension Points

- `metadata` (shared) — flexible container for future tooling data
- `affiliations` / `knownAllies` / `knownEnemies` — expanding alliance web without structural change
- `formerMembers` — roster history
- `spoilerLevel` — future spoiler filtering
- Crew/faction datasets arrive in Phase 2M (sample integrated dataset) — NOT now
