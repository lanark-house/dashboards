# 9:16 Vertical Dashboard Framework

Production-grade, 9:16 portrait dashboard repository built with Next.js (App Router, TypeScript, Tailwind CSS) optimized for embedded kiosk rendering in a Rocky Linux `bootc` container environment.

## Overview & Topology

The display architecture enforces a 9:16 vertical portrait viewport layout composed of:
- **Top 16:9 StandardFrame**: Grid-based container for domain widgets.
- **Center Clock Divider**: Real-time 12-hour clock updated on minute boundaries with smooth CSS animation.
- **Bottom 16:9 StandardFrame**: Grid-based container for additional domain widgets.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Documentation
- [Architecture Documentation](docs/architecture.md)
- [Rocky Linux bootc Kiosk Deployment Guide](docs/deployment-bootc.md)
- [Style Guide](STYLE_GUIDE.md)
- [Contributing Guide](CONTRIBUTING.md)
- [License](UNLICENSE)
