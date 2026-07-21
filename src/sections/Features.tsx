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

const stats = [
  { value: '1 条命令', label: 'docker compose up 启动' },
  { value: '1 个依赖', label: 'PostgreSQL 唯一必需服务' },
  { value: '100%', label: '每次保存生成不可变修订' },
  { value: '0 锁定', label: '开放标准，自由导出' },
]

const features = [
  {
    icon: Sparkles,
    title: 'AI 原生创作',
    desc: '常驻 AI 对话侧栏与 MCP server 是起草页面、重组目录树、打磨内容的默认方式；手动编辑器同样完整可用，离线模型时 wiki 依旧可读、可搜、可编辑。',
  },
  {
    icon: Brain,
    title: '可携带的 AI 记忆',
    desc: '任何 MCP 兼容客户端（Claude、Cursor 或未来的助手）都能读写同一个权限受控的知识库 —— 你的知识比任何单一 AI 厂商活得更久。',
  },
  {
    icon: UserRound,
    title: '个人优先',
    desc: '面向个人知识资产设计：零配置即获得单用户完整读写，无需理解多用户、组织架构等概念即可上手；多人共享只是可选增强。',
  },
  {
    icon: Database,
    title: '极简部署',
    desc: 'PostgreSQL 是唯一必需的有状态服务。对象存储、MCP、多人共享均为可选 profile，默认占用永不膨胀。',
  },
  {
    icon: History,
    title: '一切皆有版本',
    desc: '每次保存都生成不可变修订；删除默认软删除；任意两个修订之间的 diff 随时可查。',
  },
  {
    icon: Zap,
    title: '极速公开阅读',
    desc: '公开文档与导航走静态 / ISR 分发，登录相关控件单独水合 —— 读者无需等待会话或数据库查询。',
  },
  {
    icon: Globe,
    title: '开放标准',
    desc: 'REST + OpenAPI 公共内容 API、OAuth2 / OIDC 联邦认证、Markdown + frontmatter 导出，关键路径上没有任何专有锁定。',
  },
  {
    icon: MessageSquareMore,
    title: '可选飞书集成',
    desc: '在飞书中绑定账号、基于知识库提问、接收事件通知。作为 Web 应用内进程模块存在，未配置前完全惰性。',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative bg-white py-24 md:py-32">
      {/* 数据条 */}
      <div className="mx-auto max-w-6xl px-6">
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
          <p className="font-mono text-sm text-cyan-600">// 为什么是 next-wiki</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            为「AI 时代的个人知识」而生的设计
          </h2>
          <p className="mt-4 leading-relaxed text-slate-500">
            不是给旧 wiki 加一个 AI 按钮，而是从创作、存储到分发的每一层，都把 AI 当作一等公民。
          </p>
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
