const version = 1;
const cacheName = `gallery-v${version}`;

const router = async req => {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req.url);

  if (cached) {
    return cached.clone();
  }

  const url = new URL(req.url);

  const fetchOptions = {
    method: 'GET',
    credentials: 'omit',
    headers: req.headers,
    cache: 'no-store',
  };

  const response = await fetch(url, fetchOptions);
  await cache.put(req.url, response.clone());

  return response;
};

self.addEventListener('install', e => {
  const cacheFiles = async () => {
    const urlsToCache = ['/', '/static/bundle.js'];
    const cache = await caches.open(cacheName);

    return cache.addAll(urlsToCache);
  };

  e.waitUntil(cacheFiles());
});

self.addEventListener('activate', e => e.waitUntil(clients.claim()));

self.addEventListener('fetch', e => {
  const { request } = e;

  if (!request.url.includes('http') || request.method !== 'GET') {
    return;
  }

  e.respondWith(router(request));
});
