next-wiki exposes a public **REST + OpenAPI** content API — the same surface that powers the web UI and the MCP server.

## Overview

- Base path: `/api/v1` (e.g. `http://localhost:3000/api/v1`)
- Auth: API keys from **User Center → API Keys** — a key combines its owner's role with explicit scopes, so it can never grant more access than its owner
- Spec: public OpenAPI at `/api/public-openapi.json`, complete document at `/api/openapi.json`, and an interactive reference UI at `/api-docs`
- Auditing: API activity is recorded in the audit log

## What it covers

The API mirrors the wiki's content surface:

- keyword and semantic search
- page CRUD, drafts, and the publish workflow
- revision history and diffs
- links and graph queries (backlinks, outbound links, neighborhoods)
- tags, assets, batch operations, and health statistics

## Permissions

API keys are permission-scoped to the same store that backs the web UI. An external client can never see or change more than its key allows — the same rule applies to MCP clients.

## Usage example

```bash
curl \
  -H "Authorization: Bearer nwk_your_api_key" \
  http://localhost:3000/api/v1/pages?limit=20
```

For AI agents, prefer the [MCP server](/docs/mcp-server), which wraps this API as native tools.
