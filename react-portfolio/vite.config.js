import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { listedWork } from "./src/data/work.js";

function sitePlugin(siteUrl) {
  const origin = siteUrl.replace(/\/$/, "");
  const locs = ["/", ...listedWork().map((entry) => `/work/${entry.slug}`)];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locs
  .map(
    (path) => `  <url><loc>${origin}${path}</loc></url>`,
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
  const siteUrl = env.VITE_SITE_URL || "https://sirajnurihrom.com";

  return {
    base: "/",
    plugins: [react(), tailwindcss(), sitePlugin(siteUrl)],
  };
});
