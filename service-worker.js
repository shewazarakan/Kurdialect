const CACHE_NAME = "kurdisiv-cache-v1";
const API_URL = "https://sheetdb.io/api/v1/cg3gwaj5yfawg";
const STATIC_ASSETS = [
    "/",
    "/index.html",
    "/styles.css",
    "/app.js",
    "/icon.png",
    "/icon-512.png",
    "/manifest.json"
];

// Install Service Worker and Cache Static Assets
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
});

// Activate and Remove Old Caches
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});

// Intercept Fetch Requests
self.addEventListener("fetch", event => {
    if (event.request.url.includes(API_URL)) {
        // Try fetching from network first, then fallback to cache
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    return response;
                })
                .catch(() => {
                    return caches.match(event.request);
                })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                return cachedResponse || fetch(event.request);
            })
        );
    }
});
