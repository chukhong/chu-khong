"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,FoldMode=require("./folding/coffee").FoldMode,SpaceHighlightRules=require("./space_highlight_rules").SpaceHighlightRules,Mode=function(){this.HighlightRules=SpaceHighlightRules,this.foldingRules=new FoldMode,this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,TextMode),function(){this.$id="ace/mode/space"}.call(Mode.prototype),exports.Mode=Mode;