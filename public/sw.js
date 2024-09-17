importScripts('cache-list.js');

console.log('Service Worker: cacheList imported', urlsToCache);

const CACHE_NAME = 'my-cache-v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {

    console.log(event.request.url);

    event.respondWith(
        caches.match(event.request).then(response => {
            if (response)
            {
                return response;
            }
            return fetch(event.request).catch(() => {
                return new Response('You are offline', {
                    headers: { 'Content-Type': 'text/plain' }
                });
            });
        })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [ CACHE_NAME ];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1)
                    {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});