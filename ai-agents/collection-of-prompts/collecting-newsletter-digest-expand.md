# Collecting - Newsletter Digest (Expand)

## Overview

Type **Expand Newsletter Digest** (optionally specifying which email or date, e.g. "Expand today's AI Agent Brief") to take one or more newsletter-style emails from Gmail, strip out promotional clutter, and produce a clean, readable expanded document saved under AI Reports.

---

## Step 1 — Identify Source Email(s)

Search Gmail for the target newsletter(s), e.g.:

- `subject:"Daily AI Agent Brief"`
- `subject:"Weekly Digest"` (Skool community digests)

Default to today's date if no date is specified. If multiple matching emails exist, include all of them as separate sections in the output.

---

## Step 2 — Fetch Full Content

Use `get_thread` (FULL_CONTENT) to retrieve the full HTML/plaintext body of each email — `search_threads` snippets are too short to work from.

---

## Step 3 — Extract and Clean

For each email:

- Extract only the substantive editorial content (article items, headlines, "what changed / why it matters / try this" style sections, curated reading lists, etc.).
- **Exclude**: navigation bars, ad banners, promotional CTAs (e.g. "Browse Bounties", "Get Premium"), feedback widgets, unsubscribe/footer text, tracking pixels, and any boilerplate.
- If an email is a notification-only teaser with a "Read More" link and no real content in the body, say so explicitly in the output rather than inventing content — note that the full text would require visiting the original link.
- Rewrite each item in full prose paragraphs (no markdown headers within items, no bullet lists for the article body) while preserving all distinct facts, names, products, and recommendations.

---

## Step 4 — Structure the Output

- Add a top-level one-sentence intro noting the source emails and date(s) covered, and that promotional content has been removed.
- Group content under a plain-text section heading per source email (e.g. "From [Newsletter Name], [Date]").
- Within each section, one paragraph per item/story, in the order they appeared in the original email.
- Plain prose only — no markdown symbols, bullet points, or emoji within the body text (matches the TTS-friendly style used by the Aggregated Report).

---

## Step 5 — Save to Notion

Create a new page titled `📨 Newsletter Digest – [Month DD, YYYY] (Expanded)` directly under AI Reports (parent ID: `377e3c20-a8ee-8141-baaf-d8a52d4d2c50`). No confirmation needed.

---

## Trigger Commands

> Expand Newsletter Digest
> Expand [newsletter name] for [date]

If no newsletter is specified, default to any newsletter-style emails received today that contain "Digest" or "Brief" in the subject line.
