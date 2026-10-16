import Link from "next/link";

type LogoProps = {
  compact?: boolean;
  href?: string;
};

export function Logo({ compact = false, href = "/" }: LogoProps) {
  return (
    <Link href={href} className="inline-flex min-w-0 items-center gap-2.5 no-underline" aria-label="Ferrugo home">
      <svg
        viewBox="0 0 36 36"
        aria-hidden="true"
        className="size-8 shrink-0 rounded-full ring-1 ring-[var(--line)] sm:size-9"
      >
        <circle cx="18" cy="18" r="17" fill="#E6CA98" stroke="#B89260" strokeWidth="1" />
        <path d="M6.5 23.5h23" fill="none" stroke="#0F4C5C" strokeWidth="1.6" strokeLinecap="round" />
        <path
          d="M8 23.5V16.5h4.2L18 9.5l5.8 7H28v7"
          fill="none"
          stroke="#0F4C5C"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M13.2 23.5v-5.2h9.6v5.2" fill="none" stroke="#0F4C5C" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M18 9.5v8.8" fill="none" stroke="#0F4C5C" strokeWidth="1.2" />
      </svg>
      {!compact && (
        <span className="font-[family-name:var(--font-display)] text-xl tracking-tight text-[var(--ink)] sm:text-2xl">
          Ferrugo
        </span>
      )}
    </Link>
  );
}
