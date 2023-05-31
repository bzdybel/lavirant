#!/usr/bin/env bash

# Preload base bash configuration and functions
source ./scripts/base.sh
setup_base_config

info "Formatting all staged files..."
npx pretty-quick --staged

success "Staged files formatted successfully!"