# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CLI generator for Express Sweet applications. Scaffolds full-stack Express apps with authentication, Sequelize ORM, Handlebars views, and Tailwind CSS. Supports both CommonJS (CJS) and ECMAScript Modules (ESM) output formats.

- **Current version**: v5.0.0 (targets express-sweet v5)
- **CLI entry point**: `bin/express-sweet-cli.js` (CommonJS)

## Architecture

### Template Structure

- `templates/cjs/` — CommonJS application templates
- `templates/esm/` — ESM application templates

### Generation Flow

1. Copy templates from `templates/{cjs|esm}/` to target directory
2. Render `package.json.ejs` with variables (`name`) then delete the `.ejs` source

### EJS Template Variables

- `<%- name %>` — Sanitized application name (derived from directory name)

## Development

```bash
# Test CJS generation
node bin/express-sweet-cli.js test-app

# Test ESM generation
node bin/express-sweet-cli.js -o esm test-app

```

Generated apps use SQLite (`npm run setup` creates the database).

## Guidelines

- Both CJS and ESM templates must be maintained in parallel
- When adding config files, create in both `templates/cjs/config/` and `templates/esm/config/`
- Keep `express-sweet` version in template `package.json.ejs` in sync with generator version
- Update CHANGELOG.md and README.md structure diagram when changing templates
- All documentation and code comments in English
