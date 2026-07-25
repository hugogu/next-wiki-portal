next-wiki 暴露一个公共的 **REST + OpenAPI** 内容 API —— 与 Web UI、MCP server 共用同一套表面。

## 概览

- 基础路径：`/api/v1`（如 `http://localhost:3000/api/v1`）
- 认证：在 **用户中心 → API Keys** 生成 —— key 将持有者的角色与显式 scope 组合，永远不会授予超过持有者的访问范围
- 规范：公开 OpenAPI 位于 `/api/public-openapi.json`，完整文档位于 `/api/openapi.json`，交互式文档界面位于 `/api-docs`
- 审计：API 活动记录在审计日志中

## 覆盖范围

API 镜像了 wiki 的内容表面：

- 关键字与语义搜索
- 页面 CRUD、草稿与发布工作流
- 修订历史与 diff
- 链接与图谱查询（反向链接、出链、邻居）
- 标签、资产、批量操作与健康统计

## 权限

API key 在与 Web UI 相同的权限受控存储上按范围授权。外部客户端能看、能改的范围永远不会超过其 key 所允许 —— MCP 客户端也遵循同样的规则。

## 调用示例

```bash
curl \
  -H "Authorization: Bearer nwk_your_api_key" \
  http://localhost:3000/api/v1/pages?limit=20
```

面向 AI agent 时，建议使用 [MCP server](/docs/mcp-server)，它把这套 API 包装为原生工具。
