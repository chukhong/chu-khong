"use strict";var oop=require("../lib/oop"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,IoHighlightRules=function(){this.$rules={start:[{token:"keyword.control.io",regex:"\\b(?:if|ifTrue|ifFalse|ifTrueIfFalse|for|loop|reverseForeach|foreach|map|continue|break|while|do|return)\\b"},{token:"punctuation.definition.comment.io",regex:"/\\*",push:[{token:"punctuation.definition.comment.io",regex:"\\*/",next:"pop"},{defaultToken:"comment.block.io"}]},{token:"punctuation.definition.comment.io",regex:"//",push:[{token:"comment.line.double-slash.io",regex:"$",next:"pop"},{defaultToken:"comment.line.double-slash.io"}]},{token:"punctuation.definition.comment.io",regex:"#",push:[{token:"comment.line.number-sign.io",regex:"$",next:"pop"},{defaultToken:"comment.line.number-sign.io"}]},{token:"variable.language.io",regex:"\\b(?:self|sender|target|proto|protos|parent)\\b",comment:"I wonder if some of this isn't variable.other.language? --Allan; scoping this as variable.language to match Objective-C's handling of 'self', which is inconsistent with C++'s handling of 'this' but perhaps intentionally so -- Rob"},{token:"keyword.operator.io",regex:"<=|>=|=|:=|\\*|\\||\\|\\||\\+|-|/|&|&&|>|<|\\?|@|@@|\\b(?:and|or)\\b"},{token:"constant.other.io",regex:"\\bGL[\\w_]+\\b"},{token:"support.class.io",regex:"\\b[A-Z](?:\\w+)?\\b"},{token:"support.function.io",regex:"\\b(?:clone|call|init|method|list|vector|block|\\w+(?=\\s*\\())\\b"},{token:"support.function.open-gl.io",regex:"\\bgl(?:u|ut)?[A-Z]\\w+\\b"},{token:"punctuation.definition.string.begin.io",regex:'"""',push:[{token:"punctuation.definition.string.end.io",regex:'"""',next:"pop"},{token:"constant.character.escape.io",regex:"\\\\."},{defaultToken:"string.quoted.triple.io"}]},{token:"punctuation.definition.string.begin.io",regex:'"',push:[{token:"punctuation.definition.string.end.io",regex:'"',next:"pop"},{token:"constant.character.escape.io",regex:"\\\\."},{defaultToken:"string.quoted.double.io"}]},{token:"constant.numeric.io",regex:"\\b(?:0(?:x|X)[0-9a-fA-F]*|(?:[0-9]+\\.?[0-9]*|\\.[0-9]+)(?:(?:e|E)(?:\\+|-)?[0-9]+)?)(?:L|l|UL|ul|u|U|F|f)?\\b"},{token:"variable.other.global.io",regex:"Lobby\\b"},{token:"constant.language.io",regex:"\\b(?:TRUE|true|FALSE|false|NULL|null|Null|Nil|nil|YES|NO)\\b"}]},this.normalizeRules()};IoHighlightRules.metaData={fileTypes:["io"],keyEquivalent:"^~I",name:"Io",scopeName:"source.io"},oop.inherits(IoHighlightRules,TextHighlightRules),exports.IoHighlightRules=IoHighlightRules;