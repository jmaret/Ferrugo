export function playgroundHref(code: string): string {
  const params = new URLSearchParams({
    version: "stable",
    mode: "debug",
    edition: "2024",
    code,
  });
  return `https://play.rust-lang.org/?${params.toString()}`;
}
