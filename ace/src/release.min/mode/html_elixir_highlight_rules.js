"use strict";var oop=require("../lib/oop"),HtmlHighlightRules=require("./html_highlight_rules").HtmlHighlightRules,ElixirHighlightRules=require("./elixir_highlight_rules").ElixirHighlightRules,HtmlElixirHighlightRules=function(){HtmlHighlightRules.call(this);var e,i=[{regex:"<%%|%%>",token:"constant.language.escape"},{token:"comment.start.eex",regex:"<%#",push:[{token:"comment.end.eex",regex:"%>",next:"pop",defaultToken:"comment"}]},{token:"support.elixir_tag",regex:"<%+(?!>)[-=]?",push:"elixir-start"}];for(e in this.$rules)this.$rules[e].unshift.apply(this.$rules[e],i);this.embedRules(ElixirHighlightRules,"elixir-",[{token:"support.elixir_tag",regex:"%>",next:"pop"},{token:"comment",regex:"#(?:[^%]|%[^>])*"}],["start"]),this.normalizeRules()};oop.inherits(HtmlElixirHighlightRules,HtmlHighlightRules),exports.HtmlElixirHighlightRules=HtmlElixirHighlightRules;