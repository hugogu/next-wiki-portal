import { motion } from 'framer-motion'
import { ArrowRight, Github, Sparkles } from 'lucide-react'

const badges = ['Apache-2.0', 'Next.js 16', 'React 19', 'TypeScript 5', 'Node 20+']

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-slate-950 pb-24 pt-36 md:pb-32 md:pt-44">
      {/* 背景层：网格 + 光晕 */}
      <div className="bg-grid-dark mask-fade-b absolute inset-0" />
      <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[140px]" />
      <div className="absolute right-[-120px] top-1/3 h-[380px] w-[380px] rounded-full bg-blue-600/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* 左侧文案 */}
        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-1.5 font-mono text-xs text-cyan-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            开源 · 自托管 · AI-Native
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-4xl font-bold leading-[1.15] tracking-tight text-white md:text-6xl"
          >
            个人的{' '}
            <span className="text-glow-cyan bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              AI 原生
            </span>
            <br />
            知识资产库
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg"
          >
            用 AI 书写与组织知识 —— 并让同一个知识库，成为任何 AI 助手与你对话时的记忆底座。
            一条 <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-cyan-300">docker compose up</code> 即可自托管运行，永不锁定于单一 AI 厂商。
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="https://github.com/hugogu/next-wiki"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/40"
            >
              <Github className="h-4 w-4" />
              GitHub 仓库
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#quickstart"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-slate-300 transition-all hover:border-cyan-400/40 hover:text-white"
            >
              快速开始
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-10 flex flex-wrap gap-2"
          >
            {badges.map((b) => (
              <span
                key={b}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-slate-400"
              >
                {b}
              </span>
            ))}
          </motion.div>
        </div>

        {/* 右侧终端卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 blur-xl" />
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/90 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-3 font-mono text-xs text-slate-500">~/next-wiki — zsh</span>
            </div>
            <div className="space-y-2.5 p-5 font-mono text-[13px] leading-relaxed">
              <p><span className="text-cyan-400">$</span> <span className="text-slate-200">git clone https://github.com/hugogu/next-wiki.git</span></p>
              <p><span className="text-cyan-400">$</span> <span className="text-slate-200">cd next-wiki && cp .env.example .env</span></p>
              <p><span className="text-cyan-400">$</span> <span className="text-slate-200">docker compose up -d --build</span></p>
              <p className="pt-1 text-slate-500"># 首次运行自动完成初始化</p>
              <p className="text-emerald-400">✓ ready — http://localhost:3000</p>
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                </span>
                <span className="text-xs text-cyan-300">MCP server online — Claude / Cursor 已可读写知识库</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
