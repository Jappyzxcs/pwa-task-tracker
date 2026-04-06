const CACHE_NAME = 'task-tracker-v1';

// The files we want to save for offline use
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json'
];

// Step 1: Install the Service Worker and save the files to cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and saving files');
        return cache.addAll(urlsToCache);
      })
  );
});

// Step 2: Intercept requests and serve the cached files if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the file is in the cache, return it
        if (response) {
          return response;
        }
        // Otherwise, download it from the network
        return fetch(event.request);
      })
  );
});