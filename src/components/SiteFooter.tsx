import Link from "next/link";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--line)]/80 bg-[rgba(246,234,216,0.9)] backdrop-blur-sm">
      <div className="site-wrap grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-[var(--ink-muted)]">
            A public room that teaches Rust. The first page runs from a function named main through
            Result. Further lessons cover traits, threads, and async.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--ink-muted)]">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="text-[var(--ink)] underline-offset-2 hover:underline">
                Lessons
              </Link>
            </li>
            <li>
              <Link href="/further" className="text-[var(--ink)] underline-offset-2 hover:underline">
                Further
              </Link>
            </li>
            <li>
              <Link href="/language" className="text-[var(--ink)] underline-offset-2 hover:underline">
                The language
              </Link>
            </li>
            <li>
              <Link href="/vision" className="text-[var(--ink)] underline-offset-2 hover:underline">
                Vision
              </Link>
            </li>
            <li>
              <Link href="/architecture" className="text-[var(--ink)] underline-offset-2 hover:underline">
                Architecture
              </Link>
            </li>
            <li>
              <Link href="/releases" className="text-[var(--ink)] underline-offset-2 hover:underline">
                Releases
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--ink-muted)]">Principle</p>
          <p className="mt-3 text-sm text-[var(--ink-muted)]">
            Zero-cost static hosting. Checks stay in the browser. Try it opens the official Rust
            playground, and only then does a program leave this page.
          </p>
        </div>
      </div>
      <div className="border-t border-[var(--line)]/60">
        <p className="site-wrap py-3 text-xs text-[var(--ink-muted)]">
          Ferrugo does not host a compiler. Refresh keeps the same lessons.
        </p>
      </div>
    </footer>
  );
}
