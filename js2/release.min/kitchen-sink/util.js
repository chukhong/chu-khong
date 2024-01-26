"use strict";var dom=require("ace/lib/dom"),event=require("ace/lib/event"),EditSession=require("ace/edit_session").EditSession,UndoManager=require("ace/undomanager").UndoManager,Renderer=require("ace/virtual_renderer").VirtualRenderer,Editor=require("ace/editor").Editor,MultiSelect=require("ace/multi_select").MultiSelect,urlOptions={};try{window.location.search.slice(1).split(/[&]/).forEach(function(e){e=e.split("=");urlOptions[decodeURIComponent(e[0])]=decodeURIComponent(e[1])})}catch(e){console.error(e)}function saveOptionFromElement(e,t){(e.onchange||e.onclick)&&("checked"in e?localStorage&&localStorage.setItem(e.id,e.checked?1:0):localStorage&&localStorage.setItem(e.id,e.value))}function elt(e,t,n){var o,r=dom.createElement(e);for(o in"string"==typeof n?r.appendChild(document.createTextNode(n)):n&&n.forEach(function(e){r.appendChild(e)}),t)r.setAttribute(o,t[o]);return r}function optgroup(e){return e.map(function(e){return elt("option",{value:(e="string"==typeof e?{name:e,caption:e}:e).value||e.name},e.caption||e.desc)})}function dropdown(t){return Array.isArray(t)?optgroup(t):Object.keys(t).map(function(e){return elt("optgroup",{label:e},optgroup(t[e]))})}exports.createEditor=function(e){return new Editor(new Renderer(e))},exports.getOption=function(e){return urlOptions[e]||localStorage&&localStorage.getItem(e)},exports.saveOption=function(e,t){0==t&&(t=""),localStorage&&localStorage.setItem(e,t)},exports.createSplitEditor=function(i){"string"==typeof i&&(i=document.getElementById(i));var e=document.createElement("div"),l=document.createElement("splitter"),t=document.createElement("div"),c=(i.appendChild(e),i.appendChild(t),i.appendChild(l),e.style.position=t.style.position=l.style.position="absolute",i.style.position="relative",{$container:i});return c.editor0=c[0]=new Editor(new Renderer(e)),c.editor1=c[1]=new Editor(new Renderer(t)),(c.splitter=l).ratio=.5,c.resize=function(){var e=i.parentNode.clientHeight-i.offsetTop,t=i.clientWidth,n=t*l.ratio,t=t*(1-l.ratio),o=(l.style.left=n-1+"px",l.style.height=i.style.height=e+"px",c[0].container.style),r=c[1].container.style;o.width=n+"px",r.width=t+"px",o.left="0px",r.left=n+"px",o.top=r.top="0px",o.height=r.height=e+"px",c[0].resize(),c[1].resize()},c.onMouseDown=function(e){var t,n=i.getBoundingClientRect(),o=e.clientX,r=(e.clientY,e.button);if(0===r)return event.capture(l,function(e){o=e.clientX,e.clientY},function(e){clearInterval(t)}),t=setInterval(function(){l.ratio=(o-n.left)/n.width,c.resize()},40),e.preventDefault()},event.addListener(l,"mousedown",c.onMouseDown),event.addListener(window,"resize",c.resize),c.resize(),c},exports.stripLeadingComments=function(e){var t;return"/*"==e.slice(0,2)&&(t=e.indexOf("*/")+2,e=e.substr(t)),e.trim()+"\n"},exports.bindCheckbox=function(e,t,n){function o(){t(!!r.checked),saveOptionFromElement(r)}"string"==typeof e?r=document.getElementById(e):e=(r=e).id;var r=document.getElementById(e);urlOptions[e]?r.checked="1"==urlOptions[e]:localStorage&&localStorage.getItem(e)&&(r.checked="1"==localStorage.getItem(e));return r.onclick=o,n||o(),r},exports.bindDropdown=function(e,t,n){function o(){t(r.value),saveOptionFromElement(r)}var r;"string"==typeof e?r=document.getElementById(e):e=(r=e).id,urlOptions[e]?r.value=urlOptions[e]:localStorage&&localStorage.getItem(e)&&(r.value=localStorage.getItem(e));r.onchange=o,n||o()},exports.fillDropdown=function(t,e){"string"==typeof t&&(t=document.getElementById(t)),dropdown(e).forEach(function(e){t.appendChild(e)})};