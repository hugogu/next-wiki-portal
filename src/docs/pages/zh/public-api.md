next-wiki 暴露一个公共的 **REST + OpenAPI** 内容 API —— 与 Web UI、MCP server 共用同一套表面。

## 概览

- 基础路径：`/api/v1`（如 `http://localhost:3000/api/v1`）
- 认证：在管理设置中生成 API key
- 规范：OpenAPI，应用内置交互式 **Scalar** 文档界面
- 审计：API 活动由 API 审计中间件记录

## 覆盖范围

API 镜像了 wiki 的内容表面：

- 关键字与语义搜索
- 页面 CRUD、草稿与发布工作流
- 修订历史与 diff
- 链接分析（反向链接、出链、邻居）
- 批量操作与 wiki 健康统计

## 权限

API key 在与 Web UI 相同的权限受控存储上按范围授权。外部客户端能看、能改的范围永远不会超过其 key 所允许 —— MCP 客户端也遵循同样的规则。

## 调用示例

```bash
curl -H "Authorization: Bearer $NEXT_WIKI_API_KEY" \
  http://localhost:3000/api/v1/pages
```

面向 AI agent 时，建议使用 [MCP server](/docs/mcp-server)，它把这套 API 包装为原生工具。
