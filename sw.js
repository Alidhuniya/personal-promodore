//es5
'use strict';
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw_cached_site.js').then(function(reg) {
            return console.log('Service Worker: Registered (Pages)');
        }).catch(function(err) {
            return console.log('Service Worker: Error: ' + err);
        });
    });
}