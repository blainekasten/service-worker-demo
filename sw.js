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

var CACHE_NAME = 'my-site-cache-v2';

//// this is called during the install 
this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});



 //////after service worker is installed, we can fetch our cached assets
this.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);

  if (requestUrl.pathname != '/service-worker-demo/v1/test') return;

  console.log('fetch responses!!!!')
  var responseBody = {
    success: 'yeah'
  }

  var blobResponseBody = new Blob([JSON.stringify(responseBody)]);

  var responseInit = {
    status: 200,
    statusText: 'OK',
    headers: {'Content-Type': 'application/json'}
  }

  var mockResponse = new Response(blobResponseBody, responseInit);

  event.respondWith(mockResponse);
});
  //event.respondWith(
    //caches.match(event.request).then(function(response) {
      //// Cache hit - return response
      //if (response) {
        //return response;
      //}

      //console.log(response);

      //return fetch(event.request);
    //});
  //);
//});

