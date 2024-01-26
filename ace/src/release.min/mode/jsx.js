"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,JsxHighlightRules=require("./jsx_highlight_rules").JsxHighlightRules,MatchingBraceOutdent=require("./matching_brace_outdent").MatchingBraceOutdent,CstyleBehaviour=require("./behaviour/cstyle").CstyleBehaviour,CStyleFoldMode=require("./folding/cstyle").FoldMode;function Mode(){this.HighlightRules=JsxHighlightRules,this.$outdent=new MatchingBraceOutdent,this.$behaviour=new CstyleBehaviour,this.foldingRules=new CStyleFoldMode}oop.inherits(Mode,TextMode),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,i){var n=this.$getIndent(t),o=this.getTokenizer().getLineTokens(t,e).tokens;return o.length&&"comment"==o[o.length-1].type||"start"==e&&t.match(/^.*[\{\(\[]\s*$/)&&(n+=i),n},this.checkOutdent=function(e,t,i){return this.$outdent.checkOutdent(t,i)},this.autoOutdent=function(e,t,i){this.$outdent.autoOutdent(t,i)},this.$id="ace/mode/jsx"}.call(Mode.prototype),exports.Mode=Mode;