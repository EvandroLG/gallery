const version = 1;
const cacheName = `gallery-${version}`;
const urlsToCache = ['/', '/static/bundle.js'];
const fetchOptions = {
  method: 'GET',
  cache: 'no-cache',
  credentials: 'omit',
};

const cacheFiles = async (shouldReload = false) => {
  const cache = await caches.open(cacheName);
  const requestFile = async url => {
    if (!shouldReload) {
      const cached = await cache.match(url);

      if (cached) {
        return cached;
      }

      const response = await fetch(url, fetchOptions);

      if (response && response.ok) {
        await cache.put(url, response);
      }
    }
  };

  return Promise.all(urlsToCache.map(requestFile));
};

const handleActivation = async () => {
  await clients.claim();
  await cacheFiles(true);
};

const router = async req => {
  const url = new URL(req.url);
  const cache = await caches.open(cacheName);

  if (url.origin === location.origin) {
    const options = {
      ...fetchOptions,
      headers: req.headers,
      cache: 'no-store',
    };

    const response = await fetch(url, options);
    await cache.put(req.url, response.clone());
    return response;
  }

  const cached = await cache.match(req.url);

  return cached && cached.clone();
};

const main = async () => await cacheFiles();

self.addEventListener('install', () => {
  console.log(`Service Worker (${version}) installed`);
  self.skipWaiting();
});

self.addEventListener('activate', e => e.waitUntil(handleActivation));
self.addEventListener('fetch', e => e.respondWith(router(e.request)));

main().catch(console.error);
