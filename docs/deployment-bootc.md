# Rocky Linux bootc Kiosk Deployment Guide

## Architecture Context

This document details deployment of the 9:16 Vertical Dashboard Framework inside an immutable **Rocky Linux / CentOS Stream `bootc`** container image configured for auto-starting Chromium in full kiosk mode and running ESPHome on the host platform for automated display power management.

---

## File Structure

The `bootc` environment and kiosk orchestration files are organized as follows:

```text
.
├── .github/
│   └── workflows/
│       └── bootc-build.yml
├── docs/
│   └── deployment-bootc.md
├── bootc/
│   ├── Containerfile
│   ├── esphome/
│   │   └── kiosk-display.yaml
│   ├── systemd/
│   │   ├── dashboard-nextjs.service
│   │   ├── kiosk.service
│   │   └── esphome.service
│   └── scripts/
│       └── launch-kiosk.sh
```

---

## Container Build (`bootc/Containerfile`)

The `bootc/Containerfile` uses a multi-stage build pattern:
1. Builds the Next.js production build (`.next`, `public`, `package.json`, `node_modules`).
2. Packages Node.js LTS, Chromium, X11 display server, unclutter, essential fonts, Python 3, build tools, xorg server utilities (`xset`), and `esphome` onto a `bootc`-compatible base image (`quay.io/centos-bootc/centos-bootc:stream9`).
3. Pre-compiles the ESPHome host platform configuration (`/opt/dashboard/esphome/kiosk-display.yaml`).
4. Installs and enables systemd service definitions to orchestrate boot behavior.

---

## ESPHome Host Integration (`bootc/esphome/kiosk-display.yaml`)

ESPHome is integrated directly into the host platform using the ESPHome host platform component (`https://esphome.io/components/host/`). This allows the Linux kiosk host to communicate natively with Home Assistant over the ESPHome API (port `6053`).

Key features:
- **Display Control Switch**: Exposes a `display_power` switch to Home Assistant that executes `DISPLAY=:0 xset dpms force on` / `off` to control display backlight/sleep state.
- **Home Assistant Motion Sensor Integration**: Listens to motion events from a Home Assistant motion sensor (`binary_sensor.motion_sensor`), automatically waking the display when motion is detected (`on_press`) and turning it off when motion ceases (`on_release`).

```yaml
esphome:
  name: kiosk-display
  friendly_name: Kiosk Display

host:
  mac_address: "06:35:69:ab:f6:79"

api:

logger:

switch:
  - platform: template
    name: "Display Power"
    id: display_power
    icon: "mdi:monitor"
    optimistic: true
    turn_on_action:
      - lambda: |-
          int res = system("DISPLAY=:0 xset dpms force on");
    turn_off_action:
      - lambda: |-
          int res = system("DISPLAY=:0 xset dpms force off");

binary_sensor:
  - platform: homeassistant
    id: ha_motion_sensor
    entity_id: binary_sensor.motion_sensor
    on_press:
      then:
        - switch.turn_on: display_power
    on_release:
      then:
        - switch.turn_off: display_power
```

---

## Chromium Kiosk Configuration (`bootc/scripts/launch-kiosk.sh`)

To ensure uninterrupted rendering without browser UI noise, popups, or update prompts in a 9:16 portrait display (1080x1920), Chromium is launched via `/opt/dashboard/scripts/launch-kiosk.sh`:

```bash
#!/bin/bash

# Hide mouse cursor activity
unclutter -idle 0.1 -root &

# Launch Chromium in kiosk mode
chromium-browser \
  --kiosk \
  --no-first-run \
  --no-errdialogs \
  --disable-infobars \
  --disable-session-crashed-bubble \
  --simulate-outdated-no-au='Tue, 31 Dec 2099 23:59:59 GMT' \
  --window-size=1080,1920 \
  --window-position=0,0 \
  http://localhost:3000
```

---

## Systemd Service Management

### 1. Next.js Application Service (`/etc/systemd/system/dashboard-nextjs.service`)
```ini
[Unit]
Description=Dashboard Next.js Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/dashboard
ExecStart=/usr/bin/npm run start
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

### 2. Kiosk Browser Service (`/etc/systemd/system/kiosk.service`)
```ini
[Unit]
Description=Chromium Kiosk Service
After=dashboard-nextjs.service
Wants=dashboard-nextjs.service

[Service]
Type=simple
User=root
Environment=DISPLAY=:0
ExecStart=/usr/bin/xinit /opt/dashboard/scripts/launch-kiosk.sh -- :0 vt7
Restart=always
RestartSec=5

[Install]
WantedBy=graphical.target
```

### 3. ESPHome Host Service (`/etc/systemd/system/esphome.service`)
```ini
[Unit]
Description=ESPHome Host Service for Display Control
After=network.target kiosk.service
Wants=kiosk.service

[Service]
Type=simple
User=root
WorkingDirectory=/opt/dashboard/esphome
ExecStart=/usr/local/bin/esphome run /opt/dashboard/esphome/kiosk-display.yaml
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

---

## CI/CD Workflow (`.github/workflows/bootc-build.yml`)

The GitHub Actions workflow automates container compilation and raw/qcow2 disk image generation via `bootc-image-builder`:

1. **Build Container Image**:
   ```bash
   podman build -f bootc/Containerfile -t dashboard-bootc:latest .
   ```

2. **Generate Disk Image (`.qcow2`)**:
   ```bash
   podman run --rm --privileged \
     -v /var/lib/containers/storage:/var/lib/containers/storage \
     -v $(pwd)/output:/output \
     quay.io/bootc/bootc-image-builder:latest \
     --type qcow2 --local dashboard-bootc:latest
   ```
