var oop=require("../lib/oop"),TextMode=require("./text").Mode,GolangHighlightRules=require("./golang_highlight_rules").GolangHighlightRules,MatchingBraceOutdent=require("./matching_brace_outdent").MatchingBraceOutdent,CstyleBehaviour=require("./behaviour/cstyle").CstyleBehaviour,CStyleFoldMode=require("./folding/cstyle").FoldMode,Mode=function(){this.HighlightRules=GolangHighlightRules,this.$outdent=new MatchingBraceOutdent,this.foldingRules=new CStyleFoldMode,this.$behaviour=new CstyleBehaviour};oop.inherits(Mode,TextMode),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,i){var n=this.$getIndent(t),o=this.getTokenizer().getLineTokens(t,e),h=o.tokens;o.state;return h.length&&"comment"==h[h.length-1].type||"start"==e&&t.match(/^.*[\{\(\[]\s*$/)&&(n+=i),n},this.checkOutdent=function(e,t,i){return this.$outdent.checkOutdent(t,i)},this.autoOutdent=function(e,t,i){this.$outdent.autoOutdent(t,i)},this.$id="ace/mode/golang"}.call(Mode.prototype),exports.Mode=Mode;