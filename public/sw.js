importScripts("/cache-list.js")

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
            return cache.addAll([
                '/',
                ...urlsToCache,
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch((error) => {
                console.error('Fetch failed; returning offline page instead.', error);
                // You can return a fallback page or resource here if needed
                return caches.match('/offline.html'); // Ensure you have an offline.html in your cache
            });
        })
    );
});