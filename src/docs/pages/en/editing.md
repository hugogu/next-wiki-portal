next-wiki pages are Markdown documents with YAML frontmatter, authored in a CodeMirror-based editor or drafted through the AI side pane.

## The editor

- **Markdown-first**, with a pluggable remark/rehype rendering pipeline.
- **GFM** tables, task lists, and strikethrough.
- **Math** via KaTeX — inline `$...$` and display blocks.
- **Diagrams** via Mermaid, rendered inline with a zoom popup for large graphs.
- **Images** upload directly and are referenced from the content store; exports rewrite them into portable form.
- **Frontmatter** carries page metadata. AI-generated concepts in LLM Wiki mode keep their OKF frontmatter through publish and export.

## Drafts and publishing

Edits are saved as draft revisions first. Publishing a draft creates a new published revision — the public site only ever serves published content, delivered statically/ISR so readers never wait on the database.

## The AI side pane

A persistent chat pane sits next to the editor. It is the default way to:

- draft new pages from an outline or a pile of notes,
- restructure the page tree,
- refine tone, translate, or summarize content through dialogue.

The pane is an accelerator, not a requirement: the manual editor stays fully capable, and the wiki never depends on a live model connection to stay readable, searchable, and editable.

## Link graph

Pages link to each other by path. next-wiki tracks the graph so you can ask what points where — backlinks, outbound links, dangling links, and multi-hop neighborhoods are all queryable (also exposed as MCP tools).
