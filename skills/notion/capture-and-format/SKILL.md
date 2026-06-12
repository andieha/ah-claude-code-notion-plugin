---
name: notion-capture-and-format
description: Captures content from the conversation, structures it into a well-formatted Notion page with callouts, emoji section headers, and tables, and saves it as a sub-document under the most relevant existing Notion page. Use when asked to save, capture, document, or format something in Notion with nice formatting.
---

# Capture and Format

Takes content from the current conversation, structures it clearly, and saves it as a beautifully formatted Notion sub-document — with callouts, emoji headers, and tables — under the most relevant existing page in your workspace.

## Workflow

### Step 1: Identify what to capture

Extract the key content from the conversation:
- Reference information (tables, lists, comparisons)
- How-to or procedural knowledge
- Decisions and rationale
- Q&A pairs or prompt/response mappings

### Step 2: Find the right parent page

Use `Notion:notion-search` to find the most relevant existing page to nest the document under.

```
Search for: [topic keywords from the content]
Pick the most specific matching page as parent
```

If nothing relevant exists, create it at workspace level and tell the user.

### Step 3: Create the page with rich formatting

Use `Notion:notion-create-pages` with the parent page ID. Apply this formatting pattern:

**Opening callout** — one-sentence summary of what this document is:
```
> [!info] About this document
> [One sentence describing the content and its purpose]
```

**Section headers** — use emojis to aid scanning:
```
## 📦 [Section title]
## ⌨️ [Section title]
## 💬 [Section title]
## 🌐 [Section title]
## 🔧 [Section title]
```

**Tables** — for comparisons, mappings, or lists with attributes:
```
| Column 1 | Column 2 | Column 3 |
|---|---|---|
| value | value | value |
```

**Tip callouts** — for non-obvious guidance:
```
> [!tip] Short tip title
> Explanation of the tip
```

**Code blocks** — for commands, slash commands, or code snippets:
```
\```
/skill-name
command --flag
\```
```

**Dividers** — use `---` between major sections to create visual separation.

### Step 4: Verify and share

After creation, confirm with the user:
- Page title
- Parent page it was saved under
- Direct link to the new page

## Formatting Principles

- **One callout at the top** — acts as the page's intro/abstract
- **Emoji on every `##` header** — makes sections instantly scannable
- **Tables over bullet lists** — when content has 2+ attributes per item
- **Tip callouts sparingly** — only for genuinely non-obvious things
- **No wall of text** — break prose into short paragraphs or bullets
- **Code blocks for anything you'd type** — commands, skill names, config

## Example Output Structure

```
> [!info] About this document
> Reference guide for X, covering Y and Z.

---

## 📦 Section One
[table or bullets]

---

## ⌨️ How to Use
[numbered steps or code block]

> [!tip] Shortcut
> You can also just say X in plain language.

---

## 🌐 Comparison
[table]

---

## 🔧 Technical Details
[code block + explanation]
```

## Common Issues

**"Not sure which parent to use"** — search for the topic, pick the most specific match. When in doubt, ask the user.

**"Content doesn't fit a table"** — use bullets with bold labels (`**Label:** value`) instead.

**"Too much content for one page"** — split into a parent summary page with child sub-pages per section.
