var oop=require("../lib/oop"),TextMode=require("../mode/text").Mode,MysqlHighlightRules=require("./mysql_highlight_rules").MysqlHighlightRules,Mode=function(){this.HighlightRules=MysqlHighlightRules,this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,TextMode),function(){this.lineCommentStart=["--","#"],this.blockComment={start:"/*",end:"*/"},this.$id="ace/mode/mysql"}.call(Mode.prototype),exports.Mode=Mode;