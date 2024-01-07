/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
var rand = Math.floor(Math.random() * 10000) + 1;

var listCache = [
  "https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.0.5/es5-shim.min.js",
  "https://cdn.jsdelivr.net/jquery/1.11.1/jquery.min.js",
  "https://cdn.jsdelivr.net/lodash/2.4.1/lodash.js",
  "https://cdn.jsdelivr.net/bootstrap/3.2.0/js/bootstrap.min.js",
  "https://cdn.jsdelivr.net/highlight.js/9.1.0/styles/github.min.css",
  "https://cdn.jsdelivr.net/npm/@docsearch/css@3",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/TableDnD/0.9.1/jquery.tablednd.js",
  "https://tranminhhuydn.github.io/chu-khong/fonts/NomNaTong-Regular.ttf",
  "https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  
  ]
//importScripts("/stardict/dirPublic/?list=ace/src");
importScripts("/chu-khong/js/static/listCache2.js");
//importScripts("/chu-khong/js/static/listCache.js?v=" + rand);

//listCache = listCache.map(i=>{ if(i.indexOf('index.html'==-1)) return i+'?v='+rand})
//importScripts("/chu-khong/js/static/listCache2.js");
//importScripts("/stardict/dirPublic/?list=editor-ace");
importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.setConfig({debug: false});



//console.log('--------------listCache--------');
//console.log(listCache);

workbox.core.skipWaiting();

workbox.core.clientsClaim();



const cacheName='static-shell-v1'


//console.log(workbox.precaching);

self.__precacheManifest = [].concat(listCache || []);
//self.__precacheManifest = [].concat( []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});



self.addEventListener('message',(event)=>{
    var {data} = event
    console.log('[ServiceWorker] ',data);
    if (data === 'SKIP_WAITING') {
      workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
    }  

    // switch (data.key){
    //     case 'load': loadMulti();break;
    //     case 'query': filterWord(data.text);break;
    //     default: break;
    // }
})

self.addEventListener('install', function(e) {
  // eslint-disable-next-line no-console
  console.log('[ServiceWorker] Install');

  // self.skipWaiting();
  // e.waitUntil(
  //   caches.open(cacheName)
  //   .then(function(cache){
  //     return cache.addAll(listCache)
  //   })
  // );
});
self.addEventListener('appinstalled', (e) => {
  console.log('Install', 'installed');
});
self.addEventListener('activate', function(e) {
  // eslint-disable-next-line no-console
  console.log('[ServiceWorker] Activate');
  return self.clients.claim();
});
/**Chỉ lưu vào bộ nhớ đệm */
var listURL = []
self.addEventListener('fetch', function(e) {
  //console.log('----fetch----');
   e.respondWith(caches.match(e.request)
    .then(cachedResponse=>{
      // get all link
      //listURL.push(e.request.url)
      listCache.push(e.request.url)
      // console.clear();
      //console.log(cachedResponse)
      return cachedResponse || fetch(e.request)
    })
  );
    console.log(listURL);
});

self.addEventListener('push', function (event) {
  console.log('push');
})

/**
 * Khi người dùng tương tác
 * 
 * 
 document.querySelector('.cache-article').addEventListener('click', function (event) {
  event.preventDefault();

  var id = this.dataset.articleId;
  caches.open('mysite-article-' + id).then(function (cache) {
    fetch('/get-article-urls?id=' + id)
      .then(function (response) {
        // /get-article-urls returns a JSON-encoded array of
        // resource URLs that a given article depends on
        return response.json();
      })
      .then(function (urls) {
        cache.addAll(urls);
      });
  });
});
 *  */

/**
 * Cũ trong khi xác thực lại
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function (cache) {
      return cache.match(event.request).then(function (response) {
        var fetchPromise = fetch(event.request).then(function (networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    }),
  );
});
 */


/**
 * Lý tưởng cho: dọn dẹp và di chuyển.
 
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            // Return true if you want to remove this cache,
            // but remember that caches are shared across
            // the whole origin
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          }),
      );
    }),
  );
})
 */