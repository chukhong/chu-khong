"use strict";var oop=require("../lib/oop"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,CssHighlightRules=require("./css_highlight_rules"),LessHighlightRules=function(){var e="@import|@media|@font-face|@keyframes|@-webkit-keyframes|@supports|@charset|@plugin|@namespace|@document|@page|@viewport|@-ms-viewport|or|and|when|not",t=e.split("|"),r=CssHighlightRules.supportType.split("|"),e=this.createKeywordMapper({"support.constant":CssHighlightRules.supportConstant,keyword:e,"support.constant.color":CssHighlightRules.supportConstantColor,"support.constant.fonts":CssHighlightRules.supportConstantFonts},"identifier",!0),n="\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))";this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:["constant.numeric","keyword"],regex:"("+n+")(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vm|vw|%)"},{token:"constant.numeric",regex:"#[a-f0-9]{6}"},{token:"constant.numeric",regex:"#[a-f0-9]{3}"},{token:"constant.numeric",regex:n},{token:["support.function","paren.lparen","string","paren.rparen"],regex:"(url)(\\()(.*)(\\))"},{token:["support.function","paren.lparen"],regex:"(:extend|[a-z0-9_\\-]+)(\\()"},{token:function(e){return-1<t.indexOf(e.toLowerCase())?"keyword":"variable"},regex:"[@\\$][a-z0-9_\\-@\\$]*\\b"},{token:"variable",regex:"[@\\$]\\{[a-z0-9_\\-@\\$]*\\}"},{token:function(e,t){return-1<r.indexOf(e.toLowerCase())?["support.type.property","text"]:["support.type.unknownProperty","text"]},regex:"([a-z0-9-_]+)(\\s*:)"},{token:"keyword",regex:"&"},{token:e,regex:"\\-?[@a-z_][@a-z0-9_\\-]*"},{token:"variable.language",regex:"#[a-z0-9-_]+"},{token:"variable.language",regex:"\\.[a-z0-9-_]+"},{token:"variable.language",regex:":[a-z_][a-z0-9-_]*"},{token:"constant",regex:"[a-z0-9-_]+"},{token:"keyword.operator",regex:"<|>|<=|>=|=|!=|-|%|\\+|\\*"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"},{caseInsensitive:!0}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}]},this.normalizeRules()};oop.inherits(LessHighlightRules,TextHighlightRules),exports.LessHighlightRules=LessHighlightRules;