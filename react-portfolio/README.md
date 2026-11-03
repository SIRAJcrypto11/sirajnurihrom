# Siraj Nur Ihrom

Personal portfolio for Siraj Nur Ihrom, founder and chief executive of PT SNISHOP Network Indonesia. Vite 7, React 19, Tailwind CSS 4.

```bash
npm install
npm run dev
npm run build
```

`npm run build` writes a static site to `dist/`. Asset URLs are root-absolute (`/assets/...`), which matches hosting at the domain root on Vercel and on Hostinger Apache.

`public/.htaccess` is copied into `dist/` and sends unknown paths to `index.html` for client-side routes. `vercel.json` keeps the same fallback.

Set `VITE_SITE_URL` to override the canonical origin. If it is unset, meta tags, the sitemap, and `robots.txt` use `https://sirajnurihrom.com`. See `.env.example`.

Work entries live in `src/data/work.js`. Profile, experience, and skills live in `src/data/site.js`.

The previous cache-first service worker is retired. `public/sw.js` only clears old caches and unregisters itself. The page does not register a new worker, so deploys are not pinned to a stale `index.html`. `manifest.json` remains for install metadata.
