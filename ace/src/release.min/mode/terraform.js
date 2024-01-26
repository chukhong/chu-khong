"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,TerraformHighlightRules=require("./terraform_highlight_rules").TerraformHighlightRules,CstyleBehaviour=require("./behaviour/cstyle").CstyleBehaviour,CStyleFoldMode=require("./folding/cstyle").FoldMode,MatchingBraceOutdent=require("./matching_brace_outdent").MatchingBraceOutdent,Mode=function(){TextMode.call(this),this.HighlightRules=TerraformHighlightRules,this.$outdent=new MatchingBraceOutdent,this.$behaviour=new CstyleBehaviour,this.foldingRules=new CStyleFoldMode};oop.inherits(Mode,TextMode),function(){this.lineCommentStart=["#","//"],this.blockComment={start:"/*",end:"*/"},this.$id="ace/mode/terraform"}.call(Mode.prototype),exports.Mode=Mode;