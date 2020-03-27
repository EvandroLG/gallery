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
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req.url);

  if (cached) {
    return cached.clone();
  }

  const url = new URL(req.url);

  const options = {
    ...fetchOptions,
    headers: req.headers,
    cache: 'no-store',
  };

  const response = await fetch(url, options);
  await cache.put(req.url, response.clone());

  return response;
};

const main = async () => await cacheFiles();

self.addEventListener('fetch', e => {
  if (!e.request.url.includes('http') || e.request.method !== 'GET') {
    return;
  }

  e.respondWith(router(e.request));
});

self.addEventListener('install', () => {
  console.log(`Service Worker (${version}) installed`);
  self.skipWaiting();
});

self.addEventListener('activate', e => e.waitUntil(handleActivation));

main().catch(console.error);
