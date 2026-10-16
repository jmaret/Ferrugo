# Ferrugo

A public room that teaches Rust. Lessons run from `fn main` through ownership, borrowing, and `Result`. Checks are graded in the browser. Try it opens the official Rust playground with that program.

The product name is Ferrugo.

## Layout

- `src/app` — lessons, vision, architecture, releases
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

`npm run build` writes a static site to `out/`. Vercel Hobby serves that export. The build command is `npm run build`. No environment variables.

## Docs

A change under `src/` or `content/` also updates `docs/VISION_AND_REQUIREMENTS.md`, `docs/ARCHITECTURE_AND_DESIGN.md`, and `CHANGELOG.md`. The vision and architecture pages render the Summary of those files. The releases page renders the changelog. The architecture pictures and the Mermaid diagrams change together.
