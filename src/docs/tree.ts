import type { Lang } from '@/i18n'

export interface DocPage {
  slug: string
  title: Record<Lang, string>
}

export interface DocGroup {
  id: string
  title: Record<Lang, string>
  pages: DocPage[]
}

export const docsTree: DocGroup[] = [
  {
    id: 'getting-started',
    title: { en: 'Getting Started', zh: '快速上手' },
    pages: [
      { slug: 'introduction', title: { en: 'Introduction', zh: '项目简介' } },
      { slug: 'installation', title: { en: 'Installation', zh: '快速安装' } },
      { slug: 'first-run', title: { en: 'First-Run Setup', zh: '首次初始化' } },
    ],
  },
  {
    id: 'deployment',
    title: { en: 'Deployment', zh: '部署' },
    pages: [
      { slug: 'docker', title: { en: 'Docker Compose', zh: 'Docker Compose' } },
      { slug: 'caddy', title: { en: 'Caddy + Cloudflare', zh: 'Caddy + Cloudflare' } },
      { slug: 'environment', title: { en: 'Environment Variables', zh: '环境变量' } },
    ],
  },
  {
    id: 'usage',
    title: { en: 'Using next-wiki', zh: '使用指南' },
    pages: [
      { slug: 'editing', title: { en: 'Writing & Markdown', zh: '写作与 Markdown' } },
      { slug: 'versioning', title: { en: 'Revisions & History', zh: '版本与历史' } },
      { slug: 'import-export', title: { en: 'Import & Export', zh: '导入与导出' } },
      { slug: 'public-api', title: { en: 'Public REST API', zh: '公共 REST API' } },
    ],
  },
  {
    id: 'ai',
    title: { en: 'AI Integration', zh: 'AI 集成' },
    pages: [
      { slug: 'writing-modes', title: { en: 'Writing Modes', zh: '写作模式' } },
      { slug: 'mcp-server', title: { en: 'MCP Server', zh: 'MCP Server' } },
      { slug: 'feishu', title: { en: 'Feishu Integration', zh: '飞书集成' } },
    ],
  },
  {
    id: 'developers',
    title: { en: 'Developers', zh: '开发者' },
    pages: [
      { slug: 'structure', title: { en: 'Project Structure', zh: '项目结构' } },
      { slug: 'local-dev', title: { en: 'Local Development', zh: '本地开发' } },
      { slug: 'contributing', title: { en: 'Contributing', zh: '参与贡献' } },
    ],
  },
]

export const allPages: DocPage[] = docsTree.flatMap((g) => g.pages)
export const defaultSlug = 'introduction'

export function findNeighbors(slug: string): { prev?: DocPage; next?: DocPage } {
  const i = allPages.findIndex((p) => p.slug === slug)
  return {
    prev: i > 0 ? allPages[i - 1] : undefined,
    next: i >= 0 && i < allPages.length - 1 ? allPages[i + 1] : undefined,
  }
}
