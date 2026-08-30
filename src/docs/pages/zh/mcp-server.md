`@next-wiki/mcp-server` 把 Claude Code、Cursor、OpenCode、OpenClaw 等 MCP 兼容客户端连接到同一套公共 API —— 检索、页面创作、草稿与发布、修订历史与 diff、链接与图谱导航、标签、raw 证据、批量操作、资产与 wiki 健康检查，并作为接入 Agent 上下文模型的桥梁。Wiki AI 自身使用的内置运行时见 [Agent Runtime 与工具](/docs/agent-runtime)。

MCP 是访问接口，不是权威层：API key 限制客户端能看见和修改的范围，而检索到的文本仍然只是数据。它本身不能授予权限、授权工具或执行命令。完整边界见 [Agent 上下文模型](/docs/agent-context)。

## 安装

```bash
npm install -g @next-wiki/mcp-server
# 或按需直接运行
npx -y @next-wiki/mcp-server
```

## 配置

需要两个环境变量：

| 变量 | 说明 |
|---|---|
| `NEXT_WIKI_API_URL` | wiki v1 API 的基础 URL，如 `http://localhost:3000/api/v1` |
| `NEXT_WIKI_API_KEY` | 在 wiki 管理设置中生成的 API key |

### Claude Code

```json
{
  "mcpServers": {
    "next-wiki": {
      "command": "npx",
      "args": ["-y", "@next-wiki/mcp-server"],
      "env": {
        "NEXT_WIKI_API_URL": "http://localhost:3000/api/v1",
        "NEXT_WIKI_API_KEY": "your-api-key"
      }
    }
  }
}
```

### OpenCode

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "next-wiki": {
      "type": "local",
      "command": ["npx", "-y", "@next-wiki/mcp-server"],
      "environment": {
        "NEXT_WIKI_API_URL": "http://localhost:3000/api/v1",
        "NEXT_WIKI_API_KEY": "your-api-key"
      },
      "enabled": true
    }
  }
}
```

### OpenClaw

写入 `~/.openclaw/openclaw.json`（JSON5 —— 允许注释与尾逗号），然后执行 `openclaw config validate` 或重载网关：

```json5
{
  mcp: {
    servers: {
      "next-wiki": {
        command: "npx",
        args: ["-y", "@next-wiki/mcp-server"],
        env: {
          NEXT_WIKI_API_URL: "http://localhost:3000/api/v1",
          NEXT_WIKI_API_KEY: "your-api-key",
        },
      },
    },
  },
}
```

## 工具

| 工具 | 说明 |
|---|---|
| `search_wiki` | 按关键字与 frontmatter 搜索可见内容空间 |
| `submit_semantic_search` / `get_semantic_search_results` | 自然语言语义搜索（异步提交 + 轮询） |
| `list_pages` / `get_page` / `get_page_tree` | 浏览页面与目录树 |
| `create_page` / `save_draft` / `publish_page` | 创作与发布工作流 |
| `append_raw_entry` | 向 raw 条目追加不可变片段（LLM Wiki 模式） |
| `list_raw_categories` / `create_raw_category` | raw 分类体系（LLM Wiki 模式） |
| `update_page_properties` / `delete_page` | 重命名/移动；软删除 |
| `list_revisions` / `get_revision` / `get_diff` | 历史与 diff |
| `upload_image` | 上传图片并获得 Markdown 引用 |
| `get_backlinks` / `get_page_outbound_links` / `get_neighborhood` | 链接图谱分析 |
| `batch_create_pages` / `batch_update_pages` / `batch_soft_delete_pages` | 原子化批量操作，单次最多 50 页 |
| `get_stats` / `find_similar` | 健康概览、孤儿页检测、相似页检查 |

在 LLM Wiki 模式下，这些工具遵循与 Web 应用相同的增长闭环：追加原始证据、搜索 raw/generated 空间、创建生成概念、把精选链接发布到公开 wiki —— 通过 `space` 与 `filterType` 参数实现。
