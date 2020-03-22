const version = 1;
const cacheName = `gallery-${version}`;
const urlsToCache = ['/', '/static/bundle.js'];

const request = async (url, cache) => {
  const options = {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'omit',
  };

  const response = await fetch(url, options);

  if (response.ok) {
    await cache.put(url, response);
  }
};

const cacheFiles = async (shouldReload = false) => {
  const cache = await caches.open(cacheName);
  const requestFile = async url => {
    if (!shouldReload) {
      const response = await cache.match(url);

      if (response) {
        return response;
      }

      await request(url, cache);
    }
  };

  return Promise.all(urlsToCache.map(requestFile));
};

const handleActivation = async () => {
  await clients.claim();
  await cacheFiles(true);
};

const main = async () => await cacheFiles();

self.addEventListener('install', () => {
  console.log(`Service Worker (${version}) installed`);
  self.skipWaiting();
});

self.addEventListener('activate', e => e.waitUntil(handleActivation));

main().catch(console.error);
