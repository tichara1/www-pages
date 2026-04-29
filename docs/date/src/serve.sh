#!/usr/bin/env bash
# Serve the Évora app locally. Opens in default browser after start.
DIR="$(cd "$(dirname "$0")" && pwd)"
PORT=${PORT:-8080}

echo "Serving at http://localhost:$PORT/"

if command -v python3 &>/dev/null; then
  python3 -m http.server "$PORT" --directory "$DIR" &
  SERVER_PID=$!
elif command -v npx &>/dev/null; then
  npx --yes serve "$DIR" --listen "$PORT" &
  SERVER_PID=$!
else
  echo "Error: python3 or npx required" >&2; exit 1
fi

sleep 0.5
open "http://localhost:$PORT/" 2>/dev/null || xdg-open "http://localhost:$PORT/" 2>/dev/null || true

wait $SERVER_PID
