next-wiki is a pnpm + Turborepo monorepo.

```text
apps/web/                # Next.js app (App Router)
  app/                    # routes (RSC) + REST route handlers under app/api/
  src/server/             # db (Drizzle), services, permissions, pipeline, api
  src/components/         # UI; design-system primitives in src/components/ui/
  messages/               # namespaced next-intl UI catalogs (en/zh JSON)
  src/i18n/               # locale resolver, request config, formats, types
packages/shared/          # zero-dep shared Zod schemas/types
packages/editor/          # editor package
packages/mcp-server/      # @next-wiki/mcp-server — MCP tools for AI clients
specs/                    # Spec Kit feature specs/plans/tasks
docs/                     # architecture docs, plans, reviews
```

## Layers

- **Web UI** — React Server Components, Tailwind, next-intl (en/zh).
- **Server** — Drizzle ORM over PostgreSQL, services, permission checks, the remark/rehype rendering pipeline (KaTeX, Mermaid), and the REST API.
- **Background jobs** — pg-boss inside the web container; no separate worker needed by default.
- **Shared contracts** — zero-dependency Zod schemas shared between web and MCP server.
- **MCP server** — a standalone npm package (`@next-wiki/mcp-server`) that wraps the public API as MCP tools.

## Design documents

- `docs/architecture/` — architectural mandates and design docs, including the search/retrieval capability architecture
- `.specify/memory/constitution.md` — binding project principles
- `specs/` — feature specs, plans, and tasks (Spec Kit workflow)
