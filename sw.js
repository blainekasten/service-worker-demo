console.log('starting service worker!');
// imports scripts locally or even from other sources
importScripts('./javascripts/cache-polyfill.js');


var CACHE_NAME = 'v1';

// this is called during the install 
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.add(
        '/index.html',
        '/stylesheets/stylesheet.css',
        '/stylesheets/pygment_trac.css',
        '/stylesheets/service-worker-style.css',
        '/javascripts/main.js'
      );
    })
  );
});


self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          console.log('cache found: ', cacheName);
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

//after service worker is installed, we can fetch our cached assets
self.addEventListener('fetch', function(event) {
  console.log('fetch event!')
  console.log(event);
  event.respondWith( 
    caches.match(event.request).then(function(response) {
      if (response) return response;

      // add to cache at this point then?
      return fetch(event.request);
    })
  );
});

console.log('service worker finished')
