首次初始化会要求管理员在两种内容创作模型中选择一种。之后可以在 `/admin/writing-mode` 查看并修改。

## Copilot

人类与 AI 在同一个默认 wiki 空间中协作编辑。这是协作写作最简单的选项 —— 一个空间、共享草稿，没有额外概念要管理。

## LLM Wiki

在公开 wiki 之外新增两个管理员专属空间：

- **`raw`** —— 只追加的原始素材：笔记、摘录、证据。条目接受逐字原文（以及可选的原始字节），只能追加，永不改写。
- **`generated`** —— 从原始素材中蒸馏出的 AI 生成 OKF 概念。

公开的默认 wiki 保持独立。管理员可以把一个生成概念以**软链接**形式发布到公开 wiki 路径，并分别为 raw 与 generated 内容选择公开或仅管理员可见。

## 模式切换

- **Copilot → LLM Wiki** 立即生效。
- **LLM Wiki → Copilot** 会排队执行一次事务化迁移：raw 页面移动到 `raw/...`，generated 页面移动到 `generated/...`，已发布的软链接会物化为普通 wiki 页面。
- 迁移进行中，所有内容变更会返回 `MODE_SWITCH_IN_PROGRESS`；读取保持可用。
- 路径冲突会获得确定性的数字后缀，并在管理界面中报告。
- 生成概念保留其 OKF frontmatter，仍可通过正常的[传输流程](/docs/import-export)导出。

MCP 客户端使用 [MCP server 指南](/docs/mcp-server)中相同的 `space` 与 `filterType` 参数，包括只追加的 raw 条目写入。
