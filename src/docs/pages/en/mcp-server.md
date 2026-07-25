`@next-wiki/mcp-server` connects Claude Code, Cursor, OpenCode, OpenClaw, and other MCP-compatible clients to the same public API — retrieval, page authoring, drafts and publishing, revision history and diffs, links and graph navigation, tags, raw evidence, batch operations, assets, and wiki health checks. See [Agent Runtime & Tools](/docs/agent-runtime) for the built-in runtime used by Wiki AI itself.

## Installation

```bash
npm install -g @next-wiki/mcp-server
# or run it on demand
npx -y @next-wiki/mcp-server
```

## Configuration

Two environment variables are required:

| Variable | Description |
|---|---|
| `NEXT_WIKI_API_URL` | Base URL of the wiki v1 API, e.g. `http://localhost:3000/api/v1` |
| `NEXT_WIKI_API_KEY` | API key generated from the wiki admin settings |

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

Add to `~/.openclaw/openclaw.json` (JSON5 — comments and trailing commas allowed), then `openclaw config validate` or reload the gateway:

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

## Tools

| Tool | Description |
|---|---|
| `search_wiki` | Search a visible content space by keyword and frontmatter |
| `submit_semantic_search` / `get_semantic_search_results` | Natural-language semantic search (async submit + poll) |
| `list_pages` / `get_page` / `get_page_tree` | Browse pages and the directory tree |
| `create_page` / `save_draft` / `publish_page` | Authoring and publish workflow |
| `append_raw_entry` | Append an immutable chunk to a raw entry (LLM Wiki mode) |
| `list_raw_categories` / `create_raw_category` | Raw taxonomy (LLM Wiki mode) |
| `update_page_properties` / `delete_page` | Rename/move; soft-delete |
| `list_revisions` / `get_revision` / `get_diff` | History and diffs |
| `upload_image` | Upload an image, receive a Markdown reference |
| `get_backlinks` / `get_page_outbound_links` / `get_neighborhood` | Link-graph analysis |
| `batch_create_pages` / `batch_update_pages` / `batch_soft_delete_pages` | Atomic batches of up to 50 pages |
| `get_stats` / `find_similar` | Health overview, orphan detection, duplicate checks |

In LLM Wiki mode these tools follow the same growth loop as the web app: append raw evidence, search raw/generated spaces, create generated concepts, and publish curated links to the public wiki — using the `space` and `filterType` arguments.
