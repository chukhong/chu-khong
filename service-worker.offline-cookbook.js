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

//On install—as a dependency #
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('mysite-static-v3').then(function (cache) {
      //return cache.addAll(listCache);
    }),
  );
});

//On install—not as a dependency #
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('mygame-core-v1').then(function (cache) {  
      //cache.addAll();// levels 11–20
      
      // core assets and levels 1–10
      //return cache.addAll();
    }),
  );
});

//On activate #

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
});

//On user interaction #

// document.querySelector('.cache-article').addEventListener('click', function (event) {
//   event.preventDefault();

//   var id = this.dataset.articleId;
//   caches.open('mysite-article-' + id).then(function (cache) {
//     fetch('/get-article-urls?id=' + id)
//       .then(function (response) {
//         // /get-article-urls returns a JSON-encoded array of
//         // resource URLs that a given article depends on
//         return response.json();
//       })
//       .then(function (urls) {
//         cache.addAll(urls);
//       });
//   });
// });


//On network response #

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return (
          response ||
          fetch(event.request).then(function (response) {
            try{
              cache.put(event.request, response.clone());
            }catch(e){
              console.log("[service worker] "+e);
            }
            return response;
          })
        );
      });
    }),
  );
});

//Stale-while-revalidate #

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function (cache) {
      return cache.match(event.request).then(function (response) {
        var fetchPromise = fetch(event.request).then(function (networkResponse) {
          try{
            cache.put(event.request, networkResponse.clone());
          }catch(e){
            console.log("[service worker] "+e);
          }
          return networkResponse;
        });
        return response || fetchPromise;
      });
    }),
  );
});

// On push message #

self.addEventListener('push', function (event) {
  if (event.data.text() == 'new-email') {
    event.waitUntil(
      caches
        .open('mysite-dynamic')
        .then(function (cache) {
          return fetch('/inbox.json').then(function (response) {
            cache.put('/inbox.json', response.clone());
            return response.json();
          });
        })
        .then(function (emails) {
          registration.showNotification('New email', {
            body: 'From ' + emails[0].from.name,
            tag: 'new-email',
          });
        }),
    );
  }
});

self.addEventListener('notificationclick', function (event) {
  if (event.notification.tag == 'new-email') {
    // Assume that all of the resources needed to render
    // /inbox/ have previously been cached, e.g. as part
    // of the install handler.
    new WindowClient('/inbox/');
  }
});

//On background-sync #
self.addEventListener('sync', function (event) {
  if (event.id == 'update-leaderboard') {
    event.waitUntil(
      caches.open('mygame-dynamic').then(function (cache) {
        return cache.add('/leaderboard.json');
      }),
    );
  }
});

//Cache persistence #
// navigator.storageQuota.queryInfo('temporary').then(function (info) {
//   console.log(info.quota);
//   // Result: <quota in bytes>
//   console.log(info.usage);
//   // Result: <used data in bytes>
// });

// From a page:
// navigator.storage.persist()
// .then(function(persisted) {
//   if (persisted) {
//     // Hurrah, your data is here to stay!
//   } else {
//    // So sad, your data may get chucked. Sorry.
// });

//Serving Suggestions—responding to requests #
//Cache only #

self.addEventListener('fetch', function (event) {
  // If a match isn't found in the cache, the response
  // will look like a connection error
  event.respondWith(caches.match(event.request));
});

//Network only #
self.addEventListener('fetch', function (event) {
  event.respondWith(fetch(event.request));
  // or simply don't call event.respondWith, which
  // will result in default browser behavior
});

//Cache, falling back to network #
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }),
  );
});

//Cache and network race #

// Promise.race is no good to us because it rejects if
// a promise rejects before fulfilling. Let's make a proper
// race function:
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    // make sure promises are all promises
    promises = promises.map((p) => Promise.resolve(p));
    // resolve this promise as soon as one resolves
    promises.forEach((p) => p.then(resolve));
    // reject if all promises reject
    promises.reduce((a, b) => a.catch(() => b)).catch(() => reject(Error('All failed')));
  });
}

self.addEventListener('fetch', function (event) {
  event.respondWith(promiseAny([caches.match(event.request), fetch(event.request)]));
});

//Network falling back to cache #

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request);
    }),
  );
});

//Cache then network #
// var networkDataReceived = false;

// startSpinner();

// // fetch fresh data
// var networkUpdate = fetch('/data.json')
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     networkDataReceived = true;
//     updatePage(data);
//   });

// // fetch cached data
// caches
//   .match('/data.json')
//   .then(function (response) {
//     if (!response) throw Error('No data');
//     return response.json();
//   })
//   .then(function (data) {
//     // don't overwrite newer network data
//     if (!networkDataReceived) {
//       updatePage(data);
//     }
//   })
//   .catch(function () {
//     // we didn't get cached data, the network is our last hope:
//     return networkUpdate;
//   })
//   .catch(showErrorMessage)
//   .then(stopSpinner);

//   //Code in the Service Worker:
//   //You should always go to the network and update a cache as you go.
//   self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.open('mysite-dynamic').then(function (cache) {
//       return fetch(event.request).then(function (response) {
//         cache.put(event.request, response.clone());
//         return response;
//       });
//     }),
//   );
// });

//Generic fallback #
self.addEventListener('fetch', function (event) {
  event.respondWith(
    // Try the cache
    caches
      .match(event.request)
      .then(function (response) {
        // Fall back to network
        return response || fetch(event.request);
      })
      .catch(function () {
        // If both fail, show a generic fallback:
        return caches.match('/offline.html');
        // However, in reality you'd have many different
        // fallbacks, depending on URL and headers.
        // Eg, a fallback silhouette image for avatars.
      }),
  );
});

//Service worker-side templating #

// importScripts('templating-engine.js');

// self.addEventListener('fetch', function (event) {
//   var requestURL = new URL(event.request.url);

//   event.respondWith(
//     Promise.all([
//       caches.match('/article-template.html').then(function (response) {
//         return response.text();
//       }),
//       caches.match(requestURL.path + '.json').then(function (response) {
//         return response.json();
//       }),
//     ]).then(function (responses) {
//       var template = responses[0];
//       var data = responses[1];

//       return new Response(renderTemplate(template, data), {
//         headers: {
//           'Content-Type': 'text/html',
//         },
//       });
//     }),
//   );
// });

//Putting it together #
self.addEventListener('fetch', function (event) {
  // Parse the URL:
  var requestURL = new URL(event.request.url);

  // Handle requests to a particular host specifically
  if (requestURL.hostname == 'api.example.com') {
    event.respondWith(/* some combination of patterns */);
    return;
  }
  // Routing for local URLs
  if (requestURL.origin == location.origin) {
    // Handle article URLs
    if (/^\/article\//.test(requestURL.pathname)) {
      event.respondWith(/* some other combination of patterns */);
      return;
    }
    if (/\.webp$/.test(requestURL.pathname)) {
      event.respondWith(/* some other combination of patterns */);
      return;
    }
    if (request.method == 'POST') {
      event.respondWith(/* some other combination of patterns */);
      return;
    }
    if (/cheese/.test(requestURL.pathname)) {
      event.respondWith(
        new Response('Flagrant cheese error', {
          status: 512,
        }),
      );
      return;
    }
  }

  // A sensible default pattern
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }),
  );
});