"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,GcodeHighlightRules=require("./gcode_highlight_rules").GcodeHighlightRules,Range=require("../range").Range,Mode=function(){this.HighlightRules=GcodeHighlightRules,this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,TextMode),function(){this.$id="ace/mode/gcode"}.call(Mode.prototype),exports.Mode=Mode;