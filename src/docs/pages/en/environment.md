All Compose-level configuration lives in `.env`, copied from `.env.example`. Everything has a safe local default — only change what you need.

## Core

| Variable | Default | Notes |
|---|---|---|
| `WEB_PORT` | `3000` | Host port for the web container. Use `127.0.0.1:3000` behind a proxy. |
| `DATABASE_URL` | docker Postgres | Only needed when pointing at an external database. |
| `API_KEY_ENCRYPTION_KEY` | dev-only value | **Set in production.** 64-char hex, generate with `openssl rand -hex 32`. |
| `NEXT_WIKI_SEED` | `false` in prod | Seed demo admin + welcome page (dev default: auto-on). |
| `APP_URL` | — | Public URL of the site, required when Caddy is enabled. |

## Registry mirrors

```dotenv
NODE_IMAGE=docker.m.daocloud.io/library/node:24-alpine
POSTGRES_IMAGE=docker.m.daocloud.io/library/postgres:16-alpine
NPM_REGISTRY=https://registry.npmmirror.com
```

## AI providers

```dotenv
# Default OpenRouter key when a provider's DB credentials omit apiKey.
# Lets personal deployments configure AI via .env without pasting
# the key into the admin UI.
OPENROUTER_API_KEY=sk-or-v1-...
```

## Import / export artifacts

```dotenv
TRANSFER_ARTIFACT_BASE_PATH=/data/content/transfers
TRANSFER_ARTIFACT_RETENTION_HOURS=72
TRANSFER_MAX_COMPRESSED_BYTES=2147483648
TRANSFER_MAX_EXPANDED_BYTES=4294967296
TRANSFER_MAX_ENTRIES=50000
```

## Caddy (production TLS)

See [Caddy + Cloudflare](/docs/caddy) for `CADDY_HOST`, `CADDY_CERT_PATH`, `CADDY_KEY_PATH`, `CADDY_HTTP_PORT`, and `CADDY_HTTPS_PORT`.

> Secrets such as API keys entered in the admin UI are stored encrypted in PostgreSQL (using `API_KEY_ENCRYPTION_KEY`) and are never returned to the browser or logged.
