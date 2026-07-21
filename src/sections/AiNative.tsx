import { motion } from 'framer-motion'
import { Bot, Globe2, LibraryBig, PenLine, ShieldCheck, ArrowLeftRight } from 'lucide-react'
import { useLang } from '@/i18n'

export default function AiNative() {
  const { t } = useLang()

  const modes = [
    { icon: PenLine, name: 'Copilot', tag: t('ai.mode.1.tag'), desc: t('ai.mode.1.desc') },
    { icon: LibraryBig, name: 'LLM Wiki', tag: t('ai.mode.2.tag'), desc: t('ai.mode.2.desc') },
  ]

  const clients = ['Claude', 'Cursor', t('ai.client.mcp'), t('ai.client.future')]

  return (
    <section id="ai-native" className="relative overflow-hidden bg-slate-50 py-24 md:py-32">
      <div className="bg-grid-light absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-sm text-cyan-600">{t('ai.kicker')}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {t('ai.title')}
          </h2>
          <p className="mt-4 leading-relaxed text-slate-500">{t('ai.sub')}</p>
        </div>

        {/* 架构示意 */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10"
        >
          <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1.2fr_auto_1fr]">
            {/* Web UI */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-5 py-8 text-center">
              <Globe2 className="h-7 w-7 text-slate-700" strokeWidth={1.6} />
              <p className="mt-3 font-semibold text-slate-900">{t('ai.webui')}</p>
              <p className="mt-1 text-xs text-slate-500">{t('ai.webui.sub')}</p>
            </div>
            <div className="flex items-center justify-center text-slate-300 max-md:rotate-90">
              <ArrowLeftRight className="h-5 w-5" />
            </div>
            {/* 核心存储 */}
            <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl bg-slate-950 px-5 py-8 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 to-blue-600/10" />
              <ShieldCheck className="relative h-7 w-7 text-cyan-300" strokeWidth={1.6} />
              <p className="relative mt-3 font-semibold text-white">{t('ai.store')}</p>
              <p className="relative mt-1 font-mono text-xs text-cyan-300/80">{t('ai.store.sub')}</p>
            </div>
            <div className="flex items-center justify-center text-slate-300 max-md:rotate-90">
              <ArrowLeftRight className="h-5 w-5" />
            </div>
            {/* MCP */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-50/60 px-5 py-8 text-center">
              <Bot className="h-7 w-7 text-cyan-600" strokeWidth={1.6} />
              <p className="mt-3 font-semibold text-slate-900">MCP Server</p>
              <p className="mt-1 text-xs text-slate-500">{t('ai.mcp.sub')}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-slate-400">{t('ai.clients')}</span>
            {clients.map((c) => (
              <span
                key={c}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-xs text-slate-600"
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 写作模式 */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-slate-900">{t('ai.modes.title')}</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {modes.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                      <m.icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <p className="font-mono text-lg font-semibold text-slate-900">{m.name}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">{m.tag}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-500">{m.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400">{t('ai.modes.note')}</p>
        </div>
      </div>
    </section>
  )
}
