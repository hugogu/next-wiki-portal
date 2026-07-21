import { motion } from 'framer-motion'
import {
  Sparkles,
  Brain,
  UserRound,
  Database,
  History,
  Zap,
  Globe,
  MessageSquareMore,
} from 'lucide-react'
import { useLang } from '@/i18n'

const featureIcons = [
  Sparkles,
  Brain,
  UserRound,
  Database,
  History,
  Zap,
  Globe,
  MessageSquareMore,
]

export default function Features() {
  const { t } = useLang()

  const stats = [1, 2, 3, 4].map((n) => ({
    value: t(`stats.${n}.value`),
    label: t(`stats.${n}.label`),
  }))

  const features = featureIcons.map((icon, i) => ({
    icon,
    title: t(`f.${i + 1}.title`),
    desc: t(`f.${i + 1}.desc`),
  }))

  return (
    <section id="features" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* 数据条 */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-slate-50 px-6 py-7 text-center">
              <p className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text font-mono text-2xl font-bold text-transparent md:text-3xl">
                {s.value}
              </p>
              <p className="mt-1.5 text-xs text-slate-500 md:text-sm">{s.label}</p>
            </div>
          ))}
        </div>

        {/* 标题 */}
        <div className="mt-24 max-w-2xl">
          <p className="font-mono text-sm text-cyan-600">{t('features.kicker')}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {t('features.title')}
          </h2>
          <p className="mt-4 leading-relaxed text-slate-500">{t('features.sub')}</p>
        </div>

        {/* 特性网格 */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-600/10 text-cyan-600 transition-colors group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white">
                <f.icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
