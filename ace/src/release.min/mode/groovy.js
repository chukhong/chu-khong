"use strict";var oop=require("../lib/oop"),JavaScriptMode=require("./javascript").Mode,GroovyHighlightRules=require("./groovy_highlight_rules").GroovyHighlightRules,Mode=function(){JavaScriptMode.call(this),this.HighlightRules=GroovyHighlightRules};oop.inherits(Mode,JavaScriptMode),function(){this.createWorker=function(o){return null},this.$id="ace/mode/groovy"}.call(Mode.prototype),exports.Mode=Mode;