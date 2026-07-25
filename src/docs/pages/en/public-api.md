next-wiki exposes a public **REST + OpenAPI** content API — the same surface that powers the web UI and the MCP server.

## Overview

- Base path: `/api/v1` (e.g. `http://localhost:3000/api/v1`)
- Auth: API keys generated in the admin settings
- Spec: OpenAPI, with an interactive **Scalar** reference UI built into the app
- Auditing: API activity is recorded by the API audit middleware

## What it covers

The API mirrors the wiki's content surface:

- keyword and semantic search
- page CRUD, drafts, and the publish workflow
- revision history and diffs
- link analysis (backlinks, outbound links, neighborhoods)
- batch operations and wiki health stats

## Permissions

API keys are permission-scoped to the same store that backs the web UI. An external client can never see or change more than its key allows — the same rule applies to MCP clients.

## Usage example

```bash
curl -H "Authorization: Bearer $NEXT_WIKI_API_KEY" \
  http://localhost:3000/api/v1/pages
```

For AI agents, prefer the [MCP server](/docs/mcp-server), which wraps this API as native tools.
