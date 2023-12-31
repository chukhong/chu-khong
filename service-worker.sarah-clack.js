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
var listCache = [
  //'/stardict/listdist'
  ]
importScripts("/stardict/dirPublic/?list=ace/_src");
importScripts("/stardict/dirPublic/?list=editor-ace");
importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.setConfig({debug: false});

//console.log('--------------listCache--------');
//console.log(listCache);

workbox.core.skipWaiting();

workbox.core.clientsClaim();



const cacheName='static-shell-v1'

self.__precacheManifest = [].concat(listCache || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// console.log('self.__precacheManifest');
// console.log(self.__precacheManifest);

self.addEventListener('message',(event)=>{
    var {data} = event
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

self.addEventListener('fetch', function(e) {
  //console.log('----fetch----');
   e.respondWith(caches.match(e.request)
    .then(cachedResponse=>{
      // get all link
      // listURL.push(e.request.url)
      // console.clear();
      //console.log(cachedResponse)
      return cachedResponse || fetch(e.request)
    })
  );

});

self.addEventListener('push', function (event) {
  console.log('push');
})