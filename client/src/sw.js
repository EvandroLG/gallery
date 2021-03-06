const version = 2;
const cacheName = `gallery-v${version}`;

const makeRequest = async ({ url, headers }) => {
  const fetchOptions = {
    method: 'GET',
    credentials: 'omit',
    headers: headers,
    cache: 'no-store',
  };

  try {
    const response = await fetch(url, fetchOptions);
    const cache = await caches.open(cacheName);
    await cache.put(url, response.clone());

    return response;
  } catch (err) {
    console.error(err);
  }
};

const getFromCache = async url => {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(url);

  if (cached) {
    return cached.clone();
  }
};

const router = async req => {
  if (req.method !== 'GET') {
    return;
  }

  if (req.url.includes('/api/')) {
    const response = await makeRequest(req);
    return response ? response : getFromCache(req.url);
  }

  const cached = await getFromCache(req.url);

  return cached ? cached : makeRequest(req);
};

self.addEventListener('install', e => {
  const cacheFiles = async () => {
    const urlsToCache = ['/', '/static/bundle.js'];
    const cache = await caches.open(cacheName);

    return cache.addAll(urlsToCache);
  };

  e.waitUntil(cacheFiles());
});

self.addEventListener('activate', e => {
  const cleanCache = async () => {
    const keys = await caches.keys();
    return Promise.all(
      keys.filter(key => key !== cacheName).map(key => caches.delete(key)),
    );
  };

  e.waitUntil(cleanCache());
});

self.addEventListener('fetch', e => {
  const { request } = e;

  if (!request.url.includes('http')) {
    return;
  }

  e.respondWith(router(request));
});
