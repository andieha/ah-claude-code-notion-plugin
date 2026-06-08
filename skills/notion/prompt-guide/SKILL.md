---
name: notion-prompt-guide
description: Turns session knowledge into a beautiful, prompt-based guide saved to Notion. Captures what was learned or built in a session and rewrites it as plain-language prompts a user can re-use — no code, no commands, just natural language. Saves the result as a well-structured, visually appealing Notion page.
---

# Prompt Guide

Transforms session knowledge into a beautiful, reusable prompt guide saved to Notion. Instead of documenting commands or code, this skill rewrites everything as plain natural-language prompts — so anyone can reproduce the workflow just by talking to Claude.

## Quick Start

When asked to create a prompt guide from session knowledge:

1. **Extract knowledge**: Identify what was learned, built, or decided in the session
2. **Rewrite as prompts**: Turn every action into a plain-language prompt the user can re-use
3. **Group and structure**: Organise prompts into logical sections with clear headings
4. **Make it pretty**: Use emojis, callout blocks, dividers, and a tip at the end
5. **Save to Notion**: Use `Notion:notion-create-pages` under the specified parent page

## Workflow

### Step 1: Extract the knowledge

From the session context, identify:
- What tools or integrations were set up
- What workflows were discovered or used
- What skills or features were enabled
- Any tips, workarounds, or gotchas found along the way

### Step 2: Rewrite everything as prompts

For every action or concept, write a natural-language prompt the user can say to Claude:

```
Instead of:  cp skills/notion/*.md .claude/commands/
Write as:    "Add the Notion skills to the project so they appear in the slash menu"

Instead of:  mcp__Notion__notion-create-pages
Write as:    "Create a new page called [title] under [parent page] in Notion"
```

Rules:
- No code blocks with commands
- No technical tool names
- No jargon — write for a non-developer
- Use `[placeholder]` for parts the user fills in
- Use italic quotes around each prompt: > *"..."*

### Step 3: Structure into sections

Group prompts into logical sections based on the topic. Each section should have:
- A relevant emoji in the heading
- 2–5 prompts
- A one-line intro explaining what the section covers

Typical sections for a Claude Code + Notion session:
- Connecting to Notion
- Creating Content
- Managing Tasks
- Using Skills
- Web Search

### Step 4: Make it visually appealing

- Start with a short overview paragraph and a `>` callout block
- Use `---` dividers between sections
- End with a `> 💡 Tip:` callout summarising the key insight
- Keep it scannable — short sentences, no walls of text

### Step 5: Optionally append extra sections

If the user asks to add more (e.g. "also add the skills and what they do"):
- Use `Notion:notion-update-page` with `insert_content` at the end
- Follow the same visual style as the original page
- Add a `---` divider before the new section

## Content Principles

**Write for the user, not the developer**
Every prompt should sound like something a non-technical person would naturally say.

**Prompts over procedures**
Don't describe a workflow step by step — just give the prompt that triggers it.

**Pretty over thorough**
A guide people actually read is better than a complete one they skip.
Use whitespace, emojis, and dividers generously.

**Placeholders in brackets**
Always use `[topic]`, `[page name]`, `[person]` etc. so the user knows what to fill in.

## Output Format

```
## [Section Title with emoji]

One-line intro.

> *"Prompt one"*

> *"Prompt two with [placeholder]"*

---
```

## Common Issues

**"Too technical"**: Remove all tool names, file paths, and code. Rewrite until a non-developer would understand.

**"Sections feel unrelated"**: Group by user goal (What do I want to do?) not by tool (What did Claude use?).

**"Page looks plain"**: Add more emojis to headings, use `>` callout blocks, add a `---` tip at the end.

## Example

See the **test 10** page in Notion under 🤖 AI for a real example of this skill's output.
