"use strict";window.getListCache=function(){caches.keys().then(function(e){e.map(function(e){console.log(e),caches.open(e).then(function(e){e.keys().then(e=>{var e=e.map(e=>e.url),e="listCache = listCache.concat("+JSON.stringify(e).replace(/http\:\/\/localhost\:3000/g,"").replace(/\"\,\"/g,'",\n"')+")",e=(console.log(e),new Blob([e],{type:"plain/text;charset=utf-8"})),t=document.createElement("a");t.href=window.URL.createObjectURL(e),t.download="listCache.js",t.click()})})})}),$("#dialogListPlugin").modal("hide")};