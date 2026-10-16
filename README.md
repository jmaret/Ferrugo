# Ferrugo

A public room that teaches Rust. Lessons run from `fn main` through ownership, borrowing, and `Result`. Checks are graded in the browser. Try it opens the official Rust playground with that program.

The product name is Ferrugo.

## Layout

- `src/app` — lessons, the language, vision, architecture, releases
- `content/lessons.ts` — the curriculum
- `docs` — vision and architecture, rendered in summary on those pages
- `public/hero-bg.jpg` — a rusted iron bridge

## Local checks

```sh
npm install
npm run dev
```

`npm run build` writes a static site to `out/`.

## Deploy

`npm run build` writes a static site to `out/`. GitHub Pages serves that export from `main` through `.github/workflows/pages.yml`. The Pages build sets `BASE_PATH=/Ferrugo`. A local build does not, so the dev server stays at `/`. No environment variables are required locally.

The public site is https://jmaret.github.io/Ferrugo/.

## Docs

A change under `src/` or `content/` also updates `docs/VISION_AND_REQUIREMENTS.md`, `docs/ARCHITECTURE_AND_DESIGN.md`, and `CHANGELOG.md`. The vision and architecture pages render the Summary of those files. The releases page renders the changelog. The architecture pictures and the Mermaid diagrams change together.
