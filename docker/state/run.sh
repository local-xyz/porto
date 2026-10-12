#!/usr/bin/env bash
set -euo pipefail

cp /app/anvil.json /app/shared/anvil.json
cp /app/relay.yaml /app/shared/relay.yaml

echo "Copied the generated Anvil state and Relay config."
