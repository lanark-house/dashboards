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
3. Creates a unprivileged dedicated system user (`kiosk`), assigns ownership of `/opt/dashboard` and `/home/kiosk`, and adds `kiosk` to hardware access groups (`video`, `input`, `render`, `tty`).
4. Enforces physical security hardening by locking the root password (`passwd -l root`) and masking dangerous systemd targets/services (`debug-shell.service`, `ctrl-alt-del.target`, `emergency.service`, `rescue.service`).
5. Installs and enables systemd service definitions and enables `bootc-fetch-apply-updates.timer` for background automatic OS updates.

---

## Chromium Kiosk Configuration (`bootc/scripts/launch-kiosk.sh`)

To ensure uninterrupted rendering without browser UI noise, popups, or update prompts in a 9:16 portrait display (1080x1920), Chromium is launched via `/opt/dashboard/scripts/launch-kiosk.sh` with strict anti-tampering flags:

```bash
#!/bin/bash

# Prevent screen blanking and disable DPMS screensaver
xset s off 2>/dev/null || true
xset s reset 2>/dev/null || true
xset -dpms 2>/dev/null || true

# Disable X server terminate hotkey (Ctrl+Alt+Backspace)
setxkbmap -option dontzap 2>/dev/null || true

# Hide mouse cursor activity
unclutter -idle 0.1 -root &

# Launch Chromium in hardened kiosk mode
chromium-browser \
  --kiosk \
  --incognito \
  --no-first-run \
  --no-default-browser-check \
  --no-errdialogs \
  --disable-infobars \
  --disable-session-crashed-bubble \
  --disable-pinch \
  --disable-translate \
  --disable-features=Translate,TranslateUI,TouchTextSelection \
  --check-for-update-interval=31536000 \
  --simulate-outdated-no-au='Tue, 31 Dec 2099 23:59:59 GMT' \
  --window-size=1080,1920 \
  --window-position=0,0 \
  http://localhost:3000
```

---

## Systemd Service Management

Both services execute under the unprivileged `kiosk` user account.

### 1. Next.js Application Service (`/etc/systemd/system/dashboard-nextjs.service`)
```ini
[Unit]
Description=Dashboard Next.js Service
After=network.target

[Service]
Type=simple
User=kiosk
Group=kiosk
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
User=kiosk
Group=kiosk
SupplementaryGroups=video input render tty
WorkingDirectory=/home/kiosk
PAMName=login
TTYPath=/dev/tty7
Environment=DISPLAY=:0
ExecStart=/usr/bin/xinit /opt/dashboard/scripts/launch-kiosk.sh -- :0 vt7
Restart=always
RestartSec=5

[Install]
WantedBy=graphical.target
```

---

## Auto Updates (`bootc`)

Automatic system updates are powered by bootc's native systemd update timer:
- Enabled via `systemctl enable bootc-fetch-apply-updates.timer` in `bootc/Containerfile`.
- Periodically polls the target OCI container repository published on GHCR (`ghcr.io/<owner>/<repo>:latest`), fetches new layers in the background, stages the boot image, and applies updates automatically.

---

## CI/CD Workflow (`.github/workflows/bootc-build.yml`)

The GitHub Actions workflow automates container compilation, publishes images to GitHub Container Registry (`ghcr.io`), and generates raw/qcow2 disk images via `bootc-image-builder`:

1. **Build and Tag OCI Container Image**:
   ```bash
   podman build -f bootc/Containerfile \
     -t dashboard-bootc:latest \
     -t ghcr.io/<owner>/<repo>:latest \
     -t ghcr.io/<owner>/<repo>:<sha> .
   ```

2. **Publish Container Image to GHCR**:
   Pushes `latest`, git commit SHA, and release version tags to `ghcr.io` for bootc tracking and auto-updates.

3. **Generate Disk Image (`.qcow2`)**:
   ```bash
   podman run --rm --privileged \
     -v /var/lib/containers/storage:/var/lib/containers/storage \
     -v $(pwd)/output:/output \
     quay.io/bootc/bootc-image-builder:latest \
     --type qcow2 --local dashboard-bootc:latest
   ```
