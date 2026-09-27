# Contributing Guidelines

Thank you for contributing to the Bootc Base Infrastructure and Dashboard Framework!

---

## Local Development & Container Validation

### 1. Prerequisites
- Node.js (v20+) & `pnpm`
- Podman or Docker with Buildx enabled

### 2. Validating Containerfile Build Locally

To test the `Containerfile` locally with Podman:

```bash
# Build base image locally
podman build -t bootc-dashboard-bootstrap:local -f Containerfile .
```

To test multi-architecture builds using Docker Buildx:

```bash
docker buildx build --platform linux/amd64,linux/arm64 -f Containerfile .
```

### 3. Application Development Workflow

```bash
# Install dependencies
pnpm install

# Run TypeScript & Linter validation
pnpm run lint
pnpm exec tsc --noEmit

# Build production assets
pnpm run build
```

---

## PR Submission & Guidelines

1. **Commit Messages**: Follow Conventional Commits format (e.g., `feat: ...`, `fix: ...`, `docs: ...`, `ci: ...`).
2. **Branch Naming**: Use descriptive branch names (`feature/`, `fix/`, `chore/`).
3. **Multi-Arch Compliance**: Ensure changes to `Containerfile` build successfully across both `linux/amd64` and `linux/arm64` targets.
4. **Action SHA Pinning**: Any updates to GitHub Actions workflow files must exact-pin third-party actions to full commit SHAs with version comments.
