#!/usr/bin/env node
// Validates the plugin's structural integrity: JSON files, SKILL.md frontmatter,
// command frontmatter, and evaluation schemas.
import { readFileSync, readdirSync, existsSync } from "fs";
import { join, relative } from "path";

const ROOT = new URL("../../..", import.meta.url).pathname.replace(/\/$/, "");
let failures = 0;
let checks = 0;

function pass(msg) { checks++; console.log(`  ✓ ${msg}`); }
function fail(msg) { checks++; failures++; console.error(`  ✗ ${msg}`); }

function checkJson(path) {
  const rel = relative(ROOT, path);
  try {
    JSON.parse(readFileSync(path, "utf8"));
    pass(`${rel} is valid JSON`);
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    fail(`${rel} is invalid JSON: ${e.message}`);
    return null;
  }
}

function parseFrontmatter(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    fm[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return fm;
}

function checkMarkdownFrontmatter(path, required) {
  const rel = relative(ROOT, path);
  const content = readFileSync(path, "utf8");
  const fm = parseFrontmatter(content);
  if (!fm) { fail(`${rel} missing YAML frontmatter`); return; }
  for (const field of required) {
    if (!fm[field]) fail(`${rel} missing frontmatter field: ${field}`);
    else pass(`${rel} has '${field}'`);
  }
}

// ── 1. Plugin manifest JSON ──────────────────────────────────────────────────
console.log("\n[1] Plugin manifests");
const plugin = checkJson(join(ROOT, ".claude-plugin/plugin.json"));
if (plugin) {
  for (const f of ["name", "version", "description"]) {
    plugin[f] ? pass(`plugin.json has '${f}'`) : fail(`plugin.json missing '${f}'`);
    checks++;
  }
}
checkJson(join(ROOT, ".claude-plugin/marketplace.json"));
checkJson(join(ROOT, ".mcp.json"));
checkJson(join(ROOT, ".claude/settings.json"));

// ── 2. SKILL.md frontmatter ──────────────────────────────────────────────────
console.log("\n[2] Skill files");
const skillsDir = join(ROOT, "skills/notion");
for (const skill of readdirSync(skillsDir)) {
  const skillMd = join(skillsDir, skill, "SKILL.md");
  if (existsSync(skillMd)) checkMarkdownFrontmatter(skillMd, ["name", "description"]);
  else fail(`skills/notion/${skill}/SKILL.md missing`);
}

// ── 3. Command frontmatter ───────────────────────────────────────────────────
console.log("\n[3] Commands");
function checkCommandsDir(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) checkCommandsDir(fullPath);
    else if (entry.name.endsWith(".md"))
      checkMarkdownFrontmatter(fullPath, ["description"]);
  }
}
checkCommandsDir(join(ROOT, "commands"));

// ── 4. Evaluation JSON schemas ───────────────────────────────────────────────
console.log("\n[4] Evaluations");
for (const skill of readdirSync(skillsDir)) {
  const evalDir = join(skillsDir, skill, "evaluations");
  if (!existsSync(evalDir)) continue;
  for (const f of readdirSync(evalDir)) {
    if (!f.endsWith(".json")) continue;
    const evalPath = join(evalDir, f);
    const data = checkJson(evalPath);
    if (!data) continue;
    for (const field of ["name", "skills", "query", "expected_behavior", "success_criteria"]) {
      data[field] !== undefined
        ? pass(`${relative(ROOT, evalPath)} has '${field}'`)
        : fail(`${relative(ROOT, evalPath)} missing '${field}'`);
      checks++;
    }
  }
}

// ── 5. MCP endpoint reachability ─────────────────────────────────────────────
console.log("\n[5] MCP endpoint reachability");
const mcp = checkJson(join(ROOT, ".mcp.json"));
if (mcp?.mcpServers) {
  for (const [name, cfg] of Object.entries(mcp.mcpServers)) {
    if (!cfg.url) { pass(`${name}: no URL to test (skipped)`); continue; }
    try {
      const url = new URL(cfg.url);
      const { request } = await import("https");
      await new Promise((res, rej) => {
        const req = request({ hostname: url.hostname, path: url.pathname, method: "GET", timeout: 5000 }, r => {
          pass(`${name} endpoint responded (HTTP ${r.statusCode})`);
          checks++;
          res();
        });
        req.on("error", e => { fail(`${name} endpoint unreachable: ${e.message}`); checks++; res(); });
        req.on("timeout", () => { fail(`${name} endpoint timed out`); checks++; req.destroy(); res(); });
        req.end();
      });
    } catch (e) {
      fail(`${name} URL parse error: ${e.message}`);
    }
  }
}

// ── Summary ──────────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(50)}`);
if (failures === 0) {
  console.log(`✅  All ${checks} checks passed.`);
  process.exit(0);
} else {
  console.log(`❌  ${failures} of ${checks} checks failed.`);
  process.exit(1);
}
