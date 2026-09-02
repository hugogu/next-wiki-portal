# Agent Context

next-wiki is evolving from a personal knowledge vault into a private-by-default context layer for a fleet of Agents. The goal is to make the owner’s context useful to Agents without turning the store into an opaque prompt dump or an uncontrolled public mirror.

## Context is more than chat

A durable context item can be one of several kinds:

- **Instruction** — a rule or constraint an Agent should follow.
- **Configuration** — non-secret preferences and runtime settings.
- **Procedure** — a repeatable workflow or operating pattern.
- **Episodic memory** — a decision, event, or interaction worth remembering.
- **Source evidence** — an imported document, excerpt, observation, or citation.
- **Curated knowledge** — a reviewed explanation intended for reuse or sharing.

Keeping these kinds distinct makes provenance, review, retrieval, and publication easier to reason about. Secret values should remain in a secret manager; context stores references to them rather than copying credentials into prompts or pages.

Instruction files such as `AGENTS.md` are a useful portable representation of scoped rules and procedures. The context layer should be able to import, assemble, version, and selectively export these files without treating their text as an executable security boundary.

## One owner, multiple Agents

The operating model is one owner with multiple explicit Agent identities. An Agent identity can describe a role, purpose, runtime, or project boundary. Each Agent may have private context, while shared namespaces are opt-in and visible as part of the access model.

When an Agent works, its effective context should be assembled from the applicable owner, Agent, project, and task scopes. The result should be reproducible from revisioned sources, with conflicts and provenance visible to the owner.

## Retrieval is not authority

Retrieved context is data. Reading an instruction from next-wiki must not grant permissions, authorize a tool call, or execute a command. The runtime and integration layer remain responsible for identity, authorization, secret access, and tool policy.

This boundary lets Agents benefit from useful memory while keeping the security decision in the system that actually owns the capability.

## Selective publication

Private context and public knowledge are different products. A publication flow should select an explicit, versioned set of entries, apply the required redaction and review, and expose a named context pack or public page. Changing or revoking the source should make the publication state discoverable and invalidate stale public output.

The project is building this publication model incrementally. Current foundations already include permission-scoped content, immutable revisions, soft deletion, public reading, Markdown/frontmatter transfer, and MCP/REST access. Agent-specific context, shared namespaces, deterministic effective-context assembly, and first-class context packs are the next layer of work.

## Related guides

- [Writing modes](/docs/writing-modes) for collaborative and evidence-oriented authoring.
- [MCP Server](/docs/mcp-server) for connecting an Agent client.
- [Revisions & History](/docs/versioning) for change tracking.
- [Import & Export](/docs/import-export) for portable content.
