"use strict";var oop=require("../lib/oop"),HtmlHighlightRules=require("./html_highlight_rules").HtmlHighlightRules,RubyExports=require("./ruby_highlight_rules"),RubyHighlightRules=RubyExports.RubyHighlightRules,HamlHighlightRules=function(){HtmlHighlightRules.call(this),this.$rules={start:[{token:"comment.block",regex:/^\/$/,next:"comment"},{token:"comment.block",regex:/^\-#$/,next:"comment"},{token:"comment.line",regex:/\/\s*.*/},{token:"comment.line",regex:/-#\s*.*/},{token:"keyword.other.doctype",regex:"^!!!\\s*(?:[a-zA-Z0-9-_]+)?"},RubyExports.qString,RubyExports.qqString,RubyExports.tString,{token:"meta.tag.haml",regex:/(%[\w:\-]+)/},{token:"keyword.attribute-name.class.haml",regex:/\.[\w-]+/},{token:"keyword.attribute-name.id.haml",regex:/#[\w-]+/,next:"element_class"},RubyExports.constantNumericHex,RubyExports.constantNumericFloat,RubyExports.constantOtherSymbol,{token:"text",regex:/=|-|~/,next:"embedded_ruby"}],element_class:[{token:"keyword.attribute-name.class.haml",regex:/\.[\w-]+/},{token:"punctuation.section",regex:/\{/,next:"element_attributes"},RubyExports.constantOtherSymbol,{token:"empty",regex:"$|(?!\\.|#|\\{|\\[|=|-|~|\\/])",next:"start"}],element_attributes:[RubyExports.constantOtherSymbol,RubyExports.qString,RubyExports.qqString,RubyExports.tString,RubyExports.constantNumericHex,RubyExports.constantNumericFloat,{token:"punctuation.section",regex:/$|\}/,next:"start"}],embedded_ruby:[RubyExports.constantNumericHex,RubyExports.constantNumericFloat,RubyExports.instanceVariable,RubyExports.qString,RubyExports.qqString,RubyExports.tString,{token:"support.class",regex:"[A-Z][a-zA-Z_\\d]+"},{token:(new RubyHighlightRules).getKeywords(),regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:["keyword","text","text"],regex:"(?:do|\\{)(?: \\|[^|]+\\|)?$",next:"start"},{token:["text"],regex:"^$",next:"start"},{token:["text"],regex:"^(?!.*\\|\\s*$)",next:"start"}],comment:[{token:"comment.block",regex:/^$/,next:"start"},{token:"comment.block",regex:/\s+.*/}]},this.normalizeRules()};oop.inherits(HamlHighlightRules,HtmlHighlightRules),exports.HamlHighlightRules=HamlHighlightRules;