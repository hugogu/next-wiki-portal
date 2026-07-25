**next-wiki** 是一个自托管的、AI 原生的 wiki，用于把对话与素材沉淀为耐久知识。捕获你学到的东西、保留证据、让 AI 检索并组织它、成熟时发布为可读的 wiki —— 一个可运行、可检视、可导出、可接入任何兼容客户端的 AI 记忆。

> **项目状态：** 积极开发中，处于早期开源发布阶段，接口与配置可能演进。

## 为什么是 next-wiki

多数 wiki 擅长存页面，多数 AI 助手擅长答问题。next-wiki 把两者连成一个**受治理的知识闭环**：

```text
对话 / 素材 / 命令输出
              │
              ▼
       只追加的 raw 证据
              │
              ▼
    AI 检索、综合与起草
              │
              ▼
       人工审查与发布
              │
              ▼
    耐久、可检索的 wiki 记忆
```

目标不是把 AI agent 藏在聊天框后面，而是让知识对人和 agent 都有用，同时让所有权、证据、权限、修订与发布边界始终可见。

## 亮点

- **用对话建设 Wiki。** 常驻 Wiki AI 对话基于关键字 + 语义混合检索并展示引用来源，可通过对话起草页面、重组目录树、翻译与策展。
- **受治理的 Agent Runtime。** 内置 MCP 兼容工具提供方让 AI 在与 Web UI 相同的权限受检服务上使用读取/起草/组织工具，具备风险策略、管理员提案审查、工具证据与审计事件。见 [Agent Runtime 与工具](/docs/agent-runtime)。
- **AI 的长期记忆。** LLM Wiki 模式把只追加的 raw 证据（含原始字节）与 AI 生成概念、策展后的公开 wiki 分离。见[写作模式](/docs/writing-modes)。
- **任何客户端，一套权限模型。** Web UI、REST + OpenAPI、独立 [MCP server](/docs/mcp-server) 与飞书都解析到同一套权限模型。
- **自托管、可携带。** 一个 web 容器 + PostgreSQL 16 + pgvector；内置 Git 单向同步、版本化 ZIP 导出与 Wiki.js 迁移。

## 速览

| | |
|---|---|
| 开源协议 | Apache-2.0 |
| 技术栈 | Next.js 16 · React 19 · TypeScript 5 · PostgreSQL 16 + pgvector · Drizzle |
| 运行时 | Node.js 20.9+ · Docker |
| AI 接口 | Wiki AI 对话 + 内置 MCP 工具运行时 · 面向外部客户端的独立 MCP server |
| 仓库 | [github.com/hugogu/next-wiki](https://github.com/hugogu/next-wiki) |

## 下一步

- [用 Docker Compose 安装](/docs/installation)
- [配置 AI 提供商](/docs/ai-configuration)
- [了解 Agent Runtime](/docs/agent-runtime)
