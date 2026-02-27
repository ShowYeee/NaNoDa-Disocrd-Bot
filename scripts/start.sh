#!/bin/bash

# Run DB migration first; stop startup if it fails.
if ! npm run migrate:create-cat-record; then
  echo "Error: migration failed, abort startup" >&2
  exit 1
fi

# Deploy slash commands; do not block bot startup on deploy failure.
if ! node scripts/deploy-commands.js; then
  echo "Warning: slash command deploy failed, continuing bot startup" >&2
fi

# Start bot process.
exec node src/index.js
