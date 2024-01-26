"use strict";var dom=require("./lib/dom"),oop=require("./lib/oop"),EventEmitter=require("./lib/event_emitter").EventEmitter,lang=require("./lib/lang"),Range=require("./range").Range,RangeList=require("./range_list").RangeList,HashHandler=require("./keyboard/hash_handler").HashHandler,Tokenizer=require("./tokenizer").Tokenizer,clipboard=require("./clipboard"),VARIABLES={CURRENT_WORD:function(e){return e.session.getTextRange(e.session.getWordRange())},SELECTION:function(e,t,n){e=e.session.getTextRange();return n?e.replace(/\n\r?([ \t]*\S)/g,"\n"+n+"$1"):e},CURRENT_LINE:function(e){return e.session.getLine(e.getCursorPosition().row)},PREV_LINE:function(e){return e.session.getLine(e.getCursorPosition().row-1)},LINE_INDEX:function(e){return e.getCursorPosition().row},LINE_NUMBER:function(e){return e.getCursorPosition().row+1},SOFT_TABS:function(e){return e.session.getUseSoftTabs()?"YES":"NO"},TAB_SIZE:function(e){return e.session.getTabSize()},CLIPBOARD:function(e){return clipboard.getText&&clipboard.getText()},FILENAME:function(e){return/[^/\\]*$/.exec(this.FILEPATH(e))[0]},FILENAME_BASE:function(e){return/[^/\\]*$/.exec(this.FILEPATH(e))[0].replace(/\.[^.]*$/,"")},DIRECTORY:function(e){return this.FILEPATH(e).replace(/[^/\\]*$/,"")},FILEPATH:function(e){return"/not implemented.txt"},WORKSPACE_NAME:function(){return"Unknown"},FULLNAME:function(){return"Unknown"},BLOCK_COMMENT_START:function(e){e=e.session.$mode||{};return e.blockComment&&e.blockComment.start||""},BLOCK_COMMENT_END:function(e){e=e.session.$mode||{};return e.blockComment&&e.blockComment.end||""},LINE_COMMENT:function(e){return(e.session.$mode||{}).lineCommentStart||""},CURRENT_YEAR:date.bind(null,{year:"numeric"}),CURRENT_YEAR_SHORT:date.bind(null,{year:"2-digit"}),CURRENT_MONTH:date.bind(null,{month:"numeric"}),CURRENT_MONTH_NAME:date.bind(null,{month:"long"}),CURRENT_MONTH_NAME_SHORT:date.bind(null,{month:"short"}),CURRENT_DATE:date.bind(null,{day:"2-digit"}),CURRENT_DAY_NAME:date.bind(null,{weekday:"long"}),CURRENT_DAY_NAME_SHORT:date.bind(null,{weekday:"short"}),CURRENT_HOUR:date.bind(null,{hour:"2-digit",hour12:!1}),CURRENT_MINUTE:date.bind(null,{minute:"2-digit"}),CURRENT_SECOND:date.bind(null,{second:"2-digit"})};function date(e){e=(new Date).toLocaleString("en-us",e);return 1==e.length?"0"+e:e}VARIABLES.SELECTED_TEXT=VARIABLES.SELECTION;var SnippetManager=function(){this.snippetMap={},this.snippetNameMap={}},TabstopManager=(!function(){oop.implement(this,EventEmitter),this.getTokenizer=function(){return SnippetManager.$tokenizer||this.createTokenizer()},this.createTokenizer=function(){function i(e){return e=e.substr(1),/^\d+$/.test(e)?[{tabstopId:parseInt(e,10)}]:[{text:e}]}function e(e){return"(?:[^\\\\"+e+"]|\\\\.)"}var t={regex:"/("+e("/")+"+)/",onMatch:function(e,t,n){n=n[0];return n.fmtString=!0,n.guard=e.slice(1,-1),n.flag=""},next:"formatString"};return SnippetManager.$tokenizer=new Tokenizer({start:[{regex:/\\./,onMatch:function(e,t,n){var i=e[1];return[e="}"==i&&n.length||-1!="`$\\".indexOf(i)?i:e]}},{regex:/}/,onMatch:function(e,t,n){return[n.length?n.shift():e]}},{regex:/\$(?:\d+|\w+)/,onMatch:i},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(e,t,n){e=i(e.substr(1));return n.unshift(e[0]),e},next:"snippetVar"},{regex:/\n/,token:"newline",merge:!1}],snippetVar:[{regex:"\\|"+e("\\|")+"*\\|",onMatch:function(e,t,n){e=e.slice(1,-1).replace(/\\[,|\\]|,/g,function(e){return 2==e.length?e[1]:"\0"}).split("\0").map(function(e){return{value:e}});return[(n[0].choices=e)[0]]},next:"start"},t,{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:/:/,onMatch:function(e,t,n){return n.length&&n[0].expectElse?(n[0].expectElse=!1,n[0].ifEnd={elseEnd:n[0]},[n[0].ifEnd]):":"}},{regex:/\\./,onMatch:function(e,t,n){var i=e[1];return"}"==i&&n.length||-1!="`$\\".indexOf(i)?e=i:"n"==i?e="\n":"t"==i?e="\t":-1!="ulULE".indexOf(i)&&(e={changeCase:i,local:"a"<i}),[e]}},{regex:"/\\w*}",onMatch:function(e,t,n){n=n.shift();return n&&(n.flag=e.slice(1,-1)),this.next=n&&n.tabstopId?"start":"",[n||e]},next:"start"},{regex:/\$(?:\d+|\w+)/,onMatch:function(e,t,n){return[{text:e.slice(1)}]}},{regex:/\${\w+/,onMatch:function(e,t,n){e={text:e.slice(2)};return n.unshift(e),[e]},next:"formatStringVar"},{regex:/\n/,token:"newline",merge:!1},{regex:/}/,onMatch:function(e,t,n){n=n.shift();return this.next=n&&n.tabstopId?"start":"",[n||e]},next:"start"}],formatStringVar:[{regex:/:\/\w+}/,onMatch:function(e,t,n){return n[0].formatFunction=e.slice(2,-1),[n.shift()]},next:"formatString"},t,{regex:/:[\?\-+]?/,onMatch:function(e,t,n){"+"==e[1]&&(n[0].ifEnd=n[0]),"?"==e[1]&&(n[0].expectElse=!0)},next:"formatString"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"formatString"}]}),SnippetManager.$tokenizer},this.tokenizeTmSnippet=function(e,t){return this.getTokenizer().getLineTokens(e,t).tokens.map(function(e){return e.value||e})},this.getVariableValue=function(e,t,n){var i;return/^\d+$/.test(t)?(this.variables.__||{})[t]||"":/^[A-Z]\d+$/.test(t)?(this.variables[t[0]+"__"]||{})[t.substr(1)]||"":(t=t.replace(/^TM_/,""),!this.variables.hasOwnProperty(t)||null==(i="function"==typeof(i=this.variables[t])?this.variables[t](e,t,n):i)?"":i)},this.variables=VARIABLES,this.tmStrFormat=function(e,t,o){var n,i,a,c;return t.fmt?(n=t.flag||"",i=t.guard,i=new RegExp(i,n.replace(/[^gim]/g,"")),a="string"==typeof t.fmt?this.tokenizeTmSnippet(t.fmt,"formatString"):t.fmt,c=this,e.replace(i,function(){for(var e=c.variables.__,t=(c.variables.__=[].slice.call(arguments),c.resolveVariables(a,o)),n="E",i=0;i<t.length;i++){var r,s=t[i];"object"==typeof s?(t[i]="",s.changeCase&&s.local?(r=t[i+1])&&"string"==typeof r&&("u"==s.changeCase?t[i]=r[0].toUpperCase():t[i]=r[0].toLowerCase(),t[i+1]=r.substr(1)):s.changeCase&&(n=s.changeCase)):"U"==n?t[i]=s.toUpperCase():"L"==n&&(t[i]=s.toLowerCase())}return c.variables.__=e,t.join("")})):e},this.tmFormatFunction=function(e,t,n){return"upcase"==t.formatFunction?e.toUpperCase():"downcase"==t.formatFunction?e.toLowerCase():e},this.resolveVariables=function(t,e){for(var n=[],i="",r=!0,s=0;s<t.length;s++){var o,a=t[s];"string"==typeof a?(n.push(a),"\n"==a?(r=!0,i=""):r&&(i=/^\t*/.exec(a)[0],r=/\S/.test(a))):a&&(r=!1,a.fmtString&&(-1==(o=t.indexOf(a,s+1))&&(o=t.length),a.fmt=t.slice(s+1,o),s=o),a.text?(o=this.getVariableValue(e,a.text,i)+"",a.fmtString&&(o=this.tmStrFormat(o,a,e)),(o=a.formatFunction?this.tmFormatFunction(o,a,e):o)&&!a.ifEnd?(n.push(o),c(a)):!o&&a.ifEnd&&c(a.ifEnd)):a.elseEnd?c(a.elseEnd):null==a.tabstopId&&null==a.changeCase||n.push(a))}function c(e){e=t.indexOf(e,s+1);-1!=e&&(s=e)}return n},this.insertSnippetForSelection=function(e,t){var n=e.getCursorPosition(),i=e.session.getLine(n.row),r=e.session.getTabString(),s=i.match(/^\s*/)[0],o=(n.column<s.length&&(s=s.slice(0,n.column)),t=t.replace(/\r/g,""),this.tokenizeTmSnippet(t)),a=(o=(o=this.resolveVariables(o,e)).map(function(e){return"\n"==e?e+s:"string"==typeof e?e.replace(/\t/g,r):e}),[]),c=(o.forEach(function(e,t){var n,i,r;"object"==typeof e&&(r=e.tabstopId,(n=a[r])||((n=a[r]=[]).index=r,n.value="",n.parents={}),-1===n.indexOf(e))&&(e.choices&&!n.choices&&(n.choices=e.choices),n.push(e),-1!==(i=o.indexOf(e,t+1)))&&((r=o.slice(t+1,i)).some(function(e){return"object"==typeof e})&&!n.value?n.value=r:!r.length||n.value&&"string"==typeof n.value||(n.value=r.join("")))}),a.forEach(function(e){e.length=0}),{});for(var h=0;h<o.length;h++){var p,g,l,u=o[h];"object"==typeof u&&(l=u.tabstopId,p=a[l],g=o.indexOf(u,h+1),c[l]?c[l]===u&&(delete c[l],Object.keys(c).forEach(function(e){p.parents[e]=!0})):(c[l]=u,"string"!=typeof(l=p.value)?l=function(e){for(var t=[],n=0;n<e.length;n++){if("object"==typeof(i=e[n])){if(c[i.tabstopId])continue;var i=t[e.lastIndexOf(i,n-1)]||{tabstopId:i.tabstopId}}t[n]=i}return t}(l):u.fmt&&(l=this.tmStrFormat(l,u,e)),o.splice.apply(o,[h+1,Math.max(0,g-h)].concat(l,u)),-1===p.indexOf(u)&&p.push(u)))}var d=0,f=0,b="",i=(o.forEach(function(e){var t;"string"==typeof e?(1<(t=e.split("\n")).length?(f=t[t.length-1].length,d+=t.length-1):f+=e.length,b+=e):e&&(e.start?e.end={row:d,column:f}:e.start={row:d,column:f})}),e.getSelectionRange()),n=e.session.replace(i,b),t=new TabstopManager(e),m=e.inVirtualSelectionMode&&e.selection.index;t.addTabstops(a,i.start,n,m)},this.insertSnippet=function(e,t){var n=this;if(e.inVirtualSelectionMode)return n.insertSnippetForSelection(e,t);e.forEachSelection(function(){n.insertSnippetForSelection(e,t)},null,{keepOrder:!0}),e.tabstopManager&&e.tabstopManager.tabNext()},this.$getScope=function(e){var t,n=e.session.$mode.$id||"";return"html"!==(n=n.split("/").pop())&&"php"!==n||("php"!==n||e.session.$mode.inlinePhp||(n="html"),t=e.getCursorPosition(),(e="object"==typeof(e=e.session.getState(t.row))?e[0]:e).substring&&("js-"==e.substring(0,3)?n="javascript":"css-"==e.substring(0,4)?n="css":"php-"==e.substring(0,4)&&(n="php"))),n},this.getActiveScopes=function(e){var e=this.$getScope(e),t=[e],n=this.snippetMap;return n[e]&&n[e].includeScopes&&t.push.apply(t,n[e].includeScopes),t.push("_"),t},this.expandWithTab=function(e,t){var n=this,i=e.forEachSelection(function(){return n.expandSnippetForSelection(e,t)},null,{keepOrder:!0});return i&&e.tabstopManager&&e.tabstopManager.tabNext(),i},this.expandSnippetForSelection=function(e,t){var n,i=e.getCursorPosition(),r=e.session.getLine(i.row),s=r.substring(0,i.column),o=r.substr(i.column),a=this.snippetMap;return this.getActiveScopes(e).some(function(e){e=a[e];return!!(n=e?this.findMatchingSnippet(e,s,o):n)},this),!!n&&(t&&t.dryRun||(e.session.doc.removeInLine(i.row,i.column-n.replaceBefore.length,i.column+n.replaceAfter.length),this.variables.M__=n.matchBefore,this.variables.T__=n.matchAfter,this.insertSnippetForSelection(e,n.content),this.variables.M__=this.variables.T__=null),!0)},this.findMatchingSnippet=function(e,t,n){for(var i=e.length;i--;){var r=e[i];if((!r.startRe||r.startRe.test(t))&&((!r.endRe||r.endRe.test(n))&&(r.startRe||r.endRe)))return r.matchBefore=r.startRe?r.startRe.exec(t):[""],r.matchAfter=r.endRe?r.endRe.exec(n):[""],r.replaceBefore=r.triggerRe?r.triggerRe.exec(t)[0]:"",r.replaceAfter=r.endTriggerRe?r.endTriggerRe.exec(n)[0]:"",r}},this.snippetMap={},this.snippetNameMap={},this.register=function(t,i){var r=this.snippetMap,s=this.snippetNameMap,o=this;function a(e){return(e=e&&!/^\^?\(.*\)\$?$|^\\b$/.test(e)?"(?:"+e+")":e)||""}function c(e,t,n){return e=a(e),t=a(t),n?(e=t+e)&&"$"!=e[e.length-1]&&(e+="$"):(e+=t)&&"^"!=e[0]&&(e="^"+e),new RegExp(e)}function n(e){e.scope||(e.scope=i||"_"),i=e.scope,r[i]||(r[i]=[],s[i]={});var t,n=s[i];e.name&&((t=n[e.name])&&o.unregister(t),n[e.name]=e),r[i].push(e),e.prefix&&(e.tabTrigger=e.prefix),!e.content&&e.body&&(e.content=Array.isArray(e.body)?e.body.join("\n"):e.body),e.tabTrigger&&!e.trigger&&(!e.guard&&/^\w/.test(e.tabTrigger)&&(e.guard="\\b"),e.trigger=lang.escapeRegExp(e.tabTrigger)),(e.trigger||e.guard||e.endTrigger||e.endGuard)&&(e.startRe=c(e.trigger,e.guard,!0),e.triggerRe=new RegExp(e.trigger),e.endRe=c(e.endTrigger,e.endGuard,!0),e.endTriggerRe=new RegExp(e.endTrigger))}t=t||[],Array.isArray(t)?t.forEach(n):Object.keys(t).forEach(function(e){n(t[e])}),this._signal("registerSnippets",{scope:i})},this.unregister=function(e,n){var i=this.snippetMap,r=this.snippetNameMap;function t(e){var t=r[e.scope||n];t&&t[e.name]&&(delete t[e.name],0<=(e=(t=i[e.scope||n])&&t.indexOf(e)))&&t.splice(e,1)}e.content?t(e):Array.isArray(e)&&e.forEach(t)},this.parseSnippetFile=function(e){e=e.replace(/\r/g,"");for(var t,n,i,r=[],s={},o=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm;n=o.exec(e);){if(n[1])try{s=JSON.parse(n[1]),r.push(s)}catch(e){}n[4]?(s.content=n[4].replace(/^\t/gm,""),r.push(s),s={}):(t=n[2],n=n[3],"regex"==t?(s.guard=(i=/\/((?:[^\/\\]|\\.)*)|$/g).exec(n)[1],s.trigger=i.exec(n)[1],s.endTrigger=i.exec(n)[1],s.endGuard=i.exec(n)[1]):"snippet"==t?(s.tabTrigger=n.match(/^\S*/)[0],s.name||(s.name=n)):t&&(s[t]=n))}return r},this.getSnippetByName=function(t,e){var n,i=this.snippetNameMap;return this.getActiveScopes(e).some(function(e){e=i[e];return!!(n=e?e[t]:n)},this),n}}.call(SnippetManager.prototype),function(e){if(e.tabstopManager)return e.tabstopManager;(e.tabstopManager=this).$onChange=this.onChange.bind(this),this.$onChangeSelection=lang.delayedCall(this.onChangeSelection.bind(this)).schedule,this.$onChangeSession=this.onChangeSession.bind(this),this.$onAfterExec=this.onAfterExec.bind(this),this.attach(e)}),movePoint=(!function(){this.attach=function(e){this.index=0,this.ranges=[],this.tabstops=[],this.$openTabstops=null,this.selectedTabstop=null,this.editor=e,this.editor.on("change",this.$onChange),this.editor.on("changeSelection",this.$onChangeSelection),this.editor.on("changeSession",this.$onChangeSession),this.editor.commands.on("afterExec",this.$onAfterExec),this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)},this.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this),this.ranges=null,this.tabstops=null,this.selectedTabstop=null,this.editor.removeListener("change",this.$onChange),this.editor.removeListener("changeSelection",this.$onChangeSelection),this.editor.removeListener("changeSession",this.$onChangeSession),this.editor.commands.removeListener("afterExec",this.$onAfterExec),this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.tabstopManager=null,this.editor=null},this.onChange=function(e){for(var t="r"==e.action[0],n=this.selectedTabstop||{},i=n.parents||{},r=(this.tabstops||[]).slice(),s=0;s<r.length;s++){var o=r[s],a=o==n||i[o.index];if(o.rangeList.$bias=a?0:1,"remove"==e.action&&o!==n)for(var a=o.parents&&o.parents[n.index],c=(c=o.rangeList.pointIndex(e.start,a))<0?-c-1:c+1,a=o.rangeList.pointIndex(e.end,a),h=o.rangeList.ranges.slice(c,a<0?-a-1:a-1),p=0;p<h.length;p++)this.removeRange(h[p]);o.rangeList.$onChange(e)}var g=this.editor.session;this.$inChange||!t||1!=g.getLength()||g.getValue()||this.detach()},this.updateLinkedFields=function(){var e=this.selectedTabstop;if(e&&e.hasLinkedRanges&&e.firstNonLinked){this.$inChange=!0;for(var t=this.editor.session,n=t.getTextRange(e.firstNonLinked),i=0;i<e.length;i++){var r,s=e[i];s.linked&&(r=s.original,r=exports.snippetManager.tmStrFormat(n,r,this.editor),t.replace(s,r))}this.$inChange=!1}},this.onAfterExec=function(e){e.command&&!e.command.readOnly&&this.updateLinkedFields()},this.onChangeSelection=function(){if(this.editor){for(var e=this.editor.selection.lead,t=this.editor.selection.anchor,n=this.editor.selection.isEmpty(),i=0;i<this.ranges.length;i++)if(!this.ranges[i].linked){var r=this.ranges[i].contains(e.row,e.column),s=n||this.ranges[i].contains(t.row,t.column);if(r&&s)return}this.detach()}},this.onChangeSession=function(){this.detach()},this.tabNext=function(e){var t=this.tabstops.length,e=this.index+(e||1),e=Math.min(Math.max(e,1),t);this.selectTabstop(e=e==t?0:e),0===e&&this.detach()},this.selectTabstop=function(e){this.$openTabstops=null;var t=this.tabstops[this.index];if(t&&this.addTabstopMarkers(t),this.index=e,(t=this.tabstops[this.index])&&t.length){e=(this.selectedTabstop=t).firstNonLinked||t;if(t.choices&&(e.cursor=e.start),this.editor.inVirtualSelectionMode)this.editor.selection.fromOrientedRange(e);else{var n=this.editor.multiSelect;n.toSingleRange(e);for(var i=0;i<t.length;i++)t.hasLinkedRanges&&t[i].linked||n.addRange(t[i].clone(),!0)}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler),this.selectedTabstop&&this.selectedTabstop.choices&&this.editor.execCommand("startAutocomplete",{matches:this.selectedTabstop.choices})}},this.addTabstops=function(e,o,t){var a=this.useLink||!this.editor.getOption("enableMultiselect");this.$openTabstops||(this.$openTabstops=[]),e[0]||(t=Range.fromPoints(t,t),moveRelative(t.start,o),moveRelative(t.end,o),e[0]=[t],e[0].index=0);var c=[this.index+1,0],h=this.ranges;e.forEach(function(e,t){for(var n=this.$openTabstops[t]||e,i=0;i<e.length;i++){var r=e[i],s=Range.fromPoints(r.start,r.end||r.start);movePoint(s.start,o),movePoint(s.end,o),s.original=r,s.tabstop=n,h.push(s),n!=e?n.unshift(s):n[i]=s,r.fmtString||n.firstNonLinked&&a?(s.linked=!0,n.hasLinkedRanges=!0):n.firstNonLinked||(n.firstNonLinked=s)}n.firstNonLinked||(n.hasLinkedRanges=!1),n===e&&(c.push(n),this.$openTabstops[t]=n),this.addTabstopMarkers(n),n.rangeList=n.rangeList||new RangeList,n.rangeList.$bias=0,n.rangeList.addList(n)},this),2<c.length&&(this.tabstops.length&&c.push(c.splice(2,1)[0]),this.tabstops.splice.apply(this.tabstops,c))},this.addTabstopMarkers=function(e){var t=this.editor.session;e.forEach(function(e){e.markerId||(e.markerId=t.addMarker(e,"ace_snippet-marker","text"))})},this.removeTabstopMarkers=function(e){var t=this.editor.session;e.forEach(function(e){t.removeMarker(e.markerId),e.markerId=null})},this.removeRange=function(e){var t=e.tabstop.indexOf(e);-1!=t&&e.tabstop.splice(t,1),-1!=(t=this.ranges.indexOf(e))&&this.ranges.splice(t,1),-1!=(t=e.tabstop.rangeList.ranges.indexOf(e))&&e.tabstop.splice(t,1),this.editor.session.removeMarker(e.markerId),e.tabstop.length||(-1!=(t=this.tabstops.indexOf(e.tabstop))&&this.tabstops.splice(t,1),this.tabstops.length)||this.detach()},this.keyboardHandler=new HashHandler,this.keyboardHandler.bindKeys({Tab:function(e){exports.snippetManager&&exports.snippetManager.expandWithTab(e)||(e.tabstopManager.tabNext(1),e.renderer.scrollCursorIntoView())},"Shift-Tab":function(e){e.tabstopManager.tabNext(-1),e.renderer.scrollCursorIntoView()},Esc:function(e){e.tabstopManager.detach()}})}.call(TabstopManager.prototype),function(e,t){0==e.row&&(e.column+=t.column),e.row+=t.row}),moveRelative=function(e,t){e.row==t.row&&(e.column-=t.column),e.row-=t.row},Editor=(dom.importCssString(`
.ace_snippet-marker {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: rgba(194, 193, 208, 0.09);
    border: 1px dotted rgba(211, 208, 235, 0.62);
    position: absolute;
}`,"snippets.css",!1),exports.snippetManager=new SnippetManager,require("./editor").Editor);!function(){this.insertSnippet=function(e,t){return exports.snippetManager.insertSnippet(this,e,t)},this.expandSnippet=function(e){return exports.snippetManager.expandWithTab(this,e)}}.call(Editor.prototype);