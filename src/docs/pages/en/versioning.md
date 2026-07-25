Every save in next-wiki creates an **immutable revision**. Nothing is ever overwritten in place.

## What you get

- **Full history per page** — list every revision, inspect any of them.
- **Diffs between any two revisions** — see exactly what changed, whenever.
- **Soft delete by default** — deleted pages are recoverable; nothing vanishes silently.

## Why immutable

Immutability is what makes the AI-native workflow safe. When an AI agent writes into your wiki, you can always answer two questions: *what did it change*, and *how do I go back*. History is the audit trail for both humans and agents.

The same guarantees hold over the [public REST API](/docs/public-api) and the [MCP server](/docs/mcp-server) — `list_revisions`, `get_revision`, and `get_diff` are first-class tools there as well.

## Publish model

- Saving creates a **draft** revision.
- **Publishing** a draft adds a new published revision.
- The public reading path serves published revisions with static/ISR delivery; draft and admin views always hit the live store.
