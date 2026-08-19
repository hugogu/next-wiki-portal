import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ShieldCheck } from 'lucide-react'
import { useLang } from '@/i18n'

// Separate, disposable instance — never the author's personal kb.hugogu.cn.
// Seeded once with NEXT_WIKI_SEED=true and run with NEXT_WIKI_DEMO_READONLY=true
// (see docs/deployment.md#public-read-only-demo in the next-wiki repo) so every
// write action is rejected server-side regardless of what a visitor clicks.
const DEMO_URL = 'https://demo.next-wiki.hugogu.cn'

// If the iframe hasn't fired onLoad by then, stop showing an indefinite
// spinner and point visitors at the "open in new tab" fallback instead.
const LOAD_TIMEOUT_MS = 8000

export default function LiveDemo() {
  const { t } = useLang()
  const [loaded, setLoaded] = useState(false)
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    if (loaded) return
    const timer = setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS)
    return () => clearTimeout(timer)
  }, [loaded])

  return (
    <section id="live-demo" className="relative overflow-hidden bg-slate-950 py-24 md:py-32">
      <div className="bg-grid-dark mask-fade-b absolute inset-0" />
      <div className="absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-sm text-cyan-400">{t('demo.kicker')}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
              {t('demo.title')}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 md:text-base">
              {t('demo.sub')}
            </p>
          </div>

          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-cyan-400/40 hover:text-white"
          >
            {t('demo.open')}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative mt-10"
        >
          <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-cyan-500/15 to-blue-600/10 blur-xl" />
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/90 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="font-mono text-xs text-slate-500">{DEMO_URL.replace('https://', '')}</span>
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 font-mono text-[11px] text-emerald-300">
                <ShieldCheck className="h-3 w-3" />
                {t('demo.readonly')}
              </span>
            </div>
            <div className="relative aspect-[16/10] w-full bg-slate-900 md:aspect-[16/8]">
              {!loaded && !timedOut && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900 font-mono text-xs text-slate-600">
                  {t('demo.loading')}
                </div>
              )}
              {!loaded && timedOut && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-slate-900 px-6 text-center">
                  <p className="font-mono text-xs text-slate-500">{t('demo.timeout')}</p>
                  <a
                    href={DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-slate-300 transition-all hover:border-cyan-400/40 hover:text-white"
                  >
                    {t('demo.open')}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
              <iframe
                src={DEMO_URL}
                title="next-wiki live demo"
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className="relative z-10 h-full w-full border-0"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
