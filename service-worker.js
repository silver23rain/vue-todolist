const cacheName = 'v1';
const cacheList = [
    '/',
    'manifest.json',
    '/todolist.js'
]

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log('[ServiceWorker] Caching app ...');
            return cache.addAll(cacheList)
        })
    )
});

// Life cycle: ACTIVATE
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
            if (key !== cacheName) {
              console.log('[ServiceWorker] Removing old cache', key);
              return caches.delete(key);
            }
          }));
        })
    );
    self.clients.claim();
});

// Functional: FETCH
self.addEventListener('fetch', event => {
    console.log('[ServiceWorker] Fetch ' + event.request.url);
    event.respondWith(
       caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
       }) 
    );
});