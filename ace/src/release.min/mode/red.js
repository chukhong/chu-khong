"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,RedHighlightRules=require("./red_highlight_rules").RedHighlightRules,RedFoldMode=require("./folding/cstyle").FoldMode,MatchingBraceOutdent=require("./matching_brace_outdent").MatchingBraceOutdent,Range=require("../range").Range,Mode=function(){this.HighlightRules=RedHighlightRules,this.foldingRules=new RedFoldMode,this.$outdent=new MatchingBraceOutdent,this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,TextMode),function(){this.lineCommentStart=";",this.blockComment={start:"comment {",end:"}"},this.getNextLineIndent=function(e,t,i){var n,o=this.$getIndent(t),d=this.getTokenizer().getLineTokens(t,e),r=d.tokens,d=d.state;if(!r.length||"comment"!=r[r.length-1].type)if("start"==e)(n=t.match(/^.*[\{\[\(]\s*$/))&&(o+=i);else if("doc-start"==e){if("start"==d)return"";(n=t.match(/^\s*(\/?)\*/))&&(n[1]&&(o+=" "),o+="* ")}return o},this.checkOutdent=function(e,t,i){return this.$outdent.checkOutdent(t,i)},this.autoOutdent=function(e,t,i){this.$outdent.autoOutdent(t,i)},this.$id="ace/mode/red"}.call(Mode.prototype),exports.Mode=Mode;