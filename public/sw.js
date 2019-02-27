var cacheName = 'tw1PWA-v1';

var appShellFiles = [
    '/',
    '/404.html',
    '/favicon.png',
    '/index.html',
    '/main.js',
    '/style.css',
    '/components/app.js',
    '/icons/icon192px.png',
    '/icons/icon512px.png',
];

var contentToCache = appShellFiles;

// install the service-worker and cache the files
self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(contentToCache);
        })
    );
});

// fetch content from cache when available
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(async function (response) {
                const cache = await caches.open(cacheName);
                console.log('[Service Worker] Caching new resource: ' + e.request.url);
                cache.put(e.request, response.clone());
                return response;
            });
        })
    );
});

// clear out old cache not in use
self.addEventListener('activate', function (e) {
    console.log('[Service Worker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (cacheName.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});