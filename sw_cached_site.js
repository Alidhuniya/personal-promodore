//es5
'use strict';
var cacheName = 'v1';
self.addEventListener('install', function(e) {
    console.log('Service Worker: Installed');
});
self.addEventListener('activate', function(e) {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    e.waitUntil(caches.keys().then(function(cacheNames) {
        return Promise.all(cacheNames.map(function(cache) {
            if (cache !== cacheName) {
                console.log('Service Worker: Clearing Old Cache');
                return caches.delete(cache);
            }
        }));
    }));
});
self.addEventListener('fetch', function(e) {
    console.log('Service Worker: Fetching');
    e.respondWith(fetch(e.request).then(function(res) {
        var resClone = res.clone();
        caches.open(cacheName).then(function(cache) {
            cache.put(e.request, resClone);
        });
        return res;
    }).catch(function(err) {
        return caches.match(e.request).then(function(res) {
            return res;
        });
    }));
});