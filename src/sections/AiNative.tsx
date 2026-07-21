import { motion } from 'framer-motion'
import { Bot, Globe2, LibraryBig, PenLine, ShieldCheck, ArrowLeftRight } from 'lucide-react'

const modes = [
  {
    icon: PenLine,
    name: 'Copilot',
    tag: '默认 · 最简单',
    desc: '人类与 AI 在同一个默认 wiki 空间中协作编辑，适合纯协作写作场景。',
  },
  {
    icon: LibraryBig,
    name: 'LLM Wiki',
    tag: '进阶 · 双空间',
    desc: '新增两个管理员专属空间：raw 存放只追加的原始素材，generated 存放 AI 生成的 OKF 概念；生成的概念可作为软链接发布到公开 wiki 路径。',
  },
]

const clients = ['Claude', 'Cursor', 'MCP 兼容客户端', '未来的 AI 助手']

export default function AiNative() {
  return (
    <section id="ai-native" className="relative overflow-hidden bg-slate-50 py-24 md:py-32">
      <div className="bg-grid-light absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-sm text-cyan-600">// AI-Native 架构</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            一个知识库，<br className="sm:hidden" />
            人类与 AI 共同读写
          </h2>
          <p className="mt-4 leading-relaxed text-slate-500">
            Web UI 与 MCP 客户端访问的是同一个权限受控的存储 —— 你在编辑器里写下的，
            就是 AI 助手回答你时所依据的。
          </p>
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
              <p className="mt-3 font-semibold text-slate-900">Web UI</p>
              <p className="mt-1 text-xs text-slate-500">编辑器 · AI 侧栏 · 管理台</p>
            </div>
            <div className="flex items-center justify-center text-slate-300 max-md:rotate-90">
              <ArrowLeftRight className="h-5 w-5" />
            </div>
            {/* 核心存储 */}
            <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl bg-slate-950 px-5 py-8 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 to-blue-600/10" />
              <ShieldCheck className="relative h-7 w-7 text-cyan-300" strokeWidth={1.6} />
              <p className="relative mt-3 font-semibold text-white">权限受控的知识存储</p>
              <p className="relative mt-1 font-mono text-xs text-cyan-300/80">
                不可变修订 · 软删除 · 全文检索
              </p>
            </div>
            <div className="flex items-center justify-center text-slate-300 max-md:rotate-90">
              <ArrowLeftRight className="h-5 w-5" />
            </div>
            {/* MCP */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-50/60 px-5 py-8 text-center">
              <Bot className="h-7 w-7 text-cyan-600" strokeWidth={1.6} />
              <p className="mt-3 font-semibold text-slate-900">MCP Server</p>
              <p className="mt-1 text-xs text-slate-500">search · read · write</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-slate-400">可接入：</span>
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
          <h3 className="text-xl font-bold text-slate-900">两种写作模式，随时切换</h3>
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
          <p className="mt-4 text-xs text-slate-400">
            模式切换由事务化迁移完成：切换期间内容只读，路径冲突自动处理并在管理台报告。
          </p>
        </div>
      </div>
    </section>
  )
}
