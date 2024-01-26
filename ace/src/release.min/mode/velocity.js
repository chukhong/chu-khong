"use strict";var oop=require("../lib/oop"),HtmlMode=require("./html").Mode,VelocityHighlightRules=require("./velocity_highlight_rules").VelocityHighlightRules,FoldMode=require("./folding/velocity").FoldMode,Mode=function(){HtmlMode.call(this),this.HighlightRules=VelocityHighlightRules,this.foldingRules=new FoldMode};oop.inherits(Mode,HtmlMode),function(){this.lineCommentStart="##",this.blockComment={start:"#*",end:"*#"},this.$id="ace/mode/velocity",this.snippetFileId="ace/snippets/velocity"}.call(Mode.prototype),exports.Mode=Mode;