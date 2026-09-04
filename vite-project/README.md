<p align="center">
  <br>
  <img src="public/favicon.svg" alt="One Piece 2.0 Logo" width="100" height="100">
  <br>
</p>

<h1 align="center">One Piece 2.0</h1>

<p align="center">
  <strong>An interactive fan-built exploration of the One Piece world</strong>
  <br>
  <sub>Characters · Arcs · Locations · Battles · Crews · Devil Fruits · Ships · Timeline</sub>
</p>

<p align="center">
  <a href="#preview">Preview</a> ·
  <a href="#about">About</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="#project-structure">Structure</a> ·
  <a href="#roadmap">Roadmap</a>
</p>

---

## Preview

<!-- Replace these placeholders with actual screenshots when available -->

<p align="center">
  <img src="docs/screenshots/hero.png" alt="Hero Section — Cinematic video background with animated scene cards" width="80%">
</p>

<!-- Add more screenshots below as the project grows -->
<!-- 
<p align="center">
  <img src="docs/screenshots/crew.png" alt="Crew Showcase" width="80%">
</p>

<p align="center">
  <img src="docs/screenshots/locations.png" alt="World Map" width="80%">
</p>
-->

> 📸 Screenshots coming soon — will be added as new sections are built.

---

## About

One Piece 2.0 is a single-page React application that brings the One Piece world to life through a **visual-first** approach. Instead of complex animations and effects, the site relies on **strong artwork and structured data** to create an immersive experience.

**Current highlights:**
- 🎬 Cinematic Hero with full-screen video and animated scene cards
- 💬 Rotating atmospheric quotes (independent of video/scroll)
- 🏴‍☠️ Straw Hat crew showcase with bounty counters
- 🎨 Image-first asset system ready for world-class artwork
- 📱 Fully responsive across all devices
- ♿ Reduced-motion support for accessibility

---

## Architecture

### Design Philosophy

```
Images → Content → Layout → Interaction → Animation
```

The priority is clear: **artwork creates the world, data describes it, components present it**. Animation only enhances — never drives.

### How It Works

```
┌─────────────────────────────────────────────────────────┐
│                     PUBLIC LAYER                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │  video/  │  │  images/ │  │  favicon / icons     │  │
│  │ hero.mp4 │  │ per-type │  │                      │  │
│  └──────────┘  └──────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    COMPONENT LAYER                       │
│  ┌─────────┐  ┌─────────┐  ┌───────────┐              │
│  │  Navbar │  │  Hero 🔒 │  │ Section1  │  ... more    │
│  └─────────┘  └─────────┘  └───────────┘              │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                      DATA LAYER                          │
│  ┌────────────┐ ┌──────────┐ ┌─────────┐ ┌──────────┐ │
│  │ characters │ │ locations│ │  arcs   │ │  crews   │ │
│  ├────────────┤ ├──────────┤ ├─────────┤ ├──────────┤ │
│  │  battles   │ │  fruits  │ │  ships  │ │ timeline │ │
│  └────────────┘ └──────────┘ └─────────┘ └──────────┘ │
│            All connected by ID-only relationships       │
└─────────────────────────────────────────────────────────┘
```

### Entity System

Each entity type follows a consistent schema:

| Entity | Example ID | Relationships |
|--------|-----------|---------------|
| Character | `monkey-d-luffy` | → crew, location, devil fruit, battles |
| Location | `marineford` | → characters, crews, connected locations |
| Arc | `marineford-arc` | → characters, locations, battles |
| Crew | `straw-hat-pirates` | → members, ships, territory |
| Battle | `marineford-war` | → participants, location, arc |
| Power | `gomu-gomu-no-mi` | → users, related powers |
| Ship | `thousand-sunny` | → crew, battles, locations |

**Key rules:**
- IDs are **globally unique** across all types (lowercase kebab-case)
- Entities reference each other **by ID only** — never embedded objects
- Artwork uses **imageKey** matching the entity ID (`luffy.png`, `marineford.webp`)
- Missing images never break the app — placeholders handle gracefully

### Asset System

```
public/images/
├── characters/     # monkey-d-luffy.png, roronoa-zoro.webp ...
├── locations/      # marineford.jpg, water-7.png ...
├── arcs/           # marineford-arc.png ...
├── crews/          # straw-hat-pirates.png ...
├── ships/          # thousand-sunny.png ...
├── battles/        # marineford-war.png ...
├── powers/         # gomu-gomu-no-mi.png ...
├── timeline/       # key-events.png ...
└── shared/         # cross-entity artwork ...
```

Components use `imageKey` only — **never paths or extensions**. Swap an artwork file to update the UI without touching code.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | React 19 | Component-based UI |
| Build | Vite 8 | Fast dev + optimized builds |
| Animation | GSAP + ScrollTrigger | Scroll-based animations |
| Styling | CSS (BEM) | Maintainable, scoped styles |
| Linting | ESLint | Code quality + consistency |
| Data | JS modules | Structured entity system |
| Verification | Custom script | `npm run verify` — validates all data |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20 LTS)
- **npm** 9+

### Install & Run

```bash
# Clone
git clone https://github.com/ajith1251/ONE-PIECE-2.0.git
cd ONE-PIECE-2.0/vite-project

# Install dependencies
npm install

# Start dev server
npm run dev
```

> 💡 The app lives in the `vite-project/` subfolder of the repository — run every npm command from there.

App runs at `http://localhost:5173`

### All Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint check |
| `npm run verify` | Validate entity data integrity |

---

## Project Structure

```
ONE-PIECE-2.0/
├── AGENTS.md                       # Agent index (full docs live in docs/)
├── opencode.json                   # Editor / agent configuration
└── vite-project/                   # 🏴‍☠️ The app — run all npm commands from here
    ├── public/
    │   ├── video/hero.mp4          # Hero background video
    │   └── images/                 # Artwork by entity type
    │       ├── characters/
    │       ├── locations/
    │       ├── arcs/
    │       ├── crews/
    │       ├── ships/
    │       ├── battles/
    │       ├── powers/
    │       ├── timeline/
    │       └── shared/
    ├── src/
    │   ├── components/             # React components
    │   │   ├── Navbar.jsx          # Sticky navigation
    │   │   ├── Hero.jsx            # Cinematic hero (🔒 locked)
    │   │   └── Section1.jsx        # Crew showcase
    │   ├── data/                   # Entity datasets + schemas
    │   │   ├── characters/
    │   │   ├── locations/
    │   │   ├── arcs/
    │   │   ├── crews/
    │   │   ├── battles/
    │   │   ├── fruits/
    │   │   ├── ships/
    │   │   ├── timeline/
    │   │   └── shared/             # ID conventions, relationships
    │   ├── App.jsx                 # Root component
    │   └── index.css               # Global styles + variables
    ├── docs/                       # Project documentation
    ├── scripts/verify-data.mjs     # Data validation tool
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## Roadmap

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1 | ✅ Done | Hero cleanup, quote system, accessibility, lock |
| Phase 2 | ✅ Done | Architecture, data foundation, schemas, verification |
| Phase 3A | ✅ Done | Universal asset system foundation |
| Phase 3B | 🔜 Next | Asset naming migration |
| Phase 4 | 📋 Planned | Character archive + wanted poster gallery |
| Phase 5 | 📋 Planned | Interactive world map |
| Phase 6 | 📋 Planned | Arc explorer + timeline |
| Phase 7 | 📋 Planned | Battle pages + crew details |
| Phase 8 | 📋 Planned | Search + relationship explorer |

---

## Design System

| Token | Value |
|-------|-------|
| Background | `#05060d` |
| Text | `#f7f2eb` |
| Heading Font | Cinzel |
| Body Font | Inter |

---

## Contributing

1. Fork the repo
2. Create a branch (`git checkout -b feature/your-feature`)
3. Make changes following the micro-phase workflow
4. Run checks: `npm run lint && npm run build && npm run verify`
5. Commit with a clear message
6. Open a Pull Request

**Guidelines:**
- Respect locked systems (Hero section 🔒)
- Keep changes focused — one feature per PR
- Follow the image-first philosophy
- Update docs when adding new entity types

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">
  <i>"I'm gonna be King of the Pirates!"</i>
  <br>
  <sub>— Monkey D. Luffy</sub>
</p>
