#!/usr/bin/env bash

# Preload base bash configuration and functions
source ./scripts/base.sh
setup_base_config

info "Running pre-commit hook..."
./scripts/format-staged.sh
./scripts/lint.sh

success "Pre-commit hook has finished!"