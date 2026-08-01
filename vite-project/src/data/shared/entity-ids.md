# Universal Entity ID Convention — One Piece 2.0

> **Created**: 2026-08-01 (Phase 2C)
> **Status**: CONVENTION — applies to ALL future One Piece entities
> **Stability**: Intended to remain stable for the lifetime of the project.

This document defines ONE universal identification system that every future entity follows: characters, locations, arcs, battles, crews, ships, Devil Fruits, events, timeline entries, and mysteries.

---

## 1. Universal Rules

Every entity ID MUST be:

| Rule | Requirement |
|------|-------------|
| **lowercase** | `a–z` only. No uppercase letters. |
| **kebab-case** | Words separated by a single hyphen `-`. No spaces, underscores, or camelCase. |
| **unique** | No two entities of the same type share an ID. |
| **stable** | The ID never changes once assigned to an entity. |
| **immutable once published** | After an entity ships, its ID is frozen forever. Changing it breaks references. |
| **independent from UI text** | The ID never depends on how the name is displayed, translated, or styled. |

**CRITICAL**: IDs are NEVER generated dynamically at runtime. They are authored, reviewed, and fixed at design time.

---

## 2. Display Name Separation

**ID ≠ Display Name.** These are two separate, independent fields.

| Field | Purpose | Example |
|-------|---------|---------|
| `id` | Stable machine identity | `monkey-d-luffy` |
| `displayName` | Human-readable text shown in the UI | `Monkey D. Luffy` |

Rules:
- **Future UI always displays `displayName`** — never the raw ID.
- **Relationships always reference `id`** — never the display name.
- A `displayName` may change (translation, formatting) without ever affecting the `id`.

---

## 3. Image Key Convention

`imageKey` normally **equals the entity ID**.

| Entity | `id` | `imageKey` |
|--------|------|------------|
| Monkey D. Luffy | `monkey-d-luffy` | `monkey-d-luffy` |
| Alabasta | `alabasta` | `alabasta` |

- The image key lets the (future) image resolver find artwork by a predictable name.
- Image loading is NOT implemented yet — convention only.

---

## 4. Future File Naming

Artwork for an entity uses the entity's ID as the base filename, with any supported browser format and NO fixed extension:

```
monkey-d-luffy.*
roronoa-zoro.*
alabasta.*
marineford.*
wano.*
egghead.*
```

Supported formats (browser-compatible): `.png`, `.webp`, `.jpg`, `.jpeg`, `.avif`, `.gif`

- No fixed extension — the resolver accepts whichever supported format exists.
- Missing artwork must never break the UI (placeholder state planned; not implemented).

---

## 5. Entity Examples (Documentation Only)

One canonical example per entity type. These are documentation examples — NOT production datasets.

| Type | `id` | `displayName` |
|------|------|---------------|
| Character | `monkey-d-luffy` | Monkey D. Luffy |
| Location | `alabasta` | Alabasta |
| Arc | `marineford` | Marineford |
| Crew | `straw-hat-pirates` | Straw Hat Pirates |
| Ship | `thousand-sunny` | Thousand Sunny |
| Battle | `marineford-war` | Marineford War |
| Devil Fruit | `gomu-gomu-no-mi` | Gomu Gomu no Mi |

---

## 6. Invalid ID Examples

The following patterns are **NOT** valid IDs. They exist to help future contributors stay consistent.

| Invalid | Why |
|---------|-----|
| `Luffy` | Uppercase + not kebab-case |
| `Monkey D Luffy` | Spaces + uppercase |
| `Monkey_D_Luffy` | Underscores |
| `MonkeyDLuffy` | camelCase / no separators |
| `IMG001` | Numeric artifact, no semantic meaning |
| `character1` | Generic index, not a stable name |

Valid alternative: `monkey-d-luffy`.

---

## 7. Future Relationships

Future relationship fields MUST reference entity IDs (never display names, never raw filenames).

Planned relationship field shapes (documented only — no logic implemented):

```
characterIds   → array of character IDs
locationIds    → array of location IDs
crewIds        → array of crew/faction IDs
battleIds      → array of battle IDs
shipIds        → array of ship IDs
fruitIds       → array of Devil Fruit IDs
```

Example (concept only):
```js
{
  id: 'straw-hat-pirates',
  displayName: 'Straw Hat Pirates',
  characterIds: ['monkey-d-luffy', 'roronoa-zoro'],
  shipIds: ['thousand-sunny'],
}
```

---

## 8. Summary

- IDs are `lowercase-kebab-case`, unique, stable, immutable once published, independent from UI text.
- IDs are authored, never generated at runtime.
- `id` (identity) and `displayName` (UI text) are separate fields.
- `imageKey` equals the entity ID; artwork files follow `entity-id.*`.
- Relationships reference IDs.
- When in doubt, use the examples above — and never invent a new naming pattern.
