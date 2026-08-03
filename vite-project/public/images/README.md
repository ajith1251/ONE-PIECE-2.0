# Universal Asset System — `public/images/`

> **Created**: 2026-08-04 (Phase 3A)
> **Status**: FOUNDATION — architecture only. Runtime image loading is NOT implemented.
> **Scope**: Every image used by One Piece 2.0 will eventually live in this tree. This file is the single source of truth for asset organization, naming, ownership, replacement, and migration.

---

## 1. Image-First Principle (PERMANENT PROJECT RULE)

The project priority order is **IMAGES → CONTENT → LAYOUT → INTERACTION → ANIMATION**.

Every entity in the data layer references artwork through **`imageKey`** ONLY.

- ✅ `imageKey` — a stable identifier, normally equal to the entity `id` (e.g., `monkey-d-luffy`)
- ❌ **NEVER** an image path (no `public/...`, no `/images/...`)
- ❌ **NEVER** an absolute URL
- ❌ **NEVER** a hardcoded extension (no `monkey-d-luffy.png` inside data)

Artwork resolution (`imageKey` → asset file → placeholder fallback) is a FUTURE phase. This phase creates the architecture and the rules; it implements NO runtime loading.

---

## 2. Universal Asset Directory Structure

```
public/images/
├── characters/   (entity artwork)
├── locations/    (entity artwork)
├── arcs/         (entity artwork)
├── crews/        (entity artwork)
├── ships/        (entity artwork)
├── battles/      (entity artwork)
├── powers/       (entity artwork — Devil Fruits, Haki, combat styles)
├── timeline/     (timeline / history artwork)
└── shared/       (fallbacks, generic artwork, logos, icons)
```

Existing production assets (`img1.png`–`img10.png`) remain at `public/images/` ROOT for now. They are NOT migrated and NOT renamed during Phase 3A.

> **Note on `powers/`**: the corresponding data folder is `src/data/fruits/` (its schema `power-schema.md` covers Devil Fruits, Haki, combat styles, weapons). The asset folder is named `powers/` to match the universal power concept; artwork inside follows the power entity ID convention.

> **Note on `events/`**: there is no dedicated `events/` asset folder yet. Rare event artwork belongs in `shared/` until a dedicated folder is justified by the dataset.

---

## 3. Directory Responsibilities

| Folder | Contains | Examples (future) |
|--------|----------|-------------------|
| `characters/` | Character artwork only | `monkey-d-luffy.*`, `roronoa-zoro.*` |
| `locations/` | Location/island/kingdom/sea artwork only | `alabasta.*`, `marineford.*`, `wano.*` |
| `arcs/` | Arc/saga key-art only | `marineford-arc.*`, `wano-arc.*` |
| `crews/` | Crew/faction emblem or artwork only | `straw-hat-pirates.*`, `red-hair-pirates.*` |
| `ships/` | Ship artwork only | `going-merry.*`, `thousand-sunny.*` |
| `battles/` | Battle artwork only | `marineford-war.*` |
| `powers/` | Devil Fruit / Haki / power artwork only | `gomu-gomu-no-mi.*` |
| `timeline/` | Timeline, era, and historical artwork | era banners, timeline key-art |
| `shared/` | Fallback images, generic artwork, logos, icons — art that is NOT owned by one entity | placeholder, crew-generic, site logo |

Rule: **one folder, one concern.** An asset belongs to exactly one folder. If art serves the whole project (logos, fallbacks, generics) it belongs in `shared/`, never duplicated.

---

## 4. Future File Naming Convention (PERMANENT)

Every asset file is named after its owning entity ID (the Universal Entity ID Convention, `src/data/shared/entity-ids.md`):

```
monkey-d-luffy.*
roronoa-zoro.*
going-merry.*
thousand-sunny.*
marineford.*
wano.*
egghead.*
gomu-gomu-no-mi.*
marineford-arc.*
```

Rules:

- Filename base = entity `id` (lowercase, kebab-case, globally unique). `imageKey` = entity id.
- The `.*` means **any supported format** — the file name never encodes a required extension.
- No version suffixes (`-v2`, `-final`), no spaces, no display names as filenames.

### Supported Formats (browser-compatible)

| Format | Allowed? | Notes |
|--------|----------|-------|
| PNG | ✅ | Primary raster format |
| JPG / JPEG | ✅ | Large photographic art |
| WEBP | ✅ | Modern compressed raster |
| AVIF | ✅ | Modern compressed raster |
| GIF | ✅ | Animation (use sparingly) |
| SVG | ⚠️ Appropriate only | Icons, logos, emblems — NOT entity artwork |
| MP4 / WebM | ⚠️ Video | Lives in `public/video/`, not `public/images/` |

The system must never require one specific extension — any supported format is a valid representation of the same asset.

---

## 5. Image Replacement Philosophy (PERMANENT RULE)

**Artwork must be replaceable by replacing the asset file only.**

- The user improves art → replace `public/images/characters/monkey-d-luffy.webp` (or add a new supported format of the same name) → the interface reflects the new art.
- **React components must NEVER require modification because artwork changes.**
- Components reference the entity ID / `imageKey`, never a specific file, extension, or format.

This rule is the reason data never stores paths or extensions. Components stay dumb; assets stay swappable.

---

## 6. Placeholder Strategy (Future Behavior)

Documented behavior for when artwork is missing — NOT implemented in this phase:

- The application MUST continue functioning when an asset file is absent.
- An entity MAY exist with a placeholder (e.g., styled monogram / silhouette) until a real asset is manually added.
- Missing artwork must NEVER prevent entity creation, page rendering, or navigation.
- Placeholder components are a FUTURE deliverable. Do not build them in this phase.

---

## 7. Asset Ownership (PERMANENT)

- **Each asset belongs to exactly one entity.** One entity → one imageKey → zero or more asset files in its folder.
- **Never duplicate identical artwork across folders.** If multiple entities share art, it is either a real shared asset → `shared/`, or each entity is genuinely distinct.
- A single entity MAY have multiple formats (e.g., `monkey-d-luffy.png` + `monkey-d-luffy.webp`); the resolver picks the best available. This is still ONE asset (one imageKey).
- Ownership is decided by the data layer (the entity's `imageKey`), never by a component.

---

## 8. Migration Strategy (Existing Assets → Future Naming)

Current legacy state:

```
public/images/img1.png … img10.png   ← crew portraits, numeric names, referenced by Section1.jsx
```

Future target:

```
public/images/img1.png       ↓ (not this phase)
public/images/characters/monkey-d-luffy.*
```

**Explicitly OUT OF SCOPE for Phase 3A** — do NOT rename, move, or delete:

- `img1.png`–`img10.png` (production assets referenced by Section1)
- `public/icons.svg` (orphan — deletion is a future housekeeping phase)
- Any `src/assets/` file

Planned migration order (future phase): map each numeric image → owning entity → rename to `imageKey.*` → move into the correct folder → update the referencing component in the same phase as the resolver, with graceful fallback, so the UI never breaks. A later phase prepares the mapping and the entity-to-file-name reference list.

---

## 9. Future Asset Resolver (Documented Responsibilities Only)

A future `imageResolver` (e.g., `src/lib/imageResolver.js`) will:

1. **Accept an `imageKey`** (plus optional size/variant hints).
2. **Locate the asset** in the owning folder across supported formats (`characters/monkey-d-luffy.{png,jpg,jpeg,webp,avif,gif}`) — or via a build-time manifest.
3. **Return the best available asset** (preferred format order, respecting any size variants).
4. **Gracefully handle missing assets** — return the placeholder fallback from `shared/`, never throw, never block rendering.

It is NOT implemented in this phase. It must never receive hardcoded paths, extensions, or URLs from components or data.

---

## 10. Relationship to the Data Layer

- Data entities expose `imageKey` (= entity `id`). See `src/data/shared/entity-metadata.md` (§5 Image Metadata).
- `imageKey` values are globally unique because entity IDs are globally unique (`src/data/shared/entity-ids.md`), so an `imageKey` maps to exactly one asset folder entry.
- The future resolver is the ONLY code that translates `imageKey` → file path. No other layer should.

---

## 11. Protected Systems & Non-Goals (Phase 3A)

| System | Status |
|--------|--------|
| Hero (video, quotes, scenes, scroll indicator, layout) | 🔒 LOCKED — untouched |
| Navbar | ✅ Protected — untouched |
| Section1 (crew cards, `img1`–`img10` references) | ✅ Protected — untouched |
| `src/data/heroQuotes.js` | 🔒 LOCKED — untouched |
| `img1.png`–`img10.png` | ✅ Untouched (no migration/rename this phase) |

**Non-goals**: no runtime image loading, no placeholder components, no image resolver, no asset migration, no file renames, no new images, no component changes.

---

## 12. Validation of This Phase

- `npm run verify` — data layer unchanged (0 errors, 0 warnings expected)
- `npm run lint` — passes
- `npm run build` — passes
- No tests exist in the project (documented in Phase 2A); none run.

---

## What does NOT belong here

- Video files (→ `public/video/`)
- Component source, styling, or data modules (→ `src/`)
- Any duplicate copy of an asset owned by an entity (→ owning folder only)
