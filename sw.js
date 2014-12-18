console.log('starting service worker!')

// imports scripts locally or even from other sources
//importScripts('./javascripts/cache-polyfill');


//// these are pages we are going to cache, so they can work offline
//var urlsToCache = [
  //'/index.html',
  //'/stylessheets/stylesheet.css',
  //'/stylessheets/pygment_trac.css',
  //'/javascripts/main.js'
//];

//var CACHE_NAME = 'my-site-cache-v1';


//// this is called during the install 
//this.addEventListener('install', function(event) {
  //console.log('installing phase!!')
  //event.waitUntil(
    //caches.open(CACHE_NAME)
      //.then(function(cache) {
        //console.log('Opened cache');
        //return cache.addAll(urlsToCache);
      //})
  //);
//});



 ////after service worker is installed, we can fetch our cached assets
//this.addEventListener('fetch', function(event) {
  //console.log('fetch phase!!')
  //event.respondWith(
    //caches.match(event.request)
      //.then(function(response) {
        //// Cache hit - return response
        //if (response) {
          //return response;
        //}

        //return fetch(event.request);
      //}
    //);
  //);
//});

