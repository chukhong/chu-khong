"use strict";!function(){var t=require("ace/lib/dom").buildDom;var a,s,o,e,i;a=document.querySelector("body"),s=document.createElement("div"),t(["div",{class:"toast-container position-fixed bottom-0 end-0 p-3"},["div",{id:"app-toast",class:"toast",role:"alert","aria-live":"assertive","aria-atomic":"true"},["div",{class:"toast-header"},["strong",{class:"me-auto"},"App Chu Khong ACE"],["small",{}],["button",{type:"button",class:"btn-close","data-bs-dismiss":"toast","aria-label":"Close"}]],["div",{class:"toast-body"},"Hello, world! This is a toast message"]]],s,{}),a.insertBefore(s,a.firstChild),o=$("#app-toast .toast-header strong")[0],e=$("#app-toast .toast-body")[0],i=$("#app-toast"),window.app.toast={message:(t,a)=>(o.innerHTML=t,e.innerHTML=a,window.app.toast),show:()=>{i.toast("show")},hide:()=>{i.toast("hide")}}}();