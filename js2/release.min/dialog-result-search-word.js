"use strict";!function(){var e,a,s=require("ace/lib/dom").buildDom,{userDictSote:t,appStore:i}=(require("lib/startdict/d"),require("lib/startdict/dictzip"),require("lib/startdict/pako_inflate"),require("lib/startdict/inflate"),require("lib/startdict/jszip.min"),require("lib/startdict/stardict"),window.userDicts=[],require("lib/idb-keyval-iife")),n=(window.userDictSote=t,window.appStore=i,require("lib/kitchen-sink/util"));function r(t,a=0,i=100){t.map((t,e)=>{a<=e&&e<a+i&&(e=d.create("li",{},words),d.create("a",{href:"#","data-dictpos":JSON.stringify(t.dictpos),"data-offset":t.offset,innerText:t.term},e).onclick=o)})}function o(t){t.preventDefault();t=t.target,t=JSON.parse(t.dataset.dictpos);return f.postMessage({fn:"findMeaning",data:{dictpos:t,target:a}}),!1}var c=[];function l(t){t={name:t.target.innerText.trim()};a=t.name.replace(/\W/g,""),t&&(d.id("words").innerHTML="",dictStatus.style.display="block",f.postMessage({fn:"loadWordList",data:t}))}async function u(t){var e,a,i,s=new Uint8Array;for(e in await t){var n=t[e];n.sort();for(var d=0;d<n.length;await d++){var r=n[d],r=await fetch("/Dicts/"+e+r).then(t=>t.arrayBuffer()).then(t=>t);a=s,r=r,i=void 0,(i=new Uint8Array(a.byteLength+r.byteLength)).set(new Uint8Array(a),0),i.set(new Uint8Array(r),a.byteLength),s=i}var o=new File([s],e+".zip");c.push(o)}}function p(t,e,a){var a=["div",{class:"modal",tabindex:"-1",id:"selectDicts"},["div",{class:"modal-dialog modal-dialog-scrollable"},["div",{class:"modal-content"},["div",{class:"modal-header"},["h5",{class:"modal-title"},"Select dict"],["button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},""]],["div",{class:"modal-body"},a.map(t=>["div",{class:"form-check"},["input",{class:"form-check-input",type:"checkbox",id:"check-"+t,value:t,"data-dict-cmd-as":"checkDownloadDict","data-article-id":t}],["label",{class:"form-check-label",for:"check-"+t},t]])],["div",{class:"modal-footer"},["button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"Close"]]]]],i=document.createElement("div");s(a,i,{}),e.insertBefore(i,e.firstChild),$("#selectDicts")[0].addEventListener("hide.bs.modal",async t=>{var a=[];$("#selectDicts input").each((t,e)=>{e.checked&&a.push(e.value)}),n.saveOption("listDict",JSON.stringify(a)),m(a)})}async function m(t){var e=t.map(t=>"/chu-khong/Dicts/"+t);caches.open("mysite-dynamic").then(function(t){t.addAll(e)});for(var a=0;a<t.length;await a++){var i=(n=t[a]).substr(0,n.length-4);".zip"!=(d=n.substr(n.length-4,n.length))&&(h[i]||(h[i]=[]),h[i].push(d))}for(a=0;a<t.length;await a++){var s,n,i=(n=t[a]).substr(0,n.length-4),d=n.substr(n.length-4,n.length);h[i]||".zip"!=d||(s=await fetch("/chu-khong/Dicts/"+n).then(t=>t.blob()).then(t=>t),s=new File([s],n,{type:s.type}),c.push(s))}await u(h),f.postMessage({fn:"loadList",data:c})}var h={},f=new Worker("js/startdict/jszip-worker.js"),b={builtDataFromJszip:function(t){var e=d.create("h4",{}),a=t.fileName.replace(/\W/g,""),i=(d.create("a",{href:"#",id:a,textContent:t.fileName},e).onclick=l,zipResult.append(e),e.append(d.create("span",{class:"small",textContent:t.timeLoad})),d.create("ul",{style:"display:none"}));t.fileContent.map(t=>{i.append(d.create("li",{textContent:t}))}),zipResult.append(i)},preLoadWords:function(t){e=t.raw_index,a=t.target,r(e)},getMeaning:function(t){t.dictName=t.dictName.replace("zip","");var e=(e=`<div class='list-group-item py-3 lh-sm bd-yellow-200'>
        <div class="d-flex w-100 justify-content-end">
            <small class="text-muted">{dictName}</small>
        </div>
        <div class='justify-content-between'>{data}</div>
        </div>`).replace("{data}",t.data).replace("{dictName}",t.dictName),a=meanningShow.innerHTML,i=(meanningShow.innerHTML=t.append?a+e:e,searchInput.value.trim()),s=`<div class='list-group-item py-3 lh-sm bd-yellow-200'>
    <div class="d-flex w-100 justify-content-end">
      <small class="text-muted">{dictName}</small>
    </div>
    <div class='justify-content-between'>{data}</div>
    </div>`;$("#meanningUser")[0].innerHTML="",window.userDicts.map(t=>{var e=[t[1],t[3],t[4],t[5]];e[0]!=i&&e[2]!=i||(0==e[2].indexOf("{")&&(e[2]=(t=>{var e,a="";for(e in t)a+=`<b>${e}</b>:${t[e]}<br>`;return a})(JSON.parse(e[2]))),$("#meanningUser")[0].innerHTML+=s.replace("{dictName}",t[0]).replace("{data}",e.join("<br>")))})},showStatus:function(t){dictStatus.innerText=t},percentLoad:function(t){"100%"==(d.id("myBar").style.width=t)&&(d.id("myProgress").style.display="none")},getFindWord:function(t){}};function v(){var t,e=d.q("body");navigator.onLine?(t=script_url+"?q="+JSON.stringify({SHEETNAME:"listdict",action:"filter",data:{}}),fetch(t,{method:"GET",mode:"cors",headers:{"Content-Type":"text/plain;charset=utf-8"}}).then(t=>t.json()).then(async t=>{t=t.data.map(t=>t.NAME),p(editor,e,t),t=n.getOption("listDict");t&&"[]"!=t?((t=JSON.parse(t)).map(t=>{$(`input[value="${t}"]`)[0].checked=!0}),m(t)):$("#selectDicts").modal("show")}).catch(t=>{console.log(t),app.toast.message("Error",t.message).show()})):((t=n.getOption("listDict"))&&(t=JSON.parse(t),p(editor,e,t),t.map(t=>{$(`input[value="${t}"]`)[0].checked=!0}),m(t)),app.toast.message("Alert","internet is off").show())}f.onmessage=function(e){var t=e["data"];try{b[t.fn](t.data)}catch(t){console.log(e),console.error(t)}},window.loadUserDict=function(){};var g,y,w;window.app,g=window.editor,t=document.querySelector("body"),i=document.createElement("div"),s(["div",{class:"offcanvas offcanvas-end bd-gray-900 d-flex flex-column align-items-stretch flex-shrink-0 bg-white",id:"dialogResultSearchWord",tabindex:"-1","aria-labelledby":"offcanvasRightLabel"},["div",{class:"navbar navbar-dark bd-navbar sticky-top offcanvas-header"},["div",{class:"modal-header"},["div",{class:"nav-item",id:"titleDialogResultSearchWord"},["form",{id:"search-from-dict",action:"#"},["input",{id:"search-input",name:"search-input",type:"search"},""],["button",{id:"btn-search-word",type:"submit","data-dict-cmd-as":"formSubmit",class:"btn"},["i",{class:"material-icons"},"search"]],["button",{"data-dict-cmd-as":"copy",type:"button",class:"btn"},["i",{class:"material-icons"},"content_copy"]],["button",{"data-dict-cmd-as":"history",type:"button",class:"btn"},["i",{class:"material-icons"},"history"]],["button",{"data-cmd-as":"addWord",type:"button",class:"btn"},["i",{class:"material-icons"},"add"],["i",{class:"material-icons"},"mode_edit"]]]]],["button",{type:"button",class:"btn-close","data-bs-dismiss":"offcanvas","aria-label":"Close"}]],["div",{class:"offcanvas-body m-0 p-0 bd-yellow-200 list-group list-group-flush border-bottom scrollarea",id:"bodyDialogResultSearchWord"},["div",{id:"zip-title"}],["div",{id:"zip-result",class:"d-none"}],["div",{id:"myProgress",class:"myProgress progress",style:"height: 1px;"},["div",{id:"myBar",class:"myBar progress-bar",role:"progressbar","aria-valuenow":"0","aria-valuemin":"0","aria-valuemax":"100"},""],["div",{id:"dictStatus",class:"d-none"},""]],["div",{id:"words",class:"d-none"},""],["div",{id:"dictStatus"},""],["div",{id:"meanningUser"},""],["div",{id:"meanningShow",class:"bd-yellow-200","data-dict-cmd-mouseup-as":"searchWordSelect"},""]]],i,{}),t.insertBefore(i,t.firstChild),loadUserDict(),y={formSubmit:t=>{var e=searchInput.value.trim();return t.preventDefault(),meanningShow.innerHTML="",meanningUser.innerHTML="",f.postMessage({fn:"findWord",data:e}),!1},copy:()=>{navigator.clipboard.writeText($("#search-input").val()),g.onCopy()},checkDownloadDict:t=>{}},$(document).on("click","[data-dict-cmd-as]",function(t){var e=$(this).data("dictCmdAs");y[e]?y[e](t):console.log(`
            // ${e} not defined
            ${e}:()=>{}
        `)}),w={searchWordSelect:t=>{if(""!=window.getSelection().toString())return $("#search-input").val(window.getSelection().toString()),$("#btn-search-word")[0].click(),!1}},$(document).on("mouseup","[data-dict-cmd-mouseup-as]",function(t){var e=$(this).data("dictCmdMouseupAs");w[e]?w[e](t):console.log(`
            // ${e} not defined
            ${e}:()=>{}
        `)}),v()}();