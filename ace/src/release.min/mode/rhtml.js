"use strict";var oop=require("../lib/oop"),HtmlMode=require("./html").Mode,RHtmlHighlightRules=require("./rhtml_highlight_rules").RHtmlHighlightRules,Mode=function(e,t){HtmlMode.call(this),this.$session=t,this.HighlightRules=RHtmlHighlightRules};oop.inherits(Mode,HtmlMode),function(){this.insertChunkInfo={value:"\x3c!--begin.rcode\n\nend.rcode--\x3e\n",position:{row:0,column:15}},this.getLanguageMode=function(e){return this.$session.getState(e.row).match(/^r-/)?"R":"HTML"},this.$id="ace/mode/rhtml"}.call(Mode.prototype),exports.Mode=Mode;