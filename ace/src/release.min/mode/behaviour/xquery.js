"use strict";var oop=require("../../lib/oop"),Behaviour=require("../behaviour").Behaviour,CstyleBehaviour=require("./cstyle").CstyleBehaviour,XmlBehaviour=require("../behaviour/xml").XmlBehaviour,TokenIterator=require("../../token_iterator").TokenIterator;function hasType(e,r){var t=!0,a=e.type.split(".");return r.split(".").forEach(function(e){if(-1==a.indexOf(e))return t=!1}),t}var XQueryBehaviour=function(){this.inherit(CstyleBehaviour,["braces","parens","string_dquotes"]),this.inherit(XmlBehaviour),this.add("autoclosing","insertion",function(e,r,t,a,i){if(">"==i){var i=t.getCursorPosition(),o=new TokenIterator(a,i.row,i.column),u=o.getCurrentToken(),t=!1,e=JSON.parse(e).pop();if(!(u&&">"===u.value||"StartTag"!==e)){if(u&&(hasType(u,"meta.tag")||hasType(u,"text")&&u.value.match("/")))t=!0;else for(;(u=o.stepBackward())&&(hasType(u,"string")||hasType(u,"keyword.operator")||hasType(u,"entity.attribute-name")||hasType(u,"text")););a=o.stepBackward();if(u&&hasType(u,"meta.tag")&&(null===a||!a.value.match("/")))return e=u.value.substring(1),{text:"></"+(e=t?e.substring(0,i.column-u.start):e)+">",selection:[1,1]}}}})};oop.inherits(XQueryBehaviour,Behaviour),exports.XQueryBehaviour=XQueryBehaviour;