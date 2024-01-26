"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,HighlightRules=require("./partiql_highlight_rules").PartiqlHighlightRules,MatchingBraceOutdent=require("./matching_brace_outdent").MatchingBraceOutdent,CstyleBehaviour=require("./behaviour/cstyle").CstyleBehaviour,CStyleFoldMode=require("./folding/cstyle").FoldMode,Mode=function(){this.HighlightRules=HighlightRules,this.$outdent=new MatchingBraceOutdent,this.$behaviour=new CstyleBehaviour,this.foldingRules=new CStyleFoldMode};oop.inherits(Mode,TextMode),function(){this.lineCommentStart="--",this.blockComment={start:"/*",end:"*/",nestable:!0},this.getNextLineIndent=function(t,e,i){var o=this.$getIndent(e);return"start"==t&&e.match(/^.*[\{\(\[]\s*$/)&&(o+=i),o},this.checkOutdent=function(t,e,i){return this.$outdent.checkOutdent(e,i)},this.autoOutdent=function(t,e,i){this.$outdent.autoOutdent(e,i)},this.$id="ace/mode/partiql"}.call(Mode.prototype),exports.Mode=Mode;