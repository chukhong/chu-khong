"use strict";var oop=require("../lib/oop"),HtmlHighlightRules=require("./html_highlight_rules").HtmlHighlightRules,JavaScriptHighlightRules=require("./javascript_highlight_rules").JavaScriptHighlightRules,EjsHighlightRules=function(e,i){for(var t in HtmlHighlightRules.call(this),e=e||"(?:<%|<\\?|{{)",i=i||"(?:%>|\\?>|}})",this.$rules)this.$rules[t].unshift({token:"markup.list.meta.tag",regex:e+"(?![>}])[-=]?",push:"ejs-start"});this.embedRules(new JavaScriptHighlightRules({jsx:!1}).getRules(),"ejs-",[{token:"markup.list.meta.tag",regex:"-?"+i,next:"pop"},{token:"comment",regex:"//.*?"+i,next:"pop"}]),this.normalizeRules()},oop=(oop.inherits(EjsHighlightRules,HtmlHighlightRules),exports.EjsHighlightRules=EjsHighlightRules,require("../lib/oop")),HtmlMode=require("./html").Mode,JavaScriptMode=require("./javascript").Mode,CssMode=require("./css").Mode,RubyMode=require("./ruby").Mode,Mode=function(){HtmlMode.call(this),this.HighlightRules=EjsHighlightRules,this.createModeDelegates({"js-":JavaScriptMode,"css-":CssMode,"ejs-":JavaScriptMode})};oop.inherits(Mode,HtmlMode),function(){this.$id="ace/mode/ejs"}.call(Mode.prototype),exports.Mode=Mode;