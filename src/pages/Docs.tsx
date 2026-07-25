import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  ChevronLeft,
  Github,
  Languages,
  Menu,
  Terminal,
  X,
} from 'lucide-react'
import { useLang } from '@/i18n'
import { allPages, defaultSlug, docsTree, findNeighbors } from '@/docs/tree'
import { docsContent } from '@/docs/content'

function MarkdownView({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) => {
          const isInternal = href?.startsWith('/docs')
          const cls = 'text-cyan-600 underline decoration-cyan-300 underline-offset-2 hover:text-cyan-700'
          if (isInternal) {
            return <Link to={href!} className={cls}>{children}</Link>
          }
          return (
            <a href={href} target="_blank" rel="noreferrer" className={cls}>
              {children}
            </a>
          )
        },
        pre: ({ children }) => (
          <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-[13px] leading-relaxed text-slate-200">
            {children}
          </pre>
        ),
        code: ({ className, children }) => {
          const isBlock = /language-/.test(className ?? '')
          if (isBlock) return <code className={className}>{children}</code>
          return (
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-cyan-700">
              {children}
            </code>
          )
        },
        table: ({ children }) => (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-left font-semibold text-slate-700">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border-b border-slate-100 px-3 py-2 align-top text-slate-600">{children}</td>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}

export default function Docs() {
  const { slug } = useParams()
  const { lang, setLang, t } = useLang()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const current = allPages.find((p) => p.slug === slug)
  const markdown = useMemo(
    () => (current ? docsContent[lang][current.slug] ?? docsContent.en[current.slug] : ''),
    [current, lang],
  )
  const { prev, next } = findNeighbors(slug ?? '')

  useEffect(() => {
    if (current) {
      document.title = `${current.title[lang]} · next-wiki Docs`
      window.scrollTo(0, 0)
      setDrawerOpen(false)
    }
  }, [current, lang])

  if (!slug) return <Navigate to={`/docs/${defaultSlug}`} replace />
  if (!current) return <Navigate to={`/docs/${defaultSlug}`} replace />

  const sidebar = (
    <nav className="space-y-7">
      {docsTree.map((g) => (
        <div key={g.id}>
          <p className="px-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {g.title[lang]}
          </p>
          <ul className="mt-2 space-y-0.5">
            {g.pages.map((p) => {
              const active = p.slug === slug
              return (
                <li key={p.slug}>
                  <Link
                    to={`/docs/${p.slug}`}
                    className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                      active
                        ? 'bg-cyan-50 font-medium text-cyan-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {p.title[lang]}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部栏 */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open docs menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400 to-blue-600">
                <Terminal className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
              </span>
              <span className="font-mono text-sm font-semibold text-slate-900">next-wiki</span>
            </Link>
            <span className="hidden items-center gap-1.5 rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-medium text-cyan-700 sm:flex">
              <BookOpenText className="h-3 w-3" />
              Docs
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 transition-colors hover:border-cyan-400 hover:text-cyan-700"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              {t('docs.home')}
            </Link>
            <button
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 font-mono text-xs text-slate-600 transition-colors hover:border-cyan-400 hover:text-cyan-700"
              aria-label="Switch language"
            >
              <Languages className="h-3.5 w-3.5" />
              <span className={lang === 'en' ? 'text-cyan-600' : ''}>EN</span>
              <span className="text-slate-300">/</span>
              <span className={lang === 'zh' ? 'text-cyan-600' : ''}>中</span>
            </button>
            <a
              href="https://github.com/hugogu/next-wiki"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 transition-colors hover:border-cyan-400 hover:text-cyan-700"
            >
              <Github className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* 移动端抽屉 */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-950/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 overflow-y-auto bg-white p-5 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-sm font-semibold text-slate-900">Docs</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
                aria-label="Close docs menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {sidebar}
          </div>
        </div>
      )}

      <div className="mx-auto flex max-w-7xl gap-10 px-4 md:px-6">
        {/* 桌面侧边栏 */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto py-8 pr-2 lg:block">
          {sidebar}
        </aside>

        {/* 正文 */}
        <main className="min-w-0 flex-1 py-10">
          <div className="mb-3 font-mono text-xs text-slate-400">
            Docs / {docsTree.find((g) => g.pages.some((p) => p.slug === slug))?.title[lang]} /{' '}
            {current.title[lang]}
          </div>
          <article className="max-w-3xl">
            <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">
              {current.title[lang]}
            </h1>
            <div className="space-y-4 leading-relaxed text-slate-600 [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h3]:mb-2 [&_h3]:mt-7 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-slate-800 [&_li]:ml-5 [&_li]:list-disc [&_li]:py-0.5 [&_strong]:font-semibold [&_strong]:text-slate-800 [&_ul]:space-y-1">
              <MarkdownView markdown={markdown} />
            </div>
          </article>

          {/* 上一页 / 下一页 */}
          <div className="mt-14 flex max-w-3xl items-stretch justify-between gap-4 border-t border-slate-200 pt-6">
            {prev ? (
              <Link
                to={`/docs/${prev.slug}`}
                className="group flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm transition-all hover:border-cyan-400"
              >
                <ArrowLeft className="h-4 w-4 text-slate-400 transition-transform group-hover:-translate-x-0.5" />
                <span>
                  <span className="block text-xs text-slate-400">{t('docs.prev')}</span>
                  <span className="font-medium text-slate-700 group-hover:text-cyan-700">
                    {prev.title[lang]}
                  </span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={`/docs/${next.slug}`}
                className="group flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-right text-sm transition-all hover:border-cyan-400"
              >
                <span>
                  <span className="block text-xs text-slate-400">{t('docs.next')}</span>
                  <span className="font-medium text-slate-700 group-hover:text-cyan-700">
                    {next.title[lang]}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
