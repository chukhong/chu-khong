"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,TurtleHighlightRules=require("./turtle_highlight_rules").TurtleHighlightRules,FoldMode=require("./folding/cstyle").FoldMode,Mode=function(){this.HighlightRules=TurtleHighlightRules,this.foldingRules=new FoldMode};oop.inherits(Mode,TextMode),function(){this.$id="ace/mode/turtle"}.call(Mode.prototype),exports.Mode=Mode;