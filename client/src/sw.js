export default () => {
  const version = 1;

  const onInstall = () => console.log(`Service Worker (${version}) installed`);
  const onActivate = () => console.log(`Service Worker (${version}) activated`);
  const main = async () =>
    console.log(`Service Worker (${version}) is starting...`);

  self.addEventListener('install', onInstall);
  self.addEventListener('activate', onActivate);
  main().catch(console.error);
};
