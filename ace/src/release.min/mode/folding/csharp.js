"use strict";var oop=require("../../lib/oop"),Range=require("../../range").Range,CFoldMode=require("./cstyle").FoldMode,FoldMode=exports.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};oop.inherits(FoldMode,CFoldMode),function(){this.usingRe=/^\s*using \S/,this.getFoldWidgetRangeBase=this.getFoldWidgetRange,this.getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,i){t=this.getFoldWidgetBase(e,t,i);if(!t){var n=e.getLine(i);if(/^\s*#region\b/.test(n))return"start";var g=this.usingRe;if(g.test(n)){n=e.getLine(i-1),e=e.getLine(i+1);if(!g.test(n)&&g.test(e))return"start"}}return t},this.getFoldWidgetRange=function(e,t,i){var t=this.getFoldWidgetRangeBase(e,t,i);return t||(t=e.getLine(i),this.usingRe.test(t)?this.getUsingStatementBlock(e,t,i):/^\s*#region\b/.test(t)?this.getRegionBlock(e,t,i):void 0)},this.getUsingStatementBlock=function(e,t,i){for(var n,g=t.match(this.usingRe)[0].length-1,s=e.getLength(),o=i,r=i;++i<s;)if(t=e.getLine(i),!/^\s*$/.test(t)){if(!this.usingRe.test(t))break;r=i}if(o<r)return n=e.getLine(r).length,new Range(o,g,r,n)},this.getRegionBlock=function(e,t,i){for(var n=t.search(/\s*$/),g=e.getLength(),s=i,o=/^\s*#(end)?region\b/,r=1;++i<g;){t=e.getLine(i);var a=o.exec(t);if(a&&(a[1]?r--:r++,!r))break}if(s<i)return new Range(s,n,i,t.length)}}.call(FoldMode.prototype);