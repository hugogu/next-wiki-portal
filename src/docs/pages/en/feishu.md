An optional [Feishu](https://open.feishu.cn/) integration lets users bind their Wiki account, ask grounded questions, and receive event notifications from within Feishu.

## Design principles

- **In-process module** — it lives inside the web app: no separate container, process, or Compose profile.
- **Inert until configured** — the default `docker compose up` is unchanged and needs no Feishu variables.
- **Same permission model** — every bot action is attributed to the bound Wiki user and passes the same permission checks as the web UI.

## Setup

Configure it entirely in the admin UI at `/admin/feishu`:

1. Generate and scan a Feishu QR code to associate an existing app or create a new one.
2. The App Secret and short-lived device code are stored **encrypted in PostgreSQL** and never returned to the browser or logged.
3. The bot receives events through an **outbound WebSocket long connection** — no callback URL and no public ingress configuration required.

## What users get

- Account binding between Feishu and the wiki
- Grounded Q&A against the knowledge base, from inside Feishu
- Event notifications (page updates, mentions) delivered to Feishu
