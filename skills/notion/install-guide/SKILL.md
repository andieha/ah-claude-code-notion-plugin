---
name: notion-install-guide
description: Creates a structured installation or setup guide in Notion for any plugin, tool, or service. Use when asked to document how to install, set up, or configure something — covers multiple environments, commands, options, and dependencies. Saves the guide under the most relevant Notion page.
---

# Install Guide

Creates a clean, structured installation or setup guide in Notion — covering all relevant environments, exact commands, warnings, and a feature/command table. Saves it under the most relevant existing Notion page.

## Workflow

### Step 1: Extract the installation content

From the conversation or provided source, identify:
- What is being installed (plugin, tool, service, integration)
- All installation methods / environments (web, CLI, desktop, API, etc.)
- Exact commands for each method, in order
- Prerequisites or dependencies that must be installed first
- Available features, commands, or verticals
- Any data connectors, integrations, or add-ons
- Management commands (list, disable, uninstall, reload)

### Step 2: Find the right parent page

Use `Notion:notion-search` to find the most relevant existing page.

```
Search for: [tool/plugin name] OR [category e.g. "AI development", "developer tools"]
Pick the most specific matching page as parent
```

If nothing relevant exists, create at workspace level and tell the user.

### Step 3: Create the guide with this structure

Use `Notion:notion-create-pages` with the parent page ID.

**Opening callout:**
```
> [!info] About this document
> Step-by-step installation guide for [tool/plugin] — covering [environments listed].
```

**Identify the user's current environment first** and lead with that method, marked clearly as "Your Setup":
```
## ✅ Your Setup — [User's current environment]
## 🖥️ Alternative — [CLI/local method]
## 🏢 Alternative — [Enterprise/other method]
```

For users on **claude.ai/code (web)**: always lead with the `settings.json` approach since `/plugin` is not available. Make the 4 steps explicit: open the file → add the entry → commit & push → start a new session.

Each section contains:
- Numbered steps with exact commands in code blocks
- A warning callout for any required order or prerequisite
- A tip callout for "takes effect after..." or "only available in..."

**Features/commands table:**
```
## 📦 What You Get — [Verticals/Features/Commands]

| Plugin/Module | Key commands | Use case |
|---|---|---|
```

**Dependencies/connectors section** (if applicable):
```
## 🔌 [Integrations / Data Connectors / Dependencies]
```

**Management commands section:**
```
## ⚙️ Management Commands

[code block with list/disable/uninstall/reload commands]
```

### Step 4: Choose an appropriate page icon

Match the icon to the tool category:
- 📉 Financial / trading tools
- 🔌 Integrations / connectors
- 🛠️ Developer tools
- 🤖 AI / agent tools
- 📊 Analytics / data tools
- ☁️ Cloud / infrastructure

### Step 5: Confirm with the user

Return:
- Page title and icon used
- Parent page it was saved under
- Direct link to the new page

## Formatting Rules

- **Warning callouts** for anything that must happen in a specific order
- **Tip callouts** for environment limitations or "takes effect after X"
- **Code blocks** for every command — never inline
- **Tables** for feature/command lists — never bullets when there are 3+ attributes
- **Dividers** (`---`) between every major section
- **Emoji on every `##` header** — makes it scannable

## Common Issues

**"Multiple environments"** — always cover all of them; mark the user's current one first.

**"Prerequisites"** — add a `> [!warning]` callout immediately before the step that requires them.

**"Long command list"** — group into one code block per logical step, not one per command.

**"Not sure which parent"** — search for the tool name, then the category. Ask if still unclear.
