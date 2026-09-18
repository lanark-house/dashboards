# Rocky Linux bootc Kiosk Deployment Guide

## Architecture Context

This document details deployment of the 9:16 Vertical Dashboard Framework inside an immutable **Rocky Linux / CentOS Stream `bootc`** container image configured for auto-starting Chromium in full kiosk mode.

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
│   ├── systemd/
│   │   ├── dashboard-nextjs.service
│   │   └── kiosk.service
│   └── scripts/
│       └── launch-kiosk.sh
```

---

## Container Build (`bootc/Containerfile`)

The `bootc/Containerfile` uses a multi-stage build pattern:
1. Builds the Next.js production build (`.next`, `public`, `package.json`, `node_modules`).
2. Packages Node.js LTS, Chromium, X11 display server, unclutter, and essential fonts onto a `bootc`-compatible base image (`quay.io/centos-bootc/centos-bootc:stream9`).
3. Installs and enables systemd service definitions to orchestrate boot behavior.

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
