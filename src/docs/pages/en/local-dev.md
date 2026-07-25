## Requirements

- Node.js 20.9+
- pnpm 10
- Docker (for the database and full-stack runs)

## Everyday commands

```bash
pnpm install
pnpm dev          # turbo run dev — all workspaces
pnpm build        # turbo run build
pnpm lint         # turbo run lint
pnpm typecheck    # turbo run typecheck
pnpm test         # turbo run test (Vitest)
```

## Per-app commands

Run inside `apps/web` via `--filter`:

```bash
pnpm --filter @next-wiki/web test:e2e     # Playwright end-to-end tests
pnpm --filter @next-wiki/web test         # Vitest unit tests
```

## Database

Migrations use Drizzle:

```bash
pnpm db:generate   # drizzle-kit generate
pnpm db:migrate    # drizzle-kit migrate
```

## OpenAPI

The public API spec is generated from route handlers:

```bash
pnpm --filter @next-wiki/web openapi:generate
```

## Tests

- **Vitest** for unit and integration tests
- **Playwright** for end-to-end flows
- `i18n:validate` keeps the en/zh message catalogs in sync
