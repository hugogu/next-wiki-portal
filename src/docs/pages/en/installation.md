This guide gets a working next-wiki instance running on your machine in a few minutes.

## Requirements

- [Docker](https://www.docker.com/) with Docker Compose
- That is all — the web app, PostgreSQL, and background jobs all run inside containers. PostgreSQL is the **only required stateful service**; object storage and other backends are opt-in.

For hacking on the source instead of running it, see [Local Development](/docs/local-dev) (Node.js 20.9+, pnpm 10).

## Quick start

```bash
git clone https://github.com/hugogu/next-wiki.git
cd next-wiki
cp .env.example .env   # edit as needed (registry mirrors, ports, encryption key)
docker compose up -d --build
```

Open [http://localhost:3000](http://localhost:3000) — the app seeds itself on first run and walks you through the [first-run setup](/docs/first-run).

## Optional Compose profiles

Optional features never grow the default footprint. Enable them via Compose profiles when you need them:

```bash
# S3-compatible object storage for content assets
docker compose --profile storage-s3 up -d --build
```

## Using the published image

For production you can skip the local build and pull the published image instead:

```bash
docker compose -f docker-compose.prod.yml up -d
# e.g. image: hugogu/next-wiki-web:latest
```

Combine it with the Caddy overlay for TLS — see [Caddy + Cloudflare](/docs/caddy).

## Behind a registry mirror

If Docker Hub or npm is slow/blocked on your network, `.env.example` ships mirror switches:

```dotenv
NODE_IMAGE=docker.m.daocloud.io/library/node:24-alpine
POSTGRES_IMAGE=docker.m.daocloud.io/library/postgres:16-alpine
NPM_REGISTRY=https://registry.npmmirror.com
```

See [Environment Variables](/docs/environment) for the full list.
