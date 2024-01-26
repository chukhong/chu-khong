"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,CrystalHighlightRules=require("./crystal_highlight_rules").CrystalHighlightRules,MatchingBraceOutdent=require("./matching_brace_outdent").MatchingBraceOutdent,Range=require("../range").Range,CstyleBehaviour=require("./behaviour/cstyle").CstyleBehaviour,FoldMode=require("./folding/coffee").FoldMode,Mode=function(){this.HighlightRules=CrystalHighlightRules,this.$outdent=new MatchingBraceOutdent,this.$behaviour=new CstyleBehaviour,this.foldingRules=new FoldMode};oop.inherits(Mode,TextMode),function(){this.lineCommentStart="#",this.getNextLineIndent=function(e,t,n){var i,s=this.$getIndent(t),h=this.getTokenizer().getLineTokens(t,e).tokens;return h.length&&"comment"==h[h.length-1].type||"start"==e&&(h=t.match(/^.*[\{\(\[]\s*$/),e=t.match(/^\s*(class|def|module)\s.*$/),i=t.match(/.*do(\s*|\s+\|.*\|\s*)$/),t=t.match(/^\s*(if|else|when)\s*/),h||e||i||t)&&(s+=n),s},this.checkOutdent=function(e,t,n){return/^\s+(end|else)$/.test(t+n)||this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){var i=t.getLine(n);if(/}/.test(i))return this.$outdent.autoOutdent(t,n);var i=this.$getIndent(i),s=t.getLine(n-1),s=this.$getIndent(s),h=t.getTabString();s.length<=i.length&&i.slice(-h.length)==h&&t.remove(new Range(n,i.length-h.length,n,i.length))},this.$id="ace/mode/crystal"}.call(Mode.prototype),exports.Mode=Mode;