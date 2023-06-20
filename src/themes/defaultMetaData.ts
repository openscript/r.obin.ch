export function createPageTitle(title: string, kind?: string) {
  return kind ? `${title} · ${kind}` : title;
}
