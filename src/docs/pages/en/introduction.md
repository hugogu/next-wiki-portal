**next-wiki** is a self-hosted, AI-native wiki for turning conversations and sources into durable knowledge. Capture what you learn, keep the evidence, ask AI to retrieve and organize it, and publish a readable wiki when it is ready — an AI memory you can run, inspect, export, and connect to any compatible client.

> **Project status:** actively developed, early open-source release. Interfaces and configuration may evolve.

## Why next-wiki

Most wikis are good at storing pages; most AI assistants are good at answering questions. next-wiki joins the two into a **governed knowledge loop**:

```text
conversation / source / command output
              │
              ▼
       raw, append-only evidence
              │
              ▼
    AI retrieval, synthesis, and drafts
              │
              ▼
       human review and publication
              │
              ▼
       durable, searchable wiki memory
```

The goal is not to hide an AI agent behind a chat box. The goal is to make knowledge useful to both people and agents while keeping ownership, evidence, permissions, revisions, and publication boundaries visible.

## Highlights

- **Build the wiki by talking.** A persistent Wiki AI chat — grounded through hybrid keyword + semantic retrieval with visible citations — drafts pages, restructures the tree, translates, and curates through dialogue.
- **A governed Agent Runtime.** A built-in MCP-compatible tool provider gives AI read/draft/organize tools over the same permission-checked services as the web UI, with risk policies, admin proposal review, tool evidence, and audit events. See [Agent Runtime & Tools](/docs/agent-runtime).
- **A long-term AI memory.** LLM Wiki mode keeps append-only raw evidence (with original bytes) separate from AI-generated concepts and the curated public wiki. See [Writing Modes](/docs/writing-modes).
- **Any client, one permission model.** Web UI, REST + OpenAPI, the packaged [MCP server](/docs/mcp-server), and Feishu all resolve through the same permission model.
- **Self-hosted and portable.** One web container plus PostgreSQL 16 + pgvector; Git one-way sync, versioned ZIP export, and Wiki.js migration built in.

## At a glance

| | |
|---|---|
| License | Apache-2.0 |
| Stack | Next.js 16 · React 19 · TypeScript 5 · PostgreSQL 16 + pgvector · Drizzle |
| Runtime | Node.js 20.9+ · Docker |
| AI surface | Wiki AI chat + built-in MCP tool runtime · packaged MCP server for external clients |
| Repository | [github.com/hugogu/next-wiki](https://github.com/hugogu/next-wiki) |

## Next steps

- [Install with Docker Compose](/docs/installation)
- [Configure AI providers](/docs/ai-configuration)
- [Explore the Agent Runtime](/docs/agent-runtime)
