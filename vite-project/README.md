<p align="center">
  <br>
  <img src="public/favicon.svg" alt="One Piece 2.0 Logo" width="80" height="80">
  <br>
</p>

<h1 align="center">One Piece 2.0</h1>

<p align="center">
  <strong>A fan-built interactive exploration of the One Piece world</strong>
  <br>
  Characters · Arcs · Locations · Battles · Crews · Devil Fruits · Ships · Timeline
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="#project-structure">Project Structure</a> ·
  <a href="#commands">Commands</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#contributing">Contributing</a>
</p>

---

## Features

- **Cinematic Hero** — Full-screen video background with animated scene cards and rotating atmospheric quotes
- **Interactive Crew Showcase** — Straw Hat crew profiles with bounty counters and GSAP scroll animations
- **Rich Data Layer** — Structured entity system for characters, locations, arcs, battles, crews, ships, and Devil Fruits
- **Image-First Design** — Visual-first philosophy where artwork drives the experience
- **Responsive Layout** — Adapts seamlessly from desktop to mobile
- **Reduced Motion Support** — Respects `prefers-reduced-motion` for accessibility

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev/) |
| Build Tool | [Vite 8](https://vite.dev/) |
| Animation | [GSAP 3.15](https://gsap.com/) + ScrollTrigger |
| Styling | CSS with BEM methodology |
| Linting | ESLint (React hooks + refresh plugins) |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20 LTS)
- **npm** 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/one-piece-2.0.git
cd one-piece-2.0

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Quick Start

```bash
npm install && npm run dev
```

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run verify` | Run data-layer verification |

---

## Project Structure

```
one-piece-2.0/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   ├── video/
│   │   └── hero.mp4                  # Hero background video
│   └── images/
│       ├── img1.png–img1.png         # Legacy crew portraits
│       ├── characters/               # Character artwork
│       ├── locations/                # Location artwork
│       ├── arcs/                     # Arc artwork
│       ├── crews/                    # Crew artwork
│       ├── ships/                    # Ship artwork
│       ├── battles/                  # Battle artwork
│       ├── powers/                   # Devil Fruit / Haki artwork
│       ├── timeline/                 # Timeline artwork
│       └── shared/                   # Shared / multi-entity artwork
├── src/
│   ├── main.jsx                      # App entry point
│   ├── App.jsx                       # Root component
│   ├── App.css                       # Root styles
│   ├── index.css                     # Global styles + CSS variables
│   ├── components/
│   │   ├── Navbar.jsx + Navbar.css   # Sticky navigation
│   │   ├── Hero.jsx + Hero.css       # Cinematic hero section (🔒 LOCKED)
│   │   └── Section1.jsx + Section1.css  # Crew showcase section
│   └── data/
│       ├── heroQuotes.js             # Hero quote data (🔒 LOCKED)
│       ├── characters/               # Character entities + schema
│       ├── locations/                # Location entities + schema
│       ├── arcs/                     # Arc entities + schema
│       ├── crews/                    # Crew entities + schema
│       ├── battles/                  # Battle entities + schema
│       ├── fruits/                   # Devil Fruit & power entities + schema
│       ├── ships/                    # Ship entities + schema
│       ├── events/                   # Event entities + schema
│       ├── timeline/                 # Timeline entities + schema
│       └── shared/                   # ID conventions, metadata, relationships
├── scripts/
│   └── verify-data.mjs              # Data-layer verification tool
├── docs/
│   ├── PROJECT_MEMORY.md             # Primary project documentation
│   ├── PHASE_HISTORY.md              # Development phase log
│   └── PHASE2_ARCHITECTURE_PLAN.md   # Architecture blueprint
├── index.html                        # HTML entry point
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## Architecture

### Design Philosophy

The project follows an **image-first** priority order:

> **Images → Content → Layout → Interaction → Animation**

Visuals come from artwork assets, not complex programmatic reconstruction. This keeps the site visually impressive through strong imagery rather than heavy animation systems.

### Data Layer

The project uses a structured entity system with 8 entity types:

| Entity | Example | Schema |
|--------|---------|--------|
| Character | `monkey-d-luffy` | [character-schema.md](src/data/characters/character-schema.md) |
| Location | `marineford` | [location-schema.md](src/data/locations/location-schema.md) |
| Arc | `marineford-arc` | [arc-schema.md](src/data/arcs/arc-schema.md) |
| Crew | `straw-hat-pirates` | [crew-schema.md](src/data/crews/crew-schema.md) |
| Battle | `marineford-war` | [battle-schema.md](src/data/battles/battle-schema.md) |
| Power | `gomu-gomu-no-mi` | [power-schema.md](src/data/fruits/power-schema.md) |
| Ship | `thousand-sunny` | [ship-schema.md](src/data/ships/ship-schema.md) |
| Event | — | *(schema pending)* |

**Key conventions:**
- **Global unique IDs** — lowercase kebab-case, immutable, unique across all entity types
- **ID-only relationships** — entities reference each other by ID, never embedded objects
- **Stored-both** — relationships stored on both sides with a declared source of truth
- **ImageKey naming** — `imageKey` matches entity ID; artwork files use `imageKey.*` format

Run `npm run verify` to validate all entity data (0 errors, 0 warnings expected).

### Asset System

Artwork lives in `public/images/` organized by entity type. The system uses **imageKey-only** references — components never hardcode paths or extensions. This means artwork can be swapped by replacing files without touching code.

See [public/images/README.md](public/images/README.md) for full asset conventions.

### Hero Section

The Hero is a **locked, protected system** — a cinematic video background with:
- Native autoplay, muted, loop, playsInline
- 6 animated scene cards with GSAP ScrollTrigger
- 7 rotating atmospheric quotes (independent of video/scroll)
- Reduced-motion support

Future phases must not redesign the Hero unless explicitly requested.

---

## Design System

### Colors

| Token | Value |
|-------|-------|
| Background | `#05060d` |
| Text | `#f7f2eb` |

### Typography

| Role | Font | Weights |
|------|------|---------|
| Headings | Cinzel | 400–900 |
| Body | Inter | 400, 500, 600, 700, 900 |

---

## Development Workflow

The project uses **micro-phase development** — one focused objective per step:

```
Implement → Validate → Verify → Diff Review → Memory Sync → Commit
```

### Phase Progress

| Phase | Objective | Status |
|-------|-----------|--------|
| Phase 1 (1–1G) | Hero Cleanup, Quote System, Accessibility, Lock | ✅ Complete |
| Phase 2 (2A–2O) | Architecture, Data Foundation, Schemas, Verification | ✅ Complete |
| Phase 3A | Universal Asset System Foundation | ✅ Complete |
| Phase 3B | Asset Naming Migration | 🔜 Next |

---

## Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Follow** the micro-phase workflow
4. **Run** validation before committing:
   ```bash
   npm run lint
   npm run build
   npm run verify
   ```
5. **Commit** with a clear message describing the phase/objective
6. **Open** a Pull Request

### Guidelines

- **Respect protected systems** — Hero section is locked unless explicitly requested
- **Image-first** — add artwork assets, not complex animations
- **One entity type per PR** — keep changes focused
- **Update docs** — sync `PROJECT_MEMORY.md` and `PHASE_HISTORY.md` after major changes

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <i>"I'm gonna be King of the Pirates!"</i> — Monkey D. Luffy
</p>
