var oop=require("../lib/oop"),lang=require("../lib/lang"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,TexHighlightRules=require("./tex_highlight_rules").TexHighlightRules,RHighlightRules=function(){for(var t=lang.arrayToMap("function|if|in|break|next|repeat|else|for|return|switch|while|try|tryCatch|stop|warning|require|library|attach|detach|source|setMethod|setGeneric|setGroupGeneric|setClass".split("|")),r=lang.arrayToMap("NULL|NA|TRUE|FALSE|T|F|Inf|NaN|NA_integer_|NA_real_|NA_character_|NA_complex_".split("|")),e=(this.$rules={start:[{token:"comment.sectionhead",regex:"#+(?!').*(?:----|====|####)\\s*$"},{token:"comment",regex:"#+'",next:"rd-start"},{token:"comment",regex:"#.*$"},{token:"string",regex:'["]',next:"qqstring"},{token:"string",regex:"[']",next:"qstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+[Li]?\\b"},{token:"constant.numeric",regex:"\\d+L\\b"},{token:"constant.numeric",regex:"\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b"},{token:"constant.numeric",regex:"\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b"},{token:"constant.language.boolean",regex:"(?:TRUE|FALSE|T|F)\\b"},{token:"identifier",regex:"`.*?`"},{onMatch:function(e){return t[e]?"keyword":r[e]?"constant.language":"..."==e||e.match(/^\.\.\d+$/)?"variable.language":"identifier"},regex:"[a-zA-Z.][a-zA-Z0-9._]*\\b"},{token:"keyword.operator",regex:"%%|>=|<=|==|!=|\\->|<\\-|\\|\\||&&|=|\\+|\\-|\\*|/|\\^|>|<|!|&|\\||~|\\$|:"},{token:"keyword.operator",regex:"%.*?%"},{token:"paren.keyword.operator",regex:"[[({]"},{token:"paren.keyword.operator",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],qqstring:[{token:"string",regex:'(?:(?:\\\\.)|(?:[^"\\\\]))*?"',next:"start"},{token:"string",regex:".+"}],qstring:[{token:"string",regex:"(?:(?:\\\\.)|(?:[^'\\\\]))*?'",next:"start"},{token:"string",regex:".+"}]},new TexHighlightRules("comment").getRules()),n=0;n<e.start.length;n++)e.start[n].token+=".virtual-comment";this.addRules(e,"rd-"),this.$rules["rd-start"].unshift({token:"text",regex:"^",next:"start"}),this.$rules["rd-start"].unshift({token:"keyword",regex:"@(?!@)[^ ]*"}),this.$rules["rd-start"].unshift({token:"comment",regex:"@@"}),this.$rules["rd-start"].push({token:"comment",regex:"[^%\\\\[({\\])}]+"})};oop.inherits(RHighlightRules,TextHighlightRules),exports.RHighlightRules=RHighlightRules;