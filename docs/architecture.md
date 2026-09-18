# Architecture & Data Pipeline Documentation

## Overview

The **Frame Art Dashboard Framework** is engineered specifically for 32" Samsung The Frame (2023) mounted in portrait orientation (1080×1920, 9:16 aspect ratio). Designed for display on a matte QLED IPS panel (~69 PPI), the layout treats the screen as a living piece of decorative art rather than a utilitarian control panel.

### Display Constraints & Visual Philosophy
- **Resolution**: 1080 × 1920 (9:16 portrait)
- **Palette**: Warm, muted, organic 4-color palette:
  - Cream Background (`#F5F2EB`)
  - Warm Terracotta (`#C86D51`)
  - Sage Green (`#7A8B7B`)
  - Soft Charcoal (`#2C3531`)
  - Subtle Clover Pastel Accents (`#8EA483` / `#DDE5D9`)
- **Typography**: Display Serif (*Playfair Display* / *Cormorant Garamond*) mixed with clean sans-serif (*Plus Jakarta Sans*).
- **Framing**: Inset picture matte border styling with organic background wash texture and hand-drawn ornamental clover dividers.
- **Interactivity**: Strictly **read-only / display-only** (no touch or direct HID interaction required for kiosk environment).

---

## Layout Topology (Top to Bottom Flow)

```
+-------------------------------------------------------+
|  [Header] Greeting, Date & Anniversary Countdown       |
+-------------------------------------------------------+
|  [Upper-Middle] Read-Only Home Cluster (Climate,      |
|                 Lighting Summary, Security State)    |
+-------------------------------------------------------+
|  [Middle] Rotating Photo & Botanical Illustration     |
|           Art Carousel Widget                        |
+-------------------------------------------------------+
|  ====== [Clock Divider] Time & Day Badge ======       |
+-------------------------------------------------------+
|  [Lower-Middle] Secondary Telemetry (Weather,         |
|                 Shared Notes, Music Now Playing)     |
+-------------------------------------------------------+
|  [Footer] Ornamental Divider & Whimsical Quote         |
+-------------------------------------------------------+
```

---

## External Data Sources & API Specifications

The dashboard consumes read-only telemetry from background services and internal Next.js API routes (`src/app/api/...`).

### 1. Home Assistant Integration (`/api/home-assistant`)
Provides real-time smart home environmental telemetry and device summary states.
- **Protocol / Source**: Home Assistant REST / WebSocket API (`http://homeassistant.local:8123/api/states`)
- **Data Payload Schema**:
  ```json
  {
    "status": "success",
    "data": {
      "temperature": 72,
      "targetTemperature": 70,
      "humidity": 45,
      "weatherCondition": "Clear & Soft Sunlight",
      "activeLightsCount": 4,
      "totalLightsCount": 12,
      "securityStatus": "Armed Home"
    }
  }
  ```

### 2. Personal & Secondary Telemetry (`/api/personal`)
Combines weather, shared reminders/notes, now playing media, and anniversary countdown tracking.
- **Protocol / Sources**:
  - **Weather**: OpenWeatherMap / Home Assistant Weather Entity
  - **Reminders**: Shared Apple Reminders / Todoist API / CalDAV
  - **Now Playing**: Spotify Web API / Apple Music Connect
- **Data Payload Schema**:
  ```json
  {
    "status": "success",
    "data": {
      "nowPlaying": {
        "title": "La Vie En Rose",
        "artist": "Louis Armstrong",
        "album": "Caresse d'Amour",
        "isPlaying": true
      },
      "weather": {
        "temp": 72,
        "high": 76,
        "low": 62,
        "condition": "Partly Sunny & Warm",
        "location": "Home Sanctuary"
      },
      "reminders": [
        { "id": "1", "text": "Sunset walk at the Botanical Garden", "time": "6:30 PM", "completed": false }
      ],
      "anniversary": {
        "title": "Anniversary Countdown",
        "daysLeft": 42,
        "targetDate": "October 14, 2025"
      }
    }
  }
  ```

### 3. Financial Portfolio Data (`/api/finance`)
Read-only financial summary and market trends.
- **Protocol / Source**: Yahoo Finance API / Alpha Vantage / Plaid read-only endpoint.
- **Data Payload Schema**:
  ```json
  {
    "status": "success",
    "data": {
      "portfolioValue": 142850,
      "dayChange": 1240,
      "dayChangePercent": 0.87,
      "marketStatus": "OPEN",
      "sparkline": [141200, 141500, 141800, 142100, 142000, 142500, 142850]
    }
  }
  ```

### 4. Datadog / DevOps Server Health (`/api/work-performance`)
Monitors home lab, CI/CD pipelines, and server vitals.
- **Protocol / Source**: Datadog API v1 / Prometheus Exporter
- **Data Payload Schema**:
  ```json
  {
    "status": "success",
    "data": {
      "openPRs": 2,
      "ciSuccessRate": 99.4,
      "buildStatus": "PASSING",
      "commitsToday": 14,
      "serverHealth": {
        "cpuUsage": 18,
        "memoryUsage": 42
      }
    }
  }
  ```

---

## AI Background Image Generation Prompt

To generate matching background textures for generative AI tools (e.g. Midjourney v6, DALL-E 3), use the following detailed prompt:

```text
Full-bleed low-contrast wallpaper for a portrait wall display, subtle organic linen fabric texture with a gentle watercolor wash in muted terracotta (#C86D51), soft sage green (#7A8B7B), and warm cream (#F5F2EB). Delicate minimalist botanical clover illustrations floating in corners with soft drop shadows, matte finish, soft lighting, 9:16 aspect ratio, warm intimate artistic aesthetic, zero bright white, zero high-contrast black, no text --ar 9:16 --v 6.0
```
