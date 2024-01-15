// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.
const OFFLINE_VERSION = 1;
const CACHE_NAME = "offline-precache";
// Customize this with a different URL if needed.
const START_URL = "index.html";
const OFFLINE_URL = "index.html";
var listCache = [  
  "/chu-khong/",
]
// importScripts("/chu-khong/js2/static/listCache.js");


// importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
// workbox.setConfig({debug: false});
// workbox.core.setCacheNameDetails({
//   prefix: 'offline',
//   suffix: '',
//   precache: 'precache',
//   runtime: 'runtime-name'
// });

self.__precacheManifest = [].concat(listCache || []);
//self.__precacheManifest = [].concat( []);
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

//console.log(listCache);
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    (async () => {
      caches.open(CACHE_NAME)
      .then(cache => {
          console.log(listCache);
          return cache.addAll(listCache);
      })
      .then(() => {
        return self.skipWaiting();
      })
    })()
  );
});

self.addEventListener('activate', function(event) {
  console.log('[ServiceWorker] Activate');
  // event.waitUntil(
  //   caches.keys().then(function (cacheNames) {
  //     return Promise.all(
  //       cacheNames
  //         .filter(function (cacheName) {
  //           // Return true if you want to remove this cache,
  //           // but remember that caches are shared across
  //           // the whole origin
  //         })
  //         .map(function (cacheName) {
  //           return caches.delete(cacheName);
  //         }),
  //     );
  //   }),
  // );
  return self.clients.claim();
});

//** auto pus link

self.addEventListener('fetch', function (event) {
  event.respondWith(

    caches
    .open(CACHE_NAME)
    .then(function (cache) {
      return cache.match(event.request)
        .then(function (response) {
            var fetchPromise = fetch(event.request)
            .then(function (networkResponse) {
              try{                
                var igonelist = ['plugin/','version.json',
                '?list=chu-khong/js2/plugin',
                '/Dicts/',
                'script.google.com'],
                {url} = event.request
                if(!igonelist.find(i=>{return url.indexOf(i)!=-1}))
                  cache.put(event.request, networkResponse.clone());
              }catch(error){
                console.log('Error cache ',error.message);
              }
              return networkResponse;
            }).catch (error=>{
              console.log('Error fetch ',error.message);
            });
            return response || fetchPromise;
        })
    })
    ,
  );
});

// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     // Try the cache
//     caches
//       .match(event.request)
//       .then(function (response) {
//         // Fall back to network
//         return response || fetch(event.request);
//       })
//       .catch(function () {
//         // If both fail, show a generic fallback:
//         return caches.match('/chu-khong/');
//         // However, in reality you'd have many different
//         // fallbacks, depending on URL and headers.
//         // Eg, a fallback silhouette image for avatars.
//       }),
//   );
// });