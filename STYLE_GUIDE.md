# Style Guide

## TypeScript & Code Quality
- Enforce strict typing with TypeScript. Avoid `any` types.
- Follow ESLint standard rules configured in `eslint.config.mjs`.

## Component Architecture (Atomic Design)
1. **Atoms** (`src/components/atoms/`): Smallest indivisible UI primitives (Typography, Card, Badge, Spinner).
2. **Molecules** (`src/components/molecules/`): Functional combinations of atoms (MetricCard, Sparkline, StatusIndicator).
3. **Organisms** (`src/components/organisms/`): Domain-specific widgets (`FinanceWidget`, `HomeAssistantWidget`, `WorkPerformanceWidget`).
4. **Templates** (`src/components/templates/`): Layout primitives and universal wrappers (`StandardFrame`, `StandardWidget`, `ClockDivider`).
5. **Layouts** (`src/components/layout/`): Full page composition (`DashboardPage`).

## Styling Rules
- Use Tailwind CSS utility classes exclusively (FOSS open-source utilities).
- Ensure high contrast and dark mode compatibility suitable for embedded kiosk displays.
- Keep layout bounded within strict 9:16 portrait viewport constraints.
