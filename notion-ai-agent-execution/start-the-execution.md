# Start the Execution

## Overview

Type **Start the Execution** to run every prompt document inside the Collection of prompts folder (`37ee3c20-a8ee-81fd-924c-f389e19f9fa1`), in a single end-to-end pipeline. This page lives alongside the Collection of prompts folder under AI Agent Execution, acting as its orchestrator. No confirmation needed at any step.

---

## How It Works

1. Fetch the Collection of prompts folder (`37ee3c20-a8ee-81fd-924c-f389e19f9fa1`) and list all of its child pages.
2. Execute those child pages as steps, in this priority order:
   - Any page whose title contains "Collecting" or "Collect" runs first (in parallel with each other if multiple).
   - Any page whose title contains "Clean" runs next, after the collection step completes.
   - Pages whose titles contain "Sub-Agent", "Whitelist", or other supporting/helper terms are not separate top-level steps — they run as part of or alongside the collection/cleanup steps that reference them.
   - Any page whose title contains "Aggregated" or "TTS" runs **last, always**, regardless of folder order — this step depends on the output of all prior steps.
3. If new prompt pages are added to the Collection of prompts folder later, they are automatically included in the run according to the same ordering rules above. No manual update to this page is needed when the folder contents change.

---

## Step Details

### Collection step(s) — run first

Execute all "Collecting"/"Collect" prompts in parallel. These produce the day's news, field monitor digest, email summary, and daily intelligence brief.

### Cleanup step(s) — run second

Execute all "Clean" prompts after collection completes. These apply retention rules and archive excess pages across all report sections.

### Aggregation / TTS step — always last

Execute the "Aggregated Report (TTS)" prompt (or any future page with "Aggregated"/"TTS" in its title) targeting today's date. This:

1. Finds all of today's Daily Brief, AI News, Global News, and Swedish News pages.
2. Merges and deduplicates them into one clean, TTS-friendly summary (plain prose, no markdown, no symbols).
3. Saves it as `📊 Aggregated Report – [Month DD, YYYY]` under AI Reports.
4. Outputs the full plain-text report directly in the chat, ready to copy into a text-to-speech tool.

This step must run after cleanup so it pulls from the correct, de-duplicated current-day pages.

### Execution Log step — always after the Aggregation/TTS step

Add one entry to the Execution Log database (under AI Agent Execution, alongside this page) for this run:

- "Run" (title): [Month DD, YYYY] for today's date.
- "Date": today's date.
- Page content: a short, bulleted, plain-English summary of this run only — no TTS text, no full report text. Cover: what was collected/created (by section), anything skipped and why, Email Whitelist Monitor result, Clean All results (counts moved), the Investment Signal headline (ticker, buy/sell, exchange) if any, and any notable issues (e.g. duplicate runs, failures). Keep it to roughly 5–10 short lines.

If an Execution Log entry for today's date already exists, update it (overwrite its content) rather than creating a duplicate.

---

## Notes

- If collection produces multiple Daily Brief pages for today, include all of them as source material for the aggregation step — do not skip any.
- If any step fails (e.g. a tool drops mid-session), report which step failed but continue with the remaining steps where possible, and still attempt the aggregation/TTS step last using whatever content is available.
- Email body content stays untranslated; all summaries, headers, and footers across every step must be in English.

---

## Trigger Command

> Start the Execution

Runs every prompt in the Execution folder, with collection first, cleanup second, and the aggregated TTS report always last.
