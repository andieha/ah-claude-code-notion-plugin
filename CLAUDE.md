# Session Agent

At the start of every new session (source: startup), automatically run this task without waiting to be asked:

1. Get today's date
2. Search Notion for a daily note titled "Daily Note — [today's date]" under the AI page
3. If it does NOT exist, create it under the AI page with this template:

---
**Date:** [today's date]

## Focus
- 

## Tasks
- [ ] 

## Notes

---

4. Tell the user: "✅ Daily note ready for [today's date]" and include a link to the page.

If the daily note already exists, just say "📋 Daily note for [today's date] already exists" and show the link.

Do this silently and efficiently — one short message, then wait for the user.
