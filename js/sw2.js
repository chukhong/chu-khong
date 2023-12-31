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
function listenForWaitingServiceWorker(registration, callback) {
  function awaitStateChange() {
    registration.installing.addEventListener('statechange', function() {
      if (this.state === 'installed') callback(registration);
    });
  }
  if (!registration) return;
  if (registration.waiting) return callback(registration);
  if (registration.installing) awaitStateChange();
  registration.addEventListener('updatefound', awaitStateChange);
}

// reload once when the new Service Worker starts activating
var refreshing;
navigator.serviceWorker.addEventListener('controllerchange',
  function() {
    console.log('serviceWorker controllerchange');
    // if (refreshing) return;
    // refreshing = true;
    // window.location.reload();
  }
);

function promptUserToRefresh(registration,callback) {
  // this is just an example
  // don't use window.confirm in real life; it's terrible
    if (registration.waiting){

      registration.waiting.addEventListener('message',(data)=>{
        console.log('event message');
        console.log(data);
      })
      setTimeout(()=>{
        //registration.waiting.postMessage('SKIP_WAITING');
      },1000);
    }
    else{
      // if (window.confirm(`Đã có phiên bản mới ${app.newVersion} bạn nên cài đặt lại để được thừa hưởng các tính năng mới! OK để làm mới?`)) {
      //   registration.unregister()
      //   callback && callback()
      //   //alert('unregister')
      //   setTimeout(()=>{
      //     window.location.reload();
      //   },1000);
      // }
    }
}

var serviceWorkerUpdate;

// from sarah-clack introduce
window.addEventListener('load', () => {
   console.log('-------------');
   console.log('onload');
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.offline-cookbook.js')
        .then(function(registration){
          serviceWorkerUpdate = (callback)=>{
            registration.update()
            promptUserToRefresh(registration,callback)
            
          }
          listenForWaitingServiceWorker(registration, promptUserToRefresh);

        	//console.log('SW registered! Scope is:'+ registration.scope);

        })
  }
});
})(this)