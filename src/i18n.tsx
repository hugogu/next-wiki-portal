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
  'meta.title': 'next-wiki · Private Agent Context & Memory Hub',

  // Navbar
  'nav.demo': 'Live Demo',
  'nav.features': 'Features',
  'nav.ai': 'Agent Context',
  'nav.stack': 'Stack',
  'nav.quickstart': 'Quick Start',

  // Hero
  'hero.badge': 'Open Source · Self-hosted · Agent Context',
  'hero.title.a': 'Your private',
  'hero.title.b': 'Agent context',
  'hero.title.c': 'and memory hub',
  'hero.sub': 'Give every Agent a clear identity, rules, configuration, and memory — keep private context private and share only what you approve. Self-hosted with one command and open to any MCP-compatible client.',
  'hero.sub.tail': '',
  'hero.cta.repo': 'GitHub Repo',
  'hero.cta.start': 'Quick Start',
  'hero.term.seeded': '# One owner, multiple named Agents',
  'hero.term.mcp': 'Agent context via MCP — scoped, retrievable, auditable',

  // Features stats
  'stats.1.value': '1 command',
  'stats.1.label': 'docker compose up to launch your hub',
  'stats.2.value': 'MCP-native',
  'stats.2.label': 'every AI client reads the same store',
  'stats.3.value': '100%',
  'stats.3.label': 'every save is an immutable revision',
  'stats.4.value': '3 spaces',
  'stats.4.label': 'raw → generated → public context model',

  // Features
  'features.kicker': '// Why next-wiki',
  'features.title': 'A private context hub for your Agent fleet',
  'features.sub': 'Keep the owner in control while giving every Agent a durable, reviewable context layer — from rules and configuration to evidence, memory, and selectively published knowledge.',

  'f.1.title': 'AI-native capture',
  'f.1.desc': 'Use the AI side pane, MCP, or the manual editor to capture conversations, source material, decisions, and durable knowledge without making a live model connection a requirement.',
  'f.2.title': 'Typed Agent context',
  'f.2.desc': 'Organize rules, non-secret configuration, procedures, episodic memory, source evidence, and curated knowledge as distinct context instead of one undifferentiated note pile.',
  'f.3.title': 'One owner, many Agents',
  'f.3.desc': 'The product model is one owner with multiple explicit Agent identities. Each Agent can keep private context, while shared namespaces are deliberate, reviewable, and auditable.',
  'f.4.title': 'Private by default',
  'f.4.desc': 'Self-host the store and keep private context inside its intended scope. PostgreSQL is the only required stateful service; integrations remain optional.',
  'f.5.title': 'Every change has a trail',
  'f.5.desc': 'Immutable revisions, soft deletion, diffs, and source attribution make it possible to understand what changed, where it came from, and how to roll it back.',
  'f.6.title': 'Selective publication',
  'f.6.desc': 'Publish an explicitly selected and reviewed context pack, not an accidental mirror of private memory. Public reading stays separate from the owner’s working context.',
  'f.7.title': 'Open Agent surfaces',
  'f.7.desc': 'MCP, REST + OpenAPI, and Markdown + frontmatter keep context portable across Agent clients, local tools, and future runtimes.',
  'f.8.title': 'Grounded integrations',
  'f.8.desc': 'Connect optional integrations such as Feishu to ask grounded questions and receive events, while the core context store remains independent of any one platform.',

  // Agent Context
  'ai.kicker': '// Agent Context architecture',
  'ai.title': 'One owner, many Agents, one governed context layer',
  'ai.sub': 'The Web UI, owner workflows, and MCP-connected Agents resolve context from the same permission-scoped store. Private context stays scoped; shared namespaces are explicit, versioned, and reviewable.',
  'ai.webui': 'Owner workspace',
  'ai.webui.sub': 'Rules · config · memory · publishing',
  'ai.store': 'Scoped context hub',
  'ai.store.sub': 'Typed context · revisions · provenance',
  'ai.mcp.sub': 'retrieve · propose · write',
  'ai.clients': 'Connects to:',
  'ai.client.future': 'OpenClaw',
  'ai.client.mcp': 'Any MCP client',

  'ai.loop.title': 'The context loop',
  'ai.loop.1': 'Conversation / source / command output',
  'ai.loop.2': 'Scoped, append-only evidence',
  'ai.loop.3': 'Agent retrieval, synthesis & drafts',
  'ai.loop.4': 'Owner review & publication',
  'ai.loop.5': 'Durable, searchable Agent context',
  'ai.modes.title': 'Two ways to grow context today',
  'ai.mode.1.tag': 'Default · Collaborative',
  'ai.mode.1.desc': 'Humans and AI collaborate in the default wiki space — the simplest way to turn conversations and working notes into durable context.',
  'ai.mode.2.tag': 'Advanced · Evidence pipeline',
  'ai.mode.2.desc': 'Keep append-only source material separate from AI-produced concepts so evidence, synthesis, and selective publication can be reviewed independently.',
  'ai.modes.note': 'These current content modes are the foundation for Agent-specific context, explicit shared namespaces, and version-aware context packs.',

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
  'qs.title': 'Four steps to your own private context hub',
  'qs.s1.title': 'Clone the repo',
  'qs.s1.desc': 'All you need is Docker with Docker Compose.',
  'qs.s2.title': 'Configure env',
  'qs.s2.desc': 'Copy .env.example; adjust ports and the encryption key as needed.',
  'qs.s3.title': 'One-command launch',
  'qs.s3.desc': 'First run migrates the database and seeds itself automatically.',
  'qs.s4.title': 'Start building context',
  'qs.s4.desc': 'Open localhost:3000, choose a writing mode, and connect an MCP client when you are ready.',
  'qs.term.open': '# Open your browser',
  'qs.copy': 'Copy',
  'qs.copied': 'Copied',

  'cta.title': 'Give every Agent context you can govern',
  'cta.sub': 'Private by default, explicit when shared, portable when published. Apache-2.0 licensed — stars, issues, and contributions are welcome.',
  'cta.button': 'Visit GitHub',

  // Footer
  'footer.tag': 'A private Agent context & memory hub',
  'footer.by': 'Built by',

  'nav.home': 'hugogu.cn',
  'nav.docs': 'Docs',
  'docs.home': 'Home',
  'docs.prev': 'Previous',
  'docs.next': 'Next',
}

const zh: Dict = {
  'meta.title': 'next-wiki · 私有 Agent 上下文与记忆中枢',

  'nav.demo': '在线演示',
  'nav.features': '特性',
  'nav.ai': 'Agent 上下文',
  'nav.stack': '技术栈',
  'nav.quickstart': '快速开始',

  'hero.badge': '开源 · 自托管 · Agent 上下文',
  'hero.title.a': '面向个人 Agent 群的',
  'hero.title.b': '上下文与',
  'hero.title.c': '记忆中枢',
  'hero.sub': '为每个 Agent 管理清晰的身份、规则、配置与记忆 —— 私有上下文默认留在自己的范围内，只把你批准的内容共享出去。自托管只需一条命令，并可接入任何 MCP 兼容客户端。',
  'hero.sub.tail': '',
  'hero.cta.repo': 'GitHub 仓库',
  'hero.cta.start': '快速开始',
  'hero.term.seeded': '# 一个 owner，多个人格清晰的 Agent',
  'hero.term.mcp': 'Agent 上下文已通过 MCP 提供 — 按范围、可检索、可审计',

  'stats.1.value': '1 条命令',
  'stats.1.label': 'docker compose 启动你的中枢',
  'stats.2.value': 'MCP 原生',
  'stats.2.label': '所有 AI 客户端共读同一存储',
  'stats.3.value': '100%',
  'stats.3.label': '每次保存生成不可变修订',
  'stats.4.value': '3 个空间',
  'stats.4.label': 'raw → generated → 公开的上下文模型',

  'features.kicker': '// 为什么是 next-wiki',
  'features.title': '为个人 Agent 群打造的私有上下文中枢',
  'features.sub': '让 owner 保持控制，同时为每个 Agent 提供持久、可审阅的上下文层：从规则与配置，到证据、记忆和选择性公开的知识。',

  'f.1.title': 'AI 原生捕获',
  'f.1.desc': '通过 AI 侧栏、MCP 或手动编辑器沉淀对话、原始素材、决策与长期知识，同时不把实时模型连接变成可读、可编辑的前提。',
  'f.2.title': '有类型的 Agent 上下文',
  'f.2.desc': '把规则、非敏感配置、流程、情景记忆、来源证据和精选知识区分管理，而不是把所有内容混成一堆笔记。',
  'f.3.title': '一个 owner，多个 Agent',
  'f.3.desc': '产品模型是一个 owner 管理多个明确身份的 Agent。每个 Agent 可以保留私有上下文，共享命名空间则必须明确、可审阅、可审计。',
  'f.4.title': '默认私有',
  'f.4.desc': '自托管存储，让私有上下文留在它所属的范围内。PostgreSQL 是唯一必需的有状态服务，其他集成均为可选。',
  'f.5.title': '每次变更都有轨迹',
  'f.5.desc': '不可变修订、软删除、diff 与来源归因，让你知道改了什么、来自哪里，以及如何回退。',
  'f.6.title': '选择性公开',
  'f.6.desc': '只发布明确选择并经过审阅的上下文包，而不是意外镜像私有记忆。公开阅读与 owner 的工作上下文保持分离。',
  'f.7.title': '开放的 Agent 接口',
  'f.7.desc': 'MCP、REST + OpenAPI 与 Markdown + frontmatter 让上下文可以在 Agent 客户端、本地工具和未来运行时之间自由迁移。',
  'f.8.title': '有依据的集成',
  'f.8.desc': '按需连接飞书等集成，在其中提出有知识依据的问题并接收事件，同时让核心上下文存储独立于任何单一平台。',

  'ai.kicker': '// Agent Context 架构',
  'ai.title': '一个 owner，多个 Agent，一层可治理的上下文',
  'ai.sub': 'Web UI、owner 工作流与接入 MCP 的 Agent 访问同一个权限受控的存储。私有上下文按范围隔离，共享命名空间明确、可版本化、可审阅。',
  'ai.webui': 'Owner 工作区',
  'ai.webui.sub': '规则 · 配置 · 记忆 · 发布',
  'ai.store': '作用域上下文中枢',
  'ai.store.sub': '有类型上下文 · 修订 · 来源',
  'ai.mcp.sub': '检索 · 提议 · 写入',
  'ai.clients': '可接入：',
  'ai.client.future': 'OpenClaw',
  'ai.client.mcp': '任意 MCP 客户端',

  'ai.loop.title': '上下文闭环',
  'ai.loop.1': '对话 / 素材 / 命令输出',
  'ai.loop.2': '按范围管理的只追加证据',
  'ai.loop.3': 'Agent 检索、综合与起草',
  'ai.loop.4': 'Owner 审阅与发布',
  'ai.loop.5': '耐久、可检索的 Agent 上下文',
  'ai.modes.title': '今天就能使用的两种上下文增长方式',
  'ai.mode.1.tag': '默认 · 协作式',
  'ai.mode.1.desc': '人类与 AI 在默认 wiki 空间中协作，把对话与工作笔记沉淀为可长期复用的上下文。',
  'ai.mode.2.tag': '进阶 · 证据流水线',
  'ai.mode.2.desc': '把只追加的原始素材与 AI 生成的概念分开，让证据、综合与选择性公开可以独立审阅。',
  'ai.modes.note': '当前内容模式是 Agent 私有上下文、明确共享命名空间与版本化上下文包的基础。',

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
  'qs.title': '四步，拥有自己的私有上下文中枢',
  'qs.s1.title': '克隆仓库',
  'qs.s1.desc': '只需要本机装有 Docker 与 Docker Compose。',
  'qs.s2.title': '配置环境',
  'qs.s2.desc': '复制 .env.example，按需调整端口与加密密钥。',
  'qs.s3.title': '一键启动',
  'qs.s3.desc': '首次运行自动完成数据库迁移与初始化播种。',
  'qs.s4.title': '开始构建上下文',
  'qs.s4.desc': '打开 localhost:3000，选择写作模式，并在准备好时接入 MCP 客户端。',
  'qs.term.open': '# 打开浏览器',
  'qs.copy': '复制',
  'qs.copied': '已复制',

  'cta.title': '让每个 Agent 都拥有你能治理的上下文',
  'cta.sub': '默认私有，明确共享，公开时保持可迁移。Apache-2.0 开源协议，欢迎 Star、提 Issue 或贡献代码。',
  'cta.button': '前往 GitHub',

  'nav.docs': '文档',
  'docs.home': '首页',
  'docs.prev': '上一页',
  'docs.next': '下一页',
  'footer.tag': '私有的 Agent 上下文与记忆中枢',
  'footer.by': '作者',

  'nav.home': 'hugogu.cn',
}

export const dict: Record<Lang, Dict> = { en, zh }
