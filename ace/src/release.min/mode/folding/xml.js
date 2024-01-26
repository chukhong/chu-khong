"use strict";var oop=require("../../lib/oop"),lang=require("../../lib/lang"),Range=require("../../range").Range,BaseFoldMode=require("./fold_mode").FoldMode,TokenIterator=require("../../token_iterator").TokenIterator,FoldMode=exports.FoldMode=function(e,t){BaseFoldMode.call(this),this.voidElements=e||{},this.optionalEndTags=oop.mixin({},this.voidElements),t&&oop.mixin(this.optionalEndTags,t)},Tag=(oop.inherits(FoldMode,BaseFoldMode),function(){this.tagName="",this.closing=!1,this.selfClosing=!1,this.start={row:0,column:0},this.end={row:0,column:0}});function is(e,t){return-1<e.type.lastIndexOf(t+".xml")}!function(){this.getFoldWidget=function(e,t,n){var o=this._getFirstTagInLine(e,n);return o?o.closing||!o.tagName&&o.selfClosing?"markbeginend"==t?"end":"":!o.tagName||o.selfClosing||this.voidElements.hasOwnProperty(o.tagName.toLowerCase())||this._findEndTagInLine(e,n,o.tagName,o.end.column)?"":"start":this.getCommentFoldWidget(e,n)},this.getCommentFoldWidget=function(e,t){return/comment/.test(e.getState(t))&&/<!-/.test(e.getLine(t))?"start":""},this._getFirstTagInLine=function(e,t){for(var n=e.getTokens(t),o=new Tag,r=0;r<n.length;r++){var a=n[r];if(is(a,"tag-open")){if(o.end.column=o.start.column+a.value.length,o.closing=is(a,"end-tag-open"),!(a=n[++r]))return null;for(o.tagName=a.value,o.end.column+=a.value.length,r++;r<n.length;r++)if(a=n[r],o.end.column+=a.value.length,is(a,"tag-close")){o.selfClosing="/>"==a.value;break}return o}if(is(a,"tag-close"))return o.selfClosing="/>"==a.value,o;o.start.column+=a.value.length}return null},this._findEndTagInLine=function(e,t,n,o){for(var r=e.getTokens(t),a=0,l=0;l<r.length;l++){var i=r[l];if(!((a+=i.value.length)<o)&&(is(i,"end-tag-open")&&(i=r[l+1])&&i.value==n))return!0}return!1},this._readTagForward=function(e){var t=e.getCurrentToken();if(t){var n=new Tag;do{if(is(t,"tag-open"))n.closing=is(t,"end-tag-open"),n.start.row=e.getCurrentTokenRow(),n.start.column=e.getCurrentTokenColumn();else if(is(t,"tag-name"))n.tagName=t.value;else if(is(t,"tag-close"))return n.selfClosing="/>"==t.value,n.end.row=e.getCurrentTokenRow(),n.end.column=e.getCurrentTokenColumn()+t.value.length,e.stepForward(),n}while(t=e.stepForward())}return null},this._readTagBackward=function(e){var t=e.getCurrentToken();if(t){var n=new Tag;do{if(is(t,"tag-open"))return n.closing=is(t,"end-tag-open"),n.start.row=e.getCurrentTokenRow(),n.start.column=e.getCurrentTokenColumn(),e.stepBackward(),n}while(is(t,"tag-name")?n.tagName=t.value:is(t,"tag-close")&&(n.selfClosing="/>"==t.value,n.end.row=e.getCurrentTokenRow(),n.end.column=e.getCurrentTokenColumn()+t.value.length),t=e.stepBackward())}return null},this._pop=function(e,t){for(;e.length;){var n=e[e.length-1];if(!t||n.tagName==t.tagName)return e.pop();if(!this.optionalEndTags.hasOwnProperty(n.tagName))return null;e.pop()}},this.getFoldWidgetRange=function(e,t,n){var o=this._getFirstTagInLine(e,n);if(!o)return this.getCommentFoldWidget(e,n)&&e.getCommentFoldRange(n,e.getLine(n).length);var r,a=[];if(o.closing||o.selfClosing)for(var l=new TokenIterator(e,n,o.end.column),i={row:n,column:o.start.column};r=this._readTagBackward(l);){if(r.selfClosing){if(a.length)continue;return r.start.column+=r.tagName.length+2,r.end.column-=2,Range.fromPoints(r.start,r.end)}if(r.closing)a.push(r);else if(this._pop(a,r),0==a.length)return r.start.column+=r.tagName.length+2,r.start.row==r.end.row&&r.start.column<r.end.column&&(r.start.column=r.end.column),Range.fromPoints(r.start,i)}else{var l=new TokenIterator(e,n,o.start.column),s={row:n,column:o.start.column+o.tagName.length+2};for(o.start.row==o.end.row&&(s.column=o.end.column);r=this._readTagForward(l);){if(r.selfClosing){if(a.length)continue;return r.start.column+=r.tagName.length+2,r.end.column-=2,Range.fromPoints(r.start,r.end)}if(r.closing){if(this._pop(a,r),0==a.length)return Range.fromPoints(s,r.start)}else a.push(r)}}}}.call(FoldMode.prototype);