importScripts("/cache-list.js")

const CACHE_NAME = 'my-cache-01';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                '/',
                ...urlsToCache,
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [ CACHE_NAME ];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName))
                    {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch((error) => {
                console.error('Fetch failed; returning offline page instead.', error);
                return caches.match('/offline.html'); 
            });
        })
    );
});