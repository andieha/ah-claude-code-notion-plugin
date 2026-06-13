# Description

See [Execution Flow Diagram](execution-flow-diagram.md) for a visual overview of this pipeline.

This page describes, in plain language, everything that runs when **Start the Execution** is triggered (e.g. as a nightly prompt at 03:00). It is a reference companion to the Start the Execution orchestrator and the Collection of prompts folder — update this page whenever a prompt is added, removed, or changed in that folder.

---

## How the run is structured

Start the Execution fetches the Collection of prompts folder and runs its child prompts in three ordered phases:

1. Collection phase — all prompts whose title contains "Collecting" or "Collect" run first, in parallel.
2. Cleanup phase — all prompts whose title contains "Clean" run second, after collection finishes.
3. Aggregation / TTS phase — the "Aggregated Report (TTS)" prompt always runs last, using the cleaned, de-duplicated output of the earlier phases.

Supporting prompts (titles containing "Sub-Agent", "Whitelist", or similar helper terms) are not separate top-level steps — they execute as part of, or alongside, the collection step that references them.

---

## Phase 1 — Collection (parallel)

### Start Collecting All

Runs four collection tasks simultaneously:

- AI / Global / Swedish News — three web-search tasks, one dated sub-page each under AI News, Global News, and Swedish News (5 stories per page, English, last 24h prioritized).
- Field Monitor — 7-day analysis of "AI Agents & Tool Use", written as a weekly digest page under Field Monitor (themed clusters, "So What", "Who to Follow").
- Email Summary — fetches today's Gmail, summarizes every inbox email (sender, subject, time, 2–3 sentence summary), saved under Email Summary.
- Daily Intelligence Brief — 48-hour intelligence sweep covering Markets & Investments, AI & Technology, Strategic Signals, and Today's Top 3, each item with "why this matters" and a 5-year lens. Saved under AI Reports as Daily Brief – [date].

Supporting prompts that run as part of this step:

- Daily Intelligence Brief — Sub-Agent Prompt — the detailed sub-agent logic behind the Daily Intelligence Brief task above.
- Email Whitelist Monitor — Prompt — scans the last 24h of inbox mail, classifies each email (Whitelist / Action Needed / FYI / Skip), drafts replies (Gmail drafts only, never sent) for whitelisted or action-needed mail, and logs results to the relevant Notion case pages / Reports > Email Important.

### Collecting - AI/Robotics Investment Signals (Agent Prompts)

Runs the 3-agent investment monitoring pipeline, orchestrated in sequence:

1. News Collector — searches the web for fresh AI/robotics investment news (last 24h), writes new rows to the AI/Robotics News Feed database (Status = Unprocessed).
2. Analyzer — reads unprocessed news rows, assesses investment implications against the satellite portfolio (AI/robotics ETFs, semiconductor/memory holdings), writes rows to the AI/Robotics Analysis database (Recommendation, Confidence, Reasoning), and marks source news as Processed.
3. Signal Generator — reads Analysis rows with Recommendation in (Consider Buy / Consider Sell / Reduce) and Confidence Medium/High, identifies the most direct tradable ticker (Xetra-listed prioritized, e.g. VVSM), writes new rows to the Investment Signals database, and creates a matching "Investment Signal – ..." summary page under AI Reports.

All three databases (News Feed, Analysis, Investment Signals) live under AI > AI Agents > AI Agents Memory.

---

## Phase 2 — Cleanup

### Clean All

For each collection section (AI News, Global News, Swedish News, Email Summary, Field Monitor, AI Reports / Daily Brief), keeps the 5 most recent pages and moves anything older to the 🗑️ Clean staging page under Admin.

> ⚠️ Manual step: pages moved to 🗑️ Clean must be permanently deleted by hand in Notion — Claude cannot delete pages.

---

## Phase 3 — Aggregation / TTS (always last)

### Aggregated Report (TTS)

Finds today's Daily Brief page(s) and today's Investment Signal page(s) under AI Reports, merges and de-duplicates them into one TTS-friendly plain-prose report grouped by theme (Markets & Economy, AI & Technology, Geopolitics, Personal Items / Action Points, Investment Signals, Top Priorities). Saves the result as 📊 Aggregated Report – [date] under AI Reports, and outputs the full plain-text report in the chat, ready for a text-to-speech tool.

### Collecting - Newsletter Digest (Expand)

Finds today's newsletter-style emails in Gmail (subject containing "Digest" or "Brief"), strips out promotional clutter and navigation/ad content, rewrites the substantive editorial content in clean prose, and saves it as a 📨 Newsletter Digest – [date] (Expanded) page under AI Reports.

---

## Not currently part of the automated run

None at present — all prompts in the Collection of prompts folder now match a recognized phase (Collecting/Clean/Aggregated).

---

## Quick reference — run order summary

1. (parallel) Start Collecting All — News x3, Field Monitor, Email Summary (+ Whitelist Monitor), Daily Intelligence Brief
2. (parallel) Collecting - AI/Robotics Investment Signals — News Collector → Analyzer → Signal Generator
3. (parallel) Collecting - Newsletter Digest (Expand) — today's newsletter emails cleaned up and saved under AI Reports
4. Clean All — retention cleanup across all sections (manual deletion step afterward)
5. Aggregated Report (TTS) — merges Daily Brief + Investment Signal pages into one TTS-ready report

---

## Maintenance notes

- Last updated: June 13, 2026.
- When adding a new prompt to the Collection of prompts folder, also add a short section here describing what it does, its inputs/outputs, and which phase it belongs to.
- If a new prompt should run nightly but its title doesn't naturally fit the Collecting/Clean/Aggregated pattern, either rename it to fit, or update Start the Execution's step list explicitly.
