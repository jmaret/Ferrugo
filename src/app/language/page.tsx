import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "The language" };

export default function LanguagePage() {
  return (
    <article className="site-wrap space-y-6 py-8 sm:py-12">
      <header className="panel px-5 py-8 sm:px-8 sm:py-10">
        <p className="eyebrow">The language</p>
        <h1 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-4xl tracking-tight">
          A compiler that keeps the memory rules.
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--ink-muted)]">
          Rust is a compiled language for programs that have to be fast and have to stay standing.
          The lessons teach the syntax. This page is the reason the syntax looks the way it does.
        </p>
      </header>

      <section className="panel px-5 py-8 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">Origins</h2>
        <div className="doc mt-3 max-w-2xl">
          <p>
            Graydon Hoare began Rust in 2006. The name is the rust fungus, chosen because a robust
            thing can look weathered and still hold. Mozilla started sponsoring the work in 2009.
            Firefox was a large concurrent C++ program, and memory mistakes in that kind of program
            become security bugs.
          </p>
          <p>
            The language was rewritten more than once before it settled. Ownership, borrowing, and
            the borrow checker are the result of that decade: the compiler, not the programmer&apos;s
            memory, decides when a value is still allowed to be used.
          </p>
          <p>
            Rust 1.0 shipped on 15 May 2015, with a promise that code which compiled then would keep
            compiling. Later editions — 2015, 2018, 2021, and 2024 — change the surface of the
            language without breaking old crates. The programs in Ferrugo are edition 2024.
          </p>
          <p>
            An experimental browser engine called Servo was written in Rust and fed real code back
            into Firefox, including the Stylo CSS engine. In February 2021 the Rust Foundation took
            up stewardship of the language, the compiler, and crates.io. The founding members were
            AWS, Google, Huawei, Microsoft, and Mozilla. The language had already left the building
            it started in.
          </p>
        </div>
      </section>

      <section className="panel px-5 py-8 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">Beside other languages</h2>
        <p className="mt-3 max-w-2xl">
          Rust shares habits with languages you may already know, and it refuses several of their
          conveniences on purpose.
        </p>
        <div className="doc mt-4 overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Rust</th>
                <th>Python</th>
                <th>JavaScript</th>
                <th>Java</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Types</td>
                <td>Checked before the program runs</td>
                <td>Decided as the program runs</td>
                <td>Dynamic. TypeScript checks, then erases the types</td>
                <td>Checked before the program runs</td>
              </tr>
              <tr>
                <td>Memory</td>
                <td>Freed when the owner ends. No garbage collector</td>
                <td>Garbage collected</td>
                <td>Garbage collected</td>
                <td>Garbage collected, on a virtual machine</td>
              </tr>
              <tr>
                <td>Absence and failure</td>
                <td>
                  <code>Option</code> and <code>Result</code>
                </td>
                <td>
                  <code>None</code> and exceptions
                </td>
                <td>
                  <code>undefined</code> and exceptions
                </td>
                <td>
                  <code>null</code> and exceptions
                </td>
              </tr>
              <tr>
                <td>Runs as</td>
                <td>Native code, or WebAssembly</td>
                <td>An interpreter, or a bytecode virtual machine</td>
                <td>A browser, Node, or another JS engine</td>
                <td>The Java virtual machine</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="doc mt-2 max-w-2xl">
          <h3>Python</h3>
          <p>
            Both reward a program you can read. Python gets there with dynamic types and a vast
            library for scripts, data, and glue. A wrong type usually appears when that line runs.
            Rust gets there by refusing to build until the types, the owners, and the borrows agree.
            Python is the faster first draft when the program spends its time waiting. Rust is the
            tighter program when the work is the CPU, the memory, or a bug you cannot afford later.
          </p>
          <h3>JavaScript</h3>
          <p>
            Both have a large package culture, npm and crates.io, and both can describe work that
            waits. JavaScript is the language of the page. It is dynamic, and a collector reclaims
            memory. TypeScript adds types and then removes them: what runs is still JavaScript. Rust
            compiles to native code, or to WebAssembly when a page needs it. Many JavaScript tools
            are now written in Rust because the tool has to be fast. The page they produce is still
            JavaScript.
          </p>
          <h3>Java</h3>
          <p>
            Both are statically typed and meant for programs that live for years. A Java interface
            and a Rust trait both name behavior a type can promise. Java runs on a virtual machine.
            Almost any reference can be null, and failure is often an exception. Rust runs as native
            code. Absence is <code>Option</code>, recoverable failure is <code>Result</code>, and the
            borrow checker rejects many data races before the program starts. A team with a large
            Java codebase will often ship sooner by staying there. Rust pays that time back when the
            program needs a smaller memory footprint, steadier latency, or the control of C without
            C&apos;s silent mistakes.
          </p>
        </div>
      </section>

      <section className="panel px-5 py-8 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">Why someone reaches for it</h2>
        <div className="doc mt-3 max-w-2xl">
          <p>People choose Rust when the cost of being wrong in production is higher than the cost of a slower first draft.</p>
          <ul>
            <li>The program needs the speed and the small memory use of C or C++, and the compiler should hold the memory rules.</li>
            <li>A mistake would be a crash, a security hole, or a latency spike, and it is cheaper to hear about it at build time.</li>
            <li>The process should run for a long time without garbage-collection pauses.</li>
            <li>One toolchain should behave the same on every machine: rustup, cargo, and crates.io.</li>
          </ul>
          <p>
            A script, a notebook, or a page of interface code is usually happier in Python or
            JavaScript. Rust is the language for the part of the system that has to be correct and
            fast at the same time.
          </p>
        </div>
      </section>

      <section className="panel px-5 py-8 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">Where it has a following</h2>
        <div className="doc mt-3 max-w-2xl">
          <p>
            The following is in systems work, in the tools other languages run on, and among
            developers who keep choosing it.
          </p>
          <ul>
            <li>
              <strong>Operating systems. </strong>
              Rust is accepted in the Linux kernel for drivers and other new code. Android uses it
              for new native code, and Google has described a sharp drop in memory-safety
              vulnerabilities as that shift took hold. Microsoft uses it in parts of Windows and in
              other systems work.
            </li>
            <li>
              <strong>Infrastructure. </strong>
              AWS wrote Firecracker, the microVM behind Lambda and Fargate, in Rust, and Bottlerocket,
              a container-oriented OS, as well. Cloudflare&apos;s Pingora proxy, which fronts a large
              share of its traffic, is Rust. Discord rewrote a busy service from Go to Rust to
              steady its latency.
            </li>
            <li>
              <strong>Browsers. </strong>
              Firefox runs Rust in its CSS engine and in other components that grew out of Servo.
            </li>
            <li>
              <strong>Tools. </strong>
              ripgrep searches files. In the Python world, ruff and uv are Rust. In the JavaScript
              world, SWC and Turbopack are Rust. cargo and the compiler are Rust too.
            </li>
            <li>
              <strong>Small machines and the web. </strong>
              Embedded work and WebAssembly use Rust where a garbage collector does not fit.
            </li>
          </ul>
          <p>
            For years Rust has led Stack Overflow&apos;s ranking of languages developers most want to
            keep using. That is a following among people who write it, separate from any one
            company.
          </p>
          <p>
            <Link href="/#main">Start with main</Link> when you want the syntax those systems are written in.
          </p>
        </div>
      </section>
    </article>
  );
}
