var CACHE_NAME = `tw1PWA-offline-sw`;
var CACHE_VERSION = '0.0.0';

var ACTIVE_CACHE = `${CACHE_NAME}-v${CACHE_VERSION}`;

var appShellFiles = [
    '/',
    '/favicon.png',
    '/index.html',
    '/main.js',
    '/style.css',
    '/components/app.js',
    '/icons/icon192px.png',
    '/icons/icon512px.png'
];

var contentToCache = appShellFiles;

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(ACTIVE_CACHE).then(function (cache) {
            return cache.addAll(contentToCache);
        })
    );
});

// After Next Deployment
// self.addEventListener('activate', function (e) {
//     console.log('[Service Worker] Activate');
//     e.waitUntil(
//         caches.keys().then(function (cacheList) {
//             return Promise.all(
//                 cacheList.map(function (cache) {
//                     if (cache.startsWith(CACHE_NAME) && cache !== ACTIVE_CACHE) {
//                         console.log('[Service Worker] Remove Cache:', cache);
//                         return caches.delete(cache);
//                     }
//                 })
//             );
//         })
//     );
// });

// Remove All Caches
self.addEventListener('activate', function (e) {
    console.log('[Service Worker] Activate');
    e.waitUntil(
        caches.keys().then(function (cacheList) {
            return Promise.all(
                cacheList.map(function (cache) {
                    if (cache !== ACTIVE_CACHE) {
                        console.log('[Service Worker] Remove Cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(async function (response) {
                const cache = await caches.open(ACTIVE_CACHE);
                console.log('[Service Worker] Caching new resource: ' + e.request.url);
                cache.put(e.request, response.clone());
                return response;
            });
        })
    );
});
