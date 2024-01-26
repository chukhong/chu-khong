"use strict";var oop=require("../lib/oop"),HtmlMode=require("./html").Mode,RazorHighlightRules=require("./razor_highlight_rules").RazorHighlightRules,RazorCompletions=require("./razor_completions").RazorCompletions,HtmlCompletions=require("./html_completions").HtmlCompletions,Mode=function(){HtmlMode.call(this),this.$highlightRules=new RazorHighlightRules,this.$completer=new RazorCompletions,this.$htmlCompleter=new HtmlCompletions};oop.inherits(Mode,HtmlMode),function(){this.getCompletions=function(e,o,t,i){var l=this.$completer.getCompletions(e,o,t,i),e=this.$htmlCompleter.getCompletions(e,o,t,i);return l.concat(e)},this.createWorker=function(e){return null},this.$id="ace/mode/razor",this.snippetFileId="ace/snippets/razor"}.call(Mode.prototype),exports.Mode=Mode;