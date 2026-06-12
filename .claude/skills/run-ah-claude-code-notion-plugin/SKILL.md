---
name: run-ah-claude-code-notion-plugin
description: Run, validate, smoke-test, or verify the ah-claude-code-notion-plugin Claude Code plugin. Use when asked to run, test, validate, check, verify, or smoke-test this plugin or its assets.
---

# ah-claude-code-notion-plugin

This repo is a Claude Code **plugin** — a collection of Notion Skills, slash commands, MCP config, and plugin manifests. There is no server or GUI to launch. "Running" the project means validating that all assets are structurally sound via a smoke script.

The driver is `.claude/skills/run-ah-claude-code-notion-plugin/smoke.mjs` (Node.js 18+, no dependencies).

## Prerequisites

Node.js ≥ 18 (available in this container as v22).

```bash
node --version
```

## Run (agent path)

From the repo root:

```bash
node .claude/skills/run-ah-claude-code-notion-plugin/smoke.mjs
```

Exits 0 on success, 1 on any failure. Expected output: `✅  All N checks passed.`

The script checks:

| Section | What is checked |
|---------|----------------|
| Plugin manifests | `.claude-plugin/plugin.json`, `marketplace.json`, `.mcp.json`, `.claude/settings.json` are valid JSON with required fields |
| Skill files | Every `skills/notion/*/SKILL.md` has `name` and `description` frontmatter |
| Commands | Every `commands/**/*.md` has `description` frontmatter |
| Evaluations | Every `skills/notion/*/evaluations/*.json` has `name`, `skills`, `query`, `expected_behavior`, `success_criteria` |
| MCP endpoint | `https://mcp.notion.com/mcp` responds (HTTP 403 = unauthenticated but reachable is a pass) |

## Run (human path)

Same command — there is no interactive human path; the plugin is consumed by Claude Code on install.

## Gotchas

- **MCP endpoint returns 403** — this is correct and expected. The server is reachable; 403 means authentication is required. The smoke test accepts any HTTP response as "reachable."
- **Path resolution in smoke.mjs** — `ROOT` is computed via `new URL("../../..", import.meta.url)`. From the skill file's location (`.claude/skills/run-ah-claude-code-notion-plugin/smoke.mjs`), three `..` traversals land at the repo root. Four would overshoot to the parent of the repo.
- **No package.json** — this repo has no build step, no `node_modules`, no `npm install`. The smoke script uses only Node built-ins.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `ENOENT: no such file or directory, open '/home/user/...'` | You ran the script from the wrong directory. `cd` to the repo root first. |
| `ENOENT: ...scandir '.../skills/notion'` | Same — wrong working directory. |
| `notion endpoint unreachable` | No outbound HTTPS. Check container network policy. |
| `invalid JSON` on any manifest | The file has a syntax error — open it and check. |
