"use strict";
(function (GLOBAL) {
    function getListCache() {
        caches.keys().then(function (cacheNames) {
            cacheNames
            .map(function (cacheName) {
                console.log(cacheName);
                caches
                    .open(cacheName)
                    .then(function (cache) {
                        //console.log(cache);
                        cache.keys().then(request => {
                            //console.log(i);
                            var urls = request.map(i => {
                                //console.log(i.url);
                                return i.url
                            })
                            //console.log(urls);
                            urls = "listCache = listCache.concat("+JSON
                            .stringify(urls)
                            .replace(/http\:\/\/localhost\:3000/g,'')
                            .replace(/\"\,\"/g,'",\n"')
                            +")"
                            console.log(urls);
                            var blob = new Blob([urls], { type: 'plain/text;charset=utf-8' });
                            var a = document.createElement('a');
                            a.href = window.URL.createObjectURL(blob);
                            a.download = 'listCache.js';
                            a.click();
                        })

                    })
                //return caches.delete(cacheName);
            })
        })
        $('#dialogListPlugin').modal('hide')
    }
window.getListCache = getListCache
})(this)