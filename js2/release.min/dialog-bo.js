"use strict";!function(){var n=require("data/boFull")["boFull"],d=require("ace/lib/dom").buildDom;var t=window.editor,a=(l=document.querySelector("body"),a=document.createElement("div"),d(["div",{class:"modal",id:"dialogSystemWords",tabindex:"-1",role:"dialog","aria-labelledby":"dialogSystemWordsTitle","aria-hidden":"true"},["div",{class:"modal-dialog modal-lg modal-fullscreen",role:"document"},["div",{class:"modal-content bd-gray-900"},["div",{class:"modal-header m-0 p-0"},["div",{class:"nav-item",id:"titleDialogSystemWords"},"System Words"],["button",{type:"button",class:"btn-secondary-close","data-bs-dismiss":"modal","aria-label":"Close"}]],["div",{class:"modal-body m-0 p-0 p-y-1",id:"bodyDialogSystemWords"}]]]],a,{}),l.insertBefore(a,l.firstChild),$("#bodyDialogSystemWords")[0]),l=$("#titleDialogSystemWords")[0],i=n.bo,s=void 0,e=void 0;s=s||"bo",e=e||"";var o,r=[],b=[];for(o in i){var c=["div",{class:"tab-pane fade",id:"v-pills-"+e+o,role:"tabpanel","aria-labelledby":"v-pills-"+e+o+"-tab",tabindex:"0"},"..."];r.push(["li",{class:"nav-item",role:"presentation"},["button",{class:"btn btn-outline-primary",id:"v-pills-"+e+o+"-tab","data-bs-toggle":"pill","data-bs-target":"#v-pills-"+e+o,"data-cmd-bo-as":s+","+o,type:"button",role:"tab","aria-controls":"v-pills-"+e+o,"aria-selected":"false"},o]]),b.push(c)}b.push(["div",{class:"",id:"v-pills-Content"},"Content"]);var i=["ul",{class:"nav nav-pills me-3",id:"pills-system-word",role:"tablist","aria-orientation":"vertical"},r],p=["div",{class:"tab-content",id:"v-pills-tabContent"},b],v=(a.innerHTML="",d(p,a,{}),l.innerHTML="",d(i,l,{}),{bo:a=>{var t=$("#v-pills-"+a.data)[0],a=n.bo[a.data],i="showContent",s="child-",e=(i=i||"bo",s=s||"",[]);if(!Array.isArray(a)){var l,o=[];for(l in a)o.push(l);a=o}a.map((a,t)=>{var t=t+1,l=["li",{class:"nav-item",role:"presentation"},["button",{class:"btn btn-outline-primary",id:"v-pills-"+s+t+"-tab","data-bs-toggle":"pill","data-bs-target":"#v-pills-"+s+t,"data-cmd-bo-as":i+","+t,"aria-controls":"v-pills-"+s+t,"aria-selected":"false"},a]];3==a.trim().split(" ").length&&(l=["li",{class:"nav-item",role:"presentation"},["button",{class:"btn btn-outline-secondary",disabled:"disabled","aria-controls":"v-pills-"+s+t,"aria-selected":"false"},a]]),e.push(l),console.log(a.split(" "))}),a=["div",{},["ul",{class:"nav nav-pills me-3",id:"pills-system-word",role:"tablist","aria-orientation":"vertical"},e]],t.innerHTML="",d(a,t,{}),$("#v-pills-Content")[0].innerHTML=""},showContent:a=>{var t,l=a.target.innerHTML.trim().split(" "),a=$("#v-pills-child-"+a.data)[0],l=l[1],i=n[l],s=((a=$("#v-pills-Content")[0]).innerHTML="",[]);for(t in i){var e=[];s.push(["button",{class:"col btn btn-primary",disabled:"disabled"},t]),i[t].map(a=>{e.push(["button",{class:"col btn btn-outline-secondary","data-cmd-bo-as":"getContent,"+a,type:"button"},a])}),s.push(e)}l=s,a.innerHTML="",d(l,a,{})},getContent:a=>{$("#dialogSystemWords").modal("hide"),t.onPaste(a.target.innerHTML.trim())}});$(document).on("click","[data-cmd-bo-as]",function(a){var t=(t=$(this).data("cmdBoAs")).split(",");a.data=t[1],v[t[0]]&&v[t[0]](a)})}();