Administrators manage portable backups and migrations at `/admin/transfers`. Editors and readers cannot access transfer sources, runs, archives, or reports.

## Portable archive

Site export creates a versioned ZIP containing:

- `manifest.json`
- published page Markdown with YAML frontmatter
- content-addressed referenced images
- an export report

Drafts, deleted pages, users, permissions, comments, revision history, and system settings are **excluded** — an archive is portable content, not a database dump.

Uploads are streamed to the persistent content volume, **validated before any mutation**, and previewed with either `skip` or `replace` conflict handling. Replacement appends a published revision and preserves the target's prior revisions, so a bad import is always recoverable.

Artifacts default to 72-hour retention; tune it via the `TRANSFER_*` [environment variables](/docs/environment).

## Git synchronization

Published content can be synchronized **one-way** to a Git repository, with scheduled reconciliation and automatic sync on publish. Git is an export backend for the published snapshot — it is never used as a read source.

## Wiki.js migration

Moving from Wiki.js is a first-class flow:

1. Create a Wiki.js source with its base URL and an API token allowed to list pages and read page source. Credentials are encrypted and never returned by the API.
2. Markdown is preserved; CKEditor/HTML pages are converted to Markdown and marked as converted.
3. Referenced images are downloaded, validated, stored locally, and rewritten to target asset URLs. Credentials are only sent to the configured Wiki.js origin.

Private-network destinations are blocked by default; enable private-network trust only for a known Wiki.js host.

## Recovery

- Pause, resume, cancel, retry, and item-level transfer status are first-class — runs and item outcomes persist in PostgreSQL across browser refreshes and artifact expiry.
- Active runs can be cancelled cooperatively; failed/cancelled runs can spawn retries without losing historical outcomes.
- Only one mutating import holds the database mutation slot at a time.
- The run detail page shows sanitized failures and archive downloads; API activity is recorded by the API audit middleware.
