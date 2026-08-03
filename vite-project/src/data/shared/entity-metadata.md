# Shared Entity Metadata & Schema Foundation — One Piece 2.0

> **Created**: 2026-08-01 (Phase 2D)
> **Status**: FOUNDATION — every future entity schema extends this
> **Scope**: Characters, locations, arcs, battles, crews, ships, Devil Fruits, events, timeline, mysteries

---

## 1. Design Principle

**NO giant master object.** Each entity type gets its own specialized schema (in its own `src/data/<type>/` folder) that **extends** this lightweight shared metadata layer.

- The shared layer contains ONLY properties common across **many** entity types.
- It stays **generic** — no character-specific, location-specific, or arc-specific fields.
- Specialized schemas (Phase 2E+) add their own fields on top.
- This keeps every schema readable and avoids a monolithic shape.

```
Shared Metadata (this file)
        │  extended by
        ▼
Character schema · Location schema · Arc schema · Battle schema · …
```

---

## 2. Required Fields (Minimum Set)

Every future entity MUST include these. The set is intentionally small.

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | Universal Entity ID Convention (see `entity-ids.md`) — lowercase kebab-case, immutable |
| `displayName` | string | Human-readable name shown in UI — never the raw ID |
| `description` | string | Short summary of the entity |

Nothing else is required at the shared layer.

---

## 3. Optional Fields

Future entities SHOULD NOT be forced to include these. Include only what applies.

| Field | Type | Notes |
|-------|------|-------|
| `aliases` | string[] | Alternate names (see Alias Strategy) |
| `tags` | string[] | Loose categorizations (see Tag Strategy) |
| `status` | string | Lifecycle state (see Status Strategy) |
| `imageKey` | string | Artwork reference — equals `id` by default (see Image Metadata) |
| `notes` | string | Maintainer notes, not rendered in UI (see Notes Strategy) |
| `metadata` | object | Flexible extra data for future tooling (see below) |
| `createdAt` | string | Optional creation timestamp (ISO date) |
| `updatedAt` | string | Optional last-modified timestamp (ISO date) |

### The `metadata` field

A reserved generic object for future tooling data (sources, citations, internal flags). Intentionally loosely specified — specialized schemas decide their own contents.

---

## 4. What Must NOT Appear in the Shared Layer

These are **entity-specific** fields. They belong in specialized schemas, NOT here:

```
bounty      crew        devilFruit   captain     ship
location    arc         battle       power       haki
episode     kingdom     island
```

A shared entity type must never reference them — doing so breaks the "generic" principle.

---

## 5. Image Metadata

The shared layer references artwork by **`imageKey`** only.

- ✅ `imageKey` — a stable identifier (normally equal to the entity `id`)
- ❌ NOT an image path
- ❌ NOT a hardcoded extension
- ❌ NOT an absolute URL

Image **loading** (resolving `imageKey` → actual asset file → placeholder fallback) belongs to a future phase — never implemented here.

> **Permanent rule (Phase 3A)**: The project is **image-first**. Data entities reference `imageKey` only — never an image path, never a hardcoded extension, never an absolute URL. The Universal Asset System (directory structure, naming, replacement/placeholder/migration rules, future resolver) is documented in **`public/images/README.md`**. Artwork must be replaceable by replacing the asset file without changing components.

---

## 6. Tag Strategy (Concept Only)

Tags are optional, loose categorizations. They are **documented as a concept** — no large tag lists are populated here.

Potential future examples (illustrative only):

```
pirate · marine · yonko · east-blue · villain · captain · doctor · navigator
```

- Tags are free-form strings at the shared layer.
- Specialized schemas MAY define curated tag sets.
- No filtering logic exists or is planned at this layer.

---

## 7. Status Strategy (Concept Only)

Optional lifecycle state, expressed as a plain string. Documented as a concept only.

Potential values (illustrative):

```
active · inactive · unknown · historic · deceased
```

- No validation enum is enforced at the shared layer.
- No filtering logic is implemented.

---

## 8. Alias Strategy (Concept Only)

Many One Piece entities have multiple names. The shared layer supports an optional `aliases` array.

Illustrative examples:

```
Gold Roger  →  Gol D. Roger
Whitebeard  →  Edward Newgate
```

- This is metadata only — no search/alias-resolution implementation.
- The canonical name lives in `displayName`; alternates live in `aliases`.

---

## 9. Notes Strategy (Concept Only)

Optional free-text `notes` for **future maintainers**.

- Not intended to be rendered directly in the UI.
- Use for context, source hints, or data-quality remarks.

---

## 10. Relationship Placeholders

Specialized schemas may include relationship fields — **placeholders only**, never implemented here.

Planned reference shapes (IDs only, per the Universal Entity ID Convention):

```
characterIds   → array of character IDs
locationIds    → array of location IDs
battleIds      → array of battle IDs
crewIds        → array of crew/faction IDs
devilFruitIds → array of Devil Fruit IDs
shipIds        → array of ship IDs
```

The shared layer expects every reference to use **entity IDs** — never display names, never raw filenames, never URLs.

---

## 11. Inheritance & Extension Strategy

Future schema phases (2E → 2K) will:

1. Define a specialized schema file in their own folder (e.g., `characters/schema.md` or data modules).
2. Extend the shared layer: include the required fields (`id`, `displayName`, `description`) and any relevant optional fields.
3. Add entity-specific fields (e.g., `bounty`, `crew` for characters) alongside.
4. Keep the shared layer untouched — additions live in the specialized schema.

---

## 12. Example (Documentation Only)

Illustrative shape — NOT a real dataset, NOT production content. Uses a **generic placeholder** so no real entity content ever appears in the shared layer:

```js
// Conceptual shared metadata shape (extends nothing; base of every entity)
{
  id: 'example-entity',        // required — convention-compliant placeholder
  displayName: 'Example Entity', // required — UI text, never the raw ID
  description: 'A short summary of the entity.', // required
  aliases: ['Alternate Name'],  // optional
  tags: ['tag-a', 'tag-b'],     // optional
  status: 'active',             // optional
  imageKey: 'example-entity',   // optional — equals id by default
  notes: 'Maintainer notes — not rendered in UI.', // optional
  // metadata: {}, createdAt: '...', updatedAt: '...' — optional
}
```

> This is a SHAPE illustration only. No real entity content exists in the shared layer — specialized schemas (Phase 2E+) own their entity content.
