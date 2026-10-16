import type { Metadata } from "next";
import Link from "next/link";
import { furtherLessons } from "../../../content/further";
import { chapterId, lessonsByChapter } from "../../../content/lessons";
import { LessonView } from "@/components/LessonView";

export const metadata: Metadata = {
  title: "Further",
  description:
    "Intermediate and advanced Rust: traits, generics, lifetimes, modules, iterators, closures, threads, and async.",
};

export default function FurtherPage() {
  const chapters = lessonsByChapter(furtherLessons);

  return (
    <div className="site-wrap space-y-8 py-8 sm:py-12">
      <section className="panel px-5 py-8 sm:px-8 sm:py-10">
        <p className="eyebrow">Further</p>
        <h1 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          From a trait to a future that has not run yet.
        </h1>
        <p className="mt-4 max-w-xl text-base text-[var(--ink-muted)] sm:text-lg">
          Eleven programs past the first page: traits, generics, lifetimes, modules, iterators,
          closures, threads, and async. Each one still has a check you answer here.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#traits" className="btn-accent">
            Start with traits
          </a>
          <Link href="/#main" className="btn-ghost">
            Back to main
          </Link>
        </div>
      </section>

      {chapters.map((group) => (
        <section key={group.chapter} id={chapterId(group.chapter)} className="space-y-4">
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">{group.chapter}</h2>
          {group.lessons.map((lesson) => (
            <LessonView key={lesson.id} lesson={lesson} />
          ))}
        </section>
      ))}
    </div>
  );
}
