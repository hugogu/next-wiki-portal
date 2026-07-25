next-wiki pages are Markdown documents with YAML frontmatter, authored in a split source/preview editor or drafted through Wiki AI chat.

## The editor

- **Split source/preview** editing with a familiar page tree.
- **GitHub-Flavored Markdown**, syntax-highlighted code, frontmatter, tags, and metadata.
- **Math** via KaTeX; **diagrams** via Mermaid with a zoom popup for large graphs.
- **Images** upload directly and are referenced from the content store; exports rewrite them into portable form.
- **Links everywhere** — backlinks, outbound links, page neighborhoods, tags, and related content are navigable from the reader.

## Drafts and publishing

Edits are saved as draft revisions first. Publishing a draft creates a new published revision — the public site only ever serves published content, delivered statically/ISR so readers never wait on the database.

## Wiki AI chat

A persistent chat surface sits next to your content, grounded in the wiki through hybrid keyword and semantic retrieval with visible sources and retrievable citations:

- draft pages from an outline or a pile of notes,
- restructure the page tree, manage tags, propose batch operations,
- improve text, generate images, and run queued multilingual translation workflows with immutable provenance.

Chat sessions are retained, shareable through their URL, and restorable with their conversation context. When a selected model cannot use tools, Wiki AI degrades to ordinary question answering instead of silently pretending it performed a mutation. Tool-enabled turns go through the [Agent Runtime](/docs/agent-runtime) with live tool-call status.

## Export

Export a page's Markdown directly, or use the versioned ZIP [transfer flow](/docs/import-export) for published pages and referenced local images.
