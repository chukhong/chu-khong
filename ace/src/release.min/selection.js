"use strict";var oop=require("./lib/oop"),lang=require("./lib/lang"),EventEmitter=require("./lib/event_emitter").EventEmitter,Range=require("./range").Range,Selection=function(t){this.session=t,this.doc=t.getDocument(),this.clearSelection(),this.cursor=this.lead=this.doc.createAnchor(0,0),this.anchor=this.doc.createAnchor(0,0),this.$silent=!1;var s=this;this.cursor.on("change",function(t){s.$cursorChanged=!0,s.$silent||s._emit("changeCursor"),s.$isEmpty||s.$silent||s._emit("changeSelection"),s.$keepDesiredColumnOnChange||t.old.column==t.value.column||(s.$desiredColumn=null)}),this.anchor.on("change",function(){s.$anchorChanged=!0,s.$isEmpty||s.$silent||s._emit("changeSelection")})};!function(){oop.implement(this,EventEmitter),this.isEmpty=function(){return this.$isEmpty||this.anchor.row==this.lead.row&&this.anchor.column==this.lead.column},this.isMultiLine=function(){return!this.$isEmpty&&this.anchor.row!=this.cursor.row},this.getCursor=function(){return this.lead.getPosition()},this.setSelectionAnchor=function(t,s){this.$isEmpty=!1,this.anchor.setPosition(t,s)},this.getAnchor=this.getSelectionAnchor=function(){return this.$isEmpty?this.getSelectionLead():this.anchor.getPosition()},this.getSelectionLead=function(){return this.lead.getPosition()},this.isBackwards=function(){var t=this.anchor,s=this.lead;return t.row>s.row||t.row==s.row&&t.column>s.column},this.getRange=function(){var t=this.anchor,s=this.lead;return this.$isEmpty?Range.fromPoints(s,s):this.isBackwards()?Range.fromPoints(s,t):Range.fromPoints(t,s)},this.clearSelection=function(){this.$isEmpty||(this.$isEmpty=!0,this._emit("changeSelection"))},this.selectAll=function(){this.$setSelection(0,0,Number.MAX_VALUE,Number.MAX_VALUE)},this.setRange=this.setSelectionRange=function(t,s){var e=s?t.end:t.start,s=s?t.start:t.end;this.$setSelection(e.row,e.column,s.row,s.column)},this.$setSelection=function(t,s,e,o){var i,n;!this.$silent&&(i=this.$isEmpty,n=this.inMultiSelectMode,this.$silent=!0,this.$cursorChanged=this.$anchorChanged=!1,this.anchor.setPosition(t,s),this.cursor.setPosition(e,o),this.$isEmpty=!Range.comparePoints(this.anchor,this.cursor),this.$silent=!1,this.$cursorChanged&&this._emit("changeCursor"),this.$cursorChanged||this.$anchorChanged||i!=this.$isEmpty||n)&&this._emit("changeSelection")},this.$moveSelection=function(t){var s=this.lead;this.$isEmpty&&this.setSelectionAnchor(s.row,s.column),t.call(this)},this.selectTo=function(t,s){this.$moveSelection(function(){this.moveCursorTo(t,s)})},this.selectToPosition=function(t){this.$moveSelection(function(){this.moveCursorToPosition(t)})},this.moveTo=function(t,s){this.clearSelection(),this.moveCursorTo(t,s)},this.moveToPosition=function(t){this.clearSelection(),this.moveCursorToPosition(t)},this.selectUp=function(){this.$moveSelection(this.moveCursorUp)},this.selectDown=function(){this.$moveSelection(this.moveCursorDown)},this.selectRight=function(){this.$moveSelection(this.moveCursorRight)},this.selectLeft=function(){this.$moveSelection(this.moveCursorLeft)},this.selectLineStart=function(){this.$moveSelection(this.moveCursorLineStart)},this.selectLineEnd=function(){this.$moveSelection(this.moveCursorLineEnd)},this.selectFileEnd=function(){this.$moveSelection(this.moveCursorFileEnd)},this.selectFileStart=function(){this.$moveSelection(this.moveCursorFileStart)},this.selectWordRight=function(){this.$moveSelection(this.moveCursorWordRight)},this.selectWordLeft=function(){this.$moveSelection(this.moveCursorWordLeft)},this.getWordRange=function(t,s){var e;return void 0===s&&(t=(e=t||this.lead).row,s=e.column),this.session.getWordRange(t,s)},this.selectWord=function(){this.setSelectionRange(this.getWordRange())},this.selectAWord=function(){var t=this.getCursor(),t=this.session.getAWordRange(t.row,t.column);this.setSelectionRange(t)},this.getLineRange=function(t,s){var t="number"==typeof t?t:this.lead.row,e=this.session.getFoldLine(t),e=e?(t=e.start.row,e.end.row):t;return!0===s?new Range(t,0,e,this.session.getLine(e).length):new Range(t,0,e+1,0)},this.selectLine=function(){this.setSelectionRange(this.getLineRange())},this.moveCursorUp=function(){this.moveCursorBy(-1,0)},this.moveCursorDown=function(){this.moveCursorBy(1,0)},this.wouldMoveIntoSoftTab=function(t,s,e){var o=t.column,i=t.column+s;return e<0&&(o=t.column-s,i=t.column),this.session.isTabStop(t)&&this.doc.getLine(t.row).slice(o,i).split(" ").length-1==s},this.moveCursorLeft=function(){var t,s=this.lead.getPosition();(t=this.session.getFoldAt(s.row,s.column,-1))?this.moveCursorTo(t.start.row,t.start.column):0===s.column?0<s.row&&this.moveCursorTo(s.row-1,this.doc.getLine(s.row-1).length):(t=this.session.getTabSize(),this.wouldMoveIntoSoftTab(s,t,-1)&&!this.session.getNavigateWithinSoftTabs()?this.moveCursorBy(0,-t):this.moveCursorBy(0,-1))},this.moveCursorRight=function(){var t,s=this.lead.getPosition();(t=this.session.getFoldAt(s.row,s.column,1))?this.moveCursorTo(t.end.row,t.end.column):this.lead.column==this.doc.getLine(this.lead.row).length?this.lead.row<this.doc.getLength()-1&&this.moveCursorTo(this.lead.row+1,0):(t=this.session.getTabSize(),s=this.lead,this.wouldMoveIntoSoftTab(s,t,1)&&!this.session.getNavigateWithinSoftTabs()?this.moveCursorBy(0,t):this.moveCursorBy(0,1))},this.moveCursorLineStart=function(){var t=this.lead.row,s=this.lead.column,e=this.session.documentToScreenRow(t,s),e=this.session.screenToDocumentPosition(e,0),t=this.session.getDisplayLine(t,null,e.row,e.column).match(/^\s*/);t[0].length==s||this.session.$useEmacsStyleLineStart||(e.column+=t[0].length),this.moveCursorToPosition(e)},this.moveCursorLineEnd=function(){var t,s=this.lead,s=this.session.getDocumentLastRowColumnPosition(s.row,s.column);this.lead.column==s.column&&(t=this.session.getLine(s.row),s.column==t.length)&&0<(t=t.search(/\s+$/))&&(s.column=t),this.moveCursorTo(s.row,s.column)},this.moveCursorFileEnd=function(){var t=this.doc.getLength()-1,s=this.doc.getLine(t).length;this.moveCursorTo(t,s)},this.moveCursorFileStart=function(){this.moveCursorTo(0,0)},this.moveCursorLongWordRight=function(){var t=this.lead.row,s=this.lead.column,e=this.doc.getLine(t),o=e.substring(s),i=(this.session.nonTokenRe.lastIndex=0,this.session.tokenRe.lastIndex=0,this.session.getFoldAt(t,s,1));i?this.moveCursorTo(i.end.row,i.end.column):(this.session.nonTokenRe.exec(o)&&(s+=this.session.nonTokenRe.lastIndex,this.session.nonTokenRe.lastIndex=0,o=e.substring(s)),s>=e.length?(this.moveCursorTo(t,e.length),this.moveCursorRight(),t<this.doc.getLength()-1&&this.moveCursorWordRight()):(this.session.tokenRe.exec(o)&&(s+=this.session.tokenRe.lastIndex,this.session.tokenRe.lastIndex=0),this.moveCursorTo(t,s)))},this.moveCursorLongWordLeft=function(){var t,s=this.lead.row,e=this.lead.column;(t=this.session.getFoldAt(s,e,-1))?this.moveCursorTo(t.start.row,t.start.column):(null==(t=this.session.getFoldStringAt(s,e,-1))&&(t=this.doc.getLine(s).substring(0,e)),t=lang.stringReverse(t),this.session.nonTokenRe.lastIndex=0,this.session.tokenRe.lastIndex=0,this.session.nonTokenRe.exec(t)&&(e-=this.session.nonTokenRe.lastIndex,t=t.slice(this.session.nonTokenRe.lastIndex),this.session.nonTokenRe.lastIndex=0),e<=0?(this.moveCursorTo(s,0),this.moveCursorLeft(),0<s&&this.moveCursorWordLeft()):(this.session.tokenRe.exec(t)&&(e-=this.session.tokenRe.lastIndex,this.session.tokenRe.lastIndex=0),this.moveCursorTo(s,e)))},this.$shortWordEndIndex=function(t){var s,e=0,o=/\s/,i=this.session.tokenRe;if(i.lastIndex=0,this.session.tokenRe.exec(t))e=this.session.tokenRe.lastIndex;else{for(;(s=t[e])&&o.test(s);)e++;if(e<1)for(i.lastIndex=0;(s=t[e])&&!i.test(s);)if(i.lastIndex=0,e++,o.test(s)){if(2<e){e--;break}for(;(s=t[e])&&o.test(s);)e++;if(2<e)break}}return i.lastIndex=0,e},this.moveCursorShortWordRight=function(){var t=this.lead.row,s=this.lead.column,e=this.doc.getLine(t),o=e.substring(s),i=this.session.getFoldAt(t,s,1);if(i)return this.moveCursorTo(i.end.row,i.end.column);if(s==e.length){for(var n=this.doc.getLength();o=this.doc.getLine(++t),t<n&&/^\s*$/.test(o););/^\s+/.test(o)||(o=""),s=0}i=this.$shortWordEndIndex(o);this.moveCursorTo(t,s+i)},this.moveCursorShortWordLeft=function(){var t=this.lead.row,s=this.lead.column;if(o=this.session.getFoldAt(t,s,-1))return this.moveCursorTo(o.start.row,o.start.column);var e=this.session.getLine(t).substring(0,s);if(0===s){for(;e=this.doc.getLine(--t),0<t&&/^\s*$/.test(e););s=e.length,/\s+$/.test(e)||(e="")}var o=lang.stringReverse(e),o=this.$shortWordEndIndex(o);return this.moveCursorTo(t,s-o)},this.moveCursorWordRight=function(){this.session.$selectLongWords?this.moveCursorLongWordRight():this.moveCursorShortWordRight()},this.moveCursorWordLeft=function(){this.session.$selectLongWords?this.moveCursorLongWordLeft():this.moveCursorShortWordLeft()},this.moveCursorBy=function(t,s){var e,o=this.session.documentToScreenPosition(this.lead.row,this.lead.column),i=(0===s&&(0!==t&&(this.session.$bidiHandler.isBidiRow(o.row,this.lead.row)?(e=this.session.$bidiHandler.getPosLeft(o.column),o.column=Math.round(e/this.session.$bidiHandler.charWidths[0])):e=o.column*this.session.$bidiHandler.charWidths[0]),this.$desiredColumn?o.column=this.$desiredColumn:this.$desiredColumn=o.column),0!=t&&this.session.lineWidgets&&this.session.lineWidgets[this.lead.row]&&(i=this.session.lineWidgets[this.lead.row],t<0?t-=i.rowsAbove||0:0<t&&(t+=i.rowCount-(i.rowsAbove||0))),this.session.screenToDocumentPosition(o.row+t,o.column,e));0!==t&&0===s&&i.row===this.lead.row&&(i.column,this.lead.column),this.moveCursorTo(i.row,i.column+s,0===s)},this.moveCursorToPosition=function(t){this.moveCursorTo(t.row,t.column)},this.moveCursorTo=function(t,s,e){var o=this.session.getFoldAt(t,s,1),o=(o&&(t=o.start.row,s=o.start.column),this.$keepDesiredColumnOnChange=!0,this.session.getLine(t));/[\uDC00-\uDFFF]/.test(o.charAt(s))&&o.charAt(s-1)&&(this.lead.row==t&&this.lead.column==s+1?s-=1:s+=1),this.lead.setPosition(t,s),this.$keepDesiredColumnOnChange=!1,e||(this.$desiredColumn=null)},this.moveCursorToScreen=function(t,s,e){t=this.session.screenToDocumentPosition(t,s);this.moveCursorTo(t.row,t.column,e)},this.detach=function(){this.lead.detach(),this.anchor.detach()},this.fromOrientedRange=function(t){this.setSelectionRange(t,t.cursor==t.start),this.$desiredColumn=t.desiredColumn||this.$desiredColumn},this.toOrientedRange=function(t){var s=this.getRange();return t?(t.start.column=s.start.column,t.start.row=s.start.row,t.end.column=s.end.column,t.end.row=s.end.row):t=s,t.cursor=this.isBackwards()?t.start:t.end,t.desiredColumn=this.$desiredColumn,t},this.getRangeOfMovements=function(t){var s=this.getCursor();try{t(this);var e=this.getCursor();return Range.fromPoints(s,e)}catch(t){return Range.fromPoints(s,s)}finally{this.moveCursorToPosition(s)}},this.toJSON=function(){var t;return this.rangeCount?t=this.ranges.map(function(t){var s=t.clone();return s.isBackwards=t.cursor==t.start,s}):(t=this.getRange()).isBackwards=this.isBackwards(),t},this.fromJSON=function(t){if(null==t.start){if(this.rangeList&&1<t.length){this.toSingleRange(t[0]);for(var s=t.length;s--;){var e=Range.fromPoints(t[s].start,t[s].end);t[s].isBackwards&&(e.cursor=e.start),this.addRange(e,!0)}return}t=t[0]}this.rangeList&&this.toSingleRange(t),this.setSelectionRange(t,t.isBackwards)},this.isEqual=function(t){if((t.length||this.rangeCount)&&t.length!=this.rangeCount)return!1;if(!t.length||!this.ranges)return this.getRange().isEqual(t);for(var s=this.ranges.length;s--;)if(!this.ranges[s].isEqual(t[s]))return!1;return!0}}.call(Selection.prototype),exports.Selection=Selection;