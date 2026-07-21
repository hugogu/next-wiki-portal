import { motion } from 'framer-motion'

const groups = [
  {
    label: '应用框架',
    items: ['Next.js 16 · App Router', 'React 19', 'TypeScript 5', 'Tailwind CSS', 'next-intl'],
  },
  {
    label: '数据与任务',
    items: ['PostgreSQL', 'Drizzle ORM', 'pg-boss 后台任务', 'S3 兼容对象存储（可选）'],
  },
  {
    label: 'AI 与内容渲染',
    items: ['MCP Server', 'remark / rehype 管线', 'KaTeX 公式', 'Mermaid 图表', 'OpenAPI 公共 API'],
  },
  {
    label: '工程化',
    items: ['Turborepo Monorepo', 'pnpm', 'Docker Compose', 'Vitest + Playwright', 'Caddy + Cloudflare'],
  },
]

export default function TechStack() {
  return (
    <section id="stack" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-sm text-cyan-600">// 技术栈</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            现代、克制、全部开源
          </h2>
          <p className="mt-4 leading-relaxed text-slate-500">
            只保留必要的依赖，每一层都是主流且可替换的开源方案。
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-cyan-600">{g.label}</p>
              <ul className="mt-4 space-y-2.5">
                {g.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
