"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,scryptHighlightRules=require("./scrypt_highlight_rules").scryptHighlightRules,FoldMode=require("./folding/cstyle").FoldMode,Mode=function(){this.HighlightRules=scryptHighlightRules,this.foldingRules=new FoldMode};oop.inherits(Mode,TextMode),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.$quotes={'"':'"',"'":"'"},this.createWorker=function(e){return null},this.$id="ace/mode/scrypt"}.call(Mode.prototype),exports.Mode=Mode;