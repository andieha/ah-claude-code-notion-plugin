# Aggregated Report (TTS)

## Overview

Type **Create Aggregated Report** (optionally followed by a date, e.g. "Create Aggregated Report for June 13") to merge all of today's Daily Brief reports into a single, clean, TTS-ready summary, save it to Notion, and output the full text in the chat for copy/paste into a text-to-speech tool.

---

## Step 1 — Find Source Reports

In the AI Reports section (parent ID: `377e3c20-a8ee-8141-baaf-d8a52d4d2c50`), find all Daily Brief pages whose title date matches the target date (default: today). There may be multiple Daily Brief pages for the same date — include all of them as source material.

Also find any "Investment Signal" pages in the same AI Reports section whose title date matches the target date, and include them as additional source material (see Step 2 for how these are handled).

If no Daily Brief pages exist for the target date, say so and stop — do not generate a report from older dates without confirming first.

---

## Step 2 — Aggregate and Clean

Merge the content of all matching source reports into one unified report, following these rules:

**Structure:**

- Group content by theme (e.g. Markets & Economy, AI & Technology, Geopolitics, Personal Items / Action Points, Investment Signals, Top Priorities), merging overlapping sections across source reports into one combined section per theme.
- Any "Investment Signal" pages found in Step 1 go into a dedicated "Investment Signals" section: for each, describe in prose the ticker (including exchange/currency), recommendation, confidence, and a brief reasoning summary — no tables or bracketed data. Always state explicitly whether the recommendation is to buy/accumulate or sell/reduce, and name the exchange it applies to (e.g. "a recommendation to buy, or add to, VVSM on Xetra" / "a recommendation to sell, or reduce, ... on Xetra"), so the direction of the signal is unambiguous when read aloud.
- Deduplicate repeated stories — if the same event appears in multiple source reports, merge into a single paragraph using the most complete version.
- Preserve all distinct facts, figures, names, and action items. Do not drop content for the sake of brevity — only remove formatting and redundancy.

**TTS-friendly formatting (strict):**

- Plain prose only. No markdown symbols of any kind: no `#`, `##`, `*`, `**`, `-`, `_`, emoji, or bullet points.
- Section headers are plain text on their own line (e.g. "Markets and Economy"), not markdown headings.
- Write numbers, currency, and percentages in a TTS-friendly way: spell out symbols where it improves readability (e.g. "$75 billion" is fine, but avoid stacked symbols, footnote markers, or bracketed citations).
- No tables, no code blocks, no links. If a source link must be referenced, describe it in prose ("a report from...") rather than pasting a URL.
- Each section should read as flowing paragraphs — 1 to 4 paragraphs per theme, written in full sentences.
- End with a "Top Priorities for Today" section in plain prose, summarizing the most actionable items.

---

## Step 3 — Save to Notion

Create a new page titled `📊 Aggregated Report – [Month DD, YYYY]` under AI Reports (parent ID: `377e3c20-a8ee-8141-baaf-d8a52d4d2c50`). No confirmation needed.

---

## Step 4 — Output for TTS

After saving, output the full plain-text report directly in the chat in a single response, with no preamble, no commentary, and no markdown formatting — ready to be copied straight into a text-to-speech tool. Do not summarize or truncate; output the complete report text.

---

## Trigger Commands

> Create Aggregated Report
> Create Aggregated Report for [date]
> Fetch the aggregated report for TTS

The last variant skips Steps 1–3 if a matching Aggregated Report page already exists for the target date, and goes straight to fetching and outputting its plain-text content (Step 4).
