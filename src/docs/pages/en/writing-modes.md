First-run setup asks the administrator to choose one of two content-authoring models. The choice can be reviewed and changed later at `/admin/writing-mode`.

## Copilot

Humans and AI work together in the default wiki space. This is the simplest option for collaborative editing — one space, shared drafts, no extra concepts to manage.

## LLM Wiki

Adds two Admin-only spaces alongside the public wiki:

- **`raw`** — append-only source material: notes, excerpts, evidence. Entries accept verbatim bodies (plus optional original bytes) and can only be appended to, never rewritten.
- **`generated`** — AI-produced OKF concepts distilled from raw material.

The public default wiki stays separate. Administrators can publish a generated concept to a public wiki path as a **soft link**, and choose public or Admin-only visibility independently for raw and generated content.

## Switching modes

- **Copilot → LLM Wiki** is immediate.
- **LLM Wiki → Copilot** queues a transactional migration: raw pages move under `raw/...`, generated pages under `generated/...`, and published soft links are materialized as ordinary wiki pages.
- While the migration is pending, all content mutations return `MODE_SWITCH_IN_PROGRESS`; reads stay available.
- Conflicting paths receive deterministic numeric suffixes and are reported in the admin UI.
- Generated concepts retain their OKF frontmatter and remain exportable through the normal [transfer flow](/docs/import-export).

MCP clients use the same `space` and `filterType` arguments described in the [MCP server guide](/docs/mcp-server), including append-only raw-entry writes.
