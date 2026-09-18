# Architecture Documentation

## Overview

The 9:16 Vertical Dashboard Framework is engineered specifically for embedded portrait kiosks (e.g., 1080x1920 displays). Physical portrait kiosks present a challenge: standard modern UI components and video content are overwhelmingly designed for 16:9 widescreen viewports.

To resolve this disparity, our architecture subdivides the physical 9:16 portrait viewport into a dual-stacked 16:9 layout bridged by a central clock divider.

```
+-----------------------------------+
|                                   |
|       Top 16:9 StandardFrame      |
|    (3 rows x 6 columns grid)      |
|                                   |
+-----------------------------------+
| ====== Center Clock Divider ===== |
+-----------------------------------+
|                                   |
|     Bottom 16:9 StandardFrame     |
|    (3 rows x 6 columns grid)      |
|                                   |
+-----------------------------------+
```

---

## Atomic Design Mapping & Domain-Specific Extensions

Our system adapts Brad Frost's **Atomic Design** framework into a domain-specific hierarchy tailored for embedded dashboard displays:

### 1. Atoms (`src/components/atoms/`)
Indivisible UI primitives with zero external dependency or layout assumptions:
- **Typography**: Headings, labels, and metric numbers.
- **Badge**: Status indicators (online, offline, pending).
- **Card**: Standardized background container with dark border styling.
- **Spinner**: SVG loading indicator for asynchronous data state.

### 2. Molecules (`src/components/molecules/`)
Combinations of two or more atoms forming functional UI units:
- **MetricCard**: Combines typography, label, trend indicator, and background card.
- **Sparkline**: SVG line chart visualizing financial or performance data trends over time.
- **StatusIndicator**: Combines badge and live status ping animation.

### 3. Organisms (`src/components/organisms/`)
Domain-specific feature widgets handling client-side state and async data fetching:
- **`FinanceWidget.tsx`**: Stock ticker trends, portfolio performance, and market status.
- **`HomeAssistantWidget.tsx`**: Smart home device states, climate telemetry, and light controls.
- **`WorkPerformanceWidget.tsx`**: CI/CD pipeline stats, task completion velocity, and server health.

### 4. Templates (`src/components/templates/`)
Universal structural layouts enforcing strict geometric constraints and widget encapsulations:
- **`StandardFrame.tsx`**: Page layout container enforcing `aspect-video` (16:9) aspect ratio and a 6-column by 3-row CSS Grid layout for child widgets.
- **`StandardWidget.tsx`**: Universal widget container wrapper accepting `title`, `size` presets (`small` 1x1, `medium` 2x1, `large` 2x2, `xlarge` 3x3), and `loading` props. Renders a skeleton UI during async data resolution.
- **`ClockDivider.tsx`**: Real-time 12-hour clock divider positioned between the top and bottom frames, featuring minute-aligned timeout updates (`ceilingMinutes`) and subtle CSS pulsing animations.

### 5. Layouts (`src/components/layout/`)
- **`DashboardPage.tsx`**: Root display layout composing the top frame, clock divider, and bottom frame within a strictly constrained 9:16 aspect ratio container.

---

## Data Pipeline Architecture

```
Route Handler (API)  <--- 2000ms delay --->  Client Widget ("use client")
src/app/api/.../route.ts                     StandardWidget Skeleton -> Data View
```

1. **Async Route Handlers**: Next.js App Router API routes (`src/app/api/.../route.ts`) simulate real-world backend microservice latency using an artificial 2,000ms `setTimeout`.
2. **Client Components**: Feature widgets use React client state (`useEffect` / `fetch`) to request data from the API endpoints.
3. **Skeleton Loading**: During the initial 2,000ms resolution window, `StandardWidget` renders a built-in skeleton state to prevent cumulative layout shift (CLS) and ensure a polished user experience on kiosk screens.
