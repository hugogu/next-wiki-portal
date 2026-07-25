The first time you open a fresh deployment, next-wiki runs an interactive setup at `/setup` instead of seeding demo data.

## Create the administrator

Production deployments (`NEXT_WIKI_SEED=false`, the default) ask you to create the first admin account through the browser. For local development (`NODE_ENV != production`) the app can seed sample data instead — `admin@example.com` / `admin123` plus a welcome page:

```dotenv
NEXT_WIKI_SEED=true
```

## Choose a writing mode

First-run setup also asks the administrator to choose one of two content-authoring models:

- **Copilot** — humans and AI work together in the default wiki space. The simplest option for collaborative editing.
- **LLM Wiki** — adds two Admin-only spaces: `raw` for append-only source material and `generated` for AI-produced OKF concepts, kept separate from the public wiki.

The choice is not permanent: it can be reviewed and changed later at `/admin/writing-mode`. Switching back from LLM Wiki to Copilot runs a transactional migration. Read the details in [Writing Modes](/docs/writing-modes).

## After setup

- Write your first page in the editor, or open the AI side pane and draft by dialogue.
- Generate an API key in admin settings if you plan to use the [MCP server](/docs/mcp-server) or the [public REST API](/docs/public-api).
- Configure optional integrations (Feishu, object storage) — all stay inert until configured.
