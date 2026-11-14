#!/bin/zsh
# CTFL study site — one-click start: kills any old server, starts fresh, opens the site.
cd "$(dirname "$0")/html" || { echo "❌ html/ folder not found"; read -r "?Press Enter to close"; exit 1; }
lsof -ti:8734 | xargs kill -9 2>/dev/null && echo "↩ stopped old server" || true
echo "▶ serving at http://localhost:8734  (Ctrl-C to stop)"
( sleep 1 && open http://localhost:8734 ) &
python3 -m http.server 8734
