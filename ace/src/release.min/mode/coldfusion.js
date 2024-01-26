"use strict";var oop=require("../lib/oop"),lang=require("../lib/lang"),HtmlMode=require("./html").Mode,ColdfusionHighlightRules=require("./coldfusion_highlight_rules").ColdfusionHighlightRules,voidElements="cfabort|cfapplication|cfargument|cfassociate|cfbreak|cfcache|cfcollection|cfcookie|cfdbinfo|cfdirectory|cfdump|cfelse|cfelseif|cferror|cfexchangecalendar|cfexchangeconnection|cfexchangecontact|cfexchangefilter|cfexchangetask|cfexit|cffeed|cffile|cfflush|cfftp|cfheader|cfhtmlhead|cfhttpparam|cfimage|cfimport|cfinclude|cfindex|cfinsert|cfinvokeargument|cflocation|cflog|cfmailparam|cfNTauthenticate|cfobject|cfobjectcache|cfparam|cfpdfformparam|cfprint|cfprocparam|cfprocresult|cfproperty|cfqueryparam|cfregistry|cfreportparam|cfrethrow|cfreturn|cfschedule|cfsearch|cfset|cfsetting|cfthrow|cfzipparam)".split("|"),Mode=function(){HtmlMode.call(this),this.HighlightRules=ColdfusionHighlightRules};oop.inherits(Mode,HtmlMode),function(){this.voidElements=oop.mixin(lang.arrayToMap(voidElements),this.voidElements),this.getNextLineIndent=function(e,c,f){return this.$getIndent(c)},this.$id="ace/mode/coldfusion"}.call(Mode.prototype),exports.Mode=Mode;