# Contributing Guidelines

Thank you for contributing to the 9:16 Vertical Dashboard Framework!

## Getting Started

1. Ensure Node.js (v20+) and `pnpm` are installed.
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the local development server:
   ```bash
   pnpm dev
   ```

## Development Workflow

1. Create a feature branch for your changes.
2. Ensure code passes TypeScript validation, ESLint checks, and production builds:
   ```bash
   pnpm run build
   ```
3. Follow the atomic design principles outlined in `STYLE_GUIDE.md`.
4. Open a pull request against the `main` branch.
