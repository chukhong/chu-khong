"use strict";var oop=require("../lib/oop"),JavaScriptMode=require("./javascript").Mode,GobstonesHighlightRules=require("./gobstones_highlight_rules").GobstonesHighlightRules,Mode=function(){JavaScriptMode.call(this),this.HighlightRules=GobstonesHighlightRules,this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,JavaScriptMode),function(){this.createWorker=function(){return null},this.$id="ace/mode/gobstones",this.snippetFileId="ace/snippets/gobstones"}.call(Mode.prototype),exports.Mode=Mode;