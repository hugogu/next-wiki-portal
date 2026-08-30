**next-wiki** 是一个自托管、默认私有的 **Agent 上下文与记忆中枢**。它为一个 owner 提供持久的工作空间，用来管理多个身份明确的 Agent，以及它们的规则、非敏感配置、对话、来源证据、流程、记忆和精选知识。Agent 只能检索被允许看到的上下文，哪些内容进入共享空间或公开发布，由 owner 明确决定。

> **项目状态：** 积极开发中，处于早期开源发布阶段，接口与配置可能演进。

## 为什么是 next-wiki

多数 wiki 擅长存页面，多数 AI 助手擅长答问题。next-wiki 把两者连成一个**受治理的上下文闭环**：

```text
对话 / 素材 / 命令输出
              │
              ▼
       按范围管理的只追加证据
              │
              ▼
    Agent 检索、综合与起草
              │
              ▼
       owner 审阅与发布
              │
              ▼
       耐久、可检索的上下文
```

目标是让上下文对人和 Agent 都有用，同时让所有权、证据、权限、修订与发布边界始终可见。Agent 检索到的上下文只是数据，不是权威：它不能授予权限、授权工具或执行命令。

## 亮点

- **一个 owner，多个 Agent。** 产品模型是一组个人 Agent：每个 Agent 可以拥有自己的工作上下文，共享命名空间必须明确设置，不会意外混在一起。
- **上下文不止对话。** 规则、非敏感配置、流程、情景记忆、来源证据和精选知识是不同类型的持久上下文，而不是一堆没有区分的聊天记录。
- **用对话建设上下文。** Wiki AI 对话基于关键字 + 语义混合检索并展示引用来源，可通过对话起草页面、重组目录树、翻译与策展。
- **受治理的 Agent Runtime。** 内置 MCP 兼容工具提供方让 AI 在与 Web UI 相同的权限受检服务上使用读取/起草/组织工具，具备风险策略、管理员提案审查、工具证据与审计事件。见 [Agent Runtime 与工具](/docs/agent-runtime)。
- **选择性公开。** LLM Wiki 模式把只追加的 raw 证据与 AI 生成概念、策展后的公开 wiki 分离。项目会在此基础上继续构建明确、带版本的上下文包。
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
- [阅读 Agent 上下文模型](/docs/agent-context)
- [配置 AI 提供商](/docs/ai-configuration)
- [了解 Agent Runtime](/docs/agent-runtime)
- [选择写作模式](/docs/writing-modes)
