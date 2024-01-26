function defineProp(t,r,e){Object.defineProperty(t,r,{value:e,enumerable:!1,writable:!0,configurable:!0})}String.prototype.startsWith||defineProp(String.prototype,"startsWith",function(t,r){return this.lastIndexOf(t,r=r||0)===r}),String.prototype.endsWith||defineProp(String.prototype,"endsWith",function(t,r){var e=this,e=((void 0===r||r>e.length)&&(r=e.length),r-=t.length,e.indexOf(t,r));return-1!==e&&e===r}),String.prototype.repeat||defineProp(String.prototype,"repeat",function(t){for(var r="",e=this;0<t;)1&t&&(r+=e),(t>>=1)&&(e+=e);return r}),String.prototype.includes||defineProp(String.prototype,"includes",function(t,r){return-1!=this.indexOf(t,r)}),Object.assign||(Object.assign=function(t){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var r=Object(t),e=1;e<arguments.length;e++){var n=arguments[e];null!=n&&Object.keys(n).forEach(function(t){r[t]=n[t]})}return r}),Object.values||(Object.values=function(r){return Object.keys(r).map(function(t){return r[t]})}),Array.prototype.find||defineProp(Array.prototype,"find",function(t){for(var r=this.length,e=arguments[1],n=0;n<r;n++){var o=this[n];if(t.call(e,o,n,this))return o}}),Array.prototype.findIndex||defineProp(Array.prototype,"findIndex",function(t){for(var r=this.length,e=arguments[1],n=0;n<r;n++){var o=this[n];if(t.call(e,o,n,this))return n}}),Array.prototype.includes||defineProp(Array.prototype,"includes",function(t,r){return-1!=this.indexOf(t,r)}),Array.prototype.fill||defineProp(Array.prototype,"fill",function(t){for(var r=this,e=r.length>>>0,n=arguments[1]>>0,o=n<0?Math.max(e+n,0):Math.min(n,e),n=arguments[2],n=void 0===n?e:n>>0,i=n<0?Math.max(e+n,0):Math.min(n,e);o<i;)r[o]=t,o++;return r}),Array.of||defineProp(Array,"of",function(){return Array.prototype.slice.call(arguments)});