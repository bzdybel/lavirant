#!/usr/bin/env bash

# Preload base bash configuration and functions
source ./scripts/base.sh
setup_base_config

info "Watching and rebuilding frontend..."

BUILD_VERSION=\"v$(node -p -e "require('./package.json').version")\"
BUILD_DATE=$(date +"%s")

npx esbuild \
  --bundle \
  --define:BUILD_VERSION=$BUILD_VERSION \
  --define:BUILD_DATE=$BUILD_DATE \
  --watch frontend/index.tsx \
  --outdir=static/ \
  $@