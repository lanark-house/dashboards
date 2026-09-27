# Style Guide & Project Conventions

This document outlines coding standards, infrastructure patterns, and file structure rules for the project.

---

## Containerfiles & Bootc Image Standards

1. **Base Images**: Target explicit upstream bootc tags (e.g., `quay.io/centos-bootc/centos-bootc:stream9`).
2. **SSH Security**:
   - Explicitly manage permissions: `/root/.ssh` at `0700`, `/root/.ssh/authorized_keys` at `0600`.
   - Never embed raw private keys or plaintext passwords.
   - Configure drop-in SSH files under `/etc/ssh/sshd_config.d/` (e.g., `40-bootstrap.conf`) restricting logins (`PermitRootLogin prohibit-password`).
3. **Layer Cleanup**: Always clean package manager caches and `/tmp` files in the same layer or at the end of the build to keep OCI layers minimal (`rm -rf /tmp/* /var/tmp/* /var/cache/dnf/*`).
4. **Systemd Integration**: Enable necessary systemd units and timers directly in the `Containerfile` via `RUN systemctl enable <service>`.

---

## GitHub Actions Workflows

1. **Pinning Actions**: All third-party GitHub Actions must be exact-pinned by commit SHA with a version comment annotation (e.g., `uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2`).
2. **Multi-Architecture**: Build pipelines must output single, unified multi-arch index manifests (`linux/amd64`, `linux/arm64`) directly to the target registry without fragmenting tags by arch/environment.
3. **Permissions**: Workflow jobs must explicitly specify minimal necessary GitHub token permissions (`contents: read`, `packages: write`).

---

## TypeScript & Application Quality

- Enforce strict typing with TypeScript. Avoid `any` types.
- Follow ESLint standard rules configured in `eslint.config.mjs`.

---

## Component Architecture (Atomic Design)

1. **Atoms** (`src/components/atoms/`): Smallest indivisible UI primitives (Typography, Card, Badge, Spinner).
2. **Molecules** (`src/components/molecules/`): Functional combinations of atoms (MetricCard, Sparkline, StatusIndicator).
3. **Organisms** (`src/components/organisms/`): Domain-specific widgets (`FinanceWidget`, `HomeAssistantWidget`, `WorkPerformanceWidget`).
4. **Templates** (`src/components/templates/`): Layout primitives and universal wrappers (`StandardFrame`, `StandardWidget`, `ClockDivider`).
5. **Layouts** (`src/components/layout/`): Full page composition (`DashboardPage`).

---

## Styling Rules

- Use Tailwind CSS utility classes exclusively.
- Ensure high contrast and dark mode compatibility suitable for embedded kiosk displays.
- Keep layout bounded within strict 9:16 portrait viewport constraints.
