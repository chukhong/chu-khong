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
(function (GLOBAL) {

  var app = {

  }

  var serviceWorkerUpdate;

  // from sarah-clack introduce
  window.addEventListener('load', async () => {
    //console.log('-------------');
    //console.log('onload');
    if ('serviceWorker' in navigator) {
      navigator
        .serviceWorker
        .register('./service-worker-v3.js', { scope: "/chu-khong/" })
        .then(function (registration) {


          serviceWorkerUpdate = (callback) => {
            registration.update()
            if (window.confirm(`Đã có phiên bản mới ${app.newVersion} bạn nên cài đặt lại để được thừa hưởng các tính năng mới! OK để làm mới?`)) {
              registration.unregister()
              callback && callback()
              //registration.active.postMessage('SKIP_WAITING')
              window.location.reload();
            }
          }
          
          var oldVersion = localStorage.getItem('app.version')
          //first time
          var rand = Math.floor(Math.random() * 10000) + 1;
          var url = "/chu-khong/js/version.json?v=" + rand
          fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            }
          })
          .then(res => res.json())
          .then(async (res) => {
            //first time of version
            if (oldVersion == undefined || oldVersion ==null) {
              //appStore.set("app.version", res.newVersion)
              localStorage.setItem('app.version',res.newVersion)
              oldVersion = res.newVersion
              //registration.active.postMessage('SKIP_WAITING');
            }
            app.newVersion = res.newVersion
            document.querySelector('#appversion').innerHTML = 'version: ' + res.newVersion
            if (oldVersion != app.newVersion) {

              if (window.caches) {
                var cacheNames = await caches.keys()
                cacheNames.forEach(async cacheName => {
                  await caches.delete(cacheName);
                });
                
                serviceWorkerUpdate(() => {
                  //next time of version
                  localStorage.setItem('app.version',res.newVersion)
                })
              }
            }

          })
        })
    }
    document.querySelector('#appversion').innerHTML = 'version: ' + localStorage.getItem('app.version')

  });

})(this)