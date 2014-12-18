
// imports scripts locally or even from other sources
importScripts('./javascripts/cache-polyfill');
importScripts('//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js');


// these are pages we are going to cache, so they can work offline
var urlsToCache = [
  '/index.html',
  '/stylessheets/stylesheet.css',
  '/stylessheets/pygment_trac.css',
  '/javascripts/main.js'
];

var CACHE_NAME = 'my-site-cache-v1';


// this is called during the install 
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});



// after service worker is installed, we can fetch our cached assets
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request);
      }
    );
  );
});

