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
