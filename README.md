# vwtfafa.github.io

[![Deploy](https://github.com/vwtfafa/vwtfafa.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/vwtfafa/vwtfafa.github.io/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Portfolio website of **vwtfafa** – Minecraft developer of plugins, modpacks & tools with **13.9K+ downloads on Modrinth**. Everything open source.

**→ Live: [vwtfafa.github.io](https://vwtfafa.github.io/)**

## Features

- **Live metrics** – real download counts, server & player numbers straight from the Modrinth and bStats APIs
- **Latest releases** – newest Modrinth releases fetched at runtime
- **GitHub stats** – stars and last update per project, cached locally
- **Project tag filter** – quickly filter by Paper, Fabric, Modpack, Utility …
- **i18n** – English / German, persisted in `localStorage` (defaults to English)
- **Dark & light theme** – follows your system preference until you toggle it
- **Installable PWA** – web app manifest + service worker for offline support
- **Self-hosted fonts** – no external font requests
- **Easter eggs** – a few. Try the Konami code. 🧨
- Zero runtime dependencies beyond React – built with Vite

## Tech Stack

| | |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 |
| Linter | Oxlint |
| Styling | Hand-written CSS (custom properties, no framework) |

## Development

Requires **Node.js ≥ 22**.

```bash
npm install
npm run dev      # start dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # oxlint
```

## Project Structure

```
src/
├── components/   # Header, Hero, Projects, Metrics, FAQ, Footer, …
├── context/      # ThemeContext, LanguageContext
├── data/         # projects.js, translations.js
└── hooks/        # useModrinth, useBStats, useGithub, useScrollSpy, useReveal
```

## Related Projects

- [Lock End](https://github.com/vwtfafa/lock-end) · [Simple Backpack](https://github.com/vwtfafa/simplebackpack) · [CompassTrack](https://github.com/vwtfafa/CompassTrack) · [HitBorder](https://github.com/vwtfafa/HitBorder) · [QuickTrash](https://github.com/vwtfafa/QuickTrash)

All my Minecraft projects live on [Modrinth](https://modrinth.com/user/vwtfafa).

## License

[MIT](LICENSE) © 2026 vwtfafa
