**next-wiki** 是一个个人的、AI 原生的知识资产库。你用 AI 书写与组织知识 —— 而同一个知识库，会成为任何 AI 助手与你对话时的记忆底座。它可以自托管，一条 `docker compose up` 即可运行，并且永不锁定于单一 AI 厂商。

## 为什么是 next-wiki

- **AI 原生创作，永不锁定。** 常驻 AI 对话侧栏与 MCP server 是起草页面、重组目录树、打磨内容的默认方式；但手动编辑器同样完整可用，wiki 从不依赖实时的模型连接来保持可读、可搜、可编辑。
- **可携带的 AI 记忆。** 任何 MCP 兼容客户端（Claude、Cursor 或未来的助手）都能搜索、读写与 Web UI 相同的权限受控存储 —— 你的知识比任何单一 AI 厂商活得更久。
- **个人优先。** 一条 `docker compose up` 即可让单一用户获得完整读写权限，零配置 —— 上手无需理解多用户或组织架构概念。
- **极简部署。** PostgreSQL 是唯一必需的有状态服务。可选功能（多人共享、对象存储、MCP）永远不会扩大默认占用。
- **一切皆有版本。** 每次保存都生成不可变修订；删除默认软删除；任意两个修订之间的 diff 随时可查。
- **极速公开阅读。** 公开文档与导航走静态 / ISR 分发，登录相关控件单独水合。
- **开放标准。** REST + OpenAPI 公共内容 API、OAuth2 / OIDC 联邦认证、Markdown + frontmatter 导出 —— 关键路径上没有任何专有锁定。

## 速览

| | |
|---|---|
| 开源协议 | Apache-2.0 |
| 技术栈 | Next.js 16 · React 19 · TypeScript 5 · PostgreSQL + Drizzle |
| 运行时 | Node.js 20.9+ · Docker |
| AI 接口 | 应用内 AI 侧栏 · 面向外部客户端的 MCP server |
| 仓库 | [github.com/hugogu/next-wiki](https://github.com/hugogu/next-wiki) |

## 下一步

- [用 Docker Compose 安装](/docs/installation)
- [选择写作模式](/docs/writing-modes)
- [通过 MCP 接入你的 AI 助手](/docs/mcp-server)
