var async=require("asyncjs/async");async.plugin({delay:function(i){return this.each(function(n,t){setTimeout(function(){t()},i)})},timeout:function(n){n=n||0;var t=this.source;return this.next=function(i){var e,o=setTimeout(function(){e=!0,i("Source did not respond after "+n+"ms!")},n);t.next(function(n,t){e||(e=!0,clearTimeout(o),i(n,t))})},new this.constructor(this)},get:function(i){return this.map(function(n,t){t(null,n[i])})},inspect:function(){return this.each(function(n,t){console.log(JSON.stringify(n)),t()})},print:function(){return this.each(function(n,t){console.log(n),t()})}});