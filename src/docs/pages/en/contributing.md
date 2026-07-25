Issues and pull requests are welcome on [GitHub](https://github.com/hugogu/next-wiki).

## Ground rules

- Keep changes focused — one concern per PR.
- Follow the existing code conventions (ESLint flat config, Prettier).
- Add tests for new behavior: Vitest for units, Playwright for flows.
- Run the full gate before submitting:

```bash
pnpm lint && pnpm typecheck && pnpm test
```

## Working with the docs

The project keeps its design history in the repo — read before large changes:

- `docs/architecture/mandates.md` — architectural mandates
- `.specify/memory/constitution.md` — binding project principles
- `specs/` — feature specs, plans, and tasks

## License

By contributing, you agree your work is licensed under the [Apache License, Version 2.0](https://github.com/hugogu/next-wiki/blob/main/LICENSE).
