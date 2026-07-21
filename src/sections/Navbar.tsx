import { useEffect, useState } from 'react'
import { Github, Languages, Terminal, CircleUserRound } from 'lucide-react'
import { useLang } from '@/i18n'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLang, t } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#features', label: t('nav.features') },
    { href: '#ai-native', label: t('nav.ai') },
    { href: '#stack', label: t('nav.stack') },
    { href: '#quickstart', label: t('nav.quickstart') },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-slate-950/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/25">
            <Terminal className="h-4 w-4 text-white" strokeWidth={2.5} />
          </span>
          <span className="font-mono text-[15px] font-semibold tracking-tight text-white">
            next-wiki
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* 个人主页 */}
          <a
            href="https://www.hugogu.cn/"
            target="_blank"
            rel="noreferrer"
            title="Hugo Gu"
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-xs text-slate-300 transition-all hover:border-cyan-400/40 hover:text-white"
          >
            <CircleUserRound className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t('nav.home')}</span>
          </a>

          {/* 语言切换 */}
          <button
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            aria-label="Switch language"
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-xs text-slate-300 transition-all hover:border-cyan-400/40 hover:text-white"
          >
            <Languages className="h-3.5 w-3.5" />
            <span className={lang === 'en' ? 'text-cyan-300' : ''}>EN</span>
            <span className="text-slate-600">/</span>
            <span className={lang === 'zh' ? 'text-cyan-300' : ''}>中</span>
          </button>

          <a
            href="https://github.com/hugogu/next-wiki"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-slate-200 transition-all hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  )
}
