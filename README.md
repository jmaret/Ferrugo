# Ferrugo

A public room that teaches Rust. The first page runs from `fn main` through ownership, borrowing, and `Result`. `/further` continues with traits, threads, and async. Checks are graded in the browser. Try it opens the official Rust playground with that program.

The product name is Ferrugo.

## Layout

- `src/app` — the short lessons, `/further`, the language, vision, architecture, releases
- `content/lessons.ts` — the first page
- `content/further.ts` — traits through async
- `docs` — vision and architecture, rendered in summary on those pages
- `public/hero-bg.jpg` — a rusted iron bridge

## Local checks

```sh
npm install
npm run dev
```

`npm run build` writes a static site to `out/`.

## Deploy

`npm run build` writes a static site to `out/`. GitHub Pages serves that export from `main` through `.github/workflows/pages.yml`. The custom domain is the site root, so the Pages build does not set `BASE_PATH`. A local build does not either. `public/CNAME` keeps `ferrugo.aathira-services.com` on each deploy.

The public site is https://ferrugo.aathira-services.com/.

## Docs

A change under `src/` or `content/` also updates `docs/VISION_AND_REQUIREMENTS.md`, `docs/ARCHITECTURE_AND_DESIGN.md`, and `CHANGELOG.md`. The vision and architecture pages render the Summary of those files. The releases page renders the changelog. The architecture pictures and the Mermaid diagrams change together.
