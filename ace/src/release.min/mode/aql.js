"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,AqlHighlightRules=require("./aql_highlight_rules").AqlHighlightRules,Mode=function(){this.HighlightRules=AqlHighlightRules,this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,TextMode),function(){this.lineCommentStart="//",this.$id="ace/mode/aql"}.call(Mode.prototype),exports.Mode=Mode;