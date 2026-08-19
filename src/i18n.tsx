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
      const q = new URLSearchParams(window.location.search).get('lang')
      if (q === 'zh' || q === 'en') return q
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
    // Docs pages manage their own per-page titles.
    if (!window.location.pathname.startsWith('/docs')) {
      document.title = dict[lang]['meta.title']
    }
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
  'nav.demo': 'Live Demo',
  'nav.features': 'Features',
  'nav.ai': 'AI-Native',
  'nav.stack': 'Stack',
  'nav.quickstart': 'Quick Start',

  // Hero
  'hero.badge': 'Open Source · Self-hosted · AI-Native',
  'hero.title.a': 'An AI-native vault that',
  'hero.title.b': 'grows with you',
  'hero.title.c': '',
  'hero.sub': 'A self-hosted, private knowledge vault where conversations and sources become durable, searchable memory — and every AI assistant grounds on what you built. One command to run, never locked to a single vendor.',
  'hero.sub.tail': '',
  'hero.cta.repo': 'GitHub Repo',
  'hero.cta.start': 'Quick Start',
  'hero.term.seeded': '# Seeds itself on first run',
  'hero.term.mcp': 'MCP tools online — Claude / Cursor can ground on this wiki',

  // Features stats
  'stats.1.value': '1 command',
  'stats.1.label': 'docker compose up to launch',
  'stats.2.value': 'MCP-native',
  'stats.2.label': 'every AI client reads the same store',
  'stats.3.value': '100%',
  'stats.3.label': 'every save is an immutable revision',
  'stats.4.value': '3 spaces',
  'stats.4.label': 'raw → generated → public memory model',

  // Features
  'features.kicker': '// Why next-wiki',
  'features.title': 'Not a wiki with an AI button — a wiki built around AI',
  'features.sub': 'Most wikis store pages; most AI assistants answer questions. next-wiki joins the two into a governed knowledge loop — with ownership, evidence, and revisions always visible.',

  'f.1.title': 'Build your wiki by talking',
  'f.1.desc': 'A persistent Wiki AI chat, grounded in hybrid keyword + semantic retrieval with visible citations, drafts pages, restructures the tree, translates, and curates through dialogue — with live tool-call status and durable chat sessions.',
  'f.2.title': 'A long-term AI memory',
  'f.2.desc': 'LLM Wiki mode keeps append-only raw evidence (text plus original bytes: PDF, HTML, logs) separate from AI-generated concepts and the curated public wiki — knowledge grows instead of decaying, and outlives any single AI vendor.',
  'f.3.title': 'AI that acts, with boundaries',
  'f.3.desc': 'A built-in MCP-compatible toolset lets AI read, draft, and organize over the same permission-checked services as the web UI — with risk policies, admin proposal review, tool evidence, and audit events.',
  'f.4.title': 'One store, every client',
  'f.4.desc': 'Web UI, REST API, the packaged MCP server (Claude Code, Cursor, OpenCode, OpenClaw), and Feishu all resolve through one permission model — what you write is exactly what every assistant grounds on.',
  'f.5.title': 'Everything is versioned',
  'f.5.desc': 'Every save creates an immutable revision; deletion is soft by default; diffs between any two revisions are always available — the audit trail for both humans and agents.',
  'f.6.title': 'Git-backed portability',
  'f.6.desc': 'Published content can sync one-way to a Git repository with scheduled reconciliation and sync-on-publish; versioned ZIP export and Wiki.js migration are built in.',
  'f.7.title': 'Open standards, any provider',
  'f.7.desc': 'REST + OpenAPI content API, Markdown + frontmatter export, and a provider registry spanning OpenAI-compatible, OpenRouter, Anthropic, Kimi, Z.ai, and more.',
  'f.8.title': 'Optional Feishu integration',
  'f.8.desc': 'Bind your Wiki account, ask grounded questions, and receive event notifications inside Feishu. An in-process module that stays inert until configured.',

  // AI-Native
  'ai.kicker': '// AI-Native architecture',
  'ai.title': 'A governed knowledge loop, not a chat box',
  'ai.sub': 'Conversations and sources become append-only raw evidence; AI retrieves, synthesizes, and drafts; humans review and publish — durable, searchable wiki memory with every boundary visible.',
  'ai.webui': 'Web UI',
  'ai.webui.sub': 'Editor · AI side pane · Admin',
  'ai.store': 'Permission-scoped memory store',
  'ai.store.sub': 'raw evidence · generated concepts · public wiki',
  'ai.mcp.sub': 'MCP & Skill · 26 tools · proposals',
  'ai.clients': 'Works with:',
  'ai.client.future': 'Future AI assistants',
  'ai.client.mcp': 'MCP-compatible clients',

  'ai.loop.title': 'The knowledge loop',
  'ai.loop.1': 'Conversation / source / command output',
  'ai.loop.2': 'Raw, append-only evidence',
  'ai.loop.3': 'AI retrieval, synthesis & drafts',
  'ai.loop.4': 'Human review & publication',
  'ai.loop.5': 'Durable, searchable wiki memory',
  'ai.modes.title': 'Two writing modes, switch anytime',
  'ai.mode.1.tag': 'Conventional wiki',
  'ai.mode.1.desc': 'Humans and AI collaborate in the default wiki space — drafts and publication remain the primary workflow.',
  'ai.mode.2.tag': 'Evidence-first memory',
  'ai.mode.2.desc': 'raw stores append-only source material with original bytes, generated stores AI-produced concepts with provenance, and default stays the curated public wiki — publish concepts via soft links.',
  'ai.modes.note': 'Mode switches run as a transactional migration: content is read-only while pending, path conflicts get deterministic suffixes and are reported in the admin UI.',

  // Live demo
  'demo.kicker': '// Show, don\'t tell',
  'demo.title': 'Try it live — no signup, no install',
  'demo.sub': 'A real running next-wiki instance, seeded with sample content, embedded right here. It is a genuine app, not a recorded walkthrough — click through pages, search, and the AI chat exactly as a self-hosted install would behave.',
  'demo.open': 'Open in new tab',
  'demo.readonly': 'Read-only demo',
  'demo.loading': 'Loading live demo…',
  'demo.timeout': 'Taking longer than expected to load.',

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

  'cta.title': 'An AI memory you can run, inspect, and export',
  'cta.sub': 'Apache-2.0 licensed. Stars, issues, and contributions are welcome.',
  'cta.button': 'Visit GitHub',

  // Footer
  'footer.tag': 'A personal, AI-native knowledge vault',
  'footer.by': 'Built by',

  'nav.home': 'hugogu.cn',
  'nav.docs': 'Docs',
  'docs.home': 'Home',
  'docs.prev': 'Previous',
  'docs.next': 'Next',
}

const zh: Dict = {
  'meta.title': 'next-wiki · 个人的 AI 原生知识资产库',

  'nav.demo': '在线演示',
  'nav.features': '特性',
  'nav.ai': 'AI 原生',
  'nav.stack': '技术栈',
  'nav.quickstart': '快速开始',

  'hero.badge': '开源 · 自托管 · AI-Native',
  'hero.title.a': '一个与你',
  'hero.title.b': '共成长',
  'hero.title.c': '的 AI 原生知识库',
  'hero.sub': '一个自托管的私密知识库：对话与素材沉淀为耐久、可检索的记忆，每个 AI 助手都基于你所建设的来作答。一条命令即可运行，永不锁定于单一厂商。',
  'hero.sub.tail': '',
  'hero.cta.repo': 'GitHub 仓库',
  'hero.cta.start': '快速开始',
  'hero.term.seeded': '# 首次运行自动完成初始化',
  'hero.term.mcp': 'MCP 工具已就绪 — Claude / Cursor 可基于本 Wiki 作答',

  'stats.1.value': '1 条命令',
  'stats.1.label': 'docker compose up 启动',
  'stats.2.value': 'MCP 原生',
  'stats.2.label': '所有 AI 客户端共读同一存储',
  'stats.3.value': '100%',
  'stats.3.label': '每次保存生成不可变修订',
  'stats.4.value': '3 个空间',
  'stats.4.label': 'raw → generated → 公开 的记忆模型',

  'features.kicker': '// 为什么是 next-wiki',
  'features.title': '不是给 wiki 加 AI 按钮，而是围绕 AI 建造的 wiki',
  'features.sub': '多数 wiki 擅长存页面，多数 AI 助手擅长答问题 —— next-wiki 把两者连成一个受治理的知识闭环，所有权、证据与修订始终可见。',

  'f.1.title': '用对话建设 Wiki',
  'f.1.desc': '常驻 Wiki AI 对话基于关键字 + 语义混合检索并展示引用来源，可通过对话起草页面、重组目录树、翻译与策展 —— 工具调用状态实时可见，会话可保存、可分享、可恢复。',
  'f.2.title': 'AI 的长期记忆',
  'f.2.desc': 'LLM Wiki 模式把只追加的 raw 证据（文本 + PDF/HTML/日志等原始字节）与 AI 生成概念、策展后的公开 wiki 分离 —— 知识持续增长而非衰减，比任何单一 AI 厂商活得更久。',
  'f.3.title': '能动手、有边界的 AI',
  'f.3.desc': '内置 MCP 兼容工具集让 AI 在与 Web UI 相同的权限受检服务上读取、起草、组织 —— 风险策略、管理员提案审查、工具证据与审计事件一应俱全。',
  'f.4.title': '一个存储，所有客户端',
  'f.4.desc': 'Web UI、REST API、独立 MCP server（Claude Code、Cursor、OpenCode、OpenClaw）与飞书都解析到同一套权限模型 —— 你写下的，就是每个 AI 助手回答时所依据的。',
  'f.5.title': '一切皆有版本',
  'f.5.desc': '每次保存都生成不可变修订；删除默认软删除；任意两个修订之间的 diff 随时可查 —— 人类与 AI 共同的审计轨迹。',
  'f.6.title': 'Git 可携带性',
  'f.6.desc': '已发布内容可单向同步到 Git 仓库，支持定时对账与发布即同步；版本化 ZIP 导出与 Wiki.js 迁移开箱即用。',
  'f.7.title': '开放标准，任意提供商',
  'f.7.desc': 'REST + OpenAPI 内容 API、Markdown + frontmatter 导出；提供商注册表覆盖 OpenAI 兼容、OpenRouter、Anthropic、Kimi、Z.ai 等。',
  'f.8.title': '可选飞书集成',
  'f.8.desc': '在飞书中绑定账号、基于知识库提问、接收事件通知。作为应用内进程模块存在，未配置前完全惰性。',

  'ai.kicker': '// AI-Native 架构',
  'ai.title': '受治理的知识闭环，而不是一个聊天框',
  'ai.sub': '对话与素材成为只追加的 raw 证据；AI 检索、综合、起草；人类审查并发布 —— 耐久、可检索的 wiki 记忆，每个边界都清晰可见。',
  'ai.webui': 'Web UI',
  'ai.webui.sub': '编辑器 · AI 侧栏 · 管理台',
  'ai.store': '权限受控的记忆存储',
  'ai.store.sub': 'raw 证据 · 生成概念 · 公开 wiki',
  'ai.mcp.sub': 'MCP & Skill · 26 个工具 · 提案审查',
  'ai.clients': '可接入：',
  'ai.client.future': '未来的 AI 助手',
  'ai.client.mcp': 'MCP 兼容客户端',

  'ai.loop.title': '知识闭环',
  'ai.loop.1': '对话 / 素材 / 命令输出',
  'ai.loop.2': '只追加的 raw 证据',
  'ai.loop.3': 'AI 检索、综合与起草',
  'ai.loop.4': '人工审查与发布',
  'ai.loop.5': '耐久、可检索的 wiki 记忆',
  'ai.modes.title': '两种写作模式，随时切换',
  'ai.mode.1.tag': '常规协作 wiki',
  'ai.mode.1.desc': '人类与 AI 在同一个默认 wiki 空间协作 —— 草稿与发布仍是主要工作流。',
  'ai.mode.2.tag': '证据优先的记忆',
  'ai.mode.2.desc': 'raw 存放带原始字节的只追加素材，generated 存放带来源的 AI 生成概念，default 保持为策展后的公开 wiki —— 概念可通过软链接发布。',
  'ai.modes.note': '模式切换由事务化迁移完成：切换期间内容只读，路径冲突自动添加确定性后缀并在管理台报告。',

  'demo.kicker': '// 眼见为实',
  'demo.title': '在线试用 —— 无需注册、无需安装',
  'demo.sub': '这是一个真实运行、预置了示例内容的 next-wiki 实例，直接嵌入在本页中 —— 是真实应用，不是录制的演示视频。可以像自托管实例一样浏览页面、搜索、体验 AI 对话。',
  'demo.open': '在新标签页打开',
  'demo.readonly': '只读演示',
  'demo.loading': '正在加载在线演示…',
  'demo.timeout': '加载时间比预期长。',

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

  'cta.title': '一个可运行、可检视、可导出的 AI 记忆',
  'cta.sub': 'Apache-2.0 开源协议，欢迎 Star、提 Issue 或贡献代码。',
  'cta.button': '前往 GitHub',

  'nav.docs': '文档',
  'docs.home': '首页',
  'docs.prev': '上一页',
  'docs.next': '下一页',
  'footer.tag': '个人的 AI 原生知识资产库',
  'footer.by': '作者',

  'nav.home': 'hugogu.cn',
}

export const dict: Record<Lang, Dict> = { en, zh }
