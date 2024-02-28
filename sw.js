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

// self.addEventListener('fetch', function (event) {
//   event.respondWith(

//     caches
//     .open(CACHE_NAME)
//     .then(function (cache) {
//       return cache.match(event.request)
//         .then(function (response) {
//             var fetchPromise = fetch(event.request)
//             .then(function (networkResponse) {
//               try{                
//                 var igonelist = ['plugin/','version.json',
//                 '?list=chu-khong/js2/plugin',
//                 '/Dicts/',
//                 'translate.googleapis.com',
//                 'accounts.google.com',
//                 'script.google.com'],
//                 {url} = event.request
//                 if(!igonelist.find(i=>{return url.indexOf(i)!=-1})){

//                   console.log('[cache] ',event.request.url);
//                   cache.put(event.request, networkResponse.clone());
//                 }
//               }catch(error){
//                 console.log('Error cache ',error.message);
//               }
//               return networkResponse;
//             }).catch (error=>{
//               console.log('Error fetch ',error.message);
//             });
//             return response || fetchPromise;
//         })
//     })
//     ,
//   );
// });

self.addEventListener('fetch', (event) => {
  //console.log('[test location.hostname]',location.hostname);
  event.respondWith((async() => {

    const cache = await caches.open(CACHE_NAME);

    try {
        const cachedResponse = await cache.match(event.request);
        if(cachedResponse) {
            console.log('[cachedResponse]: ', event.request.url);
            return cachedResponse;
        }

        if(!cachedResponse) {
          const cache2 = await caches.open('mysite-dynamic');
          const cachedResponse2 = await cache2.match(event.request);
          if(cachedResponse2){
            console.log('[cachedResponse mysite-dynamic]: ', event.request.url);
            return cachedResponse2;
          }
        }
        

        const fetchResponse = await fetch(event.request);
        // if(fetchResponse) {
        //     console.log('fetchResponse: ', event.request.url);
        //     await cache.put(event.request, fetchResponse.clone());
        //     return fetchResponse;
        // }
        var igonelist = ['version.json',
                        '/Dicts/',
                        'translate.googleapis.com',
                        'accounts.google.com',
                        'script.google.com'],
                        {url} = event.request
        if(location.hostname !='localhost'){
          igonelist.push('plugin/')
          igonelist.push('?list=chu-khong/js2/plugin')
        }
        if(!igonelist.find(i=>{return url.indexOf(i)!=-1})){

          console.log('[cache] ',event.request.url);
          await cache.put(event.request, fetchResponse.clone());
        }
        return fetchResponse;
    }   catch (error) {
        console.log('[Fetch failed]: ', error);
        const cachedResponse = await cache.match('/index.html');
        return cachedResponse;
    }
  })());
});