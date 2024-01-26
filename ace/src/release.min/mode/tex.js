"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,TexHighlightRules=require("./tex_highlight_rules").TexHighlightRules,MatchingBraceOutdent=require("./matching_brace_outdent").MatchingBraceOutdent,Mode=function(e){this.HighlightRules=e?TextHighlightRules:TexHighlightRules,this.$outdent=new MatchingBraceOutdent,this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,TextMode),function(){this.lineCommentStart="%",this.getNextLineIndent=function(e,t,i){return this.$getIndent(t)},this.allowAutoInsert=function(){return!1},this.$id="ace/mode/tex",this.snippetFileId="ace/snippets/tex"}.call(Mode.prototype),exports.Mode=Mode;