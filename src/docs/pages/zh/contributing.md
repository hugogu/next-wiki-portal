欢迎在 [GitHub](https://github.com/hugogu/next-wiki) 上提交 Issue 与 PR。

## 基本约定

- 保持变更聚焦 —— 一个 PR 只解决一个问题。
- 遵循现有代码规范（ESLint flat config、Prettier）。
- 为新行为补测试：单元用 Vitest，流程用 Playwright。
- 提交前跑完整检查：

```bash
pnpm lint && pnpm typecheck && pnpm test
```

## 阅读设计文档

项目把设计历史保留在仓库中 —— 大改之前请先读：

- `docs/architecture/mandates.md` —— 架构约束
- `.specify/memory/constitution.md` —— 项目原则
- `specs/` —— 特性规格、计划与任务

## 协议

提交贡献即表示你同意自己的工作按 [Apache License 2.0](https://github.com/hugogu/next-wiki/blob/main/LICENSE) 授权。
