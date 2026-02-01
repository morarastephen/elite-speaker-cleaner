
/**
 * SERVICE WORKER
 * This script runs in the background. It catches network requests and 
 * can serve them from a cache if the user is offline.
 */

const CACHE_NAME = 'sonicpurge-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './index.tsx',
  './manifest.json',
  'https://cdn.tailwindcss.com'
];

// 1. INSTALL: Occurs when the browser first sees the worker.
// We save our core files into the browser's cache here.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching app shell');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. FETCH: Occurs every time the app asks for a file.
// We try to return the file from the cache first for speed.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from internet
      return response || fetch(event.request);
    })
  );
});
