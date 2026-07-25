next-wiki ships as a small set of Compose files so each environment only runs what it needs.

## Compose files

| File | Purpose |
|---|---|
| `docker-compose.yml` | Base stack: builds the web image locally, plus PostgreSQL |
| `docker-compose.prod.yml` | Pulls the published image (e.g. `hugogu/next-wiki-web:latest`) |
| `docker-compose.caddy.yml` | Adds a Caddy reverse proxy with TLS — see [Caddy + Cloudflare](/docs/caddy) |

## Common commands

```bash
# Dev: build locally and start
docker compose up -d --build

# Prod: pull the published image
docker compose -f docker-compose.prod.yml up -d

# Prod with TLS in front
docker compose -f docker-compose.prod.yml -f docker-compose.caddy.yml up -d

# Optional S3-compatible object storage
docker compose --profile storage-s3 up -d --build

# Logs / stop
docker compose logs -f web
docker compose down          # add --volumes to wipe the database as well
```

## What runs where

- **web** — the Next.js app: UI, REST route handlers, background jobs (pg-boss), and the optional in-process Feishu module. Exposed on `WEB_PORT` (default `3000`).
- **postgres** — the only required stateful service. Pages, revisions, users, settings, and transfer runs all live here.
- **Content volume** — a persistent volume backs uploaded assets and import/export artifacts (`TRANSFER_ARTIFACT_BASE_PATH`, default `/data/content/transfers`).

## Bind to localhost behind a proxy

When a reverse proxy terminates TLS, keep the web container off the public interface — Caddy reaches it through the Docker network:

```dotenv
WEB_PORT=127.0.0.1:3000
```
