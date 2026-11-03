import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { listedWork } from "../src/data/work.js";
import { LOCALES, hrefFor } from "../src/i18n/config.js";

const root = resolve(import.meta.dirname, "..");
const port = 4178;
const routes = LOCALES.flatMap((locale) => [
  hrefFor(locale, ""),
  ...listedWork().map((entry) => hrefFor(locale, `/work/${entry.slug}`)),
]);

function outFile(route) {
  if (route === "/") return resolve(root, "dist/index.html");
  return resolve(root, "dist", route.slice(1), "index.html");
}

function start(command, args) {
  const child = spawn(command, args, { cwd: root, stdio: "pipe" });
  return child;
}

async function waitFor(url) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // preview is still booting
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 250));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

const preview = start("npx", ["vite", "preview", "--host", "127.0.0.1", "--port", String(port), "--strictPort"]);
const chrome = start("google-chrome", [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  "--hide-scrollbars",
  "--no-first-run",
  "--user-data-dir=/tmp/chrome-prerender",
  "--remote-debugging-port=9335",
  "about:blank",
]);

function stop() {
  preview.kill("SIGTERM");
  chrome.kill("SIGTERM");
}

try {
  await waitFor(`http://127.0.0.1:${port}/`);
  await waitFor("http://127.0.0.1:9335/json/version");
  const version = await fetch("http://127.0.0.1:9335/json/version").then((response) => response.json());
  const browser = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((resolvePromise) => {
    browser.onopen = resolvePromise;
  });
  let seq = 0;
  const pending = new Map();
  function send(method, params = {}, sessionId) {
    const id = ++seq;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    browser.send(JSON.stringify(payload));
    return new Promise((resolvePromise, reject) => {
      const timer = setTimeout(() => reject(new Error(`timeout ${method}`)), 20000);
      pending.set(id, {
        resolve: (value) => {
          clearTimeout(timer);
          resolvePromise(value);
        },
        reject,
      });
    });
  }
  browser.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve: done, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(JSON.stringify(message.error)));
      else done(message.result);
    }
  };

  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  await send("Page.enable", {}, sessionId);
  await send("Runtime.enable", {}, sessionId);
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1280,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  }, sessionId);

  const pages = new Map();
  for (const route of routes) {
    await send("Page.navigate", { url: `http://127.0.0.1:${port}${route}` }, sessionId);
    await send("Runtime.evaluate", {
      expression: `new Promise((resolve) => {
        const start = Date.now();
        const tick = () => {
          const ready = document.querySelector("h1") && document.documentElement.lang;
          if (ready || Date.now() - start > 8000) resolve(document.title);
          else setTimeout(tick, 50);
        };
        tick();
      })`,
      awaitPromise: true,
      returnByValue: true,
    }, sessionId);
    const html = await send("Runtime.evaluate", {
      expression: "document.documentElement.outerHTML",
      returnByValue: true,
    }, sessionId);
    pages.set(route, `<!doctype html>\n${html.result.value}`);
    console.log("prerendered", route);
  }
  browser.close();

  for (const [route, html] of pages) {
    const file = outFile(route);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
  }
  console.log(`wrote ${pages.size} html files`);
} finally {
  stop();
  process.exit(0);
}
