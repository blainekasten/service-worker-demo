console.log('starting service worker!');
// imports scripts locally or even from other sources
importScripts('./javascripts/cache-polyfill.js');
console.log('imported cache')


////// these are pages we are going to cache, so they can work offline
var urlsToCache = [
  './index.html',
  './stylesheets/stylesheet.css',
  './stylesheets/pygment_trac.css',
  './stylesheets/service-worker-style.css',
  './javascripts/main.js'
];

var CACHE_NAME = 'my-site-cache-v3';

// this is called during the install 
this.addEventListener('install', function(event) {
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
});



//after service worker is installed, we can fetch our cached assets
this.addEventListener('fetch', function(event) {
  var cachedResponse = caches.match(event.request).catch(function() {
    return event.default().then(function(response) {
      return caches.get(CACHE_NAME).then(function(cache) {
        cache.put(event.request, response.clone());
        return response;
      });  
    });

  event.respondWith(cachedResponse);
});
