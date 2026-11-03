import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { listedWork } from "./src/data/work.js";
import { LOCALES, PUBLIC_LOCALES, hrefFor } from "./src/i18n/config.js";

function sitePlugin(siteUrl) {
  const origin = siteUrl.replace(/\/$/, "");
  const tails = ["", ...listedWork().map((entry) => `/work/${entry.slug}`)];
  const alternates = (tail) => [
    ...PUBLIC_LOCALES.map(
      (locale) =>
        `    <xhtml:link rel="alternate" hreflang="${locale.hreflang}" href="${origin}${hrefFor(locale, tail)}"/>`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${tail || "/"}"/>`,
  ].join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${tails
  .flatMap((tail) =>
    LOCALES.map(
      (locale) => `  <url>
    <loc>${origin}${hrefFor(locale, tail)}</loc>
${alternates(tail)}
  </url>`,
    ),
  )
  .join("\n")}
</urlset>
`;
  const robots = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

  return {
    name: "site-meta",
    transformIndexHtml(html) {
      return html.replaceAll("%SITE_URL%", origin);
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap });
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = env.VITE_SITE_URL || "https://sirajnurihrom.snishop.com";

  return {
    base: "/",
    plugins: [react(), tailwindcss(), sitePlugin(siteUrl)],
  };
});
