export default () => {
  const version = 1;

  const handleActivation = async () => {
    await clients.claim();
    console.log(`Service Worker (${version}) activated`);
  };

  const main = async () =>
    console.log(`Service Worker (${version}) is starting...`);

  self.addEventListener('install', () => {
    console.log(`Service Worker (${version}) installed`);
    self.skipWaiting();
  });

  self.addEventListener('activate', e => e.waitUntil(handleActivation));

  main().catch(console.error);
};
