"use strict";var dom=require("../../lib/dom"),cssText=require("./settings_menu.css");dom.importCssString(cssText,"settings_menu.css",!1),module.exports.overlayPage=function(e,t,n){var o=document.createElement("div"),i=!1;function s(e){27===e.keyCode&&r()}function r(){o&&(document.removeEventListener("keydown",s),o.parentNode.removeChild(o),e&&e.focus(),o=null,n)&&n()}return o.style.cssText="margin: 0; padding: 0; position: fixed; top:0; bottom:0; left:0; right:0;z-index: 9990; "+(e?"background-color: rgba(0, 0, 0, 0.3);":""),o.addEventListener("click",function(e){i||r()}),document.addEventListener("keydown",s),t.addEventListener("click",function(e){e.stopPropagation()}),o.appendChild(t),document.body.appendChild(o),e&&e.blur(),{close:r,setIgnoreFocusOut:function(e){(i=e)&&(o.style.pointerEvents="none",t.style.pointerEvents="auto")}}};