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
  'meta.title': 'next-wiki · AI-Assisted Personal Knowledge Base',

  // Navbar
  'nav.demo': 'Live Demo',
  'nav.features': 'Features',
  'nav.ai': 'Agent Context',
  'nav.stack': 'Stack',
  'nav.quickstart': 'Quick Start',

  // Hero
  'hero.badge': 'Open Source · Self-hosted · AI-assisted Knowledge Base',
  'hero.badge.1': 'AI-assisted knowledge base',
  'hero.badge.2': 'Cross-Agent context',
  'hero.badge.3': 'Wiki + MCP',
  'hero.badge.4': 'Private by default',
  'hero.badge.5': 'Selective sharing',
  'hero.title.a': 'Your personal',
  'hero.title.b': 'knowledge base',
  'hero.title.c': 'for every Agent you run',
  'hero.sub': 'Capture notes, documents, conversations, rules, procedures, and source evidence in one private knowledge base. AI helps you organize and retrieve it, while each Agent gets only the context you allow. Share or publish selected knowledge when you choose.',
  'hero.sub.tail': '',
  'hero.cta.repo': 'GitHub Repo',
  'hero.cta.start': 'Quick Start',
  'hero.term.seeded': '# One knowledge base, multiple named Agents',
  'hero.term.mcp': '# MCP delivers the context each Agent is allowed to use',

  // Features stats
  'stats.1.value': '1 command',
  'stats.1.label': 'docker compose to launch your knowledge base',
  'stats.2.value': 'Wiki + MCP',
  'stats.2.label': 'one knowledge store for people and Agents',
  'stats.3.value': '100%',
  'stats.3.label': 'every save is an immutable revision',
  'stats.4.value': 'Private first',
  'stats.4.label': 'share only the context you approve',

  // Features
  'features.kicker': '// Why next-wiki',
  'features.title': 'An AI-assisted knowledge base for people and Agents',
  'features.sub': 'Write and organize knowledge like a wiki, then let every Agent retrieve the context it is allowed to use. Sources, revisions, memory, and sharing stay visible to the owner.',

  'f.1.title': 'AI-assisted knowledge capture',
  'f.1.desc': 'Use AI chat, MCP, or the manual editor to turn conversations, source material, decisions, and working notes into durable knowledge without making a live model connection a requirement.',
  'f.2.title': 'A real knowledge base',
  'f.2.desc': 'Keep Markdown pages, documents, source evidence, decisions, and revisions in a readable wiki with search, links, history, and citations.',
  'f.3.title': 'One knowledge base, many Agents',
  'f.3.desc': 'The product model is one owner with multiple explicit Agent identities. Each Agent can keep private context, while shared namespaces are deliberate, reviewable, and auditable.',
  'f.4.title': 'Private by default',
  'f.4.desc': 'Self-host the store and keep private context inside its intended scope. PostgreSQL is the only required stateful service; integrations remain optional.',
  'f.5.title': 'Every change has a trail',
  'f.5.desc': 'Immutable revisions, soft deletion, diffs, and source attribution make it possible to understand what changed, where it came from, and how to roll it back.',
  'f.6.title': 'Controlled sharing & publication',
  'f.6.desc': 'Share selected, reviewed knowledge as Agent context, a portable instruction file, or a public page — never as an accidental mirror of private memory.',
  'f.7.title': 'Open Agent access',
  'f.7.desc': 'MCP, REST + OpenAPI, and Markdown + frontmatter keep context portable across Agent clients, local tools, and future runtimes.',
  'f.8.title': 'Grounded integrations',
  'f.8.desc': 'Connect optional integrations such as Feishu to ask grounded questions and receive events, while the core context store remains independent of any one platform.',

  // Agent Context
  'ai.kicker': '// From knowledge to Agent context',
  'ai.title': 'One knowledge base, many Agents, controlled context',
  'ai.sub': 'The Web UI is for writing and reviewing knowledge. MCP-connected Agents use the same permission-scoped store, each receiving only the context its owner allows.',
  'ai.webui': 'Knowledge workspace',
  'ai.webui.sub': 'Wiki · AI chat · revisions',
  'ai.store': 'Context & memory layer',
  'ai.store.sub': 'Scopes · provenance · sharing',
  'ai.mcp.sub': 'retrieve · propose · write',
  'ai.clients': 'Connects to:',
  'ai.client.future': 'OpenClaw',
  'ai.client.mcp': 'Any MCP client',

  'ai.loop.title': 'The context loop',
  'ai.loop.1': 'Conversation / source / command output',
  'ai.loop.2': 'Knowledge captured with source and scope',
  'ai.loop.3': 'Agent retrieval, synthesis & drafts',
  'ai.loop.4': 'Owner review & selective sharing',
  'ai.loop.5': 'Knowledge you can reuse as Agent context',
  'ai.modes.title': 'Two ways to build knowledge today',
  'ai.mode.1.tag': 'Default · Knowledge base',
  'ai.mode.1.desc': 'Humans and AI collaborate in the default wiki space — the simplest way to turn conversations and working notes into durable context.',
  'ai.mode.2.tag': 'Advanced · Memory pipeline',
  'ai.mode.2.desc': 'Keep append-only source material separate from AI-produced concepts so evidence, synthesis, and selective publication can be reviewed independently.',
  'ai.modes.note': 'Both modes build toward Agent-specific context, explicit shared namespaces, and version-aware context packs.',

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
  'qs.title': 'Four steps to your own AI-assisted knowledge base',
  'qs.s1.title': 'Clone the repo',
  'qs.s1.desc': 'All you need is Docker with Docker Compose.',
  'qs.s2.title': 'Configure env',
  'qs.s2.desc': 'Copy .env.example; adjust ports and the encryption key as needed.',
  'qs.s3.title': 'One-command launch',
  'qs.s3.desc': 'First run migrates the database and seeds itself automatically.',
  'qs.s4.title': 'Start building knowledge',
  'qs.s4.desc': 'Open localhost:3000, write pages, let AI help, and connect an MCP client when you are ready.',
  'qs.term.open': '# Open your browser',
  'qs.copy': 'Copy',
  'qs.copied': 'Copied',

  'cta.title': 'Build knowledge once. Give every Agent the context it needs.',
  'cta.sub': 'Private by default, explicit when shared, portable when published. Apache-2.0 licensed — stars, issues, and contributions are welcome.',
  'cta.button': 'Visit GitHub',

  // Footer
  'footer.tag': 'An AI-assisted personal knowledge base for Agents',
  'footer.by': 'Built by',

  'nav.home': 'hugogu.cn',
  'nav.docs': 'Docs',
  'docs.home': 'Home',
  'docs.prev': 'Previous',
  'docs.next': 'Next',
}

const zh: Dict = {
  'meta.title': 'next-wiki · AI 辅助的个人知识库',

  'nav.demo': '在线演示',
  'nav.features': '特性',
  'nav.ai': 'Agent 上下文',
  'nav.stack': '技术栈',
  'nav.quickstart': '快速开始',

  'hero.badge': '开源 · 自托管 · AI 辅助知识库',
  'hero.badge.1': 'AI 辅助知识库',
  'hero.badge.2': '跨 Agent 上下文',
  'hero.badge.3': 'Wiki + MCP',
  'hero.badge.4': '默认私有',
  'hero.badge.5': '选择性共享',
  'hero.title.a': '你的个人',
  'hero.title.b': 'AI 知识库',
  'hero.title.c': '让每个 Agent 都获得正确上下文',
  'hero.sub': '在一个私有知识库中沉淀笔记、文档、对话、规则、流程与来源证据。AI 帮你组织和检索知识，每个 Agent 只能获取你允许的上下文；哪些内容共享或公开，由你决定。',
  'hero.sub.tail': '',
  'hero.cta.repo': 'GitHub 仓库',
  'hero.cta.start': '快速开始',
  'hero.term.seeded': '# 一个知识库，多个身份明确的 Agent',
  'hero.term.mcp': '# MCP 为每个 Agent 提供它被允许使用的上下文',

  'stats.1.value': '1 条命令',
  'stats.1.label': 'docker compose 启动你的知识库',
  'stats.2.value': 'Wiki + MCP',
  'stats.2.label': '人和 Agent 共用同一个知识存储',
  'stats.3.value': '100%',
  'stats.3.label': '每次保存生成不可变修订',
  'stats.4.value': '私有优先',
  'stats.4.label': '只共享你批准的上下文',

  'features.kicker': '// 为什么是 next-wiki',
  'features.title': '面向人和 Agent 的 AI 辅助知识库',
  'features.sub': '像使用 wiki 一样书写和组织知识，再让每个 Agent 按权限检索所需上下文。来源、修订、记忆和共享边界始终对 owner 可见。',

  'f.1.title': 'AI 辅助沉淀知识',
  'f.1.desc': '通过 AI 对话、MCP 或手动编辑器，把对话、原始素材、决策与工作笔记变成可长期复用的知识，同时不把实时模型连接变成使用前提。',
  'f.2.title': '真正的个人知识库',
  'f.2.desc': '用可阅读的 wiki 管理 Markdown 页面、文档、来源证据、决策与修订，并支持搜索、链接、历史和引用。',
  'f.3.title': '一个知识库，多个 Agent',
  'f.3.desc': '产品模型是一个 owner 管理多个明确身份的 Agent。每个 Agent 可以保留私有上下文，共享命名空间则必须明确、可审阅、可审计。',
  'f.4.title': '默认私有',
  'f.4.desc': '自托管存储，让私有上下文留在它所属的范围内。PostgreSQL 是唯一必需的有状态服务，其他集成均为可选。',
  'f.5.title': '每次变更都有轨迹',
  'f.5.desc': '不可变修订、软删除、diff 与来源归因，让你知道改了什么、来自哪里，以及如何回退。',
  'f.6.title': '受控共享与公开',
  'f.6.desc': '把明确选择并经过审阅的知识共享为 Agent 上下文、可携带的指令文件或公开页面，而不是意外镜像私有记忆。',
  'f.7.title': '开放的 Agent 接入',
  'f.7.desc': 'MCP、REST + OpenAPI 与 Markdown + frontmatter 让上下文可以在 Agent 客户端、本地工具和未来运行时之间自由迁移。',
  'f.8.title': '有依据的集成',
  'f.8.desc': '按需连接飞书等集成，在其中提出有知识依据的问题并接收事件，同时让核心上下文存储独立于任何单一平台。',

  'ai.kicker': '// 从知识到 Agent 上下文',
  'ai.title': '一个知识库，多个 Agent，受控的上下文',
  'ai.sub': 'Web UI 用来书写和审阅知识，接入 MCP 的 Agent 则访问同一个权限受控的存储，并且只能获得 owner 允许的上下文。',
  'ai.webui': '知识工作区',
  'ai.webui.sub': 'Wiki · AI 对话 · 修订',
  'ai.store': '上下文与记忆层',
  'ai.store.sub': '范围 · 来源 · 共享',
  'ai.mcp.sub': '检索 · 提议 · 写入',
  'ai.clients': '可接入：',
  'ai.client.future': 'OpenClaw',
  'ai.client.mcp': '任意 MCP 客户端',

  'ai.loop.title': '上下文闭环',
  'ai.loop.1': '对话 / 素材 / 命令输出',
  'ai.loop.2': '带来源和范围的知识沉淀',
  'ai.loop.3': 'Agent 检索、综合与起草',
  'ai.loop.4': 'Owner 审阅与选择性共享',
  'ai.loop.5': '可复用为 Agent 上下文的知识',
  'ai.modes.title': '今天就能使用的两种知识构建方式',
  'ai.mode.1.tag': '默认 · 知识库',
  'ai.mode.1.desc': '人类与 AI 在默认 wiki 空间中协作，把对话与工作笔记沉淀为可长期复用的上下文。',
  'ai.mode.2.tag': '进阶 · 记忆流水线',
  'ai.mode.2.desc': '把只追加的原始素材与 AI 生成的概念分开，让证据、综合与选择性公开可以独立审阅。',
  'ai.modes.note': '两种模式都会逐步连接到 Agent 私有上下文、明确共享命名空间与版本化上下文包。',

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
  'qs.title': '四步，拥有自己的 AI 辅助知识库',
  'qs.s1.title': '克隆仓库',
  'qs.s1.desc': '只需要本机装有 Docker 与 Docker Compose。',
  'qs.s2.title': '配置环境',
  'qs.s2.desc': '复制 .env.example，按需调整端口与加密密钥。',
  'qs.s3.title': '一键启动',
  'qs.s3.desc': '首次运行自动完成数据库迁移与初始化播种。',
  'qs.s4.title': '开始沉淀知识',
  'qs.s4.desc': '打开 localhost:3000，书写页面，让 AI 提供帮助，并在准备好时接入 MCP 客户端。',
  'qs.term.open': '# 打开浏览器',
  'qs.copy': '复制',
  'qs.copied': '已复制',

  'cta.title': '沉淀一次知识，让每个 Agent 获得所需上下文。',
  'cta.sub': '默认私有，明确共享，公开时保持可迁移。Apache-2.0 开源协议，欢迎 Star、提 Issue 或贡献代码。',
  'cta.button': '前往 GitHub',

  'nav.docs': '文档',
  'docs.home': '首页',
  'docs.prev': '上一页',
  'docs.next': '下一页',
  'footer.tag': '面向 Agent 的 AI 辅助个人知识库',
  'footer.by': '作者',

  'nav.home': 'hugogu.cn',
}

export const dict: Record<Lang, Dict> = { en, zh }
