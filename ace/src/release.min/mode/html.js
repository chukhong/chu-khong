"use strict";var oop=require("../lib/oop"),lang=require("../lib/lang"),TextMode=require("./text").Mode,JavaScriptMode=require("./javascript").Mode,CssMode=require("./css").Mode,HtmlHighlightRules=require("./html_highlight_rules").HtmlHighlightRules,XmlBehaviour=require("./behaviour/xml").XmlBehaviour,HtmlFoldMode=require("./folding/html").FoldMode,HtmlCompletions=require("./html_completions").HtmlCompletions,WorkerClient=require("../worker/worker_client").WorkerClient,voidElements=["area","base","br","col","embed","hr","img","input","keygen","link","meta","menuitem","param","source","track","wbr"],optionalEndTags=["li","dt","dd","p","rt","rp","optgroup","option","colgroup","td","th"],Mode=function(e){this.fragmentContext=e&&e.fragmentContext,this.HighlightRules=HtmlHighlightRules,this.$behaviour=new XmlBehaviour,this.$completer=new HtmlCompletions,this.createModeDelegates({"js-":JavaScriptMode,"css-":CssMode}),this.foldingRules=new HtmlFoldMode(this.voidElements,lang.arrayToMap(optionalEndTags))};oop.inherits(Mode,TextMode),function(){this.blockComment={start:"\x3c!--",end:"--\x3e"},this.voidElements=lang.arrayToMap(voidElements),this.getNextLineIndent=function(e,t,o){return this.$getIndent(t)},this.checkOutdent=function(e,t,o){return!1},this.getCompletions=function(e,t,o,i){return this.$completer.getCompletions(e,t,o,i)},this.createWorker=function(t){var e;if(this.constructor==Mode)return(e=new WorkerClient(["ace"],"ace/mode/html_worker","Worker")).attachToDocument(t.getDocument()),this.fragmentContext&&e.call("setOptions",[{context:this.fragmentContext}]),e.on("error",function(e){t.setAnnotations(e.data)}),e.on("terminate",function(){t.clearAnnotations()}),e},this.$id="ace/mode/html",this.snippetFileId="ace/snippets/html"}.call(Mode.prototype),exports.Mode=Mode;