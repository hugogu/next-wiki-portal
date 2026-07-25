## 环境要求

- Node.js 20.9+
- pnpm 10
- Docker（用于数据库与全栈运行）

## 日常命令

```bash
pnpm install
pnpm dev          # turbo run dev —— 所有 workspace
pnpm build        # turbo run build
pnpm lint         # turbo run lint
pnpm typecheck    # turbo run typecheck
pnpm test         # turbo run test（Vitest）
```

## 单应用命令

通过 `--filter` 在 `apps/web` 内执行：

```bash
pnpm --filter @next-wiki/web test:e2e     # Playwright 端到端测试
pnpm --filter @next-wiki/web test         # Vitest 单元测试
```

## 数据库

迁移使用 Drizzle：

```bash
pnpm db:generate   # drizzle-kit generate
pnpm db:migrate    # drizzle-kit migrate
```

## OpenAPI

公共 API 规范从路由处理器生成：

```bash
pnpm --filter @next-wiki/web openapi:generate
```

## 测试

- **Vitest** 负责单元与集成测试
- **Playwright** 负责端到端流程
- `i18n:validate` 保持 en/zh 文案目录同步
