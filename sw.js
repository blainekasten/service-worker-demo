console.log('starting service worker!');
// imports scripts locally or even from other sources
importScripts('./javascripts/cache-polyfill.js');


var CACHE_NAME = 'v1';

// this is called during the install 
self.oninstall = function(event) {
  event.waitUntil(
    caches.create(CACHE_NAME).then(function(cache) {
      return cache.add(
        './index.html',
        './stylesheets/stylesheet.css',
        './stylesheets/pygment_trac.css',
        './stylesheets/service-worker-style.css',
        './javascripts/main.js'
      );
    })
  );
};


self.onactivate = function(event) {}

//after service worker is installed, we can fetch our cached assets
self.onfetch = function(event) {
  event.respondWith( caches.match(event.request) );
};

console.log('service worker finished')
