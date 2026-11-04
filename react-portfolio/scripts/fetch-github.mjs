#!/usr/bin/env node
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { fetchLive } from "../src/lib/github.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--out" && argv[i + 1]) {
      args.out = argv[i + 1];
      i += 1;
    }
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv);
  const defaultOut = resolve(repoRoot, "public/github.json");
  const outPath = args.out ? resolve(repoRoot, args.out) : defaultOut;

  const token = process.env.GITHUB_TOKEN || null;
  if (token) {
    // Token is available but must never be printed
  }

  const source = process.env.GITHUB_ACTIONS ? "actions" : "local";

  let payload;
  try {
    payload = await fetchLive({
      token,
      withLanguageBytes: true,
      commitLookups: 10,
    });
  } catch (error) {
    console.error(`Failed to fetch GitHub data: ${error.message}`);
    process.exit(1);
  }

  payload.source = source;

  const dir = dirname(outPath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const json = JSON.stringify(payload);
  writeFileSync(outPath, json, "utf8");
  console.log(`Wrote ${outPath} (${json.length} bytes)`);
}

main();
