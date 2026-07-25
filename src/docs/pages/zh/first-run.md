全新部署第一次打开时，next-wiki 会进入 `/setup` 交互式初始化，而不是播种演示数据。

## 创建管理员

生产部署（`NEXT_WIKI_SEED=false`，默认值）会要求你通过浏览器创建第一个管理员账号。本地开发（`NODE_ENV != production`）可以改为播种示例数据 —— `admin@example.com` / `admin123` 以及一个欢迎页：

```dotenv
NEXT_WIKI_SEED=true
```

## 选择写作模式

首次初始化还会要求管理员在两种内容创作模型中选择一种：

- **Copilot** —— 人类与 AI 在同一个默认 wiki 空间中协作编辑，是最简单的协作写作方式。
- **LLM Wiki** —— 新增两个管理员专属空间：`raw` 存放只追加的原始素材，`generated` 存放 AI 生成的 OKF 概念，与公开 wiki 保持隔离。

这个选择不是永久的：之后可以在 `/admin/writing-mode` 查看并修改。从 LLM Wiki 切回 Copilot 会执行一次事务化迁移，详见[写作模式](/docs/writing-modes)。

## 初始化之后

- 在编辑器里写下第一页，或打开 AI 侧栏通过对话起草。
- 如果打算使用 [MCP server](/docs/mcp-server) 或[公共 REST API](/docs/public-api)，在管理设置中生成 API key。
- 按需配置可选集成（飞书、对象存储）—— 未配置前它们完全惰性。
