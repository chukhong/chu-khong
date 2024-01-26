"use strict";var Rules=require("./coffee_highlight_rules").CoffeeHighlightRules,Outdent=require("./matching_brace_outdent").MatchingBraceOutdent,FoldMode=require("./folding/coffee").FoldMode,Range=require("../range").Range,TextMode=require("./text").Mode,WorkerClient=require("../worker/worker_client").WorkerClient,oop=require("../lib/oop");function Mode(){this.HighlightRules=Rules,this.$outdent=new Outdent,this.foldingRules=new FoldMode}oop.inherits(Mode,TextMode),function(){var r=/(?:[({[=:]|[-=]>|\b(?:else|try|(?:swi|ca)tch(?:\s+[$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)?|finally))\s*$|^\s*(else\b\s*)?(?:if|for|while|loop)\b(?!.*\bthen\b)/;this.lineCommentStart="#",this.blockComment={start:"###",end:"###"},this.getNextLineIndent=function(e,t,n){var o=this.$getIndent(t),i=this.getTokenizer().getLineTokens(t,e).tokens;return i.length&&"comment"===i[i.length-1].type||"start"!==e||!r.test(t)||(o+=n),o},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.createWorker=function(t){var e=new WorkerClient(["ace"],"ace/mode/coffee_worker","Worker");return e.attachToDocument(t.getDocument()),e.on("annotate",function(e){t.setAnnotations(e.data)}),e.on("terminate",function(){t.clearAnnotations()}),e},this.$id="ace/mode/coffee",this.snippetFileId="ace/snippets/coffee"}.call(Mode.prototype),exports.Mode=Mode;