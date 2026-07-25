所有 Compose 层级的配置都在 `.env` 中（从 `.env.example` 复制而来）。每一项都有安全的本地默认值 —— 只改你需要的。

## 核心

| 变量 | 默认值 | 说明 |
|---|---|---|
| `WEB_PORT` | `3000` | web 容器暴露的宿主机端口。反代后建议 `127.0.0.1:3000`。 |
| `DATABASE_URL` | docker Postgres | 仅在指向外部数据库时需要。 |
| `API_KEY_ENCRYPTION_KEY` | 仅限开发的默认值 | **生产必改。** 64 位十六进制，用 `openssl rand -hex 32` 生成。 |
| `NEXT_WIKI_SEED` | 生产默认 `false` | 播种演示管理员 + 欢迎页（开发环境自动开启）。 |
| `APP_URL` | —— | 站点公开 URL，启用 Caddy 时必填。 |

## 镜像加速

```dotenv
NODE_IMAGE=docker.m.daocloud.io/library/node:24-alpine
POSTGRES_IMAGE=docker.m.daocloud.io/library/postgres:16-alpine
NPM_REGISTRY=https://registry.npmmirror.com
```

## AI 提供商

```dotenv
# 当某个提供商的数据库凭据缺少 apiKey 时使用的默认 OpenRouter key。
# 让个人部署可以通过 .env 配置 AI，而不用把 key 粘贴进管理界面。
OPENROUTER_API_KEY=sk-or-v1-...
```

## 导入导出产物

```dotenv
TRANSFER_ARTIFACT_BASE_PATH=/data/content/transfers
TRANSFER_ARTIFACT_RETENTION_HOURS=72
TRANSFER_MAX_COMPRESSED_BYTES=2147483648
TRANSFER_MAX_EXPANDED_BYTES=4294967296
TRANSFER_MAX_ENTRIES=50000
```

## Caddy（生产 TLS）

`CADDY_HOST`、`CADDY_CERT_PATH`、`CADDY_KEY_PATH`、`CADDY_HTTP_PORT`、`CADDY_HTTPS_PORT` 见 [Caddy + Cloudflare](/docs/caddy)。

> 在管理界面中输入的 API key 等敏感信息，会用 `API_KEY_ENCRYPTION_KEY` 加密后存入 PostgreSQL，永远不会返回给浏览器或写入日志。
