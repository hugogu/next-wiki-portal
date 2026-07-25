AI is **optional**: the wiki remains readable, searchable, editable, and exportable without a configured model. When you do enable it, everything is managed from **Admin → AI**.

## Setup flow

1. **Add provider connections** and synchronize available models.
2. **Map models to capabilities** — Wiki text, Wiki embedding, and Wiki image are configured independently.
3. **Enable semantic search** by building an embedding index (pgvector-backed; indexes are rebuildable).
4. **Tune Wiki AI** prompts and runtime parameters.
5. **Configure the Tools policy surface** and the proposal review workflow — see [Agent Runtime & Tools](/docs/agent-runtime).

## Provider registry

The registry includes, where the capability is supported:

- OpenAI-compatible providers and custom OpenAI-compatible endpoints
- OpenRouter
- Anthropic
- Kimi
- Z.ai
- Voyage AI (embeddings)
- MiniMax (image generation)

A global `OPENROUTER_API_KEY` may be supplied in `.env`; provider credentials entered through Admin AI are stored server-side, encrypted, and never returned to the browser.

## What AI can do once configured

- **Grounded chat** with visible sources and retrievable citations; sessions are retained, shareable by URL, and restorable with their context.
- **Page drafting, text improvement, image generation**, and queued multilingual translation workflows with immutable provenance.
- **Tool-enabled turns** through the built-in MCP-compatible runtime, with live tool-call status in chat.
- **Honest degradation**: when a selected model cannot use tools, Wiki AI falls back to ordinary question answering instead of silently pretending it performed a mutation.

## Usage & operations

The admin surface also covers capability detection, assignments, usage statistics, and vector index rebuilds — so you can see what the AI is doing and what it costs.
