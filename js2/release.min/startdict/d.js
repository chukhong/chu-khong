"use strict";!function(e){const r=document;r.id=e=>r.getElementById(e),r.create=(e,d,n)=>{var o=r.createElement(e);if(d)for(var t in d)o[t]||(o[t]=d[t]),o.setAttribute(t,d[t]);return n&&n.append(o),o},r.autoLoadId=()=>{r.querySelectorAll("[id]").forEach(e=>{var d=(d=(d=e.id).replace(/(\w+)/g,e=>e.charAt(0).toUpperCase()+e.substr(1)).replace(/([^\w])/g,"")).charAt(0).toLowerCase()+d.substr(1);window[d]=r.id(e.id),window[d].q=window[d].querySelector,window[d].qAll=window[d].querySelectorAll})},r.q=r.querySelector,r.qAll=r.querySelectorAll,r.event=null,r.fns=[],r.init=function(e){d(document.querySelector("body"),function(e){var d=[],n=[];e.forEach(e=>e.addedNodes.length&d.push(...e.addedNodes)),e.forEach(e=>e.removedNodes.length&n.push(...e.removedNodes)),r.autoLoadId()}),e&&r.fns.push(e),r.autoLoadId(),r.loadFns({})},r.loadFns=function(d){r.fns.map(e=>{e(d)})};o=window.MutationObserver||window.WebKitMutationObserver;var o,d=function(e,d){var n;if(e&&1===e.nodeType)return o?((n=new o(d)).observe(e,{childList:!0,subtree:!0}),n):void(window.addEventListener&&(e.addEventListener("DOMNodeInserted",d,!1),e.addEventListener("DOMNodeRemoved",d,!1)))};window&&("function"==typeof window.define&&window.define.amd?window.define("d",function(){return r}):window&&(window.d=r)),(e.d=r).init()}(this);