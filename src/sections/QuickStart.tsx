import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy, Github } from 'lucide-react'
import { useLang } from '@/i18n'

const commands = [
  'git clone https://github.com/hugogu/next-wiki.git',
  'cd next-wiki',
  'cp .env.example .env',
  'docker compose up -d --build',
]

export default function QuickStart() {
  const [copied, setCopied] = useState(false)
  const { t } = useLang()

  const steps = [1, 2, 3, 4].map((n) => ({
    n: `0${n}`,
    title: t(`qs.s${n}.title`),
    desc: t(`qs.s${n}.desc`),
  }))

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(commands.join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section id="quickstart" className="relative overflow-hidden bg-slate-950 py-24 md:py-32">
      <div className="bg-grid-dark mask-fade-b absolute inset-0" />
      <div className="absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-sm text-cyan-400">{t('qs.kicker')}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {t('qs.title')}
          </h2>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          {/* 步骤 */}
          <div className="space-y-7">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-5"
              >
                <span className="font-mono text-sm font-semibold text-cyan-400">{s.n}</span>
                <div>
                  <p className="font-semibold text-white">{s.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 终端 */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-cyan-500/15 to-blue-600/10 blur-xl" />
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/90 backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <span className="font-mono text-xs text-slate-500">terminal</span>
                <button
                  onClick={copy}
                  className="flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1 text-xs text-slate-400 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? t('qs.copied') : t('qs.copy')}
                </button>
              </div>
              <div className="space-y-2.5 p-5 font-mono text-[13px] leading-relaxed">
                {commands.map((c) => (
                  <p key={c}>
                    <span className="text-cyan-400">$ </span>
                    <span className="text-slate-200">{c}</span>
                  </p>
                ))}
                <p className="pt-2 text-slate-500">{t('qs.term.open')}</p>
                <p className="text-emerald-400">→ http://localhost:3000</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-600/10 p-10 text-center md:p-14"
        >
          <h3 className="text-2xl font-bold text-white md:text-3xl">{t('cta.title')}</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400 md:text-base">{t('cta.sub')}</p>
          <a
            href="https://github.com/hugogu/next-wiki"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/40"
          >
            <Github className="h-4 w-4" />
            {t('cta.button')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
