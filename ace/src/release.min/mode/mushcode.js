"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,MushCodeRules=require("./mushcode_highlight_rules").MushCodeRules,PythonFoldMode=require("./folding/pythonic").FoldMode,Range=require("../range").Range,Mode=function(){this.HighlightRules=MushCodeRules,this.foldingRules=new PythonFoldMode("\\:"),this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,TextMode),function(){this.getNextLineIndent=function(e,t,n){var o=this.$getIndent(t),i=this.getTokenizer().getLineTokens(t,e).tokens;return i.length&&"comment"==i[i.length-1].type||"start"==e&&t.match(/^.*[\{\(\[:]\s*$/)&&(o+=n),o};var r={pass:1,return:1,raise:1,break:1,continue:1};this.checkOutdent=function(e,t,n){if("\r\n"!==n&&"\r"!==n&&"\n"!==n)return!1;var o=this.getTokenizer().getLineTokens(t.trim(),e).tokens;if(!o)return!1;do{var i=o.pop()}while(i&&("comment"==i.type||"text"==i.type&&i.value.match(/^\s+$/)));return!!i&&"keyword"==i.type&&r[i.value]},this.autoOutdent=function(e,t,n){var o=this.$getIndent(t.getLine(n+=1)),i=t.getTabString();o.slice(-i.length)==i&&t.remove(new Range(n,o.length-i.length,n,o.length))},this.$id="ace/mode/mushcode"}.call(Mode.prototype),exports.Mode=Mode;