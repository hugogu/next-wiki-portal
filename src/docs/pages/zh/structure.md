next-wiki 是一个 pnpm + Turborepo monorepo。

```text
apps/web/                # Next.js 应用（App Router）
  app/                    # 路由（RSC）+ app/api/ 下的 REST 路由处理器
  src/server/             # db（Drizzle）、服务、权限、渲染管线、api
  src/components/         # UI；设计系统原语在 src/components/ui/
  messages/               # 按命名空间划分的 next-intl 界面文案（en/zh JSON）
  src/i18n/               # locale 解析、请求配置、格式化、类型
packages/shared/          # 零依赖的共享 Zod schema/类型
packages/editor/          # 编辑器包
packages/mcp-server/      # @next-wiki/mcp-server —— 面向 AI 客户端的 MCP 工具
specs/                    # Spec Kit 特性规格/计划/任务
docs/                     # 架构文档、计划、评审
```

## 分层

- **Web UI** —— React Server Components、Tailwind、next-intl（en/zh）。
- **服务端** —— PostgreSQL 之上的 Drizzle ORM、服务层、权限检查、remark/rehype 渲染管线（KaTeX、Mermaid）以及 REST API。
- **后台任务** —— web 容器内的 pg-boss；默认不需要独立 worker。
- **共享契约** —— 在 web 与 MCP server 之间共享的零依赖 Zod schema。
- **MCP server** —— 独立的 npm 包（`@next-wiki/mcp-server`），把公共 API 包装为 MCP 工具。

## 设计文档

- `docs/architecture/` —— 架构约束与设计文档，包括搜索/检索能力架构
- `.specify/memory/constitution.md` —— 具有约束力的项目原则
- `specs/` —— 特性规格、计划与任务（Spec Kit 工作流）
