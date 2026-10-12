#!/usr/bin/env bash

set -u

for port in 5173 5174 5175 8545 9119; do
  pids="$(lsof -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null || true)"
  if [[ -n "$pids" ]]; then
    kill $pids 2>/dev/null || true
  fi
done

docker rm -f playground >/dev/null 2>&1 || true

echo "Reset Porto Anvil development services."
