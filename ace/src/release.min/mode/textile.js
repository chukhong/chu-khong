"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,TextileHighlightRules=require("./textile_highlight_rules").TextileHighlightRules,MatchingBraceOutdent=require("./matching_brace_outdent").MatchingBraceOutdent,Mode=function(){this.HighlightRules=TextileHighlightRules,this.$outdent=new MatchingBraceOutdent,this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,TextMode),function(){this.type="text",this.getNextLineIndent=function(t,e,i){return"intag"==t?i:""},this.checkOutdent=function(t,e,i){return this.$outdent.checkOutdent(e,i)},this.autoOutdent=function(t,e,i){this.$outdent.autoOutdent(e,i)},this.$id="ace/mode/textile",this.snippetFileId="ace/snippets/textile"}.call(Mode.prototype),exports.Mode=Mode;