"use strict";!function(){var e=require("ace/lib/dom").buildDom,o=require("lib/jwt-decode")["jwt_decode"],i=require("lib/idb-keyval-iife")["appStore"];function t(e){var o=e+"=",i=decodeURIComponent(document.cookie).split(";");for(let s=0;s<i.length;s++){let e=i[s];for(;" "==e.charAt(0);)e=e.substring(1);if(0==e.indexOf(o))return e.substring(o.length,e.length)}return""}function n(e){var e=o(e.credential),s=script_url+"?q="+JSON.stringify({SHEETNAME:"users",action:"login",condition:{EMAIL:e.email},data:{EMAIL:e.email,NAME:e.name}});fetch(s,{method:"GET",mode:"cors",headers:{"Content-Type":"text/plain;charset=utf-8"}}).then(e=>e.json()).then(e=>{console.log(e),cookieStore.set("session-userinfor",JSON.stringify(e.message)),i.set("session-userinfor",JSON.stringify(e.message)),window.USERID=e.message.uuid}),i.set("session-user-provice",JSON.stringify(e)),cookieStore.set("session-user-provice",JSON.stringify(e)),a()}function a(){console.log("[loadIconUser]"),cookieStore.get("session-user-provice").then(e=>{e=JSON.parse(e.value);$("#dialogUser h5")[0].innerHTML=e.name,$("#userIcon")[0].src=e.picture,$(".userIcon2")[0].src=e.picture,userIcon.classList.toggle("d-none"),userIconOutLine.classList.toggle("d-none"),$("#buttonDiv").hide()}).catch(e=>{app.toast.message("Error",e.message).show()}),cookieStore.get("session-userinfor").then(e=>{e&&e.value&&(e=JSON.parse(e.value),window.USERID=e.uuid)})}window.jwt_decode=o,window.getCookie=t;var s,r;window.editor,s=document.querySelector("body"),r=document.createElement("div"),e(["div",{class:"offcanvas offcanvas-end","data-bs-backdrop":"static",tabindex:"-1",id:"dialogUser","aria-labelledby":"staticBackdropLabel"},["div",{class:"offcanvas-header"},["img",{alt:"",width:"24",height:"24",class:"rounded-circle me-2 userIcon2"}],["h5",{class:"offcanvas-title",id:"staticBackdropLabel"},"user info"],["a",{href:"#",class:"btn"},["i",{class:"material-icons"},"exit_to_app"]],["button",{type:"button",class:"btn-close","data-bs-dismiss":"offcanvas","aria-label":"Close"},""]],["div",{class:"offcanvas-body menu list-group list-group-flush scrollarea"},["div",{id:"buttonDiv",class:"list-group-item py-3 lh-sm"}],["div",{class:""},["i",{class:"material-icons"},"color_lens"],["span",{class:"mx-3"},"Setting"]],["div",{id:"settingPlace",class:"px-3 py-3"}],["button",{class:"list-group-item py-3 lh-sm","data-bs-toggle":"modal","data-bs-target":"#selectDicts"},["i",{class:"material-icons"},"language"],["span",{class:"mx-3"},"Choose Dictionaries"]],["div",{class:"px-2",id:"appversion"},""]]],r,{}),s.insertBefore(r,s.firstChild),require("lib/dialog-setting"),async function(){var e,s=t("session-user-provice");if(0==s.length&&(s=await i.get("session-user-provice"))&&(cookieStore.set("session-user-provice",s),e=await i.get("session-userinfor"),cookieStore.set("session-userinfor",e)),navigator.onLine){try{null==google&&location.reload()}catch(e){location.reload()}s&&0!=s.length||(google.accounts.id.initialize({client_id:"563587575029-89224il8qt9bc2i5d3f15fucn6nutv0t.apps.googleusercontent.com",callback:n}),google.accounts.id.renderButton(document.getElementById("buttonDiv"),{theme:"outline",size:"large"}),google.accounts.id.prompt()),a()}}(),r=localStorage.getItem("app.version")||"1.1.1",d.id("appversion").innerHTML="Chu Khong Version: "+r}();