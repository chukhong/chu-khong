"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,ActionScriptHighlightRules=require("./actionscript_highlight_rules").ActionScriptHighlightRules,FoldMode=require("./folding/cstyle").FoldMode,Mode=function(){this.HighlightRules=ActionScriptHighlightRules,this.foldingRules=new FoldMode,this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,TextMode),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.$id="ace/mode/actionscript",this.snippetFileId="ace/snippets/actionscript"}.call(Mode.prototype),exports.Mode=Mode;