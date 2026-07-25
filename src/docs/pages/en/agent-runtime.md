Wiki AI can use a **built-in, MCP-compatible `next-wiki` tool provider** to act on the same permission-checked services used by the web UI and the REST API. This is what makes next-wiki an Agent Runtime rather than a chat box: AI doesn't just talk about your wiki — it can work on it, inside visible boundaries.

> **Skills:** the runtime is designed for MCP & Skill-style extensibility. Today, only the built-in wiki provider is enabled inside Wiki AI; external MCP providers are intentionally **not** auto-discovered or activated in this phase. The separately packaged [MCP server](/docs/mcp-server) is the way external AI clients connect directly.

## What the runtime provides

- **Read tools** — search, page retrieval, page listing, tags, backlinks, and page neighborhoods.
- **Draft and organization tools** — creating/saving page drafts, changing metadata and properties, managing tags, and proposing batch operations.
- **A bounded, provider-agnostic tool loop** with live tool-call status shown in chat.
- **Server-enforced policies** — risk, permission, retention, and review rules are enforced on the server, not suggested to the model.
- **Admin proposal review** — approve, reject, apply, conflict detection, and per-item results before batch changes land.
- **Tool Evidence Raw entries** — when tool output becomes durable source material, it is captured as evidence.
- **Audit events and normal publication boundaries** — durable changes still go through the standard revision/publication path.

## Why governance matters

- Tool execution **reuses permission-checked services** and re-checks permissions when a proposal is reviewed or applied.
- AI actions and long-running work use the PostgreSQL-backed **async job lifecycle** instead of blocking request handlers.
- Every durable change is versioned — the same immutable-revision guarantees that cover human edits cover agent edits.

## External clients

Claude Code, Cursor, OpenCode, OpenClaw, and other MCP-compatible clients connect through the packaged [`@next-wiki/mcp-server`](/docs/mcp-server), which exposes the same API as MCP tools — retrieval, authoring, publishing, history, graph navigation, raw evidence, and batch operations.
