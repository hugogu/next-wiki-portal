import type { Lang } from '@/i18n'

// Vite raw-imports every markdown page at build time.
const modules = import.meta.glob('./pages/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export const docsContent: Record<Lang, Record<string, string>> = { en: {}, zh: {} }

for (const [path, md] of Object.entries(modules)) {
  const m = path.match(/\.\/pages\/(en|zh)\/(.+)\.md$/)
  if (m) docsContent[m[1] as Lang][m[2]] = md
}
