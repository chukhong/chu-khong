// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.
const OFFLINE_VERSION = 1;
const CACHE_NAME = "offline-precache";
// Customize this with a different URL if needed.
const START_URL = "index.html";
const OFFLINE_URL = "index.html";
var list1 = ["index.html","index.html"]
var listCache = [

  ]

//importScripts("/stardict/dirPublic/?list=chu-khong");

importScripts("/chu-khong/js/static/listCache2.js");
listCache = listCache.concat([
"https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap",
"/chu-khong/js/register-sw.js",
"/chu-khong/js/file-system-apis.js",
"/chu-khong/js/dialog-phien-am.js",
"/chu-khong/js/dialog-rename.js",
"/chu-khong/cdnjs.cloudflare.com/ajax/libs/es5-shim/4.0.5/es5-shim.min.js",
"/chu-khong/cdn.jsdelivr.net/jquery/1.11.1/jquery.min.js",
"/chu-khong/cdn.jsdelivr.net/lodash/2.4.1/lodash.js",
"/chu-khong/cdn.jsdelivr.net/bootstrap/3.2.0/js/bootstrap.min.js",
"/chu-khong/cdn.jsdelivr.net/highlight.js/9.1.0/styles/github.min.css",
"/chu-khong/cdn.jsdelivr.net/npm/@docsearch/css@3.css",
"/chu-khong/cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
"/chu-khong/cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
"/chu-khong/cdnjs.cloudflare.com/ajax/libs/TableDnD/0.9.1/jquery.tablednd.js",
"/chu-khong/fonts/NomNaTong-Regular.ttf",
"/chu-khong/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"])

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
workbox.setConfig({debug: false});
workbox.core.setCacheNameDetails({
  prefix: 'offline',
  suffix: '',
  precache: 'precache',
  runtime: 'runtime-name'
});

self.__precacheManifest = [].concat(listCache || []);
//self.__precacheManifest = [].concat( []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

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

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  return self.clients.claim();
});

var listURL = []
self.addEventListener('fetch', function (event) {
    event.respondWith(
        //(async ()=>{
          caches.open(CACHE_NAME).then(function (cache) {
            return cache.match(event.request).then(function (response) {
              // get all link
              // listURL.push(event.request.url)
              // console.clear();
              // console.log(listURL)

              var fetchPromise = fetch(event.request).then(function (networkResponse) {
                //cache.put(event.request, networkResponse.clone());
                return networkResponse;
              }).catch (error=>{
                console.log('Error fetch ',error.message);
              });
              return response || fetchPromise;
            });
          }),
      //  })()
    );

});