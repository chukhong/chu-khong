"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,RDocHighlightRules=require("./rdoc_highlight_rules").RDocHighlightRules,MatchingBraceOutdent=require("./matching_brace_outdent").MatchingBraceOutdent,Mode=function(e){this.HighlightRules=RDocHighlightRules,this.$outdent=new MatchingBraceOutdent,this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,TextMode),function(){this.getNextLineIndent=function(e,t,i){return this.$getIndent(t)},this.$id="ace/mode/rdoc"}.call(Mode.prototype),exports.Mode=Mode;