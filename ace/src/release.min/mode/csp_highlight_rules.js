"use strict";var oop=require("../lib/oop"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,CspHighlightRules=function(){var e=this.createKeywordMapper({"constant.language":"child-src|connect-src|default-src|font-src|frame-src|img-src|manifest-src|media-src|object-src|script-src|style-src|worker-src|base-uri|plugin-types|sandbox|disown-opener|form-action|frame-ancestors|report-uri|report-to|upgrade-insecure-requests|block-all-mixed-content|require-sri-for|reflected-xss|referrer|policy-uri",variable:"'none'|'self'|'unsafe-inline'|'unsafe-eval'|'strict-dynamic'|'unsafe-hashed-attributes'"},"identifier",!0);this.$rules={start:[{token:"string.link",regex:/https?:[^;\s]*/},{token:"operator.punctuation",regex:/;/},{token:e,regex:/[^\s;]+/}]}};oop.inherits(CspHighlightRules,TextHighlightRules),exports.CspHighlightRules=CspHighlightRules;