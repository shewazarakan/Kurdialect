const CACHE_NAME = "kurdish-translator-cache-v2";
const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/styles.css",
    "/app.js",
    "/manifest.json",
    "/service-worker.js",
    "/icon-512.png",
    "/icon.png"
];

// Install Service Worker & Cache Files
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("✅ Caching files...");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Activate Service Worker & Remove Old Caches
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});

// Fetch Requests & Serve from Cache if Offline
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => {
                return caches.match("/index.html"); // Fallback to main page
            });
        })
    );
});
