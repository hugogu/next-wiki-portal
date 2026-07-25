**next-wiki** is a personal, AI-native knowledge vault. You write and organize knowledge with AI — and that same knowledge base becomes the grounding memory any AI assistant reads from when it talks with you. It is self-hosted, `docker compose up` simple, and never locked to a single AI vendor.

## Why next-wiki

- **AI-native creation, never vendor-locked.** A persistent AI chat side pane and an MCP server are the default way to draft pages, restructure the page tree, and refine content through dialogue — but the manual editor stays fully capable, and the wiki never depends on a live model connection to stay readable, searchable, and editable.
- **Your portable AI memory.** Any MCP-compatible client (Claude, Cursor, or a future assistant) can search, read, and write into the same permission-scoped store that backs the web UI, so your knowledge outlives any single AI vendor.
- **Personal by default.** One `docker compose up` gives a single owner full read/write access with zero configuration — no multi-user setup or organization concept required to get started.
- **Simple deployment.** PostgreSQL is the only required stateful service. Optional features (multi-user sharing, object storage, MCP) never grow the default footprint.
- **Everything is versioned.** Every save creates an immutable revision; deletion is soft by default; diffs between any two revisions are always available.
- **Fast public reading.** Published public documents and navigation use static/ISR delivery; login-specific controls hydrate separately.
- **Open standards.** A REST + OpenAPI public content API, OAuth2/OIDC for federated auth, and Markdown + frontmatter export — no proprietary lock-in on the critical path.

## At a glance

| | |
|---|---|
| License | Apache-2.0 |
| Stack | Next.js 16 · React 19 · TypeScript 5 · PostgreSQL + Drizzle |
| Runtime | Node.js 20.9+ · Docker |
| AI surface | In-app AI side pane · MCP server for external clients |
| Repository | [github.com/hugogu/next-wiki](https://github.com/hugogu/next-wiki) |

## Next steps

- [Install with Docker Compose](/docs/installation)
- [Pick a writing mode](/docs/writing-modes)
- [Connect your AI assistant via MCP](/docs/mcp-server)
