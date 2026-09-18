# Rocky Linux bootc Kiosk Deployment Guide

## Architecture Context

This document details deployment of the 9:16 Vertical Dashboard Framework inside an immutable **Rocky Linux `bootc`** container image configured for auto-starting Chromium in full kiosk mode.

---

## Container Build (`Containerfile` / `Dockerfile`)

```dockerfile
FROM quay.io/rockylinux/bootc:9

# Install Node.js runtime, Chromium browser, and X11 display server environment
RUN dnf -y install \
    nodejs \
    pnpm \
    chromium \
    xorg-x11-server-Xorg \
    xorg-x11-xinit \
    matchbox-window-manager \
    systemd \
    && dnf clean all

# Copy built application assets
WORKDIR /opt/dashboard
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY . .
RUN pnpm build

# Enable Systemd services
COPY systemd/kiosk-dashboard.service /etc/systemd/system/
COPY systemd/kiosk-browser.service /etc/systemd/system/
RUN systemctl enable kiosk-dashboard.service kiosk-browser.service
```

---

## Chromium Kiosk Configuration

To ensure uninterrupted rendering without browser chrome, popups, or update prompts, Chromium is executed with the following strict arguments:

```bash
/usr/bin/chromium-browser \
  --kiosk \
  --no-first-run \
  --simulate-outdated-no-au='Tue, 31 Dec 2099 23:59:59 GMT' \
  --disable-notifications \
  --disable-infobars \
  --disable-session-crashed-bubble \
  --disable-component-update \
  --noerrdialogs \
  --autoplay-policy=no-user-gesture-required \
  --window-size=1080,1920 \
  --window-position=0,0 \
  http://localhost:3000
```

### Key Arguments Explained:
- `--kiosk`: Runs Chromium in full-screen kiosk mode, suppressing address bar, window controls, and tab bars.
- `--no-first-run`: Bypasses welcome screens, default browser setup dialogs, and sync prompts.
- `--simulate-outdated-no-au`: Suppresses the "Chromium is out of date" infobar prompt until year 2099.
- `--disable-session-crashed-bubble`: Prevents crash restore banners after ungraceful power cycles on kiosk hardware.

---

## Systemd Service Management

### 1. Dashboard Application Service (`/etc/systemd/system/kiosk-dashboard.service`)
```ini
[Unit]
Description=9:16 Dashboard Next.js Application Server
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/dashboard
ExecStart=/usr/bin/pnpm start
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

### 2. Kiosk Browser Service (`/etc/systemd/system/kiosk-browser.service`)
```ini
[Unit]
Description=Chromium Kiosk Browser Launch
After=kiosk-dashboard.service
Wants=kiosk-dashboard.service

[Service]
Type=simple
User=root
Environment=DISPLAY=:0
ExecStart=/usr/bin/xinit /usr/bin/chromium-browser --kiosk --no-first-run --simulate-outdated-no-au='Tue, 31 Dec 2099 23:59:59 GMT' http://localhost:3000 -- :0 vt7
Restart=always
RestartSec=5

[Install]
WantedBy=graphical.target
```

---

## Rocky Linux `bootc` Deployment Steps

1. **Build Container Image**:
   ```bash
   podman build -t registry.example.com/kiosk/dashboard:latest .
   ```

2. **Deploy to Target System**:
   ```bash
   bootc switch registry.example.com/kiosk/dashboard:latest
   ```

3. **Reboot Kiosk Target**:
   ```bash
   systemctl reboot
   ```
