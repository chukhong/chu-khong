"use strict";!function(){var n=require("ace/lib/dom").buildDom;function t(){var e=script_url+"?q="+JSON.stringify({SHEETNAME:"hanViet",action:"filter",data:{USERID:USERID}});fetch(e,{method:"GET",mode:"cors",headers:{"Content-Type":"text/plain;charset=utf-8"}}).then(e=>e.json()).then(e=>{0<e.data.length&&(e.data.map(t=>{0==hanViet.filter(e=>{if(e[0]==t.ID)return e[1],t.AM,e[0]==t.ID}).length&&hanViet.push([t.ID,t.AM])}),localStorage.setItem("hanViet",JSON.stringify(hanViet)))})}localStorage.getItem("hanViet")&&(window.hanViet=JSON.parse(localStorage.getItem("hanViet"))),window.addEventListener("load",()=>{null==window.USERID?cookieStore.get("session-userinfor").then(e=>{e&&e.value&&(e=JSON.parse(e.value),window.USERID=e.uuid,t())}):t()});var l,e,a,o;l=window.editor,e=document.querySelector("body"),a=document.createElement("div"),n(["div",{class:"modal",id:"dialogPhienAm",tabindex:"-1",role:"dialog","aria-labelledby":"dialogSystemWordsTitle","aria-hidden":"true"},["form",{id:"formPriority",action:"#",method:"post"},["div",{class:"modal-dialog modal-lg",id:"dialogFormPhienAm",role:"document"},["div",{class:"modal-content bd-gray-900"},["div",{class:"modal-header navbar navbar-expand-lg"},["h1",{class:"modal-title mt-3"},"Change Phien Am"],["button",{type:"button",class:"btn-secondary-close","data-bs-dismiss":"modal","aria-label":"Close"}]],["div",{class:"modal-body",id:"bodyDialogPhienAm"},["div",{id:"formSaveChangeAm"},["label",{for:"amChange",class:"px-3"},""],["input",{type:"text",id:"amChange"}],["button",{type:"button",class:"btn btn-primary mx-3","data-cmd-am-as":"save"},"save"]]],["div",{class:"modal-footer"},["button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal","aria-label":"Close"},"Close"]]]]]],a,{}),e.insertBefore(a,e.firstChild),$("#dialogPhienAm").on("shown.bs.modal",function(){o.getAm()}),o={filterWord:()=>{var e,t=document.querySelector("#showPhienAmFilter"),a=document.querySelector("#filterAm").value,o=hanViet.filter(e=>{return-1!=e[1].split(/\,\s|\,|\;\s|\;/).indexOf(a)});0!=o.length&&(e=(o=o.map(e=>e[0])).map(e=>["button",{type:"button",class:"btn btn-secondary","data-cmd-am-as":"getAm"},e])),0==o.length&&(e=(o=[a]).map(e=>["button",{type:"button",class:"btn btn-secondary","data-cmd-am-as":"getAm"},e])),$("#dialogSelectWord .modal-body").html(""),t.innerHTML="",n(e,t,{})},getAm:e=>{try{if(null==USERID||""==USERID||null==USERID)return void app.toast.message("Error","You must login").show()}catch(e){return app.toast.message("Error","You must login").show(),void $("#dialogPhienAm").modal("hide")}var t,a=document.querySelector('label[for="amChange"]'),o=document.querySelector("#amChange"),n=document.querySelector("#formSaveChangeAm"),i=(o.value="",console.log("getAm",l.getCopyText()),l.getCopyText());i.length<=0?$("#dialogPhienAm").modal("hide"):(t=hanViet.find(e=>e[0]==i),n.style.visibility="visible",Array.isArray(t)&&t[1]&&(o.value=t[1]),a.innerHTML=i)},save:()=>{var t=document.querySelector('label[for="amChange"]').innerHTML.trim(),a=document.querySelector("#amChange"),e=(null==hanViet.find(e=>{if(e[0]==t)return e[1]=a.value,e})&&hanViet.push([t,a.value]),hanViet.sort((e,t)=>t[0].length-e[0].length),localStorage.setItem("hanViet",JSON.stringify(hanViet)),script_url+"?q="+JSON.stringify({SHEETNAME:"hanViet",action:"insert",condition:{ID:t,USERID:USERID},data:{ID:t,AM:a.value,USERID:USERID}}));fetch(e,{method:"GET",mode:"cors",headers:{"Content-Type":"text/plain;charset=utf-8"}}).then(e=>e.json()).then(e=>{console.log(e)}),$("#dialogPhienAm").modal("hide")}},$(document).on("click","[data-cmd-am-as]",function(e){var t=$(this).data("cmdAmAs");o[t]?o[t](e):console.log(`
              // ${t} not defined
              ${t}:()=>{}
          `)})}();