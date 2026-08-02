# Battle Schema Foundation — One Piece 2.0

> **Created**: 2026-08-01 (Phase 2I)
> **Status**: SCHEMA — defines the shape of every future battle record
> **Extends**: `../shared/entity-metadata.md` (Shared Entity Metadata, Phase 2D)
> **IDs follow**: `../shared/entity-ids.md` (Universal Entity ID Convention, Phase 2C)

---

## 1. Objective

Define ONE reusable schema that represents **every** type of One Piece battle:

```
One-on-One Duels · Crew Battles · Marine Battles · War-Scale Conflicts
Historical Battles
```

One schema works for all — no per-type variants, no forks.

---

## 2. Design Principles

The schema is:

- **reusable** — one shape for every battle type
- **extensible** — future fields can be added without breaking existing records
- **relationship-driven** — related entities referenced by ID, never embedded
- **image-first** — artwork referenced by `imageKey`, never hardcoded paths
- **timeline-ready** — every battle can later connect to chronology navigation
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
| `id` | shared | Convention-compliant, immutable (e.g., `marineford-war`, `luffy-vs-kaido`) |
| `displayName` | shared | UI text (e.g., `Marineford War`) |
| `description` | shared | Short summary |

### Optional (shared)

| Field | Source | Notes |
|-------|--------|-------|
| `aliases` | shared | Alternate names |
| `tags` | shared | Loose categorizations |
| `status` | shared | Lifecycle (e.g., `historic`, `concluded`) |
| `imageKey` | shared | Equals `id` by default |
| `notes` | shared | Maintainer notes, not rendered |
| `metadata` | shared | Reserved flexible data |
| `createdAt` / `updatedAt` | shared | Optional timestamps |

---

## 4. Battle-Specific Fields

Fields that genuinely belong to battles (all optional unless noted):

| Field | Type | Notes |
|-------|------|-------|
| `battleType` | string | e.g., `duel`, `crew-battle`, `marine-battle`, `war`, `historical` |
| `locationId` | string | Location ID where the battle took place |
| `arcId` | string | Arc ID the battle occurs within |
| `participantIds` | string[] | Character IDs directly involved (duelists, commanders) |
| `winningSide` | string | ID or label of the winning side (character/crew/faction ID or `null`) |
| `losingSide` | string | ID or label of the losing side |
| `outcome` | string | Optional — narrative description of the result |
| `duration` | string | Optional — length of the battle, e.g., `3 days`, `hours` |
| `significance` | string | Optional — why the battle matters to the wider story |
| `casualties` | string | Optional — notable losses / death toll description |
| `timelineOrder` | number | Optional — position within the overall timeline of events |

> `battleType` is the single most important discriminator; `participantIds` + `locationId` + `arcId` anchor the battle in the world. Everything else is optional per battle.

---

## 5. Relationship Fields (ID References Only)

**Never embed complete objects.** Every relationship is an ID reference.

| Field | References |
|-------|-----------|
| `characterIds` | Character IDs involved (alias of `participantIds`) |
| `crewIds` | Crew/faction IDs that fought |
| `locationIds` | Location IDs where the battle occurred |
| `shipIds` | Ship IDs that participated |
| `eventIds` | Notable event IDs the battle is part of |
| `arcIds` | Arc IDs the battle belongs to |

Documented how relationships work — **no relationship logic implemented**.

> ⚠️ **Canonical field (Phase 2L)**: `participantIds` is the canonical participant list (per the Phase 2I spec). `characterIds` remains a relationship alias documented in `../shared/relationships.md` — future datasets MUST use `participantIds` and omit `characterIds` to avoid divergence.

---

## 6. Image Strategy

Battle records carry **`imageKey`** only:

```js
imageKey: 'marineford-war'   // equals id by default
```

Examples: `marineford-war`, `luffy-vs-kaido`.

- ❌ Never hardcode `.png`, `.webp`, `.jpg`
- ❌ Never absolute URLs
- Image resolution (key → asset file → placeholder) is a **later phase**

---

## 7. Timeline Readiness (Future)

Every battle can later connect to chronology navigation. **Documented only — no timeline functionality implemented.**

Planned timeline metadata:

| Field | Purpose |
|-------|---------|
| `arcId` | Anchoring the battle within its arc |
| `timelineOrder` | Position within the overall timeline of events |

Timeline navigation (before/after links, event ordering) is a future phase — the schema simply allows the fields.

---

## 8. Spoiler Readiness (Schema Support Only)

The schema supports future spoiler differentiation — **no filtering implemented**.

Planned field: `spoilerLevel`

| Level | Meaning | Example content |
|-------|---------|-----------------|
| `basic` | Public knowledge | Battle name, battle type, location |
| `advanced` | Deeper lore | Outcome, participants, significance |
| `late` | Late-story reveals | Post-battle consequences, hidden motivations |

> Uses the SAME levels (`basic`/`advanced`/`late`) as the Character (2E), Location (2F), Arc (2G), and Crew (2H) schemas for consistency. Implementation (filtering UI, gating) belongs to a future phase — the schema simply allows the field.

---

## 9. Optional Fields (Explicit)

Battles are NOT required to have every field. Common optional-only fields:

```
summary · notes · keyMoments · importantQuotes · futureConsequences
```

| Field | Notes |
|-------|-------|
| `summary` | Longer narrative recap beyond `description` |
| `keyMoments` | Turning points / defining beats (free-form or structured list) |
| `importantQuotes` | Notable lines from the battle |
| `futureConsequences` | What the battle caused afterward |

---

## 10. Sample Battle (ONE — Validation Only)

Exactly ONE sample, to validate the schema. This is documentation, NOT the battle database.

```js
// Marineford War — validates the schema for a war-scale conflict archetype
{
  id: 'marineford-war',
  displayName: 'Marineford War',
  description: 'The all-out war between the Whitebeard Pirates and the Marines over the execution of Portgas D. Ace.',
  // shared optional
  aliases: ['The Paramount War'],
  tags: ['war', 'marineford', 'paramount-war-saga'],
  status: 'historic',
  imageKey: 'marineford-war',
  // battle-specific
  battleType: 'war',
  locationId: 'marineford',
  arcId: 'marineford',
  participantIds: ['edward-newgate', 'monkey-d-luffy', 'portgas-d-ace', 'akainu', 'sengoku'],
  winningSide: 'marines',
  losingSide: 'whitebeard-pirates',
  outcome: 'Ace is executed; Whitebeard falls; the war reshapes the world balance of power.',
  duration: 'less than a day',
  significance: 'Ends the pre-timeskip era and triggers the two-year timeskip.',
  casualties: 'Portgas D. Ace and Edward Newgate die; heavy losses on both sides.',
  timelineOrder: 26,
  // relationships
  characterIds: ['monkey-d-luffy', 'portgas-d-ace', 'edward-newgate'],
  crewIds: ['whitebeard-pirates', 'straw-hat-pirates', 'marines'],
  locationIds: ['marineford'],
  shipIds: ['moby-dick', 'thousand-sunny'],
  eventIds: ['ace-execution'],
  arcIds: ['marineford'],
  // spoiler safety
  spoilerLevel: 'advanced',
  // optional
  summary: 'Whitebeard and his allied fleet clash with the Marine Headquarters to rescue Ace.',
  keyMoments: ['Ace\'s release and re-capture', 'Whitebeard\'s final stand', 'Shanks\'s arrival ending the war'],
  importantQuotes: ['The One Piece is real.'],
  futureConsequences: 'The war paves the way for the worst generation and the two-year timeskip.',
  notes: 'Sample record created in Phase 2I to validate the schema only.',
}
```

> This is the ONLY sample. No additional battles are created in this phase.

---

## 11. Schema Validation (Archetypes)

Verify the SAME schema represents diverse archetypes **without structural changes**:

| Archetype | Field usage (all within the one schema) |
|-----------|-----------------------------------------|
| **Duel** | `battleType: 'duel'` · `participantIds` = two characters · `locationId` set · `arcId` set |
| **Crew battle** | `battleType: 'crew-battle'` · `participantIds` set · `crewIds` = two crews · `shipIds` optional |
| **War** | `battleType: 'war'` · large `crewIds` set · `casualties` set · `timelineOrder` set |
| **Historical conflict** | `battleType: 'historical'` · `status: 'historic'` · `winningSide`/`losingSide` set · `spoilerLevel: 'basic'` |

✅ The schema represents all four archetypes with **zero structural changes** — the same fields, different values. No refinement needed.

---

## 12. Future Extension Points

- `metadata` (shared) — flexible container for future tooling data
- `arcId` / `timelineOrder` — timeline & arc navigation (future)
- `keyMoments` / `importantQuotes` / `futureConsequences` — growing content without structural change
- `spoilerLevel` — future spoiler filtering
- Battle datasets arrive in Phase 2M (sample integrated dataset) — NOT now
