#!/bin/zsh
# CTFL study site — one-click stop.
lsof -ti:8734 | xargs kill -9 2>/dev/null && echo "■ server stopped" || echo "no server was running"
sleep 1
