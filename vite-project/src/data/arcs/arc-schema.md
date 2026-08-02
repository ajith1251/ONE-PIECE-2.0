# Arc Schema Foundation — One Piece 2.0

> **Created**: 2026-08-01 (Phase 2G)
> **Status**: SCHEMA — defines the shape of every future arc record
> **Extends**: `../shared/entity-metadata.md` (Shared Entity Metadata, Phase 2D)
> **IDs follow**: `../shared/entity-ids.md` (Universal Entity ID Convention, Phase 2C)

---

## 1. Objective

Define ONE reusable schema that represents **every** type of One Piece arc:

```
Introductory Arcs · Major Saga Arcs · War Arcs · Training Arcs
Flashback Arcs · Transitional Arcs
```

One schema works for all — no per-type variants, no forks.

---

## 2. Design Principles

The schema is:

- **reusable** — one shape for every arc type
- **extensible** — future fields can be added without breaking existing records
- **relationship-driven** — related entities referenced by ID, never embedded
- **image-first** — artwork referenced by `imageKey`, never hardcoded paths
- **timeline-ready** — every arc can later connect to chronology navigation
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
| `id` | shared | Convention-compliant, immutable (e.g., `marineford`, `east-blue`) |
| `displayName` | shared | UI text (e.g., `Marineford`, `Alabasta`) |
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

## 4. Arc-Specific Fields

Fields that genuinely belong to arcs (all optional unless noted):

| Field | Type | Notes |
|-------|------|-------|
| `sagaId` | string | Saga / saga-group ID reference (e.g., `paramount-war-saga`, `water-7-saga`) |
| `arcNumber` | number | Position within the story's canonical numbering |
| `chronologicalOrder` | number | Position in chronological order (may differ from release order for flashbacks) |
| `arcType` | string | e.g., `introductory`, `saga`, `war`, `training`, `flashback`, `transitional` |
| `animeEpisodeRange` | object | Optional — `{ start, end }` episode numbers |
| `mangaChapterRange` | object | Optional — `{ start, end }` chapter numbers |
| `duration` | string | Optional — approximate length descriptor, e.g., `2 years` (in-world time) |
| `overview` | string | Optional — longer narrative summary beyond `description` |
| `centralConflict` | string | Optional — the core conflict of the arc |
| `outcome` | string | Optional — how the arc resolves / what changes |
| `significance` | string | Optional — why the arc matters to the wider story |
| `recommendedViewingOrder` | string | Optional — human note about ideal watch/read order relative to other arcs |

> `arcType` is a useful discriminator; `sagaId` + `arcNumber` + `chronologicalOrder` form the backbone of timeline placement. Everything else is optional per arc.

---

## 5. Relationship Fields (ID References Only)

**Never embed complete objects.** Every relationship is an ID reference.

| Field | References |
|-------|-----------|
| `characterIds` | Character IDs that appear in this arc |
| `locationIds` | Location IDs where the arc takes place |
| `battleIds` | Battle IDs that occur in this arc |
| `crewIds` | Crew/faction IDs central to this arc |
| `eventIds` | Notable event IDs that occur in this arc |
| `shipIds` | Ship IDs that play a role in this arc |

Documented how relationships work — **no relationship logic implemented**.

---

## 6. Image Strategy

Arc records carry **`imageKey`** only:

```js
imageKey: 'marineford'   // equals id by default
```

Examples: `east-blue`, `alabasta`, `skypiea`, `water-7`, `marineford`, `dressrosa`, `whole-cake-island`, `wano`, `egghead`.

- ❌ Never hardcode `.png`, `.webp`, `.jpg`
- ❌ Never absolute URLs
- Image resolution (key → asset file → placeholder) is a **later phase**

---

## 7. Timeline Readiness (Future)

Every arc can later connect to chronology navigation. **Documented only — no timeline functionality implemented.**

Planned timeline metadata:

| Field | Purpose |
|-------|---------|
| `sagaId` | Grouping into a saga |
| `arcNumber` | Canonical story position |
| `chronologicalOrder` | True chronological position (flashbacks reorder relative to release) |
| `previousArcId` | Arc ID before this one (chronologically) |
| `nextArcId` | Arc ID after this one (chronologically) |

Timeline navigation (previous/next links, saga grouping) is a future phase — the schema simply allows the fields.

---

## 8. Spoiler Readiness (Schema Support Only)

The schema supports future spoiler differentiation — **no filtering implemented**.

Planned field: `spoilerLevel`

| Level | Meaning | Example content |
|-------|---------|-----------------|
| `basic` | Public knowledge | Arc name, setting, arc type |
| `advanced` | Deeper lore | Central conflict, outcome |
| `late` | Late-story reveals | Post-arc consequences, hidden resolutions |

> Uses the SAME levels (`basic`/`advanced`/`late`) as the Character (2E) and Location (2F) schemas for consistency. Implementation (filtering UI, gating) belongs to a future phase — the schema simply allows the field.

---

## 9. Optional Fields (Explicit)

Arcs are NOT required to have every field. Common optional-only fields:

```
aliases · notes · trivia · watchOrderNotes · readingOrderNotes
```

| Field | Notes |
|-------|-------|
| `trivia` | Lightweight fun facts / background |
| `watchOrderNotes` | Human note about where this arc sits in watch order |
| `readingOrderNotes` | Human note about where this arc sits in reading order |

---

## 10. Sample Arc (ONE — Validation Only)

Exactly ONE sample, to validate the schema. This is documentation, NOT the arc database.

```js
// Marineford — validates the schema for a large war arc archetype
{
  id: 'marineford',
  displayName: 'Marineford',
  description: 'The climactic war between the Whitebeard Pirates and the Marines over the execution of Portgas D. Ace.',
  // shared optional
  aliases: ['The Paramount War'],
  tags: ['war', 'paramount-war-saga', 'marineford'],
  status: 'historic',
  imageKey: 'marineford',
  // arc-specific
  sagaId: 'paramount-war-saga',
  arcNumber: 26,
  chronologicalOrder: 26,
  arcType: 'war',
  animeEpisodeRange: { start: 457, end: 489 },
  mangaChapterRange: { start: 553, end: 580 },
  duration: 'a few days',
  overview: 'The Whitebeard Pirates launch an all-out assault on Marine Headquarters to rescue Portgas D. Ace.',
  centralConflict: 'Marines vs. Whitebeard Pirates (and allies) over Ace\'s execution.',
  outcome: 'Ace is executed; Whitebeard falls; the war reshapes the balance of power in the world.',
  significance: 'Ends the pre-timeskip era and triggers the two-year timeskip.',
  recommendedViewingOrder: 'Watch after Impel Down and before the Post-War arc.',
  // relationships
  characterIds: ['monkey-d-luffy', 'portgas-d-ace', 'edward-newgate'],
  locationIds: ['marineford'],
  battleIds: ['marineford-war'],
  crewIds: ['whitebeard-pirates', 'straw-hat-pirates'],
  eventIds: ['ace-execution'],
  shipIds: ['moby-dick', 'thousand-sunny'],
  // timeline readiness (documented, not implemented)
  previousArcId: 'impel-down',
  nextArcId: 'post-war',
  // spoiler safety
  spoilerLevel: 'advanced',
  // optional
  notes: 'Sample record created in Phase 2G to validate the schema only.',
}
```

> This is the ONLY sample. No additional arcs are created in this phase.

---

## 11. Schema Validation (Archetypes)

Verify the SAME schema represents diverse archetypes **without structural changes**:

| Archetype | Field usage (all within the one schema) |
|-----------|-----------------------------------------|
| **Short introductory arc** | `arcType: 'introductory'` · short `animeEpisodeRange` · `centralConflict` simple · short `duration` |
| **Long major arc** | `arcType: 'saga'` · long `mangaChapterRange` / `animeEpisodeRange` · large `characterIds` set |
| **Flashback arc** | `arcType: 'flashback'` · `chronologicalOrder` reordered vs `arcNumber` · `sagaId` optional |
| **Large war arc** | `arcType: 'war'` · large `battleIds` set · `crewIds` (multiple factions) · `outcome` set |

✅ The schema represents all four archetypes with **zero structural changes** — the same fields, different values. No refinement needed.

---

## 12. Future Extension Points

- `metadata` (shared) — flexible container for future tooling data
- `sagaId` / `arcNumber` / `chronologicalOrder` / `previousArcId` / `nextArcId` — timeline & saga navigation (future)
- `spoilerLevel` — future spoiler filtering
- `trivia` / `watchOrderNotes` / `readingOrderNotes` — growing content without structural change
- Arc datasets arrive in Phase 2M (sample integrated dataset) — NOT now
