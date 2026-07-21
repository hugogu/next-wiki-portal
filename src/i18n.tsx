import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'zh'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const LangContext = createContext<LangContextValue | null>(null)

const STORAGE_KEY = 'next-wiki-portal-lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved === 'zh' ? 'zh' : 'en'
    } catch {
      return 'en'
    }
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
    document.title = dict[lang]['meta.title']
  }, [lang])

  const t = (key: string) => dict[lang][key] ?? dict.en[key] ?? key

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}

type Dict = Record<string, string>

const en: Dict = {
  'meta.title': 'next-wiki · Personal AI-Native Knowledge Vault',

  // Navbar
  'nav.features': 'Features',
  'nav.ai': 'AI-Native',
  'nav.stack': 'Stack',
  'nav.quickstart': 'Quick Start',

  // Hero
  'hero.badge': 'Open Source · Self-hosted · AI-Native',
  'hero.title.a': 'A personal,',
  'hero.title.b': 'AI-native',
  'hero.title.c': 'knowledge vault',
  'hero.sub': 'Write and organize knowledge with AI — and let that same knowledge base become the grounding memory any AI assistant reads from when it talks with you. Self-hosted with one',
  'hero.sub.tail': 'and never locked to a single AI vendor.',
  'hero.cta.repo': 'GitHub Repo',
  'hero.cta.start': 'Quick Start',
  'hero.term.seeded': '# Seeds itself on first run',
  'hero.term.mcp': 'MCP server online — readable & writable by Claude / Cursor',

  // Features stats
  'stats.1.value': '1 command',
  'stats.1.label': 'docker compose up to launch',
  'stats.2.value': '1 dependency',
  'stats.2.label': 'PostgreSQL is the only required service',
  'stats.3.value': '100%',
  'stats.3.label': 'every save is an immutable revision',
  'stats.4.value': '0 lock-in',
  'stats.4.label': 'open standards, free export',

  // Features
  'features.kicker': '// Why next-wiki',
  'features.title': 'Designed for personal knowledge in the AI era',
  'features.sub': 'Not an AI button bolted onto an old wiki — AI is a first-class citizen across creation, storage, and delivery.',

  'f.1.title': 'AI-native creation',
  'f.1.desc': 'A persistent AI chat side pane and an MCP server are the default way to draft pages, restructure the page tree, and refine content — while the manual editor stays fully capable, and the wiki never depends on a live model connection.',
  'f.2.title': 'Portable AI memory',
  'f.2.desc': 'Any MCP-compatible client (Claude, Cursor, or a future assistant) can search, read, and write into the same permission-scoped store — your knowledge outlives any single AI vendor.',
  'f.3.title': 'Personal by default',
  'f.3.desc': 'Built for personal knowledge assets: zero-config full read/write for a single owner. No multi-user or organization concepts to learn — sharing stays an optional add-on.',
  'f.4.title': 'Simple deployment',
  'f.4.desc': 'PostgreSQL is the only required stateful service. Object storage, MCP, and multi-user sharing are opt-in profiles — the default footprint never grows.',
  'f.5.title': 'Everything is versioned',
  'f.5.desc': 'Every save creates an immutable revision; deletion is soft by default; diffs between any two revisions are always available.',
  'f.6.title': 'Fast public reading',
  'f.6.desc': 'Published documents and navigation are served via static/ISR delivery; login controls hydrate separately — readers never wait on a session or a database query.',
  'f.7.title': 'Open standards',
  'f.7.desc': 'A REST + OpenAPI public content API, OAuth2/OIDC federated auth, and Markdown + frontmatter export — no proprietary lock-in on the critical path.',
  'f.8.title': 'Optional Feishu integration',
  'f.8.desc': 'Bind your Wiki account, ask grounded questions, and receive event notifications inside Feishu. An in-process module that stays inert until configured.',

  // AI-Native
  'ai.kicker': '// AI-Native architecture',
  'ai.title': 'One knowledge base, read and written by humans and AI alike',
  'ai.sub': 'The Web UI and MCP clients talk to the same permission-scoped store — what you write in the editor is exactly what your AI assistant grounds its answers on.',
  'ai.webui': 'Web UI',
  'ai.webui.sub': 'Editor · AI side pane · Admin',
  'ai.store': 'Permission-scoped knowledge store',
  'ai.store.sub': 'Immutable revisions · Soft delete · Full-text search',
  'ai.mcp.sub': 'search · read · write',
  'ai.clients': 'Works with:',
  'ai.client.future': 'Future AI assistants',
  'ai.client.mcp': 'MCP-compatible clients',

  'ai.modes.title': 'Two writing modes, switch anytime',
  'ai.mode.1.tag': 'Default · Simplest',
  'ai.mode.1.desc': 'Humans and AI collaborate in the same default wiki space — the simplest option for co-writing.',
  'ai.mode.2.tag': 'Advanced · Two spaces',
  'ai.mode.2.desc': 'Adds two admin-only spaces: raw for append-only source material, and generated for AI-produced OKF concepts — publish a generated concept to a public wiki path as a soft link.',
  'ai.modes.note': 'Mode switches run as a transactional migration: content is read-only while pending, path conflicts get deterministic suffixes and are reported in the admin UI.',

  // Tech stack
  'stack.kicker': '// Tech stack',
  'stack.title': 'Modern, restrained, all open source',
  'stack.sub': 'Only the necessary dependencies — every layer is a mainstream, replaceable open-source choice.',
  'stack.g1': 'App framework',
  'stack.g2': 'Data & jobs',
  'stack.g3': 'AI & rendering',
  'stack.g4': 'Engineering',

  // Quick start
  'qs.kicker': '// Quick start',
  'qs.title': 'Four steps to your own knowledge vault',
  'qs.s1.title': 'Clone the repo',
  'qs.s1.desc': 'All you need is Docker with Docker Compose.',
  'qs.s2.title': 'Configure env',
  'qs.s2.desc': 'Copy .env.example; adjust ports and the encryption key as needed.',
  'qs.s3.title': 'One-command launch',
  'qs.s3.desc': 'First run migrates the database and seeds itself automatically.',
  'qs.s4.title': 'Start writing',
  'qs.s4.desc': 'Open localhost:3000 and pick a writing mode — done.',
  'qs.term.open': '# Open your browser',
  'qs.copy': 'Copy',
  'qs.copied': 'Copied',

  'cta.title': 'Let your knowledge become AI’s long-term memory',
  'cta.sub': 'Apache-2.0 licensed. Stars, issues, and contributions are welcome.',
  'cta.button': 'Visit GitHub',

  // Footer
  'footer.tag': 'A personal, AI-native knowledge vault',
}

const zh: Dict = {
  'meta.title': 'next-wiki · 个人的 AI 原生知识资产库',

  'nav.features': '特性',
  'nav.ai': 'AI 原生',
  'nav.stack': '技术栈',
  'nav.quickstart': '快速开始',

  'hero.badge': '开源 · 自托管 · AI-Native',
  'hero.title.a': '个人的',
  'hero.title.b': 'AI 原生',
  'hero.title.c': '知识资产库',
  'hero.sub': '用 AI 书写与组织知识 —— 并让同一个知识库，成为任何 AI 助手与你对话时的记忆底座。一条',
  'hero.sub.tail': '即可自托管运行，永不锁定于单一 AI 厂商。',
  'hero.cta.repo': 'GitHub 仓库',
  'hero.cta.start': '快速开始',
  'hero.term.seeded': '# 首次运行自动完成初始化',
  'hero.term.mcp': 'MCP server online — Claude / Cursor 已可读写知识库',

  'stats.1.value': '1 条命令',
  'stats.1.label': 'docker compose up 启动',
  'stats.2.value': '1 个依赖',
  'stats.2.label': 'PostgreSQL 唯一必需服务',
  'stats.3.value': '100%',
  'stats.3.label': '每次保存生成不可变修订',
  'stats.4.value': '0 锁定',
  'stats.4.label': '开放标准，自由导出',

  'features.kicker': '// 为什么是 next-wiki',
  'features.title': '为「AI 时代的个人知识」而生的设计',
  'features.sub': '不是给旧 wiki 加一个 AI 按钮，而是从创作、存储到分发的每一层，都把 AI 当作一等公民。',

  'f.1.title': 'AI 原生创作',
  'f.1.desc': '常驻 AI 对话侧栏与 MCP server 是起草页面、重组目录树、打磨内容的默认方式；手动编辑器同样完整可用，wiki 从不依赖实时的模型连接。',
  'f.2.title': '可携带的 AI 记忆',
  'f.2.desc': '任何 MCP 兼容客户端（Claude、Cursor 或未来的助手）都能读写同一个权限受控的知识库 —— 你的知识比任何单一 AI 厂商活得更久。',
  'f.3.title': '个人优先',
  'f.3.desc': '面向个人知识资产设计：零配置即获得单用户完整读写，无需理解多用户、组织架构等概念；多人共享只是可选增强。',
  'f.4.title': '极简部署',
  'f.4.desc': 'PostgreSQL 是唯一必需的有状态服务。对象存储、MCP、多人共享均为可选 profile，默认占用永不膨胀。',
  'f.5.title': '一切皆有版本',
  'f.5.desc': '每次保存都生成不可变修订；删除默认软删除；任意两个修订之间的 diff 随时可查。',
  'f.6.title': '极速公开阅读',
  'f.6.desc': '公开文档与导航走静态 / ISR 分发，登录相关控件单独水合 —— 读者无需等待会话或数据库查询。',
  'f.7.title': '开放标准',
  'f.7.desc': 'REST + OpenAPI 公共内容 API、OAuth2 / OIDC 联邦认证、Markdown + frontmatter 导出，关键路径上没有任何专有锁定。',
  'f.8.title': '可选飞书集成',
  'f.8.desc': '在飞书中绑定账号、基于知识库提问、接收事件通知。作为应用内进程模块存在，未配置前完全惰性。',

  'ai.kicker': '// AI-Native 架构',
  'ai.title': '一个知识库，人类与 AI 共同读写',
  'ai.sub': 'Web UI 与 MCP 客户端访问的是同一个权限受控的存储 —— 你在编辑器里写下的，就是 AI 助手回答你时所依据的。',
  'ai.webui': 'Web UI',
  'ai.webui.sub': '编辑器 · AI 侧栏 · 管理台',
  'ai.store': '权限受控的知识存储',
  'ai.store.sub': '不可变修订 · 软删除 · 全文检索',
  'ai.mcp.sub': 'search · read · write',
  'ai.clients': '可接入：',
  'ai.client.future': '未来的 AI 助手',
  'ai.client.mcp': 'MCP 兼容客户端',

  'ai.modes.title': '两种写作模式，随时切换',
  'ai.mode.1.tag': '默认 · 最简单',
  'ai.mode.1.desc': '人类与 AI 在同一个默认 wiki 空间中协作编辑，适合纯协作写作场景。',
  'ai.mode.2.tag': '进阶 · 双空间',
  'ai.mode.2.desc': '新增两个管理员专属空间：raw 存放只追加的原始素材，generated 存放 AI 生成的 OKF 概念；生成的概念可作为软链接发布到公开 wiki 路径。',
  'ai.modes.note': '模式切换由事务化迁移完成：切换期间内容只读，路径冲突自动添加确定性后缀并在管理台报告。',

  'stack.kicker': '// 技术栈',
  'stack.title': '现代、克制、全部开源',
  'stack.sub': '只保留必要的依赖，每一层都是主流且可替换的开源方案。',
  'stack.g1': '应用框架',
  'stack.g2': '数据与任务',
  'stack.g3': 'AI 与内容渲染',
  'stack.g4': '工程化',

  'qs.kicker': '// 快速开始',
  'qs.title': '四步，拥有自己的知识库',
  'qs.s1.title': '克隆仓库',
  'qs.s1.desc': '只需要本机装有 Docker 与 Docker Compose。',
  'qs.s2.title': '配置环境',
  'qs.s2.desc': '复制 .env.example，按需调整端口与加密密钥。',
  'qs.s3.title': '一键启动',
  'qs.s3.desc': '首次运行自动完成数据库迁移与初始化播种。',
  'qs.s4.title': '开始写作',
  'qs.s4.desc': '打开 localhost:3000，选择写作模式即可使用。',
  'qs.term.open': '# 打开浏览器',
  'qs.copy': '复制',
  'qs.copied': '已复制',

  'cta.title': '让你的知识，成为 AI 的长期记忆',
  'cta.sub': 'Apache-2.0 开源协议，欢迎 Star、提 Issue 或贡献代码。',
  'cta.button': '前往 GitHub',

  'footer.tag': '个人的 AI 原生知识资产库',
}

export const dict: Record<Lang, Dict> = { en, zh }
