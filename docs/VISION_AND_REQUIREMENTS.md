# Vision and requirements

**Product:** Ferrugo

**Last updated:** 2026-10-15

## Summary

Ferrugo is a public room that teaches Rust. A visitor can read where the language came from, how it sits beside Python, JavaScript, and Java, and why engineers reach for it. The first page is a short path: the shape of a tiny program, the syntax that writes it, and ownership, borrowing, and `Result`. `/further` continues on its own page with traits, generics, lifetimes, modules, iterators, closures, threads, and async.

Checks are graded in the browser. A program is compiled only when the visitor chooses Try it, and then on the official Rust playground. This site does not run a compiler and does not keep an account.

The name of the product is Ferrugo.

## Vision

Ferrugo teaches Rust by a short path, then a second page. The first lessons are the shape of a program: `fn main`, `println!`, and the Cargo directory. The next lessons are the syntax that fills that shape. The last lessons on that page are the ideas that make Rust Rust: ownership, borrowing, and `Result`. `/further` is the later path: traits through async, so the first page does not keep growing.

The room is free to open. Nothing the visitor answers is stored. The compiler stays on [play.rust-lang.org](https://play.rust-lang.org), and a program is sent there only when the visitor chooses Try it.

## Users

- **Visitor** — reads where the language came from, then a lesson on the first page or on `/further`, answers its checks, and may open the same program in the playground.
- **Builder** — ships the static site and keeps the lessons and these documents together.

## Principles

- **Zero cost** — static export, no account, no paid API, no compiler host.
- **A real program** — each lesson shows one short program. Try it opens that program.
- **A check you can finish here** — the answer is graded in the browser, with the explanation either way.
- **One visual system** — AetherForge chrome: paper `#F6EAD8`, ink `#152028`, petrol `#0F4C5C`, Source Serif 4, Source Sans 3, IBM Plex Mono, frosted panels. The mark is a bridge arch. The backdrop is a rusted iron bridge.
- **Living documents** — the vision page and the architecture page render the Summary of these files. A change to the app updates the files in the same work.
- **The name is Ferrugo** — pages, the header, and these documents use that word alone.

## In scope

- `/language` explains the origins of Rust, how it compares with Python, JavaScript, and Java, why someone chooses it, and where it has a following.
- Thirteen lessons on `/`: `fn main`, `println!`, the Cargo shape, `let` and `mut`, a few types, functions, `if` and loops, structs and methods, enums and `match`, `Vec` and `String`, ownership and moves, references and borrowing, `Option`, `Result`, and `?`.
- Eleven lessons on `/further`: traits, generics, lifetimes, modules, iterators, closures, trait objects, threads, channels, `Arc` and `Mutex`, and async futures.
- One or two checks on each lesson, graded in the browser.
- Try it opens the official playground with that lesson's program, Rust 2024, stable.
- `/vision` renders the Summary of this document.
- `/architecture` draws the conceptual, logical, and physical views, then renders the architecture Summary.
- `/releases` renders `CHANGELOG.md`. The header version chip links there and shows the package version.
- A rusted iron bridge behind the pages, with the AetherForge paper wash so the type stays readable.
- The public site is `https://ferrugo.aathira-services.com/`, served from the domain root so the stylesheet and the bridge photograph load.

## Out of scope

- Hosting `rustc`, Cargo, or a playground of our own.
- Accounts, saved answers, or progress that survives a refresh.
- Writing macros, `unsafe`, and hosting an async executor. The async lesson shows that a future is a value. It does not run one.
- An AetherForge catalog entry, until that is asked for.

## Requirements

| ID | Requirement | Status |
| --- | --- | --- |
| V-1 | Lessons run from `fn main` through `Option`, `Result`, and `?` | Met |
| V-2 | Each lesson has one program and one or two checks graded in the browser | Met |
| V-3 | Try it opens the official playground with that program. This site does not host a compiler | Met |
| V-4 | `/vision` renders the Summary of this document | Met |
| V-5 | `/architecture` shows conceptual, logical, and physical pictures, then the architecture Summary | Met |
| V-6 | `/releases` renders the changelog. The header chip links to it and shows the package version | Met |
| V-7 | The chrome matches AetherForge, with the bridge mark and the rusted-bridge backdrop | Met |
| V-8 | The site is a static export with no auth and no paid dependency | Met |
| V-9 | A code change updates this document, the architecture document, and `CHANGELOG.md` together | Met |
| V-10 | The product name is Ferrugo alone | Met |
| V-11 | `/language` covers origins, comparisons with Python, JavaScript, and Java, why someone chooses Rust, and where it has a following | Met |
| V-12 | `/further` teaches traits through async, on a page of its own, with the same checks and Try it | Met |
| V-13 | The public site is `https://ferrugo.aathira-services.com/`, and styles load from the domain root | Met |

## Acceptance

A visitor can read the language page, open a lesson on the first page or on `/further`, answer a check, see whether it was right, and open Try it on the official playground. The visitor can read the vision summary, the three architecture pictures, and the release notes from the version chip. The page does not ask for a sign-in, and a check does not leave the browser.

## Changelog

- 2026-10-15 — The public site is `https://ferrugo.aathira-services.com/`. Styles and pictures load from the domain root.
- 2026-10-15 — `/further` adds eleven lessons, from traits through async, so the first page stays the short path.
- 2026-10-15 — `/language` adds origins, comparisons, reasons to choose Rust, and where it is used.
- 2026-10-15 — First room: thirteen lessons, checks, Try it, vision, architecture drawings, and release notes.
