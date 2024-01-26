var config=require("../config"),oop=require("../lib/oop"),HashHandler=require("../keyboard/hash_handler").HashHandler,occurStartCommand=require("./occur_commands").occurStartCommand;function IncrementalSearchKeyboardHandler(e){this.$iSearch=e}exports.iSearchStartCommands=[{name:"iSearch",bindKey:{win:"Ctrl-F",mac:"Command-F"},exec:function(n,a){config.loadModule(["core","ace/incremental_search"],function(e){e=e.iSearch=e.iSearch||new e.IncrementalSearch;e.activate(n,a.backwards),a.jumpToFirstMatch&&e.next(a)})},readOnly:!0},{name:"iSearchBackwards",exec:function(e,n){e.execCommand("iSearch",{backwards:!0})},readOnly:!0},{name:"iSearchAndGo",bindKey:{win:"Ctrl-K",mac:"Command-G"},exec:function(e,n){e.execCommand("iSearch",{jumpToFirstMatch:!0,useCurrentOrPrevSearch:!0})},readOnly:!0},{name:"iSearchBackwardsAndGo",bindKey:{win:"Ctrl-Shift-K",mac:"Command-Shift-G"},exec:function(e){e.execCommand("iSearch",{jumpToFirstMatch:!0,backwards:!0,useCurrentOrPrevSearch:!0})},readOnly:!0}],exports.iSearchCommands=[{name:"restartSearch",bindKey:{win:"Ctrl-F",mac:"Command-F"},exec:function(e){e.cancelSearch(!0)}},{name:"searchForward",bindKey:{win:"Ctrl-S|Ctrl-K",mac:"Ctrl-S|Command-G"},exec:function(e,n){n.useCurrentOrPrevSearch=!0,e.next(n)}},{name:"searchBackward",bindKey:{win:"Ctrl-R|Ctrl-Shift-K",mac:"Ctrl-R|Command-Shift-G"},exec:function(e,n){n.useCurrentOrPrevSearch=!0,n.backwards=!0,e.next(n)}},{name:"extendSearchTerm",exec:function(e,n){e.addString(n)}},{name:"extendSearchTermSpace",bindKey:"space",exec:function(e){e.addString(" ")}},{name:"shrinkSearchTerm",bindKey:"backspace",exec:function(e){e.removeChar()}},{name:"confirmSearch",bindKey:"return",exec:function(e){e.deactivate()}},{name:"cancelSearch",bindKey:"esc|Ctrl-G",exec:function(e){e.deactivate(!0)}},{name:"occurisearch",bindKey:"Ctrl-O",exec:function(e){var n=oop.mixin({},e.$options);e.deactivate(),occurStartCommand.exec(e.$editor,n)}},{name:"yankNextWord",bindKey:"Ctrl-w",exec:function(e){var n=e.$editor,a=n.selection.getRangeOfMovements(function(e){e.moveCursorWordRight()}),n=n.session.getTextRange(a);e.addString(n)}},{name:"yankNextChar",bindKey:"Ctrl-Alt-y",exec:function(e){var n=e.$editor,a=n.selection.getRangeOfMovements(function(e){e.moveCursorRight()}),n=n.session.getTextRange(a);e.addString(n)}},{name:"recenterTopBottom",bindKey:"Ctrl-l",exec:function(e){e.$editor.execCommand("recenterTopBottom")}},{name:"selectAllMatches",bindKey:"Ctrl-space",exec:function(e){var n=e.$editor,a=n.session.$isearchHighlight,a=a&&a.cache?a.cache.reduce(function(e,n){return e.concat(n||[])},[]):[];e.deactivate(!1),a.forEach(n.selection.addRange.bind(n.selection))}},{name:"searchAsRegExp",bindKey:"Alt-r",exec:function(e){e.convertNeedleToRegExp()}}].map(function(e){return e.readOnly=!0,e.isIncrementalSearchCommand=!0,e.scrollIntoView="animate-cursor",e}),oop.inherits(IncrementalSearchKeyboardHandler,HashHandler),function(){this.attach=function(a){var r=this.$iSearch;HashHandler.call(this,exports.iSearchCommands,a.commands.platform),this.$commandExecHandler=a.commands.on("exec",function(e){if(!e.command.isIncrementalSearchCommand)return r.deactivate();e.stopPropagation(),e.preventDefault();var n=a.session.getScrollTop(),e=e.command.exec(r,e.args||{});return a.renderer.scrollCursorIntoView(null,.5),a.renderer.animateScrolling(n),e})},this.detach=function(e){this.$commandExecHandler&&(e.commands.off("exec",this.$commandExecHandler),delete this.$commandExecHandler)};var c=this.handleKeyboard;this.handleKeyboard=function(e,n,a,r){if((1===n||8===n)&&"v"===a||1===n&&"y"===a)return null;e=c.call(this,e,n,a,r);if(e&&e.command)return e;if(-1==n){r=this.commands.extendSearchTerm;if(r)return{command:r,args:a}}return!1}}.call(IncrementalSearchKeyboardHandler.prototype),exports.IncrementalSearchKeyboardHandler=IncrementalSearchKeyboardHandler;