"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,CssHighlightRules=require("./css_highlight_rules").CssHighlightRules,MatchingBraceOutdent=require("./matching_brace_outdent").MatchingBraceOutdent,WorkerClient=require("../worker/worker_client").WorkerClient,CssCompletions=require("./css_completions").CssCompletions,CssBehaviour=require("./behaviour/css").CssBehaviour,CStyleFoldMode=require("./folding/cstyle").FoldMode,Mode=function(){this.HighlightRules=CssHighlightRules,this.$outdent=new MatchingBraceOutdent,this.$behaviour=new CssBehaviour,this.$completer=new CssCompletions,this.foldingRules=new CStyleFoldMode};oop.inherits(Mode,TextMode),function(){this.foldingRules="cStyle",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,o){var n=this.$getIndent(t),e=this.getTokenizer().getLineTokens(t,e).tokens;return e.length&&"comment"==e[e.length-1].type||t.match(/^.*\{\s*$/)&&(n+=o),n},this.checkOutdent=function(e,t,o){return this.$outdent.checkOutdent(t,o)},this.autoOutdent=function(e,t,o){this.$outdent.autoOutdent(t,o)},this.getCompletions=function(e,t,o,n){return this.$completer.getCompletions(e,t,o,n)},this.createWorker=function(t){var e=new WorkerClient(["ace"],"ace/mode/css_worker","Worker");return e.attachToDocument(t.getDocument()),e.on("annotate",function(e){t.setAnnotations(e.data)}),e.on("terminate",function(){t.clearAnnotations()}),e},this.$id="ace/mode/css",this.snippetFileId="ace/snippets/css"}.call(Mode.prototype),exports.Mode=Mode;