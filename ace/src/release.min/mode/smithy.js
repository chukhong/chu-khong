"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,SmithyHighlightRules=require("./smithy_highlight_rules").SmithyHighlightRules,MatchingBraceOutdent=require("./matching_brace_outdent").MatchingBraceOutdent,CstyleBehaviour=require("./behaviour/cstyle").CstyleBehaviour,CStyleFoldMode=require("./folding/cstyle").FoldMode,Mode=function(){this.HighlightRules=SmithyHighlightRules,this.$outdent=new MatchingBraceOutdent,this.$behaviour=new CstyleBehaviour,this.foldingRules=new CStyleFoldMode};oop.inherits(Mode,TextMode),function(){this.lineCommentStart="//",this.$quotes={'"':'"'},this.checkOutdent=function(t,e,i){return this.$outdent.checkOutdent(e,i)},this.autoOutdent=function(t,e,i){this.$outdent.autoOutdent(e,i)},this.$id="ace/mode/smithy"}.call(Mode.prototype),exports.Mode=Mode;