/*
 * Retirement worker.
 *
 * The previous worker was cache-first and could keep serving an old
 * index.html after a deploy. This file does not cache anything. If a browser
 * still has that registration, the updated script deletes every cache,
 * unregisters, and reloads open tabs once.
 *
 * index.html does not call register(), so a normal visit never installs this
 * worker and the reload cannot loop.
 */
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      const windows = await self.clients.matchAll({ type: "window" });
      await self.registration.unregister();
      await Promise.all(windows.map((client) => client.navigate(client.url)));
    })(),
  );
});
