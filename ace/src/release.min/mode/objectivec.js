"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,ObjectiveCHighlightRules=require("./objectivec_highlight_rules").ObjectiveCHighlightRules,CStyleFoldMode=require("./folding/cstyle").FoldMode,Mode=function(){this.HighlightRules=ObjectiveCHighlightRules,this.foldingRules=new CStyleFoldMode,this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,TextMode),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.$id="ace/mode/objectivec"}.call(Mode.prototype),exports.Mode=Mode;