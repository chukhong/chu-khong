"use strict";var TextMode=require("./text").Mode,CspHighlightRules=require("./csp_highlight_rules").CspHighlightRules,oop=require("../lib/oop"),Mode=function(){this.HighlightRules=CspHighlightRules};oop.inherits(Mode,TextMode),function(){this.$id="ace/mode/csp"}.call(Mode.prototype),exports.Mode=Mode;