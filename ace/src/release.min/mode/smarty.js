"use strict";var oop=require("../lib/oop"),HtmlMode=require("./html").Mode,SmartyHighlightRules=require("./smarty_highlight_rules").SmartyHighlightRules,Mode=function(){HtmlMode.call(this),this.HighlightRules=SmartyHighlightRules};oop.inherits(Mode,HtmlMode),function(){this.$id="ace/mode/smarty"}.call(Mode.prototype),exports.Mode=Mode;