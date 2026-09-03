**next-wiki** is a self-hosted, AI-assisted personal knowledge base for people who run multiple AI Agents. It gives one owner a durable place to manage pages, documents, rules, non-secret configuration, conversations, source evidence, procedures, memory, and curated knowledge. Agents can retrieve only the context they are allowed to see, while the owner decides what becomes shared or public.

> **Project status:** actively developed, early open-source release. Interfaces and configuration may evolve.

## Why next-wiki

Most wikis are good at storing pages; most AI assistants are good at answering questions. next-wiki joins the two into a **knowledge-to-context loop**:

```text
conversation / source / command output
              │
              ▼
       scoped, append-only evidence
              │
              ▼
    Agent retrieval, synthesis, and drafts
              │
              ▼
       owner review and publication
              │
              ▼
       durable, searchable knowledge
```

The goal is to make knowledge useful to both people and Agents while keeping ownership, evidence, permissions, revisions, and publication boundaries visible. Context retrieved by an Agent is data, not authority: it cannot grant permissions, authorize tools, or execute commands.

## Highlights

- **A real personal knowledge base.** Pages, documents, source evidence, decisions, and revisions remain readable and editable in a Wiki, with AI helping you capture and organize them.
- **One owner, many Agents.** The product model is a personal Agent fleet: each Agent can have its own working context, and shared namespaces are explicit rather than accidental.
- **Knowledge beyond chat.** Rules, non-secret configuration, procedures, episodic memory, source evidence, and curated knowledge are different kinds of durable knowledge — not one undifferentiated transcript archive.
- **Build knowledge by talking.** Wiki AI chat — grounded through hybrid keyword + semantic retrieval with visible citations — drafts pages, restructures the tree, translates, and curates through dialogue.
- **A governed Agent Runtime.** The built-in MCP-compatible tool provider gives AI read/draft/organize tools over the same permission-checked services as the Web UI, with risk policies, admin proposal review, tool evidence, and audit events. See [Agent Runtime & Tools](/docs/agent-runtime).
- **Selective publication.** LLM Wiki mode keeps append-only raw evidence separate from AI-generated concepts and the curated public wiki. The project is extending this foundation toward explicit, versioned context packs.
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
- [Read the Agent Context model](/docs/agent-context)
- [Configure AI providers](/docs/ai-configuration)
- [Explore the Agent Runtime](/docs/agent-runtime)
- [Pick a writing mode](/docs/writing-modes)
