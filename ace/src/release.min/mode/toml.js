"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,TomlHighlightRules=require("./toml_highlight_rules").TomlHighlightRules,FoldMode=require("./folding/ini").FoldMode,Mode=function(){this.HighlightRules=TomlHighlightRules,this.foldingRules=new FoldMode,this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,TextMode),function(){this.lineCommentStart="#",this.$id="ace/mode/toml"}.call(Mode.prototype),exports.Mode=Mode;