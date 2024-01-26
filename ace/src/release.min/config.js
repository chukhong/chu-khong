var lang=require("./lib/lang"),oop=require("./lib/oop"),net=require("./lib/net"),dom=require("./lib/dom"),AppConfig=require("./lib/app_config").AppConfig,options=(module.exports=exports=new AppConfig,{packaged:!1,workerPath:null,modePath:null,themePath:null,basePath:"",suffix:".js",$moduleUrls:{},loadWorkerFromBlob:!0,sharedPopups:!1,useStrictCSP:null}),loader=(exports.get=function(o){if(options.hasOwnProperty(o))return options[o];throw new Error("Unknown config key: "+o)},exports.set=function(o,e){if(options.hasOwnProperty(o))options[o]=e;else if(0==this.setDefaultValue("",o,e))throw new Error("Unknown config key: "+o);"useStrictCSP"==o&&dom.useStrictCSP(e)},exports.all=function(){return lang.copyObject(options)},exports.$modes={},exports.moduleUrl=function(o,e){var t,r,n;return options.$moduleUrls[o]||(o=o.split("/"),t="snippets"==(e=e||o[o.length-2]||"")?"/":"-",r=o[o.length-1],"worker"==e&&"-"==t&&(n=new RegExp("^"+e+"[\\-_]|[\\-_]"+e+"$","g"),r=r.replace(n,"")),(!r||r==e)&&1<o.length&&(r=o[o.length-2]),null==(n=options[e+"Path"])?n=options.basePath:"/"==t&&(e=t=""),n&&"/"!=n.slice(-1)&&(n+="/"),n+e+t+r+this.get("suffix"))},exports.setModuleUrl=function(o,e){return options.$moduleUrls[o]=e},function(o,e){return"ace/theme/textmate"==o?e(null,require("./theme/textmate")):console.error("loader is not configured")}),reportErrorIfPathIsNotConfigured=(exports.setLoader=function(o){loader=o},exports.$loading={},exports.loadModule=function(r,o){var e,t;Array.isArray(r)&&(t=r[0],r=r[1]);try{e=require(r)}catch(o){}if(e&&!exports.$loading[r])return o&&o(e);if(exports.$loading[r]||(exports.$loading[r]=[]),exports.$loading[r].push(o),!(1<exports.$loading[r].length)){function n(){loader(r,function(o,e){exports._emit("load.module",{name:r,module:e});var t=exports.$loading[r];exports.$loading[r]=null,t.forEach(function(o){o&&o(e)})})}if(!exports.get("packaged"))return n();net.loadScript(exports.moduleUrl(r,t),n),reportErrorIfPathIsNotConfigured()}},function(){options.basePath||options.workerPath||options.modePath||options.themePath||Object.keys(options.$moduleUrls).length||(console.error("Unable to infer path to ace from script src,","use ace.config.set('basePath', 'path') to enable dynamic loading of modes and themes","or with webpack use ace/webpack-resolver"),reportErrorIfPathIsNotConfigured=function(){})});exports.version="1.9.6";