"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,ABCHighlightRules=require("./abc_highlight_rules").ABCHighlightRules,FoldMode=require("./folding/cstyle").FoldMode,Mode=function(){this.HighlightRules=ABCHighlightRules,this.foldingRules=new FoldMode,this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,TextMode),function(){this.lineCommentStart="%",this.$id="ace/mode/abc",this.snippetFileId="ace/snippets/abc"}.call(Mode.prototype),exports.Mode=Mode;