var RangeList=require("./range_list").RangeList,Range=require("./range").Range,Selection=require("./selection").Selection,onMouseDown=require("./mouse/multi_select_handler").onMouseDown,event=require("./lib/event"),lang=require("./lib/lang"),commands=require("./commands/multi_select_commands"),Search=(exports.commands=commands.defaultCommands.concat(commands.multiSelectCommands),require("./search").Search),search=new Search;function find(e,t,n){return search.$options.wrap=!0,search.$options.needle=t,search.$options.backwards=-1==n,search.find(e)}var EditSession=require("./edit_session").EditSession,Editor=(!function(){this.getSelectionMarkers=function(){return this.$selectionMarkers}}.call(EditSession.prototype),!function(){this.ranges=null,this.rangeList=null,this.addRange=function(e,t){if(e){if(!this.inMultiSelectMode&&0===this.rangeCount){var n=this.toOrientedRange();if(this.rangeList.add(n),this.rangeList.add(e),2!=this.rangeList.ranges.length)return this.rangeList.removeAll(),t||this.fromOrientedRange(e);this.rangeList.removeAll(),this.rangeList.add(n),this.$onAddRange(n)}e.cursor||(e.cursor=e.end);n=this.rangeList.add(e);return this.$onAddRange(e),n.length&&this.$onRemoveRange(n),1<this.rangeCount&&!this.inMultiSelectMode&&(this._signal("multiSelect"),this.inMultiSelectMode=!0,this.session.$undoSelect=!1,this.rangeList.attach(this.session)),t||this.fromOrientedRange(e)}},this.toSingleRange=function(e){e=e||this.ranges[0];var t=this.rangeList.removeAll();t.length&&this.$onRemoveRange(t),e&&this.fromOrientedRange(e)},this.substractPoint=function(e){e=this.rangeList.substractPoint(e);if(e)return this.$onRemoveRange(e),e[0]},this.mergeOverlappingRanges=function(){var e=this.rangeList.merge();e.length&&this.$onRemoveRange(e)},this.$onAddRange=function(e){this.rangeCount=this.rangeList.ranges.length,this.ranges.unshift(e),this._signal("addRange",{range:e})},this.$onRemoveRange=function(e){var t;this.rangeCount=this.rangeList.ranges.length,1==this.rangeCount&&this.inMultiSelectMode&&(t=this.rangeList.ranges.pop(),e.push(t),this.rangeCount=0);for(var n=e.length;n--;){var i=this.ranges.indexOf(e[n]);this.ranges.splice(i,1)}this._signal("removeRange",{ranges:e}),0===this.rangeCount&&this.inMultiSelectMode&&(this.inMultiSelectMode=!1,this._signal("singleSelect"),this.session.$undoSelect=!0,this.rangeList.detach(this.session)),(t=t||this.ranges[0])&&!t.isEqual(this.getRange())&&this.fromOrientedRange(t)},this.$initRangeList=function(){this.rangeList||(this.rangeList=new RangeList,this.ranges=[],this.rangeCount=0)},this.getAllRanges=function(){return this.rangeCount?this.rangeList.ranges.concat():[this.getRange()]},this.splitIntoLines=function(){for(var e=this.ranges.length?this.ranges:[this.getRange()],t=[],n=0;n<e.length;n++){var i=e[n],s=i.start.row,r=i.end.row;if(s===r)t.push(i.clone());else{for(t.push(new Range(s,i.start.column,s,this.session.getLine(s).length));++s<r;)t.push(this.getLineRange(s,!0));t.push(new Range(r,0,r,i.end.column))}0!=n||this.isBackwards()||(t=t.reverse())}this.toSingleRange();for(n=t.length;n--;)this.addRange(t[n])},this.joinSelections=function(){var e=this.rangeList.ranges,t=e[e.length-1],e=Range.fromPoints(e[0].start,t.end);this.toSingleRange(),this.setSelectionRange(e,t.cursor==t.start)},this.toggleBlockSelection=function(){var e,t;1<this.rangeCount?(t=(e=this.rangeList.ranges)[e.length-1],e=Range.fromPoints(e[0].start,t.end),this.toSingleRange(),this.setSelectionRange(e,t.cursor==t.start)):(e=this.session.documentToScreenPosition(this.cursor),t=this.session.documentToScreenPosition(this.anchor),this.rectangularRangeBlock(e,t).forEach(this.addRange,this))},this.rectangularRangeBlock=function(e,t,n){var i,s,r,o,l,a,c,h=[],u=e.column<t.column,g=(o=(u?(i=e.column,s=t.column,r=e.offsetX,t):(i=t.column,s=e.column,r=t.offsetX,e)).offsetX,e.row<t.row);a=(g?(l=e.row,t):(l=t.row,e)).row,i<0&&(i=0),(l=l<0?0:l)==a&&(n=!0);for(var d=l;d<=a;d++){var m=Range.fromPoints(this.session.screenToDocumentPosition(d,i,r),this.session.screenToDocumentPosition(d,s,o));if(m.isEmpty()){if(c&&isSamePoint(m.end,c))break;c=m.end}m.cursor=u?m.start:m.end,h.push(m)}if(g&&h.reverse(),!n){for(var S=h.length-1;h[S].isEmpty()&&0<S;)S--;if(0<S)for(var f=0;h[f].isEmpty();)f++;for(var R=S;f<=R;R--)h[R].isEmpty()&&h.splice(R,1)}return h}}.call(Selection.prototype),require("./editor").Editor);function isSamePoint(e,t){return e.row==t.row&&e.column==t.column}function MultiSelect(e){e.$multiselectOnSessionChange||(e.$onAddRange=e.$onAddRange.bind(e),e.$onRemoveRange=e.$onRemoveRange.bind(e),e.$onMultiSelect=e.$onMultiSelect.bind(e),e.$onSingleSelect=e.$onSingleSelect.bind(e),e.$multiselectOnSessionChange=exports.onSessionChange.bind(e),e.$checkMultiselectChange=e.$checkMultiselectChange.bind(e),e.$multiselectOnSessionChange(e),e.on("changeSession",e.$multiselectOnSessionChange),e.on("mousedown",onMouseDown),e.commands.addCommands(commands.defaultCommands),addAltCursorListeners(e))}function addAltCursorListeners(t){var e,n;function i(e){n&&(t.renderer.setMouseCursor(""),n=!1)}t.textInput&&(e=t.textInput.getElement(),n=!1,event.addListener(e,"keydown",function(e){e=18==e.keyCode&&!(e.ctrlKey||e.shiftKey||e.metaKey);t.$blockSelectEnabled&&e?n||(t.renderer.setMouseCursor("crosshair"),n=!0):n&&i()},t),event.addListener(e,"keyup",i,t),event.addListener(e,"blur",i,t))}!function(){this.updateSelectionMarkers=function(){this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.addSelectionMarker=function(e){e.cursor||(e.cursor=e.end);var t=this.getSelectionStyle();return e.marker=this.session.addMarker(e,"ace_selection",t),this.session.$selectionMarkers.push(e),this.session.selectionMarkerCount=this.session.$selectionMarkers.length,e},this.removeSelectionMarker=function(e){e.marker&&(this.session.removeMarker(e.marker),-1!=(e=this.session.$selectionMarkers.indexOf(e))&&this.session.$selectionMarkers.splice(e,1),this.session.selectionMarkerCount=this.session.$selectionMarkers.length)},this.removeSelectionMarkers=function(e){for(var t=this.session.$selectionMarkers,n=e.length;n--;){var i=e[n];i.marker&&(this.session.removeMarker(i.marker),-1!=(i=t.indexOf(i)))&&t.splice(i,1)}this.session.selectionMarkerCount=t.length},this.$onAddRange=function(e){this.addSelectionMarker(e.range),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onRemoveRange=function(e){this.removeSelectionMarkers(e.ranges),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onMultiSelect=function(e){this.inMultiSelectMode||(this.inMultiSelectMode=!0,this.setStyle("ace_multiselect"),this.keyBinding.addKeyboardHandler(commands.keyboardHandler),this.commands.setDefaultHandler("exec",this.$onMultiSelectExec),this.renderer.updateCursor(),this.renderer.updateBackMarkers())},this.$onSingleSelect=function(e){this.session.multiSelect.inVirtualMode||(this.inMultiSelectMode=!1,this.unsetStyle("ace_multiselect"),this.keyBinding.removeKeyboardHandler(commands.keyboardHandler),this.commands.removeDefaultHandler("exec",this.$onMultiSelectExec),this.renderer.updateCursor(),this.renderer.updateBackMarkers(),this._emit("changeSelection"))},this.$onMultiSelectExec=function(e){var t,n=e.command,i=e.editor;if(i.multiSelect)return n.multiSelectAction?t="forEach"==n.multiSelectAction?i.forEachSelection(n,e.args):"forEachLine"==n.multiSelectAction?i.forEachSelection(n,e.args,!0):"single"==n.multiSelectAction?(i.exitMultiSelectMode(),n.exec(i,e.args||{})):n.multiSelectAction(i,e.args||{}):(t=n.exec(i,e.args||{}),i.multiSelect.addRange(i.multiSelect.toOrientedRange()),i.multiSelect.mergeOverlappingRanges()),t},this.forEachSelection=function(e,t,n){if(!this.inVirtualSelectionMode){var i,s=n&&n.keepOrder,r=1==n||n&&n.$byLines,o=this.session,n=this.selection,l=n.rangeList,a=(s?n:l).ranges;if(!a.length)return e.exec?e.exec(this,t||{}):e(this,t||{});var s=n._eventRegistry,c=(n._eventRegistry={},new Selection(o));this.inVirtualSelectionMode=!0;for(var h=a.length;h--;){if(r)for(;0<h&&a[h].start.row==a[h-1].end.row;)h--;c.fromOrientedRange(a[h]),c.index=h,this.selection=o.selection=c;var u=e.exec?e.exec(this,t||{}):e(this,t||{});i||void 0===u||(i=u),c.toOrientedRange(a[h])}c.detach(),this.selection=o.selection=n,this.inVirtualSelectionMode=!1,n._eventRegistry=s,n.mergeOverlappingRanges(),n.ranges[0]&&n.fromOrientedRange(n.ranges[0]);l=this.renderer.$scrollAnimation;return this.onCursorChange(),this.onSelectionChange(),l&&l.from==l.to&&this.renderer.animateScrolling(l.from),i}},this.exitMultiSelectMode=function(){this.inMultiSelectMode&&!this.inVirtualSelectionMode&&this.multiSelect.toSingleRange()},this.getSelectedText=function(){var e="";if(this.inMultiSelectMode&&!this.inVirtualSelectionMode){for(var t=this.multiSelect.rangeList.ranges,n=[],i=0;i<t.length;i++)n.push(this.session.getTextRange(t[i]));var s=this.session.getDocument().getNewLineCharacter();(e=n.join(s)).length==(n.length-1)*s.length&&(e="")}else this.selection.isEmpty()||(e=this.session.getTextRange(this.getSelectionRange()));return e},this.$checkMultiselectChange=function(e,t){var n;this.inMultiSelectMode&&!this.inVirtualSelectionMode&&(n=this.multiSelect.ranges[0],this.multiSelect.isEmpty()&&t==this.multiSelect.anchor||((n=t==this.multiSelect.anchor?n.cursor==n.start?n.end:n.start:n.cursor).row!=t.row||this.session.$clipPositionToDocument(n.row,n.column).column!=t.column?this.multiSelect.toSingleRange(this.multiSelect.toOrientedRange()):this.multiSelect.mergeOverlappingRanges()))},this.findAll=function(e,t,n){(t=t||{}).needle=e||t.needle,null==t.needle&&(i=this.selection.isEmpty()?this.selection.getWordRange():this.selection.getRange(),t.needle=this.session.getTextRange(i)),this.$search.set(t);var i,s=this.$search.findAll(this.session);if(!s.length)return 0;var r=this.multiSelect;n||r.toSingleRange(s[0]);for(var o=s.length;o--;)r.addRange(s[o],!0);return i&&r.rangeList.rangeAtPoint(i.start)&&r.addRange(i,!0),s.length},this.selectMoreLines=function(e,t){var n,i,s,r=this.selection.toOrientedRange(),o=r.cursor==r.end,l=this.session.documentToScreenPosition(r.cursor),a=(this.selection.$desiredColumn&&(l.column=this.selection.$desiredColumn),this.session.screenToDocumentPosition(l.row+e,l.column));e=r.isEmpty()?a:(n=this.session.documentToScreenPosition(o?r.end:r.start),this.session.screenToDocumentPosition(n.row+e,n.column)),o?(i=Range.fromPoints(a,e)).cursor=i.start:(i=Range.fromPoints(e,a)).cursor=i.end,i.desiredColumn=l.column,this.selection.inMultiSelectMode?t&&(s=r.cursor):this.selection.addRange(r),this.selection.addRange(i),s&&this.selection.substractPoint(s)},this.transposeSelections=function(e){for(var t=this.session,n=t.multiSelect,i=n.ranges,s=i.length;s--;)(o=i[s]).isEmpty()&&(l=t.getWordRange(o.start.row,o.start.column),o.start.row=l.start.row,o.start.column=l.start.column,o.end.row=l.end.row,o.end.column=l.end.column);n.mergeOverlappingRanges();for(var r=[],s=i.length;s--;){var o=i[s];r.unshift(t.getTextRange(o))}e<0?r.unshift(r.pop()):r.push(r.shift());for(s=i.length;s--;){var l=(o=i[s]).clone();t.replace(o,r[s]),o.start.row=l.start.row,o.start.column=l.start.column}n.fromOrientedRange(n.ranges[0])},this.selectMore=function(e,t,n){var i=this.session,s=i.multiSelect.toOrientedRange();s.isEmpty()&&((s=i.getWordRange(s.start.row,s.start.column)).cursor=-1==e?s.start:s.end,this.multiSelect.addRange(s),n)||(n=i.getTextRange(s),(i=find(i,n,e))&&(i.cursor=-1==e?i.start:i.end,this.session.unfold(i),this.multiSelect.addRange(i),this.renderer.scrollCursorIntoView(null,.5)),t&&this.multiSelect.substractPoint(s.cursor))},this.alignCursors=function(){var s=this.session,t=s.multiSelect,e=t.ranges,n=-1,i=e.filter(function(e){if(e.cursor.row==n)return!0;n=e.cursor.row});if(e.length&&i.length!=e.length-1){i.forEach(function(e){t.substractPoint(e.cursor)});var r=0,o=1/0,l=e.map(function(e){var e=e.cursor,t=s.getLine(e.row).substr(e.column).search(/\S/g);return e.column>r&&(r=e.column),(t=-1==t?0:t)<o&&(o=t),t});e.forEach(function(e,t){var n=e.cursor,i=r-n.column,t=l[t]-o;t<i?s.insert(n,lang.stringRepeat(" ",i-t)):s.remove(new Range(n.row,n.column,n.row,n.column-i+t)),e.start.column=e.end.column=r,e.start.row=e.end.row=n.row,e.cursor=e.end}),t.fromOrientedRange(e[0]),this.renderer.updateCursor(),this.renderer.updateBackMarkers()}else{var i=this.selection.getRange(),a=i.start.row,c=i.end.row,e=a==c;if(e){for(var h,u=this.session.getLength();h=this.session.getLine(c),/[=:]/.test(h)&&++c<u;);for(;h=this.session.getLine(a),/[=:]/.test(h)&&0<--a;);a<0&&(a=0),u<=c&&(c=u-1)}var g=this.session.removeFullLines(a,c),g=this.$reAlignText(g,e);this.session.insert({row:a,column:0},g.join("\n")+"\n"),e||(i.start.column=0,i.end.column=g[g.length-1].length),this.selection.setRange(i)}},this.$reAlignText=function(e,t){var n,i,s,r=!0,o=!0;return e.map(function(e){var t=e.match(/(\s*)(.*?)(\s*)([=:].*)/);return t?(null==n?(n=t[1].length,i=t[2].length,s=t[3].length):(n+i+s!=t[1].length+t[2].length+t[3].length&&(o=!1),n!=t[1].length&&(r=!1),n>t[1].length&&(n=t[1].length),i<t[2].length&&(i=t[2].length),s>t[3].length&&(s=t[3].length)),t):[e]}).map(t?a:r?o?function(e){return e[2]?l(n+i-e[2].length)+e[2]+l(s)+e[4].replace(/^([=:])\s+/,"$1 "):e[0]}:a:function(e){return e[2]?l(n)+e[2]+l(s)+e[4].replace(/^([=:])\s+/,"$1 "):e[0]});function l(e){return lang.stringRepeat(" ",e)}function a(e){return e[2]?l(n)+e[2]+l(i-e[2].length+s)+e[4].replace(/^([=:])\s+/,"$1 "):e[0]}}}.call(Editor.prototype),exports.onSessionChange=function(e){var t=e.session,e=(t&&!t.multiSelect&&(t.$selectionMarkers=[],t.selection.$initRangeList(),t.multiSelect=t.selection),this.multiSelect=t&&t.multiSelect,e.oldSession);e&&(e.multiSelect.off("addRange",this.$onAddRange),e.multiSelect.off("removeRange",this.$onRemoveRange),e.multiSelect.off("multiSelect",this.$onMultiSelect),e.multiSelect.off("singleSelect",this.$onSingleSelect),e.multiSelect.lead.off("change",this.$checkMultiselectChange),e.multiSelect.anchor.off("change",this.$checkMultiselectChange)),t&&(t.multiSelect.on("addRange",this.$onAddRange),t.multiSelect.on("removeRange",this.$onRemoveRange),t.multiSelect.on("multiSelect",this.$onMultiSelect),t.multiSelect.on("singleSelect",this.$onSingleSelect),t.multiSelect.lead.on("change",this.$checkMultiselectChange),t.multiSelect.anchor.on("change",this.$checkMultiselectChange)),t&&this.inMultiSelectMode!=t.selection.inMultiSelectMode&&(t.selection.inMultiSelectMode?this.$onMultiSelect():this.$onSingleSelect())},exports.MultiSelect=MultiSelect,require("./config").defineOptions(Editor.prototype,"editor",{enableMultiselect:{set:function(e){MultiSelect(this),e?(this.on("changeSession",this.$multiselectOnSessionChange),this.on("mousedown",onMouseDown)):(this.off("changeSession",this.$multiselectOnSessionChange),this.off("mousedown",onMouseDown))},value:!0},enableBlockSelect:{set:function(e){this.$blockSelectEnabled=e},value:!0}});