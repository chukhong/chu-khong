"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,JspHighlightRules=require("./jsp_highlight_rules").JspHighlightRules,MatchingBraceOutdent=require("./matching_brace_outdent").MatchingBraceOutdent,CstyleBehaviour=require("./behaviour/cstyle").CstyleBehaviour,CStyleFoldMode=require("./folding/cstyle").FoldMode,Mode=function(){this.HighlightRules=JspHighlightRules,this.$outdent=new MatchingBraceOutdent,this.$behaviour=new CstyleBehaviour,this.foldingRules=new CStyleFoldMode};oop.inherits(Mode,TextMode),function(){this.$id="ace/mode/jsp",this.snippetFileId="ace/snippets/jsp"}.call(Mode.prototype),exports.Mode=Mode;