# AI Agent Execution

Hub for automated AI agent workflows. Contains the runnable prompts behind all automations.

## Structure

- **[Collection of prompts](collection-of-prompts/)** — the prompt documents that power each phase
- **[Start the Execution](start-the-execution.md)** — orchestrator: runs all prompts end-to-end
- **[Description](description/)** — written explanation and flow diagram of the full pipeline
- **[AI Agents Memory](ai-agents-memory.md)** — shared Notion databases used by the investment agents
- **[Sprint](sprint/)** — active sprint tasks
- **Execution Log** — Notion database logging each run (not exported here)

## Run Order

1. (parallel) Start Collecting All — News x3, Field Monitor, Email Summary + Whitelist Monitor, Daily Intelligence Brief
2. (parallel) Collecting - AI/Robotics Investment Signals — News Collector → Analyzer → Signal Generator
3. (parallel) Collecting - Newsletter Digest (Expand)
4. Clean All
5. Aggregated Report (TTS)
