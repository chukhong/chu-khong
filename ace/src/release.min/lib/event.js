"use strict";var activeListenerOptions,keys=require("./keys"),useragent=require("./useragent"),pressedKeys=null,ts=0;function detectListenerOptionsSupport(){activeListenerOptions=!1;try{document.createComment("").addEventListener("test",function(){},{get passive(){activeListenerOptions={passive:!1}}})}catch(e){}}function getListenerOptions(){return null==activeListenerOptions&&detectListenerOptionsSupport(),activeListenerOptions}function EventListener(e,t,n){this.elem=e,this.type=t,this.callback=n}EventListener.prototype.destroy=function(){removeListener(this.elem,this.type,this.callback),this.elem=this.type=this.callback=void 0};var postMessageId,addListener=exports.addListener=function(e,t,n,s){e.addEventListener(t,n,getListenerOptions()),s&&s.$toDestroy.push(new EventListener(e,t,n))},removeListener=exports.removeListener=function(e,t,n){e.removeEventListener(t,n,getListenerOptions())},getModifierHash=(exports.stopEvent=function(e){return exports.stopPropagation(e),exports.preventDefault(e),!1},exports.stopPropagation=function(e){e.stopPropagation&&e.stopPropagation()},exports.preventDefault=function(e){e.preventDefault&&e.preventDefault()},exports.getButton=function(e){return"dblclick"==e.type?0:"contextmenu"==e.type||useragent.isMac&&e.ctrlKey&&!e.altKey&&!e.shiftKey?2:e.button},exports.capture=function(e,t,n){var s=e&&e.ownerDocument||document;function r(e){t&&t(e),n&&n(e),removeListener(s,"mousemove",t),removeListener(s,"mouseup",r),removeListener(s,"dragstart",r)}return addListener(s,"mousemove",t),addListener(s,"mouseup",r),addListener(s,"dragstart",r),r},exports.addMouseWheelListener=function(e,s,t){addListener(e,"wheel",function(e){var t=e.deltaX||0,n=e.deltaY||0;switch(e.deltaMode){case e.DOM_DELTA_PIXEL:e.wheelX=.15*t,e.wheelY=.15*n;break;case e.DOM_DELTA_LINE:e.wheelX=15*t,e.wheelY=15*n;break;case e.DOM_DELTA_PAGE:e.wheelX=150*t,e.wheelY=150*n}s(e)},t)},exports.addMultiMouseDownListener=function(e,n,s,r,t){var o,i,a,d=0,u={2:"dblclick",3:"tripleclick",4:"quadclick"};function c(e){var t;if(0!==exports.getButton(e)?d=0:1<e.detail&&!(4<++d)||(d=1),useragent.isIE&&(t=5<Math.abs(e.clientX-o)||5<Math.abs(e.clientY-i),a&&!t||(d=1),a&&clearTimeout(a),a=setTimeout(function(){a=null},n[d-1]||600),1==d)&&(o=e.clientX,i=e.clientY),e._clicks=d,s[r]("mousedown",e),4<d)d=0;else if(1<d)return s[r](u[d],e)}(e=Array.isArray(e)?e:[e]).forEach(function(e){addListener(e,"mousedown",c,t)})},function(e){return 0|(e.ctrlKey?1:0)|(e.altKey?2:0)|(e.shiftKey?4:0)|(e.metaKey?8:0)});function normalizeCommandKeys(e,t,n){var s=getModifierHash(t);if(!useragent.isMac&&pressedKeys){if(t.getModifierState&&(t.getModifierState("OS")||t.getModifierState("Win"))&&(s|=8),pressedKeys.altGr){if(3==(3&s))return;pressedKeys.altGr=0}18!==n&&17!==n||(r="location"in t?t.location:t.keyLocation,17===n&&1===r?1==pressedKeys[n]&&(ts=t.timeStamp):18===n&&3===s&&2===r&&t.timeStamp-ts<50&&(pressedKeys.altGr=!0))}if(n in keys.MODIFIER_KEYS&&(n=-1),!s&&13===n){var r="location"in t?t.location:t.keyLocation;if(3===r&&(e(t,s,-n),t.defaultPrevented))return}if(useragent.isChromeOS&&8&s){if(e(t,s,n),t.defaultPrevented)return;s&=-9}return!!(s||n in keys.FUNCTION_KEYS||n in keys.PRINTABLE_KEYS)&&e(t,s,n)}function resetPressedKeys(){pressedKeys=Object.create(null)}exports.getModifierString=function(e){return keys.KEY_MODS[getModifierHash(e)]},exports.addCommandKeyListener=function(e,n,t){var s,r;useragent.isOldGecko||useragent.isOpera&&!("KeyboardEvent"in window)?(s=null,addListener(e,"keydown",function(e){s=e.keyCode},t),addListener(e,"keypress",function(e){return normalizeCommandKeys(n,e,s)},t)):(r=null,addListener(e,"keydown",function(e){pressedKeys[e.keyCode]=(pressedKeys[e.keyCode]||0)+1;var t=normalizeCommandKeys(n,e,e.keyCode);return r=e.defaultPrevented,t},t),addListener(e,"keypress",function(e){r&&(e.ctrlKey||e.altKey||e.shiftKey||e.metaKey)&&(exports.stopEvent(e),r=null)},t),addListener(e,"keyup",function(e){pressedKeys[e.keyCode]=null},t),pressedKeys||(resetPressedKeys(),addListener(window,"focus",resetPressedKeys)))},"object"==typeof window&&window.postMessage&&!useragent.isOldIE&&(postMessageId=1,exports.nextTick=function(t,n){n=n||window;function s(e){e.data==r&&(exports.stopPropagation(e),removeListener(n,"message",s),t())}var r="zero-timeout-message-"+postMessageId++;addListener(n,"message",s),n.postMessage(r,"*")}),exports.$idleBlocked=!1,exports.onIdle=function(t,e){return setTimeout(function e(){exports.$idleBlocked?setTimeout(e,100):t()},e)},exports.$idleBlockId=null,exports.blockIdle=function(e){exports.$idleBlockId&&clearTimeout(exports.$idleBlockId),exports.$idleBlocked=!0,exports.$idleBlockId=setTimeout(function(){exports.$idleBlocked=!1},e||100)},exports.nextFrame="object"==typeof window&&(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame),exports.nextFrame?exports.nextFrame=exports.nextFrame.bind(window):exports.nextFrame=function(e){setTimeout(e,17)};