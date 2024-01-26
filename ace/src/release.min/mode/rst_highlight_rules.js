"use strict";var oop=require("../lib/oop"),lang=require("../lib/lang"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,RSTHighlightRules=function(){var e="markup.heading",t="markup.heading",n="constant",o="keyword.operator",x="string",r="markup.underline.list",g="markup.bold",k="markup.italic",i="support.function",l="comment",s="(^|\\s|[\"'(<\\[{\\-/:])",a="(?:$|(?=\\s|[\\\\.,;!?\\-/:\"')>\\]}]))";this.$rules={start:[{token:e,regex:"(^)([\\=\\-`:\\.'\"~\\^_\\*\\+#])(\\2{2,}\\s*$)"},{token:["text",o,i],regex:"(^\\s*\\.\\. )([^: ]+::)(.*$)",next:"codeblock"},{token:o,regex:"::$",next:"codeblock"},{token:[x,r],regex:"(^\\.\\. _[^:]+:)(.*$)"},{token:[x,r],regex:"(^__ )(https?://.*$)"},{token:x,regex:"^\\.\\. \\[[^\\]]+\\] "},{token:l,regex:"^\\.\\. .*$",next:"comment"},{token:t,regex:"^\\s*[\\*\\+-] "},{token:t,regex:"^\\s*(?:[A-Za-z]|[0-9]+|[ivxlcdmIVXLCDM]+)\\. "},{token:t,regex:"^\\s*\\(?(?:[A-Za-z]|[0-9]+|[ivxlcdmIVXLCDM]+)\\) "},{token:n,regex:"^={2,}(?: +={2,})+$"},{token:n,regex:"^\\+-{2,}(?:\\+-{2,})+\\+$"},{token:n,regex:"^\\+={2,}(?:\\+={2,})+\\+$"},{token:["text",i],regex:s+"(``)(?=\\S)",next:"code"},{token:["text",g],regex:s+"(\\*\\*)(?=\\S)",next:"bold"},{token:["text",k],regex:s+"(\\*)(?=\\S)",next:"italic"},{token:x,regex:"\\|[\\w\\-]+?\\|"},{token:x,regex:":[\\w-:]+:`\\S",next:"entity"},{token:["text",x],regex:s+"(_`)(?=\\S)",next:"entity"},{token:x,regex:"_[A-Za-z0-9\\-]+?"},{token:["text",r],regex:s+"(`)(?=\\S)",next:"link"},{token:r,regex:"[A-Za-z0-9\\-]+?__?"},{token:r,regex:"\\[[^\\]]+?\\]_"},{token:r,regex:"https?://\\S+"},{token:n,regex:"\\|"}],codeblock:[{token:i,regex:"^ +.+$",next:"codeblock"},{token:i,regex:"^$",next:"codeblock"},{token:"empty",regex:"",next:"start"}],code:[{token:i,regex:"\\S``"+a,next:"start"},{defaultToken:i}],bold:[{token:g,regex:"\\S\\*\\*"+a,next:"start"},{defaultToken:g}],italic:[{token:k,regex:"\\S\\*"+a,next:"start"},{defaultToken:k}],entity:[{token:x,regex:"\\S`"+a,next:"start"},{defaultToken:x}],link:[{token:r,regex:"\\S`__?"+a,next:"start"},{defaultToken:r}],comment:[{token:l,regex:"^ +.+$",next:"comment"},{token:l,regex:"^$",next:"comment"},{token:"empty",regex:"",next:"start"}]}};oop.inherits(RSTHighlightRules,TextHighlightRules),exports.RSTHighlightRules=RSTHighlightRules;