# Architecture & Data Pipeline Documentation

## Overview

The **Frame Art Dashboard Framework** is engineered specifically for 32" Samsung The Frame (2023) mounted in portrait orientation (1080×1920, 9:16 aspect ratio). Designed for display on a matte QLED IPS panel (~69 PPI), the display architecture prioritizes **eye-level viewing ergonomics**, placing high-utility smart home and telemetry widgets in the upper 65% of the screen while positioning decorative comic and artwork carousels in the lower viewport.

### Ergonomic Viewing & Ergonomic Topology
- **Top 65% Viewport (Eye Level)**: Dynamic Weather Frog Title Hero, Smart Home Telemetry, Financial Portfolio Performance, DevOps/Server Vitals, Clock Divider, and Shared Reminders.
- **Bottom 35% Viewport**: Comic & Art Carousel (e.g. `r/comics` top highlights or watercolor art series).
- **Palette**: Warm, muted organic colors: Cream (`#F5F2EB`), Terracotta (`#C86D51`), Sage (`#7A8B7B`), Soft Charcoal (`#2C3531`), and Clover accents (`#8EA483`).
- **Typography**: Display Serif (*Playfair Display* / *Cormorant Garamond*) for titles & numbers, clean sans-serif (*Plus Jakarta Sans*) for readouts.
- **Interactivity**: Read-only display kiosk mode.

---

## Layout Topology

```
+-------------------------------------------------------+
|  [Header] Dynamic Weather Frog Title Hero             |
|           (sensor.airdrie_summary + weather art)      |
+-------------------------------------------------------+
|  [Upper 65%] Primary Smart Home Telemetry &          |
|              Financial Portfolio Assets               |
|  [Upper 65%] DevOps Build Vitals & Server Health      |
+-------------------------------------------------------+
|  ====== [Clock Divider] Real-Time Time & Date ======  |
+-------------------------------------------------------+
|  [Middle] Shared Reminders, Notes & Music Now Playing |
+-------------------------------------------------------+
|  [Lower 35%] Comic & Botanical Art Carousel           |
|              (r/comics top highlights)                |
+-------------------------------------------------------+
```

---

## Data Sources & API Endpoints

### 1. Weather Frog Hero & Personal Telemetry (`/api/personal`)
- **Entities / Sources**: `sensor.airdrie_summary` (Home Assistant weather summary entity), OpenWeatherMap, CalDAV, Spotify API.
- **Payload**:
  ```json
  {
    "status": "success",
    "data": {
      "weather": {
        "temp": 72,
        "condition": "Partly Sunny & Warm",
        "summary": "Soft afternoon breeze with gentle sunbeams, ideal for an evening stroll.",
        "sensorEntity": "sensor.airdrie_summary"
      },
      "reminders": [
        { "id": "1", "text": "Sunset walk at Botanical Garden", "time": "6:30 PM", "completed": false }
      ]
    }
  }
  ```

### 2. Home Assistant Telemetry (`/api/home-assistant`)
- **Entities / Sources**: Home Assistant climate & lighting states.

### 3. Financial Portfolio Data (`/api/finance`)
- **Entities / Sources**: Market ticker and portfolio metrics.

### 4. Work Performance & Server Vitals (`/api/work-performance`)
- **Entities / Sources**: Datadog API & CI pipeline metrics.
