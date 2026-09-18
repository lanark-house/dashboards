#!/bin/bash

# Hide cursor activity
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
