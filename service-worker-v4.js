// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.
const OFFLINE_VERSION = 1;
const CACHE_NAME = "offline-precache";
// Customize this with a different URL if needed.
const START_URL = "index.html";
const OFFLINE_URL = "index.html";
var listCache = [
  // "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap",
  // "https://accounts.google.com/gsi/client",
  // "https://apis.google.com/js/api.js",
  
  "/chu-khong/",
]
// importScripts("/chu-khong/js/static/listCache2.js");

// listCache = listCache.concat(["/chu-khong/cdnjs.cloudflare.com/ajax/libs/es5-shim/4.0.5/es5-shim.min.js",
// "/chu-khong/cdn.jsdelivr.net/jquery/1.11.1/jquery.min.js",
// "/chu-khong/cdn.jsdelivr.net/lodash/2.4.1/lodash.js",
// "/chu-khong/cdn.jsdelivr.net/bootstrap/3.2.0/js/bootstrap.min.js",
// "/chu-khong/cdn.jsdelivr.net/highlight.js/9.1.0/styles/github.min.css",
// "/chu-khong/cdn.jsdelivr.net/npm/@docsearch/css@3.css",
// "/chu-khong/cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
// "/chu-khong/cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
// "/chu-khong/cdnjs.cloudflare.com/ajax/libs/TableDnD/0.9.1/jquery.tablednd.js",
// "/chu-khong/fonts/NomNaTong-Regular.ttf",
// "/chu-khong/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
// ])

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
                //if(event.request.url.indexOf('version.json')==-1)
                var igonelist = ['plugin/','version.json'],
                {url} = event.request
                if(!igonelist.find(i=>{return url.indexOf(i)!=-1}))
                  cache.put(event.request, networkResponse.clone());
              }catch(error){
                console.log('Error cache ',error.message);
              }
              return networkResponse;
            }).catch (error=>{
              console.log('Error fetch ',error.message);
              return caches.match('/chu-khong/index3.html');
            });
            return response || fetchPromise;
        })
        .catch(function () {
          // If both fail, show a generic fallback:
          return caches.match('/chu-khong/index1.html');
          // However, in reality you'd have many different
          // fallbacks, depending on URL and headers.
          // Eg, a fallback silhouette image for avatars.
        })
    })
    // .catch(function () {
    //   caches
    //   .match(event.request)
    //   .then(function (response) {
    //     // Fall back to network
    //     return response || fetch(event.request);
    //   })
    //   .catch(function () {
    //     // If both fail, show a generic fallback:
    //     return caches.match('/chu-khong/index.html');
    //     // However, in reality you'd have many different
    //     // fallbacks, depending on URL and headers.
    //     // Eg, a fallback silhouette image for avatars.
    //   })
    // })
    ,
  );
});