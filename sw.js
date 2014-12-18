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

//// this is called during the install 
this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});



 //////after service worker is installed, we can fetch our cached assets
//this.addEventListener('fetch', function(event) {
  //event.respondWith(
    //caches.match(event.request).then(function(response) {
      //// Cache hit - return response
      //if (response) {
        //return response;
      //}

      //console.log(response, event);

      //return fetch(event.request);
    //});
  //);
//});

