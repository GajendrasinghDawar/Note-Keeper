/**
 * Share Target handler for the service worker.
 *
 * When a user shares a markdown file to this PWA (Android), the OS sends a POST
 * request to /viewer. The SW intercepts it, caches the file content, and
 * redirects to /viewer?shared=true so the client can pick it up.
 */
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url)

    if (url.pathname === '/viewer' && event.request.method === 'POST') {
        event.respondWith(handleShareTarget(event.request))
    }
})

async function handleShareTarget(request) {
    try {
        const formData = await request.formData()
        const file = formData.get('file')

        if (file && file.size > 0) {
            const cache = await caches.open('share-target-cache')
            await cache.put(
                '/shared-file',
                new Response(file, {
                    headers: {
                        'Content-Type': file.type || 'text/markdown',
                        'X-File-Name': file.name || 'shared.md',
                    },
                })
            )
        }

        return Response.redirect('/viewer?shared=true', 303)
    } catch (err) {
        // If anything goes wrong, still redirect to the viewer (shows empty state)
        console.error('[SW] Share target handler error:', err)
        return Response.redirect('/viewer', 303)
    }
}
