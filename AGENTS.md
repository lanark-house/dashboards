<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Commit Conventions

Always use semantic / conventional commits when making commits in this repository. Follow the [Conventional Commits specification](https://www.conventionalcommits.org/):

- `feat:` for new features (triggers minor version bump, e.g. v0.1.0 -> v0.2.0)
- `fix:` for bug fixes (triggers patch version bump, e.g. v0.1.0 -> v0.1.1)
- `perf:`, `refactor:`, `test:`, `tests:` (triggers patch version bump)
- `docs:`, `chore:`, `style:`, `ci:`, `build:` for other changes
- Include `BREAKING CHANGE:` in footer or commit body to indicate breaking changes (triggers major version bump)
